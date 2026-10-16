---
name: city-pipeline
description: Executes the 4-stage City Ingestion & 3D Generation Pipeline (GeoJSON/OSM, Blender 3D Monuments + Historical Lore, Metro/Rail Transit, and Cultural CSS/UI Theme) for Rio, Sydney, London, NYC, or new cities.
---

# Multi-City Ingestion & 3D Generation Pipeline Skill

Use this skill whenever the user asks to kick off, digest, build, or test a city in the multi-city 3D transit & monument visualizer.

## Overview of the 4 Pipeline Stages

Given a `<city>` slug (`rio`, `sydney`, `london`, `nyc`), `scripts/pipeline/run_city_pipeline.mjs` runs:

1. **Step 1 — GeoJSON & 3D World Geometry (`scripts/pipeline/step1_download_osm_geojson.mjs`)**
   - Queries OpenStreetMap Overpass API for waterways, coastline/harbors, beaches, parks, trees, roads, and tiled building footprints inside the city's bounding box (or synthesizes curated geometry when `--offline` is passed).
   - Projects all coordinates into local metric world coordinates `(x, z)` and writes:
     - `public/data/<city>_osm.json`
     - `src/cities/<city>/geoData.ts`

2. **Step 2 — 3D Monuments in Blender & Historical Lore (`scripts/pipeline/step2_monuments_and_blender.mjs` + `scripts/pipeline/blender/build_city_monuments.py`)**
   - Prepares architectural specifications, historical facts, timelines, eras, and tour stops:
     - `public/data/<city>_monuments_spec.json`
     - `src/cities/<city>/historicalData.ts`
   - Runs headless Blender (`/Applications/Blender.app/Contents/MacOS/Blender -b -P scripts/pipeline/blender/build_city_monuments.py`) to construct low-poly multi-material PBR 3D monuments and exports:
     - `public/models/<city>_monuments.glb`
   - *Optional Live Blender MCP Inspection*: You can also execute `build_city_monuments_from_spec` inside the live `blender` MCP server (`execute_blender_code` + `look`) to visually inspect and refine individual monuments interactively.

3. **Step 3 — Metro / Subway & Rail System (`scripts/pipeline/step3_download_metro_transit.mjs`)**
   - Queries Overpass for live subway/light-rail station coordinates and combines them with the curated historical line network, rolling stock styles, ghost stations, mainline rail termini, and city districts:
     - `src/cities/<city>/metroData.ts`
     - `src/cities/<city>/railTerminiData.ts`
     - `src/cities/<city>/districtsData.ts`

4. **Step 4 — Cultural CSS / UI Theme (`scripts/pipeline/step4_build_cultural_ui_theme.mjs`)**
   - Generates culturally tailored CSS variables, SVG motifs, typography, and badge styling scoped to `:root[data-city-theme="<city>"]`:
     - `src/styles/themes/<city>.css`
     - `src/cities/<city>/uiTheme.ts`
     - `src/cities/<city>/index.ts`
   - Cultural Vibes:
     - `rio`: Brazilian Carnival & Roberto Burle Marx Copacabana *calçadão* waves (`carnival_copacabana_wave`)
     - `sydney`: First Nations Aboriginal dot-art concentric *ngura* rings & sandstone ochre earth (`aboriginal_ochre_dot_art`)
     - `nyc`: Gotham Skyscraper Art Deco (Chrysler brass/verdigris) & Massimo Vignelli Subway modernism (`gotham_art_deco_vignelli`)
     - `london`: Royal British Sovereign Gold & Velvet Crimson heritage + Edwardian Underground roundel (`royal_edwardian_underground`)

## CLI Commands

- **List available city presets**:
  ```bash
  npm run city:list
  ```
- **Run full 4-stage pipeline for a city (with live Overpass + headless Blender)**:
  ```bash
  npm run city:pipeline -- --city <rio|sydney|london|nyc>
  ```
- **Run fast/offline digest (curated preset geometry + headless Blender GLB generation)**:
  ```bash
  npm run city:pipeline -- --city <rio|sydney|london|nyc> --offline
  ```
- **Run specific steps only (e.g., Step 2 Blender & Step 4 Cultural CSS)**:
  ```bash
  npm run city:pipeline -- --city <rio|sydney|london|nyc> --steps 2,4
  ```
