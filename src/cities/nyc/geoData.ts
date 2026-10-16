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

export const NYC_GEO_CONFIG: CityGeoConfig = {
  "centerLat": 40.742,
  "centerLon": -73.988,
  "mPerDegLat": 111050,
  "mPerDegLon": 84320,
  "kmPerDegLat": 111.05,
  "kmPerDegLon": 84.32,
  "worldUnitsPerKm": 10.2,
  "coreRadiusKm": 8.2,
  "isCoastal": true,
  "bbox": [
    40.685,
    -74.048,
    40.805,
    -73.93
  ],
  "defaultElevationMeters": 4
};

export function latLonToNycWorld(
  lat: number,
  lon: number
): [number, number] {
  const rawKmX = (lon - NYC_GEO_CONFIG.centerLon) * (NYC_GEO_CONFIG.kmPerDegLon ?? 90);
  const rawKmZ = -(lat - NYC_GEO_CONFIG.centerLat) * (NYC_GEO_CONFIG.kmPerDegLat ?? 111.1);
  const distKm = Math.hypot(rawKmX, rawKmZ);
  const coreRadiusKm = NYC_GEO_CONFIG.coreRadiusKm ?? 7.5;
  const worldUnitsPerKm = NYC_GEO_CONFIG.worldUnitsPerKm ?? 10.8;
  let effectiveKm = distKm;
  if (distKm > coreRadiusKm) {
    effectiveKm = coreRadiusKm + Math.log1p((distKm - coreRadiusKm) * 0.30) * 5.6;
  }
  const scale = distKm > 0.0001 ? (effectiveKm / distKm) * worldUnitsPerKm : worldUnitsPerKm;
  return [Math.round(rawKmX * scale * 100) / 100, Math.round(rawKmZ * scale * 100) / 100];
}

export const NYC_WATER_CENTERLINES: [number, number, number][] = [
  [
    40.805,
    -73.978,
    5.2
  ],
  [
    40.775,
    -73.998,
    5.4
  ],
  [
    40.745,
    -74.014,
    5.5
  ],
  [
    40.715,
    -74.02,
    5.8
  ],
  [
    40.695,
    -74.028,
    6.4
  ],
  [
    40.7,
    -74.006,
    3.4
  ],
  [
    40.7061,
    -73.9969,
    3.1
  ],
  [
    40.7135,
    -73.98,
    3.4
  ],
  [
    40.742,
    -73.968,
    3.6
  ],
  [
    40.76,
    -73.956,
    3.5
  ]
];

export const NYC_BRIDGES: CityBridgeDef[] = [
  {
    "id": "bridge-brooklyn",
    "name": "Brooklyn Bridge",
    "lat": 40.7061,
    "lon": -73.9969,
    "builtYear": 1883,
    "lengthWorld": 4.8,
    "widthWorld": 0.48,
    "rotationY": -0.78,
    "style": "suspension"
  },
  {
    "id": "bridge-manhattan",
    "name": "Manhattan Bridge (BMT / IND Subway Tracks)",
    "lat": 40.7075,
    "lon": -73.9908,
    "builtYear": 1909,
    "lengthWorld": 4.9,
    "widthWorld": 0.52,
    "rotationY": -0.92,
    "style": "suspension"
  },
  {
    "id": "bridge-williamsburg",
    "name": "Williamsburg Bridge (J/M/Z Elevated Tracks)",
    "lat": 40.7135,
    "lon": -73.9722,
    "builtYear": 1903,
    "lengthWorld": 5.1,
    "widthWorld": 0.5,
    "rotationY": -0.25,
    "style": "suspension"
  },
  {
    "id": "bridge-queensboro",
    "name": "Ed Koch Queensboro Bridge (59th Street Bridge)",
    "lat": 40.757,
    "lon": -73.9545,
    "builtYear": 1909,
    "lengthWorld": 5.4,
    "widthWorld": 0.48,
    "rotationY": -0.48,
    "style": "iron-arch"
  }
];

export const NYC_PARKS: CityParkDef[] = [
  {
    "name": "Central Park (Olmsted & Vaux Greensward)",
    "lat": 40.7812,
    "lon": -73.9665,
    "rx": 4.4,
    "rz": 18.5,
    "rotation": 0.5,
    "hasBasin": true
  },
  {
    "name": "Battery Park",
    "lat": 40.7033,
    "lon": -74.017,
    "rx": 2.8,
    "rz": 3.2,
    "rotation": 0
  },
  {
    "name": "Bryant Park & NY Public Library Terrace",
    "lat": 40.7536,
    "lon": -73.9832,
    "rx": 1.8,
    "rz": 2.2,
    "rotation": 0.5,
    "hasBasin": true
  },
  {
    "name": "Washington Square Park",
    "lat": 40.7308,
    "lon": -73.9973,
    "rx": 2,
    "rz": 1.8,
    "rotation": 0.5,
    "hasBasin": true
  },
  {
    "name": "Union Square & Madison Square",
    "lat": 40.7359,
    "lon": -73.9911,
    "rx": 1.8,
    "rz": 2.4,
    "rotation": 0.5
  }
];

export const NYC_PLACES: CityPlaceDef[] = [
  {
    "name": "Times Square (Crossroads of the World)",
    "lat": 40.758,
    "lon": -73.9855,
    "radius": 2.6,
    "hasColumnOrObelisk": true
  },
  {
    "name": "Grand Army Plaza (59th St & Fifth Ave)",
    "lat": 40.7644,
    "lon": -73.9732,
    "radius": 2.2
  },
  {
    "name": "Columbus Circle",
    "lat": 40.7681,
    "lon": -73.9819,
    "radius": 2.3,
    "hasColumnOrObelisk": true
  },
  {
    "name": "City Hall Park & Foley Square",
    "lat": 40.7128,
    "lon": -74.006,
    "radius": 2.5
  }
];

export const NYC_WATER_BODIES: CityWaterBody[] = [
  {
    "id": "nyc_bay_shoreline",
    "name": "New York City Primary Waterway",
    "kind": "bay",
    "type": "polyline",
    "widthMeters": 320,
    "pathLatLon": [
      [
        40.805,
        -73.978
      ],
      [
        40.775,
        -73.998
      ],
      [
        40.745,
        -74.014
      ],
      [
        40.715,
        -74.02
      ],
      [
        40.695,
        -74.028
      ],
      [
        40.7,
        -74.006
      ],
      [
        40.7061,
        -73.9969
      ],
      [
        40.7135,
        -73.98
      ],
      [
        40.742,
        -73.968
      ],
      [
        40.76,
        -73.956
      ]
    ]
  }
];

export const NYC_TOPOGRAPHY: CityTopographyPeak[] = [
  {
    "id": "nyc_peak_1",
    "name": "Morningside Heights & Harlem Schist Ridge",
    "x": 21.93,
    "z": -74.19,
    "lat": 40.8075,
    "lon": -73.9625,
    "peakElevationMeters": 174,
    "radiusMeters": 1690,
    "steepness": 1.8,
    "ridgeAzimuthDeg": 0,
    "ridgeElongation": 1.2
  },
  {
    "id": "nyc_peak_2",
    "name": "Murray Hill & Midtown Bedrock",
    "x": 8.17,
    "z": -6.57,
    "lat": 40.7478,
    "lon": -73.9785,
    "peakElevationMeters": 84,
    "radiusMeters": 1300,
    "steepness": 1.8,
    "ridgeAzimuthDeg": 0,
    "ridgeElongation": 1.2
  },
  {
    "id": "nyc_peak_3",
    "name": "Brooklyn Heights Bluff",
    "x": -6.02,
    "z": 52.1,
    "lat": 40.696,
    "lon": -73.995,
    "peakElevationMeters": 126,
    "radiusMeters": 1430,
    "steepness": 1.8,
    "ridgeAzimuthDeg": 0,
    "ridgeElongation": 1.2
  },
  {
    "id": "nyc_peak_4",
    "name": "Hudson Palisades Escarpment",
    "x": -25.8,
    "z": -37.38,
    "lat": 40.775,
    "lon": -74.018,
    "peakElevationMeters": 285,
    "radiusMeters": 1170,
    "steepness": 1.8,
    "ridgeAzimuthDeg": 0,
    "ridgeElongation": 1.2
  }
];
