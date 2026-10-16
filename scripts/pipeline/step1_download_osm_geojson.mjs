// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import fs from 'node:fs';
import path from 'node:path';
import {
  validateCityId,
  createProjector,
  queryOverpassWithRetry,
  polygonSignedArea,
  stitchWaysIntoRings,
  writeSafeFile,
  WORKSPACE_ROOT,
} from './security_utils.mjs';
import { getCityPreset } from './city_presets.mjs';

function projectFlatRingFromLatLon(geom, project, minStep = 0.025) {
  if (!Array.isArray(geom) || geom.length < 3) return [];
  const flat = [];
  let prevX = Infinity;
  let prevZ = Infinity;
  for (const pt of geom) {
    const lat = Array.isArray(pt) ? pt[0] : pt.lat;
    const lon = Array.isArray(pt) ? pt[1] : pt.lon;
    const [x, z] = project(lat, lon);
    if (Math.hypot(x - prevX, z - prevZ) >= minStep) {
      flat.push(x, z);
      prevX = x;
      prevZ = z;
    }
  }
  if (
    flat.length >= 6 &&
    Math.hypot(flat[0] - flat[flat.length - 2], flat[1] - flat[flat.length - 1]) < minStep
  ) {
    flat.pop();
    flat.pop();
  }
  return flat;
}

function projectFlatLineFromLatLon(geom, project, minStep = 0.04) {
  if (!Array.isArray(geom) || geom.length < 2) return [];
  const flat = [];
  let prevX = Infinity;
  let prevZ = Infinity;
  for (let i = 0; i < geom.length; i++) {
    const pt = geom[i];
    const lat = Array.isArray(pt) ? pt[0] : pt.lat;
    const lon = Array.isArray(pt) ? pt[1] : pt.lon;
    const [x, z] = project(lat, lon);
    if (i === 0 || i === geom.length - 1 || Math.hypot(x - prevX, z - prevZ) >= minStep) {
      flat.push(x, z);
      prevX = x;
      prevZ = z;
    }
  }
  return flat;
}

/**
 * Converts a metric [x_m, z_m] coordinate pair (from earlier step1 runs) into
 * diorama world units using the city's coreRadiusKm and worldUnitsPerKm.
 */
function metricPointToWorld(xm, zm, geo) {
  const rawKmX = xm / 1000;
  const rawKmZ = zm / 1000;
  const distKm = Math.hypot(rawKmX, rawKmZ);
  const coreRadiusKm = geo.coreRadiusKm || 7.5;
  const worldUnitsPerKm = geo.worldUnitsPerKm || 10.8;
  let effectiveKm = distKm;
  if (distKm > coreRadiusKm) {
    const excess = distKm - coreRadiusKm;
    effectiveKm = coreRadiusKm + Math.log1p(excess * 0.30) * 5.6;
  }
  const scale = distKm > 0.0001 ? (effectiveKm / distKm) * worldUnitsPerKm : worldUnitsPerKm;
  return [
    Math.round(rawKmX * scale * 100) / 100,
    Math.round(rawKmZ * scale * 100) / 100,
  ];
}

function convertMetricPairListToFlatWorld(pairs, geo, minStep = 0.022) {
  if (!Array.isArray(pairs) || pairs.length === 0) return [];
  // Already flat array of numbers?
  if (typeof pairs[0] === 'number') {
    return pairs;
  }
  const flat = [];
  let prevX = Infinity;
  let prevZ = Infinity;
  for (let i = 0; i < pairs.length; i++) {
    const pt = pairs[i];
    if (!Array.isArray(pt) || pt.length < 2) continue;
    const [x, z] = metricPointToWorld(pt[0], pt[1], geo);
    if (i === 0 || i === pairs.length - 1 || Math.hypot(x - prevX, z - prevZ) >= minStep) {
      flat.push(x, z);
      prevX = x;
      prevZ = z;
    }
  }
  return flat;
}

/**
 * Upgrading converter if an existing <city>_osm.json on disk was saved with metric [[x,z],...] arrays.
 */
function upgradeExistingOsmDatasetIfNeeded(existingJson, preset) {
  const geo = preset.geo;
  const islands = existingJson.islands || [];

  const waterPolygons = (existingJson.waterPolygons || [])
    .map((wp) => {
      const outer = convertMetricPairListToFlatWorld(wp.outer, geo, 0.04);
      const holes = (wp.holes || [])
        .map((h) => convertMetricPairListToFlatWorld(h, geo, 0.03))
        .filter((h) => h.length >= 6);
      return { outer, holes };
    })
    .filter((wp) => wp.outer.length >= 6);

  const rawLines = existingJson.waterLines || existingJson.waterWays || [];
  const waterLines = rawLines
    .map((wl) => ({
      type: wl.type || wl.kind || 'river',
      name: wl.name || '',
      pts: convertMetricPairListToFlatWorld(wl.pts, geo, 0.05),
    }))
    .filter((wl) => wl.pts.length >= 4);

  const parks = (existingJson.parks || [])
    .map((pk) => {
      if (Array.isArray(pk.outer) && typeof pk.outer[0] === 'number') {
        return pk;
      }
      const outer = convertMetricPairListToFlatWorld(pk.pts || pk.outer, geo, 0.03);
      return {
        name: pk.name || '',
        kind: pk.kind || (pk.k === 'g' ? 'garden' : 'park'),
        outer,
      };
    })
    .filter((pk) => pk.outer.length >= 6);

  const trees = (existingJson.trees || []).map((t) => {
    if (Array.isArray(t) && t.length === 2 && Math.abs(t[0]) > 250) {
      return metricPointToWorld(t[0], t[1], geo);
    }
    return t;
  });

  const roads = (existingJson.roads || [])
    .map((rd) => {
      if (Array.isArray(rd) && Array.isArray(rd[0]) && typeof rd[0][0] === 'number') {
        return rd;
      }
      const pts = convertMetricPairListToFlatWorld(rd.pts, geo, 0.035);
      const tier = rd.t === 1 ? 3 : rd.t === 2 ? 2 : 1;
      const isBridge = rd.b ? 1 : 0;
      return [pts, tier, isBridge];
    })
    .filter((rd) => rd[0].length >= 4);

  const buildings = (existingJson.buildings || [])
    .map((b) => {
      if (Array.isArray(b) && Array.isArray(b[0]) && typeof b[0][0] === 'number') {
        return b;
      }
      const outer = convertMetricPairListToFlatWorld(b.pts, geo, 0.02);
      const hMeters = Number(b.h) || 18;
      const hWorld = Number(Math.min(2.65, Math.max(0.14, hMeters * 0.0112 * 1.35)).toFixed(3));
      const style = hMeters >= 42 ? 2 : hMeters >= 26 ? 3 : 0;
      return [outer, [], hWorld, style];
    })
    .filter((b) => b[0].length >= 6 && Math.abs(polygonSignedArea(b[0])) >= 0.005);

  return {
    islands,
    waterPolygons,
    waterLines,
    parks,
    trees,
    roads,
    buildings,
  };
}

function parseOsmWaterway(data, project) {
  const waterPolygons = [];
  const waterLines = [];

  for (const el of data.elements || []) {
    if (el.type === 'way' && el.geometry) {
      const tags = el.tags || {};
      if (tags.waterway === 'river' || tags.waterway === 'canal') {
        const pts = projectFlatLineFromLatLon(el.geometry, project, 0.04);
        if (pts.length >= 4) {
          waterLines.push({
            type: tags.waterway,
            name: tags.name || '',
            pts,
          });
        }
      } else {
        const outer = projectFlatRingFromLatLon(el.geometry, project, 0.035);
        if (outer.length >= 6) {
          waterPolygons.push({ outer, holes: [] });
        }
      }
    } else if (el.type === 'relation' && el.members) {
      const outerWays = [];
      const innerWays = [];
      for (const m of el.members) {
        if (m.type === 'way' && m.geometry && m.geometry.length >= 2) {
          if (m.role === 'inner') innerWays.push(m.geometry);
          else outerWays.push(m.geometry);
        }
      }
      const outers = stitchWaysIntoRings(outerWays)
        .map((r) => projectFlatRingFromLatLon(r, project, 0.04))
        .filter((r) => r.length >= 6);
      const inners = stitchWaysIntoRings(innerWays)
        .map((r) => projectFlatRingFromLatLon(r, project, 0.03))
        .filter((r) => r.length >= 6);
      for (const outer of outers) {
        waterPolygons.push({ outer, holes: inners });
      }
    }
  }

  return { waterPolygons, waterLines };
}

function parseOsmParksAndTrees(data, project) {
  const parks = [];
  const trees = [];

  for (const el of data.elements || []) {
    if (el.type === 'node' && el.lat !== undefined && el.lon !== undefined) {
      const [x, z] = project(el.lat, el.lon);
      trees.push([x, z]);
    } else if (el.type === 'way' && el.geometry && el.geometry.length >= 4) {
      const outer = projectFlatRingFromLatLon(el.geometry, project, 0.03);
      if (outer.length >= 6) {
        parks.push({
          name: el.tags?.name || '',
          kind: el.tags?.leisure === 'garden' ? 'garden' : 'park',
          outer,
        });
      }
    }
  }

  return { parks, trees: trees.slice(0, 8000) };
}

function parseOsmRoads(data, project) {
  const roads = [];
  for (const el of data.elements || []) {
    if (el.type === 'way' && el.geometry && el.geometry.length >= 2) {
      const hw = el.tags?.highway || '';
      const tier =
        hw === 'motorway'
          ? 4
          : hw === 'trunk' || hw === 'primary'
            ? 3
            : hw === 'secondary'
              ? 2
              : 1;
      const pts = projectFlatLineFromLatLon(el.geometry, project, tier >= 3 ? 0.03 : 0.04);
      if (pts.length >= 4) {
        roads.push([pts, tier, el.tags?.bridge === 'yes' ? 1 : 0]);
      }
    }
  }
  return roads;
}

function parseOsmBuildings(data, project, seenIds) {
  const buildings = [];
  for (const el of data.elements || []) {
    if (el.type === 'way' && el.geometry && el.geometry.length >= 4) {
      if (seenIds.has(el.id)) continue;
      seenIds.add(el.id);

      const outer = projectFlatRingFromLatLon(el.geometry, project, 0.02);
      if (outer.length < 6) continue;
      if (Math.abs(polygonSignedArea(outer)) < 0.0055) continue;

      const tags = el.tags || {};
      let hMeters = 18;
      if (tags.height) {
        const parsedH = parseFloat(String(tags.height).replace(/[^0-9.]/g, ''));
        if (!Number.isNaN(parsedH) && parsedH > 3) hMeters = Math.min(350, parsedH);
      } else if (tags['building:levels']) {
        const lv = parseFloat(tags['building:levels']);
        if (!Number.isNaN(lv) && lv > 0) hMeters = Math.min(350, lv * 3.4 + 2);
      }

      const hWorld = Number(Math.min(2.65, Math.max(0.14, hMeters * 0.0112 * 1.35)).toFixed(3));
      const style = hMeters >= 42 ? 2 : hMeters >= 26 ? 3 : 0;
      buildings.push([outer, [], hWorld, style]);
    }
  }
  return buildings;
}

export async function runStep1OsmGeoJson(cityId, options = {}) {
  const safeCityId = validateCityId(cityId);
  const preset = getCityPreset(safeCityId);
  const { project } = createProjector(preset.geo);
  const offline = Boolean(options.offline);
  const tileGrid = Number.isInteger(options.tileGrid) && options.tileGrid > 0 ? options.tileGrid : 2;

  console.log(`\n[Step 1/4] Preparing GeoJSON & 3D World Geometry for ${preset.name} (${safeCityId})...`);

  const existingOsmFile = path.join(WORKSPACE_ROOT, 'public', 'data', `${safeCityId}_osm.json`);
  let islands = [];
  let waterPolygons = [];
  let waterLines = [];
  let parks = [];
  let trees = [];
  let roads = [];
  let buildings = [];

  if (offline && fs.existsSync(existingOsmFile)) {
    console.log(`  -> Upgrading/preserving cached ${existingOsmFile} in diorama world units...`);
    const cached = JSON.parse(fs.readFileSync(existingOsmFile, 'utf8'));
    const upgraded = upgradeExistingOsmDatasetIfNeeded(cached, preset);
    islands = upgraded.islands;
    waterPolygons = upgraded.waterPolygons;
    waterLines = upgraded.waterLines;
    parks = upgraded.parks;
    trees = upgraded.trees;
    roads = upgraded.roads;
    buildings = upgraded.buildings;
  } else if (!offline) {
    const [south, west, north, east] = preset.geo.bbox;
    const bboxStr = `${south},${west},${north},${east}`;

    try {
      console.log(`  -> Querying Overpass for ${preset.name} waterways & coastline...`);
      const waterData = await queryOverpassWithRetry(`
        [out:json][timeout:60];
        (
          way["waterway"~"^(river|canal)$"](${bboxStr});
          way["natural"="water"](${bboxStr});
          relation["natural"="water"](${bboxStr});
        );
        out geom;
      `);
      const parsedWater = parseOsmWaterway(waterData, project);
      waterPolygons.push(...parsedWater.waterPolygons);
      waterLines.push(...parsedWater.waterLines);

      console.log(`  -> Querying Overpass for ${preset.name} parks & green spaces...`);
      const parksData = await queryOverpassWithRetry(`
        [out:json][timeout:60];
        (
          way["leisure"~"^(park|garden)$"](${bboxStr});
          way["landuse"~"^(grass|forest|meadow|recreation_ground)$"](${bboxStr});
          node["natural"="tree"](${bboxStr});
        );
        out geom;
      `);
      const parsedParks = parseOsmParksAndTrees(parksData, project);
      parks = parsedParks.parks;
      trees = parsedParks.trees;

      console.log(`  -> Querying Overpass for ${preset.name} road network...`);
      const roadsData = await queryOverpassWithRetry(`
        [out:json][timeout:60];
        (
          way["highway"~"^(motorway|trunk|primary|secondary|tertiary)$"](${bboxStr});
        );
        out geom;
      `);
      roads = parseOsmRoads(roadsData, project);

      const seenBuildingIds = new Set();
      const latStep = (north - south) / tileGrid;
      const lonStep = (east - west) / tileGrid;

      for (let r = 0; r < tileGrid; r++) {
        for (let c = 0; c < tileGrid; c++) {
          const s = (south + r * latStep).toFixed(5);
          const n = (south + (r + 1) * latStep).toFixed(5);
          const w = (west + c * lonStep).toFixed(5);
          const e = (west + (c + 1) * lonStep).toFixed(5);
          console.log(`  -> Querying Overpass building tile (${r + 1},${c + 1}) of ${tileGrid}x${tileGrid}...`);
          const bData = await queryOverpassWithRetry(`
            [out:json][timeout:90];
            way["building"](${s},${w},${n},${e});
            out geom;
          `);
          buildings.push(...parseOsmBuildings(bData, project, seenBuildingIds));
        }
      }
    } catch (err) {
      console.warn(
        `  [!] Overpass live fetch encountered an error (${err.message}). Checking cached OSM file...`
      );
      if (fs.existsSync(existingOsmFile)) {
        const cached = JSON.parse(fs.readFileSync(existingOsmFile, 'utf8'));
        const upgraded = upgradeExistingOsmDatasetIfNeeded(cached, preset);
        islands = upgraded.islands;
        waterPolygons = upgraded.waterPolygons;
        waterLines = upgraded.waterLines;
        parks = upgraded.parks;
        trees = upgraded.trees;
        roads = upgraded.roads;
        buildings = upgraded.buildings;
      }
    }
  }

  const topography = (preset.topography || []).map((peak) => {
    const [x, z] = project(peak.lat, peak.lon);
    return {
      id: peak.id,
      name: peak.name,
      x,
      z,
      lat: peak.lat,
      lon: peak.lon,
      peakElevationMeters: peak.peakElevationMeters,
      radiusMeters: peak.radiusMeters,
      steepness: peak.steepness,
      ridgeAzimuthDeg: peak.ridgeAzimuthDeg || 0,
      ridgeElongation: peak.ridgeElongation || 1.0,
    };
  });

  const payload = {
    meta: {
      cityId: preset.id,
      cityName: preset.name,
      country: preset.country,
      centerLat: preset.geo.centerLat,
      centerLon: preset.geo.centerLon,
      counts: {
        islands: islands.length,
        waterPolygons: waterPolygons.length,
        waterLines: waterLines.length,
        parks: parks.length,
        trees: trees.length,
        roads: roads.length,
        buildings: buildings.length,
        topographyPeaks: topography.length,
      },
    },
    islands,
    waterPolygons,
    waterLines,
    parks,
    trees,
    roads,
    buildings,
  };

  const osmJsonPath = writeSafeFile(
    `public/data/${safeCityId}_osm.json`,
    JSON.stringify(payload)
  );

  const upperId = safeCityId.toUpperCase();
  const geoTsSource = `// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import type {
  CityGeoConfig,
  CityWaterBody,
  CityTopographyPeak,
  CityBridgeDef,
  CityParkDef,
  CityPlaceDef,
} from '../types';

export const ${upperId}_GEO_CONFIG: CityGeoConfig = ${JSON.stringify(preset.geo, null, 2)};

export function latLonTo${preset.id.charAt(0).toUpperCase() + preset.id.slice(1)}World(
  lat: number,
  lon: number
): [number, number] {
  const rawKmX = (lon - ${upperId}_GEO_CONFIG.centerLon) * (${upperId}_GEO_CONFIG.kmPerDegLon ?? 90);
  const rawKmZ = -(lat - ${upperId}_GEO_CONFIG.centerLat) * (${upperId}_GEO_CONFIG.kmPerDegLat ?? 111.1);
  const distKm = Math.hypot(rawKmX, rawKmZ);
  const coreRadiusKm = ${upperId}_GEO_CONFIG.coreRadiusKm ?? 7.5;
  const worldUnitsPerKm = ${upperId}_GEO_CONFIG.worldUnitsPerKm ?? 10.8;
  let effectiveKm = distKm;
  if (distKm > coreRadiusKm) {
    effectiveKm = coreRadiusKm + Math.log1p((distKm - coreRadiusKm) * 0.30) * 5.6;
  }
  const scale = distKm > 0.0001 ? (effectiveKm / distKm) * worldUnitsPerKm : worldUnitsPerKm;
  return [Math.round(rawKmX * scale * 100) / 100, Math.round(rawKmZ * scale * 100) / 100];
}

export const ${upperId}_WATER_CENTERLINES: [number, number, number][] = ${JSON.stringify(preset.waterCenterlines || [], null, 2)};

export const ${upperId}_BRIDGES: CityBridgeDef[] = ${JSON.stringify(preset.bridges || [], null, 2)};

export const ${upperId}_PARKS: CityParkDef[] = ${JSON.stringify(preset.parks || [], null, 2)};

export const ${upperId}_PLACES: CityPlaceDef[] = ${JSON.stringify(preset.places || [], null, 2)};

export const ${upperId}_WATER_BODIES: CityWaterBody[] = ${JSON.stringify(preset.waterBodies || [], null, 2)};

export const ${upperId}_TOPOGRAPHY: CityTopographyPeak[] = ${JSON.stringify(topography, null, 2)};
`;

  const geoTsPath = writeSafeFile(`src/cities/${safeCityId}/geoData.ts`, geoTsSource);
  console.log(`  [✓] Wrote ${osmJsonPath} (${buildings.length} buildings, ${roads.length} roads, ${parks.length} parks)`);
  console.log(`  [✓] Wrote ${geoTsPath}`);

  return { osmJsonPath, geoTsPath, counts: payload.meta.counts };
}
