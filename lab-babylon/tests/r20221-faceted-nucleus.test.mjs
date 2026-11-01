import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Engine,NullEngine,Scene,MeshBuilder,Vector3} from '@babylonjs/core';
import {createPlasmaHeartMaterial} from '../src/plasma-field.js';
const heart=readFileSync(new URL('../src/plasma-field.js',import.meta.url),'utf8');
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
test('R202.21 actual Babylon material addresses central faceted nucleus only',()=>{
 const engine=new NullEngine({renderWidth:128,renderHeight:128}),scene=new Scene(engine);
 try{
  const material=createPlasmaHeartMaterial(scene);
  const sphere=MeshBuilder.CreateIcoSphere('central nucleus',{radius:.38,subdivisions:2},scene);
  sphere.material=material;
  assert.equal(material.getClassName(),'ShaderMaterial');
  assert.deepEqual(material.metadata,{revision:'r20223-foreground-facets',target:'central nucleus',scope:'desktop'});
  assert.equal(sphere.material,material);
  assert.equal(scene.meshes.length,1);
  assert.equal(material.disableDepthWrite,true);
  assert.equal(material.alphaMode,Engine.ALPHA_COMBINE,'R202.23 foreground nucleus requires bounded compositing');
  material.setFloat('uTime',6);material.setFloat('uPower',0);
  material.setVector3('uCamera',new Vector3(0,0,4.8));
 } finally {scene.dispose();engine.dispose();}
});
test('R202.21 shader increases central faceted emission with bounded alpha and power-off',()=>{
 assert.match(heart,/float hotspot=pow\(face,2\.25\)/);
 assert.match(heart,/float alpha=clamp\(\(\.07\+\.54\*pow\(face,1\.1\)\+\.24\*hotspot\)\*energy,0\.0,\.94\)/);
 assert.match(heart,/float energy=clamp\(uPower,0\.0,1\.6\)/);
 assert.match(heart,/R202\.21: illuminate the existing faceted central IcoSphere/);
 assert.match(main,/CreateIcoSphere\('central nucleus',\{radius:\.38,subdivisions:2\}/);
 assert.match(main,/coreMat=createPlasmaHeartMaterial\(scene\)/);
});
