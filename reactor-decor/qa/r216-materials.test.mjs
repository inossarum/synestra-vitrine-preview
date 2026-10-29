import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,statSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const expected={
'metal_plate_02_diff_1k.jpg':'6E80877D0E9D5973D96298C6091DF7ACE906B0A6760AFC4F3592E4855F3F1D4C',
'metal_plate_02_nor_gl_1k.jpg':'58736FBB8AA4FC6690CF8152B174DB65CAF22A766375B625FB0087E1BC955BC7',
'metal_plate_02_rough_1k.jpg':'73A6BD6393F6DE7BE42058584C2D382F2A3E9148CEABC2D02E748E2C860E74D1',
'metal_plate_02_metal_1k.jpg':'FB1B120A2BE5887DFEEBED7A198A8151B292E963713D914B74ED7669434AFB41'
};
test('R216 photo maps are authentic and unmodified CC0 source files',()=>{
 for(const [name,sha] of Object.entries(expected)){
  const file=readFileSync(join(root,'textures','metal_plate_02',name));
  assert.equal(createHash('sha256').update(file).digest('hex').toUpperCase(),sha,name);
  assert.ok(file.length>50000);
 }
});
const path=join(root,'r216-dist','synestra_reactor_decor_r216.glb');
const data=readFileSync(path);
assert.equal(data.toString('ascii',0,4),'glTF');
const g=JSON.parse(data.toString('utf8',20,20+data.readUInt32LE(12)));
const names=g.nodes.map(n=>String(n.name||''));
test('R216 maintains enclosed room and reserved Core',()=>{
 for(const x of ['CORE_SOCKET','CEILING_ROOF_CLOSED','CAMERA_BACK_WALL','REAR_MAINTENANCE_DOOR','R214_CARBON_CASSETTE_-1_00'])assert.ok(names.includes(x),x);
 assert.equal(names.filter(x=>/CORE_SPHERE|ENERGY_ORB|TETHER/i.test(x)).length,0);
 assert.ok(g.meshes.length>=800 && g.meshes.length<1000,String(g.meshes.length));
});
test('R216 material channels are present in Babylon-usable glTF',()=>{
 assert.ok((g.images||[]).length>=7,'photo atlas not exported');
 assert.ok(g.materials.some(m=>/R214_Ribbed_Graphite/i.test(m.name||'')&&m.normalTexture),'normal channel missing on photo metal');
 assert.ok(g.materials.some(m=>/R214_Ribbed_Graphite/i.test(m.name||'')&&m.pbrMetallicRoughness?.baseColorTexture),'photo albedo missing');
 assert.ok((g.textures||[]).length>=7,'PBR maps missing');
});
test('R216 GLB and Blender outputs remain bounded',()=>{
 assert.ok(data.byteLength<13_000_000,'Asset size must be reviewed: '+data.byteLength);
 const png=readFileSync(join(root,'r216-dist','reactor-r216-preview.png'));
 assert.deepEqual([...png.subarray(0,8)],[137,80,78,71,13,10,26,10]);
 assert.equal(png.readUInt32BE(16),1024);assert.equal(png.readUInt32BE(20),576);
 assert.ok(statSync(join(root,'r216-dist','synestra_reactor_decor_r216.blend')).size>100_000);
});
