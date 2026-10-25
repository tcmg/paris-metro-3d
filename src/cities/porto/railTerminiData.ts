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

import type { CityRailTerminus } from '../types';

export const PORTO_RAIL_TERMINI: CityRailTerminus[] = [
  {
    "id": "gl-porto-sao-bento",
    "name": "Estação de Porto-São Bento",
    "year": 1916,
    "lat": 41.1456,
    "lon": -8.6106,
    "x": 0.2,
    "z": 0,
    "azimuth": -0.95,
    "color": "#1b569c",
    "fact": "Designed by José Marques da Silva in French Beaux-Arts style and famous worldwide for Jorge Colaço’s 20,000 cobalt-blue Azulejo ceramic tiles; trains depart directly into the granite Túnel das Fontainhas toward Campanhã and the Douro Valley.",
    "destinations": "TO POCINHO (DOURO VALLEY) • BRAGA • GUIMARÃES • AVEIRO",
    "trainType": "CP Urbanos do Porto • Linha do Douro Historical Wine Trains",
    "trackPaths": [
      [
        [
          0.2,
          0
        ],
        [
          8.84,
          1.07
        ],
        [
          18.89,
          -1.2
        ],
        [
          25.43,
          -5.33
        ]
      ]
    ]
  },
  {
    "id": "gl-porto-campanha",
    "name": "Estação de Porto-Campanhã",
    "year": 1877,
    "lat": 41.1496,
    "lon": -8.5855,
    "x": 25.43,
    "z": -5.33,
    "azimuth": 0.15,
    "color": "#d4af37",
    "fact": "Inaugurated on November 4, 1877 alongside Gustave Eiffel’s Ponte Maria Pia to bring the Linha do Norte from Lisbon across the Douro into Porto; today it serves as Northern Portugal’s primary high-speed Alfa Pendular hub.",
    "destinations": "TO LISBOA SANTA APOLÓNIA • COIMBRA • VIGO (GALICIA)",
    "trainType": "CP Alfa Pendular • Intercidades • Celta International",
    "trackPaths": [
      [
        [
          25.43,
          -5.33
        ],
        [
          23.42,
          1.47
        ],
        [
          16.08,
          7.73
        ],
        [
          3.02,
          16.13
        ]
      ]
    ]
  }
];
