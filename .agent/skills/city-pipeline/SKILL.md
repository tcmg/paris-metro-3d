---
name: city-pipeline
description: Executes the 4-stage City Ingestion & 3D Generation Pipeline (GeoJSON/OSM, Blender 3D Monuments + Historical Lore, Metro/Rail Transit, and Cultural CSS/UI Theme) for Rio, Sydney, London, NYC, or new cities. Always uses the live Blender MCP server when Blender is open.
---

# Multi-City Ingestion & 3D Generation Pipeline Skill

Use this skill whenever the user asks to kick off, digest, build, or test a city in the multi-city 3D transit & monument visualizer.

## Overview of the 4 Pipeline Stages

Given a `<city>` slug (`rio`, `sydney`, `london`, `nyc`, etc.), `scripts/pipeline/run_city_pipeline.mjs` runs:

1. **Step 1 — GeoJSON, Real Satellite DEM Heightmap & 3D World Geometry (`scripts/pipeline/step1_download_osm_geojson.mjs` + `scripts/pipeline/fetch_dem_heightmap.mjs`)**
   - Queries OpenStreetMap Overpass API for waterways, coastline/harbors, beaches, parks, trees, roads, and tiled building footprints inside the city's bounding box (or upgrades/preserves cached geometry when `--offline` is passed).
   - **Real Satellite DEM Heightmap (`buildCityDemHeightmap`)**: Fetches and caches AWS Open Data Terrarium DEM PNG tiles (`z=12`, ~30m native resolution) across the entire `[-170, +170] × [-130, +130]` world-unit terrain mesh (`171 × 131` vertices, `step = 2.0`), auto-detects the city's water datum (`0m` coastal or inland river elevation such as `78m` in Warsaw), masks `waterPolygons` and `waterCenterlines` to `0.0`, and exports `<CITY>_HEIGHTMAP: CityHeightmapGrid` so `getParisTerrainElevation(x, z)` performs O(1) bilinear interpolation over real satellite topography.
   - Projects all coordinates into local metric world coordinates `(x, z)` and automatically aligns procedural `preset.bridges` (`CityBridgeDef[]`) to matching `isBridge === 1` OSM road segments (`alignBridgesToOsmMap` in `scripts/pipeline/geo_align_monuments.mjs`), writing:
     - `public/data/<city>_osm.json`
     - `src/cities/<city>/geoData.ts`

2. **Step 2 — 3D Monuments in Blender, Map-Aware Alignment & Historical Lore (`scripts/pipeline/step2_monuments_and_blender.mjs` + `scripts/pipeline/geo_align_monuments.mjs` + Live Blender MCP / `scripts/pipeline/blender/build_city_monuments.py`)**
   - Prepares architectural specifications, historical facts, timelines, eras, and tour stops:
     - `public/data/<city>_monuments_spec.json`
     - `src/cities/<city>/historicalData.ts`
   - **MANDATORY MAP-AWARE MONUMENT & BRIDGE ALIGNMENT (`scripts/pipeline/geo_align_monuments.mjs`)**:
     1. **GLB Principal-Axis Inspection (`inspectGlbMonumentBounds`)**: Always parse `public/models/<city>_monuments.glb` binary glTF accessors to measure each `Monument_*` node's true world-space bounding box `(spanX, spanY, spanZ)` and determine its `primaryAxis` (`'X' | 'Z' | 'SQUARE'`).
        - Remember: Blender `+X` exports to Three.js `+X` (East–West when `rotation.y = 0`), which points along `(cos θ, -sin θ)` and requires `θ = atan2(-dz, dx)`. By contrast, Three.js `Z`-aligned spans point along `(sin θ, cos θ)` and require `θ = atan2(dx, dz)`. Never apply a `Z`-axis heading to an `X`-elongated Blender model (which causes a 90° misalignment!).
     2. **Shore-to-Shore Bridge Monument Alignment (`BRIDGE_MONUMENT_SPAN_ENDPOINTS`)**: Major bridge monuments (e.g., Golden Gate Bridge, Sydney Harbour Bridge, Brooklyn Bridge, Dom Luís I Bridge, Rainbow Bridge, Arcos da Lapa) are snapped to the exact bank-to-bank / pylon-to-pylon midpoint and OSM `isBridge === 1` road centerline, rotated according to their GLB `primaryAxis`, and scaled so their deck spans shore-to-shore across the water channel.
     3. **De-duplicating Procedural & OSM Bridge Strips**: In `src/data/parisGeoData.ts` (`PARIS_BRIDGES`) and `src/world/VoxelParisBuilder.ts` (`buildOsmStreets`), suppress duplicate procedural bridges and flat water-level `isBridge === 1` road ribbons whenever a dedicated 3D Blender bridge monument occupies that crossing.
     4. **OSM Building Footprint & Street-Frontage Alignment (`alignMonumentsToOsmMap`)**: Non-bridge monuments are matched against real OpenStreetMap building polygons (`spanLong >= 0.42` world units) in `public/data/<city>_osm.json` and adjacent street segments so their GLB `primaryAxis` (`'X'`, `'Z'`, or `'SQUARE'`) aligns with the real-world building footprint orientation and local street grid.
   - **MANDATORY BLENDER MCP RULE (Always Use Live Blender MCP When Blender Is Open)**:
     1. **Agentic Execution**: Always check if Blender is open first by calling the `blender` MCP server (`get_addon_status` and `get_scene_info`).
     2. When Blender is open, **always** build the city's 3D monuments inside a dedicated scene (`Scene_<City>`, e.g., `Scene_Sydney`, `Scene_NYC`, `Scene_Rio`, `Scene_Warsaw`) via `execute_blender_code` so existing scenes (such as Paris `Scene`) are preserved.
     3. Model each monument as a root `EMPTY` node named `m.nodeName` (e.g., `Monument_sydney_opera_house`) with detailed multi-part architectural child meshes (`bmesh`) and Principled BSDF materials.
     4. **Visually Inspect with `look`**: Call `look` (`mode: "angles"`, `shading: "material"`, `views: ["three_quarter", "front"]`) on `Scene_<City>` to visually verify proportions, silhouettes, and materials before exporting.
     5. Export `public/models/<city>_monuments.glb` directly from the active city scene (`use_active_scene=True`, `export_yup=True`, `export_apply=True`, `export_materials="EXPORT"`), and save the multi-part builder in `scripts/pipeline/blender/mcp_sydney_nyc_builders.py` or `scripts/pipeline/blender/mcp_porto_tokyo_sf_builders.py`.
     6. **Automatic CLI Detection (`runBlenderMonumentBuild`)**: Even when invoked from the Node CLI (`npm run city:pipeline -- --city <city>`), `scripts/pipeline/security_utils.mjs` automatically probes `127.0.0.1:9876` (`isBlenderMcpOpen()`). If Blender is open, the Node script sends `execute_code` directly to the live Blender MCP socket to build `Scene_<City>` and export `public/models/<city>_monuments.glb` live, followed immediately by `alignMonumentsToOsmMap` post-export so the freshly compiled GLB bounding boxes are aligned to `<city>_osm.json`. It only falls back to headless `/Applications/Blender.app/Contents/MacOS/Blender --background` if Blender is closed.

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
     - `porto`: Portuguese Cobalt-Blue Azulejo ceramic tilework, Douro granite & Baroque Talha Dourada gold (`azulejo_cobalt_gold`)
     - `tokyo`: Edo Indigo (Ai-iro), Shinto Vermilion Torii (Shu-iro), Gold Leaf & Neo-Tokyo Metro precision (`edo_vermilion_neo_tokyo`)
     - `san-francisco`: Golden Gate International Orange Art Deco, Bay Fog Slate & Victorian Painted-Lady Gold (`golden_gate_fog_art_deco`)
     - `warsaw`: Polish Crimson & White Eagle (Biało-Czerwoni), Chopin Nocturne Amber-Gold & Old Town Renaissance Sgraffito (`polish_crimson_amber_sgraffito`)
     - `zurich`: Swiss International Typographic Style Grid, SBB Railway Clock Red & Lake Zurich Alpine Cyan (`swiss_grid_sbb_alpine`)
     - `melbourne`: Victorian Gold Rush Bluestone Laneways, W-Class Tram Heritage Green & Gold & Federation Square Fractals (`victorian_bluestone_tram_gold`)
     - `london`: Royal British Sovereign Gold & Velvet Crimson heritage + Edwardian Underground roundel (`royal_edwardian_underground`)

## CLI Commands

- **List available city presets**:
  ```bash
  npm run city:list
  ```
- **Run full 4-stage pipeline for a city (auto-connects to live Blender MCP on `127.0.0.1:9876` if Blender is open, or falls back to headless Blender)**:
  ```bash
  npm run city:pipeline -- --city <rio|sydney|london|nyc|porto|tokyo|san-francisco|warsaw|zurich|melbourne>
  ```
- **Run fast/offline digest**:
  ```bash
  npm run city:pipeline -- --city <rio|sydney|london|nyc|porto|tokyo|san-francisco|warsaw|zurich|melbourne> --offline
  ```
- **Run specific steps only (e.g., Step 2 Blender & Step 4 Cultural CSS)**:
  ```bash
  npm run city:pipeline -- --city <rio|sydney|london|nyc|porto|tokyo|san-francisco|warsaw|zurich|melbourne> --steps 2,4
  ```
