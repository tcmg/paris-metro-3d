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

export const RIO_RAIL_TERMINI: CityRailTerminus[] = [
  {
    "id": "gl-central-do-brasil",
    "name": "Estação Central do Brasil",
    "year": 1858,
    "lat": -22.9046,
    "lon": -43.1912,
    "x": 3.82,
    "z": -27.66,
    "azimuth": -1.62,
    "color": "#f7c948",
    "fact": "Historic terminus of the Estrada de Ferro Central do Brasil (1858) and its 110m Art Deco Clock Tower (1943), dispatching twelve-platform suburban electric trains across Greater Rio.",
    "destinations": "VERS DEODORO • JAPeri • SÃO PAULO (CRUZEIRO DO SUL)",
    "trainType": "SuperVia • Ramais Deodoro, Santa Cruz, Japeri, Saracuruna & Belford Roxo",
    "trackPaths": [
      [
        [
          3.82,
          -27.66
        ],
        [
          -10.04,
          -25.59
        ],
        [
          -26.1,
          -22.86
        ],
        [
          -40.16,
          -20.47
        ],
        [
          -63.25,
          -27.22
        ]
      ]
    ]
  },
  {
    "id": "gl-barao-de-maua",
    "name": "Estação Barão de Mauá (Leopoldina)",
    "year": 1926,
    "lat": -22.9068,
    "lon": -43.2105,
    "x": -15.56,
    "z": -25.26,
    "azimuth": -1.65,
    "color": "#12945a",
    "fact": "Designed by Scottish architect Robert R. Prentice in 1926 for the British-owned Leopoldina Railway, linking Rio across Guanabara lowlands and up the rack railway to Imperial Petrópolis.",
    "destinations": "VERS PETRÓPOLIS • MINAS GERAIS",
    "trainType": "Historic Edwardian Terminus (Robert Prentice)",
    "trackPaths": [
      [
        [
          -15.56,
          -25.26
        ],
        [
          -27.61,
          -24.17
        ],
        [
          -41.16,
          -23.41
        ],
        [
          -60.24,
          -34.84
        ]
      ]
    ]
  }
];
