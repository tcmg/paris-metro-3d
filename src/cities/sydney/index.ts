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
import { SYDNEY_GEO_CONFIG, SYDNEY_WATER_BODIES, SYDNEY_TOPOGRAPHY } from './geoData';
import {
  SYDNEY_MONUMENTS_GLB_PATH,
  SYDNEY_MONUMENTS,
  SYDNEY_MILESTONES,
  SYDNEY_ERAS,
  SYDNEY_TOUR_STOPS,
} from './historicalData';
import { SYDNEY_METRO_SYSTEM_NAME, SYDNEY_METRO_LINES } from './metroData';
import { SYDNEY_RAIL_TERMINI } from './railTerminiData';
import { SYDNEY_DISTRICTS } from './districtsData';
import { SYDNEY_UI_THEME } from './uiTheme';

export const SYDNEY_CITY_DATASET: CityDataset = {
  id: "sydney",
  name: "Sydney",
  localName: "Sydney",
  country: "Australia",
  region: "Australia",
  tagline: "GADIGAL COUNTRY, HARBOUR SAILS & METRO • 3D ARCHITECTURE & TRANSIT",
  metroSystemName: SYDNEY_METRO_SYSTEM_NAME,
  timelineRange: [1890,2026],
  geo: SYDNEY_GEO_CONFIG,
  waterBodies: SYDNEY_WATER_BODIES,
  topography: SYDNEY_TOPOGRAPHY,
  monuments: SYDNEY_MONUMENTS,
  milestones: SYDNEY_MILESTONES,
  eras: SYDNEY_ERAS,
  tourStops: SYDNEY_TOUR_STOPS,
  metroLines: SYDNEY_METRO_LINES,
  railTermini: SYDNEY_RAIL_TERMINI,
  districts: SYDNEY_DISTRICTS,
  uiTheme: SYDNEY_UI_THEME,
  osmDataPath: '/data/sydney_osm.json',
  monumentsGlbPath: SYDNEY_MONUMENTS_GLB_PATH,
};

export * from './geoData';
export * from './historicalData';
export * from './metroData';
export * from './railTerminiData';
export * from './districtsData';
export * from './uiTheme';
