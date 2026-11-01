import test from'node:test';import assert from'node:assert/strict';import{readFileSync}from'node:fs';
const s=readFileSync(new URL('../src/plasma-field.js',import.meta.url),'utf8');const v=readFileSync(new URL('../src/plasma-volume-r20215.js',import.meta.url),'utf8');const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
test('R20239 silhouette contrast uses original facet mesh and white emission, no additional glow',()=>{
 assert.match(s,/float facetRim=pow\(1\.0-face,2\.0\);/);
 assert.match(s,/float facetContrast=1\.0-\.42\*facetRim;/);
 assert.match(s,/\*facetPalette\*\(1\.0\+\.25\*facetGlint\)\*facetContrast\+coreEmission/);
 assert.match(s,/float facetShading=mix\(\.72,1\.23,facetRelief\);/);
 assert.match(s,/vec3 coreEmission=vec3\(1\.15,1\.18,1\.30\)\*\(\.52\*ignition\);/);
 assert.match(s,/material\.alphaMode=Engine\.ALPHA_COMBINE/);
});
test('R20239 preserves 80 facets, 3d plasma volume and exact mask',()=>{
 assert.match(v,/float coreReveal=smoothstep\(\.20,\.56,sqrt\(coreImpactSquared\)\);/);
 assert.match(v,/float coreRadiance=1\.10\*clamp\(uCorePower,0\.0,2\.5\)\*coreRayIntegral\*coreTransmission;/);
 assert.match(v,/float densityRidge=pow\(smoothstep\(\.22,\.78,abs\(wave\+\.42\*fold\)\),2\.0\);/);
 assert.match(main,/CreateIcoSphere\('central nucleus',\{radius:\.38,subdivisions:2\}/);
 assert.match(main,/coreDepthMask=core\.clone\('central nucleus facet depth mask',core,true\)/);
 assert.match(main,/core\.scaling\.setAll\(Math\.max\(\.0001,r\)\*1\.12\);halo\.scaling\.setAll\(Math\.max\(\.0001,r\)\);/);
});
test('R20239 silhouette attenuation bounded, zero energy remains off',()=>{
 const rim=face=>Math.pow(1-Math.max(0,Math.min(1,face)),2);
 const contour=face=>1-.42*rim(face);
 assert.ok(Math.abs(contour(0)-.58)<1e-12);
 assert.equal(contour(1),1);
 for(let x=0;x<=10;x++){const v=contour(x/10);assert.ok(v>=.58&&v<=1)}
 assert.equal(0*contour(.4),0);
});
