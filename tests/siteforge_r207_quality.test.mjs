import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import {sanitizeQualityMode,resolveQualityTier,clampDetailForTier,QUALITY_MODES} from '../r204-build/quality-policy.mjs';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const read=path=>readFileSync(join(root,path),'utf8');
const scene=read('r204-build/scene.mjs'),ui=read('r204-build/quality-ui-r207.mjs'),detail=read('r204-build/lab-detail-r207.mjs');
test('R207 quality selection sanitizes unsupported and unsafe values',()=>{
 assert.equal(sanitizeQualityMode('root'),'auto');
 assert.equal(sanitizeQualityMode('__proto__'),'auto');
 assert.equal(sanitizeQualityMode(null),'auto');
 assert.deepEqual(QUALITY_MODES,['auto','eco','balanced','high','ultra']);
 assert.throws(()=>clampDetailForTier(4),/INVALID_RENDER_TIER/);
 assert.throws(()=>clampDetailForTier(-1),/INVALID_RENDER_TIER/);
});
test('Auto respects GPU and coarse pointer, manual can request larger tier',()=>{
 assert.equal(resolveQualityTier('auto',3,false),3);
 assert.equal(resolveQualityTier('auto',3,true),2);
 assert.equal(resolveQualityTier('auto',0,false),0);
 assert.equal(resolveQualityTier('ultra',0,false),3);
 assert.equal(resolveQualityTier('eco',3,false),0);
 assert.equal(resolveQualityTier('balanced',2,false),1);
 assert.equal(resolveQualityTier('high',2,false),2);
});
test('Ultra has materially better optical and pixel budget than low tier',()=>{
 const eco=clampDetailForTier(0),high=clampDetailForTier(2),ultra=clampDetailForTier(3);
 assert.ok(ultra.pixels>high.pixels&&high.pixels>eco.pixels);
 assert.equal(ultra.energy,40);assert.equal(ultra.flows,8);
 assert.equal(eco.flows,3);
});
test('Quality panel is accessible, persistent, defaults Auto and does not bypass live governor',()=>{
 assert.match(ui,/label\.htmlFor='r207-quality-select'/);
 assert.match(ui,/aria-live/);
 assert.match(ui,/localStorage\.getItem/);
 assert.match(ui,/localStorage\.setItem/);
 assert.match(scene,/evolveAdaptiveBudget/);
 assert.match(scene,/syncTier\(\)/);
 assert.match(scene,/qualityPanel\.update/);
});
test('Scene retains only one renderer and LAB R188.1 original shader source',()=>{
 assert.equal((scene.match(/new THREE\.WebGLRenderer/g)||[]).length,1);
 assert.match(scene,/labR1881Fragment/);
 assert.match(scene,/R188\.1@81b9cf1c/);
 assert.match(scene,/labDetail\.frame\(elapsed\)/);
});
test('Additional flows and real 3D motes are distinct from the lab shader',()=>{
 assert.match(detail,/new THREE\.TubeGeometry/);
 assert.match(detail,/new THREE\.Points/);
 assert.match(detail,/new THREE\.CatmullRomCurve3/);
 assert.match(detail,/for\(let i=0;i<8;i\+\+\)/);
 assert.match(scene,/stage\.dataset\.energyFlows/);
 assert.match(scene,/stage\.dataset\.energyMotes/);
});
test('Fog is visibly raised above the pedestal and tier gated',()=>{
 assert.match(scene,/\[0,-1\.25,\.12\]/);
 assert.match(scene,/mist\.visible=renderTier>=1/);
 assert.match(scene,/renderTier>=3\?\.56/);
});
test('Hero-only visual controls and no global WebGL or unguarded fullscreen postprocess',()=>{
 const css=read('assets/r206-atmosphere.css');
 assert.match(css,/r207-quality-panel/);
 assert.match(css,/prefers-reduced-motion:reduce/);
 assert.doesNotMatch(detail,/new THREE\.WebGLRenderer|EffectComposer|UnrealBloomPass/);
 for(const p of ['r202/connect/index.html','r202/bridge/index.html','r202/offres/index.html']){
  assert.doesNotMatch(read(p),/r207-quality-select/);
 }
});
test('R207 exact branch retained in bounded deployment export',()=>{
 const source=read('tools/build_vitrine_static.mjs');
 assert.match(source,/const r207ReviewBranch='task\/SYN_SITEFORGE_R207_LAB_DETAIL_QUALITY_20261029'/);
 assert.match(source,/r206ReviewBranch,r207ReviewBranch\]\.includes/);
});
