import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const heart=readFileSync(new URL('../src/plasma-field.js',import.meta.url),'utf8');
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
test('R202.30 bounded per-facet directional relief, no new mesh or pass',()=>{
 assert.match(heart,/float facetRelief=smoothstep\(\.20,\.80,facetLight\);/);
 assert.match(heart,/float facetShading=mix\(\.72,1\.23,facetRelief\);/);
 assert.match(heart,/vec4\(tint\*\(\.75\+\.35\*hotspot\+\.38\*facetLight\)\*facetShading\*/);
 assert.match(main,/CreateIcoSphere\('central nucleus',\{radius:\.38,subdivisions:2\}/);
 assert.match(main,/const coreDepthMask=core\.clone\('central nucleus facet depth mask',core,true\)/);
 assert.match(main,/coreDepthMaterial\.disableColorWrite=true/);
 assert.match(main,/scene\.setRenderingAutoClearDepthStencil\(3,false\)/);
 assert.doesNotMatch(heart,/new Engine\(/);
 assert.doesNotMatch(heart,/new Scene\(/);
});
test('R202.30 preserves the original alpha and atmospheric attenuation guards',()=>{
 assert.match(heart,/float alpha=clamp\(\(\.09\+\.44\*pow\(face,1\.1\)\+\.15\*hotspot\)\*energy,0\.0,\.79\);/);
 assert.match(heart,/depthTransmission=clamp\(exp\(-\.70\*frontDepth\*veil\),\.63,1\.0\)/);
});
