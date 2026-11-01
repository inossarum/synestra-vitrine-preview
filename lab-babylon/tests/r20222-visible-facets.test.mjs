import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Engine,MeshBuilder,NullEngine,Scene,VertexBuffer} from '@babylonjs/core';
import {createPlasmaHeartMaterial} from '../src/plasma-field.js';

const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const shader=readFileSync(new URL('../src/plasma-field.js',import.meta.url),'utf8');

test('R202.22 native IcoSphere has exactly 80 flat triangular facets',()=>{
 const engine=new NullEngine(),scene=new Scene(engine);
 try{
  const mesh=MeshBuilder.CreateIcoSphere('central nucleus',{radius:.38,subdivisions:2},scene);
  const triangles=mesh.getIndices();
  const normals=mesh.getVerticesData(VertexBuffer.NormalKind);
  assert.equal(triangles.length/3,80,'literal dozens of triangles');
  assert.equal(mesh.getTotalVertices(),240);
  for(let i=0;i<triangles.length;i+=3){
   const a=normals.slice(3*triangles[i],3*triangles[i]+3);
   const b=normals.slice(3*triangles[i+1],3*triangles[i+1]+3);
   const c=normals.slice(3*triangles[i+2],3*triangles[i+2]+3);
   assert.deepEqual(a,b,'normal must be uniform across each facet');
   assert.deepEqual(a,c,'normal must be uniform across each facet');
  }
  const material=createPlasmaHeartMaterial(scene);mesh.material=material;
  assert.equal(material.alphaMode,Engine.ALPHA_ADD);
  assert.equal(material.metadata.revision,'r20222-visible-80-facets');
  assert.equal(scene.meshes.length,1);
 }finally{scene.dispose();engine.dispose();}
});

test('R202.22 only central mesh is changed; outer raymarch stays unchanged',()=>{
 assert.match(main,/CreateIcoSphere\('central nucleus',\{radius:\.38,subdivisions:2\}/);
 assert.match(shader,/float facetLight=clamp/);
 assert.match(shader,/dot\(normalize\(vNormal\),normalize\(vec3\(-\.42,\.62,\.85\)\)\)/);
 assert.match(shader,/\*facetLight/);
 assert.match(shader,/float energy=clamp\(uPower,0\.0,1\.6\)/);
 assert.match(shader,/material\.alphaMode=Engine\.ALPHA_ADD/);
 assert.match(main,/installR20215Volume\(/);
 assert.doesNotMatch(shader,/new Engine\(|new Scene\(|fetch\(/);
});
