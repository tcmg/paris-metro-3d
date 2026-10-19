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
  GrandeGareCorridorData,
  PARIS_GRANDES_LIGNES
} from '../data/parisGrandesLignesData';
import {
  getParisTerrainElevation,
  PARIS_MONUMENTS,
  ParisMonumentData
} from '../data/parisHistoricalData';
import {
  applyPaperModelShaderHook,
  MONUMENT_OUTLINE_LAYER
} from './ParisMonumentsBuilder';
import { FastCurveLUT, mergeGroupMeshesByMaterial } from './geometryBatchUtils';

interface ExpressTrainFormation {
  corridor: GrandeGareCorridorData;
  corridorGroup: THREE.Group;
  lut: FastCurveLUT;
  trackLateralOffset: number;
  direction: 1 | -1;
  phase: number;
  speed: number;
  tgvType: 0 | 1 | 2;
}

interface CorridorRuntime {
  data: GrandeGareCorridorData;
  buildingGroup: THREE.Group;
  corridorGroup: THREE.Group;
  colorRevealUniform: { value: number };
  monumentData?: ParisMonumentData;
}

interface GareRaycastEntry {
  buildingGroup: THREE.Group;
  proxyGroup: THREE.Group;
  worldBox: THREE.Box3;
  monumentId: string;
}

export class GrandesLignesBuilder {
  public readonly rootGroup = new THREE.Group();
  public readonly hitProxyRoot = new THREE.Group();
  public readonly raycastEntries: GareRaycastEntry[] = [];

  private readonly corridors: CorridorRuntime[] = [];
  private readonly trains: ExpressTrainFormation[] = [];
  private readonly hitProxyMat = new THREE.MeshBasicMaterial({ visible: false });

  private limestoneMat!: THREE.MeshStandardMaterial;
  private darkIronMat!: THREE.MeshStandardMaterial;
  private zincRoofMat!: THREE.MeshStandardMaterial;
  private shedGlassMat!: THREE.MeshPhysicalMaterial;
  private goldAccentMat!: THREE.MeshStandardMaterial;
  private brickViaductMat!: THREE.MeshStandardMaterial;
  private ballastMat!: THREE.MeshStandardMaterial;
  private steelRailMat!: THREE.MeshStandardMaterial;

  private readonly trainInstancedGroup = new THREE.Group();
  private steamLocoBodyInst!: THREE.InstancedMesh;
  private steamLocoStackInst!: THREE.InstancedMesh;
  private steamCoachBodyInst!: THREE.InstancedMesh;
  private steamCoachRoofInst!: THREE.InstancedMesh;
  private teeBodyInst!: THREE.InstancedMesh;
  private teeRoofInst!: THREE.InstancedMesh;
  private tgvBodyLyonInst!: THREE.InstancedMesh;
  private tgvBodyNordInst!: THREE.InstancedMesh;
  private tgvBodyOtherInst!: THREE.InstancedMesh;
  private tgvRoofInst!: THREE.InstancedMesh;

  private currentYear = 2026;
  private outlinedMonumentId: string | null = null;
  private selectedMonumentId: string | null = null;
  private visibleEnabled = true;

  // Precomputed track corridor segments + global AABB for fast OSM building/tree exclusion
  private readonly exclusionBoxes: {
    cx: number;
    cz: number;
    cosA: number;
    sinA: number;
    halfW: number;
    halfL: number;
    minX: number;
    maxX: number;
    minZ: number;
    maxZ: number;
  }[] = [];
  private readonly exclusionSegments: {
    ax: number;
    az: number;
    bx: number;
    bz: number;
    sx: number;
    sz: number;
    invLenSq: number;
    halfWidthSq: number;
    minX: number;
    maxX: number;
    minZ: number;
    maxZ: number;
  }[] = [];
  private exclMinX = 1e9;
  private exclMaxX = -1e9;
  private exclMinZ = 1e9;
  private exclMaxZ = -1e9;

  constructor() {
    this.rootGroup.name = 'ParisGrandesLignesAndGares';
    this.initMaterials();
    this.initInstancedTrains();
    this.buildAllCorridorsAndGares();
    this.updateYear(2026);
  }

  private initMaterials(): void {
    this.limestoneMat = applyPaperModelShaderHook(
      new THREE.MeshStandardMaterial({
        color: 0xf4ead8,
        roughness: 0.72,
        metalness: 0.06
      })
    );

    this.darkIronMat = applyPaperModelShaderHook(
      new THREE.MeshStandardMaterial({
        color: 0x2c353d,
        roughness: 0.48,
        metalness: 0.62
      })
    );

    this.zincRoofMat = applyPaperModelShaderHook(
      new THREE.MeshStandardMaterial({
        color: 0x6f7d88,
        roughness: 0.52,
        metalness: 0.34
      })
    );

    this.shedGlassMat = applyPaperModelShaderHook(
      new THREE.MeshPhysicalMaterial({
        color: 0xc8e2f0,
        roughness: 0.18,
        metalness: 0.15,
        transparent: true,
        opacity: 0.72
      })
    );

    this.goldAccentMat = applyPaperModelShaderHook(
      new THREE.MeshStandardMaterial({
        color: 0xe8c15a,
        emissive: 0x6b4f12,
        emissiveIntensity: 0.35,
        roughness: 0.28,
        metalness: 0.82
      })
    );

    this.brickViaductMat = applyPaperModelShaderHook(
      new THREE.MeshStandardMaterial({
        color: 0xb86b58,
        roughness: 0.78,
        metalness: 0.05
      })
    );

    this.ballastMat = applyPaperModelShaderHook(
      new THREE.MeshStandardMaterial({
        color: 0x7e776c,
        roughness: 0.92,
        metalness: 0.04,
        polygonOffset: true,
        polygonOffsetFactor: -3,
        polygonOffsetUnits: -3
      })
    );

    this.steelRailMat = new THREE.MeshStandardMaterial({
      color: 0xd8cfc0,
      emissive: 0x4a3e28,
      emissiveIntensity: 0.28,
      roughness: 0.32,
      metalness: 0.78,
      polygonOffset: true,
      polygonOffsetFactor: -4,
      polygonOffsetUnits: -4
    });
  }

  private initInstancedTrains(): void {
    const maxTrains = Math.max(1, PARIS_GRANDES_LIGNES.length * 2);
    const maxCars = maxTrains * 5;

    const bodyGeom = new THREE.BoxGeometry(0.16, 0.14, 0.56);
    bodyGeom.translate(0, 0.07, 0);
    const roofGeom = new THREE.BoxGeometry(0.165, 0.04, 0.57);
    roofGeom.translate(0, 0.15, 0);
    const roofTgvGeom = new THREE.BoxGeometry(0.165, 0.04, 0.57);
    roofTgvGeom.translate(0, 0.145, 0);
    const stackGeom = new THREE.CylinderGeometry(0.03, 0.035, 0.1, 8);
    stackGeom.translate(0, 0.17, 0.16);

    const locoMat = new THREE.MeshStandardMaterial({
      color: 0x222629,
      roughness: 0.42,
      metalness: 0.65
    });
    const wagonsLitsMat = new THREE.MeshStandardMaterial({
      color: 0x263b5e,
      emissive: 0x5c4318,
      emissiveIntensity: 0.35,
      roughness: 0.35,
      metalness: 0.3
    });
    const creamRoofMat = new THREE.MeshBasicMaterial({ color: 0xede4d0 });

    const teeBodyMat = new THREE.MeshStandardMaterial({
      color: 0x9e2424,
      emissive: 0x4a1212,
      emissiveIntensity: 0.3,
      roughness: 0.28,
      metalness: 0.45
    });
    const inoxRoofMat = new THREE.MeshBasicMaterial({ color: 0xd8dee3 });

    const tgvLyonMat = new THREE.MeshStandardMaterial({
      color: 0xf26822,
      emissive: 0xf26822,
      emissiveIntensity: 0.42,
      roughness: 0.22,
      metalness: 0.5
    });
    const tgvNordMat = new THREE.MeshStandardMaterial({
      color: 0xf4c430,
      emissive: 0xf4c430,
      emissiveIntensity: 0.42,
      roughness: 0.22,
      metalness: 0.5
    });
    const tgvOtherMat = new THREE.MeshStandardMaterial({
      color: 0x2b68c4,
      emissive: 0x2b68c4,
      emissiveIntensity: 0.42,
      roughness: 0.22,
      metalness: 0.5
    });
    const tgvWhiteMat = new THREE.MeshBasicMaterial({ color: 0xf7f9fc });

    const mkInst = (
      g: THREE.BufferGeometry,
      m: THREE.Material,
      cnt: number
    ): THREE.InstancedMesh => {
      const im = new THREE.InstancedMesh(g, m, cnt);
      im.frustumCulled = false;
      im.count = 0;
      this.trainInstancedGroup.add(im);
      return im;
    };

    this.steamLocoBodyInst = mkInst(bodyGeom, locoMat, maxTrains);
    this.steamLocoStackInst = mkInst(stackGeom, this.goldAccentMat, maxTrains);
    this.steamCoachBodyInst = mkInst(bodyGeom, wagonsLitsMat, maxTrains * 4);
    this.steamCoachRoofInst = mkInst(roofGeom, creamRoofMat, maxTrains * 4);
    this.teeBodyInst = mkInst(bodyGeom, teeBodyMat, maxCars);
    this.teeRoofInst = mkInst(roofGeom, inoxRoofMat, maxCars);
    this.tgvBodyLyonInst = mkInst(bodyGeom, tgvLyonMat, maxCars);
    this.tgvBodyNordInst = mkInst(bodyGeom, tgvNordMat, maxCars);
    this.tgvBodyOtherInst = mkInst(bodyGeom, tgvOtherMat, maxCars);
    this.tgvRoofInst = mkInst(roofTgvGeom, tgvWhiteMat, maxCars);

    this.rootGroup.add(this.trainInstancedGroup);
  }

  private buildAllCorridorsAndGares(): void {
    const monumentMap = new Map<string, ParisMonumentData>();
    for (const m of PARIS_MONUMENTS) {
      monumentMap.set(m.id, m);
    }

    for (const gare of PARIS_GRANDES_LIGNES) {
      const monumentData = gare.monumentId ? monumentMap.get(gare.monumentId) : undefined;
      const colorRevealUniform = { value: 0.0 };
      const buildingGroup = this.buildGareArchitecture(gare, monumentData, colorRevealUniform);
      const corridorGroup = new THREE.Group();
      corridorGroup.name = `Corridor_${gare.id}`;

      this.buildMultiTrackFanAndCorridor(gare, corridorGroup);

      this.rootGroup.add(buildingGroup);
      this.rootGroup.add(corridorGroup);

      this.corridors.push({
        data: gare,
        buildingGroup,
        corridorGroup,
        colorRevealUniform,
        monumentData
      });
    }
  }

  /**
   * Builds the bespoke 3D terminal station architecture (Beaux-Arts limestone headhouse,
   * arched multi-span iron-and-glass train sheds, Gare de Lyon 67m gilded Clock Tower,
   * Gare Saint-Lazare Pont de l'Europe X-bridge, or Gare d'Austerlitz viaduct portal).
   */
  private buildGareArchitecture(
    gare: GrandeGareCorridorData,
    monumentData: ParisMonumentData | undefined,
    colorRevealUniform: { value: number }
  ): THREE.Group {
    const group = new THREE.Group();
    group.name = `GareBuilding_${gare.id}`;

    const terrainY = getParisTerrainElevation(gare.x, gare.z);
    const baseY = (gare.isViaductLine ? 0.34 : 0.02) + terrainY;

    // For Gare Montparnasse, the 3D Tour Montparnasse & Old Gare Montparnasse are already placed
    // by ParisMonumentsBuilder, so we build the modern Atlantic glass train hall deck behind it
    const isMontparnasse = gare.id === 'gl-gare-montparnasse';

    const w = gare.shedWidth;
    const len = gare.shedLength;
    const h = gare.shedHeight;
    const spans = gare.shedSpans;

    // Record oriented exclusion box so flat OSM extrusions don't clip through the 3D train shed
    const cosA = Math.cos(gare.rotationY);
    const sinA = Math.sin(gare.rotationY);
    const localCenterZ = len * 0.45;
    const worldCx = gare.x + sinA * localCenterZ;
    const worldCz = gare.z + cosA * localCenterZ;
    const rad = Math.hypot(w * 0.54, len * 0.56);
    if (worldCx - rad < this.exclMinX) this.exclMinX = worldCx - rad;
    if (worldCx + rad > this.exclMaxX) this.exclMaxX = worldCx + rad;
    if (worldCz - rad < this.exclMinZ) this.exclMinZ = worldCz - rad;
    if (worldCz + rad > this.exclMaxZ) this.exclMaxZ = worldCz + rad;

    this.exclusionBoxes.push({
      cx: worldCx,
      cz: worldCz,
      cosA,
      sinA,
      halfW: w * 0.54,
      halfL: len * 0.56,
      minX: worldCx - rad,
      maxX: worldCx + rad,
      minZ: worldCz - rad,
      maxZ: worldCz + rad
    });

    if (!isMontparnasse) {
      // 1. Monumental Beaux-Arts Limestone Headhouse Facade (Bâtiment Voyageurs) at z = 0..0.46
      const headDepth = 0.46;
      const headHeight = h * 0.94;
      const headGeo = new THREE.BoxGeometry(w * 1.04, headHeight, headDepth);
      const headMesh = new THREE.Mesh(headGeo, this.limestoneMat);
      headMesh.position.set(0, headHeight * 0.5, headDepth * 0.45);
      headMesh.castShadow = true;
      headMesh.receiveShadow = true;
      group.add(headMesh);

      // Mansard Zinc Crest Roof atop the Headhouse
      const mansardGeo = new THREE.CylinderGeometry(w * 0.46, w * 0.52, headHeight * 0.24, 4);
      mansardGeo.rotateY(Math.PI * 0.25);
      mansardGeo.scale(1.0, 1.0, headDepth / (w * 0.72));
      const mansardMesh = new THREE.Mesh(mansardGeo, this.zincRoofMat);
      mansardMesh.position.set(0, headHeight + headHeight * 0.12, headDepth * 0.45);
      group.add(mansardMesh);

      // Corner Pavilions flanking the facade (Hittorff / Duquesney / Laloux / Lisch style)
      const pavW = w * 0.22;
      const pavH = headHeight * 1.18;
      const pavGeo = new THREE.BoxGeometry(pavW, pavH, headDepth * 1.18);
      const pavDomeGeo = new THREE.ConeGeometry(pavW * 0.68, pavH * 0.28, 4);
      pavDomeGeo.rotateY(Math.PI * 0.25);
      for (const side of [-1, 1]) {
        const px = side * (w * 0.44);
        const pav = new THREE.Mesh(pavGeo, this.limestoneMat);
        pav.position.set(px, pavH * 0.5, headDepth * 0.42);
        pav.castShadow = true;
        group.add(pav);

        const dome = new THREE.Mesh(pavDomeGeo, this.zincRoofMat);
        dome.position.set(px, pavH + pavH * 0.14, headDepth * 0.42);
        group.add(dome);
      }

      // Central Arched Glass Rose Window / Triumphal Archway on the main facade
      const roseRadius = Math.min(w * 0.22, headHeight * 0.55);
      const roseGeo = new THREE.CylinderGeometry(roseRadius, roseRadius, headDepth * 1.24, 16, 1, false, 0, Math.PI);
      roseGeo.rotateZ(Math.PI * 0.5);
      roseGeo.rotateY(Math.PI * 0.5);
      const roseMesh = new THREE.Mesh(roseGeo, this.shedGlassMat);
      roseMesh.position.set(0, headHeight * 0.38, headDepth * 0.45);
      group.add(roseMesh);
    }

    // 2. Multi-Span Iron-and-Glass Great Train Sheds (Les Grandes Halles des Trains)
    const shedStartZ = isMontparnasse ? 0.1 : 0.44;
    const shedActualLen = len - shedStartZ;
    const spanW = w / spans;

    // Limestone side arcade walls flanking the train shed
    const wallThick = 0.09;
    const sideWallH = h * 0.64;
    const sideWallGeo = new THREE.BoxGeometry(wallThick, sideWallH, shedActualLen);
    for (const side of [-1, 1]) {
      const sw = new THREE.Mesh(sideWallGeo, this.limestoneMat);
      sw.position.set(side * (w * 0.5 - wallThick * 0.5), sideWallH * 0.5, shedStartZ + shedActualLen * 0.5);
      sw.castShadow = true;
      sw.receiveShadow = true;
      group.add(sw);
    }

    // Build each arched iron-and-glass span + interior passenger platforms
    for (let s = 0; s < spans; s++) {
      const spanCx = -w * 0.5 + spanW * (s + 0.5);
      const vaultRadius = spanW * 0.5;
      const vaultH = h * 0.38;

      // Arched glass-and-zinc barrel/Polonceau roof
      const vaultGeo = new THREE.CylinderGeometry(
        vaultRadius,
        vaultRadius,
        shedActualLen,
        14,
        1,
        false,
        0,
        Math.PI
      );
      vaultGeo.rotateZ(Math.PI * 0.5);
      vaultGeo.rotateY(Math.PI * 0.5);
      vaultGeo.scale(1.0, vaultH / Math.max(0.1, vaultRadius), 1.0);
      const vaultMesh = new THREE.Mesh(vaultGeo, this.shedGlassMat);
      vaultMesh.position.set(spanCx, sideWallH, shedStartZ + shedActualLen * 0.5);
      vaultMesh.castShadow = true;
      vaultMesh.receiveShadow = true;
      group.add(vaultMesh);

      // Raised zinc skylight lantern ridge along the crown of each span
      const lanternGeo = new THREE.BoxGeometry(spanW * 0.24, 0.08, shedActualLen * 0.94);
      const lanternMesh = new THREE.Mesh(lanternGeo, this.zincRoofMat);
      lanternMesh.position.set(spanCx, sideWallH + vaultH + 0.02, shedStartZ + shedActualLen * 0.5);
      group.add(lanternMesh);

      // Exterior Polonceau iron arch ribs along the length of the shed
      const ribCount = 6;
      const ribGeo = new THREE.BoxGeometry(spanW * 0.98, 0.05, 0.05);
      for (let r = 0; r <= ribCount; r++) {
        const rz = shedStartZ + (shedActualLen * r) / ribCount;
        const rib = new THREE.Mesh(ribGeo, this.darkIronMat);
        rib.position.set(spanCx, sideWallH + vaultH * 0.55, rz);
        group.add(rib);
      }
    }

    // 3. Signature Architectural Features
    // 3a. Gare de Lyon's Iconic 67-meter Gilded Clock Tower (La Tour de l'Horloge, 1900)
    if (gare.hasClockTower) {
      const towerH = 2.38;
      const towerW = 0.36;
      const tx = -w * 0.56;
      const tz = 0.28;

      const shaftGeo = new THREE.BoxGeometry(towerW, towerH, towerW);
      const shaftMesh = new THREE.Mesh(shaftGeo, this.limestoneMat);
      shaftMesh.position.set(tx, towerH * 0.5, tz);
      shaftMesh.castShadow = true;
      group.add(shaftMesh);

      // 4 Gilded Clock Dials near the top of the tower
      const dialGeo = new THREE.BoxGeometry(towerW * 1.08, towerW * 0.65, towerW * 1.08);
      const dialMesh = new THREE.Mesh(dialGeo, this.goldAccentMat);
      dialMesh.position.set(tx, towerH * 0.82, tz);
      group.add(dialMesh);

      // Zinc Cupola & Gilded Spire Finial
      const cupolaGeo = new THREE.ConeGeometry(towerW * 0.72, 0.48, 4);
      cupolaGeo.rotateY(Math.PI * 0.25);
      const cupolaMesh = new THREE.Mesh(cupolaGeo, this.zincRoofMat);
      cupolaMesh.position.set(tx, towerH + 0.24, tz);
      group.add(cupolaMesh);

      const spireGeo = new THREE.CylinderGeometry(0.015, 0.04, 0.42, 8);
      const spireMesh = new THREE.Mesh(spireGeo, this.goldAccentMat);
      spireMesh.position.set(tx, towerH + 0.62, tz);
      group.add(spireMesh);
    }

    // 3b. Gare d'Austerlitz's Elevated Viaduct Portal Framing for Metro Line 5
    if (gare.hasViaductPortal) {
      const portalGeo = new THREE.BoxGeometry(w * 1.12, 0.12, 0.28);
      const portalMesh = new THREE.Mesh(portalGeo, this.darkIronMat);
      portalMesh.position.set(0, h * 0.62, len * 0.42);
      group.add(portalMesh);
    }

    // 4. Tag meshes, bind per-Gare colorRevealUniform, and add a tight OBB hit proxy if this Gare is a selectable Monument
    if (monumentData) {
      const matCache = new Map<THREE.Material, THREE.Material>();
      group.traverse((child) => {
        if ((child as THREE.Mesh).isMesh && !child.userData?.isHitProxy) {
          const mesh = child as THREE.Mesh;
          mesh.userData = {
            ...mesh.userData,
            type: 'monument',
            monument: monumentData,
            isDirectMonumentMesh: true
          };
          if (mesh.material && !Array.isArray(mesh.material)) {
            let cloned = matCache.get(mesh.material);
            if (!cloned) {
              cloned = applyPaperModelShaderHook(mesh.material.clone(), colorRevealUniform);
              matCache.set(mesh.material, cloned);
            }
            mesh.material = cloned;
          }
        }
      });
    }

    // Merge all gare child meshes by material (collapsing ~30 meshes -> 4-5 meshes)
    mergeGroupMeshesByMaterial(group, true);

    group.position.set(gare.x, baseY, gare.z);
    group.rotation.set(0, gare.rotationY, 0);
    group.updateMatrixWorld(true);

    if (monumentData) {
      const proxyGeo = new THREE.BoxGeometry(w * 1.08, h * 1.35, len * 1.05);
      const proxyMesh = new THREE.Mesh(proxyGeo, this.hitProxyMat);
      proxyMesh.position.set(0, h * 0.65, len * 0.5);
      proxyMesh.userData = {
        type: 'monument',
        monument: monumentData,
        isDirectMonumentMesh: false,
        isHitProxy: true
      };

      const proxyGroup = new THREE.Group();
      proxyGroup.position.copy(group.position);
      proxyGroup.rotation.copy(group.rotation);
      proxyGroup.add(proxyMesh);
      proxyGroup.updateMatrixWorld(true);
      this.hitProxyRoot.add(proxyGroup);

      const worldBox = new THREE.Box3()
        .setFromObject(group)
        .expandByObject(proxyGroup)
        .expandByScalar(0.15);

      this.raycastEntries.push({
        buildingGroup: group,
        proxyGroup,
        worldBox,
        monumentId: monumentData.id
      });
    }

    return group;
  }

  /**
   * Builds the multi-track surface rail fan (faisceau de voies) radiating out of the train shed,
   * recessed stone ballast bed, overhead catenary gantries, and articulated era-evolving express trains.
   */
  private buildMultiTrackFanAndCorridor(
    gare: GrandeGareCorridorData,
    corridorGroup: THREE.Group
  ): void {
    const pts = gare.corridorPoints;
    if (pts.length < 2) return;

    const elevOffset = gare.isViaductLine ? 0.32 : 0.032;
    const spineVectors = pts.map((p, idx) => {
      const ty = getParisTerrainElevation(p.x, p.z);
      // Shift first point slightly inside the back of the train shed so tracks emerge from beneath the glass roof
      if (idx === 0) {
        const cosA = Math.cos(gare.rotationY);
        const sinA = Math.sin(gare.rotationY);
        const startOffset = gare.shedLength * 0.35;
        const sx = p.x + sinA * startOffset;
        const sz = p.z + cosA * startOffset;
        return new THREE.Vector3(sx, getParisTerrainElevation(sx, sz) + elevOffset, sz);
      }
      return new THREE.Vector3(p.x, ty + elevOffset, p.z);
    });

    const spineCurve = new THREE.CatmullRomCurve3(spineVectors, false, 'catmullrom', 0.35);
    const sampleCount = 72;
    const spacedPoints = spineCurve.getSpacedPoints(sampleCount);

    // Record throat exclusion segments along the first 40% of the corridor so OSM buildings don't block the rail fan
    const throatEndIdx = Math.min(spacedPoints.length - 1, Math.floor(sampleCount * 0.42));
    for (let i = 0; i < throatEndIdx; i += 2) {
      const p0 = spacedPoints[i];
      const p1 = spacedPoints[Math.min(throatEndIdx, i + 2)];
      const u = i / sampleCount;
      const fanFactor = Math.pow(Math.max(0, 1.0 - u * 2.2), 1.6);
      const halfW = (0.38 + (gare.shedWidth * 0.46 - 0.38) * fanFactor) + 0.12;
      const sx = p1.x - p0.x;
      const sz = p1.z - p0.z;
      const lenSq = sx * sx + sz * sz;
      const minX = Math.min(p0.x, p1.x) - halfW;
      const maxX = Math.max(p0.x, p1.x) + halfW;
      const minZ = Math.min(p0.z, p1.z) - halfW;
      const maxZ = Math.max(p0.z, p1.z) + halfW;
      if (minX < this.exclMinX) this.exclMinX = minX;
      if (maxX > this.exclMaxX) this.exclMaxX = maxX;
      if (minZ < this.exclMinZ) this.exclMinZ = minZ;
      if (maxZ > this.exclMaxZ) this.exclMaxZ = maxZ;
      this.exclusionSegments.push({
        ax: p0.x,
        az: p0.z,
        bx: p1.x,
        bz: p1.z,
        sx,
        sz,
        invLenSq: lenSq >= 1e-5 ? 1.0 / lenSq : 0,
        halfWidthSq: halfW * halfW,
        minX,
        maxX,
        minZ,
        maxZ
      });
    }

    // 1. Stone Ballast Roadbed Ribbon (wide at the station throat, narrowing into the mainline right-of-way)
    const ballastWidths: number[] = [];
    for (let i = 0; i <= sampleCount; i++) {
      const u = i / sampleCount;
      const fanFactor = Math.pow(Math.max(0, 1.0 - u * 2.4), 1.65);
      const w = 0.56 + (gare.shedWidth * 0.88 - 0.56) * fanFactor;
      ballastWidths.push(w);
    }
    const ballastGeo = this.createRibbonGeometry(spineCurve, ballastWidths, 0.025, sampleCount);
    const ballastMesh = new THREE.Mesh(ballastGeo, gare.isViaductLine ? this.brickViaductMat : this.ballastMat);
    ballastMesh.receiveShadow = true;
    corridorGroup.add(ballastMesh);

    // Optional brick viaduct arches for the 1859–1969 Bastille–Vincennes viaduct line
    if (gare.isViaductLine) {
      const pierGeo = new THREE.BoxGeometry(0.48, 0.34, 0.22);
      for (let i = 2; i < sampleCount - 2; i += 3) {
        const u = i / sampleCount;
        const pt = spineCurve.getPoint(u);
        const tan = spineCurve.getTangent(u);
        const pier = new THREE.Mesh(pierGeo, this.brickViaductMat);
        pier.position.set(pt.x, pt.y - 0.17, pt.z);
        pier.rotation.y = Math.atan2(tan.x, tan.z);
        corridorGroup.add(pier);
      }
    }

    // 2. Multi-Track Steel Fan Ribbons (6 to 8 individual tracks fanning from platform bays into the mainline!)
    const trackCount = gare.trackCount;
    const accentColor = new THREE.Color(gare.colorHex);
    const trackMat = this.steelRailMat.clone();
    trackMat.color.lerp(accentColor, 0.38);
    trackMat.emissive.copy(accentColor).multiplyScalar(0.32);

    for (let t = 0; t < trackCount; t++) {
      const normT = trackCount > 1 ? (t / (trackCount - 1)) * 2.0 - 1.0 : 0.0;
      const throatSpread = normT * (gare.shedWidth * 0.41);
      // Outer fan tracks merge into the 4 central mainline tracks after leaving the throat yard
      const mainlineLane = ((t % 4) / 3.0) * 2.0 - 1.0;
      const mainlineSpread = mainlineLane * 0.21;

      const trackPts: THREE.Vector3[] = [];
      for (let i = 0; i <= sampleCount; i++) {
        const u = i / sampleCount;
        const p = spineCurve.getPoint(u);
        const tan = spineCurve.getTangent(u);
        const nx = -tan.z;
        const nz = tan.x;
        const nLen = Math.hypot(nx, nz) || 1;

        const fanBlend = Math.pow(Math.max(0, 1.0 - u * 2.3), 1.7);
        const latOffset = mainlineSpread + (throatSpread - mainlineSpread) * fanBlend;

        trackPts.push(
          new THREE.Vector3(
            p.x + (nx / nLen) * latOffset,
            p.y + 0.018,
            p.z + (nz / nLen) * latOffset
          )
        );
      }

      const trackCurve = new THREE.CatmullRomCurve3(trackPts, false, 'catmullrom', 0.25);
      const trackWidths = new Array<number>(49).fill(0.038);
      const trackGeo = this.createRibbonGeometry(trackCurve, trackWidths, 0.012, 48);
      const trackMesh = new THREE.Mesh(trackGeo, trackMat);
      corridorGroup.add(trackMesh);
    }

    // 3. Overhead Iron Catenary Gantry Portals spanning the rail fan throat
    const gantryPostGeo = new THREE.BoxGeometry(0.04, 0.34, 0.04);
    for (let i = 3; i <= 24; i += 5) {
      const u = i / sampleCount;
      const p = spineCurve.getPoint(u);
      const tan = spineCurve.getTangent(u);
      const angle = Math.atan2(tan.x, tan.z);
      const spanW = ballastWidths[i] * 0.94;

      const gantryGroup = new THREE.Group();
      gantryGroup.position.set(p.x, p.y, p.z);
      gantryGroup.rotation.y = angle;

      const beamGeo = new THREE.BoxGeometry(spanW, 0.035, 0.035);
      const beam = new THREE.Mesh(beamGeo, this.darkIronMat);
      beam.position.y = 0.33;
      gantryGroup.add(beam);

      for (const side of [-1, 1]) {
        const post = new THREE.Mesh(gantryPostGeo, this.darkIronMat);
        post.position.set(side * spanW * 0.5, 0.17, 0);
        gantryGroup.add(post);
      }
      corridorGroup.add(gantryGroup);
    }

    // Merge all static corridor meshes by material (collapsing ~30 meshes -> 3 meshes)
    mergeGroupMeshesByMaterial(corridorGroup, false);

    // 4. Pre-sample spline into FastCurveLUT and register 2 Articulated Express Trains (Outbound & Inbound)
    const fastLut = new FastCurveLUT(spineCurve, 256, false);
    const tgvType: 0 | 1 | 2 =
      gare.id === 'gl-gare-de-lyon'
        ? 1
        : gare.id === 'gl-gare-du-nord'
          ? 2
          : 0;

    for (const dir of [1, -1] as const) {
      const laneOffset = dir === 1 ? -0.11 : 0.11;
      this.trains.push({
        corridor: gare,
        corridorGroup,
        lut: fastLut,
        trackLateralOffset: laneOffset,
        direction: dir,
        phase: dir === 1 ? 0.12 : 0.62,
        speed: 0.042,
        tgvType
      });
    }
  }

  /**
   * Returns true if world coordinate (x, z) overlaps a 3D Grande Gare train shed or its immediate track throat fan
   * so OSM building/tree placement keeps the terminal sheds and rail throats clear.
   */
  public isOverlappingGareOrThroat(x: number, z: number): boolean {
    if (
      x < this.exclMinX ||
      x > this.exclMaxX ||
      z < this.exclMinZ ||
      z > this.exclMaxZ
    ) {
      return false;
    }

    for (let i = 0, len = this.exclusionBoxes.length; i < len; i++) {
      const b = this.exclusionBoxes[i];
      if (x < b.minX || x > b.maxX || z < b.minZ || z > b.maxZ) continue;
      const dx = x - b.cx;
      const dz = z - b.cz;
      const lx = dx * b.cosA - dz * b.sinA;
      const lz = dx * b.sinA + dz * b.cosA;
      if (Math.abs(lx) < b.halfW && Math.abs(lz) < b.halfL) {
        return true;
      }
    }

    for (let i = 0, len = this.exclusionSegments.length; i < len; i++) {
      const s = this.exclusionSegments[i];
      if (x < s.minX || x > s.maxX || z < s.minZ || z > s.maxZ || s.invLenSq === 0) {
        continue;
      }
      let t = ((x - s.ax) * s.sx + (z - s.az) * s.sz) * s.invLenSq;
      if (t < 0) t = 0;
      else if (t > 1) t = 1;
      const dx = x - (s.ax + t * s.sx);
      const dz = z - (s.az + t * s.sz);
      if (dx * dx + dz * dz < s.halfWidthSq) {
        return true;
      }
    }
    return false;
  }

  public getRaycastTargets(ray?: THREE.Ray): THREE.Object3D[] {
    const out: THREE.Object3D[] = [];
    for (const entry of this.raycastEntries) {
      if (!entry.buildingGroup.visible) continue;
      if (ray && !ray.intersectsBox(entry.worldBox)) continue;
      out.push(entry.buildingGroup, entry.proxyGroup);
    }
    return out;
  }

  public getOutlinedWorldBox(): THREE.Box3 | null {
    if (!this.outlinedMonumentId) return null;
    for (const entry of this.raycastEntries) {
      if (entry.monumentId === this.outlinedMonumentId && entry.buildingGroup.visible) {
        return entry.worldBox;
      }
    }
    return null;
  }

  public setOutlinedMonument(monumentId: string | null): void {
    if (this.outlinedMonumentId === monumentId) return;
    this.outlinedMonumentId = monumentId;
    this.syncOutlineLayer();
  }

  public setSelectedMonument(monumentId: string | null): void {
    if (this.selectedMonumentId === monumentId) return;
    this.selectedMonumentId = monumentId;
    this.syncOutlineLayer();
  }

  public hasOutlinedMonument(): boolean {
    return this.outlinedMonumentId !== null;
  }

  private syncOutlineLayer(): void {
    for (const c of this.corridors) {
      if (!c.monumentData) continue;
      const shouldOutline =
        this.outlinedMonumentId !== null &&
        c.monumentData.id === this.outlinedMonumentId &&
        c.buildingGroup.visible;
      const shouldRevealColor =
        ((this.outlinedMonumentId !== null && c.monumentData.id === this.outlinedMonumentId) ||
          (this.selectedMonumentId !== null && c.monumentData.id === this.selectedMonumentId)) &&
        c.buildingGroup.visible;
      c.colorRevealUniform.value = shouldRevealColor ? 1.0 : 0.0;
      c.buildingGroup.traverse((child) => {
        if ((child as THREE.Mesh).isMesh && !child.userData?.isHitProxy) {
          if (shouldOutline) {
            child.layers.enable(MONUMENT_OUTLINE_LAYER);
          } else {
            child.layers.disable(MONUMENT_OUTLINE_LAYER);
          }
        }
      });
    }
  }

  public setVisibleEnabled(enabled: boolean): void {
    this.visibleEnabled = enabled;
    this.updateYear(this.currentYear);
  }

  public isVisibleEnabled(): boolean {
    return this.visibleEnabled;
  }

  public updateYear(year: number): void {
    this.currentYear = year;
    const isSteamEra = year <= 1955;
    const isTeeEra = year > 1955 && year < 1981;
    const isTgvEra = year >= 1981;

    for (const c of this.corridors) {
      const bVis =
        this.visibleEnabled &&
        year >= c.data.openedYear &&
        year <= c.data.buildingEndYear;
      const trainVis =
        this.visibleEnabled &&
        year >= c.data.trainStartYear &&
        year <= c.data.trainEndYear;

      c.buildingGroup.visible = bVis;
      c.corridorGroup.visible = trainVis;
    }

    const spd = isTgvEra ? 0.068 : isTeeEra ? 0.052 : 0.038;
    for (const tr of this.trains) {
      tr.speed = spd;
    }

    this.steamLocoBodyInst.visible = this.visibleEnabled && isSteamEra;
    this.steamLocoStackInst.visible = this.visibleEnabled && isSteamEra;
    this.steamCoachBodyInst.visible = this.visibleEnabled && isSteamEra;
    this.steamCoachRoofInst.visible = this.visibleEnabled && isSteamEra;
    this.teeBodyInst.visible = this.visibleEnabled && isTeeEra;
    this.teeRoofInst.visible = this.visibleEnabled && isTeeEra;
    this.tgvBodyLyonInst.visible = this.visibleEnabled && isTgvEra;
    this.tgvBodyNordInst.visible = this.visibleEnabled && isTgvEra;
    this.tgvBodyOtherInst.visible = this.visibleEnabled && isTgvEra;
    this.tgvRoofInst.visible = this.visibleEnabled && isTgvEra;

    this.syncOutlineLayer();
  }

  public updateAnimation(elapsedTime: number): void {
    if (!this.visibleEnabled) return;

    const era = this.currentYear <= 1955 ? 0 : this.currentYear < 1981 ? 1 : 2;
    const pt = new THREE.Vector3();
    const tan = new THREE.Vector3();

    const writeMat = (
      arr: THREE.TypedArray,
      idx: number,
      px: number,
      py: number,
      pz: number,
      cosY: number,
      sinY: number
    ): void => {
      const b = idx * 16;
      arr[b] = cosY;
      arr[b + 1] = 0;
      arr[b + 2] = -sinY;
      arr[b + 3] = 0;
      arr[b + 4] = 0;
      arr[b + 5] = 1;
      arr[b + 6] = 0;
      arr[b + 7] = 0;
      arr[b + 8] = sinY;
      arr[b + 9] = 0;
      arr[b + 10] = cosY;
      arr[b + 11] = 0;
      arr[b + 12] = px;
      arr[b + 13] = py;
      arr[b + 14] = pz;
      arr[b + 15] = 1;
    };

    let locoCnt = 0;
    let coachCnt = 0;
    let teeCnt = 0;
    let lyonCnt = 0;
    let nordCnt = 0;
    let otherCnt = 0;
    let tgvRoofCnt = 0;

    const carSpacingU = 0.018;
    for (let ti = 0, tLen = this.trains.length; ti < tLen; ti++) {
      const tr = this.trains[ti];
      if (!tr.corridorGroup.visible) continue;

      const rawU = (tr.phase + elapsedTime * tr.speed) % 1.0;
      const headU = tr.direction === 1 ? rawU : 1.0 - rawU;

      for (let c = 0; c < 5; c++) {
        const carU =
          tr.direction === 1
            ? headU - c * carSpacingU
            : headU + c * carSpacingU;
        if (carU < 0.01 || carU > 0.98) continue;

        tr.lut.samplePointAndTangent(carU, pt, tan);
        const nx = -tan.z;
        const nz = tan.x;
        const nLen = Math.hypot(nx, nz) || 1;

        const px = pt.x + (nx / nLen) * tr.trackLateralOffset;
        const py = pt.y + 0.02;
        const pz = pt.z + (nz / nLen) * tr.trackLateralOffset;

        const ux = tan.x * tr.direction;
        const uz = tan.z * tr.direction;
        const uLen = Math.hypot(ux, uz) || 1;
        const sinY = ux / uLen;
        const cosY = uz / uLen;

        if (era === 0) {
          if (c === 0) {
            writeMat(this.steamLocoBodyInst.instanceMatrix.array, locoCnt, px, py, pz, cosY, sinY);
            writeMat(this.steamLocoStackInst.instanceMatrix.array, locoCnt, px, py, pz, cosY, sinY);
            locoCnt++;
          } else {
            writeMat(this.steamCoachBodyInst.instanceMatrix.array, coachCnt, px, py, pz, cosY, sinY);
            writeMat(this.steamCoachRoofInst.instanceMatrix.array, coachCnt, px, py, pz, cosY, sinY);
            coachCnt++;
          }
        } else if (era === 1) {
          writeMat(this.teeBodyInst.instanceMatrix.array, teeCnt, px, py, pz, cosY, sinY);
          writeMat(this.teeRoofInst.instanceMatrix.array, teeCnt, px, py, pz, cosY, sinY);
          teeCnt++;
        } else {
          writeMat(this.tgvRoofInst.instanceMatrix.array, tgvRoofCnt++, px, py, pz, cosY, sinY);
          if (tr.tgvType === 1) {
            writeMat(this.tgvBodyLyonInst.instanceMatrix.array, lyonCnt++, px, py, pz, cosY, sinY);
          } else if (tr.tgvType === 2) {
            writeMat(this.tgvBodyNordInst.instanceMatrix.array, nordCnt++, px, py, pz, cosY, sinY);
          } else {
            writeMat(this.tgvBodyOtherInst.instanceMatrix.array, otherCnt++, px, py, pz, cosY, sinY);
          }
        }
      }
    }

    if (era === 0) {
      this.steamLocoBodyInst.count = locoCnt;
      this.steamLocoStackInst.count = locoCnt;
      this.steamCoachBodyInst.count = coachCnt;
      this.steamCoachRoofInst.count = coachCnt;
      this.steamLocoBodyInst.instanceMatrix.needsUpdate = true;
      this.steamLocoStackInst.instanceMatrix.needsUpdate = true;
      this.steamCoachBodyInst.instanceMatrix.needsUpdate = true;
      this.steamCoachRoofInst.instanceMatrix.needsUpdate = true;
    } else if (era === 1) {
      this.teeBodyInst.count = teeCnt;
      this.teeRoofInst.count = teeCnt;
      this.teeBodyInst.instanceMatrix.needsUpdate = true;
      this.teeRoofInst.instanceMatrix.needsUpdate = true;
    } else {
      this.tgvRoofInst.count = tgvRoofCnt;
      this.tgvBodyLyonInst.count = lyonCnt;
      this.tgvBodyNordInst.count = nordCnt;
      this.tgvBodyOtherInst.count = otherCnt;
      this.tgvRoofInst.instanceMatrix.needsUpdate = true;
      if (lyonCnt > 0) this.tgvBodyLyonInst.instanceMatrix.needsUpdate = true;
      if (nordCnt > 0) this.tgvBodyNordInst.instanceMatrix.needsUpdate = true;
      if (otherCnt > 0) this.tgvBodyOtherInst.instanceMatrix.needsUpdate = true;
    }
  }

  private createRibbonGeometry(
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
      uvs.push(0, u * 20, 1, u * 20, 0, u * 20, 0, u * 20);

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
}
