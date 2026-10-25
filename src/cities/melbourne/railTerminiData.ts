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

export const MELBOURNE_RAIL_TERMINI: CityRailTerminus[] = [
  {
    "id": "gl-flinders-street",
    "name": "Flinders Street Railway Station (1854 / 1910 Suburban & Gippsland Hub)",
    "year": 1854,
    "lat": -37.8183,
    "lon": 144.9671,
    "x": 4.04,
    "z": 6,
    "azimuth": -0.49,
    "color": "#e8b93c",
    "fact": "Australia’s first city railway station (1854), stretching 708 meters along the north bank of the Yarra River with Platform 1—the fourth-longest railway platform in the world.",
    "destinations": "TO SANDRINGHAM • FRANKSTON • PAKENHAM • MERNDA • BELGRAVE",
    "trainType": "Metro Trains Melbourne (15 Suburban Lines) • V/Line Gippsland",
    "trackPaths": [
      [
        [
          4.04,
          6
        ],
        [
          13.54,
          7.53
        ],
        [
          27.39,
          13.27
        ],
        [
          45.89,
          16.47
        ]
      ]
    ]
  },
  {
    "id": "gl-southern-cross",
    "name": "Southern Cross Station (Spencer Street • V/Line, XPT & Overland Terminus)",
    "year": 1859,
    "lat": -37.8184,
    "lon": 144.9525,
    "x": -10.71,
    "z": 6.13,
    "azimuth": 1.08,
    "color": "#0072ce",
    "fact": "Opened in 1859 as Spencer Street Station and covered in 2006 by Nicholas Grimshaw’s 43,000 m² Lubetkin-Prize-winning undulating wave roof, serving all regional Victorian and interstate trains.",
    "destinations": "TO GEELONG • BALLARAT • BENDIGO • SYDNEY (XPT) • ADELAIDE",
    "trainType": "V/Line Regional Rail • NSW TrainLink XPT to Sydney • The Overland to Adelaide",
    "trackPaths": [
      [
        [
          -10.71,
          6.13
        ],
        [
          -15.77,
          -1.4
        ],
        [
          -20.82,
          -8.17
        ],
        [
          -34.97,
          -15.44
        ]
      ]
    ]
  }
];
