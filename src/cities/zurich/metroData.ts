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

export const ZURICH_METRO_SYSTEM_NAME = "Zürcher Verkehrsverbund (ZVV) — S-Bahn Zürich, VBZ Trams, Polybahn & Dolderbahn";

export const ZURICH_METRO_LINES: CityMetroLine[] = [
  {
    "line": "S2",
    "name": "S-Bahn S2 — Flughafen ↔ Oerlikon ↔ Zürich HB (Museumstrasse Tunnel) ↔ Stadelhofen ↔ Enge",
    "color": "#00529b",
    "textColor": "#ffffff",
    "openedYear": 1990,
    "rollingStockStyle": "SBB / ZVV (RABe 511 KISS Double-Deck S-Bahn)",
    "stations": [
      {
        "name": "Zürich Oerlikon (S-Bahn North Hub)",
        "lat": 47.4115,
        "lon": 8.5441,
        "x": 1.75,
        "z": -53.98,
        "year": 1855,
        "lines": [
          "S2",
          "S8",
          "T10",
          "T11",
          "L12"
        ],
        "fact": "Northern railway gateway linking Zürich Airport and the 2014 Weinland and 1856 Wipkingen tunnels.",
        "isGhost": false
      },
      {
        "name": "Zürich Letten (1886–1989 Closed Ghost Station)",
        "lat": 47.3867,
        "lon": 8.5342,
        "x": -7.37,
        "z": -20.35,
        "year": 1886,
        "lines": [
          "S2"
        ],
        "fact": "Served the original single-track Letten Line along the Limmat for 103 years until replaced on May 27, 1990 by the Hirschengraben S-Bahn tunnel; its platforms now host cultural pop-ups.",
        "isGhost": true
      },
      {
        "name": "Zürich HB (Hauptbahnhof • Museumstrasse Underground)",
        "lat": 47.3782,
        "lon": 8.5402,
        "x": -1.84,
        "z": -8.82,
        "year": 1990,
        "lines": [
          "S2",
          "S8",
          "S10",
          "T3",
          "T4",
          "T7",
          "T10",
          "T11"
        ],
        "fact": "Opened May 27, 1990 beneath the Swiss National Museum as the centerpiece of Switzerland’s first S-Bahn underground cross-city line.",
        "isGhost": false
      },
      {
        "name": "Zürich Stadelhofen (Santiago Calatrava Station)",
        "lat": 47.3667,
        "lon": 8.5485,
        "x": 5.8,
        "z": 6.78,
        "year": 1990,
        "lines": [
          "S2",
          "S18",
          "T11"
        ],
        "fact": "Sculpted into the base of the Zürichberg hillside by Santiago Calatrava (1990) with skeletal concrete ribs, a soaring steel-ribbed pergola, and a subterranean shopping arcade.",
        "isGhost": false
      },
      {
        "name": "Zürich Enge (1927 Tessinerplatz Neo-Classical Granite Rotunda)",
        "lat": 47.3641,
        "lon": 8.5308,
        "x": -10.5,
        "z": 10.31,
        "year": 1927,
        "lines": [
          "S2",
          "S8",
          "T7",
          "T8"
        ],
        "fact": "Built by brothers Otto and Werner Pfister in 1925–1927 using Ticino granite after the Lake Zurich rail line was relocated into the Ulmberg Tunnel.",
        "isGhost": false
      },
      {
        "name": "Zürich Wollishofen (Lake Zurich West Shore)",
        "lat": 47.3472,
        "lon": 8.5338,
        "x": -7.74,
        "z": 33.23,
        "year": 1875,
        "lines": [
          "S2",
          "T7"
        ],
        "fact": "Lakeside S-Bahn station serving the Cassiopeiasteg boardwalk and Rote Fabrik cultural center.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "S8",
    "name": "S-Bahn S8 — Oerlikon ↔ Wipkingen ↔ Hardbrücke ↔ Zürich HB (Löwenstrasse Tunnel) ↔ Enge",
    "color": "#00843d",
    "textColor": "#ffffff",
    "openedYear": 1990,
    "rollingStockStyle": "SBB / ZVV (Siemens Desiro Double-Deck DPZ)",
    "stations": [
      {
        "name": "Zürich Oerlikon (S-Bahn North Hub)",
        "lat": 47.4115,
        "lon": 8.5441,
        "x": 1.75,
        "z": -53.98,
        "year": 1855,
        "lines": [
          "S2",
          "S8",
          "T10",
          "T11",
          "L12"
        ],
        "fact": "Connects the northern Glatt Valley with downtown Zurich via the 5 km Weinland Tunnel.",
        "isGhost": false
      },
      {
        "name": "Zürich Wipkingen (Limmat Viaduct Station)",
        "lat": 47.3929,
        "lon": 8.529,
        "x": -12.16,
        "z": -28.76,
        "year": 1856,
        "lines": [
          "S8"
        ],
        "fact": "Approaches the historic 1894 Aussersihl railway viaduct across the Limmat River.",
        "isGhost": false
      },
      {
        "name": "Zürich Hardbrücke (Prime Tower & Zürich-West)",
        "lat": 47.3852,
        "lon": 8.5178,
        "x": -22.47,
        "z": -18.31,
        "year": 1982,
        "lines": [
          "S8",
          "T4",
          "T8"
        ],
        "fact": "Suspended beneath the Hardbrücke road viaduct directly alongside the 126m Prime Tower.",
        "isGhost": false
      },
      {
        "name": "Zürich HB (Hauptbahnhof •Museumstrasse Underground)",
        "lat": 47.3782,
        "lon": 8.5402,
        "x": -1.84,
        "z": -8.82,
        "year": 2014,
        "lines": [
          "S2",
          "S8",
          "S10",
          "T3",
          "T4",
          "T7",
          "T10",
          "T11"
        ],
        "fact": "Includes the 2014 Durchgangsbahnhof Löwenstrasse (Tracks 31–34) excavated 16 meters below the historic 1871 terminal.",
        "isGhost": false
      },
      {
        "name": "Zürich Wiedikon",
        "lat": 47.3714,
        "lon": 8.5235,
        "x": -17.22,
        "z": 0.41,
        "year": 1875,
        "lines": [
          "S8"
        ],
        "fact": "Portal of the Zimmerberg Base Tunnel.",
        "isGhost": false
      },
      {
        "name": "Zürich Enge (1927 Tessinerplatz Neo-Classical Granite Rotunda)",
        "lat": 47.3641,
        "lon": 8.5308,
        "x": -10.5,
        "z": 10.31,
        "year": 1927,
        "lines": [
          "S2",
          "S8",
          "T7",
          "T8"
        ],
        "fact": "Serves the Enge banking quarter and Lake Zurich arboretum.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "S10",
    "name": "Uetlibergbahn S10 (SZU) — Zürich HB ↔ Selnau ↔ Giesshübel ↔ Triemli ↔ Uetliberg Kulm (870m)",
    "color": "#f39200",
    "textColor": "#10141c",
    "openedYear": 1875,
    "rollingStockStyle": "Sihltal Zürich Uetliberg Bahn (SZU Dual-Voltage Mountain Rail)",
    "stations": [
      {
        "name": "Zürich HB (Hauptbahnhof • SZU Underground Tracks 21–22)",
        "lat": 47.3782,
        "lon": 8.5402,
        "x": -1.84,
        "z": -8.82,
        "year": 1990,
        "lines": [
          "S2",
          "S8",
          "S10",
          "T3",
          "T4",
          "T7",
          "T10",
          "T11"
        ],
        "fact": "Subterranean SZU island platform constructed beneath the Sihl River bed in 1990.",
        "isGhost": false
      },
      {
        "name": "Zürich Selnau (with 1875 Surface Ghost Terminus)",
        "lat": 47.3724,
        "lon": 8.5322,
        "x": -9.21,
        "z": -0.95,
        "year": 1875,
        "lines": [
          "S10",
          "T8"
        ],
        "fact": "For 115 years (1875–1990), Selnau was a surface terminal on the Sihl; in 1990 the tracks were sunk into a sub-river tunnel to Zürich HB and the old surface yard became a television studio.",
        "isGhost": true
      },
      {
        "name": "Zürich Binz",
        "lat": 47.363,
        "lon": 8.5182,
        "x": -22.11,
        "z": 11.8,
        "year": 1990,
        "lines": [
          "S10"
        ],
        "fact": "Underground cut-and-cover station on the Uetliberg line.",
        "isGhost": false
      },
      {
        "name": "Zürich Friesenberg",
        "lat": 47.3596,
        "lon": 8.5082,
        "x": -31.32,
        "z": 16.41,
        "year": 1923,
        "lines": [
          "S10"
        ],
        "fact": "Foothill station serving the cooperative garden-city housing estates of Friesenberg.",
        "isGhost": false
      },
      {
        "name": "Zürich Triemli (Foot of the 7.9% Uetliberg Climb)",
        "lat": 47.3652,
        "lon": 8.4955,
        "x": -43.02,
        "z": 8.82,
        "year": 1875,
        "lines": [
          "S10"
        ],
        "fact": "Here the S10 begins its 79‰ (7.9%) adhesion mountain climb up the wooded flank of Uetliberg.",
        "isGhost": false
      },
      {
        "name": "Uetliberg (813m Mountain Terminus below Uto Kulm)",
        "lat": 47.3519,
        "lon": 8.4902,
        "x": -47.9,
        "z": 26.86,
        "year": 1875,
        "lines": [
          "S10"
        ],
        "fact": "Highest standard-gauge adhesion railway station in Europe outside the high Alps, steps below the 870m Uetliberg Kulm observation tower.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "S18",
    "name": "Forchbahn S18 (FB) — Zürich Stadelhofen ↔ Kreuzplatz ↔ Hegibachplatz ↔ Rehalp",
    "color": "#e30613",
    "textColor": "#ffffff",
    "openedYear": 1912,
    "rollingStockStyle": "Forchbahn AG (Stadler Be 4/6 Crimson Interurban)",
    "stations": [
      {
        "name": "Zürich Stadelhofen (Santiago Calatrava Station)",
        "lat": 47.3667,
        "lon": 8.5485,
        "x": 5.8,
        "z": 6.78,
        "year": 1912,
        "lines": [
          "S2",
          "S18",
          "T11"
        ],
        "fact": "Downtown terminus of the red Forchbahn on the square in front of Calatrava’s Stadelhofen station.",
        "isGhost": false
      },
      {
        "name": "Kreuzplatz",
        "lat": 47.3638,
        "lon": 8.5542,
        "x": 11.05,
        "z": 10.72,
        "year": 1912,
        "lines": [
          "S18"
        ],
        "fact": "Shared urban tramway trackage through Hottingen.",
        "isGhost": false
      },
      {
        "name": "Hegibachplatz",
        "lat": 47.3598,
        "lon": 8.5608,
        "x": 17.13,
        "z": 16.14,
        "year": 1912,
        "lines": [
          "S18",
          "T11"
        ],
        "fact": "Major eastern interchange with Tram 11 and Trolleybus 31.",
        "isGhost": false
      },
      {
        "name": "Balgrist",
        "lat": 47.3548,
        "lon": 8.5715,
        "x": 26.99,
        "z": 22.92,
        "year": 1912,
        "lines": [
          "S18"
        ],
        "fact": "Serves the Balgrist University Hospital.",
        "isGhost": false
      },
      {
        "name": "Zürich Rehalp (Transition to Mountain Right-of-Way)",
        "lat": 47.3518,
        "lon": 8.5805,
        "x": 35.28,
        "z": 26.99,
        "year": 1912,
        "lines": [
          "S18",
          "T11"
        ],
        "fact": "Where the Forchbahn leaves VBZ street tracks to climb toward Zumikon (1976 underground tunnel) and Esslingen.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "T2",
    "name": "VBZ Tram 2 & Limmattalbahn Light Rail — Tiefenbrunnen ↔ Bellevue ↔ Paradeplatz ↔ Stauffacher ↔ Letzigrund ↔ Farbhof / Schlieren",
    "color": "#e30613",
    "textColor": "#ffffff",
    "openedYear": 1882,
    "rollingStockStyle": "VBZ / AVA Limmattalbahn (Stadler Tramlink & Flexity Light Rail)",
    "stations": [
      {
        "name": "Zürich Tiefenbrunnen (1882 First Tram Terminus & Lake Bath)",
        "lat": 47.3504,
        "lon": 8.5614,
        "x": 17.69,
        "z": 28.89,
        "year": 1882,
        "lines": [
          "T2",
          "T4"
        ],
        "fact": "Eastern lakeside anchor of Tram 2 along Seefeldstrasse.",
        "isGhost": false
      },
      {
        "name": "Bellevue (Sechseläutenplatz & Opernhaus)",
        "lat": 47.3663,
        "lon": 8.5452,
        "x": 2.76,
        "z": 7.32,
        "year": 1882,
        "lines": [
          "T2",
          "T4",
          "T8",
          "T11"
        ],
        "fact": "Crosses the Quaibrücke with panoramic views of Lake Zurich and the Alps.",
        "isGhost": false
      },
      {
        "name": "Bürkliplatz (Lake Zurich Pier & Quaibrücke)",
        "lat": 47.3662,
        "lon": 8.5412,
        "x": -0.92,
        "z": 7.46,
        "year": 1882,
        "lines": [
          "T2",
          "T11"
        ],
        "fact": "Connects with Lake Zurich steamships on the left bank.",
        "isGhost": false
      },
      {
        "name": "Paradeplatz (Bahnhofstrasse & Fraumünster)",
        "lat": 47.3697,
        "lon": 8.5389,
        "x": -3.04,
        "z": 2.71,
        "year": 1882,
        "lines": [
          "T2",
          "T7",
          "T11"
        ],
        "fact": "Pivots west from Bahnhofstrasse toward Stauffacher and Kreis 4.",
        "isGhost": false
      },
      {
        "name": "Stauffacher (Kreis 4 Tram Junction)",
        "lat": 47.3728,
        "lon": 8.529,
        "x": -12.16,
        "z": -1.49,
        "year": 1897,
        "lines": [
          "T2",
          "T3",
          "T8"
        ],
        "fact": "Busy west-central tramway hub beside St. Jakob Church.",
        "isGhost": false
      },
      {
        "name": "Kalkbreite / Bahnhof Wiedikon",
        "lat": 47.374,
        "lon": 8.5218,
        "x": -18.79,
        "z": -3.12,
        "year": 1898,
        "lines": [
          "T2"
        ],
        "fact": "Framed by the pioneering 2014 Kalkbreite cooperative housing complex built directly atop the VBZ tram depot.",
        "isGhost": false
      },
      {
        "name": "Letzigrund (Stadion Letzigrund)",
        "lat": 47.3818,
        "lon": 8.5042,
        "x": -35,
        "z": -13.7,
        "year": 1900,
        "lines": [
          "T2"
        ],
        "fact": "Serves the famous Weltklasse Zürich athletics stadium designed by Bétrix & Consolascio.",
        "isGhost": false
      },
      {
        "name": "Farbhof (Limmattalbahn Light Rail Interchange)",
        "lat": 47.3905,
        "lon": 8.4885,
        "x": -49.46,
        "z": -25.5,
        "year": 2022,
        "lines": [
          "T2"
        ],
        "fact": "Extended in 2019–2022 as the 13.4 km Limmattalbahn (Line 20) interurban light rail corridor to Schlieren, Dietikon, and Killwangen.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "T3",
    "name": "VBZ Tram 3 — Klusplatz / Römerhof ↔ Kunsthaus ↔ Central ↔ Zürich HB ↔ Stauffacher ↔ Albisrieden",
    "color": "#00843d",
    "textColor": "#ffffff",
    "openedYear": 1900,
    "rollingStockStyle": "Verkehrsbetriebe Zürich (Bombardier Cobra Be 5/6 Low-Floor Tram)",
    "stations": [
      {
        "name": "Römerhof (Dolderbahn Lower Terminus)",
        "lat": 47.3695,
        "lon": 8.5592,
        "x": 15.66,
        "z": 2.98,
        "year": 1900,
        "lines": [
          "T3",
          "DB"
        ],
        "fact": "Connects the Hottingen hillside with the 1895 Dolderbahn rack railway.",
        "isGhost": false
      },
      {
        "name": "Kunsthaus (Heimplatz Cultural Hub)",
        "lat": 47.3702,
        "lon": 8.5484,
        "x": 5.71,
        "z": 2.03,
        "year": 1900,
        "lines": [
          "T3",
          "T8"
        ],
        "fact": "Stops directly between the 1910 Moser Kunsthaus, 2021 Chipperfield Kunsthaus, and Schauspielhaus.",
        "isGhost": false
      },
      {
        "name": "Central (Polybahn & Limmatquai North)",
        "lat": 47.3768,
        "lon": 8.5438,
        "x": 1.47,
        "z": -6.92,
        "year": 1900,
        "lines": [
          "T3",
          "T4",
          "T7",
          "T10",
          "PB"
        ],
        "fact": "Descends Rämistrasse along the medieval city wall alignment to Central.",
        "isGhost": false
      },
      {
        "name": "Zürich HB (Hauptbahnhof • Bahnhofplatz)",
        "lat": 47.3782,
        "lon": 8.5402,
        "x": -1.84,
        "z": -8.82,
        "year": 1900,
        "lines": [
          "S2",
          "S8",
          "S10",
          "T3",
          "T4",
          "T7",
          "T10",
          "T11"
        ],
        "fact": "Crosses the Bahnhofbrücke into the main station forecourt.",
        "isGhost": false
      },
      {
        "name": "Stauffacher (Kreis 4 Tram Junction)",
        "lat": 47.3728,
        "lon": 8.529,
        "x": -12.16,
        "z": -1.49,
        "year": 1900,
        "lines": [
          "T2",
          "T3",
          "T8"
        ],
        "fact": "Connects with Trams 2, 8, 9, and 14.",
        "isGhost": false
      },
      {
        "name": "Albisriederplatz",
        "lat": 47.3782,
        "lon": 8.5095,
        "x": -30.12,
        "z": -8.82,
        "year": 1923,
        "lines": [
          "T3"
        ],
        "fact": "Western residential square on the run out to Albisrieden.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "T4",
    "name": "VBZ Tram 4 — Hardbrücke / Escher-Wyss-Platz ↔ Zürich HB ↔ Limmatquai (Grossmünster) ↔ Bellevue ↔ Tiefenbrunnen",
    "color": "#1f4e8c",
    "textColor": "#ffffff",
    "openedYear": 1882,
    "rollingStockStyle": "Verkehrsbetriebe Zürich (Bombardier Cobra / Alstom Flexity Zurich Blue)",
    "stations": [
      {
        "name": "Zürich Hardbrücke (Prime Tower & Zürich-West)",
        "lat": 47.3852,
        "lon": 8.5178,
        "x": -22.47,
        "z": -18.31,
        "year": 2011,
        "lines": [
          "S8",
          "T4",
          "T8"
        ],
        "fact": "Opened in December 2011 as the Tram Zürich-West extension past Prime Tower and Schiffbau.",
        "isGhost": false
      },
      {
        "name": "Escher-Wyss-Platz",
        "lat": 47.3905,
        "lon": 8.523,
        "x": -17.69,
        "z": -25.5,
        "year": 1898,
        "lines": [
          "T4",
          "T8"
        ],
        "fact": "Named after the historic Escher Wyss turbine and steamship engineering works.",
        "isGhost": false
      },
      {
        "name": "Zürich HB (Hauptbahnhof • Bahnhofquai)",
        "lat": 47.3782,
        "lon": 8.5402,
        "x": -1.84,
        "z": -8.82,
        "year": 1882,
        "lines": [
          "S2",
          "S8",
          "S10",
          "T3",
          "T4",
          "T7",
          "T10",
          "T11"
        ],
        "fact": "Serves the eastern riverfront side of Zürich Hauptbahnhof along the Limmat.",
        "isGhost": false
      },
      {
        "name": "Central (Polybahn & Limmatquai North)",
        "lat": 47.3768,
        "lon": 8.5438,
        "x": 1.47,
        "z": -6.92,
        "year": 1882,
        "lines": [
          "T3",
          "T4",
          "T7",
          "T10",
          "PB"
        ],
        "fact": "Grand five-way tram junction across Bahnhofbrücke at the foot of the 1889 Polybahn.",
        "isGhost": false
      },
      {
        "name": "Rudolf-Brun-Brücke / Niederdorf",
        "lat": 47.3742,
        "lon": 8.5432,
        "x": 0.92,
        "z": -3.39,
        "year": 1882,
        "lines": [
          "T4"
        ],
        "fact": "Glides along pedestrianized Limmatquai past the medieval guildhalls of Niederdorf.",
        "isGhost": false
      },
      {
        "name": "Helmhaus (Grossmünster & Wasserkirche)",
        "lat": 47.3698,
        "lon": 8.5434,
        "x": 1.11,
        "z": 2.58,
        "year": 1882,
        "lines": [
          "T4"
        ],
        "fact": "Stops directly between the Romanesque towers of Grossmünster and the 1838 Münsterbrücke.",
        "isGhost": false
      },
      {
        "name": "Bellevue (Sechseläutenplatz & Opernhaus)",
        "lat": 47.3663,
        "lon": 8.5452,
        "x": 2.76,
        "z": 7.32,
        "year": 1882,
        "lines": [
          "T2",
          "T4",
          "T8",
          "T11"
        ],
        "fact": "Circular 1938 functionalist tram pavilion (\"Bellevue-Rondell\") where Lake Zurich meets the Limmat.",
        "isGhost": false
      },
      {
        "name": "Zürich Tiefenbrunnen (1882 First Tram Terminus & Lake Bath)",
        "lat": 47.3504,
        "lon": 8.5614,
        "x": 17.69,
        "z": 28.89,
        "year": 1882,
        "lines": [
          "T2",
          "T4"
        ],
        "fact": "Southern terminus of Zurich’s original September 5, 1882 horse tramway.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "T7",
    "name": "VBZ Tram 7 (1973 Milchbuck–Schwamendingen Underground U-Bahn Tunnel) — Wollishofen ↔ Bahnhof Enge ↔ Paradeplatz ↔ Zürich HB ↔ Milchbuck [U-Bahn] ↔ Tierspital [U-Bahn] ↔ Schwamendingerplatz",
    "color": "#3b4958",
    "textColor": "#ffffff",
    "openedYear": 1986,
    "rollingStockStyle": "VBZ Tram 2000 / Flexity (Underground Pre-Metro U-Bahn Tunnel Line)",
    "stations": [
      {
        "name": "Zürich Wollishofen (Lake Zurich West Shore)",
        "lat": 47.3472,
        "lon": 8.5338,
        "x": -7.74,
        "z": 33.23,
        "year": 1898,
        "lines": [
          "S2",
          "T7"
        ],
        "fact": "Southern lakeside terminus of Tram 7 in Wollishofen.",
        "isGhost": false
      },
      {
        "name": "Zürich Enge (1927 Tessinerplatz Neo-Classical Granite Rotunda)",
        "lat": 47.3641,
        "lon": 8.5308,
        "x": -10.5,
        "z": 10.31,
        "year": 1927,
        "lines": [
          "S2",
          "S8",
          "T7",
          "T8"
        ],
        "fact": "Loops around the twin-curved Ticino granite colonnades of Bahnhof Enge.",
        "isGhost": false
      },
      {
        "name": "Paradeplatz (Bahnhofstrasse & Fraumünster)",
        "lat": 47.3697,
        "lon": 8.5389,
        "x": -3.04,
        "z": 2.71,
        "year": 1882,
        "lines": [
          "T2",
          "T7",
          "T11"
        ],
        "fact": "Runs north along the full length of pedestrianized Bahnhofstrasse.",
        "isGhost": false
      },
      {
        "name": "Zürich HB (Hauptbahnhof • Bahnhofstrasse North)",
        "lat": 47.3782,
        "lon": 8.5402,
        "x": -1.84,
        "z": -8.82,
        "year": 1882,
        "lines": [
          "S2",
          "S8",
          "S10",
          "T3",
          "T4",
          "T7",
          "T10",
          "T11"
        ],
        "fact": "Crosses the Limmat at Bahnhofbrücke to Central.",
        "isGhost": false
      },
      {
        "name": "Central (Polybahn & Limmatquai North)",
        "lat": 47.3768,
        "lon": 8.5438,
        "x": 1.47,
        "z": -6.92,
        "year": 1882,
        "lines": [
          "T3",
          "T4",
          "T7",
          "T10",
          "PB"
        ],
        "fact": "Climbs Stampfenbachstrasse and Weinbergstrasse toward the Schöneich Tunnel.",
        "isGhost": false
      },
      {
        "name": "Milchbuck (1973 Pre-Built U-Bahn Underground Tunnel Portal)",
        "lat": 47.3978,
        "lon": 8.5425,
        "x": 0.28,
        "z": -35.4,
        "year": 1973,
        "lines": [
          "T7",
          "T10"
        ],
        "fact": "Excavated in 1971–1973 for Zurich’s cancelled heavy-rail U-Bahn; opened on February 1, 1986 as a 2.5 km underground tram-metro tunnel with island-platform left-hand running.",
        "isGhost": true
      },
      {
        "name": "Tierspital (Underground U-Bahn Cavern Station)",
        "lat": 47.4018,
        "lon": 8.5515,
        "x": 8.57,
        "z": -40.83,
        "year": 1986,
        "lines": [
          "T7"
        ],
        "fact": "First of three full subterranean metro stations inside the Milchbuck–Schwamendingen tunnel.",
        "isGhost": false
      },
      {
        "name": "Schörlistrasse (Underground U-Bahn Cavern Station)",
        "lat": 47.4038,
        "lon": 8.5625,
        "x": 18.7,
        "z": -43.54,
        "year": 1986,
        "lines": [
          "T7"
        ],
        "fact": "Deep underground metro station beneath the Zürichberg ridge.",
        "isGhost": false
      },
      {
        "name": "Überlandpark / Schwamendingerplatz (U-Bahn Tunnel Portal)",
        "lat": 47.4048,
        "lon": 8.5742,
        "x": 29.48,
        "z": -44.9,
        "year": 1986,
        "lines": [
          "T7"
        ],
        "fact": "Where Trams 7 and 9 emerge from the 2.5 km underground U-Bahn tunnel into the recently covered Luegisland highway park.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "T8",
    "name": "VBZ Tram 8 (Hardbrücke Cross-Valley Viaduct Line) — Hardturm ↔ Escher-Wyss-Platz ↔ Hardbrücke ↔ Stauffacher ↔ Selnau ↔ Enge ↔ Bellevue ↔ Kunsthaus",
    "color": "#8ec641",
    "textColor": "#10141c",
    "openedYear": 2017,
    "rollingStockStyle": "Verkehrsbetriebe Zürich (Flexity Cross-Valley Viaduct Tram)",
    "stations": [
      {
        "name": "Escher-Wyss-Platz",
        "lat": 47.3905,
        "lon": 8.523,
        "x": -17.69,
        "z": -25.5,
        "year": 1898,
        "lines": [
          "T4",
          "T8"
        ],
        "fact": "Northern approach to the Hardbrücke tram viaduct.",
        "isGhost": false
      },
      {
        "name": "Zürich Hardbrücke (Prime Tower & Zürich-West)",
        "lat": 47.3852,
        "lon": 8.5178,
        "x": -22.47,
        "z": -18.31,
        "year": 2017,
        "lines": [
          "S8",
          "T4",
          "T8"
        ],
        "fact": "In December 2017, Tram 8 became the first tram line to cross the 1.2 km Hardbrücke viaduct high above the SBB rail tracks and Limmat River.",
        "isGhost": false
      },
      {
        "name": "Helvetiaplatz (Langstrasse & Kreis 4)",
        "lat": 47.3762,
        "lon": 8.5262,
        "x": -14.74,
        "z": -6.1,
        "year": 1900,
        "lines": [
          "T8"
        ],
        "fact": "Cultural and market square in the heart of Aussersihl (Kreis 4).",
        "isGhost": false
      },
      {
        "name": "Stauffacher (Kreis 4 Tram Junction)",
        "lat": 47.3728,
        "lon": 8.529,
        "x": -12.16,
        "z": -1.49,
        "year": 1900,
        "lines": [
          "T2",
          "T3",
          "T8"
        ],
        "fact": "Major west-central tram interchange.",
        "isGhost": false
      },
      {
        "name": "Zürich Selnau (with 1875 Surface Ghost Terminus)",
        "lat": 47.3724,
        "lon": 8.5322,
        "x": -9.21,
        "z": -0.95,
        "year": 1900,
        "lines": [
          "S10",
          "T8"
        ],
        "fact": "Connects with the underground S10 Uetlibergbahn.",
        "isGhost": false
      },
      {
        "name": "Zürich Enge (1927 Tessinerplatz Neo-Classical Granite Rotunda)",
        "lat": 47.3641,
        "lon": 8.5308,
        "x": -10.5,
        "z": 10.31,
        "year": 1927,
        "lines": [
          "S2",
          "S8",
          "T7",
          "T8"
        ],
        "fact": "Serves Bahnhof Enge before crossing the Quaibrücke.",
        "isGhost": false
      },
      {
        "name": "Bellevue (Sechseläutenplatz & Opernhaus)",
        "lat": 47.3663,
        "lon": 8.5452,
        "x": 2.76,
        "z": 7.32,
        "year": 1900,
        "lines": [
          "T2",
          "T4",
          "T8",
          "T11"
        ],
        "fact": "Connects the lakeside with Rämistrasse.",
        "isGhost": false
      },
      {
        "name": "Kunsthaus (Heimplatz Cultural Hub)",
        "lat": 47.3702,
        "lon": 8.5484,
        "x": 5.71,
        "z": 2.03,
        "year": 1900,
        "lines": [
          "T3",
          "T8"
        ],
        "fact": "Climbs past Kunsthaus Zürich toward Römerhof and Klusplatz.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "T10",
    "name": "VBZ Tram 10 (Glattalbahn) — Zürich HB ↔ Central ↔ ETH / Universitätsspital ↔ Milchbuck ↔ Oerlikon",
    "color": "#d92b7a",
    "textColor": "#ffffff",
    "openedYear": 1906,
    "rollingStockStyle": "VBZ / VBG Glattalbahn (White & Magenta Cobra Light Rail)",
    "stations": [
      {
        "name": "Zürich HB (Hauptbahnhof • Bahnhofplatz)",
        "lat": 47.3782,
        "lon": 8.5402,
        "x": -1.84,
        "z": -8.82,
        "year": 1906,
        "lines": [
          "S2",
          "S8",
          "S10",
          "T3",
          "T4",
          "T7",
          "T10",
          "T11"
        ],
        "fact": "Departs the Alfred Escher monument plaza in front of the 1871 Wanner triumphal arch.",
        "isGhost": false
      },
      {
        "name": "Central (Polybahn & Limmatquai North)",
        "lat": 47.3768,
        "lon": 8.5438,
        "x": 1.47,
        "z": -6.92,
        "year": 1906,
        "lines": [
          "T3",
          "T4",
          "T7",
          "T10",
          "PB"
        ],
        "fact": "Begins the winding Weinbergstrasse climb up the Zürichberg.",
        "isGhost": false
      },
      {
        "name": "ETH / Universitätsspital (Semper Hauptgebäude)",
        "lat": 47.3763,
        "lon": 8.5482,
        "x": 5.53,
        "z": -6.24,
        "year": 1906,
        "lines": [
          "T10"
        ],
        "fact": "Stops directly between Gottfried Semper’s ETH Zürich and Karl Moser’s University of Zurich.",
        "isGhost": false
      },
      {
        "name": "Haldenbach / Seilbahn Rigiblick",
        "lat": 47.3828,
        "lon": 8.5498,
        "x": 7,
        "z": -15.06,
        "year": 1906,
        "lines": [
          "T10"
        ],
        "fact": "Connects with the 1901 Seilbahn Rigiblick funicular.",
        "isGhost": false
      },
      {
        "name": "Milchbuck (1973 Pre-Built U-Bahn Underground Tunnel Portal)",
        "lat": 47.3978,
        "lon": 8.5425,
        "x": 0.28,
        "z": -35.4,
        "year": 1973,
        "lines": [
          "T7",
          "T10"
        ],
        "fact": "Built in 1971–1973 as a deep underground U-Bahn station before voters rejected the heavy metro in the 1973 referendum; converted in 1986 into the 2.5 km Milchbuck–Schwamendingen underground tram tunnel.",
        "isGhost": true
      },
      {
        "name": "Zürich Oerlikon (S-Bahn North Hub)",
        "lat": 47.4115,
        "lon": 8.5441,
        "x": 1.75,
        "z": -53.98,
        "year": 2006,
        "lines": [
          "S2",
          "S8",
          "T10",
          "T11",
          "L12"
        ],
        "fact": "Continues along the elevated/segregated Glattalbahn light-rail viaducts to Zürich Airport.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "T11",
    "name": "VBZ Tram 11 (Bahnhofstrasse Flagship) — Oerlikon ↔ Zürich HB ↔ Rennweg ↔ Paradeplatz ↔ Bürkliplatz ↔ Bellevue ↔ Stadelhofen ↔ Rehalp",
    "color": "#2ca02c",
    "textColor": "#ffffff",
    "openedYear": 1898,
    "rollingStockStyle": "Verkehrsbetriebe Zürich (Alstom Flexity 2 Low-Floor Tram)",
    "stations": [
      {
        "name": "Zürich Oerlikon (S-Bahn North Hub)",
        "lat": 47.4115,
        "lon": 8.5441,
        "x": 1.75,
        "z": -53.98,
        "year": 1898,
        "lines": [
          "S2",
          "S8",
          "T10",
          "T11",
          "L12"
        ],
        "fact": "Northern anchor of Line 11 in Oerlikon.",
        "isGhost": false
      },
      {
        "name": "Bucheggplatz (1930s Trolley & Tram Roundabout)",
        "lat": 47.3972,
        "lon": 8.5348,
        "x": -6.82,
        "z": -34.59,
        "year": 1931,
        "lines": [
          "T11"
        ],
        "fact": "Multi-level tram and trolleybus rotary over the Käferberg saddle.",
        "isGhost": false
      },
      {
        "name": "Zürich HB (Hauptbahnhof • Bahnhofstrasse North)",
        "lat": 47.3782,
        "lon": 8.5402,
        "x": -1.84,
        "z": -8.82,
        "year": 1898,
        "lines": [
          "S2",
          "S8",
          "S10",
          "T3",
          "T4",
          "T7",
          "T10",
          "T11"
        ],
        "fact": "Enters pedestrianized Bahnhofstrasse—built over the medieval Fröschengraben (\"Frog Moat\") in 1864.",
        "isGhost": false
      },
      {
        "name": "Rennweg / Augustinergasse (Lindenhof Hill)",
        "lat": 47.3732,
        "lon": 8.5388,
        "x": -3.13,
        "z": -2.03,
        "year": 1898,
        "lines": [
          "T11"
        ],
        "fact": "Foot of medieval Rennweg and the colorful timber bay windows (Erker) of Augustinergasse.",
        "isGhost": false
      },
      {
        "name": "Paradeplatz (Bahnhofstrasse & Fraumünster)",
        "lat": 47.3697,
        "lon": 8.5389,
        "x": -3.04,
        "z": 2.71,
        "year": 1882,
        "lines": [
          "T2",
          "T7",
          "T11"
        ],
        "fact": "Heart of Swiss banking, Confiserie Sprüngli (1859), and Zurich’s central tram diamond.",
        "isGhost": false
      },
      {
        "name": "Bürkliplatz (Lake Zurich Pier & Quaibrücke)",
        "lat": 47.3662,
        "lon": 8.5412,
        "x": -0.92,
        "z": 7.46,
        "year": 1882,
        "lines": [
          "T2",
          "T11"
        ],
        "fact": "Where Bahnhofstrasse reaches Lake Zurich before Tram 11 crosses Quaibrücke.",
        "isGhost": false
      },
      {
        "name": "Bellevue (Sechseläutenplatz & Opernhaus)",
        "lat": 47.3663,
        "lon": 8.5452,
        "x": 2.76,
        "z": 7.32,
        "year": 1882,
        "lines": [
          "T2",
          "T4",
          "T8",
          "T11"
        ],
        "fact": "Connects Lake Zurich, Limmatquai, and Opernhaus Zürich.",
        "isGhost": false
      },
      {
        "name": "Zürich Stadelhofen (Santiago Calatrava Station)",
        "lat": 47.3667,
        "lon": 8.5485,
        "x": 5.8,
        "z": 6.78,
        "year": 1898,
        "lines": [
          "S2",
          "S18",
          "T11"
        ],
        "fact": "Direct transfer to S-Bahn cross-city lines S2/S3/S5/S6/S7/S9/S11/S12/S15/S16 and Forchbahn S18.",
        "isGhost": false
      },
      {
        "name": "Hegibachplatz",
        "lat": 47.3598,
        "lon": 8.5608,
        "x": 17.13,
        "z": 16.14,
        "year": 1898,
        "lines": [
          "S18",
          "T11"
        ],
        "fact": "Eastern residential hub in Hirslanden.",
        "isGhost": false
      },
      {
        "name": "Zürich Rehalp (Transition to Mountain Right-of-Way)",
        "lat": 47.3518,
        "lon": 8.5805,
        "x": 35.28,
        "z": 26.99,
        "year": 1898,
        "lines": [
          "S18",
          "T11"
        ],
        "fact": "Southeastern terminus of Tram 11 alongside the Forchbahn.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "L12",
    "name": "Glattalbahn Light Rail 12 (VBG) — Zürich Oerlikon ↔ Glattpark ↔ Glattbrugg ↔ Zürich Airport",
    "color": "#76b9e4",
    "textColor": "#10141c",
    "openedYear": 2010,
    "rollingStockStyle": "Verkehrsbetriebe Glattal (VBG Stadler/Bombardier Segregated Light Rail)",
    "stations": [
      {
        "name": "Zürich Oerlikon (S-Bahn North Hub)",
        "lat": 47.4115,
        "lon": 8.5441,
        "x": 1.75,
        "z": -53.98,
        "year": 2006,
        "lines": [
          "S2",
          "S8",
          "T10",
          "T11",
          "L12"
        ],
        "fact": "Connects the Glattalbahn elevated and segregated light-rail ring with S-Bahn Zürich.",
        "isGhost": false
      },
      {
        "name": "Leutschenbach (SRF Television Studios)",
        "lat": 47.4138,
        "lon": 8.5565,
        "x": 13.17,
        "z": -57.1,
        "year": 2008,
        "lines": [
          "L12"
        ],
        "fact": "Runs along the grassed light-rail boulevard of Thurgauerstrasse.",
        "isGhost": false
      },
      {
        "name": "Glattpark",
        "lat": 47.4148,
        "lon": 8.5685,
        "x": 24.22,
        "z": -58.46,
        "year": 2008,
        "lines": [
          "L12"
        ],
        "fact": "New urban lake district built on the former Oberhausen Ried.",
        "isGhost": false
      },
      {
        "name": "Auzelg / Wallisellen Glattal Viaduct",
        "lat": 47.4125,
        "lon": 8.5845,
        "x": 38.96,
        "z": -55.34,
        "year": 2010,
        "lines": [
          "L12"
        ],
        "fact": "Crosses the 1,000-meter-long elevated Glattalbahn concrete viaduct over the A1 motorway and SBB rail lines.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "PB",
    "name": "UBS Polybahn (Line 24 Funicular) — Central ↔ ETH Polyterrasse (1889)",
    "color": "#c8102e",
    "textColor": "#ffffff",
    "openedYear": 1889,
    "rollingStockStyle": "Zürichbergbahn / UBS Polybahn (1889 Crimson Funicular Cars)",
    "stations": [
      {
        "name": "Central (Polybahn & Limmatquai North)",
        "lat": 47.3768,
        "lon": 8.5438,
        "x": 1.47,
        "z": -6.92,
        "year": 1889,
        "lines": [
          "T3",
          "T4",
          "T7",
          "T10",
          "PB"
        ],
        "fact": "Lower portal tucked directly into a historic house facade on Limmatquai.",
        "isGhost": false
      },
      {
        "name": "ETH Polyterrasse (Semper Hauptgebäude)",
        "lat": 47.3763,
        "lon": 8.5472,
        "x": 4.61,
        "z": -6.24,
        "year": 1889,
        "lines": [
          "PB"
        ],
        "fact": "Upper pavilion on the panoramic Polyterrasse directly in front of Gottfried Semper’s ETH Zürich dome.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "DB",
    "name": "Dolderbahn (Line 25 Rack Railway) — Römerhof ↔ Titlisstrasse ↔ Waldhaus Dolder ↔ Dolder Bergstation (1895)",
    "color": "#d49b1b",
    "textColor": "#10141c",
    "openedYear": 1895,
    "rollingStockStyle": "Dolderbahn-Aktiengesellschaft (SLM Abt Rack-and-Pinion Mountain Rail)",
    "stations": [
      {
        "name": "Römerhof (Dolderbahn Lower Terminus)",
        "lat": 47.3695,
        "lon": 8.5592,
        "x": 15.66,
        "z": 2.98,
        "year": 1895,
        "lines": [
          "T3",
          "DB"
        ],
        "fact": "Connects with VBZ Trams 3 and 8 in Hottingen at 444m elevation.",
        "isGhost": false
      },
      {
        "name": "Titlisstrasse (Passing Loop)",
        "lat": 47.3712,
        "lon": 8.5648,
        "x": 20.82,
        "z": 0.68,
        "year": 1973,
        "lines": [
          "DB"
        ],
        "fact": "Midway Abt rack-and-pinion passing loop.",
        "isGhost": false
      },
      {
        "name": "Waldhaus Dolder",
        "lat": 47.3728,
        "lon": 8.5698,
        "x": 25.42,
        "z": -1.49,
        "year": 1895,
        "lines": [
          "DB"
        ],
        "fact": "Original 1895 upper funicular terminus before the 1973 rack-railway extension.",
        "isGhost": false
      },
      {
        "name": "Dolder Bergstation (606m Grand Hotel Dolder)",
        "lat": 47.3738,
        "lon": 8.5742,
        "x": 29.48,
        "z": -2.85,
        "year": 1973,
        "lines": [
          "DB"
        ],
        "fact": "Terminates at 606m beside the 1899 Dolder Grand Hotel and Norman Foster’s 2008 spa wings.",
        "isGhost": false
      }
    ]
  }
];
