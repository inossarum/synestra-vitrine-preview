import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {NullEngine,Scene,Vector3,Color3,VertexBuffer,TransformNode} from '@babylonjs/core';
import {organicPlasmaCenterline,organicPlasmaRibbonPaths,ribbonVertexAlphas,installPlasmaRibbons} from '../src/plasma-ribbons.js';
import {SPHERE_REFERENCE} from '../src/reference-contract.js';
import {comparePngPixels} from '../../tests/siteforge_r174_png_diff.mjs';
const unit=(x,y,z)=>new Vector3(x,y,z).normalize();
const nodes=[unit(-.54,.71,.46),unit(.70,.58,.38),unit(-.73,-.32,.47),unit(.70,-.55,.29),unit(-.02,-.92,.40),unit(.32,.89,-.38)];
const shot=n=>readFileSync(new URL('../evidence/'+n,import.meta.url));
test('Ribbon coordinates are volumetric, bounded and animated, not camera-facing pixels',()=>{
 const old=organicPlasmaCenterline(2,0,nodes);
 const updated=organicPlasmaCenterline(2,2.4,nodes);
 assert.equal(old.length,85);
 assert.ok(old.every(v=>Number.isFinite(v.x)&&Number.isFinite(v.y)&&Number.isFinite(v.z)));
 assert.ok(old.every(v=>v.length()>.6&&v.length()<1.8));
 const delta=old.reduce((n,p,i)=>n+Vector3.Distance(p,updated[i]),0);
 assert.ok(delta>.3,'animated 3D motion missing '+delta);
 const rails=organicPlasmaRibbonPaths(old,2,0);
 assert.equal(rails.length,5);
 assert.ok(rails.every(a=>a.length===85));
 const maxWidth=rails[0].reduce((x,p,i)=>Math.max(x,Vector3.Distance(p,rails[4][i])),0);
 assert.ok(maxWidth>.01&&maxWidth<.2,'organic width '+maxWidth);
});
test('Vertex alpha forms a luminous middle and tapered, transparent edge',()=>{
 const colors=ribbonVertexAlphas(1);
 assert.equal(colors.length,85*5*4);
 const read=(rail,seg)=>colors[(rail*85+seg)*4+3];
 assert.ok(read(2,42)>read(0,42)*8,'central emission lacks falloff');
 assert.ok(read(2,42)>read(2,0)*10,'tips not tapered');
 assert.equal(read(2,0),0);
});
test('NullEngine ribbon instancing uses the existing scene and quality budget',()=>{
 const engine=new NullEngine();
 const scene=new Scene(engine);
 try{
  const base=scene.getEngine();
  const kit=installPlasmaRibbons({scene,colors:SPHERE_REFERENCE.colors.map(x=>new Color3(...x.linear)),nodes,count:12});
  const parent=new TransformNode('LAB_SPHERE_ROOT',scene);
  assert.equal(kit.stats().ribbons,12);
  assert.equal(kit.stats().rails,5);
  assert.equal(kit.meshes[0].getVerticesData(VertexBuffer.ColorKind).length,85*5*4);
  kit.update({time:0,quality:'balanced',parent,active:12});
  assert.equal(kit.meshes.filter(m=>m.isEnabled()).length,12);
  const before=kit.meshes[0].getVerticesData(VertexBuffer.PositionKind).slice();
  kit.update({time:1,quality:'economy',parent,active:12});
  assert.equal(kit.meshes.filter(m=>m.isEnabled()).length,8);
  kit.update({time:1,quality:'ultra',parent,active:12});
  assert.equal(kit.meshes.filter(m=>m.isEnabled()).length,12,'fixed-time quality change did not apply');
  const after=kit.meshes[0].getVerticesData(VertexBuffer.PositionKind);
  assert.ok(before.some((v,i)=>Math.abs(v-after[i])>.001),'no geometry motion');
  assert.equal(scene.getEngine(),base);
  kit.dispose();
 }finally{scene.dispose();engine.dispose();}
});
test('Invalid palette and missing node geometry reject rather than hide failure',()=>{
 const engine=new NullEngine(),scene=new Scene(engine);
 try{
  assert.throws(()=>installPlasmaRibbons({scene,colors:[],nodes}),/FOUR_PALETTE/);
  assert.throws(()=>organicPlasmaCenterline(0,0,[]),/NODES_MISSING/);
 }finally{scene.dispose();engine.dispose();}
});
test('Real RTX3090 screenshots: same scope and distinct animated nucleus modes',()=>{
 const report=JSON.parse(shot('R192_ORGANIC_BROWSER.json').toString());
 assert.equal(report.status,'PASS');
 assert.equal(report.frames.filter(f=>Number.isInteger(f.mode)).length,8);
 for(const width of [1100,390]){
  for(let mode=0;mode<4;mode++){
   const frame=report.frames.find(f=>f.mode===mode&&f.width===width);
   assert.ok(frame);
   assert.equal(frame.state.plasmaVersion,'organic-r192');
   assert.equal(frame.state.plasmaRibbons,28);
   assert.equal(frame.state.canvas,1);
   assert.equal(frame.state.error,0);
  }
  const before=shot('r191-reference-core0-'+width+'.png');
  const after=shot('r192-organic-core0-'+width+'.png');
  const diff=comparePngPixels(before,after);
  assert.ok(diff.changed>5000,'ribbon change invisible '+width);
 }
});

test('Three camera orbit poses prove non-billboard depth from real screenshots',()=>{
 const report=JSON.parse(shot('R192_ORGANIC_BROWSER.json').toString());
 const photos=['front','side','above'].map(pose=>{
  const frame=report.frames.find(f=>f.width===1100&&f.pose===pose);
  assert.ok(frame,'missing orbit '+pose);
  return shot(frame.name);
 });
 assert.ok(comparePngPixels(photos[0],photos[1]).changed>5000,'side angle unchanged');
 assert.ok(comparePngPixels(photos[0],photos[2]).changed>3000,'top angle unchanged');
});
test('Browser quality change applies even at fixed animation time',()=>{
 const report=JSON.parse(shot('R192_ORGANIC_BROWSER.json').toString());
 for(const width of [1100,390])for(const [name,count] of [['economy',8],['balanced',22],['ultra',28]]){
  const state=report.frames.find(f=>f.width===width&&f.profile===name);
  assert.ok(state);
  assert.equal(state.budget.ribbons,count);
  assert.equal(state.budget.error,0);
 }
});

test('Node-to-core plasma ribbons have geometry and obey core power at frozen time',()=>{
 const engine=new NullEngine(),scene=new Scene(engine);
 try{
  const line=(i,time)=>Array.from({length:73},(_,k)=>{
   const u=k/72,dir=nodes[i%nodes.length];
   return dir.scale(.23+u*1.3).add(new Vector3(.07*Math.sin(u*Math.PI*2+time),.03*Math.sin(u*3+time),0));
  });
  const kit=installPlasmaRibbons({scene,colors:SPHERE_REFERENCE.colors.map(x=>new Color3(...x.linear)),nodes,count:8,bridgePath:line});
  assert.equal(kit.nodeMeshes.length,6);
  assert.equal(kit.stats().nodeStreams,6);
  assert.equal(kit.nodeMeshes[0].getVerticesData(VertexBuffer.ColorKind).length,73*5*4);
  kit.update({time:2,quality:'balanced',active:8,corePower:1});
  assert.equal(kit.nodeMeshes.filter(x=>x.isEnabled()).length,6);
  kit.update({time:2,quality:'balanced',active:8,corePower:0});
  assert.equal(kit.nodeMeshes.filter(x=>x.isEnabled()).length,0,'zero nucleus still emitting connectors');
  kit.update({time:2,quality:'economy',active:8,corePower:1});
  assert.equal(kit.nodeMeshes.filter(x=>x.isEnabled()).length,3);
  kit.dispose();
 }finally{scene.dispose();engine.dispose();}
});
