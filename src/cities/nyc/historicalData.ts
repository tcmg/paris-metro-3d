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

export const NYC_MONUMENTS_GLB_PATH = '/models/nyc_monuments.glb';

export const NYC_MONUMENTS: CityMonument[] = [
  {
    "id": "monument-empire-state",
    "nodeName": "Monument_empire_state",
    "name": "Empire State Building",
    "localName": "Empire State Building",
    "year": 1931,
    "completedYear": 1931,
    "architect": "102-Story Indiana Limestone Art Deco Setback Skyscraper & Mooring Mast (Shreve, Lamb & Harmon, 1931)",
    "architecturalStyle": "102-Story Indiana Limestone Art Deco Setback Skyscraper & Mooring Mast (Shreve, Lamb & Harmon, 1931)",
    "lat": 40.748479,
    "lon": -73.985874,
    "x": 1.83,
    "z": -7.34,
    "baseElevationMeters": 0,
    "scale": 0.85,
    "rotationY": -0.502,
    "primaryColor": "#dcd5c6",
    "secondaryColor": "#8a99ad",
    "accentColor": "#e5b842",
    "archetype": "empire_state_tower",
    "fact": "Erected in an astonishing 410 days between 1930 and May 1, 1931 above 34th Street–Herald Square and Penn Station, reigning for 40 years as the tallest building on Earth.",
    "facts": [
      "Erected in an astonishing 410 days between 1930 and May 1, 1931 above 34th Street–Herald Square and Penn Station, reigning for 40 years as the tallest building on Earth."
    ],
    "historicalSummary": "Erected in an astonishing 410 days between 1930 and May 1, 1931 above 34th Street–Herald Square and Penn Station, reigning for 40 years as the tallest building on Earth.",
    "metroConnection": "Connected via 123, BDFM, NQRW",
    "svgPath": "M18 52 L18 40 L24 40 L24 20 L28 20 L28 12 L32 4 L36 12 L36 20 L40 20 L40 40 L46 40 L46 52 Z"
  },
  {
    "id": "monument-chrysler-building",
    "nodeName": "Monument_chrysler_building",
    "name": "Chrysler Building",
    "localName": "Chrysler Building",
    "year": 1930,
    "completedYear": 1930,
    "architect": "Terraced Nirosta Stainless-Steel Sunburst Crown & Eagle Gargoyles (William Van Alen, 1930)",
    "architecturalStyle": "Terraced Nirosta Stainless-Steel Sunburst Crown & Eagle Gargoyles (William Van Alen, 1930)",
    "lat": 40.751547,
    "lon": -73.97536,
    "x": 10.87,
    "z": -10.81,
    "baseElevationMeters": 0,
    "scale": 0.82,
    "rotationY": 1.017,
    "primaryColor": "#e0e5eb",
    "secondaryColor": "#8a99ad",
    "accentColor": "#f5b82e",
    "archetype": "chrysler_sunburst_tower",
    "fact": "Crowned by seven radiating arches of Nirosta stainless steel and a secretly hoisted 56-meter vertex spire, linked directly beneath Lexington Avenue to Grand Central Terminal.",
    "facts": [
      "Crowned by seven radiating arches of Nirosta stainless steel and a secretly hoisted 56-meter vertex spire, linked directly beneath Lexington Avenue to Grand Central Terminal."
    ],
    "historicalSummary": "Crowned by seven radiating arches of Nirosta stainless steel and a secretly hoisted 56-meter vertex spire, linked directly beneath Lexington Avenue to Grand Central Terminal.",
    "metroConnection": "Connected via 456, 7, S",
    "svgPath": "M20 52 L20 36 L26 36 L26 18 L32 4 L38 18 L38 36 L44 36 L44 52 Z"
  },
  {
    "id": "monument-statue-of-liberty",
    "nodeName": "Monument_statue_of_liberty",
    "name": "Statue of Liberty (Liberty Enlightening the World)",
    "localName": "Statue of Liberty (Liberty Enlightening the World)",
    "year": 1886,
    "completedYear": 1886,
    "architect": "Copper Repoussé Colossal Statue with Internal Iron Pylon by Gustave Eiffel & Granite Star Pedestal by Richard Morris Hunt (1886)",
    "architecturalStyle": "Copper Repoussé Colossal Statue with Internal Iron Pylon by Gustave Eiffel & Granite Star Pedestal by Richard Morris Hunt (1886)",
    "lat": 40.689288,
    "lon": -74.044558,
    "x": -48.64,
    "z": 59.71,
    "baseElevationMeters": 0,
    "scale": 0.85,
    "rotationY": 1.421,
    "primaryColor": "#56b39d",
    "secondaryColor": "#8a99ad",
    "accentColor": "#ffda66",
    "archetype": "statue_of_liberty",
    "fact": "Gifted by the people of France in 1886—sculpted in Paris by Frédéric Auguste Bartholdi over an internal iron armature engineered by Gustave Eiffel three years before the Eiffel Tower.",
    "facts": [
      "Gifted by the people of France in 1886—sculpted in Paris by Frédéric Auguste Bartholdi over an internal iron armature engineered by Gustave Eiffel three years before the Eiffel Tower."
    ],
    "historicalSummary": "Gifted by the people of France in 1886—sculpted in Paris by Frédéric Auguste Bartholdi over an internal iron armature engineered by Gustave Eiffel three years before the Eiffel Tower.",
    "metroConnection": "Connected via 123, 456",
    "svgPath": "M22 54 L22 38 L42 38 L42 54 M26 38 L28 18 L24 8 L28 8 L30 16 L36 18 L38 38 Z"
  },
  {
    "id": "monument-brooklyn-bridge",
    "nodeName": "Monument_brooklyn_bridge",
    "name": "Brooklyn Bridge",
    "localName": "Brooklyn Bridge",
    "year": 1883,
    "completedYear": 1883,
    "architect": "Twin Neo-Gothic Granite Towers & Diagonal Steel-Wire Stays (John, Washington & Emily Warren Roebling, 1883)",
    "architecturalStyle": "Twin Neo-Gothic Granite Towers & Diagonal Steel-Wire Stays (John, Washington & Emily Warren Roebling, 1883)",
    "lat": 40.70575,
    "lon": -73.9968,
    "x": -7.46,
    "z": 40.95,
    "baseElevationMeters": 0,
    "scale": 0.97,
    "rotationY": -0.472,
    "primaryColor": "#c4b8a4",
    "secondaryColor": "#8a99ad",
    "accentColor": "#7a828a",
    "archetype": "gothic_suspension_bridge",
    "fact": "Inaugurated on May 24, 1883 across the East River; its Manhattan approach sits directly above the 1904 IRT City Hall loop and Brooklyn Bridge–City Hall subway hub.",
    "facts": [
      "Inaugurated on May 24, 1883 across the East River; its Manhattan approach sits directly above the 1904 IRT City Hall loop and Brooklyn Bridge–City Hall subway hub."
    ],
    "historicalSummary": "Inaugurated on May 24, 1883 across the East River; its Manhattan approach sits directly above the 1904 IRT City Hall loop and Brooklyn Bridge–City Hall subway hub.",
    "metroConnection": "Connected via 456, ACE, J",
    "svgPath": "M16 50 L16 18 L24 18 L24 50 M40 50 L40 18 L48 18 L48 50 M6 40 Q20 22 32 38 Q44 22 58 40"
  },
  {
    "id": "monument-one-world-trade",
    "nodeName": "Monument_one_world_trade",
    "name": "One World Trade Center & Oculus",
    "localName": "One World Trade Center & Oculus",
    "year": 2014,
    "completedYear": 2014,
    "architect": "1,776-Foot Antiprism Glass Tower (SOM) & Ribbed White Steel Oculus Transit Hall (Santiago Calatrava, 2014–2016)",
    "architecturalStyle": "1,776-Foot Antiprism Glass Tower (SOM) & Ribbed White Steel Oculus Transit Hall (Santiago Calatrava, 2014–2016)",
    "lat": 40.712894,
    "lon": -74.01326,
    "x": -21.73,
    "z": 32.97,
    "baseElevationMeters": 0,
    "scale": 0.86,
    "rotationY": 1.094,
    "primaryColor": "#98c9e8",
    "secondaryColor": "#8a99ad",
    "accentColor": "#ffffff",
    "archetype": "one_wtc_and_oculus",
    "fact": "Rising to a symbolic 1,776 feet (541m) beside the 9/11 Memorial pools and Santiago Calatrava’s winged white Oculus linking 11 NYC Subway lines and PATH trains under the Hudson.",
    "facts": [
      "Rising to a symbolic 1,776 feet (541m) beside the 9/11 Memorial pools and Santiago Calatrava’s winged white Oculus linking 11 NYC Subway lines and PATH trains under the Hudson."
    ],
    "historicalSummary": "Rising to a symbolic 1,776 feet (541m) beside the 9/11 Memorial pools and Santiago Calatrava’s winged white Oculus linking 11 NYC Subway lines and PATH trains under the Hudson.",
    "metroConnection": "Connected via 123, ACE, NQRW, PATH",
    "svgPath": "M16 52 L20 12 L24 4 L28 12 L32 52 M36 50 Q46 34 58 42 L48 50 Z"
  },
  {
    "id": "monument-grand-central",
    "nodeName": "Monument_grand_central",
    "name": "Grand Central Terminal",
    "localName": "Grand Central Terminal",
    "year": 1913,
    "completedYear": 1913,
    "architect": "Beaux-Arts Indiana Limestone Facade, Mercury Clock, Celestial Ceiling Concourse & Bi-Level 67-Track Vaults (Reed & Stem / Warren & Wetmore, 1913)",
    "architecturalStyle": "Beaux-Arts Indiana Limestone Facade, Mercury Clock, Celestial Ceiling Concourse & Bi-Level 67-Track Vaults (Reed & Stem / Warren & Wetmore, 1913)",
    "lat": 40.752656,
    "lon": -73.977398,
    "x": 9.12,
    "z": -12.07,
    "baseElevationMeters": 0,
    "scale": 0.8,
    "rotationY": -0.512,
    "primaryColor": "#dfd5c0",
    "secondaryColor": "#8a99ad",
    "accentColor": "#4ca896",
    "archetype": "beaux_arts_terminus",
    "fact": "Opened on February 2, 1913 over William J. Wilgus’s electrified two-level subterranean rail yard; expanded 15 stories deep in January 2023 with the Grand Central Madison LIRR caverns.",
    "facts": [
      "Opened on February 2, 1913 over William J. Wilgus’s electrified two-level subterranean rail yard; expanded 15 stories deep in January 2023 with the Grand Central Madison LIRR caverns."
    ],
    "historicalSummary": "Opened on February 2, 1913 over William J. Wilgus’s electrified two-level subterranean rail yard; expanded 15 stories deep in January 2023 with the Grand Central Madison LIRR caverns.",
    "metroConnection": "Connected via 456, 7, S",
    "svgPath": "M8 50 L8 26 L56 26 L56 50 Z M16 50 L16 34 A6 6 0 0 1 28 34 L28 50 M36 50 L36 34 A6 6 0 0 1 48 34 L48 50"
  },
  {
    "id": "monument-flatiron",
    "nodeName": "Monument_flatiron",
    "name": "Flatiron Building (Fuller Building)",
    "localName": "Flatiron Building (Fuller Building)",
    "year": 1902,
    "completedYear": 1902,
    "architect": "22-Story Triangular Steel-Frame Beaux-Arts Palazzo in Limestone & Terracotta (Daniel Burnham, 1902)",
    "architecturalStyle": "22-Story Triangular Steel-Frame Beaux-Arts Palazzo in Limestone & Terracotta (Daniel Burnham, 1902)",
    "lat": 40.741065,
    "lon": -73.989665,
    "x": -1.43,
    "z": 1.06,
    "baseElevationMeters": 0,
    "scale": 0.76,
    "rotationY": -0.231,
    "primaryColor": "#d9ceb8",
    "secondaryColor": "#8a99ad",
    "accentColor": "#9e8f75",
    "archetype": "flatiron_wedge",
    "fact": "Completed in 1902 at the acute triangular intersection where Broadway slices across Fifth Avenue at 23rd Street, just two years before the first IRT subway opened underneath.",
    "facts": [
      "Completed in 1902 at the acute triangular intersection where Broadway slices across Fifth Avenue at 23rd Street, just two years before the first IRT subway opened underneath."
    ],
    "historicalSummary": "Completed in 1902 at the acute triangular intersection where Broadway slices across Fifth Avenue at 23rd Street, just two years before the first IRT subway opened underneath.",
    "metroConnection": "Connected via NQRW, 456",
    "svgPath": "M16 52 L28 12 L48 22 L48 52 Z"
  },
  {
    "id": "monument-rockefeller-center",
    "nodeName": "Monument_rockefeller_center",
    "name": "30 Rockefeller Plaza (30 Rock)",
    "localName": "30 Rockefeller Plaza (30 Rock)",
    "year": 1933,
    "completedYear": 1933,
    "architect": "70-Story Limestone Slab Skyscraper & Sunken Prometheus Plaza (Raymond Hood, 1933)",
    "architecturalStyle": "70-Story Limestone Slab Skyscraper & Sunken Prometheus Plaza (Raymond Hood, 1933)",
    "lat": 40.7587,
    "lon": -73.9787,
    "x": 8,
    "z": -18.92,
    "baseElevationMeters": 0,
    "scale": 0.8,
    "rotationY": 1.062,
    "primaryColor": "#d8d2c5",
    "secondaryColor": "#8a99ad",
    "accentColor": "#f5b82e",
    "archetype": "art_deco_slab",
    "fact": "Centerpiece of Raymond Hood’s Art Deco city-within-a-city built during the Great Depression, served directly below by the 1940 IND Sixth Avenue Line.",
    "facts": [
      "Centerpiece of Raymond Hood’s Art Deco city-within-a-city built during the Great Depression, served directly below by the 1940 IND Sixth Avenue Line."
    ],
    "historicalSummary": "Centerpiece of Raymond Hood’s Art Deco city-within-a-city built during the Great Depression, served directly below by the 1940 IND Sixth Avenue Line.",
    "metroConnection": "Connected via BDFM",
    "svgPath": "M22 52 L22 10 L42 10 L42 52 Z M16 52 L16 26 L22 26 M42 26 L48 26 L48 52"
  }
];

export const NYC_MILESTONES: CityHistoricalMilestone[] = [
  {
    "year": 1883,
    "title": "1883",
    "description": "May 24, 1883: Opening of the Brooklyn Bridge & cable railway across the East River",
    "category": "metro"
  },
  {
    "year": 1904,
    "title": "1904",
    "description": "Oct 27, 1904: Inauguration of the first NYC Subway (IRT Line from City Hall to 145th Street)",
    "category": "metro"
  },
  {
    "year": 1908,
    "title": "1908",
    "description": "Jan 9, 1908: The IRT Lexington/Joralemon tube dives under the East River to Brooklyn",
    "category": "metro"
  },
  {
    "year": 1913,
    "title": "1913",
    "description": "Feb 2, 1913: Opening of the Beaux-Arts Grand Central Terminal & the Dual Contracts expansion",
    "category": "metro"
  },
  {
    "year": 1931,
    "title": "1931",
    "description": "1930–1932: Chrysler & Empire State Buildings crown Midtown as the city-owned IND 8th Ave Subway opens",
    "category": "metro"
  },
  {
    "year": 1940,
    "title": "1940",
    "description": "June 1940: Unification of the three rival networks (IRT, BMT & IND) & 6th Ave Subway opening",
    "category": "metro"
  },
  {
    "year": 1945,
    "title": "1945",
    "description": "Dec 31, 1945: Closure of the ornate Guastavino-vaulted 1904 City Hall Ghost Station",
    "category": "metro"
  },
  {
    "year": 1972,
    "title": "1972",
    "description": "Aug 1972: Massimo Vignelli’s iconic modernist NYC Subway Map & Helvetica signage system",
    "category": "metro"
  },
  {
    "year": 2017,
    "title": "2017",
    "description": "Jan 1, 2017: Opening of the Second Avenue Subway (Q Line) on the Upper East Side",
    "category": "metro"
  },
  {
    "year": 2026,
    "title": "2026",
    "description": "2026: 472-Station 24/7 NYC Subway, Oculus & Grand Central Madison",
    "category": "metro"
  }
];

export const NYC_ERAS: CityEraDescription[] = [
  {
    "id": "nyc_era_1",
    "name": "Brooklyn Bridge, Statue of Liberty & the 1904 City Hall Subway",
    "yearRange": [
      1880,
      1912
    ],
    "tagline": "GILDED AGE & THE 1904 IRT • 1880–1912",
    "summary": "After the Great Blizzard of 1888 paralyzed Manhattan’s elevated steam lines, chief engineer William Barclay Parsons built the four-track express/local Interborough Rapid Transit (IRT) subway, opening on October 27, 1904 from the Guastavino-tiled vaults of City Hall."
  },
  {
    "id": "nyc_era_2",
    "name": "Grand Central, the \"H\" System, IND & the Skyscraper Race",
    "yearRange": [
      1913,
      1939
    ],
    "tagline": "DUAL CONTRACTS & ART DECO TOWERS • 1913–1939",
    "summary": "The 1913 Dual Contracts doubled the IRT and BMT networks into the famous 1918 \"H\" system (creating the 42nd St Shuttle), while the 1930–1933 Art Deco boom raised the Chrysler, Empire State, and Rockefeller towers above the new city-owned IND subway."
  },
  {
    "id": "nyc_era_3",
    "name": "IRT–BMT–IND Unification, Chrystie Street & the Vignelli Identity",
    "yearRange": [
      1940,
      1999
    ],
    "tagline": "UNIFICATION & VIGNELLI MODERNISM • 1940–1999",
    "summary": "In June 1940, the City of New York unified the rival IRT, BMT, and IND companies into a single municipal system, later united visually by Unimark’s Massimo Vignelli and Bob Noorda with Helvetica signage and color-coded trunk bullets."
  },
  {
    "id": "nyc_era_4",
    "name": "WTC Oculus, Hudson Yards, Second Avenue & Grand Central Madison",
    "yearRange": [
      2000,
      2026
    ],
    "tagline": "21ST-CENTURY MEGACAVERNS • 2000–2026",
    "summary": "New York engineered a new generation of deep subterranean cathedrals: the 7 Line extension to Hudson Yards (2015), Calatrava’s World Trade Center Oculus (2016), the Second Avenue Subway (2017), and Grand Central Madison (2023)."
  }
];

export const NYC_TOUR_STOPS: CityTourStop[] = [
  {
    "id": "tour-nyc-1904-city-hall",
    "title": "October 27, 1904: City Hall & the Birth of the NYC Subway",
    "year": 1904,
    "lat": 40.7126,
    "lon": -74.0062,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Opened by Mayor George B. McClellan with a silver controller handle on October 27, 1904, City Hall station featured soaring Guastavino terracotta vaults, brass chandeliers, and skylights; it closed in 1945 when lengthened 10-car center-door trains could no longer safely clear its tight loop platform.",
    "highlightMonumentId": "monument-brooklyn-bridge",
    "highlightStationName": "city-hall-ghost",
    "x": -15.65,
    "z": 33.3
  },
  {
    "id": "tour-nyc-statue-of-liberty-eiffel",
    "title": "Statue of Liberty: The Paris–New York Engineering Connection",
    "year": 1905,
    "lat": 40.6892,
    "lon": -74.0445,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Three years before beginning the Eiffel Tower in Paris, Gustave Eiffel and Maurice Koechlin engineered the 29-meter wrought-iron central pylon and flexible flat-bar curtain wall inside Bartholdi’s copper Statue of Liberty so she could sway safely in New York Harbor gales.",
    "highlightMonumentId": "monument-statue-of-liberty",
    "highlightStationName": "bowling-green",
    "x": -48.59,
    "z": 59.81
  },
  {
    "id": "tour-nyc-brooklyn-bridge-roebling",
    "title": "The Roeblings & the 1883 Brooklyn Bridge",
    "year": 1904,
    "lat": 40.7061,
    "lon": -73.9969,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "After John A. Roebling died in 1869 and his son Washington Roebling was paralyzed by caisson disease (\"the bends\"), Emily Warren Roebling mastered higher mathematics and cable catenary engineering, leading construction to completion in May 1883.",
    "highlightMonumentId": "monument-brooklyn-bridge",
    "highlightStationName": "brooklyn-bridge-city-hall",
    "x": -7.65,
    "z": 40.66
  },
  {
    "id": "tour-nyc-grand-central-1913",
    "title": "Grand Central Terminal & the Electrified Subterranean City",
    "year": 1913,
    "lat": 40.7527,
    "lon": -73.9772,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Chief engineer William J. Wilgus decked over 67 tracks on two underground levels and sold the \"air rights\" above the buried rail yard—turning a smoky open steam trench into the grandest boulevard of hotels and towers in Midtown Manhattan.",
    "highlightMonumentId": "monument-grand-central",
    "highlightStationName": "grand-central-42",
    "x": 9.29,
    "z": -12.12
  },
  {
    "id": "tour-nyc-chrysler-empire-state",
    "title": "1930–1931: The Chrysler Spire vs. the Empire State Building",
    "year": 1931,
    "lat": 40.7484,
    "lon": -73.9857,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Rising at an average pace of 4.5 stories per week with structural steel delivered still warm from Pittsburgh mills, the Empire State Building was completed from excavation to opening day in just one year and 45 days.",
    "highlightMonumentId": "monument-empire-state",
    "highlightStationName": "34-st-herald-sq",
    "x": 1.98,
    "z": -7.25
  },
  {
    "id": "tour-nyc-one-wtc-oculus",
    "title": "One World Trade Center, the Oculus & Lower Manhattan Renewal",
    "year": 2018,
    "lat": 40.7127,
    "lon": -74.0134,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Designed as a \"Bird in Flight\" released from a child’s hands, the Oculus’s 108-meter operable glass roof spine is oriented so that at 10:28 AM every September 11, a single shaft of direct sunlight illuminates the center of the subterranean concourse floor.",
    "highlightMonumentId": "monument-one-world-trade",
    "highlightStationName": "wtc-cortlandt",
    "x": -21.85,
    "z": 33.19
  }
];
