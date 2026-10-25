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

export const WARSAW_DISTRICTS: CityDistrict[] = [
  {
    "id": "dist-srodmiescie-stare-miasto",
    "number": 1,
    "name": "1 — Śródmieście, Stare Miasto & Trakt Królewski",
    "localLabel": "Śródmieście",
    "subtitle": "UNESCO ROYAL ROUTE & PHOENIX HEART",
    "lat": 52.2385,
    "lon": 21.0115,
    "x": 3.67,
    "z": -8.23,
    "yearEstablished": 1850,
    "population": "Historic District",
    "landmarks": [
      "Zamek Królewski",
      "Rynek Starego Miasta",
      "Pałac Kultury i Nauki",
      "Łazienki Królewskie",
      "Muzeum POLIN"
    ],
    "fact": "Stretching along the high Vistula Escarpment from the 14th-century Old Town and Royal Castle down Krakowskie Przedmieście and Nowy Świat to Łazienki Park, Śródmieście embodies Warsaw’s UNESCO-honored resurrection after 1945."
  },
  {
    "id": "dist-wola-mirów",
    "number": 2,
    "name": "2 — Wola Skyscraper District, Mirów & Ochota",
    "localLabel": "Wola",
    "subtitle": "ROYAL ELECTORAL FIELDS TO EU SUPERTALL HUB",
    "lat": 52.2302,
    "lon": 20.9842,
    "x": -17.18,
    "z": 2.12,
    "yearEstablished": 1850,
    "population": "Historic District",
    "landmarks": [
      "Varso Tower (310m)",
      "Rondo Daszyńskiego",
      "Warsaw Spire",
      "Fabryka Norblina",
      "Muzeum Powstania Warszawskiego"
    ],
    "fact": "Once the open fields where Polish nobles elected kings from 1573 to 1764 and later Warsaw’s 19th-century \"Red Wola\" industrial powerhouse, Wola around Rondo Daszyńskiego and Varso Tower is now one of Europe’s premier skyscraper districts."
  },
  {
    "id": "dist-praga-wisla",
    "number": 3,
    "name": "3 — Praga-Północ, Praga-Południe, Saska Kępa & Kamionek",
    "localLabel": "Praga",
    "subtitle": "RIGHT-BANK HERITAGE, STADION NARODOWY & BOHEMIAN PRAGA",
    "lat": 52.2465,
    "lon": 21.0435,
    "x": 28.1,
    "z": -18.19,
    "yearEstablished": 1850,
    "population": "Historic District",
    "landmarks": [
      "PGE Narodowy",
      "Dworzec Wileński",
      "Centrum Praskie Koneser",
      "Park Skaryszewski",
      "Saska Kępa"
    ],
    "fact": "Granted its town charter by King Władysław IV Vasa in 1648 across the Vistula, Praga preserved its authentic pre-war red-brick tenements, factories (Koneser, Soho), and tree-lined modernist villas in Saska Kępa, crowned in 2012 by PGE Narodowy."
  },
  {
    "id": "dist-mokotow-wilanow",
    "number": 4,
    "name": "4 — Mokotów, Pole Mokotowskie, Ursynów & Wilanów",
    "localLabel": "Mokotów",
    "subtitle": "ROYAL SUMMER RESIDENCES & M1 SOUTHERN SPINE",
    "lat": 52.2015,
    "lon": 21.0215,
    "x": 11.3,
    "z": 37.89,
    "yearEstablished": 1850,
    "population": "Historic District",
    "landmarks": [
      "Pałac w Wilanowie",
      "Pole Mokotowskie",
      "Królikarnia",
      "Politechnika Warszawska"
    ],
    "fact": "Linked to downtown along the Southern Royal Route and the inaugural 1995 section of Metro Line M1, Mokotów and Wilanów unite pre-war garden villas, Królikarnia Palace, and King Jan III Sobieski’s Baroque masterpiece at Wilanów."
  }
];
