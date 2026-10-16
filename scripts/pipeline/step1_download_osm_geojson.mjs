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

import {
  validateCityId,
  createProjector,
  queryOverpassWithRetry,
  simplifyRing,
  simplifyLine,
  stitchWaysIntoRings,
  writeSafeFile,
} from './security_utils.mjs';
import { getCityPreset } from './city_presets.mjs';

function buildPresetWaterFeatures(preset, project) {
  const waterPolygons = [];
  const waterWays = [];

  for (const wb of preset.waterBodies || []) {
    if (wb.type === 'polygon' && Array.isArray(wb.outerRingLatLon)) {
      const outer = simplifyRing(
        wb.outerRingLatLon.map(([lat, lon]) => project(lat, lon)),
        2
      );
      if (outer.length >= 3) {
        waterPolygons.push({
          id: wb.id,
          name: wb.name,
          kind: wb.kind,
          color: wb.color || '#1a4b6e',
          outer,
          holes: [],
        });
      }
    } else if (wb.type === 'polyline' && Array.isArray(wb.pathLatLon)) {
      const pts = simplifyLine(
        wb.pathLatLon.map(([lat, lon]) => project(lat, lon)),
        2
      );
      if (pts.length >= 2) {
        waterWays.push({
          id: wb.id,
          name: wb.name,
          kind: wb.kind,
          w: wb.widthMeters || 140,
          pts,
        });
      }
    }
  }

  return { waterPolygons, waterWays };
}

function buildPresetBeaches(preset, project) {
  const beaches = [];
  for (const b of preset.beaches || []) {
    const pts = simplifyLine(
      (b.pointsLatLon || []).map(([lat, lon]) => project(lat, lon)),
      2
    );
    if (pts.length >= 2) {
      beaches.push({
        id: b.id,
        name: b.name,
        w: b.widthMeters || 65,
        pts,
      });
    }
  }
  return beaches;
}

function parseOsmWaterway(data, project) {
  const waterPolygons = [];
  const waterWays = [];

  for (const el of data.elements || []) {
    if (el.type === 'way' && el.geometry) {
      const tags = el.tags || {};
      const pts = el.geometry.map((g) => project(g.lat, g.lon));
      if (tags.waterway === 'river' || tags.waterway === 'canal') {
        const simplified = simplifyLine(pts, 4);
        if (simplified.length >= 2) {
          waterWays.push({
            w: tags.waterway === 'river' ? 120 : 28,
            pts: simplified,
          });
        }
      } else if (
        pts.length >= 4 &&
        pts[0][0] === pts[pts.length - 1][0] &&
        pts[0][1] === pts[pts.length - 1][1]
      ) {
        const outer = simplifyRing(pts, 4);
        if (outer.length >= 3) {
          waterPolygons.push({ outer, holes: [] });
        }
      }
    } else if (el.type === 'relation' && el.members) {
      const outerWays = [];
      const innerWays = [];
      for (const m of el.members) {
        if (m.type === 'way' && m.geometry && m.geometry.length >= 2) {
          const pts = m.geometry.map((g) => project(g.lat, g.lon));
          if (m.role === 'inner') innerWays.push(pts);
          else outerWays.push(pts);
        }
      }
      const outers = stitchWaysIntoRings(outerWays)
        .map((r) => simplifyRing(r, 4))
        .filter((r) => r.length >= 3);
      const inners = stitchWaysIntoRings(innerWays)
        .map((r) => simplifyRing(r, 3))
        .filter((r) => r.length >= 3);
      for (const outer of outers) {
        waterPolygons.push({ outer, holes: inners });
      }
    }
  }

  return { waterPolygons, waterWays };
}

function parseOsmParksAndTrees(data, project) {
  const parks = [];
  const trees = [];

  for (const el of data.elements || []) {
    if (el.type === 'node' && el.lat !== undefined && el.lon !== undefined) {
      const [x, z] = project(el.lat, el.lon);
      trees.push([x, z]);
    } else if (el.type === 'way' && el.geometry && el.geometry.length >= 4) {
      const pts = simplifyRing(
        el.geometry.map((g) => project(g.lat, g.lon)),
        3
      );
      if (pts.length >= 3) {
        parks.push({
          k: el.tags?.leisure === 'garden' ? 'g' : 'p',
          pts,
        });
      }
    }
  }

  return { parks, trees: trees.slice(0, 6000) };
}

function parseOsmRoads(data, project) {
  const roads = [];
  for (const el of data.elements || []) {
    if (el.type === 'way' && el.geometry && el.geometry.length >= 2) {
      const hw = el.tags?.highway || '';
      const tier =
        hw === 'motorway' || hw === 'trunk' || hw === 'primary'
          ? 1
          : hw === 'secondary'
            ? 2
            : 3;
      const pts = simplifyLine(
        el.geometry.map((g) => project(g.lat, g.lon)),
        tier === 1 ? 3 : 4
      );
      if (pts.length >= 2) {
        roads.push({
          t: tier,
          b: el.tags?.bridge === 'yes' ? 1 : 0,
          pts,
        });
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

      const pts = simplifyRing(
        el.geometry.map((g) => project(g.lat, g.lon)),
        1.2
      );
      if (pts.length < 3) continue;

      let area = 0;
      for (let i = 0; i < pts.length; i++) {
        const [x1, z1] = pts[i];
        const [x2, z2] = pts[(i + 1) % pts.length];
        area += x1 * z2 - x2 * z1;
      }
      if (Math.abs(area) * 0.5 < 22) continue;

      const tags = el.tags || {};
      let h = 18;
      if (tags.height) {
        const parsedH = parseFloat(String(tags.height).replace(/[^0-9.]/g, ''));
        if (!Number.isNaN(parsedH) && parsedH > 3) h = Math.min(350, Math.round(parsedH));
      } else if (tags['building:levels']) {
        const lv = parseFloat(tags['building:levels']);
        if (!Number.isNaN(lv) && lv > 0) h = Math.min(350, Math.round(lv * 3.4 + 2));
      }

      buildings.push({ h, pts });
    }
  }
  return buildings;
}

function generateProceduralFallbackCityGeometry(preset, project) {
  const parks = [];
  const roads = [];
  const buildings = [];

  for (const d of preset.districts || []) {
    const [cx, cz] = project(d.lat, d.lon);
    // Create a neighborhood park and radial/grid avenues around each district center
    parks.push({
      k: 'p',
      pts: [
        [cx - 120, cz - 90],
        [cx + 120, cz - 90],
        [cx + 120, cz + 90],
        [cx - 120, cz + 90],
      ],
    });

    for (let gx = -3; gx <= 3; gx++) {
      roads.push({
        t: gx === 0 ? 1 : 2,
        b: 0,
        pts: [
          [cx + gx * 160, cz - 520],
          [cx + gx * 160, cz + 520],
        ],
      });
      roads.push({
        t: gx === 0 ? 1 : 2,
        b: 0,
        pts: [
          [cx - 520, cz + gx * 160],
          [cx + 520, cz + gx * 160],
        ],
      });
    }

    for (let bx = -3; bx <= 2; bx++) {
      for (let bz = -3; bz <= 2; bz++) {
        if (bx === 0 && bz === 0) continue;
        const x0 = cx + bx * 160 + 22;
        const z0 = cz + bz * 160 + 22;
        const w = 96;
        const depth = 88;
        const h = preset.id === 'nyc' ? 54 + ((Math.abs(bx + bz) % 4) * 28) : 22 + ((Math.abs(bx * bz) % 4) * 9);
        buildings.push({
          h,
          pts: [
            [x0, z0],
            [x0 + w, z0],
            [x0 + w, z0 + depth],
            [x0, z0 + depth],
          ],
        });
      }
    }
  }

  return { parks, roads, buildings, trees: [] };
}

export async function runStep1OsmGeoJson(cityId, options = {}) {
  const safeCityId = validateCityId(cityId);
  const preset = getCityPreset(safeCityId);
  const { project } = createProjector(preset.geo);
  const offline = Boolean(options.offline);
  const tileGrid = Number.isInteger(options.tileGrid) && options.tileGrid > 0 ? options.tileGrid : 2;

  console.log(`\n[Step 1/4] Preparing GeoJSON & 3D World Geometry for ${preset.name} (${safeCityId})...`);

  const presetWater = buildPresetWaterFeatures(preset, project);
  const beaches = buildPresetBeaches(preset, project);

  let waterPolygons = [...presetWater.waterPolygons];
  let waterWays = [...presetWater.waterWays];
  let parks = [];
  let trees = [];
  let roads = [];
  let buildings = [];

  if (!offline) {
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
      waterWays.push(...parsedWater.waterWays);

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
        `  [!] Overpass live fetch encountered an error (${err.message}). Augmenting with curated procedural blocks.`
      );
    }
  } else {
    console.log(`  -> Running in --offline mode; synthesizing curated geometry from ${preset.name} preset.`);
  }

  if (buildings.length === 0 || roads.length === 0) {
    const fallback = generateProceduralFallbackCityGeometry(preset, project);
    if (parks.length === 0) parks = fallback.parks;
    if (roads.length === 0) roads = fallback.roads;
    if (buildings.length === 0) buildings = fallback.buildings;
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
      mPerDegLat: preset.geo.mPerDegLat,
      mPerDegLon: preset.geo.mPerDegLon,
      bbox: preset.geo.bbox,
      counts: {
        waterPolygons: waterPolygons.length,
        waterWays: waterWays.length,
        beaches: beaches.length,
        parks: parks.length,
        trees: trees.length,
        roads: roads.length,
        buildings: buildings.length,
        topographyPeaks: topography.length,
      },
    },
    waterPolygons,
    waterWays,
    beaches,
    parks,
    trees,
    roads,
    buildings,
    topography,
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

import type { CityGeoConfig, CityWaterBody, CityTopographyPeak } from '../types';

export const ${upperId}_GEO_CONFIG: CityGeoConfig = ${JSON.stringify(preset.geo, null, 2)};

export function latLonTo${preset.id.charAt(0).toUpperCase() + preset.id.slice(1)}World(
  lat: number,
  lon: number
): [number, number] {
  const x = (lon - ${upperId}_GEO_CONFIG.centerLon) * ${upperId}_GEO_CONFIG.mPerDegLon;
  const z = -((lat - ${upperId}_GEO_CONFIG.centerLat) * ${upperId}_GEO_CONFIG.mPerDegLat);
  return [Math.round(x * 10) / 10, Math.round(z * 10) / 10];
}

export const ${upperId}_WATER_BODIES: CityWaterBody[] = ${JSON.stringify(preset.waterBodies || [], null, 2)};

export const ${upperId}_TOPOGRAPHY: CityTopographyPeak[] = ${JSON.stringify(preset.topography || [], null, 2)};
`;

  const geoTsPath = writeSafeFile(`src/cities/${safeCityId}/geoData.ts`, geoTsSource);
  console.log(`  [✓] Wrote ${osmJsonPath}`);
  console.log(`  [✓] Wrote ${geoTsPath}`);

  return { osmJsonPath, geoTsPath, counts: payload.meta.counts };
}
