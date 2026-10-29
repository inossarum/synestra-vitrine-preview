import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>readFileSync(join(root,p),'utf8');
const scene=read('r204-build/scene.mjs');
const detail=read('r204-build/lab-detail-r207.mjs');
const atmosphere=read('r204-build/stage-atmosphere-r208.mjs');
test('R208 retains the canonical LAB R188.1 shader and selects the volumetric filament branch',()=>{
 assert.match(scene,/R188\.1@81b9cf1c/);
 assert.match(scene,/labR1881Fragment/);
 assert.match(scene,/uFlow:\{value:new THREE\.Vector2\(1,1\)\}/);
 assert.match(scene,/uniforms\.uFlow\.value\.set\(1,/);
 assert.doesNotMatch(scene,/uniforms\.uFlow\.value\.set\(6,/);
});
test('R208 keeps one renderer and bounded world-space scene modules',()=>{
 assert.equal((scene.match(/new THREE\.WebGLRenderer/g)||[]).length,1);
 assert.match(scene,/installLabDetail/);
 assert.match(scene,/installChamberAtmosphere/);
 assert.doesNotMatch(atmosphere,/WebGLRenderer|EffectComposer|UnrealBloomPass|renderTarget/);
 assert.doesNotMatch(detail,/WebGLRenderer|EffectComposer/);
});
test('R208 prevents rectangular hard backdrop and floor clipping edges',()=>{
 assert.match(scene,/PlaneGeometry\(48,48\)/);
 assert.match(scene,/BoxGeometry\(28,20,\.15\)/);
 assert.match(atmosphere,/a\*=smoothstep\(\.00,\.24,vUv\.y\)/);
 assert.match(atmosphere,/smoothstep\(\.76,1\.0,vUv\.y\)/);
});
test('R208 flux returns remain around sphere rather than connecting symmetrically to pillars',()=>{
 assert.match(detail,/new THREE\.CatmullRomCurve3/);
 assert.match(detail,/new THREE\.TubeGeometry/);
 assert.match(detail,/pt\(a\+\.27,\.84/);
 assert.match(detail,/new THREE\.TorusGeometry\(radius/);
 assert.doesNotMatch(detail,/side\*\(2\.03/);
});
test('R208 nucleus is restrained and sphere has readable three-dimensional containment silhouette',()=>{
 assert.match(detail,/IcosahedronGeometry\(\.061,2\)/);
 assert.match(detail,/radius,tilt,opacity,color/);
 assert.match(detail,/boundary\.forEach/);
});
test('R208 mist is local, low-cost, progressive and tier-gated',()=>{
 assert.match(atmosphere,/PlaneGeometry\(3\.8,1\.0\)/);
 assert.match(atmosphere,/uStrength\.value=\[0,\.15,\.30,\.48\]\[tier\]/);
 assert.match(atmosphere,/curtain\.visible=tier>=1/);
 assert.match(atmosphere,/detail\.forEach\(x=>x\.visible=tier>=2\)/);
 assert.match(atmosphere,/depthWrite:false/);
});
test('R208 default remains accessible quality selector plus browser reduced-motion fallback',()=>{
 assert.match(scene,/createQualityPanel/);
 assert.match(scene,/if\(reduced\.matches\)/);
 assert.match(scene,/evolveAdaptiveBudget/);
 assert.match(scene,/labDetail\.applyTier\(renderTier\)/);
 assert.match(scene,/chamber\.applyTier\(renderTier\)/);
});
test('Mobile camera fits sphere on narrow screens and re-evaluates framing on resize',()=>{
 assert.match(scene,/const mobile=innerWidth<=700/);
 assert.match(scene,/mobile\?8\.55-\.42\*e/);
 assert.match(scene,/camera\.aspect=w\/h;camera\.updateProjectionMatrix\(\);\s*onScroll\(\)/);
});
test('R208 export accepts only the exact isolated R208 branch, no production',()=>{
 const e=read('tools/build_vitrine_static.mjs');
 assert.match(e,/const r208ReviewBranch='task\/SYN_SITEFORGE_R208_VISUAL_REFINEMENT_20261029'/);
 assert.match(e,/r207ReviewBranch,r208ReviewBranch\]\.includes/);
 assert.match(e,/SYNESTRA_STATIC_EXPORT/);
});
