import test from 'node:test';
import assert from 'node:assert/strict';
import {NullEngine,Scene,TransformNode,Vector3} from '@babylonjs/core';
import {installR20215Volume} from '../src/plasma-volume-r20215.js';

function fixture(){
 const engine=new NullEngine({renderWidth:128,renderHeight:128});
 const scene=new Scene(engine);
 const root=new TransformNode('ATLAS_CORE_SOCKET_TEST_PARENT',scene);
 const field=installR20215Volume({scene,parent:root});
 const mesh=field.meshes[0];
 return {engine,scene,root,field,mesh,close(){field.dispose();scene.dispose();engine.dispose();}};
}
test('R202-15 real Babylon NullEngine reuses exactly one carrier in existing scene',()=>{
 const f=fixture();
 try {
  assert.equal(f.scene.meshes.length,1);
  assert.equal(f.field.meshes.length,1);
  assert.equal(f.mesh.parent,f.root);
  assert.equal(f.mesh.isEnabled(),false);
  f.field.update({time:0,quality:'balanced',power:1.45,radius:1,cameraPosition:new Vector3(0,0,4.8)});
  assert.equal(f.mesh.isEnabled(),true);
  assert.equal(f.mesh.material.getClassName(),'ShaderMaterial');
 } finally { f.close(); }
});
test('R202-15 real Babylon material receives bounded quality steps',()=>{
 const f=fixture();
 try {
  const seen=[];
  const original=f.mesh.material.setInt.bind(f.mesh.material);
  f.mesh.material.setInt=(name,value)=>{if(name==='uSteps')seen.push(value);return original(name,value);};
  for(const [quality,steps] of [['economy',8],['balanced',12],['auto',12],['ultra',16]]){
   f.field.update({time:2,quality,power:1.45,radius:1,cameraPosition:new Vector3(0,0,4.8)});
   assert.equal(seen.at(-1),steps);
  }
 } finally { f.close(); }
});
test('R202-15 real Babylon world-to-local camera handles socket transform',()=>{
 const f=fixture();
 try {
  f.root.position.set(1.2,-.5,.7);f.root.scaling.set(1.25,.8,1.5);
  const camera=new Vector3(2,1,5);let local;
  const original=f.mesh.material.setVector3.bind(f.mesh.material);
  f.mesh.material.setVector3=(name,value)=>{if(name==='uCameraLocal')local=value.clone();return original(name,value);};
  f.field.update({time:6,quality:'ultra',power:1.45,radius:1.1,cameraPosition:camera});
  assert.ok(local,'local camera uniform missing');
  const expect=Vector3.TransformCoordinates(camera,f.mesh.getWorldMatrix().clone().invert());
  assert.ok(Vector3.Distance(local,expect)<1e-5,'camera uniform diverges from native Babylon inverse transform');
  assert.ok(local.subtract(camera).length()>0.05,'local camera must differ from world space under Atlas transform');
 } finally {f.close();}
});
test('R202-15 real Babylon power-zero disables the only volume, invalid policy fails closed',()=>{
 const f=fixture();
 try {
  f.field.update({time:0,quality:'ultra',power:1.45,radius:1});
  assert.equal(f.mesh.isEnabled(),true);
  f.field.update({time:1,quality:'ultra',power:0,radius:1});
  assert.equal(f.mesh.isEnabled(),false);
  assert.throws(()=>f.field.update({time:1,quality:'unknown',power:1,radius:1}),/INVALID/);
  assert.throws(()=>f.field.update({time:-1,quality:'balanced',power:1,radius:1}),/INVALID/);
 } finally {f.close();}
});
