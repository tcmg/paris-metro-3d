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

import type { CityMetroLine } from '../types';

export const SAN_FRANCISCO_METRO_SYSTEM_NAME = "BART TRANSBAY, MUNI METRO & HISTORIC CABLE CARS";

export const SAN_FRANCISCO_METRO_LINES: CityMetroLine[] = [
  {
    "line": "BART-Y",
    "name": "BART Yellow / Red Trunk — Transbay Tube ↔ Embarcadero ↔ Powell ↔ Mission ↔ Balboa Park",
    "color": "#ffe800",
    "textColor": "#10141c",
    "openedYear": 1973,
    "rollingStockStyle": "Bay Area Rapid Transit (Fleet of the Future)",
    "stations": [
      {
        "name": "Embarcadero",
        "lat": 37.7929,
        "lon": -122.3968,
        "x": 12.81,
        "z": -3.98,
        "year": 1976,
        "lines": [
          "BART-Y",
          "J",
          "K",
          "N"
        ],
        "fact": "Added in May 1976 inside the eastern portal of the Market Street Subway, right where trains dive 41 meters beneath San Francisco Bay.",
        "isGhost": false
      },
      {
        "name": "Montgomery St",
        "lat": 37.7894,
        "lon": -122.4013,
        "x": 8.38,
        "z": 0.37,
        "year": 1973,
        "lines": [
          "BART-Y",
          "J",
          "N"
        ],
        "fact": "Serves the \"Wall Street of the West\" and connects to the Salesforce Transit Center.",
        "isGhost": false
      },
      {
        "name": "Powell St",
        "lat": 37.7844,
        "lon": -122.4079,
        "x": 1.87,
        "z": 6.59,
        "year": 1973,
        "lines": [
          "BART-Y",
          "J",
          "K",
          "N"
        ],
        "fact": "San Francisco’s busiest subterranean transit crossroads beneath Hallidie Plaza.",
        "isGhost": false
      },
      {
        "name": "Civic Center / UN Plaza",
        "lat": 37.7797,
        "lon": -122.4141,
        "x": -4.24,
        "z": 12.43,
        "year": 1973,
        "lines": [
          "BART-Y"
        ],
        "fact": "Serves the golden-domed 1915 Beaux-Arts City Hall, War Memorial Opera House, and Asian Art Museum.",
        "isGhost": false
      },
      {
        "name": "16th St Mission",
        "lat": 37.765,
        "lon": -122.4197,
        "x": -9.76,
        "z": 30.71,
        "year": 1973,
        "lines": [
          "BART-Y"
        ],
        "fact": "Two blocks from the 1776 Mission San Francisco de Asís (Mission Dolores), the oldest intact building in the city.",
        "isGhost": false
      },
      {
        "name": "24th St Mission",
        "lat": 37.7525,
        "lon": -122.4184,
        "x": -8.48,
        "z": 46.25,
        "year": 1973,
        "lines": [
          "BART-Y"
        ],
        "fact": "Heart of the Calle 24 Latino Cultural District and Balmy Alley murals.",
        "isGhost": false
      },
      {
        "name": "Glen Park",
        "lat": 37.7331,
        "lon": -122.4338,
        "x": -23.65,
        "z": 70.37,
        "year": 1973,
        "lines": [
          "BART-Y",
          "J"
        ],
        "fact": "Celebrated architectural gem by Ernest Born, featuring raw board-formed concrete walls and natural canyon light.",
        "isGhost": false
      },
      {
        "name": "Balboa Park",
        "lat": 37.7219,
        "lon": -122.4474,
        "x": -38.92,
        "z": 88.51,
        "year": 1973,
        "lines": [
          "BART-Y"
        ],
        "fact": "Southern San Francisco transfer hub between BART and Muni Metro.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "J",
    "name": "Muni Metro J Church — Embarcadero ↔ Market St Subway ↔ Dolores Park ↔ Balboa Park",
    "color": "#e09f3e",
    "textColor": "#10141c",
    "openedYear": 1917,
    "rollingStockStyle": "San Francisco Municipal Railway (Muni Metro Siemens S200)",
    "stations": [
      {
        "name": "Embarcadero",
        "lat": 37.7929,
        "lon": -122.3968,
        "x": 12.81,
        "z": -3.98,
        "year": 1980,
        "lines": [
          "BART-Y",
          "J",
          "K",
          "N"
        ],
        "fact": "Eastern turnaround loop of the Muni Metro Market Street Subway.",
        "isGhost": false
      },
      {
        "name": "Montgomery St",
        "lat": 37.7894,
        "lon": -122.4013,
        "x": 8.38,
        "z": 0.37,
        "year": 1980,
        "lines": [
          "BART-Y",
          "J",
          "N"
        ],
        "fact": "Above the BART Transbay platforms.",
        "isGhost": false
      },
      {
        "name": "Powell St",
        "lat": 37.7844,
        "lon": -122.4079,
        "x": 1.87,
        "z": 6.59,
        "year": 1980,
        "lines": [
          "BART-Y",
          "J",
          "K",
          "N"
        ],
        "fact": "Direct transfer to Central Subway (Union Square/Market) and Powell Cable Cars.",
        "isGhost": false
      },
      {
        "name": "Civic Center",
        "lat": 37.7797,
        "lon": -122.4141,
        "x": -4.24,
        "z": 12.43,
        "year": 1980,
        "lines": [
          "J"
        ],
        "fact": "City Hall and Symphony Hall access.",
        "isGhost": false
      },
      {
        "name": "Van Ness",
        "lat": 37.7752,
        "lon": -122.4193,
        "x": -9.36,
        "z": 18.03,
        "year": 1980,
        "lines": [
          "J",
          "K",
          "N"
        ],
        "fact": "Junction where the J and N lines diverge toward Duboce Portal.",
        "isGhost": false
      },
      {
        "name": "Right-of-Way at 18th St & Dolores Park",
        "lat": 37.7614,
        "lon": -122.4285,
        "x": -18.43,
        "z": 35.18,
        "year": 1917,
        "lines": [
          "J"
        ],
        "fact": "Iconic 1917 private right-of-way climbing the western edge of Dolores Park.",
        "isGhost": false
      },
      {
        "name": "Church & 24th St (Noe Valley)",
        "lat": 37.7518,
        "lon": -122.4272,
        "x": -17.15,
        "z": 47.12,
        "year": 1917,
        "lines": [
          "J"
        ],
        "fact": "Heart of Noe Valley.",
        "isGhost": false
      },
      {
        "name": "Glen Park",
        "lat": 37.7331,
        "lon": -122.4338,
        "x": -23.65,
        "z": 70.37,
        "year": 1917,
        "lines": [
          "BART-Y",
          "J"
        ],
        "fact": "Transfers to BART.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "K",
    "name": "Muni Metro K / L / M Twin Peaks Spine — Embarcadero ↔ Castro ↔ Forest Hill ↔ West Portal",
    "color": "#569099",
    "textColor": "#ffffff",
    "openedYear": 1918,
    "rollingStockStyle": "San Francisco Municipal Railway (1918 Twin Peaks Tunnel)",
    "stations": [
      {
        "name": "Embarcadero",
        "lat": 37.7929,
        "lon": -122.3968,
        "x": 12.81,
        "z": -3.98,
        "year": 1980,
        "lines": [
          "BART-Y",
          "J",
          "K",
          "N"
        ],
        "fact": "Ferry Building gateway.",
        "isGhost": false
      },
      {
        "name": "Powell St",
        "lat": 37.7844,
        "lon": -122.4079,
        "x": 1.87,
        "z": 6.59,
        "year": 1980,
        "lines": [
          "BART-Y",
          "J",
          "K",
          "N"
        ],
        "fact": "Union Square & Cable Car hub.",
        "isGhost": false
      },
      {
        "name": "Van Ness",
        "lat": 37.7752,
        "lon": -122.4193,
        "x": -9.36,
        "z": 18.03,
        "year": 1980,
        "lines": [
          "J",
          "K",
          "N"
        ],
        "fact": "Civic Center West.",
        "isGhost": false
      },
      {
        "name": "Church Station",
        "lat": 37.7689,
        "lon": -122.4291,
        "x": -19.02,
        "z": 25.86,
        "year": 1980,
        "lines": [
          "K"
        ],
        "fact": "Beneath the historic San Francisco Mint.",
        "isGhost": false
      },
      {
        "name": "Castro Station",
        "lat": 37.7625,
        "lon": -122.4351,
        "x": -24.94,
        "z": 33.82,
        "year": 1980,
        "lines": [
          "K"
        ],
        "fact": "Where the 1980 Market Street Subway connects directly into the 1918 Twin Peaks Tunnel beneath the 1922 Castro Theatre.",
        "isGhost": false
      },
      {
        "name": "Eureka Valley (1918–1972 Ghost Station)",
        "lat": 37.7608,
        "lon": -122.4385,
        "x": -28.29,
        "z": 35.93,
        "year": 1918,
        "lines": [
          "K"
        ],
        "fact": "Opened in February 1918 just inside the eastern portal of the Twin Peaks Tunnel and closed in 1972 when nearby Castro Station was built; its concrete platforms remain visible from passing K/L/M trains.",
        "isGhost": true
      },
      {
        "name": "Forest Hill (1918 Deep Subway Station)",
        "lat": 37.748,
        "lon": -122.4591,
        "x": -48.59,
        "z": 51.84,
        "year": 1918,
        "lines": [
          "K"
        ],
        "fact": "Opened in 1918 sixty feet beneath Laguna Honda with three historic elevators and a Classical Revival surface pavilion.",
        "isGhost": false
      },
      {
        "name": "West Portal",
        "lat": 37.7408,
        "lon": -122.466,
        "x": -55.39,
        "z": 60.79,
        "year": 1918,
        "lines": [
          "K"
        ],
        "fact": "Western portal where K Ingleside, L Taraval, and M Ocean View branch out across southwestern San Francisco.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "N",
    "name": "Muni Metro N Judah — 4th & King (Caltrain) ↔ Embarcadero ↔ Sunset Tunnel ↔ Haight / Cole Valley",
    "color": "#00539b",
    "textColor": "#ffffff",
    "openedYear": 1928,
    "rollingStockStyle": "San Francisco Municipal Railway (1928 Sunset Tunnel)",
    "stations": [
      {
        "name": "4th & King (Caltrain & Oracle Park)",
        "lat": 37.7764,
        "lon": -122.3945,
        "x": 15.08,
        "z": 16.53,
        "year": 1998,
        "lines": [
          "N",
          "T"
        ],
        "fact": "Direct transfer to electrified Caltrain commuter trains and the San Francisco Giants ballpark.",
        "isGhost": false
      },
      {
        "name": "Brannan (The Embarcadero)",
        "lat": 37.7838,
        "lon": -122.3883,
        "x": 21.19,
        "z": 7.33,
        "year": 1998,
        "lines": [
          "N"
        ],
        "fact": "Passes directly beneath the monumental western suspension span of the Bay Bridge.",
        "isGhost": false
      },
      {
        "name": "Embarcadero",
        "lat": 37.7929,
        "lon": -122.3968,
        "x": 12.81,
        "z": -3.98,
        "year": 1980,
        "lines": [
          "BART-Y",
          "J",
          "K",
          "N"
        ],
        "fact": "Trains climb from the waterfront into the Market Street Subway.",
        "isGhost": false
      },
      {
        "name": "Montgomery St",
        "lat": 37.7894,
        "lon": -122.4013,
        "x": 8.38,
        "z": 0.37,
        "year": 1980,
        "lines": [
          "BART-Y",
          "J",
          "N"
        ],
        "fact": "Financial District hub.",
        "isGhost": false
      },
      {
        "name": "Powell St",
        "lat": 37.7844,
        "lon": -122.4079,
        "x": 1.87,
        "z": 6.59,
        "year": 1980,
        "lines": [
          "BART-Y",
          "J",
          "K",
          "N"
        ],
        "fact": "Connects with T-Third and BART.",
        "isGhost": false
      },
      {
        "name": "Van Ness",
        "lat": 37.7752,
        "lon": -122.4193,
        "x": -9.36,
        "z": 18.03,
        "year": 1980,
        "lines": [
          "J",
          "K",
          "N"
        ],
        "fact": "Civic Center West.",
        "isGhost": false
      },
      {
        "name": "Duboce & Church (Duboce Portal)",
        "lat": 37.7695,
        "lon": -122.4335,
        "x": -23.36,
        "z": 25.11,
        "year": 1928,
        "lines": [
          "N"
        ],
        "fact": "Southern gateway to the Lower Haight and Alamo Square’s Painted Ladies.",
        "isGhost": false
      },
      {
        "name": "Carl & Cole (Cole Valley / Haight-Ashbury)",
        "lat": 37.7658,
        "lon": -122.4501,
        "x": -39.72,
        "z": 29.71,
        "year": 1928,
        "lines": [
          "N"
        ],
        "fact": "Emerges into Cole Valley two blocks from Haight-Ashbury and Golden Gate Park.",
        "isGhost": false
      },
      {
        "name": "UCSF Parnassus & Irving (Inner Sunset)",
        "lat": 37.764,
        "lon": -122.4638,
        "x": -53.22,
        "z": 31.95,
        "year": 1928,
        "lines": [
          "N"
        ],
        "fact": "Serves the de Young Museum, California Academy of Sciences, and Japanese Tea Garden in Golden Gate Park.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "T",
    "name": "Muni Metro T Third Street (Central Subway) — Chinatown Rose Pak ↔ Union Square ↔ Moscone ↔ Mission Bay",
    "color": "#d31245",
    "textColor": "#ffffff",
    "openedYear": 2007,
    "rollingStockStyle": "SFMTA (2022 Central Subway Deep Bore)",
    "stations": [
      {
        "name": "Chinatown – Rose Pak Station (華埠-白蘭站)",
        "lat": 37.7956,
        "lon": -122.4069,
        "x": 2.86,
        "z": -7.33,
        "year": 2022,
        "lines": [
          "T"
        ],
        "fact": "Opened November 19, 2022 in the heart of North America’s oldest Chinatown (established 1848).",
        "isGhost": false
      },
      {
        "name": "Union Square / Market St (Powell)",
        "lat": 37.7862,
        "lon": -122.4071,
        "x": 2.66,
        "z": 4.35,
        "year": 2022,
        "lines": [
          "T"
        ],
        "fact": "Bored directly beneath the existing 1973 Powell Street BART/Muni station.",
        "isGhost": false
      },
      {
        "name": "Yerba Buena / Moscone",
        "lat": 37.7819,
        "lon": -122.4014,
        "x": 8.28,
        "z": 9.7,
        "year": 2022,
        "lines": [
          "T"
        ],
        "fact": "Serves the San Francisco Museum of Modern Art and Yerba Buena Gardens.",
        "isGhost": false
      },
      {
        "name": "4th & Brannan (Central Subway Portal)",
        "lat": 37.7782,
        "lon": -122.397,
        "x": 12.62,
        "z": 14.3,
        "year": 2022,
        "lines": [
          "T"
        ],
        "fact": "Where the Central Subway emerges onto 4th Street.",
        "isGhost": false
      },
      {
        "name": "4th & King (Caltrain)",
        "lat": 37.7764,
        "lon": -122.3945,
        "x": 15.08,
        "z": 16.53,
        "year": 2007,
        "lines": [
          "N",
          "T"
        ],
        "fact": "Crosses Mission Creek over the historic 1933 Third Street drawbridge.",
        "isGhost": false
      },
      {
        "name": "UCSF / Chase Center",
        "lat": 37.7685,
        "lon": -122.3892,
        "x": 20.3,
        "z": 26.36,
        "year": 2007,
        "lines": [
          "T"
        ],
        "fact": "Serves the Golden State Warriors’ waterfront arena and Mission Bay biotech campus.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "F",
    "name": "F Market & Wharves Historic Streetcar — Castro ↔ Market St ↔ Ferry Building ↔ Fisherman’s Wharf",
    "color": "#f4a261",
    "textColor": "#10141c",
    "openedYear": 1995,
    "rollingStockStyle": "Market Street Railway / Muni (1940s Streamliner PCC & Milan Peter Witt Cars)",
    "stations": [
      {
        "name": "Fisherman's Wharf (Jones & Beach)",
        "lat": 37.8072,
        "lon": -122.4142,
        "x": -4.34,
        "z": -21.76,
        "year": 2000,
        "lines": [
          "F"
        ],
        "fact": "Overlooks the historic Dungeness crab boats, Hyde Street Pier, and Alcatraz Island.",
        "isGhost": false
      },
      {
        "name": "Pier 39 & Alcatraz Landing (Pier 33)",
        "lat": 37.8078,
        "lon": -122.4068,
        "x": 2.96,
        "z": -22.5,
        "year": 2000,
        "lines": [
          "F"
        ],
        "fact": "Embarkation point for Alcatraz ferries at the foot of Telegraph Hill.",
        "isGhost": false
      },
      {
        "name": "Ferry Building (The Embarcadero)",
        "lat": 37.7955,
        "lon": -122.3937,
        "x": 15.87,
        "z": -7.21,
        "year": 1995,
        "lines": [
          "F"
        ],
        "fact": "Where the F Line turns from the Embarcadero onto Market Street.",
        "isGhost": false
      },
      {
        "name": "Market & Powell",
        "lat": 37.7844,
        "lon": -122.4079,
        "x": 1.87,
        "z": 6.59,
        "year": 1995,
        "lines": [
          "F"
        ],
        "fact": "Runs down the surface of Market Street beneath the 1916 \"Path of Gold\" streetlights.",
        "isGhost": false
      },
      {
        "name": "Market & 8th (Civic Center)",
        "lat": 37.7785,
        "lon": -122.4148,
        "x": -4.93,
        "z": 13.92,
        "year": 1995,
        "lines": [
          "F"
        ],
        "fact": "Surface stop above the BART/Muni subway.",
        "isGhost": false
      },
      {
        "name": "17th & Castro (Jane Warner Plaza)",
        "lat": 37.7625,
        "lon": -122.4351,
        "x": -24.94,
        "z": 33.82,
        "year": 1995,
        "lines": [
          "F"
        ],
        "fact": "Western terminus of the F Market heritage line.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "CC-PH",
    "name": "Powell–Hyde & Powell–Mason Cable Cars — Market St ↔ Union Square ↔ Nob Hill ↔ Lombard St ↔ Aquatic Park",
    "color": "#c83e2b",
    "textColor": "#ffffff",
    "openedYear": 1888,
    "rollingStockStyle": "Ferries & Cliff House Railway (1888) / SFMTA National Historic Landmark",
    "stations": [
      {
        "name": "Powell & Market Cable Car Turntable",
        "lat": 37.7845,
        "lon": -122.4078,
        "x": 1.97,
        "z": 6.46,
        "year": 1888,
        "lines": [
          "CC-PH"
        ],
        "fact": "Gripman and conductor spin the 7-ton wooden car by hand on a wooden turntable at the foot of Powell Street.",
        "isGhost": false
      },
      {
        "name": "Powell & Geary (Union Square)",
        "lat": 37.7876,
        "lon": -122.4084,
        "x": 1.38,
        "z": 2.61,
        "year": 1888,
        "lines": [
          "CC-PH"
        ],
        "fact": "Climbs out of the Union Square basin toward Nob Hill.",
        "isGhost": false
      },
      {
        "name": "Powell & California (Nob Hill Crest)",
        "lat": 37.7919,
        "lon": -122.4092,
        "x": 0.59,
        "z": -2.74,
        "year": 1888,
        "lines": [
          "CC-PH"
        ],
        "fact": "Historic crest of Nob Hill where the gripmen must drop the cable and coast across the intersecting California Street cable.",
        "isGhost": false
      },
      {
        "name": "Washington & Mason (Cable Car Powerhouse & Barn)",
        "lat": 37.7946,
        "lon": -122.4116,
        "x": -1.77,
        "z": -6.09,
        "year": 1887,
        "lines": [
          "CC-PH"
        ],
        "fact": "Houses the giant 510-horsepower electric motors and 14-foot winding sheaves that pull every cable car in San Francisco.",
        "isGhost": false
      },
      {
        "name": "Hyde & Lombard (\"Crookedest Street in the World\")",
        "lat": 37.8021,
        "lon": -122.4187,
        "x": -8.77,
        "z": -15.42,
        "year": 1891,
        "lines": [
          "CC-PH"
        ],
        "fact": "Crests Russian Hill at the top of Lombard Street’s eight brick switchbacks before plunging down a 21% grade toward Alcatraz.",
        "isGhost": false
      },
      {
        "name": "Hyde & Beach Turntable (Aquatic Park / Ghirardelli Sq)",
        "lat": 37.8065,
        "lon": -122.4206,
        "x": -10.64,
        "z": -20.89,
        "year": 1891,
        "lines": [
          "CC-PH"
        ],
        "fact": "Northern turntable beside Ghirardelli Square with sweeping views across the Bay to Alcatraz and the Golden Gate Bridge.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "CC-CA",
    "name": "California Street Cable Car — Embarcadero ↔ Financial District ↔ Chinatown ↔ Nob Hill ↔ Van Ness",
    "color": "#b8860b",
    "textColor": "#ffffff",
    "openedYear": 1878,
    "rollingStockStyle": "California Street Cable Railroad (Leland Stanford, 1878)",
    "stations": [
      {
        "name": "California & Drumm (Embarcadero / Market)",
        "lat": 37.7936,
        "lon": -122.3965,
        "x": 13.11,
        "z": -4.85,
        "year": 1878,
        "lines": [
          "CC-CA"
        ],
        "fact": "Steps from the Ferry Building and Embarcadero BART.",
        "isGhost": false
      },
      {
        "name": "California & Kearny (Financial District / Transamerica)",
        "lat": 37.7926,
        "lon": -122.4045,
        "x": 5.22,
        "z": -3.61,
        "year": 1878,
        "lines": [
          "CC-CA"
        ],
        "fact": "Framed by the Bank of America tower and Transamerica Pyramid where the 18% climb up Nob Hill begins.",
        "isGhost": false
      },
      {
        "name": "California & Grant (Old St. Mary’s & Chinatown Dragon Gate)",
        "lat": 37.7923,
        "lon": -122.4061,
        "x": 3.65,
        "z": -3.23,
        "year": 1878,
        "lines": [
          "CC-CA"
        ],
        "fact": "Crosses historic Grant Avenue in Chinatown beside the 1854 Old St. Mary’s Cathedral.",
        "isGhost": false
      },
      {
        "name": "California & Powell (Nob Hill / Mark Hopkins)",
        "lat": 37.7919,
        "lon": -122.4092,
        "x": 0.59,
        "z": -2.74,
        "year": 1878,
        "lines": [
          "CC-CA"
        ],
        "fact": "Interchange with the Powell–Hyde and Powell–Mason cable cars.",
        "isGhost": false
      },
      {
        "name": "California & Taylor (Grace Cathedral & Huntington Park)",
        "lat": 37.7915,
        "lon": -122.4128,
        "x": -2.96,
        "z": -2.24,
        "year": 1878,
        "lines": [
          "CC-CA"
        ],
        "fact": "Faces the Gothic twin towers of Grace Cathedral, the Pacific-Union Club (Flood Mansion), and Huntington Park.",
        "isGhost": false
      },
      {
        "name": "California & Van Ness",
        "lat": 37.7903,
        "lon": -122.422,
        "x": -12.02,
        "z": -0.75,
        "year": 1878,
        "lines": [
          "CC-CA"
        ],
        "fact": "Western terminus of the California Street line.",
        "isGhost": false
      }
    ]
  }
];
