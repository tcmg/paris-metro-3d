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

import { projectLatLon } from './parisGeoData';
import {
  ACTIVE_PIPELINE_CITY_DATASET,
  slugifyCityStationId
} from '../cities/activeCityRuntime';

export interface MetroLineConfig {
  id: string;
  name: string;
  shortLabel: string;
  color: string;
  textColor: string;
  openedYear: number;
  depthOffset: number; // Subterranean Y level in world units
  historicCompany: 'CMP' | 'Nord-Sud' | 'RATP' | 'SGP';
  summary: string;
  segments: MetroSegmentDef[];
}

export interface MetroSegmentDef {
  openedYear: number;
  closedYear?: number;
  elevated?: boolean; // True for viaduct sections (e.g. Line 6 Bir-Hakeim/Pasteur, Line 2 Barbès)
  stations: string[]; // Ordered list of station IDs
}

export interface SpecialStationInteriorInfo {
  photoUrl: string;
  designTitle: string;
  artistOrYear: string;
  interiorCaption: string;
}

export interface MetroStationData {
  id: string;
  name: string;
  lat: number;
  lon: number;
  x: number;
  z: number;
  openedYear: number;
  closedYear?: number; // Defined for Ghost Stations (Stations Fantômes) that were removed/closed
  isGhostStation?: boolean;
  elevated?: boolean;
  arrondissement: string;
  architecture: string;
  landmark?: string;
  description: string;
  lines: string[];
  specialInterior?: SpecialStationInteriorInfo;
}

export const RAW_STATIONS: Omit<MetroStationData, 'x' | 'z' | 'lines'>[] = [
  // ==================== LINE 1 (1900 -> 1934 -> 1937 -> 1992) ====================
  {
    id: 'la-defense',
    name: 'La Défense – Grande Arche',
    lat: 48.8918,
    lon: 2.2385,
    openedYear: 1992,
    arrondissement: 'Puteaux (Hauts-de-Seine)',
    architecture: 'Modern Deck & Concrete Cathedral (1992)',
    landmark: 'La Grande Arche de la Défense',
    description:
      'Western terminus of Line 1 since April 1992, extended beneath the Seine from Pont de Neuilly to the foot of Otto von Spreckelsen’s Grande Arche.'
  },
  {
    id: 'esplanade-la-defense',
    name: 'Esplanade de la Défense',
    lat: 48.8882,
    lon: 2.2498,
    openedYear: 1992,
    arrondissement: 'Courbevoie / Puteaux',
    architecture: 'Monumental Island Platform Beneath the Takis Basin',
    description:
      'Opened in 1992 when Line 1 crossed the Seine into the La Défense business district.'
  },
  {
    id: 'pont-de-neuilly',
    name: 'Pont de Neuilly',
    lat: 48.8848,
    lon: 2.2592,
    openedYear: 1937,
    arrondissement: 'Neuilly-sur-Seine',
    architecture: 'CMP Art Deco Vault (1937)',
    description:
      'Former western terminus of Line 1 from 1937 to 1992, offering a direct sightline along the Historic Axis toward the Arc de Triomphe.'
  },
  {
    id: 'les-sablons',
    name: 'Les Sablons',
    lat: 48.8812,
    lon: 2.2722,
    openedYear: 1937,
    arrondissement: 'Neuilly-sur-Seine',
    architecture: 'CMP Beveled Ceramic Tilework & Cladding',
    description: 'Serves the Jardin d’Acclimatation and the Fondation Louis Vuitton on the edge of the Bois de Boulogne.'
  },
  {
    id: 'porte-maillot',
    name: 'Porte Maillot',
    lat: 48.8778,
    lon: 2.2825,
    openedYear: 1900,
    arrondissement: '16th / 17th Arr.',
    architecture: 'Inaugural Historic Station (July 19, 1900)',
    description:
      'Original western terminus of the very first Métropolitain line opened on July 19, 1900 for the Universal Exposition, rebuilt in 1936.'
  },
  {
    id: 'argentine',
    name: 'Argentine',
    lat: 48.8755,
    lon: 2.2896,
    openedYear: 1900,
    arrondissement: '16th / 17th Arr.',
    architecture: 'Fulgence Bienvenüe White Elliptical Vault',
    description:
      'Opened as Obligado in September 1900, renamed Argentine in 1947 in tribute to post-war Argentine food aid.'
  },
  {
    id: 'etoile',
    name: 'Charles de Gaulle – Étoile',
    lat: 48.8738,
    lon: 2.2950,
    openedYear: 1900,
    arrondissement: '8th / 16th / 17th Arr.',
    architecture: 'Subterranean Hub Beneath Place de l’Étoile',
    landmark: 'Arc de Triomphe',
    description:
      'Imperial crossroads beneath the Arc de Triomphe and its twelve radiating Haussmannian avenues. Historic starting point of Lines 1, 2, and 6 in 1900.'
  },
  {
    id: 'george-v',
    name: 'George V',
    lat: 48.8720,
    lon: 2.3008,
    openedYear: 1900,
    arrondissement: '8th Arr.',
    architecture: 'Classic Vault Beneath the Champs-Élysées',
    description:
      'Inaugurated on August 13, 1900 under the name Alma, renamed George V in 1920 in honor of the King of the United Kingdom.'
  },
  {
    id: 'franklin-roosevelt',
    name: 'Franklin D. Roosevelt',
    lat: 48.8698,
    lon: 2.3075,
    openedYear: 1900,
    arrondissement: '8th Arr.',
    architecture: 'Luminous Art Deco & Modern Gemmail Stained Glass',
    description:
      'Former Marbeuf station (Line 1, 1900), merged in 1942 with Rond-Point des Champs-Élysées (Line 9).'
  },
  {
    id: 'champs-elysees-clemenceau',
    name: 'Champs-Élysées – Clemenceau',
    lat: 48.8675,
    lon: 2.3138,
    openedYear: 1900,
    arrondissement: '8th Arr.',
    architecture: 'Portuguese Azulejo Tile Frescoes & Glasswork',
    landmark: 'Grand Palais & Petit Palais',
    description:
      'Opened on July 19, 1900 at the foot of the Grand Palais built for the 1900 Universal Exposition. Joined by Line 13 in 1975.'
  },
  {
    id: 'concorde',
    name: 'Concorde',
    lat: 48.8656,
    lon: 2.3212,
    openedYear: 1900,
    arrondissement: '1st / 8th Arr.',
    architecture: '1789 Declaration Typographic Ceramic Tiles',
    landmark: 'Place de la Concorde & Obelisk',
    description:
      'Major interchange hub for Lines 1, 8, and 12. Its ceramic tiles on Line 12 spell out the Declaration of the Rights of Man letter by letter.'
  },
  {
    id: 'tuileries',
    name: 'Tuileries',
    lat: 48.8644,
    lon: 2.3292,
    openedYear: 1900,
    arrondissement: '1st Arr.',
    architecture: 'Guimard Entrance & Centennial Historical Frescoes',
    landmark: 'Tuileries Garden',
    description:
      'Inaugural 1900 station bordering the gilded gates of the Tuileries Garden along Rue de Rivoli.'
  },
  {
    id: 'palais-royal',
    name: 'Palais Royal – Musée du Louvre',
    lat: 48.8625,
    lon: 2.3358,
    openedYear: 1900,
    arrondissement: '1st Arr.',
    architecture: 'Kiosque des Noctambules (Jean-Michel Othoniel) & Guimard Entrance',
    landmark: 'Louvre Museum & Pyramid',
    description:
      'One of the eight stations opened on opening day (July 19, 1900). Directly linked underground to the Carrousel and Louvre Pyramid since 1989.'
  },
  {
    id: 'louvre-rivoli',
    name: 'Louvre – Rivoli',
    lat: 48.8608,
    lon: 2.3410,
    openedYear: 1900,
    arrondissement: '1st Arr.',
    architecture: 'First Cultural Station with Classical Sculpture Casts (1968)',
    description:
      'Opened in August 1900 under the name Louvre; transformed by André Malraux in 1968 into an underground gallery displaying replicas of museum masterpieces.'
  },
  {
    id: 'chatelet',
    name: 'Châtelet',
    lat: 48.8584,
    lon: 2.3470,
    openedYear: 1900,
    arrondissement: '1st / 4th Arr.',
    architecture: 'Five-Line Stacked Subterranean Mega-Hub',
    landmark: 'Tour Saint-Jacques & Théâtre du Châtelet',
    description:
      'The beating heart of the Paris network since August 6, 1900. Five metro lines (1, 4, 7, 11, 14) stack down to 28 meters underground.'
  },
  {
    id: 'hotel-de-ville',
    name: 'Hôtel de Ville',
    lat: 48.8568,
    lon: 2.3522,
    openedYear: 1900,
    arrondissement: '4th Arr.',
    architecture: 'White Vault & Municipal History Murals',
    landmark: 'Hôtel de Ville (Paris City Hall)',
    description:
      'Opened on July 19, 1900 beneath Rue de Rivoli, becoming a major interchange with Line 11 upon its opening in 1935.'
  },
  {
    id: 'saint-paul',
    name: 'Saint-Paul (Le Marais)',
    lat: 48.8550,
    lon: 2.3608,
    openedYear: 1900,
    arrondissement: '4th Arr.',
    architecture: 'Beveled White Ceramic Tiles & Val d’Osne Candelabra',
    landmark: 'Place des Vosges & Le Marais District',
    description: 'Serving the historic heart of the Marais and Place des Vosges since August 1900.'
  },
  {
    id: 'bastille',
    name: 'Bastille',
    lat: 48.8532,
    lon: 2.3692,
    openedYear: 1900,
    arrondissement: '4th / 11th / 12th Arr.',
    architecture: 'Open-Air Metro Bridge Over Canal Saint-Martin & Subterranean Vaults',
    landmark: 'July Column & Opéra Bastille',
    description:
      'The only open-air station on Line 1 spanning the Arsenal Basin, at the foot of the July Column (1840) and Opéra Bastille (1989).'
  },
  {
    id: 'gare-de-lyon',
    name: 'Gare de Lyon',
    lat: 48.8443,
    lon: 2.3744,
    openedYear: 1900,
    arrondissement: '12th Arr.',
    architecture: 'Original Glass-Roofed Metal Hall (Line 1) & Deep Tube (Line 14)',
    landmark: 'Gare de Lyon Clock Tower',
    description:
      'Inaugurated on July 19, 1900 with a spectacular 24-meter-wide metal deck; joined in 1998 by the automated Météor line (Line 14).'
  },
  {
    id: 'reuilly-diderot',
    name: 'Reuilly – Diderot',
    lat: 48.8472,
    lon: 2.3858,
    openedYear: 1900,
    arrondissement: '12th Arr.',
    architecture: 'CMP Elliptical Vault',
    description: 'Opened in August 1900 on Line 1, connected to Line 8 in 1931.'
  },
  {
    id: 'nation',
    name: 'Nation',
    lat: 48.8484,
    lon: 2.3958,
    openedYear: 1900,
    arrondissement: '11th / 12th Arr.',
    architecture: 'Subterranean Circular Loop Beneath Place de la Nation',
    landmark: 'Triumph of the Republic Monument',
    description:
      'Major eastern hub of Paris where Lines 1, 2, 6, and 9 converge beneath Dalou’s bronze monument.'
  },
  {
    id: 'porte-de-vincennes',
    name: 'Porte de Vincennes',
    lat: 48.8471,
    lon: 2.4110,
    openedYear: 1900,
    arrondissement: '12th / 20th Arr.',
    architecture: 'Historic 1900 Twin-Tunnel Terminal Loop',
    description:
      'Historic eastern terminus of Line 1 at its July 19, 1900 opening, until the suburban extension of 1934.'
  },
  {
    id: 'chateau-de-vincennes',
    name: 'Château de Vincennes',
    lat: 48.8445,
    lon: 2.4395,
    openedYear: 1934,
    arrondissement: 'Vincennes (Val-de-Marne)',
    architecture: 'Monumental Dual Parallel Terminal Station (1934)',
    landmark: 'Château de Vincennes Keep',
    description:
      'Opened on March 24, 1934 during the first wave of Metro extensions beyond the old city fortifications of Paris.'
  },

  // ==================== LINE 2 (1900 -> 1902 -> 1903) ====================
  {
    id: 'porte-dauphine',
    name: 'Porte Dauphine (Maréchal de Lattre de Tassigny)',
    lat: 48.8715,
    lon: 2.2768,
    openedYear: 1900,
    arrondissement: '16th Arr.',
    architecture: 'Original Glazed Guimard "Dragonfly" Pavilion (1900)',
    description:
      'Western terminus of Line 2 since December 1900. Home to Hector Guimard’s most famous surviving glass-roofed Art Nouveau entrance pavilion.'
  },
  {
    id: 'victor-hugo',
    name: 'Victor Hugo',
    lat: 48.8692,
    lon: 2.2852,
    openedYear: 1900,
    arrondissement: '16th Arr.',
    architecture: 'Curved 1900 Station Rebuilt on a Straight Alignment in 1931',
    description:
      'The original 1900 station, too sharply curved for longer Sprague-Thomson trains, remains visible right beside the current platforms.'
  },
  {
    id: 'ternes',
    name: 'Ternes',
    lat: 48.8782,
    lon: 2.2988,
    openedYear: 1902,
    arrondissement: '8th / 17th Arr.',
    architecture: 'CMP Vault Beneath Place des Ternes',
    description: 'Opened in October 1902 during the extension of Line 2 Nord toward Anvers.'
  },
  {
    id: 'villiers',
    name: 'Villiers',
    lat: 48.8812,
    lon: 2.3155,
    openedYear: 1902,
    arrondissement: '8th / 17th Arr.',
    architecture: 'Two Stacked Stations (Lines 2 & 3)',
    landmark: 'Parc Monceau',
    description:
      'Opened in 1902 on Line 2, becoming the original western terminus of Line 3 in 1904.'
  },
  {
    id: 'place-de-clichy',
    name: 'Place de Clichy',
    lat: 48.8836,
    lon: 2.3274,
    openedYear: 1902,
    arrondissement: '8th / 9th / 17th / 18th Arr.',
    architecture: 'Guimard Entrance & Nord-Sud Interchange (Line 13)',
    description:
      'Bustling crossroads at the foot of Montmartre Hill, linking Line 2 (1902) and the former Nord-Sud Line B (Line 13, 1911).'
  },
  {
    id: 'blanche',
    name: 'Blanche',
    lat: 48.8838,
    lon: 2.3328,
    openedYear: 1902,
    arrondissement: '9th / 18th Arr.',
    architecture: 'Guimard Entrance Facing the Moulin Rouge',
    landmark: 'Moulin Rouge',
    description: 'Opened in October 1902 on Boulevard de Clichy, directly in front of the illuminated sails of the Moulin Rouge.'
  },
  {
    id: 'pigalle',
    name: 'Pigalle',
    lat: 48.8824,
    lon: 2.3375,
    openedYear: 1902,
    arrondissement: '9th / 18th Arr.',
    architecture: 'Meeting of CMP (Line 2) & Nord-Sud (Line 12) Architectural Styles',
    description:
      'Inaugurated in 1902 on Line 2 and connected in 1911 to Line A of the rival Nord-Sud company.'
  },
  {
    id: 'anvers',
    name: 'Anvers (Sacré-Cœur)',
    lat: 48.8829,
    lon: 2.3442,
    openedYear: 1902,
    arrondissement: '9th / 18th Arr.',
    architecture: 'Direct Access to the Montmartre Funicular',
    landmark: 'Sacré-Cœur Basilica',
    description:
      'Gateway station to Montmartre Hill and the Sacré-Cœur Basilica since October 1902.'
  },
  {
    id: 'barbes-rochechouart',
    name: 'Barbès – Rochechouart',
    lat: 48.8836,
    lon: 2.3498,
    openedYear: 1903,
    elevated: true,
    arrondissement: '9th / 10th / 18th Arr.',
    architecture: 'Grand Elevated Steel Viaduct (Line 2) & Subterranean Vault (Line 4)',
    description:
      'Spectacular elevated viaduct station opened in March 1903, where Line 2 trains soar above the northern boulevards.'
  },
  {
    id: 'la-chapelle',
    name: 'La Chapelle',
    lat: 48.8844,
    lon: 2.3598,
    openedYear: 1903,
    elevated: true,
    arrondissement: '10th / 18th Arr.',
    architecture: 'Glass-Canopy Hall on Cast-Iron & Steel Viaduct',
    description:
      'Monumental elevated station spanning the rail corridors of Gare du Nord and Gare de l’Est.'
  },
  {
    id: 'stalingrad',
    name: 'Stalingrad',
    lat: 48.8837,
    lon: 2.3703,
    openedYear: 1903,
    elevated: true,
    arrondissement: '10th / 19th Arr.',
    architecture: 'Curved Viaduct Facing the Rotonde de la Villette',
    landmark: 'Rotonde de la Villette & Basin',
    description:
      'Opened in 1903 under the name Aubervilliers; the Line 2 viaduct sweeps in a majestic curve around Ledoux’s neoclassical rotunda.'
  },
  {
    id: 'jaures',
    name: 'Jaurès',
    lat: 48.8818,
    lon: 2.3742,
    openedYear: 1903,
    elevated: true,
    arrondissement: '10th / 19th Arr.',
    architecture: 'Elevated Station with Art Nouveau Stained-Glass Canopy (1903)',
    description:
      'Formerly Rue d’Allemagne station, renamed Jean Jaurès in August 1914. Elevated and subterranean interchange for Lines 2, 5, and 7bis.'
  },
  {
    id: 'belleville',
    name: 'Belleville',
    lat: 48.8721,
    lon: 2.3768,
    openedYear: 1903,
    arrondissement: '10th / 11th / 19th / 20th Arr.',
    architecture: 'Crossroads of Four Northeastern Arrondissements',
    description: 'Opened in January 1903 on Line 2 and connected to Line 11 in 1935.'
  },
  {
    id: 'pere-lachaise',
    name: 'Père Lachaise',
    lat: 48.8628,
    lon: 2.3868,
    openedYear: 1903,
    arrondissement: '11th / 20th Arr.',
    architecture: 'First Metro Station Equipped with Escalators (1909)',
    landmark: 'Père-Lachaise Cemetery',
    description:
      'Opened in 1903 (Line 2) and 1904 (Line 3), it became the very first station in the network fitted with an elevator and escalators in 1909.'
  },

  // ==================== LINE 3 & 3bis (1904 -> 1910 -> 1921 -> 1937 -> 1971) ====================
  {
    id: 'pont-de-levallois',
    name: 'Pont de Levallois – Bécon',
    lat: 48.8975,
    lon: 2.2808,
    openedYear: 1937,
    arrondissement: 'Levallois-Perret',
    architecture: 'Three-Track Art Deco Terminus (1937)',
    description: 'Northwestern terminus of Line 3 inaugurated in September 1937 alongside the Seine.'
  },
  {
    id: 'porte-de-champerret',
    name: 'Porte de Champerret',
    lat: 48.8862,
    lon: 2.2895,
    openedYear: 1911,
    arrondissement: '17th Arr.',
    architecture: 'Twin-Vault Four-Track Station (Former Terminus 1911–1937)',
    description: 'Terminus of Line 3 from February 1911 until the extension to Levallois in 1937.'
  },
  {
    id: 'pereire',
    name: 'Pereire (Maréchal Juin)',
    lat: 48.8848,
    lon: 2.2995,
    openedYear: 1910,
    arrondissement: '17th Arr.',
    architecture: 'CMP Vault Paralleling the Historic Auteuil Railway',
    description: 'Opened in May 1910 during the westward push of Line 3.'
  },
  {
    id: 'saint-lazare',
    name: 'Saint-Lazare',
    lat: 48.8756,
    lon: 2.3258,
    openedYear: 1904,
    arrondissement: '8th / 9th Arr.',
    architecture: 'Nord-Sud Subterranean Ceramic Rotunda & Glass Lens',
    landmark: 'Gare Saint-Lazare',
    description:
      'Second busiest station in Paris. Opened in October 1904 (Line 3), expanded with the famous Nord-Sud ceramic rotunda (Lines 12 & 13) in 1910, and joined by Line 14 in 2003.'
  },
  {
    id: 'havre-caumartin',
    name: 'Havre – Caumartin',
    lat: 48.8736,
    lon: 2.3282,
    openedYear: 1904,
    arrondissement: '9th Arr.',
    architecture: 'Direct Underground Access to the Haussmann Department Stores',
    landmark: 'Galeries Lafayette & Printemps',
    description:
      'Inaugurated in October 1904 in the heart of the Boulevard Haussmann department store district.'
  },
  {
    id: 'opera',
    name: 'Opéra',
    lat: 48.8706,
    lon: 2.3324,
    openedYear: 1904,
    arrondissement: '2nd / 9th Arr.',
    architecture: 'Triple-Stacked Reinforced Concrete Caisson (1903)',
    landmark: 'Palais Garnier (Paris Opera House)',
    description:
      'Engineering feat by Fulgence Bienvenüe: as early as 1903, a single three-level stacked caisson was sunk to house Lines 3 (1904), 7 (1910), and 8 (1913).'
  },
  {
    id: 'quatre-septembre',
    name: 'Quatre-Septembre',
    lat: 48.8695,
    lon: 2.3368,
    openedYear: 1904,
    arrondissement: '2nd Arr.',
    architecture: 'Original Line 3 Elliptical Vault',
    description: 'Opened on November 3, 1904, named after the proclamation of the Third Republic on September 4, 1870.'
  },
  {
    id: 'bourse',
    name: 'Bourse',
    lat: 48.8686,
    lon: 2.3414,
    openedYear: 1904,
    arrondissement: '2nd Arr.',
    architecture: 'Neoclassical Balustrades Integrated into Palais Brongniart',
    landmark: 'Palais Brongniart (Paris Stock Exchange)',
    description: 'Inaugurated in October 1904 directly beneath the Corinthian peristyle of the Paris Stock Exchange.'
  },
  {
    id: 'reaumur-sebastopol',
    name: 'Réaumur – Sébastopol',
    lat: 48.8664,
    lon: 2.3522,
    openedYear: 1904,
    arrondissement: '2nd / 3rd Arr.',
    architecture: 'Orthogonal Crossing of Lines 3 & 4',
    description:
      'Opened in 1904 under the name Rue Saint-Denis; connected to Line 4 in 1908.'
  },
  {
    id: 'arts-et-metiers',
    name: 'Arts et Métiers',
    lat: 48.8655,
    lon: 2.3562,
    openedYear: 1904,
    arrondissement: '3rd Arr.',
    architecture: 'Riveted Copper Nautilus Submarine Interior (François Schuiten, 1994)',
    landmark: 'Conservatoire National des Arts et Métiers',
    description:
      'Opened in 1904 (Line 3) and 1935 (Line 11). The Line 11 platforms are famous for their full cladding of riveted copper plates and Jules Verne portholes.'
  },
  {
    id: 'republique',
    name: 'République',
    lat: 48.8674,
    lon: 2.3636,
    openedYear: 1904,
    arrondissement: '3rd / 10th / 11th Arr.',
    architecture: 'Five-Line Underground Complex Beneath the Statue of Marianne',
    landmark: 'Place de la République',
    description:
      'Inaugurated in October 1904 with Line 3, République grew into a vast five-line nexus uniting Lines 3, 5 (1907), 8 (1931), 9 (1933), and 11 (1935).'
  },
  {
    id: 'parmentier',
    name: 'Parmentier',
    lat: 48.8652,
    lon: 2.3745,
    openedYear: 1904,
    arrondissement: '11th Arr.',
    architecture: 'Trellis-Work Decor & Statue of Antoine Parmentier',
    description: 'Opened in October 1904 with the commissioning of the first section of Line 3.'
  },
  {
    id: 'martin-nadaud',
    name: 'Martin Nadaud (Ghost Station)',
    lat: 48.8642,
    lon: 2.3942,
    openedYear: 1905,
    closedYear: 1969,
    isGhostStation: true,
    arrondissement: '20th Arr.',
    architecture: 'Ghost Station Integrated into the Gambetta Platforms in 1969',
    description:
      'GHOST STATION: Opened on January 25, 1905 on Line 3, closed on August 23, 1969 during the reconstruction of Gambetta and creation of Line 3bis. Its former platforms now form the western entrance concourse of Gambetta.'
  },
  {
    id: 'gambetta',
    name: 'Gambetta',
    lat: 48.8650,
    lon: 2.3985,
    openedYear: 1905,
    arrondissement: '20th Arr.',
    architecture: 'Historic Loop Reconfigured in 1969 (Line 3bis Split)',
    description:
      'Former terminus of Line 3 (1905), extensively rebuilt in 1969–1971 when Line 3bis was detached toward Porte des Lilas and Line 3 was extended to Gallieni.'
  },
  {
    id: 'gallieni',
    name: 'Gallieni (Parc de Bagnolet)',
    lat: 48.8632,
    lon: 2.4162,
    openedYear: 1971,
    arrondissement: 'Bagnolet (Seine-Saint-Denis)',
    architecture: '1970s Modernist Concrete Station',
    description: 'New eastern terminus of Line 3 commissioned on April 2, 1971.'
  },
  {
    id: 'porte-des-lilas',
    name: 'Porte des Lilas',
    lat: 48.8772,
    lon: 2.4068,
    openedYear: 1921,
    arrondissement: '19th / 20th Arr.',
    architecture: 'Twin Station + Unused "Cinema Station" Platform (1921)',
    description:
      'Opened in November 1921 as the terminus of Line 3 (becoming Line 3bis in 1971), joined by Line 11 in 1935. Also houses the famous "Station Cinéma" used as a film set.'
  },

  // ==================== LINE 4 (1908 -> 1910 Cross-Seine -> 2013 -> 2022) ====================
  {
    id: 'porte-de-clignancourt',
    name: 'Porte de Clignancourt',
    lat: 48.8975,
    lon: 2.3448,
    openedYear: 1908,
    arrondissement: '18th Arr.',
    architecture: 'Inaugural Northern Terminal Loop of Line 4 (1908)',
    description:
      'Historic northern terminus of Line 4 opened on April 21, 1908 at the gates of the famous Saint-Ouen Flea Market.'
  },
  {
    id: 'marcadet-poissonniers',
    name: 'Marcadet – Poissonniers',
    lat: 48.8915,
    lon: 2.3495,
    openedYear: 1908,
    arrondissement: '18th Arr.',
    architecture: 'CMP (Line 4) & Nord-Sud (Line 12) Interchange',
    description: 'Opened in 1908 (Line 4) and 1916 (Nord-Sud Line A), linked by a transfer corridor in 1931.'
  },
  {
    id: 'gare-du-nord',
    name: 'Gare du Nord',
    lat: 48.8809,
    lon: 2.3553,
    openedYear: 1907,
    arrondissement: '10th Arr.',
    architecture: 'Major Railway Interchange Station (Lines 4 & 5)',
    landmark: 'Gare du Nord',
    description:
      'Busiest station in the entire Metro network by passenger volume. Opened in 1907 (Line 5) and 1908 (Line 4) beneath Jacques Ignace Hittorff’s monumental facade.'
  },
  {
    id: 'gare-de-lest',
    name: "Gare de l'Est (Verdun)",
    lat: 48.8768,
    lon: 2.3593,
    openedYear: 1907,
    arrondissement: '10th Arr.',
    architecture: 'Shared Subterranean Hall for Lines 5 & 7 with Cross-Platform Interchange',
    landmark: "Gare de l'Est",
    description:
      'Beneath the forecourt of Gare de l’Est, Lines 5 (1907) and 7 (1910) share a single wide column-free vault directly above Line 4 (1908).'
  },
  {
    id: 'strasbourg-saint-denis',
    name: 'Strasbourg – Saint-Denis',
    lat: 48.8696,
    lon: 2.3545,
    openedYear: 1908,
    arrondissement: '2nd / 3rd / 10th Arr.',
    architecture: 'Crossroads Beneath Louis XIV’s Porte Saint-Denis Arch',
    landmark: 'Porte Saint-Denis',
    description: 'Opened in May 1908 (Line 4), joined by Lines 8 and 9 beneath the Grands Boulevards in 1931–1933.'
  },
  {
    id: 'les-halles',
    name: 'Les Halles',
    lat: 48.8622,
    lon: 2.3462,
    openedYear: 1908,
    arrondissement: '1st Arr.',
    architecture: 'Station Relocated in 1977 for the Creation of Forum des Halles',
    landmark: 'Canopée des Halles & Saint-Eustache Church',
    description:
      'Opened in April 1908 beneath Victor Baltard’s iron market pavilions ("The Belly of Paris"), rebuilt in 1977 to connect with the Châtelet–Les Halles RER hub.'
  },
  {
    id: 'cite',
    name: 'Cité',
    lat: 48.8552,
    lon: 2.3472,
    openedYear: 1910,
    arrondissement: '4th Arr. (Île de la Cité)',
    architecture: 'Vertical Metal Caisson 20m Below the Level of the Seine',
    landmark: 'Notre-Dame Cathedral & Sainte-Chapelle',
    description:
      'Engineering masterpiece inaugurated in January 1910 during Léon Chagnaud’s first sub-fluvial crossing of the Seine. Retro globe lamps illuminate its high cathedral-like vault.'
  },
  {
    id: 'saint-michel',
    name: 'Saint-Michel',
    lat: 48.8534,
    lon: 2.3442,
    openedYear: 1910,
    arrondissement: '5th / 6th Arr.',
    architecture: 'Elliptical Steel Caissons Sunk into Waterlogged Ground',
    landmark: 'Saint-Michel Fountain & Latin Quarter',
    description:
      'Like Cité, Saint-Michel was assembled at street level as three giant steel caissons and sunk 17 meters underground through the water table in 1910.'
  },
  {
    id: 'odeon',
    name: 'Odéon',
    lat: 48.8523,
    lon: 2.3388,
    openedYear: 1910,
    arrondissement: '6th Arr.',
    architecture: 'Left Bank Interchange (Lines 4 & 10)',
    description:
      'Opened in January 1910 on Boulevard Saint-Germain, joined by Line 10 in 1926.'
  },
  {
    id: 'saint-germain-des-pres',
    name: 'Saint-Germain-des-Prés',
    lat: 48.8538,
    lon: 2.3335,
    openedYear: 1910,
    arrondissement: '6th Arr.',
    architecture: 'Literary Light Projections at the Foot of the Millennial Abbey',
    landmark: 'Saint-Germain-des-Prés Abbey & Café de Flore',
    description: 'Inaugurated on January 9, 1910 with the historic North–South joining of Line 4 beneath the Seine.'
  },
  {
    id: 'montparnasse-bienvenue',
    name: 'Montparnasse – Bienvenüe',
    lat: 48.8432,
    lon: 2.3232,
    openedYear: 1906,
    arrondissement: '6th / 14th / 15th Arr.',
    architecture: 'Major Four-Line Hub Named in Tribute to Fulgence Bienvenüe',
    landmark: 'Montparnasse Tower',
    description:
      'Opened in 1906 (Line 6), 1910 (Lines 4 & 12), and 1937 (Line 13). Renamed in 1933 in honor of Fulgence Bienvenüe, "Father of the Paris Metro."'
  },
  {
    id: 'denfert-rochereau',
    name: 'Denfert-Rochereau (Colonel Rol-Tanguy)',
    lat: 48.8339,
    lon: 2.3324,
    openedYear: 1906,
    arrondissement: '14th Arr.',
    architecture: 'Vaults of Lines 4 (1909) & 6 (1906) Beneath the Lion of Belfort',
    landmark: 'Paris Catacombs & Lion of Belfort',
    description: 'Major crossroads of the 14th arrondissement, directly above the entrance to the Paris Catacombs.'
  },
  {
    id: 'porte-dorleans',
    name: "Porte d'Orléans (Général Leclerc)",
    lat: 48.8228,
    lon: 2.3258,
    openedYear: 1909,
    arrondissement: '14th Arr.',
    architecture: 'Former Southern Terminal Loop of Line 4 (1909–2013)',
    description:
      'Historic southern terminus of Line 4 for over a century (October 1909 – March 2013) prior to its extension into Montrouge and Bagneux.'
  },
  {
    id: 'mairie-de-montrouge',
    name: 'Mairie de Montrouge',
    lat: 48.8182,
    lon: 2.3195,
    openedYear: 2013,
    arrondissement: 'Montrouge (Hauts-de-Seine)',
    architecture: 'Luminous Contemporary RATP Architecture (2013)',
    description: 'First 21st-century extension of Line 4, inaugurated on March 23, 2013.'
  },
  {
    id: 'bagneux-lucie-aubrac',
    name: 'Bagneux – Lucie Aubrac',
    lat: 48.8035,
    lon: 2.3175,
    openedYear: 2022,
    arrondissement: 'Bagneux (Hauts-de-Seine)',
    architecture: 'Automated Southern Terminus & Grand Paris Express Interchange (Line 15)',
    description:
      'Inaugurated on January 13, 2022 alongside the full automation of Line 4, connected to the new Line 15 Sud of the Grand Paris Express.'
  },

  // ==================== LINE 5 (1906 -> 1907 -> 1942 -> 1985) ====================
  {
    id: 'bobigny-pablo-picasso',
    name: 'Bobigny – Pablo Picasso',
    lat: 48.9068,
    lon: 2.4495,
    openedYear: 1985,
    arrondissement: 'Bobigny (Seine-Saint-Denis)',
    architecture: 'Seine-Saint-Denis Departmental Terminus (1985)',
    description: 'Northeastern terminus of Line 5 commissioned on April 25, 1985.'
  },
  {
    id: 'eglise-de-pantin',
    name: 'Église de Pantin',
    lat: 48.8935,
    lon: 2.4128,
    openedYear: 1942,
    arrondissement: 'Pantin (Seine-Saint-Denis)',
    architecture: 'Clad Subterranean Vault Opened in October 1942',
    description: 'Terminus of Line 5 from 1942 to 1985 alongside the Canal de l’Ourcq.'
  },
  {
    id: 'porte-de-pantin',
    name: 'Porte de Pantin (Parc de la Villette)',
    lat: 48.8895,
    lon: 2.3928,
    openedYear: 1942,
    arrondissement: '19th Arr.',
    architecture: 'Three-Track Station Serving the Cité de la Musique',
    landmark: 'Philharmonie de Paris & Parc de la Villette',
    description: 'Opened in October 1942 at the gates of the former La Villette abattoirs, now a major cultural park and Philharmonie.'
  },
  {
    id: 'oberkampf',
    name: 'Oberkampf',
    lat: 48.8648,
    lon: 2.3685,
    openedYear: 1907,
    arrondissement: '11th Arr.',
    architecture: 'Interchange for Lines 5 (1907) & 9 (1933)',
    description: 'Located beneath Boulevard Voltaire in the heart of the 11th arrondissement.'
  },
  {
    id: 'richard-lenoir',
    name: 'Richard-Lenoir',
    lat: 48.8595,
    lon: 2.3722,
    openedYear: 1906,
    arrondissement: '11th Arr.',
    architecture: 'Vault Built Directly Above the Covered Canal Saint-Martin',
    description: 'Opened in December 1906 inside the vaulted roof structure covering the Canal Saint-Martin.'
  },
  {
    id: 'arsenal',
    name: 'Arsenal (Ghost Station)',
    lat: 48.8492,
    lon: 2.3665,
    openedYear: 1906,
    closedYear: 1939,
    isGhostStation: true,
    arrondissement: '4th Arr.',
    architecture: 'Ghost Station Closed on September 2, 1939',
    description:
      'GHOST STATION: Opened on December 17, 1906 between Bastille and Quai de la Rapée, closed on September 2, 1939 during the general mobilization of World War II and never reopened to the public.'
  },
  {
    id: 'quai-de-la-rapee',
    name: 'Quai de la Rapée',
    lat: 48.8462,
    lon: 2.3658,
    openedYear: 1906,
    elevated: true,
    arrondissement: '12th Arr.',
    architecture: 'Open-Cut Station with Helical Ramp Toward the Austerlitz Viaduct',
    description:
      'Opened in July 1906 as Pont d’Austerlitz. Trains emerge here and spiral up onto the 140-meter single-span steel arch of the Austerlitz Viaduct across the Seine.'
  },
  {
    id: 'gare-dausterlitz',
    name: "Gare d'Austerlitz",
    lat: 48.8422,
    lon: 2.3660,
    openedYear: 1906,
    elevated: true,
    arrondissement: '5th / 13th Arr.',
    architecture: 'Elevated Viaduct Passing Through the Great Glass Train Shed of Gare d’Austerlitz',
    landmark: 'Jardin des Plantes & Gare d’Austerlitz',
    description:
      'Spectacular 1906 architectural feat: Line 5 flies mid-air right through the iron-and-glass main hall of Gare d’Austerlitz before diving back underground.'
  },
  {
    id: 'saint-marcel',
    name: 'Saint-Marcel',
    lat: 48.8375,
    lon: 2.3605,
    openedYear: 1906,
    arrondissement: '13th Arr.',
    architecture: 'First Section of Line 5 (June 2, 1906)',
    description: 'Inaugurated on June 2, 1906 with the opening of the initial Place d’Italie – Gare d’Orléans section.'
  },
  {
    id: 'place-ditalie',
    name: "Place d'Italie",
    lat: 48.8315,
    lon: 2.3556,
    openedYear: 1906,
    arrondissement: '13th Arr.',
    architecture: 'Southern Triple Hub (Lines 5, 6 & 7) with Subterranean Loops',
    description:
      'Historic birthplace of Line 5 (June 1906), junction point with Line 6 (1909) and Line 7 (1930) beneath the grand circular plaza of the 13th arrondissement.'
  },

  // ==================== LINE 6 (1900 -> 1906 -> 1909 -> 1942 Viaduct Line) ====================
  {
    id: 'kleber',
    name: 'Kléber',
    lat: 48.8708,
    lon: 2.2932,
    openedYear: 1900,
    arrondissement: '16th Arr.',
    architecture: 'Four-Track Regulation Station',
    description: 'Opened on October 2, 1900 when the Étoile – Trocadéro branch entered service for the Universal Exposition.'
  },
  {
    id: 'trocadero',
    name: 'Trocadéro',
    lat: 48.8630,
    lon: 2.2872,
    openedYear: 1900,
    arrondissement: '16th Arr.',
    architecture: 'Panoramic Esplanade Facing the Eiffel Tower (Lines 6 & 9)',
    landmark: 'Palais de Chaillot & Eiffel Tower Viewpoint',
    description:
      'Inaugurated on October 2, 1900 to serve the Universal Exposition, joined in November 1922 by the inaugural section of Line 9.'
  },
  {
    id: 'passy',
    name: 'Passy',
    lat: 48.8576,
    lon: 2.2856,
    openedYear: 1903,
    elevated: true,
    arrondissement: '16th Arr.',
    architecture: 'Hillside Portal Emerging onto the Bir-Hakeim Viaduct',
    description:
      'Half-underground, half-elevated on the Passy hillside, projecting trains directly out over the Seine with a breathtaking view of the Eiffel Tower.'
  },
  {
    id: 'bir-hakeim',
    name: 'Bir-Hakeim (Tour Eiffel)',
    lat: 48.8539,
    lon: 2.2893,
    openedYear: 1906,
    elevated: true,
    arrondissement: '15th Arr.',
    architecture: 'Elevated Viaduct Station at the Foot of the Eiffel Tower',
    landmark: 'Eiffel Tower & Pont de Bir-Hakeim',
    description:
      'Opened in April 1906 under the name Grenelle. Arguably the most iconic elevated station in Paris, perched right off the Bir-Hakeim bridge viaduct facing the Eiffel Tower.'
  },
  {
    id: 'la-motte-picquet-grenelle',
    name: 'La Motte-Picquet – Grenelle',
    lat: 48.8492,
    lon: 2.2982,
    openedYear: 1906,
    elevated: true,
    arrondissement: '15th Arr.',
    architecture: 'Elevated (Line 6) & Subterranean Directional Cross-Platform Hub (Lines 8 & 10)',
    description:
      'Multimodal engineering gem combining the elevated viaduct of Line 6 (1906) with the interwoven underground platforms of Lines 8 (1913) and 10 (1937).'
  },
  {
    id: 'pasteur',
    name: 'Pasteur',
    lat: 48.8428,
    lon: 2.3125,
    openedYear: 1906,
    arrondissement: '15th Arr.',
    architecture: 'Meeting of CMP (Line 6) & Nord-Sud (Line 12) Styles',
    description: 'Opened in April 1906 on Line 2 Sud (now Line 6) and connected in November 1910 to Nord-Sud Line A.'
  },
  {
    id: 'raspail',
    name: 'Raspail',
    lat: 48.8412,
    lon: 2.3305,
    openedYear: 1906,
    arrondissement: '14th Arr.',
    architecture: 'Lines 4 & 6 Interchange Beneath Boulevard Raspail',
    description: 'Inaugurated in April 1906, joined by Line 4 in October 1909.'
  },
  {
    id: 'glaciere',
    name: 'Glacière',
    lat: 48.8312,
    lon: 2.3432,
    openedYear: 1906,
    elevated: true,
    arrondissement: '13th Arr.',
    architecture: 'Boulevard Auguste-Blanqui Elevated Viaduct',
    description: 'Elevated station supported by a steel truss viaduct and sculpted cast-iron pillars, opened in April 1906.'
  },
  {
    id: 'nationale',
    name: 'Nationale',
    lat: 48.8332,
    lon: 2.3625,
    openedYear: 1909,
    elevated: true,
    arrondissement: '13th Arr.',
    architecture: 'Boulevard Vincent-Auriol Elevated Viaduct',
    description: 'Inaugurated on March 1, 1909 with the opening of the original Line 6 between Place d’Italie and Nation.'
  },
  {
    id: 'bercy',
    name: 'Bercy',
    lat: 48.8402,
    lon: 2.3792,
    openedYear: 1909,
    arrondissement: '12th Arr.',
    architecture: 'Line 6 (1909) & Automated Line 14 (1998) Interchange',
    landmark: 'Accor Arena & Parc de Bercy',
    description:
      'Located at the eastern approach to the Pont de Bercy metro viaduct across the Seine, linked to Line 14 in 1998.'
  },
  {
    id: 'picpus',
    name: 'Picpus (Courteline)',
    lat: 48.8452,
    lon: 2.4005,
    openedYear: 1909,
    arrondissement: '12th Arr.',
    architecture: 'Curved Station Preceding the Nation Loop',
    description: 'Opened in March 1909 under the name Saint-Mandé.'
  },

  // ==================== LINE 7 & 7bis (1910 -> 1911 -> 1930 -> 1946 -> 1967 -> 1985 -> 1987) ====================
  {
    id: 'la-courneuve',
    name: 'La Courneuve – 8 Mai 1945',
    lat: 48.9205,
    lon: 2.4102,
    openedYear: 1987,
    arrondissement: 'La Courneuve (Seine-Saint-Denis)',
    architecture: 'Monumental Sunrise Mural (1987)',
    description: 'Northeastern terminus of Line 7 inaugurated on May 6, 1987.'
  },
  {
    id: 'porte-de-la-villette',
    name: 'Porte de la Villette (Cité des Sciences)',
    lat: 48.8968,
    lon: 2.3852,
    openedYear: 1910,
    arrondissement: '19th Arr.',
    architecture: 'Former Four-Track Terminus Beneath the Cité des Sciences',
    landmark: 'Cité des Sciences et de l’Industrie & La Géode',
    description:
      'Original northern terminus of Line 7 upon its opening on November 5, 1910, at the foot of La Géode and Parc de la Villette.'
  },
  {
    id: 'louis-blanc',
    name: 'Louis Blanc',
    lat: 48.8812,
    lon: 2.3652,
    openedYear: 1910,
    arrondissement: '10th Arr.',
    architecture: 'Two-Level Split Station (Origin of Line 7bis in 1967)',
    description:
      'Opened in November 1910. In December 1967, the Louis Blanc – Pré-Saint-Gervais branch was isolated to form independent Line 7bis.'
  },
  {
    id: 'buttes-chaumont',
    name: 'Buttes Chaumont',
    lat: 48.8785,
    lon: 2.3815,
    openedYear: 1912,
    arrondissement: '19th Arr.',
    architecture: 'Deep Twin Tubes Beneath the Gypsum Hill',
    landmark: 'Parc des Buttes-Chaumont',
    description:
      'Because of the historic gypsum quarries beneath Parc des Buttes-Chaumont, the station was built in two separate deep tunnels supported on subterranean pilings.'
  },
  {
    id: 'pre-saint-gervais',
    name: 'Pré-Saint-Gervais',
    lat: 48.8802,
    lon: 2.3988,
    openedYear: 1911,
    arrondissement: '19th Arr.',
    architecture: 'Line 7bis Terminal Loop & Shuttle Track Toward Porte des Lilas',
    description: 'Opened in January 1911 as a branch of Line 7, becoming the terminal loop of Line 7bis in 1967.'
  },
  {
    id: 'chaussee-dantin',
    name: "Chaussée d'Antin – La Fayette",
    lat: 48.8724,
    lon: 2.3358,
    openedYear: 1910,
    arrondissement: '9th Arr.',
    architecture: 'Baroque Bicentennial Ceiling Mural (1989)',
    description: 'Inaugurated on November 5, 1910 on Line 7, joined by Line 9 in June 1923.'
  },
  {
    id: 'pyramides',
    name: 'Pyramides',
    lat: 48.8665,
    lon: 2.3340,
    openedYear: 1916,
    arrondissement: '1st Arr.',
    architecture: 'Luminous Glass Skylight on Line 14 & Line 7 Vault',
    description: 'Opened in July 1916 during the wartime extension of Line 7 from Opéra to Palais Royal; connected to Line 14 in 1998.'
  },
  {
    id: 'pont-neuf',
    name: 'Pont Neuf (La Monnaie)',
    lat: 48.8586,
    lon: 2.3422,
    openedYear: 1926,
    arrondissement: '1st Arr.',
    architecture: 'Giant Coin Reliefs & Historic Minting Press Display',
    landmark: 'Pont Neuf',
    description: 'Opened in April 1926 facing the oldest standing stone bridge in Paris and the Paris Mint.'
  },
  {
    id: 'sully-morland',
    name: 'Sully – Morland',
    lat: 48.8512,
    lon: 2.3612,
    openedYear: 1930,
    arrondissement: '4th Arr.',
    architecture: 'Line 7 Tubular Tunnel Dive Beneath the Seine (1930)',
    description:
      'Inaugurated on June 3, 1930 at the northern portal of the sub-fluvial tunnel crossing beneath the Seine toward Jussieu and Place Monge.'
  },
  {
    id: 'jussieu',
    name: 'Jussieu',
    lat: 48.8460,
    lon: 2.3548,
    openedYear: 1931,
    arrondissement: '5th Arr.',
    architecture: 'Side-by-Side Twin Stations (Lines 7 & 10) Inaugurated the Same Day',
    landmark: 'Arènes de Lutèce & Jussieu Campus',
    description:
      'Unique historical milestone: the Jussieu stations of Lines 7 and 10 were built side by side and inaugurated simultaneously on April 26, 1931.'
  },
  {
    id: 'place-monge',
    name: 'Place Monge (Jardin des Plantes)',
    lat: 48.8428,
    lon: 2.3522,
    openedYear: 1930,
    arrondissement: '5th Arr.',
    architecture: 'Opened in 1930 on Line 10, Transferred to Line 7 in 1931',
    description:
      'Initially operated for one year by Line 10 while engineers completed Line 7’s under-river tunnel beneath the Seine in April 1931.'
  },
  {
    id: 'porte-divry',
    name: "Porte d'Ivry",
    lat: 48.8195,
    lon: 2.3698,
    openedYear: 1931,
    arrondissement: '13th Arr.',
    architecture: 'Former Southern Terminus of Line 7 (1931–1946)',
    description: 'Opened in April 1931 when the southern Left Bank section was integrated into Line 7.'
  },
  {
    id: 'mairie-divry',
    name: "Mairie d'Ivry",
    lat: 48.8112,
    lon: 2.3842,
    openedYear: 1946,
    arrondissement: 'Ivry-sur-Seine (Val-de-Marne)',
    architecture: 'Post-War Suburban Terminus Inaugurated May 1, 1946',
    description: 'Terminus of the southeastern branch of Line 7 since May 1946.'
  },
  {
    id: 'maison-blanche',
    name: 'Maison Blanche',
    lat: 48.8225,
    lon: 2.3585,
    openedYear: 1930,
    arrondissement: '13th Arr.',
    architecture: 'Junction of the Ivry & Villejuif Branches & Line 14 Interchange (2024)',
    description:
      'Opened in 1930, becoming the southern bifurcation point of Line 7 in 1982 and a major interchange with the Line 14 southern extension in June 2024.'
  },
  {
    id: 'villejuif-louis-aragon',
    name: 'Villejuif – Louis Aragon',
    lat: 48.7875,
    lon: 2.3672,
    openedYear: 1985,
    arrondissement: 'Villejuif (Val-de-Marne)',
    architecture: 'Southern Terminus of the Villejuif Branch & Line 15 Interchange (2025/2026)',
    description: 'Commissioned in February 1985, now linked to Line 15 Sud of the Grand Paris Express.'
  },

  // ==================== LINE 8 (1913 -> 1928 -> 1931 -> 1937 -> 1974 -> 2011) ====================
  {
    id: 'balard',
    name: 'Balard',
    lat: 48.8362,
    lon: 2.2785,
    openedYear: 1937,
    arrondissement: '15th Arr.',
    architecture: 'Art Deco Southwestern Terminus (1937)',
    description:
      'Commissioned on July 27, 1937 during the grand realignment of Lines 8, 10, and 14 across southwestern Paris.'
  },
  {
    id: 'commerce',
    name: 'Commerce',
    lat: 48.8448,
    lon: 2.2935,
    openedYear: 1937,
    arrondissement: '15th Arr.',
    architecture: 'Offset Split Platforms Beneath a Narrow Shopping Street',
    description:
      'Because Rue du Commerce was too narrow to fit two platforms side by side, the station’s two platforms were built staggered end to end.'
  },
  {
    id: 'champ-de-mars-ghost',
    name: 'Champ de Mars (Ghost Station)',
    lat: 48.8525,
    lon: 2.3018,
    openedYear: 1913,
    closedYear: 1939,
    isGhostStation: true,
    arrondissement: '7th Arr.',
    architecture: 'Line 8 Ghost Station Closed in September 1939',
    description:
      'GHOST STATION: Opened on July 13, 1913 on the inaugural section of Line 8 between La Motte-Picquet and École Militaire. Closed on September 2, 1939 due to its close proximity to neighboring stations.'
  },
  {
    id: 'ecole-militaire',
    name: 'École Militaire',
    lat: 48.8552,
    lon: 2.3065,
    openedYear: 1913,
    arrondissement: '7th Arr.',
    architecture: 'Inaugural Section of Line 8 (July 1913)',
    landmark: 'Champ de Mars & École Militaire',
    description: 'Inaugurated on July 13, 1913 at the southeastern end of the Champ de Mars.'
  },
  {
    id: 'invalides',
    name: 'Invalides',
    lat: 48.8612,
    lon: 2.3142,
    openedYear: 1913,
    arrondissement: '7th Arr.',
    architecture: 'Subterranean Junction Beneath Esplanade des Invalides (Lines 8 & 13)',
    landmark: 'Hôtel des Invalides & Golden Dome',
    description:
      'Opened in July 1913 on Line 8, expanded with an underground terminal loop in 1923 for Line 10, and linked across the Seine by Line 13 in 1976.'
  },
  {
    id: 'madeleine',
    name: 'Madeleine',
    lat: 48.8700,
    lon: 2.3243,
    openedYear: 1910,
    arrondissement: '8th Arr.',
    architecture: 'Nord-Sud Style (1910), Grands Boulevards Vault (1913) & Météor Glass Cathedral (1998)',
    landmark: 'La Madeleine Church',
    description:
      'Prestigious hub uniting three generations of Metro design: Nord-Sud Line A (Line 12, 1910), Line 8 (1913), and the inaugural terminus of automated Line 14 (1998).'
  },
  {
    id: 'richelieu-drouot',
    name: 'Richelieu – Drouot',
    lat: 48.8719,
    lon: 2.3402,
    openedYear: 1928,
    arrondissement: '2nd / 9th Arr.',
    architecture: 'CMP Black Marble Art Deco War Memorial (Carlo Sarrabezolles, 1931)',
    description:
      'Western gateway of the famous four-track stacked trunk shared by Lines 8 and 9 beneath the Grands Boulevards, inaugurated on June 30, 1928.'
  },
  {
    id: 'bonne-nouvelle',
    name: 'Bonne Nouvelle',
    lat: 48.8705,
    lon: 2.3484,
    openedYear: 1931,
    arrondissement: '2nd / 9th / 10th Arr.',
    architecture: 'Hollywood-Style Monumental Lettering for the Centenary of Cinema',
    description: 'Inaugurated on May 5, 1931 for the Colonial Exposition on Lines 8 (1931) and 9 (1933).'
  },
  {
    id: 'saint-martin-ghost',
    name: 'Saint-Martin (Ghost Station)',
    lat: 48.8688,
    lon: 2.3578,
    openedYear: 1931,
    closedYear: 1939,
    isGhostStation: true,
    arrondissement: '3rd / 10th Arr.',
    architecture: 'Grand Two-Level Ghost Station (Lines 8 & 9)',
    description:
      'GHOST STATION: The largest ghost station in Paris, opened in 1931 (Line 8) and 1933 (Line 9) beneath Porte Saint-Martin. Closed in September 1939 because it stood barely 100 meters from Strasbourg–Saint-Denis.'
  },
  {
    id: 'daumesnil',
    name: 'Daumesnil (Félix Éboué)',
    lat: 48.8396,
    lon: 2.3958,
    openedYear: 1909,
    arrondissement: '12th Arr.',
    architecture: 'Lines 6 (1909) & 8 (1931) Interchange',
    description: 'Opened in 1909 on Line 6 and joined in May 1931 by Line 8 on its way to the Colonial Exposition.'
  },
  {
    id: 'porte-de-charenton',
    name: 'Porte de Charenton',
    lat: 48.8325,
    lon: 2.4025,
    openedYear: 1931,
    arrondissement: '12th Arr.',
    architecture: 'Monumental Four-Track Station for the 1931 Colonial Exposition',
    landmark: 'Bois de Vincennes & Palais de la Porte Dorée',
    description: 'Built with four tracks and dual island platforms to handle the massive crowds visiting the May 1931 Colonial Exposition.'
  },
  {
    id: 'creteil-prefecture',
    name: 'Créteil – Préfecture',
    lat: 48.7798,
    lon: 2.4592,
    openedYear: 1974,
    elevated: true,
    arrondissement: 'Créteil (Val-de-Marne)',
    architecture: '1970s New-Town Surface Station',
    description: 'Southeastern terminus of Line 8 from September 1974 to October 2011.'
  },
  {
    id: 'pointe-du-lac',
    name: 'Pointe du Lac',
    lat: 48.7688,
    lon: 2.4645,
    openedYear: 2011,
    elevated: true,
    arrondissement: 'Créteil (Val-de-Marne)',
    architecture: 'Contemporary Glass & Steel Surface Terminus (2011)',
    description: 'Current southeastern terminus of Line 8 inaugurated on October 8, 2011, making Line 8 one of the longest lines in the network.'
  },

  // ==================== LINE 9 (1922 -> 1923 -> 1928 -> 1933 -> 1934 -> 1937) ====================
  {
    id: 'pont-de-sevres',
    name: 'Pont de Sèvres',
    lat: 48.8295,
    lon: 2.2305,
    openedYear: 1934,
    arrondissement: 'Boulogne-Billancourt',
    architecture: 'First Historic Suburban Metro Extension (February 3, 1934)',
    description:
      'Historic milestone: on February 3, 1934, Pont de Sèvres became the very first Paris Metro station built outside the municipal boundaries of Paris, now a major hub for Line 15 Sud.'
  },
  {
    id: 'porte-de-saint-cloud',
    name: 'Porte de Saint-Cloud',
    lat: 48.8380,
    lon: 2.2568,
    openedYear: 1923,
    arrondissement: '16th Arr.',
    architecture: 'Former Five-Track Terminus (1923–1934)',
    landmark: 'Parc des Princes',
    description: 'Terminus of Line 9 from September 1923 until the line crossed the city boundary into Boulogne in 1934.'
  },
  {
    id: 'exelmans',
    name: 'Exelmans',
    lat: 48.8428,
    lon: 2.2635,
    openedYear: 1922,
    arrondissement: '16th Arr.',
    architecture: 'Original Terminus of the Inaugural Section of Line 9 (November 8, 1922)',
    description:
      'On November 8, 1922, the very first section of Line 9 entered service between Exelmans and Trocadéro.'
  },
  {
    id: 'miromesnil',
    name: 'Miromesnil',
    lat: 48.8752,
    lon: 2.3112,
    openedYear: 1923,
    arrondissement: '8th Arr.',
    architecture: 'First Station Fitted with Experimental Platform Screen Doors (Line 13, 1973)',
    landmark: 'Élysée Palace',
    description: 'Opened in May 1923 on Line 9, joined by Line 13 in 1973 during its North–South connection across the Right Bank.'
  },
  {
    id: 'saint-augustin',
    name: 'Saint-Augustin',
    lat: 48.8752,
    lon: 2.3195,
    openedYear: 1923,
    arrondissement: '8th Arr.',
    architecture: 'Widened Line 9 Vault Linked to Saint-Lazare (Line 14)',
    description: 'Inaugurated in May 1923 facing Victor Baltard’s iron-framed Church of Saint-Augustin.'
  },
  {
    id: 'charonne',
    name: 'Charonne',
    lat: 48.8568,
    lon: 2.3808,
    openedYear: 1933,
    arrondissement: '11th Arr.',
    architecture: 'CMP Vault Beneath Boulevard Voltaire (1933)',
    description: 'Opened on December 10, 1933 during the eastern extension of Line 9 to Porte de Montreuil.'
  },
  {
    id: 'porte-de-montreuil',
    name: 'Porte de Montreuil',
    lat: 48.8538,
    lon: 2.4112,
    openedYear: 1933,
    arrondissement: '20th Arr.',
    architecture: 'Widest Subterranean Vault in the Paris Metro (22.5m Span, 4 Tracks)',
    description:
      'Architectural record: its single 22.5-meter clear-span masonry arch overarching four tracks is the widest vault in the historic Metro network.'
  },
  {
    id: 'mairie-de-montreuil',
    name: 'Mairie de Montreuil',
    lat: 48.8622,
    lon: 2.4412,
    openedYear: 1937,
    arrondissement: 'Montreuil (Seine-Saint-Denis)',
    architecture: 'Sèvres Ceramic Map Frescoes in Art Deco Corridors (1937)',
    description: 'Eastern terminus of Line 9 inaugurated on October 14, 1937.'
  },

  // ==================== LINE 10 (1913 -> 1923 -> 1937 -> 1981) ====================
  {
    id: 'boulogne-pont-de-saint-cloud',
    name: 'Boulogne – Pont de Saint-Cloud',
    lat: 48.8408,
    lon: 2.2285,
    openedYear: 1981,
    arrondissement: 'Boulogne-Billancourt',
    architecture: 'Central Island Platform by the Banks of the Seine (1981)',
    description: 'Western terminus of Line 10 opened on October 2, 1981 opposite the Domaine National de Saint-Cloud.'
  },
  {
    id: 'porte-dauteuil',
    name: "Porte d'Auteuil",
    lat: 48.8482,
    lon: 2.2598,
    openedYear: 1913,
    arrondissement: '16th Arr.',
    architecture: 'Auteuil Loop Station (Opened 1913 on Line 8, Transferred to Line 10 in 1937)',
    landmark: 'Roland-Garros Stadium & Serres d’Auteuil',
    description: 'Built in 1913 for Line 8, transferred to Line 10 during the July 1937 Left Bank network realignment.'
  },
  {
    id: 'eglise-dauteuil',
    name: "Église d'Auteuil",
    lat: 48.8475,
    lon: 2.2692,
    openedYear: 1913,
    arrondissement: '16th Arr.',
    architecture: 'Unidirectional Half-Station on the Auteuil Loop',
    description: 'Quietest station in the Paris network, opened in September 1913 along the one-way Auteuil loop.'
  },
  {
    id: 'duroc',
    name: 'Duroc',
    lat: 48.8471,
    lon: 2.3162,
    openedYear: 1923,
    arrondissement: '6th / 7th / 15th Arr.',
    architecture: 'Crossroads of Lines 10 (1923) & 13 (1937)',
    description: 'Inaugurated on December 30, 1923 with the opening of the very first section of Line 10.'
  },
  {
    id: 'sevres-babylone',
    name: 'Sèvres – Babylone',
    lat: 48.8515,
    lon: 2.3272,
    openedYear: 1910,
    arrondissement: '6th / 7th Arr.',
    architecture: 'Meeting of Nord-Sud (Line 12, 1910) & CMP (Line 10, 1923)',
    landmark: 'Le Bon Marché & Hôtel Lutetia',
    description:
      'Beneath the oldest department store in Paris (Le Bon Marché), connecting Nord-Sud Line A with Line 10.'
  },
  {
    id: 'croix-rouge-ghost',
    name: 'Croix-Rouge (Ghost Station)',
    lat: 48.8520,
    lon: 2.3328,
    openedYear: 1923,
    closedYear: 1939,
    isGhostStation: true,
    arrondissement: '6th Arr.',
    architecture: 'Inaugural Historic Terminus of Line 10 (1923), Closed in 1939',
    description:
      'GHOST STATION: Original eastern terminus of Line 10 at its inauguration on December 30, 1923! Closed on September 2, 1939 at the outbreak of World War II and never reopened.'
  },
  {
    id: 'cluny-la-sorbonne',
    name: 'Cluny – La Sorbonne',
    lat: 48.8512,
    lon: 2.3448,
    openedYear: 1930,
    arrondissement: '5th Arr.',
    architecture: 'Jean Bazaine Ceiling Mosaics & Signatures of Illustrious Writers',
    landmark: 'Sorbonne University & Musée de Cluny',
    description:
      'Opened in February 1930, closed in 1939 as a ghost station for nearly 50 years, then dramatically reopened in December 1988 to connect with RER Lines B and C!'
  },
  {
    id: 'cardinal-lemoine',
    name: 'Cardinal Lemoine',
    lat: 48.8478,
    lon: 2.3515,
    openedYear: 1931,
    arrondissement: '5th Arr.',
    architecture: 'Vault at the Foot of Montagne Sainte-Geneviève',
    landmark: 'Panthéon',
    description: 'Inaugurated in April 1931 during the reorganization of Lines 7 and 10 across the Left Bank.'
  },

  // ==================== LINE 11 (1935 -> 1937 -> 2024 Extension) ====================
  {
    id: 'rambuteau',
    name: 'Rambuteau (Centre Pompidou)',
    lat: 48.8615,
    lon: 2.3538,
    openedYear: 1935,
    arrondissement: '3rd / 4th Arr.',
    architecture: '1935 CMP Vault Serving the Beaubourg Plateau',
    landmark: 'Centre Georges-Pompidou',
    description:
      'Inaugurated on April 28, 1935 with Line 11; since 1977 the primary gateway to Renzo Piano and Richard Rogers’s Centre Pompidou.'
  },
  {
    id: 'pyrénées',
    name: 'Pyrénées',
    lat: 48.8738,
    lon: 2.3852,
    openedYear: 1935,
    arrondissement: '19th / 20th Arr.',
    architecture: 'Deep Tube Station Beneath Belleville Hill (1935)',
    description: 'Built at great depth in 1935 to climb the steep gradient of Belleville Hill.'
  },
  {
    id: 'place-des-fetes',
    name: 'Place des Fêtes',
    lat: 48.8768,
    lon: 2.3932,
    openedYear: 1911,
    arrondissement: '19th Arr.',
    architecture: 'Deep Air-Raid Shelter Station (1935) & Line 7bis Loop (1911)',
    description:
      'When Line 11 opened in 1935, Place des Fêtes was built with airtight blast doors to serve as a deep civil defense air-raid and gas shelter.'
  },
  {
    id: 'mairie-des-lilas',
    name: 'Mairie des Lilas',
    lat: 48.8798,
    lon: 2.4165,
    openedYear: 1937,
    arrondissement: 'Les Lilas (Seine-Saint-Denis)',
    architecture: 'Former Terminus of Line 11 from 1937 to June 2024',
    description: 'Historic eastern terminus of Line 11 for 87 years, from October 1937 until the major eastward extension of June 2024.'
  },
  {
    id: 'romainville-carnot',
    name: 'Romainville – Carnot',
    lat: 48.8832,
    lon: 2.4355,
    openedYear: 2024,
    arrondissement: 'Romainville / Noisy-le-Sec',
    architecture: 'Contemporary Architecture of the 2024 Extension',
    description: 'Inaugurated on June 13, 2024 during the eastern extension of Line 11 across Seine-Saint-Denis.'
  },
  {
    id: 'coteaux-beauclair',
    name: 'Coteaux Beauclair',
    lat: 48.8805,
    lon: 2.4565,
    openedYear: 2024,
    elevated: true,
    arrondissement: 'Rosny-sous-Bois / Noisy-le-Sec',
    architecture: 'New 600-Meter Elevated Viaduct Station (Inaugurated June 2024)',
    description:
      'First elevated viaduct Metro station built in Île-de-France in over a century, inaugurated on June 13, 2024.'
  },
  {
    id: 'rosny-bois-perrier',
    name: 'Rosny – Bois-Perrier',
    lat: 48.8818,
    lon: 2.4785,
    openedYear: 2024,
    arrondissement: 'Rosny-sous-Bois (Seine-Saint-Denis)',
    architecture: 'New Eastern Terminus of Line 11 (June 13, 2024)',
    description:
      'Inaugurated on June 13, 2024 just ahead of the Paris Olympic Games, nearly doubling the historic length of Line 11.'
  },

  // ==================== LINE 12 (Nord-Sud Line A: 1910 -> 1911 -> 1916 -> 1934 -> 2012 -> 2022) ====================
  {
    id: 'mairie-daubervilliers',
    name: "Mairie d'Aubervilliers",
    lat: 48.9142,
    lon: 2.3822,
    openedYear: 2022,
    arrondissement: 'Aubervilliers (Seine-Saint-Denis)',
    architecture: 'New Northern Terminus of Line 12 (May 31, 2022)',
    description:
      'Inaugurated on May 31, 2022 in the heart of Aubervilliers, future interchange with Line 15 of the Grand Paris Express.'
  },
  {
    id: 'front-populaire',
    name: 'Front Populaire',
    lat: 48.9065,
    lon: 2.3658,
    openedYear: 2012,
    arrondissement: 'Saint-Denis / Aubervilliers',
    architecture: 'Glass Skylight Atrium Station (December 2012)',
    description: 'Opened in December 2012 at the center of the Plaine Saint-Denis urban regeneration district.'
  },
  {
    id: 'porte-de-la-chapelle',
    name: 'Porte de la Chapelle',
    lat: 48.8975,
    lon: 2.3590,
    openedYear: 1916,
    arrondissement: '18th Arr.',
    architecture: 'Nord-Sud Terminus from 1916 to 2012 & Paris 2024 Arena Gateway',
    description:
      'Completed in the middle of World War I (August 1916) by the Nord-Sud company; today serves the Adidas Arena.'
  },
  {
    id: 'jules-joffrin',
    name: 'Jules Joffrin',
    lat: 48.8922,
    lon: 2.3445,
    openedYear: 1912,
    arrondissement: '18th Arr.',
    architecture: 'Polychrome Nord-Sud Ceramic Tilework on the North Slope of Montmartre',
    description: 'Opened in October 1912 by the Nord-Sud company beneath the 18th Arrondissement Town Hall.'
  },
  {
    id: 'abbesses',
    name: 'Abbesses (Butte Montmartre)',
    lat: 48.8844,
    lon: 2.3385,
    openedYear: 1912,
    arrondissement: '18th Arr.',
    architecture: 'Deepest Station in Paris (-36m) with Spiral Staircases & Guimard Pavilion',
    landmark: 'Butte Montmartre & Wall of Love',
    description:
      'Buried 36 meters beneath Montmartre Hill, Abbesses is the deepest station in the historic network. Its fresco-lined spiral staircases lead up to an authentic Guimard Art Nouveau entrance.'
  },
  {
    id: 'notre-dame-de-lorette',
    name: 'Notre-Dame-de-Lorette',
    lat: 48.8762,
    lon: 2.3388,
    openedYear: 1910,
    arrondissement: '9th Arr.',
    architecture: 'Inaugural Northern Terminus of Nord-Sud Line A (November 5, 1910)',
    description:
      'On November 5, 1910, the rival Nord-Sud company inaugurated its Line A between Porte de Versailles and Notre-Dame-de-Lorette with signature green-and-honey ceramic friezes.'
  },
  {
    id: 'assemblee-nationale',
    name: 'Assemblée Nationale',
    lat: 48.8608,
    lon: 2.3208,
    openedYear: 1910,
    arrondissement: '7th Arr.',
    architecture: 'Contemporary Parliamentary Silhouette Murals & Under-River Tube Portal',
    landmark: 'Palais Bourbon (National Assembly)',
    description:
      'Opened in November 1910 as Chambre des Députés, right at the southern exit of Jean-Baptiste Berlier’s cast-steel tunnel beneath the Seine.'
  },
  {
    id: 'solferino',
    name: 'Solférino (Musée d’Orsay)',
    lat: 48.8582,
    lon: 2.3232,
    openedYear: 1910,
    arrondissement: '7th Arr.',
    architecture: 'Station Preserved Intact in Its Original 1910 Nord-Sud Decor',
    landmark: 'Musée d’Orsay',
    description:
      'Listed heritage gem: Solférino preserves its original 1910 "N.S." ceramic monograms, direction tympanums, and oversized earthenware station signage.'
  },
  {
    id: 'porte-de-versailles',
    name: 'Porte de Versailles (Parc des Expositions)',
    lat: 48.8322,
    lon: 2.2878,
    openedYear: 1910,
    arrondissement: '15th Arr.',
    architecture: 'Original Southern Terminus of Nord-Sud Line A (1910)',
    description: 'Southern terminus of Line 12 from November 1910 until the extension to Mairie d’Issy in 1934.'
  },
  {
    id: 'mairie-dissy',
    name: "Mairie d'Issy",
    lat: 48.8242,
    lon: 2.2735,
    openedYear: 1934,
    arrondissement: 'Issy-les-Moulineaux',
    architecture: 'Nord-Sud Ceramic Tilework Extended by the CMP in March 1934',
    description:
      'Architectural curiosity: although opened in 1934 after the CMP absorbed the Nord-Sud company, the station was tiled using leftover stocks of Nord-Sud ceramics!'
  },

  // ==================== LINE 13 (Nord-Sud Line B 1911 + Old Line 14 1937 -> Merged 1976 -> 1998 -> 2008) ====================
  {
    id: 'saint-denis-universite',
    name: 'Saint-Denis – Université',
    lat: 48.9455,
    lon: 2.3635,
    openedYear: 1998,
    arrondissement: 'Saint-Denis (Seine-Saint-Denis)',
    architecture: 'Glass & Brick Surface Hall (May 1998)',
    landmark: 'Basilica Cathedral of Saint-Denis',
    description: 'Terminus of the northeastern branch of Line 13 inaugurated in May 1998 just before the 1998 FIFA World Cup.'
  },
  {
    id: 'saint-denis-porte-de-paris',
    name: 'Saint-Denis – Porte de Paris (Stade de France)',
    lat: 48.9298,
    lon: 2.3575,
    openedYear: 1976,
    arrondissement: 'Saint-Denis',
    architecture: 'Modernist Coffered Flat Ceiling Serving the Stade de France',
    landmark: 'Stade de France',
    description: 'Opened in May 1976 during the extension of Line 13 into the historic center of Saint-Denis.'
  },
  {
    id: 'mairie-de-saint-ouen',
    name: 'Mairie de Saint-Ouen',
    lat: 48.9118,
    lon: 2.3338,
    openedYear: 1952,
    arrondissement: 'Saint-Ouen-sur-Seine',
    architecture: 'Major Northern Interchange Hub (Line 13 in 1952 & Line 14 in 2020)',
    description:
      'Opened in June 1952 on Line 13; transformed in December 2020 into a major relief hub with the arrival of automated Line 14.'
  },
  {
    id: 'porte-de-saint-ouen',
    name: 'Porte de Saint-Ouen',
    lat: 48.8962,
    lon: 2.3285,
    openedYear: 1911,
    arrondissement: '17th / 18th Arr.',
    architecture: 'Inaugural Terminus of Nord-Sud Line B (February 26, 1911)',
    description: 'On February 26, 1911, the Nord-Sud company opened its Line B between Saint-Lazare and Porte de Saint-Ouen.'
  },
  {
    id: 'la-fourche',
    name: 'La Fourche',
    lat: 48.8872,
    lon: 2.3262,
    openedYear: 1911,
    arrondissement: '17th / 18th Arr.',
    architecture: 'Two-Level Stacked Bifurcation of Line 13 (1911–1912)',
    description:
      'Split-level station where Line 13 has branched since January 1912 between the Saint-Ouen/Saint-Denis trunk and the Clichy/Asnières trunk.'
  },
  {
    id: 'porte-de-clichy',
    name: 'Porte de Clichy (Tribunal de Paris)',
    lat: 48.8942,
    lon: 2.3145,
    openedYear: 1912,
    arrondissement: '17th Arr.',
    architecture: 'Former Nord-Sud Loop Terminus (1912) & Line 14 Cathedral Station (2021)',
    landmark: 'Paris Courthouse (Renzo Piano)',
    description:
      'Terminus of the northwestern branch of Nord-Sud Line B in January 1912; crowned since 2018 by Renzo Piano’s stepped glass Courthouse tower and served by Line 14 since 2021.'
  },
  {
    id: 'les-courtilles',
    name: 'Asnières – Gennevilliers – Les Courtilles',
    lat: 48.9305,
    lon: 2.2855,
    openedYear: 2008,
    arrondissement: 'Asnières / Gennevilliers',
    architecture: 'Daylit Contemporary Terminus (June 2008)',
    description: 'Northwestern terminus of Line 13 commissioned in June 2008.'
  },
  {
    id: 'varenne',
    name: 'Varenne',
    lat: 48.8562,
    lon: 2.3152,
    openedYear: 1923,
    arrondissement: '7th Arr.',
    architecture: 'Bronze Casts of Auguste Rodin’s The Thinker and Balzac on the Platforms',
    landmark: 'Musée Rodin & Hôtel Matignon',
    description: 'Opened in December 1923 steps away from the Musée Rodin, with bronze casts of Rodin sculptures adorning the platforms.'
  },
  {
    id: 'porte-de-vanves',
    name: 'Porte de Vanves',
    lat: 48.8268,
    lon: 2.3055,
    openedYear: 1937,
    arrondissement: '14th Arr.',
    architecture: 'Terminus of the Historic First Line 14 (1937–1976)',
    description:
      'Opened in January 1937 as the southern terminus of the original "Line 14" (Invalides – Porte de Vanves), absorbed in November 1976 into Line 13 when it was connected beneath the Seine.'
  },
  {
    id: 'chatillon-montrouge',
    name: 'Châtillon – Montrouge',
    lat: 48.8105,
    lon: 2.3018,
    openedYear: 1976,
    elevated: true,
    arrondissement: 'Châtillon / Montrouge',
    architecture: 'Surface Terminus Inaugurated November 9, 1976 with the Line 13 North–South Merger',
    description:
      'Commissioned on November 9, 1976 on the exact day Line 13 finally unified the northern (Saint-Lazare) and southern (Invalides) networks beneath the Seine.'
  },

  // ==================== LINE 14 (Météor: 1998 -> 2003 -> 2007 -> 2020 -> 2024 Olympic Extensions) ====================
  {
    id: 'saint-denis-pleyel',
    name: 'Saint-Denis – Pleyel',
    lat: 48.9182,
    lon: 2.3468,
    openedYear: 2024,
    arrondissement: 'Saint-Denis (Seine-Saint-Denis)',
    architecture: 'Kengo Kuma Timber & Light Cathedral (Inaugurated June 24, 2024)',
    landmark: 'Paris 2024 Olympic Village & Grand Paris Express Hub',
    description:
      'Flagship station of the Grand Paris Express designed by Kengo Kuma, inaugurated on June 24, 2024 at a depth of 27 meters for the Paris 2024 Olympic Games.'
  },
  {
    id: 'pont-cardinet',
    name: 'Pont Cardinet',
    lat: 48.8878,
    lon: 2.3145,
    openedYear: 2020,
    arrondissement: '17th Arr.',
    architecture: 'Deep Line 14 Station Beneath Martin Luther King Park (2020)',
    description: 'Inaugurated on December 14, 2020 at the heart of the Clichy-Batignolles eco-district.'
  },
  {
    id: 'cour-saint-emilion',
    name: 'Cour Saint-Émilion',
    lat: 48.8332,
    lon: 2.3865,
    openedYear: 1998,
    arrondissement: '12th Arr.',
    architecture: 'Monumental Stone Columns of the First Automated Metro Line (1998)',
    landmark: 'Bercy Village (Historic Wine Warehouses)',
    description: 'Inaugurated on October 15, 1998 with the opening of Paris’s first driverless automated metro line (Project Météor).'
  },
  {
    id: 'bibliotheque-francois-mitterrand',
    name: 'Bibliothèque François Mitterrand',
    lat: 48.8302,
    lon: 2.3758,
    openedYear: 1998,
    arrondissement: '13th Arr.',
    architecture: 'Subterranean Cathedral Hall with 15-Meter Concrete Pillars (Antoine Grumbach, 1998)',
    landmark: 'National Library of France (Four Open-Book Towers)',
    description:
      'Original southern terminus of Line 14 in October 1998, at the foot of Dominique Perrault’s four open-book glass towers.'
  },
  {
    id: 'olympiades',
    name: 'Olympiades',
    lat: 48.8268,
    lon: 2.3672,
    openedYear: 2007,
    arrondissement: '13th Arr.',
    architecture: 'Contemporary Deep Vault Beneath the 13th Arrondissement Towers (June 2007)',
    description: 'Southern terminus of Line 14 from June 2007 until the major southward extension to Orly Airport in June 2024.'
  },
  {
    id: 'villejuif-gustave-roussy',
    name: 'Villejuif – Gustave Roussy',
    lat: 48.7932,
    lon: 2.3498,
    openedYear: 2025,
    arrondissement: 'Villejuif (Val-de-Marne)',
    architecture: 'Monumental 50-Meter-Deep Cylindrical Shaft (Dominique Perrault, 2025)',
    description:
      'Spectacular 50-meter-deep helical glass-and-steel cylinder bathed in natural daylight, serving as the vertical crossroads of Lines 14 and 15 Sud.'
  },
  {
    id: 'aeroport-dorly',
    name: "Aéroport d'Orly",
    lat: 48.7485,
    lon: 2.3625,
    openedYear: 2024,
    arrondissement: 'Paray-Vieille-Poste (Essonne)',
    architecture: 'Grand Paris Express Airport Terminus (Inaugurated June 24, 2024)',
    landmark: 'Paris-Orly Airport',
    description:
      'Inaugurated on June 24, 2024: Line 14 now links Châtelet in the heart of Paris to Orly Airport in just 25 minutes.'
  },

  // ==================== LINE 15 SUD (Grand Paris Express Orbital Arc 2025/2026) ====================
  {
    id: 'issy-rer',
    name: 'Issy (Grand Paris Express)',
    lat: 48.8212,
    lon: 2.2598,
    openedYear: 2026,
    arrondissement: 'Issy-les-Moulineaux',
    architecture: 'Flagship Grand Paris Express Station (Line 15 Sud)',
    description: 'Station on the automated subterranean orbital Line 15 Sud linking the southern suburbs without passing through central Paris.'
  },
  {
    id: 'arceuil-cachan',
    name: 'Arcueil – Cachan',
    lat: 48.7985,
    lon: 2.3335,
    openedYear: 2026,
    arrondissement: 'Cachan (Val-de-Marne)',
    architecture: 'Line 15 Sud Interchange Station Beneath the Cachan Viaduct',
    description: 'Major milestone on the automated Line 15 Sud orbital ring of the Grand Paris Express.'
  },
  {
    id: 'vitry-centre',
    name: 'Vitry Centre',
    lat: 48.7895,
    lon: 2.3935,
    openedYear: 2026,
    arrondissement: 'Vitry-sur-Seine (Val-de-Marne)',
    architecture: 'Subterranean Grand Paris Express Station (Line 15 Sud)',
    description: 'Serves the heart of Vitry-sur-Seine and the MAC VAL contemporary art museum along the southern orbital arc.'
  },
  {
    id: 'creteil-lechat',
    name: "Créteil – L'Échat",
    lat: 48.7958,
    lon: 2.4488,
    openedYear: 2011,
    arrondissement: 'Créteil (Val-de-Marne)',
    architecture: 'Line 8 & Grand Paris Express Line 15 Sud Interchange',
    description: 'Eastern junction point between Line 8 and the automated Line 15 Sud orbital ring.'
  },
  {
    id: 'champigny-centre',
    name: 'Champigny Centre',
    lat: 48.8148,
    lon: 2.4925,
    openedYear: 2026,
    arrondissement: 'Champigny-sur-Marne',
    architecture: 'Subterranean Cathedral of the Eastern Line 15 Loop',
    description: 'Major eastern Île-de-France hub on Line 15 Sud of the Grand Paris Express.'
  }
];

const DEFAULT_PARIS_METRO_LINES: MetroLineConfig[] = [
  {
    id: '1',
    name: 'Line 1',
    shortLabel: '1',
    color: '#FFCD00',
    textColor: '#111111',
    openedYear: 1900,
    depthOffset: -2.2,
    historicCompany: 'CMP',
    summary:
      'The flagship line of the network: opened on July 19, 1900 for the Universal Exposition along the East–West Historic Axis.',
    segments: [
      {
        openedYear: 1900,
        stations: [
          'porte-maillot',
          'argentine',
          'etoile',
          'george-v',
          'franklin-roosevelt',
          'champs-elysees-clemenceau',
          'concorde',
          'tuileries',
          'palais-royal',
          'louvre-rivoli',
          'chatelet',
          'hotel-de-ville',
          'saint-paul',
          'bastille',
          'gare-de-lyon',
          'reuilly-diderot',
          'nation',
          'porte-de-vincennes'
        ]
      },
      {
        openedYear: 1934,
        stations: ['porte-de-vincennes', 'chateau-de-vincennes']
      },
      {
        openedYear: 1937,
        stations: ['pont-de-neuilly', 'les-sablons', 'porte-maillot']
      },
      {
        openedYear: 1992,
        stations: ['la-defense', 'esplanade-la-defense', 'pont-de-neuilly']
      }
    ]
  },
  {
    id: '2',
    name: 'Line 2',
    shortLabel: '2',
    color: '#003CA6',
    textColor: '#FFFFFF',
    openedYear: 1900,
    depthOffset: -3.0,
    historicCompany: 'CMP',
    summary:
      'The Northern Ring Line: opened in December 1900 between Porte Dauphine and Étoile, famous for its elevated viaducts at Barbès and Jaurès.',
    segments: [
      {
        openedYear: 1900,
        stations: ['porte-dauphine', 'victor-hugo', 'etoile']
      },
      {
        openedYear: 1902,
        stations: ['etoile', 'ternes', 'villiers', 'place-de-clichy', 'blanche', 'pigalle', 'anvers']
      },
      {
        openedYear: 1903,
        elevated: true,
        stations: ['anvers', 'barbes-rochechouart', 'la-chapelle', 'stalingrad', 'jaures']
      },
      {
        openedYear: 1903,
        stations: ['jaures', 'belleville', 'pere-lachaise', 'nation']
      }
    ]
  },
  {
    id: '3',
    name: 'Line 3',
    shortLabel: '3',
    color: '#837902',
    textColor: '#FFFFFF',
    openedYear: 1904,
    depthOffset: -3.8,
    historicCompany: 'CMP',
    summary:
      'The cross-town artery serving the Grand Department Stores, the Bourse, and République: opened in October 1904 between Villiers and Père Lachaise.',
    segments: [
      {
        openedYear: 1904,
        stations: [
          'villiers',
          'saint-lazare',
          'havre-caumartin',
          'opera',
          'quatre-septembre',
          'bourse',
          'reaumur-sebastopol',
          'arts-et-metiers',
          'republique',
          'parmentier',
          'pere-lachaise'
        ]
      },
      {
        openedYear: 1905,
        stations: ['pere-lachaise', 'martin-nadaud', 'gambetta']
      },
      {
        openedYear: 1910,
        stations: ['pereire', 'villiers']
      },
      {
        openedYear: 1911,
        stations: ['porte-de-champerret', 'pereire']
      },
      {
        openedYear: 1921,
        closedYear: 1971,
        stations: ['gambetta', 'porte-des-lilas']
      },
      {
        openedYear: 1937,
        stations: ['pont-de-levallois', 'porte-de-champerret']
      },
      {
        openedYear: 1971,
        stations: ['gambetta', 'gallieni']
      }
    ]
  },
  {
    id: '3bis',
    name: 'Line 3bis',
    shortLabel: '3b',
    color: '#6EC4E8',
    textColor: '#111111',
    openedYear: 1971,
    depthOffset: -4.2,
    historicCompany: 'RATP',
    summary:
      'The shortest line in the network: detached from Line 3 in March 1971 between Gambetta and Porte des Lilas.',
    segments: [
      {
        openedYear: 1971,
        stations: ['gambetta', 'porte-des-lilas']
      }
    ]
  },
  {
    id: '4',
    name: 'Line 4',
    shortLabel: '4',
    color: '#CF009E',
    textColor: '#FFFFFF',
    openedYear: 1908,
    depthOffset: -5.4,
    historicCompany: 'CMP',
    summary:
      'The historic North–South spine: the first line to tunnel beneath the Seine via sunken underwater caissons at Cité and Saint-Michel in January 1910.',
    segments: [
      {
        openedYear: 1908,
        stations: [
          'porte-de-clignancourt',
          'marcadet-poissonniers',
          'barbes-rochechouart',
          'gare-du-nord',
          'gare-de-lest',
          'strasbourg-saint-denis',
          'reaumur-sebastopol',
          'les-halles',
          'chatelet'
        ]
      },
      {
        openedYear: 1909,
        stations: ['raspail', 'denfert-rochereau', 'porte-dorleans']
      },
      {
        openedYear: 1910,
        stations: ['chatelet', 'cite', 'saint-michel', 'odeon', 'saint-germain-des-pres', 'montparnasse-bienvenue', 'raspail']
      },
      {
        openedYear: 2013,
        stations: ['porte-dorleans', 'mairie-de-montrouge']
      },
      {
        openedYear: 2022,
        stations: ['mairie-de-montrouge', 'bagneux-lucie-aubrac']
      }
    ]
  },
  {
    id: '5',
    name: 'Line 5',
    shortLabel: '5',
    color: '#FF7E2E',
    textColor: '#111111',
    openedYear: 1906,
    depthOffset: -4.6,
    historicCompany: 'CMP',
    summary:
      'Crosses the Seine above ground over the Viaduc d’Austerlitz and runs right through the great glass train shed of Gare d’Austerlitz since 1906.',
    segments: [
      {
        openedYear: 1906,
        elevated: true,
        stations: ['place-ditalie', 'saint-marcel', 'gare-dausterlitz', 'quai-de-la-rapee']
      },
      {
        openedYear: 1906,
        stations: ['quai-de-la-rapee', 'arsenal', 'bastille', 'richard-lenoir']
      },
      {
        openedYear: 1907,
        stations: ['richard-lenoir', 'oberkampf', 'republique', 'gare-de-lest', 'gare-du-nord']
      },
      {
        openedYear: 1942,
        stations: ['gare-du-nord', 'stalingrad', 'jaures', 'porte-de-pantin', 'eglise-de-pantin']
      },
      {
        openedYear: 1985,
        stations: ['eglise-de-pantin', 'bobigny-pablo-picasso']
      }
    ]
  },
  {
    id: '6',
    name: 'Line 6',
    shortLabel: '6',
    color: '#6ECA97',
    textColor: '#111111',
    openedYear: 1900,
    depthOffset: -2.6,
    historicCompany: 'CMP',
    summary:
      'The panoramic Southern Ring Line: famous for its elevated viaducts and its crossing of the Seine at Bir-Hakeim facing the Eiffel Tower.',
    segments: [
      {
        openedYear: 1900,
        stations: ['etoile', 'kleber', 'trocadero']
      },
      {
        openedYear: 1903,
        elevated: true,
        stations: ['trocadero', 'passy']
      },
      {
        openedYear: 1906,
        elevated: true,
        stations: ['passy', 'bir-hakeim', 'la-motte-picquet-grenelle', 'pasteur', 'montparnasse-bienvenue', 'raspail', 'denfert-rochereau', 'glaciere', 'place-ditalie']
      },
      {
        openedYear: 1909,
        elevated: true,
        stations: ['place-ditalie', 'nationale', 'bercy', 'daumesnil', 'picpus', 'nation']
      }
    ]
  },
  {
    id: '7',
    name: 'Line 7',
    shortLabel: '7',
    color: '#FA9ABA',
    textColor: '#111111',
    openedYear: 1910,
    depthOffset: -6.2,
    historicCompany: 'CMP',
    summary:
      'The great North-East / South-East radial line hugging the Right Bank quays of the Seine from the Louvre to Sully-Morland before branching to Ivry and Villejuif.',
    segments: [
      {
        openedYear: 1910,
        stations: ['opera', 'chaussee-dantin', 'gare-de-lest', 'louis-blanc', 'stalingrad', 'porte-de-la-villette']
      },
      {
        openedYear: 1911,
        closedYear: 1967,
        stations: ['louis-blanc', 'jaures', 'buttes-chaumont', 'place-des-fetes', 'pre-saint-gervais']
      },
      {
        openedYear: 1916,
        stations: ['palais-royal', 'pyramides', 'opera']
      },
      {
        openedYear: 1926,
        stations: ['pont-neuf', 'palais-royal']
      },
      {
        openedYear: 1930,
        stations: ['sully-morland', 'chatelet', 'pont-neuf']
      },
      {
        openedYear: 1931,
        stations: ['sully-morland', 'jussieu', 'place-monge', 'place-ditalie', 'maison-blanche', 'porte-divry']
      },
      {
        openedYear: 1946,
        stations: ['porte-divry', 'mairie-divry']
      },
      {
        openedYear: 1985,
        stations: ['maison-blanche', 'villejuif-louis-aragon']
      },
      {
        openedYear: 1987,
        stations: ['porte-de-la-villette', 'la-courneuve']
      }
    ]
  },
  {
    id: '7bis',
    name: 'Line 7bis',
    shortLabel: '7b',
    color: '#6ECA97',
    textColor: '#111111',
    openedYear: 1967,
    depthOffset: -5.8,
    historicCompany: 'RATP',
    summary:
      'Picturesque hilltop branch serving Buttes-Chaumont and Pré-Saint-Gervais, operated as an independent line since December 1967.',
    segments: [
      {
        openedYear: 1967,
        stations: ['louis-blanc', 'jaures', 'buttes-chaumont', 'place-des-fetes', 'pre-saint-gervais']
      }
    ]
  },
  {
    id: '8',
    name: 'Line 8',
    shortLabel: '8',
    color: '#E19BDF',
    textColor: '#111111',
    openedYear: 1913,
    depthOffset: -7.0,
    historicCompany: 'CMP',
    summary:
      'Connects Balard to Créteil via the Esplanade des Invalides, Place de la Concorde, Opéra, and the Grands Boulevards.',
    segments: [
      {
        openedYear: 1913,
        stations: ['la-motte-picquet-grenelle', 'champ-de-mars-ghost', 'ecole-militaire', 'invalides', 'concorde', 'madeleine', 'opera']
      },
      {
        openedYear: 1913,
        closedYear: 1937,
        stations: ['porte-dauteuil', 'eglise-dauteuil', 'la-motte-picquet-grenelle']
      },
      {
        openedYear: 1928,
        stations: ['opera', 'richelieu-drouot']
      },
      {
        openedYear: 1931,
        stations: [
          'richelieu-drouot',
          'bonne-nouvelle',
          'strasbourg-saint-denis',
          'saint-martin-ghost',
          'republique',
          'bastille',
          'reuilly-diderot',
          'daumesnil',
          'porte-de-charenton'
        ]
      },
      {
        openedYear: 1937,
        stations: ['balard', 'commerce', 'la-motte-picquet-grenelle']
      },
      {
        openedYear: 1974,
        elevated: true,
        stations: ['porte-de-charenton', 'creteil-lechat', 'creteil-prefecture']
      },
      {
        openedYear: 2011,
        elevated: true,
        stations: ['creteil-prefecture', 'pointe-du-lac']
      }
    ]
  },
  {
    id: '9',
    name: 'Line 9',
    shortLabel: '9',
    color: '#B6BD00',
    textColor: '#111111',
    openedYear: 1922,
    depthOffset: -7.8,
    historicCompany: 'CMP',
    summary:
      'Suburban pioneer: opened in 1922 at Trocadéro, it became the very first Metro line to cross beyond the gates of Paris to Pont de Sèvres in February 1934.',
    segments: [
      {
        openedYear: 1922,
        stations: ['exelmans', 'trocadero']
      },
      {
        openedYear: 1923,
        stations: ['porte-de-saint-cloud', 'exelmans', 'trocadero', 'franklin-roosevelt', 'miromesnil', 'saint-augustin', 'havre-caumartin', 'chaussee-dantin']
      },
      {
        openedYear: 1928,
        stations: ['chaussee-dantin', 'richelieu-drouot']
      },
      {
        openedYear: 1933,
        stations: [
          'richelieu-drouot',
          'bonne-nouvelle',
          'strasbourg-saint-denis',
          'saint-martin-ghost',
          'republique',
          'oberkampf',
          'charonne',
          'nation',
          'porte-de-montreuil'
        ]
      },
      {
        openedYear: 1934,
        stations: ['pont-de-sevres', 'porte-de-saint-cloud']
      },
      {
        openedYear: 1937,
        stations: ['porte-de-montreuil', 'mairie-de-montreuil']
      }
    ]
  },
  {
    id: '10',
    name: 'Line 10',
    shortLabel: '10',
    color: '#C9910D',
    textColor: '#111111',
    openedYear: 1923,
    depthOffset: -8.6,
    historicCompany: 'CMP',
    summary:
      'The Left Bank & Latin Quarter line: opened in late 1923 toward Croix-Rouge and reconfigured in 1937 from the Auteuil loop to Gare d’Austerlitz.',
    segments: [
      {
        openedYear: 1923,
        closedYear: 1937,
        stations: ['invalides', 'duroc']
      },
      {
        openedYear: 1923,
        closedYear: 1939,
        stations: ['duroc', 'sevres-babylone', 'croix-rouge-ghost']
      },
      {
        openedYear: 1926,
        stations: ['sevres-babylone', 'odeon']
      },
      {
        openedYear: 1930,
        stations: ['odeon', 'cluny-la-sorbonne', 'cardinal-lemoine', 'jussieu', 'gare-dausterlitz']
      },
      {
        openedYear: 1937,
        stations: ['porte-dauteuil', 'eglise-dauteuil', 'la-motte-picquet-grenelle', 'duroc', 'sevres-babylone']
      },
      {
        openedYear: 1981,
        stations: ['boulogne-pont-de-saint-cloud', 'porte-dauteuil']
      }
    ]
  },
  {
    id: '11',
    name: 'Line 11',
    shortLabel: '11',
    color: '#704B1C',
    textColor: '#FFFFFF',
    openedYear: 1935,
    depthOffset: -9.4,
    historicCompany: 'CMP',
    summary:
      'Opened in April 1935 to replace the Belleville funicular, testbed for rubber-tired Metro trains (1956), and extended in June 2024 to Rosny-Bois-Perrier.',
    segments: [
      {
        openedYear: 1935,
        stations: ['chatelet', 'hotel-de-ville', 'rambuteau', 'arts-et-metiers', 'republique', 'belleville', 'pyrénées', 'place-des-fetes', 'porte-des-lilas']
      },
      {
        openedYear: 1937,
        stations: ['porte-des-lilas', 'mairie-des-lilas']
      },
      {
        openedYear: 2024,
        elevated: false,
        stations: ['mairie-des-lilas', 'romainville-carnot', 'coteaux-beauclair', 'rosny-bois-perrier']
      }
    ]
  },
  {
    id: '12',
    name: 'Line 12 (former Nord-Sud A)',
    shortLabel: '12',
    color: '#007852',
    textColor: '#FFFFFF',
    openedYear: 1910,
    depthOffset: -10.2,
    historicCompany: 'Nord-Sud',
    summary:
      'Originally Line A of the rival Nord-Sud company (opened November 1910), celebrated for its green-and-honey ceramic tilework and the deep Abbesses station beneath Montmartre.',
    segments: [
      {
        openedYear: 1910,
        stations: [
          'notre-dame-de-lorette',
          'saint-lazare',
          'madeleine',
          'concorde',
          'assemblee-nationale',
          'solferino',
          'sevres-babylone',
          'montparnasse-bienvenue',
          'pasteur',
          'porte-de-versailles'
        ]
      },
      {
        openedYear: 1911,
        stations: ['pigalle', 'notre-dame-de-lorette']
      },
      {
        openedYear: 1912,
        stations: ['jules-joffrin', 'abbesses', 'pigalle']
      },
      {
        openedYear: 1916,
        stations: ['porte-de-la-chapelle', 'marcadet-poissonniers', 'jules-joffrin']
      },
      {
        openedYear: 1934,
        stations: ['porte-de-versailles', 'mairie-dissy']
      },
      {
        openedYear: 2012,
        stations: ['front-populaire', 'porte-de-la-chapelle']
      },
      {
        openedYear: 2022,
        stations: ['mairie-daubervilliers', 'front-populaire']
      }
    ]
  },
  {
    id: '13',
    name: 'Line 13 (former Nord-Sud B & Line 14)',
    shortLabel: '13',
    color: '#6EC4E8',
    textColor: '#111111',
    openedYear: 1911,
    depthOffset: -11.0,
    historicCompany: 'Nord-Sud',
    summary:
      'Formed in November 1976 by merging Nord-Sud Line B (1911) in the north with the original Line 14 (1937) in the south via a new tunnel beneath the Seine.',
    segments: [
      {
        openedYear: 1911,
        stations: ['saint-lazare', 'place-de-clichy', 'la-fourche', 'porte-de-saint-ouen']
      },
      {
        openedYear: 1912,
        stations: ['la-fourche', 'porte-de-clichy']
      },
      {
        openedYear: 1923,
        stations: ['invalides', 'varenne', 'duroc']
      },
      {
        openedYear: 1937,
        stations: ['duroc', 'montparnasse-bienvenue', 'porte-de-vanves']
      },
      {
        openedYear: 1952,
        stations: ['porte-de-saint-ouen', 'mairie-de-saint-ouen']
      },
      {
        openedYear: 1976,
        stations: ['saint-lazare', 'miromesnil', 'champs-elysees-clemenceau', 'invalides']
      },
      {
        openedYear: 1976,
        stations: ['porte-de-vanves', 'chatillon-montrouge']
      },
      {
        openedYear: 1976,
        stations: ['mairie-de-saint-ouen', 'saint-denis-porte-de-paris']
      },
      {
        openedYear: 1998,
        stations: ['saint-denis-porte-de-paris', 'saint-denis-universite']
      },
      {
        openedYear: 2008,
        stations: ['porte-de-clichy', 'les-courtilles']
      }
    ]
  },
  {
    id: '14',
    name: 'Line 14 (Météor)',
    shortLabel: '14',
    color: '#62259D',
    textColor: '#FFFFFF',
    openedYear: 1998,
    depthOffset: -13.2,
    historicCompany: 'RATP',
    summary:
      'The high-capacity driverless express backbone: opened in October 1998 (Météor) and extended in June 2024 from Saint-Denis Pleyel to Orly Airport.',
    segments: [
      {
        openedYear: 1998,
        stations: [
          'madeleine',
          'pyramides',
          'chatelet',
          'gare-de-lyon',
          'bercy',
          'cour-saint-emilion',
          'bibliotheque-francois-mitterrand'
        ]
      },
      {
        openedYear: 2003,
        stations: ['saint-lazare', 'madeleine']
      },
      {
        openedYear: 2007,
        stations: ['bibliotheque-francois-mitterrand', 'olympiades']
      },
      {
        openedYear: 2020,
        stations: ['mairie-de-saint-ouen', 'porte-de-clichy', 'pont-cardinet', 'saint-lazare']
      },
      {
        openedYear: 2024,
        stations: ['saint-denis-pleyel', 'mairie-de-saint-ouen']
      },
      {
        openedYear: 2024,
        stations: ['olympiades', 'maison-blanche', 'villejuif-gustave-roussy', 'aeroport-dorly']
      }
    ]
  },
  {
    id: '15',
    name: 'Line 15 South (Grand Paris Express)',
    shortLabel: '15',
    color: '#A60E32',
    textColor: '#FFFFFF',
    openedYear: 2025,
    depthOffset: -14.8,
    historicCompany: 'SGP',
    summary:
      'The automated orbital super-metro of the Grand Paris Express (2025–2026) linking Pont de Sèvres to Champigny across the southern inner suburbs.',
    segments: [
      {
        openedYear: 2025,
        stations: [
          'pont-de-sevres',
          'issy-rer',
          'chatillon-montrouge',
          'bagneux-lucie-aubrac',
          'arceuil-cachan',
          'villejuif-gustave-roussy',
          'villejuif-louis-aragon',
          'vitry-centre',
          'creteil-lechat',
          'champigny-centre'
        ]
      }
    ]
  }
];

export const SPECIAL_STATION_ORDER: string[] = [
  'concorde',
  'arts-et-metiers',
  'pont-neuf',
  'bastille',
  'louvre-rivoli',
  'cite',
  'cluny-la-sorbonne',
  'varenne',
  'abbesses',
  'solferino',
  'palais-royal',
  'tuileries'
];

export const SPECIAL_STATION_INTERIORS: Record<string, SpecialStationInteriorInfo> = {
  concorde: {
    photoUrl: 'stations/concorde.jpg',
    designTitle: '1789 Declaration Typographic Ceramic Vault',
    artistOrYear: 'Françoise Schein • 1991 (Line 12)',
    interiorCaption:
      'Every inch of the Line 12 vault is clad in white ceramic tiles bearing blue capital letters that spell out the entire 1789 Declaration of the Rights of Man and of the Citizen letter by letter.'
  },
  'arts-et-metiers': {
    photoUrl: 'stations/arts-et-metiers.jpg',
    designTitle: 'Riveted Copper Nautilus Submarine Interior',
    artistOrYear: 'François Schuiten & Benoît Peeters • 1994 (Line 11)',
    interiorCaption:
      'Clad in 800 riveted copper plates with giant overhead brass gears and Jules Verne submarine portholes displaying scientific treasures from the Conservatoire National des Arts et Métiers.'
  },
  'pont-neuf': {
    photoUrl: 'stations/pont-neuf.jpg',
    designTitle: 'Station de la Monnaie — Giant Coin Vault & Mint Press',
    artistOrYear: 'Monnaie de Paris Cultural Decor • 1991 (Line 7)',
    interiorCaption:
      'Nicknamed "La Monnaie", its vault features oversized bas-relief replicas of historic French coins curving overhead alongside an authentic 19th-century coin-minting balance press on the platform.'
  },
  bastille: {
    photoUrl: 'stations/bastille.jpg',
    designTitle: '1789 Storming of the Bastille Ceramic Fresco',
    artistOrYear: 'Liliane Bélembert & Odile Jacquot • 1989 (Lines 1 & 5)',
    interiorCaption:
      'Features a 120-meter hand-painted ceramic mural of the French Revolution on Line 1, while Line 5 exposes the actual medieval yellow stone counterscarp foundation wall of the 1370 Bastille fortress.'
  },
  'louvre-rivoli': {
    photoUrl: 'stations/louvre-rivoli.jpg',
    designTitle: 'Subterranean Louvre Sculpture Gallery',
    artistOrYear: 'André Malraux Cultural Initiative • 1968 (Line 1)',
    interiorCaption:
      'The very first cultural station in the Paris Metro: dressed in warm Burgundian stone with dramatic museum-lit alcoves displaying replicas of ancient Egyptian, Mesopotamian, and Renaissance masterpieces.'
  },
  cite: {
    photoUrl: 'stations/cite.jpg',
    designTitle: 'Sub-Fluvial Caisson & Belle Époque Globe Streetlamps',
    artistOrYear: 'Léon Chagnaud Caisson • 1910 (Line 4)',
    interiorCaption:
      'Sunk 20 meters below the Seine inside a vertical steel caisson beneath Île de la Cité, its high cathedral-like vault is illuminated by pairs of tall wrought-iron Belle Époque opal globe streetlamps.'
  },
  'cluny-la-sorbonne': {
    photoUrl: 'stations/cluny-la-sorbonne.jpg',
    designTitle: 'Les Ailes et les Flammes Mosaic & Literary Signatures',
    artistOrYear: 'Jean Bazaine • 1988 (Line 10)',
    interiorCaption:
      'Across its vaulted ceiling, 70,000 glass and ceramic tesserae form Jean Bazaine’s sweeping mosaic surrounded by the signatures of eight centuries of Latin Quarter writers, poets, and philosophers.'
  },
  varenne: {
    photoUrl: 'stations/varenne.jpg',
    designTitle: 'Auguste Rodin Bronze Sculpture Platform',
    artistOrYear: 'Musée Rodin Cultural Platform • 1988 (Line 13)',
    interiorCaption:
      'Steps from the Hôtel Biron (Musée Rodin), commuters wait alongside monumental bronze casts of Auguste Rodin’s The Thinker (Le Penseur) and Monument to Balzac mounted directly on the platforms.'
  },
  abbesses: {
    photoUrl: 'stations/abbesses.jpg',
    designTitle: 'Nord-Sud Ceramic Vault & Montmartre Spiral Frescoes',
    artistOrYear: 'Compagnie du Nord-Sud • 1912 (Line 12)',
    interiorCaption:
      'Buried 36 meters beneath Montmartre Hill, Abbesses preserves its ornate Nord-Sud honey-and-cobalt ceramic friezes and giant faience station nameplates at the base of its painted spiral staircases.'
  },
  solferino: {
    photoUrl: 'stations/solferino.jpg',
    designTitle: 'Listed 1910 Compagnie Nord-Sud Ceramic Heritage',
    artistOrYear: 'Adolphe Dervaux • 1910 (Line 12)',
    interiorCaption:
      'Protected as a Historic Monument, Solférino is preserved intact in its 1910 Nord-Sud splendor with relief ochre ceramic borders, interlaced "N.S." medallions, and monumental earthenware signage.'
  },
  'palais-royal': {
    photoUrl: 'stations/palais-royal.jpg',
    designTitle: 'Huichol Bead Mosaic & Kiosque des Noctambules',
    artistOrYear: 'Santos Motoapohua de la Torre & J.-M. Othoniel • 1997–2000',
    interiorCaption:
      'Combines Jean-Michel Othoniel’s Murano glass crown entrance above ground with a two-million-bead Mexican Huichol mosaic (La Pensée et l’Âme huicholes) inside the station.'
  },
  tuileries: {
    photoUrl: 'stations/tuileries.jpg',
    designTitle: '1900 Riveted Metal Deck & Botanical Garden Frescoes',
    artistOrYear: 'Inaugural 1900 Metal Hall & Cultural Murals (Line 1)',
    interiorCaption:
      'Beneath its original 1900 riveted steel beams and brick jack-arches, the platform walls of Tuileries showcase vibrant artistic frescoes inspired by the neighboring Tuileries Garden.'
  }
};

export const METRO_LINES: MetroLineConfig[] = ACTIVE_PIPELINE_CITY_DATASET
  ? ACTIVE_PIPELINE_CITY_DATASET.metroLines.map((l, idx) => ({
      id: l.line,
      name: l.name,
      shortLabel: l.line,
      color: l.color,
      textColor: l.textColor ?? '#ffffff',
      openedYear: l.openedYear,
      depthOffset: -2.0 - idx * 0.35,
      historicCompany: 'RATP',
      summary: `${l.name} (${l.rollingStockStyle ?? 'Transit'} • Opened ${l.openedYear})`,
      segments: [
        {
          openedYear: l.openedYear,
          elevated: l.line.startsWith('L'),
          stations: l.stations.map((s) => slugifyCityStationId(s.name))
        }
      ]
    }))
  : DEFAULT_PARIS_METRO_LINES;

export const STATIONS_MAP: Map<string, MetroStationData> = new Map();

if (ACTIVE_PIPELINE_CITY_DATASET) {
  for (const line of ACTIVE_PIPELINE_CITY_DATASET.metroLines) {
    for (const raw of line.stations) {
      const stId = slugifyCityStationId(raw.name);
      const existing = STATIONS_MAP.get(stId);
      if (!existing) {
        STATIONS_MAP.set(stId, {
          id: stId,
          name: raw.name.split('(')[0].trim(),
          lat: raw.lat,
          lon: raw.lon,
          x: raw.x,
          z: raw.z,
          openedYear: Math.max(1900, raw.year),
          closedYear: raw.isGhost ? 1945 : undefined,
          isGhostStation: Boolean(raw.isGhost),
          elevated:
            raw.name.toLowerCase().includes('viaduct') ||
            raw.name.toLowerCase().includes('bridge') ||
            line.line.startsWith('L'),
          arrondissement: ACTIVE_PIPELINE_CITY_DATASET.name,
          architecture: `${line.rollingStockStyle} • ${line.name.split('—')[0].trim()}`,
          description:
            raw.fact && raw.fact.trim().length > 0
              ? raw.fact
              : `Station on ${line.name} in ${ACTIVE_PIPELINE_CITY_DATASET.name}, opened in ${raw.year}.`,
          lines: []
        });
      } else {
        existing.openedYear = Math.min(existing.openedYear, Math.max(1900, raw.year));
        if (raw.fact && raw.fact.length > existing.description.length) {
          existing.description = raw.fact;
        }
      }
    }
  }
} else {
  for (const raw of RAW_STATIONS) {
    const { x, z } = projectLatLon(raw.lat, raw.lon);
    STATIONS_MAP.set(raw.id, {
      ...raw,
      x,
      z,
      lines: [],
      specialInterior: SPECIAL_STATION_INTERIORS[raw.id]
    });
  }
}

for (const line of METRO_LINES) {
  for (const seg of line.segments) {
    for (const stId of seg.stations) {
      const st = STATIONS_MAP.get(stId);
      if (st && !st.lines.includes(line.id)) {
        st.lines.push(line.id);
      }
    }
  }
}

export const ALL_STATIONS: MetroStationData[] = Array.from(STATIONS_MAP.values());

