---
name: city-pipeline
description: Executes the 4-stage City Ingestion & 3D Generation Pipeline (GeoJSON/OSM, Blender 3D Monuments + Historical Lore, Metro/Rail Transit, and Cultural CSS/UI Theme) for Rio, Sydney, London, NYC, or new cities. Always uses the live Blender MCP server when Blender is open.
---

# Multi-City Ingestion & 3D Generation Pipeline Skill

Use this skill whenever the user asks to kick off, digest, build, or test a city in the multi-city 3D transit & monument visualizer.

## Overview of the 4 Pipeline Stages

Given a `<city>` slug (`rio`, `sydney`, `london`, `nyc`, etc.), `scripts/pipeline/run_city_pipeline.mjs` runs:

1. **Step 1 — GeoJSON & 3D World Geometry (`scripts/pipeline/step1_download_osm_geojson.mjs`)**
   - Queries OpenStreetMap Overpass API for waterways, coastline/harbors, beaches, parks, trees, roads, and tiled building footprints inside the city's bounding box (or synthesizes curated geometry when `--offline` is passed).
   - Projects all coordinates into local metric world coordinates `(x, z)` and writes:
     - `public/data/<city>_osm.json`
     - `src/cities/<city>/geoData.ts`

2. **Step 2 — 3D Monuments in Blender & Historical Lore (`scripts/pipeline/step2_monuments_and_blender.mjs` + Live Blender MCP / `scripts/pipeline/blender/build_city_monuments.py`)**
   - Prepares architectural specifications, historical facts, timelines, eras, and tour stops:
     - `public/data/<city>_monuments_spec.json`
     - `src/cities/<city>/historicalData.ts`
   - **MANDATORY BLENDER MCP RULE (Always Use Live Blender MCP When Blender Is Open)**:
     1. **Agentic Execution**: Always check if Blender is open first by calling the `blender` MCP server (`get_addon_status` and `get_scene_info`).
     2. When Blender is open, **always** build the city's 3D monuments inside a dedicated scene (`Scene_<City>`, e.g., `Scene_Sydney`, `Scene_NYC`, `Scene_Rio`, `Scene_London`) via `execute_blender_code` so existing scenes (such as Paris `Scene`) are preserved.
     3. Model each monument as a root `EMPTY` node named `m.nodeName` (e.g., `Monument_sydney_opera_house`) with detailed multi-part architectural child meshes (`bmesh`) and Principled BSDF materials.
     4. **Visually Inspect with `look`**: Call `look` (`mode: "angles"`, `shading: "material"`, `views: ["three_quarter", "front"]`) on `Scene_<City>` to visually verify proportions, silhouettes, and materials before exporting.
     5. Export `public/models/<city>_monuments.glb` directly from the active city scene (`use_active_scene=True`, `export_yup=True`, `export_apply=True`, `export_materials="EXPORT"`), and save the multi-part builder in `scripts/pipeline/blender/mcp_sydney_nyc_builders.py` (or city builder module).
     6. **Automatic CLI Detection (`runBlenderMonumentBuild`)**: Even when invoked from the Node CLI (`npm run city:pipeline -- --city <city>`), `scripts/pipeline/security_utils.mjs` automatically probes `127.0.0.1:9876` (`isBlenderMcpOpen()`). If Blender is open, the Node script sends `execute_code` directly to the live Blender MCP socket to build `Scene_<City>` and export `public/models/<city>_monuments.glb` live. It only falls back to headless `/Applications/Blender.app/Contents/MacOS/Blender --background` if Blender is closed.

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
- **Run full 4-stage pipeline for a city (auto-connects to live Blender MCP on `127.0.0.1:9876` if Blender is open, or falls back to headless Blender)**:
  ```bash
  npm run city:pipeline -- --city <rio|sydney|london|nyc>
  ```
- **Run fast/offline digest**:
  ```bash
  npm run city:pipeline -- --city <rio|sydney|london|nyc> --offline
  ```
- **Run specific steps only (e.g., Step 2 Blender & Step 4 Cultural CSS)**:
  ```bash
  npm run city:pipeline -- --city <rio|sydney|london|nyc> --steps 2,4
  ```
