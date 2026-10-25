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

export const ZURICH_UI_THEME: CityCulturalTheme = {
  "cityId": "zurich",
  "themeName": "Swiss International Typographic Grid, SBB Railway Clock Red & Lake Zurich Alpine Cyan",
  "culturalVibe": "swiss_grid_sbb_alpine",
  "inspirationSummary": "LIMMAT, LAKE ZURICH, ETH & UETLIBERG • 3D ARCHITECTURE & TRANSIT",
  "typography": {
    "displayFont": "'Space Grotesk', 'Plus Jakarta Sans', sans-serif",
    "bodyFont": "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    "monoFont": "'IBM Plex Mono', 'JetBrains Mono', monospace"
  },
  "cssVariables": {
    "--city-bg-primary": "#070f1a",
    "--city-bg-glass": "rgba(11, 22, 38, 0.91)",
    "--city-bg-card": "rgba(16, 32, 54, 0.96)",
    "--city-text-primary": "#f8fafc",
    "--city-text-muted": "#c8d6e8",
    "--city-accent-primary": "#38b6ff",
    "--city-accent-secondary": "#00529b",
    "--city-accent-tertiary": "#e30613",
    "--city-border-color": "rgba(56, 182, 255, 0.45)",
    "--city-badge-bg": "linear-gradient(135deg, #00529b 0%, #38b6ff 100%)",
    "--city-badge-text": "#070f1a",
    "--city-water-color": "#147a9c",
    "--city-park-color": "#1b7a43",
    "--city-terrain-color": "#e4dfd5"
  },
  "patternSvgDataUri": "",
  "badgeShape": "swiss-sbb-grid"
};
