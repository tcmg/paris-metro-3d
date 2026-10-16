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
import { ACTIVE_PIPELINE_CITY_DATASET } from '../cities/activeCityRuntime';

export type ArrondissementFilterId =
  | 'all'
  | 'core'
  | 'riveGauche'
  | 'riveDroite'
  | 'outer1860';

export interface ParisArrondissementData {
  id: string;
  number: number;
  shortLabel: string;
  name: string;
  officialName: string;
  quartiers: string;
  bank: 'Rive Droite' | 'Rive Gauche' | 'Île de la Cité & Rive Droite';
  filterGroup: Exclude<ArrondissementFilterId, 'all'>;
  eraBadge: string;
  foundedLabel: string;
  lat: number;
  lon: number;
  x: number;
  z: number;
  standOffRadius: number;
  cameraHeightOffset: number;
  haloRadiusScale: number;
  metroLines: string[];
  history: string;
  notableLandmarks: string;
}

const RAW_ARRONDISSEMENTS: Omit<ParisArrondissementData, 'x' | 'z'>[] = [
  {
    id: 'arr-1',
    number: 1,
    shortLabel: '1er',
    name: '1er — Louvre, Palais-Royal & Les Halles',
    officialName: 'Arrondissement du Louvre',
    quartiers: 'Saint-Germain-l’Auxerrois • Les Halles • Palais-Royal • Place Vendôme',
    bank: 'Île de la Cité & Rive Droite',
    filterGroup: 'core',
    eraBadge: 'HEART OF THE ESCARGOT • RIVE DROITE',
    foundedLabel: 'ROYAL CORE • 1795 / 1860',
    lat: 48.8625,
    lon: 2.3365,
    standOffRadius: 29.0,
    cameraHeightOffset: 17.5,
    haloRadiusScale: 2.2,
    metroLines: ['1', '4', '7', '11', '14'],
    history:
      'Starting point of the clockwise "Escargot de Paris" spiral established in 1860. Spanning the western prow of the Île de la Cité (Sainte-Chapelle, Conciergerie) and the royal axis of the Louvre and Tuileries, the 1st arrondissement housed the Kings of France from the Middle Ages until Louis XIV moved to Versailles in 1682, while Les Halles served for eight centuries as Zola’s "Belly of Paris" above the Châtelet Metro super-hub.',
    notableLandmarks: 'Musée du Louvre, Sainte-Chapelle, Palais-Royal, Jardin des Tuileries, Châtelet'
  },
  {
    id: 'arr-2',
    number: 2,
    shortLabel: '2e',
    name: '2e — Bourse, Sentier & Passages Couverts',
    officialName: 'Arrondissement de la Bourse',
    quartiers: 'Gaillon • Vivienne • Mail • Bonne-Nouvelle',
    bank: 'Rive Droite',
    filterGroup: 'core',
    eraBadge: 'FINANCIAL & ARCADE DISTRICT • RIVE DROITE',
    foundedLabel: 'BOURSE & ARCADES • 1795 / 1860',
    lat: 48.8682,
    lon: 2.3428,
    standOffRadius: 27.0,
    cameraHeightOffset: 17.0,
    haloRadiusScale: 1.95,
    metroLines: ['3', '4', '8', '9'],
    history:
      'Smallest arrondissement of Paris by area, carved inside the medieval walls of Charles V and Louis XIII. In the early 19th century, before Haussmann’s wide sidewalks, the 2nd arrondissement pioneered glass-roofed shopping arcades (Galerie Vivienne, Passage des Panoramas) lit by gas lamps, alongside Napoleon’s neoclassical Palais Brongniart (the Paris Stock Exchange, 1826) and the historic printing and garment workshops of Le Sentier.',
    notableLandmarks: 'Palais Brongniart (Bourse), Galerie Vivienne, Bibliothèque Richelieu, Réaumur–Séopol'
  },
  {
    id: 'arr-3',
    number: 3,
    shortLabel: '3e',
    name: '3e — Haut-Marais, Temple & Arts-et-Métiers',
    officialName: 'Arrondissement du Temple',
    quartiers: 'Arts-et-Métiers • Enfants-Rouges • Archives • Sainte-Avoye',
    bank: 'Rive Droite',
    filterGroup: 'core',
    eraBadge: 'MEDIEVAL & ARISTOCRATIC MARAIS • RIVE DROITE',
    foundedLabel: 'TEMPLE & MARAIS • 1795 / 1860',
    lat: 48.8637,
    lon: 2.3615,
    standOffRadius: 28.5,
    cameraHeightOffset: 17.5,
    haloRadiusScale: 2.1,
    metroLines: ['3', '5', '8', '9', '11'],
    history:
      'Named after the medieval fortress of the Knights Templar (where Louis XVI was imprisoned in 1792), the 3rd arrondissement encompasses the northern Marais. In the 17th century, nobility built grand stone Hôtels Particuliers (Hôtel Carnavalet, Hôtel Salé) here; in 1794, the abbey of Saint-Martin-des-Champs became the Conservatoire National des Arts et Métiers—inspiring the riveted copper steampunk submarine interior of Arts et Métiers station on Line 11.',
    notableLandmarks: 'Conservatoire des Arts et Métiers, Musée Carnavalet, Marché des Enfants-Rouges, République'
  },
  {
    id: 'arr-4',
    number: 4,
    shortLabel: '4e',
    name: '4e — Notre-Dame, Hôtel de Ville & Bas-Marais',
    officialName: 'Arrondissement de l’Hôtel-de-Ville',
    quartiers: 'Saint-Merri • Saint-Gervais • Arsenal • Notre-Dame',
    bank: 'Île de la Cité & Rive Droite',
    filterGroup: 'core',
    eraBadge: 'CRADLE OF LUTETIA & MUNICIPAL SEAT',
    foundedLabel: 'GALLO-ROMAN & GOTHIC • 1795 / 1860',
    lat: 48.8545,
    lon: 2.3572,
    standOffRadius: 29.0,
    cameraHeightOffset: 17.5,
    haloRadiusScale: 2.2,
    metroLines: ['1', '4', '5', '7', '8', '11', '14'],
    history:
      'Covering the eastern Île de la Cité, the entire Île Saint-Louis (laid out under Louis XIII in 1614), and the southern Marais. Here stand Notre-Dame Cathedral (begun 1163), Henry IV’s brick-and-stone Place des Vosges (1612, the oldest planned square in Paris), the Hôtel de Ville where the Republic was proclaimed in 1848 and 1870, and the high-tech exoskeleton of the Centre Georges-Pompidou (1977).',
    notableLandmarks: 'Cathédrale Notre-Dame, Hôtel de Ville, Centre Pompidou, Place des Vosges, Place de la Bastille'
  },
  {
    id: 'arr-5',
    number: 5,
    shortLabel: '5e',
    name: '5e — Quartier Latin, Panthéon & Sorbonne',
    officialName: 'Arrondissement du Panthéon',
    quartiers: 'Saint-Victor • Jardin-des-Plantes • Val-de-Grâce • Sorbonne',
    bank: 'Rive Gauche',
    filterGroup: 'riveGauche',
    eraBadge: 'GALLO-ROMAN LUTETIA & UNIVERSITY HEART',
    foundedLabel: '1ST CENTURY AD • 1795 / 1860',
    lat: 48.8448,
    lon: 2.3498,
    standOffRadius: 30.0,
    cameraHeightOffset: 18.0,
    haloRadiusScale: 2.3,
    metroLines: ['4', '7', '10'],
    history:
      'Oldest district on the Left Bank, built by the Romans in the 1st century AD around the Cardo Maximus (Rue Saint-Jacques), the Arènes de Lutèce amphitheater, and the Cluny thermal baths. Since the founding of the Sorbonne in 1257, scholars spoke Latin through its streets, giving birth to the "Quartier Latin". Crowning Montagne Sainte-Geneviève, Soufflot’s neoclassical Panthéon became the secular mausoleum of the French Republic’s great figures in 1791.',
    notableLandmarks: 'Panthéon, La Sorbonne, Thermes de Cluny, Jardin des Plantes, Rue Mouffetard'
  },
  {
    id: 'arr-6',
    number: 6,
    shortLabel: '6e',
    name: '6e — Saint-Germain-des-Prés & Luxembourg',
    officialName: 'Arrondissement du Luxembourg',
    quartiers: 'Monnaie • Odéon • Notre-Dame-des-Champs • Saint-Germain-des-Prés',
    bank: 'Rive Gauche',
    filterGroup: 'riveGauche',
    eraBadge: 'LITERARY & SENATE CAPITAL • RIVE GAUCHE',
    foundedLabel: 'ABBEY 543 AD • 1795 / 1860',
    lat: 48.8505,
    lon: 2.3325,
    standOffRadius: 29.5,
    cameraHeightOffset: 17.8,
    haloRadiusScale: 2.2,
    metroLines: ['4', '10', '12'],
    history:
      'Anchored by the Merovingian Abbey of Saint-Germain-des-Prés (founded 543 AD, the oldest church tower in Paris) and Marie de’ Medici’s Palais and Jardin du Luxembourg (1615, today seat of the French Senate). From the Encyclopédistes at Café Procope to 20th-century existentialists Sartre and Beauvoir at Les Deux Magots and Café de Flore, the 6th arrondissement has been the literary, publishing, and Fine Arts ("Beaux-Arts") heart of Paris.',
    notableLandmarks: 'Jardin & Palais du Luxembourg (Sénat), Saint-Germain-des-Prés, Institut de France, Saint-Sulpice'
  },
  {
    id: 'arr-7',
    number: 7,
    shortLabel: '7e',
    name: '7e — Tour Eiffel, Invalides & Palais-Bourbon',
    officialName: 'Arrondissement du Palais-Bourbon',
    quartiers: 'Saint-Thomas-d’Aquin • Invalides • École-Militaire • Gros-Caillou',
    bank: 'Rive Gauche',
    filterGroup: 'riveGauche',
    eraBadge: 'MONUMENTAL ESPLANADES & MINISTRIES',
    foundedLabel: 'FAUBOURG SAINT-GERMAIN • 1860',
    lat: 48.8565,
    lon: 2.3125,
    standOffRadius: 33.0,
    cameraHeightOffset: 19.0,
    haloRadiusScale: 2.5,
    metroLines: ['6', '8', '10', '12', '13'],
    history:
      'Home to the grandest monumental axes of the Left Bank: Louis XIV’s Hôtel des Invalides (1670) and its gilded Royal Dome housing Napoleon’s tomb, the 18th-century aristocratic mansions of the Faubourg Saint-Germain (now embassies and ministries), the Assemblée Nationale at Palais-Bourbon, the 1900 Beaux-Arts Gare d’Orsay terminus, and Gustave Eiffel’s 330m wrought-iron tower erected on the Champ de Mars for the 1889 Universal Exposition.',
    notableLandmarks: 'Tour Eiffel, Hôtel des Invalides, Assemblée Nationale, Musée d’Orsay, École Militaire'
  },
  {
    id: 'arr-8',
    number: 8,
    shortLabel: '8e',
    name: '8e — Champs-Élysées, Concorde & Saint-Lazare',
    officialName: 'Arrondissement de l’Élysée',
    quartiers: 'Champs-Élysées • Faubourg-du-Roule • Madeleine • Europe',
    bank: 'Rive Droite',
    filterGroup: 'riveDroite',
    eraBadge: 'TRIUMPHAL AXIS & GRANDES LIGNES OUEST',
    foundedLabel: 'AXE HISTORIQUE • 1860',
    lat: 48.8725,
    lon: 2.3125,
    standOffRadius: 33.0,
    cameraHeightOffset: 19.0,
    haloRadiusScale: 2.5,
    metroLines: ['1', '2', '3', '9', '12', '13', '14'],
    history:
      'Laid out along André Le Nôtre’s 1667 perspective from Place de la Concorde up the Champs-Élysées to the Arc de Triomphe. The 8th arrondissement houses the Palais de l’Élysée (official residence of the President of the French Republic), the glass-vaulted Grand Palais built for the 1900 World’s Fair, the neoclassical Madeleine temple, and the Quartier de l’Europe fanning out above the steam train sheds of Gare Saint-Lazare (1837), immortalized by Claude Monet.',
    notableLandmarks: 'Arc de Triomphe, Place de la Concorde, Grand Palais, Palais de l’Élysée, Gare Saint-Lazare'
  },
  {
    id: 'arr-9',
    number: 9,
    shortLabel: '9e',
    name: '9e — Opéra Garnier, Grands Magasins & Pigalle',
    officialName: 'Arrondissement de l’Opéra',
    quartiers: 'Saint-Georges • Chaussée-d’Antin • Faubourg-Montmartre • Rochechouart',
    bank: 'Rive Droite',
    filterGroup: 'riveDroite',
    eraBadge: 'BELLE ÉPOQUE BOULEVARDS & OPERA',
    foundedLabel: 'SECOND EMPIRE • 1860',
    lat: 48.8772,
    lon: 2.3375,
    standOffRadius: 29.5,
    cameraHeightOffset: 17.8,
    haloRadiusScale: 2.2,
    metroLines: ['2', '3', '7', '8', '9', '12'],
    history:
      'Showpiece of Baron Haussmann’s Second Empire urbanism, centered on Charles Garnier’s opulent 1875 Opera House—beneath which Metro Lines 3, 7, and 8 cross in a single concrete subterranean caisson sunk in 1903. Flanking Boulevard Haussmann rise the great Art Nouveau steel-and-glass department stores (Galeries Lafayette, Printemps), while to the north climbs the romantic artistic quarter of Nouvelle Athènes and the cabarets of Pigalle.',
    notableLandmarks: 'Palais Garnier (Opéra), Boulevard Haussmann, Place Pigalle, Trinité'
  },
  {
    id: 'arr-10',
    number: 10,
    shortLabel: '10e',
    name: '10e — Gare du Nord, Gare de l’Est & Canal Saint-Martin',
    officialName: 'Arrondissement de l’Entrepôt',
    quartiers: 'Saint-Vincent-de-Paul • Porte-Saint-Denis • Porte-Saint-Martin • Hôpital-Saint-Louis',
    bank: 'Rive Droite',
    filterGroup: 'riveDroite',
    eraBadge: 'RAILWAY CATHEDRALS & CANAL LOCKS',
    foundedLabel: 'CANAL 1825 • GARES 1846–1864',
    lat: 48.8761,
    lon: 2.3599,
    standOffRadius: 31.0,
    cameraHeightOffset: 18.2,
    haloRadiusScale: 2.35,
    metroLines: ['2', '4', '5', '7', '8', '9', '11'],
    history:
      'Industrial and transit gateway of northeastern Paris, defined by two monumental 19th-century railway cathedrals standing 500 meters apart—Gare du Nord (Hittorff, 1864, busiest station in Europe) and Gare de l’Est (Duquesney, 1849)—linked underneath by Metro Lines 4, 5, and 7. To the east flows Napoleon’s tree-lined Canal Saint-Martin (1825) with its Venetian iron footbridges and double locks descending toward the Bastille.',
    notableLandmarks: 'Gare du Nord, Gare de l’Est, Canal Saint-Martin, Porte Saint-Denis, Place de la République'
  },
  {
    id: 'arr-11',
    number: 11,
    shortLabel: '11e',
    name: '11e — Bastille, Oberkampf, Nation & Popincourt',
    officialName: 'Arrondissement de Popincourt',
    quartiers: 'Folie-Méricourt • Saint-Ambroise • La Roquette • Sainte-Marguerite',
    bank: 'Rive Droite',
    filterGroup: 'riveDroite',
    eraBadge: 'REVOLUTIONARY ARTISANS & REPUBLICAN AXIS',
    foundedLabel: 'FAUBOURG SAINT-ANTOINE • 1860',
    lat: 48.8592,
    lon: 2.3785,
    standOffRadius: 31.0,
    cameraHeightOffset: 18.2,
    haloRadiusScale: 2.35,
    metroLines: ['1', '2', '3', '5', '8', '9'],
    history:
      'Stretching between the revolutionary squares of Place de la Bastille, Place de la République, and Place de la Nation. For centuries, the furniture makers and metalworkers of the Faubourg Saint-Antoine manned the barricades of 1789, 1830, 1848, and the 1871 Paris Commune. Today it is the most densely populated arrondissement in Paris, crisscrossed by six Metro lines and lively passages from Oberkampf to Charonne.',
    notableLandmarks: 'Place de la Bastille (July Column), Place de la République, Place de la Nation, Cirque d’Hiver'
  },
  {
    id: 'arr-12',
    number: 12,
    shortLabel: '12e',
    name: '12e — Gare de Lyon, Bercy & Bois de Vincennes',
    officialName: 'Arrondissement de Reuilly',
    quartiers: 'Bel-Air • Picpus • Bercy • Quinze-Vingts',
    bank: 'Rive Droite',
    filterGroup: 'riveDroite',
    eraBadge: 'PLM CLOCK TOWER & EASTERN GATEWAY',
    foundedLabel: 'ANNEXED IN 1860 • EXPO 1900',
    lat: 48.8445,
    lon: 2.3885,
    standOffRadius: 34.0,
    cameraHeightOffset: 19.5,
    haloRadiusScale: 2.6,
    metroLines: ['1', '2', '5', '6', '8', '14'],
    history:
      'Created in the 1860 annexation of Bercy and Saint-Mandé, the 12th arrondissement was the eastern laboratory of the 1900 Metro: Line 1’s historic maintenance workshops opened at Porte de Vincennes, while Marius Toudoire’s Gare de Lyon (1900) raised its 67-meter gilded Clock Tower above the Seine. Along Avenue Daumesnil, the 1859 red-brick Viaduc des Arts (former Vincennes steam railway) now carries the planted Coulée Verte above street level.',
    notableLandmarks: 'Gare de Lyon & Tour de l’Horloge, Opéra Bastille, Viaduc de Bercy (Line 6), Place de la Nation'
  },
  {
    id: 'arr-13',
    number: 13,
    shortLabel: '13e',
    name: '13e — Bibliothèque BNF, Austerlitz & Butte-aux-Cailles',
    officialName: 'Arrondissement des Gobelins',
    quartiers: 'Salpêtrière • Gare • Maison-Blanche • Croulebarbe',
    bank: 'Rive Gauche',
    filterGroup: 'riveGauche',
    eraBadge: 'ROYAL TAPESTRIES, SKY VIADUCTS & BNF',
    foundedLabel: 'ANNEXED 1860 • RIVE GAUCHE',
    lat: 48.8325,
    lon: 2.3585,
    standOffRadius: 34.0,
    cameraHeightOffset: 19.5,
    haloRadiusScale: 2.6,
    metroLines: ['5', '6', '7', '10', '14'],
    history:
      'Named after the Manufacture des Gobelins (royal tapestry workshops founded under Colbert in 1662 along the Bièvre river). In 1906, Line 5 soared straight through the glass train shed of Gare d’Austerlitz onto a 140m single-span steel arch bridge over the Seine, while Line 6’s iron viaduct sweeps along Boulevard Vincent-Auriol toward Place d’Italie. In the 1990s, Dominique Perrault’s four 79m open-book glass towers of the BNF anchored the Paris Rive Gauche district served by automated Line 14.',
    notableLandmarks: 'Bibliothèque Nationale de France (BNF), Gare d’Austerlitz, Place d’Italie, Manufacture des Gobelins'
  },
  {
    id: 'arr-14',
    number: 14,
    shortLabel: '14e',
    name: '14e — Montparnasse, Observatoire & Catacombes',
    officialName: 'Arrondissement de l’Observatoire',
    quartiers: 'Montparnasse • Parc-de-Montsouris • Petit-Montrouge • Plaisance',
    bank: 'Rive Gauche',
    filterGroup: 'riveGauche',
    eraBadge: 'ASTRONOMY MERIDIAN & ARTISTS’ BOHEMIA',
    foundedLabel: 'OBSERVATOIRE 1667 • ANNEXED 1860',
    lat: 48.8335,
    lon: 2.3265,
    standOffRadius: 33.0,
    cameraHeightOffset: 19.0,
    haloRadiusScale: 2.5,
    metroLines: ['4', '6', '12', '13'],
    history:
      'Anchored by Claude Perrault’s 1667 Paris Observatory (defining the historic Paris Meridian) and the subterranean ossuary of the Catacombes at Denfert-Rochereau, carved out of ancient Lutetian limestone quarries. During the Roaring Twenties ("Les Années Folles"), painters and writers from Picasso and Modigliani to Hemingway gathered at the brasseries of Carrefour Vavin; in 1973, the 210-meter Tour Montparnasse rose on the site of the old 1852 Brittany steam terminus.',
    notableLandmarks: 'Tour & Gare Montparnasse, Observatoire de Paris, Denfert-Rochereau (Catacombes), Parc Montsouris'
  },
  {
    id: 'arr-15',
    number: 15,
    shortLabel: '15e',
    name: '15e — Vaugirard, Grenelle & Bir-Hakeim Viaduct',
    officialName: 'Arrondissement de Vaugirard',
    quartiers: 'Saint-Lambert • Necker • Grenelle • Javel',
    bank: 'Rive Gauche',
    filterGroup: 'riveGauche',
    eraBadge: 'POPULOUS SOUTHWEST & CITROËN HERITAGE',
    foundedLabel: 'ANNEXED JAN 1, 1860',
    lat: 48.8415,
    lon: 2.2965,
    standOffRadius: 34.5,
    cameraHeightOffset: 19.5,
    haloRadiusScale: 2.65,
    metroLines: ['6', '8', '10', '12', '13'],
    history:
      'Formed in 1860 by merging the suburban communes of Vaugirard and Grenelle, today the most populous arrondissement of Paris. Its riverfront witnessed the 1905 construction of the double-deck Pont de Bir-Hakeim carrying Metro Line 6 above the Île aux Cygnes, the artists’ beehive studio La Ruche (1902), and André Citroën’s pioneering automobile factories on the Quai de Javel (1915–1970, now Parc André-Citroën).',
    notableLandmarks: 'Viaduc de Bir-Hakeim (Line 6), Île aux Cygnes, Front de Seine, Porte de Versailles'
  },
  {
    id: 'arr-16',
    number: 16,
    shortLabel: '16e',
    name: '16e — Trocadéro, Passy, Auteuil & Bois de Boulogne',
    officialName: 'Arrondissement de Passy',
    quartiers: 'Auteuil • Muette • Porte-Dauphine • Chaillot',
    bank: 'Rive Droite',
    filterGroup: 'outer1860',
    eraBadge: 'CHAILLOT TERRACES & GUIMARD ART NOUVEAU',
    foundedLabel: 'ANNEXED JAN 1, 1860',
    lat: 48.8635,
    lon: 2.2765,
    standOffRadius: 34.5,
    cameraHeightOffset: 19.5,
    haloRadiusScale: 2.65,
    metroLines: ['1', '2', '6', '9', '10'],
    history:
      'Annexed in 1860 from the hillside villages of Passy and Auteuil (where Benjamin Franklin lived and Honoré de Balzac wrote). Cresting the Colline de Chaillot opposite the Eiffel Tower, the Palais de Chaillot was rebuilt in monumental neoclassical Art Deco style for the 1937 International Exposition. At Porte Dauphine (Line 2, 1900) stands Hector Guimard’s original glass-roofed "Libellule" (Dragonfly) Metro pavilion, while Hector Guimard and Le Corbusier designed landmark townhouses in Auteuil.',
    notableLandmarks: 'Palais de Chaillot (Trocadéro), Porte Dauphine Guimard Pavilion, Passy Viaduct, Place de l’Étoile'
  },
  {
    id: 'arr-17',
    number: 17,
    shortLabel: '17e',
    name: '17e — Batignolles, Parc Monceau & Ternes',
    officialName: 'Arrondissement des Batignolles-Monceau',
    quartiers: 'Ternes • Plaine-de-Monceaux • Batignolles • Épinettes',
    bank: 'Rive Droite',
    filterGroup: 'outer1860',
    eraBadge: 'IMPRESSIONIST BATIGNOLLES & GRAND PARIS',
    foundedLabel: 'ANNEXED JAN 1, 1860',
    lat: 48.8835,
    lon: 2.3115,
    standOffRadius: 33.5,
    cameraHeightOffset: 19.2,
    haloRadiusScale: 2.55,
    metroLines: ['1', '2', '3', '13', '14'],
    history:
      'Spanning from the aristocratic 18th-century follies of Parc Monceau and the Haussmannian avenues around Place des Ternes to the former railway village of Les Batignolles—where Édouard Manet and the "Batignolles Group" launched Impressionism in the 1860s. In 2020, automated Line 14 was extended beneath the Saint-Lazare railyards to Pont Cardinet and Porte de Clichy alongside Renzo Piano’s 160-meter Paris Tribunal.',
    notableLandmarks: 'Parc Monceau, Place de Clichy, Les Batignolles, Porte Maillot (1900 Line 1 Terminus)'
  },
  {
    id: 'arr-18',
    number: 18,
    shortLabel: '18e',
    name: '18e — Butte Montmartre, Sacré-Cœur & La Chapelle',
    officialName: 'Arrondissement des Buttes-Montmartre',
    quartiers: 'Grandes-Carrières • Clignancourt • Goutte-d’Or • La Chapelle',
    bank: 'Rive Droite',
    filterGroup: 'outer1860',
    eraBadge: '130M SUMMIT OF PARIS & BOHEMIAN HILLTOP',
    foundedLabel: 'ANNEXED 1860 • SACRÉ-CŒUR 1914',
    lat: 48.8915,
    lon: 2.3445,
    standOffRadius: 33.5,
    cameraHeightOffset: 19.5,
    haloRadiusScale: 2.55,
    metroLines: ['2', '4', '12', '13'],
    history:
      'Rising 130 meters above the Seine to the gypsum-quarried hilltop village of Montmartre, crowned by Paul Abadie’s Romano-Byzantine Basilica of the Sacré-Cœur (1875–1914). Birthplace of the 1871 Paris Commune and turn-of-the-century bohemian crucible of Toulouse-Lautrec, Renoir, and Picasso at the Bateau-Lavoir. To serve the steep hill, the Nord-Sud company bored Abbesses station (Line 12, 1912) 36 meters underground, while Line 2’s 1903 iron viaduct sweeps along Boulevard de la Chapelle.',
    notableLandmarks: 'Basilique du Sacré-Cœur, Place du Tertre, Abbesses (Deepest Station), Moulin Rouge, Barbès–Rochechouart'
  },
  {
    id: 'arr-19',
    number: 19,
    shortLabel: '19e',
    name: '19e — Buttes-Chaumont, Bassin de la Villette & Ourcq',
    officialName: 'Arrondissement des Buttes-Chaumont',
    quartiers: 'La Villette • Pont-de-Flandre • Amérique • Combat',
    bank: 'Rive Droite',
    filterGroup: 'outer1860',
    eraBadge: 'ROMANTIC CLIFF PARK & NAPOLEONIC CANALS',
    foundedLabel: 'CANAL 1808 • PARK 1867',
    lat: 48.8825,
    lon: 2.3822,
    standOffRadius: 34.0,
    cameraHeightOffset: 19.5,
    haloRadiusScale: 2.6,
    metroLines: ['2', '5', '7', '7bis', '11'],
    history:
      'Crossed by the Bassin de la Villette and Canal de l’Ourcq (opened by Napoleon I in 1808 to bring fresh water to Paris) and crowned by Alphand’s dramatic Parc des Buttes-Chaumont—carved out of former gypsum quarries for the 1867 World’s Fair with a 50-meter cliff island and suspension bridge. At Stalingrad, Ledoux’s 1788 neoclassical Rotonde de la Villette is encircled by the sweeping overhead iron viaduct of Metro Line 2.',
    notableLandmarks: 'Parc des Buttes-Chaumont, Bassin de la Villette, Rotonde de Stalingrad (Line 2 Viaduct), Porte de la Villette'
  },
  {
    id: 'arr-20',
    number: 20,
    shortLabel: '20e',
    name: '20e — Belleville, Père-Lachaise & Ménilmontant',
    officialName: 'Arrondissement de Ménilmontant',
    quartiers: 'Belleville • Saint-Fargeau • Père-Lachaise • Charonne',
    bank: 'Rive Droite',
    filterGroup: 'outer1860',
    eraBadge: 'OUTER CROWN OF THE ESCARGOT SPIRAL',
    foundedLabel: 'PÈRE-LACHAISE 1804 • ANNEXED 1860',
    lat: 48.8645,
    lon: 2.3985,
    standOffRadius: 34.0,
    cameraHeightOffset: 19.5,
    haloRadiusScale: 2.6,
    metroLines: ['1', '2', '3', '3bis', '9', '11'],
    history:
      'Outer culmination of the 20-arrondissement Escargot spiral, formed in 1860 from the hillside villages of Belleville, Ménilmontant, and Charonne. Home to Père-Lachaise Cemetery (founded by Napoleon in 1804; resting place of Chopin, Molière, Proust, Piaf, and Wilde, and site of the 1871 Communards’ Wall), where Metro Line 3 first terminated in 1904 and where Paris’s very first escalators were installed at Père Lachaise station in 1909.',
    notableLandmarks: 'Cimetière du Père-Lachaise, Place Gambetta (Line 3bis), Hauteurs de Belleville, Porte de Lilas'
  }
];

const PARIS_DEFAULT_ARRONDISSEMENTS: ParisArrondissementData[] = RAW_ARRONDISSEMENTS.map((arr) => {
  const { x, z } = projectLatLon(arr.lat, arr.lon);
  return {
    ...arr,
    x,
    z
  };
});

const FILTER_GROUPS_CYCLE: Exclude<ArrondissementFilterId, 'all'>[] = [
  'core',
  'riveDroite',
  'riveGauche',
  'outer1860'
];

export const PARIS_ARRONDISSEMENTS: ParisArrondissementData[] = ACTIVE_PIPELINE_CITY_DATASET
  ? ACTIVE_PIPELINE_CITY_DATASET.districts.map((dist, idx) => {
      const dataset = ACTIVE_PIPELINE_CITY_DATASET!;
      const { x, z } = projectLatLon(dist.lat, dist.lon);
      const connectedLines = dataset.metroLines
        .slice(0, 5)
        .map((l) => l.line);
      return {
        id: dist.id,
        number: dist.number,
        shortLabel: dist.localLabel,
        name: `${dist.localLabel} — ${dist.name}`,
        officialName: dist.subtitle,
        quartiers: dist.landmarks.join(' • '),
        bank: idx % 2 === 0 ? 'Rive Droite' : 'Rive Gauche',
        filterGroup: FILTER_GROUPS_CYCLE[idx % FILTER_GROUPS_CYCLE.length],
        eraBadge: `${dataset.name.toUpperCase()} HISTORIC PRECINCT`,
        foundedLabel: dist.yearEstablished
          ? `ESTABLISHED ${dist.yearEstablished}${dist.population ? ` • POP. ${dist.population}` : ''}`
          : dist.subtitle.toUpperCase(),
        lat: dist.lat,
        lon: dist.lon,
        x,
        z,
        standOffRadius: 28.0,
        cameraHeightOffset: 17.5,
        haloRadiusScale: 2.0,
        metroLines: connectedLines,
        history: dist.fact,
        notableLandmarks: dist.landmarks.join(', ')
      };
    })
  : PARIS_DEFAULT_ARRONDISSEMENTS;

export const ARRONDISSEMENTS_MAP = new Map<string, ParisArrondissementData>(
  PARIS_ARRONDISSEMENTS.map((a) => [a.id, a])
);

