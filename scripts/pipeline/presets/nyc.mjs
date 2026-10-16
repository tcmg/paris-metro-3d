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

export const NYC_PRESET = {
  cityId: 'nyc',
  cityName: 'New York City',
  countryName: 'United States',
  geo: {
    centerLat: 40.7420,
    centerLon: -73.9880,
    bbox: [40.685, -74.048, 40.805, -73.930],
    kmPerDegLat: 111.05,
    kmPerDegLon: 84.32,
    worldUnitsPerKm: 10.2,
    coreRadiusKm: 8.2,
    isCoastal: true
  },
  topography: [
    // Upper Manhattan / Morningside Heights & Hamilton Heights Schist Ridge
    { name: 'Morningside Heights & Harlem Schist Ridge', lat: 40.8075, lon: -73.9625, height: 0.58, rx: 6.5, rz: 10.0 },
    // Murray Hill & Central Park Bedrock Outcrops
    { name: 'Murray Hill & Midtown Bedrock', lat: 40.7478, lon: -73.9785, height: 0.28, rx: 5.0, rz: 6.5 },
    // Brooklyn Heights Bluff
    { name: 'Brooklyn Heights Bluff', lat: 40.6960, lon: -73.9950, height: 0.42, rx: 5.5, rz: 5.5 },
    // New Jersey Palisades Cliffs (West Bank of Hudson River)
    { name: 'Hudson Palisades Escarpment', lat: 40.7750, lon: -74.0180, height: 0.95, rx: 4.5, rz: 16.0 }
  ],
  waterCenterlines: [
    // Hudson River (North River) down the west flank of Manhattan into Upper New York Bay
    [40.8050, -73.9780, 5.2],
    [40.7750, -73.9980, 5.4],
    [40.7450, -74.0140, 5.5],
    [40.7150, -74.0200, 5.8],
    [40.6950, -74.0280, 6.4],
    // East River around Lower Manhattan -> Brooklyn Bridge -> Roosevelt Island
    [40.7000, -74.0060, 3.4],
    [40.7061, -73.9969, 3.1], // Brooklyn Bridge
    [40.7135, -73.9800, 3.4], // Williamsburg Bridge
    [40.7420, -73.9680, 3.6], // Queensboro Tunnel
    [40.7600, -73.9560, 3.5]  // Roosevelt Island
  ],
  bridges: [
    {
      id: 'bridge-brooklyn',
      name: 'Brooklyn Bridge',
      lat: 40.7061,
      lon: -73.9969,
      builtYear: 1883,
      lengthWorld: 4.8,
      widthWorld: 0.48,
      rotationY: -0.78,
      style: 'suspension'
    },
    {
      id: 'bridge-manhattan',
      name: 'Manhattan Bridge (BMT / IND Subway Tracks)',
      lat: 40.7075,
      lon: -73.9908,
      builtYear: 1909,
      lengthWorld: 4.9,
      widthWorld: 0.52,
      rotationY: -0.92,
      style: 'suspension'
    },
    {
      id: 'bridge-williamsburg',
      name: 'Williamsburg Bridge (J/M/Z Elevated Tracks)',
      lat: 40.7135,
      lon: -73.9722,
      builtYear: 1903,
      lengthWorld: 5.1,
      widthWorld: 0.50,
      rotationY: -0.25,
      style: 'suspension'
    },
    {
      id: 'bridge-queensboro',
      name: 'Ed Koch Queensboro Bridge (59th Street Bridge)',
      lat: 40.7570,
      lon: -73.9545,
      builtYear: 1909,
      lengthWorld: 5.4,
      widthWorld: 0.48,
      rotationY: -0.48,
      style: 'iron-arch'
    }
  ],
  parks: [
    { name: 'Central Park (Olmsted & Vaux Greensward)', lat: 40.7812, lon: -73.9665, rx: 4.4, rz: 18.5, rotation: 0.50, hasBasin: true },
    { name: 'Battery Park', lat: 40.7033, lon: -74.0170, rx: 2.8, rz: 3.2, rotation: 0.0 },
    { name: 'Bryant Park & NY Public Library Terrace', lat: 40.7536, lon: -73.9832, rx: 1.8, rz: 2.2, rotation: 0.50, hasBasin: true },
    { name: 'Washington Square Park', lat: 40.7308, lon: -73.9973, rx: 2.0, rz: 1.8, rotation: 0.50, hasBasin: true },
    { name: 'Union Square & Madison Square', lat: 40.7359, lon: -73.9911, rx: 1.8, rz: 2.4, rotation: 0.50 }
  ],
  places: [
    { name: 'Times Square (Crossroads of the World)', lat: 40.7580, lon: -73.9855, radius: 2.6, hasColumnOrObelisk: true },
    { name: 'Grand Army Plaza (59th St & Fifth Ave)', lat: 40.7644, lon: -73.9732, radius: 2.2 },
    { name: 'Columbus Circle', lat: 40.7681, lon: -73.9819, radius: 2.3, hasColumnOrObelisk: true },
    { name: 'City Hall Park & Foley Square', lat: 40.7128, lon: -74.0060, radius: 2.5 }
  ],
  monuments: [
    {
      id: 'monument-empire-state',
      name: 'Empire State Building',
      lat: 40.7484,
      lon: -73.9857,
      builtYear: 1931,
      constructionStartYear: 1930,
      radius: 4.5,
      heightMeters: 443,
      era: 'empire1900',
      eraLabel: 'Art Deco • 1931',
      connectedLines: ['123', 'BDFM', 'NQRW'],
      style: '102-Story Indiana Limestone Art Deco Setback Skyscraper & Mooring Mast (Shreve, Lamb & Harmon, 1931)',
      arrondissement: 'Midtown Manhattan (34th St)',
      rotationY: 0.50,
      scale: 0.85,
      archetype: 'empire_state_tower',
      primaryColor: '#dcd5c6',
      accentColor: '#e5b842',
      description: 'Erected in an astonishing 410 days between 1930 and May 1, 1931 above 34th Street–Herald Square and Penn Station, reigning for 40 years as the tallest building on Earth.'
    },
    {
      id: 'monument-chrysler-building',
      name: 'Chrysler Building',
      lat: 40.7516,
      lon: -73.9755,
      builtYear: 1930,
      radius: 4.0,
      heightMeters: 319,
      era: 'empire1900',
      eraLabel: 'Jazz Age Crown • 1930',
      connectedLines: ['456', '7', 'S'],
      style: 'Terraced Nirosta Stainless-Steel Sunburst Crown & Eagle Gargoyles (William Van Alen, 1930)',
      arrondissement: 'Midtown East (42nd St)',
      rotationY: 0.50,
      scale: 0.82,
      archetype: 'chrysler_sunburst_tower',
      primaryColor: '#e0e5eb',
      accentColor: '#f5b82e',
      description: 'Crowned by seven radiating arches of Nirosta stainless steel and a secretly hoisted 56-meter vertex spire, linked directly beneath Lexington Avenue to Grand Central Terminal.'
    },
    {
      id: 'monument-statue-of-liberty',
      name: 'Statue of Liberty (Liberty Enlightening the World)',
      lat: 40.6892,
      lon: -74.0445,
      builtYear: 1886,
      radius: 4.8,
      heightMeters: 93,
      era: 'empire1900',
      eraLabel: 'Bartholdi & Eiffel • 1886',
      connectedLines: ['123', '456'],
      style: 'Copper Repoussé Colossal Statue with Internal Iron Pylon by Gustave Eiffel & Granite Star Pedestal by Richard Morris Hunt (1886)',
      arrondissement: 'Liberty Island (New York Harbor)',
      rotationY: 0.65,
      scale: 0.85,
      archetype: 'statue_of_liberty',
      primaryColor: '#56b39d',
      accentColor: '#ffda66',
      description: 'Gifted by the people of France in 1886—sculpted in Paris by Frédéric Auguste Bartholdi over an internal iron armature engineered by Gustave Eiffel three years before the Eiffel Tower.'
    },
    {
      id: 'monument-brooklyn-bridge',
      name: 'Brooklyn Bridge',
      lat: 40.7061,
      lon: -73.9969,
      builtYear: 1883,
      constructionStartYear: 1869,
      radius: 5.4,
      heightMeters: 84,
      era: 'empire1900',
      eraLabel: 'Roebling Gothic • 1883',
      connectedLines: ['456', 'ACE', 'J'],
      style: 'Twin Neo-Gothic Granite Towers & Diagonal Steel-Wire Stays (John, Washington & Emily Warren Roebling, 1883)',
      arrondissement: 'Civic Center ↔ Brooklyn Heights',
      rotationY: -0.78,
      scale: 0.84,
      archetype: 'gothic_suspension_bridge',
      primaryColor: '#c4b8a4',
      accentColor: '#7a828a',
      description: 'Inaugurated on May 24, 1883 across the East River; its Manhattan approach sits directly above the 1904 IRT City Hall loop and Brooklyn Bridge–City Hall subway hub.'
    },
    {
      id: 'monument-one-world-trade',
      name: 'One World Trade Center & Oculus',
      lat: 40.7127,
      lon: -74.0134,
      builtYear: 2014,
      constructionStartYear: 2006,
      radius: 4.8,
      heightMeters: 541,
      era: 'modern',
      eraLabel: '1,776 Feet • 2014',
      connectedLines: ['123', 'ACE', 'NQRW', 'PATH'],
      style: '1,776-Foot Antiprism Glass Tower (SOM) & Ribbed White Steel Oculus Transit Hall (Santiago Calatrava, 2014–2016)',
      arrondissement: 'Lower Manhattan (Financial District)',
      rotationY: 0.50,
      scale: 0.86,
      archetype: 'one_wtc_and_oculus',
      primaryColor: '#98c9e8',
      accentColor: '#ffffff',
      description: 'Rising to a symbolic 1,776 feet (541m) beside the 9/11 Memorial pools and Santiago Calatrava’s winged white Oculus linking 11 NYC Subway lines and PATH trains under the Hudson.'
    },
    {
      id: 'monument-grand-central',
      name: 'Grand Central Terminal',
      lat: 40.7527,
      lon: -73.9772,
      builtYear: 1913,
      constructionStartYear: 1903,
      radius: 4.4,
      heightMeters: 48,
      era: 'gares',
      eraLabel: 'Beaux-Arts • 1913 / 2023',
      connectedLines: ['456', '7', 'S'],
      style: 'Beaux-Arts Indiana Limestone Facade, Mercury Clock, Celestial Ceiling Concourse & Bi-Level 67-Track Vaults (Reed & Stem / Warren & Wetmore, 1913)',
      arrondissement: 'Midtown East (42nd St)',
      rotationY: 0.50,
      scale: 0.80,
      archetype: 'beaux_arts_terminus',
      primaryColor: '#dfd5c0',
      accentColor: '#4ca896',
      description: 'Opened on February 2, 1913 over William J. Wilgus’s electrified two-level subterranean rail yard; expanded 15 stories deep in January 2023 with the Grand Central Madison LIRR caverns.'
    },
    {
      id: 'monument-flatiron',
      name: 'Flatiron Building (Fuller Building)',
      lat: 40.7411,
      lon: -73.9897,
      builtYear: 1902,
      radius: 3.4,
      heightMeters: 87,
      era: 'empire1900',
      eraLabel: 'Beaux-Arts Wedge • 1902',
      connectedLines: ['NQRW', '456'],
      style: '22-Story Triangular Steel-Frame Beaux-Arts Palazzo in Limestone & Terracotta (Daniel Burnham, 1902)',
      arrondissement: 'Flatiron District (23rd St & Broadway)',
      rotationY: 0.50,
      scale: 0.76,
      archetype: 'flatiron_wedge',
      primaryColor: '#d9ceb8',
      accentColor: '#9e8f75',
      description: 'Completed in 1902 at the acute triangular intersection where Broadway slices across Fifth Avenue at 23rd Street, just two years before the first IRT subway opened underneath.'
    },
    {
      id: 'monument-rockefeller-center',
      name: '30 Rockefeller Plaza (30 Rock)',
      lat: 40.7587,
      lon: -73.9787,
      builtYear: 1933,
      radius: 4.2,
      heightMeters: 259,
      era: 'modern',
      eraLabel: 'Art Deco City • 1933',
      connectedLines: ['BDFM'],
      style: '70-Story Limestone Slab Skyscraper & Sunken Prometheus Plaza (Raymond Hood, 1933)',
      arrondissement: 'Midtown Manhattan (50th St)',
      rotationY: 0.50,
      scale: 0.80,
      archetype: 'art_deco_slab',
      primaryColor: '#d8d2c5',
      accentColor: '#f5b82e',
      description: 'Centerpiece of Raymond Hood’s Art Deco city-within-a-city built during the Great Depression, served directly below by the 1940 IND Sixth Avenue Line.'
    }
  ],
  milestones: [
    { year: 1883, shortLabel: '1883', headline: 'May 24, 1883: Opening of the Brooklyn Bridge & cable railway across the East River' },
    { year: 1904, shortLabel: '1904', headline: 'Oct 27, 1904: Inauguration of the first NYC Subway (IRT Line from City Hall to 145th Street)' },
    { year: 1908, shortLabel: '1908', headline: 'Jan 9, 1908: The IRT Lexington/Joralemon tube dives under the East River to Brooklyn' },
    { year: 1913, shortLabel: '1913', headline: 'Feb 2, 1913: Opening of the Beaux-Arts Grand Central Terminal & the Dual Contracts expansion' },
    { year: 1931, shortLabel: '1931', headline: '1930–1932: Chrysler & Empire State Buildings crown Midtown as the city-owned IND 8th Ave Subway opens' },
    { year: 1940, shortLabel: '1940', headline: 'June 1940: Unification of the three rival networks (IRT, BMT & IND) & 6th Ave Subway opening' },
    { year: 1945, shortLabel: '1945', headline: 'Dec 31, 1945: Closure of the ornate Guastavino-vaulted 1904 City Hall Ghost Station' },
    { year: 1972, shortLabel: '1972', headline: 'Aug 1972: Massimo Vignelli’s iconic modernist NYC Subway Map & Helvetica signage system' },
    { year: 2017, shortLabel: '2017', headline: 'Jan 1, 2017: Opening of the Second Avenue Subway (Q Line) on the Upper East Side' },
    { year: 2026, shortLabel: '2026', headline: '2026: 472-Station 24/7 NYC Subway, Oculus & Grand Central Madison' }
  ],
  eras: [
    {
      startYear: 1880,
      endYear: 1912,
      eraTag: 'GILDED AGE & THE 1904 IRT • 1880–1912',
      title: 'Brooklyn Bridge, Statue of Liberty & the 1904 City Hall Subway',
      description: 'After the Great Blizzard of 1888 paralyzed Manhattan’s elevated steam lines, chief engineer William Barclay Parsons built the four-track express/local Interborough Rapid Transit (IRT) subway, opening on October 27, 1904 from the Guastavino-tiled vaults of City Hall.',
      urbanChanges: [
        'Brooklyn Bridge (1883), Statue of Liberty (1886) & Flatiron Building (1902)',
        'Inaugural IRT Subway opens from City Hall through Grand Central & Times Square to 145th St (Oct 27, 1904)',
        'First under-river subway tube to Brooklyn at Bowling Green ↔ Borough Hall (1908)'
      ]
    },
    {
      startYear: 1913,
      endYear: 1939,
      eraTag: 'DUAL CONTRACTS & ART DECO TOWERS • 1913–1939',
      title: 'Grand Central, the "H" System, IND & the Skyscraper Race',
      description: 'The 1913 Dual Contracts doubled the IRT and BMT networks into the famous 1918 "H" system (creating the 42nd St Shuttle), while the 1930–1933 Art Deco boom raised the Chrysler, Empire State, and Rockefeller towers above the new city-owned IND subway.',
      urbanChanges: [
        'Opening of Grand Central Terminal (1913) & the IRT Lexington/7th Ave "H" network (1918)',
        'Chrysler Building (1930), Empire State Building (1931) & Rockefeller Center (1933)',
        'City-owned Independent Subway System (IND A/C/E & B/D/F/M lines) opens (1932–1940)'
      ]
    },
    {
      startYear: 1940,
      endYear: 1999,
      eraTag: 'UNIFICATION & VIGNELLI MODERNISM • 1940–1999',
      title: 'IRT–BMT–IND Unification, Chrystie Street & the Vignelli Identity',
      description: 'In June 1940, the City of New York unified the rival IRT, BMT, and IND companies into a single municipal system, later united visually by Unimark’s Massimo Vignelli and Bob Noorda with Helvetica signage and color-coded trunk bullets.',
      urbanChanges: [
        'Unification of IRT, BMT, and IND (1940) & closure of the 1904 City Hall loop station (1945)',
        'Chrystie Street Connection links IND 6th Ave to the Manhattan & Williamsburg bridges (1967)',
        'Unimark / Massimo Vignelli Helvetica signage (1967–1970) & iconic 1972 diagram'
      ]
    },
    {
      startYear: 2000,
      endYear: 2026,
      eraTag: '21ST-CENTURY MEGACAVERNS • 2000–2026',
      title: 'WTC Oculus, Hudson Yards, Second Avenue & Grand Central Madison',
      description: 'New York engineered a new generation of deep subterranean cathedrals: the 7 Line extension to Hudson Yards (2015), Calatrava’s World Trade Center Oculus (2016), the Second Avenue Subway (2017), and Grand Central Madison (2023).',
      urbanChanges: [
        'One World Trade Center (2014) & the WTC Transportation Hub Oculus (2016)',
        '7 Line Extension to 34th St–Hudson Yards (2015) & Second Avenue Subway Phase 1 (2017)',
        'Grand Central Madison deep LIRR caverns beneath Park Avenue (2023)'
      ]
    }
  ],
  metroLines: [
    {
      id: '456',
      name: '4 / 5 / 6 — IRT Lexington Avenue Express (1904 Original East Side)',
      shortLabel: '4•5•6',
      color: '#00933c',
      textColor: '#ffffff',
      openedYear: 1904,
      depthOffset: -2.2,
      historicCompany: 'IRT',
      summary: 'Incorporates the southern half of the inaugural October 27, 1904 IRT subway from City Hall to Grand Central, continuing north under Lexington Avenue and south under the East River to Brooklyn.',
      stations: [
        { id: '86-st-lex', name: '86 St (Lexington Ave)', lat: 40.7795, lon: -73.9556, openedYear: 1918, arrondissement: 'Upper East Side', architecture: 'Dual-Level Four-Track IRT Express/Local Vault', description: 'Opened in July 1918 when the IRTH system extended up Lexington Avenue.' },
        { id: '59-st-lex', name: '59 St / Lexington Ave', lat: 40.7625, lon: -73.9679, openedYear: 1918, arrondissement: 'Midtown East', architecture: 'Multi-Line Transfer Hub', description: 'Connects IRT 4/5/6 with BMT N/R/W and the Roosevelt Island Tram.' },
        { id: 'grand-central-42', name: 'Grand Central – 42 St', lat: 40.7518, lon: -73.9768, openedYear: 1904, arrondissement: 'Midtown East', architecture: '1904 Inaugural Station & 1918 Diagonal Lexington Vault', landmark: 'Grand Central Terminal & Chrysler Building', description: 'Inaugural 1904 IRT pivot point connecting 4/5/6, 7, and the 42nd Street Shuttle.' },
        { id: '14-st-union-sq', name: '14 St – Union Square', lat: 40.7347, lon: -73.9899, openedYear: 1904, arrondissement: 'Union Square', architecture: '1904 Heins & LaFarge Ceramic Plaque Concourse', description: 'Major interchange between IRT 4/5/6, BMT N/Q/R/W, and the 14th Street Canarsie L train.' },
        { id: 'astor-place', name: 'Astor Place', lat: 40.7301, lon: -73.9910, openedYear: 1904, arrondissement: 'East Village / NoHo', architecture: '1904 Cast-Iron Kiosk & Faience Beaver Medallions', description: 'Famous for its 1904 polychrome terracotta beaver plaques honoring John Jacob Astor.' },
        { id: 'brooklyn-bridge-city-hall', name: 'Brooklyn Bridge – City Hall', lat: 40.7131, lon: -74.0041, openedYear: 1904, arrondissement: 'Civic Center', architecture: '1904 Inaugural Four-Track Express Hub', landmark: 'Brooklyn Bridge', description: 'Adjacent to the ornate 1904 City Hall loop.' },
        { id: 'city-hall-ghost', name: 'City Hall Loop (1904 Guastavino Ghost Station)', lat: 40.7126, lon: -74.0062, openedYear: 1904, closedYear: 1945, isGhostStation: true, arrondissement: 'Civic Center', architecture: 'Rafael Guastavino Tile Arches, Brass Chandeliers & Leaded Glass Skylights', description: 'Showpiece southern terminus of the October 27, 1904 inaugural subway; closed to passengers in December 1945 because its tight curve could not accommodate longer 10-car trains, though 6 trains still loop through it today.' },
        { id: 'wall-street-lex', name: 'Wall Street', lat: 40.7076, lon: -74.0119, openedYear: 1905, arrondissement: 'Financial District', architecture: '1905 New Amsterdam Stockade Mosaic Vault', description: 'Serves the New York Stock Exchange and Trinity Church.' },
        { id: 'bowling-green', name: 'Bowling Green', lat: 40.7048, lon: -74.0141, openedYear: 1905, arrondissement: 'Battery / Financial District', architecture: '1905 Original Cast-Iron Control House', landmark: 'Statue of Liberty Ferry', description: 'Gateway to Battery Park and ferries to the Statue of Liberty.' },
        { id: 'borough-hall', name: 'Borough Hall (Brooklyn)', lat: 40.6932, lon: -73.9900, openedYear: 1908, arrondissement: 'Downtown Brooklyn', architecture: '1908 First Brooklyn Subway Station', description: 'Opened on January 9, 1908 as the very first underground subway station in Brooklyn via the Joralemon Street Tunnel.' }
      ]
    },
    {
      id: '123',
      name: '1 / 2 / 3 — IRT Broadway–Seventh Avenue Express',
      shortLabel: '1•2•3',
      color: '#ee352e',
      textColor: '#ffffff',
      openedYear: 1904,
      depthOffset: -2.4,
      historicCompany: 'IRT',
      summary: 'Combines the 1904 Upper Broadway IRT line with the 1918 Seventh Avenue extension through Times Square, Penn Station, and World Trade Center.',
      stations: [
        { id: '96-st-bway', name: '96 St (Broadway)', lat: 40.7939, lon: -73.9723, openedYear: 1904, arrondissement: 'Upper West Side', architecture: '1904 Inaugural Express Hub', description: 'Original 1904 Upper West Side express interchange.' },
        { id: '72-st-bway', name: '72 St (Broadway)', lat: 40.7785, lon: -73.9819, openedYear: 1904, arrondissement: 'Upper West Side', architecture: '1904 Heins & LaFarge Beaux-Arts Brick Headhouse', description: 'Features one of the last surviving 1904 Beaux-Arts island headhouses on Broadway.' },
        { id: '59-st-columbus', name: '59 St – Columbus Circle', lat: 40.7682, lon: -73.9819, openedYear: 1904, arrondissement: 'Midtown / UWS', architecture: '1904 Santa Maria Terracotta Caravel Plaques & IND Hub', landmark: 'Central Park Southwest', description: 'Opened in 1904 beneath the Columbus monument at the southwest corner of Central Park.' },
        { id: 'times-sq-42', name: 'Times Sq – 42 St', lat: 40.7553, lon: -73.9869, openedYear: 1904, arrondissement: 'Times Square', architecture: 'Crossroads of the World Mega-Hub', description: 'Busiest station in the NYC Subway network, linking 1/2/3, 7, N/Q/R/W, S, and A/C/E.' },
        { id: '34-st-penn', name: '34 St – Penn Station', lat: 40.7504, lon: -73.9910, openedYear: 1917, arrondissement: 'Midtown West', architecture: 'Mainline Rail & Express Subway Concourse', landmark: 'Empire State Building', description: 'Opened in 1917 to connect the IRT Seventh Avenue Line directly with Pennsylvania Station.' },
        { id: '14-st-7ave', name: '14 St (Seventh Ave)', lat: 40.7378, lon: -74.0002, openedYear: 1918, arrondissement: 'Greenwich Village / Chelsea', architecture: 'Four-Track Express Vault', description: 'Connects with the F/M and L lines.' },
        { id: 'chambers-st', name: 'Chambers St', lat: 40.7155, lon: -74.0093, openedYear: 1918, arrondissement: 'Tribeca', architecture: 'Express Junction for Brooklyn & South Ferry', description: 'Splits 1 trains to South Ferry and 2/3 trains to Wall Street and Brooklyn.' },
        { id: 'wtc-cortlandt', name: 'WTC Cortlandt (Oculus)', lat: 40.7118, lon: -74.0122, openedYear: 1918, arrondissement: 'Financial District', architecture: '2018 Rebuilt Column-Free Hall Integrated with Calatrava’s Oculus', landmark: 'One World Trade Center & Oculus', description: 'Reopened in 2018 with Ann Hamilton’s woven typographic marble walls inside the World Trade Center Oculus.' }
      ]
    },
    {
      id: 'ACE',
      name: 'A / C / E — IND Eighth Avenue Express ("A Train")',
      shortLabel: 'A•C•E',
      color: '#0039a6',
      textColor: '#ffffff',
      openedYear: 1932,
      depthOffset: -2.9,
      historicCompany: 'IND',
      summary: 'Inaugural trunk of the city-owned Independent Subway System (Sept 10, 1932), immortalized by Duke Ellington’s "Take the A Train".',
      stations: [
        { id: '59-st-columbus', name: '59 St – Columbus Circle', lat: 40.7682, lon: -73.9819, openedYear: 1932, arrondissement: 'Midtown / UWS', architecture: '1932 IND Art Deco Tile Banding', description: 'Southern anchor of the famous nonstop A-train express run to 125th Street in Harlem.' },
        { id: '42-st-port-authority', name: '42 St – Port Authority', lat: 40.7573, lon: -73.9897, openedYear: 1932, arrondissement: 'Times Square West', architecture: '1932 Multi-Level IND Express Hub', description: 'Connected via underground passage to Times Square.' },
        { id: '34-st-penn-ind', name: '34 St – Penn Station (8th Ave)', lat: 40.7523, lon: -73.9934, openedYear: 1932, arrondissement: 'Midtown West', architecture: 'Moynihan Train Hall & Penn Concourse', description: 'Direct access to the Farley/Moynihan Train Hall.' },
        { id: 'west-4-st', name: 'West 4 St – Washington Square', lat: 40.7323, lon: -74.0005, openedYear: 1932, arrondissement: 'Greenwich Village', architecture: 'Double-Deck Eight-Track IND Master Junction', description: 'Two-level subterranean flying junction uniting the IND 8th Avenue (A/C/E) and 6th Avenue (B/D/F/M) trunks.' },
        { id: 'fulton-st', name: 'Fulton Center / World Trade Center', lat: 40.7104, lon: -74.0095, openedYear: 1932, arrondissement: 'Financial District', architecture: '2014 Sky Reflector-Net Atrium & 9-Line Hub', landmark: 'One World Trade Center', description: 'Links A/C, 2/3, 4/5, and J/Z lines with the WTC Oculus via the Dey Street concourse.' },
        { id: 'high-st-brooklyn', name: 'High St – Brooklyn Bridge', lat: 40.6993, lon: -73.9905, openedYear: 1933, arrondissement: 'DUMBO / Brooklyn Heights', architecture: 'Deep Stacked Island Platform under Cranberry St', landmark: 'Brooklyn Bridge', description: 'Brooklyn gateway to the Brooklyn Bridge.' }
      ]
    },
    {
      id: 'BDFM',
      name: 'B / D / F / M — IND Sixth Avenue & Manhattan Bridge Line',
      shortLabel: 'B•D•F•M',
      color: '#ff6319',
      textColor: '#ffffff',
      openedYear: 1940,
      depthOffset: -3.3,
      historicCompany: 'IND',
      summary: 'Opened in December 1940 beneath Avenue of the Americas (Rockefeller Center, Bryant Park, Herald Square) and across the Manhattan Bridge.',
      stations: [
        { id: '47-50-rockefeller', name: '47–50 Sts – Rockefeller Center', lat: 40.7587, lon: -73.9813, openedYear: 1940, arrondissement: 'Midtown', architecture: 'Subterranean Art Deco Concourse Network', landmark: '30 Rockefeller Plaza', description: 'Connects directly into the underground concourse of Rockefeller Center.' },
        { id: '42-st-bryant-park', name: '42 St – Bryant Park / 5th Ave', lat: 40.7542, lon: -73.9846, openedYear: 1940, arrondissement: 'Midtown', architecture: 'Library & Park Vault', description: 'Beneath Bryant Park and the New York Public Library.' },
        { id: '34-st-herald-sq', name: '34 St – Herald Square', lat: 40.7496, lon: -73.9878, openedYear: 1940, arrondissement: 'Midtown', architecture: 'IND / BMT / PATH Super-Hub', landmark: 'Empire State Building', description: 'Stands one block west of the Empire State Building.' },
        { id: '23-st-6ave', name: '23 St', lat: 40.7429, lon: -73.9928, openedYear: 1940, arrondissement: 'Flatiron', architecture: 'Sixth Ave Vault', landmark: 'Flatiron Building', description: 'Serves the Flatiron District.' },
        { id: 'west-4-st', name: 'West 4 St – Washington Square', lat: 40.7323, lon: -74.0005, openedYear: 1940, arrondissement: 'Greenwich Village', architecture: 'Lower Level Express/Local Platforms', description: 'Lower deck of the West 4th Street junction.' },
        { id: 'grand-st-chrystie', name: 'Grand St (Manhattan Bridge Approach)', lat: 40.7183, lon: -73.9937, openedYear: 1967, elevated: true, arrondissement: 'Chinatown / Lower East Side', architecture: '1967 Chrystie Street Connection Portal to Manhattan Bridge', description: 'Climbs onto the outdoor steel tracks of the Manhattan Bridge over the East River.' }
      ]
    },
    {
      id: '7',
      name: '7 — IRT Flushing Line (Hudson Yards ↔ Times Sq ↔ Grand Central ↔ Queens)',
      shortLabel: '7',
      color: '#b933ad',
      textColor: '#ffffff',
      openedYear: 1915,
      depthOffset: -3.7,
      historicCompany: 'IRT',
      summary: 'Runs cross-town beneath 42nd Street from Hudson Yards through Times Square and Grand Central before diving through the 1915 Steinway Tunnel to Queens.',
      stations: [
        { id: '34-st-hudson-yards', name: '34 St – Hudson Yards', lat: 40.7558, lon: -74.0022, openedYear: 2015, arrondissement: 'Hudson Yards', architecture: '34m-Deep Column-Free Cavern & Inclined Elevators (Dattner)', description: 'Opened in September 2015 as the first brand-new NYC Subway station in 26 years.' },
        { id: 'times-sq-42', name: 'Times Sq – 42 St', lat: 40.7553, lon: -73.9869, openedYear: 1927, arrondissement: 'Times Square', architecture: 'Deep Cross-Town Tube', description: 'Crosses under the Broadway and 7th Ave trunks.' },
        { id: 'grand-central-42', name: 'Grand Central – 42 St', lat: 40.7518, lon: -73.9768, openedYear: 1915, arrondissement: 'Midtown East', architecture: 'Circular Cast-Iron Steinway Tunnel Tube Cavern', landmark: 'Grand Central & Chrysler Building', description: 'Inaugurated in June 1915 inside the historic 1892–1907 Steinway streetcar tunnel beneath the East River.' },
        { id: 'vernon-blvd-jackson', name: 'Vernon Blvd – Jackson Ave (Long Island City)', lat: 40.7426, lon: -73.9536, openedYear: 1915, arrondissement: 'Queens (LIC)', architecture: 'East River Tunnel Portal', description: 'First station in Queens after emerging from beneath the East River.' }
      ]
    }
  ],
  railTermini: [
    {
      id: 'gl-grand-central-terminal',
      metroStationId: 'grand-central-42',
      monumentId: 'monument-grand-central',
      name: 'Grand Central Terminal',
      shortName: 'GRAND CENTRAL',
      historicCompany: 'New York Central Railroad — Cornelius Vanderbilt (1871 / 1913)',
      modernNetwork: 'Metro-North Railroad (Hudson, Harlem & New Haven) • LIRR Grand Central Madison',
      openedYear: 1913,
      trainStartYear: 1900,
      trainEndYear: 2026,
      buildingEndYear: 2026,
      arrondissement: 'Midtown East',
      destinationLabel: 'TO HUDSON VALLEY • NEW HAVEN • 20TH CENTURY LIMITED',
      colorHex: '#4ca896',
      lat: 40.7527,
      lon: -73.9772,
      rotationY: 0.50,
      trackCount: 12,
      shedWidth: 2.6,
      shedLength: 3.4,
      shedHeight: 0.92,
      shedSpans: 3,
      hasClockTower: false,
      description: 'The world’s largest railway station by platform count (44 platforms, 67 subterranean tracks on two levels beneath Park Avenue), famous for launching the art deco 20th Century Limited to Chicago and saved by Jacqueline Kennedy Onassis in the landmark 1978 Supreme Court ruling.',
      corridorLatLon: [
        [40.7527, -73.9772],
        [40.7615, -73.9708],
        [40.7735, -73.9620],
        [40.7880, -73.9512]
      ]
    },
    {
      id: 'gl-penn-station-nyc',
      metroStationId: '34-st-penn',
      monumentId: 'monument-empire-state',
      name: 'Pennsylvania Station & Moynihan Train Hall',
      shortName: 'PENN STATION (PRR)',
      historicCompany: 'Pennsylvania Railroad — McKim, Mead & White (1910)',
      modernNetwork: 'Amtrak Acela Northeast Corridor • LIRR • NJ Transit',
      openedYear: 1910,
      trainStartYear: 1910,
      trainEndYear: 2026,
      buildingEndYear: 2026,
      arrondissement: 'Midtown West',
      destinationLabel: 'TO WASHINGTON D.C. • BOSTON (ACELA) • LONG ISLAND',
      colorHex: '#f5b82e',
      lat: 40.7506,
      lon: -73.9935,
      rotationY: -1.07,
      trackCount: 10,
      shedWidth: 2.4,
      shedLength: 3.1,
      shedHeight: 0.88,
      shedSpans: 2,
      description: 'Opened in 1910 when the Pennsylvania Railroad bored electrified tunnels under both the Hudson and East Rivers, making Penn Station the busiest passenger rail facility in the Western Hemisphere.',
      corridorLatLon: [
        [40.7506, -73.9935],
        [40.7535, -74.0020],
        [40.7580, -74.0150]
      ]
    }
  ],
  districts: [
    {
      id: 'dist-lower-manhattan',
      number: 1,
      shortLabel: 'Downtown / FiDi',
      name: '1 — Lower Manhattan, Wall Street, Civic Center & Liberty Harbor',
      officialName: 'Financial District, Civic Center & New York Harbor',
      quartiers: 'Wall Street • Battery Park • World Trade Center • Civic Center • Tribeca • Chinatown',
      bank: 'Lower Manhattan',
      filterGroup: 'core',
      eraBadge: '1624 NEW AMSTERDAM, 1883 BRIDGE & 1904 SUBWAY',
      foundedLabel: '1624 • 1883 • 1904 • 2014',
      lat: 40.7105,
      lon: -74.0095,
      standOffRadius: 31.0,
      cameraHeightOffset: 18.5,
      haloRadiusScale: 2.4,
      metroLines: ['456', '123', 'ACE'],
      history: 'From the 1624 Dutch settlement of New Amsterdam at the tip of Manhattan and the 1883 Brooklyn Bridge to the 1904 City Hall IRT Subway terminus and the 1,776-foot One World Trade Center and Oculus.',
      notableLandmarks: 'One World Trade Center & Oculus, Statue of Liberty, Brooklyn Bridge, 1904 City Hall Loop'
    },
    {
      id: 'dist-midtown-deco',
      number: 2,
      shortLabel: 'Midtown',
      name: '2 — Midtown Manhattan: Skyscraper Canyons, Times Sq & Grand Central',
      officialName: 'Midtown East & West (34th to 59th Streets)',
      quartiers: 'Times Square • Herald Square • Grand Central • Rockefeller Center • Hudson Yards',
      bank: 'Midtown Manhattan',
      filterGroup: 'core',
      eraBadge: 'ART DECO SKYSCRAPER CAPITAL & RAIL SUPER-HUBS',
      foundedLabel: 'GCT 1913 • CHRYSLER 1930 • EMPIRE STATE 1931',
      lat: 40.7535,
      lon: -73.9835,
      standOffRadius: 32.0,
      cameraHeightOffset: 19.5,
      haloRadiusScale: 2.5,
      metroLines: ['456', '123', 'ACE', 'BDFM', '7'],
      history: 'The vertical heart of Gotham where Grand Central Terminal (1913) and Penn Station (1910) fueled the 1930s Art Deco skyscraper race between the Chrysler Building, Empire State Building, and Rockefeller Center.',
      notableLandmarks: 'Empire State Building, Chrysler Building, Grand Central Terminal, 30 Rockefeller Plaza, Times Square'
    },
    {
      id: 'dist-village-flatiron',
      number: 3,
      shortLabel: 'Village / Flatiron',
      name: '3 — Flatiron, Union Square, Greenwich Village & SoHo',
      officialName: 'Midtown South & Greenwich Village',
      quartiers: 'Flatiron • Union Square • Greenwich Village • East Village • Chelsea • SoHo',
      bank: 'Manhattan Grid Junction',
      filterGroup: 'riveGauche',
      eraBadge: '1811 GRID MEETS GREENWICH VILLAGE',
      foundedLabel: '1811 COMMISSIONERS’ PLAN • FLATIRON 1902',
      lat: 40.7355,
      lon: -73.9945,
      standOffRadius: 29.0,
      cameraHeightOffset: 17.5,
      haloRadiusScale: 2.2,
      metroLines: ['456', '123', 'ACE', 'BDFM'],
      history: 'Where the diagonal trace of Broadway (an ancient Lenape trail) cuts across the 1811 Commissioners’ Grid at Union Square and 23rd Street—producing the 1902 Flatiron Building and the West 4th Street subway mega-junction.',
      notableLandmarks: 'Flatiron Building, Union Square, Washington Square Park, Astor Place'
    },
    {
      id: 'dist-central-park-uptown',
      number: 4,
      shortLabel: 'Central Park / Uptown',
      name: '4 — Central Park, Upper West Side & Upper East Side',
      officialName: 'Central Park & Upper Manhattan',
      quartiers: 'Central Park • Columbus Circle • Lincoln Center • Upper West Side • Upper East Side',
      bank: 'Uptown Manhattan',
      filterGroup: 'riveDroite',
      eraBadge: 'OLMSTED’S GREENSWARD & THE "A" TRAIN EXPRESS',
      foundedLabel: 'CENTRAL PARK 1858 • IRT 1904 • IND 1932',
      lat: 40.7760,
      lon: -73.9685,
      standOffRadius: 33.0,
      cameraHeightOffset: 19.0,
      haloRadiusScale: 2.4,
      metroLines: ['456', '123', 'ACE'],
      history: 'Anchored by Frederick Law Olmsted and Calvert Vaux’s 843-acre Central Park masterpiece, flanked on the west by the 1904 Broadway IRT and 1932 Central Park West "A Train" and on the east by the Lexington and Second Avenue subways.',
      notableLandmarks: 'Central Park, Columbus Circle, 72nd Street IRT Headhouse'
    }
  ],
  tourStops: [
    {
      id: 'tour-nyc-1904-city-hall',
      stopNumber: 1,
      title: 'October 27, 1904: City Hall & the Birth of the NYC Subway',
      historicalDate: 'October 27, 1904 • 1945',
      timelineYear: 1904,
      locationName: 'City Hall Loop & Brooklyn Bridge Station',
      arrondissement: 'Civic Center',
      lat: 40.7126,
      lon: -74.0062,
      radiusScale: 1.75,
      monumentId: 'monument-brooklyn-bridge',
      stationId: 'city-hall-ghost',
      interviewQuestion: 'What made the inaugural 1904 City Hall subway station an architectural jewel, and why did it become a ghost station in 1945?',
      fact: 'Opened by Mayor George B. McClellan with a silver controller handle on October 27, 1904, City Hall station featured soaring Guastavino terracotta vaults, brass chandeliers, and skylights; it closed in 1945 when lengthened 10-car center-door trains could no longer safely clear its tight loop platform.'
    },
    {
      id: 'tour-nyc-statue-of-liberty-eiffel',
      stopNumber: 2,
      title: 'Statue of Liberty: The Paris–New York Engineering Connection',
      historicalDate: 'October 28, 1886',
      timelineYear: 1905,
      locationName: 'Liberty Island & Bowling Green',
      arrondissement: 'New York Harbor',
      lat: 40.6892,
      lon: -74.0445,
      radiusScale: 1.9,
      monumentId: 'monument-statue-of-liberty',
      stationId: 'bowling-green',
      interviewQuestion: 'Which Parisian engineer designed the internal structural skeleton of the Statue of Liberty in 1881?',
      fact: 'Three years before beginning the Eiffel Tower in Paris, Gustave Eiffel and Maurice Koechlin engineered the 29-meter wrought-iron central pylon and flexible flat-bar curtain wall inside Bartholdi’s copper Statue of Liberty so she could sway safely in New York Harbor gales.'
    },
    {
      id: 'tour-nyc-brooklyn-bridge-roebling',
      stopNumber: 3,
      title: 'The Roeblings & the 1883 Brooklyn Bridge',
      historicalDate: 'May 24, 1883',
      timelineYear: 1904,
      locationName: 'Brooklyn Bridge',
      arrondissement: 'East River',
      lat: 40.7061,
      lon: -73.9969,
      radiusScale: 1.85,
      monumentId: 'monument-brooklyn-bridge',
      stationId: 'brooklyn-bridge-city-hall',
      interviewQuestion: 'Who oversaw the daily completion of the Brooklyn Bridge for 11 years and was the first person to cross it?',
      fact: 'After John A. Roebling died in 1869 and his son Washington Roebling was paralyzed by caisson disease ("the bends"), Emily Warren Roebling mastered higher mathematics and cable catenary engineering, leading construction to completion in May 1883.'
    },
    {
      id: 'tour-nyc-grand-central-1913',
      stopNumber: 4,
      title: 'Grand Central Terminal & the Electrified Subterranean City',
      historicalDate: 'February 2, 1913 • 1978 • 2023',
      timelineYear: 1913,
      locationName: 'Grand Central Terminal (42nd St & Park Ave)',
      arrondissement: 'Midtown East',
      lat: 40.7527,
      lon: -73.9772,
      radiusScale: 1.8,
      monumentId: 'monument-grand-central',
      stationId: 'grand-central-42',
      interviewQuestion: 'How did burying and electrifying the rail yard in 1903–1913 create modern Park Avenue above it?',
      fact: 'Chief engineer William J. Wilgus decked over 67 tracks on two underground levels and sold the "air rights" above the buried rail yard—turning a smoky open steam trench into the grandest boulevard of hotels and towers in Midtown Manhattan.'
    },
    {
      id: 'tour-nyc-chrysler-empire-state',
      stopNumber: 5,
      title: '1930–1931: The Chrysler Spire vs. the Empire State Building',
      historicalDate: 'May 1930 • May 1, 1931',
      timelineYear: 1931,
      locationName: 'Empire State Building & Chrysler Building',
      arrondissement: 'Midtown Manhattan',
      lat: 40.7484,
      lon: -73.9857,
      radiusScale: 1.85,
      monumentId: 'monument-empire-state',
      stationId: '34-st-herald-sq',
      interviewQuestion: 'How fast did ironworkers erect the 102-story steel frame of the Empire State Building in 1930?',
      fact: 'Rising at an average pace of 4.5 stories per week with structural steel delivered still warm from Pittsburgh mills, the Empire State Building was completed from excavation to opening day in just one year and 45 days.'
    },
    {
      id: 'tour-nyc-one-wtc-oculus',
      stopNumber: 6,
      title: 'One World Trade Center, the Oculus & Lower Manhattan Renewal',
      historicalDate: '2014 • 2016 • 2018',
      timelineYear: 2018,
      locationName: 'World Trade Center & Oculus',
      arrondissement: 'Lower Manhattan',
      lat: 40.7127,
      lon: -74.0134,
      radiusScale: 1.85,
      monumentId: 'monument-one-world-trade',
      stationId: 'wtc-cortlandt',
      interviewQuestion: 'Why does the skylight spine of Santiago Calatrava’s World Trade Center Oculus align at a precise angle every September 11?',
      fact: 'Designed as a "Bird in Flight" released from a child’s hands, the Oculus’s 108-meter operable glass roof spine is oriented so that at 10:28 AM every September 11, a single shaft of direct sunlight illuminates the center of the subterranean concourse floor.'
    }
  ],
  uiTheme: {
    culturalMovement: 'Gotham Skyscraper Art Deco, Oxidized Liberty Copper & Vignelli Subway Modernism',
    hudTitle: 'NEW YORK SUBWAY • 1883–2026',
    hudSubtitle: 'GOTHAM ART DECO, IRT/IND & VIGNELLI MODERNISM • 3D ARCHITECTURE & TRANSIT',
    networkTitle: 'NYC SUBWAY (IRT • BMT • IND) & GRAND TERMINALS',
    districtsTabLabel: 'Districts',
    tourTabLabel: 'Gotham Tour',
    tourPanelTitle: 'GOTHAM SKYSCRAPERS & SUBWAY HISTORY TOUR',
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;600&display=swap',
    palette: {
      bgObsidian: '#080b10',
      bgPanel: 'rgba(11, 15, 22, 0.90)',
      bgPanelElevated: 'rgba(18, 24, 34, 0.95)',
      primaryBright: '#ffca3a',
      primaryMain: '#f5b82e',
      primaryMuted: '#a67b1b',
      borderSubtle: 'rgba(76, 168, 150, 0.42)',
      borderStrong: 'rgba(245, 184, 46, 0.86)',
      accentGlow: 'rgba(76, 168, 150, 0.25)',
      textPrimary: '#f4f6f8',
      textDim: '#b4c0cc',
      textSubtle: '#738291',
      secondaryAccent: '#4ca896',
      alertAccent: '#ee352e',
      worldGroundBase: '#d4cfc4',
      worldWaterTint: '#16425b',
      worldWallBase: '#dcd5c6',
      worldRoofBase: '#586470'
    },
    fonts: {
      display: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      serif: "'Cormorant Garamond', Georgia, serif",
      sans: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      mono: "'JetBrains Mono', monospace"
    },
    svgOrnamentPaths: [
      'M16 2 L20 12 L28 12 L22 18 L24 28 L16 22 L8 28 L10 18 L4 12 L12 12 Z',
      'M2 6 L30 6 M2 10 L30 10'
    ]
  }
};
