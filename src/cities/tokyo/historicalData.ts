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

export const TOKYO_MONUMENTS_GLB_PATH = '/models/tokyo_monuments.glb';

export const TOKYO_MONUMENTS: CityMonument[] = [
  {
    "id": "monument-tokyo-tower",
    "nodeName": "Monument_tokyo_tower",
    "name": "Tokyo Tower (東京タワー)",
    "localName": "Tokyo Tower (東京タワー)",
    "year": 1958,
    "completedYear": 1958,
    "architect": "333m International Orange & White Seismic Steel Lattice Tower (Tachū Naitō & Nikken Sekkei, 1958)",
    "architecturalStyle": "333m International Orange & White Seismic Steel Lattice Tower (Tachū Naitō & Nikken Sekkei, 1958)",
    "lat": 35.6586,
    "lon": 139.7454,
    "x": -20.74,
    "z": 26.58,
    "baseElevationMeters": 0,
    "scale": 0.85,
    "rotationY": 0.245,
    "primaryColor": "#ff4f1f",
    "secondaryColor": "#f6f7fa",
    "accentColor": "#ffbe4f",
    "archetype": "observation_needle",
    "fact": "Designed by seismic structural pioneer Dr. Tachū Naitō and completed in December 1958 at 333 meters—partially forged from recycled steel—standing as the radiant symbol of post-war Tokyo’s rebirth above Shiba Park.",
    "facts": [
      "Designed by seismic structural pioneer Dr. Tachū Naitō and completed in December 1958 at 333 meters—partially forged from recycled steel—standing as the radiant symbol of post-war Tokyo’s rebirth above Shiba Park."
    ],
    "historicalSummary": "Designed by seismic structural pioneer Dr. Tachū Naitō and completed in December 1958 at 333 meters—partially forged from recycled steel—standing as the radiant symbol of post-war Tokyo’s rebirth above Shiba Park.",
    "metroConnection": "Connected via H, E, A",
    "svgPath": "M28 54 L30 24 L24 20 L24 16 L40 16 L40 20 L34 24 L36 54 M32 16 L32 6"
  },
  {
    "id": "monument-tokyo-skytree",
    "nodeName": "Monument_tokyo_skytree",
    "name": "Tokyo Skytree (東京スカイツリー)",
    "localName": "Tokyo Skytree (東京スカイツリー)",
    "year": 2012,
    "completedYear": 2012,
    "architect": "634m Neo-Futurist Steel Lattice & Five-Story Pagoda Shinbashira Core Damper (Nikken Sekkei, 2012)",
    "architecturalStyle": "634m Neo-Futurist Steel Lattice & Five-Story Pagoda Shinbashira Core Damper (Nikken Sekkei, 2012)",
    "lat": 35.7101,
    "lon": 139.8107,
    "x": 41.66,
    "z": -33.99,
    "baseElevationMeters": 0,
    "scale": 0.9,
    "rotationY": 0.631,
    "primaryColor": "#eef3f8",
    "secondaryColor": "#6bb8e6",
    "accentColor": "#b388eb",
    "archetype": "observation_needle",
    "fact": "Soaring 634 meters (a play on \"Mu-sa-shi\", the historic province of Tokyo), the world’s tallest broadcasting tower morphs from an equilateral triangle at its base into a circle at 350m, stabilized inside by a central concrete shinbashira inspired by ancient Japanese five-story pagodas.",
    "facts": [
      "Soaring 634 meters (a play on \"Mu-sa-shi\", the historic province of Tokyo), the world’s tallest broadcasting tower morphs from an equilateral triangle at its base into a circle at 350m, stabilized inside by a central concrete shinbashira inspired by ancient Japanese five-story pagodas."
    ],
    "historicalSummary": "Soaring 634 meters (a play on \"Mu-sa-shi\", the historic province of Tokyo), the world’s tallest broadcasting tower morphs from an equilateral triangle at its base into a circle at 350m, stabilized inside by a central concrete shinbashira inspired by ancient Japanese five-story pagodas.",
    "metroConnection": "Connected via Z, A",
    "svgPath": "M28 54 L30 24 L24 20 L24 16 L40 16 L40 20 L34 24 L36 54 M32 16 L32 6"
  },
  {
    "id": "monument-sensoji-pagoda",
    "nodeName": "Monument_sensoji_pagoda",
    "name": "Sensō-ji Temple, Five-Story Pagoda & Kaminarimon (浅草寺)",
    "localName": "Sensō-ji Temple, Five-Story Pagoda & Kaminarimon (浅草寺)",
    "year": 645,
    "completedYear": 645,
    "architect": "Vermilion Buddhist Hondō Hall, Five-Story Gojū-no-tō Pagoda & Kaminarimon Thunder Gate",
    "architecturalStyle": "Vermilion Buddhist Hondō Hall, Five-Story Gojū-no-tō Pagoda & Kaminarimon Thunder Gate",
    "lat": 35.714689,
    "lon": 139.796731,
    "x": 28.32,
    "z": -39.39,
    "baseElevationMeters": 0,
    "scale": 0.8,
    "rotationY": -0.093,
    "primaryColor": "#d92b2b",
    "secondaryColor": "#2e3836",
    "accentColor": "#e5b842",
    "archetype": "twin_tower_gateway",
    "fact": "Founded in 645 AD to enshrine a golden statue of Kannon pulled from the Sumida River; in December 1927, Asia’s very first subway line (the Ginza Line) opened between Asakusa and Ueno to carry worshippers to Sensō-ji’s vermilion Kaminarimon gate and five-story pagoda.",
    "facts": [
      "Founded in 645 AD to enshrine a golden statue of Kannon pulled from the Sumida River; in December 1927, Asia’s very first subway line (the Ginza Line) opened between Asakusa and Ueno to carry worshippers to Sensō-ji’s vermilion Kaminarimon gate and five-story pagoda."
    ],
    "historicalSummary": "Founded in 645 AD to enshrine a golden statue of Kannon pulled from the Sumida River; in December 1927, Asia’s very first subway line (the Ginza Line) opened between Asakusa and Ueno to carry worshippers to Sensō-ji’s vermilion Kaminarimon gate and five-story pagoda.",
    "metroConnection": "Connected via G, A",
    "svgPath": "M14 52 L18 14 L26 14 L28 52 M36 52 L38 14 L46 14 L50 52 M8 38 L56 38"
  },
  {
    "id": "monument-tokyo-station",
    "nodeName": "Monument_tokyo_station",
    "name": "Tokyo Station Marunouchi Building (東京駅丸の内駅舎)",
    "localName": "Tokyo Station Marunouchi Building (東京駅丸の内駅舎)",
    "year": 1914,
    "completedYear": 1914,
    "architect": "335m Tatsuno-Style Red Brick, White Granite Bands & Twin Octagonal Copper Domes (Kingo Tatsuno, 1914)",
    "architecturalStyle": "335m Tatsuno-Style Red Brick, White Granite Bands & Twin Octagonal Copper Domes (Kingo Tatsuno, 1914)",
    "lat": 35.681277,
    "lon": 139.767006,
    "x": -0.09,
    "z": -0.09,
    "baseElevationMeters": 0,
    "scale": 0.82,
    "rotationY": -1.851,
    "primaryColor": "#b54534",
    "secondaryColor": "#f2eee6",
    "accentColor": "#3a4856",
    "archetype": "beaux_arts_terminus",
    "fact": "Designed by Kingo Tatsuno and inaugurated on December 20, 1914 facing the Imperial Palace; its 335-meter red-brick facade survived the 1923 Great Kantō Earthquake and had its original three-story octagonal domes faithfully restored in 2012.",
    "facts": [
      "Designed by Kingo Tatsuno and inaugurated on December 20, 1914 facing the Imperial Palace; its 335-meter red-brick facade survived the 1923 Great Kantō Earthquake and had its original three-story octagonal domes faithfully restored in 2012."
    ],
    "historicalSummary": "Designed by Kingo Tatsuno and inaugurated on December 20, 1914 facing the Imperial Palace; its 335-meter red-brick facade survived the 1923 Great Kantō Earthquake and had its original three-story octagonal domes faithfully restored in 2012.",
    "metroConnection": "Connected via M, JY, T, C, Z",
    "svgPath": "M8 50 L8 26 L56 26 L56 50 Z M16 50 L16 34 A6 6 0 0 1 28 34 L28 50 M36 50 L36 34 A6 6 0 0 1 48 34 L48 50"
  },
  {
    "id": "monument-meiji-jingu",
    "nodeName": "Monument_meiji_jingu",
    "name": "Meiji Jingu Grand Torii & Sanctuary (明治神宮)",
    "localName": "Meiji Jingu Grand Torii & Sanctuary (明治神宮)",
    "year": 1920,
    "completedYear": 1920,
    "architect": "12m Taiwanese Hinoki Cypress Myōjin Torii & Copper-Roofed Nagare-zukuri Shrine Complex (Chūta Itō, 1920)",
    "architecturalStyle": "12m Taiwanese Hinoki Cypress Myōjin Torii & Copper-Roofed Nagare-zukuri Shrine Complex (Chūta Itō, 1920)",
    "lat": 35.6764,
    "lon": 139.6993,
    "x": -64.79,
    "z": 5.65,
    "baseElevationMeters": 0,
    "scale": 0.78,
    "rotationY": 0.086,
    "primaryColor": "#c4965a",
    "secondaryColor": "#2f6e5e",
    "accentColor": "#d4af37",
    "archetype": "grand_palace_facade",
    "fact": "Dedicated in November 1920 to Emperor Meiji and Empress Shōken amidst a sacred forest of 100,000 trees donated from across Japan, entered through towering unpainted 1,500-year-old cypress Torii gates next to Harajuku Station.",
    "facts": [
      "Dedicated in November 1920 to Emperor Meiji and Empress Shōken amidst a sacred forest of 100,000 trees donated from across Japan, entered through towering unpainted 1,500-year-old cypress Torii gates next to Harajuku Station."
    ],
    "historicalSummary": "Dedicated in November 1920 to Emperor Meiji and Empress Shōken amidst a sacred forest of 100,000 trees donated from across Japan, entered through towering unpainted 1,500-year-old cypress Torii gates next to Harajuku Station.",
    "metroConnection": "Connected via C, F, JY",
    "svgPath": "M8 50 L8 28 L18 20 L26 28 L38 28 L46 20 L56 28 L56 50 Z"
  },
  {
    "id": "monument-imperial-palace-nijubashi",
    "nodeName": "Monument_imperial_palace_nijubashi",
    "name": "Tokyo Imperial Palace: Nijūbashi & Fujimi-yagura (皇居二重橋)",
    "localName": "Tokyo Imperial Palace: Nijūbashi & Fujimi-yagura (皇居二重橋)",
    "year": 1628,
    "completedYear": 1628,
    "architect": "Edo Castle Battered Stone Moat Walls, Three-Tiered White Fujimi-yagura Turret & Double-Arch Nijūbashi Bridge",
    "architecturalStyle": "Edo Castle Battered Stone Moat Walls, Three-Tiered White Fujimi-yagura Turret & Double-Arch Nijūbashi Bridge",
    "lat": 35.6802,
    "lon": 139.7538,
    "x": -12.71,
    "z": 1.18,
    "baseElevationMeters": 0,
    "scale": 0.8,
    "rotationY": -0.032,
    "primaryColor": "#f5f3ed",
    "secondaryColor": "#4a525a",
    "accentColor": "#3f7a68",
    "archetype": "norman_four_turret_keep",
    "fact": "Former fortress of the Tokugawa Shogunate (Edo Castle) and residence of the Emperor since the 1868 Meiji Restoration, where the graceful Meiji double-arch Eyeglass Bridge (Nijūbashi) reflects in the moat below the 1659 Fujimi-yagura watchtower.",
    "facts": [
      "Former fortress of the Tokugawa Shogunate (Edo Castle) and residence of the Emperor since the 1868 Meiji Restoration, where the graceful Meiji double-arch Eyeglass Bridge (Nijūbashi) reflects in the moat below the 1659 Fujimi-yagura watchtower."
    ],
    "historicalSummary": "Former fortress of the Tokugawa Shogunate (Edo Castle) and residence of the Emperor since the 1868 Meiji Restoration, where the graceful Meiji double-arch Eyeglass Bridge (Nijūbashi) reflects in the moat below the 1659 Fujimi-yagura watchtower.",
    "metroConnection": "Connected via C, M, T, Z",
    "svgPath": "M14 50 L14 16 L20 16 L20 24 L44 24 L44 16 L50 16 L50 50 Z"
  },
  {
    "id": "monument-cocoon-tower",
    "nodeName": "Monument_cocoon_tower",
    "name": "Mode Gakuen Cocoon Tower (モード学園コクーンタワー)",
    "localName": "Mode Gakuen Cocoon Tower (モード学園コクーンタワー)",
    "year": 2008,
    "completedYear": 2008,
    "architect": "204m Elliptical White Diagrid Exoskeleton & Three Curved Indigo Glass Blades (Tange Associates, 2008)",
    "architecturalStyle": "204m Elliptical White Diagrid Exoskeleton & Three Curved Indigo Glass Blades (Tange Associates, 2008)",
    "lat": 35.6916,
    "lon": 139.6969,
    "x": -67.08,
    "z": -12.23,
    "baseElevationMeters": 0,
    "scale": 0.82,
    "rotationY": -0.305,
    "primaryColor": "#1f4e78",
    "secondaryColor": "#f4f6fa",
    "accentColor": "#58b4e8",
    "archetype": "twisting_glass_tower",
    "fact": "Designed by Tange Associates in the Nishi-Shinjuku skyscraper district to house three design and technology academies, its sculpted 50-story white diagrid cocoon symbolizes nurturing creative students before they take flight.",
    "facts": [
      "Designed by Tange Associates in the Nishi-Shinjuku skyscraper district to house three design and technology academies, its sculpted 50-story white diagrid cocoon symbolizes nurturing creative students before they take flight."
    ],
    "historicalSummary": "Designed by Tange Associates in the Nishi-Shinjuku skyscraper district to house three design and technology academies, its sculpted 50-story white diagrid cocoon symbolizes nurturing creative students before they take flight.",
    "metroConnection": "Connected via M, E, F, JY",
    "svgPath": "M22 52 L18 32 L26 10 L40 14 L44 34 L38 52 Z"
  },
  {
    "id": "monument-rainbow-bridge",
    "nodeName": "Monument_rainbow_bridge",
    "name": "Rainbow Bridge (レインボーブリッジ)",
    "localName": "Rainbow Bridge (レインボーブリッジ)",
    "year": 1993,
    "completedYear": 1993,
    "architect": "798m Double-Deck White Suspension Bridge & Solar-Lit Catenary Cables (1993)",
    "architecturalStyle": "798m Double-Deck White Suspension Bridge & Solar-Lit Catenary Cables (1993)",
    "lat": 35.6365,
    "lon": 139.76315,
    "x": -3.77,
    "z": 52.56,
    "baseElevationMeters": 0,
    "scale": 1.35,
    "rotationY": -0.332,
    "primaryColor": "#f2f5f8",
    "secondaryColor": "#48b89f",
    "accentColor": "#ff5e7e",
    "archetype": "gothic_suspension_bridge",
    "fact": "Spanning northern Tokyo Bay between Shibaura Pier and the waterfront islands of Odaiba, its 126-meter white steel H-pylons carry two decks of highway, promenade, and automated transit illuminated at night in rainbow solar LEDs.",
    "facts": [
      "Spanning northern Tokyo Bay between Shibaura Pier and the waterfront islands of Odaiba, its 126-meter white steel H-pylons carry two decks of highway, promenade, and automated transit illuminated at night in rainbow solar LEDs."
    ],
    "historicalSummary": "Spanning northern Tokyo Bay between Shibaura Pier and the waterfront islands of Odaiba, its 126-meter white steel H-pylons carry two decks of highway, promenade, and automated transit illuminated at night in rainbow solar LEDs.",
    "metroConnection": "Connected via JY, A, E",
    "svgPath": "M16 50 L16 18 L24 18 L24 50 M40 50 L40 18 L48 18 L48 50 M6 40 Q20 22 32 38 Q44 22 58 40"
  }
];

export const TOKYO_MILESTONES: CityHistoricalMilestone[] = [
  {
    "year": 1872,
    "title": "1872",
    "description": "Oct 14, 1872: Japan’s first railway opens from Shimbashi (Tokyo) to Yokohama",
    "category": "metro"
  },
  {
    "year": 1914,
    "title": "1914",
    "description": "Dec 20, 1914: Inauguration of Kingo Tatsuno’s red-brick Tokyo Station in Marunouchi",
    "category": "metro"
  },
  {
    "year": 1925,
    "title": "1925",
    "description": "Nov 1, 1925: Elevated Tokyo–Ueno link completes the circular JR Yamanote Line loop",
    "category": "metro"
  },
  {
    "year": 1927,
    "title": "1927",
    "description": "Dec 30, 1927: Asia’s first underground subway (Ginza Line) opens between Ueno and Asakusa",
    "category": "metro"
  },
  {
    "year": 1954,
    "title": "1954",
    "description": "Jan 20, 1954: Post-war Marunouchi Line opens between Ikebukuro and Ochanomizu",
    "category": "metro"
  },
  {
    "year": 1958,
    "title": "1958",
    "description": "Dec 23, 1958: Completion of the 333-meter Tokyo Tower in Shiba Park",
    "category": "metro"
  },
  {
    "year": 1964,
    "title": "1964",
    "description": "Oct 1, 1964: Tokaido Shinkansen Bullet Train & Hibiya/Tozai Lines launch for the 1964 Tokyo Olympics",
    "category": "metro"
  },
  {
    "year": 1993,
    "title": "1993",
    "description": "Aug 26, 1993: Rainbow Bridge spans Tokyo Bay as Nishi-Shinjuku skyscrapers rise",
    "category": "metro"
  },
  {
    "year": 2000,
    "title": "2000",
    "description": "Dec 12, 2000: Full figure-8 loop of the deep linear-motor Toei Oedo Line opens",
    "category": "metro"
  },
  {
    "year": 2008,
    "title": "2008",
    "description": "June 14, 2008: Tokyo Metro Fukutoshin Line links Ikebukuro, Shinjuku & Shibuya; Cocoon Tower opens",
    "category": "metro"
  },
  {
    "year": 2012,
    "title": "2012",
    "description": "May 22, 2012: 634m Tokyo Skytree opens & Tokyo Station’s 1914 Marunouchi domes are restored",
    "category": "metro"
  },
  {
    "year": 2026,
    "title": "2026",
    "description": "2020–2026: Takanawa Gateway, Toranomon Hills & Shibuya Sky hyper-integrated rail metropolis",
    "category": "metro"
  }
];

export const TOKYO_ERAS: CityEraDescription[] = [
  {
    "id": "tokyo_era_1",
    "name": "From Edo Castle to Tokyo Station & the Yamanote Loop",
    "yearRange": [
      1872,
      1926
    ],
    "tagline": "MEIJI & TAISHŌ RAILWAYS • 1872–1926",
    "summary": "Following the 1868 Meiji Restoration that renamed Edo to Tōkyō (\"Eastern Capital\"), Japan inaugurated its first steam railway at Shimbashi in 1872, erected Kingo Tatsuno’s red-brick Tokyo Station in 1914, and closed the electrified Yamanote loop in 1925."
  },
  {
    "id": "tokyo_era_2",
    "name": "Noritsugu Hayakawa, the Ginza Line & Post-War Marunouchi",
    "yearRange": [
      1927,
      1957
    ],
    "tagline": "ASIA’S FIRST SUBWAY • 1927–1957",
    "summary": "Inspired by the London Underground, visionary entrepreneur Noritsugu Hayakawa opened the East’s first subway between Ueno and Asakusa on December 30, 1927, extending it through Ginza to Shibuya by 1939 and launching the red Marunouchi Line in 1954."
  },
  {
    "id": "tokyo_era_3",
    "name": "Tokyo Tower, the 1964 Olympic Shinkansen & Through-Running Subways",
    "yearRange": [
      1958,
      1999
    ],
    "tagline": "SHŌWA MIRACLE & SHINKANSEN • 1958–1999",
    "summary": "Crowned by the 333m Tokyo Tower in 1958 and the 210 km/h Tokaido Shinkansen bullet train in October 1964, Tokyo pioneered seamless reciprocal through-running between downtown subways (Hibiya, Tozai, Chiyoda, Hanzomon, Asakusa) and suburban railways."
  },
  {
    "id": "tokyo_era_4",
    "name": "Oedo Linear Motor, Fukutoshin Spine & the 634m Tokyo Skytree",
    "yearRange": [
      2000,
      2026
    ],
    "tagline": "NEO-TOKYO & SKYTREE • 2000–2026",
    "summary": "In the 21st century, the deep Toei Oedo Line (2000) and Tokyo Metro Fukutoshin Line (2008) stitched together Tokyo’s polycentric sub-centers while the 634-meter Tokyo Skytree rose above Sumida and Tokyo Station’s 1914 domes returned in 2012."
  }
];

export const TOKYO_TOUR_STOPS: CityTourStop[] = [
  {
    "id": "tour-tokyo-asakusa-1927-subway",
    "title": "Asakusa & Sensō-ji: Birthplace of Asia’s First Subway (1927)",
    "year": 1927,
    "lat": 35.7148,
    "lon": 139.7967,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Linking Japan’s northern railway gateway at Ueno with Edo’s most popular temple and entertainment quarter around Sensō-ji in Asakusa, the 1927 Ginza Line was packed from day one with riders chanting its slogan: \"The Orient’s Only Underground Railway!\"",
    "highlightMonumentId": "monument-sensoji-pagoda",
    "highlightStationName": "asakusa",
    "x": 28.29,
    "z": -39.52
  },
  {
    "id": "tour-tokyo-station-1914-shinkansen",
    "title": "Tokyo Station: 1914 Red Brick & the 1964 Shinkansen Bullet Train",
    "year": 1964,
    "lat": 35.6812,
    "lon": 139.7671,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Supported by over 10,000 pine piles and a steel frame clad in red brick, Tokyo Station stood unscathed through the 1923 earthquake and dispatched the world’s first 210 km/h Tokaido Shinkansen bullet train on October 1, 1964, nine days before the Tokyo Olympics.",
    "highlightMonumentId": "monument-tokyo-station",
    "highlightStationName": "tokyo",
    "x": 0,
    "z": 0
  },
  {
    "id": "tour-tokyo-imperial-palace-edo",
    "title": "Edo Castle, Nijūbashi & the Spiral Subway Geometry of Tokyo",
    "year": 1900,
    "lat": 35.6802,
    "lon": 139.7538,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Laid out by Tokugawa Ieyasu as a clockwise defensive spiral of moats around Edo Castle, the sacred grounds of the Imperial Palace remain untouched by tunnels—causing all subway lines (Marunouchi, Tozai, Chiyoda, Hanzomon) to hug its moats and converge at Otemachi.",
    "highlightMonumentId": "monument-imperial-palace-nijubashi",
    "highlightStationName": "nijubashimae",
    "x": -12.71,
    "z": 1.18
  },
  {
    "id": "tour-tokyo-tower-1958-showa",
    "title": "Tokyo Tower (1958): Dr. Tachū Naitō’s Seismic Lattice Icon",
    "year": 1958,
    "lat": 35.6586,
    "lon": 139.7454,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "By using high-tensile steel and riveted diagonal trusses honed on earthquake-resistant broadcast towers across Japan, Dr. Tachū Naitō built the 333m Tokyo Tower in just 18 months at 4,000 metric tons—less than half the weight of Paris’s Eiffel Tower.",
    "highlightMonumentId": "monument-tokyo-tower",
    "highlightStationName": "akabanebashi",
    "x": -20.74,
    "z": 26.58
  },
  {
    "id": "tour-tokyo-meiji-jingu-shinjuku",
    "title": "Meiji Jingu’s Sacred Forest & Nishi-Shinjuku’s Cocoon Tower",
    "year": 2008,
    "lat": 35.6764,
    "lon": 139.6993,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Far from being a natural primeval wood, Meiji Jingu’s forest was scientifically designed in 1915–1920 by forestry scholars and planted by 110,000 youth volunteers using 100,000 donated trees so it would evolve into a self-sustaining climax evergreen canopy within a century.",
    "highlightMonumentId": "monument-meiji-jingu",
    "highlightStationName": "meiji-jingumae",
    "x": -64.79,
    "z": 5.65
  },
  {
    "id": "tour-tokyo-skytree-pagoda-physics",
    "title": "Tokyo Skytree (634m): Ancient Pagoda Physics Meets 21st-Century Steel",
    "year": 2012,
    "lat": 35.7101,
    "lon": 139.8107,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Traditional Japanese pagodas suspend a heavy central timber pillar (shinbashira) that sways out of phase with the outer stories; Nikken Sekkei engineered a 375-meter reinforced-concrete shinbashira inside Tokyo Skytree’s steel lattice, cutting seismic sway by up to 50%.",
    "highlightMonumentId": "monument-tokyo-skytree",
    "highlightStationName": "oshiage",
    "x": 41.66,
    "z": -33.99
  }
];
