import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Vector3,NullEngine,Scene,Color3,VertexBuffer} from '@babylonjs/core';
import {SPHERE_REFERENCE} from '../src/reference-contract.js';
import {shellAnchorPair} from '../src/shell-coverage.js';
import {sampleShellModeShape} from '../src/shell-mode-shapes.mjs';
import {organicPlasmaCenterline,installPlasmaRibbons} from '../src/plasma-ribbons.js';

const dirs=[[-.54,.71,.46],[.70,.58,.38],[-.73,-.32,.47],[.70,-.55,.29],[-.02,-.92,.40],[.32,.89,-.38]].map(v=>new Vector3(...v).normalize());
const src=readFileSync(new URL('../src/plasma-ribbons.js',import.meta.url),'utf8');
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const distance=(a,b)=>Vector3.Distance(a,b);

test('R202.56 four structural modes are deterministic, bounded and anchored',()=>{
 for(const bad of [-1,4,NaN,1.5])assert.throws(()=>sampleShellModeShape(bad,0,.5,1),/SHELL_MODE_INVALID/);
 for(const bad of [-1,28,NaN])assert.throws(()=>sampleShellModeShape(0,bad,.5,1),/SHELL_MODE_INPUT_INVALID/);
 for(const bad of [-.1,1.1,NaN])assert.throws(()=>sampleShellModeShape(0,0,bad,1),/SHELL_MODE_INPUT_INVALID/);
 for(const mode of [0,1,2,3])for(let i=0;i<28;i++)for(let k=0;k<=84;k++){
  const f=sampleShellModeShape(mode,i,k/84,2.4);
  assert.ok(Object.values(f).every(Number.isFinite));
  assert.ok(Math.abs(f.side)<=.301&&Math.abs(f.across)<=.201&&Math.abs(f.radial)<=.161);
  if(k===0||k===84)assert.deepEqual(f,{side:0,across:0,radial:0});
  assert.deepEqual(f,sampleShellModeShape(mode,i,k/84,2.4));
 }
});

test('R202.56 28 existing ribbon centerlines morph in all 4 modes without losing anchors',()=>{
 const modes=[0,1,2,3].map(mode=>Array.from({length:28},(_,i)=>organicPlasmaCenterline(i,2.4,dirs,mode)));
 for(const [mode,paths] of modes.entries())for(const [i,path] of paths.entries()){
  const [a,b]=shellAnchorPair(i);
  assert.equal(path.length,85);
  assert.ok(distance(path[0],new Vector3(...a).scale(1.54))<1e-7);
  assert.ok(distance(path.at(-1),new Vector3(...b).scale(1.54))<1e-6);
  assert.ok(path.every(p=>p.length()>.60&&p.length()<1.81&&[p.x,p.y,p.z].every(Number.isFinite)));
  let maxStep=0,baselineMax=0;
  const original=modes[0][i];
  for(let k=1;k<85;k++){
   maxStep=Math.max(maxStep,distance(path[k],path[k-1]));
   baselineMax=Math.max(baselineMax,distance(original[k],original[k-1]));
  }
  assert.ok(maxStep<=Math.max(.24,baselineMax+.055),'new curvature regression '+mode+'/'+i+': '+maxStep+' > '+baselineMax);
 }
 const changes=[1,2,3].map(mode=>modes[mode].reduce((sum,path,i)=>sum+distance(path[42],modes[0][i][42]),0));
 assert.ok(changes.every(x=>x>1.0),'modes visually indistinguishable: '+changes);
 const pair=Array.from({length:3},(_,i)=>modes[i+1].reduce((sum,path,j)=>sum+distance(path[42],modes[(i+2)%3+1][j][42]),0));
 assert.ok(pair.every(x=>x>1),'modes too similar: '+pair);
});

test('R202.56 mode switch updates the same Babylon ribbons even at frozen animation time',()=>{
 const engine=new NullEngine(),scene=new Scene(engine);
 try{
  const colors=SPHERE_REFERENCE.colors.map(x=>new Color3(...x.linear));
  const kit=installPlasmaRibbons({scene,colors,nodes:dirs,count:28});
  const meshes=kit.meshes.slice();
  const geometry=mode=>{
   kit.update({time:2.4,quality:'balanced',active:28,corePower:145,mode});
   return kit.meshes[0].getVerticesData(VertexBuffer.PositionKind).slice();
  };
  const a=geometry(0),b=geometry(1),c=geometry(2),d=geometry(3);
  assert.ok(a.some((x,i)=>Math.abs(x-b[i])>.015));
  assert.ok(b.some((x,i)=>Math.abs(x-c[i])>.015));
  assert.ok(c.some((x,i)=>Math.abs(x-d[i])>.015));
  assert.ok(kit.meshes.every((m,i)=>m===meshes[i]));
  assert.equal(kit.meshes.length,28);
  assert.equal(kit.meshes.filter(m=>m.isEnabled()).length,26);
  kit.dispose();
 }finally{scene.dispose();engine.dispose();}
});

test('R202.56 only geometry is routed from existing mode input; no extra engine or shader',()=>{
 assert.match(src,/mode=0/);
 assert.match(src,/sampleShellModeShape\(mode,index,u,time\)/);
 assert.match(main,/plasma\.update\(\{time,quality,parent:sphereRoot,mode,/);
 assert.equal((main.match(/new Engine\(/g)||[]).length,1);
 assert.equal((main.match(/new Scene\(/g)||[]).length,1);
});
