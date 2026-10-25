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
import {
  A2uiComponentDef,
  ParisHeroProbe,
  ParisScenarioPresetId,
  ParisSimulationEventLogItem,
  ParisSimulationModeId,
  ParisSimulationPhaseId,
  ParisSimulationReportCard,
  ParisSurfaceSimulation,
  ParisWorldHotspot
} from '../world/ParisSurfaceSimulation';

export type ExperienceModeId = 'learn' | 'plan' | 'simulate';

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
  onFocusWorldPoint?: (x: number, y: number, z: number, colorHex: number) => void;
  onSelectTourStop: (stop: ParisNaturalisationTourStop | null) => void;
}

type ExplorerTabId = 'stations' | 'monuments' | 'arrondissements' | 'tour' | 'sim';
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
  },
  // Porto Monuments
  'monument-dom-luis-bridge': {
    heightMeters: 85,
    era: 'empire1900',
    eraLabel: 'Seyrig Double-Deck Iron Arch • 1886',
    connectedLines: ['D'],
    svgPaths: ['M2 7 L22 7 M2 17 L22 17 M4 19 Q12 5 20 19'],
    silhouettePath: 'M2 12 L30 12 L30 15 L2 15 Z M2 34 L30 34 M4 48 Q16 10 28 48'
  },
  'monument-clerigos-tower': {
    heightMeters: 76,
    era: 'medieval',
    eraLabel: 'Nasoni Baroque Granite Campanile • 1763',
    connectedLines: ['D', 'A', 'B', 'C', 'E', 'F'],
    svgPaths: ['M9 20 L9 12 L10.5 7 L12 2 L13.5 7 L15 12 L15 20 Z'],
    silhouettePath: 'M9 48 L9 26 L11 26 L11 16 L13 10 L16 2 L19 10 L21 16 L21 26 L23 26 L23 48 Z'
  },
  'monument-sao-bento-station': {
    heightMeters: 32,
    era: 'gares',
    eraLabel: '20,000 Azulejo Tiles & Beaux-Arts • 1916',
    connectedLines: ['D'],
    svgPaths: ['M3 19 L3 9 L7 6 L17 6 L21 9 L21 19 Z M8 19 L8 12 A4 4 0 0 1 16 12 L16 19'],
    silhouettePath: 'M2 48 L2 18 L8 10 L24 10 L30 18 L30 48 Z'
  },
  'monument-casa-da-musica': {
    heightMeters: 40,
    era: 'modern',
    eraLabel: 'Koolhaas Faceted White Concrete • 2005',
    connectedLines: ['A', 'B', 'C', 'E', 'F', 'G'],
    svgPaths: ['M6 18 L4 11 L9 5 L17 6 L20 12 L16 18 Z'],
    silhouettePath: 'M6 48 L3 26 L10 8 L23 10 L29 28 L24 48 Z'
  },
  'monument-se-do-porto': {
    heightMeters: 48,
    era: 'medieval',
    eraLabel: 'Romanesque Twin-Tower Cathedral • 1110',
    connectedLines: ['D'],
    svgPaths: ['M4 19 L4 6 L8 6 L8 12 L16 12 L16 6 L20 6 L20 19 Z'],
    silhouettePath: 'M4 48 L4 10 L10 10 L10 22 L22 22 L22 10 L28 10 L28 48 Z'
  },
  'monument-palacio-da-bolsa': {
    heightMeters: 34,
    era: 'empire1900',
    eraLabel: 'Neoclassical & Moorish Arab Room • 1842',
    connectedLines: ['D'],
    svgPaths: ['M3 19 L3 10 L12 5 L21 10 L21 19 Z'],
    silhouettePath: 'M3 48 L3 20 L16 10 L29 20 L29 48 Z'
  },
  'monument-livraria-lello': {
    heightMeters: 24,
    era: 'empire1900',
    eraLabel: 'Neo-Gothic Façade & Crimson Stair • 1906',
    connectedLines: ['D', 'A', 'B', 'C', 'E'],
    svgPaths: ['M6 19 L6 6 L9 3 L12 7 L15 3 L18 6 L18 19 Z'],
    silhouettePath: 'M7 48 L7 12 L11 4 L16 12 L21 4 L25 12 L25 48 Z'
  },
  'monument-port-wine-lodges': {
    heightMeters: 36,
    era: 'medieval',
    eraLabel: 'Gaia Terraced Cellars & Serra do Pilar • 1678',
    connectedLines: ['D'],
    svgPaths: ['M2 19 L2 14 L12 11 L12 19 M12 11 A5 5 0 0 1 22 11 L22 19'],
    silhouettePath: 'M2 48 L2 32 L14 24 L14 16 A7 7 0 0 1 28 16 L28 48 Z'
  },
  // Tokyo Monuments
  'monument-tokyo-tower': {
    heightMeters: 333,
    era: 'modern',
    eraLabel: 'Tachū Naitō Lattice Tower • 1958',
    connectedLines: ['E', 'H'],
    svgPaths: ['M5 20 Q10 12 11 4 L12 1 L13 4 Q14 12 19 20 M7 15 L17 15 M9 10 L15 10'],
    silhouettePath: 'M4 48 Q12 28 14 10 L16 1 L18 10 Q20 28 28 48 Z'
  },
  'monument-tokyo-skytree': {
    heightMeters: 634,
    era: 'modern',
    eraLabel: '634m Neo-Futurist Broadcast Spire • 2012',
    connectedLines: ['Z', 'A'],
    svgPaths: ['M9 20 L10.5 7 L12 1 L13.5 7 L15 20 M9.5 9 L14.5 9 M10 6 L14 6'],
    silhouettePath: 'M10 48 L13 14 L11 12 L14 9 L16 1 L18 9 L21 12 L19 14 L22 48 Z'
  },
  'monument-sensoji-pagoda': {
    heightMeters: 53,
    era: 'medieval',
    eraLabel: 'Asakusa Five-Story Pagoda & Kaminarimon • 645',
    connectedLines: ['G', 'A'],
    svgPaths: ['M6 19 L18 19 M5 15 L19 15 M6 11 L18 11 M7 7 L17 7 M12 2 L12 19'],
    silhouettePath: 'M6 48 L6 10 L12 6 L16 1 L20 6 L26 10 L26 48 Z'
  },
  'monument-tokyo-station': {
    heightMeters: 46,
    era: 'gares',
    eraLabel: 'Tatsuno Red-Brick Imperial Terminus • 1914',
    connectedLines: ['M', 'JY', 'T', 'C'],
    svgPaths: ['M2 19 L2 11 L6 7 L10 11 L14 11 L18 7 L22 11 L22 19 Z'],
    silhouettePath: 'M2 48 L2 20 L7 10 L12 20 L20 20 L25 10 L30 20 L30 48 Z'
  },
  'monument-meiji-jingu-torii': {
    heightMeters: 36,
    era: 'empire1900',
    eraLabel: 'Myōjin Hinoki Cypress Grand Torii • 1920',
    connectedLines: ['JY', 'C', 'F'],
    svgPaths: ['M3 6 Q12 4 21 6 M5 10 L19 10 M7 6 L7 20 M17 6 L17 20'],
    silhouettePath: 'M2 10 Q16 6 30 10 L30 14 L24 14 L24 48 L20 48 L20 14 L12 14 L12 48 L8 48 L8 14 L2 14 Z'
  },
  'monument-imperial-palace': {
    heightMeters: 38,
    era: 'medieval',
    eraLabel: 'Edo Castle Fujimi-yagura & Nijūbashi • 1659',
    connectedLines: ['C', 'M', 'T'],
    svgPaths: ['M3 19 L8 12 L16 12 L21 19 M8 12 L10 5 L14 5 L16 12'],
    silhouettePath: 'M3 48 L7 26 L11 10 L21 10 L25 26 L29 48 Z'
  },
  'monument-cocoon-tower': {
    heightMeters: 204,
    era: 'modern',
    eraLabel: 'Tange Shinjuku Diagrid Cocoon • 2008',
    connectedLines: ['JY', 'M', 'E'],
    svgPaths: ['M9 20 C6 14 6 7 9 3 L15 3 C18 7 18 14 15 20 Z M8 6 L16 17 M16 6 L8 17'],
    silhouettePath: 'M10 48 C6 32 6 14 11 3 L21 3 C26 14 26 32 22 48 Z'
  },
  'monument-rainbow-bridge': {
    heightMeters: 126,
    era: 'modern',
    eraLabel: 'Tokyo Bay Suspension Bridge • 1993',
    connectedLines: ['JY', 'A', 'E'],
    svgPaths: ['M5 19 L5 6 M19 19 L19 6 M2 14 L22 14 M2 12 Q12 6 22 12'],
    silhouettePath: 'M5 48 L5 10 L8 10 L8 48 M24 48 L24 10 L27 10 L27 48 M2 30 L30 30'
  },
  // San Francisco Monuments
  'monument-golden-gate-bridge': {
    heightMeters: 227,
    era: 'empire1900',
    eraLabel: 'International Orange Art Deco Towers • 1937',
    connectedLines: ['CA', 'PH'],
    svgPaths: ['M5 20 L5 4 M19 20 L19 4 M2 14 L22 14 M2 6 Q12 14 22 6'],
    silhouettePath: 'M5 48 L5 4 L9 4 L9 48 M23 48 L23 4 L27 4 L27 48 M2 28 L30 28'
  },
  'monument-transamerica-pyramid': {
    heightMeters: 260,
    era: 'modern',
    eraLabel: 'Pereira Quartz-Aggregate Pyramid • 1972',
    connectedLines: ['BART-Y', 'BART-R', 'CA', 'F', 'T'],
    svgPaths: ['M6 20 L12 2 L18 20 Z M8 12 L16 12'],
    silhouettePath: 'M5 48 L12 18 L10 18 L10 12 L13 12 L16 1 L19 12 L22 12 L22 18 L20 18 L27 48 Z'
  },
  'monument-coit-tower': {
    heightMeters: 64,
    era: 'empire1900',
    eraLabel: 'Telegraph Hill Art Deco Fluted Column • 1933',
    connectedLines: ['F', 'PH'],
    svgPaths: ['M6 20 L6 16 L9 16 L9 5 L11 3 L13 3 L15 5 L15 16 L18 16 L18 20 Z'],
    silhouettePath: 'M6 48 L6 36 L11 36 L11 8 L13 3 L19 3 L21 8 L21 36 L26 36 L26 48 Z'
  },
  'monument-ferry-building': {
    heightMeters: 75,
    era: 'gares',
    eraLabel: 'Embarcadero Beaux-Arts Clock Tower • 1898',
    connectedLines: ['BART-Y', 'BART-R', 'J', 'KLM', 'N', 'F', 'CA'],
    svgPaths: ['M2 19 L2 14 L10 14 L10 5 L12 2 L14 5 L14 14 L22 14 L22 19 Z'],
    silhouettePath: 'M2 48 L2 32 L13 32 L13 10 L16 2 L19 10 L19 32 L30 32 L30 48 Z'
  },
  'monument-palace-of-fine-arts': {
    heightMeters: 49,
    era: 'empire1900',
    eraLabel: 'Maybeck Greco-Roman Rotunda & Peristyle • 1915',
    connectedLines: ['F', 'PH'],
    svgPaths: ['M4 19 L4 11 M20 19 L20 11 M7 19 L7 10 A5 5 0 0 1 17 10 L17 19'],
    silhouettePath: 'M3 48 L3 24 L8 24 L8 18 A8 8 0 0 1 24 18 L24 24 L29 24 L29 48 Z'
  },
  'monument-salesforce-tower': {
    heightMeters: 326,
    era: 'modern',
    eraLabel: 'Pelli Tapering Obelisk & Rooftop Park • 2018',
    connectedLines: ['BART-Y', 'BART-R', 'J', 'KLM', 'N', 'F'],
    svgPaths: ['M8 20 L9.5 4 Q12 2 14.5 4 L16 20 Z'],
    silhouettePath: 'M9 48 L11 6 Q16 1 21 6 L23 48 Z'
  },
  'monument-painted-ladies': {
    heightMeters: 22,
    era: 'empire1900',
    eraLabel: 'Alamo Square Postcard Row Victorians • 1892',
    connectedLines: ['J', 'KLM', 'N'],
    svgPaths: ['M2 19 L2 10 L5 6 L8 10 L11 6 L14 10 L17 6 L20 10 L22 8 L22 19 Z'],
    silhouettePath: 'M2 48 L2 20 L6 10 L10 20 L14 10 L18 20 L22 10 L26 20 L30 12 L30 48 Z'
  },
  'monument-alcatraz-island': {
    heightMeters: 41,
    era: 'empire1900',
    eraLabel: 'The Rock Cellhouse & 1854 Lighthouse • 1934',
    connectedLines: ['F', 'PH'],
    svgPaths: ['M2 18 L5 13 L16 13 L16 6 L18 3 L20 6 L20 13 L22 18 Z'],
    silhouettePath: 'M2 48 L5 30 L18 30 L19 10 L21 4 L23 10 L24 30 L30 48 Z'
  },
  // Rio de Janeiro Monuments
  'monument-christ-redeemer': {
    heightMeters: 38,
    era: 'empire1900',
    eraLabel: 'Landowski Soapstone Art Deco • 1931',
    connectedLines: ['L1', 'L2'],
    svgPaths: ['M8 20 L10 14 L10 8 L4 8 L4 6 L10 6 L10 3 L14 3 L14 6 L20 6 L20 8 L14 8 L14 14 L16 20 Z'],
    silhouettePath: 'M6 48 L11 32 L13 12 L4 12 L4 8 L13 8 L14 2 L18 2 L19 8 L28 8 L28 12 L19 12 L21 32 L26 48 Z'
  },
  'monument-sugarloaf': {
    heightMeters: 396,
    era: 'empire1900',
    eraLabel: 'Pão de Açúcar & Bondinho Cableway • 1912',
    connectedLines: ['L1', 'L2'],
    svgPaths: ['M2 19 Q6 11 10 19 M12 19 Q17 4 22 19 M6 13 L17 6'],
    silhouettePath: 'M2 48 Q8 22 14 48 M14 48 Q22 6 30 48 Z'
  },
  'monument-maracana': {
    heightMeters: 32,
    era: 'modern',
    eraLabel: 'World Cup & Olympic Bowl • 1950',
    connectedLines: ['L2'],
    svgPaths: ['M3 14 Q12 8 21 14 L19 19 Q12 21 5 19 Z'],
    silhouettePath: 'M2 30 Q16 18 30 30 L27 48 L5 48 Z'
  },
  'monument-museum-tomorrow': {
    heightMeters: 28,
    era: 'modern',
    eraLabel: 'Calatrava Solar Cantilever • 2015',
    connectedLines: ['L1', 'VLT1', 'VLT2'],
    svgPaths: ['M2 15 L22 9 L18 18 L5 18 Z'],
    silhouettePath: 'M2 34 L30 18 L24 48 L6 48 Z'
  },
  'monument-arcos-lapa': {
    heightMeters: 18,
    era: 'medieval',
    eraLabel: '42-Arch Aqueduct & 1896 Bonde • 1750',
    connectedLines: ['L1', 'L2', 'BONDE'],
    svgPaths: ['M2 19 L2 10 L22 10 L22 19 M6 19 A2 4 0 0 1 10 19 M14 19 A2 4 0 0 1 18 19'],
    silhouettePath: 'M2 48 L2 20 L30 20 L30 48 Z'
  },
  'monument-catedral-sao-sebastiao': {
    heightMeters: 75,
    era: 'modern',
    eraLabel: 'Fonseca Brutalist Mayan Cone • 1979',
    connectedLines: ['L1', 'L2', 'VLT1', 'VLT2'],
    svgPaths: ['M5 19 L9 4 L15 4 L19 19 Z M12 4 L12 19'],
    silhouettePath: 'M4 48 L11 6 L21 6 L28 48 Z'
  },
  'monument-theatro-municipal': {
    heightMeters: 42,
    era: 'empire1900',
    eraLabel: 'Cinelândia Beaux-Arts Opera • 1909',
    connectedLines: ['L1', 'L2', 'VLT1'],
    svgPaths: ['M3 19 L3 11 L7 8 L17 8 L21 11 L21 19 Z M8 8 A4 4 0 0 1 16 8'],
    silhouettePath: 'M3 48 L3 22 L9 14 A7 7 0 0 1 23 14 L29 22 L29 48 Z'
  },
  'monument-sambodromo': {
    heightMeters: 30,
    era: 'modern',
    eraLabel: 'Oscar Niemeyer Apoteose Arch • 1984',
    connectedLines: ['L1'],
    svgPaths: ['M4 19 L6 9 L12 14 L18 9 L20 19'],
    silhouettePath: 'M3 48 L7 12 L16 26 L25 12 L29 48 Z'
  },
  'monument-central-do-brasil': {
    heightMeters: 110,
    era: 'gares',
    eraLabel: '110m Art Deco Clock Terminus • 1943',
    connectedLines: ['L1', 'L2', 'VLT2'],
    svgPaths: ['M4 19 L4 14 L9 14 L9 4 L12 2 L15 4 L15 14 L20 14 L20 19 Z'],
    silhouettePath: 'M3 48 L3 32 L11 32 L11 8 L16 2 L21 8 L21 32 L29 32 L29 48 Z'
  },
  'monument-copacabana-palace': {
    heightMeters: 35,
    era: 'empire1900',
    eraLabel: 'Avenida Atlântica & Burle Marx • 1923',
    connectedLines: ['L1', 'L4'],
    svgPaths: ['M2 19 L2 10 L7 7 L12 10 L17 7 L22 10 L22 19 Z'],
    silhouettePath: 'M2 48 L2 20 L8 14 L16 8 L24 14 L30 20 L30 48 Z'
  },
  // Warsaw Monuments
  'monument-palace-culture': {
    heightMeters: 237,
    era: 'modern',
    eraLabel: 'PKiN Stepped Spire & Renaissance Attic • 1955',
    connectedLines: ['M1', 'M2', 'S1', 'WKD', 'T9', 'T26'],
    svgPaths: ['M4 20 L4 14 L7 14 L7 9 L10 9 L10 5 L12 1 L14 5 L14 9 L17 9 L17 14 L20 14 L20 20 Z'],
    silhouettePath: 'M3 48 L3 34 L7 34 L7 22 L11 22 L11 10 L15.5 10 L16 1 L16.5 10 L21 10 L21 22 L25 22 L25 34 L29 34 L29 48 Z'
  },
  'monument-royal-castle': {
    heightMeters: 60,
    era: 'medieval',
    eraLabel: 'Zamek Królewski & Sigismund Column • 1644',
    connectedLines: ['M1', 'M2', 'T26'],
    svgPaths: ['M3 19 L3 12 L9 12 L12 3 L15 12 L21 12 L21 19 Z M2 19 L2 8'],
    silhouettePath: 'M3 48 L3 24 L11 24 L14 12 L16 3 L18 12 L21 24 L29 24 L29 48 Z'
  },
  'monument-lazienki-palace': {
    heightMeters: 24,
    era: 'medieval',
    eraLabel: 'Stanislawian Neoclassical Palace on the Isle • 1793',
    connectedLines: ['M1', 'T9'],
    svgPaths: ['M2 18 L22 18 M4 18 L4 11 L9 11 A3 3 0 0 1 15 11 L20 11 L20 18'],
    silhouettePath: 'M2 48 L2 24 L10 24 L10 16 A6 6 0 0 1 22 16 L22 24 L30 24 L30 48 Z'
  },
  'monument-warszawa-centralna': {
    heightMeters: 310,
    era: 'modern',
    eraLabel: 'Centralna Cantilever & 310m Varso Tower • 1975',
    connectedLines: ['M1', 'M2', 'S1', 'WKD', 'T9'],
    svgPaths: ['M2 19 L2 14 L12 14 L12 19 M14 19 L14 5 L16 1 L18 5 L18 19 Z'],
    silhouettePath: 'M2 48 L2 34 L15 34 L15 8 L19 8 L20 1 L21 8 L25 8 L25 48 Z'
  },
  'monument-stadion-narodowy': {
    heightMeters: 113,
    era: 'modern',
    eraLabel: 'PGE Narodowy Red-and-White Crown & Spire • 2012',
    connectedLines: ['M2', 'M3', 'S1', 'T9'],
    svgPaths: [
      'M5 19 L2.5 10 L21.5 10 L19 19 Z M6 19 L4.5 9 M10 19 L9 9 M14 19 L15 9 M18 19 L19.5 9 M12 2 L12 12'
    ],
    silhouettePath:
      'M6 48 L2 22 L4 18 L6 24 L10 18 L12 24 L15.5 24 L16 2 L16.5 24 L20 24 L22 18 L26 24 L28 18 L30 22 L26 48 Z'
  },
  'monument-stare-miasto-siren': {
    heightMeters: 32,
    era: 'medieval',
    eraLabel: 'Old Town Market Place & Syrenka • 1855',
    connectedLines: ['M1', 'M2', 'T26'],
    svgPaths: ['M2 19 L2 9 L6 6 L10 9 L14 6 L18 9 L22 6 L22 19 Z M12 19 L12 11'],
    silhouettePath: 'M2 48 L2 18 L7 10 L12 18 L16 10 L21 18 L26 10 L30 18 L30 48 Z'
  },
  'monument-wilanow-palace': {
    heightMeters: 28,
    era: 'medieval',
    eraLabel: 'King Jan III Sobieski Polish Baroque • 1696',
    connectedLines: ['M1'],
    svgPaths: ['M2 19 L2 8 L6 5 L6 12 L18 12 L18 5 L22 8 L22 19 Z'],
    silhouettePath: 'M2 48 L2 14 L7 6 L10 14 L10 24 L22 24 L22 14 L25 6 L30 14 L30 48 Z'
  },
  'monument-polin-uprising': {
    heightMeters: 26,
    era: 'modern',
    eraLabel: 'Lahdelma & Mahlamäki Glass Canyon & Ghetto Stele • 2013',
    connectedLines: ['M1', 'T26'],
    svgPaths: ['M3 19 L3 7 L15 7 L15 19 M8 7 Q10 13 7 19 M18 19 L19 8 L21 8 L22 19 Z'],
    silhouettePath: 'M3 48 L3 12 L21 12 L21 48 M24 48 L25 14 L29 14 L30 48 Z'
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

  // 3-Tab Top-Level Experience Mode ('learn' | 'plan' | 'simulate') + Race Condition Controls + A2UI Report Card
  private experienceMode: ExperienceModeId = 'learn';
  private selectedPlanScenario: ParisSimulationModeId = 'marathon';
  private selectedDurationSec = 60;
  private expTabBtns: Map<ExperienceModeId, HTMLButtonElement> = new Map();
  private expLockNoticeEl!: HTMLElement;
  private expLockNoticeTimer: ReturnType<typeof setTimeout> | null = null;
  private lineDockEl!: HTMLElement;
  private explorerSearchRowEl!: HTMLElement;
  private explorerTabsHeaderEl!: HTMLElement;
  private historicalTimelineConsoleEl!: HTMLElement;
  private simBottomConsoleEl!: HTMLElement;
  private simPlanConfigSectionEl!: HTMLElement;
  private simLiveRunSectionEl!: HTMLElement;
  private simDurationPillBtns: Map<number, HTMLButtonElement> = new Map();
  private simDurationSliderEl!: HTMLInputElement;
  private simDurationReadoutEl!: HTMLElement;
  private simLaunchLiveBtnEl!: HTMLButtonElement;
  private rcPauseBtns: HTMLButtonElement[] = [];
  private rcSpeedBtns: Map<1 | 2 | 4, HTMLButtonElement[]> = new Map();
  private rcProgressBarFillEls: HTMLElement[] = [];
  private rcTimerReadoutEls: HTMLElement[] = [];
  private rcSimHoursReadoutEls: HTMLElement[] = [];
  private rcStatusPillEls: HTMLElement[] = [];
  private rcOpenReportBtns: HTMLButtonElement[] = [];
  private a2uiReportModalEl!: HTMLElement;
  private a2uiActiveTabIdx = 0;

  // Tab 5: Paris Multi-Modal City Simulation, Two-Phase Workflow & 3D World Callouts
  private surfaceSimulation: ParisSurfaceSimulation | null = null;
  private simModeBtns: Map<ParisSimulationModeId, HTMLButtonElement> = new Map();
  private topSimPhaseWrapEl!: HTMLElement;
  private topPhasePlanningBtnEl!: HTMLButtonElement;
  private topPhaseLiveBtnEl!: HTMLButtonElement;
  private topSimSummaryBadgeEl!: HTMLElement;
  private simStopBtnEl!: HTMLButtonElement;
  private simActiveSubTab: 'hotspots' | 'events' | 'agents' = 'hotspots';
  private simSubTabBtns: Map<'hotspots' | 'events' | 'agents', HTMLButtonElement> = new Map();
  private simSubTabPanes: Map<'hotspots' | 'events' | 'agents', HTMLElement> = new Map();
  private simWorldCalloutLayerEl!: HTMLElement;
  private simHotspotPinEls: Map<string, { el: HTMLElement; hotspot: ParisWorldHotspot }> = new Map();
  private simPhasePlanningBtnEl!: HTMLButtonElement;
  private simPhaseLiveBtnEl!: HTMLButtonElement;
  private simPhaseStatusBannerEl!: HTMLElement;
  private simMitigationBtnEl!: HTMLButtonElement;
  private simDomainTitleEl!: HTMLElement;
  private simDomainDescEl!: HTMLElement;
  private simKpiCells: { labelEl: HTMLElement; valEl: HTMLElement; cellEl: HTMLElement }[] = [];
  private simScenarioBtns: Map<ParisScenarioPresetId, HTMLButtonElement> = new Map();
  private simTrafficLightsBtn!: HTMLButtonElement;
  private simCongestionBtn!: HTMLButtonElement;
  private simMarathonBtn!: HTMLButtonElement;
  private simBarriersBtn!: HTMLButtonElement;
  private simProbesBtn!: HTMLButtonElement;
  private simEventLogHeaderEl!: HTMLElement;
  private simEventLogListEl!: HTMLElement;
  private simHotspotsHeaderEl!: HTMLElement;
  private simHotspotsListEl!: HTMLElement;
  private simProbesListEl!: HTMLElement;
  private simMacroListEl!: HTMLElement;
  private activeHeroProbeId = 'probe-runner-elodie';
  private activeHotspotId = '';
  private simUiRefreshAccum = 0.0;

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

    // 3D-Projected Simulation Warning & Event Callout Layer (renders directly over the 3D Paris map)
    this.simWorldCalloutLayerEl = createEl('div', 'sim-world-callout-layer');
    container.appendChild(this.simWorldCalloutLayerEl);

    // Main HUD flex container
    const hudLayer = createEl('div', 'hud-layer');
    hudLayer.appendChild(this.buildTopBar());
    hudLayer.appendChild(this.buildMiddleArea());
    hudLayer.appendChild(this.buildBottomTimelineBar());
    container.appendChild(hudLayer);

    // A2UI Post-Simulation Report Card Modal Overlay
    this.a2uiReportModalEl = createEl('div', 'a2ui-report-modal-backdrop');
    this.a2uiReportModalEl.style.display = 'none';
    container.appendChild(this.a2uiReportModalEl);

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

    // 1. Top-Left 3-Mode Experience Switcher: [📖 1. Learn] | [📋 2. Plan] | [⚡ 3. Simulate]
    if (ACTIVE_CITY_ID === 'paris') {
      const expDockWrap = createEl('div', 'exp-mode-dock-wrap hud-interactive');
      const expDock = createEl('nav', 'deco-panel exp-mode-bar');
      expDock.setAttribute('aria-label', 'Experience Mode');
      attachDecoCorners(expDock);
      expDock.appendChild(createEl('span', 'city-selector-label', 'MODE'));

      const tabsRow = createEl('div', 'exp-mode-tabs-row');
      const modeTabs: { id: ExperienceModeId; label: string; title: string }[] = [
        {
          id: 'learn',
          label: '📖 1. Learn',
          title: 'Explore stations, monuments, districts, walking tours, and 1900–2026 history'
        },
        {
          id: 'plan',
          label: '📋 2. Plan',
          title: 'Choose a city simulation scenario, pick run duration, and inspect 3D forecast warnings'
        },
        {
          id: 'simulate',
          label: '🔒 3. Simulate',
          title: 'Run live simulation with Race Condition controls and generate an A2UI Report Card (Launch from Plan mode)'
        }
      ];

      this.expTabBtns.clear();
      for (const mt of modeTabs) {
        const btn = createEl(
          'button',
          `exp-mode-tab-btn${mt.id === this.experienceMode ? ' active' : ''}${mt.id === 'simulate' ? ' locked' : ''}`,
          mt.label
        );
        btn.type = 'button';
        btn.title = mt.title;
        btn.addEventListener('click', () => {
          this.handleExperienceModeTabClick(mt.id);
        });
        this.expTabBtns.set(mt.id, btn);
        tabsRow.appendChild(btn);
      }
      expDock.appendChild(tabsRow);
      expDockWrap.appendChild(expDock);

      this.expLockNoticeEl = createEl('div', 'exp-lock-notice-toast');
      this.expLockNoticeEl.style.display = 'none';
      expDockWrap.appendChild(this.expLockNoticeEl);

      topBar.appendChild(expDockWrap);
    }

    // 2. Top-Right Collapsible City Selector Drawer (compact pill, expands on hover)
    const cityBar = createEl(
      'nav',
      'deco-panel city-selector-bar collapsible-city-picker hud-interactive'
    );
    cityBar.setAttribute('aria-label', 'City Selector');
    attachDecoCorners(cityBar);

    const citySummaryHeader = createEl('div', 'city-selector-summary-header');
    const citySummaryLeft = createEl('div', 'city-selector-summary-left');
    citySummaryLeft.appendChild(createEl('span', 'city-selector-globe-icon', '🌐'));
    citySummaryLeft.appendChild(createEl('span', 'city-selector-label', 'CITY'));

    const citySummaryRight = createEl('div', 'city-selector-summary-right');
    const activeCityBadge = createEl('span', 'city-selector-active-pill');
    activeCityBadge.appendChild(
      createEl('span', 'city-selector-name', ACTIVE_CITY_META.label)
    );
    activeCityBadge.appendChild(
      createEl('span', 'city-selector-code', ACTIVE_CITY_META.shortCode)
    );
    const cityChevron = createEl('span', 'city-selector-chevron', '▾');
    citySummaryRight.appendChild(activeCityBadge);
    citySummaryRight.appendChild(cityChevron);

    citySummaryHeader.appendChild(citySummaryLeft);
    citySummaryHeader.appendChild(citySummaryRight);
    cityBar.appendChild(citySummaryHeader);

    const cityDrawerBody = createEl('div', 'city-selector-drawer-body');
    const cityPills = createEl('div', 'city-selector-pills');
    for (const city of SELECTABLE_CITIES) {
      const isCurrent = city.id === ACTIVE_CITY_ID;
      const btn = createEl(
        'button',
        `city-selector-btn${isCurrent ? ' active' : ''}`
      );
      btn.type = 'button';
      btn.title = `Switch to ${city.label}, ${city.country} (${city.vibeBadge})`;
      btn.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
      btn.appendChild(createEl('span', 'city-selector-name', city.label));
      btn.appendChild(createEl('span', 'city-selector-code', city.shortCode));
      btn.addEventListener('click', () => {
        switchActiveCity(city.id);
      });
      cityPills.appendChild(btn);
    }
    cityDrawerBody.appendChild(cityPills);
    cityBar.appendChild(cityDrawerBody);
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
    } else if (ACTIVE_CITY_ID === 'porto') {
      // Portuguese Cobalt-Blue & Gold Azulejo Ceramic Tile Rosette
      const frame = document.createElementNS(ns, 'rect');
      frame.setAttribute('x', '4');
      frame.setAttribute('y', '4');
      frame.setAttribute('width', '28');
      frame.setAttribute('height', '28');
      frame.setAttribute('rx', '2');
      frame.setAttribute('fill', 'none');
      frame.setAttribute('stroke', '#4ea8de');
      frame.setAttribute('stroke-width', '1.8');
      svg.appendChild(frame);

      const diamond = document.createElementNS(ns, 'path');
      diamond.setAttribute('d', 'M18 5 L31 18 L18 31 L5 18 Z');
      diamond.setAttribute('fill', 'none');
      diamond.setAttribute('stroke', '#e0a938');
      diamond.setAttribute('stroke-width', '1.6');
      svg.appendChild(diamond);

      const petals = document.createElementNS(ns, 'path');
      petals.setAttribute(
        'd',
        'M18 9 Q23 18 18 27 Q13 18 18 9 Z M9 18 Q18 13 27 18 Q18 23 9 18 Z'
      );
      petals.setAttribute('fill', 'none');
      petals.setAttribute('stroke', '#f8fbff');
      petals.setAttribute('stroke-width', '1.5');
      svg.appendChild(petals);
    } else if (ACTIVE_CITY_ID === 'tokyo') {
      // Shinto Vermilion Torii Gate & Crimson Sun Disc
      const sun = document.createElementNS(ns, 'circle');
      sun.setAttribute('cx', '18');
      sun.setAttribute('cy', '19');
      sun.setAttribute('r', '9');
      sun.setAttribute('fill', 'rgba(230, 57, 70, 0.28)');
      sun.setAttribute('stroke', '#f4a261');
      sun.setAttribute('stroke-width', '1.4');
      svg.appendChild(sun);

      const torii = document.createElementNS(ns, 'path');
      torii.setAttribute(
        'd',
        'M4 10 Q18 7 32 10 M7 15 L29 15 M11 10 L11 32 M25 10 L25 32 M18 10 L18 15'
      );
      torii.setAttribute('fill', 'none');
      torii.setAttribute('stroke', '#e63946');
      torii.setAttribute('stroke-width', '2.3');
      torii.setAttribute('stroke-linecap', 'round');
      svg.appendChild(torii);
    } else if (ACTIVE_CITY_ID === 'san-francisco') {
      // Golden Gate International Orange Suspension Towers & Cable Catena
      const cables = document.createElementNS(ns, 'path');
      cables.setAttribute('d', 'M2 14 Q10 24 10 8 Q18 23 26 8 Q26 24 34 14 M2 24 L34 24');
      cables.setAttribute('fill', 'none');
      cables.setAttribute('stroke', '#f05a36');
      cables.setAttribute('stroke-width', '1.8');
      svg.appendChild(cables);

      const towers = document.createElementNS(ns, 'path');
      towers.setAttribute('d', 'M10 6 L10 31 M26 6 L26 31 M4 30 Q18 27 32 30');
      towers.setAttribute('fill', 'none');
      towers.setAttribute('stroke', '#f4b942');
      towers.setAttribute('stroke-width', '2.1');
      towers.setAttribute('stroke-linecap', 'round');
      svg.appendChild(towers);
    } else if (ACTIVE_CITY_ID === 'rio') {
      // Christ the Redeemer Outstretched Arms + Sugarloaf + Burle Marx Copacabana Waves
      const waves = document.createElementNS(ns, 'path');
      waves.setAttribute('d', 'M2 27 Q9 22 18 27 T34 27 M2 32 Q9 27 18 32 T34 32');
      waves.setAttribute('fill', 'none');
      waves.setAttribute('stroke', '#12c47a');
      waves.setAttribute('stroke-width', '2');
      waves.setAttribute('stroke-linecap', 'round');
      svg.appendChild(waves);

      const cristo = document.createElementNS(ns, 'path');
      cristo.setAttribute('d', 'M18 4 L18 22 M9 10 L27 10 M14 22 Q18 16 22 22');
      cristo.setAttribute('fill', 'none');
      cristo.setAttribute('stroke', '#ffda44');
      cristo.setAttribute('stroke-width', '2.2');
      cristo.setAttribute('stroke-linecap', 'round');
      svg.appendChild(cristo);
    } else if (ACTIVE_CITY_ID === 'warsaw') {
      // Warsaw Syrenka Shield & Sword + Stepped PKiN Spire + Vistula River Wave
      const vistula = document.createElementNS(ns, 'path');
      vistula.setAttribute('d', 'M3 30 Q11 26 18 30 T33 30');
      vistula.setAttribute('fill', 'none');
      vistula.setAttribute('stroke', '#e0a93b');
      vistula.setAttribute('stroke-width', '1.9');
      vistula.setAttribute('stroke-linecap', 'round');
      svg.appendChild(vistula);

      const pkin = document.createElementNS(ns, 'path');
      pkin.setAttribute(
        'd',
        'M8 26 L8 20 L12 20 L12 13 L15 13 L15 8 L18 2 L21 8 L21 13 L24 13 L24 20 L28 20 L28 26 Z'
      );
      pkin.setAttribute('fill', 'rgba(220, 20, 60, 0.24)');
      pkin.setAttribute('stroke', '#dc143c');
      pkin.setAttribute('stroke-width', '1.8');
      pkin.setAttribute('stroke-linejoin', 'round');
      svg.appendChild(pkin);
    } else if (ACTIVE_CITY_ID === 'zurich') {
      // Grossmünster Twin Towers + SBB Red Seconds Paddle + Lake Zurich Wave
      const lake = document.createElementNS(ns, 'path');
      lake.setAttribute('d', 'M3 31 Q11 27 18 31 T33 31');
      lake.setAttribute('fill', 'none');
      lake.setAttribute('stroke', '#38b6ff');
      lake.setAttribute('stroke-width', '1.9');
      lake.setAttribute('stroke-linecap', 'round');
      svg.appendChild(lake);

      const towers = document.createElementNS(ns, 'path');
      towers.setAttribute(
        'd',
        'M8 26 L8 10 L11 5 L14 10 L14 26 M22 26 L22 10 L25 5 L28 10 L28 26 M14 18 L22 18'
      );
      towers.setAttribute('fill', 'none');
      towers.setAttribute('stroke', '#f8fafc');
      towers.setAttribute('stroke-width', '1.8');
      towers.setAttribute('stroke-linejoin', 'round');
      svg.appendChild(towers);

      const sbbDot = document.createElementNS(ns, 'circle');
      sbbDot.setAttribute('cx', '18');
      sbbDot.setAttribute('cy', '12');
      sbbDot.setAttribute('r', '2.6');
      sbbDot.setAttribute('fill', '#e30613');
      svg.appendChild(sbbDot);
    } else if (ACTIVE_CITY_ID === 'melbourne') {
      // Flinders Street Dome + Arts Centre Spire + Yarra River Wave
      const yarra = document.createElementNS(ns, 'path');
      yarra.setAttribute('d', 'M3 31 Q11 27 18 31 T33 31');
      yarra.setAttribute('fill', 'none');
      yarra.setAttribute('stroke', '#00a88f');
      yarra.setAttribute('stroke-width', '1.9');
      yarra.setAttribute('stroke-linecap', 'round');
      svg.appendChild(yarra);

      const domeAndSpire = document.createElementNS(ns, 'path');
      domeAndSpire.setAttribute(
        'd',
        'M5 26 L5 18 Q12 8 19 18 L19 26 M12 8 L12 5 M23 26 L27 4 L31 26 Z'
      );
      domeAndSpire.setAttribute('fill', 'rgba(244, 196, 48, 0.20)');
      domeAndSpire.setAttribute('stroke', '#f4c430');
      domeAndSpire.setAttribute('stroke-width', '1.8');
      domeAndSpire.setAttribute('stroke-linejoin', 'round');
      svg.appendChild(domeAndSpire);
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
          : ACTIVE_CITY_ID === 'porto'
            ? 'INVICTA • AZULEJO & RIO DOURO'
            : ACTIVE_CITY_ID === 'tokyo'
              ? 'EDO SHINTO • NEO-TOKYO METROPOLIS'
              : ACTIVE_CITY_ID === 'san-francisco'
                ? 'GOLDEN GATE • BAY & CABLE CARS'
                : ACTIVE_CITY_ID === 'rio'
                  ? 'CIDADE MARAVILHOSA • CARNAVAL & SAMBA'
                  : ACTIVE_CITY_ID === 'warsaw'
                    ? 'MIASTO STOŁECZNE WARSZAWA • SYRENKA'
                    : ACTIVE_CITY_ID === 'zurich'
                      ? 'ZÜRICH • LIMMAT, S-BAHN & ALPINE GRID'
                      : ACTIVE_CITY_ID === 'melbourne'
                        ? 'MARVELLOUS MELBOURNE • NAARM / YARRA'
                        : 'PARIS MÉTROPOLITAIN • LUMIÈRE';
    const subStr =
      ACTIVE_CITY_ID === 'sydney'
        ? 'Aboriginal Dot-Art, Red Ochre & Sandstone'
        : ACTIVE_CITY_ID === 'nyc'
          ? 'Chrysler Sunburst • Vignelli Subway Modernism'
          : ACTIVE_CITY_ID === 'porto'
            ? 'Cobalt-Blue Ceramic Tilework & Talha Dourada Gold'
            : ACTIVE_CITY_ID === 'tokyo'
              ? 'Shu-iro Vermilion Torii • Tokyo Metro & Yamanote'
              : ACTIVE_CITY_ID === 'san-francisco'
                ? 'International Orange Art Deco • Victorian Hills & Fog'
                : ACTIVE_CITY_ID === 'rio'
                  ? 'Burle Marx Copacabana Waves • Corcovado & Sugarloaf'
                  : ACTIVE_CITY_ID === 'warsaw'
                    ? 'Old Town Sgraffito • Chopin Amber & Vistula Escarpment'
                    : ACTIVE_CITY_ID === 'zurich'
                      ? 'Swiss Typographic Grid • SBB Clock Red & Lake Zurich'
                      : ACTIVE_CITY_ID === 'melbourne'
                        ? 'W-Class Tram Green & Gold • Bluestone & Fed Square'
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
    } else if (ACTIVE_CITY_ID === 'tokyo') {
      const bullets = createEl('div', 'nyc-vignelli-bullets');
      const tyoDots: { label: string; bg: string }[] = [
        { label: 'G', bg: '#FF9500' },
        { label: 'M', bg: '#F62E36' },
        { label: 'JY', bg: '#9ACD32' }
      ];
      for (const d of tyoDots) {
        const b = createEl('span', 'nyc-vignelli-bullet', d.label);
        b.style.backgroundColor = d.bg;
        bullets.appendChild(b);
      }
      banner.appendChild(bullets);
    } else if (ACTIVE_CITY_ID === 'rio') {
      const bullets = createEl('div', 'nyc-vignelli-bullets');
      const rioDots: { label: string; bg: string }[] = [
        { label: 'L1', bg: '#f37021' },
        { label: 'L2', bg: '#00a859' },
        { label: 'L4', bg: '#ffcb05' }
      ];
      for (const d of rioDots) {
        const b = createEl('span', 'nyc-vignelli-bullet', d.label);
        b.style.backgroundColor = d.bg;
        if (d.label === 'L4') b.style.color = '#10141c';
        bullets.appendChild(b);
      }
      banner.appendChild(bullets);
    } else if (ACTIVE_CITY_ID === 'warsaw') {
      const bullets = createEl('div', 'nyc-vignelli-bullets');
      const wawDots: { label: string; bg: string }[] = [
        { label: 'M1', bg: '#0056A3' },
        { label: 'M2', bg: '#E31E24' },
        { label: 'S1', bg: '#F39200' }
      ];
      for (const d of wawDots) {
        const b = createEl('span', 'nyc-vignelli-bullet', d.label);
        b.style.backgroundColor = d.bg;
        if (d.label === 'S1') b.style.color = '#10141c';
        bullets.appendChild(b);
      }
      banner.appendChild(bullets);
    } else if (ACTIVE_CITY_ID === 'zurich') {
      const bullets = createEl('div', 'nyc-vignelli-bullets');
      const zrhDots: { label: string; bg: string }[] = [
        { label: 'S2', bg: '#00529b' },
        { label: 'S10', bg: '#f39200' },
        { label: 'T4', bg: '#1f4e8c' }
      ];
      for (const d of zrhDots) {
        const b = createEl('span', 'nyc-vignelli-bullet', d.label);
        b.style.backgroundColor = d.bg;
        if (d.label === 'S10') b.style.color = '#10141c';
        bullets.appendChild(b);
      }
      banner.appendChild(bullets);
    } else if (ACTIVE_CITY_ID === 'melbourne') {
      const bullets = createEl('div', 'nyc-vignelli-bullets');
      const melDots: { label: string; bg: string }[] = [
        { label: 'CL', bg: '#0072ce' },
        { label: 'MT', bg: '#00a8e8' },
        { label: '35', bg: '#78be20' }
      ];
      for (const d of melDots) {
        const b = createEl('span', 'nyc-vignelli-bullet', d.label);
        b.style.backgroundColor = d.bg;
        if (d.label === 'MT' || d.label === '35') b.style.color = '#10141c';
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
    this.lineDockEl = lineDock;
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

    // Top Unified Search Bar (appears above the Stations / Monuments / Arrondissements / Tour tab selector in Learn mode)
    const searchRow = createEl('div', 'station-search-row explorer-top-search-row');
    this.explorerSearchRowEl = searchRow;
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

    // Explorer Mode Switcher Header (Stations / Monuments / Arrondissements / Tour — visible in Learn mode)
    const topTabHeader = createEl('div', 'explorer-tabs-header');
    this.explorerTabsHeaderEl = topTabHeader;
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
    const simPane = this.buildSimulationExplorerPane();

    this.explorerPaneEls.set('stations', stationsPane);
    this.explorerPaneEls.set('monuments', monumentsPane);
    this.explorerPaneEls.set('arrondissements', arrondissementsPane);
    this.explorerPaneEls.set('tour', tourPane);
    this.explorerPaneEls.set('sim', simPane);

    this.explorerBodyWrapEl.appendChild(stationsPane);
    this.explorerBodyWrapEl.appendChild(monumentsPane);
    this.explorerBodyWrapEl.appendChild(arrondissementsPane);
    this.explorerBodyWrapEl.appendChild(tourPane);
    this.explorerBodyWrapEl.appendChild(simPane);
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

  // ── 3-Tab Experience Mode State Machine (Learn -> Plan -> Simulate) ────────

  private showExperienceLockToast(message: string): void {
    if (!this.expLockNoticeEl) return;
    this.expLockNoticeEl.textContent = message;
    this.expLockNoticeEl.style.display = 'block';
    if (this.expLockNoticeTimer) {
      clearTimeout(this.expLockNoticeTimer);
    }
    this.expLockNoticeTimer = setTimeout(() => {
      if (this.expLockNoticeEl) {
        this.expLockNoticeEl.style.display = 'none';
      }
    }, 3600);
  }

  public handleExperienceModeTabClick(targetMode: ExperienceModeId): void {
    if (targetMode === this.experienceMode) return;

    // Rule 1: While in SIMULATE mode, you MUST cancel/end the simulation to return to Learn or Plan
    if (this.experienceMode === 'simulate') {
      this.showExperienceLockToast(
        '🔒 Simulation in progress — click "⏹ Cancel / End Simulation" to return to Learn or Plan.'
      );
      return;
    }

    // Rule 2: SIMULATE mode can ONLY be triggered from the PLAN phase via "Launch Simulation"
    if (targetMode === 'simulate') {
      if (this.experienceMode === 'learn') {
        this.setExperienceMode('plan');
        this.showExperienceLockToast(
          '📋 Choose your scenario & run duration in Plan mode, then click "▶ Launch Simulation".'
        );
      } else {
        this.showExperienceLockToast(
          '👉 Pick your scenario & duration on the right, then click "▶ Launch Simulation" to begin!'
        );
        if (this.simLaunchLiveBtnEl) {
          this.simLaunchLiveBtnEl.classList.remove('pulse-attention');
          void this.simLaunchLiveBtnEl.offsetWidth;
          this.simLaunchLiveBtnEl.classList.add('pulse-attention');
        }
      }
      return;
    }

    this.setExperienceMode(targetMode);
  }

  public setExperienceMode(mode: ExperienceModeId): void {
    this.experienceMode = mode;
    if (this.expLockNoticeEl) {
      this.expLockNoticeEl.style.display = 'none';
    }

    // Update top-left 3-Tab buttons and lock badges
    const learnBtn = this.expTabBtns.get('learn');
    const planBtn = this.expTabBtns.get('plan');
    const simBtn = this.expTabBtns.get('simulate');

    if (learnBtn && planBtn && simBtn) {
      learnBtn.classList.toggle('active', mode === 'learn');
      planBtn.classList.toggle('active', mode === 'plan');
      simBtn.classList.toggle('active', mode === 'simulate');

      if (mode === 'simulate') {
        learnBtn.textContent = '🔒 1. Learn';
        learnBtn.classList.add('locked');
        planBtn.textContent = '🔒 2. Plan';
        planBtn.classList.add('locked');
        simBtn.textContent = '⚡ 3. Simulate (Active)';
        simBtn.classList.remove('locked');
      } else {
        learnBtn.textContent = '📖 1. Learn';
        learnBtn.classList.remove('locked');
        planBtn.textContent = '📋 2. Plan';
        planBtn.classList.remove('locked');
        simBtn.textContent = '🔒 3. Simulate';
        simBtn.classList.add('locked');
      }
    }

    if (this.isExplorerCollapsed) {
      this.toggleExplorerCollapsed(false);
    }

    if (mode === 'learn') {
      // Show Learn UI: Left Line Dock, Station Search, 4 Cultural Tabs, and 1900-2026 Timeline
      if (this.lineDockEl) this.lineDockEl.style.display = '';
      if (this.explorerSearchRowEl) this.explorerSearchRowEl.style.display = '';
      if (this.explorerTabsHeaderEl) this.explorerTabsHeaderEl.style.display = '';
      if (this.historicalTimelineConsoleEl) this.historicalTimelineConsoleEl.style.display = '';
      if (this.simBottomConsoleEl) this.simBottomConsoleEl.style.display = 'none';
      if (this.a2uiReportModalEl) this.a2uiReportModalEl.style.display = 'none';

      if (this.activeExplorerTab === 'sim') {
        this.switchExplorerTab('stations');
      } else {
        this.switchExplorerTab(this.activeExplorerTab);
      }

      if (this.surfaceSimulation) {
        this.surfaceSimulation.cancelSimulationRun('learn');
      }
      this.rebuildWorldHotspotCalloutPins();
    } else if (mode === 'plan') {
      // Show Plan UI: Hide station search & 4 learn tab buttons, open the Simulation Plan pane
      if (this.lineDockEl) this.lineDockEl.style.display = '';
      if (this.explorerSearchRowEl) this.explorerSearchRowEl.style.display = 'none';
      if (this.explorerTabsHeaderEl) this.explorerTabsHeaderEl.style.display = 'none';
      if (this.historicalTimelineConsoleEl) this.historicalTimelineConsoleEl.style.display = '';
      if (this.simBottomConsoleEl) this.simBottomConsoleEl.style.display = 'none';
      if (this.a2uiReportModalEl) this.a2uiReportModalEl.style.display = 'none';
      if (this.simPlanConfigSectionEl) this.simPlanConfigSectionEl.style.display = '';
      if (this.simLiveRunSectionEl) this.simLiveRunSectionEl.style.display = 'none';

      this.switchExplorerTab('sim');

      if (this.surfaceSimulation) {
        const curMode = this.surfaceSimulation.getSimulationMode();
        const planScenario = curMode === 'none' ? this.selectedPlanScenario : curMode;
        this.selectedPlanScenario = planScenario;
        this.surfaceSimulation.setTargetDurationSeconds(this.selectedDurationSec);
        this.surfaceSimulation.setSimulationMode(planScenario, 'planning');
      }
      this.rebuildWorldHotspotCalloutPins();
      this.refreshSimulationTelemetryUI();
    } else if (mode === 'simulate') {
      // Show Simulate UI: Race Condition Bottom Console + Live Simulation Right Dock (hide Learn chrome)
      this.setPlaying(false);
      if (this.lineDockEl) this.lineDockEl.style.display = 'none';
      if (this.explorerSearchRowEl) this.explorerSearchRowEl.style.display = 'none';
      if (this.explorerTabsHeaderEl) this.explorerTabsHeaderEl.style.display = 'none';
      if (this.historicalTimelineConsoleEl) this.historicalTimelineConsoleEl.style.display = 'none';
      if (this.simBottomConsoleEl) this.simBottomConsoleEl.style.display = 'flex';
      if (this.simPlanConfigSectionEl) this.simPlanConfigSectionEl.style.display = 'none';
      if (this.simLiveRunSectionEl) this.simLiveRunSectionEl.style.display = '';

      this.switchExplorerTab('sim');

      if (this.surfaceSimulation) {
        this.surfaceSimulation.startLiveSimulationRun(
          this.selectedPlanScenario,
          this.selectedDurationSec
        );
      }
      this.rebuildWorldHotspotCalloutPins();
      this.refreshSimulationTelemetryUI();
    }
  }

  public launchSimulationFromPlan(): void {
    this.setExperienceMode('simulate');
  }

  public cancelOrEndSimulation(returnTo: 'plan' | 'learn' = 'plan'): void {
    if (this.a2uiReportModalEl) {
      this.a2uiReportModalEl.style.display = 'none';
    }
    if (this.surfaceSimulation) {
      this.surfaceSimulation.cancelSimulationRun(returnTo);
    }
    this.setExperienceMode(returnTo);
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

  /**
   * Connects the live ParisSurfaceSimulation instance from VoxelParisBuilder to the HUD
   */
  public setSurfaceSimulation(sim: ParisSurfaceSimulation): void {
    this.surfaceSimulation = sim;
    sim.setTargetDurationSeconds(this.selectedDurationSec);
    sim.onSimulationCompleted = (report) => {
      this.renderAndOpenA2uiReportModal(report);
      this.refreshSimulationTelemetryUI();
    };
    this.rebuildWorldHotspotCalloutPins();
    this.refreshSimulationTelemetryUI();
  }

  /**
   * Switches the active Paris Simulation Mode ('none' | 'traffic' | 'marathon' | 'heatwave' | 'protest' | 'flood' | 'cyberattack')
   * and optional phase ('planning' | 'live').
   */
  public setSimulationMode(mode: ParisSimulationModeId, phase?: ParisSimulationPhaseId): void {
    if (mode !== 'none') {
      this.selectedPlanScenario = mode;
    }
    if (this.surfaceSimulation) {
      this.surfaceSimulation.setSimulationMode(mode, phase);
    }
    this.rebuildWorldHotspotCalloutPins();
    this.refreshSimulationTelemetryUI();
  }

  /**
   * Switches between Phase 1 (Planning & Forecast Warnings) and Phase 2 (Live Simulation & Impact Recording)
   */
  public setSimulationPhase(phase: ParisSimulationPhaseId): void {
    if (this.surfaceSimulation) {
      this.surfaceSimulation.setSimulationPhase(phase);
    }
    this.rebuildWorldHotspotCalloutPins();
    this.refreshSimulationTelemetryUI();
  }

  /**
   * Updates the selected simulation duration (15s - 300s) in Plan mode
   */
  public setSelectedDurationSeconds(seconds: number): void {
    const clamped = Math.max(15, Math.min(300, Math.round(seconds)));
    this.selectedDurationSec = clamped;
    if (this.surfaceSimulation) {
      this.surfaceSimulation.setTargetDurationSeconds(clamped);
    }
    for (const [sec, btn] of this.simDurationPillBtns.entries()) {
      btn.classList.toggle('active', sec === clamped);
    }
    if (this.simDurationSliderEl) {
      this.simDurationSliderEl.value = String(clamped);
    }
    const simHours = (clamped * 0.05).toFixed(1);
    if (this.simDurationReadoutEl) {
      this.simDurationReadoutEl.textContent = `⏱ ${clamped}s Run • ${simHours} hrs Simulated`;
    }
    if (this.simLaunchLiveBtnEl) {
      this.simLaunchLiveBtnEl.textContent = `▶ Launch ${clamped}s Live Simulation (Enter Simulate Mode) →`;
    }
  }

  private formatClockMmSs(seconds: number): string {
    const s = Math.max(0, Math.floor(seconds));
    const mm = Math.floor(s / 60);
    const ss = s % 60;
    return `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
  }

  /**
   * Rebuilds the floating 3D world callout pins over the Paris map whenever the simulation domain or phase changes
   */
  public rebuildWorldHotspotCalloutPins(): void {
    if (!this.simWorldCalloutLayerEl) return;
    this.simWorldCalloutLayerEl.replaceChildren();
    this.simHotspotPinEls.clear();

    if (!this.surfaceSimulation) return;
    const mode = this.surfaceSimulation.getSimulationMode();
    if (mode === 'none') return;

    const phase = this.surfaceSimulation.getSimulationPhase();
    const hotspots = this.surfaceSimulation.getActiveWorldHotspots();

    for (const h of hotspots) {
      const pinEl = createEl(
        'button',
        `sim-world-pin severity-${h.severity} phase-${phase}${h.id === this.activeHotspotId ? ' active' : ''}`
      );
      pinEl.type = 'button';
      pinEl.style.setProperty('--pin-accent', h.colorHex);

      const topRow = createEl('div', 'sim-pin-top-row');
      const sevLabel =
        phase === 'planning'
          ? h.severity === 'critical'
            ? '🔮 CRITICAL FORECAST'
            : h.severity === 'warning'
              ? '⚠ CHOKE POINT FORECAST'
              : 'ℹ PLANNING ADVISORY'
          : h.severity === 'critical'
            ? '🔴 LIVE CRITICAL'
            : h.severity === 'warning'
              ? '🟠 LIVE WARNING'
              : '🔵 LIVE STATUS';
      topRow.appendChild(createEl('span', 'sim-pin-sev', sevLabel));
      topRow.appendChild(createEl('span', 'sim-pin-metric', h.metricBadge));
      pinEl.appendChild(topRow);

      pinEl.appendChild(createEl('div', 'sim-pin-title', h.title));
      const detailText = phase === 'planning' ? h.planningPrediction : h.liveStatus;
      pinEl.appendChild(createEl('div', 'sim-pin-desc', detailText));

      const stem = createEl('span', 'sim-pin-stem');
      pinEl.appendChild(stem);

      pinEl.addEventListener('click', (e) => {
        e.stopPropagation();
        this.focusWorldHotspot(h);
        if (this.isExplorerCollapsed) {
          this.toggleExplorerCollapsed(false);
        }
        if (this.experienceMode === 'learn') {
          this.setExperienceMode('plan');
        } else {
          this.switchExplorerTab('sim');
        }
      });

      this.simWorldCalloutLayerEl.appendChild(pinEl);
      this.simHotspotPinEls.set(h.id, { el: pinEl, hotspot: h });
    }
  }

  /**
   * Projects all active 3D simulation hotspot pins onto the 2D screen every animation frame
   */
  public updateWorldHotspotPositions(
    projectFn: (x: number, y: number, z: number) => { x: number; y: number; visible: boolean }
  ): void {
    if (!this.surfaceSimulation || this.simHotspotPinEls.size === 0) return;
    const mode = this.surfaceSimulation.getSimulationMode();
    if (mode === 'none') return;

    const phase = this.surfaceSimulation.getSimulationPhase();
    const w = window.innerWidth;
    const h = window.innerHeight;

    for (const { el, hotspot } of this.simHotspotPinEls.values()) {
      const proj = projectFn(hotspot.x, hotspot.y + 2.1, hotspot.z);
      const inBounds =
        proj.visible && proj.x >= 60 && proj.x <= w - 60 && proj.y >= 70 && proj.y <= h - 90;
      if (!inBounds) {
        el.style.display = 'none';
        continue;
      }
      el.style.display = 'flex';
      el.style.left = `${proj.x.toFixed(1)}px`;
      el.style.top = `${proj.y.toFixed(1)}px`;

      const metricEl = el.querySelector('.sim-pin-metric');
      if (metricEl) {
        metricEl.textContent = hotspot.metricBadge;
      }
      const descEl = el.querySelector('.sim-pin-desc');
      if (descEl) {
        descEl.textContent = phase === 'planning' ? hotspot.planningPrediction : hotspot.liveStatus;
      }
    }
  }

  private focusWorldHotspot(hotspot: ParisWorldHotspot): void {
    this.activeHotspotId = hotspot.id;
    this.hideSpecialStationInteriorCard();
    for (const [id, entry] of this.simHotspotPinEls.entries()) {
      entry.el.classList.toggle('active', id === hotspot.id);
    }
    if (this.callbacks.onFocusWorldPoint) {
      const numericHex = parseInt(hotspot.colorHex.replace('#', ''), 16) || 0xff5252;
      this.callbacks.onFocusWorldPoint(hotspot.x, hotspot.y, hotspot.z, numericHex);
    }
    this.refreshSimulationTelemetryUI();
  }

  /**
   * TAB 5: Paris Multi-Modal City Simulation Pane
   * Serves both Top-Level Mode 2 (📋 Plan: Scenario Picker + Duration Picker + Launch Simulation)
   * and Top-Level Mode 3 (⚡ Simulate: Race Condition Live Controls + Progress + Sub-Tabs).
   */
  private buildSimulationExplorerPane(): HTMLElement {
    const pane = createEl('div', 'explorer-pane sim-explorer-pane');

    // 1. Header Card (Dynamically switches between Plan Config Section and Live Run Section)
    const headerCard = createEl('div', 'explorer-spotlight-card sim-control-card');

    // =========================================================================
    // SECTION A: PLAN MODE CONFIGURATION (Scenario Grid + Duration + Launch CTA)
    // =========================================================================
    this.simPlanConfigSectionEl = createEl('div', 'sim-plan-config-section');

    const planTopRow = createEl('div', 'spot-top-row');
    planTopRow.appendChild(createEl('span', 'spot-category-tag', '📋 2. PLAN • FORECAST & SETUP'));
    planTopRow.appendChild(createEl('span', 'spot-year-pill', 'PHASE 1 FORECAST'));
    this.simPlanConfigSectionEl.appendChild(planTopRow);

    // Step 1: 2x3 Scenario Selector Grid
    const scenarioStepLabel = createEl(
      'div',
      'sim-section-subhead',
      'STEP 1 • SELECT SIMULATION SCENARIO (PREVIEWS 3D WARNINGS)'
    );
    this.simPlanConfigSectionEl.appendChild(scenarioStepLabel);

    const scenarioGrid = createEl('div', 'sim-scenario-grid');
    const scenarios: {
      id: ParisSimulationModeId;
      icon: string;
      label: string;
      sub: string;
    }[] = [
      {
        id: 'traffic',
        icon: '🚗',
        label: 'Traffic & Gares',
        sub: '260 Cars • 300 Commuters'
      },
      {
        id: 'marathon',
        icon: '🏃',
        label: 'Marathon 42K',
        sub: 'Course & Road Closures'
      },
      {
        id: 'heatwave',
        icon: '🔥',
        label: 'Heat Wave 44°C',
        sub: 'SAMU & ICU Overload'
      },
      {
        id: 'protest',
        icon: '🪧',
        label: 'Protest / Riot',
        sub: 'Cortège & Store Fires'
      },
      {
        id: 'flood',
        icon: '🌊',
        label: 'Seine Flood',
        sub: '+8.6m Crue & Quais'
      },
      {
        id: 'cyberattack',
        icon: '💻',
        label: 'Cyberattack',
        sub: 'SCADA & Grid Blackout'
      }
    ];

    this.simModeBtns.clear();
    for (const sc of scenarios) {
      const btn = createEl('button', 'sim-scenario-card');
      btn.type = 'button';
      const head = createEl('div', 'sim-scenario-card-head');
      head.appendChild(createEl('span', 'sim-scenario-icon', sc.icon));
      head.appendChild(createEl('span', 'sim-scenario-name', sc.label));
      btn.appendChild(head);
      btn.appendChild(createEl('div', 'sim-scenario-sub', sc.sub));
      btn.addEventListener('click', () => {
        this.selectedPlanScenario = sc.id;
        this.setSimulationMode(sc.id, 'planning');
      });
      this.simModeBtns.set(sc.id, btn);
      scenarioGrid.appendChild(btn);
    }
    this.simPlanConfigSectionEl.appendChild(scenarioGrid);

    // Step 2: Pick Simulation Run Duration
    const durationStepLabel = createEl(
      'div',
      'sim-section-subhead',
      'STEP 2 • PICK SIMULATION RUN DURATION'
    );
    this.simPlanConfigSectionEl.appendChild(durationStepLabel);

    const durationPillsRow = createEl('div', 'sim-duration-pills-row');
    const durationPresets = [
      { sec: 30, label: '30s Sprint' },
      { sec: 60, label: '60s Standard' },
      { sec: 120, label: '2m Extended' },
      { sec: 300, label: '5m Full Crisis' }
    ];
    this.simDurationPillBtns.clear();
    for (const dp of durationPresets) {
      const pBtn = createEl(
        'button',
        `sim-duration-pill-btn${dp.sec === this.selectedDurationSec ? ' active' : ''}`,
        dp.label
      );
      pBtn.type = 'button';
      pBtn.addEventListener('click', () => {
        this.setSelectedDurationSeconds(dp.sec);
      });
      this.simDurationPillBtns.set(dp.sec, pBtn);
      durationPillsRow.appendChild(pBtn);
    }
    this.simPlanConfigSectionEl.appendChild(durationPillsRow);

    const durationSliderRow = createEl('div', 'sim-duration-slider-row');
    this.simDurationSliderEl = createEl('input', 'deco-mini-slider sim-duration-slider');
    this.simDurationSliderEl.type = 'range';
    this.simDurationSliderEl.min = '15';
    this.simDurationSliderEl.max = '300';
    this.simDurationSliderEl.step = '15';
    this.simDurationSliderEl.value = String(this.selectedDurationSec);
    this.simDurationSliderEl.addEventListener('input', () => {
      this.setSelectedDurationSeconds(parseInt(this.simDurationSliderEl.value, 10) || 60);
    });

    this.simDurationReadoutEl = createEl(
      'span',
      'sim-duration-readout-pill',
      '⏱ 60s Run • 3.0 hrs Simulated'
    );
    durationSliderRow.appendChild(this.simDurationSliderEl);
    durationSliderRow.appendChild(this.simDurationReadoutEl);
    this.simPlanConfigSectionEl.appendChild(durationSliderRow);

    // Step 3: Prominent Launch Simulation CTA Button (The ONLY gateway into Simulate mode)
    const launchStepLabel = createEl(
      'div',
      'sim-section-subhead',
      'STEP 3 • LAUNCH LIVE SIMULATION'
    );
    this.simPlanConfigSectionEl.appendChild(launchStepLabel);

    this.simLaunchLiveBtnEl = createEl(
      'button',
      'sim-launch-cta-btn',
      `▶ Launch ${this.selectedDurationSec}s Live Simulation (Enter Simulate Mode) →`
    );
    this.simLaunchLiveBtnEl.type = 'button';
    this.simLaunchLiveBtnEl.title =
      'Lock in scenario and duration, transition to Simulate mode, and start the live city run';
    this.simLaunchLiveBtnEl.addEventListener('click', () => {
      this.launchSimulationFromPlan();
    });
    this.simPlanConfigSectionEl.appendChild(this.simLaunchLiveBtnEl);

    headerCard.appendChild(this.simPlanConfigSectionEl);

    // =========================================================================
    // SECTION B: SIMULATE MODE LIVE RUN CONTROLS (Race Condition Dock Card)
    // =========================================================================
    this.simLiveRunSectionEl = createEl('div', 'sim-live-run-section');
    this.simLiveRunSectionEl.style.display = 'none';

    const liveTopRow = createEl('div', 'spot-top-row');
    liveTopRow.appendChild(createEl('span', 'spot-category-tag', '⚡ 3. SIMULATE • RACE CONDITION ENGINE'));
    const dockStatusPill = createEl('span', 'rc-status-pill running', '🔴 RUNNING');
    this.rcStatusPillEls.push(dockStatusPill);
    liveTopRow.appendChild(dockStatusPill);
    this.simLiveRunSectionEl.appendChild(liveTopRow);

    // Progress Track & Dual Clock Readouts inside Right Dock
    const dockProgressBox = createEl('div', 'rc-dock-progress-box');
    const dockClockRow = createEl('div', 'rc-dock-clock-row');
    const dockTimerEl = createEl('span', 'rc-timer-readout', '00:00 / 01:00');
    const dockSimHoursEl = createEl('span', 'rc-sim-hours-readout', '0h 00m simulated');
    this.rcTimerReadoutEls.push(dockTimerEl);
    this.rcSimHoursReadoutEls.push(dockSimHoursEl);
    dockClockRow.appendChild(dockTimerEl);
    dockClockRow.appendChild(dockSimHoursEl);
    dockProgressBox.appendChild(dockClockRow);

    const dockProgressTrack = createEl('div', 'rc-progress-track');
    const dockProgressFill = createEl('div', 'rc-progress-fill');
    this.rcProgressBarFillEls.push(dockProgressFill);
    dockProgressTrack.appendChild(dockProgressFill);
    dockProgressBox.appendChild(dockProgressTrack);
    this.simLiveRunSectionEl.appendChild(dockProgressBox);

    // Race Condition Run Controls Row (Pause/Run + Speed 1x/2x/4x)
    const rcControlsRow = createEl('div', 'rc-dock-controls-row');
    const dockPauseBtn = createEl('button', 'deco-btn rc-pause-btn', '❚❚ Pause');
    dockPauseBtn.type = 'button';
    dockPauseBtn.addEventListener('click', () => {
      if (!this.surfaceSimulation) return;
      this.surfaceSimulation.togglePaused();
      this.refreshSimulationTelemetryUI();
    });
    this.rcPauseBtns.push(dockPauseBtn);
    rcControlsRow.appendChild(dockPauseBtn);

    const speedGroup = createEl('div', 'rc-speed-group');
    const speeds: (1 | 2 | 4)[] = [1, 2, 4];
    for (const spd of speeds) {
      const sBtn = createEl('button', `deco-btn rc-speed-btn${spd === 1 ? ' active' : ''}`, `${spd}×`);
      sBtn.type = 'button';
      sBtn.addEventListener('click', () => {
        if (!this.surfaceSimulation) return;
        this.surfaceSimulation.setSimSpeedMultiplier(spd);
        this.refreshSimulationTelemetryUI();
      });
      const existing = this.rcSpeedBtns.get(spd) ?? [];
      existing.push(sBtn);
      this.rcSpeedBtns.set(spd, existing);
      speedGroup.appendChild(sBtn);
    }
    rcControlsRow.appendChild(speedGroup);
    this.simLiveRunSectionEl.appendChild(rcControlsRow);

    // Complete Now & Cancel/End Simulation Actions
    const rcLifecycleRow = createEl('div', 'rc-dock-lifecycle-row');

    const completeNowBtn = createEl(
      'button',
      'deco-btn rc-complete-now-btn',
      '📊 Complete & Score Now (A2UI)'
    );
    completeNowBtn.type = 'button';
    completeNowBtn.title =
      'Finish the simulation immediately and compile the A2UI Post-Simulation Report Card';
    completeNowBtn.addEventListener('click', () => {
      if (!this.surfaceSimulation) return;
      this.surfaceSimulation.completeSimulationRun();
    });
    rcLifecycleRow.appendChild(completeNowBtn);

    const viewReportBtn = createEl(
      'button',
      'deco-btn rc-open-report-btn',
      '📋 View A2UI Report Card'
    );
    viewReportBtn.type = 'button';
    viewReportBtn.style.display = 'none';
    viewReportBtn.addEventListener('click', () => {
      const report = this.surfaceSimulation?.getLastReportCard();
      if (report) {
        this.renderAndOpenA2uiReportModal(report);
      }
    });
    this.rcOpenReportBtns.push(viewReportBtn);
    rcLifecycleRow.appendChild(viewReportBtn);

    const cancelEndBtn = createEl(
      'button',
      'rc-cancel-end-btn',
      '⏹ Cancel / End Simulation (Unlock Learn & Plan)'
    );
    cancelEndBtn.type = 'button';
    cancelEndBtn.addEventListener('click', () => {
      this.cancelOrEndSimulation('plan');
    });
    rcLifecycleRow.appendChild(cancelEndBtn);

    this.simLiveRunSectionEl.appendChild(rcLifecycleRow);
    headerCard.appendChild(this.simLiveRunSectionEl);

    // =========================================================================
    // SECTION C: SHARED SCENARIO BRIEF, 4 KPIs, MITIGATION & 3D LAYER TOGGLES
    // =========================================================================
    this.simDomainTitleEl = createEl(
      'h2',
      'chronicle-title spot-title',
      '🏃 Marathon de Paris (42.195 km Planning → Live)'
    );
    headerCard.appendChild(this.simDomainTitleEl);

    this.simDomainDescEl = createEl(
      'p',
      'chronicle-body spot-desc',
      'Phase 1 predicts boulevard choke points (Rivoli, Bastille, Alma, Trocadéro) & Metro spillover. Phase 2 closes 19 crossing axes, launches 220 runners, and records live detours.'
    );
    headerCard.appendChild(this.simDomainDescEl);

    this.simPhaseStatusBannerEl = createEl(
      'div',
      'sim-phase-status-banner',
      '📋 PHASE 1 (PLANNING FORECAST): 3D Forecast Domes & Choke-Point Warnings active on the Paris map.'
    );
    headerCard.appendChild(this.simPhaseStatusBannerEl);

    // 4 Dynamic Domain KPIs Grid
    const telemetryGrid = createEl('div', 'sim-telemetry-grid');
    this.simKpiCells = [];
    for (let i = 0; i < 4; i++) {
      const cell = createEl('div', 'sim-telemetry-cell');
      const labelEl = createEl('span', 'sim-telemetry-label', 'METRIC');
      const valEl = createEl('span', 'sim-telemetry-val', '--');
      cell.appendChild(labelEl);
      cell.appendChild(valEl);
      telemetryGrid.appendChild(cell);
      this.simKpiCells.push({ labelEl, valEl, cellEl: cell });
    }
    headerCard.appendChild(telemetryGrid);

    // 1-Click Mitigation Action Button (Available in Plan to test forecast or in Simulate to intervene live)
    this.simMitigationBtnEl = createEl(
      'button',
      'deco-btn sim-mitigation-btn',
      '🛡 Deploy Pre-Event Mitigation (Green-Wave, Flood Barriers & Mobile ICU)'
    );
    this.simMitigationBtnEl.type = 'button';
    this.simMitigationBtnEl.addEventListener('click', () => {
      if (!this.surfaceSimulation) return;
      this.surfaceSimulation.toggleMitigation();
      this.rebuildWorldHotspotCalloutPins();
      this.refreshSimulationTelemetryUI();
    });
    headerCard.appendChild(this.simMitigationBtnEl);

    // Compact 3D Layer Toggles
    const togglesWrap = createEl('div', 'explorer-filter-chips sim-layer-toggles');

    this.simTrafficLightsBtn = createEl('button', 'explorer-chip-btn active', '🚦 Signals');
    this.simTrafficLightsBtn.title = 'Toggle 3D multi-phase traffic signal masts at Parisian carrefours';
    this.simTrafficLightsBtn.addEventListener('click', () => {
      if (!this.surfaceSimulation) return;
      const t = this.surfaceSimulation.getTelemetry();
      this.surfaceSimulation.setSignalsEnabled(!t.signalsEnabled);
      this.refreshSimulationTelemetryUI();
    });

    this.simCongestionBtn = createEl('button', 'explorer-chip-btn active', '🔥 Congestion');
    this.simCongestionBtn.title = 'Toggle boulevard congestion heat ribbons and 3D vertical congestion columns';
    this.simCongestionBtn.addEventListener('click', () => {
      if (!this.surfaceSimulation) return;
      const t = this.surfaceSimulation.getTelemetry();
      this.surfaceSimulation.setCongestionHeatmapEnabled(!t.congestionHeatmapEnabled);
      this.refreshSimulationTelemetryUI();
    });

    this.simMarathonBtn = createEl('button', 'explorer-chip-btn active', '🏃 Course');
    this.simMarathonBtn.title = 'Toggle the 42.195 km Marathon de Paris course and 220 autopilot runners';
    this.simMarathonBtn.addEventListener('click', () => {
      if (!this.surfaceSimulation) return;
      const next = !this.surfaceSimulation.marathonGroup.visible;
      this.surfaceSimulation.marathonGroup.visible = next;
      this.simMarathonBtn.classList.toggle('active', next);
      this.refreshSimulationTelemetryUI();
    });

    this.simBarriersBtn = createEl('button', 'explorer-chip-btn', '🚧 Closures');
    this.simBarriersBtn.title = 'Close crossing streets along the crisis corridor and force Dijkstra vehicle rerouting';
    this.simBarriersBtn.addEventListener('click', () => {
      if (!this.surfaceSimulation) return;
      const t = this.surfaceSimulation.getTelemetry();
      this.surfaceSimulation.setMarathonClosuresEnabled(!t.marathonClosuresEnabled);
      this.refreshSimulationTelemetryUI();
    });

    this.simProbesBtn = createEl('button', 'explorer-chip-btn active', '💎 Beacons');
    this.simProbesBtn.title = 'Toggle 3D floating beacons above Tier 2 Spotlighted Hero Probes';
    this.simProbesBtn.addEventListener('click', () => {
      if (!this.surfaceSimulation) return;
      const next = !this.surfaceSimulation.probesGroup.visible;
      this.surfaceSimulation.probesGroup.visible = next;
      this.simProbesBtn.classList.toggle('active', next);
    });

    const minusCarsBtn = createEl('button', 'explorer-chip-btn', '−40 Cars');
    minusCarsBtn.title = 'Reduce autonomous surface vehicle fleet by 40 cars';
    minusCarsBtn.addEventListener('click', () => {
      if (!this.surfaceSimulation) return;
      this.surfaceSimulation.adjustCarCount(-40);
      this.refreshSimulationTelemetryUI();
    });

    const plusCarsBtn = createEl('button', 'explorer-chip-btn', '+40 Cars');
    plusCarsBtn.title = 'Increase autonomous surface vehicle fleet by 40 cars (up to 320)';
    plusCarsBtn.addEventListener('click', () => {
      if (!this.surfaceSimulation) return;
      this.surfaceSimulation.adjustCarCount(40);
      this.refreshSimulationTelemetryUI();
    });

    togglesWrap.appendChild(this.simTrafficLightsBtn);
    togglesWrap.appendChild(this.simCongestionBtn);
    togglesWrap.appendChild(this.simMarathonBtn);
    togglesWrap.appendChild(this.simBarriersBtn);
    togglesWrap.appendChild(this.simProbesBtn);
    togglesWrap.appendChild(minusCarsBtn);
    togglesWrap.appendChild(plusCarsBtn);
    headerCard.appendChild(togglesWrap);

    pane.appendChild(headerCard);

    // 2. Clean Sub-Tab Bar (Hotspots | Event Log | AI Agents) so only one list shows at a time
    const subTabsBar = createEl('div', 'sim-subtabs-row');
    const subTabsConfig: { id: 'hotspots' | 'events' | 'agents'; label: string }[] = [
      { id: 'hotspots', label: '📍 Hotspots' },
      { id: 'events', label: '📜 Event Log' },
      { id: 'agents', label: '🧠 AI Agents' }
    ];

    this.simSubTabBtns.clear();
    this.simSubTabPanes.clear();

    for (const st of subTabsConfig) {
      const btn = createEl(
        'button',
        `sim-subtab-btn${this.simActiveSubTab === st.id ? ' active' : ''}`,
        st.label
      );
      btn.type = 'button';
      btn.addEventListener('click', () => {
        this.switchSimSubTab(st.id);
      });
      this.simSubTabBtns.set(st.id, btn);
      subTabsBar.appendChild(btn);
    }
    pane.appendChild(subTabsBar);

    // 3. Scrollable Sub-Tab Content Area
    const feedScroll = createEl('div', 'sim-agents-scroll');

    // Sub-Tab Pane A: Hotspots (Warnings & Active 3D Impact Zones)
    const hotspotsPane = createEl('div', 'sim-subtab-pane');
    this.simHotspotsHeaderEl = createEl(
      'div',
      'tour-list-header',
      '3D MAP HOTSPOTS • CLICK ANY ZONE TO FLY CAMERA'
    );
    hotspotsPane.appendChild(this.simHotspotsHeaderEl);
    this.simHotspotsListEl = createEl('div', 'sim-hotspots-list');
    hotspotsPane.appendChild(this.simHotspotsListEl);
    this.simSubTabPanes.set('hotspots', hotspotsPane);
    feedScroll.appendChild(hotspotsPane);

    // Sub-Tab Pane B: Chronological Event Log
    const eventsPane = createEl('div', 'sim-subtab-pane');
    eventsPane.style.display = 'none';
    this.simEventLogHeaderEl = createEl(
      'div',
      'tour-list-header',
      'CHRONOLOGICAL SIMULATION EVENT LOG (WHAT HAPPENED)'
    );
    eventsPane.appendChild(this.simEventLogHeaderEl);
    this.simEventLogListEl = createEl('div', 'sim-event-log-list');
    eventsPane.appendChild(this.simEventLogListEl);
    this.simSubTabPanes.set('events', eventsPane);
    feedScroll.appendChild(eventsPane);

    // Sub-Tab Pane C: AI Agents (Tier 2 Hero Probes + Tier 3 Macro-Controllers)
    const agentsPane = createEl('div', 'sim-subtab-pane');
    agentsPane.style.display = 'none';
    const tier3Header = createEl(
      'div',
      'tour-list-header',
      'TIER 3 • CITY MACRO-CONTROLLERS (A2UI DISPATCH)'
    );
    agentsPane.appendChild(tier3Header);
    this.simMacroListEl = createEl('div', 'sim-macro-list');
    agentsPane.appendChild(this.simMacroListEl);

    const tier2Header = createEl(
      'div',
      'tour-list-header',
      'TIER 2 • SPOTLIGHTED HERO PROBES (CLICK TO FLY)'
    );
    agentsPane.appendChild(tier2Header);
    this.simProbesListEl = createEl('div', 'sim-probes-list');
    agentsPane.appendChild(this.simProbesListEl);
    this.simSubTabPanes.set('agents', agentsPane);
    feedScroll.appendChild(agentsPane);

    pane.appendChild(feedScroll);
    return pane;
  }

  private switchSimSubTab(tabId: 'hotspots' | 'events' | 'agents'): void {
    this.simActiveSubTab = tabId;
    for (const [id, btn] of this.simSubTabBtns.entries()) {
      btn.classList.toggle('active', id === tabId);
    }
    for (const [id, pane] of this.simSubTabPanes.entries()) {
      pane.style.display = id === tabId ? '' : 'none';
    }
  }

  private focusHeroProbe(probe: ParisHeroProbe): void {
    this.activeHeroProbeId = probe.id;
    this.hideSpecialStationInteriorCard();
    if (this.callbacks.onFocusWorldPoint) {
      const numericHex = parseInt(probe.colorHex.replace('#', ''), 16) || 0xf4c430;
      this.callbacks.onFocusWorldPoint(
        probe.position.x,
        probe.position.y,
        probe.position.z,
        numericHex
      );
    }
    this.refreshSimulationTelemetryUI();
  }

  private focusEventLogItem(ev: ParisSimulationEventLogItem): void {
    this.hideSpecialStationInteriorCard();
    if (this.callbacks.onFocusWorldPoint) {
      const colorHex =
        ev.severity === 'critical' ? 0xff3b3b : ev.severity === 'warning' ? 0xffa726 : 0x38bdf8;
      this.callbacks.onFocusWorldPoint(ev.x, 0.8, ev.z, colorHex);
    }
  }

  public refreshSimulationTelemetryUI(): void {
    if (!this.surfaceSimulation) return;
    const t = this.surfaceSimulation.getTelemetry();

    // Sync scenario cards in Explorer
    const activeScenarioCardId = t.mode === 'none' ? this.selectedPlanScenario : t.mode;
    for (const [id, btn] of this.simModeBtns.entries()) {
      const active = id === activeScenarioCardId;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    }

    // Sync Race Condition Timer, Progress Bar, Pause/Run & Speed buttons across Dock & Bottom Console
    const elapsedClock = this.formatClockMmSs(t.runElapsedSec);
    const targetClock = this.formatClockMmSs(t.targetDurationSec);
    const timerStr = `${elapsedClock} / ${targetClock}`;
    const simHoursStr = `⏱ ${t.simulatedElapsedHours}h ${String(t.simulatedElapsedMins).padStart(2, '0')}m simulated`;

    for (const el of this.rcTimerReadoutEls) {
      el.textContent = timerStr;
    }
    for (const el of this.rcSimHoursReadoutEls) {
      el.textContent = simHoursStr;
    }
    for (const fillEl of this.rcProgressBarFillEls) {
      fillEl.style.width = `${t.runProgressPct.toFixed(1)}%`;
    }
    for (const pauseBtn of this.rcPauseBtns) {
      if (t.isCompleted) {
        pauseBtn.textContent = '✅ Done';
        pauseBtn.classList.remove('active');
      } else if (t.isPaused) {
        pauseBtn.textContent = '▶ Run';
        pauseBtn.classList.add('active');
      } else {
        pauseBtn.textContent = '❚❚ Pause';
        pauseBtn.classList.remove('active');
      }
    }
    for (const [spd, btns] of this.rcSpeedBtns.entries()) {
      for (const b of btns) {
        b.classList.toggle('active', spd === t.simSpeedMultiplier);
      }
    }
    for (const pillEl of this.rcStatusPillEls) {
      if (t.isCompleted) {
        pillEl.className = 'rc-status-pill completed';
        pillEl.textContent = '✅ COMPLETED';
      } else if (t.isPaused) {
        pillEl.className = 'rc-status-pill paused';
        pillEl.textContent = '⏸ PAUSED';
      } else {
        pillEl.className = 'rc-status-pill running';
        pillEl.textContent = `🔴 RUNNING (${t.simSpeedMultiplier}×)`;
      }
    }
    for (const repBtn of this.rcOpenReportBtns) {
      repBtn.style.display = t.isCompleted ? 'inline-flex' : 'none';
    }

    // Domain Titles & Descriptions
    const domainMeta: Record<ParisSimulationModeId, { title: string; desc: string }> = {
      none: {
        title: 'Select a Scenario Above to Begin',
        desc: 'Pick any of the 6 Paris scenarios above (Traffic, Marathon 42K, Heat Wave, Protest/Riot, Seine Flood, or Cyberattack) to inspect Phase 1 Planning forecasts or launch Phase 2 Live Simulation.'
      },
      traffic: {
        title: '🚗 Boulevard Traffic & Commuter Congestion',
        desc: 'Simulates 260+ autonomous vehicles, 300 pedestrian commuters between the 6 Grandes Gares, multi-phase carrefour signals, and 3D vertical congestion columns.'
      },
      marathon: {
        title: '🏃 Marathon de Paris (42.195 km Planning → Live)',
        desc: 'Phase 1 predicts boulevard choke points (Rivoli, Bastille, Alma, Trocadéro) & Metro spillover. Phase 2 closes 19 crossing axes, launches 220 runners, and records live detours.'
      },
      heatwave: {
        title: '🔥 Extreme 44°C Canicule — SAMU & ICU Surge',
        desc: 'Phase 1 forecasts Urban Heat Islands (+6.5°C) and ICU saturation. Phase 2 dispatches SAMU 75 ambulances and visualizes overwhelmed AP-HP hospitals (Hôtel-Dieu, Lariboisière, Pitié).'
      },
      protest: {
        title: '🪧 Manifestation & Urban Unrest (République → Nation)',
        desc: 'Phase 1 predicts storefront looting risk and arterial severing. Phase 2 simulates the marching cortège, burning commercial buildings with 3D fire/smoke plumes, and Pompiers response.'
      },
      flood: {
        title: '🌊 Centenary Crue de la Seine (+8.60m Flood)',
        desc: 'Phase 1 maps low-lying Quais and under-river Metro flood risk. Phase 2 raises 3D Seine floodwaters across Bercy, Louvre/Orsay, Alma, and Javel and seals 18 Metro stations.'
      },
      cyberattack: {
        title: '💻 SCADA Cyberattack — Signal Spoofing & Blackout',
        desc: 'Phase 1 identifies SCADA signal and CBTC rail vulnerabilities. Phase 2 triggers flashing carrefour conflict gridlock, halts automated Metro Lines 1/4/14, and blacks out 3 districts.'
      }
    };

    const meta = domainMeta[activeScenarioCardId] ?? domainMeta.marathon;
    if (this.simDomainTitleEl) this.simDomainTitleEl.textContent = meta.title;
    if (this.simDomainDescEl) this.simDomainDescEl.textContent = meta.desc;

    if (this.simPhaseStatusBannerEl) {
      this.simPhaseStatusBannerEl.className = `sim-phase-status-banner phase-${t.phase}`;
      this.simPhaseStatusBannerEl.textContent =
        t.phase === 'planning'
          ? '📋 PHASE 1 (PLANNING FORECAST): Showing predicted choke points & 3D warning domes before the event.'
          : t.isCompleted
            ? '✅ SIMULATION COMPLETED: Review the A2UI Report Card or click "⏹ Cancel / End Simulation" to return.'
            : '🔴 PHASE 2 (LIVE SIMULATION): Organic 3D city impact active — recording live traffic, dispatches & cascading events.';
    }

    if (this.simMitigationBtnEl) {
      this.simMitigationBtnEl.classList.toggle('active', t.mitigationActive);
      this.simMitigationBtnEl.textContent = t.mitigationActive
        ? '✅ Pre-Event Mitigation ACTIVE (Green-Wave, Mobile ICU & Flood Barriers)'
        : '🛡 Deploy Pre-Event Mitigation (Reduce Congestion, ICU Load & Flood Risk)';
    }

    // Populate 4 Dynamic Domain KPIs
    const kpiEntries: { label: string; value: string; tone: string }[] = [
      {
        label: t.kpi1Label,
        value: t.kpi1Value,
        tone: t.phase === 'live' ? 'critical' : 'warning'
      },
      {
        label: t.kpi2Label,
        value: t.kpi2Value,
        tone: t.mitigationActive ? 'nominal' : t.phase === 'live' ? 'critical' : 'warning'
      },
      {
        label: t.kpi3Label,
        value: t.kpi3Value,
        tone: t.congestionIndexPct >= 65 ? 'critical' : 'warning'
      },
      {
        label: t.kpi4Label,
        value: t.kpi4Value,
        tone: t.mitigationActive ? 'nominal' : 'warning'
      }
    ];
    for (let i = 0; i < this.simKpiCells.length; i++) {
      const kpi = kpiEntries[i];
      const cell = this.simKpiCells[i];
      if (!kpi || !cell) continue;
      cell.labelEl.textContent = kpi.label;
      cell.valEl.textContent = kpi.value;
      cell.cellEl.className = `sim-telemetry-cell tone-${kpi.tone}`;
    }

    // Sync toggle chip states
    if (this.simTrafficLightsBtn) {
      this.simTrafficLightsBtn.classList.toggle('active', t.signalsEnabled);
    }
    if (this.simCongestionBtn) {
      this.simCongestionBtn.classList.toggle('active', t.congestionHeatmapEnabled);
    }
    if (this.simMarathonBtn) {
      this.simMarathonBtn.classList.toggle('active', this.surfaceSimulation.marathonGroup.visible);
    }
    if (this.simBarriersBtn) {
      this.simBarriersBtn.classList.toggle('active', t.closedEdgesCount > 0);
    }

    // Update Sub-Tab button counts
    const hotspots = this.surfaceSimulation.getActiveWorldHotspots();
    const events = this.surfaceSimulation.getEventLog();
    const hotspotsSubBtn = this.simSubTabBtns.get('hotspots');
    if (hotspotsSubBtn) {
      hotspotsSubBtn.textContent = `📍 Hotspots (${hotspots.length})`;
    }
    const eventsSubBtn = this.simSubTabBtns.get('events');
    if (eventsSubBtn) {
      eventsSubBtn.textContent = `📜 Event Log (${events.length})`;
    }
    const agentsSubBtn = this.simSubTabBtns.get('agents');
    if (agentsSubBtn) {
      agentsSubBtn.textContent = `🧠 AI Agents (${this.surfaceSimulation.heroProbes.length})`;
    }

    // Render Sub-Tab 1: 3D Map Hotspots list (Predicted Warnings in Planning -> Active Impacts in Live)
    if (this.simHotspotsListEl) {
      this.simHotspotsHeaderEl.textContent =
        t.phase === 'planning'
          ? `🔮 PREDICTED CHOKE POINTS & WARNINGS (${hotspots.length} SITES)`
          : `🔴 ACTIVE 3D WORLD IMPACT ZONES (${hotspots.length} SITES)`;
      this.simHotspotsListEl.replaceChildren();

      for (const h of hotspots) {
        const card = createEl(
          'button',
          `sim-hotspot-card severity-${h.severity}${h.id === this.activeHotspotId ? ' active' : ''}`
        );
        card.type = 'button';
        card.style.borderLeftColor = h.colorHex;

        const top = createEl('div', 'sim-probe-top');
        top.appendChild(createEl('span', 'sim-probe-name', h.title));
        const badge = createEl('span', 'sim-probe-badge', h.metricBadge);
        badge.style.borderColor = h.colorHex;
        badge.style.color = h.colorHex;
        top.appendChild(badge);
        card.appendChild(top);

        const bodyText =
          t.phase === 'planning'
            ? `🔮 Forecast: ${h.planningPrediction}`
            : `⚡ Live Impact: ${h.liveStatus}`;
        card.appendChild(createEl('div', 'sim-hotspot-body', bodyText));

        card.addEventListener('click', () => {
          this.focusWorldHotspot(h);
        });
        this.simHotspotsListEl.appendChild(card);
      }
    }

    // Render Sub-Tab 2: Chronological Event Log (What Happened / Forecast Timeline)
    if (this.simEventLogListEl) {
      this.simEventLogHeaderEl.textContent =
        t.phase === 'planning'
          ? `📋 SIMULATION FORECAST TIMELINE (${events.length} ENTRIES)`
          : `📜 LIVE RECORDED EVENT LOG — WHAT HAPPENED (${events.length} EVENTS)`;
      this.simEventLogListEl.replaceChildren();

      for (const ev of events) {
        const row = createEl('button', `sim-event-log-item severity-${ev.severity}`);
        row.type = 'button';

        const top = createEl('div', 'sim-event-log-top');
        top.appendChild(createEl('span', 'sim-event-time', ev.simTimeLabel));
        top.appendChild(createEl('span', 'sim-event-title', ev.headline));
        row.appendChild(top);

        row.appendChild(createEl('div', 'sim-event-detail', ev.detail));
        row.appendChild(createEl('div', 'sim-event-loc', `📍 ${ev.category} — Click to fly`));

        row.addEventListener('click', () => {
          this.focusEventLogItem(ev);
        });
        this.simEventLogListEl.appendChild(row);
      }
    }

    // Render Sub-Tab 3: Tier 3 Macro-Controller A2UI Cards + Tier 2 Hero Probes
    if (this.simMacroListEl) {
      const macros = this.surfaceSimulation.getMacroControllerCards();
      this.simMacroListEl.replaceChildren();
      for (const m of macros) {
        const severityClass =
          m.status === 'intervention'
            ? 'critical'
            : m.status === 'advisory'
              ? 'advisory'
              : 'nominal';
        const card = createEl('div', `sim-macro-card severity-${severityClass}`);
        const top = createEl('div', 'sim-macro-top');
        top.appendChild(createEl('span', 'sim-macro-agent', m.agentName));
        top.appendChild(createEl('span', 'sim-macro-authority', m.roleBadge));
        card.appendChild(top);

        card.appendChild(createEl('div', 'sim-macro-headline', m.headline));
        card.appendChild(createEl('div', 'sim-macro-impact', m.recommendation));
        card.appendChild(createEl('div', 'sim-macro-action', `📊 ${m.metricSummary}`));

        const dispatchRow = createEl('div', 'sim-probe-actions');
        const dispatchBtn = createEl('button', 'deco-btn sim-fly-probe-btn', `⚡ ${m.actionLabel}`);
        dispatchBtn.type = 'button';
        dispatchBtn.addEventListener('click', () => {
          if (!this.surfaceSimulation) return;
          this.surfaceSimulation.toggleMitigation();
          this.rebuildWorldHotspotCalloutPins();
          this.refreshSimulationTelemetryUI();
        });
        dispatchRow.appendChild(dispatchBtn);
        card.appendChild(dispatchRow);

        this.simMacroListEl.appendChild(card);
      }
    }

    if (this.simProbesListEl) {
      const probes = this.surfaceSimulation.heroProbes;
      this.simProbesListEl.replaceChildren();
      for (const p of probes) {
        const card = createEl(
          'div',
          `sim-probe-card${p.id === this.activeHeroProbeId ? ' active' : ''}`
        );
        card.style.borderLeftColor = p.colorHex;

        const top = createEl('div', 'sim-probe-top');
        const nameWrap = createEl('div', 'sim-probe-title-wrap');
        nameWrap.appendChild(createEl('span', 'sim-probe-name', p.name));
        nameWrap.appendChild(createEl('span', 'sim-probe-role', p.role));
        top.appendChild(nameWrap);

        const badge = createEl('span', 'sim-probe-badge', p.statusBadge);
        badge.style.borderColor = p.colorHex;
        badge.style.color = p.colorHex;
        top.appendChild(badge);
        card.appendChild(top);

        const metaRow = createEl('div', 'sim-probe-meta-row');
        metaRow.appendChild(createEl('span', 'sim-probe-loc', `📍 ${p.locationLabel}`));
        metaRow.appendChild(
          createEl('span', 'sim-probe-metrics', `${p.metricPrimary} • ${p.metricSecondary}`)
        );
        card.appendChild(metaRow);

        const currentThought =
          p.innerThoughts[p.currentThoughtIdx % p.innerThoughts.length] ?? '';
        const thoughtBox = createEl('div', 'sim-probe-thought');
        thoughtBox.appendChild(createEl('span', 'sim-thought-prefix', '🧠 inner_thought: '));
        thoughtBox.appendChild(createEl('span', 'sim-thought-text', `"${currentThought}"`));
        card.appendChild(thoughtBox);

        const actionRow = createEl('div', 'sim-probe-actions');
        const flyBtn = createEl('button', 'deco-btn sim-fly-probe-btn', '🎯 Fly to Live Probe');
        flyBtn.type = 'button';
        flyBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.focusHeroProbe(p);
        });
        actionRow.appendChild(flyBtn);
        card.appendChild(actionRow);

        card.addEventListener('click', () => {
          this.focusHeroProbe(p);
        });

        this.simProbesListEl.appendChild(card);
      }
    }
  }

  private buildBottomTimelineBar(): HTMLElement {
    const bottom = createEl('footer', 'hud-bottom-bar');

    // =========================================================================
    // 1. HISTORICAL TIMELINE CONSOLE (1900-2026) — Visible in LEARN & PLAN modes
    // =========================================================================
    const consolePanel = createEl('div', 'deco-panel timeline-console hud-interactive');
    attachDecoCorners(consolePanel);
    this.historicalTimelineConsoleEl = consolePanel;

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

    const eventBanner = createEl('div', 'timeline-event-banner');
    this.eventYearPillEl = createEl('span', 'event-year-pill', '2026');
    this.eventHeadlineEl = createEl('span', '', '');
    eventBanner.appendChild(this.eventYearPillEl);
    eventBanner.appendChild(this.eventHeadlineEl);

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

    // =========================================================================
    // 2. RACE CONDITION SIMULATION CONSOLE — Visible in SIMULATE mode
    // =========================================================================
    const rcConsole = createEl('div', 'deco-panel rc-sim-console hud-interactive');
    attachDecoCorners(rcConsole);
    rcConsole.style.display = 'none';
    this.simBottomConsoleEl = rcConsole;

    // Left: Pause/Run + Speed (1x, 2x, 4x)
    const rcLeftGroup = createEl('div', 'rc-console-left');
    const bottomPauseBtn = createEl('button', 'deco-btn rc-pause-btn', '❚❚ Pause');
    bottomPauseBtn.type = 'button';
    bottomPauseBtn.addEventListener('click', () => {
      if (!this.surfaceSimulation) return;
      this.surfaceSimulation.togglePaused();
      this.refreshSimulationTelemetryUI();
    });
    this.rcPauseBtns.push(bottomPauseBtn);
    rcLeftGroup.appendChild(bottomPauseBtn);

    const bottomSpeedGroup = createEl('div', 'rc-speed-group');
    const rcSpeeds: (1 | 2 | 4)[] = [1, 2, 4];
    for (const spd of rcSpeeds) {
      const sBtn = createEl('button', `deco-btn rc-speed-btn${spd === 1 ? ' active' : ''}`, `${spd}×`);
      sBtn.type = 'button';
      sBtn.addEventListener('click', () => {
        if (!this.surfaceSimulation) return;
        this.surfaceSimulation.setSimSpeedMultiplier(spd);
        this.refreshSimulationTelemetryUI();
      });
      const existing = this.rcSpeedBtns.get(spd) ?? [];
      existing.push(sBtn);
      this.rcSpeedBtns.set(spd, existing);
      bottomSpeedGroup.appendChild(sBtn);
    }
    rcLeftGroup.appendChild(bottomSpeedGroup);
    rcConsole.appendChild(rcLeftGroup);

    // Center: Status Pill + Progress Bar + Real/Simulated Clock Readout
    const rcCenterGroup = createEl('div', 'rc-console-center');
    const rcCenterTop = createEl('div', 'rc-console-center-top');
    const bottomStatusPill = createEl('span', 'rc-status-pill running', '🔴 RUNNING');
    this.rcStatusPillEls.push(bottomStatusPill);
    const bottomTimerEl = createEl('span', 'rc-timer-readout', '00:00 / 01:00');
    this.rcTimerReadoutEls.push(bottomTimerEl);
    const bottomSimHoursEl = createEl('span', 'rc-sim-hours-readout', '⏱ 0h 00m simulated');
    this.rcSimHoursReadoutEls.push(bottomSimHoursEl);

    rcCenterTop.appendChild(bottomStatusPill);
    rcCenterTop.appendChild(bottomTimerEl);
    rcCenterTop.appendChild(bottomSimHoursEl);
    rcCenterGroup.appendChild(rcCenterTop);

    const bottomProgressTrack = createEl('div', 'rc-progress-track');
    const bottomProgressFill = createEl('div', 'rc-progress-fill');
    this.rcProgressBarFillEls.push(bottomProgressFill);
    bottomProgressTrack.appendChild(bottomProgressFill);
    rcCenterGroup.appendChild(bottomProgressTrack);
    rcConsole.appendChild(rcCenterGroup);

    // Right: Race Condition Camera Controls + Complete & Score + Cancel/End Simulation
    const rcRightGroup = createEl('div', 'rc-console-right');

    const followLeadBtn = createEl('button', 'deco-btn', '🎯 Follow Lead Probe');
    followLeadBtn.type = 'button';
    followLeadBtn.title = 'Focus camera on the primary hero probe for this scenario';
    followLeadBtn.addEventListener('click', () => {
      if (!this.surfaceSimulation) return;
      const probes = this.surfaceSimulation.heroProbes;
      if (probes.length > 0) {
        this.focusHeroProbe(probes[0]);
      }
    });
    rcRightGroup.appendChild(followLeadBtn);

    const feelingLuckyBtn = createEl('button', 'deco-btn', '🎲 Feeling Lucky');
    feelingLuckyBtn.type = 'button';
    feelingLuckyBtn.title = 'Jump camera to a random active hotspot or hero probe across Paris';
    feelingLuckyBtn.addEventListener('click', () => {
      if (!this.surfaceSimulation) return;
      const hotspots = this.surfaceSimulation.getActiveWorldHotspots();
      const probes = this.surfaceSimulation.heroProbes;
      if (hotspots.length > 0 && Math.random() < 0.55) {
        const pick = hotspots[Math.floor(Math.random() * hotspots.length)];
        this.focusWorldHotspot(pick);
      } else if (probes.length > 0) {
        const pick = probes[Math.floor(Math.random() * probes.length)];
        this.focusHeroProbe(pick);
      }
    });
    rcRightGroup.appendChild(feelingLuckyBtn);

    const bottomCompleteBtn = createEl('button', 'deco-btn rc-complete-now-btn', '📊 Complete & Score');
    bottomCompleteBtn.type = 'button';
    bottomCompleteBtn.title = 'Finish the simulation run now and open the A2UI Report Card';
    bottomCompleteBtn.addEventListener('click', () => {
      if (!this.surfaceSimulation) return;
      this.surfaceSimulation.completeSimulationRun();
    });
    rcRightGroup.appendChild(bottomCompleteBtn);

    const bottomCancelBtn = createEl('button', 'rc-cancel-end-btn', '⏹ Cancel / End Simulation');
    bottomCancelBtn.type = 'button';
    bottomCancelBtn.title = 'End the active simulation and unlock Learn and Plan modes';
    bottomCancelBtn.addEventListener('click', () => {
      this.cancelOrEndSimulation('plan');
    });
    rcRightGroup.appendChild(bottomCancelBtn);

    rcConsole.appendChild(rcRightGroup);
    bottom.appendChild(rcConsole);

    return bottom;
  }

  /**
   * Renders the Post-Simulation Report Card generated via A2UI v0.8 `surfaceUpdate` component graph
   * (modeled on Race Condition's `completing-the-race` A2UI surface) and opens the modal overlay.
   */
  public renderAndOpenA2uiReportModal(report: ParisSimulationReportCard): void {
    if (!this.a2uiReportModalEl) return;
    this.a2uiReportModalEl.replaceChildren();
    this.a2uiReportModalEl.style.display = 'flex';

    const modalCard = createEl('div', 'deco-panel a2ui-report-card hud-interactive');
    attachDecoCorners(modalCard);

    // Top Header Bar with A2UI Protocol Badge + Resilience Grade Badge
    const topBar = createEl('div', 'a2ui-modal-topbar');
    const protocolLeft = createEl('div', 'a2ui-protocol-left');
    protocolLeft.appendChild(
      createEl('span', 'a2ui-protocol-pill', '✨ A2UI v0.8 • SURFACE UPDATE REPORT CARD')
    );
    protocolLeft.appendChild(
      createEl(
        'span',
        'a2ui-surface-id',
        `surfaceId: ${report.a2uiSurface.surfaceId}`
      )
    );
    topBar.appendChild(protocolLeft);

    const gradeLetter = report.resilienceGrade.charAt(0).toLowerCase();
    const gradeBadge = createEl(
      'div',
      `a2ui-grade-badge grade-${gradeLetter}`,
      `GRADE ${report.resilienceGrade} • ${report.resilienceScore}/100`
    );
    topBar.appendChild(gradeBadge);
    modalCard.appendChild(topBar);

    // Render the A2UI Component Graph starting from `report.a2uiSurface.rootComponentId`
    const compMap = new Map<string, A2uiComponentDef>();
    for (const c of report.a2uiSurface.components) {
      compMap.set(c.id, c);
    }

    const a2uiTreeContainer = createEl('div', 'a2ui-surface-tree-root');
    const rootNode = this.renderA2uiNode(
      report.a2uiSurface.rootComponentId,
      compMap,
      report
    );
    if (rootNode) {
      a2uiTreeContainer.appendChild(rootNode);
    }
    modalCard.appendChild(a2uiTreeContainer);

    // Bottom Modal Action Bar: Inspect Frozen Map | Re-Run | End & Return to Plan | End & Return to Learn
    const footerBar = createEl('div', 'a2ui-modal-footer');

    const inspectMapBtn = createEl(
      'button',
      'deco-btn',
      '👁 Inspect Frozen 3D Map (Keep Simulate Mode)'
    );
    inspectMapBtn.type = 'button';
    inspectMapBtn.addEventListener('click', () => {
      this.a2uiReportModalEl.style.display = 'none';
    });
    footerBar.appendChild(inspectMapBtn);

    const rerunBtn = createEl(
      'button',
      'deco-btn',
      `🔄 Re-Run ${report.durationWallSec}s Simulation`
    );
    rerunBtn.type = 'button';
    rerunBtn.addEventListener('click', () => {
      this.a2uiReportModalEl.style.display = 'none';
      if (this.surfaceSimulation) {
        this.surfaceSimulation.startLiveSimulationRun(
          report.mode,
          report.durationWallSec
        );
      }
      this.refreshSimulationTelemetryUI();
    });
    footerBar.appendChild(rerunBtn);

    const endToPlanBtn = createEl(
      'button',
      'rc-cancel-end-btn a2ui-end-plan-btn',
      '📋 End Simulation & Return to Plan'
    );
    endToPlanBtn.type = 'button';
    endToPlanBtn.addEventListener('click', () => {
      this.cancelOrEndSimulation('plan');
    });
    footerBar.appendChild(endToPlanBtn);

    const endToLearnBtn = createEl(
      'button',
      'deco-btn a2ui-end-learn-btn',
      '📖 End Simulation & Return to Learn'
    );
    endToLearnBtn.type = 'button';
    endToLearnBtn.addEventListener('click', () => {
      this.cancelOrEndSimulation('learn');
    });
    footerBar.appendChild(endToLearnBtn);

    modalCard.appendChild(footerBar);
    this.a2uiReportModalEl.appendChild(modalCard);
  }

  /**
   * Recursively renders an A2UI v0.8 component node (`Card`, `Column`, `Row`, `Text`, `Divider`, `Tabs`, `Button`)
   * into safe DOM elements.
   */
  private renderA2uiNode(
    nodeId: string,
    compMap: Map<string, A2uiComponentDef>,
    report: ParisSimulationReportCard
  ): HTMLElement | null {
    const def = compMap.get(nodeId);
    if (!def) return null;
    const c = def.component;

    if (c.Card) {
      const cardEl = createEl('div', 'a2ui-node-card');
      for (const childId of c.Card.children) {
        const childEl = this.renderA2uiNode(childId, compMap, report);
        if (childEl) cardEl.appendChild(childEl);
      }
      return cardEl;
    }

    if (c.Column) {
      const colEl = createEl('div', 'a2ui-node-column');
      for (const childId of c.Column.children) {
        const childEl = this.renderA2uiNode(childId, compMap, report);
        if (childEl) colEl.appendChild(childEl);
      }
      return colEl;
    }

    if (c.Row) {
      const rowEl = createEl('div', 'a2ui-node-row dist-spaceBetween');
      for (const childId of c.Row.children) {
        const childEl = this.renderA2uiNode(childId, compMap, report);
        if (childEl) rowEl.appendChild(childEl);
      }
      return rowEl;
    }

    if (c.Text) {
      const hint = c.Text.usageHint ?? 'body';
      const txtEl = createEl(
        'div',
        `a2ui-node-text hint-${hint}`,
        c.Text.text
      );
      return txtEl;
    }

    if (c.Divider) {
      return createEl('hr', 'a2ui-node-divider');
    }

    if (c.Tabs) {
      const tabsWrap = createEl('div', 'a2ui-node-tabs');
      const tabHeaderRow = createEl('div', 'a2ui-tabs-header-row');
      const tabBodyWrap = createEl('div', 'a2ui-tabs-body-wrap');
      const items = c.Tabs.tabItems;
      const tabBtns: HTMLButtonElement[] = [];
      const tabPanes: HTMLElement[] = [];

      items.forEach((item, idx) => {
        const btn = createEl(
          'button',
          `a2ui-tab-btn${idx === this.a2uiActiveTabIdx ? ' active' : ''}`,
          item.title
        );
        btn.type = 'button';
        const pane = createEl('div', 'a2ui-tab-pane');
        pane.style.display = idx === this.a2uiActiveTabIdx ? '' : 'none';
        const renderedChild = this.renderA2uiNode(item.child, compMap, report);
        if (renderedChild) pane.appendChild(renderedChild);

        btn.addEventListener('click', () => {
          this.a2uiActiveTabIdx = idx;
          tabBtns.forEach((b, i) => b.classList.toggle('active', i === idx));
          tabPanes.forEach((p, i) => {
            p.style.display = i === idx ? '' : 'none';
          });
        });

        tabBtns.push(btn);
        tabPanes.push(pane);
        tabHeaderRow.appendChild(btn);
        tabBodyWrap.appendChild(pane);
      });

      tabsWrap.appendChild(tabHeaderRow);
      tabsWrap.appendChild(tabBodyWrap);
      return tabsWrap;
    }

    if (c.Button) {
      const btnEl = createEl(
        'button',
        `deco-btn a2ui-node-button${c.Button.primary ? ' primary' : ''}`,
        c.Button.label
      );
      btnEl.type = 'button';
      btnEl.addEventListener('click', () => {
        const actName = c.Button?.action.name;
        if (actName === 'return_to_plan') {
          this.cancelOrEndSimulation('plan');
        } else if (actName === 'return_to_learn') {
          this.cancelOrEndSimulation('learn');
        } else if (actName === 'rerun_simulation') {
          this.a2uiReportModalEl.style.display = 'none';
          this.surfaceSimulation?.startLiveSimulationRun(
            report.mode,
            report.durationWallSec
          );
          this.refreshSimulationTelemetryUI();
        }
      });
      return btnEl;
    }

    return null;
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

    if (lineId !== null && this.experienceMode === 'learn') {
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
    if (this.experienceMode !== 'learn') {
      return;
    }
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

    // 2.5 Refresh Paris Multi-Modal Simulation telemetry every ~0.35s when in Plan or Simulate mode
    this.simUiRefreshAccum += deltaSeconds;
    if (this.simUiRefreshAccum >= 0.35) {
      this.simUiRefreshAccum = 0.0;
      if (this.experienceMode === 'plan' || this.experienceMode === 'simulate') {
        this.refreshSimulationTelemetryUI();
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
    this.setPaperModelState(!this.isPaperModel);
  }

  public setPaperModelState(enabled: boolean): void {
    this.isPaperModel = enabled;
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
