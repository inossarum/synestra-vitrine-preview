import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const shader=readFileSync(new URL('../src/plasma-field.js',import.meta.url),'utf8');
test('R20261 canonical white-violet nucleus shifts lit facets toward violet',()=>{
 assert.match(shader,/vec3 facetPalette=mix\(vec3\(\.78,\.54,1\.26\),vec3\(1\.74,1\.44,2\.30\),facetStrata\);/);
 assert.match(shader,/coreEmission\+=vec3\(1\.25,1\.12,2\.15\)\*finalFacetHighlight\*powerRamp;/);
 assert.match(shader,/float alpha=clamp\(\(\.20\+\.48\*pow\(face,1\.1\)\+\.12\*hotspot\)\*energy,0\.0,\.79\);/);
 assert.match(shader,/alpha=clamp\(alpha\+\.075\*finalFacetHighlight\*powerRamp,0\.0,\.79\);/);
 assert.match(shader,/gl_FragColor=vec4\(.*\*energy\*\(\.30\+\.70\*depthTransmission\),alpha\*depthTransmission\);/);
});
test('R20261 no second scene, light, geometry or renderer is added',()=>{
 const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
 assert.equal((main.match(/new Engine\(/g)||[]).length,1);
 assert.equal((main.match(/new Scene\(/g)||[]).length,1);
 assert.match(main,/CreateIcoSphere\('central nucleus',\{radius:\.38,subdivisions:2\}/);
 assert.doesNotMatch(shader,/new GlowLayer|new PointLight|new Engine|new Scene/);
});
