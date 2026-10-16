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
import {
  ALL_STATIONS,
  METRO_LINES,
  MetroLineConfig,
  MetroStationData,
  STATIONS_MAP
} from '../data/parisMetroData';
import { getParisTerrainElevation } from '../data/parisHistoricalData';
import { applyPaperModelShaderHook } from './ParisMonumentsBuilder';
import {
  createTSLInstancedBasicMaterial,
  createTSLInstancedStandardMaterial,
  WebGPUStationComputeAccelerator,
  writeTranslationScaleMatrix
} from '../scene/WebGPUComputeAndTSL';

interface SegmentRuntime {
  line: MetroLineConfig;
  openedYear: number;
  closedYear?: number;
  elevated: boolean;
  stationIds: string[];
  curve: THREE.CatmullRomCurve3;
  tubeMesh: THREE.Mesh;
  tubeMaterial: THREE.MeshStandardMaterial;
  surfaceTraceMesh?: THREE.Mesh;
  surfaceTraceMat?: THREE.MeshBasicMaterial;
  lightCurtainMesh: THREE.Mesh;
  lightCurtainMat: THREE.MeshBasicMaterial;
  viaductMesh?: THREE.Group;
  trainGroup: THREE.Group;
  trainSpeed: number;
  trainPhase: number;
}

export interface StationRuntime {
  index: number;
  data: MetroStationData;
  group: THREE.Group;
  ghostHaloMesh?: THREE.Mesh;
  hitMesh: THREE.Mesh;
  baseY: number;
  surfaceElev: number;
  groundSurfaceY: number;
  minDepth: number;
  radius: number;
  nodeHeight: number;
  isHub: boolean;
  primaryColor: THREE.Color;
  lightColIndices: { lineId: string; colIdx: number; color: THREE.Color }[];
}

export class MetroNetworkRenderer {
  public static readonly MAX_LIFT_OFFSET_Y = 16.5;
  public static readonly MONUMENT_HALO_COLOR_HEX = 0xffffff;

  public readonly rootGroup = new THREE.Group();
  public readonly liftedGroup = new THREE.Group();
  public readonly surfaceGroup = new THREE.Group();
  public readonly lightColumnsGroup = new THREE.Group();
  public readonly stationRuntimes: StationRuntime[] = [];
  public readonly hitMeshes: THREE.Mesh[] = [];

  private segments: SegmentRuntime[] = [];
  private subNodeInstanced!: THREE.InstancedMesh;
  private subNodeOpacityEmissiveAttr!: THREE.InstancedBufferAttribute;
  private shaftInstanced!: THREE.InstancedMesh;
  private shaftOpacityAttr!: THREE.InstancedBufferAttribute;
  private surfaceRingInstanced!: THREE.InstancedMesh;
  private ringOpacityAttr!: THREE.InstancedBufferAttribute;
  private lightColumnInstanced!: THREE.InstancedMesh;
  private lightColOpacityAttr!: THREE.InstancedBufferAttribute;
  private lineColorLookup = new Map<string, THREE.Color>();
  private lineGlowColorLookup = new Map<string, THREE.Color>();
  private webgpuCompute?: WebGPUStationComputeAccelerator;

  private hoverReticleGroup = new THREE.Group();
  private hoverOuterRingMesh!: THREE.Mesh;
  private hoverOuterRingMat!: THREE.MeshBasicMaterial;
  private hoverInnerHaloMesh!: THREE.Mesh;
  private hoverInnerHaloMat!: THREE.MeshBasicMaterial;
  private hoverBeamMesh!: THREE.Mesh;
  private hoverBeamMat!: THREE.MeshBasicMaterial;
  private hoverCurrentPos = new THREE.Vector3();
  private hoverTargetPos = new THREE.Vector3();
  private hoverVelocity = new THREE.Vector3();
  private hoverCurrentScale = 1.0;
  private hoverTargetScale = 1.0;
  private hoverScaleVel = 0.0;
  private hoverCurrentBeamHeightScale = 1.0;
  private hoverTargetBeamHeightScale = 1.0;
  private hoverCurrentIntensity = 1.0;
  private hoverTargetIntensity = 1.0;
  private hoverCurrentColor = new THREE.Color(0xffe07d);
  private hoverTargetColor = new THREE.Color(0xffe07d);
  private hoverPresence = 0.0;
  private hoverIsActive = false;
  private hoverHasInitialized = false;
  private liftedDatumGridMat!: THREE.Material;
  private liftedDatumFrameMat!: THREE.MeshBasicMaterial;
  private liftedDatumGroup = new THREE.Group();
  private lightCurtainTexture: THREE.CanvasTexture;

  private currentYear = 2026;
  private selectedLineId: string | null = null;
  private showGhostStations = true;
  private showLightColumns = true;
  private liftProgress = 0.0;

  constructor() {
    this.rootGroup.name = 'ParisMetroNetwork3D';
    this.liftedGroup.name = 'LiftedMetroConstellation';
    this.surfaceGroup.name = 'SurfaceMetroTraces';
    this.lightColumnsGroup.name = 'SkyLightCurtainsAndColumns';

    this.rootGroup.add(this.surfaceGroup);
    this.rootGroup.add(this.lightColumnsGroup);
    this.rootGroup.add(this.liftedGroup);

    for (const l of METRO_LINES) {
      const c = new THREE.Color(l.color);
      this.lineColorLookup.set(l.id, c);
      this.lineGlowColorLookup.set(l.id, this.computeCurtainGlowColor(c));
    }

    this.lightCurtainTexture = this.createLightCurtainTexture();
    this.buildLiftedDatumFrame();
    this.buildSegmentsAndTrains();
    this.buildStationNodes();
    this.buildHoverReticle();
    this.setLiftProgress(0.0);
  }

  /**
   * Generates a 64x256 vertical gradient alpha texture for the upward-radiating
   * Metro light curtains and station joint columns:
   * - Ramps in immediately above the 3-lane ground strip
   * - Maintains strong luminous visibility well above Haussmannian rooftops & hills
   * - Dissolves smoothly into the Parisian sky at the top of the column.
   */
  private createLightCurtainTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const imgData = ctx.createImageData(64, 256);
      const data = imgData.data;

      for (let py = 0; py < 256; py++) {
        // v = 0 at bottom (py = 255), v = 1 at top (py = 0)
        const v = 1.0 - py / 255;
        const bottomFade = Math.min(1.0, v / 0.04);
        const topFade = Math.pow(Math.max(0, 1.0 - v), 1.45);
        const baseAlpha = bottomFade * topFade * 0.86;
        const boost = 255;

        for (let px = 0; px < 64; px++) {
          const u = (px / 64) * Math.PI * 2;
          // Subtle vertical light-column ray modulation
          const ray = 0.88 + 0.12 * Math.sin(u * 3.0) * Math.cos(u * 1.0);
          const alpha = Math.min(255, Math.max(0, Math.round(baseAlpha * ray * 255)));

          const idx = (py * 64 + px) * 4;
          data[idx] = boost;
          data[idx + 1] = boost;
          data[idx + 2] = boost;
          data[idx + 3] = alpha;
        }
      }
      ctx.putImageData(imgData, 0, 0);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    return tex;
  }

  /**
   * Computes the local ground surface height at (x, z) just above the terrain height itself
   * so the flat 3-lane Metro ground line hugs the terrain while passing naturally beneath
   * buildings, monuments, trees, and Seine bridges.
   */
  public getGroundSurfaceElevation(x: number, z: number): number {
    return getParisTerrainElevation(x, z) + 0.044;
  }

  /**
   * Computes a vibrant, high-contrast vertical glow colour in perceptual sRGB space (`THREE.SRGBColorSpace`)
   * so pale pastel lines (like Line 13 sky-cyan #6EC4E8, Line 6 mint-green #6ECA97, Line 7 pink #FA9ABA)
   * radiate with rich chroma above the cream limestone rooftops instead of washing out.
   */
  private computeCurtainGlowColor(baseColor: THREE.Color): THREE.Color {
    const hsl = { h: 0, s: 0, l: 0 };
    baseColor.getHSL(hsl, THREE.SRGBColorSpace);
    if (hsl.l > 0.54) {
      return new THREE.Color().setHSL(
        hsl.h,
        Math.min(1.0, hsl.s * 1.32 + 0.14),
        Math.min(0.48, hsl.l * 0.74),
        THREE.SRGBColorSpace
      );
    }
    return baseColor.clone();
  }

  /**
   * Computes a rich "color-burned" darker, high-saturation version of a Metro line's colour
   * in perceptual sRGB space (`THREE.SRGBColorSpace`) for the outer flanking lanes of the
   * 3-lane ground strip, ensuring pale lines (like Line 13 sky-blue #6EC4E8, Line 7 pink #FA9ABA,
   * Line 1 yellow #FFCD00) and dark lines alike have a bold, unmistakable two-tone contrast.
   */
  private computeBurnedLineColor(baseColor: THREE.Color): THREE.Color {
    const hsl = { h: 0, s: 0, l: 0 };
    baseColor.getHSL(hsl, THREE.SRGBColorSpace);
    const burnedS = Math.min(1.0, hsl.s * 1.38 + 0.24);
    const burnedL = Math.max(0.055, Math.min(0.21, hsl.l * 0.32));
    return new THREE.Color().setHSL(hsl.h, burnedS, burnedL, THREE.SRGBColorSpace);
  }

  /**
   * Builds a crisp 3-lane two-tone horizontal ground strip (plus 3D side curb edges)
   * that hugs the exact 3D terrain & street topography at every sample point:
   * - Center Inner Lane (40% width): True RATP line colour (`innerColor`)
   * - Left & Right Outer Lanes (30% width each + side curbs): Color-burned darker version (`outerColor`)
   */
  private createGroundRibbonGeometry(
    surfCurve: THREE.CatmullRomCurve3,
    segments: number,
    innerColor: THREE.Color,
    outerColor: THREE.Color,
    width = 0.36
  ): THREE.BufferGeometry {
    const pts = surfCurve.getSpacedPoints(segments);
    const positions: number[] = [];
    const colors: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];

    const halfW = width * 0.5;
    const innerHalfW = halfW * 0.40; // Center true-colour lane is 40% of total width; outer burned lanes are 30% each
    const thickness = 0.018;

    const ir = innerColor.r;
    const ig = innerColor.g;
    const ib = innerColor.b;
    const or = outerColor.r;
    const og = outerColor.g;
    const ob = outerColor.b;

    let cumDist = 0;
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      if (i > 0) {
        cumDist += p.distanceTo(pts[i - 1]);
      }
      const u = cumDist * 0.65;
      const tNorm = i / Math.max(1, pts.length - 1);
      const tangent = surfCurve.getTangent(tNorm);
      const nx = -tangent.z;
      const nz = tangent.x;
      const len = Math.hypot(nx, nz) || 1;
      const ux = nx / len;
      const uz = nz / len;

      const rxOuter = ux * halfW;
      const rzOuter = uz * halfW;
      const rxInner = ux * innerHalfW;
      const rzInner = uz * innerHalfW;

      const topY = this.getGroundSurfaceElevation(p.x, p.z);
      const crownY = topY + 0.003;
      const botY = topY - thickness;

      // 8 vertices per cross-section with unshared hard-edged vertex colors between the 3 lanes:
      // 0, 1: Left outer lane (-halfW .. -innerHalfW) -> Burned Outer Colour
      // 2, 3: Center inner lane (-innerHalfW .. +innerHalfW) -> True Inner Colour
      // 4, 5: Right outer lane (+innerHalfW .. +halfW) -> Burned Outer Colour
      // 6, 7: Left & Right bottom curb edges (-halfW, +halfW at botY) -> Burned Outer Colour
      positions.push(
        p.x - rxOuter, topY, p.z - rzOuter,
        p.x - rxInner, topY, p.z - rzInner,
        p.x - rxInner, crownY, p.z - rzInner,
        p.x + rxInner, crownY, p.z + rzInner,
        p.x + rxInner, topY, p.z + rzInner,
        p.x + rxOuter, topY, p.z + rzOuter,
        p.x - rxOuter, botY, p.z - rzOuter,
        p.x + rxOuter, botY, p.z + rzOuter
      );

      colors.push(
        or, og, ob,
        or, og, ob,
        ir, ig, ib,
        ir, ig, ib,
        or, og, ob,
        or, og, ob,
        or, og, ob,
        or, og, ob
      );

      uvs.push(
        u, 0.0,
        u, 0.30,
        u, 0.30,
        u, 0.70,
        u, 0.70,
        u, 1.0,
        u, 0.0,
        u, 1.0
      );

      if (i < pts.length - 1) {
        const b = i * 8;
        const n = (i + 1) * 8;
        // Lane 1: Left Outer Burned Lane (v0, v1)
        indices.push(b + 0, b + 1, n + 1, b + 0, n + 1, n + 0);
        // Lane 2: Center Inner True-Colour Lane (v2, v3)
        indices.push(b + 2, b + 3, n + 3, b + 2, n + 3, n + 2);
        // Lane 3: Right Outer Burned Lane (v4, v5)
        indices.push(b + 4, b + 5, n + 5, b + 4, n + 5, n + 4);
        // Left & Right 3D raised curb edges (v6..v0 and v5..v7)
        indices.push(b + 6, b + 0, n + 0, b + 6, n + 0, n + 6);
        indices.push(b + 5, b + 7, n + 7, b + 5, n + 7, n + 5);
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }

  /**
   * Builds a 3D upward-radiating curtain of light following a Metro segment curve,
   * guaranteeing a consistent minimum height above the local 3D terrain elevation
   * (and above the viaduct deck for elevated segments) at every sample point.
   */
  private createLightCurtainGeometry(
    surfCurve: THREE.CatmullRomCurve3,
    segments: number,
    minHeightAboveSurface = 3.25,
    isElevated = false
  ): THREE.BufferGeometry {
    const pts = surfCurve.getSpacedPoints(segments);
    const positions: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];

    let cumDist = 0;
    // 1. Primary ground-hugging vertical light curtain rising at least `minHeightAboveSurface` above local terrain
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      if (i > 0) {
        cumDist += p.distanceTo(pts[i - 1]);
      }
      const u = cumDist * 0.65;
      const groundSurfY = this.getGroundSurfaceElevation(p.x, p.z);
      const baseElev = groundSurfY + 0.012;
      const topElev = baseElev + minHeightAboveSurface;

      positions.push(p.x, baseElev, p.z);
      uvs.push(u, 0.01);

      positions.push(p.x, topElev, p.z);
      uvs.push(u, 0.99);

      if (i < pts.length - 1) {
        const b0 = i * 2;
        const t0 = b0 + 1;
        const b1 = b0 + 2;
        const t1 = b0 + 3;
        indices.push(b0, b1, t1, b0, t1, t0);
      }
    }

    // 2. For elevated viaduct segments (e.g. Line 6 green #6ECA97, Line 2 #003CA6), the opaque viaduct deck sits
    // at `terrainY + 1.35`, which would otherwise occlude the lower half of the ground curtain. Add an upper
    // curtain starting directly above the elevated viaduct (`terrainY + 1.42`) rising `+ minHeightAboveSurface` above it!
    if (isElevated) {
      const baseVertOffset = pts.length * 2;
      cumDist = 0;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        if (i > 0) {
          cumDist += p.distanceTo(pts[i - 1]);
        }
        const u = cumDist * 0.65;
        const terrainY = getParisTerrainElevation(p.x, p.z);
        const viaductBaseY = terrainY + 1.40;
        const viaductTopY = viaductBaseY + minHeightAboveSurface;

        positions.push(p.x, viaductBaseY, p.z);
        uvs.push(u, 0.01);

        positions.push(p.x, viaductTopY, p.z);
        uvs.push(u, 0.99);

        if (i < pts.length - 1) {
          const b0 = baseVertOffset + i * 2;
          const t0 = b0 + 1;
          const b1 = b0 + 2;
          const t1 = b0 + 3;
          indices.push(b0, b1, t1, b0, t1, t0);
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }

  /**
   * Builds a delicate Art Deco brass floating datum grid & compass ring that ascends with
   * the Metro system when lifted out of the ground, giving it a tactile architectural-model feel.
   */
  private buildLiftedDatumFrame(): void {
    this.liftedDatumGroup.position.set(0, -11.8, 0);
    this.liftedDatumGroup.visible = false;

    const grid = new THREE.GridHelper(136, 34, 0xd4af37, 0x3b4d66);
    this.liftedDatumGridMat = grid.material as THREE.Material;
    this.liftedDatumGridMat.transparent = true;
    this.liftedDatumGridMat.opacity = 0.0;
    this.liftedDatumGridMat.depthWrite = false;
    this.liftedDatumGroup.add(grid);

    const ringGeo = new THREE.RingGeometry(58.0, 58.6, 64);
    ringGeo.rotateX(-Math.PI * 0.5);
    this.liftedDatumFrameMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.0,
      depthWrite: false
    });
    const ringMesh = new THREE.Mesh(ringGeo, this.liftedDatumFrameMat);
    ringMesh.position.y = 0.05;
    this.liftedDatumGroup.add(ringMesh);

    this.liftedGroup.add(this.liftedDatumGroup);
  }

  private getStationYForLine(
    station: MetroStationData,
    line: MetroLineConfig,
    segmentElevated?: boolean
  ): number {
    if (segmentElevated || station.elevated) {
      return getParisTerrainElevation(station.x, station.z) + 1.35;
    }
    return line.depthOffset;
  }

  private buildSegmentsAndTrains(): void {
    // Harmonious Parisian Viaduct Palette:
    // - Deck girder in soft powdery Parisian silver-slate zinc / verdigris-grey (matching the Mansard roofs)
    // - Support piers & capitals in warm Parisian Pierre de Taille dressed limestone (matching the facades)
    const viaductDeckMat = applyPaperModelShaderHook(
      new THREE.MeshStandardMaterial({
        color: 0xbac7d2,
        roughness: 0.58,
        metalness: 0.14
      })
    );
    const viaductPierMat = applyPaperModelShaderHook(
      new THREE.MeshStandardMaterial({
        color: 0xe8decb,
        roughness: 0.72,
        metalness: 0.04
      })
    );

    let segIndex = 0;
    for (const line of METRO_LINES) {
      const lineColor = new THREE.Color(line.color);
      const burnedOuterColor = this.computeBurnedLineColor(lineColor);
      const curtainColor = this.computeCurtainGlowColor(lineColor);

      for (const seg of line.segments) {
        const points: THREE.Vector3[] = [];
        for (const stId of seg.stations) {
          const st = STATIONS_MAP.get(stId);
          if (!st) continue;
          const y = this.getStationYForLine(st, line, seg.elevated);
          points.push(new THREE.Vector3(st.x, y, st.z));
        }
        if (points.length < 2) continue;

        const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.22);
        const approxLen = curve.getLength();
        const tubularSegments = Math.max(36, points.length * 16, Math.ceil(approxLen * 5.0));
        const tubeGeo = new THREE.TubeGeometry(curve, tubularSegments, 0.22, 10, false);

        const tubeMaterial = new THREE.MeshStandardMaterial({
          color: lineColor,
          emissive: lineColor,
          emissiveIntensity: 0.58,
          roughness: 0.3,
          metalness: 0.25,
          transparent: true,
          opacity: 0.95
        });

        const tubeMesh = new THREE.Mesh(tubeGeo, tubeMaterial);
        this.liftedGroup.add(tubeMesh);

        // Surface curve along the 3D terrain street alignment of this Metro segment
        const surfPts = points.map(
          (p) => new THREE.Vector3(p.x, this.getGroundSurfaceElevation(p.x, p.z), p.z)
        );
        const surfCurve = new THREE.CatmullRomCurve3(surfPts, false, 'catmullrom', 0.22);

        // 3-lane two-tone flat ground strip: inner lane = true line colour, outer lanes = color-burned darker border
        const surfGeo = this.createGroundRibbonGeometry(
          surfCurve,
          tubularSegments,
          lineColor,
          burnedOuterColor,
          0.32
        );
        const surfaceTraceMat = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          vertexColors: true,
          transparent: true,
          opacity: 0.96,
          side: THREE.DoubleSide,
          polygonOffset: true,
          polygonOffsetFactor: -1,
          polygonOffsetUnits: -1
        });
        const surfaceTraceMesh = new THREE.Mesh(surfGeo, surfaceTraceMat);
        this.surfaceGroup.add(surfaceTraceMesh);

        // Upward-Radiating Sky Light Curtain with guaranteed minimum height above terrain & viaducts
        const curtainGeo = this.createLightCurtainGeometry(
          surfCurve,
          tubularSegments,
          3.25,
          Boolean(seg.elevated)
        );
        const lightCurtainMat = new THREE.MeshBasicMaterial({
          color: curtainColor,
          map: this.lightCurtainTexture,
          transparent: true,
          opacity: 0.82,
          side: THREE.DoubleSide,
          depthWrite: false
        });
        const lightCurtainMesh = new THREE.Mesh(curtainGeo, lightCurtainMat);
        lightCurtainMesh.renderOrder = 1;
        this.lightColumnsGroup.add(lightCurtainMesh);

        // Viaduct Support Deck & Limestone Piers for elevated segments (Lines 2, 6, 5)
        let viaductMesh: THREE.Group | undefined;
        if (seg.elevated) {
          viaductMesh = new THREE.Group();
          const vCurvePoints = points.map((p) => new THREE.Vector3(p.x, p.y - 0.18, p.z));
          const vCurve = new THREE.CatmullRomCurve3(vCurvePoints, false, 'catmullrom', 0.22);
          const vGeo = new THREE.TubeGeometry(vCurve, tubularSegments, 0.28, 8, false);
          const deck = new THREE.Mesh(vGeo, viaductDeckMat);
          deck.castShadow = true;
          deck.receiveShadow = true;
          viaductMesh.add(deck);

          const pierSamples = vCurve.getSpacedPoints(Math.max(6, points.length * 4));
          const unitPierGeo = new THREE.BoxGeometry(0.22, 1.0, 0.22);
          const capGeo = new THREE.BoxGeometry(0.34, 0.10, 0.34);
          for (let i = 1; i < pierSamples.length - 1; i++) {
            const pp = pierSamples[i];
            const terrainY = getParisTerrainElevation(pp.x, pp.z);
            const pierHeight = Math.max(0.35, pp.y - 0.06 - terrainY);
            const pier = new THREE.Mesh(unitPierGeo, viaductPierMat);
            pier.scale.set(1.0, pierHeight, 1.0);
            pier.position.set(pp.x, terrainY + pierHeight * 0.5, pp.z);
            pier.castShadow = true;
            pier.receiveShadow = true;

            const cap = new THREE.Mesh(capGeo, viaductPierMat);
            cap.position.set(pp.x, pp.y - 0.08, pp.z);
            viaductMesh.add(pier, cap);
          }
          this.liftedGroup.add(viaductMesh);
        }

        // Build Animated Metro Train for this segment
        const trainGroup = this.createMetroTrainMesh(lineColor);
        this.liftedGroup.add(trainGroup);

        this.segments.push({
          line,
          openedYear: seg.openedYear,
          closedYear: seg.closedYear,
          elevated: Boolean(seg.elevated),
          stationIds: seg.stations,
          curve,
          tubeMesh,
          tubeMaterial,
          surfaceTraceMesh,
          surfaceTraceMat,
          lightCurtainMesh,
          lightCurtainMat,
          viaductMesh,
          trainGroup,
          trainSpeed: 0.055 + (segIndex % 5) * 0.008,
          trainPhase: (segIndex * 0.37) % 1.0
        });

        segIndex++;
      }
    }
  }

  private createMetroTrainMesh(lineColor: THREE.Color): THREE.Group {
    const group = new THREE.Group();

    const bodyGeo = new THREE.BoxGeometry(0.48, 0.36, 1.35);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: lineColor,
      emissive: lineColor,
      emissiveIntensity: 0.85,
      roughness: 0.2,
      metalness: 0.3
    });

    const roofGeo = new THREE.BoxGeometry(0.5, 0.14, 1.38);
    const roofMat = new THREE.MeshBasicMaterial({
      color: 0xf7f2e6
    });

    const carMesh = new THREE.Mesh(bodyGeo, bodyMat);
    const roofMesh = new THREE.Mesh(roofGeo, roofMat);
    roofMesh.position.y = 0.18;

    group.add(carMesh, roofMesh);
    return group;
  }

  private buildStationNodes(): void {
    const lineColorMap = new Map<string, string>();
    const lineDepthMap = new Map<string, number>();
    for (const l of METRO_LINES) {
      lineColorMap.set(l.id, l.color);
      lineDepthMap.set(l.id, l.depthOffset);
    }

    const stationCount = ALL_STATIONS.length;
    const totalLightColumns = ALL_STATIONS.reduce(
      (acc, st) => acc + Math.max(1, st.lines.length),
      0
    );
    const hitGeo = new THREE.SphereGeometry(0.82, 10, 10);
    const hitMat = new THREE.MeshBasicMaterial({ visible: false });

    // Shared unit geometries for the 4 GPU-instanced station layers (collapsing 1,232+ meshes into 4 draw calls!)
    const unitSubGeo = new THREE.CylinderGeometry(1.0, 1.0, 1.0, 16);
    const unitShaftGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.0, 8);
    const unitRingGeo = new THREE.CircleGeometry(0.76, 32);
    unitRingGeo.rotateX(-Math.PI * 0.5);
    // Unit-height open-ended sky light column (base at y = 0.0, top at y = 1.0) so `sy` is exact height above terrain!
    const skyColumnGeo = new THREE.CylinderGeometry(0.15, 0.25, 1.0, 12, 1, true);
    skyColumnGeo.translate(0, 0.5, 0);

    // 1. Instanced Subterranean/Viaduct Station Platform Cylinders
    this.subNodeOpacityEmissiveAttr = new THREE.InstancedBufferAttribute(
      new Float32Array(stationCount * 2),
      2
    );
    unitSubGeo.setAttribute('aInstanceOpacityEmissive', this.subNodeOpacityEmissiveAttr);
    const subNodeMat = createTSLInstancedStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      roughness: 0.25,
      metalness: 0.5
    });
    this.subNodeInstanced = new THREE.InstancedMesh(unitSubGeo, subNodeMat, stationCount);
    this.subNodeInstanced.frustumCulled = false;
    this.rootGroup.add(this.subNodeInstanced);

    // 2. Instanced Vertical Tether Shafts
    this.shaftOpacityAttr = new THREE.InstancedBufferAttribute(new Float32Array(stationCount), 1);
    unitShaftGeo.setAttribute('aInstanceOpacity', this.shaftOpacityAttr);
    const shaftMat = createTSLInstancedBasicMaterial({
      color: 0xffffff,
      depthWrite: false
    });
    this.shaftInstanced = new THREE.InstancedMesh(unitShaftGeo, shaftMat, stationCount);
    this.shaftInstanced.frustumCulled = false;
    this.rootGroup.add(this.shaftInstanced);

    // 3. Instanced Street-Level Station Circle Dots with Burned Outlines on the 3-lane lanes
    this.ringOpacityAttr = new THREE.InstancedBufferAttribute(new Float32Array(stationCount), 1);
    unitRingGeo.setAttribute('aInstanceOpacity', this.ringOpacityAttr);
    const ringMat = createTSLInstancedBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: -3,
      polygonOffsetUnits: -3,
      stationDotOutline: true
    });
    this.surfaceRingInstanced = new THREE.InstancedMesh(unitRingGeo, ringMat, stationCount);
    this.surfaceRingInstanced.frustumCulled = false;
    this.surfaceGroup.add(this.surfaceRingInstanced);

    // 4. Instanced Upward-Radiating Sky Light Columns (per-line at every station so no line is ever hidden at hubs)
    this.lightColOpacityAttr = new THREE.InstancedBufferAttribute(
      new Float32Array(totalLightColumns),
      1
    );
    skyColumnGeo.setAttribute('aInstanceOpacity', this.lightColOpacityAttr);
    const lightColMat = createTSLInstancedBasicMaterial({
      color: 0xffffff,
      map: this.lightCurtainTexture,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    this.lightColumnInstanced = new THREE.InstancedMesh(
      skyColumnGeo,
      lightColMat,
      totalLightColumns
    );
    this.lightColumnInstanced.frustumCulled = false;
    this.lightColumnsGroup.add(this.lightColumnInstanced);

    const hubNodeColor = new THREE.Color(0xebd9a0);
    const hubShaftColor = new THREE.Color(0xe5c158);
    const hubRingColor = new THREE.Color(0xffdf70);
    const stationStaticData = new Float32Array(stationCount * 8);

    const subMatArr = this.subNodeInstanced.instanceMatrix.array as Float32Array;
    const shaftMatArr = this.shaftInstanced.instanceMatrix.array as Float32Array;
    const ringMatArr = this.surfaceRingInstanced.instanceMatrix.array as Float32Array;
    const lightColMatArr = this.lightColumnInstanced.instanceMatrix.array as Float32Array;

    let colCursor = 0;

    for (let idx = 0; idx < stationCount; idx++) {
      const st = ALL_STATIONS[idx];
      const group = new THREE.Group();
      group.position.set(st.x, 0, st.z);
      const surfaceElev = getParisTerrainElevation(st.x, st.z);
      const groundSurfaceY = this.getGroundSurfaceElevation(st.x, st.z);

      const firstLineId = st.lines[0] ?? '1';
      const primaryColorHex = lineColorMap.get(firstLineId) ?? '#FFCD00';
      const primaryColor = new THREE.Color(primaryColorHex);

      let minDepth = -2.2;
      let maxDepth = -2.2;
      if (st.elevated) {
        minDepth = surfaceElev + 1.35;
        maxDepth = surfaceElev + 1.35;
      } else if (st.lines.length > 0) {
        const depths = st.lines.map((id) => lineDepthMap.get(id) ?? -4.0);
        minDepth = Math.min(...depths);
        maxDepth = Math.max(...depths);
      }
      const avgY = st.elevated ? surfaceElev + 1.35 : (minDepth + maxDepth) * 0.5;
      const isHub = st.lines.length >= 3;
      const radius = isHub ? 0.65 : st.lines.length === 2 ? 0.52 : 0.4;
      const nodeHeight = st.elevated ? 0.45 : Math.max(0.55, Math.abs(maxDepth - minDepth) + 0.6);

      // Populate static descriptor for WebGPU WGSL Compute Accelerator
      const baseOff = idx * 8;
      stationStaticData[baseOff] = st.x;
      stationStaticData[baseOff + 1] = st.z;
      stationStaticData[baseOff + 2] = avgY;
      stationStaticData[baseOff + 3] = surfaceElev;
      stationStaticData[baseOff + 4] = minDepth;
      stationStaticData[baseOff + 5] = radius;
      stationStaticData[baseOff + 6] = nodeHeight;
      stationStaticData[baseOff + 7] = st.elevated ? 1.0 : 0.0;

      // 1. SubNode initial matrix & color
      writeTranslationScaleMatrix(subMatArr, idx, st.x, avgY, st.z, radius, nodeHeight, radius);
      this.subNodeInstanced.setColorAt(idx, isHub ? hubNodeColor : primaryColor);
      this.subNodeOpacityEmissiveAttr.setXY(idx, 0.96, isHub ? 0.75 : 0.65);

      // 2. Shaft initial matrix & color
      const initialTop = st.elevated ? surfaceElev + 1.35 : surfaceElev + 0.045;
      const initialBottom = st.elevated ? surfaceElev : minDepth;
      const initialLen = Math.max(0.2, Math.abs(initialTop - initialBottom));
      writeTranslationScaleMatrix(
        shaftMatArr,
        idx,
        st.x,
        (initialTop + initialBottom) * 0.5,
        st.z,
        1.0,
        initialLen,
        1.0
      );
      this.shaftInstanced.setColorAt(idx, isHub ? hubShaftColor : primaryColor);
      this.shaftOpacityAttr.setX(idx, 0.38);

      // 3. Surface Station Circle Dot with Outline static matrix & color
      const ringSurfaceY = groundSurfaceY + 0.009;
      writeTranslationScaleMatrix(
        ringMatArr,
        idx,
        st.x,
        ringSurfaceY,
        st.z,
        radius,
        1.0,
        radius
      );
      this.surfaceRingInstanced.setColorAt(idx, isHub ? hubRingColor : primaryColor);
      this.ringOpacityAttr.setX(idx, 0.98);

      // 4. Sky Light Columns: guaranteed minimum height above terrain (or above viaduct for elevated stations)
      const stationLines = st.lines.length > 0 ? st.lines : [firstLineId];
      const colBaseY = st.elevated ? surfaceElev + 1.38 : groundSurfaceY + 0.01;
      const minColHeightAboveBase = isHub ? 4.25 : 3.75;
      const lightColIndices: { lineId: string; colIdx: number; color: THREE.Color }[] = [];

      for (let lIdx = 0; lIdx < stationLines.length; lIdx++) {
        const lineId = stationLines[lIdx];
        const colIdx = colCursor++;
        const glowCol =
          this.lineGlowColorLookup.get(lineId) ??
          this.computeCurtainGlowColor(
            new THREE.Color(lineColorMap.get(lineId) ?? primaryColorHex)
          );
        // Concentric slight radial layering for multi-line hubs so every line's column glow is visible
        const colScaleXZ = (isHub ? 1.28 : 1.05) + lIdx * 0.08;
        const colHeight = minColHeightAboveBase + lIdx * 0.12;
        writeTranslationScaleMatrix(
          lightColMatArr,
          colIdx,
          st.x,
          colBaseY,
          st.z,
          colScaleXZ,
          colHeight,
          colScaleXZ
        );
        this.lightColumnInstanced.setColorAt(colIdx, glowCol);
        this.lightColOpacityAttr.setX(colIdx, isHub ? 0.90 : 0.86);
        lightColIndices.push({ lineId, colIdx, color: glowCol });
      }

      // 5. Optional Ghost Station (Station Fantôme) Crimson Halo
      let ghostHaloMesh: THREE.Mesh | undefined;
      if (st.isGhostStation || st.closedYear) {
        const ghostGeo = new THREE.RingGeometry(0.32, 0.52, 6);
        ghostGeo.rotateX(-Math.PI * 0.5);
        const ghostMat = new THREE.MeshBasicMaterial({
          color: 0xff5e57,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.9
        });
        ghostHaloMesh = new THREE.Mesh(ghostGeo, ghostMat);
        ghostHaloMesh.position.set(0, groundSurfaceY + 0.06, 0);
        ghostHaloMesh.visible = false;
        group.add(ghostHaloMesh);
      }

      // 6. Invisible Raycast Hit Target
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.position.set(0, (avgY + groundSurfaceY + 0.6) * 0.5, 0);
      hitMesh.scale.set(1, Math.max(1.5, Math.abs(groundSurfaceY + 0.8 - avgY) * 0.52), 1);
      hitMesh.userData = {
        type: 'station',
        station: st
      };
      group.add(hitMesh);

      this.rootGroup.add(group);
      this.hitMeshes.push(hitMesh);
      this.stationRuntimes.push({
        index: idx,
        data: st,
        group,
        ghostHaloMesh,
        hitMesh,
        baseY: avgY,
        surfaceElev,
        groundSurfaceY,
        minDepth,
        radius,
        nodeHeight,
        isHub,
        primaryColor,
        lightColIndices
      });
    }

    this.subNodeInstanced.instanceMatrix.needsUpdate = true;
    this.shaftInstanced.instanceMatrix.needsUpdate = true;
    this.surfaceRingInstanced.instanceMatrix.needsUpdate = true;
    this.lightColumnInstanced.instanceMatrix.needsUpdate = true;
    if (this.subNodeInstanced.instanceColor) this.subNodeInstanced.instanceColor.needsUpdate = true;
    if (this.shaftInstanced.instanceColor) this.shaftInstanced.instanceColor.needsUpdate = true;
    if (this.surfaceRingInstanced.instanceColor)
      this.surfaceRingInstanced.instanceColor.needsUpdate = true;
    if (this.lightColumnInstanced.instanceColor)
      this.lightColumnInstanced.instanceColor.needsUpdate = true;

    // Initialize WebGPU WGSL Compute Accelerator (with automatic WebGL2 fallback)
    this.webgpuCompute = new WebGPUStationComputeAccelerator(stationStaticData, stationCount);
  }

  public getStationHoverColorHex(st: MetroStationData): number {
    const targetLineId =
      this.selectedLineId && st.lines.includes(this.selectedLineId)
        ? this.selectedLineId
        : st.lines[0];
    if (targetLineId) {
      const lineCfg = METRO_LINES.find((l) => l.id === targetLineId);
      if (lineCfg) {
        return new THREE.Color(lineCfg.color).getHex();
      }
    }
    return st.isGhostStation ? 0xff5e57 : 0xffe07d;
  }

  private buildHoverReticle(): void {
    const outerGeo = new THREE.RingGeometry(1.15, 1.42, 8);
    outerGeo.rotateX(-Math.PI * 0.5);
    this.hoverOuterRingMat = new THREE.MeshBasicMaterial({
      color: 0xffe07d,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95,
      depthWrite: false
    });
    this.hoverOuterRingMesh = new THREE.Mesh(outerGeo, this.hoverOuterRingMat);

    const innerGeo = new THREE.RingGeometry(0.52, 1.02, 24);
    innerGeo.rotateX(-Math.PI * 0.5);
    this.hoverInnerHaloMat = new THREE.MeshBasicMaterial({
      color: 0xffdf78,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.34,
      depthWrite: false
    });
    this.hoverInnerHaloMesh = new THREE.Mesh(innerGeo, this.hoverInnerHaloMat);
    this.hoverInnerHaloMesh.position.y = -0.01;

    const beamHeight = 14.5;
    const beamGeo = new THREE.CylinderGeometry(0.76, 0.96, beamHeight, 24, 1, true);
    beamGeo.translate(0, beamHeight * 0.5, 0);
    this.hoverBeamMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      map: this.lightCurtainTexture,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.58,
      depthWrite: false
    });
    this.hoverBeamMesh = new THREE.Mesh(beamGeo, this.hoverBeamMat);
    this.hoverBeamMesh.position.y = -0.15;

    this.hoverReticleGroup.add(
      this.hoverOuterRingMesh,
      this.hoverInnerHaloMesh,
      this.hoverBeamMesh
    );
    this.hoverReticleGroup.visible = false;
    this.rootGroup.add(this.hoverReticleGroup);
  }

  public setTourPinnedPosition(
    pos: THREE.Vector3 | null,
    targetRadiusScale = 1.45,
    targetColorHex = 0xffe07d,
    isMonument = false
  ): void {
    if (pos) {
      this.setHoveredPosition(pos, targetRadiusScale, targetColorHex, isMonument);
    } else {
      this.setHoveredPosition(null);
    }
  }

  public setHoveredPosition(
    pos: THREE.Vector3 | null,
    targetRadiusScale = 1.0,
    targetColorHex = 0xffe07d,
    isMonument = false
  ): void {
    if (!pos) {
      this.hoverIsActive = false;
      // Lock the hover halo column in place where it currently is so it fades out cleanly without flicking away
      this.hoverTargetPos.copy(this.hoverCurrentPos);
      this.hoverVelocity.set(0, 0, 0);
      this.hoverTargetScale = this.hoverCurrentScale;
      this.hoverScaleVel = 0.0;
      return;
    }

    const beamHeightScale = isMonument ? 0.14 : 1.0;
    const haloIntensity = isMonument ? 0.34 : 1.0;

    if (!this.hoverHasInitialized) {
      this.hoverCurrentPos.copy(pos);
      this.hoverTargetPos.copy(pos);
      this.hoverVelocity.set(0, 0, 0);
      this.hoverCurrentScale = targetRadiusScale;
      this.hoverTargetScale = targetRadiusScale;
      this.hoverScaleVel = 0.0;
      this.hoverCurrentBeamHeightScale = beamHeightScale;
      this.hoverTargetBeamHeightScale = beamHeightScale;
      this.hoverCurrentIntensity = haloIntensity;
      this.hoverTargetIntensity = haloIntensity;
      this.hoverCurrentColor.setHex(targetColorHex);
      this.hoverTargetColor.setHex(targetColorHex);
      this.hoverPresence = 1.0;
      this.hoverHasInitialized = true;
      this.hoverReticleGroup.position.copy(pos);
    } else {
      this.hoverTargetPos.copy(pos);
      this.hoverTargetScale = targetRadiusScale;
      this.hoverTargetBeamHeightScale = beamHeightScale;
      this.hoverTargetIntensity = haloIntensity;
      this.hoverTargetColor.setHex(targetColorHex);
      // Ensure the reticle is immediately visible as it begins gliding from its previous location
      this.hoverPresence = Math.max(this.hoverPresence, 0.55);
    }

    this.hoverIsActive = true;
    this.hoverReticleGroup.visible = true;
  }

  /**
   * Lifts the entire 3D Metro network out of the ground (progress: 0.0 = underground, 1.0 = floating above Paris),
   * stretching vertical umbilical shafts between every lifted station and its street entrance on the surface below.
   */
  public setLiftProgress(progress: number): void {
    const clamped = Math.max(0.0, Math.min(1.0, progress));
    this.liftProgress = clamped;

    const liftOffsetY = clamped * MetroNetworkRenderer.MAX_LIFT_OFFSET_Y;
    this.liftedGroup.position.y = liftOffsetY;

    // Fade in the floating Art Deco datum grid as the Metro rises above ground; keep surface ground lines always visible
    this.liftedDatumGroup.visible = clamped > 0.04;
    this.liftedDatumGridMat.opacity = clamped * 0.36;
    this.liftedDatumFrameMat.opacity = clamped * 0.55;
    this.surfaceGroup.visible = true;

    for (const seg of this.segments) {
      const isLineSelected = !this.selectedLineId || this.selectedLineId === seg.line.id;
      if (seg.surfaceTraceMat) {
        seg.surfaceTraceMat.opacity = isLineSelected ? 0.96 : 0.22;
      }
    }

    // Dispatch parallel WGSL compute pass on WebGPU when available
    this.webgpuCompute?.dispatchComputeIfAvailable(liftOffsetY, clamped);

    const subMatArr = this.subNodeInstanced.instanceMatrix.array as Float32Array;
    const shaftMatArr = this.shaftInstanced.instanceMatrix.array as Float32Array;

    for (const stRun of this.stationRuntimes) {
      const idx = stRun.index;
      const st = stRun.data;
      const liftedNodeY = stRun.baseY + liftOffsetY;

      writeTranslationScaleMatrix(
        subMatArr,
        idx,
        st.x,
        liftedNodeY,
        st.z,
        stRun.radius,
        stRun.nodeHeight,
        stRun.radius
      );

      if (stRun.ghostHaloMesh) {
        stRun.ghostHaloMesh.position.y =
          clamped > 0.08 ? liftedNodeY + 0.38 : stRun.groundSurfaceY + 0.06;
      }

      // Stretch vertical shaft between street entrance (surfaceElev + 0.045) and lifted station node
      const surfaceAnchorY = stRun.surfaceElev + 0.045;
      const bottomEndpoint =
        clamped < 0.05 && !st.elevated ? stRun.minDepth + liftOffsetY : liftedNodeY;
      const shaftLen = Math.max(0.18, Math.abs(bottomEndpoint - surfaceAnchorY));
      writeTranslationScaleMatrix(
        shaftMatArr,
        idx,
        st.x,
        (bottomEndpoint + surfaceAnchorY) * 0.5,
        st.z,
        1.0,
        shaftLen,
        1.0
      );

      // Update raycast hit sphere to cover the station at its current lifted altitude
      if (clamped > 0.12) {
        stRun.hitMesh.position.y = liftedNodeY;
        stRun.hitMesh.scale.set(1.15, 1.6, 1.15);
      } else {
        stRun.hitMesh.position.y = (stRun.baseY + stRun.groundSurfaceY + 0.6) * 0.5;
        stRun.hitMesh.scale.set(
          1,
          Math.max(1.5, Math.abs(stRun.groundSurfaceY + 0.8 - stRun.baseY) * 0.52),
          1
        );
      }
    }

    this.subNodeInstanced.instanceMatrix.needsUpdate = true;
    this.shaftInstanced.instanceMatrix.needsUpdate = true;
  }

  public getLiftProgress(): number {
    return this.liftProgress;
  }

  public getLiftOffsetY(): number {
    return this.liftProgress * MetroNetworkRenderer.MAX_LIFT_OFFSET_Y;
  }

  /**
   * Toggles the upward-radiating Sky Light Curtains & Station Light Columns above the city rooftops.
   */
  public setShowLightColumns(show: boolean): void {
    this.showLightColumns = show;
    this.lightColumnsGroup.visible = show;
    this.updateState(this.currentYear, this.selectedLineId, this.showGhostStations);
  }

  public getShowLightColumns(): boolean {
    return this.showLightColumns;
  }

  /**
   * Updates active lines, segments, stations, and Ghost Stations for the given timeline year (1900-2026)
   */
  public updateState(
    year: number,
    selectedLineId: string | null = this.selectedLineId,
    showGhostStations: boolean = this.showGhostStations
  ): {
    activeLinesCount: number;
    activeStationsCount: number;
    closedGhostStationsCount: number;
  } {
    this.currentYear = year;
    this.selectedLineId = selectedLineId;
    this.showGhostStations = showGhostStations;
    this.lightColumnsGroup.visible = this.showLightColumns;
    this.surfaceGroup.visible = true;

    const activeLineSet = new Set<string>();

    // 1. Update segments
    for (const seg of this.segments) {
      const isOpened = year >= seg.openedYear;
      const isNotClosed = seg.closedYear === undefined || year < seg.closedYear;
      const isActive = isOpened && isNotClosed;

      seg.tubeMesh.visible = isActive;
      seg.lightCurtainMesh.visible = isActive && this.showLightColumns;
      if (seg.surfaceTraceMesh) {
        seg.surfaceTraceMesh.visible = isActive;
      }
      if (seg.viaductMesh) {
        seg.viaductMesh.visible = isActive;
      }
      seg.trainGroup.visible = isActive && (!selectedLineId || selectedLineId === seg.line.id);

      if (isActive) {
        activeLineSet.add(seg.line.id);
        const isLineSelected = !selectedLineId || selectedLineId === seg.line.id;
        seg.tubeMaterial.opacity = isLineSelected ? 0.96 : 0.14;
        seg.tubeMaterial.emissiveIntensity = isLineSelected ? 0.68 : 0.12;
        seg.lightCurtainMat.opacity = isLineSelected ? 0.82 : 0.12;
        if (seg.surfaceTraceMat) {
          seg.surfaceTraceMat.opacity = isLineSelected ? 0.96 : 0.22;
        }
      }
    }

    // 2. Update GPU-instanced stations (4 instanced draw calls for all 308 stations)
    let activeStationsCount = 0;
    let closedGhostStationsCount = 0;
    const ghostCrimsonColor = new THREE.Color(0xff5e57);
    const hubNodeColor = new THREE.Color(0xebd9a0);
    const hubRingColor = new THREE.Color(0xffdf70);
    const hubShaftColor = new THREE.Color(0xe5c158);

    for (const stRun of this.stationRuntimes) {
      const idx = stRun.index;
      const st = stRun.data;
      const isBorn = year >= st.openedYear;
      const isClosedGhost = st.closedYear !== undefined && year >= st.closedYear;

      if (!isBorn) {
        stRun.group.visible = false;
        stRun.hitMesh.scale.setScalar(0.0001);
        this.subNodeOpacityEmissiveAttr.setXY(idx, 0.0, 0.0);
        this.shaftOpacityAttr.setX(idx, 0.0);
        this.ringOpacityAttr.setX(idx, 0.0);
        for (const lc of stRun.lightColIndices) {
          this.lightColOpacityAttr.setX(lc.colIdx, 0.0);
        }
        continue;
      }

      if (isClosedGhost) {
        closedGhostStationsCount++;
        if (!showGhostStations) {
          stRun.group.visible = false;
          stRun.hitMesh.scale.setScalar(0.0001);
          this.subNodeOpacityEmissiveAttr.setXY(idx, 0.0, 0.0);
          this.shaftOpacityAttr.setX(idx, 0.0);
          this.ringOpacityAttr.setX(idx, 0.0);
          for (const lc of stRun.lightColIndices) {
            this.lightColOpacityAttr.setX(lc.colIdx, 0.0);
          }
          continue;
        }
        stRun.group.visible = true;
        if (stRun.ghostHaloMesh) {
          stRun.ghostHaloMesh.visible = true;
        }
        this.subNodeInstanced.setColorAt(idx, ghostCrimsonColor);
        this.subNodeOpacityEmissiveAttr.setXY(idx, 0.82, 0.85);
        this.surfaceRingInstanced.setColorAt(idx, ghostCrimsonColor);
        for (let cIdx = 0; cIdx < stRun.lightColIndices.length; cIdx++) {
          const lc = stRun.lightColIndices[cIdx];
          this.lightColumnInstanced.setColorAt(lc.colIdx, ghostCrimsonColor);
          this.lightColOpacityAttr.setX(
            lc.colIdx,
            this.showLightColumns && cIdx === 0 ? 0.68 : 0.0
          );
        }
        this.ringOpacityAttr.setX(idx, 0.92);
        this.shaftOpacityAttr.setX(idx, 0.38);
        continue;
      }

      activeStationsCount++;
      stRun.group.visible = true;
      if (stRun.ghostHaloMesh) {
        stRun.ghostHaloMesh.visible = false;
      }

      const matchesFilter = !selectedLineId || st.lines.includes(selectedLineId);
      const isHub = stRun.isHub;
      const selectedLineColor =
        selectedLineId && st.lines.includes(selectedLineId)
          ? this.lineColorLookup.get(selectedLineId)
          : undefined;

      this.subNodeInstanced.setColorAt(
        idx,
        selectedLineColor ?? (isHub ? hubNodeColor : stRun.primaryColor)
      );
      this.subNodeOpacityEmissiveAttr.setXY(
        idx,
        matchesFilter ? 0.96 : 0.2,
        matchesFilter ? 0.75 : 0.15
      );

      this.surfaceRingInstanced.setColorAt(
        idx,
        selectedLineColor ?? (isHub ? hubRingColor : stRun.primaryColor)
      );
      this.shaftInstanced.setColorAt(
        idx,
        selectedLineColor ?? (isHub ? hubShaftColor : stRun.primaryColor)
      );

      for (const lc of stRun.lightColIndices) {
        this.lightColumnInstanced.setColorAt(lc.colIdx, lc.color);
        const colMatchesLine = !selectedLineId || lc.lineId === selectedLineId;
        const lineOpened = activeLineSet.has(lc.lineId);
        const colOpacity =
          this.showLightColumns && lineOpened
            ? colMatchesLine
              ? isHub
                ? 0.92
                : 0.86
              : 0.12
            : 0.0;
        this.lightColOpacityAttr.setX(lc.colIdx, colOpacity);
      }

      this.ringOpacityAttr.setX(
        idx,
        matchesFilter ? 0.98 : 0.20
      );
      this.shaftOpacityAttr.setX(idx, matchesFilter ? 0.44 : 0.08);
    }

    this.subNodeOpacityEmissiveAttr.needsUpdate = true;
    this.shaftOpacityAttr.needsUpdate = true;
    this.ringOpacityAttr.needsUpdate = true;
    this.lightColOpacityAttr.needsUpdate = true;
    if (this.subNodeInstanced.instanceColor) this.subNodeInstanced.instanceColor.needsUpdate = true;
    if (this.surfaceRingInstanced.instanceColor)
      this.surfaceRingInstanced.instanceColor.needsUpdate = true;
    if (this.shaftInstanced.instanceColor) this.shaftInstanced.instanceColor.needsUpdate = true;
    if (this.lightColumnInstanced.instanceColor)
      this.lightColumnInstanced.instanceColor.needsUpdate = true;

    // Re-apply lift geometry to active stations
    this.setLiftProgress(this.liftProgress);

    return {
      activeLinesCount: activeLineSet.size,
      activeStationsCount,
      closedGhostStationsCount
    };
  }

  /**
   * Animates 3D metro trains along all active line curves & smoothly tweens the hover reticle and halo across the map
   */
  public updateAnimation(elapsedTime: number, deltaSeconds = 0.016): void {
    const dt = Math.min(0.05, Math.max(0.001, deltaSeconds));

    if (this.hoverIsActive) {
      this.hoverPresence = Math.min(1.0, this.hoverPresence + dt * 7.5);
    } else if (this.hoverPresence > 0.0) {
      this.hoverPresence = Math.max(0.0, this.hoverPresence - dt * 5.8);
      if (this.hoverPresence <= 0.004) {
        this.hoverReticleGroup.visible = false;
      }
    }

    if (this.hoverReticleGroup.visible) {
      if (this.hoverIsActive) {
        // Critically-damped 3D spring for silky map-wide gliding between hovered locations
        const omega = 14.5;
        const damp = Math.exp(-omega * dt);

        const dx = this.hoverCurrentPos.x - this.hoverTargetPos.x;
        const dy = this.hoverCurrentPos.y - this.hoverTargetPos.y;
        const dz = this.hoverCurrentPos.z - this.hoverTargetPos.z;

        const tempVx = (this.hoverVelocity.x + omega * dx) * dt;
        const tempVy = (this.hoverVelocity.y + omega * dy) * dt;
        const tempVz = (this.hoverVelocity.z + omega * dz) * dt;

        this.hoverCurrentPos.x = this.hoverTargetPos.x + (dx + tempVx) * damp;
        this.hoverCurrentPos.y = this.hoverTargetPos.y + (dy + tempVy) * damp;
        this.hoverCurrentPos.z = this.hoverTargetPos.z + (dz + tempVz) * damp;

        this.hoverVelocity.x = (this.hoverVelocity.x - omega * tempVx) * damp;
        this.hoverVelocity.y = (this.hoverVelocity.y - omega * tempVy) * damp;
        this.hoverVelocity.z = (this.hoverVelocity.z - omega * tempVz) * damp;

        // Critically-damped 1D spring for radius scale tweening (Station <-> Monument radius)
        const omegaScale = 15.0;
        const dampScale = Math.exp(-omegaScale * dt);
        const dScale = this.hoverCurrentScale - this.hoverTargetScale;
        const tempVScale = (this.hoverScaleVel + omegaScale * dScale) * dt;
        this.hoverCurrentScale = this.hoverTargetScale + (dScale + tempVScale) * dampScale;
        this.hoverScaleVel = (this.hoverScaleVel - omegaScale * tempVScale) * dampScale;

        // Smoothly interpolate ring & halo color, beam height, and subtlety
        const colorLerp = 1.0 - Math.exp(-12.0 * dt);
        this.hoverCurrentColor.lerp(this.hoverTargetColor, colorLerp);
        this.hoverCurrentBeamHeightScale +=
          (this.hoverTargetBeamHeightScale - this.hoverCurrentBeamHeightScale) * colorLerp;
        this.hoverCurrentIntensity +=
          (this.hoverTargetIntensity - this.hoverCurrentIntensity) * colorLerp;
      }

      // Follow the 3D topography of Paris as the ring glides across hills, riverbanks, and viaducts
      const groundY = this.getGroundSurfaceElevation(
        this.hoverCurrentPos.x,
        this.hoverCurrentPos.z
      );
      const surfaceSafeY = Math.max(groundY + 0.05, this.hoverCurrentPos.y);

      this.hoverReticleGroup.position.set(
        this.hoverCurrentPos.x,
        surfaceSafeY,
        this.hoverCurrentPos.z
      );

      const speed = Math.hypot(this.hoverVelocity.x, this.hoverVelocity.z);
      const motionBoost = Math.min(0.22, speed * 0.0035);
      const pulse = 1.0 + 0.038 * Math.sin(elapsedTime * 3.6);
      const presenceEase =
        this.hoverPresence * this.hoverPresence * (3.0 - 2.0 * this.hoverPresence);
      const radialScale = this.hoverCurrentScale * pulse * (0.86 + 0.14 * presenceEase);
      const intensity = this.hoverCurrentIntensity;

      this.hoverReticleGroup.scale.set(radialScale, 1.0, radialScale);
      this.hoverBeamMesh.scale.set(1.0, this.hoverCurrentBeamHeightScale, 1.0);
      this.hoverOuterRingMesh.rotation.y = elapsedTime * 1.4;
      this.hoverInnerHaloMesh.rotation.y = -elapsedTime * 0.95;

      this.hoverOuterRingMat.color.copy(this.hoverCurrentColor);
      this.hoverInnerHaloMat.color.copy(this.hoverCurrentColor);
      this.hoverBeamMat.color.copy(this.hoverCurrentColor);

      this.hoverOuterRingMat.opacity = (0.48 + 0.47 * intensity) * presenceEase;
      this.hoverInnerHaloMat.opacity = (0.38 + motionBoost * 0.6) * intensity * presenceEase;
      this.hoverBeamMat.opacity = (0.64 + motionBoost * 0.45) * intensity * presenceEase;
    }

    const pos = new THREE.Vector3();
    const lookAtPos = new THREE.Vector3();

    for (const seg of this.segments) {
      if (!seg.trainGroup.visible) continue;

      const raw = (elapsedTime * seg.trainSpeed + seg.trainPhase) % 2.0;
      const t = raw <= 1.0 ? 0.04 + raw * 0.92 : 0.04 + (2.0 - raw) * 0.92;
      const nextT = Math.min(0.99, Math.max(0.01, raw <= 1.0 ? t + 0.02 : t - 0.02));

      seg.curve.getPointAt(t, pos);
      seg.curve.getPointAt(nextT, lookAtPos);

      seg.trainGroup.position.copy(pos);
      seg.trainGroup.lookAt(lookAtPos);
    }
  }
}
