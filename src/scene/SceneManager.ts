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
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { MONUMENT_OUTLINE_LAYER, VoxelParisBuilder } from '../world/VoxelParisBuilder';
import { MetroNetworkRenderer } from '../world/MetroNetworkRenderer';
import { MetroStationData } from '../data/parisMetroData';
import { getParisTerrainElevation, ParisMonumentData } from '../data/parisHistoricalData';
import { SkyWeatherSystem, WeatherModeId } from './SkyWeatherSystem';

export type CameraPresetId = 'overground' | 'xray' | 'underground';
export type AtmosphereModeId = 'dusk' | 'night' | 'day' | 'dawn';
export type { WeatherModeId };

export interface HoveredEntity {
  kind: 'station' | 'monument';
  station?: MetroStationData;
  monument?: ParisMonumentData;
  clientX: number;
  clientY: number;
}

export class SceneManager {
  public readonly scene: THREE.Scene;
  public readonly camera: THREE.PerspectiveCamera;
  public readonly renderer: THREE.WebGLRenderer;
  public readonly controls: OrbitControls;
  public readonly skyWeather: SkyWeatherSystem;

  private ambientLight!: THREE.AmbientLight;
  private hemiLight!: THREE.HemisphereLight;
  private sunLight!: THREE.DirectionalLight;
  private undergroundLight!: THREE.PointLight;

  // Offscreen MSAA render target & fullscreen quad for single-draw semi-transparent overground compositing
  private overgroundRT: THREE.WebGLRenderTarget;
  private overgroundRTAllocated = false;
  private compositeScene: THREE.Scene;
  private compositeCamera: THREE.OrthographicCamera;
  private compositeMaterial: THREE.MeshBasicMaterial;
  private shadowNeedsUpdate = true;

  // High-performance single-pass Golden-Angle Vogel Bokeh Depth-of-Field + 4px Monument Outline post-processor
  private postRT: THREE.WebGLRenderTarget;
  private monumentMaskRT: THREE.WebGLRenderTarget;
  private monumentMaskMaterial: THREE.MeshBasicMaterial;
  private maskClearColor = new THREE.Color(0x000000);
  private selectedMonumentId: string | null = null;
  private hoveredMonumentId: string | null = null;
  private bokehScene: THREE.Scene;
  private bokehMaterial: THREE.ShaderMaterial;
  private bokehAperture = 0.55; // 0.0 = off (f/22), 0.55 = default optical lens, 1.0 = f/1.4 miniature tilt-shift
  private smoothedFocusDist = 108.0;
  private smoothedViewPitch = 0.58; // sin(pitch): ~0.58 in overhead view, ~0.12 in shallow horizon view
  private undergroundDarkMode = false;

  private raycaster = new THREE.Raycaster();
  private pointerNDC = new THREE.Vector2(-999, -999);
  private lastClientX = 0;
  private lastClientY = 0;
  private isPointerInside = false;

  private flightStartPos = new THREE.Vector3();
  private flightEndPos = new THREE.Vector3();
  private flightStartTarget = new THREE.Vector3();
  private flightEndTarget = new THREE.Vector3();
  private flightLateralDir = new THREE.Vector3();
  private flightElapsed = 0;
  private flightDuration = 0;
  private flightArcScale = 1.0;
  private isFlyingCamera = false;
  private monumentAutoOrbitEnabled = true;
  private cityAutoOrbitEnabled = false;
  private isFocusedOnMonument = false;
  private isFocusedOnArrondissement = false;
  private focusedMonumentTarget = new THREE.Vector3();
  private isPointerDown = false;

  constructor(
    container: HTMLElement,
    private readonly voxelParis: VoxelParisBuilder,
    private readonly metroNetwork: MetroNetworkRenderer,
    private readonly onHoverChange: (hovered: HoveredEntity | null) => void,
    private readonly onTimeOfDayTick?: (hours: number) => void,
    private readonly onEntityClick?: (clicked: HoveredEntity) => void,
    private readonly onCityOrbitChange?: (active: boolean) => void
  ) {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xd2e8fc);
    this.scene.fog = new THREE.Fog(0xd2e8fc, 215, 820);

    this.camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      1.2,
      850
    );
    this.camera.position.set(0, 62, 88);

    const dpr = Math.min(window.devicePixelRatio, 2);
    const { renderer, isLowPowerFallback } = this.createResilientRenderer();
    this.renderer = renderer;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(isLowPowerFallback ? 1 : dpr);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.06;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // Cache directional shadow map until year, sun/moon angle, or city geometry changes
    this.renderer.shadowMap.autoUpdate = false;
    this.renderer.domElement.className = 'webgl-canvas';
    container.appendChild(this.renderer.domElement);

    const effectiveDpr = isLowPowerFallback ? 1 : dpr;
    const rtW = Math.max(1, Math.floor(window.innerWidth * effectiveDpr));
    const rtH = Math.max(1, Math.floor(window.innerHeight * effectiveDpr));
    const msaaSamples = isLowPowerFallback ? 0 : 4;

    // Lazy-allocated HDR MSAA render target for X-Ray semi-transparent overground compositing:
    // Starts at 1x1 in standard 100% opaque Overground view and expands on demand when X-Ray mode is used
    const overgroundDepthTex = new THREE.DepthTexture(1, 1, THREE.UnsignedIntType);
    this.overgroundRT = new THREE.WebGLRenderTarget(1, 1, {
      type: THREE.HalfFloatType,
      samples: msaaSamples,
      depthBuffer: true,
      stencilBuffer: false,
      depthTexture: overgroundDepthTex
    });

    this.compositeScene = new THREE.Scene();
    this.compositeCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.compositeMaterial = new THREE.MeshBasicMaterial({
      map: this.overgroundRT.texture,
      transparent: true,
      opacity: 1.0,
      depthTest: false,
      depthWrite: false,
      toneMapped: true
    });
    const compositeQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.compositeMaterial);
    compositeQuad.frustumCulled = false;
    this.compositeScene.add(compositeQuad);

    // Offscreen HDR MSAA render target with hardware-resolved DepthTexture for zero-extra-pass Bokeh DoF
    const postDepthTex = new THREE.DepthTexture(rtW, rtH, THREE.UnsignedIntType);
    this.postRT = new THREE.WebGLRenderTarget(rtW, rtH, {
      type: THREE.HalfFloatType,
      samples: msaaSamples,
      depthBuffer: true,
      stencilBuffer: false,
      depthTexture: postDepthTex
    });

    // Lightweight 0.75x silhouette mask render target for the 4px hover stroke outline around 3D monuments
    const maskW = Math.max(1, Math.floor(rtW * 0.75));
    const maskH = Math.max(1, Math.floor(rtH * 0.75));
    this.monumentMaskRT = new THREE.WebGLRenderTarget(maskW, maskH, {
      samples: 0,
      depthBuffer: true,
      stencilBuffer: false
    });
    this.monumentMaskMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide
    });

    this.bokehScene = new THREE.Scene();
    this.bokehMaterial = this.createBokehShaderMaterial(rtW, rtH, effectiveDpr);
    const bokehQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.bokehMaterial);
    bokehQuad.frustumCulled = false;
    this.bokehScene.add(bokehQuad);

    // Probe WebGPU adapter capabilities asynchronously to tune MSAA / post-processing for the active GPU
    void this.probeWebGPUAndTunePipeline();

    this.voxelParis.onShadowCastersChanged = () => {
      this.shadowNeedsUpdate = true;
    };

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.maxDistance = 285;
    this.controls.minDistance = 10;
    this.controls.maxPolarAngle = Math.PI * 0.488;
    this.controls.target.set(0, -1, 0);

    this.setupLights();
    this.skyWeather = new SkyWeatherSystem();
    this.scene.add(this.skyWeather.rootGroup);
    this.scene.add(this.voxelParis.rootGroup);
    this.scene.add(this.metroNetwork.rootGroup);

    this.bindEvents();
  }

  /**
   * Multi-tier resilient renderer initializer:
   * Tries High-Performance WebGL2 -> Default WebGL2 -> Low-Power fallback so GPU command-buffer
   * hiccups (`BindToCurrentSequence failed`) never crash the application if a fallback context is available.
   */
  private createResilientRenderer(): {
    renderer: THREE.WebGLRenderer;
    isLowPowerFallback: boolean;
  } {
    const tiers: { params: THREE.WebGLRendererParameters; isLowPower: boolean }[] = [
      {
        params: { antialias: true, powerPreference: 'high-performance', stencil: false },
        isLowPower: false
      },
      {
        params: { antialias: true, powerPreference: 'default', stencil: false },
        isLowPower: false
      },
      {
        params: { antialias: false, powerPreference: 'low-power', stencil: false },
        isLowPower: true
      }
    ];

    let lastErr: unknown;
    for (const tier of tiers) {
      try {
        const renderer = new THREE.WebGLRenderer(tier.params);
        renderer.domElement.addEventListener('webglcontextlost', (e) => {
          e.preventDefault();
        });
        renderer.domElement.addEventListener('webglcontextrestored', () => {
          this.shadowNeedsUpdate = true;
        });
        return { renderer, isLowPowerFallback: tier.isLowPower };
      } catch (err) {
        lastErr = err;
      }
    }
    throw lastErr;
  }

  /**
   * Probes the browser's WebGPU API (`navigator.gpu`) when available to inspect the hardware
   * adapter tier (`isFallbackAdapter` / compute limits) and dynamically tune offscreen MSAA sample counts.
   */
  private async probeWebGPUAndTunePipeline(): Promise<void> {
    try {
      const nav = navigator as unknown as {
        gpu?: {
          requestAdapter: (opts?: {
            powerPreference?: 'high-performance' | 'low-power';
          }) => Promise<{ isFallbackAdapter?: boolean } | null>;
        };
      };
      if (!nav.gpu || typeof nav.gpu.requestAdapter !== 'function') return;
      const adapter = await nav.gpu.requestAdapter({ powerPreference: 'high-performance' });
      if (!adapter || adapter.isFallbackAdapter) {
        // Constrained / software adapter detected via WebGPU probe: reduce offscreen MSAA overhead
        this.postRT.samples = 2;
        this.overgroundRT.samples = 2;
      }
    } catch {
      // WebGPU unavailable or blocked; continue seamlessly with WebGL2 pipeline
    }
  }

  private ensureOvergroundRTSize(): void {
    const dpr = this.renderer.getPixelRatio();
    const rtW = Math.max(1, Math.floor(window.innerWidth * dpr));
    const rtH = Math.max(1, Math.floor(window.innerHeight * dpr));
    if (!this.overgroundRTAllocated || this.overgroundRT.width !== rtW || this.overgroundRT.height !== rtH) {
      this.overgroundRT.setSize(rtW, rtH);
      this.overgroundRTAllocated = true;
    }
  }

  /**
   * Builds a single-pass 12-tap Golden-Angle Vogel Disc Bokeh Depth-of-Field shader material
   * with view-angle-dependent optical blur (Scheimpflug tilt-shift modulation: full miniature
   * bokeh from overhead angles, automatically opening the focal zone and keeping the skyline/horizon
   * crisp when tilting down to shallow panoramic angles), plus a 4px hover stroke outline.
   */
  private createBokehShaderMaterial(width: number, height: number, dpr: number): THREE.ShaderMaterial {
    return new THREE.ShaderMaterial({
      toneMapped: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        tColor: { value: this.postRT.texture },
        tDepth: { value: this.postRT.depthTexture },
        tOvergroundDepth: { value: this.overgroundRT.depthTexture },
        tMonumentMask: { value: this.monumentMaskRT.texture },
        uUseOvergroundDepth: { value: 0.0 },
        uOutlineActive: { value: 0.0 },
        uOutlineWidthPx: { value: 4.0 * dpr },
        uTexelSize: { value: new THREE.Vector2(1.0 / width, 1.0 / height) },
        uNear: { value: this.camera.near },
        uFar: { value: this.camera.far },
        uFocusDistance: { value: 108.0 },
        uFocalRange: { value: 30.0 },
        uAperture: { value: this.bokehAperture },
        uViewSteepness: { value: 1.0 },
        uMaxBlurPx: { value: 11.0 }
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform sampler2D tColor;
        uniform sampler2D tDepth;
        uniform sampler2D tOvergroundDepth;
        uniform sampler2D tMonumentMask;
        uniform float uUseOvergroundDepth;
        uniform float uOutlineActive;
        uniform float uOutlineWidthPx;
        uniform vec2 uTexelSize;
        uniform float uNear;
        uniform float uFar;
        uniform float uFocusDistance;
        uniform float uFocalRange;
        uniform float uAperture;
        uniform float uViewSteepness;
        uniform float uMaxBlurPx;

        varying vec2 vUv;

        float readLinearDepthFromRaw(float z) {
          float zNdc = z * 2.0 - 1.0;
          return (2.0 * uNear * uFar) / (uFar + uNear - zNdc * (uFar - uNear));
        }

        float computeCoC(vec2 uv) {
          float rawZ = texture2D(tDepth, uv).r;
          float d = readLinearDepthFromRaw(rawZ);
          if (uUseOvergroundDepth > 0.5) {
            float rawOver = texture2D(tOvergroundDepth, uv).r;
            if (rawOver < rawZ) {
              rawZ = rawOver;
              d = readLinearDepthFromRaw(rawOver);
            }
          }
          // Sky dome & horizon protection: keep the horizon and sky completely sharp at shallow view angles
          if (rawZ > 0.9985) {
            return 0.28 * uAperture * uViewSteepness * uViewSteepness;
          }
          float distDelta = abs(d - uFocusDistance);
          float coc = smoothstep(uFocalRange * 0.34, uFocalRange * 2.35, distDelta);

          if (d < uFocusDistance) {
            // Foreground: full tilt-shift emphasis from overhead; gentle bottom-edge optical cue at shallow angles
            float lowAngleBottomMask = mix(smoothstep(0.52, 0.04, uv.y), 1.0, uViewSteepness);
            coc *= mix(0.32, 1.22, uViewSteepness) * lowAngleBottomMask;
          } else {
            // Background / skyline: fade out background blur when tilting down toward the horizon
            coc *= uViewSteepness * uViewSteepness;
          }
          return clamp(coc * uAperture, 0.0, 1.0);
        }

        // Renders a crisp 4px-thick black stroke outline around the hovered 3D monument's outer silhouette
        vec3 applyMonumentOutline(vec3 baseColor, vec2 uv) {
          if (uOutlineActive < 0.5) return baseColor;
          float centerMask = texture2D(tMonumentMask, uv).r;
          if (centerMask > 0.45) {
            return baseColor;
          }
          vec2 stepOuter = uTexelSize * uOutlineWidthPx;
          vec2 stepInner = stepOuter * 0.52;
          float maxNeighbor = 0.0;
          for (int i = 0; i < 12; i++) {
            float angle = float(i) * 0.5235987756;
            vec2 dir = vec2(cos(angle), sin(angle));
            maxNeighbor = max(maxNeighbor, texture2D(tMonumentMask, uv + dir * stepInner).r);
            maxNeighbor = max(maxNeighbor, texture2D(tMonumentMask, uv + dir * stepOuter).r);
          }
          float strokeAlpha =
            smoothstep(0.08, 0.42, maxNeighbor) * (1.0 - smoothstep(0.35, 0.65, centerMask));
          vec3 strokeColor = vec3(0.012, 0.015, 0.022);
          return mix(baseColor, strokeColor, strokeAlpha * 0.96);
        }

        void main() {
          vec4 centerSample = texture2D(tColor, vUv);
          vec3 centerRGB = max(centerSample.rgb, vec3(0.0));
          float centerCoC = computeCoC(vUv);

          // Fast early-out for sharp in-focus pixels inside the focal zone
          if (centerCoC < 0.015) {
            vec3 outlinedRGB = applyMonumentOutline(centerRGB, vUv);
            gl_FragColor = vec4(outlinedRGB, 1.0);
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
            return;
          }

          float blurRadius = centerCoC * uMaxBlurPx;
          vec3 accumColor = centerRGB;
          float accumWeight = 1.0;

          // 12-tap Golden-Angle (2.39996323 rad) Vogel Disc Spiral (25% fewer texture fetches than 16-tap)
          for (int i = 0; i < 12; i++) {
            float fi = float(i);
            float r = sqrt((fi + 0.5) / 12.0);
            float theta = fi * 2.39996323;
            vec2 offset = vec2(cos(theta), sin(theta)) * r * blurRadius * uTexelSize;
            vec2 sampleUv = clamp(vUv + offset, 0.001, 0.999);

            vec3 sampleRGB = max(texture2D(tColor, sampleUv).rgb, vec3(0.0));
            float sampleCoC = computeCoC(sampleUv);

            // Prevent sharp in-focus foreground buildings from bleeding onto blurred backgrounds
            float depthGate = smoothstep(0.0, 0.12, sampleCoC + 0.035);

            // Optical Bokeh Highlight Boost: bright HDR highlights bloom into circular aperture discs
            float luma = dot(sampleRGB, vec3(0.2126, 0.7152, 0.0722));
            float bokehBoost = 1.0 + smoothstep(0.55, 1.45, luma) * 2.4 * sampleCoC;

            // Subtle spherical aberration outer-ring emphasis
            float ringWeight = 0.86 + 0.26 * r;

            float w = depthGate * bokehBoost * ringWeight;
            accumColor += sampleRGB * w;
            accumWeight += w;
          }

          vec3 finalRGB = applyMonumentOutline(accumColor / accumWeight, vUv);
          gl_FragColor = vec4(finalRGB, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `
    });
  }

  private setupLights(): void {
    this.ambientLight = new THREE.AmbientLight(0xf5eee0, 0.96);
    this.scene.add(this.ambientLight);

    this.hemiLight = new THREE.HemisphereLight(0x8ec5fc, 0xcfc2ab, 0.98);
    this.hemiLight.position.set(0, 60, 0);
    this.scene.add(this.hemiLight);

    this.sunLight = new THREE.DirectionalLight(0xfff8eb, 1.75);
    this.sunLight.position.set(-55, 86, 48);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 2048;
    this.sunLight.shadow.mapSize.height = 2048;
    this.sunLight.shadow.camera.near = 10;
    this.sunLight.shadow.camera.far = 310;
    const d = 115;
    this.sunLight.shadow.camera.left = -d;
    this.sunLight.shadow.camera.right = d;
    this.sunLight.shadow.camera.top = d;
    this.sunLight.shadow.camera.bottom = -d;
    this.scene.add(this.sunLight);

    this.undergroundLight = new THREE.PointLight(0xd4af37, 1.4, 180);
    this.undergroundLight.position.set(0, -8, 0);
    this.scene.add(this.undergroundLight);
  }

  public setBokehAperture(aperture: number): void {
    this.bokehAperture = Math.max(0.0, Math.min(1.0, aperture));
    this.bokehMaterial.uniforms.uAperture.value = this.bokehAperture;
  }

  public getBokehAperture(): number {
    return this.bokehAperture;
  }

  public setTimeOfDay(hours: number): void {
    this.skyWeather.setTimeOfDay(hours);
  }

  public getTimeOfDay(): number {
    return this.skyWeather.getTimeOfDay();
  }

  public setAutoCycleTime(enabled: boolean): void {
    this.skyWeather.setAutoCycleTime(enabled);
  }

  public isAutoCyclingTime(): boolean {
    return this.skyWeather.isAutoCyclingTime();
  }

  public setWeatherMode(weather: WeatherModeId): void {
    this.skyWeather.setWeather(weather);
  }

  public getWeatherMode(): WeatherModeId {
    return this.skyWeather.getWeather();
  }

  public setAtmosphereMode(mode: AtmosphereModeId): void {
    if (mode === 'dawn') {
      this.skyWeather.setTimeOfDay(7.25);
    } else if (mode === 'day') {
      this.skyWeather.setTimeOfDay(14.2);
    } else if (mode === 'dusk') {
      this.skyWeather.setTimeOfDay(19.25);
    } else if (mode === 'night') {
      this.skyWeather.setTimeOfDay(23.5);
    }
  }

  private startCameraFlight(
    destCamPos: THREE.Vector3,
    destLookAt: THREE.Vector3,
    arcScale = 1.0,
    durationOverride?: number
  ): void {
    this.flightStartPos.copy(this.camera.position);
    this.flightEndPos.copy(destCamPos);
    this.flightStartTarget.copy(this.controls.target);
    this.flightEndTarget.copy(destLookAt);
    this.flightArcScale = arcScale;

    // Compute horizontal perpendicular vector for a graceful orbital S-curve sweep
    const dx = destCamPos.x - this.flightStartPos.x;
    const dz = destCamPos.z - this.flightStartPos.z;
    const horizDist = Math.hypot(dx, dz);
    if (horizDist > 0.5) {
      this.flightLateralDir.set(-dz / horizDist, 0, dx / horizDist);
    } else {
      this.flightLateralDir.set(1, 0, 0);
    }

    const totalDist = Math.max(
      this.flightStartPos.distanceTo(destCamPos),
      this.flightStartTarget.distanceTo(destLookAt)
    );
    this.flightElapsed = 0;
    this.flightDuration =
      durationOverride ?? THREE.MathUtils.clamp(1.25 + Math.sqrt(totalDist) * 0.14, 1.35, 2.55);
    this.isFlyingCamera = true;
  }

  public setUndergroundDarkMode(dark: boolean): void {
    this.undergroundDarkMode = dark;
    this.skyWeather.rootGroup.visible = !dark;
  }

  public isUndergroundDarkMode(): boolean {
    return this.undergroundDarkMode;
  }

  public setMonumentAutoOrbit(enabled: boolean): void {
    this.monumentAutoOrbitEnabled = enabled;
  }

  public isMonumentAutoOrbitEnabled(): boolean {
    return this.monumentAutoOrbitEnabled;
  }

  public setCityAutoOrbit(enabled: boolean): void {
    this.cityAutoOrbitEnabled = enabled;
    if (enabled) {
      this.isFocusedOnMonument = false;
      this.isFocusedOnArrondissement = false;
      this.setSelectedMonument(null);
      const targetOffset = Math.hypot(this.controls.target.x, this.controls.target.z);
      const camDist = this.camera.position.distanceTo(this.controls.target);
      if (targetOffset > 10.0 || camDist < 55.0) {
        const curAzimuth = Math.atan2(this.camera.position.x, this.camera.position.z);
        const radius = 102.0;
        const destCamPos = new THREE.Vector3(
          Math.sin(curAzimuth) * radius,
          56.0,
          Math.cos(curAzimuth) * radius
        );
        this.startCameraFlight(destCamPos, new THREE.Vector3(0, -1, 0), 0.35);
      }
    }
    this.onCityOrbitChange?.(this.cityAutoOrbitEnabled);
  }

  public isCityAutoOrbitEnabled(): boolean {
    return this.cityAutoOrbitEnabled;
  }

  /**
   * Smoothly steps the camera around the whole city center (0, targetY, 0) by deltaRadians (e.g. ±45°).
   */
  public orbitCityByAngle(deltaRadians: number): void {
    this.isFocusedOnMonument = false;
    this.isFocusedOnArrondissement = false;
    this.setSelectedMonument(null);
    const targetY = THREE.MathUtils.clamp(this.controls.target.y, -7.5, 6.5);
    const destLookAt = new THREE.Vector3(0, targetY, 0);

    const curAzimuth = Math.atan2(this.camera.position.x, this.camera.position.z);
    const nextAzimuth = curAzimuth + deltaRadians;
    const rawHorizDist = Math.hypot(this.camera.position.x, this.camera.position.z);
    const radius = rawHorizDist < 48.0 ? 96.0 : THREE.MathUtils.clamp(rawHorizDist, 64.0, 175.0);
    const camY = rawHorizDist < 48.0 ? 54.0 : THREE.MathUtils.clamp(this.camera.position.y, 14.0, 96.0);

    const destCamPos = new THREE.Vector3(
      Math.sin(nextAzimuth) * radius,
      camY,
      Math.cos(nextAzimuth) * radius
    );
    this.startCameraFlight(destCamPos, destLookAt, 0.12, 0.95);
  }

  /**
   * Smoothly zooms (dollies) the camera in or out relative to the current orbit target.
   */
  public zoomCameraByFactor(factor: number): void {
    const offset = new THREE.Vector3().subVectors(this.camera.position, this.controls.target);
    const curDist = offset.length();
    if (curDist < 0.01) return;
    const nextDist = THREE.MathUtils.clamp(
      curDist * factor,
      this.controls.minDistance + 4.0,
      this.controls.maxDistance - 15.0
    );
    offset.normalize().multiplyScalar(nextDist);
    const destCamPos = new THREE.Vector3().addVectors(this.controls.target, offset);
    destCamPos.y = Math.max(8.5, destCamPos.y);
    this.startCameraFlight(destCamPos, this.controls.target.clone(), 0.0, 0.65);
  }

  public setSelectedMonument(monumentId: string | null): void {
    this.selectedMonumentId = monumentId;
    this.voxelParis.setSelectedMonument(monumentId);
  }

  private syncOutlinedMonument(): void {
    this.voxelParis.setOutlinedMonument(this.hoveredMonumentId);
  }

  public setCameraPreset(preset: CameraPresetId): void {
    this.isFocusedOnMonument = false;
    this.isFocusedOnArrondissement = false;
    this.setSelectedMonument(null);
    if (preset === 'overground') {
      this.startCameraFlight(new THREE.Vector3(0, 62, 88), new THREE.Vector3(0, -1, 0));
    } else if (preset === 'xray') {
      this.startCameraFlight(new THREE.Vector3(16, 13, 52), new THREE.Vector3(0, -6.5, 0));
    } else if (preset === 'underground') {
      this.startCameraFlight(new THREE.Vector3(14, 11.5, 48), new THREE.Vector3(0, -7.2, 0));
    }
  }

  /**
   * Computes an azimuth-preserving cinematic approach vector with a subtle 20-degree orbital reveal
   * and launches a smooth 3D crane-arc camera flight toward the clicked station or monument.
   */
  public focusOnWorldPoint(x: number, y: number, z: number, orbitAroundTarget = false): void {
    const destLookAt = new THREE.Vector3(x, y, z);
    if (this.cityAutoOrbitEnabled) {
      this.cityAutoOrbitEnabled = false;
      this.onCityOrbitChange?.(false);
    }
    this.isFocusedOnArrondissement = false;
    this.isFocusedOnMonument = orbitAroundTarget;
    if (orbitAroundTarget) {
      this.focusedMonumentTarget.set(x, y, z);
    }

    // Preserve the user's current viewing azimuth relative to the target (or current orbit angle)
    // and add a subtle 20-degree (0.35 rad) orbital reveal so the camera never whips 180 degrees
    let vx = this.camera.position.x - x;
    let vz = this.camera.position.z - z;
    let vLen = Math.hypot(vx, vz);
    if (vLen < 4.0) {
      vx = this.camera.position.x - this.controls.target.x;
      vz = this.camera.position.z - this.controls.target.z;
      vLen = Math.hypot(vx, vz) || 1.0;
    }
    const curAzimuth = Math.atan2(vx, vz);
    const arrivalAzimuth = curAzimuth + 0.32;
    const standOffRadius = 24.5;
    const destCamY = Math.max(13.5, y + 16.0);

    const destCamPos = new THREE.Vector3(
      x + Math.sin(arrivalAzimuth) * standOffRadius,
      destCamY,
      z + Math.cos(arrivalAzimuth) * standOffRadius
    );
    this.startCameraFlight(destCamPos, destLookAt);
  }

  /**
   * Flies the camera to a panoramic neighborhood vantage point over a selected Paris Arrondissement
   * and continuously pans/orbits around the arrondissement's streets, rooftops, and landmarks.
   */
  public focusOnArrondissement(
    x: number,
    y: number,
    z: number,
    standOffRadius = 31.5,
    heightOffset = 18.5
  ): void {
    const destLookAt = new THREE.Vector3(x, y, z);
    if (this.cityAutoOrbitEnabled) {
      this.cityAutoOrbitEnabled = false;
      this.onCityOrbitChange?.(false);
    }
    this.isFocusedOnMonument = false;
    this.isFocusedOnArrondissement = true;
    this.focusedMonumentTarget.set(x, y, z);

    let vx = this.camera.position.x - x;
    let vz = this.camera.position.z - z;
    let vLen = Math.hypot(vx, vz);
    if (vLen < 4.0) {
      vx = this.camera.position.x - this.controls.target.x;
      vz = this.camera.position.z - this.controls.target.z;
      vLen = Math.hypot(vx, vz) || 1.0;
    }
    const curAzimuth = Math.atan2(vx, vz);
    const arrivalAzimuth = curAzimuth + 0.36;
    const destCamY = Math.max(15.5, y + heightOffset);

    const destCamPos = new THREE.Vector3(
      x + Math.sin(arrivalAzimuth) * standOffRadius,
      destCamY,
      z + Math.cos(arrivalAzimuth) * standOffRadius
    );
    this.startCameraFlight(destCamPos, destLookAt);
  }

  public setCameraImmediate(
    camX: number,
    camY: number,
    camZ: number,
    lookX: number,
    lookY: number,
    lookZ: number
  ): void {
    this.isFlyingCamera = false;
    this.isFocusedOnMonument = false;
    this.isFocusedOnArrondissement = false;
    this.setSelectedMonument(null);
    this.camera.position.set(camX, camY, camZ);
    this.controls.target.set(lookX, lookY, lookZ);
    this.controls.update();
    this.smoothedFocusDist = this.camera.position.distanceTo(this.controls.target);
  }

  private readonly scratchProjVec = new THREE.Vector3();

  /**
   * Projects a 3D world position (x, y, z) into 2D viewport pixel coordinates (x, y)
   * for anchoring floating UI cards directly above a selected Metro station.
   */
  public projectWorldToScreen(
    x: number,
    y: number,
    z: number
  ): { x: number; y: number; visible: boolean } {
    this.scratchProjVec.set(x, y, z).project(this.camera);
    const visible =
      this.scratchProjVec.z >= -1.0 &&
      this.scratchProjVec.z <= 1.0 &&
      Math.abs(this.scratchProjVec.x) <= 1.15 &&
      Math.abs(this.scratchProjVec.y) <= 1.15;
    const screenX = (this.scratchProjVec.x * 0.5 + 0.5) * window.innerWidth;
    const screenY = (-this.scratchProjVec.y * 0.5 + 0.5) * window.innerHeight;
    return { x: screenX, y: screenY, visible };
  }

  public frameLiftedMetro(lifted: boolean): void {
    this.isFocusedOnMonument = false;
    this.isFocusedOnArrondissement = false;
    this.setSelectedMonument(null);
    if (lifted) {
      this.startCameraFlight(new THREE.Vector3(12, 34, 84), new THREE.Vector3(0, 6.2, 0));
    } else {
      this.startCameraFlight(new THREE.Vector3(0, 62, 88), new THREE.Vector3(0, -1, 0));
    }
  }

  private bindEvents(): void {
    window.addEventListener('resize', () => {
      const dpr = this.renderer.getPixelRatio();
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      const rtW = Math.max(1, Math.floor(window.innerWidth * dpr));
      const rtH = Math.max(1, Math.floor(window.innerHeight * dpr));
      if (this.overgroundRTAllocated) {
        this.overgroundRT.setSize(rtW, rtH);
      }
      this.postRT.setSize(rtW, rtH);
      this.monumentMaskRT.setSize(
        Math.max(1, Math.floor(rtW * 0.75)),
        Math.max(1, Math.floor(rtH * 0.75))
      );
      this.bokehMaterial.uniforms.uTexelSize.value.set(1.0 / rtW, 1.0 / rtH);
      this.bokehMaterial.uniforms.uOutlineWidthPx.value = 4.0 * dpr;
    });

    const canvas = this.renderer.domElement;
    let downX = 0;
    let downY = 0;

    canvas.addEventListener('pointermove', (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      this.pointerNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.pointerNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      this.lastClientX = e.clientX;
      this.lastClientY = e.clientY;
      this.isPointerInside = true;
      if (this.isPointerDown && Math.hypot(e.clientX - downX, e.clientY - downY) >= 5) {
        if (
          this.isFocusedOnMonument ||
          this.isFocusedOnArrondissement ||
          this.selectedMonumentId !== null
        ) {
          this.isFocusedOnMonument = false;
          this.isFocusedOnArrondissement = false;
          this.setSelectedMonument(null);
          this.metroNetwork.setTourPinnedPosition(null);
        }
      }
      this.performRaycast();
    });

    canvas.addEventListener('pointerleave', () => {
      this.isPointerInside = false;
      this.hoveredMonumentId = null;
      this.syncOutlinedMonument();
      this.metroNetwork.setHoveredPosition(null);
      canvas.classList.remove('hovering-node');
      this.onHoverChange(null);
    });

    // Click to focus smoothly on hovered station or monument
    canvas.addEventListener('pointerdown', (e: PointerEvent) => {
      this.isFlyingCamera = false;
      this.isPointerDown = true;
      downX = e.clientX;
      downY = e.clientY;
    });
    window.addEventListener('pointerup', () => {
      this.isPointerDown = false;
    });
    window.addEventListener('pointercancel', () => {
      this.isPointerDown = false;
    });
    canvas.addEventListener('pointerup', (e: PointerEvent) => {
      if (Math.hypot(e.clientX - downX, e.clientY - downY) < 5) {
        const hit = this.getHoveredHit();
        if (hit?.kind === 'station' && hit.station) {
          this.hoveredMonumentId = null;
          this.syncOutlinedMonument();
          this.setSelectedMonument(null);
          const liftY = this.metroNetwork.getLiftOffsetY();
          this.focusOnWorldPoint(hit.station.x, -3 + liftY, hit.station.z, false);
          this.onEntityClick?.(hit);
        } else if (hit?.kind === 'monument' && hit.monument) {
          this.hoveredMonumentId = null;
          this.syncOutlinedMonument();
          this.setSelectedMonument(hit.monument.id);
          const terrainY = getParisTerrainElevation(hit.monument.x, hit.monument.z);
          this.focusOnWorldPoint(hit.monument.x, terrainY + 2, hit.monument.z, true);
          this.onEntityClick?.(hit);
        }
      }
    });
  }

  private getHoveredHit(): HoveredEntity | null {
    if (!this.isPointerInside) return null;
    this.raycaster.setFromCamera(this.pointerNDC, this.camera);

    const surfaceOpacity = this.voxelParis.getSurfaceOpacity();
    const liftY = this.metroNetwork.getLiftOffsetY();
    const isOvergroundView = surfaceOpacity > 0.25 && liftY < 2.0;

    // 1. Raycast against actual 3D monument meshes + tightly fitted 4-slice OBB proxies
    let monResult: { hit: THREE.Intersection; monument: ParisMonumentData; isDirect: boolean } | null =
      null;
    if (surfaceOpacity > 0.02) {
      const monTargets = this.voxelParis.getMonumentRaycastTargets();
      const monHits = this.raycaster.intersectObjects(monTargets, true);
      let bestDirect: {
        hit: THREE.Intersection;
        monument: ParisMonumentData;
        isDirect: boolean;
      } | null = null;
      let bestProxy: {
        hit: THREE.Intersection;
        monument: ParisMonumentData;
        isDirect: boolean;
      } | null = null;

      for (const hit of monHits) {
        const m = hit.object.userData?.monument as ParisMonumentData | undefined;
        if (!m) continue;
        if (hit.object.userData?.isDirectMonumentMesh) {
          if (!bestDirect) {
            bestDirect = { hit, monument: m, isDirect: true };
          }
        } else if (!bestProxy) {
          bestProxy = { hit, monument: m, isDirect: false };
        }
      }
      if (bestDirect && (!bestProxy || bestDirect.hit.distance <= bestProxy.hit.distance + 0.8)) {
        monResult = bestDirect;
      } else {
        monResult = bestProxy ?? bestDirect;
      }
    }

    // 2. Raycast against Metro Stations
    let stResult: { hit: THREE.Intersection; station: MetroStationData } | null = null;
    const stationHits = this.raycaster.intersectObjects(this.metroNetwork.hitMeshes, false);
    for (const hit of stationHits) {
      const st = hit.object.userData?.station as MetroStationData | undefined;
      if (st && hit.object.parent?.visible) {
        stResult = { hit, station: st };
        break;
      }
    }

    if (isOvergroundView) {
      // In Overground view, hovering a 3D monument model takes priority over underground stations beneath it;
      // only an elevated viaduct station closer to the camera can supersede it.
      if (monResult) {
        if (
          stResult &&
          stResult.station.elevated &&
          stResult.hit.distance + 0.25 < monResult.hit.distance
        ) {
          return {
            kind: 'station',
            station: stResult.station,
            clientX: this.lastClientX,
            clientY: this.lastClientY
          };
        }
        return {
          kind: 'monument',
          monument: monResult.monument,
          clientX: this.lastClientX,
          clientY: this.lastClientY
        };
      }
      if (stResult) {
        return {
          kind: 'station',
          station: stResult.station,
          clientX: this.lastClientX,
          clientY: this.lastClientY
        };
      }
      return null;
    }

    // In X-Ray or Underground/Lifted view, Metro stations take priority
    if (stResult) {
      return {
        kind: 'station',
        station: stResult.station,
        clientX: this.lastClientX,
        clientY: this.lastClientY
      };
    }
    if (monResult) {
      return {
        kind: 'monument',
        monument: monResult.monument,
        clientX: this.lastClientX,
        clientY: this.lastClientY
      };
    }

    return null;
  }

  private performRaycast(): void {
    const hovered = this.getHoveredHit();
    const canvas = this.renderer.domElement;

    if (hovered) {
      canvas.classList.add('hovering-node');
      if (hovered.kind === 'station' && hovered.station) {
        this.hoveredMonumentId = null;
        this.syncOutlinedMonument();
        const st = hovered.station;
        const liftY = this.metroNetwork.getLiftOffsetY();
        const surfaceY = getParisTerrainElevation(st.x, st.z) + 0.25;
        const reticleY = liftY > 1.0 ? Math.max(surfaceY, liftY - 4.0) : surfaceY;
        const radiusScale = st.lines.length >= 3 ? 1.18 : 0.92;
        const colorHex = this.metroNetwork.getStationHoverColorHex(st);
        this.metroNetwork.setHoveredPosition(
          new THREE.Vector3(st.x, reticleY, st.z),
          radiusScale,
          colorHex,
          false
        );
      } else if (hovered.kind === 'monument' && hovered.monument) {
        const m = hovered.monument;
        this.hoveredMonumentId = m.id;
        this.syncOutlinedMonument();
        const terrainY = getParisTerrainElevation(m.x, m.z);
        const radiusScale = Math.max(1.22, Math.min(2.05, m.radius * 0.42));
        this.metroNetwork.setHoveredPosition(
          new THREE.Vector3(m.x, terrainY + 0.25, m.z),
          radiusScale,
          MetroNetworkRenderer.MONUMENT_HALO_COLOR_HEX,
          true
        );
      }
      this.onHoverChange(hovered);
    } else {
      canvas.classList.remove('hovering-node');
      this.hoveredMonumentId = null;
      this.syncOutlinedMonument();
      this.metroNetwork.setHoveredPosition(null);
      this.onHoverChange(null);
    }
  }

  public update(elapsedTime: number, deltaSeconds = 0.016): void {
    const dt = Math.min(0.05, Math.max(0.001, deltaSeconds));
    const monumentOrbitSpeed = 0.22; // ~12.6 deg/s gentle architectural showcase orbit
    const arrondissementPanSpeed = 0.17; // ~9.7 deg/s panoramic neighborhood sweep around the arrondissement
    const cityOrbitSpeed = 0.14; // ~8.0 deg/s panoramic 360° city turntable orbit

    if (this.isFlyingCamera) {
      this.flightElapsed += dt;
      const u = Math.min(1.0, this.flightElapsed / this.flightDuration);

      // If flying to a monument, arrondissement, or into city auto-orbit, gently rotate flightEndPos during the second half
      // of the flight so the approach arc flows seamlessly into continuous orbit with C1 angular velocity
      const activeFlightOrbitSpeed = this.cityAutoOrbitEnabled
        ? cityOrbitSpeed
        : this.isFocusedOnArrondissement
          ? arrondissementPanSpeed
          : this.isFocusedOnMonument && this.monumentAutoOrbitEnabled
            ? monumentOrbitSpeed
            : 0.0;
      if (activeFlightOrbitSpeed > 0.0) {
        const dTheta = activeFlightOrbitSpeed * dt * u;
        const cosA = Math.cos(dTheta);
        const sinA = Math.sin(dTheta);
        const fdx = this.flightEndPos.x - this.flightEndTarget.x;
        const fdz = this.flightEndPos.z - this.flightEndTarget.z;
        this.flightEndPos.x = this.flightEndTarget.x + fdx * cosA + fdz * sinA;
        this.flightEndPos.z = this.flightEndTarget.z + fdz * cosA - fdx * sinA;
      }

      // C2-continuous Quintic Ease-In-Out (smootherstep: zero velocity & zero acceleration at both ends)
      const easePos = u * u * u * (u * (u * 6.0 - 15.0) + 10.0);

      // Lead-ahead gaze interpolation: camera pan anticipates the dolly carriage slightly, then settles in unison
      const easeQuartOut = 1.0 - Math.pow(1.0 - u, 3.6);
      const easeLook = easePos * 0.42 + easeQuartOut * 0.58;

      const travelDist = this.flightStartPos.distanceTo(this.flightEndPos);
      const arcEnvelope = Math.sin(Math.PI * easePos) * this.flightArcScale;

      // Parabolic crane lift + gentle horizontal orbital S-curve sweep
      const craneLiftY = Math.min(22.0, travelDist * 0.2) * arcEnvelope;
      const lateralSweep = Math.min(9.5, travelDist * 0.11) * arcEnvelope;

      this.camera.position.lerpVectors(this.flightStartPos, this.flightEndPos, easePos);
      this.camera.position.y += craneLiftY;
      this.camera.position.addScaledVector(this.flightLateralDir, lateralSweep);

      this.controls.target.lerpVectors(this.flightStartTarget, this.flightEndTarget, easeLook);

      if (u >= 1.0) {
        this.camera.position.copy(this.flightEndPos);
        this.controls.target.copy(this.flightEndTarget);
        this.isFlyingCamera = false;
      }
    } else if (this.cityAutoOrbitEnabled && !this.isPointerDown) {
      // Gently keep the orbit center anchored on the heart of Paris (0, target.y, 0)
      const recenterRate = Math.max(0.0, 1.0 - dt * 2.5);
      this.controls.target.x *= recenterRate;
      this.controls.target.z *= recenterRate;

      const dTheta = cityOrbitSpeed * dt;
      const cosA = Math.cos(dTheta);
      const sinA = Math.sin(dTheta);
      const dx = this.camera.position.x - this.controls.target.x;
      const dz = this.camera.position.z - this.controls.target.z;
      this.camera.position.x = this.controls.target.x + dx * cosA + dz * sinA;
      this.camera.position.z = this.controls.target.z + dz * cosA - dx * sinA;
    } else if (this.isFocusedOnArrondissement && !this.isPointerDown) {
      // Panoramic neighborhood pan & orbital sweep around the selected arrondissement
      const panDrift = Math.hypot(
        this.controls.target.x - this.focusedMonumentTarget.x,
        this.controls.target.z - this.focusedMonumentTarget.z
      );
      if (panDrift > 20.0) {
        this.isFocusedOnArrondissement = false;
      } else {
        // Gentle figure-8 target pan across the arrondissement's streets + orbital camera rotation
        const desiredTargetX =
          this.focusedMonumentTarget.x + Math.sin(elapsedTime * 0.28) * 1.45;
        const desiredTargetZ =
          this.focusedMonumentTarget.z + Math.cos(elapsedTime * 0.21) * 1.45;
        const shiftX = (desiredTargetX - this.controls.target.x) * Math.min(1.0, dt * 3.0);
        const shiftZ = (desiredTargetZ - this.controls.target.z) * Math.min(1.0, dt * 3.0);
        this.controls.target.x += shiftX;
        this.controls.target.z += shiftZ;
        this.camera.position.x += shiftX;
        this.camera.position.z += shiftZ;

        const dTheta = arrondissementPanSpeed * dt;
        const cosA = Math.cos(dTheta);
        const sinA = Math.sin(dTheta);
        const dx = this.camera.position.x - this.controls.target.x;
        const dz = this.camera.position.z - this.controls.target.z;
        this.camera.position.x = this.controls.target.x + dx * cosA + dz * sinA;
        this.camera.position.z = this.controls.target.z + dz * cosA - dx * sinA;
      }
    } else if (
      this.isFocusedOnMonument &&
      this.monumentAutoOrbitEnabled &&
      !this.isPointerDown
    ) {
      // Stop monument orbit if user manually panned far away from the monument
      const panDrift = Math.hypot(
        this.controls.target.x - this.focusedMonumentTarget.x,
        this.controls.target.z - this.focusedMonumentTarget.z
      );
      if (panDrift > 16.0) {
        this.isFocusedOnMonument = false;
      } else {
        const dTheta = monumentOrbitSpeed * dt;
        const cosA = Math.cos(dTheta);
        const sinA = Math.sin(dTheta);
        const dx = this.camera.position.x - this.controls.target.x;
        const dz = this.camera.position.z - this.controls.target.z;
        this.camera.position.x = this.controls.target.x + dx * cosA + dz * sinA;
        this.camera.position.z = this.controls.target.z + dz * cosA - dx * sinA;
      }
    }

    this.undergroundLight.position.y = -8 + this.metroNetwork.getLiftOffsetY();

    this.controls.update();

    // Update auto-focus distance & camera view-angle steepness (sin(pitch)) smoothly
    const rawFocusDist = Math.max(1.0, this.camera.position.distanceTo(this.controls.target));
    this.smoothedFocusDist += (rawFocusDist - this.smoothedFocusDist) * 0.15;

    const camElevAboveTarget = Math.max(0.0, this.camera.position.y - this.controls.target.y);
    const rawSinPitch = THREE.MathUtils.clamp(camElevAboveTarget / rawFocusDist, 0.0, 1.0);
    this.smoothedViewPitch += (rawSinPitch - this.smoothedViewPitch) * 0.18;

    // Smoothstep view steepness: 0.0 at shallow horizon angles (< 7°), 1.0 at overhead maquette angles (> 33°)
    const pitchNorm = THREE.MathUtils.clamp((this.smoothedViewPitch - 0.12) / (0.55 - 0.12), 0.0, 1.0);
    const viewSteepness = pitchNorm * pitchNorm * (3.0 - 2.0 * pitchNorm);

    // At shallow horizon angles, expand the sharp focal range (from 0.28x up to 0.96x of focus distance)
    // and attenuate background/horizon blur so the panoramic skyline stays crystal clear
    const focalRangeMultiplier = 0.28 + (1.0 - viewSteepness) * 0.68;
    this.bokehMaterial.uniforms.uFocusDistance.value = this.smoothedFocusDist;
    this.bokehMaterial.uniforms.uFocalRange.value = Math.max(
      14.0,
      this.smoothedFocusDist * focalRangeMultiplier
    );
    this.bokehMaterial.uniforms.uViewSteepness.value = viewSteepness;

    const sunOrMoonMoved = this.skyWeather.update(
      deltaSeconds,
      elapsedTime,
      this.camera.position,
      this.scene,
      this.renderer,
      this.ambientLight,
      this.hemiLight,
      this.sunLight
    );
    if (sunOrMoonMoved) {
      this.shadowNeedsUpdate = true;
    }
    if (this.skyWeather.isAutoCyclingTime()) {
      this.onTimeOfDayTick?.(this.skyWeather.getTimeOfDay());
    }

    // In Underground view mode, darken the entire world so the subterranean Metro lines and station hubs glow vividly
    if (this.undergroundDarkMode) {
      this.skyWeather.rootGroup.visible = false;
      if (this.scene.background instanceof THREE.Color) {
        this.scene.background.setHex(0x050811);
      } else {
        this.scene.background = new THREE.Color(0x050811);
      }
      if (this.scene.fog instanceof THREE.Fog) {
        this.scene.fog.color.setHex(0x050811);
        this.scene.fog.near = 140;
        this.scene.fog.far = 520;
      }
      this.ambientLight.color.setHex(0x1b2438);
      this.ambientLight.intensity = 0.36;
      this.hemiLight.color.setHex(0x283655);
      this.hemiLight.groundColor.setHex(0x070a14);
      this.hemiLight.intensity = 0.32;
      this.sunLight.intensity = 0.28;
      this.undergroundLight.intensity = 2.4;
      this.renderer.toneMappingExposure = 1.08;
    } else {
      this.skyWeather.rootGroup.visible = true;
      this.undergroundLight.intensity = 1.4;
    }

    this.voxelParis.updateAnimation(elapsedTime, this.skyWeather.getTimeOfDay());
    this.metroNetwork.updateAnimation(elapsedTime, deltaSeconds);

    const opacity = this.voxelParis.getSurfaceOpacity();
    const hasMonumentOutline = opacity > 0.02 && this.voxelParis.hasOutlinedMonument();
    this.bokehMaterial.uniforms.uOutlineActive.value = hasMonumentOutline ? 1.0 : 0.0;

    if (hasMonumentOutline) {
      const prevBg = this.scene.background;
      const prevOverride = this.scene.overrideMaterial;
      const prevVis = this.voxelParis.overgroundGroup.visible;
      this.voxelParis.overgroundGroup.visible = true;
      this.scene.background = this.maskClearColor;
      this.scene.overrideMaterial = this.monumentMaskMaterial;
      this.camera.layers.set(MONUMENT_OUTLINE_LAYER);
      this.renderer.setRenderTarget(this.monumentMaskRT);
      this.renderer.clear();
      this.renderer.render(this.scene, this.camera);
      this.camera.layers.set(0);
      this.scene.overrideMaterial = prevOverride;
      this.scene.background = prevBg;
      this.voxelParis.overgroundGroup.visible = prevVis;
    }

    const useBokeh = this.bokehAperture > 0.005;
    const usePostPass = useBokeh || hasMonumentOutline;
    const finalTarget = usePostPass ? this.postRT : null;

    if (opacity >= 0.99) {
      // Fast Path 1: Fully Opaque Overground (Single standard pass)
      this.voxelParis.overgroundGroup.visible = true;
      this.voxelParis.plinthGroup.visible = true;
      this.metroNetwork.rootGroup.visible = true;

      if (this.shadowNeedsUpdate) {
        this.renderer.shadowMap.needsUpdate = true;
        this.shadowNeedsUpdate = false;
      }

      this.renderer.setRenderTarget(finalTarget);
      if (finalTarget) this.renderer.clear();
      this.renderer.render(this.scene, this.camera);
      this.bokehMaterial.uniforms.uUseOvergroundDepth.value = 0.0;
    } else if (opacity <= 0.01) {
      // Fast Path 2: Fully Hidden Overground (Single underground pass)
      this.voxelParis.overgroundGroup.visible = false;
      this.voxelParis.plinthGroup.visible = true;
      this.metroNetwork.rootGroup.visible = true;

      this.renderer.setRenderTarget(finalTarget);
      if (finalTarget) this.renderer.clear();
      this.renderer.render(this.scene, this.camera);
      this.bokehMaterial.uniforms.uUseOvergroundDepth.value = 0.0;
    } else {
      // Fast Path 3: Semi-Transparent Overground X-Ray Mode
      this.ensureOvergroundRTSize();
      // Step A: Render the entire Overground City 100% OPAQUE with hardware Early-Z into offscreen MSAA render target
      this.voxelParis.overgroundGroup.visible = true;
      this.voxelParis.plinthGroup.visible = false;
      this.metroNetwork.rootGroup.visible = false;

      if (this.shadowNeedsUpdate) {
        this.renderer.shadowMap.needsUpdate = true;
        this.shadowNeedsUpdate = false;
      }

      this.renderer.setRenderTarget(this.overgroundRT);
      this.renderer.clear();
      this.renderer.render(this.scene, this.camera);

      // Step B: Render Underground World and composite Overground City in ONE single fullscreen draw operation
      this.renderer.setRenderTarget(finalTarget);
      if (finalTarget) this.renderer.clear();
      this.compositeMaterial.opacity = opacity;

      const isMetroLiftedAboveSurface = this.metroNetwork.getLiftOffsetY() > 0.5;
      if (!isMetroLiftedAboveSurface) {
        this.voxelParis.overgroundGroup.visible = false;
        this.voxelParis.plinthGroup.visible = true;
        this.metroNetwork.rootGroup.visible = true;
        this.renderer.render(this.scene, this.camera);

        const prevAutoClear = this.renderer.autoClear;
        this.renderer.autoClear = false;
        this.renderer.render(this.compositeScene, this.compositeCamera);
        this.renderer.autoClear = prevAutoClear;
      } else {
        this.voxelParis.overgroundGroup.visible = false;
        this.voxelParis.plinthGroup.visible = true;
        this.metroNetwork.rootGroup.visible = false;
        this.renderer.render(this.scene, this.camera);

        const prevAutoClear = this.renderer.autoClear;
        this.renderer.autoClear = false;
        this.renderer.render(this.compositeScene, this.compositeCamera);

        const savedBg = this.scene.background;
        this.scene.background = null;
        this.voxelParis.plinthGroup.visible = false;
        this.metroNetwork.rootGroup.visible = true;
        this.renderer.clearDepth();
        this.renderer.render(this.scene, this.camera);
        this.scene.background = savedBg;
        this.renderer.autoClear = prevAutoClear;
      }

      this.bokehMaterial.uniforms.uUseOvergroundDepth.value = 1.0;

      // Restore visibility for pointer raycasting
      this.voxelParis.overgroundGroup.visible = true;
      this.voxelParis.plinthGroup.visible = true;
      this.metroNetwork.rootGroup.visible = true;
    }

    // Final Pass: Resolve Golden-Angle Vogel Bokeh and/or 4px Monument Outline to screen
    if (usePostPass) {
      this.renderer.setRenderTarget(null);
      this.renderer.render(this.bokehScene, this.compositeCamera);
    }
  }
}
