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
import { RIO_GEO_CONFIG, RIO_WATER_BODIES, RIO_TOPOGRAPHY, RIO_HEIGHTMAP } from './geoData';
import {
  RIO_MONUMENTS_GLB_PATH,
  RIO_MONUMENTS,
  RIO_MILESTONES,
  RIO_ERAS,
  RIO_TOUR_STOPS,
} from './historicalData';
import { RIO_METRO_SYSTEM_NAME, RIO_METRO_LINES } from './metroData';
import { RIO_RAIL_TERMINI } from './railTerminiData';
import { RIO_DISTRICTS } from './districtsData';
import { RIO_UI_THEME } from './uiTheme';

export const RIO_CITY_DATASET: CityDataset = {
  id: "rio",
  name: "Rio de Janeiro",
  localName: "Rio de Janeiro",
  country: "Brazil",
  region: "Brazil",
  tagline: "CARNAVAL, BURLE MARX & GUANABARA BAY • 3D ARCHITECTURE & TRANSIT",
  metroSystemName: RIO_METRO_SYSTEM_NAME,
  timelineRange: [1890,2026],
  geo: RIO_GEO_CONFIG,
  waterBodies: RIO_WATER_BODIES,
  topography: RIO_TOPOGRAPHY,
  heightmap: RIO_HEIGHTMAP,
  monuments: RIO_MONUMENTS,
  milestones: RIO_MILESTONES,
  eras: RIO_ERAS,
  tourStops: RIO_TOUR_STOPS,
  metroLines: RIO_METRO_LINES,
  railTermini: RIO_RAIL_TERMINI,
  districts: RIO_DISTRICTS,
  uiTheme: RIO_UI_THEME,
  osmDataPath: '/data/rio_osm.json',
  monumentsGlbPath: RIO_MONUMENTS_GLB_PATH,
};

export * from './geoData';
export * from './historicalData';
export * from './metroData';
export * from './railTerminiData';
export * from './districtsData';
export * from './uiTheme';
