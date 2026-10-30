import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {plasmaFieldBudget,plasmaFieldOpacity,PLASMA_FIELD_RADII} from '../src/plasma-field.mjs';
test('R202 plasma field obeys bounded quality budgets and power zero',()=>{
 assert.deepEqual(PLASMA_FIELD_RADII,[.68,1.45,1.01]);
 assert.deepEqual(['economy','balanced','auto','ultra'].map(q=>plasmaFieldBudget(q,1.45)),[1,2,2,3]);
 assert.ok(PLASMA_FIELD_RADII[1]>1.4,'balanced mode must reach the outer shell');
 assert.ok(plasmaFieldOpacity(1,1.45,'balanced')>.2,'outer shell must be visible');
 assert.equal(plasmaFieldOpacity(2,1.45,'balanced'),0,'middle shell reserved for ultra');
 assert.deepEqual(['economy','balanced','auto','ultra'].map(q=>plasmaFieldBudget(q,0)),[0,0,0,0]);
 for(const q of ['economy','balanced','auto','ultra'])for(let i=0;i<3;i++){
  const a=plasmaFieldOpacity(i,0,q),b=plasmaFieldOpacity(i,1.45,q);
  assert.equal(a,0);assert.ok(b>=0&&b<=.32);
  if(i>=plasmaFieldBudget(q,1.45))assert.equal(b,0);
 }
});
test('R202 invalid numeric and quality inputs fail closed',()=>{
 for(const q of ['', 'super',null])assert.throws(()=>plasmaFieldBudget(q,1),/INVALID/);
 for(const power of [NaN,-.1,Infinity,2.6])assert.throws(()=>plasmaFieldBudget('balanced',power),/INVALID/);
 for(const i of [-1,3,0.5])assert.throws(()=>plasmaFieldOpacity(i,1),/INVALID/);
});
test('R202 stays in one Babylon scene without remote assets or new render loop',()=>{
 const src=readFileSync(new URL('../src/plasma-field.js',import.meta.url),'utf8');
 const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
 assert.match(src,/ShaderMaterial/);
 assert.match(src,/PLASMA_FIELD_RADII/);
 assert.match(src,/mesh\.parent=parent/);
 assert.doesNotMatch(src,/new Engine\(|new Scene\(|fetch\(|XMLHttpRequest|https?:\/\/|runRenderLoop/);
 assert.match(main,/installPlasmaField/);
 assert.match(main,/plasmaField\.update/);
 assert.match(main,/core-shell-fusion-r201/);
 assert.match(main,/r202-plasma-field/);
});
