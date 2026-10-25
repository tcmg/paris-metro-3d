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
import { ZURICH_GEO_CONFIG, ZURICH_WATER_BODIES, ZURICH_TOPOGRAPHY, ZURICH_HEIGHTMAP } from './geoData';
import {
  ZURICH_MONUMENTS_GLB_PATH,
  ZURICH_MONUMENTS,
  ZURICH_MILESTONES,
  ZURICH_ERAS,
  ZURICH_TOUR_STOPS,
} from './historicalData';
import { ZURICH_METRO_SYSTEM_NAME, ZURICH_METRO_LINES } from './metroData';
import { ZURICH_RAIL_TERMINI } from './railTerminiData';
import { ZURICH_DISTRICTS } from './districtsData';
import { ZURICH_UI_THEME } from './uiTheme';

export const ZURICH_CITY_DATASET: CityDataset = {
  id: "zurich",
  name: "Zurich",
  localName: "Zürich",
  country: "Switzerland",
  region: "Canton of Zürich (Kanton Zürich)",
  tagline: "S-BAHN ZÜRICH, VBZ TRAMS, LIMMAT & LAKE ZURICH • 3D ARCHITECTURE & TRANSIT",
  metroSystemName: ZURICH_METRO_SYSTEM_NAME,
  timelineRange: [1847,2026],
  geo: ZURICH_GEO_CONFIG,
  waterBodies: ZURICH_WATER_BODIES,
  topography: ZURICH_TOPOGRAPHY,
  heightmap: ZURICH_HEIGHTMAP,
  monuments: ZURICH_MONUMENTS,
  milestones: ZURICH_MILESTONES,
  eras: ZURICH_ERAS,
  tourStops: ZURICH_TOUR_STOPS,
  metroLines: ZURICH_METRO_LINES,
  railTermini: ZURICH_RAIL_TERMINI,
  districts: ZURICH_DISTRICTS,
  uiTheme: ZURICH_UI_THEME,
  osmDataPath: '/data/zurich_osm.json',
  monumentsGlbPath: ZURICH_MONUMENTS_GLB_PATH,
};

export * from './geoData';
export * from './historicalData';
export * from './metroData';
export * from './railTerminiData';
export * from './districtsData';
export * from './uiTheme';
