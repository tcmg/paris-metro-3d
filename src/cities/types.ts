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

export type SupportedCityId =
  | 'paris'
  | 'rio'
  | 'sydney'
  | 'london'
  | 'nyc'
  | 'san-francisco'
  | 'las-vegas'
  | 'kyoto'
  | 'melbourne'
  | 'porto'
  | 'barcelona'
  | string;

export interface CityGeoConfig {
  cityId?: SupportedCityId;
  cityName?: string;
  countryName?: string;
  centerLat: number;
  centerLon: number;
  bbox: [number, number, number, number]; // [S, W, N, E]
  mPerDegLat: number;
  mPerDegLon: number;
  kmPerDegLat?: number;
  kmPerDegLon?: number;
  worldUnitsPerKm?: number;
  coreRadiusKm?: number;
  isCoastal?: boolean;
  defaultElevationMeters?: number;
}

export interface CityWaterBody {
  id: string;
  name: string;
  kind: 'river' | 'bay' | 'ocean' | 'lagoon' | 'harbor' | 'canal' | string;
  type: 'polygon' | 'polyline' | string;
  widthMeters?: number;
  color?: string;
  outerRingLatLon?: [number, number][];
  pathLatLon?: [number, number][];
}

export interface CityTopographyPeak {
  id: string;
  name: string;
  lat: number;
  lon: number;
  x?: number;
  z?: number;
  peakElevationMeters: number;
  radiusMeters: number;
  steepness: number;
  ridgeAzimuthDeg?: number;
  ridgeElongation?: number;
}

export interface CityTopographicHill {
  name?: string;
  cx: number;
  cz: number;
  height: number;
  rx: number;
  rz: number;
}

export interface CityHeightmapGrid {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
  cols: number;
  rows: number;
  stepX: number;
  stepZ: number;
  baseDatumMeters: number;
  maxElevationMeters: number;
  data: number[];
}

export interface CityBridgeDef {
  id: string;
  name: string;
  lat: number;
  lon: number;
  builtYear: number;
  lengthWorld: number;
  widthWorld: number;
  rotationY: number;
  style: 'stone-arch' | 'iron-arch' | 'suspension' | 'cable-stayed' | 'viaduct' | 'bascule';
}

export interface CityParkDef {
  name: string;
  lat: number;
  lon: number;
  rx: number;
  rz: number;
  rotation: number;
  hasBasin?: boolean;
}

export interface CityPlaceDef {
  name: string;
  lat: number;
  lon: number;
  radius: number;
  hasColumnOrObelisk?: boolean;
}

export interface CityHistoricalMilestone {
  year: number;
  title?: string;
  description?: string;
  category?: string;
  shortLabel?: string;
  headline?: string;
}

export interface CityEraDescription {
  id: string;
  name: string;
  yearRange: [number, number];
  tagline: string;
  summary: string;
}

export interface CityHistoricalEra {
  startYear: number;
  endYear: number;
  eraTag: string;
  title: string;
  description: string;
  urbanChanges: string[];
}

export interface CityMonument {
  id: string;
  nodeName: string;
  name: string;
  localName?: string;
  year: number;
  completedYear?: number;
  architect: string;
  architecturalStyle: string;
  lat: number;
  lon: number;
  x: number;
  z: number;
  baseElevationMeters: number;
  scale: number;
  rotationY: number;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  archetype: string;
  fact: string;
  facts: string[];
  historicalSummary: string;
  metroConnection?: string;
  svgPath: string;
}

export type CityMonumentData = CityMonument;

export interface CityBlenderMonumentPlacement {
  glbNodeName: string;
  monumentId?: string;
  customLatLon?: [number, number];
  baseY?: number;
  rotationY: number;
  scale: number;
  minYear: number;
  maxYear: number;
}

export interface CityMonumentRichMetadata {
  heightMeters: number;
  era: 'medieval' | 'empire1900' | 'gares' | 'modern';
  eraLabel: string;
  connectedLines: string[];
  svgPaths: string[];
  silhouettePath: string;
}

export interface CityTourStop {
  id: string;
  title: string;
  year: number;
  lat: number;
  lon: number;
  x: number;
  z: number;
  cameraOffset: [number, number, number];
  narrative: string;
  highlightMonumentId?: string;
  highlightStationName?: string;
}

export type CityTourStopData = CityTourStop;

export interface CityMetroSegmentDef {
  openedYear: number;
  closedYear?: number;
  elevated?: boolean;
  stations: string[];
}

export interface CityMetroStation {
  name: string;
  lat: number;
  lon: number;
  x: number;
  z: number;
  year: number;
  lines: string[];
  fact?: string;
  isGhost?: boolean;
}

export interface CityMetroLine {
  line: string;
  name: string;
  color: string;
  textColor?: string;
  openedYear: number;
  rollingStockStyle?: string;
  stations: CityMetroStation[];
}

export type CityMetroLineConfig = CityMetroLine;
export type CityMetroStationData = CityMetroStation;

export interface CityRailTerminus {
  id: string;
  name: string;
  year: number;
  lat: number;
  lon: number;
  x: number;
  z: number;
  azimuth: number;
  color: string;
  fact: string;
  destinations: string;
  trainType: string;
  trackPaths: [number, number][][];
}

export type CityRailTerminusData = CityRailTerminus;

export interface CityDistrict {
  id: string;
  number: number;
  name: string;
  localLabel: string;
  subtitle: string;
  lat: number;
  lon: number;
  x: number;
  z: number;
  yearEstablished?: number;
  population?: string;
  landmarks: string[];
  fact: string;
}

export type CityDistrictData = CityDistrict;

export interface CityCulturalTheme {
  cityId: SupportedCityId;
  themeName: string;
  culturalVibe: string;
  inspirationSummary: string;
  typography: {
    displayFont: string;
    bodyFont: string;
    monoFont: string;
  };
  cssVariables: Record<string, string>;
  patternSvgDataUri: string;
  badgeShape: string;
}

export interface CityCulturalUITheme {
  cityId: SupportedCityId;
  cityName: string;
  countryName: string;
  culturalMovement: string;
  hudTitle: string;
  hudSubtitle: string;
  networkTitle: string;
  districtsTabLabel: string;
  tourTabLabel: string;
  tourPanelTitle: string;
  stylesheetHref: string;
  googleFontsUrl: string;
  palette: {
    bgObsidian: string;
    bgPanel: string;
    bgPanelElevated: string;
    primaryBright: string;
    primaryMain: string;
    primaryMuted: string;
    borderSubtle: string;
    borderStrong: string;
    accentGlow: string;
    textPrimary: string;
    textDim: string;
    textSubtle: string;
    secondaryAccent: string;
    alertAccent: string;
    worldGroundBase: string;
    worldWaterTint: string;
    worldWallBase: string;
    worldRoofBase: string;
  };
  fonts: {
    display: string;
    serif: string;
    sans: string;
    mono: string;
  };
  svgOrnamentPaths: string[];
}

export interface CityDataset {
  id: SupportedCityId;
  name: string;
  localName: string;
  country: string;
  region: string;
  tagline: string;
  metroSystemName: string;
  timelineRange: [number, number];
  geo: CityGeoConfig;
  waterBodies: CityWaterBody[];
  topography: CityTopographyPeak[];
  heightmap?: CityHeightmapGrid;
  monuments: CityMonument[];
  milestones: CityHistoricalMilestone[];
  eras: CityEraDescription[];
  tourStops: CityTourStop[];
  metroLines: CityMetroLine[];
  railTermini: CityRailTerminus[];
  districts: CityDistrict[];
  uiTheme: CityCulturalTheme;
  osmDataPath: string;
  monumentsGlbPath: string;
}
