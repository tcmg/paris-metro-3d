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

export const WARSAW_PRESET = {
  cityId: 'warsaw',
  cityName: 'Warsaw',
  localName: 'Warszawa',
  countryName: 'Poland',
  region: 'Mazovia (Mazowsze)',
  tagline: 'METRO WARSZAWSKIE, VISTULA ESCARPMENT & PHOENIX SKYLINE • 3D ARCHITECTURE & TRANSIT',
  metroSystemName: 'Metro Warszawskie, SKM Kolej Średnicowa & Tramwaje Warszawskie (WTP)',
  timelineRange: [1864, 2026],
  geo: {
    centerLat: 52.2319,
    centerLon: 21.0067,
    bbox: [52.185, 20.945, 52.275, 21.065],
    kmPerDegLat: 111.27,
    kmPerDegLon: 68.18,
    worldUnitsPerKm: 11.2,
    coreRadiusKm: 7.4,
    isCoastal: false,
    defaultElevationMeters: 16
  },
  topography: [
    // Warsaw Escarpment (Skarpa Warszawska) along Old Town, Powiśle & Royal Castle
    {
      name: 'Skarpa Warszawska (Old Town & Royal Castle Bluff)',
      lat: 52.2475,
      lon: 21.0135,
      height: 0.72,
      rx: 6.5,
      rz: 12.0,
      ridgeAzimuthDeg: -22,
      ridgeElongation: 2.3
    },
    // Southern Escarpment (Ujazdów, Sejm, Belweder & Łazienki Crest)
    {
      name: 'Skarpa Ujazdowska & Belweder Ridge',
      lat: 52.2165,
      lon: 21.0245,
      height: 0.68,
      rx: 6.2,
      rz: 11.5,
      ridgeAzimuthDeg: -18,
      ridgeElongation: 2.1
    },
    // Śródmieście / Wola Central Plateau
    {
      name: 'Śródmieście & Wola Plateau',
      lat: 52.2320,
      lon: 20.9960,
      height: 0.52,
      rx: 12.0,
      rz: 12.0
    },
    // Kopiec Powstania Warszawskiego (Warsaw Uprising Mound)
    {
      name: 'Kopiec Powstania Warszawskiego',
      lat: 52.2118,
      lon: 21.0575,
      height: 0.58,
      rx: 3.8,
      rz: 3.8
    }
  ],
  waterCenterlines: [
    // Vistula River (Wisła) flowing south-to-north between Śródmieście/Powiśle and Praga
    [52.1850, 21.0620, 4.4],
    [52.2050, 21.0540, 4.2],
    [52.2220, 21.0445, 4.0],
    [52.2360, 21.0365, 3.8],
    [52.2485, 21.0225, 3.9],
    [52.2620, 21.0055, 4.2],
    [52.2750, 20.9910, 4.5]
  ],
  bridges: [
    {
      id: 'bridge-swietokrzyski',
      name: 'Most Świętokrzyski (Cable-Stayed Pylon Bridge)',
      lat: 52.2402,
      lon: 21.0338,
      builtYear: 2000,
      lengthWorld: 4.8,
      widthWorld: 0.58,
      rotationY: 0.52,
      style: 'cable-stayed'
    },
    {
      id: 'bridge-poniatowskiego',
      name: 'Most Poniatowskiego (Neo-Renaissance Viaduct & Steel Arch)',
      lat: 52.2352,
      lon: 21.0398,
      builtYear: 1914,
      lengthWorld: 5.4,
      widthWorld: 0.62,
      rotationY: 0.48,
      style: 'stone-arch'
    },
    {
      id: 'bridge-slasko-dabrowski',
      name: 'Most Śląsko-Dąbrowski (Trasa W–Z Old Town Bridge)',
      lat: 52.2492,
      lon: 21.0218,
      builtYear: 1949,
      lengthWorld: 4.7,
      widthWorld: 0.56,
      rotationY: 0.56,
      style: 'iron-arch'
    },
    {
      id: 'bridge-lazienkowski',
      name: 'Most Łazienkowski',
      lat: 52.2238,
      lon: 21.0442,
      builtYear: 1974,
      lengthWorld: 5.0,
      widthWorld: 0.60,
      rotationY: 0.44,
      style: 'viaduct'
    }
  ],
  parks: [
    {
      name: 'Łazienki Królewskie (Royal Baths Park)',
      lat: 52.2152,
      lon: 21.0355,
      rx: 8.5,
      rz: 7.8,
      rotation: 0.12,
      hasBasin: true
    },
    {
      name: 'Ogród Saski (Saxon Garden — 1727)',
      lat: 52.2405,
      lon: 21.0085,
      rx: 5.2,
      rz: 4.4,
      rotation: -0.25,
      hasBasin: true
    },
    {
      name: 'Ogród Krasińskich',
      lat: 52.2485,
      lon: 21.0018,
      rx: 4.0,
      rz: 3.8,
      rotation: 0.0,
      hasBasin: true
    },
    {
      name: 'Pole Mokotowskie',
      lat: 52.2115,
      lon: 20.9965,
      rx: 8.8,
      rz: 6.2,
      rotation: 0.35,
      hasBasin: true
    },
    {
      name: 'Park Skaryszewski im. Ignacego Jana Paderewskiego (Praga)',
      lat: 52.2425,
      lon: 21.0555,
      rx: 6.8,
      rz: 5.6,
      rotation: 0.0,
      hasBasin: true
    }
  ],
  places: [
    {
      name: 'Plac Zamkowy (Castle Square)',
      lat: 52.2477,
      lon: 21.0138,
      radius: 2.6,
      hasColumnOrObelisk: true
    },
    {
      name: 'Plac Defilad (Parade Square)',
      lat: 52.2322,
      lon: 21.0082,
      radius: 3.2
    },
    {
      name: 'Plac Piłsudskiego (Tomb of the Unknown Soldier)',
      lat: 52.2415,
      lon: 21.0128,
      radius: 2.8
    },
    {
      name: 'Rondo Dmowskiego / Centrum',
      lat: 52.2302,
      lon: 21.0118,
      radius: 2.5
    },
    {
      name: 'Rondo Daszyńskiego (Wola Skyscraper Hub)',
      lat: 52.2302,
      lon: 20.9842,
      radius: 2.6
    }
  ],
  monuments: [
    {
      id: 'monument-palace-culture',
      nodeName: 'Monument_palace_culture',
      name: 'Palace of Culture and Science (Pałac Kultury i Nauki)',
      localName: 'Pałac Kultury i Nauki (PKiN)',
      lat: 52.2318,
      lon: 21.0060,
      builtYear: 1955,
      constructionStartYear: 1952,
      radius: 4.8,
      heightMeters: 237,
      era: 'modern',
      eraLabel: 'Socialist Classicism & Polish Renaissance • 1955',
      connectedLines: ['M1', 'M2', 'S1', 'WKD', 'T9'],
      style: 'Stepped Limestone Tower, Renaissance Attics & Millennium Clock (Lev Rudnev, 237m)',
      arrondissement: 'Śródmieście (Plac Defilad)',
      rotationY: 0.25,
      scale: 0.90,
      archetype: 'empire_state_tower',
      primaryColor: '#e6dcc8',
      secondaryColor: '#c2b49a',
      accentColor: '#f4b942',
      description:
        'Completed in July 1955 at 237 meters with over 3,200 rooms, Congress Hall, theaters, and Renaissance-inspired attics modeled after Kraków and Zamość, PKiN anchors the M1/M2 Świętokrzyska and Centrum metro crossroads.'
    },
    {
      id: 'monument-royal-castle',
      nodeName: 'Monument_royal_castle',
      name: 'Royal Castle & Sigismund’s Column (Zamek Królewski)',
      localName: 'Zamek Królewski w Warszawie i Kolumna Zygmunta',
      lat: 52.2477,
      lon: 21.0147,
      builtYear: 1619,
      radius: 4.4,
      heightMeters: 60,
      era: 'medieval',
      eraLabel: 'Vasa Baroque & UNESCO Reconstruction • 1619 / 1984',
      connectedLines: ['M1', 'M2', 'T26'],
      style: 'Early Baroque Royal Residence, Zygmuntowska Clock Tower & 1644 Bronze Column',
      arrondissement: 'Stare Miasto (Śródmieście)',
      rotationY: -0.35,
      scale: 0.86,
      archetype: 'grand_palace_facade',
      primaryColor: '#c95b42',
      secondaryColor: '#48967a',
      accentColor: '#f4b942',
      description:
        'Seat of Polish monarchs and the 1791 May 3rd Constitution—the first modern constitution in Europe. Dynamited in 1944 and painstakingly rebuilt by citizens between 1971 and 1984 above the 1949 Trasa W–Z tramway tunnel.'
    },
    {
      id: 'monument-lazienki-palace',
      nodeName: 'Monument_lazienki_palace',
      name: 'Palace on the Isle in Łazienki Park (Pałac na Wyspie)',
      localName: 'Pałac na Wyspie — Łazienki Królewskie',
      lat: 52.2152,
      lon: 21.0355,
      builtYear: 1795,
      radius: 4.0,
      heightMeters: 28,
      era: 'medieval',
      eraLabel: 'Stanisławowski Neoclassicism • 1795',
      connectedLines: ['M1'],
      style: 'Neoclassical Island Summer Palace, Corinthian Portico & Water Colonnades (Domenico Merlini, 1795)',
      arrondissement: 'Śródmieście Południowe / Ujazdów',
      rotationY: 0.15,
      scale: 0.85,
      archetype: 'beaux_arts_opera',
      primaryColor: '#faf6ee',
      secondaryColor: '#5c9ead',
      accentColor: '#f4b942',
      description:
        'Transformed between 1772 and 1795 for King Stanisław August Poniatowski into a Neoclassical villa afloat on an artificial island in the Royal Baths Park, hosting the famous Thursday Dinners of the Polish Enlightenment.'
    },
    {
      id: 'monument-warszawa-centralna',
      nodeName: 'Monument_warszawa_centralna',
      name: 'Warszawa Centralna & Varso Tower (310m EU Tallest)',
      localName: 'Dworzec Centralny i Varso Tower',
      lat: 52.2288,
      lon: 21.0032,
      builtYear: 1975,
      radius: 4.6,
      heightMeters: 310,
      era: 'gares',
      eraLabel: '1975 Modernist Wing Roof & 2022 310m EU Supertall',
      connectedLines: ['M1', 'M2', 'S1', 'WKD', 'T9'],
      style: 'Cantilevered Steel-Glass Station Hall (Arseniusz Romanowicz, 1975) & 310m Varso Tower (Foster + Partners, 2022)',
      arrondissement: 'Śródmieście / Mirów',
      rotationY: 0.25,
      scale: 0.88,
      archetype: 'one_wtc_and_oculus',
      primaryColor: '#f2f6fa',
      secondaryColor: '#3b82f6',
      accentColor: '#f4b942',
      description:
        'Pairing Arseniusz Romanowicz’s bold 1975 winged modernist railway terminal above the Cross-City Line with Foster + Partners’ 310-meter Varso Tower (2022)—the tallest skyscraper in the European Union.'
    },
    {
      id: 'monument-stadion-narodowy',
      nodeName: 'Monument_stadion_narodowy',
      name: 'PGE Narodowy National Stadium (Stadion Narodowy)',
      localName: 'PGE Narodowy',
      lat: 52.2395,
      lon: 21.0458,
      builtYear: 2012,
      radius: 4.8,
      heightMeters: 114,
      era: 'modern',
      eraLabel: 'Red-and-White Crown & Cable Spire • 2012',
      connectedLines: ['M2', 'M3', 'S1', 'T9'],
      style: 'Woven Polish-Flag Facade, Radial Cable-Net Roof & 114m Suspended Spire (JSK Architekci, 2012)',
      arrondissement: 'Praga-Południe (Kamionek)',
      rotationY: 0.0,
      scale: 0.85,
      archetype: 'stadium_bowl',
      primaryColor: '#f8fafc',
      secondaryColor: '#dc143c',
      accentColor: '#f4b942',
      description:
        'Built inside the earthen bowl of the 1955 10th-Anniversary Stadium for UEFA Euro 2012, its undulating red-and-white aluminum mesh facade waves like the Polish national flag above the M2/M3 Stadion Narodowy interchange.'
    },
    {
      id: 'monument-stare-miasto-siren',
      nodeName: 'Monument_stare_miasto_siren',
      name: 'Old Town Market Square & Warsaw Mermaid (Rynek i Syrenka)',
      localName: 'Rynek Starego Miasta i Pomnik Syrenki',
      lat: 52.2497,
      lon: 21.0122,
      builtYear: 1855,
      radius: 4.0,
      heightMeters: 26,
      era: 'medieval',
      eraLabel: 'Sgraffito Tenements & 1855 Bronze Syrenka • UNESCO',
      connectedLines: ['M1', 'M2', 'T26'],
      style: 'Polychrome Renaissance Burgher Tenements & Konstanty Hegel’s Armed Bronze Mermaid (1855)',
      arrondissement: 'Stare Miasto (Śródmieście)',
      rotationY: -0.25,
      scale: 0.84,
      archetype: 'grand_palace_facade',
      primaryColor: '#d97736',
      secondaryColor: '#48967a',
      accentColor: '#f4b942',
      description:
        'Founded at the turn of the 14th century and reconstructed stone-by-stone after WWII using Bernardo Bellotto (Canaletto) paintings, centered on Konstanty Hegel’s 1855 bronze Syrenka raising her sword and shield.'
    },
    {
      id: 'monument-wilanow-palace',
      nodeName: 'Monument_wilanow_palace',
      name: 'Wilanów Palace — The Polish Versailles (Pałac w Wilanowie)',
      localName: 'Pałac Króla Jana III w Wilanowie',
      lat: 52.1925,
      lon: 21.0485,
      builtYear: 1696,
      radius: 4.2,
      heightMeters: 32,
      era: 'medieval',
      eraLabel: 'Sarmatian Royal Baroque • 1696',
      connectedLines: ['M1'],
      style: 'Baroque Cour d’Honneur, Twin Copper-Helmeted Towers & Gilded Sundials (Augustyn Locci, 1696)',
      arrondissement: 'Wilanów / Mokotów',
      rotationY: -0.45,
      scale: 0.84,
      archetype: 'grand_palace_facade',
      primaryColor: '#f4c430',
      secondaryColor: '#faf6ee',
      accentColor: '#48967a',
      description:
        'Built between 1677 and 1696 for King Jan III Sobieski after the Relief of Vienna, Wilanów blends Italian villa rustica, French Baroque palatial wings, and Polish Sarmatian courtly reliefs that survived WWII intact.'
    },
    {
      id: 'monument-polin-uprising',
      nodeName: 'Monument_polin_uprising',
      name: 'POLIN Museum & Ghetto Heroes Monument (Muranów)',
      localName: 'Muzeum POLIN i Pomnik Bohaterów Getta',
      lat: 52.2494,
      lon: 20.9930,
      builtYear: 2013,
      radius: 4.2,
      heightMeters: 34,
      era: 'modern',
      eraLabel: '1948 Rapoport Memorial & 2013 Mahlamäki Glass Canyon',
      connectedLines: ['M1', 'T26'],
      style: 'Luminous Glass Cube with Curving Shotcrete Canyon (Rainer Mahlamäki, 2013) & Bronze Memorial (1948)',
      arrondissement: 'Muranów (Śródmieście)',
      rotationY: 0.15,
      scale: 0.85,
      archetype: 'art_deco_slab',
      primaryColor: '#68b0ab',
      secondaryColor: '#c87d55',
      accentColor: '#f4b942',
      description:
        'Standing face-to-face on Willy Brandt Square in Muranów: Nathan Rapoport’s 1948 Monument to the Ghetto Heroes and Rainer Mahlamäki’s 2013 POLIN Museum, whose luminous glass facade is cleaved by a sculptural canyon.'
    }
  ],
  milestones: [
    {
      year: 1864,
      shortLabel: '1864',
      headline: 'Nov 22, 1864: Opening of the Kierbedź Iron Lattice Bridge—Warsaw’s first permanent steel bridge across the Vistula'
    },
    {
      year: 1908,
      shortLabel: '1908',
      headline: 'March 26, 1908: Inauguration of Warsaw’s first electric tramway line from Plac Krasińskich to Plac Unii Lubelskiej'
    },
    {
      year: 1925,
      shortLabel: '1925',
      headline: 'Sept 22, 1925: Warsaw Municipal Tramways passes the first resolution to design an underground Metro network'
    },
    {
      year: 1933,
      shortLabel: '1933',
      headline: 'Sept 2, 1933: Opening of the electrified Cross-City Tunnel (Kolej Średnicowa) beneath Aleje Jerozolimskie'
    },
    {
      year: 1949,
      shortLabel: '1949',
      headline: 'July 22, 1949: Inauguration of the East–West Route (Trasa W–Z) and the Old Town tunnel beneath Castle Square'
    },
    {
      year: 1955,
      shortLabel: '1955',
      headline: 'July 21, 1955: Completion of the 237m Palace of Culture and Science on Plac Defilad'
    },
    {
      year: 1975,
      shortLabel: '1975',
      headline: 'Dec 5, 1975: Opening of Arseniusz Romanowicz’s modernist Warszawa Centralna railway station'
    },
    {
      year: 1995,
      shortLabel: '1995',
      headline: 'April 7, 1995: Inauguration of Warsaw Metro Line M1 (Kabaty ↔ Politechnika)—fulfilling a 70-year dream'
    },
    {
      year: 2015,
      shortLabel: '2015',
      headline: 'March 8, 2015: Opening of Metro Line M2 (Rondo Daszyńskiego ↔ Dworzec Wileński) beneath the Vistula River'
    },
    {
      year: 2026,
      shortLabel: '2026',
      headline: '2026: Complete M1 & M2 network to Bemowo/Bródno, Line M3 Praga branch & 310m Varso supertall skyline'
    }
  ],
  eras: [
    {
      startYear: 1864,
      endYear: 1918,
      eraTag: 'VISTULA BRIDGES & ELECTRIC TRAMS • 1864–1918',
      title: 'Kierbedź Iron Bridge, Poniatowski Viaduct & the 1908 Electric Tramway',
      description:
        'Following the 1864 Kierbedź iron truss bridge and the 1908 electrification of Warsaw’s streetcars, the monumental 1914 Poniatowski Viaduct linked Aleje Jerozolimskie across the Vistula to Praga.',
      urbanChanges: [
        'Opening of the Kierbedź Iron Bridge across the Vistula (1864)',
        'Electrification of Warsaw’s tramway network (March 26, 1908)',
        'Inauguration of the Neo-Renaissance Poniatowski Bridge & Viaduct (1914)'
      ]
    },
    {
      startYear: 1919,
      endYear: 1944,
      eraTag: 'SECOND REPUBLIC MODERNISM • 1919–1944',
      title: '1925 Metro Blueprints, WKD Light Rail & the 1933 Cross-City Tunnel',
      description:
        'Restored as the capital of independent Poland, Warsaw pioneered electric suburban light rail (EKD/WKD, 1927), bored the 1933 Cross-City railway tunnel beneath downtown, and drafted the 1925–1938 Metro masterplan before WWII.',
      urbanChanges: [
        'First Warsaw Metro resolution and geological test borings (1925–1938)',
        'Opening of Poland’s first electric commuter railway EKD/WKD (1927)',
        'Electrified Kolej Średnicowa tunnel & bridge through central Warsaw (1933)'
      ]
    },
    {
      startYear: 1945,
      endYear: 1994,
      eraTag: 'PHOENIX CITY RECONSTRUCTION • 1945–1994',
      title: 'UNESCO Old Town Rebirth, Trasa W–Z, PKiN & Deep Metro Construction',
      description:
        'Rising from 85% wartime destruction, Warsaw meticulously rebuilt its Old Town and Royal Castle using Canaletto’s 18th-century canvases, erected the 237m Palace of Culture (1955) and Warszawa Centralna (1975), and began excavating Line M1 in 1983.',
      urbanChanges: [
        'Trasa W–Z tunnel under Castle Square (1949) & UNESCO Old Town reconstruction (1953)',
        'Palace of Culture and Science (1955), Warszawa Centralna (1975) & Royal Castle rebirth (1984)',
        'Groundbreaking of Metro Line M1 in Ursynów (April 15, 1983)'
      ]
    },
    {
      startYear: 1995,
      endYear: 2026,
      eraTag: 'METRO WARSZAWSKIE & EUROPEAN SKYLINE • 1995–2026',
      title: 'Lines M1, M2 & M3, Wojciech Fangor Mosaics & the 310m Varso Tower',
      description:
        'Line M1 opened on April 7, 1995 and reached Młociny in 2008. In 2015, Line M2 bored beneath the Vistula with vibrant station typography by Wojciech Fangor, while Wola and Śródmieście rose into one of Europe’s tallest skyscraper clusters.',
      urbanChanges: [
        'Inauguration of Metro Line M1 (1995–2008) with Plac Wilsona’s award-winning dome',
        'PGE Narodowy Stadium (2012), POLIN Museum (2013) & Line M2 under the Vistula (2015–2026)',
        'Completion of the 310m Varso Tower (2022) & Line M3 Praga extension (2026)'
      ]
    }
  ],
  metroLines: [
    {
      id: 'M1',
      name: 'Linia M1 — Kabaty ↔ Młociny',
      shortLabel: 'M1',
      color: '#005CA9',
      textColor: '#ffffff',
      openedYear: 1995,
      depthOffset: -2.2,
      historicCompany: 'Metro Warszawskie (1995)',
      summary:
        'Warsaw’s inaugural north-south underground spine from Ursynów and Mokotów through Śródmieście and Old Town to Żoliborz and Bielany.',
      stations: [
        {
          id: 'wierzbno',
          name: 'Wierzbno',
          lat: 52.1986,
          lon: 21.0167,
          openedYear: 1995,
          arrondissement: 'Mokotów',
          architecture: 'Inaugural 1995 Blue-and-Silver Barrel Vault',
          description: 'Part of the historic first 11-station section of Line M1 opened on April 7, 1995.'
        },
        {
          id: 'pole-mokotowskie',
          name: 'Pole Mokotowskie',
          lat: 52.2089,
          lon: 21.0078,
          openedYear: 1995,
          arrondissement: 'Mokotów',
          architecture: 'Parkside Box Concourse',
          description: 'Serves the Warsaw School of Economics (SGH) and Pole Mokotowskie parklands.'
        },
        {
          id: 'politechnika',
          name: 'Politechnika',
          lat: 52.2175,
          lon: 21.0145,
          openedYear: 1995,
          arrondissement: 'Śródmieście Południowe',
          architecture: '1995 Northern Terminus Columnar Hall',
          landmark: 'Palace on the Isle in Łazienki Park (Pałac na Wyspie)',
          description: 'Served as the northern terminus of Line M1 on opening day in April 1995, adjacent to Warsaw University of Technology.'
        },
        {
          id: 'plac-konstytucji-ghost',
          name: 'Plac Konstytucji (Unbuilt 1989 Reserve)',
          lat: 52.2225,
          lon: 21.0158,
          openedYear: 1989,
          closedYear: 1989,
          isGhostStation: true,
          arrondissement: 'Śródmieście',
          architecture: 'Parallel Tunnel Widening & Structural Provision (Ghost Station)',
          description: 'Omitted from the 1989 construction budget for cost reasons; the running tunnels widen beneath Marszałkowska Street for its delayed build-out.'
        },
        {
          id: 'centrum',
          name: 'Centrum',
          lat: 52.2304,
          lon: 21.0108,
          openedYear: 1998,
          arrondissement: 'Śródmieście',
          architecture: 'Two-Level Sub-Rotunda Concourse ("Patelnia")',
          landmark: 'Palace of Culture and Science (Pałac Kultury i Nauki)',
          description: 'Warsaw’s busiest metro station beneath Rondo Dmowskiego, framing the Palace of Culture and Science and connecting to Warszawa Śródmieście / Centralna.'
        },
        {
          id: 'swietokrzyska',
          name: 'Świętokrzyska',
          lat: 52.2352,
          lon: 21.0082,
          openedYear: 2001,
          arrondissement: 'Śródmieście',
          architecture: 'Central M1 / M2 Cross-Level Interchange Hub',
          description: 'The sole direct transfer hub between Metro Lines M1 and M2 at the intersection of Marszałkowska and Świętokrzyska streets.'
        },
        {
          id: 'ratusz-arsenal',
          name: 'Ratusz Arsenał',
          lat: 52.2448,
          lon: 21.0012,
          openedYear: 2001,
          arrondissement: 'Śródmieście / Muranów',
          architecture: 'Fluted Silver Columns & Royal Arsenal Gateway',
          landmark: 'Royal Castle & Sigismund’s Column (Zamek Królewski)',
          description: 'Gateway to Plac Bankowy, the Saxon Garden, the Royal Arsenal, and the Old Town.'
        },
        {
          id: 'muranow-ghost',
          name: 'Muranów (Unbuilt 1989 Reserve)',
          lat: 52.2508,
          lon: 20.9985,
          openedYear: 1989,
          closedYear: 1989,
          isGhostStation: true,
          arrondissement: 'Muranów',
          architecture: 'Sub-Andersa Tunnel Provision (Ghost Station)',
          landmark: 'POLIN Museum & Ghetto Heroes Monument (Muranów)',
          description: 'Like Plac Konstytucji, Muranów was deferred in 1989 between Ratusz Arsenał and Dworzec Gdański right beside the POLIN Museum.'
        },
        {
          id: 'dworzec-gdanski',
          name: 'Dworzec Gdański',
          lat: 52.2582,
          lon: 20.9945,
          openedYear: 2003,
          arrondissement: 'Żoliborz / Muranów',
          architecture: 'Glazed Arch Hall & Circumferential Rail Hub',
          description: 'Connects Line M1 directly with the northern Warszawa Gdańska mainline and SKM railway station.'
        },
        {
          id: 'plac-wilsona',
          name: 'Plac Wilsona',
          lat: 52.2688,
          lon: 20.9852,
          openedYear: 2005,
          arrondissement: 'Żoliborz',
          architecture: 'Elliptical IlluminatedAcoustic Dome (Andrzej Chołdzyński)',
          description: 'Voted the most beautiful newly built metro station in the world at the 2008 MetroRail Congress for its glowing colour-changing elliptical ceiling.'
        }
      ]
    },
    {
      id: 'M2',
      name: 'Linia M2 — Bemowo ↔ Bródno (Under the Vistula)',
      shortLabel: 'M2',
      color: '#E30613',
      textColor: '#ffffff',
      openedYear: 2015,
      depthOffset: -3.2,
      historicCompany: 'Metro Warszawskie (Wojciech Fangor Art Stations)',
      summary:
        'East-west deep-bored metro line featuring vibrant station op-art calligraphy by Wojciech Fangor and tunneling beneath the Vistula River.',
      stations: [
        {
          id: 'plocka',
          name: 'Płocka',
          lat: 52.2315,
          lon: 20.9665,
          openedYear: 2020,
          arrondissement: 'Wola',
          architecture: 'Copper-Clad Industrial Heritage Concourse',
          description: 'Honors Wola’s 19th-century electronics and metalwork heritage with warm copper ceiling panels.'
        },
        {
          id: 'rondo-daszynskiego',
          name: 'Rondo Daszyńskiego',
          lat: 52.2302,
          lon: 20.9842,
          openedYear: 2015,
          arrondissement: 'Wola',
          architecture: 'Crimson Glass Tulips & Fangor Typography',
          description: 'Western anchor of the 2015 M2 central section at the heart of Warsaw’s high-rise financial district.'
        },
        {
          id: 'rondo-onz',
          name: 'Rondo ONZ',
          lat: 52.2330,
          lon: 20.9982,
          openedYear: 2015,
          arrondissement: 'Wola / Śródmieście',
          architecture: 'Silver-White Fangor Op-Art Wall Panels',
          landmark: 'Warszawa Centralna & Varso Tower (310m EU Tallest)',
          description: 'Serves the Rondo ONZ skyscraper cluster just north of Varso Tower and Złote Tarasy.'
        },
        {
          id: 'swietokrzyska',
          name: 'Świętokrzyska',
          lat: 52.2352,
          lon: 21.0082,
          openedYear: 2015,
          arrondissement: 'Śródmieście',
          architecture: 'Sunburst Yellow Fangor Deep Cavern',
          description: 'Deep M2 platform linked by escalators to the upper M1 station.'
        },
        {
          id: 'nowy-swiat-uniwersytet',
          name: 'Nowy Świat-Uniwersytet',
          lat: 52.2368,
          lon: 21.0172,
          openedYear: 2015,
          arrondissement: 'Śródmieście (Trakt Królewski)',
          architecture: 'Deep Escarpment Cavern in Violet & Titanium',
          description: 'Warsaw’s deepest metro station, bored into the Vistula Escarpment beneath the Royal Route and University of Warsaw.'
        },
        {
          id: 'centrum-nauki-kopernik',
          name: 'Centrum Nauki Kopernik',
          lat: 52.2400,
          lon: 21.0285,
          openedYear: 2015,
          arrondissement: 'Powiśle',
          architecture: 'Riverside Glass Skylight Boxes beneath Wisłostrada',
          description: 'Located right on the west bank of the Vistula beside the Copernicus Science Centre and Świętokrzyski Bridge.'
        },
        {
          id: 'stadion-narodowy',
          name: 'Stadion Narodowy',
          lat: 52.2435,
          lon: 21.0432,
          openedYear: 2015,
          arrondissement: 'Praga-Południe',
          architecture: 'Dual-Island Cross-Platform M2/M3 Transfer Hall',
          landmark: 'PGE Narodowy National Stadium (Stadion Narodowy)',
          description: 'Built with two wide island platforms in emerald green to serve both Line M2 and the branching Line M3.'
        },
        {
          id: 'dworzec-wilenski',
          name: 'Dworzec Wileński',
          lat: 52.2542,
          lon: 21.0355,
          openedYear: 2015,
          arrondissement: 'Praga-Północ',
          architecture: 'Cobalt-Blue Fangor Concourse & Praga Rail Hub',
          description: 'Major right-bank interchange connecting Line M2 with Warszawa Wileńska suburban trains and historic Praga.'
        },
        {
          id: 'szwedzka',
          name: 'Szwedzka',
          lat: 52.2615,
          lon: 21.0448,
          openedYear: 2019,
          arrondissement: 'Praga-Północ',
          architecture: 'Smoked-Brick & Industrial Steel Rib Vault',
          description: 'Evokes 19th-century Praga factory architecture along Strzelecka and Stalowa streets.'
        }
      ]
    },
    {
      id: 'M3',
      name: 'Linia M3 — Stadion Narodowy ↔ Gocław (Praga Branch)',
      shortLabel: 'M3',
      color: '#009640',
      textColor: '#ffffff',
      openedYear: 2026,
      depthOffset: -2.8,
      historicCompany: 'Metro Warszawskie (III Linia)',
      summary:
        'Right-bank metro line branching from the existing second island platform at Stadion Narodowy through Kamionek and Grochów to Gocław.',
      stations: [
        {
          id: 'stadion-narodowy',
          name: 'Stadion Narodowy',
          lat: 52.2435,
          lon: 21.0432,
          openedYear: 2015,
          arrondissement: 'Praga-Południe',
          architecture: 'Pre-Built M2/M3 Cross-Platform Hub',
          description: 'Northern terminus of Line M3 using the outer tracks built in 2015.'
        },
        {
          id: 'dworzec-wschodni',
          name: 'Dworzec Wschodni',
          lat: 52.2512,
          lon: 21.0525,
          openedYear: 2026,
          arrondissement: 'Praga-Południe / Kamionek',
          architecture: 'Underground Intercity Rail Transfer Vault',
          description: 'Links Line M3 directly beneath the long-distance platforms of Warszawa Wschodnia.'
        },
        {
          id: 'minska',
          name: 'Mińska (Soho Factory)',
          lat: 52.2468,
          lon: 21.0598,
          openedYear: 2026,
          arrondissement: 'Kamionek',
          architecture: 'Post-Industrial Brick & Neon Gallery',
          description: 'Serves the Soho Factory creative district and Kamionek.'
        },
        {
          id: 'rondo-wiatraczna',
          name: 'Rondo Wiatraczna',
          lat: 52.2385,
          lon: 21.0635,
          openedYear: 2026,
          arrondissement: 'Grochów',
          architecture: 'Circular Sub-Plaza Concourse',
          description: 'Major Grochów transit hub at the eastern convergence of Aleja Waszyngtona and Grochowska.'
        }
      ]
    },
    {
      id: 'S1',
      name: 'SKM Linia S1 / Kolej Średnicowa (Zachodnia ↔ Wschodnia)',
      shortLabel: 'SKM',
      color: '#F39200',
      textColor: '#ffffff',
      openedYear: 1933,
      depthOffset: -1.4,
      historicCompany: 'PKP / Szybka Kolej Miejska (1933 Cross-City Tunnel)',
      summary:
        'Warsaw’s historic 1933 electrified Cross-City Tunnel (Linia Średnicowa) and Vistula rail bridge linking West, Central, Powiśle, Stadium, and East stations.',
      stations: [
        {
          id: 'warszawa-zachodnia',
          name: 'Warszawa Zachodnia',
          lat: 52.2202,
          lon: 20.9652,
          openedYear: 1933,
          arrondissement: 'Ochota / Wola',
          architecture: 'Canopy Concourse & Underground Passageway',
          description: 'Poland’s busiest railway junction by train movements at the western portal of the Cross-City Line.'
        },
        {
          id: 'warszawa-ochota',
          name: 'Warszawa Ochota',
          lat: 52.2260,
          lon: 20.9905,
          openedYear: 1963,
          arrondissement: 'Ochota',
          architecture: 'Hyperbolic Paraboloid Concrete Shell Roof (Arseniusz Romanowicz, 1963)',
          description: 'Masterpiece of Polish postwar structural expressionism with a thin sweeping saddle-curve concrete shell.'
        },
        {
          id: 'centrum',
          name: 'Warszawa Śródmieście / Centralna',
          lat: 52.2304,
          lon: 21.0108,
          openedYear: 1933,
          arrondissement: 'Śródmieście',
          architecture: '1933 Cross-City Tunnel & 1963 Mosaic Columns',
          landmark: 'Warszawa Centralna & Varso Tower (310m EU Tallest)',
          description: 'Underground commuter and intercity heart of the Cross-City Line linked with Metro Centrum.'
        },
        {
          id: 'warszawa-powisle',
          name: 'Warszawa Powiśle',
          lat: 52.2335,
          lon: 21.0235,
          openedYear: 1963,
          arrondissement: 'Powiśle',
          architecture: 'Winged Concrete Rotunda Pavilion & Viaduct Platforms (Romanowicz & Szymaniak)',
          description: 'Emerges from the Vistula Escarpment tunnel onto the Poniatowski/Średnicowy bridge approach.'
        },
        {
          id: 'stadion-narodowy',
          name: 'Warszawa Stadion',
          lat: 52.2435,
          lon: 21.0432,
          openedYear: 1955,
          elevated: true,
          arrondissement: 'Praga-Południe',
          architecture: 'Elevated Embankment & Euro 2012 Glass Canopy',
          description: 'Direct transfer between SKM Cross-City trains and Metro Lines M2/M3 at PGE Narodowy.'
        },
        {
          id: 'dworzec-wschodni',
          name: 'Warszawa Wschodnia',
          lat: 52.2512,
          lon: 21.0525,
          openedYear: 1933,
          elevated: true,
          arrondissement: 'Praga-Południe',
          architecture: '1969 Modernist Glass Butterfly Hall (Romanowicz & Szymaniak)',
          description: 'Main right-bank railway terminal for eastern intercity and suburban trains.'
        }
      ]
    },
    {
      id: 'WKD',
      name: 'WKD — Warszawska Kolej Dojazdowa (Śródmieście ↔ Reduta Ordona)',
      shortLabel: 'WKD',
      color: '#008B8B',
      textColor: '#ffffff',
      openedYear: 1927,
      depthOffset: -1.1,
      historicCompany: 'Elektryczna Kolej Dojazdowa (EKD, 1927)',
      summary:
        'Inaugurated on December 11, 1927 as Poland’s first electric light railway, running parallel to the western railway trench into downtown.',
      stations: [
        {
          id: 'centrum',
          name: 'Warszawa Śródmieście WKD',
          lat: 52.2304,
          lon: 21.0108,
          openedYear: 1963,
          arrondissement: 'Śródmieście',
          architecture: 'Sub-Trench Terminus beside Warszawa Centralna',
          description: 'Downtown terminus of the historic WKD electric light rail.'
        },
        {
          id: 'warszawa-ochota',
          name: 'Warszawa Ochota WKD',
          lat: 52.2260,
          lon: 20.9905,
          openedYear: 1963,
          arrondissement: 'Ochota',
          architecture: 'Shared Trench Platform at Plac Zawiszy',
          description: 'Shares the iconic hyperbolic paraboloid entrance pavilion at Plac Zawiszy.'
        },
        {
          id: 'warszawa-zachodnia',
          name: 'Warszawa Zachodnia WKD',
          lat: 52.2202,
          lon: 20.9652,
          openedYear: 1927,
          arrondissement: 'Ochota',
          architecture: 'Western Commuter Hub Platform',
          description: 'Connects WKD light rail with the Warszawa Zachodnia mainline hub.'
        },
        {
          id: 'wkd-reduta-ordona',
          name: 'Warszawa Reduta Ordona',
          lat: 52.2145,
          lon: 20.9525,
          openedYear: 1927,
          arrondissement: 'Ochota',
          architecture: 'Garden Suburb Light Rail Stop',
          description: 'Named after the historic 1831 Polish November Uprising redoubt.'
        }
      ]
    },
    {
      id: 'T9',
      name: 'Tramwaj Linia 9 — Aleje Jerozolimskie & Most Poniatowskiego',
      shortLabel: 'T9',
      color: '#FFB800',
      textColor: '#10141c',
      openedYear: 1908,
      depthOffset: -0.2,
      historicCompany: 'Tramwaje Warszawskie (1908)',
      summary:
        'Warsaw’s flagship high-frequency tram corridor gliding down Aleje Jerozolimskie and across the Neo-Renaissance towers of the 1914 Poniatowski Bridge.',
      stations: [
        {
          id: 'warszawa-ochota',
          name: 'Plac Zawiszy',
          lat: 52.2260,
          lon: 20.9905,
          openedYear: 1908,
          elevated: true,
          arrondissement: 'Ochota / Wola',
          architecture: 'Western Jerozolimskie Tram Junction',
          description: 'Gateway to Aleje Jerozolimskie.'
        },
        {
          id: 'centrum',
          name: 'Centrum (Rondo Dmowskiego)',
          lat: 52.2304,
          lon: 21.0108,
          openedYear: 1908,
          elevated: true,
          arrondissement: 'Śródmieście',
          architecture: 'Grand Boulevard Island Tram Stop',
          description: 'Crossroads of Warsaw’s north-south and east-west tramway trunks.'
        },
        {
          id: 't9-muzeum-narodowe',
          name: 'Muzeum Narodowe (Rondo de Gaulle’a)',
          lat: 52.2318,
          lon: 21.0205,
          openedYear: 1914,
          elevated: true,
          arrondissement: 'Śródmieście',
          architecture: 'National Museum & Palm Tree Roundabout Stop',
          description: 'Located at the intersection of Nowy Świat and Aleje Jerozolimskie before the Poniatowski Viaduct.'
        },
        {
          id: 't9-most-poniatowskiego',
          name: 'Most Poniatowskiego Viaduct',
          lat: 52.2352,
          lon: 21.0398,
          openedYear: 1914,
          elevated: true,
          arrondissement: 'Powiśle / Wisła',
          architecture: '1914 Neo-Renaissance Stone Tower & Steel Arch Bridge',
          description: 'Crosses high above Powiśle and the Vistula River between Neo-Renaissance turret pavilions.'
        },
        {
          id: 'rondo-wiatraczna',
          name: 'Rondo Wiatraczna (Grochów)',
          lat: 52.2385,
          lon: 21.0635,
          openedYear: 1925,
          elevated: true,
          arrondissement: 'Praga-Południe',
          architecture: 'Aleja Waszyngtona Tree-Lined Tramway Loop',
          description: 'Eastern Praga hub after traversing Aleja Waszyngtona alongside Skaryszewski Park.'
        }
      ]
    },
    {
      id: 'T26',
      name: 'Tramwaj Linia 26 — Trasa W–Z & Stare Miasto Tunnel',
      shortLabel: 'T26',
      color: '#8E24AA',
      textColor: '#ffffff',
      openedYear: 1949,
      depthOffset: -0.4,
      historicCompany: 'Tramwaje Warszawskie (1949 Trasa W–Z)',
      summary:
        'Historic postwar East–West Route (Trasa W–Z) diving through the 1949 tunnel directly beneath Castle Square and the Royal Castle before crossing the Vistula to Praga.',
      stations: [
        {
          id: 'plocka',
          name: 'Młynów / Wolska',
          lat: 52.2315,
          lon: 20.9665,
          openedYear: 1949,
          elevated: true,
          arrondissement: 'Wola',
          architecture: 'Wolska Avenue Tramway Corridor',
          description: 'Western Wola approach along Aleja Solidarności.'
        },
        {
          id: 'ratusz-arsenal',
          name: 'Metro Ratusz Arsenał (Plac Bankowy)',
          lat: 52.2448,
          lon: 21.0012,
          openedYear: 1949,
          elevated: true,
          arrondissement: 'Śródmieście',
          architecture: 'Trasa W–Z Express Tram-Busway Island',
          description: 'Direct surface transfer to Metro Line M1 at Plac Bankowy.'
        },
        {
          id: 't26-stare-miasto',
          name: 'Stare Miasto (Trasa W–Z Tunnel & Escalators)',
          lat: 52.2472,
          lon: 21.0138,
          openedYear: 1949,
          arrondissement: 'Stare Miasto',
          architecture: '1949 Underground Portal & Historic First Escalator in Poland',
          landmark: 'Royal Castle & Sigismund’s Column (Zamek Królewski)',
          description: 'Emerges from the 1949 tunnel bored directly beneath Castle Square and St. Anne’s Church onto Most Śląsko-Dąbrowski.'
        },
        {
          id: 'dworzec-wilenski',
          name: 'Dworzec Wileński (Praga Cathedral)',
          lat: 52.2542,
          lon: 21.0355,
          openedYear: 1949,
          elevated: true,
          arrondissement: 'Praga-Północ',
          architecture: 'Right-Bank Trasa W–Z Plaza',
          description: 'Connects Trasa W–Z trams with Metro Line M2 and St. Florian’s Cathedral in Praga.'
        }
      ]
    }
  ],
  railTermini: [
    {
      id: 'gl-warszawa-centralna',
      metroStationId: 'centrum',
      monumentId: 'monument-warszawa-centralna',
      name: 'Dworzec Warszawa Centralna (PKP Intercity)',
      shortName: 'CENTRALNA (PKP)',
      historicCompany: 'Polskie Koleje Państwowe (1975 Arseniusz Romanowicz)',
      modernNetwork: 'PKP Intercity EIP Pendolino • Berlin–Warszawa Express • Koleje Mazowieckie',
      openedYear: 1975,
      trainStartYear: 1933,
      trainEndYear: 2026,
      buildingEndYear: 2026,
      arrondissement: 'Śródmieście',
      destinationLabel: 'VERS KRAKÓW • GDAŃSK • BERLIN • PRAHA • WIEN',
      colorHex: '#f4b942',
      lat: 52.2288,
      lon: 21.0032,
      rotationY: 0.25,
      trackCount: 8,
      shedWidth: 2.5,
      shedLength: 3.3,
      shedHeight: 0.92,
      shedSpans: 3,
      hasClockTower: false,
      description:
        'Flagship terminal of Polish State Railways (PKP), featuring Arseniusz Romanowicz’s soaring 1975 cantilevered roof above four underground island platforms serving EIP Pendolino high-speed trains.',
      corridorLatLon: [
        [52.2288, 21.0032],
        [52.2260, 20.9905],
        [52.2202, 20.9652],
        [52.2145, 20.9450]
      ]
    },
    {
      id: 'gl-warszawa-wschodnia',
      metroStationId: 'dworzec-wschodni',
      name: 'Dworzec Warszawa Wschodnia',
      shortName: 'WSCHODNIA',
      historicCompany: 'Kolej Warszawsko-Terespolska (1866) / PKP (1969)',
      modernNetwork: 'PKP Intercity • Koleje Mazowieckie • SKM',
      openedYear: 1866,
      trainStartYear: 1900,
      trainEndYear: 2026,
      buildingEndYear: 2026,
      arrondissement: 'Praga-Południe',
      destinationLabel: 'VERS LUBLIN • BIAŁYSTOK • WILNO • KIJÓW',
      colorHex: '#e30613',
      lat: 52.2512,
      lon: 21.0525,
      rotationY: 0.55,
      trackCount: 7,
      shedWidth: 2.2,
      shedLength: 2.9,
      shedHeight: 0.85,
      shedSpans: 2,
      description:
        'Opened in 1866 as the Terespol Railway Terminus and rebuilt in 1969 by Arseniusz Romanowicz and Piotr Szymaniak with a modernist butterfly roof, serving all trains east of the Vistula.',
      corridorLatLon: [
        [52.2512, 21.0525],
        [52.2565, 21.0620],
        [52.2630, 21.0650]
      ]
    }
  ],
  districts: [
    {
      id: 'dist-srodmiescie-stare-miasto',
      number: 1,
      shortLabel: 'Śródmieście',
      name: '1 — Śródmieście, Stare Miasto & Trakt Królewski',
      officialName: 'Dzielnica Śródmieście m.st. Warszawy',
      quartiers: 'Stare Miasto • Nowe Miasto • Powiśle • Muranów • Ujazdów',
      bank: 'Lewy Brzeg (Vistula Escarpment)',
      filterGroup: 'core',
      eraBadge: 'UNESCO ROYAL ROUTE & PHOENIX HEART',
      foundedLabel: 'DUCHY OF MAZOVIA 1300 • REBUILT 1953',
      lat: 52.2385,
      lon: 21.0115,
      standOffRadius: 30.0,
      cameraHeightOffset: 18.0,
      haloRadiusScale: 2.3,
      metroLines: ['M1', 'M2', 'S1', 'WKD', 'T9', 'T26'],
      history:
        'Stretching along the high Vistula Escarpment from the 14th-century Old Town and Royal Castle down Krakowskie Przedmieście and Nowy Świat to Łazienki Park, Śródmieście embodies Warsaw’s UNESCO-honored resurrection after 1945.',
      notableLandmarks: 'Zamek Królewski, Rynek Starego Miasta, Pałac Kultury i Nauki, Łazienki Królewskie, Muzeum POLIN'
    },
    {
      id: 'dist-wola-mirów',
      number: 2,
      shortLabel: 'Wola',
      name: '2 — Wola Skyscraper District, Mirów & Ochota',
      officialName: 'Dzielnica Wola & Ochota',
      quartiers: 'Rondo Daszyńskiego • Mirów • Czyste • Młynów • Filtry',
      bank: 'Lewy Brzeg (West Plateau)',
      filterGroup: 'riveGauche',
      eraBadge: 'ROYAL ELECTORAL FIELDS TO EU SUPERTALL HUB',
      foundedLabel: 'ROYAL ELECTIONS 1573 • VARSO 2022',
      lat: 52.2302,
      lon: 20.9842,
      standOffRadius: 31.0,
      cameraHeightOffset: 19.0,
      haloRadiusScale: 2.3,
      metroLines: ['M2', 'S1', 'WKD', 'T9', 'T26'],
      history:
        'Once the open fields where Polish nobles elected kings from 1573 to 1764 and later Warsaw’s 19th-century "Red Wola" industrial powerhouse, Wola around Rondo Daszyńskiego and Varso Tower is now one of Europe’s premier skyscraper districts.',
      notableLandmarks: 'Varso Tower (310m), Rondo Daszyńskiego, Warsaw Spire, Fabryka Norblina, Muzeum Powstania Warszawskiego'
    },
    {
      id: 'dist-praga-wisla',
      number: 3,
      shortLabel: 'Praga',
      name: '3 — Praga-Północ, Praga-Południe, Saska Kępa & Kamionek',
      officialName: 'Prawobrzeżna Warszawa (Praga)',
      quartiers: 'Stara Praga • Kamionek • Saska Kępa • Grochów • Bródno',
      bank: 'Prawy Brzeg (East Bank of the Wisła)',
      filterGroup: 'riveDroite',
      eraBadge: 'RIGHT-BANK HERITAGE, STADION NARODOWY & BOHEMIAN PRAGA',
      foundedLabel: 'TOWN CHARTER 1648 • EURO 2012',
      lat: 52.2465,
      lon: 21.0435,
      standOffRadius: 32.0,
      cameraHeightOffset: 18.5,
      haloRadiusScale: 2.4,
      metroLines: ['M2', 'M3', 'S1', 'T9', 'T26'],
      history:
        'Granted its town charter by King Władysław IV Vasa in 1648 across the Vistula, Praga preserved its authentic pre-war red-brick tenements, factories (Koneser, Soho), and tree-lined modernist villas in Saska Kępa, crowned in 2012 by PGE Narodowy.',
      notableLandmarks: 'PGE Narodowy, Dworzec Wileński, Centrum Praskie Koneser, Park Skaryszewski, Saska Kępa'
    },
    {
      id: 'dist-mokotow-wilanow',
      number: 4,
      shortLabel: 'Mokotów',
      name: '4 — Mokotów, Pole Mokotowskie, Ursynów & Wilanów',
      officialName: 'Południowe Pasmo Królewskie (Mokotów & Wilanów)',
      quartiers: 'Stary Mokotów • Wierzbno • Służewiec • Ursynów • Wilanów',
      bank: 'Lewy Brzeg (Southern Escarpment)',
      filterGroup: 'outer1860',
      eraBadge: 'ROYAL SUMMER RESIDENCES & M1 SOUTHERN SPINE',
      foundedLabel: 'WILANÓW 1677 • METRO M1 1995',
      lat: 52.2015,
      lon: 21.0215,
      standOffRadius: 33.0,
      cameraHeightOffset: 19.0,
      haloRadiusScale: 2.4,
      metroLines: ['M1'],
      history:
        'Linked to downtown along the Southern Royal Route and the inaugural 1995 section of Metro Line M1, Mokotów and Wilanów unite pre-war garden villas, Królikarnia Palace, and King Jan III Sobieski’s Baroque masterpiece at Wilanów.',
      notableLandmarks: 'Pałac w Wilanowie, Pole Mokotowskie, Królikarnia, Politechnika Warszawska'
    }
  ],
  tourStops: [
    {
      id: 'tour-waw-royal-castle',
      stopNumber: 1,
      title: 'Plac Zamkowy, Sigismund’s Column & the 1949 Trasa W–Z Tunnel',
      historicalDate: '1644 • July 22, 1949 • 1984',
      timelineYear: 1984,
      locationName: 'Zamek Królewski & Kolumna Zygmunta',
      arrondissement: 'Stare Miasto',
      lat: 52.2477,
      lon: 21.0147,
      radiusScale: 1.7,
      monumentId: 'monument-royal-castle',
      stationId: 't26-stare-miasto',
      interviewQuestion:
        'How did Warsaw rebuild its Royal Castle and Old Town while threading a modern transit artery directly underneath?',
      fact: 'In 1949, engineers bored the Trasa W–Z tramway tunnel directly beneath Castle Square (installing Poland’s first escalator), while citizens rebuilt the Old Town (1953) and Royal Castle (1971–1984) using Canaletto’s 18th-century paintings.'
    },
    {
      id: 'tour-waw-stare-miasto-syrenka',
      stopNumber: 2,
      title: 'Rynek Starego Miasta & the Armed Bronze Mermaid of Warsaw',
      historicalDate: '1300 • 1855 • UNESCO 1980',
      timelineYear: 1953,
      locationName: 'Rynek Starego Miasta',
      arrondissement: 'Stare Miasto',
      lat: 52.2497,
      lon: 21.0122,
      radiusScale: 1.6,
      monumentId: 'monument-stare-miasto-siren',
      stationId: 'ratusz-arsenal',
      interviewQuestion:
        'Why was Warsaw’s Old Town inscribed on the UNESCO World Heritage List in 1980?',
      fact: 'Over 85% of Warsaw’s historic core was razed in 1944; its five-year citizen reconstruction (1948–1953) around Konstanty Hegel’s 1855 bronze Syrenka was recognized by UNESCO as an unprecedented triumph of cultural resilience.'
    },
    {
      id: 'tour-waw-polin-muranow',
      stopNumber: 3,
      title: 'Muranów: POLIN Glass Canyon & the 1948 Ghetto Heroes Monument',
      historicalDate: 'April 19, 1948 • April 19, 2013',
      timelineYear: 2013,
      locationName: 'Muzeum POLIN & Pomnik Bohaterów Getta',
      arrondissement: 'Muranów',
      lat: 52.2494,
      lon: 20.9930,
      radiusScale: 1.65,
      monumentId: 'monument-polin-uprising',
      stationId: 'muranow-ghost',
      interviewQuestion:
        'What architectural dialogue unfolds across Willy Brandt Square in Muranów?',
      fact: 'Where Nathan Rapoport’s dark bronze Monument to the Ghetto Heroes (1948) honors martyrdom and resistance, Rainer Mahlamäki’s luminous 2013 POLIN Museum parts with a curving shotcrete canyon celebrating 1,000 years of Polish-Jewish life.'
    },
    {
      id: 'tour-waw-palace-culture-metro',
      stopNumber: 4,
      title: 'Palace of Culture & Science and the M1/M2 Metro Crossroads',
      historicalDate: 'July 21, 1955 • April 7, 1995 • March 8, 2015',
      timelineYear: 2001,
      locationName: 'Pałac Kultury i Nauki & Stacja Świętokrzyska',
      arrondissement: 'Śródmieście',
      lat: 52.2318,
      lon: 21.0060,
      radiusScale: 1.8,
      monumentId: 'monument-palace-culture',
      stationId: 'swietokrzyska',
      interviewQuestion:
        'How did Polish architects nationalize the design of the 237m Palace of Culture and Science in 1952–1955?',
      fact: 'Before designing PKiN, architect Lev Rudnev toured Kazimierz Dolny, Kraków, and Zamość with Polish historians, crowning the 237m tower’s stepped setbacks with Polish Renaissance attics and masonry details.'
    },
    {
      id: 'tour-waw-centralna-varso',
      stopNumber: 5,
      title: 'From 1975 Modernist Wings to the 310m Tallest Tower in the EU',
      historicalDate: 'Dec 5, 1975 • Sept 2022',
      timelineYear: 2022,
      locationName: 'Dworzec Centralny & Varso Tower',
      arrondissement: 'Śródmieście / Wola',
      lat: 52.2288,
      lon: 21.0032,
      radiusScale: 1.75,
      monumentId: 'monument-warszawa-centralna',
      stationId: 'rondo-onz',
      interviewQuestion:
        'How do Warszawa Centralna (1975) and adjacent Varso Tower (2022) showcase two eras of Warsaw engineering?',
      fact: 'Arseniusz Romanowicz’s 1975 Warszawa Centralna pioneered column-free cantilevered steel roofs over the 1933 Cross-City Tunnel; right next door, Foster + Partners’ Varso Tower topped out at 310 meters in 2022 as the tallest building in the European Union.'
    },
    {
      id: 'tour-waw-lazienki-narodowy',
      stopNumber: 6,
      title: 'Palace on the Isle & PGE Narodowy Across the Vistula',
      historicalDate: '1795 • June 8, 2012',
      timelineYear: 2015,
      locationName: 'Pałac na Wyspie & PGE Narodowy',
      arrondissement: 'Ujazdów / Praga',
      lat: 52.2395,
      lon: 21.0458,
      radiusScale: 1.8,
      monumentId: 'monument-stadion-narodowy',
      stationId: 'stadion-narodowy',
      interviewQuestion:
        'How does Metro Line M2 bridge the historic Vistula Escarpment and the Praga bank at PGE Narodowy?',
      fact: 'Boring deep beneath the Vistula River bed in 2015, Line M2 surfaces at Stadion Narodowy—built with twin island platforms for Line M3 directly beside JSK Architekci’s red-and-white basket-weave national stadium.'
    }
  ],
  uiTheme: {
    culturalMovement: 'Polish Crimson & White Eagle, Chopin Nocturne Gold & Old Town Sgraffito',
    hudTitle: 'WARSZAWA METRO • 1864–2026',
    hudSubtitle: 'SYRENKA, VISTULA ESCARPMENT & VARSO SKYLINE • 3D ARCHITECTURE & TRANSIT',
    networkTitle: 'METRO WARSZAWSKIE (M1/M2/M3), SKM & TRAMWAJE',
    districtsTabLabel: 'Dzielnice',
    tourTabLabel: 'Warsaw Tour',
    tourPanelTitle: 'VISTULA ESCARPMENT & PHOENIX CITY TOUR',
    googleFontsUrl:
      'https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap',
    palette: {
      bgObsidian: '#110b0e',
      bgPanel: 'rgba(24, 15, 20, 0.90)',
      bgPanelElevated: 'rgba(36, 22, 29, 0.95)',
      primaryBright: '#f4b942',
      primaryMain: '#dc143c',
      primaryMuted: '#9e1b34',
      borderSubtle: 'rgba(220, 20, 60, 0.45)',
      borderStrong: 'rgba(244, 185, 66, 0.88)',
      accentGlow: 'rgba(220, 20, 60, 0.30)',
      textPrimary: '#fcf9f5',
      textDim: '#dfd2c8',
      textSubtle: '#a38f82',
      secondaryAccent: '#005ca9',
      alertAccent: '#e30613',
      worldGroundBase: '#e3dcd2',
      worldWaterTint: '#1f5e7a',
      worldWallBase: '#eee6d8',
      worldRoofBase: '#b84a39'
    },
    fonts: {
      display: "'Cinzel Decorative', 'Cormorant Garamond', serif",
      serif: "'Cormorant Garamond', Georgia, serif",
      sans: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      mono: "'JetBrains Mono', monospace"
    },
    svgOrnamentPaths: [
      'M0 12 L16 4 L32 12 L48 4 L64 12 L80 4 L96 12 L112 4 L128 12',
      'M0 20 L16 12 L32 20 L48 12 L64 20 L80 12 L96 20 L112 12 L128 20'
    ]
  }
};
