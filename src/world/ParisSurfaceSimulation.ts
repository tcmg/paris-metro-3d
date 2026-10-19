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

import * as THREE from 'three';
import {
  PARIS_BRIDGES,
  PARIS_PLACES,
  PARIS_ROADS,
  projectLatLon
} from '../data/parisGeoData';
import { getParisTerrainElevation } from '../data/parisHistoricalData';

/**
 * Top-level simulation domains supported in Paris:
 * - 'none': Standard historical / architectural exploration (simulation overlay hidden)
 * - 'traffic': Autonomous surface vehicles, commuter streams, multi-phase signals & congestion
 * - 'marathon': 42.195 km Marathon de Paris (Planning predictions -> Live race, closures & detours)
 * - 'heatwave': Canicule 44°C (Urban heat domes, SAMU ambulance dispatch & overwhelmed AP-HP hospitals)
 * - 'protest': Grande Manifestation & Unrest (Cortège crowds, looted storefronts, building fires & CRS barricades)
 * - 'flood': Crue Centennale de la Seine +8.6m (Rising 3D floodwaters, submerged quais & flooded Metro stations)
 * - 'cyberattack': City-wide SCADA Cyberattack (Glitched traffic signals, halted automated Metro lines & district blackouts)
 */
export type ParisSimulationModeId =
  | 'none'
  | 'traffic'
  | 'marathon'
  | 'heatwave'
  | 'protest'
  | 'flood'
  | 'cyberattack';

/**
 * Every simulation domain supports a two-stage lifecycle:
 * 1. 'planning': Predictive risk model — highlights where congestion, hospital overload,
 *    storefront damage, flood breaches, or SCADA failures WILL occur, with 3D warning beacons.
 * 2. 'live': Active organic simulation — runs the live event in 3D, mutates city traffic/commuters/environment,
 *    and records a chronological event & impact log.
 */
export type ParisSimulationPhaseId = 'planning' | 'live';

export type ParisScenarioPresetId =
  | 'normal_flow'
  | 'rush_hour'
  | 'marathon_de_paris'
  | 'heatwave_44c'
  | 'protest_republique'
  | 'seine_flood_8m'
  | 'cyber_gridlock';

export type LightState = 'green' | 'yellow' | 'red';

export interface ParisRoadNode {
  id: number;
  name?: string;
  position: THREE.Vector3;
}

export interface ParisRoadEdge {
  id: number;
  name: string;
  tier: 'grand_boulevard' | 'avenue' | 'street' | 'peripherique' | 'bridge' | 'quai';
  from: number;
  to: number;
  points: THREE.Vector3[];
  lengthWorld: number;
}

/**
 * 3D-Anchored Callout Hotspot rendered both as a 3D beacon/dome in the world
 * AND projected to a floating HTML badge over the 3D map.
 */
export interface ParisWorldHotspot {
  id: string;
  domain: ParisSimulationModeId;
  phase: 'planning' | 'live' | 'both';
  title: string;
  locationName: string;
  x: number;
  y: number;
  z: number;
  severity: 'warning' | 'critical' | 'info' | 'nominal';
  colorHex: string;
  planningPrediction: string;
  liveStatus: string;
  metricBadge: string;
  radius: number;
}

/**
 * Chronological event log entry recorded during the Live Simulation phase
 * (and predictive warnings listed during the Planning phase).
 */
export interface ParisSimulationEventLogItem {
  id: string;
  simTimeLabel: string;
  severity: 'warning' | 'critical' | 'info' | 'resolved';
  category: string;
  headline: string;
  detail: string;
  x: number;
  y: number;
  z: number;
  colorHex: string;
}

export interface ParisHeroProbe {
  id: string;
  name: string;
  role: string;
  tierLabel: 'Tier 2 • Hero Probe';
  category: 'marathon' | 'traffic' | 'transit' | 'emergency';
  colorHex: string;
  position: THREE.Vector3;
  locationLabel: string;
  metricPrimary: string;
  metricSecondary: string;
  statusBadge: string;
  innerThoughts: string[];
  currentThoughtIdx: number;
}

export interface ParisMacroControllerCard {
  id: string;
  agentName: string;
  roleBadge: string;
  accentHex: string;
  status: 'nominal' | 'advisory' | 'intervention';
  headline: string;
  recommendation: string;
  metricSummary: string;
  actionLabel: string;
  actionDomain: ParisSimulationModeId;
  actionPhase: ParisSimulationPhaseId;
}

export interface A2uiComponentDef {
  id: string;
  component: {
    Card?: { children: string[] };
    Column?: { children: string[] };
    Row?: { children: string[] };
    Tabs?: { tabItems: { title: string; child: string }[] };
    Divider?: { axis: 'horizontal' | 'vertical' };
    Text?: {
      text: string;
      usageHint?:
        | 'h1'
        | 'h2'
        | 'h3'
        | 'subtitle'
        | 'body'
        | 'caption'
        | 'badge'
        | 'grade'
        | 'metric_val'
        | 'metric_label';
    };
    Button?: {
      label: string;
      primary?: boolean;
      variant?: 'rerun' | 'plan' | 'learn';
      action: { name: 'rerun_simulation' | 'return_to_plan' | 'return_to_learn' };
    };
  };
}

export interface ParisA2uiSurfacePayload {
  surfaceId: string;
  rootComponentId: string;
  components: A2uiComponentDef[];
}

export interface ParisSimulationReportCard {
  simulationId: string;
  mode: ParisSimulationModeId;
  domainTitle: string;
  durationWallSec: number;
  simulatedHours: number;
  totalTicksCompiled: number;
  mitigationApplied: boolean;
  resilienceScore: number;
  resilienceGrade: 'A' | 'A-' | 'B+' | 'B' | 'C+' | 'C' | 'D';
  gradeColorHex: string;
  executiveSummary: string;
  kpiComparisons: {
    label: string;
    plannedForecast: string;
    actualOutcome: string;
    deltaVerdict: string;
    tone: 'nominal' | 'warning' | 'critical';
  }[];
  vitalsTrend: {
    tick: number;
    simTimeLabel: string;
    avgSpeedKmh: number;
    congestionPct: number;
  }[];
  recordedEvents: ParisSimulationEventLogItem[];
  agentPostMortem: {
    agentName: string;
    roleBadge: string;
    finding: string;
    nextStepRecommendation: string;
  }[];
  a2uiSurface: ParisA2uiSurfacePayload;
}

export interface ParisSimulationTelemetry {
  mode: ParisSimulationModeId;
  phase: ParisSimulationPhaseId;
  scenario: ParisScenarioPresetId;
  simElapsedSec: number;
  simClockLabel: string;
  // Race Condition Run Lifecycle & Controls
  targetDurationSec: number;
  runElapsedSec: number;
  runRemainingSec: number;
  runProgressPct: number;
  simSpeedMultiplier: 1 | 2 | 4;
  isPaused: boolean;
  isCompleted: boolean;
  simulatedElapsedHours: number;
  simulatedElapsedMins: number;
  // Entity & Graph Counts
  activeCarsCount: number;
  activeCommutersCount: number;
  totalRoadNodes: number;
  totalRoadEdges: number;
  closedEdgesCount: number;
  activeSignalizedIntersections: number;
  avgTrafficSpeedKmh: number;
  congestionIndexPct: number;
  activeMarathonRunners: number;
  marathonCourseKm: number;
  signalsEnabled: boolean;
  congestionHeatmapEnabled: boolean;
  marathonClosuresEnabled: boolean;
  // Domain-specific headline metrics for the active mode/phase
  domainTitle: string;
  phaseBannerTitle: string;
  phaseBannerSubtitle: string;
  kpi1Label: string;
  kpi1Value: string;
  kpi2Label: string;
  kpi2Value: string;
  kpi3Label: string;
  kpi3Value: string;
  kpi4Label: string;
  kpi4Value: string;
  mitigationActive: boolean;
  mitigationLabel: string;
}

// ── Scale Constants for City-Scale Visibility in Paris (1 km = 11.2 world units) ──
// Sized so vehicles, commuters, signals, and hazard columns are unmistakably visible
// from full-city overview (camera y=55) down to street level (camera y=12).

const SNAP_TOLERANCE = 0.85;
const LANE_OFFSET = 0.14;
const CAR_WIDTH = 0.24;
const CAR_HEIGHT = 0.19;
const CAR_LENGTH = 0.52;
const MAX_SPEED = 3.2;
const ACCELERATION = 2.4;
const BRAKING = 5.4;
const SAFE_DISTANCE = 0.82;
const STOP_DISTANCE = 0.36;
const INTERSECTION_STOP_LINE = 0.48;
const INTERSECTION_LOOK_AHEAD = 1.65;

const GREEN_DURATION = 6.5;
const YELLOW_DURATION = 1.6;
const RED_GAP = 0.4;
const LIGHT_HEIGHT = 0.65;
const LIGHT_OFFSET = 0.36;

// ── Geometry & Graph Helpers ─────────────────────────────────────────────────

function segmentIntersection2D(
  ax: number,
  az: number,
  bx: number,
  bz: number,
  cx: number,
  cz: number,
  dx: number,
  dz: number
): { t: number; u: number } | null {
  const denom = (bx - ax) * (dz - cz) - (bz - az) * (dx - cx);
  if (Math.abs(denom) < 1e-9) return null;
  const t = ((cx - ax) * (dz - cz) - (cz - az) * (dx - cx)) / denom;
  const u = ((cx - ax) * (bz - az) - (cz - az) * (bx - ax)) / denom;
  if (t > 0.02 && t < 0.98 && u > 0.02 && u < 0.98) {
    return { t, u };
  }
  return null;
}

function pointToSegmentProjection2D(
  px: number,
  pz: number,
  ax: number,
  az: number,
  bx: number,
  bz: number
): { t: number; dist: number; projX: number; projZ: number } {
  const dx = bx - ax;
  const dz = bz - az;
  const lenSq = dx * dx + dz * dz;
  if (lenSq < 1e-9) {
    return { t: 0, dist: Math.hypot(px - ax, pz - az), projX: ax, projZ: az };
  }
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (pz - az) * dz) / lenSq));
  const projX = ax + t * dx;
  const projZ = az + t * dz;
  return { t, dist: Math.hypot(px - projX, pz - projZ), projX, projZ };
}

function computePolylineDistances(points: THREE.Vector3[]): {
  cumDist: number[];
  totalDist: number;
} {
  const cumDist: number[] = [0];
  let totalDist = 0;
  for (let i = 1; i < points.length; i++) {
    totalDist += points[i].distanceTo(points[i - 1]);
    cumDist.push(totalDist);
  }
  return { cumDist, totalDist: Math.max(0.001, totalDist) };
}

function buildRibbonGeometry(
  points: THREE.Vector3[],
  width: number,
  yOffset: number
): THREE.BufferGeometry {
  const halfW = width * 0.5;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  let runningLen = 0;
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    if (i > 0) {
      runningLen += p.distanceTo(points[i - 1]);
    }
    let tx = 1;
    let tz = 0;
    if (i < points.length - 1) {
      tx = points[i + 1].x - p.x;
      tz = points[i + 1].z - p.z;
    } else if (i > 0) {
      tx = p.x - points[i - 1].x;
      tz = p.z - points[i - 1].z;
    }
    const len = Math.hypot(tx, tz) || 1;
    const nx = -tz / len;
    const nz = tx / len;

    const py = p.y + yOffset;
    positions.push(p.x + nx * halfW, py, p.z + nz * halfW);
    positions.push(p.x - nx * halfW, py, p.z - nz * halfW);
    uvs.push(0, runningLen);
    uvs.push(1, runningLen);

    if (i < points.length - 1) {
      const base = i * 2;
      indices.push(base, base + 1, base + 2);
      indices.push(base + 1, base + 3, base + 2);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

// ── Authentic 42.195 km Schneider Electric Marathon de Paris Course (WGS84) ──

const MARATHON_DE_PARIS_WAYPOINTS_LATLON: [number, number][] = [
  [48.8722, 2.3018], // Start: Avenue des Champs-Élysées
  [48.8656, 2.3212], // Place de la Concorde
  [48.8608, 2.3358], // Rue de Rivoli (Louvre)
  [48.8568, 2.3522], // Hôtel de Ville / Châtelet
  [48.8532, 2.3692], // Place de la Bastille (KM 5)
  [48.8484, 2.3959], // Place de la Nation
  [48.8442, 2.4145], // Porte Dorée (KM 10)
  [48.8428, 2.4365], // Château de Vincennes
  [48.8312, 2.4395], // Bois de Vincennes Loop (KM 15)
  [48.8365, 2.4085], // Porte de Charenton
  [48.8475, 2.3855], // Rue de Charenton (KM 21.1 Halfway)
  [48.8515, 2.3665], // Bassin de l'Arsenal
  [48.8528, 2.3545], // Quai des Célestins (KM 25)
  [48.8595, 2.3335], // Voie Georges-Pompidou / Tuileries Tunnel
  [48.8638, 2.3022], // Pont de l'Alma (KM 28)
  [48.8575, 2.2865], // Quai de Passy / Bir-Hakeim (Eiffel View)
  [48.8462, 2.2695], // Quai Saint-Exupéry / Mirabeau (KM 32)
  [48.8475, 2.2565], // Porte d'Auteuil (KM 35)
  [48.8585, 2.2485], // Bois de Boulogne — Hippodrome d'Auteuil
  [48.8658, 2.2595], // Lac Inférieur du Bois de Boulogne (KM 39)
  [48.8705, 2.2745], // Porte Dauphine (KM 41)
  [48.8726, 2.2865]  // Finish: Avenue Foch (42.195 km)
];

const PARIS_SEINE_QUAI_ROADS: {
  name: string;
  tier: ParisRoadEdge['tier'];
  points: [number, number][];
}[] = [
  {
    name: 'Quais Rive Droite (Bercy → Louvre → Alma → Auteuil)',
    tier: 'quai',
    points: [
      [48.8355, 2.3845],
      [48.8452, 2.3735],
      [48.8528, 2.3565],
      [48.8568, 2.3485],
      [48.8598, 2.3355],
      [48.8638, 2.3212],
      [48.8642, 2.3022],
      [48.8582, 2.2875],
      [48.8468, 2.2712],
      [48.8415, 2.2625]
    ]
  },
  {
    name: 'Quais Rive Gauche (Austerlitz → Saint-Michel → Orsay → Javel)',
    tier: 'quai',
    points: [
      [48.8332, 2.3805],
      [48.8435, 2.3665],
      [48.8502, 2.3525],
      [48.8535, 2.3442],
      [48.8578, 2.3315],
      [48.8615, 2.3185],
      [48.8622, 2.3012],
      [48.8555, 2.2895],
      [48.8448, 2.2752],
      [48.8392, 2.2665]
    ]
  }
];

// ── Multi-Domain Hotspots & Predictive Warning Nodes ─────────────────────────

interface HotspotBlueprint {
  id: string;
  domain: ParisSimulationModeId;
  title: string;
  locationName: string;
  lat: number;
  lon: number;
  severity: 'warning' | 'critical' | 'info' | 'nominal';
  colorHex: string;
  planningPrediction: string;
  liveStatus: string;
  metricBadge: string;
  radius: number;
}

const DOMAIN_HOTSPOT_BLUEPRINTS: HotspotBlueprint[] = [
  // 1. TRAFFIC RUSH HOUR HOTSPOTS
  {
    id: 'tf-etoile',
    domain: 'traffic',
    title: 'Étoile 12-Avenue Gyratory',
    locationName: 'Place Charles de Gaulle',
    lat: 48.8738,
    lon: 2.295,
    severity: 'critical',
    colorHex: '#ff4757',
    planningPrediction: 'Predicted 12-spoke merge saturation (92% capacity) at evening peak.',
    liveStatus: 'Heavy rotary queuing across Champs-Élysées, Grande Armée & Kléber.',
    metricBadge: '92% SATURATION',
    radius: 2.6
  },
  {
    id: 'tf-opera',
    domain: 'traffic',
    title: 'Carrefour Opéra & Haussmann',
    locationName: 'Place de l’Opéra (9e)',
    lat: 48.8708,
    lon: 2.3322,
    severity: 'warning',
    colorHex: '#f59e0b',
    planningPrediction: 'Grands Boulevards bus + taxi conflict predicted (+19 min delay).',
    liveStatus: 'Multi-phase signal cycle holding 34 vehicles on Bd Haussmann.',
    metricBadge: '+19 MIN DELAY',
    radius: 2.2
  },
  {
    id: 'tf-chatelet',
    domain: 'traffic',
    title: 'Châtelet – Rivoli / Sébastopol',
    locationName: 'Place du Châtelet (1er)',
    lat: 48.8584,
    lon: 2.3475,
    severity: 'critical',
    colorHex: '#ff4757',
    planningPrediction: 'North–South Bd de Sébastopol & East–West Rivoli cross-flow bottleneck.',
    liveStatus: 'High commuter & vehicle density; RATP Line 1/4 absorbing surface load.',
    metricBadge: '89% CONGESTION',
    radius: 2.4
  },
  {
    id: 'tf-republique',
    domain: 'traffic',
    title: 'Place de la République Hub',
    locationName: 'Place de la République (3e/10e/11e)',
    lat: 48.8675,
    lon: 2.3638,
    severity: 'warning',
    colorHex: '#f59e0b',
    planningPrediction: 'Predicted 7-boulevard convergence delay (+16 min) toward Gare de l’Est.',
    liveStatus: 'Active signal priority balancing Magenta, Voltaire & Temple flows.',
    metricBadge: '78% LOAD',
    radius: 2.2
  },

  // 2. MARATHON DE PARIS (PLANNING WARNINGS -> LIVE IMPACT)
  {
    id: 'ma-concorde',
    domain: 'marathon',
    title: 'Concorde & Rue Royale Severance',
    locationName: 'Place de la Concorde (8e)',
    lat: 48.8656,
    lon: 2.3212,
    severity: 'critical',
    colorHex: '#ff4757',
    planningPrediction: '⚠️ PREDICTION: Closing Concorde severs N–S bridge crossings (+34 min queue on Bd Malesherbes).',
    liveStatus: '🚨 LIVE IMPACT: 38 cross-axis vehicles rerouted via Pont Alexandre III; 4,200 runners/hr passing.',
    metricBadge: '+34M DELAY • KM 2.1',
    radius: 2.8
  },
  {
    id: 'ma-chatelet',
    domain: 'marathon',
    title: 'Rivoli / Châtelet Transit Spillover',
    locationName: 'Hôtel de Ville / Châtelet (1er/4e)',
    lat: 48.8568,
    lon: 2.3522,
    severity: 'warning',
    colorHex: '#f59e0b',
    planningPrediction: '⚠️ PREDICTION: Rue de Rivoli closure will push +22,000 spectators & commuters into Metro Line 1 & 14.',
    liveStatus: '🚇 LIVE IMPACT: Metro Line 1 & 14 running 85s headways; Bd de Sébastopol blocked by Préfecture barriers.',
    metricBadge: '+22K METRO SURGE',
    radius: 2.5
  },
  {
    id: 'ma-bastille',
    domain: 'marathon',
    title: 'Bastille Hydration & Rotary Lock',
    locationName: 'Place de la Bastille (4e/11e/12e)',
    lat: 48.8532,
    lon: 2.3692,
    severity: 'critical',
    colorHex: '#ff4757',
    planningPrediction: '⚠️ PREDICTION: Double marathon pass (KM 5 & KM 23) will lock Faubourg Saint-Antoine & Bd Beaumarchais.',
    liveStatus: '🚨 LIVE IMPACT: Dense 3h30 & 4h00 runner packs converging; Eastbound surface traffic diverted to Nation.',
    metricBadge: 'DOUBLE PASS • KM 5/23',
    radius: 2.7
  },
  {
    id: 'ma-vincennes',
    domain: 'marathon',
    title: 'Bois de Vincennes Halfway Loop',
    locationName: 'Château de Vincennes (12e)',
    lat: 48.8428,
    lon: 2.4285,
    severity: 'info',
    colorHex: '#00e5ff',
    planningPrediction: '📋 PLAN: 11 km park loop & KM 21.1 Halfway timing mat; Porte Dorée Périphérique ramp watch.',
    liveStatus: '🏃 LIVE IMPACT: Elite & 3h00 pace packs clearing Halfway mat at 1:04:12; medical tent nominal.',
    metricBadge: 'HALFWAY • 21.1 KM',
    radius: 2.6
  },
  {
    id: 'ma-alma',
    domain: 'marathon',
    title: 'Pont de l’Alma & Quais Underpass',
    locationName: 'Place de l’Alma (8e/16e)',
    lat: 48.8638,
    lon: 2.3022,
    severity: 'critical',
    colorHex: '#ff4757',
    planningPrediction: '⚠️ PREDICTION: KM 28 tunnel exit climbs +4.5% grade; SAMU heat-exhaustion & cramp hotspot predicted.',
    liveStatus: '🚑 LIVE IMPACT: SAMU 75 UMH #03 treating 14 fatigued runners at Alma exit; Quai Rive Droite closed.',
    metricBadge: 'KM 28 WALL • SAMU',
    radius: 2.5
  },
  {
    id: 'ma-foch',
    domain: 'marathon',
    title: 'Avenue Foch Finish & Étoile Dispersal',
    locationName: 'Avenue Foch / Porte Dauphine (16e)',
    lat: 48.8726,
    lon: 2.2865,
    severity: 'nominal',
    colorHex: '#f4c430',
    planningPrediction: '📋 PLAN: 42.195 km Finish Gantry; Line 2 Porte Dauphine & Line 1 Argentine crowd evacuation.',
    liveStatus: '🏁 LIVE IMPACT: Finishers crossing Avenue Foch gantry; 1,850 finishers/hr dispersing to Metro Line 1 & 2.',
    metricBadge: 'FINISH • 42.195 KM',
    radius: 2.7
  },

  // 3. HEAT WAVE (CANICULE 44°C — HOSPITALS & AMBULANCES)
  {
    id: 'hw-hoteldieu',
    domain: 'heatwave',
    title: 'AP-HP Hôpital Hôtel-Dieu (Île de la Cité)',
    locationName: 'Parvis Notre-Dame (4e)',
    lat: 48.8542,
    lon: 2.3488,
    severity: 'critical',
    colorHex: '#ff2e43',
    planningPrediction: '⚠️ PREDICTION: Central tourist & zinc-roof heat island (+44.2°C) will breach Hôtel-Dieu ER capacity by 14:00.',
    liveStatus: '🏥 OVERWHELMED (104% ER): Diverting incoming SAMU ambulances to Pitié-Salpêtrière.',
    metricBadge: '🏥 104% OVERLOAD',
    radius: 2.6
  },
  {
    id: 'hw-salpetriere',
    domain: 'heatwave',
    title: 'AP-HP Hôpital Pitié-Salpêtrière',
    locationName: 'Boulevard de l’Hôpital (13e)',
    lat: 48.8385,
    lon: 2.3625,
    severity: 'warning',
    colorHex: '#f59e0b',
    planningPrediction: '⚠️ PREDICTION: Primary Level-1 heat-stroke trauma center; projected 94% ICU occupancy.',
    liveStatus: '🚑 ACTIVE SURGE (94% ICU): Receiving diverted SAMU 75 units from central Paris; cooling wards active.',
    metricBadge: '🏥 94% ICU SURGE',
    radius: 2.9
  },
  {
    id: 'hw-lariboisiere',
    domain: 'heatwave',
    title: 'AP-HP Hôpital Lariboisière (Gare du Nord)',
    locationName: 'Rue Ambroise Paré (10e)',
    lat: 48.8825,
    lon: 2.3528,
    severity: 'critical',
    colorHex: '#ff2e43',
    planningPrediction: '⚠️ PREDICTION: Dense 10e/18e zinc rooftops (+43.9°C) + Gare du Nord commuter heat stress will overwhelm ER.',
    liveStatus: '🏥 OVERWHELMED (102% ER): 6 SAMU ambulances queued; Plan Blanc Level 3 triggered.',
    metricBadge: '🏥 102% OVERLOAD',
    radius: 2.7
  },
  {
    id: 'hw-pompidou-hosp',
    domain: 'heatwave',
    title: 'Hôpital Européen Georges-Pompidou',
    locationName: 'Rue Leblanc (15e)',
    lat: 48.8392,
    lon: 2.2745,
    severity: 'warning',
    colorHex: '#f59e0b',
    planningPrediction: '📋 PLAN: West Paris AP-HP referral hub; projected 86% ICU load during 44°C peak.',
    liveStatus: '🚑 RECEIVING (88% ICU): Absorbing Rive Gauche & Line 6 elevated-rail heat-exhaustion cases.',
    metricBadge: '🏥 88% CAPACITY',
    radius: 2.5
  },
  {
    id: 'hw-chatelet-island',
    domain: 'heatwave',
    title: 'Châtelet – Grands Boulevards Heat Dome',
    locationName: 'Les Halles / Sébastopol (1er/2e)',
    lat: 48.8625,
    lon: 2.3475,
    severity: 'critical',
    colorHex: '#ff6b35',
    planningPrediction: '⚠️ PREDICTION: Peak Urban Heat Island (+44.4°C surface air, 58°C zinc roofs) — high elderly risk.',
    liveStatus: '🔥 44.4°C HEAT DOME: SAMU mobile units deployed; commuters fleeing surface streets to cooled Line 14.',
    metricBadge: '🌡 44.4°C PEAK',
    radius: 3.4
  },
  {
    id: 'hw-luxembourg-oasis',
    domain: 'heatwave',
    title: 'Jardin du Luxembourg Cooling Oasis',
    locationName: 'Sénat / Odéon (6e)',
    lat: 48.8462,
    lon: 2.3372,
    severity: 'nominal',
    colorHex: '#2ecc71',
    planningPrediction: '📋 PLAN: Municipal green refuge (-5.2°C canopy delta) + Mairie misting stations.',
    liveStatus: '🌿 COOLING REFUGE (38.8°C): 14,500 residents sheltering under tree canopy; hydration kiosks open.',
    metricBadge: '🌿 -5.2°C OASIS',
    radius: 2.6
  },

  // 4. PROTEST / RIOT / MANIFESTATION (CORTÈGE, LOOTING & FIRES)
  {
    id: 'pr-republique',
    domain: 'protest',
    title: 'Place de la République Assembly & Barricades',
    locationName: 'Place de la République (3e/10e/11e)',
    lat: 48.8675,
    lon: 2.3638,
    severity: 'critical',
    colorHex: '#ff2e43',
    planningPrediction: '⚠️ PREDICTION: 65,000-person cortège assembly; high risk of street barricades & Metro closure.',
    liveStatus: '🪧 ACTIVE FLASHPOINT: Barricades burning on Bd Magenta; Metro République lines 3/5/8/9/11 shuttered.',
    metricBadge: '🔥 BARRICADES • 65K',
    radius: 3.0
  },
  {
    id: 'pr-voltaire',
    domain: 'protest',
    title: 'Boulevard Voltaire Storefront Looting & Fires',
    locationName: 'Bd Voltaire / Oberkampf (11e)',
    lat: 48.8615,
    lon: 2.3745,
    severity: 'critical',
    colorHex: '#ff6b35',
    planningPrediction: '⚠️ PREDICTION: Black-bloc breakaway risk along commercial banking & retail storefronts.',
    liveStatus: '🔥 LOOTING & BUILDING FIRE: 14 storefronts damaged, 2 ground-floor bank branches burning; BSPP en route.',
    metricBadge: '💥 14 STORES DAMAGED',
    radius: 2.6
  },
  {
    id: 'pr-bastille',
    domain: 'protest',
    title: 'Place de la Bastille Clash & Bank Fire',
    locationName: 'Place de la Bastille (4e/11e/12e)',
    lat: 48.8532,
    lon: 2.3692,
    severity: 'critical',
    colorHex: '#ff2e43',
    planningPrediction: '⚠️ PREDICTION: High-probability CRS standoff at Bastille perimeter; retail & brasserie fire risk.',
    liveStatus: '🚒 BUILDING FIRE ACTIVE: Heavy smoke plume over Bastille; CRS water-cannon cordon holding Rue Saint-Antoine.',
    metricBadge: '🚒 3 BUILDINGS BURNED',
    radius: 2.9
  },
  {
    id: 'pr-rivoli-looting',
    domain: 'protest',
    title: 'Rue de Rivoli Commercial Corridor',
    locationName: 'Rue de Rivoli / Châtelet (1er)',
    lat: 48.8592,
    lon: 2.3445,
    severity: 'warning',
    colorHex: '#f59e0b',
    planningPrediction: '⚠️ PREDICTION: Splinter groups predicted to target Rue de Rivoli flagship stores if cortège fragments.',
    liveStatus: '🚨 LOOTING ALERT: 9 retail vitrines shattered; Préfecture mobile units establishing protective cordon.',
    metricBadge: '🚨 9 VITRINES LOOTED',
    radius: 2.5
  },
  {
    id: 'pr-champs',
    domain: 'protest',
    title: 'Champs-Élysées / Fouquet’s Flashpoint',
    locationName: 'Avenue des Champs-Élysées (8e)',
    lat: 48.8712,
    lon: 2.3045,
    severity: 'critical',
    colorHex: '#ff2e43',
    planningPrediction: '⚠️ PREDICTION: Unauthorized wildcat gathering near Arc de Triomphe; luxury boutique looting risk.',
    liveStatus: '🔥 FLASHPOINT & FIRE: Kiosks & luxury storefronts burning on Champs-Élysées; Avenue closed to all traffic.',
    metricBadge: '🔥 CHAMPS FLASHPOINT',
    radius: 2.8
  },

  // 5. SEINE CENTENARY FLOOD (CRUE +8.60M)
  {
    id: 'fl-alma-zouave',
    domain: 'flood',
    title: 'Pont de l’Alma Zouave Gauge (+8.60m)',
    locationName: 'Pont de l’Alma (8e/16e)',
    lat: 48.8638,
    lon: 2.3022,
    severity: 'critical',
    colorHex: '#00e5ff',
    planningPrediction: '⚠️ PREDICTION: Seine reaches Zouave shoulders (+8.60m); Alma underpass & Rive Droite quais submerged.',
    liveStatus: '🌊 SUBMERGED (+8.55m): Pont de l’Alma closed to vehicles; floodwater overtopping Cours Albert 1er.',
    metricBadge: '🌊 +8.55M GAUGE',
    radius: 3.1
  },
  {
    id: 'fl-louvre-orsay',
    domain: 'flood',
    title: 'Louvre & Musée d’Orsay Cofferdam Breach Risk',
    locationName: 'Quai François Mitterrand / Orsay (1er/7e)',
    lat: 48.8602,
    lon: 2.3285,
    severity: 'critical',
    colorHex: '#38bdf8',
    planningPrediction: '⚠️ PREDICTION: Subterranean seepage threatens Louvre/Orsay art reserves & RER C / Metro Line 12 tunnels.',
    liveStatus: '🌊 COFFERDAMS ACTIVE: Emergency floodgates holding at Louvre; Solférino & Orsay quais under 1.9m of water.',
    metricBadge: '🛡 COFFERDAMS • 1.9M',
    radius: 3.0
  },
  {
    id: 'fl-bercy',
    domain: 'flood',
    title: 'Bercy & Gare de Lyon Low-Basin Inundation',
    locationName: 'Quai de Bercy / Gare de Lyon (12e)',
    lat: 48.8405,
    lon: 2.3785,
    severity: 'critical',
    colorHex: '#00e5ff',
    planningPrediction: '⚠️ PREDICTION: Historical 1910 flood basin — Bercy & Gare de Lyon lower concourses will flood at +7.4m.',
    liveStatus: '🌊 BASIN FLOODED: Quai de Bercy & Pont de Bercy approaches inundated; Line 14 seals closed at Gare de Lyon.',
    metricBadge: '🌊 BERCY INUNDATED',
    radius: 3.3
  },
  {
    id: 'fl-javel',
    domain: 'flood',
    title: 'Javel & Front de Seine Embankment Breach',
    locationName: 'Port de Javel / Mirabeau (15e)',
    lat: 48.8448,
    lon: 2.2735,
    severity: 'warning',
    colorHex: '#38bdf8',
    planningPrediction: '⚠️ PREDICTION: Low-lying 15e riverfront streets & Line 10 Javel-André Citroën at high flood risk.',
    liveStatus: '🌊 FLOODED: 1.4 km of 15e riverfront streets submerged; civil protection boats evacuating basement power rooms.',
    metricBadge: '🚣 EVACUATION • 15e',
    radius: 2.9
  },
  {
    id: 'fl-cite-stmichel',
    domain: 'flood',
    title: 'Île de la Cité & Saint-Michel Tunnel Flood',
    locationName: 'Place Saint-Michel (5e/6e)',
    lat: 48.8535,
    lon: 2.3442,
    severity: 'critical',
    colorHex: '#00e5ff',
    planningPrediction: '⚠️ PREDICTION: Metro Line 4 under-river caisson & RER B/C Saint-Michel require emergency bulkhead closure.',
    liveStatus: '🚇 TUNNEL SEALED: Line 4 split at Châtelet/Odéon; high-volume BSPP pumps running at Saint-Michel.',
    metricBadge: '🚇 LINE 4 BULKHEAD',
    radius: 2.7
  },

  // 6. CYBERATTACK (SCADA COMPROMISE, SIGNAL SPOOFING & BLACKOUT)
  {
    id: 'cy-chatelet-scada',
    domain: 'cyberattack',
    title: 'RATP PCC Automated Train Control (Lines 1/4/14)',
    locationName: 'Châtelet – PCC Central (1er)',
    lat: 48.8584,
    lon: 2.3475,
    severity: 'critical',
    colorHex: '#e879f9',
    planningPrediction: '⚠️ PREDICTION: Zero-day lateral movement into CBTC rail signalling will halt automated Lines 1, 4 & 14.',
    liveStatus: '💻 SCADA LOCKOUT: Lines 1, 4 & 14 emergency-halted at platforms; 48,000 passengers spilling onto streets.',
    metricBadge: '💻 CBTC HALTED',
    radius: 3.1
  },
  {
    id: 'cy-surf-signals',
    domain: 'cyberattack',
    title: 'Préfecture SURF Traffic Signal Spoofing',
    locationName: 'Grands Boulevards / Opéra (2e/9e)',
    lat: 48.8708,
    lon: 2.3322,
    severity: 'critical',
    colorHex: '#f43f5e',
    planningPrediction: '⚠️ PREDICTION: Compromised intersection PLC controllers will force all-red / flashing-conflict gridlock.',
    liveStatus: '🚦 SIGNALS SPOOFED: 84 carrefours locked in conflict state; city-wide average traffic speed down to 7 km/h.',
    metricBadge: '🚦 84 NODES LOCKED',
    radius: 2.9
  },
  {
    id: 'cy-enedis-nord',
    domain: 'cyberattack',
    title: 'Enedis 225kV Substation Nord & Gare du Nord',
    locationName: 'Gare du Nord / La Chapelle (10e/18e)',
    lat: 48.8809,
    lon: 2.3553,
    severity: 'critical',
    colorHex: '#a855f7',
    planningPrediction: '⚠️ PREDICTION: IEC-61850 substation trip will trigger rolling blackout across 9e/10e/18e & Eurostar/TGV.',
    liveStatus: '⚡ SECTOR BLACKOUT: 10e & 18e arrondissements on backup generators; Gare du Nord rail interlocking offline.',
    metricBadge: '⚡ 10e/18e BLACKOUT',
    radius: 3.2
  },
  {
    id: 'cy-defense-cert',
    domain: 'cyberattack',
    title: 'ANSSI / CERT-FR Cyber Command & La Défense',
    locationName: 'Étoile / Axe Historique Ouest (8e/16e)',
    lat: 48.8738,
    lon: 2.295,
    severity: 'warning',
    colorHex: '#38bdf8',
    planningPrediction: '📋 PLAN: Air-gapped fiber ring & manual override dispatch from Invalides / ANSSI.',
    liveStatus: '🛡 CONTAINMENT ACTIVE: Isolating compromised PLC subnets; restoring manual police control at Étoile.',
    metricBadge: '🛡 ANSSI ISOLATION',
    radius: 2.7
  }
];

// ── Traffic Signal Controller ────────────────────────────────────────────────

interface TrafficLight {
  nodeId: number;
  edgeId: number;
  state: LightState;
  mesh: THREE.Group;
  bulbMesh: THREE.Mesh;
  haloMesh: THREE.Mesh;
}

interface IntersectionPhase {
  edgeIds: number[];
  greenDuration: number;
  yellowDuration: number;
}

interface IntersectionController {
  nodeId: number;
  lights: TrafficLight[];
  phases: IntersectionPhase[];
  currentPhase: number;
  timer: number;
  currentState: LightState;
}

// ── Surface Car & Emergency Vehicle Entity ───────────────────────────────────

interface SimCar {
  id: number;
  mesh: THREE.Group;
  bodyMat: THREE.MeshStandardMaterial;
  roofBeaconMat: THREE.MeshBasicMaterial;
  glowSprite: THREE.Sprite;
  colorHex: number;
  kind: 'sedan' | 'taxi' | 'bus' | 'ambulance' | 'firetruck';
  route: { edgeId: number; forward: boolean }[];
  routeIdx: number;
  lanePoints: THREE.Vector3[];
  cumDist: number[];
  totalDist: number;
  distAlongEdge: number;
  speed: number;
  targetSpeed: number;
  currentNodeId: number;
  destinationNodeId: number;
}

// ── Commuter / Pedestrian Flow Entity ────────────────────────────────────────

interface CommuterParticle {
  corridorIdx: number;
  distAlong: number;
  speed: number;
  lateralOffset: number;
  phaseOffset: number;
  baseColorHex: number;
}

interface CommuterCorridor {
  name: string;
  points: THREE.Vector3[];
  cumDist: number[];
  totalDist: number;
}

// ── Marathon Runner Entity ───────────────────────────────────────────────────

interface MarathonRunnerInstance {
  distAlongCourse: number;
  speed: number;
  lateralOffset: number;
  stridePhase: number;
  colorHex: number;
}

// ── Fire / Smoke Plume Visual ────────────────────────────────────────────────

interface FirePlumeVisual {
  group: THREE.Group;
  flameMesh: THREE.Mesh;
  smokePuffs: THREE.Mesh[];
  shockRing: THREE.Mesh;
  baseX: number;
  baseY: number;
  baseZ: number;
}

// ── Hospital Capacity Tower Visual ───────────────────────────────────────────

interface HospitalTowerVisual {
  id: string;
  group: THREE.Group;
  fillMesh: THREE.Mesh;
  fillMat: THREE.MeshStandardMaterial;
  ringMesh: THREE.Mesh;
  loadRatio: number; // 0.5 -> 1.1
}

/**
 * Multi-Modal & Multi-Crisis Surface Simulation Engine for Paris:
 * Supports a Two-Stage Lifecycle ('planning' -> 'live') across:
 * 1. Traffic & Commuter Rush Hour ('traffic')
 * 2. 42.195 km Marathon de Paris ('marathon')
 * 3. Extreme Heat Wave 44°C — Hospitals & SAMU Ambulances ('heatwave')
 * 4. Protest / Riot / Manifestation — Cortège, Looting & Building Fires ('protest')
 * 5. Centenary Seine Flood +8.60m ('flood')
 * 6. City-Wide SCADA Cyberattack ('cyberattack')
 */
export class ParisSurfaceSimulation {
  public readonly rootGroup = new THREE.Group();
  public readonly trafficGroup = new THREE.Group();
  public readonly commuterGroup = new THREE.Group();
  public readonly signalsGroup = new THREE.Group();
  public readonly congestionGroup = new THREE.Group();
  public readonly barriersGroup = new THREE.Group();
  public readonly marathonGroup = new THREE.Group();
  public readonly planningWarningsGroup = new THREE.Group();
  public readonly heatwaveGroup = new THREE.Group();
  public readonly protestGroup = new THREE.Group();
  public readonly floodGroup = new THREE.Group();
  public readonly cyberGroup = new THREE.Group();
  public readonly probesGroup = new THREE.Group();

  public readonly nodes: ParisRoadNode[] = [];
  public readonly edges: ParisRoadEdge[] = [];
  public readonly heroProbes: ParisHeroProbe[] = [];
  public readonly worldHotspots: ParisWorldHotspot[] = [];

  /** Optional callback triggered when mode or phase changes so SceneManager/VoxelParis can adjust contrast/camera */
  public onSimulationStateChanged?: (
    mode: ParisSimulationModeId,
    phase: ParisSimulationPhaseId
  ) => void;

  private readonly edgeMap = new Map<number, ParisRoadEdge>();
  private adj = new Map<number, { edgeId: number; neighbor: number; weight: number }[]>();
  private readonly closedEdgeIds = new Set<number>();

  private readonly controllers: IntersectionController[] = [];
  private readonly cars: SimCar[] = [];
  private nextCarId = 1;

  private readonly edgeCongestionMeshes = new Map<number, THREE.Mesh>();
  private readonly edgeColumnMeshes = new Map<number, THREE.Mesh>();
  private readonly edgeCarCounts = new Map<number, number>();
  private readonly edgeAvgSpeedRatio = new Map<number, number>();

  // Commuter flow instanced mesh & corridors
  private readonly commuterCorridors: CommuterCorridor[] = [];
  private readonly commuters: CommuterParticle[] = [];
  private commuterInstancedMesh!: THREE.InstancedMesh;
  private readonly commuterDummy = new THREE.Object3D();

  // Marathon course & runners
  private marathonCoursePoints: THREE.Vector3[] = [];
  private marathonCumDist: number[] = [];
  private marathonTotalDist = 0;
  private marathonCrossingEdgeIds: number[] = [];
  private marathonRunners: MarathonRunnerInstance[] = [];
  private runnerInstancedMesh!: THREE.InstancedMesh;
  private readonly runnerDummy = new THREE.Object3D();

  // Domain-specific animated 3D visuals
  private readonly planningDomeMeshes: {
    id: string;
    domain: ParisSimulationModeId;
    group: THREE.Group;
    ring: THREE.Mesh;
    pillar: THREE.Mesh;
  }[] = [];
  private readonly hospitalTowers: HospitalTowerVisual[] = [];
  private readonly heatDomeMeshes: THREE.Mesh[] = [];
  private readonly firePlumes: FirePlumeVisual[] = [];
  private protestCrowdMesh!: THREE.InstancedMesh;
  private readonly protestMarchers: {
    dist: number;
    speed: number;
    latOffset: number;
    phase: number;
  }[] = [];
  private protestRoutePoints: THREE.Vector3[] = [];
  private protestCumDist: number[] = [];
  private protestTotalDist = 1;

  private floodWaterMesh!: THREE.Mesh;
  private floodWaterMat!: THREE.MeshPhysicalMaterial;
  private readonly floodBreachRings: THREE.Mesh[] = [];
  private floodLevelMeters = 2.4;

  private readonly cyberGlitchDomes: THREE.Mesh[] = [];
  private readonly cyberBeams: THREE.Mesh[] = [];

  private readonly probeMarkers = new Map<string, THREE.Group>();
  private thoughtTickAccumulator = 0;

  private mode: ParisSimulationModeId = 'none';
  private phase: ParisSimulationPhaseId = 'planning';
  private scenario: ParisScenarioPresetId = 'marathon_de_paris';
  private simElapsedSec = 0;
  private mitigationActive = false;

  // Race Condition Simulation Run Lifecycle (Duration, Pause/Run, Speed, A2UI Report Card)
  private targetDurationSec = 60;
  private simRunElapsedSec = 0;
  private simSpeedMultiplier: 1 | 2 | 4 = 1;
  private simPaused = false;
  private simCompleted = false;
  private vitalsSnapAccum = 0;
  private peakCongestionPct = 0;
  private minTrafficSpeedKmh = 46;
  private vitalsSnapshots: {
    tick: number;
    simTimeLabel: string;
    avgSpeedKmh: number;
    congestionPct: number;
  }[] = [];
  private lastReportCard: ParisSimulationReportCard | null = null;
  public onSimulationCompleted?: (reportCard: ParisSimulationReportCard) => void;

  private signalsEnabled = true;
  private congestionHeatmapEnabled = true;
  private marathonClosuresEnabled = false;
  private currentYear = 2026;

  private readonly carBodyGeo = new THREE.BoxGeometry(CAR_WIDTH, CAR_HEIGHT, CAR_LENGTH);
  private readonly carCabinGeo = new THREE.BoxGeometry(
    CAR_WIDTH * 0.85,
    CAR_HEIGHT * 0.72,
    CAR_LENGTH * 0.56
  );
  private readonly busBodyGeo = new THREE.BoxGeometry(
    CAR_WIDTH * 1.24,
    CAR_HEIGHT * 1.38,
    CAR_LENGTH * 1.65
  );
  private readonly roofBeaconGeo = new THREE.SphereGeometry(0.09, 8, 8);
  private readonly glowTexture: THREE.Texture;

  constructor() {
    this.rootGroup.name = 'ParisMultiModalSurfaceSimulation';
    this.rootGroup.add(
      this.congestionGroup,
      this.signalsGroup,
      this.barriersGroup,
      this.trafficGroup,
      this.commuterGroup,
      this.marathonGroup,
      this.planningWarningsGroup,
      this.heatwaveGroup,
      this.protestGroup,
      this.floodGroup,
      this.cyberGroup,
      this.probesGroup
    );

    this.glowTexture = this.createRadialGlowTexture();

    this.buildParisRoadGraph();
    this.buildTrafficSignals();
    this.buildCongestionHeatmapRibbons();
    this.buildCommuterCorridorsAndStreams();
    this.buildMarathonDeParisCourseAndRunners();
    this.buildWorldHotspotsAndPlanningDomes();
    this.buildHeatwaveVisuals();
    this.buildProtestAndFireVisuals();
    this.buildSeineFloodVisuals();
    this.buildCyberattackVisuals();
    this.initHeroProbes();

    // Spawn 160 high-visibility autonomous vehicles
    this.respawnCars(160);
    // Start in Learn / Explore mode ('none') until the user switches to Plan / Simulate
    this.setSimulationMode('none', 'planning');
  }

  private createRadialGlowTexture(): THREE.Texture {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2
      );
      grad.addColorStop(0, 'rgba(255, 250, 230, 0.95)');
      grad.addColorStop(0.4, 'rgba(255, 215, 110, 0.52)');
      grad.addColorStop(1, 'rgba(255, 215, 110, 0.0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }

  // ── 1. Paris Surface Road Graph ────────────────────────────────────────────

  private buildParisRoadGraph(): void {
    interface RawPolyline {
      name: string;
      tier: ParisRoadEdge['tier'];
      pts: THREE.Vector3[];
    }

    const rawPolylines: RawPolyline[] = [];

    for (const r of PARIS_ROADS) {
      const pts = r.points.map(([lat, lon]) => {
        const { x, z } = projectLatLon(lat, lon);
        // Elevate slightly above street floor so vehicles & ribbons are clearly visible
        const y = getParisTerrainElevation(x, z) + 0.18;
        return new THREE.Vector3(x, y, z);
      });
      if (pts.length >= 2) {
        rawPolylines.push({ name: r.name, tier: r.tier, pts });
      }
    }

    for (const q of PARIS_SEINE_QUAI_ROADS) {
      const pts = q.points.map(([lat, lon]) => {
        const { x, z } = projectLatLon(lat, lon);
        const y = getParisTerrainElevation(x, z) + 0.18;
        return new THREE.Vector3(x, y, z);
      });
      rawPolylines.push({ name: q.name, tier: q.tier, pts });
    }

    for (const b of PARIS_BRIDGES) {
      const p1 = projectLatLon(b.p1[0], b.p1[1]);
      const p2 = projectLatLon(b.p2[0], b.p2[1]);
      const pA = new THREE.Vector3(p1.x, getParisTerrainElevation(p1.x, p1.z) + 0.22, p1.z);
      const pB = new THREE.Vector3(p2.x, getParisTerrainElevation(p2.x, p2.z) + 0.22, p2.z);
      rawPolylines.push({ name: b.name, tier: 'bridge', pts: [pA, pB] });
    }

    interface SegRecord {
      polyIdx: number;
      segIdx: number;
      a: THREE.Vector3;
      b: THREE.Vector3;
      splits: { t: number; pt: THREE.Vector3 }[];
    }

    const segments: SegRecord[] = [];
    for (let pIdx = 0; pIdx < rawPolylines.length; pIdx++) {
      const pts = rawPolylines[pIdx].pts;
      for (let sIdx = 0; sIdx < pts.length - 1; sIdx++) {
        segments.push({
          polyIdx: pIdx,
          segIdx: sIdx,
          a: pts[sIdx],
          b: pts[sIdx + 1],
          splits: []
        });
      }
    }

    for (let i = 0; i < segments.length; i++) {
      const s1 = segments[i];
      for (let j = i + 1; j < segments.length; j++) {
        const s2 = segments[j];
        if (s1.polyIdx === s2.polyIdx && Math.abs(s1.segIdx - s2.segIdx) <= 1) {
          continue;
        }
        const hit = segmentIntersection2D(
          s1.a.x,
          s1.a.z,
          s1.b.x,
          s1.b.z,
          s2.a.x,
          s2.a.z,
          s2.b.x,
          s2.b.z
        );
        if (hit) {
          const ix = s1.a.x + (s1.b.x - s1.a.x) * hit.t;
          const iz = s1.a.z + (s1.b.z - s1.a.z) * hit.t;
          const iy = getParisTerrainElevation(ix, iz) + 0.18;
          const ipt = new THREE.Vector3(ix, iy, iz);
          s1.splits.push({ t: hit.t, pt: ipt });
          s2.splits.push({ t: hit.u, pt: ipt.clone() });
        }
      }
    }

    const endpoints: { polyIdx: number; pt: THREE.Vector3 }[] = [];
    for (let pIdx = 0; pIdx < rawPolylines.length; pIdx++) {
      const pts = rawPolylines[pIdx].pts;
      endpoints.push({ polyIdx: pIdx, pt: pts[0] });
      endpoints.push({ polyIdx: pIdx, pt: pts[pts.length - 1] });
    }

    for (const ep of endpoints) {
      for (const seg of segments) {
        if (seg.polyIdx === ep.polyIdx) continue;
        const proj = pointToSegmentProjection2D(
          ep.pt.x,
          ep.pt.z,
          seg.a.x,
          seg.a.z,
          seg.b.x,
          seg.b.z
        );
        if (proj.t > 0.05 && proj.t < 0.95 && proj.dist < SNAP_TOLERANCE * 1.15) {
          const iy = getParisTerrainElevation(proj.projX, proj.projZ) + 0.18;
          seg.splits.push({
            t: proj.t,
            pt: new THREE.Vector3(proj.projX, iy, proj.projZ)
          });
        }
      }
    }

    const findOrCreateNode = (pt: THREE.Vector3, suggestedName?: string): number => {
      for (const n of this.nodes) {
        if (Math.hypot(n.position.x - pt.x, n.position.z - pt.z) < SNAP_TOLERANCE) {
          if (suggestedName && !n.name) n.name = suggestedName;
          return n.id;
        }
      }
      const id = this.nodes.length;
      this.nodes.push({ id, name: suggestedName, position: pt.clone() });
      this.adj.set(id, []);
      return id;
    };

    for (const place of PARIS_PLACES) {
      const { x, z } = projectLatLon(place.lat, place.lon);
      const y = getParisTerrainElevation(x, z) + 0.18;
      findOrCreateNode(new THREE.Vector3(x, y, z), place.name);
    }

    let nextEdgeId = 0;
    const seenPairs = new Set<string>();

    for (let pIdx = 0; pIdx < rawPolylines.length; pIdx++) {
      const poly = rawPolylines[pIdx];
      const polySegs = segments.filter((s) => s.polyIdx === pIdx);

      const refinedPts: THREE.Vector3[] = [];
      for (let sIdx = 0; sIdx < polySegs.length; sIdx++) {
        const seg = polySegs[sIdx];
        if (sIdx === 0) refinedPts.push(seg.a);
        seg.splits.sort((u, v) => u.t - v.t);
        for (const sp of seg.splits) {
          refinedPts.push(sp.pt);
        }
        refinedPts.push(seg.b);
      }

      let curStartNode = findOrCreateNode(refinedPts[0]);
      let curSubPoints: THREE.Vector3[] = [this.nodes[curStartNode].position.clone()];

      for (let i = 1; i < refinedPts.length; i++) {
        const pt = refinedPts[i];
        const isLast = i === refinedPts.length - 1;

        let snappedNodeId = -1;
        for (const n of this.nodes) {
          if (Math.hypot(n.position.x - pt.x, n.position.z - pt.z) < SNAP_TOLERANCE) {
            snappedNodeId = n.id;
            break;
          }
        }
        if (snappedNodeId === -1 && isLast) {
          snappedNodeId = findOrCreateNode(pt);
        }

        if (snappedNodeId !== -1 && snappedNodeId !== curStartNode) {
          curSubPoints.push(this.nodes[snappedNodeId].position.clone());
          const { totalDist } = computePolylineDistances(curSubPoints);
          const pairKey =
            curStartNode < snappedNodeId
              ? `${curStartNode}_${snappedNodeId}`
              : `${snappedNodeId}_${curStartNode}`;

          if (totalDist > 0.25 && !seenPairs.has(pairKey)) {
            seenPairs.add(pairKey);
            const edge: ParisRoadEdge = {
              id: nextEdgeId++,
              name: poly.name,
              tier: poly.tier,
              from: curStartNode,
              to: snappedNodeId,
              points: curSubPoints,
              lengthWorld: totalDist
            };
            this.edges.push(edge);
            this.edgeMap.set(edge.id, edge);
            this.adj.get(edge.from)!.push({
              edgeId: edge.id,
              neighbor: edge.to,
              weight: totalDist
            });
            this.adj.get(edge.to)!.push({
              edgeId: edge.id,
              neighbor: edge.from,
              weight: totalDist
            });
          }

          curStartNode = snappedNodeId;
          curSubPoints = [this.nodes[curStartNode].position.clone()];
        } else if (snappedNodeId === -1) {
          curSubPoints.push(pt);
        }
      }
    }
  }

  // ── 2. Multi-Phase Intersection Traffic Signals ───────────────────────────

  private buildTrafficSignals(): void {
    const poleGeo = new THREE.CylinderGeometry(0.025, 0.032, LIGHT_HEIGHT, 6);
    const poleMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.7,
      roughness: 0.35
    });
    const bulbGeo = new THREE.SphereGeometry(0.085, 10, 10);
    const haloGeo = new THREE.RingGeometry(0.12, 0.24, 16);

    for (const node of this.nodes) {
      const neighbors = this.adj.get(node.id) ?? [];
      if (neighbors.length < 3) continue;

      const nodePos = node.position;
      const incomingDirs: { edgeId: number; angle: number; approachPt: THREE.Vector3 }[] = [];

      for (const entry of neighbors) {
        const edge = this.edgeMap.get(entry.edgeId)!;
        const pts = edge.points;
        const refPt =
          edge.to === node.id
            ? pts[Math.max(0, pts.length - 2)]
            : pts[Math.min(pts.length - 1, 1)];
        const dx = refPt.x - nodePos.x;
        const dz = refPt.z - nodePos.z;
        incomingDirs.push({
          edgeId: entry.edgeId,
          angle: Math.atan2(dz, dx),
          approachPt: refPt
        });
      }

      const phases = this.groupIntoTrafficPhases(incomingDirs);
      const lights: TrafficLight[] = [];

      for (let p = 0; p < phases.length; p++) {
        for (const eid of phases[p].edgeIds) {
          const dirInfo = incomingDirs.find((d) => d.edgeId === eid)!;
          const initialState: LightState = p === 0 ? 'green' : 'red';

          const group = new THREE.Group();
          const pole = new THREE.Mesh(poleGeo, poleMat);
          pole.position.y = LIGHT_HEIGHT * 0.5;
          group.add(pole);

          const initialHex = initialState === 'green' ? 0x22c55e : 0xef4444;
          const bulbMat = new THREE.MeshBasicMaterial({ color: initialHex });
          const bulbMesh = new THREE.Mesh(bulbGeo, bulbMat);
          bulbMesh.position.y = LIGHT_HEIGHT + 0.04;
          group.add(bulbMesh);

          const haloMat = new THREE.MeshBasicMaterial({
            color: initialHex,
            transparent: true,
            opacity: 0.55,
            side: THREE.DoubleSide,
            depthWrite: false
          });
          const haloMesh = new THREE.Mesh(haloGeo, haloMat);
          haloMesh.rotation.x = -Math.PI / 2;
          haloMesh.position.y = 0.05;
          group.add(haloMesh);

          const dirVec = new THREE.Vector3()
            .subVectors(dirInfo.approachPt, nodePos)
            .normalize();
          const right = new THREE.Vector3(-dirVec.z, 0, dirVec.x);
          const pos = nodePos
            .clone()
            .addScaledVector(dirVec, LIGHT_OFFSET)
            .addScaledVector(right, LANE_OFFSET * 1.15);
          pos.y = getParisTerrainElevation(pos.x, pos.z);
          group.position.copy(pos);

          this.signalsGroup.add(group);
          lights.push({ nodeId: node.id, edgeId: eid, state: initialState, mesh: group, bulbMesh, haloMesh });
        }
      }

      this.controllers.push({
        nodeId: node.id,
        lights,
        phases,
        currentPhase: 0,
        timer: (node.id * 1.9) % GREEN_DURATION,
        currentState: 'green'
      });
    }
  }

  private groupIntoTrafficPhases(
    dirs: { edgeId: number; angle: number }[]
  ): IntersectionPhase[] {
    if (dirs.length === 0) return [];
    const Normalize = (a: number) => ((a % Math.PI) + Math.PI) % Math.PI;
    const assigned = new Set<number>();
    const groups: number[][] = [];

    for (let i = 0; i < dirs.length; i++) {
      if (assigned.has(i)) continue;
      const group = [dirs[i].edgeId];
      assigned.add(i);
      const axisI = Normalize(dirs[i].angle);

      for (let j = i + 1; j < dirs.length; j++) {
        if (assigned.has(j)) continue;
        const axisJ = Normalize(dirs[j].angle);
        const diff = Math.abs(axisI - axisJ);
        const angDiff = Math.min(diff, Math.PI - diff);
        if (angDiff < Math.PI / 4) {
          group.push(dirs[j].edgeId);
          assigned.add(j);
        }
      }
      groups.push(group);
    }

    return groups.map((edgeIds) => ({
      edgeIds,
      greenDuration: GREEN_DURATION,
      yellowDuration: YELLOW_DURATION
    }));
  }

  private updateTrafficLightVisuals(): void {
    const colorMap: Record<LightState, number> = {
      green: 0x22c55e,
      yellow: 0xfacc15,
      red: 0xef4444
    };
    for (const ctrl of this.controllers) {
      for (const light of ctrl.lights) {
        const hex =
          this.mode === 'cyberattack' && this.phase === 'live'
            ? (ctrl.nodeId + Math.floor(this.simElapsedSec * 4)) % 2 === 0
              ? 0xf43f5e
              : 0xe879f9
            : colorMap[light.state];
        (light.bulbMesh.material as THREE.MeshBasicMaterial).color.setHex(hex);
        (light.haloMesh.material as THREE.MeshBasicMaterial).color.setHex(hex);
      }
    }
  }

  public getLightState(nodeId: number, edgeId: number): LightState | null {
    if (this.mode === 'cyberattack' && this.phase === 'live') {
      // During live cyberattack, 75% of intersections lock in conflict/red state
      return (nodeId + edgeId) % 4 === 0 ? 'yellow' : 'red';
    }
    if (!this.signalsEnabled) return 'green';
    const ctrl = this.controllers.find((c) => c.nodeId === nodeId);
    if (!ctrl) return null;
    const light = ctrl.lights.find((l) => l.edgeId === edgeId);
    return light?.state ?? null;
  }

  // ── 3. Boulevard Congestion Ribbons & Vertical 3D Congestion Columns ──────

  private buildCongestionHeatmapRibbons(): void {
    const colGeo = new THREE.CylinderGeometry(0.32, 0.42, 1.0, 12);
    colGeo.translate(0, 0.5, 0);

    for (const edge of this.edges) {
      const width =
        edge.tier === 'peripherique'
          ? 0.48
          : edge.tier === 'grand_boulevard'
            ? 0.40
            : 0.30;
      // Render ribbon both at street level AND with strong glow so it's visible across the city
      const geo = buildRibbonGeometry(edge.points, width, 0.08);
      const mat = new THREE.MeshBasicMaterial({
        color: 0x2ecc71,
        transparent: true,
        opacity: 0.46,
        depthWrite: false,
        side: THREE.DoubleSide
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.renderOrder = 6;
      this.congestionGroup.add(mesh);
      this.edgeCongestionMeshes.set(edge.id, mesh);

      // Midpoint 3D vertical congestion column that rises above rooftops when traffic backs up!
      const midPt = edge.points[Math.floor(edge.points.length / 2)];
      const colMat = new THREE.MeshBasicMaterial({
        color: 0xff4757,
        transparent: true,
        opacity: 0.0,
        depthWrite: false
      });
      const colMesh = new THREE.Mesh(colGeo, colMat);
      colMesh.position.set(midPt.x, midPt.y, midPt.z);
      colMesh.visible = false;
      this.congestionGroup.add(colMesh);
      this.edgeColumnMeshes.set(edge.id, colMesh);
    }
  }

  // ── 4. Visible Pedestrian / Commuter Flow Streams ──────────────────────────

  private buildCommuterCorridorsAndStreams(): void {
    const rawCorridors: { name: string; waypoints: [number, number][] }[] = [
      {
        name: 'Gare du Nord → République → Bastille',
        waypoints: [
          [48.8809, 2.3553],
          [48.8768, 2.3585],
          [48.8675, 2.3638],
          [48.8595, 2.3665],
          [48.8532, 2.3692]
        ]
      },
      {
        name: 'Gare Saint-Lazare → Opéra → Châtelet → Gare de Lyon',
        waypoints: [
          [48.8755, 2.3258],
          [48.8708, 2.3322],
          [48.8645, 2.3385],
          [48.8584, 2.3475],
          [48.8532, 2.3692],
          [48.8448, 2.3735]
        ]
      },
      {
        name: 'Arc de Triomphe → Champs-Élysées → Concorde → Louvre',
        waypoints: [
          [48.8738, 2.295],
          [48.8698, 2.3075],
          [48.8656, 2.3212],
          [48.8612, 2.3358],
          [48.8584, 2.3475]
        ]
      },
      {
        name: 'Gare Montparnasse → Saint-Germain → Saint-Michel → Châtelet',
        waypoints: [
          [48.8412, 2.3205],
          [48.8485, 2.3285],
          [48.8535, 2.3442],
          [48.8584, 2.3475]
        ]
      },
      {
        name: 'Trocadéro → Tour Eiffel → Invalides → Concorde',
        waypoints: [
          [48.8628, 2.2875],
          [48.8584, 2.2945],
          [48.8565, 2.3125],
          [48.8656, 2.3212]
        ]
      }
    ];

    for (const rc of rawCorridors) {
      const pts = rc.waypoints.map(([lat, lon]) => {
        const { x, z } = projectLatLon(lat, lon);
        return new THREE.Vector3(x, getParisTerrainElevation(x, z) + 0.25, z);
      });
      const curve = new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.3);
      const sampled = curve.getPoints(60);
      const { cumDist, totalDist } = computePolylineDistances(sampled);
      this.commuterCorridors.push({ name: rc.name, points: sampled, cumDist, totalDist });
    }

    const commuterCount = 300;
    const geo = new THREE.SphereGeometry(0.11, 8, 8);
    const mat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.92
    });
    this.commuterInstancedMesh = new THREE.InstancedMesh(geo, mat, commuterCount);
    this.commuterInstancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    const palette = [0x38bdf8, 0xa78bfa, 0x34d399, 0xfbbf24];
    const col = new THREE.Color();

    for (let i = 0; i < commuterCount; i++) {
      const corridorIdx = i % this.commuterCorridors.length;
      const corridor = this.commuterCorridors[corridorIdx];
      const distAlong = (i / commuterCount) * corridor.totalDist;
      const speed = 0.55 + (i % 7) * 0.08;
      const lateralOffset = ((i % 5) - 2) * 0.14;
      const baseColorHex = palette[i % palette.length];

      this.commuters.push({
        corridorIdx,
        distAlong,
        speed,
        lateralOffset,
        phaseOffset: i * 0.5,
        baseColorHex
      });
      col.setHex(baseColorHex);
      this.commuterInstancedMesh.setColorAt(i, col);
    }
    if (this.commuterInstancedMesh.instanceColor) {
      this.commuterInstancedMesh.instanceColor.needsUpdate = true;
    }
    this.commuterGroup.add(this.commuterInstancedMesh);
  }

  // ── 5. Official 42.195 km Marathon de Paris Course & Runners ───────────────

  private buildMarathonDeParisCourseAndRunners(): void {
    const rawPts: THREE.Vector3[] = [];
    for (const [lat, lon] of MARATHON_DE_PARIS_WAYPOINTS_LATLON) {
      const { x, z } = projectLatLon(lat, lon);
      const y = getParisTerrainElevation(x, z) + 0.24;
      rawPts.push(new THREE.Vector3(x, y, z));
    }

    const curve = new THREE.CatmullRomCurve3(rawPts, false, 'catmullrom', 0.25);
    const sampleCount = 320;
    this.marathonCoursePoints = [];
    for (let i = 0; i <= sampleCount; i++) {
      const pt = curve.getPoint(i / sampleCount);
      pt.y = getParisTerrainElevation(pt.x, pt.z) + 0.24;
      this.marathonCoursePoints.push(pt);
    }

    const d = computePolylineDistances(this.marathonCoursePoints);
    this.marathonCumDist = d.cumDist;
    this.marathonTotalDist = d.totalDist;

    // Wide luminous gold + cyan marathon corridor ribbon so it is 100% visible from city altitude
    const outerGeo = buildRibbonGeometry(this.marathonCoursePoints, 0.72, 0.04);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0xf4c430,
      transparent: true,
      opacity: 0.62,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    outerMesh.renderOrder = 7;
    this.marathonGroup.add(outerMesh);

    const innerGeo = buildRibbonGeometry(this.marathonCoursePoints, 0.34, 0.08);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.96,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    innerMesh.renderOrder = 8;
    this.marathonGroup.add(innerMesh);

    // Start (Champs-Élysées) & Finish (Avenue Foch) Gantry Arches
    this.marathonGroup.add(
      this.createMarathonArchMesh(
        this.marathonCoursePoints[0],
        this.marathonCoursePoints[1],
        0x00e5ff
      ),
      this.createMarathonArchMesh(
        this.marathonCoursePoints[this.marathonCoursePoints.length - 1],
        this.marathonCoursePoints[this.marathonCoursePoints.length - 2],
        0xf4c430
      )
    );

    this.marathonCrossingEdgeIds = this.findEdgesCrossingPath(this.marathonCoursePoints, 0.75);

    const runnerCount = 220;
    const runnerGeo = new THREE.CapsuleGeometry(0.11, 0.22, 4, 8);
    const runnerMat = new THREE.MeshBasicMaterial({
      color: 0xffffff
    });
    this.runnerInstancedMesh = new THREE.InstancedMesh(runnerGeo, runnerMat, runnerCount);
    this.runnerInstancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    const packColors = [0x00e5ff, 0xf4c430, 0x4ade80, 0xf472b6, 0xfb923c];
    const colorHelper = new THREE.Color();

    for (let i = 0; i < runnerCount; i++) {
      const distAlongCourse =
        ((i / runnerCount) * this.marathonTotalDist + (i % 7) * 0.45) % this.marathonTotalDist;
      const speed = 0.65 + (i % 9) * 0.055;
      const lateralOffset = ((i % 5) - 2) * 0.09;
      const colorHex = packColors[i % packColors.length];
      this.marathonRunners.push({
        distAlongCourse,
        speed,
        lateralOffset,
        stridePhase: i * 0.7,
        colorHex
      });
      colorHelper.setHex(colorHex);
      this.runnerInstancedMesh.setColorAt(i, colorHelper);
    }
    if (this.runnerInstancedMesh.instanceColor) {
      this.runnerInstancedMesh.instanceColor.needsUpdate = true;
    }
    this.marathonGroup.add(this.runnerInstancedMesh);
    this.updateMarathonRunners(0);
  }

  private createMarathonArchMesh(
    pos: THREE.Vector3,
    nextPos: THREE.Vector3,
    colorHex: number
  ): THREE.Group {
    const group = new THREE.Group();
    const pillarGeo = new THREE.BoxGeometry(0.16, 1.45, 0.16);
    const bannerGeo = new THREE.BoxGeometry(1.45, 0.32, 0.22);
    const mat = new THREE.MeshBasicMaterial({ color: colorHex });

    const leftPillar = new THREE.Mesh(pillarGeo, mat);
    leftPillar.position.set(-0.62, 0.72, 0);
    const rightPillar = new THREE.Mesh(pillarGeo, mat);
    rightPillar.position.set(0.62, 0.72, 0);
    const topBanner = new THREE.Mesh(bannerGeo, mat);
    topBanner.position.set(0, 1.45, 0);

    group.add(leftPillar, rightPillar, topBanner);
    group.position.copy(pos);
    group.lookAt(nextPos.x, pos.y, nextPos.z);
    return group;
  }

  // ── 6. World Hotspots & 3D Planning Warning Domes ──────────────────────────

  private buildWorldHotspotsAndPlanningDomes(): void {
    const ringGeo = new THREE.RingGeometry(0.85, 1.15, 32);
    const domeGeo = new THREE.SphereGeometry(1.0, 18, 12, 0, Math.PI * 2, 0, Math.PI * 0.5);
    const pillarGeo = new THREE.CylinderGeometry(0.08, 0.08, 4.8, 8);
    pillarGeo.translate(0, 2.4, 0);

    for (const bp of DOMAIN_HOTSPOT_BLUEPRINTS) {
      const { x, z } = projectLatLon(bp.lat, bp.lon);
      const y = getParisTerrainElevation(x, z) + 0.25;

      const hotspot: ParisWorldHotspot = {
        id: bp.id,
        domain: bp.domain,
        phase: 'both',
        title: bp.title,
        locationName: bp.locationName,
        x,
        y,
        z,
        severity: bp.severity,
        colorHex: bp.colorHex,
        planningPrediction: bp.planningPrediction,
        liveStatus: bp.liveStatus,
        metricBadge: bp.metricBadge,
        radius: bp.radius
      };
      this.worldHotspots.push(hotspot);

      const group = new THREE.Group();
      group.position.set(x, y, z);

      const colorNum = parseInt(bp.colorHex.replace('#', ''), 16) || 0xf59e0b;

      const domeMat = new THREE.MeshBasicMaterial({
        color: colorNum,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
        depthWrite: false
      });
      const dome = new THREE.Mesh(domeGeo, domeMat);
      dome.scale.set(bp.radius, bp.radius * 0.85, bp.radius);
      group.add(dome);

      const ringMat = new THREE.MeshBasicMaterial({
        color: colorNum,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
        depthWrite: false
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.scale.setScalar(bp.radius);
      group.add(ring);

      const pillarMat = new THREE.MeshBasicMaterial({
        color: colorNum,
        transparent: true,
        opacity: 0.65,
        depthWrite: false
      });
      const pillar = new THREE.Mesh(pillarGeo, pillarMat);
      group.add(pillar);

      this.planningWarningsGroup.add(group);
      this.planningDomeMeshes.push({
        id: bp.id,
        domain: bp.domain,
        group,
        ring,
        pillar
      });
    }
  }

  // ── 7. Domain-Specific 3D Visuals (Heatwave, Protest, Flood, Cyberattack) ──

  private buildHeatwaveVisuals(): void {
    // 1. Shimmering Urban Heat Island Domes over dense zinc-roof arrondissements
    const heatZones: { lat: number; lon: number; radius: number; color: number }[] = [
      { lat: 48.8625, lon: 2.3475, radius: 9.5, color: 0xff3b1f }, // Châtelet / Halles / Grands Boulevards
      { lat: 48.8675, lon: 2.3685, radius: 7.8, color: 0xff5722 }, // République / Oberkampf
      { lat: 48.8825, lon: 2.3528, radius: 7.4, color: 0xff4500 }, // Gare du Nord / Barbès
      { lat: 48.8425, lon: 2.3215, radius: 6.8, color: 0xff7043 }, // Montparnasse
      // Green Cooling Oases
      { lat: 48.8462, lon: 2.3372, radius: 4.2, color: 0x10b981 }, // Jardin du Luxembourg
      { lat: 48.8809, lon: 2.3828, radius: 4.5, color: 0x10b981 }  // Parc des Buttes-Chaumont
    ];

    const domeGeo = new THREE.CylinderGeometry(1.0, 1.15, 0.65, 28, 1, false);
    for (const hz of heatZones) {
      const { x, z } = projectLatLon(hz.lat, hz.lon);
      const y = getParisTerrainElevation(x, z) + 0.35;
      const mat = new THREE.MeshBasicMaterial({
        color: hz.color,
        transparent: true,
        opacity: hz.color === 0x10b981 ? 0.32 : 0.28,
        depthWrite: false,
        side: THREE.DoubleSide
      });
      const mesh = new THREE.Mesh(domeGeo, mat);
      mesh.position.set(x, y, z);
      mesh.scale.set(hz.radius, 1.0, hz.radius);
      this.heatwaveGroup.add(mesh);
      this.heatDomeMeshes.push(mesh);
    }

    // 2. 3D Hospital ICU Capacity Towers at the 4 major AP-HP hospitals
    const hospitals = DOMAIN_HOTSPOT_BLUEPRINTS.filter(
      (b) => b.domain === 'heatwave' && b.id.startsWith('hw-') && !b.id.includes('island') && !b.id.includes('oasis')
    );
    const towerBaseGeo = new THREE.CylinderGeometry(0.55, 0.55, 4.8, 16);
    towerBaseGeo.translate(0, 2.4, 0);
    const ringGeo = new THREE.RingGeometry(0.9, 1.4, 24);

    for (const h of hospitals) {
      const { x, z } = projectLatLon(h.lat, h.lon);
      const y = getParisTerrainElevation(x, z) + 0.2;
      const group = new THREE.Group();
      group.position.set(x, y, z);

      const shellMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.35
      });
      const shellMesh = new THREE.Mesh(towerBaseGeo, shellMat);
      group.add(shellMesh);

      const isOverloaded = h.severity === 'critical';
      const fillMat = new THREE.MeshStandardMaterial({
        color: isOverloaded ? 0xff1e38 : 0xf59e0b,
        emissive: isOverloaded ? 0xff1e38 : 0xf59e0b,
        emissiveIntensity: 0.85,
        transparent: true,
        opacity: 0.88
      });
      const fillMesh = new THREE.Mesh(towerBaseGeo, fillMat);
      fillMesh.scale.set(0.82, isOverloaded ? 1.0 : 0.86, 0.82);
      group.add(fillMesh);

      const ringMat = new THREE.MeshBasicMaterial({
        color: isOverloaded ? 0xff1e38 : 0xf59e0b,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide,
        depthWrite: false
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = -Math.PI / 2;
      ringMesh.position.y = 0.08;
      group.add(ringMesh);

      this.heatwaveGroup.add(group);
      this.hospitalTowers.push({
        id: h.id,
        group,
        fillMesh,
        fillMat,
        ringMesh,
        loadRatio: isOverloaded ? 1.04 : 0.91
      });
    }
  }

  private buildProtestAndFireVisuals(): void {
    // 1. Protest Cortège Corridor (Place de la République -> Bd Voltaire -> Bastille -> Nation)
    const cortegeLatLon: [number, number][] = [
      [48.8675, 2.3638], // République
      [48.8635, 2.3702], // Oberkampf
      [48.8588, 2.3765], // Saint-Ambroise / Voltaire
      [48.8532, 2.3692], // Bastille
      [48.8502, 2.3825], // Faubourg Saint-Antoine
      [48.8484, 2.3959]  // Nation
    ];
    this.protestRoutePoints = cortegeLatLon.map(([lat, lon]) => {
      const { x, z } = projectLatLon(lat, lon);
      return new THREE.Vector3(x, getParisTerrainElevation(x, z) + 0.25, z);
    });
    const d = computePolylineDistances(this.protestRoutePoints);
    this.protestCumDist = d.cumDist;
    this.protestTotalDist = d.totalDist;

    const ribbonGeo = buildRibbonGeometry(this.protestRoutePoints, 0.85, 0.06);
    const ribbonMat = new THREE.MeshBasicMaterial({
      color: 0xff2e43,
      transparent: true,
      opacity: 0.68,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    this.protestGroup.add(new THREE.Mesh(ribbonGeo, ribbonMat));

    // Marching crowd instanced capsules
    const crowdCount = 240;
    const crowdGeo = new THREE.CapsuleGeometry(0.12, 0.24, 4, 8);
    const crowdMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.protestCrowdMesh = new THREE.InstancedMesh(crowdGeo, crowdMat, crowdCount);
    this.protestCrowdMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    const crowdColors = [0xff2e43, 0xf97316, 0xfacc15, 0xe11d48];
    const col = new THREE.Color();
    for (let i = 0; i < crowdCount; i++) {
      this.protestMarchers.push({
        dist: (i / crowdCount) * this.protestTotalDist,
        speed: 0.35 + (i % 5) * 0.04,
        latOffset: ((i % 7) - 3) * 0.12,
        phase: i * 0.9
      });
      col.setHex(crowdColors[i % crowdColors.length]);
      this.protestCrowdMesh.setColorAt(i, col);
    }
    if (this.protestCrowdMesh.instanceColor) {
      this.protestCrowdMesh.instanceColor.needsUpdate = true;
    }
    this.protestGroup.add(this.protestCrowdMesh);

    // 2. Building Fires, Rising Smoke Plumes & Damaged Storefront Markers
    const fireSites: [number, number][] = [
      [48.8675, 2.3638], // République barricades
      [48.8615, 2.3745], // Bd Voltaire bank & storefronts
      [48.8532, 2.3692], // Place de la Bastille brasserie/bank
      [48.8592, 2.3445], // Rue de Rivoli retail block
      [48.8712, 2.3045], // Champs-Élysées kiosks & luxury storefronts
      [48.8735, 2.3318]  // Bd Haussmann Grands Magasins
    ];

    const flameGeo = new THREE.ConeGeometry(0.65, 2.6, 10);
    flameGeo.translate(0, 1.3, 0);
    const smokeGeo = new THREE.DodecahedronGeometry(0.58, 1);
    const shockGeo = new THREE.RingGeometry(0.7, 1.35, 24);

    for (const [lat, lon] of fireSites) {
      const { x, z } = projectLatLon(lat, lon);
      const y = getParisTerrainElevation(x, z) + 0.2;
      const group = new THREE.Group();
      group.position.set(x, y, z);

      const flameMat = new THREE.MeshBasicMaterial({
        color: 0xff5722,
        transparent: true,
        opacity: 0.9
      });
      const flameMesh = new THREE.Mesh(flameGeo, flameMat);
      group.add(flameMesh);

      const smokePuffs: THREE.Mesh[] = [];
      for (let s = 0; s < 4; s++) {
        const smokeMat = new THREE.MeshBasicMaterial({
          color: s === 0 ? 0xff8a50 : 0x1e293b,
          transparent: true,
          opacity: 0.68 - s * 0.12,
          depthWrite: false
        });
        const puff = new THREE.Mesh(smokeGeo, smokeMat);
        puff.position.set((s % 2 === 0 ? 1 : -1) * 0.18, 1.8 + s * 1.35, 0);
        puff.scale.setScalar(0.8 + s * 0.35);
        group.add(puff);
        smokePuffs.push(puff);
      }

      const shockMat = new THREE.MeshBasicMaterial({
        color: 0xff2e43,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
        depthWrite: false
      });
      const shockRing = new THREE.Mesh(shockGeo, shockMat);
      shockRing.rotation.x = -Math.PI / 2;
      shockRing.position.y = 0.08;
      group.add(shockRing);

      this.protestGroup.add(group);
      this.firePlumes.push({
        group,
        flameMesh,
        smokePuffs,
        shockRing,
        baseX: x,
        baseY: y,
        baseZ: z
      });
    }
  }

  private buildSeineFloodVisuals(): void {
    // 1. Wide 3D Floodwater Ribbon & Overbank Inundation Sheet along the entire Seine through Paris
    const seineFloodPtsLatLon: [number, number][] = [
      [48.8285, 2.3925],
      [48.8385, 2.3805],
      [48.8465, 2.3695],
      [48.8518, 2.3565],
      [48.8555, 2.3465],
      [48.8592, 2.3345],
      [48.8632, 2.3205],
      [48.8635, 2.3015],
      [48.8572, 2.2885],
      [48.8462, 2.2735],
      [48.8365, 2.2605]
    ];
    const pts = seineFloodPtsLatLon.map(([lat, lon]) => {
      const { x, z } = projectLatLon(lat, lon);
      return new THREE.Vector3(x, getParisTerrainElevation(x, z) + 0.36, z);
    });
    const curve = new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.35);
    const sampled = curve.getPoints(140);

    // Wide overbank flood sheet (width 8.5 world units = ~760m wide flooded Seine valley!)
    const floodGeo = buildRibbonGeometry(sampled, 8.6, 0.0);
    this.floodWaterMat = new THREE.MeshPhysicalMaterial({
      color: 0x0ea5e9,
      emissive: 0x0284c7,
      emissiveIntensity: 0.38,
      roughness: 0.15,
      metalness: 0.1,
      transparent: true,
      opacity: 0.68,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    this.floodWaterMesh = new THREE.Mesh(floodGeo, this.floodWaterMat);
    this.floodWaterMesh.renderOrder = 9;
    this.floodGroup.add(this.floodWaterMesh);

    // 2. Pulsing Inundation Rings at the 5 flood breach basins
    const ringGeo = new THREE.RingGeometry(1.2, 2.8, 32);
    const floodSites = DOMAIN_HOTSPOT_BLUEPRINTS.filter((b) => b.domain === 'flood');
    for (const fs of floodSites) {
      const { x, z } = projectLatLon(fs.lat, fs.lon);
      const y = getParisTerrainElevation(x, z) + 0.42;
      const mat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.72,
        side: THREE.DoubleSide,
        depthWrite: false
      });
      const ring = new THREE.Mesh(ringGeo, mat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(x, y, z);
      this.floodGroup.add(ring);
      this.floodBreachRings.push(ring);
    }
  }

  private buildCyberattackVisuals(): void {
    const cyberSites = DOMAIN_HOTSPOT_BLUEPRINTS.filter((b) => b.domain === 'cyberattack');
    const domeGeo = new THREE.SphereGeometry(3.8, 20, 14, 0, Math.PI * 2, 0, Math.PI * 0.5);
    const beamGeo = new THREE.CylinderGeometry(0.18, 0.35, 8.5, 12);
    beamGeo.translate(0, 4.25, 0);

    for (const cs of cyberSites) {
      const { x, z } = projectLatLon(cs.lat, cs.lon);
      const y = getParisTerrainElevation(x, z) + 0.2;

      const domeMat = new THREE.MeshBasicMaterial({
        color: 0xd946ef,
        wireframe: true,
        transparent: true,
        opacity: 0.48,
        depthWrite: false
      });
      const dome = new THREE.Mesh(domeGeo, domeMat);
      dome.position.set(x, y, z);
      this.cyberGroup.add(dome);
      this.cyberGlitchDomes.push(dome);

      const beamMat = new THREE.MeshBasicMaterial({
        color: 0xf43f5e,
        transparent: true,
        opacity: 0.75,
        depthWrite: false
      });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.set(x, y, z);
      this.cyberGroup.add(beam);
      this.cyberBeams.push(beam);
    }
  }

  // ── 8. Road Closure Detection & Barrier Placement ─────────────────────────

  public findEdgesCrossingPath(pathPoints: THREE.Vector3[], proximity = 0.75): number[] {
    if (pathPoints.length < 2) return [];
    const matchedIds = new Set<number>();

    for (const edge of this.edges) {
      for (const ep of edge.points) {
        let bestDist = Infinity;
        let pathDirX = 0;
        let pathDirZ = 0;

        for (let i = 0; i < pathPoints.length - 1; i++) {
          const a = pathPoints[i];
          const b = pathPoints[i + 1];
          const proj = pointToSegmentProjection2D(ep.x, ep.z, a.x, a.z, b.x, b.z);
          if (proj.dist < bestDist) {
            bestDist = proj.dist;
            pathDirX = b.x - a.x;
            pathDirZ = b.z - a.z;
          }
        }

        if (bestDist < proximity) {
          const first = edge.points[0];
          const last = edge.points[edge.points.length - 1];
          const edgeDirX = last.x - first.x;
          const edgeDirZ = last.z - first.z;
          const eLen = Math.hypot(edgeDirX, edgeDirZ);
          const pLen = Math.hypot(pathDirX, pathDirZ);
          if (eLen > 0.01 && pLen > 0.01) {
            const cosAngle =
              Math.abs(edgeDirX * pathDirX + edgeDirZ * pathDirZ) / (eLen * pLen);
            if (cosAngle < 0.75) {
              matchedIds.add(edge.id);
              break;
            }
          }
        }
      }
    }

    return Array.from(matchedIds);
  }

  public closeEdges(edgeIds: number[]): void {
    this.clearClosures();
    for (const id of edgeIds) {
      this.closedEdgeIds.add(id);
    }

    for (const entries of this.adj.values()) {
      for (let i = entries.length - 1; i >= 0; i--) {
        if (this.closedEdgeIds.has(entries[i].edgeId)) {
          entries.splice(i, 1);
        }
      }
    }

    const barGeo = new THREE.BoxGeometry(0.46, 0.24, 0.12);
    const barMat = new THREE.MeshBasicMaterial({ color: 0xff2e43 });

    for (const eid of edgeIds) {
      const edge = this.edgeMap.get(eid);
      if (!edge || edge.points.length < 2) continue;
      const midIdx = Math.floor(edge.points.length / 2);
      const pt = edge.points[midIdx];
      const nextPt = edge.points[Math.min(edge.points.length - 1, midIdx + 1)];
      const dx = nextPt.x - pt.x;
      const dz = nextPt.z - pt.z;

      const mesh = new THREE.Mesh(barGeo, barMat);
      mesh.position.set(pt.x, pt.y + 0.14, pt.z);
      mesh.rotation.y = Math.atan2(dx, dz) + Math.PI / 2;
      this.barriersGroup.add(mesh);
    }
  }

  public clearClosures(): void {
    if (this.closedEdgeIds.size === 0 && this.barriersGroup.children.length === 0) return;
    this.closedEdgeIds.clear();
    while (this.barriersGroup.children.length > 0) {
      this.barriersGroup.remove(this.barriersGroup.children[0]);
    }
    for (const n of this.nodes) {
      this.adj.set(n.id, []);
    }
    for (const edge of this.edges) {
      this.adj.get(edge.from)!.push({
        edgeId: edge.id,
        neighbor: edge.to,
        weight: edge.lengthWorld
      });
      this.adj.get(edge.to)!.push({
        edgeId: edge.id,
        neighbor: edge.from,
        weight: edge.lengthWorld
      });
    }
  }

  // ── 9. Dijkstra Shortest-Path Router & Autonomous Vehicle Simulator ───────

  public findRoute(
    startNodeId: number,
    endNodeId: number
  ): { edgeId: number; forward: boolean }[] | null {
    if (startNodeId === endNodeId) return null;

    const dist = new Map<number, number>();
    const prev = new Map<number, { nodeId: number; edgeId: number }>();
    const visited = new Set<number>();

    for (const node of this.nodes) {
      dist.set(node.id, Infinity);
    }
    dist.set(startNodeId, 0);

    while (true) {
      let current = -1;
      let bestDist = Infinity;
      for (const [nodeId, d] of dist) {
        if (!visited.has(nodeId) && d < bestDist) {
          bestDist = d;
          current = nodeId;
        }
      }
      if (current === -1 || current === endNodeId) break;
      visited.add(current);

      const neighbors = this.adj.get(current) ?? [];
      for (const entry of neighbors) {
        if (visited.has(entry.neighbor) || this.closedEdgeIds.has(entry.edgeId)) continue;
        const alt = bestDist + entry.weight;
        if (alt < (dist.get(entry.neighbor) ?? Infinity)) {
          dist.set(entry.neighbor, alt);
          prev.set(entry.neighbor, { nodeId: current, edgeId: entry.edgeId });
        }
      }
    }

    if (!prev.has(endNodeId)) return null;

    const steps: { edgeId: number; forward: boolean }[] = [];
    let cur = endNodeId;
    while (prev.has(cur)) {
      const p = prev.get(cur)!;
      const edge = this.edgeMap.get(p.edgeId)!;
      const forward = edge.from === p.nodeId;
      steps.unshift({ edgeId: p.edgeId, forward });
      cur = p.nodeId;
    }
    return steps;
  }

  public spawnCar(): void {
    if (this.nodes.length < 2) return;

    let route: { edgeId: number; forward: boolean }[] | null = null;
    let startNodeId = 0;
    let destNodeId = 0;

    for (let attempt = 0; attempt < 16; attempt++) {
      startNodeId = Math.floor(Math.random() * this.nodes.length);
      destNodeId = Math.floor(Math.random() * this.nodes.length);
      if (startNodeId === destNodeId) continue;
      route = this.findRoute(startNodeId, destNodeId);
      if (route && route.length >= 2) break;
    }
    if (!route || route.length === 0) return;

    const id = this.nextCarId++;
    const roll = id % 14;
    const kind: SimCar['kind'] =
      roll === 0
        ? 'ambulance'
        : roll === 1
          ? 'firetruck'
          : roll === 2 || roll === 3
            ? 'bus'
            : roll <= 6
              ? 'taxi'
              : 'sedan';

    const sedanColors = [0x38bdf8, 0xf8fafc, 0xfbbf24, 0xa78bfa, 0x34d399, 0xfb7185];
    const colorHex =
      kind === 'ambulance'
        ? 0xffffff
        : kind === 'firetruck'
          ? 0xff2e43
          : kind === 'bus'
            ? 0x00c49a
            : kind === 'taxi'
              ? 0xfacc15
              : sedanColors[id % sedanColors.length];

    const group = new THREE.Group();
    const bodyMat = new THREE.MeshStandardMaterial({
      color: colorHex,
      emissive: colorHex,
      emissiveIntensity: 0.72,
      roughness: 0.25,
      metalness: 0.3
    });

    const bodyMesh = new THREE.Mesh(
      kind === 'bus' ? this.busBodyGeo : this.carBodyGeo,
      bodyMat
    );
    bodyMesh.position.y = CAR_HEIGHT * 0.5;
    group.add(bodyMesh);

    if (kind !== 'bus') {
      const cabinMat = new THREE.MeshBasicMaterial({
        color: kind === 'taxi' ? 0xfef08a : 0xe2e8f0
      });
      const cabinMesh = new THREE.Mesh(this.carCabinGeo, cabinMat);
      cabinMesh.position.set(0, CAR_HEIGHT * 1.05, -CAR_LENGTH * 0.05);
      group.add(cabinMesh);
    }

    const beaconHex =
      kind === 'ambulance'
        ? 0x00e5ff
        : kind === 'firetruck'
          ? 0xff2e43
          : colorHex;
    const roofBeaconMat = new THREE.MeshBasicMaterial({ color: beaconHex });
    const roofBeacon = new THREE.Mesh(this.roofBeaconGeo, roofBeaconMat);
    roofBeacon.position.set(0, CAR_HEIGHT * 1.45, 0);
    group.add(roofBeacon);

    const spriteMat = new THREE.SpriteMaterial({
      map: this.glowTexture,
      color: beaconHex,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const glowSprite = new THREE.Sprite(spriteMat);
    glowSprite.scale.set(1.25, 1.25, 1);
    glowSprite.position.y = 0.22;
    group.add(glowSprite);

    this.trafficGroup.add(group);

    const firstStep = route[0];
    const edge = this.edgeMap.get(firstStep.edgeId)!;
    const lanePoints = this.getLanePoints(edge, firstStep.forward);
    const { cumDist, totalDist } = computePolylineDistances(lanePoints);
    const targetSpeed = MAX_SPEED * (0.72 + Math.random() * 0.35);

    const car: SimCar = {
      id,
      mesh: group,
      bodyMat,
      roofBeaconMat,
      glowSprite,
      colorHex,
      kind,
      route,
      routeIdx: 0,
      lanePoints,
      cumDist,
      totalDist,
      distAlongEdge: Math.random() * totalDist * 0.5,
      speed: targetSpeed * 0.65,
      targetSpeed,
      currentNodeId: startNodeId,
      destinationNodeId: destNodeId
    };

    this.positionCarOnEdge(car);
    this.cars.push(car);
  }

  public removeCar(): void {
    const car = this.cars.pop();
    if (!car) return;
    this.trafficGroup.remove(car.mesh);
    car.bodyMat.dispose();
    car.roofBeaconMat.dispose();
    (car.glowSprite.material as THREE.Material).dispose();
  }

  public respawnCars(targetCount: number): void {
    const clamped = Math.max(0, Math.min(320, targetCount));
    while (this.cars.length > clamped) {
      this.removeCar();
    }
    while (this.cars.length < clamped) {
      this.spawnCar();
    }
  }

  public adjustCarCount(delta: number): number {
    this.respawnCars(this.cars.length + delta);
    return this.cars.length;
  }

  private getEndNodeOfStep(step: { edgeId: number; forward: boolean }): number {
    const edge = this.edgeMap.get(step.edgeId)!;
    return step.forward ? edge.to : edge.from;
  }

  private getLightStateForCar(car: SimCar): LightState | null {
    const step = car.route[car.routeIdx];
    if (!step) return null;
    // Emergency vehicles in heatwave/protest/flood override red lights
    if (
      (car.kind === 'ambulance' || car.kind === 'firetruck') &&
      (this.mode === 'heatwave' || this.mode === 'protest' || this.mode === 'flood')
    ) {
      return 'green';
    }
    return this.getLightState(this.getEndNodeOfStep(step), step.edgeId);
  }

  private getDistToCarAhead(car: SimCar): number | null {
    const step = car.route[car.routeIdx];
    if (!step) return null;
    let closest: number | null = null;

    for (const other of this.cars) {
      if (other.id === car.id) continue;
      const otherStep = other.route[other.routeIdx];
      if (!otherStep) continue;
      if (otherStep.edgeId === step.edgeId && otherStep.forward === step.forward) {
        const dist = other.distAlongEdge - car.distAlongEdge;
        if (dist > 0 && (closest === null || dist < closest)) {
          closest = dist;
        }
      }
    }
    return closest;
  }

  private getLanePoints(edge: ParisRoadEdge, forward: boolean): THREE.Vector3[] {
    const pts = forward ? edge.points : [...edge.points].reverse();
    const out: THREE.Vector3[] = [];

    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      let tx = 1;
      let tz = 0;
      if (i < pts.length - 1) {
        tx = pts[i + 1].x - p.x;
        tz = pts[i + 1].z - p.z;
      } else if (i > 0) {
        tx = p.x - pts[i - 1].x;
        tz = p.z - pts[i - 1].z;
      }
      const len = Math.hypot(tx, tz) || 1;
      const rx = -tz / len;
      const rz = tx / len;
      out.push(new THREE.Vector3(p.x + rx * LANE_OFFSET, p.y, p.z + rz * LANE_OFFSET));
    }
    return out;
  }

  private positionCarOnEdge(car: SimCar): void {
    const { lanePoints, cumDist, distAlongEdge } = car;
    for (let i = 1; i < cumDist.length; i++) {
      if (cumDist[i] >= distAlongEdge || i === cumDist.length - 1) {
        const segLen = cumDist[i] - cumDist[i - 1];
        const t = segLen > 1e-4 ? (distAlongEdge - cumDist[i - 1]) / segLen : 0;
        const pA = lanePoints[i - 1];
        const pB = lanePoints[i];
        car.mesh.position.lerpVectors(pA, pB, t);
        car.mesh.lookAt(pB.x, car.mesh.position.y, pB.z);
        return;
      }
    }
  }

  private assignNewDestination(car: SimCar): void {
    const endNode = this.getEndNodeOfStep(
      car.route[Math.min(car.routeIdx, car.route.length - 1)]
    );
    car.currentNodeId = endNode;

    for (let attempt = 0; attempt < 10; attempt++) {
      const dest = Math.floor(Math.random() * this.nodes.length);
      if (dest === car.currentNodeId) continue;
      const newRoute = this.findRoute(car.currentNodeId, dest);
      if (newRoute && newRoute.length > 0) {
        car.route = newRoute;
        car.routeIdx = 0;
        car.destinationNodeId = dest;
        const step = newRoute[0];
        const edge = this.edgeMap.get(step.edgeId)!;
        car.lanePoints = this.getLanePoints(edge, step.forward);
        const d = computePolylineDistances(car.lanePoints);
        car.cumDist = d.cumDist;
        car.totalDist = d.totalDist;
        car.distAlongEdge = 0;
        return;
      }
    }
    car.routeIdx = 0;
    car.distAlongEdge = 0;
  }

  // ── 10. Tier 2 Spotlighted Hero Probes ────────────────────────────────────

  private initHeroProbes(): void {
    const probeConfigs: (Omit<ParisHeroProbe, 'position' | 'currentThoughtIdx'> & {
      lat: number;
      lon: number;
    })[] = [
      {
        id: 'probe-runner-elodie',
        name: 'Élodie Laurent (#014)',
        role: 'Elite Marathon Lead • Rue de Rivoli',
        tierLabel: 'Tier 2 • Hero Probe',
        category: 'marathon',
        colorHex: '#00e5ff',
        lat: 48.8568,
        lon: 2.3522,
        locationLabel: 'Hôtel de Ville • KM 14.2',
        metricPrimary: '3:18 /km',
        metricSecondary: 'HR 174 bpm',
        statusBadge: 'COURSE RECORD PACE',
        innerThoughts: [
          'Clearing Rue de Rivoli cobblestones toward Bastille — crowd noise off Châtelet is electric.',
          'Drafting behind the lead pacer before the slight incline up Rue de Charenton toward Bois de Vincennes.',
          'Hydration table at Place de la Bastille ahead; taking electrolytes early before the Quais de Seine tunnel.'
        ]
      },
      {
        id: 'probe-taxi-g7',
        name: 'Taxi Parisien G7 #402',
        role: 'Autonomous Dijkstra Reroute • Rive Droite',
        tierLabel: 'Tier 2 • Hero Probe',
        category: 'traffic',
        colorHex: '#facc15',
        lat: 48.8708,
        lon: 2.3322,
        locationLabel: 'Place de l’Opéra → Gare de Lyon',
        metricPrimary: '26 km/h',
        metricSecondary: '+6 min detour',
        statusBadge: 'REROUTED VIA BOULEVARDS',
        innerThoughts: [
          'Préfecture barriers detected across Rue de Rivoli & Quai des Célestins; recalculating Dijkstra path via Grands Boulevards.',
          'Holding at Carrefour Opéra red phase — 14 vehicles queued ahead on Boulevard Haussmann.',
          'Advising passenger to transfer to automated Metro Line 14 at Pyramides to beat surface congestion.'
        ]
      },
      {
        id: 'probe-samu-75',
        name: 'SAMU 75 — UMH #03',
        role: 'Mobile ICU Ambulance • AP-HP Dispatch',
        tierLabel: 'Tier 2 • Hero Probe',
        category: 'emergency',
        colorHex: '#ff2e43',
        lat: 48.8542,
        lon: 2.3488,
        locationLabel: 'Hôtel-Dieu → Pitié-Salpêtrière',
        metricPrimary: 'Priority 1',
        metricSecondary: 'ER Load 98%',
        statusBadge: 'EMERGENCY CORRIDOR',
        innerThoughts: [
          'Hôtel-Dieu ER at 104% capacity — AP-HP central dispatch rerouting our heat-stroke patient to Pitié-Salpêtrière.',
          'Green-wave signal preemption active along Boulevard de l’Hôpital; ETA 4 minutes.',
          'Monitoring elderly dehydration clusters around Châtelet and Gare du Nord.'
        ]
      },
      {
        id: 'probe-bspp-pompiers',
        name: 'BSPP Premier Secours #11',
        role: 'Sapeurs-Pompiers de Paris • Caserne Sévigné',
        tierLabel: 'Tier 2 • Hero Probe',
        category: 'emergency',
        colorHex: '#f97316',
        lat: 48.8532,
        lon: 2.3692,
        locationLabel: 'Place de la Bastille / Marais',
        metricPrimary: '2 Hose Lines',
        metricSecondary: 'Flood/Fire Ready',
        statusBadge: 'ACTIVE INTERVENTION',
        innerThoughts: [
          'Containing ground-floor storefront fire near Place de la Bastille while protecting upper Haussmannian apartments.',
          'Deploying high-capacity submersible pumps at Saint-Michel river bulkhead to protect Metro Line 4.',
          'Coordinating perimeter access with Préfecture de Police along Boulevard Beaumarchais.'
        ]
      },
      {
        id: 'probe-ligne1-mp05',
        name: 'RATP Ligne 1 — Rame MP 05 #521',
        role: 'Automated Metro Relief • La Défense ↔ Vincennes',
        tierLabel: 'Tier 2 • Hero Probe',
        category: 'transit',
        colorHex: '#ffbe00',
        lat: 48.8584,
        lon: 2.3475,
        locationLabel: 'Châtelet (Subterranean Express)',
        metricPrimary: '85s Headway',
        metricSecondary: '98% Crush Load',
        statusBadge: 'HIGH-FREQUENCY RELIEF',
        innerThoughts: [
          'Surface corridor disrupted above us — absorbing +28% passenger transfer surge at Châtelet and Bastille.',
          'SAET CBTC automation maintaining 85-second headways between Charles de Gaulle–Étoile and Nation.',
          'Air-conditioned MP 05 cars providing thermal refuge below the 44°C street surface.'
        ]
      }
    ];

    for (const cfg of probeConfigs) {
      const { x, z } = projectLatLon(cfg.lat, cfg.lon);
      const y = getParisTerrainElevation(x, z) + 0.25;
      const position = new THREE.Vector3(x, y, z);

      const probe: ParisHeroProbe = {
        id: cfg.id,
        name: cfg.name,
        role: cfg.role,
        tierLabel: cfg.tierLabel,
        category: cfg.category,
        colorHex: cfg.colorHex,
        position,
        locationLabel: cfg.locationLabel,
        metricPrimary: cfg.metricPrimary,
        metricSecondary: cfg.metricSecondary,
        statusBadge: cfg.statusBadge,
        innerThoughts: cfg.innerThoughts,
        currentThoughtIdx: 0
      };
      this.heroProbes.push(probe);

      const marker = this.createProbeBeaconMesh(cfg.colorHex);
      marker.position.copy(position);
      this.probesGroup.add(marker);
      this.probeMarkers.set(probe.id, marker);
    }
  }

  private createProbeBeaconMesh(colorHex: string): THREE.Group {
    const group = new THREE.Group();
    const color = new THREE.Color(colorHex);

    const beamGeo = new THREE.CylinderGeometry(0.035, 0.035, 2.8, 8);
    const beamMat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.72,
      depthWrite: false
    });
    const beam = new THREE.Mesh(beamGeo, beamMat);
    beam.position.y = 1.4;
    group.add(beam);

    const diamondGeo = new THREE.OctahedronGeometry(0.24, 0);
    const diamondMat = new THREE.MeshBasicMaterial({ color });
    const diamond = new THREE.Mesh(diamondGeo, diamondMat);
    diamond.position.y = 2.95;
    diamond.name = 'probe-diamond';
    group.add(diamond);

    const ringGeo = new THREE.RingGeometry(0.28, 0.44, 24);
    const ringMat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.75,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.05;
    ring.name = 'probe-ring';
    group.add(ring);

    return group;
  }

  // ── 11. Active Hotspots, Event Log & Tier 3 Macro-Controller Cards ────────

  /**
   * Returns the 3D hotspots for the currently active simulation domain so the HUD can project
   * floating callout badges directly over the 3D map.
   */
  public getActiveWorldHotspots(): ParisWorldHotspot[] {
    if (this.mode === 'none') return [];
    return this.worldHotspots.filter((h) => h.domain === this.mode);
  }

  /**
   * Returns chronological event log items for the active simulation domain and phase.
   */
  public getEventLog(): ParisSimulationEventLogItem[] {
    const hotspots = this.getActiveWorldHotspots();
    return hotspots.map((h, idx) => {
      const mins = 8 * 60 + idx * 14 + Math.floor(this.simElapsedSec * 0.25);
      const hh = String(Math.floor((mins / 60) % 24)).padStart(2, '0');
      const mm = String(mins % 60).padStart(2, '0');
      const isPlanning = this.phase === 'planning';
      return {
        id: `${h.id}-${this.phase}`,
        simTimeLabel: isPlanning ? `FORECAST T+${(idx + 1) * 15}m` : `${hh}:${mm}`,
        severity: h.severity === 'nominal' ? 'resolved' : h.severity,
        category: h.metricBadge,
        headline: `${h.title} (${h.locationName})`,
        detail: isPlanning ? h.planningPrediction : h.liveStatus,
        x: h.x,
        y: h.y,
        z: h.z,
        colorHex: h.colorHex
      };
    });
  }

  public getMacroControllerCards(): ParisMacroControllerCard[] {
    const tel = this.getTelemetry();
    const nextPhase: ParisSimulationPhaseId = this.phase === 'planning' ? 'live' : 'planning';

    return [
      {
        id: 'macro-prefecture',
        agentName: 'Préfecture de Police & Sécurité Civile',
        roleBadge: 'Tier 3 • A2A Macro Controller',
        accentHex: '#ff4757',
        status: this.phase === 'live' ? 'intervention' : 'advisory',
        headline:
          this.phase === 'planning'
            ? `Planning Forecast Active for ${tel.domainTitle}`
            : `Live Crisis Command Active (${tel.closedEdgesCount} Axes Cordoned)`,
        recommendation:
          this.phase === 'planning'
            ? 'Inspect the 3D warning beacons on the map, toggle pre-event mitigations, then launch the Live Simulation.'
            : 'Dijkstra vehicle rerouting, emergency lanes, and perimeter cordons are actively mutating city flows.',
        metricSummary: `${tel.activeCarsCount} Vehicles • ${tel.congestionIndexPct}% Congestion Index`,
        actionLabel:
          this.phase === 'planning'
            ? '▶ Launch Live Simulation Now'
            : '📋 Return to Planning Forecast',
        actionDomain: this.mode === 'none' ? 'marathon' : this.mode,
        actionPhase: nextPhase
      },
      {
        id: 'macro-ap-hp-samu',
        agentName: 'AP-HP Hospitals & SAMU 75 Dispatch',
        roleBadge: 'Tier 3 • Medical & Crisis Agent',
        accentHex: '#f59e0b',
        status: this.mode === 'heatwave' || this.mode === 'protest' ? 'intervention' : 'nominal',
        headline:
          this.mode === 'heatwave'
            ? 'Plan Blanc Level 3: Hôtel-Dieu & Lariboisière Diverting to Salpêtrière'
            : '5 AP-HP Trauma Centers & SAMU Mobile ICU Fleet Connected',
        recommendation:
          'Switch to Heat Wave (Canicule 44°C) to simulate urban heat islands, ambulance routing, and hospital ICU overload.',
        metricSummary: '18 SAMU Units • 5 AP-HP Hospital Towers',
        actionLabel:
          this.mode === 'heatwave' && this.phase === 'live'
            ? '📋 View Heatwave Forecast'
            : '🔥 Simulate 44°C Heat Wave',
        actionDomain: 'heatwave',
        actionPhase: this.mode === 'heatwave' && this.phase === 'planning' ? 'live' : 'planning'
      },
      {
        id: 'macro-ratp-scada',
        agentName: 'RATP / Enedis Infrastructure Resilience',
        roleBadge: 'Tier 3 • Transit & Grid Agent',
        accentHex: '#00e5ff',
        status: this.mode === 'flood' || this.mode === 'cyberattack' ? 'intervention' : 'nominal',
        headline:
          this.mode === 'flood'
            ? 'Crue +8.55m: Louvre Cofferdams & Line 4 Saint-Michel Bulkheads Sealed'
            : this.mode === 'cyberattack'
              ? 'CERT-FR Alert: CBTC Lines 1/4/14 & 84 Traffic Signal PLCs Compromised'
              : 'Subterranean Métro & Surface Grid Synchronized',
        recommendation:
          'Test Paris against a 1910-scale Centenary Seine Flood (+8.6m) or a coordinated SCADA Cyberattack.',
        metricSummary: '16 Métro Lines • 300 Commuter Streams',
        actionLabel:
          this.mode === 'flood' ? '💻 Switch to Cyberattack Sim' : '🌊 Simulate Seine Flood +8.6m',
        actionDomain: this.mode === 'flood' ? 'cyberattack' : 'flood',
        actionPhase: 'live'
      }
    ];
  }

  // ── 12. Mode, Phase & Mitigation Controls ─────────────────────────────────

  public setSimulationMode(
    mode: ParisSimulationModeId,
    phase: ParisSimulationPhaseId = this.phase
  ): void {
    this.mode = mode;
    this.phase = phase;
    this.simElapsedSec = 0;

    // Configure domain-specific road closures & vehicle fleet
    if (mode === 'none') {
      this.clearClosures();
      this.trafficGroup.visible = false;
      this.commuterGroup.visible = false;
      this.signalsGroup.visible = false;
      this.congestionGroup.visible = false;
      this.barriersGroup.visible = false;
      this.marathonGroup.visible = false;
      this.planningWarningsGroup.visible = false;
      this.heatwaveGroup.visible = false;
      this.protestGroup.visible = false;
      this.floodGroup.visible = false;
      this.cyberGroup.visible = false;
      this.probesGroup.visible = false;
      this.onSimulationStateChanged?.(mode, phase);
      return;
    }

    const isLive = phase === 'live';

    if (mode === 'traffic') {
      this.scenario = 'rush_hour';
      this.marathonClosuresEnabled = false;
      this.clearClosures();
      this.respawnCars(isLive ? 220 : 130);
    } else if (mode === 'marathon') {
      this.scenario = 'marathon_de_paris';
      this.marathonClosuresEnabled = isLive;
      if (isLive) {
        this.closeEdges(this.marathonCrossingEdgeIds);
        this.respawnCars(180);
      } else {
        this.clearClosures();
        this.respawnCars(110);
      }
    } else if (mode === 'heatwave') {
      this.scenario = 'heatwave_44c';
      this.marathonClosuresEnabled = false;
      this.clearClosures();
      this.respawnCars(150);
    } else if (mode === 'protest') {
      this.scenario = 'protest_republique';
      const protestCrossings = this.findEdgesCrossingPath(this.protestRoutePoints, 1.15);
      if (isLive) {
        this.closeEdges(protestCrossings);
        this.respawnCars(175);
      } else {
        this.clearClosures();
        this.respawnCars(120);
      }
    } else if (mode === 'flood') {
      this.scenario = 'seine_flood_8m';
      const floodEdgeIds = this.edges
        .filter((e) => e.tier === 'quai' || (e.tier === 'bridge' && e.id % 2 === 0))
        .map((e) => e.id);
      if (isLive) {
        this.closeEdges(floodEdgeIds);
        this.respawnCars(170);
      } else {
        this.clearClosures();
        this.respawnCars(120);
      }
    } else if (mode === 'cyberattack') {
      this.scenario = 'cyber_gridlock';
      this.clearClosures();
      this.respawnCars(isLive ? 230 : 130);
    }

    // Sync 3D layer visibilities for active domain & phase
    this.trafficGroup.visible = true;
    this.commuterGroup.visible = true;
    this.signalsGroup.visible = this.signalsEnabled;
    this.congestionGroup.visible = this.congestionHeatmapEnabled;
    this.barriersGroup.visible = isLive && this.closedEdgeIds.size > 0;

    this.marathonGroup.visible = mode === 'marathon';
    this.runnerInstancedMesh.visible = mode === 'marathon' && isLive;

    this.heatwaveGroup.visible = mode === 'heatwave';
    this.protestGroup.visible = mode === 'protest' && isLive;
    this.floodGroup.visible = mode === 'flood';
    this.cyberGroup.visible = mode === 'cyberattack' && isLive;
    this.probesGroup.visible = true;

    // Show 3D Planning / Warning Domes matching the active domain
    this.planningWarningsGroup.visible = true;
    for (const d of this.planningDomeMeshes) {
      d.group.visible = d.domain === mode;
    }

    this.updateTrafficLightVisuals();
    this.onSimulationStateChanged?.(mode, phase);
  }

  public setSimulationPhase(phase: ParisSimulationPhaseId): void {
    this.setSimulationMode(this.mode === 'none' ? 'marathon' : this.mode, phase);
  }

  public getSimulationMode(): ParisSimulationModeId {
    return this.mode;
  }

  public getSimulationPhase(): ParisSimulationPhaseId {
    return this.phase;
  }

  // ── Race Condition Simulation Run Controls & A2UI Report Card Lifecycle ────

  public setTargetDurationSeconds(sec: number): void {
    this.targetDurationSec = Math.max(10, Math.min(600, Math.round(sec)));
  }

  public getTargetDurationSeconds(): number {
    return this.targetDurationSec;
  }

  public setSimSpeedMultiplier(speed: 1 | 2 | 4): void {
    this.simSpeedMultiplier = speed;
  }

  public getSimSpeedMultiplier(): 1 | 2 | 4 {
    return this.simSpeedMultiplier;
  }

  public setPaused(paused: boolean): void {
    this.simPaused = paused;
  }

  public togglePaused(): boolean {
    if (this.simCompleted) return true;
    this.simPaused = !this.simPaused;
    return this.simPaused;
  }

  public isPaused(): boolean {
    return this.simPaused;
  }

  public isCompleted(): boolean {
    return this.simCompleted;
  }

  public getLastReportCard(): ParisSimulationReportCard | null {
    return this.lastReportCard;
  }

  /**
   * Triggered ONLY from the Plan mode when the user clicks "Launch Simulation".
   * Resets elapsed timer, snapshots, and starts the live simulation run for `targetDurationSec`.
   */
  public startLiveSimulationRun(
    mode?: ParisSimulationModeId,
    durationSec?: number
  ): void {
    if (typeof durationSec === 'number' && durationSec >= 10) {
      this.targetDurationSec = Math.round(durationSec);
    }
    const targetMode = mode && mode !== 'none' ? mode : this.mode === 'none' ? 'marathon' : this.mode;
    this.simRunElapsedSec = 0;
    this.simElapsedSec = 0;
    this.vitalsSnapAccum = 0;
    this.peakCongestionPct = 0;
    this.minTrafficSpeedKmh = 46;
    this.vitalsSnapshots = [];
    this.simPaused = false;
    this.simCompleted = false;
    this.lastReportCard = null;
    this.setSimulationMode(targetMode, 'live');
    this.recordVitalsSnapshot();
  }

  /**
   * Completes the live simulation run (either automatically when timer hits 100%
   * or when the user clicks "Complete & Score Now") and generates the A2UI Report Card.
   */
  public completeSimulationRun(): ParisSimulationReportCard {
    this.simRunElapsedSec = this.targetDurationSec;
    this.simCompleted = true;
    this.simPaused = true;
    this.recordVitalsSnapshot();
    const report = this.compileA2uiReportCard();
    this.lastReportCard = report;
    this.onSimulationCompleted?.(report);
    return report;
  }

  /**
   * Cancels / ends the active simulation run so the user can return to Plan or Learn mode.
   */
  public cancelSimulationRun(returnToMode: 'plan' | 'learn' = 'plan'): void {
    this.simPaused = false;
    this.simCompleted = false;
    this.simRunElapsedSec = 0;
    this.lastReportCard = null;
    if (returnToMode === 'learn') {
      this.setSimulationMode('none', 'planning');
    } else {
      const planMode = this.mode === 'none' ? 'marathon' : this.mode;
      this.setSimulationMode(planMode, 'planning');
    }
  }

  private recordVitalsSnapshot(): void {
    const t = this.getTelemetry();
    this.peakCongestionPct = Math.max(this.peakCongestionPct, t.congestionIndexPct);
    this.minTrafficSpeedKmh = Math.min(this.minTrafficSpeedKmh, t.avgTrafficSpeedKmh);
    this.vitalsSnapshots.push({
      tick: this.vitalsSnapshots.length + 1,
      simTimeLabel: t.simClockLabel.replace('LIVE ', ''),
      avgSpeedKmh: t.avgTrafficSpeedKmh,
      congestionPct: t.congestionIndexPct
    });
  }

  /**
   * Generates a complete Post-Simulation Report Card structured as an A2UI `surfaceUpdate`
   * component graph (Card, Column, Row, Tabs, Text, Divider, Button) modeled on Race Condition.
   */
  public compileA2uiReportCard(): ParisSimulationReportCard {
    const t = this.getTelemetry();
    const events = this.getEventLog();
    const macros = this.getMacroControllerCards();

    if (this.vitalsSnapshots.length === 0) {
      this.recordVitalsSnapshot();
    }

    const peakCong = Math.max(this.peakCongestionPct, t.congestionIndexPct);
    const minSpeed = Math.min(this.minTrafficSpeedKmh, t.avgTrafficSpeedKmh);

    // Compute City Resilience Score (0..100) & Grade
    const baseScore = this.mitigationActive ? 86 : 58;
    const congestionPenalty = Math.max(0, Math.round((peakCong - 55) * 0.35));
    const speedBonus = minSpeed >= 24 ? 6 : 0;
    const resilienceScore = Math.max(32, Math.min(98, baseScore - congestionPenalty + speedBonus));

    let resilienceGrade: ParisSimulationReportCard['resilienceGrade'] = 'B';
    let gradeColorHex = '#fbbf24';
    if (resilienceScore >= 90) {
      resilienceGrade = 'A';
      gradeColorHex = '#34d399';
    } else if (resilienceScore >= 82) {
      resilienceGrade = 'A-';
      gradeColorHex = '#34d399';
    } else if (resilienceScore >= 75) {
      resilienceGrade = 'B+';
      gradeColorHex = '#6ee7b7';
    } else if (resilienceScore >= 68) {
      resilienceGrade = 'B';
      gradeColorHex = '#fbbf24';
    } else if (resilienceScore >= 60) {
      resilienceGrade = 'C+';
      gradeColorHex = '#f59e0b';
    } else if (resilienceScore >= 50) {
      resilienceGrade = 'C';
      gradeColorHex = '#f97316';
    } else {
      resilienceGrade = 'D';
      gradeColorHex = '#f87171';
    }

    const simulatedHours = Number(((this.targetDurationSec / 60) * 3.0).toFixed(1));
    const mitigationTag = this.mitigationActive
      ? 'WITH PRE-EVENT MITIGATION ACTIVE'
      : 'UNMITIGATED BASELINE RUN';

    const executiveSummary = this.mitigationActive
      ? `Completed ${this.targetDurationSec}s simulation (${simulatedHours}h simulated city window) for ${t.domainTitle} (${mitigationTag}). Pre-staged ADK macro-interventions reduced peak boulevard congestion to ${peakCong}% and maintained ${minSpeed} km/h minimum emergency corridor velocity.`
      : `Completed ${this.targetDurationSec}s simulation (${simulatedHours}h simulated city window) for ${t.domainTitle} (${mitigationTag}). Without pre-staged mitigation, boulevard saturation peaked at ${peakCong}% (${minSpeed} km/h minimum velocity) across ${t.closedEdgesCount} affected axes.`;

    const kpiComparisons: ParisSimulationReportCard['kpiComparisons'] = [
      {
        label: t.kpi1Label,
        plannedForecast:
          this.mode === 'marathon'
            ? '19 Cross-Streets Severed'
            : this.mode === 'heatwave'
              ? '44.0°C Urban Heat Dome'
              : this.mode === 'protest'
                ? '50,000 Projected Marchers'
                : this.mode === 'flood'
                  ? '+8.60m Peak Forecast'
                  : '84 Signal PLCs Exposed',
        actualOutcome: t.kpi1Value,
        deltaVerdict: this.mitigationActive ? '✅ Contained within threshold' : '⚠ Exceeded baseline capacity',
        tone: this.mitigationActive ? 'nominal' : 'warning'
      },
      {
        label: t.kpi2Label,
        plannedForecast:
          this.mode === 'marathon'
            ? '54,000 Runners (+34m delay)'
            : this.mode === 'heatwave'
              ? '2 AP-HP ERs >100% Load'
              : this.mode === 'protest'
                ? '38 High-Risk Retail Blocks'
                : this.mode === 'flood'
                  ? '24 Riverfront Quais at Risk'
                  : 'Lines 1, 4, 14 Vulnerable',
        actualOutcome: t.kpi2Value,
        deltaVerdict: this.mitigationActive ? '✅ Stabilized via A2A dispatch' : '🔴 Critical saturation recorded',
        tone: this.mitigationActive ? 'nominal' : 'critical'
      },
      {
        label: 'PEAK CONGESTION INDEX',
        plannedForecast: '78% Projected Peak',
        actualOutcome: `${peakCong}% Peak (${minSpeed} km/h floor)`,
        deltaVerdict: peakCong < 75 ? '✅ Below forecasted choke level' : '🔴 Severe arterial queuing',
        tone: peakCong < 75 ? 'nominal' : 'critical'
      },
      {
        label: t.kpi4Label,
        plannedForecast: 'Baseline RATP / BSPP Reserve',
        actualOutcome: t.kpi4Value,
        deltaVerdict: this.mitigationActive ? '✅ +35% Surge Reserve Active' : '⚠ Manual spillover response',
        tone: this.mitigationActive ? 'nominal' : 'warning'
      }
    ];

    const agentPostMortem = macros.map((m) => ({
      agentName: m.agentName,
      roleBadge: m.roleBadge,
      finding: m.headline,
      nextStepRecommendation: m.recommendation
    }));

    // Build genuine A2UI Surface Component Graph (Card -> Header, Tabs[Scorecard, Events, Agents], Footer Buttons)
    const components: A2uiComponentDef[] = [
      {
        id: 'root-report-card',
        component: {
          Card: {
            children: ['header-col', 'div-top', 'report-tabs', 'div-bottom', 'footer-actions-row']
          }
        }
      },
      {
        id: 'header-col',
        component: {
          Column: {
            children: ['header-badge-row', 'header-title', 'header-summary']
          }
        }
      },
      {
        id: 'header-badge-row',
        component: {
          Row: {
            children: ['surface-tag', 'grade-pill']
          }
        }
      },
      {
        id: 'surface-tag',
        component: {
          Text: {
            text: `A2UI SCORECARD • ${this.targetDurationSec}S RUN (${simulatedHours}H SIMULATED)`,
            usageHint: 'badge'
          }
        }
      },
      {
        id: 'grade-pill',
        component: {
          Text: {
            text: `RESILIENCE GRADE ${resilienceGrade} (${resilienceScore}/100)`,
            usageHint: 'grade'
          }
        }
      },
      {
        id: 'header-title',
        component: {
          Text: {
            text: `${t.domainTitle} — Post-Simulation Report`,
            usageHint: 'h1'
          }
        }
      },
      {
        id: 'header-summary',
        component: {
          Text: {
            text: executiveSummary,
            usageHint: 'body'
          }
        }
      },
      {
        id: 'div-top',
        component: { Divider: { axis: 'horizontal' } }
      },
      {
        id: 'report-tabs',
        component: {
          Tabs: {
            tabItems: [
              { title: '📊 Forecast vs. Actuals', child: 'tab-scorecard-col' },
              { title: `📜 Recorded Events (${events.length})`, child: 'tab-events-col' },
              { title: `🧠 ADK Agent Post-Mortem (${agentPostMortem.length})`, child: 'tab-agents-col' }
            ]
          }
        }
      },
      {
        id: 'tab-scorecard-col',
        component: {
          Column: {
            children: kpiComparisons.map((_, idx) => `kpi-comp-row-${idx}`)
          }
        }
      },
      {
        id: 'tab-events-col',
        component: {
          Column: {
            children: events.slice(0, 6).map((_, idx) => `event-row-${idx}`)
          }
        }
      },
      {
        id: 'tab-agents-col',
        component: {
          Column: {
            children: agentPostMortem.map((_, idx) => `agent-pm-row-${idx}`)
          }
        }
      },
      {
        id: 'div-bottom',
        component: { Divider: { axis: 'horizontal' } }
      },
      {
        id: 'footer-actions-row',
        component: {
          Row: {
            children: ['btn-rerun', 'btn-return-plan', 'btn-return-learn']
          }
        }
      },
      {
        id: 'btn-rerun',
        component: {
          Button: {
            label: '🔄 Re-Run Simulation',
            variant: 'rerun',
            action: { name: 'rerun_simulation' }
          }
        }
      },
      {
        id: 'btn-return-plan',
        component: {
          Button: {
            label: '📋 End & Return to Plan',
            primary: true,
            variant: 'plan',
            action: { name: 'return_to_plan' }
          }
        }
      },
      {
        id: 'btn-return-learn',
        component: {
          Button: {
            label: '📖 End & Return to Learn',
            variant: 'learn',
            action: { name: 'return_to_learn' }
          }
        }
      }
    ];

    return {
      simulationId: `sim-paris-${this.mode}-${Date.now()}`,
      mode: this.mode,
      domainTitle: t.domainTitle,
      durationWallSec: this.targetDurationSec,
      simulatedHours,
      totalTicksCompiled: this.vitalsSnapshots.length,
      mitigationApplied: this.mitigationActive,
      resilienceScore,
      resilienceGrade,
      gradeColorHex,
      executiveSummary,
      kpiComparisons,
      vitalsTrend: [...this.vitalsSnapshots],
      recordedEvents: events,
      agentPostMortem,
      a2uiSurface: {
        surfaceId: `a2ui-report-${this.mode}`,
        rootComponentId: 'root-report-card',
        components
      }
    };
  }

  public toggleMitigation(): boolean {
    this.mitigationActive = !this.mitigationActive;
    if (this.mitigationActive) {
      // Mitigations reduce surface vehicle pressure by 30% (commuters shifted to Metro / bypasses)
      this.respawnCars(Math.max(70, Math.round(this.cars.length * 0.7)));
    } else {
      this.respawnCars(Math.min(240, Math.round(this.cars.length * 1.35)));
    }
    return this.mitigationActive;
  }

  public applyScenarioPreset(preset: ParisScenarioPresetId): void {
    this.scenario = preset;
    if (preset === 'normal_flow') {
      this.setSimulationMode('traffic', 'planning');
    } else if (preset === 'rush_hour') {
      this.setSimulationMode('traffic', 'live');
    } else if (preset === 'marathon_de_paris') {
      this.setSimulationMode('marathon', 'live');
    } else if (preset === 'heatwave_44c') {
      this.setSimulationMode('heatwave', 'live');
    } else if (preset === 'protest_republique') {
      this.setSimulationMode('protest', 'live');
    } else if (preset === 'seine_flood_8m') {
      this.setSimulationMode('flood', 'live');
    } else if (preset === 'cyber_gridlock') {
      this.setSimulationMode('cyberattack', 'live');
    }
  }

  public getScenarioPreset(): ParisScenarioPresetId {
    return this.scenario;
  }

  public setSignalsEnabled(enabled: boolean): void {
    this.signalsEnabled = enabled;
    this.signalsGroup.visible = this.mode !== 'none' && this.signalsEnabled;
  }

  public setCongestionHeatmapEnabled(enabled: boolean): void {
    this.congestionHeatmapEnabled = enabled;
    this.congestionGroup.visible = this.mode !== 'none' && this.congestionHeatmapEnabled;
  }

  public setMarathonClosuresEnabled(enabled: boolean): void {
    this.marathonClosuresEnabled = enabled;
    if (enabled) {
      this.setSimulationMode('marathon', 'live');
    } else {
      this.setSimulationMode('marathon', 'planning');
    }
  }

  public updateYear(year: number): void {
    this.currentYear = year;
    const isHistorical = year < 1950;
    this.trafficGroup.scale.setScalar(isHistorical ? 0.9 : 1.0);
  }

  public getTelemetry(): ParisSimulationTelemetry {
    let totalSpeed = 0;
    for (const c of this.cars) {
      totalSpeed += c.speed;
    }
    const avgWorldSpeed = this.cars.length > 0 ? totalSpeed / this.cars.length : MAX_SPEED * 0.7;
    const rawSpeedKmh = Math.round((avgWorldSpeed / MAX_SPEED) * 46);
    const avgTrafficSpeedKmh =
      this.mode === 'cyberattack' && this.phase === 'live'
        ? Math.min(11, rawSpeedKmh)
        : this.mitigationActive
          ? Math.min(48, rawSpeedKmh + 7)
          : rawSpeedKmh;

    const densityFactor = Math.min(1, this.cars.length / 220);
    const closurePenalty = Math.min(0.38, this.closedEdgeIds.size * 0.014);
    const cyberPenalty = this.mode === 'cyberattack' && this.phase === 'live' ? 0.42 : 0;
    const mitigationBonus = this.mitigationActive ? -0.18 : 0;
    const speedDrop = Math.max(0, 1 - avgWorldSpeed / (MAX_SPEED * 0.85));
    const congestionIndexPct = Math.min(
      98,
      Math.max(
        12,
        Math.round(
          (densityFactor * 0.42 + speedDrop * 0.35 + closurePenalty + cyberPenalty + mitigationBonus) *
            100
        )
      )
    );

    const progressRatio =
      this.targetDurationSec > 0
        ? Math.min(1, Math.max(0, this.simRunElapsedSec / this.targetDurationSec))
        : 0;
    const runProgressPct = Math.round(progressRatio * 100);
    const runRemainingSec = Math.max(0, Math.ceil(this.targetDurationSec - this.simRunElapsedSec));

    // Map the run progress to a 6-hour simulated city window (like Race Condition's 6h race clock)
    const totalSimulatedMinutes = Math.floor(progressRatio * 360);
    const simulatedElapsedHours = Math.floor(totalSimulatedMinutes / 60);
    const simulatedElapsedMins = totalSimulatedMinutes % 60;

    const simMins = 8 * 60 + totalSimulatedMinutes;
    const hh = String(Math.floor((simMins / 60) % 24)).padStart(2, '0');
    const mm = String(simMins % 60).padStart(2, '0');
    const simClockLabel = this.phase === 'planning' ? 'FORECAST T-00:00' : `LIVE ${hh}:${mm}`;

    const isPlanning = this.phase === 'planning';

    let domainTitle = 'Paris Surface Traffic & Commuters';
    let phaseBannerTitle = isPlanning
      ? '📋 PLANNING PHASE • Predictive Bottleneck Model'
      : '▶ LIVE SIMULATION • Active City Impact & Event Recording';
    let phaseBannerSubtitle = isPlanning
      ? '3D warning domes mark predicted choke points before closures take effect.'
      : 'Autonomous vehicles, commuter streams, and city infrastructure are reacting in real time.';
    let kpi1Label = 'AUTONOMOUS VEHICLES';
    let kpi1Value = `${this.cars.length} Cars (${avgTrafficSpeedKmh} km/h)`;
    let kpi2Label = 'COMMUTER FLOWS';
    let kpi2Value = `${this.commuters.length} Active Streams`;
    let kpi3Label = 'CONGESTION INDEX';
    let kpi3Value = `${congestionIndexPct}% Boulevard Load`;
    let kpi4Label = 'SIGNALIZED CARREFOURS';
    let kpi4Value = `${this.controllers.length} Intersections`;
    let mitigationLabel = 'Deploy RATP Line 1/14 Frequency Boost & Périphérique Bypass';

    if (this.mode === 'marathon') {
      domainTitle = 'Marathon de Paris (42.195 km)';
      phaseBannerSubtitle = isPlanning
        ? 'Predicting 6 critical congestion choke points across 34 severed cross-streets (Concorde, Rivoli, Bastille, Alma).'
        : '34 cross-streets closed with Préfecture barriers; 220 pack runners on course; Dijkstra traffic rerouting active.';
      kpi1Label = isPlanning ? 'PREDICTED CLOSURES' : 'ACTIVE BARRIERS';
      kpi1Value = `${this.marathonCrossingEdgeIds.length} Severed Axes`;
      kpi2Label = isPlanning ? 'PROJECTED RUNNERS' : 'PACK RUNNERS ON COURSE';
      kpi2Value = isPlanning ? '54,000 Entrants (220 Sim)' : '220 Pack Runners • 42.2 km';
      kpi3Label = isPlanning ? 'PREDICTED PEAK DELAY' : 'LIVE BOULEVARD DELAY';
      kpi3Value = isPlanning ? '+34 min at Concorde' : `${congestionIndexPct}% Congestion (${avgTrafficSpeedKmh} km/h)`;
      kpi4Label = 'METRO SPILLOVER';
      kpi4Value = this.mitigationActive ? '+31K Absorbed (Boosted)' : '+22K Riders on Lines 1/14';
      mitigationLabel = 'Pre-Boost Automated Metro Lines 1 & 14 (+35% Capacity)';
    } else if (this.mode === 'heatwave') {
      domainTitle = 'Canicule 44°C (Extreme Heat Wave)';
      phaseBannerSubtitle = isPlanning
        ? 'Forecasting Urban Heat Islands (+44.4°C on zinc roofs) and AP-HP hospital ER overload risks.'
        : 'SAMU 75 ambulances racing to AP-HP hospitals; Hôtel-Dieu & Lariboisière at >100% capacity diverting patients.';
      kpi1Label = 'PEAK SURFACE TEMP';
      kpi1Value = '44.4°C (Zinc Roofs 58°C)';
      kpi2Label = 'AP-HP HOSPITAL STATUS';
      kpi2Value = isPlanning
        ? '2 Hospitals Projected >100%'
        : this.mitigationActive
          ? 'All 5 ERs Stabilized (<92%)'
          : '2 Overwhelmed (Hôtel-Dieu/Larib.)';
      kpi3Label = 'SAMU 75 DISPATCH';
      kpi3Value = isPlanning ? '18 Mobile ICU Units Staged' : '18 Ambulances Active (Sirens)';
      kpi4Label = 'COOLING OASES & RAIL';
      kpi4Value = 'Line 6 Slowed 35 km/h • 2 Parks';
      mitigationLabel = 'Activate Plan Blanc Level 3 (Field Cooling Tents & ER Surge Wards)';
    } else if (this.mode === 'protest') {
      domainTitle = 'Grande Manifestation & Urban Unrest';
      phaseBannerSubtitle = isPlanning
        ? 'Mapping République → Bastille → Nation cortège & predicting retail storefront looting/fire flashpoints.'
        : '65,000-person cortège marching; storefront looting & 6 building fires active with rising smoke plumes.';
      kpi1Label = 'CORTÈGE & CROWD SIZE';
      kpi1Value = '65,000 Marchers (République→Nation)';
      kpi2Label = isPlanning ? 'AT-RISK STOREFRONTS' : 'STORES DAMAGED / LOOTED';
      kpi2Value = isPlanning
        ? '38 High-Risk Retail Blocks'
        : this.mitigationActive
          ? '9 Vitrines Damaged (Contained)'
          : '23 Stores Looted (Rivoli/Voltaire)';
      kpi3Label = isPlanning ? 'FIRE FLASHPOINT RISK' : 'BUILDINGS BURNING';
      kpi3Value = isPlanning ? '6 Critical Flashpoints' : '6 Active Fires • BSPP Deployed';
      kpi4Label = 'METRO & CORDONS';
      kpi4Value = `${this.closedEdgeIds.size} Streets Barricaded • 4 Stations Closed`;
      mitigationLabel = 'Deploy BSPP Fire Engines & Préfecture Protective Storefront Cordons';
    } else if (this.mode === 'flood') {
      domainTitle = 'Crue Centennale de la Seine (+8.60m)';
      phaseBannerSubtitle = isPlanning
        ? '1910-scale Centenary Flood forecast: mapping riverbanks, bridges, and Metro under-river tunnels at risk.'
        : `Seine floodwaters at +${this.floodLevelMeters.toFixed(2)}m submerging Quais, Bercy & Javel; Louvre cofferdams active.`;
      kpi1Label = 'ALMA ZOUAVE GAUGE';
      kpi1Value = isPlanning ? '+8.60m Projected Peak' : `+${this.floodLevelMeters.toFixed(2)}m Live Level`;
      kpi2Label = 'SUBMERGED QUAIS & BRIDGES';
      kpi2Value = isPlanning ? '24 Riverfront Axes at Risk' : `${this.closedEdgeIds.size} Quais/Bridges Submerged`;
      kpi3Label = 'UNDER-RIVER METRO';
      kpi3Value = isPlanning ? '6 River Crossings Vulnerable' : 'Line 4 & 12 Bulkheads Sealed';
      kpi4Label = 'MONUMENT PROTECTION';
      kpi4Value = this.mitigationActive ? 'Louvre & Orsay Cofferdams 100%' : 'Seepage Pumping at Orsay/Bercy';
      mitigationLabel = 'Erect Louvre/Orsay Mobile Cofferdams & Seal Subterranean Bulkheads';
    } else if (this.mode === 'cyberattack') {
      domainTitle = 'City-Wide SCADA / OT Cyberattack';
      phaseBannerSubtitle = isPlanning
        ? 'Identifying critical SCADA attack surfaces across automated Metro CBTC, SURF traffic lights, and Enedis power.'
        : '84 carrefour signal controllers spoofed into gridlock; automated Metro Lines 1/4/14 halted; 10e/18e blackout.';
      kpi1Label = 'TRAFFIC SIGNAL SCADA';
      kpi1Value = isPlanning
        ? `${this.controllers.length} PLCs Exposed`
        : this.mitigationActive
          ? 'Manual Override Restored (62%)'
          : `${this.controllers.length} Carrefours Spoofed`;
      kpi2Label = 'AUTOMATED METRO CBTC';
      kpi2Value = isPlanning ? 'Lines 1, 4, 14 Target Risk' : 'Lines 1, 4, 14 Halted (+48K Stranded)';
      kpi3Label = 'ENEDIS POWER GRID';
      kpi3Value = isPlanning ? '4 HV Substations Targeted' : '2 Sectors in Rolling Blackout';
      kpi4Label = 'CITY GRIDLOCK SPEED';
      kpi4Value = `${avgTrafficSpeedKmh} km/h (${congestionIndexPct}% Gridlock)`;
      mitigationLabel = 'Execute ANSSI Air-Gap Isolation & Manual Carrefour Signal Override';
    }

    return {
      mode: this.mode,
      phase: this.phase,
      scenario: this.scenario,
      simElapsedSec: this.simElapsedSec,
      simClockLabel,
      targetDurationSec: this.targetDurationSec,
      runElapsedSec: Math.min(this.targetDurationSec, Math.floor(this.simRunElapsedSec)),
      runRemainingSec,
      runProgressPct,
      simSpeedMultiplier: this.simSpeedMultiplier,
      isPaused: this.simPaused,
      isCompleted: this.simCompleted,
      simulatedElapsedHours,
      simulatedElapsedMins,
      activeCarsCount: this.cars.length,
      activeCommutersCount: this.commuters.length,
      totalRoadNodes: this.nodes.length,
      totalRoadEdges: this.edges.length,
      closedEdgesCount: this.closedEdgeIds.size,
      activeSignalizedIntersections: this.controllers.length,
      avgTrafficSpeedKmh,
      congestionIndexPct,
      activeMarathonRunners: this.marathonRunners.length,
      marathonCourseKm: 42.2,
      signalsEnabled: this.signalsEnabled,
      congestionHeatmapEnabled: this.congestionHeatmapEnabled,
      marathonClosuresEnabled: this.marathonClosuresEnabled,
      domainTitle,
      phaseBannerTitle,
      phaseBannerSubtitle,
      kpi1Label,
      kpi1Value,
      kpi2Label,
      kpi2Value,
      kpi3Label,
      kpi3Value,
      kpi4Label,
      kpi4Value,
      mitigationActive: this.mitigationActive,
      mitigationLabel
    };
  }

  // ── 13. Per-Frame Organic Animation Loop ──────────────────────────────────

  public updateAnimation(elapsedTime: number, deltaSeconds = 0.016): void {
    if (this.mode === 'none') return;
    const rawDt = Math.min(0.05, Math.max(0.001, deltaSeconds));

    // Always pulse 3D planning domes in Planning mode
    this.updatePlanningDomesAnimation(elapsedTime);

    // In Live mode, respect Race Condition Pause / Completed state
    if (this.phase === 'live' && (this.simPaused || this.simCompleted)) {
      return;
    }

    const dt = this.phase === 'live' ? rawDt * this.simSpeedMultiplier : rawDt;
    this.simElapsedSec += dt;

    if (this.phase === 'live') {
      this.simRunElapsedSec += dt;
      this.vitalsSnapAccum += dt;
      if (this.vitalsSnapAccum >= 5.0) {
        this.vitalsSnapAccum = 0;
        this.recordVitalsSnapshot();
      }
      if (this.simRunElapsedSec >= this.targetDurationSec && !this.simCompleted) {
        this.completeSimulationRun();
        return;
      }
    }

    if (this.signalsEnabled) {
      this.tickTrafficSignals(dt);
    }
    this.tickCarsAndCongestion(elapsedTime, dt);
    this.tickCommuters(elapsedTime, dt);

    if (this.mode === 'marathon' && this.phase === 'live') {
      this.updateMarathonRunners(dt);
    }

    if (this.mode === 'heatwave') {
      this.updateHeatwaveAnimation(elapsedTime);
    } else if (this.mode === 'protest' && this.phase === 'live') {
      this.updateProtestAndFireAnimation(elapsedTime, dt);
    } else if (this.mode === 'flood') {
      this.updateFloodAnimation(elapsedTime, dt);
    } else if (this.mode === 'cyberattack' && this.phase === 'live') {
      this.updateCyberattackAnimation(elapsedTime);
    }

    this.updateHeroProbesAnimation(elapsedTime, dt);
  }

  private tickTrafficSignals(dt: number): void {
    if (this.mode === 'cyberattack' && this.phase === 'live') {
      this.updateTrafficLightVisuals();
      return;
    }

    let stateChanged = false;
    for (const ctrl of this.controllers) {
      if (ctrl.phases.length === 0) continue;
      ctrl.timer += dt;
      const phase = ctrl.phases[ctrl.currentPhase];

      if (ctrl.currentState === 'green' && ctrl.timer >= phase.greenDuration) {
        ctrl.timer = 0;
        ctrl.currentState = 'yellow';
        stateChanged = true;
        for (const eid of phase.edgeIds) {
          const l = ctrl.lights.find((li) => li.edgeId === eid);
          if (l) l.state = 'yellow';
        }
      } else if (ctrl.currentState === 'yellow' && ctrl.timer >= phase.yellowDuration) {
        ctrl.timer = 0;
        ctrl.currentState = 'red';
        stateChanged = true;
        for (const l of ctrl.lights) l.state = 'red';
      } else if (ctrl.currentState === 'red' && ctrl.timer >= RED_GAP) {
        ctrl.timer = 0;
        ctrl.currentPhase = (ctrl.currentPhase + 1) % ctrl.phases.length;
        ctrl.currentState = 'green';
        stateChanged = true;
        const nextPhase = ctrl.phases[ctrl.currentPhase];
        for (const eid of nextPhase.edgeIds) {
          const l = ctrl.lights.find((li) => li.edgeId === eid);
          if (l) l.state = 'green';
        }
      }
    }

    if (stateChanged) {
      this.updateTrafficLightVisuals();
    }
  }

  private tickCarsAndCongestion(elapsedTime: number, dt: number): void {
    this.edgeCarCounts.clear();
    this.edgeAvgSpeedRatio.clear();

    for (const car of this.cars) {
      // Flash emergency beacons on ambulances & firetrucks
      if (car.kind === 'ambulance' || car.kind === 'firetruck') {
        const flash = Math.sin(elapsedTime * 16 + car.id) > 0;
        car.roofBeaconMat.color.setHex(
          car.kind === 'ambulance'
            ? flash
              ? 0x00e5ff
              : 0xffffff
            : flash
              ? 0xff2e43
              : 0xfacc15
        );
      }

      let desiredSpeed = car.targetSpeed;
      const distToEnd = car.totalDist - car.distAlongEdge;

      if (distToEnd < INTERSECTION_LOOK_AHEAD) {
        const lightState = this.getLightStateForCar(car);
        if (lightState === 'red' || lightState === 'yellow') {
          const stopAt = distToEnd - INTERSECTION_STOP_LINE;
          if (stopAt <= 0) {
            desiredSpeed = 0;
          } else {
            const maxStopSpeed = Math.sqrt(2 * BRAKING * stopAt);
            desiredSpeed = Math.min(desiredSpeed, maxStopSpeed);
          }
        }
      }

      const aheadDist = this.getDistToCarAhead(car);
      if (aheadDist !== null) {
        const gap = aheadDist - CAR_LENGTH * 1.3;
        if (gap < STOP_DISTANCE) {
          desiredSpeed = 0;
        } else if (gap < SAFE_DISTANCE) {
          const ratio = (gap - STOP_DISTANCE) / (SAFE_DISTANCE - STOP_DISTANCE);
          desiredSpeed = Math.min(desiredSpeed, car.targetSpeed * ratio);
        }
      }

      if (car.speed < desiredSpeed) {
        car.speed = Math.min(desiredSpeed, car.speed + ACCELERATION * dt);
      } else if (car.speed > desiredSpeed) {
        car.speed = Math.max(desiredSpeed, car.speed - BRAKING * dt);
      }

      car.distAlongEdge += car.speed * dt;

      const lightState = this.getLightStateForCar(car);
      if (lightState === 'red' || lightState === 'yellow') {
        const stopLimit = car.totalDist - INTERSECTION_STOP_LINE;
        if (stopLimit > 0 && car.distAlongEdge >= stopLimit) {
          car.distAlongEdge = stopLimit;
          car.speed = 0;
        }
      }

      while (car.distAlongEdge >= car.totalDist) {
        const curLight = this.getLightStateForCar(car);
        if (curLight === 'red' || curLight === 'yellow') {
          car.distAlongEdge = Math.max(0, car.totalDist - INTERSECTION_STOP_LINE);
          car.speed = 0;
          break;
        }

        car.distAlongEdge -= car.totalDist;
        car.routeIdx++;

        if (
          car.routeIdx >= car.route.length ||
          this.closedEdgeIds.has(car.route[car.routeIdx].edgeId)
        ) {
          this.assignNewDestination(car);
          break;
        }

        const step = car.route[car.routeIdx];
        const edge = this.edgeMap.get(step.edgeId)!;
        car.lanePoints = this.getLanePoints(edge, step.forward);
        const d = computePolylineDistances(car.lanePoints);
        car.cumDist = d.cumDist;
        car.totalDist = d.totalDist;
        car.currentNodeId = step.forward ? edge.from : edge.to;
      }

      this.positionCarOnEdge(car);

      const activeStep = car.route[car.routeIdx];
      if (activeStep) {
        const eid = activeStep.edgeId;
        const prevCount = this.edgeCarCounts.get(eid) ?? 0;
        const prevRatioSum = this.edgeAvgSpeedRatio.get(eid) ?? 0;
        this.edgeCarCounts.set(eid, prevCount + 1);
        this.edgeAvgSpeedRatio.set(eid, prevRatioSum + car.speed / Math.max(0.1, car.targetSpeed));
      }
    }

    // Update boulevard congestion heat ribbons & vertical 3D bottleneck columns
    if (this.congestionHeatmapEnabled) {
      for (const [edgeId, mesh] of this.edgeCongestionMeshes.entries()) {
        const mat = mesh.material as THREE.MeshBasicMaterial;
        const colMesh = this.edgeColumnMeshes.get(edgeId);

        if (this.closedEdgeIds.has(edgeId)) {
          mat.color.setHex(0xff2e43);
          mat.opacity = 0.78;
          if (colMesh) colMesh.visible = false;
          continue;
        }

        const count = this.edgeCarCounts.get(edgeId) ?? 0;
        if (count === 0) {
          mat.color.setHex(0x2ecc71);
          mat.opacity = 0.26;
          if (colMesh) colMesh.visible = false;
        } else {
          const avgRatio = (this.edgeAvgSpeedRatio.get(edgeId) ?? 1) / count;
          if (avgRatio < 0.42 || count >= 3) {
            mat.color.setHex(0xff2e43); // Heavy congestion
            mat.opacity = 0.75;
            if (colMesh && this.phase === 'live') {
              colMesh.visible = true;
              const targetH = Math.min(4.8, 1.2 + count * 0.75);
              colMesh.scale.set(1.0, targetH, 1.0);
              (colMesh.material as THREE.MeshBasicMaterial).opacity =
                0.42 + Math.sin(elapsedTime * 4 + edgeId) * 0.14;
            }
          } else if (avgRatio < 0.75 || count >= 2) {
            mat.color.setHex(0xf59e0b); // Moderate flow
            mat.opacity = 0.54;
            if (colMesh) colMesh.visible = false;
          } else {
            mat.color.setHex(0x2ecc71); // Free flow
            mat.opacity = 0.34;
            if (colMesh) colMesh.visible = false;
          }
        }
      }
    }
  }

  private tickCommuters(elapsedTime: number, dt: number): void {
    const speedMultiplier =
      this.mode === 'cyberattack' && this.phase === 'live'
        ? 1.65 // Stranded Metro passengers surging on foot
        : this.mode === 'heatwave' && this.phase === 'live'
          ? 0.65
          : 1.0;

    for (let i = 0; i < this.commuters.length; i++) {
      const c = this.commuters[i];
      const corridor = this.commuterCorridors[c.corridorIdx];
      c.distAlong = (c.distAlong + c.speed * speedMultiplier * dt) % corridor.totalDist;

      const d = c.distAlong;
      for (let s = 1; s < corridor.cumDist.length; s++) {
        if (corridor.cumDist[s] >= d || s === corridor.cumDist.length - 1) {
          const seg = corridor.cumDist[s] - corridor.cumDist[s - 1];
          const t = seg > 1e-4 ? (d - corridor.cumDist[s - 1]) / seg : 0;
          const pA = corridor.points[s - 1];
          const pB = corridor.points[s];

          const dx = pB.x - pA.x;
          const dz = pB.z - pA.z;
          const len = Math.hypot(dx, dz) || 1;
          const nx = (-dz / len) * c.lateralOffset;
          const nz = (dx / len) * c.lateralOffset;

          const x = pA.x + dx * t + nx;
          const z = pA.z + dz * t + nz;
          const bob = Math.abs(Math.sin(elapsedTime * 7.0 + c.phaseOffset)) * 0.06;
          const y = pA.y + (pB.y - pA.y) * t + bob;

          this.commuterDummy.position.set(x, y, z);
          this.commuterDummy.scale.setScalar(1.0);
          this.commuterDummy.updateMatrix();
          this.commuterInstancedMesh.setMatrixAt(i, this.commuterDummy.matrix);
          break;
        }
      }
    }
    this.commuterInstancedMesh.instanceMatrix.needsUpdate = true;
  }

  private updateMarathonRunners(dt: number): void {
    if (this.marathonCoursePoints.length < 2) return;

    for (let i = 0; i < this.marathonRunners.length; i++) {
      const r = this.marathonRunners[i];
      r.distAlongCourse = (r.distAlongCourse + r.speed * dt) % this.marathonTotalDist;
      r.stridePhase += dt * 11.0;

      const d = r.distAlongCourse;
      for (let s = 1; s < this.marathonCumDist.length; s++) {
        if (this.marathonCumDist[s] >= d || s === this.marathonCumDist.length - 1) {
          const seg = this.marathonCumDist[s] - this.marathonCumDist[s - 1];
          const t = seg > 1e-4 ? (d - this.marathonCumDist[s - 1]) / seg : 0;
          const pA = this.marathonCoursePoints[s - 1];
          const pB = this.marathonCoursePoints[s];

          const dx = pB.x - pA.x;
          const dz = pB.z - pA.z;
          const len = Math.hypot(dx, dz) || 1;
          const nx = (-dz / len) * r.lateralOffset;
          const nz = (dx / len) * r.lateralOffset;

          const x = pA.x + dx * t + nx;
          const z = pA.z + dz * t + nz;
          const bounce = Math.abs(Math.sin(r.stridePhase)) * 0.08;
          const y = pA.y + (pB.y - pA.y) * t + 0.1 + bounce;

          this.runnerDummy.position.set(x, y, z);
          this.runnerDummy.lookAt(pB.x + nx, y, pB.z + nz);
          this.runnerDummy.updateMatrix();
          this.runnerInstancedMesh.setMatrixAt(i, this.runnerDummy.matrix);
          break;
        }
      }
    }
    this.runnerInstancedMesh.instanceMatrix.needsUpdate = true;
  }

  private updatePlanningDomesAnimation(elapsedTime: number): void {
    const isPlanning = this.phase === 'planning';
    for (let i = 0; i < this.planningDomeMeshes.length; i++) {
      const item = this.planningDomeMeshes[i];
      if (!item.group.visible) continue;
      const pulse = 1.0 + Math.sin(elapsedTime * 3.2 + i) * (isPlanning ? 0.16 : 0.08);
      item.ring.scale.setScalar(pulse * 2.2);
      (item.pillar.material as THREE.MeshBasicMaterial).opacity = isPlanning
        ? 0.55 + Math.sin(elapsedTime * 4.0 + i) * 0.25
        : 0.28;
    }
  }

  private updateHeatwaveAnimation(elapsedTime: number): void {
    for (let i = 0; i < this.heatDomeMeshes.length; i++) {
      const m = this.heatDomeMeshes[i];
      const s = 1.0 + Math.sin(elapsedTime * 2.2 + i) * 0.06;
      m.scale.y = 0.8 + Math.sin(elapsedTime * 3.0 + i) * 0.25;
      m.rotation.y = elapsedTime * 0.15 * s;
    }

    for (let i = 0; i < this.hospitalTowers.length; i++) {
      const h = this.hospitalTowers[i];
      const pulse = 1.0 + Math.sin(elapsedTime * 4.5 + i) * 0.18;
      h.ringMesh.scale.set(pulse, pulse, 1);
      const effectiveLoad = this.mitigationActive ? h.loadRatio * 0.84 : h.loadRatio;
      h.fillMesh.scale.y = Math.min(1.15, effectiveLoad);
      h.fillMat.emissiveIntensity = 0.65 + Math.sin(elapsedTime * 6.0 + i) * 0.3;
    }
  }

  private updateProtestAndFireAnimation(elapsedTime: number, dt: number): void {
    // 1. Animate marching protest crowd along République -> Bastille -> Nation
    for (let i = 0; i < this.protestMarchers.length; i++) {
      const m = this.protestMarchers[i];
      m.dist = (m.dist + m.speed * dt) % this.protestTotalDist;
      const d = m.dist;
      for (let s = 1; s < this.protestCumDist.length; s++) {
        if (this.protestCumDist[s] >= d || s === this.protestCumDist.length - 1) {
          const seg = this.protestCumDist[s] - this.protestCumDist[s - 1];
          const t = seg > 1e-4 ? (d - this.protestCumDist[s - 1]) / seg : 0;
          const pA = this.protestRoutePoints[s - 1];
          const pB = this.protestRoutePoints[s];
          const dx = pB.x - pA.x;
          const dz = pB.z - pA.z;
          const len = Math.hypot(dx, dz) || 1;
          const nx = (-dz / len) * m.latOffset;
          const nz = (dx / len) * m.latOffset;

          const x = pA.x + dx * t + nx;
          const z = pA.z + dz * t + nz;
          const bounce = Math.abs(Math.sin(elapsedTime * 8.0 + m.phase)) * 0.08;
          const y = pA.y + (pB.y - pA.y) * t + bounce;

          this.runnerDummy.position.set(x, y, z);
          this.runnerDummy.updateMatrix();
          this.protestCrowdMesh.setMatrixAt(i, this.runnerDummy.matrix);
          break;
        }
      }
    }
    this.protestCrowdMesh.instanceMatrix.needsUpdate = true;

    // 2. Animate flickering building fires & rising dark smoke plumes
    for (let i = 0; i < this.firePlumes.length; i++) {
      const fp = this.firePlumes[i];
      const flicker = 0.82 + Math.sin(elapsedTime * 14.0 + i * 2.1) * 0.24;
      fp.flameMesh.scale.set(flicker, flicker * (this.mitigationActive ? 0.55 : 1.15), flicker);
      fp.flameMesh.rotation.y = elapsedTime * 2.5;

      const ringPulse = 1.0 + ((elapsedTime * 1.4 + i * 0.3) % 1.4);
      fp.shockRing.scale.set(ringPulse, ringPulse, 1);

      for (let s = 0; s < fp.smokePuffs.length; s++) {
        const puff = fp.smokePuffs[s];
        const cycle = (elapsedTime * 0.75 + s * 0.25 + i * 0.15) % 1.0;
        puff.position.y = 1.4 + cycle * 5.6;
        puff.position.x = Math.sin(elapsedTime * 2.0 + s) * 0.35;
        puff.scale.setScalar(0.65 + cycle * 1.45);
        (puff.material as THREE.MeshBasicMaterial).opacity = (1.0 - cycle) * 0.65;
      }
    }
  }

  private updateFloodAnimation(elapsedTime: number, dt: number): void {
    if (this.phase === 'planning') {
      this.floodLevelMeters = 4.2;
      this.floodWaterMesh.position.y = Math.sin(elapsedTime * 2.0) * 0.05;
      this.floodWaterMat.opacity = 0.38;
    } else {
      // Organically rise up to +8.60m during live flood simulation
      const targetMeters = this.mitigationActive ? 6.8 : 8.6;
      this.floodLevelMeters = Math.min(targetMeters, this.floodLevelMeters + dt * 0.45);
      const liftY = ((this.floodLevelMeters - 2.4) / 6.2) * 0.55;
      this.floodWaterMesh.position.y = liftY + Math.sin(elapsedTime * 2.4) * 0.04;
      this.floodWaterMat.opacity = 0.74;
    }

    for (let i = 0; i < this.floodBreachRings.length; i++) {
      const r = this.floodBreachRings[i];
      const wave = 1.0 + ((elapsedTime * 0.85 + i * 0.22) % 1.6);
      r.scale.set(wave, wave, 1);
      (r.material as THREE.MeshBasicMaterial).opacity = Math.max(0.1, 0.85 - (wave - 1.0) * 0.45);
    }
  }

  private updateCyberattackAnimation(elapsedTime: number): void {
    for (let i = 0; i < this.cyberGlitchDomes.length; i++) {
      const dome = this.cyberGlitchDomes[i];
      dome.rotation.y = elapsedTime * (i % 2 === 0 ? 1.2 : -1.2);
      const glitch = Math.sin(elapsedTime * 18.0 + i * 3.0) > 0.2 ? 0.52 : 0.15;
      (dome.material as THREE.MeshBasicMaterial).opacity = this.mitigationActive
        ? glitch * 0.45
        : glitch;
    }
    for (let i = 0; i < this.cyberBeams.length; i++) {
      const beam = this.cyberBeams[i];
      const pulse = 0.75 + Math.sin(elapsedTime * 10.0 + i) * 0.35;
      beam.scale.set(pulse, 1.0, pulse);
    }
  }

  private updateHeroProbesAnimation(elapsedTime: number, dt: number): void {
    this.thoughtTickAccumulator += dt;
    if (this.thoughtTickAccumulator >= 6.0) {
      this.thoughtTickAccumulator = 0;
      for (const probe of this.heroProbes) {
        probe.currentThoughtIdx = (probe.currentThoughtIdx + 1) % probe.innerThoughts.length;
      }
    }

    if (this.marathonRunners.length >= 1 && this.marathonCoursePoints.length >= 2) {
      this.sampleCoursePointInto(
        this.marathonRunners[0].distAlongCourse,
        this.heroProbes[0].position
      );
    }

    if (this.cars.length > 2) {
      const taxiCar = this.cars.find((c) => c.kind === 'taxi') ?? this.cars[0];
      const ambCar = this.cars.find((c) => c.kind === 'ambulance') ?? this.cars[1];
      if (taxiCar && this.heroProbes[1]) {
        this.heroProbes[1].position.copy(taxiCar.mesh.position);
      }
      if (ambCar && this.heroProbes[2]) {
        this.heroProbes[2].position.copy(ambCar.mesh.position);
      }
    }

    for (const probe of this.heroProbes) {
      const marker = this.probeMarkers.get(probe.id);
      if (!marker) continue;
      marker.position.copy(probe.position);

      const diamond = marker.getObjectByName('probe-diamond');
      if (diamond) {
        diamond.rotation.y = elapsedTime * 2.2;
        diamond.position.y = 2.95 + Math.sin(elapsedTime * 3.0) * 0.12;
      }
      const ring = marker.getObjectByName('probe-ring');
      if (ring) {
        const pulse = 1.0 + Math.sin(elapsedTime * 2.6) * 0.22;
        ring.scale.set(pulse, pulse, 1);
      }
    }
  }

  private sampleCoursePointInto(dist: number, target: THREE.Vector3): void {
    for (let s = 1; s < this.marathonCumDist.length; s++) {
      if (this.marathonCumDist[s] >= dist || s === this.marathonCumDist.length - 1) {
        const seg = this.marathonCumDist[s] - this.marathonCumDist[s - 1];
        const t = seg > 1e-4 ? (dist - this.marathonCumDist[s - 1]) / seg : 0;
        target.lerpVectors(this.marathonCoursePoints[s - 1], this.marathonCoursePoints[s], t);
        return;
      }
    }
  }
}
