import { projectLatLon } from './parisGeoData';

export interface GrandeGareCorridorData {
  id: string;
  metroStationId: string;
  monumentId?: string;
  name: string;
  shortName: string;
  historicCompany: string;
  modernNetwork: string;
  openedYear: number;
  trainStartYear: number;
  trainEndYear: number;
  buildingEndYear: number;
  arrondissement: string;
  destinationLabel: string;
  colorHex: string;
  lat: number;
  lon: number;
  x: number;
  z: number;
  rotationY: number;
  trackCount: number;
  shedWidth: number;
  shedLength: number;
  shedHeight: number;
  shedSpans: number;
  hasClockTower?: boolean;
  hasPontEurope?: boolean;
  hasViaductPortal?: boolean;
  isViaductLine?: boolean;
  description: string;
  corridorLatLon: [number, number][];
  corridorPoints: { x: number; z: number }[];
}

interface RawGrandeGareCorridor extends Omit<GrandeGareCorridorData, 'x' | 'z' | 'corridorPoints'> {}

const RAW_GRANDES_LIGNES: RawGrandeGareCorridor[] = [
  {
    id: 'gl-gare-du-nord',
    metroStationId: 'gare-du-nord',
    monumentId: 'monument-gare-du-nord',
    name: 'Gare du Nord',
    shortName: 'NORD',
    historicCompany: 'Compagnie des Chemins de fer du Nord (1846)',
    modernNetwork: 'Eurostar • TGV Nord • Thalys',
    openedYear: 1864,
    trainStartYear: 1900,
    trainEndYear: 2026,
    buildingEndYear: 2026,
    arrondissement: '10th Arr.',
    destinationLabel: 'VERS LILLE • LONDRES • BRUXELLES',
    colorHex: '#e2a84b',
    lat: 48.8814,
    lon: 2.3555,
    rotationY: -0.06,
    trackCount: 8,
    shedWidth: 2.35,
    shedLength: 3.1,
    shedHeight: 0.92,
    shedSpans: 3,
    description:
      'Designed by Jacques Ignace Hittorff (1864) for Baron James de Rothschild’s Compagnie du Nord, Europe’s busiest railway terminal features a monumental limestone facade crowned by 23 statues representing northern cities and a vast 180m iron-and-glass train hall welcoming the Golden Arrow, Nord-Express, and Eurostar.',
    corridorLatLon: [
      [48.8814, 2.3555],
      [48.8855, 2.3563],
      [48.8915, 2.3572],
      [48.9010, 2.3582],
      [48.9160, 2.3592],
      [48.9380, 2.3605],
      [48.9680, 2.3620]
    ]
  },
  {
    id: 'gl-gare-de-lest',
    metroStationId: 'gare-de-lest',
    monumentId: 'monument-gare-de-lest',
    name: "Gare de l'Est",
    shortName: 'EST',
    historicCompany: "Compagnie des Chemins de fer de l'Est (1849)",
    modernNetwork: 'TGV Est Européen • ICE • Orient-Express',
    openedYear: 1849,
    trainStartYear: 1900,
    trainEndYear: 2026,
    buildingEndYear: 2026,
    arrondissement: '10th Arr.',
    destinationLabel: 'VERS STRASBOURG • ORIENT-EXPRESS',
    colorHex: '#5cc28c',
    lat: 48.8774,
    lon: 2.3596,
    rotationY: -0.58,
    trackCount: 7,
    shedWidth: 2.15,
    shedLength: 2.85,
    shedHeight: 0.84,
    shedSpans: 2,
    description:
      'Built by François Duquesney (1849) and doubled symmetrically by Constant-Bernard in 1931 at the northern vista of Baron Haussmann’s Boulevard de Strasbourg, Gare de l’Est launched the legendary 1883 Orient-Express to Constantinople and witnessed the 1914 mobilization of French soldiers toward the Marne and Verdun.',
    corridorLatLon: [
      [48.8774, 2.3596],
      [48.8815, 2.3645],
      [48.8868, 2.3745],
      [48.8918, 2.3910],
      [48.8958, 2.4160],
      [48.8995, 2.4480],
      [48.9040, 2.4850]
    ]
  },
  {
    id: 'gl-gare-de-lyon',
    metroStationId: 'gare-de-lyon',
    monumentId: 'monument-gare-de-lyon',
    name: 'Gare de Lyon',
    shortName: 'LYON (PLM)',
    historicCompany: 'Compagnie PLM — Paris–Lyon–Méditerranée (1900)',
    modernNetwork: 'TGV Sud-Est • Lyria • Frecciarossa',
    openedYear: 1900,
    trainStartYear: 1900,
    trainEndYear: 2026,
    buildingEndYear: 2026,
    arrondissement: '12th Arr.',
    destinationLabel: 'VERS LYON • MARSEILLE • MÉDITERRANÉE',
    colorHex: '#f0823c',
    lat: 48.8442,
    lon: 2.3748,
    rotationY: -2.34,
    trackCount: 8,
    shedWidth: 2.25,
    shedLength: 3.05,
    shedHeight: 0.88,
    shedSpans: 2,
    hasClockTower: true,
    description:
      'Rebuilt by Marius Toudoire for the 1900 Universal Exposition with its iconic 67-meter gilded Clock Tower (Tour de l’Horloge) and the gilded frescoes of Le Train Bleu restaurant, Gare de Lyon inaugurated the French high-speed rail revolution on September 22, 1981 with the orange TGV Sud-Est.',
    corridorLatLon: [
      [48.8442, 2.3748],
      [48.8392, 2.3815],
      [48.8315, 2.3905],
      [48.8215, 2.4030],
      [48.8090, 2.4195],
      [48.7910, 2.4360],
      [48.7650, 2.4550]
    ]
  },
  {
    id: 'gl-gare-dausterlitz',
    metroStationId: 'gare-dausterlitz',
    monumentId: 'monument-gare-dausterlitz',
    name: "Gare d'Austerlitz",
    shortName: 'AUSTERLITZ (PO)',
    historicCompany: "Compagnie du Chemin de fer de Paris à Orléans (1840)",
    modernNetwork: 'Intercités Sud-Ouest • Val de Loire',
    openedYear: 1869,
    trainStartYear: 1900,
    trainEndYear: 2026,
    buildingEndYear: 2026,
    arrondissement: '13th Arr.',
    destinationLabel: 'VERS ORLÉANS • BORDEAUX • TOULOUSE',
    colorHex: '#e0bc52',
    lat: 48.8418,
    lon: 2.3662,
    rotationY: -2.38,
    trackCount: 6,
    shedWidth: 1.88,
    shedLength: 2.9,
    shedHeight: 0.88,
    shedSpans: 1,
    hasViaductPortal: true,
    description:
      'Built by Pierre-Louis Renaud (1869) with a colossal 51.2m-wide clear-span Polonceau iron roof manufactured by the Schneider Creusot works, Gare d’Austerlitz is famous for the 1906 engineering marvel where Metro Line 5 flies on a suspended viaduct right through its upper glass facade.',
    corridorLatLon: [
      [48.8418, 2.3662],
      [48.8355, 2.3728],
      [48.8260, 2.3822],
      [48.8140, 2.3935],
      [48.7980, 2.4060],
      [48.7780, 2.4180],
      [48.7540, 2.4290]
    ]
  },
  {
    id: 'gl-gare-montparnasse',
    metroStationId: 'montparnasse-bienvenue',
    monumentId: 'monument-montparnasse',
    name: 'Gare Montparnasse',
    shortName: 'MONTPARNASSE',
    historicCompany: "Compagnie de l'Ouest-État (1852)",
    modernNetwork: 'TGV Atlantique • LGV Bretagne & Sud-Europe',
    openedYear: 1852,
    trainStartYear: 1900,
    trainEndYear: 2026,
    buildingEndYear: 2026,
    arrondissement: '14th / 15th Arr.',
    destinationLabel: 'VERS BRETAGNE • BORDEAUX • ATLANTIQUE',
    colorHex: '#52a4f0',
    lat: 48.8398,
    lon: 2.3192,
    rotationY: 2.48,
    trackCount: 7,
    shedWidth: 2.15,
    shedLength: 2.75,
    shedHeight: 0.72,
    shedSpans: 2,
    description:
      'Gateway to Brittany and the Atlantic coast: from Victor Lenoir’s 1852 Embarcadère de l’Ouest on Place de Rennes (site of the famous 1895 locomotive derailment and General Leclerc’s 1944 Liberation command post) to the 1969 Maine-Montparnasse complex and the 1989 TGV Atlantique.',
    corridorLatLon: [
      [48.8398, 2.3192],
      [48.8335, 2.3112],
      [48.8240, 2.2995],
      [48.8120, 2.2840],
      [48.7970, 2.2650],
      [48.7800, 2.2440],
      [48.7610, 2.2200]
    ]
  },
  {
    id: 'gl-gare-saint-lazare',
    metroStationId: 'saint-lazare',
    monumentId: 'monument-gare-saint-lazare',
    name: 'Gare Saint-Lazare',
    shortName: 'SAINT-LAZARE',
    historicCompany: "Compagnie des Chemins de fer de l'Ouest (1837)",
    modernNetwork: 'Lignes de Normandie • Transilien',
    openedYear: 1837,
    trainStartYear: 1900,
    trainEndYear: 2026,
    buildingEndYear: 2026,
    arrondissement: '8th Arr.',
    destinationLabel: 'VERS ROUEN • LE HAVRE • NORMANDIE',
    colorHex: '#68b8f8',
    lat: 48.8768,
    lon: 2.3248,
    rotationY: 0.42,
    trackCount: 8,
    shedWidth: 2.4,
    shedLength: 2.75,
    shedHeight: 0.8,
    shedSpans: 3,
    hasPontEurope: true,
    description:
      'Paris’s first railway station (opened in 1837 as the Embarcadère de Saint-Germain) and rebuilt by Juste Lisch in 1889. Its multi-gable iron train halls and the Pont de l’Europe spanning the tracks were immortalized by Claude Monet in his 1877 Impressionist series.',
    corridorLatLon: [
      [48.8768, 2.3248],
      [48.8812, 2.3208],
      [48.8878, 2.3148],
      [48.8975, 2.3055],
      [48.9110, 2.2925],
      [48.9280, 2.2750],
      [48.9520, 2.2520]
    ]
  },
  {
    id: 'gl-gare-dorsay',
    metroStationId: 'solferino',
    monumentId: 'monument-gare-dorsay',
    name: "Gare d'Orsay (Musée d'Orsay)",
    shortName: 'ORSAY (1900–1939)',
    historicCompany: 'Compagnie Paris–Orléans (Exposition Universelle 1900)',
    modernNetwork: "Musée d'Orsay (National Museum since 1986)",
    openedYear: 1900,
    trainStartYear: 1900,
    trainEndYear: 1939,
    buildingEndYear: 2026,
    arrondissement: '7th Arr.',
    destinationLabel: "QUAI D'ORSAY • LIAISON AUSTERLITZ (1900–1939)",
    colorHex: '#e6c66e',
    lat: 48.8599,
    lon: 2.3265,
    rotationY: -1.36,
    trackCount: 4,
    shedWidth: 1.45,
    shedLength: 2.15,
    shedHeight: 0.72,
    shedSpans: 1,
    description:
      'Inaugurated on July 14, 1900 by architect Victor Laloux for the Universal Exposition, Gare d’Orsay was the world’s first electrified urban mainline terminal, concealing its iron vault behind a grand Beaux-Arts limestone facade opposite the Louvre. Mainline service ended in 1939, and Gae Aulenti transformed the hall into the Musée d’Orsay in 1986.',
    corridorLatLon: [
      [48.8599, 2.3265],
      [48.8582, 2.3335],
      [48.8548, 2.3435],
      [48.8505, 2.3535],
      [48.8458, 2.3618],
      [48.8418, 2.3662]
    ]
  },
  {
    id: 'gl-gare-des-invalides',
    metroStationId: 'invalides',
    name: 'Gare des Invalides',
    shortName: 'INVALIDES',
    historicCompany: "Compagnie des Chemins de fer de l'Ouest (1900)",
    modernNetwork: 'Ligne de Versailles-Rive-Gauche (RER C)',
    openedYear: 1900,
    trainStartYear: 1900,
    trainEndYear: 2026,
    buildingEndYear: 2026,
    arrondissement: '7th Arr.',
    destinationLabel: 'VERS VERSAILLES-RIVE-GAUCHE',
    colorHex: '#7ad1a6',
    lat: 48.8622,
    lon: 2.3142,
    rotationY: 1.52,
    trackCount: 4,
    shedWidth: 1.25,
    shedLength: 1.75,
    shedHeight: 0.48,
    shedSpans: 1,
    description:
      'Constructed by Juste Lisch for the 1900 Universal Exposition in a sunken trench along the Esplanade des Invalides so as not to obstruct views of the Golden Dome, linking central Paris along the Left Bank of the Seine directly to the Palace of Versailles.',
    corridorLatLon: [
      [48.8622, 2.3142],
      [48.8618, 2.3025],
      [48.8572, 2.2865],
      [48.8475, 2.2715],
      [48.8345, 2.2545],
      [48.8180, 2.2260],
      [48.8020, 2.1950]
    ]
  },
  {
    id: 'gl-gare-de-la-bastille',
    metroStationId: 'bastille',
    name: 'Gare de la Bastille (Ligne de Vincennes)',
    shortName: 'BASTILLE (1859–1969)',
    historicCompany: "Compagnie de l'Est — Ligne de Vincennes (1859–1969)",
    modernNetwork: 'Replaced by RER A (1969) • Coulée Verte & Opéra Bastille (1989)',
    openedYear: 1859,
    trainStartYear: 1900,
    trainEndYear: 1969,
    buildingEndYear: 1984,
    arrondissement: '12th Arr.',
    destinationLabel: 'LIGNE DE VINCENNES (1859–1969)',
    colorHex: '#e07a68',
    lat: 48.8520,
    lon: 2.3708,
    rotationY: -2.18,
    trackCount: 4,
    shedWidth: 1.32,
    shedLength: 1.95,
    shedHeight: 0.62,
    shedSpans: 1,
    isViaductLine: true,
    description:
      'Opened in 1859 on the southeastern edge of Place de la Bastille atop a 72-arch red-brick and limestone viaduct (now the Viaduc des Arts & Coulée Verte René-Dumont), steam trains steamed out to Vincennes until December 14, 1969; the station was demolished in 1984 for the Opéra Bastille.',
    corridorLatLon: [
      [48.8520, 2.3708],
      [48.8472, 2.3788],
      [48.8415, 2.3912],
      [48.8380, 2.4060],
      [48.8375, 2.4260],
      [48.8400, 2.4520]
    ]
  }
];

export const PARIS_GRANDES_LIGNES: GrandeGareCorridorData[] = RAW_GRANDES_LIGNES.map((raw) => {
  const { x, z } = projectLatLon(raw.lat, raw.lon);
  const corridorPoints = raw.corridorLatLon.map(([lat, lon]) => projectLatLon(lat, lon));
  return {
    ...raw,
    x,
    z,
    corridorPoints
  };
});

export const STATION_GRANDE_LIGNE_MAP: Map<string, GrandeGareCorridorData> = new Map(
  PARIS_GRANDES_LIGNES.map((g) => [g.metroStationId, g])
);
