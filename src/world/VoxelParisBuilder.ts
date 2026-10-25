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
  CANAL_SAINT_DENIS_LATLON,
  CANAL_SAINT_MARTIN_LATLON,
  MARNE_CENTERLINE_LATLON,
  PARIS_BRIDGES,
  PARIS_PARKS,
  PARIS_PLACES,
  projectLatLon,
  SEINE_CENTERLINE_LATLON,
  SEINE_SOUTH_ARM_LATLON
} from '../data/parisGeoData';
import {
  getParisTerrainElevation,
  PARIS_MONUMENTS,
  ParisMonumentData
} from '../data/parisHistoricalData';
import {
  applyPaperModelShaderHook,
  MONUMENT_OUTLINE_LAYER,
  MonumentHitTarget,
  PAPER_MODEL_UNIFORM,
  ParisMonumentsBuilder
} from './ParisMonumentsBuilder';
import { GrandesLignesBuilder } from './GrandesLignesBuilder';
import { ParisSurfaceSimulation } from './ParisSurfaceSimulation';
import { ACTIVE_CITY_ID } from '../cities/activeCityRuntime';
import {
  mergeGroupMeshesByMaterial,
  writeTranslationScaleMatrix
} from './geometryBatchUtils';

export { MONUMENT_OUTLINE_LAYER };
export type { MonumentHitTarget, ParisMonumentData };

interface OsmIsland {
  name: string;
  outer: number[];
}

interface OsmWaterPolygon {
  outer: number[];
  holes: number[][];
}

interface OsmWaterLine {
  type: string;
  name: string;
  pts: number[];
}

interface OsmPark {
  name: string;
  kind: string;
  outer: number[];
}

type OsmRoad = [number[], number, number]; // [pts, tier, isBridge]
type OsmBuilding = [number[], number[][], number, number]; // [outer, holes, height, style]

interface ParisOsmDataset {
  islands: OsmIsland[];
  waterPolygons: OsmWaterPolygon[];
  waterLines: OsmWaterLine[];
  parks: OsmPark[];
  trees: [number, number][];
  roads: OsmRoad[];
  buildings: OsmBuilding[];
}

interface TreeInstanceRecord {
  x: number;
  y: number;
  z: number;
  scale: number;
  color: number;
  minYear: number;
  maxYear: number;
}

interface YearBoundMesh {
  obj: THREE.Object3D;
  minYear: number;
  maxYear: number;
}

interface PolygonBounds {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
  ring: number[];
}

interface MonumentExclEntry {
  x: number;
  z: number;
  isLouvre: boolean;
  rSq: number;
  rad: number;
}

export class VoxelParisBuilder {
  public readonly rootGroup = new THREE.Group();
  public readonly overgroundGroup = new THREE.Group();
  public readonly plinthGroup = new THREE.Group();
  public readonly monumentTargets: MonumentHitTarget[];
  public readonly grandesLignesBuilder: GrandesLignesBuilder;
  public readonly surfaceSimulation: ParisSurfaceSimulation;
  public onShadowCastersChanged?: () => void;

  private readonly monumentsBuilder: ParisMonumentsBuilder;
  public readonly osmCityGroup = new THREE.Group();

  private yearBoundMeshes: YearBoundMesh[] = [];

  private treeCrownInstanced!: THREE.InstancedMesh;
  private treeTrunkInstanced!: THREE.InstancedMesh;
  private treeRecords: TreeInstanceRecord[] = [];

  private overgroundOpaqueMaterials: THREE.Material[] = [];
  private surfacePlateMaterial!: THREE.MeshStandardMaterial;
  private waterMaterial!: THREE.MeshPhysicalMaterial;
  private modernGlassMaterial!: THREE.MeshPhysicalMaterial;
  private haussmannWallMaterial!: THREE.MeshStandardMaterial;
  private mansardRoofMaterial!: THREE.MeshStandardMaterial;

  private seineCurve!: THREE.CatmullRomCurve3;
  private seineSamplePoints: { pt: THREE.Vector3; halfWidth: number }[] = [];
  private seineGrid = new Map<number, { x: number; z: number; rSq: number }[]>();
  private seineMinX = 1e9;
  private seineMaxX = -1e9;
  private seineMinZ = 1e9;
  private seineMaxZ = -1e9;

  private islandBounds: PolygonBounds[] = [];
  private islMinX = 1e9;
  private islMaxX = -1e9;
  private islMinZ = 1e9;
  private islMaxZ = -1e9;

  private monumentExclList: MonumentExclEntry[] = [];
  private louvreMonument: ParisMonumentData | null = null;
  private monMinX = 1e9;
  private monMaxX = -1e9;
  private monMinZ = 1e9;
  private monMaxZ = -1e9;

  private dummy = new THREE.Object3D();
  private currentYear = 2026;
  private currentOpacity = 1.0;

  constructor() {
    this.rootGroup.name = 'RealisticParisWorld';
    this.overgroundGroup.name = 'ParisOvergroundLayer';
    this.plinthGroup.name = 'SubterraneanCutawayPlinth';
    this.osmCityGroup.name = 'OpenStreetMapParisGeometry';

    this.rootGroup.add(this.plinthGroup);
    this.rootGroup.add(this.overgroundGroup);
    this.overgroundGroup.add(this.osmCityGroup);

    this.initMonumentExclusions();
    this.initMaterials();
    this.buildSubterraneanPlinth();
    this.buildBaseSeineAndCanals();
    this.buildBridges();
    this.buildMonumentalPlaces();
    this.buildRoyalGardenBasins();
    if (ACTIVE_CITY_ID === 'paris') {
      this.buildThiersFortifications();
    }

    // Load Custom Blender-Crafted 3D Monuments (/models/paris_monuments.glb)
    this.monumentsBuilder = new ParisMonumentsBuilder();
    this.monumentsBuilder.onGeometryLoaded = () => {
      this.onShadowCastersChanged?.();
    };
    this.overgroundGroup.add(this.monumentsBuilder.rootGroup);
    this.monumentTargets = this.monumentsBuilder.monumentTargets;

    // Build 3D Grandes Gares Termini, Multi-Track Rail Fans & Era-Evolving Express Trains
    this.grandesLignesBuilder = new GrandesLignesBuilder();
    this.overgroundGroup.add(this.grandesLignesBuilder.rootGroup);

    // Build Multi-Modal Surface Simulation (Traffic Signals, Autonomous Cars, Congestion Ribbons, Marathon, Heatwave, Protest, Flood, Cyberattack)
    this.surfaceSimulation = new ParisSurfaceSimulation();
    this.rootGroup.add(this.surfaceSimulation.rootGroup);

    // Default to 100% opaque above-ground visuals
    this.setSurfaceOpacity(1.0);

    // Asynchronously load & build the real OpenStreetMap geometry of Paris (/data/paris_osm.json)
    void this.loadAndBuildOsmParis();
  }

  private initMonumentExclusions(): void {
    for (const m of PARIS_MONUMENTS) {
      if (m.id === 'monument-louvre') {
        this.louvreMonument = m;
        const r = 3.4;
        if (m.x - r < this.monMinX) this.monMinX = m.x - r;
        if (m.x + r > this.monMaxX) this.monMaxX = m.x + r;
        if (m.z - r < this.monMinZ) this.monMinZ = m.z - r;
        if (m.z + r > this.monMaxZ) this.monMaxZ = m.z + r;
        this.monumentExclList.push({
          x: m.x,
          z: m.z,
          isLouvre: true,
          rSq: r * r,
          rad: r
        });
      } else {
        const r =
          m.id === 'monument-sainte-chapelle'
            ? 0.22
            : m.id === 'monument-notre-dame'
              ? 0.68
              : ACTIVE_CITY_ID !== 'paris'
                ? m.radius * 0.46
                : m.radius * 0.36;
        if (m.x - r < this.monMinX) this.monMinX = m.x - r;
        if (m.x + r > this.monMaxX) this.monMaxX = m.x + r;
        if (m.z - r < this.monMinZ) this.monMinZ = m.z - r;
        if (m.z + r > this.monMaxZ) this.monMaxZ = m.z + r;
        this.monumentExclList.push({
          x: m.x,
          z: m.z,
          isLouvre: false,
          rSq: r * r,
          rad: r
        });
      }
    }
  }

  /**
   * Generates a smooth, non-checkerboard Parisian sablé limestone ground texture
   * with delicate travertine micro-grain so the ground looks seamless at all zoom levels.
   */
  private createParisGroundTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#dfd4be';
      ctx.fillRect(0, 0, 256, 256);

      // Subtle, low-contrast organic limestone stone-course variations (no checkerboard!)
      const tones = ['#e2d8c3', '#dcd1bb', '#e0d5c0', '#dad0ba'];
      for (let i = 0; i < 64; i++) {
        const rx = ((i * 53) % 240);
        const ry = ((i * 97) % 240);
        ctx.fillStyle = tones[i % tones.length];
        ctx.fillRect(rx, ry, 28, 18);
      }

      ctx.strokeStyle = 'rgba(178, 165, 142, 0.12)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 256; i += 32) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 256);
        ctx.moveTo(0, i);
        ctx.lineTo(256, i);
        ctx.stroke();
      }
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(720, 720);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    return tex;
  }

  /**
   * Generates a refined, soft-contrast Parisian Pierre de Taille Haussmannian limestone facade texture.
   * Uses warm stone-taupe window recesses and champagne-stone cornice bands instead of harsh black rectangles
   * so city blocks look like cohesive, sun-drenched Parisian limestone sculpture from every angle.
   */
  private createHaussmannFacadeTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Luminous creamy Lutetian limestone base
      ctx.fillStyle = '#f5ede0';
      ctx.fillRect(0, 0, 512, 256);

      // Delicate horizontal ashlar stone courses
      ctx.strokeStyle = 'rgba(182, 168, 144, 0.16)';
      ctx.lineWidth = 1;
      for (let y = 0; y < 256; y += 10) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(512, y);
        ctx.stroke();
      }

      // Ground floor (Rez-de-chaussée) warm dressed stone base
      ctx.fillStyle = '#eadec8';
      ctx.fillRect(0, 204, 512, 52);

      // Haussmannian stone cornice ledges (2nd floor Étage Noble & 5th floor Balcon Filant)
      ctx.fillStyle = '#fcf8f0';
      ctx.fillRect(0, 38, 512, 6);
      ctx.fillRect(0, 154, 512, 6);
      ctx.fillRect(0, 200, 512, 5);

      const cols = 8;
      const colW = 512 / cols;
      const floorY = [10, 48, 84, 120, 164];

      for (let r = 0; r < floorY.length; r++) {
        const wy = floorY[r];
        const wh = r === 4 ? 28 : 26;
        for (let c = 0; c < cols; c++) {
          const wx = c * colW + 14;
          const ww = colW - 28;

          // Warm stone window architrave frame
          ctx.fillStyle = '#e2d5be';
          ctx.fillRect(wx - 2, wy - 2, ww + 4, wh + 4);

          // Soft warm taupe-grey & sunlit champagne window glass (never harsh black!)
          const isSunlit = (r * 5 + c * 3) % 3 === 0;
          ctx.fillStyle = isSunlit ? '#cbbca3' : '#b2a695';
          ctx.fillRect(wx, wy, ww, wh);

          // Delicate cream French casement mullions
          ctx.strokeStyle = '#f6efe2';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(wx + ww * 0.5, wy);
          ctx.lineTo(wx + ww * 0.5, wy + wh);
          ctx.moveTo(wx, wy + wh * 0.35);
          ctx.lineTo(wx + ww, wy + wh * 0.35);
          ctx.stroke();
        }
      }

      // Soft warm-bronze/pewter running balcony railings (Balcons Filants) on 5th & 2nd floors
      ctx.fillStyle = '#9c9284';
      ctx.fillRect(0, 33, 512, 5);
      ctx.fillRect(0, 149, 512, 5);

      // Ground-Floor Parisian Arcades & Portes-Cochères in soft warm stone-bronze
      for (let c = 0; c < cols; c++) {
        const ax = c * colW + 12;
        const aw = colW - 24;
        ctx.fillStyle = c % 4 === 2 ? '#b8ac99' : '#c7b89e';
        ctx.fillRect(ax, 212, aw, 44);
        if (c % 4 !== 2) {
          ctx.fillStyle = '#ece0c8';
          ctx.fillRect(ax + 2, 218, aw - 4, 24);
        }
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    return tex;
  }

  /**
   * Generates a 512x256 Parisian Mansard & Hipped Zinc roof texture:
   * - Bottom half (v = 0.0..0.50): Steep Mansard brisis slate-zinc with sculpted dormer windows (lucarnes) & cornice band
   * - Top half (v = 0.50..1.0): Pitched terrasson powdery silver-slate zinc with standing seams (joints debout) & ridge flashing
   */
  private createMansardRoofTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Top half (y = 0..128 -> v = 0.50..1.0): Upper pitched terrasson standing-seam zinc
      ctx.fillStyle = '#97aab9';
      ctx.fillRect(0, 0, 512, 128);

      // Bottom half (y = 128..256 -> v = 0.0..0.50): Steep lower Mansard brisis slate-ardoise & zinc
      ctx.fillStyle = '#788b9e';
      ctx.fillRect(0, 128, 512, 128);

      // Vertical zinc standing seams (joints debout) across both tiers
      ctx.strokeStyle = 'rgba(72, 88, 104, 0.32)';
      ctx.lineWidth = 1.5;
      for (let x = 0; x < 512; x += 16) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 256);
        ctx.stroke();
      }

      // Subtle sunlit zinc rib highlights
      ctx.strokeStyle = 'rgba(222, 232, 240, 0.25)';
      ctx.lineWidth = 1;
      for (let x = 2; x < 512; x += 16) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 128);
        ctx.stroke();
      }

      // Horizontal batten seams on upper terrasson
      ctx.strokeStyle = 'rgba(215, 226, 236, 0.22)';
      for (let y = 24; y < 128; y += 28) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(512, y);
        ctx.stroke();
      }

      // Metallic zinc ridge flashing cap (faîtage) at the very peak (y = 0..10 -> v = 0.96..1.0)
      ctx.fillStyle = '#c4d2de';
      ctx.fillRect(0, 0, 512, 10);
      ctx.fillStyle = '#637689';
      ctx.fillRect(0, 10, 512, 3);

      // Zinc break-line flashing (ligne de bris) between steep brisis and pitched terrasson (y = 125..134)
      ctx.fillStyle = '#bac8d5';
      ctx.fillRect(0, 125, 512, 6);
      ctx.fillStyle = '#5c6e80';
      ctx.fillRect(0, 131, 512, 3);

      // Sculpted Parisian Mansard Dormer Windows (Lucarnes) along the steep lower brisis (y = 148..236)
      const dormerCols = 8;
      const colW = 512 / dormerCols;
      for (let c = 0; c < dormerCols; c++) {
        const dx = c * colW + 16;
        const dw = colW - 32;
        const dy = 152;
        const dh = 78;

        // Dormer triangular/arched zinc & limestone pediment cap
        ctx.fillStyle = '#dfd4c0';
        ctx.beginPath();
        ctx.moveTo(dx - 4, dy + 10);
        ctx.lineTo(dx + dw * 0.5, dy - 8);
        ctx.lineTo(dx + dw + 4, dy + 10);
        ctx.closePath();
        ctx.fill();

        // Limestone dormer cheek & frame
        ctx.fillStyle = '#e7ddca';
        ctx.fillRect(dx - 2, dy + 8, dw + 4, dh - 8);

        // Warm recessed dormer window glass
        ctx.fillStyle = c % 2 === 0 ? '#b2a593' : '#c6b8a1';
        ctx.fillRect(dx + 3, dy + 13, dw - 6, dh - 16);

        // Cream French casement mullion inside dormer
        ctx.strokeStyle = '#f5eee2';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(dx + dw * 0.5, dy + 13);
        ctx.lineTo(dx + dw * 0.5, dy + dh - 3);
        ctx.moveTo(dx + 3, dy + 36);
        ctx.lineTo(dx + dw - 3, dy + 36);
        ctx.stroke();
      }

      // Base limestone cornice gutter band at the bottom of the Mansard skirt (y = 244..256 -> v = 0.0..0.05)
      ctx.fillStyle = '#efe6d5';
      ctx.fillRect(0, 244, 512, 12);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    return tex;
  }

  private createModernGlassTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#89acc7';
      ctx.fillRect(0, 0, 128, 128);

      ctx.strokeStyle = '#c5ddef';
      ctx.lineWidth = 1.5;
      for (let x = 0; x < 128; x += 16) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 128);
        ctx.stroke();
      }
      for (let y = 0; y < 128; y += 12) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(128, y);
        ctx.stroke();
      }
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    return tex;
  }

  private registerOvergroundMat<T extends THREE.Material>(mat: T): T {
    applyPaperModelShaderHook(mat);
    this.overgroundOpaqueMaterials.push(mat);
    return mat;
  }

  private initMaterials(): void {
    // Warm Parisian Sablé & Limestone Surface Ground Plate (100% opaque by default!)
    this.surfacePlateMaterial = this.registerOvergroundMat(
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        map: this.createParisGroundTexture(),
        roughness: 0.88,
        metalness: 0.02,
        transparent: false,
        opacity: 1.0,
        depthWrite: true,
        polygonOffset: true,
        polygonOffsetFactor: 2,
        polygonOffsetUnits: 2
      })
    );

    // Luminous Parisian Turquoise-Cerulean Seine Water
    this.waterMaterial = this.registerOvergroundMat(
      new THREE.MeshPhysicalMaterial({
        color: 0x3689a8,
        emissive: 0x154b61,
        emissiveIntensity: 0.22,
        roughness: 0.14,
        metalness: 0.26,
        reflectivity: 0.88,
        transparent: false,
        opacity: 1.0,
        depthWrite: true,
        polygonOffset: true,
        polygonOffsetFactor: -2,
        polygonOffsetUnits: -2,
        side: THREE.DoubleSide
      })
    );

    this.modernGlassMaterial = this.registerOvergroundMat(
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        map: this.createModernGlassTexture(),
        vertexColors: true,
        roughness: 0.22,
        metalness: 0.35,
        transparent: false,
        opacity: 1.0,
        depthWrite: true,
        side: THREE.FrontSide
      })
    );

    this.haussmannWallMaterial = this.registerOvergroundMat(
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        map: this.createHaussmannFacadeTexture(),
        vertexColors: true,
        roughness: 0.72,
        metalness: 0.03,
        side: THREE.FrontSide
      })
    );

    this.mansardRoofMaterial = this.registerOvergroundMat(
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        map: this.createMansardRoofTexture(),
        vertexColors: true,
        roughness: 0.52,
        metalness: 0.18,
        side: THREE.FrontSide
      })
    );
  }

  private bedrockMaterial!: THREE.MeshStandardMaterial;
  private plinthGridLight!: THREE.GridHelper;
  private plinthGridDark!: THREE.GridHelper;

  /**
   * Builds the infinite horizon-spanning Parisian sablé limestone ground plane
   * and the subterranean reference grid beneath the city.
   */
  private buildSubterraneanPlinth(): void {
    this.bedrockMaterial = new THREE.MeshStandardMaterial({
      color: 0xc6b9a1,
      roughness: 0.92,
      metalness: 0.04
    });
    const bedrockPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(3600, 3600),
      this.bedrockMaterial
    );
    bedrockPlane.rotation.x = -Math.PI * 0.5;
    bedrockPlane.position.set(0, -13.5, 0);
    bedrockPlane.receiveShadow = true;
    this.plinthGroup.add(bedrockPlane);

    this.plinthGridLight = new THREE.GridHelper(340, 85, 0x9c8b6e, 0xbab09c);
    this.plinthGridLight.position.set(0, -13.2, 0);
    const gridMat = this.plinthGridLight.material as THREE.Material;
    gridMat.transparent = true;
    gridMat.opacity = 0.35;
    this.plinthGroup.add(this.plinthGridLight);

    this.plinthGridDark = new THREE.GridHelper(340, 85, 0x6b5626, 0x1b2438);
    this.plinthGridDark.position.set(0, -13.2, 0);
    const darkGridMat = this.plinthGridDark.material as THREE.Material;
    darkGridMat.transparent = true;
    darkGridMat.opacity = 0.48;
    this.plinthGridDark.visible = false;
    this.plinthGroup.add(this.plinthGridDark);

    // 1. Infinite Horizon-Spanning Parisian Surface Ground Plane at y = -0.085
    const surfaceGeo = new THREE.PlaneGeometry(3600, 3600);
    const surfaceMesh = new THREE.Mesh(surfaceGeo, this.surfacePlateMaterial);
    surfaceMesh.rotation.x = -Math.PI * 0.5;
    surfaceMesh.position.set(0, -0.085, 0);
    surfaceMesh.receiveShadow = true;
    this.overgroundGroup.add(surfaceMesh);

    // 2. Subdivided 3D Topographic Heightmap Mesh of the Paris Basin (Montmartre, Belleville, Chaillot, Sainte-Geneviève, etc.)
    const terrainGeo = new THREE.PlaneGeometry(340, 260, 170, 130);
    terrainGeo.rotateX(-Math.PI * 0.5);
    const posAttr = terrainGeo.attributes.position as THREE.BufferAttribute;
    const uvAttr = terrainGeo.attributes.uv as THREE.BufferAttribute;
    for (let i = 0; i < posAttr.count; i++) {
      const vx = posAttr.getX(i);
      const vz = posAttr.getZ(i);
      const elev = getParisTerrainElevation(vx, vz);
      posAttr.setY(i, elev - 0.038);
      uvAttr.setXY(i, (vx + 1800) / 3600, (vz + 1800) / 3600);
    }
    terrainGeo.computeVertexNormals();
    const terrainMesh = new THREE.Mesh(terrainGeo, this.surfacePlateMaterial);
    terrainMesh.receiveShadow = true;
    this.overgroundGroup.add(terrainMesh);
  }

  /**
   * Builds a smooth continuous 3D ribbon mesh with variable width along a CatmullRomCurve3.
   * Uses spline parameter u = i / segments for both getPoint(u), getTangent(u), and controlWidths
   * interpolation so each control width aligns 1:1 with its corresponding control vertex.
   */
  private createVariableWidthRibbonGeometry(
    curve: THREE.CatmullRomCurve3,
    controlWidths: number[],
    thickness: number,
    segments: number
  ): THREE.BufferGeometry {
    const positions: number[] = [];
    const normals: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];

    const halfH = thickness * 0.5;
    const maxCtrlIdx = controlWidths.length - 1;

    for (let i = 0; i <= segments; i++) {
      const u = i / segments;
      const p = curve.getPoint(u);

      const fIdx = u * maxCtrlIdx;
      const i0 = Math.min(maxCtrlIdx, Math.floor(fIdx));
      const i1 = Math.min(maxCtrlIdx, i0 + 1);
      const frac = fIdx - i0;
      const width = controlWidths[i0] * (1 - frac) + controlWidths[i1] * frac;
      const halfW = width * 0.5;

      const tangent = curve.getTangent(u);
      const nx = -tangent.z;
      const nz = tangent.x;
      const len = Math.hypot(nx, nz) || 1;
      const rx = (nx / len) * halfW;
      const rz = (nz / len) * halfW;

      positions.push(
        p.x - rx, p.y + halfH, p.z - rz,
        p.x + rx, p.y + halfH, p.z + rz,
        p.x - rx, p.y - halfH, p.z - rz,
        p.x + rx, p.y - halfH, p.z + rz
      );
      normals.push(
        0, 1, 0,
        0, 1, 0,
        -nx / len, 0, -nz / len,
        nx / len, 0, nz / len
      );
      uvs.push(0, u * 35, 1, u * 35, 0, u * 35, 1, u * 35);

      if (i < segments) {
        const base = i * 4;
        const next = (i + 1) * 4;
        indices.push(base, base + 1, next + 1, base, next + 1, next);
        indices.push(base + 2, base, next, base + 2, next, next + 2);
        indices.push(base + 1, base + 3, next + 3, base + 1, next + 3, next + 1);
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }

  /**
   * Builds the continuous extended Seine River (from upstream Choisy/Vitry/Ivry through Paris,
   * splitting into the Grand Bras & Petit Bras around Île Saint-Louis and Île de la Cité,
   * and curving around the great western & northern loops to Saint-Denis/Gennevilliers/Argenteuil/Rueil),
   * the Marne River, Canal Saint-Martin/Ourcq, and Canal Saint-Denis.
   */
  private buildBaseSeineAndCanals(): void {
    const seineCanalsGroup = new THREE.Group();
    seineCanalsGroup.name = 'BaseSeineAndCanalsMerged';
    const seinePoints: THREE.Vector3[] = [];
    const seineWaterWidths: number[] = [];
    const seineQuaiWidths: number[] = [];

    for (const [lat, lon, w] of SEINE_CENTERLINE_LATLON) {
      const { x, z } = projectLatLon(lat, lon);
      seinePoints.push(new THREE.Vector3(x, 0.01, z));
      seineWaterWidths.push(w);
      seineQuaiWidths.push(w + 0.34);
    }

    this.seineCurve = new THREE.CatmullRomCurve3(seinePoints, false, 'catmullrom', 0.35);
    const sampleCount = 640;
    const maxIdx = seineWaterWidths.length - 1;
    for (let i = 0; i <= sampleCount; i++) {
      const u = i / sampleCount;
      const pt = this.seineCurve.getPoint(u);
      const fIdx = u * maxIdx;
      const i0 = Math.min(maxIdx, Math.floor(fIdx));
      const i1 = Math.min(maxIdx, i0 + 1);
      const w = seineWaterWidths[i0] * (1 - (fIdx - i0)) + seineWaterWidths[i1] * (fIdx - i0);
      this.seineSamplePoints.push({ pt, halfWidth: w * 0.5 });
    }

    const quaiStoneMat = this.registerOvergroundMat(
      new THREE.MeshStandardMaterial({
        color: 0xcbc0a8,
        roughness: 0.72,
        metalness: 0.06,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1
      })
    );
    const quaiGeo = this.createVariableWidthRibbonGeometry(
      this.seineCurve,
      seineQuaiWidths,
      0.06,
      sampleCount
    );
    const quaiMesh = new THREE.Mesh(quaiGeo, quaiStoneMat);
    quaiMesh.position.y = -0.022;
    quaiMesh.receiveShadow = true;
    seineCanalsGroup.add(quaiMesh);

    const seineWaterGeo = this.createVariableWidthRibbonGeometry(
      this.seineCurve,
      seineWaterWidths,
      0.06,
      sampleCount
    );
    const seineWaterMesh = new THREE.Mesh(seineWaterGeo, this.waterMaterial);
    seineWaterMesh.position.y = -0.004;
    seineWaterMesh.receiveShadow = true;
    seineCanalsGroup.add(seineWaterMesh);

    // South Arm of the Seine around Île Saint-Louis and Île de la Cité (Bras de la Tournelle & Petit Bras)
    if (SEINE_SOUTH_ARM_LATLON.length >= 2) {
      const southArmPoints: THREE.Vector3[] = [];
      const southArmWaterWidths: number[] = [];
      const southArmQuaiWidths: number[] = [];
      for (const [lat, lon, w] of SEINE_SOUTH_ARM_LATLON) {
        const { x, z } = projectLatLon(lat, lon);
        southArmPoints.push(new THREE.Vector3(x, 0.01, z));
        southArmWaterWidths.push(w);
        southArmQuaiWidths.push(w + 0.30);
      }
      const southArmCurve = new THREE.CatmullRomCurve3(southArmPoints, false, 'catmullrom', 0.35);
      const southSampleCount = 120;
      const southMaxIdx = southArmWaterWidths.length - 1;
      for (let i = 0; i <= southSampleCount; i++) {
        const u = i / southSampleCount;
        const pt = southArmCurve.getPoint(u);
        const fIdx = u * southMaxIdx;
        const i0 = Math.min(southMaxIdx, Math.floor(fIdx));
        const i1 = Math.min(southMaxIdx, i0 + 1);
        const w =
          southArmWaterWidths[i0] * (1 - (fIdx - i0)) + southArmWaterWidths[i1] * (fIdx - i0);
        this.seineSamplePoints.push({ pt, halfWidth: w * 0.5 });
      }

      const southQuaiGeo = this.createVariableWidthRibbonGeometry(
        southArmCurve,
        southArmQuaiWidths,
        0.06,
        southSampleCount
      );
      const southQuaiMesh = new THREE.Mesh(southQuaiGeo, quaiStoneMat);
      southQuaiMesh.position.y = -0.023;
      southQuaiMesh.receiveShadow = true;
      seineCanalsGroup.add(southQuaiMesh);

      const southWaterGeo = this.createVariableWidthRibbonGeometry(
        southArmCurve,
        southArmWaterWidths,
        0.06,
        southSampleCount
      );
      const southWaterMesh = new THREE.Mesh(southWaterGeo, this.waterMaterial);
      southWaterMesh.position.y = -0.002;
      southWaterMesh.receiveShadow = true;
      seineCanalsGroup.add(southWaterMesh);
    }

    // Populate 2D Spatial Hash Grid (4x4 world unit cells) for O(1) isPointInSeineChannel lookup
    for (let i = 0; i < this.seineSamplePoints.length; i += 2) {
      const sp = this.seineSamplePoints[i];
      const r = sp.halfWidth + 0.04;
      const rSq = r * r;
      const minX = sp.pt.x - r;
      const maxX = sp.pt.x + r;
      const minZ = sp.pt.z - r;
      const maxZ = sp.pt.z + r;
      if (minX < this.seineMinX) this.seineMinX = minX;
      if (maxX > this.seineMaxX) this.seineMaxX = maxX;
      if (minZ < this.seineMinZ) this.seineMinZ = minZ;
      if (maxZ > this.seineMaxZ) this.seineMaxZ = maxZ;

      const cMinX = Math.floor(minX * 0.25);
      const cMaxX = Math.floor(maxX * 0.25);
      const cMinZ = Math.floor(minZ * 0.25);
      const cMaxZ = Math.floor(maxZ * 0.25);
      const entry = { x: sp.pt.x, z: sp.pt.z, rSq };
      for (let gx = cMinX; gx <= cMaxX; gx++) {
        for (let gz = cMinZ; gz <= cMaxZ; gz++) {
          const key = ((gx + 512) << 10) | ((gz + 512) & 1023);
          let cell = this.seineGrid.get(key);
          if (!cell) {
            cell = [];
            this.seineGrid.set(key, cell);
          }
          cell.push(entry);
        }
      }
    }

    // Plant Riverbank Trees (Les Arbres des Berges de Seine) strictly along the outer Quai promenades
    for (let i = 8; i < sampleCount - 8; i += 4) {
      const u = i / sampleCount;
      const sp = this.seineSamplePoints[i];
      if (!sp) continue;
      // Skip the island split zone where island perimeter trees are planted separately
      if (sp.pt.x > -3.8 && sp.pt.x < 14.5 && sp.pt.z > -0.5 && sp.pt.z < 13.0) continue;

      const tan = this.seineCurve.getTangent(u);
      const tLen = Math.hypot(tan.x, tan.z) || 1;
      const nx = -tan.z / tLen;
      const nz = tan.x / tLen;
      const bankOffset = sp.halfWidth + 0.22;
      for (const side of [-1, 1]) {
        const tx = sp.pt.x + nx * bankOffset * side;
        const tz = sp.pt.z + nz * bankOffset * side;
        this.treeRecords.push({
          x: tx,
          y: 0.04,
          z: tz,
          scale: 0.28 + ((i * 5) % 4) * 0.02,
          color: i % 2 === 0 ? 0x467d4d : 0x568a54,
          minYear: 1900,
          maxYear: 2026
        });
      }
    }

    // Marne River (Confluence at Charenton-le-Pont -> Maisons-Alfort -> Joinville-le-Pont -> Créteil)
    if (MARNE_CENTERLINE_LATLON.length >= 2) {
      const marnePoints: THREE.Vector3[] = [];
      const marneWaterWidths: number[] = [];
      const marneQuaiWidths: number[] = [];
      for (const [lat, lon, w] of MARNE_CENTERLINE_LATLON) {
        const { x, z } = projectLatLon(lat, lon);
        marnePoints.push(new THREE.Vector3(x, 0.01, z));
        marneWaterWidths.push(w * 0.72);
        marneQuaiWidths.push(w * 0.72 + 0.36);
      }
      const marneCurve = new THREE.CatmullRomCurve3(marnePoints, false, 'catmullrom', 0.35);
      const marneQuaiGeo = this.createVariableWidthRibbonGeometry(
        marneCurve,
        marneQuaiWidths,
        0.06,
        120
      );
      const marneQuaiMesh = new THREE.Mesh(marneQuaiGeo, quaiStoneMat);
      marneQuaiMesh.position.y = -0.023;
      seineCanalsGroup.add(marneQuaiMesh);

      const marneWaterGeo = this.createVariableWidthRibbonGeometry(
        marneCurve,
        marneWaterWidths,
        0.06,
        120
      );
      const marneWaterMesh = new THREE.Mesh(marneWaterGeo, this.waterMaterial);
      marneWaterMesh.position.y = -0.003;
      seineCanalsGroup.add(marneWaterMesh);
    }

    // Canal Saint-Martin, Bassin de la Villette & Canal de l'Ourcq (to Pantin & Bobigny)
    if (CANAL_SAINT_MARTIN_LATLON.length >= 2) {
      const canalPoints = CANAL_SAINT_MARTIN_LATLON.map(([lat, lon]) => {
        const { x, z } = projectLatLon(lat, lon);
        return new THREE.Vector3(x, 0.01, z);
      });
      const canalCurve = new THREE.CatmullRomCurve3(canalPoints, false, 'catmullrom', 0.25);

      const canalQuaiGeo = this.createVariableWidthRibbonGeometry(
        canalCurve,
        [1.05, 1.05],
        0.06,
        110
      );
      const canalQuaiMesh = new THREE.Mesh(canalQuaiGeo, quaiStoneMat);
      canalQuaiMesh.position.y = -0.023;
      seineCanalsGroup.add(canalQuaiMesh);

      const canalWaterGeo = this.createVariableWidthRibbonGeometry(
        canalCurve,
        [0.72, 0.72],
        0.06,
        110
      );
      const canalWaterMesh = new THREE.Mesh(canalWaterGeo, this.waterMaterial);
      canalWaterMesh.position.y = -0.003;
      seineCanalsGroup.add(canalWaterMesh);
    }

    // Canal Saint-Denis (Parc de la Villette -> Aubervilliers -> Stade de France -> Seine at Saint-Denis)
    if (CANAL_SAINT_DENIS_LATLON.length >= 2) {
      const csdPoints = CANAL_SAINT_DENIS_LATLON.map(([lat, lon]) => {
        const { x, z } = projectLatLon(lat, lon);
        return new THREE.Vector3(x, 0.01, z);
      });
      const csdCurve = new THREE.CatmullRomCurve3(csdPoints, false, 'catmullrom', 0.25);
      const csdQuaiGeo = this.createVariableWidthRibbonGeometry(csdCurve, [1.0, 1.0], 0.06, 70);
      const csdQuaiMesh = new THREE.Mesh(csdQuaiGeo, quaiStoneMat);
      csdQuaiMesh.position.y = -0.023;
      seineCanalsGroup.add(csdQuaiMesh);

      const csdWaterGeo = this.createVariableWidthRibbonGeometry(csdCurve, [0.68, 0.68], 0.06, 70);
      const csdWaterMesh = new THREE.Mesh(csdWaterGeo, this.waterMaterial);
      csdWaterMesh.position.y = -0.003;
      seineCanalsGroup.add(csdWaterMesh);
    }

    mergeGroupMeshesByMaterial(seineCanalsGroup, false);
    this.overgroundGroup.add(seineCanalsGroup);
  }

  /**
   * Builds all historic Parisian bridges across the Seine at their exact WGS84 bank-to-bank
   * and bank-to-island OpenStreetMap coordinates.
   */
  private buildBridges(): void {
    const stoneBridgeMat = this.registerOvergroundMat(
      new THREE.MeshStandardMaterial({
        color: 0xe6dac2,
        roughness: 0.62,
        metalness: 0.08
      })
    );
    const bridgeRoadMat = this.registerOvergroundMat(
      new THREE.MeshStandardMaterial({
        color: 0x7e776c,
        roughness: 0.82,
        metalness: 0.06
      })
    );
    const ironViaductMat = this.registerOvergroundMat(
      new THREE.MeshStandardMaterial({
        color: 0xbac7d2,
        roughness: 0.58,
        metalness: 0.14
      })
    );
    const goldPylonMat = this.registerOvergroundMat(
      new THREE.MeshStandardMaterial({
        color: 0xf2c94c,
        roughness: 0.32,
        metalness: 0.42
      })
    );

    const staticBridgesGroup = new THREE.Group();
    staticBridgesGroup.name = 'StaticSeineBridgesMerged';

    for (const b of PARIS_BRIDGES) {
      const pt1 = projectLatLon(b.p1[0], b.p1[1]);
      const pt2 = projectLatLon(b.p2[0], b.p2[1]);
      const x = (pt1.x + pt2.x) * 0.5;
      const z = (pt1.z + pt2.z) * 0.5;
      const bridgeAngle = Math.atan2(pt2.x - pt1.x, pt2.z - pt1.z);
      const rawDist = Math.hypot(pt2.x - pt1.x, pt2.z - pt1.z);
      // Exact bank-to-bank span plus a 0.16-unit abutment overlap onto the North/South Quai walls
      const spanLen = Math.max(0.52, rawDist + 0.16);

      const bGroup = new THREE.Group();
      bGroup.position.set(x, 0.12, z);
      bGroup.rotation.y = bridgeAngle;

      const deckW = b.width;
      const deckMesh = new THREE.Mesh(
        new THREE.BoxGeometry(deckW, 0.10, spanLen),
        stoneBridgeMat
      );
      deckMesh.position.y = 0.02;
      deckMesh.castShadow = true;
      deckMesh.receiveShadow = true;
      bGroup.add(deckMesh);

      const roadStrip = new THREE.Mesh(
        new THREE.BoxGeometry(deckW * 0.68, 0.024, spanLen + 0.06),
        bridgeRoadMat
      );
      roadStrip.position.y = 0.075;
      bGroup.add(roadStrip);

      // Stone balustrade parapets along both edges of the bridge
      for (const px of [-deckW * 0.44, deckW * 0.44]) {
        const parapet = new THREE.Mesh(
          new THREE.BoxGeometry(deckW * 0.11, 0.045, spanLen),
          stoneBridgeMat
        );
        parapet.position.set(px, 0.09, 0);
        bGroup.add(parapet);
      }

      // River piers & cutwaters (avant-becs) scaled to span length
      const pierOffsets =
        spanLen > 1.35 ? [-spanLen * 0.25, spanLen * 0.25] : [0];
      for (const pz of pierOffsets) {
        const pier = new THREE.Mesh(
          new THREE.CylinderGeometry(deckW * 0.20, deckW * 0.28, 0.22, 8),
          stoneBridgeMat
        );
        pier.position.set(0, -0.02, pz);
        bGroup.add(pier);
      }

      if (b.name === 'Pont Alexandre III') {
        for (const px of [-deckW * 0.44, deckW * 0.44]) {
          for (const pz of [-spanLen * 0.42, spanLen * 0.42]) {
            const pylon = new THREE.Mesh(
              new THREE.BoxGeometry(0.18, 0.88, 0.18),
              stoneBridgeMat
            );
            pylon.position.set(px, 0.50, pz);
            const pegasus = new THREE.Mesh(
              new THREE.OctahedronGeometry(0.11, 0),
              goldPylonMat
            );
            pegasus.position.set(px, 1.02, pz);
            bGroup.add(pylon, pegasus);
          }
        }
      }

      if (b.viaductLine) {
        for (let pz = -spanLen * 0.36; pz <= spanLen * 0.36; pz += 0.55) {
          const archCol = new THREE.Mesh(
            new THREE.BoxGeometry(0.22, 0.96, 0.14),
            ironViaductMat
          );
          archCol.position.set(0, 0.55, pz);
          bGroup.add(archCol);
        }
      }

      if (b.openedYear > 1900) {
        mergeGroupMeshesByMaterial(bGroup, false);
        this.overgroundGroup.add(bGroup);
        this.yearBoundMeshes.push({
          obj: bGroup,
          minYear: b.openedYear,
          maxYear: 2026
        });
      } else {
        staticBridgesGroup.add(bGroup);
      }
    }

    mergeGroupMeshesByMaterial(staticBridgesGroup, false);
    this.overgroundGroup.add(staticBridgesGroup);
  }

  /**
   * Renders the 13 monumental circular & octagonal Grand Places of Paris (Étoile, Concorde,
   * Bastille, République, Nation, Vendôme, Opéra, etc.).
   */
  private buildMonumentalPlaces(): void {
    const sidewalkMat = this.registerOvergroundMat(
      new THREE.MeshStandardMaterial({
        color: 0xe8dec9,
        roughness: 0.78,
        metalness: 0.04
      })
    );
    const placePavingMat = this.registerOvergroundMat(
      new THREE.MeshStandardMaterial({
        color: 0x999083,
        roughness: 0.8,
        metalness: 0.06
      })
    );
    const placeIslandMat = this.registerOvergroundMat(
      new THREE.MeshStandardMaterial({
        color: 0xede3cf,
        roughness: 0.68,
        metalness: 0.06
      })
    );
    const bronzeStatueMat = this.registerOvergroundMat(
      new THREE.MeshStandardMaterial({
        color: 0x4e8e77,
        roughness: 0.38,
        metalness: 0.45
      })
    );

    const allPlacesGroup = new THREE.Group();
    allPlacesGroup.name = 'MonumentalPlacesMerged';

    for (const pl of PARIS_PLACES) {
      const { x, z } = projectLatLon(pl.lat, pl.lon);
      const elev = getParisTerrainElevation(x, z);
      const plGroup = new THREE.Group();
      plGroup.position.set(x, 0.02 + elev, z);

      const curbMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(pl.radius * 0.72, pl.radius * 0.74, 0.04, 28),
        sidewalkMat
      );
      curbMesh.position.y = 0.008;
      curbMesh.receiveShadow = true;
      plGroup.add(curbMesh);

      const roadDisc = new THREE.Mesh(
        new THREE.CylinderGeometry(pl.radius * 0.62, pl.radius * 0.62, 0.05, 28),
        placePavingMat
      );
      roadDisc.position.y = 0.015;
      roadDisc.receiveShadow = true;
      plGroup.add(roadDisc);

      const islandDisc = new THREE.Mesh(
        new THREE.CylinderGeometry(pl.radius * 0.34, pl.radius * 0.36, 0.09, 24),
        placeIslandMat
      );
      islandDisc.position.y = 0.038;
      islandDisc.receiveShadow = true;
      plGroup.add(islandDisc);

      if (
        pl.hasObeliskOrColumn &&
        !pl.name.includes('Concorde') &&
        !pl.name.includes('Bastille')
      ) {
        const statuePedestal = new THREE.Mesh(
          new THREE.CylinderGeometry(0.24, 0.30, 0.62, 12),
          placeIslandMat
        );
        statuePedestal.position.y = 0.36;
        const statueFig = new THREE.Mesh(
          new THREE.CylinderGeometry(0.10, 0.07, 0.42, 10),
          bronzeStatueMat
        );
        statueFig.position.y = 0.84;
        plGroup.add(statuePedestal, statueFig);
      }

      allPlacesGroup.add(plGroup);
    }

    mergeGroupMeshesByMaterial(allPlacesGroup, false);
    this.overgroundGroup.add(allPlacesGroup);
  }

  /**
   * Builds ornamental octagonal water basins & Tour Saint-Jacques inside the major royal/historic parks.
   */
  private buildRoyalGardenBasins(): void {
    const stoneBasinRimMat = this.registerOvergroundMat(
      new THREE.MeshStandardMaterial({
        color: 0xede2cc,
        roughness: 0.62,
        metalness: 0.08
      })
    );

    const basinsGroup = new THREE.Group();
    basinsGroup.name = 'RoyalGardenBasinsMerged';

    for (const park of PARIS_PARKS) {
      const { x, z } = projectLatLon(park.center[0], park.center[1]);
      const elev = getParisTerrainElevation(x, z);
      const rx = park.sizeKm[0] * 5.6;
      const rz = park.sizeKm[1] * 5.6;

      const hasBasin =
        park.name.includes('Tuileries') ||
        park.name.includes('Luxembourg') ||
        park.name.includes('Palais-Royal') ||
        park.name.includes('Vosges');

      if (hasBasin) {
        const basinR = Math.min(rx, rz) * 0.25;
        const rim = new THREE.Mesh(
          new THREE.CylinderGeometry(basinR * 1.15, basinR * 1.18, 0.1, 8),
          stoneBasinRimMat
        );
        rim.position.set(x, 0.05 + elev, z);
        const basinWater = new THREE.Mesh(
          new THREE.CylinderGeometry(basinR, basinR, 0.12, 8),
          this.waterMaterial
        );
        basinWater.position.set(x, 0.06 + elev, z);
        basinsGroup.add(rim, basinWater);
      }

      if (park.name.includes('Tour Saint-Jacques')) {
        const towerMesh = new THREE.Mesh(
          new THREE.BoxGeometry(0.42, 2.35, 0.42),
          stoneBasinRimMat
        );
        towerMesh.position.set(x, 1.18 + elev, z);
        towerMesh.castShadow = true;
        basinsGroup.add(towerMesh);
      }
    }

    mergeGroupMeshesByMaterial(basinsGroup, false);
    this.overgroundGroup.add(basinsGroup);
  }

  /**
   * Builds the 1900–1924 Enceinte de Thiers Fortifications around the historic perimeter of Paris
   * (visible when the timeline slider is rewound to 1900–1924!).
   */
  private buildThiersFortifications(): void {
    const fortGroup = new THREE.Group();
    fortGroup.name = 'EnceinteDeThiers1900_1924';

    const bastionStoneMat = this.registerOvergroundMat(
      new THREE.MeshStandardMaterial({
        color: 0xb8ad96,
        roughness: 0.82,
        metalness: 0.05
      })
    );
    const glacisTurfMat = this.registerOvergroundMat(
      new THREE.MeshStandardMaterial({
        color: 0x526f49,
        roughness: 0.88,
        metalness: 0.02
      })
    );

    const bastionCount = 44;
    for (let i = 0; i < bastionCount; i++) {
      const a = (i / bastionCount) * Math.PI * 2;
      const rx = 50.5 * Math.cos(a);
      const rz = 38.5 * Math.sin(a);
      if (Math.abs(rz - 18) < 3.5 && rx < -35) continue; // Seine SW gap
      if (Math.abs(rz - 24) < 3.5 && rx > 25) continue; // Seine SE gap

      const elev = getParisTerrainElevation(rx, rz);
      const bMesh = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.58, 0.95), bastionStoneMat);
      bMesh.position.set(rx, 0.29 + elev, rz);
      bMesh.rotation.y = -a + Math.PI * 0.5;
      bMesh.castShadow = true;
      bMesh.receiveShadow = true;

      const turfCap = new THREE.Mesh(new THREE.BoxGeometry(2.05, 0.14, 0.90), glacisTurfMat);
      turfCap.position.set(rx, 0.62 + elev, rz);
      turfCap.rotation.y = -a + Math.PI * 0.5;

      fortGroup.add(bMesh, turfCap);
    }

    mergeGroupMeshesByMaterial(fortGroup, false);
    this.overgroundGroup.add(fortGroup);
    this.yearBoundMeshes.push({
      obj: fortGroup,
      minYear: 1900,
      maxYear: 1924
    });
  }

  /**
   * Loads `/data/paris_osm.json` and constructs high-performance merged BufferGeometry meshes
   * for the exact OpenStreetMap islands, water polygons/channels, parks/squares, 21,927 streets,
   * 76,157 exact building footprints (with courtyard holes!), and trees.
   */
  private async loadAndBuildOsmParis(): Promise<void> {
    const osmUrl = `./data/${ACTIVE_CITY_ID}_osm.json?v=20261016a`;
    const yieldFrame = (): Promise<void> =>
      new Promise<void>((resolve) => setTimeout(resolve, 0));
    try {
      const resp = await fetch(osmUrl);
      if (!resp.ok) {
        throw new Error(`HTTP ${resp.status} loading ${osmUrl}`);
      }
      const data = (await resp.json()) as ParisOsmDataset;

      await yieldFrame();
      this.buildOsmIslandsAndWater(data);
      this.buildOsmParksAndSquares(data);
      await yieldFrame();
      this.buildOsmStreets(data);
      await yieldFrame();
      this.buildOsmBuildings(data);
      await yieldFrame();
      this.buildOsmTrees(data);

      // Sync year & opacity state after OSM meshes are added
      this.updateYear(this.currentYear);
      this.setSurfaceOpacity(this.currentOpacity);
      this.onShadowCastersChanged?.();
    } catch (err) {
      console.error(`[VoxelParisBuilder] Error loading ${osmUrl}:`, err);
    }
  }

  /**
   * Computes signed 2D area of a flat [x0, z0, x1, z1, ...] polygon ring.
   */
  private polygonSignedArea(ring: number[]): number {
    let area = 0;
    const n = ring.length;
    for (let i = 0; i < n; i += 2) {
      const x1 = ring[i];
      const z1 = ring[i + 1];
      const x2 = ring[(i + 2) % n];
      const z2 = ring[(i + 3) % n];
      area += x1 * z2 - x2 * z1;
    }
    return area * 0.5;
  }

  /**
   * Fast, zero-Vector2-allocation 2D ear-clipping triangulator for simple flat rings [x0, z0, x1, z1, ...].
   * Returns flat triangle vertex indices [i0, i1, i2, ...].
   */
  private triangulateSimpleFlatRing(ring: number[]): number[] {
    const n = ring.length >> 1;
    if (n < 3) return [];
    if (n === 3) return [0, 1, 2];
    if (n === 4) {
      // Pick shorter diagonal for 4-vertex quad
      const d02 = Math.hypot(ring[0] - ring[4], ring[1] - ring[5]);
      const d13 = Math.hypot(ring[2] - ring[6], ring[3] - ring[7]);
      return d02 <= d13 ? [0, 1, 2, 0, 2, 3] : [0, 1, 3, 1, 2, 3];
    }

    const area = this.polygonSignedArea(ring);
    const sign = area >= 0 ? 1 : -1;

    const V: number[] = new Array(n);
    for (let i = 0; i < n; i++) V[i] = i;

    const tris: number[] = [];
    let count = n;
    let maxGuards = count * 3;
    let v = count - 1;

    while (count > 2 && maxGuards-- > 0) {
      if (v >= count) v = 0;
      const u = v === 0 ? count - 1 : v - 1;
      const w = v + 1 >= count ? 0 : v + 1;

      const ia = V[u];
      const ib = V[v];
      const ic = V[w];

      const ax = ring[ia * 2];
      const az = ring[ia * 2 + 1];
      const bx = ring[ib * 2];
      const bz = ring[ib * 2 + 1];
      const cx = ring[ic * 2];
      const cz = ring[ic * 2 + 1];

      const cross = ((bx - ax) * (cz - az) - (bz - az) * (cx - ax)) * sign;
      if (cross > 1e-6) {
        let isEar = true;
        for (let p = 0; p < count; p++) {
          if (p === u || p === v || p === w) continue;
          const ip = V[p];
          const px = ring[ip * 2];
          const pz = ring[ip * 2 + 1];

          const c1 = ((bx - ax) * (pz - az) - (bz - az) * (px - ax)) * sign;
          const c2 = ((cx - bx) * (pz - bz) - (cz - bz) * (px - bx)) * sign;
          const c3 = ((ax - cx) * (pz - cz) - (az - cz) * (px - cx)) * sign;
          if (c1 >= 0 && c2 >= 0 && c3 >= 0) {
            isEar = false;
            break;
          }
        }

        if (isEar) {
          tris.push(ia, ib, ic);
          V.splice(v, 1);
          count--;
          maxGuards = count * 3;
          continue;
        }
      }
      v++;
    }

    // Fallback fan if self-intersecting OSM polygon prevented ear clipping from finishing
    if (tris.length === 0 && n >= 3) {
      for (let i = 1; i < n - 1; i++) {
        tris.push(0, i, i + 1);
      }
    }

    return tris;
  }

  /**
   * Appends a horizontal polygon (with optional holes) at height y into merged position/normal/uv/color/index buffers.
   */
  private appendHorizontalPolygonToBuffers(
    outer: number[],
    holes: number[][],
    y: number,
    rCol: number,
    gCol: number,
    bCol: number,
    uvScale: number,
    positions: number[],
    normals: number[],
    uvs: number[],
    colors: number[],
    indices: number[],
    followTerrain = false
  ): void {
    const baseVertex = positions.length / 3;
    const outerVertCount = outer.length >> 1;
    if (outerVertCount < 3) return;

    const emitTri = (
      vi0: number,
      x0: number,
      z0: number,
      vi1: number,
      x1: number,
      z1: number,
      vi2: number,
      x2: number,
      z2: number,
      depth: number
    ): void => {
      if (followTerrain && depth < 6) {
        const d01 = (x1 - x0) * (x1 - x0) + (z1 - z0) * (z1 - z0);
        const d12 = (x2 - x1) * (x2 - x1) + (z2 - z1) * (z2 - z1);
        const d20 = (x0 - x2) * (x0 - x2) + (z0 - z2) * (z0 - z2);
        const maxD2 = Math.max(d01, d12, d20);
        if (maxD2 > 9.0) {
          if (d01 >= d12 && d01 >= d20) {
            const mx = (x0 + x1) * 0.5;
            const mz = (z0 + z1) * 0.5;
            const mIdx = positions.length / 3;
            positions.push(mx, y + getParisTerrainElevation(mx, mz), mz);
            normals.push(0, 1, 0);
            uvs.push(mx * uvScale, mz * uvScale);
            colors.push(rCol, gCol, bCol);
            emitTri(vi0, x0, z0, mIdx, mx, mz, vi2, x2, z2, depth + 1);
            emitTri(mIdx, mx, mz, vi1, x1, z1, vi2, x2, z2, depth + 1);
            return;
          } else if (d12 >= d01 && d12 >= d20) {
            const mx = (x1 + x2) * 0.5;
            const mz = (z1 + z2) * 0.5;
            const mIdx = positions.length / 3;
            positions.push(mx, y + getParisTerrainElevation(mx, mz), mz);
            normals.push(0, 1, 0);
            uvs.push(mx * uvScale, mz * uvScale);
            colors.push(rCol, gCol, bCol);
            emitTri(vi0, x0, z0, vi1, x1, z1, mIdx, mx, mz, depth + 1);
            emitTri(vi0, x0, z0, mIdx, mx, mz, vi2, x2, z2, depth + 1);
            return;
          } else {
            const mx = (x2 + x0) * 0.5;
            const mz = (z2 + z0) * 0.5;
            const mIdx = positions.length / 3;
            positions.push(mx, y + getParisTerrainElevation(mx, mz), mz);
            normals.push(0, 1, 0);
            uvs.push(mx * uvScale, mz * uvScale);
            colors.push(rCol, gCol, bCol);
            emitTri(vi0, x0, z0, vi1, x1, z1, mIdx, mx, mz, depth + 1);
            emitTri(mIdx, mx, mz, vi1, x1, z1, vi2, x2, z2, depth + 1);
            return;
          }
        }
      }
      if ((x1 - x0) * (z2 - z0) - (z1 - z0) * (x2 - x0) > 0) {
        indices.push(vi0, vi2, vi1);
      } else {
        indices.push(vi0, vi1, vi2);
      }
    };

    if (!holes || holes.length === 0) {
      for (let i = 0; i < outer.length; i += 2) {
        const x = outer[i];
        const z = outer[i + 1];
        const vy = followTerrain ? y + getParisTerrainElevation(x, z) : y;
        positions.push(x, vy, z);
        normals.push(0, 1, 0);
        uvs.push(x * uvScale, z * uvScale);
        colors.push(rCol, gCol, bCol);
      }

      const localTris = this.triangulateSimpleFlatRing(outer);
      for (let i = 0; i < localTris.length; i += 3) {
        const i0 = localTris[i];
        const i1 = localTris[i + 1];
        const i2 = localTris[i + 2];
        emitTri(
          baseVertex + i0,
          outer[i0 * 2],
          outer[i0 * 2 + 1],
          baseVertex + i1,
          outer[i1 * 2],
          outer[i1 * 2 + 1],
          baseVertex + i2,
          outer[i2 * 2],
          outer[i2 * 2 + 1],
          0
        );
      }
      return;
    }

    // Polygon with inner courtyard holes: use THREE.ShapeUtils.triangulateShape
    const contourVecs: THREE.Vector2[] = [];
    for (let i = 0; i < outer.length; i += 2) {
      const x = outer[i];
      const z = outer[i + 1];
      const vy = followTerrain ? y + getParisTerrainElevation(x, z) : y;
      contourVecs.push(new THREE.Vector2(x, z));
      positions.push(x, vy, z);
      normals.push(0, 1, 0);
      uvs.push(x * uvScale, z * uvScale);
      colors.push(rCol, gCol, bCol);
    }

    const holeVecs: THREE.Vector2[][] = [];
    for (const hRing of holes) {
      if (hRing.length < 6) continue;
      const hv: THREE.Vector2[] = [];
      for (let i = 0; i < hRing.length; i += 2) {
        const x = hRing[i];
        const z = hRing[i + 1];
        const vy = followTerrain ? y + getParisTerrainElevation(x, z) : y;
        hv.push(new THREE.Vector2(x, z));
        positions.push(x, vy, z);
        normals.push(0, 1, 0);
        uvs.push(x * uvScale, z * uvScale);
        colors.push(rCol, gCol, bCol);
      }
      holeVecs.push(hv);
    }

    const faces = THREE.ShapeUtils.triangulateShape(contourVecs, holeVecs);
    for (const face of faces) {
      const a = baseVertex + face[0];
      const b = baseVertex + face[1];
      const c = baseVertex + face[2];
      emitTri(
        a,
        positions[a * 3],
        positions[a * 3 + 2],
        b,
        positions[b * 3],
        positions[b * 3 + 2],
        c,
        positions[c * 3],
        positions[c * 3 + 2],
        0
      );
    }
  }

  /**
   * Appends vertical wall quads along a closed 2D ring from yBottom to yTop into merged buffers.
   */
  private appendVerticalWallsToBuffers(
    ring: number[],
    yBottom: number,
    yTop: number,
    wantPositiveSignedArea: boolean,
    rCol: number,
    gCol: number,
    bCol: number,
    uRepeatPerUnit: number,
    vRepeat: number,
    positions: number[],
    normals: number[],
    uvs: number[],
    colors: number[],
    indices: number[]
  ): void {
    const n = ring.length >> 1;
    if (n < 3) return;

    const area = this.polygonSignedArea(ring);
    const reverse = wantPositiveSignedArea ? area < 0 : area > 0;

    let uAccum = 0;
    for (let i = 0; i < n; i++) {
      const idx0 = reverse ? (n - 1 - i) : i;
      const idx1 = reverse ? (n - 1 - ((i + 1) % n)) : ((i + 1) % n);

      const x0 = ring[idx0 * 2];
      const z0 = ring[idx0 * 2 + 1];
      const x1 = ring[idx1 * 2];
      const z1 = ring[idx1 * 2 + 1];

      const dx = x1 - x0;
      const dz = z1 - z0;
      const segLen = Math.hypot(dx, dz);
      if (segLen < 0.005) continue;

      // Outward unit normal for positive-signed-area loop in (X, Z)
      const nx = dz / segLen;
      const nz = -dx / segLen;

      // Subtle directional sun-warmth facet modulation so adjacent angled walls have crisp 3D relief
      const dirShade = 0.94 + 0.08 * (nx * 0.65 - nz * 0.45);
      const cr = Math.min(1, rCol * dirShade);
      const cg = Math.min(1, gCol * dirShade);
      const cb = Math.min(1, bCol * dirShade);

      const u0 = uAccum;
      const u1 = uAccum + segLen * uRepeatPerUnit;
      uAccum = u1;

      const base = positions.length / 3;
      positions.push(
        x0, yBottom, z0,
        x1, yBottom, z1,
        x1, yTop, z1,
        x0, yTop, z0
      );
      normals.push(
        nx, 0, nz,
        nx, 0, nz,
        nx, 0, nz,
        nx, 0, nz
      );
      uvs.push(
        u0, 0,
        u1, 0,
        u1, vRepeat,
        u0, vRepeat
      );
      colors.push(
        cr, cg, cb,
        cr, cg, cb,
        cr, cg, cb,
        cr, cg, cb
      );

      indices.push(base, base + 2, base + 1, base, base + 3, base + 2);
    }
  }

  /**
   * Returns a copy of the 2D ring oriented so its signed area has the requested sign
   * (wantPositiveSignedArea = true for outer perimeters, false for inner courtyard holes).
   */
  private computeCanonicalRing(ring: number[], wantPositiveSignedArea: boolean): number[] {
    const n = ring.length >> 1;
    const area = this.polygonSignedArea(ring);
    const reverse = wantPositiveSignedArea ? area < 0 : area > 0;
    if (!reverse) return ring;

    const out = new Array<number>(ring.length);
    for (let i = 0; i < n; i++) {
      const src = n - 1 - i;
      out[i * 2] = ring[src * 2];
      out[i * 2 + 1] = ring[src * 2 + 1];
    }
    return out;
  }

  /**
   * Computes a mitered offset ring in 2D moving inward into the building roof mass by offsetDist.
   * Includes an automatic fallback blend toward the ring centroid if a sharp corner would invert an edge.
   */
  private computeMiterOffsetRing(
    canonicalRing: number[],
    offsetDist: number,
    wantPositiveSignedArea: boolean
  ): number[] {
    const n = canonicalRing.length >> 1;
    if (n < 3) return canonicalRing;

    const out = new Array<number>(canonicalRing.length);
    let cx = 0;
    let cz = 0;

    // Precompute inward unit edge normals for canonical loop:
    // Outward normal for positive-signed-area loop is (dz/L, -dx/L), so inward normal is (-dz/L, dx/L)
    const inNx = new Array<number>(n);
    const inNz = new Array<number>(n);

    for (let i = 0; i < n; i++) {
      const x0 = canonicalRing[i * 2];
      const z0 = canonicalRing[i * 2 + 1];
      cx += x0;
      cz += z0;
      const next = (i + 1) % n;
      const dx = canonicalRing[next * 2] - x0;
      const dz = canonicalRing[next * 2 + 1] - z0;
      const len = Math.hypot(dx, dz) || 1e-6;
      inNx[i] = -dz / len;
      inNz[i] = dx / len;
    }
    cx /= n;
    cz /= n;

    for (let i = 0; i < n; i++) {
      const prev = (i - 1 + n) % n;
      const nx0 = inNx[prev];
      const nz0 = inNz[prev];
      const nx1 = inNx[i];
      const nz1 = inNz[i];

      let bx = nx0 + nx1;
      let bz = nz0 + nz1;
      const bl = Math.hypot(bx, bz);
      let scale = 1.0;
      if (bl > 1e-4) {
        bx /= bl;
        bz /= bl;
        const dot = Math.max(0.52, bx * nx1 + bz * nz1);
        scale = Math.min(1.52, 1.0 / dot);
      } else {
        bx = nx1;
        bz = nz1;
      }

      const x = canonicalRing[i * 2];
      const z = canonicalRing[i * 2 + 1];

      // Clamp offset so no vertex moves further than 72% of its distance to the ring centroid
      const distToC = Math.hypot(cx - x, cz - z);
      const safeDist = wantPositiveSignedArea
        ? Math.min(offsetDist * scale, distToC * 0.72)
        : offsetDist * scale;

      out[i * 2] = x + bx * safeDist;
      out[i * 2 + 1] = z + bz * safeDist;
    }

    // Verify no edge inverted and area sign is preserved
    if (wantPositiveSignedArea) {
      const origArea = this.polygonSignedArea(canonicalRing);
      const newArea = this.polygonSignedArea(out);
      let edgeInverted = false;
      for (let i = 0; i < n; i++) {
        const next = (i + 1) % n;
        const dx0 = canonicalRing[next * 2] - canonicalRing[i * 2];
        const dz0 = canonicalRing[next * 2 + 1] - canonicalRing[i * 2 + 1];
        const dx1 = out[next * 2] - out[i * 2];
        const dz1 = out[next * 2 + 1] - out[i * 2 + 1];
        if (dx0 * dx1 + dz0 * dz1 < -1e-4) {
          edgeInverted = true;
          break;
        }
      }
      if (newArea <= origArea * 0.06 || edgeInverted) {
        // Fallback: smooth centroid contraction (guaranteed non-self-intersecting)
        const shrink = Math.max(0.22, Math.min(0.82, 1.0 - offsetDist * 3.2));
        for (let i = 0; i < n; i++) {
          out[i * 2] = cx + (canonicalRing[i * 2] - cx) * shrink;
          out[i * 2 + 1] = cz + (canonicalRing[i * 2 + 1] - cz) * shrink;
        }
      }
    }

    return out;
  }

  /**
   * Computes the upper hipped roof ridge ring (faîtage) from the top of the Mansard brisis ring (q1Ring).
   * Uses 2D principal-axis (OBB covariance) anisotropic contraction so elongated buildings form a long
   * horizontal ridge line with triangular hipped ends (croupes), while square/corner buildings form a pyramidal pavilion peak.
   */
  private computeHippedRidgeRing(
    q1Ring: number[],
    rIn: number,
    isPavilion: boolean
  ): number[] {
    const n = q1Ring.length >> 1;
    if (n < 3) return q1Ring;

    let cx = 0;
    let cz = 0;
    for (let i = 0; i < n; i++) {
      cx += q1Ring[i * 2];
      cz += q1Ring[i * 2 + 1];
    }
    cx /= n;
    cz /= n;

    // Compute 2D covariance matrix to find the building's natural longitudinal & transverse axes
    let sxx = 0;
    let szz = 0;
    let sxz = 0;
    for (let i = 0; i < n; i++) {
      const dx = q1Ring[i * 2] - cx;
      const dz = q1Ring[i * 2 + 1] - cz;
      sxx += dx * dx;
      szz += dz * dz;
      sxz += dx * dz;
    }

    const theta = 0.5 * Math.atan2(2 * sxz, sxx - szz);
    const ux = Math.cos(theta);
    const uz = Math.sin(theta);
    const vx = -uz;
    const vz = ux;

    let maxU = 1e-4;
    let maxV = 1e-4;
    for (let i = 0; i < n; i++) {
      const dx = q1Ring[i * 2] - cx;
      const dz = q1Ring[i * 2 + 1] - cz;
      const u = Math.abs(dx * ux + dz * uz);
      const v = Math.abs(dx * vx + dz * vz);
      if (u > maxU) maxU = u;
      if (v > maxV) maxV = v;
    }

    const area = Math.abs(this.polygonSignedArea(q1Ring));
    const obbArea = 4 * maxU * maxV;
    const fillRatio = obbArea > 1e-5 ? area / obbArea : 0;

    // If L-shaped or strongly concave (fillRatio < 0.52 or centroid outside polygon), use medial miter offset along each wing
    if (fillRatio < 0.52 || !this.isPointInPolygonRing(cx, cz, q1Ring)) {
      return this.computeMiterOffsetRing(q1Ring, Math.min(0.18, 0.52 * rIn), true);
    }

    // Anisotropic hipped ridge contraction:
    // - Across width (v): collapses tightly to the central ridge spine (kv = 0.08..0.14)
    // - Along length (u): insets the hip ends by ~0.80 * maxV so both ends pitch at 45° into triangular hipped croupes
    const kv = isPavilion ? 0.14 : 0.08;
    const ku = isPavilion
      ? 0.16
      : Math.max(0.12, Math.min(0.78, 1.0 - 0.80 * (maxV / maxU)));

    const out = new Array<number>(q1Ring.length);
    for (let i = 0; i < n; i++) {
      const dx = q1Ring[i * 2] - cx;
      const dz = q1Ring[i * 2 + 1] - cz;
      const u = (dx * ux + dz * uz) * ku;
      const v = (dx * vx + dz * vz) * kv;
      out[i * 2] = cx + u * ux + v * vx;
      out[i * 2 + 1] = cz + u * uz + v * vz;
    }
    return out;
  }

  /**
   * Emits a 3D angled trapezoid roof strip connecting ring0 (at height y0) to ring1 (at height y1)
   * with exact 3D tilted surface normals and directional Parisian sun-and-sky slope shading.
   */
  private appendSlopedRingStripToBuffers(
    ring0: number[],
    y0: number,
    ring1: number[],
    y1: number,
    v0: number,
    v1: number,
    rCol: number,
    gCol: number,
    bCol: number,
    sunContrast: number,
    uRepeatPerUnit: number,
    positions: number[],
    normals: number[],
    uvs: number[],
    colors: number[],
    indices: number[]
  ): void {
    const n = ring0.length >> 1;
    if (n < 3 || ring1.length !== ring0.length) return;

    const dy = y1 - y0;
    let uAccum = 0;

    for (let i = 0; i < n; i++) {
      const next = (i + 1) % n;

      const x0a = ring0[i * 2];
      const z0a = ring0[i * 2 + 1];
      const x1a = ring0[next * 2];
      const z1a = ring0[next * 2 + 1];

      const x0b = ring1[i * 2];
      const z0b = ring1[i * 2 + 1];
      const x1b = ring1[next * 2];
      const z1b = ring1[next * 2 + 1];

      const dx = x1a - x0a;
      const dz = z1a - z0a;
      const segLen = Math.hypot(dx, dz);
      if (segLen < 0.003) continue;

      // Compute exact 3D sloped face normal from (V2 - V0) x (V1 - V0)
      const vx2 = x1b - x0a;
      const vy2 = dy;
      const vz2 = z1b - z0a;

      let nx = vy2 * dz - vz2 * 0;
      let ny = vz2 * dx - vx2 * dz;
      let nz = vx2 * 0 - vy2 * dx;

      if (ny < 0) {
        nx = -nx;
        ny = -ny;
        nz = -nz;
      }
      const nl = Math.hypot(nx, ny, nz) || 1;
      nx /= nl;
      ny /= nl;
      nz /= nl;

      // Directional Parisian sunlight (South-East-Up) vs cool slate skylight (North-West)
      const sunDot = nx * 0.62 - nz * 0.48 + (ny - 0.5) * 0.18;
      const shade = Math.max(0.74, Math.min(1.16, 0.94 + sunContrast * sunDot));
      const cr = Math.min(1, rCol * shade);
      const cg = Math.min(1, gCol * shade);
      const cb = Math.min(1, bCol * shade);

      const uStart = uAccum;
      const uEnd = uAccum + segLen * uRepeatPerUnit;
      uAccum = uEnd;

      const base = positions.length / 3;
      positions.push(
        x0a, y0, z0a,
        x1a, y0, z1a,
        x1b, y1, z1b,
        x0b, y1, z0b
      );
      normals.push(
        nx, ny, nz,
        nx, ny, nz,
        nx, ny, nz,
        nx, ny, nz
      );
      uvs.push(
        uStart, v0,
        uEnd, v0,
        uEnd, v1,
        uStart, v1
      );
      colors.push(
        cr, cg, cb,
        cr, cg, cb,
        cr, cg, cb,
        cr, cg, cb
      );

      indices.push(base, base + 2, base + 1, base, base + 3, base + 2);
    }
  }

  /**
   * Predicts and generates on-the-fly 3D Parisian roof geometry for any OpenStreetMap building footprint:
   * - Tier 1 (Le Brisis): Steep 70° lower Mansard slate-and-zinc slope with dormer windows (lucarnes) rising from the cornice
   * - Tier 2 (Le Terrasson / Croupe): Pitched 30° upper hipped zinc roof slopes rising to the central 3D ridge spine
   * - Tier 3 (Le Faîtage): Raised metallic zinc ridge crest capping the peak
   */
  private appendProceduralParisRoofToBuffers(
    outer: number[],
    holes: number[][],
    yCornice: number,
    roofRGB: [number, number, number],
    style: number,
    bIdx: number,
    blockHash: number,
    positions: number[],
    normals: number[],
    uvs: number[],
    colors: number[],
    indices: number[]
  ): void {
    const n = outer.length >> 1;
    if (n < 3) return;

    const ccwOuter = this.computeCanonicalRing(outer, true);

    // Compute polygon area, perimeter, and hydraulic half-width (inradius rIn = 2*A / P)
    const outerArea = Math.abs(this.polygonSignedArea(ccwOuter));
    let perim = 0;
    for (let i = 0; i < n; i++) {
      const next = (i + 1) % n;
      perim += Math.hypot(
        ccwOuter[next * 2] - ccwOuter[i * 2],
        ccwOuter[next * 2 + 1] - ccwOuter[i * 2 + 1]
      );
    }

    let netArea = outerArea;
    const cwHoles: number[][] = [];
    if (holes && holes.length > 0) {
      for (const hRing of holes) {
        if (hRing.length < 6) continue;
        const cwH = this.computeCanonicalRing(hRing, false);
        cwHoles.push(cwH);
        netArea = Math.max(0.005, netArea - Math.abs(this.polygonSignedArea(cwH)));
        const hn = cwH.length >> 1;
        for (let i = 0; i < hn; i++) {
          const next = (i + 1) % hn;
          perim += Math.hypot(
            cwH[next * 2] - cwH[i * 2],
            cwH[next * 2 + 1] - cwH[i * 2 + 1]
          );
        }
      }
    }

    const rIn = perim > 1e-4 ? Math.min(0.42, Math.max(0.025, (2 * netArea) / perim)) : 0.06;

    // Modern glass tower (style === 2): Recessed beveled architectural penthouse crown
    if (style === 2) {
      const d1 = Math.min(0.065, 0.26 * rIn);
      const y1 = yCornice + 0.038;
      const q1Outer = this.computeMiterOffsetRing(ccwOuter, d1, true);
      this.appendSlopedRingStripToBuffers(
        ccwOuter,
        yCornice,
        q1Outer,
        y1,
        0.52,
        0.92,
        roofRGB[0],
        roofRGB[1],
        roofRGB[2],
        0.18,
        1.4,
        positions,
        normals,
        uvs,
        colors,
        indices
      );
      const q1Holes = cwHoles.map((h) => this.computeMiterOffsetRing(h, d1 * 0.7, false));
      this.appendHorizontalPolygonToBuffers(
        q1Outer,
        q1Holes,
        y1,
        roofRGB[0] * 1.05,
        roofRGB[1] * 1.05,
        roofRGB[2] * 1.05,
        0.35,
        positions,
        normals,
        uvs,
        colors,
        indices
      );
      return;
    }

    // Predict 3D Parisian Mansard + Hipped Roof proportions at true 1:1 world scale (1 unit = 89.3m)
    const isGrandCivic = style === 3;
    const isPavilion = isGrandCivic || ((bIdx + blockHash) % 7 === 0 && cwHoles.length === 0);

    // Tier 1: Steep Lower Mansard Brisis (~4.1m to 5.5m high in real life -> 0.046 to 0.062 world units)
    const d1 = Math.min(0.072, 0.32 * rIn);
    const brisisH = isGrandCivic
      ? 0.062
      : isPavilion
        ? 0.054
        : 0.046 + (blockHash % 3) * 0.004;
    const y1 = yCornice + brisisH;

    // Tier 2: Pitched Upper Hipped Terrasson / Croupe (~3.2m to 4.6m high -> 0.036 to 0.052 world units)
    const terrassonH = isGrandCivic
      ? 0.052
      : isPavilion
        ? 0.044
        : 0.036 + ((bIdx + blockHash) % 3) * 0.004;
    const y2 = y1 + terrassonH;

    const q1Outer = this.computeMiterOffsetRing(ccwOuter, d1, true);

    // Darker slate-ardoise tint on the steep lower Mansard brisis so the dormer tier & break-line pop in 3D
    const brisisR = roofRGB[0] * 0.84;
    const brisisG = roofRGB[1] * 0.85;
    const brisisB = roofRGB[2] * 0.88;

    this.appendSlopedRingStripToBuffers(
      ccwOuter,
      yCornice,
      q1Outer,
      y1,
      0.02,
      0.48,
      brisisR,
      brisisG,
      brisisB,
      0.22,
      1.5,
      positions,
      normals,
      uvs,
      colors,
      indices
    );

    if (cwHoles.length === 0) {
      // Standard & Corner Parisian Buildings: Pitched Hipped Terrasson converging to a 3D Ridge Spine (q2Outer) at y2!
      const q2Outer = this.computeHippedRidgeRing(q1Outer, rIn, isPavilion);

      this.appendSlopedRingStripToBuffers(
        q1Outer,
        y1,
        q2Outer,
        y2,
        0.52,
        0.96,
        roofRGB[0],
        roofRGB[1],
        roofRGB[2],
        0.26,
        1.5,
        positions,
        normals,
        uvs,
        colors,
        indices
      );

      // Crown the narrow central ridge spine (faîtage) at peak height y2 with sunlit metallic zinc
      this.appendHorizontalPolygonToBuffers(
        q2Outer,
        [],
        y2,
        Math.min(1, roofRGB[0] * 1.08),
        Math.min(1, roofRGB[1] * 1.08),
        Math.min(1, roofRGB[2] * 1.08),
        0.4,
        positions,
        normals,
        uvs,
        colors,
        indices
      );
    } else {
      // Haussmannian Courtyard Building (Îlot à Cour Intérieure):
      // Dual-pitched Mansard rising both from the street facade AND from the inner courtyard walls to a central wing ridge!
      const d2 = Math.min(0.17, 0.65 * rIn);
      const q2Outer = this.computeMiterOffsetRing(ccwOuter, d2, true);

      this.appendSlopedRingStripToBuffers(
        q1Outer,
        y1,
        q2Outer,
        y2,
        0.52,
        0.96,
        roofRGB[0],
        roofRGB[1],
        roofRGB[2],
        0.26,
        1.5,
        positions,
        normals,
        uvs,
        colors,
        indices
      );

      const q2Holes: number[][] = [];
      for (const cwH of cwHoles) {
        const q1H = this.computeMiterOffsetRing(cwH, d1 * 0.75, false);
        const q2H = this.computeMiterOffsetRing(cwH, d2 * 0.65, false);
        q2Holes.push(q2H);

        // Courtyard-facing steep Mansard brisis
        this.appendSlopedRingStripToBuffers(
          cwH,
          yCornice,
          q1H,
          y1,
          0.02,
          0.48,
          brisisR * 0.96,
          brisisG * 0.96,
          brisisB * 0.96,
          0.20,
          1.5,
          positions,
          normals,
          uvs,
          colors,
          indices
        );

        // Courtyard-facing pitched terrasson rising to the wing ridge at y2
        this.appendSlopedRingStripToBuffers(
          q1H,
          y1,
          q2H,
          y2,
          0.52,
          0.96,
          roofRGB[0] * 0.98,
          roofRGB[1] * 0.98,
          roofRGB[2] * 0.98,
          0.24,
          1.5,
          positions,
          normals,
          uvs,
          colors,
          indices
        );
      }

      // Cap the courtyard wing ridge crest at peak height y2
      this.appendHorizontalPolygonToBuffers(
        q2Outer,
        q2Holes,
        y2,
        Math.min(1, roofRGB[0] * 1.07),
        Math.min(1, roofRGB[1] * 1.07),
        Math.min(1, roofRGB[2] * 1.07),
        0.4,
        positions,
        normals,
        uvs,
        colors,
        indices
      );
    }
  }

  /**
   * Checks if a point (x, z) lies inside a 2D polygon ring [x0, z0, x1, z1, ...].
   */
  private isPointInPolygonRing(x: number, z: number, ring: number[]): boolean {
    let inside = false;
    const n = ring.length;
    for (let i = 0, j = n - 2; i < n; j = i, i += 2) {
      const xi = ring[i];
      const zi = ring[i + 1];
      const xj = ring[j];
      const zj = ring[j + 1];
      const intersect =
        zi > z !== zj > z && x < ((xj - xi) * (z - zi)) / (zj - zi + 1e-12) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  }

  /**
   * Checks if (x, z) is on one of the Seine islands so buildings/streets sit atop the island platform.
   */
  private isPointOnIsland(x: number, z: number): boolean {
    if (
      x < this.islMinX ||
      x > this.islMaxX ||
      z < this.islMinZ ||
      z > this.islMaxZ
    ) {
      return false;
    }
    for (let i = 0, len = this.islandBounds.length; i < len; i++) {
      const ib = this.islandBounds[i];
      if (x >= ib.minX && x <= ib.maxX && z >= ib.minZ && z <= ib.maxZ) {
        if (this.isPointInPolygonRing(x, z, ib.ring)) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Strips redundant collinear vertices along a closed 2D footprint ring [x0, z0, x1, z1, ...].
   */
  private simplifyFootprintRing(ring: number[]): number[] {
    const n = ring.length >> 1;
    if (n <= 4) return ring;
    let keepCount = 0;
    for (let i = 0; i < n; i++) {
      const prev = ((i - 1 + n) % n) * 2;
      const curr = i * 2;
      const next = ((i + 1) % n) * 2;
      const ax = ring[curr] - ring[prev];
      const az = ring[curr + 1] - ring[prev + 1];
      const bx = ring[next] - ring[curr];
      const bz = ring[next + 1] - ring[curr + 1];
      const lSq = (ax * ax + az * az) * (bx * bx + bz * bz);
      const cross = ax * bz - az * bx;
      if (lSq > 1e-6 && cross * cross >= lSq * 2e-4) {
        keepCount++;
      }
    }
    if (keepCount >= n || keepCount < 3) return ring;
    const out: number[] = [];
    for (let i = 0; i < n; i++) {
      const prev = ((i - 1 + n) % n) * 2;
      const curr = i * 2;
      const next = ((i + 1) % n) * 2;
      const ax = ring[curr] - ring[prev];
      const az = ring[curr + 1] - ring[prev + 1];
      const bx = ring[next] - ring[curr];
      const bz = ring[next + 1] - ring[curr + 1];
      const lSq = (ax * ax + az * az) * (bx * bx + bz * bz);
      const cross = ax * bz - az * bx;
      if (lSq > 1e-6 && cross * cross >= lSq * 2e-4) {
        out.push(ring[curr], ring[curr + 1]);
      }
    }
    return out.length >= 6 ? out : ring;
  }

  /**
   * Strips redundant collinear points along an open 2D road/water polyline [x0, z0, x1, z1, ...].
   */
  private simplifyPolyline(pts: number[]): number[] {
    const n = pts.length >> 1;
    if (n <= 2) return pts;
    const out: number[] = [pts[0], pts[1]];
    let prevX = pts[0];
    let prevZ = pts[1];
    for (let i = 1; i < n - 1; i++) {
      const cx = pts[i * 2];
      const cz = pts[i * 2 + 1];
      const nx = pts[(i + 1) * 2];
      const nz = pts[(i + 1) * 2 + 1];
      const ax = cx - prevX;
      const az = cz - prevZ;
      const bx = nx - cx;
      const bz = nz - cz;
      const lSq = (ax * ax + az * az) * (bx * bx + bz * bz);
      const cross = ax * bz - az * bx;
      if (lSq > 1e-6 && cross * cross >= lSq * 4e-4) {
        out.push(cx, cz);
        prevX = cx;
        prevZ = cz;
      }
    }
    out.push(pts[(n - 1) * 2], pts[(n - 1) * 2 + 1]);
    return out;
  }

  /**
   * Packs raw position/normal/uv/color/index arrays into a quantized BufferGeometry:
   * - Normals packed into normalized Int8Array (3 bytes vs 12 bytes per vertex — 75% VRAM reduction)
   * - Vertex colors packed into normalized Uint8Array (3 bytes vs 12 bytes per vertex — 75% VRAM reduction)
   * - Indices packed into Uint16Array whenever vCount < 65535 (50% index buffer reduction)
   */
  private buildPackedGeom(
    pos: number[],
    norm: number[],
    uv: number[] | null,
    col: number[] | null,
    idx: number[]
  ): THREE.BufferGeometry {
    const g = new THREE.BufferGeometry();
    const vCount = pos.length / 3;
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));

    const nLen = norm.length;
    const nArr = new Int8Array(nLen);
    for (let i = 0; i < nLen; i++) {
      const v = norm[i];
      nArr[i] = v >= 1 ? 127 : v <= -1 ? -127 : (v * 127) | 0;
    }
    g.setAttribute('normal', new THREE.BufferAttribute(nArr, 3, true));

    if (uv && uv.length > 0) {
      g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    }

    if (col && col.length > 0) {
      const cLen = col.length;
      const cArr = new Uint8Array(cLen);
      for (let i = 0; i < cLen; i++) {
        const v = col[i];
        cArr[i] = v >= 1 ? 255 : v <= 0 ? 0 : (v * 255 + 0.5) | 0;
      }
      g.setAttribute('color', new THREE.BufferAttribute(cArr, 3, true));
    }

    const iLen = idx.length;
    if (vCount < 65535) {
      const iArr = new Uint16Array(iLen);
      for (let i = 0; i < iLen; i++) iArr[i] = idx[i];
      g.setIndex(new THREE.BufferAttribute(iArr, 1));
    } else {
      const iArr = new Uint32Array(iLen);
      for (let i = 0; i < iLen; i++) iArr[i] = idx[i];
      g.setIndex(new THREE.BufferAttribute(iArr, 1));
    }

    g.computeBoundingBox();
    g.computeBoundingSphere();
    return g;
  }

  /**
   * Renders the exact OpenStreetMap Seine islands (Île de la Cité, Île Saint-Louis, Île aux Cygnes,
   * Île Saint-Germain, Île de la Jatte, Île de Puteaux, etc.) + all 130 OSM water polygons & 81 river/canal arms.
   */
  private buildOsmIslandsAndWater(data: ParisOsmDataset): void {
    // 1. Render OSM park lakes & ornamental basins (skipping river polygons/lines already rendered by buildBaseSeineAndCanals)
    const waterPos: number[] = [];
    const waterNorm: number[] = [];
    const waterUv: number[] = [];
    const waterCol: number[] = [];
    const waterIdx: number[] = [];

    for (const wp of data.waterPolygons) {
      if (wp.outer.length < 6) continue;
      const wx = wp.outer[0];
      const wz = wp.outer[1];
      // Skip water polygons inside the main Seine/Petit Bras channel to prevent duplicate coplanar water surfaces
      if (ACTIVE_CITY_ID === 'paris' && this.isPointInSeineChannel(wx, wz)) continue;

      this.appendHorizontalPolygonToBuffers(
        wp.outer,
        wp.holes || [],
        0.048,
        1,
        1,
        1,
        0.2,
        waterPos,
        waterNorm,
        waterUv,
        waterCol,
        waterIdx,
        true
      );
    }

    for (const wl of data.waterLines) {
      // Skip main rivers & canals already built by buildBaseSeineAndCanals with smooth variable-width Catmull-Rom curves
      if (
        wl.name.includes('Seine') ||
        wl.name.includes('Bras') ||
        wl.name.includes('Marne') ||
        wl.name.includes('Martin') ||
        wl.name.includes('Ourcq') ||
        wl.name.includes('Saint-Denis')
      ) {
        continue;
      }
      this.appendPolylineRibbonToBuffers(
        wl.pts,
        0.26,
        0.048,
        0.004,
        1,
        1,
        1,
        waterPos,
        waterNorm,
        waterUv,
        waterCol,
        waterIdx,
        true
      );
    }

    if (waterPos.length > 0) {
      const waterGeo = this.buildPackedGeom(waterPos, waterNorm, waterUv, null, waterIdx);
      const osmWaterMesh = new THREE.Mesh(waterGeo, this.waterMaterial);
      osmWaterMesh.receiveShadow = true;
      this.osmCityGroup.add(osmWaterMesh);
    }

    // 2. Render the Exact OpenStreetMap Seine & Park Islands with limestone quay walls
    const islPos: number[] = [];
    const islNorm: number[] = [];
    const islUv: number[] = [];
    const islCol: number[] = [];
    const islIdx: number[] = [];

    for (const isl of data.islands) {
      const ring = isl.outer;
      if (ring.length < 6) continue;

      let minX = Infinity;
      let maxX = -Infinity;
      let minZ = Infinity;
      let maxZ = -Infinity;
      for (let i = 0; i < ring.length; i += 2) {
        const x = ring[i];
        const z = ring[i + 1];
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (z < minZ) minZ = z;
        if (z > maxZ) maxZ = z;
      }
      if (minX < this.islMinX) this.islMinX = minX;
      if (maxX > this.islMaxX) this.islMaxX = maxX;
      if (minZ < this.islMinZ) this.islMinZ = minZ;
      if (maxZ > this.islMaxZ) this.islMaxZ = maxZ;
      this.islandBounds.push({ minX, maxX, minZ, maxZ, ring });

      // Top limestone deck of the island at y = 0.16
      this.appendHorizontalPolygonToBuffers(
        ring,
        [],
        0.16,
        0.91,
        0.87,
        0.78,
        0.25,
        islPos,
        islNorm,
        islUv,
        islCol,
        islIdx
      );

      // Vertical stone embankment quay walls around the exact island contour (y = 0.01 .. 0.16)
      this.appendVerticalWallsToBuffers(
        ring,
        0.01,
        0.16,
        true,
        0.84,
        0.79,
        0.70,
        0.5,
        1,
        islPos,
        islNorm,
        islUv,
        islCol,
        islIdx
      );

      // Plant perimeter quay trees along the exact OSM island contour
      const step = isl.name === 'Île aux Cygnes' ? 4 : 6;
      for (let i = 0; i < ring.length; i += step) {
        this.treeRecords.push({
          x: ring[i],
          y: 0.16,
          z: ring[i + 1],
          scale: isl.name === 'Île aux Cygnes' ? 0.30 : 0.26,
          color: (i >> 1) % 2 === 0 ? 0x528a56 : 0x629960,
          minYear: 1900,
          maxYear: 2026
        });
      }
    }

    if (islPos.length > 0) {
      const islGeo = this.buildPackedGeom(islPos, islNorm, islUv, islCol, islIdx);
      const islandMat = this.registerOvergroundMat(
        new THREE.MeshStandardMaterial({
          color: 0xffffff,
          vertexColors: true,
          roughness: 0.74,
          metalness: 0.04,
          side: THREE.FrontSide
        })
      );
      const islMesh = new THREE.Mesh(islGeo, islandMat);
      islMesh.castShadow = true;
      islMesh.receiveShadow = true;
      this.osmCityGroup.add(islMesh);
    }
  }

  /**
   * Renders all 8,045 real OpenStreetMap parks, gardens, squares, lawns, cemeteries & woods of Paris.
   * Deduplicates identical OSM boundary rings and stratifies sub-layers to eliminate Z-buffer fighting.
   */
  private buildOsmParksAndSquares(data: ParisOsmDataset): void {
    const pos: number[] = [];
    const norm: number[] = [];
    const col: number[] = [];
    const idx: number[] = [];
    const dummyUv: number[] = [];

    const treePalette = [0x518855, 0x61965d, 0x709e54, 0x457a4c];
    const seenParkRings = new Set<string>();

    for (let pIdx = 0; pIdx < data.parks.length; pIdx++) {
      const pk = data.parks[pIdx];
      const ring = pk.outer;
      if (ring.length < 6) continue;

      const cx = ring[0];
      const cz = ring[1];
      if (Math.abs(cx) > 220 || Math.abs(cz) > 220) continue;

      // Deduplicate identical OSM outer boundary polygons (e.g. duplicate Bois de Vincennes relation + way)
      const midIdx = (ring.length >> 2) * 2;
      const ringKey = `${ring.length}:${cx.toFixed(2)},${cz.toFixed(2)}:${ring[midIdx].toFixed(2)},${ring[midIdx + 1].toFixed(2)}`;
      if (seenParkRings.has(ringKey)) continue;
      seenParkRings.add(ringKey);

      const onIsland = this.isPointOnIsland(cx, cz);
      const area = Math.abs(this.polygonSignedArea(ring));

      // Plant trees inside noticeable parks & neighborhood squares (excluding points in the Seine channel)
      if (area > 0.06 && this.treeRecords.length < 14500) {
        const treeStep = area > 0.8 ? 6 : 8;
        for (let i = 0; i < ring.length; i += treeStep) {
          const tx = ring[i];
          const tz = ring[i + 1];
          if (!onIsland && this.isPointInSeineChannel(tx, tz)) continue;
          if (this.isOverlappingCustomMonument(tx, tz)) continue;
          this.treeRecords.push({
            x: tx,
            y: (onIsland ? 0.168 : 0.024) + (onIsland ? 0.0 : getParisTerrainElevation(tx, tz)),
            z: tz,
            scale: 0.28 + ((pIdx + i) % 4) * 0.03,
            color: treePalette[(pIdx + i) % treePalette.length],
            minYear: 1900,
            maxYear: 2026
          });
        }
      }

      // Skip overlapping forest/wood/grass sub-parcels inside the main Bois de Vincennes & Bois de Boulogne
      // master park polygons so their ground surfaces remain 100% single-layer and free of Z-fighting
      const inVincennes = cx > 45 && cx < 115 && cz > 15 && cz < 55;
      const inBoulogne = cx < -53 && cx > -105 && cz > -28 && cz < 13;
      if (
        (inVincennes || inBoulogne) &&
        area < 600 &&
        (pk.kind === 'forest' || pk.kind === 'wood' || pk.kind === 'grass')
      ) {
        continue;
      }

      // Stratify height by park category + deterministic micro-offset so nested gardens never coplanar-fight
      let kindOffset = 0.018;
      let r = 0.42;
      let g = 0.63;
      let b = 0.41;
      if (pk.kind === 'garden') {
        kindOffset = 0.033;
        r = 0.45;
        g = 0.66;
        b = 0.43;
      } else if (pk.kind === 'wood' || pk.kind === 'forest') {
        kindOffset = 0.028;
        r = 0.35;
        g = 0.55;
        b = 0.35;
      } else if (pk.kind === 'cemetery') {
        kindOffset = 0.023;
        r = 0.46;
        g = 0.56;
        b = 0.43;
      }

      const microOffset = (pIdx % 23) * 0.00022;
      const y = onIsland ? 0.168 + microOffset : kindOffset + microOffset;

      dummyUv.length = 0;
      this.appendHorizontalPolygonToBuffers(
        ring,
        [],
        y,
        r,
        g,
        b,
        0.3,
        pos,
        norm,
        dummyUv,
        col,
        idx,
        !onIsland
      );
    }

    if (pos.length > 0) {
      const parkGeo = this.buildPackedGeom(pos, norm, null, col, idx);
      const parkMat = this.registerOvergroundMat(
        new THREE.MeshStandardMaterial({
          color: 0xffffff,
          vertexColors: true,
          roughness: 0.88,
          metalness: 0.02,
          side: THREE.FrontSide,
          polygonOffset: true,
          polygonOffsetFactor: -1,
          polygonOffsetUnits: -1
        })
      );
      const parkMesh = new THREE.Mesh(parkGeo, parkMat);
      parkMesh.receiveShadow = true;
      this.osmCityGroup.add(parkMesh);
    }
  }

  /**
   * Appends a mitered 2D polyline ribbon [x0, z0, x1, z1, ...] into merged vertex buffers.
   */
  private appendPolylineRibbonToBuffers(
    pts: number[],
    halfWidth: number,
    yTop: number,
    yDrop: number,
    rCol: number,
    gCol: number,
    bCol: number,
    positions: number[],
    normals: number[],
    uvs: number[],
    colors: number[],
    indices: number[],
    followTerrain = false
  ): void {
    const n = pts.length >> 1;
    if (n < 2) return;

    const baseVertex = positions.length / 3;
    let distAccum = 0;

    for (let i = 0; i < n; i++) {
      const x = pts[i * 2];
      const z = pts[i * 2 + 1];

      if (i > 0) {
        distAccum += Math.hypot(x - pts[(i - 1) * 2], z - pts[(i - 1) * 2 + 1]);
      }

      // Compute mitered normal from prev and next segments
      let nx = 0;
      let nz = 0;

      if (i === 0) {
        const dx = pts[2] - x;
        const dz = pts[3] - z;
        const l = Math.hypot(dx, dz) || 1;
        nx = -dz / l;
        nz = dx / l;
      } else if (i === n - 1) {
        const dx = x - pts[(i - 1) * 2];
        const dz = z - pts[(i - 1) * 2 + 1];
        const l = Math.hypot(dx, dz) || 1;
        nx = -dz / l;
        nz = dx / l;
      } else {
        const dx1 = x - pts[(i - 1) * 2];
        const dz1 = z - pts[(i - 1) * 2 + 1];
        const l1 = Math.hypot(dx1, dz1) || 1;
        const n1x = -dz1 / l1;
        const n1z = dx1 / l1;

        const dx2 = pts[(i + 1) * 2] - x;
        const dz2 = pts[(i + 1) * 2 + 1] - z;
        const l2 = Math.hypot(dx2, dz2) || 1;
        const n2x = -dz2 / l2;
        const n2z = dx2 / l2;

        const mx = n1x + n2x;
        const mz = n1z + n2z;
        const ml = Math.hypot(mx, mz);
        if (ml > 0.001) {
          const ux = mx / ml;
          const uz = mz / ml;
          const dot = Math.max(0.55, ux * n1x + uz * n1z);
          const scale = Math.min(1.55, 1 / dot);
          nx = ux * scale;
          nz = uz * scale;
        } else {
          nx = n1x;
          nz = n1z;
        }
      }

      const rx = nx * halfWidth;
      const rz = nz * halfWidth;
      const elev = followTerrain ? getParisTerrainElevation(x, z) : 0.0;
      const vy = yTop - yDrop + elev;

      positions.push(
        x - rx, vy, z - rz,
        x + rx, vy, z + rz
      );
      normals.push(0, 1, 0, 0, 1, 0);
      uvs.push(0, distAccum, 1, distAccum);
      colors.push(rCol, gCol, bCol, rCol, gCol, bCol);

      if (i < n - 1) {
        const v0 = baseVertex + i * 2;
        const v1 = v0 + 1;
        const v2 = v0 + 2;
        const v3 = v0 + 3;
        indices.push(v0, v1, v3, v0, v3, v2);
      }
    }
  }

  /**
   * Renders all 21,927 real OpenStreetMap streets, avenues, boulevards, quais & bridges across Greater Paris
   * into merged BufferGeometry meshes with 2x2 spatial quadrant bucketing and collinear point simplification.
   */
  private buildOsmStreets(data: ParisOsmDataset): void {
    const quads = Array.from({ length: 4 }, () => ({
      pos: [] as number[],
      norm: [] as number[],
      col: [] as number[],
      idx: [] as number[]
    }));

    const posPerif: number[] = [];
    const normPerif: number[] = [];
    const colPerif: number[] = [];
    const idxPerif: number[] = [];
    const dummyUv: number[] = [];

    const bridgeMonuments =
      ACTIVE_CITY_ID !== 'paris'
        ? PARIS_MONUMENTS.filter((m) =>
            /bridge|arcos-lapa/i.test(m.id)
          )
        : [];

    for (const [rawPts, tier, isBridge] of data.roads) {
      if (rawPts.length < 4) continue;
      const cx = rawPts[0];
      const cz = rawPts[1];
      if (Math.abs(cx) > 220 || Math.abs(cz) > 220) continue;

      if (isBridge === 1 && bridgeMonuments.length > 0) {
        const midIdx = Math.floor(rawPts.length / 4) * 2;
        const mx = (rawPts[0] + rawPts[midIdx] + rawPts[rawPts.length - 2]) / 3;
        const mz = (rawPts[1] + rawPts[midIdx + 1] + rawPts[rawPts.length - 1]) / 3;
        let overlapsMonumentBridge = false;
        for (const bm of bridgeMonuments) {
          const rSpan = bm.id === 'monument-golden-gate-bridge' ? 7.8 : 4.2;
          if (Math.hypot(mx - bm.x, mz - bm.z) < rSpan) {
            overlapsMonumentBridge = true;
            break;
          }
        }
        if (overlapsMonumentBridge) continue;
      }

      const pts = this.simplifyPolyline(rawPts);
      const onIsland = this.isPointOnIsland(cx, cz);
      const baseY = isBridge === 1 ? 0.195 : onIsland ? 0.174 : 0.0;
      const followTerrain = isBridge === 0 && !onIsland;

      if (tier === 4) {
        dummyUv.length = 0;
        // Boulevard Périphérique / Motorway (opened 1973)
        this.appendPolylineRibbonToBuffers(
          pts,
          0.32,
          baseY + 0.056,
          0.002,
          0.66,
          0.62,
          0.56,
          posPerif,
          normPerif,
          dummyUv,
          colPerif,
          idxPerif,
          followTerrain
        );
        continue;
      }

      const q = quads[(cx >= 0 ? 1 : 0) + (cz >= 0 ? 2 : 0)];
      dummyUv.length = 0;

      if (tier === 3) {
        // Grand Boulevards & Primary Avenues: Pale Limestone Sidewalks + Warm Cobblestone Carriageway
        this.appendPolylineRibbonToBuffers(
          pts,
          0.27,
          baseY + 0.044,
          0.001,
          0.93,
          0.89,
          0.81,
          q.pos,
          q.norm,
          dummyUv,
          q.col,
          q.idx,
          followTerrain
        );
        this.appendPolylineRibbonToBuffers(
          pts,
          0.19,
          baseY + 0.050,
          0.001,
          0.71,
          0.67,
          0.59,
          q.pos,
          q.norm,
          dummyUv,
          q.col,
          q.idx,
          followTerrain
        );
      } else if (tier === 2) {
        // Secondary Avenues & Quais
        this.appendPolylineRibbonToBuffers(
          pts,
          0.15,
          baseY + 0.047,
          0.001,
          0.74,
          0.70,
          0.62,
          q.pos,
          q.norm,
          dummyUv,
          q.col,
          q.idx,
          followTerrain
        );
      } else if (tier === 1) {
        // Tertiary Streets
        this.appendPolylineRibbonToBuffers(
          pts,
          0.11,
          baseY + 0.044,
          0.001,
          0.77,
          0.73,
          0.65,
          q.pos,
          q.norm,
          dummyUv,
          q.col,
          q.idx,
          followTerrain
        );
      } else {
        // Tier 0: Complete Residential, Living & Pedestrian Street Grid
        this.appendPolylineRibbonToBuffers(
          pts,
          0.085,
          baseY + 0.041,
          0.001,
          0.80,
          0.76,
          0.68,
          q.pos,
          q.norm,
          dummyUv,
          q.col,
          q.idx,
          followTerrain
        );
      }
    }

    const streetMat = this.registerOvergroundMat(
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        vertexColors: true,
        roughness: 0.86,
        metalness: 0.03,
        side: THREE.FrontSide,
        polygonOffset: true,
        polygonOffsetFactor: -2,
        polygonOffsetUnits: -2
      })
    );

    for (const q of quads) {
      if (q.pos.length > 0) {
        const geo = this.buildPackedGeom(q.pos, q.norm, null, q.col, q.idx);
        const streetMesh = new THREE.Mesh(geo, streetMat);
        streetMesh.receiveShadow = true;
        this.osmCityGroup.add(streetMesh);
      }
    }

    if (posPerif.length > 0) {
      const perifGeo = this.buildPackedGeom(posPerif, normPerif, null, colPerif, idxPerif);
      const perifMesh = new THREE.Mesh(perifGeo, streetMat);
      perifMesh.receiveShadow = true;
      this.osmCityGroup.add(perifMesh);
      this.yearBoundMeshes.push({
        obj: perifMesh,
        minYear: 1973,
        maxYear: 2026
      });
    }
  }

  /**
   * Checks if (x, z) overlaps the tight footprint of one of the custom Blender 3D monuments
   * so the custom monument model sits cleanly without a flat OSM extrusion intersecting it.
   */
  private isOverlappingCustomMonument(x: number, z: number): boolean {
    if (this.grandesLignesBuilder && this.grandesLignesBuilder.isOverlappingGareOrThroat(x, z)) {
      return true;
    }
    if (
      x < this.monMinX ||
      x > this.monMaxX ||
      z < this.monMinZ ||
      z > this.monMaxZ
    ) {
      return false;
    }
    for (let i = 0, len = this.monumentExclList.length; i < len; i++) {
      const m = this.monumentExclList[i];
      const dx = x - m.x;
      const dz = z - m.z;
      if (dx * dx + dz * dz > m.rSq) continue;
      if (m.isLouvre) {
        const cosA = 0.9341;
        const sinA = 0.3570;
        const lx = dx * cosA - dz * sinA;
        const lz = dx * sinA + dz * cosA;
        if (Math.abs(lx) < 3.15 && Math.abs(lz) < 1.25) {
          return true;
        }
        continue;
      }
      return true;
    }
    return false;
  }

  private isRingOverlappingCustomMonument(outer: number[], cx: number, cz: number): boolean {
    if (this.isOverlappingCustomMonument(cx, cz)) return true;

    if (ACTIVE_CITY_ID !== 'paris') {
      for (let i = 0; i < outer.length; i += 2) {
        if (this.isOverlappingCustomMonument(outer[i], outer[i + 1])) {
          return true;
        }
      }
      return false;
    }

    // Also check vertices against the Louvre's large palace box so partial wing extrusions are suppressed
    const louvre = this.louvreMonument;
    if (louvre && Math.abs(cx - louvre.x) < 4.5 && Math.abs(cz - louvre.z) < 4.5) {
      const cosA = 0.9341;
      const sinA = 0.3570;
      for (let i = 0; i < outer.length; i += 2) {
        const dx = outer[i] - louvre.x;
        const dz = outer[i + 1] - louvre.z;
        const lx = dx * cosA - dz * sinA;
        const lz = dx * sinA + dz * cosA;
        if (Math.abs(lx) < 3.05 && Math.abs(lz) < 1.18) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Ensures non-island OSM buildings and trees never encroach into the Seine water channel.
   * Uses a 4x4 world-unit spatial hash grid (`seineGrid`) for O(1) lookup.
   */
  private isPointInSeineChannel(x: number, z: number): boolean {
    if (
      x < this.seineMinX ||
      x > this.seineMaxX ||
      z < this.seineMinZ ||
      z > this.seineMaxZ
    ) {
      return false;
    }
    const gx = Math.floor(x * 0.25);
    const gz = Math.floor(z * 0.25);
    const key = ((gx + 512) << 10) | ((gz + 512) & 1023);
    const cell = this.seineGrid.get(key);
    if (!cell) return false;
    for (let i = 0, len = cell.length; i < len; i++) {
      const sp = cell[i];
      const dx = x - sp.x;
      const dz = z - sp.z;
      if (dx * dx + dz * dz < sp.rSq) {
        return true;
      }
    }
    return false;
  }

  /**
   * Extrudes all 56,325 exact OpenStreetMap building footprints (outer polygons + inner courtyard holes!)
   * into quantized, spatial-quadrant-bucketed BufferGeometry meshes grouped by historical era (1900, 1928, 1972, 1995) and material.
   * Enforces block-coherent Haussmannian gabarit heights so contiguous parcels within a block form a seamless roofline.
   */
  private async buildOsmBuildings(
    data: ParisOsmDataset,
    yieldFrame?: () => Promise<void>
  ): Promise<void> {
    interface EraBuffers {
      minYear: number;
      wallPos: number[];
      wallNorm: number[];
      wallUv: number[];
      wallCol: number[];
      wallIdx: number[];
      roofPos: number[];
      roofNorm: number[];
      roofUv: number[];
      roofCol: number[];
      roofIdx: number[];
      glassPos: number[];
      glassNorm: number[];
      glassUv: number[];
      glassCol: number[];
      glassIdx: number[];
    }

    const createEraBuffers = (minYear: number): EraBuffers => ({
      minYear,
      wallPos: [],
      wallNorm: [],
      wallUv: [],
      wallCol: [],
      wallIdx: [],
      roofPos: [],
      roofNorm: [],
      roofUv: [],
      roofCol: [],
      roofIdx: [],
      glassPos: [],
      glassNorm: [],
      glassUv: [],
      glassCol: [],
      glassIdx: []
    });

    const mkEra = (minYear: number, qCount: number): EraBuffers[] =>
      Array.from({ length: qCount }, () => createEraBuffers(minYear));

    const eras: Record<number, EraBuffers[]> = {
      1900: mkEra(1900, 4),
      1928: mkEra(1928, 4),
      1972: mkEra(1972, 1),
      1995: mkEra(1995, 1)
    };

    // Luminous Parisian Pierre de Taille limestone, blond stone, and warm Marais cream facade tints
    const limestonePalette: [number, number, number][] = [
      [0.98, 0.95, 0.89], // Warm Pierre de Taille cream
      [0.96, 0.92, 0.85], // Classic Haussmannian blond stone
      [0.94, 0.90, 0.82], // Aged Lutetian limestone
      [0.99, 0.96, 0.91], // Bright Opéra / Champs-Élysées stone
      [0.93, 0.88, 0.79]  // Warm Marais / Latin Quarter ochre-cream
    ];

    // Luminous Parisian Powdery Silver-Slate Zinc & Warm Limestone Terrace Roof Tints
    const zincRoofPalette: [number, number, number][] = [
      [0.74, 0.80, 0.86], // Powdery Parisian silver-slate zinc
      [0.69, 0.76, 0.83], // Soft Parisian blue-grey zinc
      [0.78, 0.82, 0.86], // Sunlit weathered light zinc
      [0.72, 0.77, 0.82], // Classic Haussmannian zinc-grey
      [0.84, 0.80, 0.73]  // Warm Parisian stone roof terrace
    ];

    for (let bIdx = 0; bIdx < data.buildings.length; bIdx++) {
      if (yieldFrame && bIdx > 0 && (bIdx & 8191) === 0) {
        await yieldFrame();
      }
      const [rawOuter, holes, h, style] = data.buildings[bIdx];
      if (rawOuter.length < 6) continue;

      let sumX = 0;
      let sumZ = 0;
      const rawVerts = rawOuter.length >> 1;
      for (let i = 0; i < rawOuter.length; i += 2) {
        sumX += rawOuter[i];
        sumZ += rawOuter[i + 1];
      }
      const cx = sumX / rawVerts;
      const cz = sumZ / rawVerts;
      if (this.isRingOverlappingCustomMonument(rawOuter, cx, cz)) continue;

      const outer = this.simplifyFootprintRing(rawOuter);
      let perim = 0;
      for (let i = 0; i < outer.length; i += 2) {
        const x0 = outer[i];
        const z0 = outer[i + 1];
        const next = (i + 2) % outer.length;
        perim += Math.hypot(outer[next] - x0, outer[next + 1] - z0);
      }
      const outerArea = Math.abs(this.polygonSignedArea(outer));
      const rIn = perim > 1e-4 ? (2 * outerArea) / perim : 0;

      const onIsland = this.isPointOnIsland(cx, cz);

      // Filter out ultra-thin cadastral wall slivers & tiny courtyard sheds while preserving Place Dauphine townhouses on islands
      if (outerArea < (onIsland ? 0.016 : 0.035) || rIn < (onIsland ? 0.040 : 0.052)) continue;
      if (!onIsland && this.isPointInSeineChannel(cx, cz)) continue;

      // Block-coherent spatial hash so all contiguous cadastral parcels in a Haussmannian block
      // share a unified cornice height and harmonious palette (eliminating jagged per-parcel teeth!)
      const blockX = Math.floor(cx / 3.4);
      const blockZ = Math.floor(cz / 3.4);
      const blockHash = Math.abs((blockX * 73856093) ^ (blockZ * 19349663));
      const radial = Math.hypot(cx / 46, cz / 35);

      // Authentic 1:1 Parisian vertical scale (1.0 world unit = 89.3 meters):
      // A 6-storey Haussmannian facade is 17m–20m to the cornice (0.19–0.22 world units) + 7.5m Mansard roof (0.085 units)
      let effectiveH = h;
      if (ACTIVE_CITY_ID !== 'paris') {
        effectiveH = Math.min(2.8, Math.max(0.14, h));
      } else if (style === 2) {
        effectiveH = Math.min(1.45, Math.max(0.30, h * 0.52));
      } else {
        if (radial < 0.92) {
          // Strict Haussmannian intra-muros gabarit: uniform cornice height across each city block
          effectiveH = style === 3 ? 0.24 : blockHash % 3 === 0 ? 0.21 : 0.19;
        } else if (radial < 1.18) {
          effectiveH = blockHash % 2 === 0 ? 0.17 : 0.15;
        } else {
          effectiveH = blockHash % 2 === 0 ? 0.14 : 0.12;
        }
        // Aspect-ratio guard: ensure no non-tower building is ever taller than its own footprint width
        effectiveH = Math.max(0.11, Math.min(effectiveH, rIn * 1.65));
      }

      const terrainY = onIsland ? 0.0 : getParisTerrainElevation(cx, cz);
      const yBottom = (onIsland ? 0.16 : 0.015) + terrainY;
      const yTop = yBottom + effectiveH;

      // Determine historical era bucket based on architecture style & radial ring (Enceinte de Thiers / HBM / Modern ZAC)
      let eraKey = 1900;
      if (style === 2) {
        // Modern glass/office architecture (strictly in La Défense, Front de Seine, Italie 13, Bercy)
        const isEastOrNorthZac = (cx > 14 && cz > 14) || (cx < -10 && cz < -24);
        eraKey = isEastOrNorthZac ? 1995 : 1972;
      } else if (style === 1 || (radial >= 0.94 && radial <= 1.12 && blockHash % 3 !== 0)) {
        // 1920s–1930s Ceinture HBM Red-Brick & Art Deco expansion after demolition of Thiers fortifications
        eraKey = 1928;
      } else if (radial > 1.12 && blockHash % 2 === 1) {
        eraKey = 1928;
      }

      const eraQuads = eras[eraKey];
      const qIdx = eraQuads.length === 4 ? (cx >= 0 ? 1 : 0) + (cz >= 0 ? 2 : 0) : 0;
      const bucket = eraQuads[qIdx];

      if (style === 2) {
        // Modern glass tower / office block in La Défense, Front de Seine, Italie 13, Bercy
        const gTint: [number, number, number] =
          bIdx % 2 === 0 ? [0.76, 0.86, 0.94] : [0.82, 0.89, 0.95];
        const vGlass = Math.max(1, Math.round(effectiveH / 0.24));
        this.appendVerticalWallsToBuffers(
          outer,
          yBottom,
          yTop,
          true,
          gTint[0],
          gTint[1],
          gTint[2],
          1.4,
          vGlass,
          bucket.glassPos,
          bucket.glassNorm,
          bucket.glassUv,
          bucket.glassCol,
          bucket.glassIdx
        );
        for (const hRing of holes) {
          this.appendVerticalWallsToBuffers(
            hRing,
            yBottom,
            yTop,
            false,
            gTint[0] * 0.92,
            gTint[1] * 0.92,
            gTint[2] * 0.92,
            1.4,
            vGlass,
            bucket.glassPos,
            bucket.glassNorm,
            bucket.glassUv,
            bucket.glassCol,
            bucket.glassIdx
          );
        }
        // 3D Recessed Architectural Penthouse Crown on Modern Towers
        this.appendProceduralParisRoofToBuffers(
          outer,
          holes,
          yTop,
          [0.68, 0.77, 0.85],
          2,
          bIdx,
          blockHash,
          bucket.roofPos,
          bucket.roofNorm,
          bucket.roofUv,
          bucket.roofCol,
          bucket.roofIdx
        );
        continue;
      }

      // Haussmannian Limestone, Historic/Civic Stone, or HBM Brick Facade (harmonized by city block!)
      let wallRGB = limestonePalette[blockHash % limestonePalette.length];
      let roofRGB = zincRoofPalette[blockHash % zincRoofPalette.length];

      if (style === 1 || (eraKey === 1928 && radial >= 0.92 && radial <= 1.08)) {
        // Parisian HBM warm salmon-ochre brick & stone trim
        wallRGB = blockHash % 2 === 0 ? [0.90, 0.72, 0.62] : [0.92, 0.76, 0.66];
      } else if (style === 3) {
        // Grand civic / historic edifice with pale dressed stone & verdigris/zinc roof
        wallRGB = [0.98, 0.95, 0.89];
        roofRGB = blockHash % 3 === 0 ? [0.60, 0.75, 0.70] : [0.68, 0.76, 0.84];
      }

      const vFloors = 1;

      // Outer street-facing facade walls rising to the cornice line (yTop)
      this.appendVerticalWallsToBuffers(
        outer,
        yBottom,
        yTop,
        true,
        wallRGB[0],
        wallRGB[1],
        wallRGB[2],
        1.8,
        vFloors,
        bucket.wallPos,
        bucket.wallNorm,
        bucket.wallUv,
        bucket.wallCol,
        bucket.wallIdx
      );

      // Inner courtyard (cour intérieure) walls!
      for (const hRing of holes) {
        this.appendVerticalWallsToBuffers(
          hRing,
          yBottom,
          yTop,
          false,
          wallRGB[0] * 0.95,
          wallRGB[1] * 0.94,
          wallRGB[2] * 0.93,
          1.8,
          vFloors,
          bucket.wallPos,
          bucket.wallNorm,
          bucket.wallUv,
          bucket.wallCol,
          bucket.wallIdx
        );
      }

      // On-the-fly 3D Parisian Mansard (Brisis + Pitched Hipped Terrasson + Zinc Ridge Faîtage) Roof Geometry!
      this.appendProceduralParisRoofToBuffers(
        outer,
        holes,
        yTop,
        roofRGB,
        style,
        bIdx,
        blockHash,
        bucket.roofPos,
        bucket.roofNorm,
        bucket.roofUv,
        bucket.roofCol,
        bucket.roofIdx
      );
    }

    // Commit quantized, spatial-quadrant-bucketed BufferGeometry meshes per historical era
    for (const eraQuads of Object.values(eras)) {
      const minYear = eraQuads[0].minYear;
      const eraGroup = new THREE.Group();
      eraGroup.name = `OsmBuildingsEra_${minYear}`;

      for (const era of eraQuads) {
        if (era.wallPos.length > 0) {
          const wallGeo = this.buildPackedGeom(
            era.wallPos,
            era.wallNorm,
            era.wallUv,
            era.wallCol,
            era.wallIdx
          );
          const wallMesh = new THREE.Mesh(wallGeo, this.haussmannWallMaterial);
          wallMesh.castShadow = true;
          wallMesh.receiveShadow = true;
          eraGroup.add(wallMesh);
        }

        if (era.roofPos.length > 0) {
          const roofGeo = this.buildPackedGeom(
            era.roofPos,
            era.roofNorm,
            era.roofUv,
            era.roofCol,
            era.roofIdx
          );
          const roofMesh = new THREE.Mesh(roofGeo, this.mansardRoofMaterial);
          roofMesh.castShadow = false;
          roofMesh.receiveShadow = true;
          eraGroup.add(roofMesh);
        }

        if (era.glassPos.length > 0) {
          const glassGeo = this.buildPackedGeom(
            era.glassPos,
            era.glassNorm,
            era.glassUv,
            era.glassCol,
            era.glassIdx
          );
          const glassMesh = new THREE.Mesh(glassGeo, this.modernGlassMaterial);
          glassMesh.castShadow = true;
          glassMesh.receiveShadow = true;
          eraGroup.add(glassMesh);
        }
      }

      this.osmCityGroup.add(eraGroup);
      if (minYear > 1900) {
        this.yearBoundMeshes.push({
          obj: eraGroup,
          minYear,
          maxYear: 2026
        });
      }
    }
  }

  /**
   * Builds instanced meshes for all OpenStreetMap boulevard tree rows, park groves, and riverbank trees.
   * Uses a simplified detail-0 icosahedron crown (20 tris vs 80 tris) + open-ended 6-sided trunk cylinder (12 tris vs 32 tris)
   * and writes matrices directly into the Float32Array buffer, saving >1.08M triangles across ~15,000 trees!
   */
  private buildOsmTrees(data: ParisOsmDataset): void {
    const treePalette = [0x467d4d, 0x568d54, 0x67944c, 0x3b6e45];

    for (let i = 0; i < data.trees.length; i++) {
      const [tx, tz] = data.trees[i];
      if (Math.abs(tx) > 220 || Math.abs(tz) > 220) continue;
      if (this.isOverlappingCustomMonument(tx, tz)) continue;

      const onIsland = this.isPointOnIsland(tx, tz);
      if (!onIsland && this.isPointInSeineChannel(tx, tz)) continue;
      this.treeRecords.push({
        x: tx,
        y: (onIsland ? 0.16 : 0.02) + (onIsland ? 0.0 : getParisTerrainElevation(tx, tz)),
        z: tz,
        scale: 0.28 + (i % 4) * 0.03,
        color: treePalette[i % treePalette.length],
        minYear: 1900,
        maxYear: 2026
      });
    }

    const crownGeo = new THREE.IcosahedronGeometry(0.62, 0);
    const crownMat = this.registerOvergroundMat(
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.8,
        metalness: 0.03
      })
    );
    this.treeCrownInstanced = new THREE.InstancedMesh(
      crownGeo,
      crownMat,
      Math.max(1, this.treeRecords.length)
    );
    this.treeCrownInstanced.castShadow = false;
    this.treeCrownInstanced.receiveShadow = true;

    const trunkGeo = new THREE.CylinderGeometry(0.07, 0.11, 0.52, 6, 1, true);
    const trunkMat = this.registerOvergroundMat(
      new THREE.MeshStandardMaterial({
        color: 0x5c4636,
        roughness: 0.9,
        metalness: 0.02
      })
    );
    this.treeTrunkInstanced = new THREE.InstancedMesh(
      trunkGeo,
      trunkMat,
      Math.max(1, this.treeRecords.length)
    );

    const colorHelper = new THREE.Color();
    const trunkMatArr = this.treeTrunkInstanced.instanceMatrix.array;
    const crownMatArr = this.treeCrownInstanced.instanceMatrix.array;

    for (let i = 0; i < this.treeRecords.length; i++) {
      const tr = this.treeRecords[i];
      colorHelper.setHex(tr.color);
      this.treeCrownInstanced.setColorAt(i, colorHelper);

      writeTranslationScaleMatrix(
        trunkMatArr,
        i,
        tr.x,
        tr.y + 0.15,
        tr.z,
        tr.scale,
        tr.scale,
        tr.scale
      );
      writeTranslationScaleMatrix(
        crownMatArr,
        i,
        tr.x,
        tr.y + 0.44 * tr.scale + 0.16,
        tr.z,
        tr.scale,
        tr.scale * 0.92,
        tr.scale
      );
    }

    if (this.treeCrownInstanced.instanceColor) {
      this.treeCrownInstanced.instanceColor.needsUpdate = true;
    }
    this.treeTrunkInstanced.instanceMatrix.needsUpdate = true;
    this.treeCrownInstanced.instanceMatrix.needsUpdate = true;

    this.osmCityGroup.add(this.treeTrunkInstanced);
    this.osmCityGroup.add(this.treeCrownInstanced);
  }

  public updateYear(year: number): void {
    const prevYear = this.currentYear;
    this.currentYear = year;
    this.monumentsBuilder.updateYear(year);
    this.grandesLignesBuilder.updateYear(year);
    this.surfaceSimulation.updateYear(year);

    let visibilityChanged = prevYear !== year;
    for (const item of this.yearBoundMeshes) {
      const nextVis = year >= item.minYear && year <= item.maxYear;
      if (item.obj.visible !== nextVis) {
        item.obj.visible = nextVis;
        visibilityChanged = true;
      }
    }
    if (visibilityChanged) {
      this.onShadowCastersChanged?.();
    }
  }

  /**
   * Updates the target opacity of the entire Overground Layer (0.0 to 1.0).
   * All overground materials remain 100% opaque (`transparent = false, depthWrite = true`)
   * with zero shader recompilations (`needsUpdate`) or per-mesh alpha sorting;
   * when `0.01 < opacity < 0.99`, `SceneManager` renders the opaque overground layer once
   * into an offscreen MSAA render target and composites it in a single fullscreen draw call.
   */
  public setSurfaceOpacity(opacity: number): void {
    const clamped = Math.max(0.0, Math.min(1.0, opacity));
    this.currentOpacity = clamped;
    this.overgroundGroup.visible = clamped > 0.01;
    this.monumentsBuilder.setOvergroundOpacity(clamped);
  }

  public getSurfaceOpacity(): number {
    return this.currentOpacity;
  }

  public setUndergroundDarkMode(dark: boolean): void {
    this.bedrockMaterial.color.setHex(dark ? 0x070a14 : 0xc6b9a1);
    this.plinthGridLight.visible = !dark;
    this.plinthGridDark.visible = dark;
  }

  private isPaperModelMode = false;
  private isRainingWeather = false;

  /**
   * Toggles the Grey Paper Architecture Model ("Maquette Grise") mode on the entire above-ground city
   * so Metro line light columns and station halos pop vividly against monochrome grey cardstock architecture.
   */
  public setPaperModelMode(enabled: boolean): void {
    this.isPaperModelMode = enabled;
    PAPER_MODEL_UNIFORM.value = enabled ? 1.0 : 0.0;
    this.syncSurfaceMaterialRoughness();
  }

  public isPaperModel(): boolean {
    return this.isPaperModelMode;
  }

  /**
   * Adjusts rooftop, facade, and ground specular roughness when Parisian rain or Grey Paper Mode is active.
   */
  public setWeatherSurfaceSheen(isRaining: boolean): void {
    this.isRainingWeather = isRaining;
    this.syncSurfaceMaterialRoughness();
  }

  private syncSurfaceMaterialRoughness(): void {
    if (this.isPaperModelMode) {
      this.waterMaterial.roughness = 0.78;
      this.waterMaterial.metalness = 0.04;
      this.mansardRoofMaterial.roughness = 0.76;
      this.mansardRoofMaterial.metalness = 0.06;
      this.haussmannWallMaterial.roughness = 0.86;
      this.surfacePlateMaterial.roughness = 0.94;
    } else {
      this.waterMaterial.roughness = 0.14;
      this.waterMaterial.metalness = 0.26;
      this.mansardRoofMaterial.roughness = this.isRainingWeather ? 0.24 : 0.46;
      this.mansardRoofMaterial.metalness = this.isRainingWeather ? 0.42 : 0.24;
      this.haussmannWallMaterial.roughness = this.isRainingWeather ? 0.48 : 0.72;
      this.surfacePlateMaterial.roughness = this.isRainingWeather ? 0.56 : 0.92;
    }
  }

  public getMonumentRaycastTargets(ray?: THREE.Ray): THREE.Object3D[] {
    return [
      ...this.monumentsBuilder.getRaycastTargets(ray),
      ...this.grandesLignesBuilder.getRaycastTargets(ray)
    ];
  }

  public getOutlinedMonumentWorldBox(): THREE.Box3 | null {
    return (
      this.monumentsBuilder.getOutlinedWorldBox() ??
      this.grandesLignesBuilder.getOutlinedWorldBox()
    );
  }

  public setOutlinedMonument(monumentId: string | null): void {
    this.monumentsBuilder.setOutlinedMonument(monumentId);
    this.grandesLignesBuilder.setOutlinedMonument(monumentId);
  }

  public setSelectedMonument(monumentId: string | null): void {
    this.monumentsBuilder.setSelectedMonument(monumentId);
    this.grandesLignesBuilder.setSelectedMonument(monumentId);
  }

  public hasOutlinedMonument(): boolean {
    return (
      this.monumentsBuilder.hasOutlinedMonument() ||
      this.grandesLignesBuilder.hasOutlinedMonument()
    );
  }

  public setManualEiffelSparkle(enabled: boolean): void {
    this.monumentsBuilder.setManualEiffelSparkle(enabled);
  }

  public updateAnimation(elapsedTime: number, timeOfDayHours = 14.5, deltaSeconds = 0.016): void {
    this.monumentsBuilder.updateAnimation(elapsedTime, timeOfDayHours);
    this.grandesLignesBuilder.updateAnimation(elapsedTime);
    this.surfaceSimulation.updateAnimation(elapsedTime, deltaSeconds);
  }
}
