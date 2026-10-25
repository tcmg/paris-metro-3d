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

export const SAN_FRANCISCO_MONUMENTS_GLB_PATH = '/models/san-francisco_monuments.glb';

export const SAN_FRANCISCO_MONUMENTS: CityMonument[] = [
  {
    "id": "monument-golden-gate-bridge",
    "nodeName": "Monument_golden_gate_bridge",
    "name": "Golden Gate Bridge",
    "localName": "Golden Gate Bridge",
    "year": 1937,
    "completedYear": 1937,
    "architect": "1,280m Art Deco Stepped-Tower Suspension Bridge in International Orange (Joseph Strauss, Charles Ellis & Irving Morrow, 1937)",
    "architecturalStyle": "1,280m Art Deco Stepped-Tower Suspension Bridge in International Orange (Joseph Strauss, Charles Ellis & Irving Morrow, 1937)",
    "lat": 37.8185,
    "lon": -122.47835,
    "x": -67.58,
    "z": -35.8,
    "baseElevationMeters": 0,
    "scale": 2.15,
    "rotationY": 1.671,
    "primaryColor": "#f04a24",
    "secondaryColor": "#d9ccb8",
    "accentColor": "#ffbe4f",
    "archetype": "gothic_suspension_bridge",
    "fact": "Opened on May 27, 1937 across the mile-wide tidal strait where San Francisco Bay meets the Pacific Ocean; architect Irving Morrow championed its signature International Orange finish and Art Deco stepped tower setbacks.",
    "facts": [
      "Opened on May 27, 1937 across the mile-wide tidal strait where San Francisco Bay meets the Pacific Ocean; architect Irving Morrow championed its signature International Orange finish and Art Deco stepped tower setbacks."
    ],
    "historicalSummary": "Opened on May 27, 1937 across the mile-wide tidal strait where San Francisco Bay meets the Pacific Ocean; architect Irving Morrow championed its signature International Orange finish and Art Deco stepped tower setbacks.",
    "metroConnection": "Connected via CC-PH, F",
    "svgPath": "M16 50 L16 18 L24 18 L24 50 M40 50 L40 18 L48 18 L48 50 M6 40 Q20 22 32 38 Q44 22 58 40"
  },
  {
    "id": "monument-transamerica-pyramid",
    "nodeName": "Monument_transamerica_pyramid",
    "name": "Transamerica Pyramid",
    "localName": "Transamerica Pyramid",
    "year": 1972,
    "completedYear": 1972,
    "architect": "260m White Quartz Precast Concrete Four-Sided Pyramid, Elevator Wings & Glass Beacon Crown (William Pereira, 1972)",
    "architecturalStyle": "260m White Quartz Precast Concrete Four-Sided Pyramid, Elevator Wings & Glass Beacon Crown (William Pereira, 1972)",
    "lat": 37.795176,
    "lon": -122.402688,
    "x": 7.01,
    "z": -6.81,
    "baseElevationMeters": 0,
    "scale": 0.82,
    "rotationY": 0.153,
    "primaryColor": "#f2efe9",
    "secondaryColor": "#9eb4c4",
    "accentColor": "#ffd166",
    "archetype": "shard_glass_pyramid",
    "fact": "Designed by William Pereira on the historic site of the 1853 Montgomery Block so its tapered pyramidal silhouette would let sunlight reach Columbus Avenue and Redwood Park below.",
    "facts": [
      "Designed by William Pereira on the historic site of the 1853 Montgomery Block so its tapered pyramidal silhouette would let sunlight reach Columbus Avenue and Redwood Park below."
    ],
    "historicalSummary": "Designed by William Pereira on the historic site of the 1853 Montgomery Block so its tapered pyramidal silhouette would let sunlight reach Columbus Avenue and Redwood Park below.",
    "metroConnection": "Connected via BART-Y, BART-B, CC-CA, T",
    "svgPath": "M22 52 L31 6 L34 10 L42 52 Z"
  },
  {
    "id": "monument-coit-tower",
    "nodeName": "Monument_coit_tower",
    "name": "Coit Tower (Telegraph Hill)",
    "localName": "Coit Tower (Telegraph Hill)",
    "year": 1933,
    "completedYear": 1933,
    "architect": "64m Fluted White Concrete Art Deco Belvedere Column & WPA Fresco Rotunda (Arthur Brown Jr., 1933)",
    "architecturalStyle": "64m Fluted White Concrete Art Deco Belvedere Column & WPA Fresco Rotunda (Arthur Brown Jr., 1933)",
    "lat": 37.8024,
    "lon": -122.4058,
    "x": 3.94,
    "z": -15.79,
    "baseElevationMeters": 0,
    "scale": 0.78,
    "rotationY": 0.138,
    "primaryColor": "#f5f2eb",
    "secondaryColor": "#c8bfb0",
    "accentColor": "#e09f3e",
    "archetype": "observation_needle",
    "fact": "Funded by eccentric bequest from Lillie Hitchcock Coit—patroness of San Francisco’s volunteer firefighters—and designed by City Hall architect Arthur Brown Jr. in 1933 with 27 New Deal frescoes painted inside its base.",
    "facts": [
      "Funded by eccentric bequest from Lillie Hitchcock Coit—patroness of San Francisco’s volunteer firefighters—and designed by City Hall architect Arthur Brown Jr. in 1933 with 27 New Deal frescoes painted inside its base."
    ],
    "historicalSummary": "Funded by eccentric bequest from Lillie Hitchcock Coit—patroness of San Francisco’s volunteer firefighters—and designed by City Hall architect Arthur Brown Jr. in 1933 with 27 New Deal frescoes painted inside its base.",
    "metroConnection": "Connected via F, T",
    "svgPath": "M28 54 L30 24 L24 20 L24 16 L40 16 L40 20 L34 24 L36 54 M32 16 L32 6"
  },
  {
    "id": "monument-ferry-building",
    "nodeName": "Monument_ferry_building",
    "name": "San Francisco Ferry Building & Clock Tower",
    "localName": "San Francisco Ferry Building & Clock Tower",
    "year": 1898,
    "completedYear": 1898,
    "architect": "201m Beaux-Arts Colusa Sandstone Nave & 75m Seville Giralda Clock Tower (A. Page Brown, 1898)",
    "architecturalStyle": "201m Beaux-Arts Colusa Sandstone Nave & 75m Seville Giralda Clock Tower (A. Page Brown, 1898)",
    "lat": 37.795508,
    "lon": -122.393467,
    "x": 16.1,
    "z": -7.22,
    "baseElevationMeters": 0,
    "scale": 0.8,
    "rotationY": -0.933,
    "primaryColor": "#dcd4c6",
    "secondaryColor": "#6e7b85",
    "accentColor": "#f04a24",
    "archetype": "clock_tower_terminus",
    "fact": "Standing at the foot of Market Street since 1898, A. Page Brown’s 75-meter clock tower survived both the 1906 earthquake and the 1989 Loma Prieta earthquake—after which the elevated Embarcadero Freeway was torn down to restore its grand plaza.",
    "facts": [
      "Standing at the foot of Market Street since 1898, A. Page Brown’s 75-meter clock tower survived both the 1906 earthquake and the 1989 Loma Prieta earthquake—after which the elevated Embarcadero Freeway was torn down to restore its grand plaza."
    ],
    "historicalSummary": "Standing at the foot of Market Street since 1898, A. Page Brown’s 75-meter clock tower survived both the 1906 earthquake and the 1989 Loma Prieta earthquake—after which the elevated Embarcadero Freeway was torn down to restore its grand plaza.",
    "metroConnection": "Connected via BART-Y, BART-B, J, K, N, F, CC-CA",
    "svgPath": "M12 52 L52 52 L52 38 L38 38 L38 10 L32 6 L26 10 L26 38 L12 38 Z"
  },
  {
    "id": "monument-palace-of-fine-arts",
    "nodeName": "Monument_palace_of_fine_arts",
    "name": "Palace of Fine Arts Rotunda",
    "localName": "Palace of Fine Arts Rotunda",
    "year": 1915,
    "completedYear": 1915,
    "architect": "Beaux-Arts Classical Rotunda Dome, Corinthian Peristyle & Lagoon (Bernard Maybeck, 1915 / Rebuilt in Concrete 1965)",
    "architecturalStyle": "Beaux-Arts Classical Rotunda Dome, Corinthian Peristyle & Lagoon (Bernard Maybeck, 1915 / Rebuilt in Concrete 1965)",
    "lat": 37.8029,
    "lon": -122.4484,
    "x": -38.04,
    "z": -16.41,
    "baseElevationMeters": 0,
    "scale": 0.78,
    "rotationY": 1.608,
    "primaryColor": "#e6c8a8",
    "secondaryColor": "#c97b52",
    "accentColor": "#489fb5",
    "archetype": "baroque_dome_cathedral",
    "fact": "Created by architect Bernard Maybeck for the 1915 Panama-Pacific International Exposition celebrating San Francisco’s rebirth after the 1906 earthquake and fire, evoking a romantic Roman ruin reflected in a tranquil swan lagoon.",
    "facts": [
      "Created by architect Bernard Maybeck for the 1915 Panama-Pacific International Exposition celebrating San Francisco’s rebirth after the 1906 earthquake and fire, evoking a romantic Roman ruin reflected in a tranquil swan lagoon."
    ],
    "historicalSummary": "Created by architect Bernard Maybeck for the 1915 Panama-Pacific International Exposition celebrating San Francisco’s rebirth after the 1906 earthquake and fire, evoking a romantic Roman ruin reflected in a tranquil swan lagoon.",
    "metroConnection": "Connected via F, CC-PH",
    "svgPath": "M12 50 L12 34 L52 34 L52 50 Z M20 34 A12 14 0 0 1 44 34 M32 20 L32 10"
  },
  {
    "id": "monument-salesforce-tower",
    "nodeName": "Monument_salesforce_tower",
    "name": "Salesforce Tower & Transit Center",
    "localName": "Salesforce Tower & Transit Center",
    "year": 2018,
    "completedYear": 2018,
    "architect": "326.5m Tapered Glass & Brushed-Aluminum Obelisk Skyscraper & Rooftop Gondola Park (César Pelli, 2018)",
    "architecturalStyle": "326.5m Tapered Glass & Brushed-Aluminum Obelisk Skyscraper & Rooftop Gondola Park (César Pelli, 2018)",
    "lat": 37.789748,
    "lon": -122.397028,
    "x": 12.59,
    "z": -0.06,
    "baseElevationMeters": 0,
    "scale": 0.84,
    "rotationY": -0.808,
    "primaryColor": "#a8cbe0",
    "secondaryColor": "#e8eef2",
    "accentColor": "#38b6ff",
    "archetype": "one_wtc_and_oculus",
    "fact": "San Francisco’s tallest skyscraper (1,070 ft), anchored by 42 foundation piles driven 310 feet into Franciscan bedrock beside the four-block rooftop botanical park of the Salesforce Transit Center.",
    "facts": [
      "San Francisco’s tallest skyscraper (1,070 ft), anchored by 42 foundation piles driven 310 feet into Franciscan bedrock beside the four-block rooftop botanical park of the Salesforce Transit Center."
    ],
    "historicalSummary": "San Francisco’s tallest skyscraper (1,070 ft), anchored by 42 foundation piles driven 310 feet into Franciscan bedrock beside the four-block rooftop botanical park of the Salesforce Transit Center.",
    "metroConnection": "Connected via BART-Y, BART-B, J, K, N, T",
    "svgPath": "M16 52 L20 12 L24 4 L28 12 L32 52 M36 50 Q46 34 58 42 L48 50 Z"
  },
  {
    "id": "monument-painted-ladies",
    "nodeName": "Monument_painted_ladies",
    "name": "The Painted Ladies of Alamo Square (\"Postcard Row\")",
    "localName": "The Painted Ladies of Alamo Square (\"Postcard Row\")",
    "year": 1892,
    "completedYear": 1892,
    "architect": "Six Queen Anne Victorian Rowhouses with Polychrome Gingerbread Gables & Bay Windows (Matthew Kavanaugh, 1892–1896)",
    "architecturalStyle": "Six Queen Anne Victorian Rowhouses with Polychrome Gingerbread Gables & Bay Windows (Matthew Kavanaugh, 1892–1896)",
    "lat": 37.7762,
    "lon": -122.4328,
    "x": -22.67,
    "z": 16.78,
    "baseElevationMeters": 0,
    "scale": 0.78,
    "rotationY": -1.398,
    "primaryColor": "#f4d35e",
    "secondaryColor": "#5fa8d3",
    "accentColor": "#e07a5f",
    "archetype": "grand_palace_facade",
    "fact": "Built between 1892 and 1896 by developer Matthew Kavanaugh at 710–720 Steiner Street, these six Queen Anne Victorians survived the 1906 fire because the dynamite firebreak stopped at Van Ness Avenue.",
    "facts": [
      "Built between 1892 and 1896 by developer Matthew Kavanaugh at 710–720 Steiner Street, these six Queen Anne Victorians survived the 1906 fire because the dynamite firebreak stopped at Van Ness Avenue."
    ],
    "historicalSummary": "Built between 1892 and 1896 by developer Matthew Kavanaugh at 710–720 Steiner Street, these six Queen Anne Victorians survived the 1906 fire because the dynamite firebreak stopped at Van Ness Avenue.",
    "metroConnection": "Connected via J, N",
    "svgPath": "M8 50 L8 28 L18 20 L26 28 L38 28 L46 20 L56 28 L56 50 Z"
  },
  {
    "id": "monument-alcatraz-island",
    "nodeName": "Monument_alcatraz_island",
    "name": "Alcatraz Island Lighthouse & Cellhouse (\"The Rock\")",
    "localName": "Alcatraz Island Lighthouse & Cellhouse (\"The Rock\")",
    "year": 1909,
    "completedYear": 1909,
    "architect": "Sandstone Bay Island, 1909 Octagonal Concrete Lighthouse, Water Tower & 1912 Federal Cellhouse",
    "architecturalStyle": "Sandstone Bay Island, 1909 Octagonal Concrete Lighthouse, Water Tower & 1912 Federal Cellhouse",
    "lat": 37.826668,
    "lon": -122.423097,
    "x": -13.11,
    "z": -45.96,
    "baseElevationMeters": 0,
    "scale": 0.8,
    "rotationY": -0.807,
    "primaryColor": "#d9d0be",
    "secondaryColor": "#8c6d53",
    "accentColor": "#f04a24",
    "archetype": "norman_four_turret_keep",
    "fact": "Home to the West Coast’s first lighthouse (1854, rebuilt 1909 after the 1906 earthquake), a Civil War fortress, the 1934–1963 Federal Penitentiary, and the historic 1969–1971 Occupation by the Indians of All Tribes.",
    "facts": [
      "Home to the West Coast’s first lighthouse (1854, rebuilt 1909 after the 1906 earthquake), a Civil War fortress, the 1934–1963 Federal Penitentiary, and the historic 1969–1971 Occupation by the Indians of All Tribes."
    ],
    "historicalSummary": "Home to the West Coast’s first lighthouse (1854, rebuilt 1909 after the 1906 earthquake), a Civil War fortress, the 1934–1963 Federal Penitentiary, and the historic 1969–1971 Occupation by the Indians of All Tribes.",
    "metroConnection": "Connected via F, CC-PH",
    "svgPath": "M14 50 L14 16 L20 16 L20 24 L44 24 L44 16 L50 16 L50 50 Z"
  }
];

export const SAN_FRANCISCO_MILESTONES: CityHistoricalMilestone[] = [
  {
    "year": 1873,
    "title": "1873",
    "description": "Aug 2, 1873: Andrew Smith Hallidie tests the world’s first grip cable car up steep Clay Street Hill",
    "category": "metro"
  },
  {
    "year": 1898,
    "title": "1898",
    "description": "July 13, 1898: Opening of A. Page Brown’s Beaux-Arts San Francisco Ferry Building & Clock Tower",
    "category": "metro"
  },
  {
    "year": 1906,
    "title": "1906",
    "description": "April 18, 1906: Great San Francisco Earthquake & Fire; Ferry Building & Alamo Square survive",
    "category": "metro"
  },
  {
    "year": 1912,
    "title": "1912",
    "description": "Dec 28, 1912: San Francisco Municipal Railway (Muni) launches as America’s first publicly owned transit system",
    "category": "metro"
  },
  {
    "year": 1915,
    "title": "1915",
    "description": "Feb 20, 1915: Panama-Pacific International Exposition & Bernard Maybeck’s Palace of Fine Arts open",
    "category": "metro"
  },
  {
    "year": 1918,
    "title": "1918",
    "description": "Feb 3, 1918: Opening of the 3.6 km Twin Peaks Tunnel for Muni K, L, and M streetcars",
    "category": "metro"
  },
  {
    "year": 1937,
    "title": "1937",
    "description": "1936–1937: Bay Bridge (Nov 1936) & Golden Gate Bridge (May 27, 1937) span San Francisco Bay",
    "category": "metro"
  },
  {
    "year": 1973,
    "title": "1973",
    "description": "Nov 1973 – Sept 1974: BART Market Street Subway & underwater Transbay Tube open beneath the Bay",
    "category": "metro"
  },
  {
    "year": 1989,
    "title": "1989",
    "description": "Oct 17, 1989: Loma Prieta Earthquake leads to removal of the Embarcadero Freeway & F-Line revival",
    "category": "metro"
  },
  {
    "year": 2018,
    "title": "2018",
    "description": "Aug 2018: Completion of César Pelli’s 326m Salesforce Tower & Rooftop Transit Center Park",
    "category": "metro"
  },
  {
    "year": 2026,
    "title": "2026",
    "description": "2022–2026: Muni T-Third Central Subway to Chinatown & Caltrain 100% Electric Peninsula Corridor",
    "category": "metro"
  }
];

export const SAN_FRANCISCO_ERAS: CityEraDescription[] = [
  {
    "id": "san-francisco_era_1",
    "name": "Conquering the Hills: Hallidie’s Cable Cars & the Ferry Building",
    "yearRange": [
      1873,
      1906
    ],
    "tagline": "CABLE CARS, VICTORIANS & 1906 QUAKE • 1873–1906",
    "summary": "On the ancestral peninsula of the Ramaytush Ohlone people (Yelamu), Gold Rush San Francisco conquered its 21% grades in August 1873 when Andrew Smith Hallidie invented the wire-rope cable car, crowned its waterfront with the 1898 Ferry Building, and rose from the ashes of the April 18, 1906 earthquake and fire."
  },
  {
    "id": "san-francisco_era_2",
    "name": "Twin Peaks Tunnel, Coit Tower & the Golden Gate Bridge",
    "yearRange": [
      1907,
      1938
    ],
    "tagline": "MUNI TUNNELS & GREAT BAY BRIDGES • 1907–1938",
    "summary": "San Francisco founded America’s first municipal railway (Muni) in 1912, bored the 3.6 km Twin Peaks Tunnel in 1918 and Sunset Tunnel in 1928, and during the Great Depression erected Coit Tower (1933), the Bay Bridge (1936), and the Golden Gate Bridge (1937)."
  },
  {
    "id": "san-francisco_era_3",
    "name": "Double-Deck Market Street Subway & the Transbay Tube",
    "yearRange": [
      1939,
      1995
    ],
    "tagline": "TRANSAMERICA, BART & FREEWAY REVOLT • 1939–1995",
    "summary": "In 1972–1974, as the Transamerica Pyramid pierced the Financial District skyline, BART and Muni built a double-deck subway beneath Market Street and sank the 5.8 km seismically flexible Transbay Tube across the floor of San Francisco Bay."
  },
  {
    "id": "san-francisco_era_4",
    "name": "Salesforce Tower, Chinatown Central Subway & Electric Caltrain",
    "yearRange": [
      1996,
      2026
    ],
    "tagline": "TRANSBAY, CENTRAL SUBWAY & ELECTRIC RAIL • 1996–2026",
    "summary": "In the 21st century, San Francisco extended Muni Metro down Third Street to Mission Bay (2007), bored the deep T-Third Central Subway beneath Union Square to Chinatown Rose Pak Station (2022), and electrified the historic 1863 Caltrain corridor (2024)."
  }
];

export const SAN_FRANCISCO_TOUR_STOPS: CityTourStop[] = [
  {
    "id": "tour-sf-golden-gate-1937",
    "title": "The Golden Gate Bridge (1937): Art Deco Steel in the Pacific Fog",
    "year": 1937,
    "lat": 37.8199,
    "lon": -122.4783,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "When steel arrived from Pennsylvania coated in a red-lead primer, consulting architect Irving Morrow saw how brilliantly the warm vermilion-orange glowed against the Pacific fog and Marin hills—convincing the board to reject the Navy’s yellow-and-black stripes in favor of International Orange.",
    "highlightMonumentId": "monument-golden-gate-bridge",
    "highlightStationName": "hyde-beach",
    "x": -67.51,
    "z": -37.54
  },
  {
    "id": "tour-sf-cable-cars-1873-nob-hill",
    "title": "1873–1888: Andrew Hallidie & the World’s Last Manual Cable Cars",
    "year": 1900,
    "lat": 37.7946,
    "lon": -122.4116,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Beneath the street slots run continuous loops of 1.25-inch steel wire rope moving at a constant 9.5 mph (15.3 km/h), pulled by giant electric winding sheaves inside the Washington & Mason Powerhouse; the gripman pulls a long lever like a pair of pliers to clamp onto the moving cable.",
    "highlightMonumentId": "monument-coit-tower",
    "highlightStationName": "cable-car-museum",
    "x": -1.77,
    "z": -6.09
  },
  {
    "id": "tour-sf-ferry-building-1906-1989",
    "title": "The 1898 Ferry Building: Surviving Two Great Earthquakes",
    "year": 1906,
    "lat": 37.7955,
    "lon": -122.3937,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Before the Golden Gate and Bay Bridges opened in 1936–1937, 50,000 commuters a day passed through the Ferry Building. Cut off from the city in the 1950s by the double-deck Embarcadero Freeway, the terminal was liberated after the 1989 earthquake damaged the freeway and citizens voted to tear it down for a palm-lined boulevard and vintage F-Line streetcars.",
    "highlightMonumentId": "monument-ferry-building",
    "highlightStationName": "embarcadero",
    "x": 15.87,
    "z": -7.21
  },
  {
    "id": "tour-sf-painted-ladies-1915-expo",
    "title": "Victorian Painted Ladies & the 1915 Panama-Pacific Exposition",
    "year": 1915,
    "lat": 37.7762,
    "lon": -122.4328,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "During the three-day inferno following the April 18, 1906 earthquake, firefighters and soldiers created a last-ditch firebreak along wide Van Ness Avenue—sparing the 1892–1896 Queen Anne Victorians of Alamo Square and the Western Addition.",
    "highlightMonumentId": "monument-painted-ladies",
    "highlightStationName": "duboce-park",
    "x": -22.67,
    "z": 16.78
  },
  {
    "id": "tour-sf-transamerica-bart-tube",
    "title": "Transamerica Pyramid (1972) & BART’s Underwater Transbay Tube (1974)",
    "year": 1974,
    "lat": 37.7952,
    "lon": -122.4028,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Instead of boring through rock, engineers fabricated 57 mammoth binocular-shaped steel-and-concrete tube sections in shipyards, floated them onto the Bay, sank them into a dredged trench 135 feet underwater, and connected them to the Embarcadero with sliding seismic ball joints that survived the 1989 earthquake without a leak.",
    "highlightMonumentId": "monument-transamerica-pyramid",
    "highlightStationName": "montgomery",
    "x": 6.9,
    "z": -6.84
  },
  {
    "id": "tour-sf-alcatraz-salesforce-2022",
    "title": "From Alcatraz Island to Salesforce Tower & the Chinatown Subway",
    "year": 2022,
    "lat": 37.7897,
    "lon": -122.3972,
    "cameraOffset": [
      240,
      180,
      260
    ],
    "narrative": "Crowned by César Pelli’s 326m Salesforce Tower and a 5.4-acre rooftop park atop the new Transbay Transit Center, downtown San Francisco is now linked by the deep-bored T-Third Central Subway directly beneath Market Street to Chinatown Rose Pak Station and electrified Caltrain at 4th & King.",
    "highlightMonumentId": "monument-salesforce-tower",
    "highlightStationName": "chinatown-rose-pak",
    "x": 12.42,
    "z": 0
  }
];
