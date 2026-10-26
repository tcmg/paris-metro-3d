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

import type { SelectableCityId } from '../cities/activeCityRuntime';
import type { CameraPresetId } from '../scene/SceneManager';

export type DeploymentExperiencePreset = 'learn-only' | 'full-simulation';
export type DeploymentUiScaleDefault = 'auto' | '0.80' | '0.88' | '1.00';

export interface DeploymentConfig {
  /**
   * Controls which top-level experience tabs are enabled for this deployment:
   * - `'learn-only'`: Only the Learn experience (Stations, Monuments, Districts, Tour + 1900–2026 Timeline) is enabled across all cities. The top-left `1. Learn | 2. Plan | 3. Simulate` mode bar is hidden.
   * - `'full-simulation'`: Enables the 3-mode (`1. Learn | 2. Plan | 3. Simulate`) workflow, Race Condition console, and A2UI Report Cards.
   */
  readonly experienceModePreset: DeploymentExperiencePreset;
  /**
   * Derived convenience flag (`true` when `experienceModePreset === 'full-simulation'`).
   */
  readonly enableSimulationModes: boolean;
  /**
   * Default city loaded when no `#city` URL hash is present.
   */
  readonly defaultCityId: SelectableCityId;
  /**
   * Whether the top-right `🌐 CITY` selector drawer is shown so users can switch between the 10 cities.
   */
  readonly enableCitySelector: boolean;
  /**
   * Default UI scale preset when a user has not saved a manual override in `localStorage`.
   * `'auto'` uses responsive laptop scaling (`85%` on 13"–14" screens, `100%` on large desktop monitors).
   */
  readonly defaultUiScale: DeploymentUiScaleDefault;
  /**
   * Initial 3D camera view preset (`'overground' | 'xray' | 'underground'`).
   */
  readonly defaultCameraPreset: CameraPresetId;
  /**
   * Whether skyward Metro light columns are visible on initial load.
   */
  readonly defaultShowLightColumns: boolean;
  /**
   * Whether closed/phantom stations are included on initial load.
   */
  readonly defaultShowGhostStations: boolean;
  /**
   * Whether URL query parameters (e.g. `?sim=1` or `?sim=0`) can override `enableSimulationModes` at runtime.
   */
  readonly allowUrlOverrides: boolean;
}

/**
 * Default Build & Deployment Configuration (used for Firebase Hosting production builds).
 *
 * By default, `experienceModePreset` is set to `'learn-only'` so all cities deploy with the
 * streamlined Learn experience. To build or run with the Plan & Simulate modes enabled:
 * - Run `npm run dev:sim` or `npm run build:sim` (sets `VITE_ENABLE_SIMULATION_MODES=true`), or
 * - Append `?sim=1` to the URL when `allowUrlOverrides` is `true`.
 */
const DEFAULT_DEPLOYMENT_CONFIG: DeploymentConfig = {
  experienceModePreset: 'learn-only',
  enableSimulationModes: false,
  defaultCityId: 'paris',
  enableCitySelector: true,
  defaultUiScale: 'auto',
  defaultCameraPreset: 'overground',
  defaultShowLightColumns: true,
  defaultShowGhostStations: true,
  allowUrlOverrides: true
};

const VALID_CITIES: ReadonlySet<SelectableCityId> = new Set<SelectableCityId>([
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

function parseBooleanEnv(raw: unknown, fallback: boolean): boolean {
  if (typeof raw !== 'string') return fallback;
  const normalized = raw.trim().toLowerCase();
  if (normalized === '1' || normalized === 'true' || normalized === 'yes') return true;
  if (normalized === '0' || normalized === 'false' || normalized === 'no') return false;
  return fallback;
}

function resolveDeploymentConfig(): DeploymentConfig {
  const env = (import.meta as unknown as { env?: Record<string, unknown> }).env ?? {};

  const allowUrlOverrides = parseBooleanEnv(
    env.VITE_ALLOW_URL_OVERRIDES,
    DEFAULT_DEPLOYMENT_CONFIG.allowUrlOverrides
  );

  let enableSimulationModes = DEFAULT_DEPLOYMENT_CONFIG.enableSimulationModes;
  if (typeof env.VITE_EXPERIENCE_MODE === 'string') {
    const modeEnv = env.VITE_EXPERIENCE_MODE.trim().toLowerCase();
    if (modeEnv === 'full-simulation' || modeEnv === 'full' || modeEnv === 'simulate') {
      enableSimulationModes = true;
    } else if (modeEnv === 'learn-only' || modeEnv === 'learn') {
      enableSimulationModes = false;
    }
  }
  if (typeof env.VITE_ENABLE_SIMULATION_MODES === 'string') {
    enableSimulationModes = parseBooleanEnv(
      env.VITE_ENABLE_SIMULATION_MODES,
      enableSimulationModes
    );
  }

  if (allowUrlOverrides && typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const simParam = params.get('sim') ?? params.get('simulation');
    if (simParam === '1' || simParam === 'true') {
      enableSimulationModes = true;
    } else if (simParam === '0' || simParam === 'false') {
      enableSimulationModes = false;
    }
  }

  const experienceModePreset: DeploymentExperiencePreset = enableSimulationModes
    ? 'full-simulation'
    : 'learn-only';

  let defaultCityId: SelectableCityId = DEFAULT_DEPLOYMENT_CONFIG.defaultCityId;
  if (typeof env.VITE_DEFAULT_CITY === 'string') {
    const candidate = env.VITE_DEFAULT_CITY.trim().toLowerCase() as SelectableCityId;
    if (VALID_CITIES.has(candidate)) {
      defaultCityId = candidate;
    }
  }

  const enableCitySelector = parseBooleanEnv(
    env.VITE_ENABLE_CITY_SELECTOR,
    DEFAULT_DEPLOYMENT_CONFIG.enableCitySelector
  );

  let defaultUiScale: DeploymentUiScaleDefault = DEFAULT_DEPLOYMENT_CONFIG.defaultUiScale;
  if (typeof env.VITE_DEFAULT_UI_SCALE === 'string') {
    const rawScale = env.VITE_DEFAULT_UI_SCALE.trim();
    if (
      rawScale === 'auto' ||
      rawScale === '0.80' ||
      rawScale === '0.88' ||
      rawScale === '1.00'
    ) {
      defaultUiScale = rawScale;
    }
  }

  let defaultCameraPreset: CameraPresetId = DEFAULT_DEPLOYMENT_CONFIG.defaultCameraPreset;
  if (typeof env.VITE_DEFAULT_CAMERA_PRESET === 'string') {
    const rawCam = env.VITE_DEFAULT_CAMERA_PRESET.trim().toLowerCase();
    if (rawCam === 'overground' || rawCam === 'xray' || rawCam === 'underground') {
      defaultCameraPreset = rawCam;
    }
  }

  const defaultShowLightColumns = parseBooleanEnv(
    env.VITE_DEFAULT_SHOW_LIGHT_COLUMNS,
    DEFAULT_DEPLOYMENT_CONFIG.defaultShowLightColumns
  );

  const defaultShowGhostStations = parseBooleanEnv(
    env.VITE_DEFAULT_SHOW_GHOST_STATIONS,
    DEFAULT_DEPLOYMENT_CONFIG.defaultShowGhostStations
  );

  return {
    experienceModePreset,
    enableSimulationModes,
    defaultCityId,
    enableCitySelector,
    defaultUiScale,
    defaultCameraPreset,
    defaultShowLightColumns,
    defaultShowGhostStations,
    allowUrlOverrides
  };
}

export const DEPLOYMENT_CONFIG: DeploymentConfig = resolveDeploymentConfig();
