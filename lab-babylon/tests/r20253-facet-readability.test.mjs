import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {NullEngine, Scene, MeshBuilder} from '@babylonjs/core';

const shader=readFileSync(new URL('../src/plasma-field.js',import.meta.url),'utf8');
const scene=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const smoothstep=(a,b,x)=>{const t=Math.min(1,Math.max(0,(x-a)/(b-a)));return t*t*(3-2*t)};
const faceBoost=(light,relief,power)=>smoothstep(.28,.74,light)*(.45+.55*relief)*smoothstep(.20,1.0,power);

test('R202.53 preserves original 80-facet core geometry and single scene',()=>{
 assert.match(scene,/CreateIcoSphere\('central nucleus',\{radius:\.38,subdivisions:2\}/);
 assert.equal((scene.match(/new Engine\(/g)||[]).length,1);
 assert.equal((scene.match(/new Scene\(/g)||[]).length,1);
 assert.match(shader,/uniform vec3 uCamera;uniform float uTime;uniform float uPower;/);
});
test('R202.53 independent lit-face recovery is exactly keyed to face normal and power',()=>{
 assert.match(shader,/float readableFacet=smoothstep\(\.28,\.74,facetLight\)\*\(\.45\+\.55\*facetRelief\);/);
 assert.match(shader,/float powerRamp=smoothstep\(\.20,1\.00,energy\);/);
 assert.match(shader,/coreEmission\+=vec3\(\.76,\.78,\.90\)\*readableFacet\*powerRamp;/);
 assert.doesNotMatch(shader,/coldFacetShadow|keyedFacetGlow/);
});
test('R202.53 power-off and shadow remain dark, illuminated faces regain visible response',()=>{
 for(const p of [0,.1,.2])for(const l of [0,.3,.5,.65,.8,1])assert.equal(faceBoost(l,smoothstep(.2,.8,l),p),0);
 for(const p of [.8,1,1.45])assert.ok(faceBoost(.62,smoothstep(.2,.8,.62),p)>0.30);
 for(const p of [.8,1,1.45])assert.equal(faceBoost(.20,smoothstep(.2,.8,.20),p),0);
});
test('R202.53 preserves original alpha and depth transparency equations',()=>{
 assert.match(shader,/alpha=clamp\(alpha\+focalOpacity\*energy,0\.0,\.79\);/);
 assert.match(shader,/alpha\*depthTransmission\);/);
 assert.equal((shader.match(/new ShaderMaterial\(/g)||[]).length,2);
});

test('R202.53 actual Babylon triangle count is 80 in the rebuilt engine',()=>{
 const engine=new NullEngine();
 try{
  const scene=new Scene(engine);
  const mesh=MeshBuilder.CreateIcoSphere('facet-probe',{radius:.38,subdivisions:2},scene);
  assert.equal(mesh.getTotalIndices()/3,80);
 }finally{engine.dispose();}
});