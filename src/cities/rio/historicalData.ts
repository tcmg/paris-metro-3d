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

import type {
  CityMonument,
  CityHistoricalMilestone,
  CityEraDescription,
  CityTourStop,
} from '../types';

export const RIO_MONUMENTS_GLB_PATH = '/models/rio_monuments.glb';

export const RIO_MONUMENTS: CityMonument[] = [
  {
    "id": "monument-christ-redeemer",
    "nodeName": "Monument_christ_redeemer",
    "name": "Christ the Redeemer (Cristo Redentor)",
    "localName": "Christ the Redeemer (Cristo Redentor)",
    "year": 1931,
    "completedYear": 1931,
    "architect": "Soapstone Art Deco Colossal Statue (Paul Landowski & Heitor da Silva Costa, 38m)",
    "architecturalStyle": "Soapstone Art Deco Colossal Statue (Paul Landowski & Heitor da Silva Costa, 38m)",
    "lat": -22.9519,
    "lon": -43.2105,
    "x": -15.56,
    "z": 23.84,
    "baseElevationMeters": 0,
    "scale": 0.85,
    "rotationY": 0.45,
    "primaryColor": "#e8e4dc",
    "secondaryColor": "#8a99ad",
    "accentColor": "#d4c8b0",
    "archetype": "christ_statue",
    "fact": "Crowning the 710-meter granite peak of Corcovado since October 12, 1931, the world’s largest Art Deco sculpture spreads its 28-meter arms in soapstone mosaic over Guanabara Bay and the Carioca landscape.",
    "facts": [
      "Crowning the 710-meter granite peak of Corcovado since October 12, 1931, the world’s largest Art Deco sculpture spreads its 28-meter arms in soapstone mosaic over Guanabara Bay and the Carioca landscape."
    ],
    "historicalSummary": "Crowning the 710-meter granite peak of Corcovado since October 12, 1931, the world’s largest Art Deco sculpture spreads its 28-meter arms in soapstone mosaic over Guanabara Bay and the Carioca landscape.",
    "metroConnection": "Connected via L1, L2",
    "svgPath": "M30 8 L34 8 L34 16 L54 16 L54 22 L35 22 L36 46 L42 46 L42 54 L22 54 L22 46 L28 46 L29 22 L10 22 L10 16 L30 16 Z"
  },
  {
    "id": "monument-sugarloaf",
    "nodeName": "Monument_sugarloaf",
    "name": "Sugarloaf Mountain & Bondinho (Pão de Açúcar)",
    "localName": "Sugarloaf Mountain & Bondinho (Pão de Açúcar)",
    "year": 1912,
    "completedYear": 1912,
    "architect": "Twin Granite Monoliths & Aerial Cableway (Augusto Ferreira Ramos, 1912)",
    "architecturalStyle": "Twin Granite Monoliths & Aerial Cableway (Augusto Ferreira Ramos, 1912)",
    "lat": -22.9493,
    "lon": -43.1546,
    "x": 40.56,
    "z": 21.01,
    "baseElevationMeters": 0,
    "scale": 0.82,
    "rotationY": -0.35,
    "primaryColor": "#6e6a63",
    "secondaryColor": "#8a99ad",
    "accentColor": "#f7c948",
    "archetype": "sugarloaf_cableway",
    "fact": "Inaugurated on October 27, 1912 as Brazil’s first aerial tramway and the third in the world, the glass Bondinho links Praia Vermelha to Morro da Urca and the 396m granite dome of Pão de Açúcar at the mouth of Guanabara Bay.",
    "facts": [
      "Inaugurated on October 27, 1912 as Brazil’s first aerial tramway and the third in the world, the glass Bondinho links Praia Vermelha to Morro da Urca and the 396m granite dome of Pão de Açúcar at the mouth of Guanabara Bay."
    ],
    "historicalSummary": "Inaugurated on October 27, 1912 as Brazil’s first aerial tramway and the third in the world, the glass Bondinho links Praia Vermelha to Morro da Urca and the 396m granite dome of Pão de Açúcar at the mouth of Guanabara Bay.",
    "metroConnection": "Connected via L1, L2",
    "svgPath": "M6 52 Q18 14 28 52 M26 52 Q36 28 44 52 M24 22 L56 36 M46 52 Q54 34 60 52"
  },
  {
    "id": "monument-maracana",
    "nodeName": "Monument_maracana",
    "name": "Maracanã Stadium (Estádio Jornalista Mário Filho)",
    "localName": "Maracanã Stadium (Estádio Jornalista Mário Filho)",
    "year": 1950,
    "completedYear": 1950,
    "architect": "Monumental Elliptical Concrete Bowl & Tension Roof (Galvão, Bastos, Azevedo & Carneiro, 1950)",
    "architecturalStyle": "Monumental Elliptical Concrete Bowl & Tension Roof (Galvão, Bastos, Azevedo & Carneiro, 1950)",
    "lat": -22.9121,
    "lon": -43.2302,
    "x": -35.34,
    "z": -19.49,
    "baseElevationMeters": 0,
    "scale": 0.78,
    "rotationY": -0.54,
    "primaryColor": "#dfe5ec",
    "secondaryColor": "#8a99ad",
    "accentColor": "#12945a",
    "archetype": "stadium_bowl",
    "fact": "Built for the 1950 FIFA World Cup and modernized for the 2014 World Cup and 2016 Summer Olympics, the temple of Brazilian football is served directly by MetrôRio Line 2 and SuperVia commuter rail.",
    "facts": [
      "Built for the 1950 FIFA World Cup and modernized for the 2014 World Cup and 2016 Summer Olympics, the temple of Brazilian football is served directly by MetrôRio Line 2 and SuperVia commuter rail."
    ],
    "historicalSummary": "Built for the 1950 FIFA World Cup and modernized for the 2014 World Cup and 2016 Summer Olympics, the temple of Brazilian football is served directly by MetrôRio Line 2 and SuperVia commuter rail.",
    "metroConnection": "Connected via L2",
    "svgPath": "M8 38 Q32 22 56 38 L52 48 Q32 54 12 48 Z M14 38 Q32 30 50 38"
  },
  {
    "id": "monument-museum-tomorrow",
    "nodeName": "Monument_museum_tomorrow",
    "name": "Museum of Tomorrow (Museu do Amanhã)",
    "localName": "Museum of Tomorrow (Museu do Amanhã)",
    "year": 2015,
    "completedYear": 2015,
    "architect": "Neofuturistic Cantilevered Brise-Soleil Pier (Santiago Calatrava, 2015)",
    "architecturalStyle": "Neofuturistic Cantilevered Brise-Soleil Pier (Santiago Calatrava, 2015)",
    "lat": -22.894238,
    "lon": -43.17946,
    "x": 15.6,
    "z": -38.94,
    "baseElevationMeters": 0,
    "scale": 0.75,
    "rotationY": 1.213,
    "primaryColor": "#f5f8fc",
    "secondaryColor": "#8a99ad",
    "accentColor": "#38b6ff",
    "archetype": "calatrava_cantilever",
    "fact": "Extending along Pier Mauá into Guanabara Bay, Santiago Calatrava’s solar-winged science museum anchored the 2015–2016 Porto Maravilha waterfront transformation alongside the VLT Carioca light rail.",
    "facts": [
      "Extending along Pier Mauá into Guanabara Bay, Santiago Calatrava’s solar-winged science museum anchored the 2015–2016 Porto Maravilha waterfront transformation alongside the VLT Carioca light rail."
    ],
    "historicalSummary": "Extending along Pier Mauá into Guanabara Bay, Santiago Calatrava’s solar-winged science museum anchored the 2015–2016 Porto Maravilha waterfront transformation alongside the VLT Carioca light rail.",
    "metroConnection": "Connected via L1, VLT1",
    "svgPath": "M6 44 L58 26 L48 44 L14 48 Z M18 48 L46 48"
  },
  {
    "id": "monument-arcos-lapa",
    "nodeName": "Monument_arcos_lapa",
    "name": "Carioca Aqueduct & Santa Teresa Tram (Arcos da Lapa)",
    "localName": "Carioca Aqueduct & Santa Teresa Tram (Arcos da Lapa)",
    "year": 1750,
    "completedYear": 1750,
    "architect": "42-Arch Double-Tier Whitewashed Colonial Aqueduct (1750)",
    "architecturalStyle": "42-Arch Double-Tier Whitewashed Colonial Aqueduct (1750)",
    "lat": -22.913239,
    "lon": -43.180299,
    "x": 14.76,
    "z": -18.25,
    "baseElevationMeters": 0,
    "scale": 0.76,
    "rotationY": -0.717,
    "primaryColor": "#fcfaf5",
    "secondaryColor": "#8a99ad",
    "accentColor": "#f7c948",
    "archetype": "aqueduct_arches",
    "fact": "Completed in 1750 under Governor Gomes Freire de Andrade to carry fresh water from the Carioca River, its 42 whitewashed Roman-style arches became the viaduct for the yellow Bonde de Santa Teresa electric tramway in 1896.",
    "facts": [
      "Completed in 1750 under Governor Gomes Freire de Andrade to carry fresh water from the Carioca River, its 42 whitewashed Roman-style arches became the viaduct for the yellow Bonde de Santa Teresa electric tramway in 1896."
    ],
    "historicalSummary": "Completed in 1750 under Governor Gomes Freire de Andrade to carry fresh water from the Carioca River, its 42 whitewashed Roman-style arches became the viaduct for the yellow Bonde de Santa Teresa electric tramway in 1896.",
    "metroConnection": "Connected via L1, L2",
    "svgPath": "M6 48 L6 30 L58 30 L58 48 M12 48 A5 8 0 0 1 22 48 M27 48 A5 8 0 0 1 37 48 M42 48 A5 8 0 0 1 52 48"
  },
  {
    "id": "monument-catedral-sao-sebastiao",
    "nodeName": "Monument_catedral_sao_sebastiao",
    "name": "Metropolitan Cathedral of Saint Sebastian (Catedral Metropolitana)",
    "localName": "Metropolitan Cathedral of Saint Sebastian (Catedral Metropolitana)",
    "year": 1979,
    "completedYear": 1979,
    "architect": "Brutalist Mayan-Conical Concrete Cathedral & Four 64m Stained-Glass Ribbons (Edgar Fonseca, 1979)",
    "architecturalStyle": "Brutalist Mayan-Conical Concrete Cathedral & Four 64m Stained-Glass Ribbons (Edgar Fonseca, 1979)",
    "lat": -22.9108,
    "lon": -43.18073,
    "x": 14.33,
    "z": -20.9,
    "baseElevationMeters": 0,
    "scale": 0.75,
    "rotationY": 0.344,
    "primaryColor": "#c9c4ba",
    "secondaryColor": "#8a99ad",
    "accentColor": "#ff3b7f",
    "archetype": "conical_cathedral",
    "fact": "Rising 75 meters beside Arcos da Lapa, Edgar de Oliveira da Fonseca’s conical concrete cathedral opened in 1979—the very same year MetrôRio inaugurated Line 1 beneath neighboring Cinelândia and Carioca.",
    "facts": [
      "Rising 75 meters beside Arcos da Lapa, Edgar de Oliveira da Fonseca’s conical concrete cathedral opened in 1979—the very same year MetrôRio inaugurated Line 1 beneath neighboring Cinelândia and Carioca."
    ],
    "historicalSummary": "Rising 75 meters beside Arcos da Lapa, Edgar de Oliveira da Fonseca’s conical concrete cathedral opened in 1979—the very same year MetrôRio inaugurated Line 1 beneath neighboring Cinelândia and Carioca.",
    "metroConnection": "Connected via L1, L2, VLT1",
    "svgPath": "M14 52 L24 12 L40 12 L50 52 Z M32 12 L32 52"
  },
  {
    "id": "monument-theatro-municipal",
    "nodeName": "Monument_theatro_municipal",
    "name": "Municipal Theater of Rio (Theatro Municipal)",
    "localName": "Municipal Theater of Rio (Theatro Municipal)",
    "year": 1909,
    "completedYear": 1909,
    "architect": "Carioca Belle Époque Beaux-Arts Opera House & Gilded Eagle Dome (Oliveira Passos, 1909)",
    "architecturalStyle": "Carioca Belle Époque Beaux-Arts Opera House & Gilded Eagle Dome (Oliveira Passos, 1909)",
    "lat": -22.909064,
    "lon": -43.17655,
    "x": 18.52,
    "z": -22.79,
    "baseElevationMeters": 0,
    "scale": 0.72,
    "rotationY": 0.738,
    "primaryColor": "#e8dec8",
    "secondaryColor": "#8a99ad",
    "accentColor": "#d4af37",
    "archetype": "beaux_arts_opera",
    "fact": "Inspired by the Paris Opéra Garnier during Mayor Pereira Passos’s sweeping \"Bota-Abaixo\" urban renewal, the Theatro Municipal crowns Cinelândia Square directly above the inaugural 1979 Cinelândia Metro station.",
    "facts": [
      "Inspired by the Paris Opéra Garnier during Mayor Pereira Passos’s sweeping \"Bota-Abaixo\" urban renewal, the Theatro Municipal crowns Cinelândia Square directly above the inaugural 1979 Cinelândia Metro station."
    ],
    "historicalSummary": "Inspired by the Paris Opéra Garnier during Mayor Pereira Passos’s sweeping \"Bota-Abaixo\" urban renewal, the Theatro Municipal crowns Cinelândia Square directly above the inaugural 1979 Cinelândia Metro station.",
    "metroConnection": "Connected via L1, L2, VLT1",
    "svgPath": "M10 50 L10 30 L20 22 L44 22 L54 30 L54 50 Z M22 22 A10 10 0 0 1 42 22"
  },
  {
    "id": "monument-sambodromo",
    "nodeName": "Monument_sambodromo",
    "name": "Sambadrome Marquês de Sapucaí (Passarela do Samba)",
    "localName": "Sambadrome Marquês de Sapucaí (Passarela do Samba)",
    "year": 1984,
    "completedYear": 1984,
    "architect": "700m Carnival Parade Avenue & Concrete Arch of Praça da Apoteose (Oscar Niemeyer, 1984)",
    "architecturalStyle": "700m Carnival Parade Avenue & Concrete Arch of Praça da Apoteose (Oscar Niemeyer, 1984)",
    "lat": -22.911299,
    "lon": -43.196621,
    "x": -1.63,
    "z": -20.36,
    "baseElevationMeters": 0,
    "scale": 0.76,
    "rotationY": 0.256,
    "primaryColor": "#f5f5f5",
    "secondaryColor": "#8a99ad",
    "accentColor": "#ff3b7f",
    "archetype": "niemeyer_apoteose_arch",
    "fact": "Designed by Oscar Niemeyer and Anthropologist Darcy Ribeiro in just 120 days for the 1984 Carnival, culminating in the soaring M-shaped concrete arch at Praça da Apoteose next to Praça Onze Metro station.",
    "facts": [
      "Designed by Oscar Niemeyer and Anthropologist Darcy Ribeiro in just 120 days for the 1984 Carnival, culminating in the soaring M-shaped concrete arch at Praça da Apoteose next to Praça Onze Metro station."
    ],
    "historicalSummary": "Designed by Oscar Niemeyer and Anthropologist Darcy Ribeiro in just 120 days for the 1984 Carnival, culminating in the soaring M-shaped concrete arch at Praça da Apoteose next to Praça Onze Metro station.",
    "metroConnection": "Connected via L1",
    "svgPath": "M12 52 L12 36 Q32 18 52 36 L52 52 M20 52 L20 40 Q32 28 44 40 L44 52"
  },
  {
    "id": "monument-central-do-brasil",
    "nodeName": "Monument_central_do_brasil",
    "name": "Central do Brasil Station & Clock Tower",
    "localName": "Central do Brasil Station & Clock Tower",
    "year": 1943,
    "completedYear": 1943,
    "architect": "Monumental 110m Art Deco Clock Tower & Four-Face Illuminated Dial (Roberto Magno de Carvalho, 1943)",
    "architecturalStyle": "Monumental 110m Art Deco Clock Tower & Four-Face Illuminated Dial (Roberto Magno de Carvalho, 1943)",
    "lat": -22.9046,
    "lon": -43.1912,
    "x": 3.82,
    "z": -27.66,
    "baseElevationMeters": 0,
    "scale": 0.78,
    "rotationY": 0.256,
    "primaryColor": "#dfd6c7",
    "secondaryColor": "#8a99ad",
    "accentColor": "#f7c948",
    "archetype": "clock_tower_terminus",
    "fact": "Originating in 1858 as the Estrada de Ferro Dom Pedro II and rebuilt in 1943 with its 110-meter Art Deco clock tower, Central do Brasil is the beating commuter heart linking SuperVia trains, MetrôRio Lines 1 & 2, and VLT.",
    "facts": [
      "Originating in 1858 as the Estrada de Ferro Dom Pedro II and rebuilt in 1943 with its 110-meter Art Deco clock tower, Central do Brasil is the beating commuter heart linking SuperVia trains, MetrôRio Lines 1 & 2, and VLT."
    ],
    "historicalSummary": "Originating in 1858 as the Estrada de Ferro Dom Pedro II and rebuilt in 1943 with its 110-meter Art Deco clock tower, Central do Brasil is the beating commuter heart linking SuperVia trains, MetrôRio Lines 1 & 2, and VLT.",
    "metroConnection": "Connected via L1, L2, VLT2",
    "svgPath": "M12 52 L52 52 L52 38 L38 38 L38 10 L32 6 L26 10 L26 38 L12 38 Z"
  },
  {
    "id": "monument-copacabana-palace",
    "nodeName": "Monument_copacabana_palace",
    "name": "Copacabana Palace & Burle Marx Calçadão",
    "localName": "Copacabana Palace & Burle Marx Calçadão",
    "year": 1923,
    "completedYear": 1923,
    "architect": "Mediterranean Riviera White Stucco Palace & Portuguese Mosaic Promenade (Joseph Gire, 1923)",
    "architecturalStyle": "Mediterranean Riviera White Stucco Palace & Portuguese Mosaic Promenade (Joseph Gire, 1923)",
    "lat": -22.967228,
    "lon": -43.17891,
    "x": 16.15,
    "z": 40.53,
    "baseElevationMeters": 0,
    "scale": 0.74,
    "rotationY": 0.661,
    "primaryColor": "#fffdf9",
    "secondaryColor": "#8a99ad",
    "accentColor": "#f7c948",
    "archetype": "grand_palace_facade",
    "fact": "Built by French architect Joseph Gire in 1923 facing the black-and-white Portuguese stone waves of Avenida Atlântica, reached underground by Cardeal Arcoverde station when MetrôRio expanded to Copacabana in 1998.",
    "facts": [
      "Built by French architect Joseph Gire in 1923 facing the black-and-white Portuguese stone waves of Avenida Atlântica, reached underground by Cardeal Arcoverde station when MetrôRio expanded to Copacabana in 1998."
    ],
    "historicalSummary": "Built by French architect Joseph Gire in 1923 facing the black-and-white Portuguese stone waves of Avenida Atlântica, reached underground by Cardeal Arcoverde station when MetrôRio expanded to Copacabana in 1998.",
    "metroConnection": "Connected via L1, L4",
    "svgPath": "M8 50 L8 28 L18 20 L26 28 L38 28 L46 20 L56 28 L56 50 Z"
  }
];

export const RIO_MILESTONES: CityHistoricalMilestone[] = [
  {
    "year": 1896,
    "title": "1896",
    "description": "1896: Inauguration of the Santa Teresa Electric Tramway across Arcos da Lapa",
    "category": "metro"
  },
  {
    "year": 1912,
    "title": "1912",
    "description": "Oct 27, 1912: Opening of the Sugarloaf Aerial Cable Car (Bondinho do Pão de Açúcar)",
    "category": "metro"
  },
  {
    "year": 1931,
    "title": "1931",
    "description": "Oct 12, 1931: Dedication of Christ the Redeemer atop Corcovado Mountain",
    "category": "metro"
  },
  {
    "year": 1943,
    "title": "1943",
    "description": "1943: Completion of the 110m Art Deco Clock Tower at Central do Brasil",
    "category": "metro"
  },
  {
    "year": 1950,
    "title": "1950",
    "description": "June 16, 1950: Opening of Maracanã Stadium for the FIFA World Cup",
    "category": "metro"
  },
  {
    "year": 1979,
    "title": "1979",
    "description": "March 5, 1979: Inauguration of MetrôRio Line 1 (Praça Onze ↔ Cinelândia)",
    "category": "metro"
  },
  {
    "year": 1981,
    "title": "1981",
    "description": "Nov 19, 1981: Opening of MetrôRio Line 2 (Estácio ↔ Maracanã)",
    "category": "metro"
  },
  {
    "year": 1998,
    "title": "1998",
    "description": "July 1998: Line 1 tunnels beneath the mountains into Copacabana (Cardeal Arcoverde)",
    "category": "metro"
  },
  {
    "year": 2016,
    "title": "2016",
    "description": "Summer 2016: Olympic Line 4 (Ipanema ↔ Barra da Tijuca) & VLT Carioca Light Rail",
    "category": "metro"
  },
  {
    "year": 2026,
    "title": "2026",
    "description": "2026: Integrated Carioca Metropolitan Network (MetrôRio, VLT & SuperVia)",
    "category": "metro"
  }
];

export const RIO_ERAS: CityEraDescription[] = [
  {
    "id": "rio_era_1",
    "name": "Pereira Passos Boulevards, Bondes & the Sugarloaf Cableway",
    "yearRange": [
      1890,
      1929
    ],
    "tagline": "TROPICAL BELLE ÉPOQUE • 1890–1929",
    "summary": "Rio reshaped its colonial core with grand Parisian-inspired avenues (Avenida Central, Cinelândia), electrified the Santa Teresa tram over Arcos da Lapa (1896), and launched the Sugarloaf Bondinho (1912)."
  },
  {
    "id": "rio_era_2",
    "name": "Christ the Redeemer, Central do Brasil & Burle Marx Parklands",
    "yearRange": [
      1930,
      1978
    ],
    "tagline": "CARIOCA MODERNISM • 1930–1978",
    "summary": "Art Deco and Brazilian Modernism transformed the skyline with Christ the Redeemer (1931), Central do Brasil’s 110m tower (1943), Maracanã Stadium (1950), and Roberto Burle Marx’s sweeping Aterro do Flamengo gardens."
  },
  {
    "id": "rio_era_3",
    "name": "Beneath Centro, Tijuca & the Granite Peaks of Copacabana",
    "yearRange": [
      1979,
      2009
    ],
    "tagline": "METRÔRIO BIRTH & EXPANSION • 1979–2009",
    "summary": "On March 5, 1979, MetrôRio opened its inaugural Line 1 through the heart of Centro, soon joined by Line 2 to Maracanã and Pavuna, and rock-bored caverns beneath Copacabana and Ipanema."
  },
  {
    "id": "rio_era_4",
    "name": "Line 4 to Barra, Porto Maravilha & VLT Carioca",
    "yearRange": [
      2010,
      2026
    ],
    "tagline": "OLYMPIC METROPOLIS • 2010–2026",
    "summary": "For the 2016 Olympic Games, Line 4 bored beneath Two Brothers peak from Ipanema to Barra da Tijuca, while the catenary-free VLT Carioca light rail and Calatrava’s Museum of Tomorrow revitalized the historic port."
  }
];

export const RIO_TOUR_STOPS: CityTourStop[] = [
  {
    "id": "tour-rio-sugarloaf-1565",
    "title": "1565 Founding at Urca & the 1912 Sugarloaf Bondinho",
    "year": 1912,
    "lat": -22.9493,
    "lon": -43.1546,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Estácio de Sá founded São Sebastião do Rio de Janeiro on March 1, 1565 on the isthmus between Morro Cara de Cão and Pão de Açúcar. In 1912, engineer Augusto Ferreira Ramos inaugurated Brazil’s first aerial cable car—climbing 396m over Guanabara Bay.",
    "highlightMonumentId": "monument-sugarloaf",
    "highlightStationName": "botafogo",
    "x": 40.56,
    "z": 21.01
  },
  {
    "id": "tour-rio-lapa-aqueduct",
    "title": "Arcos da Lapa & the 1896 Santa Teresa Electric Tram",
    "year": 1900,
    "lat": -22.913,
    "lon": -43.1801,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Built by enslaved African and Indigenous craftsmen and inaugurated in 1750 with 42 double-tiered stone arches to carry water from the Carioca River, the aqueduct was converted in 1896 into the bridge for the iconic yellow Bonde de Santa Teresa.",
    "highlightMonumentId": "monument-arcos-lapa",
    "highlightStationName": "cinelandia",
    "x": 14.96,
    "z": -18.51
  },
  {
    "id": "tour-rio-cinelandia-belle-epoque",
    "title": "Cinelândia, Theatro Municipal & the Birth of MetrôRio",
    "year": 1979,
    "lat": -22.909,
    "lon": -43.1765,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Modeled after Charles Garnier’s Paris Opera and inaugurated in July 1909, the Theatro Municipal anchored Rio’s Belle Époque civic plaza; seventy years later, on March 5, 1979, Cinelândia became the southern terminus of MetrôRio’s inaugural Line 1.",
    "highlightMonumentId": "monument-theatro-municipal",
    "highlightStationName": "cinelandia",
    "x": 18.57,
    "z": -22.86
  },
  {
    "id": "tour-rio-cristo-redentor",
    "title": "Christ the Redeemer: Art Deco Beacon of Corcovado",
    "year": 1931,
    "lat": -22.9519,
    "lon": -43.2105,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Conceived by Brazilian engineer Heitor da Silva Costa, sculpted by French-Polish artist Paul Landowski, and calculated in reinforced concrete by Albert Caquot, the 38-meter monument is clad in millions of hand-laid triangular soapstone (pedra-sabão) tiles.",
    "highlightMonumentId": "monument-christ-redeemer",
    "highlightStationName": "largo-do-machado",
    "x": -15.56,
    "z": 23.84
  },
  {
    "id": "tour-rio-sambodromo-carnival",
    "title": "Praça Onze, Niemeyer’s Sambadrome & the Cradle of Samba",
    "year": 1984,
    "lat": -22.9114,
    "lon": -43.1968,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Around Praça Onze and Estácio, Afro-Brazilian matriarchs like Tia Ciata hosted gatherings where Donga and Pixinguinha forged modern samba (\"Pelo Telefone\", 1916). In 1984, Oscar Niemeyer crowned the avenue with the concrete Sambadrome.",
    "highlightMonumentId": "monument-sambodromo",
    "highlightStationName": "praca-onze",
    "x": -1.81,
    "z": -20.25
  },
  {
    "id": "tour-rio-maracana-1950",
    "title": "Maracanã Stadium: Cathedral of Brazilian Football",
    "year": 1981,
    "lat": -22.9121,
    "lon": -43.2302,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Constructed for the 1950 FIFA World Cup as the largest stadium on Earth, Maracanã witnessed Pelé’s 1,000th goal in 1969 and the 2016 Olympic ceremonies, linked directly to an elevated MetrôRio Line 2 concourse since 1981.",
    "highlightMonumentId": "monument-maracana",
    "highlightStationName": "maracana",
    "x": -35.34,
    "z": -19.49
  },
  {
    "id": "tour-rio-copacabana-burle-marx",
    "title": "Copacabana Palace & Burle Marx’s Portuguese Stone Waves",
    "year": 1998,
    "lat": -22.9672,
    "lon": -43.1789,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Facing the 1923 Copacabana Palace, landscape maestro Roberto Burle Marx redesigned the 4-kilometer Avenida Atlântica promenade in 1970 into a continuous modernist tapestry of black, white, and terracotta-red Portuguese stone mosaics.",
    "highlightMonumentId": "monument-copacabana-palace",
    "highlightStationName": "cardeal-arcoverde",
    "x": 16.16,
    "z": 40.5
  },
  {
    "id": "tour-rio-museu-do-amanha",
    "title": "Praça Mauá, Little Africa & the Museum of Tomorrow",
    "year": 2016,
    "lat": -22.8941,
    "lon": -43.1794,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Replacing the demolished Perimetral elevated highway with pedestrian boulevards, the VLT light rail, the UNESCO-listed Cais do Valongo heritage site, and Santiago Calatrava’s cantilevered Museum of Tomorrow reopened Guanabara Bay to the city.",
    "highlightMonumentId": "monument-museum-tomorrow",
    "highlightStationName": "vlt-parada-dos-museus",
    "x": 15.66,
    "z": -39.09
  }
];
