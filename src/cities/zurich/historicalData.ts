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

export const ZURICH_MONUMENTS_GLB_PATH = '/models/zurich_monuments.glb';

export const ZURICH_MONUMENTS: CityMonument[] = [
  {
    "id": "monument-grossmuenster",
    "nodeName": "Monument_grossmuenster",
    "name": "Grossmünster (Romanesque Twin-Towered Cathedral)",
    "localName": "Grossmünster Zürich (Karlsturm & Glockenturm)",
    "year": 1220,
    "completedYear": 1220,
    "architect": "Romanesque Twin Sandstone Towers & Scarlet Octagonal Domes (1100–1220 / 1787)",
    "architecturalStyle": "Romanesque Twin Sandstone Towers & Scarlet Octagonal Domes (1100–1220 / 1787)",
    "lat": 47.3701,
    "lon": 8.544067,
    "x": 1.72,
    "z": 2.17,
    "baseElevationMeters": 0,
    "scale": 0.92,
    "rotationY": 0.961,
    "primaryColor": "#d9ceb8",
    "secondaryColor": "#8c7e6a",
    "accentColor": "#b8332a",
    "archetype": "twin_spire_cathedral",
    "fact": "Legend holds that Charlemagne founded Grossmünster where his horse knelt over the tombs of Zurich’s patron saints Felix and Regula. From its pulpit in 1519, Huldrych Zwingli launched the Swiss Reformation; its iconic twin Neo-Gothic domed helmets were added in 1787.",
    "facts": [
      "Legend holds that Charlemagne founded Grossmünster where his horse knelt over the tombs of Zurich’s patron saints Felix and Regula. From its pulpit in 1519, Huldrych Zwingli launched the Swiss Reformation; its iconic twin Neo-Gothic domed helmets were added in 1787."
    ],
    "historicalSummary": "Legend holds that Charlemagne founded Grossmünster where his horse knelt over the tombs of Zurich’s patron saints Felix and Regula. From its pulpit in 1519, Huldrych Zwingli launched the Swiss Reformation; its iconic twin Neo-Gothic domed helmets were added in 1787.",
    "metroConnection": "Connected via T4, T11, S2, S18",
    "svgPath": "M14 52 L14 24 L20 8 L26 24 L38 24 L44 8 L50 24 L50 52 Z"
  },
  {
    "id": "monument-fraumuenster-st-peter",
    "nodeName": "Monument_fraumuenster_st_peter",
    "name": "Fraumünster Abbey & St. Peter’s Clock Tower",
    "localName": "Fraumünster & Kirche St. Peter",
    "year": 1250,
    "completedYear": 1250,
    "architect": "Gothic Choir with Marc Chagall Windows, Patinated Copper Spire & 8.7m Golden Clock Dial",
    "architecturalStyle": "Gothic Choir with Marc Chagall Windows, Patinated Copper Spire & 8.7m Golden Clock Dial",
    "lat": 47.369763,
    "lon": 8.541213,
    "x": -0.91,
    "z": 2.63,
    "baseElevationMeters": 0,
    "scale": 0.9,
    "rotationY": 1.407,
    "primaryColor": "#e2d8c5",
    "secondaryColor": "#3b8c7e",
    "accentColor": "#e8b931",
    "archetype": "twin_spire_cathedral",
    "fact": "Founded in 853 by King Louis the German for aristocratic women, Fraumünster’s slender blue-green spire rises beside St. Peter’s Church—whose 1534 tower sports the largest church clock face in Europe at 8.7 meters in diameter.",
    "facts": [
      "Founded in 853 by King Louis the German for aristocratic women, Fraumünster’s slender blue-green spire rises beside St. Peter’s Church—whose 1534 tower sports the largest church clock face in Europe at 8.7 meters in diameter."
    ],
    "historicalSummary": "Founded in 853 by King Louis the German for aristocratic women, Fraumünster’s slender blue-green spire rises beside St. Peter’s Church—whose 1534 tower sports the largest church clock face in Europe at 8.7 meters in diameter.",
    "metroConnection": "Connected via T4, T11",
    "svgPath": "M14 52 L14 24 L20 8 L26 24 L38 24 L44 8 L50 24 L50 52 Z"
  },
  {
    "id": "monument-zurich-hb",
    "nodeName": "Monument_zurich_hb",
    "name": "Zürich Hauptbahnhof (1871 Wanner Portal & Underground S-Bahn Hub)",
    "localName": "Zürich Hauptbahnhof (Zürich HB)",
    "year": 1871,
    "completedYear": 1871,
    "architect": "Jakob Friedrich Wanner Triumphal Sandstone Arch & Multi-Level Underground S-Bahn Halls",
    "architecturalStyle": "Jakob Friedrich Wanner Triumphal Sandstone Arch & Multi-Level Underground S-Bahn Halls",
    "lat": 47.3782,
    "lon": 8.5402,
    "x": -1.84,
    "z": -8.82,
    "baseElevationMeters": 0,
    "scale": 0.95,
    "rotationY": 1.204,
    "primaryColor": "#d8ccb8",
    "secondaryColor": "#4e5d6c",
    "accentColor": "#e30613",
    "archetype": "beaux_arts_terminus",
    "fact": "Site of Switzerland’s first railway in 1847 (the \"Spanisch-Brötli-Bahn\" to Baden), Zürich HB features Jakob Friedrich Wanner’s 1871 sandstone triumphal arch above three subterranean through-stations serving over 2,900 trains daily.",
    "facts": [
      "Site of Switzerland’s first railway in 1847 (the \"Spanisch-Brötli-Bahn\" to Baden), Zürich HB features Jakob Friedrich Wanner’s 1871 sandstone triumphal arch above three subterranean through-stations serving over 2,900 trains daily."
    ],
    "historicalSummary": "Site of Switzerland’s first railway in 1847 (the \"Spanisch-Brötli-Bahn\" to Baden), Zürich HB features Jakob Friedrich Wanner’s 1871 sandstone triumphal arch above three subterranean through-stations serving over 2,900 trains daily.",
    "metroConnection": "Connected via S2, S8, S10, T4, T10, T11",
    "svgPath": "M8 50 L8 26 L56 26 L56 50 Z M16 50 L16 34 A6 6 0 0 1 28 34 L28 50 M36 50 L36 34 A6 6 0 0 1 48 34 L48 50"
  },
  {
    "id": "monument-eth-polybahn",
    "nodeName": "Monument_eth_polybahn",
    "name": "ETH Zürich Semper Building & 1889 UBS Polybahn Funicular",
    "localName": "ETH Zürich Hauptgebäude & Polybahn",
    "year": 1864,
    "completedYear": 1864,
    "architect": "Neoclassical Acropolis Palace, Gustav Gull Cupola (1918) & Crimson Polybahn Viaduct",
    "architecturalStyle": "Neoclassical Acropolis Palace, Gustav Gull Cupola (1918) & Crimson Polybahn Viaduct",
    "lat": 47.376359,
    "lon": 8.547774,
    "x": 5.13,
    "z": -6.32,
    "baseElevationMeters": 0,
    "scale": 0.92,
    "rotationY": -1.324,
    "primaryColor": "#e6decb",
    "secondaryColor": "#52606d",
    "accentColor": "#c8102e",
    "archetype": "grand_palace_facade",
    "fact": "Designed by Gottfried Semper in 1864 atop the Zürichberg terrace (where Albert Einstein studied and taught) and linked to Central down on the Limmat by the crimson 1889 Polybahn funicular.",
    "facts": [
      "Designed by Gottfried Semper in 1864 atop the Zürichberg terrace (where Albert Einstein studied and taught) and linked to Central down on the Limmat by the crimson 1889 Polybahn funicular."
    ],
    "historicalSummary": "Designed by Gottfried Semper in 1864 atop the Zürichberg terrace (where Albert Einstein studied and taught) and linked to Central down on the Limmat by the crimson 1889 Polybahn funicular.",
    "metroConnection": "Connected via PB, T10, T4",
    "svgPath": "M8 50 L8 28 L18 20 L26 28 L38 28 L46 20 L56 28 L56 50 Z"
  },
  {
    "id": "monument-opernhaus-zurich",
    "nodeName": "Monument_opernhaus_zurich",
    "name": "Opernhaus Zürich & Sechseläutenplatz",
    "localName": "Opernhaus Zürich",
    "year": 1891,
    "completedYear": 1891,
    "architect": "Neo-Baroque White Stone Portico, Busts of Mozart & Wagner, and Copper Auditorium Roof",
    "architecturalStyle": "Neo-Baroque White Stone Portico, Busts of Mozart & Wagner, and Copper Auditorium Roof",
    "lat": 47.365138,
    "lon": 8.546813,
    "x": 4.25,
    "z": 8.9,
    "baseElevationMeters": 0,
    "scale": 0.9,
    "rotationY": 0.443,
    "primaryColor": "#f2ece1",
    "secondaryColor": "#3d7a6e",
    "accentColor": "#d4af37",
    "archetype": "beaux_arts_opera",
    "fact": "Built in just 16 months in 1890–1891 by Viennese theater architects Fellner & Helmer after the Aktientheater burned down, Opernhaus Zürich was the first opera house in Europe with electric lighting and anchors the Valser quartzite expanse of Sechseläutenplatz.",
    "facts": [
      "Built in just 16 months in 1890–1891 by Viennese theater architects Fellner & Helmer after the Aktientheater burned down, Opernhaus Zürich was the first opera house in Europe with electric lighting and anchors the Valser quartzite expanse of Sechseläutenplatz."
    ],
    "historicalSummary": "Built in just 16 months in 1890–1891 by Viennese theater architects Fellner & Helmer after the Aktientheater burned down, Opernhaus Zürich was the first opera house in Europe with electric lighting and anchors the Valser quartzite expanse of Sechseläutenplatz.",
    "metroConnection": "Connected via S2, S18, T4, T11",
    "svgPath": "M10 50 L10 30 L20 22 L44 22 L54 30 L54 50 Z M22 22 A10 10 0 0 1 42 22"
  },
  {
    "id": "monument-prime-tower",
    "nodeName": "Monument_prime_tower",
    "name": "Prime Tower & Hardbrücke Viaduct (Zürich-West)",
    "localName": "Prime Tower (Maag-Areal)",
    "year": 2011,
    "completedYear": 2011,
    "architect": "126m Faceted Blue-Green Glass Polygon Tower & Historic Brick Maag Gear Hall",
    "architecturalStyle": "126m Faceted Blue-Green Glass Polygon Tower & Historic Brick Maag Gear Hall",
    "lat": 47.3861,
    "lon": 8.5173,
    "x": -22.94,
    "z": -19.53,
    "baseElevationMeters": 0,
    "scale": 0.92,
    "rotationY": 1.373,
    "primaryColor": "#488894",
    "secondaryColor": "#2d5c66",
    "accentColor": "#e8b931",
    "archetype": "twisting_glass_tower",
    "fact": "Designed by Annette Gigon and Mike Guyer on the former Maag gear-factory grounds beside Hardbrücke station, the 126-meter octagonal-faceted Prime Tower catalyzed the transformation of industrial Kreis 5 into Zürich-West.",
    "facts": [
      "Designed by Annette Gigon and Mike Guyer on the former Maag gear-factory grounds beside Hardbrücke station, the 126-meter octagonal-faceted Prime Tower catalyzed the transformation of industrial Kreis 5 into Zürich-West."
    ],
    "historicalSummary": "Designed by Annette Gigon and Mike Guyer on the former Maag gear-factory grounds beside Hardbrücke station, the 126-meter octagonal-faceted Prime Tower catalyzed the transformation of industrial Kreis 5 into Zürich-West.",
    "metroConnection": "Connected via S8, T4",
    "svgPath": "M22 52 L18 32 L26 10 L40 14 L44 34 L38 52 Z"
  },
  {
    "id": "monument-kunsthaus-heimplatz",
    "nodeName": "Monument_kunsthaus_heimplatz",
    "name": "Kunsthaus Zürich (Moser Hall & Chipperfield Building)",
    "localName": "Kunsthaus Zürich am Heimplatz",
    "year": 2021,
    "completedYear": 2021,
    "architect": "Jura Limestone Fluted Facade, Brass Fins & Underground Art Passage across Heimplatz",
    "architecturalStyle": "Jura Limestone Fluted Facade, Brass Fins & Underground Art Passage across Heimplatz",
    "lat": 47.3702,
    "lon": 8.5484,
    "x": 5.71,
    "z": 2.03,
    "baseElevationMeters": 0,
    "scale": 0.9,
    "rotationY": 1.003,
    "primaryColor": "#e8dfce",
    "secondaryColor": "#c9bc9c",
    "accentColor": "#c89b3c",
    "archetype": "art_deco_slab",
    "fact": "Home to Switzerland’s largest art collection (from Alberto Giacometti and Ferdinand Hodler to Dadaism, born nearby at Cabaret Voltaire in 1916), uniting Karl Moser’s 1910 Villa with David Chipperfield’s 2021 Jura-limestone wing.",
    "facts": [
      "Home to Switzerland’s largest art collection (from Alberto Giacometti and Ferdinand Hodler to Dadaism, born nearby at Cabaret Voltaire in 1916), uniting Karl Moser’s 1910 Villa with David Chipperfield’s 2021 Jura-limestone wing."
    ],
    "historicalSummary": "Home to Switzerland’s largest art collection (from Alberto Giacometti and Ferdinand Hodler to Dadaism, born nearby at Cabaret Voltaire in 1916), uniting Karl Moser’s 1910 Villa with David Chipperfield’s 2021 Jura-limestone wing.",
    "metroConnection": "Connected via T4, T10, DB",
    "svgPath": "M22 52 L22 10 L42 10 L42 52 Z M16 52 L16 26 L22 26 M42 26 L48 26 L48 52"
  },
  {
    "id": "monument-uetliberg-kulm",
    "nodeName": "Monument_uetliberg_kulm",
    "name": "Uetliberg Kulm Observation Tower & Hotel Uto Kulm (870m)",
    "localName": "Uetliberg Aussichtsturm & Uto Kulm",
    "year": 1990,
    "completedYear": 1990,
    "architect": "72m Triangular Steel Lattice Lookout Tower, Panoramic Platform & 186m TV Mast",
    "architecturalStyle": "72m Triangular Steel Lattice Lookout Tower, Panoramic Platform & 186m TV Mast",
    "lat": 47.3496,
    "lon": 8.4919,
    "x": -46.33,
    "z": 29.98,
    "baseElevationMeters": 0,
    "scale": 0.95,
    "rotationY": 0.375,
    "primaryColor": "#8d99a6",
    "secondaryColor": "#e6decb",
    "accentColor": "#e30613",
    "archetype": "observation_needle",
    "fact": "Rising 464 meters above Lake Zurich at 870m elevation and reached by the electric S10 Uetlibergbahn (opened 1875), the 72m triangular steel lookout tower commands a 360° panorama from the Limmat Valley to the Bernese and Glarus Alps.",
    "facts": [
      "Rising 464 meters above Lake Zurich at 870m elevation and reached by the electric S10 Uetlibergbahn (opened 1875), the 72m triangular steel lookout tower commands a 360° panorama from the Limmat Valley to the Bernese and Glarus Alps."
    ],
    "historicalSummary": "Rising 464 meters above Lake Zurich at 870m elevation and reached by the electric S10 Uetlibergbahn (opened 1875), the 72m triangular steel lookout tower commands a 360° panorama from the Limmat Valley to the Bernese and Glarus Alps.",
    "metroConnection": "Connected via S10",
    "svgPath": "M28 54 L30 24 L24 20 L24 16 L40 16 L40 20 L34 24 L36 54 M32 16 L32 6"
  }
];

export const ZURICH_MILESTONES: CityHistoricalMilestone[] = [
  {
    "year": 1847,
    "title": "Spanisch-Brötli-Bahn (First Swiss Railway)",
    "description": "On August 7, 1847, the Swiss Northern Railway opens between Zürich and Baden, earning its nickname from the flaky pastries brought warm to Zurich every morning.",
    "category": "metro"
  },
  {
    "year": 1864,
    "title": "ETH Zürich Semper Building & Bahnhofstrasse",
    "description": "Gottfried Semper completes the monumental ETH Hauptgebäude while Zurich fills in its medieval Fröschengraben moat to create Bahnhofstrasse.",
    "category": "architecture"
  },
  {
    "year": 1875,
    "title": "Uetlibergbahn (Line S10) Climbs to 870m",
    "description": "Built by tunnel engineer Louis Favre with a 7.9% adhesion gradient, the Uetlibergbahn opens from Selnau up to Uetliberg Kulm.",
    "category": "metro"
  },
  {
    "year": 1882,
    "title": "Zürcher Strassenbahn (First Tramway)",
    "description": "Zurich’s first horse-drawn tramway opens from Tiefenbrunnen through Bellevue and Paradeplatz to Central, followed by electric trams in 1894.",
    "category": "metro"
  },
  {
    "year": 1889,
    "title": "Polybahn (1889) & Dolderbahn (1895)",
    "description": "The UBS Polybahn funicular links Central with the ETH Polyterrasse in 100 seconds, followed in 1895 by the Dolderbahn up the Zürichberg.",
    "category": "metro"
  },
  {
    "year": 1973,
    "title": "1973 U-Bahn Referendum & Milchbuck Tram Tunnel",
    "description": "Voters reject a full heavy-rail U-Bahn in favor of expanding surface trams and S-Bahn tunnels; the already-excavated 2.5 km Milchbuck U-Bahn tunnel opens for trams in 1986.",
    "category": "culture"
  },
  {
    "year": 1990,
    "title": "S-Bahn Zürich & Hirschengraben Cross-City Tunnel",
    "description": "On May 27, 1990, Switzerland’s first integrated S-Bahn network launches with the underground Museumstrasse/Hirschengraben tunnel beneath Zürich HB and Calatrava’s Stadelhofen station.",
    "category": "metro"
  },
  {
    "year": 2014,
    "title": "Durchgangsbahnhof Löwenstrasse (Weinland Tunnel)",
    "description": "A second deep four-track underground cross-city station opens 16m beneath Zürich HB alongside the 5 km Weinland Tunnel to Oerlikon.",
    "category": "metro"
  }
];

export const ZURICH_ERAS: CityEraDescription[] = [
  {
    "id": "zurich_era_1",
    "name": "Roman Turicum, Carolingian Abbeys & Zwingli’s Reformation",
    "yearRange": [
      853,
      1846
    ],
    "tagline": "853–1846 • Grossmünster, Fraumünster & Guild Republic",
    "summary": "From the Roman customs post on Lindenhof hill to the twin-towered Grossmünster and Fraumünster Abbey along the Limmat."
  },
  {
    "id": "zurich_era_2",
    "name": "Escher’s Railway Metropolis & Semper’s Polytechnic",
    "yearRange": [
      1847,
      1914
    ],
    "tagline": "1847–1914 • Spanisch-Brötli-Bahn, ETH, Bahnhofstrasse & Electric Trams",
    "summary": "Alfred Escher establishes Zürich HB, ETH Zürich, and the Gotthard Railway financing hub while trams and mountain funiculars weave across the hills."
  },
  {
    "id": "zurich_era_3",
    "name": "Dadaism, Swiss International Style & The U-Bahn Debate",
    "yearRange": [
      1916,
      1989
    ],
    "tagline": "1916–1989 • Cabaret Voltaire, Swiss Grid Typography & Transit Referendums",
    "summary": "Zurich gives birth to Dadaism (1916) and Josef Müller-Brockmann’s Swiss Typographic Grid while citizens champion dense tram priority over highways."
  },
  {
    "id": "zurich_era_4",
    "name": "S-Bahn Cross-City Tunnels & Zürich-West Skyscrapers",
    "yearRange": [
      1990,
      2026
    ],
    "tagline": "1990–2026 • ZVV S-Bahn, Calatrava Stadelhofen, Prime Tower & Chipperfield Kunsthaus",
    "summary": "Two deep cross-city rail tunnels turn Zürich HB into a subterranean metro-scale hub while former industrial districts blossom into Zürich-West."
  }
];

export const ZURICH_TOUR_STOPS: CityTourStop[] = [
  {
    "id": "tour-zrh-hb-escher",
    "title": "Zürich Hauptbahnhof: From 1847 Pastry Train to Three Underground Levels",
    "year": 1990,
    "lat": 47.3782,
    "lon": 8.5402,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "After voters rejected a heavy U-Bahn in 1973, Zurich pioneered the 1990 S-Bahn model—boring the Museumstrasse (1990), SZU (1990), and Löwenstrasse (2014) underground halls directly beneath Jakob Friedrich Wanner’s 1871 sandstone station.",
    "highlightMonumentId": "monument-zurich-hb",
    "highlightStationName": "zurich-hb",
    "x": -1.84,
    "z": -8.82
  },
  {
    "id": "tour-zrh-eth-polybahn",
    "title": "100 Seconds to Einstein’s Alma Mater: The 1889 Polybahn & Semper’s ETH",
    "year": 1905,
    "lat": 47.3763,
    "lon": 8.5476,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Departing from inside a historic house facade at Central, the crimson Polybahn funicular climbs 41 vertical meters at a 26% gradient in 100 seconds to the Polyterrasse—where Albert Einstein studied physics at ETH (1896–1900).",
    "highlightMonumentId": "monument-eth-polybahn",
    "highlightStationName": "eth-polyterrasse",
    "x": 4.97,
    "z": -6.24
  },
  {
    "id": "tour-zrh-limmat-abbeys",
    "title": "Across the Münsterbrücke: Grossmünster, Fraumünster & Europe’s Largest Clock",
    "year": 1970,
    "lat": 47.3701,
    "lon": 8.5441,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Every Sechseläuten and medieval procession linked the two Carolingian foundations across the Limmat; today Marc Chagall’s 1970 stained-glass choir windows in Fraumünster face Sigmar Polke’s agate windows inside Grossmünster.",
    "highlightMonumentId": "monument-grossmuenster",
    "highlightStationName": "helmhaus",
    "x": 1.75,
    "z": 2.17
  },
  {
    "id": "tour-zrh-opernhaus-calatrava",
    "title": "Bellevue, Opernhaus Zürich & Calatrava’s Sculpted Stadelhofen Station",
    "year": 1991,
    "lat": 47.3653,
    "lon": 8.5469,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Where Fellner & Helmer’s 1891 Opernhaus anchors Sechseläutenplatz with Viennese elegance, Santiago Calatrava’s neighboring Stadelhofen Station curves along the ancient city fortification moat like a livingribbed skeleton.",
    "highlightMonumentId": "monument-opernhaus-zurich",
    "highlightStationName": "bellevue",
    "x": 4.33,
    "z": 8.68
  },
  {
    "id": "tour-zrh-kunsthaus-dolder",
    "title": "Heimplatz to Zürichberg: Kunsthaus Zürich & the 1895 Dolderbahn",
    "year": 2021,
    "lat": 47.3702,
    "lon": 8.5484,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Connected via an underground art passage beneath Heimplatz, Chipperfield’s Jura-limestone pavilion creates a civic portal to the Zürichberg—just below the 1895 Dolderbahn rack railway.",
    "highlightMonumentId": "monument-kunsthaus-heimplatz",
    "highlightStationName": "romerhof",
    "x": 5.71,
    "z": 2.03
  },
  {
    "id": "tour-zrh-prime-uetliberg",
    "title": "From the 126m Prime Tower in Zürich-West to the 870m Uetliberg Summit",
    "year": 2012,
    "lat": 47.3496,
    "lon": 8.4919,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "By clustering high-rises like the 126m Prime Tower along the rail tracks of Zürich-West while running electric S10 trains every 20 minutes up to car-free Uetliberg (870m), Zurich keeps forest ridges within 20 minutes of the city center.",
    "highlightMonumentId": "monument-uetliberg-kulm",
    "highlightStationName": "uetliberg",
    "x": -46.33,
    "z": 29.98
  }
];
