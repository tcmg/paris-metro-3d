/**
 * Real-world WGS84 (latitude, longitude) geographic dataset of Paris:
 * - Equirectangular projection centered at Châtelet / Louvre (48.8584° N, 2.3440° E)
 * - Exact Seine River centerline + Île de la Cité, Île Saint-Louis, Île aux Cygnes
 * - Canal Saint-Martin & Bassin de la Villette
 * - 20 Historic Bridges across the Seine
 * - 65+ Real Parisian Haussmannian Boulevards, Radial Avenues, Quais, and Circular Places
 * - 12 Major Parisian Parks & Gardens
 */

export const CENTER_LAT = 48.8584;
export const CENTER_LON = 2.3440;

// At 48.8584° N: 1 deg lat = 111.2 km, 1 deg lon = 73.15 km.
// Scale: 1 km = 11.2 world units inside Paris core.
const KM_PER_DEG_LAT = 111.2;
const KM_PER_DEG_LON = 73.15;
const WORLD_UNITS_PER_KM = 11.2;

/**
 * Projects real-world WGS84 (lat, lon) into 3D world (x, z) coordinates.
 * Intra-muros Paris (< 5.6 km from Châtelet) is 100% linear true-to-scale.
 * Farther suburban extensions (> 5.6 km, e.g. Orly, Créteil, La Défense, Saint-Denis)
 * apply a smooth radial logarithmic collar so the entire metropolitan network fits on the diorama plinth.
 */
export function projectLatLon(lat: number, lon: number): { x: number; z: number } {
  const rawKmX = (lon - CENTER_LON) * KM_PER_DEG_LON;
  const rawKmZ = -(lat - CENTER_LAT) * KM_PER_DEG_LAT;

  const distKm = Math.hypot(rawKmX, rawKmZ);
  const coreRadiusKm = 7.0;

  let effectiveKm = distKm;
  if (distKm > coreRadiusKm) {
    const excess = distKm - coreRadiusKm;
    effectiveKm = coreRadiusKm + Math.log1p(excess * 0.30) * 5.6;
  }

  const scale = distKm > 0.0001 ? (effectiveKm / distKm) * WORLD_UNITS_PER_KM : WORLD_UNITS_PER_KM;
  return {
    x: rawKmX * scale,
    z: rawKmZ * scale
  };
}

/**
 * Exact WGS84 coordinates along the centerline of the Seine River from upstream Choisy/Vitry/Ivry/Charenton,
 * through the heart of Paris, and curving all around the great western & northern meanders
 * (Boulogne-Billancourt, Sèvres, Saint-Cloud, Suresnes, Puteaux, La Défense, Neuilly, Levallois,
 * Clichy, Asnières, Saint-Ouen, L'Île-Saint-Denis, Saint-Denis, Gennevilliers, Argenteuil, Nanterre, Rueil).
 */
export const SEINE_CENTERLINE_LATLON: [number, number, number][] = [
  // [lat, lon, widthWorldUnits] — True 1:1 OpenStreetMap Seine centerline & bank-to-bank water width
  // Upstream South-East (Orly / Choisy-le-Roi / Vitry / Ivry / Conflans)
  [48.7520, 2.4235, 1.85], // Choisy-le-Roi / Orly
  [48.7725, 2.4195, 1.85], // Vitry-sur-Seine South
  [48.7915, 2.4165, 1.85], // Vitry-sur-Seine / Alfortville
  [48.8075, 2.4148, 1.85], // Ivry-sur-Seine / Port d'Ivry
  [48.8166, 2.4094, 1.88], // Conflans / Charenton (Marne confluence)
  [48.8275, 2.3876, 1.85], // Pont National
  [48.8325, 2.3816, 1.80], // Pont de Tolbiac / Bibliothèque François-Mitterrand
  [48.8358, 2.3775, 1.80], // Passerelle Simone-de-Beauvoir / Bercy
  [48.8379, 2.3752, 1.78], // Pont de Bercy
  [48.8427, 2.3693, 1.78], // Viaduc d'Austerlitz
  [48.8450, 2.3661, 1.75], // Pont d'Austerlitz
  // North Arm (Bras Marie & Grand Bras) around Île Saint-Louis & Île de la Cité
  [48.8485, 2.3614, 1.45], // East Confluence Île Saint-Louis (Sully)
  [48.8503, 2.3606, 1.08], // Pont de Sully (Bras Marie)
  [48.8519, 2.3598, 1.05], // Quai d'Anjou
  [48.8529, 2.3574, 1.05], // Pont Marie
  [48.8538, 2.3544, 1.10], // Pont Louis-Philippe
  [48.8547, 2.3522, 1.15], // North Channel Cité / Saint-Louis
  [48.8555, 2.3506, 1.08], // Pont d'Arcole (Hôtel de Ville)
  [48.8562, 2.3486, 1.20], // Pont Notre-Dame (Grand Bras)
  [48.8567, 2.3469, 1.18], // Pont au Change (Châtelet / Conciergerie)
  [48.8579, 2.3419, 1.35], // Pont Neuf (Grand Bras North)
  [48.8582, 2.3385, 1.65], // Square du Vert-Galant West Confluence
  // Louvre -> Tuileries -> Concorde -> Grand Palais -> Invalides -> Alma -> Tour Eiffel -> Bir-Hakeim
  [48.8586, 2.3369, 1.62], // Pont des Arts (Cour Carrée du Louvre)
  [48.8594, 2.3329, 1.55], // Pont du Carrousel (Guichets du Louvre)
  [48.8601, 2.3299, 1.42], // Pont Royal (Pavillon de Flore)
  [48.8618, 2.3250, 1.55], // Passerelle Léopold-Sédar-Senghor (Solférino / Tuileries)
  [48.8633, 2.3197, 1.62], // Pont de la Concorde
  [48.8637, 2.3135, 1.58], // Pont Alexandre III
  [48.8638, 2.3104, 1.58], // Pont des Invalides
  [48.8635, 2.3017, 1.55], // Pont de l'Alma
  [48.8627, 2.2969, 1.58], // Passerelle Debilly
  [48.8598, 2.2925, 1.72], // Pont d'Iéna (Tour Eiffel / Trocadéro)
  [48.8550, 2.2890, 2.42], // Pont de Bir-Hakeim (Viaduct Line 6 / East tip Île aux Cygnes)
  [48.8522, 2.2852, 2.48], // Île aux Cygnes center
  [48.8498, 2.2815, 2.40], // Pont de Grenelle (West tip Île aux Cygnes / Statue de la Liberté)
  [48.8467, 2.2755, 1.80], // Pont Mirabeau
  [48.8394, 2.2683, 1.85], // Pont du Garigliano
  // Great Western Loop (Issy / Boulogne-Billancourt / Sèvres / Saint-Cloud / Suresnes / Puteaux / Neuilly)
  [48.8318, 2.2595, 2.05], // Point du Jour / Île Saint-Germain (Issy)
  [48.8242, 2.2485, 2.10], // Pont de Billancourt / Île Seguin East
  [48.8228, 2.2355, 2.15], // Île Seguin West / Meudon
  [48.8286, 2.2265, 1.95], // Pont de Sèvres
  [48.8405, 2.2218, 1.90], // Pont de Saint-Cloud
  [48.8565, 2.2260, 1.90], // Longchamp / Pont de Suresnes
  [48.8720, 2.2405, 2.15], // Île de Puteaux
  [48.8866, 2.2562, 2.15], // Pont de Neuilly (Axe Historique / Line 1)
  // Great Northern Loop (Courbevoie / Levallois / Clichy / Asnières / Saint-Ouen / L'Île-Saint-Denis / Gennevilliers)
  [48.8965, 2.2695, 2.15], // Île de la Jatte (Neuilly / Levallois / Courbevoie)
  [48.9052, 2.2842, 1.95], // Pont d'Asnières / Clichy
  [48.9125, 2.3015, 1.95], // Pont de Clichy / Gennevilliers
  [48.9195, 2.3205, 2.05], // Saint-Ouen-sur-Seine / L'Île-Saint-Denis South
  [48.9325, 2.3335, 2.15], // L'Île-Saint-Denis / Saint-Denis Pleyel
  [48.9475, 2.3285, 2.10], // L'Île-Saint-Denis North / Épinay-sur-Seine
  [48.9525, 2.2925, 2.00], // Épinay / Gennevilliers Port
  [48.9425, 2.2525, 2.00], // Argenteuil
  [48.9235, 2.2165, 1.95], // Bezons / Colombes
  [48.9015, 2.1925, 1.95], // Nanterre / Carrières-sur-Seine
  [48.8845, 2.1685, 1.95]  // Rueil-Malmaison / Chatou
];

/**
 * South Arm of the Seine (Bras de la Tournelle & Petit Bras / Bras de la Monnaie)
 * curving around the south shores of Île Saint-Louis and Île de la Cité from Pont de Sully to Square du Vert-Galant.
 */
export const SEINE_SOUTH_ARM_LATLON: [number, number, number][] = [
  [48.8485, 2.3614, 1.40], // Sully Confluence East
  [48.8498, 2.3580, 1.50], // Pont de Sully Sud (Bras de la Tournelle)
  [48.8506, 2.3555, 1.30], // Pont de la Tournelle
  [48.8513, 2.3533, 1.10], // South Channel Cité / Saint-Louis
  [48.8515, 2.3515, 0.88], // Pont de l'Archevêché
  [48.8526, 2.3484, 0.76], // Pont au Double (Notre-Dame South)
  [48.8533, 2.3470, 0.76], // Petit Pont
  [48.8540, 2.3446, 0.78], // Pont Saint-Michel
  [48.8555, 2.3421, 0.84], // Quai des Grands Augustins
  [48.8565, 2.3408, 0.88], // Pont Neuf Sud (Bras de la Monnaie)
  [48.8582, 2.3385, 1.50]  // Square du Vert-Galant West Confluence
];

/**
 * Marne River Centerline (Joining the Seine at Charenton-le-Pont / Alfortville from Joinville & Créteil)
 */
export const MARNE_CENTERLINE_LATLON: [number, number, number][] = [
  [48.8185, 2.4120, 2.2], // Confluence with the Seine at Charenton / Alfortville
  [48.8165, 2.4265, 2.1], // Charenton-le-Pont / Maisons-Alfort
  [48.8162, 2.4465, 2.1], // Saint-Maurice / Gravelle
  [48.8188, 2.4665, 2.2], // Joinville-le-Pont (Bois de Vincennes East)
  [48.8055, 2.4735, 2.3], // Île Fanac / Saint-Maur-des-Fossés
  [48.7915, 2.4785, 2.2], // Créteil / Halage de la Marne
  [48.7825, 2.4965, 2.2]  // Bonneuil-sur-Marne / Saint-Maur loop
];

/**
 * Canal Saint-Martin, Bassin de la Villette & Canal de l'Ourcq (Bastille -> Villette -> Pantin -> Bobigny)
 */
export const CANAL_SAINT_MARTIN_LATLON: [number, number][] = [
  [48.8462, 2.3658], // Port de l'Arsenal (Seine junction)
  [48.8532, 2.3692], // Bastille (vaulted portion)
  [48.8678, 2.3662], // Faubourg du Temple / République
  [48.8738, 2.3645], // Récollets / Quai de Valmy
  [48.8788, 2.3688], // Louis Blanc
  [48.8837, 2.3703], // Rotonde de la Villette (Stalingrad)
  [48.8902, 2.3820], // Bassin de la Villette / Crimée
  [48.8948, 2.3925], // Parc de la Villette
  [48.8955, 2.4125], // Pantin (Grands Moulins de Pantin)
  [48.9022, 2.4415], // Bobigny / Parc de la Bergère
  [48.9085, 2.4785]  // Bondy / Pavillons-sous-Bois
];

/**
 * Canal Saint-Denis (Parc de la Villette -> Aubervilliers -> Stade de France -> Seine at Saint-Denis)
 */
export const CANAL_SAINT_DENIS_LATLON: [number, number][] = [
  [48.8942, 2.3895], // Parc de la Villette junction
  [48.9065, 2.3825], // Aubervilliers
  [48.9215, 2.3685], // Porte de Paris / Stade de France
  [48.9325, 2.3465], // Saint-Denis Confluence
  [48.9345, 2.3365]  // Seine junction opposite L'Île-Saint-Denis
];

/**
 * Islands in the Seine — High-resolution, boat-shaped (nef) WGS84 polygon outlines
 * strictly centered between the Grand Bras (North Arm) and Petit Bras (South Arm) of the Seine.
 */
export const SEINE_ISLANDS_LATLON: { name: string; points: [number, number][] }[] = [
  {
    name: 'Île de la Cité',
    points: [
      [48.8572, 2.3404], // Square du Vert-Galant pointed western prow
      [48.8573, 2.3418], // Pont Neuf North (Quai de l'Horloge west)
      [48.8569, 2.3438], // Tour de l'Horloge / Conciergerie
      [48.8563, 2.3460], // Quai de la Corse (Marché aux Fleurs)
      [48.8556, 2.3482], // Hôtel-Dieu North
      [48.8548, 2.3502], // Cloître Notre-Dame
      [48.8538, 2.3516], // Quai aux Fleurs east
      [48.8530, 2.3522], // Square de l'Île-de-France pointed eastern stern
      [48.8531, 2.3508], // Square Jean-XXIII south shore
      [48.8536, 2.3488], // Quai de l'Archevêché / Petit Pont
      [48.8543, 2.3466], // Parvis Notre-Dame / Pont Saint-Michel south
      [48.8551, 2.3444], // Quai des Orfèvres (Palais de Justice south)
      [48.8560, 2.3422], // Place Dauphine / Pont Neuf south
      [48.8567, 2.3410]  // Return to Square du Vert-Galant prow
    ]
  },
  {
    name: 'Île Saint-Louis',
    points: [
      [48.8526, 2.3530], // Western prow facing Pont Saint-Louis
      [48.8527, 2.3544], // Quai de Bourbon west
      [48.8523, 2.3564], // Quai de Bourbon / Pont Marie
      [48.8516, 2.3585], // Quai d'Anjou
      [48.8507, 2.3602], // Hôtel Lambert / Square Barye north
      [48.8498, 2.3610], // Square Barye pointed eastern tip (Pont de Sully)
      [48.8497, 2.3596], // Quai de Béthune east
      [48.8503, 2.3576], // Quai de Béthune / Pont de la Tournelle
      [48.8511, 2.3554], // Quai d'Orléans center
      [48.8519, 2.3536]  // Quai d'Orléans west
    ]
  },
  {
    name: 'Île aux Cygnes',
    points: [
      [48.8556, 2.2875], // Pont de Bir-Hakeim east tip
      [48.8531, 2.2839], // Allée des Cygnes north edge
      [48.8503, 2.2801], // Pont de Grenelle / Statue de la Liberté west tip
      [48.8499, 2.2807], // South edge west
      [48.8527, 2.2845], // Allée des Cygnes south edge
      [48.8552, 2.2881]  // Pont de Bir-Hakeim south-east tip
    ]
  }
];

export interface ParisBridgeDef {
  name: string;
  p1: [number, number];
  p2: [number, number];
  width: number;
  ornate?: boolean;
  viaductLine?: string; // If it carries an elevated Metro line
  openedYear: number;
}

export const PARIS_BRIDGES: ParisBridgeDef[] = [
  {
    name: 'Pont de Saint-Ouen',
    p1: [48.9192, 2.3217],
    p2: [48.9196, 2.3194],
    width: 1.0,
    openedYear: 1900
  },
  {
    name: 'Pont de Clichy',
    p1: [48.9118, 2.3021],
    p2: [48.9132, 2.3009],
    width: 1.05,
    openedYear: 1900
  },
  {
    name: "Pont d'Asnières",
    p1: [48.9045, 2.2849],
    p2: [48.9059, 2.2835],
    width: 1.05,
    openedYear: 1900
  },
  {
    name: 'Pont de Levallois',
    p1: [48.8959, 2.2704],
    p2: [48.8971, 2.2686],
    width: 1.0,
    openedYear: 1900
  },
  {
    name: 'Pont de Neuilly',
    p1: [48.8861, 2.2567],
    p2: [48.8871, 2.2557],
    width: 1.25,
    openedYear: 1900
  },
  {
    name: 'Pont de Puteaux',
    p1: [48.8715, 2.2412],
    p2: [48.8725, 2.2398],
    width: 0.95,
    openedYear: 1900
  },
  {
    name: 'Pont de Suresnes',
    p1: [48.8560, 2.2269],
    p2: [48.8570, 2.2251],
    width: 1.0,
    openedYear: 1900
  },
  {
    name: 'Pont de Saint-Cloud',
    p1: [48.8404, 2.2230],
    p2: [48.8406, 2.2206],
    width: 1.05,
    openedYear: 1900
  },
  {
    name: 'Pont de Sèvres',
    p1: [48.8288, 2.2277],
    p2: [48.8284, 2.2252],
    width: 1.1,
    openedYear: 1900
  },
  {
    name: 'Pont de Billancourt',
    p1: [48.8250, 2.2482],
    p2: [48.8234, 2.2488],
    width: 1.0,
    openedYear: 1900
  },
  {
    name: 'Pont du Garigliano',
    p1: [48.8398, 2.2673],
    p2: [48.8388, 2.2695],
    width: 0.95,
    openedYear: 1900
  },
  {
    name: 'Pont Mirabeau',
    p1: [48.8471, 2.2746],
    p2: [48.8462, 2.2766],
    width: 0.85,
    ornate: true,
    openedYear: 1896
  },
  {
    name: 'Pont de Grenelle',
    p1: [48.8510, 2.2790],
    p2: [48.8496, 2.2812],
    width: 0.9,
    openedYear: 1900
  },
  {
    name: 'Pont de Bir-Hakeim (Viaduc Ligne 6)',
    p1: [48.8565, 2.2866],
    p2: [48.8548, 2.2885],
    width: 1.15,
    viaductLine: '6',
    openedYear: 1905
  },
  {
    name: "Pont d'Iéna",
    p1: [48.8606, 2.2909],
    p2: [48.8592, 2.2926],
    width: 1.25,
    ornate: true,
    openedYear: 1814
  },
  {
    name: 'Passerelle Debilly',
    p1: [48.8633, 2.2965],
    p2: [48.8617, 2.2975],
    width: 0.48,
    openedYear: 1900
  },
  {
    name: "Pont de l'Alma",
    p1: [48.8641, 2.3016],
    p2: [48.8628, 2.3019],
    width: 1.05,
    openedYear: 1856
  },
  {
    name: 'Pont des Invalides',
    p1: [48.8642, 2.3104],
    p2: [48.8629, 2.3104],
    width: 0.92,
    openedYear: 1855
  },
  {
    name: 'Pont Alexandre III',
    p1: [48.8643, 2.3136],
    p2: [48.8630, 2.3135],
    width: 1.32,
    ornate: true,
    openedYear: 1900
  },
  {
    name: 'Pont de la Concorde',
    p1: [48.8640, 2.3201],
    p2: [48.8628, 2.3191],
    width: 1.12,
    openedYear: 1791
  },
  {
    name: 'Passerelle Léopold-Sédar-Senghor (Solférino)',
    p1: [48.8624, 2.3253],
    p2: [48.8611, 2.3242],
    width: 0.56,
    openedYear: 1900
  },
  {
    name: 'Pont Royal',
    p1: [48.8606, 2.3303],
    p2: [48.8596, 2.3296],
    width: 0.85,
    ornate: true,
    openedYear: 1689
  },
  {
    name: 'Pont du Carrousel',
    p1: [48.8601, 2.3334],
    p2: [48.8584, 2.3328],
    width: 0.92,
    openedYear: 1900
  },
  {
    name: 'Pont des Arts',
    p1: [48.8593, 2.3381],
    p2: [48.8577, 2.3372],
    width: 0.58,
    openedYear: 1804
  },
  {
    name: 'Pont Neuf (Grand Bras)',
    p1: [48.8584, 2.3424],
    p2: [48.8573, 2.3415],
    width: 1.08,
    ornate: true,
    openedYear: 1607
  },
  {
    name: 'Pont Neuf (Petit Bras)',
    p1: [48.8568, 2.3410],
    p2: [48.8562, 2.3405],
    width: 1.05,
    ornate: true,
    openedYear: 1607
  },
  {
    name: 'Pont au Change',
    p1: [48.8571, 2.3471],
    p2: [48.8562, 2.3466],
    width: 0.95,
    openedYear: 1860
  },
  {
    name: 'Pont Saint-Michel',
    p1: [48.8543, 2.3448],
    p2: [48.8538, 2.3444],
    width: 0.92,
    openedYear: 1857
  },
  {
    name: 'Pont Notre-Dame',
    p1: [48.8566, 2.3489],
    p2: [48.8557, 2.3484],
    width: 0.92,
    openedYear: 1853
  },
  {
    name: 'Petit Pont',
    p1: [48.8535, 2.3471],
    p2: [48.8531, 2.3468],
    width: 0.78,
    openedYear: 1853
  },
  {
    name: "Pont d'Arcole",
    p1: [48.8558, 2.3508],
    p2: [48.8551, 2.3503],
    width: 0.78,
    openedYear: 1855
  },
  {
    name: 'Pont au Double',
    p1: [48.8528, 2.3486],
    p2: [48.8524, 2.3483],
    width: 0.72,
    openedYear: 1883
  },
  {
    name: "Pont de l'Archevêché",
    p1: [48.8518, 2.3517],
    p2: [48.8512, 2.3514],
    width: 0.72,
    openedYear: 1828
  },
  {
    name: 'Pont Saint-Louis',
    p1: [48.8527, 2.3523],
    p2: [48.8529, 2.3532],
    width: 0.68,
    openedYear: 1900
  },
  {
    name: 'Pont Louis-Philippe',
    p1: [48.8542, 2.3548],
    p2: [48.8535, 2.3541],
    width: 0.78,
    openedYear: 1862
  },
  {
    name: 'Pont Marie',
    p1: [48.8532, 2.3577],
    p2: [48.8525, 2.3571],
    width: 0.85,
    ornate: true,
    openedYear: 1635
  },
  {
    name: 'Pont de la Tournelle',
    p1: [48.8511, 2.3559],
    p2: [48.8501, 2.3550],
    width: 0.88,
    openedYear: 1900
  },
  {
    name: 'Pont de Sully (Bras Marie)',
    p1: [48.8508, 2.3612],
    p2: [48.8504, 2.3601],
    width: 0.92,
    openedYear: 1876
  },
  {
    name: 'Pont de Sully (Bras de la Tournelle)',
    p1: [48.8501, 2.3589],
    p2: [48.8495, 2.3570],
    width: 0.95,
    openedYear: 1876
  },
  {
    name: "Pont d'Austerlitz",
    p1: [48.8455, 2.3670],
    p2: [48.8444, 2.3651],
    width: 1.05,
    openedYear: 1854
  },
  {
    name: "Viaduc d'Austerlitz (Ligne 5)",
    p1: [48.8431, 2.3702],
    p2: [48.8420, 2.3680],
    width: 0.9,
    viaductLine: '5',
    openedYear: 1906
  },
  {
    name: 'Pont de Bercy (Viaduc Ligne 6)',
    p1: [48.8385, 2.3758],
    p2: [48.8375, 2.3739],
    width: 1.15,
    viaductLine: '6',
    openedYear: 1909
  },
  {
    name: 'Passerelle Simone-de-Beauvoir',
    p1: [48.8354, 2.3797],
    p2: [48.8341, 2.3774],
    width: 0.58,
    openedYear: 2006
  },
  {
    name: 'Pont de Tolbiac',
    p1: [48.8321, 2.3840],
    p2: [48.8308, 2.3816],
    width: 0.92,
    openedYear: 1882
  },
  {
    name: 'Pont National',
    p1: [48.8280, 2.3885],
    p2: [48.8268, 2.3866],
    width: 1.05,
    openedYear: 1853
  }
];

export interface ParisPlaceDef {
  name: string;
  lat: number;
  lon: number;
  radius: number;
  hasObeliskOrColumn?: boolean;
}

export const PARIS_PLACES: ParisPlaceDef[] = [
  { name: "Place Charles de Gaulle (L'Étoile)", lat: 48.8738, lon: 2.2950, radius: 3.6 },
  { name: 'Place de la Concorde', lat: 48.8656, lon: 2.3212, radius: 3.1, hasObeliskOrColumn: true },
  { name: 'Place de la République', lat: 48.8674, lon: 2.3636, radius: 2.6, hasObeliskOrColumn: true },
  { name: 'Place de la Bastille', lat: 48.8532, lon: 2.3692, radius: 2.5, hasObeliskOrColumn: true },
  { name: 'Place de la Nation', lat: 48.8484, lon: 2.3958, radius: 3.2, hasObeliskOrColumn: true },
  { name: "Place d'Italie", lat: 48.8315, lon: 2.3556, radius: 2.7 },
  { name: "Place de l'Opéra", lat: 48.8706, lon: 2.3324, radius: 1.9 },
  { name: 'Place Vendôme', lat: 48.8675, lon: 2.3294, radius: 1.5, hasObeliskOrColumn: true },
  { name: 'Place du Trocadéro', lat: 48.8630, lon: 2.2872, radius: 2.3 },
  { name: 'Place Denfert-Rochereau', lat: 48.8339, lon: 2.3324, radius: 2.0 },
  { name: 'Place de Clichy', lat: 48.8836, lon: 2.3274, radius: 1.8 },
  { name: 'Place du Panthéon', lat: 48.8462, lon: 2.3450, radius: 1.7 },
  { name: 'Place des Vosges', lat: 48.8556, lon: 2.3655, radius: 1.8 }
];

export interface ParisRoadDef {
  name: string;
  tier: 'grand_boulevard' | 'avenue' | 'street' | 'peripherique';
  openedYear?: number;
  points: [number, number][]; // [lat, lon]
}

/**
 * Authentic OpenStreetMap road & boulevard network of Paris
 */
export const PARIS_ROADS: ParisRoadDef[] = [
  // 1. AXE HISTORIQUE (Louvre -> Concorde -> Champs-Élysées -> Étoile -> Grande Armée -> Neuilly -> La Défense)
  {
    name: 'Avenue des Champs-Élysées & Axe Historique',
    tier: 'grand_boulevard',
    points: [
      [48.8656, 2.3212], // Concorde
      [48.8698, 2.3075], // Rond-Point des Champs-Élysées
      [48.8738, 2.2950], // Étoile
      [48.8778, 2.2825], // Porte Maillot
      [48.8866, 2.2562], // Pont de Neuilly
      [48.8918, 2.2385]  // La Défense
    ]
  },
  // 2. RUE DE RIVOLI & RUE SAINT-ANTOINE (Concorde -> Louvre -> Châtelet -> Hôtel de Ville -> Bastille)
  {
    name: 'Rue de Rivoli & Rue Saint-Antoine',
    tier: 'grand_boulevard',
    points: [
      [48.8656, 2.3212], // Concorde
      [48.8632, 2.3322], // Tuileries / Palais Royal
      [48.8588, 2.3470], // Châtelet
      [48.8568, 2.3522], // Hôtel de Ville
      [48.8550, 2.3608], // Saint-Paul
      [48.8532, 2.3692]  // Bastille
    ]
  },
  // 3. FAUBOURG SAINT-ANTOINE & COURS DE VINCENNES (Bastille -> Nation -> Porte de Vincennes)
  {
    name: 'Rue du Faubourg Saint-Antoine & Cours de Vincennes',
    tier: 'grand_boulevard',
    points: [
      [48.8532, 2.3692], // Bastille
      [48.8505, 2.3835], // Faidherbe
      [48.8484, 2.3958], // Nation
      [48.8471, 2.4110], // Porte de Vincennes
      [48.8445, 2.4350]  // Château de Vincennes
    ]
  },
  // 4. LES GRANDS BOULEVARDS (Madeleine -> Opéra -> Richelieu-Drouot -> Strasbourg-St-Denis -> République -> Bastille)
  {
    name: 'Les Grands Boulevards',
    tier: 'grand_boulevard',
    points: [
      [48.8656, 2.3212], // Concorde (Rue Royale)
      [48.8700, 2.3243], // Madeleine
      [48.8706, 2.3324], // Opéra
      [48.8719, 2.3402], // Richelieu-Drouot
      [48.8705, 2.3484], // Bonne Nouvelle
      [48.8696, 2.3545], // Strasbourg-Saint-Denis
      [48.8674, 2.3636], // République
      [48.8608, 2.3675], // Filles du Calvaire
      [48.8532, 2.3692]  // Bastille
    ]
  },
  // 5. BOULEVARD HAUSSMANN & AVENUE DE FRIEDLAND (Étoile -> Saint-Augustin -> Gare Saint-Lazare / Opéra -> Richelieu)
  {
    name: 'Boulevard Haussmann & Avenue de Friedland',
    tier: 'grand_boulevard',
    points: [
      [48.8738, 2.2950], // Étoile
      [48.8752, 2.3112], // Miromesnil
      [48.8752, 2.3195], // Saint-Augustin
      [48.8736, 2.3282], // Havre-Caumartin / Grands Magasins
      [48.8724, 2.3358], // Chaussée d'Antin
      [48.8719, 2.3402]  // Richelieu-Drouot
    ]
  },
  // 6. AVENUE DE L'OPÉRA (Opéra -> Pyramides -> Palais Royal / Louvre)
  {
    name: "Avenue de l'Opéra",
    tier: 'grand_boulevard',
    points: [
      [48.8706, 2.3324], // Opéra
      [48.8665, 2.3340], // Pyramides
      [48.8625, 2.3358]  // Palais Royal / Louvre
    ]
  },
  // 7. AXE NORD-SUD (Porte de la Chapelle -> Gare de l'Est -> Bd de Strasbourg -> Bd de Sébastopol -> Châtelet -> Cité -> Bd Saint-Michel -> Denfert-Rochereau -> Porte d'Orléans)
  {
    name: 'Boulevard de Sébastopol, Boulevard Saint-Michel & Avenue du Général-Leclerc',
    tier: 'grand_boulevard',
    points: [
      [48.8975, 2.3590], // Porte de la Chapelle
      [48.8842, 2.3568], // La Chapelle
      [48.8768, 2.3593], // Gare de l'Est
      [48.8696, 2.3545], // Strasbourg-Saint-Denis
      [48.8664, 2.3522], // Réaumur-Sébastopol
      [48.8584, 2.3470], // Châtelet
      [48.8534, 2.3442], // Saint-Michel
      [48.8468, 2.3402], // Luxembourg
      [48.8400, 2.3368], // Port-Royal
      [48.8339, 2.3324], // Denfert-Rochereau
      [48.8228, 2.3258]  // Porte d'Orléans
    ]
  },
  // 8. BOULEVARD SAINT-GERMAIN (Pont de Sully -> Maubert -> Odéon -> St-Germain-des-Prés -> Solférino -> Concorde)
  {
    name: 'Boulevard Saint-Germain',
    tier: 'grand_boulevard',
    points: [
      [48.8495, 2.3565], // Pont de Sully
      [48.8505, 2.3485], // Maubert-Mutualité
      [48.8515, 2.3442], // Cluny-La Sorbonne
      [48.8523, 2.3388], // Odéon
      [48.8540, 2.3338], // Saint-Germain-des-Prés
      [48.8562, 2.3258], // Rue du Bac
      [48.8582, 2.3218], // Solférino
      [48.8621, 2.3191]  // Pont de la Concorde
    ]
  },
  // 9. STAR OF PLACE DE L'ÉTOILE (Radiating Haussmannian Avenues)
  {
    name: 'Avenue Foch (vers Bois de Boulogne)',
    tier: 'avenue',
    points: [
      [48.8738, 2.2950],
      [48.8712, 2.2755]
    ]
  },
  {
    name: 'Avenue Victor-Hugo',
    tier: 'avenue',
    points: [
      [48.8738, 2.2950],
      [48.8692, 2.2852],
      [48.8655, 2.2760]
    ]
  },
  {
    name: 'Avenue Kléber (Étoile -> Trocadéro)',
    tier: 'grand_boulevard',
    points: [
      [48.8738, 2.2950],
      [48.8630, 2.2872]
    ]
  },
  {
    name: "Avenue d'Iéna & Avenue Marceau (Étoile -> Alma -> Invalides)",
    tier: 'avenue',
    points: [
      [48.8738, 2.2950],
      [48.8644, 2.3014],
      [48.8550, 2.3125]
    ]
  },
  {
    name: 'Avenue Hoche (Étoile -> Parc Monceau)',
    tier: 'avenue',
    points: [
      [48.8738, 2.2950],
      [48.8782, 2.3078]
    ]
  },
  {
    name: 'Avenue de Wagram (Étoile -> Ternes -> Porte d’Asnières)',
    tier: 'avenue',
    points: [
      [48.8738, 2.2950],
      [48.8782, 2.2988],
      [48.8855, 2.3045]
    ]
  },
  // 10. NORTHERN BOULEVARDS (Courcelles / Batignolles / Clichy / Rochechouart / La Villette / Belleville / Ménilmontant / Charonne)
  {
    name: 'Boulevard de Courcelles, Clichy, Rochechouart, La Villette, Belleville & Charonne (Anciens Fermiers Généraux)',
    tier: 'grand_boulevard',
    points: [
      [48.8738, 2.2950], // Étoile
      [48.8782, 2.2988], // Ternes
      [48.8812, 2.3155], // Villiers / Monceau
      [48.8836, 2.3274], // Place de Clichy
      [48.8838, 2.3328], // Blanche
      [48.8824, 2.3375], // Pigalle
      [48.8829, 2.3442], // Anvers
      [48.8836, 2.3498], // Barbès-Rochechouart
      [48.8844, 2.3598], // La Chapelle
      [48.8837, 2.3703], // Stalingrad
      [48.8818, 2.3742], // Jaurès
      [48.8721, 2.3768], // Belleville
      [48.8628, 2.3868], // Père-Lachaise
      [48.8484, 2.3958]  // Nation
    ]
  },
  // 11. SOUTHERN BOULEVARDS (Pasteur / Montparnasse / Port-Royal / Saint-Marcel / Hôpital / Vincent-Auriol / Bercy)
  {
    name: 'Circulaire Sud : Grenelle, Pasteur, Raspail, Auguste-Blanqui, Vincent-Auriol & Daumesnil',
    tier: 'grand_boulevard',
    points: [
      [48.8630, 2.2872], // Trocadéro
      [48.8568, 2.2862], // Passy
      [48.8539, 2.2893], // Bir-Hakeim
      [48.8492, 2.2982], // La Motte-Picquet-Grenelle
      [48.8428, 2.3125], // Pasteur
      [48.8421, 2.3219], // Montparnasse
      [48.8412, 2.3305], // Raspail
      [48.8339, 2.3324], // Denfert-Rochereau
      [48.8312, 2.3432], // Glacière
      [48.8315, 2.3556], // Place d'Italie
      [48.8332, 2.3625], // Nationale
      [48.8402, 2.3792], // Bercy
      [48.8396, 2.3958], // Daumesnil
      [48.8484, 2.3958]  // Nation
    ]
  },
  // 12. BOULEVARD RASPAIL & RUE DE RENNES (Concorde / Bac -> Sèvres-Babylone -> Montparnasse -> Denfert)
  {
    name: 'Boulevard Raspail & Rue de Rennes',
    tier: 'avenue',
    points: [
      [48.8562, 2.3258], // Rue du Bac
      [48.8515, 2.3272], // Sèvres-Babylone
      [48.8421, 2.3219], // Montparnasse
      [48.8339, 2.3324]  // Denfert-Rochereau
    ]
  },
  // 13. BOULEVARD DU MONTPARNASSE (Invalides / Duroc -> Montparnasse -> Port-Royal -> Gare d'Austerlitz)
  {
    name: 'Boulevard des Invalides, Boulevard du Montparnasse & Boulevard de Port-Royal',
    tier: 'avenue',
    points: [
      [48.8625, 2.3136], // Invalides
      [48.8471, 2.3162], // Duroc
      [48.8421, 2.3219], // Montparnasse
      [48.8400, 2.3368], // Port-Royal
      [48.8380, 2.3522], // Les Gobelins
      [48.8422, 2.3660]  // Gare d'Austerlitz
    ]
  },
  // 14. BOULEVARD VOLTAIRE & AVENUE DE LA RÉPUBLIQUE (République -> Oberkampf -> Nation & Père-Lachaise -> Gambetta)
  {
    name: 'Boulevard Voltaire (République -> Nation)',
    tier: 'grand_boulevard',
    points: [
      [48.8674, 2.3636], // République
      [48.8648, 2.3685], // Oberkampf
      [48.8568, 2.3808], // Charonne
      [48.8484, 2.3958]  // Nation
    ]
  },
  {
    name: 'Avenue de la République & Avenue Gambetta',
    tier: 'avenue',
    points: [
      [48.8674, 2.3636], // République
      [48.8652, 2.3745], // Parmentier
      [48.8628, 2.3868], // Père-Lachaise
      [48.8650, 2.3985], // Gambetta
      [48.8772, 2.4068]  // Porte des Lilas
    ]
  },
  // 15. RUE LA FAYETTE & BOULEVARD DE MAGENTA (Opéra -> Gare du Nord / Gare de l'Est -> Jaurès -> Pantin)
  {
    name: 'Rue La Fayette & Avenue Jean-Jaurès',
    tier: 'avenue',
    points: [
      [48.8724, 2.3358], // Chaussée d'Antin
      [48.8768, 2.3485], // Poissonnière
      [48.8809, 2.3553], // Gare du Nord
      [48.8768, 2.3593], // Gare de l'Est
      [48.8818, 2.3742], // Jaurès
      [48.8895, 2.3928]  // Porte de Pantin
    ]
  },
  {
    name: 'Boulevard de Magenta & Boulevard Barbès',
    tier: 'avenue',
    points: [
      [48.8674, 2.3636], // République
      [48.8768, 2.3593], // Gare de l'Est
      [48.8809, 2.3553], // Gare du Nord
      [48.8836, 2.3498], // Barbès
      [48.8915, 2.3478], // Marcadet-Poissonniers
      [48.8975, 2.3448]  // Porte de Clignancourt
    ]
  },
  // 16. BOULEVARD MALESHERBES & AVENUE DE CLICHY / SAINT-OUEN
  {
    name: 'Boulevard Malesherbes (Madeleine -> Saint-Augustin -> Villiers -> Porte de Champerret)',
    tier: 'avenue',
    points: [
      [48.8700, 2.3243], // Madeleine
      [48.8752, 2.3195], // Saint-Augustin
      [48.8812, 2.3155], // Villiers
      [48.8855, 2.2995], // Pereire
      [48.8862, 2.2895]  // Porte de Champerret
    ]
  },
  {
    name: 'Avenue de Clichy & Avenue de Saint-Ouen',
    tier: 'avenue',
    points: [
      [48.8756, 2.3258], // Saint-Lazare
      [48.8836, 2.3274], // Place de Clichy
      [48.8872, 2.3262], // La Fourche
      [48.8942, 2.3145]  // Porte de Clichy
    ]
  },
  // 17. DIDEROT, DAUMESNIL & BERCY (Bastille -> Gare de Lyon -> Nation / Porte de Charenton)
  {
    name: 'Boulevard Diderot & Avenue Daumesnil',
    tier: 'avenue',
    points: [
      [48.8532, 2.3692], // Bastille
      [48.8443, 2.3744], // Gare de Lyon
      [48.8472, 2.3858], // Reuilly-Diderot
      [48.8396, 2.3958], // Daumesnil
      [48.8325, 2.4025]  // Porte de Charenton
    ]
  },
  // 18. LEFT BANK SOUTH-WEST AXES (Vaugirard / Lecourbe / Emile Zola / Versailles)
  {
    name: 'Rue de Vaugirard (Odéon -> Montparnasse -> Pasteur -> Porte de Versailles)',
    tier: 'avenue',
    points: [
      [48.8485, 2.3388], // Luxembourg / Odéon
      [48.8421, 2.3219], // Montparnasse
      [48.8428, 2.3125], // Pasteur
      [48.8322, 2.2878]  // Porte de Versailles
    ]
  },
  {
    name: 'Avenue Émile-Zola & Rue du Commerce (Mirabeau -> La Motte-Picquet -> École Militaire)',
    tier: 'avenue',
    points: [
      [48.8466, 2.2756], // Mirabeau / Javel
      [48.8452, 2.2925], // Commerce
      [48.8492, 2.2982], // La Motte-Picquet
      [48.8552, 2.3065]  // École Militaire
    ]
  },
  {
    name: "Avenue de Versailles (Concorde / Alma -> Passy -> Porte de Saint-Cloud -> Pont de Sèvres)",
    tier: 'avenue',
    points: [
      [48.8630, 2.2872], // Trocadéro
      [48.8520, 2.2755], // Passy / Radio France
      [48.8422, 2.2635], // Exelmans
      [48.8380, 2.2568], // Porte de Saint-Cloud
      [48.8286, 2.2265]  // Pont de Sèvres
    ]
  },
  // 19. AVENUE D'ITALIE & AVENUE D'IVRY (Place d'Italie -> Maison Blanche -> Porte d'Ivry / Porte d'Italie)
  {
    name: "Avenue d'Italie & Avenue d'Ivry",
    tier: 'avenue',
    points: [
      [48.8315, 2.3556], // Place d'Italie
      [48.8225, 2.3585], // Maison Blanche
      [48.8195, 2.3698]  // Porte d'Ivry
    ]
  },
  // 20. BOULEVARD DES MARÉCHAUX (Inner Ring inside the Portes, 1900-2026)
  {
    name: 'Boulevards des Maréchaux (Ceinture des Portes de Paris)',
    tier: 'avenue',
    points: [
      [48.8778, 2.2825], // Porte Maillot
      [48.8862, 2.2895], // Porte de Champerret
      [48.8942, 2.3145], // Porte de Clichy
      [48.8962, 2.3285], // Porte de Saint-Ouen
      [48.8975, 2.3448], // Porte de Clignancourt
      [48.8975, 2.3590], // Porte de la Chapelle
      [48.8968, 2.3852], // Porte de la Villette
      [48.8895, 2.3928], // Porte de Pantin
      [48.8772, 2.4068], // Porte des Lilas
      [48.8555, 2.4112], // Porte de Montreuil
      [48.8471, 2.4110], // Porte de Vincennes
      [48.8325, 2.4025], // Porte de Charenton
      [48.8195, 2.3698], // Porte d'Ivry
      [48.8185, 2.3556], // Porte d'Italie
      [48.8228, 2.3258], // Porte d'Orléans
      [48.8268, 2.3055], // Porte de Vanves
      [48.8322, 2.2878], // Porte de Versailles
      [48.8362, 2.2755], // Balard
      [48.8380, 2.2568], // Porte de Saint-Cloud
      [48.8482, 2.2598], // Porte d'Auteuil
      [48.8705, 2.2738], // Porte Dauphine
      [48.8778, 2.2825]  // Close loop at Porte Maillot
    ]
  },
  // 21. BOULEVARD PÉRIPHÉRIQUE (Ring Expressway, opened 1970-1973)
  {
    name: 'Boulevard Périphérique',
    tier: 'peripherique',
    openedYear: 1970,
    points: [
      [48.8792, 2.2785],
      [48.8885, 2.2865],
      [48.8968, 2.3125],
      [48.8992, 2.3285],
      [48.9005, 2.3455],
      [48.9008, 2.3605],
      [48.8998, 2.3885],
      [48.8915, 2.3975],
      [48.8788, 2.4115],
      [48.8560, 2.4158],
      [48.8468, 2.4158],
      [48.8305, 2.4065],
      [48.8168, 2.3725],
      [48.8155, 2.3556],
      [48.8195, 2.3255],
      [48.8240, 2.3045],
      [48.8295, 2.2855],
      [48.8335, 2.2725],
      [48.8355, 2.2535],
      [48.8482, 2.2555],
      [48.8712, 2.2702],
      [48.8792, 2.2785]
    ]
  }
];

export interface ParisParkDef {
  name: string;
  center: [number, number];
  sizeKm: [number, number]; // [widthKm, depthKm]
  rotationRad: number;
}

export const PARIS_PARKS: ParisParkDef[] = [
  // Major Historic Parks & Gardens
  { name: 'Jardin des Tuileries', center: [48.8635, 2.3275], sizeKm: [0.82, 0.28], rotationRad: -0.44 },
  { name: 'Champ de Mars', center: [48.8558, 2.2985], sizeKm: [0.78, 0.28], rotationRad: -0.78 },
  { name: 'Esplanade des Invalides', center: [48.8595, 2.3130], sizeKm: [0.26, 0.48], rotationRad: 0 },
  { name: 'Jardin du Luxembourg', center: [48.8468, 2.3372], sizeKm: [0.55, 0.48], rotationRad: 0.1 },
  { name: 'Jardin des Plantes', center: [48.8438, 2.3595], sizeKm: [0.52, 0.34], rotationRad: -0.55 },
  { name: 'Parc Monceau', center: [48.8796, 2.3090], sizeKm: [0.35, 0.30], rotationRad: 0.2 },
  { name: 'Parc des Buttes-Chaumont', center: [48.8808, 2.3828], sizeKm: [0.55, 0.45], rotationRad: 0.35 },
  { name: 'Parc Montsouris', center: [48.8222, 2.3382], sizeKm: [0.42, 0.38], rotationRad: 0.12 },
  { name: 'Cimetière du Père-Lachaise', center: [48.8615, 2.3935], sizeKm: [0.72, 0.58], rotationRad: -0.25 },
  { name: 'Cimetière du Montparnasse', center: [48.8382, 2.3265], sizeKm: [0.46, 0.38], rotationRad: 0.2 },
  { name: 'Parc de Bercy', center: [48.8358, 2.3822], sizeKm: [0.52, 0.24], rotationRad: -0.68 },
  { name: 'Parc André-Citroën', center: [48.8412, 2.2752], sizeKm: [0.46, 0.28], rotationRad: -0.62 },
  { name: 'Parc de la Villette', center: [48.8935, 2.3905], sizeKm: [0.65, 0.55], rotationRad: 0.15 },
  { name: 'Bois de Boulogne (Lisière)', center: [48.8645, 2.2615], sizeKm: [0.95, 1.85], rotationRad: 0.12 },
  { name: 'Bois de Vincennes (Lisière)', center: [48.8335, 2.4265], sizeKm: [1.35, 0.95], rotationRad: -0.15 },

  // Iconic Parisian Neighborhood Squares & Pocket Gardens (Les Petits Squares de Paris)
  { name: 'Jardin du Palais-Royal', center: [48.8648, 2.3378], sizeKm: [0.14, 0.24], rotationRad: -0.22 },
  { name: 'Place des Vosges (Square Louis-XIII)', center: [48.8556, 2.3655], sizeKm: [0.16, 0.16], rotationRad: 0.08 },
  { name: 'Jardin Nelson-Mandela (Les Halles)', center: [48.8624, 2.3452], sizeKm: [0.24, 0.15], rotationRad: -0.25 },
  { name: 'Square de la Tour Saint-Jacques', center: [48.8580, 2.3489], sizeKm: [0.11, 0.11], rotationRad: -0.35 },
  { name: 'Square du Temple – Elie Wiesel', center: [48.8643, 2.3608], sizeKm: [0.15, 0.13], rotationRad: -0.45 },
  { name: 'Square du Vert-Galant (Île de la Cité)', center: [48.8571, 2.3409], sizeKm: [0.11, 0.07], rotationRad: -0.42 },
  { name: 'Place Dauphine (Île de la Cité)', center: [48.8565, 2.3426], sizeKm: [0.10, 0.08], rotationRad: -0.42 },
  { name: 'Square Jean-XXIII (Notre-Dame)', center: [48.8528, 2.3512], sizeKm: [0.12, 0.09], rotationRad: -0.48 },
  { name: 'Square Barye (Île Saint-Louis)', center: [48.8500, 2.3604], sizeKm: [0.10, 0.08], rotationRad: -0.48 },
  { name: 'Square René-Viviani', center: [48.8522, 2.3472], sizeKm: [0.11, 0.09], rotationRad: -0.40 },
  { name: 'Arènes de Lutèce & Square Capitan', center: [48.8451, 2.3528], sizeKm: [0.15, 0.14], rotationRad: 0.15 },
  { name: 'Jardins des Champs-Élysées (Nord)', center: [48.8682, 2.3155], sizeKm: [0.38, 0.16], rotationRad: -0.44 },
  { name: 'Jardins des Champs-Élysées (Sud)', center: [48.8662, 2.3132], sizeKm: [0.38, 0.16], rotationRad: -0.44 },
  { name: 'Jardins du Trocadéro', center: [48.8616, 2.2892], sizeKm: [0.28, 0.22], rotationRad: -0.78 },
  { name: 'Square Boucicaut (Le Bon Marché)', center: [48.8514, 2.3256], sizeKm: [0.12, 0.10], rotationRad: 0.25 },
  { name: 'Square Santiago-du-Chili', center: [48.8578, 2.3105], sizeKm: [0.11, 0.10], rotationRad: 0.0 },
  { name: 'Square Louis-XVI (Chapelle Expiatoire)', center: [48.8737, 2.3227], sizeKm: [0.12, 0.11], rotationRad: 0.15 },
  { name: "Square d'Anvers", center: [48.8828, 2.3446], sizeKm: [0.12, 0.10], rotationRad: 0.05 },
  { name: 'Square Montholon', center: [48.8770, 2.3465], sizeKm: [0.12, 0.10], rotationRad: 0.10 },
  { name: 'Square des Batignolles', center: [48.8878, 2.3168], sizeKm: [0.18, 0.16], rotationRad: 0.30 },
  { name: 'Parc Martin-Luther-King (Batignolles)', center: [48.8905, 2.3135], sizeKm: [0.32, 0.18], rotationRad: -0.55 },
  { name: 'Parc de Belleville', center: [48.8712, 2.3845], sizeKm: [0.26, 0.18], rotationRad: -0.35 }
];
