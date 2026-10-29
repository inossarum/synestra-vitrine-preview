import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const ROOT=join(dirname(fileURLToPath(import.meta.url)),'..');
const glb=readFileSync(join(ROOT,'r213-dist','synestra_reactor_decor_r213.glb'));
assert.equal(glb.toString('ascii',0,4),'glTF');
const content=JSON.parse(glb.toString('utf8',20,20+glb.readUInt32LE(12)));
const names=new Set(content.nodes.map(x=>x.name));
test('R213 physically enclosed all six sides, including rear and camera-facing wall',()=>{
 for(const x of ['CEILING_ROOF_CLOSED','CAMERA_BACK_WALL','REAR_MAINTENANCE_DOOR',
  'SIDE_BULKHEAD_-1_00','SIDE_BULKHEAD_1_11','SIDE_REAR_SEALED_WING_-1_00',
  'SIDE_REAR_SEALED_WING_1_04','CEILING_OVERHEAD_TRUSS_1_3.0']){
  assert.ok([...names].some(n=>n===x||n?.includes(x)),'missing 3D asset '+x);
 }
 assert.ok(content.meshes.length>=590,'unexpectedly low actual mesh count');
});
test('Core socket owned by Labo, no sphere or tether in decor geometry',()=>{
 assert.ok([...names].some(x=>x==='CORE_SOCKET'));
 assert.equal([...names].filter(x=>/CORE_SPHERE|ENERGY_ORB|TETHER|REACTOR_CABLE_TO_CORE/i.test(x)).length,0);
 assert.ok(!content.nodes.some(n=>String(n.name).includes('SPHERE_MESH')));
});
test('Babylon-friendly PBR materials and images embedded in original GLB',()=>{
 assert.ok(content.materials?.length>=14);
 assert.ok(content.images?.length===3);
 assert.ok(content.meshes?.length<1000);
 const bytes=glb.byteLength;assert.ok(bytes<10_000_000,'over GLB budget '+bytes);
});
