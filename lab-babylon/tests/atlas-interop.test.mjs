import test from 'node:test';
import assert from 'node:assert/strict';
import {NullEngine,Scene,TransformNode} from '@babylonjs/core';
import {mountCoreAtAtlasSocket,ATLAS_ID,CORE_SOCKET} from '../src/atlas-interop.js';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';

const src=process.env.SYNESTRA_ATLAS_CONTRACT_SOURCE;
test("Atlas source contract from owner's real unmodified worktree", {skip:src?false:'Atlas owner worktree not mounted'}, async()=>{
 const sha=createHash('sha256').update(readFileSync(src)).digest('hex');
 assert.equal(sha,'d182743dedb9a470a9e7da960e69023eedae45d6a967de37ec74a361ed8b909c');
 const real=await import(pathToFileURL(src).href);
 assert.equal(real.ATLAS_ID,ATLAS_ID);
 assert.equal(real.CORE_SOCKET,CORE_SOCKET);
 assert.equal(real.BABYLON_ENGINE_VERSION,'9.33.0');
 assert.equal(real.validateProfile('balanced'),1);
});
test('Labo mounts only existing sphere root onto Atlas CORE_SOCKET; no replacement engine',()=>{
 const engine=new NullEngine();const scene=new Scene(engine);
 try{
  const coreRoot=new TransformNode('LAB_SPHERE_ROOT',scene);
  const standalone=mountCoreAtAtlasSocket(scene,coreRoot);
  assert.equal(standalone.mode,'standalone');
  assert.equal(coreRoot.parent,null);
  assert.throws(()=>mountCoreAtAtlasSocket(scene,coreRoot,{required:true}),/CORE_SOCKET_MISSING/);
  const socket=new TransformNode(CORE_SOCKET,scene);
  const engineBefore=scene.getEngine();
  const mounted=mountCoreAtAtlasSocket(scene,coreRoot,{required:true});
  assert.equal(mounted.mode,'atlas-socket');
  assert.equal(coreRoot.parent,socket);
  assert.equal(scene.getEngine(),engineBefore);
  mounted.unmount();
  assert.equal(coreRoot.parent,null);
  assert.throws(()=>mountCoreAtAtlasSocket(scene,null),/INVALID_EXISTING_SCENE/);
  assert.throws(()=>mountCoreAtAtlasSocket(scene,socket,{required:true}),/CORE_SOCKET_CYCLE/);
 }finally{scene.dispose();engine.dispose();}
});

test('Native RTX3090 Atlas socket fixture, 4 modes x desktop/mobile, single canvas',()=>{
 const report=JSON.parse(readFileSync(new URL('../evidence/R190_ATLAS_SOCKET_BROWSER.json',import.meta.url),'utf8'));
 assert.equal(report.status,'PASS');
 assert.equal(report.frames.length,8);
 for(const width of [1100,390])for(let mode=0;mode<4;mode++){
  const frame=report.frames.find(x=>x.width===width&&x.mode===mode);
  assert.ok(frame);
  assert.equal(frame.state.atlasSocket,'atlas-socket');
  assert.equal(frame.state.canvas,1);
  assert.equal(frame.state.error,0);
  assert.equal(frame.state.ready,'true');
 }
});
