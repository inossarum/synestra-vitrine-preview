import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>readFileSync(join(root,p),'utf8');
const scene=read('r204-build/scene.mjs'),css=read('assets/r206-atmosphere.css');
test('R206 confines film grain to one hero layer, with accessibility-safe non-interaction',()=>{
 assert.match(scene,/grain=document.createElement\('div'\)/);
 assert.match(scene,/grain\.setAttribute\('aria-hidden','true'\)/);
 assert.match(css,/\.core-r109-stage > \.r206-film-grain/);
 assert.match(css,/pointer-events:none/);
 assert.doesNotMatch(css,/main > section:not/);
 assert.match(css,/prefers-reduced-motion:reduce/);
});
test('R206 uses a bounded low-cost world-space fog plane and existing renderer',()=>{
 assert.match(scene,/new THREE.PlaneGeometry\(4\.2,3\.4\)/);
 assert.match(scene,/mist\.rotation\.x=-Math\.PI\/2/);
 assert.match(scene,/depthWrite:false/);
 assert.match(scene,/uniform float uStrength/);
 assert.equal((scene.match(/new THREE.WebGLRenderer/g)||[]).length,1);
 assert.doesNotMatch(scene,/EffectComposer|UnrealBloomPass|new THREE\.Points|new THREE\.WebGLRenderTarget/);
});
test('R206 atmosphere degrades with R205 tier and preserves low-end true WebGL',()=>{
 assert.match(scene,/mist\.visible=renderTier>=1/);
 assert.match(scene,/dataSet|dataset\.sceneAtmosphere/);
 assert.match(css,/data-render-tier="0"/);
 assert.match(css,/data-render-tier="1"/);
 assert.match(css,/data-render-tier="2"/);
 assert.match(scene,/setAtmosphere\(\);/);
 assert.match(scene,/grain\?\.remove\(\)/);
});
test('Pedestal and environment enrich compact scene rather than recreating global 3D',()=>{
 assert.match(scene,/new THREE.TorusGeometry\(1\.09/);
 assert.match(scene,/new THREE.TorusGeometry\(1\.38/);
 assert.match(scene,/const rib=make/);
 assert.doesNotMatch(scene,/createCinematicEnvironment|createEnergyLandscape/);
});
test('R188.1 LAB material remains pinned; main and product pages do not get the effect',()=>{
 assert.match(scene,/R188\.1@81b9cf1c/);
 const h=read('r204/index.html');
 assert.match(h,/r206-atmosphere\.css/);
 assert.equal((h.match(/class="core-r109-canvas"/g)||[]).length,1);
 for(const p of ['r202/connect/index.html','r202/bridge/index.html','r202/siteforge/index.html','r202/offres/index.html'])assert.doesNotMatch(read(p),/r206-atmosphere\.css/);
});
test('Self-hosted grain PNG is a small deterministic declared source asset',()=>{
 const b=readFileSync(join(root,'assets/r206-film-grain.png'));
 assert.equal(b.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
 assert.equal(b.readUInt32BE(16),96);assert.equal(b.readUInt32BE(20),96);
 assert.ok(b.length<30000);
});
test('Exact isolated R206 export retains full previous branch routing',()=>{
 const e=read('tools/build_vitrine_static.mjs');
 assert.match(e,/const r206ReviewBranch='task\/SYN_SITEFORGE_R206_GRAIN_MIST_STAGE_20261029'/);
 assert.match(e,/\[r204ReviewBranch,r205ReviewBranch,r206ReviewBranch\]\.includes/);
 assert.match(e,/\[r202ReviewBranch,r204ReviewBranch,r205ReviewBranch,r206ReviewBranch\]\.includes/);
});
test('Failure-first: disable grain and fog on tier zero or reduced motion, not products',()=>{
 assert.match(css,/data-render-tier="0"\] > \.r206-film-grain\{display:none\}/);
 assert.match(css,/animation:none!important/);
 assert.match(scene,/if\(reduced\.matches\)/);
 assert.match(scene,/mist\.visible=renderTier>=1/);
});
