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

export const ZURICH_DISTRICTS: CityDistrict[] = [
  {
    "id": "dist-altstadt-kreis1",
    "number": 1,
    "name": "1 — Altstadt, Lindenhof, Niederdorf & Bahnhofstrasse (Kreis 1)",
    "localLabel": "Altstadt (Kreis 1)",
    "subtitle": "ROMAN TURICUM, ZWINGLI REFORMATION & BAHNHOFSTRASSE",
    "lat": 47.3725,
    "lon": 8.5418,
    "x": -0.37,
    "z": -1.09,
    "yearEstablished": 1850,
    "population": "Historic District",
    "landmarks": [
      "Grossmünster",
      "Fraumünster",
      "St. Peter",
      "Zürich HB",
      "ETH Zürich",
      "Paradeplatz",
      "Opernhaus"
    ],
    "fact": "Spanning both banks of the Limmat from Zürich HB to Lake Zurich, Kreis 1 unites the Roman hill of Lindenhof, the medieval guild alleys of Niederdorf, Grossmünster, Fraumünster, and the world-renowned banking boulevard of Bahnhofstrasse."
  },
  {
    "id": "dist-seefeld-enge-lake",
    "number": 2,
    "name": "2 — Lake Zurich Basin: Bellevue, Seefeld, Enge & Wollishofen (Kreis 2 & 8)",
    "localLabel": "Seefeld & Enge",
    "subtitle": "BELLE ÉPOQUE QUAYS, OPERNHAUS & LE CORBUSIER PAVILION",
    "lat": 47.3595,
    "lon": 8.5445,
    "x": 2.12,
    "z": 16.55,
    "yearEstablished": 1850,
    "population": "Historic District",
    "landmarks": [
      "Opernhaus Zürich",
      "Sechseläutenplatz",
      "Bahnhof Enge",
      "Pavillon Le Corbusier",
      "Chinagarten"
    ],
    "fact": "Engineered in the 1880s by Arnold Bürkli as a grand necklace of lakeside promenades, arboretums, and steamboat piers framing the snow-capped Glarus Alps across Lake Zurich."
  },
  {
    "id": "dist-zurich-west-oerlikon",
    "number": 3,
    "name": "3 — Zürich-West, Hardbrücke, Aussersihl & Oerlikon (Kreis 4, 5 & 11)",
    "localLabel": "Zürich-West",
    "subtitle": "TURBINE FOUNDRIES TO PRIME TOWER & VIADUKT ARCHES",
    "lat": 47.3865,
    "lon": 8.5215,
    "x": -19.07,
    "z": -20.07,
    "yearEstablished": 1850,
    "population": "Historic District",
    "landmarks": [
      "Prime Tower",
      "Hardbrücke",
      "Im Viadukt (1894)",
      "Schiffbau",
      "Bahnhof Oerlikon"
    ],
    "fact": "Once the smoky 19th-century heartland of Escher Wyss turbines, Maag gears, and SLM locomotives, Kreis 5 and Oerlikon have been reborn with the 126m Prime Tower, Im Viadukt market arches, and the Tram Zürich-West corridor."
  },
  {
    "id": "dist-zurichberg-uetliberg",
    "number": 4,
    "name": "4 — Zürichberg University Terrace, Dolder & Uetliberg Summit (Kreis 3, 6 & 7)",
    "localLabel": "Zürichberg & Uetliberg",
    "subtitle": "NOBEL LAUREATE CAMPUS, RACK RAILWAYS & 870M PANORAMA",
    "lat": 47.372,
    "lon": 8.5565,
    "x": 13.17,
    "z": -0.41,
    "yearEstablished": 1850,
    "population": "Historic District",
    "landmarks": [
      "ETH Zürich",
      "Kunsthaus Zürich",
      "Polybahn",
      "Dolderbahn",
      "Uetliberg Kulm (870m)"
    ],
    "fact": "Flanking the Limmat Valley on both sides, the eastern Zürichberg terrace houses ETH Zürich (22 Nobel Laureates), Kunsthaus Zürich, and the Dolder Grand, while the western Uetliberg ridge soars to 870 meters."
  }
];
