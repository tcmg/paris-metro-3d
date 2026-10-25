/**
 * Copyright 2026 Google LLC
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

export const SAN_FRANCISCO_PRESET = {
  cityId: 'san-francisco',
  cityName: 'San Francisco',
  localName: 'San Francisco (Yelamu)',
  countryName: 'United States',
  region: 'California / Bay Area',
  timelineRange: [1873, 2026],
  geo: {
    centerLat: 37.7897,
    centerLon: -122.4098,
    bbox: [37.745, -122.488, 37.835, -122.360],
    kmPerDegLat: 111.0,
    kmPerDegLon: 88.0,
    worldUnitsPerKm: 11.2,
    coreRadiusKm: 7.4,
    isCoastal: true
  },
  topography: [
    // Nob Hill & Russian Hill Crest
    { name: 'Nob Hill & Russian Hill Crest', lat: 37.7932, lon: -122.4158, height: 0.78, rx: 5.2, rz: 4.8 },
    // Telegraph Hill (Pioneer Park & Coit Tower)
    { name: 'Telegraph Hill (Loma Alta)', lat: 37.8024, lon: -122.4058, height: 0.72, rx: 3.8, rz: 3.6 },
    // Twin Peaks & Mount Sutro Central Spine
    { name: 'Twin Peaks (Los Pechos de la Choca)', lat: 37.7544, lon: -122.4477, height: 0.95, rx: 8.8, rz: 8.2 },
    // Pacific Heights & Presidio Highlands
    { name: 'Pacific Heights & Presidio Ridge', lat: 37.7925, lon: -122.4388, height: 0.68, rx: 7.5, rz: 4.8 },
    // Potrero Hill & Rincon Hill
    { name: 'Potrero & Rincon Hills', lat: 37.7605, lon: -122.4008, height: 0.54, rx: 5.5, rz: 5.2 },
    // Marin Headlands (North Golden Gate Cliff)
    { name: 'Marin Headlands & Hawk Hill', lat: 37.8285, lon: -122.4815, height: 0.88, rx: 6.5, rz: 5.5 }
  ],
  waterCenterlines: [
    // Golden Gate Strait & San Francisco Bay from Golden Gate Bridge -> Alcatraz -> Fisherman's Wharf -> Ferry Building / Bay Bridge -> Mission Bay
    [37.8199, -122.4783, 4.6], // Golden Gate Strait beneath Golden Gate Bridge
    [37.8185, -122.4480, 4.8], // Crissy Field / Marina Channel
    [37.8180, -122.4233, 5.0], // Alcatraz Channel & Aquatic Park
    [37.8095, -122.4015, 4.6], // Fisherman's Wharf / Pier 39 / Telegraph Hill bend
    [37.7955, -122.3885, 4.8], // Ferry Building & Beneath Bay Bridge Western Span
    [37.7780, -122.3820, 4.5]  // China Basin / Oracle Park / Mission Bay
  ],
  bridges: [
    {
      id: 'bridge-golden-gate',
      name: 'Golden Gate Bridge (International Orange Art Deco Suspension Span)',
      lat: 37.8199,
      lon: -122.4783,
      builtYear: 1937,
      lengthWorld: 6.8,
      widthWorld: 0.58,
      rotationY: 0.08,
      style: 'cable-stayed'
    },
    {
      id: 'bridge-bay-bridge-west',
      name: 'San Francisco–Oakland Bay Bridge (Western Twin Suspension Span)',
      lat: 37.7925,
      lon: -122.3815,
      builtYear: 1936,
      lengthWorld: 6.4,
      widthWorld: 0.56,
      rotationY: -0.68,
      style: 'cable-stayed'
    },
    {
      id: 'bridge-third-street',
      name: "Lefty O'Doul (Third Street) Bascule Bridge (Mission Creek)",
      lat: 37.7766,
      lon: -122.3895,
      builtYear: 1933,
      lengthWorld: 2.6,
      widthWorld: 0.36,
      rotationY: 0.02,
      style: 'bascule'
    }
  ],
  parks: [
    { name: 'Golden Gate Park & Panhandle', lat: 37.7694, lon: -122.4662, rx: 9.5, rz: 4.5, rotation: 0.06, hasBasin: true },
    { name: 'Presidio of San Francisco & Crissy Field', lat: 37.7989, lon: -122.4662, rx: 7.5, rz: 6.2, rotation: 0.1, hasBasin: true },
    { name: 'Alamo Square Park (Painted Ladies Overlook)', lat: 37.7763, lon: -122.4346, rx: 2.2, rz: 2.2, rotation: 0.0 },
    { name: 'Mission Dolores Park', lat: 37.7596, lon: -122.4269, rx: 2.6, rz: 2.4, rotation: 0.0 },
    { name: 'Yerba Buena Gardens & Moscone Esplanade', lat: 37.7848, lon: -122.4026, rx: 2.4, rz: 2.2, rotation: -0.78, hasBasin: true }
  ],
  places: [
    { name: 'Union Square (Dewey Victory Monument)', lat: 37.7879, lon: -122.4075, radius: 2.2, hasColumnOrObelisk: true },
    { name: 'Civic Center Plaza & City Hall', lat: 37.7793, lon: -122.4162, radius: 2.6 },
    { name: 'Embarcadero Plaza & Ferry Plaza', lat: 37.7952, lon: -122.3942, radius: 2.4 },
    { name: 'Powell & Market Cable Car Turntable', lat: 37.7845, lon: -122.4078, radius: 1.9 }
  ],
  monuments: [
    {
      id: 'monument-golden-gate-bridge',
      nodeName: 'Monument_golden_gate_bridge',
      name: 'Golden Gate Bridge',
      lat: 37.8199,
      lon: -122.4783,
      builtYear: 1937,
      constructionStartYear: 1933,
      radius: 5.8,
      heightMeters: 227,
      era: 'empire1900',
      eraLabel: 'Art Deco Span • 1937',
      connectedLines: ['CC-PH', 'F'],
      style: '1,280m Art Deco Stepped-Tower Suspension Bridge in International Orange (Joseph Strauss, Charles Ellis & Irving Morrow, 1937)',
      arrondissement: 'Golden Gate Strait (Presidio ↔ Marin)',
      rotationY: 0.08,
      scale: 0.88,
      archetype: 'gothic_suspension_bridge',
      primaryColor: '#f04a24',
      secondaryColor: '#d9ccb8',
      accentColor: '#ffbe4f',
      description: 'Opened on May 27, 1937 across the mile-wide tidal strait where San Francisco Bay meets the Pacific Ocean; architect Irving Morrow championed its signature International Orange finish and Art Deco stepped tower setbacks.'
    },
    {
      id: 'monument-transamerica-pyramid',
      nodeName: 'Monument_transamerica_pyramid',
      name: 'Transamerica Pyramid',
      lat: 37.7952,
      lon: -122.4028,
      builtYear: 1972,
      constructionStartYear: 1969,
      radius: 4.0,
      heightMeters: 260,
      era: 'modern',
      eraLabel: 'Futurist Pyramid • 1972',
      connectedLines: ['BART-Y', 'BART-B', 'CC-CA', 'T'],
      style: '260m White Quartz Precast Concrete Four-Sided Pyramid, Elevator Wings & Glass Beacon Crown (William Pereira, 1972)',
      arrondissement: 'Financial District / Montgomery Block',
      rotationY: 0.16,
      scale: 0.82,
      archetype: 'shard_glass_pyramid',
      primaryColor: '#f2efe9',
      secondaryColor: '#9eb4c4',
      accentColor: '#ffd166',
      description: 'Designed by William Pereira on the historic site of the 1853 Montgomery Block so its tapered pyramidal silhouette would let sunlight reach Columbus Avenue and Redwood Park below.'
    },
    {
      id: 'monument-coit-tower',
      nodeName: 'Monument_coit_tower',
      name: 'Coit Tower (Telegraph Hill)',
      lat: 37.8024,
      lon: -122.4058,
      builtYear: 1933,
      constructionStartYear: 1932,
      radius: 3.4,
      heightMeters: 64,
      era: 'empire1900',
      eraLabel: 'Art Deco Column • 1933',
      connectedLines: ['F', 'T'],
      style: '64m Fluted White Concrete Art Deco Belvedere Column & WPA Fresco Rotunda (Arthur Brown Jr., 1933)',
      arrondissement: 'Telegraph Hill / North Beach',
      rotationY: 0.0,
      scale: 0.78,
      archetype: 'observation_needle',
      primaryColor: '#f5f2eb',
      secondaryColor: '#c8bfb0',
      accentColor: '#e09f3e',
      description: 'Funded by eccentric bequest from Lillie Hitchcock Coit—patroness of San Francisco’s volunteer firefighters—and designed by City Hall architect Arthur Brown Jr. in 1933 with 27 New Deal frescoes painted inside its base.'
    },
    {
      id: 'monument-ferry-building',
      nodeName: 'Monument_ferry_building',
      name: 'San Francisco Ferry Building & Clock Tower',
      lat: 37.7955,
      lon: -122.3937,
      builtYear: 1898,
      constructionStartYear: 1892,
      radius: 4.5,
      heightMeters: 75,
      era: 'gares',
      eraLabel: 'Beaux-Arts Embarcadero • 1898',
      connectedLines: ['BART-Y', 'BART-B', 'J', 'K', 'N', 'F', 'CC-CA'],
      style: '201m Beaux-Arts Colusa Sandstone Nave & 75m Seville Giralda Clock Tower (A. Page Brown, 1898)',
      arrondissement: 'The Embarcadero (Foot of Market Street)',
      rotationY: -0.62,
      scale: 0.80,
      archetype: 'clock_tower_terminus',
      primaryColor: '#dcd4c6',
      secondaryColor: '#6e7b85',
      accentColor: '#f04a24',
      description: 'Standing at the foot of Market Street since 1898, A. Page Brown’s 75-meter clock tower survived both the 1906 earthquake and the 1989 Loma Prieta earthquake—after which the elevated Embarcadero Freeway was torn down to restore its grand plaza.'
    },
    {
      id: 'monument-palace-of-fine-arts',
      nodeName: 'Monument_palace_of_fine_arts',
      name: 'Palace of Fine Arts Rotunda',
      lat: 37.8029,
      lon: -122.4484,
      builtYear: 1915,
      radius: 4.2,
      heightMeters: 49,
      era: 'empire1900',
      eraLabel: 'Panama-Pacific • 1915',
      connectedLines: ['F', 'CC-PH'],
      style: 'Beaux-Arts Classical Rotunda Dome, Corinthian Peristyle & Lagoon (Bernard Maybeck, 1915 / Rebuilt in Concrete 1965)',
      arrondissement: 'Marina District / Presidio',
      rotationY: 0.15,
      scale: 0.78,
      archetype: 'baroque_dome_cathedral',
      primaryColor: '#e6c8a8',
      secondaryColor: '#c97b52',
      accentColor: '#489fb5',
      description: 'Created by architect Bernard Maybeck for the 1915 Panama-Pacific International Exposition celebrating San Francisco’s rebirth after the 1906 earthquake and fire, evoking a romantic Roman ruin reflected in a tranquil swan lagoon.'
    },
    {
      id: 'monument-salesforce-tower',
      nodeName: 'Monument_salesforce_tower',
      name: 'Salesforce Tower & Transit Center',
      lat: 37.7897,
      lon: -122.3972,
      builtYear: 2018,
      constructionStartYear: 2013,
      radius: 4.2,
      heightMeters: 326,
      era: 'modern',
      eraLabel: 'Transbay Obelisk • 2018',
      connectedLines: ['BART-Y', 'BART-B', 'J', 'K', 'N', 'T'],
      style: '326.5m Tapered Glass & Brushed-Aluminum Obelisk Skyscraper & Rooftop Gondola Park (César Pelli, 2018)',
      arrondissement: 'SoMa / Transbay',
      rotationY: -0.78,
      scale: 0.84,
      archetype: 'one_wtc_and_oculus',
      primaryColor: '#a8cbe0',
      secondaryColor: '#e8eef2',
      accentColor: '#38b6ff',
      description: 'San Francisco’s tallest skyscraper (1,070 ft), anchored by 42 foundation piles driven 310 feet into Franciscan bedrock beside the four-block rooftop botanical park of the Salesforce Transit Center.'
    },
    {
      id: 'monument-painted-ladies',
      nodeName: 'Monument_painted_ladies',
      name: 'The Painted Ladies of Alamo Square ("Postcard Row")',
      lat: 37.7762,
      lon: -122.4328,
      builtYear: 1892,
      radius: 3.6,
      heightMeters: 22,
      era: 'empire1900',
      eraLabel: 'Queen Anne Victorian • 1892',
      connectedLines: ['J', 'N'],
      style: 'Six Queen Anne Victorian Rowhouses with Polychrome Gingerbread Gables & Bay Windows (Matthew Kavanaugh, 1892–1896)',
      arrondissement: 'Alamo Square / Western Addition',
      rotationY: -1.57,
      scale: 0.78,
      archetype: 'grand_palace_facade',
      primaryColor: '#f4d35e',
      secondaryColor: '#5fa8d3',
      accentColor: '#e07a5f',
      description: 'Built between 1892 and 1896 by developer Matthew Kavanaugh at 710–720 Steiner Street, these six Queen Anne Victorians survived the 1906 fire because the dynamite firebreak stopped at Van Ness Avenue.'
    },
    {
      id: 'monument-alcatraz-island',
      nodeName: 'Monument_alcatraz_island',
      name: 'Alcatraz Island Lighthouse & Cellhouse ("The Rock")',
      lat: 37.8267,
      lon: -122.4233,
      builtYear: 1909,
      constructionStartYear: 1854,
      radius: 4.6,
      heightMeters: 42,
      era: 'empire1900',
      eraLabel: 'Bay Island Fortress • 1854 / 1934',
      connectedLines: ['F', 'CC-PH'],
      style: 'Sandstone Bay Island, 1909 Octagonal Concrete Lighthouse, Water Tower & 1912 Federal Cellhouse',
      arrondissement: 'San Francisco Bay',
      rotationY: -0.45,
      scale: 0.80,
      archetype: 'norman_four_turret_keep',
      primaryColor: '#d9d0be',
      secondaryColor: '#8c6d53',
      accentColor: '#f04a24',
      description: 'Home to the West Coast’s first lighthouse (1854, rebuilt 1909 after the 1906 earthquake), a Civil War fortress, the 1934–1963 Federal Penitentiary, and the historic 1969–1971 Occupation by the Indians of All Tribes.'
    }
  ],
  milestones: [
    { year: 1873, shortLabel: '1873', headline: 'Aug 2, 1873: Andrew Smith Hallidie tests the world’s first grip cable car up steep Clay Street Hill' },
    { year: 1898, shortLabel: '1898', headline: 'July 13, 1898: Opening of A. Page Brown’s Beaux-Arts San Francisco Ferry Building & Clock Tower' },
    { year: 1906, shortLabel: '1906', headline: 'April 18, 1906: Great San Francisco Earthquake & Fire; Ferry Building & Alamo Square survive' },
    { year: 1912, shortLabel: '1912', headline: 'Dec 28, 1912: San Francisco Municipal Railway (Muni) launches as America’s first publicly owned transit system' },
    { year: 1915, shortLabel: '1915', headline: 'Feb 20, 1915: Panama-Pacific International Exposition & Bernard Maybeck’s Palace of Fine Arts open' },
    { year: 1918, shortLabel: '1918', headline: 'Feb 3, 1918: Opening of the 3.6 km Twin Peaks Tunnel for Muni K, L, and M streetcars' },
    { year: 1937, shortLabel: '1937', headline: '1936–1937: Bay Bridge (Nov 1936) & Golden Gate Bridge (May 27, 1937) span San Francisco Bay' },
    { year: 1973, shortLabel: '1973', headline: 'Nov 1973 – Sept 1974: BART Market Street Subway & underwater Transbay Tube open beneath the Bay' },
    { year: 1989, shortLabel: '1989', headline: 'Oct 17, 1989: Loma Prieta Earthquake leads to removal of the Embarcadero Freeway & F-Line revival' },
    { year: 2018, shortLabel: '2018', headline: 'Aug 2018: Completion of César Pelli’s 326m Salesforce Tower & Rooftop Transit Center Park' },
    { year: 2026, shortLabel: '2026', headline: '2022–2026: Muni T-Third Central Subway to Chinatown & Caltrain 100% Electric Peninsula Corridor' }
  ],
  eras: [
    {
      startYear: 1873,
      endYear: 1906,
      eraTag: 'CABLE CARS, VICTORIANS & 1906 QUAKE • 1873–1906',
      title: 'Conquering the Hills: Hallidie’s Cable Cars & the Ferry Building',
      description: 'On the ancestral peninsula of the Ramaytush Ohlone people (Yelamu), Gold Rush San Francisco conquered its 21% grades in August 1873 when Andrew Smith Hallidie invented the wire-rope cable car, crowned its waterfront with the 1898 Ferry Building, and rose from the ashes of the April 18, 1906 earthquake and fire.',
      urbanChanges: [
        'Inauguration of Clay Street (1873), California Street (1878) & Powell Cable Cars (1888)',
        'Construction of the Painted Ladies (1892–1896) & Ferry Building Clock Tower (1898)',
        '1906 Earthquake & Fire sparks citywide Beaux-Arts reconstruction'
      ]
    },
    {
      startYear: 1907,
      endYear: 1938,
      eraTag: 'MUNI TUNNELS & GREAT BAY BRIDGES • 1907–1938',
      title: 'Twin Peaks Tunnel, Coit Tower & the Golden Gate Bridge',
      description: 'San Francisco founded America’s first municipal railway (Muni) in 1912, bored the 3.6 km Twin Peaks Tunnel in 1918 and Sunset Tunnel in 1928, and during the Great Depression erected Coit Tower (1933), the Bay Bridge (1936), and the Golden Gate Bridge (1937).',
      urbanChanges: [
        'Palace of Fine Arts built for the 1915 Panama-Pacific Exposition',
        'Twin Peaks Tunnel (1918) & Sunset Tunnel (1928) open the western neighborhoods',
        'Coit Tower (1933), Bay Bridge (1936) & Golden Gate Bridge (1937) transform the skyline'
      ]
    },
    {
      startYear: 1939,
      endYear: 1995,
      eraTag: 'TRANSAMERICA, BART & FREEWAY REVOLT • 1939–1995',
      title: 'Double-Deck Market Street Subway & the Transbay Tube',
      description: 'In 1972–1974, as the Transamerica Pyramid pierced the Financial District skyline, BART and Muni built a double-deck subway beneath Market Street and sank the 5.8 km seismically flexible Transbay Tube across the floor of San Francisco Bay.',
      urbanChanges: [
        'Completion of William Pereira’s 260m Transamerica Pyramid (1972)',
        'BART Transbay Tube & dual-level Market Street Subway (BART + Muni Metro, 1973–1980)',
        'Post-1989 Loma Prieta teardown of the Embarcadero Freeway & F-Market heritage streetcar (1995)'
      ]
    },
    {
      startYear: 1996,
      endYear: 2026,
      eraTag: 'TRANSBAY, CENTRAL SUBWAY & ELECTRIC RAIL • 1996–2026',
      title: 'Salesforce Tower, Chinatown Central Subway & Electric Caltrain',
      description: 'In the 21st century, San Francisco extended Muni Metro down Third Street to Mission Bay (2007), bored the deep T-Third Central Subway beneath Union Square to Chinatown Rose Pak Station (2022), and electrified the historic 1863 Caltrain corridor (2024).',
      urbanChanges: [
        'Salesforce Tower & 5.4-acre Rooftop Transit Center Park open in SoMa (2018)',
        'Muni T-Third Central Subway deep tunnel opens to Union Square & Chinatown (Nov 2022)',
        'Caltrain launches 100% electric Stadler KISS double-deck trains from 4th & King (Sept 2024)'
      ]
    }
  ],
  metroLines: [
    {
      id: 'BART-Y',
      name: 'BART Yellow / Red Trunk — Transbay Tube ↔ Embarcadero ↔ Powell ↔ Mission ↔ Balboa Park',
      shortLabel: 'BART',
      color: '#ffe800',
      textColor: '#10141c',
      openedYear: 1973,
      depthOffset: -3.5,
      historicCompany: 'Bay Area Rapid Transit (Fleet of the Future)',
      summary: 'San Francisco’s high-speed heavy-rail rapid transit spine (opened November 5, 1973; Transbay Tube opened September 16, 1974), running on the deep lower level of the Market Street Subway before curving south through the Mission District to Balboa Park and SFO.',
      stations: [
        { id: 'embarcadero', name: 'Embarcadero', lat: 37.7929, lon: -122.3968, openedYear: 1976, arrondissement: 'Financial District / Embarcadero', architecture: 'Infill Subterranean Portal of the Transbay Tube (BART + Muni Metro)', landmark: 'Ferry Building & Salesforce Tower', description: 'Added in May 1976 inside the eastern portal of the Market Street Subway, right where trains dive 41 meters beneath San Francisco Bay.' },
        { id: 'montgomery', name: 'Montgomery St', lat: 37.7894, lon: -122.4013, openedYear: 1973, arrondissement: 'Financial District / SoMa', architecture: 'Dual-Level Financial District Subway Cathedral', landmark: 'Transamerica Pyramid & Salesforce Tower', description: 'Serves the "Wall Street of the West" and connects to the Salesforce Transit Center.' },
        { id: 'powell', name: 'Powell St', lat: 37.7844, lon: -122.4079, openedYear: 1973, arrondissement: 'Union Square / Market', architecture: 'Multi-Modal Hub (BART + Muni Metro + T-Third Central Subway + Cable Car Turntable)', landmark: 'Union Square', description: 'San Francisco’s busiest subterranean transit crossroads beneath Hallidie Plaza.' },
        { id: 'civic-center', name: 'Civic Center / UN Plaza', lat: 37.7797, lon: -122.4141, openedYear: 1973, arrondissement: 'Civic Center', architecture: 'Classical Granite Plaza & Bi-Level Subway Vault', description: 'Serves the golden-domed 1915 Beaux-Arts City Hall, War Memorial Opera House, and Asian Art Museum.' },
        { id: '16th-st-mission', name: '16th St Mission', lat: 37.7650, lon: -122.4197, openedYear: 1973, arrondissement: 'Mission District', architecture: 'Sunken Brick Plaza & Mission Dolores Gateway', description: 'Two blocks from the 1776 Mission San Francisco de Asís (Mission Dolores), the oldest intact building in the city.' },
        { id: '24th-st-mission', name: '24th St Mission', lat: 37.7525, lon: -122.4184, openedYear: 1973, arrondissement: 'Mission District (Calle 24)', architecture: 'Latino Cultural District & Mural Plaza Station', description: 'Heart of the Calle 24 Latino Cultural District and Balmy Alley murals.' },
        { id: 'glen-park', name: 'Glen Park', lat: 37.7331, lon: -122.4338, openedYear: 1973, arrondissement: 'Glen Park', architecture: 'Ernest Born Brutalist Concrete Cathedral & Skylit Canyon', description: 'Celebrated architectural gem by Ernest Born, featuring raw board-formed concrete walls and natural canyon light.' },
        { id: 'balboa-park', name: 'Balboa Park', lat: 37.7219, lon: -122.4474, openedYear: 1973, arrondissement: 'Excelsior / Ingleside', architecture: 'Open-Cut Concrete Trench & Three-Line Muni Metro Hub (J / K / M)', description: 'Southern San Francisco transfer hub between BART and Muni Metro.' }
      ]
    },
    {
      id: 'J',
      name: 'Muni Metro J Church — Embarcadero ↔ Market St Subway ↔ Dolores Park ↔ Balboa Park',
      shortLabel: 'J',
      color: '#e09f3e',
      textColor: '#10141c',
      openedYear: 1917,
      depthOffset: -2.2,
      historicCompany: 'San Francisco Municipal Railway (Muni Metro Siemens S200)',
      summary: 'Opened on August 11, 1917, the J Church runs on the upper level of the Market Street Subway before emerging at Church & Duboce to climb along the edge of Dolores Park with sweeping views of the downtown skyline.',
      stations: [
        { id: 'embarcadero', name: 'Embarcadero', lat: 37.7929, lon: -122.3968, openedYear: 1980, arrondissement: 'Embarcadero', architecture: 'Upper-Level Muni Metro Loop', landmark: 'Ferry Building', description: 'Eastern turnaround loop of the Muni Metro Market Street Subway.' },
        { id: 'montgomery', name: 'Montgomery St', lat: 37.7894, lon: -122.4013, openedYear: 1980, arrondissement: 'Financial District', architecture: 'Upper-Level Muni Metro Platform', description: 'Above the BART Transbay platforms.' },
        { id: 'powell', name: 'Powell St', lat: 37.7844, lon: -122.4079, openedYear: 1980, arrondissement: 'Union Square', architecture: 'Upper-Level Muni Metro Platform', description: 'Direct transfer to Central Subway (Union Square/Market) and Powell Cable Cars.' },
        { id: 'civic-center', name: 'Civic Center', lat: 37.7797, lon: -122.4141, openedYear: 1980, arrondissement: 'Civic Center', architecture: 'Upper-Level Muni Metro Platform', description: 'City Hall and Symphony Hall access.' },
        { id: 'van-ness', name: 'Van Ness', lat: 37.7752, lon: -122.4193, openedYear: 1980, arrondissement: 'Mid-Market / Civic Center', architecture: 'Van Ness BRT & Symphony Hall Subway Station', description: 'Junction where the J and N lines diverge toward Duboce Portal.' },
        { id: 'church-dolores', name: 'Right-of-Way at 18th St & Dolores Park', lat: 37.7614, lon: -122.4285, openedYear: 1917, arrondissement: 'Mission / Castro', architecture: 'Famous Hillside Parkland Alignment Overlooking the SF Skyline', description: 'Iconic 1917 private right-of-way climbing the western edge of Dolores Park.' },
        { id: '24th-church', name: 'Church & 24th St (Noe Valley)', lat: 37.7518, lon: -122.4272, openedYear: 1917, arrondissement: 'Noe Valley', architecture: 'Victorian Neighborhood Streetcar Stop', description: 'Heart of Noe Valley.' },
        { id: 'glen-park', name: 'Glen Park', lat: 37.7331, lon: -122.4338, openedYear: 1917, arrondissement: 'Glen Park', architecture: 'BART & J-Church Canyon Interchange', description: 'Transfers to BART.' }
      ]
    },
    {
      id: 'K',
      name: 'Muni Metro K / L / M Twin Peaks Spine — Embarcadero ↔ Castro ↔ Forest Hill ↔ West Portal',
      shortLabel: 'K/L/M',
      color: '#569099',
      textColor: '#ffffff',
      openedYear: 1918,
      depthOffset: -2.5,
      historicCompany: 'San Francisco Municipal Railway (1918 Twin Peaks Tunnel)',
      summary: 'Opened on February 3, 1918 through the 3.6 km Twin Peaks Tunnel (the longest streetcar tunnel in the world when built), linking the Market Street Subway through Castro and the historic subterranean Forest Hill Station to West Portal.',
      stations: [
        { id: 'embarcadero', name: 'Embarcadero', lat: 37.7929, lon: -122.3968, openedYear: 1980, arrondissement: 'Embarcadero', architecture: 'Market Street Subway Terminus', description: 'Ferry Building gateway.' },
        { id: 'powell', name: 'Powell St', lat: 37.7844, lon: -122.4079, openedYear: 1980, arrondissement: 'Union Square', architecture: 'Downtown Hub', description: 'Union Square & Cable Car hub.' },
        { id: 'van-ness', name: 'Van Ness', lat: 37.7752, lon: -122.4193, openedYear: 1980, arrondissement: 'Civic Center', architecture: 'Market Street Subway', description: 'Civic Center West.' },
        { id: 'church-subway', name: 'Church Station', lat: 37.7689, lon: -122.4291, openedYear: 1980, arrondissement: 'Duboce Triangle', architecture: 'Subway Transfer to Surface J-Church & F-Market', description: 'Beneath the historic San Francisco Mint.' },
        { id: 'castro', name: 'Castro Station', lat: 37.7625, lon: -122.4351, openedYear: 1980, arrondissement: 'The Castro', architecture: 'Eastern Portal of the 1918 Twin Peaks Tunnel & Harvey Milk Plaza', description: 'Where the 1980 Market Street Subway connects directly into the 1918 Twin Peaks Tunnel beneath the 1922 Castro Theatre.' },
        { id: 'eureka-valley-ghost', name: 'Eureka Valley (1918–1972 Ghost Station)', lat: 37.7608, lon: -122.4385, openedYear: 1918, isGhostStation: true, arrondissement: 'Eureka Valley / Castro', architecture: 'Abandoned 1918 Twin Peaks Tunnel Side Platforms', description: 'Opened in February 1918 just inside the eastern portal of the Twin Peaks Tunnel and closed in 1972 when nearby Castro Station was built; its concrete platforms remain visible from passing K/L/M trains.' },
        { id: 'forest-hill', name: 'Forest Hill (1918 Deep Subway Station)', lat: 37.7480, lon: -122.4591, openedYear: 1918, arrondissement: 'Forest Hill', architecture: '1918 Classical Headhouse & Deep Vaulted Concrete Cavern (Oldest Subway Station West of Chicago)', description: 'Opened in 1918 sixty feet beneath Laguna Honda with three historic elevators and a Classical Revival surface pavilion.' },
        { id: 'west-portal', name: 'West Portal', lat: 37.7408, lon: -122.4660, openedYear: 1918, arrondissement: 'West Portal', architecture: 'Western Portal of Twin Peaks Tunnel (K / L / M Split)', description: 'Western portal where K Ingleside, L Taraval, and M Ocean View branch out across southwestern San Francisco.' }
      ]
    },
    {
      id: 'N',
      name: 'Muni Metro N Judah — 4th & King (Caltrain) ↔ Embarcadero ↔ Sunset Tunnel ↔ Haight / Cole Valley',
      shortLabel: 'N',
      color: '#00539b',
      textColor: '#ffffff',
      openedYear: 1928,
      depthOffset: -2.35,
      historicCompany: 'San Francisco Municipal Railway (1928 Sunset Tunnel)',
      summary: 'San Francisco’s busiest light-rail line (opened October 21, 1928), running along the waterfront from Caltrain & Oracle Park into the Market Street Subway, emerging at Duboce Park, and boring through the 1928 Sunset Tunnel beneath Buena Vista Hill toward Cole Valley and Golden Gate Park.',
      stations: [
        { id: 'caltrain-4th-king', name: '4th & King (Caltrain & Oracle Park)', lat: 37.7764, lon: -122.3945, openedYear: 1998, arrondissement: 'Mission Bay / SoMa', architecture: 'Caltrain Terminal & Ballpark Light-Rail Hub (N / T)', description: 'Direct transfer to electrified Caltrain commuter trains and the San Francisco Giants ballpark.' },
        { id: 'brannan-embarcadero', name: 'Brannan (The Embarcadero)', lat: 37.7838, lon: -122.3883, openedYear: 1998, arrondissement: 'South Beach', architecture: 'Palm-Lined Waterfront Median Beneath the Bay Bridge', landmark: 'San Francisco–Oakland Bay Bridge', description: 'Passes directly beneath the monumental western suspension span of the Bay Bridge.' },
        { id: 'embarcadero', name: 'Embarcadero', lat: 37.7929, lon: -122.3968, openedYear: 1980, arrondissement: 'Embarcadero', architecture: 'Folsom Portal to Market Street Subway', landmark: 'Ferry Building', description: 'Trains climb from the waterfront into the Market Street Subway.' },
        { id: 'montgomery', name: 'Montgomery St', lat: 37.7894, lon: -122.4013, openedYear: 1980, arrondissement: 'Financial District', architecture: 'Market Street Subway', description: 'Financial District hub.' },
        { id: 'powell', name: 'Powell St', lat: 37.7844, lon: -122.4079, openedYear: 1980, arrondissement: 'Union Square', architecture: 'Union Square & Cable Car Hub', description: 'Connects with T-Third and BART.' },
        { id: 'van-ness', name: 'Van Ness', lat: 37.7752, lon: -122.4193, openedYear: 1980, arrondissement: 'Civic Center', architecture: 'Market Street Subway', description: 'Civic Center West.' },
        { id: 'duboce-park', name: 'Duboce & Church (Duboce Portal)', lat: 37.7695, lon: -122.4335, openedYear: 1928, arrondissement: 'Duboce Triangle / Lower Haight', architecture: 'Eastern Portal of the 1,290m 1928 Sunset Tunnel', landmark: 'Painted Ladies (Alamo Square)', description: 'Southern gateway to the Lower Haight and Alamo Square’s Painted Ladies.' },
        { id: 'carl-cole', name: 'Carl & Cole (Cole Valley / Haight-Ashbury)', lat: 37.7658, lon: -122.4501, openedYear: 1928, arrondissement: 'Cole Valley / Haight-Ashbury', architecture: 'Western Portal of the Sunset Tunnel', description: 'Emerges into Cole Valley two blocks from Haight-Ashbury and Golden Gate Park.' },
        { id: 'ucsf-parnassus', name: 'UCSF Parnassus & Irving (Inner Sunset)', lat: 37.7640, lon: -122.4638, openedYear: 1928, arrondissement: 'Inner Sunset', architecture: 'Golden Gate Park Museums & Botanical Garden Stop', description: 'Serves the de Young Museum, California Academy of Sciences, and Japanese Tea Garden in Golden Gate Park.' }
      ]
    },
    {
      id: 'T',
      name: 'Muni Metro T Third Street (Central Subway) — Chinatown Rose Pak ↔ Union Square ↔ Moscone ↔ Mission Bay',
      shortLabel: 'T',
      color: '#d31245',
      textColor: '#ffffff',
      openedYear: 2007,
      depthOffset: -3.9,
      historicCompany: 'SFMTA (2022 Central Subway Deep Bore)',
      summary: 'San Francisco’s newest subway tunnel (Central Subway opened November 19, 2022), diving beneath the existing BART and Muni tunnels on Market Street to link Chinatown (Rose Pak Station), Union Square, Yerba Buena/Moscone, 4th & King Caltrain, and Chase Center.',
      stations: [
        { id: 'chinatown-rose-pak', name: 'Chinatown – Rose Pak Station (華埠-白蘭站)', lat: 37.7956, lon: -122.4069, openedYear: 2022, arrondissement: 'Chinatown', architecture: '30m-Deep Mined Cavern with Rooftop Public Plaza at Stockton & Washington', landmark: 'Transamerica Pyramid', description: 'Opened November 19, 2022 in the heart of North America’s oldest Chinatown (established 1848).' },
        { id: 'union-square-market', name: 'Union Square / Market St (Powell)', lat: 37.7862, lon: -122.4071, openedYear: 2022, arrondissement: 'Union Square', architecture: 'Glass Pavilion on Geary & Deep Sub-Market Cavern', description: 'Bored directly beneath the existing 1973 Powell Street BART/Muni station.' },
        { id: 'yerba-buena-moscone', name: 'Yerba Buena / Moscone', lat: 37.7819, lon: -122.4014, openedYear: 2022, arrondissement: 'SoMa', architecture: 'SFMOMA & Moscone Convention Center Subway Box', description: 'Serves the San Francisco Museum of Modern Art and Yerba Buena Gardens.' },
        { id: '4th-brannan', name: '4th & Brannan (Central Subway Portal)', lat: 37.7782, lon: -122.3970, openedYear: 2022, arrondissement: 'SoMa', architecture: 'Southern Tunnel Portal under I-80', description: 'Where the Central Subway emerges onto 4th Street.' },
        { id: 'caltrain-4th-king', name: '4th & King (Caltrain)', lat: 37.7764, lon: -122.3945, openedYear: 2007, arrondissement: 'Mission Bay', architecture: 'Caltrain & Oracle Park Interchange', description: 'Crosses Mission Creek over the historic 1933 Third Street drawbridge.' },
        { id: 'ucsf-chase-center', name: 'UCSF / Chase Center', lat: 37.7685, lon: -122.3892, openedYear: 2007, arrondissement: 'Mission Bay', architecture: 'Expanded Warriors Arena & UCSF Medical Campus Platform', description: 'Serves the Golden State Warriors’ waterfront arena and Mission Bay biotech campus.' }
      ]
    },
    {
      id: 'F',
      name: 'F Market & Wharves Historic Streetcar — Castro ↔ Market St ↔ Ferry Building ↔ Fisherman’s Wharf',
      shortLabel: 'F',
      color: '#f4a261',
      textColor: '#10141c',
      openedYear: 1995,
      depthOffset: -0.9,
      historicCompany: 'Market Street Railway / Muni (1940s Streamliner PCC & Milan Peter Witt Cars)',
      summary: 'A living rolling museum of vintage 1920s–1950s streetcars from around the world (revived in September 1995 and extended along the Embarcadero in 2000 after the freeway teardown), linking the Castro down the full length of Market Street to the Ferry Building, Pier 39, and Fisherman’s Wharf.',
      stations: [
        { id: 'fishermans-wharf', name: "Fisherman's Wharf (Jones & Beach)", lat: 37.8072, lon: -122.4142, openedYear: 2000, arrondissement: "Fisherman's Wharf", architecture: 'Northern Waterfront Streetcar Loop', landmark: 'Alcatraz Island & Palace of Fine Arts', description: 'Overlooks the historic Dungeness crab boats, Hyde Street Pier, and Alcatraz Island.' },
        { id: 'pier-39', name: 'Pier 39 & Alcatraz Landing (Pier 33)', lat: 37.8078, lon: -122.4068, openedYear: 2000, arrondissement: 'Northern Waterfront', architecture: 'Bayfront Promenade Median', landmark: 'Alcatraz Island & Coit Tower', description: 'Embarkation point for Alcatraz ferries at the foot of Telegraph Hill.' },
        { id: 'ferry-building-f', name: 'Ferry Building (The Embarcadero)', lat: 37.7955, lon: -122.3937, openedYear: 1995, arrondissement: 'Embarcadero', architecture: 'Palm-Lined Beaux-Arts Waterfront Esplanade', landmark: 'San Francisco Ferry Building', description: 'Where the F Line turns from the Embarcadero onto Market Street.' },
        { id: 'powell', name: 'Market & Powell', lat: 37.7844, lon: -122.4079, openedYear: 1995, arrondissement: 'Union Square', architecture: 'Path of Gold Cast-Iron Streetlights on Market Street', description: 'Runs down the surface of Market Street beneath the 1916 "Path of Gold" streetlights.' },
        { id: 'civic-center', name: 'Market & 8th (Civic Center)', lat: 37.7785, lon: -122.4148, openedYear: 1995, arrondissement: 'Civic Center', architecture: 'Surface Heritage Island Stop', description: 'Surface stop above the BART/Muni subway.' },
        { id: 'castro', name: '17th & Castro (Jane Warner Plaza)', lat: 37.7625, lon: -122.4351, openedYear: 1995, arrondissement: 'The Castro', architecture: 'Castro Theatre Turnaround Loop', description: 'Western terminus of the F Market heritage line.' }
      ]
    },
    {
      id: 'CC-PH',
      name: 'Powell–Hyde & Powell–Mason Cable Cars — Market St ↔ Union Square ↔ Nob Hill ↔ Lombard St ↔ Aquatic Park',
      shortLabel: 'PH',
      color: '#c83e2b',
      textColor: '#ffffff',
      openedYear: 1888,
      depthOffset: -0.6,
      historicCompany: 'Ferries & Cliff House Railway (1888) / SFMTA National Historic Landmark',
      summary: 'Opened in 1888 and designated the only moving National Historic Landmark in the United States: single-ended wooden cars grip an endless 15.3 km/h subterranean steel cable pulled by the Washington & Mason Powerhouse to climb 21% grades over Nob Hill and Russian Hill down to the Golden Gate view at Hyde & Beach.',
      stations: [
        { id: 'powell-turntable', name: 'Powell & Market Cable Car Turntable', lat: 37.7845, lon: -122.4078, openedYear: 1888, arrondissement: 'Market Street', architecture: 'Iconic Wooden Manual Turntable at Hallidie Plaza', description: 'Gripman and conductor spin the 7-ton wooden car by hand on a wooden turntable at the foot of Powell Street.' },
        { id: 'union-square-cc', name: 'Powell & Geary (Union Square)', lat: 37.7876, lon: -122.4084, openedYear: 1888, arrondissement: 'Union Square', architecture: 'Steep Climb Past the 1904 Westin St. Francis', description: 'Climbs out of the Union Square basin toward Nob Hill.' },
        { id: 'california-powell', name: 'Powell & California (Nob Hill Crest)', lat: 37.7919, lon: -122.4092, openedYear: 1888, arrondissement: 'Nob Hill', architecture: 'Right-Angle Cable Crossing (Powell & California Lines) at Fairmont Hotel', description: 'Historic crest of Nob Hill where the gripmen must drop the cable and coast across the intersecting California Street cable.' },
        { id: 'cable-car-museum', name: 'Washington & Mason (Cable Car Powerhouse & Barn)', lat: 37.7946, lon: -122.4116, openedYear: 1887, arrondissement: 'Nob Hill / Chinatown', architecture: '1887 Red-Brick Winding Sheave Powerhouse & Museum', description: 'Houses the giant 510-horsepower electric motors and 14-foot winding sheaves that pull every cable car in San Francisco.' },
        { id: 'lombard-hyde', name: 'Hyde & Lombard ("Crookedest Street in the World")', lat: 37.8021, lon: -122.4187, openedYear: 1891, arrondissement: 'Russian Hill', architecture: 'Top of the Eight Hairpin Switchbacks of Lombard Street & Coit Tower View', landmark: 'Coit Tower & Alcatraz Island', description: 'Crests Russian Hill at the top of Lombard Street’s eight brick switchbacks before plunging down a 21% grade toward Alcatraz.' },
        { id: 'hyde-beach', name: 'Hyde & Beach Turntable (Aquatic Park / Ghirardelli Sq)', lat: 37.8065, lon: -122.4206, openedYear: 1891, arrondissement: 'Aquatic Park / Marina', architecture: '1939 Streamline Moderne Maritime Bathhouse & Golden Gate Vista', landmark: 'Golden Gate Bridge & Palace of Fine Arts', description: 'Northern turntable beside Ghirardelli Square with sweeping views across the Bay to Alcatraz and the Golden Gate Bridge.' }
      ]
    },
    {
      id: 'CC-CA',
      name: 'California Street Cable Car — Embarcadero ↔ Financial District ↔ Chinatown ↔ Nob Hill ↔ Van Ness',
      shortLabel: 'CA',
      color: '#b8860b',
      textColor: '#ffffff',
      openedYear: 1878,
      depthOffset: -0.75,
      historicCompany: 'California Street Cable Railroad (Leland Stanford, 1878)',
      summary: 'Built in April 1878 by Central Pacific Railroad president Leland Stanford using double-ended maroon-and-gold "California Cars", climbing straight up the dramatic eastern face of Nob Hill from the Embarcadero through Chinatown to Grace Cathedral and Van Ness Avenue.',
      stations: [
        { id: 'california-drumm', name: 'California & Drumm (Embarcadero / Market)', lat: 37.7936, lon: -122.3965, openedYear: 1878, arrondissement: 'Embarcadero / Financial District', architecture: 'Eastern Switchback Terminus at Embarcadero Center', landmark: 'San Francisco Ferry Building', description: 'Steps from the Ferry Building and Embarcadero BART.' },
        { id: 'california-kearny', name: 'California & Kearny (Financial District / Transamerica)', lat: 37.7926, lon: -122.4045, openedYear: 1878, arrondissement: 'Financial District', architecture: 'Foot of the Steep Nob Hill Grade', landmark: 'Transamerica Pyramid', description: 'Framed by the Bank of America tower and Transamerica Pyramid where the 18% climb up Nob Hill begins.' },
        { id: 'california-grant', name: 'California & Grant (Old St. Mary’s & Chinatown Dragon Gate)', lat: 37.7923, lon: -122.4061, openedYear: 1878, arrondissement: 'Chinatown', architecture: '1854 Brick Cathedral & Grant Avenue Pagoda Roofs', description: 'Crosses historic Grant Avenue in Chinatown beside the 1854 Old St. Mary’s Cathedral.' },
        { id: 'california-powell', name: 'California & Powell (Nob Hill / Mark Hopkins)', lat: 37.7919, lon: -122.4092, openedYear: 1878, arrondissement: 'Nob Hill', architecture: 'Summit of Nob Hill & Cable Car Crossover', description: 'Interchange with the Powell–Hyde and Powell–Mason cable cars.' },
        { id: 'grace-cathedral', name: 'California & Taylor (Grace Cathedral & Huntington Park)', lat: 37.7915, lon: -122.4128, openedYear: 1878, arrondissement: 'Nob Hill', architecture: 'French Gothic Cathedral & Big Four Railroad Mansions', description: 'Faces the Gothic twin towers of Grace Cathedral, the Pacific-Union Club (Flood Mansion), and Huntington Park.' },
        { id: 'california-van-ness', name: 'California & Van Ness', lat: 37.7903, lon: -122.4220, openedYear: 1878, arrondissement: 'Polk Gulch / Pacific Heights', architecture: 'Western Switchback Terminus on Van Ness Avenue', description: 'Western terminus of the California Street line.' }
      ]
    }
  ],
  railTermini: [
    {
      id: 'gl-sf-caltrain',
      metroStationId: 'caltrain-4th-king',
      name: 'San Francisco 4th & King Station (Caltrain Peninsula Terminal)',
      shortName: '4TH & KING (CALTRAIN)',
      historicCompany: 'San Francisco & San Jose Rail Road (1863) / Southern Pacific / Caltrain',
      modernNetwork: 'Caltrain 25kV Electrified Peninsula Express (Stadler KISS Double-Deck)',
      openedYear: 1975,
      trainStartYear: 1900,
      trainEndYear: 2026,
      buildingEndYear: 2026,
      arrondissement: 'Mission Bay / SoMa',
      destinationLabel: 'TO MILLBRAE (SFO) • PALO ALTO (STANFORD) • SILICON VALLEY • SAN JOSE DIRIDON',
      colorHex: '#d31245',
      lat: 37.7764,
      lon: -122.3945,
      rotationY: -0.78,
      trackCount: 12,
      shedWidth: 2.6,
      shedLength: 3.2,
      shedHeight: 0.88,
      shedSpans: 3,
      hasClockTower: false,
      description: 'Northern terminus of California’s oldest passenger railway corridor (founded 1863 by the Southern Pacific to link San Francisco with San Jose); completely electrified in September 2024 with high-speed double-deck electric trains.',
      corridorLatLon: [
        [37.7764, -122.3945],
        [37.7715, -122.3995],
        [37.7650, -122.4005],
        [37.7565, -122.3965]
      ]
    },
    {
      id: 'gl-sf-transbay',
      metroStationId: 'montgomery',
      monumentId: 'monument-salesforce-tower',
      name: 'Salesforce Transit Center (Historic 1939 Transbay Terminal)',
      shortName: 'TRANSBAY TERMINAL',
      historicCompany: 'Key System Bridge Railway (1939) / Transbay Joint Powers Authority (2018)',
      modernNetwork: 'Transbay Bus Deck • Future Caltrain & California High-Speed Rail Underground Box',
      openedYear: 1939,
      trainStartYear: 1939,
      trainEndYear: 2026,
      buildingEndYear: 2026,
      arrondissement: 'SoMa / Financial District',
      destinationLabel: 'ACROSS THE BAY BRIDGE TO OAKLAND • BERKELEY • SILICON VALLEY',
      colorHex: '#38b6ff',
      lat: 37.7897,
      lon: -122.3965,
      rotationY: -0.78,
      trackCount: 8,
      shedWidth: 2.4,
      shedLength: 3.1,
      shedHeight: 0.90,
      shedSpans: 2,
      hasClockTower: false,
      description: 'Originally opened in January 1939 for Key System electric trains crossing the lower deck of the Bay Bridge; rebuilt in 2018 by César Pelli with a four-block elevated rooftop park, undulating Penrose-tile white aluminum skin, and a subterranean train box below.',
      corridorLatLon: [
        [37.7897, -122.3965],
        [37.7865, -122.3910],
        [37.7895, -122.3845],
        [37.7950, -122.3765]
      ]
    }
  ],
  districts: [
    {
      id: 'dist-embarcadero-fidi',
      number: 1,
      shortLabel: 'Embarcadero & FiDi',
      name: '1 — The Embarcadero, Financial District, SoMa & Union Square',
      officialName: 'Yerba Buena Cove & Downtown Spine',
      quartiers: 'The Embarcadero • Financial District • Union Square • SoMa • Transbay • Rincon Hill',
      bank: 'Eastern Bay Shore',
      filterGroup: 'core',
      eraBadge: 'GOLD RUSH COVE, FERRY TOWER & SKYSCRAPERS',
      foundedLabel: 'YERBA BUENA 1835 • FERRY 1898 • BART 1973',
      lat: 37.7915,
      lon: -122.4005,
      standOffRadius: 29.0,
      cameraHeightOffset: 18.0,
      haloRadiusScale: 2.3,
      metroLines: ['BART-Y', 'J', 'K', 'N', 'T', 'F', 'CC-PH', 'CC-CA'],
      history: 'Built over the buried Gold Rush ships of Yerba Buena Cove, anchored by the 1898 Ferry Building Clock Tower, the 1972 Transamerica Pyramid, the 2018 Salesforce Tower, and the double-deck BART/Muni subway beneath Market Street.',
      notableLandmarks: 'San Francisco Ferry Building, Transamerica Pyramid, Salesforce Tower, Bay Bridge, Union Square'
    },
    {
      id: 'dist-nob-hill-north-beach',
      number: 2,
      shortLabel: 'Nob Hill & Wharf',
      name: '2 — Chinatown, Nob Hill, Telegraph Hill & Fisherman’s Wharf',
      officialName: 'Historic Hills & Northern Bayfront',
      quartiers: 'Chinatown • Nob Hill • Russian Hill • Telegraph Hill • North Beach • Fisherman’s Wharf • Alcatraz',
      bank: 'Northern Bayfront & Hills',
      filterGroup: 'riveDroite',
      eraBadge: 'CABLE CAR CRESTS, CHINATOWN & COIT TOWER',
      foundedLabel: 'ALCATRAZ 1854 • CABLE CARS 1873 • COIT 1933',
      lat: 37.8005,
      lon: -122.4105,
      standOffRadius: 30.0,
      cameraHeightOffset: 18.5,
      haloRadiusScale: 2.3,
      metroLines: ['T', 'F', 'CC-PH', 'CC-CA'],
      history: 'Where 19th-century cable cars climb past North America’s oldest Chinatown (now served by the 2022 T-Third Central Subway) to the crests of Nob Hill and Russian Hill, looking out toward Coit Tower on Telegraph Hill and Alcatraz Island in the Bay.',
      notableLandmarks: 'Coit Tower, Alcatraz Island, Cable Car Museum, Lombard Street, Chinatown Rose Pak Station'
    },
    {
      id: 'dist-golden-gate-marina',
      number: 3,
      shortLabel: 'Golden Gate & Marina',
      name: '3 — Golden Gate Bridge, Presidio, Marina & Alamo Square',
      officialName: 'Golden Gate Strait & Victorian Western Heights',
      quartiers: 'Golden Gate Bridge • Presidio • Marina • Palace of Fine Arts • Pacific Heights • Alamo Square',
      bank: 'Golden Gate Strait',
      filterGroup: 'riveDroite',
      eraBadge: 'INTERNATIONAL ORANGE SPAN & PAINTED LADIES',
      foundedLabel: 'PRESIDIO 1776 • EXPO 1915 • GOLDEN GATE 1937',
      lat: 37.8025,
      lon: -122.4525,
      standOffRadius: 33.0,
      cameraHeightOffset: 19.5,
      haloRadiusScale: 2.4,
      metroLines: ['N', 'F', 'CC-PH'],
      history: 'Stretching from the Queen Anne Victorian "Painted Ladies" of Alamo Square (1892) across Pacific Heights to Bernard Maybeck’s 1915 Palace of Fine Arts, the 1776 Presidio, and the 1937 International Orange towers of the Golden Gate Bridge.',
      notableLandmarks: 'Golden Gate Bridge, Palace of Fine Arts Rotunda, The Painted Ladies (Alamo Square), Presidio'
    },
    {
      id: 'dist-mission-castro-twin-peaks',
      number: 4,
      shortLabel: 'Mission & Castro',
      name: '4 — Mission District, The Castro, Haight-Ashbury & Twin Peaks',
      officialName: 'Central Hills, Tunnels & Southern Valleys',
      quartiers: 'Mission Dolores • The Castro • Duboce Triangle • Haight-Ashbury • Twin Peaks • Mission Bay',
      bank: 'Southern & Western Valleys',
      filterGroup: 'riveGauche',
      eraBadge: '1776 MISSION, MUNI TUNNELS & COUNTERCULTURE',
      foundedLabel: 'MISSION 1776 • TWIN PEAKS TUNNEL 1918',
      lat: 37.7625,
      lon: -122.4295,
      standOffRadius: 31.0,
      cameraHeightOffset: 18.5,
      haloRadiusScale: 2.3,
      metroLines: ['BART-Y', 'J', 'K', 'N', 'T', 'F'],
      history: 'From the 1776 adobe walls of Mission Dolores and the murals of the Mission District to the LGBTQ+ landmark of the Castro, the 1967 Summer of Love in Haight-Ashbury, and the 1918 Twin Peaks and 1928 Sunset streetcar tunnels.',
      notableLandmarks: 'Twin Peaks, Mission Dolores Park, Castro Theatre, Forest Hill Station (1918), 4th & King Caltrain'
    }
  ],
  tourStops: [
    {
      id: 'tour-sf-golden-gate-1937',
      stopNumber: 1,
      title: 'The Golden Gate Bridge (1937): Art Deco Steel in the Pacific Fog',
      historicalDate: 'January 5, 1933 – May 27, 1937',
      timelineYear: 1937,
      locationName: 'Golden Gate Bridge',
      arrondissement: 'Golden Gate Strait',
      lat: 37.8199,
      lon: -122.4783,
      radiusScale: 1.95,
      monumentId: 'monument-golden-gate-bridge',
      stationId: 'hyde-beach',
      interviewQuestion: 'Why is the Golden Gate Bridge painted International Orange instead of standard battleship grey or black?',
      fact: 'When steel arrived from Pennsylvania coated in a red-lead primer, consulting architect Irving Morrow saw how brilliantly the warm vermilion-orange glowed against the Pacific fog and Marin hills—convincing the board to reject the Navy’s yellow-and-black stripes in favor of International Orange.'
    },
    {
      id: 'tour-sf-cable-cars-1873-nob-hill',
      stopNumber: 2,
      title: '1873–1888: Andrew Hallidie & the World’s Last Manual Cable Cars',
      historicalDate: 'August 2, 1873 • 1878 • 1888',
      timelineYear: 1900,
      locationName: 'Nob Hill & Powell–Hyde Cable Car',
      arrondissement: 'Nob Hill / Russian Hill',
      lat: 37.7946,
      lon: -122.4116,
      radiusScale: 1.65,
      monumentId: 'monument-coit-tower',
      stationId: 'cable-car-museum',
      interviewQuestion: 'How do San Francisco’s historic cable cars climb 21% grades without any onboard motor?',
      fact: 'Beneath the street slots run continuous loops of 1.25-inch steel wire rope moving at a constant 9.5 mph (15.3 km/h), pulled by giant electric winding sheaves inside the Washington & Mason Powerhouse; the gripman pulls a long lever like a pair of pliers to clamp onto the moving cable.'
    },
    {
      id: 'tour-sf-ferry-building-1906-1989',
      stopNumber: 3,
      title: 'The 1898 Ferry Building: Surviving Two Great Earthquakes',
      historicalDate: '1898 • April 18, 1906 • Oct 17, 1989',
      timelineYear: 1906,
      locationName: 'San Francisco Ferry Building & Embarcadero',
      arrondissement: 'The Embarcadero',
      lat: 37.7955,
      lon: -122.3937,
      radiusScale: 1.75,
      monumentId: 'monument-ferry-building',
      stationId: 'embarcadero',
      interviewQuestion: 'How did the 1989 Loma Prieta Earthquake ironically restore the Ferry Building to its 1898 waterfront glory?',
      fact: 'Before the Golden Gate and Bay Bridges opened in 1936–1937, 50,000 commuters a day passed through the Ferry Building. Cut off from the city in the 1950s by the double-deck Embarcadero Freeway, the terminal was liberated after the 1989 earthquake damaged the freeway and citizens voted to tear it down for a palm-lined boulevard and vintage F-Line streetcars.'
    },
    {
      id: 'tour-sf-painted-ladies-1915-expo',
      stopNumber: 4,
      title: 'Victorian Painted Ladies & the 1915 Panama-Pacific Exposition',
      historicalDate: '1892–1896 • Feb 20, 1915',
      timelineYear: 1915,
      locationName: 'Alamo Square Painted Ladies & Palace of Fine Arts',
      arrondissement: 'Alamo Square / Marina',
      lat: 37.7762,
      lon: -122.4328,
      radiusScale: 1.65,
      monumentId: 'monument-painted-ladies',
      stationId: 'duboce-park',
      interviewQuestion: 'Why did the Painted Ladies of Alamo Square survive the 1906 fire when 28,000 Victorian homes to the east burned?',
      fact: 'During the three-day inferno following the April 18, 1906 earthquake, firefighters and soldiers created a last-ditch firebreak along wide Van Ness Avenue—sparing the 1892–1896 Queen Anne Victorians of Alamo Square and the Western Addition.'
    },
    {
      id: 'tour-sf-transamerica-bart-tube',
      stopNumber: 5,
      title: 'Transamerica Pyramid (1972) & BART’s Underwater Transbay Tube (1974)',
      historicalDate: '1972 • September 16, 1974',
      timelineYear: 1974,
      locationName: 'Transamerica Pyramid & Market Street Subway',
      arrondissement: 'Financial District',
      lat: 37.7952,
      lon: -122.4028,
      radiusScale: 1.75,
      monumentId: 'monument-transamerica-pyramid',
      stationId: 'montgomery',
      interviewQuestion: 'How was the 5.8 km BART Transbay Tube built across the bottom of San Francisco Bay to withstand major earthquakes?',
      fact: 'Instead of boring through rock, engineers fabricated 57 mammoth binocular-shaped steel-and-concrete tube sections in shipyards, floated them onto the Bay, sank them into a dredged trench 135 feet underwater, and connected them to the Embarcadero with sliding seismic ball joints that survived the 1989 earthquake without a leak.'
    },
    {
      id: 'tour-sf-alcatraz-salesforce-2022',
      stopNumber: 6,
      title: 'From Alcatraz Island to Salesforce Tower & the Chinatown Subway',
      historicalDate: '1909 • 1969 • 2018 • Nov 19, 2022',
      timelineYear: 2022,
      locationName: 'Salesforce Tower & Chinatown Rose Pak Station',
      arrondissement: 'SoMa / Chinatown',
      lat: 37.7897,
      lon: -122.3972,
      radiusScale: 1.8,
      monumentId: 'monument-salesforce-tower',
      stationId: 'chinatown-rose-pak',
      interviewQuestion: 'How do Salesforce Tower (2018) and the T-Third Central Subway (2022) reshape 21st-century San Francisco transit?',
      fact: 'Crowned by César Pelli’s 326m Salesforce Tower and a 5.4-acre rooftop park atop the new Transbay Transit Center, downtown San Francisco is now linked by the deep-bored T-Third Central Subway directly beneath Market Street to Chinatown Rose Pak Station and electrified Caltrain at 4th & King.'
    }
  ],
  uiTheme: {
    culturalMovement: 'Golden Gate International Orange, Bay Fog Slate, Victorian Painted-Lady Gold & Bay Teal',
    hudTitle: 'SAN FRANCISCO • 1873–2026',
    hudSubtitle: 'GOLDEN GATE ART DECO, CABLE CARS & BART SUBWAY • 3D ARCHITECTURE & TRANSIT',
    networkTitle: 'BART TRANSBAY, MUNI METRO & HISTORIC CABLE CARS',
    districtsTabLabel: 'Hills & Districts',
    tourTabLabel: 'Golden Gate & Hills Tour',
    tourPanelTitle: 'GOLDEN GATE, CABLE CARS & BAY BRIDGES ODYSSEY',
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Syne:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap',
    palette: {
      bgObsidian: '#0b131b',
      bgPanel: 'rgba(14, 24, 34, 0.90)',
      bgPanelElevated: 'rgba(20, 34, 48, 0.95)',
      primaryBright: '#f4b942',
      primaryMain: '#f04a24',
      primaryMuted: '#a83216',
      borderSubtle: 'rgba(240, 74, 36, 0.50)',
      borderStrong: 'rgba(244, 185, 66, 0.88)',
      accentGlow: 'rgba(240, 74, 36, 0.34)',
      textPrimary: '#f7f4ed',
      textDim: '#c7d3de',
      textSubtle: '#8295a8',
      secondaryAccent: '#2a9d8f',
      alertAccent: '#f04a24',
      worldGroundBase: '#d8cfc0',
      worldWaterTint: '#134e6f',
      worldWallBase: '#e8dfd1',
      worldRoofBase: '#b84b31'
    },
    fonts: {
      display: "'Fraunces', 'Syne', Georgia, serif",
      serif: "'Fraunces', Georgia, serif",
      sans: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      mono: "'JetBrains Mono', monospace"
    },
    svgOrnamentPaths: [
      'M6 28 L6 6 L10 6 L10 28 M22 28 L22 6 L26 6 L26 28 M2 20 Q16 8 30 20 M2 22 L30 22'
    ]
  }
};
