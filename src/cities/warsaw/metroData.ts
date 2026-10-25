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

import type { CityMetroLine } from '../types';

export const WARSAW_METRO_SYSTEM_NAME = "Metro Warszawskie, SKM Kolej Średnicowa & Tramwaje Warszawskie (WTP)";

export const WARSAW_METRO_LINES: CityMetroLine[] = [
  {
    "line": "M1",
    "name": "Linia M1 — Kabaty ↔ Młociny",
    "color": "#005CA9",
    "textColor": "#ffffff",
    "openedYear": 1995,
    "rollingStockStyle": "Metro Warszawskie (1995)",
    "stations": [
      {
        "name": "Wierzbno",
        "lat": 52.1986,
        "lon": 21.0167,
        "x": 7.64,
        "z": 41.5,
        "year": 1995,
        "lines": [
          "M1"
        ],
        "fact": "Part of the historic first 11-station section of Line M1 opened on April 7, 1995.",
        "isGhost": false
      },
      {
        "name": "Pole Mokotowskie",
        "lat": 52.2089,
        "lon": 21.0078,
        "x": 0.84,
        "z": 28.66,
        "year": 1995,
        "lines": [
          "M1"
        ],
        "fact": "Serves the Warsaw School of Economics (SGH) and Pole Mokotowskie parklands.",
        "isGhost": false
      },
      {
        "name": "Politechnika",
        "lat": 52.2175,
        "lon": 21.0145,
        "x": 5.96,
        "z": 17.95,
        "year": 1995,
        "lines": [
          "M1"
        ],
        "fact": "Served as the northern terminus of Line M1 on opening day in April 1995, adjacent to Warsaw University of Technology.",
        "isGhost": false
      },
      {
        "name": "Plac Konstytucji (Unbuilt 1989 Reserve)",
        "lat": 52.2225,
        "lon": 21.0158,
        "x": 6.95,
        "z": 11.71,
        "year": 1989,
        "lines": [
          "M1"
        ],
        "fact": "Omitted from the 1989 construction budget for cost reasons; the running tunnels widen beneath Marszałkowska Street for its delayed build-out.",
        "isGhost": true
      },
      {
        "name": "Centrum",
        "lat": 52.2304,
        "lon": 21.0108,
        "x": 3.13,
        "z": 1.87,
        "year": 1998,
        "lines": [
          "M1",
          "T9"
        ],
        "fact": "Warsaw’s busiest metro station beneath Rondo Dmowskiego, framing the Palace of Culture and Science and connecting to Warszawa Śródmieście / Centralna.",
        "isGhost": false
      },
      {
        "name": "Świętokrzyska",
        "lat": 52.2352,
        "lon": 21.0082,
        "x": 1.15,
        "z": -4.11,
        "year": 2001,
        "lines": [
          "M1",
          "M2"
        ],
        "fact": "The sole direct transfer hub between Metro Lines M1 and M2 at the intersection of Marszałkowska and Świętokrzyska streets.",
        "isGhost": false
      },
      {
        "name": "Ratusz Arsenał",
        "lat": 52.2448,
        "lon": 21.0012,
        "x": -4.2,
        "z": -16.08,
        "year": 2001,
        "lines": [
          "M1"
        ],
        "fact": "Gateway to Plac Bankowy, the Saxon Garden, the Royal Arsenal, and the Old Town.",
        "isGhost": false
      },
      {
        "name": "Muranów (Unbuilt 1989 Reserve)",
        "lat": 52.2508,
        "lon": 20.9985,
        "x": -6.26,
        "z": -23.55,
        "year": 1989,
        "lines": [
          "M1"
        ],
        "fact": "Like Plac Konstytucji, Muranów was deferred in 1989 between Ratusz Arsenał and Dworzec Gdański right beside the POLIN Museum.",
        "isGhost": true
      },
      {
        "name": "Dworzec Gdański",
        "lat": 52.2582,
        "lon": 20.9945,
        "x": -9.32,
        "z": -32.78,
        "year": 2003,
        "lines": [
          "M1"
        ],
        "fact": "Connects Line M1 directly with the northern Warszawa Gdańska mainline and SKM railway station.",
        "isGhost": false
      },
      {
        "name": "Plac Wilsona",
        "lat": 52.2688,
        "lon": 20.9852,
        "x": -16.42,
        "z": -45.99,
        "year": 2005,
        "lines": [
          "M1"
        ],
        "fact": "Voted the most beautiful newly built metro station in the world at the 2008 MetroRail Congress for its glowing colour-changing elliptical ceiling.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "M2",
    "name": "Linia M2 — Bemowo ↔ Bródno (Under the Vistula)",
    "color": "#E30613",
    "textColor": "#ffffff",
    "openedYear": 2015,
    "rollingStockStyle": "Metro Warszawskie (Wojciech Fangor Art Stations)",
    "stations": [
      {
        "name": "Płocka",
        "lat": 52.2315,
        "lon": 20.9665,
        "x": -30.7,
        "z": 0.5,
        "year": 2020,
        "lines": [
          "M2"
        ],
        "fact": "Honors Wola’s 19th-century electronics and metalwork heritage with warm copper ceiling panels.",
        "isGhost": false
      },
      {
        "name": "Rondo Daszyńskiego",
        "lat": 52.2302,
        "lon": 20.9842,
        "x": -17.18,
        "z": 2.12,
        "year": 2015,
        "lines": [
          "M2"
        ],
        "fact": "Western anchor of the 2015 M2 central section at the heart of Warsaw’s high-rise financial district.",
        "isGhost": false
      },
      {
        "name": "Rondo ONZ",
        "lat": 52.233,
        "lon": 20.9982,
        "x": -6.49,
        "z": -1.37,
        "year": 2015,
        "lines": [
          "M2"
        ],
        "fact": "Serves the Rondo ONZ skyscraper cluster just north of Varso Tower and Złote Tarasy.",
        "isGhost": false
      },
      {
        "name": "Świętokrzyska",
        "lat": 52.2352,
        "lon": 21.0082,
        "x": 1.15,
        "z": -4.11,
        "year": 2015,
        "lines": [
          "M1",
          "M2"
        ],
        "fact": "Deep M2 platform linked by escalators to the upper M1 station.",
        "isGhost": false
      },
      {
        "name": "Nowy Świat-Uniwersytet",
        "lat": 52.2368,
        "lon": 21.0172,
        "x": 8.02,
        "z": -6.11,
        "year": 2015,
        "lines": [
          "M2"
        ],
        "fact": "Warsaw’s deepest metro station, bored into the Vistula Escarpment beneath the Royal Route and University of Warsaw.",
        "isGhost": false
      },
      {
        "name": "Centrum Nauki Kopernik",
        "lat": 52.24,
        "lon": 21.0285,
        "x": 16.65,
        "z": -10.09,
        "year": 2015,
        "lines": [
          "M2"
        ],
        "fact": "Located right on the west bank of the Vistula beside the Copernicus Science Centre and Świętokrzyski Bridge.",
        "isGhost": false
      },
      {
        "name": "Stadion Narodowy",
        "lat": 52.2435,
        "lon": 21.0432,
        "x": 27.87,
        "z": -14.46,
        "year": 2015,
        "lines": [
          "M2",
          "M3"
        ],
        "fact": "Built with two wide island platforms in emerald green to serve both Line M2 and the branching Line M3.",
        "isGhost": false
      },
      {
        "name": "Dworzec Wileński",
        "lat": 52.2542,
        "lon": 21.0355,
        "x": 21.99,
        "z": -27.79,
        "year": 2015,
        "lines": [
          "M2",
          "T26"
        ],
        "fact": "Major right-bank interchange connecting Line M2 with Warszawa Wileńska suburban trains and historic Praga.",
        "isGhost": false
      },
      {
        "name": "Szwedzka",
        "lat": 52.2615,
        "lon": 21.0448,
        "x": 29.09,
        "z": -36.89,
        "year": 2019,
        "lines": [
          "M2"
        ],
        "fact": "Evokes 19th-century Praga factory architecture along Strzelecka and Stalowa streets.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "M3",
    "name": "Linia M3 — Stadion Narodowy ↔ Gocław (Praga Branch)",
    "color": "#009640",
    "textColor": "#ffffff",
    "openedYear": 2026,
    "rollingStockStyle": "Metro Warszawskie (III Linia)",
    "stations": [
      {
        "name": "Stadion Narodowy",
        "lat": 52.2435,
        "lon": 21.0432,
        "x": 27.87,
        "z": -14.46,
        "year": 2015,
        "lines": [
          "M2",
          "M3"
        ],
        "fact": "Northern terminus of Line M3 using the outer tracks built in 2015.",
        "isGhost": false
      },
      {
        "name": "Dworzec Wschodni",
        "lat": 52.2512,
        "lon": 21.0525,
        "x": 34.97,
        "z": -24.05,
        "year": 2026,
        "lines": [
          "M3"
        ],
        "fact": "Links Line M3 directly beneath the long-distance platforms of Warszawa Wschodnia.",
        "isGhost": false
      },
      {
        "name": "Mińska (Soho Factory)",
        "lat": 52.2468,
        "lon": 21.0598,
        "x": 40.55,
        "z": -18.57,
        "year": 2026,
        "lines": [
          "M3"
        ],
        "fact": "Serves the Soho Factory creative district and Kamionek.",
        "isGhost": false
      },
      {
        "name": "Rondo Wiatraczna",
        "lat": 52.2385,
        "lon": 21.0635,
        "x": 43.37,
        "z": -8.23,
        "year": 2026,
        "lines": [
          "M3",
          "T9"
        ],
        "fact": "Major Grochów transit hub at the eastern convergence of Aleja Waszyngtona and Grochowska.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "S1",
    "name": "SKM Linia S1 / Kolej Średnicowa (Zachodnia ↔ Wschodnia)",
    "color": "#F39200",
    "textColor": "#ffffff",
    "openedYear": 1933,
    "rollingStockStyle": "PKP / Szybka Kolej Miejska (1933 Cross-City Tunnel)",
    "stations": [
      {
        "name": "Warszawa Zachodnia",
        "lat": 52.2202,
        "lon": 20.9652,
        "x": -31.69,
        "z": 14.58,
        "year": 1933,
        "lines": [
          "S1"
        ],
        "fact": "Poland’s busiest railway junction by train movements at the western portal of the Cross-City Line.",
        "isGhost": false
      },
      {
        "name": "Warszawa Ochota",
        "lat": 52.226,
        "lon": 20.9905,
        "x": -12.37,
        "z": 7.35,
        "year": 1963,
        "lines": [
          "S1"
        ],
        "fact": "Masterpiece of Polish postwar structural expressionism with a thin sweeping saddle-curve concrete shell.",
        "isGhost": false
      },
      {
        "name": "Warszawa Śródmieście / Centralna",
        "lat": 52.2304,
        "lon": 21.0108,
        "x": 3.13,
        "z": 1.87,
        "year": 1933,
        "lines": [
          "S1"
        ],
        "fact": "Underground commuter and intercity heart of the Cross-City Line linked with Metro Centrum.",
        "isGhost": false
      },
      {
        "name": "Warszawa Powiśle",
        "lat": 52.2335,
        "lon": 21.0235,
        "x": 12.83,
        "z": -1.99,
        "year": 1963,
        "lines": [
          "S1"
        ],
        "fact": "Emerges from the Vistula Escarpment tunnel onto the Poniatowski/Średnicowy bridge approach.",
        "isGhost": false
      },
      {
        "name": "Warszawa Stadion",
        "lat": 52.2435,
        "lon": 21.0432,
        "x": 27.87,
        "z": -14.46,
        "year": 1955,
        "lines": [
          "S1"
        ],
        "fact": "Direct transfer between SKM Cross-City trains and Metro Lines M2/M3 at PGE Narodowy.",
        "isGhost": false
      },
      {
        "name": "Warszawa Wschodnia",
        "lat": 52.2512,
        "lon": 21.0525,
        "x": 34.97,
        "z": -24.05,
        "year": 1933,
        "lines": [
          "S1"
        ],
        "fact": "Main right-bank railway terminal for eastern intercity and suburban trains.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "WKD",
    "name": "WKD — Warszawska Kolej Dojazdowa (Śródmieście ↔ Reduta Ordona)",
    "color": "#008B8B",
    "textColor": "#ffffff",
    "openedYear": 1927,
    "rollingStockStyle": "Elektryczna Kolej Dojazdowa (EKD, 1927)",
    "stations": [
      {
        "name": "Warszawa Śródmieście WKD",
        "lat": 52.2304,
        "lon": 21.0108,
        "x": 3.13,
        "z": 1.87,
        "year": 1963,
        "lines": [
          "WKD"
        ],
        "fact": "Downtown terminus of the historic WKD electric light rail.",
        "isGhost": false
      },
      {
        "name": "Warszawa Ochota WKD",
        "lat": 52.226,
        "lon": 20.9905,
        "x": -12.37,
        "z": 7.35,
        "year": 1963,
        "lines": [
          "WKD"
        ],
        "fact": "Shares the iconic hyperbolic paraboloid entrance pavilion at Plac Zawiszy.",
        "isGhost": false
      },
      {
        "name": "Warszawa Zachodnia WKD",
        "lat": 52.2202,
        "lon": 20.9652,
        "x": -31.69,
        "z": 14.58,
        "year": 1927,
        "lines": [
          "WKD"
        ],
        "fact": "Connects WKD light rail with the Warszawa Zachodnia mainline hub.",
        "isGhost": false
      },
      {
        "name": "Warszawa Reduta Ordona",
        "lat": 52.2145,
        "lon": 20.9525,
        "x": -41.39,
        "z": 21.68,
        "year": 1927,
        "lines": [
          "WKD"
        ],
        "fact": "Named after the historic 1831 Polish November Uprising redoubt.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "T9",
    "name": "Tramwaj Linia 9 — Aleje Jerozolimskie & Most Poniatowskiego",
    "color": "#FFB800",
    "textColor": "#10141c",
    "openedYear": 1908,
    "rollingStockStyle": "Tramwaje Warszawskie (1908)",
    "stations": [
      {
        "name": "Plac Zawiszy",
        "lat": 52.226,
        "lon": 20.9905,
        "x": -12.37,
        "z": 7.35,
        "year": 1908,
        "lines": [
          "T9"
        ],
        "fact": "Gateway to Aleje Jerozolimskie.",
        "isGhost": false
      },
      {
        "name": "Centrum (Rondo Dmowskiego)",
        "lat": 52.2304,
        "lon": 21.0108,
        "x": 3.13,
        "z": 1.87,
        "year": 1908,
        "lines": [
          "M1",
          "T9"
        ],
        "fact": "Crossroads of Warsaw’s north-south and east-west tramway trunks.",
        "isGhost": false
      },
      {
        "name": "Muzeum Narodowe (Rondo de Gaulle’a)",
        "lat": 52.2318,
        "lon": 21.0205,
        "x": 10.54,
        "z": 0.12,
        "year": 1914,
        "lines": [
          "T9"
        ],
        "fact": "Located at the intersection of Nowy Świat and Aleje Jerozolimskie before the Poniatowski Viaduct.",
        "isGhost": false
      },
      {
        "name": "Most Poniatowskiego Viaduct",
        "lat": 52.2352,
        "lon": 21.0398,
        "x": 25.28,
        "z": -4.11,
        "year": 1914,
        "lines": [
          "T9"
        ],
        "fact": "Crosses high above Powiśle and the Vistula River between Neo-Renaissance turret pavilions.",
        "isGhost": false
      },
      {
        "name": "Rondo Wiatraczna (Grochów)",
        "lat": 52.2385,
        "lon": 21.0635,
        "x": 43.37,
        "z": -8.23,
        "year": 1925,
        "lines": [
          "M3",
          "T9"
        ],
        "fact": "Eastern Praga hub after traversing Aleja Waszyngtona alongside Skaryszewski Park.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "T26",
    "name": "Tramwaj Linia 26 — Trasa W–Z & Stare Miasto Tunnel",
    "color": "#8E24AA",
    "textColor": "#ffffff",
    "openedYear": 1949,
    "rollingStockStyle": "Tramwaje Warszawskie (1949 Trasa W–Z)",
    "stations": [
      {
        "name": "Młynów / Wolska",
        "lat": 52.2315,
        "lon": 20.9665,
        "x": -30.7,
        "z": 0.5,
        "year": 1949,
        "lines": [
          "T26"
        ],
        "fact": "Western Wola approach along Aleja Solidarności.",
        "isGhost": false
      },
      {
        "name": "Metro Ratusz Arsenał (Plac Bankowy)",
        "lat": 52.2448,
        "lon": 21.0012,
        "x": -4.2,
        "z": -16.08,
        "year": 1949,
        "lines": [
          "T26"
        ],
        "fact": "Direct surface transfer to Metro Line M1 at Plac Bankowy.",
        "isGhost": false
      },
      {
        "name": "Stare Miasto (Trasa W–Z Tunnel & Escalators)",
        "lat": 52.2472,
        "lon": 21.0138,
        "x": 5.42,
        "z": -19.07,
        "year": 1949,
        "lines": [
          "T26"
        ],
        "fact": "Emerges from the 1949 tunnel bored directly beneath Castle Square and St. Anne’s Church onto Most Śląsko-Dąbrowski.",
        "isGhost": false
      },
      {
        "name": "Dworzec Wileński (Praga Cathedral)",
        "lat": 52.2542,
        "lon": 21.0355,
        "x": 21.99,
        "z": -27.79,
        "year": 1949,
        "lines": [
          "M2",
          "T26"
        ],
        "fact": "Connects Trasa W–Z trams with Metro Line M2 and St. Florian’s Cathedral in Praga.",
        "isGhost": false
      }
    ]
  }
];
