import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const shader=readFileSync(new URL('../src/plasma-field.js',import.meta.url),'utf8');
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');

test('R202.61 local focus uses view-aligned 3D falloff, not a uniform color multiplier',()=>{
 assert.match(shader,/vec3 centerRay=normalize\(-uCamera\);/);
 assert.match(shader,/vec3 facetRay=normalize\(vWorld-uCamera\);/);
 assert.match(shader,/float focusAngle=length\(facetRay-centerRay\);/);
 assert.match(shader,/float focalSpot=exp\(-640\.0\*focusAngle\*focusAngle\);/);
 assert.match(shader,/float focalFacets=pow\(facetRelief,2\.0\);/);
 assert.match(shader,/coreEmission\+=vec3\(4\.3,3\.9,5\.2\)\*focalSpot\*focalFacets\*powerRamp;/);
});
test('R202.61 no new renderer, geometry, shader material, uniform, or layer',()=>{
 assert.equal((main.match(/new Engine\(/g)||[]).length,1);
 assert.equal((main.match(/new Scene\(/g)||[]).length,1);
 assert.match(main,/CreateIcoSphere\('central nucleus',\{radius:\.38,subdivisions:2\}/);
 assert.equal((shader.match(/new ShaderMaterial\(/g)||[]).length,2);
 assert.doesNotMatch(shader,/new PointLight|new GlowLayer|new Scene|new Engine/);
});
test('R202.61 preserves original power-off and face opacity gate',()=>{
 assert.match(shader,/float powerRamp=smoothstep\(\.20,1\.00,energy\);/);
 assert.match(shader,/alpha=clamp\(alpha\+\.075\*finalFacetHighlight\*powerRamp,0\.0,\.79\);/);
 assert.match(shader,/gl_FragColor=vec4\(.*\*energy\*\(\.30\+\.70\*depthTransmission\),alpha\*depthTransmission\);/);
});
