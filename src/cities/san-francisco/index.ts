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
import { SAN_FRANCISCO_GEO_CONFIG, SAN_FRANCISCO_WATER_BODIES, SAN_FRANCISCO_TOPOGRAPHY, SAN_FRANCISCO_HEIGHTMAP } from './geoData';
import {
  SAN_FRANCISCO_MONUMENTS_GLB_PATH,
  SAN_FRANCISCO_MONUMENTS,
  SAN_FRANCISCO_MILESTONES,
  SAN_FRANCISCO_ERAS,
  SAN_FRANCISCO_TOUR_STOPS,
} from './historicalData';
import { SAN_FRANCISCO_METRO_SYSTEM_NAME, SAN_FRANCISCO_METRO_LINES } from './metroData';
import { SAN_FRANCISCO_RAIL_TERMINI } from './railTerminiData';
import { SAN_FRANCISCO_DISTRICTS } from './districtsData';
import { SAN_FRANCISCO_UI_THEME } from './uiTheme';

export const SAN_FRANCISCO_CITY_DATASET: CityDataset = {
  id: "san-francisco",
  name: "San Francisco",
  localName: "San Francisco (Yelamu)",
  country: "United States",
  region: "California / Bay Area",
  tagline: "GOLDEN GATE ART DECO, CABLE CARS & BART SUBWAY • 3D ARCHITECTURE & TRANSIT",
  metroSystemName: SAN_FRANCISCO_METRO_SYSTEM_NAME,
  timelineRange: [1873,2026],
  geo: SAN_FRANCISCO_GEO_CONFIG,
  waterBodies: SAN_FRANCISCO_WATER_BODIES,
  topography: SAN_FRANCISCO_TOPOGRAPHY,
  heightmap: SAN_FRANCISCO_HEIGHTMAP,
  monuments: SAN_FRANCISCO_MONUMENTS,
  milestones: SAN_FRANCISCO_MILESTONES,
  eras: SAN_FRANCISCO_ERAS,
  tourStops: SAN_FRANCISCO_TOUR_STOPS,
  metroLines: SAN_FRANCISCO_METRO_LINES,
  railTermini: SAN_FRANCISCO_RAIL_TERMINI,
  districts: SAN_FRANCISCO_DISTRICTS,
  uiTheme: SAN_FRANCISCO_UI_THEME,
  osmDataPath: '/data/san-francisco_osm.json',
  monumentsGlbPath: SAN_FRANCISCO_MONUMENTS_GLB_PATH,
};

export * from './geoData';
export * from './historicalData';
export * from './metroData';
export * from './railTerminiData';
export * from './districtsData';
export * from './uiTheme';
