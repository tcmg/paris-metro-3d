/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export const SYDNEY_PRESET = {
  cityId: 'sydney',
  cityName: 'Sydney',
  countryName: 'Australia',
  geo: {
    centerLat: -33.8650,
    centerLon: 151.2094,
    bbox: [-33.905, 151.165, -33.825, 151.280],
    kmPerDegLat: 111.1,
    kmPerDegLon: 92.38,
    worldUnitsPerKm: 11.2,
    coreRadiusKm: 7.2,
    isCoastal: true
  },
  topography: [
    // Observatory Hill / Millers Point Sandstone Ridge
    { name: 'Observatory Hill (Cadi)', lat: -33.8595, lon: 151.2048, height: 0.48, rx: 4.5, rz: 4.2 },
    // North Sydney / Kirribilli Escarpment
    { name: 'North Shore Sandstone Escarpment', lat: -33.8390, lon: 151.2075, height: 0.72, rx: 11.5, rz: 7.5 },
    // Paddington / Surry Hills / Oxford Street Ridge
    { name: 'Paddington & Surry Hills Ridge', lat: -33.8845, lon: 151.2225, height: 0.62, rx: 10.5, rz: 6.8 },
    // Mosman / Cremorne / Bradley's Head
    { name: 'Mosman & Taronga Headland', lat: -33.8415, lon: 151.2420, height: 0.68, rx: 9.0, rz: 6.5 },
    // Dover Heights / Bondi Headland
    { name: 'Bondi & Vaucluse Sandstone Cliffs', lat: -33.8760, lon: 151.2750, height: 0.75, rx: 8.5, rz: 8.5 }
  ],
  waterCenterlines: [
    // Port Jackson (Sydney Harbour) main deepwater channel from Parramatta / Balmain -> Harbour Bridge -> Opera House -> Heads
    [-33.8520, 151.1780, 3.2],
    [-33.8565, 151.1960, 3.4],
    [-33.8523, 151.2108, 3.1], // Beneath Sydney Harbour Bridge (Dawes Point ↔ Milsons Point)
    [-33.8548, 151.2185, 3.8], // Bennelong Point / Fort Denison
    [-33.8520, 151.2360, 4.4], // Garden Island / Bradleys Head
    [-33.8440, 151.2620, 4.8]  // Rose Bay / Watson's Bay
  ],
  bridges: [
    {
      id: 'bridge-sydney-harbour',
      name: 'Sydney Harbour Bridge ("The Coathanger")',
      lat: -33.8523,
      lon: 151.2108,
      builtYear: 1932,
      lengthWorld: 6.2,
      widthWorld: 0.62,
      rotationY: 0.42,
      style: 'iron-arch'
    },
    {
      id: 'bridge-anzac',
      name: 'ANZAC Bridge (Glebe Island)',
      lat: -33.8688,
      lon: 151.1858,
      builtYear: 1995,
      lengthWorld: 4.5,
      widthWorld: 0.48,
      rotationY: -0.38,
      style: 'cable-stayed'
    },
    {
      id: 'bridge-pyrmont',
      name: 'Pyrmont Swing Bridge (Darling Harbour)',
      lat: -33.8705,
      lon: 151.1985,
      builtYear: 1902,
      lengthWorld: 2.8,
      widthWorld: 0.34,
      rotationY: 1.48,
      style: 'bascule'
    }
  ],
  parks: [
    { name: 'Royal Botanic Garden & The Domain (Wuganmagulya)', lat: -33.8642, lon: 151.2166, rx: 6.5, rz: 8.2, rotation: 0.1, hasBasin: true },
    { name: 'Hyde Park', lat: -33.8731, lon: 151.2113, rx: 2.6, rz: 5.2, rotation: 0.18, hasBasin: true },
    { name: 'Barangaroo Reserve (Wulugul)', lat: -33.8572, lon: 151.2012, rx: 3.0, rz: 4.5, rotation: 0.05 },
    { name: 'Centennial Parklands', lat: -33.8965, lon: 151.2335, rx: 8.5, rz: 7.5, rotation: 0.0, hasBasin: true },
    { name: 'Victoria Park & University Grounds', lat: -33.8855, lon: 151.1935, rx: 3.6, rz: 3.2, rotation: 0.0 }
  ],
  places: [
    { name: 'Circular Quay (Warrane)', lat: -33.8612, lon: 151.2108, radius: 2.8 },
    { name: 'Martin Place Civic Spine', lat: -33.8678, lon: 151.2095, radius: 2.4, hasColumnOrObelisk: true },
    { name: 'Taylor Square (Oxford Street)', lat: -33.8805, lon: 151.2175, radius: 2.0 },
    { name: 'Railway Square (Central)', lat: -33.8838, lon: 151.2045, radius: 2.4 }
  ],
  monuments: [
    {
      id: 'monument-sydney-opera-house',
      name: 'Sydney Opera House (Tubowgule)',
      lat: -33.8568,
      lon: 151.2153,
      builtYear: 1973,
      constructionStartYear: 1959,
      radius: 4.8,
      heightMeters: 67,
      era: 'modern',
      eraLabel: 'Expressionist Sails • 1973',
      connectedLines: ['T2', 'T3', 'T8', 'L2'],
      style: 'Spherical Precast Concrete Rib Vaults & 1.05M Swedish Ceramic Tiles (Jørn Utzon & Ove Arup, 1973)',
      arrondissement: 'Bennelong Point (Tubowgule)',
      rotationY: -0.32,
      scale: 0.84,
      archetype: 'opera_house_sails',
      primaryColor: '#fcf8ef',
      accentColor: '#c85a32',
      description: 'Standing on Tubowgule—the sacred Gadigal tidal headland of Bennelong Point—Jørn Utzon’s billowing white ceramic shells were opened in October 1973 as a UNESCO World Heritage masterpiece on Sydney Harbour.'
    },
    {
      id: 'monument-harbour-bridge',
      name: 'Sydney Harbour Bridge',
      lat: -33.8523,
      lon: 151.2108,
      builtYear: 1932,
      constructionStartYear: 1923,
      radius: 5.8,
      heightMeters: 134,
      era: 'empire1900',
      eraLabel: 'Bradfield Arch • 1932',
      connectedLines: ['T1'],
      style: '503m Riveted Steel Through-Arch & 89m Moruya Granite Pylons (John Bradfield & Dorman Long, 1932)',
      arrondissement: 'Dawes Point ↔ Milsons Point',
      rotationY: 0.42,
      scale: 0.85,
      archetype: 'steel_arch_bridge',
      primaryColor: '#5c646d',
      accentColor: '#d8ccb8',
      description: 'Masterminded by chief engineer Dr. John Bradfield as the centerpiece of Sydney’s electrified underground and suburban railway network, the world’s tallest steel arch bridge opened on March 19, 1932.'
    },
    {
      id: 'monument-sydney-tower',
      name: 'Sydney Tower Eye (Centrepoint Tower)',
      lat: -33.8704,
      lon: 151.2089,
      builtYear: 1981,
      constructionStartYear: 1975,
      radius: 3.4,
      heightMeters: 309,
      era: 'modern',
      eraLabel: 'Hyperboloid • 1981',
      connectedLines: ['M1', 'T1', 'T2', 'T4'],
      style: '309m Cable-Stayed Hyperboloid Steel Lattice & Golden Barrel Turret (Donald Crone, 1981)',
      arrondissement: 'CBD (Market Street)',
      rotationY: 0.0,
      scale: 0.78,
      archetype: 'observation_needle',
      primaryColor: '#e5a93c',
      accentColor: '#c8cdd4',
      description: 'Rising 309 meters above Pitt Street Mall with a 56-cable diagrid hyperboloid cradle and golden anodized observation turret, flanked below by St James, Town Hall, and Gadigal Metro stations.'
    },
    {
      id: 'monument-qvb',
      name: 'Queen Victoria Building (QVB)',
      lat: -33.8718,
      lon: 151.2067,
      builtYear: 1898,
      radius: 3.8,
      heightMeters: 61,
      era: 'empire1900',
      eraLabel: 'Romanesque • 1898',
      connectedLines: ['M1', 'T1', 'T2', 'T4', 'L2'],
      style: 'Federation Romanesque Pyrmont Sandstone Arcade & 20 Copper Domes (George McRae, 1898)',
      arrondissement: 'CBD (Town Hall)',
      rotationY: 0.18,
      scale: 0.76,
      archetype: 'domed_sandstone_arcade',
      primaryColor: '#d9a468',
      accentColor: '#4c9c84',
      description: 'Spanning an entire city block in golden Pyrmont sandstone with a 20-meter copper central dome and stained-glass barrel vault, connected directly beneath George Street to Town Hall and Gadigal stations.'
    },
    {
      id: 'monument-central-station-sydney',
      name: 'Sydney Central Station & Clock Tower',
      lat: -33.8832,
      lon: 151.2062,
      builtYear: 1906,
      constructionStartYear: 1901,
      radius: 4.4,
      heightMeters: 85,
      era: 'gares',
      eraLabel: 'Edwardian Terminus • 1906',
      connectedLines: ['M1', 'T1', 'T2', 'T4', 'T8', 'L1', 'L2'],
      style: 'Free Classical Sandstone Headhouse, Grand Concourse & 85m Clock Tower (Walter Liberty Vernon, 1906)',
      arrondissement: 'Haymarket / Surry Hills',
      rotationY: 0.18,
      scale: 0.80,
      archetype: 'clock_tower_terminus',
      primaryColor: '#d8a86e',
      accentColor: '#c85a32',
      description: 'Opened in August 1906 and crowned by its 85m clock tower in 1921; in August 2024, new 27-meter-deep driverless Sydney Metro M1 platforms opened directly beneath its historic platforms.'
    },
    {
      id: 'monument-st-marys-cathedral',
      name: "St Mary's Cathedral & Anzac Memorial (Hyde Park)",
      lat: -33.8712,
      lon: 151.2133,
      builtYear: 1882,
      radius: 3.6,
      heightMeters: 75,
      era: 'empire1900',
      eraLabel: 'Gothic Revival • 1882 / 2000',
      connectedLines: ['T2', 'T3', 'T8'],
      style: 'English Geometric Gothic Revival in Golden Sydney Sandstone & Twin Spires (William Wardell)',
      arrondissement: 'Hyde Park East',
      rotationY: 0.18,
      scale: 0.74,
      archetype: 'twin_spire_cathedral',
      primaryColor: '#dbb078',
      accentColor: '#8c6239',
      description: 'Designed by William Wilkinson Wardell in warm local sandstone overlooking Hyde Park and St James Station (the inaugural 1926 underground station of John Bradfield’s City Circle).'
    },
    {
      id: 'monument-luna-park',
      name: 'Luna Park Milsons Point',
      lat: -33.8477,
      lon: 151.2098,
      builtYear: 1935,
      radius: 3.2,
      heightMeters: 30,
      era: 'empire1900',
      eraLabel: 'Art Deco • 1935',
      connectedLines: ['T1'],
      style: 'Fantasy Art Deco Twin Towers & Smiling Moon Face Gateway (1935)',
      arrondissement: 'Milsons Point (North Shore)',
      rotationY: -0.45,
      scale: 0.72,
      archetype: 'twin_tower_gateway',
      primaryColor: '#f7e6c4',
      accentColor: '#c85a32',
      description: 'Erected in 1935 on the former Dorman Long steel fabrication workshops used to build the Sydney Harbour Bridge, standing beside Milsons Point elevated railway station.'
    },
    {
      id: 'monument-barangaroo-crown',
      name: 'Barangaroo Tower & Wulugul Headland',
      lat: -33.8622,
      lon: 151.2012,
      builtYear: 2020,
      radius: 3.8,
      heightMeters: 271,
      era: 'modern',
      eraLabel: 'Harbour Skyscraper • 2020',
      connectedLines: ['M1'],
      style: '271m Sculptural Spiraling Glass Petal Skyscraper (WilkinsonEyre, 2020)',
      arrondissement: 'Barangaroo (Darling Harbour)',
      rotationY: 0.30,
      scale: 0.78,
      archetype: 'twisting_glass_tower',
      primaryColor: '#8ecae6',
      accentColor: '#e8a849',
      description: 'Named in honor of Barangaroo, a powerful Cammeraygal woman and leader at the time of British colonization; served since August 2024 by the deep subterranean Barangaroo Metro station.'
    }
  ],
  milestones: [
    { year: 1855, shortLabel: '1855', headline: 'Sept 26, 1855: Opening of NSW’s first railway from Sydney Redfern/Central to Parramatta' },
    { year: 1898, shortLabel: '1898', headline: '1898: Completion of the sandstone Queen Victoria Building & George Street electric trams' },
    { year: 1906, shortLabel: '1906', headline: 'Aug 4, 1906: Inauguration of the grand sandstone Sydney Central Terminal' },
    { year: 1926, shortLabel: '1926', headline: 'Dec 20, 1926: Australia’s first underground electric railway opens (Central ↔ St James)' },
    { year: 1932, shortLabel: '1932', headline: 'March 19, 1932: Opening of the Sydney Harbour Bridge & Wynyard–Town Hall underground trunk' },
    { year: 1956, shortLabel: '1956', headline: 'Jan 20, 1956: Completion of the elevated Circular Quay station & full City Circle loop' },
    { year: 1973, shortLabel: '1973', headline: 'Oct 20, 1973: Inauguration of Jørn Utzon’s Sydney Opera House at Bennelong Point' },
    { year: 1979, shortLabel: '1979', headline: 'June 23, 1979: Opening of the Eastern Suburbs Railway underground line to Martin Place & Bondi Junction' },
    { year: 2019, shortLabel: '2019', headline: '2019: Driverless Sydney Metro North West & George Street CSELR Light Rail return' },
    { year: 2024, shortLabel: '2024', headline: 'Aug 19, 2024: Sydney Metro M1 City & Southwest twin tunnels dive beneath Sydney Harbour' },
    { year: 2026, shortLabel: '2026', headline: '2026: Integrated Sydney Metro M1, City Circle & Harbour Rail Network' }
  ],
  eras: [
    {
      startYear: 1855,
      endYear: 1925,
      eraTag: 'SANDSTONE FEDERATION • 1855–1925',
      title: 'Gadigal Country, Golden Sandstone & Central Terminal',
      description: 'Carved across the ancestral sandstone ridges and coves of the Gadigal people of the Eora Nation, Victorian and Federation Sydney erected the Queen Victoria Building (1898) and Central Terminal (1906).',
      urbanChanges: [
        'Queen Victoria Building sandstone domes (1898) & Pyrmont Swing Bridge (1902)',
        'Inauguration of Central Station (1906) and its 85m Clock Tower (1921)',
        'Chief Engineer John Bradfield begins the City Underground & Harbour Bridge (1922–1923)'
      ]
    },
    {
      startYear: 1926,
      endYear: 1969,
      eraTag: 'THE BRADFIELD VISION • 1926–1969',
      title: 'The City Underground, Harbour Bridge & Circular Quay Loop',
      description: 'Dr. John Bradfield electrified Sydney with Australia’s first underground railway at St James and Museum in December 1926, leaped across Port Jackson on the Sydney Harbour Bridge in 1932, and closed the City Circle loop at Circular Quay in 1956.',
      urbanChanges: [
        'Opening of St James & Museum underground stations (Dec 20, 1926)',
        'Inauguration of the Sydney Harbour Bridge, Town Hall & Wynyard (March 19, 1932)',
        'Elevated Circular Quay viaduct completes the City Circle (Jan 1956)'
      ]
    },
    {
      startYear: 1970,
      endYear: 2015,
      eraTag: 'HARBOUR SAILS & EASTERN SUBURBS • 1970–2015',
      title: 'Sydney Opera House, Sydney Tower & the Bondi Underground',
      description: 'The ceramic shells of the Sydney Opera House transformed Bennelong Point in 1973, followed by the deep viaduct-and-cavern Eastern Suburbs line to Martin Place, Kings Cross, and Bondi Junction in 1979.',
      urbanChanges: [
        'Inauguration of the Sydney Opera House at Tubowgule / Bennelong Point (1973)',
        'Eastern Suburbs underground railway opens to Martin Place & Bondi Junction (1979)',
        'Completion of the 309m Sydney Tower Eye (1981) & ANZAC Bridge (1995)'
      ]
    },
    {
      startYear: 2016,
      endYear: 2026,
      eraTag: 'SYDNEY METRO ERA • 2016–2026',
      title: 'Twin Tunnels Beneath Port Jackson & First Nations Place Naming',
      description: 'In August 2024, fully automated Sydney Metro M1 trains dove 40 meters beneath Sydney Harbour from Victoria Cross to Barangaroo, Martin Place, Gadigal, Waterloo, and Sydenham.',
      urbanChanges: [
        'George Street pedestrianization & L2/L3 Light Rail to Circular Quay (2019)',
        'Barangaroo Reserve & Waterfront cultural regeneration (2015–2020)',
        'Sydney Metro M1 City under-harbour crossing & Gadigal Station (Aug 2024)'
      ]
    }
  ],
  metroLines: [
    {
      id: 'M1',
      name: 'M1 — Metro North West & Bankstown Line (Crows Nest ↔ Sydenham)',
      shortLabel: 'M1',
      color: '#009b77',
      textColor: '#ffffff',
      openedYear: 2019,
      depthOffset: -3.4,
      historicCompany: 'Sydney Metro (Alstom Metropolis)',
      summary: 'Australia’s first fully automated driverless rapid transit line (opened 2019 in the North West and extended beneath Sydney Harbour in August 2024 through Barangaroo, Martin Place, Gadigal, Central, Waterloo, and Sydenham).',
      stations: [
        { id: 'crows-nest', name: 'Crows Nest', lat: -33.8268, lon: 151.2032, openedYear: 2024, arrondissement: 'North Shore', architecture: 'Deep Brick & Solar Canopy Box Station', description: 'Northern gateway of the 2024 City & Southwest under-harbour tunnel.' },
        { id: 'victoria-cross', name: 'Victoria Cross (North Sydney)', lat: -33.8380, lon: 151.2072, openedYear: 2024, arrondissement: 'North Sydney', architecture: 'Sandstone-Ribbed Subterranean Cavern', description: 'Deep cavern beneath Miller Street before M1 plunges under Port Jackson.' },
        { id: 'barangaroo', name: 'Barangaroo', lat: -33.8592, lon: 151.2022, openedYear: 2024, arrondissement: 'Barangaroo', architecture: 'Harbourside Cut-Sandstone & First Nations Public Art Concourse', landmark: 'Barangaroo Tower & Reserve', description: 'First station south of the under-harbour crossing, adjacent to Hickson Road and Nawi Cove.' },
        { id: 'martin-place', name: 'Martin Place', lat: -33.8678, lon: 151.2112, openedYear: 1979, arrondissement: 'CBD', architecture: '1979 Red Ochre Ceramic & 2024 Twin-Cavern Interchange', landmark: 'Martin Place Civic Spine', description: 'Major subterranean cathedral connecting the 1979 T4 Eastern Suburbs platforms with the 2024 M1 Metro.' },
        { id: 'gadigal', name: 'Gadigal (Pitt Street)', lat: -33.8732, lon: 151.2082, openedYear: 2024, arrondissement: 'CBD', architecture: 'Aboriginal Ochre & Track-Line Artwork Vault', landmark: 'Sydney Tower & QVB', description: 'Named in honor of the Gadigal people, Traditional Custodians of the Sydney CBD.' },
        { id: 'central-sydney', name: 'Central', lat: -33.8832, lon: 151.2062, openedYear: 1906, arrondissement: 'Haymarket', architecture: '1906 Sandstone Terminus & 2024 Central Walk Underground Box', landmark: 'Central Station Clock Tower', description: 'Australia’s grandest railway interchange.' },
        { id: 'waterloo', name: 'Waterloo', lat: -33.8950, lon: 151.2035, openedYear: 2024, arrondissement: 'Waterloo', architecture: 'Indigenous Dot & Footprint Ceiling Motif Box', description: 'Serves the inner-south Waterloo precinct with First Nations artwork by Nicole Monks.' },
        { id: 'sydenham', name: 'Sydenham', lat: -33.9145, lon: 151.1658, openedYear: 1884, arrondissement: 'Inner West', architecture: '6-Platform Surface Interchange (M1 / T3 / T4 / T8)', description: 'Southern portal of the M1 City & Southwest tunnels and major Inner West junction.' }
      ]
    },
    {
      id: 'T1',
      name: 'T1 — North Shore & Western Line',
      shortLabel: 'T1',
      color: '#f99d1c',
      textColor: '#10141c',
      openedYear: 1855,
      depthOffset: -2.4,
      historicCompany: 'NSWGR / Sydney Trains (Waratah Double-Deck)',
      summary: 'Follows NSW’s inaugural 1855 Western railway spine from Redfern and Central before diving through the CBD and crossing the deck of the Sydney Harbour Bridge (1932) to the North Shore.',
      stations: [
        { id: 'st-leonards', name: 'St Leonards', lat: -33.8228, lon: 151.1942, openedYear: 1890, arrondissement: 'Lower North Shore', architecture: 'Deep Cutting & Over-Station Plaza', description: 'Opened in 1890 on the North Shore Line ridge.' },
        { id: 'waverton', name: 'Waverton', lat: -33.8378, lon: 151.1972, openedYear: 1932, arrondissement: 'North Sydney', architecture: 'Curved Stone Cutting on Berry Bay Approach', description: 'Opened in 1932 when the North Shore line was rerouted onto the Harbour Bridge.' },
        { id: 'north-sydney', name: 'North Sydney', lat: -33.8415, lon: 151.2075, openedYear: 1932, arrondissement: 'North Sydney', architecture: 'Twin Rock-Cut Tunnels in Sandstone Escarpment', description: 'Opened with the Harbour Bridge electrification in March 1932.' },
        { id: 'milsons-point', name: 'Milsons Point', lat: -33.8462, lon: 151.2118, openedYear: 1932, elevated: true, arrondissement: 'Milsons Point', architecture: 'Elevated Northern Harbour Bridge Approach Viaduct', landmark: 'Sydney Harbour Bridge & Luna Park', description: 'Perched directly on the northern approach ramp of the Sydney Harbour Bridge.' },
        { id: 'wynyard', name: 'Wynyard (with Tram Ghost Tunnels)', lat: -33.8655, lon: 151.2060, openedYear: 1932, isGhostStation: true, arrondissement: 'CBD West', architecture: '1932 Multi-Deck Harbour Bridge Approach Hub', description: 'Opened on March 19, 1932 with the Harbour Bridge; platforms 1 & 2 originally carried North Shore trams until 1958.' },
        { id: 'town-hall', name: 'Town Hall', lat: -33.8735, lon: 151.2068, openedYear: 1932, arrondissement: 'CBD', architecture: 'Dual-Level Six-Platform Underground Hub', landmark: 'Queen Victoria Building', description: 'Central CBD underground interchange beneath George Street.' },
        { id: 'central-sydney', name: 'Central', lat: -33.8832, lon: 151.2062, openedYear: 1906, arrondissement: 'Haymarket', architecture: 'Mainline & Suburban Hub', description: 'Through-platforms 16–23.' },
        { id: 'redfern', name: 'Redfern', lat: -33.8922, lon: 151.1988, openedYear: 1855, arrondissement: 'Redfern', architecture: '1855 Historic Railway Birthplace & 12-Platform Cutting', description: 'Site of NSW’s first railway departure in September 1855 and historic heart of Aboriginal civil rights in Sydney.' }
      ]
    },
    {
      id: 'T2',
      name: 'T2 — Leppington & Inner West Line (City Circle)',
      shortLabel: 'T2',
      color: '#0098cd',
      textColor: '#ffffff',
      openedYear: 1926,
      depthOffset: -2.1,
      historicCompany: 'NSWGR (Bradfield City Circle)',
      summary: 'Combines Dr. John Bradfield’s 1926–1956 City Circle underground/viaduct loop (Museum, St James, Circular Quay, Wynyard, Town Hall) with the historic 1855 Inner West spine through Newtown and Stanmore.',
      stations: [
        { id: 'circular-quay', name: 'Circular Quay (Warrane)', lat: -33.8613, lon: 151.2108, openedYear: 1956, elevated: true, arrondissement: 'Circular Quay', architecture: 'Elevated Harbour Viaduct & Ferry Terminal', landmark: 'Sydney Opera House & Harbour Bridge', description: 'Opened in January 1956 atop the Cahill Expressway viaduct, offering panoramic views of both the Opera House and Harbour Bridge.' },
        { id: 'st-james', name: 'St James (with Ghost Platforms)', lat: -33.8702, lon: 151.2118, openedYear: 1926, isGhostStation: true, arrondissement: 'Hyde Park North', architecture: '1926 Quad-Track Arch with Flooded Ghost Tunnels', landmark: "St Mary's Cathedral", description: 'Inaugural 1926 station featuring two active City Circle tracks flanking two unused center ghost platforms built for a never-completed East–West line.' },
        { id: 'museum', name: 'Museum', lat: -33.8762, lon: 151.2098, openedYear: 1926, arrondissement: 'Hyde Park South', architecture: '1926 Heritage Cream & Maroon Subway Tile Vault', description: 'Opened on December 20, 1926 beneath southern Hyde Park as Australia’s first underground station alongside St James.' },
        { id: 'central-sydney', name: 'Central', lat: -33.8832, lon: 151.2062, openedYear: 1906, arrondissement: 'Haymarket', architecture: 'Edwardian Sandstone Terminus', description: 'Southern anchor of the City Circle.' },
        { id: 'redfern', name: 'Redfern', lat: -33.8922, lon: 151.1988, openedYear: 1855, arrondissement: 'Redfern', architecture: '1855 Six-Track Main Suburban Junction', description: 'Western portal where City Circle trains join the 1855 Parramatta alignment.' },
        { id: 'macdonaldtown', name: 'Macdonaldtown', lat: -33.8968, lon: 151.1862, openedYear: 1878, arrondissement: 'Eveleigh / Erskineville', architecture: 'Victorian Island Platform Beside Eveleigh Railway Workshops', description: 'Flanks the historic 1887 Eveleigh Locomotive Workshops.' },
        { id: 'newtown', name: 'Newtown', lat: -33.8979, lon: 151.1795, openedYear: 1855, arrondissement: 'Newtown', architecture: '1892 Overhead Brick Concourse on King Street', description: 'One of the original six stations opened on September 26, 1855.' },
        { id: 'stanmore', name: 'Stanmore', lat: -33.8946, lon: 151.1645, openedYear: 1878, arrondissement: 'Inner West', architecture: 'Victorian Brick & Cast-Iron Canopy', description: 'Heritage-listed Victorian suburban station on the Inner West trunk.' }
      ]
    },
    {
      id: 'T3',
      name: 'T3 — Liverpool & Inner West Line (City Circle ↔ Sydenham)',
      shortLabel: 'T3',
      color: '#f37021',
      textColor: '#ffffff',
      openedYear: 1895,
      depthOffset: -2.25,
      historicCompany: 'NSWGR / Sydney Trains',
      summary: 'Opened to Sydenham and Belmore in 1895 to relieve the Main Suburban line; links the City Circle with Erskineville, St Peters, and the Inner West.',
      stations: [
        { id: 'wynyard', name: 'Wynyard (with Tram Ghost Tunnels)', lat: -33.8655, lon: 151.2060, openedYear: 1932, isGhostStation: true, arrondissement: 'CBD West', architecture: 'City Circle Underground Platform', description: 'Western City Circle interchange.' },
        { id: 'town-hall', name: 'Town Hall', lat: -33.8735, lon: 151.2068, openedYear: 1932, arrondissement: 'CBD', architecture: 'City Circle Upper Level', description: 'George Street underground hub.' },
        { id: 'central-sydney', name: 'Central', lat: -33.8832, lon: 151.2062, openedYear: 1906, arrondissement: 'Haymarket', architecture: 'Suburban Platforms 17–22', description: 'Connects City Circle to the Illawarra relief tracks.' },
        { id: 'redfern', name: 'Redfern', lat: -33.8922, lon: 151.1988, openedYear: 1855, arrondissement: 'Redfern', architecture: 'Inner South Junction', description: 'Junction for the Erskineville & Sydenham alignment.' },
        { id: 'erskineville', name: 'Erskineville', lat: -33.9002, lon: 151.1865, openedYear: 1884, arrondissement: 'Erskineville', architecture: 'Island Platform in Brick Cutting', description: 'Serves the Erskineville village precinct.' },
        { id: 'st-peters', name: 'St Peters', lat: -33.9075, lon: 151.1808, openedYear: 1884, arrondissement: 'St Peters', architecture: '1884 Polychrome Brick Station Beside Sydney Park', description: 'Overlooks the historic brick kilns of Sydney Park.' },
        { id: 'sydenham', name: 'Sydenham', lat: -33.9145, lon: 151.1658, openedYear: 1884, arrondissement: 'Inner West', architecture: 'Major 6-Platform Junction', description: 'Historic junction where the 1895 Bankstown line diverges west.' }
      ]
    },
    {
      id: 'T4',
      name: 'T4 — Eastern Suburbs & Illawarra Line (Sydenham ↔ Bondi Junction)',
      shortLabel: 'T4',
      color: '#005aa3',
      textColor: '#ffffff',
      openedYear: 1979,
      depthOffset: -2.9,
      historicCompany: 'PTC / Sydney Trains',
      summary: 'Pairs the 1884 Illawarra trunk from Sydenham with the deep 1979 underground Eastern Suburbs railway through Central, Town Hall, Martin Place, Kings Cross, Edgecliff, and Bondi Junction.',
      stations: [
        { id: 'sydenham', name: 'Sydenham', lat: -33.9145, lon: 151.1658, openedYear: 1884, arrondissement: 'Inner West', architecture: 'Illawarra Express & Local Interchange', description: 'Opened October 15, 1884 on the original Illawarra Line.' },
        { id: 'redfern', name: 'Redfern', lat: -33.8922, lon: 151.1988, openedYear: 1979, arrondissement: 'Redfern', architecture: 'Subterranean Platforms 11–12', description: 'Underground portal of the Eastern Suburbs line.' },
        { id: 'central-sydney', name: 'Central', lat: -33.8832, lon: 151.2062, openedYear: 1979, arrondissement: 'Haymarket', architecture: 'Deep Platforms 24–25 (plus Ghost Platforms 26–27)', isGhostStation: true, description: 'Contains two completed but unused ghost platforms (26–27) directly above the active T4 tracks.' },
        { id: 'town-hall', name: 'Town Hall', lat: -33.8735, lon: 151.2068, openedYear: 1979, arrondissement: 'CBD', architecture: 'Lower-Level Cross-Platform Interchange', description: 'Cross-platform transfer with T1.' },
        { id: 'martin-place', name: 'Martin Place', lat: -33.8678, lon: 151.2112, openedYear: 1979, arrondissement: 'CBD', architecture: '1979 Late-Modernist Red Tile Cavern', description: 'Connects with M1 Metro.' },
        { id: 'kings-cross', name: 'Kings Cross', lat: -33.8745, lon: 151.2248, openedYear: 1979, arrondissement: 'Potts Point / Darlinghurst', architecture: 'Deep Ridge Cavern between Woolloomooloo & Rushcutters Bay Viaducts', description: 'Bored inside the Potts Point sandstone ridge.' },
        { id: 'edgecliff', name: 'Edgecliff', lat: -33.8798, lon: 151.2368, openedYear: 1979, arrondissement: 'Edgecliff', architecture: 'Brutalist Bus-Rail Concrete Interchange', description: 'Serves Double Bay and Eastern Suburbs bays.' },
        { id: 'bondi-junction', name: 'Bondi Junction', lat: -33.8915, lon: 151.2485, openedYear: 1979, arrondissement: 'Bondi Junction', architecture: 'Eastern Terminus & Turning Loop Cavern', description: 'Eastern terminus serving Bondi Beach.' }
      ]
    },
    {
      id: 'T5',
      name: 'T5 — Cumberland Line (Western & South West Orbital)',
      shortLabel: 'T5',
      color: '#c4258f',
      textColor: '#ffffff',
      openedYear: 1996,
      depthOffset: -2.0,
      historicCompany: 'CityRail / Sydney Trains',
      summary: 'Opened in 1996 via the Merrylands Y-Link to create an orbital cross-suburban rail corridor linking the Western and South Lines without requiring a transfer at Central.',
      stations: [
        { id: 'stanmore', name: 'Stanmore', lat: -33.8946, lon: 151.1645, openedYear: 1878, arrondissement: 'Inner West', architecture: 'Western Corridor Junction', description: 'Connects with the Western/South orbital relief corridor.' },
        { id: 'petersham', name: 'Petersham', lat: -33.8942, lon: 151.1558, openedYear: 1857, arrondissement: 'Inner West', architecture: '1886 Victorian Gothic Sandstone Station Building', description: 'Features one of Sydney’s finest heritage station buildings (1886).' },
        { id: 'lewisham', name: 'Lewisham', lat: -33.8920, lon: 151.1475, openedYear: 1886, arrondissement: 'Inner West', architecture: 'Long Creek Viaduct & L1 Dulwich Hill Light Rail Transfer', description: 'Adjacent to the 1886 Long Cove Creek railway viaduct.' }
      ]
    },
    {
      id: 'T7',
      name: 'T7 — Olympic Park Line (Special Event & Express Spine)',
      shortLabel: 'T7',
      color: '#6f818e',
      textColor: '#ffffff',
      openedYear: 1998,
      depthOffset: -1.95,
      historicCompany: 'CityRail Olympic Express',
      summary: 'Built in 1998 for the Sydney 2000 Summer Olympics with a dramatic balloon-loop cavern station designed by Hassell; runs direct event express trains from Central and Redfern.',
      stations: [
        { id: 'central-sydney', name: 'Central', lat: -33.8832, lon: 151.2062, openedYear: 1906, arrondissement: 'Haymarket', architecture: 'Grand Concourse Intercity & Olympic Express Platforms', description: 'Origin of T7 Major Event express services to Sydney Olympic Park.' },
        { id: 'redfern', name: 'Redfern', lat: -33.8922, lon: 151.1988, openedYear: 1855, arrondissement: 'Redfern', architecture: 'Main Suburban Fast Tracks', description: 'Major Inner-City pickup for T7 Olympic Park event trains.' },
        { id: 'newtown', name: 'Newtown', lat: -33.8979, lon: 151.1795, openedYear: 1855, arrondissement: 'Newtown', architecture: 'Main Western Fast Line Bypass', description: 'Express corridor heading west toward Lidcombe and Olympic Park.' },
        { id: 'lewisham', name: 'Lewisham', lat: -33.8920, lon: 151.1475, openedYear: 1886, arrondissement: 'Inner West', architecture: 'Six-Track Main Suburban Corridor', description: 'Western express approach toward the Olympic Park balloon loop.' }
      ]
    },
    {
      id: 'T8',
      name: 'T8 — Airport & South Line (City Circle ↔ Sydney Airport)',
      shortLabel: 'T8',
      color: '#00954c',
      textColor: '#ffffff',
      openedYear: 2000,
      depthOffset: -3.1,
      historicCompany: 'Airport Link / Sydney Trains',
      summary: 'Opened in May 2000 ahead of the Sydney Olympics, boring a 10 km tunnel beneath Green Square, Mascot, and the Domestic & International terminals of Kingsford Smith Airport from Central and the City Circle.',
      stations: [
        { id: 'wynyard', name: 'Wynyard (with Tram Ghost Tunnels)', lat: -33.8655, lon: 151.2060, openedYear: 1932, isGhostStation: true, arrondissement: 'CBD West', architecture: 'City Circle Underground Hub', description: 'Northern City Circle interchange for Airport trains.' },
        { id: 'circular-quay', name: 'Circular Quay (Warrane)', lat: -33.8613, lon: 151.2108, openedYear: 1956, elevated: true, arrondissement: 'Circular Quay', architecture: 'Harbour Viaduct Station', description: 'Direct rail link from Sydney’s ferry terminal and Opera House to the Airport.' },
        { id: 'st-james', name: 'St James (with Ghost Platforms)', lat: -33.8702, lon: 151.2118, openedYear: 1926, isGhostStation: true, arrondissement: 'Hyde Park North', architecture: '1926 Heritage Arch', description: 'Eastern City Circle stop on the T8 Airport loop.' },
        { id: 'museum', name: 'Museum', lat: -33.8762, lon: 151.2098, openedYear: 1926, arrondissement: 'Hyde Park South', architecture: '1926 Subway Vault', description: 'Southern Hyde Park stop before diving into the Airport tunnel.' },
        { id: 'central-sydney', name: 'Central', lat: -33.8832, lon: 151.2062, openedYear: 1906, arrondissement: 'Haymarket', architecture: 'Platforms 21 & 23 Airport Link Portal', description: 'Portal where T8 trains dive south into the 2000 New Southern Railway tunnel.' },
        { id: 'green-square', name: 'Green Square', lat: -33.9062, lon: 151.2028, openedYear: 2000, arrondissement: 'Zetland / Alexandria', architecture: 'Subterranean Cut-and-Cover Concrete & Glass Plaza', description: 'Opened May 21, 2000 as the first underground station on the Airport Link.' }
      ]
    },
    {
      id: 'T9',
      name: 'T9 — Northern Line (North Shore ↔ Central ↔ Strathfield)',
      shortLabel: 'T9',
      color: '#d11f2f',
      textColor: '#ffffff',
      openedYear: 1886,
      depthOffset: -2.55,
      historicCompany: 'NSWGR / Sydney Trains',
      summary: 'Connects the Northern Line and North Shore across the Sydney Harbour Bridge through Wynyard, Town Hall, Central, and Redfern onto the six-track Main Suburban express corridor.',
      stations: [
        { id: 'st-leonards', name: 'St Leonards', lat: -33.8228, lon: 151.1942, openedYear: 1890, arrondissement: 'Lower North Shore', architecture: 'North Shore Trunk Station', description: 'Shared T1 / T9 North Shore express stop.' },
        { id: 'north-sydney', name: 'North Sydney', lat: -33.8415, lon: 151.2075, openedYear: 1932, arrondissement: 'North Sydney', architecture: 'Subterranean Sandstone Cavern', description: 'Major North Sydney employment hub station.' },
        { id: 'milsons-point', name: 'Milsons Point', lat: -33.8462, lon: 151.2118, openedYear: 1932, elevated: true, arrondissement: 'Milsons Point', architecture: 'Harbour Bridge Northern Viaduct', description: 'Crosses the eastern pair of tracks on the Sydney Harbour Bridge.' },
        { id: 'wynyard', name: 'Wynyard (with Tram Ghost Tunnels)', lat: -33.8655, lon: 151.2060, openedYear: 1932, isGhostStation: true, arrondissement: 'CBD West', architecture: 'Harbour Bridge Southern Portal', description: 'Connects North Shore and Western/Northern tracks.' },
        { id: 'town-hall', name: 'Town Hall', lat: -33.8735, lon: 151.2068, openedYear: 1932, arrondissement: 'CBD', architecture: 'Underground Trunk Platforms', description: 'Central CBD interchange.' },
        { id: 'central-sydney', name: 'Central', lat: -33.8832, lon: 151.2062, openedYear: 1906, arrondissement: 'Haymarket', architecture: 'Suburban Through-Platforms 16–19', description: 'Connects Harbour Bridge spine to the Main Northern corridor.' },
        { id: 'redfern', name: 'Redfern', lat: -33.8922, lon: 151.1988, openedYear: 1855, arrondissement: 'Redfern', architecture: '12-Platform Main Junction', description: 'All T9 trains stop here before running express toward Burwood and Strathfield.' },
        { id: 'stanmore', name: 'Stanmore', lat: -33.8946, lon: 151.1645, openedYear: 1878, arrondissement: 'Inner West', architecture: 'Main Suburban Six-Track Corridor', description: 'Inner West corridor toward Strathfield and the Hawkesbury River.' }
      ]
    }
  ],
  railTermini: [
    {
      id: 'gl-sydney-central',
      metroStationId: 'central-sydney',
      monumentId: 'monument-central-station-sydney',
      name: 'Sydney Central Terminal',
      shortName: 'CENTRAL (NSWGR)',
      historicCompany: 'New South Wales Government Railways (1855 / 1906)',
      modernNetwork: 'NSW TrainLink Regional • Indian Pacific • XPT',
      openedYear: 1906,
      trainStartYear: 1900,
      trainEndYear: 2026,
      buildingEndYear: 2026,
      arrondissement: 'Haymarket',
      destinationLabel: 'TO CANBERRA • MELBOURNE • BRISBANE • PERTH',
      colorHex: '#e8a849',
      lat: -33.8832,
      lon: 151.2062,
      rotationY: -2.92,
      trackCount: 12,
      shedWidth: 2.6,
      shedLength: 3.3,
      shedHeight: 0.92,
      shedSpans: 3,
      hasClockTower: true,
      description: 'Opened in 1906 with Walter Liberty Vernon’s grand sandstone concourse and 85m clock tower, dispatching the Southern Aurora, Spirit of Progress, Indian Pacific, and regional XPT trains across Australia.',
      corridorLatLon: [
        [-33.8832, 151.2062],
        [-33.8895, 151.2015],
        [-33.8965, 151.1955],
        [-33.9040, 151.1865]
      ]
    }
  ],
  districts: [
    {
      id: 'dist-gadigal-cove',
      number: 1,
      shortLabel: 'Warrane',
      name: '1 — Warrane (Circular Quay), Tubowgule & The Rocks',
      officialName: 'Sydney Cove & Bennelong Point',
      quartiers: 'Tubowgule (Bennelong Point) • Tallawoladah (The Rocks) • Dawes Point • Circular Quay',
      bank: 'South Harbour Shore',
      filterGroup: 'core',
      eraBadge: 'GADIGAL COUNTRY & HARBOUR ICONS',
      foundedLabel: 'DREAMING • 1788 • 1973',
      lat: -33.8585,
      lon: 151.2115,
      standOffRadius: 29.0,
      cameraHeightOffset: 17.5,
      haloRadiusScale: 2.3,
      metroLines: ['T1', 'T2'],
      history: 'For tens of thousands of years, Tubowgule and Warrane were gathering places of the Gadigal people of the Eora Nation, where shell middens later supplied lime for early colonial buildings—and later inspired the shimmering shells of the Sydney Opera House (1973).',
      notableLandmarks: 'Sydney Opera House, Sydney Harbour Bridge, Circular Quay, Royal Botanic Garden'
    },
    {
      id: 'dist-cbd-sandstone',
      number: 2,
      shortLabel: 'CBD & Hyde',
      name: '2 — Martin Place, Town Hall, Barangaroo & Hyde Park',
      officialName: 'City of Sydney Civic Spine',
      quartiers: 'Barangaroo • Wynyard • Martin Place • Town Hall • Hyde Park',
      bank: 'South Harbour Shore',
      filterGroup: 'core',
      eraBadge: 'SANDSTONE ARCADES & METRO CATHEDRALS',
      foundedLabel: 'QVB 1898 • BRADFIELD 1926 • METRO 2024',
      lat: -33.8705,
      lon: 151.2085,
      standOffRadius: 30.0,
      cameraHeightOffset: 18.0,
      haloRadiusScale: 2.3,
      metroLines: ['M1', 'T1', 'T2', 'T4'],
      history: 'Stretching from the restored sandstone headland of Barangaroo to the Victorian domes of the Queen Victoria Building and Hyde Park, underpinned by both Bradfield’s 1926–1932 City Circle and the 2024 M1 Metro.',
      notableLandmarks: 'Queen Victoria Building, Sydney Tower Eye, St Mary’s Cathedral, Barangaroo, Gadigal Station'
    },
    {
      id: 'dist-central-redfern',
      number: 3,
      shortLabel: 'Central / Redfern',
      name: '3 — Central Station, Haymarket & Redfern',
      officialName: 'Southern Railway Gateway & Redfern',
      quartiers: 'Haymarket • Surry Hills • Chippendale • Redfern • Waterloo',
      bank: 'Inner South',
      filterGroup: 'riveGauche',
      eraBadge: 'RAILWAY BIRTHPLACE & FIRST NATIONS HEART',
      foundedLabel: 'RAILWAY 1855 • CENTRAL 1906',
      lat: -33.8865,
      lon: 151.2035,
      standOffRadius: 31.0,
      cameraHeightOffset: 18.5,
      haloRadiusScale: 2.3,
      metroLines: ['M1', 'T1', 'T2', 'T4'],
      history: 'Site of New South Wales’s first 1855 steam train departure and the 1906 Central Terminal, while neighboring Redfern stands as a proud urban heart of Aboriginal community activism, culture, and art.',
      notableLandmarks: 'Central Station Clock Tower, Redfern Station, Railway Square, Waterloo Metro'
    },
    {
      id: 'dist-north-shore',
      number: 4,
      shortLabel: 'North Shore',
      name: '4 — Milsons Point, Kirribilli & North Sydney (Cammeraygal)',
      officialName: 'Lower North Shore & Harbour Headlands',
      quartiers: 'Milsons Point • Kirribilli • McMahons Point • North Sydney • Crows Nest',
      bank: 'North Harbour Shore',
      filterGroup: 'riveDroite',
      eraBadge: 'CAMMERAYGAL SHORE & BRIDGE NORTHERN ARCH',
      foundedLabel: 'BRIDGE 1932 • METRO 2024',
      lat: -33.8440,
      lon: 151.2095,
      standOffRadius: 31.0,
      cameraHeightOffset: 18.5,
      haloRadiusScale: 2.3,
      metroLines: ['M1', 'T1'],
      history: 'Traditional Country of the Cammeraygal people across Port Jackson, connected to the city core by the 1932 Sydney Harbour Bridge deck and the 2024 twin under-harbour tunnels of Sydney Metro M1.',
      notableLandmarks: 'Luna Park Milsons Point, Harbour Bridge Northern Pylons, Victoria Cross Metro'
    }
  ],
  tourStops: [
    {
      id: 'tour-sydney-tubowgule-opera',
      stopNumber: 1,
      title: 'Tubowgule (Bennelong Point) & the Sydney Opera House',
      historicalDate: 'Ancient Dreaming • Oct 20, 1973',
      timelineYear: 1973,
      locationName: 'Sydney Opera House (Tubowgule)',
      arrondissement: 'Bennelong Point',
      lat: -33.8568,
      lon: 151.2153,
      radiusScale: 1.85,
      monumentId: 'monument-sydney-opera-house',
      stationId: 'circular-quay',
      interviewQuestion: 'What is the Gadigal name for Bennelong Point, and how did Jørn Utzon solve the geometry of the Opera House shells?',
      fact: 'Known to the Gadigal people for millennia as Tubowgule ("where the knowledge waters meet"), Bennelong Point was crowned in 1973 by Jørn Utzon’s Concrete Sails—famously solved in 1961 by slicing all shells from a single sphere of identical radius.'
    },
    {
      id: 'tour-sydney-harbour-bridge-bradfield',
      stopNumber: 2,
      title: 'Dr. John Bradfield & the 1932 Sydney Harbour Bridge',
      historicalDate: 'March 19, 1932',
      timelineYear: 1932,
      locationName: 'Sydney Harbour Bridge',
      arrondissement: 'Dawes Point ↔ Milsons Point',
      lat: -33.8523,
      lon: 151.2108,
      radiusScale: 1.9,
      monumentId: 'monument-harbour-bridge',
      stationId: 'milsons-point',
      interviewQuestion: 'How were the two giant steel half-arches of the Sydney Harbour Bridge held aloft before meeting in August 1930?',
      fact: 'Anchored by 128 steel cables threaded into deep U-shaped tunnels blasted into the sandstone bedrock on each shore, the two 503m cantilevers met at the center on August 19, 1930 and opened with four railway tracks on March 19, 1932.'
    },
    {
      id: 'tour-sydney-st-james-1926',
      stopNumber: 3,
      title: 'St James Station: Australia’s First Underground & Ghost Tunnels',
      historicalDate: 'December 20, 1926',
      timelineYear: 1926,
      locationName: 'Hyde Park North & St Mary’s Cathedral',
      arrondissement: 'Hyde Park',
      lat: -33.8702,
      lon: 151.2118,
      radiusScale: 1.55,
      monumentId: 'monument-st-marys-cathedral',
      stationId: 'st-james',
      interviewQuestion: 'Why does St James Station have four platform faces when only two tracks are used by City Circle trains?',
      fact: 'Opened on December 20, 1926 as Australia’s first underground railway alongside Museum station, St James was built with two inner platforms for a planned Bondi–Balmain line that was halted by the Great Depression—leaving flooded ghost tunnels beneath Hyde Park.'
    },
    {
      id: 'tour-sydney-central-clock-tower',
      stopNumber: 4,
      title: 'Central Station: From 1855 Steam to 2024 Driverless Metro',
      historicalDate: '1855 • 1906 • Aug 19, 2024',
      timelineYear: 1906,
      locationName: 'Sydney Central Station',
      arrondissement: 'Haymarket',
      lat: -33.8832,
      lon: 151.2062,
      radiusScale: 1.75,
      monumentId: 'monument-central-station-sydney',
      stationId: 'central-sydney',
      interviewQuestion: 'How does Central Station bridge three centuries of Australian rail history?',
      fact: 'Next to the 1855 Devonshire Street terminus, Walter Liberty Vernon’s 1906 sandstone terminal and 85m clock tower now sit directly above the 27-meter-deep Sydney Metro M1 cavern opened in August 2024.'
    },
    {
      id: 'tour-sydney-qvb-town-hall',
      stopNumber: 5,
      title: 'Queen Victoria Building & the George Street Spine',
      historicalDate: '1898 • 1932 • 2019',
      timelineYear: 1932,
      locationName: 'Queen Victoria Building & Town Hall',
      arrondissement: 'CBD',
      lat: -33.8718,
      lon: 151.2067,
      radiusScale: 1.6,
      monumentId: 'monument-qvb',
      stationId: 'town-hall',
      interviewQuestion: 'Why was the Queen Victoria Building built in 1898, and how is it integrated with Sydney’s underground transit?',
      fact: 'Designed by City Architect George McRae during the 1890s depression to employ stonemasons across a full block of George Street, the QVB connects via underground arcades directly to Town Hall (1932) and Gadigal (2024) stations.'
    },
    {
      id: 'tour-sydney-barangaroo-metro',
      stopNumber: 6,
      title: 'Barangaroo, Nawi Cove & the 2024 Under-Harbour Crossing',
      historicalDate: '1788 • Aug 19, 2024',
      timelineYear: 2024,
      locationName: 'Barangaroo & Wulugul Walk',
      arrondissement: 'Barangaroo',
      lat: -33.8592,
      lon: 151.2022,
      radiusScale: 1.65,
      monumentId: 'monument-barangaroo-crown',
      stationId: 'barangaroo',
      interviewQuestion: 'Who was Barangaroo, and what historic archaeological vessel was uncovered during excavation of Barangaroo Metro station?',
      fact: 'Named after Barangaroo, a fiercely independent Cammeraygal leader and fisherwoman, the precinct’s 2024 Metro excavation uncovered the oldest colonial timber boat ever found in NSW alongside thousands of years of Indigenous coastal heritage.'
    }
  ],
  uiTheme: {
    culturalMovement: 'First Nations Aboriginal Dot-Art, Red Ochre Country & Sydney Sandstone',
    hudTitle: 'SYDNEY WARRANE • 1855–2026',
    hudSubtitle: 'GADIGAL COUNTRY, HARBOUR SAILS & METRO • 3D ARCHITECTURE & TRANSIT',
    networkTitle: 'SYDNEY METRO M1 & BRADFIELD CITY CIRCLE',
    districtsTabLabel: 'Precincts',
    tourTabLabel: 'Gadigal & Harbour Tour',
    tourPanelTitle: 'GADIGAL COUNTRY & SYDNEY HARBOUR ODYSSEY',
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap',
    palette: {
      bgObsidian: '#140f0c',
      bgPanel: 'rgba(24, 17, 13, 0.88)',
      bgPanelElevated: 'rgba(36, 25, 19, 0.94)',
      primaryBright: '#f0b85c',
      primaryMain: '#d98a3c',
      primaryMuted: '#9e5824',
      borderSubtle: 'rgba(217, 138, 60, 0.42)',
      borderStrong: 'rgba(200, 90, 50, 0.85)',
      accentGlow: 'rgba(217, 138, 60, 0.24)',
      textPrimary: '#f7f0e4',
      textDim: '#cbbba4',
      textSubtle: '#8f7d68',
      secondaryAccent: '#009b77',
      alertAccent: '#c85a32',
      worldGroundBase: '#dec8a8',
      worldWaterTint: '#0c5278',
      worldWallBase: '#e4cca6',
      worldRoofBase: '#9e5438'
    },
    fonts: {
      display: "'Cinzel', 'Cormorant Garamond', Georgia, serif",
      serif: "'Cormorant Garamond', Georgia, serif",
      sans: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      mono: "'JetBrains Mono', monospace"
    },
    svgOrnamentPaths: [
      'M16 16 m -12 0 a 12 12 0 1 0 24 0 a 12 12 0 1 0 -24 0',
      'M16 16 m -7 0 a 7 7 0 1 0 14 0 a 7 7 0 1 0 -14 0',
      'M16 16 m -2.5 0 a 2.5 2.5 0 1 0 5 0 a 2.5 2.5 0 1 0 -5 0'
    ]
  }
};
