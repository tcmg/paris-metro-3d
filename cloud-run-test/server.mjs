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

import http from 'node:http';

const PORT = Number.parseInt(process.env.PORT || '8080', 10);

// Rate limiting per IP (120 requests per minute)
const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 120;
const requestCounts = new Map();

function isRateLimited(clientKey) {
  const now = Date.now();
  const entry = requestCounts.get(clientKey);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    requestCounts.set(clientKey, { windowStart: now, count: 1 });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_REQUESTS_PER_WINDOW;
}

// Strict CORS origin allow-list (no wildcard '*')
const ALLOWED_ORIGINS = new Set([
  'https://paris-metro-511808.web.app',
  'https://paris-metro-511808.firebaseapp.com',
  'https://paris-metro-apphost--paris-metro-511808.europe-west4.hosted.app',
  'http://127.0.0.1:5173',
  'http://localhost:5173',
  'http://127.0.0.1:4173',
]);

// TODO(security): Enforce Cloud Run IAM / OAuth 2.0 authentication if private admin or write endpoints are added.
// TODO(security): Add MFA and session management if user accounts are introduced.
const BASE_SECURITY_HEADERS = {
  'Content-Security-Policy':
    "default-src 'self'; script-src 'self'; style-src 'self'; object-src 'none'; frame-ancestors 'none'; base-uri 'self'",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Type': 'application/json; charset=utf-8',
};

function buildHeaders(req, cacheControl = 'no-store') {
  const origin = req.headers.origin;
  const headers = {
    ...BASE_SECURITY_HEADERS,
    'Cache-Control': cacheControl,
  };
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Access-Control-Allow-Methods'] = 'GET, HEAD, OPTIONS';
    headers['Vary'] = 'Origin';
  }
  return headers;
}

const WMO_WEATHER_LABELS = {
  0: { en: 'Clear sky', fr: 'Ciel dégagé' },
  1: { en: 'Mainly clear', fr: 'Peu nuageux' },
  2: { en: 'Partly cloudy', fr: 'Partiellement nuageux' },
  3: { en: 'Overcast', fr: 'Couvert' },
  45: { en: 'Fog', fr: 'Brouillard' },
  48: { en: 'Depositing rime fog', fr: 'Brouillard givrant' },
  51: { en: 'Light drizzle', fr: 'Bruine légère' },
  53: { en: 'Moderate drizzle', fr: 'Bruine modérée' },
  55: { en: 'Dense drizzle', fr: 'Bruine dense' },
  61: { en: 'Slight rain', fr: 'Pluie faible' },
  63: { en: 'Moderate rain', fr: 'Pluie modérée' },
  65: { en: 'Heavy rain', fr: 'Pluie forte' },
  71: { en: 'Slight snow', fr: 'Neige faible' },
  80: { en: 'Rain showers', fr: 'Averses de pluie' },
  95: { en: 'Thunderstorm', fr: 'Orage' },
};

/**
 * Maps WMO weather_code + precipitation + cloud_cover to the client web app's
 * `WeatherModeId` ('clear' | 'cloudy' | 'rain' | 'fog') in `SkyWeatherSystem.ts`.
 */
function mapToClientWeatherMode(weatherCode, precipitationMm, cloudCoverPercent) {
  if (weatherCode === 45 || weatherCode === 48) {
    return 'fog';
  }
  if (
    (weatherCode >= 51 && weatherCode <= 67) ||
    (weatherCode >= 71 && weatherCode <= 86) ||
    weatherCode >= 95 ||
    (precipitationMm ?? 0) > 0.05
  ) {
    return 'rain';
  }
  if (weatherCode === 2 || weatherCode === 3 || (cloudCoverPercent ?? 0) >= 45) {
    return 'cloudy';
  }
  return 'clear';
}

/**
 * Computes current Paris local time as float hours (0..24) and "HH:MM" string,
 * matching `SkyWeatherSystem.setTimeOfDay(hours)` and `SceneManager.AtmosphereModeId`.
 */
function getParisTimeAndAtmosphere() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Paris',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date());

  const hour = Number.parseInt(parts.find((p) => p.type === 'hour')?.value || '14', 10);
  const minute = Number.parseInt(parts.find((p) => p.type === 'minute')?.value || '0', 10);
  const timeOfDayHours = Number((hour + minute / 60).toFixed(2));
  const timeString = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;

  let atmosphereMode = 'day';
  if (timeOfDayHours >= 5.5 && timeOfDayHours < 8.5) {
    atmosphereMode = 'dawn';
  } else if (timeOfDayHours >= 8.5 && timeOfDayHours < 17.5) {
    atmosphereMode = 'day';
  } else if (timeOfDayHours >= 17.5 && timeOfDayHours < 21.0) {
    atmosphereMode = 'dusk';
  } else {
    atmosphereMode = 'night';
  }

  return { timeOfDayHours, timeString, atmosphereMode };
}

/**
 * Normalizes IDFM `shortname_line` ("3B", "7B", "1".."14") to match the client web app's
 * `MetroLineConfig.id` and `shortLabel` in `src/data/parisMetroData.ts`.
 */
function normalizeClientLineIds(idfmShortName) {
  const raw = String(idfmShortName || '').trim().toUpperCase();
  if (raw === '3B' || raw === '3 BIS') {
    return { clientId: '3bis', shortLabel: '3b' };
  }
  if (raw === '7B' || raw === '7 BIS') {
    return { clientId: '7bis', shortLabel: '7b' };
  }
  const clean = raw.toLowerCase();
  return { clientId: clean, shortLabel: clean };
}

// In-memory Stale-While-Revalidate cache store
const WEATHER_TTL_MS = 5 * 60 * 1000; // 5 minutes
const METRO_TTL_MS = 3 * 60 * 1000; // 3 minutes
const FETCH_TIMEOUT_MS = 8_000;

const cacheStore = {
  weather: {
    data: null,
    updatedAt: 0,
    expiresAt: 0,
    refreshing: null,
    hits: 0,
    lastError: null,
  },
  metro: {
    data: null,
    updatedAt: 0,
    expiresAt: 0,
    refreshing: null,
    hits: 0,
    lastError: null,
  },
};

async function fetchJsonWithTimeout(url, headers = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'ParisMetroLumiere-AppHosting-Cache/1.0',
        ...headers,
      },
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} from ${url}`);
    }
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

function parseFrenchNumber(val) {
  if (val === null || val === undefined || val === 'ND') return null;
  const num = Number.parseFloat(String(val).replace(',', '.'));
  return Number.isFinite(num) ? num : null;
}

async function fetchParisWeatherLive() {
  const url =
    'https://api.open-meteo.com/v1/forecast?latitude=48.8566&longitude=2.3522&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,cloud_cover,wind_speed_10m&hourly=temperature_2m,precipitation_probability,weather_code&forecast_days=1&timezone=Europe%2FParis';
  const raw = await fetchJsonWithTimeout(url);
  const current = raw.current || {};
  const code = current.weather_code ?? 0;
  const condition = WMO_WEATHER_LABELS[code] || { en: 'Variable', fr: 'Variable' };

  const weatherMode = mapToClientWeatherMode(
    code,
    current.precipitation,
    current.cloud_cover,
  );
  const { timeOfDayHours, timeString, atmosphereMode } = getParisTimeAndAtmosphere();

  return {
    source: 'Open-Meteo Paris (48.8566°N, 2.3522°E)',
    observedAt: current.time || new Date().toISOString(),
    timezone: raw.timezone || 'Europe/Paris',
    /**
     * Directly consumable by `SceneManager`, `SkyWeatherSystem`, and `VoxelParisBuilder`
     * in the client web application (`src/scene/SkyWeatherSystem.ts` & `src/scene/SceneManager.ts`).
     */
    clientSceneState: {
      weatherMode, // 'clear' | 'cloudy' | 'rain' | 'fog' (WeatherModeId)
      atmosphereMode, // 'dawn' | 'day' | 'dusk' | 'night' (AtmosphereModeId)
      timeOfDay: timeOfDayHours, // 0..24 float hours for skyWeather.setTimeOfDay()
      timeString, // "HH:MM" in Europe/Paris
      surfaceWetSheen: weatherMode === 'rain', // for voxelParis.setWeatherSurfaceSheen()
      isDaylight: Boolean(current.is_day),
    },
    current: {
      temperatureC: current.temperature_2m ?? null,
      feelsLikeC: current.apparent_temperature ?? null,
      humidityPercent: current.relative_humidity_2m ?? null,
      precipitationMm: current.precipitation ?? 0,
      cloudCoverPercent: current.cloud_cover ?? null,
      windSpeedKmh: current.wind_speed_10m ?? null,
      isDay: Boolean(current.is_day),
      weatherCode: code,
      conditionEn: condition.en,
      conditionFr: condition.fr,
    },
    hourlyForecast: (raw.hourly?.time || []).map((time, idx) => {
      const hCode = raw.hourly?.weather_code?.[idx] ?? 0;
      const hProb = raw.hourly?.precipitation_probability?.[idx] ?? 0;
      return {
        time,
        hour: idx,
        temperatureC: raw.hourly?.temperature_2m?.[idx] ?? null,
        precipitationProbabilityPercent: hProb,
        weatherCode: hCode,
        weatherMode: mapToClientWeatherMode(hCode, hProb >= 60 ? 0.5 : 0, hCode >= 2 ? 60 : 15),
      };
    }),
  };
}

async function fetchParisMetroLive() {
  const linesUrl =
    'https://data.iledefrance-mobilites.fr/api/explore/v2.1/catalog/datasets/referentiel-des-lignes/records?where=transportmode=%22metro%22&limit=25';
  const qualityUrl =
    'https://data.iledefrance-mobilites.fr/api/explore/v2.1/catalog/datasets/indicateurs-qualite-service-sncf-ratp/records?where=operatorname=%22RATP%22%20AND%20transportmode=%22M%C3%A9tro%22&order_by=year%20DESC&limit=20';
  const franklinUrl =
    'https://data.ratp.fr/api/explore/v2.1/catalog/datasets/qualite-de-lair-mesuree-dans-la-station-franklin-d-roosevelt-2021-maintenant/records?order_by=dateheure%20DESC&limit=1';
  const stGermainUrl =
    'https://data.ratp.fr/api/explore/v2.1/catalog/datasets/qualite-de-lair-mesuree-dans-la-station-saint-germain-des-pres-de-2024-a-nos-jours-/records?order_by=dateheure%20DESC&limit=1';
  const ienaUrl =
    'https://data.ratp.fr/api/explore/v2.1/catalog/datasets/qualite-de-lair-mesuree-dans-la-station-iena-de-2025-a-nos-jours/records?order_by=dateheure%20DESC&limit=1';
  const chateletUrl =
    'https://data.ratp.fr/api/explore/v2.1/catalog/datasets/qualite-de-lair-mesuree-dans-la-station-chatelet-rer-a0/records?order_by=dateheure%20DESC&limit=1';
  const auberUrl =
    'https://data.ratp.fr/api/explore/v2.1/catalog/datasets/qualite-de-lair-mesuree-dans-la-station-auber-2021-a-nos-jours/records?order_by=dateheure%20DESC&limit=1';

  const [linesRes, qualityRes, franklinRes, stGermainRes, ienaRes, chateletRes, auberRes] =
    await Promise.allSettled([
      fetchJsonWithTimeout(linesUrl),
      fetchJsonWithTimeout(qualityUrl),
      fetchJsonWithTimeout(franklinUrl),
      fetchJsonWithTimeout(stGermainUrl),
      fetchJsonWithTimeout(ienaUrl),
      fetchJsonWithTimeout(chateletUrl),
      fetchJsonWithTimeout(auberUrl),
    ]);

  const rawQuality = qualityRes.status === 'fulfilled' ? qualityRes.value.results || [] : [];
  const serviceQualityMetrics = rawQuality.map((q) => ({
    theme: q.theme,
    indicator: q.indicator,
    submode: q.transportsubmode,
    lines: (q.name_line || []).map((n) => normalizeClientLineIds(n).clientId),
    period: `${q.year} ${q.trimester || ''}`.trim(),
    scorePercent: q.percent_result ?? null,
    targetPercent: q.objectif_reference_contrat ?? null,
  }));

  // Index quality scores by normalized client lineId ('1'..'14', '3bis', '7bis')
  const lineQualityLookup = new Map();
  for (const metric of serviceQualityMetrics) {
    if (metric.scorePercent === null) continue;
    for (const lineId of metric.lines) {
      if (!lineQualityLookup.has(lineId)) {
        lineQualityLookup.set(lineId, []);
      }
      lineQualityLookup.get(lineId).push(metric);
    }
  }

  const rawLines = linesRes.status === 'fulfilled' ? linesRes.value.results || [] : [];
  const lines = rawLines
    .map((line) => {
      const { clientId, shortLabel } = normalizeClientLineIds(
        line.shortname_line || line.name_line,
      );
      const metricsForLine = lineQualityLookup.get(clientId) || [];
      const avgScore =
        metricsForLine.length > 0
          ? Number(
              (
                metricsForLine.reduce((acc, m) => acc + (m.scorePercent || 0), 0) /
                metricsForLine.length
              ).toFixed(1),
            )
          : 98.5;
      const isOperational = line.status === 'active';

      return {
        /** Matches `MetroLineConfig.id` in `src/data/parisMetroData.ts` ('1'..'14', '3bis', '7bis') */
        id: clientId,
        shortLabel,
        idfmLineId: line.id_line,
        name: `Line ${clientId}`,
        operator: line.operatorname || 'RATP',
        status: line.status || 'active',
        trafficState: isOperational ? 'normal' : 'planned',
        trafficLabelEn: isOperational
          ? 'Normal service across the line'
          : line.notice_text || 'Grand Paris Express — under construction',
        trafficLabelFr: isOperational
          ? 'Trafic normal sur l’ensemble de la ligne'
          : line.notice_text || 'Grand Paris Express — prochainement active',
        /** Multiplier for `SegmentRuntime.trainSpeed` in `MetroNetworkRenderer.ts` */
        trainSpeedMultiplier: isOperational ? 1.0 : 0.0,
        serviceQualityPercent: avgScore,
        colorHex: line.colourweb_hexa ? `#${line.colourweb_hexa}` : '#ffffff',
        textColorHex: line.textcolourweb_hexa ? `#${line.textcolourweb_hexa}` : '#000000',
        airConditioning: line.air_conditioning || 'unknown',
        accessible: line.accessibility === 'true',
        automated: ['1', '4', '14', '15', '18'].includes(clientId),
      };
    })
    .sort((a, b) =>
      String(a.id).localeCompare(String(b.id), undefined, { numeric: true }),
    );

  /** O(1) dictionary keyed by `MetroLineConfig.id` ('1', '2', '3', '3bis', ..., '14') */
  const linesById = Object.fromEntries(lines.map((l) => [l.id, l]));

  /**
   * Station underground telemetry keyed by `MetroStationData.id` in `STATIONS_MAP`
   * (`src/data/parisMetroData.ts`).
   */
  const stationsById = {};
  const undergroundStations = [];

  function registerStationSensor(stationId, entry) {
    stationsById[stationId] = entry;
    undergroundStations.push(entry);
  }

  if (franklinRes.status === 'fulfilled' && franklinRes.value.results?.[0]) {
    const r = franklinRes.value.results[0];
    registerStationSensor('franklin-roosevelt', {
      stationId: 'franklin-roosevelt', // Matches STATIONS_MAP.get('franklin-roosevelt')
      stationName: 'Franklin D. Roosevelt',
      lineIds: ['1', '9'],
      sensorLine: '1',
      measuredAt: r.dateheure,
      temperatureC: parseFrenchNumber(r.tfra1),
      humidityPercent: parseFrenchNumber(r.hyfra1),
      co2Ppm: parseFrenchNumber(r.c2fra1),
      pm10UgM3: parseFrenchNumber(r['10fra1']),
      no2UgM3: parseFrenchNumber(r.n2fra1),
    });
  }

  if (stGermainRes.status === 'fulfilled' && stGermainRes.value.results?.[0]) {
    const r = stGermainRes.value.results[0];
    registerStationSensor('saint-germain-des-pres', {
      stationId: 'saint-germain-des-pres', // Matches STATIONS_MAP.get('saint-germain-des-pres')
      stationName: 'Saint-Germain-des-Prés',
      lineIds: ['4'],
      sensorLine: '4',
      measuredAt: r.dateheure,
      temperatureC: parseFrenchNumber(r.tstger4),
      humidityPercent: parseFrenchNumber(r.hystger4),
      co2Ppm: null,
      pm10UgM3: parseFrenchNumber(r['10stger4']),
      no2UgM3: null,
    });
  }

  if (ienaRes.status === 'fulfilled' && ienaRes.value.results?.[0]) {
    const r = ienaRes.value.results[0];
    registerStationSensor('trocadero', {
      stationId: 'trocadero', // Matches STATIONS_MAP.get('trocadero') on Line 9 (Iéna/Trocadéro sector)
      stationName: 'Iéna – Trocadéro',
      lineIds: ['6', '9'],
      sensorLine: '9',
      measuredAt: r.dateheure,
      temperatureC: parseFrenchNumber(r.tiena9),
      humidityPercent: parseFrenchNumber(r.hiena9),
      co2Ppm: null,
      pm10UgM3: parseFrenchNumber(r['10iena9']),
      no2UgM3: null,
    });
  }

  if (chateletRes.status === 'fulfilled' && chateletRes.value.results?.[0]) {
    const r = chateletRes.value.results[0];
    registerStationSensor('chatelet', {
      stationId: 'chatelet', // Matches STATIONS_MAP.get('chatelet')
      stationName: 'Châtelet – Les Halles',
      lineIds: ['1', '4', '7', '11', '14'],
      sensorLine: 'RER A / Hub',
      measuredAt: r.dateheure,
      temperatureC: parseFrenchNumber(r.tchata),
      humidityPercent: parseFrenchNumber(r.hychata),
      co2Ppm: null,
      pm10UgM3: parseFrenchNumber(r['10chata']),
      no2UgM3: null,
    });
  }

  if (auberRes.status === 'fulfilled' && auberRes.value.results?.[0]) {
    const r = auberRes.value.results[0];
    registerStationSensor('opera', {
      stationId: 'opera', // Matches STATIONS_MAP.get('opera') (Auber–Opéra hub)
      stationName: 'Opéra – Auber',
      lineIds: ['3', '7', '8'],
      sensorLine: 'RER A / Hub',
      measuredAt: r.dateheure,
      temperatureC: parseFrenchNumber(r.tauba),
      humidityPercent: parseFrenchNumber(r.hyauba),
      co2Ppm: parseFrenchNumber(r.c2auba),
      pm10UgM3: parseFrenchNumber(r['10auba']),
      pm25UgM3: parseFrenchNumber(r['25auba']),
      no2UgM3: parseFrenchNumber(r.n2auba),
    });
  }

  const avgUndergroundTempC =
    undergroundStations.length > 0
      ? Number(
          (
            undergroundStations.reduce((sum, s) => sum + (s.temperatureC || 0), 0) /
            undergroundStations.length
          ).toFixed(1),
        )
      : null;

  return {
    sources: [
      'Île-de-France Mobilités Open Data v2.1 (data.iledefrance-mobilites.fr)',
      'RATP SQUALES Underground Telemetry v2.1 (data.ratp.fr)',
    ],
    summary: {
      totalLinesTracked: lines.length,
      activeLinesCount: lines.filter((l) => l.status === 'active').length,
      upcomingGrandParisLinesCount: lines.filter((l) => l.status !== 'active').length,
      undergroundSensorsReporting: undergroundStations.length,
      averageUndergroundTempC: avgUndergroundTempC,
    },
    /** Keyed by `MetroLineConfig.id` ('1'..'14', '3bis', '7bis') for direct O(1) lookup */
    linesById,
    /** Keyed by `MetroStationData.id` ('chatelet', 'opera', 'franklin-roosevelt', 'saint-germain-des-pres', 'trocadero') */
    stationsById,
    undergroundStationTelemetry: undergroundStations,
    serviceQualityMetrics,
    lines,
  };
}

async function getCachedResource(key, fetcher, ttlMs) {
  const bucket = cacheStore[key];
  const now = Date.now();

  if (bucket.data && now < bucket.expiresAt) {
    bucket.hits += 1;
    return {
      data: bucket.data,
      cacheMeta: {
        status: 'HIT',
        cachedAt: new Date(bucket.updatedAt).toISOString(),
        expiresAt: new Date(bucket.expiresAt).toISOString(),
        ageSeconds: Math.round((now - bucket.updatedAt) / 1000),
        ttlSeconds: Math.round(ttlMs / 1000),
        totalHits: bucket.hits,
      },
    };
  }

  if (bucket.data && now >= bucket.expiresAt) {
    if (!bucket.refreshing) {
      bucket.refreshing = fetcher()
        .then((fresh) => {
          const finishedAt = Date.now();
          bucket.data = fresh;
          bucket.updatedAt = finishedAt;
          bucket.expiresAt = finishedAt + ttlMs;
          bucket.lastError = null;
        })
        .catch((err) => {
          bucket.lastError = err instanceof Error ? err.message : String(err);
        })
        .finally(() => {
          bucket.refreshing = null;
        });
    }
    bucket.hits += 1;
    return {
      data: bucket.data,
      cacheMeta: {
        status: 'STALE_WHILE_REVALIDATE',
        cachedAt: new Date(bucket.updatedAt).toISOString(),
        expiresAt: new Date(bucket.expiresAt).toISOString(),
        ageSeconds: Math.round((now - bucket.updatedAt) / 1000),
        ttlSeconds: Math.round(ttlMs / 1000),
        totalHits: bucket.hits,
      },
    };
  }

  if (!bucket.refreshing) {
    bucket.refreshing = fetcher()
      .then((fresh) => {
        const finishedAt = Date.now();
        bucket.data = fresh;
        bucket.updatedAt = finishedAt;
        bucket.expiresAt = finishedAt + ttlMs;
        bucket.lastError = null;
        return fresh;
      })
      .finally(() => {
        bucket.refreshing = null;
      });
  }

  const freshData = await bucket.refreshing;
  return {
    data: freshData,
    cacheMeta: {
      status: 'MISS_FETCHED_LIVE',
      cachedAt: new Date(bucket.updatedAt).toISOString(),
      expiresAt: new Date(bucket.expiresAt).toISOString(),
      ageSeconds: 0,
      ttlSeconds: Math.round(ttlMs / 1000),
      totalHits: bucket.hits,
    },
  };
}

const ALLOWED_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

const server = http.createServer(async (req, res) => {
  const clientIp = req.socket.remoteAddress || 'unknown';
  if (isRateLimited(clientIp)) {
    res.writeHead(429, buildHeaders(req));
    res.end(JSON.stringify({ error: 'Too Many Requests' }));
    return;
  }

  if (!req.method || !ALLOWED_METHODS.has(req.method)) {
    res.writeHead(405, {
      ...buildHeaders(req),
      Allow: 'GET, HEAD, OPTIONS',
    });
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    return;
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(204, buildHeaders(req));
    res.end();
    return;
  }

  const url = new URL(req.url || '/', 'http://localhost');

  if (url.pathname === '/healthz') {
    res.writeHead(200, buildHeaders(req));
    res.end(
      JSON.stringify({
        status: 'ok',
        service: 'paris-metro-apphost-cache',
        weatherCached: Boolean(cacheStore.weather.data),
        metroCached: Boolean(cacheStore.metro.data),
      }),
    );
    return;
  }

  try {
    if (url.pathname === '/api/weather') {
      const weather = await getCachedResource('weather', fetchParisWeatherLive, WEATHER_TTL_MS);
      res.writeHead(
        200,
        buildHeaders(req, 'public, max-age=60, s-maxage=300, stale-while-revalidate=600'),
      );
      res.end(
        JSON.stringify(
          {
            service: 'paris-metro-apphost-cache',
            endpoint: '/api/weather',
            cache: weather.cacheMeta,
            weather: weather.data,
          },
          null,
          2,
        ),
      );
      return;
    }

    if (url.pathname === '/api/metro') {
      const metro = await getCachedResource('metro', fetchParisMetroLive, METRO_TTL_MS);
      res.writeHead(
        200,
        buildHeaders(req, 'public, max-age=60, s-maxage=180, stale-while-revalidate=300'),
      );
      res.end(
        JSON.stringify(
          {
            service: 'paris-metro-apphost-cache',
            endpoint: '/api/metro',
            cache: metro.cacheMeta,
            metro: metro.data,
          },
          null,
          2,
        ),
      );
      return;
    }

    if (url.pathname === '/' || url.pathname === '/api/paris-live') {
      const [weather, metro] = await Promise.all([
        getCachedResource('weather', fetchParisWeatherLive, WEATHER_TTL_MS),
        getCachedResource('metro', fetchParisMetroLive, METRO_TTL_MS),
      ]);

      const surfaceTemp = weather.data.current.temperatureC;
      const undergroundTemp = metro.data.summary.averageUndergroundTempC;
      const tempDeltaUndergroundVsSurfaceC =
        surfaceTemp !== null && undergroundTemp !== null
          ? Number((undergroundTemp - surfaceTemp).toFixed(1))
          : null;

      res.writeHead(
        200,
        buildHeaders(req, 'public, max-age=60, s-maxage=180, stale-while-revalidate=300'),
      );
      res.end(
        JSON.stringify(
          {
            service: 'paris-metro-apphost-cache',
            project: 'paris-metro-511808',
            endpoints: {
              combined: '/api/paris-live',
              weatherOnly: '/api/weather',
              metroOnly: '/api/metro',
              health: '/healthz',
            },
            cache: {
              weather: weather.cacheMeta,
              metro: metro.cacheMeta,
            },
            /**
             * Top-level normalized state ready for direct injection into `SceneManager`,
             * `SkyWeatherSystem`, `VoxelParisBuilder`, `MetroNetworkRenderer`, and `ArtDecoHUD`.
             */
            clientSync: {
              ...weather.data.clientSceneState,
              surfaceTemperatureC: surfaceTemp,
              averageUndergroundTemperatureC: undergroundTemp,
              tempDeltaUndergroundVsSurfaceC,
              activeMetroLinesCount: metro.data.summary.activeLinesCount,
              linesById: metro.data.linesById,
              stationsById: metro.data.stationsById,
            },
            weather: weather.data,
            metro: metro.data,
          },
          null,
          2,
        ),
      );
      return;
    }

    res.writeHead(404, buildHeaders(req));
    res.end(JSON.stringify({ error: 'Not Found' }));
  } catch (err) {
    console.error('Failed to serve cached Paris live data:', err);
    res.writeHead(502, buildHeaders(req));
    res.end(JSON.stringify({ error: 'Upstream data temporarily unavailable' }));
  }
});

// Warm the cache on server startup
Promise.allSettled([
  getCachedResource('weather', fetchParisWeatherLive, WEATHER_TTL_MS),
  getCachedResource('metro', fetchParisMetroLive, METRO_TTL_MS),
]).then(() => {
  console.log('Initial Paris weather + RATP/IDFM metro cache warm-up finished.');
});

if (process.env.K_SERVICE) {
  server.listen(PORT, () => {
    console.log(`Cloud Run / App Hosting server listening on port ${PORT}`);
  });
} else {
  server.listen(PORT, '127.0.0.1', () => {
    console.log(`Local test server listening on http://127.0.0.1:${PORT}`);
  });
}
