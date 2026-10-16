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

export const SYDNEY_MONUMENTS_GLB_PATH = '/models/sydney_monuments.glb';

export const SYDNEY_MONUMENTS: CityMonument[] = [
  {
    "id": "monument-sydney-opera-house",
    "nodeName": "Monument_sydney_opera_house",
    "name": "Sydney Opera House (Tubowgule)",
    "localName": "Sydney Opera House (Tubowgule)",
    "year": 1973,
    "completedYear": 1973,
    "architect": "Spherical Precast Concrete Rib Vaults & 1.05M Swedish Ceramic Tiles (Jørn Utzon & Ove Arup, 1973)",
    "architecturalStyle": "Spherical Precast Concrete Rib Vaults & 1.05M Swedish Ceramic Tiles (Jørn Utzon & Ove Arup, 1973)",
    "lat": -33.8568,
    "lon": 151.2153,
    "x": 6.1,
    "z": -10.2,
    "baseElevationMeters": 0,
    "scale": 0.84,
    "rotationY": -0.32,
    "primaryColor": "#fcf8ef",
    "secondaryColor": "#8a99ad",
    "accentColor": "#c85a32",
    "archetype": "opera_house_sails",
    "fact": "Standing on Tubowgule—the sacred Gadigal tidal headland of Bennelong Point—Jørn Utzon’s billowing white ceramic shells were opened in October 1973 as a UNESCO World Heritage masterpiece on Sydney Harbour.",
    "facts": [
      "Standing on Tubowgule—the sacred Gadigal tidal headland of Bennelong Point—Jørn Utzon’s billowing white ceramic shells were opened in October 1973 as a UNESCO World Heritage masterpiece on Sydney Harbour."
    ],
    "historicalSummary": "Standing on Tubowgule—the sacred Gadigal tidal headland of Bennelong Point—Jørn Utzon’s billowing white ceramic shells were opened in October 1973 as a UNESCO World Heritage masterpiece on Sydney Harbour.",
    "metroConnection": "Connected via T2, T3, T8, L2",
    "svgPath": "M8 48 L56 48 M12 48 Q16 18 28 48 M24 48 Q30 14 42 48 M38 48 Q44 24 54 48"
  },
  {
    "id": "monument-harbour-bridge",
    "nodeName": "Monument_harbour_bridge",
    "name": "Sydney Harbour Bridge",
    "localName": "Sydney Harbour Bridge",
    "year": 1932,
    "completedYear": 1932,
    "architect": "503m Riveted Steel Through-Arch & 89m Moruya Granite Pylons (John Bradfield & Dorman Long, 1932)",
    "architecturalStyle": "503m Riveted Steel Through-Arch & 89m Moruya Granite Pylons (John Bradfield & Dorman Long, 1932)",
    "lat": -33.8523,
    "lon": 151.2108,
    "x": 1.45,
    "z": -15.8,
    "baseElevationMeters": 0,
    "scale": 0.85,
    "rotationY": 0.42,
    "primaryColor": "#5c646d",
    "secondaryColor": "#8a99ad",
    "accentColor": "#d8ccb8",
    "archetype": "steel_arch_bridge",
    "fact": "Masterminded by chief engineer Dr. John Bradfield as the centerpiece of Sydney’s electrified underground and suburban railway network, the world’s tallest steel arch bridge opened on March 19, 1932.",
    "facts": [
      "Masterminded by chief engineer Dr. John Bradfield as the centerpiece of Sydney’s electrified underground and suburban railway network, the world’s tallest steel arch bridge opened on March 19, 1932."
    ],
    "historicalSummary": "Masterminded by chief engineer Dr. John Bradfield as the centerpiece of Sydney’s electrified underground and suburban railway network, the world’s tallest steel arch bridge opened on March 19, 1932.",
    "metroConnection": "Connected via T1",
    "svgPath": "M6 44 Q32 12 58 44 M6 38 L58 38 M12 48 L12 28 M52 48 L52 28"
  },
  {
    "id": "monument-sydney-tower",
    "nodeName": "Monument_sydney_tower",
    "name": "Sydney Tower Eye (Centrepoint Tower)",
    "localName": "Sydney Tower Eye (Centrepoint Tower)",
    "year": 1981,
    "completedYear": 1981,
    "architect": "309m Cable-Stayed Hyperboloid Steel Lattice & Golden Barrel Turret (Donald Crone, 1981)",
    "architecturalStyle": "309m Cable-Stayed Hyperboloid Steel Lattice & Golden Barrel Turret (Donald Crone, 1981)",
    "lat": -33.8704,
    "lon": 151.2089,
    "x": -0.52,
    "z": 6.72,
    "baseElevationMeters": 0,
    "scale": 0.78,
    "rotationY": 0,
    "primaryColor": "#e5a93c",
    "secondaryColor": "#8a99ad",
    "accentColor": "#c8cdd4",
    "archetype": "observation_needle",
    "fact": "Rising 309 meters above Pitt Street Mall with a 56-cable diagrid hyperboloid cradle and golden anodized observation turret, flanked below by St James, Town Hall, and Gadigal Metro stations.",
    "facts": [
      "Rising 309 meters above Pitt Street Mall with a 56-cable diagrid hyperboloid cradle and golden anodized observation turret, flanked below by St James, Town Hall, and Gadigal Metro stations."
    ],
    "historicalSummary": "Rising 309 meters above Pitt Street Mall with a 56-cable diagrid hyperboloid cradle and golden anodized observation turret, flanked below by St James, Town Hall, and Gadigal Metro stations.",
    "metroConnection": "Connected via M1, T1, T2, T4",
    "svgPath": "M28 54 L30 24 L24 20 L24 16 L40 16 L40 20 L34 24 L36 54 M32 16 L32 6"
  },
  {
    "id": "monument-qvb",
    "nodeName": "Monument_qvb",
    "name": "Queen Victoria Building (QVB)",
    "localName": "Queen Victoria Building (QVB)",
    "year": 1898,
    "completedYear": 1898,
    "architect": "Federation Romanesque Pyrmont Sandstone Arcade & 20 Copper Domes (George McRae, 1898)",
    "architecturalStyle": "Federation Romanesque Pyrmont Sandstone Arcade & 20 Copper Domes (George McRae, 1898)",
    "lat": -33.8718,
    "lon": 151.2067,
    "x": -2.79,
    "z": 8.46,
    "baseElevationMeters": 0,
    "scale": 0.76,
    "rotationY": 0.18,
    "primaryColor": "#d9a468",
    "secondaryColor": "#8a99ad",
    "accentColor": "#4c9c84",
    "archetype": "domed_sandstone_arcade",
    "fact": "Spanning an entire city block in golden Pyrmont sandstone with a 20-meter copper central dome and stained-glass barrel vault, connected directly beneath George Street to Town Hall and Gadigal stations.",
    "facts": [
      "Spanning an entire city block in golden Pyrmont sandstone with a 20-meter copper central dome and stained-glass barrel vault, connected directly beneath George Street to Town Hall and Gadigal stations."
    ],
    "historicalSummary": "Spanning an entire city block in golden Pyrmont sandstone with a 20-meter copper central dome and stained-glass barrel vault, connected directly beneath George Street to Town Hall and Gadigal stations.",
    "metroConnection": "Connected via M1, T1, T2, T4, L2",
    "svgPath": "M8 50 L8 32 L56 32 L56 50 Z M22 32 A10 10 0 0 1 42 32 M32 22 L32 14"
  },
  {
    "id": "monument-central-station-sydney",
    "nodeName": "Monument_central_station_sydney",
    "name": "Sydney Central Station & Clock Tower",
    "localName": "Sydney Central Station & Clock Tower",
    "year": 1906,
    "completedYear": 1906,
    "architect": "Free Classical Sandstone Headhouse, Grand Concourse & 85m Clock Tower (Walter Liberty Vernon, 1906)",
    "architecturalStyle": "Free Classical Sandstone Headhouse, Grand Concourse & 85m Clock Tower (Walter Liberty Vernon, 1906)",
    "lat": -33.8832,
    "lon": 151.2062,
    "x": -3.31,
    "z": 22.65,
    "baseElevationMeters": 0,
    "scale": 0.8,
    "rotationY": 0.18,
    "primaryColor": "#d8a86e",
    "secondaryColor": "#8a99ad",
    "accentColor": "#c85a32",
    "archetype": "clock_tower_terminus",
    "fact": "Opened in August 1906 and crowned by its 85m clock tower in 1921; in August 2024, new 27-meter-deep driverless Sydney Metro M1 platforms opened directly beneath its historic platforms.",
    "facts": [
      "Opened in August 1906 and crowned by its 85m clock tower in 1921; in August 2024, new 27-meter-deep driverless Sydney Metro M1 platforms opened directly beneath its historic platforms."
    ],
    "historicalSummary": "Opened in August 1906 and crowned by its 85m clock tower in 1921; in August 2024, new 27-meter-deep driverless Sydney Metro M1 platforms opened directly beneath its historic platforms.",
    "metroConnection": "Connected via M1, T1, T2, T4, T8, L1, L2",
    "svgPath": "M12 52 L52 52 L52 38 L38 38 L38 10 L32 6 L26 10 L26 38 L12 38 Z"
  },
  {
    "id": "monument-st-marys-cathedral",
    "nodeName": "Monument_st_marys_cathedral",
    "name": "St Mary's Cathedral & Anzac Memorial (Hyde Park)",
    "localName": "St Mary's Cathedral & Anzac Memorial (Hyde Park)",
    "year": 1882,
    "completedYear": 1882,
    "architect": "English Geometric Gothic Revival in Golden Sydney Sandstone & Twin Spires (William Wardell)",
    "architecturalStyle": "English Geometric Gothic Revival in Golden Sydney Sandstone & Twin Spires (William Wardell)",
    "lat": -33.8712,
    "lon": 151.2133,
    "x": 4.04,
    "z": 7.71,
    "baseElevationMeters": 0,
    "scale": 0.74,
    "rotationY": 0.18,
    "primaryColor": "#dbb078",
    "secondaryColor": "#8a99ad",
    "accentColor": "#8c6239",
    "archetype": "twin_spire_cathedral",
    "fact": "Designed by William Wilkinson Wardell in warm local sandstone overlooking Hyde Park and St James Station (the inaugural 1926 underground station of John Bradfield’s City Circle).",
    "facts": [
      "Designed by William Wilkinson Wardell in warm local sandstone overlooking Hyde Park and St James Station (the inaugural 1926 underground station of John Bradfield’s City Circle)."
    ],
    "historicalSummary": "Designed by William Wilkinson Wardell in warm local sandstone overlooking Hyde Park and St James Station (the inaugural 1926 underground station of John Bradfield’s City Circle).",
    "metroConnection": "Connected via T2, T3, T8",
    "svgPath": "M14 52 L14 24 L20 8 L26 24 L38 24 L44 8 L50 24 L50 52 Z"
  },
  {
    "id": "monument-luna-park",
    "nodeName": "Monument_luna_park",
    "name": "Luna Park Milsons Point",
    "localName": "Luna Park Milsons Point",
    "year": 1935,
    "completedYear": 1935,
    "architect": "Fantasy Art Deco Twin Towers & Smiling Moon Face Gateway (1935)",
    "architecturalStyle": "Fantasy Art Deco Twin Towers & Smiling Moon Face Gateway (1935)",
    "lat": -33.8477,
    "lon": 151.2098,
    "x": 0.41,
    "z": -21.53,
    "baseElevationMeters": 0,
    "scale": 0.72,
    "rotationY": -0.45,
    "primaryColor": "#f7e6c4",
    "secondaryColor": "#8a99ad",
    "accentColor": "#c85a32",
    "archetype": "twin_tower_gateway",
    "fact": "Erected in 1935 on the former Dorman Long steel fabrication workshops used to build the Sydney Harbour Bridge, standing beside Milsons Point elevated railway station.",
    "facts": [
      "Erected in 1935 on the former Dorman Long steel fabrication workshops used to build the Sydney Harbour Bridge, standing beside Milsons Point elevated railway station."
    ],
    "historicalSummary": "Erected in 1935 on the former Dorman Long steel fabrication workshops used to build the Sydney Harbour Bridge, standing beside Milsons Point elevated railway station.",
    "metroConnection": "Connected via T1",
    "svgPath": "M14 52 L18 14 L26 14 L28 52 M36 52 L38 14 L46 14 L50 52 M8 38 L56 38"
  },
  {
    "id": "monument-barangaroo-crown",
    "nodeName": "Monument_barangaroo_crown",
    "name": "Barangaroo Tower & Wulugul Headland",
    "localName": "Barangaroo Tower & Wulugul Headland",
    "year": 2020,
    "completedYear": 2020,
    "architect": "271m Sculptural Spiraling Glass Petal Skyscraper (WilkinsonEyre, 2020)",
    "architecturalStyle": "271m Sculptural Spiraling Glass Petal Skyscraper (WilkinsonEyre, 2020)",
    "lat": -33.8622,
    "lon": 151.2012,
    "x": -8.48,
    "z": -3.48,
    "baseElevationMeters": 0,
    "scale": 0.78,
    "rotationY": 0.3,
    "primaryColor": "#8ecae6",
    "secondaryColor": "#8a99ad",
    "accentColor": "#e8a849",
    "archetype": "twisting_glass_tower",
    "fact": "Named in honor of Barangaroo, a powerful Cammeraygal woman and leader at the time of British colonization; served since August 2024 by the deep subterranean Barangaroo Metro station.",
    "facts": [
      "Named in honor of Barangaroo, a powerful Cammeraygal woman and leader at the time of British colonization; served since August 2024 by the deep subterranean Barangaroo Metro station."
    ],
    "historicalSummary": "Named in honor of Barangaroo, a powerful Cammeraygal woman and leader at the time of British colonization; served since August 2024 by the deep subterranean Barangaroo Metro station.",
    "metroConnection": "Connected via M1",
    "svgPath": "M22 52 L18 32 L26 10 L40 14 L44 34 L38 52 Z"
  }
];

export const SYDNEY_MILESTONES: CityHistoricalMilestone[] = [
  {
    "year": 1855,
    "title": "1855",
    "description": "Sept 26, 1855: Opening of NSW’s first railway from Sydney Redfern/Central to Parramatta",
    "category": "metro"
  },
  {
    "year": 1898,
    "title": "1898",
    "description": "1898: Completion of the sandstone Queen Victoria Building & George Street electric trams",
    "category": "metro"
  },
  {
    "year": 1906,
    "title": "1906",
    "description": "Aug 4, 1906: Inauguration of the grand sandstone Sydney Central Terminal",
    "category": "metro"
  },
  {
    "year": 1926,
    "title": "1926",
    "description": "Dec 20, 1926: Australia’s first underground electric railway opens (Central ↔ St James)",
    "category": "metro"
  },
  {
    "year": 1932,
    "title": "1932",
    "description": "March 19, 1932: Opening of the Sydney Harbour Bridge & Wynyard–Town Hall underground trunk",
    "category": "metro"
  },
  {
    "year": 1956,
    "title": "1956",
    "description": "Jan 20, 1956: Completion of the elevated Circular Quay station & full City Circle loop",
    "category": "metro"
  },
  {
    "year": 1973,
    "title": "1973",
    "description": "Oct 20, 1973: Inauguration of Jørn Utzon’s Sydney Opera House at Bennelong Point",
    "category": "metro"
  },
  {
    "year": 1979,
    "title": "1979",
    "description": "June 23, 1979: Opening of the Eastern Suburbs Railway underground line to Martin Place & Bondi Junction",
    "category": "metro"
  },
  {
    "year": 2019,
    "title": "2019",
    "description": "2019: Driverless Sydney Metro North West & George Street CSELR Light Rail return",
    "category": "metro"
  },
  {
    "year": 2024,
    "title": "2024",
    "description": "Aug 19, 2024: Sydney Metro M1 City & Southwest twin tunnels dive beneath Sydney Harbour",
    "category": "metro"
  },
  {
    "year": 2026,
    "title": "2026",
    "description": "2026: Integrated Sydney Metro M1, City Circle & Harbour Rail Network",
    "category": "metro"
  }
];

export const SYDNEY_ERAS: CityEraDescription[] = [
  {
    "id": "sydney_era_1",
    "name": "Gadigal Country, Golden Sandstone & Central Terminal",
    "yearRange": [
      1855,
      1925
    ],
    "tagline": "SANDSTONE FEDERATION • 1855–1925",
    "summary": "Carved across the ancestral sandstone ridges and coves of the Gadigal people of the Eora Nation, Victorian and Federation Sydney erected the Queen Victoria Building (1898) and Central Terminal (1906)."
  },
  {
    "id": "sydney_era_2",
    "name": "The City Underground, Harbour Bridge & Circular Quay Loop",
    "yearRange": [
      1926,
      1969
    ],
    "tagline": "THE BRADFIELD VISION • 1926–1969",
    "summary": "Dr. John Bradfield electrified Sydney with Australia’s first underground railway at St James and Museum in December 1926, leaped across Port Jackson on the Sydney Harbour Bridge in 1932, and closed the City Circle loop at Circular Quay in 1956."
  },
  {
    "id": "sydney_era_3",
    "name": "Sydney Opera House, Sydney Tower & the Bondi Underground",
    "yearRange": [
      1970,
      2015
    ],
    "tagline": "HARBOUR SAILS & EASTERN SUBURBS • 1970–2015",
    "summary": "The ceramic shells of the Sydney Opera House transformed Bennelong Point in 1973, followed by the deep viaduct-and-cavern Eastern Suburbs line to Martin Place, Kings Cross, and Bondi Junction in 1979."
  },
  {
    "id": "sydney_era_4",
    "name": "Twin Tunnels Beneath Port Jackson & First Nations Place Naming",
    "yearRange": [
      2016,
      2026
    ],
    "tagline": "SYDNEY METRO ERA • 2016–2026",
    "summary": "In August 2024, fully automated Sydney Metro M1 trains dove 40 meters beneath Sydney Harbour from Victoria Cross to Barangaroo, Martin Place, Gadigal, Waterloo, and Sydenham."
  }
];

export const SYDNEY_TOUR_STOPS: CityTourStop[] = [
  {
    "id": "tour-sydney-tubowgule-opera",
    "title": "Tubowgule (Bennelong Point) & the Sydney Opera House",
    "year": 1973,
    "lat": -33.8568,
    "lon": 151.2153,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Known to the Gadigal people for millennia as Tubowgule (\"where the knowledge waters meet\"), Bennelong Point was crowned in 1973 by Jørn Utzon’s Concrete Sails—famously solved in 1961 by slicing all shells from a single sphere of identical radius.",
    "highlightMonumentId": "monument-sydney-opera-house",
    "highlightStationName": "circular-quay",
    "x": 6.1,
    "z": -10.2
  },
  {
    "id": "tour-sydney-harbour-bridge-bradfield",
    "title": "Dr. John Bradfield & the 1932 Sydney Harbour Bridge",
    "year": 1932,
    "lat": -33.8523,
    "lon": 151.2108,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Anchored by 128 steel cables threaded into deep U-shaped tunnels blasted into the sandstone bedrock on each shore, the two 503m cantilevers met at the center on August 19, 1930 and opened with four railway tracks on March 19, 1932.",
    "highlightMonumentId": "monument-harbour-bridge",
    "highlightStationName": "milsons-point",
    "x": 1.45,
    "z": -15.8
  },
  {
    "id": "tour-sydney-st-james-1926",
    "title": "St James Station: Australia’s First Underground & Ghost Tunnels",
    "year": 1926,
    "lat": -33.8702,
    "lon": 151.2118,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Opened on December 20, 1926 as Australia’s first underground railway alongside Museum station, St James was built with two inner platforms for a planned Bondi–Balmain line that was halted by the Great Depression—leaving flooded ghost tunnels beneath Hyde Park.",
    "highlightMonumentId": "monument-st-marys-cathedral",
    "highlightStationName": "st-james",
    "x": 2.48,
    "z": 6.47
  },
  {
    "id": "tour-sydney-central-clock-tower",
    "title": "Central Station: From 1855 Steam to 2024 Driverless Metro",
    "year": 1906,
    "lat": -33.8832,
    "lon": 151.2062,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Next to the 1855 Devonshire Street terminus, Walter Liberty Vernon’s 1906 sandstone terminal and 85m clock tower now sit directly above the 27-meter-deep Sydney Metro M1 cavern opened in August 2024.",
    "highlightMonumentId": "monument-central-station-sydney",
    "highlightStationName": "central-sydney",
    "x": -3.31,
    "z": 22.65
  },
  {
    "id": "tour-sydney-qvb-town-hall",
    "title": "Queen Victoria Building & the George Street Spine",
    "year": 1932,
    "lat": -33.8718,
    "lon": 151.2067,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Designed by City Architect George McRae during the 1890s depression to employ stonemasons across a full block of George Street, the QVB connects via underground arcades directly to Town Hall (1932) and Gadigal (2024) stations.",
    "highlightMonumentId": "monument-qvb",
    "highlightStationName": "town-hall",
    "x": -2.79,
    "z": 8.46
  },
  {
    "id": "tour-sydney-barangaroo-metro",
    "title": "Barangaroo, Nawi Cove & the 2024 Under-Harbour Crossing",
    "year": 2024,
    "lat": -33.8592,
    "lon": 151.2022,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Named after Barangaroo, a fiercely independent Cammeraygal leader and fisherwoman, the precinct’s 2024 Metro excavation uncovered the oldest colonial timber boat ever found in NSW alongside thousands of years of Indigenous coastal heritage.",
    "highlightMonumentId": "monument-barangaroo-crown",
    "highlightStationName": "barangaroo",
    "x": -7.45,
    "z": -7.22
  }
];
