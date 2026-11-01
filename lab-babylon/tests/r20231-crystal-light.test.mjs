import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const shader=readFileSync(new URL('../src/plasma-field.js',import.meta.url),'utf8');
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');

test('R202.31 crystal specular and color separation use existing per-face normals',()=>{
 assert.match(shader,/vec3 facetKey=normalize\(vec3\(-\.42,\.62,\.85\)\);/);
 assert.match(shader,/float facetGlint=pow\(max\(dot\(reflect\(-facetKey,normalize\(vNormal\)\),normalize\(uCamera-vWorld\)\),0\.0\),10\.0\);/);
 assert.match(shader,/float facetStrata=floor\(clamp\(facetLight,0\.0,\.999\)\*4\.0\)\/3\.0;/);
 assert.match(shader,/vec3 facetPalette=mix\(vec3\(\.63,\.58,\.78\),vec3\(1\.65,1\.58,1\.36\),facetStrata\);/);
 assert.match(shader,/\*facetShading\*facetPalette\*\(1\.0\+\.25\*facetGlint\)/); // R202.33 adds emission after this preserved term
});
test('R202.31 preserves inherited shade, mask, topology, alpha and attenuation',()=>{
 assert.match(shader,/float facetShading=mix\(\.72,1\.23,facetRelief\);/);
 assert.match(shader,/float alpha=clamp\(\(.+\)\*energy,0\.0,\.79\);/); // R202.33 checks exact coefficients separately
 assert.match(shader,/float depthTransmission=clamp\(exp\(-\.70\*frontDepth\*veil\),\.63,1\.0\);/);
 assert.match(main,/CreateIcoSphere\('central nucleus',\{radius:\.38,subdivisions:2\}/);
 assert.match(main,/const coreDepthMask=core\.clone\('central nucleus facet depth mask',core,true\)/);
 assert.doesNotMatch(shader,/new Scene\(/);
 assert.doesNotMatch(shader,/new Engine\(/);
});

