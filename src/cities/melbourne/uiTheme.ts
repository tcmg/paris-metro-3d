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

export const MELBOURNE_UI_THEME: CityCulturalTheme = {
  "cityId": "melbourne",
  "themeName": "Victorian Gold Rush Bluestone Laneways, W-Class Tram Green & Gold & Fed Square Fractal Geometry",
  "culturalVibe": "victorian_bluestone_tram_gold",
  "inspirationSummary": "FLINDERS CLOCKS, W-CLASS TRAMS, CITY LOOP & 2025 METRO TUNNEL • 3D SIMULATION",
  "typography": {
    "displayFont": "'Fraunces', 'Cinzel Decorative', serif",
    "bodyFont": "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    "monoFont": "'JetBrains Mono', monospace"
  },
  "cssVariables": {
    "--city-bg-primary": "#0b1114",
    "--city-bg-glass": "rgba(16, 24, 29, 0.91)",
    "--city-bg-card": "rgba(23, 35, 42, 0.96)",
    "--city-text-primary": "#f9f6ef",
    "--city-text-muted": "#cbd6d2",
    "--city-accent-primary": "#f4c430",
    "--city-accent-secondary": "#0072ce",
    "--city-accent-tertiary": "#d99b66",
    "--city-border-color": "rgba(244, 196, 48, 0.46)",
    "--city-badge-bg": "linear-gradient(135deg, #0072ce 0%, #f4c430 100%)",
    "--city-badge-text": "#0b1114",
    "--city-water-color": "#1b6478",
    "--city-park-color": "#1b7a43",
    "--city-terrain-color": "#ded9ce"
  },
  "patternSvgDataUri": "",
  "badgeShape": "tram-fractal-shield"
};
