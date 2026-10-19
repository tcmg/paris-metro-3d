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
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { projectLatLon } from '../data/parisGeoData';
import {
  getParisTerrainElevation,
  PARIS_MONUMENTS,
  ParisMonumentData
} from '../data/parisHistoricalData';
import {
  ACTIVE_CITY_ID,
  ACTIVE_CITY_META,
  ACTIVE_PIPELINE_CITY_DATASET
} from '../cities/activeCityRuntime';
import { mergeGroupMeshesByMaterial } from './geometryBatchUtils';

export const MONUMENT_OUTLINE_LAYER = 2;

export interface MonumentHitTarget {
  mesh: THREE.Mesh;
  data: ParisMonumentData;
}

interface YearBoundObject {
  obj: THREE.Object3D;
  proxyGroup?: THREE.Group | null;
  worldBox?: THREE.Box3;
  minYear: number;
  maxYear: number;
  monumentId?: string;
  monumentData?: ParisMonumentData;
}

interface MonumentRaycastEntry {
  obj: THREE.Object3D;
  proxyGroup: THREE.Group | null;
  worldBox: THREE.Box3;
  minYear: number;
  maxYear: number;
  monumentId?: string;
  monumentData?: ParisMonumentData;
}

interface BlenderMonumentPlacement {
  glbNodeName: string;
  monumentId?: string;
  customLatLon?: [number, number];
  baseY?: number;
  rotationY: number;
  scale: number;
  minYear: number;
  maxYear: number;
}

const PARIS_DEFAULT_MONUMENT_PLACEMENTS: BlenderMonumentPlacement[] = [
  {
    glbNodeName: 'monument-eiffel',
    monumentId: 'monument-eiffel',
    rotationY: 0.74, // Aligned with Champ de Mars / Pont d'Iéna axis
    scale: 0.72,
    minYear: 1889,
    maxYear: 2026
  },
  {
    glbNodeName: 'monument-notre-dame',
    monumentId: 'monument-notre-dame',
    baseY: 0.16, // Seated flush atop Île de la Cité deck
    rotationY: -2.06, // West twin-tower facade facing Parvis Notre-Dame (-0.88, -0.47), East apse facing Île Saint-Louis
    scale: 0.56,
    minYear: 1345,
    maxYear: 2026
  },
  {
    glbNodeName: 'monument-sainte-chapelle',
    monumentId: 'monument-sainte-chapelle',
    baseY: 0.16, // Seated flush atop Île de la Cité deck
    rotationY: 2.65, // Conciergerie medieval twin towers facing North Quai de l'Horloge
    scale: 0.68,
    minYear: 1248,
    maxYear: 2026
  },
  {
    glbNodeName: 'monument-arc-triomphe',
    monumentId: 'monument-arc-triomphe',
    rotationY: 1.12, // Central arch opening aligned down the Axe Historique (Champs-Élysées ↔ Grande Armée)
    scale: 0.68,
    minYear: 1836,
    maxYear: 2026
  },
  {
    glbNodeName: 'monument-sacre-coeur',
    monumentId: 'monument-sacre-coeur',
    rotationY: 0.0,
    scale: 0.44,
    minYear: 1914,
    maxYear: 2026
  },
  {
    glbNodeName: 'monument-sacre-coeur-scaffolding',
    monumentId: 'monument-sacre-coeur',
    rotationY: 0.0,
    scale: 0.44,
    minYear: 1900,
    maxYear: 1913
  },
  {
    glbNodeName: 'monument-louvre',
    monumentId: 'monument-louvre',
    rotationY: -0.365, // Aligned parallel to Quai François Mitterrand & Rue de Rivoli
    scale: 0.76,
    minYear: 1793,
    maxYear: 2026
  },
  {
    glbNodeName: 'monument-louvre-pyramid',
    monumentId: 'monument-louvre',
    rotationY: -0.365,
    scale: 0.76,
    minYear: 1989,
    maxYear: 2026
  },
  {
    glbNodeName: 'monument-opera-garnier',
    monumentId: 'monument-opera-garnier',
    rotationY: 0.43, // Main facade facing Place de l'Opéra & Avenue de l'Opéra (SSE)
    scale: 0.68,
    minYear: 1875,
    maxYear: 2026
  },
  {
    glbNodeName: 'monument-invalides',
    monumentId: 'monument-invalides',
    rotationY: Math.PI, // Cour d'Honneur facing North Esplanade des Invalides, Golden Dôme on South (Place Vauban)
    scale: 0.68,
    minYear: 1706,
    maxYear: 2026
  },
  {
    glbNodeName: 'monument-pantheon',
    monumentId: 'monument-pantheon',
    rotationY: -1.25, // Corinthian portico facing WSW down Rue Soufflot toward Jardin du Luxembourg
    scale: 0.68,
    minYear: 1790,
    maxYear: 2026
  },
  {
    glbNodeName: 'monument-grand-palais',
    monumentId: 'monument-grand-palais',
    rotationY: 0.0, // Aligned with Avenue Winston-Churchill & Pont Alexandre III
    scale: 0.68,
    minYear: 1900,
    maxYear: 2026
  },
  {
    glbNodeName: 'monument-concorde-obelisk',
    monumentId: 'monument-concorde-madeleine',
    rotationY: 0.22, // Aligned with Place de la Concorde / Rue Royale axis
    scale: 0.68,
    minYear: 1836,
    maxYear: 2026
  },
  {
    glbNodeName: 'monument-bastille-column',
    monumentId: 'monument-bastille',
    rotationY: 0.0,
    scale: 0.72,
    minYear: 1840,
    maxYear: 2026
  },
  {
    glbNodeName: 'monument-bastille-opera',
    monumentId: 'monument-bastille',
    rotationY: -0.25, // Opéra Bastille on the eastern side of Place de la Bastille
    scale: 0.68,
    minYear: 1989,
    maxYear: 2026
  },
  {
    glbNodeName: 'monument-gare-montparnasse-old',
    monumentId: 'monument-montparnasse',
    rotationY: 0.58,
    scale: 0.76,
    minYear: 1900,
    maxYear: 1968
  },
  {
    glbNodeName: 'monument-tour-montparnasse',
    monumentId: 'monument-montparnasse',
    rotationY: 0.58, // Aligned with Avenue du Maine / Rue de Rennes axis
    scale: 0.78,
    minYear: 1973,
    maxYear: 2026
  },
  {
    glbNodeName: 'monument-pompidou',
    monumentId: 'monument-pompidou',
    rotationY: -1.25, // Chenille escalator facade facing Piazza Georges-Pompidou / Rue Saint-Merri
    scale: 0.68,
    minYear: 1977,
    maxYear: 2026
  },
  {
    glbNodeName: 'monument-grande-arche',
    monumentId: 'monument-grande-arche',
    rotationY: 1.12, // Open marble cube aligned down the Axe Historique toward Arc de Triomphe & Louvre
    scale: 0.78,
    minYear: 1989,
    maxYear: 2026
  },
  {
    glbNodeName: 'monument-bnf',
    monumentId: 'monument-bnf',
    rotationY: -0.68, // Aligned with Quai François-Mauriac along the Seine
    scale: 0.65,
    minYear: 1996,
    maxYear: 2026
  }
];

const BLENDER_MONUMENT_PLACEMENTS: BlenderMonumentPlacement[] = ACTIVE_PIPELINE_CITY_DATASET
  ? ACTIVE_PIPELINE_CITY_DATASET.monuments.map((m) => ({
      glbNodeName: m.nodeName,
      monumentId: m.id,
      rotationY: Math.abs(m.rotationY) <= Math.PI * 2 ? m.rotationY : (m.rotationY * Math.PI) / 180,
      scale: m.scale * 0.75,
      minYear: Math.min(1900, m.completedYear ?? m.year),
      maxYear: 2026
    }))
  : PARIS_DEFAULT_MONUMENT_PLACEMENTS;

export const PAPER_MODEL_UNIFORM = { value: 0.0 };
const DEFAULT_NO_COLOR_REVEAL_UNIFORM = { value: 0.0 };

interface EiffelNightUniforms {
  uPaperGreyscale: { value: number };
  uEiffelNight: { value: number };
  uEiffelCenter: { value: THREE.Vector3 };
  uEiffelTotalHeight: { value: number };
}

/**
 * Injects a zero-overhead GPU shader hook into any above-ground Three.js material
 * so toggling Grey Paper Architecture Model mode ("Maquette Grise") converts all
 * above-ground albedo and lighting into tactile monochrome architectural cardstock
 * while allowing a focused/highlighted monument (`colorRevealUniform.value = 1.0`)
 * to return to full vivid colour.
 */
export function applyPaperModelShaderHook<T extends THREE.Material>(
  mat: T,
  colorRevealUniform: { value: number } = DEFAULT_NO_COLOR_REVEAL_UNIFORM
): T {
  mat.userData = { ...mat.userData, hasPaperModelHook: true, colorRevealUniform };
  mat.customProgramCacheKey = () => 'paper-hook-v1';
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uPaperGreyscale = PAPER_MODEL_UNIFORM;
    shader.uniforms.uColorReveal = colorRevealUniform;
    shader.fragmentShader =
      `uniform float uPaperGreyscale;\nuniform float uColorReveal;\n` +
      shader.fragmentShader
        .replace(
          '#include <color_fragment>',
          `#include <color_fragment>
          float effectivePaperAlbedo = uPaperGreyscale * (1.0 - uColorReveal);
          if (effectivePaperAlbedo > 0.001) {
            float baseLuma = dot(diffuseColor.rgb, vec3(0.299, 0.587, 0.114));
            float paperTone = mix(0.42, 0.88, clamp(pow(baseLuma, 0.82), 0.0, 1.0));
            vec3 paperAlbedo = vec3(paperTone * 0.985, paperTone * 0.992, paperTone * 1.01);
            diffuseColor.rgb = mix(diffuseColor.rgb, paperAlbedo, effectivePaperAlbedo);
          }`
        )
        .replace(
          '#include <emissivemap_fragment>',
          `#include <emissivemap_fragment>
          float effectivePaperEmissive = uPaperGreyscale * (1.0 - uColorReveal);
          if (effectivePaperEmissive > 0.001) {
            totalEmissiveRadiance *= (1.0 - effectivePaperEmissive * 0.88);
          }`
        )
        .replace(
          '#include <tonemapping_fragment>',
          `float effectivePaperLit = uPaperGreyscale * (1.0 - uColorReveal);
          if (effectivePaperLit > 0.001) {
            float litLuma = dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114));
            vec3 litPaper = vec3(litLuma * 0.975, litLuma * 0.988, litLuma * 1.015);
            gl_FragColor.rgb = mix(gl_FragColor.rgb, litPaper, effectivePaperLit * 0.94);
          }
          #include <tonemapping_fragment>`
        );
  };
  return mat;
}

/**
 * Specialized GPU shader hook for the Eiffel Tower ironwork:
 * Combines Paper Model greyscale support (and focused colour reveal) with a 3D nighttime
 * sodium/amber floodlight gradient so the outer lattice silhouette stays dark charcoal-black
 * while the inner legs, platform undersides/tops, and central column glow with dark-orange
 * to warm golden-amber gradients.
 */
function applyEiffelMaterialShaderHook<T extends THREE.Material>(
  mat: T,
  eiffelUniforms: EiffelNightUniforms,
  colorRevealUniform: { value: number } = DEFAULT_NO_COLOR_REVEAL_UNIFORM
): T {
  mat.userData = {
    ...mat.userData,
    hasEiffelShaderHook: true,
    hasPaperModelHook: true,
    colorRevealUniform
  };
  mat.customProgramCacheKey = () => 'eiffel-hook-v1';
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uPaperGreyscale = eiffelUniforms.uPaperGreyscale;
    shader.uniforms.uColorReveal = colorRevealUniform;
    shader.uniforms.uEiffelNight = eiffelUniforms.uEiffelNight;
    shader.uniforms.uEiffelCenter = eiffelUniforms.uEiffelCenter;
    shader.uniforms.uEiffelTotalHeight = eiffelUniforms.uEiffelTotalHeight;

    shader.vertexShader =
      `varying vec3 vEiffelWorldPos;\nvarying vec3 vEiffelWorldNormal;\n` +
      shader.vertexShader.replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
        vec4 eiffelWp = modelMatrix * vec4(transformed, 1.0);
        vEiffelWorldPos = eiffelWp.xyz;
        vEiffelWorldNormal = normalize(mat3(modelMatrix) * objectNormal);`
      );

    shader.fragmentShader =
      `uniform float uPaperGreyscale;
      uniform float uColorReveal;
      uniform float uEiffelNight;
      uniform vec3 uEiffelCenter;
      uniform float uEiffelTotalHeight;
      varying vec3 vEiffelWorldPos;
      varying vec3 vEiffelWorldNormal;\n` +
      shader.fragmentShader
        .replace(
          '#include <color_fragment>',
          `#include <color_fragment>
          float eiffelGlowLevel = 0.0;
          vec3 eiffelNightPalette = vec3(0.03, 0.015, 0.006);
          if (uEiffelNight > 0.001) {
            float h = clamp((vEiffelWorldPos.y - uEiffelCenter.y) / max(1.0, uEiffelTotalHeight), 0.0, 1.0);
            vec2 dXZ = vEiffelWorldPos.xz - uEiffelCenter.xz;
            float radialDist = length(dXZ);
            float envRadius = uEiffelTotalHeight * (0.015 + 0.145 * pow(clamp(1.0 - h / 0.89, 0.0, 1.0), 1.68));
            float rNorm = clamp(radialDist / max(0.06, envRadius), 0.0, 1.25);

            // Inner lattice & core struts glow warmer; outer corner edges stay dark silhouette iron
            float interiorFactor = 1.0 - smoothstep(0.18, 0.94, rNorm);

            // Vertical floodlight zones: base legs & arches, 1st platform, 2nd platform, upper column, and 3rd-floor lantern
            float baseLegGlow = smoothstep(0.005, 0.08, h) * (1.0 - smoothstep(0.11, 0.21, h));
            float platform1Glow = smoothstep(0.14, 0.20, h) * (1.0 - smoothstep(0.22, 0.37, h));
            float platform2Glow = smoothstep(0.34, 0.40, h) * (1.0 - smoothstep(0.42, 0.64, h));
            float upperShaftGlow = smoothstep(0.38, 0.50, h) * (1.0 - smoothstep(0.78, 0.89, h)) * 0.82;
            float summitGlow = smoothstep(0.80, 0.86, h) * (1.0 - smoothstep(0.89, 0.95, h));
            float verticalHotspots = max(max(baseLegGlow, platform1Glow), max(platform2Glow, max(upperShaftGlow, summitGlow)));
            float vGrad = clamp(0.26 + 0.74 * verticalHotspots, 0.0, 1.0);

            vec3 n = normalize(vEiffelWorldNormal);
            vec2 radialDir = radialDist > 0.001 ? (dXZ / radialDist) : vec2(1.0, 0.0);
            float inwardFacing = clamp(-dot(n.xz, radialDir) * 0.5 + 0.5, 0.0, 1.0);
            float upwardFlood = clamp(-n.y * 0.45 + 0.55, 0.0, 1.0);
            float strutWave = 0.5 + 0.5 * sin(vEiffelWorldPos.y * 13.5 + vEiffelWorldPos.x * 8.5 - vEiffelWorldPos.z * 8.5);

            eiffelGlowLevel = clamp(
              vGrad * (0.28 + 0.48 * interiorFactor + 0.32 * inwardFacing * upwardFlood) * (0.70 + 0.30 * strutWave),
              0.0,
              1.0
            );
            // Keep the topmost thin radio antenna needle dark
            eiffelGlowLevel *= (1.0 - smoothstep(0.90, 0.95, h));

            // 4-stop ramp: Dark Silhouette Iron -> Deep Burnt Orange -> Glowing Amber-Orange -> Warm Golden Core
            vec3 colBlackIron = vec3(0.028, 0.014, 0.006);
            vec3 colDarkOrange = vec3(0.42, 0.14, 0.018);
            vec3 colRichOrange = vec3(0.88, 0.36, 0.05);
            vec3 colWarmGold = vec3(1.0, 0.76, 0.26);

            eiffelNightPalette = mix(colBlackIron, colDarkOrange, smoothstep(0.06, 0.36, eiffelGlowLevel));
            eiffelNightPalette = mix(eiffelNightPalette, colRichOrange, smoothstep(0.34, 0.68, eiffelGlowLevel));
            eiffelNightPalette = mix(eiffelNightPalette, colWarmGold, smoothstep(0.66, 0.95, eiffelGlowLevel));

            diffuseColor.rgb = mix(diffuseColor.rgb, eiffelNightPalette * 0.42, uEiffelNight * 0.95);
          }
          float effectivePaperAlbedo = uPaperGreyscale * (1.0 - uColorReveal);
          if (effectivePaperAlbedo > 0.001) {
            float baseLuma = dot(diffuseColor.rgb, vec3(0.299, 0.587, 0.114));
            float paperTone = mix(0.42, 0.88, clamp(pow(baseLuma, 0.82), 0.0, 1.0));
            vec3 paperAlbedo = vec3(paperTone * 0.985, paperTone * 0.992, paperTone * 1.01);
            diffuseColor.rgb = mix(diffuseColor.rgb, paperAlbedo, effectivePaperAlbedo);
          }`
        )
        .replace(
          '#include <emissivemap_fragment>',
          `#include <emissivemap_fragment>
          if (uEiffelNight > 0.001) {
            float glowMask = smoothstep(0.10, 0.92, eiffelGlowLevel);
            vec3 nightRadiance = eiffelNightPalette * (0.28 + 1.55 * glowMask * glowMask);
            totalEmissiveRadiance += nightRadiance * uEiffelNight;
          }
          float effectivePaperEmissive = uPaperGreyscale * (1.0 - uColorReveal);
          if (effectivePaperEmissive > 0.001) {
            totalEmissiveRadiance *= (1.0 - effectivePaperEmissive * 0.88);
          }`
        )
        .replace(
          '#include <tonemapping_fragment>',
          `float effectivePaperLit = uPaperGreyscale * (1.0 - uColorReveal);
          if (effectivePaperLit > 0.001) {
            float litLuma = dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114));
            vec3 litPaper = vec3(litLuma * 0.975, litLuma * 0.988, litLuma * 1.015);
            gl_FragColor.rgb = mix(gl_FragColor.rgb, litPaper, effectivePaperLit * 0.94);
          }
          #include <tonemapping_fragment>`
        );
  };
  return mat;
}

export class ParisMonumentsBuilder {
  public readonly rootGroup = new THREE.Group();
  public readonly hitProxyRoot = new THREE.Group();
  public readonly monumentTargets: MonumentHitTarget[] = [];
  public readonly raycastEntries: MonumentRaycastEntry[] = [];
  public onGeometryLoaded?: () => void;

  private yearObjects: YearBoundObject[] = [];
  private eiffelBeaconGroup = new THREE.Group();
  private beaconCoreMat!: THREE.ShaderMaterial;
  private beaconHaloMat!: THREE.ShaderMaterial;
  private beaconLanternOrbMat!: THREE.MeshBasicMaterial;
  private eiffelNightLampsPoints!: THREE.Points;
  private eiffelNightLampsMat!: THREE.ShaderMaterial;
  private eiffelSparklePoints!: THREE.Points;
  private eiffelSparkleMat!: THREE.ShaderMaterial;
  private eiffelMaterials: { mat: THREE.MeshStandardMaterial; baseColor: THREE.Color }[] = [];
  private eiffelNightUniforms: EiffelNightUniforms = {
    uPaperGreyscale: PAPER_MODEL_UNIFORM,
    uEiffelNight: { value: 0.0 },
    uEiffelCenter: { value: new THREE.Vector3(0, 0, 0) },
    uEiffelTotalHeight: { value: 8.35 }
  };
  private eiffelNightLight!: THREE.PointLight;
  private manualEiffelSparkle = false;
  private currentYear = 2026;
  private currentOpacity = 1.0;
  private outlinedMonumentId: string | null = null;
  private selectedMonumentId: string | null = null;
  private glbLoaded = false;
  private readonly hitProxyMat = new THREE.MeshBasicMaterial({ visible: false });
  private readonly monumentColorRevealUniforms = new Map<string, { value: number }>();

  constructor() {
    this.rootGroup.name = 'ParisBlenderMonuments3D';
    this.buildEiffelSearchlightBeacon();
    this.buildHitTargets();
    this.loadBlenderMonumentsGLB();
  }

  private getMonumentColorRevealUniform(monumentId: string): { value: number } {
    let u = this.monumentColorRevealUniforms.get(monumentId);
    if (!u) {
      const isRevealed =
        this.outlinedMonumentId === monumentId || this.selectedMonumentId === monumentId;
      u = { value: isRevealed ? 1.0 : 0.0 };
      this.monumentColorRevealUniforms.set(monumentId, u);
    }
    return u;
  }

  public setManualEiffelSparkle(enabled: boolean): void {
    this.manualEiffelSparkle = enabled;
  }

  public isManualEiffelSparkle(): boolean {
    return this.manualEiffelSparkle;
  }

  private getMonumentCoords(id: string): { x: number; z: number } {
    const m = PARIS_MONUMENTS.find((item) => item.id === id);
    return m ? { x: m.x, z: m.z } : { x: 0, z: 0 };
  }

  /**
   * Builds the rotating volumetric golden searchlight cones (Phare de la Tour Eiffel),
   * warm dark-orange/golden nighttime interior bloom halos,
   * and the 1,500-point full-tower diamond xenon strobe system (Scintillement de la Tour Eiffel).
   */
  private buildEiffelSearchlightBeacon(): void {
    const { x, z } = this.getMonumentCoords(ACTIVE_CITY_META.beaconMonumentId);
    const terrainY = getParisTerrainElevation(x, z);
    const eiffelScale = 0.72;
    const baseY = 0.02 + terrainY;
    const lanternY = baseY + 10.75 * eiffelScale;
    this.eiffelBeaconGroup.position.set(x, lanternY, z);
    this.eiffelNightUniforms.uEiffelCenter.value.set(x, baseY, z);
    this.eiffelNightUniforms.uEiffelTotalHeight.value = 11.6 * eiffelScale;

    const createVolumetricConeMat = (coneLength: number, baseOpacity: number): THREE.ShaderMaterial =>
      new THREE.ShaderMaterial({
        uniforms: {
          uConeLength: { value: coneLength },
          uOpacity: { value: baseOpacity },
          uNightFactor: { value: 0.0 },
          uColorNear: { value: new THREE.Color(0xfff6d6) },
          uColorFar: { value: new THREE.Color(0xffbe4f) }
        },
        vertexShader: /* glsl */ `
          uniform float uConeLength;
          varying float vAxial;
          varying vec3 vWorldNormal;
          varying vec3 vWorldPos;

          void main() {
            // Exact axial coordinate along cone axis (z = 0 at apex -> z = -uConeLength at far rim)
            vAxial = clamp(-position.z / uConeLength, 0.0, 1.0);
            vec4 worldPos = modelMatrix * vec4(position, 1.0);
            vWorldPos = worldPos.xyz;
            vWorldNormal = normalize(mat3(modelMatrix) * normal);
            gl_Position = projectionMatrix * viewMatrix * worldPos;
          }
        `,
        fragmentShader: /* glsl */ `
          uniform float uOpacity;
          uniform float uNightFactor;
          uniform vec3 uColorNear;
          uniform vec3 uColorFar;
          varying float vAxial;
          varying vec3 vWorldNormal;
          varying vec3 vWorldPos;

          void main() {
            float axial = clamp(vAxial, 0.0, 1.0);
            if (uNightFactor <= 0.005 || axial >= 0.88) discard;

            // NaN-free cubic polynomial axial falloff: reaches 0.0 smoothly before the far rim (axial = 0.88)
            // Avoids GLSL pow(negative, fractional) NaN under MSAA centroid extrapolation into HalfFloat RTs
            float tipFade = 1.0 - smoothstep(0.08, 0.88, axial);
            float distFade = (tipFade * tipFade * tipFade) * smoothstep(0.0, 0.04, axial);

            // NaN-free Fresnel edge falloff (ndv * sqrt(ndv) === ndv^1.5 without pow(0, y) undefined behavior)
            vec3 viewDir = normalize(cameraPosition - vWorldPos);
            float ndv = clamp(abs(dot(normalize(vWorldNormal), viewDir)), 0.0, 1.0);
            float rimFade = ndv * sqrt(ndv);

            float alpha = distFade * rimFade * uOpacity * uNightFactor;
            if (alpha <= 0.0015) discard;

            vec3 beamCol = mix(uColorNear, uColorFar, smoothstep(0.05, 0.78, axial));
            gl_FragColor = vec4(beamCol * (1.25 + 0.55 * tipFade), alpha);
          }
        `,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending
      });

    // Inner concentrated xenon searchlight core cone + wider outer atmospheric scatter cone (32 axial segments for smooth interpolation)
    const coreLength = 28.0;
    const coreGeo = new THREE.ConeGeometry(1.35, coreLength, 36, 32, true);
    coreGeo.translate(0, -coreLength * 0.5, 0);
    coreGeo.rotateX(Math.PI * 0.5);

    const haloLength = 32.0;
    const haloGeo = new THREE.ConeGeometry(2.65, haloLength, 36, 32, true);
    haloGeo.translate(0, -haloLength * 0.5, 0);
    haloGeo.rotateX(Math.PI * 0.5);

    this.beaconCoreMat = createVolumetricConeMat(coreLength, 0.42);
    this.beaconHaloMat = createVolumetricConeMat(haloLength, 0.18);

    for (const rotY of [0, Math.PI]) {
      const coreMesh = new THREE.Mesh(coreGeo, this.beaconCoreMat);
      coreMesh.rotation.y = rotY;
      // Slight downward sweep (-1.8 deg) across the Parisian skyline
      coreMesh.rotation.x = 0.032;

      const haloMesh = new THREE.Mesh(haloGeo, this.beaconHaloMat);
      haloMesh.rotation.y = rotY;
      haloMesh.rotation.x = 0.032;

      this.eiffelBeaconGroup.add(coreMesh, haloMesh);
    }

    // Glowing summit lantern core orb
    this.beaconLanternOrbMat = new THREE.MeshBasicMaterial({
      color: 0xfff4c8,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const orbMesh = new THREE.Mesh(new THREE.SphereGeometry(0.22, 14, 14), this.beaconLanternOrbMat);
    this.eiffelBeaconGroup.add(orbMesh);
    this.rootGroup.add(this.eiffelBeaconGroup);

    this.yearObjects.push({
      obj: this.eiffelBeaconGroup,
      minYear: 1889,
      maxYear: 2026
    });

    // Warm amber ground glow on the Champ de Mars beneath the Eiffel Tower at night
    this.eiffelNightLight = new THREE.PointLight(0xffa838, 0.0, 14.0, 1.7);
    this.eiffelNightLight.position.set(x, 2.4 + terrainY, z);
    this.rootGroup.add(this.eiffelNightLight);

    // Deterministic pseudo-random helper
    const hash = (n: number): number => {
      const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
      return s - Math.floor(s);
    };

    const rotAngle = 0.74;
    const cosR = Math.cos(rotAngle);
    const sinR = Math.sin(rotAngle);

    // 1. Soft Atmospheric Dark-Orange & Golden Bloom Halos + Interior Floodlight Nodes (640 points across the entire tower)
    const lampCount = 640;
    const lampPositions = new Float32Array(lampCount * 3);
    const lampSizes = new Float32Array(lampCount);
    for (let i = 0; i < lampCount; i++) {
      const hNorm = Math.pow((i + 0.5) / lampCount, 0.92);
      const localY = (0.18 + hNorm * 10.45) * eiffelScale;
      const halfSpread =
        (0.09 + 1.18 * Math.pow(Math.max(0, 1.0 - hNorm * 0.96), 1.72)) * eiffelScale;
      const legIdx = i % 4;
      const sx = legIdx & 1 ? 1 : -1;
      const sz = legIdx & 2 ? 1 : -1;
      const lx = sx * halfSpread * (0.65 + hash(i * 7 + 1) * 0.28);
      const lz = sz * halfSpread * (0.65 + hash(i * 11 + 2) * 0.28);
      lampPositions[i * 3] = x + (lx * cosR + lz * sinR);
      lampPositions[i * 3 + 1] = baseY + localY;
      lampPositions[i * 3 + 2] = z + (-lx * sinR + lz * cosR);
      lampSizes[i] = 0.85 + hash(i * 19 + 3) * 0.95;
    }

    const lampGeo = new THREE.BufferGeometry();
    lampGeo.setAttribute('position', new THREE.BufferAttribute(lampPositions, 3));
    lampGeo.setAttribute('aSize', new THREE.BufferAttribute(lampSizes, 1));

    this.eiffelNightLampsMat = new THREE.ShaderMaterial({
      uniforms: {
        uNightIntensity: { value: 0.0 }
      },
      vertexShader: /* glsl */ `
        attribute float aSize;
        uniform float uNightIntensity;
        varying float vIntensity;

        void main() {
          vIntensity = uNightIntensity;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          // Slight view-space nudge so the soft orange-gold bloom wraps around the dark iron lattice
          mvPosition.z += 0.16;
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = clamp((105.0 * aSize) / max(4.5, -mvPosition.z), 5.0, 36.0);
        }
      `,
      fragmentShader: /* glsl */ `
        varying float vIntensity;

        void main() {
          if (vIntensity <= 0.01) discard;
          vec2 uv = gl_PointCoord * 2.0 - 1.0;
          float dist = length(uv);
          if (dist > 1.0) discard;

          // Multi-zone Gaussian bloom: wide dark-orange atmospheric halo + warm golden-amber floodlight core
          float outerBloom = exp(-dist * dist * 2.35);
          float midGlow = exp(-dist * dist * 5.8);
          float hotCore = exp(-dist * dist * 14.0);

          vec3 colDarkOrange = vec3(0.82, 0.30, 0.04);
          vec3 colAmberGold = vec3(1.0, 0.68, 0.18);
          vec3 colBrightCore = vec3(1.0, 0.92, 0.66);

          vec3 col = mix(colDarkOrange, colAmberGold, clamp(midGlow * 1.15, 0.0, 1.0));
          col = mix(col, colBrightCore, clamp(hotCore * 1.1, 0.0, 1.0));

          float alpha = clamp(outerBloom * 0.22 + midGlow * 0.34 + hotCore * 0.44, 0.0, 1.0) * vIntensity * 0.42;
          gl_FragColor = vec4(col * 1.35, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    this.eiffelNightLampsPoints = new THREE.Points(lampGeo, this.eiffelNightLampsMat);
    this.rootGroup.add(this.eiffelNightLampsPoints);
    this.yearObjects.push({
      obj: this.eiffelNightLampsPoints,
      minYear: 1889,
      maxYear: 2026
    });

    // 2. Build 1,500-point Full-Tower 3D Diamond Xenon Strobe System (Scintillement de la Tour Eiffel)
    const sparkleCount = 1500;
    const positions = new Float32Array(sparkleCount * 3);
    const phases = new Float32Array(sparkleCount);
    const sizes = new Float32Array(sparkleCount);

    for (let i = 0; i < sparkleCount; i++) {
      // Stratified height from base (0.0) all the way up the shaft to the 3rd-floor lantern (1.0)
      const hNorm = Math.pow((i + 0.5) / sparkleCount, 0.88);
      const localY = (0.15 + hNorm * 10.55) * eiffelScale;
      const halfSpread =
        (0.11 + 1.28 * Math.pow(Math.max(0, 1.0 - hNorm * 0.96), 1.72)) * eiffelScale;
      const legHalfWidth = (0.07 + 0.24 * (1.0 - hNorm)) * eiffelScale;

      const legIdx = i % 4;
      const sx = legIdx & 1 ? 1 : -1;
      const sz = legIdx & 2 ? 1 : -1;
      const jitterX = (hash(i * 7 + 3) * 2.0 - 1.0) * legHalfWidth;
      const jitterZ = (hash(i * 13 + 5) * 2.0 - 1.0) * legHalfWidth;
      const lx = sx * halfSpread + jitterX;
      const lz = sz * halfSpread + jitterZ;

      positions[i * 3] = x + (lx * cosR + lz * sinR);
      positions[i * 3 + 1] = baseY + localY;
      positions[i * 3 + 2] = z + (-lx * sinR + lz * cosR);

      phases[i] = hash(i * 17 + 9);
      sizes[i] = 0.9 + hash(i * 23 + 4) * 1.15;
    }

    const sparkleGeo = new THREE.BufferGeometry();
    sparkleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    sparkleGeo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
    sparkleGeo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));

    this.eiffelSparkleMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0.0 },
        uSparkleIntensity: { value: 0.0 }
      },
      vertexShader: /* glsl */ `
        attribute float aPhase;
        attribute float aSize;
        uniform float uTime;
        uniform float uSparkleIntensity;
        varying float vFlash;
        varying float vPhase;

        void main() {
          vPhase = aPhase;
          // Loud, high-contrast asynchronous diamond xenon strobe flashes
          float wave1 = sin(uTime * 29.0 + aPhase * 62.8318);
          float wave2 = cos(uTime * 21.7 - aPhase * 47.1238);
          float wave3 = sin(uTime * 37.3 + aPhase * 91.4);
          float rawFlash = max(0.0, wave1 * 0.50 + wave2 * 0.32 + wave3 * 0.18);
          vFlash = pow(rawFlash, 3.6) * uSparkleIntensity;

          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          // Push strobe flares slightly toward the camera in view space so black struts never clip them
          mvPosition.z += 0.38;
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = clamp((155.0 * aSize * (0.65 + 2.15 * vFlash)) / max(4.5, -mvPosition.z), 6.5, 48.0);
        }
      `,
      fragmentShader: /* glsl */ `
        varying float vFlash;
        varying float vPhase;

        void main() {
          if (vFlash <= 0.01) discard;
          vec2 uv = gl_PointCoord * 2.0 - 1.0;
          float dist = length(uv);
          if (dist > 1.0) discard;

          // Bold 8-point diamond star-cross + intense white-gold xenon core
          float core = exp(-dist * dist * 5.2);
          float crossMain = max(
            exp(-abs(uv.x) * 8.5) * exp(-abs(uv.y) * 1.4),
            exp(-abs(uv.y) * 8.5) * exp(-abs(uv.x) * 1.4)
          );
          vec2 diagUv = vec2(uv.x + uv.y, uv.x - uv.y) * 0.7071;
          float crossDiag = max(
            exp(-abs(diagUv.x) * 12.0) * exp(-abs(diagUv.y) * 2.2),
            exp(-abs(diagUv.y) * 12.0) * exp(-abs(diagUv.x) * 2.2)
          );
          float star = clamp(core + crossMain * 0.95 + crossDiag * 0.55, 0.0, 1.0);

          vec3 col = mix(vec3(1.0, 0.88, 0.52), vec3(1.0, 0.99, 0.96), clamp(core * 1.35, 0.0, 1.0));
          gl_FragColor = vec4(col * 3.6, star * min(1.0, vFlash * 1.35));
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    this.eiffelSparklePoints = new THREE.Points(sparkleGeo, this.eiffelSparkleMat);
    this.rootGroup.add(this.eiffelSparklePoints);
    this.yearObjects.push({
      obj: this.eiffelSparklePoints,
      minYear: 1889,
      maxYear: 2026
    });
  }

  /**
   * Samples 3D surface points across all triangles of the Eiffel Tower GLB mesh (rather than raw
   * vertices, which would cluster on curved arches) and stratifies them into 44 vertical height
   * bands from the base legs through the 1st/2nd platforms all the way up the shaft to the summit.
   */
  private populateEiffelLightsFromMesh(eiffelRoot: THREE.Object3D, centerX: number, centerZ: number): void {
    eiffelRoot.updateMatrixWorld(true);

    const hash = (n: number): number => {
      const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
      return s - Math.floor(s);
    };

    const vA = new THREE.Vector3();
    const vB = new THREE.Vector3();
    const vC = new THREE.Vector3();
    const edge1 = new THREE.Vector3();
    const edge2 = new THREE.Vector3();
    const crossVec = new THREE.Vector3();

    let minY = Infinity;
    let maxY = -Infinity;
    const rawSurfacePoints: THREE.Vector3[] = [];
    let triCounter = 0;

    eiffelRoot.traverse((child) => {
      if ((child as THREE.Mesh).isMesh && !child.userData?.isHitProxy) {
        const mesh = child as THREE.Mesh;
        const geom = mesh.geometry;
        const posAttr = geom.getAttribute('position');
        if (!posAttr) return;
        const indexAttr = geom.getIndex();
        const triCount = indexAttr ? Math.floor(indexAttr.count / 3) : Math.floor(posAttr.count / 3);

        for (let t = 0; t < triCount; t++) {
          const i0 = indexAttr ? indexAttr.getX(t * 3) : t * 3;
          const i1 = indexAttr ? indexAttr.getX(t * 3 + 1) : t * 3 + 1;
          const i2 = indexAttr ? indexAttr.getX(t * 3 + 2) : t * 3 + 2;

          vA.fromBufferAttribute(posAttr, i0).applyMatrix4(mesh.matrixWorld);
          vB.fromBufferAttribute(posAttr, i1).applyMatrix4(mesh.matrixWorld);
          vC.fromBufferAttribute(posAttr, i2).applyMatrix4(mesh.matrixWorld);

          minY = Math.min(minY, vA.y, vB.y, vC.y);
          maxY = Math.max(maxY, vA.y, vB.y, vC.y);

          const triHeight = Math.max(vA.y, vB.y, vC.y) - Math.min(vA.y, vB.y, vC.y);
          edge1.subVectors(vB, vA);
          edge2.subVectors(vC, vA);
          const area = 0.5 * crossVec.crossVectors(edge1, edge2).length();

          // Subdivide tall strut triangles so long vertical/diagonal iron beams are densely sampled along their full length
          const samplesPerTri = Math.min(48, Math.max(2, Math.ceil(triHeight * 26.0 + area * 32.0)));
          for (let s = 0; s < samplesPerTri; s++) {
            const seed = triCounter * 53 + s * 19;
            const r1 = Math.sqrt(hash(seed + 1));
            const r2 = hash(seed + 2);
            const wA = 1.0 - r1;
            const wB = r1 * (1.0 - r2);
            const wC = r1 * r2;
            rawSurfacePoints.push(
              new THREE.Vector3(
                vA.x * wA + vB.x * wB + vC.x * wC,
                vA.y * wA + vB.y * wB + vC.y * wC,
                vA.z * wA + vB.z * wB + vC.z * wC
              )
            );
          }
          triCounter++;
        }
      }
    });

    if (rawSurfacePoints.length < 100 || !Number.isFinite(minY) || !Number.isFinite(maxY)) return;

    const totalHeight = Math.max(1.0, maxY - minY);
    this.eiffelNightUniforms.uEiffelCenter.value.set(centerX, minY, centerZ);
    this.eiffelNightUniforms.uEiffelTotalHeight.value = totalHeight;

    // Cover from the base of the 4 legs (minY) up to the top of the 3rd-floor lantern (91.5% height, below thin radio needle)
    const usableMinY = minY + totalHeight * 0.015;
    const usableMaxY = minY + totalHeight * 0.915;
    const usableSpan = Math.max(0.5, usableMaxY - usableMinY);

    const NUM_BANDS = 44;
    const bands: THREE.Vector3[][] = Array.from({ length: NUM_BANDS }, () => []);

    for (const pt of rawSurfacePoints) {
      if (pt.y < usableMinY || pt.y > usableMaxY) continue;
      const bIdx = Math.min(
        NUM_BANDS - 1,
        Math.max(0, Math.floor(((pt.y - usableMinY) / usableSpan) * NUM_BANDS))
      );
      bands[bIdx].push(pt);
    }

    // Deterministically shuffle each vertical band so all 4 legs and all 4 faces are interleaved
    for (let b = 0; b < NUM_BANDS; b++) {
      const bucket = bands[b];
      for (let i = bucket.length - 1; i > 0; i--) {
        const j = Math.floor(hash(b * 997 + i * 31) * (i + 1));
        const tmp = bucket[i];
        bucket[i] = bucket[j];
        bucket[j] = tmp;
      }
      // Fallback if any band is sparse: borrow from nearest non-empty band
      if (bucket.length === 0) {
        for (let offset = 1; offset < NUM_BANDS; offset++) {
          const lower = b - offset >= 0 ? bands[b - offset] : [];
          const upper = b + offset < NUM_BANDS ? bands[b + offset] : [];
          const donor = lower.length > 0 ? lower : upper;
          if (donor.length > 0) {
            const targetY = usableMinY + ((b + 0.5) / NUM_BANDS) * usableSpan;
            for (let k = 0; k < Math.min(16, donor.length); k++) {
              const p = donor[k].clone();
              p.y = targetY;
              bucket.push(p);
            }
            break;
          }
        }
      }
    }

    // 1. Update 640 soft dark-orange/golden bloom points across all 44 height bands (inset slightly toward tower interior)
    const lampPosAttr = this.eiffelNightLampsPoints.geometry.getAttribute('position') as THREE.BufferAttribute;
    if (lampPosAttr) {
      const lampCount = lampPosAttr.count;
      for (let i = 0; i < lampCount; i++) {
        // Slightly more bloom density in the wide lower legs & platforms, smooth all the way to summit
        const hFrac = Math.pow((i + 0.5) / lampCount, 0.90);
        const bIdx = Math.min(NUM_BANDS - 1, Math.floor(hFrac * NUM_BANDS));
        const bucket = bands[bIdx];
        if (bucket.length === 0) continue;
        const v = bucket[(i * 11 + 5) % bucket.length];
        const dx = v.x - centerX;
        const dz = v.z - centerZ;
        const inset = 0.76 + 0.16 * hash(i * 17 + 3);
        lampPosAttr.setXYZ(i, centerX + dx * inset, v.y, centerZ + dz * inset);
      }
      lampPosAttr.needsUpdate = true;
    }

    // 2. Update 1,500 diamond xenon strobes across all 44 vertical bands from base legs to summit
    const sparklePosAttr = this.eiffelSparklePoints.geometry.getAttribute('position') as THREE.BufferAttribute;
    if (sparklePosAttr) {
      const sparkleCount = sparklePosAttr.count;
      for (let i = 0; i < sparkleCount; i++) {
        const hFrac = Math.pow((i + 0.5) / sparkleCount, 0.86);
        const bIdx = Math.min(NUM_BANDS - 1, Math.floor(hFrac * NUM_BANDS));
        const bucket = bands[bIdx];
        if (bucket.length === 0) continue;
        const v = bucket[(i * 13 + 7) % bucket.length];
        sparklePosAttr.setXYZ(i, v.x, v.y, v.z);
      }
      sparklePosAttr.needsUpdate = true;
    }
  }

  /**
   * Loads the custom Blender-crafted 3D monument models from /models/paris_monuments.glb
   */
  private loadBlenderMonumentsGLB(): void {
    const loader = new GLTFLoader();
    const glbUrl = `./models/${ACTIVE_CITY_ID}_monuments.glb?v=20261016a`;
    loader.load(
      glbUrl,
      (gltf) => {
        const scene = gltf.scene;
        const monumentMap = new Map<string, ParisMonumentData>();
        for (const m of PARIS_MONUMENTS) {
          monumentMap.set(m.id, m);
        }

        // Remove initial coarse fallback hit spheres once the exact 3D monument geometry is loaded
        for (const target of this.monumentTargets) {
          this.hitProxyRoot.remove(target.mesh);
          target.mesh.geometry.dispose();
        }
        this.monumentTargets.length = 0;
        this.raycastEntries.length = 0;

        for (const placement of BLENDER_MONUMENT_PLACEMENTS) {
          const sourceNode = scene.getObjectByName(placement.glbNodeName);
          if (!sourceNode) continue;

          const clone = sourceNode.clone(true);

          // Normalize Sacré-Cœur scaffolding child offset so it centers on (0, 0, 0) like Sacré-Cœur
          if (placement.glbNodeName === 'monument-sacre-coeur-scaffolding') {
            for (const child of clone.children) {
              child.position.x -= 12.0;
            }
          }

          // Compute clone-local mesh bounding boxes while clone is at identity transform
          clone.position.set(0, 0, 0);
          clone.rotation.set(0, 0, 0);
          clone.scale.setScalar(1);
          clone.updateMatrixWorld(true);

          const monumentData = placement.monumentId
            ? monumentMap.get(placement.monumentId)
            : undefined;
          const isEiffel = placement.monumentId === ACTIVE_CITY_META.beaconMonumentId;
          const localMeshBoxes: THREE.Box3[] = [];
          const matCache = new Map<THREE.Material, THREE.Material>();
          const revealUniform = placement.monumentId
            ? this.getMonumentColorRevealUniform(placement.monumentId)
            : undefined;

          clone.traverse((child) => {
            if ((child as THREE.Mesh).isMesh && !child.userData?.isHitProxy) {
              const mesh = child as THREE.Mesh;
              mesh.castShadow = true;
              mesh.receiveShadow = true;

              if (monumentData) {
                mesh.userData = {
                  ...mesh.userData,
                  type: 'monument',
                  monument: monumentData,
                  isDirectMonumentMesh: true
                };
                if (!mesh.geometry.boundingBox) {
                  mesh.geometry.computeBoundingBox();
                }
                if (mesh.geometry.boundingBox) {
                  const box = mesh.geometry.boundingBox.clone().applyMatrix4(mesh.matrixWorld);
                  localMeshBoxes.push(box);
                }
              }

              if (mesh.material) {
                const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
                const clonedMats: THREE.Material[] = [];
                for (const origMat of mats) {
                  let m = matCache.get(origMat);
                  if (!m) {
                    m = origMat.clone();
                    if (isEiffel) {
                      applyEiffelMaterialShaderHook(m, this.eiffelNightUniforms, revealUniform);
                    } else {
                      applyPaperModelShaderHook(m, revealUniform);
                    }
                    const mName = m.name.toLowerCase();
                    const isGlass = mName.includes('glass');
                    if (isGlass && (m as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
                      const sm = m as THREE.MeshStandardMaterial;
                      sm.transparent = true;
                      sm.opacity = mName.includes('bnf') ? 0.56 : 0.76;
                    }
                    if (isEiffel && (m as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
                      const sm = m as THREE.MeshStandardMaterial;
                      this.eiffelMaterials.push({ mat: sm, baseColor: sm.color.clone() });
                    }
                    matCache.set(origMat, m);
                  }
                  clonedMats.push(m);
                }
                mesh.material = Array.isArray(mesh.material) ? clonedMats : clonedMats[0];
              }
            }
          });

          let pos = { x: 0, z: 0 };
          if (placement.monumentId) {
            pos = this.getMonumentCoords(placement.monumentId);
          } else if (placement.customLatLon) {
            pos = projectLatLon(placement.customLatLon[0], placement.customLatLon[1]);
          }

          const terrainY = getParisTerrainElevation(pos.x, pos.z);
          clone.position.set(pos.x, (placement.baseY ?? 0.02) + terrainY, pos.z);
          clone.rotation.set(0, placement.rotationY, 0);
          clone.scale.setScalar(placement.scale);

          // Populate Eiffel lights BEFORE merging child meshes so triangle order is 100% identical
          if (isEiffel) {
            this.populateEiffelLightsFromMesh(clone, pos.x, pos.z);
          }

          // Merge child meshes sharing the same material inside monument clone (1,865 meshes -> ~30 meshes)
          mergeGroupMeshesByMaterial(clone as THREE.Group, true);

          this.rootGroup.add(clone);

          let proxyGroup: THREE.Group | null = null;
          if (monumentData && localMeshBoxes.length > 0) {
            proxyGroup = new THREE.Group();
            proxyGroup.position.copy(clone.position);
            proxyGroup.rotation.copy(clone.rotation);
            proxyGroup.scale.copy(clone.scale);
            this.buildFittedMonumentHitProxies(
              proxyGroup,
              monumentData,
              placement.glbNodeName,
              placement.scale,
              localMeshBoxes
            );
            proxyGroup.updateMatrixWorld(true);
            this.hitProxyRoot.add(proxyGroup);
          }

          const worldBox = new THREE.Box3().setFromObject(clone);
          if (proxyGroup) {
            worldBox.expandByObject(proxyGroup);
          }
          worldBox.expandByScalar(0.15);

          const entry: MonumentRaycastEntry = {
            obj: clone,
            proxyGroup,
            worldBox,
            minYear: placement.minYear,
            maxYear: placement.maxYear,
            monumentId: placement.monumentId,
            monumentData
          };
          this.yearObjects.push(entry);
          if (monumentData) {
            this.raycastEntries.push(entry);
          }
        }

        this.glbLoaded = true;
        this.updateYear(this.currentYear);
        this.setOvergroundOpacity(this.currentOpacity);
        this.syncOutlineLayer();
        this.onGeometryLoaded?.();
      },
      undefined,
      (err) => {
        console.error('Error loading Blender monuments GLB:', err);
      }
    );
  }

  /**
   * Builds 4-tier vertically sliced Oriented Bounding Box (OBB) hit proxies inside `clone`
   * so open lattice work (Eiffel Tower), slender spires/needles (Obelisk, Bastille Column,
   * Notre-Dame & Sainte-Chapelle spires), and monument courtyards have zero dead spots
   * while remaining tightly aligned to the 3D monument's silhouette and rotation.
   */
  private buildFittedMonumentHitProxies(
    clone: THREE.Object3D,
    monumentData: ParisMonumentData,
    glbNodeName: string,
    scale: number,
    localMeshBoxes: THREE.Box3[]
  ): void {
    const tmpCenter = new THREE.Vector3();
    // For Concorde + Madeleine, split into South (Obelisk + fountains) and North (La Madeleine)
    const boxGroups: THREE.Box3[][] =
      glbNodeName === 'monument-concorde-obelisk'
        ? [
            localMeshBoxes.filter((b) => b.getCenter(tmpCenter).z < -0.15),
            localMeshBoxes.filter((b) => b.getCenter(tmpCenter).z >= -0.15)
          ].filter((g) => g.length > 0)
        : [localMeshBoxes];

    const padXZ = 0.16 / Math.max(0.4, scale);
    const padY = 0.08 / Math.max(0.4, scale);
    const sliceCount = 4;

    for (const group of boxGroups) {
      const totalBox = new THREE.Box3();
      for (const b of group) {
        totalBox.union(b);
      }
      if (totalBox.isEmpty()) continue;

      const totalHeight = Math.max(0.2, totalBox.max.y - totalBox.min.y);
      for (let s = 0; s < sliceCount; s++) {
        const y0 = totalBox.min.y + (totalHeight * s) / sliceCount;
        const y1 = totalBox.min.y + (totalHeight * (s + 1)) / sliceCount;

        let minX = Infinity;
        let maxX = -Infinity;
        let minZ = Infinity;
        let maxZ = -Infinity;
        let hasOverlap = false;

        for (const b of group) {
          if (b.max.y >= y0 - 0.02 && b.min.y <= y1 + 0.02) {
            minX = Math.min(minX, b.min.x);
            maxX = Math.max(maxX, b.max.x);
            minZ = Math.min(minZ, b.min.z);
            maxZ = Math.max(maxZ, b.max.z);
            hasOverlap = true;
          }
        }
        if (!hasOverlap) continue;

        const sizeX = Math.max(0.32, maxX - minX + padXZ * 2);
        const sizeY = Math.max(0.24, y1 - y0 + (s === sliceCount - 1 ? padY * 2 : padY));
        const sizeZ = Math.max(0.32, maxZ - minZ + padXZ * 2);

        const proxyGeo = new THREE.BoxGeometry(sizeX, sizeY, sizeZ);
        const proxyMesh = new THREE.Mesh(proxyGeo, this.hitProxyMat);
        proxyMesh.position.set((minX + maxX) * 0.5, (y0 + y1) * 0.5, (minZ + maxZ) * 0.5);
        proxyMesh.userData = {
          type: 'monument',
          monument: monumentData,
          isDirectMonumentMesh: false,
          isHitProxy: true
        };
        clone.add(proxyMesh);
        this.monumentTargets.push({ mesh: proxyMesh, data: monumentData });
      }
    }
  }

  public getRaycastTargets(ray?: THREE.Ray): THREE.Object3D[] {
    if (this.glbLoaded) {
      const roots: THREE.Object3D[] = [];
      for (const entry of this.raycastEntries) {
        if (!entry.obj.visible) continue;
        if (ray && !ray.intersectsBox(entry.worldBox)) continue;
        roots.push(entry.obj);
        if (entry.proxyGroup) {
          roots.push(entry.proxyGroup);
        }
      }
      return roots;
    }
    return this.monumentTargets.filter((t) => t.mesh.scale.x > 0.1).map((t) => t.mesh);
  }

  public getOutlinedWorldBox(): THREE.Box3 | null {
    if (!this.outlinedMonumentId) return null;
    let box: THREE.Box3 | null = null;
    for (const entry of this.raycastEntries) {
      if (entry.monumentId === this.outlinedMonumentId && entry.obj.visible) {
        box = box ? box.union(entry.worldBox) : entry.worldBox.clone();
      }
    }
    return box;
  }

  public setOutlinedMonument(monumentId: string | null): void {
    if (this.outlinedMonumentId === monumentId) return;
    this.outlinedMonumentId = monumentId;
    this.syncOutlineLayer();
  }

  public setSelectedMonument(monumentId: string | null): void {
    if (this.selectedMonumentId === monumentId) return;
    this.selectedMonumentId = monumentId;
    this.syncColorRevealUniforms();
  }

  public hasOutlinedMonument(): boolean {
    return this.outlinedMonumentId !== null;
  }

  private syncColorRevealUniforms(): void {
    for (const [monId, uniform] of this.monumentColorRevealUniforms.entries()) {
      const isRevealed =
        (this.outlinedMonumentId !== null && monId === this.outlinedMonumentId) ||
        (this.selectedMonumentId !== null && monId === this.selectedMonumentId);
      uniform.value = isRevealed ? 1.0 : 0.0;
    }
  }

  private syncOutlineLayer(): void {
    this.syncColorRevealUniforms();

    for (const item of this.yearObjects) {
      if (!item.monumentId) continue;
      const shouldOutline =
        this.outlinedMonumentId !== null &&
        item.monumentId === this.outlinedMonumentId &&
        item.obj.visible;
      item.obj.traverse((child) => {
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

  private buildHitTargets(): void {
    for (const m of PARIS_MONUMENTS) {
      const hitGeo = new THREE.CylinderGeometry(1.3, 1.5, 2.8, 12);
      const mesh = new THREE.Mesh(hitGeo, this.hitProxyMat);
      const terrainY = getParisTerrainElevation(m.x, m.z);
      mesh.position.set(m.x, 1.4 + terrainY, m.z);
      mesh.userData = {
        type: 'monument',
        monument: m,
        isDirectMonumentMesh: false,
        isHitProxy: true
      };
      this.hitProxyRoot.add(mesh);
      this.monumentTargets.push({ mesh, data: m });
    }
    this.hitProxyRoot.updateMatrixWorld(true);
  }

  public updateYear(year: number): void {
    this.currentYear = year;
    for (const item of this.yearObjects) {
      const vis = year >= item.minYear && year <= item.maxYear;
      item.obj.visible = vis;
      if (item.proxyGroup) {
        item.proxyGroup.visible = vis;
      }
    }
    if (!this.glbLoaded) {
      for (const target of this.monumentTargets) {
        const startYr = target.data.constructionStartYear ?? target.data.builtYear;
        target.mesh.scale.setScalar(year >= startYr ? 1 : 0.0001);
      }
      this.hitProxyRoot.updateMatrixWorld(true);
    }
    this.syncOutlineLayer();
  }

  /**
   * Controls visibility of the monument group when the Overground Layer is faded.
   * Individual monument materials always remain 100% opaque with hardware depth-testing;
   * semi-transparency is performed as a single fullscreen layer composite in SceneManager.
   */
  public setOvergroundOpacity(opacity: number): void {
    this.currentOpacity = opacity;
    const clamped = Math.max(0.0, Math.min(1.0, opacity));
    this.rootGroup.visible = clamped > 0.01;
  }

  public updateAnimation(elapsedTime: number, timeOfDayHours = 14.5): void {
    this.eiffelBeaconGroup.rotation.y = elapsedTime * 0.52;

    // Compute smooth nighttime factor [0..1]: 1.0 at night (20:30..05:30), 0.0 during day (07:15..18:15)
    const h = ((timeOfDayHours % 24) + 24) % 24;
    let nightFactor = 0.0;
    if (h >= 20.5 || h <= 5.5) {
      nightFactor = 1.0;
    } else if (h > 18.2 && h < 20.5) {
      const u = (h - 18.2) / (20.5 - 18.2);
      nightFactor = u * u * (3.0 - 2.0 * u);
    } else if (h > 5.5 && h < 7.3) {
      const u = 1.0 - (h - 5.5) / (7.3 - 5.5);
      nightFactor = u * u * (3.0 - 2.0 * u);
    }

    const eiffelBuilt = this.currentYear >= 1889 ? 1.0 : 0.0;
    const activeNight = nightFactor * eiffelBuilt;

    // 1. Volumetric searchlight cones & summit lantern orb (only visible at night!)
    this.beaconCoreMat.uniforms.uNightFactor.value = activeNight;
    this.beaconHaloMat.uniforms.uNightFactor.value = activeNight;
    this.beaconLanternOrbMat.opacity = activeNight * 0.95;
    this.eiffelBeaconGroup.visible = activeNight > 0.005;

    // 2. Dark iron silhouette framing glowing dark-orange to golden-amber floodlight gradients + soft bloom halo at night
    const isEiffelFocused =
      this.outlinedMonumentId === 'monument-eiffel' ||
      this.selectedMonumentId === 'monument-eiffel';
    const paperDim = isEiffelFocused ? 1.0 : 1.0 - PAPER_MODEL_UNIFORM.value * 0.75;
    const effectiveNight = Math.max(activeNight, this.manualEiffelSparkle ? eiffelBuilt * 0.72 : 0.0);
    this.eiffelNightUniforms.uEiffelNight.value = effectiveNight;
    for (const entry of this.eiffelMaterials) {
      entry.mat.emissive.setHex(0x000000);
      entry.mat.emissiveIntensity = 0.0;
      entry.mat.color.copy(entry.baseColor);
    }
    this.eiffelNightLampsMat.uniforms.uNightIntensity.value = effectiveNight * paperDim;
    this.eiffelNightLampsPoints.visible = effectiveNight > 0.01;
    this.eiffelNightLight.intensity = effectiveNight * 1.35 * paperDim;

    // 3. Hourly Diamond Glitter (Scintillement de la Tour Eiffel) + Manual UI Sparkle Trigger:
    // Sparkles at night on the hour (first/last 8 minutes of every hour on the time-of-day clock,
    // PLUS a 5-second live showcase burst every 15 seconds of real time whenever it is night),
    // OR continuously whenever the user activates the "✨ Sparkle Eiffel" button in the UI!
    const minuteOfHour = (h * 60.0) % 60.0;
    let clockHourSparkle = 0.0;
    if (minuteOfHour < 8.0) {
      clockHourSparkle = 1.0 - smoothstepEdge(6.0, 8.0, minuteOfHour);
    } else if (minuteOfHour > 52.0) {
      clockHourSparkle = smoothstepEdge(52.0, 54.0, minuteOfHour);
    }

    const cycleSec = elapsedTime % 15.0;
    let liveCycleSparkle = 0.0;
    if (cycleSec < 5.2) {
      liveCycleSparkle =
        smoothstepEdge(0.0, 0.6, cycleSec) * (1.0 - smoothstepEdge(4.4, 5.2, cycleSec));
    }

    const autoSparkle = activeNight * Math.max(clockHourSparkle, liveCycleSparkle);
    const sparkleStrength = this.manualEiffelSparkle ? eiffelBuilt : autoSparkle;
    this.eiffelSparkleMat.uniforms.uTime.value = elapsedTime;
    this.eiffelSparkleMat.uniforms.uSparkleIntensity.value = sparkleStrength;
    this.eiffelSparklePoints.visible = sparkleStrength > 0.01;
  }
}

function smoothstepEdge(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0.0, Math.min(1.0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3.0 - 2.0 * t);
}
