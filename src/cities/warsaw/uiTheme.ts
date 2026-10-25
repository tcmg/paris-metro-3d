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

export const WARSAW_UI_THEME: CityCulturalTheme = {
  "cityId": "warsaw",
  "themeName": "Polish Crimson & White Eagle, Chopin Nocturne Gold & Old Town Sgraffito",
  "culturalVibe": "polish_crimson_amber_sgraffito",
  "inspirationSummary": "SYRENKA, VISTULA ESCARPMENT & VARSO SKYLINE • 3D ARCHITECTURE & TRANSIT",
  "typography": {
    "displayFont": "'Cinzel Decorative', 'Cormorant Garamond', serif",
    "bodyFont": "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    "monoFont": "'JetBrains Mono', monospace"
  },
  "cssVariables": {
    "--city-bg-primary": "#110b0e",
    "--city-bg-glass": "rgba(24, 15, 20, 0.90)",
    "--city-bg-card": "rgba(36, 22, 29, 0.95)",
    "--city-text-primary": "#fcf9f5",
    "--city-text-muted": "#dfd2c8",
    "--city-accent-primary": "#f4b942",
    "--city-accent-secondary": "#005ca9",
    "--city-accent-tertiary": "#e30613",
    "--city-border-color": "rgba(220, 20, 60, 0.45)",
    "--city-badge-bg": "linear-gradient(135deg, #005ca9 0%, #f4b942 100%)",
    "--city-badge-text": "#110b0e",
    "--city-water-color": "#1f5e7a",
    "--city-park-color": "#1b7a43",
    "--city-terrain-color": "#e3dcd2"
  },
  "patternSvgDataUri": "",
  "badgeShape": "warsaw-fangor-shield"
};
