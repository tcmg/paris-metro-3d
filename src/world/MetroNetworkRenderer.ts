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
  data: MetroStationData;
  group: THREE.Group;
  subNodeMesh: THREE.Mesh;
  surfaceRingMesh: THREE.Mesh;
  shaftMesh: THREE.Mesh;
  lightColumnMesh: THREE.Mesh;
  lightColumnMat: THREE.MeshBasicMaterial;
  ghostHaloMesh?: THREE.Mesh;
  hitMesh: THREE.Mesh;
  baseY: number;
  surfaceElev: number;
  minDepth: number;
  primaryColor: THREE.Color;
}

export class MetroNetworkRenderer {
  public static readonly MAX_LIFT_OFFSET_Y = 16.5;

  public readonly rootGroup = new THREE.Group();
  public readonly liftedGroup = new THREE.Group();
  public readonly surfaceGroup = new THREE.Group();
  public readonly lightColumnsGroup = new THREE.Group();
  public readonly stationRuntimes: StationRuntime[] = [];
  public readonly hitMeshes: THREE.Mesh[] = [];

  private segments: SegmentRuntime[] = [];
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
   * - Bottom (v = 0.0, street level): Vivid high-opacity core trace along the streets
   * - Rising upward (v = 0.05..1.0): Smooth exponential aurora fade with vertical light-ray striations
   *   that dissolves seamlessly into the Parisian sky above the rooftops.
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
        let baseAlpha = 0.0;
        let boost = 255;

        if (v < 0.045) {
          // Intense street-level base core
          baseAlpha = 0.96;
          boost = 255;
        } else {
          const t = (v - 0.045) / 0.955;
          baseAlpha = Math.pow(Math.max(0, 1.0 - t), 2.15) * 0.72;
          boost = Math.round(240 + 15 * (1.0 - t));
        }

        for (let px = 0; px < 64; px++) {
          const u = (px / 64) * Math.PI * 2;
          // Subtle vertical light-column ray modulation
          const ray = 0.86 + 0.14 * Math.sin(u * 3.0) * Math.cos(u * 1.0);
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
   * Builds a 3D upward-radiating curtain of light (plus a street-level horizontal glow ribbon)
   * following a Metro segment curve so the line is vividly visible above the opaque city rooftops.
   */
  private createLightCurtainGeometry(
    surfCurve: THREE.CatmullRomCurve3,
    segments: number,
    yBase: number,
    yTop: number
  ): THREE.BufferGeometry {
    const pts = surfCurve.getSpacedPoints(segments);
    const positions: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];
    const curtainHeight = yTop - yBase;

    let cumDist = 0;
    // 1. Vertical upward-radiating curtain following the 3D terrain elevation (p.y)
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      if (i > 0) {
        cumDist += p.distanceTo(pts[i - 1]);
      }
      const u = cumDist * 0.65;
      const baseElev = p.y - 0.01;

      positions.push(p.x, baseElev, p.z);
      uvs.push(u, 0.01);

      positions.push(p.x, baseElev + curtainHeight, p.z);
      uvs.push(u, 0.99);

      if (i < pts.length - 1) {
        const b0 = i * 2;
        const t0 = b0 + 1;
        const b1 = b0 + 2;
        const t1 = b0 + 3;
        indices.push(b0, b1, t1, b0, t1, t0);
      }
    }

    // 2. Crisp horizontal street-level glow ribbon (width = 0.17) so the line also pops from directly overhead
    const baseVertOffset = pts.length * 2;
    const halfW = 0.085;
    cumDist = 0;
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
      const rx = (nx / len) * halfW;
      const rz = (nz / len) * halfW;
      const ribbonY = p.y + 0.005;

      positions.push(p.x - rx, ribbonY, p.z - rz);
      uvs.push(u, 0.02);

      positions.push(p.x + rx, ribbonY, p.z + rz);
      uvs.push(u, 0.02);

      if (i < pts.length - 1) {
        const l0 = baseVertOffset + i * 2;
        const r0 = l0 + 1;
        const l1 = l0 + 2;
        const r1 = l0 + 3;
        indices.push(l0, r0, r1, l0, r1, l1);
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
      return 1.35;
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
        const tubularSegments = Math.max(24, points.length * 14);
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
          (p) => new THREE.Vector3(p.x, getParisTerrainElevation(p.x, p.z) + 0.04, p.z)
        );
        const surfCurve = new THREE.CatmullRomCurve3(surfPts, false, 'catmullrom', 0.22);

        // Street-level filigree line trace (projects onto the streets when the Metro is lifted!)
        let surfaceTraceMesh: THREE.Mesh | undefined;
        let surfaceTraceMat: THREE.MeshBasicMaterial | undefined;
        if (!seg.elevated) {
          const surfGeo = new THREE.TubeGeometry(surfCurve, tubularSegments, 0.036, 6, false);
          surfaceTraceMat = new THREE.MeshBasicMaterial({
            color: lineColor,
            transparent: true,
            opacity: 0.0
          });
          surfaceTraceMesh = new THREE.Mesh(surfGeo, surfaceTraceMat);
          this.surfaceGroup.add(surfaceTraceMesh);
        }

        // Upward-Radiating Sky Light Curtain along all joint lines of this Metro segment!
        const curtainGeo = this.createLightCurtainGeometry(
          surfCurve,
          tubularSegments,
          0.03,
          2.25
        );
        const lightCurtainMat = new THREE.MeshBasicMaterial({
          color: lineColor,
          map: this.lightCurtainTexture,
          transparent: true,
          opacity: 0.84,
          side: THREE.DoubleSide,
          depthWrite: false
        });
        const lightCurtainMesh = new THREE.Mesh(curtainGeo, lightCurtainMat);
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
          const pierGeo = new THREE.BoxGeometry(0.22, 1.12, 0.22);
          const capGeo = new THREE.BoxGeometry(0.34, 0.10, 0.34);
          for (let i = 1; i < pierSamples.length - 1; i++) {
            const pp = pierSamples[i];
            const pier = new THREE.Mesh(pierGeo, viaductPierMat);
            pier.position.set(pp.x, 0.56, pp.z);
            pier.castShadow = true;
            pier.receiveShadow = true;

            const cap = new THREE.Mesh(capGeo, viaductPierMat);
            cap.position.set(pp.x, 1.08, pp.z);
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

    const hitGeo = new THREE.SphereGeometry(0.82, 10, 10);
    const hitMat = new THREE.MeshBasicMaterial({ visible: false });
    const unitShaftGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.0, 8);
    // Shared open-ended vertical sky light column geometry (base at y = 0.03, rising to y = 3.05)
    const skyColumnGeo = new THREE.CylinderGeometry(0.14, 0.24, 3.02, 12, 1, true);
    skyColumnGeo.translate(0, 1.54, 0);

    for (const st of ALL_STATIONS) {
      const group = new THREE.Group();
      group.position.set(st.x, 0, st.z);
      const surfaceElev = getParisTerrainElevation(st.x, st.z);

      const firstLineId = st.lines[0] ?? '1';
      const primaryColorHex = lineColorMap.get(firstLineId) ?? '#FFCD00';
      const primaryColor = new THREE.Color(primaryColorHex);

      let minDepth = -2.2;
      let maxDepth = -2.2;
      if (st.elevated) {
        minDepth = 1.35;
        maxDepth = 1.35;
      } else if (st.lines.length > 0) {
        const depths = st.lines.map((id) => lineDepthMap.get(id) ?? -4.0);
        minDepth = Math.min(...depths);
        maxDepth = Math.max(...depths);
      }
      const avgY = st.elevated ? 1.35 : (minDepth + maxDepth) * 0.5;
      const isHub = st.lines.length >= 3;
      const radius = isHub ? 0.65 : st.lines.length === 2 ? 0.52 : 0.4;

      // 1. Subterranean (or Viaduct) Station Platform Cylinder (rises when lifted!)
      const nodeHeight = st.elevated ? 0.45 : Math.max(0.55, Math.abs(maxDepth - minDepth) + 0.6);
      const subGeo = new THREE.CylinderGeometry(radius, radius, nodeHeight, 16);
      const subMat = new THREE.MeshStandardMaterial({
        color: isHub ? 0xf5f0e6 : primaryColor,
        emissive: isHub ? new THREE.Color(0xd4af37) : primaryColor,
        emissiveIntensity: isHub ? 0.75 : 0.65,
        roughness: 0.25,
        metalness: 0.5,
        transparent: true,
        opacity: 0.96
      });
      const subNodeMesh = new THREE.Mesh(subGeo, subMat);
      subNodeMesh.position.set(0, avgY, 0);
      group.add(subNodeMesh);

      // 2. Dynamic Vertical Tether Shaft connecting street entrance (surfaceElev + 0.045) to the station node!
      const shaftMat = new THREE.MeshBasicMaterial({
        color: isHub ? 0xe5c158 : primaryColor,
        transparent: true,
        opacity: 0.38
      });
      const shaftMesh = new THREE.Mesh(unitShaftGeo, shaftMat);
      const initialTop = st.elevated ? 1.35 : surfaceElev + 0.045;
      const initialBottom = st.elevated ? surfaceElev : minDepth;
      const initialLen = Math.max(0.2, Math.abs(initialTop - initialBottom));
      shaftMesh.position.set(0, (initialTop + initialBottom) * 0.5, 0);
      shaftMesh.scale.set(1, initialLen, 1);
      group.add(shaftMesh);

      // 3. Compact, Refined Street-Level Guimard / Art Deco Entrance Pin anchored on the 3D terrain surface
      const ringGeo = new THREE.RingGeometry(radius * 0.26, radius * 0.48, 16);
      ringGeo.rotateX(-Math.PI * 0.5);
      const ringMat = new THREE.MeshBasicMaterial({
        color: isHub ? 0xffdf70 : primaryColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.72
      });
      const surfaceRingMesh = new THREE.Mesh(ringGeo, ringMat);
      surfaceRingMesh.position.set(0, surfaceElev + 0.045, 0);
      group.add(surfaceRingMesh);

      // 4. Upward-Radiating Sky Light Column at each Station Joint (seated on the 3D terrain surface!)
      const lightColumnMat = new THREE.MeshBasicMaterial({
        color: primaryColor,
        map: this.lightCurtainTexture,
        transparent: true,
        opacity: isHub ? 0.92 : 0.82,
        side: THREE.DoubleSide,
        depthWrite: false
      });
      const lightColumnMesh = new THREE.Mesh(skyColumnGeo, lightColumnMat);
      lightColumnMesh.position.set(0, surfaceElev, 0);
      if (isHub) {
        lightColumnMesh.scale.set(1.35, 1.18, 1.35);
      }
      group.add(lightColumnMesh);

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
        ghostHaloMesh.position.set(0, surfaceElev + 0.06, 0);
        ghostHaloMesh.visible = false;
        group.add(ghostHaloMesh);
      }

      // 6. Invisible Raycast Hit Target
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.position.set(0, (avgY + surfaceElev + 0.6) * 0.5, 0);
      hitMesh.scale.set(1, Math.max(1.5, Math.abs(surfaceElev + 0.8 - avgY) * 0.52), 1);
      hitMesh.userData = {
        type: 'station',
        station: st
      };
      group.add(hitMesh);

      this.rootGroup.add(group);
      this.hitMeshes.push(hitMesh);
      this.stationRuntimes.push({
        data: st,
        group,
        subNodeMesh,
        surfaceRingMesh,
        shaftMesh,
        lightColumnMesh,
        lightColumnMat,
        ghostHaloMesh,
        hitMesh,
        baseY: avgY,
        surfaceElev,
        minDepth,
        primaryColor
      });
    }
  }

  public static readonly MONUMENT_HALO_COLOR_HEX = 0xffffff;

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

    // Fade in the floating Art Deco datum grid & street projection traces as the Metro rises above ground
    this.liftedDatumGroup.visible = clamped > 0.04;
    this.liftedDatumGridMat.opacity = clamped * 0.36;
    this.liftedDatumFrameMat.opacity = clamped * 0.55;
    this.surfaceGroup.visible = clamped > 0.03;

    for (const seg of this.segments) {
      if (seg.surfaceTraceMat) {
        const isLineSelected = !this.selectedLineId || this.selectedLineId === seg.line.id;
        seg.surfaceTraceMat.opacity = clamped * (isLineSelected ? 0.42 : 0.08);
      }
    }

    for (const stRun of this.stationRuntimes) {
      const liftedNodeY = stRun.baseY + liftOffsetY;
      stRun.subNodeMesh.position.y = liftedNodeY;

      if (stRun.ghostHaloMesh) {
        stRun.ghostHaloMesh.position.y =
          clamped > 0.08 ? liftedNodeY + 0.38 : stRun.surfaceElev + 0.06;
      }

      // Stretch vertical shaft between street entrance (surfaceElev + 0.045) and lifted station node
      const surfaceAnchorY = stRun.surfaceElev + 0.045;
      const bottomEndpoint =
        clamped < 0.05 && !stRun.data.elevated
          ? stRun.minDepth + liftOffsetY
          : liftedNodeY;
      const shaftLen = Math.max(0.18, Math.abs(bottomEndpoint - surfaceAnchorY));
      stRun.shaftMesh.position.y = (bottomEndpoint + surfaceAnchorY) * 0.5;
      stRun.shaftMesh.scale.set(1, shaftLen, 1);

      // Update raycast hit sphere to cover the station at its current lifted altitude
      if (clamped > 0.12) {
        stRun.hitMesh.position.y = liftedNodeY;
        stRun.hitMesh.scale.set(1.15, 1.6, 1.15);
      } else {
        stRun.hitMesh.position.y = (stRun.baseY + stRun.surfaceElev + 0.6) * 0.5;
        stRun.hitMesh.scale.set(
          1,
          Math.max(1.5, Math.abs(stRun.surfaceElev + 0.8 - stRun.baseY) * 0.52),
          1
        );
      }
    }
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
        seg.lightCurtainMat.opacity = isLineSelected ? 0.86 : 0.14;
        if (seg.surfaceTraceMat) {
          seg.surfaceTraceMat.opacity = this.liftProgress * (isLineSelected ? 0.42 : 0.08);
        }
      }
    }

    // 2. Update stations
    let activeStationsCount = 0;
    let closedGhostStationsCount = 0;

    for (const stRun of this.stationRuntimes) {
      const st = stRun.data;
      const isBorn = year >= st.openedYear;
      const isClosedGhost = st.closedYear !== undefined && year >= st.closedYear;

      if (!isBorn) {
        stRun.group.visible = false;
        stRun.hitMesh.scale.setScalar(0.0001);
        continue;
      }

      if (isClosedGhost) {
        closedGhostStationsCount++;
        if (!showGhostStations) {
          stRun.group.visible = false;
          stRun.hitMesh.scale.setScalar(0.0001);
          continue;
        }
        stRun.group.visible = true;
        stRun.lightColumnMesh.visible = this.showLightColumns;
        stRun.lightColumnMat.color.setHex(0xff5e57);
        stRun.lightColumnMat.opacity = 0.68;
        if (stRun.ghostHaloMesh) {
          stRun.ghostHaloMesh.visible = true;
        }
        const subMat = stRun.subNodeMesh.material as THREE.MeshStandardMaterial;
        subMat.color.setHex(0xff5e57);
        subMat.emissive.setHex(0xd9534f);
        subMat.emissiveIntensity = 0.85;
        subMat.opacity = 0.82;
        continue;
      }

      activeStationsCount++;
      stRun.group.visible = true;
      stRun.lightColumnMesh.visible = this.showLightColumns;
      if (stRun.ghostHaloMesh) {
        stRun.ghostHaloMesh.visible = false;
      }

      const matchesFilter = !selectedLineId || st.lines.includes(selectedLineId);
      const subMat = stRun.subNodeMesh.material as THREE.MeshStandardMaterial;
      const isHub = st.lines.length >= 3;
      subMat.color.copy(isHub ? new THREE.Color(0xf5f0e6) : stRun.primaryColor);
      subMat.emissive.copy(isHub ? new THREE.Color(0xd4af37) : stRun.primaryColor);
      subMat.emissiveIntensity = matchesFilter ? 0.75 : 0.15;
      subMat.opacity = matchesFilter ? 0.96 : 0.2;

      stRun.lightColumnMat.color.copy(stRun.primaryColor);
      stRun.lightColumnMat.opacity = matchesFilter ? (isHub ? 0.94 : 0.84) : 0.14;

      const ringMat = stRun.surfaceRingMesh.material as THREE.MeshBasicMaterial;
      ringMat.opacity = matchesFilter ? 0.72 + this.liftProgress * 0.25 : 0.14;

      const shaftMat = stRun.shaftMesh.material as THREE.MeshBasicMaterial;
      shaftMat.opacity = matchesFilter ? 0.44 : 0.08;
    }

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

      // Follow the 3D topography of Paris as the ring glides across hills and riverbanks
      const terrainY = getParisTerrainElevation(this.hoverCurrentPos.x, this.hoverCurrentPos.z);
      const liftY = this.getLiftOffsetY();
      const surfaceSafeY =
        liftY > 1.0
          ? Math.max(terrainY + 0.14, this.hoverCurrentPos.y)
          : terrainY + 0.14;

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
