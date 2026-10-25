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

export const ZURICH_RAIL_TERMINI: CityRailTerminus[] = [
  {
    "id": "gl-zurich-hb",
    "name": "Zürich Hauptbahnhof (SBB CFF FFS • TGV Lyria • ICE • Railjet)",
    "year": 1847,
    "lat": 47.3782,
    "lon": 8.5402,
    "x": -1.84,
    "z": -8.82,
    "azimuth": -0.32,
    "color": "#e30613",
    "fact": "Opened in 1847 for the Spanisch-Brötli-Bahn and crowned by Jakob Friedrich Wanner’s 1871 sandstone triumphal arch, Zürich HB combines an iron surface train shed (home to Niki de Saint Phalle’s \"L’Ange Protecteur\") with three underground stations.",
    "destinations": "NACH BERN • GENÈVE • BASEL • LUGANO/MILANO • PARIS • WIEN",
    "trainType": "SBB InterCity • Giruno Gotthard Base Tunnel • TGV Lyria • DB ICE • ÖBB Nightjet",
    "trackPaths": [
      [
        [
          -1.84,
          -8.82
        ],
        [
          -11.7,
          -13.7
        ],
        [
          -25.51,
          -20.07
        ],
        [
          -46.24,
          -26.86
        ]
      ]
    ]
  },
  {
    "id": "gl-zurich-stadelhofen",
    "name": "Bahnhof Zürich Stadelhofen (1894 / 1990 Santiago Calatrava)",
    "year": 1894,
    "lat": 47.3667,
    "lon": 8.5485,
    "x": 5.8,
    "z": 6.78,
    "azimuth": -0.52,
    "color": "#00529b",
    "fact": "Transformed in 1990 by ETH alumnus Santiago Calatrava into an organic architectural masterpiece of inclined white concrete arches, cantilevered steel canopies, and a subterranean promenade.",
    "destinations": "NACH RAPPERSWIL • WINTERTHUR • SCHAFFHAUSEN • FLUGHAFEN",
    "trainType": "ZVV S-Bahn Core Trunk (S2–S16) • Forchbahn S18",
    "trackPaths": [
      [
        [
          5.8,
          6.78
        ],
        [
          11.05,
          16.55
        ],
        [
          17.69,
          28.89
        ]
      ]
    ]
  }
];
