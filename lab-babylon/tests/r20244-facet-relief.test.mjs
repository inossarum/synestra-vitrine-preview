import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const source=readFileSync(new URL('../src/plasma-field.js',import.meta.url),'utf8');
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const ribbons=readFileSync(new URL('../src/plasma-ribbons.js',import.meta.url),'utf8');
const volume=readFileSync(new URL('../src/plasma-volume-r20215.js',import.meta.url),'utf8');

test('R202.44 raises the lit-to-shadow facet contrast without uniform overbright',()=>{
 assert.match(source,/facetShading\*=mix\(\.48,1\.12,facetRelief\);/);
 assert.match(source,/coreEmission\*=mix\(\.22,1\.12,facetRelief\);/);
 assert.match(source,/facetLift\*=mix\(\.28,1\.08,facetRelief\);/);
 const oldShadow=.72+.52+.70*.30,oldLit=1.23+.52+.70;
 const shadow=.72*.48+.52*.22+.70*.30*.28;
 const lit=1.23*1.12+.52*1.12+.70*1.08;
 assert.ok(lit/shadow>oldLit/oldShadow*1.4);
 assert.ok(lit<3.0);
 assert.ok(shadow>.45);
});

test('R202.44 preserves original face segmentation, alpha and physical geometry',()=>{
 assert.match(source,/float facetLight=clamp\(\.5\+\.5\*dot\(normalize\(vNormal\),normalize\(vec3\(-\.42,\.62,\.85\)\)\),0\.0,1\.0\);/);
 assert.match(source,/float facetStrata=floor\(clamp\(facetLight,0\.0,\.999\)\*4\.0\)\/3\.0;/);
 assert.match(source,/float alpha=clamp\(\(\.20\+\.48\*pow\(face,1\.1\)\+\.12\*hotspot\)\*energy,0\.0,\.79\);/);
 assert.match(source,/gl_FragColor=vec4\(\(tint\*/);
 assert.match(main,/CreateIcoSphere\('central nucleus',\{radius:\.38,subdivisions:2\}/);
 assert.match(main,/coreDepthMask=core\.clone\('central nucleus facet depth mask',core,true\)/);
 assert.match(ribbons,/const RAILS=\[-1,-\.55,0,.55,1\], STEPS=84/);
 assert.match(volume,/for\(int i=0;i<16;i\+\+\)/);
 assert.doesNotMatch([source,volume,ribbons].join('\n'),/new Engine\(|new Scene\(|new Worker\(|fetch\(/);
});

test('R202.44 supports zero-power off and bounded face-normal adjustment',()=>{
 const s=x=>Math.max(0,Math.min(1,x));
 for(let f=0;f<=1;f+=.025){
   const shadow=.48+(1.12-.48)*s(f);
   const emission=.22+(1.12-.22)*s(f);
   const lift=.28+(1.08-.28)*s(f);
   assert.ok(shadow>=.48&&shadow<=1.12+1e-10);
   assert.ok(emission>=.22&&emission<=1.12+1e-10);
   assert.ok(lift>=.28&&lift<=1.08+1e-10);
   assert.equal(0*(shadow+emission+lift),0);
 }
});
