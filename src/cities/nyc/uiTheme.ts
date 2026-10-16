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

export const NYC_UI_THEME: CityCulturalTheme = {
  "cityId": "nyc",
  "themeName": "Gotham Skyscraper Art Deco, Oxidized Liberty Copper & Vignelli Subway Modernism",
  "culturalVibe": "gotham_art_deco_vignelli",
  "inspirationSummary": "GOTHAM ART DECO, IRT/IND & VIGNELLI MODERNISM • 3D ARCHITECTURE & TRANSIT",
  "typography": {
    "displayFont": "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    "bodyFont": "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    "monoFont": "'JetBrains Mono', monospace"
  },
  "cssVariables": {
    "--city-bg-primary": "#080b10",
    "--city-bg-glass": "rgba(11, 15, 22, 0.90)",
    "--city-bg-card": "rgba(18, 24, 34, 0.95)",
    "--city-text-primary": "#f4f6f8",
    "--city-text-muted": "#b4c0cc",
    "--city-accent-primary": "#ffca3a",
    "--city-accent-secondary": "#4ca896",
    "--city-accent-tertiary": "#ee352e",
    "--city-border-color": "rgba(76, 168, 150, 0.42)",
    "--city-badge-bg": "linear-gradient(135deg, #4ca896 0%, #ffca3a 100%)",
    "--city-badge-text": "#080b10",
    "--city-water-color": "#16425b",
    "--city-park-color": "#1b7a43",
    "--city-terrain-color": "#d4cfc4"
  },
  "patternSvgDataUri": "",
  "badgeShape": "octagon-deco"
};
