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
Handcrafted Multi-Part Architectural Builders for Sydney (Scene_Sydney, 557 objects)
and New York City (Scene_NYC, 459 objects), designed for Live Blender MCP & Headless CLI.
Each monument is created as a root EMPTY node (`Monument_<slug>`) with multi-part child meshes
and Principled BSDF materials matching ParisMonumentsBuilder.ts.
"""

import math
import bpy
import bmesh
from mathutils import Vector


def _get_mat(name, color, metallic=0.0, roughness=0.5, alpha=1.0, emission=None, emission_strength=0.0):
    mat = bpy.data.materials.get(name)
    if not mat:
        mat = bpy.data.materials.new(name=name)
        mat.use_nodes = True
    bsdf = next((n for n in mat.node_tree.nodes if n.type == "BSDF_PRINCIPLED"), None)
    if bsdf:
        bsdf.inputs["Base Color"].default_value = (*color, 1.0)
        bsdf.inputs["Metallic"].default_value = metallic
        bsdf.inputs["Roughness"].default_value = roughness
        if "Alpha" in bsdf.inputs:
            bsdf.inputs["Alpha"].default_value = alpha
        if emission and "Emission Color" in bsdf.inputs:
            bsdf.inputs["Emission Color"].default_value = (*emission, 1.0)
            bsdf.inputs["Emission Strength"].default_value = emission_strength
    mat.diffuse_color = (*color, alpha)
    return mat


def _make_scene_helpers(scene):
    def make_mesh(name, bm, mat, parent, loc=(0, 0, 0), rot=(0, 0, 0)):
        mesh = bpy.data.meshes.new(name)
        bm.to_mesh(mesh)
        bm.free()
        for poly in mesh.polygons:
            poly.use_smooth = False
        obj = bpy.data.objects.new(name, mesh)
        obj.location = loc
        obj.rotation_euler = rot
        if mat:
            obj.data.materials.append(mat)
        scene.collection.objects.link(obj)
        obj.parent = parent
        return obj

    def add_box(name, size, loc, mat, parent, rot=(0, 0, 0)):
        bm = bmesh.new()
        bmesh.ops.create_cube(bm, size=1.0)
        for v in bm.verts:
            v.co.x *= size[0]
            v.co.y *= size[1]
            v.co.z *= size[2]
        return make_mesh(name, bm, mat, parent, loc, rot)

    def add_cyl(name, r1, r2, depth, segs, loc, mat, parent, rot=(0, 0, 0)):
        bm = bmesh.new()
        bmesh.ops.create_cone(
            bm, cap_ends=True, cap_tris=False, segments=segs, radius1=r1, radius2=r2, depth=depth
        )
        return make_mesh(name, bm, mat, parent, loc, rot)

    def add_strut(name, p1, p2, radius, mat, parent, segs=6):
        v1 = Vector(p1)
        v2 = Vector(p2)
        diff = v2 - v1
        length = diff.length
        if length < 1e-4:
            return None
        mid = (v1 + v2) * 0.5
        bm = bmesh.new()
        bmesh.ops.create_cone(
            bm, cap_ends=True, cap_tris=False, segments=segs, radius1=radius, radius2=radius, depth=length
        )
        quat = diff.normalized().to_track_quat("Z", "Y")
        return make_mesh(name, bm, mat, parent, mid, quat.to_euler())

    return make_mesh, add_box, add_cyl, add_strut


def build_sydney_monuments_in_scene(scene):
    """Builds all 8 multi-part Sydney monuments inside `scene`."""
    make_mesh, add_box, add_cyl, add_strut = _make_scene_helpers(scene)

    mat_sail = _get_mat("Syd_CeramicSail", (0.97, 0.95, 0.90), roughness=0.22)
    mat_podium = _get_mat("Syd_PinkGranite", (0.76, 0.64, 0.54), roughness=0.72)
    mat_bronze_glass = _get_mat("Syd_BronzeGlass", (0.28, 0.22, 0.16), metallic=0.6, roughness=0.25)
    mat_bridge_steel = _get_mat("Syd_BridgeGreySteel", (0.34, 0.38, 0.42), metallic=0.82, roughness=0.38)
    mat_moruya_granite = _get_mat("Syd_MoruyaGranite", (0.68, 0.66, 0.62), roughness=0.70)
    mat_road_deck = _get_mat("Syd_RoadDeck", (0.20, 0.22, 0.25), roughness=0.80)
    mat_tower_gold = _get_mat("Syd_TurretGold", (0.86, 0.65, 0.20), metallic=0.88, roughness=0.22)
    mat_tower_shaft = _get_mat("Syd_TowerShaft", (0.88, 0.86, 0.82), roughness=0.50)
    mat_cable_steel = _get_mat("Syd_CableSteel", (0.78, 0.80, 0.84), metallic=0.90, roughness=0.25)
    mat_sandstone = _get_mat("Syd_PyrmontSandstone", (0.84, 0.68, 0.46), roughness=0.68)
    mat_sandstone_dark = _get_mat("Syd_SandstoneTrim", (0.66, 0.51, 0.33), roughness=0.75)
    mat_verdigris = _get_mat("Syd_CopperVerdigris", (0.24, 0.58, 0.48), metallic=0.35, roughness=0.42)
    mat_skylight = _get_mat("Syd_GlassSkylight", (0.55, 0.78, 0.88), metallic=0.2, roughness=0.15)
    mat_slate_roof = _get_mat("Syd_SlateRoof", (0.25, 0.28, 0.33), roughness=0.65)
    mat_clock_face = _get_mat(
        "Syd_ClockFace", (0.98, 0.95, 0.84), roughness=0.3, emission=(0.98, 0.92, 0.72), emission_strength=0.8
    )
    mat_luna_white = _get_mat("Syd_LunaWhite", (0.96, 0.95, 0.92), roughness=0.35)
    mat_luna_red = _get_mat("Syd_CarnivalRed", (0.85, 0.16, 0.14), roughness=0.38)
    mat_luna_blue = _get_mat("Syd_HarbourBlue", (0.14, 0.42, 0.78), roughness=0.38)
    mat_luna_gold = _get_mat("Syd_CarnivalGold", (0.95, 0.76, 0.18), metallic=0.5, roughness=0.3)
    mat_dark_mouth = _get_mat("Syd_DarkPortal", (0.08, 0.08, 0.10), roughness=0.9)
    mat_crown_glass = _get_mat("Syd_CrownGlass", (0.42, 0.68, 0.86), metallic=0.78, roughness=0.14)
    mat_crown_silver = _get_mat("Syd_CrownSilver", (0.85, 0.88, 0.92), metallic=0.88, roughness=0.20)

    # 1. SYDNEY OPERA HOUSE
    p_opera = bpy.data.objects.new("Monument_sydney_opera_house", None)
    p_opera.empty_display_type = "PLAIN_AXES"
    p_opera.location = (-15.0, 0.0, 0.0)
    scene.collection.objects.link(p_opera)

    add_box("Monument_sydney_opera_house_podium_base", (4.4, 6.2, 0.55), (0, 0, 0.275), mat_podium, p_opera)
    add_box("Monument_sydney_opera_house_podium_upper", (3.8, 5.0, 0.45), (0, 0.2, 0.775), mat_podium, p_opera)
    for i in range(6):
        step_y = -2.6 + i * 0.18
        step_z = 0.08 + i * 0.14
        add_box(f"Monument_sydney_opera_house_stair_{i}", (3.4, 0.22, 0.16), (0, step_y, step_z), mat_podium, p_opera)

    def create_opera_shell(name, x_off, y_off, z_base, height, width, length, tilt_y, rot_z):
        bm = bmesh.new()
        segs_u = 10
        segs_v = 8
        grid = []
        for iv in range(segs_v + 1):
            v = iv / segs_v
            row = []
            w_cur = width * (1.0 - 0.82 * (v ** 1.35))
            z_cur = height * math.sin(v * math.pi * 0.5)
            y_cur = length * (v * 0.75)
            for iu in range(segs_u + 1):
                u = (iu / segs_u) * 2.0 - 1.0
                x_pt = u * w_cur * 0.5
                arch_drop = (u * u) * (height * 0.28 * (1.0 - v * 0.5))
                rib_bump = 0.035 * (1.0 if iu % 2 == 0 else -0.5) * (1.0 - v * 0.6)
                z_pt = max(0.0, z_cur - arch_drop) + rib_bump
                y_pt = y_cur - (u * u) * length * 0.18
                thick = -0.18 if iu in (0, segs_u) else 0.0
                row.append(bm.verts.new((x_pt, y_pt + thick, z_pt)))
            grid.append(row)
        for iv in range(segs_v):
            for iu in range(segs_u):
                v1 = grid[iv][iu]
                v2 = grid[iv][iu + 1]
                v3 = grid[iv + 1][iu + 1]
                v4 = grid[iv + 1][iu]
                bm.faces.new((v1, v2, v3, v4))
        bmesh.ops.solidify(bm, geom=bm.faces[:] + bm.edges[:] + bm.verts[:], thickness=0.14)
        bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
        return make_mesh(name, bm, mat_sail, p_opera, loc=(x_off, y_off, z_base), rot=(tilt_y, 0, rot_z))

    concert_shells = [
        ("ch_s1", -0.82, -0.95, 0.95, 2.35, 1.45, 1.25, 0.12, 0.06),
        ("ch_s2", -0.82, -0.15, 0.95, 3.15, 1.75, 1.50, 0.08, 0.05),
        ("ch_s3", -0.82, 0.75, 0.95, 3.65, 1.95, 1.65, 0.04, 0.04),
        ("ch_s4", -0.82, 1.85, 0.95, 2.65, 1.55, 1.30, -0.18, 3.14),
    ]
    for sname, xo, yo, zb, h, w, l, ty, rz in concert_shells:
        create_opera_shell(f"Monument_sydney_opera_house_{sname}", xo, yo, zb, h, w, l, ty, rz)
        add_box(f"Monument_sydney_opera_house_{sname}_glass", (w * 0.68, 0.18, h * 0.55), (xo, yo + 0.25, zb + h * 0.28), mat_bronze_glass, p_opera, rot=(0, 0, rz))

    joan_shells = [
        ("js_s1", 0.92, -0.75, 0.95, 1.95, 1.25, 1.10, 0.12, -0.06),
        ("js_s2", 0.92, 0.05, 0.95, 2.60, 1.50, 1.35, 0.08, -0.05),
        ("js_s3", 0.92, 0.90, 0.95, 3.05, 1.70, 1.50, 0.04, -0.04),
        ("js_s4", 0.92, 1.80, 0.95, 2.15, 1.35, 1.15, -0.18, 3.08),
    ]
    for sname, xo, yo, zb, h, w, l, ty, rz in joan_shells:
        create_opera_shell(f"Monument_sydney_opera_house_{sname}", xo, yo, zb, h, w, l, ty, rz)
        add_box(f"Monument_sydney_opera_house_{sname}_glass", (w * 0.68, 0.18, h * 0.55), (xo, yo + 0.25, zb + h * 0.28), mat_bronze_glass, p_opera, rot=(0, 0, rz))

    create_opera_shell("Monument_sydney_opera_house_bennelong_1", -1.45, -1.95, 0.75, 1.35, 0.95, 0.85, 0.15, 0.25)
    create_opera_shell("Monument_sydney_opera_house_bennelong_2", -1.45, -1.35, 0.75, 1.15, 0.85, 0.75, -0.15, 3.35)

    # 2. SYDNEY HARBOUR BRIDGE
    p_bridge = bpy.data.objects.new("Monument_harbour_bridge", None)
    p_bridge.empty_display_type = "PLAIN_AXES"
    p_bridge.location = (-5.0, 0.0, 0.0)
    scene.collection.objects.link(p_bridge)

    span_len = 8.4
    half_span = span_len * 0.5
    deck_w = 1.65
    deck_z = 1.65

    for end_idx, sx in enumerate((-1, 1)):
        px = sx * (half_span + 0.55)
        add_box(f"Monument_harbour_bridge_pylon_plinth_{end_idx}", (1.35, deck_w + 0.55, 1.55), (px, 0, 0.775), mat_moruya_granite, p_bridge)
        for side_idx, sy in enumerate((-1, 1)):
            py = sy * (deck_w * 0.5 + 0.05)
            add_box(f"Monument_harbour_bridge_p_{end_idx}_{side_idx}_shaft", (0.95, 0.52, 2.35), (px, py, 2.55), mat_moruya_granite, p_bridge)
            add_box(f"Monument_harbour_bridge_p_{end_idx}_{side_idx}_step1", (0.78, 0.44, 0.55), (px, py, 3.90), mat_moruya_granite, p_bridge)
            add_box(f"Monument_harbour_bridge_p_{end_idx}_{side_idx}_crown", (0.62, 0.36, 0.35), (px, py, 4.30), mat_moruya_granite, p_bridge)
            add_box(f"Monument_harbour_bridge_p_{end_idx}_{side_idx}_slit", (0.99, 0.14, 1.65), (px, py, 2.75), mat_sandstone_dark, p_bridge)

    add_box("Monument_harbour_bridge_road_deck", (span_len + 2.4, deck_w, 0.18), (0, 0, deck_z), mat_road_deck, p_bridge)
    add_box("Monument_harbour_bridge_deck_rail_w", (span_len + 2.4, 0.08, 0.26), (0, -deck_w * 0.48, deck_z + 0.12), mat_bridge_steel, p_bridge)
    add_box("Monument_harbour_bridge_deck_rail_e", (span_len + 2.4, 0.08, 0.26), (0, deck_w * 0.48, deck_z + 0.12), mat_bridge_steel, p_bridge)

    n_bays = 14
    xs = [-half_span + (span_len * i / n_bays) for i in range(n_bays + 1)]

    def low_z(x):
        u = x / half_span
        return 1.35 + 3.05 * (1.0 - u * u)

    def high_z(x):
        u = x / half_span
        return 2.85 + 2.35 * (1.0 - 0.68 * u * u)

    for s_idx, sy in enumerate((-deck_w * 0.46, deck_w * 0.46)):
        for i in range(n_bays + 1):
            xi = xs[i]
            zl = low_z(xi)
            zh = high_z(xi)
            add_strut(f"Monument_harbour_bridge_post_{s_idx}_{i}", (xi, sy, zl), (xi, sy, zh), 0.045, mat_bridge_steel, p_bridge)
            if zl > deck_z + 0.12:
                add_strut(f"Monument_harbour_bridge_hanger_{s_idx}_{i}", (xi, sy, deck_z), (xi, sy, zl), 0.025, mat_cable_steel, p_bridge)
            if i > 0:
                xp = xs[i - 1]
                zlp = low_z(xp)
                zhp = high_z(xp)
                add_strut(f"Monument_harbour_bridge_low_chord_{s_idx}_{i}", (xp, sy, zlp), (xi, sy, zl), 0.065, mat_bridge_steel, p_bridge)
                add_strut(f"Monument_harbour_bridge_high_chord_{s_idx}_{i}", (xp, sy, zhp), (xi, sy, zh), 0.060, mat_bridge_steel, p_bridge)
                add_strut(f"Monument_harbour_bridge_diag1_{s_idx}_{i}", (xp, sy, zlp), (xi, sy, zh), 0.032, mat_bridge_steel, p_bridge)
                add_strut(f"Monument_harbour_bridge_diag2_{s_idx}_{i}", (xp, sy, zhp), (xi, sy, zl), 0.032, mat_bridge_steel, p_bridge)

    for i in range(2, n_bays - 1, 2):
        xi = xs[i]
        zh = high_z(xi)
        zl = low_z(xi)
        add_strut(f"Monument_harbour_bridge_cross_top_{i}", (xi, -deck_w * 0.46, zh), (xi, deck_w * 0.46, zh), 0.04, mat_bridge_steel, p_bridge)
        if zl > deck_z + 0.4:
            add_strut(f"Monument_harbour_bridge_cross_bot_{i}", (xi, -deck_w * 0.46, zl), (xi, deck_w * 0.46, zl), 0.035, mat_bridge_steel, p_bridge)

    # 3. SYDNEY TOWER EYE
    p_tower = bpy.data.objects.new("Monument_sydney_tower", None)
    p_tower.empty_display_type = "PLAIN_AXES"
    p_tower.location = (5.0, 0.0, 0.0)
    scene.collection.objects.link(p_tower)

    add_box("Monument_sydney_tower_podium_1", (2.4, 2.4, 0.85), (0, 0, 0.425), mat_sandstone, p_tower)
    add_box("Monument_sydney_tower_podium_2", (1.9, 1.9, 0.55), (0, 0, 1.125), mat_podium, p_tower)
    add_cyl("Monument_sydney_tower_core_shaft", 0.30, 0.26, 7.8, 16, (0, 0, 5.2), mat_tower_shaft, p_tower)

    n_cables = 14
    r_bot = 0.82
    r_top = 0.64
    z_c_bot = 1.35
    z_c_top = 8.85
    twist = math.radians(125.0)
    for i in range(n_cables):
        a0 = (2.0 * math.pi * i) / n_cables
        p_b = (r_bot * math.cos(a0), r_bot * math.sin(a0), z_c_bot)
        p_t1 = (r_top * math.cos(a0 + twist), r_top * math.sin(a0 + twist), z_c_top)
        p_t2 = (r_top * math.cos(a0 - twist), r_top * math.sin(a0 - twist), z_c_top)
        add_strut(f"Monument_sydney_tower_cable_cw_{i}", p_b, p_t1, 0.016, mat_cable_steel, p_tower, segs=5)
        add_strut(f"Monument_sydney_tower_cable_ccw_{i}", p_b, p_t2, 0.016, mat_cable_steel, p_tower, segs=5)

    add_cyl("Monument_sydney_tower_waist_ring1", 0.50, 0.50, 0.08, 20, (0, 0, 5.2), mat_cable_steel, p_tower)
    add_cyl("Monument_sydney_tower_waist_ring2", 0.56, 0.56, 0.08, 20, (0, 0, 7.1), mat_cable_steel, p_tower)
    add_cyl("Monument_sydney_tower_turret_soffit", 0.34, 0.92, 0.38, 24, (0, 0, 9.02), mat_tower_gold, p_tower)
    add_cyl("Monument_sydney_tower_turret_l1", 0.92, 1.02, 0.36, 24, (0, 0, 9.39), mat_tower_gold, p_tower)
    add_cyl("Monument_sydney_tower_turret_obs_windows", 1.03, 1.03, 0.28, 24, (0, 0, 9.71), mat_bronze_glass, p_tower)
    add_cyl("Monument_sydney_tower_turret_l3", 1.02, 0.88, 0.36, 24, (0, 0, 10.03), mat_tower_gold, p_tower)
    add_cyl("Monument_sydney_tower_turret_cap", 0.88, 0.42, 0.25, 24, (0, 0, 10.33), mat_tower_gold, p_tower)
    add_cyl("Monument_sydney_tower_skywalk_ring", 1.12, 1.12, 0.06, 24, (0, 0, 10.22), mat_cable_steel, p_tower)
    add_cyl("Monument_sydney_tower_spire_base", 0.16, 0.07, 1.4, 12, (0, 0, 11.15), mat_cable_steel, p_tower)
    add_cyl("Monument_sydney_tower_spire_needle", 0.07, 0.012, 1.85, 10, (0, 0, 12.75), mat_cable_steel, p_tower)

    # 4. QUEEN VICTORIA BUILDING (QVB)
    p_qvb = bpy.data.objects.new("Monument_qvb", None)
    p_qvb.empty_display_type = "PLAIN_AXES"
    p_qvb.location = (15.0, 0.0, 0.0)
    scene.collection.objects.link(p_qvb)

    add_box("Monument_qvb_base_plinth", (2.4, 6.4, 0.35), (0, 0, 0.175), mat_sandstone_dark, p_qvb)
    add_box("Monument_qvb_main_body", (2.15, 6.1, 1.85), (0, 0, 1.25), mat_sandstone, p_qvb)
    add_box("Monument_qvb_cornice_band", (2.30, 6.25, 0.18), (0, 0, 2.22), mat_sandstone_dark, p_qvb)
    for i in range(-5, 6):
        py = i * 0.54
        add_box(f"Monument_qvb_pilaster_w_{i}", (0.14, 0.16, 1.95), (-1.08, py, 1.25), mat_sandstone_dark, p_qvb)
        add_box(f"Monument_qvb_pilaster_e_{i}", (0.14, 0.16, 1.95), (1.08, py, 1.25), mat_sandstone_dark, p_qvb)
    add_cyl("Monument_qvb_barrel_skylight", 0.55, 0.55, 5.8, 16, (0, 0, 2.30), mat_skylight, p_qvb, rot=(math.radians(90), 0, 0))
    add_box("Monument_qvb_central_transept", (2.45, 1.85, 2.15), (0, 0, 1.40), mat_sandstone, p_qvb)
    add_cyl("Monument_qvb_central_drum", 0.82, 0.82, 0.65, 20, (0, 0, 2.65), mat_sandstone, p_qvb)
    add_cyl("Monument_qvb_central_dome_low", 0.84, 0.62, 0.52, 20, (0, 0, 3.22), mat_verdigris, p_qvb)
    add_cyl("Monument_qvb_central_dome_top", 0.62, 0.18, 0.38, 20, (0, 0, 3.67), mat_verdigris, p_qvb)
    add_cyl("Monument_qvb_central_lantern", 0.18, 0.04, 0.55, 12, (0, 0, 4.12), mat_tower_gold, p_qvb)
    for dy in (-2.55, -1.45, 1.45, 2.55):
        for dx in (-0.72, 0.72):
            add_cyl(f"Monument_qvb_sub_drum_{int(dx * 10)}_{int(dy * 10)}", 0.28, 0.28, 0.35, 12, (dx, dy, 2.45), mat_sandstone, p_qvb)
            add_cyl(f"Monument_qvb_sub_dome_{int(dx * 10)}_{int(dy * 10)}", 0.29, 0.05, 0.38, 12, (dx, dy, 2.80), mat_verdigris, p_qvb)

    # 5. SYDNEY CENTRAL STATION & CLOCK TOWER
    p_central = bpy.data.objects.new("Monument_central_station_sydney", None)
    p_central.empty_display_type = "PLAIN_AXES"
    p_central.location = (-15.0, -12.0, 0.0)
    scene.collection.objects.link(p_central)

    add_box("Monument_central_station_sydney_plinth", (5.4, 4.8, 0.35), (0, 0, 0.175), mat_sandstone_dark, p_central)
    add_box("Monument_central_station_sydney_north_wing", (5.0, 1.45, 1.75), (0, -1.55, 1.20), mat_sandstone, p_central)
    add_box("Monument_central_station_sydney_west_wing", (1.45, 3.4, 1.75), (-1.78, 0.35, 1.20), mat_sandstone, p_central)
    add_box("Monument_central_station_sydney_cornice_n", (5.15, 1.60, 0.18), (0, -1.55, 2.15), mat_sandstone_dark, p_central)
    for i in range(-4, 5):
        ax = i * 0.52
        add_box(f"Monument_central_station_sydney_pier_{i}", (0.18, 0.22, 1.65), (ax, -2.28, 1.15), mat_sandstone_dark, p_central)
        add_box(f"Monument_central_station_sydney_arch_win_{i}", (0.28, 0.08, 1.15), (ax, -2.24, 1.15), mat_bronze_glass, p_central)
    for s_idx, sx in enumerate((-0.45, 0.65, 1.75)):
        add_cyl(f"Monument_central_station_sydney_trainshed_{s_idx}", 0.56, 0.56, 3.2, 14, (sx, 0.55, 1.45), mat_slate_roof, p_central, rot=(math.radians(90), 0, 0))
    tx, ty = -2.05, -1.85
    add_box("Monument_central_station_sydney_tower_base", (1.15, 1.15, 2.4), (tx, ty, 1.4), mat_sandstone_dark, p_central)
    add_box("Monument_central_station_sydney_tower_shaft", (0.96, 0.96, 2.5), (tx, ty, 3.85), mat_sandstone, p_central)
    add_box("Monument_central_station_sydney_clock_stage", (1.06, 1.06, 0.85), (tx, ty, 5.45), mat_sandstone_dark, p_central)
    add_cyl("Monument_central_station_sydney_clock_ns", 0.30, 0.30, 1.12, 16, (tx, ty, 5.45), mat_clock_face, p_central, rot=(math.radians(90), 0, 0))
    add_cyl("Monument_central_station_sydney_clock_ew", 0.30, 0.30, 1.12, 16, (tx, ty, 5.45), mat_clock_face, p_central, rot=(0, math.radians(90), 0))
    add_box("Monument_central_station_sydney_belfry_cornice", (1.16, 1.16, 0.18), (tx, ty, 5.95), mat_sandstone_dark, p_central)
    for cx in (-0.44, 0.44):
        for cy in (-0.44, 0.44):
            add_cyl(f"Monument_central_station_sydney_turret_{cx}_{cy}", 0.12, 0.03, 0.55, 8, (tx + cx, ty + cy, 6.30), mat_sandstone, p_central)
    add_cyl("Monument_central_station_sydney_tower_cupola", 0.46, 0.16, 0.65, 16, (tx, ty, 6.35), mat_verdigris, p_central)
    add_cyl("Monument_central_station_sydney_tower_spire", 0.08, 0.015, 0.75, 10, (tx, ty, 7.02), mat_tower_gold, p_central)

    # 6. ST MARY'S CATHEDRAL
    p_stmarys = bpy.data.objects.new("Monument_st_marys_cathedral", None)
    p_stmarys.empty_display_type = "PLAIN_AXES"
    p_stmarys.location = (-5.0, -12.0, 0.0)
    scene.collection.objects.link(p_stmarys)

    add_box("Monument_st_marys_cathedral_plinth", (3.2, 5.4, 0.30), (0, 0, 0.15), mat_sandstone_dark, p_stmarys)
    add_box("Monument_st_marys_cathedral_nave", (1.55, 4.6, 2.25), (0, 0.15, 1.40), mat_sandstone, p_stmarys)
    add_box("Monument_st_marys_cathedral_aisle_w", (0.55, 4.2, 1.35), (-1.02, 0.15, 0.95), mat_sandstone_dark, p_stmarys)
    add_box("Monument_st_marys_cathedral_aisle_e", (0.55, 4.2, 1.35), (1.02, 0.15, 0.95), mat_sandstone_dark, p_stmarys)
    add_box("Monument_st_marys_cathedral_transept", (3.1, 1.35, 2.20), (0, 0.55, 1.38), mat_sandstone, p_stmarys)
    add_cyl("Monument_st_marys_cathedral_nave_roof", 0.88, 0.88, 4.55, 3, (0, 0.15, 2.75), mat_slate_roof, p_stmarys, rot=(math.radians(90), math.radians(30), 0))
    add_cyl("Monument_st_marys_cathedral_transept_roof", 0.78, 0.78, 3.05, 3, (0, 0.55, 2.70), mat_slate_roof, p_stmarys, rot=(0, math.radians(90), math.radians(30)))
    add_cyl("Monument_st_marys_cathedral_fleche", 0.18, 0.02, 1.35, 8, (0, 0.55, 3.65), mat_verdigris, p_stmarys)
    for i in range(-3, 4):
        by = i * 0.58 + 0.15
        for side, sx in (("w", -1), ("e", 1)):
            add_box(f"Monument_st_marys_cathedral_buttress_{side}_{i}", (0.22, 0.16, 1.55), (sx * 1.35, by, 1.05), mat_sandstone_dark, p_stmarys)
            add_cyl(f"Monument_st_marys_cathedral_pinnacle_{side}_{i}", 0.08, 0.015, 0.45, 6, (sx * 1.35, by, 2.02), mat_sandstone, p_stmarys)
            add_strut(f"Monument_st_marys_cathedral_flyer_{side}_{i}", (sx * 1.32, by, 1.65), (sx * 0.78, by, 2.25), 0.04, mat_sandstone, p_stmarys)
    add_cyl("Monument_st_marys_cathedral_rose_window", 0.42, 0.42, 0.18, 16, (0, -2.18, 1.85), mat_skylight, p_stmarys, rot=(math.radians(90), 0, 0))
    add_box("Monument_st_marys_cathedral_portal_center", (0.55, 0.25, 0.95), (0, -2.18, 0.72), mat_bronze_glass, p_stmarys)
    for side, tx in (("west", -0.82), ("east", 0.82)):
        ty = -2.05
        add_box(f"Monument_st_marys_cathedral_tower_{side}_base", (0.78, 0.78, 2.65), (tx, ty, 1.55), mat_sandstone, p_stmarys)
        add_box(f"Monument_st_marys_cathedral_tower_{side}_belfry", (0.68, 0.68, 1.15), (tx, ty, 3.40), mat_sandstone_dark, p_stmarys)
        add_cyl(f"Monument_st_marys_cathedral_spire_{side}", 0.42, 0.02, 2.15, 8, (tx, ty, 5.02), mat_sandstone, p_stmarys)
        for cx in (-0.28, 0.28):
            for cy in (-0.28, 0.28):
                add_cyl(f"Monument_st_marys_cathedral_t_pin_{side}_{cx}_{cy}", 0.07, 0.01, 0.48, 6, (tx + cx, ty + cy, 4.18), mat_sandstone, p_stmarys)

    # 7. LUNA PARK SYDNEY
    p_luna = bpy.data.objects.new("Monument_luna_park", None)
    p_luna.empty_display_type = "PLAIN_AXES"
    p_luna.location = (5.0, -12.0, 0.0)
    scene.collection.objects.link(p_luna)

    add_box("Monument_luna_park_boardwalk", (4.2, 3.6, 0.28), (0, 0, 0.14), mat_podium, p_luna)
    for idx, tx in enumerate((-1.25, 1.25)):
        ty = -1.15
        add_box(f"Monument_luna_park_tbase_{idx}", (0.68, 0.68, 1.15), (tx, ty, 0.75), mat_luna_white, p_luna)
        add_cyl(f"Monument_luna_park_tshaft_{idx}", 0.34, 0.26, 1.85, 12, (tx, ty, 2.20), mat_luna_white, p_luna)
        add_cyl(f"Monument_luna_park_tcollar_{idx}", 0.32, 0.32, 0.18, 12, (tx, ty, 3.15), mat_luna_gold, p_luna)
        add_cyl(f"Monument_luna_park_tspire_{idx}", 0.28, 0.02, 0.95, 12, (tx, ty, 3.70), mat_luna_red, p_luna)
        add_cyl(f"Monument_luna_park_tfinial_{idx}", 0.06, 0.06, 0.12, 10, (tx, ty, 4.22), mat_luna_gold, p_luna)
    add_cyl("Monument_luna_park_moon_face_disc", 1.18, 1.18, 0.34, 24, (0, -1.15, 1.45), mat_luna_white, p_luna, rot=(math.radians(90), 0, 0))
    add_cyl("Monument_luna_park_mouth_portal", 0.58, 0.58, 0.42, 18, (0, -1.15, 0.72), mat_dark_mouth, p_luna, rot=(math.radians(90), 0, 0))
    add_cyl("Monument_luna_park_grin_lip_top", 0.68, 0.68, 0.38, 18, (0, -1.17, 0.80), mat_luna_red, p_luna, rot=(math.radians(90), 0, 0))
    for ex in (-0.42, 0.42):
        add_cyl(f"Monument_luna_park_eye_{'l' if ex < 0 else 'r'}", 0.16, 0.16, 0.38, 12, (ex, -1.18, 1.82), mat_luna_blue, p_luna, rot=(math.radians(90), 0, 0))
        add_cyl(f"Monument_luna_park_cheek_{'l' if ex < 0 else 'r'}", 0.22, 0.22, 0.37, 12, (ex * 1.45, -1.17, 1.40), mat_luna_red, p_luna, rot=(math.radians(90), 0, 0))
    add_box("Monument_luna_park_funhouse_hall", (2.4, 1.65, 1.35), (-0.45, 0.65, 0.90), mat_luna_white, p_luna)
    add_cyl("Monument_luna_park_funhouse_roof", 0.85, 0.85, 2.45, 16, (-0.45, 0.65, 1.60), mat_luna_red, p_luna, rot=(0, math.radians(90), 0))
    wx, wy, wz = 1.25, 0.75, 2.25
    w_rad = 1.25
    add_strut("Monument_luna_park_wheel_leg1", (wx - 0.55, wy - 0.25, 0.25), (wx, wy - 0.15, wz), 0.05, mat_cable_steel, p_luna)
    add_strut("Monument_luna_park_wheel_leg2", (wx + 0.55, wy - 0.25, 0.25), (wx, wy - 0.15, wz), 0.05, mat_cable_steel, p_luna)
    for i in range(12):
        ang = (2.0 * math.pi * i) / 12
        gx = wx + w_rad * math.cos(ang)
        gz = wz + w_rad * math.sin(ang)
        add_strut(f"Monument_luna_park_spoke_{i}", (wx, wy, wz), (gx, wy, gz), 0.02, mat_cable_steel, p_luna)
        g_mat = [mat_luna_red, mat_luna_gold, mat_luna_blue][i % 3]
        add_cyl(f"Monument_luna_park_gondola_{i}", 0.12, 0.10, 0.18, 10, (gx, wy, gz), g_mat, p_luna)

    # 8. CROWN SYDNEY (BARANGAROO)
    p_crown = bpy.data.objects.new("Monument_barangaroo_crown", None)
    p_crown.empty_display_type = "PLAIN_AXES"
    p_crown.location = (15.0, -12.0, 0.0)
    scene.collection.objects.link(p_crown)

    add_cyl("Monument_barangaroo_crown_podium_t1", 1.75, 1.65, 0.50, 24, (0, 0, 0.25), mat_sandstone, p_crown)
    add_cyl("Monument_barangaroo_crown_podium_t2", 1.52, 1.42, 0.45, 24, (0, 0, 0.72), mat_crown_glass, p_crown)
    add_cyl("Monument_barangaroo_crown_podium_t3", 1.28, 1.18, 0.40, 24, (0, 0, 1.15), mat_crown_silver, p_crown)

    n_slices = 16
    total_h = 9.4
    z_start = 1.25
    slice_h = total_h / n_slices
    for s in range(n_slices):
        t = s / (n_slices - 1)
        z_cur = z_start + s * slice_h + slice_h * 0.5
        twist_ang = math.radians(t * 68.0)
        for p_idx in range(3):
            if p_idx == 1 and t > 0.84:
                continue
            if p_idx == 2 and t > 0.92:
                continue
            base_ang = twist_ang + p_idx * (2.0 * math.pi / 3.0)
            taper = 1.0 - 0.52 * (t ** 1.15)
            rx = 0.78 * taper
            ry = 0.48 * taper
            offset_r = 0.24 * taper
            ox = offset_r * math.cos(base_ang)
            oy = offset_r * math.sin(base_ang)
            bm = bmesh.new()
            bmesh.ops.create_cone(bm, cap_ends=True, cap_tris=False, segments=16, radius1=1.0, radius2=0.96, depth=slice_h * 1.04)
            for v in bm.verts:
                v.co.x *= rx
                v.co.y *= ry
            make_mesh(f"Monument_barangaroo_crown_petal_{p_idx}_{s}", bm, mat_crown_glass, p_crown, loc=(ox, oy, z_cur), rot=(0, 0, base_ang))
            if s % 2 == 0:
                bm_rib = bmesh.new()
                bmesh.ops.create_cone(bm_rib, cap_ends=True, cap_tris=False, segments=16, radius1=1.02, radius2=1.02, depth=0.05)
                for v in bm_rib.verts:
                    v.co.x *= rx
                    v.co.y *= ry
                make_mesh(f"Monument_barangaroo_crown_rib_{p_idx}_{s}", bm_rib, mat_crown_silver, p_crown, loc=(ox, oy, z_cur + slice_h * 0.45), rot=(0, 0, base_ang))


def build_nyc_monuments_in_scene(scene):
    """Builds all 8 multi-part New York City monuments inside `scene`."""
    make_mesh, add_box, add_cyl, add_strut = _make_scene_helpers(scene)

    mat_limestone = _get_mat("NYC_Limestone", (0.86, 0.82, 0.74), roughness=0.65)
    mat_limestone_dark = _get_mat("NYC_LimestoneDark", (0.68, 0.64, 0.57), roughness=0.72)
    mat_granite = _get_mat("NYC_Granite", (0.62, 0.60, 0.57), roughness=0.75)
    mat_nirosta = _get_mat("NYC_NirostaSteel", (0.88, 0.90, 0.94), metallic=0.92, roughness=0.18)
    mat_dark_spandrel = _get_mat("NYC_DarkSpandrel", (0.18, 0.21, 0.25), metallic=0.5, roughness=0.35)
    mat_copper_verdigris = _get_mat("NYC_LibertyCopper", (0.32, 0.66, 0.56), metallic=0.25, roughness=0.45)
    mat_gold_flame = _get_mat(
        "NYC_GoldFlame", (1.0, 0.82, 0.22), metallic=0.85, roughness=0.18, emission=(1.0, 0.78, 0.18), emission_strength=1.4
    )
    mat_crown_glow = _get_mat(
        "NYC_EmpireGlow", (0.95, 0.92, 0.80), roughness=0.2, emission=(0.95, 0.90, 0.72), emission_strength=0.6
    )
    mat_bridge_cable = _get_mat("NYC_BridgeSteel", (0.34, 0.37, 0.41), metallic=0.78, roughness=0.38)
    mat_wood_deck = _get_mat("NYC_PromenadeWood", (0.52, 0.39, 0.27), roughness=0.75)
    mat_owtc_glass = _get_mat("NYC_OWTCGlass", (0.42, 0.68, 0.88), metallic=0.82, roughness=0.12)
    mat_oculus_white = _get_mat("NYC_OculusWhite", (0.96, 0.97, 0.99), metallic=0.15, roughness=0.25)
    mat_pool_water = _get_mat("NYC_MemorialWater", (0.12, 0.28, 0.42), metallic=0.6, roughness=0.1)
    mat_terracotta = _get_mat("NYC_FlatironTerracotta", (0.83, 0.77, 0.67), roughness=0.58)
    mat_ice_rink = _get_mat("NYC_RockefellerIce", (0.82, 0.93, 0.98), metallic=0.2, roughness=0.12)

    # 1. EMPIRE STATE BUILDING
    p_esb = bpy.data.objects.new("Monument_empire_state", None)
    p_esb.empty_display_type = "PLAIN_AXES"
    p_esb.location = (-15.0, 0.0, 0.0)
    scene.collection.objects.link(p_esb)

    add_box("Monument_empire_state_base_1", (3.6, 2.4, 0.9), (0, 0, 0.45), mat_limestone, p_esb)
    add_box("Monument_empire_state_base_2", (3.1, 2.1, 0.6), (0, 0, 1.20), mat_limestone_dark, p_esb)
    add_box("Monument_empire_state_marquee", (0.9, 2.52, 0.45), (0, 0, 0.35), mat_nirosta, p_esb)
    tiers_esb = [
        ("t1", 2.6, 1.85, 1.50, 1.20),
        ("t2", 2.2, 1.62, 2.70, 1.80),
        ("t3", 1.82, 1.44, 4.50, 4.20),
        ("t4", 1.48, 1.20, 8.70, 1.10),
        ("t5", 1.22, 1.00, 9.80, 0.65),
    ]
    for tname, sx, sy, z0, h in tiers_esb:
        add_box(f"Monument_empire_state_{tname}", (sx, sy, h), (0, 0, z0 + h * 0.5), mat_limestone, p_esb)
        if tname in ("t2", "t3", "t4"):
            for cx in (-1, 1):
                for cy in (-1, 1):
                    add_box(f"Monument_empire_state_{tname}_wing_{cx}_{cy}", (sx * 0.26, sy * 0.26, h * 0.98), (cx * sx * 0.42, cy * sy * 0.42, z0 + h * 0.5), mat_limestone_dark, p_esb)
    for i in range(-3, 4):
        if i == 0:
            continue
        vx = i * 0.22
        add_box(f"Monument_empire_state_mullion_ns_{i}", (0.07, 1.46, 6.8), (vx, 0, 5.2), mat_dark_spandrel, p_esb)
        add_box(f"Monument_empire_state_chrome_ns_{i}", (0.025, 1.48, 6.8), (vx + 0.04, 0, 5.2), mat_nirosta, p_esb)
    for j in range(-2, 3):
        vy = j * 0.24
        add_box(f"Monument_empire_state_mullion_ew_{j}", (1.84, 0.07, 6.8), (0, vy, 5.2), mat_dark_spandrel, p_esb)
    add_box("Monument_empire_state_obs86_deck", (1.34, 1.12, 0.16), (0, 0, 10.52), mat_nirosta, p_esb)
    add_box("Monument_empire_state_obs86_glass", (1.05, 0.88, 0.35), (0, 0, 10.75), mat_crown_glow, p_esb)
    add_cyl("Monument_empire_state_mast_base", 0.48, 0.38, 1.25, 16, (0, 0, 11.52), mat_limestone, p_esb)
    for angle_deg in (0, 90, 180, 270):
        rad = math.radians(angle_deg)
        add_box(f"Monument_empire_state_mast_fin_{angle_deg}", (0.14, 0.14, 1.22), (math.cos(rad) * 0.44, math.sin(rad) * 0.44, 11.52), mat_nirosta, p_esb, rot=(0, 0, rad))
    add_cyl("Monument_empire_state_obs102_ring", 0.42, 0.42, 0.18, 16, (0, 0, 12.22), mat_crown_glow, p_esb)
    add_cyl("Monument_empire_state_mast_dome", 0.38, 0.14, 0.45, 16, (0, 0, 12.52), mat_nirosta, p_esb)
    add_cyl("Monument_empire_state_antenna_base", 0.12, 0.06, 0.65, 12, (0, 0, 13.05), mat_nirosta, p_esb)
    add_cyl("Monument_empire_state_needle", 0.05, 0.01, 1.15, 10, (0, 0, 13.90), mat_nirosta, p_esb)

    # 2. CHRYSLER BUILDING
    p_chrysler = bpy.data.objects.new("Monument_chrysler_building", None)
    p_chrysler.empty_display_type = "PLAIN_AXES"
    p_chrysler.location = (-5.0, 0.0, 0.0)
    scene.collection.objects.link(p_chrysler)

    add_box("Monument_chrysler_building_podium1", (2.4, 2.4, 0.85), (0, 0, 0.425), mat_granite, p_chrysler)
    add_box("Monument_chrysler_building_podium2", (2.1, 2.1, 0.95), (0, 0, 1.32), mat_limestone, p_chrysler)
    add_box("Monument_chrysler_building_podium3", (1.75, 1.75, 1.10), (0, 0, 2.35), mat_limestone_dark, p_chrysler)
    add_box("Monument_chrysler_building_shaft", (1.38, 1.38, 5.70), (0, 0, 5.75), mat_limestone, p_chrysler)
    for i in range(-2, 3):
        pos = i * 0.24
        add_box(f"Monument_chrysler_building_win_ns_{i}", (0.07, 1.40, 5.4), (pos, 0, 5.75), mat_dark_spandrel, p_chrysler)
        add_box(f"Monument_chrysler_building_win_ew_{i}", (1.40, 0.07, 5.4), (0, pos, 5.75), mat_dark_spandrel, p_chrysler)
    for z_garg, r_reach in [(5.2, 0.78), (8.55, 0.74)]:
        for cx in (-1, 1):
            for cy in (-1, 1):
                angle = math.atan2(cy, cx)
                add_cyl(f"Monument_chrysler_building_eagle_{z_garg}_{cx}_{cy}", 0.09, 0.02, 0.45, 8, (cx * r_reach, cy * r_reach, z_garg), mat_nirosta, p_chrysler, rot=(math.radians(68) * math.sin(angle), -math.radians(68) * math.cos(angle), 0))
    for step in range(7):
        t = step / 6.0
        z_step = 8.65 + step * 0.38
        w = 1.28 * (1.0 - t * 0.72)
        h = 0.42 * (1.0 - t * 0.35)
        add_cyl(f"Monument_chrysler_building_crown_arch_x_{step}", w * 0.52, w * 0.52, w * 1.04, 16, (0, 0, z_step), mat_nirosta, p_chrysler, rot=(0, math.radians(90), 0))
        add_cyl(f"Monument_chrysler_building_crown_arch_y_{step}", w * 0.52, w * 0.52, w * 1.04, 16, (0, 0, z_step), mat_nirosta, p_chrysler, rot=(math.radians(90), 0, 0))
        for side in (-1, 1):
            add_box(f"Monument_chrysler_building_sunburst_ns_{step}_{side}", (w * 0.65, 0.04, h * 0.55), (0, side * w * 0.51, z_step + 0.06), mat_dark_spandrel, p_chrysler)
            add_box(f"Monument_chrysler_building_sunburst_ew_{step}_{side}", (0.04, w * 0.65, h * 0.55), (side * w * 0.51, 0, z_step + 0.06), mat_dark_spandrel, p_chrysler)
    add_cyl("Monument_chrysler_building_spire_cone", 0.22, 0.05, 0.85, 12, (0, 0, 11.55), mat_nirosta, p_chrysler)
    add_cyl("Monument_chrysler_building_needle", 0.05, 0.008, 1.15, 8, (0, 0, 12.50), mat_nirosta, p_chrysler)

    # 3. STATUE OF LIBERTY
    p_liberty = bpy.data.objects.new("Monument_statue_of_liberty", None)
    p_liberty.empty_display_type = "PLAIN_AXES"
    p_liberty.location = (5.0, 0.0, 0.0)
    scene.collection.objects.link(p_liberty)

    bm_star = bmesh.new()
    n_pts = 22
    star_verts_bot = []
    star_verts_top = []
    for i in range(n_pts):
        ang = (i / n_pts) * math.pi * 2.0
        r_bot = 2.45 if i % 2 == 0 else 1.55
        r_top = 2.15 if i % 2 == 0 else 1.42
        star_verts_bot.append(bm_star.verts.new((math.cos(ang) * r_bot, math.sin(ang) * r_bot, 0.0)))
        star_verts_top.append(bm_star.verts.new((math.cos(ang) * r_top, math.sin(ang) * r_top, 0.75)))
    bm_star.faces.new(star_verts_bot[::-1])
    bm_star.faces.new(star_verts_top)
    for i in range(n_pts):
        ni = (i + 1) % n_pts
        bm_star.faces.new([star_verts_bot[i], star_verts_bot[ni], star_verts_top[ni], star_verts_top[i]])
    bmesh.ops.recalc_face_normals(bm_star, faces=bm_star.faces)
    make_mesh("Monument_statue_of_liberty_star_fort", bm_star, mat_granite, p_liberty)

    add_box("Monument_statue_of_liberty_ped_base", (2.05, 2.05, 0.55), (0, 0, 1.02), mat_limestone_dark, p_liberty)
    add_box("Monument_statue_of_liberty_ped_shaft", (1.58, 1.58, 1.55), (0, 0, 2.05), mat_limestone, p_liberty)
    add_box("Monument_statue_of_liberty_ped_cornice", (1.76, 1.76, 0.24), (0, 0, 2.92), mat_limestone_dark, p_liberty)
    add_box("Monument_statue_of_liberty_ped_top", (1.38, 1.38, 0.42), (0, 0, 3.25), mat_granite, p_liberty)
    for side in (-1, 1):
        add_box(f"Monument_statue_of_liberty_loggia_ns_{side}", (0.85, 0.08, 0.55), (0, side * 0.80, 2.25), mat_granite, p_liberty)
        add_box(f"Monument_statue_of_liberty_loggia_ew_{side}", (0.08, 0.85, 0.55), (side * 0.80, 0, 2.25), mat_granite, p_liberty)
    add_cyl("Monument_statue_of_liberty_robe_lower", 0.58, 0.46, 1.25, 16, (0, 0, 4.05), mat_copper_verdigris, p_liberty)
    add_cyl("Monument_statue_of_liberty_robe_upper", 0.48, 0.38, 1.15, 16, (0, 0, 5.20), mat_copper_verdigris, p_liberty)
    for fold in range(5):
        z_f = 3.8 + fold * 0.36
        add_cyl(f"Monument_statue_of_liberty_toga_fold_{fold}", 0.52 - fold * 0.02, 0.48 - fold * 0.02, 0.14, 14, (0.03, -0.02, z_f), mat_copper_verdigris, p_liberty, rot=(math.radians(14), math.radians(-10), 0))
    add_box("Monument_statue_of_liberty_tablet", (0.28, 0.09, 0.52), (-0.42, -0.22, 5.15), mat_copper_verdigris, p_liberty, rot=(math.radians(18), math.radians(-22), math.radians(15)))
    add_cyl("Monument_statue_of_liberty_head", 0.22, 0.19, 0.42, 14, (0, 0, 5.95), mat_copper_verdigris, p_liberty)
    add_cyl("Monument_statue_of_liberty_diadem", 0.24, 0.25, 0.12, 16, (0, 0, 6.14), mat_copper_verdigris, p_liberty)
    for r_idx in range(7):
        ray_ang = math.radians(-75 + r_idx * 25) - math.pi * 0.5
        add_strut(f"Monument_statue_of_liberty_ray_{r_idx}", (math.cos(ray_ang) * 0.20, math.sin(ray_ang) * 0.20, 6.18), (math.cos(ray_ang) * 0.55, math.sin(ray_ang) * 0.55, 6.32), 0.028, mat_copper_verdigris, p_liberty, segs=6)
    add_strut("Monument_statue_of_liberty_right_arm", (0.28, -0.08, 5.55), (0.48, -0.14, 6.85), 0.11, mat_copper_verdigris, p_liberty, segs=10)
    add_cyl("Monument_statue_of_liberty_torch_gallery", 0.18, 0.14, 0.14, 12, (0.48, -0.14, 6.92), mat_copper_verdigris, p_liberty)
    add_cyl("Monument_statue_of_liberty_torch_flame_low", 0.14, 0.19, 0.24, 12, (0.48, -0.14, 7.10), mat_gold_flame, p_liberty)
    add_cyl("Monument_statue_of_liberty_torch_flame_tip", 0.18, 0.01, 0.32, 12, (0.48, -0.14, 7.36), mat_gold_flame, p_liberty)

    # 4. BROOKLYN BRIDGE
    p_bbridge = bpy.data.objects.new("Monument_brooklyn_bridge", None)
    p_bbridge.empty_display_type = "PLAIN_AXES"
    p_bbridge.location = (15.0, 0.0, 0.0)
    scene.collection.objects.link(p_bbridge)

    for t_idx, tx in enumerate((-3.2, 3.2)):
        add_box(f"Monument_brooklyn_bridge_caisson_{t_idx}", (1.05, 2.35, 1.35), (tx, 0, 0.675), mat_granite, p_bbridge)
        for p_i, py in enumerate((-0.88, 0.0, 0.88)):
            w_y = 0.36 if p_i != 1 else 0.42
            add_box(f"Monument_brooklyn_bridge_pier_{t_idx}_{p_i}", (0.82, w_y, 3.65), (tx, py, 2.50), mat_limestone_dark, p_bbridge)
            add_box(f"Monument_brooklyn_bridge_pinnacle_{t_idx}_{p_i}", (0.90, w_y * 1.1, 0.35), (tx, py, 4.45), mat_granite, p_bbridge)
        for a_i, ay in enumerate((-0.44, 0.44)):
            add_strut(f"Monument_brooklyn_bridge_gothic_l_{t_idx}_{a_i}", (tx, ay - 0.30, 3.35), (tx, ay, 3.95), 0.14, mat_limestone_dark, p_bbridge, segs=6)
            add_strut(f"Monument_brooklyn_bridge_gothic_r_{t_idx}_{a_i}", (tx, ay + 0.30, 3.35), (tx, ay, 3.95), 0.14, mat_limestone_dark, p_bbridge, segs=6)
        add_box(f"Monument_brooklyn_bridge_cornice_{t_idx}", (0.98, 2.28, 0.38), (tx, 0, 4.15), mat_granite, p_bbridge)

    add_box("Monument_brooklyn_bridge_road_deck", (10.6, 1.85, 0.18), (0, 0, 1.42), mat_bridge_cable, p_bbridge)
    add_box("Monument_brooklyn_bridge_promenade", (10.6, 0.56, 0.14), (0, 0, 1.56), mat_wood_deck, p_bbridge)

    n_seg_bb = 16
    x_pts_bb = [-5.2 + (10.4 * i / n_seg_bb) for i in range(n_seg_bb + 1)]

    def cable_z(x):
        if abs(x) <= 3.2:
            u = x / 3.2
            return 1.68 + 2.62 * (u * u)
        u = (abs(x) - 3.2) / 2.0
        return 4.30 - 2.75 * u + 0.35 * (u * u)

    for c_idx, cy in enumerate((-0.82, -0.32, 0.32, 0.82)):
        for i in range(n_seg_bb):
            x1, x2 = x_pts_bb[i], x_pts_bb[i + 1]
            z1, z2 = cable_z(x1), cable_z(x2)
            add_strut(f"Monument_brooklyn_bridge_cable_{c_idx}_{i}", (x1, cy, z1), (x2, cy, z2), 0.042 if abs(cy) > 0.5 else 0.032, mat_bridge_cable, p_bbridge, segs=6)
            if abs(cy) > 0.5 and i > 0:
                add_strut(f"Monument_brooklyn_bridge_susp_{c_idx}_{i}", (x1, cy, 1.48), (x1, cy, z1), 0.016, mat_bridge_cable, p_bbridge, segs=4)

    for t_idx, tx in enumerate((-3.2, 3.2)):
        for cy in (-0.82, 0.82):
            for offset in (-1.8, -1.2, -0.6, 0.6, 1.2, 1.8):
                dx = tx + offset
                if -5.1 <= dx <= 5.1:
                    add_strut(f"Monument_brooklyn_bridge_stay_{t_idx}_{cy}_{offset}", (tx, cy, 4.18), (dx, cy, 1.48), 0.014, mat_bridge_cable, p_bbridge, segs=4)

    # 5. ONE WORLD TRADE CENTER & OCULUS
    p_owtc = bpy.data.objects.new("Monument_one_world_trade", None)
    p_owtc.empty_display_type = "PLAIN_AXES"
    p_owtc.location = (-15.0, -12.0, 0.0)
    scene.collection.objects.link(p_owtc)

    add_box("Monument_one_world_trade_plaza", (6.2, 3.6, 0.18), (0, 0, 0.09), mat_granite, p_owtc)
    add_box("Monument_one_world_trade_podium", (1.92, 1.92, 1.68), (0, 0, 1.02), mat_nirosta, p_owtc)
    for side in (-1, 1):
        for f_i in range(-3, 4):
            add_box(f"Monument_one_world_trade_pod_fin_x_{side}_{f_i}", (0.05, 0.08, 1.62), (f_i * 0.24, side * 0.97, 1.02), mat_owtc_glass, p_owtc)
            add_box(f"Monument_one_world_trade_pod_fin_y_{side}_{f_i}", (0.08, 0.05, 1.62), (side * 0.97, f_i * 0.24, 1.02), mat_owtc_glass, p_owtc)

    bm_anti = bmesh.new()
    z_bot = 1.85
    z_top = 11.45
    r_bot = 0.96 * math.sqrt(2.0)
    r_top = 0.68 * math.sqrt(2.0)
    bot_v = [bm_anti.verts.new((math.cos(math.radians(45 + k * 90)) * r_bot, math.sin(math.radians(45 + k * 90)) * r_bot, z_bot)) for k in range(4)]
    top_v = [bm_anti.verts.new((math.cos(math.radians(k * 90)) * r_top, math.sin(math.radians(k * 90)) * r_top, z_top)) for k in range(4)]
    bm_anti.faces.new(bot_v[::-1])
    bm_anti.faces.new(top_v)
    for k in range(4):
        nk = (k + 1) % 4
        bm_anti.faces.new([bot_v[k], top_v[nk], bot_v[nk]])
        bm_anti.faces.new([bot_v[k], top_v[k], top_v[nk]])
    bmesh.ops.recalc_face_normals(bm_anti, faces=bm_anti.faces)
    make_mesh("Monument_one_world_trade_antiprism_shaft", bm_anti, mat_owtc_glass, p_owtc)

    for k in range(4):
        nk = (k + 1) % 4
        p_b = (math.cos(math.radians(45 + k * 90)) * r_bot, math.sin(math.radians(45 + k * 90)) * r_bot, z_bot)
        p_t1 = (math.cos(math.radians(k * 90)) * r_top, math.sin(math.radians(k * 90)) * r_top, z_top)
        p_t2 = (math.cos(math.radians(nk * 90)) * r_top, math.sin(math.radians(nk * 90)) * r_top, z_top)
        add_strut(f"Monument_one_world_trade_edge_a_{k}", p_b, p_t1, 0.022, mat_nirosta, p_owtc, segs=6)
        add_strut(f"Monument_one_world_trade_edge_b_{k}", p_b, p_t2, 0.022, mat_nirosta, p_owtc, segs=6)

    add_cyl("Monument_one_world_trade_parapet", 0.72, 0.72, 0.25, 8, (0, 0, 11.58), mat_nirosta, p_owtc)
    add_cyl("Monument_one_world_trade_comm_ring1", 0.52, 0.52, 0.14, 16, (0, 0, 11.82), mat_nirosta, p_owtc)
    add_cyl("Monument_one_world_trade_comm_ring2", 0.36, 0.36, 0.12, 16, (0, 0, 12.06), mat_nirosta, p_owtc)
    add_cyl("Monument_one_world_trade_spire_mast", 0.09, 0.015, 2.55, 12, (0, 0, 13.22), mat_nirosta, p_owtc)
    add_cyl("Monument_one_world_trade_beacon", 0.08, 0.08, 0.18, 12, (0, 0, 14.42), mat_gold_flame, p_owtc)
    add_box("Monument_one_world_trade_memorial_parapet", (1.45, 1.45, 0.24), (-2.05, 0, 0.22), mat_dark_spandrel, p_owtc)
    add_box("Monument_one_world_trade_memorial_water", (1.22, 1.22, 0.16), (-2.05, 0, 0.20), mat_pool_water, p_owtc)
    add_box("Monument_one_world_trade_memorial_void", (0.42, 0.42, 0.18), (-2.05, 0, 0.21), mat_dark_spandrel, p_owtc)
    add_box("Monument_one_world_trade_oculus_spine", (1.65, 0.55, 0.35), (2.05, 0, 0.32), mat_owtc_glass, p_owtc)
    for r_i in range(-6, 7):
        rx = 2.05 + r_i * 0.13
        span_factor = 1.0 - (abs(r_i) / 7.5) ** 1.6
        h_wing = 0.45 + 1.05 * span_factor
        spread_y = 0.38 + 0.72 * span_factor
        add_strut(f"Monument_one_world_trade_oculus_rib_n_{r_i}", (rx, 0.12, 0.18), (rx, spread_y, h_wing), 0.025, mat_oculus_white, p_owtc, segs=6)
        add_strut(f"Monument_one_world_trade_oculus_rib_s_{r_i}", (rx, -0.12, 0.18), (rx, -spread_y, h_wing), 0.025, mat_oculus_white, p_owtc, segs=6)

    # 6. GRAND CENTRAL TERMINAL
    p_gct = bpy.data.objects.new("Monument_grand_central", None)
    p_gct.empty_display_type = "PLAIN_AXES"
    p_gct.location = (-5.0, -12.0, 0.0)
    scene.collection.objects.link(p_gct)

    add_box("Monument_grand_central_plinth", (5.2, 4.4, 0.32), (0, 0, 0.16), mat_granite, p_gct)
    add_box("Monument_grand_central_viaduct_front", (5.4, 0.65, 0.55), (0, -1.95, 0.52), mat_limestone_dark, p_gct)
    add_box("Monument_grand_central_rusticated_base", (4.7, 3.8, 0.95), (0, 0.1, 0.75), mat_limestone_dark, p_gct)
    add_box("Monument_grand_central_headhouse", (4.5, 3.5, 2.25), (0, 0.1, 2.32), mat_limestone, p_gct)
    for ax in (-1.35, 0.0, 1.35):
        add_box(f"Monument_grand_central_win_s_{ax}", (0.78, 0.12, 1.55), (ax, -1.66, 2.15), mat_dark_spandrel, p_gct)
        add_cyl(f"Monument_grand_central_arch_s_{ax}", 0.39, 0.39, 0.14, 16, (ax, -1.66, 2.92), mat_dark_spandrel, p_gct, rot=(math.radians(90), 0, 0))
        add_box(f"Monument_grand_central_win_n_{ax}", (0.78, 0.12, 1.55), (ax, 1.86, 2.15), mat_dark_spandrel, p_gct)
    for col_x in (-2.05, -1.82, -0.82, -0.58, 0.58, 0.82, 1.82, 2.05):
        add_cyl(f"Monument_grand_central_col_{col_x}", 0.09, 0.08, 2.05, 12, (col_x, -1.72, 2.30), mat_limestone, p_gct)
        add_box(f"Monument_grand_central_cap_{col_x}", (0.22, 0.22, 0.14), (col_x, -1.72, 3.36), mat_limestone_dark, p_gct)
    add_box("Monument_grand_central_cornice", (4.85, 3.85, 0.26), (0, 0.1, 3.55), mat_limestone_dark, p_gct)
    add_box("Monument_grand_central_balustrade", (4.65, 3.65, 0.22), (0, 0.1, 3.78), mat_limestone, p_gct)
    add_box("Monument_grand_central_pediment", (1.65, 0.38, 0.65), (0, -1.62, 4.05), mat_limestone, p_gct)
    add_cyl("Monument_grand_central_tiffany_clock", 0.24, 0.24, 0.14, 16, (0, -1.80, 4.02), mat_gold_flame, p_gct, rot=(math.radians(90), 0, 0))
    add_cyl("Monument_grand_central_mercury_statue", 0.16, 0.06, 0.58, 10, (0, -1.62, 4.62), mat_copper_verdigris, p_gct)
    add_cyl("Monument_grand_central_hercules_l", 0.12, 0.05, 0.42, 10, (-0.52, -1.62, 4.48), mat_limestone_dark, p_gct)
    add_cyl("Monument_grand_central_minerva_r", 0.12, 0.05, 0.42, 10, (0.52, -1.62, 4.48), mat_limestone_dark, p_gct)
    add_box("Monument_grand_central_concourse_monitor", (3.85, 2.35, 0.55), (0, 0.1, 4.05), mat_limestone_dark, p_gct)
    add_cyl("Monument_grand_central_concourse_vault", 1.18, 1.18, 3.85, 18, (0, 0.1, 4.32), mat_copper_verdigris, p_gct, rot=(0, math.radians(90), 0))

    # 7. FLATIRON BUILDING
    p_flatiron = bpy.data.objects.new("Monument_flatiron", None)
    p_flatiron.empty_display_type = "PLAIN_AXES"
    p_flatiron.location = (5.0, -12.0, 0.0)
    scene.collection.objects.link(p_flatiron)

    def build_flatiron_wedge(name, scale_xy, z0, z1, mat):
        bm = bmesh.new()
        pts_2d = [
            (-1.15 * scale_xy, -2.15 * scale_xy),
            (1.15 * scale_xy, -2.15 * scale_xy),
            (0.24 * scale_xy, 2.15 * scale_xy),
            (0.00 * scale_xy, 2.35 * scale_xy),
            (-0.24 * scale_xy, 2.15 * scale_xy),
        ]
        v_bot = [bm.verts.new((px, py, z0)) for px, py in pts_2d]
        v_top = [bm.verts.new((px, py, z1)) for px, py in pts_2d]
        bm.faces.new(v_bot[::-1])
        bm.faces.new(v_top)
        for i in range(len(pts_2d)):
            ni = (i + 1) % len(pts_2d)
            bm.faces.new([v_bot[i], v_bot[ni], v_top[ni], v_top[i]])
        bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
        return make_mesh(name, bm, mat, p_flatiron)

    build_flatiron_wedge("Monument_flatiron_base", 1.04, 0.0, 1.25, mat_limestone_dark)
    build_flatiron_wedge("Monument_flatiron_belt1", 1.07, 1.25, 1.40, mat_limestone)
    build_flatiron_wedge("Monument_flatiron_shaft", 1.00, 1.40, 5.65, mat_terracotta)
    build_flatiron_wedge("Monument_flatiron_belt2", 1.05, 4.95, 5.10, mat_limestone_dark)
    build_flatiron_wedge("Monument_flatiron_attic", 1.02, 5.65, 6.25, mat_limestone)
    build_flatiron_wedge("Monument_flatiron_cornice", 1.14, 6.25, 6.52, mat_limestone_dark)
    add_cyl("Monument_flatiron_prow_column", 0.26, 0.26, 6.35, 16, (0, 2.22, 3.18), mat_terracotta, p_flatiron)
    add_cyl("Monument_flatiron_prow_cornice", 0.34, 0.30, 0.28, 16, (0, 2.22, 6.38), mat_limestone_dark, p_flatiron)
    for b_idx in range(7):
        t = (b_idx + 0.5) / 7.5
        wy = -1.95 + t * 3.85
        wx = 1.08 * (1.0 - t * 0.78)
        for side in (-1, 1):
            add_box(f"Monument_flatiron_win_bay_{side}_{b_idx}", (0.08, 0.22, 4.10), (side * wx, wy, 3.45), mat_dark_spandrel, p_flatiron, rot=(0, 0, side * math.radians(12.5)))

    # 8. ROCKEFELLER CENTER / 30 ROCK
    p_rock = bpy.data.objects.new("Monument_rockefeller_center", None)
    p_rock.empty_display_type = "PLAIN_AXES"
    p_rock.location = (15.0, -12.0, 0.0)
    scene.collection.objects.link(p_rock)

    add_box("Monument_rockefeller_center_plaza_base", (4.6, 5.2, 0.38), (0, 0, 0.19), mat_granite, p_rock)
    add_box("Monument_rockefeller_center_ice_rink", (1.65, 1.35, 0.12), (0, -1.25, 0.38), mat_ice_rink, p_rock)
    add_box("Monument_rockefeller_center_fountain_wall", (1.25, 0.22, 0.45), (0, -0.48, 0.55), mat_limestone_dark, p_rock)
    add_cyl("Monument_rockefeller_center_prometheus_ring", 0.26, 0.26, 0.08, 16, (0, -0.58, 0.72), mat_gold_flame, p_rock, rot=(math.radians(75), 0, 0))
    add_cyl("Monument_rockefeller_center_prometheus", 0.11, 0.04, 0.38, 10, (0, -0.58, 0.72), mat_gold_flame, p_rock, rot=(math.radians(45), math.radians(30), 0))
    for side, px in (("south", -1.45), ("north", 1.45)):
        add_box(f"Monument_rockefeller_center_pavilion_{side}", (1.05, 1.85, 1.45), (px, -1.35, 1.10), mat_limestone, p_rock)
        add_box(f"Monument_rockefeller_center_pav_roof_{side}", (0.92, 1.68, 0.12), (px, -1.35, 1.86), mat_copper_verdigris, p_rock)
    ty = 0.85
    slab_tiers = [
        ("base", 3.60, 1.45, 0.38, 1.80),
        ("s1", 3.20, 1.30, 2.18, 2.10),
        ("s2", 2.65, 1.15, 4.28, 2.30),
        ("s3", 2.10, 1.00, 6.58, 2.20),
        ("s4", 1.65, 0.86, 8.78, 1.65),
        ("top", 1.32, 0.72, 10.43, 0.85),
    ]
    for sname, sx, sy, z0, h in slab_tiers:
        add_box(f"Monument_rockefeller_center_30rock_{sname}", (sx, sy, h), (0, ty, z0 + h * 0.5), mat_limestone, p_rock)
    for i in range(-5, 6):
        vx = i * 0.24
        h_strip = 9.8 if abs(i) <= 2 else (7.8 if abs(i) <= 3 else 5.6)
        add_box(f"Monument_rockefeller_center_mullion_{i}", (0.07, 1.05, h_strip), (vx, ty, 0.5 + h_strip * 0.5), mat_dark_spandrel, p_rock)
    add_box("Monument_rockefeller_center_totr_deck1", (1.42, 0.82, 0.14), (0, ty, 11.35), mat_nirosta, p_rock)
    add_box("Monument_rockefeller_center_totr_deck2", (1.08, 0.58, 0.28), (0, ty, 11.55), mat_limestone_dark, p_rock)
    add_box("Monument_rockefeller_center_totr_beacon", (0.72, 0.38, 0.22), (0, ty, 11.80), mat_gold_flame, p_rock)
