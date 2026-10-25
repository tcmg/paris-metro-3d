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

export const WARSAW_RAIL_TERMINI: CityRailTerminus[] = [
  {
    "id": "gl-warszawa-centralna",
    "name": "Dworzec Warszawa Centralna (PKP Intercity)",
    "year": 1975,
    "lat": 52.2288,
    "lon": 21.0032,
    "x": -2.67,
    "z": 3.86,
    "azimuth": 0.25,
    "color": "#f4b942",
    "fact": "Flagship terminal of Polish State Railways (PKP), featuring Arseniusz Romanowicz’s soaring 1975 cantilevered roof above four underground island platforms serving EIP Pendolino high-speed trains.",
    "destinations": "VERS KRAKÓW • GDAŃSK • BERLIN • PRAHA • WIEN",
    "trainType": "PKP Intercity EIP Pendolino • Berlin–Warszawa Express • Koleje Mazowieckie",
    "trackPaths": [
      [
        [
          -2.67,
          3.86
        ],
        [
          -12.37,
          7.35
        ],
        [
          -31.69,
          14.58
        ],
        [
          -47.12,
          21.68
        ]
      ]
    ]
  },
  {
    "id": "gl-warszawa-wschodnia",
    "name": "Dworzec Warszawa Wschodnia",
    "year": 1866,
    "lat": 52.2512,
    "lon": 21.0525,
    "x": 34.97,
    "z": -24.05,
    "azimuth": 0.55,
    "color": "#e30613",
    "fact": "Opened in 1866 as the Terespol Railway Terminus and rebuilt in 1969 by Arseniusz Romanowicz and Piotr Szymaniak with a modernist butterfly roof, serving all trains east of the Vistula.",
    "destinations": "VERS LUBLIN • BIAŁYSTOK • WILNO • KIJÓW",
    "trainType": "PKP Intercity • Koleje Mazowieckie • SKM",
    "trackPaths": [
      [
        [
          34.97,
          -24.05
        ],
        [
          42.23,
          -30.66
        ],
        [
          44.52,
          -38.76
        ]
      ]
    ]
  }
];
