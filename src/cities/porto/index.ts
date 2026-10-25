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
import { PORTO_GEO_CONFIG, PORTO_WATER_BODIES, PORTO_TOPOGRAPHY, PORTO_HEIGHTMAP } from './geoData';
import {
  PORTO_MONUMENTS_GLB_PATH,
  PORTO_MONUMENTS,
  PORTO_MILESTONES,
  PORTO_ERAS,
  PORTO_TOUR_STOPS,
} from './historicalData';
import { PORTO_METRO_SYSTEM_NAME, PORTO_METRO_LINES } from './metroData';
import { PORTO_RAIL_TERMINI } from './railTerminiData';
import { PORTO_DISTRICTS } from './districtsData';
import { PORTO_UI_THEME } from './uiTheme';

export const PORTO_CITY_DATASET: CityDataset = {
  id: "porto",
  name: "Porto",
  localName: "Porto (Invicta)",
  country: "Portugal",
  region: "Norte / Douro Litoral",
  tagline: "AZULEJO CERAMICS, DOURO BRIDGES & METRO DO PORTO • 3D ARCHITECTURE & TRANSIT",
  metroSystemName: PORTO_METRO_SYSTEM_NAME,
  timelineRange: [1877,2026],
  geo: PORTO_GEO_CONFIG,
  waterBodies: PORTO_WATER_BODIES,
  topography: PORTO_TOPOGRAPHY,
  heightmap: PORTO_HEIGHTMAP,
  monuments: PORTO_MONUMENTS,
  milestones: PORTO_MILESTONES,
  eras: PORTO_ERAS,
  tourStops: PORTO_TOUR_STOPS,
  metroLines: PORTO_METRO_LINES,
  railTermini: PORTO_RAIL_TERMINI,
  districts: PORTO_DISTRICTS,
  uiTheme: PORTO_UI_THEME,
  osmDataPath: '/data/porto_osm.json',
  monumentsGlbPath: PORTO_MONUMENTS_GLB_PATH,
};

export * from './geoData';
export * from './historicalData';
export * from './metroData';
export * from './railTerminiData';
export * from './districtsData';
export * from './uiTheme';
