import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {comparePngPixels} from '../../tests/siteforge_r174_png_diff.mjs';
import {ribbonTexCoords,organicPlasmaCenterline,organicPlasmaRibbonPaths} from '../src/plasma-ribbons.js';
import {Vector3} from '@babylonjs/core';
const load=n=>readFileSync(new URL('../'+n,import.meta.url));
test('R193 plasma shader is GPU-animated with spatial UV gradient',()=>{
 const js=load('src/plasma-ribbons.js').toString();
 assert.match(js,/uniform float uTime/);
 assert.match(js,/attribute vec2 uv/);
 assert.match(js,/vUV\.x\*24\.0-uTime\*2\.8/);
 assert.match(js,/ribbonTexCoords\(path.length-1\)/);
 assert.match(js,/for\(const mat of material\)mat.setFloat\('uTime',time\)/);
});
test('A node ribbon UV covers its full path and all five rails',()=>{
 const coords=ribbonTexCoords(72);
 assert.equal(coords.length,73*5*2);
 const v=(rail,point)=>coords[(rail*73+point)*2+1];
 assert.equal(v(0,0),0);assert.equal(v(2,36),.5);assert.equal(v(4,72),1);
 const x=(rail,point)=>coords[(rail*73+point)*2];
 assert.equal(x(0,0),0);assert.equal(x(4,72),1);
});
test('Real Babylon scene R193 still covers all core modes, profiles and camera views',()=>{
 const report=JSON.parse(load('evidence/R193_PLASMA_BROWSER.json').toString());
 assert.equal(report.status,'PASS');
 for(const width of [1100,390]){
  for(let mode=0;mode<4;mode++){
   const f=report.frames.find(f=>f.width===width&&f.mode===mode);
   assert.ok(f);assert.equal(f.state.error,0);
   assert.equal(f.state.canvas,1);assert.equal(f.state.plasmaRibbons,28);
   assert.equal(f.state.nodePlasma,6);
   assert.equal(f.state.plasmaVersion,'plasma-light-r193');
  }
  for(const [quality,ribbons] of [['economy',8],['balanced',26],['ultra',28]]){
   const f=report.frames.find(f=>f.width===width&&f.profile===quality);
   assert.ok(f);assert.equal(f.budget.ribbons,ribbons);assert.equal(f.budget.error,0);
  }
 }
 for(const pose of ['front','side','above'])assert.ok(report.frames.find(f=>f.width===1100&&f.pose===pose));
});
test('Native pixels differ from R192 in both desktop and mobile, not just source code',()=>{
 for(const width of [1100,390]){
  const before=load('evidence/r192-organic-core0-'+width+'.png');
  const after=load('evidence/r193-light-core0-'+width+'.png');
  assert.ok(comparePngPixels(before,after).changed>4000,'no new render '+width);
 }
});
