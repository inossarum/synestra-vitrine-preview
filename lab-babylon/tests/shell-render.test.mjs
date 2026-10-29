import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {comparePngPixels} from '../../tests/siteforge_r174_png_diff.mjs';
import {shellCoverageMetrics} from '../src/shell-coverage.js';
const read=n=>readFileSync(new URL('../'+n,import.meta.url));
const browser=JSON.parse(read('evidence/R197_SHELL_BROWSER.json').toString());
test('R197 native Chrome: all four nuclei and quality budgets',()=>{
 assert.equal(browser.status,'PASS');
 const modes=browser.frames.filter(x=>Number.isInteger(x.mode));
 assert.equal(modes.length,8);
 for(const width of [1100,390])for(let mode=0;mode<4;mode++){
  const x=modes.find(x=>x.mode===mode&&x.width===width);
  assert.ok(x);
  assert.equal(x.state.engine,'babylon');
  assert.equal(x.state.canvas,1);
  assert.equal(x.state.error,0);
  assert.equal(x.state.plasmaRibbons,28);
  assert.equal(x.state.palette,'violet,cyan,dark-blue,green');
  // R196 core implementation is deliberately inherited unchanged.
  assert.equal(x.state.plasmaVersion,'core-balance-r196');
 }
 for(const width of [1100,390])for(const [quality,count] of [['economy',8],['balanced',26],['ultra',28]]){
  const x=browser.frames.find(x=>x.width===width&&x.profile===quality);
  assert.ok(x);
  assert.equal(x.budget.ribbons,count);
  assert.equal(x.budget.error,0);
 }
 assert.equal(browser.frames.filter(x=>x.pose).length,3);
 for(const width of [1100,390]){
  const z=browser.frames.find(x=>x.width===width&&x.coreZero);
  assert.ok(z);assert.equal(z.coreZero.forks,0);assert.equal(z.coreZero.photons,0);
 }
});
test('R197 geometry coverage respects all budgets',()=>{
 for(const n of [8,26,28]){
  const c=shellCoverageMetrics(n);
  assert.ok(c.occupiedOctants>=7);
  assert.ok(c.north>0&&c.south>0);
 }
});
test('R197 native renders actually differ from R196 screenshots',()=>{
 for(const width of [1100,390]){
  const before=read('evidence/r196-core-core0-'+width+'.png');
  const after=read('evidence/r197-shell-core0-'+width+'.png');
  const diff=comparePngPixels(before,after);
  assert.ok(diff.changedPercent>2,'screen delta too small '+width+' '+JSON.stringify(diff));
 }
});
