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

export const SYDNEY_UI_THEME: CityCulturalTheme = {
  "cityId": "sydney",
  "themeName": "First Nations Aboriginal Dot-Art, Red Ochre Country & Sydney Sandstone",
  "culturalVibe": "aboriginal_ochre_dot_art",
  "inspirationSummary": "GADIGAL COUNTRY, HARBOUR SAILS & METRO • 3D ARCHITECTURE & TRANSIT",
  "typography": {
    "displayFont": "'Cinzel', 'Cormorant Garamond', Georgia, serif",
    "bodyFont": "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    "monoFont": "'JetBrains Mono', monospace"
  },
  "cssVariables": {
    "--city-bg-primary": "#140f0c",
    "--city-bg-glass": "rgba(24, 17, 13, 0.88)",
    "--city-bg-card": "rgba(36, 25, 19, 0.94)",
    "--city-text-primary": "#f7f0e4",
    "--city-text-muted": "#cbbba4",
    "--city-accent-primary": "#f0b85c",
    "--city-accent-secondary": "#009b77",
    "--city-accent-tertiary": "#c85a32",
    "--city-border-color": "rgba(217, 138, 60, 0.42)",
    "--city-badge-bg": "linear-gradient(135deg, #009b77 0%, #f0b85c 100%)",
    "--city-badge-text": "#140f0c",
    "--city-water-color": "#0c5278",
    "--city-park-color": "#1b7a43",
    "--city-terrain-color": "#dec8a8"
  },
  "patternSvgDataUri": "",
  "badgeShape": "ochre-dot-ring"
};
