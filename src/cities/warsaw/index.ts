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
import { WARSAW_GEO_CONFIG, WARSAW_WATER_BODIES, WARSAW_TOPOGRAPHY, WARSAW_HEIGHTMAP } from './geoData';
import {
  WARSAW_MONUMENTS_GLB_PATH,
  WARSAW_MONUMENTS,
  WARSAW_MILESTONES,
  WARSAW_ERAS,
  WARSAW_TOUR_STOPS,
} from './historicalData';
import { WARSAW_METRO_SYSTEM_NAME, WARSAW_METRO_LINES } from './metroData';
import { WARSAW_RAIL_TERMINI } from './railTerminiData';
import { WARSAW_DISTRICTS } from './districtsData';
import { WARSAW_UI_THEME } from './uiTheme';

export const WARSAW_CITY_DATASET: CityDataset = {
  id: "warsaw",
  name: "Warsaw",
  localName: "Warszawa",
  country: "Poland",
  region: "Mazovia (Mazowsze)",
  tagline: "METRO WARSZAWSKIE, VISTULA ESCARPMENT & PHOENIX SKYLINE • 3D ARCHITECTURE & TRANSIT",
  metroSystemName: WARSAW_METRO_SYSTEM_NAME,
  timelineRange: [1864,2026],
  geo: WARSAW_GEO_CONFIG,
  waterBodies: WARSAW_WATER_BODIES,
  topography: WARSAW_TOPOGRAPHY,
  heightmap: WARSAW_HEIGHTMAP,
  monuments: WARSAW_MONUMENTS,
  milestones: WARSAW_MILESTONES,
  eras: WARSAW_ERAS,
  tourStops: WARSAW_TOUR_STOPS,
  metroLines: WARSAW_METRO_LINES,
  railTermini: WARSAW_RAIL_TERMINI,
  districts: WARSAW_DISTRICTS,
  uiTheme: WARSAW_UI_THEME,
  osmDataPath: '/data/warsaw_osm.json',
  monumentsGlbPath: WARSAW_MONUMENTS_GLB_PATH,
};

export * from './geoData';
export * from './historicalData';
export * from './metroData';
export * from './railTerminiData';
export * from './districtsData';
export * from './uiTheme';
