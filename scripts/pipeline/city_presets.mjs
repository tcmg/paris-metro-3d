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

import { RIO_PRESET } from './presets/rio.mjs';
import { SYDNEY_PRESET } from './presets/sydney.mjs';
import { LONDON_PRESET } from './presets/london.mjs';
import { NYC_PRESET } from './presets/nyc.mjs';

const ARCHETYPE_SVG_PATHS = {
  christ_statue: 'M30 8 L34 8 L34 16 L54 16 L54 22 L35 22 L36 46 L42 46 L42 54 L22 54 L22 46 L28 46 L29 22 L10 22 L10 16 L30 16 Z',
  sugarloaf_cableway: 'M6 52 Q18 14 28 52 M26 52 Q36 28 44 52 M24 22 L56 36 M46 52 Q54 34 60 52',
  stadium_bowl: 'M8 38 Q32 22 56 38 L52 48 Q32 54 12 48 Z M14 38 Q32 30 50 38',
  calatrava_cantilever: 'M6 44 L58 26 L48 44 L14 48 Z M18 48 L46 48',
  aqueduct_arches: 'M6 48 L6 30 L58 30 L58 48 M12 48 A5 8 0 0 1 22 48 M27 48 A5 8 0 0 1 37 48 M42 48 A5 8 0 0 1 52 48',
  conical_cathedral: 'M14 52 L24 12 L40 12 L50 52 Z M32 12 L32 52',
  beaux_arts_opera: 'M10 50 L10 30 L20 22 L44 22 L54 30 L54 50 Z M22 22 A10 10 0 0 1 42 22',
  niemeyer_apoteose_arch: 'M12 52 L12 36 Q32 18 52 36 L52 52 M20 52 L20 40 Q32 28 44 40 L44 52',
  clock_tower_terminus: 'M12 52 L52 52 L52 38 L38 38 L38 10 L32 6 L26 10 L26 38 L12 38 Z',
  grand_palace_facade: 'M8 50 L8 28 L18 20 L26 28 L38 28 L46 20 L56 28 L56 50 Z',
  opera_house_sails: 'M8 48 L56 48 M12 48 Q16 18 28 48 M24 48 Q30 14 42 48 M38 48 Q44 24 54 48',
  steel_arch_bridge: 'M6 44 Q32 12 58 44 M6 38 L58 38 M12 48 L12 28 M52 48 L52 28',
  observation_needle: 'M28 54 L30 24 L24 20 L24 16 L40 16 L40 20 L34 24 L36 54 M32 16 L32 6',
  domed_sandstone_arcade: 'M8 50 L8 32 L56 32 L56 50 Z M22 32 A10 10 0 0 1 42 32 M32 22 L32 14',
  twin_spire_cathedral: 'M14 52 L14 24 L20 8 L26 24 L38 24 L44 8 L50 24 L50 52 Z',
  twin_tower_gateway: 'M14 52 L18 14 L26 14 L28 52 M36 52 L38 14 L46 14 L50 52 M8 38 L56 38',
  twisting_glass_tower: 'M22 52 L18 32 L26 10 L40 14 L44 34 L38 52 Z',
  westminster_big_ben: 'M10 50 L44 50 L44 32 L10 32 Z M44 50 L52 50 L52 14 L48 6 L44 14 Z',
  tower_bridge_bascule: 'M14 50 L14 16 L22 16 L22 50 M42 50 L42 16 L50 16 L50 50 M22 22 L42 22 M6 42 L26 36 M38 36 L58 42',
  baroque_dome_cathedral: 'M12 50 L12 34 L52 34 L52 50 Z M20 34 A12 14 0 0 1 44 34 M32 20 L32 10',
  norman_four_turret_keep: 'M14 50 L14 16 L20 16 L20 24 L44 24 L44 16 L50 16 L50 50 Z',
  ferris_wheel: 'M32 28 m-18 0 a18 18 0 1 0 36 0 a18 18 0 1 0 -36 0 M20 52 L32 28 L44 52',
  shard_glass_pyramid: 'M22 52 L31 6 L34 10 L42 52 Z',
  empire_state_tower: 'M18 52 L18 40 L24 40 L24 20 L28 20 L28 12 L32 4 L36 12 L36 20 L40 20 L40 40 L46 40 L46 52 Z',
  chrysler_sunburst_tower: 'M20 52 L20 36 L26 36 L26 18 L32 4 L38 18 L38 36 L44 36 L44 52 Z',
  statue_of_liberty: 'M22 54 L22 38 L42 38 L42 54 M26 38 L28 18 L24 8 L28 8 L30 16 L36 18 L38 38 Z',
  gothic_suspension_bridge: 'M16 50 L16 18 L24 18 L24 50 M40 50 L40 18 L48 18 L48 50 M6 40 Q20 22 32 38 Q44 22 58 40',
  one_wtc_and_oculus: 'M16 52 L20 12 L24 4 L28 12 L32 52 M36 50 Q46 34 58 42 L48 50 Z',
  beaux_arts_terminus: 'M8 50 L8 26 L56 26 L56 50 Z M16 50 L16 34 A6 6 0 0 1 28 34 L28 50 M36 50 L36 34 A6 6 0 0 1 48 34 L48 50',
  flatiron_wedge: 'M16 52 L28 12 L48 22 L48 52 Z',
  art_deco_slab: 'M22 52 L22 10 L42 10 L42 52 Z M16 52 L16 26 L22 26 M42 26 L48 26 L48 52',
};

export function getArchetypeSvgPath(archetype) {
  return ARCHETYPE_SVG_PATHS[archetype] || ARCHETYPE_SVG_PATHS.art_deco_slab;
}

function normalizeCityPreset(raw) {
  const id = raw.id || raw.cityId;
  const name = raw.name || raw.cityName;
  const country = raw.country || raw.countryName;
  const geo = {
    centerLat: raw.geo.centerLat,
    centerLon: raw.geo.centerLon,
    mPerDegLat: raw.geo.mPerDegLat || Math.round((raw.geo.kmPerDegLat || 111.132) * 1000),
    mPerDegLon: raw.geo.mPerDegLon || Math.round((raw.geo.kmPerDegLon || 102.45) * 1000),
    kmPerDegLat: raw.geo.kmPerDegLat || (raw.geo.mPerDegLat ? raw.geo.mPerDegLat / 1000 : 111.132),
    kmPerDegLon: raw.geo.kmPerDegLon || (raw.geo.mPerDegLon ? raw.geo.mPerDegLon / 1000 : 102.45),
    worldUnitsPerKm: raw.geo.worldUnitsPerKm || 10.8,
    coreRadiusKm: raw.geo.coreRadiusKm || 7.5,
    isCoastal: Boolean(raw.geo.isCoastal),
    bbox: raw.geo.bbox,
    defaultElevationMeters: raw.geo.defaultElevationMeters ?? 4,
  };

  const waterCenterlines = raw.waterCenterlines || [];
  let waterBodies = raw.waterBodies || [];
  if (waterBodies.length === 0 && Array.isArray(raw.waterCenterlines)) {
    waterBodies = [
      {
        id: `${id}_bay_shoreline`,
        name: `${name} Primary Waterway`,
        kind: 'bay',
        type: 'polyline',
        widthMeters: 320,
        pathLatLon: raw.waterCenterlines.map(([lat, lon]) => [lat, lon]),
      },
    ];
  }

  const topography = (raw.topography || []).map((t, idx) => ({
    id: t.id || `${id}_peak_${idx + 1}`,
    name: t.name,
    lat: t.lat,
    lon: t.lon,
    peakElevationMeters: t.peakElevationMeters ?? Math.round((t.height || 1.2) * 300),
    radiusMeters: t.radiusMeters ?? Math.round((t.rx || 6) * 260),
    steepness: t.steepness ?? 1.8,
    ridgeAzimuthDeg: t.ridgeAzimuthDeg ?? 0,
    ridgeElongation: t.ridgeElongation ?? 1.2,
  }));

  const monuments = (raw.monuments || []).map((m, idx) => {
    const cleanNode =
      m.nodeName ||
      `Monument_${String(m.id || idx)
        .replace(/^monument-/, '')
        .replace(/[^a-zA-Z0-9]+/g, '_')}`;
    return {
      id: m.id,
      nodeName: cleanNode,
      name: m.name,
      localName: m.localName || m.name,
      year: m.year ?? m.builtYear ?? 1900,
      completedYear: m.completedYear ?? m.builtYear ?? m.year ?? 1900,
      architect: m.architect || m.style || 'Historic Architect',
      architecturalStyle: m.architecturalStyle || m.style || 'Monumental Architecture',
      lat: m.lat,
      lon: m.lon,
      baseElevationMeters: m.baseElevationMeters ?? 0,
      scale: m.scale ?? 1.0,
      rotationY: m.rotationY ?? 0,
      primaryColor: m.primaryColor || '#e8e4dc',
      secondaryColor: m.secondaryColor || '#8a99ad',
      accentColor: m.accentColor || '#d4af37',
      archetype: m.archetype || 'beaux_arts_opera',
      fact: m.fact || m.description || '',
      facts: m.facts || [m.fact || m.description || ''],
      historicalSummary: m.historicalSummary || m.description || m.fact || '',
      metroConnection:
        m.metroConnection ||
        (Array.isArray(m.connectedLines) ? `Connected via ${m.connectedLines.join(', ')}` : 'Central Transit Hub'),
    };
  });

  const milestones = (raw.milestones || []).map((ms) => ({
    year: ms.year,
    title: ms.title || ms.shortLabel || String(ms.year),
    description: ms.description || ms.headline || '',
    category: ms.category || 'metro',
  }));

  const eras = (raw.eras || []).map((e, idx) => ({
    id: e.id || `${id}_era_${idx + 1}`,
    name: e.name || e.title || e.eraTag,
    yearRange: e.yearRange || [e.startYear || 1890, e.endYear || 2026],
    tagline: e.tagline || e.eraTag || '',
    summary: e.summary || e.description || '',
  }));

  const metroLines = (raw.metroLines || []).map((l) => ({
    line: l.line || l.id || l.shortLabel,
    name: l.name,
    color: l.color,
    textColor: l.textColor || '#ffffff',
    openedYear: l.openedYear || 1900,
    rollingStockStyle: l.rollingStockStyle || l.historicCompany || 'Modern Transit',
    stations: (l.stations || []).map((st) => ({
      name: st.name,
      lat: st.lat,
      lon: st.lon,
      year: st.year ?? st.openedYear ?? l.openedYear ?? 1900,
      fact: st.fact || st.description || st.architecture || '',
      isGhost: Boolean(st.isGhost || st.isGhostStation),
    })),
  }));

  const railTermini = (raw.railTermini || []).map((rt) => ({
    id: rt.id,
    name: rt.name,
    year: rt.year ?? rt.openedYear ?? 1900,
    lat: rt.lat,
    lon: rt.lon,
    azimuth: rt.azimuth ?? rt.rotationY ?? 0,
    color: rt.color || rt.colorHex || '#f7c948',
    fact: rt.fact || rt.description || '',
    destinations: rt.destinations || rt.destinationLabel || '',
    trainType: rt.trainType || rt.modernNetwork || 'Suburban & Intercity Rail',
    trackPathsLatLon: rt.trackPathsLatLon || (rt.corridorLatLon ? [rt.corridorLatLon] : []),
  }));

  const districts = (raw.districts || []).map((d) => ({
    id: d.id,
    number: d.number,
    name: d.name,
    localLabel: d.localLabel || d.shortLabel || d.name,
    subtitle: d.subtitle || d.eraBadge || d.officialName || '',
    lat: d.lat,
    lon: d.lon,
    yearEstablished: d.yearEstablished || 1850,
    population: d.population || 'Historic District',
    landmarks: Array.isArray(d.landmarks)
      ? d.landmarks
      : typeof d.notableLandmarks === 'string'
        ? d.notableLandmarks.split(',').map((s) => s.trim())
        : [],
    fact: d.fact || d.history || '',
  }));

  const tourStops = (raw.tourStops || []).map((ts) => ({
    id: ts.id,
    title: ts.title,
    year: ts.year ?? ts.timelineYear ?? 1931,
    lat: ts.lat,
    lon: ts.lon,
    cameraOffset: ts.cameraOffset || [240, 180, 260],
    narrative: ts.narrative || ts.fact || '',
    highlightMonumentId: ts.highlightMonumentId || ts.monumentId,
    highlightStationName: ts.highlightStationName || ts.stationId,
  }));

  let uiTheme = raw.uiTheme;
  if (!uiTheme.themeName) {
    const pal = uiTheme.palette || {};
    const vibeByCity = {
      rio: 'carnival_copacabana_wave',
      sydney: 'aboriginal_ochre_dot_art',
      london: 'royal_edwardian_underground',
      nyc: 'gotham_art_deco_vignelli',
    };
    const badgeByCity = {
      rio: 'beveled-carnival',
      sydney: 'ochre-dot-ring',
      london: 'roundel',
      nyc: 'octagon-deco',
    };
    uiTheme = {
      cityId: id,
      themeName: uiTheme.culturalMovement || `${name} Cultural Heritage Theme`,
      culturalVibe: vibeByCity[id] || 'custom_cultural_theme',
      inspirationSummary:
        uiTheme.hudSubtitle ||
        uiTheme.culturalMovement ||
        `${name} cultural and architectural UI theme.`,
      typography: {
        displayFont: uiTheme.fonts?.display || "'Syne', 'Cinzel Decorative', sans-serif",
        bodyFont: uiTheme.fonts?.sans || "'Plus Jakarta Sans', sans-serif",
        monoFont: uiTheme.fonts?.mono || "'JetBrains Mono', monospace",
      },
      cssVariables: {
        '--city-bg-primary': pal.bgObsidian || '#05151f',
        '--city-bg-glass': pal.bgPanel || 'rgba(6, 24, 36, 0.86)',
        '--city-bg-card': pal.bgPanelElevated || 'rgba(10, 34, 48, 0.94)',
        '--city-text-primary': pal.textPrimary || '#fcf9f0',
        '--city-text-muted': pal.textDim || '#b8d0c8',
        '--city-accent-primary': pal.primaryBright || '#f4c430',
        '--city-accent-secondary': pal.secondaryAccent || '#009b3a',
        '--city-accent-tertiary': pal.alertAccent || '#ff3b7f',
        '--city-border-color': pal.borderSubtle || 'rgba(244, 196, 48, 0.42)',
        '--city-badge-bg': `linear-gradient(135deg, ${pal.secondaryAccent || '#009b3a'} 0%, ${pal.primaryBright || '#f4c430'} 100%)`,
        '--city-badge-text': pal.bgObsidian || '#05151f',
        '--city-water-color': pal.worldWaterTint || '#0d6e8a',
        '--city-park-color': '#1b7a43',
        '--city-terrain-color': pal.worldGroundBase || '#e6dcc5',
      },
      patternSvgDataUri: '',
      badgeShape: badgeByCity[id] || 'pill',
    };
  }

  return {
    id,
    name,
    localName: raw.localName || name,
    country,
    region: raw.region || country,
    tagline: raw.tagline || raw.uiTheme?.hudSubtitle || `${name} 3D Architecture & Transit`,
    metroSystemName: raw.metroSystemName || raw.uiTheme?.networkTitle || `${name} Metro`,
    timelineRange: raw.timelineRange || [1890, 2026],
    geo,
    waterCenterlines,
    waterBodies,
    beaches: raw.beaches || [],
    parks: raw.parks || [],
    bridges: raw.bridges || [],
    places: raw.places || [],
    topography,
    monuments,
    milestones,
    eras,
    metroLines,
    railTermini,
    districts,
    tourStops,
    uiTheme,
    rawPreset: raw,
  };
}

export const CITY_PRESETS = {
  rio: normalizeCityPreset(RIO_PRESET),
  sydney: normalizeCityPreset(SYDNEY_PRESET),
  london: normalizeCityPreset(LONDON_PRESET),
  nyc: normalizeCityPreset(NYC_PRESET),
};

export const TODO_CITY_BACKLOG = [
  {
    id: 'san-francisco',
    name: 'San Francisco',
    country: 'United States',
    plannedTransit: 'BART Transbay Tube, Muni Metro & Historic Cable Cars (1873–2026)',
    plannedMonuments: 'Golden Gate Bridge, Transamerica Pyramid, Coit Tower, Ferry Building, Palace of Fine Arts, Painted Ladies, Salesforce Tower, Alcatraz',
    plannedCulturalVibe: 'Fog City Victorian Haight-Ashbury Psychedelia & Golden Gate International Orange',
  },
  {
    id: 'las-vegas',
    name: 'Las Vegas',
    country: 'United States',
    plannedTransit: 'Las Vegas Monorail, Vegas Loop & Historic Union Pacific Depot (1905–2026)',
    plannedMonuments: 'Welcome to Fabulous Las Vegas Sign, Stratosphere Tower, Bellagio Fountains & Conservatory, Luxor Pyramid & Sky Beam, Sphere at The Venetian, Hoover Dam Bypass, Fremont Street Canopy',
    plannedCulturalVibe: 'Vintage Neon Boneyard Googie Architecture & Desert Mirage Gold',
  },
  {
    id: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    plannedTransit: 'Kyoto Municipal Subway (Karasuma & Tozai Lines), Keihan, Hankyu, Randen Tram & Tokaido Shinkansen (1895–2026)',
    plannedMonuments: 'Fushimi Inari Senbon Torii, Kinkaku-ji (Golden Pavilion), Kiyomizu-dera Wooden Stage, To-ji Five-Story Pagoda, Kyoto Station Futuristic Matrix, Yasaka Pagoda, Nijo Castle, Kyoto Tower',
    plannedCulturalVibe: 'Heian Lacquerware Vermilion, Gold Leaf (Kinpaku), Bamboo Ink Wash & Washi Paper',
  },
  {
    id: 'melbourne',
    name: 'Melbourne',
    country: 'Australia',
    plannedTransit: 'Melbourne Tramway Grid (World’s Largest), City Loop Underground & 2025 Metro Tunnel (1854–2026)',
    plannedMonuments: 'Flinders Street Station Dome & Clocks, Royal Exhibition Building, Shrine of Remembrance, Federation Square Geometric Facade, Eureka / Melbourne Skydeck, MCG Stadium Bowl, Arts Centre Spire, Bolte Bridge',
    plannedCulturalVibe: 'Victorian Gold Rush Bluestone Laneways, Street-Art Stencil & W-Class Tram Green/Gold',
  },
  {
    id: 'porto',
    name: 'Porto',
    country: 'Portugal',
    plannedTransit: 'Metro do Porto (Lines A–G across Dom Luís I Upper Deck), Historic Elétrico Trams & São Bento Rail Terminus (1872–2026)',
    plannedMonuments: 'Ponte Dom Luís I (Double-Deck Iron Arch), Torre dos Clérigos, Casa da Música (Koolhaas Polyhedron), Estação de São Bento, Sé do Porto, Palácio da Bolsa, Livraria Lello, Caves de Vinho do Porto',
    plannedCulturalVibe: 'Cobalt-Blue & White Portuguese Azulejo Ceramic Tilework & Douro Port Wine Terracotta',
  },
  {
    id: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    plannedTransit: 'Transports Metropolitans de Barcelona (TMB Lines L1–L11, 1924 Gran Metro), FGC & Estació de França / Sants (1848–2026)',
    plannedMonuments: 'Basílica de la Sagrada Família, Casa Batlló, Casa Milà (La Pedrera), Torre Glòries (Agbar), Arc de Triomf, Palau Nacional de Montjuïc, Columbus Monument, W Barcelona (Hotel Vela)',
    plannedCulturalVibe: 'Catalan Modernisme (Antoni Gaudí Trencadís Mosaic) & Cerdà Eixample Octagonal Chamfers',
  },
];

export function getCityPreset(cityId) {
  const normalized = cityId.toLowerCase();
  if (CITY_PRESETS[normalized]) {
    return CITY_PRESETS[normalized];
  }
  throw new Error(
    `Unknown city preset "${cityId}". Supported built-in presets: ${Object.keys(CITY_PRESETS).join(', ')}`
  );
}
