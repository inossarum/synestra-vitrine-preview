import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Engine, MeshBuilder, NullEngine, Scene} from '@babylonjs/core';
import {createPlasmaHeartMaterial} from '../src/plasma-field.js';
const source=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
test('R202.23 core uses a distinct late rendering group without second engine',()=>{
 assert.match(source,/CreateIcoSphere\('central nucleus',\{radius:\.38,subdivisions:2\}/);
 assert.match(source,/core\.renderingGroupId=1/);
 assert.doesNotMatch(source,/halo\.renderingGroupId\s*=/);
 assert.doesNotMatch(source,/plasma\.meshes\.forEach\(.*renderingGroupId/);
 const e=new NullEngine(),s=new Scene(e);
 try{const c=MeshBuilder.CreateIcoSphere('central nucleus',{radius:.38,subdivisions:2},s);
 c.material=createPlasmaHeartMaterial(s);c.renderingGroupId=1;
 const stream=MeshBuilder.CreateSphere('plasma background',{diameter:1},s);
 assert.equal(c.renderingGroupId,1);
 assert.equal(stream.renderingGroupId,0);
 assert.equal(c.getTotalIndices()/3,80);
 assert.equal(c.material.alphaMode,Engine.ALPHA_COMBINE);
 assert.equal(s.meshes.length,2);
 }finally{s.dispose();e.dispose()}
});
