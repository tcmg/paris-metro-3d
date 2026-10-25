# 🚇 Lumière 1900–2026: Multi-City 3D Transit & Urban Crisis Simulator

An interactive 3D WebGL/WebGPU urban digital twin, historical transit explorer (`1900–2026`), and multi-modal city crisis simulator built with **Three.js**, **TypeScript**, **Blender MCP**, and **A2UI v0.8**.

🔗 **Live Demo**: [https://paris-metro-511808.web.app](https://paris-metro-511808.web.app)

---

## ✨ Key Capabilities

### 1. Three-Stage Experience Architecture (`Learn` → `Plan` → `Simulate`)
The interface is organized around a strict 3-mode state machine in the top-left dock:

- **`📖 1. Learn` (Explore Mode)**:
  - Inspect underground and elevated **Metro & Rail lines**, interactive **Thermomètre de Ligne** route diagrams, **3D Monuments**, **Historical Districts / Arrondissements**, and curated **Historical Walking Tours**.
  - Scrub or play the **`1900 → 2026` Historical Timeline** to watch lines, stations, and architectural landmarks open chronologically across the city.
  - Toggle **Overground**, **X-Ray Cutaway**, **Underground**, **Grey Paper Architectural Model**, **Lift Metro Network**, and **Real-Time Weather / Sky Cycle** modes.
- **`📋 2. Plan` (Forecast & Scenario Setup)**:
  - Choose from **6 Multi-Modal Urban Scenarios** and preview **Phase 1 Planning Forecasts** (3D warning domes, predicted choke points, and vulnerability callout pins) directly on the 3D map.
  - Select the **Simulation Run Duration** (`30s Sprint`, `60s Standard`, `2m Extended`, `5m Full Crisis`, or custom `15s–300s` slider) and test **Pre-Event Mitigation** before launching.
  - Clicking **`▶ Launch Live Simulation`** is the exclusive gateway into `Simulate` mode.
- **`⚡ 3. Simulate` (Race Condition Engine & A2UI Report Card)**:
  - Locks `Learn` and `Plan` modes while the active simulation mutates the 3D city in real time.
  - Reveals the **Race Condition Simulation Console** (`❚❚ Pause` / `▶ Run`, `1×` / `2×` / `4×` speed multipliers, real-time & simulated city clock progress bar, `🎯 Follow Lead Probe`, `🎲 Feeling Lucky`, `📊 Complete & Score Now`, and `⏹ Cancel / End Simulation`).
  - Compiles a **Post-Simulation Report Card via A2UI v0.8 (`surfaceUpdate`)** when the timer completes, scoring city resilience (`Grade A–D`) across **Forecast vs. Actuals**, **Chronological Event Log**, and **Tier 3 ADK Agent Post-Mortem**.

---

### 2. Six Multi-Modal City Simulation Scenarios (Paris)

| Scenario | Phase 1: Planning Forecast | Phase 2: Live 3D City Impact |
| :--- | :--- | :--- |
| **🚗 Traffic & Grandes Gares** | Predicts carrefour bottlenecks and commuter saturation corridors | Simulates 260+ autonomous vehicles, 300 commuters between the 6 Grandes Gares, multi-phase 3D traffic signals, and vertical congestion heat columns |
| **🏃 Marathon 42K** | Predicts boulevard choke points (Rivoli, Bastille, Alma, Trocadéro) & Metro spillover | Closes 19 crossing axes with 3D barriers, launches 220 runners along the 42.195 km course, and reroutes vehicles via Dijkstra |
| **🔥 Heat Wave 44°C** | Forecasts Urban Heat Islands (`+6.5°C`) and hospital ICU saturation | Dispatches emergency SAMU 75 ambulances and visualizes overwhelmed AP-HP hospitals (Hôtel-Dieu, Lariboisière, Pitié-Salpêtrière) |
| **🪧 Protest / Riot** | Predicts storefront looting risk and arterial severing (`République → Nation`) | Simulates the marching cortège, damaged/burning commercial buildings with 3D fire & smoke plumes, and Pompiers intervention |
| **🌊 Seine Flood (`+8.60m`)** | Maps low-lying Quais and under-river Metro flood risk | Raises 3D Seine floodwaters across Bercy, Louvre/Orsay, Alma, and Javel and seals 18 inundated Metro stations |
| **💻 SCADA Cyberattack** | Identifies traffic SCADA and CBTC automated rail vulnerabilities | Triggers flashing carrefour conflict gridlock, halts automated Metro Lines 1/4/14, and blacks out 3 arrondissements |

---

### 3. Ten Playable 3D Cities & Cultural UI Themes
Switch cities anytime from the top-right **City Selector** (`?city=<id>`):

| City | Code | Cultural UI Theme | Transit & Topographical Highlights |
| :--- | :--- | :--- | :---
| **Paris** | `PAR` | Guimard Art Nouveau & Art Deco | 16 RATP Metro lines, 6 Grandes Gares, Seine bridges & 28 iconic 3D monuments |
| **Sydney** | `SYD` | Harbour Emerald & Sandstone | Sydney Harbour DEM bathymetry/topography, Harbour Bridge, Opera House & Sydney Metro/Trains |
| **New York City** | `NYC` | Vignelli Helvetica Subway Modernism | Manhattan/Brooklyn/Queens/NJ waterfronts, East & Hudson river bridges, NYC Subway trunks |
| **Porto** | `OPO` | Azulejo Cobalt & Granite | Douro River gorge DEM terrain, Ponte Dom Luís I, Clérigos Tower & Metro do Porto |
| **Tokyo** | `TYO` | Yamanote Cyber-Precision | Sumida River & Tokyo Bay, Tokyo Tower, Skytree, Sensō-ji & Tokyo Metro / JR lines |
| **San Francisco** | `SFO` | Golden Gate International Orange | Steep SF hills DEM heightmap, Golden Gate & Bay Bridges, Transamerica Pyramid & BART/Muni |
| **Rio de Janeiro** | `RIO` | Copacabana Tropical Modernism | Sugarloaf & Corcovado DEM peaks, Christ the Redeemer, Maracanã & MetrôRio |
| **Warsaw** | `WAW` | Vistula Constructivist Amber | Vistula River banks, Palace of Culture and Science, Old Town & Warsaw Metro M1/M2 |
| **Zurich** | `ZRH` | Swiss International Typographic Grid | Lake Zurich & Limmat River DEM terrain, Grossmünster, Prime Tower & S-Bahn / Tram hubs |
| **Melbourne** | `MEL` | Yarra Bluestone & Flinders Gold | Yarra River & Port Phillip Bay, Flinders Street Station, Eureka Tower & City Loop Metro |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** `>= 20.x`
- **npm** `>= 10.x`
- *(Optional)* **Blender 4.x+** with the **Blender MCP Server** enabled if re-generating 3D `.glb` city monument packs.

### Installation & Local Development

```bash
# Install dependencies
npm install

# Start the local Vite dev server at http://127.0.0.1:5173
npm run dev
```

### Production Build & Preview

```bash
# Type-check with tsc and build production bundle into dist/
npm run build

# Preview the production build locally at http://127.0.0.1:4173
npm run preview
```

---

## 🛠 4-Stage City Ingestion & 3D Generation Pipeline

New cities can be ingested or updated using the automated pipeline in [`scripts/pipeline/`](scripts/pipeline/):

1. **Stage 1 (`step1_download_osm_geojson.mjs`)**: Queries Overpass API / OpenStreetMap for real water bodies, river centerlines, bridges, parks, and arterial roads, and generates `src/cities/<city>/geoData.ts`.
2. **Stage 2 (`step2_monuments_and_blender.mjs`)**: Generates 12–28 multi-part 3D architectural monuments via Blender (live Blender MCP or headless Blender Python) into `public/models/<city>_monuments.glb` and outputs historical lore in `src/cities/<city>/historicalData.ts`.
3. **Stage 3 (`step3_download_metro_transit.mjs`)**: Builds the underground and elevated Metro/Rail lines, interchange stations, and mainline rail termini (`metroData.ts`, `railTerminiData.ts`, `districtsData.ts`).
4. **Stage 4 (`step4_build_cultural_ui_theme.mjs`)**: Generates the city-specific CSS theme (`src/styles/themes/<city>.css`) and UI tokens (`uiTheme.ts`).

### Pipeline Commands

```bash
# List all configured city presets
npm run city:list

# Run the full 4-stage pipeline for a specific city
npm run city:pipeline -- --city tokyo

# Fetch real DEM elevation heightmaps (AWS Terrain Tiles / Terrarium PNG) for all cities
node scripts/pipeline/fetch_dem_heightmap.mjs

# Geo-align 3D monument coordinates and orientations against OSM footprints
node scripts/pipeline/geo_align_monuments.mjs
```

---

## 📁 Repository Structure

```text
├── public/
│   ├── data/                  # Cached OSM GeoJSON & monument specification JSONs
│   ├── models/                # Blender-exported 3D monument packs (<city>_monuments.glb)
│   └── stations/              # Special Metro station interior photography
├── scripts/
│   └── pipeline/              # 4-stage City Pipeline, DEM heightmap fetcher & Blender builders
├── src/
│   ├── cities/                # Self-contained city datasets (sydney, nyc, porto, tokyo, sf, rio, warsaw, zurich, melbourne)
│   ├── data/                  # Paris Metro, Grandes Lignes, Geo, Arrondissements & Walking Tour datasets
│   ├── scene/                 # SceneManager, CameraPreset controller, SkyWeatherSystem & WebGPU/TSL compute
│   ├── styles/                # Art Deco base HUD stylesheet + per-city cultural theme CSS
│   ├── ui/                    # ArtDecoHUD (Learn / Plan / Simulate modes, Race Condition controls & A2UI renderer)
│   └── world/                 # VoxelParisBuilder, MetroNetworkRenderer, ParisMonumentsBuilder & ParisSurfaceSimulation
├── CONTRIBUTING.md
├── LICENSE.txt
└── package.json
```

---

## 📄 License

Copyright 2025–2026 Google LLC. Licensed under the [Apache License, Version 2.0](LICENSE.txt).
