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

export type WeatherModeId = 'clear' | 'cloudy' | 'rain' | 'fog';

export interface SkyWeatherState {
  timeOfDay: number; // 0.0 to 24.0 hours (e.g. 14.0 = 14:00 blue sky afternoon)
  autoCycleTime: boolean;
  timeCycleSpeed: number; // hours per real second when autoCycleTime is true
  weather: WeatherModeId;
}

interface CloudCluster {
  x: number;
  y: number;
  z: number;
  scaleX: number;
  scaleY: number;
  scaleZ: number;
  speed: number;
  phase: number;
}

/**
 * Renders a physically-inspired 3D Parisian Sky Dome, Celestial Sun & Moon along realistic orbital arcs,
 * Twinkling Night Starfield, Drifting 3D Cloud Layer, 3D Rain Precipitation, and Dynamic Sunlight / Moonlight.
 */
export class SkyWeatherSystem {
  public readonly rootGroup = new THREE.Group();

  private skyDomeMesh!: THREE.Mesh;
  private skyShaderMat!: THREE.ShaderMaterial;

  private sunGroup = new THREE.Group();
  private sunCoreMat!: THREE.MeshBasicMaterial;
  private sunHaloSprite!: THREE.Sprite;
  private sunHaloMat!: THREE.SpriteMaterial;

  private moonGroup = new THREE.Group();
  private moonCoreMat!: THREE.MeshBasicMaterial;
  private moonHaloSprite!: THREE.Sprite;
  private moonHaloMat!: THREE.SpriteMaterial;

  private starPoints!: THREE.Points;
  private starMat!: THREE.PointsMaterial;

  private cloudInstanced!: THREE.InstancedMesh;
  private cloudMat!: THREE.MeshStandardMaterial;
  private cloudClusters: CloudCluster[] = [];
  private dummy = new THREE.Object3D();

  private rainSegments!: THREE.LineSegments;
  private rainMat!: THREE.LineBasicMaterial;
  private rainPositions!: Float32Array;
  private readonly rainCount = 2600;

  private state: SkyWeatherState = {
    timeOfDay: 14.2, // Default: Crisp Sunny Blue-Sky Parisian Afternoon (14:12)
    autoCycleTime: false,
    timeCycleSpeed: 0.85, // ~28 seconds per full 24-hour cycle when enabled
    weather: 'clear'
  };

  private currentSunDir = new THREE.Vector3(0.4, 0.8, 0.4).normalize();
  private currentMoonDir = new THREE.Vector3(-0.4, -0.8, -0.4).normalize();
  private lastShadowDir = new THREE.Vector3();

  // Reusable color scratchpad to avoid GC allocations in frame loop
  private zenithColor = new THREE.Color();
  private horizonColor = new THREE.Color();
  private groundBounceColor = new THREE.Color();
  private sunLightColor = new THREE.Color();
  private fogColor = new THREE.Color();

  constructor() {
    this.rootGroup.name = 'ParisSkyAndWeatherSystem';

    this.buildSkyDome();
    this.buildCelestialSunAndMoon();
    this.buildStarfield();
    this.buildCloudLayer();
    this.buildRainSystem();
  }

  /**
   * Builds a 3D Atmospheric Sky Dome with custom Rayleigh/Mie horizon gradient + solar/lunar glow shader.
   */
  private buildSkyDome(): void {
    const geo = new THREE.SphereGeometry(1420, 48, 32);

    this.skyShaderMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        uZenithColor: { value: new THREE.Color(0x1e62b8) },
        uMidSkyColor: { value: new THREE.Color(0x5ea5eb) },
        uHorizonColor: { value: new THREE.Color(0xd2e7fa) },
        uGroundColor: { value: new THREE.Color(0xc8beaa) },
        uSunDir: { value: new THREE.Vector3(0.3, 0.75, 0.4).normalize() },
        uSunGlowColor: { value: new THREE.Color(0xfff1c9) },
        uSunGlowIntensity: { value: 0.65 },
        uMoonDir: { value: new THREE.Vector3(-0.3, -0.75, -0.4).normalize() },
        uMoonGlowIntensity: { value: 0.0 }
      },
      vertexShader: /* glsl */ `
        varying vec3 vWorldDir;
        void main() {
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldDir = normalize(position);
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uZenithColor;
        uniform vec3 uMidSkyColor;
        uniform vec3 uHorizonColor;
        uniform vec3 uGroundColor;
        uniform vec3 uSunDir;
        uniform vec3 uSunGlowColor;
        uniform float uSunGlowIntensity;
        uniform vec3 uMoonDir;
        uniform float uMoonGlowIntensity;

        varying vec3 vWorldDir;

        void main() {
          vec3 dir = normalize(vWorldDir);
          float y = dir.y;

          // Smooth multi-stop sky gradient from horizon (y=0) to mid-sky to zenith (y=1)
          vec3 skyCol;
          if (y >= 0.0) {
            float tMid = smoothstep(0.0, 0.28, y);
            float tZen = smoothstep(0.22, 0.88, y);
            skyCol = mix(uHorizonColor, uMidSkyColor, tMid);
            skyCol = mix(skyCol, uZenithColor, tZen);

            // Warm atmospheric horizon band scatter
            float horizonBand = pow(max(0.0, 1.0 - y * 3.2), 2.4);
            skyCol = mix(skyCol, uHorizonColor, horizonBand * 0.45);
          } else {
            // Below horizon blends smoothly into the ground/fog color
            float tGnd = smoothstep(0.0, -0.18, y);
            skyCol = mix(uHorizonColor, uGroundColor, tGnd);
          }

          // Solar Mie atmospheric scattering glow around the sun
          float sunCos = max(0.0, dot(dir, uSunDir));
          float mieWide = pow(sunCos, 6.0) * 0.34;
          float mieTight = pow(sunCos, 42.0) * 0.55;
          skyCol += uSunGlowColor * (mieWide + mieTight) * uSunGlowIntensity * smoothstep(-0.08, 0.05, y);

          // Subtle nocturnal lunar atmospheric glow around the moon
          float moonCos = max(0.0, dot(dir, uMoonDir));
          float moonHalo = pow(moonCos, 16.0) * 0.22 * uMoonGlowIntensity * smoothstep(-0.05, 0.08, y);
          skyCol += vec3(0.55, 0.72, 0.98) * moonHalo;

          gl_FragColor = vec4(skyCol, 1.0);
        }
      `
    });

    this.skyDomeMesh = new THREE.Mesh(geo, this.skyShaderMat);
    this.skyDomeMesh.frustumCulled = false;
    this.skyDomeMesh.renderOrder = -10;
    this.rootGroup.add(this.skyDomeMesh);
  }

  /**
   * Builds the 3D Sun Disc + Corona Sprite and 3D Cratered Moon Sphere + Lunar Halo Sprite.
   */
  private buildCelestialSunAndMoon(): void {
    const glowTex = this.createRadialGlowTexture();

    // 1. 3D Sun Disc + Corona
    const sunGeo = new THREE.SphereGeometry(26, 24, 24);
    this.sunCoreMat = new THREE.MeshBasicMaterial({
      color: 0xfff9e6,
      fog: false
    });
    const sunMesh = new THREE.Mesh(sunGeo, this.sunCoreMat);
    this.sunGroup.add(sunMesh);

    this.sunHaloMat = new THREE.SpriteMaterial({
      map: glowTex,
      color: 0xffdf8e,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false
    });
    this.sunHaloSprite = new THREE.Sprite(this.sunHaloMat);
    this.sunHaloSprite.scale.set(210, 210, 1);
    this.sunGroup.add(this.sunHaloSprite);
    this.rootGroup.add(this.sunGroup);

    // 2. 3D Moon Sphere (with procedural lunar Mare craters) + Silvery Corona
    const moonTex = this.createMoonSurfaceTexture();
    const moonGeo = new THREE.SphereGeometry(20, 24, 24);
    this.moonCoreMat = new THREE.MeshBasicMaterial({
      map: moonTex,
      color: 0xdce8ff,
      fog: false
    });
    const moonMesh = new THREE.Mesh(moonGeo, this.moonCoreMat);
    this.moonGroup.add(moonMesh);

    this.moonHaloMat = new THREE.SpriteMaterial({
      map: glowTex,
      color: 0x8cb8ff,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false
    });
    this.moonHaloSprite = new THREE.Sprite(this.moonHaloMat);
    this.moonHaloSprite.scale.set(145, 145, 1);
    this.moonGroup.add(this.moonHaloSprite);
    this.rootGroup.add(this.moonGroup);
  }

  private createRadialGlowTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(64, 64, 4, 64, 64, 64);
      grad.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
      grad.addColorStop(0.22, 'rgba(255, 248, 225, 0.72)');
      grad.addColorStop(0.55, 'rgba(255, 230, 180, 0.22)');
      grad.addColorStop(1.0, 'rgba(255, 220, 160, 0.0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  private createMoonSurfaceTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#e8eef7';
      ctx.fillRect(0, 0, 128, 64);
      // Subtle lunar maria patches
      const maria = [
        [36, 26, 14],
        [54, 22, 11],
        [72, 34, 16],
        [92, 24, 10],
        [24, 40, 9]
      ];
      for (const [mx, my, mr] of maria) {
        const g = ctx.createRadialGradient(mx, my, 1, mx, my, mr);
        g.addColorStop(0, 'rgba(155, 168, 190, 0.65)');
        g.addColorStop(1, 'rgba(232, 238, 247, 0.0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(mx, my, mr, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  /**
   * Builds a 3D hemispherical starfield that twinkles in the Parisian night sky.
   */
  private buildStarfield(): void {
    const starCount = 1100;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      // Distribute stars on upper hemisphere (r = 1280)
      const u = Math.random();
      const v = Math.random();
      const theta = u * Math.PI * 2;
      const phi = Math.acos(0.06 + v * 0.94); // Keep above horizon
      const r = 1280;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi);
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

      // Subtle star color temperature variation (warm gold, pure white, icy blue)
      const tint = i % 3;
      colors[i * 3] = tint === 0 ? 1.0 : tint === 1 ? 0.88 : 0.96;
      colors[i * 3 + 1] = tint === 0 ? 0.95 : tint === 1 ? 0.94 : 0.97;
      colors[i * 3 + 2] = tint === 0 ? 0.84 : tint === 1 ? 1.0 : 1.0;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    this.starMat = new THREE.PointsMaterial({
      size: 3.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
      fog: false
    });

    this.starPoints = new THREE.Points(geo, this.starMat);
    this.starPoints.frustumCulled = false;
    this.rootGroup.add(this.starPoints);
  }

  /**
   * Builds drifting 3D cumulus/stratus cloud puffs across the Parisian sky.
   */
  private buildCloudLayer(): void {
    const puffCount = 135;
    const puffGeo = new THREE.IcosahedronGeometry(1.0, 2);

    this.cloudMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.95,
      metalness: 0.0,
      transparent: true,
      opacity: 0.45,
      depthWrite: false
    });

    this.cloudInstanced = new THREE.InstancedMesh(puffGeo, this.cloudMat, puffCount);
    this.cloudInstanced.frustumCulled = false;

    for (let i = 0; i < puffCount; i++) {
      const groupIdx = Math.floor(i / 3);
      const subIdx = i % 3;
      const angle = ((groupIdx * 137.5) % 360) * (Math.PI / 180);
      const dist = 28 + ((groupIdx * 29) % 210);
      const baseX = Math.cos(angle) * dist + (subIdx - 1) * 5.2;
      const baseZ = Math.sin(angle) * dist + ((subIdx * 7) % 3 - 1) * 3.8;
      const baseY = 38 + (groupIdx % 5) * 4.5 + subIdx * 1.1;

      this.cloudClusters.push({
        x: baseX,
        y: baseY,
        z: baseZ,
        scaleX: 7.5 + (i % 4) * 2.8,
        scaleY: 2.1 + (subIdx === 1 ? 1.1 : 0.4),
        scaleZ: 5.8 + (i % 3) * 2.2,
        speed: 0.45 + (groupIdx % 4) * 0.12,
        phase: groupIdx * 0.7
      });
    }

    this.rootGroup.add(this.cloudInstanced);
  }

  /**
   * Builds 3D animated falling rain streaks for the 'rain' weather mode.
   */
  private buildRainSystem(): void {
    this.rainPositions = new Float32Array(this.rainCount * 6);

    for (let i = 0; i < this.rainCount; i++) {
      const rx = (Math.random() - 0.5) * 180;
      const ry = Math.random() * 65;
      const rz = (Math.random() - 0.5) * 180;
      const streakLen = 1.85;

      const idx = i * 6;
      this.rainPositions[idx] = rx;
      this.rainPositions[idx + 1] = ry;
      this.rainPositions[idx + 2] = rz;
      this.rainPositions[idx + 3] = rx - 0.18;
      this.rainPositions[idx + 4] = ry - streakLen;
      this.rainPositions[idx + 5] = rz + 0.12;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(this.rainPositions, 3));

    this.rainMat = new THREE.LineBasicMaterial({
      color: 0xb8d4f2,
      transparent: true,
      opacity: 0.42,
      depthWrite: false
    });

    this.rainSegments = new THREE.LineSegments(geo, this.rainMat);
    this.rainSegments.visible = false;
    this.rainSegments.frustumCulled = false;
    this.rootGroup.add(this.rainSegments);
  }

  public setTimeOfDay(hours: number): void {
    this.state.timeOfDay = ((hours % 24) + 24) % 24;
  }

  public getTimeOfDay(): number {
    return this.state.timeOfDay;
  }

  public setAutoCycleTime(enabled: boolean): void {
    this.state.autoCycleTime = enabled;
  }

  public isAutoCyclingTime(): boolean {
    return this.state.autoCycleTime;
  }

  public setWeather(weather: WeatherModeId): void {
    this.state.weather = weather;
  }

  public getWeather(): WeatherModeId {
    return this.state.weather;
  }

  public getState(): SkyWeatherState {
    return { ...this.state };
  }

  /**
   * Formats 0..24 float hours as "HH:MM" (e.g. 14.5 -> "14:30")
   */
  public static formatHourString(hours: number): string {
    const norm = ((hours % 24) + 24) % 24;
    const h = Math.floor(norm);
    const m = Math.floor((norm - h) * 60);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }

  /**
   * Updates the 3D Sky Dome, Sun & Moon orbital positions, directional sunlight/moonlight,
   * horizon fog, clouds, and precipitation every frame.
   * Returns `true` if the primary directional shadow caster moved enough to warrant a shadow map refresh.
   */
  public update(
    deltaSeconds: number,
    elapsedTime: number,
    cameraPos: THREE.Vector3,
    scene: THREE.Scene,
    renderer: THREE.WebGLRenderer,
    ambientLight: THREE.AmbientLight,
    hemiLight: THREE.HemisphereLight,
    primaryDirLight: THREE.DirectionalLight
  ): boolean {
    if (this.state.autoCycleTime) {
      this.state.timeOfDay = (this.state.timeOfDay + deltaSeconds * this.state.timeCycleSpeed) % 24;
    }

    const hour = this.state.timeOfDay;
    const weather = this.state.weather;

    // Keep sky dome centered on camera XZ so the horizon is always equidistant
    this.skyDomeMesh.position.set(cameraPos.x, 0, cameraPos.z);
    this.starPoints.position.set(cameraPos.x, 0, cameraPos.z);
    this.starPoints.rotation.y = elapsedTime * 0.004;

    // 1. Compute Realistic Solar & Lunar Orbital Vectors for Paris (48.85° N)
    // Sun rises at ~06:00 in the East (-X), transits South (+Z) at 12:00-13:00, sets at ~19:30 in the West (+X)
    const solarPhase = ((hour - 6.25) / 24.0) * Math.PI * 2.0;
    const sunElevSin = Math.sin(solarPhase); // > 0 during day (06:15 to 18:15), peak at 12:15
    const sunAzimuthCos = Math.cos(solarPhase);

    const sunX = -sunAzimuthCos * 0.88;
    const sunY = sunElevSin * 0.82 + 0.08; // Peak altitude ~64 degrees
    const sunZ = 0.42 + Math.max(0, sunElevSin) * 0.16; // Southern arc in Northern Hemisphere
    this.currentSunDir.set(sunX, sunY, sunZ).normalize();

    // Moon orbits opposite the sun
    this.currentMoonDir
      .set(-sunX, -sunElevSin * 0.76 + 0.12, 0.38 + Math.max(0, -sunElevSin) * 0.16)
      .normalize();

    const orbitRadius = 880;
    this.sunGroup.position.set(
      cameraPos.x + this.currentSunDir.x * orbitRadius,
      this.currentSunDir.y * orbitRadius,
      cameraPos.z + this.currentSunDir.z * orbitRadius
    );
    this.sunGroup.visible = this.currentSunDir.y > -0.09;

    this.moonGroup.position.set(
      cameraPos.x + this.currentMoonDir.x * orbitRadius,
      this.currentMoonDir.y * orbitRadius,
      cameraPos.z + this.currentMoonDir.z * orbitRadius
    );
    this.moonGroup.visible = this.currentMoonDir.y > -0.08;

    // 2. Compute Day / Golden Hour / Twilight / Night Factors
    const sY = this.currentSunDir.y;
    const dayFactor = THREE.MathUtils.smoothstep(sY, -0.04, 0.28); // 0 at night, 1 in full day
    const twilightFactor =
      THREE.MathUtils.smoothstep(sY, -0.14, 0.04) *
      (1.0 - THREE.MathUtils.smoothstep(sY, 0.06, 0.34)); // Peaks at sunrise/sunset
    const nightFactor = 1.0 - THREE.MathUtils.smoothstep(sY, -0.12, 0.06);

    // 3. Interpolate Sky Dome Palette (Night -> Dawn/Dusk -> Crisp Parisian Blue Sky)
    // Night palette
    const nightZenith = 0x070f21;
    const nightMid = 0x101d38;
    const nightHoriz = 0x1b2c4d;

    // Golden Hour / Sunset palette
    const duskZenith = 0x264b82;
    const duskMid = 0x7c6d8a;
    const duskHoriz = 0xf29f67;

    // Clear Parisian Blue Sky palette
    const dayZenith = 0x1b5eb8;
    const dayMid = 0x5aa3eb;
    const dayHoriz = 0xd2e8fc;

    this.zenithColor.setHex(nightZenith).lerp(new THREE.Color(duskZenith), 1.0 - nightFactor);
    this.zenithColor.lerp(new THREE.Color(dayZenith), dayFactor);

    const midSkyColor = new THREE.Color(nightMid)
      .lerp(new THREE.Color(duskMid), 1.0 - nightFactor)
      .lerp(new THREE.Color(dayMid), dayFactor);

    this.horizonColor.setHex(nightHoriz).lerp(new THREE.Color(duskHoriz), twilightFactor);
    this.horizonColor.lerp(new THREE.Color(dayHoriz), dayFactor * (1.0 - twilightFactor * 0.55));

    // Weather Atmospheric Overrides (Cloudy / Rain / Fog)
    let fogNear = 215;
    let fogFar = 980;
    let cloudCoverOpacity = 0.36;
    let cloudVisibleCount = 52;

    if (weather === 'cloudy') {
      const overcastZenith = new THREE.Color(0x526d8c).multiplyScalar(0.28 + 0.72 * dayFactor);
      const overcastHoriz = new THREE.Color(0xb8c7d9).multiplyScalar(0.25 + 0.75 * dayFactor);
      this.zenithColor.lerp(overcastZenith, 0.52);
      midSkyColor.lerp(overcastHoriz, 0.48);
      this.horizonColor.lerp(overcastHoriz, 0.55);
      fogNear = 165;
      fogFar = 780;
      cloudCoverOpacity = 0.78;
      cloudVisibleCount = 115;
    } else if (weather === 'rain') {
      const stormZenith = new THREE.Color(0x2d3c4f).multiplyScalar(0.25 + 0.75 * dayFactor);
      const stormHoriz = new THREE.Color(0x6d7f94).multiplyScalar(0.25 + 0.75 * dayFactor);
      this.zenithColor.lerp(stormZenith, 0.78);
      midSkyColor.lerp(stormHoriz, 0.76);
      this.horizonColor.lerp(stormHoriz, 0.8);
      fogNear = 115;
      fogFar = 540;
      cloudCoverOpacity = 0.88;
      cloudVisibleCount = 135;
    } else if (weather === 'fog') {
      const mistColor = new THREE.Color(0xdbe3eb).multiplyScalar(0.25 + 0.75 * dayFactor);
      this.zenithColor.lerp(mistColor, 0.62);
      midSkyColor.lerp(mistColor, 0.78);
      this.horizonColor.lerp(mistColor, 0.88);
      fogNear = 62;
      fogFar = 320;
      cloudCoverOpacity = 0.62;
      cloudVisibleCount = 95;
    }

    // Update Sky Dome Shader Uniforms
    this.skyShaderMat.uniforms.uZenithColor.value.copy(this.zenithColor);
    this.skyShaderMat.uniforms.uMidSkyColor.value.copy(midSkyColor);
    this.skyShaderMat.uniforms.uHorizonColor.value.copy(this.horizonColor);
    this.skyShaderMat.uniforms.uGroundColor.value.copy(this.horizonColor).multiplyScalar(0.92);
    this.skyShaderMat.uniforms.uSunDir.value.copy(this.currentSunDir);
    this.skyShaderMat.uniforms.uMoonDir.value.copy(this.currentMoonDir);

    const sunGlowHex = twilightFactor > 0.25 ? 0xff9d5c : 0xfff2c7;
    this.skyShaderMat.uniforms.uSunGlowColor.value.setHex(sunGlowHex);
    const weatherGlowDamp = weather === 'rain' ? 0.18 : weather === 'fog' ? 0.32 : 1.0;
    this.skyShaderMat.uniforms.uSunGlowIntensity.value =
      (dayFactor * 0.65 + twilightFactor * 0.95) * weatherGlowDamp;
    this.skyShaderMat.uniforms.uMoonGlowIntensity.value = nightFactor * 0.85 * weatherGlowDamp;

    // Sync Scene Background & Distance Fog to Horizon Sky Color
    this.fogColor.copy(this.horizonColor);
    if (scene.background instanceof THREE.Color) {
      scene.background.copy(this.fogColor);
    } else {
      scene.background = this.fogColor.clone();
    }
    if (scene.fog instanceof THREE.Fog) {
      scene.fog.color.copy(this.fogColor);
      scene.fog.near = fogNear;
      scene.fog.far = fogFar;
    }

    // Update Sun & Moon Disc Colors & Opacity
    this.sunCoreMat.color.setHex(twilightFactor > 0.3 ? 0xffb16e : 0xfffbe8);
    this.sunHaloMat.color.setHex(twilightFactor > 0.3 ? 0xff8844 : 0xffe49e);
    this.sunHaloMat.opacity = (0.45 + 0.45 * dayFactor) * weatherGlowDamp;

    this.moonHaloMat.opacity = (0.35 + 0.45 * nightFactor) * weatherGlowDamp;

    // Update Twinkling Starfield Opacity at Night
    const starVis = nightFactor * (weather === 'clear' ? 0.92 : weather === 'cloudy' ? 0.35 : 0.05);
    this.starMat.opacity = starVis;

    // 4. Configure Dynamic Sunlight (Daytime) & Moonlight (Nighttime)
    const isMoonActive = sY < -0.02;
    const activeCelestialDir = isMoonActive ? this.currentMoonDir : this.currentSunDir;
    const lightDist = 115;

    // Ensure shadow-casting light stays at least ~14 degrees above the horizon to avoid extreme grazing shadow artifacts
    const clampedLightY = Math.max(0.24, activeCelestialDir.y);
    primaryDirLight.position.set(
      activeCelestialDir.x * lightDist,
      clampedLightY * lightDist,
      activeCelestialDir.z * lightDist
    );

    if (!isMoonActive) {
      // Direct Sunlight (Warm golden dawn/dusk -> Crisp bright Parisian daylight)
      this.sunLightColor
        .setHex(0xff9c59)
        .lerp(new THREE.Color(0xfff8eb), THREE.MathUtils.smoothstep(sY, 0.02, 0.35));
      if (weather === 'rain') {
        this.sunLightColor.lerp(new THREE.Color(0x9cb2c9), 0.65);
      } else if (weather === 'cloudy' || weather === 'fog') {
        this.sunLightColor.lerp(new THREE.Color(0xdce6f2), 0.38);
      }
      primaryDirLight.color.copy(this.sunLightColor);

      const weatherSunDamp =
        weather === 'rain' ? 0.48 : weather === 'fog' ? 0.62 : weather === 'cloudy' ? 0.78 : 1.0;
      primaryDirLight.intensity = (0.95 + 0.92 * dayFactor) * weatherSunDamp;
    } else {
      // Silvery-Blue Nocturnal Moonlight
      primaryDirLight.color.setHex(0x8eb8ff);
      const weatherMoonDamp = weather === 'rain' ? 0.45 : weather === 'fog' ? 0.6 : 1.0;
      primaryDirLight.intensity = (0.62 + 0.28 * nightFactor) * weatherMoonDamp;
    }

    // Ambient & Hemisphere Sky/Ground Bounce Lighting
    ambientLight.color
      .setHex(0x2a3954)
      .lerp(new THREE.Color(0xf6f0e4), Math.max(0.18, dayFactor + twilightFactor * 0.4));
    ambientLight.intensity = 0.46 + 0.58 * dayFactor + 0.18 * twilightFactor;

    hemiLight.color.copy(midSkyColor).lerp(new THREE.Color(0xffffff), 0.35 * dayFactor);
    this.groundBounceColor
      .setHex(0x182233)
      .lerp(new THREE.Color(0xcfc2ab), Math.max(0.15, dayFactor));
    hemiLight.groundColor.copy(this.groundBounceColor);
    hemiLight.intensity = 0.55 + 0.52 * dayFactor;

    renderer.toneMappingExposure =
      weather === 'rain' ? 0.94 : 0.96 + 0.12 * dayFactor;

    // 5. Animate Drifting 3D Cloud Layer
    this.cloudMat.opacity = cloudCoverOpacity;
    const cloudTint = new THREE.Color(0x283652)
      .lerp(new THREE.Color(0xffbfa0), twilightFactor * 0.75)
      .lerp(new THREE.Color(0xffffff), dayFactor);
    if (weather === 'rain') {
      cloudTint.lerp(new THREE.Color(0x5b6b7d), 0.62);
    }
    this.cloudMat.color.copy(cloudTint);

    for (let i = 0; i < this.cloudClusters.length; i++) {
      if (i >= cloudVisibleCount) {
        this.dummy.scale.setScalar(0.0001);
        this.dummy.updateMatrix();
        this.cloudInstanced.setMatrixAt(i, this.dummy.matrix);
        continue;
      }
      const c = this.cloudClusters[i];
      const driftX = ((c.x + elapsedTime * c.speed + 220) % 440) - 220;
      const bobY = c.y + Math.sin(elapsedTime * 0.4 + c.phase) * 0.35;
      this.dummy.position.set(driftX, bobY, c.z);
      this.dummy.scale.set(c.scaleX, c.scaleY, c.scaleZ);
      this.dummy.updateMatrix();
      this.cloudInstanced.setMatrixAt(i, this.dummy.matrix);
    }
    this.cloudInstanced.instanceMatrix.needsUpdate = true;

    // 6. Animate 3D Falling Rain Streaks when weather === 'rain'
    this.rainSegments.visible = weather === 'rain';
    if (weather === 'rain') {
      this.rainSegments.position.set(cameraPos.x * 0.65, 0, cameraPos.z * 0.65);
      const fallStep = deltaSeconds * 58.0;
      const posAttr = this.rainSegments.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < this.rainCount; i++) {
        const idx = i * 6;
        let y0 = this.rainPositions[idx + 1] - fallStep;
        if (y0 < 0.0) {
          y0 += 65.0;
        }
        this.rainPositions[idx + 1] = y0;
        this.rainPositions[idx + 4] = y0 - 1.85;
      }
      posAttr.needsUpdate = true;
    }

    // Check if the directional shadow caster moved enough to refresh the cached shadow map
    const dirDelta = activeCelestialDir.distanceToSquared(this.lastShadowDir);
    if (dirDelta > 0.00018) {
      this.lastShadowDir.copy(activeCelestialDir);
      return true;
    }
    return false;
  }
}
