import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>readFileSync(join(root,p),'utf8');
const scene=read('r204-build/scene.mjs'),lab=read('r204-build/lab-r1881-shader.mjs'),home=read('r204/index.html');
test('R188.1 LAB visual core is SHA pinned and studio violet/green, not new ornamental sphere',()=>{
 assert.match(lab,/81b9cf1cfbbb2920f33482eeaca8655ac6ec475d/);
 assert.match(lab,/uEnergySteps/);
 assert.match(lab,/uFlowLab/);
 assert.match(lab,/crossingTint/);
 assert.match(lab,/vLabUv/);
 assert.match(scene,/uFlow:\{value:new THREE.Vector2\(6,1\)\}/);
 assert.match(scene,/uEnergyA:\{value:v\},uEnergyB:\{value:g\}/);
});
test('Single real Three.js canvas, plinth, floor, walls, three physical lights',()=>{
 assert.equal((scene.match(/new THREE.WebGLRenderer/g)||[]).length,1);
 assert.equal((home.match(/class="core-r109-canvas"/g)||[]).length,1);
 assert.match(scene,/new THREE.PlaneGeometry\(15,15\)/);
 assert.match(scene,/new THREE.BoxGeometry\(9,5.2,.15\)/);
 assert.match(scene,/new THREE.CylinderGeometry/);
 assert.match(scene,/new THREE.PointLight/);
 assert.match(scene,/depthTest:true,depthWrite:false/);
 assert.doesNotMatch(scene,/createEnergyLandscape|createCinematicEnvironment|new THREE.Points/);
});
test('Low-end can render 3D with bounded sampling and pixels before falling back to static',()=>{
 assert.match(scene,/const budget=\[12,24,32,40\]/);
 assert.match(scene,/clampDetailForTier\(renderTier\)\.pixels/);
 assert.match(scene,/1000\/18:renderTier===1\?1000\/24:renderTier===2\?1000\/30:1000\/50/);
 assert.match(scene,/renderer.shadowMap.enabled=renderTier>=3/);
 assert.match(scene,/if\(reduced.matches\)/);
 assert.match(scene,/webglcontextlost/);
 assert.match(scene,/window.addEventListener\('resize',resize/);
 assert.match(scene,/if\(now-lastDraw<targetInterval\)/);
});
test('Hero 3D is isolated and all standard product pages remain conventional HTML',()=>{
 assert.match(home,/syn-r204-home/);
 assert.match(home,/r204-scene.bundle.mjs/);
 assert.match(home,/r204-hero.css/);
 assert.match(home,/noindex,nofollow/);
 assert.match(read('assets/r204-hero.css'),/main > section:not\(\.r192-hero\)/);
 for(const p of ['r202/connect/index.html','r202/bridge/index.html','r202/siteforge/index.html','r202/offres/index.html']){
  assert.ok(existsSync(join(root,p)));
  assert.equal((read(p).match(/<h1\b/g)||[]).length,1,p);
 }
});
test('Negative controls reject second renderer, unconditional 40 steps, and decorative global WebGL',()=>{
 const validator=s=>{
  assert.equal((s.match(/new THREE.WebGLRenderer/g)||[]).length,1);
  assert.match(s,/const budget=\[12,24,32,40\]/);
  assert.doesNotMatch(s,/new THREE.Points/);
 };
 assert.throws(()=>validator(scene+'new THREE.WebGLRenderer({})'));
 assert.throws(()=>validator(scene.replace('const budget=[12,24,32,40]','const budget=[40,40,40,40]')));
 assert.throws(()=>validator(scene+'new THREE.Points()'));
});
