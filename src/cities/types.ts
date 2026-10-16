/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export type SupportedCityId = 'paris' | 'rio' | 'sydney' | 'london' | 'nyc' | string;

export interface CityGeoConfig {
  cityId: SupportedCityId;
  cityName: string;
  countryName: string;
  centerLat: number;
  centerLon: number;
  bbox: [number, number, number, number]; // [S, W, N, E]
  kmPerDegLat: number;
  kmPerDegLon: number;
  worldUnitsPerKm: number;
  coreRadiusKm: number;
  isCoastal: boolean;
}

export interface CityTopographicHill {
  name?: string;
  cx: number;
  cz: number;
  height: number;
  rx: number;
  rz: number;
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
  shortLabel: string;
  headline: string;
}

export interface CityHistoricalEra {
  startYear: number;
  endYear: number;
  eraTag: string;
  title: string;
  description: string;
  urbanChanges: string[];
}

export interface CityMonumentData {
  id: string;
  name: string;
  lat: number;
  lon: number;
  x: number;
  z: number;
  builtYear: number;
  constructionStartYear?: number;
  radius: number;
  style: string;
  arrondissement: string; // District / Borough / Bairro / Precinct label
  description: string;
}

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

export interface CityTourStopData {
  id: string;
  stopNumber: number;
  title: string;
  historicalDate: string;
  timelineYear: number;
  locationName: string;
  arrondissement: string;
  lat: number;
  lon: number;
  x: number;
  z: number;
  radiusScale: number;
  monumentId?: string;
  stationId?: string;
  interviewQuestion: string;
  fact: string;
}

export interface CityMetroSegmentDef {
  openedYear: number;
  closedYear?: number;
  elevated?: boolean;
  stations: string[];
}

export interface CityMetroLineConfig {
  id: string;
  name: string;
  shortLabel: string;
  color: string;
  textColor: string;
  openedYear: number;
  depthOffset: number;
  historicCompany: string;
  summary: string;
  segments: CityMetroSegmentDef[];
}

export interface CityMetroStationData {
  id: string;
  name: string;
  lat: number;
  lon: number;
  x: number;
  z: number;
  openedYear: number;
  closedYear?: number;
  isGhostStation?: boolean;
  elevated?: boolean;
  arrondissement: string;
  architecture: string;
  landmark?: string;
  description: string;
  lines: string[];
}

export interface CityRailTerminusData {
  id: string;
  metroStationId: string;
  monumentId?: string;
  name: string;
  shortName: string;
  historicCompany: string;
  modernNetwork: string;
  openedYear: number;
  trainStartYear: number;
  trainEndYear: number;
  buildingEndYear: number;
  arrondissement: string;
  destinationLabel: string;
  colorHex: string;
  lat: number;
  lon: number;
  x: number;
  z: number;
  rotationY: number;
  trackCount: number;
  shedWidth: number;
  shedLength: number;
  shedHeight: number;
  shedSpans: number;
  hasClockTower?: boolean;
  hasPontEurope?: boolean;
  hasViaductPortal?: boolean;
  isViaductLine?: boolean;
  description: string;
  corridorLatLon: [number, number][];
  corridorPoints: { x: number; z: number }[];
}

export interface CityDistrictData {
  id: string;
  number: number;
  shortLabel: string;
  name: string;
  officialName: string;
  quartiers: string;
  bank: string;
  filterGroup: string;
  eraBadge: string;
  foundedLabel: string;
  lat: number;
  lon: number;
  x: number;
  z: number;
  standOffRadius: number;
  cameraHeightOffset: number;
  haloRadiusScale: number;
  metroLines: string[];
  history: string;
  notableLandmarks: string;
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
