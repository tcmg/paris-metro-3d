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

export const PORTO_METRO_SYSTEM_NAME = "METRO DO PORTO & DOURO RAILWAYS";

export const PORTO_METRO_LINES: CityMetroLine[] = [
  {
    "line": "A",
    "name": "Linha A (Azul) — Senhor de Matosinhos ↔ Trindade ↔ Estádio do Dragão",
    "color": "#0079c1",
    "textColor": "#ffffff",
    "openedYear": 2002,
    "rollingStockStyle": "Metro do Porto (Eurotram / Flexity Outlook)",
    "stations": [
      {
        "name": "Senhor de Matosinhos",
        "lat": 41.188,
        "lon": -8.6852,
        "x": -80.83,
        "z": -61.11,
        "year": 2002,
        "lines": [
          "A"
        ],
        "fact": "Western coastal terminus beside the Church of Bom Jesus de Matosinhos.",
        "isGhost": false
      },
      {
        "name": "Matosinhos Sul",
        "lat": 41.1778,
        "lon": -8.6865,
        "x": -82.11,
        "z": -46.33,
        "year": 2002,
        "lines": [
          "A"
        ],
        "fact": "Steps from the Atlantic surf and Álvaro Siza’s marginal promenade.",
        "isGhost": false
      },
      {
        "name": "Parque Real / Parque da Cidade",
        "lat": 41.1712,
        "lon": -8.6655,
        "x": -54.97,
        "z": -34.13,
        "year": 2002,
        "lines": [
          "A"
        ],
        "fact": "Borders Porto’s 83-hectare Atlantic urban park.",
        "isGhost": false
      },
      {
        "name": "Casa da Música",
        "lat": 41.1606,
        "lon": -8.6292,
        "x": -18.49,
        "z": -20,
        "year": 2002,
        "lines": [
          "A",
          "B",
          "C",
          "E",
          "F",
          "G"
        ],
        "fact": "Signature station by Pritzker Prize architect Eduardo Souto de Moura featuring open circular skylights and raw granite walls.",
        "isGhost": false
      },
      {
        "name": "Carolina Michaëlis",
        "lat": 41.1585,
        "lon": -8.622,
        "x": -11.26,
        "z": -17.2,
        "year": 2002,
        "lines": [
          "A"
        ],
        "fact": "Named after pioneering philologist Carolina Michaëlis de Vasconcelos.",
        "isGhost": false
      },
      {
        "name": "Lapa",
        "lat": 41.1569,
        "lon": -8.6168,
        "x": -6.03,
        "z": -15.07,
        "year": 2002,
        "lines": [
          "A",
          "C"
        ],
        "fact": "Western portal of the 1888 Lapa railway tunnel converted for Metro do Porto.",
        "isGhost": false
      },
      {
        "name": "Trindade",
        "lat": 41.1523,
        "lon": -8.6093,
        "x": 1.51,
        "z": -8.93,
        "year": 2002,
        "lines": [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F"
        ],
        "fact": "Central nexus of the entire Metro do Porto network where the east–west trunk (A/B/C/E/F) meets north–south Line D.",
        "isGhost": false
      },
      {
        "name": "Bolhão",
        "lat": 41.1498,
        "lon": -8.6058,
        "x": 5.02,
        "z": -5.6,
        "year": 2004,
        "lines": [
          "A",
          "B",
          "C",
          "E",
          "F"
        ],
        "fact": "Exits directly to the blue-azulejo facade of Capela das Almas and the historic Mercado do Bolhão.",
        "isGhost": false
      },
      {
        "name": "Campo 24 de Agosto",
        "lat": 41.1489,
        "lon": -8.5988,
        "x": 12.06,
        "z": -4.4,
        "year": 2004,
        "lines": [
          "A",
          "C",
          "F"
        ],
        "fact": "Serves the historic Bonfim plaza and eastern civic arcades.",
        "isGhost": false
      },
      {
        "name": "Heroísmo",
        "lat": 41.1466,
        "lon": -8.5932,
        "x": 17.69,
        "z": -1.33,
        "year": 2004,
        "lines": [
          "A"
        ],
        "fact": "Named after the Siege of Porto (1832–1833) that earned the city the title Invicta.",
        "isGhost": false
      },
      {
        "name": "Campanhã",
        "lat": 41.1496,
        "lon": -8.5855,
        "x": 25.43,
        "z": -5.33,
        "year": 2004,
        "lines": [
          "A",
          "B",
          "C",
          "E",
          "F"
        ],
        "fact": "Direct interchange with CP Alfa Pendular and Intercidades national railway trains.",
        "isGhost": false
      },
      {
        "name": "Estádio do Dragão",
        "lat": 41.1608,
        "lon": -8.5822,
        "x": 28.74,
        "z": -20.26,
        "year": 2004,
        "lines": [
          "A",
          "B",
          "E",
          "F"
        ],
        "fact": "Opened in June 2004 for UEFA Euro 2004.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "B",
    "name": "Linha B (Vermelha) — Póvoa / Fonte do Cuco ↔ Trindade ↔ Estádio do Dragão",
    "color": "#e31b23",
    "textColor": "#ffffff",
    "openedYear": 2005,
    "rollingStockStyle": "Metro do Porto (Flexity Swift Tram-Train)",
    "stations": [
      {
        "name": "Fonte do Cuco",
        "lat": 41.1965,
        "lon": -8.6595,
        "x": -52.56,
        "z": -72.88,
        "year": 2005,
        "lines": [
          "B",
          "C",
          "E"
        ],
        "fact": "Junction where Lines B, C, and E converge onto the Porto trunk.",
        "isGhost": false
      },
      {
        "name": "Senhora da Hora",
        "lat": 41.1882,
        "lon": -8.6545,
        "x": -44.77,
        "z": -57.9,
        "year": 2002,
        "lines": [
          "B",
          "C",
          "E",
          "F"
        ],
        "fact": "Connects Line A from Matosinhos with Lines B, C, E, and F.",
        "isGhost": false
      },
      {
        "name": "Sete Bicas",
        "lat": 41.1802,
        "lon": -8.6495,
        "x": -38.89,
        "z": -46.13,
        "year": 2002,
        "lines": [
          "B"
        ],
        "fact": "Serves NorteShopping and the northern business park.",
        "isGhost": false
      },
      {
        "name": "Viso",
        "lat": 41.1732,
        "lon": -8.6462,
        "x": -35.58,
        "z": -36.8,
        "year": 2002,
        "lines": [
          "B"
        ],
        "fact": "Ramalde residential and industrial district stop.",
        "isGhost": false
      },
      {
        "name": "Ramalde",
        "lat": 41.1682,
        "lon": -8.6418,
        "x": -31.16,
        "z": -30.13,
        "year": 2002,
        "lines": [
          "B"
        ],
        "fact": "Follows the historic 1875 Boavista–Póvoa railway right-of-way.",
        "isGhost": false
      },
      {
        "name": "Francos",
        "lat": 41.1636,
        "lon": -8.6355,
        "x": -24.82,
        "z": -24,
        "year": 2002,
        "lines": [
          "B"
        ],
        "fact": "Western approach to the Boavista cultural district.",
        "isGhost": false
      },
      {
        "name": "Casa da Música",
        "lat": 41.1606,
        "lon": -8.6292,
        "x": -18.49,
        "z": -20,
        "year": 2002,
        "lines": [
          "A",
          "B",
          "C",
          "E",
          "F",
          "G"
        ],
        "fact": "Connects with Line G (Pink Line) and Boavista bus terminal.",
        "isGhost": false
      },
      {
        "name": "Trindade",
        "lat": 41.1523,
        "lon": -8.6093,
        "x": 1.51,
        "z": -8.93,
        "year": 2002,
        "lines": [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F"
        ],
        "fact": "Transfers to Line D for São Bento and Gaia.",
        "isGhost": false
      },
      {
        "name": "Bolhão",
        "lat": 41.1498,
        "lon": -8.6058,
        "x": 5.02,
        "z": -5.6,
        "year": 2004,
        "lines": [
          "A",
          "B",
          "C",
          "E",
          "F"
        ],
        "fact": "Commercial heart of Santa Catarina.",
        "isGhost": false
      },
      {
        "name": "Campanhã",
        "lat": 41.1496,
        "lon": -8.5855,
        "x": 25.43,
        "z": -5.33,
        "year": 2004,
        "lines": [
          "A",
          "B",
          "C",
          "E",
          "F"
        ],
        "fact": "Mainline rail connection.",
        "isGhost": false
      },
      {
        "name": "Estádio do Dragão",
        "lat": 41.1608,
        "lon": -8.5822,
        "x": 28.74,
        "z": -20.26,
        "year": 2004,
        "lines": [
          "A",
          "B",
          "E",
          "F"
        ],
        "fact": "Terminus of Lines A, B, and E.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "C",
    "name": "Linha C (Verde) — ISMAI / Araújos ↔ Trindade ↔ Campanhã",
    "color": "#66b032",
    "textColor": "#ffffff",
    "openedYear": 2005,
    "rollingStockStyle": "Metro do Porto (Linha de Guimarães Heritage)",
    "stations": [
      {
        "name": "Cândido dos Reis",
        "lat": 41.2015,
        "lon": -8.6512,
        "x": -43.69,
        "z": -80.2,
        "year": 2005,
        "lines": [
          "C"
        ],
        "fact": "Serves the Maia branch before joining the central trunk.",
        "isGhost": false
      },
      {
        "name": "Fonte do Cuco",
        "lat": 41.1965,
        "lon": -8.6595,
        "x": -52.56,
        "z": -72.88,
        "year": 2005,
        "lines": [
          "B",
          "C",
          "E"
        ],
        "fact": "Merges with Lines B and E.",
        "isGhost": false
      },
      {
        "name": "Senhora da Hora",
        "lat": 41.1882,
        "lon": -8.6545,
        "x": -44.77,
        "z": -57.9,
        "year": 2002,
        "lines": [
          "B",
          "C",
          "E",
          "F"
        ],
        "fact": "Five-line interchange.",
        "isGhost": false
      },
      {
        "name": "Casa da Música",
        "lat": 41.1606,
        "lon": -8.6292,
        "x": -18.49,
        "z": -20,
        "year": 2002,
        "lines": [
          "A",
          "B",
          "C",
          "E",
          "F",
          "G"
        ],
        "fact": "Boavista cultural hub.",
        "isGhost": false
      },
      {
        "name": "Lapa",
        "lat": 41.1569,
        "lon": -8.6168,
        "x": -6.03,
        "z": -15.07,
        "year": 2002,
        "lines": [
          "A",
          "C"
        ],
        "fact": "Enters the central Porto tunnel.",
        "isGhost": false
      },
      {
        "name": "Trindade",
        "lat": 41.1523,
        "lon": -8.6093,
        "x": 1.51,
        "z": -8.93,
        "year": 2002,
        "lines": [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F"
        ],
        "fact": "Line D transfer.",
        "isGhost": false
      },
      {
        "name": "Bolhão",
        "lat": 41.1498,
        "lon": -8.6058,
        "x": 5.02,
        "z": -5.6,
        "year": 2004,
        "lines": [
          "A",
          "B",
          "C",
          "E",
          "F"
        ],
        "fact": "Baixa do Porto shopping district.",
        "isGhost": false
      },
      {
        "name": "Campo 24 de Agosto",
        "lat": 41.1489,
        "lon": -8.5988,
        "x": 12.06,
        "z": -4.4,
        "year": 2004,
        "lines": [
          "A",
          "C",
          "F"
        ],
        "fact": "Eastern Baixa hub.",
        "isGhost": false
      },
      {
        "name": "Campanhã",
        "lat": 41.1496,
        "lon": -8.5855,
        "x": 25.43,
        "z": -5.33,
        "year": 2004,
        "lines": [
          "A",
          "B",
          "C",
          "E",
          "F"
        ],
        "fact": "Eastern terminus of Line C.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "D",
    "name": "Linha D (Amarela) — Hospital São João ↔ Trindade ↔ São Bento ↔ Ponte Dom Luís I ↔ Vila d’Este",
    "color": "#ffc709",
    "textColor": "#10141c",
    "openedYear": 2005,
    "rollingStockStyle": "Metro do Porto (North–South Douro Spine)",
    "stations": [
      {
        "name": "Hospital São João",
        "lat": 41.1832,
        "lon": -8.6022,
        "x": 8.64,
        "z": -50.13,
        "year": 2005,
        "lines": [
          "D"
        ],
        "fact": "Serves the University of Porto Asprela campus and São João Hospital.",
        "isGhost": false
      },
      {
        "name": "IPO",
        "lat": 41.1792,
        "lon": -8.6042,
        "x": 6.63,
        "z": -44.8,
        "year": 2005,
        "lines": [
          "D"
        ],
        "fact": "Serves the Portuguese Oncology Institute.",
        "isGhost": false
      },
      {
        "name": "Pólo Universitário",
        "lat": 41.1745,
        "lon": -8.6038,
        "x": 7.03,
        "z": -38.53,
        "year": 2005,
        "lines": [
          "D"
        ],
        "fact": "Cut-and-cover station with lawn-covered skylights in the university garden.",
        "isGhost": false
      },
      {
        "name": "Salgueiros",
        "lat": 41.1695,
        "lon": -8.6052,
        "x": 5.63,
        "z": -31.86,
        "year": 2005,
        "lines": [
          "D"
        ],
        "fact": "Deep underground station beneath Rua da Constituição.",
        "isGhost": false
      },
      {
        "name": "Combatentes",
        "lat": 41.1652,
        "lon": -8.6068,
        "x": 4.02,
        "z": -26.13,
        "year": 2005,
        "lines": [
          "D"
        ],
        "fact": "Serves the historic Marquês and Combatentes avenues.",
        "isGhost": false
      },
      {
        "name": "Marquês",
        "lat": 41.1612,
        "lon": -8.6062,
        "x": 4.62,
        "z": -20.8,
        "year": 2005,
        "lines": [
          "D"
        ],
        "fact": "Excavated beneath the tree-lined Praça do Marquês de Pombal.",
        "isGhost": false
      },
      {
        "name": "Faria Guimarães",
        "lat": 41.1568,
        "lon": -8.6078,
        "x": 3.02,
        "z": -14.93,
        "year": 2005,
        "lines": [
          "D"
        ],
        "fact": "Serves the upper Santa Catarina and Faria Guimarães quarter.",
        "isGhost": false
      },
      {
        "name": "Trindade",
        "lat": 41.1523,
        "lon": -8.6093,
        "x": 1.51,
        "z": -8.93,
        "year": 2002,
        "lines": [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F"
        ],
        "fact": "Line D crosses above the five-line east–west trunk.",
        "isGhost": false
      },
      {
        "name": "Aliados",
        "lat": 41.1486,
        "lon": -8.6108,
        "x": 0,
        "z": -4,
        "year": 2005,
        "lines": [
          "D"
        ],
        "fact": "Located directly beneath Porto’s grand civic boulevard and City Hall.",
        "isGhost": false
      },
      {
        "name": "São Bento",
        "lat": 41.1456,
        "lon": -8.6106,
        "x": 0.2,
        "z": 0,
        "year": 2005,
        "lines": [
          "D",
          "G"
        ],
        "fact": "Steps from the 20,000 azulejos of São Bento railway station, Sé do Porto, and Torre dos Clérigos; future interchange with Line G.",
        "isGhost": false
      },
      {
        "name": "Jardim do Morro (Gaia Bridge Portal)",
        "lat": 41.1376,
        "lon": -8.6088,
        "x": 2.01,
        "z": 10.67,
        "year": 2005,
        "lines": [
          "D"
        ],
        "fact": "Immediately south of the breathtaking crossing of Ponte Dom Luís I, overlooking Ribeira and the Port wine lodges alongside the Teleférico de Gaia.",
        "isGhost": false
      },
      {
        "name": "General Torres",
        "lat": 41.1335,
        "lon": -8.6078,
        "x": 3.02,
        "z": 16.13,
        "year": 2005,
        "lines": [
          "D"
        ],
        "fact": "Connects Line D with the CP Linha do Norte railway in Vila Nova de Gaia.",
        "isGhost": false
      },
      {
        "name": "Câmara de Gaia",
        "lat": 41.1298,
        "lon": -8.6062,
        "x": 4.62,
        "z": 21.06,
        "year": 2005,
        "lines": [
          "D"
        ],
        "fact": "Heart of Vila Nova de Gaia’s commercial spine.",
        "isGhost": false
      },
      {
        "name": "Santo Ovídio",
        "lat": 41.1195,
        "lon": -8.6065,
        "x": 4.32,
        "z": 34.8,
        "year": 2011,
        "lines": [
          "D"
        ],
        "fact": "Designed by Pritzker laureate Álvaro Siza Vieira; extended further south to Vila d’Este in 2024.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "E",
    "name": "Linha E (Violeta) — Aeroporto ↔ Senhora da Hora ↔ Trindade ↔ Estádio do Dragão",
    "color": "#6f2c91",
    "textColor": "#ffffff",
    "openedYear": 2006,
    "rollingStockStyle": "Metro do Porto (Airport Link)",
    "stations": [
      {
        "name": "Aeroporto (Francisco Sá Carneiro)",
        "lat": 41.237,
        "lon": -8.6702,
        "x": -59.46,
        "z": -121.37,
        "year": 2006,
        "lines": [
          "E"
        ],
        "fact": "Direct covered connection to Porto’s international airport terminal.",
        "isGhost": false
      },
      {
        "name": "Fonte do Cuco",
        "lat": 41.1965,
        "lon": -8.6595,
        "x": -52.56,
        "z": -72.88,
        "year": 2005,
        "lines": [
          "B",
          "C",
          "E"
        ],
        "fact": "Joins the main Metro do Porto trunk.",
        "isGhost": false
      },
      {
        "name": "Senhora da Hora",
        "lat": 41.1882,
        "lon": -8.6545,
        "x": -44.77,
        "z": -57.9,
        "year": 2002,
        "lines": [
          "B",
          "C",
          "E",
          "F"
        ],
        "fact": "Cross-platform transfer with Line A.",
        "isGhost": false
      },
      {
        "name": "Casa da Música",
        "lat": 41.1606,
        "lon": -8.6292,
        "x": -18.49,
        "z": -20,
        "year": 2002,
        "lines": [
          "A",
          "B",
          "C",
          "E",
          "F",
          "G"
        ],
        "fact": "Serves the Boavista hotel and concert district.",
        "isGhost": false
      },
      {
        "name": "Trindade",
        "lat": 41.1523,
        "lon": -8.6093,
        "x": 1.51,
        "z": -8.93,
        "year": 2002,
        "lines": [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F"
        ],
        "fact": "Downtown Porto hub.",
        "isGhost": false
      },
      {
        "name": "Bolhão",
        "lat": 41.1498,
        "lon": -8.6058,
        "x": 5.02,
        "z": -5.6,
        "year": 2004,
        "lines": [
          "A",
          "B",
          "C",
          "E",
          "F"
        ],
        "fact": "Historic market stop.",
        "isGhost": false
      },
      {
        "name": "Campanhã",
        "lat": 41.1496,
        "lon": -8.5855,
        "x": 25.43,
        "z": -5.33,
        "year": 2004,
        "lines": [
          "A",
          "B",
          "C",
          "E",
          "F"
        ],
        "fact": "Direct airport-to-high-speed-rail transfer.",
        "isGhost": false
      },
      {
        "name": "Estádio do Dragão",
        "lat": 41.1608,
        "lon": -8.5822,
        "x": 28.74,
        "z": -20.26,
        "year": 2004,
        "lines": [
          "A",
          "B",
          "E",
          "F"
        ],
        "fact": "Terminus of Airport Line E.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "F",
    "name": "Linha F (Laranja) — Senhora da Hora ↔ Trindade ↔ Campanhã ↔ Fânzeres",
    "color": "#f58220",
    "textColor": "#ffffff",
    "openedYear": 2011,
    "rollingStockStyle": "Metro do Porto (Gondomar Extension)",
    "stations": [
      {
        "name": "Senhora da Hora",
        "lat": 41.1882,
        "lon": -8.6545,
        "x": -44.77,
        "z": -57.9,
        "year": 2002,
        "lines": [
          "B",
          "C",
          "E",
          "F"
        ],
        "fact": "Western anchor of the Orange Line.",
        "isGhost": false
      },
      {
        "name": "Casa da Música",
        "lat": 41.1606,
        "lon": -8.6292,
        "x": -18.49,
        "z": -20,
        "year": 2002,
        "lines": [
          "A",
          "B",
          "C",
          "E",
          "F",
          "G"
        ],
        "fact": "Boavista cultural hub.",
        "isGhost": false
      },
      {
        "name": "Trindade",
        "lat": 41.1523,
        "lon": -8.6093,
        "x": 1.51,
        "z": -8.93,
        "year": 2002,
        "lines": [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F"
        ],
        "fact": "Transfers to Line D.",
        "isGhost": false
      },
      {
        "name": "Bolhão",
        "lat": 41.1498,
        "lon": -8.6058,
        "x": 5.02,
        "z": -5.6,
        "year": 2004,
        "lines": [
          "A",
          "B",
          "C",
          "E",
          "F"
        ],
        "fact": "Santa Catarina & Bolhão.",
        "isGhost": false
      },
      {
        "name": "Campo 24 de Agosto",
        "lat": 41.1489,
        "lon": -8.5988,
        "x": 12.06,
        "z": -4.4,
        "year": 2004,
        "lines": [
          "A",
          "C",
          "F"
        ],
        "fact": "Bonfim hub.",
        "isGhost": false
      },
      {
        "name": "Campanhã",
        "lat": 41.1496,
        "lon": -8.5855,
        "x": 25.43,
        "z": -5.33,
        "year": 2004,
        "lines": [
          "A",
          "B",
          "C",
          "E",
          "F"
        ],
        "fact": "National rail connection.",
        "isGhost": false
      },
      {
        "name": "Estádio do Dragão",
        "lat": 41.1608,
        "lon": -8.5822,
        "x": 28.74,
        "z": -20.26,
        "year": 2004,
        "lines": [
          "A",
          "B",
          "E",
          "F"
        ],
        "fact": "Line F continues east from here toward Rio Tinto and Gondomar.",
        "isGhost": false
      },
      {
        "name": "Contumil",
        "lat": 41.1665,
        "lon": -8.5768,
        "x": 34.17,
        "z": -27.86,
        "year": 2011,
        "lines": [
          "F"
        ],
        "fact": "Connects with CP Linha do Minho / Douro suburban trains.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "G",
    "name": "Linha G (Rosa) — São Bento ↔ Hospital Santo António ↔ Galiza ↔ Casa da Música",
    "color": "#e85c9c",
    "textColor": "#ffffff",
    "openedYear": 2025,
    "rollingStockStyle": "Metro do Porto (100% Subterranean Pink Line)",
    "stations": [
      {
        "name": "São Bento",
        "lat": 41.1456,
        "lon": -8.6106,
        "x": 0.2,
        "z": 0,
        "year": 2005,
        "lines": [
          "D",
          "G"
        ],
        "fact": "Southern terminus of the Pink Line with direct underground passage to Line D and the 1916 Azulejo railway terminal.",
        "isGhost": false
      },
      {
        "name": "Hospital Santo António (Cordoaria)",
        "lat": 41.1468,
        "lon": -8.6185,
        "x": -7.74,
        "z": -1.6,
        "year": 2025,
        "lines": [
          "G"
        ],
        "fact": "Serves John Carr’s monumental 1770 Neoclassical Hospital de Santo António, Jardim da Cordoaria, Clérigos, and Livraria Lello.",
        "isGhost": false
      },
      {
        "name": "Galiza",
        "lat": 41.1508,
        "lon": -8.6258,
        "x": -15.08,
        "z": -6.93,
        "year": 2025,
        "lines": [
          "G"
        ],
        "fact": "Connects the Palácio de Cristal gardens and Massarelos university faculties to the underground network.",
        "isGhost": false
      },
      {
        "name": "Casa da Música",
        "lat": 41.1606,
        "lon": -8.6292,
        "x": -18.49,
        "z": -20,
        "year": 2002,
        "lines": [
          "A",
          "B",
          "C",
          "E",
          "F",
          "G"
        ],
        "fact": "Northern terminus of Line G, creating a western underground loop between Boavista and São Bento.",
        "isGhost": false
      }
    ]
  }
];
