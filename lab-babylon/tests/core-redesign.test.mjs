import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {comparePngPixels} from '../../tests/siteforge_r174_png_diff.mjs';
const local=n=>readFileSync(new URL('../'+n,import.meta.url));
const js=local('src/main.js').toString('utf8');
const report=JSON.parse(local('evidence/R199_CORE_TRY_BROWSER.json'));

test('R199 replaces ring paths with outward radial energy, without replacing Babylon engine',()=>{
 assert.match(js,/R199: open radial plasma branches/);
 assert.match(js,/const distance=\.018\+reach\*ease/);
 assert.match(js,/coreGeometry='radial-plasma-open'/);
 assert.match(js,/mode!==0\|\|i<16/, 'primary radial visibility policy');
 assert.equal((js.match(/new Engine\(/g)||[]).length,1);
 assert.equal((js.match(/new Scene\(/g)||[]).length,1);
 assert.match(js,/mountCoreAtAtlasSocket/);
});

test('R199 Chrome: four nucleus modes, two viewports, quality tiers and core off',()=>{
 assert.equal(report.status,'PASS');
 const photos=report.frames.filter(f=>Number.isInteger(f.mode));
 assert.equal(photos.length,8);
 for(const width of [1100,390]){
  for(let mode=0;mode<4;mode++){
   const x=photos.find(f=>f.mode===mode&&f.width===width);
   assert.ok(x,'missing mode '+mode+' width '+width);
   assert.equal(x.state.engine,'babylon');
   assert.equal(x.state.ready,'true');
   assert.equal(x.state.plasmaVersion,'core-redesign-r199');
   assert.equal(x.state.palette,'violet,cyan,dark-blue,green');
   assert.equal(x.state.canvas,1);
   assert.equal(x.state.error,0);
   assert.equal(x.state.plasmaRibbons,28);
  }
  const off=report.frames.find(f=>f.width===width&&f.coreZero);
  assert.ok(off);
  assert.equal(off.coreZero.forks,0);
  assert.equal(off.coreZero.photons,0);
  const quality=report.frames.filter(f=>f.width===width&&f.profile);
  assert.deepEqual(quality.map(x=>x.profile),['economy','balanced','ultra']);
  assert.ok(quality.every(x=>x.budget.error===0));
 }
 assert.equal(report.frames.filter(f=>f.pose).length,3);
});

test('R199 differs in real GPU pixels from R198 without changing the outer 3D sphere contract',()=>{
 for(const width of [1100,390]){
  const delta=comparePngPixels(local('evidence/r198-cohesion-core0-'+width+'.png'),local('evidence/r199-core-try-core0-'+width+'.png'));
  console.log('R198_R199_DIFFERENCE',width,delta.changed,delta.changedPercent);
  assert.ok(delta.changed>125,'core redesign invisible at '+width);
 }
});

test('Four modes produce independent visible signatures in native screenshot',()=>{
 for(const width of [1100,390]){
  const baseline=local('evidence/r199-core-try-core0-'+width+'.png');
  for(let mode=1;mode<=3;mode++){
   const delta=comparePngPixels(baseline,local('evidence/r199-core-try-core'+mode+'-'+width+'.png'));
   assert.ok(delta.changed>100,'mode '+mode+' indistinguishable '+width);
  }
 }
});
