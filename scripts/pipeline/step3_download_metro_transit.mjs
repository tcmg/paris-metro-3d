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
  writeSafeFile,
} from './security_utils.mjs';
import { getCityPreset } from './city_presets.mjs';

export async function runStep3MetroTransit(cityId, options = {}) {
  const safeCityId = validateCityId(cityId);
  const preset = getCityPreset(safeCityId);
  const { project } = createProjector(preset.geo);
  const offline = Boolean(options.offline);

  console.log(
    `\n[Step 3/4] Preparing Metro/Subway Lines, Rail Termini & Districts for ${preset.name} (${safeCityId})...`
  );

  let osmSubwayStationCoords = new Map();
  if (!offline) {
    const [south, west, north, east] = preset.geo.bbox;
    const bboxStr = `${south},${west},${north},${east}`;
    try {
      console.log(`  -> Querying Overpass for live ${preset.name} subway/metro station nodes...`);
      const osmData = await queryOverpassWithRetry(`
        [out:json][timeout:60];
        (
          node["railway"="station"]["station"="subway"](${bboxStr});
          node["railway"="station"]["station"="light_rail"](${bboxStr});
        );
        out body;
      `);
      for (const el of osmData.elements || []) {
        if (el.type === 'node' && el.tags?.name && el.lat !== undefined && el.lon !== undefined) {
          osmSubwayStationCoords.set(el.tags.name.toLowerCase(), [el.lat, el.lon]);
        }
      }
      console.log(`  -> Matched ${osmSubwayStationCoords.size} live OSM transit nodes.`);
    } catch (err) {
      console.warn(
        `  [!] Overpass transit query skipped/fell back (${err.message}); using curated preset coordinates.`
      );
    }
  }

  // Build station line-membership map across all lines using canonical base station name
  const canonicalKey = (rawName) =>
    String(rawName || '')
      .split('(')[0]
      .trim()
      .toLowerCase();

  const stationLinesLookup = new Map();
  for (const line of preset.metroLines || []) {
    for (const st of line.stations || []) {
      const key = canonicalKey(st.name);
      if (!stationLinesLookup.has(key)) {
        stationLinesLookup.set(key, []);
      }
      const list = stationLinesLookup.get(key);
      if (!list.includes(line.line)) {
        list.push(line.line);
      }
    }
  }

  const metroLines = (preset.metroLines || []).map((line) => {
    const stations = (line.stations || []).map((st) => {
      const key = canonicalKey(st.name);
      const osmMatch =
        osmSubwayStationCoords.get(st.name.toLowerCase()) || osmSubwayStationCoords.get(key);
      const lat = osmMatch ? osmMatch[0] : st.lat;
      const lon = osmMatch ? osmMatch[1] : st.lon;
      const [x, z] = project(lat, lon);
      const lines = stationLinesLookup.get(key) || [line.line];
      return {
        name: st.name,
        lat,
        lon,
        x,
        z,
        year: st.year,
        lines,
        fact: st.fact,
        isGhost: Boolean(st.isGhost),
      };
    });

    return {
      line: line.line,
      name: line.name,
      color: line.color,
      textColor: line.textColor || '#ffffff',
      openedYear: line.openedYear,
      rollingStockStyle: line.rollingStockStyle,
      stations,
    };
  });

  const railTermini = (preset.railTermini || []).map((term) => {
    const [x, z] = project(term.lat, term.lon);
    const trackPaths = (term.trackPathsLatLon || []).map((path) =>
      path.map(([lat, lon]) => project(lat, lon))
    );
    return {
      id: term.id,
      name: term.name,
      year: term.year,
      lat: term.lat,
      lon: term.lon,
      x,
      z,
      azimuth: term.azimuth || 0,
      color: term.color,
      fact: term.fact,
      destinations: term.destinations,
      trainType: term.trainType,
      trackPaths,
    };
  });

  const districts = (preset.districts || []).map((d) => {
    const [x, z] = project(d.lat, d.lon);
    return {
      id: d.id,
      number: d.number,
      name: d.name,
      localLabel: d.localLabel,
      subtitle: d.subtitle,
      lat: d.lat,
      lon: d.lon,
      x,
      z,
      yearEstablished: d.yearEstablished,
      population: d.population,
      landmarks: d.landmarks || [],
      fact: d.fact,
    };
  });

  const upperId = safeCityId.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase();

  const metroTsSource = `// Copyright 2026 Google LLC
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

import type { CityMetroLine } from '../types';

export const ${upperId}_METRO_SYSTEM_NAME = ${JSON.stringify(preset.metroSystemName)};

export const ${upperId}_METRO_LINES: CityMetroLine[] = ${JSON.stringify(metroLines, null, 2)};
`;

  const railTsSource = `// Copyright 2026 Google LLC
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

import type { CityRailTerminus } from '../types';

export const ${upperId}_RAIL_TERMINI: CityRailTerminus[] = ${JSON.stringify(railTermini, null, 2)};
`;

  const districtsTsSource = `// Copyright 2026 Google LLC
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

import type { CityDistrict } from '../types';

export const ${upperId}_DISTRICTS: CityDistrict[] = ${JSON.stringify(districts, null, 2)};
`;

  const metroTsPath = writeSafeFile(`src/cities/${safeCityId}/metroData.ts`, metroTsSource);
  const railTsPath = writeSafeFile(`src/cities/${safeCityId}/railTerminiData.ts`, railTsSource);
  const districtsTsPath = writeSafeFile(`src/cities/${safeCityId}/districtsData.ts`, districtsTsSource);

  console.log(`  [✓] Wrote ${metroTsPath} (${metroLines.length} lines)`);
  console.log(`  [✓] Wrote ${railTsPath} (${railTermini.length} termini)`);
  console.log(`  [✓] Wrote ${districtsTsPath} (${districts.length} districts)`);

  return {
    metroTsPath,
    railTsPath,
    districtsTsPath,
    lineCount: metroLines.length,
    terminusCount: railTermini.length,
    districtCount: districts.length,
  };
}
