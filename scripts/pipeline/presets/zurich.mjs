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

export const ZURICH_PRESET = {
  cityId: 'zurich',
  cityName: 'Zurich',
  localName: 'Zürich',
  countryName: 'Switzerland',
  region: 'Canton of Zürich (Kanton Zürich)',
  tagline: 'S-BAHN ZÜRICH, VBZ TRAMS, LIMMAT & LAKE ZURICH • 3D ARCHITECTURE & TRANSIT',
  metroSystemName: 'Zürcher Verkehrsverbund (ZVV) — S-Bahn Zürich, VBZ Trams, Polybahn & Dolderbahn',
  timelineRange: [1847, 2026],
  geo: {
    centerLat: 47.3717,
    centerLon: 8.5422,
    bbox: [47.335, 8.485, 47.415, 8.600],
    kmPerDegLat: 111.18,
    kmPerDegLon: 75.50,
    worldUnitsPerKm: 12.2,
    coreRadiusKm: 6.8,
    isCoastal: false,
    defaultElevationMeters: 408
  },
  topography: [
    // Uetliberg (870m summit southwest of Zurich — 464m above Lake Zurich!)
    {
      name: 'Uetliberg (870m Albis Ridge Summit)',
      lat: 47.3496,
      lon: 8.4919,
      peakElevationMeters: 462,
      radiusMeters: 2800,
      steepness: 1.9,
      ridgeAzimuthDeg: -32,
      ridgeElongation: 2.2
    },
    // Zürichberg & Adlisberg (eastern wooded ridge above ETH, Kunsthaus & Dolder)
    {
      name: 'Zürichberg & Dolder Ridge (676m)',
      lat: 47.3835,
      lon: 8.5735,
      peakElevationMeters: 268,
      radiusMeters: 2900,
      steepness: 1.7,
      ridgeAzimuthDeg: -28,
      ridgeElongation: 2.0
    },
    // Käferberg & Hönggerberg (northwestern ridge above Wipkingen & Limmat Valley)
    {
      name: 'Käferberg & ETH Hönggerberg (571m)',
      lat: 47.4025,
      lon: 8.5185,
      peakElevationMeters: 165,
      radiusMeters: 2400,
      steepness: 1.6,
      ridgeAzimuthDeg: -45,
      ridgeElongation: 1.8
    },
    // Lindenhof Moraine Hill (Roman Turicum Castellum above the Limmat)
    {
      name: 'Lindenhof Glacial Moraine Hill',
      lat: 47.3730,
      lon: 8.5406,
      peakElevationMeters: 24,
      radiusMeters: 420,
      steepness: 2.1,
      ridgeAzimuthDeg: -10,
      ridgeElongation: 1.3
    }
  ],
  waterCenterlines: [
    // Lake Zurich (Zürichsee) flowing north into the Limmat River through the Altstadt and Zürich-West
    [47.3350, 8.5540, 14.0],
    [47.3500, 8.5465, 11.5],
    [47.3620, 8.5435, 8.5],
    [47.3666, 8.5435, 2.6],
    [47.3700, 8.5428, 2.1],
    [47.3735, 8.5425, 2.0],
    [47.3775, 8.5420, 2.1],
    [47.3812, 8.5388, 2.3],
    [47.3885, 8.5310, 2.4],
    [47.3965, 8.5150, 2.5],
    [47.4020, 8.4920, 2.6]
  ],
  bridges: [
    {
      id: 'bridge-quaibruecke',
      name: 'Quaibrücke (1884 Lake Zurich & Limmat Outflow Bridge)',
      lat: 47.3666,
      lon: 8.5435,
      builtYear: 1884,
      lengthWorld: 3.2,
      widthWorld: 0.62,
      rotationY: 0.12,
      style: 'iron-arch'
    },
    {
      id: 'bridge-muensterbruecke',
      name: 'Münsterbrücke (1838 Alois Negrelli Stone Arch Bridge)',
      lat: 47.3698,
      lon: 8.5427,
      builtYear: 1838,
      lengthWorld: 2.4,
      widthWorld: 0.48,
      rotationY: 0.14,
      style: 'stone-arch'
    },
    {
      id: 'bridge-rathausbruecke',
      name: 'Rathausbrücke (Gemüsebrücke Civic Plaza Bridge)',
      lat: 47.3725,
      lon: 8.5425,
      builtYear: 1881,
      lengthWorld: 2.2,
      widthWorld: 0.65,
      rotationY: 0.10,
      style: 'stone-arch'
    },
    {
      id: 'bridge-bahnhofbruecke',
      name: 'Bahnhofbrücke (1863 Bahnhofstrasse – Central Crossing)',
      lat: 47.3766,
      lon: 8.5425,
      builtYear: 1863,
      lengthWorld: 2.5,
      widthWorld: 0.64,
      rotationY: 0.25,
      style: 'stone-arch'
    },
    {
      id: 'bridge-hardbruecke',
      name: 'Hardbrücke Viaduct (Zürich-West Rail & Road Crossing)',
      lat: 47.3852,
      lon: 8.5178,
      builtYear: 1972,
      lengthWorld: 5.4,
      widthWorld: 0.58,
      rotationY: 0.38,
      style: 'viaduct'
    }
  ],
  parks: [
    {
      name: 'Platzspitz (Confluence of the Limmat & Sihl Rivers)',
      lat: 47.3802,
      lon: 8.5396,
      rx: 3.4,
      rz: 4.5,
      rotation: -0.25,
      hasBasin: true
    },
    {
      name: 'Zürichhorn & Chinagarten (Lake Zurich East Shore Promenade)',
      lat: 47.3545,
      lon: 8.5525,
      rx: 5.8,
      rz: 6.4,
      rotation: 0.15,
      hasBasin: true
    },
    {
      name: 'arboretum & Mythenquai Lakeside Park (Enge)',
      lat: 47.3612,
      lon: 8.5355,
      rx: 5.2,
      rz: 6.0,
      rotation: -0.12,
      hasBasin: true
    },
    {
      name: 'Alter Botanischer Garten (Bollwerk "zur Katz" Bastion, 1837)',
      lat: 47.3706,
      lon: 8.5342,
      rx: 3.2,
      rz: 3.0,
      rotation: 0.0,
      hasBasin: false
    },
    {
      name: 'Irchelpark (University of Zurich Campus Park)',
      lat: 47.3972,
      lon: 8.5485,
      rx: 6.2,
      rz: 5.5,
      rotation: 0.20,
      hasBasin: true
    }
  ],
  places: [
    {
      name: 'Paradeplatz (Bahnhofstrasse Banking & Tram Hub)',
      lat: 47.3697,
      lon: 8.5389,
      radius: 2.4
    },
    {
      name: 'Bellevue & Sechseläutenplatz',
      lat: 47.3663,
      lon: 8.5452,
      radius: 3.0
    },
    {
      name: 'Bürkliplatz (Lake Zurich Steamboat Pier)',
      lat: 47.3662,
      lon: 8.5412,
      radius: 2.5,
      hasColumnOrObelisk: true
    },
    {
      name: 'Münsterhof (Fraumünster Guild Square)',
      lat: 47.3700,
      lon: 8.5408,
      radius: 2.1
    },
    {
      name: 'Central & Polybahn Lower Plaza',
      lat: 47.3768,
      lon: 8.5438,
      radius: 2.3
    }
  ],
  monuments: [
    {
      id: 'monument-grossmuenster',
      nodeName: 'Monument_grossmuenster',
      name: 'Grossmünster (Romanesque Twin-Towered Cathedral)',
      localName: 'Grossmünster Zürich (Karlsturm & Glockenturm)',
      lat: 47.3701,
      lon: 8.5441,
      builtYear: 1220,
      constructionStartYear: 1100,
      radius: 4.2,
      heightMeters: 62,
      era: 'medieval',
      eraLabel: 'Romanesque Basilica & 1787 Neo-Gothic Cupolas • 1220',
      connectedLines: ['T4', 'T11', 'S2', 'S18'],
      style: 'Romanesque Twin Sandstone Towers & Scarlet Octagonal Domes (1100–1220 / 1787)',
      arrondissement: 'Altstadt (Kreis 1 — Rathaus / Niederdorf)',
      rotationY: -0.22,
      scale: 0.92,
      archetype: 'twin_spire_cathedral',
      primaryColor: '#d9ceb8',
      secondaryColor: '#8c7e6a',
      accentColor: '#b8332a',
      description:
        'Legend holds that Charlemagne founded Grossmünster where his horse knelt over the tombs of Zurich’s patron saints Felix and Regula. From its pulpit in 1519, Huldrych Zwingli launched the Swiss Reformation; its iconic twin Neo-Gothic domed helmets were added in 1787.'
    },
    {
      id: 'monument-fraumuenster-st-peter',
      nodeName: 'Monument_fraumuenster_st_peter',
      name: 'Fraumünster Abbey & St. Peter’s Clock Tower',
      localName: 'Fraumünster & Kirche St. Peter',
      lat: 47.3698,
      lon: 8.5413,
      builtYear: 1250,
      constructionStartYear: 853,
      radius: 4.0,
      heightMeters: 64,
      era: 'medieval',
      eraLabel: 'Carolingian Abbey & Europe’s Largest Clock Dial • 853 / 1534',
      connectedLines: ['T4', 'T11'],
      style: 'Gothic Choir with Marc Chagall Windows, Patinated Copper Spire & 8.7m Golden Clock Dial',
      arrondissement: 'Altstadt (Kreis 1 — Lindenhof / Münsterhof)',
      rotationY: 0.15,
      scale: 0.90,
      archetype: 'twin_spire_cathedral',
      primaryColor: '#e2d8c5',
      secondaryColor: '#3b8c7e',
      accentColor: '#e8b931',
      description:
        'Founded in 853 by King Louis the German for aristocratic women, Fraumünster’s slender blue-green spire rises beside St. Peter’s Church—whose 1534 tower sports the largest church clock face in Europe at 8.7 meters in diameter.'
    },
    {
      id: 'monument-zurich-hb',
      nodeName: 'Monument_zurich_hb',
      name: 'Zürich Hauptbahnhof (1871 Wanner Portal & Underground S-Bahn Hub)',
      localName: 'Zürich Hauptbahnhof (Zürich HB)',
      lat: 47.3782,
      lon: 8.5402,
      builtYear: 1871,
      constructionStartYear: 1847,
      radius: 4.8,
      heightMeters: 42,
      era: 'industrial',
      eraLabel: '1847 Spanisch-Brötli-Bahn & 1871 Neo-Renaissance Hall',
      connectedLines: ['S2', 'S8', 'S10', 'T4', 'T10', 'T11'],
      style: 'Jakob Friedrich Wanner Triumphal Sandstone Arch & Multi-Level Underground S-Bahn Halls',
      arrondissement: 'Kreis 1 (City / Bahnhofplatz)',
      rotationY: -0.32,
      scale: 0.95,
      archetype: 'beaux_arts_terminus',
      primaryColor: '#d8ccb8',
      secondaryColor: '#4e5d6c',
      accentColor: '#e30613',
      description:
        'Site of Switzerland’s first railway in 1847 (the "Spanisch-Brötli-Bahn" to Baden), Zürich HB features Jakob Friedrich Wanner’s 1871 sandstone triumphal arch above three subterranean through-stations serving over 2,900 trains daily.'
    },
    {
      id: 'monument-eth-polybahn',
      nodeName: 'Monument_eth_polybahn',
      name: 'ETH Zürich Semper Building & 1889 UBS Polybahn Funicular',
      localName: 'ETH Zürich Hauptgebäude & Polybahn',
      lat: 47.3763,
      lon: 8.5476,
      builtYear: 1864,
      constructionStartYear: 1858,
      radius: 4.5,
      heightMeters: 52,
      era: 'industrial',
      eraLabel: 'Gottfried Semper Neoclassicism & 1889 Funicular • 1864',
      connectedLines: ['PB', 'T10', 'T4'],
      style: 'Neoclassical Acropolis Palace, Gustav Gull Cupola (1918) & Crimson Polybahn Viaduct',
      arrondissement: 'Hochschulquartier (Kreis 1 / Kreis 6)',
      rotationY: -0.28,
      scale: 0.92,
      archetype: 'grand_palace_facade',
      primaryColor: '#e6decb',
      secondaryColor: '#52606d',
      accentColor: '#c8102e',
      description:
        'Designed by Gottfried Semper in 1864 atop the Zürichberg terrace (where Albert Einstein studied and taught) and linked to Central down on the Limmat by the crimson 1889 Polybahn funicular.'
    },
    {
      id: 'monument-opernhaus-zurich',
      nodeName: 'Monument_opernhaus_zurich',
      name: 'Opernhaus Zürich & Sechseläutenplatz',
      localName: 'Opernhaus Zürich',
      lat: 47.3653,
      lon: 8.5469,
      builtYear: 1891,
      constructionStartYear: 1890,
      radius: 4.0,
      heightMeters: 38,
      era: 'belle_epoque',
      eraLabel: 'Fellner & Helmer Viennese Neo-Baroque • 1891',
      connectedLines: ['S2', 'S18', 'T4', 'T11'],
      style: 'Neo-Baroque White Stone Portico, Busts of Mozart & Wagner, and Copper Auditorium Roof',
      arrondissement: 'Seefeld / Bellevue (Kreis 1)',
      rotationY: -0.18,
      scale: 0.90,
      archetype: 'beaux_arts_opera',
      primaryColor: '#f2ece1',
      secondaryColor: '#3d7a6e',
      accentColor: '#d4af37',
      description:
        'Built in just 16 months in 1890–1891 by Viennese theater architects Fellner & Helmer after the Aktientheater burned down, Opernhaus Zürich was the first opera house in Europe with electric lighting and anchors the Valser quartzite expanse of Sechseläutenplatz.'
    },
    {
      id: 'monument-prime-tower',
      nodeName: 'Monument_prime_tower',
      name: 'Prime Tower & Hardbrücke Viaduct (Zürich-West)',
      localName: 'Prime Tower (Maag-Areal)',
      lat: 47.3861,
      lon: 8.5173,
      builtYear: 2011,
      constructionStartYear: 2008,
      radius: 4.0,
      heightMeters: 126,
      era: 'contemporary',
      eraLabel: 'Gigon/Guyer Crystalline Glass Skyscraper • 2011',
      connectedLines: ['S8', 'T4'],
      style: '126m Faceted Blue-Green Glass Polygon Tower & Historic Brick Maag Gear Hall',
      arrondissement: 'Industriequartier / Zürich-West (Kreis 5)',
      rotationY: 0.35,
      scale: 0.92,
      archetype: 'twisting_glass_tower',
      primaryColor: '#488894',
      secondaryColor: '#2d5c66',
      accentColor: '#e8b931',
      description:
        'Designed by Annette Gigon and Mike Guyer on the former Maag gear-factory grounds beside Hardbrücke station, the 126-meter octagonal-faceted Prime Tower catalyzed the transformation of industrial Kreis 5 into Zürich-West.'
    },
    {
      id: 'monument-kunsthaus-heimplatz',
      nodeName: 'Monument_kunsthaus_heimplatz',
      name: 'Kunsthaus Zürich (Moser Hall & Chipperfield Building)',
      localName: 'Kunsthaus Zürich am Heimplatz',
      lat: 47.3702,
      lon: 8.5484,
      builtYear: 2021,
      constructionStartYear: 1910,
      radius: 4.0,
      heightMeters: 32,
      era: 'contemporary',
      eraLabel: '1910 Karl Moser Jugendstil & 2021 David Chipperfield',
      connectedLines: ['T4', 'T10', 'DB'],
      style: 'Jura Limestone Fluted Facade, Brass Fins & Underground Art Passage across Heimplatz',
      arrondissement: 'Hottingen / Hochschulen (Kreis 1 / Kreis 7)',
      rotationY: -0.35,
      scale: 0.90,
      archetype: 'art_deco_slab',
      primaryColor: '#e8dfce',
      secondaryColor: '#c9bc9c',
      accentColor: '#c89b3c',
      description:
        'Home to Switzerland’s largest art collection (from Alberto Giacometti and Ferdinand Hodler to Dadaism, born nearby at Cabaret Voltaire in 1916), uniting Karl Moser’s 1910 Villa with David Chipperfield’s 2021 Jura-limestone wing.'
    },
    {
      id: 'monument-uetliberg-kulm',
      nodeName: 'Monument_uetliberg_kulm',
      name: 'Uetliberg Kulm Observation Tower & Hotel Uto Kulm (870m)',
      localName: 'Uetliberg Aussichtsturm & Uto Kulm',
      lat: 47.3496,
      lon: 8.4919,
      builtYear: 1990,
      constructionStartYear: 1875,
      radius: 4.4,
      heightMeters: 72,
      era: 'modern',
      eraLabel: '870m Panoramic Summit & 1875 Uetlibergbahn • 1990',
      connectedLines: ['S10'],
      style: '72m Triangular Steel Lattice Lookout Tower, Panoramic Platform & 186m TV Mast',
      arrondissement: 'Uetliberg / Friesenberg (Kreis 3 / Stallikon)',
      rotationY: 0.0,
      scale: 0.95,
      archetype: 'observation_needle',
      primaryColor: '#8d99a6',
      secondaryColor: '#e6decb',
      accentColor: '#e30613',
      description:
        'Rising 464 meters above Lake Zurich at 870m elevation and reached by the electric S10 Uetlibergbahn (opened 1875), the 72m triangular steel lookout tower commands a 360° panorama from the Limmat Valley to the Bernese and Glarus Alps.'
    }
  ],
  milestones: [
    {
      year: 1847,
      title: 'Spanisch-Brötli-Bahn (First Swiss Railway)',
      description: 'On August 7, 1847, the Swiss Northern Railway opens between Zürich and Baden, earning its nickname from the flaky pastries brought warm to Zurich every morning.',
      category: 'metro'
    },
    {
      year: 1864,
      title: 'ETH Zürich Semper Building & Bahnhofstrasse',
      description: 'Gottfried Semper completes the monumental ETH Hauptgebäude while Zurich fills in its medieval Fröschengraben moat to create Bahnhofstrasse.',
      category: 'architecture'
    },
    {
      year: 1875,
      title: 'Uetlibergbahn (Line S10) Climbs to 870m',
      description: 'Built by tunnel engineer Louis Favre with a 7.9% adhesion gradient, the Uetlibergbahn opens from Selnau up to Uetliberg Kulm.',
      category: 'metro'
    },
    {
      year: 1882,
      title: 'Zürcher Strassenbahn (First Tramway)',
      description: 'Zurich’s first horse-drawn tramway opens from Tiefenbrunnen through Bellevue and Paradeplatz to Central, followed by electric trams in 1894.',
      category: 'metro'
    },
    {
      year: 1889,
      title: 'Polybahn (1889) & Dolderbahn (1895)',
      description: 'The UBS Polybahn funicular links Central with the ETH Polyterrasse in 100 seconds, followed in 1895 by the Dolderbahn up the Zürichberg.',
      category: 'metro'
    },
    {
      year: 1973,
      title: '1973 U-Bahn Referendum & Milchbuck Tram Tunnel',
      description: 'Voters reject a full heavy-rail U-Bahn in favor of expanding surface trams and S-Bahn tunnels; the already-excavated 2.5 km Milchbuck U-Bahn tunnel opens for trams in 1986.',
      category: 'culture'
    },
    {
      year: 1990,
      title: 'S-Bahn Zürich & Hirschengraben Cross-City Tunnel',
      description: 'On May 27, 1990, Switzerland’s first integrated S-Bahn network launches with the underground Museumstrasse/Hirschengraben tunnel beneath Zürich HB and Calatrava’s Stadelhofen station.',
      category: 'metro'
    },
    {
      year: 2014,
      title: 'Durchgangsbahnhof Löwenstrasse (Weinland Tunnel)',
      description: 'A second deep four-track underground cross-city station opens 16m beneath Zürich HB alongside the 5 km Weinland Tunnel to Oerlikon.',
      category: 'metro'
    }
  ],
  eras: [
    {
      id: 'zurich_era_1',
      name: 'Roman Turicum, Carolingian Abbeys & Zwingli’s Reformation',
      yearRange: [853, 1846],
      tagline: '853–1846 • Grossmünster, Fraumünster & Guild Republic',
      summary: 'From the Roman customs post on Lindenhof hill to the twin-towered Grossmünster and Fraumünster Abbey along the Limmat.'
    },
    {
      id: 'zurich_era_2',
      name: 'Escher’s Railway Metropolis & Semper’s Polytechnic',
      yearRange: [1847, 1914],
      tagline: '1847–1914 • Spanisch-Brötli-Bahn, ETH, Bahnhofstrasse & Electric Trams',
      summary: 'Alfred Escher establishes Zürich HB, ETH Zürich, and the Gotthard Railway financing hub while trams and mountain funiculars weave across the hills.'
    },
    {
      id: 'zurich_era_3',
      name: 'Dadaism, Swiss International Style & The U-Bahn Debate',
      yearRange: [1916, 1989],
      tagline: '1916–1989 • Cabaret Voltaire, Swiss Grid Typography & Transit Referendums',
      summary: 'Zurich gives birth to Dadaism (1916) and Josef Müller-Brockmann’s Swiss Typographic Grid while citizens champion dense tram priority over highways.'
    },
    {
      id: 'zurich_era_4',
      name: 'S-Bahn Cross-City Tunnels & Zürich-West Skyscrapers',
      yearRange: [1990, 2026],
      tagline: '1990–2026 • ZVV S-Bahn, Calatrava Stadelhofen, Prime Tower & Chipperfield Kunsthaus',
      summary: 'Two deep cross-city rail tunnels turn Zürich HB into a subterranean metro-scale hub while former industrial districts blossom into Zürich-West.'
    }
  ],
  metroLines: [
    {
      line: 'S2',
      name: 'S-Bahn S2 — Flughafen ↔ Oerlikon ↔ Zürich HB (Museumstrasse Tunnel) ↔ Stadelhofen ↔ Enge',
      color: '#00529b',
      textColor: '#ffffff',
      openedYear: 1990,
      rollingStockStyle: 'SBB / ZVV (RABe 511 KISS Double-Deck S-Bahn)',
      stations: [
        {
          name: 'Zürich Oerlikon (S-Bahn North Hub)',
          lat: 47.4115,
          lon: 8.5441,
          year: 1855,
          fact: 'Northern railway gateway linking Zürich Airport and the 2014 Weinland and 1856 Wipkingen tunnels.'
        },
        {
          name: 'Zürich Letten (1886–1989 Closed Ghost Station)',
          lat: 47.3867,
          lon: 8.5342,
          year: 1886,
          isGhost: true,
          fact: 'Served the original single-track Letten Line along the Limmat for 103 years until replaced on May 27, 1990 by the Hirschengraben S-Bahn tunnel; its platforms now host cultural pop-ups.'
        },
        {
          name: 'Zürich HB (Hauptbahnhof • Museumstrasse Underground)',
          lat: 47.3782,
          lon: 8.5402,
          year: 1990,
          fact: 'Opened May 27, 1990 beneath the Swiss National Museum as the centerpiece of Switzerland’s first S-Bahn underground cross-city line.'
        },
        {
          name: 'Zürich Stadelhofen (Santiago Calatrava Station)',
          lat: 47.3667,
          lon: 8.5485,
          year: 1990,
          fact: 'Sculpted into the base of the Zürichberg hillside by Santiago Calatrava (1990) with skeletal concrete ribs, a soaring steel-ribbed pergola, and a subterranean shopping arcade.'
        },
        {
          name: 'Zürich Enge (1927 Tessinerplatz Neo-Classical Granite Rotunda)',
          lat: 47.3641,
          lon: 8.5308,
          year: 1927,
          fact: 'Built by brothers Otto and Werner Pfister in 1925–1927 using Ticino granite after the Lake Zurich rail line was relocated into the Ulmberg Tunnel.'
        },
        {
          name: 'Zürich Wollishofen (Lake Zurich West Shore)',
          lat: 47.3472,
          lon: 8.5338,
          year: 1875,
          fact: 'Lakeside S-Bahn station serving the Cassiopeiasteg boardwalk and Rote Fabrik cultural center.'
        }
      ]
    },
    {
      line: 'S8',
      name: 'S-Bahn S8 — Oerlikon ↔ Wipkingen ↔ Hardbrücke ↔ Zürich HB (Löwenstrasse Tunnel) ↔ Enge',
      color: '#00843d',
      textColor: '#ffffff',
      openedYear: 1990,
      rollingStockStyle: 'SBB / ZVV (Siemens Desiro Double-Deck DPZ)',
      stations: [
        {
          name: 'Zürich Oerlikon (S-Bahn North Hub)',
          lat: 47.4115,
          lon: 8.5441,
          year: 1855,
          fact: 'Connects the northern Glatt Valley with downtown Zurich via the 5 km Weinland Tunnel.'
        },
        {
          name: 'Zürich Wipkingen (Limmat Viaduct Station)',
          lat: 47.3929,
          lon: 8.5290,
          year: 1856,
          fact: 'Approaches the historic 1894 Aussersihl railway viaduct across the Limmat River.'
        },
        {
          name: 'Zürich Hardbrücke (Prime Tower & Zürich-West)',
          lat: 47.3852,
          lon: 8.5178,
          year: 1982,
          fact: 'Suspended beneath the Hardbrücke road viaduct directly alongside the 126m Prime Tower.'
        },
        {
          name: 'Zürich HB (Hauptbahnhof •Museumstrasse Underground)',
          lat: 47.3782,
          lon: 8.5402,
          year: 2014,
          fact: 'Includes the 2014 Durchgangsbahnhof Löwenstrasse (Tracks 31–34) excavated 16 meters below the historic 1871 terminal.'
        },
        {
          name: 'Zürich Wiedikon',
          lat: 47.3714,
          lon: 8.5235,
          year: 1875,
          fact: 'Portal of the Zimmerberg Base Tunnel.'
        },
        {
          name: 'Zürich Enge (1927 Tessinerplatz Neo-Classical Granite Rotunda)',
          lat: 47.3641,
          lon: 8.5308,
          year: 1927,
          fact: 'Serves the Enge banking quarter and Lake Zurich arboretum.'
        }
      ]
    },
    {
      line: 'S10',
      name: 'Uetlibergbahn S10 (SZU) — Zürich HB ↔ Selnau ↔ Giesshübel ↔ Triemli ↔ Uetliberg Kulm (870m)',
      color: '#f39200',
      textColor: '#10141c',
      openedYear: 1875,
      rollingStockStyle: 'Sihltal Zürich Uetliberg Bahn (SZU Dual-Voltage Mountain Rail)',
      stations: [
        {
          name: 'Zürich HB (Hauptbahnhof • SZU Underground Tracks 21–22)',
          lat: 47.3782,
          lon: 8.5402,
          year: 1990,
          fact: 'Subterranean SZU island platform constructed beneath the Sihl River bed in 1990.'
        },
        {
          name: 'Zürich Selnau (with 1875 Surface Ghost Terminus)',
          lat: 47.3724,
          lon: 8.5322,
          year: 1875,
          isGhost: true,
          fact: 'For 115 years (1875–1990), Selnau was a surface terminal on the Sihl; in 1990 the tracks were sunk into a sub-river tunnel to Zürich HB and the old surface yard became a television studio.'
        },
        {
          name: 'Zürich Binz',
          lat: 47.3630,
          lon: 8.5182,
          year: 1990,
          fact: 'Underground cut-and-cover station on the Uetliberg line.'
        },
        {
          name: 'Zürich Friesenberg',
          lat: 47.3596,
          lon: 8.5082,
          year: 1923,
          fact: 'Foothill station serving the cooperative garden-city housing estates of Friesenberg.'
        },
        {
          name: 'Zürich Triemli (Foot of the 7.9% Uetliberg Climb)',
          lat: 47.3652,
          lon: 8.4955,
          year: 1875,
          fact: 'Here the S10 begins its 79‰ (7.9%) adhesion mountain climb up the wooded flank of Uetliberg.'
        },
        {
          name: 'Uetliberg (813m Mountain Terminus below Uto Kulm)',
          lat: 47.3519,
          lon: 8.4902,
          year: 1875,
          fact: 'Highest standard-gauge adhesion railway station in Europe outside the high Alps, steps below the 870m Uetliberg Kulm observation tower.'
        }
      ]
    },
    {
      line: 'S18',
      name: 'Forchbahn S18 (FB) — Zürich Stadelhofen ↔ Kreuzplatz ↔ Hegibachplatz ↔ Rehalp',
      color: '#e30613',
      textColor: '#ffffff',
      openedYear: 1912,
      rollingStockStyle: 'Forchbahn AG (Stadler Be 4/6 Crimson Interurban)',
      stations: [
        {
          name: 'Zürich Stadelhofen (Santiago Calatrava Station)',
          lat: 47.3667,
          lon: 8.5485,
          year: 1912,
          fact: 'Downtown terminus of the red Forchbahn on the square in front of Calatrava’s Stadelhofen station.'
        },
        {
          name: 'Kreuzplatz',
          lat: 47.3638,
          lon: 8.5542,
          year: 1912,
          fact: 'Shared urban tramway trackage through Hottingen.'
        },
        {
          name: 'Hegibachplatz',
          lat: 47.3598,
          lon: 8.5608,
          year: 1912,
          fact: 'Major eastern interchange with Tram 11 and Trolleybus 31.'
        },
        {
          name: 'Balgrist',
          lat: 47.3548,
          lon: 8.5715,
          year: 1912,
          fact: 'Serves the Balgrist University Hospital.'
        },
        {
          name: 'Zürich Rehalp (Transition to Mountain Right-of-Way)',
          lat: 47.3518,
          lon: 8.5805,
          year: 1912,
          fact: 'Where the Forchbahn leaves VBZ street tracks to climb toward Zumikon (1976 underground tunnel) and Esslingen.'
        }
      ]
    },
    {
      line: 'T2',
      name: 'VBZ Tram 2 & Limmattalbahn Light Rail — Tiefenbrunnen ↔ Bellevue ↔ Paradeplatz ↔ Stauffacher ↔ Letzigrund ↔ Farbhof / Schlieren',
      color: '#e30613',
      textColor: '#ffffff',
      openedYear: 1882,
      rollingStockStyle: 'VBZ / AVA Limmattalbahn (Stadler Tramlink & Flexity Light Rail)',
      stations: [
        {
          name: 'Zürich Tiefenbrunnen (1882 First Tram Terminus & Lake Bath)',
          lat: 47.3504,
          lon: 8.5614,
          year: 1882,
          fact: 'Eastern lakeside anchor of Tram 2 along Seefeldstrasse.'
        },
        {
          name: 'Bellevue (Sechseläutenplatz & Opernhaus)',
          lat: 47.3663,
          lon: 8.5452,
          year: 1882,
          fact: 'Crosses the Quaibrücke with panoramic views of Lake Zurich and the Alps.'
        },
        {
          name: 'Bürkliplatz (Lake Zurich Pier & Quaibrücke)',
          lat: 47.3662,
          lon: 8.5412,
          year: 1882,
          fact: 'Connects with Lake Zurich steamships on the left bank.'
        },
        {
          name: 'Paradeplatz (Bahnhofstrasse & Fraumünster)',
          lat: 47.3697,
          lon: 8.5389,
          year: 1882,
          fact: 'Pivots west from Bahnhofstrasse toward Stauffacher and Kreis 4.'
        },
        {
          name: 'Stauffacher (Kreis 4 Tram Junction)',
          lat: 47.3728,
          lon: 8.5290,
          year: 1897,
          fact: 'Busy west-central tramway hub beside St. Jakob Church.'
        },
        {
          name: 'Kalkbreite / Bahnhof Wiedikon',
          lat: 47.3740,
          lon: 8.5218,
          year: 1898,
          fact: 'Framed by the pioneering 2014 Kalkbreite cooperative housing complex built directly atop the VBZ tram depot.'
        },
        {
          name: 'Letzigrund (Stadion Letzigrund)',
          lat: 47.3818,
          lon: 8.5042,
          year: 1900,
          fact: 'Serves the famous Weltklasse Zürich athletics stadium designed by Bétrix & Consolascio.'
        },
        {
          name: 'Farbhof (Limmattalbahn Light Rail Interchange)',
          lat: 47.3905,
          lon: 8.4885,
          year: 2022,
          fact: 'Extended in 2019–2022 as the 13.4 km Limmattalbahn (Line 20) interurban light rail corridor to Schlieren, Dietikon, and Killwangen.'
        }
      ]
    },
    {
      line: 'T3',
      name: 'VBZ Tram 3 — Klusplatz / Römerhof ↔ Kunsthaus ↔ Central ↔ Zürich HB ↔ Stauffacher ↔ Albisrieden',
      color: '#00843d',
      textColor: '#ffffff',
      openedYear: 1900,
      rollingStockStyle: 'Verkehrsbetriebe Zürich (Bombardier Cobra Be 5/6 Low-Floor Tram)',
      stations: [
        {
          name: 'Römerhof (Dolderbahn Lower Terminus)',
          lat: 47.3695,
          lon: 8.5592,
          year: 1900,
          fact: 'Connects the Hottingen hillside with the 1895 Dolderbahn rack railway.'
        },
        {
          name: 'Kunsthaus (Heimplatz Cultural Hub)',
          lat: 47.3702,
          lon: 8.5484,
          year: 1900,
          fact: 'Stops directly between the 1910 Moser Kunsthaus, 2021 Chipperfield Kunsthaus, and Schauspielhaus.'
        },
        {
          name: 'Central (Polybahn & Limmatquai North)',
          lat: 47.3768,
          lon: 8.5438,
          year: 1900,
          fact: 'Descends Rämistrasse along the medieval city wall alignment to Central.'
        },
        {
          name: 'Zürich HB (Hauptbahnhof • Bahnhofplatz)',
          lat: 47.3782,
          lon: 8.5402,
          year: 1900,
          fact: 'Crosses the Bahnhofbrücke into the main station forecourt.'
        },
        {
          name: 'Stauffacher (Kreis 4 Tram Junction)',
          lat: 47.3728,
          lon: 8.5290,
          year: 1900,
          fact: 'Connects with Trams 2, 8, 9, and 14.'
        },
        {
          name: 'Albisriederplatz',
          lat: 47.3782,
          lon: 8.5095,
          year: 1923,
          fact: 'Western residential square on the run out to Albisrieden.'
        }
      ]
    },
    {
      line: 'T4',
      name: 'VBZ Tram 4 — Hardbrücke / Escher-Wyss-Platz ↔ Zürich HB ↔ Limmatquai (Grossmünster) ↔ Bellevue ↔ Tiefenbrunnen',
      color: '#1f4e8c',
      textColor: '#ffffff',
      openedYear: 1882,
      rollingStockStyle: 'Verkehrsbetriebe Zürich (Bombardier Cobra / Alstom Flexity Zurich Blue)',
      stations: [
        {
          name: 'Zürich Hardbrücke (Prime Tower & Zürich-West)',
          lat: 47.3852,
          lon: 8.5178,
          year: 2011,
          fact: 'Opened in December 2011 as the Tram Zürich-West extension past Prime Tower and Schiffbau.'
        },
        {
          name: 'Escher-Wyss-Platz',
          lat: 47.3905,
          lon: 8.5230,
          year: 1898,
          fact: 'Named after the historic Escher Wyss turbine and steamship engineering works.'
        },
        {
          name: 'Zürich HB (Hauptbahnhof • Bahnhofquai)',
          lat: 47.3782,
          lon: 8.5402,
          year: 1882,
          fact: 'Serves the eastern riverfront side of Zürich Hauptbahnhof along the Limmat.'
        },
        {
          name: 'Central (Polybahn & Limmatquai North)',
          lat: 47.3768,
          lon: 8.5438,
          year: 1882,
          fact: 'Grand five-way tram junction across Bahnhofbrücke at the foot of the 1889 Polybahn.'
        },
        {
          name: 'Rudolf-Brun-Brücke / Niederdorf',
          lat: 47.3742,
          lon: 8.5432,
          year: 1882,
          fact: 'Glides along pedestrianized Limmatquai past the medieval guildhalls of Niederdorf.'
        },
        {
          name: 'Helmhaus (Grossmünster & Wasserkirche)',
          lat: 47.3698,
          lon: 8.5434,
          year: 1882,
          fact: 'Stops directly between the Romanesque towers of Grossmünster and the 1838 Münsterbrücke.'
        },
        {
          name: 'Bellevue (Sechseläutenplatz & Opernhaus)',
          lat: 47.3663,
          lon: 8.5452,
          year: 1882,
          fact: 'Circular 1938 functionalist tram pavilion ("Bellevue-Rondell") where Lake Zurich meets the Limmat.'
        },
        {
          name: 'Zürich Tiefenbrunnen (1882 First Tram Terminus & Lake Bath)',
          lat: 47.3504,
          lon: 8.5614,
          year: 1882,
          fact: 'Southern terminus of Zurich’s original September 5, 1882 horse tramway.'
        }
      ]
    },
    {
      line: 'T7',
      name: 'VBZ Tram 7 (1973 Milchbuck–Schwamendingen Underground U-Bahn Tunnel) — Wollishofen ↔ Bahnhof Enge ↔ Paradeplatz ↔ Zürich HB ↔ Milchbuck [U-Bahn] ↔ Tierspital [U-Bahn] ↔ Schwamendingerplatz',
      color: '#3b4958',
      textColor: '#ffffff',
      openedYear: 1986,
      rollingStockStyle: 'VBZ Tram 2000 / Flexity (Underground Pre-Metro U-Bahn Tunnel Line)',
      stations: [
        {
          name: 'Zürich Wollishofen (Lake Zurich West Shore)',
          lat: 47.3472,
          lon: 8.5338,
          year: 1898,
          fact: 'Southern lakeside terminus of Tram 7 in Wollishofen.'
        },
        {
          name: 'Zürich Enge (1927 Tessinerplatz Neo-Classical Granite Rotunda)',
          lat: 47.3641,
          lon: 8.5308,
          year: 1927,
          fact: 'Loops around the twin-curved Ticino granite colonnades of Bahnhof Enge.'
        },
        {
          name: 'Paradeplatz (Bahnhofstrasse & Fraumünster)',
          lat: 47.3697,
          lon: 8.5389,
          year: 1882,
          fact: 'Runs north along the full length of pedestrianized Bahnhofstrasse.'
        },
        {
          name: 'Zürich HB (Hauptbahnhof • Bahnhofstrasse North)',
          lat: 47.3782,
          lon: 8.5402,
          year: 1882,
          fact: 'Crosses the Limmat at Bahnhofbrücke to Central.'
        },
        {
          name: 'Central (Polybahn & Limmatquai North)',
          lat: 47.3768,
          lon: 8.5438,
          year: 1882,
          fact: 'Climbs Stampfenbachstrasse and Weinbergstrasse toward the Schöneich Tunnel.'
        },
        {
          name: 'Milchbuck (1973 Pre-Built U-Bahn Underground Tunnel Portal)',
          lat: 47.3978,
          lon: 8.5425,
          year: 1973,
          isGhost: true,
          fact: 'Excavated in 1971–1973 for Zurich’s cancelled heavy-rail U-Bahn; opened on February 1, 1986 as a 2.5 km underground tram-metro tunnel with island-platform left-hand running.'
        },
        {
          name: 'Tierspital (Underground U-Bahn Cavern Station)',
          lat: 47.4018,
          lon: 8.5515,
          year: 1986,
          fact: 'First of three full subterranean metro stations inside the Milchbuck–Schwamendingen tunnel.'
        },
        {
          name: 'Schörlistrasse (Underground U-Bahn Cavern Station)',
          lat: 47.4038,
          lon: 8.5625,
          year: 1986,
          fact: 'Deep underground metro station beneath the Zürichberg ridge.'
        },
        {
          name: 'Überlandpark / Schwamendingerplatz (U-Bahn Tunnel Portal)',
          lat: 47.4048,
          lon: 8.5742,
          year: 1986,
          fact: 'Where Trams 7 and 9 emerge from the 2.5 km underground U-Bahn tunnel into the recently covered Luegisland highway park.'
        }
      ]
    },
    {
      line: 'T8',
      name: 'VBZ Tram 8 (Hardbrücke Cross-Valley Viaduct Line) — Hardturm ↔ Escher-Wyss-Platz ↔ Hardbrücke ↔ Stauffacher ↔ Selnau ↔ Enge ↔ Bellevue ↔ Kunsthaus',
      color: '#8ec641',
      textColor: '#10141c',
      openedYear: 2017,
      rollingStockStyle: 'Verkehrsbetriebe Zürich (Flexity Cross-Valley Viaduct Tram)',
      stations: [
        {
          name: 'Escher-Wyss-Platz',
          lat: 47.3905,
          lon: 8.5230,
          year: 1898,
          fact: 'Northern approach to the Hardbrücke tram viaduct.'
        },
        {
          name: 'Zürich Hardbrücke (Prime Tower & Zürich-West)',
          lat: 47.3852,
          lon: 8.5178,
          year: 2017,
          fact: 'In December 2017, Tram 8 became the first tram line to cross the 1.2 km Hardbrücke viaduct high above the SBB rail tracks and Limmat River.'
        },
        {
          name: 'Helvetiaplatz (Langstrasse & Kreis 4)',
          lat: 47.3762,
          lon: 8.5262,
          year: 1900,
          fact: 'Cultural and market square in the heart of Aussersihl (Kreis 4).'
        },
        {
          name: 'Stauffacher (Kreis 4 Tram Junction)',
          lat: 47.3728,
          lon: 8.5290,
          year: 1900,
          fact: 'Major west-central tram interchange.'
        },
        {
          name: 'Zürich Selnau (with 1875 Surface Ghost Terminus)',
          lat: 47.3724,
          lon: 8.5322,
          year: 1900,
          fact: 'Connects with the underground S10 Uetlibergbahn.'
        },
        {
          name: 'Zürich Enge (1927 Tessinerplatz Neo-Classical Granite Rotunda)',
          lat: 47.3641,
          lon: 8.5308,
          year: 1927,
          fact: 'Serves Bahnhof Enge before crossing the Quaibrücke.'
        },
        {
          name: 'Bellevue (Sechseläutenplatz & Opernhaus)',
          lat: 47.3663,
          lon: 8.5452,
          year: 1900,
          fact: 'Connects the lakeside with Rämistrasse.'
        },
        {
          name: 'Kunsthaus (Heimplatz Cultural Hub)',
          lat: 47.3702,
          lon: 8.5484,
          year: 1900,
          fact: 'Climbs past Kunsthaus Zürich toward Römerhof and Klusplatz.'
        }
      ]
    },
    {
      line: 'T10',
      name: 'VBZ Tram 10 (Glattalbahn) — Zürich HB ↔ Central ↔ ETH / Universitätsspital ↔ Milchbuck ↔ Oerlikon',
      color: '#d92b7a',
      textColor: '#ffffff',
      openedYear: 1906,
      rollingStockStyle: 'VBZ / VBG Glattalbahn (White & Magenta Cobra Light Rail)',
      stations: [
        {
          name: 'Zürich HB (Hauptbahnhof • Bahnhofplatz)',
          lat: 47.3782,
          lon: 8.5402,
          year: 1906,
          fact: 'Departs the Alfred Escher monument plaza in front of the 1871 Wanner triumphal arch.'
        },
        {
          name: 'Central (Polybahn & Limmatquai North)',
          lat: 47.3768,
          lon: 8.5438,
          year: 1906,
          fact: 'Begins the winding Weinbergstrasse climb up the Zürichberg.'
        },
        {
          name: 'ETH / Universitätsspital (Semper Hauptgebäude)',
          lat: 47.3763,
          lon: 8.5482,
          year: 1906,
          fact: 'Stops directly between Gottfried Semper’s ETH Zürich and Karl Moser’s University of Zurich.'
        },
        {
          name: 'Haldenbach / Seilbahn Rigiblick',
          lat: 47.3828,
          lon: 8.5498,
          year: 1906,
          fact: 'Connects with the 1901 Seilbahn Rigiblick funicular.'
        },
        {
          name: 'Milchbuck (1973 Pre-Built U-Bahn Underground Tunnel Portal)',
          lat: 47.3978,
          lon: 8.5425,
          year: 1973,
          isGhost: true,
          fact: 'Built in 1971–1973 as a deep underground U-Bahn station before voters rejected the heavy metro in the 1973 referendum; converted in 1986 into the 2.5 km Milchbuck–Schwamendingen underground tram tunnel.'
        },
        {
          name: 'Zürich Oerlikon (S-Bahn North Hub)',
          lat: 47.4115,
          lon: 8.5441,
          year: 2006,
          fact: 'Continues along the elevated/segregated Glattalbahn light-rail viaducts to Zürich Airport.'
        }
      ]
    },
    {
      line: 'T11',
      name: 'VBZ Tram 11 (Bahnhofstrasse Flagship) — Oerlikon ↔ Zürich HB ↔ Rennweg ↔ Paradeplatz ↔ Bürkliplatz ↔ Bellevue ↔ Stadelhofen ↔ Rehalp',
      color: '#2ca02c',
      textColor: '#ffffff',
      openedYear: 1898,
      rollingStockStyle: 'Verkehrsbetriebe Zürich (Alstom Flexity 2 Low-Floor Tram)',
      stations: [
        {
          name: 'Zürich Oerlikon (S-Bahn North Hub)',
          lat: 47.4115,
          lon: 8.5441,
          year: 1898,
          fact: 'Northern anchor of Line 11 in Oerlikon.'
        },
        {
          name: 'Bucheggplatz (1930s Trolley & Tram Roundabout)',
          lat: 47.3972,
          lon: 8.5348,
          year: 1931,
          fact: 'Multi-level tram and trolleybus rotary over the Käferberg saddle.'
        },
        {
          name: 'Zürich HB (Hauptbahnhof • Bahnhofstrasse North)',
          lat: 47.3782,
          lon: 8.5402,
          year: 1898,
          fact: 'Enters pedestrianized Bahnhofstrasse—built over the medieval Fröschengraben ("Frog Moat") in 1864.'
        },
        {
          name: 'Rennweg / Augustinergasse (Lindenhof Hill)',
          lat: 47.3732,
          lon: 8.5388,
          year: 1898,
          fact: 'Foot of medieval Rennweg and the colorful timber bay windows (Erker) of Augustinergasse.'
        },
        {
          name: 'Paradeplatz (Bahnhofstrasse & Fraumünster)',
          lat: 47.3697,
          lon: 8.5389,
          year: 1882,
          fact: 'Heart of Swiss banking, Confiserie Sprüngli (1859), and Zurich’s central tram diamond.'
        },
        {
          name: 'Bürkliplatz (Lake Zurich Pier & Quaibrücke)',
          lat: 47.3662,
          lon: 8.5412,
          year: 1882,
          fact: 'Where Bahnhofstrasse reaches Lake Zurich before Tram 11 crosses Quaibrücke.'
        },
        {
          name: 'Bellevue (Sechseläutenplatz & Opernhaus)',
          lat: 47.3663,
          lon: 8.5452,
          year: 1882,
          fact: 'Connects Lake Zurich, Limmatquai, and Opernhaus Zürich.'
        },
        {
          name: 'Zürich Stadelhofen (Santiago Calatrava Station)',
          lat: 47.3667,
          lon: 8.5485,
          year: 1898,
          fact: 'Direct transfer to S-Bahn cross-city lines S2/S3/S5/S6/S7/S9/S11/S12/S15/S16 and Forchbahn S18.'
        },
        {
          name: 'Hegibachplatz',
          lat: 47.3598,
          lon: 8.5608,
          year: 1898,
          fact: 'Eastern residential hub in Hirslanden.'
        },
        {
          name: 'Zürich Rehalp (Transition to Mountain Right-of-Way)',
          lat: 47.3518,
          lon: 8.5805,
          year: 1898,
          fact: 'Southeastern terminus of Tram 11 alongside the Forchbahn.'
        }
      ]
    },
    {
      line: 'L12',
      name: 'Glattalbahn Light Rail 12 (VBG) — Zürich Oerlikon ↔ Glattpark ↔ Glattbrugg ↔ Zürich Airport',
      color: '#76b9e4',
      textColor: '#10141c',
      openedYear: 2010,
      rollingStockStyle: 'Verkehrsbetriebe Glattal (VBG Stadler/Bombardier Segregated Light Rail)',
      stations: [
        {
          name: 'Zürich Oerlikon (S-Bahn North Hub)',
          lat: 47.4115,
          lon: 8.5441,
          year: 2006,
          fact: 'Connects the Glattalbahn elevated and segregated light-rail ring with S-Bahn Zürich.'
        },
        {
          name: 'Leutschenbach (SRF Television Studios)',
          lat: 47.4138,
          lon: 8.5565,
          year: 2008,
          fact: 'Runs along the grassed light-rail boulevard of Thurgauerstrasse.'
        },
        {
          name: 'Glattpark',
          lat: 47.4148,
          lon: 8.5685,
          year: 2008,
          fact: 'New urban lake district built on the former Oberhausen Ried.'
        },
        {
          name: 'Auzelg / Wallisellen Glattal Viaduct',
          lat: 47.4125,
          lon: 8.5845,
          year: 2010,
          fact: 'Crosses the 1,000-meter-long elevated Glattalbahn concrete viaduct over the A1 motorway and SBB rail lines.'
        }
      ]
    },
    {
      line: 'PB',
      name: 'UBS Polybahn (Line 24 Funicular) — Central ↔ ETH Polyterrasse (1889)',
      color: '#c8102e',
      textColor: '#ffffff',
      openedYear: 1889,
      rollingStockStyle: 'Zürichbergbahn / UBS Polybahn (1889 Crimson Funicular Cars)',
      stations: [
        {
          name: 'Central (Polybahn & Limmatquai North)',
          lat: 47.3768,
          lon: 8.5438,
          year: 1889,
          fact: 'Lower portal tucked directly into a historic house facade on Limmatquai.'
        },
        {
          name: 'ETH Polyterrasse (Semper Hauptgebäude)',
          lat: 47.3763,
          lon: 8.5472,
          year: 1889,
          fact: 'Upper pavilion on the panoramic Polyterrasse directly in front of Gottfried Semper’s ETH Zürich dome.'
        }
      ]
    },
    {
      line: 'DB',
      name: 'Dolderbahn (Line 25 Rack Railway) — Römerhof ↔ Titlisstrasse ↔ Waldhaus Dolder ↔ Dolder Bergstation (1895)',
      color: '#d49b1b',
      textColor: '#10141c',
      openedYear: 1895,
      rollingStockStyle: 'Dolderbahn-Aktiengesellschaft (SLM Abt Rack-and-Pinion Mountain Rail)',
      stations: [
        {
          name: 'Römerhof (Dolderbahn Lower Terminus)',
          lat: 47.3695,
          lon: 8.5592,
          year: 1895,
          fact: 'Connects with VBZ Trams 3 and 8 in Hottingen at 444m elevation.'
        },
        {
          name: 'Titlisstrasse (Passing Loop)',
          lat: 47.3712,
          lon: 8.5648,
          year: 1973,
          fact: 'Midway Abt rack-and-pinion passing loop.'
        },
        {
          name: 'Waldhaus Dolder',
          lat: 47.3728,
          lon: 8.5698,
          year: 1895,
          fact: 'Original 1895 upper funicular terminus before the 1973 rack-railway extension.'
        },
        {
          name: 'Dolder Bergstation (606m Grand Hotel Dolder)',
          lat: 47.3738,
          lon: 8.5742,
          year: 1973,
          fact: 'Terminates at 606m beside the 1899 Dolder Grand Hotel and Norman Foster’s 2008 spa wings.'
        }
      ]
    }
  ],
  railTermini: [
    {
      id: 'gl-zurich-hb',
      metroStationId: 'zurich-hb',
      monumentId: 'monument-zurich-hb',
      name: 'Zürich Hauptbahnhof (SBB CFF FFS • TGV Lyria • ICE • Railjet)',
      shortName: 'ZÜRICH HB',
      historicCompany: 'Schweizerische Nordbahn (1847) / Nordostbahn (1871 Wanner Hall)',
      modernNetwork: 'SBB InterCity • Giruno Gotthard Base Tunnel • TGV Lyria • DB ICE • ÖBB Nightjet',
      openedYear: 1847,
      trainStartYear: 1847,
      trainEndYear: 2026,
      buildingEndYear: 2026,
      arrondissement: 'Kreis 1 (Bahnhofplatz)',
      destinationLabel: 'NACH BERN • GENÈVE • BASEL • LUGANO/MILANO • PARIS • WIEN',
      colorHex: '#e30613',
      lat: 47.3782,
      lon: 8.5402,
      rotationY: -0.32,
      trackCount: 10,
      shedWidth: 2.8,
      shedLength: 3.6,
      shedHeight: 0.96,
      shedSpans: 3,
      hasClockTower: true,
      description:
        'Opened in 1847 for the Spanisch-Brötli-Bahn and crowned by Jakob Friedrich Wanner’s 1871 sandstone triumphal arch, Zürich HB combines an iron surface train shed (home to Niki de Saint Phalle’s "L’Ange Protecteur") with three underground stations.',
      corridorLatLon: [
        [47.3782, 8.5402],
        [47.3818, 8.5295],
        [47.3865, 8.5145],
        [47.3915, 8.4920]
      ]
    },
    {
      id: 'gl-zurich-stadelhofen',
      metroStationId: 'zurich-stadelhofen',
      name: 'Bahnhof Zürich Stadelhofen (1894 / 1990 Santiago Calatrava)',
      shortName: 'STADELHOFEN',
      historicCompany: 'Schweizerische Nordostbahn (1894 Rechtsufrige Zürichseebahn)',
      modernNetwork: 'ZVV S-Bahn Core Trunk (S2–S16) • Forchbahn S18',
      openedYear: 1894,
      trainStartYear: 1894,
      trainEndYear: 2026,
      buildingEndYear: 2026,
      arrondissement: 'Kreis 1 (Stadelhofen / Bellevue)',
      destinationLabel: 'NACH RAPPERSWIL • WINTERTHUR • SCHAFFHAUSEN • FLUGHAFEN',
      colorHex: '#00529b',
      lat: 47.3667,
      lon: 8.5485,
      rotationY: -0.52,
      trackCount: 6,
      shedWidth: 2.1,
      shedLength: 2.8,
      shedHeight: 0.84,
      shedSpans: 2,
      description:
        'Transformed in 1990 by ETH alumnus Santiago Calatrava into an organic architectural masterpiece of inclined white concrete arches, cantilevered steel canopies, and a subterranean promenade.',
      corridorLatLon: [
        [47.3667, 8.5485],
        [47.3595, 8.5542],
        [47.3504, 8.5614]
      ]
    }
  ],
  districts: [
    {
      id: 'dist-altstadt-kreis1',
      number: 1,
      shortLabel: 'Altstadt (Kreis 1)',
      name: '1 — Altstadt, Lindenhof, Niederdorf & Bahnhofstrasse (Kreis 1)',
      officialName: 'Stadtkreis 1 (Altstadt Zürich)',
      quartiers: 'Rathaus • Hochschulen • Lindenhof • City • Bahnhofstrasse',
      bank: 'Beidseits der Limmat (Left & Right Banks)',
      filterGroup: 'core',
      eraBadge: 'ROMAN TURICUM, ZWINGLI REFORMATION & BAHNHOFSTRASSE',
      foundedLabel: '15 BC TURICUM • 853 ABBEYS • 1864 BAHNHOFSTRASSE',
      lat: 47.3725,
      lon: 8.5418,
      standOffRadius: 28.0,
      cameraHeightOffset: 17.5,
      haloRadiusScale: 2.2,
      metroLines: ['S2', 'S8', 'S10', 'S18', 'T4', 'T10', 'T11', 'PB'],
      history:
        'Spanning both banks of the Limmat from Zürich HB to Lake Zurich, Kreis 1 unites the Roman hill of Lindenhof, the medieval guild alleys of Niederdorf, Grossmünster, Fraumünster, and the world-renowned banking boulevard of Bahnhofstrasse.',
      notableLandmarks: 'Grossmünster, Fraumünster, St. Peter, Zürich HB, ETH Zürich, Paradeplatz, Opernhaus'
    },
    {
      id: 'dist-seefeld-enge-lake',
      number: 2,
      shortLabel: 'Seefeld & Enge',
      name: '2 — Lake Zurich Basin: Bellevue, Seefeld, Enge & Wollishofen (Kreis 2 & 8)',
      officialName: 'Zürichsee-Becken (Kreis 2 & Kreis 8)',
      quartiers: 'Enge • Wollishofen • Seefeld • Mühlebach • Zürichhorn',
      bank: 'Zürichsee-Ufer (East & West Lake Shores)',
      filterGroup: 'riveGauche',
      eraBadge: 'BELLE ÉPOQUE QUAYS, OPERNHAUS & LE CORBUSIER PAVILION',
      foundedLabel: 'QUAIBRÜCKE 1884 • OPERNHAUS 1891',
      lat: 47.3595,
      lon: 8.5445,
      standOffRadius: 30.0,
      cameraHeightOffset: 18.0,
      haloRadiusScale: 2.3,
      metroLines: ['S2', 'S8', 'S18', 'T4', 'T11'],
      history:
        'Engineered in the 1880s by Arnold Bürkli as a grand necklace of lakeside promenades, arboretums, and steamboat piers framing the snow-capped Glarus Alps across Lake Zurich.',
      notableLandmarks: 'Opernhaus Zürich, Sechseläutenplatz, Bahnhof Enge, Pavillon Le Corbusier, Chinagarten'
    },
    {
      id: 'dist-zurich-west-oerlikon',
      number: 3,
      shortLabel: 'Zürich-West',
      name: '3 — Zürich-West, Hardbrücke, Aussersihl & Oerlikon (Kreis 4, 5 & 11)',
      officialName: 'Industriequartier & Nord-Zürich (Kreis 5 / 11)',
      quartiers: 'Escher-Wyss • Hardbrücke • Langstrasse • Wipkingen • Oerlikon',
      bank: 'Unteres Limmattal & Glattal',
      filterGroup: 'riveDroite',
      eraBadge: 'TURBINE FOUNDRIES TO PRIME TOWER & VIADUKT ARCHES',
      foundedLabel: 'WIPKINGEN 1856 • PRIME TOWER 2011',
      lat: 47.3865,
      lon: 8.5215,
      standOffRadius: 31.0,
      cameraHeightOffset: 18.5,
      haloRadiusScale: 2.3,
      metroLines: ['S2', 'S8', 'T4', 'T10', 'T11'],
      history:
        'Once the smoky 19th-century heartland of Escher Wyss turbines, Maag gears, and SLM locomotives, Kreis 5 and Oerlikon have been reborn with the 126m Prime Tower, Im Viadukt market arches, and the Tram Zürich-West corridor.',
      notableLandmarks: 'Prime Tower, Hardbrücke, Im Viadukt (1894), Schiffbau, Bahnhof Oerlikon'
    },
    {
      id: 'dist-zurichberg-uetliberg',
      number: 4,
      shortLabel: 'Zürichberg & Uetliberg',
      name: '4 — Zürichberg University Terrace, Dolder & Uetliberg Summit (Kreis 3, 6 & 7)',
      officialName: 'Hochschulquartier, Fluntern, Hottingen & Uetliberg',
      quartiers: 'Fluntern • Hottingen • Dolder • Wiedikon • Friesenberg • Uetliberg',
      bank: 'Albis- & Zürichberg-Höhenzüge',
      filterGroup: 'outer1860',
      eraBadge: 'NOBEL LAUREATE CAMPUS, RACK RAILWAYS & 870M PANORAMA',
      foundedLabel: 'ETH 1855 • UETLIBERGBAHN 1875',
      lat: 47.3720,
      lon: 8.5565,
      standOffRadius: 33.0,
      cameraHeightOffset: 20.0,
      haloRadiusScale: 2.4,
      metroLines: ['S10', 'T10', 'PB', 'DB'],
      history:
        'Flanking the Limmat Valley on both sides, the eastern Zürichberg terrace houses ETH Zürich (22 Nobel Laureates), Kunsthaus Zürich, and the Dolder Grand, while the western Uetliberg ridge soars to 870 meters.',
      notableLandmarks: 'ETH Zürich, Kunsthaus Zürich, Polybahn, Dolderbahn, Uetliberg Kulm (870m)'
    }
  ],
  tourStops: [
    {
      id: 'tour-zrh-hb-escher',
      stopNumber: 1,
      title: 'Zürich Hauptbahnhof: From 1847 Pastry Train to Three Underground Levels',
      historicalDate: 'Aug 7, 1847 • 1871 • May 27, 1990 • 2014',
      timelineYear: 1990,
      locationName: 'Zürich Hauptbahnhof & Alfred Escher Monument',
      arrondissement: 'Kreis 1 (Bahnhofplatz)',
      lat: 47.3782,
      lon: 8.5402,
      radiusScale: 1.75,
      monumentId: 'monument-zurich-hb',
      stationId: 'zurich-hb',
      interviewQuestion:
        'Why did Zurich build three underground through-stations beneath its 1871 terminal instead of a separate U-Bahn?',
      fact: 'After voters rejected a heavy U-Bahn in 1973, Zurich pioneered the 1990 S-Bahn model—boring the Museumstrasse (1990), SZU (1990), and Löwenstrasse (2014) underground halls directly beneath Jakob Friedrich Wanner’s 1871 sandstone station.'
    },
    {
      id: 'tour-zrh-eth-polybahn',
      stopNumber: 2,
      title: '100 Seconds to Einstein’s Alma Mater: The 1889 Polybahn & Semper’s ETH',
      historicalDate: '1864 • Jan 8, 1889 • 1918',
      timelineYear: 1905,
      locationName: 'ETH Zürich Hauptgebäude & Polyterrasse',
      arrondissement: 'Hochschulen (Kreis 1)',
      lat: 47.3763,
      lon: 8.5476,
      radiusScale: 1.7,
      monumentId: 'monument-eth-polybahn',
      stationId: 'eth-polyterrasse',
      interviewQuestion:
        'How does the 1889 UBS Polybahn connect the Limmat riverfront with Gottfried Semper’s ETH Zürich?',
      fact: 'Departing from inside a historic house facade at Central, the crimson Polybahn funicular climbs 41 vertical meters at a 26% gradient in 100 seconds to the Polyterrasse—where Albert Einstein studied physics at ETH (1896–1900).'
    },
    {
      id: 'tour-zrh-limmat-abbeys',
      stopNumber: 3,
      title: 'Across the Münsterbrücke: Grossmünster, Fraumünster & Europe’s Largest Clock',
      historicalDate: '853 • 1220 • Jan 1, 1519 • 1970 Chagall Windows',
      timelineYear: 1970,
      locationName: 'Grossmünster, Fraumünster & St. Peter',
      arrondissement: 'Altstadt (Kreis 1)',
      lat: 47.3701,
      lon: 8.5441,
      radiusScale: 1.65,
      monumentId: 'monument-grossmuenster',
      stationId: 'helmhaus',
      interviewQuestion:
        'What links the twin towers of Grossmünster on the right bank with Fraumünster Abbey on the left bank?',
      fact: 'Every Sechseläuten and medieval procession linked the two Carolingian foundations across the Limmat; today Marc Chagall’s 1970 stained-glass choir windows in Fraumünster face Sigmar Polke’s agate windows inside Grossmünster.'
    },
    {
      id: 'tour-zrh-opernhaus-calatrava',
      stopNumber: 4,
      title: 'Bellevue, Opernhaus Zürich & Calatrava’s Sculpted Stadelhofen Station',
      historicalDate: 'Oct 1, 1891 • May 27, 1990',
      timelineYear: 1991,
      locationName: 'Opernhaus Zürich & Bahnhof Stadelhofen',
      arrondissement: 'Seefeld / Bellevue',
      lat: 47.3653,
      lon: 8.5469,
      radiusScale: 1.75,
      monumentId: 'monument-opernhaus-zurich',
      stationId: 'bellevue',
      interviewQuestion:
        'How do the 1891 Neo-Baroque Opernhaus and 1990 Stadelhofen Station frame the shore of Lake Zurich?',
      fact: 'Where Fellner & Helmer’s 1891 Opernhaus anchors Sechseläutenplatz with Viennese elegance, Santiago Calatrava’s neighboring Stadelhofen Station curves along the ancient city fortification moat like a livingribbed skeleton.'
    },
    {
      id: 'tour-zrh-kunsthaus-dolder',
      stopNumber: 5,
      title: 'Heimplatz to Zürichberg: Kunsthaus Zürich & the 1895 Dolderbahn',
      historicalDate: '1895 • 1910 • Oct 2021',
      timelineYear: 2021,
      locationName: 'Kunsthaus Zürich & Römerhof',
      arrondissement: 'Hottingen (Kreis 7)',
      lat: 47.3702,
      lon: 8.5484,
      radiusScale: 1.7,
      monumentId: 'monument-kunsthaus-heimplatz',
      stationId: 'romerhof',
      interviewQuestion:
        'How does David Chipperfield’s 2021 Kunsthaus expansion converse with Karl Moser’s 1910 Jugendstil gallery?',
      fact: 'Connected via an underground art passage beneath Heimplatz, Chipperfield’s Jura-limestone pavilion creates a civic portal to the Zürichberg—just below the 1895 Dolderbahn rack railway.'
    },
    {
      id: 'tour-zrh-prime-uetliberg',
      stopNumber: 6,
      title: 'From the 126m Prime Tower in Zürich-West to the 870m Uetliberg Summit',
      historicalDate: 'May 12, 1875 • Dec 2011',
      timelineYear: 2012,
      locationName: 'Prime Tower & Uetliberg Kulm',
      arrondissement: 'Zürich-West & Uetliberg',
      lat: 47.3496,
      lon: 8.4919,
      radiusScale: 1.85,
      monumentId: 'monument-uetliberg-kulm',
      stationId: 'uetliberg',
      interviewQuestion:
        'How does Zurich balance high-density urban regeneration in Kreis 5 with preserved Alpine horizons on Uetliberg?',
      fact: 'By clustering high-rises like the 126m Prime Tower along the rail tracks of Zürich-West while running electric S10 trains every 20 minutes up to car-free Uetliberg (870m), Zurich keeps forest ridges within 20 minutes of the city center.'
    }
  ],
  uiTheme: {
    culturalMovement: 'Swiss International Typographic Grid, SBB Railway Clock Red & Lake Zurich Alpine Cyan',
    hudTitle: 'ZÜRICH S-BAHN & TRAM • 1847–2026',
    hudSubtitle: 'LIMMAT, LAKE ZURICH, ETH & UETLIBERG • 3D ARCHITECTURE & TRANSIT',
    networkTitle: 'ZVV S-BAHN ZÜRICH, VBZ TRAMS, POLYBAHN & DOLDERBAHN',
    districtsTabLabel: 'Kreise',
    tourTabLabel: 'Zürich Tour',
    tourPanelTitle: 'LIMMAT, BAHNHOFSTRASSE & ALPINE SUMMIT TOUR',
    googleFontsUrl:
      'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap',
    palette: {
      bgObsidian: '#070f1a',
      bgPanel: 'rgba(11, 22, 38, 0.91)',
      bgPanelElevated: 'rgba(16, 32, 54, 0.96)',
      primaryBright: '#38b6ff',
      primaryMain: '#e30613',
      primaryMuted: '#00529b',
      borderSubtle: 'rgba(56, 182, 255, 0.45)',
      borderStrong: 'rgba(227, 6, 19, 0.90)',
      accentGlow: 'rgba(56, 182, 255, 0.30)',
      textPrimary: '#f8fafc',
      textDim: '#c8d6e8',
      textSubtle: '#7e95b2',
      secondaryAccent: '#00529b',
      alertAccent: '#e30613',
      worldGroundBase: '#e4dfd5',
      worldWaterTint: '#147a9c',
      worldWallBase: '#ede8de',
      worldRoofBase: '#9c4132'
    },
    fonts: {
      display: "'Space Grotesk', 'Plus Jakarta Sans', sans-serif",
      serif: "'Cormorant Garamond', Georgia, serif",
      sans: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      mono: "'IBM Plex Mono', 'JetBrains Mono', monospace"
    },
    svgOrnamentPaths: [
      'M0 8 L128 8 M58 2 L70 2 L70 14 L58 14 Z',
      'M0 18 L128 18'
    ]
  }
};
