import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const shader=readFileSync(new URL('../src/plasma-field.js',import.meta.url),'utf8');
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const volume=readFileSync(new URL('../src/plasma-volume-r20215.js',import.meta.url),'utf8');
const ribbons=readFileSync(new URL('../src/plasma-ribbons.js',import.meta.url),'utf8');
const smooth=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t)};
test('R202.45 illuminates only key-facing existing facets, keeping shadow relief',()=>{
 assert.match(shader,/float keyedHighlight=smoothstep\(\.55,\.88,facetLight\);/);
 assert.match(shader,/facetShading\*=1\.0\+\.52\*keyedHighlight;/);
 const factor=f=>1+.52*smooth(.55,.88,f);
 assert.equal(factor(.3),1);
 assert.equal(factor(.55),1);
 assert.ok(factor(.8)>1.35);
 assert.equal(factor(.9),1.52);
 for(let f=0;f<=1;f+=.01)assert.ok(factor(f)>=1&&factor(f)<=1.52+1e-9);
});
test('R202.45 preserves R202.44 shadow scaling and R202.33 power/alpha composition',()=>{
 assert.match(shader,/facetShading\*=mix\(\.48,1\.12,facetRelief\);/);
 assert.match(shader,/coreEmission\*=mix\(\.22,1\.12,facetRelief\);/);
 assert.match(shader,/facetLift\*=mix\(\.28,1\.08,facetRelief\);/);
 assert.match(shader,/float alpha=clamp\(\(\.20\+\.48\*pow\(face,1\.1\)\+\.12\*hotspot\)\*energy,0\.0,\.79\);/);
 assert.match(shader,/gl_FragColor=vec4\(\(tint\*/);
 assert.match(shader,/coreEmission\+=facetLift;/);
 assert.match(main,/CreateIcoSphere\('central nucleus',\{radius:\.38,subdivisions:2\}/);
 assert.match(main,/coreDepthMask=core\.clone\('central nucleus facet depth mask',core,true\)/);
 assert.match(volume,/for\(int i=0;i<16;i\+\+\)/);
 assert.match(ribbons,/const RAILS=\[-1,-\.55,0,.55,1\], STEPS=84/);
 assert.doesNotMatch([shader,volume,ribbons].join('\n'),/new Engine\(|new Scene\(|new Worker\(|fetch\(/);
});
test('R202.45 no additional pass or keylight; power zero remains dark',()=>{
 const f=l=>1+.52*smooth(.55,.88,l);
 for(let e of [0,.2,.8,1.6]){
  for(let l of [.1,.3,.5,.7,1]){
   const v=e*f(l);
   assert.equal(v===0,e===0);
   assert.ok(v<=e*1.52+1e-9);
  }
 }
 assert.equal((shader.match(/ShaderMaterial\('r202-white-violet-soft-heart'/g)||[]).length,1);
});
