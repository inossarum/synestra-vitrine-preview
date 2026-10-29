import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {NullEngine,Scene,Vector3,Color3,VertexBuffer} from '@babylonjs/core';
import {organicPlasmaCenterline,organicPlasmaRibbonPaths,ribbonVertexAlphas,installPlasmaRibbons} from '../src/plasma-ribbons.js';
import {SPHERE_REFERENCE} from '../src/reference-contract.js';
import {comparePngPixels} from '../../tests/siteforge_r174_png_diff.mjs';
const get=n=>readFileSync(new URL('../evidence/'+n,import.meta.url));
const dirs=[new Vector3(1,0,1),new Vector3(-1,1,.5),new Vector3(0,-1,1),new Vector3(.8,.4,-.6)].map(x=>x.normalize());
test('R194 sheath is wider and more transparent than underlying plasma core',()=>{
 const base=organicPlasmaCenterline(0,1.2,dirs);
 const narrow=organicPlasmaRibbonPaths(base,0,1.2);
 const broad=organicPlasmaRibbonPaths(base,0,1.2,3.8);
 const w=p=>Vector3.Distance(p[0][42],p[4][42]);
 assert.ok(w(broad)>w(narrow)*3.7);
 const old=ribbonVertexAlphas(0,84,1);
 const mist=ribbonVertexAlphas(0,84,.44);
 const alphaIndex=(2*85+42)*4+3;
 assert.ok(mist[alphaIndex]<old[alphaIndex]*.5);
});
test('R194 creates only scene-owned sheaths, with fail-closed low quality tier',()=>{
 const engine=new NullEngine(),scene=new Scene(engine);
 try{
  const colors=SPHERE_REFERENCE.colors.map(c=>new Color3(...c.linear));
  const kit=installPlasmaRibbons({scene,colors,nodes:dirs,count:28});
  assert.equal(kit.stats().sheaths,14);
  assert.equal(kit.sheaths.length,14);
  assert.equal(kit.sheaths[0].getVerticesData(VertexBuffer.ColorKind).length,85*5*4);
  kit.update({time:1,quality:'economy'});
  assert.equal(kit.sheaths.filter(x=>x.isEnabled()).length,0);
  kit.update({time:1,quality:'balanced'});
  assert.equal(kit.sheaths.filter(x=>x.isEnabled()).length,10);
  kit.update({time:1,quality:'ultra'});
  assert.equal(kit.sheaths.filter(x=>x.isEnabled()).length,14);
  kit.dispose();
 }finally{scene.dispose();engine.dispose();}
});
test('Real Chrome checks 4 nucleus modes, three budgets and three orbital views',()=>{
 const r=JSON.parse(get('R194_GLOW_BROWSER.json').toString());
 assert.equal(r.status,'PASS');
 for(const width of [1100,390]){
  for(let mode=0;mode<4;mode++){
   const s=r.frames.find(x=>x.width===width&&x.mode===mode);
   assert.ok(s);assert.equal(s.state.glowSheaths,14);
   assert.equal(s.state.canvas,1);assert.equal(s.state.error,0);
  }
  for(const [q,expected] of [['economy',0],['balanced',10],['ultra',14]]){
   const s=r.frames.find(x=>x.width===width&&x.profile===q);
   assert.ok(s);assert.equal(s.budget.sheaths,expected);assert.equal(s.budget.error,0);
  }
 }
 for(const pose of ['front','side','above'])assert.ok(r.frames.some(x=>x.pose===pose));
});
test('R194 wide halo visibly changes pixels compared to R193 at both widths',()=>{
 for(const width of [1100,390]){
  const result=comparePngPixels(get('r193-light-core0-'+width+'.png'),get('r194-glow-core0-'+width+'.png'));
  assert.ok(result.changedPercent>3,'halo not perceptible '+width);
 }
});
