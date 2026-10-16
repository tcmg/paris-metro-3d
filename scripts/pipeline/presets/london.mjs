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

export const LONDON_PRESET = {
  cityId: 'london',
  cityName: 'London',
  countryName: 'United Kingdom',
  geo: {
    centerLat: 51.5080,
    centerLon: -0.1180,
    bbox: [51.472, -0.195, 51.542, -0.005],
    kmPerDegLat: 111.25,
    kmPerDegLon: 69.28,
    worldUnitsPerKm: 11.2,
    coreRadiusKm: 7.5,
    isCoastal: false
  },
  topography: [
    // Ludgate Hill & Cornhill (City of London twin hills)
    { name: 'Ludgate Hill & St Paul’s Mound', lat: 51.5138, lon: -0.0984, height: 0.32, rx: 4.5, rz: 4.0 },
    // Hampstead Heath & Parliament Hill (North London Ridge, 134m)
    { name: 'Parliament Hill & Highgate Ridge', lat: 51.5560, lon: -0.1590, height: 1.12, rx: 16.0, rz: 10.5 },
    // Primrose Hill (64m)
    { name: 'Primrose Hill', lat: 51.5396, lon: -0.1608, height: 0.56, rx: 5.5, rz: 4.8 },
    // Pentonville / Angel Islington Escarpment
    { name: 'Islington & Pentonville Ridge', lat: 51.5320, lon: -0.1060, height: 0.45, rx: 9.0, rz: 6.5 },
    // Greenwich Royal Observatory Hill (South-East)
    { name: 'Greenwich Hill', lat: 51.4769, lon: -0.0005, height: 0.52, rx: 7.5, rz: 6.5 }
  ],
  waterCenterlines: [
    // River Thames from Chelsea / Battersea -> Westminster -> Blackfriars -> Tower Bridge -> Canary Wharf loop
    [51.4815, -0.1680, 2.2],
    [51.4848, -0.1410, 2.3],
    [51.4882, -0.1255, 2.4], // Vauxhall Bridge
    [51.5008, -0.1220, 2.6], // Westminster Bridge & Palace of Westminster
    [51.5078, -0.1165, 2.7], // Waterloo Bridge (Victoria Embankment)
    [51.5096, -0.1044, 2.6], // Blackfriars & Millennium Bridge
    [51.5079, -0.0877, 2.7], // London Bridge
    [51.5055, -0.0754, 2.9], // Tower Bridge (Pool of London)
    [51.5020, -0.0520, 3.1], // Wapping / Rotherhithe (Marc Brunel’s 1843 Thames Tunnel)
    [51.4900, -0.0280, 3.4], // Isle of Dogs / Canary Wharf bend
    [51.5040, -0.0040, 3.6]  // Greenwich Reach
  ],
  bridges: [
    {
      id: 'bridge-tower-bridge',
      name: 'Tower Bridge',
      lat: 51.5055,
      lon: -0.0754,
      builtYear: 1894,
      lengthWorld: 3.1,
      widthWorld: 0.44,
      rotationY: 0.32,
      style: 'bascule'
    },
    {
      id: 'bridge-westminster',
      name: 'Westminster Bridge',
      lat: 51.5009,
      lon: -0.1219,
      builtYear: 1862,
      lengthWorld: 2.9,
      widthWorld: 0.46,
      rotationY: 1.48,
      style: 'iron-arch'
    },
    {
      id: 'bridge-waterloo',
      name: 'Waterloo Bridge ("The Ladies’ Bridge")',
      lat: 51.5081,
      lon: -0.1168,
      builtYear: 1945,
      lengthWorld: 3.3,
      widthWorld: 0.45,
      rotationY: 0.72,
      style: 'stone-arch'
    },
    {
      id: 'bridge-millennium',
      name: 'Millennium Footbridge',
      lat: 51.5095,
      lon: -0.0985,
      builtYear: 2000,
      lengthWorld: 2.8,
      widthWorld: 0.24,
      rotationY: 0.05,
      style: 'suspension'
    }
  ],
  parks: [
    { name: 'Hyde Park & Kensington Gardens', lat: 51.5073, lon: -0.1657, rx: 11.5, rz: 6.8, rotation: -0.12, hasBasin: true },
    { name: "St James's Park & The Mall", lat: 51.5025, lon: -0.1348, rx: 5.2, rz: 3.2, rotation: -0.25, hasBasin: true },
    { name: 'Green Park', lat: 51.5040, lon: -0.1438, rx: 4.0, rz: 3.0, rotation: 0.15 },
    { name: "Regent's Park", lat: 51.5313, lon: -0.1569, rx: 7.8, rz: 7.4, rotation: 0.0, hasBasin: true }
  ],
  places: [
    { name: 'Trafalgar Square & Nelson’s Column', lat: 51.5080, lon: -0.1281, radius: 2.5, hasColumnOrObelisk: true },
    { name: 'Piccadilly Circus', lat: 51.5101, lon: -0.1340, radius: 1.9, hasColumnOrObelisk: true },
    { name: 'Parliament Square', lat: 51.5006, lon: -0.1268, radius: 2.2 },
    { name: 'Bank Junction (Royal Exchange)', lat: 51.5133, lon: -0.0889, radius: 2.1 }
  ],
  monuments: [
    {
      id: 'monument-big-ben-parliament',
      name: 'Palace of Westminster & Elizabeth Tower (Big Ben)',
      lat: 51.5007,
      lon: -0.1246,
      builtYear: 1859,
      radius: 4.6,
      heightMeters: 96,
      era: 'empire1900',
      eraLabel: 'Victorian Gothic • 1859',
      connectedLines: ['DIS', 'CIR', 'JUB'],
      style: 'Perpendicular Gothic Revival Palace & 96m Gilded Clock Tower (Charles Barry & Augustus Pugin, 1859)',
      arrondissement: 'City of Westminster',
      rotationY: 0.12,
      scale: 0.82,
      archetype: 'westminster_big_ben',
      primaryColor: '#d9c69e',
      accentColor: '#d8b04a',
      description: 'Crowned by the 96-meter Elizabeth Tower (Big Ben, 1859) and Victoria Tower along the Thames, underpinned by the 1868 District Railway cut-and-cover vault and Michael Hopkins’s 1999 Jubilee Line Extension mega-caisson.'
    },
    {
      id: 'monument-tower-bridge',
      name: 'Tower Bridge',
      lat: 51.5055,
      lon: -0.0754,
      builtYear: 1894,
      radius: 4.8,
      heightMeters: 65,
      era: 'empire1900',
      eraLabel: 'Victorian Bascule • 1894',
      connectedLines: ['CIR', 'DIS', 'NOR'],
      style: 'Twin Cornish Granite Gothic Towers, High-Level Walkways & Hydraulic Bascules (Horace Jones & John Wolfe Barry, 1894)',
      arrondissement: 'Tower Hamlets ↔ Southwark',
      rotationY: 0.32,
      scale: 0.82,
      archetype: 'tower_bridge_bascule',
      primaryColor: '#d4cab8',
      accentColor: '#3a7ca5',
      description: 'Inaugurated in June 1894 across the Pool of London just downstream of the 1890 City & South London Railway—the world’s first deep-level electric "Tube" tunnel beneath the Thames.'
    },
    {
      id: 'monument-buckingham-palace',
      name: 'Buckingham Palace & Victoria Memorial',
      lat: 51.5014,
      lon: -0.1419,
      builtYear: 1850,
      radius: 4.4,
      heightMeters: 37,
      era: 'empire1900',
      eraLabel: 'Royal Seat • 1837 / 1913',
      connectedLines: ['VIC', 'PIC', 'JUB', 'DIS', 'CIR'],
      style: 'Portland Stone Neoclassical East Front & Gilded Winged Victory Memorial (Aston Webb, 1913)',
      arrondissement: 'Westminster (St James’s)',
      rotationY: -0.48,
      scale: 0.78,
      archetype: 'grand_palace_facade',
      primaryColor: '#eee7d8',
      accentColor: '#d8b04a',
      description: 'Official London residence of the British Monarch since Queen Victoria’s accession in 1837, terminating the ceremonial red-tarmac axis of The Mall between Green Park, St James’s Park, and Victoria stations.'
    },
    {
      id: 'monument-st-pauls-cathedral',
      name: "St Paul's Cathedral",
      lat: 51.5138,
      lon: -0.0984,
      builtYear: 1710,
      radius: 4.4,
      heightMeters: 111,
      era: 'medieval',
      eraLabel: 'English Baroque • 1710',
      connectedLines: ['CEN'],
      style: 'Portland Stone English Baroque Triple-Shell Dome & Twin West Towers (Sir Christopher Wren, 1710)',
      arrondissement: 'City of London (Ludgate Hill)',
      rotationY: 0.10,
      scale: 0.80,
      archetype: 'baroque_dome_cathedral',
      primaryColor: '#e8e2d5',
      accentColor: '#d8b04a',
      description: 'Rebuilt by Sir Christopher Wren after the Great Fire of 1666; in 1900 the Central London Railway ("Twopenny Tube") threaded its cast-iron tunnels carefully around the cathedral’s foundations.'
    },
    {
      id: 'monument-tower-of-london',
      name: 'Tower of London (White Tower)',
      lat: 51.5081,
      lon: -0.0759,
      builtYear: 1078,
      radius: 4.0,
      heightMeters: 27,
      era: 'medieval',
      eraLabel: 'Norman Keep • 1078',
      connectedLines: ['CIR', 'DIS'],
      style: 'Caen Stone Norman Keep & Four Corner Turrets (William the Conqueror, 1078)',
      arrondissement: 'Tower Hill',
      rotationY: 0.15,
      scale: 0.76,
      archetype: 'norman_four_turret_keep',
      primaryColor: '#dcd3c0',
      accentColor: '#8b1526',
      description: 'Founded by William the Conqueror in 1078 beside the Roman city wall and home to the Crown Jewels, directly overlooking Tower Hill Underground station.'
    },
    {
      id: 'monument-london-eye',
      name: 'London Eye (Millennium Wheel)',
      lat: 51.5033,
      lon: -0.1195,
      builtYear: 2000,
      radius: 4.2,
      heightMeters: 135,
      era: 'modern',
      eraLabel: 'Millennium • 2000',
      connectedLines: ['JUB', 'BAK', 'NOR'],
      style: '135m Cantilevered A-Frame Tensioned Observation Wheel (Marks Barfield, 2000)',
      arrondissement: 'South Bank (Lambeth)',
      rotationY: 1.48,
      scale: 0.80,
      archetype: 'ferris_wheel',
      primaryColor: '#f2f5f8',
      accentColor: '#c8102e',
      description: 'Inaugurated on the South Bank of the Thames for the year 2000 alongside the Jubilee Line Extension at Waterloo and Westminster.'
    },
    {
      id: 'monument-the-shard',
      name: 'The Shard (London Bridge Tower)',
      lat: 51.5045,
      lon: -0.0865,
      builtYear: 2012,
      radius: 3.8,
      heightMeters: 310,
      era: 'modern',
      eraLabel: 'Glass Spire • 2012',
      connectedLines: ['JUB', 'NOR'],
      style: '310m Neo-Futurist Eight-Faceted Fractured Glass Pyramid (Renzo Piano, 2012)',
      arrondissement: 'Southwark (London Bridge)',
      rotationY: 0.0,
      scale: 0.82,
      archetype: 'shard_glass_pyramid',
      primaryColor: '#a8d0e6',
      accentColor: '#e6f2fa',
      description: 'Inspired by Canaletto’s 18th-century paintings of London church spires and sailing masts, Renzo Piano’s 310m glass tower rises directly out of the London Bridge railway and Underground interchange.'
    },
    {
      id: 'monument-st-pancras',
      name: 'St Pancras International & King’s Cross',
      lat: 51.5315,
      lon: -0.1261,
      builtYear: 1868,
      radius: 4.4,
      heightMeters: 82,
      era: 'gares',
      eraLabel: 'High Victorian Gothic • 1868',
      connectedLines: ['MET', 'CIR', 'PIC', 'NOR', 'VIC'],
      style: 'Red-Brick Victorian Gothic Chambers, 82m Clock Tower & 73m Barlow Iron Train Shed (George Gilbert Scott & William Henry Barlow, 1868)',
      arrondissement: 'Camden (King’s Cross)',
      rotationY: -0.18,
      scale: 0.80,
      archetype: 'clock_tower_terminus',
      primaryColor: '#a84232',
      accentColor: '#d8b04a',
      description: 'Adjacent to the 1863 Metropolitan Railway—the world’s very first underground railway—William Henry Barlow’s colossal single-span train shed and Sir George Gilbert Scott’s Gothic spire became London’s Eurostar terminal to Paris in 2007.'
    }
  ],
  milestones: [
    { year: 1863, shortLabel: '1863', headline: 'Jan 10, 1863: The Metropolitan Railway opens (Paddington ↔ Farringdon) — the world’s first Underground!' },
    { year: 1884, shortLabel: '1884', headline: 'Oct 6, 1884: Completion of the Inner Circle steam underground loop around Victorian London' },
    { year: 1890, shortLabel: '1890', headline: 'Dec 18, 1890: City & South London Railway opens the world’s first deep-level electric "Tube" beneath the Thames' },
    { year: 1900, shortLabel: '1900', headline: 'July 30, 1900: Opening of the Central London Railway ("Twopenny Tube") from Bank to Shepherd’s Bush' },
    { year: 1906, shortLabel: '1906', headline: '1906–1907: Leslie Green’s oxblood-red terracotta stations open across the Bakerloo, Piccadilly & Northern lines' },
    { year: 1933, shortLabel: '1933', headline: '1933: Creation of London Transport, Charles Holden’s modernist stations & Harry Beck’s iconic Tube Map' },
    { year: 1969, shortLabel: '1969', headline: 'March 7, 1969: Queen Elizabeth II inaugurates the automated Victoria Line across central London' },
    { year: 1999, shortLabel: '1999', headline: '1999: The Jubilee Line Extension links Westminster, Waterloo, London Bridge & Canary Wharf' },
    { year: 2022, shortLabel: '2022', headline: 'May 24, 2022: Inauguration of the Elizabeth Line (Crossrail) high-capacity twin caverns beneath London' },
    { year: 2026, shortLabel: '2026', headline: '2026: 163 Years of the London Underground, Elizabeth Line & Overground' }
  ],
  eras: [
    {
      startYear: 1863,
      endYear: 1889,
      eraTag: 'VICTORIAN STEAM UNDERGROUND • 1863–1889',
      title: 'The 1863 Metropolitan Railway & the Steam Inner Circle',
      description: 'On January 10, 1863, the Metropolitan Railway inaugurated the world’s first underground passenger railway using condensing steam locomotives in cut-and-cover brick trenches between Paddington and Farringdon.',
      urbanChanges: [
        'World’s first underground railway opens between Paddington, King’s Cross & Farringdon (1863)',
        'Marc & Isambard Kingdom Brunel’s 1843 Thames Tunnel becomes an East London railway crossing (1869)',
        'Completion of the Metropolitan & District Inner Circle loop (1884)'
      ]
    },
    {
      startYear: 1890,
      endYear: 1918,
      eraTag: 'EDWARDIAN DEEP-TUBE BOOM • 1890–1918',
      title: 'Greathead Tunneling Shields, Electric Tubes & Oxblood Terracotta',
      description: 'James Henry Greathead’s cylindrical tunneling shield and electric traction birthed the deep "Tube" in 1890, followed by Charles Yerkes’s Bakerloo, Piccadilly, and Hampstead lines clad in Leslie Green’s oxblood Faience tiles.',
      urbanChanges: [
        'First deep-level electric Tube under the Thames (City & South London Railway, 1890)',
        'Opening of the Central Line "Twopenny Tube" (1900) and Tower Bridge (1894)',
        'Bakerloo, Piccadilly & Charing Cross lines (1906–1907) with Edward Johnston’s 1916 typeface'
      ]
    },
    {
      startYear: 1919,
      endYear: 1979,
      eraTag: 'FRANK PICK, BECK & VICTORIA LINE • 1919–1979',
      title: 'The Roundel, Harry Beck’s Diagram & the Victoria Line',
      description: 'Under Frank Pick and architect Charles Holden, the London Underground became a global triumph of unified design, culminating in Harry Beck’s 1933 topological Tube map and the 1968–1969 Victoria Line.',
      urbanChanges: [
        'Charles Holden’s Piccadilly Circus subterranean rotunda (1928) & Harry Beck’s Tube Map (1933)',
        'Wartime deep-level shelters & closure of British Museum (1933) and Aldwych (1994) ghost stations',
        'Opening of the automated Victoria Line (1968–1971) & Jubilee Line phase 1 (1979)'
      ]
    },
    {
      startYear: 1980,
      endYear: 2026,
      eraTag: 'JUBILEE EXTENSION & ELIZABETH LINE • 1980–2026',
      title: 'Docklands, Millennium Mega-Stations & Crossrail Caverns',
      description: 'The 1999 Jubilee Line Extension sculpted subterranean concrete cathedrals at Westminster and Canary Wharf, followed in May 2022 by the Elizabeth Line’s 250-meter-long cross-London caverns.',
      urbanChanges: [
        'Jubilee Line Extension across Westminster, Waterloo, London Bridge & Canary Wharf (1999)',
        'London Eye (2000), St Pancras Eurostar High-Speed Terminal (2007) & The Shard (2012)',
        'Inauguration of the Elizabeth Line (Crossrail) through Paddington, Farringdon & Liverpool Street (2022)'
      ]
    }
  ],
  metroLines: [
    {
      id: 'MET',
      name: 'Metropolitan & Circle Line (1863 Inaugural Underground)',
      shortLabel: 'CIR',
      color: '#ffd300',
      textColor: '#10141c',
      openedYear: 1863,
      depthOffset: -1.6,
      historicCompany: 'Metropolitan / District Rly',
      summary: 'The world’s oldest underground railway (Jan 10, 1863) and the Victorian cut-and-cover loop encircling central London.',
      stations: [
        { id: 'paddington', name: 'Paddington', lat: 51.5154, lon: -0.1755, openedYear: 1863, arrondissement: 'Westminster', architecture: '1854 Brunel Iron Shed & 1863 Inaugural Underground Terminus', description: 'Western terminus of the world’s very first underground passenger journey on January 10, 1863.' },
        { id: 'baker-street', name: 'Baker Street', lat: 51.5226, lon: -0.1571, openedYear: 1863, arrondissement: 'Marylebone', architecture: 'Original 1863 Vaulted Brick Platform with Sunlight Shafts', description: 'Finest surviving 1863 Metropolitan Railway brick vault and 10-platform junction.' },
        { id: 'kings-cross-st-pancras', name: 'King’s Cross St. Pancras', lat: 51.5308, lon: -0.1238, openedYear: 1863, arrondissement: 'Camden', architecture: 'Six-Line Underground Mega-Hub', landmark: 'St Pancras International', description: 'London’s busiest Underground station, serving six Tube lines and two mainline terminals.' },
        { id: 'farringdon', name: 'Farringdon', lat: 51.5203, lon: -0.1053, openedYear: 1863, arrondissement: 'Islington / City', architecture: '1863 Eastern Terminus & 2022 Elizabeth Line Super-Hub', description: 'Inaugural eastern terminus of the 1863 Metropolitan Railway.' },
        { id: 'liverpool-street', name: 'Liverpool Street', lat: 51.5178, lon: -0.0823, openedYear: 1875, arrondissement: 'City of London', architecture: 'Victorian Cast-Iron & Sub-Surface Vault', description: 'Financial district hub connecting Metropolitan, Central, Circle, and Elizabeth lines.' },
        { id: 'tower-hill', name: 'Tower Hill', lat: 51.5098, lon: -0.0766, openedYear: 1882, arrondissement: 'Tower Hamlets', architecture: 'Cut-and-Cover Track Beside the Roman Wall', landmark: 'Tower of London & Tower Bridge', description: 'Overlooks the medieval moat of the Tower of London.' },
        { id: 'monument-bank', name: 'Bank / Monument', lat: 51.5113, lon: -0.0862, openedYear: 1884, arrondissement: 'City of London', architecture: 'Labyrinthine Six-Line Subterranean Complex beneath the Bank of England', description: 'Completed the Inner Circle in October 1884 and joined by the 1890 and 1900 deep Tubes.' },
        { id: 'embankment', name: 'Embankment', lat: 51.5074, lon: -0.1223, openedYear: 1870, arrondissement: 'Westminster', architecture: 'Built Inside Sir Joseph Bazalgette’s Victoria Embankment', description: 'Constructed simultaneously with the Thames Embankment and sewerage interceptor in 1870.' },
        { id: 'westminster', name: 'Westminster', lat: 51.5010, lon: -0.1254, openedYear: 1868, arrondissement: 'Westminster', architecture: '1868 Sub-Surface Vault & 39m-Deep 1999 Hopkins Braced Escalator Void', landmark: 'Big Ben & Palace of Westminster', description: 'Stands at the foot of Big Ben; rebuilt in 1999 with colossal flying steel struts inside a 39m-deep concrete box.' },
        { id: 'victoria', name: 'Victoria', lat: 51.4965, lon: -0.1447, openedYear: 1868, arrondissement: 'Westminster', architecture: 'Royal Gateway Interchange', landmark: 'Buckingham Palace', description: 'Major royal and southern commuter interchange.' }
      ]
    },
    {
      id: 'NOR',
      name: 'Northern Line (1890 First Deep Electric Tube)',
      shortLabel: 'NOR',
      color: '#262626',
      textColor: '#ffffff',
      openedYear: 1890,
      depthOffset: -3.2,
      historicCompany: 'C&SLR / CCE&H',
      summary: 'Incorporates the 1890 City & South London Railway—the world’s first deep-level electric tube railway beneath the River Thames.',
      stations: [
        { id: 'kings-cross-st-pancras', name: 'King’s Cross St. Pancras', lat: 51.5308, lon: -0.1238, openedYear: 1907, arrondissement: 'Camden', architecture: 'Deep Tube Platform', description: 'Northern Line City branch.' },
        { id: 'monument-bank', name: 'Bank (with King William Street 1890 Ghost Stub)', lat: 51.5113, lon: -0.0862, openedYear: 1900, isGhostStation: true, arrondissement: 'City of London', architecture: 'Greathead Shield Cast-Iron Tube & Abandoned 1890 King William St Approach', description: 'Adjacent to the closed 1890–1900 King William Street terminus, the world’s first deep-tube ghost station.' },
        { id: 'london-bridge', name: 'London Bridge', lat: 51.5052, lon: -0.0864, openedYear: 1900, arrondissement: 'Southwark', architecture: 'Deep Thames-Crossing Tube & Shard Concourse', landmark: 'The Shard', description: 'South Bank gateway of the 1900 C&SLR extension.' },
        { id: 'waterloo', name: 'Waterloo', lat: 51.5036, lon: -0.1143, openedYear: 1926, arrondissement: 'Lambeth', architecture: 'Four-Line South Bank Super-Hub', landmark: 'London Eye', description: 'Connects Northern, Bakerloo, Jubilee, and Waterloo & City lines.' },
        { id: 'embankment', name: 'Embankment', lat: 51.5074, lon: -0.1223, openedYear: 1914, arrondissement: 'Westminster', architecture: 'Charing Cross River Loop', description: 'Crosses beneath the Thames to Waterloo.' },
        { id: 'leicester-square', name: 'Leicester Square', lat: 51.5113, lon: -0.1281, openedYear: 1906, arrondissement: 'West End', architecture: 'Leslie Green Oxblood Faience & 1935 Circular Ticket Hall', description: 'West End theaterland heart connecting Northern and Piccadilly lines.' },
        { id: 'tottenham-court-road', name: 'Tottenham Court Road', lat: 51.5165, lon: -0.1310, openedYear: 1907, arrondissement: 'Fitzrovia / Soho', architecture: 'Eduardo Paolozzi Mosaic Vaults & Elizabeth Line Hub', description: 'Famous for Eduardo Paolozzi’s vibrant 1984 glass mosaics.' }
      ]
    },
    {
      id: 'CEN',
      name: 'Central Line (1900 "Twopenny Tube")',
      shortLabel: 'CEN',
      color: '#dc241f',
      textColor: '#ffffff',
      openedYear: 1900,
      depthOffset: -2.6,
      historicCompany: 'Central London Rly',
      summary: 'Opened in July 1900 as the "Twopenny Tube" running straight beneath Oxford Street, Holborn, St Paul’s, and Bank.',
      stations: [
        { id: 'bond-street', name: 'Bond Street', lat: 51.5142, lon: -0.1494, openedYear: 1900, arrondissement: 'Mayfair', architecture: '1900 White Tile Tube & 2022 Colonnaded Elizabeth Line Hall', description: 'Serves Mayfair and Oxford Street.' },
        { id: 'oxford-circus', name: 'Oxford Circus', lat: 51.5152, lon: -0.1418, openedYear: 1900, arrondissement: 'West End', architecture: 'Harry Bell Measures Terracotta Pavilion & Diagonal Crossing', description: 'Three-line interchange beneath the Regent Street / Oxford Street intersection.' },
        { id: 'tottenham-court-road', name: 'Tottenham Court Road', lat: 51.5165, lon: -0.1310, openedYear: 1900, arrondissement: 'Soho', architecture: 'Central / Northern / Elizabeth Hub', description: 'Eastern end of Oxford Street.' },
        { id: 'british-museum-ghost', name: 'British Museum (Closed Ghost Station)', lat: 51.5180, lon: -0.1228, openedYear: 1900, closedYear: 1933, isGhostStation: true, arrondissement: 'Bloomsbury', architecture: 'Abandoned 1900 CLR Tunnel Platforms', description: 'Opened on July 30, 1900 and permanently closed on September 24, 1933 when nearby Holborn station gained Central Line platforms.' },
        { id: 'holborn', name: 'Holborn', lat: 51.5174, lon: -0.1200, openedYear: 1906, arrondissement: 'Holborn', architecture: 'Central & Piccadilly Deep Interchange', description: 'Replaced British Museum station in 1933.' },
        { id: 'st-pauls', name: 'St. Paul’s', lat: 51.5146, lon: -0.0973, openedYear: 1900, arrondissement: 'City of London', architecture: 'Stacked Vertically Offset Tube Tunnels', landmark: "St Paul's Cathedral", description: 'Opened in 1900 as Post Office; tunnels are stacked one above the other to stay beneath Newgate Street without disturbing Wren’s cathedral foundations.' },
        { id: 'monument-bank', name: 'Bank', lat: 51.5113, lon: -0.0862, openedYear: 1900, arrondissement: 'City of London', architecture: 'Sub-Royal Exchange Rotunda', description: 'Inaugural 1900 eastern terminus.' },
        { id: 'liverpool-street', name: 'Liverpool Street', lat: 51.5178, lon: -0.0823, openedYear: 1912, arrondissement: 'City of London', architecture: 'Eastern City Hub', description: 'Extended from Bank in 1912.' }
      ]
    },
    {
      id: 'PIC',
      name: 'Piccadilly Line (1906 Edwardian Tube)',
      shortLabel: 'PIC',
      color: '#0019a8',
      textColor: '#ffffff',
      openedYear: 1906,
      depthOffset: -2.9,
      historicCompany: 'GNP&BR',
      summary: 'Opened in December 1906 with Leslie Green’s oxblood-red stations and Charles Holden’s 1928 Piccadilly Circus rotunda.',
      stations: [
        { id: 'green-park', name: 'Green Park', lat: 51.5067, lon: -0.1428, openedYear: 1906, arrondissement: 'Mayfair / St James’s', architecture: 'Royal Park Gateway', landmark: 'Buckingham Palace', description: 'Primary Tube gateway for Buckingham Palace.' },
        { id: 'piccadilly-circus', name: 'Piccadilly Circus', lat: 51.5101, lon: -0.1340, openedYear: 1906, arrondissement: 'West End', architecture: 'Charles Holden 1928 Subterranean Travertine Rotunda', description: 'Masterpiece of 1928 underground architecture directly beneath the Shaftesbury Memorial Fountain (Eros).' },
        { id: 'leicester-square', name: 'Leicester Square', lat: 51.5113, lon: -0.1281, openedYear: 1906, arrondissement: 'West End', architecture: 'West End Interchange', description: 'Crosses the Northern Line.' },
        { id: 'covent-garden', name: 'Covent Garden', lat: 51.5129, lon: -0.1243, openedYear: 1907, arrondissement: 'Covent Garden', architecture: 'Leslie Green Oxblood Terracotta & Deep Lifts', description: 'Only 260 meters from Leicester Square—the shortest distance between adjacent stations on the Underground.' },
        { id: 'holborn', name: 'Holborn', lat: 51.5174, lon: -0.1200, openedYear: 1906, arrondissement: 'Holborn', architecture: 'Four-Platform Junction (including Aldwych Ghost Platform)', description: 'Branch junction for the former Aldwych spur.' },
        { id: 'aldwych-ghost', name: 'Aldwych (Closed Ghost Station)', lat: 51.5130, lon: -0.1155, openedYear: 1907, closedYear: 1994, isGhostStation: true, arrondissement: 'Strand', architecture: 'Leslie Green Oxblood Facade & Preserved 1907 Twin Platforms', description: 'Opened as Strand in 1907, used to shelter the Elgin Marbles during the Blitz, and closed in 1994; today London’s most famous filming ghost station.' },
        { id: 'kings-cross-st-pancras', name: 'King’s Cross St. Pancras', lat: 51.5308, lon: -0.1238, openedYear: 1906, arrondissement: 'Camden', architecture: 'Deep Tube Hub', description: 'Connects with Eurostar and mainline rail.' }
      ]
    },
    {
      id: 'JUB',
      name: 'Jubilee Line & 1999 Millennium Extension',
      shortLabel: 'JUB',
      color: '#838d93',
      textColor: '#ffffff',
      openedYear: 1979,
      depthOffset: -3.5,
      historicCompany: 'London Underground',
      summary: 'Opened for the Silver Jubilee (1979) and extended in 1999 with monumental high-tech underground architecture across the Thames.',
      stations: [
        { id: 'bond-street', name: 'Bond Street', lat: 51.5142, lon: -0.1494, openedYear: 1979, arrondissement: 'Mayfair', architecture: 'Jubilee Cavern', description: 'Connects with Central and Elizabeth lines.' },
        { id: 'green-park', name: 'Green Park', lat: 51.5067, lon: -0.1428, openedYear: 1979, arrondissement: 'St James’s', architecture: 'Royal Parks Hub', description: 'Pivots the Jubilee Line toward Westminster.' },
        { id: 'westminster', name: 'Westminster', lat: 51.5010, lon: -0.1254, openedYear: 1999, arrondissement: 'Westminster', architecture: 'Michael Hopkins 39m-Deep Braced Concrete Void', landmark: 'Big Ben & Parliament', description: 'Platform edge doors inside a monumental subterranean atrium.' },
        { id: 'waterloo', name: 'Waterloo', lat: 51.5036, lon: -0.1143, openedYear: 1999, arrondissement: 'Lambeth', architecture: 'High-Tech Colonnaded Concourse', landmark: 'London Eye', description: 'Serves the South Bank and London Eye.' },
        { id: 'london-bridge', name: 'London Bridge', lat: 51.5052, lon: -0.0864, openedYear: 1999, arrondissement: 'Southwark', architecture: 'Cast-Iron & Concrete Vaults Beneath The Shard', landmark: 'The Shard', description: 'Major Southwark interchange.' }
      ]
    },
    {
      id: 'ELZ',
      name: 'Elizabeth Line (2022 Crossrail)',
      shortLabel: 'ELZ',
      color: '#6950a1',
      textColor: '#ffffff',
      openedYear: 2022,
      depthOffset: -3.8,
      historicCompany: 'TfL Elizabeth Line',
      summary: 'Inaugurated in May 2022 with sweeping curvilinear glass-fiber concrete caverns beneath Paddington, Bond Street, Farringdon, and Liverpool Street.',
      stations: [
        { id: 'paddington', name: 'Paddington', lat: 51.5154, lon: -0.1755, openedYear: 2022, arrondissement: 'Westminster', architecture: '120m Cloud-Canopy Subterranean Box (Weston Williamson)', description: 'Flooded with natural light beneath Eastbourne Terrace.' },
        { id: 'bond-street', name: 'Bond Street', lat: 51.5142, lon: -0.1494, openedYear: 2022, arrondissement: 'Mayfair', architecture: 'John McAslan Double-Height Colonnade', description: 'Opened in October 2022.' },
        { id: 'tottenham-court-road', name: 'Tottenham Court Road', lat: 51.5165, lon: -0.1310, openedYear: 2022, arrondissement: 'Soho', architecture: 'Curvilinear White GRC Vaults', description: 'Interchange with Central and Northern lines.' },
        { id: 'farringdon', name: 'Farringdon', lat: 51.5203, lon: -0.1053, openedYear: 2022, arrondissement: 'City / Islington', architecture: 'Diamond-Diagrid Concrete Ceiling & Thameslink Hub', description: 'North–South / East–West crossroad of London rail.' },
        { id: 'liverpool-street', name: 'Liverpool Street', lat: 51.5178, lon: -0.0823, openedYear: 2022, arrondissement: 'City of London', architecture: '400m Cavern Spanning Moorgate to Liverpool Street', description: 'Serves the City of London financial core.' }
      ]
    }
  ],
  railTermini: [
    {
      id: 'gl-st-pancras-kings-cross',
      metroStationId: 'kings-cross-st-pancras',
      monumentId: 'monument-st-pancras',
      name: 'St Pancras International & King’s Cross',
      shortName: 'ST PANCRAS / KX',
      historicCompany: 'Midland Railway (1868) & Great Northern Railway (1852)',
      modernNetwork: 'Eurostar (Paris • Brussels • Amsterdam) • LNER East Coast',
      openedYear: 1868,
      trainStartYear: 1900,
      trainEndYear: 2026,
      buildingEndYear: 2026,
      arrondissement: 'Camden',
      destinationLabel: 'TO PARIS (EUROSTAR) • EDINBURGH (FLYING SCOTSMAN)',
      colorHex: '#d8b04a',
      lat: 51.5315,
      lon: -0.1261,
      rotationY: -0.22,
      trackCount: 10,
      shedWidth: 2.5,
      shedLength: 3.3,
      shedHeight: 0.96,
      shedSpans: 2,
      hasClockTower: true,
      description: 'Side by side on Euston Road, Lewis Cubitt’s 1852 King’s Cross (home of the Flying Scotsman) and Barlow & Scott’s 1868 Gothic St Pancras (London’s Eurostar terminal since 2007) form Britain’s most celebrated railway gateway.',
      corridorLatLon: [
        [51.5315, -0.1261],
        [51.5375, -0.1275],
        [51.5445, -0.1290]
      ]
    },
    {
      id: 'gl-paddington',
      metroStationId: 'paddington',
      name: 'London Paddington Station',
      shortName: 'PADDINGTON (GWR)',
      historicCompany: 'Great Western Railway — Isambard Kingdom Brunel (1854)',
      modernNetwork: 'GWR Intercity • Heathrow Express • Elizabeth Line',
      openedYear: 1854,
      trainStartYear: 1900,
      trainEndYear: 2026,
      buildingEndYear: 2026,
      arrondissement: 'Westminster',
      destinationLabel: 'TO BRISTOL • BATH • OXFORD • PENZANCE',
      colorHex: '#00643b',
      lat: 51.5154,
      lon: -0.1755,
      rotationY: -1.05,
      trackCount: 8,
      shedWidth: 2.3,
      shedLength: 3.0,
      shedHeight: 0.88,
      shedSpans: 3,
      description: 'Designed by Isambard Kingdom Brunel and Matthew Digby Wyatt in 1854 with triple wrought-iron transept roofs and adjacent to the 1863 birthplace of the London Underground.',
      corridorLatLon: [
        [51.5154, -0.1755],
        [51.5185, -0.1865],
        [51.5210, -0.1960]
      ]
    }
  ],
  districts: [
    {
      id: 'dist-westminster-royal',
      number: 1,
      shortLabel: 'Westminster',
      name: '1 — Royal Westminster, Whitehall & St James’s',
      officialName: 'City of Westminster (Royal & Parliamentary Core)',
      quartiers: 'Westminster • Whitehall • St James’s • Mayfair • Trafalgar Square',
      bank: 'North Bank',
      filterGroup: 'core',
      eraBadge: 'CROWN, PARLIAMENT & THE MALL',
      foundedLabel: 'ABBEY 1065 • PALACE 1837',
      lat: 51.5030,
      lon: -0.1320,
      standOffRadius: 30.0,
      cameraHeightOffset: 18.0,
      haloRadiusScale: 2.3,
      metroLines: ['MET', 'JUB', 'PIC', 'CEN'],
      history: 'Seat of the British Monarchy and Parliament for a thousand years, stretching from the Palace of Westminster and Big Ben along Whitehall to Trafalgar Square and down The Mall to Buckingham Palace.',
      notableLandmarks: 'Palace of Westminster & Big Ben, Buckingham Palace, Trafalgar Square, Westminster Abbey'
    },
    {
      id: 'dist-city-of-london',
      number: 2,
      shortLabel: 'The City',
      name: '2 — The Square Mile: St Paul’s, Bank & Tower Hill',
      officialName: 'City of London (Londinium)',
      quartiers: 'Ludgate Hill • Bank • Cheapside • Guildhall • Liverpool Street • Tower Hill',
      bank: 'North Bank',
      filterGroup: 'core',
      eraBadge: 'ROMAN LONDINIUM, WREN & THE TUBE',
      foundedLabel: '47 AD • 1666 • 1890',
      lat: 51.5130,
      lon: -0.0890,
      standOffRadius: 30.0,
      cameraHeightOffset: 18.0,
      haloRadiusScale: 2.3,
      metroLines: ['MET', 'NOR', 'CEN', 'ELZ'],
      history: 'Founded by the Romans as Londinium around 47 AD, crowned by William the Conqueror’s White Tower (1078) and Christopher Wren’s St Paul’s Cathedral (1710), and pierced in 1890 by the world’s first deep-level electric Tube.',
      notableLandmarks: "St Paul's Cathedral, Tower of London, Tower Bridge, Bank of England, Liverpool Street"
    },
    {
      id: 'dist-west-end-bloomsbury',
      number: 3,
      shortLabel: 'West End / Camden',
      name: '3 — West End, Covent Garden, Bloomsbury & King’s Cross',
      officialName: 'West End & Camden Railway Quarter',
      quartiers: 'Soho • Piccadilly • Covent Garden • Bloomsbury • King’s Cross • St Pancras',
      bank: 'North Bank',
      filterGroup: 'riveDroite',
      eraBadge: '1863 UNDERGROUND BIRTHPLACE & THEATERLAND',
      foundedLabel: '1863 METROPOLITAN • 1928 HOLDEN',
      lat: 51.5205,
      lon: -0.1265,
      standOffRadius: 31.0,
      cameraHeightOffset: 18.5,
      haloRadiusScale: 2.4,
      metroLines: ['MET', 'PIC', 'NOR', 'CEN', 'ELZ'],
      history: 'Where the world’s first underground train steamed beneath Euston Road from Paddington to King’s Cross and Farringdon in January 1863, and where Edwardian Tubes illuminated Piccadilly Circus and Leicester Square.',
      notableLandmarks: 'St Pancras International, Piccadilly Circus, British Museum (Ghost Station), Aldwych'
    },
    {
      id: 'dist-south-bank-southwark',
      number: 4,
      shortLabel: 'South Bank',
      name: '4 — South Bank, Waterloo, Lambeth & Southwark',
      officialName: 'London Boroughs of Lambeth & Southwark',
      quartiers: 'South Bank • Waterloo • Bankside • London Bridge • Bermondsey',
      bank: 'South Bank',
      filterGroup: 'riveGauche',
      eraBadge: 'SHAKESPEARE’S BANKSIDE, LONDON EYE & THE SHARD',
      foundedLabel: 'LONDON BRIDGE 50 AD • JUBILEE 1999',
      lat: 51.5042,
      lon: -0.1025,
      standOffRadius: 30.0,
      cameraHeightOffset: 18.0,
      haloRadiusScale: 2.3,
      metroLines: ['NOR', 'JUB'],
      history: 'From the southern bridgehead of Roman and medieval London Bridge and Shakespeare’s Globe to the 1951 Festival of Britain, the 1999 Jubilee Line Extension, the London Eye (2000), and Renzo Piano’s 310m Shard (2012).',
      notableLandmarks: 'The Shard, London Eye, Waterloo Station, Tower Bridge South Approach'
    }
  ],
  tourStops: [
    {
      id: 'tour-london-1863-metropolitan',
      stopNumber: 1,
      title: '1863: Paddington to Farringdon — Birth of the Underground',
      historicalDate: 'January 10, 1863',
      timelineYear: 1863,
      locationName: 'Paddington, Baker Street & Farringdon',
      arrondissement: 'Westminster / Camden',
      lat: 51.5226,
      lon: -0.1571,
      radiusScale: 1.7,
      stationId: 'baker-street',
      interviewQuestion: 'When did the world’s first underground railway open in London, and how did it operate?',
      fact: 'On January 10, 1863, the Metropolitan Railway opened between Paddington and Farringdon using condensing steam locomotives in cut-and-cover brick tunnels—carrying 38,000 passengers on its very first day and giving the world the word "Metro".'
    },
    {
      id: 'tour-london-1890-first-tube',
      stopNumber: 2,
      title: '1890: The First Deep Electric "Tube" Beneath the Thames',
      historicalDate: 'December 18, 1890',
      timelineYear: 1890,
      locationName: 'Bank / King William Street & London Bridge',
      arrondissement: 'City of London',
      lat: 51.5085,
      lon: -0.0865,
      radiusScale: 1.7,
      monumentId: 'monument-tower-bridge',
      stationId: 'monument-bank',
      interviewQuestion: 'What two breakthroughs made the 1890 City & South London Railway the blueprint for modern deep subways?',
      fact: 'Engineer James Henry Greathead’s cylindrical cast-iron tunneling shield and clean electric locomotives allowed the City & South London Railway (now the Northern Line) to bore deep beneath the River Thames in 1890 without disturbing surface streets.'
    },
    {
      id: 'tour-london-westminster-big-ben',
      stopNumber: 3,
      title: 'Big Ben, the Palace of Westminster & the 1999 Mega-Caisson',
      historicalDate: '1859 • 1868 • Dec 22, 1999',
      timelineYear: 1999,
      locationName: 'Palace of Westminster & Elizabeth Tower',
      arrondissement: 'Westminster',
      lat: 51.5007,
      lon: -0.1246,
      radiusScale: 1.85,
      monumentId: 'monument-big-ben-parliament',
      stationId: 'westminster',
      interviewQuestion: 'How did engineers excavate the 39-meter-deep Jubilee Line station in 1999 without tilting Big Ben right above it?',
      fact: 'To build Michael Hopkins’s subterranean Westminster station just 34 meters from Big Ben’s foundations, engineers injected компьютер-controlled compensation grouting beneath the clock tower after every single millimeter of excavation.'
    },
    {
      id: 'tour-london-st-pauls-wren',
      stopNumber: 4,
      title: "Sir Christopher Wren's St Paul's & the 1900 Twopenny Tube",
      historicalDate: '1666 • 1710 • July 30, 1900',
      timelineYear: 1900,
      locationName: "St Paul's Cathedral (Ludgate Hill)",
      arrondissement: 'City of London',
      lat: 51.5138,
      lon: -0.0984,
      radiusScale: 1.75,
      monumentId: 'monument-st-pauls-cathedral',
      stationId: 'st-pauls',
      interviewQuestion: 'Why are the Eastbound and Westbound Central Line tunnels at St. Paul’s station stacked vertically one atop the other?',
      fact: 'When boring the Central London Railway ("Twopenny Tube") in 1900, engineers stacked the two cast-iron running tunnels vertically beneath narrow Newgate Street so they would not pass beneath or endanger the foundations of Sir Christopher Wren’s 1710 dome.'
    },
    {
      id: 'tour-london-buckingham-royal-mall',
      stopNumber: 5,
      title: 'Buckingham Palace, Queen Victoria & the Victoria Line',
      historicalDate: '1837 • 1913 • March 7, 1969',
      timelineYear: 1969,
      locationName: 'Buckingham Palace & Green Park',
      arrondissement: 'St James’s / Westminster',
      lat: 51.5014,
      lon: -0.1419,
      radiusScale: 1.75,
      monumentId: 'monument-buckingham-palace',
      stationId: 'green-park',
      interviewQuestion: 'Which monarch became the first reigning British sovereign to ride the London Underground in 1969?',
      fact: 'On March 7, 1969, Queen Elizabeth II rode in the driver’s cab of an automated Victoria Line train from Green Park (adjacent to Buckingham Palace) to Oxford Circus and bought a sixpenny ticket.'
    },
    {
      id: 'tour-london-st-pancras-eurostar',
      stopNumber: 6,
      title: 'St Pancras Gothic Cathedral of Steam & High-Speed Eurostar',
      historicalDate: '1868 • Nov 14, 2007',
      timelineYear: 2007,
      locationName: 'St Pancras International & King’s Cross',
      arrondissement: 'Camden',
      lat: 51.5315,
      lon: -0.1261,
      radiusScale: 1.8,
      monumentId: 'monument-st-pancras',
      stationId: 'kings-cross-st-pancras',
      interviewQuestion: 'What record did William Henry Barlow’s 1868 St Pancras train shed hold, and how was it saved in the 1960s?',
      fact: 'Spanning 73 meters without a single interior column, Barlow’s wrought-iron arch was the largest enclosed space in the world in 1868; rescued from demolition by poet Sir John Betjeman in 1967, it was reborn in 2007 as the London terminus for Eurostar trains to Paris.'
    }
  ],
  uiTheme: {
    culturalMovement: 'Royal British Heritage, Sovereign Crimson & Gold, and Edwardian Underground',
    hudTitle: 'LONDON UNDERGROUND • 1863–2026',
    hudSubtitle: 'ROYAL WESTMINSTER, THE SQUARE MILE & THE TUBE • 3D ARCHITECTURE & TRANSIT',
    networkTitle: 'LONDON UNDERGROUND, ELIZABETH LINE & TERMINI',
    districtsTabLabel: 'Royal Boroughs',
    tourTabLabel: 'Royal & Tube Tour',
    tourPanelTitle: 'ROYAL HERITAGE & UNDERGROUND PIONEERS TOUR',
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap',
    palette: {
      bgObsidian: '#080a14',
      bgPanel: 'rgba(12, 14, 28, 0.88)',
      bgPanelElevated: 'rgba(20, 22, 42, 0.94)',
      primaryBright: '#f2ce68',
      primaryMain: '#d4af37',
      primaryMuted: '#997a22',
      borderSubtle: 'rgba(212, 175, 55, 0.40)',
      borderStrong: 'rgba(200, 16, 46, 0.85)',
      accentGlow: 'rgba(200, 16, 46, 0.25)',
      textPrimary: '#f7f3eb',
      textDim: '#c4bcad',
      textSubtle: '#877f70',
      secondaryAccent: '#0019a8',
      alertAccent: '#c8102e',
      worldGroundBase: '#ded8cc',
      worldWaterTint: '#1f4e5f',
      worldWallBase: '#e4ddd0',
      worldRoofBase: '#4a4e58'
    },
    fonts: {
      display: "'Cinzel', 'Cormorant Garamond', Georgia, serif",
      serif: "'Cormorant Garamond', Georgia, serif",
      sans: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      mono: "'JetBrains Mono', monospace"
    },
    svgOrnamentPaths: [
      'M16 4 A12 12 0 1 0 16 28 A12 12 0 1 0 16 4 M1 16 L31 16',
      'M6 6 L26 6 L26 26 L6 26 Z'
    ]
  }
};
