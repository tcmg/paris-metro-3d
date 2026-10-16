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

import type { CityDistrict } from '../types';

export const NYC_DISTRICTS: CityDistrict[] = [
  {
    "id": "dist-lower-manhattan",
    "number": 1,
    "name": "1 — Lower Manhattan, Wall Street, Civic Center & Liberty Harbor",
    "localLabel": "Downtown / FiDi",
    "subtitle": "1624 NEW AMSTERDAM, 1883 BRIDGE & 1904 SUBWAY",
    "lat": 40.7105,
    "lon": -74.0095,
    "x": -18.49,
    "z": 35.68,
    "yearEstablished": 1850,
    "population": "Historic District",
    "landmarks": [
      "One World Trade Center & Oculus",
      "Statue of Liberty",
      "Brooklyn Bridge",
      "1904 City Hall Loop"
    ],
    "fact": "From the 1624 Dutch settlement of New Amsterdam at the tip of Manhattan and the 1883 Brooklyn Bridge to the 1904 City Hall IRT Subway terminus and the 1,776-foot One World Trade Center and Oculus."
  },
  {
    "id": "dist-midtown-deco",
    "number": 2,
    "name": "2 — Midtown Manhattan: Skyscraper Canyons, Times Sq & Grand Central",
    "localLabel": "Midtown",
    "subtitle": "ART DECO SKYSCRAPER CAPITAL & RAIL SUPER-HUBS",
    "lat": 40.7535,
    "lon": -73.9835,
    "x": 3.87,
    "z": -13.03,
    "yearEstablished": 1850,
    "population": "Historic District",
    "landmarks": [
      "Empire State Building",
      "Chrysler Building",
      "Grand Central Terminal",
      "30 Rockefeller Plaza",
      "Times Square"
    ],
    "fact": "The vertical heart of Gotham where Grand Central Terminal (1913) and Penn Station (1910) fueled the 1930s Art Deco skyscraper race between the Chrysler Building, Empire State Building, and Rockefeller Center."
  },
  {
    "id": "dist-village-flatiron",
    "number": 3,
    "name": "3 — Flatiron, Union Square, Greenwich Village & SoHo",
    "localLabel": "Village / Flatiron",
    "subtitle": "1811 GRID MEETS GREENWICH VILLAGE",
    "lat": 40.7355,
    "lon": -73.9945,
    "x": -5.59,
    "z": 7.36,
    "yearEstablished": 1850,
    "population": "Historic District",
    "landmarks": [
      "Flatiron Building",
      "Union Square",
      "Washington Square Park",
      "Astor Place"
    ],
    "fact": "Where the diagonal trace of Broadway (an ancient Lenape trail) cuts across the 1811 Commissioners’ Grid at Union Square and 23rd Street—producing the 1902 Flatiron Building and the West 4th Street subway mega-junction."
  },
  {
    "id": "dist-central-park-uptown",
    "number": 4,
    "name": "4 — Central Park, Upper West Side & Upper East Side",
    "localLabel": "Central Park / Uptown",
    "subtitle": "OLMSTED’S GREENSWARD & THE \"A\" TRAIN EXPRESS",
    "lat": 40.776,
    "lon": -73.9685,
    "x": 16.77,
    "z": -38.51,
    "yearEstablished": 1850,
    "population": "Historic District",
    "landmarks": [
      "Central Park",
      "Columbus Circle",
      "72nd Street IRT Headhouse"
    ],
    "fact": "Anchored by Frederick Law Olmsted and Calvert Vaux’s 843-acre Central Park masterpiece, flanked on the west by the 1904 Broadway IRT and 1932 Central Park West \"A Train\" and on the east by the Lexington and Second Avenue subways."
  }
];
