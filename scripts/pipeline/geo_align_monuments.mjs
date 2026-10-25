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
import { resolveSafeWorkspacePath } from './security_utils.mjs';

/**
 * Normalizes an angle in radians to the interval [-π, +π].
 */
export function normalizeAnglePi(angle) {
  let a = angle;
  while (a > Math.PI) a -= Math.PI * 2;
  while (a < -Math.PI) a += Math.PI * 2;
  return a;
}

/**
 * Given a target base angle (defined modulo `period`, e.g. π for symmetric axes or π/2 for square footprints)
 * and a reference angle `refAngle`, returns the equivalent angle `target + k * period` in [-π, +π]
 * closest to `refAngle`.
 */
export function closestEquivalentAngle(target, refAngle, period = Math.PI) {
  let best = normalizeAnglePi(target);
  let bestDiff = Infinity;
  for (let k = -4; k <= 4; k++) {
    const candidate = normalizeAnglePi(target + k * period);
    const diff = Math.abs(normalizeAnglePi(candidate - refAngle));
    if (diff < bestDiff) {
      bestDiff = diff;
      best = candidate;
    }
  }
  return Number(best.toFixed(3));
}

/**
 * Inspects a compiled `.glb` binary file and computes the local Three.js bounding box
 * `(spanX, spanY, spanZ)` and horizontal principal axis (`'X'`, `'Z'`, or `'SQUARE'`)
 * for each `Monument_*` root node.
 *
 * Coordinate convention in glTF / Three.js (`export_yup=True` from Blender):
 * - `+X` = East  (Blender `+X`)
 * - `+Y` = Up    (Blender `+Z`)
 * - `+Z` = South (Blender `-Y`)
 *
 * When `clone.rotation.set(0, rotationY, 0)` is applied in Three.js:
 * - A model elongated along `X` (`axis === 'X'`) points along `(cos(rotationY), -sin(rotationY))` in `(x, z)`.
 *   Thus to align its long axis with a world vector `(dx, dz)`: `rotationY = Math.atan2(-dz, dx)`.
 * - A model elongated along `Z` (`axis === 'Z'`) points along `(sin(rotationY), cos(rotationY))` in `(x, z)`.
 *   Thus to align its long axis with a world vector `(dx, dz)`: `rotationY = Math.atan2(dx, dz)`.
 */
export function inspectGlbMonumentBounds(glbRelPath) {
  let fullPath;
  try {
    const parts = glbRelPath.split('/').filter(Boolean);
    fullPath = resolveSafeWorkspacePath(parts[0], ...parts.slice(1));
  } catch {
    return {};
  }
  if (!fs.existsSync(fullPath)) {
    return {};
  }

  try {
    const buf = fs.readFileSync(fullPath);
    if (buf.length < 28) return {};
    const magic = buf.readUInt32LE(0);
    if (magic !== 0x46546c67) return {}; // 'glTF'
    const jsonLen = buf.readUInt32LE(12);
    const gltf = JSON.parse(buf.toString('utf8', 20, 20 + jsonLen));
    const nodes = gltf.nodes || [];
    const meshes = gltf.meshes || [];
    const accessors = gltf.accessors || [];

    function getSubtreeBox(nodeIdx) {
      const node = nodes[nodeIdx];
      if (!node) {
        return {
          minX: Infinity,
          maxX: -Infinity,
          minY: Infinity,
          maxY: -Infinity,
          minZ: Infinity,
          maxZ: -Infinity,
        };
      }
      let minX = Infinity;
      let maxX = -Infinity;
      let minY = Infinity;
      let maxY = -Infinity;
      let minZ = Infinity;
      let maxZ = -Infinity;
      const t = node.translation || [0, 0, 0];
      const s = node.scale || [1, 1, 1];

      if (node.mesh !== undefined && meshes[node.mesh]) {
        for (const prim of meshes[node.mesh].primitives || []) {
          const posAccIdx = prim.attributes?.POSITION;
          const posAcc = posAccIdx !== undefined ? accessors[posAccIdx] : null;
          if (posAcc && Array.isArray(posAcc.min) && Array.isArray(posAcc.max)) {
            const x0 = posAcc.min[0] * s[0] + t[0];
            const x1 = posAcc.max[0] * s[0] + t[0];
            const y0 = posAcc.min[1] * s[1] + t[1];
            const y1 = posAcc.max[1] * s[1] + t[1];
            const z0 = posAcc.min[2] * s[2] + t[2];
            const z1 = posAcc.max[2] * s[2] + t[2];
            minX = Math.min(minX, x0, x1);
            maxX = Math.max(maxX, x0, x1);
            minY = Math.min(minY, y0, y1);
            maxY = Math.max(maxY, y0, y1);
            minZ = Math.min(minZ, z0, z1);
            maxZ = Math.max(maxZ, z0, z1);
          }
        }
      }

      for (const childIdx of node.children || []) {
        const cb = getSubtreeBox(childIdx);
        if (Number.isFinite(cb.minX)) {
          minX = Math.min(minX, cb.minX * s[0] + t[0]);
          maxX = Math.max(maxX, cb.maxX * s[0] + t[0]);
          minY = Math.min(minY, cb.minY * s[1] + t[1]);
          maxY = Math.max(maxY, cb.maxY * s[1] + t[1]);
          minZ = Math.min(minZ, cb.minZ * s[2] + t[2]);
          maxZ = Math.max(maxZ, cb.maxZ * s[2] + t[2]);
        }
      }

      return { minX, maxX, minY, maxY, minZ, maxZ };
    }

    const boundsByNode = {};
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      if (!n.name) continue;
      let box;
      if (Array.isArray(n.children) && n.children.length > 0) {
        let minX = Infinity;
        let maxX = -Infinity;
        let minY = Infinity;
        let maxY = -Infinity;
        let minZ = Infinity;
        let maxZ = -Infinity;
        for (const cIdx of n.children) {
          const cb = getSubtreeBox(cIdx);
          if (Number.isFinite(cb.minX)) {
            minX = Math.min(minX, cb.minX);
            maxX = Math.max(maxX, cb.maxX);
            minY = Math.min(minY, cb.minY);
            maxY = Math.max(maxY, cb.maxY);
            minZ = Math.min(minZ, cb.minZ);
            maxZ = Math.max(maxZ, cb.maxZ);
          }
        }
        box = { minX, maxX, minY, maxY, minZ, maxZ };
      } else {
        box = getSubtreeBox(i);
      }

      if (Number.isFinite(box.minX) && Number.isFinite(box.maxX)) {
        const spanX = Math.max(0.05, box.maxX - box.minX);
        const spanY = Math.max(0.05, box.maxY - box.minY);
        const spanZ = Math.max(0.05, box.maxZ - box.minZ);
        const ratio = Math.max(spanX, spanZ) / Math.min(spanX, spanZ);
        const primaryAxis = ratio < 1.12 ? 'SQUARE' : spanX >= spanZ ? 'X' : 'Z';
        boundsByNode[n.name] = {
          spanX: Number(spanX.toFixed(2)),
          spanY: Number(spanY.toFixed(2)),
          spanZ: Number(spanZ.toFixed(2)),
          aspectRatio: Number(ratio.toFixed(2)),
          primaryAxis,
        };
      }
    }
    return boundsByNode;
  } catch {
    return {};
  }
}

/**
 * Computes the centroid, dominant wall orientation, and principal axis dimensions
 * of a flat `[x0, z0, x1, z1, ...]` OSM building footprint ring.
 */
function analyzeOsmFootprintPolygon(flatPts) {
  const n = Math.floor((flatPts?.length || 0) / 2);
  if (n < 3) return null;

  let cx = 0;
  let cz = 0;
  for (let i = 0; i < n * 2; i += 2) {
    cx += flatPts[i];
    cz += flatPts[i + 1];
  }
  cx /= n;
  cz /= n;

  // Compute dominant wall orientation modulo π/2 and modulo π
  let sumCos2 = 0;
  let sumSin2 = 0;
  let sumCos4 = 0;
  let sumSin4 = 0;
  let perimeter = 0;

  for (let i = 0; i < n * 2; i += 2) {
    const x1 = flatPts[i];
    const z1 = flatPts[i + 1];
    const x2 = flatPts[(i + 2) % (n * 2)];
    const z2 = flatPts[(i + 3) % (n * 2)];
    const dx = x2 - x1;
    const dz = z2 - z1;
    const len = Math.hypot(dx, dz);
    if (len < 0.008) continue;

    // Angle for an X-aligned axis in Three.js: (cos θ, -sin θ) || (dx, dz) => θ = atan2(-dz, dx)
    const thetaX = Math.atan2(-dz, dx);
    sumCos2 += len * Math.cos(2 * thetaX);
    sumSin2 += len * Math.sin(2 * thetaX);
    sumCos4 += len * Math.cos(4 * thetaX);
    sumSin4 += len * Math.sin(4 * thetaX);
    perimeter += len;
  }

  if (perimeter < 0.05) return null;

  const domAngleX = 0.5 * Math.atan2(sumSin2, sumCos2);
  const gridAngleX = 0.25 * Math.atan2(sumSin4, sumCos4);

  // Measure bounding box along domAngleX (u) and perpendicular (v)
  const cosA = Math.cos(domAngleX);
  const sinA = -Math.sin(domAngleX);
  let minU = Infinity;
  let maxU = -Infinity;
  let minV = Infinity;
  let maxV = -Infinity;

  for (let i = 0; i < n * 2; i += 2) {
    const dx = flatPts[i] - cx;
    const dz = flatPts[i + 1] - cz;
    const u = dx * cosA + dz * sinA;
    const v = -dx * sinA + dz * cosA;
    if (u < minU) minU = u;
    if (u > maxU) maxU = u;
    if (v < minV) minV = v;
    if (v > maxV) maxV = v;
  }

  const spanU = maxU - minU;
  const spanV = maxV - minV;
  // Angle in Three.js for an X-elongated model to align with the building's long axis
  const longAxisRotX = spanU >= spanV ? domAngleX : normalizeAnglePi(domAngleX + Math.PI * 0.5);
  // Angle in Three.js for a Z-elongated model to align with the building's long axis
  const longAxisRotZ = normalizeAnglePi(longAxisRotX + Math.PI * 0.5);
  const spanLong = Math.max(spanU, spanV);
  const spanShort = Math.min(spanU, spanV);

  return {
    cx,
    cz,
    perimeter,
    spanLong,
    spanShort,
    aspectRatio: spanLong / Math.max(0.02, spanShort),
    longAxisRotX,
    longAxisRotZ,
    gridAngleX,
  };
}

/**
 * Finds the best matching OSM road segment near `(tx, tz)`.
 * When `requireBridge` is true, prioritizes `isBridge === 1` road segments.
 */
function findBestOsmRoadAlignment(osmData, tx, tz, searchRadius = 5.5, requireBridge = false) {
  const roads = osmData?.roads || [];
  if (roads.length === 0) return null;

  let bestSeg = null;
  let bestScore = Infinity;

  // Accumulate direction histogram of nearby matching segments so curved or dual-carriageway bridges average cleanly
  let vecX = 0;
  let vecZ = 0;
  let weightedPx = 0;
  let weightedPz = 0;
  let totalWeight = 0;

  for (const [pts, tier, isBridge] of roads) {
    if (requireBridge && !isBridge) continue;
    if (!pts || pts.length < 4) continue;

    for (let i = 0; i < pts.length - 2; i += 2) {
      const ax = pts[i];
      const az = pts[i + 1];
      const bx = pts[i + 2];
      const bz = pts[i + 3];
      const dx = bx - ax;
      const dz = bz - az;
      const lenSq = dx * dx + dz * dz;
      if (lenSq < 0.015) continue;

      const t = Math.max(0, Math.min(1, ((tx - ax) * dx + (tz - az) * dz) / lenSq));
      const px = ax + t * dx;
      const pz = az + t * dz;
      const dist = Math.hypot(tx - px, tz - pz);
      if (dist > searchRadius) continue;

      const len = Math.sqrt(lenSq);
      const tierBonus = (tier || 1) * 0.15;
      const score = dist - Math.min(len, 4.0) * 0.18 - tierBonus;

      if (score < bestScore) {
        bestScore = score;
        bestSeg = { dist, px, pz, dx, dz, len, isBridge };
      }

      if (dist < Math.min(2.2, searchRadius * 0.6)) {
        const w = (len * (1 + tierBonus)) / Math.max(0.15, dist + 0.15);
        // Keep consistent vector sign with bestSeg or first segment
        if (vecX * dx + vecZ * dz < 0) {
          vecX -= dx * w;
          vecZ -= dz * w;
        } else {
          vecX += dx * w;
          vecZ += dz * w;
        }
        weightedPx += px * w;
        weightedPz += pz * w;
        totalWeight += w;
      }
    }
  }

  if (!bestSeg) return null;

  const finalDx = totalWeight > 0 ? vecX : bestSeg.dx;
  const finalDz = totalWeight > 0 ? vecZ : bestSeg.dz;
  const rotForXModel = Math.atan2(-finalDz, finalDx);
  const rotForZModel = Math.atan2(finalDx, finalDz);

  return {
    dist: bestSeg.dist,
    px: bestSeg.dist < 0.85 ? bestSeg.px : totalWeight > 0 ? weightedPx / totalWeight : bestSeg.px,
    pz: bestSeg.dist < 0.85 ? bestSeg.pz : totalWeight > 0 ? weightedPz / totalWeight : bestSeg.pz,
    rotForXModel,
    rotForZModel,
    len: bestSeg.len,
  };
}

/**
 * Aligns procedural `preset.bridges` (`CityBridgeDef[]`) to real OpenStreetMap bridge road segments.
 * Note: `VoxelParisBuilder.buildBridges()` constructs bridge decks along Three.js `Z` (`BoxGeometry(w, h, spanLen)`)
 * and rotates them by `rotation.y = Math.atan2(dx, dz)` (`rotForZModel`).
 */
export function alignBridgesToOsmMap(bridges, osmData, project) {
  if (!Array.isArray(bridges) || bridges.length === 0) return [];

  return bridges.map((b) => {
    const [bx, bz] = project(b.lat, b.lon);
    let match = findBestOsmRoadAlignment(osmData, bx, bz, 5.0, true);
    if (!match) {
      match = findBestOsmRoadAlignment(osmData, bx, bz, 2.5, false);
    }

    if (match) {
      const alignedRotY = closestEquivalentAngle(match.rotForZModel, b.rotationY ?? 0, Math.PI);
      return {
        ...b,
        rotationY: alignedRotY,
      };
    }
    return b;
  });
}

/**
 * Curated bank-to-bank / pylon-to-pylon WGS84 span endpoints for major world bridge monuments
 * so their 3D Blender models sit on the exact midpoint of the water crossing, align to the
 * exact road bearing, and scale to span shore-to-shore.
 */
const BRIDGE_MONUMENT_SPAN_ENDPOINTS = {
  'monument-harbour-bridge': {
    // Dawes Point South Granite Pylon -> Milsons Point North Granite Pylon
    p1: [-33.8548, 151.2091],
    p2: [-33.8498, 151.2125],
    minScale: 1.05,
    maxScale: 1.18,
  },
  'monument-golden-gate-bridge': {
    // Fort Point South Abutment -> Lime Point North Abutment across Golden Gate Strait
    p1: [37.8118, -122.4775],
    p2: [37.8252, -122.4792],
    minScale: 1.85,
    maxScale: 2.15,
  },
  'monument-brooklyn-bridge': {
    // Manhattan Tower/Approach -> Brooklyn Tower/Approach across East River
    p1: [40.7073, -74.0008],
    p2: [40.7042, -73.9928],
    minScale: 0.96,
    maxScale: 1.12,
  },
  'monument-dom-luis-bridge': {
    // Cais da Ribeira North Deck -> Vila Nova de Gaia South Deck across Rio Douro
    p1: [41.1411, -8.6098],
    p2: [41.1388, -8.6091],
    minScale: 0.78,
    maxScale: 0.92,
  },
  'monument-rainbow-bridge': {
    // Shibaura Anchorage -> Odaiba Anchorage across Tokyo Bay
    p1: [35.6378, 139.7585],
    p2: [35.6352, 139.7678],
    minScale: 1.12,
    maxScale: 1.35,
  },
  'monument-tower-bridge': {
    // Tower Hill North Abutment -> Horsleydown South Abutment across River Thames
    p1: [51.5066, -0.0750],
    p2: [51.5044, -0.0757],
    minScale: 0.80,
    maxScale: 0.95,
  },
  'monument-bolte-bridge': {
    // Lorimer Street South Bank -> Victoria Harbour North Bank across the Yarra River in Docklands
    p1: [-37.8190, 144.9383],
    p2: [-37.8146, 144.9379],
    minScale: 0.95,
    maxScale: 1.18,
  },
};

/**
 * Aligns `monuments` in Step 2 of the City Pipeline against:
 * 1. The compiled 3D Blender GLB bounding boxes (`glbBounds`: `primaryAxis = 'X' | 'Z' | 'SQUARE'`), and
 * 2. The real OpenStreetMap geometry (`osmData.buildings` & `osmData.roads`) from Step 1.
 */
export function alignMonumentsToOsmMap(monuments, osmData, glbBounds, project, geoConfig) {
  if (!Array.isArray(monuments) || monuments.length === 0) return [];

  const centerLat = geoConfig.centerLat;
  const centerLon = geoConfig.centerLon;
  const kmPerDegLat = geoConfig.kmPerDegLat || 111.132;
  const kmPerDegLon = geoConfig.kmPerDegLon || 90.0;
  const worldUnitsPerKm = geoConfig.worldUnitsPerKm || 10.8;

  // Approximate inverse helper for small local nudges (< 1.5 world units)
  function nudgeLatLonFromWorldDelta(lat, lon, dxWorld, dzWorld) {
    const dLon = dxWorld / (worldUnitsPerKm * kmPerDegLon);
    const dLat = -dzWorld / (worldUnitsPerKm * kmPerDegLat);
    return [Number((lat + dLat).toFixed(6)), Number((lon + dLon).toFixed(6))];
  }

  return monuments.map((m) => {
    const glbInfo = glbBounds?.[m.nodeName] || {
      spanX: 4.5,
      spanZ: 4.5,
      spanY: 5.0,
      primaryAxis: 'X',
      aspectRatio: 1.0,
    };
    const axis = glbInfo.primaryAxis;
    const isBridgeMonument =
      Boolean(BRIDGE_MONUMENT_SPAN_ENDPOINTS[m.id]) ||
      /bridge|viaduct|aqueduct|arcos-lapa|pont/i.test(`${m.id} ${m.archetype || ''}`);

    // 1. Explicit Bank-to-Bank Span Endpoint Alignment for Major Bridges
    const spanSpec = BRIDGE_MONUMENT_SPAN_ENDPOINTS[m.id];
    if (spanSpec) {
      const [x1, z1] = project(spanSpec.p1[0], spanSpec.p1[1]);
      const [x2, z2] = project(spanSpec.p2[0], spanSpec.p2[1]);
      const midLat = Number(((spanSpec.p1[0] + spanSpec.p2[0]) * 0.5).toFixed(6));
      const midLon = Number(((spanSpec.p1[1] + spanSpec.p2[1]) * 0.5).toFixed(6));
      const [mx, mz] = project(midLat, midLon);

      // Snap onto the exact OSM bridge road centerline if present at the midpoint
      const osmBridgeRoad = findBestOsmRoadAlignment(osmData, mx, mz, 3.5, true);
      const finalX = osmBridgeRoad && osmBridgeRoad.dist < 1.2 ? Number(osmBridgeRoad.px.toFixed(2)) : mx;
      const finalZ = osmBridgeRoad && osmBridgeRoad.dist < 1.2 ? Number(osmBridgeRoad.pz.toFixed(2)) : mz;

      const dx = x2 - x1;
      const dz = z2 - z1;
      const spanDistWorld = Math.hypot(dx, dz);

      const rawTargetRot =
        axis === 'Z' ? Math.atan2(dx, dz) : Math.atan2(-dz, dx);
      const alignedRotY = Number(normalizeAnglePi(rawTargetRot).toFixed(3));

      const modelSpan = axis === 'Z' ? glbInfo.spanZ : glbInfo.spanX;
      const idealScale = spanDistWorld / Math.max(1.0, modelSpan * 0.75);
      const alignedScale = Number(
        Math.max(spanSpec.minScale ?? m.scale, Math.min(spanSpec.maxScale ?? 2.2, idealScale)).toFixed(2)
      );

      console.log(
        `  [GeoAlign] Bridge Monument ${m.id} (${axis}-axis): pos=[${finalX}, ${finalZ}] rotY=${m.rotationY} -> ${alignedRotY} scale=${m.scale} -> ${alignedScale}`
      );

      return {
        ...m,
        lat: midLat,
        lon: midLon,
        x: finalX,
        z: finalZ,
        rotationY: alignedRotY,
        scale: alignedScale,
      };
    }

    // 2. Other Bridge / Aqueduct Monuments (e.g., Arcos da Lapa)
    if (isBridgeMonument) {
      const osmBridge =
        findBestOsmRoadAlignment(osmData, m.x, m.z, 4.5, true) ||
        findBestOsmRoadAlignment(osmData, m.x, m.z, 2.5, false);

      if (osmBridge) {
        const rawRot = axis === 'Z' ? osmBridge.rotForZModel : osmBridge.rotForXModel;
        const alignedRotY = closestEquivalentAngle(rawRot, m.rotationY ?? 0, Math.PI);
        const snapX = osmBridge.dist < 0.85 ? Number(osmBridge.px.toFixed(2)) : m.x;
        const snapZ = osmBridge.dist < 0.85 ? Number(osmBridge.pz.toFixed(2)) : m.z;
        const [newLat, newLon] = nudgeLatLonFromWorldDelta(
          m.lat,
          m.lon,
          snapX - m.x,
          snapZ - m.z
        );
        console.log(
          `  [GeoAlign] Span Monument ${m.id} (${axis}-axis): pos=[${snapX}, ${snapZ}] rotY=${m.rotationY} -> ${alignedRotY}`
        );
        return {
          ...m,
          lat: newLat,
          lon: newLon,
          x: snapX,
          z: snapZ,
          rotationY: alignedRotY,
        };
      }
    }

    // 3. Building / Landmark Monuments: Match against OSM Building Polygons & Local Street Grid
    const buildings = osmData?.buildings || [];
    let bestBld = null;
    let bestScore = Infinity;

    for (const [outer] of buildings) {
      if (!outer || outer.length < 6) continue;
      // Fast first-vertex check before full polygon analysis
      if (Math.abs(outer[0] - m.x) > 4.5 || Math.abs(outer[1] - m.z) > 4.5) continue;

      const info = analyzeOsmFootprintPolygon(outer);
      // Ignore tiny individual townhouse/shed polygons (< 0.42 world units ~ 40m) so multi-building rows or plazas align to the street grid
      if (!info || info.spanLong < 0.42) continue;
      const dist = Math.hypot(m.x - info.cx, m.z - info.cz);
      if (dist > 2.2) continue;

      // Favor large landmark footprints whose centroid is close to the monument coordinate
      const sizeWeight = Math.min(2.5, info.spanLong) * 0.28;
      const score = dist - sizeWeight;
      if (score < bestScore) {
        bestScore = score;
        bestBld = { ...info, dist };
      }
    }

    if (bestBld) {
      let alignedRotY = m.rotationY ?? 0;
      if (axis === 'SQUARE' || bestBld.aspectRatio < 1.15) {
        // Align 4-sided monument walls with the OSM building's dominant wall grid (modulo π/2)
        alignedRotY = closestEquivalentAngle(bestBld.gridAngleX, m.rotationY ?? 0, Math.PI * 0.5);
      } else {
        // Align the GLB model's long axis ('X' or 'Z') with the OSM building footprint's long axis (modulo π)
        const targetLongRot = axis === 'Z' ? bestBld.longAxisRotZ : bestBld.longAxisRotX;
        alignedRotY = closestEquivalentAngle(targetLongRot, m.rotationY ?? 0, Math.PI);
      }

      // Gently snap (x, z) toward the OSM building footprint centroid if it's a close, well-defined landmark polygon
      let finalX = m.x;
      let finalZ = m.z;
      let finalLat = m.lat;
      let finalLon = m.lon;
      if (bestBld.dist > 0.04 && bestBld.dist < 0.55 && bestBld.spanLong >= 0.45) {
        finalX = Number((m.x * 0.35 + bestBld.cx * 0.65).toFixed(2));
        finalZ = Number((m.z * 0.35 + bestBld.cz * 0.65).toFixed(2));
        [finalLat, finalLon] = nudgeLatLonFromWorldDelta(
          m.lat,
          m.lon,
          finalX - m.x,
          finalZ - m.z
        );
      }

      if (Math.abs(alignedRotY - (m.rotationY ?? 0)) > 0.02 || finalX !== m.x || finalZ !== m.z) {
        console.log(
          `  [GeoAlign] Building Monument ${m.id} (${axis}-axis, OSM ${bestBld.spanLong.toFixed(2)}x${bestBld.spanShort.toFixed(2)}): pos=[${finalX}, ${finalZ}] rotY=${m.rotationY} -> ${alignedRotY}`
        );
      }

      return {
        ...m,
        lat: finalLat,
        lon: finalLon,
        x: finalX,
        z: finalZ,
        rotationY: alignedRotY,
      };
    }

    // 4. Fallback: Align to nearest adjacent OSM street frontage if no building polygon matched
    const nearRoad = findBestOsmRoadAlignment(osmData, m.x, m.z, 2.2, false);
    if (nearRoad) {
      const period = axis === 'SQUARE' ? Math.PI * 0.5 : Math.PI;
      const targetRot = axis === 'Z' ? nearRoad.rotForZModel : nearRoad.rotForXModel;
      const alignedRotY = closestEquivalentAngle(targetRot, m.rotationY ?? 0, period);
      if (Math.abs(alignedRotY - (m.rotationY ?? 0)) > 0.02) {
        console.log(
          `  [GeoAlign] Street-Front Monument ${m.id} (${axis}-axis): rotY=${m.rotationY} -> ${alignedRotY}`
        );
      }
      return {
        ...m,
        rotationY: alignedRotY,
      };
    }

    return m;
  });
}
