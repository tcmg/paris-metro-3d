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
import { NYC_GEO_CONFIG, NYC_WATER_BODIES, NYC_TOPOGRAPHY, NYC_HEIGHTMAP } from './geoData';
import {
  NYC_MONUMENTS_GLB_PATH,
  NYC_MONUMENTS,
  NYC_MILESTONES,
  NYC_ERAS,
  NYC_TOUR_STOPS,
} from './historicalData';
import { NYC_METRO_SYSTEM_NAME, NYC_METRO_LINES } from './metroData';
import { NYC_RAIL_TERMINI } from './railTerminiData';
import { NYC_DISTRICTS } from './districtsData';
import { NYC_UI_THEME } from './uiTheme';

export const NYC_CITY_DATASET: CityDataset = {
  id: "nyc",
  name: "New York City",
  localName: "New York City",
  country: "United States",
  region: "United States",
  tagline: "GOTHAM ART DECO, IRT/IND & VIGNELLI MODERNISM • 3D ARCHITECTURE & TRANSIT",
  metroSystemName: NYC_METRO_SYSTEM_NAME,
  timelineRange: [1890,2026],
  geo: NYC_GEO_CONFIG,
  waterBodies: NYC_WATER_BODIES,
  topography: NYC_TOPOGRAPHY,
  heightmap: NYC_HEIGHTMAP,
  monuments: NYC_MONUMENTS,
  milestones: NYC_MILESTONES,
  eras: NYC_ERAS,
  tourStops: NYC_TOUR_STOPS,
  metroLines: NYC_METRO_LINES,
  railTermini: NYC_RAIL_TERMINI,
  districts: NYC_DISTRICTS,
  uiTheme: NYC_UI_THEME,
  osmDataPath: '/data/nyc_osm.json',
  monumentsGlbPath: NYC_MONUMENTS_GLB_PATH,
};

export * from './geoData';
export * from './historicalData';
export * from './metroData';
export * from './railTerminiData';
export * from './districtsData';
export * from './uiTheme';
