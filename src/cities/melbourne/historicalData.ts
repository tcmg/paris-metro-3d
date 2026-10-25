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

export const MELBOURNE_MONUMENTS_GLB_PATH = '/models/melbourne_monuments.glb';

export const MELBOURNE_MONUMENTS: CityMonument[] = [
  {
    "id": "monument-flinders-street",
    "nodeName": "Monument_flinders_street",
    "name": "Flinders Street Station (1910 Copper Dome & Entrance Clocks)",
    "localName": "Flinders Street Railway Station (\"Under the Clocks\")",
    "year": 1910,
    "completedYear": 1910,
    "architect": "Fawcett & Ashworth French Renaissance Copper Dome, Clock Tower & Yellow-and-Blood-Red Facade",
    "architecturalStyle": "Fawcett & Ashworth French Renaissance Copper Dome, Clock Tower & Yellow-and-Blood-Red Facade",
    "lat": -37.8183,
    "lon": 144.9671,
    "x": 4.04,
    "z": 6,
    "baseElevationMeters": 0,
    "scale": 0.95,
    "rotationY": -1.236,
    "primaryColor": "#e8b93c",
    "secondaryColor": "#a6382b",
    "accentColor": "#3d8c78",
    "archetype": "clock_tower_terminus",
    "fact": "Opened on September 12, 1854 as Melbourne Terminus for Australia’s first steam railway and rebuilt in 1905–1910 with its iconic bronze-green dome, Elizabeth Street clock tower, and nine departure indicator clocks.",
    "facts": [
      "Opened on September 12, 1854 as Melbourne Terminus for Australia’s first steam railway and rebuilt in 1905–1910 with its iconic bronze-green dome, Elizabeth Street clock tower, and nine departure indicator clocks."
    ],
    "historicalSummary": "Opened on September 12, 1854 as Melbourne Terminus for Australia’s first steam railway and rebuilt in 1905–1910 with its iconic bronze-green dome, Elizabeth Street clock tower, and nine departure indicator clocks.",
    "metroConnection": "Connected via CL, MT, SHM, MER, WIL, 35, 1",
    "svgPath": "M12 52 L52 52 L52 38 L38 38 L38 10 L32 6 L26 10 L26 38 L12 38 Z"
  },
  {
    "id": "monument-royal-exhibition",
    "nodeName": "Monument_royal_exhibition",
    "name": "Royal Exhibition Building (1880 UNESCO World Heritage Dome)",
    "localName": "Royal Exhibition Building (Carlton Gardens)",
    "year": 1880,
    "completedYear": 1880,
    "architect": "Joseph Reed Florentine Duomo Octagonal Dome, Cruciform Great Hall & Triumphal Fanlight Portals",
    "architecturalStyle": "Joseph Reed Florentine Duomo Octagonal Dome, Cruciform Great Hall & Triumphal Fanlight Portals",
    "lat": -37.804708,
    "lon": 144.971581,
    "x": 8.57,
    "z": -11.35,
    "baseElevationMeters": 0,
    "scale": 0.92,
    "rotationY": -0.043,
    "primaryColor": "#eee6d5",
    "secondaryColor": "#6d7885",
    "accentColor": "#d4af37",
    "archetype": "baroque_dome_cathedral",
    "fact": "Designed by Joseph Reed for the 1880 Melbourne International Exhibition with a 68m octagonal dome inspired by Brunelleschi’s Florence Cathedral, it hosted the opening of the first Parliament of Australia on May 9, 1901.",
    "facts": [
      "Designed by Joseph Reed for the 1880 Melbourne International Exhibition with a 68m octagonal dome inspired by Brunelleschi’s Florence Cathedral, it hosted the opening of the first Parliament of Australia on May 9, 1901."
    ],
    "historicalSummary": "Designed by Joseph Reed for the 1880 Melbourne International Exhibition with a 68m octagonal dome inspired by Brunelleschi’s Florence Cathedral, it hosted the opening of the first Parliament of Australia on May 9, 1901.",
    "metroConnection": "Connected via 96, 86, CL",
    "svgPath": "M12 50 L12 34 L52 34 L52 50 Z M20 34 A12 14 0 0 1 44 34 M32 20 L32 10"
  },
  {
    "id": "monument-shrine-remembrance",
    "nodeName": "Monument_shrine_remembrance",
    "name": "Shrine of Remembrance (1934 Stepped Pyramid Mausoleum)",
    "localName": "Shrine of Remembrance (Kings Domain)",
    "year": 1934,
    "completedYear": 1934,
    "architect": "Hudson & Wardrop Parthenon Doric Portico & Stepped Pyramid of Halicarnassus",
    "architecturalStyle": "Hudson & Wardrop Parthenon Doric Portico & Stepped Pyramid of Halicarnassus",
    "lat": -37.8305,
    "lon": 144.9734,
    "x": 10.41,
    "z": 21.57,
    "baseElevationMeters": 0,
    "scale": 0.92,
    "rotationY": 0.35,
    "primaryColor": "#e0dad0",
    "secondaryColor": "#9e988e",
    "accentColor": "#c9a648",
    "archetype": "domed_sandstone_arcade",
    "fact": "Designed by WWI veterans Phillip Hudson and James Wardrop in Tynong granite, its roof aperture is calibrated so a beam of sunlight sweeps across the word \"LOVE\" on the Stone of Remembrance at 11 a.m. every November 11.",
    "facts": [
      "Designed by WWI veterans Phillip Hudson and James Wardrop in Tynong granite, its roof aperture is calibrated so a beam of sunlight sweeps across the word \"LOVE\" on the Stone of Remembrance at 11 a.m. every November 11."
    ],
    "historicalSummary": "Designed by WWI veterans Phillip Hudson and James Wardrop in Tynong granite, its roof aperture is calibrated so a beam of sunlight sweeps across the word \"LOVE\" on the Stone of Remembrance at 11 a.m. every November 11.",
    "metroConnection": "Connected via MT, 1",
    "svgPath": "M8 50 L8 32 L56 32 L56 50 Z M22 32 A10 10 0 0 1 42 32 M32 22 L32 14"
  },
  {
    "id": "monument-federation-square",
    "nodeName": "Monument_federation_square",
    "name": "Federation Square (2002 Deconstructivist Pinwheel Facades)",
    "localName": "Fed Square (Wurundjeri Tanderrum Civic Plaza)",
    "year": 2002,
    "completedYear": 2002,
    "architect": "Lab Architecture Studio Kimberley Sandstone, Perforated Zinc & Glass Pinwheel Fractals over Rail Deck",
    "architecturalStyle": "Lab Architecture Studio Kimberley Sandstone, Perforated Zinc & Glass Pinwheel Fractals over Rail Deck",
    "lat": -37.818141,
    "lon": 144.969169,
    "x": 6.13,
    "z": 5.8,
    "baseElevationMeters": 0,
    "scale": 0.92,
    "rotationY": 0.248,
    "primaryColor": "#d99b66",
    "secondaryColor": "#7b8c99",
    "accentColor": "#3ab4c4",
    "archetype": "one_wtc_and_oculus",
    "fact": "Built on a massive structural deck bridging the Jolimont railyards opposite Flinders Street Station, Federation Square’s facade is tiled from 475,000 Kimberley sandstone cobbles and five self-similar \"pinwheel\" triangles.",
    "facts": [
      "Built on a massive structural deck bridging the Jolimont railyards opposite Flinders Street Station, Federation Square’s facade is tiled from 475,000 Kimberley sandstone cobbles and five self-similar \"pinwheel\" triangles."
    ],
    "historicalSummary": "Built on a massive structural deck bridging the Jolimont railyards opposite Flinders Street Station, Federation Square’s facade is tiled from 475,000 Kimberley sandstone cobbles and five self-similar \"pinwheel\" triangles.",
    "metroConnection": "Connected via CL, MT, 35, 1",
    "svgPath": "M16 52 L20 12 L24 4 L28 12 L32 52 M36 50 Q46 34 58 42 L48 50 Z"
  },
  {
    "id": "monument-eureka-tower",
    "nodeName": "Monument_eureka_tower",
    "name": "Eureka Tower & Melbourne Skydeck (2006 24-Carat Gold Crown)",
    "localName": "Eureka Tower (Southbank)",
    "year": 2006,
    "completedYear": 2006,
    "architect": "Fender Katsalidis Cobalt-Blue Glass, 24-Carat Gold-Plated Top 10 Floors, Red Blood Stripe & Cantilevered Edge Cube",
    "architecturalStyle": "Fender Katsalidis Cobalt-Blue Glass, 24-Carat Gold-Plated Top 10 Floors, Red Blood Stripe & Cantilevered Edge Cube",
    "lat": -37.821512,
    "lon": 144.964789,
    "x": 1.71,
    "z": 10.1,
    "baseElevationMeters": 0,
    "scale": 0.92,
    "rotationY": -0.997,
    "primaryColor": "#1e5aa8",
    "secondaryColor": "#f5f7fa",
    "accentColor": "#f4c430",
    "archetype": "empire_state_tower",
    "fact": "Designed by Fender Katsalidis to commemorate the 1854 Victorian Gold Rush Eureka Stockade rebellion—combining a cobalt-blue and white stockade flag facade, a vertical crimson stripe, and 3,680 panes of 24-carat gold-plated glass on levels 83–92.",
    "facts": [
      "Designed by Fender Katsalidis to commemorate the 1854 Victorian Gold Rush Eureka Stockade rebellion—combining a cobalt-blue and white stockade flag facade, a vertical crimson stripe, and 3,680 panes of 24-carat gold-plated glass on levels 83–92."
    ],
    "historicalSummary": "Designed by Fender Katsalidis to commemorate the 1854 Victorian Gold Rush Eureka Stockade rebellion—combining a cobalt-blue and white stockade flag facade, a vertical crimson stripe, and 3,680 panes of 24-carat gold-plated glass on levels 83–92.",
    "metroConnection": "Connected via CL, MT, 1",
    "svgPath": "M18 52 L18 40 L24 40 L24 20 L28 20 L28 12 L32 4 L36 12 L36 20 L40 20 L40 40 L46 40 L46 52 Z"
  },
  {
    "id": "monument-mcg-stadium",
    "nodeName": "Monument_mcg_stadium",
    "name": "Melbourne Cricket Ground — The ’G (100,024-Seat Colosseum)",
    "localName": "Melbourne Cricket Ground (MCG)",
    "year": 1956,
    "completedYear": 1956,
    "architect": "Circular 100,024-Seat Grandstand Bowl & Six 85m Tubular Steel Light Towers (1985)",
    "architecturalStyle": "Circular 100,024-Seat Grandstand Bowl & Six 85m Tubular Steel Light Towers (1985)",
    "lat": -37.82,
    "lon": 144.9834,
    "x": 20.52,
    "z": 8.17,
    "baseElevationMeters": 0,
    "scale": 0.95,
    "rotationY": 0.395,
    "primaryColor": "#dde3ea",
    "secondaryColor": "#2e8b57",
    "accentColor": "#f4c430",
    "archetype": "stadium_bowl",
    "fact": "Founded in 1853, birthplace of Australian Rules Football (1859) and Test Cricket (1877), main stadium of the 1956 Melbourne Olympics, and largest stadium in the Southern Hemisphere with six 85-meter light towers.",
    "facts": [
      "Founded in 1853, birthplace of Australian Rules Football (1859) and Test Cricket (1877), main stadium of the 1956 Melbourne Olympics, and largest stadium in the Southern Hemisphere with six 85-meter light towers."
    ],
    "historicalSummary": "Founded in 1853, birthplace of Australian Rules Football (1859) and Test Cricket (1877), main stadium of the 1956 Melbourne Olympics, and largest stadium in the Southern Hemisphere with six 85-meter light towers.",
    "metroConnection": "Connected via MER, SHM",
    "svgPath": "M8 38 Q32 22 56 38 L52 48 Q32 54 12 48 Z M14 38 Q32 30 50 38"
  },
  {
    "id": "monument-arts-centre-spire",
    "nodeName": "Monument_arts_centre_spire",
    "name": "Arts Centre Melbourne & 162m Ballerina Spire",
    "localName": "Arts Centre Melbourne (Theatres Building)",
    "year": 1984,
    "completedYear": 1984,
    "architect": "162m White Steel Space-Frame Spire & Cascading Ballerina Tutu Mesh Skirt",
    "architecturalStyle": "162m White Steel Space-Frame Spire & Cascading Ballerina Tutu Mesh Skirt",
    "lat": -37.821508,
    "lon": 144.96846,
    "x": 5.42,
    "z": 10.09,
    "baseElevationMeters": 0,
    "scale": 0.94,
    "rotationY": -0.229,
    "primaryColor": "#f4f6f9",
    "secondaryColor": "#b89448",
    "accentColor": "#38b6ff",
    "archetype": "observation_needle",
    "fact": "Because waterlogged Yarra River silt prevented building high theater fly-towers above ground, architect Sir Roy Grounds sank the State Theatre five levels underground and crowned the roof with a 162-meter lattice spire.",
    "facts": [
      "Because waterlogged Yarra River silt prevented building high theater fly-towers above ground, architect Sir Roy Grounds sank the State Theatre five levels underground and crowned the roof with a 162-meter lattice spire."
    ],
    "historicalSummary": "Because waterlogged Yarra River silt prevented building high theater fly-towers above ground, architect Sir Roy Grounds sank the State Theatre five levels underground and crowned the roof with a 162-meter lattice spire.",
    "metroConnection": "Connected via CL, MT, 1",
    "svgPath": "M28 54 L30 24 L24 20 L24 16 L40 16 L40 20 L34 24 L36 54 M32 16 L32 6"
  },
  {
    "id": "monument-bolte-bridge",
    "nodeName": "Monument_bolte_bridge",
    "name": "Bolte Bridge (1999 Twin 140m Silver Needle Towers)",
    "localName": "Bolte Bridge (Docklands Yarra Crossing)",
    "year": 1999,
    "completedYear": 1999,
    "architect": "Balanced Cantilever Box-Girder Viaduct & Twin 140m Tapering Silver Concrete Obelisks",
    "architecturalStyle": "Balanced Cantilever Box-Girder Viaduct & Twin 140m Tapering Silver Concrete Obelisks",
    "lat": -37.8168,
    "lon": 144.9381,
    "x": -25.27,
    "z": 4.08,
    "baseElevationMeters": 0,
    "scale": 1.1,
    "rotationY": 1.642,
    "primaryColor": "#cfd6de",
    "secondaryColor": "#8d99a6",
    "accentColor": "#f4b942",
    "archetype": "twin_tower_gateway",
    "fact": "Designed by Melbourne architects Denton Corker Marshall as the western gateway to the city, its two 140-meter tapering silver concrete needles rise without structural cables on either side of the Yarra River deck.",
    "facts": [
      "Designed by Melbourne architects Denton Corker Marshall as the western gateway to the city, its two 140-meter tapering silver concrete needles rise without structural cables on either side of the Yarra River deck."
    ],
    "historicalSummary": "Designed by Melbourne architects Denton Corker Marshall as the western gateway to the city, its two 140-meter tapering silver concrete needles rise without structural cables on either side of the Yarra River deck.",
    "metroConnection": "Connected via 35, 86",
    "svgPath": "M14 52 L18 14 L26 14 L28 52 M36 52 L38 14 L46 14 L50 52 M8 38 L56 38"
  }
];

export const MELBOURNE_MILESTONES: CityHistoricalMilestone[] = [
  {
    "year": 1854,
    "title": "Australia’s First Steam Railway (Flinders Street to Sandridge)",
    "description": "On September 12, 1854, the Melbourne and Hobson’s Bay Railway Company runs Australia’s first steam passenger train from Flinders Street to Port Melbourne.",
    "category": "metro"
  },
  {
    "year": 1880,
    "title": "Royal Exhibition Building & World’s Largest Cable Tramway",
    "description": "Fuelled by the Victorian Gold Rush (\"Marvellous Melbourne\"), the Royal Exhibition Building opens in 1880 followed in 1885 by one of the world’s largest cable tram networks.",
    "category": "architecture"
  },
  {
    "year": 1910,
    "title": "Flinders Street Station Dome & Clocks Completed",
    "description": "Fawcett & Ashworth’s Edwardian Baroque station opens along the Yarra River; by 1926 its electric suburban lines make it the busiest passenger station in the world.",
    "category": "metro"
  },
  {
    "year": 1923,
    "title": "Iconic Green-and-Gold W-Class Trams Debut",
    "description": "The Melbourne & Metropolitan Tramways Board introduces the drop-centre W-Class electric tram, becoming the rolling cultural symbol of Melbourne.",
    "category": "culture"
  },
  {
    "year": 1956,
    "title": "1956 Melbourne Olympic Games at the MCG",
    "description": "The Melbourne Cricket Ground hosts the XVI Olympiad, the first Olympic Games held in the Southern Hemisphere.",
    "category": "culture"
  },
  {
    "year": 1981,
    "title": "Melbourne Underground Rail Loop (City Loop) Opens",
    "description": "Museum (Melbourne Central) and Parliament stations open in 1981, followed by Flagstaff in 1985, wrapping the Hoddle Grid in a four-tunnel underground loop.",
    "category": "metro"
  },
  {
    "year": 2002,
    "title": "Federation Square & Eureka Skydeck (2006)",
    "description": "Federation Square decks over the Jolimont rail yards opposite Flinders Street, while Eureka Tower rises 297.3m above Southbank with a 24-carat gold crown.",
    "category": "architecture"
  },
  {
    "year": 2025,
    "title": "Metro Tunnel (Twin 9 km Deep-Bore Cross-City Rail)",
    "description": "Melbourne’s biggest rail transformation since the 1981 City Loop opens five new underground stations—Arden, Parkville, State Library, Town Hall, and Anzac.",
    "category": "metro"
  }
];

export const MELBOURNE_ERAS: CityEraDescription[] = [
  {
    "id": "melbourne_era_1",
    "name": "Wurundjeri Country, Hoddle Grid & 1854 First Steam Railway",
    "yearRange": [
      1837,
      1879
    ],
    "tagline": "1837–1879 • Hoddle Grid (-28°), Victorian Gold Rush & Sandridge Line",
    "summary": "Surveyor Robert Hoddle lays out the 1837 street grid aligned to the Yarra River before the 1851 Victorian Gold Rush makes Melbourne one of the richest cities on Earth."
  },
  {
    "id": "melbourne_era_2",
    "name": "Marvellous Melbourne, Federation & Flinders Street Clocks",
    "yearRange": [
      1880,
      1939
    ],
    "tagline": "1880–1939 • Royal Exhibition Building, Cable/W-Class Trams & Shrine of Remembrance",
    "summary": "Melbourne serves as Australia’s temporary federal capital (1901–1927), electrifies its suburban railways (1919), and builds the Shrine of Remembrance (1934)."
  },
  {
    "id": "melbourne_era_3",
    "name": "Olympic City, Arts Centre Spire & The 1981 Underground City Loop",
    "yearRange": [
      1945,
      1999
    ],
    "tagline": "1945–1999 • 1956 MCG Olympics, MURL Underground Loop & Bolte Bridge",
    "summary": "The four-tube Melbourne Underground Rail Loop (1981–1985) rings the CBD while Sir Roy Grounds’ Arts Centre Spire anchors the St Kilda Road cultural boulevard."
  },
  {
    "id": "melbourne_era_4",
    "name": "Fed Square, Gold-Crowned Southbank & The 2025 Metro Tunnel",
    "yearRange": [
      2000,
      2026
    ],
    "tagline": "2000–2026 • Federation Square, Eureka Tower & Twin 9km Metro Tunnel",
    "summary": "High-capacity low-floor trams and the 2025 Metro Tunnel link Parkville University, Swanston Street, and the Shrine of Remembrance into a through-running metro spine."
  }
];

export const MELBOURNE_TOUR_STOPS: CityTourStop[] = [
  {
    "id": "tour-mel-flinders-clocks",
    "title": "“Meet Me Under the Clocks”: Flinders Street Station & the 1854 Steam Terminus",
    "year": 1926,
    "lat": -37.8183,
    "lon": 144.9671,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Opened in 1854 for Australia’s first steam train to Port Melbourne and rebuilt in 1910 with its copper dome and indicator clocks, Flinders Street handled 280,000 daily passengers by 1926 after suburban electrification.",
    "highlightMonumentId": "monument-flinders-street",
    "highlightStationName": "flinders-street",
    "x": 4.04,
    "z": 6
  },
  {
    "id": "tour-mel-fed-square-yarra",
    "title": "Decking Over the Jolimont Yards: Federation Square’s Fractal Sandstone",
    "year": 2002,
    "lat": -37.818,
    "lon": 144.9691,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "To celebrate Australia’s Centenary of Federation, engineers spanned 12 active railway tracks with a vibration-isolated steel deck supporting Federation Square’s five pinwheel sandstone-and-zinc buildings.",
    "highlightMonumentId": "monument-federation-square",
    "highlightStationName": "town-hall",
    "x": 6.06,
    "z": 5.62
  },
  {
    "id": "tour-mel-exhibition-unesco",
    "title": "Marvellous Melbourne: The 1880 Royal Exhibition Building & First Parliament",
    "year": 1901,
    "lat": -37.8047,
    "lon": 144.9717,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Crowned by a 68m octagonal dome modeled on Florence’s Duomo, it hosted the 1880 and 1888 World Exhibitions and the proclamation of the first Parliament of the Commonwealth of Australia on May 9, 1901.",
    "highlightMonumentId": "monument-royal-exhibition",
    "highlightStationName": "nicholson-street-carlton-gardens",
    "x": 8.69,
    "z": -11.36
  },
  {
    "id": "tour-mel-eureka-arts-spire",
    "title": "Southbank: Roy Grounds’ 162m Ballerina Spire & Eureka Tower’s 24-Carat Gold Crown",
    "year": 2006,
    "lat": -37.8213,
    "lon": 144.9647,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Architects Fender Katsalidis translated the 1854 Ballarat goldfields Eureka Stockade flag into cobalt glass and white horizontal bands, topped by 3,680 panes of real 24-carat gold leaf.",
    "highlightMonumentId": "monument-eureka-tower",
    "highlightStationName": "arts-centre-ngv",
    "x": 1.62,
    "z": 9.83
  },
  {
    "id": "tour-mel-shrine-metro-tunnel",
    "title": "St Kilda Road Axis: The 1934 Shrine of Remembrance & 2025 Anzac Metro Station",
    "year": 2025,
    "lat": -37.8305,
    "lon": 144.9734,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Directly aligned with the Swanston Street–St Kilda Road axis, Anzac Station pairs a sweeping timber canopy for Route 1 trams with deep underground platforms beneath the 1934 Shrine of Remembrance.",
    "highlightMonumentId": "monument-shrine-remembrance",
    "highlightStationName": "anzac",
    "x": 10.41,
    "z": 21.57
  },
  {
    "id": "tour-mel-mcg-bolte",
    "title": "From the 100,024-Seat MCG Colosseum to the Twin 140m Needles of the Bolte Bridge",
    "year": 1999,
    "lat": -37.82,
    "lon": 144.9834,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Served by Jolimont and Richmond stations on the east and City Circle W-Class trams in Docklands on the west, the MCG and Bolte Bridge form the monumental structural gateways to Melbourne.",
    "highlightMonumentId": "monument-mcg-stadium",
    "highlightStationName": "jolimont",
    "x": 20.52,
    "z": 8.17
  }
];
