import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const facet=readFileSync(new URL('../src/plasma-field.js',import.meta.url),'utf8');
const volume=readFileSync(new URL('../src/plasma-volume-r20215.js',import.meta.url),'utf8');
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const smooth=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t)};
const glow=(light,rim,power)=>Math.pow(smooth(.56,.88,light),1.8)*smooth(.40,1.25,power)*(1-.30*rim);

test('R202.50 emission follows directional facet normals and remains distinct from the rim',()=>{
 assert.match(facet,/float keyedFacetGlow=pow\(smoothstep\(\.56,\.88,facetLight\),1\.8\);/);
 assert.match(facet,/float keyedIncandescence=keyedFacetGlow\*smoothstep\(\.40,1\.25,energy\)\*\(1\.0-\.30\*facetRim\);/);
 assert.match(facet,/vec3 keyedEmission=vec3\(1\.55,1\.44,1\.68\)\*keyedIncandescence;/);
 assert.match(facet,/coreEmission\+=keyedEmission;/);
 assert.ok(facet.indexOf('float keyedFacetGlow=')<facet.indexOf('coreEmission+=keyedEmission;'));
 assert.ok(facet.indexOf('coreEmission+=keyedEmission;')<facet.indexOf('alpha=clamp(alpha+focalOpacity*energy'));
 for(let i=0;i<=100;i++)for(const j of [0,.25,.5,1])for(const p of [0,.25,1,1.45,1.6]){
  const g=glow(i/100,j,p);assert.ok(g>=0&&g<=1+1e-10);
  if(p===0||i/100<=.56)assert.equal(g,0);
 }
 assert.ok(glow(.98,0,1.45)>glow(.65,0,1.45)*5,'high-key faces remain much brighter');
 assert.ok(glow(.98,0,1.45)>glow(.98,1,1.45),'rim stays subdued');
});
test('R202.50 preserves R202.44 faceted alpha, geometry, depth/stencil and 16-ray plasma',()=>{
 assert.match(facet,/float alpha=clamp\(\(\.20\+\.48\*pow\(face,1\.1\)\+\.12\*hotspot\)\*energy,0\.0,\.79\);/);
 assert.match(facet,/alpha=clamp\(alpha\+focalOpacity\*energy,0\.0,\.79\);/);
 assert.match(facet,/facetShading\*=mix\(\.48,1\.12,facetRelief\);/);
 assert.match(facet,/coreEmission\*=mix\(\.22,1\.12,facetRelief\);/);
 assert.match(facet,/facetLift\*=mix\(\.28,1\.08,facetRelief\);/);
 assert.match(main,/CreateIcoSphere\('central nucleus',\{radius:\.38,subdivisions:2\}/);
 assert.match(main,/coreDepthMask=core\.clone\('central nucleus facet depth mask',core,true\)/);
 assert.match(volume,/for\(int i=0;i<16;i\+\+\)/);
 assert.match(volume,/gl_FragColor=vec4\(energy\/max\(a,\.0001\),clamp\(a,0\.0,\.78\)\);/);
 assert.doesNotMatch(facet,/new Engine\(|new Scene\(|new Worker\(|fetch\(/);
});
test('R202.50 upper emission is bounded and zero at power-off',()=>{
 for(let p=0;p<=1.6;p+=.05){
  for(let light=0;light<=1;light+=.025){
   const g=glow(light,1,p);
   assert.ok(Number.isFinite(g)&&g>=0&&g<=.7+1e-9);
   if(p<.4||light<.56)assert.equal(g,0);
  }
 }
});
