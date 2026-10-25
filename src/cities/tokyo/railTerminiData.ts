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

export const TOKYO_RAIL_TERMINI: CityRailTerminus[] = [
  {
    "id": "gl-tokyo-station",
    "name": "Tokyo Station (Shinkansen & Imperial Central Terminal)",
    "year": 1914,
    "lat": 35.6812,
    "lon": 139.7671,
    "x": 0,
    "z": 0,
    "azimuth": -1.35,
    "color": "#b54534",
    "fact": "Inaugurated in 1914 with Kingo Tatsuno’s 335m red-brick Marunouchi facade; on October 1, 1964, the world’s first high-speed bullet train (Tokaido Shinkansen 0 Series) departed Platform 19 here for Osaka.",
    "destinations": "TO KYOTO • OSAKA • SENDAI • KANAZAWA • HAKODATE",
    "trainType": "JR Central Tokaido Shinkansen • JR East Tohoku / Hokuriku / Joetsu Shinkansen",
    "trackPaths": [
      [
        [
          0,
          0
        ],
        [
          -4.4,
          9.06
        ],
        [
          -8.41,
          17.41
        ],
        [
          -9.56,
          30.34
        ]
      ]
    ]
  },
  {
    "id": "gl-shinjuku-station",
    "name": "Shinjuku Station (Western Metropolis Megahub)",
    "year": 1885,
    "lat": 35.69,
    "lon": 139.7004,
    "x": -63.74,
    "z": -10.35,
    "azimuth": 0.05,
    "color": "#009bbf",
    "fact": "Handling over 3.5 million passengers every day across JR East, Odakyu, Keio, Tokyo Metro, and Toei Subway platforms, framed on the west by the Nishi-Shinjuku skyscraper canyon and Cocoon Tower.",
    "destinations": "TO MT. FUJI • MATSUMOTO • HAKONE • NARITA AIRPORT",
    "trainType": "JR Chuo Express • Narita Express • Odakyu Romancecar (Hakone)",
    "trackPaths": [
      [
        [
          -63.74,
          -10.35
        ],
        [
          -63.93,
          -20.35
        ],
        [
          -62.69,
          -29.75
        ],
        [
          -60.49,
          -36.93
        ]
      ]
    ]
  }
];
