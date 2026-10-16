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

import {
  ALL_STATIONS,
  METRO_LINES,
  MetroLineConfig,
  MetroStationData,
  SPECIAL_STATION_ORDER,
  STATIONS_MAP
} from '../data/parisMetroData';
import {
  PARIS_GRANDES_LIGNES,
  STATION_GRANDE_LIGNE_MAP
} from '../data/parisGrandesLignesData';
import {
  getClosestMilestoneHeadline,
  PARIS_MONUMENTS,
  PARIS_NATURALISATION_TOUR_STOPS,
  ParisMonumentData,
  ParisNaturalisationTourStop,
  TIMELINE_MILESTONES
} from '../data/parisHistoricalData';
import {
  ARRONDISSEMENTS_MAP,
  ArrondissementFilterId,
  PARIS_ARRONDISSEMENTS,
  ParisArrondissementData
} from '../data/parisArrondissementsData';
import {
  AtmosphereModeId,
  CameraPresetId,
  HoveredEntity,
  WeatherModeId
} from '../scene/SceneManager';
import { SkyWeatherSystem } from '../scene/SkyWeatherSystem';
import type { ParisLiveApiResponse } from '../data/parisLiveClient';
import {
  ACTIVE_CITY_ID,
  ACTIVE_CITY_META,
  SELECTABLE_CITIES,
  switchActiveCity
} from '../cities/activeCityRuntime';

export interface HUDCallbacks {
  onYearChange: (year: number) => void;
  onLineSelect: (lineId: string | null) => void;
  onOpacityChange: (opacity: number) => void;
  onLiftChange: (liftProgress: number, isToggleAction?: boolean) => void;
  onToggleLightColumns: (show: boolean) => void;
  onBokehChange: (aperture: number) => void;
  onCameraPreset: (preset: CameraPresetId) => void;
  onAtmosphereChange: (mode: AtmosphereModeId) => void;
  onTimeOfDayChange: (hours: number) => void;
  onToggleAutoTimeCycle: (enabled: boolean) => void;
  onWeatherChange: (weather: WeatherModeId) => void;
  onToggleLiveWeather: (enabled: boolean) => void;
  onToggleLiveMetro: (enabled: boolean) => void;
  onToggleGhostStations: (show: boolean) => void;
  onTogglePaperModel: (enabled: boolean) => void;
  onToggleMonumentOrbit: (enabled: boolean) => void;
  onToggleCityOrbit: (enabled: boolean) => void;
  onToggleEiffelSparkle: (enabled: boolean) => void;
  onStepCityOrbit: (deltaRadians: number) => void;
  onZoomCamera: (factor: number) => void;
  onFocusTarget: (kind: 'station' | 'monument' | 'arrondissement', id: string) => void;
  onSelectTourStop: (stop: ParisNaturalisationTourStop | null) => void;
}

type ExplorerTabId = 'stations' | 'monuments' | 'arrondissements' | 'tour';
type StationFilterId =
  | 'specialInteriors'
  | 'hubs'
  | 'grandesLignes'
  | 'ghosts'
  | 'viaducts'
  | 'originals1900'
  | 'all';
type MonumentEraFilterId = 'all' | 'medieval' | 'empire1900' | 'gares' | 'modern';

interface MonumentRichMetadata {
  heightMeters: number;
  era: 'medieval' | 'empire1900' | 'gares' | 'modern';
  eraLabel: string;
  connectedLines: string[];
  svgPaths: string[];
  /**
   * Compound 2D architectural silhouette path in 32x48 viewBox (y=0 apex, y=48 ground baseline, fill-rule="evenodd")
   */
  silhouettePath: string;
}

const MONUMENT_METADATA: Record<string, MonumentRichMetadata> = {
  'monument-eiffel': {
    heightMeters: 330,
    era: 'empire1900',
    eraLabel: '1889 World’s Fair',
    connectedLines: ['6', '8', '9'],
    svgPaths: [
      'M12 2 L10 11 L7 21 L4 22 L9 22 L10 18 Q12 15 14 18 L15 22 L20 22 L17 21 L14 11 Z',
      'M8.5 14 L15.5 14',
      'M9.8 9 L14.2 9'
    ],
    silhouettePath:
      'M15.3 0 L16.7 0 L16.9 5 L18.5 6.5 L18.5 9 L17.6 9.5 Q18.8 18 20.6 24 L22.5 24 L22.5 26.5 L21.4 26.8 Q23.2 32 25.4 35.5 L27.5 35.5 L27.5 38 L26.6 38.2 L30.5 48 L23.5 48 L22.2 44.5 A6.6 6.8 0 0 0 9.8 44.5 L8.5 48 L1.5 48 L5.4 38.2 L4.5 38 L4.5 35.5 L6.6 35.5 Q8.8 32 10.6 26.8 L9.5 26.5 L9.5 24 L11.4 24 Q13.2 18 14.4 9.5 L13.5 9 L13.5 6.5 L15.1 5 Z ' +
      'M14.7 11.5 L17.3 11.5 L18.2 22.5 L13.8 22.5 Z ' +
      'M12.6 27.5 L19.4 27.5 L21.0 34.5 L11.0 34.5 Z'
  },
  'monument-arc-triomphe': {
    heightMeters: 50,
    era: 'empire1900',
    eraLabel: 'First Empire • 1836',
    connectedLines: ['1', '2', '6'],
    svgPaths: [
      'M4 6 L20 6 L20 21 L15 21 L15 13 A3 3 0 0 0 9 13 L9 21 L4 21 Z',
      'M3 6 L21 6',
      'M4 9 L20 9'
    ],
    silhouettePath:
      'M5 0 L27 0 L27 4 L29.5 4 L29.5 11 L31 11 L31 14.5 L29.5 14.5 L29.5 45 L31 45 L31 48 L21.2 48 L21.2 25 A5.2 7.5 0 0 0 10.8 25 L10.8 48 L1 48 L1 45 L2.5 45 L2.5 14.5 L1 14.5 L1 11 L2.5 11 L2.5 4 L5 4 Z ' +
      'M5.2 18 L8.4 18 L8.4 29 L5.2 29 Z ' +
      'M23.6 18 L26.8 18 L26.8 29 L23.6 29 Z'
  },
  'monument-notre-dame': {
    heightMeters: 96,
    era: 'medieval',
    eraLabel: 'Gothic • 1163',
    connectedLines: ['4', '10', '1', '11'],
    svgPaths: [
      'M5 8 L9 8 L9 21 L5 21 Z',
      'M15 8 L19 8 L19 21 L15 21 Z',
      'M9 12 L15 12 L15 21 L9 21 Z',
      'M12 2 L11 12 L13 12 Z',
      'M12 15 A1.8 1.8 0 1 0 12 15.01'
    ],
    silhouettePath:
      'M16 0 L17.3 14 L18.2 21 L20.5 21 L20.5 12 L29.5 12 L29.5 48 L2.5 48 L2.5 12 L11.5 12 L11.5 21 L13.8 21 L14.7 14 Z ' +
      'M12.5 28.5 A3.5 3.5 0 1 0 19.5 28.5 A3.5 3.5 0 1 0 12.5 28.5 Z ' +
      'M5.5 16 L8.5 16 L8.5 25 L5.5 25 Z ' +
      'M23.5 16 L26.5 16 L26.5 25 L23.5 25 Z ' +
      'M5 48 L5 40 Q7 36.5 9 40 L9 48 Z ' +
      'M13.2 48 L13.2 38.5 Q16 34.5 18.8 38.5 L18.8 48 Z ' +
      'M23 48 L23 40 Q25 36.5 27 40 L27 48 Z'
  },
  'monument-sainte-chapelle': {
    heightMeters: 75,
    era: 'medieval',
    eraLabel: 'Royal Gothic • 1248',
    connectedLines: ['4', '1', '7', '14'],
    svgPaths: [
      'M12 2 L10.5 9 L13.5 9 Z',
      'M7 9 L17 9 L18 13 L18 21 L6 21 L6 13 Z',
      'M9 13 L9 19 M12 13 L12 19 M15 13 L15 19'
    ],
    silhouettePath:
      'M16 0 L17.5 14 L18.5 18 L24 22 L25 17 L26.5 22 L28 24 L28 48 L4 48 L4 24 L5.5 22 L7 17 L8 22 L13.5 18 L14.5 14 Z ' +
      'M8 44 L8 29 Q9.5 26 11 29 L11 44 Z ' +
      'M14.2 44 L14.2 28 Q16 25 17.8 28 L17.8 44 Z ' +
      'M21 44 L21 29 Q22.5 26 24 29 L24 44 Z'
  },
  'monument-louvre': {
    heightMeters: 35,
    era: 'medieval',
    eraLabel: 'Palace 1546 • Pyramid 1989',
    connectedLines: ['1', '7', '14'],
    svgPaths: [
      'M3 20 L12 8 L21 20 Z',
      'M7.5 14 L16.5 14',
      'M12 8 L8 20 M12 8 L16 20'
    ],
    silhouettePath:
      'M16 0 L31 44 L31 48 L1 48 L1 44 Z ' +
      'M16 9 L11.5 23 L20.5 23 Z ' +
      'M10.2 27 L5.5 41.5 L14.6 41.5 Z ' +
      'M21.8 27 L17.4 41.5 L26.5 41.5 Z ' +
      'M16 39 L12.5 28 L19.5 28 Z'
  },
  'monument-sacre-coeur': {
    heightMeters: 83,
    era: 'empire1900',
    eraLabel: 'Montmartre • 1914',
    connectedLines: ['2', '12'],
    svgPaths: [
      'M12 3 C9.5 6 9.5 11 9.5 13 L14.5 13 C14.5 11 14.5 6 12 3 Z',
      'M6.5 8 C5 10 5 13 5 14 L8.5 14 C8.5 13 8.5 10 6.5 8 Z',
      'M17.5 8 C15.5 10 15.5 13 15.5 14 L19 14 C19 13 19 10 17.5 8 Z',
      'M4 14 L20 14 L20 21 L4 21 Z'
    ],
    silhouettePath:
      'M15.3 0 L16.7 0 L16.7 3.5 L18 5 C21.2 9.5 21.6 17 21.6 24 L22.5 24 C22.5 18 23.2 13 26 10.5 L26.8 8 L27.6 10.5 C30 13 30.5 18 30.5 25 L31 25 L31 48 L1 48 L1 25 L1.5 25 C1.5 18 2 13 4.4 10.5 L5.2 8 L6 10.5 C8.8 13 9.5 18 9.5 24 L10.4 24 C10.4 17 10.8 9.5 14 5 L15.3 3.5 Z ' +
      'M5.5 48 L5.5 37 A2.5 3.5 0 0 1 10.5 37 L10.5 48 Z ' +
      'M13 48 L13 35 A3 4.5 0 0 1 19 35 L19 48 Z ' +
      'M21.5 48 L21.5 37 A2.5 3.5 0 0 1 26.5 37 L26.5 48 Z'
  },
  'monument-opera-garnier': {
    heightMeters: 56,
    era: 'empire1900',
    eraLabel: 'Second Empire • 1875',
    connectedLines: ['3', '7', '8', '9'],
    svgPaths: [
      'M6 12 A6 5 0 0 1 18 12 Z',
      'M4 12 L20 12 L20 21 L4 21 Z',
      'M7 12 L7 21 M10 12 L10 21 M14 12 L14 21 M17 12 L17 21'
    ],
    silhouettePath:
      'M16 0 L17.6 4.5 L26 13 L26 16 C23 11 9 11 6 16 L6 13 L14.4 4.5 Z ' +
      'M6 16 A10.5 8 0 0 1 26 16 L30.5 16 L30.5 22 L31.5 22 L31.5 48 L0.5 48 L0.5 22 L1.5 22 L1.5 16 Z ' +
      'M4.5 25 L8.5 25 L8.5 33 L4.5 33 Z ' +
      'M11.5 25 L15 25 L15 33 L11.5 33 Z ' +
      'M17 25 L20.5 25 L20.5 33 L17 33 Z ' +
      'M23.5 25 L27.5 25 L27.5 33 L23.5 33 Z ' +
      'M4.5 48 L4.5 39 A2 3 0 0 1 8.5 39 L8.5 48 Z ' +
      'M13.5 48 L13.5 38.5 A2.5 3.5 0 0 1 18.5 38.5 L18.5 48 Z ' +
      'M23.5 48 L23.5 39 A2 3 0 0 1 27.5 39 L27.5 48 Z'
  },
  'monument-invalides': {
    heightMeters: 107,
    era: 'medieval',
    eraLabel: 'Classical Gold Dome • 1706',
    connectedLines: ['8', '13'],
    svgPaths: [
      'M12 2 L12 5',
      'M7.5 12 A4.5 5.5 0 0 1 16.5 12 Z',
      'M5 12 L19 12 L19 16 L5 16 Z',
      'M3 16 L21 16 L21 21 L3 21 Z'
    ],
    silhouettePath:
      'M15.4 0 L16.6 0 L16.9 7 L18.5 8.5 L18.5 12.5 C23 15 24.5 21 24.5 26 L26 26 L26 35 L31 35 L31 48 L1 48 L1 35 L6 35 L6 26 L7.5 26 C7.5 21 9 15 13.5 12.5 L13.5 8.5 L15.1 7 Z ' +
      'M10 28 L12.5 28 L12.5 34 L10 34 Z ' +
      'M14.8 28 L17.2 28 L17.2 34 L14.8 34 Z ' +
      'M19.5 28 L22 28 L22 34 L19.5 34 Z ' +
      'M13.5 48 L13.5 40 A2.5 3 0 0 1 18.5 40 L18.5 48 Z'
  },
  'monument-pantheon': {
    heightMeters: 83,
    era: 'medieval',
    eraLabel: 'Neoclassical • 1790',
    connectedLines: ['10', '7'],
    svgPaths: [
      'M8 10 A4 4.5 0 0 1 16 10 Z',
      'M4 14 L12 10 L20 14 Z',
      'M5 14 L19 14 L19 21 L5 21 Z',
      'M8 14 L8 21 M12 14 L12 21 M16 14 L16 21'
    ],
    silhouettePath:
      'M15.3 0 L16.7 0 L16.7 3 L18.5 3 L18.5 4.4 L16.7 4.4 L16.7 7 L18.5 7.5 L18.5 11 A8.5 9.5 0 0 1 24.5 20 L26 20 L26 29 L31 33.5 L31 48 L1 48 L1 33.5 L6 29 L6 20 L7.5 20 A8.5 9.5 0 0 1 13.5 11 L13.5 7.5 L15.3 7 L15.3 4.4 L13.5 4.4 L13.5 3 L15.3 3 Z ' +
      'M9.5 22 L12 22 L12 27.5 L9.5 27.5 Z ' +
      'M14.8 22 L17.2 22 L17.2 27.5 L14.8 27.5 Z ' +
      'M20 22 L22.5 22 L22.5 27.5 L20 27.5 Z ' +
      'M6 36.5 L9 36.5 L9 46 L6 46 Z ' +
      'M12 36.5 L14.8 36.5 L14.8 46 L12 46 Z ' +
      'M17.2 36.5 L20 36.5 L20 46 L17.2 46 Z ' +
      'M23 36.5 L26 36.5 L26 46 L23 46 Z'
  },
  'monument-grand-palais': {
    heightMeters: 45,
    era: 'empire1900',
    eraLabel: '1900 Exposition',
    connectedLines: ['1', '9', '13'],
    svgPaths: [
      'M3 15 Q12 6 21 15 Z',
      'M3 15 L21 15 L21 21 L3 21 Z',
      'M8 12 L8 21 M12 10.5 L12 21 M16 12 L16 21'
    ],
    silhouettePath:
      'M15.4 0 L16.6 0 L16.6 5.5 C23.5 6.5 27.5 14 28.5 22 L31.5 22 L31.5 48 L0.5 48 L0.5 22 L3.5 22 C4.5 14 8.5 6.5 15.4 5.5 Z ' +
      'M6.5 21 C8.5 14 12 10.5 15.2 10.2 L15.2 21 Z ' +
      'M16.8 10.2 C20 10.5 23.5 14 25.5 21 L16.8 21 Z ' +
      'M4.5 48 L4.5 31 A2.5 4 0 0 1 9.5 31 L9.5 48 Z ' +
      'M13 48 L13 28.5 A3 4.5 0 0 1 19 28.5 L19 48 Z ' +
      'M22.5 48 L22.5 31 A2.5 4 0 0 1 27.5 31 L27.5 48 Z'
  },
  'monument-concorde-madeleine': {
    heightMeters: 36,
    era: 'empire1900',
    eraLabel: 'Obelisk • 1836',
    connectedLines: ['1', '8', '12', '14'],
    svgPaths: [
      'M12 2 L10.6 5 L13.4 5 Z',
      'M10.6 5 L10 18 L14 18 L13.4 5 Z',
      'M8 18 L16 18 L17 21 L7 21 Z'
    ],
    silhouettePath:
      'M16 0 L19.2 6.5 L20.4 33 L23.5 33 L23.5 36.5 L22.2 36.5 L22.2 43.5 L26.5 43.5 L28 48 L4 48 L5.5 43.5 L9.8 43.5 L9.8 36.5 L8.5 36.5 L8.5 33 L11.6 33 L12.8 6.5 Z ' +
      'M14.8 11 L17.2 11 L17.2 28 L14.8 28 Z'
  },
  'monument-bastille': {
    heightMeters: 50,
    era: 'empire1900',
    eraLabel: 'July Column • 1840',
    connectedLines: ['1', '5', '8'],
    svgPaths: [
      'M12 2 L10.5 5 L13.5 5 Z',
      'M11 6 L13 6 L13 17 L11 17 Z',
      'M8 17 L16 17 L16 21 L8 21 Z'
    ],
    silhouettePath:
      'M16 0 L18.5 3 L17 6.5 L20.5 7 L20.5 10.5 L18.8 11.5 L19.2 34 L24 34 L24 37.5 L26.5 37.5 L26.5 44.5 L29.5 44.5 L29.5 48 L2.5 48 L2.5 44.5 L5.5 44.5 L5.5 37.5 L8 37.5 L8 34 L12.8 34 L13.2 11.5 L11.5 10.5 L11.5 7 L15 6.5 L13.5 3 Z ' +
      'M13.5 48 L13.5 41 A2.5 3 0 0 1 18.5 41 L18.5 48 Z'
  },
  'monument-montparnasse': {
    heightMeters: 210,
    era: 'modern',
    eraLabel: 'Modernist Tower • 1973',
    connectedLines: ['4', '6', '12', '13'],
    svgPaths: [
      'M8 3 L16 3 L16.5 21 L7.5 21 Z',
      'M10.5 3 L10.5 21 M13.5 3 L13.5 21',
      'M8 8 L16 8 M8 14 L16 14'
    ],
    silhouettePath:
      'M15.4 0 L16.6 0 L16.6 3 L22 3 L22 5.5 L25.5 5.5 L26.8 48 L5.2 48 L6.5 5.5 L10 5.5 L10 3 L15.4 3 Z ' +
      'M9.2 9 L11.2 9 L10.6 44 L8.6 44 Z ' +
      'M15.0 9 L17.0 9 L17.0 44 L15.0 44 Z ' +
      'M20.8 9 L22.8 9 L23.4 44 L21.4 44 Z'
  },
  'monument-pompidou': {
    heightMeters: 42,
    era: 'modern',
    eraLabel: 'High-Tech • 1977',
    connectedLines: ['11', '1', '4', '7', '14'],
    svgPaths: [
      'M4 6 L20 6 L20 20 L4 20 Z',
      'M4 19 L20 7',
      'M9 6 L9 20 M15 6 L15 20',
      'M4 13 L20 13'
    ],
    silhouettePath:
      'M5 0 L8.5 0 L8.5 6 L14 6 L14 1 L18 1 L18 6 L23.5 6 L23.5 0 L27 0 L27 6 L30.5 6 L30.5 48 L1.5 48 L1.5 6 L5 6 Z ' +
      'M5 11 L24 11 L5 34 Z ' +
      'M27 14 L27 42 L8 42 Z'
  },
  'monument-grande-arche': {
    heightMeters: 110,
    era: 'modern',
    eraLabel: 'Bicentennial Cube • 1989',
    connectedLines: ['1'],
    svgPaths: [
      'M4 4 L20 4 L20 20 L4 20 Z',
      'M8.5 8.5 L15.5 8.5 L15.5 15.5 L8.5 15.5 Z',
      'M4 4 L8.5 8.5 M20 4 L15.5 8.5 M4 20 L8.5 15.5 M20 20 L15.5 15.5'
    ],
    silhouettePath:
      'M2.5 0 L29.5 0 L29.5 43.5 L31.5 45.5 L31.5 48 L0.5 48 L0.5 45.5 L2.5 43.5 Z ' +
      'M9.5 10.5 L22.5 10.5 L22.5 37.5 L9.5 37.5 Z'
  },
  'monument-bnf': {
    heightMeters: 79,
    era: 'modern',
    eraLabel: 'Open-Book Towers • 1996',
    connectedLines: ['14', '6'],
    svgPaths: [
      'M4 5 L8 5 L8 17 L10 17 L10 20 L4 20 Z',
      'M20 5 L16 5 L16 17 L14 17 L14 20 L20 20 Z',
      'M9 14 Q12 11 15 14'
    ],
    silhouettePath:
      'M2 0 L9.5 0 L9.5 29 L13.8 29 L13.8 42.5 L18.2 42.5 L18.2 29 L22.5 29 L22.5 0 L30 0 L30 42.5 L31.5 42.5 L31.5 48 L0.5 48 L0.5 42.5 L2 42.5 Z ' +
      'M4.5 4.5 L7 4.5 L7 38 L4.5 38 Z ' +
      'M25 4.5 L27.5 4.5 L27.5 38 L25 38 Z'
  },
  'monument-gare-du-nord': {
    heightMeters: 38,
    era: 'gares',
    eraLabel: 'Grandes Lignes Nord • 1864',
    connectedLines: ['4', '5', '2'],
    svgPaths: [
      'M2 20 L2 10 L7 6 L12 10 L17 6 L22 10 L22 20 Z',
      'M6 20 L6 14 A3 3 0 0 1 11 14 L11 20',
      'M13 20 L13 14 A3 3 0 0 1 18 14 L18 20'
    ],
    silhouettePath:
      'M16 0 L23 7 L25.5 3.5 L30.5 9.5 L30.5 48 L1.5 48 L1.5 9.5 L6.5 3.5 L9 7 Z ' +
      'M10.5 24 A5.5 7 0 0 1 21.5 24 L21.5 48 L10.5 48 Z'
  },
  'monument-gare-de-lest': {
    heightMeters: 36,
    era: 'gares',
    eraLabel: 'Grandes Lignes Est • 1849',
    connectedLines: ['4', '5', '7'],
    svgPaths: [
      'M2 20 L2 9 L8 5 L12 9 L16 5 L22 9 L22 20 Z',
      'M8 14 A4 4 0 0 1 16 14 L8 14 Z'
    ],
    silhouettePath:
      'M8.5 2 L14 8.5 L18 8.5 L23.5 2 L29.5 9 L29.5 48 L2.5 48 L2.5 9 Z ' +
      'M10 22 A6 6 0 0 1 22 22 Z ' +
      'M12.5 48 L12.5 34 L19.5 34 L19.5 48 Z'
  },
  'monument-gare-de-lyon': {
    heightMeters: 67,
    era: 'gares',
    eraLabel: 'PLM & Clock Tower • 1900',
    connectedLines: ['1', '14'],
    svgPaths: [
      'M16 2 L18 5 L18 20 L14 20 L14 5 Z',
      'M3 20 L3 12 Q8.5 7 14 12 L14 20 Z',
      'M16 9 A1 1 0 1 0 16 11 A1 1 0 1 0 16 9'
    ],
    silhouettePath:
      'M23.5 0 L26.5 5.5 L27.5 11 L27.5 32 L30.5 32 L30.5 48 L1.5 48 L1.5 28 Q10.5 19 19.5 28 L19.5 11 L20.5 5.5 Z ' +
      'M21.8 14.5 L25.2 14.5 L25.2 20.5 L21.8 20.5 Z ' +
      'M6.5 48 L6.5 36 A4.5 5 0 0 1 15.5 36 L15.5 48 Z'
  },
  'monument-gare-dausterlitz': {
    heightMeters: 35,
    era: 'gares',
    eraLabel: 'Grandes Lignes PO • 1869',
    connectedLines: ['5', '10'],
    svgPaths: [
      'M2 20 L2 11 L12 4 L22 11 L22 20 Z',
      'M2 14 L22 14',
      'M6 20 L6 14 M18 20 L18 14'
    ],
    silhouettePath:
      'M16 1 L30 13 L30 48 L2 48 L2 13 Z ' +
      'M6.5 24 L25.5 24 L25.5 31 L6.5 31 Z ' +
      'M11 48 L11 36 L21 36 L21 48 Z'
  },
  'monument-gare-saint-lazare': {
    heightMeters: 37,
    era: 'gares',
    eraLabel: 'Grandes Lignes Ouest • 1889',
    connectedLines: ['3', '12', '13', '14'],
    svgPaths: [
      'M2 20 L2 9 L6 5 L10 9 L14 5 L18 9 L22 5 L22 20 Z',
      'M4 15 L20 15'
    ],
    silhouettePath:
      'M5.5 1.5 L10.5 8.5 L16 2.5 L21.5 8.5 L26.5 1.5 L30.5 8.5 L30.5 48 L1.5 48 L1.5 8.5 Z ' +
      'M7.5 48 L7.5 33 A3.5 4 0 0 1 14.5 33 L14.5 48 Z ' +
      'M17.5 48 L17.5 33 A3.5 4 0 0 1 24.5 33 L24.5 48 Z'
  },
  'monument-gare-dorsay': {
    heightMeters: 34,
    era: 'gares',
    eraLabel: '1900 Expo Terminus • Orsay',
    connectedLines: ['12'],
    svgPaths: [
      'M2 20 L2 11 Q12 3 22 11 L22 20 Z',
      'M7 20 L7 13 A5 5 0 0 1 17 13 L17 20'
    ],
    silhouettePath:
      'M5.5 3.5 L9.5 8.5 Q16 2 22.5 8.5 L26.5 3.5 L30.5 10.5 L30.5 48 L1.5 48 L1.5 10.5 Z ' +
      'M9.5 48 L9.5 31 A6.5 7 0 0 1 22.5 31 L22.5 48 Z'
  },
  // Sydney Monuments
  'monument-sydney-opera-house': {
    heightMeters: 67,
    era: 'modern',
    eraLabel: 'Utzon Expressionist Sails • 1973',
    connectedLines: ['T2', 'T3', 'T8', 'L2'],
    svgPaths: ['M2 19 Q6 4 10 19 Q14 2 18 19 Q21 7 22 19 Z'],
    silhouettePath: 'M2 48 Q8 6 13 48 Q19 2 24 48 Q28 14 30 48 Z'
  },
  'monument-harbour-bridge': {
    heightMeters: 134,
    era: 'empire1900',
    eraLabel: 'Bradfield Steel Arch • 1932',
    connectedLines: ['T1', 'T9', 'M1'],
    svgPaths: ['M2 19 L5 7 Q12 1 19 7 L22 19 M2 13 L22 13'],
    silhouettePath: 'M2 48 L2 12 L6 12 Q16 1 26 12 L30 12 L30 48 L26 48 L26 24 L6 24 L6 48 Z'
  },
  'monument-sydney-tower': {
    heightMeters: 309,
    era: 'modern',
    eraLabel: 'Golden Turret Spire • 1981',
    connectedLines: ['M1', 'T1', 'T2', 'T4'],
    svgPaths: ['M12 2 L12 20 M9 7 L15 7 L14 11 L10 11 Z'],
    silhouettePath: 'M15 1 L17 1 L17 9 L21 10 L19 15 L17 15 L17.5 48 L14.5 48 L15 15 L13 15 L11 10 L15 9 Z'
  },
  'monument-qvb': {
    heightMeters: 61,
    era: 'empire1900',
    eraLabel: 'Federation Romanesque • 1898',
    connectedLines: ['T1', 'T2', 'T4', 'L2'],
    svgPaths: ['M3 19 L3 11 L8 11 Q12 3 16 11 L21 11 L21 19 Z'],
    silhouettePath: 'M3 48 L3 20 L10 20 Q16 3 22 20 L29 20 L29 48 Z'
  },
  'monument-central-station-sydney': {
    heightMeters: 85,
    era: 'gares',
    eraLabel: 'Grand Sandstone Clocktower • 1906',
    connectedLines: ['M1', 'T1', 'T2', 'T3', 'T4', 'T8', 'T9', 'L1', 'L2'],
    svgPaths: ['M3 19 L3 12 L15 12 L15 4 L19 4 L19 19 Z'],
    silhouettePath: 'M2 48 L2 24 L18 24 L18 4 L22 1 L26 4 L26 48 Z'
  },
  'monument-st-marys-cathedral': {
    heightMeters: 75,
    era: 'medieval',
    eraLabel: 'Gothic Revival Sandstone • 1882',
    connectedLines: ['T2', 'T3', 'T8', 'T4'],
    svgPaths: ['M5 19 L5 9 L7 3 L9 9 L15 9 L17 3 L19 9 L19 19 Z'],
    silhouettePath: 'M5 48 L5 18 L8 2 L11 18 L21 18 L24 2 L27 18 L27 48 Z'
  },
  'monument-luna-park': {
    heightMeters: 30,
    era: 'empire1900',
    eraLabel: 'Art Deco Moon Face & Towers • 1935',
    connectedLines: ['T1', 'T9'],
    svgPaths: ['M4 19 L4 6 L6 3 L8 6 L8 19 M16 19 L16 6 L18 3 L20 6 L20 19 M8 14 A4 4 0 0 1 16 14'],
    silhouettePath: 'M4 48 L4 12 L6 3 L8 12 L8 28 A8 8 0 0 1 24 28 L24 12 L26 3 L28 12 L28 48 Z'
  },
  'monument-barangaroo-crown': {
    heightMeters: 271,
    era: 'modern',
    eraLabel: 'Sculpted Helical Glass • 2020',
    connectedLines: ['M1'],
    svgPaths: ['M9 19 C9 12 11 6 14 2 C15 8 15 14 14 19 Z'],
    silhouettePath: 'M10 48 C10 26 13 10 18 2 C21 14 20 32 19 48 Z'
  },
  // NYC Monuments
  'monument-empire-state': {
    heightMeters: 443,
    era: 'empire1900',
    eraLabel: 'Art Deco Limestone Spire • 1931',
    connectedLines: ['B', 'D', 'F', 'M', 'N', 'Q', 'R', 'W', '1', '2', '3'],
    svgPaths: ['M7 20 L7 12 L10 12 L10 6 L12 2 L14 6 L14 12 L17 12 L17 20 Z'],
    silhouettePath: 'M6 48 L6 24 L9 24 L9 12 L14 10 L16 1 L18 10 L23 12 L23 24 L26 24 L26 48 Z'
  },
  'monument-chrysler-building': {
    heightMeters: 319,
    era: 'empire1900',
    eraLabel: 'Stainless Sunburst Crown • 1930',
    connectedLines: ['4', '5', '6', '7', 'S'],
    svgPaths: ['M8 20 L8 11 Q12 3 16 11 L16 20 M12 2 L12 6'],
    silhouettePath: 'M8 48 L8 20 L11 16 Q16 3 21 16 L24 20 L24 48 M15.5 1 L16.5 1 L16.5 8 L15.5 8 Z'
  },
  'monument-statue-of-liberty': {
    heightMeters: 93,
    era: 'empire1900',
    eraLabel: 'Bartholdi & Eiffel Copper • 1886',
    connectedLines: ['1', '4', '5', 'R', 'W'],
    svgPaths: ['M8 20 L9 12 L12 6 L15 12 L16 20 M14 6 L16 2'],
    silhouettePath: 'M6 48 L8 28 L11 28 L12 10 L16 8 L19 1 L20 9 L18 28 L22 28 L24 48 Z'
  },
  'monument-brooklyn-bridge': {
    heightMeters: 84,
    era: 'medieval',
    eraLabel: 'Roebling Gothic Towers • 1883',
    connectedLines: ['4', '5', '6', 'A', 'C', '2', '3'],
    svgPaths: ['M4 19 L4 6 L8 6 L8 19 M16 19 L16 6 L20 6 L20 19 M2 14 Q12 8 22 14'],
    silhouettePath: 'M4 48 L4 8 L10 8 L10 48 M22 48 L22 8 L28 8 L28 48 M2 26 Q16 14 30 26'
  },
  'monument-one-world-trade': {
    heightMeters: 541,
    era: 'modern',
    eraLabel: '1,776-Foot Freedom Tower • 2014',
    connectedLines: ['1', '2', '3', 'A', 'C', 'E', 'R', 'W', '4', '5'],
    svgPaths: ['M8 20 L10 5 L12 2 L14 5 L16 20 Z'],
    silhouettePath: 'M8 48 L11 8 L15.5 8 L16 1 L16.5 8 L21 8 L24 48 Z'
  },
  'monument-flatiron': {
    heightMeters: 87,
    era: 'empire1900',
    eraLabel: 'Burnham Beaux-Arts Wedge • 1902',
    connectedLines: ['R', 'W', '6', 'F', 'M'],
    svgPaths: ['M6 20 L12 4 L18 20 Z'],
    silhouettePath: 'M5 48 L13 4 L19 4 L27 48 Z'
  },
  'monument-grand-central': {
    heightMeters: 48,
    era: 'gares',
    eraLabel: 'Beaux-Arts Celestial Hall • 1913',
    connectedLines: ['4', '5', '6', '7', 'S'],
    svgPaths: ['M3 19 L3 9 L21 9 L21 19 Z M7 19 L7 12 A5 5 0 0 1 17 12 L17 19'],
    silhouettePath: 'M2 48 L2 14 L10 10 L16 6 L22 10 L30 14 L30 48 Z'
  },
  'monument-rockefeller-center': {
    heightMeters: 259,
    era: 'empire1900',
    eraLabel: '30 Rock Limestone Slab • 1933',
    connectedLines: ['B', 'D', 'F', 'M', 'E'],
    svgPaths: ['M7 20 L7 9 L9 9 L9 4 L15 4 L15 9 L17 9 L17 20 Z'],
    silhouettePath: 'M6 48 L6 22 L10 22 L10 10 L13 3 L19 3 L22 10 L22 22 L26 22 L26 48 Z'
  }
};

/**
 * Safe DOM element creation helper (strictly avoids innerHTML/outerHTML per secure web guidelines)
 */
function createEl<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

/**
 * Safe SVG icon element builder using createElementNS
 */
function createSvgEmblem(paths: string[], className = 'monument-svg-emblem'): SVGSVGElement {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('class', className);
  svg.setAttribute('aria-hidden', 'true');
  for (const d of paths) {
    const p = document.createElementNS(ns, 'path');
    p.setAttribute('d', d);
    p.setAttribute('fill', 'none');
    p.setAttribute('stroke', 'currentColor');
    p.setAttribute('stroke-width', '1.6');
    p.setAttribute('stroke-linecap', 'round');
    p.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(p);
  }
  return svg;
}

/**
 * Builds shared SVG linear gradients for the 2D monument silhouettes in the West->East Paris Skyline Profile
 */
function createSkylineDefsSvg(): SVGSVGElement {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('width', '0');
  svg.setAttribute('height', '0');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.position = 'absolute';
  svg.style.pointerEvents = 'none';

  const defs = document.createElementNS(ns, 'defs');
  const makeGrad = (
    id: string,
    topColor: string,
    topOpacity: string,
    botColor: string,
    botOpacity: string
  ) => {
    const lg = document.createElementNS(ns, 'linearGradient');
    lg.setAttribute('id', id);
    lg.setAttribute('x1', '0');
    lg.setAttribute('y1', '0');
    lg.setAttribute('x2', '0');
    lg.setAttribute('y2', '1');
    const s1 = document.createElementNS(ns, 'stop');
    s1.setAttribute('offset', '0%');
    s1.setAttribute('stop-color', topColor);
    s1.setAttribute('stop-opacity', topOpacity);
    const s2 = document.createElementNS(ns, 'stop');
    s2.setAttribute('offset', '100%');
    s2.setAttribute('stop-color', botColor);
    s2.setAttribute('stop-opacity', botOpacity);
    lg.appendChild(s1);
    lg.appendChild(s2);
    defs.appendChild(lg);
  };

  makeGrad('skyline-grad-default', '#e5c158', '0.88', '#8a6b1c', '0.28');
  makeGrad('skyline-grad-hover', '#ffe89e', '0.98', '#d4af37', '0.52');
  makeGrad('skyline-grad-active', '#fff7d1', '1.0', '#e5c158', '0.85');

  svg.appendChild(defs);
  return svg;
}

/**
 * Safe 2D building silhouette SVG builder for the West->East Paris Skyline Profile
 */
function createSkylineSilhouetteSvg(silhouettePath: string): SVGSVGElement {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 32 48');
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.setAttribute('class', 'skyline-silhouette-svg');
  svg.setAttribute('aria-hidden', 'true');

  const p = document.createElementNS(ns, 'path');
  p.setAttribute('d', silhouettePath);
  p.setAttribute('fill-rule', 'evenodd');
  p.setAttribute('clip-rule', 'evenodd');
  p.setAttribute('vector-effect', 'non-scaling-stroke');
  svg.appendChild(p);
  return svg;
}

function attachDecoCorners(panel: HTMLElement): void {
  for (const pos of ['tl', 'tr', 'bl', 'br']) {
    const corner = createEl('span', `deco-corner ${pos}`);
    panel.appendChild(corner);
  }
}

export class ArtDecoHUD {
  private timelineInput!: HTMLInputElement;
  private opacitySlider!: HTMLInputElement;
  private paperModelBtn!: HTMLButtonElement;
  private bokehBtn!: HTMLButtonElement;
  private timeSlider!: HTMLInputElement;
  private timeClockReadoutEl!: HTMLElement;
  private settingsSummaryPillEl!: HTMLElement;
  private timeCycleBtn!: HTMLButtonElement;
  private liftSlider!: HTMLInputElement;
  private liftToggleBtn!: HTMLButtonElement;
  private lightColumnsBtn!: HTMLButtonElement;
  private monumentOrbitBtn!: HTMLButtonElement;
  private cityOrbitBtn!: HTMLButtonElement;
  private quickCityOrbitBtn!: HTMLButtonElement;
  private playBtn!: HTMLButtonElement;
  private eventYearPillEl!: HTMLElement;
  private eventHeadlineEl!: HTMLElement;
  private milestoneBtns: Map<number, HTMLButtonElement> = new Map();
  private camPresetBtns: Map<CameraPresetId, HTMLButtonElement> = new Map();
  private activeCameraPreset: CameraPresetId = 'overground';

  private lineBadgeBtns: Map<string, HTMLButtonElement> = new Map();
  private allLinesBtn!: HTMLButtonElement;

  // Unified Right-Side Paris Explorer Panel (Stations / Monuments / History Tour)
  private explorerCardEl!: HTMLElement;
  private explorerBodyWrapEl!: HTMLElement;
  private explorerCollapseBtnEl!: HTMLButtonElement;
  private isExplorerCollapsed = false;
  private activeExplorerTab: ExplorerTabId = 'stations';
  private explorerTabBtns: Map<ExplorerTabId, HTMLButtonElement> = new Map();
  private explorerPaneEls: Map<ExplorerTabId, HTMLElement> = new Map();

  // Tab 1: Reimagined Station Explorer (Thermomètre de Ligne + Curated Collections + Spotlight)
  private activeStationFilter: StationFilterId = 'hubs';
  private stationSearchQuery = '';
  private stationSearchInputEl!: HTMLInputElement;
  private stationFilterBtns: Map<StationFilterId, HTMLButtonElement> = new Map();
  private stationLineBannerEl!: HTMLElement;
  private stationListContainerEl!: HTMLElement;
  private activeStationId = STATIONS_MAP.has('chatelet')
    ? 'chatelet'
    : (ALL_STATIONS[0]?.id ?? 'chatelet');
  private currentDisplayedStations: MetroStationData[] = [];
  private stationSpotCategoryEl!: HTMLElement;
  private stationSpotYearEl!: HTMLElement;
  private stationSpotTitleEl!: HTMLElement;
  private stationSpotMetaEl!: HTMLElement;
  private stationSpotLiveTelemetryEl!: HTMLElement;
  private stationSpotLinesRowEl!: HTMLElement;
  private stationSpotDescEl!: HTMLElement;
  private stationCountBadgeEl!: HTMLElement;

  // Tab 2: Reimagined Monument Explorer (West->East Paris Skyline Silhouette + Era Cards + Spotlight)
  private activeMonumentEra: MonumentEraFilterId = 'all';
  private monumentEraBtns: Map<MonumentEraFilterId, HTMLButtonElement> = new Map();
  private skylineBarsMap: Map<string, HTMLButtonElement> = new Map();
  private monumentCardsGridEl!: HTMLElement;
  private activeMonumentId = PARIS_MONUMENTS[0]?.id ?? 'monument-eiffel';
  private currentDisplayedMonuments: ParisMonumentData[] = [];
  private monSpotEmblemWrapEl!: HTMLElement;
  private monSpotEraEl!: HTMLElement;
  private monSpotHeightEl!: HTMLElement;
  private monSpotTitleEl!: HTMLElement;
  private monSpotStyleEl!: HTMLElement;
  private monSpotDescEl!: HTMLElement;
  private monSpotLinesRowEl!: HTMLElement;

  // Tab 3: Paris Arrondissements Explorer (1er–20e Escargot Spiral Map + District History + Orbital Pan)
  private activeArrondissementFilter: ArrondissementFilterId = 'all';
  private arrondissementFilterBtns: Map<ArrondissementFilterId, HTMLButtonElement> = new Map();
  private escargotNodesMap: Map<string, SVGGElement> = new Map();
  private arrondissementListEl!: HTMLElement;
  private activeArrondissementId = PARIS_ARRONDISSEMENTS[0]?.id ?? 'arr-1';
  private currentDisplayedArrondissements: ParisArrondissementData[] = [];
  private arrSpotEraEl!: HTMLElement;
  private arrSpotFoundedEl!: HTMLElement;
  private arrSpotTitleEl!: HTMLElement;
  private arrSpotQuartiersEl!: HTMLElement;
  private arrSpotLandmarksEl!: HTMLElement;
  private arrSpotDescEl!: HTMLElement;
  private arrSpotLinesRowEl!: HTMLElement;

  // Tab 4: Paris Historical Walking Tour (French Naturalisation Edition)
  private tourStepBadgeEl!: HTMLElement;
  private tourDatePillEl!: HTMLElement;
  private tourTitleEl!: HTMLElement;
  private tourLocationBtnEl!: HTMLButtonElement;
  private tourQuestionEl!: HTMLElement;
  private tourFactEl!: HTMLElement;
  private tourAutoBtnEl!: HTMLButtonElement;
  private tourClearBtnEl!: HTMLButtonElement;
  private tourStopRowBtns: Map<string, HTMLButtonElement> = new Map();
  private activeTourStopIdx = ACTIVE_CITY_ID === 'paris' ? 4 : 0;
  private isTourPinned = false;
  private isAutoTourPlaying = false;
  private autoTourTimer = 0.0;

  // Floating Hover Dossier Card
  private dossierCardEl!: HTMLElement;
  private dossierCategoryEl!: HTMLElement;
  private dossierStatusEl!: HTMLElement;
  private dossierTitleEl!: HTMLElement;
  private dossierLinesRowEl!: HTMLElement;
  private dossierMetaGridEl!: HTMLElement;
  private dossierDescEl!: HTMLElement;

  // 3D-Anchored Special Station Interior Photo Card (floats above selected special station)
  private specialStationCardEl!: HTMLElement;
  private specialStationPhotoImgEl!: HTMLImageElement;
  private specialStationArtistBadgeEl!: HTMLElement;
  private specialStationLinesRowEl!: HTMLElement;
  private specialStationTitleEl!: HTMLElement;
  private specialStationDesignTitleEl!: HTMLElement;
  private specialStationCaptionEl!: HTMLElement;
  private anchoredSpecialStation: MetroStationData | null = null;

  private currentYear = 2026;
  private playbackYearFloat = 2026.0;
  private selectedLineId: string | null = null;
  private isPlaying = false;
  private playSpeed = 1; // 1x, 2x, 5x
  private showGhostStations = true;
  private showLightColumns = true;
  private isPaperModel = false;
  private autoTimeCycle = false;
  private monumentOrbitEnabled = true;
  private cityOrbitEnabled = false;
  private manualEiffelSparkle = false;
  private eiffelSparkleBtns: HTMLButtonElement[] = [];
  private liveWeatherEnabled = false;
  private liveMetroEnabled = false;
  private liveWeatherBtns: HTMLButtonElement[] = [];
  private liveMetroBtns: HTMLButtonElement[] = [];
  private weatherModeBtns: Map<WeatherModeId, HTMLButtonElement> = new Map();
  private liveWeatherData: ParisLiveApiResponse['weather'] | null = null;
  private liveMetroData: ParisLiveApiResponse['metro'] | null = null;
  private bokehModeIdx = 0; // 0 = f/2.8 (0.55), 1 = f/1.4 (0.95), 2 = Off (0.0)
  private currentLift = 0.0;
  private targetLift: number | null = null;
  private lastFormattedClock = '☀ 14:12';
  private lineMap: Map<string, MetroLineConfig> = new Map();

  constructor(
    container: HTMLElement,
    private readonly callbacks: HUDCallbacks
  ) {
    for (const l of METRO_LINES) {
      this.lineMap.set(l.id, l);
    }

    // Outer subtle viewport frame
    const frame = createEl('div', 'deco-viewport-frame');
    container.appendChild(frame);

    // Main HUD flex container
    const hudLayer = createEl('div', 'hud-layer');
    hudLayer.appendChild(this.buildTopBar());
    hudLayer.appendChild(this.buildMiddleArea());
    hudLayer.appendChild(this.buildBottomTimelineBar());
    container.appendChild(hudLayer);

    // 3D-Anchored Special Station Interior Photo Card (above selected special station)
    this.specialStationCardEl = this.buildSpecialStationInteriorCard();
    container.appendChild(this.specialStationCardEl);

    // Floating Hover Dossier Card
    this.dossierCardEl = this.buildHoverDossierCard();
    container.appendChild(this.dossierCardEl);
  }

  private updateSettingsSummaryText(): void {
    if (!this.settingsSummaryPillEl) return;
    const camLabels: Record<CameraPresetId, string> = {
      overground: 'Overground',
      xray: 'X-Ray',
      underground: 'Underground'
    };
    const weatherBadge =
      this.liveWeatherEnabled && this.liveWeatherData?.current.temperatureC !== null && this.liveWeatherData
        ? ` • ${this.liveWeatherData.current.temperatureC.toFixed(1)}°C ${this.liveWeatherData.current.conditionEn}`
        : '';
    this.settingsSummaryPillEl.textContent = `${this.lastFormattedClock}${weatherBadge} • ${camLabels[this.activeCameraPreset]}`;
  }

  private buildTopBar(): HTMLElement {
    const topBar = createEl('header', 'hud-top-bar');

    // Top-Right City Selector Bar (#paris, #sydney, #nyc)
    const cityBar = createEl('nav', 'deco-panel city-selector-bar hud-interactive');
    cityBar.setAttribute('aria-label', 'Select Active City');
    attachDecoCorners(cityBar);
    cityBar.appendChild(createEl('span', 'city-selector-label', 'CITY'));

    const cityPills = createEl('div', 'city-selector-pills');
    for (const city of SELECTABLE_CITIES) {
      const btn = createEl(
        'button',
        `city-selector-btn${city.id === ACTIVE_CITY_ID ? ' active' : ''}`
      );
      btn.type = 'button';
      btn.title = `Switch to ${city.label} (${city.country}) — #${city.id} • ${city.vibeBadge}`;
      btn.setAttribute('aria-pressed', city.id === ACTIVE_CITY_ID ? 'true' : 'false');
      btn.appendChild(createEl('span', 'city-selector-name', city.label));
      btn.appendChild(createEl('span', 'city-selector-code', `#${city.id}`));
      btn.addEventListener('click', () => {
        switchActiveCity(city.id);
      });
      cityPills.appendChild(btn);
    }
    cityBar.appendChild(cityPills);
    cityBar.appendChild(
      createEl('span', 'city-selector-vibe-badge', ACTIVE_CITY_META.vibeBadge)
    );
    topBar.appendChild(cityBar);

    // Top-Center Collapsible Configuration & Atmosphere Panel (shrinks until hovered over)
    const viewPanel = createEl(
      'div',
      'deco-panel view-controls-panel collapsible-settings hud-interactive'
    );
    attachDecoCorners(viewPanel);

    const summaryBar = createEl('div', 'settings-summary-header');
    const summaryLeft = createEl('div', 'settings-summary-title-group');
    summaryLeft.appendChild(createEl('span', 'settings-gear-icon', '⚙'));
    summaryLeft.appendChild(createEl('span', 'settings-summary-title', 'VIEW & SETTINGS'));

    const summaryRight = createEl('div', 'settings-summary-right-group');
    this.settingsSummaryPillEl = createEl(
      'span',
      'settings-summary-meta',
      '☀ 14:12 • Overground'
    );

    const quickLiveWeatherBtn = createEl(
      'button',
      'deco-btn settings-quick-orbit-btn live-toggle-btn',
      '🌡 Live Weather'
    );
    quickLiveWeatherBtn.title =
      'Sync 3D sky, time of day, and wet cobblestone sheen with live Paris weather (Open-Meteo via Firebase App Hosting)';
    quickLiveWeatherBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleLiveWeather();
    });
    this.liveWeatherBtns.push(quickLiveWeatherBtn);

    const quickLiveMetroBtn = createEl(
      'button',
      'deco-btn settings-quick-orbit-btn live-toggle-btn',
      '🚇 Live Metro'
    );
    quickLiveMetroBtn.title =
      'Sync 3D Metro train speeds, RATP/IDFM line QoS, and underground station air sensors (Firebase App Hosting)';
    quickLiveMetroBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleLiveMetro();
    });
    this.liveMetroBtns.push(quickLiveMetroBtn);

    this.quickCityOrbitBtn = createEl(
      'button',
      'deco-btn settings-quick-orbit-btn',
      '⟳ Orbit City'
    );
    this.quickCityOrbitBtn.title =
      `Continuously orbit the camera 360° around ${ACTIVE_CITY_META.label} (Key R)`;
    this.quickCityOrbitBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleCityOrbit();
    });

    const quickSparkleBtn = createEl(
      'button',
      'deco-btn settings-quick-orbit-btn',
      ACTIVE_CITY_META.sparkleButtonLabel
    );
    quickSparkleBtn.title =
      'Trigger the tower flashing diamond lights on demand';
    quickSparkleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleEiffelSparkle();
    });
    this.eiffelSparkleBtns.push(quickSparkleBtn);

    summaryRight.appendChild(this.settingsSummaryPillEl);
    if (ACTIVE_CITY_META.supportsLiveParisApi) {
      summaryRight.appendChild(quickLiveWeatherBtn);
      summaryRight.appendChild(quickLiveMetroBtn);
    }
    summaryRight.appendChild(this.quickCityOrbitBtn);
    summaryRight.appendChild(quickSparkleBtn);

    summaryBar.appendChild(summaryLeft);
    summaryBar.appendChild(summaryRight);
    viewPanel.appendChild(summaryBar);

    const drawerBody = createEl('div', 'settings-drawer-body');

    // Row 1: Camera Views (Overground / X-Ray / Underground + Monument Orbit toggle)
    const camRow = createEl('div', 'control-row');
    camRow.appendChild(createEl('span', 'control-label', 'CAMERA VIEW'));
    const camGroup = createEl('div', 'deco-btn-group');
    const presets: { id: CameraPresetId; label: string; title: string }[] = [
      {
        id: 'overground',
        label: 'Overground',
        title: 'Opaque Parisian surface view with skyward Metro light columns'
      },
      {
        id: 'xray',
        label: 'X-Ray',
        title: 'Translucent X-Ray city cutaway showing subterranean Metro tunnels beneath Paris (light columns disabled)'
      },
      {
        id: 'underground',
        label: 'Underground',
        title: 'Darkens the world and hides the overground completely to spotlight the subterranean Metro network'
      }
    ];
    for (const p of presets) {
      const btn = createEl('button', 'deco-btn', p.label);
      btn.title = p.title;
      if (p.id === 'overground') btn.classList.add('active');
      btn.addEventListener('click', () => {
        this.setActiveCameraPresetUI(p.id);
        this.callbacks.onCameraPreset(p.id);
      });
      this.camPresetBtns.set(p.id, btn);
      camGroup.appendChild(btn);
    }

    this.monumentOrbitBtn = createEl('button', 'deco-btn active', '⟳ Orbit Monument');
    this.monumentOrbitBtn.title =
      'Slowly orbit the camera around any selected monument (Key O)';
    this.monumentOrbitBtn.addEventListener('click', () => {
      this.toggleMonumentOrbit();
    });
    camGroup.appendChild(this.monumentOrbitBtn);

    camRow.appendChild(camGroup);
    drawerBody.appendChild(camRow);

    // Row 1b: City-Wide Camera Orbit & Zoom Controls (45° Step Left/Right, 360° City Turntable, Zoom In/Out)
    const orbitRow = createEl('div', 'control-row');
    orbitRow.appendChild(createEl('span', 'control-label', 'CITY ORBIT'));
    const orbitGroup = createEl('div', 'deco-btn-group');

    const orbitLeftBtn = createEl('button', 'deco-btn', '⟲ 45°');
    orbitLeftBtn.title = 'Orbit camera 45° counter-clockwise around the whole city ([)';
    orbitLeftBtn.addEventListener('click', () => {
      this.callbacks.onStepCityOrbit(-Math.PI / 4);
    });
    orbitGroup.appendChild(orbitLeftBtn);

    this.cityOrbitBtn = createEl('button', 'deco-btn', '⟳ Orbit City');
    this.cityOrbitBtn.title =
      'Continuously orbit the camera 360° around the entire city of Paris (Key R)';
    this.cityOrbitBtn.addEventListener('click', () => {
      this.toggleCityOrbit();
    });
    orbitGroup.appendChild(this.cityOrbitBtn);

    const orbitRightBtn = createEl('button', 'deco-btn', '45° ⟳');
    orbitRightBtn.title = 'Orbit camera 45° clockwise around the whole city (])';
    orbitRightBtn.addEventListener('click', () => {
      this.callbacks.onStepCityOrbit(Math.PI / 4);
    });
    orbitGroup.appendChild(orbitRightBtn);

    const zoomOutBtn = createEl('button', 'deco-btn', '− Zoom');
    zoomOutBtn.title = 'Zoom out for a wider panoramic view of Paris';
    zoomOutBtn.addEventListener('click', () => {
      this.callbacks.onZoomCamera(1.32);
    });
    orbitGroup.appendChild(zoomOutBtn);

    const zoomInBtn = createEl('button', 'deco-btn', '+ Zoom');
    zoomInBtn.title = 'Zoom in closer toward the current focal point';
    zoomInBtn.addEventListener('click', () => {
      this.callbacks.onZoomCamera(0.75);
    });
    orbitGroup.appendChild(zoomInBtn);

    orbitRow.appendChild(orbitGroup);
    drawerBody.appendChild(orbitRow);

    // Row 2: Overground Surface Layer Opacity, Grey Paper Model & Optical Bokeh Lens Aperture
    const xrayRow = createEl('div', 'control-row');
    xrayRow.appendChild(createEl('span', 'control-label', 'SURFACE LAYER'));

    this.opacitySlider = createEl('input', 'deco-mini-slider');
    this.opacitySlider.type = 'range';
    this.opacitySlider.min = '0.0';
    this.opacitySlider.max = '1.0';
    this.opacitySlider.step = '0.02';
    this.opacitySlider.value = '1.0';
    this.opacitySlider.title = 'Fade the surface layer (100% Overground → 14% X-Ray → 0% Underground)';
    this.opacitySlider.addEventListener('input', () => {
      const val = parseFloat(this.opacitySlider.value);
      this.callbacks.onOpacityChange(val);
    });
    xrayRow.appendChild(this.opacitySlider);

    const xrayBtnGroup = createEl('div', 'deco-btn-group');

    this.paperModelBtn = createEl('button', 'deco-btn', '◻ Grey Model');
    this.paperModelBtn.title =
      'Toggle monochrome grey paper architecture model mode so the colored Metro light halos pop across the city (Key M)';
    this.paperModelBtn.addEventListener('click', () => {
      this.togglePaperModel();
    });
    xrayBtnGroup.appendChild(this.paperModelBtn);

    this.bokehBtn = createEl('button', 'deco-btn active', '◉ Bokeh: f/2.8');
    this.bokehBtn.title =
      'Cycle optical depth-of-field aperture (Bokeh f/2.8 → f/1.4 Miniature → Off, Key B)';
    this.bokehBtn.addEventListener('click', () => {
      this.cycleBokehMode();
    });
    xrayBtnGroup.appendChild(this.bokehBtn);

    xrayRow.appendChild(xrayBtnGroup);
    drawerBody.appendChild(xrayRow);

    // Row 3: Time of Day (00:00–24:00 Solar & Lunar Orbital Slider + Auto Cycle + Quick Presets)
    const timeRow = createEl('div', 'control-row');
    timeRow.appendChild(createEl('span', 'control-label', 'TIME & SUN'));

    this.timeSlider = createEl('input', 'deco-mini-slider');
    this.timeSlider.type = 'range';
    this.timeSlider.min = '0.0';
    this.timeSlider.max = '24.0';
    this.timeSlider.step = '0.1';
    this.timeSlider.value = '14.2';
    this.timeSlider.title =
      'Adjust time of day and the path of the Sun and Moon across the Paris sky (00:00 → 24:00)';
    this.timeSlider.addEventListener('input', () => {
      const hours = parseFloat(this.timeSlider.value);
      this.syncTimeOfDayReadout(hours);
      this.callbacks.onTimeOfDayChange(hours);
    });
    timeRow.appendChild(this.timeSlider);

    const timeBtnGroup = createEl('div', 'deco-btn-group');
    this.timeClockReadoutEl = createEl('button', 'deco-btn', '☀ 14:12');
    this.timeClockReadoutEl.title =
      'Cycle between Midday Azure (14:12), Golden Dusk (19:15), Lunar Midnight (23:30) and Dawn (07:15)';
    const timePresets: { mode: AtmosphereModeId; hours: number }[] = [
      { mode: 'day', hours: 14.2 },
      { mode: 'dusk', hours: 19.25 },
      { mode: 'night', hours: 23.5 },
      { mode: 'dawn', hours: 7.25 }
    ];
    let timePresetIdx = 0;
    this.timeClockReadoutEl.addEventListener('click', () => {
      timePresetIdx = (timePresetIdx + 1) % timePresets.length;
      const preset = timePresets[timePresetIdx];
      this.syncTimeOfDayReadout(preset.hours);
      this.callbacks.onAtmosphereChange(preset.mode);
    });
    timeBtnGroup.appendChild(this.timeClockReadoutEl);

    this.timeCycleBtn = createEl('button', 'deco-btn', '⟳ 24h Cycle');
    this.timeCycleBtn.title =
      'Automatically animate the 24-hour solar and lunar cycle (Key T)';
    this.timeCycleBtn.addEventListener('click', () => {
      this.toggleAutoTimeCycle();
    });
    timeBtnGroup.appendChild(this.timeCycleBtn);

    const drawerSparkleBtn = createEl('button', 'deco-btn', '✨ Sparkle Eiffel');
    drawerSparkleBtn.title =
      'Trigger the Eiffel Tower flashing diamond lights (Scintillement de la Tour Eiffel) on demand';
    drawerSparkleBtn.addEventListener('click', () => {
      this.toggleEiffelSparkle();
    });
    this.eiffelSparkleBtns.push(drawerSparkleBtn);
    timeBtnGroup.appendChild(drawerSparkleBtn);

    timeRow.appendChild(timeBtnGroup);
    drawerBody.appendChild(timeRow);

    // Row 4: Weather Selector (Clear Blue Sky, Partly Cloudy, Parisian Rain, Seine Fog + Live Weather Toggle)
    const weatherRow = createEl('div', 'control-row');
    weatherRow.appendChild(createEl('span', 'control-label', 'WEATHER & SKY'));

    const weatherBtnGroup = createEl('div', 'deco-btn-group');
    const drawerLiveWeatherBtn = createEl(
      'button',
      'deco-btn live-toggle-btn',
      '🌡 Live Weather'
    );
    drawerLiveWeatherBtn.title =
      'Sync 3D sky, time of day, and wet cobblestone sheen with live Paris weather (Open-Meteo via Firebase App Hosting)';
    drawerLiveWeatherBtn.addEventListener('click', () => {
      this.toggleLiveWeather();
    });
    this.liveWeatherBtns.push(drawerLiveWeatherBtn);
    weatherBtnGroup.appendChild(drawerLiveWeatherBtn);

    const weatherModes: { id: WeatherModeId; label: string; title: string }[] = [
      { id: 'clear', label: '☀ Clear Sky', title: 'Bright Parisian azure sky & sunshine' },
      { id: 'cloudy', label: '⛅ Cloudy', title: 'Paris sky scattered with drifting cumulus clouds' },
      { id: 'rain', label: '🌧 Rain', title: 'Parisian rain shower & storm clouds' },
      { id: 'fog', label: '🌫 Mist', title: 'Romantic morning mist over the Seine valley' }
    ];
    for (const wm of weatherModes) {
      const btn = createEl('button', 'deco-btn', wm.label);
      btn.title = wm.title;
      if (wm.id === 'clear') btn.classList.add('active');
      btn.addEventListener('click', () => {
        if (this.liveWeatherEnabled) {
          this.setLiveWeatherState(false, null);
          this.callbacks.onToggleLiveWeather(false);
        }
        this.setActiveWeatherModeUI(wm.id);
        this.callbacks.onWeatherChange(wm.id);
      });
      this.weatherModeBtns.set(wm.id, btn);
      weatherBtnGroup.appendChild(btn);
    }
    weatherRow.appendChild(weatherBtnGroup);
    drawerBody.appendChild(weatherRow);

    // Row 5: Lift / Extract Metro Network Out of the Ground (Slider + Animated Toggle!)
    const liftRow = createEl('div', 'control-row');
    liftRow.appendChild(createEl('span', 'control-label', 'METRO LIFT'));

    this.liftSlider = createEl('input', 'deco-mini-slider');
    this.liftSlider.type = 'range';
    this.liftSlider.min = '0.0';
    this.liftSlider.max = '1.0';
    this.liftSlider.step = '0.01';
    this.liftSlider.value = '0.0';
    this.liftSlider.title =
      'Lift the Metro network out of the ground (0% underground → 100% levitating above Paris)';
    this.liftSlider.addEventListener('input', () => {
      this.targetLift = null;
      const val = parseFloat(this.liftSlider.value);
      this.setLiftValue(val);
      this.callbacks.onLiftChange(val, false);
    });
    liftRow.appendChild(this.liftSlider);

    const liftBtnGroup = createEl('div', 'deco-btn-group');
    this.liftToggleBtn = createEl('button', 'deco-btn', '▲ Lift Metro');
    this.liftToggleBtn.title =
      'Lift or lower the entire Metro network above the rooftops of Paris (Key L)';
    this.liftToggleBtn.addEventListener('click', () => {
      this.toggleLift();
    });
    liftBtnGroup.appendChild(this.liftToggleBtn);

    this.lightColumnsBtn = createEl('button', 'deco-btn active', '✦ Light Columns');
    this.lightColumnsBtn.title =
      'Show or hide the colored light curtains and columns radiating skyward along the Metro lines (Key C)';
    this.lightColumnsBtn.addEventListener('click', () => {
      this.toggleLightColumns();
    });
    liftBtnGroup.appendChild(this.lightColumnsBtn);

    liftRow.appendChild(liftBtnGroup);
    drawerBody.appendChild(liftRow);

    viewPanel.appendChild(drawerBody);
    topBar.appendChild(viewPanel);
    return topBar;
  }

  public setActiveCameraPresetUI(preset: CameraPresetId): void {
    this.activeCameraPreset = preset;
    for (const [id, btn] of this.camPresetBtns.entries()) {
      btn.classList.toggle('active', id === preset);
    }
    this.updateSettingsSummaryText();
  }

  public setLightColumnsValue(show: boolean): void {
    this.showLightColumns = show;
    this.lightColumnsBtn.classList.toggle('active', show);
  }

  private buildCityCulturalBanner(): HTMLElement {
    const banner = createEl('div', `city-cultural-banner city-banner-${ACTIVE_CITY_ID}`);
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 36 36');
    svg.setAttribute('class', 'city-cultural-emblem-svg');
    svg.setAttribute('aria-hidden', 'true');

    if (ACTIVE_CITY_ID === 'sydney') {
      // Aboriginal Concentric Ngura (Camp/Waterhole) Dot-Art Rings & Songlines
      const rings: { r: string; stroke: string; dash: string; width: string }[] = [
        { r: '15', stroke: '#00a896', dash: '0.6 4.2', width: '2.2' },
        { r: '11', stroke: '#fbf3e4', dash: '0.6 3.8', width: '2.2' },
        { r: '7', stroke: '#f6b93b', dash: '0.6 3.2', width: '2.4' },
        { r: '3.5', stroke: '#e06d3b', dash: '0.5 2.4', width: '2.2' }
      ];
      for (const ring of rings) {
        const c = document.createElementNS(ns, 'circle');
        c.setAttribute('cx', '18');
        c.setAttribute('cy', '18');
        c.setAttribute('r', ring.r);
        c.setAttribute('fill', 'none');
        c.setAttribute('stroke', ring.stroke);
        c.setAttribute('stroke-width', ring.width);
        c.setAttribute('stroke-linecap', 'round');
        c.setAttribute('stroke-dasharray', ring.dash);
        svg.appendChild(c);
      }
      const centerDot = document.createElementNS(ns, 'circle');
      centerDot.setAttribute('cx', '18');
      centerDot.setAttribute('cy', '18');
      centerDot.setAttribute('r', '1.8');
      centerDot.setAttribute('fill', '#f6b93b');
      svg.appendChild(centerDot);
    } else if (ACTIVE_CITY_ID === 'nyc') {
      // Chrysler Building Art Deco Sunburst Arches & Spire
      const rays = document.createElementNS(ns, 'path');
      rays.setAttribute(
        'd',
        'M18 33 L18 2 M18 33 L6 9 M18 33 L30 9 M18 33 L2 20 M18 33 L34 20'
      );
      rays.setAttribute('stroke', '#ffd147');
      rays.setAttribute('stroke-width', '1.5');
      rays.setAttribute('fill', 'none');
      svg.appendChild(rays);

      const archOuter = document.createElementNS(ns, 'path');
      archOuter.setAttribute('d', 'M5 33 A13 13 0 0 1 31 33');
      archOuter.setAttribute('stroke', '#48b89f');
      archOuter.setAttribute('stroke-width', '2');
      archOuter.setAttribute('fill', 'none');
      svg.appendChild(archOuter);

      const archInner = document.createElementNS(ns, 'path');
      archInner.setAttribute('d', 'M10 33 A8 8 0 0 1 26 33');
      archInner.setAttribute('stroke', '#ffd147');
      archInner.setAttribute('stroke-width', '1.8');
      archInner.setAttribute('fill', 'none');
      svg.appendChild(archInner);
    } else {
      // Paris Belle Époque Hector Guimard & Eiffel Arch Filigree
      const arch = document.createElementNS(ns, 'path');
      arch.setAttribute('d', 'M6 32 Q18 4 30 32 M10 24 L26 24 M18 4 L18 32');
      arch.setAttribute('stroke', '#e5c158');
      arch.setAttribute('stroke-width', '1.8');
      arch.setAttribute('fill', 'none');
      svg.appendChild(arch);
    }

    banner.appendChild(svg);

    const textCol = createEl('div', 'city-cultural-banner-text');
    const titleStr =
      ACTIVE_CITY_ID === 'sydney'
        ? 'GADIGAL COUNTRY • SYDNEY HARBOUR'
        : ACTIVE_CITY_ID === 'nyc'
          ? 'GOTHAM SKYSCRAPER ART DECO'
          : 'PARIS MÉTROPOLITAIN • LUMIÈRE';
    const subStr =
      ACTIVE_CITY_ID === 'sydney'
        ? 'Aboriginal Dot-Art, Red Ochre & Sandstone'
        : ACTIVE_CITY_ID === 'nyc'
          ? 'Chrysler Sunburst • Vignelli Subway Modernism'
          : 'Belle Époque Guimard & Haussmann Limestone';

    textCol.appendChild(createEl('span', 'city-cultural-banner-title', titleStr));
    textCol.appendChild(createEl('span', 'city-cultural-banner-sub', subStr));
    banner.appendChild(textCol);

    if (ACTIVE_CITY_ID === 'nyc') {
      const bullets = createEl('div', 'nyc-vignelli-bullets');
      const mtaDots: { label: string; bg: string }[] = [
        { label: '1', bg: '#ee352e' },
        { label: '4', bg: '#00933c' },
        { label: 'A', bg: '#0039a6' }
      ];
      for (const d of mtaDots) {
        const b = createEl('span', 'nyc-vignelli-bullet', d.label);
        b.style.backgroundColor = d.bg;
        bullets.appendChild(b);
      }
      banner.appendChild(bullets);
    }

    return banner;
  }

  private buildMiddleArea(): HTMLElement {
    const middle = createEl('div', 'hud-middle-area');

    // 1. Left Dock: RATP Line Medallion Selector
    const lineDock = createEl('aside', 'deco-panel line-selector-dock hud-interactive');
    attachDecoCorners(lineDock);
    lineDock.appendChild(createEl('span', 'dock-title', 'LINES'));

    const grid = createEl('div', 'line-badges-grid');
    for (const line of METRO_LINES) {
      const badge = createEl('button', 'line-badge-btn', line.shortLabel);
      badge.style.backgroundColor = line.color;
      badge.style.color = line.textColor;
      badge.title = `${line.name} (Opened in ${line.openedYear}) — Click to inspect line route`;
      badge.addEventListener('click', () => {
        if (this.selectedLineId === line.id) {
          this.selectLine(null);
        } else {
          this.selectLine(line.id);
        }
      });
      this.lineBadgeBtns.set(line.id, badge);
      grid.appendChild(badge);
    }
    lineDock.appendChild(grid);

    this.allLinesBtn = createEl('button', 'deco-btn line-all-btn active', 'All');
    this.allLinesBtn.addEventListener('click', () => this.selectLine(null));
    lineDock.appendChild(this.allLinesBtn);

    const dockLiveMetroBtn = createEl(
      'button',
      'deco-btn line-all-btn live-toggle-btn',
      '🚇 Live'
    );
    dockLiveMetroBtn.title =
      'Toggle Live RATP / IDFM Métro telemetry & underground station air sensors';
    dockLiveMetroBtn.addEventListener('click', () => {
      this.toggleLiveMetro();
    });
    this.liveMetroBtns.push(dockLiveMetroBtn);
    if (ACTIVE_CITY_META.supportsLiveParisApi) {
      lineDock.appendChild(dockLiveMetroBtn);
    }

    // 2. Right Dock: Reimagined Paris Explorer (Stations Route Diagram / Skyline Monuments / History Tour)
    this.explorerCardEl = createEl('aside', 'deco-panel paris-explorer-card hud-interactive');
    attachDecoCorners(this.explorerCardEl);

    // Cultural Motif Header Banner (Aboriginal Dot-Art for Sydney, Gotham Art Deco + Vignelli for NYC, Belle Époque for Paris)
    this.explorerCardEl.appendChild(this.buildCityCulturalBanner());

    // Top Unified Search Bar (appears above the Stations / Monuments / Arrondissements / Tour tab selector)
    const searchRow = createEl('div', 'station-search-row explorer-top-search-row');
    this.stationSearchInputEl = createEl('input', 'station-search-input');
    this.stationSearchInputEl.type = 'text';
    this.stationSearchInputEl.placeholder = ACTIVE_CITY_META.searchPlaceholder;
    this.stationSearchInputEl.addEventListener('input', () => {
      if (this.isExplorerCollapsed) {
        this.toggleExplorerCollapsed(false);
      }
      this.stationSearchQuery = this.stationSearchInputEl.value.trim().toLowerCase();
      this.renderStationExplorerList();
      this.renderMonumentsExplorerGrid();
      this.renderArrondissementsExplorerList();
      this.filterTourStopsList();
    });
    const clearSearchBtn = createEl('button', 'station-search-clear', '✕');
    clearSearchBtn.title = 'Clear search filter';
    clearSearchBtn.addEventListener('click', () => {
      this.stationSearchInputEl.value = '';
      this.stationSearchQuery = '';
      this.renderStationExplorerList();
      this.renderMonumentsExplorerGrid();
      this.renderArrondissementsExplorerList();
      this.filterTourStopsList();
    });
    searchRow.appendChild(this.stationSearchInputEl);
    searchRow.appendChild(clearSearchBtn);
    this.explorerCardEl.appendChild(searchRow);

    // Explorer Mode Switcher Header (Stations / Monuments / Arrondissements / Tour)
    const topTabHeader = createEl('div', 'explorer-tabs-header');
    const tabsGroup = createEl('div', 'explorer-tabs-group');

    const tabs: { id: ExplorerTabId; icon: string; label: string; title: string }[] = [
      {
        id: 'stations',
        icon: '🚇',
        label: 'Stations',
        title: 'Stations — Interactive Metro Line Route Diagram & Station Discovery'
      },
      {
        id: 'monuments',
        icon: '🏛',
        label: 'Monuments',
        title: `Monuments — Interactive ${ACTIVE_CITY_META.label} Skyline Silhouette & 3D Architectural Landmarks`
      },
      {
        id: 'arrondissements',
        icon: '🧭',
        label: ACTIVE_CITY_META.districtsTabLabel,
        title: `${ACTIVE_CITY_META.districtsTabLabel} — Interactive District History & Orbital Camera Pan`
      },
      {
        id: 'tour',
        icon: '📜',
        label: 'Tour',
        title: `History Tour — ${ACTIVE_CITY_META.tourHeaderTitle}`
      }
    ];

    for (const t of tabs) {
      const btn = createEl('button', 'explorer-tab-btn');
      btn.title = t.title;
      btn.appendChild(createEl('span', 'explorer-tab-icon', t.icon));
      btn.appendChild(createEl('span', 'explorer-tab-label', t.label));
      if (t.id === this.activeExplorerTab) btn.classList.add('active');
      btn.addEventListener('click', () => {
        if (this.isExplorerCollapsed) {
          this.toggleExplorerCollapsed(false);
        }
        this.switchExplorerTab(t.id);
        if (t.id === 'monuments') {
          this.selectMonumentInExplorer(this.activeMonumentId, true);
        } else if (t.id === 'arrondissements') {
          this.selectArrondissementInExplorer(this.activeArrondissementId, true);
        }
      });
      this.explorerTabBtns.set(t.id, btn);
      tabsGroup.appendChild(btn);
    }

    this.explorerCollapseBtnEl = createEl('button', 'explorer-collapse-btn', '—');
    this.explorerCollapseBtnEl.title = 'Minimise or expand the Explorer panel';
    this.explorerCollapseBtnEl.addEventListener('click', () => {
      this.toggleExplorerCollapsed(!this.isExplorerCollapsed);
    });

    topTabHeader.appendChild(tabsGroup);
    topTabHeader.appendChild(this.explorerCollapseBtnEl);
    this.explorerCardEl.appendChild(topTabHeader);

    this.explorerBodyWrapEl = createEl('div', 'explorer-body-wrap');

    const stationsPane = this.buildStationsExplorerPane();
    const monumentsPane = this.buildMonumentsExplorerPane();
    const arrondissementsPane = this.buildArrondissementsExplorerPane();
    const tourPane = this.buildTourExplorerPane();

    this.explorerPaneEls.set('stations', stationsPane);
    this.explorerPaneEls.set('monuments', monumentsPane);
    this.explorerPaneEls.set('arrondissements', arrondissementsPane);
    this.explorerPaneEls.set('tour', tourPane);

    this.explorerBodyWrapEl.appendChild(stationsPane);
    this.explorerBodyWrapEl.appendChild(monumentsPane);
    this.explorerBodyWrapEl.appendChild(arrondissementsPane);
    this.explorerBodyWrapEl.appendChild(tourPane);
    this.explorerCardEl.appendChild(this.explorerBodyWrapEl);

    this.switchExplorerTab('stations');

    middle.appendChild(lineDock);
    middle.appendChild(this.explorerCardEl);
    return middle;
  }

  private toggleExplorerCollapsed(collapsed: boolean): void {
    this.isExplorerCollapsed = collapsed;
    this.explorerCardEl.classList.toggle('collapsed', collapsed);
    this.explorerCollapseBtnEl.textContent = collapsed ? '+' : '—';
  }

  public switchExplorerTab(tabId: ExplorerTabId): void {
    this.activeExplorerTab = tabId;
    for (const [id, btn] of this.explorerTabBtns.entries()) {
      btn.classList.toggle('active', id === tabId);
    }
    for (const [id, pane] of this.explorerPaneEls.entries()) {
      pane.style.display = id === tabId ? 'flex' : 'none';
    }
  }

  /**
   * TAB 1: Reimagined Station Explorer
   * Combines a pinned Station Spotlight Card, an interactive RATP "Thermomètre de Ligne"
   * (connected route diagram when a line is selected), live search, and curated discovery decks.
   */
  private buildStationsExplorerPane(): HTMLElement {
    const pane = createEl('div', 'explorer-pane stations-explorer-pane');

    // 1. Active Station Spotlight Card (Persistent inspection + Prev/Next Station stepper)
    const spotlight = createEl('div', 'explorer-spotlight-card station-spotlight');
    const spotTopRow = createEl('div', 'spot-top-row');
    this.stationSpotCategoryEl = createEl('span', 'spot-category-tag', 'GRAND INTERCHANGE');
    this.stationSpotYearEl = createEl('span', 'spot-year-pill', 'OPENED 1900');
    spotTopRow.appendChild(this.stationSpotCategoryEl);
    spotTopRow.appendChild(this.stationSpotYearEl);
    spotlight.appendChild(spotTopRow);

    this.stationSpotTitleEl = createEl('h2', 'chronicle-title spot-title', '');
    spotlight.appendChild(this.stationSpotTitleEl);

    this.stationSpotMetaEl = createEl('div', 'spot-subtitle-meta', '');
    spotlight.appendChild(this.stationSpotMetaEl);

    this.stationSpotLiveTelemetryEl = createEl('div', 'spot-live-telemetry-banner');
    this.stationSpotLiveTelemetryEl.style.display = 'none';
    spotlight.appendChild(this.stationSpotLiveTelemetryEl);

    // Interactive Transfer Line Badges (Clicking a line badge switches to that Line's Route Diagram!)
    const transferRowWrap = createEl('div', 'spot-transfer-wrap');
    transferRowWrap.appendChild(createEl('span', 'spot-transfer-label', 'LINES'));
    this.stationSpotLinesRowEl = createEl('div', 'spot-lines-row');
    transferRowWrap.appendChild(this.stationSpotLinesRowEl);
    spotlight.appendChild(transferRowWrap);

    this.stationSpotDescEl = createEl('p', 'chronicle-body spot-desc', '');
    spotlight.appendChild(this.stationSpotDescEl);

    const spotNavRow = createEl('div', 'tour-nav-row spot-nav-row');
    const prevStBtn = createEl('button', 'deco-btn', '◀ Prev');
    prevStBtn.title = 'Fly to previous station in the current route or collection';
    prevStBtn.addEventListener('click', () => this.stepStationSelection(-1));

    const flyStBtn = createEl('button', 'deco-btn tour-focus-btn active', '📍 Fly to Station');
    flyStBtn.title = 'Fly 3D camera to this Metro station';
    flyStBtn.addEventListener('click', () => {
      this.selectStationInExplorer(this.activeStationId, true);
    });

    const nextStBtn = createEl('button', 'deco-btn', 'Next ▶');
    nextStBtn.title = 'Fly to next station in the current route or collection';
    nextStBtn.addEventListener('click', () => this.stepStationSelection(1));

    spotNavRow.appendChild(prevStBtn);
    spotNavRow.appendChild(flyStBtn);
    spotNavRow.appendChild(nextStBtn);
    spotlight.appendChild(spotNavRow);
    pane.appendChild(spotlight);

    // 2. Dynamic Line Route Banner (visible when a specific Line 1-15 is active)
    this.stationLineBannerEl = createEl('div', 'station-line-route-banner');
    this.stationLineBannerEl.style.display = 'none';
    pane.appendChild(this.stationLineBannerEl);

    // 3. Curated Collection Filters (visible when browsing across all lines)
    const searchAndFiltersBox = createEl('div', 'station-search-filters-box');
    const filterChipsRow = createEl('div', 'explorer-filter-chips');
    const filters: { id: StationFilterId; label: string; title: string }[] = [
      {
        id: 'specialInteriors',
        label: '✨ Special Designs',
        title:
          'Unique Cultural & Architectural Station Interiors'
      },
      { id: 'hubs', label: '★ Grand Hubs', title: 'Major multi-line subterranean interchanges' },
      { id: 'grandesLignes', label: '🚂 Rail Termini', title: 'Historic Mainline Railway Termini & Corridors' },
      { id: 'ghosts', label: '👻 Phantom Stations', title: 'Abandoned or closed Phantom Stations' },
      { id: 'viaducts', label: '🌉 Sky Viaducts', title: 'Elevated iron viaduct and bridge stations' },
      { id: 'originals1900', label: '🏛 Early Originals', title: 'Inaugural early transit stations' },
      { id: 'all', label: `All (${ALL_STATIONS.length})`, title: `Browse all ${ALL_STATIONS.length} stations alphabetically` }
    ];
    for (const f of filters) {
      const chip = createEl('button', 'filter-chip-btn', f.label);
      chip.title = f.title;
      if (f.id === this.activeStationFilter) chip.classList.add('active');
      chip.addEventListener('click', () => {
        this.activeStationFilter = f.id;
        for (const [id, b] of this.stationFilterBtns.entries()) {
          b.classList.toggle('active', id === f.id);
        }
        if (this.selectedLineId !== null) {
          this.selectLine(null);
        } else {
          this.renderStationExplorerList();
        }
        if (f.id === 'specialInteriors' && ACTIVE_CITY_ID === 'paris') {
          const curSt = STATIONS_MAP.get(this.activeStationId);
          const targetId = curSt?.specialInterior ? curSt.id : 'concorde';
          this.selectStationInExplorer(targetId, true);
        } else if (f.id === 'grandesLignes' && !STATION_GRANDE_LIGNE_MAP.has(this.activeStationId)) {
          const firstTerminusSt = PARIS_GRANDES_LIGNES[0]?.metroStationId ?? this.activeStationId;
          this.selectStationInExplorer(firstTerminusSt, false);
        }
      });
      this.stationFilterBtns.set(f.id, chip);
      filterChipsRow.appendChild(chip);
    }
    searchAndFiltersBox.appendChild(filterChipsRow);
    pane.appendChild(searchAndFiltersBox);

    // 4. List Header + Count
    const listHeaderRow = createEl('div', 'explorer-list-header-row');
    this.stationCountBadgeEl = createEl('span', 'tour-list-header', 'CURATED STATIONS');
    listHeaderRow.appendChild(this.stationCountBadgeEl);
    pane.appendChild(listHeaderRow);

    // 5. Scrollable Route Diagram / Station Cards Container
    this.stationListContainerEl = createEl('div', 'station-explorer-list');
    pane.appendChild(this.stationListContainerEl);

    this.selectStationInExplorer(this.activeStationId, false);
    this.renderStationExplorerList();
    return pane;
  }

  private getOrderedStationsForLine(line: MetroLineConfig): MetroStationData[] {
    const seen = new Set<string>();
    const ordered: MetroStationData[] = [];
    for (const seg of line.segments) {
      for (const stId of seg.stations) {
        if (!seen.has(stId)) {
          seen.add(stId);
          const st = STATIONS_MAP.get(stId);
          if (st) ordered.push(st);
        }
      }
    }
    return ordered;
  }

  private renderStationExplorerList(): void {
    this.stationListContainerEl.replaceChildren();
    const activeLine = this.selectedLineId ? this.lineMap.get(this.selectedLineId) ?? null : null;

    if (activeLine) {
      // Show the RATP Line Route Header Banner ("Thermomètre de Ligne")
      this.stationLineBannerEl.style.display = 'flex';
      this.stationLineBannerEl.replaceChildren();

      const badge = createEl('span', 'route-banner-badge', activeLine.shortLabel);
      badge.style.backgroundColor = activeLine.color;
      badge.style.color = activeLine.textColor;

      const textCol = createEl('div', 'route-banner-text');
      textCol.appendChild(createEl('span', 'route-banner-title', activeLine.name));
      const liveLineState = this.liveMetroEnabled
        ? this.liveMetroData?.linesById[activeLine.id]
        : undefined;
      const bannerSubText = liveLineState
        ? `🟢 ${liveLineState.trafficLabelEn} • ${liveLineState.serviceQualityPercent.toFixed(1)}% QoS • Opened ${activeLine.openedYear}`
        : `${activeLine.historicCompany} • Opened ${activeLine.openedYear}`;
      textCol.appendChild(createEl('span', 'route-banner-sub', bannerSubText));

      const exitLineBtn = createEl('button', 'deco-btn route-banner-close', 'All Lines');
      exitLineBtn.title = 'Return to all Metro lines';
      exitLineBtn.addEventListener('click', () => this.selectLine(null));

      this.stationLineBannerEl.appendChild(badge);
      this.stationLineBannerEl.appendChild(textCol);
      this.stationLineBannerEl.appendChild(exitLineBtn);

      let stations = this.getOrderedStationsForLine(activeLine);
      if (this.stationSearchQuery) {
        stations = stations.filter((s) => {
          const gare = STATION_GRANDE_LIGNE_MAP.get(s.id);
          return (
            s.name.toLowerCase().includes(this.stationSearchQuery) ||
            s.arrondissement.toLowerCase().includes(this.stationSearchQuery) ||
            (s.landmark && s.landmark.toLowerCase().includes(this.stationSearchQuery)) ||
            (s.specialInterior &&
              (s.specialInterior.designTitle.toLowerCase().includes(this.stationSearchQuery) ||
                s.specialInterior.interiorCaption.toLowerCase().includes(this.stationSearchQuery))) ||
            (gare &&
              (gare.name.toLowerCase().includes(this.stationSearchQuery) ||
                gare.destinationLabel.toLowerCase().includes(this.stationSearchQuery) ||
                gare.historicCompany.toLowerCase().includes(this.stationSearchQuery) ||
                gare.modernNetwork.toLowerCase().includes(this.stationSearchQuery)))
          );
        });
      }
      this.currentDisplayedStations = stations;
      this.stationCountBadgeEl.textContent = `LINE ${activeLine.shortLabel} ROUTE DIAGRAM (${stations.length} STOPS)`;

      // Render Connected Vertical "Thermomètre de Ligne" Track Spine
      const diagramWrap = createEl('div', 'thermometre-diagram');
      diagramWrap.style.setProperty('--line-color', activeLine.color);

      stations.forEach((st) => {
        const stopRow = createEl('button', 'thermometre-stop-row');
        if (st.id === this.activeStationId) stopRow.classList.add('active');
        if (st.isGhostStation) stopRow.classList.add('ghost');

        const nodeCol = createEl('div', 'thermometre-node-col');
        const dot = createEl('span', 'thermometre-dot');
        if (st.lines.length >= 2) dot.classList.add('transfer-hub');
        if (st.isGhostStation) dot.classList.add('ghost-dot');
        nodeCol.appendChild(dot);
        stopRow.appendChild(nodeCol);

        const infoCol = createEl('div', 'thermometre-info-col');
        const titleLine = createEl('div', 'thermometre-title-line');
        titleLine.appendChild(createEl('span', 'thermometre-st-name', st.name));

        const badgesWrap = createEl('div', 'thermometre-transfer-chips');
        if (st.specialInterior) {
          const spMini = createEl('span', 'mini-line-dot special-interior-dot', '✨');
          spMini.title = `Special Interior: ${st.specialInterior.designTitle}`;
          badgesWrap.appendChild(spMini);
        }
        const gare = STATION_GRANDE_LIGNE_MAP.get(st.id);
        if (gare) {
          const glMini = createEl('span', 'mini-line-dot', '🚂');
          glMini.style.backgroundColor = gare.colorHex;
          glMini.style.color = '#120f1d';
          glMini.title = `${gare.name} — ${gare.destinationLabel}`;
          badgesWrap.appendChild(glMini);
        }
        for (const lId of st.lines) {
          if (lId === activeLine.id) continue;
          const lCfg = this.lineMap.get(lId);
          if (!lCfg) continue;
          const mini = createEl('span', 'mini-line-dot', lCfg.shortLabel);
          mini.style.backgroundColor = lCfg.color;
          mini.style.color = lCfg.textColor;
          mini.title = `Transfer to ${lCfg.name}`;
          badgesWrap.appendChild(mini);
        }
        titleLine.appendChild(badgesWrap);
        infoCol.appendChild(titleLine);

        const subMeta = createEl(
          'span',
          'thermometre-st-meta',
          `${st.openedYear}${st.closedYear ? `–${st.closedYear} (Phantom)` : ''}${st.specialInterior ? ` • ✨ ${st.specialInterior.designTitle}` : ''}${gare ? ` • 🚂 ${gare.shortName}` : ''}${st.elevated ? ' • 🌉 Elevated Viaduct' : ''} • ${st.arrondissement}`
        );
        infoCol.appendChild(subMeta);

        stopRow.appendChild(infoCol);
        stopRow.addEventListener('click', () => {
          this.selectStationInExplorer(st.id, true);
        });
        diagramWrap.appendChild(stopRow);
      });

      this.stationListContainerEl.appendChild(diagramWrap);
      return;
    }

    // No single line forced: hide line banner and show Curated Collection Cards
    this.stationLineBannerEl.style.display = 'none';

    let filtered = [...ALL_STATIONS];
    if (this.stationSearchQuery) {
      // When searching via the unified top search bar, search across all 110 stations + Special Interiors + Grandes Lignes metadata
      filtered = filtered
        .filter((s) => {
          const gare = STATION_GRANDE_LIGNE_MAP.get(s.id);
          return (
            s.name.toLowerCase().includes(this.stationSearchQuery) ||
            s.arrondissement.toLowerCase().includes(this.stationSearchQuery) ||
            s.architecture.toLowerCase().includes(this.stationSearchQuery) ||
            (s.landmark && s.landmark.toLowerCase().includes(this.stationSearchQuery)) ||
            (s.specialInterior &&
              (s.specialInterior.designTitle.toLowerCase().includes(this.stationSearchQuery) ||
                s.specialInterior.artistOrYear.toLowerCase().includes(this.stationSearchQuery) ||
                s.specialInterior.interiorCaption.toLowerCase().includes(this.stationSearchQuery) ||
                'special interior design'.includes(this.stationSearchQuery))) ||
            (gare &&
              (gare.name.toLowerCase().includes(this.stationSearchQuery) ||
                gare.destinationLabel.toLowerCase().includes(this.stationSearchQuery) ||
                gare.historicCompany.toLowerCase().includes(this.stationSearchQuery) ||
                gare.modernNetwork.toLowerCase().includes(this.stationSearchQuery) ||
                'grandes lignes'.includes(this.stationSearchQuery)))
          );
        })
        .sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.activeStationFilter === 'specialInteriors') {
      filtered = SPECIAL_STATION_ORDER.map((id) => STATIONS_MAP.get(id)).filter(
        (s): s is MetroStationData => Boolean(s)
      );
    } else if (this.activeStationFilter === 'grandesLignes') {
      filtered = PARIS_GRANDES_LIGNES.map((g) => STATIONS_MAP.get(g.metroStationId)).filter(
        (s): s is MetroStationData => Boolean(s)
      );
    } else if (this.activeStationFilter === 'hubs') {
      filtered = filtered
        .filter((s) => s.lines.length >= 3)
        .sort((a, b) => b.lines.length - a.lines.length || a.name.localeCompare(b.name));
    } else if (this.activeStationFilter === 'ghosts') {
      filtered = filtered.filter((s) => s.isGhostStation);
    } else if (this.activeStationFilter === 'viaducts') {
      filtered = filtered.filter((s) => s.elevated);
    } else if (this.activeStationFilter === 'originals1900') {
      filtered = filtered.filter((s) => s.openedYear === 1900);
    } else {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    this.currentDisplayedStations = filtered;
    const filterTitles: Record<StationFilterId, string> = {
      specialInteriors: '✨ SPECIAL INTERIOR DESIGN STATIONS',
      hubs: 'GRAND INTERCHANGE HUBS',
      grandesLignes: 'LES GRANDES LIGNES & GRANDES GARES',
      ghosts: 'CLOSED PHANTOM STATIONS (STATIONS FANTÔMES)',
      viaducts: 'ELEVATED SKY VIADUCT STATIONS',
      originals1900: 'INAUGURAL 1900 BELLE ÉPOQUE STATIONS',
      all: 'ALL PARIS METRO STATIONS'
    };
    this.stationCountBadgeEl.textContent = this.stationSearchQuery
      ? `SEARCH RESULTS (${filtered.length})`
      : `${filterTitles[this.activeStationFilter]} (${filtered.length})`;

    const isGrandesLignesFilter = this.activeStationFilter === 'grandesLignes' && !this.stationSearchQuery;
    const isSpecialFilter = this.activeStationFilter === 'specialInteriors' && !this.stationSearchQuery;

    for (const st of filtered) {
      const gare = STATION_GRANDE_LIGNE_MAP.get(st.id);
      const cardBtn = createEl('button', 'station-explorer-card');
      if (st.id === this.activeStationId) cardBtn.classList.add('active');
      if (st.isGhostStation) cardBtn.classList.add('ghost');

      const topLine = createEl('div', 'station-card-top');
      const cardTitle = isGrandesLignesFilter && gare ? gare.name : st.name;
      topLine.appendChild(createEl('span', 'station-card-name', cardTitle));

      const yearLabel =
        isGrandesLignesFilter && gare
          ? gare.trainEndYear < 2026
            ? `Gare ${gare.openedYear}–${gare.trainEndYear}`
            : `Gare ${gare.openedYear} • M ${st.openedYear}`
          : st.closedYear
            ? `${st.openedYear}–${st.closedYear}`
            : String(st.openedYear);
      const yearTag = createEl('span', 'station-card-year', yearLabel);
      topLine.appendChild(yearTag);
      cardBtn.appendChild(topLine);

      const bottomLine = createEl('div', 'station-card-bottom');
      const chipsRow = createEl('div', 'station-card-chips');
      if (st.specialInterior) {
        const spChip = createEl('span', 'mini-line-dot special-interior-dot', '✨');
        spChip.title = `Special Interior: ${st.specialInterior.designTitle}`;
        chipsRow.appendChild(spChip);
      }
      if (gare) {
        const glChip = createEl('span', 'mini-line-dot', '🚂');
        glChip.style.backgroundColor = gare.colorHex;
        glChip.style.color = '#120f1d';
        glChip.title = `${gare.name} — ${gare.destinationLabel}`;
        chipsRow.appendChild(glChip);
      }
      for (const lId of st.lines) {
        const lCfg = this.lineMap.get(lId);
        if (!lCfg) continue;
        const chip = createEl('span', 'mini-line-dot', lCfg.shortLabel);
        chip.style.backgroundColor = lCfg.color;
        chip.style.color = lCfg.textColor;
        chipsRow.appendChild(chip);
      }
      bottomLine.appendChild(chipsRow);

      const badgeText =
        isSpecialFilter && st.specialInterior
          ? `✨ ${st.specialInterior.designTitle}`
          : isGrandesLignesFilter && gare
            ? gare.destinationLabel
            : st.isGhostStation
              ? '👻 Phantom'
              : gare
                ? `🚂 ${gare.shortName}`
                : st.specialInterior
                  ? '✨ Special Interior'
                  : st.elevated
                    ? '🌉 Viaduct'
                    : st.arrondissement;
      bottomLine.appendChild(createEl('span', 'station-card-district', badgeText));
      cardBtn.appendChild(bottomLine);

      cardBtn.addEventListener('click', () => {
        this.selectStationInExplorer(st.id, true);
      });
      this.stationListContainerEl.appendChild(cardBtn);
    }
  }

  public selectStationInExplorer(stationId: string, flyToStation: boolean): void {
    const st = STATIONS_MAP.get(stationId);
    if (!st) return;
    this.activeStationId = st.id;
    const gare = STATION_GRANDE_LIGNE_MAP.get(st.id);
    const isGrandesLignesMode = this.activeStationFilter === 'grandesLignes';

    this.stationSpotCategoryEl.textContent = gare && isGrandesLignesMode
      ? '🚂 GRANDES LIGNES TERMINUS & METRO HUB'
      : st.specialInterior
        ? '✨ SPECIAL INTERIOR DESIGN STATION'
        : gare
          ? '🚂 GRANDES LIGNES TERMINUS & METRO HUB'
          : st.isGhostStation
            ? '👻 HISTORIC PHANTOM STATION'
            : st.elevated
              ? '🌉 ELEVATED VIADUCT STATION'
              : st.lines.length >= 3
                ? '★ GRAND INTERCHANGE HUB'
                : 'METRO STATION';

    this.stationSpotYearEl.textContent =
      isGrandesLignesMode && gare
        ? gare.trainEndYear < 2026
          ? `TRAINS ${gare.openedYear}–${gare.trainEndYear}`
          : `GARE ${gare.openedYear} • METRO ${st.openedYear}`
        : st.closedYear
          ? `CLOSED ${st.closedYear}`
          : `OPENED ${st.openedYear}`;
    this.stationSpotYearEl.classList.toggle('ghost', Boolean(st.isGhostStation));

    this.stationSpotTitleEl.textContent = isGrandesLignesMode && gare ? gare.name : st.name;
    this.stationSpotMetaEl.textContent =
      isGrandesLignesMode && gare
        ? `${gare.arrondissement} • ${gare.historicCompany} • ${gare.modernNetwork}`
        : st.specialInterior
          ? `${st.arrondissement} • ✨ ${st.specialInterior.designTitle}`
          : gare
            ? `${st.arrondissement} • 🚂 ${gare.destinationLabel}`
            : `${st.arrondissement} • ${st.architecture}`;

    if (this.stationSpotLiveTelemetryEl) {
      this.stationSpotLiveTelemetryEl.replaceChildren();
      if (this.liveMetroEnabled && this.liveMetroData && !st.isGhostStation) {
        const liveLines = st.lines
          .map((lId) => this.liveMetroData?.linesById[lId])
          .filter((item): item is NonNullable<typeof item> => Boolean(item));
        const avgQos =
          liveLines.length > 0
            ? liveLines.reduce((acc, l) => acc + l.serviceQualityPercent, 0) / liveLines.length
            : 100;
        const primaryStatus = liveLines[0]?.trafficLabelEn ?? 'Normal service';

        const statusRow = createEl(
          'div',
          'spot-live-status-row',
          `🟢 LIVE RATP: ${primaryStatus} • ${avgQos.toFixed(1)}% Punctuality QoS`
        );
        this.stationSpotLiveTelemetryEl.appendChild(statusRow);

        const sensor = this.liveMetroData.stationsById[st.id];
        if (sensor) {
          const parts: string[] = [];
          if (sensor.temperatureC !== null) parts.push(`🌡 ${sensor.temperatureC.toFixed(1)}°C platform`);
          if (sensor.humidityPercent !== null) parts.push(`💧 ${Math.round(sensor.humidityPercent)}% RH`);
          if (sensor.co2Ppm !== null) parts.push(`CO₂ ${Math.round(sensor.co2Ppm)} ppm`);
          if (sensor.pm10UgM3 !== null) parts.push(`PM₁₀ ${Math.round(sensor.pm10UgM3)} µg/m³`);
          if (parts.length > 0) {
            const sensorRow = createEl(
              'div',
              'spot-live-sensor-row',
              `SQUALES Sensor (${sensor.sensorLine}): ${parts.join(' • ')}`
            );
            this.stationSpotLiveTelemetryEl.appendChild(sensorRow);
          }
        }
        this.stationSpotLiveTelemetryEl.style.display = 'flex';
      } else {
        this.stationSpotLiveTelemetryEl.style.display = 'none';
      }
    }

    this.stationSpotDescEl.textContent =
      isGrandesLignesMode && gare
        ? gare.description
        : st.specialInterior
          ? st.specialInterior.interiorCaption
          : st.description;

    // Populate interactive transfer line medallions (click to switch to that line's route strip!)
    this.stationSpotLinesRowEl.replaceChildren();
    if (st.specialInterior) {
      const spBtn = createEl('button', 'spot-line-badge-btn special-interior-pill-btn', '✨ Photo');
      spBtn.title = `${st.specialInterior.designTitle} — Click to show interior photo card above station`;
      spBtn.addEventListener('click', () => {
        this.selectStationInExplorer(st.id, true);
      });
      this.stationSpotLinesRowEl.appendChild(spBtn);
    }
    if (gare) {
      const glBtn = createEl('button', 'spot-line-badge-btn', `🚂 ${gare.shortName}`);
      glBtn.style.backgroundColor = gare.colorHex;
      glBtn.style.color = '#120f1d';
      glBtn.style.width = 'auto';
      glBtn.style.padding = '0 7px';
      glBtn.style.borderRadius = '999px';
      glBtn.title = `${gare.name}: ${gare.destinationLabel} (Click to filter Grandes Lignes)`;
      glBtn.addEventListener('click', () => {
        this.activeStationFilter = 'grandesLignes';
        for (const [id, b] of this.stationFilterBtns.entries()) {
          b.classList.toggle('active', id === 'grandesLignes');
        }
        if (this.selectedLineId !== null) {
          this.selectLine(null);
        } else {
          this.selectStationInExplorer(st.id, false);
        }
      });
      this.stationSpotLinesRowEl.appendChild(glBtn);
    }
    for (const lineId of st.lines) {
      const lineCfg = this.lineMap.get(lineId);
      if (!lineCfg) continue;
      const btn = createEl('button', 'spot-line-badge-btn', lineCfg.shortLabel);
      btn.style.backgroundColor = lineCfg.color;
      btn.style.color = lineCfg.textColor;
      btn.classList.toggle('selected', this.selectedLineId === lineId);
      btn.title = `Inspect ${lineCfg.name} route diagram`;
      btn.addEventListener('click', () => {
        if (this.selectedLineId === lineId) {
          this.selectLine(null);
        } else {
          this.selectLine(lineId);
        }
      });
      this.stationSpotLinesRowEl.appendChild(btn);
    }

    this.renderStationExplorerList();

    if (flyToStation) {
      if (st.specialInterior) {
        this.showSpecialStationInteriorCard(st);
      } else {
        this.hideSpecialStationInteriorCard();
      }
      const activeEl = this.stationListContainerEl.querySelector('.active');
      if (activeEl instanceof HTMLElement) {
        activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
      this.callbacks.onFocusTarget('station', st.id);
    }
  }

  private stepStationSelection(delta: number): void {
    const list = this.currentDisplayedStations.length ? this.currentDisplayedStations : ALL_STATIONS;
    const curIdx = list.findIndex((s) => s.id === this.activeStationId);
    const nextIdx =
      curIdx >= 0 ? (curIdx + delta + list.length) % list.length : 0;
    this.selectStationInExplorer(list[nextIdx].id, true);
  }

  /**
   * TAB 2: Reimagined Monument Explorer
   * Features an interactive West->East Paris Skyline Elevation Profile, bespoke SVG architectural
   * emblems, era filters, connected Metro line chips, and guided monument flight.
   */
  private buildMonumentsExplorerPane(): HTMLElement {
    const pane = createEl('div', 'explorer-pane monuments-explorer-pane');

    // 1. Interactive West -> East Skyline Elevation Silhouette
    const skylineBox = createEl('div', 'skyline-silhouette-box');
    skylineBox.appendChild(createSkylineDefsSvg());
    const skylineHeader = createEl('div', 'skyline-header-row');
    skylineHeader.appendChild(
      createEl('span', 'skyline-title', ACTIVE_CITY_META.skylineHeaderTitle)
    );
    skylineHeader.appendChild(createEl('span', 'skyline-subtitle', 'Click silhouette to fly'));
    skylineBox.appendChild(skylineHeader);

    const skylineChart = createEl('div', 'skyline-bars-chart');
    // Sort monuments geographically from West (lowest X / Lon) to East (highest X / Lon)
    const westToEastMonuments = [...PARIS_MONUMENTS].sort((a, b) => a.x - b.x);
    for (const m of westToEastMonuments) {
      const meta = MONUMENT_METADATA[m.id] ?? {
        heightMeters: 45,
        era: 'empire1900',
        eraLabel: String(m.builtYear),
        connectedLines: ['1'],
        svgPaths: ['M4 20 L12 4 L20 20 Z'],
        silhouettePath: 'M4 48 L16 2 L28 48 Z'
      };
      const barBtn = createEl('button', 'skyline-spire-btn');
      if (m.id === this.activeMonumentId) barBtn.classList.add('active');
      const shortName = m.name.split('(')[0].replace('Place de la ', '').trim();
      barBtn.title = `${shortName} (${meta.heightMeters}m • ${m.builtYear})`;

      // Nonlinear height scale so 35m..330m monuments all have legible, dramatic 2D silhouettes
      const pctHeight = Math.round(
        34 + Math.pow(Math.max(0, meta.heightMeters - 30) / 300, 0.52) * 64
      );
      const spireWrap = createEl('span', 'skyline-spire-column');
      spireWrap.style.height = `${pctHeight}%`;
      spireWrap.appendChild(createSkylineSilhouetteSvg(meta.silhouettePath));

      const heightLabel = createEl('span', 'skyline-spire-height', `${meta.heightMeters}m`);
      barBtn.appendChild(heightLabel);
      barBtn.appendChild(spireWrap);

      barBtn.addEventListener('click', () => {
        this.selectMonumentInExplorer(m.id, true);
      });
      this.skylineBarsMap.set(m.id, barBtn);
      skylineChart.appendChild(barBtn);
    }
    skylineBox.appendChild(skylineChart);
    pane.appendChild(skylineBox);

    // 2. Active Monument Architectural Spotlight Card
    const spotlight = createEl('div', 'explorer-spotlight-card monument-spotlight');
    const spotHeader = createEl('div', 'monument-spot-header');

    this.monSpotEmblemWrapEl = createEl('div', 'monument-spot-emblem');
    spotHeader.appendChild(this.monSpotEmblemWrapEl);

    const spotTitleCol = createEl('div', 'monument-spot-title-col');
    const badgesRow = createEl('div', 'spot-top-row');
    this.monSpotEraEl = createEl('span', 'spot-category-tag', '1889 WORLD’S FAIR');
    this.monSpotHeightEl = createEl('span', 'spot-year-pill', '330m • 1889');
    badgesRow.appendChild(this.monSpotEraEl);
    badgesRow.appendChild(this.monSpotHeightEl);
    spotTitleCol.appendChild(badgesRow);

    this.monSpotTitleEl = createEl('h2', 'chronicle-title spot-title', '');
    spotTitleCol.appendChild(this.monSpotTitleEl);

    this.monSpotStyleEl = createEl('div', 'spot-subtitle-meta', '');
    spotTitleCol.appendChild(this.monSpotStyleEl);

    spotHeader.appendChild(spotTitleCol);
    spotlight.appendChild(spotHeader);

    this.monSpotDescEl = createEl('p', 'chronicle-body spot-desc', '');
    spotlight.appendChild(this.monSpotDescEl);

    // Connected Metro Lines Row
    const connWrap = createEl('div', 'spot-transfer-wrap');
    connWrap.appendChild(createEl('span', 'spot-transfer-label', 'METRO ACCESS'));
    this.monSpotLinesRowEl = createEl('div', 'spot-lines-row');
    connWrap.appendChild(this.monSpotLinesRowEl);
    spotlight.appendChild(connWrap);

    const navRow = createEl('div', 'tour-nav-row spot-nav-row');
    const prevMonBtn = createEl('button', 'deco-btn', '◀ Prev');
    prevMonBtn.addEventListener('click', () => this.stepMonumentSelection(-1));

    const flyMonBtn = createEl('button', 'deco-btn tour-focus-btn active', '📍 Fly to Monument');
    flyMonBtn.addEventListener('click', () => {
      this.selectMonumentInExplorer(this.activeMonumentId, true);
    });

    const nextMonBtn = createEl('button', 'deco-btn', 'Next ▶');
    nextMonBtn.addEventListener('click', () => this.stepMonumentSelection(1));

    navRow.appendChild(prevMonBtn);
    navRow.appendChild(flyMonBtn);
    navRow.appendChild(nextMonBtn);
    spotlight.appendChild(navRow);
    pane.appendChild(spotlight);

    // 3. Era Filter Chips
    const eraRow = createEl('div', 'explorer-filter-chips');
    const eras: { id: MonumentEraFilterId; label: string }[] = [
      { id: 'all', label: `All (${PARIS_MONUMENTS.length})` },
      { id: 'medieval', label: '⚜ Heritage & Stone' },
      { id: 'empire1900', label: '🦅 1900 & Art Deco' },
      { id: 'gares', label: '🚂 Rail Termini' },
      { id: 'modern', label: '🗼 Modern Icons' }
    ];
    for (const e of eras) {
      const btn = createEl('button', 'filter-chip-btn', e.label);
      if (e.id === this.activeMonumentEra) btn.classList.add('active');
      btn.addEventListener('click', () => {
        this.activeMonumentEra = e.id;
        for (const [id, b] of this.monumentEraBtns.entries()) {
          b.classList.toggle('active', id === e.id);
        }
        this.renderMonumentsExplorerGrid();
      });
      this.monumentEraBtns.set(e.id, btn);
      eraRow.appendChild(btn);
    }
    pane.appendChild(eraRow);

    // 4. Visual Architectural Cards Grid
    this.monumentCardsGridEl = createEl('div', 'monument-cards-grid');
    pane.appendChild(this.monumentCardsGridEl);

    this.selectMonumentInExplorer(this.activeMonumentId, false);
    this.renderMonumentsExplorerGrid();
    return pane;
  }

  private renderMonumentsExplorerGrid(): void {
    this.monumentCardsGridEl.replaceChildren();
    const filtered = PARIS_MONUMENTS.filter((m) => {
      if (this.stationSearchQuery) {
        return (
          m.name.toLowerCase().includes(this.stationSearchQuery) ||
          m.arrondissement.toLowerCase().includes(this.stationSearchQuery) ||
          m.style.toLowerCase().includes(this.stationSearchQuery) ||
          m.description.toLowerCase().includes(this.stationSearchQuery)
        );
      }
      if (this.activeMonumentEra === 'all') return true;
      const meta = MONUMENT_METADATA[m.id];
      return meta?.era === this.activeMonumentEra;
    });
    this.currentDisplayedMonuments = filtered;

    for (const m of filtered) {
      const meta = MONUMENT_METADATA[m.id] ?? {
        heightMeters: 45,
        era: 'empire1900',
        eraLabel: String(m.builtYear),
        connectedLines: ['1'],
        svgPaths: ['M4 20 L12 4 L20 20 Z'],
        silhouettePath: 'M4 48 L16 2 L28 48 Z'
      };
      const card = createEl('button', 'monument-gallery-card');
      if (m.id === this.activeMonumentId) card.classList.add('active');

      const iconWrap = createEl('div', 'monument-card-icon');
      iconWrap.appendChild(createSvgEmblem(meta.svgPaths));
      card.appendChild(iconWrap);

      const infoCol = createEl('div', 'monument-card-info');
      const shortName = m.name.split('(')[0].trim();
      infoCol.appendChild(createEl('span', 'monument-card-title', shortName));
      infoCol.appendChild(
        createEl(
          'span',
          'monument-card-meta',
          `${m.builtYear} • ${meta.heightMeters}m • ${m.arrondissement}`
        )
      );
      card.appendChild(infoCol);

      card.addEventListener('click', () => {
        this.selectMonumentInExplorer(m.id, true);
      });
      this.monumentCardsGridEl.appendChild(card);
    }
  }

  public selectMonumentInExplorer(monumentId: string, flyToMonument: boolean): void {
    const m = PARIS_MONUMENTS.find((item) => item.id === monumentId);
    if (!m) return;
    this.activeMonumentId = m.id;
    const meta = MONUMENT_METADATA[m.id] ?? {
      heightMeters: 45,
      era: 'empire1900',
      eraLabel: String(m.builtYear),
      connectedLines: ['1'],
      svgPaths: ['M4 20 L12 4 L20 20 Z'],
      silhouettePath: 'M4 48 L16 2 L28 48 Z'
    };

    this.monSpotEmblemWrapEl.replaceChildren(createSvgEmblem(meta.svgPaths, 'monument-spot-svg'));
    this.monSpotEraEl.textContent = meta.eraLabel.toUpperCase();
    this.monSpotHeightEl.textContent = `${meta.heightMeters}M • ${m.builtYear}`;
    this.monSpotTitleEl.textContent = m.name.split('(')[0].trim();
    this.monSpotStyleEl.textContent = `${m.arrondissement} • ${m.style}`;
    this.monSpotDescEl.textContent = m.description;

    this.monSpotLinesRowEl.replaceChildren();
    if (m.id === ACTIVE_CITY_META.beaconMonumentId) {
      const sparkleChip = createEl(
        'button',
        `spot-line-badge-btn${this.manualEiffelSparkle ? ' selected' : ''}`,
        '✨ Sparkle'
      );
      sparkleChip.style.backgroundColor = this.manualEiffelSparkle ? '#ffe28a' : '#2d2416';
      sparkleChip.style.color = this.manualEiffelSparkle ? '#120f1d' : '#ffd875';
      sparkleChip.style.width = 'auto';
      sparkleChip.style.padding = '0 8px';
      sparkleChip.style.borderRadius = '999px';
      sparkleChip.style.border = '1px solid rgba(255, 216, 117, 0.55)';
      sparkleChip.title = 'Trigger the tower flashing diamond lights on demand';
      sparkleChip.addEventListener('click', () => {
        this.toggleEiffelSparkle();
      });
      this.monSpotLinesRowEl.appendChild(sparkleChip);
    }
    for (const lineId of meta.connectedLines) {
      const lineCfg = this.lineMap.get(lineId);
      if (!lineCfg) continue;
      const chip = createEl('button', 'spot-line-badge-btn', lineCfg.shortLabel);
      chip.style.backgroundColor = lineCfg.color;
      chip.style.color = lineCfg.textColor;
      chip.title = `Highlight ${lineCfg.name} on the map`;
      chip.addEventListener('click', () => {
        this.selectLine(this.selectedLineId === lineId ? null : lineId);
      });
      this.monSpotLinesRowEl.appendChild(chip);
    }

    for (const [id, bar] of this.skylineBarsMap.entries()) {
      bar.classList.toggle('active', id === m.id);
    }
    this.renderMonumentsExplorerGrid();

    if (flyToMonument) {
      this.hideSpecialStationInteriorCard();
      const activeEl = this.monumentCardsGridEl.querySelector('.active');
      if (activeEl instanceof HTMLElement) {
        activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
      this.callbacks.onFocusTarget('monument', m.id);
    }
  }

  private stepMonumentSelection(delta: number): void {
    const list = this.currentDisplayedMonuments.length
      ? this.currentDisplayedMonuments
      : PARIS_MONUMENTS;
    const curIdx = list.findIndex((m) => m.id === this.activeMonumentId);
    const nextIdx =
      curIdx >= 0 ? (curIdx + delta + list.length) % list.length : 0;
    this.selectMonumentInExplorer(list[nextIdx].id, true);
  }

  /**
   * TAB 3: City Districts / Arrondissements Explorer
   * Includes an interactive 2D SVG map of all districts,
   * historical district chronicles, quartiers, Metro line medallions, and orbital camera pan.
   */
  private buildArrondissementsExplorerPane(): HTMLElement {
    const pane = createEl('div', 'explorer-pane arrondissements-explorer-pane');

    // 1. Interactive 2D SVG District Map
    const spiralBox = createEl('div', 'skyline-silhouette-box escargot-spiral-box');
    const spiralHeader = createEl('div', 'skyline-header-row');
    spiralHeader.appendChild(
      createEl('span', 'skyline-title', ACTIVE_CITY_META.districtsHeaderTitle)
    );
    spiralHeader.appendChild(createEl('span', 'skyline-subtitle', 'Click district to pan'));
    spiralBox.appendChild(spiralHeader);

    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 260 88');
    svg.setAttribute('class', 'escargot-spiral-svg');
    svg.setAttribute('aria-label', `Interactive map of ${ACTIVE_CITY_META.label} districts`);

    // Map world (x, z) coordinates into SVG (cx, cy) inside [24..236, 12..76]
    const mapCoord = (x: number, z: number): { cx: number; cy: number } => {
      const cx = Math.round((130 + x * 2.25) * 10) / 10;
      const cy = Math.round((44 + z * 1.02) * 10) / 10;
      return {
        cx: Math.max(16, Math.min(244, cx)),
        cy: Math.max(11, Math.min(77, cy))
      };
    };

    // Subtle Seine river curve across the map
    const seinePath = document.createElementNS(ns, 'path');
    seinePath.setAttribute(
      'd',
      'M 235 66 Q 175 56 142 48 T 92 42 Q 62 46 32 62'
    );
    seinePath.setAttribute('class', 'escargot-seine-path');
    svg.appendChild(seinePath);

    // Path connecting districts
    const pts = PARIS_ARRONDISSEMENTS.map((a) => mapCoord(a.x, a.z));
    const spiralD = pts
      .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.cx} ${p.cy}`)
      .join(' ');
    const spiralPath = document.createElementNS(ns, 'path');
    spiralPath.setAttribute('d', spiralD);
    spiralPath.setAttribute('class', 'escargot-spiral-line');
    svg.appendChild(spiralPath);

    // Interactive District Medallion Nodes
    PARIS_ARRONDISSEMENTS.forEach((arr, idx) => {
      const { cx, cy } = pts[idx];
      const g = document.createElementNS(ns, 'g');
      g.setAttribute('class', `escargot-node${arr.id === this.activeArrondissementId ? ' active' : ''}`);
      g.setAttribute('transform', `translate(${cx}, ${cy})`);

      const titleEl = document.createElementNS(ns, 'title');
      titleEl.textContent = `${arr.name} (${arr.officialName}) — Click to pan camera`;
      g.appendChild(titleEl);

      const circle = document.createElementNS(ns, 'circle');
      circle.setAttribute('r', '6.6');
      circle.setAttribute('class', 'escargot-node-circle');
      g.appendChild(circle);

      const label = document.createElementNS(ns, 'text');
      label.setAttribute('y', '2.4');
      label.setAttribute('text-anchor', 'middle');
      label.setAttribute('class', 'escargot-node-text');
      label.textContent = String(arr.number);
      g.appendChild(label);

      g.addEventListener('click', () => {
        this.selectArrondissementInExplorer(arr.id, true);
      });
      this.escargotNodesMap.set(arr.id, g);
      svg.appendChild(g);
    });

    spiralBox.appendChild(svg);
    pane.appendChild(spiralBox);

    // 2. Active Arrondissement Historical Spotlight Card
    const spotlight = createEl('div', 'explorer-spotlight-card arrondissement-spotlight');
    const badgesRow = createEl('div', 'spot-top-row');
    this.arrSpotEraEl = createEl('span', 'spot-category-tag', '');
    this.arrSpotFoundedEl = createEl('span', 'spot-year-pill', '');
    badgesRow.appendChild(this.arrSpotEraEl);
    badgesRow.appendChild(this.arrSpotFoundedEl);
    spotlight.appendChild(badgesRow);

    this.arrSpotTitleEl = createEl('h2', 'chronicle-title spot-title', '');
    spotlight.appendChild(this.arrSpotTitleEl);

    this.arrSpotQuartiersEl = createEl('div', 'spot-subtitle-meta', '');
    spotlight.appendChild(this.arrSpotQuartiersEl);

    this.arrSpotDescEl = createEl('p', 'chronicle-body spot-desc arr-spot-desc', '');
    spotlight.appendChild(this.arrSpotDescEl);

    this.arrSpotLandmarksEl = createEl('div', 'arr-landmarks-line', '');
    spotlight.appendChild(this.arrSpotLandmarksEl);

    // Connected Metro Lines Row
    const connWrap = createEl('div', 'spot-transfer-wrap');
    connWrap.appendChild(createEl('span', 'spot-transfer-label', 'METRO LINES'));
    this.arrSpotLinesRowEl = createEl('div', 'spot-lines-row');
    connWrap.appendChild(this.arrSpotLinesRowEl);
    spotlight.appendChild(connWrap);

    const navRow = createEl('div', 'tour-nav-row spot-nav-row');
    const prevArrBtn = createEl('button', 'deco-btn', '◀ Prev');
    prevArrBtn.title = 'Previous district';
    prevArrBtn.addEventListener('click', () => this.stepArrondissementSelection(-1));

    const panArrBtn = createEl('button', 'deco-btn tour-focus-btn active', '📍 Pan District');
    panArrBtn.title = 'Fly and pan the 3D camera around this district';
    panArrBtn.addEventListener('click', () => {
      this.selectArrondissementInExplorer(this.activeArrondissementId, true);
    });

    const nextArrBtn = createEl('button', 'deco-btn', 'Next ▶');
    nextArrBtn.title = 'Next district';
    nextArrBtn.addEventListener('click', () => this.stepArrondissementSelection(1));

    navRow.appendChild(prevArrBtn);
    navRow.appendChild(panArrBtn);
    navRow.appendChild(nextArrBtn);
    spotlight.appendChild(navRow);
    pane.appendChild(spotlight);

    // 3. Arrondissement Sector Filter Chips
    const filterRow = createEl('div', 'explorer-filter-chips');
    const filters: { id: ArrondissementFilterId; label: string }[] = [
      { id: 'all', label: `All (${PARIS_ARRONDISSEMENTS.length})` },
      { id: 'core', label: '⚜ Core' },
      { id: 'riveGauche', label: '🏛 South / West' },
      { id: 'riveDroite', label: '🎭 North / Central' },
      { id: 'outer1860', label: '🐌 Outer Ring' }
    ];
    for (const f of filters) {
      const btn = createEl('button', 'filter-chip-btn', f.label);
      if (f.id === this.activeArrondissementFilter) btn.classList.add('active');
      btn.addEventListener('click', () => {
        this.activeArrondissementFilter = f.id;
        for (const [id, b] of this.arrondissementFilterBtns.entries()) {
          b.classList.toggle('active', id === f.id);
        }
        this.renderArrondissementsExplorerList();
      });
      this.arrondissementFilterBtns.set(f.id, btn);
      filterRow.appendChild(btn);
    }
    pane.appendChild(filterRow);

    // 4. Scrollable Arrondissements Cards List
    this.arrondissementListEl = createEl('div', 'monument-cards-grid arrondissements-cards-grid');
    pane.appendChild(this.arrondissementListEl);

    this.selectArrondissementInExplorer(this.activeArrondissementId, false);
    this.renderArrondissementsExplorerList();
    return pane;
  }

  private renderArrondissementsExplorerList(): void {
    if (!this.arrondissementListEl) return;
    this.arrondissementListEl.replaceChildren();

    const filtered = PARIS_ARRONDISSEMENTS.filter((a) => {
      if (this.stationSearchQuery) {
        return (
          a.name.toLowerCase().includes(this.stationSearchQuery) ||
          a.officialName.toLowerCase().includes(this.stationSearchQuery) ||
          a.shortLabel.toLowerCase().includes(this.stationSearchQuery) ||
          a.quartiers.toLowerCase().includes(this.stationSearchQuery) ||
          a.notableLandmarks.toLowerCase().includes(this.stationSearchQuery) ||
          a.history.toLowerCase().includes(this.stationSearchQuery)
        );
      }
      if (this.activeArrondissementFilter === 'all') return true;
      return a.filterGroup === this.activeArrondissementFilter;
    });
    this.currentDisplayedArrondissements = filtered;

    for (const arr of filtered) {
      const card = createEl('button', 'monument-gallery-card arrondissement-gallery-card');
      if (arr.id === this.activeArrondissementId) card.classList.add('active');

      const numBadge = createEl('div', 'monument-card-icon arr-card-num-badge', arr.shortLabel);
      card.appendChild(numBadge);

      const infoCol = createEl('div', 'monument-card-info');
      infoCol.appendChild(
        createEl('span', 'monument-card-title', `${arr.name} (${arr.officialName})`)
      );
      infoCol.appendChild(
        createEl('span', 'monument-card-meta', `${arr.bank} • ${arr.quartiers}`)
      );
      card.appendChild(infoCol);

      card.addEventListener('click', () => {
        this.selectArrondissementInExplorer(arr.id, true);
      });
      this.arrondissementListEl.appendChild(card);
    }
  }

  public selectArrondissementInExplorer(arrId: string, panCamera: boolean): void {
    const arr = ARRONDISSEMENTS_MAP.get(arrId);
    if (!arr) return;
    this.activeArrondissementId = arr.id;

    this.arrSpotEraEl.textContent = arr.eraBadge;
    this.arrSpotFoundedEl.textContent = arr.foundedLabel;
    this.arrSpotTitleEl.textContent = arr.name;
    this.arrSpotQuartiersEl.textContent = `${arr.officialName} • Quartiers: ${arr.quartiers}`;
    this.arrSpotDescEl.textContent = arr.history;
    this.arrSpotLandmarksEl.textContent = `Key Landmarks: ${arr.notableLandmarks}`;

    this.arrSpotLinesRowEl.replaceChildren();
    for (const lineId of arr.metroLines) {
      const lineCfg = this.lineMap.get(lineId);
      if (!lineCfg) continue;
      const chip = createEl('button', 'spot-line-badge-btn', lineCfg.shortLabel);
      chip.style.backgroundColor = lineCfg.color;
      chip.style.color = lineCfg.textColor;
      chip.title = `Highlight ${lineCfg.name} on the map`;
      chip.addEventListener('click', () => {
        this.selectLine(this.selectedLineId === lineId ? null : lineId);
      });
      this.arrSpotLinesRowEl.appendChild(chip);
    }

    for (const [id, node] of this.escargotNodesMap.entries()) {
      node.setAttribute('class', `escargot-node${id === arr.id ? ' active' : ''}`);
    }
    this.renderArrondissementsExplorerList();

    if (panCamera) {
      this.hideSpecialStationInteriorCard();
      const activeEl = this.arrondissementListEl.querySelector('.active');
      if (activeEl instanceof HTMLElement) {
        activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
      this.callbacks.onFocusTarget('arrondissement', arr.id);
    }
  }

  private stepArrondissementSelection(delta: number): void {
    const list = this.currentDisplayedArrondissements.length
      ? this.currentDisplayedArrondissements
      : PARIS_ARRONDISSEMENTS;
    const curIdx = list.findIndex((a) => a.id === this.activeArrondissementId);
    const nextIdx =
      curIdx >= 0 ? (curIdx + delta + list.length) % list.length : 0;
    this.selectArrondissementInExplorer(list[nextIdx].id, true);
  }

  public stepActiveExplorerSelection(delta: number): void {
    if (this.isExplorerCollapsed) {
      this.toggleExplorerCollapsed(false);
    }
    if (this.activeExplorerTab === 'stations') {
      this.stepStationSelection(delta);
    } else if (this.activeExplorerTab === 'monuments') {
      this.stepMonumentSelection(delta);
    } else if (this.activeExplorerTab === 'arrondissements') {
      this.stepArrondissementSelection(delta);
    } else {
      this.isAutoTourPlaying = false;
      this.syncAutoTourBtn();
      this.selectTourStop(this.activeTourStopIdx + delta, true);
    }
  }

  /**
   * TAB 4: Historical Walking Tour
   */
  private buildTourExplorerPane(): HTMLElement {
    const tourCard = createEl('div', 'explorer-pane tour-explorer-pane');

    const header = createEl('div', 'chronicle-header');
    header.appendChild(
      createEl('span', 'chronicle-era-tag', ACTIVE_CITY_META.tourHeaderTitle)
    );

    const headerActions = createEl('div', 'tour-header-actions');

    this.tourAutoBtnEl = createEl('button', 'deco-btn tour-header-btn', '⟳ Walk');
    this.tourAutoBtnEl.title =
      'Automatically walk from stop to stop across Paris every 9 seconds';
    this.tourAutoBtnEl.addEventListener('click', () => {
      this.isAutoTourPlaying = !this.isAutoTourPlaying;
      this.autoTourTimer = 0.0;
      this.syncAutoTourBtn();
      if (this.isAutoTourPlaying) {
        this.selectTourStop(this.activeTourStopIdx, true);
      }
    });

    this.tourClearBtnEl = createEl('button', 'deco-btn tour-clear-btn tour-header-btn', '✕');
    this.tourClearBtnEl.title = 'Unpin the walking tour highlight ring from the map';
    this.tourClearBtnEl.style.display = 'none';
    this.tourClearBtnEl.addEventListener('click', () => {
      this.isAutoTourPlaying = false;
      this.isTourPinned = false;
      this.syncAutoTourBtn();
      this.tourClearBtnEl.style.display = 'none';
      this.callbacks.onSelectTourStop(null);
    });

    this.tourStepBadgeEl = createEl(
      'span',
      'chronicle-year-badge',
      `STOP 5 / ${PARIS_NATURALISATION_TOUR_STOPS.length}`
    );

    headerActions.appendChild(this.tourAutoBtnEl);
    headerActions.appendChild(this.tourClearBtnEl);
    headerActions.appendChild(this.tourStepBadgeEl);
    header.appendChild(headerActions);
    tourCard.appendChild(header);

    // Active Stop Spotlight Card (matches Stations & Monuments spotlight structure with Prev / Fly / Next at the bottom)
    const activeStopBox = createEl('div', 'explorer-spotlight-card tour-active-stop-box');

    const dateLocRow = createEl('div', 'tour-date-loc-row');
    this.tourDatePillEl = createEl('span', 'tour-date-pill', '');
    this.tourLocationBtnEl = createEl('button', 'tour-location-chip', '');
    this.tourLocationBtnEl.title = 'Click to fly to this Paris location';
    this.tourLocationBtnEl.addEventListener('click', () => {
      this.selectTourStop(this.activeTourStopIdx, true);
    });
    dateLocRow.appendChild(this.tourDatePillEl);
    dateLocRow.appendChild(this.tourLocationBtnEl);
    activeStopBox.appendChild(dateLocRow);

    this.tourTitleEl = createEl('h2', 'chronicle-title spot-title', '');
    activeStopBox.appendChild(this.tourTitleEl);

    const qBox = createEl('div', 'tour-question-box');
    qBox.appendChild(createEl('span', 'tour-question-label', 'INTERVIEW QUESTION'));
    this.tourQuestionEl = createEl('p', 'tour-question-text', '');
    qBox.appendChild(this.tourQuestionEl);
    activeStopBox.appendChild(qBox);

    this.tourFactEl = createEl('p', 'chronicle-body tour-fact-body', '');
    activeStopBox.appendChild(this.tourFactEl);

    // Walking Tour Transport Controls inside the bottom of the Spotlight Card (matching Stations & Monuments)
    const navRow = createEl('div', 'tour-nav-row spot-nav-row');
    const prevBtn = createEl('button', 'deco-btn', '◀ Prev');
    prevBtn.title = 'Previous historical walking tour stop in Paris';
    prevBtn.addEventListener('click', () => {
      this.isAutoTourPlaying = false;
      this.syncAutoTourBtn();
      const nextIdx =
        (this.activeTourStopIdx - 1 + PARIS_NATURALISATION_TOUR_STOPS.length) %
        PARIS_NATURALISATION_TOUR_STOPS.length;
      this.selectTourStop(nextIdx, true);
    });

    const focusBtn = createEl('button', 'deco-btn tour-focus-btn active', '📍 Fly to Stop');
    focusBtn.title = 'Fly camera and highlight this historical location on the Paris map';
    focusBtn.addEventListener('click', () => {
      this.selectTourStop(this.activeTourStopIdx, true);
    });

    const nextBtn = createEl('button', 'deco-btn', 'Next ▶');
    nextBtn.title = 'Next historical walking tour stop in Paris';
    nextBtn.addEventListener('click', () => {
      this.isAutoTourPlaying = false;
      this.syncAutoTourBtn();
      const nextIdx = (this.activeTourStopIdx + 1) % PARIS_NATURALISATION_TOUR_STOPS.length;
      this.selectTourStop(nextIdx, true);
    });

    navRow.appendChild(prevBtn);
    navRow.appendChild(focusBtn);
    navRow.appendChild(nextBtn);
    activeStopBox.appendChild(navRow);

    tourCard.appendChild(activeStopBox);

    // Scrollable Itinerary List of All 15 Paris-Based Stops
    const listHeader = createEl(
      'div',
      'tour-list-header',
      'ALL 15 PARIS STOPS (CLICK TO VISIT)'
    );
    tourCard.appendChild(listHeader);

    const stopsList = createEl('div', 'tour-stops-list');
    PARIS_NATURALISATION_TOUR_STOPS.forEach((stop, idx) => {
      const rowBtn = createEl('button', 'tour-stop-item');
      rowBtn.appendChild(createEl('span', 'tour-stop-num', String(stop.stopNumber)));
      const textCol = createEl('div', 'tour-stop-text-col');
      textCol.appendChild(createEl('span', 'tour-stop-item-title', stop.title));
      textCol.appendChild(
        createEl(
          'span',
          'tour-stop-item-meta',
          `${stop.historicalDate} • ${stop.locationName}`
        )
      );
      rowBtn.appendChild(textCol);
      rowBtn.addEventListener('click', () => {
        this.isAutoTourPlaying = false;
        this.syncAutoTourBtn();
        this.selectTourStop(idx, true);
      });
      this.tourStopRowBtns.set(stop.id, rowBtn);
      stopsList.appendChild(rowBtn);
    });
    tourCard.appendChild(stopsList);

    // Populate initial stop text without forcing camera flight on initial load
    this.selectTourStop(this.activeTourStopIdx, false);
    return tourCard;
  }

  private syncAutoTourBtn(): void {
    this.tourAutoBtnEl.classList.toggle('active', this.isAutoTourPlaying);
    this.tourAutoBtnEl.textContent = this.isAutoTourPlaying ? '❚❚ Walking' : '⟳ Walk';
  }

  private filterTourStopsList(): void {
    const q = this.stationSearchQuery;
    for (const stop of PARIS_NATURALISATION_TOUR_STOPS) {
      const btn = this.tourStopRowBtns.get(stop.id);
      if (!btn) continue;
      if (!q) {
        btn.style.display = 'flex';
      } else {
        const matches =
          stop.title.toLowerCase().includes(q) ||
          stop.locationName.toLowerCase().includes(q) ||
          stop.arrondissement.toLowerCase().includes(q) ||
          stop.historicalDate.toLowerCase().includes(q) ||
          stop.fact.toLowerCase().includes(q);
        btn.style.display = matches ? 'flex' : 'none';
      }
    }
  }

  public selectTourStop(index: number, flyToLocation: boolean): void {
    const stops = PARIS_NATURALISATION_TOUR_STOPS;
    if (!stops.length) return;
    const clampedIdx = ((index % stops.length) + stops.length) % stops.length;
    this.activeTourStopIdx = clampedIdx;
    const stop = stops[clampedIdx];

    this.tourStepBadgeEl.textContent = `STOP ${stop.stopNumber} / ${stops.length}`;
    this.tourDatePillEl.textContent = stop.historicalDate;
    this.tourLocationBtnEl.textContent = `📍 ${stop.locationName} (${stop.arrondissement})`;
    this.tourTitleEl.textContent = stop.title;
    this.tourQuestionEl.textContent = stop.interviewQuestion;
    this.tourFactEl.textContent = stop.fact;

    for (const [id, btn] of this.tourStopRowBtns.entries()) {
      const isCurrent = id === stop.id;
      btn.classList.toggle('active', isCurrent);
      if (isCurrent && flyToLocation) {
        btn.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }

    if (flyToLocation) {
      this.hideSpecialStationInteriorCard();
      this.isTourPinned = true;
      this.tourClearBtnEl.style.display = 'inline-flex';
      this.callbacks.onSelectTourStop(stop);
    }
  }

  private buildBottomTimelineBar(): HTMLElement {
    const bottom = createEl('footer', 'hud-bottom-bar');
    const consolePanel = createEl('div', 'deco-panel timeline-console hud-interactive');
    attachDecoCorners(consolePanel);

    // Top Row inside Timeline Console: Transport Controls + Event Headline + Legend
    const topRow = createEl('div', 'timeline-top-row');

    const transport = createEl('div', 'timeline-transport-controls');

    const stepBackBtn = createEl('button', 'deco-btn', '◀ -1');
    stepBackBtn.title = 'Step back one year';
    stepBackBtn.addEventListener('click', () => {
      this.setPlaying(false);
      this.triggerYear(Math.max(1900, this.currentYear - 1));
    });

    this.playBtn = createEl('button', 'deco-btn play-btn', '▶ 1900→2026');
    this.playBtn.title = 'Play or pause the historical timeline (1900–2026)';
    this.playBtn.addEventListener('click', () => {
      if (!this.isPlaying && this.currentYear >= 2026) {
        this.triggerYear(1900);
      }
      this.setPlaying(!this.isPlaying);
    });

    const stepFwdBtn = createEl('button', 'deco-btn', '+1 ▶');
    stepFwdBtn.title = 'Step forward one year';
    stepFwdBtn.addEventListener('click', () => {
      this.setPlaying(false);
      this.triggerYear(Math.min(2026, this.currentYear + 1));
    });

    const speedBtn = createEl('button', 'deco-btn', 'Speed: 1×');
    speedBtn.addEventListener('click', () => {
      const speeds = [1, 2, 5];
      const nextIdx = (speeds.indexOf(this.playSpeed) + 1) % speeds.length;
      this.playSpeed = speeds[nextIdx];
      speedBtn.textContent = `Speed: ${this.playSpeed}×`;
    });

    const ghostBtn = createEl('button', 'deco-btn active', 'Phantom Stations: On');
    ghostBtn.title = 'Show closed Phantom Stations (1939 / 1969)';
    ghostBtn.addEventListener('click', () => {
      this.showGhostStations = !this.showGhostStations;
      ghostBtn.textContent = this.showGhostStations
        ? 'Phantom Stations: On'
        : 'Phantom Stations: Off';
      ghostBtn.classList.toggle('active', this.showGhostStations);
      this.callbacks.onToggleGhostStations(this.showGhostStations);
    });

    transport.appendChild(stepBackBtn);
    transport.appendChild(this.playBtn);
    transport.appendChild(stepFwdBtn);
    transport.appendChild(speedBtn);
    transport.appendChild(ghostBtn);

    // Center Historical Event Banner
    const eventBanner = createEl('div', 'timeline-event-banner');
    this.eventYearPillEl = createEl('span', 'event-year-pill', '2026');
    this.eventHeadlineEl = createEl('span', '', '');
    eventBanner.appendChild(this.eventYearPillEl);
    eventBanner.appendChild(this.eventHeadlineEl);

    // Right Legend Pills
    const legend = createEl('div', 'timeline-legend-pills');
    const l1 = createEl('span');
    l1.appendChild(createEl('span', 'legend-dot active-station'));
    l1.appendChild(document.createTextNode('Hub / Station'));

    const l2 = createEl('span');
    l2.appendChild(createEl('span', 'legend-dot ghost-station'));
    l2.appendChild(document.createTextNode('Phantom Station (Closed)'));

    const l3 = createEl('span');
    l3.appendChild(createEl('span', 'legend-dot viaduct'));
    l3.appendChild(document.createTextNode('Elevated Viaduct'));

    legend.appendChild(l1);
    legend.appendChild(l2);
    legend.appendChild(l3);

    topRow.appendChild(transport);
    topRow.appendChild(eventBanner);
    topRow.appendChild(legend);

    // Slider Track + Clickable Historical Milestones
    const sliderWrapper = createEl('div', 'timeline-slider-wrapper');
    this.timelineInput = createEl('input', 'timeline-range-input');
    this.timelineInput.type = 'range';
    this.timelineInput.min = '1900';
    this.timelineInput.max = '2026';
    this.timelineInput.step = '1';
    this.timelineInput.value = '2026';
    this.timelineInput.setAttribute('aria-label', 'Historical timeline slider from 1900 to 2026');

    this.timelineInput.addEventListener('input', () => {
      this.setPlaying(false);
      this.triggerYear(parseInt(this.timelineInput.value, 10));
    });

    const milestonesRow = createEl('div', 'timeline-milestones-row');
    for (const ms of TIMELINE_MILESTONES) {
      const pct = ((ms.year - 1900) / (2026 - 1900)) * 100;
      const tickBtn = createEl('button', 'milestone-tick');
      tickBtn.style.left = `${pct}%`;
      tickBtn.title = ms.headline;
      tickBtn.appendChild(createEl('span', 'milestone-diamond'));
      tickBtn.appendChild(createEl('span', 'milestone-year-label', ms.shortLabel));
      tickBtn.addEventListener('click', () => {
        this.setPlaying(false);
        this.triggerYear(ms.year);
      });
      this.milestoneBtns.set(ms.year, tickBtn);
      milestonesRow.appendChild(tickBtn);
    }

    sliderWrapper.appendChild(this.timelineInput);
    sliderWrapper.appendChild(milestonesRow);

    consolePanel.appendChild(topRow);
    consolePanel.appendChild(sliderWrapper);
    bottom.appendChild(consolePanel);
    return bottom;
  }

  private buildSpecialStationInteriorCard(): HTMLElement {
    const card = createEl('div', 'deco-panel special-station-anchor-card hud-interactive');
    attachDecoCorners(card);

    const topRow = createEl('div', 'special-station-card-top');
    const tagEl = createEl('span', 'special-station-tag', '✨ SPECIAL METRO INTERIOR');
    topRow.appendChild(tagEl);

    const rightControls = createEl('div', 'special-station-top-right');
    this.specialStationLinesRowEl = createEl('div', 'special-station-lines');
    rightControls.appendChild(this.specialStationLinesRowEl);

    const closeBtn = createEl('button', 'special-station-close-btn', '✕');
    closeBtn.title = 'Close interior photo card';
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.hideSpecialStationInteriorCard();
    });
    rightControls.appendChild(closeBtn);
    topRow.appendChild(rightControls);
    card.appendChild(topRow);

    const photoWrap = createEl('div', 'special-station-photo-wrap');
    this.specialStationPhotoImgEl = createEl('img', 'special-station-photo-img');
    this.specialStationPhotoImgEl.alt = 'Paris Metro Special Station Interior';
    photoWrap.appendChild(this.specialStationPhotoImgEl);

    this.specialStationArtistBadgeEl = createEl('span', 'special-station-artist-pill', '');
    photoWrap.appendChild(this.specialStationArtistBadgeEl);
    card.appendChild(photoWrap);

    const body = createEl('div', 'special-station-card-body');
    this.specialStationTitleEl = createEl('h3', 'special-station-title', '');
    this.specialStationDesignTitleEl = createEl('div', 'special-station-design-sub', '');
    this.specialStationCaptionEl = createEl('p', 'special-station-caption', '');
    body.appendChild(this.specialStationTitleEl);
    body.appendChild(this.specialStationDesignTitleEl);
    body.appendChild(this.specialStationCaptionEl);
    card.appendChild(body);

    const pointerStem = createEl('div', 'special-station-pointer-stem');
    card.appendChild(pointerStem);

    return card;
  }

  public showSpecialStationInteriorCard(st: MetroStationData): void {
    if (!st.specialInterior) {
      this.hideSpecialStationInteriorCard();
      return;
    }
    this.anchoredSpecialStation = st;
    const info = st.specialInterior;

    // Validate local station photo path against strict prefix before assigning src
    if (info.photoUrl.startsWith('stations/') && !info.photoUrl.includes('..')) {
      this.specialStationPhotoImgEl.src = info.photoUrl;
    }
    this.specialStationPhotoImgEl.alt = `${st.name} — ${info.designTitle}`;
    this.specialStationArtistBadgeEl.textContent = info.artistOrYear;
    this.specialStationTitleEl.textContent = st.name;
    this.specialStationDesignTitleEl.textContent = info.designTitle;
    this.specialStationCaptionEl.textContent = info.interiorCaption;

    this.specialStationLinesRowEl.replaceChildren();
    for (const lineId of st.lines) {
      const lineCfg = this.lineMap.get(lineId);
      if (!lineCfg) continue;
      const chip = createEl('span', 'mini-line-dot', lineCfg.shortLabel);
      chip.style.backgroundColor = lineCfg.color;
      chip.style.color = lineCfg.textColor;
      this.specialStationLinesRowEl.appendChild(chip);
    }

    this.specialStationCardEl.classList.add('visible');
  }

  public hideSpecialStationInteriorCard(): void {
    this.anchoredSpecialStation = null;
    if (this.specialStationCardEl) {
      this.specialStationCardEl.classList.remove('visible');
    }
  }

  public getAnchoredSpecialStation(): MetroStationData | null {
    return this.anchoredSpecialStation;
  }

  public updateSpecialStationCardPosition(
    screenX: number,
    screenY: number,
    visible: boolean
  ): void {
    if (!this.anchoredSpecialStation || !visible) {
      this.specialStationCardEl.classList.remove('visible');
      return;
    }
    this.specialStationCardEl.classList.add('visible');

    const cardHalfW = 165;
    const minX = 95 + cardHalfW;
    const rightDockReserve = this.isExplorerCollapsed ? 80 : 405;
    const maxX = Math.max(minX + 20, window.innerWidth - rightDockReserve - cardHalfW);
    const clampedX = Math.max(minX, Math.min(maxX, screenX));

    // Anchor above the 3D station point (leaving 24px clearance above the station beacon)
    const targetBottomY = screenY - 22;
    const minBottomY = 345;
    const maxBottomY = window.innerHeight - 105;
    const clampedBottomY = Math.max(minBottomY, Math.min(maxBottomY, targetBottomY));

    this.specialStationCardEl.style.left = `${Math.round(clampedX)}px`;
    this.specialStationCardEl.style.top = `${Math.round(clampedBottomY)}px`;
  }

  private buildHoverDossierCard(): HTMLElement {
    const card = createEl('div', 'deco-panel hover-dossier-card');
    attachDecoCorners(card);

    const typeRow = createEl('div', 'dossier-type-row');
    this.dossierCategoryEl = createEl('span', 'dossier-category', 'METRO STATION');
    this.dossierStatusEl = createEl('span', 'dossier-status-pill', 'IN SERVICE');
    typeRow.appendChild(this.dossierCategoryEl);
    typeRow.appendChild(this.dossierStatusEl);

    this.dossierTitleEl = createEl('h3', 'dossier-title', '');
    this.dossierLinesRowEl = createEl('div', 'dossier-lines-row');
    this.dossierMetaGridEl = createEl('div', 'dossier-meta-grid');
    this.dossierDescEl = createEl('p', 'dossier-description', '');

    card.appendChild(typeRow);
    card.appendChild(this.dossierTitleEl);
    card.appendChild(this.dossierLinesRowEl);
    card.appendChild(this.dossierMetaGridEl);
    card.appendChild(this.dossierDescEl);
    return card;
  }

  public selectLine(lineId: string | null): void {
    this.selectedLineId = lineId;
    this.allLinesBtn.classList.toggle('active', lineId === null);

    for (const [id, btn] of this.lineBadgeBtns.entries()) {
      btn.classList.toggle('selected', id === lineId);
      btn.classList.toggle('dimmed', lineId !== null && id !== lineId);
    }

    if (lineId !== null) {
      // Automatically open the Stations Explorer Route Diagram for the selected line
      this.switchExplorerTab('stations');
      const lineCfg = this.lineMap.get(lineId);
      if (lineCfg) {
        const lineStations = this.getOrderedStationsForLine(lineCfg);
        if (
          lineStations.length > 0 &&
          !lineStations.some((s) => s.id === this.activeStationId)
        ) {
          this.activeStationId = lineStations[0].id;
          this.selectStationInExplorer(this.activeStationId, false);
        }
      }
    }

    this.renderStationExplorerList();
    this.callbacks.onLineSelect(lineId);
  }

  public handleCanvasEntityClick(clicked: HoveredEntity): void {
    if (clicked.kind === 'station' && clicked.station) {
      this.switchExplorerTab('stations');
      this.selectStationInExplorer(clicked.station.id, true);
    } else if (clicked.kind === 'monument' && clicked.monument) {
      this.switchExplorerTab('monuments');
      this.selectMonumentInExplorer(clicked.monument.id, true);
    }
  }

  public setPlaying(playing: boolean): void {
    this.isPlaying = playing;
    this.playBtn.textContent = playing ? '❚❚ Pause' : '▶ 1900→2026';
    this.playBtn.classList.toggle('active', playing);
  }

  public tickPlayback(deltaSeconds: number): void {
    // 1. Smoothly animate Metro Lift if toggle was clicked
    if (this.targetLift !== null) {
      const diff = this.targetLift - this.currentLift;
      if (Math.abs(diff) < 0.008) {
        const finalLift = this.targetLift;
        this.targetLift = null;
        this.setLiftValue(finalLift);
        this.callbacks.onLiftChange(finalLift, false);
      } else {
        const step = Math.sign(diff) * Math.min(Math.abs(diff), deltaSeconds * 1.45);
        const nextLift = this.currentLift + step;
        this.setLiftValue(nextLift);
        this.callbacks.onLiftChange(nextLift, false);
      }
    }

    // 2. Advance Walking Tour auto-walk if enabled
    if (this.isAutoTourPlaying) {
      this.autoTourTimer += deltaSeconds;
      if (this.autoTourTimer >= 9.0) {
        this.autoTourTimer = 0.0;
        const nextIdx = (this.activeTourStopIdx + 1) % PARIS_NATURALISATION_TOUR_STOPS.length;
        this.selectTourStop(nextIdx, true);
      }
    }

    // 3. Advance timeline playback if playing
    if (!this.isPlaying) return;
    // At 1x speed, advance ~3.2 years per second so 1900->2026 progresses smoothly
    this.playbackYearFloat += deltaSeconds * 3.2 * this.playSpeed;
    if (this.playbackYearFloat >= 2026) {
      this.playbackYearFloat = 2026;
      this.triggerYear(2026);
      this.setPlaying(false);
    } else {
      const pct = ((this.playbackYearFloat - 1900) / (2026 - 1900)) * 100;
      this.timelineInput.style.setProperty('--progress', `${pct.toFixed(1)}%`);
      const nextIntYear = Math.floor(this.playbackYearFloat);
      if (nextIntYear !== this.currentYear) {
        this.currentYear = nextIntYear;
        this.timelineInput.value = String(nextIntYear);
        this.callbacks.onYearChange(nextIntYear);
      }
    }
  }

  public toggleLift(): void {
    const isCurrentlyLifted = (this.targetLift ?? this.currentLift) >= 0.5;
    this.targetLift = isCurrentlyLifted ? 0.0 : 1.0;
    this.callbacks.onLiftChange(this.currentLift, true);
  }

  public toggleLightColumns(): void {
    this.showLightColumns = !this.showLightColumns;
    this.lightColumnsBtn.classList.toggle('active', this.showLightColumns);
    this.callbacks.onToggleLightColumns(this.showLightColumns);
  }

  public togglePaperModel(): void {
    this.isPaperModel = !this.isPaperModel;
    this.paperModelBtn.classList.toggle('active', this.isPaperModel);
    this.paperModelBtn.textContent = this.isPaperModel ? '◼ Grey Model' : '◻ Grey Model';
    this.callbacks.onTogglePaperModel(this.isPaperModel);
  }

  public toggleAutoTimeCycle(): void {
    this.autoTimeCycle = !this.autoTimeCycle;
    this.timeCycleBtn.classList.toggle('active', this.autoTimeCycle);
    this.callbacks.onToggleAutoTimeCycle(this.autoTimeCycle);
  }

  public toggleMonumentOrbit(): void {
    this.monumentOrbitEnabled = !this.monumentOrbitEnabled;
    this.monumentOrbitBtn.classList.toggle('active', this.monumentOrbitEnabled);
    this.callbacks.onToggleMonumentOrbit(this.monumentOrbitEnabled);
  }

  public toggleCityOrbit(): void {
    this.setCityOrbitActiveUI(!this.cityOrbitEnabled);
    this.callbacks.onToggleCityOrbit(this.cityOrbitEnabled);
  }

  public setCityOrbitActiveUI(active: boolean): void {
    this.cityOrbitEnabled = active;
    this.cityOrbitBtn.classList.toggle('active', active);
    this.quickCityOrbitBtn.classList.toggle('active', active);
  }

  public toggleEiffelSparkle(): void {
    this.manualEiffelSparkle = !this.manualEiffelSparkle;
    for (const btn of this.eiffelSparkleBtns) {
      btn.classList.toggle('active', this.manualEiffelSparkle);
    }
    this.callbacks.onToggleEiffelSparkle(this.manualEiffelSparkle);
    if (this.activeMonumentId === 'monument-eiffel') {
      this.selectMonumentInExplorer('monument-eiffel', false);
    }
  }

  public setActiveWeatherModeUI(mode: WeatherModeId): void {
    for (const [id, btn] of this.weatherModeBtns.entries()) {
      btn.classList.toggle('active', id === mode);
    }
  }

  public toggleLiveWeather(): void {
    const next = !this.liveWeatherEnabled;
    this.liveWeatherEnabled = next;
    for (const btn of this.liveWeatherBtns) {
      btn.classList.toggle('active', next);
      btn.classList.toggle('live-sync-active', next);
      if (!next) {
        btn.textContent = '🌡 Live Weather';
      }
    }
    this.callbacks.onToggleLiveWeather(next);
  }

  public setLiveWeatherState(
    enabled: boolean,
    weather: ParisLiveApiResponse['weather'] | null
  ): void {
    this.liveWeatherEnabled = enabled;
    this.liveWeatherData = weather;
    const tempStr =
      enabled && weather && weather.current.temperatureC !== null
        ? `🌡 Live ${weather.current.temperatureC.toFixed(1)}°C`
        : '🌡 Live Weather';

    for (const btn of this.liveWeatherBtns) {
      btn.classList.toggle('active', enabled);
      btn.classList.toggle('live-sync-active', enabled);
      btn.textContent = tempStr;
      if (enabled && weather) {
        btn.title = `Live Paris Weather (${weather.current.conditionEn} / ${weather.current.conditionFr}): ${weather.current.temperatureC ?? '--'}°C, Wind ${weather.current.windSpeedKmh ?? '--'} km/h, Humidity ${weather.current.humidityPercent ?? '--'}%`;
      }
    }
    if (enabled && weather) {
      this.setActiveWeatherModeUI(weather.clientSceneState.weatherMode);
    }
    this.updateSettingsSummaryText();
  }

  public toggleLiveMetro(): void {
    const next = !this.liveMetroEnabled;
    this.liveMetroEnabled = next;
    for (const btn of this.liveMetroBtns) {
      btn.classList.toggle('active', next);
      btn.classList.toggle('live-sync-active', next);
    }
    this.callbacks.onToggleLiveMetro(next);
  }

  public setLiveMetroState(
    enabled: boolean,
    metro: ParisLiveApiResponse['metro'] | null
  ): void {
    this.liveMetroEnabled = enabled;
    this.liveMetroData = metro;

    for (const btn of this.liveMetroBtns) {
      btn.classList.toggle('active', enabled);
      btn.classList.toggle('live-sync-active', enabled);
    }

    for (const line of METRO_LINES) {
      const badge = this.lineBadgeBtns.get(line.id);
      if (!badge) continue;
      const liveLine = enabled && metro ? metro.linesById[line.id] : undefined;
      badge.classList.toggle('live-metro-active', Boolean(liveLine));
      if (liveLine) {
        badge.title = `${line.name} • 🟢 ${liveLine.trafficLabelEn} (${liveLine.serviceQualityPercent.toFixed(1)}% QoS)${liveLine.automated ? ' • Automated' : ''} — Click to inspect route`;
      } else {
        badge.title = `${line.name} (Opened in ${line.openedYear}) — Click to inspect line route`;
      }
    }

    this.selectStationInExplorer(this.activeStationId, false);
  }

  public cycleBokehMode(): void {
    const bokehPresets = [
      { label: '◉ Bokeh: f/2.8', aperture: 0.55 },
      { label: '◉ Bokeh: f/1.4', aperture: 0.95 },
      { label: '◉ Bokeh: Off', aperture: 0.0 }
    ];
    this.bokehModeIdx = (this.bokehModeIdx + 1) % bokehPresets.length;
    const preset = bokehPresets[this.bokehModeIdx];
    this.bokehBtn.textContent = preset.label;
    this.bokehBtn.classList.toggle('active', preset.aperture > 0.01);
    this.callbacks.onBokehChange(preset.aperture);
  }

  public syncTimeOfDayReadout(hours: number): void {
    const norm = ((hours % 24) + 24) % 24;
    this.timeSlider.value = norm.toFixed(1);
    const formatted = SkyWeatherSystem.formatHourString(norm);
    const icon =
      norm >= 6.0 && norm < 8.5
        ? '🌅'
        : norm >= 8.5 && norm < 17.8
          ? '☀'
          : norm >= 17.8 && norm < 20.5
            ? '🌇'
            : '🌙';
    this.lastFormattedClock = `${icon} ${formatted}`;
    this.timeClockReadoutEl.textContent = this.lastFormattedClock;
    this.updateSettingsSummaryText();
  }

  public setLiftValue(liftProgress: number): void {
    const clamped = Math.max(0.0, Math.min(1.0, liftProgress));
    this.currentLift = clamped;
    this.liftSlider.value = clamped.toFixed(2);
    const isLifted = clamped >= 0.5;
    this.liftToggleBtn.classList.toggle('active', isLifted);
    this.liftToggleBtn.textContent = isLifted ? '▼ Lower Metro' : '▲ Lift Metro';
  }

  public triggerYear(year: number): void {
    const clamped = Math.max(1900, Math.min(2026, Math.round(year)));
    this.currentYear = clamped;
    this.playbackYearFloat = clamped;
    this.timelineInput.value = String(clamped);
    const pct = ((clamped - 1900) / (2026 - 1900)) * 100;
    this.timelineInput.style.setProperty('--progress', `${pct.toFixed(1)}%`);
    this.callbacks.onYearChange(clamped);
  }

  public updateTelemetry(
    year: number,
    _activeLinesCount: number,
    _activeStationsCount: number,
    _closedGhostStationsCount: number
  ): void {
    this.currentYear = year;

    // Update milestone ticks
    const closestMs = getClosestMilestoneHeadline(year);
    this.eventYearPillEl.textContent = String(year);
    this.eventHeadlineEl.textContent = closestMs.headline;

    for (const [msYear, btn] of this.milestoneBtns.entries()) {
      btn.classList.toggle('reached', year >= msYear);
      btn.classList.toggle('current', msYear === closestMs.year);
    }

    // Update unopened state on RATP line badges
    for (const line of METRO_LINES) {
      const btn = this.lineBadgeBtns.get(line.id);
      if (btn) {
        btn.classList.toggle('unopened', year < line.openedYear);
      }
    }
  }

  public showHoveredEntity(hovered: HoveredEntity | null): void {
    if (!hovered) {
      this.dossierCardEl.classList.remove('visible');
      return;
    }

    // Position floating card safely within viewport bounds
    const pad = 18;
    const cardW = 320;
    const cardH = 250;
    let left = hovered.clientX + 20;
    let top = hovered.clientY - 30;
    if (left + cardW + pad > window.innerWidth) {
      left = hovered.clientX - cardW - 20;
    }
    if (top + cardH + pad > window.innerHeight) {
      top = window.innerHeight - cardH - pad;
    }
    if (top < pad) top = pad;

    this.dossierCardEl.style.left = `${left}px`;
    this.dossierCardEl.style.top = `${top}px`;

    this.dossierLinesRowEl.replaceChildren();
    this.dossierMetaGridEl.replaceChildren();

    const addMeta = (label: string, val: string) => {
      const item = createEl('div', 'dossier-meta-item');
      item.appendChild(createEl('span', 'dossier-meta-label', label));
      item.appendChild(createEl('span', 'dossier-meta-val', val));
      this.dossierMetaGridEl.appendChild(item);
    };

    if (hovered.kind === 'station' && hovered.station) {
      const st = hovered.station;
      const isClosedNow = st.closedYear !== undefined && this.currentYear >= st.closedYear;

      this.dossierCategoryEl.textContent = st.elevated
        ? 'ELEVATED VIADUCT STATION'
        : st.isGhostStation
          ? 'HISTORIC PHANTOM STATION'
          : 'METRO STATION';

      this.dossierStatusEl.textContent = isClosedNow
        ? `CLOSED IN ${st.closedYear}`
        : `OPENED IN ${st.openedYear}`;
      this.dossierStatusEl.classList.toggle('ghost', isClosedNow);

      this.dossierTitleEl.textContent = st.name;

      // Render RATP line chips
      for (const lineId of st.lines) {
        const lineCfg = this.lineMap.get(lineId);
        if (!lineCfg) continue;
        const chip = createEl('span', 'dossier-line-chip', lineCfg.shortLabel);
        chip.style.backgroundColor = lineCfg.color;
        chip.style.color = lineCfg.textColor;
        if (this.currentYear < lineCfg.openedYear) {
          chip.style.opacity = '0.35';
          chip.title = `${lineCfg.name} (Opens in ${lineCfg.openedYear})`;
        }
        this.dossierLinesRowEl.appendChild(chip);
      }

      addMeta('DISTRICT', st.arrondissement);
      addMeta(
        'TIMELINE',
        st.closedYear ? `${st.openedYear} → Closed ${st.closedYear}` : `Since ${st.openedYear}`
      );
      addMeta('ARCHITECTURE', st.architecture);
      if (st.landmark) {
        addMeta('NEARBY LANDMARK', st.landmark);
      }

      if (this.liveMetroEnabled && this.liveMetroData && !isClosedNow) {
        const liveLines = st.lines
          .map((lId) => this.liveMetroData?.linesById[lId])
          .filter((item): item is NonNullable<typeof item> => Boolean(item));
        if (liveLines.length > 0) {
          const avgQos =
            liveLines.reduce((acc, l) => acc + l.serviceQualityPercent, 0) / liveLines.length;
          addMeta(
            'LIVE RATP STATUS',
            `🟢 ${liveLines[0].trafficLabelEn} (${avgQos.toFixed(1)}% QoS)`
          );
        }
        const sensor = this.liveMetroData.stationsById[st.id];
        if (sensor) {
          const sParts: string[] = [];
          if (sensor.temperatureC !== null) sParts.push(`${sensor.temperatureC.toFixed(1)}°C`);
          if (sensor.humidityPercent !== null) sParts.push(`${Math.round(sensor.humidityPercent)}% RH`);
          if (sensor.co2Ppm !== null) sParts.push(`CO₂ ${Math.round(sensor.co2Ppm)} ppm`);
          if (sParts.length > 0) {
            addMeta('PLATFORM SENSORS', sParts.join(' • '));
          }
        }
      }

      this.dossierDescEl.textContent = st.description;
    } else if (hovered.kind === 'monument' && hovered.monument) {
      const m = hovered.monument;
      const inConstruction =
        m.constructionStartYear !== undefined && this.currentYear < m.builtYear;

      this.dossierCategoryEl.textContent = 'HISTORIC PARIS MONUMENT (3D)';
      this.dossierStatusEl.textContent = inConstruction
        ? `UNDER CONSTRUCTION (${m.constructionStartYear}–${m.builtYear})`
        : `COMPLETED IN ${m.builtYear}`;
      this.dossierStatusEl.classList.remove('ghost');

      this.dossierTitleEl.textContent = m.name;
      addMeta('DISTRICT', m.arrondissement);
      addMeta('ARCHITECTURAL STYLE', m.style);
      this.dossierDescEl.textContent = m.description;
    }

    this.dossierCardEl.classList.add('visible');
  }

  public setOpacityValue(opacity: number): void {
    const clamped = Math.max(0.0, Math.min(1.0, opacity));
    this.opacitySlider.value = String(clamped);
  }
}
