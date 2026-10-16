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

export type SelectableCityId = 'paris' | 'sydney' | 'nyc';

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
  }
] as const;

const ALLOWED_CITY_IDS = new Set<SelectableCityId>(['paris', 'sydney', 'nyc']);

/**
 * Parses a URL `#` fragment identifier into a validated `SelectableCityId`.
 * Supports `#paris`, `#sydney`, `#nyc` (plus `#new-york` / `#newyork` aliases).
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

export const ACTIVE_PIPELINE_CITY_DATASET: CityDataset | null =
  ACTIVE_CITY_ID === 'sydney'
    ? SYDNEY_CITY_DATASET
    : ACTIVE_CITY_ID === 'nyc'
      ? NYC_CITY_DATASET
      : null;

export const ACTIVE_PIPELINE_WATER_CENTERLINES: [number, number, number][] | null =
  ACTIVE_CITY_ID === 'sydney'
    ? SYDNEY_WATER_CENTERLINES
    : ACTIVE_CITY_ID === 'nyc'
      ? NYC_WATER_CENTERLINES
      : null;

export const ACTIVE_PIPELINE_BRIDGES: CityBridgeDef[] | null =
  ACTIVE_CITY_ID === 'sydney'
    ? SYDNEY_BRIDGES
    : ACTIVE_CITY_ID === 'nyc'
      ? NYC_BRIDGES
      : null;

export const ACTIVE_PIPELINE_PARKS: CityParkDef[] | null =
  ACTIVE_CITY_ID === 'sydney'
    ? SYDNEY_PARKS
    : ACTIVE_CITY_ID === 'nyc'
      ? NYC_PARKS
      : null;

export const ACTIVE_PIPELINE_PLACES: CityPlaceDef[] | null =
  ACTIVE_CITY_ID === 'sydney'
    ? SYDNEY_PLACES
    : ACTIVE_CITY_ID === 'nyc'
      ? NYC_PLACES
      : null;

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
