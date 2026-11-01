import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const root=new URL('../src/',import.meta.url);
const shader=readFileSync(new URL('plasma-field.js',root),'utf8');
const main=readFileSync(new URL('main.js',root),'utf8');
const heart=shader.slice(shader.indexOf('export function createPlasmaHeartMaterial'));

test('R202.25 depth attenuation follows a bounded ray-to-core optical path',()=>{
 assert.match(heart,/float frontDepth=max\(length\(vWorld-uCamera\)-entryDistance,0\.0\)/);
 assert.match(heart,/sqrt\(max\(discriminant,0\.0\)\)/);
 assert.match(heart,/float depthTransmission=clamp\(exp\(-[^;]*,\.63,1\.0\)/);
 assert.match(heart,/alpha\*depthTransmission/);
 assert.match(heart,/uCamera/);
 assert.match(heart,/uTime/);
});
test('R202.25 preserves 80 triangles and historic rendering group',()=>{
 assert.match(main,/CreateIcoSphere\('central nucleus',\{radius:\.38,subdivisions:2\}/);
 assert.match(main,/core\.renderingGroupId=1/);
 assert.match(heart,/material\.alphaMode=Engine\.ALPHA_COMBINE/);
 assert.match(heart,/material\.disableDepthWrite=true/);
 assert.match(heart,/float alpha=clamp\([^;]+,0\.0,\.79\)/);
 assert.doesNotMatch(heart,/createRenderTargetTexture|new Engine|CreateIcoSphere/);
});
test('R202.25 analytic entry length is finite and symmetric under orbit',()=>{
 const front=(camera,world)=>{
  const ray=world.map((v,i)=>v-camera[i]);const dist=Math.hypot(...ray),dir=ray.map(v=>v/dist);
  const proj=camera.reduce((s,v,i)=>s+v*dir[i],0);
  const disc=proj*proj-(camera.reduce((s,v)=>s+v*v,0)-1.05*1.05);
  const entry=Math.max(-proj-Math.sqrt(Math.max(disc,0)),0);
  return Math.max(dist-entry,0);
 };
 const a=front([0,0,4.8],[0,0,.38]),b=front([4.8,0,0],[.38,0,0]);
 assert.ok(Number.isFinite(a)&&a>.55&&a<.75);
 assert.ok(Math.abs(a-b)<1e-8);
 assert.ok(Math.abs(front([0,0,.8],[0,0,.38])-.42)<1e-10);
});