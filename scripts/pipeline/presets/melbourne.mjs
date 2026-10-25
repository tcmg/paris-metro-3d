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

export const MELBOURNE_PRESET = {
  cityId: 'melbourne',
  cityName: 'Melbourne',
  localName: 'Melbourne (Naarm)',
  countryName: 'Australia',
  region: 'Victoria (Wurundjeri & Boonwurrung Country)',
  tagline: 'CITY LOOP, 2025 METRO TUNNEL, YARRA TRAMS & HODDLE GRID • 3D ARCHITECTURE & TRANSIT',
  metroSystemName: 'PTV — Metro Trains Melbourne (City Loop & Metro Tunnel) & Yarra Trams Grid',
  timelineRange: [1854, 2026],
  geo: {
    centerLat: -37.8136,
    centerLon: 144.9631,
    bbox: [-37.855, 144.915, -37.775, 145.015],
    kmPerDegLat: 110.99,
    kmPerDegLon: 87.89,
    worldUnitsPerKm: 11.5,
    coreRadiusKm: 7.2,
    isCoastal: true,
    defaultElevationMeters: 8
  },
  topography: [
    // Eastern Hill (Parliament House, St Patrick's Cathedral & Fitzroy Gardens ridge)
    {
      name: 'Eastern Hill (Parliament & St Patrick’s Ridge)',
      lat: -37.8112,
      lon: 144.9738,
      peakElevationMeters: 42,
      radiusMeters: 1650,
      steepness: 1.7,
      ridgeAzimuthDeg: -28,
      ridgeElongation: 1.8
    },
    // Flagstaff Hill & Batman's Hill (Western Hoddle Grid Crest)
    {
      name: 'Flagstaff Hill (1840 Signal Station Crest)',
      lat: -37.8105,
      lon: 144.9545,
      peakElevationMeters: 34,
      radiusMeters: 1400,
      steepness: 1.8,
      ridgeAzimuthDeg: -28,
      ridgeElongation: 1.6
    },
    // Domain Hill & Shrine of Remembrance Knoll (South of the Yarra)
    {
      name: 'Domain Hill & Shrine of Remembrance Knoll',
      lat: -37.8305,
      lon: 144.9734,
      peakElevationMeters: 39,
      radiusMeters: 1750,
      steepness: 1.7,
      ridgeAzimuthDeg: -15,
      ridgeElongation: 1.7
    },
    // Carlton & Parkville University Plateau
    {
      name: 'Carlton Gardens & Parkville Plateau',
      lat: -37.8015,
      lon: 144.9665,
      peakElevationMeters: 44,
      radiusMeters: 2100,
      steepness: 1.5,
      ridgeAzimuthDeg: 0,
      ridgeElongation: 1.5
    }
  ],
  waterCenterlines: [
    // Yarra River (Birrarung) flowing from Richmond past MCG, Flinders Street, Southbank & Docklands into Hobson's Bay
    [-37.8295, 145.0085, 2.2],
    [-37.8255, 144.9915, 2.4],
    [-37.8205, 144.9775, 2.5],
    [-37.8190, 144.9679, 2.6],
    [-37.8206, 144.9610, 2.8],
    [-37.8225, 144.9535, 3.2],
    [-37.8195, 144.9415, 5.5],
    [-37.8240, 144.9220, 7.5],
    [-37.8450, 144.9160, 14.0]
  ],
  bridges: [
    {
      id: 'bridge-princes-bridge',
      name: 'Princes Bridge (1888 Victorian Bluestone & Cast-Iron Arch Bridge)',
      lat: -37.8190,
      lon: 144.9679,
      builtYear: 1888,
      lengthWorld: 3.1,
      widthWorld: 0.62,
      rotationY: -0.32,
      style: 'iron-arch'
    },
    {
      id: 'bridge-sandridge-rail',
      name: 'Sandridge Railway Bridge (1888 Five-Span Steel Truss Bridge)',
      lat: -37.8202,
      lon: 144.9628,
      builtYear: 1888,
      lengthWorld: 3.2,
      widthWorld: 0.50,
      rotationY: -0.65,
      style: 'iron-arch'
    },
    {
      id: 'bridge-queens-bridge',
      name: 'Queens Bridge (1890 Wrought-Iron Plate Girder Bridge)',
      lat: -37.8206,
      lon: 144.9610,
      builtYear: 1890,
      lengthWorld: 2.8,
      widthWorld: 0.58,
      rotationY: -0.25,
      style: 'iron-arch'
    },
    {
      id: 'bridge-spencer-street',
      name: 'Spencer Street & King Street Yarra Bridges',
      lat: -37.8220,
      lon: 144.9552,
      builtYear: 1930,
      lengthWorld: 3.0,
      widthWorld: 0.60,
      rotationY: -0.45,
      style: 'stone-arch'
    }
  ],
  parks: [
    {
      name: 'Royal Botanic Gardens & Kings Domain (1846)',
      lat: -37.8302,
      lon: 144.9796,
      rx: 8.8,
      rz: 7.4,
      rotation: -0.18,
      hasBasin: true
    },
    {
      name: 'Fitzroy Gardens & Treasury Gardens (1848)',
      lat: -37.8128,
      lon: 144.9802,
      rx: 5.5,
      rz: 6.2,
      rotation: 0.0,
      hasBasin: true
    },
    {
      name: 'Carlton Gardens (UNESCO World Heritage 1880 Exhibition Grounds)',
      lat: -37.8047,
      lon: 144.9717,
      rx: 4.5,
      rz: 5.4,
      rotation: 0.0,
      hasBasin: true
    },
    {
      name: 'Flagstaff Gardens (1862)',
      lat: -37.8105,
      lon: 144.9545,
      rx: 3.6,
      rz: 3.8,
      rotation: -0.48,
      hasBasin: false
    },
    {
      name: 'Yarra Park & Melbourne Sports Precinct (MCG)',
      lat: -37.8198,
      lon: 144.9834,
      rx: 6.8,
      rz: 5.2,
      rotation: -0.22,
      hasBasin: false
    }
  ],
  places: [
    {
      name: 'Federation Square & St Paul’s Crossroads',
      lat: -37.8178,
      lon: 144.9685,
      radius: 2.8
    },
    {
      name: 'Bourke Street Mall & Elizabeth Street Tram Hub',
      lat: -37.8142,
      lon: 144.9645,
      radius: 2.5
    },
    {
      name: 'Parliament Forecourt & Spring Street',
      lat: -37.8112,
      lon: 144.9728,
      radius: 2.6,
      hasColumnOrObelisk: true
    },
    {
      name: 'State Library Forecourt (Swanston & La Trobe Streets)',
      lat: -37.8098,
      lon: 144.9648,
      radius: 2.5
    },
    {
      name: 'Southbank Promenade & Queensbridge Square',
      lat: -37.8208,
      lon: 144.9632,
      radius: 2.4
    }
  ],
  monuments: [
    {
      id: 'monument-flinders-street',
      nodeName: 'Monument_flinders_street',
      name: 'Flinders Street Station (1910 Copper Dome & Entrance Clocks)',
      localName: 'Flinders Street Railway Station ("Under the Clocks")',
      lat: -37.8183,
      lon: 144.9671,
      builtYear: 1910,
      constructionStartYear: 1854,
      radius: 4.8,
      heightMeters: 52,
      era: 'belle_epoque',
      eraLabel: 'Edwardian Baroque Dome & 1854 First Australian Steam Terminus • 1910',
      connectedLines: ['CL', 'MT', 'SHM', 'MER', 'WIL', '35', '1'],
      style: 'Fawcett & Ashworth French Renaissance Copper Dome, Clock Tower & Yellow-and-Blood-Red Facade',
      arrondissement: 'Hoddle Grid South (Flinders & Swanston Streets)',
      rotationY: -0.49,
      scale: 0.95,
      archetype: 'clock_tower_terminus',
      primaryColor: '#e8b93c',
      secondaryColor: '#a6382b',
      accentColor: '#3d8c78',
      description:
        'Opened on September 12, 1854 as Melbourne Terminus for Australia’s first steam railway and rebuilt in 1905–1910 with its iconic bronze-green dome, Elizabeth Street clock tower, and nine departure indicator clocks.'
    },
    {
      id: 'monument-royal-exhibition',
      nodeName: 'Monument_royal_exhibition',
      name: 'Royal Exhibition Building (1880 UNESCO World Heritage Dome)',
      localName: 'Royal Exhibition Building (Carlton Gardens)',
      lat: -37.8047,
      lon: 144.9717,
      builtYear: 1880,
      constructionStartYear: 1879,
      radius: 4.8,
      heightMeters: 68,
      era: 'industrial',
      eraLabel: '1880 International Exhibition & 1901 First Australian Parliament',
      connectedLines: ['96', '86', 'CL'],
      style: 'Joseph Reed Florentine Duomo Octagonal Dome, Cruciform Great Hall & Triumphal Fanlight Portals',
      arrondissement: 'Carlton Gardens',
      rotationY: 0.0,
      scale: 0.92,
      archetype: 'baroque_dome_cathedral',
      primaryColor: '#eee6d5',
      secondaryColor: '#6d7885',
      accentColor: '#d4af37',
      description:
        'Designed by Joseph Reed for the 1880 Melbourne International Exhibition with a 68m octagonal dome inspired by Brunelleschi’s Florence Cathedral, it hosted the opening of the first Parliament of Australia on May 9, 1901.'
    },
    {
      id: 'monument-shrine-remembrance',
      nodeName: 'Monument_shrine_remembrance',
      name: 'Shrine of Remembrance (1934 Stepped Pyramid Mausoleum)',
      localName: 'Shrine of Remembrance (Kings Domain)',
      lat: -37.8305,
      lon: 144.9734,
      builtYear: 1934,
      constructionStartYear: 1927,
      radius: 4.5,
      heightMeters: 42,
      era: 'art_deco',
      eraLabel: 'Tynong Granite Classical Memorial & Ray of Light • 1934',
      connectedLines: ['MT', '1'],
      style: 'Hudson & Wardrop Parthenon Doric Portico & Stepped Pyramid of Halicarnassus',
      arrondissement: 'Kings Domain / St Kilda Road (Anzac Station)',
      rotationY: -0.25,
      scale: 0.92,
      archetype: 'domed_sandstone_arcade',
      primaryColor: '#e0dad0',
      secondaryColor: '#9e988e',
      accentColor: '#c9a648',
      description:
        'Designed by WWI veterans Phillip Hudson and James Wardrop in Tynong granite, its roof aperture is calibrated so a beam of sunlight sweeps across the word "LOVE" on the Stone of Remembrance at 11 a.m. every November 11.'
    },
    {
      id: 'monument-federation-square',
      nodeName: 'Monument_federation_square',
      name: 'Federation Square (2002 Deconstructivist Pinwheel Facades)',
      localName: 'Fed Square (Wurundjeri Tanderrum Civic Plaza)',
      lat: -37.8180,
      lon: 144.9691,
      builtYear: 2002,
      constructionStartYear: 1998,
      radius: 4.4,
      heightMeters: 30,
      era: 'contemporary',
      eraLabel: 'Centenary of Federation Civic Plaza & ACMI / NGV • 2002',
      connectedLines: ['CL', 'MT', '35', '1'],
      style: 'Lab Architecture Studio Kimberley Sandstone, Perforated Zinc & Glass Pinwheel Fractals over Rail Deck',
      arrondissement: 'Hoddle Grid / Yarra Riverfront',
      rotationY: -0.49,
      scale: 0.92,
      archetype: 'one_wtc_and_oculus',
      primaryColor: '#d99b66',
      secondaryColor: '#7b8c99',
      accentColor: '#3ab4c4',
      description:
        'Built on a massive structural deck bridging the Jolimont railyards opposite Flinders Street Station, Federation Square’s facade is tiled from 475,000 Kimberley sandstone cobbles and five self-similar "pinwheel" triangles.'
    },
    {
      id: 'monument-eureka-tower',
      nodeName: 'Monument_eureka_tower',
      name: 'Eureka Tower & Melbourne Skydeck (2006 24-Carat Gold Crown)',
      localName: 'Eureka Tower (Southbank)',
      lat: -37.8213,
      lon: 144.9647,
      builtYear: 2006,
      constructionStartYear: 2002,
      radius: 4.2,
      heightMeters: 297,
      era: 'contemporary',
      eraLabel: '297.3m Gold Rush & Eureka Stockade Skyscraper • 2006',
      connectedLines: ['CL', 'MT', '1'],
      style: 'Fender Katsalidis Cobalt-Blue Glass, 24-Carat Gold-Plated Top 10 Floors, Red Blood Stripe & Cantilevered Edge Cube',
      arrondissement: 'Southbank',
      rotationY: -0.22,
      scale: 0.92,
      archetype: 'empire_state_tower',
      primaryColor: '#1e5aa8',
      secondaryColor: '#f5f7fa',
      accentColor: '#f4c430',
      description:
        'Designed by Fender Katsalidis to commemorate the 1854 Victorian Gold Rush Eureka Stockade rebellion—combining a cobalt-blue and white stockade flag facade, a vertical crimson stripe, and 3,680 panes of 24-carat gold-plated glass on levels 83–92.'
    },
    {
      id: 'monument-mcg-stadium',
      nodeName: 'Monument_mcg_stadium',
      name: 'Melbourne Cricket Ground — The ’G (100,024-Seat Colosseum)',
      localName: 'Melbourne Cricket Ground (MCG)',
      lat: -37.8200,
      lon: 144.9834,
      builtYear: 1956,
      constructionStartYear: 1853,
      radius: 5.2,
      heightMeters: 85,
      era: 'modern',
      eraLabel: '1853 Birthplace of Test Cricket, 1859 AFL & 1956 Olympics',
      connectedLines: ['MER', 'SHM'],
      style: 'Circular 100,024-Seat Grandstand Bowl & Six 85m Tubular Steel Light Towers (1985)',
      arrondissement: 'Yarra Park (Jolimont / Richmond)',
      rotationY: 0.0,
      scale: 0.95,
      archetype: 'stadium_bowl',
      primaryColor: '#dde3ea',
      secondaryColor: '#2e8b57',
      accentColor: '#f4c430',
      description:
        'Founded in 1853, birthplace of Australian Rules Football (1859) and Test Cricket (1877), main stadium of the 1956 Melbourne Olympics, and largest stadium in the Southern Hemisphere with six 85-meter light towers.'
    },
    {
      id: 'monument-arts-centre-spire',
      nodeName: 'Monument_arts_centre_spire',
      name: 'Arts Centre Melbourne & 162m Ballerina Spire',
      localName: 'Arts Centre Melbourne (Theatres Building)',
      lat: -37.8215,
      lon: 144.9685,
      builtYear: 1984,
      constructionStartYear: 1973,
      radius: 4.0,
      heightMeters: 162,
      era: 'modern',
      eraLabel: 'Sir Roy Grounds Lattice Tutu Spire • 1984 / 1996',
      connectedLines: ['CL', 'MT', '1'],
      style: '162m White Steel Space-Frame Spire & Cascading Ballerina Tutu Mesh Skirt',
      arrondissement: 'Southbank Arts Precinct (St Kilda Road)',
      rotationY: -0.25,
      scale: 0.94,
      archetype: 'observation_needle',
      primaryColor: '#f4f6f9',
      secondaryColor: '#b89448',
      accentColor: '#38b6ff',
      description:
        'Because waterlogged Yarra River silt prevented building high theater fly-towers above ground, architect Sir Roy Grounds sank the State Theatre five levels underground and crowned the roof with a 162-meter lattice spire.'
    },
    {
      id: 'monument-bolte-bridge',
      nodeName: 'Monument_bolte_bridge',
      name: 'Bolte Bridge (1999 Twin 140m Silver Needle Towers)',
      localName: 'Bolte Bridge (Docklands Yarra Crossing)',
      lat: -37.8168,
      lon: 144.9381,
      builtYear: 1999,
      constructionStartYear: 1996,
      radius: 5.0,
      heightMeters: 140,
      era: 'contemporary',
      eraLabel: 'Denton Corker Marshall Sculptural Cantilever Towers • 1999',
      connectedLines: ['35', '86'],
      style: 'Balanced Cantilever Box-Girder Viaduct & Twin 140m Tapering Silver Concrete Obelisks',
      arrondissement: 'Docklands / Victoria Harbour',
      rotationY: 0.08,
      scale: 1.0,
      archetype: 'twin_tower_gateway',
      primaryColor: '#cfd6de',
      secondaryColor: '#8d99a6',
      accentColor: '#f4b942',
      description:
        'Designed by Melbourne architects Denton Corker Marshall as the western gateway to the city, its two 140-meter tapering silver concrete needles rise without structural cables on either side of the Yarra River deck.'
    }
  ],
  milestones: [
    {
      year: 1854,
      title: 'Australia’s First Steam Railway (Flinders Street to Sandridge)',
      description: 'On September 12, 1854, the Melbourne and Hobson’s Bay Railway Company runs Australia’s first steam passenger train from Flinders Street to Port Melbourne.',
      category: 'metro'
    },
    {
      year: 1880,
      title: 'Royal Exhibition Building & World’s Largest Cable Tramway',
      description: 'Fuelled by the Victorian Gold Rush ("Marvellous Melbourne"), the Royal Exhibition Building opens in 1880 followed in 1885 by one of the world’s largest cable tram networks.',
      category: 'architecture'
    },
    {
      year: 1910,
      title: 'Flinders Street Station Dome & Clocks Completed',
      description: 'Fawcett & Ashworth’s Edwardian Baroque station opens along the Yarra River; by 1926 its electric suburban lines make it the busiest passenger station in the world.',
      category: 'metro'
    },
    {
      year: 1923,
      title: 'Iconic Green-and-Gold W-Class Trams Debut',
      description: 'The Melbourne & Metropolitan Tramways Board introduces the drop-centre W-Class electric tram, becoming the rolling cultural symbol of Melbourne.',
      category: 'culture'
    },
    {
      year: 1956,
      title: '1956 Melbourne Olympic Games at the MCG',
      description: 'The Melbourne Cricket Ground hosts the XVI Olympiad, the first Olympic Games held in the Southern Hemisphere.',
      category: 'culture'
    },
    {
      year: 1981,
      title: 'Melbourne Underground Rail Loop (City Loop) Opens',
      description: 'Museum (Melbourne Central) and Parliament stations open in 1981, followed by Flagstaff in 1985, wrapping the Hoddle Grid in a four-tunnel underground loop.',
      category: 'metro'
    },
    {
      year: 2002,
      title: 'Federation Square & Eureka Skydeck (2006)',
      description: 'Federation Square decks over the Jolimont rail yards opposite Flinders Street, while Eureka Tower rises 297.3m above Southbank with a 24-carat gold crown.',
      category: 'architecture'
    },
    {
      year: 2025,
      title: 'Metro Tunnel (Twin 9 km Deep-Bore Cross-City Rail)',
      description: 'Melbourne’s biggest rail transformation since the 1981 City Loop opens five new underground stations—Arden, Parkville, State Library, Town Hall, and Anzac.',
      category: 'metro'
    }
  ],
  eras: [
    {
      id: 'melbourne_era_1',
      name: 'Wurundjeri Country, Hoddle Grid & 1854 First Steam Railway',
      yearRange: [1837, 1879],
      tagline: '1837–1879 • Hoddle Grid (-28°), Victorian Gold Rush & Sandridge Line',
      summary: 'Surveyor Robert Hoddle lays out the 1837 street grid aligned to the Yarra River before the 1851 Victorian Gold Rush makes Melbourne one of the richest cities on Earth.'
    },
    {
      id: 'melbourne_era_2',
      name: 'Marvellous Melbourne, Federation & Flinders Street Clocks',
      yearRange: [1880, 1939],
      tagline: '1880–1939 • Royal Exhibition Building, Cable/W-Class Trams & Shrine of Remembrance',
      summary: 'Melbourne serves as Australia’s temporary federal capital (1901–1927), electrifies its suburban railways (1919), and builds the Shrine of Remembrance (1934).'
    },
    {
      id: 'melbourne_era_3',
      name: 'Olympic City, Arts Centre Spire & The 1981 Underground City Loop',
      yearRange: [1945, 1999],
      tagline: '1945–1999 • 1956 MCG Olympics, MURL Underground Loop & Bolte Bridge',
      summary: 'The four-tube Melbourne Underground Rail Loop (1981–1985) rings the CBD while Sir Roy Grounds’ Arts Centre Spire anchors the St Kilda Road cultural boulevard.'
    },
    {
      id: 'melbourne_era_4',
      name: 'Fed Square, Gold-Crowned Southbank & The 2025 Metro Tunnel',
      yearRange: [2000, 2026],
      tagline: '2000–2026 • Federation Square, Eureka Tower & Twin 9km Metro Tunnel',
      summary: 'High-capacity low-floor trams and the 2025 Metro Tunnel link Parkville University, Swanston Street, and the Shrine of Remembrance into a through-running metro spine.'
    }
  ],
  metroLines: [
    {
      line: 'CL',
      name: 'City Loop (MURL Underground & Viaduct Loop) — Flinders St ↔ Southern Cross ↔ Flagstaff ↔ Melbourne Central ↔ Parliament ↔ Flinders St',
      color: '#0072ce',
      textColor: '#ffffff',
      openedYear: 1981,
      rollingStockStyle: 'Metro Trains Melbourne (X’Trapolis 100 / Comeng 4-Tube Loop)',
      stations: [
        {
          name: 'Flinders Street (Under the Clocks)',
          lat: -37.8183,
          lon: 144.9671,
          year: 1854,
          fact: 'Southern anchor of the City Loop and interchange with the 2025 Metro Tunnel at Town Hall Station.'
        },
        {
          name: 'Southern Cross (Spencer Street Wave Roof)',
          lat: -37.8184,
          lon: 144.9525,
          year: 1859,
          fact: 'Linked to Flinders Street via the 1891 four-track Flinders Street Viaduct and crowned in 2006 by Grimshaw’s undulating dune roof.'
        },
        {
          name: 'Flagstaff (Underground City Loop)',
          lat: -37.8119,
          lon: 144.9562,
          year: 1985,
          fact: 'Final station of the Melbourne Underground Rail Loop to open on May 27, 1985 beneath Flagstaff Gardens.'
        },
        {
          name: 'Melbourne Central (Museum Underground & Shot Tower Cone)',
          lat: -37.8102,
          lon: 144.9628,
          year: 1981,
          fact: 'Opened January 24, 1981 as "Museum" station directly beneath Kisho Kurokawa’s 20-storey glass cone enclosing the 1889 Coop’s Shot Tower.'
        },
        {
          name: 'Parliament (Deepest City Loop Station at -37m)',
          lat: -37.8112,
          lon: 144.9728,
          year: 1983,
          fact: 'Excavated 37 meters below Spring Street and Parliament House, featuring Melbourne’s longest southern-hemisphere escalators.'
        },
        {
          name: 'Flinders Street (Loop Closure)',
          lat: -37.8183,
          lon: 144.9671,
          year: 1981,
          fact: 'Completes the four-tunnel City Loop circuit around the 1837 Hoddle Grid.'
        }
      ]
    },
    {
      line: 'MT',
      name: 'Metro Tunnel Line (2025 Cross-City Underground Spine) — North Melbourne / Arden ↔ Parkville ↔ State Library ↔ Town Hall ↔ Anzac ↔ South Yarra',
      color: '#00a8e8',
      textColor: '#10141c',
      openedYear: 2025,
      rollingStockStyle: 'Metro Trains Melbourne (High Capacity Metro Train HCMT 7-Car)',
      stations: [
        {
          name: 'Arden (North Melbourne Brick-Arch Precinct)',
          lat: -37.8005,
          lon: 144.9388,
          year: 2025,
          fact: 'Western underground Metro Tunnel station featuring soaring brick arches inspired by North Melbourne’s industrial heritage.'
        },
        {
          name: 'Parkville (University of Melbourne & Hospital Hub)',
          lat: -37.7988,
          lon: 144.9598,
          year: 2025,
          fact: 'Brings heavy underground metro rail directly to the University of Melbourne and Royal Melbourne Hospital beneath Grattan Street.'
        },
        {
          name: 'State Library (Melbourne Central North Interchange)',
          lat: -37.8098,
          lon: 144.9648,
          year: 2025,
          fact: 'Mined 36 meters beneath Swanston Street as a trinocular cavern with direct underground transfer to Melbourne Central.'
        },
        {
          name: 'Town Hall (Flinders Street & Fed Square Underground)',
          lat: -37.8165,
          lon: 144.9668,
          year: 2025,
          fact: 'Cathedral-scale underground station beneath southern Swanston Street with direct subterranean walkway into Flinders Street Station and Federation Square.'
        },
        {
          name: 'Anzac (Shrine of Remembrance & Domain Tram-Train Interchange)',
          lat: -37.8318,
          lon: 144.9718,
          year: 2025,
          fact: 'Features a sweeping timber canopy on St Kilda Road allowing direct step-free transfer between St Kilda Road trams and deep underground Metro Tunnel trains.'
        },
        {
          name: 'South Yarra / Hawksburn (Eastern Portal)',
          lat: -37.8388,
          lon: 144.9925,
          year: 1860,
          fact: 'Eastern portal where the twin 9 km Metro Tunnel surfaces to join the Cranbourne and Pakenham lines.'
        }
      ]
    },
    {
      line: 'SHM',
      name: 'Sandringham Line — Flinders Street ↔ Richmond ↔ South Yarra ↔ Prahran ↔ Windsor',
      color: '#f27ea6',
      textColor: '#10141c',
      openedYear: 1859,
      rollingStockStyle: 'Melbourne & Suburban Railway (1859) / Metro Trains (Siemens Nexas)',
      stations: [
        {
          name: 'Flinders Street (Under the Clocks)',
          lat: -37.8183,
          lon: 144.9671,
          year: 1854,
          fact: 'Departs the eastern Jolimont rail yards past Federation Square.'
        },
        {
          name: 'Richmond (10-Platform Eastern Junction)',
          lat: -37.8240,
          lon: 144.9902,
          year: 1859,
          fact: 'Elevated bluestone and brick viaduct junction serving the MCG and Swan Street.'
        },
        {
          name: 'South Yarra / Hawksburn (Eastern Portal)',
          lat: -37.8388,
          lon: 144.9925,
          year: 1860,
          fact: 'Connects Chapel Street and Toorak Road.'
        },
        {
          name: 'Prahran (Greville Street)',
          lat: -37.8492,
          lon: 144.9898,
          year: 1860,
          fact: 'Serves Prahran Market and Chapel Street.'
        },
        {
          name: 'Windsor',
          lat: -37.8545,
          lon: 144.9918,
          year: 1859,
          fact: 'Historic 1880s Victorian brick station buildings on the bayside Sandringham line.'
        }
      ]
    },
    {
      line: 'MER',
      name: 'Mernda & Hurstbridge Line — Flinders Street ↔ Jolimont (MCG) ↔ West Richmond ↔ Collingwood ↔ Clifton Hill',
      color: '#e4002b',
      textColor: '#ffffff',
      openedYear: 1888,
      rollingStockStyle: 'Victorian Railways (1901 Direct Route) / Metro Trains X’Trapolis',
      stations: [
        {
          name: 'Flinders Street (Under the Clocks)',
          lat: -37.8183,
          lon: 144.9671,
          year: 1854,
          fact: 'Connects directly into the Clifton Hill group and Parliament City Loop tunnel.'
        },
        {
          name: 'Jolimont (MCG & Yarra Park)',
          lat: -37.8165,
          lon: 144.9840,
          year: 1901,
          fact: 'Primary match-day station on the northern edge of Yarra Park directly outside the Melbourne Cricket Ground.'
        },
        {
          name: 'West Richmond',
          lat: -37.8148,
          lon: 144.9915,
          year: 1901,
          fact: 'Opened in October 1901 in a deep cutting through Hoddle Street.'
        },
        {
          name: 'North Richmond',
          lat: -37.8105,
          lon: 144.9925,
          year: 1901,
          fact: 'Elevated station overlooking Victoria Street ("Little Saigon").'
        },
        {
          name: 'Collingwood',
          lat: -37.8045,
          lon: 144.9935,
          year: 1901,
          fact: 'Serves the Collingwood Town Hall and Abbotsford Convent precinct.'
        },
        {
          name: 'Clifton Hill (Mernda & Hurstbridge Junction)',
          lat: -37.7885,
          lon: 144.9952,
          year: 1888,
          fact: 'Northern inner-city junction where the Mernda (former Inner Circle) and Hurstbridge lines diverge.'
        }
      ]
    },
    {
      line: 'WIL',
      name: 'Williamstown, Werribee & 1854 Sandridge Heritage Line — Flinders St ↔ Southern Cross ↔ North Melbourne ↔ Port Melbourne',
      color: '#009645',
      textColor: '#ffffff',
      openedYear: 1854,
      rollingStockStyle: 'Melbourne & Hobson’s Bay Railway (1854 First Australian Steam Line)',
      stations: [
        {
          name: 'North Melbourne (Western Junction)',
          lat: -37.8072,
          lon: 144.9425,
          year: 1859,
          fact: 'Six-platform junction where the Williamstown, Werribee, Sunbury, Craigieburn, and Upfield lines converge.'
        },
        {
          name: 'Southern Cross (Spencer Street Wave Roof)',
          lat: -37.8184,
          lon: 144.9525,
          year: 1859,
          fact: 'Regional V/Line and interstate XPT terminus.'
        },
        {
          name: 'Flinders Street (Under the Clocks)',
          lat: -37.8183,
          lon: 144.9671,
          year: 1854,
          fact: 'Inaugural city terminus of the September 12, 1854 steam railway to Sandridge (Port Melbourne).'
        },
        {
          name: 'Montague (1883–1987 Former Heavy Rail • Light Rail 109)',
          lat: -37.8275,
          lon: 144.9495,
          year: 1883,
          fact: 'Served the original Port Melbourne steam and electric railway across the Sandridge Bridge before conversion to Light Rail 109 in 1987.'
        },
        {
          name: 'Port Melbourne / Sandridge Pier (1854 First Australian Steam Terminus • Heavy Rail Ghost)',
          lat: -37.8412,
          lon: 144.9325,
          year: 1854,
          isGhost: true,
          fact: 'Opened September 12, 1854 as Australia’s first steam railway station at Station Pier on Hobson’s Bay; converted from heavy broad-gauge rail to light-rail tram 109 in 1987 with its heritage bluestone platforms preserved.'
        }
      ]
    },
    {
      line: 'PKM',
      name: 'Pakenham & Cranbourne Caulfield Group Metro Line — Parliament ↔ Melbourne Central ↔ Flagstaff ↔ Southern Cross ↔ Flinders St ↔ Richmond ↔ South Yarra ↔ Toorak',
      color: '#279fd5',
      textColor: '#ffffff',
      openedYear: 1879,
      rollingStockStyle: 'Metro Trains Melbourne (High Capacity Metro Train HCMT)',
      stations: [
        {
          name: 'Melbourne Central (Museum Underground & Shot Tower Cone)',
          lat: -37.8102,
          lon: 144.9628,
          year: 1981,
          fact: 'Caulfield Group City Loop underground platform.'
        },
        {
          name: 'Parliament (Deepest City Loop Station at -37m)',
          lat: -37.8112,
          lon: 144.9728,
          year: 1983,
          fact: 'Eastern City Loop portal before descending to the Jolimont yards.'
        },
        {
          name: 'Flinders Street (Under the Clocks)',
          lat: -37.8183,
          lon: 144.9671,
          year: 1854,
          fact: 'Central Yarra River interchange.'
        },
        {
          name: 'Richmond (10-Platform Eastern Junction)',
          lat: -37.8240,
          lon: 144.9902,
          year: 1859,
          fact: 'Major eastern rail viaduct.'
        },
        {
          name: 'South Yarra / Hawksburn (Eastern Portal)',
          lat: -37.8388,
          lon: 144.9925,
          year: 1860,
          fact: 'Where the 2025 Metro Tunnel joins the four-track Caulfield corridor.'
        },
        {
          name: 'Toorak (Armadale Elevated Skyrail Corridor)',
          lat: -37.8508,
          lon: 145.0115,
          year: 1879,
          fact: 'Southeastern trunk heading toward Caulfield, Dandenong, Cranbourne, and Pakenham.'
        }
      ]
    },
    {
      line: '35',
      name: 'City Circle Tram 35 (Free Heritage W-Class Loop) — Flinders St ↔ Parliament ↔ La Trobe St ↔ Docklands ↔ Flinders St',
      color: '#78be20',
      textColor: '#10141c',
      openedYear: 1994,
      rollingStockStyle: 'Yarra Trams (1923–1956 Heritage Green & Gold W-Class Trams)',
      stations: [
        {
          name: 'Flinders Street (Under the Clocks)',
          lat: -37.8183,
          lon: 144.9671,
          year: 1923,
          fact: 'Heritage W-Class trams rumble along Flinders Street past St Paul’s Cathedral and Federation Square.'
        },
        {
          name: 'Parliament (Deepest City Loop Station at -37m)',
          lat: -37.8112,
          lon: 144.9728,
          year: 1923,
          fact: 'Turns north along Spring Street past the 1856 Parliament House colonnade and Princess Theatre.'
        },
        {
          name: 'State Library (Melbourne Central North Interchange)',
          lat: -37.8098,
          lon: 144.9648,
          year: 1923,
          fact: 'Runs west along La Trobe Street past the 1913 octagonal Dome Reading Room of State Library Victoria.'
        },
        {
          name: 'Flagstaff (Underground City Loop)',
          lat: -37.8119,
          lon: 144.9562,
          year: 1923,
          fact: 'Passes Flagstaff Gardens and the historic Royal Mint.'
        },
        {
          name: 'Victoria Harbour / Docklands (Bolte Bridge View)',
          lat: -37.8185,
          lon: 144.9435,
          year: 2003,
          fact: 'Loops around Waterfront City and Marvel Stadium overlooking the twin 140m towers of the Bolte Bridge.'
        },
        {
          name: 'Southern Cross (Spencer Street Wave Roof)',
          lat: -37.8184,
          lon: 144.9525,
          year: 1923,
          fact: 'Returns south along Spencer Street to Flinders Street.'
        },
        {
          name: 'Flinders Street (City Circle Loop Closure)',
          lat: -37.8183,
          lon: 144.9671,
          year: 1994,
          fact: 'Completes the clockwise and counter-clockwise W-Class heritage loop.'
        }
      ]
    },
    {
      line: '96',
      name: 'Tram Route 96 (Light Rail) — Carlton / Royal Exhibition Building ↔ Bourke St Mall ↔ Southern Cross ↔ Albert Park',
      color: '#c6007e',
      textColor: '#ffffff',
      openedYear: 1887,
      rollingStockStyle: 'Yarra Trams (Bombardier E-Class Low-Floor Light Rail)',
      stations: [
        {
          name: 'Nicholson Street / Carlton Gardens (Royal Exhibition Building)',
          lat: -37.8047,
          lon: 144.9735,
          year: 1887,
          fact: 'Glides along Nicholson Street directly beside the UNESCO-listed 1880 Royal Exhibition Building.'
        },
        {
          name: 'Parliament (Deepest City Loop Station at -37m)',
          lat: -37.8112,
          lon: 144.9728,
          year: 1887,
          fact: 'Swings from Nicholson Street onto Bourke Street at the top of Eastern Hill.'
        },
        {
          name: 'Bourke Street Mall (Elizabeth & Swanston Tram Crossroads)',
          lat: -37.8142,
          lon: 144.9645,
          year: 1887,
          fact: 'Pedestrianized retail heart of the Hoddle Grid flanked by the 1892 Block Arcade and Royal Arcade.'
        },
        {
          name: 'Southern Cross (Spencer Street Wave Roof)',
          lat: -37.8184,
          lon: 144.9525,
          year: 1987,
          fact: 'Leaves the Hoddle Grid to cross the Yarra on its dedicated light-rail reservation.'
        },
        {
          name: 'South Melbourne (1857 Former St Kilda Railway Heritage Station)',
          lat: -37.8322,
          lon: 144.9595,
          year: 1857,
          fact: 'Preserves its 1880s Victorian railway verandas from the 1857 St Kilda broad-gauge railway (converted to Route 96 light rail in 1987).'
        },
        {
          name: 'Albert Park (Formula 1 Grand Prix Lake Circuit)',
          lat: -37.8428,
          lon: 144.9578,
          year: 1857,
          fact: 'Historic 1857 railway station serving Albert Park Lake on the run down to St Kilda Beach.'
        }
      ]
    },
    {
      line: '86',
      name: 'Tram Route 86 — Docklands ↔ Bourke Street Mall ↔ Parliament ↔ Smith Street (Fitzroy & Collingwood)',
      color: '#ffb81c',
      textColor: '#10141c',
      openedYear: 1886,
      rollingStockStyle: 'Yarra Trams (Bombardier E-Class Fitzroy – Bourke St Spine)',
      stations: [
        {
          name: 'Victoria Harbour / Docklands (Bolte Bridge View)',
          lat: -37.8185,
          lon: 144.9435,
          year: 2005,
          fact: 'Western waterfront terminus of Route 86 in Docklands.'
        },
        {
          name: 'Southern Cross (Spencer Street Wave Roof)',
          lat: -37.8184,
          lon: 144.9525,
          year: 1886,
          fact: 'Climbs Bourke Street Hill from Spencer Street.'
        },
        {
          name: 'Bourke Street Mall (Elizabeth & Swanston Tram Crossroads)',
          lat: -37.8142,
          lon: 144.9645,
          year: 1886,
          fact: 'Shares the central Bourke Street trunk with Route 96.'
        },
        {
          name: 'Parliament (Deepest City Loop Station at -37m)',
          lat: -37.8112,
          lon: 144.9728,
          year: 1886,
          fact: 'Passes the Windsor Hotel and Parliament Gardens.'
        },
        {
          name: 'Gertrude & Smith Streets (Fitzroy Bohemian Hub)',
          lat: -37.8062,
          lon: 144.9832,
          year: 1886,
          fact: 'Melbourne’s premier live-music, coffee, and Victorian cast-iron lacework boulevard dividing Fitzroy and Collingwood.'
        },
        {
          name: 'Clifton Hill (Mernda & Hurstbridge Junction)',
          lat: -37.7885,
          lon: 144.9952,
          year: 1886,
          fact: 'Continues northeast along Queens Parade toward Northcote and Bundoora.'
        }
      ]
    },
    {
      line: '1',
      name: 'Tram Route 1 (Swanston Street & St Kilda Road Spine) — Melbourne University ↔ State Library ↔ Flinders St ↔ Arts Centre ↔ Shrine (Anzac)',
      color: '#00a88f',
      textColor: '#ffffff',
      openedYear: 1885,
      rollingStockStyle: 'Yarra Trams (Swanston Street Civic & Cultural Boulevard)',
      stations: [
        {
          name: 'Parkville (University of Melbourne & Hospital Hub)',
          lat: -37.7988,
          lon: 144.9638,
          year: 1885,
          fact: 'Northern Swanston Street hub serving the University of Melbourne.'
        },
        {
          name: 'State Library (Melbourne Central North Interchange)',
          lat: -37.8098,
          lon: 144.9648,
          year: 1885,
          fact: 'Stops in front of the 1854 State Library Victoria and RMIT University.'
        },
        {
          name: 'Town Hall (Flinders Street & Fed Square Underground)',
          lat: -37.8165,
          lon: 144.9668,
          year: 1885,
          fact: 'Passes Melbourne Town Hall, Manchester Unity Building (1932), and St Paul’s Cathedral.'
        },
        {
          name: 'Flinders Street (Under the Clocks)',
          lat: -37.8183,
          lon: 144.9671,
          year: 1885,
          fact: 'Crosses the 1888 Princes Bridge over the Yarra River with panoramic views of the CBD skyline.'
        },
        {
          name: 'Arts Centre & NGV (Southbank Cultural Precinct)',
          lat: -37.8215,
          lon: 144.9685,
          year: 1885,
          fact: 'Serves Sir Roy Grounds’ 1968 National Gallery of Victoria waterwall and 1984 Arts Centre Spire.'
        },
        {
          name: 'Anzac (Shrine of Remembrance & Domain Tram-Train Interchange)',
          lat: -37.8318,
          lon: 144.9718,
          year: 1885,
          fact: 'Frames the ceremonial axial view of the Shrine of Remembrance along tree-lined St Kilda Road.'
        }
      ]
    },
    {
      line: '109',
      name: 'Light Rail Route 109 (Port Melbourne – Box Hill) — Station Pier ↔ Montague ↔ Southbank / Crown ↔ Collins Street ↔ Parliament ↔ East Melbourne',
      color: '#f58220',
      textColor: '#10141c',
      openedYear: 1987,
      rollingStockStyle: 'Yarra Trams (Citadis C1 & E-Class Port Melbourne Light Rail)',
      stations: [
        {
          name: 'Port Melbourne / Sandridge Pier (1854 First Australian Steam Terminus • Heavy Rail Ghost)',
          lat: -37.8412,
          lon: 144.9325,
          year: 1987,
          fact: 'Converted in December 1987 from the 1854 Sandridge heavy-rail line into Melbourne’s first segregated high-speed light rail corridor.'
        },
        {
          name: 'North Port (1859 Heritage Brick Railway Station on Light Rail)',
          lat: -37.8338,
          lon: 144.9415,
          year: 1859,
          fact: 'Retains its original 19th-century Victorian Railways station buildings alongside the low-floor light rail platforms.'
        },
        {
          name: 'Montague (1883–1987 Former Heavy Rail • Light Rail 109)',
          lat: -37.8275,
          lon: 144.9495,
          year: 1883,
          fact: 'Approaches the Yarra River and Southbank.'
        },
        {
          name: 'Southbank / Casino East (Queensbridge)',
          lat: -37.8225,
          lon: 144.9598,
          year: 1987,
          fact: 'Crosses the Yarra River onto Spencer and Collins Streets.'
        },
        {
          name: 'Southern Cross (Spencer Street Wave Roof)',
          lat: -37.8184,
          lon: 144.9525,
          year: 1886,
          fact: 'Turns onto Collins Street—Melbourne’s grand Victorian banking boulevard.'
        },
        {
          name: 'Town Hall (Flinders Street & Fed Square Underground)',
          lat: -37.8165,
          lon: 144.9668,
          year: 1886,
          fact: 'Climbs the "Paris End" of Collins Street past plane trees, Regent Theatre, and 1880s Venetian Gothic banks.'
        },
        {
          name: 'Parliament (Deepest City Loop Station at -37m)',
          lat: -37.8112,
          lon: 144.9728,
          year: 1886,
          fact: 'Passes Old Treasury Building (1862) and St Patrick’s Cathedral along Victoria Parade.'
        }
      ]
    },
    {
      line: '11',
      name: 'Tram Route 11 (Collins Street & Fitzroy Spine) — Victoria Harbour Docklands ↔ Collins Street ↔ Parliament ↔ Brunswick Street Fitzroy',
      color: '#6cbe45',
      textColor: '#10141c',
      openedYear: 1886,
      rollingStockStyle: 'Yarra Trams (Bombardier E-Class Low-Floor Tram)',
      stations: [
        {
          name: 'Victoria Harbour / Docklands (Bolte Bridge View)',
          lat: -37.8185,
          lon: 144.9435,
          year: 2002,
          fact: 'Runs the full length of the Collins Street extension into Victoria Harbour.'
        },
        {
          name: 'Southern Cross (Spencer Street Wave Roof)',
          lat: -37.8184,
          lon: 144.9525,
          year: 1886,
          fact: 'Connects Docklands with the Hoddle Grid.'
        },
        {
          name: 'Town Hall (Flinders Street & Fed Square Underground)',
          lat: -37.8165,
          lon: 144.9668,
          year: 1886,
          fact: 'Collins & Swanston Street intersection.'
        },
        {
          name: 'Parliament (Deepest City Loop Station at -37m)',
          lat: -37.8112,
          lon: 144.9728,
          year: 1886,
          fact: 'Swings past Parliament House toward Fitzroy.'
        },
        {
          name: 'Nicholson Street / Carlton Gardens (Royal Exhibition Building)',
          lat: -37.8047,
          lon: 144.9735,
          year: 1886,
          fact: 'Passes the southern entrance of Carlton Gardens and Melbourne Museum.'
        },
        {
          name: 'Brunswick Street (Fitzroy Street-Art & Café Mile)',
          lat: -37.7985,
          lon: 144.9785,
          year: 1886,
          fact: 'Glides down bohemian Brunswick Street—originally one of Melbourne’s first 1886 cable tram corridors.'
        }
      ]
    },
    {
      line: '16',
      name: 'Tram Route 16 (St Kilda Beach & Esplanade Boulevard) — Melbourne University ↔ Swanston St ↔ Flinders St ↔ Shrine ↔ St Kilda Junction',
      color: '#f9a51b',
      textColor: '#10141c',
      openedYear: 1888,
      rollingStockStyle: 'Yarra Trams (Alstom Citadis / Z3 St Kilda Beach Line)',
      stations: [
        {
          name: 'Parkville (University of Melbourne & Hospital Hub)',
          lat: -37.7988,
          lon: 144.9638,
          year: 1888,
          fact: 'Departs the Melbourne University terminuses on Swanston Street.'
        },
        {
          name: 'State Library (Melbourne Central North Interchange)',
          lat: -37.8098,
          lon: 144.9648,
          year: 1888,
          fact: 'Shares the car-free Swanston Street tramway transit mall.'
        },
        {
          name: 'Flinders Street (Under the Clocks)',
          lat: -37.8183,
          lon: 144.9671,
          year: 1888,
          fact: 'Crosses Princes Bridge over the Yarra.'
        },
        {
          name: 'Arts Centre & NGV (Southbank Cultural Precinct)',
          lat: -37.8215,
          lon: 144.9685,
          year: 1888,
          fact: 'Runs down the tree-shaded tram tracks of St Kilda Road.'
        },
        {
          name: 'Anzac (Shrine of Remembrance & Domain Tram-Train Interchange)',
          lat: -37.8318,
          lon: 144.9718,
          year: 1888,
          fact: 'Connects with the 2025 Metro Tunnel beneath Kings Domain.'
        },
        {
          name: 'St Kilda Junction (Fitzroy Street & Albert Park Gateway)',
          lat: -37.8525,
          lon: 144.9808,
          year: 1888,
          fact: 'Where Route 16 turns down palm-lined Fitzroy Street to the St Kilda Esplanade, Palais Theatre, and 1912 Luna Park.'
        }
      ]
    },
    {
      line: '58',
      name: 'Tram Route 58 (Royal Park, William Street & Southbank) — Parkville ↔ Flagstaff ↔ Bourke St ↔ Queensbridge (Eureka) ↔ Anzac ↔ Toorak',
      color: '#8a8d8f',
      textColor: '#ffffff',
      openedYear: 1955,
      rollingStockStyle: 'Yarra Trams (E-Class William Street & Kings Way Corridor)',
      stations: [
        {
          name: 'Parkville (University of Melbourne & Hospital Hub)',
          lat: -37.7988,
          lon: 144.9555,
          year: 1955,
          fact: 'Runs through the native eucalyptus bushland of Royal Park and the hospital precinct.'
        },
        {
          name: 'Flagstaff (Underground City Loop)',
          lat: -37.8119,
          lon: 144.9562,
          year: 1885,
          fact: 'Descends William Street past Flagstaff Gardens and the Supreme Court of Victoria.'
        },
        {
          name: 'Bourke Street Mall (Elizabeth & Swanston Tram Crossroads)',
          lat: -37.8142,
          lon: 144.9592,
          year: 1885,
          fact: 'Intersects the Bourke and Collins Street tram corridors.'
        },
        {
          name: 'Southbank / Casino East (Queensbridge)',
          lat: -37.8225,
          lon: 144.9598,
          year: 1890,
          fact: 'Crosses the 1890 Queens Bridge over the Yarra directly beside Eureka Tower.'
        },
        {
          name: 'Anzac (Shrine of Remembrance & Domain Tram-Train Interchange)',
          lat: -37.8318,
          lon: 144.9718,
          year: 2017,
          fact: 'Joins St Kilda Road at the Domain/Anzac tram-train interchange before heading east along Toorak Road.'
        }
      ]
    }
  ],
  railTermini: [
    {
      id: 'gl-flinders-street',
      metroStationId: 'flinders-street',
      monumentId: 'monument-flinders-street',
      name: 'Flinders Street Railway Station (1854 / 1910 Suburban & Gippsland Hub)',
      shortName: 'FLINDERS ST',
      historicCompany: 'Melbourne & Hobson’s Bay Railway (1854) / Victorian Railways (1910)',
      modernNetwork: 'Metro Trains Melbourne (15 Suburban Lines) • V/Line Gippsland',
      openedYear: 1854,
      trainStartYear: 1854,
      trainEndYear: 2026,
      buildingEndYear: 2026,
      arrondissement: 'Hoddle Grid South (Yarra River)',
      destinationLabel: 'TO SANDRINGHAM • FRANKSTON • PAKENHAM • MERNDA • BELGRAVE',
      colorHex: '#e8b93c',
      lat: -37.8183,
      lon: 144.9671,
      rotationY: -0.49,
      trackCount: 13,
      shedWidth: 2.9,
      shedLength: 3.8,
      shedHeight: 0.94,
      shedSpans: 3,
      hasClockTower: true,
      description:
        'Australia’s first city railway station (1854), stretching 708 meters along the north bank of the Yarra River with Platform 1—the fourth-longest railway platform in the world.',
      corridorLatLon: [
        [-37.8183, 144.9671],
        [-37.8195, 144.9765],
        [-37.8240, 144.9902],
        [-37.8265, 145.0085]
      ]
    },
    {
      id: 'gl-southern-cross',
      metroStationId: 'southern-cross',
      name: 'Southern Cross Station (Spencer Street • V/Line, XPT & Overland Terminus)',
      shortName: 'SOUTHERN CROSS',
      historicCompany: 'Victorian Railways Spencer Street (1859) / Grimshaw Wave Roof (2006)',
      modernNetwork: 'V/Line Regional Rail • NSW TrainLink XPT to Sydney • The Overland to Adelaide',
      openedYear: 1859,
      trainStartYear: 1859,
      trainEndYear: 2026,
      buildingEndYear: 2026,
      arrondissement: 'Hoddle Grid West / Docklands',
      destinationLabel: 'TO GEELONG • BALLARAT • BENDIGO • SYDNEY (XPT) • ADELAIDE',
      colorHex: '#0072ce',
      lat: -37.8184,
      lon: 144.9525,
      rotationY: 1.08,
      trackCount: 10,
      shedWidth: 2.8,
      shedLength: 3.5,
      shedHeight: 0.96,
      shedSpans: 3,
      description:
        'Opened in 1859 as Spencer Street Station and covered in 2006 by Nicholas Grimshaw’s 43,000 m² Lubetkin-Prize-winning undulating wave roof, serving all regional Victorian and interstate trains.',
      corridorLatLon: [
        [-37.8184, 144.9525],
        [-37.8125, 144.9475],
        [-37.8072, 144.9425],
        [-37.8015, 144.9285]
      ]
    }
  ],
  districts: [
    {
      id: 'dist-hoddle-grid-cbd',
      number: 1,
      shortLabel: 'Hoddle Grid CBD',
      name: '1 — The 1837 Hoddle Grid, Bluestone Laneways & Bourke Street Mall',
      officialName: 'City of Melbourne Central Business District',
      quartiers: 'Flinders Lane • Hosier Lane • Block Arcade • Bourke St • Chinatown',
      bank: 'North Bank of the Yarra (Birrarung)',
      filterGroup: 'core',
      eraBadge: '1837 HODDLE GRID, GOLD RUSH ARCADES & LANEWAY ART',
      foundedLabel: 'SURVEYED 1837 • CITY LOOP 1981 • METRO TUNNEL 2025',
      lat: -37.8142,
      lon: 144.9631,
      standOffRadius: 29.0,
      cameraHeightOffset: 18.0,
      haloRadiusScale: 2.3,
      metroLines: ['CL', 'MT', '35', '96', '86', '1'],
      history:
        'Laid out in 1837 by surveyor Robert Hoddle at a 28-degree angle parallel to the Yarra River, Melbourne’s mile-by-half-mile grid alternates grand 30-meter boulevards with "Little" streets and cobblestone bluestone laneways.',
      notableLandmarks: 'Flinders Street Station, Federation Square, State Library Victoria, Block Arcade, Parliament House'
    },
    {
      id: 'dist-southbank-domain',
      number: 2,
      shortLabel: 'Southbank & Domain',
      name: '2 — Southbank, Arts Precinct, St Kilda Road & Kings Domain',
      officialName: 'Southbank, Arts Precinct & Domain Parklands',
      quartiers: 'Southbank • Arts Precinct • Royal Botanic Gardens • St Kilda Rd • South Melbourne',
      bank: 'South Bank of the Yarra',
      filterGroup: 'riveGauche',
      eraBadge: 'GOLD-CROWNED SKYSCRAPERS, BALLERINA SPIRE & SHRINE AXIS',
      foundedLabel: 'BOTANIC GARDENS 1846 • SHRINE 1934 • EUREKA 2006',
      lat: -37.8245,
      lon: 144.9695,
      standOffRadius: 31.0,
      cameraHeightOffset: 18.5,
      haloRadiusScale: 2.3,
      metroLines: ['MT', '96', '1'],
      history:
        'Across Princes Bridge from Flinders Street, St Kilda Road forms a grand tree-lined boulevard linking the National Gallery of Victoria, Arts Centre Spire, Royal Botanic Gardens, and the Shrine of Remembrance alongside Southbank’s supertall towers.',
      notableLandmarks: 'Eureka Tower (297m), Arts Centre Spire, Shrine of Remembrance, NGV International, Royal Botanic Gardens'
    },
    {
      id: 'dist-carlton-fitzroy',
      number: 3,
      shortLabel: 'Carlton & Fitzroy',
      name: '3 — Carlton Gardens, Parkville University & Bohemian Fitzroy',
      officialName: 'Inner North: Carlton, Parkville, Fitzroy & Collingwood',
      quartiers: 'Carlton • Lygon Street • Parkville • Fitzroy • Smith Street',
      bank: 'North Plateau',
      filterGroup: 'riveDroite',
      eraBadge: '1880 UNESCO EXHIBITION DOME, ESPRESSO CULTURE & CAST-IRON LACE',
      foundedLabel: 'MELBOURNE UNI 1853 • EXHIBITION 1880',
      lat: -37.8035,
      lon: 144.9715,
      standOffRadius: 31.0,
      cameraHeightOffset: 18.0,
      haloRadiusScale: 2.3,
      metroLines: ['MT', 'MER', '96', '86', '1'],
      history:
        'Preserving Victorian terrace rows adorned with intricate cast-iron filigree, Melbourne’s inner north unites the UNESCO-listed 1880 Royal Exhibition Building, Lygon Street’s Italian espresso heritage, and Smith Street’s tram spine.',
      notableLandmarks: 'Royal Exhibition Building, Melbourne Museum, University of Melbourne, Lygon Street, Gertrude & Smith Streets'
    },
    {
      id: 'dist-mcg-docklands',
      number: 4,
      shortLabel: 'MCG & Docklands',
      name: '4 — Yarra Park Sports Precinct (MCG) & Victoria Harbour Docklands',
      officialName: 'Melbourne Olympic Sports Precinct & Docklands Waterfront',
      quartiers: 'Jolimont • Melbourne Park • Richmond • Docklands • Port Melbourne',
      bank: 'Upper Yarra & Hobson’s Bay Estuary',
      filterGroup: 'outer1860',
      eraBadge: '100,024-SEAT MCG COLOSSEUM & BOLTE BRIDGE WATERFRONT',
      foundedLabel: 'MCG 1853 • OLYMPICS 1956 • BOLTE BRIDGE 1999',
      lat: -37.8200,
      lon: 144.9834,
      standOffRadius: 32.0,
      cameraHeightOffset: 19.0,
      haloRadiusScale: 2.4,
      metroLines: ['CL', 'SHM', 'MER', 'WIL', '35', '86'],
      history:
        'Bookending the Yarra River corridor, the eastern sports parklands host the 100,024-capacity MCG and Australian Open tennis courts, while the western Docklands frame Victoria Harbour and the twin 140m needles of the Bolte Bridge.',
      notableLandmarks: 'Melbourne Cricket Ground (MCG), Rod Laver Arena, Bolte Bridge, Southern Cross Station, Sandridge Pier'
    }
  ],
  tourStops: [
    {
      id: 'tour-mel-flinders-clocks',
      stopNumber: 1,
      title: '“Meet Me Under the Clocks”: Flinders Street Station & the 1854 Steam Terminus',
      historicalDate: 'Sept 12, 1854 • 1910 • 2025 Metro Tunnel Link',
      timelineYear: 1926,
      locationName: 'Flinders Street Railway Station',
      arrondissement: 'Hoddle Grid South',
      lat: -37.8183,
      lon: 144.9671,
      radiusScale: 1.75,
      monumentId: 'monument-flinders-street',
      stationId: 'flinders-street',
      interviewQuestion:
        'How did Flinders Street Station become the busiest passenger railway station in the world by 1926?',
      fact: 'Opened in 1854 for Australia’s first steam train to Port Melbourne and rebuilt in 1910 with its copper dome and indicator clocks, Flinders Street handled 280,000 daily passengers by 1926 after suburban electrification.'
    },
    {
      id: 'tour-mel-fed-square-yarra',
      stopNumber: 2,
      title: 'Decking Over the Jolimont Yards: Federation Square’s Fractal Sandstone',
      historicalDate: 'Oct 26, 2002 • 2025 Town Hall Station',
      timelineYear: 2002,
      locationName: 'Federation Square & Princes Bridge',
      arrondissement: 'Hoddle Grid / Yarra Riverfront',
      lat: -37.8180,
      lon: 144.9691,
      radiusScale: 1.7,
      monumentId: 'monument-federation-square',
      stationId: 'town-hall',
      interviewQuestion:
        'How did Melbourne reconnect its city grid to the Yarra River after a century of railway tracks cutting them apart?',
      fact: 'To celebrate Australia’s Centenary of Federation, engineers spanned 12 active railway tracks with a vibration-isolated steel deck supporting Federation Square’s five pinwheel sandstone-and-zinc buildings.'
    },
    {
      id: 'tour-mel-exhibition-unesco',
      stopNumber: 3,
      title: 'Marvellous Melbourne: The 1880 Royal Exhibition Building & First Parliament',
      historicalDate: 'Oct 1, 1880 • May 9, 1901 • UNESCO 2004',
      timelineYear: 1901,
      locationName: 'Royal Exhibition Building (Carlton Gardens)',
      arrondissement: 'Carlton',
      lat: -37.8047,
      lon: 144.9717,
      radiusScale: 1.75,
      monumentId: 'monument-royal-exhibition',
      stationId: 'nicholson-street-carlton-gardens',
      interviewQuestion:
        'Why is the 1880 Royal Exhibition Building the only surviving 19th-century Great Hall of the international exhibition movement?',
      fact: 'Crowned by a 68m octagonal dome modeled on Florence’s Duomo, it hosted the 1880 and 1888 World Exhibitions and the proclamation of the first Parliament of the Commonwealth of Australia on May 9, 1901.'
    },
    {
      id: 'tour-mel-eureka-arts-spire',
      stopNumber: 4,
      title: 'Southbank: Roy Grounds’ 162m Ballerina Spire & Eureka Tower’s 24-Carat Gold Crown',
      historicalDate: '1984 • Oct 11, 2006',
      timelineYear: 2006,
      locationName: 'Arts Centre Melbourne & Eureka Skydeck',
      arrondissement: 'Southbank',
      lat: -37.8213,
      lon: 144.9647,
      radiusScale: 1.75,
      monumentId: 'monument-eureka-tower',
      stationId: 'arts-centre-ngv',
      interviewQuestion:
        'What historical rebellion is encoded into the blue, white, red, and 24-carat gold facade of the 297.3m Eureka Tower?',
      fact: 'Architects Fender Katsalidis translated the 1854 Ballarat goldfields Eureka Stockade flag into cobalt glass and white horizontal bands, topped by 3,680 panes of real 24-carat gold leaf.'
    },
    {
      id: 'tour-mel-shrine-metro-tunnel',
      stopNumber: 5,
      title: 'St Kilda Road Axis: The 1934 Shrine of Remembrance & 2025 Anzac Metro Station',
      historicalDate: 'Nov 11, 1934 • 2025 Metro Tunnel',
      timelineYear: 2025,
      locationName: 'Shrine of Remembrance & Anzac Station',
      arrondissement: 'Kings Domain',
      lat: -37.8305,
      lon: 144.9734,
      radiusScale: 1.75,
      monumentId: 'monument-shrine-remembrance',
      stationId: 'anzac',
      interviewQuestion:
        'How does the 2025 Metro Tunnel integrate Australia’s first tram-train platform at the foot of the Shrine of Remembrance?',
      fact: 'Directly aligned with the Swanston Street–St Kilda Road axis, Anzac Station pairs a sweeping timber canopy for Route 1 trams with deep underground platforms beneath the 1934 Shrine of Remembrance.'
    },
    {
      id: 'tour-mel-mcg-bolte',
      stopNumber: 6,
      title: 'From the 100,024-Seat MCG Colosseum to the Twin 140m Needles of the Bolte Bridge',
      historicalDate: '1853 • Nov 22, 1956 • Aug 16, 1999',
      timelineYear: 1999,
      locationName: 'Melbourne Cricket Ground & Bolte Bridge',
      arrondissement: 'Yarra Park & Docklands',
      lat: -37.8200,
      lon: 144.9834,
      radiusScale: 1.85,
      monumentId: 'monument-mcg-stadium',
      stationId: 'jolimont',
      interviewQuestion:
        'How do the MCG’s six 85m light towers in the east and the Bolte Bridge’s twin 140m silver needles in the west frame the Yarra River valley?',
      fact: 'Served by Jolimont and Richmond stations on the east and City Circle W-Class trams in Docklands on the west, the MCG and Bolte Bridge form the monumental structural gateways to Melbourne.'
    }
  ],
  uiTheme: {
    culturalMovement: 'Victorian Gold Rush Bluestone Laneways, W-Class Tram Green & Gold & Fed Square Fractal Geometry',
    hudTitle: 'MELBOURNE RAIL & TRAM • 1854–2026',
    hudSubtitle: 'FLINDERS CLOCKS, W-CLASS TRAMS, CITY LOOP & 2025 METRO TUNNEL • 3D SIMULATION',
    networkTitle: 'PTV CITY LOOP, 2025 METRO TUNNEL & YARRA TRAMS GRID',
    districtsTabLabel: 'Precincts',
    tourTabLabel: 'Melbourne Tour',
    tourPanelTitle: 'HODDLE GRID, W-CLASS TRAMS & YARRA HERITAGE TOUR',
    googleFontsUrl:
      'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap',
    palette: {
      bgObsidian: '#0b1114',
      bgPanel: 'rgba(16, 24, 29, 0.91)',
      bgPanelElevated: 'rgba(23, 35, 42, 0.96)',
      primaryBright: '#f4c430',
      primaryMain: '#00843d',
      primaryMuted: '#1c5e3a',
      borderSubtle: 'rgba(244, 196, 48, 0.46)',
      borderStrong: 'rgba(0, 168, 143, 0.88)',
      accentGlow: 'rgba(244, 196, 48, 0.30)',
      textPrimary: '#f9f6ef',
      textDim: '#cbd6d2',
      textSubtle: '#849690',
      secondaryAccent: '#0072ce',
      alertAccent: '#d99b66',
      worldGroundBase: '#ded9ce',
      worldWaterTint: '#1b6478',
      worldWallBase: '#e8e2d5',
      worldRoofBase: '#3d6b58'
    },
    fonts: {
      display: "'Fraunces', 'Cinzel Decorative', serif",
      serif: "'Fraunces', Georgia, serif",
      sans: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      mono: "'JetBrains Mono', monospace"
    },
    svgOrnamentPaths: [
      'M0 14 L24 4 L48 14 L72 4 L96 14 L128 4',
      'M0 20 L24 10 L48 20 L72 10 L96 20 L128 10'
    ]
  }
};
