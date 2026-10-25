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

export const TOKYO_DISTRICTS: CityDistrict[] = [
  {
    "id": "dist-chiyoda-marunouchi",
    "number": 1,
    "name": "1 — Imperial Palace (Edo Castle), Marunouchi & Ginza",
    "localLabel": "Chiyoda & Ginza",
    "subtitle": "EDO SHOGUNATE CITADEL & IMPERIAL RAIL HEART",
    "lat": 35.6812,
    "lon": 139.7615,
    "x": -5.35,
    "z": 0,
    "yearEstablished": 1850,
    "population": "Historic District",
    "landmarks": [
      "Tokyo Imperial Palace (Nijūbashi)",
      "Tokyo Station Marunouchi Building",
      "Ginza Wako Clock Tower",
      "Nihombashi"
    ],
    "fact": "Surrounding the stone moats and Nijūbashi bridge of Edo Castle (now the Tokyo Imperial Palace), Marunouchi and Nihombashi form Japan’s financial and railway zero-point, anchored by the 1914 red-brick Tokyo Station and the gleaming boulevards of Ginza."
  },
  {
    "id": "dist-asakusa-sumida",
    "number": 2,
    "name": "2 — Asakusa, Sensō-ji, Ueno & Sumida (Tokyo Skytree)",
    "localLabel": "Asakusa & Skytree",
    "subtitle": "SHITAMACHI EDO CULTURE & 634M SKYTREE",
    "lat": 35.7125,
    "lon": 139.7985,
    "x": 30.01,
    "z": -36.81,
    "yearEstablished": 1850,
    "population": "Historic District",
    "landmarks": [
      "Sensō-ji Temple & Pagoda",
      "Tokyo Skytree",
      "Ueno Park",
      "Azuma Bridge",
      "Ryogoku Kokugikan"
    ],
    "fact": "The historic \"Low City\" (Shitamachi) along the Sumida River where Edo townsfolk gathered around the 645 AD Sensō-ji Temple and Ueno Park, where Asia’s first subway opened in December 1927, and where the 634-meter Tokyo Skytree now towers above Oshiage."
  },
  {
    "id": "dist-minato-bay",
    "number": 3,
    "name": "3 — Shiba Park (Tokyo Tower), Roppongi, Shimbashi & Rainbow Bridge",
    "localLabel": "Minato & Tokyo Bay",
    "subtitle": "SHŌWA TOWER, EMBASSY HILLS & TOKYO BAY",
    "lat": 35.6565,
    "lon": 139.7515,
    "x": -14.91,
    "z": 29.05,
    "yearEstablished": 1850,
    "population": "Historic District",
    "landmarks": [
      "Tokyo Tower",
      "Rainbow Bridge",
      "Zōjō-ji & Daimon",
      "Roppongi Hills",
      "Toranomon Hills"
    ],
    "fact": "Rising from the 1872 railway birthplace at Shimbashi and the Tokugawa shogunal mausoleums of Zōjō-ji in Shiba Park—crowned since 1958 by the 333m Tokyo Tower—and spanning across Tokyo Bay via the 1993 Rainbow Bridge."
  },
  {
    "id": "dist-shinjuku-shibuya",
    "number": 4,
    "name": "4 — Shinjuku Skyscrapers, Meiji Jingu (Harajuku) & Shibuya",
    "localLabel": "Shinjuku & Shibuya",
    "subtitle": "SACRED HINOKI FOREST & CYBER-METROPOLIS",
    "lat": 35.6765,
    "lon": 139.7015,
    "x": -62.69,
    "z": 5.53,
    "yearEstablished": 1850,
    "population": "Historic District",
    "landmarks": [
      "Meiji Jingu Grand Torii",
      "Mode Gakuen Cocoon Tower",
      "Tokyo Metropolitan Govt Building",
      "Shibuya Crossing"
    ],
    "fact": "Along the western arc of the Yamanote Line and Fukutoshin spine, the tranquil 1920 evergreen forest of Meiji Jingu sits moments between the futuristic skyscraper canyon of Nishi-Shinjuku (Cocoon Tower & City Hall) and the neon vortex of Shibuya Scramble Crossing."
  }
];
