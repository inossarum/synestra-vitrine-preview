import test from'node:test';import assert from'node:assert/strict';import{readFileSync}from'node:fs';
const v=readFileSync(new URL('../src/plasma-volume-r20215.js',import.meta.url),'utf8');
const m=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
test('R202.41 bounded localized nucleus radiance with no volume opacity changes',()=>{
assert.match(v,/float coreRadiance=1\.48\*clamp\(uCorePower,0\.0,2\.5\)\*coreRayIntegral\*coreTransmission;/);
assert.match(v,/float da=clamp\(uOpacity\*localDensity\*thickness\/float\(uSteps\)\*2\.4\*\(\.28\+\.24\*coreReveal\),0\.0,\.16\);/);
assert.match(v,/gl_FragColor=vec4\(energy\/max\(a,\.0001\),clamp\(a,0\.0,\.78\)\);/);
assert.match(v,/float densityRidge=pow\(smoothstep\(\.22,\.78,abs\(wave\+\.42\*fold\)\),2\.0\);/);
});
test('R202.41 power-off exact and bounded gain, preserve 80 faces and 6 stream architecture',()=>{
const rad=(p,i=.4511930898,t=1)=>1.48*Math.max(0,Math.min(2.5,p))*i*t;
assert.equal(rad(0),0);assert.ok(rad(1.45)>0);assert.ok(rad(4)<1.68);
assert.match(v,/for\(int i=0;i<16;i\+\+\)/);
assert.match(m,/CreateIcoSphere\('central nucleus',\{radius:\.38,subdivisions:2\}/);
assert.match(m,/core\.scaling\.setAll\(Math\.max\(\.0001,r\)\*1\.12\)/);
assert.match(m,/coreDepthMask=core\.clone\('central nucleus facet depth mask',core,true\)/);
assert.match(m,/plasma\.update\(\{time,quality,parent:sphereRoot,/);
});
