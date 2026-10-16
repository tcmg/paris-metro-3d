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

export const SYDNEY_DISTRICTS: CityDistrict[] = [
  {
    "id": "dist-gadigal-cove",
    "number": 1,
    "name": "1 — Warrane (Circular Quay), Tubowgule & The Rocks",
    "localLabel": "Warrane",
    "subtitle": "GADIGAL COUNTRY & HARBOUR ICONS",
    "lat": -33.8585,
    "lon": 151.2115,
    "x": 2.17,
    "z": -8.09,
    "yearEstablished": 1850,
    "population": "Historic District",
    "landmarks": [
      "Sydney Opera House",
      "Sydney Harbour Bridge",
      "Circular Quay",
      "Royal Botanic Garden"
    ],
    "fact": "For tens of thousands of years, Tubowgule and Warrane were gathering places of the Gadigal people of the Eora Nation, where shell middens later supplied lime for early colonial buildings—and later inspired the shimmering shells of the Sydney Opera House (1973)."
  },
  {
    "id": "dist-cbd-sandstone",
    "number": 2,
    "name": "2 — Martin Place, Town Hall, Barangaroo & Hyde Park",
    "localLabel": "CBD & Hyde",
    "subtitle": "SANDSTONE ARCADES & METRO CATHEDRALS",
    "lat": -33.8705,
    "lon": 151.2085,
    "x": -0.93,
    "z": 6.84,
    "yearEstablished": 1850,
    "population": "Historic District",
    "landmarks": [
      "Queen Victoria Building",
      "Sydney Tower Eye",
      "St Mary’s Cathedral",
      "Barangaroo",
      "Gadigal Station"
    ],
    "fact": "Stretching from the restored sandstone headland of Barangaroo to the Victorian domes of the Queen Victoria Building and Hyde Park, underpinned by both Bradfield’s 1926–1932 City Circle and the 2024 M1 Metro."
  },
  {
    "id": "dist-central-redfern",
    "number": 3,
    "name": "3 — Central Station, Haymarket & Redfern",
    "localLabel": "Central / Redfern",
    "subtitle": "RAILWAY BIRTHPLACE & FIRST NATIONS HEART",
    "lat": -33.8865,
    "lon": 151.2035,
    "x": -6.1,
    "z": 26.75,
    "yearEstablished": 1850,
    "population": "Historic District",
    "landmarks": [
      "Central Station Clock Tower",
      "Redfern Station",
      "Railway Square",
      "Waterloo Metro"
    ],
    "fact": "Site of New South Wales’s first 1855 steam train departure and the 1906 Central Terminal, while neighboring Redfern stands as a proud urban heart of Aboriginal community activism, culture, and art."
  },
  {
    "id": "dist-north-shore",
    "number": 4,
    "name": "4 — Milsons Point, Kirribilli & North Sydney (Cammeraygal)",
    "localLabel": "North Shore",
    "subtitle": "CAMMERAYGAL SHORE & BRIDGE NORTHERN ARCH",
    "lat": -33.844,
    "lon": 151.2095,
    "x": 0.1,
    "z": -26.13,
    "yearEstablished": 1850,
    "population": "Historic District",
    "landmarks": [
      "Luna Park Milsons Point",
      "Harbour Bridge Northern Pylons",
      "Victoria Cross Metro"
    ],
    "fact": "Traditional Country of the Cammeraygal people across Port Jackson, connected to the city core by the 1932 Sydney Harbour Bridge deck and the 2024 twin under-harbour tunnels of Sydney Metro M1."
  }
];
