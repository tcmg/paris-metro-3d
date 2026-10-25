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

export const RIO_DISTRICTS: CityDistrict[] = [
  {
    "id": "dist-centro",
    "number": 1,
    "name": "1 — Centro Histórico, Cinelândia & Porto Maravilha",
    "localLabel": "Centro",
    "subtitle": "IMPERIAL CAPITAL & CARIOCA HEART",
    "lat": -22.9068,
    "lon": -43.1805,
    "x": 14.56,
    "z": -25.26,
    "yearEstablished": 1850,
    "population": "Historic District",
    "landmarks": [
      "Theatro Municipal",
      "Arcos da Lapa",
      "Catedral Metropolitana",
      "Museu do Amanhã",
      "Central do Brasil"
    ],
    "fact": "From the 16th-century hilltop settlement on Morro do Castelo and the royal docks of Praça XV (where the Portuguese Court arrived in 1808) to the Belle Époque palaces of Cinelândia and the 2016 Porto Maravilha regeneration."
  },
  {
    "id": "dist-flamengo-botafogo",
    "number": 2,
    "name": "2 — Glória, Catete, Flamengo, Botafogo & Urca",
    "localLabel": "Baía Sul",
    "subtitle": "BURLE MARX GARDENS & SUGARLOAF COVE",
    "lat": -22.942,
    "lon": -43.175,
    "x": 20.08,
    "z": 13.07,
    "yearEstablished": 1850,
    "population": "Historic District",
    "landmarks": [
      "Pão de Açúcar (Sugarloaf)",
      "Aterro do Flamengo",
      "Palácio do Catete",
      "Enseada de Botafogo"
    ],
    "fact": "Where Estácio de Sá founded São Sebastião do Rio de Janeiro in 1565 at the base of Sugarloaf Mountain, later framed by Roberto Burle Marx’s modernist Aterro do Flamengo gardens and the sweeping crescent of Botafogo Cove."
  },
  {
    "id": "dist-copacabana-ipanema",
    "number": 3,
    "name": "3 — Copacabana, Ipanema, Leblon & Lagoa",
    "localLabel": "Zona Sul",
    "subtitle": "BOSSA NOVA, CALÇADÃO & CORCOVADO",
    "lat": -22.974,
    "lon": -43.196,
    "x": -1,
    "z": 47.91,
    "yearEstablished": 1850,
    "population": "Historic District",
    "landmarks": [
      "Cristo Redentor (Corcovado)",
      "Copacabana Palace",
      "Praia de Ipanema",
      "Lagoa Rodrigo de Freitas"
    ],
    "fact": "Opened to the city by streetcar tunnels bored through the coastal granite mountains in 1892, Copacabana and Ipanema gave the world Portuguese stone wave promenades, Bossa Nova (\"The Girl from Ipanema\"), and Christ the Redeemer."
  },
  {
    "id": "dist-tijuca-maracana",
    "number": 4,
    "name": "4 — Maracanã, São Cristóvão & Tijuca",
    "localLabel": "Zona Norte",
    "subtitle": "SAMBA CRADLE, IMPERIAL QUINTA & MARACANÃ",
    "lat": -22.9155,
    "lon": -43.2265,
    "x": -31.63,
    "z": -15.79,
    "yearEstablished": 1850,
    "population": "Historic District",
    "landmarks": [
      "Estádio do Maracanã",
      "Quinta da Boa Vista",
      "Sambódromo da Sapucaí",
      "Praça Saens Peña"
    ],
    "fact": "Home to the former residence of Emperors Dom Pedro I and II at Quinta da Boa Vista, the birth of modern samba in Estácio and Praça Onze, and the legendary Maracanã Stadium built for the 1950 World Cup."
  }
];
