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
        `<path d='M0 12 Q30 0 60 12 T120 12' fill='none' stroke='${vars['--city-accent-primary'] || '#ffda44'}' stroke-width='2.4' stroke-opacity='0.28'/>` +
        `<path d='M0 28 Q30 16 60 28 T120 28' fill='none' stroke='${vars['--city-accent-secondary'] || '#12c47a'}' stroke-width='2.4' stroke-opacity='0.22'/>` +
        `</svg>`
    );
    const calcadaoWaveBar = encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='48' height='8' viewBox='0 0 48 8'>` +
        `<path d='M0 5 Q12 0 24 5 T48 5' fill='none' stroke='#ffda44' stroke-width='2'/>` +
        `<path d='M0 7.5 Q12 2.5 24 7.5 T48 7.5' fill='none' stroke='#12c47a' stroke-width='1.5'/>` +
        `</svg>`
    );
    return `
/* Brazil / Rio de Janeiro: Carnival Samba, Guanabara Emerald & Roberto Burle Marx Copacabana Calçadão Motif */
:root[data-city-theme="rio"] {
  --bg-obsidian: #05151f;
  --bg-panel: rgba(6, 24, 36, 0.90);
  --bg-panel-elevated: rgba(10, 34, 48, 0.95);
  --gold-bright: #ffda44;
  --gold-primary: #12c47a;
  --gold-muted: #b88400;
  --gold-border: rgba(255, 218, 68, 0.50);
  --gold-border-strong: rgba(18, 196, 122, 0.90);
  --gold-glow: rgba(255, 218, 68, 0.34);
  --ivory: #fcf9f0;
  --ivory-dim: #b8d0c8;
  --ivory-subtle: #6e948a;
  --emerald-guimard: #12c47a;
  --crimson-ghost: #ff3b7f;
  --font-display: 'Syne', 'Cinzel Decorative', sans-serif;
  --city-pattern-svg: url("data:image/svg+xml,${waveSvg}");
  --rio-calcadao-wave: url("data:image/svg+xml,${calcadaoWaveBar}");
}

:root[data-city-theme="rio"] .deco-panel,
:root[data-city-theme="rio"] .city-selector-bar,
:root[data-city-theme="rio"] .city-themed-panel {
  background-color: rgba(6, 24, 36, 0.90);
  background-image:
    radial-gradient(circle at 86% 14%, rgba(255, 218, 68, 0.20), transparent 52%),
    radial-gradient(circle at 14% 86%, rgba(18, 196, 122, 0.18), transparent 50%),
    var(--city-pattern-svg);
  background-size: 100% 100%, 100% 100%, 120px 40px;
  border-radius: 14px;
  border: 1.5px solid rgba(255, 218, 68, 0.58);
  box-shadow: 0 14px 36px rgba(3, 14, 22, 0.72), inset 0 1px 0 rgba(255, 218, 68, 0.35);
}

:root[data-city-theme="rio"] .explorer-tabs-header::after,
:root[data-city-theme="rio"] .city-themed-header::after {
  content: "";
  display: block;
  height: 7px;
  margin-top: 6px;
  background-image: var(--rio-calcadao-wave);
  background-repeat: repeat-x;
  background-size: 48px 8px;
}

:root[data-city-theme="rio"] .line-badge-btn {
  border-radius: 10px;
  border: 1.5px solid rgba(255, 255, 255, 0.82);
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
}

:root[data-city-theme="rio"] .city-banner-rio {
  background: linear-gradient(90deg, rgba(18, 196, 122, 0.26) 0%, rgba(255, 218, 68, 0.20) 52%, rgba(255, 59, 127, 0.20) 100%);
  border: 1px solid rgba(255, 218, 68, 0.65);
  border-radius: 10px;
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

  if (safeCityId === 'porto') {
    const azulejoSvg = encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'>` +
        `<rect x='2' y='2' width='60' height='60' fill='none' stroke='#428ee0' stroke-width='1.1' stroke-opacity='0.24'/>` +
        `<path d='M32 4 L60 32 L32 60 L4 32 Z' fill='none' stroke='#e8c15a' stroke-width='1.2' stroke-opacity='0.22'/>` +
        `<circle cx='32' cy='32' r='11' fill='none' stroke='#f6f8fc' stroke-width='1.2' stroke-opacity='0.20'/>` +
        `<path d='M32 14 C36 24 40 28 50 32 C40 36 36 40 32 50 C28 40 24 36 14 32 C24 28 28 24 32 14 Z' fill='none' stroke='#428ee0' stroke-width='1.2' stroke-opacity='0.28'/>` +
        `<circle cx='4' cy='4' r='4' fill='none' stroke='#e8c15a' stroke-width='1.1' stroke-opacity='0.22'/>` +
        `<circle cx='60' cy='4' r='4' fill='none' stroke='#e8c15a' stroke-width='1.1' stroke-opacity='0.22'/>` +
        `<circle cx='4' cy='60' r='4' fill='none' stroke='#e8c15a' stroke-width='1.1' stroke-opacity='0.22'/>` +
        `<circle cx='60' cy='60' r='4' fill='none' stroke='#e8c15a' stroke-width='1.1' stroke-opacity='0.22'/>` +
        `</svg>`
    );
    const cornerTileSvg = encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'>` +
        `<path d='M8 1 L15 8 L8 15 L1 8 Z' fill='#1e64b4' fill-opacity='0.45' stroke='#e8c15a' stroke-width='1.4'/>` +
        `<circle cx='8' cy='8' r='2.5' fill='#f6f8fc'/>` +
        `</svg>`
    );
    return `
/* Portugal / Porto: Cobalt-Blue & White Azulejo Ceramic Tilework, Talha Dourada Gold & Douro Ruby Port */
:root[data-city-theme="porto"] {
  --bg-obsidian: #071120;
  --bg-panel: rgba(10, 23, 44, 0.91);
  --bg-panel-elevated: rgba(15, 34, 64, 0.96);
  --gold-bright: #e8c15a;
  --gold-primary: #428ee0;
  --gold-muted: #1e64b4;
  --gold-border: rgba(66, 142, 224, 0.52);
  --gold-border-strong: rgba(232, 193, 90, 0.90);
  --gold-glow: rgba(66, 142, 224, 0.34);
  --ivory: #f6f8fc;
  --ivory-dim: #c2d4ec;
  --ivory-subtle: #7e9bc2;
  --emerald-guimard: #1e64b4;
  --crimson-ghost: #b8293d;
  --city-pattern-svg: url("data:image/svg+xml,${azulejoSvg}");
  --porto-corner-tile: url("data:image/svg+xml,${cornerTileSvg}");
}

:root[data-city-theme="porto"] .deco-panel,
:root[data-city-theme="porto"] .city-selector-bar,
:root[data-city-theme="porto"] .city-themed-panel {
  background-color: rgba(10, 23, 44, 0.91);
  background-image:
    radial-gradient(circle at 14% 16%, rgba(66, 142, 224, 0.22), transparent 52%),
    radial-gradient(circle at 88% 84%, rgba(158, 36, 50, 0.18), transparent 48%),
    var(--city-pattern-svg);
  background-size: 100% 100%, 100% 100%, 64px 64px;
  border-radius: 10px;
  border: 1.5px solid rgba(66, 142, 224, 0.65);
  box-shadow: 0 16px 38px rgba(4, 10, 22, 0.78), inset 0 0 0 1.5px rgba(232, 193, 90, 0.28);
}

:root[data-city-theme="porto"] .deco-panel::before {
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 4px;
  border-radius: 6px;
  border: 1px solid rgba(246, 248, 252, 0.26);
}

:root[data-city-theme="porto"] .deco-corner {
  width: 15px;
  height: 15px;
  border: none !important;
  background-image: var(--porto-corner-tile);
  background-size: contain;
  background-repeat: no-repeat;
}

:root[data-city-theme="porto"] .city-cultural-banner {
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(24, 78, 148, 0.52) 0%, rgba(10, 23, 44, 0.92) 60%, rgba(138, 28, 44, 0.36) 100%);
  border: 1.5px solid rgba(232, 193, 90, 0.68);
}
`;
  }

  if (safeCityId === 'tokyo') {
    const seigaihaSvg = encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='32' viewBox='0 0 64 32'>` +
        `<path d='M0 32 A16 16 0 0 1 32 32 A16 16 0 0 1 64 32' fill='none' stroke='#ff4f38' stroke-width='1.1' stroke-opacity='0.22'/>` +
        `<path d='M8 32 A8 8 0 0 1 24 32 M40 32 A8 8 0 0 1 56 32' fill='none' stroke='#f4c44e' stroke-width='1.0' stroke-opacity='0.20'/>` +
        `<path d='M-16 16 A16 16 0 0 1 16 16 A16 16 0 0 1 48 16 A16 16 0 0 1 80 16' fill='none' stroke='#00a896' stroke-width='1.0' stroke-opacity='0.18'/>` +
        `</svg>`
    );
    const hankoCornerSvg = encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 15 15'>` +
        `<rect x='1.5' y='1.5' width='12' height='12' rx='2' fill='none' stroke='#ff4f38' stroke-width='1.8'/>` +
        `<rect x='4.5' y='4.5' width='6' height='6' fill='#f4c44e' fill-opacity='0.85'/>` +
        `</svg>`
    );
    return `
/* Japan / Tokyo: Edo Indigo (Ai-iro), Shinto Vermilion Hanko Seal (Shu-iro), Seigaiha Waves & Neo-Tokyo Precision */
:root[data-city-theme="tokyo"] {
  --bg-obsidian: #080b12;
  --bg-panel: rgba(12, 16, 26, 0.92);
  --bg-panel-elevated: rgba(18, 24, 38, 0.96);
  --gold-bright: #ff4f38;
  --gold-primary: #f4c44e;
  --gold-muted: #b8291e;
  --gold-border: rgba(255, 79, 56, 0.50);
  --gold-border-strong: rgba(244, 196, 78, 0.90);
  --gold-glow: rgba(255, 79, 56, 0.34);
  --ivory: #f7f8fc;
  --ivory-dim: #c4cce0;
  --ivory-subtle: #7e8ba6;
  --emerald-guimard: #00a896;
  --crimson-ghost: #ff2a6d;
  --city-pattern-svg: url("data:image/svg+xml,${seigaihaSvg}");
  --tokyo-hanko-corner: url("data:image/svg+xml,${hankoCornerSvg}");
}

:root[data-city-theme="tokyo"] .deco-panel,
:root[data-city-theme="tokyo"] .city-selector-bar,
:root[data-city-theme="tokyo"] .city-themed-panel {
  background-color: rgba(12, 16, 26, 0.92);
  background-image:
    linear-gradient(155deg, rgba(224, 52, 38, 0.14) 0%, rgba(12, 16, 26, 0.94) 52%, rgba(0, 168, 150, 0.14) 100%),
    var(--city-pattern-svg);
  background-size: 100% 100%, 64px 32px;
  border-radius: 6px;
  border: 1.5px solid rgba(255, 79, 56, 0.58);
  border-top: 2.5px solid #ff4f38;
  box-shadow: 0 16px 40px rgba(4, 6, 12, 0.82), inset 0 0 0 1px rgba(244, 196, 78, 0.24);
}

:root[data-city-theme="tokyo"] .deco-corner {
  width: 14px;
  height: 14px;
  border: none !important;
  background-image: var(--tokyo-hanko-corner);
  background-size: contain;
  background-repeat: no-repeat;
}

:root[data-city-theme="tokyo"] .city-cultural-banner {
  border-radius: 6px;
  background: linear-gradient(90deg, rgba(208, 36, 28, 0.38) 0%, rgba(14, 19, 32, 0.94) 65%, rgba(0, 155, 191, 0.25) 100%);
  border: 1.5px solid rgba(255, 79, 56, 0.72);
  border-left: 4px solid #ff4f38;
}
`;
  }

  if (safeCityId === 'san-francisco') {
    const goldenGateSvg = encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='80' height='48' viewBox='0 0 80 48'>` +
        `<path d='M0 36 Q40 6 80 36' fill='none' stroke='#f04a24' stroke-width='1.4' stroke-opacity='0.26'/>` +
        `<line x1='16' y1='8' x2='16' y2='44' stroke='#f04a24' stroke-width='1.6' stroke-opacity='0.22'/>` +
        `<line x1='64' y1='8' x2='64' y2='44' stroke='#f04a24' stroke-width='1.6' stroke-opacity='0.22'/>` +
        `<line x1='32' y1='18' x2='32' y2='36' stroke='#f4b942' stroke-width='0.9' stroke-opacity='0.20'/>` +
        `<line x1='48' y1='18' x2='48' y2='36' stroke='#f4b942' stroke-width='0.9' stroke-opacity='0.20'/>` +
        `<line x1='0' y1='36' x2='80' y2='36' stroke='#2a9d8f' stroke-width='1.2' stroke-opacity='0.22'/>` +
        `</svg>`
    );
    const sfCornerSvg = encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'>` +
        `<path d='M2 14 L2 2 L14 2' fill='none' stroke='#f04a24' stroke-width='2.2'/>` +
        `<path d='M5 14 L5 5 L14 5' fill='none' stroke='#f4b942' stroke-width='1.4'/>` +
        `<circle cx='2.5' cy='2.5' r='1.8' fill='#f4b942'/>` +
        `</svg>`
    );
    return `
/* United States / San Francisco: Golden Gate International Orange, Bay Fog Slate & Victorian Gold */
:root[data-city-theme="san-francisco"] {
  --bg-obsidian: #0b131b;
  --bg-panel: rgba(14, 24, 34, 0.91);
  --bg-panel-elevated: rgba(20, 34, 48, 0.96);
  --gold-bright: #f4b942;
  --gold-primary: #f04a24;
  --gold-muted: #b83718;
  --gold-border: rgba(240, 74, 36, 0.52);
  --gold-border-strong: rgba(244, 185, 66, 0.90);
  --gold-glow: rgba(240, 74, 36, 0.34);
  --ivory: #f7f4ed;
  --ivory-dim: #c7d3de;
  --ivory-subtle: #8295a8;
  --emerald-guimard: #2a9d8f;
  --crimson-ghost: #f04a24;
  --city-pattern-svg: url("data:image/svg+xml,${goldenGateSvg}");
  --sf-deco-corner: url("data:image/svg+xml,${sfCornerSvg}");
}

:root[data-city-theme="san-francisco"] .deco-panel,
:root[data-city-theme="san-francisco"] .city-selector-bar,
:root[data-city-theme="san-francisco"] .city-themed-panel {
  background-color: rgba(14, 24, 34, 0.91);
  background-image:
    linear-gradient(165deg, rgba(240, 74, 36, 0.16) 0%, rgba(14, 24, 34, 0.92) 52%, rgba(42, 157, 143, 0.16) 100%),
    var(--city-pattern-svg);
  background-size: 100% 100%, 80px 48px;
  border-radius: 10px;
  border: 1.5px solid rgba(240, 74, 36, 0.65);
  box-shadow: 0 16px 38px rgba(5, 10, 16, 0.78), inset 0 0 0 1.5px rgba(244, 185, 66, 0.25);
}

:root[data-city-theme="san-francisco"] .deco-corner {
  width: 15px;
  height: 15px;
  border: none !important;
  background-image: var(--sf-deco-corner);
  background-size: contain;
  background-repeat: no-repeat;
}

:root[data-city-theme="san-francisco"] .deco-corner.tr { transform: scaleX(-1); }
:root[data-city-theme="san-francisco"] .deco-corner.bl { transform: scaleY(-1); }
:root[data-city-theme="san-francisco"] .deco-corner.br { transform: scale(-1, -1); }

:root[data-city-theme="san-francisco"] .city-cultural-banner {
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(240, 74, 36, 0.42) 0%, rgba(14, 24, 34, 0.92) 60%, rgba(42, 157, 143, 0.28) 100%);
  border: 1.5px solid rgba(244, 185, 66, 0.72);
}
`;
  }

  if (safeCityId === 'warsaw') {
    const sgraffitoSvg = encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'>` +
        `<polygon points='32,4 60,32 32,60 4,32' fill='none' stroke='#dc143c' stroke-width='1.5' stroke-opacity='0.24'/>` +
        `<polygon points='32,14 50,32 32,50 14,32' fill='none' stroke='#f4b942' stroke-width='1.3' stroke-opacity='0.26'/>` +
        `<circle cx='32' cy='32' r='4' fill='none' stroke='#fcf9f5' stroke-width='1.2' stroke-opacity='0.22'/>` +
        `</svg>`
    );
    const warsawCornerSvg = encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'>` +
        `<path d='M1 15 L1 1 L15 1' fill='none' stroke='#f4b942' stroke-width='2.2'/>` +
        `<path d='M4 12 L4 4 L12 4' fill='none' stroke='#dc143c' stroke-width='1.6'/>` +
        `</svg>`
    );
    return `
/* Poland / Warsaw: Old Town Renaissance Sgraffito, Biało-Czerwoni Crimson & Baltic Amber-Gold Motif */
:root[data-city-theme="warsaw"] {
  --bg-obsidian: #110b0e;
  --bg-panel: rgba(24, 15, 20, 0.91);
  --bg-panel-elevated: rgba(36, 22, 29, 0.96);
  --gold-bright: #f4b942;
  --gold-primary: #dc143c;
  --gold-muted: #9e1b34;
  --gold-border: rgba(220, 20, 60, 0.50);
  --gold-border-strong: rgba(244, 185, 66, 0.90);
  --gold-glow: rgba(220, 20, 60, 0.34);
  --ivory: #fcf9f5;
  --ivory-dim: #dfd2c8;
  --ivory-subtle: #a38f82;
  --emerald-guimard: #48967a;
  --crimson-ghost: #e30613;
  --city-pattern-svg: url("data:image/svg+xml,${sgraffitoSvg}");
  --warsaw-corner-svg: url("data:image/svg+xml,${warsawCornerSvg}");
}

:root[data-city-theme="warsaw"] .deco-panel,
:root[data-city-theme="warsaw"] .city-selector-bar,
:root[data-city-theme="warsaw"] .city-themed-panel {
  background-color: rgba(24, 15, 20, 0.91);
  background-image:
    linear-gradient(160deg, rgba(220, 20, 60, 0.16) 0%, rgba(24, 15, 20, 0.94) 55%, rgba(0, 92, 169, 0.16) 100%),
    var(--city-pattern-svg);
  background-size: 100% 100%, 64px 64px;
  border-radius: 6px;
  border: 1.5px solid rgba(244, 185, 66, 0.62);
  border-top: 3px solid #dc143c;
  box-shadow: 0 16px 38px rgba(8, 4, 6, 0.78), inset 0 1px 0 rgba(252, 249, 245, 0.35);
}

:root[data-city-theme="warsaw"] .deco-corner {
  width: 15px;
  height: 15px;
  border: none !important;
  background-image: var(--warsaw-corner-svg);
  background-size: contain;
  background-repeat: no-repeat;
}

:root[data-city-theme="warsaw"] .deco-corner.tr { transform: scaleX(-1); }
:root[data-city-theme="warsaw"] .deco-corner.bl { transform: scaleY(-1); }
:root[data-city-theme="warsaw"] .deco-corner.br { transform: scale(-1, -1); }

:root[data-city-theme="warsaw"] .city-cultural-banner {
  border-radius: 6px;
  background: linear-gradient(135deg, rgba(220, 20, 60, 0.38) 0%, rgba(24, 15, 20, 0.92) 55%, rgba(0, 92, 169, 0.32) 100%);
  border: 1.5px solid rgba(244, 185, 66, 0.75);
}
`;
  }

  if (safeCityId === 'zurich') {
    const swissGridSvg = encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'>` +
        `<rect x='0.5' y='0.5' width='63' height='63' fill='none' stroke='#38b6ff' stroke-width='0.9' stroke-opacity='0.18'/>` +
        `<line x1='32' y1='0' x2='32' y2='64' stroke='#f8fafc' stroke-width='0.6' stroke-opacity='0.12'/>` +
        `<line x1='0' y1='32' x2='64' y2='32' stroke='#f8fafc' stroke-width='0.6' stroke-opacity='0.12'/>` +
        `<path d='M30 25 H34 V30 H39 V34 H34 V39 H30 V34 H25 V30 H30 Z' fill='#e30613' fill-opacity='0.22'/>` +
        `</svg>`
    );
    const sbbCornerSvg = encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'>` +
        `<path d='M1 15 L1 1 L15 1' fill='none' stroke='#38b6ff' stroke-width='2.0'/>` +
        `<circle cx='5.5' cy='5.5' r='2.5' fill='#e30613'/>` +
        `</svg>`
    );
    return `
/* Switzerland / Zurich: Swiss International Typographic Style Grid, SBB Railway Clock Red & Lake Zurich Alpine Cyan */
:root[data-city-theme="zurich"] {
  --bg-obsidian: #070f1a;
  --bg-panel: rgba(11, 22, 38, 0.92);
  --bg-panel-elevated: rgba(16, 32, 54, 0.96);
  --gold-bright: #38b6ff;
  --gold-primary: #e30613;
  --gold-muted: #00529b;
  --gold-border: rgba(56, 182, 255, 0.48);
  --gold-border-strong: rgba(227, 6, 19, 0.90);
  --gold-glow: rgba(56, 182, 255, 0.32);
  --ivory: #f8fafc;
  --ivory-dim: #c8d6e8;
  --ivory-subtle: #7e95b2;
  --emerald-guimard: #00843d;
  --crimson-ghost: #e30613;
  --city-pattern-svg: url("data:image/svg+xml,${swissGridSvg}");
  --zurich-corner-svg: url("data:image/svg+xml,${sbbCornerSvg}");
}

:root[data-city-theme="zurich"] .deco-panel,
:root[data-city-theme="zurich"] .city-selector-bar,
:root[data-city-theme="zurich"] .city-themed-panel {
  background-color: rgba(11, 22, 38, 0.92);
  background-image:
    linear-gradient(160deg, rgba(0, 82, 155, 0.18) 0%, rgba(11, 22, 38, 0.94) 55%, rgba(227, 6, 19, 0.14) 100%),
    var(--city-pattern-svg);
  background-size: 100% 100%, 64px 64px;
  border-radius: 4px;
  border: 1.5px solid rgba(56, 182, 255, 0.58);
  border-top: 3px solid #e30613;
  box-shadow: 0 16px 38px rgba(4, 10, 20, 0.80), inset 0 1px 0 rgba(248, 250, 252, 0.30);
}

:root[data-city-theme="zurich"] .deco-corner {
  width: 14px;
  height: 14px;
  border: none !important;
  background-image: var(--zurich-corner-svg);
  background-size: contain;
  background-repeat: no-repeat;
}

:root[data-city-theme="zurich"] .deco-corner.tr { transform: scaleX(-1); }
:root[data-city-theme="zurich"] .deco-corner.bl { transform: scaleY(-1); }
:root[data-city-theme="zurich"] .deco-corner.br { transform: scale(-1, -1); }

:root[data-city-theme="zurich"] .city-cultural-banner {
  border-radius: 4px;
  background: linear-gradient(135deg, rgba(0, 82, 155, 0.44) 0%, rgba(11, 22, 38, 0.94) 58%, rgba(227, 6, 19, 0.34) 100%);
  border: 1.5px solid rgba(56, 182, 255, 0.72);
  border-left: 4px solid #e30613;
}
`;
  }

  if (safeCityId === 'melbourne') {
    const fedSquareSvg = encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 72 72'>` +
        `<polygon points='0,0 72,0 36,36' fill='none' stroke='#f4c430' stroke-width='1.1' stroke-opacity='0.22'/>` +
        `<polygon points='0,72 36,36 72,72' fill='none' stroke='#00a88f' stroke-width='1.1' stroke-opacity='0.22'/>` +
        `<polygon points='0,0 36,36 0,72' fill='none' stroke='#d99b66' stroke-width='1.0' stroke-opacity='0.20'/>` +
        `<polygon points='72,0 72,72 36,36' fill='none' stroke='#0072ce' stroke-width='1.0' stroke-opacity='0.20'/>` +
        `</svg>`
    );
    const melCornerSvg = encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'>` +
        `<polygon points='1,1 15,1 1,15' fill='#00843d' fill-opacity='0.45' stroke='#f4c430' stroke-width='1.8'/>` +
        `</svg>`
    );
    return `
/* Australia / Melbourne: W-Class Tram Heritage Green & Gold, Victorian Bluestone & Federation Square Pinwheel Fractals */
:root[data-city-theme="melbourne"] {
  --bg-obsidian: #0b1114;
  --bg-panel: rgba(16, 24, 29, 0.91);
  --bg-panel-elevated: rgba(23, 35, 42, 0.96);
  --gold-bright: #f4c430;
  --gold-primary: #00a88f;
  --gold-muted: #00843d;
  --gold-border: rgba(244, 196, 48, 0.48);
  --gold-border-strong: rgba(0, 168, 143, 0.90);
  --gold-glow: rgba(244, 196, 48, 0.32);
  --ivory: #f9f6ef;
  --ivory-dim: #cbd6d2;
  --ivory-subtle: #849690;
  --emerald-guimard: #00843d;
  --crimson-ghost: #e4002b;
  --city-pattern-svg: url("data:image/svg+xml,${fedSquareSvg}");
  --melbourne-corner-svg: url("data:image/svg+xml,${melCornerSvg}");
}

:root[data-city-theme="melbourne"] .deco-panel,
:root[data-city-theme="melbourne"] .city-selector-bar,
:root[data-city-theme="melbourne"] .city-themed-panel {
  background-color: rgba(16, 24, 29, 0.91);
  background-image:
    linear-gradient(160deg, rgba(0, 132, 61, 0.16) 0%, rgba(16, 24, 29, 0.94) 55%, rgba(0, 114, 206, 0.16) 100%),
    var(--city-pattern-svg);
  background-size: 100% 100%, 72px 72px;
  border-radius: 8px;
  border: 1.5px solid rgba(244, 196, 48, 0.62);
  border-top: 3px solid #f4c430;
  box-shadow: 0 16px 38px rgba(6, 10, 14, 0.78), inset 0 1px 0 rgba(249, 246, 239, 0.30);
}

:root[data-city-theme="melbourne"] .deco-corner {
  width: 15px;
  height: 15px;
  border: none !important;
  background-image: var(--melbourne-corner-svg);
  background-size: contain;
  background-repeat: no-repeat;
}

:root[data-city-theme="melbourne"] .deco-corner.tr { transform: scaleX(-1); }
:root[data-city-theme="melbourne"] .deco-corner.bl { transform: scaleY(-1); }
:root[data-city-theme="melbourne"] .deco-corner.br { transform: scale(-1, -1); }

:root[data-city-theme="melbourne"] .city-cultural-banner {
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(0, 132, 61, 0.38) 0%, rgba(16, 24, 29, 0.93) 55%, rgba(0, 114, 206, 0.32) 100%);
  border: 1.5px solid rgba(244, 196, 48, 0.75);
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

  const upperId = safeCityId.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase();
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
import { ${upperId}_GEO_CONFIG, ${upperId}_WATER_BODIES, ${upperId}_TOPOGRAPHY, ${upperId}_HEIGHTMAP } from './geoData';
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
  heightmap: ${upperId}_HEIGHTMAP,
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
