// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import type {
  CityMonument,
  CityHistoricalMilestone,
  CityEraDescription,
  CityTourStop,
} from '../types';

export const PORTO_MONUMENTS_GLB_PATH = '/models/porto_monuments.glb';

export const PORTO_MONUMENTS: CityMonument[] = [
  {
    "id": "monument-dom-luis-bridge",
    "nodeName": "Monument_dom_luis_bridge",
    "name": "Ponte Dom Luís I",
    "localName": "Ponte Dom Luís I",
    "year": 1886,
    "completedYear": 1886,
    "architect": "172m Double-Deck Riveted Belgian Wrought-Iron Arch (Théophile Seyrig / Société de Willebroeck, 1886)",
    "architecturalStyle": "172m Double-Deck Riveted Belgian Wrought-Iron Arch (Théophile Seyrig / Société de Willebroeck, 1886)",
    "lat": 41.13995,
    "lon": -8.60945,
    "x": 1.36,
    "z": 7.53,
    "baseElevationMeters": 0,
    "scale": 0.78,
    "rotationY": -1.344,
    "primaryColor": "#48525c",
    "secondaryColor": "#b5ada2",
    "accentColor": "#ffc709",
    "archetype": "steel_arch_bridge",
    "fact": "Designed by Gustave Eiffel’s former partner Théophile Seyrig and inaugurated on October 31, 1886 with the longest iron arch span in the world (172m); its upper deck 60 meters above the Douro carries Metro do Porto Line D.",
    "facts": [
      "Designed by Gustave Eiffel’s former partner Théophile Seyrig and inaugurated on October 31, 1886 with the longest iron arch span in the world (172m); its upper deck 60 meters above the Douro carries Metro do Porto Line D."
    ],
    "historicalSummary": "Designed by Gustave Eiffel’s former partner Théophile Seyrig and inaugurated on October 31, 1886 with the longest iron arch span in the world (172m); its upper deck 60 meters above the Douro carries Metro do Porto Line D.",
    "metroConnection": "Connected via D",
    "svgPath": "M6 44 Q32 12 58 44 M6 38 L58 38 M12 48 L12 28 M52 48 L52 28"
  },
  {
    "id": "monument-clerigos-tower",
    "nodeName": "Monument_clerigos_tower",
    "name": "Torre dos Clérigos",
    "localName": "Torre dos Clérigos",
    "year": 1763,
    "completedYear": 1763,
    "architect": "75.6m Six-Story Carved Granite Baroque Campanile & Elliptical Church (Nicolau Nasoni, 1763)",
    "architecturalStyle": "75.6m Six-Story Carved Granite Baroque Campanile & Elliptical Church (Nicolau Nasoni, 1763)",
    "lat": 41.145785,
    "lon": -8.614109,
    "x": -3.33,
    "z": -0.25,
    "baseElevationMeters": 0,
    "scale": 0.8,
    "rotationY": -1.235,
    "primaryColor": "#b8b0a4",
    "secondaryColor": "#dcd6cc",
    "accentColor": "#c95b3c",
    "archetype": "clock_tower_terminus",
    "fact": "Masterpiece of Italian architect Nicolau Nasoni completed in 1763; its 75.6-meter carved granite bell tower served for centuries as the maritime beacon for Port wine ships entering the Douro estuary.",
    "facts": [
      "Masterpiece of Italian architect Nicolau Nasoni completed in 1763; its 75.6-meter carved granite bell tower served for centuries as the maritime beacon for Port wine ships entering the Douro estuary."
    ],
    "historicalSummary": "Masterpiece of Italian architect Nicolau Nasoni completed in 1763; its 75.6-meter carved granite bell tower served for centuries as the maritime beacon for Port wine ships entering the Douro estuary.",
    "metroConnection": "Connected via D, G",
    "svgPath": "M12 52 L52 52 L52 38 L38 38 L38 10 L32 6 L26 10 L26 38 L12 38 Z"
  },
  {
    "id": "monument-sao-bento-station",
    "nodeName": "Monument_sao_bento_station",
    "name": "Estação de São Bento",
    "localName": "Estação de São Bento",
    "year": 1916,
    "completedYear": 1916,
    "architect": "French Beaux-Arts Granite Mansard Terminal & 20,000 Cobalt-Blue Azulejo Tiles (José Marques da Silva & Jorge Colaço, 1916)",
    "architecturalStyle": "French Beaux-Arts Granite Mansard Terminal & 20,000 Cobalt-Blue Azulejo Tiles (José Marques da Silva & Jorge Colaço, 1916)",
    "lat": 41.145525,
    "lon": -8.610282,
    "x": 0.52,
    "z": 0.1,
    "baseElevationMeters": 0,
    "scale": 0.78,
    "rotationY": -0.1,
    "primaryColor": "#c8c2b8",
    "secondaryColor": "#364554",
    "accentColor": "#1b569c",
    "archetype": "beaux_arts_terminus",
    "fact": "Built on the site of the 16th-century Convent of São Bento de Avé-Maria by architect José Marques da Silva and adorned with 20,000 hand-painted cobalt-blue and white Azulejo ceramic tiles by Jorge Colaço depicting Portuguese history and transport.",
    "facts": [
      "Built on the site of the 16th-century Convent of São Bento de Avé-Maria by architect José Marques da Silva and adorned with 20,000 hand-painted cobalt-blue and white Azulejo ceramic tiles by Jorge Colaço depicting Portuguese history and transport."
    ],
    "historicalSummary": "Built on the site of the 16th-century Convent of São Bento de Avé-Maria by architect José Marques da Silva and adorned with 20,000 hand-painted cobalt-blue and white Azulejo ceramic tiles by Jorge Colaço depicting Portuguese history and transport.",
    "metroConnection": "Connected via D, G",
    "svgPath": "M8 50 L8 26 L56 26 L56 50 Z M16 50 L16 34 A6 6 0 0 1 28 34 L28 50 M36 50 L36 34 A6 6 0 0 1 48 34 L48 50"
  },
  {
    "id": "monument-casa-da-musica",
    "nodeName": "Monument_casa_da_musica",
    "name": "Casa da Música",
    "localName": "Casa da Música",
    "year": 2005,
    "completedYear": 2005,
    "architect": "Faceted White Concrete Polyhedron & Corrugated Glass Curtain Walls on Travertine Wave Plaza (Rem Koolhaas / OMA, 2005)",
    "architecturalStyle": "Faceted White Concrete Polyhedron & Corrugated Glass Curtain Walls on Travertine Wave Plaza (Rem Koolhaas / OMA, 2005)",
    "lat": 41.158802,
    "lon": -8.63078,
    "x": -20.08,
    "z": -17.6,
    "baseElevationMeters": 0,
    "scale": 0.8,
    "rotationY": 0.013,
    "primaryColor": "#f2efe9",
    "secondaryColor": "#72a8c8",
    "accentColor": "#e2b878",
    "archetype": "calatrava_cantilever",
    "fact": "Conceived for Porto 2001 European Capital of Culture by Rem Koolhaas (OMA) and inaugurated in April 2005 beside Casa da Música Metro station, resting like a crystalline white meteor on a golden travertine wave.",
    "facts": [
      "Conceived for Porto 2001 European Capital of Culture by Rem Koolhaas (OMA) and inaugurated in April 2005 beside Casa da Música Metro station, resting like a crystalline white meteor on a golden travertine wave."
    ],
    "historicalSummary": "Conceived for Porto 2001 European Capital of Culture by Rem Koolhaas (OMA) and inaugurated in April 2005 beside Casa da Música Metro station, resting like a crystalline white meteor on a golden travertine wave.",
    "metroConnection": "Connected via A, B, C, E, F, G",
    "svgPath": "M6 44 L58 26 L48 44 L14 48 Z M18 48 L46 48"
  },
  {
    "id": "monument-se-do-porto",
    "nodeName": "Monument_se_do_porto",
    "name": "Sé do Porto (Porto Cathedral)",
    "localName": "Sé do Porto (Porto Cathedral)",
    "year": 1110,
    "completedYear": 1110,
    "architect": "Romanesque Crenellated Granite Twin-Tower Cathedral, Gothic Rose Window & Nasoni Baroque Loggia (1110–1737)",
    "architecturalStyle": "Romanesque Crenellated Granite Twin-Tower Cathedral, Gothic Rose Window & Nasoni Baroque Loggia (1110–1737)",
    "lat": 41.142792,
    "lon": -8.611219,
    "x": -0.42,
    "z": 3.74,
    "baseElevationMeters": 0,
    "scale": 0.78,
    "rotationY": 0.052,
    "primaryColor": "#9e978e",
    "secondaryColor": "#d9d2c7",
    "accentColor": "#1b569c",
    "archetype": "twin_spire_cathedral",
    "fact": "Founded around 1110 atop the ancient Roman and Suebi citadel overlooking the Douro, where King João I wed Philippa of Lancaster in 1387 to seal the Anglo-Portuguese Alliance, and enriched with silver Baroque cloister azulejos.",
    "facts": [
      "Founded around 1110 atop the ancient Roman and Suebi citadel overlooking the Douro, where King João I wed Philippa of Lancaster in 1387 to seal the Anglo-Portuguese Alliance, and enriched with silver Baroque cloister azulejos."
    ],
    "historicalSummary": "Founded around 1110 atop the ancient Roman and Suebi citadel overlooking the Douro, where King João I wed Philippa of Lancaster in 1387 to seal the Anglo-Portuguese Alliance, and enriched with silver Baroque cloister azulejos.",
    "metroConnection": "Connected via D",
    "svgPath": "M14 52 L14 24 L20 8 L26 24 L38 24 L44 8 L50 24 L50 52 Z"
  },
  {
    "id": "monument-palacio-da-bolsa",
    "nodeName": "Monument_palacio_da_bolsa",
    "name": "Palácio da Bolsa & Igreja de São Francisco",
    "localName": "Palácio da Bolsa & Igreja de São Francisco",
    "year": 1850,
    "completedYear": 1850,
    "architect": "Neoclassical Granite Stock Exchange, Octagonal Glass Pátio das Nações & Gilded Moorish Salão Árabe (1842–1910)",
    "architecturalStyle": "Neoclassical Granite Stock Exchange, Octagonal Glass Pátio das Nações & Gilded Moorish Salão Árabe (1842–1910)",
    "lat": 41.1414,
    "lon": -8.6156,
    "x": -4.82,
    "z": 5.6,
    "baseElevationMeters": 0,
    "scale": 0.76,
    "rotationY": -0.042,
    "primaryColor": "#d4cec3",
    "secondaryColor": "#8c857b",
    "accentColor": "#d4af37",
    "archetype": "domed_sandstone_arcade",
    "fact": "Erected by the Commercial Association of Porto next to the 14th-century Gothic Church of São Francisco (famed for its gilded talha dourada woodwork), featuring the glass-domed Pátio das Nações and dazzling golden Salão Árabe.",
    "facts": [
      "Erected by the Commercial Association of Porto next to the 14th-century Gothic Church of São Francisco (famed for its gilded talha dourada woodwork), featuring the glass-domed Pátio das Nações and dazzling golden Salão Árabe."
    ],
    "historicalSummary": "Erected by the Commercial Association of Porto next to the 14th-century Gothic Church of São Francisco (famed for its gilded talha dourada woodwork), featuring the glass-domed Pátio das Nações and dazzling golden Salão Árabe.",
    "metroConnection": "Connected via D",
    "svgPath": "M8 50 L8 32 L56 32 L56 50 Z M22 32 A10 10 0 0 1 42 32 M32 22 L32 14"
  },
  {
    "id": "monument-livraria-lello",
    "nodeName": "Monument_livraria_lello",
    "name": "Livraria Lello",
    "localName": "Livraria Lello",
    "year": 1906,
    "completedYear": 1906,
    "architect": "Neo-Gothic & Art Nouveau Tracery Facade, Stained-Glass Skylight & Crimson Forked Staircase (Xavier Esteves, 1906)",
    "architecturalStyle": "Neo-Gothic & Art Nouveau Tracery Facade, Stained-Glass Skylight & Crimson Forked Staircase (Xavier Esteves, 1906)",
    "lat": 41.146965,
    "lon": -8.614919,
    "x": -4.14,
    "z": -1.82,
    "baseElevationMeters": 0,
    "scale": 0.74,
    "rotationY": -0.593,
    "primaryColor": "#f5f0e6",
    "secondaryColor": "#7a2021",
    "accentColor": "#1b569c",
    "archetype": "twin_tower_gateway",
    "fact": "Inaugurated on January 13, 1906 by brothers José and António Lello and engineered by Francisco Xavier Esteves, featuring a sculpted Neo-Gothic white facade and a sinuous crimson-red double staircase beneath a stained-glass motto \"Decus in Labore\".",
    "facts": [
      "Inaugurated on January 13, 1906 by brothers José and António Lello and engineered by Francisco Xavier Esteves, featuring a sculpted Neo-Gothic white facade and a sinuous crimson-red double staircase beneath a stained-glass motto \"Decus in Labore\"."
    ],
    "historicalSummary": "Inaugurated on January 13, 1906 by brothers José and António Lello and engineered by Francisco Xavier Esteves, featuring a sculpted Neo-Gothic white facade and a sinuous crimson-red double staircase beneath a stained-glass motto \"Decus in Labore\".",
    "metroConnection": "Connected via D, G",
    "svgPath": "M14 52 L18 14 L26 14 L28 52 M36 52 L38 14 L46 14 L50 52 M8 38 L56 38"
  },
  {
    "id": "monument-port-wine-lodges",
    "nodeName": "Monument_port_wine_lodges",
    "name": "Caves de Vinho do Porto & Serra do Pilar",
    "localName": "Caves de Vinho do Porto & Serra do Pilar",
    "year": 1678,
    "completedYear": 1678,
    "architect": "Terraced Whitewashed Port Wine Lodges, Rabelo Boats & Circular Renaissance Dome of Serra do Pilar (1538–1890)",
    "architecturalStyle": "Terraced Whitewashed Port Wine Lodges, Rabelo Boats & Circular Renaissance Dome of Serra do Pilar (1538–1890)",
    "lat": 41.1375,
    "lon": -8.61243,
    "x": -1.64,
    "z": 10.8,
    "baseElevationMeters": 0,
    "scale": 0.8,
    "rotationY": 0.388,
    "primaryColor": "#f4efe6",
    "secondaryColor": "#c4512d",
    "accentColor": "#721b29",
    "archetype": "baroque_dome_cathedral",
    "fact": "Rising in terraced terracotta-roofed ranks up the north-facing granite slopes of Vila Nova de Gaia where Port wine from the Douro Valley ages in oak vats below the UNESCO circular church and cloister of Mosteiro da Serra do Pilar.",
    "facts": [
      "Rising in terraced terracotta-roofed ranks up the north-facing granite slopes of Vila Nova de Gaia where Port wine from the Douro Valley ages in oak vats below the UNESCO circular church and cloister of Mosteiro da Serra do Pilar."
    ],
    "historicalSummary": "Rising in terraced terracotta-roofed ranks up the north-facing granite slopes of Vila Nova de Gaia where Port wine from the Douro Valley ages in oak vats below the UNESCO circular church and cloister of Mosteiro da Serra do Pilar.",
    "metroConnection": "Connected via D",
    "svgPath": "M12 50 L12 34 L52 34 L52 50 Z M20 34 A12 14 0 0 1 44 34 M32 20 L32 10"
  }
];

export const PORTO_MILESTONES: CityHistoricalMilestone[] = [
  {
    "year": 1877,
    "title": "1877",
    "description": "Nov 4, 1877: Gustave Eiffel & Théophile Seyrig inaugurate Ponte Maria Pia & Porto-Campanhã rail link",
    "category": "metro"
  },
  {
    "year": 1886,
    "title": "1886",
    "description": "Oct 31, 1886: Opening of Théophile Seyrig’s double-deck Ponte Dom Luís I across the Douro gorge",
    "category": "metro"
  },
  {
    "year": 1895,
    "title": "1895",
    "description": "Sept 12, 1895: Porto inaugurates the Iberian Peninsula’s first electric tramway network (Elétricos do Porto)",
    "category": "metro"
  },
  {
    "year": 1906,
    "title": "1906",
    "description": "Jan 13, 1906: Opening of Livraria Lello & remodeling of Avenida dos Aliados civic core",
    "category": "metro"
  },
  {
    "year": 1916,
    "title": "1916",
    "description": "Oct 5, 1916: Inauguration of Estação de São Bento with 20,000 cobalt-blue Azulejo tiles by Jorge Colaço",
    "category": "metro"
  },
  {
    "year": 1963,
    "title": "1963",
    "description": "June 22, 1963: Edgar Cardoso’s Ponte da Arrábida opens with the world’s longest concrete arch span",
    "category": "metro"
  },
  {
    "year": 1996,
    "title": "1996",
    "description": "Dec 1996: Historic Centre of Porto, Ponte Luís I & Serra do Pilar inscribed as UNESCO World Heritage",
    "category": "metro"
  },
  {
    "year": 2002,
    "title": "2002",
    "description": "Dec 7, 2002: Metro do Porto Line A (Linha Azul) opens between Senhor de Matosinhos and Trindade",
    "category": "metro"
  },
  {
    "year": 2005,
    "title": "2005",
    "description": "2005: Casa da Música opens & Line D (Linha Amarela) crosses the upper deck of Ponte Dom Luís I to Gaia",
    "category": "metro"
  },
  {
    "year": 2006,
    "title": "2006",
    "description": "May 2006: Line E (Violeta) connects Francisco Sá Carneiro Airport & Line B/C/F trunk expands",
    "category": "metro"
  },
  {
    "year": 2026,
    "title": "2026",
    "description": "2025–2026: Line G (Linha Rosa) underground arc links São Bento, Hospital Santo António & Casa da Música",
    "category": "metro"
  }
];

export const PORTO_ERAS: CityEraDescription[] = [
  {
    "id": "porto_era_1",
    "name": "Eiffel, Seyrig & the Douro Iron Arch Revolution",
    "yearRange": [
      1877,
      1915
    ],
    "tagline": "IRON BRIDGES & ELECTRIC TRAMS • 1877–1915",
    "summary": "Perched on twin granite cliffs above the Douro River, Porto leaped into the industrial age with Gustave Eiffel and Théophile Seyrig’s 1877 Ponte Maria Pia and 1886 double-deck Ponte Dom Luís I, followed by the Iberian Peninsula’s first electric tramway in 1895."
  },
  {
    "id": "porto_era_2",
    "name": "Estação de São Bento & Avenida dos Aliados",
    "yearRange": [
      1916,
      1962
    ],
    "tagline": "AZULEJO & GRANITE MODERNITY • 1916–1962",
    "summary": "Architect José Marques da Silva and ceramicist Jorge Colaço crowned Porto’s railway heart at São Bento in 1916 with 20,000 blue-and-white Azulejo tiles while Englisharchitect Barry Parker carved the grand granite boulevard of Avenida dos Aliados."
  },
  {
    "id": "porto_era_3",
    "name": "Edgar Cardoso’s Bridges, Siza Vieira & UNESCO Inscription",
    "yearRange": [
      1963,
      2001
    ],
    "tagline": "ARRÁBIDA ARCH & UNESCO HERITAGE • 1963–2001",
    "summary": "Pioneering structural engineer Edgar Cardoso spanned the Douro estuary with Ponte da Arrábida (1963) and Ponte de São João (1991), while Pritzker laureates Álvaro Siza Vieira and Eduardo Souto de Moura shaped contemporary Portuguese architecture."
  },
  {
    "id": "porto_era_4",
    "name": "Subterranean Granite Stations, Casa da Música & Line G",
    "yearRange": [
      2002,
      2026
    ],
    "tagline": "METRO DO PORTO & SOUTO DE MOURA • 2002–2026",
    "summary": "Designed with architectural coordination by Pritzker Prize winner Eduardo Souto de Moura, Metro do Porto wove six underground and surface lines through Trindade, São Bento, Casa da Música, and across the upper deck of Ponte Dom Luís I, joined in 2025–2026 by the subterranean Pink Line (Linha G)."
  }
];

export const PORTO_TOUR_STOPS: CityTourStop[] = [
  {
    "id": "tour-porto-dom-luis-seyrig",
    "title": "Ponte Dom Luís I: Eiffel’s Partner & the 1886 Double-Deck Iron Arch",
    "year": 1886,
    "lat": 41.14,
    "lon": -8.6095,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "After co-designing the single-deck railway Ponte Maria Pia with Gustave Eiffel in 1877, Belgian-born engineer Théophile Seyrig broke away to win the 1880 competition for Ponte Dom Luís I with a bold 172m arch carrying two roadways—one at river level and one 60m high that now carries Metro Line D.",
    "highlightMonumentId": "monument-dom-luis-bridge",
    "highlightStationName": "jardim-do-morro",
    "x": 1.31,
    "z": 7.47
  },
  {
    "id": "tour-porto-sao-bento-azulejos",
    "title": "Estação de São Bento: 20,000 Cobalt-Blue Azulejo Tiles",
    "year": 1916,
    "lat": 41.1456,
    "lon": -8.6106,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Between 1905 and 1916, painter Jorge Colaço glazed 20,000 tin-glazed ceramic tiles inside José Marques da Silva’s Beaux-Arts vestibule, depicting King João I and Philippa of Lancaster’s 1387 wedding in Porto, Prince Henry the Navigator’s 1415 conquest of Ceuta, and a colorful frieze of transport history.",
    "highlightMonumentId": "monument-sao-bento-station",
    "highlightStationName": "sao-bento",
    "x": 0.2,
    "z": 0
  },
  {
    "id": "tour-porto-clerigos-nasoni",
    "title": "Torre dos Clérigos & Nicolau Nasoni’s Baroque Skyline",
    "year": 1900,
    "lat": 41.1458,
    "lon": -8.614,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Arriving from Tuscany in 1725, Nicolau Nasoni spent 30 years sculpting the elliptical Igreja and 75.6m Torre dos Clérigos out of hard Porto granite—refusing any payment from the Brotherhood of the Clérigos and asking only to be buried in its crypt.",
    "highlightMonumentId": "monument-clerigos-tower",
    "highlightStationName": "hospital-santo-antonio",
    "x": -3.22,
    "z": -0.27
  },
  {
    "id": "tour-porto-livraria-lello",
    "title": "Livraria Lello: Neo-Gothic Craft & the Crimson Staircase",
    "year": 1906,
    "lat": 41.1468,
    "lon": -8.6148,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Though its interior looks like carved dark wood and crimson plaster, engineer Francisco Xavier Esteves built Livraria Lello’s famous forked floating staircase in 1906 as one of Portugal’s earliest daring experiments in reinforced concrete.",
    "highlightMonumentId": "monument-livraria-lello",
    "highlightStationName": "aliados",
    "x": -4.02,
    "z": -1.6
  },
  {
    "id": "tour-porto-gaia-port-wine",
    "title": "Cais de Gaia, Rabelo Boats & Three Centuries of Port Wine",
    "year": 1900,
    "lat": 41.1375,
    "lon": -8.6125,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "In 1756, the Marquis of Pombal demarcated the Douro Valley as the world’s first regulated wine region; wooden Rabelo boats carried barrels down the rapids to age in the cooler, north-facing granite cellars of Vila Nova de Gaia, sheltered from the direct southern sun.",
    "highlightMonumentId": "monument-port-wine-lodges",
    "highlightStationName": "jardim-do-morro",
    "x": -1.71,
    "z": 10.8
  },
  {
    "id": "tour-porto-casa-da-musica-souto-moura",
    "title": "Casa da Música & Eduardo Souto de Moura’s Metro Architecture",
    "year": 2005,
    "lat": 41.1589,
    "lon": -8.6307,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "While Rem Koolhaas (OMA) sculpted the faceted white concrete polyhedron of Casa da Música (2005), Porto-born Pritzker laureates Eduardo Souto de Moura and Álvaro Siza Vieira designed the raw granite and skylit stations of Metro do Porto directly alongside it.",
    "highlightMonumentId": "monument-casa-da-musica",
    "highlightStationName": "casa-da-musica",
    "x": -20,
    "z": -17.73
  }
];
