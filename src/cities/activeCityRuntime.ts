/**
 * Copyright 2026 Google LLC
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

import type { CityDataset, CityBridgeDef, CityParkDef, CityPlaceDef } from './types';
import {
  SYDNEY_CITY_DATASET,
  SYDNEY_WATER_CENTERLINES,
  SYDNEY_BRIDGES,
  SYDNEY_PARKS,
  SYDNEY_PLACES
} from './sydney';
import {
  NYC_CITY_DATASET,
  NYC_WATER_CENTERLINES,
  NYC_BRIDGES,
  NYC_PARKS,
  NYC_PLACES
} from './nyc';
import {
  PORTO_CITY_DATASET,
  PORTO_WATER_CENTERLINES,
  PORTO_BRIDGES,
  PORTO_PARKS,
  PORTO_PLACES
} from './porto';
import {
  TOKYO_CITY_DATASET,
  TOKYO_WATER_CENTERLINES,
  TOKYO_BRIDGES,
  TOKYO_PARKS,
  TOKYO_PLACES
} from './tokyo';
import {
  SAN_FRANCISCO_CITY_DATASET,
  SAN_FRANCISCO_WATER_CENTERLINES,
  SAN_FRANCISCO_BRIDGES,
  SAN_FRANCISCO_PARKS,
  SAN_FRANCISCO_PLACES
} from './san-francisco';
import {
  RIO_CITY_DATASET,
  RIO_WATER_CENTERLINES,
  RIO_BRIDGES,
  RIO_PARKS,
  RIO_PLACES
} from './rio';
import {
  WARSAW_CITY_DATASET,
  WARSAW_WATER_CENTERLINES,
  WARSAW_BRIDGES,
  WARSAW_PARKS,
  WARSAW_PLACES
} from './warsaw';
import {
  ZURICH_CITY_DATASET,
  ZURICH_WATER_CENTERLINES,
  ZURICH_BRIDGES,
  ZURICH_PARKS,
  ZURICH_PLACES
} from './zurich';
import {
  MELBOURNE_CITY_DATASET,
  MELBOURNE_WATER_CENTERLINES,
  MELBOURNE_BRIDGES,
  MELBOURNE_PARKS,
  MELBOURNE_PLACES
} from './melbourne';

export type SelectableCityId =
  | 'paris'
  | 'sydney'
  | 'nyc'
  | 'porto'
  | 'tokyo'
  | 'san-francisco'
  | 'rio'
  | 'warsaw'
  | 'zurich'
  | 'melbourne';

export interface SelectableCityMeta {
  id: SelectableCityId;
  label: string;
  shortCode: string;
  country: string;
  vibeBadge: string;
  pageTitle: string;
  districtsTabLabel: string;
  districtsHeaderTitle: string;
  tourHeaderTitle: string;
  skylineHeaderTitle: string;
  searchPlaceholder: string;
  beaconMonumentId: string;
  sparkleButtonLabel: string;
  supportsLiveParisApi: boolean;
}

export const SELECTABLE_CITIES: readonly SelectableCityMeta[] = [
  {
    id: 'paris',
    label: 'Paris',
    shortCode: 'PAR',
    country: 'France',
    vibeBadge: 'Belle Époque & Haussmann',
    pageTitle: 'PARIS METRO • 1900–2026 | 3D Architecture & Historical Network Simulation',
    districtsTabLabel: 'Arrond.',
    districtsHeaderTitle: 'L’ESCARGOT DE PARIS (1er → 20e SPIRAL)',
    tourHeaderTitle: 'FRENCH NATURALISATION WALKING TOUR',
    skylineHeaderTitle: 'WEST → EAST PARIS SKYLINE PROFILE',
    searchPlaceholder: 'Search stations, landmarks, arrondissements...',
    beaconMonumentId: 'monument-eiffel',
    sparkleButtonLabel: '✨ Sparkle Eiffel',
    supportsLiveParisApi: true
  },
  {
    id: 'sydney',
    label: 'Sydney',
    shortCode: 'SYD',
    country: 'Australia',
    vibeBadge: 'Gadigal Ochre & Harbour Sails',
    pageTitle: 'SYDNEY METRO & RAIL • 1900–2026 | 3D Harbour Architecture & Transit Simulation',
    districtsTabLabel: 'Precincts',
    districtsHeaderTitle: 'SYDNEY HARBOUR PRECINCTS (1 → 4)',
    tourHeaderTitle: 'SYDNEY HARBOUR & GADIGAL HERITAGE TOUR',
    skylineHeaderTitle: 'WEST → EAST SYDNEY HARBOUR SKYLINE',
    searchPlaceholder: 'Search stations, harbour landmarks, precincts...',
    beaconMonumentId: 'monument-sydney-tower',
    sparkleButtonLabel: '✨ Sparkle Tower',
    supportsLiveParisApi: false
  },
  {
    id: 'nyc',
    label: 'New York',
    shortCode: 'NYC',
    country: 'United States',
    vibeBadge: 'Gotham Art Deco & Vignelli',
    pageTitle: 'NYC SUBWAY • 1900–2026 | 3D Gotham Architecture & Historical Transit Simulation',
    districtsTabLabel: 'Boroughs',
    districtsHeaderTitle: 'MANHATTAN & HARBOR DISTRICTS (1 → 4)',
    tourHeaderTitle: 'GOTHAM SUBWAY & SKYSCRAPER WALKING TOUR',
    skylineHeaderTitle: 'WEST → EAST MANHATTAN SKYLINE PROFILE',
    searchPlaceholder: 'Search stations, skyscrapers, districts...',
    beaconMonumentId: 'monument-empire-state',
    sparkleButtonLabel: '✨ Sparkle Empire',
    supportsLiveParisApi: false
  },
  {
    id: 'porto',
    label: 'Porto',
    shortCode: 'OPO',
    country: 'Portugal',
    vibeBadge: 'Azulejo Cobalt & Douro Port',
    pageTitle: 'METRO DO PORTO • 1877–2026 | 3D Douro Gorge Architecture & Transit Simulation',
    districtsTabLabel: 'Bairros',
    districtsHeaderTitle: 'BAIRROS DO PORTO & GAIA (1 → 4)',
    tourHeaderTitle: 'DOURO BRIDGES & AZULEJO HERITAGE TOUR',
    skylineHeaderTitle: 'WEST → EAST DOURO GORGE SKYLINE',
    searchPlaceholder: 'Search stations, bridges, bairros...',
    beaconMonumentId: 'monument-clerigos-tower',
    sparkleButtonLabel: '✨ Sparkle Clérigos',
    supportsLiveParisApi: false
  },
  {
    id: 'tokyo',
    label: 'Tokyo',
    shortCode: 'TYO',
    country: 'Japan',
    vibeBadge: 'Edo Vermilion & Neo-Tokyo',
    pageTitle: 'TOKYO METRO & JR • 1914–2026 | 3D Metropolis Architecture & Transit Simulation',
    districtsTabLabel: 'Wards',
    districtsHeaderTitle: 'TOKYO SPECIAL WARDS (1 → 4)',
    tourHeaderTitle: 'EDO SHRINES & NEO-TOKYO TRANSIT TOUR',
    skylineHeaderTitle: 'WEST → EAST TOKYO METROPOLIS SKYLINE',
    searchPlaceholder: 'Search stations, shrines, towers, wards...',
    beaconMonumentId: 'monument-tokyo-tower',
    sparkleButtonLabel: '✨ Sparkle Tower',
    supportsLiveParisApi: false
  },
  {
    id: 'san-francisco',
    label: 'San Francisco',
    shortCode: 'SFO',
    country: 'United States',
    vibeBadge: 'Golden Gate & Bay Fog',
    pageTitle: 'SF BART, MUNI & CABLE CARS • 1873–2026 | 3D Bay Architecture & Transit Simulation',
    districtsTabLabel: 'Districts',
    districtsHeaderTitle: 'SAN FRANCISCO HILL & BAY DISTRICTS (1 → 4)',
    tourHeaderTitle: 'GOLDEN GATE, HILLS & CABLE CAR TOUR',
    skylineHeaderTitle: 'WEST → EAST SAN FRANCISCO BAY SKYLINE',
    searchPlaceholder: 'Search BART/Muni stations, hills, landmarks...',
    beaconMonumentId: 'monument-transamerica-pyramid',
    sparkleButtonLabel: '✨ Sparkle Pyramid',
    supportsLiveParisApi: false
  },
  {
    id: 'rio',
    label: 'Rio',
    shortCode: 'GIG',
    country: 'Brazil',
    vibeBadge: 'Carnival Samba & Burle Marx',
    pageTitle: 'METRÔRIO, VLT & BONDE • 1896–2026 | 3D Carioca Architecture & Transit Simulation',
    districtsTabLabel: 'Bairros',
    districtsHeaderTitle: 'BAIRROS CARIOCAS & ZONA SUL (1 → 4)',
    tourHeaderTitle: 'CARIOCA CULTURAL & ARCHITECTURAL ODYSSEY',
    skylineHeaderTitle: 'WEST → EAST GUANABARA & ZONA SUL SKYLINE',
    searchPlaceholder: 'Search MetrôRio/VLT stations, peaks, bairros...',
    beaconMonumentId: 'monument-christ-redeemer',
    sparkleButtonLabel: '✨ Sparkle Cristo',
    supportsLiveParisApi: false
  },
  {
    id: 'warsaw',
    label: 'Warsaw',
    shortCode: 'WAW',
    country: 'Poland',
    vibeBadge: 'Syrenka Crimson & Chopin Gold',
    pageTitle: 'METRO WARSZAWSKIE, SKM & TRAM • 1927–2026 | 3D Vistula Architecture & Transit Simulation',
    districtsTabLabel: 'Dzielnice',
    districtsHeaderTitle: 'DZIELNICE WARSZAWY (1 → 4)',
    tourHeaderTitle: 'PHOENIX CITY & CHOPIN ROYAL ROUTE TOUR',
    skylineHeaderTitle: 'WEST → EAST VISTULA & WOLA SKYLINE',
    searchPlaceholder: 'Search Metro/SKM stations, palaces, dzielnice...',
    beaconMonumentId: 'monument-palace-culture',
    sparkleButtonLabel: '✨ Sparkle PKiN',
    supportsLiveParisApi: false
  },
  {
    id: 'zurich',
    label: 'Zurich',
    shortCode: 'ZRH',
    country: 'Switzerland',
    vibeBadge: 'Swiss Grid & SBB Alpine Cyan',
    pageTitle: 'ZÜRICH S-BAHN & TRAMS • 1847–2026 | 3D Limmat & Alpine Architecture Simulation',
    districtsTabLabel: 'Kreise',
    districtsHeaderTitle: 'STADTKREISE ZÜRICH & ZÜRICHSEE (1 → 4)',
    tourHeaderTitle: 'LIMMAT, BAHNHOFSTRASSE & UETLIBERG TOUR',
    skylineHeaderTitle: 'WEST → EAST UETLIBERG & ZÜRICHBERG SKYLINE',
    searchPlaceholder: 'Search S-Bahn/VBZ stops, abbeys, Kreise...',
    beaconMonumentId: 'monument-grossmuenster',
    sparkleButtonLabel: '✨ Sparkle Minster',
    supportsLiveParisApi: false
  },
  {
    id: 'melbourne',
    label: 'Melbourne',
    shortCode: 'MEL',
    country: 'Australia',
    vibeBadge: 'W-Class Tram & Fed Square Gold',
    pageTitle: 'MELBOURNE RAIL & TRAMS • 1854–2026 | 3D Hoddle Grid & Yarra Transit Simulation',
    districtsTabLabel: 'Precincts',
    districtsHeaderTitle: 'MELBOURNE PRECINCTS & HODDLE GRID (1 → 4)',
    tourHeaderTitle: 'FLINDERS CLOCKS, LANEWAYS & METRO TUNNEL TOUR',
    skylineHeaderTitle: 'WEST → EAST YARRA & SOUTHBANK SKYLINE',
    searchPlaceholder: 'Search City Loop/Tram stops, landmarks, precincts...',
    beaconMonumentId: 'monument-eureka-tower',
    sparkleButtonLabel: '✨ Sparkle Eureka',
    supportsLiveParisApi: false
  }
] as const;

const ALLOWED_CITY_IDS = new Set<SelectableCityId>([
  'paris',
  'sydney',
  'nyc',
  'porto',
  'tokyo',
  'san-francisco',
  'rio',
  'warsaw',
  'zurich',
  'melbourne'
]);

/**
 * Parses a URL `#` fragment identifier into a validated `SelectableCityId`.
 * Supports `#paris`, `#sydney`, `#nyc`, `#porto`, `#tokyo`, `#san-francisco` (`#sf`), `#rio`, `#warsaw` (`#waw`), `#zurich` (`#zrh`), and `#melbourne` (`#mel`).
 * Defaults to `'paris'` so reloading or opening without a fragment always resolves cleanly.
 */
export function parseCityFragmentHash(rawHash: string): SelectableCityId {
  const cleaned = rawHash
    .replace(/^#\/?/, '')
    .trim()
    .toLowerCase();

  if (cleaned === 'sydney' || cleaned === 'syd') {
    return 'sydney';
  }
  if (cleaned === 'nyc' || cleaned === 'new-york' || cleaned === 'newyork') {
    return 'nyc';
  }
  if (cleaned === 'porto' || cleaned === 'opo') {
    return 'porto';
  }
  if (cleaned === 'tokyo' || cleaned === 'tyo') {
    return 'tokyo';
  }
  if (
    cleaned === 'san-francisco' ||
    cleaned === 'sanfrancisco' ||
    cleaned === 'sf' ||
    cleaned === 'sfo'
  ) {
    return 'san-francisco';
  }
  if (
    cleaned === 'rio' ||
    cleaned === 'rio-de-janeiro' ||
    cleaned === 'riodejaneiro' ||
    cleaned === 'gig'
  ) {
    return 'rio';
  }
  if (cleaned === 'warsaw' || cleaned === 'warszawa' || cleaned === 'waw') {
    return 'warsaw';
  }
  if (cleaned === 'zurich' || cleaned === 'zuerich' || cleaned === 'zürich' || cleaned === 'zrh') {
    return 'zurich';
  }
  if (cleaned === 'melbourne' || cleaned === 'mel' || cleaned === 'naarm') {
    return 'melbourne';
  }
  if (cleaned === 'paris' || cleaned === 'par') {
    return 'paris';
  }
  return 'paris';
}

function resolveInitialCityId(): SelectableCityId {
  if (typeof window === 'undefined') {
    return 'paris';
  }
  const resolved = parseCityFragmentHash(window.location.hash);
  const canonicalHash = `#${resolved}`;
  if (window.location.hash !== canonicalHash) {
    window.history.replaceState(
      null,
      '',
      `${window.location.pathname}${window.location.search}${canonicalHash}`
    );
  }
  return resolved;
}

export const ACTIVE_CITY_ID: SelectableCityId = resolveInitialCityId();

export const ACTIVE_CITY_META: SelectableCityMeta =
  SELECTABLE_CITIES.find((c) => c.id === ACTIVE_CITY_ID) ?? SELECTABLE_CITIES[0];

const PIPELINE_DATASETS: Partial<Record<SelectableCityId, CityDataset>> = {
  sydney: SYDNEY_CITY_DATASET,
  nyc: NYC_CITY_DATASET,
  porto: PORTO_CITY_DATASET,
  tokyo: TOKYO_CITY_DATASET,
  'san-francisco': SAN_FRANCISCO_CITY_DATASET,
  rio: RIO_CITY_DATASET,
  warsaw: WARSAW_CITY_DATASET,
  zurich: ZURICH_CITY_DATASET,
  melbourne: MELBOURNE_CITY_DATASET
};

const PIPELINE_WATER: Partial<Record<SelectableCityId, [number, number, number][]>> = {
  sydney: SYDNEY_WATER_CENTERLINES,
  nyc: NYC_WATER_CENTERLINES,
  porto: PORTO_WATER_CENTERLINES,
  tokyo: TOKYO_WATER_CENTERLINES,
  'san-francisco': SAN_FRANCISCO_WATER_CENTERLINES,
  rio: RIO_WATER_CENTERLINES,
  warsaw: WARSAW_WATER_CENTERLINES,
  zurich: ZURICH_WATER_CENTERLINES,
  melbourne: MELBOURNE_WATER_CENTERLINES
};

const PIPELINE_BRIDGES_MAP: Partial<Record<SelectableCityId, CityBridgeDef[]>> = {
  sydney: SYDNEY_BRIDGES,
  nyc: NYC_BRIDGES,
  porto: PORTO_BRIDGES,
  tokyo: TOKYO_BRIDGES,
  'san-francisco': SAN_FRANCISCO_BRIDGES,
  rio: RIO_BRIDGES,
  warsaw: WARSAW_BRIDGES,
  zurich: ZURICH_BRIDGES,
  melbourne: MELBOURNE_BRIDGES
};

const PIPELINE_PARKS_MAP: Partial<Record<SelectableCityId, CityParkDef[]>> = {
  sydney: SYDNEY_PARKS,
  nyc: NYC_PARKS,
  porto: PORTO_PARKS,
  tokyo: TOKYO_PARKS,
  'san-francisco': SAN_FRANCISCO_PARKS,
  rio: RIO_PARKS,
  warsaw: WARSAW_PARKS,
  zurich: ZURICH_PARKS,
  melbourne: MELBOURNE_PARKS
};

const PIPELINE_PLACES_MAP: Partial<Record<SelectableCityId, CityPlaceDef[]>> = {
  sydney: SYDNEY_PLACES,
  nyc: NYC_PLACES,
  porto: PORTO_PLACES,
  tokyo: TOKYO_PLACES,
  'san-francisco': SAN_FRANCISCO_PLACES,
  rio: RIO_PLACES,
  warsaw: WARSAW_PLACES,
  zurich: ZURICH_PLACES,
  melbourne: MELBOURNE_PLACES
};

export const ACTIVE_PIPELINE_CITY_DATASET: CityDataset | null =
  PIPELINE_DATASETS[ACTIVE_CITY_ID] ?? null;

export const ACTIVE_PIPELINE_WATER_CENTERLINES: [number, number, number][] | null =
  PIPELINE_WATER[ACTIVE_CITY_ID] ?? null;

export const ACTIVE_PIPELINE_BRIDGES: CityBridgeDef[] | null =
  PIPELINE_BRIDGES_MAP[ACTIVE_CITY_ID] ?? null;

export const ACTIVE_PIPELINE_PARKS: CityParkDef[] | null =
  PIPELINE_PARKS_MAP[ACTIVE_CITY_ID] ?? null;

export const ACTIVE_PIPELINE_PLACES: CityPlaceDef[] | null =
  PIPELINE_PLACES_MAP[ACTIVE_CITY_ID] ?? null;

/**
 * Applies the active city's cultural CSS theme and registers the URL `#` fragment listener
 * so manual URL hash edits or browser Back/Forward navigation immediately switch cities.
 */
export function initActiveCityEnvironment(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  document.title = ACTIVE_CITY_META.pageTitle;
  const root = document.documentElement;
  root.setAttribute('data-city-theme', ACTIVE_CITY_ID);

  if (ACTIVE_PIPELINE_CITY_DATASET?.uiTheme?.cssVariables) {
    for (const [key, val] of Object.entries(ACTIVE_PIPELINE_CITY_DATASET.uiTheme.cssVariables)) {
      root.style.setProperty(key, val);
    }
  }

  window.addEventListener('hashchange', () => {
    const nextCity = parseCityFragmentHash(window.location.hash);
    if (nextCity !== ACTIVE_CITY_ID) {
      window.location.reload();
    }
  });
}

/**
 * Switches the active city by updating the URL `#` fragment identifier (`#paris`, `#sydney`, `#nyc`)
 * and reloading into the selected city's 3D world, OSM geometry, Blender monuments, and cultural theme.
 */
export function switchActiveCity(targetCityId: SelectableCityId): void {
  if (typeof window === 'undefined') return;
  if (!ALLOWED_CITY_IDS.has(targetCityId)) return;

  const targetHash = `#${targetCityId}`;
  if (targetCityId === ACTIVE_CITY_ID) {
    if (window.location.hash !== targetHash) {
      window.history.replaceState(
        null,
        '',
        `${window.location.pathname}${window.location.search}${targetHash}`
      );
    }
    return;
  }

  window.location.hash = targetHash;
  window.location.reload();
}

/**
 * Canonical station ID helper so stations shared across multiple lines in Sydney/NYC
 * automatically unify into multi-line interchange hubs.
 */
export function slugifyCityStationId(rawName: string): string {
  return rawName
    .split('(')[0]
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
