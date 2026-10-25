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

export const RIO_UI_THEME: CityCulturalTheme = {
  "cityId": "rio",
  "themeName": "Carnival Samba & Roberto Burle Marx Tropical Modernism",
  "culturalVibe": "carnival_copacabana_wave",
  "inspirationSummary": "CARNAVAL, BURLE MARX & GUANABARA BAY • 3D ARCHITECTURE & TRANSIT",
  "typography": {
    "displayFont": "'Syne', 'Cinzel Decorative', sans-serif",
    "bodyFont": "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    "monoFont": "'JetBrains Mono', monospace"
  },
  "cssVariables": {
    "--city-bg-primary": "#05151f",
    "--city-bg-glass": "rgba(6, 24, 36, 0.86)",
    "--city-bg-card": "rgba(10, 34, 48, 0.94)",
    "--city-text-primary": "#fcf9f0",
    "--city-text-muted": "#b8d0c8",
    "--city-accent-primary": "#ffda44",
    "--city-accent-secondary": "#12c47a",
    "--city-accent-tertiary": "#ff3b7f",
    "--city-border-color": "rgba(255, 218, 68, 0.38)",
    "--city-badge-bg": "linear-gradient(135deg, #12c47a 0%, #ffda44 100%)",
    "--city-badge-text": "#05151f",
    "--city-water-color": "#0d6e8a",
    "--city-park-color": "#1b7a43",
    "--city-terrain-color": "#e6dcc5"
  },
  "patternSvgDataUri": "",
  "badgeShape": "beveled-carnival"
};
