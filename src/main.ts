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

import * as THREE from 'three';
import { VoxelParisBuilder } from './world/VoxelParisBuilder';
import { MetroNetworkRenderer } from './world/MetroNetworkRenderer';
import { SceneManager } from './scene/SceneManager';
import { ArtDecoHUD } from './ui/ArtDecoHUD';
import { STATIONS_MAP } from './data/parisMetroData';
import {
  getParisTerrainElevation,
  PARIS_MONUMENTS
} from './data/parisHistoricalData';
import { ARRONDISSEMENTS_MAP } from './data/parisArrondissementsData';
import {
  fetchParisMetroOnly,
  fetchParisWeatherOnly
} from './data/parisLiveClient';
import { initActiveCityEnvironment } from './cities/activeCityRuntime';

function bootstrapApp(): void {
  initActiveCityEnvironment();
  const appContainer = document.getElementById('app');
  if (!appContainer) return;

  const voxelParis = new VoxelParisBuilder();
  const metroNetwork = new MetroNetworkRenderer();

  let currentYear = 2026;
  let selectedLineId: string | null = null;
  let showGhostStations = true;
  let liveWeatherIntervalId: number | null = null;
  let liveMetroIntervalId: number | null = null;

  let hud: ArtDecoHUD;

  const syncWorldToState = () => {
    voxelParis.updateYear(currentYear);
    const stats = metroNetwork.updateState(currentYear, selectedLineId, showGhostStations);
    if (hud) {
      hud.updateTelemetry(
        currentYear,
        stats.activeLinesCount,
        stats.activeStationsCount,
        stats.closedGhostStationsCount
      );
    }
  };

  const sceneManager = new SceneManager(
    appContainer,
    voxelParis,
    metroNetwork,
    (hovered) => {
      if (hud) {
        hud.showHoveredEntity(hovered);
      }
    },
    (hours) => {
      if (hud) {
        hud.syncTimeOfDayReadout(hours);
      }
    },
    (clicked) => {
      if (hud) {
        hud.handleCanvasEntityClick(clicked);
      }
    },
    (cityOrbitActive) => {
      if (hud) {
        hud.setCityOrbitActiveUI(cityOrbitActive);
      }
    }
  );

  hud = new ArtDecoHUD(appContainer, {
    onYearChange: (year: number) => {
      currentYear = year;
      syncWorldToState();
    },
    onLineSelect: (lineId: string | null) => {
      selectedLineId = lineId;
      syncWorldToState();
    },
    onOpacityChange: (opacity: number) => {
      voxelParis.setSurfaceOpacity(opacity);
      const isUnderground = opacity <= 0.02;
      voxelParis.setUndergroundDarkMode(isUnderground);
      sceneManager.setUndergroundDarkMode(isUnderground);
      if (opacity >= 0.85) {
        hud.setActiveCameraPresetUI('overground');
      } else if (opacity > 0.02) {
        hud.setActiveCameraPresetUI('xray');
      } else {
        hud.setActiveCameraPresetUI('underground');
      }
    },
    onLiftChange: (liftProgress: number, isToggleAction?: boolean) => {
      metroNetwork.setLiftProgress(liftProgress);
      if (isToggleAction) {
        sceneManager.frameLiftedMetro(liftProgress < 0.5);
      }
    },
    onToggleLightColumns: (show: boolean) => {
      metroNetwork.setShowLightColumns(show);
    },
    onBokehChange: (aperture: number) => {
      sceneManager.setBokehAperture(aperture);
    },
    onCameraPreset: (preset) => {
      sceneManager.setCameraPreset(preset);
      if (preset === 'overground') {
        voxelParis.setUndergroundDarkMode(false);
        sceneManager.setUndergroundDarkMode(false);
        voxelParis.setSurfaceOpacity(1.0);
        hud.setOpacityValue(1.0);
        metroNetwork.setShowLightColumns(true);
        hud.setLightColumnsValue(true);
      } else if (preset === 'xray') {
        voxelParis.setUndergroundDarkMode(false);
        sceneManager.setUndergroundDarkMode(false);
        voxelParis.setSurfaceOpacity(0.14);
        hud.setOpacityValue(0.14);
        metroNetwork.setShowLightColumns(false);
        hud.setLightColumnsValue(false);
      } else if (preset === 'underground') {
        voxelParis.setUndergroundDarkMode(true);
        sceneManager.setUndergroundDarkMode(true);
        voxelParis.setSurfaceOpacity(0.0);
        hud.setOpacityValue(0.0);
        metroNetwork.setShowLightColumns(false);
        hud.setLightColumnsValue(false);
      }
    },
    onAtmosphereChange: (mode) => {
      sceneManager.setAtmosphereMode(mode);
    },
    onTimeOfDayChange: (hours: number) => {
      sceneManager.setTimeOfDay(hours);
    },
    onToggleAutoTimeCycle: (enabled: boolean) => {
      sceneManager.setAutoCycleTime(enabled);
    },
    onWeatherChange: (weather) => {
      sceneManager.setWeatherMode(weather);
      voxelParis.setWeatherSurfaceSheen(weather === 'rain');
    },
    onToggleLiveWeather: (enabled: boolean) => {
      if (liveWeatherIntervalId !== null) {
        window.clearInterval(liveWeatherIntervalId);
        liveWeatherIntervalId = null;
      }
      if (!enabled) {
        hud.setLiveWeatherState(false, null);
        return;
      }
      const syncLiveWeather = async () => {
        try {
          const weather = await fetchParisWeatherOnly();
          sceneManager.setWeatherMode(weather.clientSceneState.weatherMode);
          sceneManager.setTimeOfDay(weather.clientSceneState.timeOfDay);
          voxelParis.setWeatherSurfaceSheen(weather.clientSceneState.surfaceWetSheen);
          hud.syncTimeOfDayReadout(weather.clientSceneState.timeOfDay);
          hud.setLiveWeatherState(true, weather);
        } catch (err) {
          console.warn('Live Paris Weather sync failed:', err);
          hud.setLiveWeatherState(false, null);
        }
      };
      void syncLiveWeather();
      liveWeatherIntervalId = window.setInterval(() => {
        void syncLiveWeather();
      }, 300_000);
    },
    onToggleLiveMetro: (enabled: boolean) => {
      if (liveMetroIntervalId !== null) {
        window.clearInterval(liveMetroIntervalId);
        liveMetroIntervalId = null;
      }
      if (!enabled) {
        metroNetwork.setLiveMetroData(null);
        hud.setLiveMetroState(false, null);
        return;
      }
      if (currentYear < 2026) {
        hud.triggerYear(2026);
      }
      const syncLiveMetro = async () => {
        try {
          const metro = await fetchParisMetroOnly();
          metroNetwork.setLiveMetroData(metro.linesById);
          hud.setLiveMetroState(true, metro);
        } catch (err) {
          console.warn('Live Paris Metro sync failed:', err);
          metroNetwork.setLiveMetroData(null);
          hud.setLiveMetroState(false, null);
        }
      };
      void syncLiveMetro();
      liveMetroIntervalId = window.setInterval(() => {
        void syncLiveMetro();
      }, 120_000);
    },
    onToggleGhostStations: (show: boolean) => {
      showGhostStations = show;
      syncWorldToState();
    },
    onTogglePaperModel: (enabled: boolean) => {
      voxelParis.setPaperModelMode(enabled);
    },
    onToggleMonumentOrbit: (enabled: boolean) => {
      sceneManager.setMonumentAutoOrbit(enabled);
    },
    onToggleCityOrbit: (enabled: boolean) => {
      sceneManager.setCityAutoOrbit(enabled);
    },
    onToggleEiffelSparkle: (enabled: boolean) => {
      if (enabled && currentYear < 1889) {
        hud.triggerYear(1889);
      }
      voxelParis.setManualEiffelSparkle(enabled);
    },
    onStepCityOrbit: (deltaRadians: number) => {
      sceneManager.orbitCityByAngle(deltaRadians);
    },
    onZoomCamera: (factor: number) => {
      sceneManager.zoomCameraByFactor(factor);
    },
    onFocusTarget: (kind: 'station' | 'monument' | 'arrondissement', id: string) => {
      if (kind === 'station') {
        sceneManager.setSelectedMonument(null);
        const st = STATIONS_MAP.get(id);
        if (!st) return;
        if (currentYear < st.openedYear) {
          hud.triggerYear(st.openedYear);
        }
        const liftY = metroNetwork.getLiftOffsetY();
        const surfaceY = getParisTerrainElevation(st.x, st.z) + 0.25;
        sceneManager.focusOnWorldPoint(st.x, -2.5 + liftY, st.z, true);
        const radiusScale = st.lines.length >= 3 ? 1.18 : 0.92;
        const colorHex = metroNetwork.getStationHoverColorHex(st);
        metroNetwork.setTourPinnedPosition(
          new THREE.Vector3(st.x, liftY > 1 ? Math.max(surfaceY, liftY - 4) : surfaceY, st.z),
          radiusScale,
          colorHex,
          false
        );
      } else if (kind === 'arrondissement') {
        sceneManager.setSelectedMonument(null);
        const arr = ARRONDISSEMENTS_MAP.get(id);
        if (!arr) return;
        if (voxelParis.getSurfaceOpacity() <= 0.02) {
          voxelParis.setUndergroundDarkMode(false);
          sceneManager.setUndergroundDarkMode(false);
          voxelParis.setSurfaceOpacity(1.0);
          hud.setOpacityValue(1.0);
          hud.setActiveCameraPresetUI('overground');
        }
        const terrainY = getParisTerrainElevation(arr.x, arr.z);
        sceneManager.focusOnArrondissement(
          arr.x,
          terrainY + 1.8,
          arr.z,
          arr.standOffRadius,
          arr.cameraHeightOffset
        );
        metroNetwork.setTourPinnedPosition(
          new THREE.Vector3(arr.x, terrainY + 0.25, arr.z),
          arr.haloRadiusScale,
          0xffe07d,
          true
        );
      } else {
        const m = PARIS_MONUMENTS.find((item) => item.id === id);
        if (!m) return;
        sceneManager.setSelectedMonument(m.id);
        const minYr = m.constructionStartYear ?? m.builtYear;
        if (currentYear < minYr) {
          hud.triggerYear(m.builtYear);
        }
        // If user focuses on an overground monument while in Underground (0% opacity) view, switch to Overground
        if (voxelParis.getSurfaceOpacity() <= 0.02) {
          voxelParis.setUndergroundDarkMode(false);
          sceneManager.setUndergroundDarkMode(false);
          voxelParis.setSurfaceOpacity(1.0);
          hud.setOpacityValue(1.0);
          hud.setActiveCameraPresetUI('overground');
        }
        const terrainY = getParisTerrainElevation(m.x, m.z);
        sceneManager.focusOnWorldPoint(m.x, terrainY + 2, m.z, true);
        const radiusScale = Math.max(1.22, Math.min(2.05, m.radius * 0.42));
        metroNetwork.setTourPinnedPosition(
          new THREE.Vector3(m.x, terrainY + 0.25, m.z),
          radiusScale,
          MetroNetworkRenderer.MONUMENT_HALO_COLOR_HEX,
          true
        );
      }
    },
    onFocusWorldPoint: (x: number, y: number, z: number, colorHex: number) => {
      sceneManager.setSelectedMonument(null);
      if (voxelParis.getSurfaceOpacity() <= 0.02) {
        voxelParis.setUndergroundDarkMode(false);
        sceneManager.setUndergroundDarkMode(false);
        voxelParis.setSurfaceOpacity(1.0);
        hud.setOpacityValue(1.0);
        hud.setActiveCameraPresetUI('overground');
      }
      sceneManager.focusOnWorldPoint(x, y + 1.4, z, true);
      metroNetwork.setTourPinnedPosition(
        new THREE.Vector3(x, y + 0.15, z),
        1.1,
        colorHex,
        false
      );
    },
    onSelectTourStop: (stop) => {
      if (!stop) {
        sceneManager.setSelectedMonument(null);
        metroNetwork.setTourPinnedPosition(null);
        return;
      }
      // If this tour stop is centered on a 3D monument, focus/highlight that monument in colour too
      let matchedMonumentId: string | null = null;
      let bestDist = 3.5;
      for (const m of PARIS_MONUMENTS) {
        const d = Math.hypot(m.x - stop.x, m.z - stop.z);
        if (d < bestDist) {
          bestDist = d;
          matchedMonumentId = m.id;
        }
      }
      sceneManager.setSelectedMonument(matchedMonumentId);
      if (currentYear < stop.timelineYear) {
        hud.triggerYear(stop.timelineYear);
      }
      const terrainY = getParisTerrainElevation(stop.x, stop.z);
      sceneManager.focusOnWorldPoint(stop.x, terrainY + 1.8, stop.z, true);
      metroNetwork.setTourPinnedPosition(
        new THREE.Vector3(stop.x, terrainY + 0.3, stop.z),
        stop.radiusScale,
        0xffe07d,
        false
      );
    }
  });

  let lastFramedSimMode = voxelParis.surfaceSimulation.getSimulationMode();
  voxelParis.surfaceSimulation.onSimulationStateChanged = (mode) => {
    if (mode === 'none') {
      hud.setPaperModelState(false);
      sceneManager.setWeatherMode('clear');
      voxelParis.setWeatherSurfaceSheen(false);
      hud.setActiveWeatherModeUI('clear');
      sceneManager.setTimeOfDay(14.2);
      hud.syncTimeOfDayReadout(14.2);
      lastFramedSimMode = 'none';
      return;
    }

    // Ensure surface city is visible and switch buildings to Grey Maquette contrast so 3D crisis visuals pop vividly
    if (voxelParis.getSurfaceOpacity() <= 0.05) {
      voxelParis.setUndergroundDarkMode(false);
      sceneManager.setUndergroundDarkMode(false);
      voxelParis.setSurfaceOpacity(1.0);
      hud.setOpacityValue(1.0);
      hud.setActiveCameraPresetUI('overground');
    }
    hud.setPaperModelState(true);

    if (lastFramedSimMode !== mode) {
      lastFramedSimMode = mode;
      sceneManager.setSelectedMonument(null);
      if (mode === 'traffic') {
        sceneManager.setWeatherMode('clear');
        voxelParis.setWeatherSurfaceSheen(false);
        hud.setActiveWeatherModeUI('clear');
        sceneManager.setTimeOfDay(14.2);
        hud.syncTimeOfDayReadout(14.2);
        sceneManager.focusOnArrondissement(0, 1.4, -2, 34, 21);
      } else if (mode === 'marathon') {
        sceneManager.setWeatherMode('clear');
        voxelParis.setWeatherSurfaceSheen(false);
        hud.setActiveWeatherModeUI('clear');
        sceneManager.setTimeOfDay(10.8);
        hud.syncTimeOfDayReadout(10.8);
        sceneManager.focusOnArrondissement(-2, 1.4, 1, 38, 23);
      } else if (mode === 'heatwave') {
        sceneManager.setWeatherMode('clear');
        voxelParis.setWeatherSurfaceSheen(false);
        hud.setActiveWeatherModeUI('clear');
        sceneManager.setTimeOfDay(15.4);
        hud.syncTimeOfDayReadout(15.4);
        sceneManager.focusOnArrondissement(1, 1.4, -1, 36, 22);
      } else if (mode === 'protest') {
        sceneManager.setWeatherMode('cloudy');
        voxelParis.setWeatherSurfaceSheen(false);
        hud.setActiveWeatherModeUI('cloudy');
        sceneManager.setTimeOfDay(19.15);
        hud.syncTimeOfDayReadout(19.15);
        sceneManager.focusOnArrondissement(9.5, 1.4, 0.5, 29, 18);
      } else if (mode === 'flood') {
        sceneManager.setWeatherMode('rain');
        voxelParis.setWeatherSurfaceSheen(true);
        hud.setActiveWeatherModeUI('rain');
        sceneManager.setTimeOfDay(16.2);
        hud.syncTimeOfDayReadout(16.2);
        sceneManager.focusOnArrondissement(-2, 1.2, 2.5, 36, 21);
      } else if (mode === 'cyberattack') {
        sceneManager.setWeatherMode('cloudy');
        voxelParis.setWeatherSurfaceSheen(false);
        hud.setActiveWeatherModeUI('cloudy');
        sceneManager.setTimeOfDay(21.6);
        hud.syncTimeOfDayReadout(21.6);
        sceneManager.focusOnArrondissement(1, 1.4, -4, 35, 21);
      }
    }
  };

  hud.setSurfaceSimulation(voxelParis.surfaceSimulation);
  voxelParis.setSurfaceOpacity(1.0);
  syncWorldToState();

  const viewParam = new URLSearchParams(window.location.search).get('view');
  if (viewParam === 'louvre') {
    sceneManager.setCameraImmediate(-7.8, 15.2, 14.5, -1.8, 0.2, 0.8);
  } else if (viewParam === 'bnf') {
    sceneManager.setCameraImmediate(31.0, 7.8, 38.5, 25.26, 0.8, 30.5);
  } else if (viewParam === 'alexandre') {
    sceneManager.setCameraImmediate(-16.5, 11.5, 10.5, -26.2, 0.6, -3.0);
  }

  window.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      return;
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      hud.stepActiveExplorerSelection(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      hud.stepActiveExplorerSelection(1);
    } else if (e.key === 'l' || e.key === 'L') {
      hud.toggleLift();
    } else if (e.key === 'c' || e.key === 'C') {
      hud.toggleLightColumns();
    } else if (e.key === 't' || e.key === 'T') {
      hud.toggleAutoTimeCycle();
    } else if (e.key === 'e' || e.key === 'E') {
      hud.toggleEiffelSparkle();
    } else if (e.key === 'b' || e.key === 'B') {
      hud.cycleBokehMode();
    } else if (e.key === 'm' || e.key === 'M') {
      hud.togglePaperModel();
    } else if (e.key === 'o' || e.key === 'O') {
      hud.toggleMonumentOrbit();
    } else if (e.key === 'r' || e.key === 'R') {
      hud.toggleCityOrbit();
    } else if (e.key === '[') {
      sceneManager.orbitCityByAngle(-Math.PI / 4);
    } else if (e.key === ']') {
      sceneManager.orbitCityByAngle(Math.PI / 4);
    }
  });

  const clock = new THREE.Clock();
  const animate = () => {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const elapsed = clock.getElapsedTime();

    hud.tickPlayback(delta);
    sceneManager.update(elapsed, delta);

    hud.updateWorldHotspotPositions((x, y, z) => sceneManager.projectWorldToScreen(x, y, z));

    const anchoredStation = hud.getAnchoredSpecialStation();
    if (anchoredStation) {
      const proj = sceneManager.projectWorldToScreen(anchoredStation.x, 1.8, anchoredStation.z);
      hud.updateSpecialStationCardPosition(proj.x, proj.y, proj.visible);
    }
  };

  animate();
}

bootstrapApp();
