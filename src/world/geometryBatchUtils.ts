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

import * as THREE from 'three';

/**
 * Directly writes a pure translation + scale 4x4 matrix into an InstancedMesh's Float32Array
 * buffer without constructing an intermediate Object3D / Matrix4 / Quaternion.
 */
export function writeTranslationScaleMatrix(
  arr: THREE.TypedArray,
  idx: number,
  tx: number,
  ty: number,
  tz: number,
  sx: number,
  sy: number,
  sz: number
): void {
  const b = idx * 16;
  arr[b] = sx;
  arr[b + 1] = 0;
  arr[b + 2] = 0;
  arr[b + 3] = 0;
  arr[b + 4] = 0;
  arr[b + 5] = sy;
  arr[b + 6] = 0;
  arr[b + 7] = 0;
  arr[b + 8] = 0;
  arr[b + 9] = 0;
  arr[b + 10] = sz;
  arr[b + 11] = 0;
  arr[b + 12] = tx;
  arr[b + 13] = ty;
  arr[b + 14] = tz;
  arr[b + 15] = 1;
}

/**
 * Fast pre-sampled spline lookup table helper for train & corridor curves.
 * Replaces per-frame CatmullRomCurve3 polynomial/arc-length evaluations with O(1) linear interpolation.
 */
export class FastCurveLUT {
  private readonly divisions: number;
  private readonly px: Float32Array;
  private readonly py: Float32Array;
  private readonly pz: Float32Array;
  private readonly tx: Float32Array;
  private readonly ty: Float32Array;
  private readonly tz: Float32Array;

  constructor(curve: THREE.Curve<THREE.Vector3>, divisions = 256, arcLengthSpaced = false) {
    this.divisions = divisions;
    this.px = new Float32Array(divisions + 1);
    this.py = new Float32Array(divisions + 1);
    this.pz = new Float32Array(divisions + 1);
    this.tx = new Float32Array(divisions + 1);
    this.ty = new Float32Array(divisions + 1);
    this.tz = new Float32Array(divisions + 1);

    const pt = new THREE.Vector3();
    const tg = new THREE.Vector3();
    for (let i = 0; i <= divisions; i++) {
      const u = i / divisions;
      if (arcLengthSpaced) {
        curve.getPointAt(u, pt);
        curve.getTangentAt(u, tg);
      } else {
        curve.getPoint(u, pt);
        curve.getTangent(u, tg);
      }
      this.px[i] = pt.x;
      this.py[i] = pt.y;
      this.pz[i] = pt.z;
      this.tx[i] = tg.x;
      this.ty[i] = tg.y;
      this.tz[i] = tg.z;
    }
  }

  public samplePoint(u: number, outVec: THREE.Vector3): THREE.Vector3 {
    const f = Math.max(0, Math.min(1, u)) * this.divisions;
    const idx = Math.min(this.divisions - 1, f | 0);
    const frac = f - idx;
    outVec.x = this.px[idx] + (this.px[idx + 1] - this.px[idx]) * frac;
    outVec.y = this.py[idx] + (this.py[idx + 1] - this.py[idx]) * frac;
    outVec.z = this.pz[idx] + (this.pz[idx + 1] - this.pz[idx]) * frac;
    return outVec;
  }

  public samplePointAndTangent(
    u: number,
    outPt: THREE.Vector3,
    outTg: THREE.Vector3
  ): void {
    const f = Math.max(0, Math.min(1, u)) * this.divisions;
    const idx = Math.min(this.divisions - 1, f | 0);
    const frac = f - idx;
    outPt.x = this.px[idx] + (this.px[idx + 1] - this.px[idx]) * frac;
    outPt.y = this.py[idx] + (this.py[idx + 1] - this.py[idx]) * frac;
    outPt.z = this.pz[idx] + (this.pz[idx + 1] - this.pz[idx]) * frac;
    outTg.x = this.tx[idx] + (this.tx[idx + 1] - this.tx[idx]) * frac;
    outTg.y = this.ty[idx] + (this.ty[idx + 1] - this.ty[idx]) * frac;
    outTg.z = this.tz[idx] + (this.tz[idx + 1] - this.tz[idx]) * frac;
  }
}

/**
 * Merges static child Meshes sharing the same Material inside a Group into a single batched Mesh per Material.
 * Uses exact cofactor matrix normal transformation under non-uniform scale and Uint16 indices when < 65535 vertices.
 */
export function mergeGroupMeshesByMaterial(
  group: THREE.Group,
  keepUserData = true
): THREE.Mesh[] {
  const savedPos = group.position.clone();
  const savedRot = group.rotation.clone();
  const savedScale = group.scale.clone();
  group.position.set(0, 0, 0);
  group.rotation.set(0, 0, 0);
  group.scale.set(1, 1, 1);
  group.updateMatrixWorld(true);

  interface MaterialBucket {
    mat: THREE.Material;
    hasUv: boolean;
    hasCol: boolean;
    meshes: THREE.Mesh[];
  }

  const buckets = new Map<string, MaterialBucket>();
  const toRemove: THREE.Mesh[] = [];

  group.traverse((obj) => {
    if (obj === group) return;
    const mesh = obj as THREE.Mesh;
    if (
      mesh.isMesh &&
      !mesh.userData?.isHitProxy &&
      mesh.geometry &&
      mesh.material &&
      !Array.isArray(mesh.material)
    ) {
      const geom = mesh.geometry;
      const posAttr = geom.getAttribute('position');
      if (!posAttr || posAttr.count === 0) return;
      const hasUv = !!geom.getAttribute('uv');
      const hasCol = !!geom.getAttribute('color');
      const key =
        mesh.material.uuid + (hasUv ? '_u' : '') + (hasCol ? '_c' : '');
      let b = buckets.get(key);
      if (!b) {
        b = { mat: mesh.material, hasUv, hasCol, meshes: [] };
        buckets.set(key, b);
      }
      b.meshes.push(mesh);
      toRemove.push(mesh);
    }
  });

  if (buckets.size === 0) {
    group.position.copy(savedPos);
    group.rotation.copy(savedRot);
    group.scale.copy(savedScale);
    group.updateMatrixWorld(true);
    return [];
  }

  for (const m of toRemove) {
    if (m.parent) m.parent.remove(m);
  }
  for (let i = group.children.length - 1; i >= 0; i--) {
    const ch = group.children[i];
    if (!(ch as THREE.Mesh).isMesh && ch.children.length === 0) {
      group.remove(ch);
    }
  }

  const createdMeshes: THREE.Mesh[] = [];
  for (const b of buckets.values()) {
    const meshes = b.meshes;
    let totalVerts = 0;
    let totalIndices = 0;
    for (let i = 0; i < meshes.length; i++) {
      const g = meshes[i].geometry;
      const vCount = g.getAttribute('position').count;
      const idx = g.getIndex();
      totalVerts += vCount;
      totalIndices += idx ? idx.count : vCount;
    }

    const posArr = new Float32Array(totalVerts * 3);
    const normArr = new Float32Array(totalVerts * 3);
    const uvArr = b.hasUv ? new Float32Array(totalVerts * 2) : null;
    const colArr = b.hasCol ? new Float32Array(totalVerts * 3) : null;
    const idxArr =
      totalVerts > 65535
        ? new Uint32Array(totalIndices)
        : new Uint16Array(totalIndices);

    let vOffset = 0;
    let iOffset = 0;
    let castShadow = false;
    let receiveShadow = false;

    for (let i = 0; i < meshes.length; i++) {
      const m = meshes[i];
      if (m.castShadow) castShadow = true;
      if (m.receiveShadow) receiveShadow = true;
      const g = m.geometry;
      const posAttr = g.getAttribute('position');
      let normAttr = g.getAttribute('normal');
      if (!normAttr) {
        g.computeVertexNormals();
        normAttr = g.getAttribute('normal');
      }
      const uvAttr = b.hasUv ? g.getAttribute('uv') : null;
      const colAttr = b.hasCol ? g.getAttribute('color') : null;
      const idxAttr = g.getIndex();
      const vCount = posAttr.count;

      const el = m.matrixWorld.elements;
      const e00 = el[0], e10 = el[1], e20 = el[2];
      const e01 = el[4], e11 = el[5], e21 = el[6];
      const e02 = el[8], e12 = el[9], e22 = el[10];
      const tx = el[12], ty = el[13], tz = el[14];

      // Cofactor matrix for exact normal transformation under non-uniform scale
      const c00 = e11 * e22 - e21 * e12, c10 = e21 * e02 - e01 * e22, c20 = e01 * e12 - e11 * e02;
      const c01 = e20 * e12 - e10 * e22, c11 = e00 * e22 - e20 * e02, c21 = e10 * e02 - e00 * e12;
      const c02 = e10 * e21 - e20 * e11, c12 = e20 * e01 - e00 * e21, c22 = e00 * e11 - e10 * e01;

      for (let v = 0; v < vCount; v++) {
        const px = posAttr.getX(v), py = posAttr.getY(v), pz = posAttr.getZ(v);
        const outV3 = (vOffset + v) * 3;
        posArr[outV3] = e00 * px + e01 * py + e02 * pz + tx;
        posArr[outV3 + 1] = e10 * px + e11 * py + e12 * pz + ty;
        posArr[outV3 + 2] = e20 * px + e21 * py + e22 * pz + tz;

        if (normAttr) {
          const nx = normAttr.getX(v), ny = normAttr.getY(v), nz = normAttr.getZ(v);
          const tnx = c00 * nx + c01 * ny + c02 * nz;
          const tny = c10 * nx + c11 * ny + c12 * nz;
          const tnz = c20 * nx + c21 * ny + c22 * nz;
          const len = Math.hypot(tnx, tny, tnz) || 1;
          normArr[outV3] = tnx / len;
          normArr[outV3 + 1] = tny / len;
          normArr[outV3 + 2] = tnz / len;
        } else {
          normArr[outV3 + 1] = 1;
        }

        if (uvArr && uvAttr) {
          const outV2 = (vOffset + v) * 2;
          uvArr[outV2] = uvAttr.getX(v);
          uvArr[outV2 + 1] = uvAttr.getY(v);
        }
        if (colArr) {
          if (colAttr) {
            colArr[outV3] = colAttr.getX(v);
            colArr[outV3 + 1] = colAttr.getY(v);
            colArr[outV3 + 2] = colAttr.getZ(v);
          } else {
            colArr[outV3] = 1;
            colArr[outV3 + 1] = 1;
            colArr[outV3 + 2] = 1;
          }
        }
      }

      if (idxAttr) {
        const ic = idxAttr.count;
        for (let k = 0; k < ic; k++) {
          idxArr[iOffset + k] = vOffset + idxAttr.getX(k);
        }
        iOffset += ic;
      } else {
        for (let k = 0; k < vCount; k++) {
          idxArr[iOffset + k] = vOffset + k;
        }
        iOffset += vCount;
      }
      vOffset += vCount;
    }

    const mergedGeom = new THREE.BufferGeometry();
    mergedGeom.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
    mergedGeom.setAttribute('normal', new THREE.BufferAttribute(normArr, 3));
    if (uvArr) mergedGeom.setAttribute('uv', new THREE.BufferAttribute(uvArr, 2));
    if (colArr) mergedGeom.setAttribute('color', new THREE.BufferAttribute(colArr, 3));
    mergedGeom.setIndex(new THREE.BufferAttribute(idxArr, 1));
    mergedGeom.computeBoundingBox();
    mergedGeom.computeBoundingSphere();

    const mergedMesh = new THREE.Mesh(mergedGeom, b.mat);
    mergedMesh.castShadow = castShadow;
    mergedMesh.receiveShadow = receiveShadow;
    if (keepUserData && meshes[0].userData) {
      mergedMesh.userData = { ...meshes[0].userData };
    }
    group.add(mergedMesh);
    createdMeshes.push(mergedMesh);
  }

  group.position.copy(savedPos);
  group.rotation.copy(savedRot);
  group.scale.copy(savedScale);
  group.updateMatrixWorld(true);
  return createdMeshes;
}
