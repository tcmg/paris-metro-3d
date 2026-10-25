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

export const WARSAW_MONUMENTS_GLB_PATH = '/models/warsaw_monuments.glb';

export const WARSAW_MONUMENTS: CityMonument[] = [
  {
    "id": "monument-palace-culture",
    "nodeName": "Monument_palace_culture",
    "name": "Palace of Culture and Science (Pałac Kultury i Nauki)",
    "localName": "Pałac Kultury i Nauki (PKiN)",
    "year": 1955,
    "completedYear": 1955,
    "architect": "Stepped Limestone Tower, Renaissance Attics & Millennium Clock (Lev Rudnev, 237m)",
    "architecturalStyle": "Stepped Limestone Tower, Renaissance Attics & Millennium Clock (Lev Rudnev, 237m)",
    "lat": 52.2318,
    "lon": 21.006,
    "x": -0.53,
    "z": 0.12,
    "baseElevationMeters": 0,
    "scale": 0.9,
    "rotationY": 0.343,
    "primaryColor": "#e6dcc8",
    "secondaryColor": "#c2b49a",
    "accentColor": "#f4b942",
    "archetype": "empire_state_tower",
    "fact": "Completed in July 1955 at 237 meters with over 3,200 rooms, Congress Hall, theaters, and Renaissance-inspired attics modeled after Kraków and Zamość, PKiN anchors the M1/M2 Świętokrzyska and Centrum metro crossroads.",
    "facts": [
      "Completed in July 1955 at 237 meters with over 3,200 rooms, Congress Hall, theaters, and Renaissance-inspired attics modeled after Kraków and Zamość, PKiN anchors the M1/M2 Świętokrzyska and Centrum metro crossroads."
    ],
    "historicalSummary": "Completed in July 1955 at 237 meters with over 3,200 rooms, Congress Hall, theaters, and Renaissance-inspired attics modeled after Kraków and Zamość, PKiN anchors the M1/M2 Świętokrzyska and Centrum metro crossroads.",
    "metroConnection": "Connected via M1, M2, S1, WKD, T9",
    "svgPath": "M18 52 L18 40 L24 40 L24 20 L28 20 L28 12 L32 4 L36 12 L36 20 L40 20 L40 40 L46 40 L46 52 Z"
  },
  {
    "id": "monument-royal-castle",
    "nodeName": "Monument_royal_castle",
    "name": "Royal Castle & Sigismund’s Column (Zamek Królewski)",
    "localName": "Zamek Królewski w Warszawie i Kolumna Zygmunta",
    "year": 1619,
    "completedYear": 1619,
    "architect": "Early Baroque Royal Residence, Zygmuntowska Clock Tower & 1644 Bronze Column",
    "architecturalStyle": "Early Baroque Royal Residence, Zygmuntowska Clock Tower & 1644 Bronze Column",
    "lat": 52.2477,
    "lon": 21.0147,
    "x": 6.11,
    "z": -19.69,
    "baseElevationMeters": 0,
    "scale": 0.86,
    "rotationY": -1.184,
    "primaryColor": "#c95b42",
    "secondaryColor": "#48967a",
    "accentColor": "#f4b942",
    "archetype": "grand_palace_facade",
    "fact": "Seat of Polish monarchs and the 1791 May 3rd Constitution—the first modern constitution in Europe. Dynamited in 1944 and painstakingly rebuilt by citizens between 1971 and 1984 above the 1949 Trasa W–Z tramway tunnel.",
    "facts": [
      "Seat of Polish monarchs and the 1791 May 3rd Constitution—the first modern constitution in Europe. Dynamited in 1944 and painstakingly rebuilt by citizens between 1971 and 1984 above the 1949 Trasa W–Z tramway tunnel."
    ],
    "historicalSummary": "Seat of Polish monarchs and the 1791 May 3rd Constitution—the first modern constitution in Europe. Dynamited in 1944 and painstakingly rebuilt by citizens between 1971 and 1984 above the 1949 Trasa W–Z tramway tunnel.",
    "metroConnection": "Connected via M1, M2, T26",
    "svgPath": "M8 50 L8 28 L18 20 L26 28 L38 28 L46 20 L56 28 L56 50 Z"
  },
  {
    "id": "monument-lazienki-palace",
    "nodeName": "Monument_lazienki_palace",
    "name": "Palace on the Isle in Łazienki Park (Pałac na Wyspie)",
    "localName": "Pałac na Wyspie — Łazienki Królewskie",
    "year": 1795,
    "completedYear": 1795,
    "architect": "Neoclassical Island Summer Palace, Corinthian Portico & Water Colonnades (Domenico Merlini, 1795)",
    "architecturalStyle": "Neoclassical Island Summer Palace, Corinthian Portico & Water Colonnades (Domenico Merlini, 1795)",
    "lat": 52.21512,
    "lon": 21.03571,
    "x": 22.15,
    "z": 20.91,
    "baseElevationMeters": 0,
    "scale": 0.85,
    "rotationY": 0.023,
    "primaryColor": "#faf6ee",
    "secondaryColor": "#5c9ead",
    "accentColor": "#f4b942",
    "archetype": "beaux_arts_opera",
    "fact": "Transformed between 1772 and 1795 for King Stanisław August Poniatowski into a Neoclassical villa afloat on an artificial island in the Royal Baths Park, hosting the famous Thursday Dinners of the Polish Enlightenment.",
    "facts": [
      "Transformed between 1772 and 1795 for King Stanisław August Poniatowski into a Neoclassical villa afloat on an artificial island in the Royal Baths Park, hosting the famous Thursday Dinners of the Polish Enlightenment."
    ],
    "historicalSummary": "Transformed between 1772 and 1795 for King Stanisław August Poniatowski into a Neoclassical villa afloat on an artificial island in the Royal Baths Park, hosting the famous Thursday Dinners of the Polish Enlightenment.",
    "metroConnection": "Connected via M1",
    "svgPath": "M10 50 L10 30 L20 22 L44 22 L54 30 L54 50 Z M22 22 A10 10 0 0 1 42 22"
  },
  {
    "id": "monument-warszawa-centralna",
    "nodeName": "Monument_warszawa_centralna",
    "name": "Warszawa Centralna & Varso Tower (310m EU Tallest)",
    "localName": "Dworzec Centralny i Varso Tower",
    "year": 1975,
    "completedYear": 1975,
    "architect": "Cantilevered Steel-Glass Station Hall (Arseniusz Romanowicz, 1975) & 310m Varso Tower (Foster + Partners, 2022)",
    "architecturalStyle": "Cantilevered Steel-Glass Station Hall (Arseniusz Romanowicz, 1975) & 310m Varso Tower (Foster + Partners, 2022)",
    "lat": 52.2288,
    "lon": 21.0032,
    "x": -2.67,
    "z": 3.86,
    "baseElevationMeters": 0,
    "scale": 0.88,
    "rotationY": 0.335,
    "primaryColor": "#f2f6fa",
    "secondaryColor": "#3b82f6",
    "accentColor": "#f4b942",
    "archetype": "one_wtc_and_oculus",
    "fact": "Pairing Arseniusz Romanowicz’s bold 1975 winged modernist railway terminal above the Cross-City Line with Foster + Partners’ 310-meter Varso Tower (2022)—the tallest skyscraper in the European Union.",
    "facts": [
      "Pairing Arseniusz Romanowicz’s bold 1975 winged modernist railway terminal above the Cross-City Line with Foster + Partners’ 310-meter Varso Tower (2022)—the tallest skyscraper in the European Union."
    ],
    "historicalSummary": "Pairing Arseniusz Romanowicz’s bold 1975 winged modernist railway terminal above the Cross-City Line with Foster + Partners’ 310-meter Varso Tower (2022)—the tallest skyscraper in the European Union.",
    "metroConnection": "Connected via M1, M2, S1, WKD, T9",
    "svgPath": "M16 52 L20 12 L24 4 L28 12 L32 52 M36 50 Q46 34 58 42 L48 50 Z"
  },
  {
    "id": "monument-stadion-narodowy",
    "nodeName": "Monument_stadion_narodowy",
    "name": "PGE Narodowy National Stadium (Stadion Narodowy)",
    "localName": "PGE Narodowy",
    "year": 2012,
    "completedYear": 2012,
    "architect": "Woven Polish-Flag Facade, Radial Cable-Net Roof & 114m Suspended Spire (JSK Architekci, 2012)",
    "architecturalStyle": "Woven Polish-Flag Facade, Radial Cable-Net Roof & 114m Suspended Spire (JSK Architekci, 2012)",
    "lat": 52.239412,
    "lon": 21.045695,
    "x": 29.78,
    "z": -9.36,
    "baseElevationMeters": 0,
    "scale": 0.85,
    "rotationY": 0.563,
    "primaryColor": "#f8fafc",
    "secondaryColor": "#dc143c",
    "accentColor": "#f4b942",
    "archetype": "stadium_bowl",
    "fact": "Built inside the earthen bowl of the 1955 10th-Anniversary Stadium for UEFA Euro 2012, its undulating red-and-white aluminum mesh facade waves like the Polish national flag above the M2/M3 Stadion Narodowy interchange.",
    "facts": [
      "Built inside the earthen bowl of the 1955 10th-Anniversary Stadium for UEFA Euro 2012, its undulating red-and-white aluminum mesh facade waves like the Polish national flag above the M2/M3 Stadion Narodowy interchange."
    ],
    "historicalSummary": "Built inside the earthen bowl of the 1955 10th-Anniversary Stadium for UEFA Euro 2012, its undulating red-and-white aluminum mesh facade waves like the Polish national flag above the M2/M3 Stadion Narodowy interchange.",
    "metroConnection": "Connected via M2, M3, S1, T9",
    "svgPath": "M8 38 Q32 22 56 38 L52 48 Q32 54 12 48 Z M14 38 Q32 30 50 38"
  },
  {
    "id": "monument-stare-miasto-siren",
    "nodeName": "Monument_stare_miasto_siren",
    "name": "Old Town Market Square & Warsaw Mermaid (Rynek i Syrenka)",
    "localName": "Rynek Starego Miasta i Pomnik Syrenki",
    "year": 1855,
    "completedYear": 1855,
    "architect": "Polychrome Renaissance Burgher Tenements & Konstanty Hegel’s Armed Bronze Mermaid (1855)",
    "architecturalStyle": "Polychrome Renaissance Burgher Tenements & Konstanty Hegel’s Armed Bronze Mermaid (1855)",
    "lat": 52.2497,
    "lon": 21.0122,
    "x": 4.2,
    "z": -22.18,
    "baseElevationMeters": 0,
    "scale": 0.84,
    "rotationY": -0.849,
    "primaryColor": "#d97736",
    "secondaryColor": "#48967a",
    "accentColor": "#f4b942",
    "archetype": "grand_palace_facade",
    "fact": "Founded at the turn of the 14th century and reconstructed stone-by-stone after WWII using Bernardo Bellotto (Canaletto) paintings, centered on Konstanty Hegel’s 1855 bronze Syrenka raising her sword and shield.",
    "facts": [
      "Founded at the turn of the 14th century and reconstructed stone-by-stone after WWII using Bernardo Bellotto (Canaletto) paintings, centered on Konstanty Hegel’s 1855 bronze Syrenka raising her sword and shield."
    ],
    "historicalSummary": "Founded at the turn of the 14th century and reconstructed stone-by-stone after WWII using Bernardo Bellotto (Canaletto) paintings, centered on Konstanty Hegel’s 1855 bronze Syrenka raising her sword and shield.",
    "metroConnection": "Connected via M1, M2, T26",
    "svgPath": "M8 50 L8 28 L18 20 L26 28 L38 28 L46 20 L56 28 L56 50 Z"
  },
  {
    "id": "monument-wilanow-palace",
    "nodeName": "Monument_wilanow_palace",
    "name": "Wilanów Palace — The Polish Versailles (Pałac w Wilanowie)",
    "localName": "Pałac Króla Jana III w Wilanowie",
    "year": 1696,
    "completedYear": 1696,
    "architect": "Baroque Cour d’Honneur, Twin Copper-Helmeted Towers & Gilded Sundials (Augustyn Locci, 1696)",
    "architecturalStyle": "Baroque Cour d’Honneur, Twin Copper-Helmeted Towers & Gilded Sundials (Augustyn Locci, 1696)",
    "lat": 52.1925,
    "lon": 21.0485,
    "x": 31.92,
    "z": 49.1,
    "baseElevationMeters": 0,
    "scale": 0.84,
    "rotationY": -1.299,
    "primaryColor": "#f4c430",
    "secondaryColor": "#faf6ee",
    "accentColor": "#48967a",
    "archetype": "grand_palace_facade",
    "fact": "Built between 1677 and 1696 for King Jan III Sobieski after the Relief of Vienna, Wilanów blends Italian villa rustica, French Baroque palatial wings, and Polish Sarmatian courtly reliefs that survived WWII intact.",
    "facts": [
      "Built between 1677 and 1696 for King Jan III Sobieski after the Relief of Vienna, Wilanów blends Italian villa rustica, French Baroque palatial wings, and Polish Sarmatian courtly reliefs that survived WWII intact."
    ],
    "historicalSummary": "Built between 1677 and 1696 for King Jan III Sobieski after the Relief of Vienna, Wilanów blends Italian villa rustica, French Baroque palatial wings, and Polish Sarmatian courtly reliefs that survived WWII intact.",
    "metroConnection": "Connected via M1",
    "svgPath": "M8 50 L8 28 L18 20 L26 28 L38 28 L46 20 L56 28 L56 50 Z"
  },
  {
    "id": "monument-polin-uprising",
    "nodeName": "Monument_polin_uprising",
    "name": "POLIN Museum & Ghetto Heroes Monument (Muranów)",
    "localName": "Muzeum POLIN i Pomnik Bohaterów Getta",
    "year": 2013,
    "completedYear": 2013,
    "architect": "Luminous Glass Cube with Curving Shotcrete Canyon (Rainer Mahlamäki, 2013) & Bronze Memorial (1948)",
    "architecturalStyle": "Luminous Glass Cube with Curving Shotcrete Canyon (Rainer Mahlamäki, 2013) & Bronze Memorial (1948)",
    "lat": 52.249416,
    "lon": 20.993105,
    "x": -10.38,
    "z": -21.83,
    "baseElevationMeters": 0,
    "scale": 0.85,
    "rotationY": 0.517,
    "primaryColor": "#68b0ab",
    "secondaryColor": "#c87d55",
    "accentColor": "#f4b942",
    "archetype": "art_deco_slab",
    "fact": "Standing face-to-face on Willy Brandt Square in Muranów: Nathan Rapoport’s 1948 Monument to the Ghetto Heroes and Rainer Mahlamäki’s 2013 POLIN Museum, whose luminous glass facade is cleaved by a sculptural canyon.",
    "facts": [
      "Standing face-to-face on Willy Brandt Square in Muranów: Nathan Rapoport’s 1948 Monument to the Ghetto Heroes and Rainer Mahlamäki’s 2013 POLIN Museum, whose luminous glass facade is cleaved by a sculptural canyon."
    ],
    "historicalSummary": "Standing face-to-face on Willy Brandt Square in Muranów: Nathan Rapoport’s 1948 Monument to the Ghetto Heroes and Rainer Mahlamäki’s 2013 POLIN Museum, whose luminous glass facade is cleaved by a sculptural canyon.",
    "metroConnection": "Connected via M1, T26",
    "svgPath": "M22 52 L22 10 L42 10 L42 52 Z M16 52 L16 26 L22 26 M42 26 L48 26 L48 52"
  }
];

export const WARSAW_MILESTONES: CityHistoricalMilestone[] = [
  {
    "year": 1864,
    "title": "1864",
    "description": "Nov 22, 1864: Opening of the Kierbedź Iron Lattice Bridge—Warsaw’s first permanent steel bridge across the Vistula",
    "category": "metro"
  },
  {
    "year": 1908,
    "title": "1908",
    "description": "March 26, 1908: Inauguration of Warsaw’s first electric tramway line from Plac Krasińskich to Plac Unii Lubelskiej",
    "category": "metro"
  },
  {
    "year": 1925,
    "title": "1925",
    "description": "Sept 22, 1925: Warsaw Municipal Tramways passes the first resolution to design an underground Metro network",
    "category": "metro"
  },
  {
    "year": 1933,
    "title": "1933",
    "description": "Sept 2, 1933: Opening of the electrified Cross-City Tunnel (Kolej Średnicowa) beneath Aleje Jerozolimskie",
    "category": "metro"
  },
  {
    "year": 1949,
    "title": "1949",
    "description": "July 22, 1949: Inauguration of the East–West Route (Trasa W–Z) and the Old Town tunnel beneath Castle Square",
    "category": "metro"
  },
  {
    "year": 1955,
    "title": "1955",
    "description": "July 21, 1955: Completion of the 237m Palace of Culture and Science on Plac Defilad",
    "category": "metro"
  },
  {
    "year": 1975,
    "title": "1975",
    "description": "Dec 5, 1975: Opening of Arseniusz Romanowicz’s modernist Warszawa Centralna railway station",
    "category": "metro"
  },
  {
    "year": 1995,
    "title": "1995",
    "description": "April 7, 1995: Inauguration of Warsaw Metro Line M1 (Kabaty ↔ Politechnika)—fulfilling a 70-year dream",
    "category": "metro"
  },
  {
    "year": 2015,
    "title": "2015",
    "description": "March 8, 2015: Opening of Metro Line M2 (Rondo Daszyńskiego ↔ Dworzec Wileński) beneath the Vistula River",
    "category": "metro"
  },
  {
    "year": 2026,
    "title": "2026",
    "description": "2026: Complete M1 & M2 network to Bemowo/Bródno, Line M3 Praga branch & 310m Varso supertall skyline",
    "category": "metro"
  }
];

export const WARSAW_ERAS: CityEraDescription[] = [
  {
    "id": "warsaw_era_1",
    "name": "Kierbedź Iron Bridge, Poniatowski Viaduct & the 1908 Electric Tramway",
    "yearRange": [
      1864,
      1918
    ],
    "tagline": "VISTULA BRIDGES & ELECTRIC TRAMS • 1864–1918",
    "summary": "Following the 1864 Kierbedź iron truss bridge and the 1908 electrification of Warsaw’s streetcars, the monumental 1914 Poniatowski Viaduct linked Aleje Jerozolimskie across the Vistula to Praga."
  },
  {
    "id": "warsaw_era_2",
    "name": "1925 Metro Blueprints, WKD Light Rail & the 1933 Cross-City Tunnel",
    "yearRange": [
      1919,
      1944
    ],
    "tagline": "SECOND REPUBLIC MODERNISM • 1919–1944",
    "summary": "Restored as the capital of independent Poland, Warsaw pioneered electric suburban light rail (EKD/WKD, 1927), bored the 1933 Cross-City railway tunnel beneath downtown, and drafted the 1925–1938 Metro masterplan before WWII."
  },
  {
    "id": "warsaw_era_3",
    "name": "UNESCO Old Town Rebirth, Trasa W–Z, PKiN & Deep Metro Construction",
    "yearRange": [
      1945,
      1994
    ],
    "tagline": "PHOENIX CITY RECONSTRUCTION • 1945–1994",
    "summary": "Rising from 85% wartime destruction, Warsaw meticulously rebuilt its Old Town and Royal Castle using Canaletto’s 18th-century canvases, erected the 237m Palace of Culture (1955) and Warszawa Centralna (1975), and began excavating Line M1 in 1983."
  },
  {
    "id": "warsaw_era_4",
    "name": "Lines M1, M2 & M3, Wojciech Fangor Mosaics & the 310m Varso Tower",
    "yearRange": [
      1995,
      2026
    ],
    "tagline": "METRO WARSZAWSKIE & EUROPEAN SKYLINE • 1995–2026",
    "summary": "Line M1 opened on April 7, 1995 and reached Młociny in 2008. In 2015, Line M2 bored beneath the Vistula with vibrant station typography by Wojciech Fangor, while Wola and Śródmieście rose into one of Europe’s tallest skyscraper clusters."
  }
];

export const WARSAW_TOUR_STOPS: CityTourStop[] = [
  {
    "id": "tour-waw-royal-castle",
    "title": "Plac Zamkowy, Sigismund’s Column & the 1949 Trasa W–Z Tunnel",
    "year": 1984,
    "lat": 52.2477,
    "lon": 21.0147,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "In 1949, engineers bored the Trasa W–Z tramway tunnel directly beneath Castle Square (installing Poland’s first escalator), while citizens rebuilt the Old Town (1953) and Royal Castle (1971–1984) using Canaletto’s 18th-century paintings.",
    "highlightMonumentId": "monument-royal-castle",
    "highlightStationName": "t26-stare-miasto",
    "x": 6.11,
    "z": -19.69
  },
  {
    "id": "tour-waw-stare-miasto-syrenka",
    "title": "Rynek Starego Miasta & the Armed Bronze Mermaid of Warsaw",
    "year": 1953,
    "lat": 52.2497,
    "lon": 21.0122,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Over 85% of Warsaw’s historic core was razed in 1944; its five-year citizen reconstruction (1948–1953) around Konstanty Hegel’s 1855 bronze Syrenka was recognized by UNESCO as an unprecedented triumph of cultural resilience.",
    "highlightMonumentId": "monument-stare-miasto-siren",
    "highlightStationName": "ratusz-arsenal",
    "x": 4.2,
    "z": -22.18
  },
  {
    "id": "tour-waw-polin-muranow",
    "title": "Muranów: POLIN Glass Canyon & the 1948 Ghetto Heroes Monument",
    "year": 2013,
    "lat": 52.2494,
    "lon": 20.993,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Where Nathan Rapoport’s dark bronze Monument to the Ghetto Heroes (1948) honors martyrdom and resistance, Rainer Mahlamäki’s luminous 2013 POLIN Museum parts with a curving shotcrete canyon celebrating 1,000 years of Polish-Jewish life.",
    "highlightMonumentId": "monument-polin-uprising",
    "highlightStationName": "muranow-ghost",
    "x": -10.46,
    "z": -21.81
  },
  {
    "id": "tour-waw-palace-culture-metro",
    "title": "Palace of Culture & Science and the M1/M2 Metro Crossroads",
    "year": 2001,
    "lat": 52.2318,
    "lon": 21.006,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Before designing PKiN, architect Lev Rudnev toured Kazimierz Dolny, Kraków, and Zamość with Polish historians, crowning the 237m tower’s stepped setbacks with Polish Renaissance attics and masonry details.",
    "highlightMonumentId": "monument-palace-culture",
    "highlightStationName": "swietokrzyska",
    "x": -0.53,
    "z": 0.12
  },
  {
    "id": "tour-waw-centralna-varso",
    "title": "From 1975 Modernist Wings to the 310m Tallest Tower in the EU",
    "year": 2022,
    "lat": 52.2288,
    "lon": 21.0032,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Arseniusz Romanowicz’s 1975 Warszawa Centralna pioneered column-free cantilevered steel roofs over the 1933 Cross-City Tunnel; right next door, Foster + Partners’ Varso Tower topped out at 310 meters in 2022 as the tallest building in the European Union.",
    "highlightMonumentId": "monument-warszawa-centralna",
    "highlightStationName": "rondo-onz",
    "x": -2.67,
    "z": 3.86
  },
  {
    "id": "tour-waw-lazienki-narodowy",
    "title": "Palace on the Isle & PGE Narodowy Across the Vistula",
    "year": 2015,
    "lat": 52.2395,
    "lon": 21.0458,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Boring deep beneath the Vistula River bed in 2015, Line M2 surfaces at Stadion Narodowy—built with twin island platforms for Line M3 directly beside JSK Architekci’s red-and-white basket-weave national stadium.",
    "highlightMonumentId": "monument-stadion-narodowy",
    "highlightStationName": "stadion-narodowy",
    "x": 29.86,
    "z": -9.47
  }
];
