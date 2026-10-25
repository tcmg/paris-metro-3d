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

export const SAN_FRANCISCO_UI_THEME: CityCulturalTheme = {
  "cityId": "san-francisco",
  "themeName": "Golden Gate International Orange, Bay Fog Slate, Victorian Painted-Lady Gold & Bay Teal",
  "culturalVibe": "golden_gate_fog_victorian",
  "inspirationSummary": "GOLDEN GATE ART DECO, CABLE CARS & BART SUBWAY • 3D ARCHITECTURE & TRANSIT",
  "typography": {
    "displayFont": "'Fraunces', 'Syne', Georgia, serif",
    "bodyFont": "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    "monoFont": "'JetBrains Mono', monospace"
  },
  "cssVariables": {
    "--city-bg-primary": "#0b131b",
    "--city-bg-glass": "rgba(14, 24, 34, 0.90)",
    "--city-bg-card": "rgba(20, 34, 48, 0.95)",
    "--city-text-primary": "#f7f4ed",
    "--city-text-muted": "#c7d3de",
    "--city-accent-primary": "#f4b942",
    "--city-accent-secondary": "#2a9d8f",
    "--city-accent-tertiary": "#f04a24",
    "--city-border-color": "rgba(240, 74, 36, 0.50)",
    "--city-badge-bg": "linear-gradient(135deg, #2a9d8f 0%, #f4b942 100%)",
    "--city-badge-text": "#0b131b",
    "--city-water-color": "#134e6f",
    "--city-park-color": "#1b7a43",
    "--city-terrain-color": "#d8cfc0"
  },
  "patternSvgDataUri": "",
  "badgeShape": "cable-ticket-pill"
};
