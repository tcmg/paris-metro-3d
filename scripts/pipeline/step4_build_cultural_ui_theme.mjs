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

import { validateCityId, writeSafeFile } from './security_utils.mjs';
import { getCityPreset } from './city_presets.mjs';

function buildCulturalPatternRules(safeCityId, uiTheme) {
  const vars = uiTheme.cssVariables || {};

  if (safeCityId === 'rio') {
    // Roberto Burle Marx Copacabana sinusoidal wave + Carnival feather/ribbon accents
    const waveSvg = encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='40' viewBox='0 0 120 40'>` +
        `<path d='M0 12 Q30 0 60 12 T120 12' fill='none' stroke='${vars['--city-accent-primary'] || '#f4c430'}' stroke-width='2.2' stroke-opacity='0.22'/>` +
        `<path d='M0 28 Q30 16 60 28 T120 28' fill='none' stroke='${vars['--city-accent-secondary'] || '#009b3a'}' stroke-width='2.2' stroke-opacity='0.18'/>` +
        `</svg>`
    );
    return `
/* Brazil / Rio de Janeiro: Carnival & Roberto Burle Marx Copacabana Calçadão Motif */
:root[data-city-theme="rio"] {
  --city-pattern-svg: url("data:image/svg+xml,${waveSvg}");
}

:root[data-city-theme="rio"] .city-themed-panel {
  background-image:
    linear-gradient(135deg, rgba(244, 196, 48, 0.10) 0%, rgba(0, 155, 58, 0.08) 50%, rgba(0, 119, 182, 0.12) 100%),
    var(--city-pattern-svg);
  background-size: 100% 100%, 120px 40px;
  border-radius: 16px;
  border: 1.5px solid var(--city-border-color);
  box-shadow: 0 14px 36px rgba(4, 24, 20, 0.55), inset 0 1px 0 rgba(244, 196, 48, 0.35);
}

:root[data-city-theme="rio"] .city-themed-header::after {
  content: "";
  display: block;
  height: 4px;
  margin-top: 6px;
  border-radius: 999px;
  background: linear-gradient(90deg, #009b3a 0%, #f4c430 35%, #ff5a36 70%, #0077b6 100%);
}
`;
  }

  if (safeCityId === 'sydney') {
    // First Nations Aboriginal concentric dot-circle (ngura / meeting place) & songline motif
    const dotArtSvg = encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 72 72'>` +
        `<circle cx='36' cy='36' r='6' fill='none' stroke='#e06d3b' stroke-width='2' stroke-dasharray='2 3.5' stroke-opacity='0.28'/>` +
        `<circle cx='36' cy='36' r='14' fill='none' stroke='#f2b749' stroke-width='2.2' stroke-dasharray='2.2 4.2' stroke-opacity='0.24'/>` +
        `<circle cx='36' cy='36' r='23' fill='none' stroke='#faf0ca' stroke-width='1.8' stroke-dasharray='1.8 4.8' stroke-opacity='0.16'/>` +
        `<circle cx='36' cy='36' r='2.5' fill='#1e96a8' fill-opacity='0.30'/>` +
        `</svg>`
    );
    return `
/* Australia / Sydney: First Nations Aboriginal Dot-Art, Songlines & Sandstone Ochre Motif */
:root[data-city-theme="sydney"] {
  --city-pattern-svg: url("data:image/svg+xml,${dotArtSvg}");
}

:root[data-city-theme="sydney"] .city-themed-panel {
  background-image:
    radial-gradient(circle at 90% 10%, rgba(224, 109, 59, 0.14), transparent 55%),
    var(--city-pattern-svg);
  background-size: 100% 100%, 72px 72px;
  border-radius: 18px;
  border: 1.5px solid var(--city-border-color);
  box-shadow: 0 14px 36px rgba(18, 12, 8, 0.6), inset 0 0 0 1px rgba(242, 183, 73, 0.18);
}

:root[data-city-theme="sydney"] .city-themed-header::after {
  content: "";
  display: block;
  height: 4px;
  margin-top: 6px;
  background-image: radial-gradient(circle, #f2b749 2px, transparent 2.5px);
  background-size: 8px 4px;
}
`;
  }

  if (safeCityId === 'nyc') {
    // Classic NYC Art Deco Chrysler sunburst geometry + Massimo Vignelli MTA stripe
    const decoSvg = encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'>` +
        `<path d='M32 64 L32 12 M32 64 L8 24 M32 64 L56 24 M16 64 L16 36 M48 64 L48 36' stroke='#d4af37' stroke-width='1.2' stroke-opacity='0.16' fill='none'/>` +
        `<rect x='2' y='2' width='60' height='60' stroke='#d4af37' stroke-width='0.8' stroke-opacity='0.10' fill='none'/>` +
        `</svg>`
    );
    return `
/* New York City: Gotham Skyscraper Art Deco & Massimo Vignelli Subway Modernism */
:root[data-city-theme="nyc"] {
  --city-pattern-svg: url("data:image/svg+xml,${decoSvg}");
}

:root[data-city-theme="nyc"] .city-themed-panel {
  background-image:
    linear-gradient(180deg, rgba(212, 175, 55, 0.08) 0%, rgba(17, 21, 29, 0.92) 100%),
    var(--city-pattern-svg);
  background-size: 100% 100%, 64px 64px;
  border-radius: 4px;
  border: 1.5px solid var(--city-border-color);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.72), inset 0 0 0 2px rgba(212, 175, 55, 0.14);
}

/* Vignelli horizontal white keyline rule across header bars */
:root[data-city-theme="nyc"] .city-themed-header::before {
  content: "";
  display: block;
  height: 2px;
  margin-bottom: 6px;
  background: #f4f4f6;
  opacity: 0.85;
}
`;
  }

  if (safeCityId === 'london') {
    // Royal British Crimson/Gold Gilded Filigree & Johnston Underground Roundel
    const royalSvg = encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'>` +
        `<circle cx='30' cy='30' r='14' fill='none' stroke='#c8102e' stroke-width='3.5' stroke-opacity='0.16'/>` +
        `<line x1='10' y1='30' x2='50' y2='30' stroke='#003688' stroke-width='4.5' stroke-opacity='0.18'/>` +
        `<rect x='3' y='3' width='54' height='54' fill='none' stroke='#d4af37' stroke-width='1' stroke-opacity='0.18'/>` +
        `</svg>`
    );
    return `
/* London: Royal British Crimson & Sovereign Gold Heritage + Edwardian Underground */
:root[data-city-theme="london"] {
  --city-pattern-svg: url("data:image/svg+xml,${royalSvg}");
}

:root[data-city-theme="london"] .city-themed-panel {
  background-image:
    linear-gradient(160deg, rgba(200, 16, 46, 0.10) 0%, rgba(20, 18, 30, 0.92) 55%, rgba(0, 54, 136, 0.14) 100%),
    var(--city-pattern-svg);
  background-size: 100% 100%, 60px 60px;
  border-radius: 8px;
  border: 1.5px solid var(--city-border-color);
  box-shadow: 0 14px 36px rgba(10, 8, 18, 0.68), inset 0 0 0 2px rgba(212, 175, 55, 0.22);
}

:root[data-city-theme="london"] .city-themed-header::after {
  content: "";
  display: block;
  height: 3px;
  margin-top: 6px;
  background: linear-gradient(90deg, #c8102e 0%, #d4af37 50%, #003688 100%);
}
`;
  }

  return '';
}

export async function runStep4CulturalUiTheme(cityId) {
  const safeCityId = validateCityId(cityId);
  const preset = getCityPreset(safeCityId);
  const uiTheme = preset.uiTheme;

  console.log(
    `\n[Step 4/4] Building Cultural CSS/UI Theme & City Bundle for ${preset.name} (${uiTheme.themeName})...`
  );

  const cssVarLines = Object.entries(uiTheme.cssVariables || {})
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n');

  const cssContent = `/*
 * Copyright 2026 Google LLC
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

/* ============================================================================
 * Cultural UI Theme: ${preset.name}, ${preset.country}
 * Theme Vibe: ${uiTheme.themeName} (${uiTheme.culturalVibe})
 * Inspiration: ${uiTheme.inspirationSummary}
 * ============================================================================ */

:root[data-city-theme="${safeCityId}"] {
  --city-font-display: ${uiTheme.typography.displayFont};
  --city-font-body: ${uiTheme.typography.bodyFont};
  --city-font-mono: ${uiTheme.typography.monoFont};
  --city-badge-shape: ${uiTheme.badgeShape};
${cssVarLines}
}
${buildCulturalPatternRules(safeCityId, uiTheme)}
`;

  const cssPath = writeSafeFile(`src/styles/themes/${safeCityId}.css`, cssContent);

  const upperId = safeCityId.toUpperCase();
  const uiThemeTsContent = `// Copyright 2026 Google LLC
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

import type { CityCulturalTheme } from '../types';

export const ${upperId}_UI_THEME: CityCulturalTheme = ${JSON.stringify(uiTheme, null, 2)};
`;

  const uiThemeTsPath = writeSafeFile(`src/cities/${safeCityId}/uiTheme.ts`, uiThemeTsContent);

  const indexTsContent = `// Copyright 2026 Google LLC
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

import type { CityDataset } from '../types';
import { ${upperId}_GEO_CONFIG, ${upperId}_WATER_BODIES, ${upperId}_TOPOGRAPHY } from './geoData';
import {
  ${upperId}_MONUMENTS_GLB_PATH,
  ${upperId}_MONUMENTS,
  ${upperId}_MILESTONES,
  ${upperId}_ERAS,
  ${upperId}_TOUR_STOPS,
} from './historicalData';
import { ${upperId}_METRO_SYSTEM_NAME, ${upperId}_METRO_LINES } from './metroData';
import { ${upperId}_RAIL_TERMINI } from './railTerminiData';
import { ${upperId}_DISTRICTS } from './districtsData';
import { ${upperId}_UI_THEME } from './uiTheme';

export const ${upperId}_CITY_DATASET: CityDataset = {
  id: ${JSON.stringify(preset.id)},
  name: ${JSON.stringify(preset.name)},
  localName: ${JSON.stringify(preset.localName)},
  country: ${JSON.stringify(preset.country)},
  region: ${JSON.stringify(preset.region)},
  tagline: ${JSON.stringify(preset.tagline)},
  metroSystemName: ${upperId}_METRO_SYSTEM_NAME,
  timelineRange: ${JSON.stringify(preset.timelineRange)},
  geo: ${upperId}_GEO_CONFIG,
  waterBodies: ${upperId}_WATER_BODIES,
  topography: ${upperId}_TOPOGRAPHY,
  monuments: ${upperId}_MONUMENTS,
  milestones: ${upperId}_MILESTONES,
  eras: ${upperId}_ERAS,
  tourStops: ${upperId}_TOUR_STOPS,
  metroLines: ${upperId}_METRO_LINES,
  railTermini: ${upperId}_RAIL_TERMINI,
  districts: ${upperId}_DISTRICTS,
  uiTheme: ${upperId}_UI_THEME,
  osmDataPath: '/data/${safeCityId}_osm.json',
  monumentsGlbPath: ${upperId}_MONUMENTS_GLB_PATH,
};

export * from './geoData';
export * from './historicalData';
export * from './metroData';
export * from './railTerminiData';
export * from './districtsData';
export * from './uiTheme';
`;

  const indexTsPath = writeSafeFile(`src/cities/${safeCityId}/index.ts`, indexTsContent);

  console.log(`  [✓] Wrote cultural CSS stylesheet: ${cssPath}`);
  console.log(`  [✓] Wrote cultural UI theme TS config: ${uiThemeTsPath}`);
  console.log(`  [✓] Wrote city dataset barrel: ${indexTsPath}`);

  return { cssPath, uiThemeTsPath, indexTsPath };
}
