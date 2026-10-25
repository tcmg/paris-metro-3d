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
import { TOKYO_GEO_CONFIG, TOKYO_WATER_BODIES, TOKYO_TOPOGRAPHY, TOKYO_HEIGHTMAP } from './geoData';
import {
  TOKYO_MONUMENTS_GLB_PATH,
  TOKYO_MONUMENTS,
  TOKYO_MILESTONES,
  TOKYO_ERAS,
  TOKYO_TOUR_STOPS,
} from './historicalData';
import { TOKYO_METRO_SYSTEM_NAME, TOKYO_METRO_LINES } from './metroData';
import { TOKYO_RAIL_TERMINI } from './railTerminiData';
import { TOKYO_DISTRICTS } from './districtsData';
import { TOKYO_UI_THEME } from './uiTheme';

export const TOKYO_CITY_DATASET: CityDataset = {
  id: "tokyo",
  name: "Tokyo",
  localName: "東京 (Tōkyō)",
  country: "Japan",
  region: "Kantō",
  tagline: "EDO CASTLE, SHINTO VERMILION & SHINKANSEN • 3D ARCHITECTURE & TRANSIT",
  metroSystemName: TOKYO_METRO_SYSTEM_NAME,
  timelineRange: [1872,2026],
  geo: TOKYO_GEO_CONFIG,
  waterBodies: TOKYO_WATER_BODIES,
  topography: TOKYO_TOPOGRAPHY,
  heightmap: TOKYO_HEIGHTMAP,
  monuments: TOKYO_MONUMENTS,
  milestones: TOKYO_MILESTONES,
  eras: TOKYO_ERAS,
  tourStops: TOKYO_TOUR_STOPS,
  metroLines: TOKYO_METRO_LINES,
  railTermini: TOKYO_RAIL_TERMINI,
  districts: TOKYO_DISTRICTS,
  uiTheme: TOKYO_UI_THEME,
  osmDataPath: '/data/tokyo_osm.json',
  monumentsGlbPath: TOKYO_MONUMENTS_GLB_PATH,
};

export * from './geoData';
export * from './historicalData';
export * from './metroData';
export * from './railTerminiData';
export * from './districtsData';
export * from './uiTheme';
