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

import type { CityDataset } from '../types';
import { MELBOURNE_GEO_CONFIG, MELBOURNE_WATER_BODIES, MELBOURNE_TOPOGRAPHY, MELBOURNE_HEIGHTMAP } from './geoData';
import {
  MELBOURNE_MONUMENTS_GLB_PATH,
  MELBOURNE_MONUMENTS,
  MELBOURNE_MILESTONES,
  MELBOURNE_ERAS,
  MELBOURNE_TOUR_STOPS,
} from './historicalData';
import { MELBOURNE_METRO_SYSTEM_NAME, MELBOURNE_METRO_LINES } from './metroData';
import { MELBOURNE_RAIL_TERMINI } from './railTerminiData';
import { MELBOURNE_DISTRICTS } from './districtsData';
import { MELBOURNE_UI_THEME } from './uiTheme';

export const MELBOURNE_CITY_DATASET: CityDataset = {
  id: "melbourne",
  name: "Melbourne",
  localName: "Melbourne (Naarm)",
  country: "Australia",
  region: "Victoria (Wurundjeri & Boonwurrung Country)",
  tagline: "CITY LOOP, 2025 METRO TUNNEL, YARRA TRAMS & HODDLE GRID • 3D ARCHITECTURE & TRANSIT",
  metroSystemName: MELBOURNE_METRO_SYSTEM_NAME,
  timelineRange: [1854,2026],
  geo: MELBOURNE_GEO_CONFIG,
  waterBodies: MELBOURNE_WATER_BODIES,
  topography: MELBOURNE_TOPOGRAPHY,
  heightmap: MELBOURNE_HEIGHTMAP,
  monuments: MELBOURNE_MONUMENTS,
  milestones: MELBOURNE_MILESTONES,
  eras: MELBOURNE_ERAS,
  tourStops: MELBOURNE_TOUR_STOPS,
  metroLines: MELBOURNE_METRO_LINES,
  railTermini: MELBOURNE_RAIL_TERMINI,
  districts: MELBOURNE_DISTRICTS,
  uiTheme: MELBOURNE_UI_THEME,
  osmDataPath: '/data/melbourne_osm.json',
  monumentsGlbPath: MELBOURNE_MONUMENTS_GLB_PATH,
};

export * from './geoData';
export * from './historicalData';
export * from './metroData';
export * from './railTerminiData';
export * from './districtsData';
export * from './uiTheme';
