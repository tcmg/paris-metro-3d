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

import type {
  CityGeoConfig,
  CityWaterBody,
  CityTopographyPeak,
  CityBridgeDef,
  CityParkDef,
  CityPlaceDef,
} from '../types';

export const SYDNEY_GEO_CONFIG: CityGeoConfig = {
  "centerLat": -33.865,
  "centerLon": 151.2094,
  "mPerDegLat": 111100,
  "mPerDegLon": 92380,
  "kmPerDegLat": 111.1,
  "kmPerDegLon": 92.38,
  "worldUnitsPerKm": 11.2,
  "coreRadiusKm": 7.2,
  "isCoastal": true,
  "bbox": [
    -33.905,
    151.165,
    -33.825,
    151.28
  ],
  "defaultElevationMeters": 4
};

export function latLonToSydneyWorld(
  lat: number,
  lon: number
): [number, number] {
  const rawKmX = (lon - SYDNEY_GEO_CONFIG.centerLon) * (SYDNEY_GEO_CONFIG.kmPerDegLon ?? 90);
  const rawKmZ = -(lat - SYDNEY_GEO_CONFIG.centerLat) * (SYDNEY_GEO_CONFIG.kmPerDegLat ?? 111.1);
  const distKm = Math.hypot(rawKmX, rawKmZ);
  const coreRadiusKm = SYDNEY_GEO_CONFIG.coreRadiusKm ?? 7.5;
  const worldUnitsPerKm = SYDNEY_GEO_CONFIG.worldUnitsPerKm ?? 10.8;
  let effectiveKm = distKm;
  if (distKm > coreRadiusKm) {
    effectiveKm = coreRadiusKm + Math.log1p((distKm - coreRadiusKm) * 0.30) * 5.6;
  }
  const scale = distKm > 0.0001 ? (effectiveKm / distKm) * worldUnitsPerKm : worldUnitsPerKm;
  return [Math.round(rawKmX * scale * 100) / 100, Math.round(rawKmZ * scale * 100) / 100];
}

export const SYDNEY_WATER_CENTERLINES: [number, number, number][] = [
  [
    -33.852,
    151.178,
    3.2
  ],
  [
    -33.8565,
    151.196,
    3.4
  ],
  [
    -33.8523,
    151.2108,
    3.1
  ],
  [
    -33.8548,
    151.2185,
    3.8
  ],
  [
    -33.852,
    151.236,
    4.4
  ],
  [
    -33.844,
    151.262,
    4.8
  ]
];

export const SYDNEY_BRIDGES: CityBridgeDef[] = [
  {
    "id": "bridge-sydney-harbour",
    "name": "Sydney Harbour Bridge (\"The Coathanger\")",
    "lat": -33.8523,
    "lon": 151.2108,
    "builtYear": 1932,
    "lengthWorld": 6.2,
    "widthWorld": 0.62,
    "rotationY": 0.42,
    "style": "iron-arch"
  },
  {
    "id": "bridge-anzac",
    "name": "ANZAC Bridge (Glebe Island)",
    "lat": -33.8688,
    "lon": 151.1858,
    "builtYear": 1995,
    "lengthWorld": 4.5,
    "widthWorld": 0.48,
    "rotationY": -0.38,
    "style": "cable-stayed"
  },
  {
    "id": "bridge-pyrmont",
    "name": "Pyrmont Swing Bridge (Darling Harbour)",
    "lat": -33.8705,
    "lon": 151.1985,
    "builtYear": 1902,
    "lengthWorld": 2.8,
    "widthWorld": 0.34,
    "rotationY": 1.48,
    "style": "bascule"
  }
];

export const SYDNEY_PARKS: CityParkDef[] = [
  {
    "name": "Royal Botanic Garden & The Domain (Wuganmagulya)",
    "lat": -33.8642,
    "lon": 151.2166,
    "rx": 6.5,
    "rz": 8.2,
    "rotation": 0.1,
    "hasBasin": true
  },
  {
    "name": "Hyde Park",
    "lat": -33.8731,
    "lon": 151.2113,
    "rx": 2.6,
    "rz": 5.2,
    "rotation": 0.18,
    "hasBasin": true
  },
  {
    "name": "Barangaroo Reserve (Wulugul)",
    "lat": -33.8572,
    "lon": 151.2012,
    "rx": 3,
    "rz": 4.5,
    "rotation": 0.05
  },
  {
    "name": "Centennial Parklands",
    "lat": -33.8965,
    "lon": 151.2335,
    "rx": 8.5,
    "rz": 7.5,
    "rotation": 0,
    "hasBasin": true
  },
  {
    "name": "Victoria Park & University Grounds",
    "lat": -33.8855,
    "lon": 151.1935,
    "rx": 3.6,
    "rz": 3.2,
    "rotation": 0
  }
];

export const SYDNEY_PLACES: CityPlaceDef[] = [
  {
    "name": "Circular Quay (Warrane)",
    "lat": -33.8612,
    "lon": 151.2108,
    "radius": 2.8
  },
  {
    "name": "Martin Place Civic Spine",
    "lat": -33.8678,
    "lon": 151.2095,
    "radius": 2.4,
    "hasColumnOrObelisk": true
  },
  {
    "name": "Taylor Square (Oxford Street)",
    "lat": -33.8805,
    "lon": 151.2175,
    "radius": 2
  },
  {
    "name": "Railway Square (Central)",
    "lat": -33.8838,
    "lon": 151.2045,
    "radius": 2.4
  }
];

export const SYDNEY_WATER_BODIES: CityWaterBody[] = [
  {
    "id": "sydney_bay_shoreline",
    "name": "Sydney Primary Waterway",
    "kind": "bay",
    "type": "polyline",
    "widthMeters": 320,
    "pathLatLon": [
      [
        -33.852,
        151.178
      ],
      [
        -33.8565,
        151.196
      ],
      [
        -33.8523,
        151.2108
      ],
      [
        -33.8548,
        151.2185
      ],
      [
        -33.852,
        151.236
      ],
      [
        -33.844,
        151.262
      ]
    ]
  }
];

export const SYDNEY_TOPOGRAPHY: CityTopographyPeak[] = [
  {
    "id": "sydney_peak_1",
    "name": "Observatory Hill (Cadi)",
    "x": -4.76,
    "z": -6.84,
    "lat": -33.8595,
    "lon": 151.2048,
    "peakElevationMeters": 144,
    "radiusMeters": 1170,
    "steepness": 1.8,
    "ridgeAzimuthDeg": 0,
    "ridgeElongation": 1.2
  },
  {
    "id": "sydney_peak_2",
    "name": "North Shore Sandstone Escarpment",
    "x": -1.97,
    "z": -32.35,
    "lat": -33.839,
    "lon": 151.2075,
    "peakElevationMeters": 216,
    "radiusMeters": 2990,
    "steepness": 1.8,
    "ridgeAzimuthDeg": 0,
    "ridgeElongation": 1.2
  },
  {
    "id": "sydney_peak_3",
    "name": "Paddington & Surry Hills Ridge",
    "x": 13.55,
    "z": 24.26,
    "lat": -33.8845,
    "lon": 151.2225,
    "peakElevationMeters": 186,
    "radiusMeters": 2730,
    "steepness": 1.8,
    "ridgeAzimuthDeg": 0,
    "ridgeElongation": 1.2
  },
  {
    "id": "sydney_peak_4",
    "name": "Mosman & Taronga Headland",
    "x": 33.73,
    "z": -29.24,
    "lat": -33.8415,
    "lon": 151.242,
    "peakElevationMeters": 204,
    "radiusMeters": 2340,
    "steepness": 1.8,
    "ridgeAzimuthDeg": 0,
    "ridgeElongation": 1.2
  },
  {
    "id": "sydney_peak_5",
    "name": "Bondi & Vaucluse Sandstone Cliffs",
    "x": 67.87,
    "z": 13.69,
    "lat": -33.876,
    "lon": 151.275,
    "peakElevationMeters": 225,
    "radiusMeters": 2210,
    "steepness": 1.8,
    "ridgeAzimuthDeg": 0,
    "ridgeElongation": 1.2
  }
];
