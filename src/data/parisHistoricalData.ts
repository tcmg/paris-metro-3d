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

import { projectLatLon, SEINE_CENTERLINE_LATLON } from './parisGeoData';
import { ACTIVE_PIPELINE_CITY_DATASET } from '../cities/activeCityRuntime';

export interface HistoricalMilestone {
  year: number;
  shortLabel: string;
  headline: string;
}

export interface HistoricalEra {
  startYear: number;
  endYear: number;
  eraTag: string;
  title: string;
  description: string;
  urbanChanges: string[];
}

export interface ParisMonumentData {
  id: string;
  name: string;
  lat: number;
  lon: number;
  x: number;
  z: number;
  builtYear: number;
  constructionStartYear?: number;
  radius: number;
  style: string;
  arrondissement: string;
  description: string;
}

const DEFAULT_PARIS_MILESTONES: HistoricalMilestone[] = [
  {
    year: 1900,
    shortLabel: '1900',
    headline: 'July 19, 1900: Opening of Line 1 & the Paris Universal Exposition'
  },
  {
    year: 1904,
    shortLabel: '1904',
    headline: '1904: Opening of Line 3 (Opéra – République – Père Lachaise)'
  },
  {
    year: 1910,
    shortLabel: '1910',
    headline: '1910: Line 4 crosses beneath the Seine & birth of the Nord-Sud network (Lines 12 & 13)'
  },
  {
    year: 1914,
    shortLabel: '1914',
    headline: '1914: Completion of Sacré-Cœur & 10 Metro lines within the Thiers Wall'
  },
  {
    year: 1935,
    shortLabel: '1935',
    headline: '1934–1935: The Metro crosses the city gates into the suburbs & Line 11 opens'
  },
  {
    year: 1939,
    shortLabel: '1939',
    headline: 'Sept 2, 1939: Wartime mobilization & closure of the famous "Ghost Stations"'
  },
  {
    year: 1973,
    shortLabel: '1973',
    headline: '1973–1977: Tour Montparnasse, Boulevard Périphérique, Centre Pompidou & Line 13 merger'
  },
  {
    year: 1989,
    shortLabel: '1989',
    headline: '1989–1992: Louvre Pyramid, Grande Arche de la Défense & Line 1 extension'
  },
  {
    year: 1998,
    shortLabel: '1998',
    headline: 'Oct 15, 1998: Inauguration of Line 14 "Météor", the first 100% automated line'
  },
  {
    year: 2024,
    shortLabel: '2024',
    headline: 'June 2024: Olympic extensions of Line 14 (Pleyel ↔ Orly) and Line 11'
  },
  {
    year: 2026,
    shortLabel: '2026',
    headline: '2025–2026: Grand Paris Express era & commissioning of the Line 15 South orbital arc'
  }
];

export const TIMELINE_MILESTONES: HistoricalMilestone[] = ACTIVE_PIPELINE_CITY_DATASET
  ? ACTIVE_PIPELINE_CITY_DATASET.milestones.map((ms) => ({
      year: Math.max(1900, Math.min(2026, ms.year)),
      shortLabel: ms.title ?? ms.shortLabel ?? String(ms.year),
      headline: ms.description ?? ms.headline ?? ms.title ?? String(ms.year)
    }))
  : DEFAULT_PARIS_MILESTONES;

const DEFAULT_PARIS_ERAS: HistoricalEra[] = [
  {
    startYear: 1900,
    endYear: 1905,
    eraTag: 'BELLE ÉPOQUE • 1900–1905',
    title: 'The Universal Exposition & Fulgence Bienvenüe',
    description:
      'Inaugurated on July 19, 1900 between Porte Maillot and Porte de Vincennes, the Métropolitain crowned Haussmannian Paris with Hector Guimard Art Nouveau entrances and elevated iron viaducts.',
    urbanChanges: [
      'Line 1 (1900), Line 2 North (1900–1903) and Line 3 (1904)',
      'Grand Palais & Pont Alexandre III inaugurated for the 1900 World’s Fair',
      'Fortified Thiers Wall strictly ringing the city of Paris'
    ]
  },
  {
    startYear: 1906,
    endYear: 1918,
    eraTag: 'THE GOLDEN AGE • 1906–1918',
    title: 'Seine Crossings & the Nord-Sud Rivalry',
    description:
      'Engineers crossed the Seine over grand viaducts (Bir-Hakeim, Austerlitz) and via sunken underwater caissons (Cité, Saint-Michel in 1910), while the rival Nord-Sud company built future Lines 12 and 13.',
    urbanChanges: [
      'Underwater Seine crossing of Line 4 at Cité & Saint-Michel (1910)',
      'Opening of Lines 5, 6, 7, 8 and the Nord-Sud network (Lines 12, 13)',
      'Completion of the Sacré-Cœur Basilica atop Montmartre (1914)'
    ]
  },
  {
    startYear: 1919,
    endYear: 1938,
    eraTag: 'ART DECO ERA • 1919–1938',
    title: 'Demolition of the Fortifications & Suburban Expansion',
    description:
      'The Thiers fortifications were razed to make way for red-brick Art Deco housing belts. The CMP absorbed Nord-Sud in 1930 and extended the Metro beyond the gates of Paris into the suburbs in 1934.',
    urbanChanges: [
      'Demolition of the city walls & rise of the Art Deco brick belt (1919–1932)',
      'Opening of Lines 9 (1922), 10 (1923) and 11 (1935)',
      'First suburban extensions: Pont de Sèvres & Château de Vincennes (1934)'
    ]
  },
  {
    startYear: 1939,
    endYear: 1969,
    eraTag: 'TRANSFORMATION • 1939–1969',
    title: 'Ghost Stations & Rubber-Tired Modernization',
    description:
      'On September 2, 1939, wartime mobilization led to the permanent closure of several stations (Arsenal, Croix-Rouge, Saint-Martin, Champ de Mars). Post-war, the newly formed RATP pioneered rubber-tired trains.',
    urbanChanges: [
      'Birth of the famous "Ghost Stations" closed in September 1939',
      'Creation of the RATP (1949) & standalone Line 7bis (1967)',
      'First modernist high-rises in the La Défense business district (1960s)'
    ]
  },
  {
    startYear: 1970,
    endYear: 1988,
    eraTag: 'LES TRENTE GLORIEUSES • 1970–1988',
    title: 'Boulevard Périphérique, Skyscrapers & Line 13 Merger',
    description:
      'The Boulevard Périphérique ring road was completed in 1973, Tour Montparnasse (1973) and Centre Pompidou (1977) reshaped the Paris skyline, and Line 13 absorbed the former Line 14 across the Seine in 1976.',
    urbanChanges: [
      'Completion of Boulevard Périphérique & Tour Montparnasse (1973)',
      'North–South merger of Line 13 beneath the Seine (1976) & Line 3bis (1971)',
      'Inauguration of Centre Georges-Pompidou at Beaubourg (1977)'
    ]
  },
  {
    startYear: 1989,
    endYear: 2019,
    eraTag: 'GRANDS TRAVAUX • 1989–2019',
    title: 'Bicentennial Grands Projets & the Météor Revolution',
    description:
      'The 1989 Bicentennial crowned Paris with the Louvre Pyramid, the Grande Arche, and Opéra Bastille. In 1998, Line 14 (Météor) ushered in the era of fully driverless high-capacity transit.',
    urbanChanges: [
      'Louvre Pyramid, Grande Arche de la Défense & Opéra Bastille (1989)',
      'Line 1 extended across the Seine to La Défense (1992) & BNF Tolbiac (1996)',
      'Opening of the fully automated Line 14 Météor (1998)'
    ]
  },
  {
    startYear: 2020,
    endYear: 2026,
    eraTag: 'GRAND PARIS • 2020–2026',
    title: 'Olympic Metropolis & Grand Paris Express',
    description:
      'Historic extensions of Lines 4, 11, 12, and 14 (linking Saint-Denis Pleyel to Orly Airport in June 2024) now connect with the automated Line 15 South orbital ring of the Grand Paris Express.',
    urbanChanges: [
      'Extensions of Line 4 (Bagneux 2022) & Line 12 (Aubervilliers 2022)',
      'Line 14 extended from Saint-Denis Pleyel to Orly Airport (2024)',
      'Line 11 to Rosny-Bois-Perrier (2024) & Grand Paris Line 15 South (2025–2026)'
    ]
  }
];

export const HISTORICAL_ERAS: HistoricalEra[] = ACTIVE_PIPELINE_CITY_DATASET
  ? ACTIVE_PIPELINE_CITY_DATASET.eras.map((e) => ({
      startYear: e.yearRange[0],
      endYear: e.yearRange[1],
      eraTag: e.tagline,
      title: e.name,
      description: e.summary,
      urbanChanges: [e.summary]
    }))
  : DEFAULT_PARIS_ERAS;

const RAW_MONUMENTS: Omit<ParisMonumentData, 'x' | 'z'>[] = [
  {
    id: 'monument-eiffel',
    name: 'Eiffel Tower (Tour Eiffel)',
    lat: 48.8582,
    lon: 2.2946,
    builtYear: 1889,
    radius: 4.5,
    style: 'Puddled Wrought-Iron Lattice by Gustave Eiffel (330m)',
    arrondissement: '7th Arr. (Champ-de-Mars)',
    description:
      'Built for the 1889 Universal Exposition. The beacon of Paris overlooking the Seine and the elevated Line 6 viaduct at Bir-Hakeim; illuminated in gold and sparkling on the hour at night.'
  },
  {
    id: 'monument-arc-triomphe',
    name: 'Arc de Triomphe de l’Étoile',
    lat: 48.8738,
    lon: 2.2950,
    builtYear: 1836,
    radius: 3.6,
    style: 'Monumental Neoclassical Arch (Jean-François Chalgrin)',
    arrondissement: '8th / 16th / 17th Arr.',
    description:
      'Geometric centerpiece of the twelve grand radiating Haussmannian avenues of Place de l’Étoile, directly above the underground interchange of Lines 1, 2, and 6.'
  },
  {
    id: 'monument-notre-dame',
    name: 'Notre-Dame Cathedral (Cathédrale Notre-Dame)',
    lat: 48.8530,
    lon: 2.3498,
    builtYear: 1163,
    radius: 3.2,
    style: 'French Gothic Masterpiece & Viollet-le-Duc Spire',
    arrondissement: '4th Arr. (Île de la Cité)',
    description:
      'Gothic jewel on the Île de la Cité with flying buttresses and restored spire, flanked beneath the Seine by the deep sunken caisson of Cité station (Line 4, 1910).'
  },
  {
    id: 'monument-sainte-chapelle',
    name: 'Sainte-Chapelle, Conciergerie & Palais de Justice',
    lat: 48.8555,
    lon: 2.3450,
    builtYear: 1248,
    radius: 3.0,
    style: 'Royal Rayonnant Gothic (Louis IX, 1248) & Medieval Towers',
    arrondissement: '1st Arr. (Île de la Cité)',
    description:
      'Royal Gothic reliquary with fifteen soaring stained-glass windows nestled inside the Palais de la Cité, flanked on the north bank by the medieval twin towers of the Conciergerie.'
  },
  {
    id: 'monument-louvre',
    name: 'Louvre Palace & Pyramid (Palais du Louvre)',
    lat: 48.86085,
    lon: 2.3365,
    builtYear: 1546,
    radius: 4.8,
    style: 'Renaissance / Second Empire & I.M. Pei Glass Pyramid (1989)',
    arrondissement: '1st Arr.',
    description:
      'Former royal palace crowned with slate-and-zinc Mansard roofs; its Cour Napoléon received I.M. Pei’s iconic glass-and-steel Pyramid in 1989.'
  },
  {
    id: 'monument-sacre-coeur',
    name: 'Sacré-Cœur Basilica of Montmartre',
    lat: 48.8867,
    lon: 2.3431,
    builtYear: 1914,
    constructionStartYear: 1875,
    radius: 4.2,
    style: 'Romano-Byzantine in White Château-Landon Travertine Stone',
    arrondissement: '18th Arr. (Montmartre Hill)',
    description:
      'Under construction in 1900 atop the 130-meter summit of Montmartre and consecrated after 1914. Deep beneath the hill wind the tunnels of Line 12 (Abbesses).'
  },
  {
    id: 'monument-opera-garnier',
    name: 'Opéra Garnier (Palais Garnier)',
    lat: 48.8719,
    lon: 2.3318,
    builtYear: 1875,
    radius: 3.2,
    style: 'Napoleon III / Beaux-Arts Masterpiece (Charles Garnier)',
    arrondissement: '9th Arr.',
    description:
      'Crowned by its verdigris copper dome and gilded rooftop sculptures, standing directly above the triple underground crossing of Metro Lines 3, 7, and 8.'
  },
  {
    id: 'monument-invalides',
    name: 'Les Invalides & Royal Dome',
    lat: 48.8556,
    lon: 2.3126,
    builtYear: 1706,
    radius: 3.8,
    style: 'French Classical & Gold-Leaf Dome (Jules Hardouin-Mansart)',
    arrondissement: '7th Arr.',
    description:
      'Its gleaming gilded dome rises 107 meters at the southern end of the Esplanade des Invalides, served by Metro Lines 8 and 13.'
  },
  {
    id: 'monument-pantheon',
    name: 'Panthéon',
    lat: 48.8462,
    lon: 2.3464,
    builtYear: 1790,
    radius: 3.4,
    style: 'Neoclassical Peristyle Dome (Jacques-Germain Soufflot)',
    arrondissement: '5th Arr. (Montagne Sainte-Geneviève)',
    description:
      'Neoclassical mausoleum of France’s national figures crowning the Latin Quarter atop Montagne Sainte-Geneviève, flanked by Lines 10 and 7.'
  },
  {
    id: 'monument-grand-palais',
    name: 'Grand Palais & Pont Alexandre III',
    lat: 48.8661,
    lon: 2.3125,
    builtYear: 1900,
    radius: 3.8,
    style: 'Beaux-Arts & Barrel-Vaulted Glass Nave (1900 World’s Fair)',
    arrondissement: '8th Arr.',
    description:
      'Inaugurated in 1900 alongside Metro Line 1 for the Universal Exposition, celebrated for its sweeping iron-and-glass nave and bronze quadriga sculptures.'
  },
  {
    id: 'monument-concorde-madeleine',
    name: 'Place de la Concorde Obelisk & La Madeleine',
    lat: 48.8656,
    lon: 2.3212,
    builtYear: 1836,
    radius: 3.2,
    style: 'Luxor Obelisk (1836) & Neoclassical Corinthian Temple (1842)',
    arrondissement: '1st / 8th Arr.',
    description:
      'The 3,300-year-old Luxor Obelisk at the center of Place de la Concorde faces the Corinthian colonnade of La Madeleine above the hub of Lines 1, 8, 12, and 14.'
  },
  {
    id: 'monument-bastille',
    name: 'Place de la Bastille & Opéra Bastille',
    lat: 48.8532,
    lon: 2.3692,
    builtYear: 1840,
    radius: 3.6,
    style: 'July Column (1840) & Modernist Opera House by Carlos Ott (1989)',
    arrondissement: '4th / 11th / 12th Arr.',
    description:
      'Crowned by the gilded Spirit of Freedom atop the July Column since 1840 and joined in 1989 by the modernist Opéra Bastille above Lines 1, 5, and 8.'
  },
  {
    id: 'monument-montparnasse',
    name: 'Tour Montparnasse',
    lat: 48.8421,
    lon: 2.3219,
    builtYear: 1973,
    radius: 3.2,
    style: 'Modernist Monolithic Skyscraper (210m, 1973)',
    arrondissement: '15th Arr.',
    description:
      'Completed in 1973 on the site of the old Montparnasse rail terminal, towering above the major underground interchange of Lines 4, 6, 12, and 13.'
  },
  {
    id: 'monument-pompidou',
    name: 'Centre Georges-Pompidou (Beaubourg)',
    lat: 48.8606,
    lon: 2.3522,
    builtYear: 1977,
    radius: 3.2,
    style: 'High-Tech Inside-Out Architecture (Piano & Rogers, 1977)',
    arrondissement: '4th Arr.',
    description:
      'Inaugurated in January 1977 with its exposed steel exoskeleton, exterior glass escalator tube, and color-coded blue, red, yellow, and green service ducts.'
  },
  {
    id: 'monument-grande-arche',
    name: 'La Défense & La Grande Arche',
    lat: 48.8926,
    lon: 2.2361,
    builtYear: 1989,
    constructionStartYear: 1966,
    radius: 5.8,
    style: 'Monumental Carrara Marble Open Cube (Otto von Spreckelsen, 1989)',
    arrondissement: 'Puteaux / Courbevoie',
    description:
      'Skyscraper district begun in the 1960s and crowned in July 1989 by the 110-meter Grande Arche along the Historic Axis, reached by Metro Line 1 in 1992.'
  },
  {
    id: 'monument-bnf',
    name: 'National Library of France (BNF François-Mitterrand)',
    lat: 48.8336,
    lon: 2.3758,
    builtYear: 1996,
    radius: 4.0,
    style: 'Four Open-Book L-Shaped Glass Towers (Dominique Perrault, 1996)',
    arrondissement: '13th Arr.',
    description:
      'Inaugurated in 1996 along the Left Bank of the Seine at Tolbiac around a sunken forest courtyard, connected in October 1998 by automated Line 14.'
  },
  {
    id: 'monument-gare-du-nord',
    name: 'Gare du Nord (Grandes Lignes Nord)',
    lat: 48.8814,
    lon: 2.3555,
    builtYear: 1864,
    radius: 3.6,
    style: 'Neoclassical Facade & Triple Iron-and-Glass Train Hall (Jacques Hittorff, 1864)',
    arrondissement: '10th Arr.',
    description:
      'Europe’s busiest railway terminal, designed by Jacques Hittorff for the Compagnie du Nord with 23 rooftop statues and a 180m iron-and-glass hall welcoming the Nord-Express, Golden Arrow, Eurostar, and TGV Nord.'
  },
  {
    id: 'monument-gare-de-lest',
    name: "Gare de l'Est (Grandes Lignes Est)",
    lat: 48.8774,
    lon: 2.3596,
    builtYear: 1849,
    radius: 3.4,
    style: 'Twin-Arched Neoclassical Headhouse & Iron Train Sheds (Duquesney, 1849 / 1931)',
    arrondissement: '10th Arr.',
    description:
      'Crowning the northern vista of Boulevard de Strasbourg, Gare de l’Est launched the inaugural 1883 Orient-Express to Constantinople and today dispatches TGV Est and ICE high-speed trains toward Strasbourg and Germany.'
  },
  {
    id: 'monument-gare-de-lyon',
    name: 'Gare de Lyon & Tour de l’Horloge (PLM)',
    lat: 48.8442,
    lon: 2.3748,
    builtYear: 1900,
    radius: 3.8,
    style: 'Belle Époque Palace & 67m Gilded Clock Tower (Marius Toudoire, 1900)',
    arrondissement: '12th Arr.',
    description:
      'Rebuilt for the 1900 Universal Exposition with its 67-meter gilded Clock Tower and Le Train Bleu restaurant, Gare de Lyon launched the TGV Sud-Est high-speed rail revolution in September 1981.'
  },
  {
    id: 'monument-gare-dausterlitz',
    name: "Gare d'Austerlitz (Grandes Lignes Sud-Ouest)",
    lat: 48.8418,
    lon: 2.3662,
    builtYear: 1869,
    radius: 3.4,
    style: '51m Clear-Span Polonceau Iron Hall & Elevated Line 5 Viaduct Crossing (1869 / 1906)',
    arrondissement: '13th Arr.',
    description:
      'Historic Paris–Orléans terminus featuring a colossal single-span iron-and-glass train hall pierced mid-air since 1906 by the elevated viaduct of Metro Line 5 before it leaps across the Seine.'
  },
  {
    id: 'monument-gare-saint-lazare',
    name: 'Gare Saint-Lazare & Pont de l’Europe',
    lat: 48.8768,
    lon: 2.3248,
    builtYear: 1889,
    radius: 3.6,
    style: 'Haussmannian Pavilions, Triple Train Halls & X-Shaped Iron Bridge (Juste Lisch, 1889)',
    arrondissement: '8th Arr.',
    description:
      'Paris’s oldest railway station (1837), immortalized by Claude Monet in 1877; its wide throat of 27 tracks passes beneath the riveted iron X-trusses of the Pont de l’Europe toward Normandy.'
  },
  {
    id: 'monument-gare-dorsay',
    name: "Gare d'Orsay / Musée d'Orsay",
    lat: 48.8599,
    lon: 2.3265,
    builtYear: 1900,
    radius: 3.2,
    style: 'Beaux-Arts Limestone Vault & Coffered Glass Nave (Victor Laloux, 1900)',
    arrondissement: '7th Arr.',
    description:
      'Opened on July 14, 1900 along the Left Bank opposite the Louvre as the world’s first electrified urban mainline terminal; mainline trains ceased in 1939 and the grand hall reopened as the Musée d’Orsay in 1986.'
  }
];

export const PARIS_MONUMENTS: ParisMonumentData[] = ACTIVE_PIPELINE_CITY_DATASET
  ? ACTIVE_PIPELINE_CITY_DATASET.monuments.map((m) => ({
      id: m.id,
      name: m.name,
      lat: m.lat,
      lon: m.lon,
      x: m.x,
      z: m.z,
      builtYear: m.completedYear ?? m.year,
      radius: 3.4,
      style: m.architecturalStyle || m.architect,
      arrondissement: m.metroConnection || ACTIVE_PIPELINE_CITY_DATASET!.name,
      description: m.historicalSummary || m.fact
    }))
  : RAW_MONUMENTS.map((m) => {
      const { x, z } = projectLatLon(m.lat, m.lon);
      return { ...m, x, z };
    });

export function getEraForYear(year: number): HistoricalEra {
  for (const era of HISTORICAL_ERAS) {
    if (year >= era.startYear && year <= era.endYear) {
      return era;
    }
  }
  return HISTORICAL_ERAS[HISTORICAL_ERAS.length - 1];
}

export function getClosestMilestoneHeadline(year: number): HistoricalMilestone {
  let best = TIMELINE_MILESTONES[0];
  for (const ms of TIMELINE_MILESTONES) {
    if (ms.year <= year) {
      best = ms;
    }
  }
  return best;
}

interface TopographicHill {
  cx: number;
  cz: number;
  height: number;
  rx: number;
  rz: number;
}

/**
 * Real topographic hills (Buttes) and plateaus of the Paris Basin (Cuvette Parisienne)
 * at true 1:1 vertical scale (1.0 world unit = 89.3 meters above the 28m ASL Seine river datum).
 */
const DEFAULT_PARIS_TOPOGRAPHIC_HILLS: TopographicHill[] = [
  // Butte Montmartre (130m ASL -> +102m above Seine = +1.15 world units)
  { cx: 1.69, cz: -34.08, height: 1.15, rx: 10.8, rz: 7.8 },
  // Montmartre / Clignancourt / Poissonniers broader northern shoulder
  { cx: 1.8, cz: -36.5, height: 0.26, rx: 18.5, rz: 12.5 },
  // Belleville / Ménilmontant / Père-Lachaise / Télégraphe Plateau (128m ASL -> +1.08 world units)
  { cx: 39.8, cz: -18.9, height: 1.08, rx: 19.5, rz: 14.5 },
  // Buttes-Chaumont (103m ASL -> +0.82 world units)
  { cx: 34.3, cz: -26.8, height: 0.78, rx: 8.8, rz: 7.4 },
  // Montagne Sainte-Geneviève / Panthéon (61m ASL -> +0.38 world units)
  { cx: 4.4, cz: 16.4, height: 0.38, rx: 10.5, rz: 8.5 },
  // Colline de Chaillot / Trocadéro / Passy (67m ASL -> +0.42 world units)
  { cx: -44.5, cz: -3.9, height: 0.42, rx: 11.2, rz: 8.8 },
  // Colline de l'Étoile / Arc de Triomphe (59m ASL -> +0.35 world units)
  { cx: -32.7, cz: -14.8, height: 0.35, rx: 13.0, rz: 10.2 },
  // Butte-aux-Cailles (62m ASL -> +0.38 world units)
  { cx: 9.4, cz: 39.0, height: 0.38, rx: 8.5, rz: 7.5 },
  // Parc Montsouris / Cité Universitaire Ridge (68m ASL -> +0.44 world units)
  { cx: -2.5, cz: 46.5, height: 0.44, rx: 14.5, rz: 10.5 },
  // Mont Valérien (West Hauts-de-Seine, 162m ASL -> +1.28 world units)
  { cx: -96.0, cz: -17.0, height: 1.28, rx: 20.0, rz: 16.0 },
  // Meudon / Clamart / Châtillon Escarpment (South-West Plateau, 155m ASL -> +1.22 world units)
  { cx: -58.0, cz: 68.0, height: 1.22, rx: 32.0, rz: 16.0 }
];

const PARIS_TOPOGRAPHIC_HILLS: TopographicHill[] = ACTIVE_PIPELINE_CITY_DATASET
  ? ACTIVE_PIPELINE_CITY_DATASET.topography.map((peak) => {
      const proj = projectLatLon(peak.lat, peak.lon);
      const unitsPerKm = ACTIVE_PIPELINE_CITY_DATASET!.geo.worldUnitsPerKm ?? 10.5;
      return {
        cx: peak.x ?? proj.x,
        cz: peak.z ?? proj.z,
        height: Math.min(1.4, (peak.peakElevationMeters / 89.3) * 0.45),
        rx: Math.max(8.0, (peak.radiusMeters / 1000) * unitsPerKm),
        rz: Math.max(8.0, (peak.radiusMeters / 1000) * unitsPerKm)
      };
    })
  : DEFAULT_PARIS_TOPOGRAPHIC_HILLS;

// Exact 1:1 Seine river valley centerline derived directly from SEINE_CENTERLINE_LATLON
// so the river channel, islands, and quaysides (especially around Trocadéro / Eiffel Tower / Passy) stay flat at y = 0.0
const SEINE_VALLEY_POLYLINE: [number, number][] = SEINE_CENTERLINE_LATLON.map(([lat, lon]) => {
  const pt = projectLatLon(lat, lon);
  return [pt.x, pt.z];
});

function distToSegmentSq2D(
  px: number,
  pz: number,
  ax: number,
  az: number,
  bx: number,
  bz: number
): number {
  const dx = bx - ax;
  const dz = bz - az;
  const lenSq = dx * dx + dz * dz;
  if (lenSq < 1e-6) {
    return (px - ax) * (px - ax) + (pz - az) * (pz - az);
  }
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (pz - az) * dz) / lenSq));
  const cx = ax + t * dx;
  const cz = az + t * dz;
  return (px - cx) * (px - cx) + (pz - cz) * (pz - cz);
}

/**
 * Returns the authentic 1:1 topographic elevation (in world units above the Seine river datum)
 * for any point (x, z) across Paris and the Petite Couronne.
 */
export function getParisTerrainElevation(x: number, z: number): number {
  let elev = 0.0;
  for (let i = 0; i < PARIS_TOPOGRAPHIC_HILLS.length; i++) {
    const hill = PARIS_TOPOGRAPHIC_HILLS[i];
    const nx = (x - hill.cx) / hill.rx;
    const nz = (z - hill.cz) / hill.rz;
    const dSq = nx * nx + nz * nz;
    if (dSq < 4.5) {
      const contrib = hill.height * Math.exp(-dSq * 1.15);
      // Combine overlapping hills smoothly without unnatural spikes
      elev = Math.max(elev, contrib) + Math.min(elev, contrib) * 0.25;
    }
  }

  if (elev < 1e-4) return 0.0;

  // Carve flat alluvial valley corridor along the Seine river so water, islands, and riverbanks stay level
  let minRiverDistSq = Infinity;
  for (let i = 0; i < SEINE_VALLEY_POLYLINE.length - 1; i++) {
    const [ax, az] = SEINE_VALLEY_POLYLINE[i];
    const [bx, bz] = SEINE_VALLEY_POLYLINE[i + 1];
    const dSq = distToSegmentSq2D(x, z, ax, az, bx, bz);
    if (dSq < minRiverDistSq) minRiverDistSq = dSq;
  }

  const riverDist = Math.sqrt(minRiverDistSq);
  if (riverDist <= 6.2) return 0.0;
  if (riverDist < 13.5) {
    const t = (riverDist - 6.2) / (13.5 - 6.2);
    const smooth = t * t * (3 - 2 * t);
    elev *= smooth;
  }

  return elev;
}

export interface ParisNaturalisationTourStop {
  id: string;
  stopNumber: number;
  title: string;
  historicalDate: string;
  timelineYear: number;
  locationName: string;
  arrondissement: string;
  lat: number;
  lon: number;
  x: number;
  z: number;
  radiusScale: number;
  monumentId?: string;
  stationId?: string;
  interviewQuestion: string;
  fact: string;
}

const RAW_NATURALISATION_TOUR_STOPS: Omit<ParisNaturalisationTourStop, 'x' | 'z'>[] = [
  {
    id: 'tour-lutece-notre-dame',
    stopNumber: 1,
    title: 'Lutèce, Clovis & Notre-Dame de Paris',
    historicalDate: '52 BC • 508 • 1163',
    timelineYear: 1910,
    locationName: 'Île de la Cité & Notre-Dame Cathedral',
    arrondissement: '4th Arr.',
    lat: 48.8530,
    lon: 2.3499,
    radiusScale: 1.65,
    monumentId: 'monument-notre-dame',
    stationId: 'cite',
    interviewQuestion:
      'Where was Paris founded, and which monarchs made it the capital of the Kingdom of France?',
    fact:
      'Founded on the Île de la Cité by the Celtic Parisii tribe as Lutetia (Lutèce), Paris was made capital of the Franks by King Clovis in 508 and anchored by Hugues Capet in 987. Notre-Dame Cathedral (begun in 1163) witnessed the 1804 coronation of Napoleon I and the 1944 Liberation Te Deum.'
  },
  {
    id: 'tour-sainte-chapelle-conciergerie',
    stopNumber: 2,
    title: 'Saint Louis, the Sainte-Chapelle & the Conciergerie',
    historicalDate: '1248 • 1793',
    timelineYear: 1910,
    locationName: 'Palais de la Cité & Sainte-Chapelle',
    arrondissement: '1st Arr.',
    lat: 48.8554,
    lon: 2.3450,
    radiusScale: 1.45,
    monumentId: 'monument-sainte-chapelle',
    stationId: 'cite',
    interviewQuestion:
      'Who built the Sainte-Chapelle, and what role did the Conciergerie play during the French Revolution?',
    fact:
      'King Louis IX (Saint Louis) consecrated the Rayonnant Gothic Sainte-Chapelle in 1248 inside the medieval royal palace to house the Crown of Thorns. During the French Revolution (1793–1794), the adjoining Conciergerie served as the Revolutionary Tribunal and prison where Queen Marie-Antoinette was held before her execution.'
  },
  {
    id: 'tour-sorbonne-quartier-latin',
    stopNumber: 3,
    title: 'La Sorbonne, the Enlightenment & the Latin Quarter',
    historicalDate: '1257 • 18th Century',
    timelineYear: 1930,
    locationName: 'Sorbonne University & Cluny',
    arrondissement: '5th Arr.',
    lat: 48.8512,
    lon: 2.3448,
    radiusScale: 1.35,
    stationId: 'cluny-la-sorbonne',
    interviewQuestion:
      'Why is the 5th arrondissement called the Latin Quarter, and who were the key philosophers of the Enlightenment (Siècle des Lumières)?',
    fact:
      'Founded in 1257 by Robert de Sorbon under Saint Louis, the University of Paris conducted all teaching in Latin, giving the Quartier Latin its name. In the 18th century, Paris salons and cafés surrounding the Left Bank fueled the Enlightenment philosophers—Voltaire, Rousseau, Montesquieu, and Diderot—whose ideas of reason, tolerance, and separation of powers inspired 1789.'
  },
  {
    id: 'tour-louvre-republic-museum',
    stopNumber: 4,
    title: 'From Royal Fortress to Public Museum of the Republic',
    historicalDate: '1190 • 1793 • 1989',
    timelineYear: 1989,
    locationName: 'Palais du Louvre & Glass Pyramid',
    arrondissement: '1st Arr.',
    lat: 48.8606,
    lon: 2.3376,
    radiusScale: 1.85,
    monumentId: 'monument-louvre',
    stationId: 'palais-royal',
    interviewQuestion:
      'How did the Louvre evolve from a medieval fortress into a national museum open to all citizens?',
    fact:
      'Built as a fortress by King Philippe Auguste in 1190 and transformed into a Renaissance royal palace by François I and Henry IV, the Louvre was opened to the public by the French Revolution on August 10, 1793 so that art and knowledge belonged to the entire nation rather than the Crown.'
  },
  {
    id: 'tour-bastille-14-juillet',
    stopNumber: 5,
    title: 'La Prise de la Bastille & the July 14 National Holiday',
    historicalDate: 'July 14, 1789',
    timelineYear: 1900,
    locationName: 'Place de la Bastille & July Column',
    arrondissement: '4th / 11th / 12th Arr.',
    lat: 48.8532,
    lon: 2.3692,
    radiusScale: 1.55,
    monumentId: 'monument-bastille',
    stationId: 'bastille',
    interviewQuestion:
      'What happened on July 14, 1789 (La Prise de la Bastille), and why is July 14 the French National Day?',
    fact:
      'On July 14, 1789, Parisians stormed the royal fortress-prison of the Bastille, toppling the symbol of absolute monarchy and arbitrary royal arrest. July 14 was proclaimed the French National Holiday in 1880 to commemorate both the 1789 Storming of the Bastille and the Fête de la Fédération of July 14, 1790.'
  },
  {
    id: 'tour-concorde-ddhc',
    stopNumber: 6,
    title: 'Declaration of the Rights of Man & Citizen (1789)',
    historicalDate: 'August 26, 1789',
    timelineYear: 1910,
    locationName: 'Place de la Concorde',
    arrondissement: '1st / 8th Arr.',
    lat: 48.8656,
    lon: 2.3212,
    radiusScale: 1.65,
    monumentId: 'monument-concorde-madeleine',
    stationId: 'concorde',
    interviewQuestion:
      'What fundamental text was adopted on August 26, 1789, and what are its core principles?',
    fact:
      'Adopted by the National Constituent Assembly next to the Tuileries and Place de la Concorde, the Déclaration des droits de l’homme et du citoyen (DDHC) proclaims that all human beings are born free and equal in rights (Article 1), guaranteeing liberty, property, security, and resistance to oppression. Its full text is tiled across the Line 12 platforms below Place de la Concorde.'
  },
  {
    id: 'tour-pantheon-grands-hommes',
    stopNumber: 7,
    title: 'The Panthéon: "To Great Men & Women, the Grateful Homeland"',
    historicalDate: '1791 • 1995 • 2018',
    timelineYear: 1931,
    locationName: 'Le Panthéon (Montagne Sainte-Geneviève)',
    arrondissement: '5th Arr.',
    lat: 48.8462,
    lon: 2.3464,
    radiusScale: 1.55,
    monumentId: 'monument-pantheon',
    stationId: 'cardinal-lemoine',
    interviewQuestion:
      'What is the purpose of the Panthéon in Paris, and which famous figures of French history rest in its crypt?',
    fact:
      'Converted in 1791 by the French Revolution into a secular temple honoring national figures ("Aux grands hommes, la Patrie reconnaissante"), the Panthéon shelters Voltaire, Rousseau, Victor Hugo, Émile Zola, Resistance leader Jean Moulin, abolitionist Victor Schœlcher, Nobel laureate Marie Curie (1995), Simone Veil (2018), and Josephine Baker (2021).'
  },
  {
    id: 'tour-invalides-napoleon-code-civil',
    stopNumber: 8,
    title: 'Les Invalides, Louis XIV & Napoleon’s Civil Code',
    historicalDate: '1670 • 1804 • 1840',
    timelineYear: 1913,
    locationName: 'Hôtel National des Invalides',
    arrondissement: '7th Arr.',
    lat: 48.8550,
    lon: 2.3125,
    radiusScale: 1.75,
    monumentId: 'monument-invalides',
    stationId: 'invalides',
    interviewQuestion:
      'Who built Les Invalides, and what lasting institutions did Napoleon Bonaparte create for the French state?',
    fact:
      'Founded by Louis XIV (the Sun King) in 1670 as a hospital and home for wounded soldiers, the Golden Dome of Les Invalides houses the tomb of Napoleon I. As First Consul and Emperor (1799–1815), Napoleon established the Code civil (1804), the Departmental Préfets, the Lycées, the Banque de France, and the Légion d’honneur.'
  },
  {
    id: 'tour-arc-triomphe-soldat-inconnu',
    stopNumber: 9,
    title: 'Arc de Triomphe & the Tomb of the Unknown Soldier',
    historicalDate: '1806 • 1836 • Nov 11, 1920',
    timelineYear: 1920,
    locationName: 'Place Charles de Gaulle – Étoile',
    arrondissement: '8th / 16th / 17th Arr.',
    lat: 48.8738,
    lon: 2.2950,
    radiusScale: 1.65,
    monumentId: 'monument-arc-triomphe',
    stationId: 'etoile',
    interviewQuestion:
      'What does November 11 commemorate in France, and what lies beneath the central vault of the Arc de Triomphe?',
    fact:
      'Commissioned after the Battle of Austerlitz (1806) and completed in 1836, the Arc de Triomphe shelters the Tomb of the Unknown Soldier, laid to rest on November 11, 1920 to commemorate the Armistice of November 11, 1918 and the 1.4 million French soldiers killed in World War I.'
  },
  {
    id: 'tour-hotel-de-ville-republiques',
    stopNumber: 10,
    title: 'Hôtel de Ville: The 1848 & 1870 Proclamations of the Republic',
    historicalDate: '1848 • Sept 4, 1870 • Aug 25, 1944',
    timelineYear: 1900,
    locationName: 'Hôtel de Ville de Paris',
    arrondissement: '4th Arr.',
    lat: 48.8565,
    lon: 2.3522,
    radiusScale: 1.5,
    monumentId: 'monument-hotel-de-ville',
    stationId: 'hotel-de-ville',
    interviewQuestion:
      'What major democratic milestones were proclaimed at the Hôtel de Ville in 1848, 1870, and 1944?',
    fact:
      'At the Hôtel de Ville, the Second Republic was proclaimed in February 1848—establishing universal male suffrage and permanently abolishing slavery (April 27, 1848)—followed by the proclamation of the Third Republic on September 4, 1870, and General de Gaulle’s historic speech on August 25, 1944 ("Paris outragé ! Paris brisé ! Paris martyrisé ! Mais Paris libéré !") the same year French women won the right to vote.'
  },
  {
    id: 'tour-opera-haussmann',
    stopNumber: 11,
    title: 'Baron Haussmann’s Transformation of Paris & Opéra Garnier',
    historicalDate: '1853–1870 • 1875',
    timelineYear: 1904,
    locationName: 'Palais Garnier & Place de l’Opéra',
    arrondissement: '2nd / 9th Arr.',
    lat: 48.8720,
    lon: 2.3316,
    radiusScale: 1.55,
    monumentId: 'monument-opera-garnier',
    stationId: 'opera',
    interviewQuestion:
      'How did Prefect Baron Haussmann reshape Paris during the Second Empire (1852–1870)?',
    fact:
      'Under Napoleon III, Prefect Georges-Eugène Haussmann rebuilt Paris between 1853 and 1870 with unified cut-limestone apartment facades, grand tree-lined boulevards, clean water supply and underground sewers, major railway terminals, and Charles Garnier’s majestic Opera House.'
  },
  {
    id: 'tour-republique-marianne-symboles',
    stopNumber: 12,
    title: 'Place de la République: Marianne & the Republican Symbols',
    historicalDate: '1880 • July 14, 1883',
    timelineYear: 1935,
    locationName: 'Place de la République',
    arrondissement: '3rd / 10th / 11th Arr.',
    lat: 48.8674,
    lon: 2.3636,
    radiusScale: 1.45,
    stationId: 'republique',
    interviewQuestion:
      'What are the official motto and symbols of the French Republic required in the naturalisation interview?',
    fact:
      'Crowned by the monumental bronze statue of Marianne wearing the Phrygian cap of liberty, Place de la République embodies the symbols of the Republic: the motto "Liberté, Égalité, Fraternité", the Tricolor flag (blue and red of Paris framing royal white), the national anthem La Marseillaise (composed by Rouget de Lisle in 1792), Marianne, and the Gallic rooster.'
  },
  {
    id: 'tour-eiffel-1889-exposition',
    stopNumber: 13,
    title: 'The Eiffel Tower & the 1889 Universal Exposition',
    historicalDate: 'May 15, 1889 • 1900',
    timelineYear: 1900,
    locationName: 'Champ de Mars & Eiffel Tower',
    arrondissement: '7th Arr.',
    lat: 48.8582,
    lon: 2.2946,
    radiusScale: 1.85,
    monumentId: 'monument-eiffel',
    stationId: 'bir-hakeim',
    interviewQuestion:
      'Why was the Eiffel Tower built in 1889, and how did the 1900 Universal Exposition give birth to the Paris Metro?',
    fact:
      'Built by Gustave Eiffel in two years and two months as the grand gateway to the 1889 Universal Exposition celebrating the Centenary of the French Revolution, the Eiffel Tower was followed eleven years later by the 1900 Universal Exposition—for which engineer Fulgence Bienvenüe and architect Hector Guimard inaugurated Line 1 of the Paris Metro on July 19, 1900.'
  },
  {
    id: 'tour-montmartre-laicite-1905',
    stopNumber: 14,
    title: 'Butte Montmartre, the 1871 Commune & the 1905 Law of Laïcité',
    historicalDate: '1871 • December 9, 1905',
    timelineYear: 1914,
    locationName: 'Sacré-Cœur Basilica & Montmartre',
    arrondissement: '18th Arr.',
    lat: 48.8867,
    lon: 2.3431,
    radiusScale: 1.6,
    monumentId: 'monument-sacre-coeur',
    stationId: 'abbesses',
    interviewQuestion:
      'What is the principle of Laïcité in France, and which landmark law established it?',
    fact:
      'Rising atop Montmartre where the 1871 Paris Commune began, Sacré-Cœur witnessed the Third Republic’s debates that culminated in the Law of December 9, 1905 on the Separation of the Churches and the State. Laïcité guarantees every person’s freedom of conscience and worship while ensuring the state remains strictly neutral toward all religions.'
  },
  {
    id: 'tour-assemblee-cinquieme-republique',
    stopNumber: 15,
    title: 'Palais Bourbon: The National Assembly & the Fifth Republic',
    historicalDate: 'October 4, 1958',
    timelineYear: 1958,
    locationName: 'Assemblée Nationale (Palais Bourbon)',
    arrondissement: '7th Arr.',
    lat: 48.8608,
    lon: 2.3208,
    radiusScale: 1.4,
    stationId: 'assemblee-nationale',
    interviewQuestion:
      'When was the Constitution of the Fifth Republic adopted, and how does the French Parliament work?',
    fact:
      'Founded on October 4, 1958 by General Charles de Gaulle and drafted by Michel Debré, the Fifth Republic is a semi-presidential democracy. Legislative power is exercised by a bicameral Parliament located in Paris: the 577 députés of the Assemblée nationale here at Palais Bourbon (elected by direct universal suffrage for 5 years) and the 348 sénateurs at the Palais du Luxembourg.'
  }
];

export const PARIS_NATURALISATION_TOUR_STOPS: ParisNaturalisationTourStop[] = ACTIVE_PIPELINE_CITY_DATASET
  ? ACTIVE_PIPELINE_CITY_DATASET.tourStops.map((stop, idx) => {
      const cityName = ACTIVE_PIPELINE_CITY_DATASET!.name;
      return {
        id: stop.id,
        stopNumber: idx + 1,
        title: stop.title,
        historicalDate: String(stop.year),
        timelineYear: Math.max(1900, Math.min(2026, stop.year)),
        locationName: stop.title.split(':')[0].trim(),
        arrondissement: cityName,
        lat: stop.lat,
        lon: stop.lon,
        x: stop.x,
        z: stop.z,
        radiusScale: 1.65,
        monumentId: stop.highlightMonumentId,
        stationId: undefined,
        interviewQuestion: `How did ${stop.title.split(':')[0].trim()} shape the urban and transit history of ${cityName}?`,
        fact: stop.narrative
      };
    })
  : RAW_NATURALISATION_TOUR_STOPS.map((stop) => {
      const { x, z } = projectLatLon(stop.lat, stop.lon);
      return {
        ...stop,
        x,
        z
      };
    });



