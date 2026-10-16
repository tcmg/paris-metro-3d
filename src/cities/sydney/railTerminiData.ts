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

export const SYDNEY_RAIL_TERMINI: CityRailTerminus[] = [
  {
    "id": "gl-sydney-central",
    "name": "Sydney Central Terminal",
    "year": 1906,
    "lat": -33.8832,
    "lon": 151.2062,
    "x": -3.31,
    "z": 22.65,
    "azimuth": -2.92,
    "color": "#e8a849",
    "fact": "Opened in 1906 with Walter Liberty Vernon’s grand sandstone concourse and 85m clock tower, dispatching the Southern Aurora, Spirit of Progress, Indian Pacific, and regional XPT trains across Australia.",
    "destinations": "TO CANBERRA • MELBOURNE • BRISBANE • PERTH",
    "trainType": "NSW TrainLink Regional • Indian Pacific • XPT",
    "trackPaths": [
      [
        [
          -3.31,
          22.65
        ],
        [
          -8.17,
          30.49
        ],
        [
          -14.38,
          39.2
        ],
        [
          -23.69,
          48.53
        ]
      ]
    ]
  }
];
