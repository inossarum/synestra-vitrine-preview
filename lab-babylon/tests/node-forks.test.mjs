import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {NullEngine,Scene,Vector3,StandardMaterial,VertexBuffer} from '@babylonjs/core';
import {nodeForkPath,installNodeForks} from '../src/node-branches.js';
import {comparePngPixels} from '../../tests/siteforge_r174_png_diff.mjs';

const dirs=[
 [-.54,.71,.46],[.70,.58,.38],[-.73,-.32,.47],
 [.70,-.55,.29],[-.02,-.92,.40],[.32,.89,-.38]
].map(c=>new Vector3(...c).normalize());
const file=n=>readFileSync(new URL('../evidence/'+n,import.meta.url));

test('Two true 3D fork paths per node, radii bounded, temporal motion',()=>{
 for(let i=0;i<12;i++){
  const p=nodeForkPath(dirs,i,0),q=nodeForkPath(dirs,i,2.4);
  assert.equal(p.length,73);
  assert.ok(p.every(v=>Number.isFinite(v.x)&&Number.isFinite(v.y)&&Number.isFinite(v.z)));
  assert.ok(p.every(v=>v.length()>1.46&&v.length()<1.62));
  assert.ok(Vector3.Distance(p[0],dirs[Math.floor(i/2)].scale(1.53))<1e-5);
  assert.ok(Vector3.Distance(p[35],q[35])>.001,'movement absent '+i);
 }
 for(let i=0;i<6;i++){
  const a=nodeForkPath(dirs,i*2,0),b=nodeForkPath(dirs,i*2+1,0);
  assert.ok(Vector3.Distance(a[72],b[72])>1.1,'forks do not diverge '+i);
 }
 assert.throws(()=>nodeForkPath([],0,0),/SIX_NODES/);
 assert.throws(()=>nodeForkPath(dirs,12,0),/FORK_INDEX/);
});

test('Existing Babylon scene and palettes reused, no extra Engine',()=>{
 const engine=new NullEngine(),scene=new Scene(engine);
 try{
  const before=scene.getEngine();
  const mats=Array.from({length:4},(_,i)=>new StandardMaterial('color'+i,scene));
  const kit=installNodeForks({scene,directions:dirs,ribbonMaterials:mats,photonMaterials:mats});
  assert.equal(kit.stats().branches,12);
  assert.equal(kit.stats().photons,6);
  assert.equal(kit.stats().segments,72);
  assert.equal(kit.meshes[0].getVerticesData(VertexBuffer.ColorKind).length,73*5*4);
  kit.update({time:1,quality:'balanced',corePower:145});
  assert.equal(kit.meshes.filter(m=>m.isEnabled()).length,8);
  assert.equal(kit.photons.filter(m=>m.isEnabled()).length,6);
  kit.update({time:1,quality:'economy',corePower:145});
  assert.equal(kit.meshes.filter(m=>m.isEnabled()).length,4);
  assert.equal(kit.photons.filter(m=>m.isEnabled()).length,2);
  kit.update({time:1,quality:'ultra',corePower:145});
  assert.equal(kit.meshes.filter(m=>m.isEnabled()).length,12);
  assert.equal(kit.photons.filter(m=>m.isEnabled()).length,6);
  kit.update({time:1,quality:'ultra',corePower:0});
  assert.equal(kit.meshes.filter(m=>m.isEnabled()).length,0);
  assert.equal(kit.photons.filter(m=>m.isEnabled()).length,0);
  assert.equal(scene.getEngine(),before);
  kit.dispose();
 }finally{scene.dispose();engine.dispose();}
});

test('Real browser: 4 modes, 3 budgets, 3 orbits, core-off',()=>{
 const report=JSON.parse(file('R195_FORK_BROWSER.json').toString());
 assert.equal(report.status,'PASS');
 for(const width of [1100,390]){
  for(let mode=0;mode<4;mode++){
   const x=report.frames.find(f=>f.width===width&&f.mode===mode);
   assert.ok(x);
   assert.equal(x.state.canvas,1);
   assert.equal(x.state.error,0);
   assert.equal(x.state.nodeForks,12);
   assert.equal(x.state.nodePhotons,6);
   assert.equal(x.state.plasmaVersion,'node-branches-r195');
   assert.match(x.state.renderer,/RTX 3090/);
  }
  for(const [quality,forks,photons] of [['economy',4,2],['balanced',8,6],['ultra',12,6]]){
   const x=report.frames.find(f=>f.width===width&&f.profile===quality);
   assert.ok(x);assert.equal(x.budget.forks,forks);
   assert.equal(x.budget.photons,photons);
   assert.equal(x.budget.error,0);
  }
  const off=report.frames.find(f=>f.width===width&&f.coreZero);
  assert.ok(off);assert.equal(off.coreZero.forks,0);
  assert.equal(off.coreZero.photons,0);
 }
 for(const pose of ['front','side','above'])assert.ok(report.frames.some(f=>f.pose===pose));
});

test('Native GPU screenshots change from R194 in both desktop and mobile',()=>{
 for(const width of [1100,390]){
  const diff=comparePngPixels(file('r194-glow-core0-'+width+'.png'),file('r195-fork-core0-'+width+'.png'));
  assert.ok(diff.changedPercent>1.0,'no meaningful visual delta '+width+' '+JSON.stringify(diff));
 }
});
