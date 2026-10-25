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

export const NYC_METRO_SYSTEM_NAME = "NYC SUBWAY (IRT • BMT • IND) & GRAND TERMINALS";

export const NYC_METRO_LINES: CityMetroLine[] = [
  {
    "line": "456",
    "name": "4 / 5 / 6 — IRT Lexington Avenue Express (1904 Original East Side)",
    "color": "#00933c",
    "textColor": "#ffffff",
    "openedYear": 1904,
    "rollingStockStyle": "IRT",
    "stations": [
      {
        "name": "86 St (Lexington Ave)",
        "lat": 40.7795,
        "lon": -73.9556,
        "x": 27.87,
        "z": -42.48,
        "year": 1918,
        "lines": [
          "456"
        ],
        "fact": "Opened in July 1918 when the IRTH system extended up Lexington Avenue.",
        "isGhost": false
      },
      {
        "name": "59 St / Lexington Ave",
        "lat": 40.7625,
        "lon": -73.9679,
        "x": 17.29,
        "z": -23.22,
        "year": 1918,
        "lines": [
          "456"
        ],
        "fact": "Connects IRT 4/5/6 with BMT N/R/W and the Roosevelt Island Tram.",
        "isGhost": false
      },
      {
        "name": "Grand Central – 42 St",
        "lat": 40.7518,
        "lon": -73.9768,
        "x": 9.63,
        "z": -11.1,
        "year": 1904,
        "lines": [
          "456",
          "7"
        ],
        "fact": "Inaugural 1904 IRT pivot point connecting 4/5/6, 7, and the 42nd Street Shuttle.",
        "isGhost": false
      },
      {
        "name": "14 St – Union Square",
        "lat": 40.7347,
        "lon": -73.9899,
        "x": -1.63,
        "z": 8.27,
        "year": 1904,
        "lines": [
          "456"
        ],
        "fact": "Major interchange between IRT 4/5/6, BMT N/Q/R/W, and the 14th Street Canarsie L train.",
        "isGhost": false
      },
      {
        "name": "Astor Place",
        "lat": 40.7301,
        "lon": -73.991,
        "x": -2.58,
        "z": 13.48,
        "year": 1904,
        "lines": [
          "456"
        ],
        "fact": "Famous for its 1904 polychrome terracotta beaver plaques honoring John Jacob Astor.",
        "isGhost": false
      },
      {
        "name": "Brooklyn Bridge – City Hall",
        "lat": 40.7131,
        "lon": -74.0041,
        "x": -13.85,
        "z": 32.74,
        "year": 1904,
        "lines": [
          "456"
        ],
        "fact": "Adjacent to the ornate 1904 City Hall loop.",
        "isGhost": false
      },
      {
        "name": "City Hall Loop (1904 Guastavino Ghost Station)",
        "lat": 40.7126,
        "lon": -74.0062,
        "x": -15.65,
        "z": 33.3,
        "year": 1904,
        "lines": [
          "456"
        ],
        "fact": "Showpiece southern terminus of the October 27, 1904 inaugural subway; closed to passengers in December 1945 because its tight curve could not accommodate longer 10-car trains, though 6 trains still loop through it today.",
        "isGhost": true
      },
      {
        "name": "Wall Street",
        "lat": 40.7076,
        "lon": -74.0119,
        "x": -20.56,
        "z": 38.97,
        "year": 1905,
        "lines": [
          "456"
        ],
        "fact": "Serves the New York Stock Exchange and Trinity Church.",
        "isGhost": false
      },
      {
        "name": "Bowling Green",
        "lat": 40.7048,
        "lon": -74.0141,
        "x": -22.45,
        "z": 42.14,
        "year": 1905,
        "lines": [
          "456"
        ],
        "fact": "Gateway to Battery Park and ferries to the Statue of Liberty.",
        "isGhost": false
      },
      {
        "name": "Borough Hall (Brooklyn)",
        "lat": 40.6932,
        "lon": -73.99,
        "x": -1.72,
        "z": 55.28,
        "year": 1908,
        "lines": [
          "456"
        ],
        "fact": "Opened on January 9, 1908 as the very first underground subway station in Brooklyn via the Joralemon Street Tunnel.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "123",
    "name": "1 / 2 / 3 — IRT Broadway–Seventh Avenue Express",
    "color": "#ee352e",
    "textColor": "#ffffff",
    "openedYear": 1904,
    "rollingStockStyle": "IRT",
    "stations": [
      {
        "name": "96 St (Broadway)",
        "lat": 40.7939,
        "lon": -73.9723,
        "x": 13.5,
        "z": -58.79,
        "year": 1904,
        "lines": [
          "123"
        ],
        "fact": "Original 1904 Upper West Side express interchange.",
        "isGhost": false
      },
      {
        "name": "72 St (Broadway)",
        "lat": 40.7785,
        "lon": -73.9819,
        "x": 5.25,
        "z": -41.34,
        "year": 1904,
        "lines": [
          "123"
        ],
        "fact": "Features one of the last surviving 1904 Beaux-Arts island headhouses on Broadway.",
        "isGhost": false
      },
      {
        "name": "59 St – Columbus Circle",
        "lat": 40.7682,
        "lon": -73.9819,
        "x": 5.25,
        "z": -29.68,
        "year": 1904,
        "lines": [
          "123",
          "ACE"
        ],
        "fact": "Opened in 1904 beneath the Columbus monument at the southwest corner of Central Park.",
        "isGhost": false
      },
      {
        "name": "Times Sq – 42 St",
        "lat": 40.7553,
        "lon": -73.9869,
        "x": 0.95,
        "z": -15.07,
        "year": 1904,
        "lines": [
          "123",
          "7"
        ],
        "fact": "Busiest station in the NYC Subway network, linking 1/2/3, 7, N/Q/R/W, S, and A/C/E.",
        "isGhost": false
      },
      {
        "name": "34 St – Penn Station",
        "lat": 40.7504,
        "lon": -73.991,
        "x": -2.58,
        "z": -9.51,
        "year": 1917,
        "lines": [
          "123",
          "ACE"
        ],
        "fact": "Opened in 1917 to connect the IRT Seventh Avenue Line directly with Pennsylvania Station.",
        "isGhost": false
      },
      {
        "name": "14 St (Seventh Ave)",
        "lat": 40.7378,
        "lon": -74.0002,
        "x": -10.49,
        "z": 4.76,
        "year": 1918,
        "lines": [
          "123"
        ],
        "fact": "Connects with the F/M and L lines.",
        "isGhost": false
      },
      {
        "name": "Chambers St",
        "lat": 40.7155,
        "lon": -74.0093,
        "x": -18.32,
        "z": 30.02,
        "year": 1918,
        "lines": [
          "123"
        ],
        "fact": "Splits 1 trains to South Ferry and 2/3 trains to Wall Street and Brooklyn.",
        "isGhost": false
      },
      {
        "name": "WTC Cortlandt (Oculus)",
        "lat": 40.7118,
        "lon": -74.0122,
        "x": -20.81,
        "z": 34.21,
        "year": 1918,
        "lines": [
          "123"
        ],
        "fact": "Reopened in 2018 with Ann Hamilton’s woven typographic marble walls inside the World Trade Center Oculus.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "ACE",
    "name": "A / C / E — IND Eighth Avenue Express (\"A Train\")",
    "color": "#0039a6",
    "textColor": "#ffffff",
    "openedYear": 1932,
    "rollingStockStyle": "IND",
    "stations": [
      {
        "name": "59 St – Columbus Circle",
        "lat": 40.7682,
        "lon": -73.9819,
        "x": 5.25,
        "z": -29.68,
        "year": 1932,
        "lines": [
          "123",
          "ACE"
        ],
        "fact": "Southern anchor of the famous nonstop A-train express run to 125th Street in Harlem.",
        "isGhost": false
      },
      {
        "name": "42 St – Port Authority",
        "lat": 40.7573,
        "lon": -73.9897,
        "x": -1.46,
        "z": -17.33,
        "year": 1932,
        "lines": [
          "ACE"
        ],
        "fact": "Connected via underground passage to Times Square.",
        "isGhost": false
      },
      {
        "name": "34 St – Penn Station (8th Ave)",
        "lat": 40.7523,
        "lon": -73.9934,
        "x": -4.64,
        "z": -11.67,
        "year": 1932,
        "lines": [
          "123",
          "ACE"
        ],
        "fact": "Direct access to the Farley/Moynihan Train Hall.",
        "isGhost": false
      },
      {
        "name": "West 4 St – Washington Square",
        "lat": 40.7323,
        "lon": -74.0005,
        "x": -10.75,
        "z": 10.99,
        "year": 1932,
        "lines": [
          "ACE",
          "BDFM"
        ],
        "fact": "Two-level subterranean flying junction uniting the IND 8th Avenue (A/C/E) and 6th Avenue (B/D/F/M) trunks.",
        "isGhost": false
      },
      {
        "name": "Fulton Center / World Trade Center",
        "lat": 40.7104,
        "lon": -74.0095,
        "x": -18.49,
        "z": 35.79,
        "year": 1932,
        "lines": [
          "ACE"
        ],
        "fact": "Links A/C, 2/3, 4/5, and J/Z lines with the WTC Oculus via the Dey Street concourse.",
        "isGhost": false
      },
      {
        "name": "High St – Brooklyn Bridge",
        "lat": 40.6993,
        "lon": -73.9905,
        "x": -2.15,
        "z": 48.37,
        "year": 1933,
        "lines": [
          "ACE"
        ],
        "fact": "Brooklyn gateway to the Brooklyn Bridge.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "BDFM",
    "name": "B / D / F / M — IND Sixth Avenue & Manhattan Bridge Line",
    "color": "#ff6319",
    "textColor": "#ffffff",
    "openedYear": 1940,
    "rollingStockStyle": "IND",
    "stations": [
      {
        "name": "47–50 Sts – Rockefeller Center",
        "lat": 40.7587,
        "lon": -73.9813,
        "x": 5.76,
        "z": -18.92,
        "year": 1940,
        "lines": [
          "BDFM"
        ],
        "fact": "Connects directly into the underground concourse of Rockefeller Center.",
        "isGhost": false
      },
      {
        "name": "42 St – Bryant Park / 5th Ave",
        "lat": 40.7542,
        "lon": -73.9846,
        "x": 2.92,
        "z": -13.82,
        "year": 1940,
        "lines": [
          "BDFM"
        ],
        "fact": "Beneath Bryant Park and the New York Public Library.",
        "isGhost": false
      },
      {
        "name": "34 St – Herald Square",
        "lat": 40.7496,
        "lon": -73.9878,
        "x": 0.17,
        "z": -8.61,
        "year": 1940,
        "lines": [
          "BDFM"
        ],
        "fact": "Stands one block west of the Empire State Building.",
        "isGhost": false
      },
      {
        "name": "23 St",
        "lat": 40.7429,
        "lon": -73.9928,
        "x": -4.13,
        "z": -1.02,
        "year": 1940,
        "lines": [
          "BDFM"
        ],
        "fact": "Serves the Flatiron District.",
        "isGhost": false
      },
      {
        "name": "West 4 St – Washington Square",
        "lat": 40.7323,
        "lon": -74.0005,
        "x": -10.75,
        "z": 10.99,
        "year": 1940,
        "lines": [
          "ACE",
          "BDFM"
        ],
        "fact": "Lower deck of the West 4th Street junction.",
        "isGhost": false
      },
      {
        "name": "Grand St (Manhattan Bridge Approach)",
        "lat": 40.7183,
        "lon": -73.9937,
        "x": -4.9,
        "z": 26.85,
        "year": 1967,
        "lines": [
          "BDFM"
        ],
        "fact": "Climbs onto the outdoor steel tracks of the Manhattan Bridge over the East River.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "7",
    "name": "7 — IRT Flushing Line (Hudson Yards ↔ Times Sq ↔ Grand Central ↔ Queens)",
    "color": "#b933ad",
    "textColor": "#ffffff",
    "openedYear": 1915,
    "rollingStockStyle": "IRT",
    "stations": [
      {
        "name": "34 St – Hudson Yards",
        "lat": 40.7558,
        "lon": -74.0022,
        "x": -12.21,
        "z": -15.63,
        "year": 2015,
        "lines": [
          "7"
        ],
        "fact": "Opened in September 2015 as the first brand-new NYC Subway station in 26 years.",
        "isGhost": false
      },
      {
        "name": "Times Sq – 42 St",
        "lat": 40.7553,
        "lon": -73.9869,
        "x": 0.95,
        "z": -15.07,
        "year": 1927,
        "lines": [
          "123",
          "7"
        ],
        "fact": "Crosses under the Broadway and 7th Ave trunks.",
        "isGhost": false
      },
      {
        "name": "Grand Central – 42 St",
        "lat": 40.7518,
        "lon": -73.9768,
        "x": 9.63,
        "z": -11.1,
        "year": 1915,
        "lines": [
          "456",
          "7"
        ],
        "fact": "Inaugurated in June 1915 inside the historic 1892–1907 Steinway streetcar tunnel beneath the East River.",
        "isGhost": false
      },
      {
        "name": "Vernon Blvd – Jackson Ave (Long Island City)",
        "lat": 40.7426,
        "lon": -73.9536,
        "x": 29.59,
        "z": -0.68,
        "year": 1915,
        "lines": [
          "7"
        ],
        "fact": "First station in Queens after emerging from beneath the East River.",
        "isGhost": false
      }
    ]
  }
];
