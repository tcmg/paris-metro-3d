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

// TODO(security): Backend authentication, session management, CSRF tokens,
// file upload validation, and SQL database controls do not apply because this
// module is a build-time local CLI utility for a static 3D visualization.

import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const WORKSPACE_ROOT = path.resolve(__dirname, '..', '..');

const SAFE_SLUG_REGEX = /^[a-z0-9][a-z0-9_-]{1,23}$/;

export const OVERPASS_ENDPOINTS = Object.freeze([
  'https://lz4.overpass-api.de/api/interpreter',
  'https://overpass-api.de/api/interpreter'
]);

const ALLOWED_BLENDER_BINARIES = Object.freeze([
  '/Applications/Blender.app/Contents/MacOS/Blender',
  '/opt/homebrew/bin/blender',
  '/usr/local/bin/blender',
  '/usr/bin/blender'
]);

/**
 * Validates and normalizes a city identifier against a strict allow-list format
 * to prevent path traversal and injection vulnerabilities.
 */
export function validateCityId(rawCityId) {
  if (typeof rawCityId !== 'string') {
    throw new Error('City identifier must be a non-empty string.');
  }
  const normalized = path.basename(rawCityId.trim().toLowerCase());
  if (!SAFE_SLUG_REGEX.test(normalized)) {
    throw new Error(
      `Invalid city identifier "${rawCityId}". Must match ${SAFE_SLUG_REGEX.toString()}.`
    );
  }
  return normalized;
}

/**
 * Safely resolves a sub-path inside an allowed workspace sub-directory,
 * enforcing trailing path separator boundary verification (CWE-22 mitigation).
 */
export function resolveSafeWorkspacePath(allowedSubdir, ...segments) {
  const baseDir = path.resolve(WORKSPACE_ROOT, allowedSubdir);
  const baseWithSep = baseDir.endsWith(path.sep) ? baseDir : baseDir + path.sep;

  const sanitizedSegments = segments.map((seg) => {
    const clean = path.basename(String(seg));
    if (!clean || clean === '.' || clean === '..') {
      throw new Error(`Invalid path segment: "${String(seg)}"`);
    }
    return clean;
  });

  const resolvedTarget = path.resolve(baseDir, ...sanitizedSegments);
  if (resolvedTarget !== baseDir && !resolvedTarget.startsWith(baseWithSep)) {
    throw new Error(`Security violation: resolved path escapes sandbox directory ${baseDir}`);
  }
  return resolvedTarget;
}

/**
 * Ensures a directory inside the workspace exists safely.
 */
export function ensureSafeDir(dirPath) {
  const rootWithSep = WORKSPACE_ROOT.endsWith(path.sep)
    ? WORKSPACE_ROOT
    : WORKSPACE_ROOT + path.sep;
  const resolved = path.resolve(dirPath);
  if (resolved !== WORKSPACE_ROOT && !resolved.startsWith(rootWithSep)) {
    throw new Error(`Security violation: directory "${dirPath}" is outside workspace.`);
  }
  fs.mkdirSync(resolved, { recursive: true });
  return resolved;
}

/**
 * Safely writes UTF-8 content to a verified workspace path.
 */
export function writeSafeFile(targetPath, content) {
  const rootWithSep = WORKSPACE_ROOT.endsWith(path.sep)
    ? WORKSPACE_ROOT
    : WORKSPACE_ROOT + path.sep;
  const resolved = path.resolve(targetPath);
  if (!resolved.startsWith(rootWithSep)) {
    throw new Error(`Security violation: file write "${targetPath}" is outside workspace.`);
  }
  ensureSafeDir(path.dirname(resolved));
  fs.writeFileSync(resolved, content, 'utf8');
  return resolved;
}

/**
 * Projects WGS84 (lat, lon) into 3D world coordinates (x, z) using the city's
 * geodesic center and logarithmic outer metropolitan collar.
 */
export function createProjector(geoConfig) {
  const centerLat = geoConfig.centerLat;
  const centerLon = geoConfig.centerLon;
  const mPerDegLat =
    geoConfig.mPerDegLat || (geoConfig.kmPerDegLat ? geoConfig.kmPerDegLat * 1000 : 111132);
  const mPerDegLon =
    geoConfig.mPerDegLon ||
    (geoConfig.kmPerDegLon
      ? geoConfig.kmPerDegLon * 1000
      : Math.round(111320 * Math.cos((centerLat * Math.PI) / 180)));

  function projectLatLon(lat, lon) {
    const x = (lon - centerLon) * mPerDegLon;
    const z = -((lat - centerLat) * mPerDegLat);
    return [Math.round(x * 10) / 10, Math.round(z * 10) / 10];
  }

  projectLatLon.project = projectLatLon;
  return projectLatLon;
}

/**
 * Sends a POST query to an allow-listed HTTPS Overpass API endpoint.
 */
export function postOverpass(url, query, timeoutMs = 45000) {
  if (!OVERPASS_ENDPOINTS.includes(url)) {
    return Promise.reject(new Error(`Untrusted Overpass endpoint: ${url}`));
  }

  return new Promise((resolve, reject) => {
    const body = `data=${encodeURIComponent(query)}`;
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') {
      return reject(new Error('Overpass communication must use HTTPS.'));
    }

    const req = https.request(
      {
        hostname: parsed.hostname,
        path: parsed.pathname + parsed.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(body),
          'User-Agent': 'CityMetro3DPipeline/1.0 (https://example.org; contact@example.org)',
          Accept: 'application/json'
        },
        timeout: timeoutMs
      },
      (res) => {
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode} from ${url}`));
        }
        const chunks = [];
        let totalBytes = 0;
        const maxBytes = 120 * 1024 * 1024; // 120MB safety cap
        res.on('data', (c) => {
          totalBytes += c.length;
          if (totalBytes > maxBytes) {
            req.destroy();
            reject(new Error('Overpass response exceeded maximum allowed size'));
            return;
          }
          chunks.push(c);
        });
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

export async function queryOverpassWithRetry(query, label = 'Overpass query', preferredIndex = 0) {
  for (let attempt = 0; attempt < 6; attempt++) {
    const endpoint = OVERPASS_ENDPOINTS[(preferredIndex + attempt) % OVERPASS_ENDPOINTS.length];
    try {
      console.log(`[OSM] Fetching ${label} via ${endpoint} (attempt ${attempt + 1})...`);
      const res = await postOverpass(endpoint, query, 50000);
      if (res && Array.isArray(res.elements)) {
        console.log(`[OSM] ✓ ${label}: received ${res.elements.length} elements`);
        return res;
      }
    } catch (err) {
      if (err && err.code === 'ENOTFOUND') {
        throw err;
      }
      console.warn(`[OSM] ! ${label} failed on ${endpoint}: ${err.message}`);
      await new Promise((r) => setTimeout(r, 1400 * (attempt + 1)));
    }
  }
  throw new Error(`Failed to fetch ${label} after all retries`);
}

export function polygonSignedArea(ring) {
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

export function simplifyRing(coords, projectFnOrTolerance = 2.0, minStep = 2.0) {
  if (!Array.isArray(coords) || coords.length < 3) return [];
  const isFn = typeof projectFnOrTolerance === 'function';
  const step = isFn ? minStep : Number(projectFnOrTolerance) || 2.0;

  const out = [];
  let prevX = Infinity;
  let prevZ = Infinity;
  for (const pt of coords) {
    const [x, z] = isFn
      ? projectFnOrTolerance(pt.lat, pt.lon)
      : Array.isArray(pt)
        ? pt
        : [pt.x, pt.z];
    if (Math.hypot(x - prevX, z - prevZ) >= step) {
      out.push([x, z]);
      prevX = x;
      prevZ = z;
    }
  }
  if (
    out.length >= 4 &&
    Math.hypot(out[0][0] - out[out.length - 1][0], out[0][1] - out[out.length - 1][1]) < step
  ) {
    out.pop();
  }
  return out;
}

export function simplifyLine(coords, projectFnOrTolerance = 2.0, minStep = 2.0) {
  if (!Array.isArray(coords) || coords.length < 2) return [];
  const isFn = typeof projectFnOrTolerance === 'function';
  const step = isFn ? minStep : Number(projectFnOrTolerance) || 2.0;

  const out = [];
  let prevX = Infinity;
  let prevZ = Infinity;
  for (let i = 0; i < coords.length; i++) {
    const pt = coords[i];
    const [x, z] = isFn
      ? projectFnOrTolerance(pt.lat, pt.lon)
      : Array.isArray(pt)
        ? pt
        : [pt.x, pt.z];
    if (i === 0 || i === coords.length - 1 || Math.hypot(x - prevX, z - prevZ) >= step) {
      out.push([x, z]);
      prevX = x;
      prevZ = z;
    }
  }
  return out;
}

/**
 * Stitches unclosed member ways of an OSM multipolygon relation into closed rings.
 */
export function stitchWaysIntoRings(wayGeoms) {
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
      const fLat = Array.isArray(first) ? first[0] : first.lat;
      const fLon = Array.isArray(first) ? first[1] : first.lon;
      const lLat = Array.isArray(last) ? last[0] : last.lat;
      const lLon = Array.isArray(last) ? last[1] : last.lon;
      if (
        current.length >= 4 &&
        Math.abs(fLat - lLat) < 1e-3 &&
        Math.abs(fLon - lLon) < 1e-3
      ) {
        break;
      }
      for (let i = 0; i < segments.length; i++) {
        const seg = segments[i];
        const sFirst = seg[0];
        const sLast = seg[seg.length - 1];
        const sf0 = Array.isArray(sFirst) ? sFirst[0] : sFirst.lat;
        const sf1 = Array.isArray(sFirst) ? sFirst[1] : sFirst.lon;
        const sl0 = Array.isArray(sLast) ? sLast[0] : sLast.lat;
        const sl1 = Array.isArray(sLast) ? sLast[1] : sLast.lon;

        if (Math.abs(lLat - sf0) < 1e-2 && Math.abs(lLon - sf1) < 1e-2) {
          current = current.concat(seg.slice(1));
          segments.splice(i, 1);
          changed = true;
          break;
        } else if (Math.abs(lLat - sl0) < 1e-2 && Math.abs(lLon - sl1) < 1e-2) {
          current = current.concat(seg.slice(0, -1).reverse());
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

/**
 * Discovers an allow-listed local Blender executable if installed on the machine.
 */
export function findAllowedBlenderBinary() {
  for (const binPath of ALLOWED_BLENDER_BINARIES) {
    if (fs.existsSync(binPath)) {
      return binPath;
    }
  }
  return null;
}

/**
 * Runs a verified Python script inside headless Blender using execFileSync
 * with an allow-listed binary and sandboxed workspace paths (CWE-78 mitigation).
 */
export function runBlenderScriptHeadless(pythonScriptPath, arg2, arg3, arg4) {
  const blenderBin = findAllowedBlenderBinary();
  if (!blenderBin) {
    throw new Error(
      'No allow-listed Blender binary found. Use the Blender MCP server or install Blender at /Applications/Blender.app.'
    );
  }

  const specJsonPath = arg4 ? arg3 : arg2;
  const outGlbPath = arg4 ? arg4 : arg3;

  const rootWithSep = WORKSPACE_ROOT.endsWith(path.sep)
    ? WORKSPACE_ROOT
    : WORKSPACE_ROOT + path.sep;

  const resolvedScript = path.resolve(WORKSPACE_ROOT, pythonScriptPath);
  const resolvedSpec = path.resolve(WORKSPACE_ROOT, specJsonPath);
  const resolvedOut = path.resolve(WORKSPACE_ROOT, outGlbPath);

  for (const p of [resolvedScript, resolvedSpec, resolvedOut]) {
    if (!p.startsWith(rootWithSep)) {
      throw new Error(`Security violation: Blender argument path escapes workspace: ${p}`);
    }
  }

  const args = [
    '--background',
    '--factory-startup',
    '--python',
    resolvedScript,
    '--',
    '--spec',
    resolvedSpec,
    '--out',
    resolvedOut
  ];

  console.log(`[Blender] Executing ${blenderBin} -> ${path.relative(WORKSPACE_ROOT, resolvedOut)}...`);
  execFileSync(blenderBin, args, {
    cwd: WORKSPACE_ROOT,
    stdio: 'inherit',
    timeout: 180000
  });
}
