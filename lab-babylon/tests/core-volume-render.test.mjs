import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {comparePngPixels} from '../../tests/siteforge_r174_png_diff.mjs';
const read=n=>readFileSync(new URL('../evidence/'+n,import.meta.url));
const report=JSON.parse(read('R200_VOLUME_BROWSER.json'));
test('R200 native Chrome actually rendered four core modes at two viewports',()=>{
 assert.equal(report.status,'PASS');
 assert.equal(report.frames.filter(f=>Number.isInteger(f.mode)).length,8);
 for(const width of [1100,390])for(let mode=0;mode<4;mode++){
  const x=report.frames.find(f=>f.width===width&&f.mode===mode);
  assert.ok(x);
  assert.equal(x.state.engine,'babylon');
  assert.equal(x.state.ready,'true');
  assert.equal(x.state.plasmaVersion,'core-volume-r200');
  assert.equal(x.state.canvas,1);
  assert.equal(x.state.error,0);
  assert.equal(x.state.plasmaRibbons,28);
  assert.equal(x.state.palette,'violet,cyan,dark-blue,green');
  assert.equal(x.state.artReference,'SYN_SPHERE_ART_REFERENCE_20261029');
 }
});
test('R200 native quality and orbit and power-zero controls',()=>{
 assert.equal(report.frames.filter(x=>x.profile).length,6);
 assert.equal(report.frames.filter(x=>x.pose).length,3);
 assert.equal(report.frames.filter(x=>x.coreZero).length,2);
 for(const w of [1100,390]){
  for(const [q,n] of [['economy',8],['balanced',26],['ultra',28]]){
   const x=report.frames.find(f=>f.width===w&&f.profile===q);
   assert.ok(x);assert.equal(x.budget.ribbons,n);assert.equal(x.budget.error,0);
  }
  const z=report.frames.find(f=>f.width===w&&f.coreZero);
  assert.ok(z);assert.equal(z.coreZero.forks,0);assert.equal(z.coreZero.photons,0);
 }
});
test('R200 native screenshots differ from R199 at identical frozen frame',()=>{
 for(const width of [1100,390]){
  const prior=read('r199-core-try-core0-'+width+'.png');
  const newer=read('r200-volume-core0-'+width+'.png');
  const delta=comparePngPixels(prior,newer);
  console.log('R199_R200_PIXEL_DELTA',width,delta.changedPercent);
  assert.ok(delta.changedPercent>.15);
 }
});
test('Each of the four R200 core modes is visually distinct',()=>{
 for(const w of [1100,390])for(let mode=1;mode<4;mode++){
  const d=comparePngPixels(read('r200-volume-core0-'+w+'.png'),read('r200-volume-core'+mode+'-'+w+'.png'));
  assert.ok(d.changed>100,'mode '+mode+' viewport '+w+' insufficient delta');
 }
});
