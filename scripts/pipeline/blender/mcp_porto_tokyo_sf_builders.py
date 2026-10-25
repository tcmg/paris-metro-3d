# Copyright 2026 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""
Handcrafted Multi-Part Architectural Builders for:
- Porto (Scene_Porto, 8 monuments)
- Tokyo (Scene_Tokyo, 8 monuments)
- San Francisco (Scene_SanFrancisco, 8 monuments)

Designed for Live Blender MCP (`execute_blender_code`) & Headless CLI (`build_city_monuments.py`).
Each monument is created as a root EMPTY node (`Monument_<slug>`) with multi-part child meshes
and Principled BSDF materials matching ParisMonumentsBuilder.ts.
"""

import math
import bpy
import bmesh
from mathutils import Vector
from mcp_sydney_nyc_builders import _get_mat, _make_scene_helpers


# =============================================================================
# 1. PORTO (Scene_Porto) — 8 Multi-Part Architectural Monuments
# =============================================================================
def build_porto_monuments_in_scene(scene):
    """Builds all 8 multi-part Porto monuments inside `scene`."""
    make_mesh, add_box, add_cyl, add_strut = _make_scene_helpers(scene)

    mat_iron = _get_mat("Prt_SeyrigIron", (0.26, 0.30, 0.34), metallic=0.84, roughness=0.36)
    mat_granite = _get_mat("Prt_PortoGranite", (0.72, 0.69, 0.64), roughness=0.72)
    mat_granite_dark = _get_mat("Prt_GraniteTrim", (0.52, 0.49, 0.45), roughness=0.76)
    mat_azulejo = _get_mat("Prt_AzulejoBlue", (0.11, 0.34, 0.62), roughness=0.24)
    mat_whitewash = _get_mat("Prt_Whitewash", (0.95, 0.93, 0.89), roughness=0.45)
    mat_terracotta = _get_mat("Prt_TerracottaRoof", (0.76, 0.31, 0.18), roughness=0.58)
    mat_slate = _get_mat("Prt_MansardSlate", (0.22, 0.26, 0.32), roughness=0.55)
    mat_gold = _get_mat("Prt_TalhaGold", (0.90, 0.72, 0.24), metallic=0.82, roughness=0.25)
    mat_metro_yellow = _get_mat("Prt_MetroYellow", (0.98, 0.78, 0.05), roughness=0.32)
    mat_oma_white = _get_mat("Prt_OmaConcrete", (0.94, 0.93, 0.90), roughness=0.38)
    mat_glass = _get_mat("Prt_CorrugatedGlass", (0.42, 0.68, 0.82), metallic=0.35, roughness=0.14, alpha=0.82)
    mat_crimson = _get_mat("Prt_LelloCrimson", (0.64, 0.12, 0.14), roughness=0.35)
    mat_port_ruby = _get_mat("Prt_PortWineRuby", (0.45, 0.10, 0.16), roughness=0.42)

    # -------------------------------------------------------------------------
    # 1. PONTE DOM LUÍS I (1886 Double-Deck Iron Arch Bridge)
    # -------------------------------------------------------------------------
    p_luis = bpy.data.objects.new("Monument_dom_luis_bridge", None)
    p_luis.empty_display_type = "PLAIN_AXES"
    p_luis.location = (-15.0, -6.0, 0.0)
    scene.collection.objects.link(p_luis)

    span = 8.2
    # Granite cliff abutments on Ribeira and Gaia sides
    for sx in (-1, 1):
        add_box(f"Luis_Abutment_{sx}", (1.3, 1.8, 4.2), (sx * 4.4, 0, 2.1), mat_granite, p_luis)
        # Tall tapered iron lattice piers supporting the upper deck on the flanks
        add_box(f"Luis_Pier_{sx}", (0.45, 1.1, 3.8), (sx * 3.1, 0, 1.9), mat_iron, p_luis)

    # Lower roadway deck (Ribeira <-> Cais de Gaia, suspended from the arch)
    add_box("Luis_Lower_Deck", (7.2, 0.92, 0.18), (0, 0, 1.05), mat_iron, p_luis)
    # Upper Metro Line D deck (60m above the Douro)
    add_box("Luis_Upper_Deck", (9.2, 1.15, 0.24), (0, 0, 3.92), mat_iron, p_luis)
    add_box("Luis_Metro_Train", (2.4, 0.36, 0.26), (0.4, 0, 4.16), mat_metro_yellow, p_luis)

    # Parabolic two-hinged arch ribs & diagonal lattice web
    segs = 16
    half_arch = 3.6
    for i in range(segs):
        t0 = -1.0 + 2.0 * (i / segs)
        t1 = -1.0 + 2.0 * ((i + 1) / segs)
        x0, x1 = t0 * half_arch, t1 * half_arch
        z_top0 = 1.0 + 2.85 * (1.0 - t0 * t0)
        z_top1 = 1.0 + 2.85 * (1.0 - t1 * t1)
        z_bot0 = 0.45 + 3.15 * (1.0 - t0 * t0)
        z_bot1 = 0.45 + 3.15 * (1.0 - t1 * t1)
        for sy in (-0.42, 0.42):
            add_strut(f"Luis_ArchTop_{i}_{sy}", (x0, sy, z_top0), (x1, sy, z_top1), 0.08, mat_iron, p_luis)
            add_strut(f"Luis_ArchBot_{i}_{sy}", (x0, sy, z_bot0), (x1, sy, z_bot1), 0.08, mat_iron, p_luis)
            add_strut(f"Luis_ArchDiag_{i}_{sy}", (x0, sy, z_bot0), (x1, sy, z_top1), 0.05, mat_iron, p_luis)
            # Vertical hanger/spandrel column to lower & upper decks
            xm = 0.5 * (x0 + x1)
            zt = 0.5 * (z_top0 + z_top1)
            add_strut(f"Luis_Spandrel_{i}_{sy}", (xm, sy, min(1.05, zt)), (xm, sy, 3.90), 0.045, mat_iron, p_luis)

    # -------------------------------------------------------------------------
    # 2. TORRE DOS CLÉRIGOS (1763 Nicolau Nasoni Baroque Campanile & Church)
    # -------------------------------------------------------------------------
    p_clerigos = bpy.data.objects.new("Monument_clerigos_tower", None)
    p_clerigos.empty_display_type = "PLAIN_AXES"
    p_clerigos.location = (-5.0, -6.0, 0.0)
    scene.collection.objects.link(p_clerigos)

    # Elliptical Baroque church body + terracotta roof
    add_cyl("Clerigos_Nave", 1.25, 1.20, 1.85, 20, (0, 1.65, 0.925), mat_whitewash, p_clerigos)
    add_cyl("Clerigos_Nave_Roof", 1.22, 0.35, 0.65, 20, (0, 1.65, 2.15), mat_terracotta, p_clerigos)
    add_box("Clerigos_Choir", (1.35, 1.6, 1.65), (0, 0.35, 0.825), mat_granite, p_clerigos)

    # 6-Story 75.6m Carved Granite Campanile
    tiers = [
        (0.0, 1.35, 1.15, 1.15),
        (1.35, 1.10, 1.02, 1.02),
        (2.45, 0.95, 0.90, 0.90),
        (3.40, 0.85, 0.78, 0.78),
        (4.25, 0.75, 0.66, 0.66),
        (5.00, 0.65, 0.52, 0.52),
    ]
    for idx, (z0, h, sx, sy) in enumerate(tiers):
        add_box(f"Clerigos_Tier_{idx}", (sx, sy, h), (0, -0.65, z0 + h * 0.5), mat_granite, p_clerigos)
        add_box(f"Clerigos_Cornice_{idx}", (sx + 0.16, sy + 0.16, 0.10), (0, -0.65, z0 + h), mat_granite_dark, p_clerigos)
    # Bulbous Baroque cupola & golden weathervane cross
    add_cyl("Clerigos_Cupola", 0.36, 0.08, 0.62, 12, (0, -0.65, 5.96), mat_granite_dark, p_clerigos)
    add_cyl("Clerigos_Finial", 0.04, 0.02, 0.45, 8, (0, -0.65, 6.45), mat_gold, p_clerigos)

    # -------------------------------------------------------------------------
    # 3. ESTAÇÃO DE SÃO BENTO (1916 Beaux-Arts Terminal & 20,000 Azulejos)
    # -------------------------------------------------------------------------
    p_sbento = bpy.data.objects.new("Monument_sao_bento_station", None)
    p_sbento.empty_display_type = "PLAIN_AXES"
    p_sbento.location = (5.0, -6.0, 0.0)
    scene.collection.objects.link(p_sbento)

    add_box("SBento_Main_Body", (4.2, 2.2, 1.85), (0, 0, 0.925), mat_granite, p_sbento)
    # Cobalt-blue Azulejo vestibule frieze visible through front arches
    add_box("SBento_Azulejo_Hall", (3.2, 0.16, 1.15), (0, -1.06, 0.72), mat_azulejo, p_sbento)
    for ix in range(-3, 4):
        add_box(f"SBento_Pilaster_{ix}", (0.22, 0.26, 1.88), (ix * 0.62, -1.04, 0.94), mat_granite_dark, p_sbento)
    # Corner Pavilions + Steep French Mansard Slate Roofs
    for sx in (-1, 1):
        add_box(f"SBento_Wing_{sx}", (1.15, 2.45, 2.15), (sx * 1.65, -0.05, 1.075), mat_granite, p_sbento)
        add_cyl(f"SBento_Mansard_{sx}", 0.82, 0.52, 0.85, 4, (sx * 1.65, -0.05, 2.55), mat_slate, p_sbento, rot=(0, 0, math.pi / 4))
    # Central Mansard & Clock Turret
    add_box("SBento_Center_Mansard", (2.4, 1.7, 0.65), (0, 0, 2.15), mat_slate, p_sbento)
    add_box("SBento_Clock_Pediment", (1.1, 0.45, 0.75), (0, -0.95, 2.22), mat_granite, p_sbento)
    add_cyl("SBento_Clock_Dial", 0.24, 0.24, 0.12, 16, (0, -1.16, 2.28), mat_gold, p_sbento, rot=(math.pi / 2, 0, 0))
    # Rear glass-and-iron train shed
    add_cyl("SBento_Train_Shed", 1.65, 1.65, 2.8, 16, (0, 2.3, 1.15), mat_glass, p_sbento, rot=(math.pi / 2, 0, 0))

    # -------------------------------------------------------------------------
    # 4. CASA DA MÚSICA (2005 Rem Koolhaas / OMA Faceted Polyhedron)
    # -------------------------------------------------------------------------
    p_casa = bpy.data.objects.new("Monument_casa_da_musica", None)
    p_casa.empty_display_type = "PLAIN_AXES"
    p_casa.location = (15.0, -6.0, 0.0)
    scene.collection.objects.link(p_casa)

    # Golden travertine wave plaza
    add_box("Casa_Travertine_Plaza", (5.2, 4.6, 0.28), (0, 0, 0.14), mat_gold, p_casa)
    # Faceted OMA polyhedral hull using bmesh convex hull of sculpted vertices
    bm = bmesh.new()
    pts = [
        (-1.4, -1.2, 0.28), (1.4, -1.2, 0.28), (1.3, 1.2, 0.28), (-1.2, 1.2, 0.28),
        (-2.2, -0.6, 1.45), (2.3, -0.4, 1.55), (2.0, 1.6, 1.40), (-2.0, 1.5, 1.60),
        (-1.8, -1.5, 2.45), (1.7, -1.6, 2.65), (1.6, 1.4, 2.85), (-1.6, 1.3, 2.55),
        (-0.8, -0.6, 3.35), (0.9, -0.3, 3.45), (0.5, 0.9, 3.15), (-0.7, 0.8, 3.20),
    ]
    for pt in pts:
        bm.verts.new(pt)
    bmesh.ops.convex_hull(bm, input=bm.verts)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    make_mesh("Casa_Polyhedron_Hull", bm, mat_oma_white, p_casa)
    # Corrugated glass concert-hall openings on front & back facets
    add_box("Casa_Glass_Front", (1.65, 0.22, 1.15), (0.0, -1.42, 1.95), mat_glass, p_casa, rot=(0.12, 0, 0))
    add_box("Casa_Glass_Back", (1.55, 0.22, 1.10), (0.0, 1.38, 2.05), mat_glass, p_casa, rot=(-0.12, 0, 0))

    # -------------------------------------------------------------------------
    # 5. SÉ DO PORTO (1110 Romanesque Fortress-Cathedral & Baroque Loggia)
    # -------------------------------------------------------------------------
    p_se = bpy.data.objects.new("Monument_se_do_porto", None)
    p_se.empty_display_type = "PLAIN_AXES"
    p_se.location = (-15.0, 6.0, 0.0)
    scene.collection.objects.link(p_se)

    add_box("Se_Terreiro_Platform", (4.8, 5.2, 0.45), (0, 0, 0.225), mat_granite_dark, p_se)
    add_box("Se_Nave", (2.1, 3.8, 2.15), (0, 0.2, 1.525), mat_granite, p_se)
    add_box("Se_Transept", (3.6, 1.4, 2.05), (0, 0.8, 1.475), mat_granite, p_se)
    # Twin Crenellated Romanesque West Towers + Cupolas
    for sx in (-1, 1):
        add_box(f"Se_Tower_{sx}", (1.05, 1.05, 3.35), (sx * 1.15, -1.45, 2.125), mat_granite, p_se)
        add_box(f"Se_Tower_Crown_{sx}", (1.18, 1.18, 0.22), (sx * 1.15, -1.45, 3.85), mat_granite_dark, p_se)
        add_cyl(f"Se_Cupola_{sx}", 0.46, 0.10, 0.65, 8, (sx * 1.15, -1.45, 4.28), mat_slate, p_se)
    # Gothic Rose Window & Nasoni North Loggia with Azulejos
    add_cyl("Se_Rose_Window", 0.42, 0.42, 0.14, 16, (0, -1.72, 2.15), mat_gold, p_se, rot=(math.pi / 2, 0, 0))
    add_box("Se_Nasoni_Loggia", (0.65, 2.2, 1.25), (-1.35, 0.1, 1.08), mat_whitewash, p_se)
    add_box("Se_Cloister_Azulejo", (0.14, 1.9, 0.85), (-1.66, 0.1, 1.05), mat_azulejo, p_se)

    # -------------------------------------------------------------------------
    # 6. PALÁCIO DA BOLSA (1842 Neoclassical Stock Exchange & Glass Dome)
    # -------------------------------------------------------------------------
    p_bolsa = bpy.data.objects.new("Monument_palacio_da_bolsa", None)
    p_bolsa.empty_display_type = "PLAIN_AXES"
    p_bolsa.location = (-5.0, 6.0, 0.0)
    scene.collection.objects.link(p_bolsa)

    add_box("Bolsa_Main_Block", (4.2, 3.6, 1.85), (0, 0, 0.925), mat_granite, p_bolsa)
    add_box("Bolsa_Roof", (4.0, 3.4, 0.35), (0, 0, 2.02), mat_terracotta, p_bolsa)
    # Neoclassical Portico & Triangular Pediment
    add_box("Bolsa_Pediment", (2.2, 0.45, 0.55), (0, -1.82, 2.05), mat_granite_dark, p_bolsa)
    for ix in range(-2, 3):
        add_cyl(f"Bolsa_Col_{ix}", 0.11, 0.10, 1.65, 12, (ix * 0.42, -1.88, 0.95), mat_granite, p_bolsa)
    # Octagonal Glass-and-Iron Pátio das Nações Dome & Golden Salão Árabe Lantern
    add_cyl("Bolsa_Patio_Dome", 1.15, 0.35, 0.85, 8, (0, 0.1, 2.48), mat_glass, p_bolsa)
    add_cyl("Bolsa_Arab_Lantern", 0.32, 0.12, 0.42, 8, (0, 0.1, 3.05), mat_gold, p_bolsa)

    # -------------------------------------------------------------------------
    # 7. LIVRARIA LELLO (1906 Neo-Gothic Facade & Crimson Forked Staircase)
    # -------------------------------------------------------------------------
    p_lello = bpy.data.objects.new("Monument_livraria_lello", None)
    p_lello.empty_display_type = "PLAIN_AXES"
    p_lello.location = (5.0, 6.0, 0.0)
    scene.collection.objects.link(p_lello)

    add_box("Lello_Body", (2.4, 3.4, 2.65), (0, 0, 1.325), mat_whitewash, p_lello)
    add_box("Lello_Facade", (2.5, 0.24, 2.95), (0, -1.68, 1.475), mat_whitewash, p_lello)
    # Twin Neo-Gothic Pinnacles & Traceried Windows
    for sx in (-1, 1):
        add_box(f"Lello_Turret_{sx}", (0.36, 0.36, 3.45), (sx * 1.12, -1.72, 1.725), mat_whitewash, p_lello)
        add_cyl(f"Lello_Spire_{sx}", 0.24, 0.02, 0.85, 6, (sx * 1.12, -1.72, 3.85), mat_granite, p_lello)
    add_box("Lello_Gothic_Window", (1.45, 0.18, 0.95), (0, -1.76, 1.85), mat_azulejo, p_lello)
    add_box("Lello_Crenellation", (2.2, 0.28, 0.32), (0, -1.72, 3.05), mat_gold, p_lello)
    # Stained-glass skylight & iconic crimson-red forked staircase
    add_box("Lello_Skylight", (1.35, 2.1, 0.18), (0, 0.1, 2.72), mat_glass, p_lello)
    add_box("Lello_Crimson_Stair_Base", (0.75, 1.4, 0.95), (0, -0.2, 0.48), mat_crimson, p_lello)
    for sx in (-1, 1):
        add_strut(f"Lello_Crimson_Fork_{sx}", (0, 0.1, 0.85), (sx * 0.75, 0.85, 1.75), 0.22, mat_crimson, p_lello)

    # -------------------------------------------------------------------------
    # 8. CAVES DE VINHO DO PORTO & SERRA DO PILAR (Gaia Terraced Lodges)
    # -------------------------------------------------------------------------
    p_caves = bpy.data.objects.new("Monument_port_wine_lodges", None)
    p_caves.empty_display_type = "PLAIN_AXES"
    p_caves.location = (15.0, 6.0, 0.0)
    scene.collection.objects.link(p_caves)

    # Terraced Gaia hillside + 3 long whitewashed Port Wine Cellar lodges with terracotta roofs
    for row in range(3):
        y_off = -1.2 + row * 1.15
        z_base = 0.35 + row * 0.55
        add_box(f"Gaia_Lodge_Wall_{row}", (4.2, 0.95, 0.85), (0, y_off, z_base), mat_whitewash, p_caves)
        add_box(f"Gaia_Lodge_Roof_{row}", (4.35, 1.08, 0.28), (0, y_off, z_base + 0.55), mat_terracotta, p_caves, rot=(0.18, 0, 0))
        add_box(f"Gaia_Port_Banner_{row}", (2.6, 0.12, 0.24), (0, y_off - 0.48, z_base + 0.32), mat_port_ruby, p_caves)
    # Circular Renaissance Monastery of Serra do Pilar crowning the crest
    add_cyl("Pilar_Drum", 1.15, 1.12, 1.35, 20, (0, 1.55, 2.35), mat_granite, p_caves)
    add_cyl("Pilar_Dome", 1.12, 0.25, 0.78, 20, (0, 1.55, 3.40), mat_terracotta, p_caves)
    add_cyl("Pilar_Lantern", 0.26, 0.08, 0.45, 12, (0, 1.55, 3.98), mat_gold, p_caves)


# =============================================================================
# 2. TOKYO (Scene_Tokyo) — 8 Multi-Part Architectural Monuments
# =============================================================================
def build_tokyo_monuments_in_scene(scene):
    """Builds all 8 multi-part Tokyo monuments inside `scene`."""
    make_mesh, add_box, add_cyl, add_strut = _make_scene_helpers(scene)

    mat_vermilion = _get_mat("Tky_Vermilion", (0.92, 0.20, 0.14), roughness=0.34)
    mat_tower_white = _get_mat("Tky_TowerWhite", (0.96, 0.97, 0.99), roughness=0.35)
    mat_skytree_white = _get_mat("Tky_SkytreeSilkyWhite", (0.93, 0.95, 0.98), metallic=0.35, roughness=0.28)
    mat_skytree_glass = _get_mat("Tky_SkytreeGlass", (0.38, 0.72, 0.92), metallic=0.65, roughness=0.14)
    mat_kawara_roof = _get_mat("Tky_KawaraTile", (0.18, 0.21, 0.24), metallic=0.25, roughness=0.48)
    mat_gold = _get_mat("Tky_ImperialGold", (0.92, 0.74, 0.22), metallic=0.88, roughness=0.22)
    mat_red_brick = _get_mat("Tky_TatsunoBrick", (0.72, 0.25, 0.19), roughness=0.62)
    mat_granite_band = _get_mat("Tky_WhiteGranite", (0.93, 0.91, 0.87), roughness=0.52)
    mat_copper_roof = _get_mat("Tky_CopperVerdigris", (0.22, 0.52, 0.44), metallic=0.40, roughness=0.38)
    mat_hinoki = _get_mat("Tky_HinokiCypress", (0.76, 0.56, 0.34), roughness=0.58)
    mat_ishigaki = _get_mat("Tky_CastleStone", (0.36, 0.39, 0.43), roughness=0.78)
    mat_cocoon_blue = _get_mat("Tky_CocoonGlass", (0.12, 0.28, 0.48), metallic=0.78, roughness=0.15)
    mat_cocoon_diagrid = _get_mat("Tky_CocoonAluminum", (0.92, 0.94, 0.97), metallic=0.75, roughness=0.22)

    # -------------------------------------------------------------------------
    # 1. TOKYO TOWER (1958 333m Orange & White Steel Lattice Tower)
    # -------------------------------------------------------------------------
    p_ttower = bpy.data.objects.new("Monument_tokyo_tower", None)
    p_ttower.empty_display_type = "PLAIN_AXES"
    p_ttower.location = (-15.0, -6.0, 0.0)
    scene.collection.objects.link(p_ttower)

    # FootTown 2-story base building
    add_box("TTower_FootTown", (2.8, 2.8, 0.55), (0, 0, 0.275), mat_tower_white, p_ttower)
    # 4 Splayed Lattice Legs + 7 alternating International Orange & White bands
    bands = 7
    total_h = 6.2
    for b in range(bands):
        t0 = b / bands
        t1 = (b + 1) / bands
        z0, z1 = t0 * total_h, t1 * total_h
        w0 = 1.65 * ((1.0 - t0 * 0.82) ** 1.45) + 0.16
        w1 = 1.65 * ((1.0 - t1 * 0.82) ** 1.45) + 0.16
        mat_b = mat_vermilion if b % 2 == 0 else mat_tower_white
        for sx in (-1, 1):
            for sy in (-1, 1):
                p0 = (sx * w0, sy * w0, z0)
                p1 = (sx * w1, sy * w1, z1)
                add_strut(f"TTower_Leg_{b}_{sx}_{sy}", p0, p1, 0.08 * (1.0 - t0 * 0.45), mat_b, p_ttower)
        # Horizontal ring struts & X-bracing
        zm = 0.5 * (z0 + z1)
        wm = 0.5 * (w0 + w1)
        add_box(f"TTower_GirtX_{b}", (wm * 2.1, wm * 2.1, 0.08), (0, 0, z1), mat_b, p_ttower)

    # Two-story Main Deck (150m) & Top Deck (250m) + Antenna Spire
    add_box("TTower_Main_Deck_1", (1.65, 1.65, 0.34), (0, 0, 2.55), mat_tower_white, p_ttower)
    add_box("TTower_Main_Deck_2", (1.52, 1.52, 0.28), (0, 0, 2.88), mat_vermilion, p_ttower)
    add_cyl("TTower_Top_Deck", 0.46, 0.46, 0.38, 12, (0, 0, 4.75), mat_tower_white, p_ttower)
    add_cyl("TTower_Spire_Orange", 0.14, 0.08, 1.15, 10, (0, 0, 6.75), mat_vermilion, p_ttower)
    add_cyl("TTower_Spire_Tip", 0.08, 0.02, 0.95, 10, (0, 0, 7.75), mat_tower_white, p_ttower)

    # -------------------------------------------------------------------------
    # 2. TOKYO SKYTREE (2012 634m Neo-Futurist Tower & Shinbashira Core)
    # -------------------------------------------------------------------------
    p_skytree = bpy.data.objects.new("Monument_tokyo_skytree", None)
    p_skytree.empty_display_type = "Monument_tokyo_skytree" if False else "PLAIN_AXES"
    p_skytree.location = (-5.0, -6.0, 0.0)
    scene.collection.objects.link(p_skytree)

    # Central concrete Shinbashira core damper column
    add_cyl("Skytree_Shinbashira", 0.42, 0.26, 6.8, 16, (0, 0, 3.4), mat_granite_band, p_skytree)
    # Triangular base morphing to circular lattice cage
    tiers_st = 9
    for t in range(tiers_st):
        u0 = t / tiers_st
        u1 = (t + 1) / tiers_st
        z0, z1 = u0 * 6.2, u1 * 6.2
        r0 = 1.55 * (1.0 - u0 * 0.68)
        r1 = 1.55 * (1.0 - u1 * 0.68)
        segs_ring = 3 if t < 2 else (6 if t < 4 else 12)
        add_cyl(f"Skytree_Cage_{t}", r0, r1, (z1 - z0) * 0.92, segs_ring, (0, 0, (z0 + z1) * 0.5), mat_skytree_white, p_skytree)
    # Tembo Deck (350m, triple ring) & Tembo Galleria (450m, spiral skywalk)
    add_cyl("Skytree_Tembo_Deck_Bot", 0.85, 0.98, 0.28, 24, (0, 0, 4.45), mat_skytree_glass, p_skytree)
    add_cyl("Skytree_Tembo_Deck_Mid", 0.98, 0.92, 0.32, 24, (0, 0, 4.75), mat_skytree_white, p_skytree)
    add_cyl("Skytree_Tembo_Galleria", 0.62, 0.56, 0.36, 24, (0, 0, 5.85), mat_skytree_glass, p_skytree)
    add_cyl("Skytree_Gain_Tower", 0.24, 0.04, 2.25, 16, (0, 0, 7.15), mat_skytree_white, p_skytree)

    # -------------------------------------------------------------------------
    # 3. SENSŌ-JI TEMPLE, FIVE-STORY PAGODA & KAMINARIMON (Asakusa)
    # -------------------------------------------------------------------------
    p_sensoji = bpy.data.objects.new("Monument_sensoji_pagoda", None)
    p_sensoji.empty_display_type = "PLAIN_AXES"
    p_sensoji.location = (5.0, -6.0, 0.0)
    scene.collection.objects.link(p_sensoji)

    # Main Hondō Hall (right) with sweeping Irimoya roof
    add_box("Sensoji_Hondo_Podium", (2.8, 2.4, 0.38), (0.95, 0.4, 0.19), mat_granite_band, p_sensoji)
    add_box("Sensoji_Hondo_Walls", (2.3, 1.9, 1.15), (0.95, 0.4, 0.95), mat_vermilion, p_sensoji)
    add_cyl("Sensoji_Hondo_Roof", 1.85, 0.65, 1.05, 4, (0.95, 0.4, 2.02), mat_kawara_roof, p_sensoji, rot=(0, 0, math.pi / 4))
    # Five-Story Vermilion Pagoda (Gojū-no-tō, left)
    add_box("Sensoji_Pagoda_Base", (1.65, 1.65, 0.55), (-1.45, 0.3, 0.275), mat_granite_band, p_sensoji)
    for st in range(5):
        z_st = 0.55 + st * 0.78
        w_core = 1.08 - st * 0.10
        w_eave = 1.65 - st * 0.13
        add_box(f"Sensoji_Pagoda_Core_{st}", (w_core, w_core, 0.55), (-1.45, 0.3, z_st + 0.275), mat_vermilion, p_sensoji)
        add_cyl(f"Sensoji_Pagoda_Eave_{st}", w_eave * 0.78, w_core * 0.65, 0.28, 4, (-1.45, 0.3, z_st + 0.64), mat_kawara_roof, p_sensoji, rot=(0, 0, math.pi / 4))
    add_cyl("Sensoji_Pagoda_Sorin", 0.10, 0.02, 1.25, 12, (-1.45, 0.3, 5.05), mat_gold, p_sensoji)
    # Kaminarimon Gate & Giant Red Chōchin Lantern in foreground
    add_box("Sensoji_Kaminarimon_Roof", (1.95, 0.95, 0.45), (0.0, -1.85, 1.45), mat_kawara_roof, p_sensoji)
    for sx in (-0.65, 0.65):
        add_cyl(f"Sensoji_Gate_Pillar_{sx}", 0.14, 0.14, 1.25, 12, (sx, -1.85, 0.625), mat_vermilion, p_sensoji)
    add_cyl("Sensoji_Chochin_Lantern", 0.34, 0.34, 0.48, 16, (0.0, -1.85, 0.85), mat_vermilion, p_sensoji)

    # -------------------------------------------------------------------------
    # 4. TOKYO STATION MARUNOUCHI BUILDING (1914 Kingo Tatsuno Red Brick)
    # -------------------------------------------------------------------------
    p_tsta = bpy.data.objects.new("Monument_tokyo_station", None)
    p_tsta.empty_display_type = "PLAIN_AXES"
    p_tsta.location = (15.0, -6.0, 0.0)
    scene.collection.objects.link(p_tsta)

    # Long 3-story red-brick facade with white granite horizontal bands
    add_box("TSta_Long_Wings", (6.8, 1.45, 1.55), (0, 0, 0.775), mat_red_brick, p_tsta)
    for z_band in (0.45, 0.95, 1.42):
        add_box(f"TSta_Granite_Band_{z_band}", (6.86, 1.50, 0.08), (0, 0, z_band), mat_granite_band, p_tsta)
    add_box("TSta_Slate_Roof", (6.6, 1.25, 0.38), (0, 0, 1.74), mat_kawara_roof, p_tsta)
    # Central Imperial Pavilion
    add_box("TSta_Imperial_Center", (1.65, 1.85, 1.95), (0, -0.15, 0.975), mat_red_brick, p_tsta)
    add_cyl("TSta_Imperial_Gable", 1.15, 0.35, 0.68, 4, (0, -0.15, 2.28), mat_copper_roof, p_tsta, rot=(0, 0, math.pi / 4))
    # North & South Octagonal Domes
    for sx in (-2.55, 2.55):
        add_cyl(f"TSta_Octagon_Drum_{sx}", 0.95, 0.92, 2.15, 8, (sx, -0.1, 1.075), mat_red_brick, p_tsta)
        add_cyl(f"TSta_Octagon_Dome_{sx}", 0.96, 0.28, 0.88, 8, (sx, -0.1, 2.58), mat_copper_roof, p_tsta)
        add_cyl(f"TSta_Cupola_{sx}", 0.24, 0.06, 0.48, 8, (sx, -0.1, 3.24), mat_gold, p_tsta)

    # -------------------------------------------------------------------------
    # 5. MEIJI JINGU GRAND TORII & SANCTUARY (1920 Hinoki Cypress & Copper)
    # -------------------------------------------------------------------------
    p_meiji = bpy.data.objects.new("Monument_meiji_jingu", None)
    p_meiji.empty_display_type = "PLAIN_AXES"
    p_meiji.location = (-15.0, 6.0, 0.0)
    scene.collection.objects.link(p_meiji)

    # Gravel courtyard & Nagare-zukuri Honden Sanctuary in rear
    add_box("Meiji_Sanctuary_Hall", (3.6, 2.0, 1.35), (0, 1.15, 0.675), mat_hinoki, p_meiji)
    add_box("Meiji_Copper_Roof", (4.1, 2.4, 0.55), (0, 1.15, 1.62), mat_copper_roof, p_meiji)
    add_box("Meiji_Chigi_Ridge", (3.8, 0.22, 0.24), (0, 1.15, 1.98), mat_gold, p_meiji)
    # Towering Myōjin Torii Gate in foreground
    for sx in (-1.15, 1.15):
        add_cyl(f"Meiji_Torii_Pillar_{sx}", 0.20, 0.17, 2.85, 14, (sx, -1.55, 1.425), mat_hinoki, p_meiji)
    add_box("Meiji_Torii_Kasagi", (3.45, 0.34, 0.24), (0, -1.55, 2.88), mat_hinoki, p_meiji)
    add_box("Meiji_Torii_Nuki", (2.95, 0.22, 0.18), (0, -1.55, 2.28), mat_hinoki, p_meiji)
    add_cyl("Meiji_Kikumon_Crest", 0.18, 0.18, 0.08, 16, (0, -1.68, 2.58), mat_gold, p_meiji, rot=(math.pi / 2, 0, 0))

    # -------------------------------------------------------------------------
    # 6. TOKYO IMPERIAL PALACE: NIJŪBASHI & FUJIMI-YAGURA (Edo Castle)
    # -------------------------------------------------------------------------
    p_palace = bpy.data.objects.new("Monument_imperial_palace_nijubashi", None)
    p_palace.empty_display_type = "PLAIN_AXES"
    p_palace.location = (-5.0, 6.0, 0.0)
    scene.collection.objects.link(p_palace)

    # Battered Edo Castle stone wall (Ishigaki)
    add_cyl("Palace_Ishigaki_Wall", 2.35, 1.85, 1.55, 4, (0, 0.55, 0.775), mat_ishigaki, p_palace, rot=(0, 0, math.pi / 4))
    # 3-tiered Fujimi-yagura white castle keep turret
    keep_tiers = [
        (1.55, 0.85, 1.85, 2.35),
        (2.40, 0.75, 1.45, 1.95),
        (3.15, 0.70, 1.08, 1.52),
    ]
    for idx, (z0, h, w_wall, w_eave) in enumerate(keep_tiers):
        add_box(f"Palace_Keep_Wall_{idx}", (w_wall, w_wall, h), (0, 0.55, z0 + h * 0.5), mat_tower_white, p_palace)
        add_cyl(f"Palace_Keep_Roof_{idx}", w_eave * 0.75, w_wall * 0.62, 0.34, 4, (0, 0.55, z0 + h + 0.12), mat_kawara_roof, p_palace, rot=(0, 0, math.pi / 4))
    # Nijūbashi Double-Arch Eyeglass Bridge in front
    add_box("Palace_Nijubashi_Span", (2.6, 0.85, 0.55), (0, -1.65, 0.45), mat_granite_band, p_palace)
    for sx in (-0.58, 0.58):
        add_cyl(f"Palace_Bridge_Arch_{sx}", 0.38, 0.38, 0.90, 14, (sx, -1.65, 0.25), mat_ishigaki, p_palace, rot=(math.pi / 2, 0, 0))

    # -------------------------------------------------------------------------
    # 7. MODE GAKUEN COCOON TOWER (2008 Shinjuku Diagrid Skyscraper)
    # -------------------------------------------------------------------------
    p_cocoon = bpy.data.objects.new("Monument_cocoon_tower", None)
    p_cocoon.empty_display_type = "PLAIN_AXES"
    p_cocoon.location = (5.0, 6.0, 0.0)
    scene.collection.objects.link(p_cocoon)

    # Elliptical bulbous dark-blue glass tower + white diagrid cocoon bands
    segs_z = 10
    for iz in range(segs_z):
        u0 = iz / segs_z
        u1 = (iz + 1) / segs_z
        z0, z1 = u0 * 5.8, u1 * 5.8
        r0 = 0.82 + 0.48 * math.sin(u0 * math.pi * 0.88)
        r1 = 0.82 + 0.48 * math.sin(u1 * math.pi * 0.88)
        add_cyl(f"Cocoon_Core_{iz}", r0, r1, (z1 - z0) * 0.98, 18, (0, 0, 0.5 * (z0 + z1)), mat_cocoon_blue, p_cocoon)
        # Helical white diagrid cocoon ribs
        for ir in range(6):
            a0 = (ir / 6.0) * math.pi * 2.0 + u0 * 1.2
            a1 = (ir / 6.0) * math.pi * 2.0 + u1 * 1.2
            b1 = ((ir + 1) / 6.0) * math.pi * 2.0 - u1 * 1.2
            p_start = (math.cos(a0) * (r0 + 0.05), math.sin(a0) * (r0 + 0.05), z0)
            p_end1 = (math.cos(a1) * (r1 + 0.05), math.sin(a1) * (r1 + 0.05), z1)
            p_end2 = (math.cos(b1) * (r1 + 0.05), math.sin(b1) * (r1 + 0.05), z1)
            add_strut(f"Cocoon_RibA_{iz}_{ir}", p_start, p_end1, 0.045, mat_cocoon_diagrid, p_cocoon)
            add_strut(f"Cocoon_RibB_{iz}_{ir}", p_start, p_end2, 0.045, mat_cocoon_diagrid, p_cocoon)

    # -------------------------------------------------------------------------
    # 8. RAINBOW BRIDGE (1993 Tokyo Bay Double-Deck Suspension Span)
    # -------------------------------------------------------------------------
    p_rainbow = bpy.data.objects.new("Monument_rainbow_bridge", None)
    p_rainbow.empty_display_type = "PLAIN_AXES"
    p_rainbow.location = (15.0, 6.0, 0.0)
    scene.collection.objects.link(p_rainbow)

    add_box("Rainbow_Deck_Upper", (8.6, 1.05, 0.16), (0, 0, 1.45), mat_tower_white, p_rainbow)
    add_box("Rainbow_Deck_Lower", (8.6, 0.95, 0.14), (0, 0, 1.18), mat_skytree_glass, p_rainbow)
    for sx in (-2.4, 2.4):
        for sy in (-0.45, 0.45):
            add_box(f"Rainbow_Tower_Leg_{sx}_{sy}", (0.28, 0.24, 4.15), (sx, sy, 2.075), mat_tower_white, p_rainbow)
        for z_cross in (1.35, 2.65, 3.85):
            add_box(f"Rainbow_Cross_{sx}_{z_cross}", (0.26, 1.05, 0.22), (sx, 0, z_cross), mat_tower_white, p_rainbow)
    # Main suspension cables & vertical suspenders
    for i in range(-7, 7):
        x0 = i * 0.58
        x1 = (i + 1) * 0.58
        def cable_z(x):
            if abs(x) <= 2.4:
                return 1.65 + 2.35 * ((x / 2.4) ** 2)
            return max(1.45, 4.0 - (abs(x) - 2.4) * 1.25)
        for sy in (-0.45, 0.45):
            add_strut(f"Rainbow_Cable_{i}_{sy}", (x0, sy, cable_z(x0)), (x1, sy, cable_z(x1)), 0.055, mat_copper_roof, p_rainbow)


# =============================================================================
# 3. SAN FRANCISCO (Scene_SanFrancisco) — 8 Multi-Part Architectural Monuments
# =============================================================================
def build_san_francisco_monuments_in_scene(scene):
    """Builds all 8 multi-part San Francisco monuments inside `scene`."""
    make_mesh, add_box, add_cyl, add_strut = _make_scene_helpers(scene)

    mat_intl_orange = _get_mat("SF_InternationalOrange", (0.94, 0.29, 0.14), metallic=0.35, roughness=0.36)
    mat_concrete_pier = _get_mat("SF_ConcretePier", (0.82, 0.78, 0.72), roughness=0.68)
    mat_pyramid_white = _get_mat("SF_TransamericaQuartz", (0.95, 0.94, 0.91), roughness=0.38)
    mat_pyramid_wing = _get_mat("SF_TransamericaWing", (0.86, 0.85, 0.82), roughness=0.45)
    mat_coit_white = _get_mat("SF_CoitConcrete", (0.96, 0.94, 0.90), roughness=0.42)
    mat_sandstone = _get_mat("SF_ColusaSandstone", (0.85, 0.81, 0.74), roughness=0.58)
    mat_slate_navy = _get_mat("SF_FerryRoof", (0.28, 0.34, 0.40), roughness=0.52)
    mat_rotunda_ochre = _get_mat("SF_MaybeckOchre", (0.90, 0.72, 0.54), roughness=0.52)
    mat_rotunda_dome = _get_mat("SF_MaybeckTerracotta", (0.78, 0.45, 0.30), roughness=0.48)
    mat_salesforce_glass = _get_mat("SF_SalesforceGlass", (0.52, 0.76, 0.92), metallic=0.72, roughness=0.14)
    mat_salesforce_trim = _get_mat("SF_SalesforceSilver", (0.90, 0.93, 0.96), metallic=0.80, roughness=0.20)
    mat_park_green = _get_mat("SF_TransitParkGreen", (0.18, 0.56, 0.34), roughness=0.65)
    mat_gold = _get_mat("SF_VictorianGold", (0.95, 0.74, 0.24), metallic=0.65, roughness=0.28)
    mat_vic_blue = _get_mat("SF_VictorianBlue", (0.34, 0.62, 0.82), roughness=0.42)
    mat_vic_coral = _get_mat("SF_VictorianCoral", (0.88, 0.45, 0.36), roughness=0.42)
    mat_vic_mint = _get_mat("SF_VictorianMint", (0.38, 0.74, 0.62), roughness=0.42)

    # -------------------------------------------------------------------------
    # 1. GOLDEN GATE BRIDGE (1937 International Orange Art Deco Span)
    # -------------------------------------------------------------------------
    p_ggb = bpy.data.objects.new("Monument_golden_gate_bridge", None)
    p_ggb.empty_display_type = "PLAIN_AXES"
    p_ggb.location = (-15.0, -6.0, 0.0)
    scene.collection.objects.link(p_ggb)

    add_box("GGB_Road_Truss", (9.2, 0.95, 0.24), (0, 0, 1.45), mat_intl_orange, p_ggb)
    for sx in (-2.55, 2.55):
        # Concrete Fort Point / Lime Point fender pier
        add_cyl(f"GGB_Fender_{sx}", 0.65, 0.62, 0.45, 16, (sx, 0, 0.225), mat_concrete_pier, p_ggb)
        # Stepped Art Deco Tower Legs
        for sy in (-0.42, 0.42):
            add_box(f"GGB_Leg_Low_{sx}_{sy}", (0.34, 0.28, 2.4), (sx, sy, 1.60), mat_intl_orange, p_ggb)
            add_box(f"GGB_Leg_Mid_{sx}_{sy}", (0.28, 0.24, 1.6), (sx, sy, 3.60), mat_intl_orange, p_ggb)
            add_box(f"GGB_Leg_Top_{sx}_{sy}", (0.22, 0.20, 1.1), (sx, sy, 4.95), mat_intl_orange, p_ggb)
        # 4 Horizontal Art Deco Portal Struts above roadway
        for z_portal in (2.15, 3.05, 3.95, 4.85):
            add_box(f"GGB_Portal_{sx}_{z_portal}", (0.28, 0.96, 0.22), (sx, 0, z_portal), mat_intl_orange, p_ggb)
    # Catenary Main Cables & Vertical Suspender Ropes
    for i in range(-8, 8):
        x0 = i * 0.56
        x1 = (i + 1) * 0.56
        def ggb_cable_z(x):
            if abs(x) <= 2.55:
                return 1.72 + 3.65 * ((x / 2.55) ** 2)
            return max(1.48, 5.37 - (abs(x) - 2.55) * 1.45)
        for sy in (-0.42, 0.42):
            z0, z1 = ggb_cable_z(x0), ggb_cable_z(x1)
            add_strut(f"GGB_Cable_{i}_{sy}", (x0, sy, z0), (x1, sy, z1), 0.06, mat_intl_orange, p_ggb)
            xm = 0.5 * (x0 + x1)
            zm = 0.5 * (z0 + z1)
            if zm > 1.65:
                add_strut(f"GGB_Hanger_{i}_{sy}", (xm, sy, 1.52), (xm, sy, zm), 0.025, mat_intl_orange, p_ggb)

    # -------------------------------------------------------------------------
    # 2. TRANSAMERICA PYRAMID (1972 William Pereira 260m Quartz Pyramid)
    # -------------------------------------------------------------------------
    p_trans = bpy.data.objects.new("Monument_transamerica_pyramid", None)
    p_trans.empty_display_type = "PLAIN_AXES"
    p_trans.location = (-5.0, -6.0, 0.0)
    scene.collection.objects.link(p_trans)

    add_box("Trans_Truss_Base", (2.15, 2.15, 0.55), (0, 0, 0.275), mat_concrete_pier, p_trans)
    add_cyl("Trans_Main_Pyramid", 1.48, 0.24, 5.45, 4, (0, 0, 3.275), mat_pyramid_white, p_trans, rot=(0, 0, math.pi / 4))
    # Iconic East & West Elevator/Stair Shaft "Wings" starting at the 29th floor
    add_box("Trans_East_Wing", (1.65, 0.42, 2.85), (0, 0, 3.65), mat_pyramid_wing, p_trans)
    add_cyl("Trans_Glass_Crown", 0.24, 0.02, 0.95, 4, (0, 0, 6.45), mat_salesforce_glass, p_trans, rot=(0, 0, math.pi / 4))

    # -------------------------------------------------------------------------
    # 3. COIT TOWER (1933 Arthur Brown Jr. Fluted Art Deco Column)
    # -------------------------------------------------------------------------
    p_coit = bpy.data.objects.new("Monument_coit_tower", None)
    p_coit.empty_display_type = "PLAIN_AXES"
    p_coit.location = (5.0, -6.0, 0.0)
    scene.collection.objects.link(p_coit)

    add_cyl("Coit_Pioneer_Base", 1.85, 1.75, 0.55, 24, (0, 0, 0.275), mat_concrete_pier, p_coit)
    add_cyl("Coit_Rotunda_Lobby", 1.35, 1.32, 0.72, 20, (0, 0, 0.90), mat_coit_white, p_coit)
    add_cyl("Coit_Fluted_Shaft", 0.78, 0.66, 3.35, 24, (0, 0, 2.92), mat_coit_white, p_coit)
    add_cyl("Coit_Belvedere_Gallery", 0.72, 0.72, 0.48, 16, (0, 0, 4.82), mat_gold, p_coit)
    add_cyl("Coit_Lantern_Cap", 0.58, 0.36, 0.45, 16, (0, 0, 5.28), mat_coit_white, p_coit)

    # -------------------------------------------------------------------------
    # 4. SAN FRANCISCO FERRY BUILDING & CLOCK TOWER (1898 Beaux-Arts)
    # -------------------------------------------------------------------------
    p_ferry = bpy.data.objects.new("Monument_ferry_building", None)
    p_ferry.empty_display_type = "PLAIN_AXES"
    p_ferry.location = (15.0, -6.0, 0.0)
    scene.collection.objects.link(p_ferry)

    add_box("Ferry_Nave_Body", (6.2, 1.45, 1.25), (0, 0, 0.625), mat_sandstone, p_ferry)
    add_box("Ferry_Gable_Roof", (6.0, 1.25, 0.42), (0, 0, 1.45), mat_slate_navy, p_ferry)
    # 75m Seville Giralda Clock Tower
    add_box("Ferry_Tower_Shaft", (0.95, 0.95, 3.25), (0, -0.1, 2.25), mat_sandstone, p_ferry)
    add_box("Ferry_Clock_Stage", (1.02, 1.02, 0.65), (0, -0.1, 4.15), mat_gold, p_ferry)
    add_box("Ferry_Belfry", (0.76, 0.76, 0.68), (0, -0.1, 4.80), mat_sandstone, p_ferry)
    add_cyl("Ferry_Cupola", 0.46, 0.08, 0.65, 8, (0, -0.1, 5.45), mat_intl_orange, p_ferry)

    # -------------------------------------------------------------------------
    # 5. PALACE OF FINE ARTS ROTUNDA & PERISTYLE (1915 Bernard Maybeck)
    # -------------------------------------------------------------------------
    p_pfa = bpy.data.objects.new("Monument_palace_of_fine_arts", None)
    p_pfa.empty_display_type = "PLAIN_AXES"
    p_pfa.location = (-15.0, 6.0, 0.0)
    scene.collection.objects.link(p_pfa)

    # Octagonal Classical Rotunda Columns + Drum + Terracotta Dome
    for i in range(8):
        ang = (i / 8.0) * math.pi * 2.0
        cx, cy = math.cos(ang) * 1.25, math.sin(ang) * 1.25
        add_cyl(f"PFA_Rotunda_Col_{i}", 0.14, 0.12, 2.05, 12, (cx, cy, 1.025), mat_rotunda_ochre, p_pfa)
    add_cyl("PFA_Entablature_Drum", 1.42, 1.38, 0.65, 8, (0, 0, 2.35), mat_rotunda_ochre, p_pfa)
    add_cyl("PFA_Dome", 1.35, 0.32, 0.95, 16, (0, 0, 3.12), mat_rotunda_dome, p_pfa)
    # Curved Peristyle Colonnade behind the Rotunda
    for i in range(-5, 6):
        ang = (i / 5.0) * 1.15 + math.pi * 0.5
        px, py = math.cos(ang) * 2.55, math.sin(ang) * 2.25 + 0.55
        add_cyl(f"PFA_Peristyle_Col_{i}", 0.11, 0.10, 1.75, 10, (px, py, 0.875), mat_rotunda_ochre, p_pfa)
        add_box(f"PFA_Peristyle_Cap_{i}", (0.48, 0.38, 0.28), (px, py, 1.88), mat_rotunda_dome, p_pfa)

    # -------------------------------------------------------------------------
    # 6. SALESFORCE TOWER & TRANSIT CENTER (2018 César Pelli Obelisk)
    # -------------------------------------------------------------------------
    p_sf_tower = bpy.data.objects.new("Monument_salesforce_tower", None)
    p_sf_tower.empty_display_type = "PLAIN_AXES"
    p_sf_tower.location = (-5.0, 6.0, 0.0)
    scene.collection.objects.link(p_sf_tower)

    # Tapering curved-corner glass obelisk tower
    for tier in range(8):
        u0 = tier / 8.0
        u1 = (tier + 1) / 8.0
        z0, z1 = u0 * 5.8, u1 * 5.8
        r0 = 1.15 * (1.0 - u0 * 0.36)
        r1 = 1.15 * (1.0 - u1 * 0.36)
        add_cyl(f"SFTower_Tier_{tier}", r0, r1, (z1 - z0) * 0.96, 16, (-0.85, 0, 0.5 * (z0 + z1)), mat_salesforce_glass, p_sf_tower)
        add_cyl(f"SFTower_Fin_{tier}", r1 + 0.04, r1 + 0.04, 0.06, 16, (-0.85, 0, z1), mat_salesforce_trim, p_sf_tower)
    add_cyl("SFTower_Crown_Lantern", 0.72, 0.52, 0.95, 16, (-0.85, 0, 6.25), mat_salesforce_trim, p_sf_tower)
    # Adjacent Salesforce Transit Center & Rooftop Botanical Park
    add_box("SFTransit_Hull", (3.6, 1.45, 0.85), (1.35, 0, 0.425), mat_salesforce_trim, p_sf_tower)
    add_box("SFTransit_Roof_Park", (3.4, 1.25, 0.16), (1.35, 0, 0.92), mat_park_green, p_sf_tower)

    # -------------------------------------------------------------------------
    # 7. THE PAINTED LADIES OF ALAMO SQUARE (1892 Queen Anne Victorians)
    # -------------------------------------------------------------------------
    p_ladies = bpy.data.objects.new("Monument_painted_ladies", None)
    p_ladies.empty_display_type = "PLAIN_AXES"
    p_ladies.location = (5.0, 6.0, 0.0)
    scene.collection.objects.link(p_ladies)

    vic_mats = [mat_gold, mat_vic_blue, mat_vic_coral, mat_vic_mint, mat_coit_white, mat_rotunda_ochre]
    for i in range(6):
        vx = -2.25 + i * 0.90
        vz = 0.15 * i  # Stepping uphill along Steiner Street
        mat_v = vic_mats[i % len(vic_mats)]
        add_box(f"Lady_House_{i}", (0.82, 1.85, 1.65), (vx, 0, vz + 0.825), mat_v, p_ladies)
        add_box(f"Lady_BayWin_{i}", (0.42, 0.36, 1.35), (vx - 0.15, -0.98, vz + 0.75), mat_coit_white, p_ladies)
        add_cyl(f"Lady_Gable_{i}", 0.56, 0.08, 0.72, 4, (vx, -0.25, vz + 1.98), mat_slate_navy, p_ladies, rot=(0, 0, math.pi / 4))
        add_box(f"Lady_Stoop_{i}", (0.34, 0.55, 0.35), (vx + 0.20, -1.05, vz + 0.18), mat_sandstone, p_ladies)

    # -------------------------------------------------------------------------
    # 8. ALCATRAZ ISLAND LIGHTHOUSE & CELLHOUSE ("The Rock")
    # -------------------------------------------------------------------------
    p_alcatraz = bpy.data.objects.new("Monument_alcatraz_island", None)
    p_alcatraz.empty_display_type = "PLAIN_AXES"
    p_alcatraz.location = (15.0, 6.0, 0.0)
    scene.collection.objects.link(p_alcatraz)

    # Rocky sandstone island platform
    add_cyl("Alcatraz_Rock_Base", 2.85, 2.35, 0.75, 10, (0, 0, 0.375), mat_sandstone, p_alcatraz)
    # Main Concrete Cellhouse atop the crest
    add_box("Alcatraz_Cellhouse", (3.4, 1.45, 1.25), (-0.25, 0.15, 1.35), mat_concrete_pier, p_alcatraz)
    add_box("Alcatraz_Cellhouse_Roof", (3.5, 1.52, 0.18), (-0.25, 0.15, 2.05), mat_rotunda_dome, p_alcatraz)
    # 1909 Octagonal Concrete Alcatraz Lighthouse
    add_box("Alcatraz_Keeper_House", (0.95, 0.95, 0.75), (1.15, -0.65, 1.12), mat_coit_white, p_alcatraz)
    add_cyl("Alcatraz_Lighthouse_Shaft", 0.34, 0.24, 2.15, 8, (1.45, -0.65, 1.82), mat_coit_white, p_alcatraz)
    add_cyl("Alcatraz_Lighthouse_Lantern", 0.28, 0.26, 0.42, 12, (1.45, -0.65, 3.08), mat_intl_orange, p_alcatraz)
    # Iconic Alcatraz Water Tower
    add_cyl("Alcatraz_Water_Tank", 0.38, 0.38, 0.65, 12, (-1.65, -0.45, 2.35), mat_intl_orange, p_alcatraz)
    for lx, ly in ((-1.85, -0.65), (-1.45, -0.65), (-1.85, -0.25), (-1.45, -0.25)):
        add_strut(f"Alcatraz_Tank_Leg_{lx}_{ly}", (lx, ly, 0.75), (lx, ly, 2.05), 0.04, mat_slate_navy, p_alcatraz)


# =============================================================================
# RIO DE JANEIRO — 10 HANDCRAFTED MONUMENTS
# =============================================================================
def build_rio_monuments_in_scene(scene):
    """Builds all 10 multi-part Rio de Janeiro monuments inside `scene`."""
    make_mesh, add_box, add_cyl, add_strut = _make_scene_helpers(scene)

    mat_soapstone = _get_mat("Rio_Soapstone", (0.94, 0.92, 0.89), roughness=0.52, metallic=0.05)
    mat_granite_peak = _get_mat("Rio_Granite_Peak", (0.43, 0.42, 0.39), roughness=0.78, metallic=0.04)
    mat_jungle_green = _get_mat("Rio_Tijuca_Green", (0.12, 0.42, 0.26), roughness=0.68, metallic=0.02)
    mat_carnival_gold = _get_mat("Rio_Carnival_Gold", (1.0, 0.85, 0.27), roughness=0.28, metallic=0.68)
    mat_samba_magenta = _get_mat("Rio_Samba_Magenta", (1.0, 0.23, 0.50), roughness=0.35, metallic=0.18)
    mat_emerald = _get_mat("Rio_Emerald_Green", (0.07, 0.58, 0.35), roughness=0.42, metallic=0.12)
    mat_calatrava_white = _get_mat("Rio_Calatrava_White", (0.97, 0.98, 1.0), roughness=0.32, metallic=0.18)
    mat_guanabara_pool = _get_mat("Rio_Guanabara_Water", (0.06, 0.65, 0.91), roughness=0.15, metallic=0.10, alpha=0.88)
    mat_colonial_white = _get_mat("Rio_Lapa_Whitewash", (0.99, 0.98, 0.96), roughness=0.60, metallic=0.04)
    mat_brutalist_concrete = _get_mat("Rio_Brutalist_Concrete", (0.72, 0.70, 0.65), roughness=0.72, metallic=0.08)
    mat_beaux_arts_cream = _get_mat("Rio_BeauxArts_Cream", (0.92, 0.88, 0.80), roughness=0.55, metallic=0.06)
    mat_steel_cable = _get_mat("Rio_Steel_Cable", (0.55, 0.60, 0.65), roughness=0.35, metallic=0.75)

    # -------------------------------------------------------------------------
    # 1. CHRIST THE REDEEMER / CRISTO REDENTOR (1931 Paul Landowski Art Deco)
    # -------------------------------------------------------------------------
    p_christ = bpy.data.objects.new("Monument_christ_redeemer", None)
    p_christ.empty_display_type = "PLAIN_AXES"
    p_christ.location = (-20.0, -6.0, 0.0)
    scene.collection.objects.link(p_christ)

    # Corcovado peak granite outcrop + octagonal Art Deco pedestal
    add_cyl("Corcovado_Peak_Base", 1.85, 1.25, 1.35, 10, (0, 0, 0.675), mat_granite_peak, p_christ)
    add_cyl("Christ_Oct_Pedestal", 0.92, 0.78, 1.15, 8, (0, 0, 1.92), mat_soapstone, p_christ)
    # Fluted Art Deco Robe Torso, Outstretched 28m Arms, Head & Sacred Heart
    add_cyl("Christ_Robe_Torso", 0.52, 0.42, 2.75, 12, (0, 0, 3.85), mat_soapstone, p_christ)
    add_box("Christ_Outstretched_Arms", (2.85, 0.36, 0.42), (0, 0, 4.68), mat_soapstone, p_christ)
    add_box("Christ_Heart_Relief", (0.26, 0.12, 0.28), (0, -0.42, 4.45), mat_carnival_gold, p_christ)
    add_cyl("Christ_Head", 0.26, 0.22, 0.48, 12, (0, -0.05, 5.45), mat_soapstone, p_christ, rot=(0.12, 0, 0))

    # -------------------------------------------------------------------------
    # 2. SUGARLOAF MOUNTAIN & BONDINHO CABLE CAR (Pão de Açúcar, 1912)
    # -------------------------------------------------------------------------
    p_sugar = bpy.data.objects.new("Monument_sugarloaf", None)
    p_sugar.empty_display_type = "PLAIN_AXES"
    p_sugar.location = (-10.0, -6.0, 0.0)
    scene.collection.objects.link(p_sugar)

    # Morro da Urca (lower dome) & Pão de Açúcar (taller sheer granite monolith)
    add_cyl("Morro_da_Urca", 1.55, 0.85, 2.25, 14, (-1.85, 0, 1.125), mat_granite_peak, p_sugar)
    add_cyl("Urca_Forest_Skirt", 1.65, 1.35, 0.75, 14, (-1.85, 0, 0.375), mat_jungle_green, p_sugar)
    add_cyl("Pao_de_Acucar_Monolith", 1.75, 0.72, 4.45, 16, (1.55, 0, 2.225), mat_granite_peak, p_sugar)
    add_cyl("Pao_Forest_Skirt", 1.88, 1.55, 0.85, 16, (1.55, 0, 0.425), mat_jungle_green, p_sugar)
    # Terminal stations + Dual Bondinho Cableways & Yellow Cabins
    add_box("Urca_Station", (0.72, 0.62, 0.42), (-1.65, 0, 2.42), mat_calatrava_white, p_sugar)
    add_box("Sugarloaf_Station", (0.72, 0.62, 0.45), (1.35, 0, 4.62), mat_calatrava_white, p_sugar)
    add_strut("Bondinho_Cable_North", (-1.55, -0.15, 2.55), (1.25, -0.15, 4.75), 0.03, mat_steel_cable, p_sugar)
    add_strut("Bondinho_Cable_South", (-1.55, 0.15, 2.55), (1.25, 0.15, 4.75), 0.03, mat_steel_cable, p_sugar)
    add_box("Bondinho_Cabin_1", (0.34, 0.24, 0.28), (-0.45, -0.15, 3.22), mat_carnival_gold, p_sugar)
    add_box("Bondinho_Cabin_2", (0.34, 0.24, 0.28), (0.35, 0.15, 3.85), mat_carnival_gold, p_sugar)

    # -------------------------------------------------------------------------
    # 3. MARACANÃ STADIUM (1950 World Cup & 2016 Olympic Bowl)
    # -------------------------------------------------------------------------
    p_mara = bpy.data.objects.new("Monument_maracana", None)
    p_mara.empty_display_type = "PLAIN_AXES"
    p_mara.location = (0.0, -6.0, 0.0)
    scene.collection.objects.link(p_mara)

    add_cyl("Maracana_Outer_Bowl", 2.85, 3.15, 1.35, 32, (0, 0, 0.675), mat_calatrava_white, p_mara)
    add_cyl("Maracana_Turf_Pitch", 1.75, 1.75, 0.18, 28, (0, 0, 0.12), mat_emerald, p_mara)
    # Tension Roof Ring & Radial Structural Ribs
    for i in range(16):
        ang = (i / 16.0) * math.pi * 2.0
        x0, y0 = math.cos(ang) * 3.12, math.sin(ang) * 3.12
        x1, y1 = math.cos(ang) * 1.65, math.sin(ang) * 1.65
        add_strut(f"Maracana_Roof_Rib_{i}", (x0, y0, 1.38), (x1, y1, 1.52), 0.055, mat_calatrava_white, p_mara)
    # Monumental Bellini Statue Ramp
    add_box("Maracana_Metro_Ramp", (1.65, 0.58, 0.22), (-3.25, 0, 0.65), mat_brutalist_concrete, p_mara, rot=(0, 0.28, 0))

    # -------------------------------------------------------------------------
    # 4. MUSEUM OF TOMORROW / MUSEU DO AMANHÃ (2015 Santiago Calatrava)
    # -------------------------------------------------------------------------
    p_tomorrow = bpy.data.objects.new("Monument_museum_tomorrow", None)
    p_tomorrow.empty_display_type = "PLAIN_AXES"
    p_tomorrow.location = (10.0, -6.0, 0.0)
    scene.collection.objects.link(p_tomorrow)

    # Pier Mauá Esplanade & Reflecting Pools
    add_box("Tomorrow_Pier_Deck", (6.4, 2.2, 0.24), (0, 0, 0.12), mat_beaux_arts_cream, p_tomorrow)
    add_box("Tomorrow_Pool_Fore", (1.8, 1.5, 0.28), (-2.1, 0, 0.15), mat_guanabara_pool, p_tomorrow)
    add_box("Tomorrow_Pool_Aft", (1.8, 1.5, 0.28), (2.1, 0, 0.15), mat_guanabara_pool, p_tomorrow)
    add_box("Tomorrow_Main_Hall", (3.6, 1.05, 1.05), (0, 0, 0.72), mat_calatrava_white, p_tomorrow)
    # Cantilevered Brise-Soleil Solar Fin Arches extending 75m fore & aft
    for i in range(13):
        u = (i / 12.0) * 2.0 - 1.0
        rx = u * 2.75
        arch_z = 1.35 + abs(u) * 0.65
        wing_w = 1.55 - abs(u) * 0.35
        add_box(f"Tomorrow_Solar_Fin_{i}", (0.14, wing_w, 0.08), (rx, 0, arch_z), mat_calatrava_white, p_tomorrow, rot=(0, -u * 0.22, 0))
        add_strut(f"Tomorrow_Spine_Strut_{i}", (rx * 0.65, 0, 0.65), (rx, 0, arch_z), 0.045, mat_calatrava_white, p_tomorrow)

    # -------------------------------------------------------------------------
    # 5. ARCOS DA LAPA & SANTA TERESA BONDE (1750 Colonial Aqueduct)
    # -------------------------------------------------------------------------
    p_lapa = bpy.data.objects.new("Monument_arcos_lapa", None)
    p_lapa.empty_display_type = "PLAIN_AXES"
    p_lapa.location = (20.0, -6.0, 0.0)
    scene.collection.objects.link(p_lapa)

    # Two-Tier Whitewashed Roman Aqueduct (7 bays representing the 42 arches)
    for i in range(8):
        px = -2.8 + i * 0.80
        add_box(f"Lapa_Lower_Pier_{i}", (0.24, 0.52, 1.35), (px, 0, 0.675), mat_colonial_white, p_lapa)
        add_box(f"Lapa_Upper_Pier_{i}", (0.22, 0.46, 1.15), (px, 0, 2.05), mat_colonial_white, p_lapa)
    add_box("Lapa_Middle_Cornice", (6.0, 0.58, 0.22), (0, 0, 1.40), mat_colonial_white, p_lapa)
    add_box("Lapa_Upper_Viaduct_Deck", (6.2, 0.64, 0.26), (0, 0, 2.72), mat_colonial_white, p_lapa)
    # Iconic Yellow 1896 Santa Teresa Bonde Tram crossing the top crest
    add_box("Lapa_Santa_Teresa_Bonde", (1.25, 0.42, 0.48), (-0.4, 0, 3.08), mat_carnival_gold, p_lapa)

    # -------------------------------------------------------------------------
    # 6. CATEDRAL METROPOLITANA DE SÃO SEBASTIÃO (1979 Edgar Fonseca Cone)
    # -------------------------------------------------------------------------
    p_cat = bpy.data.objects.new("Monument_catedral_sao_sebastiao", None)
    p_cat.empty_display_type = "PLAIN_AXES"
    p_cat.location = (-20.0, 6.0, 0.0)
    scene.collection.objects.link(p_cat)

    add_cyl("Cat_Mayan_Cone", 2.35, 0.95, 3.85, 24, (0, 0, 1.925), mat_brutalist_concrete, p_cat)
    # Four 64m Stained-Glass Cross Ribbons (Cardinal Directions)
    add_box("Cat_Glass_NS", (0.28, 3.35, 3.78), (0, 0, 1.92), mat_guanabara_pool, p_cat)
    add_box("Cat_Glass_EW", (3.35, 0.28, 3.78), (0, 0, 1.92), mat_samba_magenta, p_cat)
    add_box("Cat_Skylight_Cross_1", (1.65, 0.24, 0.14), (0, 0, 3.90), mat_carnival_gold, p_cat)
    add_box("Cat_Skylight_Cross_2", (0.24, 1.65, 0.14), (0, 0, 3.90), mat_carnival_gold, p_cat)

    # -------------------------------------------------------------------------
    # 7. THEATRO MUNICIPAL DO RIO DE JANEIRO (1909 Cinelândia Beaux-Arts)
    # -------------------------------------------------------------------------
    p_theatro = bpy.data.objects.new("Monument_theatro_municipal", None)
    p_theatro.empty_display_type = "PLAIN_AXES"
    p_theatro.location = (-10.0, 6.0, 0.0)
    scene.collection.objects.link(p_theatro)

    add_box("Theatro_Plinth", (3.8, 4.4, 0.42), (0, 0, 0.21), mat_granite_peak, p_theatro)
    add_box("Theatro_Main_Body", (3.4, 3.8, 1.65), (0, 0.15, 1.24), mat_beaux_arts_cream, p_theatro)
    for cx in (-1.2, -0.6, 0.0, 0.6, 1.2):
        add_cyl(f"Theatro_Col_{cx}", 0.09, 0.08, 1.25, 10, (cx, -1.82, 1.05), mat_colonial_white, p_theatro)
    # Central Copper & Gold Opera Dome + Twin Corner Rotundas
    add_cyl("Theatro_Grand_Cupola", 1.15, 0.35, 1.05, 16, (0, 0.25, 2.55), mat_emerald, p_theatro)
    add_cyl("Theatro_Eagle_Finial", 0.18, 0.04, 0.45, 8, (0, 0.25, 3.25), mat_carnival_gold, p_theatro)
    for sx in (-1.25, 1.25):
        add_cyl(f"Theatro_Corner_Dome_{sx}", 0.48, 0.15, 0.58, 12, (sx, -1.35, 2.32), mat_carnival_gold, p_theatro)

    # -------------------------------------------------------------------------
    # 8. SAMBÓDROMO MARQUÊS DE SAPUCAÍ (1984 Oscar Niemeyer Apoteose Arch)
    # -------------------------------------------------------------------------
    p_samba = bpy.data.objects.new("Monument_sambodromo", None)
    p_samba.empty_display_type = "PLAIN_AXES"
    p_samba.location = (0.0, 6.0, 0.0)
    scene.collection.objects.link(p_samba)

    # Sapucaí Samba Parade Avenue & Cantilevered Concrete Grandstand Sectors
    add_box("Sapucai_Parade_Runway", (1.35, 5.6, 0.14), (0, 0, 0.07), mat_colonial_white, p_samba)
    for side in (-1.25, 1.25):
        for b in (-1.6, 0.0, 1.6):
            add_box(f"Sapucai_Bleacher_{side}_{b}", (0.85, 1.35, 1.05), (side, b, 0.55), mat_calatrava_white, p_samba, rot=(0, -0.25 if side < 0 else 0.25, 0))
    # Iconic M-Shaped Concrete Arch of Praça da Apoteose
    add_strut("Apoteose_Left_Pillar", (-1.15, 2.45, 0.0), (-0.85, 2.45, 3.25), 0.14, mat_calatrava_white, p_samba)
    add_strut("Apoteose_Right_Pillar", (1.15, 2.45, 0.0), (0.85, 2.45, 3.25), 0.14, mat_calatrava_white, p_samba)
    add_strut("Apoteose_M_Left_Wing", (-1.65, 2.45, 2.35), (-0.55, 2.45, 3.55), 0.13, mat_calatrava_white, p_samba)
    add_strut("Apoteose_M_Center_V1", (-0.55, 2.45, 3.55), (0.0, 2.45, 2.65), 0.13, mat_samba_magenta, p_samba)
    add_strut("Apoteose_M_Center_V2", (0.0, 2.45, 2.65), (0.55, 2.45, 3.55), 0.13, mat_samba_magenta, p_samba)
    add_strut("Apoteose_M_Right_Wing", (0.55, 2.45, 3.55), (1.65, 2.45, 2.35), 0.13, mat_calatrava_white, p_samba)

    # -------------------------------------------------------------------------
    # 9. ESTAÇÃO CENTRAL DO BRASIL & 110M ART DECO CLOCK TOWER (1943)
    # -------------------------------------------------------------------------
    p_central = bpy.data.objects.new("Monument_central_do_brasil", None)
    p_central.empty_display_type = "PLAIN_AXES"
    p_central.location = (10.0, 6.0, 0.0)
    scene.collection.objects.link(p_central)

    add_box("Central_Concourse_Wings", (4.4, 2.2, 1.35), (0, 0, 0.675), mat_beaux_arts_cream, p_central)
    add_box("Central_Train_Shed", (3.6, 3.2, 1.05), (0, 1.85, 0.525), mat_granite_peak, p_central)
    # 110m Stepped Art Deco Clock Tower ("Big Ben Carioca")
    add_box("Central_Tower_Shaft", (1.15, 1.15, 3.85), (0, -0.35, 2.45), mat_beaux_arts_cream, p_central)
    add_box("Central_Clock_Tier", (0.96, 0.96, 0.85), (0, -0.35, 4.75), mat_carnival_gold, p_central)
    add_box("Central_Crown_Cap", (0.68, 0.68, 0.45), (0, -0.35, 5.38), mat_beaux_arts_cream, p_central)

    # -------------------------------------------------------------------------
    # 10. COPACABANA PALACE & BURLE MARX CALÇADÃO (1923 Joseph Gire)
    # -------------------------------------------------------------------------
    p_copa = bpy.data.objects.new("Monument_copacabana_palace", None)
    p_copa.empty_display_type = "PLAIN_AXES"
    p_copa.location = (20.0, 6.0, 0.0)
    scene.collection.objects.link(p_copa)

    # Burle Marx Portuguese Stone Wave Promenade + Turquoise Pool Terrace
    add_box("Copa_Wave_Promenade", (5.4, 1.25, 0.14), (0, -1.65, 0.07), mat_colonial_white, p_copa)
    add_box("Copa_Pool_Court", (2.2, 1.15, 0.18), (0, -0.65, 0.09), mat_guanabara_pool, p_copa)
    # Grand White Stucco Mediterranean Palace Wings & Central Cupola
    add_box("Copa_Main_Palace", (4.8, 1.45, 1.85), (0, 0.45, 0.925), mat_colonial_white, p_copa)
    add_box("Copa_Center_Pavilion", (1.65, 1.65, 2.35), (0, 0.38, 1.175), mat_colonial_white, p_copa)
    add_cyl("Copa_Central_Dome", 0.68, 0.22, 0.65, 12, (0, 0.38, 2.65), mat_carnival_gold, p_copa)
    for wx in (-1.95, 1.95):
        add_box(f"Copa_Wing_Tower_{wx}", (0.95, 1.58, 2.15), (wx, 0.40, 1.075), mat_colonial_white, p_copa)


# =============================================================================
# WARSAW — 8 HANDCRAFTED MONUMENTS (Scene_Warsaw)
# =============================================================================
def build_warsaw_monuments_in_scene(scene):
    """Builds all 8 multi-part Warsaw monuments inside `scene`."""
    make_mesh, add_box, add_cyl, add_strut = _make_scene_helpers(scene)

    mat_pkin_sandstone = _get_mat("Waw_PKiN_Sandstone", (0.90, 0.86, 0.78), roughness=0.58, metallic=0.06)
    mat_castle_terracotta = _get_mat("Waw_Castle_Terracotta", (0.79, 0.36, 0.26), roughness=0.54, metallic=0.05)
    mat_copper_patina = _get_mat("Waw_Copper_Patina", (0.28, 0.59, 0.48), roughness=0.42, metallic=0.35)
    mat_polish_crimson = _get_mat("Waw_Polish_Crimson", (0.86, 0.08, 0.24), roughness=0.36, metallic=0.15)
    mat_amber_gold = _get_mat("Waw_Amber_Gold", (0.96, 0.73, 0.26), roughness=0.26, metallic=0.72)
    mat_lazienki_white = _get_mat("Waw_Lazienki_White", (0.98, 0.96, 0.93), roughness=0.45, metallic=0.05)
    mat_varso_glass = _get_mat("Waw_Varso_Glass", (0.38, 0.62, 0.84), roughness=0.14, metallic=0.42, alpha=0.86)
    mat_polin_jade = _get_mat("Waw_POLIN_JadeGlass", (0.41, 0.69, 0.67), roughness=0.16, metallic=0.28, alpha=0.86)
    mat_polin_canyon = _get_mat("Waw_POLIN_Canyon", (0.78, 0.49, 0.33), roughness=0.52, metallic=0.08)
    mat_wilanow_gold = _get_mat("Waw_Wilanow_Yellow", (0.95, 0.78, 0.24), roughness=0.48, metallic=0.10)
    mat_granite_dark = _get_mat("Waw_Granite_Dark", (0.32, 0.32, 0.35), roughness=0.65, metallic=0.15)
    mat_bronze = _get_mat("Waw_Syrenka_Bronze", (0.34, 0.28, 0.20), roughness=0.35, metallic=0.80)

    # -------------------------------------------------------------------------
    # 1. PALACE OF CULTURE AND SCIENCE / PAŁAC KULTURY I NAUKI (1955, 237m)
    # -------------------------------------------------------------------------
    p_pkin = bpy.data.objects.new("Monument_palace_culture", None)
    p_pkin.empty_display_type = "PLAIN_AXES"
    p_pkin.location = (-15.0, -6.0, 0.0)
    scene.collection.objects.link(p_pkin)

    # Wide Congress Hall & Museum Podium + 4 Corner Pavilions
    add_box("PKiN_Podium_Base", (3.8, 3.8, 0.85), (0, 0, 0.425), mat_pkin_sandstone, p_pkin)
    for cx in (-1.35, 1.35):
        for cy in (-1.35, 1.35):
            add_box(f"PKiN_Corner_Pav_{cx}_{cy}", (0.95, 0.95, 1.65), (cx, cy, 0.825), mat_pkin_sandstone, p_pkin)
            add_box(f"PKiN_Corner_Attic_{cx}_{cy}", (1.02, 1.02, 0.18), (cx, cy, 1.72), mat_amber_gold, p_pkin)
    # Stepped Central Skyscraper Tiers + Millennium Clock Stage + Spire
    add_box("PKiN_Lower_Shaft", (1.65, 1.65, 2.65), (0, 0, 1.95), mat_pkin_sandstone, p_pkin)
    add_box("PKiN_Mid_Shaft", (1.28, 1.28, 1.65), (0, 0, 4.05), mat_pkin_sandstone, p_pkin)
    add_box("PKiN_Clock_Tier", (0.98, 0.98, 0.92), (0, 0, 5.28), mat_amber_gold, p_pkin)
    add_cyl("PKiN_Oct_Lantern", 0.48, 0.34, 0.85, 8, (0, 0, 6.12), mat_pkin_sandstone, p_pkin)
    add_cyl("PKiN_Needle_Spire", 0.09, 0.015, 1.85, 8, (0, 0, 7.45), mat_amber_gold, p_pkin)

    # -------------------------------------------------------------------------
    # 2. ROYAL CASTLE & SIGISMUND'S COLUMN (Zamek Królewski, 1619 / 1644)
    # -------------------------------------------------------------------------
    p_castle = bpy.data.objects.new("Monument_royal_castle", None)
    p_castle.empty_display_type = "PLAIN_AXES"
    p_castle.location = (-5.0, -6.0, 0.0)
    scene.collection.objects.link(p_castle)

    # Early Baroque Terracotta West Facade & Pentagonal Courtyard Wings
    add_box("Castle_Main_Wing", (4.4, 1.35, 1.55), (0, 0.35, 0.775), mat_castle_terracotta, p_castle)
    add_box("Castle_Gable_Roof", (4.5, 1.15, 0.45), (0, 0.35, 1.75), mat_copper_patina, p_castle)
    for wx in (-1.95, 1.95):
        add_box(f"Castle_Flank_Wing_{wx}", (0.95, 2.2, 1.48), (wx, 0.75, 0.74), mat_castle_terracotta, p_castle)
        add_cyl(f"Castle_Corner_Turret_{wx}", 0.42, 0.12, 0.85, 8, (wx, -0.25, 1.95), mat_copper_patina, p_castle)
    # 60m Zygmuntowska Clock Tower & Bulbous Baroque Copper Helmet
    add_box("Zygmunt_Tower_Shaft", (1.05, 1.05, 2.85), (0, 0.20, 1.425), mat_castle_terracotta, p_castle)
    add_cyl("Zygmunt_Bulbous_Helm", 0.56, 0.22, 0.95, 12, (0, 0.20, 3.32), mat_copper_patina, p_castle)
    add_cyl("Zygmunt_Spire_Finial", 0.14, 0.02, 0.75, 8, (0, 0.20, 4.15), mat_amber_gold, p_castle)
    # 1644 Sigismund's Column (Kolumna Zygmunta III Wazy) on Plac Zamkowy
    add_box("Sigismund_Plinth", (0.58, 0.58, 0.42), (0, -1.65, 0.21), mat_pkin_sandstone, p_castle)
    add_cyl("Sigismund_Shaft", 0.14, 0.12, 1.95, 12, (0, -1.65, 1.38), mat_castle_terracotta, p_castle)
    add_cyl("Sigismund_Bronze_King", 0.18, 0.08, 0.48, 8, (0, -1.65, 2.58), mat_bronze, p_castle)

    # -------------------------------------------------------------------------
    # 3. PALACE ON THE ISLE IN ŁAZIENKI PARK (Pałac na Wyspie, 1795)
    # -------------------------------------------------------------------------
    p_laz = bpy.data.objects.new("Monument_lazienki_palace", None)
    p_laz.empty_display_type = "PLAIN_AXES"
    p_laz.location = (5.0, -6.0, 0.0)
    scene.collection.objects.link(p_laz)

    # Reflecting Royal Baths Lake Basin + Island Terrace
    add_box("Laz_Lake_Basin", (5.4, 3.2, 0.16), (0, 0, 0.08), mat_varso_glass, p_laz)
    add_box("Laz_Island_Terrace", (3.6, 2.1, 0.28), (0, 0, 0.22), mat_pkin_sandstone, p_laz)
    # Neoclassical White Palace Corps de Logis, Corinthian Portico & Belvedere Lantern
    add_box("Laz_Palace_Body", (2.8, 1.45, 1.25), (0, 0, 0.98), mat_lazienki_white, p_laz)
    for cx in (-0.75, -0.25, 0.25, 0.75):
        add_cyl(f"Laz_Portico_Col_{cx}", 0.08, 0.07, 1.18, 10, (cx, -0.82, 0.95), mat_lazienki_white, p_laz)
    add_box("Laz_Attic_Balustrade", (2.2, 1.15, 0.28), (0, 0, 1.72), mat_amber_gold, p_laz)
    add_cyl("Laz_Belvedere_Rotunda", 0.58, 0.54, 0.62, 16, (0, 0, 2.15), mat_lazienki_white, p_laz)
    add_cyl("Laz_Copper_Dome", 0.56, 0.12, 0.42, 16, (0, 0, 2.65), mat_copper_patina, p_laz)
    # Twin Colonnade Water Bridges
    for sx in (-2.05, 2.05):
        add_box(f"Laz_Colonnade_Bridge_{sx}", (0.95, 0.55, 0.65), (sx, 0, 0.52), mat_lazienki_white, p_laz)

    # -------------------------------------------------------------------------
    # 4. WARSZAWA CENTRALNA (1975) & VARSO TOWER (2022, 310m EU Supertall)
    # -------------------------------------------------------------------------
    p_cent = bpy.data.objects.new("Monument_warszawa_centralna", None)
    p_cent.empty_display_type = "PLAIN_AXES"
    p_cent.location = (15.0, -6.0, 0.0)
    scene.collection.objects.link(p_cent)

    # 1975 Arseniusz Romanowicz Cantilevered Winged Station Hall
    add_box("Centralna_Glass_Hall", (2.8, 2.1, 0.95), (1.15, 0, 0.475), mat_varso_glass, p_cent)
    add_box("Centralna_Cantilever_Roof", (3.6, 2.6, 0.22), (1.15, 0, 1.08), mat_lazienki_white, p_cent, rot=(0.06, 0, 0))
    # 2022 Foster + Partners 310m Varso Tower (3 Stepped Glass Volumes + 80m Spire)
    add_box("Varso_Main_Shaft", (1.25, 1.05, 5.25), (-1.25, 0, 2.625), mat_varso_glass, p_cent)
    add_box("Varso_South_Step", (0.75, 0.88, 3.85), (-0.55, 0.15, 1.925), mat_varso_glass, p_cent)
    add_box("Varso_Crown_Terrace", (1.05, 0.88, 0.55), (-1.25, 0, 5.52), mat_lazienki_white, p_cent)
    add_cyl("Varso_310m_Spire", 0.08, 0.015, 1.95, 8, (-1.25, 0, 6.75), mat_amber_gold, p_cent)

    # -------------------------------------------------------------------------
    # 5. PGE NARODOWY NATIONAL STADIUM (2012 Outward-Flaring Crown, Open Roof Ring & Spire)
    # -------------------------------------------------------------------------
    p_nar = bpy.data.objects.new("Monument_stadion_narodowy", None)
    p_nar.empty_display_type = "PLAIN_AXES"
    p_nar.location = (-15.0, 6.0, 0.0)
    scene.collection.objects.link(p_nar)

    mat_pitch_green = _get_mat("Waw_Narodowy_Pitch_Green", (0.16, 0.56, 0.22), roughness=0.65, metallic=0.02)
    mat_ptfe_roof = _get_mat("Waw_Narodowy_PTFE_White", (0.96, 0.97, 0.99), roughness=0.32, metallic=0.08)
    mat_steel_crown = _get_mat("Waw_Narodowy_Steel_Crown", (0.88, 0.90, 0.93), roughness=0.28, metallic=0.62)

    # Terraced Earthen Embankment Plinth + Open Interior Bowl & Green Pitch
    add_cyl("Narodowy_Earthen_Plinth", 3.05, 2.75, 0.42, 28, (0, 0, 0.21), mat_pkin_sandstone, p_nar)
    add_cyl("Narodowy_Green_Pitch", 1.48, 1.48, 0.10, 24, (0, 0, 0.44), mat_pitch_green, p_nar)

    # 3-Tier Checkered/Woven Red & White Basketweave Facade + 28 Outward-Flaring Crown Poles
    num_bays = 28
    for i in range(num_bays):
        ang = (i / float(num_bays)) * math.pi * 2.0
        cos_a, sin_a = math.cos(ang), math.sin(ang)

        # 3 stacked basketweave rings tilting slightly outward like the stadium bowl
        for tier_idx, (tz, tr) in enumerate(((0.66, 2.36), (1.02, 2.44), (1.38, 2.52))):
            is_red = ((i + tier_idx) % 3 != 0) if (tier_idx == 1) else ((i + tier_idx) % 2 == 0)
            mat_seg = mat_polish_crimson if is_red else mat_lazienki_white
            add_box(
                f"Narodowy_Facade_T{tier_idx}_{i}",
                (0.54, 0.14, 0.33),
                (cos_a * tr, sin_a * tr, tz),
                mat_seg,
                p_nar,
                rot=(0, 0, ang + math.pi * 0.5),
            )

        # Outward-flaring perimeter steel column/pole (sticks OUTWARD from r=2.38 at base to r=2.98 at crown tip)
        pole_bot = (cos_a * 2.38, sin_a * 2.38, 0.42)
        pole_top = (cos_a * 2.98, sin_a * 2.98, 2.24)
        add_strut(f"Narodowy_Outward_Pole_{i}", pole_bot, pole_top, 0.042, mat_steel_crown, p_nar)

        # Upper backstay from outward pole tip down-inward to outer edge of PTFE roof ring
        roof_outer_pt = (cos_a * 2.50, sin_a * 2.50, 1.66)
        add_strut(f"Narodowy_Outer_Stay_{i}", pole_top, roof_outer_pt, 0.022, mat_steel_crown, p_nar)

        # Open-Center Pleated White PTFE Roof Canopy Ring (spans ONLY r=1.32..2.50, leaving center r<1.32 OPEN!)
        mid_r = 1.91
        add_box(
            f"Narodowy_Roof_Bay_{i}",
            (0.42, 1.18, 0.09),
            (cos_a * mid_r, sin_a * mid_r, 1.64),
            mat_ptfe_roof,
            p_nar,
            rot=(0.04, 0, ang + math.pi * 0.5),
        )

        # Dark steel inner tension ring framing the open roof aperture at r=1.30
        add_box(
            f"Narodowy_Inner_Ring_{i}",
            (0.32, 0.09, 0.08),
            (cos_a * 1.30, sin_a * 1.30, 1.66),
            mat_granite_dark,
            p_nar,
            rot=(0, 0, ang + math.pi * 0.5),
        )

    # Low-angle radial spoke cables across the open center holding the suspended central needle spire
    for i in range(14):
        ang = (i / 14.0) * math.pi * 2.0
        rx, ry = math.cos(ang) * 1.30, math.sin(ang) * 1.30
        add_strut(f"Narodowy_Radial_Cable_{i}", (rx, ry, 1.66), (0, 0, 1.76), 0.018, mat_steel_crown, p_nar)

    # Suspended Central Red-and-White Striped Needle Spire (hovering at z=1.42..2.92 over the open pitch)
    add_cyl("Narodowy_Central_Spire_Base", 0.22, 0.08, 0.22, 12, (0, 0, 1.72), mat_ptfe_roof, p_nar)
    add_cyl("Narodowy_Central_Spire_Lower", 0.07, 0.055, 0.65, 10, (0, 0, 1.82), mat_lazienki_white, p_nar)
    add_cyl("Narodowy_Central_Spire_RedBand", 0.055, 0.042, 0.45, 10, (0, 0, 2.37), mat_polish_crimson, p_nar)
    add_cyl("Narodowy_Central_Spire_Top", 0.042, 0.022, 0.42, 10, (0, 0, 2.80), mat_lazienki_white, p_nar)
    # Polish White & Crimson Flag flying at top of the spire
    add_box("Narodowy_Flag_White", (0.38, 0.04, 0.11), (0.20, 0, 2.94), mat_lazienki_white, p_nar)
    add_box("Narodowy_Flag_Red", (0.38, 0.04, 0.11), (0.20, 0, 2.83), mat_polish_crimson, p_nar)

    # -------------------------------------------------------------------------
    # 6. OLD TOWN MARKET SQUARE & WARSAW MERMAID (Rynek i Syrenka, 1855)
    # -------------------------------------------------------------------------
    p_rynek = bpy.data.objects.new("Monument_stare_miasto_siren", None)
    p_rynek.empty_display_type = "PLAIN_AXES"
    p_rynek.location = (-5.0, 6.0, 0.0)
    scene.collection.objects.link(p_rynek)

    add_box("Rynek_Cobble_Plaza", (4.6, 4.2, 0.18), (0, 0, 0.09), mat_pkin_sandstone, p_rynek)
    # Row of 5 Polychrome Sgraffito Burgher Tenements (Dekert Side)
    tenement_mats = [mat_castle_terracotta, mat_wilanow_gold, mat_copper_patina, mat_polin_canyon, mat_lazienki_white]
    for i in range(5):
        tx = -1.76 + i * 0.88
        th = 1.65 + (i % 2) * 0.22
        add_box(f"Rynek_Tenement_{i}", (0.84, 1.25, th), (tx, 1.15, th * 0.5 + 0.18), tenement_mats[i], p_rynek)
        add_box(f"Rynek_Attic_Gable_{i}", (0.78, 1.15, 0.38), (tx, 1.15, th + 0.35), mat_castle_terracotta, p_rynek)
    # Center Fountain & 1855 Armed Bronze Syrenka Warszawska
    add_cyl("Syrenka_Fountain_Basin", 0.95, 0.92, 0.28, 16, (0, -0.55, 0.28), mat_varso_glass, p_rynek)
    add_cyl("Syrenka_Pedestal", 0.32, 0.26, 0.72, 10, (0, -0.55, 0.75), mat_pkin_sandstone, p_rynek)
    add_cyl("Syrenka_Bronze_Figure", 0.22, 0.12, 0.75, 10, (0, -0.55, 1.45), mat_bronze, p_rynek)
    add_box("Syrenka_Sword_Shield", (0.48, 0.16, 0.42), (0.12, -0.55, 1.72), mat_amber_gold, p_rynek, rot=(0, -0.35, 0))

    # -------------------------------------------------------------------------
    # 7. WILANÓW PALACE — THE POLISH VERSAILLES (1696 King Jan III Sobieski)
    # -------------------------------------------------------------------------
    p_wil = bpy.data.objects.new("Monument_wilanow_palace", None)
    p_wil.empty_display_type = "PLAIN_AXES"
    p_wil.location = (5.0, 6.0, 0.0)
    scene.collection.objects.link(p_wil)

    # Baroque Cour d'Honneur Central Corps de Logis + Flanking Gallery Wings + Twin Towers
    add_box("Wilanow_Main_Corps", (2.8, 1.35, 1.65), (0, 0.65, 0.825), mat_wilanow_gold, p_wil)
    add_box("Wilanow_Belvedere_Attic", (1.65, 1.15, 0.65), (0, 0.65, 1.95), mat_lazienki_white, p_wil)
    for sx in (-1.85, 1.85):
        add_box(f"Wilanow_Side_Gallery_{sx}", (0.95, 2.25, 1.15), (sx, -0.15, 0.575), mat_wilanow_gold, p_wil)
        add_box(f"Wilanow_Corner_Tower_{sx}", (0.88, 0.88, 2.15), (sx, -1.15, 1.075), mat_lazienki_white, p_wil)
        add_cyl(f"Wilanow_Baroque_Helmet_{sx}", 0.52, 0.14, 0.78, 12, (sx, -1.15, 2.52), mat_copper_patina, p_wil)

    # -------------------------------------------------------------------------
    # 8. POLIN MUSEUM (2013 Glass Canyon) & GHETTO HEROES MONUMENT (1948)
    # -------------------------------------------------------------------------
    p_polin = bpy.data.objects.new("Monument_polin_uprising", None)
    p_polin.empty_display_type = "PLAIN_AXES"
    p_polin.location = (15.0, 6.0, 0.0)
    scene.collection.objects.link(p_polin)

    # Luminous Jade-Glass Cube Cloven by Curving Sculptural Canyon
    add_box("POLIN_Glass_Wing_Left", (1.35, 2.8, 1.95), (-1.15, 0.35, 0.975), mat_polin_jade, p_polin)
    add_box("POLIN_Glass_Wing_Right", (1.35, 2.8, 1.95), (0.45, 0.35, 0.975), mat_polin_jade, p_polin)
    add_box("POLIN_Curving_Canyon", (0.65, 2.95, 1.88), (-0.35, 0.35, 0.94), mat_polin_canyon, p_polin, rot=(0, 0.08, 0.12))
    # 1948 Nathan Rapoport Monument to the Ghetto Heroes facing POLIN Plaza
    add_box("Rapoport_Plinth", (1.85, 0.95, 0.28), (1.65, -1.15, 0.14), mat_pkin_sandstone, p_polin)
    add_box("Rapoport_Labradorite_Pylon", (0.92, 0.48, 1.85), (1.65, -1.15, 1.05), mat_granite_dark, p_polin)
    add_box("Rapoport_Bronze_Relief", (0.58, 0.22, 0.95), (1.65, -1.42, 0.85), mat_bronze, p_polin)


# =============================================================================
# ZURICH — 8 HANDCRAFTED MONUMENTS (Scene_Zurich)
# =============================================================================
def build_zurich_monuments_in_scene(scene):
    """Builds all 8 multi-part Zurich monuments inside `scene`."""
    make_mesh, add_box, add_cyl, add_strut = _make_scene_helpers(scene)

    mat_jura_sandstone = _get_mat("Zrh_Jura_Sandstone", (0.87, 0.82, 0.72), roughness=0.58, metallic=0.05)
    mat_limestone_white = _get_mat("Zrh_Limestone_White", (0.95, 0.93, 0.88), roughness=0.48, metallic=0.05)
    mat_sbb_red = _get_mat("Zrh_SBB_Red", (0.89, 0.04, 0.09), roughness=0.35, metallic=0.18)
    mat_karlsturm_red = _get_mat("Zrh_Karlsturm_Helmet", (0.72, 0.20, 0.16), roughness=0.44, metallic=0.22)
    mat_copper_patina = _get_mat("Zrh_Fraumuenster_Copper", (0.23, 0.56, 0.50), roughness=0.40, metallic=0.38)
    mat_swiss_gold = _get_mat("Zrh_Swiss_Gold", (0.92, 0.73, 0.20), roughness=0.25, metallic=0.78)
    mat_prime_teal_glass = _get_mat("Zrh_Prime_Teal_Glass", (0.26, 0.55, 0.62), roughness=0.14, metallic=0.42, alpha=0.88)
    mat_lake_cyan = _get_mat("Zrh_Lake_Cyan", (0.18, 0.62, 0.78), roughness=0.20, metallic=0.25, alpha=0.86)
    mat_slate_roof = _get_mat("Zrh_Slate_Roof", (0.30, 0.35, 0.40), roughness=0.52, metallic=0.18)
    mat_maag_brick = _get_mat("Zrh_Maag_Brick", (0.64, 0.28, 0.22), roughness=0.62, metallic=0.05)
    mat_steel_silver = _get_mat("Zrh_Steel_Silver", (0.76, 0.80, 0.84), roughness=0.32, metallic=0.65)
    mat_alpine_green = _get_mat("Zrh_Alpine_Green", (0.20, 0.46, 0.28), roughness=0.68, metallic=0.04)

    # -------------------------------------------------------------------------
    # 1. GROSSMÜNSTER (1220 Romanesque Twin-Towered Cathedral)
    # -------------------------------------------------------------------------
    p_gross = bpy.data.objects.new("Monument_grossmuenster", None)
    p_gross.empty_display_type = "PLAIN_AXES"
    p_gross.location = (-15.0, -6.0, 0.0)
    scene.collection.objects.link(p_gross)

    # Three-aisle Romanesque Basilica Nave, Clerestory & Gable Roof
    add_box("Gross_Terrace_Plinth", (3.6, 4.4, 0.38), (0, 0, 0.19), mat_jura_sandstone, p_gross)
    add_box("Gross_Nave_Hall", (2.5, 3.2, 1.85), (0, 0.35, 1.30), mat_jura_sandstone, p_gross)
    add_box("Gross_Nave_Roof", (2.3, 3.2, 0.55), (0, 0.35, 2.45), mat_slate_roof, p_gross)
    # Iconic Twin Towers (Karlsturm & Glockenturm) with 1787 Octagonal Belfries & Scarlet Domes
    for tx in (-0.88, 0.88):
        add_box(f"Gross_Tower_Shaft_{tx}", (0.92, 0.92, 3.45), (tx, -1.15, 2.05), mat_jura_sandstone, p_gross)
        add_box(f"Gross_Gothic_Balustrade_{tx}", (1.02, 1.02, 0.24), (tx, -1.15, 3.88), mat_limestone_white, p_gross)
        add_cyl(f"Gross_Oct_Belfry_{tx}", 0.44, 0.42, 0.78, 8, (tx, -1.15, 4.38), mat_limestone_white, p_gross)
        add_cyl(f"Gross_Cupola_Helm_{tx}", 0.45, 0.10, 0.72, 8, (tx, -1.15, 5.12), mat_karlsturm_red, p_gross)
        add_cyl(f"Gross_Gold_Finial_{tx}", 0.08, 0.02, 0.42, 8, (tx, -1.15, 5.68), mat_swiss_gold, p_gross)

    # -------------------------------------------------------------------------
    # 2. FRAUMÜNSTER ABBEY (853) & ST. PETER'S CLOCK TOWER (8.7m Dial)
    # -------------------------------------------------------------------------
    p_frau = bpy.data.objects.new("Monument_fraumuenster_st_peter", None)
    p_frau.empty_display_type = "PLAIN_AXES"
    p_frau.location = (-5.0, -6.0, 0.0)
    scene.collection.objects.link(p_frau)

    # Fraumünster Gothic Nave, Chagall Choir & Slender 64m Blue-Green Copper Needle Spire
    add_box("Frau_Nave", (1.85, 2.85, 1.55), (-0.75, 0.25, 0.775), mat_jura_sandstone, p_frau)
    add_box("Frau_Chagall_Choir", (0.95, 1.15, 1.68), (-0.75, 1.85, 0.84), mat_lake_cyan, p_frau)
    add_box("Frau_North_Tower", (0.86, 0.86, 2.85), (-0.25, 0.95, 1.425), mat_jura_sandstone, p_frau)
    add_cyl("Frau_Copper_Spire", 0.42, 0.03, 2.65, 8, (-0.25, 0.95, 4.18), mat_copper_patina, p_frau)
    # St. Peter's Church Tower (Europe's Largest 8.7m Golden Clock Dial)
    add_box("StPeter_Nave", (1.45, 1.85, 1.25), (1.15, -0.45, 0.625), mat_limestone_white, p_frau)
    add_box("StPeter_Clock_Tower", (1.05, 1.05, 2.95), (1.15, -1.15, 1.475), mat_limestone_white, p_frau)
    add_box("StPeter_Giant_Clock_NS", (0.78, 1.12, 0.78), (1.15, -1.15, 2.35), mat_swiss_gold, p_frau)
    add_box("StPeter_Giant_Clock_EW", (1.12, 0.78, 0.78), (1.15, -1.15, 2.35), mat_swiss_gold, p_frau)
    add_cyl("StPeter_Gable_Helm", 0.62, 0.05, 1.15, 4, (1.15, -1.15, 3.52), mat_karlsturm_red, p_frau, rot=(0, 0, math.pi * 0.25))

    # -------------------------------------------------------------------------
    # 3. ZÜRICH HAUPTBAHNHOF (1871 Wanner Triumphal Portal & Train Shed)
    # -------------------------------------------------------------------------
    p_hb = bpy.data.objects.new("Monument_zurich_hb", None)
    p_hb.empty_display_type = "PLAIN_AXES"
    p_hb.location = (5.0, -6.0, 0.0)
    scene.collection.objects.link(p_hb)

    # 1871 Jakob Friedrich Wanner Sandstone Headhouse & Triumphal Arch Portal
    add_box("HB_Wanner_Kopfbau", (4.2, 1.45, 1.45), (0, -1.35, 0.725), mat_jura_sandstone, p_hb)
    add_box("HB_Triumphal_Portal", (1.45, 1.65, 2.15), (0, -1.42, 1.075), mat_limestone_white, p_hb)
    add_cyl("HB_Portal_Arch", 0.52, 0.52, 1.72, 16, (0, -1.42, 1.15), mat_prime_teal_glass, p_hb, rot=(math.pi * 0.5, 0, 0))
    add_box("HB_SBB_Clock_Sign", (0.48, 0.18, 0.48), (0, -2.28, 1.85), mat_sbb_red, p_hb)
    # Multi-Span Iron & Glass Train Shed (Gleishalle)
    for sx in (-1.25, 0.0, 1.25):
        add_cyl(f"HB_Train_Shed_Vault_{sx}", 0.68, 0.68, 3.2, 14, (sx, 0.85, 0.85), mat_steel_silver, p_hb, rot=(math.pi * 0.5, 0, 0))
    add_box("HB_Shed_Side_Walls", (4.1, 3.2, 0.85), (0, 0.85, 0.425), mat_jura_sandstone, p_hb)

    # -------------------------------------------------------------------------
    # 4. ETH ZÜRICH SEMPER HAUPTGEBÄUDE (1864) & 1889 UBS POLYBAHN
    # -------------------------------------------------------------------------
    p_eth = bpy.data.objects.new("Monument_eth_polybahn", None)
    p_eth.empty_display_type = "PLAIN_AXES"
    p_eth.location = (15.0, -6.0, 0.0)
    scene.collection.objects.link(p_eth)

    # Polyterrasse Retaining Wall & Panoramic Deck
    add_box("ETH_Polyterrasse_Base", (4.8, 3.2, 0.85), (0, 0.45, 0.425), mat_jura_sandstone, p_eth)
    # Gottfried Semper Neoclassical Palace Wings + Central Portico + 1918 Gustav Gull Dome
    add_box("ETH_Semper_Corps", (4.2, 1.95, 1.45), (0, 0.65, 1.55), mat_limestone_white, p_eth)
    add_box("ETH_Central_Portico", (1.65, 2.25, 1.75), (0, 0.55, 1.70), mat_limestone_white, p_eth)
    add_box("ETH_Gull_Drum", (1.25, 1.25, 0.65), (0, 0.65, 2.75), mat_jura_sandstone, p_eth)
    add_cyl("ETH_Gull_Cupola", 0.68, 0.22, 0.72, 16, (0, 0.65, 3.38), mat_slate_roof, p_eth)
    # 1889 UBS Polybahn Inclined Funicular Viaduct & Crimson Car
    add_strut("Polybahn_Viaduct_Track", (-1.45, -2.25, 0.15), (-0.85, -0.85, 0.92), 0.18, mat_steel_silver, p_eth)
    add_box("Polybahn_Crimson_Car", (0.38, 0.62, 0.36), (-1.15, -1.55, 0.68), mat_sbb_red, p_eth, rot=(0.48, 0, -0.38))

    # -------------------------------------------------------------------------
    # 5. OPERNHAUS ZÜRICH & SECHSELÄUTENPLATZ (1891 Fellner & Helmer)
    # -------------------------------------------------------------------------
    p_opera = bpy.data.objects.new("Monument_opernhaus_zurich", None)
    p_opera.empty_display_type = "PLAIN_AXES"
    p_opera.location = (-15.0, 6.0, 0.0)
    scene.collection.objects.link(p_opera)

    add_box("Opera_Sechselaeuten_Plinth", (3.8, 4.2, 0.28), (0, 0, 0.14), mat_jura_sandstone, p_opera)
    add_box("Opera_Main_Auditorium", (2.9, 3.2, 1.55), (0, 0.20, 1.05), mat_limestone_white, p_opera)
    add_cyl("Opera_Curved_Foyer", 1.25, 1.25, 1.25, 16, (0, -1.15, 0.90), mat_limestone_white, p_opera)
    add_cyl("Opera_Copper_Dome", 1.15, 0.42, 0.85, 16, (0, 0.05, 2.22), mat_copper_patina, p_opera)
    add_box("Opera_Stage_Flytower", (2.2, 1.45, 2.25), (0, 1.10, 1.40), mat_limestone_white, p_opera)
    add_box("Opera_Gold_Pediment", (1.65, 0.35, 0.38), (0, -1.55, 1.72), mat_swiss_gold, p_opera)

    # -------------------------------------------------------------------------
    # 6. PRIME TOWER & HARDBRÜCKE VIADUCT (2011 Gigon/Guyer, 126m)
    # -------------------------------------------------------------------------
    p_prime = bpy.data.objects.new("Monument_prime_tower", None)
    p_prime.empty_display_type = "PLAIN_AXES"
    p_prime.location = (-5.0, 6.0, 0.0)
    scene.collection.objects.link(p_prime)

    # Faceted Blue-Green Glass Polygon Skyscraper with Cantilevered Upper Setbacks
    add_cyl("Prime_Lower_Octagon", 1.12, 1.18, 2.85, 8, (-0.55, 0, 1.425), mat_prime_teal_glass, p_prime)
    add_cyl("Prime_Mid_Cantilever", 1.22, 1.15, 2.15, 8, (-0.42, 0.12, 3.92), mat_prime_teal_glass, p_prime)
    add_cyl("Prime_Clouds_Crown", 1.08, 1.02, 1.35, 8, (-0.50, -0.08, 5.65), mat_prime_teal_glass, p_prime)
    # Historic Maag Gear-Works Brick Hall at the base
    add_box("Maag_Brick_Halle", (1.85, 2.45, 0.95), (1.25, 0.15, 0.475), mat_maag_brick, p_prime)
    add_box("Maag_Sawtooth_Roof", (1.85, 2.45, 0.28), (1.25, 0.15, 1.08), mat_slate_roof, p_prime)

    # -------------------------------------------------------------------------
    # 7. KUNSTHAUS ZÜRICH (1910 Moser Hall & 2021 Chipperfield Building)
    # -------------------------------------------------------------------------
    p_kunst = bpy.data.objects.new("Monument_kunsthaus_heimplatz", None)
    p_kunst.empty_display_type = "PLAIN_AXES"
    p_kunst.location = (5.0, 6.0, 0.0)
    scene.collection.objects.link(p_kunst)

    # 2021 David Chipperfield Jura-Limestone Pavilion with Fluted Colonnade
    add_box("Chipperfield_Main_Cube", (2.6, 1.95, 1.55), (0.95, 0, 0.775), mat_limestone_white, p_kunst)
    for px in (-0.15, 0.40, 0.95, 1.50, 2.05):
        add_box(f"Chipperfield_Pilaster_{px}", (0.12, 2.04, 1.58), (px, 0, 0.79), mat_jura_sandstone, p_kunst)
    add_box("Chipperfield_Brass_Portal", (0.85, 2.06, 0.65), (0.95, 0, 0.35), mat_swiss_gold, p_kunst)
    # 1910 Karl Moser Jugendstil Villa & Gallery Wing across Heimplatz
    add_box("Moser_Jugendstil_Hall", (1.85, 2.25, 1.35), (-1.35, 0.20, 0.675), mat_jura_sandstone, p_kunst)
    add_box("Moser_Gable_Roof", (1.65, 2.15, 0.42), (-1.35, 0.20, 1.55), mat_karlsturm_red, p_kunst)

    # -------------------------------------------------------------------------
    # 8. UETLIBERG KULM OBSERVATION TOWER & TV MAST (870m Summit)
    # -------------------------------------------------------------------------
    p_uet = bpy.data.objects.new("Monument_uetliberg_kulm", None)
    p_uet.empty_display_type = "PLAIN_AXES"
    p_uet.location = (15.0, 6.0, 0.0)
    scene.collection.objects.link(p_uet)

    # Wooded Uetliberg Summit Crag & Hotel Uto Kulm Sun Terrace
    add_cyl("Uetliberg_Summit_Knoll", 2.65, 2.15, 0.65, 16, (0, 0, 0.325), mat_alpine_green, p_uet)
    add_box("Uto_Kulm_Hotel", (1.85, 1.25, 0.95), (-0.65, 0.35, 1.12), mat_limestone_white, p_uet)
    # 72m Triangular Steel Lattice Lookout Tower (Aussichtsturm) + Cantilevered Skydeck
    add_cyl("Uetliberg_Lattice_Shaft", 0.34, 0.22, 3.85, 3, (0.65, -0.35, 2.55), mat_steel_silver, p_uet)
    add_cyl("Uetliberg_Panorama_Deck", 0.78, 0.72, 0.28, 3, (0.65, -0.35, 3.65), mat_swiss_gold, p_uet)
    add_cyl("Uetliberg_RedWhite_Mast", 0.09, 0.02, 2.15, 8, (0.65, -0.35, 5.55), mat_sbb_red, p_uet)


# =============================================================================
# MELBOURNE — 8 HANDCRAFTED MONUMENTS (Scene_Melbourne)
# =============================================================================
def build_melbourne_monuments_in_scene(scene):
    """Builds all 8 multi-part Melbourne monuments inside `scene`."""
    make_mesh, add_box, add_cyl, add_strut = _make_scene_helpers(scene)

    mat_flinders_yellow = _get_mat("Mel_Flinders_Yellow", (0.91, 0.73, 0.24), roughness=0.52, metallic=0.08)
    mat_flinders_red = _get_mat("Mel_Flinders_Red", (0.66, 0.22, 0.17), roughness=0.56, metallic=0.06)
    mat_copper_dome = _get_mat("Mel_Copper_Dome", (0.24, 0.56, 0.47), roughness=0.38, metallic=0.36)
    mat_bluestone = _get_mat("Mel_Victorian_Bluestone", (0.28, 0.31, 0.35), roughness=0.68, metallic=0.08)
    mat_exhibition_cream = _get_mat("Mel_Exhibition_Cream", (0.94, 0.91, 0.84), roughness=0.48, metallic=0.05)
    mat_shrine_granite = _get_mat("Mel_Shrine_Granite", (0.86, 0.84, 0.80), roughness=0.54, metallic=0.06)
    mat_fedsq_sandstone = _get_mat("Mel_FedSq_Sandstone", (0.85, 0.58, 0.36), roughness=0.55, metallic=0.10)
    mat_fedsq_zinc = _get_mat("Mel_FedSq_Zinc", (0.56, 0.64, 0.70), roughness=0.30, metallic=0.55)
    mat_eureka_cobalt = _get_mat("Mel_Eureka_Cobalt", (0.12, 0.35, 0.68), roughness=0.14, metallic=0.45, alpha=0.88)
    mat_eureka_gold = _get_mat("Mel_Eureka_24k_Gold", (0.96, 0.77, 0.18), roughness=0.18, metallic=0.88)
    mat_mcg_turf = _get_mat("Mel_MCG_Turf", (0.16, 0.54, 0.28), roughness=0.65, metallic=0.02)
    mat_silver_spire = _get_mat("Mel_Silver_Spire", (0.88, 0.91, 0.95), roughness=0.28, metallic=0.62)

    # -------------------------------------------------------------------------
    # 1. FLINDERS STREET STATION (1910 Copper Dome, Clocks & Edwardian Facade)
    # -------------------------------------------------------------------------
    p_flin = bpy.data.objects.new("Monument_flinders_street", None)
    p_flin.empty_display_type = "PLAIN_AXES"
    p_flin.location = (-15.0, -6.0, 0.0)
    scene.collection.objects.link(p_flin)

    # Long Edwardian Yellow & Blood-Red Facade along Flinders Street
    add_box("Flinders_Concourse_Body", (4.8, 1.65, 1.35), (0, -0.35, 0.675), mat_flinders_yellow, p_flin)
    add_box("Flinders_Red_Band", (4.86, 1.70, 0.32), (0, -0.35, 0.92), mat_flinders_red, p_flin)
    # Famous Corner Arched Entrance ("Under the Clocks") & Ribbed Green Copper Dome
    add_box("Flinders_Dome_Podium", (1.55, 1.55, 1.85), (1.45, -0.45, 0.925), mat_flinders_red, p_flin)
    add_box("Flinders_Clocks_Row", (1.25, 0.22, 0.28), (1.45, -1.25, 1.12), mat_exhibition_cream, p_flin)
    add_cyl("Flinders_Copper_Dome", 0.78, 0.24, 1.05, 16, (1.45, -0.45, 2.35), mat_copper_dome, p_flin)
    add_cyl("Flinders_Dome_Lantern", 0.22, 0.05, 0.55, 10, (1.45, -0.45, 3.12), mat_eureka_gold, p_flin)
    # Elizabeth Street Clock Tower at the western end + Platform Canopies
    add_box("Flinders_Elizabeth_Clock_Tower", (0.88, 0.88, 2.95), (-1.95, -0.45, 1.475), mat_flinders_red, p_flin)
    add_box("Flinders_Tower_Clock_Face", (0.94, 0.94, 0.45), (-1.95, -0.45, 2.55), mat_exhibition_cream, p_flin)
    add_box("Flinders_Platform_Canopies", (4.6, 1.45, 0.55), (0, 1.05, 0.275), mat_fedsq_zinc, p_flin)

    # -------------------------------------------------------------------------
    # 2. ROYAL EXHIBITION BUILDING (1880 UNESCO World Heritage Florentine Dome)
    # -------------------------------------------------------------------------
    p_rex = bpy.data.objects.new("Monument_royal_exhibition", None)
    p_rex.empty_display_type = "PLAIN_AXES"
    p_rex.location = (-5.0, -6.0, 0.0)
    scene.collection.objects.link(p_rex)

    # Cruciform Great Hall Nave + Transept + Triumphal Fanlight Portals
    add_box("Rex_Great_Nave", (4.8, 1.55, 1.45), (0, 0, 0.725), mat_exhibition_cream, p_rex)
    add_box("Rex_Transept", (1.65, 3.4, 1.55), (0, 0, 0.775), mat_exhibition_cream, p_rex)
    add_box("Rex_South_Portal", (1.45, 0.45, 1.85), (0, -1.75, 0.925), mat_exhibition_cream, p_rex)
    # 68m Octagonal Florentine Drum, Slate Dome & Golden Cupola Lantern
    add_cyl("Rex_Octagonal_Drum", 0.98, 0.95, 1.15, 8, (0, 0, 1.95), mat_exhibition_cream, p_rex)
    add_cyl("Rex_Florentine_Dome", 0.96, 0.28, 1.15, 8, (0, 0, 3.08), mat_bluestone, p_rex)
    add_cyl("Rex_Cupola_Lantern", 0.28, 0.08, 0.75, 8, (0, 0, 3.98), mat_eureka_gold, p_rex)

    # -------------------------------------------------------------------------
    # 3. SHRINE OF REMEMBRANCE (1934 Stepped Mausoleum Pyramid & Doric Portico)
    # -------------------------------------------------------------------------
    p_shr = bpy.data.objects.new("Monument_shrine_remembrance", None)
    p_shr.empty_display_type = "PLAIN_AXES"
    p_shr.location = (5.0, -6.0, 0.0)
    scene.collection.objects.link(p_shr)

    # Terraced Domain Mound + Square Granite Sanctuary + Doric Porticoes
    add_box("Shrine_Terrace_Steps", (4.2, 4.2, 0.45), (0, 0, 0.225), mat_shrine_granite, p_shr)
    add_box("Shrine_Sanctuary_Cube", (2.6, 2.6, 1.55), (0, 0, 1.20), mat_shrine_granite, p_shr)
    add_box("Shrine_North_Portico", (2.1, 0.65, 1.35), (0, -1.55, 1.10), mat_exhibition_cream, p_shr)
    add_box("Shrine_South_Portico", (2.1, 0.65, 1.35), (0, 1.55, 1.10), mat_exhibition_cream, p_shr)
    # Stepped Pyramid of Halicarnassus Roof
    for step_i in range(5):
        w = 2.35 - step_i * 0.38
        z = 2.12 + step_i * 0.28
        add_box(f"Shrine_Pyramid_Step_{step_i}", (w, w, 0.28), (0, 0, z), mat_shrine_granite, p_shr)

    # -------------------------------------------------------------------------
    # 4. FEDERATION SQUARE (2002 Deconstructivist Pinwheel Sandstone & Glass)
    # -------------------------------------------------------------------------
    p_fed = bpy.data.objects.new("Monument_federation_square", None)
    p_fed.empty_display_type = "PLAIN_AXES"
    p_fed.location = (15.0, -6.0, 0.0)
    scene.collection.objects.link(p_fed)

    add_box("FedSq_Cobble_Deck", (4.6, 3.8, 0.24), (0, 0, 0.12), mat_fedsq_sandstone, p_fed)
    # Angular Deconstructivist Shards (ACMI, NGV Australia & Glazed Atrium)
    add_box("FedSq_ACMI_Shard", (1.85, 1.35, 1.55), (-1.15, -0.45, 0.90), mat_fedsq_zinc, p_fed, rot=(0.08, -0.06, 0.28))
    add_box("FedSq_Sandstone_Wing", (1.65, 1.45, 1.68), (-0.85, 0.85, 0.96), mat_fedsq_sandstone, p_fed, rot=(-0.05, 0.08, -0.22))
    add_box("FedSq_Glass_Atrium", (1.15, 2.85, 1.85), (0.35, 0.15, 1.05), mat_eureka_cobalt, p_fed, rot=(0, 0, 0.12))
    add_box("FedSq_NGV_East_Shard", (1.45, 1.85, 1.52), (1.45, 0.25, 0.88), mat_fedsq_zinc, p_fed, rot=(0.06, 0.05, -0.18))

    # -------------------------------------------------------------------------
    # 5. EUREKA TOWER & MELBOURNE SKYDECK (2006 297.3m 24-Carat Gold Crown)
    # -------------------------------------------------------------------------
    p_eur = bpy.data.objects.new("Monument_eureka_tower", None)
    p_eur.empty_display_type = "PLAIN_AXES"
    p_eur.location = (-15.0, 6.0, 0.0)
    scene.collection.objects.link(p_eur)

    add_box("Eureka_Podium", (2.4, 2.2, 0.75), (0, 0, 0.375), mat_fedsq_sandstone, p_eur)
    # Cobalt-Blue & White Eureka Stockade Shaft + Vertical Red Stripe
    add_box("Eureka_Cobalt_Shaft", (1.35, 1.15, 5.25), (0, 0, 3.00), mat_eureka_cobalt, p_eur)
    add_box("Eureka_White_Fin", (0.38, 1.24, 4.85), (-0.42, 0, 2.80), mat_exhibition_cream, p_eur)
    add_box("Eureka_Blood_Stripe", (0.14, 1.26, 5.85), (0.18, 0, 3.30), mat_flinders_red, p_eur)
    # 24-Carat Gold-Plated Top 10 Floors + Cantilevered Level 88 Edge Cube
    add_box("Eureka_24k_Gold_Crown", (1.28, 1.08, 1.35), (0.05, 0, 6.28), mat_eureka_gold, p_eur)
    add_box("Eureka_Edge_Skydeck_Cube", (0.55, 0.55, 0.38), (0.62, -0.45, 5.85), mat_eureka_gold, p_eur)

    # -------------------------------------------------------------------------
    # 6. MELBOURNE CRICKET GROUND — THE 'G (100,024-Seat Colosseum & 6 Light Towers)
    # -------------------------------------------------------------------------
    p_mcg = bpy.data.objects.new("Monument_mcg_stadium", None)
    p_mcg.empty_display_type = "PLAIN_AXES"
    p_mcg.location = (-5.0, 6.0, 0.0)
    scene.collection.objects.link(p_mcg)

    # Outer Colosseum Bowl + Emerald Cricket/AFL Oval + White Pitch
    add_cyl("MCG_Outer_Bowl", 2.95, 2.55, 1.35, 32, (0, 0, 0.675), mat_silver_spire, p_mcg)
    add_cyl("MCG_Roof_Rim", 3.05, 2.85, 0.25, 32, (0, 0, 1.42), mat_fedsq_zinc, p_mcg)
    add_cyl("MCG_Turf_Oval", 2.15, 2.15, 0.22, 28, (0, 0, 0.12), mat_mcg_turf, p_mcg)
    add_box("MCG_Cricket_Pitch", (0.28, 0.85, 0.26), (0, 0, 0.14), mat_exhibition_cream, p_mcg)
    # Six Signature 85m Inclined Tubular Steel Light Towers
    for i in range(6):
        ang = (i / 6.0) * math.pi * 2.0 + 0.25
        tx, ty = math.cos(ang) * 3.15, math.sin(ang) * 3.15
        hx, hy = math.cos(ang) * 2.75, math.sin(ang) * 2.75
        add_strut(f"MCG_Light_Mast_{i}", (tx, ty, 0.0), (hx, hy, 3.15), 0.08, mat_silver_spire, p_mcg)
        add_box(f"MCG_Floodlight_Bank_{i}", (0.55, 0.18, 0.32), (hx, hy, 3.22), mat_eureka_gold, p_mcg, rot=(0, 0, ang + math.pi * 0.5))

    # -------------------------------------------------------------------------
    # 7. ARTS CENTRE MELBOURNE & 162M BALLERINA SPIRE (1984 Sir Roy Grounds)
    # -------------------------------------------------------------------------
    p_arts = bpy.data.objects.new("Monument_arts_centre_spire", None)
    p_arts.empty_display_type = "PLAIN_AXES"
    p_arts.location = (5.0, 6.0, 0.0)
    scene.collection.objects.link(p_arts)

    # Theatres Building Circular Drum + Cascading Tutu Skirt + 162m Lattice Spire
    add_cyl("Arts_Theatres_Drum", 1.95, 1.85, 0.85, 24, (0, 0, 0.425), mat_exhibition_cream, p_arts)
    add_cyl("Arts_Tutu_Lower_Skirt", 2.25, 0.95, 1.15, 16, (0, 0, 1.35), mat_silver_spire, p_arts)
    add_cyl("Arts_Brass_Lattice_Tier", 0.92, 0.38, 1.45, 12, (0, 0, 2.55), mat_eureka_gold, p_arts)
    add_cyl("Arts_162m_Needle_Spire", 0.36, 0.03, 3.65, 8, (0, 0, 5.05), mat_silver_spire, p_arts)

    # -------------------------------------------------------------------------
    # 8. BOLTE BRIDGE (1999 Twin 140m Cantilevered Silver Needle Towers)
    # -------------------------------------------------------------------------
    p_bolte = bpy.data.objects.new("Monument_bolte_bridge", None)
    p_bolte.empty_display_type = "PLAIN_AXES"
    p_bolte.location = (15.0, 6.0, 0.0)
    scene.collection.objects.link(p_bolte)

    # Box-Girder Highway Viaduct Deck along the X-axis + River Piers
    add_box("Bolte_Highway_Deck", (6.8, 0.88, 0.24), (0, 0, 1.45), mat_fedsq_zinc, p_bolte)
    for px in (-2.4, -0.8, 0.8, 2.4):
        add_box(f"Bolte_River_Pier_{px}", (0.34, 0.72, 1.45), (px, 0, 0.725), mat_shrine_granite, p_bolte)
    # Twin 140m Free-Standing Tapering Silver Concrete Needle Obelisks Flanking the Deck
    for ty in (-0.72, 0.72):
        add_cyl(f"Bolte_140m_Needle_{ty}", 0.26, 0.06, 5.25, 4, (0, ty, 2.625), mat_silver_spire, p_bolte, rot=(0, 0, math.pi * 0.25))
        add_box(f"Bolte_Needle_Beacon_{ty}", (0.16, 0.16, 0.25), (0, ty, 5.32), mat_eureka_gold, p_bolte)



