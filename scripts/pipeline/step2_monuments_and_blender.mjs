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
  writeSafeFile,
  runBlenderMonumentBuild,
} from './security_utils.mjs';
import { getCityPreset, getArchetypeSvgPath } from './city_presets.mjs';

export async function runStep2MonumentsAndBlender(cityId, options = {}) {
  const safeCityId = validateCityId(cityId);
  const preset = getCityPreset(safeCityId);
  const { project } = createProjector(preset.geo);
  const skipBlender = Boolean(options.skipBlender);

  console.log(
    `\n[Step 2/4] Preparing Monuments, Historical Lore & Blender 3D Assets for ${preset.name} (${safeCityId})...`
  );

  const monuments = (preset.monuments || []).map((m) => {
    const [x, z] = project(m.lat, m.lon);
    return {
      id: m.id,
      nodeName: m.nodeName,
      name: m.name,
      localName: m.localName,
      year: m.year,
      completedYear: m.completedYear,
      architect: m.architect,
      architecturalStyle: m.architecturalStyle,
      lat: m.lat,
      lon: m.lon,
      x,
      z,
      baseElevationMeters: m.baseElevationMeters || 0,
      scale: m.scale || 1.0,
      rotationY: m.rotationY || 0,
      primaryColor: m.primaryColor,
      secondaryColor: m.secondaryColor,
      accentColor: m.accentColor,
      archetype: m.archetype,
      fact: m.fact,
      facts: m.facts || [m.fact],
      historicalSummary: m.historicalSummary || m.fact,
      metroConnection: m.metroConnection,
      svgPath: m.svgPath || getArchetypeSvgPath(m.archetype),
    };
  });

  const milestones = preset.milestones || [];
  const eras = preset.eras || [];

  const tourStops = (preset.tourStops || []).map((stop) => {
    const [x, z] = project(stop.lat, stop.lon);
    return {
      ...stop,
      x,
      z,
    };
  });

  const specPayload = {
    cityId: preset.id,
    cityName: preset.name,
    country: preset.country,
    glbOutRelative: `public/models/${safeCityId}_monuments.glb`,
    monuments,
  };

  const specRelPath = `public/data/${safeCityId}_monuments_spec.json`;
  const glbRelPath = `public/models/${safeCityId}_monuments.glb`;
  const specPath = writeSafeFile(specRelPath, JSON.stringify(specPayload, null, 2));
  console.log(`  [✓] Wrote monument Blender spec: ${specPath}`);

  const upperId = safeCityId.toUpperCase();
  const historicalTsSource = `// Copyright 2026 Google LLC
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
  CityMonument,
  CityHistoricalMilestone,
  CityEraDescription,
  CityTourStop,
} from '../types';

export const ${upperId}_MONUMENTS_GLB_PATH = '/models/${safeCityId}_monuments.glb';

export const ${upperId}_MONUMENTS: CityMonument[] = ${JSON.stringify(monuments, null, 2)};

export const ${upperId}_MILESTONES: CityHistoricalMilestone[] = ${JSON.stringify(milestones, null, 2)};

export const ${upperId}_ERAS: CityEraDescription[] = ${JSON.stringify(eras, null, 2)};

export const ${upperId}_TOUR_STOPS: CityTourStop[] = ${JSON.stringify(tourStops, null, 2)};
`;

  const historicalTsPath = writeSafeFile(
    `src/cities/${safeCityId}/historicalData.ts`,
    historicalTsSource
  );
  console.log(`  [✓] Wrote historical lore & monument dataset: ${historicalTsPath}`);

  let glbExported = false;
  let blenderExecutionMode = 'skipped';
  if (!skipBlender) {
    console.log(
      `  -> Building ${monuments.length} 3D monuments into ${glbRelPath} (preferring live Blender MCP if open)...`
    );
    const buildResult = await runBlenderMonumentBuild(
      'scripts/pipeline/blender/build_city_monuments.py',
      specRelPath,
      glbRelPath
    );
    glbExported = true;
    blenderExecutionMode = buildResult.mode;
    console.log(`  [✓] Exported 3D GLB bundle (${blenderExecutionMode}): ${glbRelPath}`);
  } else {
    console.log(`  -> Skipping Blender execution (--skip-blender flag set).`);
  }

  return {
    specPath,
    historicalTsPath,
    glbRelPath,
    glbExported,
    blenderExecutionMode,
    monumentCount: monuments.length,
  };
}
