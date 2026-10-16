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

interface ExpressTrainFormation {
  corridor: GrandeGareCorridorData;
  curve: THREE.CatmullRomCurve3;
  trackLateralOffset: number;
  direction: 1 | -1;
  phase: number;
  speed: number;
  steamCars: THREE.Object3D[];
  teeCars: THREE.Object3D[];
  tgvCars: THREE.Object3D[];
  group: THREE.Group;
}

interface CorridorRuntime {
  data: GrandeGareCorridorData;
  buildingGroup: THREE.Group;
  corridorGroup: THREE.Group;
  colorRevealUniform: { value: number };
  monumentData?: ParisMonumentData;
}

export class GrandesLignesBuilder {
  public readonly rootGroup = new THREE.Group();
  public readonly raycastRoots: THREE.Object3D[] = [];

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

  private currentYear = 2026;
  private outlinedMonumentId: string | null = null;
  private selectedMonumentId: string | null = null;
  private visibleEnabled = true;

  // Precomputed track corridor segments for fast OSM building/tree exclusion
  private readonly exclusionBoxes: {
    cx: number;
    cz: number;
    cosA: number;
    sinA: number;
    halfW: number;
    halfL: number;
  }[] = [];
  private readonly exclusionSegments: {
    ax: number;
    az: number;
    bx: number;
    bz: number;
    halfWidth: number;
  }[] = [];

  constructor() {
    this.rootGroup.name = 'ParisGrandesLignesAndGares';
    this.initMaterials();
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
    this.exclusionBoxes.push({
      cx: worldCx,
      cz: worldCz,
      cosA,
      sinA,
      halfW: w * 0.54,
      halfL: len * 0.56
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

      const proxyGeo = new THREE.BoxGeometry(w * 1.08, h * 1.35, len * 1.05);
      const proxyMesh = new THREE.Mesh(proxyGeo, this.hitProxyMat);
      proxyMesh.position.set(0, h * 0.65, len * 0.5);
      proxyMesh.userData = {
        type: 'monument',
        monument: monumentData,
        isDirectMonumentMesh: false,
        isHitProxy: true
      };
      group.add(proxyMesh);
      this.raycastRoots.push(group);
    }

    group.position.set(gare.x, baseY, gare.z);
    group.rotation.set(0, gare.rotationY, 0);
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
      this.exclusionSegments.push({
        ax: p0.x,
        az: p0.z,
        bx: p1.x,
        bz: p1.z,
        halfWidth: halfW
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

    // 4. Spawn 2 Articulated Era-Evolving Express Trains (Outbound & Inbound) on this Corridor
    for (const dir of [1, -1] as const) {
      const laneOffset = dir === 1 ? -0.11 : 0.11;
      const train = this.createArticulatedExpressTrain(
        gare,
        spineCurve,
        laneOffset,
        dir,
        dir === 1 ? 0.12 : 0.62
      );
      corridorGroup.add(train.group);
      this.trains.push(train);
    }
  }

  /**
   * Creates a multi-car articulated express train with 3 timeline-reactive rolling stock eras:
   * - 1900–1955: Belle Époque Steam Locomotive + Wagons-Lits / PLM Express Teak Coaches
   * - 1956–1980: SNCF Trans Europ Express (TEE) / Corail Crimson-and-Silver Consist
   * - 1981–2026: High-Speed Aerodynamic TGV / Eurostar Consist
   */
  private createArticulatedExpressTrain(
    gare: GrandeGareCorridorData,
    curve: THREE.CatmullRomCurve3,
    trackLateralOffset: number,
    direction: 1 | -1,
    initialPhase: number
  ): ExpressTrainFormation {
    const group = new THREE.Group();
    const carCount = 5;

    const steamCars: THREE.Object3D[] = [];
    const teeCars: THREE.Object3D[] = [];
    const tgvCars: THREE.Object3D[] = [];

    // Era 1 (1900–1955): Steam Locomotive + Wagons-Lits Express Coaches
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

    // Era 2 (1956–1980): TEE Crimson & Inox Silver
    const teeBodyMat = new THREE.MeshStandardMaterial({
      color: 0x9e2424,
      emissive: 0x4a1212,
      emissiveIntensity: 0.3,
      roughness: 0.28,
      metalness: 0.45
    });
    const inoxRoofMat = new THREE.MeshBasicMaterial({ color: 0xd8dee3 });

    // Era 3 (1981–2026): High-Speed TGV Livery (Orange TGV Sud-Est on Lyon, Eurostar Gold/White on Nord, TGV Blue/Silver elsewhere)
    const isLyon = gare.id === 'gl-gare-de-lyon';
    const isNord = gare.id === 'gl-gare-du-nord';
    const tgvPrimaryHex = isLyon ? 0xf26822 : isNord ? 0xf4c430 : 0x2b68c4;
    const tgvBodyMat = new THREE.MeshStandardMaterial({
      color: tgvPrimaryHex,
      emissive: tgvPrimaryHex,
      emissiveIntensity: 0.42,
      roughness: 0.22,
      metalness: 0.5
    });
    const tgvWhiteMat = new THREE.MeshBasicMaterial({ color: 0xf7f9fc });

    const carGeo = new THREE.BoxGeometry(0.16, 0.14, 0.56);
    const roofGeo = new THREE.BoxGeometry(0.165, 0.04, 0.57);

    for (let c = 0; c < carCount; c++) {
      // 1. Steam Era Car
      const steamCar = new THREE.Group();
      const isLocomotive = c === 0;
      const sBody = new THREE.Mesh(carGeo, isLocomotive ? locoMat : wagonsLitsMat);
      sBody.position.y = 0.07;
      steamCar.add(sBody);
      if (isLocomotive) {
        const stack = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.035, 0.1, 8), this.goldAccentMat);
        stack.position.set(0, 0.17, 0.16);
        steamCar.add(stack);
      } else {
        const sRoof = new THREE.Mesh(roofGeo, creamRoofMat);
        sRoof.position.y = 0.15;
        steamCar.add(sRoof);
      }
      group.add(steamCar);
      steamCars.push(steamCar);

      // 2. TEE / Corail Era Car
      const teeCar = new THREE.Group();
      const tBody = new THREE.Mesh(carGeo, teeBodyMat);
      tBody.position.y = 0.07;
      const tRoof = new THREE.Mesh(roofGeo, inoxRoofMat);
      tRoof.position.y = 0.15;
      teeCar.add(tBody, tRoof);
      group.add(teeCar);
      teeCars.push(teeCar);

      // 3. TGV High-Speed Era Car
      const tgvCar = new THREE.Group();
      const gBody = new THREE.Mesh(carGeo, tgvBodyMat);
      gBody.position.y = 0.07;
      const gStripe = new THREE.Mesh(roofGeo, tgvWhiteMat);
      gStripe.position.y = 0.145;
      tgvCar.add(gBody, gStripe);
      group.add(tgvCar);
      tgvCars.push(tgvCar);
    }

    return {
      corridor: gare,
      curve,
      trackLateralOffset,
      direction,
      phase: initialPhase,
      speed: 0.042,
      steamCars,
      teeCars,
      tgvCars,
      group
    };
  }

  /**
   * Returns true if world coordinate (x, z) overlaps a 3D Grande Gare train shed or its immediate track throat fan
   * so OSM building/tree placement keeps the terminal sheds and rail throats clear.
   */
  public isOverlappingGareOrThroat(x: number, z: number): boolean {
    for (let i = 0; i < this.exclusionBoxes.length; i++) {
      const b = this.exclusionBoxes[i];
      const dx = x - b.cx;
      const dz = z - b.cz;
      const lx = dx * b.cosA - dz * b.sinA;
      const lz = dx * b.sinA + dz * b.cosA;
      if (Math.abs(lx) < b.halfW && Math.abs(lz) < b.halfL) {
        return true;
      }
    }

    for (let i = 0; i < this.exclusionSegments.length; i++) {
      const s = this.exclusionSegments[i];
      const abx = s.bx - s.ax;
      const abz = s.bz - s.az;
      const lenSq = abx * abx + abz * abz;
      if (lenSq < 1e-5) continue;
      const t = Math.max(0, Math.min(1, ((x - s.ax) * abx + (z - s.az) * abz) / lenSq));
      const cx = s.ax + t * abx;
      const cz = s.az + t * abz;
      const dSq = (x - cx) * (x - cx) + (z - cz) * (z - cz);
      if (dSq < s.halfWidth * s.halfWidth) {
        return true;
      }
    }
    return false;
  }

  public getRaycastTargets(): THREE.Object3D[] {
    return this.raycastRoots.filter((r) => r.visible);
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

    for (const tr of this.trains) {
      // Speed up express trains in the TGV era!
      tr.speed = isTgvEra ? 0.068 : isTeeEra ? 0.052 : 0.038;
      for (let i = 0; i < tr.steamCars.length; i++) {
        tr.steamCars[i].visible = isSteamEra;
        tr.teeCars[i].visible = isTeeEra;
        tr.tgvCars[i].visible = isTgvEra;
      }
    }

    this.syncOutlineLayer();
  }

  public updateAnimation(elapsedTime: number): void {
    if (!this.visibleEnabled) return;

    for (const tr of this.trains) {
      if (!tr.group.parent?.visible) continue;

      const rawU = (tr.phase + elapsedTime * tr.speed) % 1.0;
      const headU = tr.direction === 1 ? rawU : 1.0 - rawU;

      const carSpacingU = 0.018;
      const activeCars =
        this.currentYear <= 1955
          ? tr.steamCars
          : this.currentYear < 1981
            ? tr.teeCars
            : tr.tgvCars;

      for (let c = 0; c < activeCars.length; c++) {
        const carObj = activeCars[c];
        const carU =
          tr.direction === 1
            ? headU - c * carSpacingU
            : headU + c * carSpacingU;

        if (carU < 0.01 || carU > 0.98) {
          carObj.visible = false;
          continue;
        }
        carObj.visible = true;

        const pt = tr.curve.getPoint(carU);
        const tan = tr.curve.getTangent(carU);
        const nx = -tan.z;
        const nz = tan.x;
        const nLen = Math.hypot(nx, nz) || 1;

        carObj.position.set(
          pt.x + (nx / nLen) * tr.trackLateralOffset,
          pt.y + 0.02,
          pt.z + (nz / nLen) * tr.trackLateralOffset
        );
        const heading = Math.atan2(tan.x * tr.direction, tan.z * tr.direction);
        carObj.rotation.set(0, heading, 0);
      }
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
