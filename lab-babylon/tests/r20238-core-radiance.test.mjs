import test from 'node:test';import assert from 'node:assert/strict';import{readFileSync}from'node:fs';
const v=readFileSync(new URL('../src/plasma-volume-r20215.js',import.meta.url),'utf8');
const m=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
test('R202.38 targeted crystalline emission rises without restoring violet haze',()=>{
 assert.match(v,/float coreRadiance=1\.48\*clamp\(uCorePower,0\.0,2\.5\)\*coreRayIntegral\*coreTransmission;/);
 assert.match(v,/float densityRidge=pow\(smoothstep\(\.22,\.78,abs\(wave\+\.42\*fold\)\),2\.0\);/);
 assert.match(v,/float localDensity=\(\.065\+1\.35\*smoke\+1\.18\*sparkle\)\*envelope\*\(\.50\+\.50\*densityRidge\);/);
 assert.doesNotMatch(v,/float coreRadiance=0\.55\*/);
});
test('R202.38 emission remains bounded, power-off exact, core 80 facets, one engine',()=>{
 const gauss=.4511930898;
 const core=(power,integral,transmission)=>1.48*Math.max(0,Math.min(2.5,power))*integral*transmission;
 assert.equal(core(0,gauss,1),0);
 assert.ok(core(1.45,gauss,1)>0);
 assert.ok(core(4,gauss,1)<1.68);
 assert.match(v,/float coreRayIntegral=0\.4511930898\*exp/);
 assert.match(v,/float coreTransmission=mix\(coreSmoothT,coreForegroundT,0\.25\);/);
 assert.match(v,/for\(int i=0;i<16;i\+\+\)/);
 assert.match(v,/float combinedCover=clamp\(1\.0-\(1\.0-fogCover\)\*\(1\.0-coreGlowAlpha\),0\.0,\.78\);/);
 assert.match(m,/CreateIcoSphere\('central nucleus',\{radius:\.38,subdivisions:2\}/);
 assert.match(m,/coreDepthMask=core\.clone\('central nucleus facet depth mask',core,true\)/);
 assert.doesNotMatch(v,/new Engine\(|new Scene\(/);
});
