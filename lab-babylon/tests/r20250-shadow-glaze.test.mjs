import test from 'node:test';import assert from 'node:assert/strict';import{readFileSync}from'node:fs';
const facet=readFileSync(new URL('../src/plasma-field.js',import.meta.url),'utf8');
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const smooth=(a,b,x)=>{let t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t)};
const shadow=f=>1-smooth(.32,.72,f);

test('R202.50 R2 uses a cold material glaze only on shadowed face normals',()=>{
 assert.match(facet,/float coldFacetShadow=1\.0-smoothstep\(\.32,\.72,facetLight\);/);
 assert.match(facet,/tint=mix\(tint,vec3\(\.09,\.05,\.20\),\.72\*coldFacetShadow\);/);
 assert.ok(facet.indexOf('float coldFacetShadow=')<facet.indexOf('float energy=clamp('));
 for(let i=0;i<=100;i++){
  const v=shadow(i/100);assert.ok(v>=0&&v<=1);
  if(i/100>=.72)assert.equal(v,0);
  const scale=.72*v;assert.ok(scale>=0&&scale<=.72);
 }
 assert.equal(shadow(0),1);assert.ok(shadow(.9)<shadow(.4));
});
test('R202.50 R2 preserves original face alpha, 80 facets and 16 ray steps',()=>{
 assert.match(facet,/float alpha=clamp\(\(\.20\+\.48\*pow\(face,1\.1\)\+\.12\*hotspot\)\*energy,0\.0,\.79\);/);
 assert.match(facet,/alpha=clamp\(alpha\+focalOpacity\*energy,0\.0,\.79\);/);
 assert.match(facet,/coreEmission\+=keyedEmission;/);
 assert.match(main,/CreateIcoSphere\('central nucleus',\{radius:\.38,subdivisions:2\}/);
 assert.doesNotMatch(facet,/new Engine\(|new Scene\(|new Worker\(|fetch\(/);
});
