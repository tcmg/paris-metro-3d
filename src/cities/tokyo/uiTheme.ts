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

import type { CityCulturalTheme } from '../types';

export const TOKYO_UI_THEME: CityCulturalTheme = {
  "cityId": "tokyo",
  "themeName": "Edo Indigo (Ai-iro), Shinto Vermilion Torii (Shu-iro), Gold Leaf & Neo-Tokyo Precision",
  "culturalVibe": "edo_vermilion_neo_tokyo",
  "inspirationSummary": "EDO CASTLE, SHINTO VERMILION & SHINKANSEN • 3D ARCHITECTURE & TRANSIT",
  "typography": {
    "displayFont": "'Space Grotesk', 'Cinzel', sans-serif",
    "bodyFont": "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    "monoFont": "'JetBrains Mono', monospace"
  },
  "cssVariables": {
    "--city-bg-primary": "#080b12",
    "--city-bg-glass": "rgba(12, 16, 26, 0.91)",
    "--city-bg-card": "rgba(18, 24, 38, 0.96)",
    "--city-text-primary": "#f7f8fc",
    "--city-text-muted": "#c4cce0",
    "--city-accent-primary": "#ff4f38",
    "--city-accent-secondary": "#00a896",
    "--city-accent-tertiary": "#ff2a6d",
    "--city-border-color": "rgba(224, 52, 38, 0.48)",
    "--city-badge-bg": "linear-gradient(135deg, #00a896 0%, #ff4f38 100%)",
    "--city-badge-text": "#080b12",
    "--city-water-color": "#124668",
    "--city-park-color": "#1b7a43",
    "--city-terrain-color": "#d8d4ca"
  },
  "patternSvgDataUri": "",
  "badgeShape": "metro-ring-hanko"
};
