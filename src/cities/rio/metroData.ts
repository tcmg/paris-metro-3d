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

export const RIO_METRO_SYSTEM_NAME = "METRÔRIO, VLT CARIOCA & SUPERVIA";

export const RIO_METRO_LINES: CityMetroLine[] = [
  {
    "line": "L1",
    "name": "Linha 1 — Laranja (Uruguai ↔ General Osório)",
    "color": "#f37021",
    "textColor": "#ffffff",
    "openedYear": 1979,
    "rollingStockStyle": "MetrôRio",
    "stations": [
      {
        "name": "Uruguai",
        "lat": -22.9318,
        "lon": -43.2385,
        "x": -43.67,
        "z": 1.96,
        "year": 2014,
        "lines": [
          "L1"
        ],
        "fact": "Northern terminus of Line 1 in the Tijuca residential district.",
        "isGhost": false
      },
      {
        "name": "Saens Peña",
        "lat": -22.9242,
        "lon": -43.2325,
        "x": -37.65,
        "z": -6.31,
        "year": 1982,
        "lines": [
          "L1"
        ],
        "fact": "Historic heart of Tijuca Square opened in May 1982.",
        "isGhost": false
      },
      {
        "name": "Afonso Pena",
        "lat": -22.918,
        "lon": -43.2185,
        "x": -23.59,
        "z": -13.07,
        "year": 1982,
        "lines": [
          "L1"
        ],
        "fact": "Serves Praça Afonso Pena and the Tijuca gateway.",
        "isGhost": false
      },
      {
        "name": "Estácio",
        "lat": -22.9132,
        "lon": -43.2065,
        "x": -11.55,
        "z": -18.29,
        "year": 1980,
        "lines": [
          "L1"
        ],
        "fact": "Cradle of Rio’s first samba school (Deixa Falar, 1928) and historic transfer point between Lines 1 and 2.",
        "isGhost": false
      },
      {
        "name": "Praça Onze",
        "lat": -22.9092,
        "lon": -43.1975,
        "x": -2.51,
        "z": -22.65,
        "year": 1979,
        "lines": [
          "L1"
        ],
        "fact": "One of the five original stations opened on March 5, 1979; main gateway to Oscar Niemeyer’s Sambadrome during Carnival.",
        "isGhost": false
      },
      {
        "name": "Central do Brasil",
        "lat": -22.9048,
        "lon": -43.1912,
        "x": 3.82,
        "z": -27.44,
        "year": 1979,
        "lines": [
          "L1",
          "L2",
          "VLT2"
        ],
        "fact": "Busiest multimodal hub in Rio, connecting Lines 1 and 2 with SuperVia commuter trains and VLT.",
        "isGhost": false
      },
      {
        "name": "Uruguaiana / Engenheiro Fernando Mac Dowell",
        "lat": -22.9035,
        "lon": -43.1815,
        "x": 13.55,
        "z": -28.85,
        "year": 1980,
        "lines": [
          "L1"
        ],
        "fact": "Serves the bustling Saara open-air market and Avenida Presidente Vargas.",
        "isGhost": false
      },
      {
        "name": "Carioca",
        "lat": -22.9072,
        "lon": -43.1775,
        "x": 17.57,
        "z": -24.82,
        "year": 1981,
        "lines": [
          "L1",
          "L2",
          "VLT1",
          "VLT2"
        ],
        "fact": "Major financial-district station beneath Largo da Carioca, connecting with VLT Line 1 and the Santa Teresa tram.",
        "isGhost": false
      },
      {
        "name": "Cinelândia",
        "lat": -22.9112,
        "lon": -43.1758,
        "x": 19.28,
        "z": -20.47,
        "year": 1979,
        "lines": [
          "L1",
          "L2",
          "VLT1"
        ],
        "fact": "Inaugural southern terminus on March 5, 1979 beneath the Belle Époque palaces of Praça Floriano.",
        "isGhost": false
      },
      {
        "name": "Glória",
        "lat": -22.9195,
        "lon": -43.1765,
        "x": 18.57,
        "z": -11.43,
        "year": 1979,
        "lines": [
          "L1"
        ],
        "fact": "One of the five inaugural 1979 stations, nestled between Outeiro da Glória and Burle Marx’s Flamengo Park.",
        "isGhost": false
      },
      {
        "name": "Catete",
        "lat": -22.926,
        "lon": -43.1768,
        "x": 18.27,
        "z": -4.36,
        "year": 1981,
        "lines": [
          "L1"
        ],
        "fact": "Adjacent to the former presidential palace of Brazil and its tropical gardens.",
        "isGhost": false
      },
      {
        "name": "Largo do Machado",
        "lat": -22.9312,
        "lon": -43.1788,
        "x": 16.26,
        "z": 1.31,
        "year": 1981,
        "lines": [
          "L1"
        ],
        "fact": "Gateway to Laranjeiras and the Cosme Velho cog railway up to Corcovado.",
        "isGhost": false
      },
      {
        "name": "Flamengo",
        "lat": -22.9375,
        "lon": -43.1785,
        "x": 16.57,
        "z": 8.17,
        "year": 1981,
        "lines": [
          "L1"
        ],
        "fact": "Serves Flamengo Beach and the southern sweep of Guanabara Bay.",
        "isGhost": false
      },
      {
        "name": "Botafogo",
        "lat": -22.9512,
        "lon": -43.1842,
        "x": 10.84,
        "z": 23.08,
        "year": 1981,
        "lines": [
          "L1",
          "L2"
        ],
        "fact": "Primary gateway to Urca and the Sugarloaf cable car.",
        "isGhost": false
      },
      {
        "name": "Cardeal Arcoverde (Copacabana)",
        "lat": -22.9642,
        "lon": -43.1812,
        "x": 13.86,
        "z": 37.24,
        "year": 1998,
        "lines": [
          "L1"
        ],
        "fact": "First station bored inside the granite mountain ring of Copacabana, inaugurated in July 1998.",
        "isGhost": false
      },
      {
        "name": "Siqueira Campos (Copacabana)",
        "lat": -22.9672,
        "lon": -43.1868,
        "x": 8.23,
        "z": 40.5,
        "year": 2002,
        "lines": [
          "L1"
        ],
        "fact": "Central Copacabana station serving Posto 4 and Avenida Atlântica.",
        "isGhost": false
      },
      {
        "name": "Cantagalo (Copacabana)",
        "lat": -22.9765,
        "lon": -43.1925,
        "x": 2.51,
        "z": 50.63,
        "year": 2007,
        "lines": [
          "L1"
        ],
        "fact": "Southern Copacabana hub near Forte de Copacabana and Arpoador.",
        "isGhost": false
      },
      {
        "name": "General Osório (Ipanema)",
        "lat": -22.9848,
        "lon": -43.1978,
        "x": -2.81,
        "z": 59.67,
        "year": 2009,
        "lines": [
          "L1",
          "L4"
        ],
        "fact": "Opened in December 2009 in the heart of Ipanema and expanded in 2016 as the eastern junction of Olympic Line 4.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "L2",
    "name": "Linha 2 — Verde (Maracanã / São Cristóvão ↔ Botafogo)",
    "color": "#00a859",
    "textColor": "#ffffff",
    "openedYear": 1981,
    "rollingStockStyle": "MetrôRio",
    "stations": [
      {
        "name": "Maracanã",
        "lat": -22.9098,
        "lon": -43.2335,
        "x": -38.65,
        "z": -21.99,
        "year": 1981,
        "lines": [
          "L2"
        ],
        "fact": "Opened in November 1981 directly facing the monumental ramps of Maracanã Stadium.",
        "isGhost": false
      },
      {
        "name": "São Cristóvão",
        "lat": -22.9092,
        "lon": -43.222,
        "x": -27.11,
        "z": -22.65,
        "year": 1981,
        "lines": [
          "L2"
        ],
        "fact": "Serves the Imperial Palace grounds at Quinta da Boa Vista.",
        "isGhost": false
      },
      {
        "name": "Cidade Nova",
        "lat": -22.9088,
        "lon": -43.2062,
        "x": -11.24,
        "z": -23.08,
        "year": 2010,
        "lines": [
          "L2"
        ],
        "fact": "Opened in 2010 to create a direct Line 2 bypass into Central do Brasil without switching at Estácio.",
        "isGhost": false
      },
      {
        "name": "Central do Brasil",
        "lat": -22.9048,
        "lon": -43.1912,
        "x": 3.82,
        "z": -27.44,
        "year": 1979,
        "lines": [
          "L1",
          "L2",
          "VLT2"
        ],
        "fact": "Shared trunk interchange with Line 1.",
        "isGhost": false
      },
      {
        "name": "Carioca",
        "lat": -22.9072,
        "lon": -43.1775,
        "x": 17.57,
        "z": -24.82,
        "year": 1981,
        "lines": [
          "L1",
          "L2",
          "VLT1",
          "VLT2"
        ],
        "fact": "Shared trunk station in Centro.",
        "isGhost": false
      },
      {
        "name": "Cinelândia",
        "lat": -22.9112,
        "lon": -43.1758,
        "x": 19.28,
        "z": -20.47,
        "year": 1979,
        "lines": [
          "L1",
          "L2",
          "VLT1"
        ],
        "fact": "Shared trunk station at Cinelândia.",
        "isGhost": false
      },
      {
        "name": "Botafogo",
        "lat": -22.9512,
        "lon": -43.1842,
        "x": 10.84,
        "z": 23.08,
        "year": 1981,
        "lines": [
          "L1",
          "L2"
        ],
        "fact": "Southern terminus of Line 2.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "L4",
    "name": "Linha 4 — Amarela (General Osório ↔ Jardim Oceânico)",
    "color": "#ffcb05",
    "textColor": "#10141c",
    "openedYear": 2016,
    "rollingStockStyle": "Rio Barra",
    "stations": [
      {
        "name": "General Osório (Ipanema)",
        "lat": -22.9848,
        "lon": -43.1978,
        "x": -2.81,
        "z": 59.67,
        "year": 2009,
        "lines": [
          "L1",
          "L4"
        ],
        "fact": "Eastern gateway of Line 4.",
        "isGhost": false
      },
      {
        "name": "Nossa Senhora da Paz (Ipanema)",
        "lat": -22.9838,
        "lon": -43.2068,
        "x": -11.85,
        "z": 58.58,
        "year": 2016,
        "lines": [
          "L4"
        ],
        "fact": "Serves the heart of Ipanema’s tree-lined square and Posto 9.",
        "isGhost": false
      },
      {
        "name": "Jardim de Alah",
        "lat": -22.9828,
        "lon": -43.2152,
        "x": -20.28,
        "z": 57.49,
        "year": 2016,
        "lines": [
          "L4"
        ],
        "fact": "Located beside the canal linking Lagoa Rodrigo de Freitas to the Atlantic.",
        "isGhost": false
      },
      {
        "name": "Antero de Quental (Leblon)",
        "lat": -22.985,
        "lon": -43.2238,
        "x": -28.92,
        "z": 59.88,
        "year": 2016,
        "lines": [
          "L4"
        ],
        "fact": "Serves the heart of Leblon.",
        "isGhost": false
      },
      {
        "name": "Gávea (Unfinished Cavern)",
        "lat": -22.9782,
        "lon": -43.2328,
        "x": -37.95,
        "z": 52.48,
        "year": 2016,
        "lines": [
          "L4"
        ],
        "fact": "Excavated 50 meters deep beneath PUC-Rio for the 2016 Olympics; construction was halted before completion and the shafts were preventatively flooded with water.",
        "isGhost": true
      },
      {
        "name": "São Conrado",
        "lat": -22.9928,
        "lon": -43.254,
        "x": -61.67,
        "z": 71.19,
        "year": 2016,
        "lines": [
          "L4"
        ],
        "fact": "Emerges from the granite tunnel beneath Morro Dois Irmãos.",
        "isGhost": false
      },
      {
        "name": "Jardim Oceânico (Barra)",
        "lat": -23.0068,
        "lon": -43.2715,
        "x": -80.68,
        "z": 87.83,
        "year": 2016,
        "lines": [
          "L4"
        ],
        "fact": "Western terminus of Line 4 inaugurated for the 2016 Rio Olympic Games.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "VLT1",
    "name": "VLT Carioca — Linha 1 (Santos Dumont ↔ Praia Formosa)",
    "color": "#00a3e0",
    "textColor": "#ffffff",
    "openedYear": 2016,
    "rollingStockStyle": "VLT Carioca",
    "stations": [
      {
        "name": "Santos Dumont Airport",
        "lat": -22.9102,
        "lon": -43.1672,
        "x": 27.91,
        "z": -21.56,
        "year": 2016,
        "lines": [
          "VLT1"
        ],
        "fact": "Southern terminus right at the modernist terminal of Santos Dumont Airport.",
        "isGhost": false
      },
      {
        "name": "Cinelândia",
        "lat": -22.9112,
        "lon": -43.1758,
        "x": 19.28,
        "z": -20.47,
        "year": 2016,
        "lines": [
          "L1",
          "L2",
          "VLT1"
        ],
        "fact": "Connects VLT Line 1 with MetrôRio at Theatro Municipal.",
        "isGhost": false
      },
      {
        "name": "Carioca",
        "lat": -22.9072,
        "lon": -43.1775,
        "x": 17.57,
        "z": -24.82,
        "year": 2016,
        "lines": [
          "L1",
          "L2",
          "VLT1",
          "VLT2"
        ],
        "fact": "Interchange with MetrôRio Carioca.",
        "isGhost": false
      },
      {
        "name": "Parada dos Museus (Praça Mauá)",
        "lat": -22.8962,
        "lon": -43.18,
        "x": 15.06,
        "z": -36.8,
        "year": 2016,
        "lines": [
          "VLT1"
        ],
        "fact": "Frames Santiago Calatrava’s Museum of Tomorrow and the Rio Art Museum (MAR).",
        "isGhost": false
      },
      {
        "name": "Terminal Gentileza / Rodoviária",
        "lat": -22.8988,
        "lon": -43.2085,
        "x": -13.55,
        "z": -33.97,
        "year": 2016,
        "lines": [
          "VLT1",
          "VLT2"
        ],
        "fact": "Western VLT hub linking with BRT Transbrasil.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "VLT2",
    "name": "VLT Carioca — Linha 2 (Praça XV ↔ Praia Formosa)",
    "color": "#12945a",
    "textColor": "#ffffff",
    "openedYear": 2017,
    "rollingStockStyle": "VLT Carioca",
    "stations": [
      {
        "name": "Praça XV (Barcas)",
        "lat": -22.9035,
        "lon": -43.1732,
        "x": 21.89,
        "z": -28.85,
        "year": 2017,
        "lines": [
          "VLT2"
        ],
        "fact": "Connects directly with the Guanabara Bay ferries to Niterói and Paquetá Island.",
        "isGhost": false
      },
      {
        "name": "Colombo / Sete de Setembro",
        "lat": -22.9052,
        "lon": -43.1768,
        "x": 18.27,
        "z": -27,
        "year": 2017,
        "lines": [
          "VLT2"
        ],
        "fact": "Adjacent to the 1894 Confeitaria Colombo Belle Époque café.",
        "isGhost": false
      },
      {
        "name": "Carioca",
        "lat": -22.9072,
        "lon": -43.1775,
        "x": 17.57,
        "z": -24.82,
        "year": 2017,
        "lines": [
          "L1",
          "L2",
          "VLT1",
          "VLT2"
        ],
        "fact": "Crossroads of VLT Lines 1 and 2.",
        "isGhost": false
      },
      {
        "name": "Saara / Tiradentes",
        "lat": -22.9068,
        "lon": -43.1835,
        "x": 11.55,
        "z": -25.26,
        "year": 2017,
        "lines": [
          "VLT2"
        ],
        "fact": "Serves Praça Tiradentes and the Real Gabinete Português de Leitura.",
        "isGhost": false
      },
      {
        "name": "Central do Brasil",
        "lat": -22.9048,
        "lon": -43.1912,
        "x": 3.82,
        "z": -27.44,
        "year": 2017,
        "lines": [
          "L1",
          "L2",
          "VLT2"
        ],
        "fact": "Direct surface transfer to Central do Brasil SuperVia trains and MetrôRio.",
        "isGhost": false
      },
      {
        "name": "Terminal Gentileza / Rodoviária",
        "lat": -22.8988,
        "lon": -43.2085,
        "x": -13.55,
        "z": -33.97,
        "year": 2017,
        "lines": [
          "VLT1",
          "VLT2"
        ],
        "fact": "Western terminus of VLT Lines 1 and 2.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "BONDE",
    "name": "Bonde de Santa Teresa (Carioca ↔ Dois Irmãos)",
    "color": "#f7c948",
    "textColor": "#10141c",
    "openedYear": 1896,
    "rollingStockStyle": "Companhia Ferro-Carril de Santa Teresa (1896)",
    "stations": [
      {
        "name": "Estação Carioca (Bonde)",
        "lat": -22.9072,
        "lon": -43.1775,
        "x": 17.57,
        "z": -24.82,
        "year": 1896,
        "lines": [
          "BONDE"
        ],
        "fact": "Downtown boarding pavilion for the yellow open-sided Santa Teresa bondes.",
        "isGhost": false
      },
      {
        "name": "Arcos da Lapa Viaduct",
        "lat": -22.913,
        "lon": -43.1801,
        "x": 14.96,
        "z": -18.51,
        "year": 1896,
        "lines": [
          "BONDE"
        ],
        "fact": "Soars 18 meters above Lapa plaza atop the 18th-century colonial aqueduct.",
        "isGhost": false
      },
      {
        "name": "Largo do Curvelo",
        "lat": -22.9188,
        "lon": -43.1848,
        "x": 10.24,
        "z": -12.19,
        "year": 1896,
        "lines": [
          "BONDE"
        ],
        "fact": "Gateway to Parque das Ruínas and the Chácara do Céu Museum overlooking Guanabara Bay.",
        "isGhost": false
      },
      {
        "name": "Largo dos Guimarães",
        "lat": -22.9218,
        "lon": -43.1888,
        "x": 6.22,
        "z": -8.93,
        "year": 1896,
        "lines": [
          "BONDE"
        ],
        "fact": "Artistic heart of Santa Teresa lined with 19th-century mansions and studios.",
        "isGhost": false
      },
      {
        "name": "Dois Irmãos (Paula Mattos / Silvestre)",
        "lat": -22.931,
        "lon": -43.1965,
        "x": -1.51,
        "z": 1.09,
        "year": 1896,
        "lines": [
          "BONDE"
        ],
        "fact": "Upper Santa Teresa terminus along the forested ridge leading toward Corcovado.",
        "isGhost": false
      }
    ]
  }
];
