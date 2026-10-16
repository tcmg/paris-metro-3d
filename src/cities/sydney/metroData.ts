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
    "name": "M1 — Metro North West & Bankstown Line (Crows Nest ↔ Sydenham)",
    "color": "#009b77",
    "textColor": "#ffffff",
    "openedYear": 2019,
    "rollingStockStyle": "Sydney Metro (Alstom Metropolis)",
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
          "T1",
          "T2",
          "T3",
          "T4",
          "T7",
          "T8",
          "T9"
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
        "fact": "Serves the inner-south Waterloo precinct with First Nations artwork by Nicole Monks.",
        "isGhost": false
      },
      {
        "name": "Sydenham",
        "lat": -33.9145,
        "lon": 151.1658,
        "x": -45.11,
        "z": 61.59,
        "year": 1884,
        "lines": [
          "M1",
          "T3",
          "T4"
        ],
        "fact": "Southern portal of the M1 City & Southwest tunnels and major Inner West junction.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "T1",
    "name": "T1 — North Shore & Western Line",
    "color": "#f99d1c",
    "textColor": "#10141c",
    "openedYear": 1855,
    "rollingStockStyle": "NSWGR / Sydney Trains (Waratah Double-Deck)",
    "stations": [
      {
        "name": "St Leonards",
        "lat": -33.8228,
        "lon": 151.1942,
        "x": -15.73,
        "z": -52.51,
        "year": 1890,
        "lines": [
          "T1",
          "T9"
        ],
        "fact": "Opened in 1890 on the North Shore Line ridge.",
        "isGhost": false
      },
      {
        "name": "Waverton",
        "lat": -33.8378,
        "lon": 151.1972,
        "x": -12.62,
        "z": -33.85,
        "year": 1932,
        "lines": [
          "T1"
        ],
        "fact": "Opened in 1932 when the North Shore line was rerouted onto the Harbour Bridge.",
        "isGhost": false
      },
      {
        "name": "North Sydney",
        "lat": -33.8415,
        "lon": 151.2075,
        "x": -1.97,
        "z": -29.24,
        "year": 1932,
        "lines": [
          "T1",
          "T9"
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
          "T1",
          "T9"
        ],
        "fact": "Perched directly on the northern approach ramp of the Sydney Harbour Bridge.",
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
          "T1",
          "T3",
          "T8",
          "T9"
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
          "T1",
          "T3",
          "T4",
          "T9"
        ],
        "fact": "Central CBD underground interchange beneath George Street.",
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
          "T1",
          "T2",
          "T3",
          "T4",
          "T7",
          "T8",
          "T9"
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
          "T2",
          "T3",
          "T4",
          "T7",
          "T9"
        ],
        "fact": "Site of NSW’s first railway departure in September 1855 and historic heart of Aboriginal civil rights in Sydney.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "T2",
    "name": "T2 — Leppington & Inner West Line (City Circle)",
    "color": "#0098cd",
    "textColor": "#ffffff",
    "openedYear": 1926,
    "rollingStockStyle": "NSWGR (Bradfield City Circle)",
    "stations": [
      {
        "name": "Circular Quay (Warrane)",
        "lat": -33.8613,
        "lon": 151.2108,
        "x": 1.45,
        "z": -4.6,
        "year": 1956,
        "lines": [
          "T2",
          "T8"
        ],
        "fact": "Opened in January 1956 atop the Cahill Expressway viaduct, offering panoramic views of both the Opera House and Harbour Bridge.",
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
          "T2",
          "T8"
        ],
        "fact": "Inaugural 1926 station featuring two active City Circle tracks flanking two unused center ghost platforms built for a never-completed East–West line.",
        "isGhost": true
      },
      {
        "name": "Museum",
        "lat": -33.8762,
        "lon": 151.2098,
        "x": 0.41,
        "z": 13.94,
        "year": 1926,
        "lines": [
          "T2",
          "T8"
        ],
        "fact": "Opened on December 20, 1926 beneath southern Hyde Park as Australia’s first underground station alongside St James.",
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
          "T1",
          "T2",
          "T3",
          "T4",
          "T7",
          "T8",
          "T9"
        ],
        "fact": "Southern anchor of the City Circle.",
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
          "T2",
          "T3",
          "T4",
          "T7",
          "T9"
        ],
        "fact": "Western portal where City Circle trains join the 1855 Parramatta alignment.",
        "isGhost": false
      },
      {
        "name": "Macdonaldtown",
        "lat": -33.8968,
        "lon": 151.1862,
        "x": -24,
        "z": 39.57,
        "year": 1878,
        "lines": [
          "T2"
        ],
        "fact": "Flanks the historic 1887 Eveleigh Locomotive Workshops.",
        "isGhost": false
      },
      {
        "name": "Newtown",
        "lat": -33.8979,
        "lon": 151.1795,
        "x": -30.94,
        "z": 40.94,
        "year": 1855,
        "lines": [
          "T2",
          "T7"
        ],
        "fact": "One of the original six stations opened on September 26, 1855.",
        "isGhost": false
      },
      {
        "name": "Stanmore",
        "lat": -33.8946,
        "lon": 151.1645,
        "x": -46.46,
        "z": 36.83,
        "year": 1878,
        "lines": [
          "T2",
          "T5",
          "T9"
        ],
        "fact": "Heritage-listed Victorian suburban station on the Inner West trunk.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "T3",
    "name": "T3 — Liverpool & Inner West Line (City Circle ↔ Sydenham)",
    "color": "#f37021",
    "textColor": "#ffffff",
    "openedYear": 1895,
    "rollingStockStyle": "NSWGR / Sydney Trains",
    "stations": [
      {
        "name": "Wynyard (with Tram Ghost Tunnels)",
        "lat": -33.8655,
        "lon": 151.206,
        "x": -3.52,
        "z": 0.62,
        "year": 1932,
        "lines": [
          "T1",
          "T3",
          "T8",
          "T9"
        ],
        "fact": "Western City Circle interchange.",
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
          "T1",
          "T3",
          "T4",
          "T9"
        ],
        "fact": "George Street underground hub.",
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
          "T1",
          "T2",
          "T3",
          "T4",
          "T7",
          "T8",
          "T9"
        ],
        "fact": "Connects City Circle to the Illawarra relief tracks.",
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
          "T2",
          "T3",
          "T4",
          "T7",
          "T9"
        ],
        "fact": "Junction for the Erskineville & Sydenham alignment.",
        "isGhost": false
      },
      {
        "name": "Erskineville",
        "lat": -33.9002,
        "lon": 151.1865,
        "x": -23.69,
        "z": 43.8,
        "year": 1884,
        "lines": [
          "T3"
        ],
        "fact": "Serves the Erskineville village precinct.",
        "isGhost": false
      },
      {
        "name": "St Peters",
        "lat": -33.9075,
        "lon": 151.1808,
        "x": -29.59,
        "z": 52.88,
        "year": 1884,
        "lines": [
          "T3"
        ],
        "fact": "Overlooks the historic brick kilns of Sydney Park.",
        "isGhost": false
      },
      {
        "name": "Sydenham",
        "lat": -33.9145,
        "lon": 151.1658,
        "x": -45.11,
        "z": 61.59,
        "year": 1884,
        "lines": [
          "M1",
          "T3",
          "T4"
        ],
        "fact": "Historic junction where the 1895 Bankstown line diverges west.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "T4",
    "name": "T4 — Eastern Suburbs & Illawarra Line (Sydenham ↔ Bondi Junction)",
    "color": "#005aa3",
    "textColor": "#ffffff",
    "openedYear": 1979,
    "rollingStockStyle": "PTC / Sydney Trains",
    "stations": [
      {
        "name": "Sydenham",
        "lat": -33.9145,
        "lon": 151.1658,
        "x": -45.11,
        "z": 61.59,
        "year": 1884,
        "lines": [
          "M1",
          "T3",
          "T4"
        ],
        "fact": "Opened October 15, 1884 on the original Illawarra Line.",
        "isGhost": false
      },
      {
        "name": "Redfern",
        "lat": -33.8922,
        "lon": 151.1988,
        "x": -10.97,
        "z": 33.85,
        "year": 1979,
        "lines": [
          "T1",
          "T2",
          "T3",
          "T4",
          "T7",
          "T9"
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
          "T1",
          "T2",
          "T3",
          "T4",
          "T7",
          "T8",
          "T9"
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
          "T1",
          "T3",
          "T4",
          "T9"
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
  },
  {
    "line": "T5",
    "name": "T5 — Cumberland Line (Western & South West Orbital)",
    "color": "#c4258f",
    "textColor": "#ffffff",
    "openedYear": 1996,
    "rollingStockStyle": "CityRail / Sydney Trains",
    "stations": [
      {
        "name": "Stanmore",
        "lat": -33.8946,
        "lon": 151.1645,
        "x": -46.46,
        "z": 36.83,
        "year": 1878,
        "lines": [
          "T2",
          "T5",
          "T9"
        ],
        "fact": "Connects with the Western/South orbital relief corridor.",
        "isGhost": false
      },
      {
        "name": "Petersham",
        "lat": -33.8942,
        "lon": 151.1558,
        "x": -55.46,
        "z": 36.33,
        "year": 1857,
        "lines": [
          "T5"
        ],
        "fact": "Features one of Sydney’s finest heritage station buildings (1886).",
        "isGhost": false
      },
      {
        "name": "Lewisham",
        "lat": -33.892,
        "lon": 151.1475,
        "x": -64.05,
        "z": 33.6,
        "year": 1886,
        "lines": [
          "T5",
          "T7"
        ],
        "fact": "Adjacent to the 1886 Long Cove Creek railway viaduct.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "T7",
    "name": "T7 — Olympic Park Line (Special Event & Express Spine)",
    "color": "#6f818e",
    "textColor": "#ffffff",
    "openedYear": 1998,
    "rollingStockStyle": "CityRail Olympic Express",
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
          "T1",
          "T2",
          "T3",
          "T4",
          "T7",
          "T8",
          "T9"
        ],
        "fact": "Origin of T7 Major Event express services to Sydney Olympic Park.",
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
          "T2",
          "T3",
          "T4",
          "T7",
          "T9"
        ],
        "fact": "Major Inner-City pickup for T7 Olympic Park event trains.",
        "isGhost": false
      },
      {
        "name": "Newtown",
        "lat": -33.8979,
        "lon": 151.1795,
        "x": -30.94,
        "z": 40.94,
        "year": 1855,
        "lines": [
          "T2",
          "T7"
        ],
        "fact": "Express corridor heading west toward Lidcombe and Olympic Park.",
        "isGhost": false
      },
      {
        "name": "Lewisham",
        "lat": -33.892,
        "lon": 151.1475,
        "x": -64.05,
        "z": 33.6,
        "year": 1886,
        "lines": [
          "T5",
          "T7"
        ],
        "fact": "Western express approach toward the Olympic Park balloon loop.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "T8",
    "name": "T8 — Airport & South Line (City Circle ↔ Sydney Airport)",
    "color": "#00954c",
    "textColor": "#ffffff",
    "openedYear": 2000,
    "rollingStockStyle": "Airport Link / Sydney Trains",
    "stations": [
      {
        "name": "Wynyard (with Tram Ghost Tunnels)",
        "lat": -33.8655,
        "lon": 151.206,
        "x": -3.52,
        "z": 0.62,
        "year": 1932,
        "lines": [
          "T1",
          "T3",
          "T8",
          "T9"
        ],
        "fact": "Northern City Circle interchange for Airport trains.",
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
          "T2",
          "T8"
        ],
        "fact": "Direct rail link from Sydney’s ferry terminal and Opera House to the Airport.",
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
          "T2",
          "T8"
        ],
        "fact": "Eastern City Circle stop on the T8 Airport loop.",
        "isGhost": true
      },
      {
        "name": "Museum",
        "lat": -33.8762,
        "lon": 151.2098,
        "x": 0.41,
        "z": 13.94,
        "year": 1926,
        "lines": [
          "T2",
          "T8"
        ],
        "fact": "Southern Hyde Park stop before diving into the Airport tunnel.",
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
          "T1",
          "T2",
          "T3",
          "T4",
          "T7",
          "T8",
          "T9"
        ],
        "fact": "Portal where T8 trains dive south into the 2000 New Southern Railway tunnel.",
        "isGhost": false
      },
      {
        "name": "Green Square",
        "lat": -33.9062,
        "lon": 151.2028,
        "x": -6.83,
        "z": 51.27,
        "year": 2000,
        "lines": [
          "T8"
        ],
        "fact": "Opened May 21, 2000 as the first underground station on the Airport Link.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "T9",
    "name": "T9 — Northern Line (North Shore ↔ Central ↔ Strathfield)",
    "color": "#d11f2f",
    "textColor": "#ffffff",
    "openedYear": 1886,
    "rollingStockStyle": "NSWGR / Sydney Trains",
    "stations": [
      {
        "name": "St Leonards",
        "lat": -33.8228,
        "lon": 151.1942,
        "x": -15.73,
        "z": -52.51,
        "year": 1890,
        "lines": [
          "T1",
          "T9"
        ],
        "fact": "Shared T1 / T9 North Shore express stop.",
        "isGhost": false
      },
      {
        "name": "North Sydney",
        "lat": -33.8415,
        "lon": 151.2075,
        "x": -1.97,
        "z": -29.24,
        "year": 1932,
        "lines": [
          "T1",
          "T9"
        ],
        "fact": "Major North Sydney employment hub station.",
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
          "T1",
          "T9"
        ],
        "fact": "Crosses the eastern pair of tracks on the Sydney Harbour Bridge.",
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
          "T1",
          "T3",
          "T8",
          "T9"
        ],
        "fact": "Connects North Shore and Western/Northern tracks.",
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
          "T1",
          "T3",
          "T4",
          "T9"
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
          "T1",
          "T2",
          "T3",
          "T4",
          "T7",
          "T8",
          "T9"
        ],
        "fact": "Connects Harbour Bridge spine to the Main Northern corridor.",
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
          "T2",
          "T3",
          "T4",
          "T7",
          "T9"
        ],
        "fact": "All T9 trains stop here before running express toward Burwood and Strathfield.",
        "isGhost": false
      },
      {
        "name": "Stanmore",
        "lat": -33.8946,
        "lon": 151.1645,
        "x": -46.46,
        "z": 36.83,
        "year": 1878,
        "lines": [
          "T2",
          "T5",
          "T9"
        ],
        "fact": "Inner West corridor toward Strathfield and the Hawkesbury River.",
        "isGhost": false
      }
    ]
  }
];
