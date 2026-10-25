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
import zlib from 'node:zlib';
import { WORKSPACE_ROOT } from './security_utils.mjs';

const TILE_CACHE_DIR = path.join(WORKSPACE_ROOT, 'scripts', 'pipeline', '.dem_cache');

/**
 * Paeth predictor for PNG scanline reconstruction (RFC 2083).
 */
function paethPredictor(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

/**
 * Pure Node.js PNG decoder for 8-bit RGB/RGBA/Palette/Grayscale Terrarium DEM tiles.
 * Returns `{ width, height, rgb: Uint8Array(width * height * 3) }`.
 */
function decodePngRgb(buffer) {
  // Verify 8-byte PNG signature
  if (
    buffer.length < 32 ||
    buffer[0] !== 0x89 ||
    buffer[1] !== 0x50 ||
    buffer[2] !== 0x4e ||
    buffer[3] !== 0x47
  ) {
    throw new Error('Invalid PNG signature in DEM tile');
  }

  let offset = 8;
  let width = 0;
  let height = 0;
  let bitDepth = 8;
  let colorType = 2;
  let palette = null;
  const idatChunks = [];

  while (offset + 8 <= buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString('ascii', offset + 4, offset + 8);
    const dataStart = offset + 8;
    const dataEnd = dataStart + length;
    if (dataEnd > buffer.length) break;

    if (type === 'IHDR') {
      width = buffer.readUInt32BE(dataStart);
      height = buffer.readUInt32BE(dataStart + 4);
      bitDepth = buffer[dataStart + 8];
      colorType = buffer[dataStart + 9];
    } else if (type === 'PLTE') {
      palette = buffer.subarray(dataStart, dataEnd);
    } else if (type === 'IDAT') {
      idatChunks.push(buffer.subarray(dataStart, dataEnd));
    } else if (type === 'IEND') {
      break;
    }

    offset = dataEnd + 4; // skip 4-byte CRC
  }

  if (width <= 0 || height <= 0 || idatChunks.length === 0) {
    throw new Error('Incomplete PNG chunks in DEM tile');
  }
  if (bitDepth !== 8) {
    throw new Error(`Unsupported PNG bitDepth=${bitDepth} in DEM tile`);
  }

  const bpp = colorType === 6 ? 4 : colorType === 2 ? 3 : colorType === 4 ? 2 : 1;
  const rowBytes = width * bpp;
  const inflated = zlib.inflateSync(Buffer.concat(idatChunks));

  const recon = new Uint8Array(height * rowBytes);
  for (let y = 0; y < height; y++) {
    const srcRowOffset = y * (rowBytes + 1);
    const filterType = inflated[srcRowOffset];
    const dstRowOffset = y * rowBytes;
    const prevRowOffset = (y - 1) * rowBytes;

    for (let x = 0; x < rowBytes; x++) {
      const raw = inflated[srcRowOffset + 1 + x];
      const left = x >= bpp ? recon[dstRowOffset + x - bpp] : 0;
      const up = y > 0 ? recon[prevRowOffset + x] : 0;
      const upLeft = y > 0 && x >= bpp ? recon[prevRowOffset + x - bpp] : 0;

      let val = raw;
      if (filterType === 1) {
        val = (raw + left) & 0xff;
      } else if (filterType === 2) {
        val = (raw + up) & 0xff;
      } else if (filterType === 3) {
        val = (raw + ((left + up) >> 1)) & 0xff;
      } else if (filterType === 4) {
        val = (raw + paethPredictor(left, up, upLeft)) & 0xff;
      }
      recon[dstRowOffset + x] = val;
    }
  }

  const rgb = new Uint8Array(width * height * 3);
  for (let i = 0; i < width * height; i++) {
    const outIdx = i * 3;
    if (colorType === 2) {
      rgb[outIdx] = recon[i * 3];
      rgb[outIdx + 1] = recon[i * 3 + 1];
      rgb[outIdx + 2] = recon[i * 3 + 2];
    } else if (colorType === 6) {
      rgb[outIdx] = recon[i * 4];
      rgb[outIdx + 1] = recon[i * 4 + 1];
      rgb[outIdx + 2] = recon[i * 4 + 2];
    } else if (colorType === 3 && palette) {
      const pIdx = recon[i] * 3;
      rgb[outIdx] = palette[pIdx] || 0;
      rgb[outIdx + 1] = palette[pIdx + 1] || 0;
      rgb[outIdx + 2] = palette[pIdx + 2] || 0;
    } else {
      const g = recon[i * bpp];
      rgb[outIdx] = g;
      rgb[outIdx + 1] = g;
      rgb[outIdx + 2] = g;
    }
  }

  return { width, height, rgb };
}

/**
 * Fetches and caches an AWS Open Data Terrarium elevation tile (`z/x/y.png`).
 */
async function fetchTerrariumTile(z, x, y) {
  if (!fs.existsSync(TILE_CACHE_DIR)) {
    fs.mkdirSync(TILE_CACHE_DIR, { recursive: true });
  }
  const cacheFile = path.join(TILE_CACHE_DIR, `terrarium_${z}_${x}_${y}.png`);
  if (fs.existsSync(cacheFile)) {
    return decodePngRgb(fs.readFileSync(cacheFile));
  }

  const url = `https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${z}/${x}/${y}.png`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'ParisMetroMultiCityPipeline/1.0',
    },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} fetching DEM tile ${url}`);
  }
  const arrayBuf = await res.arrayBuffer();
  const buf = Buffer.from(arrayBuf);
  fs.writeFileSync(cacheFile, buf);
  return decodePngRgb(buf);
}

/**
 * Converts `(lat, lon)` to fractional Web Mercator tile coordinates at zoom `z`.
 */
function latLonToTileFraction(lat, lon, z) {
  const n = 2 ** z;
  const xFloat = ((lon + 180) / 360) * n;
  const latRad = (Math.max(-85.05, Math.min(85.05, lat)) * Math.PI) / 180;
  const yFloat =
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n;
  return [xFloat, yFloat];
}

/**
 * Exact analytical inverse of `createProjector(geoConfig)`:
 * maps diorama world coordinates `(x, z)` back to `[lat, lon]`.
 */
export function createInverseProjector(geoConfig) {
  const {
    centerLat,
    centerLon,
    kmPerDegLat = 111.132,
    kmPerDegLon = 90.0,
    coreRadiusKm = 7.5,
    worldUnitsPerKm = 10.8,
  } = geoConfig;

  return function unprojectWorldToLatLon(x, z) {
    const worldDist = Math.hypot(x, z);
    if (worldDist < 1e-6) {
      return [centerLat, centerLon];
    }
    const effectiveKm = worldDist / worldUnitsPerKm;
    let distKm = effectiveKm;
    if (effectiveKm > coreRadiusKm) {
      distKm = coreRadiusKm + Math.expm1((effectiveKm - coreRadiusKm) / 5.6) / 0.30;
    }
    const rawKmX = (x / worldDist) * distKm;
    const rawKmZ = (z / worldDist) * distKm;
    const lon = centerLon + rawKmX / kmPerDegLon;
    const lat = centerLat - rawKmZ / kmPerDegLat;
    return [lat, lon];
  };
}

/**
 * Point-in-polygon raycast on flat `[x0, z0, x1, z1, ...]` coordinate array.
 */
function isPointInFlatRing(px, pz, ring) {
  let inside = false;
  const n = ring.length;
  for (let i = 0, j = n - 2; i < n; j = i, i += 2) {
    const xi = ring[i];
    const zi = ring[i + 1];
    const xj = ring[j];
    const zj = ring[j + 1];
    const intersect =
      zi > pz !== zj > pz && px < ((xj - xi) * (pz - zi)) / (zj - zi + 1e-12) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

/**
 * Squared distance from `(px, pz)` to 2D line segment `(ax, az) -> (bx, bz)`.
 */
function distToSegmentSq(px, pz, ax, az, bx, bz) {
  const dx = bx - ax;
  const dz = bz - az;
  const lenSq = dx * dx + dz * dz;
  if (lenSq < 1e-6) return (px - ax) * (px - ax) + (pz - az) * (pz - az);
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (pz - az) * dz) / lenSq));
  const cx = ax + t * dx;
  const cz = az + t * dz;
  return (px - cx) * (px - cx) + (pz - cz) * (pz - cz);
}

/**
 * Converts meters above a city's water datum into 3D diorama world elevation units.
 * - Up to 160m above datum: linear 1.0 world unit per 82m (matching Paris Montmartre +102m -> 1.24u,
 *   Porto Douro Gorge +85m -> 1.04u, SF Nob Hill +114m -> 1.39u).
 * - Above 160m: smooth hypsometric power curve so dramatic coastal massifs like
 *   SF Twin Peaks (275m -> 3.67u), Rio Sugarloaf (396m -> 4.41u), Dois Irmãos (533m -> 5.04u),
 *   Corcovado (710m -> 5.70u), and Pedra da Gávea (844m -> 6.13u) rise majestically without clipping the camera ceiling.
 */
export function metersToWorldElevation(hMeters) {
  if (hMeters <= 0) return 0;
  const linearPart = Math.min(hMeters, 160) / 82.0;
  if (hMeters <= 160) return linearPart;
  const excess = hMeters - 160;
  return linearPart + Math.sqrt(excess / 82.0) * 1.45;
}

/**
 * Builds a real satellite Digital Elevation Model (DEM) heightmap grid for `preset`
 * over the `[-170, +170] × [-130, +130]` world-unit terrain mesh (`171 × 131` vertices, `step = 2.0`).
 */
export async function buildCityDemHeightmap(preset, osmData, project, offline = false) {
  const unproject = createInverseProjector(preset.geo);
  const zoom = 12; // ~30m native pixel resolution

  const minX = -170;
  const maxX = 170;
  const minZ = -130;
  const maxZ = 130;
  const stepX = 2.0;
  const stepZ = 2.0;
  const cols = Math.round((maxX - minX) / stepX) + 1; // 171
  const rows = Math.round((maxZ - minZ) / stepZ) + 1; // 131

  // Collect all required Web Mercator tiles at zoom 12
  const neededTiles = new Map();
  for (let r = 0; r < rows; r++) {
    const z = minZ + r * stepZ;
    for (let c = 0; c < cols; c++) {
      const x = minX + c * stepX;
      const [lat, lon] = unproject(x, z);
      const [txFloat, tyFloat] = latLonToTileFraction(lat, lon, zoom);
      const tx = Math.floor(txFloat);
      const ty = Math.floor(tyFloat);
      const key = `${tx}_${ty}`;
      if (!neededTiles.has(key)) {
        neededTiles.set(key, { tx, ty, tile: null });
      }
    }
  }

  let loadedCount = 0;
  const tileEntries = Array.from(neededTiles.values());
  const batchSize = 8;
  for (let i = 0; i < tileEntries.length; i += batchSize) {
    const batch = tileEntries.slice(i, i + batchSize);
    await Promise.all(
      batch.map(async (entry) => {
        try {
          entry.tile = await fetchTerrariumTile(zoom, entry.tx, entry.ty);
          if (entry.tile) loadedCount++;
        } catch (err) {
          console.warn(
            `  [DEM] Warning: could not fetch tile ${zoom}/${entry.tx}/${entry.ty}: ${err.message}`
          );
        }
      })
    );
  }

  /**
   * Bilinearly samples elevation in meters from the loaded Terrarium DEM tiles at `(lat, lon)`.
   */
  function sampleRawDemMeters(lat, lon) {
    const [txFloat, tyFloat] = latLonToTileFraction(lat, lon, zoom);
    const tx = Math.floor(txFloat);
    const ty = Math.floor(tyFloat);
    const entry = neededTiles.get(`${tx}_${ty}`);
    if (!entry || !entry.tile) return null;

    const { width, height, rgb } = entry.tile;
    const u = (txFloat - tx) * width - 0.5;
    const v = (tyFloat - ty) * height - 0.5;
    const x0 = Math.max(0, Math.min(width - 1, Math.floor(u)));
    const y0 = Math.max(0, Math.min(height - 1, Math.floor(v)));
    const x1 = Math.max(0, Math.min(width - 1, x0 + 1));
    const y1 = Math.max(0, Math.min(height - 1, y0 + 1));
    const fu = Math.max(0, Math.min(1, u - x0));
    const fv = Math.max(0, Math.min(1, v - y0));

    function pixElev(px, py) {
      const idx = (py * width + px) * 3;
      const r = rgb[idx];
      const g = rgb[idx + 1];
      const b = rgb[idx + 2];
      return r * 256 + g + b / 256 - 32768;
    }

    const e00 = pixElev(x0, y0);
    const e10 = pixElev(x1, y0);
    const e01 = pixElev(x0, y1);
    const e11 = pixElev(x1, y1);
    const top = e00 * (1 - fu) + e10 * fu;
    const bot = e01 * (1 - fu) + e11 * fu;
    return top * (1 - fv) + bot * fv;
  }

  // Determine the city's natural water datum (0m for coastal cities; river elevation for inland river cities like Warsaw/Paris)
  const waterCenterlinePts = (preset.waterCenterlines || []).map(([lat, lon, w]) => {
    const [wx, wz] = project(lat, lon);
    const demM = sampleRawDemMeters(lat, lon);
    return { wx, wz, width: w || 1.6, demM };
  });

  const validWaterElevs = waterCenterlinePts
    .map((p) => p.demM)
    .filter((v) => typeof v === 'number' && Number.isFinite(v) && v >= -5);
  validWaterElevs.sort((a, b) => a - b);

  // Coastal cities have water datum 0m; inland river cities (e.g. Warsaw ~78m, Paris ~28m) use 25th-percentile river elevation
  const rawRiverDatum =
    validWaterElevs.length > 0
      ? validWaterElevs[Math.floor(validWaterElevs.length * 0.25)]
      : 0;
  const baseDatumMeters = rawRiverDatum > 12 ? Math.round(rawRiverDatum) : 0;

  // Precompute bounding boxes for major water polygons to clamp sea/bay/river polygons to 0.0
  const waterPolys = (osmData?.waterPolygons || [])
    .map((wp) => {
      const ring = wp.outer;
      if (!ring || ring.length < 6) return null;
      let bMinX = Infinity;
      let bMaxX = -Infinity;
      let bMinZ = Infinity;
      let bMaxZ = -Infinity;
      for (let i = 0; i < ring.length; i += 2) {
        const x = ring[i];
        const z = ring[i + 1];
        if (x < bMinX) bMinX = x;
        if (x > bMaxX) bMaxX = x;
        if (z < bMinZ) bMinZ = z;
        if (z > bMaxZ) bMaxZ = z;
      }
      const areaApprox = (bMaxX - bMinX) * (bMaxZ - bMinZ);
      // Only treat medium/large water polygons (or polygons near sea/river level) as sea/river masks
      const [cLat, cLon] = unproject((bMinX + bMaxX) * 0.5, (bMinZ + bMaxZ) * 0.5);
      const centerDem = sampleRawDemMeters(cLat, cLon) ?? baseDatumMeters;
      if (centerDem - baseDatumMeters > 22 && areaApprox < 25) {
        return null; // Small upland park pond — let it follow park hill terrain
      }
      return { ring, bMinX, bMaxX, bMinZ, bMaxZ };
    })
    .filter(Boolean);

  // Also check if the city has a self-contained mountain monument mesh (like Sugarloaf in Rio)
  // whose 3D GLB model already includes the full granite monolith from sea level to summit
  const selfContainedMonolithCoords = [];
  if (preset.id === 'rio') {
    // Monument_sugarloaf already models Morro da Urca + Pão de Açúcar monoliths + cableway from base to peak
    const [sx, sz] = project(-22.9492, -43.1545);
    selfContainedMonolithCoords.push({ x: sx, z: sz, innerR: 2.8, outerR: 6.2, maxElevWorld: 0.32 });
  }

  // Sample raw meters above datum across the 171 x 131 world grid
  const rawMetersGrid = new Float32Array(rows * cols);
  let maxElevationMeters = 0;

  for (let r = 0; r < rows; r++) {
    const z = minZ + r * stepZ;
    for (let c = 0; c < cols; c++) {
      const x = minX + c * stepX;
      const [lat, lon] = unproject(x, z);
      const demVal = sampleRawDemMeters(lat, lon);

      let hMeters = 0;
      if (demVal !== null) {
        // Sample a 5-point sub-cell cross (±0.65 world units ~ ±60m) and blend 65% center + 35% local max
        // so sharp granite ridges & summits (Corcovado, Dois Irmãos, Telegraph Hill, Douro Gorge) aren't dulled by cell averaging
        let localMaxDem = demVal;
        for (const [ox, oz] of [
          [-0.65, 0],
          [0.65, 0],
          [0, -0.65],
          [0, 0.65],
        ]) {
          const [sLat, sLon] = unproject(x + ox, z + oz);
          const sDem = sampleRawDemMeters(sLat, sLon);
          if (sDem !== null && sDem > localMaxDem) localMaxDem = sDem;
        }
        const blendedDem = demVal <= baseDatumMeters + 3.0 ? demVal : demVal * 0.65 + localMaxDem * 0.35;
        // Subtract baseDatumMeters + 2.5m coastal/beach buffer so beaches (Copacabana/Ipanema) and river quays stay level at 0
        hMeters = Math.max(0, blendedDem - baseDatumMeters - 2.5);
      } else {
        // Fallback only if satellite DEM tile was unavailable
        for (const peak of preset.topography || []) {
          const [px, pz] = project(peak.lat, peak.lon);
          const dx = x - px;
          const dz = z - pz;
          const unitsPerKm = preset.geo.worldUnitsPerKm ?? 10.8;
          const peakRadiusWorld = Math.max(2.6, ((peak.radiusMeters || 900) / 1000) * unitsPerKm);
          const dSq = (dx * dx + dz * dz) / (peakRadiusWorld * peakRadiusWorld);
          if (dSq < 3.5) {
            const steep = peak.steepness ?? 1.4;
            const peakH = Math.max(0, peak.peakElevationMeters - baseDatumMeters) * Math.exp(-dSq * steep);
            hMeters = Math.max(hMeters, peakH);
          }
        }
      }

      if (hMeters > maxElevationMeters) {
        maxElevationMeters = hMeters;
      }
      rawMetersGrid[r * cols + c] = hMeters;
    }
  }

  // Light 3x3 Gaussian-like spatial smoothing on rawMetersGrid (excluding 0-level water cells)
  // so 2.0-unit terrain mesh triangles transition organically without stair-stepping artifacts
  const smoothedMeters = new Float32Array(rows * cols);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const centerVal = rawMetersGrid[r * cols + c];
      if (centerVal <= 0.1) {
        smoothedMeters[r * cols + c] = 0;
        continue;
      }
      let sum = centerVal * 4.0;
      let weight = 4.0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
            const w = dr === 0 || dc === 0 ? 1.0 : 0.5;
            sum += rawMetersGrid[nr * cols + nc] * w;
            weight += w;
          }
        }
      }
      smoothedMeters[r * cols + c] = sum / weight;
    }
  }

  // Convert to world elevation units and apply exact coastline / river / waterPolygon masking
  const data = new Array(rows * cols);
  for (let r = 0; r < rows; r++) {
    const z = minZ + r * stepZ;
    for (let c = 0; c < cols; c++) {
      const x = minX + c * stepX;
      let elevWorld = metersToWorldElevation(smoothedMeters[r * cols + c]);

      if (elevWorld > 0.001) {
        // 1. Check if inside any sea/bay/river water polygon
        let inWaterPoly = false;
        for (const wp of waterPolys) {
          if (x >= wp.bMinX && x <= wp.bMaxX && z >= wp.bMinZ && z <= wp.bMaxZ) {
            if (isPointInFlatRing(x, z, wp.ring)) {
              inWaterPoly = true;
              break;
            }
          }
        }
        if (inWaterPoly) {
          elevWorld = 0;
        } else {
          // 2. Smoothly feather elevation along main river/harbour centerline corridors
          let minCenterlineFactor = 1.0;
          for (let i = 0; i < waterCenterlinePts.length - 1; i++) {
            const a = waterCenterlinePts[i];
            const b = waterCenterlinePts[i + 1];
            const dSq = distToSegmentSq(x, z, a.wx, a.wz, b.wx, b.wz);
            const halfW = Math.max(a.width, b.width) * 0.55;
            const innerR = Math.max(1.8, halfW + 0.8);
            const outerR = innerR + 3.8;
            if (dSq <= innerR * innerR) {
              minCenterlineFactor = 0;
              break;
            } else if (dSq < outerR * outerR) {
              const dist = Math.sqrt(dSq);
              const t = (dist - innerR) / (outerR - innerR);
              const smooth = t * t * (3 - 2 * t);
              if (smooth < minCenterlineFactor) minCenterlineFactor = smooth;
            }
          }
          elevWorld *= minCenterlineFactor;

          // 3. Clamp self-contained 3D monolith peninsula footprints (e.g. Sugarloaf in Rio)
          for (const mono of selfContainedMonolithCoords) {
            const dist = Math.hypot(x - mono.x, z - mono.z);
            if (dist < mono.innerR) {
              elevWorld = Math.min(elevWorld, mono.maxElevWorld);
            } else if (dist < mono.outerR) {
              const t = (dist - mono.innerR) / (mono.outerR - mono.innerR);
              const cap = mono.maxElevWorld + t * t * (3 - 2 * t) * Math.max(0, elevWorld - mono.maxElevWorld);
              elevWorld = Math.min(elevWorld, cap);
            }
          }
        }
      }

      data[r * cols + c] = elevWorld < 0.005 ? 0 : Math.round(elevWorld * 1000) / 1000;
    }
  }

  console.log(
    `  [DEM] Built ${cols}x${rows} real satellite heightmap for ${preset.name} (${loadedCount}/${neededTiles.size} Terrarium tiles, datum=${baseDatumMeters}m, maxRelief=${Math.round(maxElevationMeters)}m)`
  );

  return {
    minX,
    maxX,
    minZ,
    maxZ,
    cols,
    rows,
    stepX,
    stepZ,
    baseDatumMeters,
    maxElevationMeters: Math.round(maxElevationMeters),
    data,
  };
}
