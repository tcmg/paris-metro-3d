#!/usr/bin/env node
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

import fs from 'node:fs';
import path from 'node:path';
import { validateCityId, writeSafeFile, WORKSPACE_ROOT } from './security_utils.mjs';
import { CITY_PRESETS, TODO_CITY_BACKLOG, getCityPreset } from './city_presets.mjs';
import { runStep1OsmGeoJson } from './step1_download_osm_geojson.mjs';
import { runStep2MonumentsAndBlender } from './step2_monuments_and_blender.mjs';
import { runStep3MetroTransit } from './step3_download_metro_transit.mjs';
import { runStep4CulturalUiTheme } from './step4_build_cultural_ui_theme.mjs';

function parseArgs(argv) {
  const args = {
    city: null,
    list: false,
    offline: false,
    skipBlender: false,
    tileGrid: 2,
    steps: new Set([1, 2, 3, 4]),
  };

  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (token === '--list' || token === '-l') {
      args.list = true;
    } else if (token === '--city' || token === '-c') {
      args.city = argv[++i];
    } else if (token.startsWith('--city=')) {
      args.city = token.slice('--city='.length);
    } else if (token === '--offline') {
      args.offline = true;
    } else if (token === '--skip-blender') {
      args.skipBlender = true;
    } else if (token === '--tiles') {
      args.tileGrid = parseInt(argv[++i], 10) || 2;
    } else if (token === '--steps' || token === '-s') {
      const raw = argv[++i] || '';
      const parsed = raw
        .split(',')
        .map((n) => parseInt(n.trim(), 10))
        .filter((n) => n >= 1 && n <= 4);
      if (parsed.length > 0) {
        args.steps = new Set(parsed);
      }
    } else if (!token.startsWith('-') && !args.city) {
      args.city = token;
    }
  }

  return args;
}

function printCityCatalog() {
  console.log('\n====================================================================');
  console.log('  MULTI-CITY INGESTION & 3D GENERATION PIPELINE — CONFIGURED PRESETS');
  console.log('====================================================================\n');

  for (const preset of Object.values(CITY_PRESETS)) {
    const manifestPath = path.join(WORKSPACE_ROOT, 'src', 'cities', preset.id, 'manifest.json');
    const isBuilt = fs.existsSync(manifestPath);
    const statusBadge = isBuilt ? '[BUILT ✓]' : '[READY TO KICK OFF]';
    console.log(`• ${preset.id.padEnd(8)} | ${preset.name} (${preset.country}) ${statusBadge}`);
    console.log(`           | Metro System : ${preset.metroSystemName} (${preset.metroLines.length} lines, ${preset.railTermini.length} rail termini)`);
    console.log(`           | 3D Monuments : ${preset.monuments.length} Blender archetypes (${preset.monuments.map((m) => m.name).slice(0, 4).join(', ')}...)`);
    console.log(`           | Cultural UI  : ${preset.uiTheme.themeName} [${preset.uiTheme.culturalVibe}]`);
    console.log('');
  }

  console.log('====================================================================');
  console.log('  TODO CITY BACKLOG (QUEUED FOR PRESET & PIPELINE INGESTION)');
  console.log('====================================================================\n');

  for (const todo of TODO_CITY_BACKLOG) {
    console.log(`• ${todo.id.padEnd(14)} | ${todo.name} (${todo.country}) [TODO]`);
    console.log(`                 | Transit      : ${todo.plannedTransit}`);
    console.log(`                 | Monuments    : ${todo.plannedMonuments}`);
    console.log(`                 | Cultural UI  : ${todo.plannedCulturalVibe}`);
    console.log('');
  }

  console.log('Usage Examples:');
  console.log('  npm run city:pipeline -- --city rio');
  console.log('  npm run city:pipeline -- --city sydney');
  console.log('  npm run city:pipeline -- --city london');
  console.log('  npm run city:pipeline -- --city nyc');
  console.log('  npm run city:pipeline -- --city rio --offline --steps 1,2,3,4\n');
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.list || !args.city) {
    printCityCatalog();
    if (!args.list && !args.city) {
      process.exitCode = 1;
    }
    return;
  }

  const safeCityId = validateCityId(args.city);
  const preset = getCityPreset(safeCityId);
  const startedAt = new Date().toISOString();

  console.log('\n====================================================================');
  console.log(`  STARTING CITY PIPELINE FOR: ${preset.name.toUpperCase()} (${safeCityId})`);
  console.log(`  Country: ${preset.country} | Cultural Vibe: ${preset.uiTheme.themeName}`);
  console.log(`  Steps: [${Array.from(args.steps).join(', ')}] | Offline: ${args.offline} | Skip Blender: ${args.skipBlender}`);
  console.log('====================================================================');

  const existingManifestFile = path.join(WORKSPACE_ROOT, 'src', 'cities', safeCityId, 'manifest.json');
  let prevManifest = {};
  if (fs.existsSync(existingManifestFile)) {
    try {
      prevManifest = JSON.parse(fs.readFileSync(existingManifestFile, 'utf8'));
    } catch {
      prevManifest = {};
    }
  }

  const summary = {
    cityId: safeCityId,
    cityName: preset.name,
    country: preset.country,
    startedAt: prevManifest.startedAt || startedAt,
    completedSteps: Array.from(new Set([...(prevManifest.completedSteps || []), ...args.steps])).sort(),
    outputs: { ...(prevManifest.outputs || {}) },
  };

  if (args.steps.has(1)) {
    summary.outputs.step1 = await runStep1OsmGeoJson(safeCityId, {
      offline: args.offline,
      tileGrid: args.tileGrid,
    });
  }

  if (args.steps.has(2)) {
    summary.outputs.step2 = await runStep2MonumentsAndBlender(safeCityId, {
      skipBlender: args.skipBlender,
    });
  }

  if (args.steps.has(3)) {
    summary.outputs.step3 = await runStep3MetroTransit(safeCityId, {
      offline: args.offline,
    });
  }

  if (args.steps.has(4)) {
    summary.outputs.step4 = await runStep4CulturalUiTheme(safeCityId);
  }

  summary.completedAt = new Date().toISOString();
  const manifestPath = writeSafeFile(
    `src/cities/${safeCityId}/manifest.json`,
    JSON.stringify(summary, null, 2)
  );

  console.log('\n====================================================================');
  console.log(`  [✓] PIPELINE COMPLETE FOR ${preset.name.toUpperCase()} (${safeCityId})`);
  console.log(`  Manifest written to: ${manifestPath}`);
  console.log('====================================================================\n');
}

main().catch((err) => {
  console.error('\n[Pipeline Error]:', err.message || err);
  process.exit(1);
});
