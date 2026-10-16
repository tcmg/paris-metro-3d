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

export const NYC_RAIL_TERMINI: CityRailTerminus[] = [
  {
    "id": "gl-grand-central-terminal",
    "name": "Grand Central Terminal",
    "year": 1913,
    "lat": 40.7527,
    "lon": -73.9772,
    "x": 9.29,
    "z": -12.12,
    "azimuth": 0.5,
    "color": "#4ca896",
    "fact": "The world’s largest railway station by platform count (44 platforms, 67 subterranean tracks on two levels beneath Park Avenue), famous for launching the art deco 20th Century Limited to Chicago and saved by Jacqueline Kennedy Onassis in the landmark 1978 Supreme Court ruling.",
    "destinations": "TO HUDSON VALLEY • NEW HAVEN • 20TH CENTURY LIMITED",
    "trainType": "Metro-North Railroad (Hudson, Harlem & New Haven) • LIRR Grand Central Madison",
    "trackPaths": [
      [
        [
          9.29,
          -12.12
        ],
        [
          14.79,
          -22.09
        ],
        [
          22.36,
          -35.68
        ],
        [
          31.65,
          -52.1
        ]
      ]
    ]
  },
  {
    "id": "gl-penn-station-nyc",
    "name": "Pennsylvania Station & Moynihan Train Hall",
    "year": 1910,
    "lat": 40.7506,
    "lon": -73.9935,
    "x": -4.73,
    "z": -9.74,
    "azimuth": -1.07,
    "color": "#f5b82e",
    "fact": "Opened in 1910 when the Pennsylvania Railroad bored electrified tunnels under both the Hudson and East Rivers, making Penn Station the busiest passenger rail facility in the Western Hemisphere.",
    "destinations": "TO WASHINGTON D.C. • BOSTON (ACELA) • LONG ISLAND",
    "trainType": "Amtrak Acela Northeast Corridor • LIRR • NJ Transit",
    "trackPaths": [
      [
        [
          -4.73,
          -9.74
        ],
        [
          -12.04,
          -13.03
        ],
        [
          -23.22,
          -18.12
        ]
      ]
    ]
  }
];
