import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>readFileSync(join(root,p),'utf8');
const scene=read('r202-build/scene.mjs'),env=read('r202-build/r202-environment.mjs'),home=read('r202/index.html');
test('one genuine Three renderer, depth-tested world-space plasma',()=>{
 assert.equal((scene.match(/new THREE.WebGLRenderer/g)||[]).length,1);
 assert.match(scene,/new THREE.PlaneGeometry\(3\.55,3\.55\)/);
 assert.match(scene,/depthTest:true,depthWrite:false/);
 assert.match(scene,/projectionMatrix\*modelViewMatrix/);
 assert.match(scene,/vCoreUv=uv/);
 assert.match(scene,/plasma\.position\.set\(0,\.05,0\)/);
});
test('world geometry and emitter-synced physically placed point lights',()=>{
 assert.match(scene,/createCinematicEnvironment\(THREE,scene/);
 assert.match(env,/new THREE.MeshStandardMaterial/);
 assert.match(env,/new THREE.PointLight/);
 assert.match(env,/new THREE.BoxGeometry/);
 assert.match(env,/new THREE.PlaneGeometry/);
 assert.match(env,/function setTier/);
 assert.match(env,/function dispose/);
});
test('pointer raycast and camera Theatre choreographed while sphere stays fixed',()=>{
 assert.match(scene,/raycaster\.setFromCamera/);
 assert.match(scene,/intersectObject\(plasma,false\)/);
 assert.match(scene,/plasma\.quaternion\.copy\(camera\.quaternion\)/);
 assert.match(scene,/shot\.initialValue=/);
 assert.match(scene,/getProject\('Synestra R202'/);
});
test('quality profiles and no second canvas or external runtime dependency',()=>{
 assert.match(scene,/await getGPUTier/);
 assert.match(scene,/if\(tierCap===3\)/);
 assert.match(scene,/if\(reduced\.matches\)/);
 assert.doesNotMatch(scene,/new THREE\.WebGLRenderer[\s\S]*new THREE\.WebGLRenderer/);
 for(const slug of ['','connect/','bridge/','siteforge/','offres/']){
  const p='r202/'+slug+'index.html';
  assert.ok(existsSync(join(root,p)));
  assert.match(read(p),/noindex,nofollow/);
 }
 assert.equal((home.match(/class="core-r109-canvas"/g)||[]).length,1);
 assert.match(home,/r202-scene\.bundle\.mjs/);
});
test('failure-first: no fixed screen-space volume or false depth mode',()=>{
 const validate=s=>{assert.match(s,/depthTest:true/);assert.match(s,/vCoreUv=uv/);assert.match(s,/intersectObject\(plasma,false\)/);};
 assert.throws(()=>validate(scene.replace('depthTest:true','depthTest:false')));
 assert.throws(()=>validate(scene.replace('vCoreUv=uv','vCoreUv=vec2(0.)')));
 assert.throws(()=>validate(scene.replace('intersectObject(plasma,false)','intersectObjects([],false)')));
});