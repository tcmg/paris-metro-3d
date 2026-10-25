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

export const SAN_FRANCISCO_DISTRICTS: CityDistrict[] = [
  {
    "id": "dist-embarcadero-fidi",
    "number": 1,
    "name": "1 — The Embarcadero, Financial District, SoMa & Union Square",
    "localLabel": "Embarcadero & FiDi",
    "subtitle": "GOLD RUSH COVE, FERRY TOWER & SKYSCRAPERS",
    "lat": 37.7915,
    "lon": -122.4005,
    "x": 9.17,
    "z": -2.24,
    "yearEstablished": 1850,
    "population": "Historic District",
    "landmarks": [
      "San Francisco Ferry Building",
      "Transamerica Pyramid",
      "Salesforce Tower",
      "Bay Bridge",
      "Union Square"
    ],
    "fact": "Built over the buried Gold Rush ships of Yerba Buena Cove, anchored by the 1898 Ferry Building Clock Tower, the 1972 Transamerica Pyramid, the 2018 Salesforce Tower, and the double-deck BART/Muni subway beneath Market Street."
  },
  {
    "id": "dist-nob-hill-north-beach",
    "number": 2,
    "name": "2 — Chinatown, Nob Hill, Telegraph Hill & Fisherman’s Wharf",
    "localLabel": "Nob Hill & Wharf",
    "subtitle": "CABLE CAR CRESTS, CHINATOWN & COIT TOWER",
    "lat": 37.8005,
    "lon": -122.4105,
    "x": -0.69,
    "z": -13.43,
    "yearEstablished": 1850,
    "population": "Historic District",
    "landmarks": [
      "Coit Tower",
      "Alcatraz Island",
      "Cable Car Museum",
      "Lombard Street",
      "Chinatown Rose Pak Station"
    ],
    "fact": "Where 19th-century cable cars climb past North America’s oldest Chinatown (now served by the 2022 T-Third Central Subway) to the crests of Nob Hill and Russian Hill, looking out toward Coit Tower on Telegraph Hill and Alcatraz Island in the Bay."
  },
  {
    "id": "dist-golden-gate-marina",
    "number": 3,
    "name": "3 — Golden Gate Bridge, Presidio, Marina & Alamo Square",
    "localLabel": "Golden Gate & Marina",
    "subtitle": "INTERNATIONAL ORANGE SPAN & PAINTED LADIES",
    "lat": 37.8025,
    "lon": -122.4525,
    "x": -42.09,
    "z": -15.91,
    "yearEstablished": 1850,
    "population": "Historic District",
    "landmarks": [
      "Golden Gate Bridge",
      "Palace of Fine Arts Rotunda",
      "The Painted Ladies (Alamo Square)",
      "Presidio"
    ],
    "fact": "Stretching from the Queen Anne Victorian \"Painted Ladies\" of Alamo Square (1892) across Pacific Heights to Bernard Maybeck’s 1915 Palace of Fine Arts, the 1776 Presidio, and the 1937 International Orange towers of the Golden Gate Bridge."
  },
  {
    "id": "dist-mission-castro-twin-peaks",
    "number": 4,
    "name": "4 — Mission District, The Castro, Haight-Ashbury & Twin Peaks",
    "localLabel": "Mission & Castro",
    "subtitle": "1776 MISSION, MUNI TUNNELS & COUNTERCULTURE",
    "lat": 37.7625,
    "lon": -122.4295,
    "x": -19.42,
    "z": 33.82,
    "yearEstablished": 1850,
    "population": "Historic District",
    "landmarks": [
      "Twin Peaks",
      "Mission Dolores Park",
      "Castro Theatre",
      "Forest Hill Station (1918)",
      "4th & King Caltrain"
    ],
    "fact": "From the 1776 adobe walls of Mission Dolores and the murals of the Mission District to the LGBTQ+ landmark of the Castro, the 1967 Summer of Love in Haight-Ashbury, and the 1918 Twin Peaks and 1928 Sunset streetcar tunnels."
  }
];
