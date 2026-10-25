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

export const PORTO_DISTRICTS: CityDistrict[] = [
  {
    "id": "dist-ribeira-se",
    "number": 1,
    "name": "1 — Ribeira, Morro da Sé & São Nicolau (UNESCO Core)",
    "localLabel": "Ribeira & Sé",
    "subtitle": "ROMANESQUE CITADEL & DOURO WATERFRONT",
    "lat": 41.1418,
    "lon": -8.6125,
    "x": -1.71,
    "z": 5.07,
    "yearEstablished": 1850,
    "population": "Historic District",
    "landmarks": [
      "Ponte Dom Luís I",
      "Sé do Porto",
      "Estação de São Bento",
      "Palácio da Bolsa",
      "Igreja de São Francisco"
    ],
    "fact": "Cradle of Portugal’s very name (Portus Cale), cascading from the 1110 fortress-cathedral of Sé do Porto and the 20,000 azulejos of São Bento down medieval granite steps to the colorful arcades of Praça da Ribeira and the Palácio da Bolsa."
  },
  {
    "id": "dist-clerigos-aliados",
    "number": 2,
    "name": "2 — Avenida dos Aliados, Clérigos, Carmo & Bolhão",
    "localLabel": "Aliados & Clérigos",
    "subtitle": "BAROQUE GRANITE, AZULEJOS & BEAUX-ARTS",
    "lat": 41.1482,
    "lon": -8.6118,
    "x": -1.01,
    "z": -3.47,
    "yearEstablished": 1850,
    "population": "Historic District",
    "landmarks": [
      "Torre dos Clérigos",
      "Livraria Lello",
      "Avenida dos Aliados",
      "Capela das Almas",
      "Mercado do Bolhão"
    ],
    "fact": "Dominated by Nicolau Nasoni’s 75.6m Torre dos Clérigos (1763), the Neo-Gothic staircase of Livraria Lello (1906), and the monumental granite boulevard of Avenida dos Aliados, underpinned by Souto de Moura’s Trindade and Aliados Metro hubs."
  },
  {
    "id": "dist-boavista-foz",
    "number": 3,
    "name": "3 — Boavista, Casa da Música, Massarelos & Foz do Douro",
    "localLabel": "Boavista & Foz",
    "subtitle": "CONTEMPORARY ARCHITECTURE & ATLANTIC ESTUARY",
    "lat": 41.1555,
    "lon": -8.631,
    "x": -20.3,
    "z": -13.2,
    "yearEstablished": 1850,
    "population": "Historic District",
    "landmarks": [
      "Casa da Música",
      "Jardins do Palácio de Cristal",
      "Ponte da Arrábida",
      "Rotunda da Boavista"
    ],
    "fact": "Stretching from the belvederes of Jardins do Palácio de Cristal to Rem Koolhaas’s polyhedral Casa da Música at Rotunda da Boavista, Serralves (Álvaro Siza), Edgar Cardoso’s Ponte da Arrábida, and the Atlantic surf at Foz do Douro."
  },
  {
    "id": "dist-vila-nova-gaia",
    "number": 4,
    "name": "4 — Cais de Gaia, Port Wine Lodges & Serra do Pilar",
    "localLabel": "Vila Nova de Gaia",
    "subtitle": "PORT WINE CELLARS & SERRA DO PILAR BELVEDERE",
    "lat": 41.1365,
    "lon": -8.6105,
    "x": 0.3,
    "z": 12.13,
    "yearEstablished": 1850,
    "population": "Historic District",
    "landmarks": [
      "Caves de Vinho do Porto",
      "Mosteiro da Serra do Pilar",
      "Jardim do Morro",
      "Rabelo Waterfront"
    ],
    "fact": "Across the Douro gorge via the upper and lower decks of Ponte Dom Luís I, the cooler north-facing granite slopes of Vila Nova de Gaia have sheltered the historic British and Portuguese Port wine lodges since the 17th century, crowned by the circular Renaissance monastery of Serra do Pilar."
  }
];
