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
    const waveSvg = encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='40' viewBox='0 0 120 40'>` +
        `<path d='M0 12 Q30 0 60 12 T120 12' fill='none' stroke='${vars['--city-accent-primary'] || '#f4c430'}' stroke-width='2.2' stroke-opacity='0.28'/>` +
        `<path d='M0 28 Q30 16 60 28 T120 28' fill='none' stroke='${vars['--city-accent-secondary'] || '#009b3a'}' stroke-width='2.2' stroke-opacity='0.22'/>` +
        `</svg>`
    );
    return `
/* Brazil / Rio de Janeiro: Carnival & Roberto Burle Marx Copacabana Calçadão Motif */
:root[data-city-theme="rio"] {
  --bg-obsidian: #041511;
  --bg-panel: rgba(6, 26, 22, 0.90);
  --bg-panel-elevated: rgba(10, 38, 32, 0.95);
  --gold-bright: #f4c430;
  --gold-primary: #009b3a;
  --gold-border: rgba(244, 196, 48, 0.48);
  --gold-border-strong: rgba(244, 196, 48, 0.88);
  --city-pattern-svg: url("data:image/svg+xml,${waveSvg}");
}

:root[data-city-theme="rio"] .deco-panel,
:root[data-city-theme="rio"] .city-selector-bar,
:root[data-city-theme="rio"] .city-themed-panel {
  background-image:
    linear-gradient(135deg, rgba(244, 196, 48, 0.14) 0%, rgba(0, 155, 58, 0.12) 50%, rgba(0, 119, 182, 0.16) 100%),
    var(--city-pattern-svg);
  background-size: 100% 100%, 120px 40px;
  border-radius: 16px;
  border: 1.5px solid var(--city-border-color);
  box-shadow: 0 14px 36px rgba(4, 24, 20, 0.65), inset 0 1px 0 rgba(244, 196, 48, 0.35);
}

:root[data-city-theme="rio"] .explorer-tabs-header::after,
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
    const dotArtSvg = encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='84' height='84' viewBox='0 0 84 84'>` +
        `<circle cx='42' cy='42' r='7' fill='none' stroke='#e06d3b' stroke-width='2.6' stroke-linecap='round' stroke-dasharray='0.5 5' stroke-opacity='0.36'/>` +
        `<circle cx='42' cy='42' r='15' fill='none' stroke='#f6b93b' stroke-width='2.6' stroke-linecap='round' stroke-dasharray='0.5 6' stroke-opacity='0.30'/>` +
        `<circle cx='42' cy='42' r='24' fill='none' stroke='#fbf3e4' stroke-width='2.2' stroke-linecap='round' stroke-dasharray='0.5 7' stroke-opacity='0.20'/>` +
        `<circle cx='42' cy='42' r='33' fill='none' stroke='#00a896' stroke-width='2' stroke-linecap='round' stroke-dasharray='0.5 8' stroke-opacity='0.22'/>` +
        `<circle cx='42' cy='42' r='3' fill='#f6b93b' fill-opacity='0.34'/>` +
        `</svg>`
    );
    const cornerSvg = encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18'>` +
        `<circle cx='9' cy='9' r='7' fill='none' stroke='#f6b93b' stroke-width='2' stroke-linecap='round' stroke-dasharray='0.4 3.6'/>` +
        `<circle cx='9' cy='9' r='3.8' fill='none' stroke='#e06d3b' stroke-width='1.8' stroke-linecap='round' stroke-dasharray='0.4 2.8'/>` +
        `<circle cx='9' cy='9' r='1.6' fill='#00a896'/>` +
        `</svg>`
    );
    const songlineSvg = encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='6' viewBox='0 0 32 6'>` +
        `<circle cx='4' cy='3' r='2' fill='#f6b93b'/>` +
        `<circle cx='12' cy='3' r='2' fill='#e06d3b'/>` +
        `<circle cx='20' cy='3' r='1.8' fill='#fbf3e4'/>` +
        `<circle cx='28' cy='3' r='2' fill='#00a896'/>` +
        `</svg>`
    );
    return `
/* Australia / Sydney: First Nations Aboriginal Dot-Art, Songlines & Sandstone Ochre Motif */
:root[data-city-theme="sydney"] {
  --bg-obsidian: #180c07;
  --bg-panel: rgba(34, 17, 11, 0.90);
  --bg-panel-elevated: rgba(48, 24, 15, 0.95);
  --gold-bright: #f6b93b;
  --gold-primary: #e06d3b;
  --gold-muted: #b85228;
  --gold-border: rgba(224, 109, 59, 0.52);
  --gold-border-strong: rgba(246, 185, 59, 0.88);
  --gold-glow: rgba(224, 109, 59, 0.32);
  --ivory: #fbf3e4;
  --ivory-dim: #dfc8ad;
  --ivory-subtle: #a88b6d;
  --emerald-guimard: #00a896;
  --crimson-ghost: #e55039;
  --city-pattern-svg: url("data:image/svg+xml,${dotArtSvg}");
  --sydney-corner-medallion: url("data:image/svg+xml,${cornerSvg}");
  --sydney-songline-border: url("data:image/svg+xml,${songlineSvg}");
}

:root[data-city-theme="sydney"] .deco-panel,
:root[data-city-theme="sydney"] .city-selector-bar,
:root[data-city-theme="sydney"] .city-themed-panel {
  background-color: rgba(34, 17, 11, 0.90);
  background-image:
    radial-gradient(circle at 88% 14%, rgba(224, 109, 59, 0.24), transparent 52%),
    radial-gradient(circle at 12% 86%, rgba(0, 168, 150, 0.14), transparent 48%),
    var(--city-pattern-svg);
  background-size: 100% 100%, 100% 100%, 84px 84px;
  border-radius: 16px;
  border: 1.5px solid rgba(224, 109, 59, 0.62);
  box-shadow: 0 14px 38px rgba(16, 7, 4, 0.72), inset 0 0 0 1px rgba(246, 185, 59, 0.24);
}

:root[data-city-theme="sydney"] .deco-panel::before {
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 4px;
  border-radius: 12px;
  border: 1.5px dotted rgba(246, 185, 59, 0.44);
}

:root[data-city-theme="sydney"] .deco-corner {
  width: 16px;
  height: 16px;
  border: none !important;
  background-image: var(--sydney-corner-medallion);
  background-size: contain;
  background-repeat: no-repeat;
}
`;
  }

  if (safeCityId === 'nyc') {
    const decoSvg = encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 72 72'>` +
        `<path d='M36 72 L36 8 M36 72 L10 18 M36 72 L62 18 M36 72 L2 38 M36 72 L70 38' stroke='#ffd147' stroke-width='1.1' stroke-opacity='0.18' fill='none'/>` +
        `<path d='M12 72 A24 24 0 0 1 60 72' stroke='#48b89f' stroke-width='1.2' stroke-opacity='0.22' fill='none'/>` +
        `<path d='M22 72 A14 14 0 0 1 50 72' stroke='#ffd147' stroke-width='1.1' stroke-opacity='0.20' fill='none'/>` +
        `<rect x='3' y='3' width='66' height='66' stroke='#48b89f' stroke-width='0.8' stroke-opacity='0.14' fill='none'/>` +
        `</svg>`
    );
    return `
/* New York City: Gotham Skyscraper Art Deco & Massimo Vignelli Subway Modernism */
:root[data-city-theme="nyc"] {
  --bg-obsidian: #05080d;
  --bg-panel: rgba(8, 12, 18, 0.92);
  --bg-panel-elevated: rgba(13, 19, 28, 0.96);
  --gold-bright: #ffd147;
  --gold-primary: #48b89f;
  --gold-muted: #2d7a6b;
  --gold-border: rgba(72, 184, 159, 0.50);
  --gold-border-strong: rgba(255, 209, 71, 0.88);
  --gold-glow: rgba(72, 184, 159, 0.34);
  --ivory: #f4f7fa;
  --ivory-dim: #b8c7d6;
  --ivory-subtle: #788a9c;
  --emerald-guimard: #48b89f;
  --crimson-ghost: #ee352e;
  --city-pattern-svg: url("data:image/svg+xml,${decoSvg}");
}

:root[data-city-theme="nyc"] .deco-panel,
:root[data-city-theme="nyc"] .city-selector-bar,
:root[data-city-theme="nyc"] .city-themed-panel {
  background-color: rgba(8, 12, 18, 0.93);
  background-image:
    linear-gradient(180deg, rgba(255, 209, 71, 0.10) 0%, rgba(72, 184, 159, 0.07) 38%, rgba(6, 10, 16, 0.95) 100%),
    var(--city-pattern-svg);
  background-size: 100% 100%, 72px 72px;
  border-radius: 0px;
  border: 1.5px solid rgba(72, 184, 159, 0.62);
  border-top: 3px solid #f4f7fa;
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.80), inset 0 0 0 2px rgba(255, 209, 71, 0.22);
}
`;
  }

  if (safeCityId === 'london') {
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

:root[data-city-theme="london"] .deco-panel,
:root[data-city-theme="london"] .city-selector-bar,
:root[data-city-theme="london"] .city-themed-panel {
  background-image:
    linear-gradient(160deg, rgba(200, 16, 46, 0.12) 0%, rgba(20, 18, 30, 0.92) 55%, rgba(0, 54, 136, 0.16) 100%),
    var(--city-pattern-svg);
  background-size: 100% 100%, 60px 60px;
  border-radius: 8px;
  border: 1.5px solid var(--city-border-color);
  box-shadow: 0 14px 36px rgba(10, 8, 18, 0.68), inset 0 0 0 2px rgba(212, 175, 55, 0.22);
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
