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

export const MELBOURNE_DISTRICTS: CityDistrict[] = [
  {
    "id": "dist-hoddle-grid-cbd",
    "number": 1,
    "name": "1 — The 1837 Hoddle Grid, Bluestone Laneways & Bourke Street Mall",
    "localLabel": "Hoddle Grid CBD",
    "subtitle": "1837 HODDLE GRID, GOLD RUSH ARCADES & LANEWAY ART",
    "lat": -37.8142,
    "lon": 144.9631,
    "x": 0,
    "z": 0.77,
    "yearEstablished": 1850,
    "population": "Historic District",
    "landmarks": [
      "Flinders Street Station",
      "Federation Square",
      "State Library Victoria",
      "Block Arcade",
      "Parliament House"
    ],
    "fact": "Laid out in 1837 by surveyor Robert Hoddle at a 28-degree angle parallel to the Yarra River, Melbourne’s mile-by-half-mile grid alternates grand 30-meter boulevards with \"Little\" streets and cobblestone bluestone laneways."
  },
  {
    "id": "dist-southbank-domain",
    "number": 2,
    "name": "2 — Southbank, Arts Precinct, St Kilda Road & Kings Domain",
    "localLabel": "Southbank & Domain",
    "subtitle": "GOLD-CROWNED SKYSCRAPERS, BALLERINA SPIRE & SHRINE AXIS",
    "lat": -37.8245,
    "lon": 144.9695,
    "x": 6.47,
    "z": 13.91,
    "yearEstablished": 1850,
    "population": "Historic District",
    "landmarks": [
      "Eureka Tower (297m)",
      "Arts Centre Spire",
      "Shrine of Remembrance",
      "NGV International",
      "Royal Botanic Gardens"
    ],
    "fact": "Across Princes Bridge from Flinders Street, St Kilda Road forms a grand tree-lined boulevard linking the National Gallery of Victoria, Arts Centre Spire, Royal Botanic Gardens, and the Shrine of Remembrance alongside Southbank’s supertall towers."
  },
  {
    "id": "dist-carlton-fitzroy",
    "number": 3,
    "name": "3 — Carlton Gardens, Parkville University & Bohemian Fitzroy",
    "localLabel": "Carlton & Fitzroy",
    "subtitle": "1880 UNESCO EXHIBITION DOME, ESPRESSO CULTURE & CAST-IRON LACE",
    "lat": -37.8035,
    "lon": 144.9715,
    "x": 8.49,
    "z": -12.89,
    "yearEstablished": 1850,
    "population": "Historic District",
    "landmarks": [
      "Royal Exhibition Building",
      "Melbourne Museum",
      "University of Melbourne",
      "Lygon Street",
      "Gertrude & Smith Streets"
    ],
    "fact": "Preserving Victorian terrace rows adorned with intricate cast-iron filigree, Melbourne’s inner north unites the UNESCO-listed 1880 Royal Exhibition Building, Lygon Street’s Italian espresso heritage, and Smith Street’s tram spine."
  },
  {
    "id": "dist-mcg-docklands",
    "number": 4,
    "name": "4 — Yarra Park Sports Precinct (MCG) & Victoria Harbour Docklands",
    "localLabel": "MCG & Docklands",
    "subtitle": "100,024-SEAT MCG COLOSSEUM & BOLTE BRIDGE WATERFRONT",
    "lat": -37.82,
    "lon": 144.9834,
    "x": 20.52,
    "z": 8.17,
    "yearEstablished": 1850,
    "population": "Historic District",
    "landmarks": [
      "Melbourne Cricket Ground (MCG)",
      "Rod Laver Arena",
      "Bolte Bridge",
      "Southern Cross Station",
      "Sandridge Pier"
    ],
    "fact": "Bookending the Yarra River corridor, the eastern sports parklands host the 100,024-capacity MCG and Australian Open tennis courts, while the western Docklands frame Victoria Harbour and the twin 140m needles of the Bolte Bridge."
  }
];
