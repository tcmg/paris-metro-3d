#!/usr/bin/env node

/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Downloads real OpenStreetMap geometry data for Paris from the Overpass API:
 * 1. Exact Seine River, Canal Saint-Martin, Bassin de la Villette, and Islands (Île de la Cité, Île Saint-Louis, Île aux Cygnes)
 * 2. Complete Street & Road Network of Paris (trunk, primary, secondary, tertiary, residential, pedestrian, living_street)
 * 3. All Parks, Gardens, Squares, Lawns & Wooded Areas of Paris
 * 4. Exact Building Polygons (ways + multipolygon relations with inner courtyard holes!) across Paris
 *
 * Outputs compact, projected world-coordinate geometry to public/data/paris_osm.json
 */

import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';

const CENTER_LAT = 48.8584;
const CENTER_LON = 2.3440;
const KM_PER_DEG_LAT = 111.2;
const KM_PER_DEG_LON = 73.15;
const WORLD_UNITS_PER_KM = 11.2;

function projectLatLon(lat, lon) {
  const rawKmX = (lon - CENTER_LON) * KM_PER_DEG_LON;
  const rawKmZ = -(lat - CENTER_LAT) * KM_PER_DEG_LAT;

  const distKm = Math.hypot(rawKmX, rawKmZ);
  const coreRadiusKm = 7.0;

  let effectiveKm = distKm;
  if (distKm > coreRadiusKm) {
    const excess = distKm - coreRadiusKm;
    effectiveKm = coreRadiusKm + Math.log1p(excess * 0.30) * 5.6;
  }

  const scale = distKm > 0.0001 ? (effectiveKm / distKm) * WORLD_UNITS_PER_KM : WORLD_UNITS_PER_KM;
  return [
    Math.round(rawKmX * scale * 100) / 100,
    Math.round(rawKmZ * scale * 100) / 100
  ];
}

const OVERPASS_ENDPOINTS = [
  'https://lz4.overpass-api.de/api/interpreter',
  'https://overpass-api.de/api/interpreter'
];

function postOverpass(url, query, timeoutMs = 45000) {
  return new Promise((resolve, reject) => {
    const body = `data=${encodeURIComponent(query)}`;
    const parsed = new URL(url);
    const req = https.request(
      {
        hostname: parsed.hostname,
        path: parsed.pathname + parsed.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(body),
          'User-Agent': 'ParisMetro3DSim/1.0 (https://example.org; contact@example.org)',
          Accept: '*/*'
        },
        timeout: timeoutMs
      },
      (res) => {
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode} from ${url}`));
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => {
          try {
            const text = Buffer.concat(chunks).toString('utf8');
            const json = JSON.parse(text);
            resolve(json);
          } catch (err) {
            reject(err);
          }
        });
      }
    );
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`Timeout from ${url}`));
    });
    req.write(body);
    req.end();
  });
}

async function queryOverpassWithRetry(query, label, preferredIndex = 0) {
  for (let attempt = 0; attempt < 6; attempt++) {
    const endpoint = OVERPASS_ENDPOINTS[(preferredIndex + attempt) % OVERPASS_ENDPOINTS.length];
    try {
      console.log(`[OSM] Fetching ${label} via ${endpoint} (attempt ${attempt + 1})...`);
      const res = await postOverpass(endpoint, query, 45000);
      if (res && Array.isArray(res.elements)) {
        console.log(`[OSM] ✓ ${label}: received ${res.elements.length} elements`);
        return res.elements;
      }
    } catch (err) {
      if (err && err.code === 'ENOTFOUND') {
        throw err;
      }
      console.warn(`[OSM] ! ${label} failed on ${endpoint}: ${err.message}`);
      await new Promise((r) => setTimeout(r, 1200 * (attempt + 1)));
    }
  }
  throw new Error(`Failed to fetch ${label} after all retries`);
}

function polygonSignedArea(ring) {
  let area = 0;
  for (let i = 0, n = ring.length; i < n; i += 2) {
    const x1 = ring[i];
    const z1 = ring[i + 1];
    const x2 = ring[(i + 2) % n];
    const z2 = ring[(i + 3) % n];
    area += x1 * z2 - x2 * z1;
  }
  return area * 0.5;
}

function simplifyRing(coords, minStep = 0.025) {
  if (coords.length < 3) return [];
  const flat = [];
  let prevX = Infinity;
  let prevZ = Infinity;
  for (const pt of coords) {
    const [x, z] = projectLatLon(pt.lat, pt.lon);
    if (Math.hypot(x - prevX, z - prevZ) >= minStep) {
      flat.push(x, z);
      prevX = x;
      prevZ = z;
    }
  }
  // Remove duplicate closing vertex if same as first
  if (
    flat.length >= 6 &&
    Math.hypot(flat[0] - flat[flat.length - 2], flat[1] - flat[flat.length - 1]) < minStep
  ) {
    flat.pop();
    flat.pop();
  }
  return flat;
}

function simplifyLine(coords, minStep = 0.04) {
  if (coords.length < 2) return [];
  const flat = [];
  let prevX = Infinity;
  let prevZ = Infinity;
  for (let i = 0; i < coords.length; i++) {
    const pt = coords[i];
    const [x, z] = projectLatLon(pt.lat, pt.lon);
    if (i === 0 || i === coords.length - 1 || Math.hypot(x - prevX, z - prevZ) >= minStep) {
      flat.push(x, z);
      prevX = x;
      prevZ = z;
    }
  }
  return flat;
}

/**
 * Stitches unclosed member ways of an OSM multipolygon relation into closed rings.
 */
function stitchWaysIntoRings(wayGeoms) {
  const closedRings = [];
  const segments = wayGeoms
    .filter((g) => Array.isArray(g) && g.length >= 2)
    .map((g) => g.slice());

  while (segments.length > 0) {
    let current = segments.pop();
    let changed = true;
    while (changed) {
      changed = false;
      const first = current[0];
      const last = current[current.length - 1];
      if (
        current.length >= 4 &&
        Math.abs(first.lat - last.lat) < 1e-6 &&
        Math.abs(first.lon - last.lon) < 1e-6
      ) {
        break;
      }
      for (let i = 0; i < segments.length; i++) {
        const seg = segments[i];
        const sFirst = seg[0];
        const sLast = seg[seg.length - 1];
        if (Math.abs(last.lat - sFirst.lat) < 1e-5 && Math.abs(last.lon - sFirst.lon) < 1e-5) {
          current = current.concat(seg.slice(1));
          segments.splice(i, 1);
          changed = true;
          break;
        } else if (Math.abs(last.lat - sLast.lat) < 1e-5 && Math.abs(last.lon - sLast.lon) < 1e-5) {
          current = current.concat(seg.slice(0, -1).reverse());
          segments.splice(i, 1);
          changed = true;
          break;
        } else if (Math.abs(first.lat - sLast.lat) < 1e-5 && Math.abs(first.lon - sLast.lon) < 1e-5) {
          current = seg.slice(0, -1).concat(current);
          segments.splice(i, 1);
          changed = true;
          break;
        } else if (Math.abs(first.lat - sFirst.lat) < 1e-5 && Math.abs(first.lon - sFirst.lon) < 1e-5) {
          current = seg.slice(1).reverse().concat(current);
          segments.splice(i, 1);
          changed = true;
          break;
        }
      }
    }
    if (current.length >= 3) {
      closedRings.push(current);
    }
  }
  return closedRings;
}

async function main() {
  // Bounding box covering Paris Intra-Muros + immediate Seine curves
  const S = 48.816;
  const W = 2.255;
  const N = 48.902;
  const E = 2.415;
  const bbox = `${S},${W},${N},${E}`;

  // 1a. Fetch Water, Islands, Parks & Trees
  const waterParksQuery = `
[out:json][timeout:45][bbox:${bbox}];
(
  way["place"="island"];
  way["place"="islet"];
  relation["place"="island"];
  relation["place"="islet"];
  way["waterway"="river"];
  way["waterway"="canal"];
  way["waterway"="riverbank"];
  way["natural"="water"];
  way["leisure"="park"];
  way["leisure"="garden"];
  relation["leisure"="park"];
  relation["leisure"="garden"];
  way["landuse"="grass"];
  way["landuse"="cemetery"];
  way["landuse"="forest"];
  way["landuse"="village_green"];
  way["landuse"="recreation_ground"];
  way["natural"="wood"];
  way["natural"="tree_row"];
);
out geom qt;
`;

  // 1b. Fetch All Streets, Boulevards, Avenues, Quais, Bridges & Residential Streets (using exact B-tree tag indexes!)
  const streetsQuery = `
[out:json][timeout:45][bbox:${bbox}];
(
  way["highway"="motorway"];
  way["highway"="trunk"];
  way["highway"="primary"];
  way["highway"="secondary"];
  way["highway"="tertiary"];
  way["highway"="unclassified"];
  way["highway"="residential"];
  way["highway"="pedestrian"];
  way["highway"="living_street"];
);
out geom qt;
`;

  const [waterParksEls, streetEls] = await Promise.all([
    queryOverpassWithRetry(waterParksQuery, 'Paris Water, Islands, Parks & Trees', 0),
    queryOverpassWithRetry(streetsQuery, 'Paris Complete Street Network', 1)
  ]);
  const infraElements = [...waterParksEls, ...streetEls];

  const islands = [];
  const waterPolygons = [];
  const waterLines = [];
  const parks = [];
  const trees = [];
  const roads = [];

  for (const el of infraElements) {
    const tags = el.tags || {};

    // Check Islands
    const isIsland =
      tags.place === 'islet' ||
      tags.place === 'island' ||
      /Île de la Cité|Île Saint-Louis|Île aux Cygnes/i.test(tags.name || '');

    if (isIsland && !tags.highway && !tags.building) {
      if (el.type === 'way' && el.geometry) {
        const ring = simplifyRing(el.geometry, 0.015);
        if (ring.length >= 6 && Math.abs(polygonSignedArea(ring)) > 0.02) {
          islands.push({ name: tags.name || 'Île', outer: ring });
        }
      } else if (el.type === 'relation' && el.members) {
        const outerWays = el.members
          .filter((m) => m.type === 'way' && (m.role === 'outer' || !m.role) && m.geometry)
          .map((m) => m.geometry);
        const stitched = stitchWaysIntoRings(outerWays);
        for (const r of stitched) {
          const ring = simplifyRing(r, 0.015);
          if (ring.length >= 6 && Math.abs(polygonSignedArea(ring)) > 0.02) {
            islands.push({ name: tags.name || 'Île', outer: ring });
          }
        }
      }
      continue;
    }

    // Check Water
    if (tags.natural === 'water' || tags.water || tags.waterway === 'riverbank') {
      if (el.type === 'way' && el.geometry) {
        const ring = simplifyRing(el.geometry, 0.03);
        if (ring.length >= 6 && Math.abs(polygonSignedArea(ring)) > 0.04) {
          waterPolygons.push({ outer: ring, holes: [] });
        }
      } else if (el.type === 'relation' && el.members) {
        const outerWays = el.members
          .filter((m) => m.type === 'way' && (m.role === 'outer' || !m.role) && m.geometry)
          .map((m) => m.geometry);
        const innerWays = el.members
          .filter((m) => m.type === 'way' && m.role === 'inner' && m.geometry)
          .map((m) => m.geometry);
        const outers = stitchWaysIntoRings(outerWays)
          .map((r) => simplifyRing(r, 0.03))
          .filter((r) => r.length >= 6);
        const inners = stitchWaysIntoRings(innerWays)
          .map((r) => simplifyRing(r, 0.02))
          .filter((r) => r.length >= 6);
        for (const o of outers) {
          if (Math.abs(polygonSignedArea(o)) > 0.04) {
            waterPolygons.push({ outer: o, holes: inners });
          }
        }
        // Any inner ring of a river water multipolygon with significant area is an island!
        for (const inn of inners) {
          if (Math.abs(polygonSignedArea(inn)) > 0.08) {
            islands.push({ name: tags.name ? `${tags.name} Island` : 'Île', outer: inn });
          }
        }
      }
      continue;
    }

    if (tags.waterway === 'river' || tags.waterway === 'canal') {
      if (el.type === 'way' && el.geometry) {
        const pts = simplifyLine(el.geometry, 0.04);
        if (pts.length >= 4) {
          waterLines.push({
            type: tags.waterway,
            name: tags.name || '',
            pts
          });
        }
      }
      continue;
    }

    // Check Tree Rows
    if (tags.natural === 'tree_row' && el.type === 'way' && el.geometry) {
      const pts = simplifyLine(el.geometry, 0.45);
      for (let i = 0; i < pts.length; i += 2) {
        trees.push([pts[i], pts[i + 1]]);
      }
      continue;
    }

    // Check Parks & Gardens
    if (
      tags.leisure === 'park' ||
      tags.leisure === 'garden' ||
      tags.landuse === 'grass' ||
      tags.landuse === 'cemetery' ||
      tags.landuse === 'forest' ||
      tags.landuse === 'village_green' ||
      tags.landuse === 'recreation_ground' ||
      tags.natural === 'wood'
    ) {
      if (el.type === 'way' && el.geometry) {
        const ring = simplifyRing(el.geometry, 0.025);
        if (ring.length >= 6 && Math.abs(polygonSignedArea(ring)) > 0.015) {
          parks.push({
            name: tags.name || '',
            kind: tags.leisure || tags.landuse || tags.natural,
            outer: ring
          });
        }
      } else if (el.type === 'relation' && el.members) {
        const outerWays = el.members
          .filter((m) => m.type === 'way' && (m.role === 'outer' || !m.role) && m.geometry)
          .map((m) => m.geometry);
        for (const r of stitchWaysIntoRings(outerWays)) {
          const ring = simplifyRing(r, 0.025);
          if (ring.length >= 6 && Math.abs(polygonSignedArea(ring)) > 0.015) {
            parks.push({
              name: tags.name || '',
              kind: tags.leisure || tags.landuse || tags.natural,
              outer: ring
            });
          }
        }
      }
      continue;
    }

    // Check Highways / Streets
    if (tags.highway && el.type === 'way' && el.geometry) {
      // Skip underground road tunnels (unless bridge)
      if (tags.tunnel === 'yes' && tags.highway !== 'motorway') continue;
      const hw = tags.highway;
      const minStep = hw === 'residential' || hw === 'living_street' ? 0.06 : 0.04;
      const pts = simplifyLine(el.geometry, minStep);
      if (pts.length >= 4) {
        let tier = 0; // 0: residential/pedestrian, 1: tertiary, 2: secondary, 3: primary/trunk, 4: motorway
        if (hw === 'motorway') tier = 4;
        else if (hw === 'trunk' || hw === 'primary') tier = 3;
        else if (hw === 'secondary') tier = 2;
        else if (hw === 'tertiary') tier = 1;
        const isBridge = tags.bridge === 'yes' || tags.bridge === 'viaduct' ? 1 : 0;
        roads.push([pts, tier, isBridge]);
      }
    }
  }

  console.log(
    `[OSM] Parsed ${islands.length} islands, ${waterPolygons.length} water polygons, ${parks.length} parks/squares, ${trees.length} tree points, ${roads.length} street ways.`
  );

  // 2. Fetch Exact Building Footprints across Paris in a 4x4 spatial grid
  const rows = 4;
  const cols = 4;
  const latStep = (N - S) / rows;
  const lonStep = (E - W) / cols;

  const buildings = [];
  const seenBuildingIds = new Set();

  const tileTasks = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const tS = (S + r * latStep).toFixed(5);
      const tN = (S + (r + 1) * latStep).toFixed(5);
      const tW = (W + c * lonStep).toFixed(5);
      const tE = (W + (c + 1) * lonStep).toFixed(5);
      tileTasks.push({ r, c, bbox: `${tS},${tW},${tN},${tE}` });
    }
  }

  // Process tiles in batches of 2 across the Overpass mirrors
  for (let i = 0; i < tileTasks.length; i += 2) {
    const batch = tileTasks.slice(i, i + 2);
    await Promise.all(
      batch.map(async (tile, idx) => {
        const bQuery = `
[out:json][timeout:45][bbox:${tile.bbox}];
(
  way["building"];
  relation["building"];
);
out geom qt;
`;
        const els = await queryOverpassWithRetry(
          bQuery,
          `Buildings Tile (${tile.r + 1},${tile.c + 1}) [${tile.bbox}]`,
          idx
        );

        for (const el of els) {
          const uid = `${el.type}:${el.id}`;
          if (seenBuildingIds.has(uid)) continue;
          seenBuildingIds.add(uid);

          const tags = el.tags || {};
          // Parse height or building:levels from OSM
          let levels = parseFloat(tags['building:levels'] || '');
          let heightM = parseFloat(tags.height || '');
          let hWorld = 1.38; // Standard 6-story Haussmannian default (~20m)
          if (!Number.isNaN(heightM) && heightM > 2) {
            hWorld = Math.min(9.5, Math.max(0.45, heightM * 0.068));
          } else if (!Number.isNaN(levels) && levels >= 1) {
            hWorld = Math.min(9.5, Math.max(0.45, levels * 0.23));
          } else {
            // Subtle deterministic variation around Haussmannian 5-7 stories
            hWorld = 1.22 + ((el.id % 7) * 0.06);
          }
          hWorld = Math.round(hWorld * 100) / 100;

          // Determine style flag: 0 = Haussmannian limestone, 1 = HBM brick / suburban, 2 = Modern glass tower, 3 = Historic/Church/Civic
          let style = 0;
          if (hWorld > 2.4 || tags['building:material'] === 'glass' || tags.building === 'office') {
            style = 2;
          } else if (
            tags.building === 'church' ||
            tags.building === 'cathedral' ||
            tags.building === 'civic' ||
            tags.building === 'public' ||
            tags.building === 'train_station'
          ) {
            style = 3;
          } else if (tags['building:material'] === 'brick') {
            style = 1;
          }

          if (el.type === 'way' && el.geometry) {
            const ring = simplifyRing(el.geometry, 0.022);
            if (ring.length < 6) continue;
            const area = Math.abs(polygonSignedArea(ring));
            // Filter out tiny sheds (< ~0.008 world sq units ~ 65 m^2)
            if (area < 0.0065) continue;
            buildings.push([ring, [], hWorld, style]);
          } else if (el.type === 'relation' && el.members) {
            const outerWays = el.members
              .filter((m) => m.type === 'way' && (m.role === 'outer' || !m.role) && m.geometry)
              .map((m) => m.geometry);
            const innerWays = el.members
              .filter((m) => m.type === 'way' && m.role === 'inner' && m.geometry)
              .map((m) => m.geometry);

            const outers = stitchWaysIntoRings(outerWays)
              .map((r) => simplifyRing(r, 0.022))
              .filter((r) => r.length >= 6);
            const inners = stitchWaysIntoRings(innerWays)
              .map((r) => simplifyRing(r, 0.022))
              .filter((r) => r.length >= 6 && Math.abs(polygonSignedArea(r)) > 0.002);

            for (const o of outers) {
              const area = Math.abs(polygonSignedArea(o));
              if (area < 0.0065) continue;
              buildings.push([o, inners.slice(0, 6), hWorld, style]);
            }
          }
        }
      })
    );
  }

  console.log(`[OSM] Total exact building footprints extracted: ${buildings.length}`);

  const outData = {
    meta: {
      centerLat: CENTER_LAT,
      centerLon: CENTER_LON,
      generatedAt: new Date().toISOString(),
      counts: {
        islands: islands.length,
        waterPolygons: waterPolygons.length,
        waterLines: waterLines.length,
        parks: parks.length,
        trees: trees.length,
        roads: roads.length,
        buildings: buildings.length
      }
    },
    islands,
    waterPolygons,
    waterLines,
    parks,
    trees,
    roads,
    buildings
  };

  const outDir = path.resolve(process.cwd(), 'public/data');
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, 'paris_osm.json');
  fs.writeFileSync(outFile, JSON.stringify(outData));
  const sizeMb = (fs.statSync(outFile).size / (1024 * 1024)).toFixed(2);
  console.log(`[OSM] ✓ Saved ${outFile} (${sizeMb} MB)`);
}

main().catch((err) => {
  console.error('[OSM] Fatal error:', err);
  process.exit(1);
});
