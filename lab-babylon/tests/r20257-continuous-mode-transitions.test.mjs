import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Color3,NullEngine,Scene,Vector3,VertexBuffer} from '@babylonjs/core';
import {advanceShellTransition} from '../src/shell-mode-transition.mjs';
import {blendShellModeShape} from '../src/shell-mode-shapes.mjs';
import {geometryUpdateDecision} from '../src/geometry-frame-budget.mjs';
import {installPlasmaRibbons} from '../src/plasma-ribbons.js';
import {SPHERE_REFERENCE} from '../src/reference-contract.js';

const seeds=[[-.54,.71,.46],[.70,.58,.38],[-.73,-.32,.47],[.70,-.55,.29],[-.02,-.92,.40],[.32,.89,-.38]].map(p=>new Vector3(...p).normalize());
const length=(a,b)=>Math.hypot(...a.map((v,i)=>v-b[i]));
const src=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');

test('R202.57 mode changes are continuous, bounded, and retargetable without jumping',()=>{
 let s=advanceShellTransition(null,0,0);
 assert.deepEqual(s.weights,[1,0,0,0]);
 s=advanceShellTransition(s,1,1);
 assert.deepEqual(s.weights,[1,0,0,0]);
 assert.equal(s.active,true);
 const half=advanceShellTransition(s,1,1.36);
 assert.ok(Math.abs(half.weights[0]-.5)<.001);
 assert.ok(Math.abs(half.weights[1]-.5)<.001);
 assert.ok(Math.abs(half.weights.reduce((a,b)=>a+b,0)-1)<1e-12);
 const switchNow=advanceShellTransition(half,3,1.36);
 assert.deepEqual(switchNow.weights,half.weights,'rapid target changes must not snap');
 const t=advanceShellTransition(switchNow,3,1.72);
 assert.ok(t.weights[3]>.49&&t.weights[3]<.51);
 const final=advanceShellTransition(t,3,2.2);
 assert.deepEqual(final.weights,[0,0,0,1]);
 assert.equal(final.active,false);
 assert.deepEqual(advanceShellTransition(final,2,2.3,{reducedMotion:true}).weights,[0,0,1,0]);
 assert.throws(()=>advanceShellTransition(null,9,0),/SHELL_MODE_INVALID/);
 assert.throws(()=>advanceShellTransition(null,0,NaN),/SHELL_CLOCK_INVALID/);
 assert.throws(()=>advanceShellTransition(final,3,1.1),/SHELL_CLOCK_BACKWARDS/);
});

test('R202.57 weighted modes preserve anchored paths and interpolate geometry without creating meshes',()=>{
 assert.deepEqual(blendShellModeShape(3,0,2.4,[1,0,0,0]),{side:0,across:0,radial:0});
 for(const weights of [[1,0,0,0],[.5,.5,0,0],[0,1,0,0],[.3,.2,.1,.4]]){
  const f=blendShellModeShape(3,.5,2.4,weights);
  assert.ok(Object.values(f).every(Number.isFinite));
  assert.deepEqual(blendShellModeShape(3,0,2.4,weights),{side:0,across:0,radial:0});
 }
 assert.throws(()=>blendShellModeShape(0,.5,2,[.6,.6,0,0]),/SHELL_BLEND_WEIGHTS_INVALID/);
 const engine=new NullEngine(),scene=new Scene(engine);
 try{
  const colors=SPHERE_REFERENCE.colors.map(x=>new Color3(...x.linear));
  const kit=installPlasmaRibbons({scene,colors,nodes:seeds,count:28});
  const originals=kit.meshes.slice();
  const get=weights=>{
   kit.update({time:2.4,quality:'balanced',mode:1,transitionWeights:weights,active:28,corePower:145});
   return kit.meshes[0].getVerticesData(VertexBuffer.PositionKind).slice();
  };
  const a=get([1,0,0,0]),b=get([.5,.5,0,0]),c=get([0,1,0,0]);
  assert.ok(length(a,b)>.03);
  assert.ok(length(b,c)>.03);
  assert.ok(length(a,c)>length(a,b));
  assert.ok(length(a,c)>length(b,c));
  assert.equal(kit.meshes.length,28);
  assert.ok(kit.meshes.every((mesh,i)=>mesh===originals[i]));
  kit.dispose();
 }finally{scene.dispose();engine.dispose();}
});

test('R202.57 frozen-time transition reuses existing geometry CPU cadence',()=>{
 const args={now:100,time:18,quality:'balanced',mode:0,power:145,radius:1,amount:24,turbulence:.45};
 const initial=geometryUpdateDecision(null,args);
 const idle=geometryUpdateDecision(initial.next,{...args,now:130,transitionActive:false});
 assert.equal(idle.update,false);
 const ongoing=geometryUpdateDecision(initial.next,{...args,now:130,transitionActive:true});
 assert.equal(ongoing.update,true);
 const tooSoon=geometryUpdateDecision(ongoing.next,{...args,now:135,transitionActive:true});
 assert.equal(tooSoon.update,false);
 assert.match(src,/advanceShellTransition/);
 assert.match(src,/transitionActive:modeTransition\.active/);
 assert.match(src,/transitionWeights:modeTransition\.weights/);
 assert.equal((src.match(/new Engine\(/g)||[]).length,1);
 assert.equal((src.match(/new Scene\(/g)||[]).length,1);
});
