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

export const MELBOURNE_METRO_SYSTEM_NAME = "PTV — Metro Trains Melbourne (City Loop & Metro Tunnel) & Yarra Trams Grid";

export const MELBOURNE_METRO_LINES: CityMetroLine[] = [
  {
    "line": "CL",
    "name": "City Loop (MURL Underground & Viaduct Loop) — Flinders St ↔ Southern Cross ↔ Flagstaff ↔ Melbourne Central ↔ Parliament ↔ Flinders St",
    "color": "#0072ce",
    "textColor": "#ffffff",
    "openedYear": 1981,
    "rollingStockStyle": "Metro Trains Melbourne (X’Trapolis 100 / Comeng 4-Tube Loop)",
    "stations": [
      {
        "name": "Flinders Street (Under the Clocks)",
        "lat": -37.8183,
        "lon": 144.9671,
        "x": 4.04,
        "z": 6,
        "year": 1854,
        "lines": [
          "CL",
          "SHM",
          "MER",
          "WIL",
          "PKM",
          "35",
          "1",
          "16"
        ],
        "fact": "Southern anchor of the City Loop and interchange with the 2025 Metro Tunnel at Town Hall Station.",
        "isGhost": false
      },
      {
        "name": "Southern Cross (Spencer Street Wave Roof)",
        "lat": -37.8184,
        "lon": 144.9525,
        "x": -10.71,
        "z": 6.13,
        "year": 1859,
        "lines": [
          "CL",
          "WIL",
          "35",
          "96",
          "86",
          "109",
          "11"
        ],
        "fact": "Linked to Flinders Street via the 1891 four-track Flinders Street Viaduct and crowned in 2006 by Grimshaw’s undulating dune roof.",
        "isGhost": false
      },
      {
        "name": "Flagstaff (Underground City Loop)",
        "lat": -37.8119,
        "lon": 144.9562,
        "x": -6.97,
        "z": -2.17,
        "year": 1985,
        "lines": [
          "CL",
          "35",
          "58"
        ],
        "fact": "Final station of the Melbourne Underground Rail Loop to open on May 27, 1985 beneath Flagstaff Gardens.",
        "isGhost": false
      },
      {
        "name": "Melbourne Central (Museum Underground & Shot Tower Cone)",
        "lat": -37.8102,
        "lon": 144.9628,
        "x": -0.3,
        "z": -4.34,
        "year": 1981,
        "lines": [
          "CL",
          "PKM"
        ],
        "fact": "Opened January 24, 1981 as \"Museum\" station directly beneath Kisho Kurokawa’s 20-storey glass cone enclosing the 1889 Coop’s Shot Tower.",
        "isGhost": false
      },
      {
        "name": "Parliament (Deepest City Loop Station at -37m)",
        "lat": -37.8112,
        "lon": 144.9728,
        "x": 9.8,
        "z": -3.06,
        "year": 1983,
        "lines": [
          "CL",
          "PKM",
          "35",
          "96",
          "86",
          "109",
          "11"
        ],
        "fact": "Excavated 37 meters below Spring Street and Parliament House, featuring Melbourne’s longest southern-hemisphere escalators.",
        "isGhost": false
      },
      {
        "name": "Flinders Street (Loop Closure)",
        "lat": -37.8183,
        "lon": 144.9671,
        "x": 4.04,
        "z": 6,
        "year": 1981,
        "lines": [
          "CL",
          "SHM",
          "MER",
          "WIL",
          "PKM",
          "35",
          "1",
          "16"
        ],
        "fact": "Completes the four-tunnel City Loop circuit around the 1837 Hoddle Grid.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "MT",
    "name": "Metro Tunnel Line (2025 Cross-City Underground Spine) — North Melbourne / Arden ↔ Parkville ↔ State Library ↔ Town Hall ↔ Anzac ↔ South Yarra",
    "color": "#00a8e8",
    "textColor": "#10141c",
    "openedYear": 2025,
    "rollingStockStyle": "Metro Trains Melbourne (High Capacity Metro Train HCMT 7-Car)",
    "stations": [
      {
        "name": "Arden (North Melbourne Brick-Arch Precinct)",
        "lat": -37.8005,
        "lon": 144.9388,
        "x": -24.56,
        "z": -16.72,
        "year": 2025,
        "lines": [
          "MT"
        ],
        "fact": "Western underground Metro Tunnel station featuring soaring brick arches inspired by North Melbourne’s industrial heritage.",
        "isGhost": false
      },
      {
        "name": "Parkville (University of Melbourne & Hospital Hub)",
        "lat": -37.7988,
        "lon": 144.9598,
        "x": -3.34,
        "z": -18.89,
        "year": 2025,
        "lines": [
          "MT",
          "1",
          "16",
          "58"
        ],
        "fact": "Brings heavy underground metro rail directly to the University of Melbourne and Royal Melbourne Hospital beneath Grattan Street.",
        "isGhost": false
      },
      {
        "name": "State Library (Melbourne Central North Interchange)",
        "lat": -37.8098,
        "lon": 144.9648,
        "x": 1.72,
        "z": -4.85,
        "year": 2025,
        "lines": [
          "MT",
          "35",
          "1",
          "16"
        ],
        "fact": "Mined 36 meters beneath Swanston Street as a trinocular cavern with direct underground transfer to Melbourne Central.",
        "isGhost": false
      },
      {
        "name": "Town Hall (Flinders Street & Fed Square Underground)",
        "lat": -37.8165,
        "lon": 144.9668,
        "x": 3.74,
        "z": 3.7,
        "year": 2025,
        "lines": [
          "MT",
          "1",
          "109",
          "11"
        ],
        "fact": "Cathedral-scale underground station beneath southern Swanston Street with direct subterranean walkway into Flinders Street Station and Federation Square.",
        "isGhost": false
      },
      {
        "name": "Anzac (Shrine of Remembrance & Domain Tram-Train Interchange)",
        "lat": -37.8318,
        "lon": 144.9718,
        "x": 8.79,
        "z": 23.23,
        "year": 2025,
        "lines": [
          "MT",
          "1",
          "16",
          "58"
        ],
        "fact": "Features a sweeping timber canopy on St Kilda Road allowing direct step-free transfer between St Kilda Road trams and deep underground Metro Tunnel trains.",
        "isGhost": false
      },
      {
        "name": "South Yarra / Hawksburn (Eastern Portal)",
        "lat": -37.8388,
        "lon": 144.9925,
        "x": 29.72,
        "z": 32.16,
        "year": 1860,
        "lines": [
          "MT",
          "SHM",
          "PKM"
        ],
        "fact": "Eastern portal where the twin 9 km Metro Tunnel surfaces to join the Cranbourne and Pakenham lines.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "SHM",
    "name": "Sandringham Line — Flinders Street ↔ Richmond ↔ South Yarra ↔ Prahran ↔ Windsor",
    "color": "#f27ea6",
    "textColor": "#10141c",
    "openedYear": 1859,
    "rollingStockStyle": "Melbourne & Suburban Railway (1859) / Metro Trains (Siemens Nexas)",
    "stations": [
      {
        "name": "Flinders Street (Under the Clocks)",
        "lat": -37.8183,
        "lon": 144.9671,
        "x": 4.04,
        "z": 6,
        "year": 1854,
        "lines": [
          "CL",
          "SHM",
          "MER",
          "WIL",
          "PKM",
          "35",
          "1",
          "16"
        ],
        "fact": "Departs the eastern Jolimont rail yards past Federation Square.",
        "isGhost": false
      },
      {
        "name": "Richmond (10-Platform Eastern Junction)",
        "lat": -37.824,
        "lon": 144.9902,
        "x": 27.39,
        "z": 13.27,
        "year": 1859,
        "lines": [
          "SHM",
          "PKM"
        ],
        "fact": "Elevated bluestone and brick viaduct junction serving the MCG and Swan Street.",
        "isGhost": false
      },
      {
        "name": "South Yarra / Hawksburn (Eastern Portal)",
        "lat": -37.8388,
        "lon": 144.9925,
        "x": 29.72,
        "z": 32.16,
        "year": 1860,
        "lines": [
          "MT",
          "SHM",
          "PKM"
        ],
        "fact": "Connects Chapel Street and Toorak Road.",
        "isGhost": false
      },
      {
        "name": "Prahran (Greville Street)",
        "lat": -37.8492,
        "lon": 144.9898,
        "x": 26.99,
        "z": 45.44,
        "year": 1860,
        "lines": [
          "SHM"
        ],
        "fact": "Serves Prahran Market and Chapel Street.",
        "isGhost": false
      },
      {
        "name": "Windsor",
        "lat": -37.8545,
        "lon": 144.9918,
        "x": 29.01,
        "z": 52.2,
        "year": 1859,
        "lines": [
          "SHM"
        ],
        "fact": "Historic 1880s Victorian brick station buildings on the bayside Sandringham line.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "MER",
    "name": "Mernda & Hurstbridge Line — Flinders Street ↔ Jolimont (MCG) ↔ West Richmond ↔ Collingwood ↔ Clifton Hill",
    "color": "#e4002b",
    "textColor": "#ffffff",
    "openedYear": 1888,
    "rollingStockStyle": "Victorian Railways (1901 Direct Route) / Metro Trains X’Trapolis",
    "stations": [
      {
        "name": "Flinders Street (Under the Clocks)",
        "lat": -37.8183,
        "lon": 144.9671,
        "x": 4.04,
        "z": 6,
        "year": 1854,
        "lines": [
          "CL",
          "SHM",
          "MER",
          "WIL",
          "PKM",
          "35",
          "1",
          "16"
        ],
        "fact": "Connects directly into the Clifton Hill group and Parliament City Loop tunnel.",
        "isGhost": false
      },
      {
        "name": "Jolimont (MCG & Yarra Park)",
        "lat": -37.8165,
        "lon": 144.984,
        "x": 21.12,
        "z": 3.7,
        "year": 1901,
        "lines": [
          "MER"
        ],
        "fact": "Primary match-day station on the northern edge of Yarra Park directly outside the Melbourne Cricket Ground.",
        "isGhost": false
      },
      {
        "name": "West Richmond",
        "lat": -37.8148,
        "lon": 144.9915,
        "x": 28.7,
        "z": 1.53,
        "year": 1901,
        "lines": [
          "MER"
        ],
        "fact": "Opened in October 1901 in a deep cutting through Hoddle Street.",
        "isGhost": false
      },
      {
        "name": "North Richmond",
        "lat": -37.8105,
        "lon": 144.9925,
        "x": 29.72,
        "z": -3.96,
        "year": 1901,
        "lines": [
          "MER"
        ],
        "fact": "Elevated station overlooking Victoria Street (\"Little Saigon\").",
        "isGhost": false
      },
      {
        "name": "Collingwood",
        "lat": -37.8045,
        "lon": 144.9935,
        "x": 30.73,
        "z": -11.62,
        "year": 1901,
        "lines": [
          "MER"
        ],
        "fact": "Serves the Collingwood Town Hall and Abbotsford Convent precinct.",
        "isGhost": false
      },
      {
        "name": "Clifton Hill (Mernda & Hurstbridge Junction)",
        "lat": -37.7885,
        "lon": 144.9952,
        "x": 32.44,
        "z": -32.04,
        "year": 1888,
        "lines": [
          "MER",
          "86"
        ],
        "fact": "Northern inner-city junction where the Mernda (former Inner Circle) and Hurstbridge lines diverge.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "WIL",
    "name": "Williamstown, Werribee & 1854 Sandridge Heritage Line — Flinders St ↔ Southern Cross ↔ North Melbourne ↔ Port Melbourne",
    "color": "#009645",
    "textColor": "#ffffff",
    "openedYear": 1854,
    "rollingStockStyle": "Melbourne & Hobson’s Bay Railway (1854 First Australian Steam Line)",
    "stations": [
      {
        "name": "North Melbourne (Western Junction)",
        "lat": -37.8072,
        "lon": 144.9425,
        "x": -20.82,
        "z": -8.17,
        "year": 1859,
        "lines": [
          "WIL"
        ],
        "fact": "Six-platform junction where the Williamstown, Werribee, Sunbury, Craigieburn, and Upfield lines converge.",
        "isGhost": false
      },
      {
        "name": "Southern Cross (Spencer Street Wave Roof)",
        "lat": -37.8184,
        "lon": 144.9525,
        "x": -10.71,
        "z": 6.13,
        "year": 1859,
        "lines": [
          "CL",
          "WIL",
          "35",
          "96",
          "86",
          "109",
          "11"
        ],
        "fact": "Regional V/Line and interstate XPT terminus.",
        "isGhost": false
      },
      {
        "name": "Flinders Street (Under the Clocks)",
        "lat": -37.8183,
        "lon": 144.9671,
        "x": 4.04,
        "z": 6,
        "year": 1854,
        "lines": [
          "CL",
          "SHM",
          "MER",
          "WIL",
          "PKM",
          "35",
          "1",
          "16"
        ],
        "fact": "Inaugural city terminus of the September 12, 1854 steam railway to Sandridge (Port Melbourne).",
        "isGhost": false
      },
      {
        "name": "Montague (1883–1987 Former Heavy Rail • Light Rail 109)",
        "lat": -37.8275,
        "lon": 144.9495,
        "x": -13.75,
        "z": 17.74,
        "year": 1883,
        "lines": [
          "WIL",
          "109"
        ],
        "fact": "Served the original Port Melbourne steam and electric railway across the Sandridge Bridge before conversion to Light Rail 109 in 1987.",
        "isGhost": false
      },
      {
        "name": "Port Melbourne / Sandridge Pier (1854 First Australian Steam Terminus • Heavy Rail Ghost)",
        "lat": -37.8412,
        "lon": 144.9325,
        "x": -30.93,
        "z": 35.23,
        "year": 1854,
        "lines": [
          "WIL",
          "109"
        ],
        "fact": "Opened September 12, 1854 as Australia’s first steam railway station at Station Pier on Hobson’s Bay; converted from heavy broad-gauge rail to light-rail tram 109 in 1987 with its heritage bluestone platforms preserved.",
        "isGhost": true
      }
    ]
  },
  {
    "line": "PKM",
    "name": "Pakenham & Cranbourne Caulfield Group Metro Line — Parliament ↔ Melbourne Central ↔ Flagstaff ↔ Southern Cross ↔ Flinders St ↔ Richmond ↔ South Yarra ↔ Toorak",
    "color": "#279fd5",
    "textColor": "#ffffff",
    "openedYear": 1879,
    "rollingStockStyle": "Metro Trains Melbourne (High Capacity Metro Train HCMT)",
    "stations": [
      {
        "name": "Melbourne Central (Museum Underground & Shot Tower Cone)",
        "lat": -37.8102,
        "lon": 144.9628,
        "x": -0.3,
        "z": -4.34,
        "year": 1981,
        "lines": [
          "CL",
          "PKM"
        ],
        "fact": "Caulfield Group City Loop underground platform.",
        "isGhost": false
      },
      {
        "name": "Parliament (Deepest City Loop Station at -37m)",
        "lat": -37.8112,
        "lon": 144.9728,
        "x": 9.8,
        "z": -3.06,
        "year": 1983,
        "lines": [
          "CL",
          "PKM",
          "35",
          "96",
          "86",
          "109",
          "11"
        ],
        "fact": "Eastern City Loop portal before descending to the Jolimont yards.",
        "isGhost": false
      },
      {
        "name": "Flinders Street (Under the Clocks)",
        "lat": -37.8183,
        "lon": 144.9671,
        "x": 4.04,
        "z": 6,
        "year": 1854,
        "lines": [
          "CL",
          "SHM",
          "MER",
          "WIL",
          "PKM",
          "35",
          "1",
          "16"
        ],
        "fact": "Central Yarra River interchange.",
        "isGhost": false
      },
      {
        "name": "Richmond (10-Platform Eastern Junction)",
        "lat": -37.824,
        "lon": 144.9902,
        "x": 27.39,
        "z": 13.27,
        "year": 1859,
        "lines": [
          "SHM",
          "PKM"
        ],
        "fact": "Major eastern rail viaduct.",
        "isGhost": false
      },
      {
        "name": "South Yarra / Hawksburn (Eastern Portal)",
        "lat": -37.8388,
        "lon": 144.9925,
        "x": 29.72,
        "z": 32.16,
        "year": 1860,
        "lines": [
          "MT",
          "SHM",
          "PKM"
        ],
        "fact": "Where the 2025 Metro Tunnel joins the four-track Caulfield corridor.",
        "isGhost": false
      },
      {
        "name": "Toorak (Armadale Elevated Skyrail Corridor)",
        "lat": -37.8508,
        "lon": 145.0115,
        "x": 48.92,
        "z": 47.48,
        "year": 1879,
        "lines": [
          "PKM"
        ],
        "fact": "Southeastern trunk heading toward Caulfield, Dandenong, Cranbourne, and Pakenham.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "35",
    "name": "City Circle Tram 35 (Free Heritage W-Class Loop) — Flinders St ↔ Parliament ↔ La Trobe St ↔ Docklands ↔ Flinders St",
    "color": "#78be20",
    "textColor": "#10141c",
    "openedYear": 1994,
    "rollingStockStyle": "Yarra Trams (1923–1956 Heritage Green & Gold W-Class Trams)",
    "stations": [
      {
        "name": "Flinders Street (Under the Clocks)",
        "lat": -37.8183,
        "lon": 144.9671,
        "x": 4.04,
        "z": 6,
        "year": 1923,
        "lines": [
          "CL",
          "SHM",
          "MER",
          "WIL",
          "PKM",
          "35",
          "1",
          "16"
        ],
        "fact": "Heritage W-Class trams rumble along Flinders Street past St Paul’s Cathedral and Federation Square.",
        "isGhost": false
      },
      {
        "name": "Parliament (Deepest City Loop Station at -37m)",
        "lat": -37.8112,
        "lon": 144.9728,
        "x": 9.8,
        "z": -3.06,
        "year": 1923,
        "lines": [
          "CL",
          "PKM",
          "35",
          "96",
          "86",
          "109",
          "11"
        ],
        "fact": "Turns north along Spring Street past the 1856 Parliament House colonnade and Princess Theatre.",
        "isGhost": false
      },
      {
        "name": "State Library (Melbourne Central North Interchange)",
        "lat": -37.8098,
        "lon": 144.9648,
        "x": 1.72,
        "z": -4.85,
        "year": 1923,
        "lines": [
          "MT",
          "35",
          "1",
          "16"
        ],
        "fact": "Runs west along La Trobe Street past the 1913 octagonal Dome Reading Room of State Library Victoria.",
        "isGhost": false
      },
      {
        "name": "Flagstaff (Underground City Loop)",
        "lat": -37.8119,
        "lon": 144.9562,
        "x": -6.97,
        "z": -2.17,
        "year": 1923,
        "lines": [
          "CL",
          "35",
          "58"
        ],
        "fact": "Passes Flagstaff Gardens and the historic Royal Mint.",
        "isGhost": false
      },
      {
        "name": "Victoria Harbour / Docklands (Bolte Bridge View)",
        "lat": -37.8185,
        "lon": 144.9435,
        "x": -19.81,
        "z": 6.25,
        "year": 2003,
        "lines": [
          "35",
          "86",
          "11"
        ],
        "fact": "Loops around Waterfront City and Marvel Stadium overlooking the twin 140m towers of the Bolte Bridge.",
        "isGhost": false
      },
      {
        "name": "Southern Cross (Spencer Street Wave Roof)",
        "lat": -37.8184,
        "lon": 144.9525,
        "x": -10.71,
        "z": 6.13,
        "year": 1923,
        "lines": [
          "CL",
          "WIL",
          "35",
          "96",
          "86",
          "109",
          "11"
        ],
        "fact": "Returns south along Spencer Street to Flinders Street.",
        "isGhost": false
      },
      {
        "name": "Flinders Street (City Circle Loop Closure)",
        "lat": -37.8183,
        "lon": 144.9671,
        "x": 4.04,
        "z": 6,
        "year": 1994,
        "lines": [
          "CL",
          "SHM",
          "MER",
          "WIL",
          "PKM",
          "35",
          "1",
          "16"
        ],
        "fact": "Completes the clockwise and counter-clockwise W-Class heritage loop.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "96",
    "name": "Tram Route 96 (Light Rail) — Carlton / Royal Exhibition Building ↔ Bourke St Mall ↔ Southern Cross ↔ Albert Park",
    "color": "#c6007e",
    "textColor": "#ffffff",
    "openedYear": 1887,
    "rollingStockStyle": "Yarra Trams (Bombardier E-Class Low-Floor Light Rail)",
    "stations": [
      {
        "name": "Nicholson Street / Carlton Gardens (Royal Exhibition Building)",
        "lat": -37.8047,
        "lon": 144.9735,
        "x": 10.51,
        "z": -11.36,
        "year": 1887,
        "lines": [
          "96",
          "11"
        ],
        "fact": "Glides along Nicholson Street directly beside the UNESCO-listed 1880 Royal Exhibition Building.",
        "isGhost": false
      },
      {
        "name": "Parliament (Deepest City Loop Station at -37m)",
        "lat": -37.8112,
        "lon": 144.9728,
        "x": 9.8,
        "z": -3.06,
        "year": 1887,
        "lines": [
          "CL",
          "PKM",
          "35",
          "96",
          "86",
          "109",
          "11"
        ],
        "fact": "Swings from Nicholson Street onto Bourke Street at the top of Eastern Hill.",
        "isGhost": false
      },
      {
        "name": "Bourke Street Mall (Elizabeth & Swanston Tram Crossroads)",
        "lat": -37.8142,
        "lon": 144.9645,
        "x": 1.42,
        "z": 0.77,
        "year": 1887,
        "lines": [
          "96",
          "86",
          "58"
        ],
        "fact": "Pedestrianized retail heart of the Hoddle Grid flanked by the 1892 Block Arcade and Royal Arcade.",
        "isGhost": false
      },
      {
        "name": "Southern Cross (Spencer Street Wave Roof)",
        "lat": -37.8184,
        "lon": 144.9525,
        "x": -10.71,
        "z": 6.13,
        "year": 1987,
        "lines": [
          "CL",
          "WIL",
          "35",
          "96",
          "86",
          "109",
          "11"
        ],
        "fact": "Leaves the Hoddle Grid to cross the Yarra on its dedicated light-rail reservation.",
        "isGhost": false
      },
      {
        "name": "South Melbourne (1857 Former St Kilda Railway Heritage Station)",
        "lat": -37.8322,
        "lon": 144.9595,
        "x": -3.64,
        "z": 23.74,
        "year": 1857,
        "lines": [
          "96"
        ],
        "fact": "Preserves its 1880s Victorian railway verandas from the 1857 St Kilda broad-gauge railway (converted to Route 96 light rail in 1987).",
        "isGhost": false
      },
      {
        "name": "Albert Park (Formula 1 Grand Prix Lake Circuit)",
        "lat": -37.8428,
        "lon": 144.9578,
        "x": -5.36,
        "z": 37.27,
        "year": 1857,
        "lines": [
          "96"
        ],
        "fact": "Historic 1857 railway station serving Albert Park Lake on the run down to St Kilda Beach.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "86",
    "name": "Tram Route 86 — Docklands ↔ Bourke Street Mall ↔ Parliament ↔ Smith Street (Fitzroy & Collingwood)",
    "color": "#ffb81c",
    "textColor": "#10141c",
    "openedYear": 1886,
    "rollingStockStyle": "Yarra Trams (Bombardier E-Class Fitzroy – Bourke St Spine)",
    "stations": [
      {
        "name": "Victoria Harbour / Docklands (Bolte Bridge View)",
        "lat": -37.8185,
        "lon": 144.9435,
        "x": -19.81,
        "z": 6.25,
        "year": 2005,
        "lines": [
          "35",
          "86",
          "11"
        ],
        "fact": "Western waterfront terminus of Route 86 in Docklands.",
        "isGhost": false
      },
      {
        "name": "Southern Cross (Spencer Street Wave Roof)",
        "lat": -37.8184,
        "lon": 144.9525,
        "x": -10.71,
        "z": 6.13,
        "year": 1886,
        "lines": [
          "CL",
          "WIL",
          "35",
          "96",
          "86",
          "109",
          "11"
        ],
        "fact": "Climbs Bourke Street Hill from Spencer Street.",
        "isGhost": false
      },
      {
        "name": "Bourke Street Mall (Elizabeth & Swanston Tram Crossroads)",
        "lat": -37.8142,
        "lon": 144.9645,
        "x": 1.42,
        "z": 0.77,
        "year": 1886,
        "lines": [
          "96",
          "86",
          "58"
        ],
        "fact": "Shares the central Bourke Street trunk with Route 96.",
        "isGhost": false
      },
      {
        "name": "Parliament (Deepest City Loop Station at -37m)",
        "lat": -37.8112,
        "lon": 144.9728,
        "x": 9.8,
        "z": -3.06,
        "year": 1886,
        "lines": [
          "CL",
          "PKM",
          "35",
          "96",
          "86",
          "109",
          "11"
        ],
        "fact": "Passes the Windsor Hotel and Parliament Gardens.",
        "isGhost": false
      },
      {
        "name": "Gertrude & Smith Streets (Fitzroy Bohemian Hub)",
        "lat": -37.8062,
        "lon": 144.9832,
        "x": 20.32,
        "z": -9.45,
        "year": 1886,
        "lines": [
          "86"
        ],
        "fact": "Melbourne’s premier live-music, coffee, and Victorian cast-iron lacework boulevard dividing Fitzroy and Collingwood.",
        "isGhost": false
      },
      {
        "name": "Clifton Hill (Mernda & Hurstbridge Junction)",
        "lat": -37.7885,
        "lon": 144.9952,
        "x": 32.44,
        "z": -32.04,
        "year": 1886,
        "lines": [
          "MER",
          "86"
        ],
        "fact": "Continues northeast along Queens Parade toward Northcote and Bundoora.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "1",
    "name": "Tram Route 1 (Swanston Street & St Kilda Road Spine) — Melbourne University ↔ State Library ↔ Flinders St ↔ Arts Centre ↔ Shrine (Anzac)",
    "color": "#00a88f",
    "textColor": "#ffffff",
    "openedYear": 1885,
    "rollingStockStyle": "Yarra Trams (Swanston Street Civic & Cultural Boulevard)",
    "stations": [
      {
        "name": "Parkville (University of Melbourne & Hospital Hub)",
        "lat": -37.7988,
        "lon": 144.9638,
        "x": 0.71,
        "z": -18.89,
        "year": 1885,
        "lines": [
          "MT",
          "1",
          "16",
          "58"
        ],
        "fact": "Northern Swanston Street hub serving the University of Melbourne.",
        "isGhost": false
      },
      {
        "name": "State Library (Melbourne Central North Interchange)",
        "lat": -37.8098,
        "lon": 144.9648,
        "x": 1.72,
        "z": -4.85,
        "year": 1885,
        "lines": [
          "MT",
          "35",
          "1",
          "16"
        ],
        "fact": "Stops in front of the 1854 State Library Victoria and RMIT University.",
        "isGhost": false
      },
      {
        "name": "Town Hall (Flinders Street & Fed Square Underground)",
        "lat": -37.8165,
        "lon": 144.9668,
        "x": 3.74,
        "z": 3.7,
        "year": 1885,
        "lines": [
          "MT",
          "1",
          "109",
          "11"
        ],
        "fact": "Passes Melbourne Town Hall, Manchester Unity Building (1932), and St Paul’s Cathedral.",
        "isGhost": false
      },
      {
        "name": "Flinders Street (Under the Clocks)",
        "lat": -37.8183,
        "lon": 144.9671,
        "x": 4.04,
        "z": 6,
        "year": 1885,
        "lines": [
          "CL",
          "SHM",
          "MER",
          "WIL",
          "PKM",
          "35",
          "1",
          "16"
        ],
        "fact": "Crosses the 1888 Princes Bridge over the Yarra River with panoramic views of the CBD skyline.",
        "isGhost": false
      },
      {
        "name": "Arts Centre & NGV (Southbank Cultural Precinct)",
        "lat": -37.8215,
        "lon": 144.9685,
        "x": 5.46,
        "z": 10.08,
        "year": 1885,
        "lines": [
          "1",
          "16"
        ],
        "fact": "Serves Sir Roy Grounds’ 1968 National Gallery of Victoria waterwall and 1984 Arts Centre Spire.",
        "isGhost": false
      },
      {
        "name": "Anzac (Shrine of Remembrance & Domain Tram-Train Interchange)",
        "lat": -37.8318,
        "lon": 144.9718,
        "x": 8.79,
        "z": 23.23,
        "year": 1885,
        "lines": [
          "MT",
          "1",
          "16",
          "58"
        ],
        "fact": "Frames the ceremonial axial view of the Shrine of Remembrance along tree-lined St Kilda Road.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "109",
    "name": "Light Rail Route 109 (Port Melbourne – Box Hill) — Station Pier ↔ Montague ↔ Southbank / Crown ↔ Collins Street ↔ Parliament ↔ East Melbourne",
    "color": "#f58220",
    "textColor": "#10141c",
    "openedYear": 1987,
    "rollingStockStyle": "Yarra Trams (Citadis C1 & E-Class Port Melbourne Light Rail)",
    "stations": [
      {
        "name": "Port Melbourne / Sandridge Pier (1854 First Australian Steam Terminus • Heavy Rail Ghost)",
        "lat": -37.8412,
        "lon": 144.9325,
        "x": -30.93,
        "z": 35.23,
        "year": 1987,
        "lines": [
          "WIL",
          "109"
        ],
        "fact": "Converted in December 1987 from the 1854 Sandridge heavy-rail line into Melbourne’s first segregated high-speed light rail corridor.",
        "isGhost": false
      },
      {
        "name": "North Port (1859 Heritage Brick Railway Station on Light Rail)",
        "lat": -37.8338,
        "lon": 144.9415,
        "x": -21.83,
        "z": 25.78,
        "year": 1859,
        "lines": [
          "109"
        ],
        "fact": "Retains its original 19th-century Victorian Railways station buildings alongside the low-floor light rail platforms.",
        "isGhost": false
      },
      {
        "name": "Montague (1883–1987 Former Heavy Rail • Light Rail 109)",
        "lat": -37.8275,
        "lon": 144.9495,
        "x": -13.75,
        "z": 17.74,
        "year": 1883,
        "lines": [
          "WIL",
          "109"
        ],
        "fact": "Approaches the Yarra River and Southbank.",
        "isGhost": false
      },
      {
        "name": "Southbank / Casino East (Queensbridge)",
        "lat": -37.8225,
        "lon": 144.9598,
        "x": -3.34,
        "z": 11.36,
        "year": 1987,
        "lines": [
          "109",
          "58"
        ],
        "fact": "Crosses the Yarra River onto Spencer and Collins Streets.",
        "isGhost": false
      },
      {
        "name": "Southern Cross (Spencer Street Wave Roof)",
        "lat": -37.8184,
        "lon": 144.9525,
        "x": -10.71,
        "z": 6.13,
        "year": 1886,
        "lines": [
          "CL",
          "WIL",
          "35",
          "96",
          "86",
          "109",
          "11"
        ],
        "fact": "Turns onto Collins Street—Melbourne’s grand Victorian banking boulevard.",
        "isGhost": false
      },
      {
        "name": "Town Hall (Flinders Street & Fed Square Underground)",
        "lat": -37.8165,
        "lon": 144.9668,
        "x": 3.74,
        "z": 3.7,
        "year": 1886,
        "lines": [
          "MT",
          "1",
          "109",
          "11"
        ],
        "fact": "Climbs the \"Paris End\" of Collins Street past plane trees, Regent Theatre, and 1880s Venetian Gothic banks.",
        "isGhost": false
      },
      {
        "name": "Parliament (Deepest City Loop Station at -37m)",
        "lat": -37.8112,
        "lon": 144.9728,
        "x": 9.8,
        "z": -3.06,
        "year": 1886,
        "lines": [
          "CL",
          "PKM",
          "35",
          "96",
          "86",
          "109",
          "11"
        ],
        "fact": "Passes Old Treasury Building (1862) and St Patrick’s Cathedral along Victoria Parade.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "11",
    "name": "Tram Route 11 (Collins Street & Fitzroy Spine) — Victoria Harbour Docklands ↔ Collins Street ↔ Parliament ↔ Brunswick Street Fitzroy",
    "color": "#6cbe45",
    "textColor": "#10141c",
    "openedYear": 1886,
    "rollingStockStyle": "Yarra Trams (Bombardier E-Class Low-Floor Tram)",
    "stations": [
      {
        "name": "Victoria Harbour / Docklands (Bolte Bridge View)",
        "lat": -37.8185,
        "lon": 144.9435,
        "x": -19.81,
        "z": 6.25,
        "year": 2002,
        "lines": [
          "35",
          "86",
          "11"
        ],
        "fact": "Runs the full length of the Collins Street extension into Victoria Harbour.",
        "isGhost": false
      },
      {
        "name": "Southern Cross (Spencer Street Wave Roof)",
        "lat": -37.8184,
        "lon": 144.9525,
        "x": -10.71,
        "z": 6.13,
        "year": 1886,
        "lines": [
          "CL",
          "WIL",
          "35",
          "96",
          "86",
          "109",
          "11"
        ],
        "fact": "Connects Docklands with the Hoddle Grid.",
        "isGhost": false
      },
      {
        "name": "Town Hall (Flinders Street & Fed Square Underground)",
        "lat": -37.8165,
        "lon": 144.9668,
        "x": 3.74,
        "z": 3.7,
        "year": 1886,
        "lines": [
          "MT",
          "1",
          "109",
          "11"
        ],
        "fact": "Collins & Swanston Street intersection.",
        "isGhost": false
      },
      {
        "name": "Parliament (Deepest City Loop Station at -37m)",
        "lat": -37.8112,
        "lon": 144.9728,
        "x": 9.8,
        "z": -3.06,
        "year": 1886,
        "lines": [
          "CL",
          "PKM",
          "35",
          "96",
          "86",
          "109",
          "11"
        ],
        "fact": "Swings past Parliament House toward Fitzroy.",
        "isGhost": false
      },
      {
        "name": "Nicholson Street / Carlton Gardens (Royal Exhibition Building)",
        "lat": -37.8047,
        "lon": 144.9735,
        "x": 10.51,
        "z": -11.36,
        "year": 1886,
        "lines": [
          "96",
          "11"
        ],
        "fact": "Passes the southern entrance of Carlton Gardens and Melbourne Museum.",
        "isGhost": false
      },
      {
        "name": "Brunswick Street (Fitzroy Street-Art & Café Mile)",
        "lat": -37.7985,
        "lon": 144.9785,
        "x": 15.57,
        "z": -19.27,
        "year": 1886,
        "lines": [
          "11"
        ],
        "fact": "Glides down bohemian Brunswick Street—originally one of Melbourne’s first 1886 cable tram corridors.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "16",
    "name": "Tram Route 16 (St Kilda Beach & Esplanade Boulevard) — Melbourne University ↔ Swanston St ↔ Flinders St ↔ Shrine ↔ St Kilda Junction",
    "color": "#f9a51b",
    "textColor": "#10141c",
    "openedYear": 1888,
    "rollingStockStyle": "Yarra Trams (Alstom Citadis / Z3 St Kilda Beach Line)",
    "stations": [
      {
        "name": "Parkville (University of Melbourne & Hospital Hub)",
        "lat": -37.7988,
        "lon": 144.9638,
        "x": 0.71,
        "z": -18.89,
        "year": 1888,
        "lines": [
          "MT",
          "1",
          "16",
          "58"
        ],
        "fact": "Departs the Melbourne University terminuses on Swanston Street.",
        "isGhost": false
      },
      {
        "name": "State Library (Melbourne Central North Interchange)",
        "lat": -37.8098,
        "lon": 144.9648,
        "x": 1.72,
        "z": -4.85,
        "year": 1888,
        "lines": [
          "MT",
          "35",
          "1",
          "16"
        ],
        "fact": "Shares the car-free Swanston Street tramway transit mall.",
        "isGhost": false
      },
      {
        "name": "Flinders Street (Under the Clocks)",
        "lat": -37.8183,
        "lon": 144.9671,
        "x": 4.04,
        "z": 6,
        "year": 1888,
        "lines": [
          "CL",
          "SHM",
          "MER",
          "WIL",
          "PKM",
          "35",
          "1",
          "16"
        ],
        "fact": "Crosses Princes Bridge over the Yarra.",
        "isGhost": false
      },
      {
        "name": "Arts Centre & NGV (Southbank Cultural Precinct)",
        "lat": -37.8215,
        "lon": 144.9685,
        "x": 5.46,
        "z": 10.08,
        "year": 1888,
        "lines": [
          "1",
          "16"
        ],
        "fact": "Runs down the tree-shaded tram tracks of St Kilda Road.",
        "isGhost": false
      },
      {
        "name": "Anzac (Shrine of Remembrance & Domain Tram-Train Interchange)",
        "lat": -37.8318,
        "lon": 144.9718,
        "x": 8.79,
        "z": 23.23,
        "year": 1888,
        "lines": [
          "MT",
          "1",
          "16",
          "58"
        ],
        "fact": "Connects with the 2025 Metro Tunnel beneath Kings Domain.",
        "isGhost": false
      },
      {
        "name": "St Kilda Junction (Fitzroy Street & Albert Park Gateway)",
        "lat": -37.8525,
        "lon": 144.9808,
        "x": 17.89,
        "z": 49.65,
        "year": 1888,
        "lines": [
          "16"
        ],
        "fact": "Where Route 16 turns down palm-lined Fitzroy Street to the St Kilda Esplanade, Palais Theatre, and 1912 Luna Park.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "58",
    "name": "Tram Route 58 (Royal Park, William Street & Southbank) — Parkville ↔ Flagstaff ↔ Bourke St ↔ Queensbridge (Eureka) ↔ Anzac ↔ Toorak",
    "color": "#8a8d8f",
    "textColor": "#ffffff",
    "openedYear": 1955,
    "rollingStockStyle": "Yarra Trams (E-Class William Street & Kings Way Corridor)",
    "stations": [
      {
        "name": "Parkville (University of Melbourne & Hospital Hub)",
        "lat": -37.7988,
        "lon": 144.9555,
        "x": -7.68,
        "z": -18.89,
        "year": 1955,
        "lines": [
          "MT",
          "1",
          "16",
          "58"
        ],
        "fact": "Runs through the native eucalyptus bushland of Royal Park and the hospital precinct.",
        "isGhost": false
      },
      {
        "name": "Flagstaff (Underground City Loop)",
        "lat": -37.8119,
        "lon": 144.9562,
        "x": -6.97,
        "z": -2.17,
        "year": 1885,
        "lines": [
          "CL",
          "35",
          "58"
        ],
        "fact": "Descends William Street past Flagstaff Gardens and the Supreme Court of Victoria.",
        "isGhost": false
      },
      {
        "name": "Bourke Street Mall (Elizabeth & Swanston Tram Crossroads)",
        "lat": -37.8142,
        "lon": 144.9592,
        "x": -3.94,
        "z": 0.77,
        "year": 1885,
        "lines": [
          "96",
          "86",
          "58"
        ],
        "fact": "Intersects the Bourke and Collins Street tram corridors.",
        "isGhost": false
      },
      {
        "name": "Southbank / Casino East (Queensbridge)",
        "lat": -37.8225,
        "lon": 144.9598,
        "x": -3.34,
        "z": 11.36,
        "year": 1890,
        "lines": [
          "109",
          "58"
        ],
        "fact": "Crosses the 1890 Queens Bridge over the Yarra directly beside Eureka Tower.",
        "isGhost": false
      },
      {
        "name": "Anzac (Shrine of Remembrance & Domain Tram-Train Interchange)",
        "lat": -37.8318,
        "lon": 144.9718,
        "x": 8.79,
        "z": 23.23,
        "year": 2017,
        "lines": [
          "MT",
          "1",
          "16",
          "58"
        ],
        "fact": "Joins St Kilda Road at the Domain/Anzac tram-train interchange before heading east along Toorak Road.",
        "isGhost": false
      }
    ]
  }
];
