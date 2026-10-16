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

export const SYDNEY_METRO_SYSTEM_NAME = "SYDNEY METRO M1 & BRADFIELD CITY CIRCLE";

export const SYDNEY_METRO_LINES: CityMetroLine[] = [
  {
    "line": "M1",
    "name": "M1 — Sydney Metro City & Southwest (Crows Nest ↔ Sydenham)",
    "color": "#009b77",
    "textColor": "#ffffff",
    "openedYear": 2024,
    "rollingStockStyle": "Sydney Metro",
    "stations": [
      {
        "name": "Crows Nest",
        "lat": -33.8268,
        "lon": 151.2032,
        "x": -6.41,
        "z": -47.53,
        "year": 2024,
        "lines": [
          "M1"
        ],
        "fact": "Northern gateway of the 2024 City & Southwest under-harbour tunnel.",
        "isGhost": false
      },
      {
        "name": "Victoria Cross (North Sydney)",
        "lat": -33.838,
        "lon": 151.2072,
        "x": -2.28,
        "z": -33.6,
        "year": 2024,
        "lines": [
          "M1"
        ],
        "fact": "Deep cavern beneath Miller Street before M1 plunges under Port Jackson.",
        "isGhost": false
      },
      {
        "name": "Barangaroo",
        "lat": -33.8592,
        "lon": 151.2022,
        "x": -7.45,
        "z": -7.22,
        "year": 2024,
        "lines": [
          "M1"
        ],
        "fact": "First station south of the under-harbour crossing, adjacent to Hickson Road and Nawi Cove.",
        "isGhost": false
      },
      {
        "name": "Martin Place",
        "lat": -33.8678,
        "lon": 151.2112,
        "x": 1.86,
        "z": 3.48,
        "year": 1979,
        "lines": [
          "M1",
          "T4"
        ],
        "fact": "Major subterranean cathedral connecting the 1979 T4 Eastern Suburbs platforms with the 2024 M1 Metro.",
        "isGhost": false
      },
      {
        "name": "Gadigal (Pitt Street)",
        "lat": -33.8732,
        "lon": 151.2082,
        "x": -1.24,
        "z": 10.2,
        "year": 2024,
        "lines": [
          "M1"
        ],
        "fact": "Named in honor of the Gadigal people, Traditional Custodians of the Sydney CBD.",
        "isGhost": false
      },
      {
        "name": "Central",
        "lat": -33.8832,
        "lon": 151.2062,
        "x": -3.31,
        "z": 22.65,
        "year": 1906,
        "lines": [
          "M1",
          "T2",
          "T1",
          "T4"
        ],
        "fact": "Australia’s grandest railway interchange.",
        "isGhost": false
      },
      {
        "name": "Waterloo",
        "lat": -33.895,
        "lon": 151.2035,
        "x": -6.1,
        "z": 37.33,
        "year": 2024,
        "lines": [
          "M1"
        ],
        "fact": "Serves the inner-south Waterloo precinct.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "T2",
    "name": "T2 / T8 — Bradfield City Circle & Harbour Loop",
    "color": "#0072ce",
    "textColor": "#ffffff",
    "openedYear": 1926,
    "rollingStockStyle": "NSWGR (Bradfield)",
    "stations": [
      {
        "name": "Central",
        "lat": -33.8832,
        "lon": 151.2062,
        "x": -3.31,
        "z": 22.65,
        "year": 1906,
        "lines": [
          "M1",
          "T2",
          "T1",
          "T4"
        ],
        "fact": "Southern anchor of the City Circle.",
        "isGhost": false
      },
      {
        "name": "Museum",
        "lat": -33.8762,
        "lon": 151.2098,
        "x": 0.41,
        "z": 13.94,
        "year": 1926,
        "lines": [
          "T2"
        ],
        "fact": "Opened on December 20, 1926 beneath southern Hyde Park as Australia’s first underground station alongside St James.",
        "isGhost": false
      },
      {
        "name": "St James (with Ghost Platforms)",
        "lat": -33.8702,
        "lon": 151.2118,
        "x": 2.48,
        "z": 6.47,
        "year": 1926,
        "lines": [
          "T2"
        ],
        "fact": "Inaugural 1926 station featuring two active City Circle tracks flanking two unused center ghost platforms built for a never-completed East–West line.",
        "isGhost": true
      },
      {
        "name": "Circular Quay (Warrane)",
        "lat": -33.8613,
        "lon": 151.2108,
        "x": 1.45,
        "z": -4.6,
        "year": 1956,
        "lines": [
          "T2"
        ],
        "fact": "Opened in January 1956 atop the Cahill Expressway viaduct, offering panoramic views of both the Opera House and Harbour Bridge.",
        "isGhost": false
      },
      {
        "name": "Wynyard (with Tram Ghost Tunnels)",
        "lat": -33.8655,
        "lon": 151.206,
        "x": -3.52,
        "z": 0.62,
        "year": 1932,
        "lines": [
          "T2"
        ],
        "fact": "Opened on March 19, 1932 with the Harbour Bridge; platforms 1 & 2 originally carried North Shore trams until 1958.",
        "isGhost": true
      },
      {
        "name": "Town Hall",
        "lat": -33.8735,
        "lon": 151.2068,
        "x": -2.69,
        "z": 10.58,
        "year": 1932,
        "lines": [
          "T2",
          "T1",
          "T4"
        ],
        "fact": "Opened in 1932 directly beneath George Street beside Sydney Town Hall and the QVB.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "T1",
    "name": "T1 — North Shore & Harbour Bridge Line",
    "color": "#f99d1c",
    "textColor": "#10141c",
    "openedYear": 1932,
    "rollingStockStyle": "Sydney Trains",
    "stations": [
      {
        "name": "North Sydney",
        "lat": -33.8415,
        "lon": 151.2075,
        "x": -1.97,
        "z": -29.24,
        "year": 1932,
        "lines": [
          "T1"
        ],
        "fact": "Opened with the Harbour Bridge electrification in March 1932.",
        "isGhost": false
      },
      {
        "name": "Milsons Point",
        "lat": -33.8462,
        "lon": 151.2118,
        "x": 2.48,
        "z": -23.39,
        "year": 1932,
        "lines": [
          "T1"
        ],
        "fact": "Perched directly on the northern approach ramp of the Sydney Harbour Bridge.",
        "isGhost": false
      },
      {
        "name": "Wynyard",
        "lat": -33.8655,
        "lon": 151.206,
        "x": -3.52,
        "z": 0.62,
        "year": 1932,
        "lines": [
          "T1"
        ],
        "fact": "Dives underground off the southern span of the Harbour Bridge.",
        "isGhost": false
      },
      {
        "name": "Town Hall",
        "lat": -33.8735,
        "lon": 151.2068,
        "x": -2.69,
        "z": 10.58,
        "year": 1932,
        "lines": [
          "T2",
          "T1",
          "T4"
        ],
        "fact": "Central CBD interchange.",
        "isGhost": false
      },
      {
        "name": "Central",
        "lat": -33.8832,
        "lon": 151.2062,
        "x": -3.31,
        "z": 22.65,
        "year": 1906,
        "lines": [
          "M1",
          "T2",
          "T1",
          "T4"
        ],
        "fact": "Through-platforms 16–23.",
        "isGhost": false
      },
      {
        "name": "Redfern",
        "lat": -33.8922,
        "lon": 151.1988,
        "x": -10.97,
        "z": 33.85,
        "year": 1855,
        "lines": [
          "T1",
          "T4"
        ],
        "fact": "Site of NSW’s first railway departure in September 1855 and historic heart of Aboriginal civil rights in Sydney.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "T4",
    "name": "T4 — Eastern Suburbs & Illawarra Line (Redfern ↔ Bondi Junction)",
    "color": "#005aa3",
    "textColor": "#ffffff",
    "openedYear": 1979,
    "rollingStockStyle": "PTC / Sydney Trains",
    "stations": [
      {
        "name": "Redfern",
        "lat": -33.8922,
        "lon": 151.1988,
        "x": -10.97,
        "z": 33.85,
        "year": 1979,
        "lines": [
          "T1",
          "T4"
        ],
        "fact": "Underground portal of the Eastern Suburbs line.",
        "isGhost": false
      },
      {
        "name": "Central",
        "lat": -33.8832,
        "lon": 151.2062,
        "x": -3.31,
        "z": 22.65,
        "year": 1979,
        "lines": [
          "M1",
          "T2",
          "T1",
          "T4"
        ],
        "fact": "Contains two completed but unused ghost platforms (26–27) directly above the active T4 tracks.",
        "isGhost": true
      },
      {
        "name": "Town Hall",
        "lat": -33.8735,
        "lon": 151.2068,
        "x": -2.69,
        "z": 10.58,
        "year": 1979,
        "lines": [
          "T2",
          "T1",
          "T4"
        ],
        "fact": "Cross-platform transfer with T1.",
        "isGhost": false
      },
      {
        "name": "Martin Place",
        "lat": -33.8678,
        "lon": 151.2112,
        "x": 1.86,
        "z": 3.48,
        "year": 1979,
        "lines": [
          "M1",
          "T4"
        ],
        "fact": "Connects with M1 Metro.",
        "isGhost": false
      },
      {
        "name": "Kings Cross",
        "lat": -33.8745,
        "lon": 151.2248,
        "x": 15.93,
        "z": 11.82,
        "year": 1979,
        "lines": [
          "T4"
        ],
        "fact": "Bored inside the Potts Point sandstone ridge.",
        "isGhost": false
      },
      {
        "name": "Edgecliff",
        "lat": -33.8798,
        "lon": 151.2368,
        "x": 28.35,
        "z": 18.42,
        "year": 1979,
        "lines": [
          "T4"
        ],
        "fact": "Serves Double Bay and Eastern Suburbs bays.",
        "isGhost": false
      },
      {
        "name": "Bondi Junction",
        "lat": -33.8915,
        "lon": 151.2485,
        "x": 40.46,
        "z": 32.97,
        "year": 1979,
        "lines": [
          "T4"
        ],
        "fact": "Eastern terminus serving Bondi Beach.",
        "isGhost": false
      }
    ]
  }
];
