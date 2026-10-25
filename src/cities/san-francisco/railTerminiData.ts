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

export const SAN_FRANCISCO_RAIL_TERMINI: CityRailTerminus[] = [
  {
    "id": "gl-sf-caltrain",
    "name": "San Francisco 4th & King Station (Caltrain Peninsula Terminal)",
    "year": 1975,
    "lat": 37.7764,
    "lon": -122.3945,
    "x": 15.08,
    "z": 16.53,
    "azimuth": -0.78,
    "color": "#d31245",
    "fact": "Northern terminus of California’s oldest passenger railway corridor (founded 1863 by the Southern Pacific to link San Francisco with San Jose); completely electrified in September 2024 with high-speed double-deck electric trains.",
    "destinations": "TO MILLBRAE (SFO) • PALO ALTO (STANFORD) • SILICON VALLEY • SAN JOSE DIRIDON",
    "trainType": "Caltrain 25kV Electrified Peninsula Express (Stadler KISS Double-Deck)",
    "trackPaths": [
      [
        [
          15.08,
          16.53
        ],
        [
          10.15,
          22.63
        ],
        [
          9.17,
          30.71
        ],
        [
          13.11,
          41.27
        ]
      ]
    ]
  },
  {
    "id": "gl-sf-transbay",
    "name": "Salesforce Transit Center (Historic 1939 Transbay Terminal)",
    "year": 1939,
    "lat": 37.7897,
    "lon": -122.3965,
    "x": 13.11,
    "z": 0,
    "azimuth": -0.78,
    "color": "#38b6ff",
    "fact": "Originally opened in January 1939 for Key System electric trains crossing the lower deck of the Bay Bridge; rebuilt in 2018 by César Pelli with a four-block elevated rooftop park, undulating Penrose-tile white aluminum skin, and a subterranean train box below.",
    "destinations": "ACROSS THE BAY BRIDGE TO OAKLAND • BERKELEY • SILICON VALLEY",
    "trainType": "Transbay Bus Deck • Future Caltrain & California High-Speed Rail Underground Box",
    "trackPaths": [
      [
        [
          13.11,
          0
        ],
        [
          18.53,
          3.98
        ],
        [
          24.94,
          0.25
        ],
        [
          32.82,
          -6.59
        ]
      ]
    ]
  }
];
