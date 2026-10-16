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

import type { AtmosphereModeId, WeatherModeId } from '../scene/SceneManager';

export const PARIS_LIVE_BASE_URL =
  'https://paris-metro-apphost--paris-metro-511808.europe-west4.hosted.app';
export const PARIS_LIVE_API_URL = `${PARIS_LIVE_BASE_URL}/api/paris-live`;
export const PARIS_WEATHER_API_URL = `${PARIS_LIVE_BASE_URL}/api/weather`;
export const PARIS_METRO_API_URL = `${PARIS_LIVE_BASE_URL}/api/metro`;

export interface ClientMetroLineLiveState {
  /** Matches `MetroLineConfig.id` in `src/data/parisMetroData.ts` ('1'..'14', '3bis', '7bis') */
  id: string;
  shortLabel: string;
  idfmLineId: string;
  name: string;
  operator: string;
  status: 'active' | string;
  trafficState: 'normal' | 'planned';
  trafficLabelEn: string;
  trafficLabelFr: string;
  /** Multiplier for `SegmentRuntime.trainSpeed` in `MetroNetworkRenderer.ts` */
  trainSpeedMultiplier: number;
  serviceQualityPercent: number;
  colorHex: string;
  textColorHex: string;
  airConditioning: string;
  accessible: boolean;
  automated: boolean;
}

export interface ClientStationSensorTelemetry {
  /** Matches `MetroStationData.id` in `STATIONS_MAP` ('chatelet', 'opera', 'franklin-roosevelt', 'saint-germain-des-pres', 'trocadero') */
  stationId: string;
  stationName: string;
  lineIds: string[];
  sensorLine: string;
  measuredAt: string;
  temperatureC: number | null;
  humidityPercent: number | null;
  co2Ppm: number | null;
  pm10UgM3: number | null;
  pm25UgM3?: number | null;
  no2UgM3: number | null;
}

export interface ParisLiveClientSync {
  weatherMode: WeatherModeId;
  atmosphereMode: AtmosphereModeId;
  timeOfDay: number;
  timeString: string;
  surfaceWetSheen: boolean;
  isDaylight: boolean;
  surfaceTemperatureC: number | null;
  averageUndergroundTemperatureC: number | null;
  tempDeltaUndergroundVsSurfaceC: number | null;
  activeMetroLinesCount: number;
  linesById: Record<string, ClientMetroLineLiveState>;
  stationsById: Record<string, ClientStationSensorTelemetry>;
}

export interface ParisLiveApiResponse {
  service: string;
  project: string;
  clientSync: ParisLiveClientSync;
  weather: {
    source: string;
    observedAt: string;
    timezone: string;
    clientSceneState: {
      weatherMode: WeatherModeId;
      atmosphereMode: AtmosphereModeId;
      timeOfDay: number;
      timeString: string;
      surfaceWetSheen: boolean;
      isDaylight: boolean;
    };
    current: {
      temperatureC: number | null;
      feelsLikeC: number | null;
      humidityPercent: number | null;
      precipitationMm: number;
      cloudCoverPercent: number | null;
      windSpeedKmh: number | null;
      isDay: boolean;
      weatherCode: number;
      conditionEn: string;
      conditionFr: string;
    };
  };
  metro: {
    sources: string[];
    summary: {
      totalLinesTracked: number;
      activeLinesCount: number;
      upcomingGrandParisLinesCount: number;
      undergroundSensorsReporting: number;
      averageUndergroundTempC: number | null;
    };
    linesById: Record<string, ClientMetroLineLiveState>;
    stationsById: Record<string, ClientStationSensorTelemetry>;
    undergroundStationTelemetry: ClientStationSensorTelemetry[];
    lines: ClientMetroLineLiveState[];
  };
}

/**
 * Fetches the pre-massaged Paris weather and RATP/IDFM Métro live state from the
 * Firebase App Hosting cached backend.
 */
export async function fetchParisLiveState(
  endpoint = PARIS_LIVE_API_URL,
): Promise<ParisLiveApiResponse> {
  const response = await fetch(endpoint, {
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch Paris live state: HTTP ${response.status}`);
  }
  return (await response.json()) as ParisLiveApiResponse;
}

/**
 * Fetches only the cached live Paris weather payload from `/api/weather`.
 */
export async function fetchParisWeatherOnly(
  endpoint = PARIS_WEATHER_API_URL,
): Promise<ParisLiveApiResponse['weather']> {
  const response = await fetch(endpoint, {
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch Paris weather: HTTP ${response.status}`);
  }
  const data = (await response.json()) as { weather: ParisLiveApiResponse['weather'] };
  return data.weather;
}

/**
 * Fetches only the cached live Paris Métro & RATP telemetry payload from `/api/metro`.
 */
export async function fetchParisMetroOnly(
  endpoint = PARIS_METRO_API_URL,
): Promise<ParisLiveApiResponse['metro']> {
  const response = await fetch(endpoint, {
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch Paris metro telemetry: HTTP ${response.status}`);
  }
  const data = (await response.json()) as { metro: ParisLiveApiResponse['metro'] };
  return data.metro;
}

