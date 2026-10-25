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
Parametric Multi-City Monument Generator for Blender (Headless CLI & Live MCP).
Reads a city monument specification JSON and builds low-poly architectural
3D assets with Principled BSDF materials, exporting a single multi-root GLB.

Usage:
  /Applications/Blender.app/Contents/MacOS/Blender -b -P scripts/pipeline/blender/build_city_monuments.py -- \
    --spec public/data/rio_monuments_spec.json \
    --out public/models/rio_monuments.glb
"""

import argparse
import json
import math
import os
import sys
import bpy
import bmesh


def hex_to_rgba(hex_str, alpha=1.0):
    h = hex_str.lstrip("#")
    if len(h) != 6:
        return (0.8, 0.8, 0.8, alpha)
    r = int(h[0:2], 16) / 255.0
    g = int(h[2:4], 16) / 255.0
    b = int(h[4:6], 16) / 255.0
    # sRGB to linear approximation
    return (pow(r, 2.2), pow(g, 2.2), pow(b, 2.2), alpha)


def make_pbr_mat(name, hex_color, roughness=0.55, metallic=0.05, alpha=1.0):
    mat = bpy.data.materials.get(name)
    if mat is None:
        mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    bsdf = next(
        (n for n in mat.node_tree.nodes if n.type == "BSDF_PRINCIPLED"),
        None,
    )
    rgba = hex_to_rgba(hex_color, alpha)
    if bsdf is not None:
        bsdf.inputs["Base Color"].default_value = rgba
        bsdf.inputs["Roughness"].default_value = roughness
        bsdf.inputs["Metallic"].default_value = metallic
        if alpha < 1.0 and "Alpha" in bsdf.inputs:
            bsdf.inputs["Alpha"].default_value = alpha
    mat.diffuse_color = rgba
    return mat


def clear_scene():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for mesh in list(bpy.data.meshes):
        bpy.data.meshes.remove(mesh)
    for mat in list(bpy.data.materials):
        bpy.data.materials.remove(mat)


def add_box(bm, mat_idx, cx, cy, cz, sx, sy, sz):
    ret = bmesh.ops.create_cube(bm, size=1.0)
    verts = ret["verts"]
    for v in verts:
        v.co.x = v.co.x * sx + cx
        v.co.y = v.co.y * sy + cy
        v.co.z = v.co.z * sz + cz
    for f in bm.faces:
        if all(v in verts for v in f.verts):
            f.material_index = mat_idx
    return verts


def add_cone_or_cyl(bm, mat_idx, cx, cy, cz, r1, r2, depth, segs=20):
    ret = bmesh.ops.create_cone(
        bm,
        cap_ends=True,
        cap_tris=False,
        segments=segs,
        radius1=r1,
        radius2=r2,
        depth=depth,
    )
    verts = ret["verts"]
    for v in verts:
        v.co.x += cx
        v.co.y += cy
        v.co.z += cz
    for f in bm.faces:
        if all(v in verts for v in f.verts):
            f.material_index = mat_idx
    return verts


def build_archetype_geometry(bm, archetype):
    # Material indices: 0 = primary, 1 = secondary, 2 = accent/roof/copper, 3 = glass/water
    if archetype == "christ_statue":
        # Octagonal pedestal + soapstone robe + outstretched arms + head
        add_cone_or_cyl(bm, 1, 0, 0, 4.0, 5.2, 4.4, 8.0, segs=8)
        add_cone_or_cyl(bm, 0, 0, 0, 19.0, 3.6, 2.3, 22.0, segs=12)
        add_box(bm, 0, 0, 0, 26.5, 28.0, 2.2, 2.8)
        add_cone_or_cyl(bm, 0, 0, 0, 32.2, 1.8, 1.4, 3.8, segs=12)
        add_box(bm, 2, 0, 1.3, 21.5, 1.8, 0.4, 2.2)

    elif archetype == "sugarloaf_cableway":
        # Two granite monolith domes + cable stations + suspended cableway
        add_cone_or_cyl(bm, 0, -10.0, 0, 11.0, 9.5, 3.2, 22.0, segs=16)
        add_cone_or_cyl(bm, 1, 10.0, 0, 7.0, 7.5, 2.8, 14.0, segs=16)
        add_box(bm, 2, -10.0, 0, 22.8, 4.5, 3.5, 1.8)
        add_box(bm, 2, 10.0, 0, 14.8, 4.0, 3.2, 1.6)
        add_box(bm, 3, 0.0, 0, 18.8, 18.0, 0.35, 0.35)

    elif archetype == "stadium_bowl":
        # Elliptical stadium bowl + cantilevered roof ring + pitch
        add_cone_or_cyl(bm, 0, 0, 0, 5.0, 18.0, 21.0, 10.0, segs=32)
        add_cone_or_cyl(bm, 1, 0, 0, 10.2, 21.2, 15.0, 1.2, segs=32)
        add_cone_or_cyl(bm, 2, 0, 0, 1.2, 12.5, 12.5, 2.4, segs=24)

    elif archetype == "calatrava_cantilever":
        # Reflecting pool + cantilevered brise-soleil wings
        add_box(bm, 3, 0, 0, 0.6, 30.0, 14.0, 1.2)
        add_box(bm, 0, 0, 0, 4.5, 22.0, 8.0, 6.5)
        for i in range(-5, 6):
            x_off = i * 2.4
            z_off = 9.0 + (i + 5) * 0.45
            add_box(bm, 0, x_off, 0, z_off, 2.1, 11.5, 0.6)
        add_box(bm, 2, 2.0, 0, 11.5, 28.0, 3.2, 1.4)

    elif archetype == "aqueduct_arches":
        # Double-tier Roman-style whitewashed aqueduct
        add_box(bm, 0, 0, 0, 13.5, 30.0, 3.0, 1.8)
        add_box(bm, 0, 0, 0, 7.0, 30.0, 3.2, 1.6)
        for i in range(-4, 5):
            px = i * 3.4
            add_box(bm, 0, px, 0, 3.2, 1.1, 3.2, 6.4)
            add_box(bm, 0, px, 0, 10.2, 0.95, 2.8, 5.4)
        add_box(bm, 2, 0, 0, 14.6, 30.2, 1.8, 0.7)

    elif archetype == "conical_cathedral":
        # Truncated brutalist cone + four stained-glass axial strips + rooftop cross
        add_cone_or_cyl(bm, 0, 0, 0, 14.0, 14.5, 5.5, 28.0, segs=24)
        add_box(bm, 3, 0, 0, 14.0, 21.0, 1.4, 26.5)
        add_box(bm, 3, 0, 0, 14.0, 1.4, 21.0, 26.5)
        add_box(bm, 2, 0, 0, 30.0, 0.8, 0.8, 4.5)
        add_box(bm, 2, 0, 0, 31.0, 3.2, 0.8, 0.8)

    elif archetype == "opera_house_sails":
        # Sandstone podium + interlocking ceramic shell vaults
        add_box(bm, 1, 0, 0, 2.2, 28.0, 18.0, 4.4)
        shell_specs = [
            (-8.5, -2.0, 10.5, 5.5, 1.2, 14.0),
            (-3.0, -2.0, 12.5, 6.5, 1.2, 18.0),
            (3.0, -2.0, 9.5, 5.0, 1.0, 12.0),
            (-5.0, 3.5, 9.0, 4.8, 1.0, 11.5),
            (1.5, 3.5, 11.0, 5.8, 1.1, 15.0),
        ]
        for sx, sy, cz, r1, r2, h in shell_specs:
            add_cone_or_cyl(bm, 0, sx, sy, cz, r1, r2, h, segs=12)

    elif archetype == "steel_arch_bridge":
        # Granite pylons + parabolic steel arch + suspended roadway deck
        add_box(bm, 1, -14.0, -3.2, 9.0, 3.2, 2.4, 18.0)
        add_box(bm, 1, -14.0, 3.2, 9.0, 3.2, 2.4, 18.0)
        add_box(bm, 1, 14.0, -3.2, 9.0, 3.2, 2.4, 18.0)
        add_box(bm, 1, 14.0, 3.2, 9.0, 3.2, 2.4, 18.0)
        add_box(bm, 2, 0, 0, 7.5, 32.0, 6.2, 1.4)
        for i in range(-6, 7):
            x = i * 2.1
            norm = 1.0 - (x / 14.0) ** 2
            z_arch = 8.0 + max(0.0, norm) * 14.0
            add_box(bm, 0, x, -2.6, z_arch, 2.3, 0.7, 1.6)
            add_box(bm, 0, x, 2.6, z_arch, 2.3, 0.7, 1.6)
            if z_arch > 9.0:
                add_box(bm, 0, x, -2.6, (z_arch + 7.5) * 0.5, 0.35, 0.35, z_arch - 7.5)
                add_box(bm, 0, x, 2.6, (z_arch + 7.5) * 0.5, 0.35, 0.35, z_arch - 7.5)

    elif archetype == "observation_needle":
        # Cable-stayed hyperboloid shaft + golden turret + spire
        add_cone_or_cyl(bm, 1, 0, 0, 3.0, 6.5, 4.5, 6.0, segs=16)
        add_cone_or_cyl(bm, 1, 0, 0, 17.0, 1.6, 1.3, 22.0, segs=16)
        add_cone_or_cyl(bm, 0, 0, 0, 29.5, 4.6, 5.2, 4.2, segs=20)
        add_cone_or_cyl(bm, 2, 0, 0, 35.0, 0.45, 0.1, 7.0, segs=12)

    elif archetype == "westminster_big_ben":
        # Perpendicular Gothic riverfront + central octagon + Elizabeth Tower (Big Ben)
        add_box(bm, 0, -3.5, 0, 5.0, 24.0, 11.0, 10.0)
        add_cone_or_cyl(bm, 2, -3.5, 0, 12.5, 3.2, 0.6, 6.0, segs=8)
        add_box(bm, 0, 11.0, 0, 13.0, 4.2, 4.2, 26.0)
        add_box(bm, 2, 11.0, 0, 23.0, 4.6, 4.6, 3.6)
        add_cone_or_cyl(bm, 1, 11.0, 0, 29.0, 2.8, 0.2, 8.5, segs=8)
        add_box(bm, 0, -14.5, 0, 9.5, 4.6, 4.6, 19.0)

    elif archetype == "tower_bridge_bascule":
        # Twin Victorian Gothic towers + high-level walkways + bascule deck + blue suspension chains
        add_box(bm, 0, -7.5, 0, 11.0, 4.2, 4.8, 22.0)
        add_box(bm, 0, 7.5, 0, 11.0, 4.2, 4.8, 22.0)
        add_cone_or_cyl(bm, 1, -7.5, 0, 24.5, 2.8, 0.4, 5.0, segs=8)
        add_cone_or_cyl(bm, 1, 7.5, 0, 24.5, 2.8, 0.4, 5.0, segs=8)
        add_box(bm, 1, 0, 0, 18.5, 13.0, 2.4, 1.6)
        add_box(bm, 1, 0, 0, 4.5, 30.0, 5.0, 1.4)
        add_box(bm, 2, -12.5, 0, 11.0, 7.5, 0.8, 1.2)
        add_box(bm, 2, 12.5, 0, 11.0, 7.5, 0.8, 1.2)

    elif archetype == "baroque_dome_cathedral" or archetype == "domed_sandstone_arcade":
        # Nave + transept + colonnaded drum + lead/copper dome + lantern + twin west towers
        add_box(bm, 0, 0, 0, 5.5, 24.0, 11.0, 11.0)
        add_box(bm, 0, 0, 0, 5.5, 10.0, 20.0, 11.0)
        add_cone_or_cyl(bm, 0, 0, 0, 13.5, 6.2, 5.8, 5.5, segs=24)
        add_cone_or_cyl(bm, 1, 0, 0, 20.0, 5.8, 1.6, 7.5, segs=24)
        add_cone_or_cyl(bm, 2, 0, 0, 25.5, 1.2, 0.3, 4.0, segs=12)
        add_box(bm, 0, -10.5, -4.2, 10.0, 3.0, 3.0, 20.0)
        add_box(bm, 0, -10.5, 4.2, 10.0, 3.0, 3.0, 20.0)

    elif archetype == "norman_four_turret_keep":
        # White Tower Norman keep with 4 corner turrets + crenelated curtain wall
        add_box(bm, 1, 0, 0, 2.5, 24.0, 24.0, 5.0)
        add_box(bm, 0, 0, 0, 8.5, 13.0, 11.0, 17.0)
        for sx in (-6.2, 6.2):
            for sy in (-5.2, 5.2):
                add_box(bm, 0, sx, sy, 11.0, 2.8, 2.8, 22.0)
                add_cone_or_cyl(bm, 2, sx, sy, 23.5, 1.8, 0.2, 3.2, segs=12)

    elif archetype == "ferris_wheel":
        # Cantilevered A-frame + giant observation wheel + glass capsules
        add_box(bm, 1, 0, -3.5, 8.5, 8.0, 1.2, 17.0)
        num_segs = 24
        radius = 13.0
        cz = 16.5
        for i in range(num_segs):
            ang = (2.0 * math.pi * i) / num_segs
            x = math.cos(ang) * radius
            z = cz + math.sin(ang) * radius
            add_box(bm, 0, x, 0, z, 2.4, 1.2, 1.2)
            add_box(bm, 3, x, 1.2, z, 1.8, 1.2, 1.2)

    elif archetype == "shard_glass_pyramid":
        # Tapered crystalline glass shards rising to fractured pinnacle
        add_cone_or_cyl(bm, 0, 0, 0, 18.0, 8.5, 1.4, 36.0, segs=8)
        add_cone_or_cyl(bm, 1, 1.2, 0.8, 20.0, 6.5, 0.6, 39.0, segs=4)
        add_cone_or_cyl(bm, 3, -1.0, -0.8, 19.5, 6.5, 0.8, 38.0, segs=4)

    elif archetype == "empire_state_tower":
        # Art Deco stepped limestone setbacks + mooring mast + spire
        add_box(bm, 0, 0, 0, 4.0, 15.0, 11.0, 8.0)
        add_box(bm, 0, 0, 0, 16.0, 10.5, 8.5, 18.0)
        add_box(bm, 0, 0, 0, 28.0, 7.2, 6.2, 10.0)
        add_box(bm, 1, 0, 0, 35.5, 4.6, 4.6, 6.0)
        add_cone_or_cyl(bm, 1, 0, 0, 41.0, 1.8, 0.9, 6.0, segs=12)
        add_cone_or_cyl(bm, 2, 0, 0, 47.0, 0.4, 0.08, 7.0, segs=8)

    elif archetype == "chrysler_sunburst_tower":
        # Brick shaft + 7 terraced stainless-steel sunburst crown arches + needle
        add_box(bm, 0, 0, 0, 4.0, 12.0, 12.0, 8.0)
        add_box(bm, 0, 0, 0, 17.0, 8.2, 8.2, 20.0)
        for t in range(5):
            z = 28.5 + t * 2.2
            r = 5.4 - t * 0.85
            add_cone_or_cyl(bm, 1, 0, 0, z, r, r * 0.75, 2.4, segs=12)
        add_cone_or_cyl(bm, 2, 0, 0, 42.5, 0.5, 0.06, 7.0, segs=8)

    elif archetype == "statue_of_liberty":
        # Eleven-point Fort Wood star base + granite pedestal + copper Liberty + golden torch
        add_cone_or_cyl(bm, 1, 0, 0, 2.5, 11.5, 9.5, 5.0, segs=11)
        add_box(bm, 1, 0, 0, 9.5, 7.2, 7.2, 10.0)
        add_cone_or_cyl(bm, 0, 0, 0, 21.0, 3.4, 2.2, 13.5, segs=14)
        add_cone_or_cyl(bm, 0, 0, 0, 29.0, 1.5, 1.2, 3.0, segs=12)
        add_box(bm, 0, 2.0, 0, 32.5, 1.1, 1.1, 6.5)
        add_cone_or_cyl(bm, 2, 2.0, 0, 36.8, 1.1, 0.3, 2.4, segs=10)

    elif archetype == "gothic_suspension_bridge" or archetype == "twin_tower_gateway":
        # Twin double-arched towers + roadway + catenary cables
        add_box(bm, 0, -9.5, 0, 11.0, 3.4, 6.4, 22.0)
        add_box(bm, 0, 9.5, 0, 11.0, 3.4, 6.4, 22.0)
        add_box(bm, 1, 0, 0, 6.5, 32.0, 5.6, 1.2)
        for i in range(-7, 8):
            x = i * 2.1
            dist_from_tower = min(abs(x + 9.5), abs(x - 9.5))
            z_cable = 8.2 + (dist_from_tower / 9.5) ** 1.6 * 12.5
            add_box(bm, 2, x, -2.4, z_cable, 2.2, 0.35, 0.5)
            add_box(bm, 2, x, 2.4, z_cable, 2.2, 0.35, 0.5)

    elif archetype == "one_wtc_and_oculus":
        # Chamfered antiprism skyscraper + spire + ribbed white Calatrava Oculus beside it
        add_box(bm, 1, -4.0, 0, 4.5, 8.5, 8.5, 9.0)
        add_cone_or_cyl(bm, 0, -4.0, 0, 24.0, 5.8, 4.2, 30.0, segs=8)
        add_cone_or_cyl(bm, 2, -4.0, 0, 43.5, 0.5, 0.08, 9.0, segs=8)
        add_cone_or_cyl(bm, 1, 8.5, 0, 4.5, 7.0, 2.0, 9.0, segs=12)

    elif archetype == "flatiron_wedge":
        # Acute triangular Beaux-Arts wedge block
        add_cone_or_cyl(bm, 0, 0, 0, 13.0, 8.5, 8.2, 26.0, segs=3)
        add_cone_or_cyl(bm, 2, 0, 0, 26.8, 8.8, 8.8, 1.6, segs=3)

    elif archetype == "twin_spire_cathedral":
        # Gothic Revival sandstone cathedral with twin openwork spires
        add_box(bm, 0, 0, 0, 6.5, 12.0, 22.0, 13.0)
        add_box(bm, 0, -4.2, -9.5, 11.0, 3.4, 3.4, 22.0)
        add_box(bm, 0, 4.2, -9.5, 11.0, 3.4, 3.4, 22.0)
        add_cone_or_cyl(bm, 1, -4.2, -9.5, 26.5, 2.2, 0.2, 9.5, segs=8)
        add_cone_or_cyl(bm, 1, 4.2, -9.5, 26.5, 2.2, 0.2, 9.5, segs=8)

    elif archetype == "twisting_glass_tower":
        # Crown Sydney sculpted twisting petal tower
        for tier in range(7):
            z = 3.0 + tier * 5.0
            r = 6.2 - tier * 0.45
            off_x = math.sin(tier * 0.45) * 1.1
            off_y = math.cos(tier * 0.45) * 1.1
            add_cone_or_cyl(bm, 0 if tier % 2 == 0 else 1, off_x, off_y, z, r, r * 0.94, 5.2, segs=10)

    elif archetype == "niemeyer_apoteose_arch":
        # Sambodromo grandstands + iconic M-shaped white concrete arch
        add_box(bm, 1, -9.5, 0, 3.0, 4.5, 22.0, 6.0)
        add_box(bm, 1, 9.5, 0, 3.0, 4.5, 22.0, 6.0)
        add_box(bm, 0, -5.5, 8.0, 9.0, 2.2, 2.2, 18.0)
        add_box(bm, 0, 5.5, 8.0, 9.0, 2.2, 2.2, 18.0)
        add_box(bm, 0, 0, 8.0, 18.5, 16.0, 2.2, 2.8)

    elif archetype == "clock_tower_terminus":
        # Central do Brasil Art Deco clock tower + four-faced clock + concourse wings
        add_box(bm, 1, 0, 0, 4.0, 22.0, 12.0, 8.0)
        add_box(bm, 0, 0, 0, 17.5, 6.2, 6.2, 27.0)
        add_box(bm, 2, 0, 0, 28.5, 6.8, 6.8, 3.6)
        add_box(bm, 0, 0, 0, 32.0, 4.2, 4.2, 3.5)

    else:
        # Default Beaux-Arts / Art Deco civic monument / palace / terminus
        add_box(bm, 0, 0, 0, 5.5, 22.0, 14.0, 11.0)
        add_box(bm, 1, 0, 0, 13.0, 14.0, 10.0, 5.0)
        add_cone_or_cyl(bm, 2, 0, 0, 18.5, 5.5, 1.5, 6.5, segs=16)


def get_or_reset_city_scene(city_id):
    scene_label = "NYC" if city_id == "nyc" else city_id.replace("-", "_").title().replace("_", "")
    scene_name = f"Scene_{scene_label}"
    if scene_name in bpy.data.scenes:
        scene = bpy.data.scenes[scene_name]
        for obj in list(scene.objects):
            bpy.data.objects.remove(obj, do_unlink=True)
    else:
        scene = bpy.data.scenes.new(scene_name)

    if getattr(bpy.context, "window", None) is not None:
        bpy.context.window.scene = scene
    return scene


def build_city_monuments_from_spec(spec_path, out_glb_path):
    with open(spec_path, "r", encoding="utf-8") as f:
        spec = json.load(f)

    city_id = str(spec.get("cityId", "city")).lower()
    scene = get_or_reset_city_scene(city_id)
    monuments = spec.get("monuments", [])

    script_dir = os.path.dirname(os.path.abspath(__file__))
    if script_dir not in sys.path:
        sys.path.insert(0, script_dir)

    if city_id == "sydney":
        from mcp_sydney_nyc_builders import build_sydney_monuments_in_scene
        build_sydney_monuments_in_scene(scene)
    elif city_id == "nyc":
        from mcp_sydney_nyc_builders import build_nyc_monuments_in_scene
        build_nyc_monuments_in_scene(scene)
    elif city_id == "porto":
        from mcp_porto_tokyo_sf_builders import build_porto_monuments_in_scene
        build_porto_monuments_in_scene(scene)
    elif city_id == "tokyo":
        from mcp_porto_tokyo_sf_builders import build_tokyo_monuments_in_scene
        build_tokyo_monuments_in_scene(scene)
    elif city_id == "san-francisco":
        from mcp_porto_tokyo_sf_builders import build_san_francisco_monuments_in_scene
        build_san_francisco_monuments_in_scene(scene)
    elif city_id == "rio":
        from mcp_porto_tokyo_sf_builders import build_rio_monuments_in_scene
        build_rio_monuments_in_scene(scene)
    elif city_id == "warsaw":
        from mcp_porto_tokyo_sf_builders import build_warsaw_monuments_in_scene
        build_warsaw_monuments_in_scene(scene)
    elif city_id == "zurich":
        from mcp_porto_tokyo_sf_builders import build_zurich_monuments_in_scene
        build_zurich_monuments_in_scene(scene)
    elif city_id == "melbourne":
        from mcp_porto_tokyo_sf_builders import build_melbourne_monuments_in_scene
        build_melbourne_monuments_in_scene(scene)
    else:
        cols = max(1, int(math.ceil(math.sqrt(len(monuments)))))
        spacing = 12.0

        for idx, m in enumerate(monuments):
            node_name = m["nodeName"]
            archetype = m.get("archetype", "beaux_arts_opera")
            primary_hex = m.get("primaryColor", "#d8d0c5")
            secondary_hex = m.get("secondaryColor", "#8a99ad")
            accent_hex = m.get("accentColor", "#c89d54")

            mat_primary = make_pbr_mat(f"{node_name}_Primary", primary_hex, roughness=0.55, metallic=0.08)
            mat_secondary = make_pbr_mat(f"{node_name}_Secondary", secondary_hex, roughness=0.45, metallic=0.20)
            mat_accent = make_pbr_mat(f"{node_name}_Accent", accent_hex, roughness=0.35, metallic=0.55)
            mat_glass = make_pbr_mat(f"{node_name}_Glass", "#5fa8d3", roughness=0.15, metallic=0.1, alpha=0.85)

            parent_empty = bpy.data.objects.new(node_name, None)
            parent_empty.empty_display_type = "PLAIN_AXES"
            row = idx // cols
            col = idx % cols
            parent_empty.location = ((col - (cols - 1) * 0.5) * spacing, (row - (cols - 1) * 0.5) * spacing, 0.0)
            parent_empty["monument_id"] = m["id"]
            parent_empty["monument_name"] = m["name"]
            parent_empty["archetype"] = archetype
            parent_empty["year"] = str(m.get("year", ""))
            scene.collection.objects.link(parent_empty)

            mesh = bpy.data.meshes.new(f"{node_name}_Mesh")
            child_obj = bpy.data.objects.new(f"{node_name}_Body", mesh)
            scene.collection.objects.link(child_obj)
            child_obj.parent = parent_empty

            child_obj.data.materials.append(mat_primary)
            child_obj.data.materials.append(mat_secondary)
            child_obj.data.materials.append(mat_accent)
            child_obj.data.materials.append(mat_glass)

            bm = bmesh.new()
            build_archetype_geometry(bm, archetype)
            bmesh.ops.scale(bm, vec=(0.14, 0.14, 0.14), verts=bm.verts)
            bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
            bm.to_mesh(mesh)
            bm.free()

            for poly in mesh.polygons:
                poly.use_smooth = False

    os.makedirs(os.path.dirname(os.path.abspath(out_glb_path)), exist_ok=True)
    bpy.ops.export_scene.gltf(
        filepath=os.path.abspath(out_glb_path),
        export_format="GLB",
        use_active_scene=True,
        export_apply=True,
        export_yup=True,
        export_materials="EXPORT",
    )
    print(f"[Blender Pipeline] Exported {len(monuments)} monuments from {scene.name} to {out_glb_path}")


def main():
    argv = sys.argv
    if "--" in argv:
        argv = argv[argv.index("--") + 1 :]
    else:
        argv = []

    parser = argparse.ArgumentParser(description="Build 3D city monuments in Blender")
    parser.add_argument("--spec", required=True, help="Path to <city>_monuments_spec.json")
    parser.add_argument("--out", required=True, help="Output GLB path")
    args = parser.parse_args(argv)

    build_city_monuments_from_spec(args.spec, args.out)


if __name__ == "__main__":
    main()
