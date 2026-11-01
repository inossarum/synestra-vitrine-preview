import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Engine,MeshBuilder,NullEngine,Scene} from '@babylonjs/core';
import {createPlasmaHeartMaterial} from '../src/plasma-field.js';

const shader=readFileSync(new URL('../src/plasma-field.js',import.meta.url),'utf8');
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');

test('R202.24 translucent faceted heart uses a bounded depth-friendly alpha',()=>{
  const heart=shader.slice(shader.indexOf('export function createPlasmaHeartMaterial'));
  assert.ok(heart.startsWith('export function'), 'heart material function must exist');
  const m=heart.match(/float alpha=clamp\([^;]*,0\.0,([.\d]+)\);/);
  assert.ok(m,'alpha cap must be explicit in heart shader');
  const alphaCap=Number(m[1]);
  assert.ok(alphaCap>=.72&&alphaCap<=.82,'facet core must stay visible but not opaque');
  assert.doesNotMatch(heart,/vec3\(1\.02,\.94,1\.10\)/,
    'excess-white additive nucleus may not hide ribbons');
  assert.match(shader,/material\.alphaMode=Engine\.ALPHA_COMBINE/);
  assert.match(shader,/material\.disableDepthWrite=true/);
  assert.match(shader,/float facetLight=clamp/);
});
test('R202.24 preserves existing 80-facet geometry and single-scene layering',()=>{
  assert.match(main,/CreateIcoSphere\('central nucleus',\{radius:\.38,subdivisions:2\}/);
  assert.match(main,/core\.renderingGroupId=1/);
  const engine=new NullEngine(),scene=new Scene(engine);
  try{
    const core=MeshBuilder.CreateIcoSphere('central nucleus',{radius:.38,subdivisions:2},scene);
    const mat=createPlasmaHeartMaterial(scene);core.material=mat;
    assert.equal(core.getTotalIndices()/3,80);
    assert.equal(core.getTotalVertices(),240);
    assert.equal(mat.alphaMode,Engine.ALPHA_COMBINE);
    assert.equal(mat.disableDepthWrite,true);
    assert.equal(scene.meshes.length,1);
  }finally{scene.dispose();engine.dispose();}
});
