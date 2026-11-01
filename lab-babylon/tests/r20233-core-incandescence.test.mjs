import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const shader=readFileSync(new URL('../src/plasma-field.js',import.meta.url),'utf8');
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
test('R202.33 bounded frontal white-violet incandescence uses existing nucleus geometry',()=>{
 assert.match(shader,/float ignition=pow\(face,2\.6\)\*smoothstep\(\.20,1\.20,energy\);/);
 assert.match(shader,/vec3 coreEmission=vec3\(1\.15,1\.18,1\.30\)\*\(\.52\*ignition\);/);
 assert.match(shader,/float alpha=clamp\(\(\.20\+\.48\*pow\(face,1\.1\)\+\.12\*hotspot\)\*energy,0\.0,\.79\);/);
 assert.match(shader,/vec4\(\(tint\*\(\.75\+\.35\*hotspot\+\.38\*facetLight\)\*facetShading\*facetPalette\*\(1\.0\+\.25\*facetGlint\)\+coreEmission\)\*shimmer\*energy/);
 assert.match(main,/CreateIcoSphere\('central nucleus',\{radius:\.38,subdivisions:2\}/);
 assert.match(main,/const coreDepthMask=core\.clone\('central nucleus facet depth mask',core,true\)/);
});
test('R202.33 leaves radiance off at zero power and preserves alpha and atmospheric contracts',()=>{
 const smooth=(l,r,x)=>{const t=Math.max(0,Math.min(1,(x-l)/(r-l)));return t*t*(3-2*t);};
 const ignition=(face,power)=>Math.pow(face,2.6)*smooth(.20,1.20,Math.max(0,power));
 const alpha=(face,power)=>Math.min(.79,Math.max(0,(.20+.48*Math.pow(face,1.1)+.12*Math.pow(face,2.25))*Math.max(0,power)));
 assert.equal(ignition(.99,0),0);
 assert.equal(alpha(.99,0),0);
 assert.ok(alpha(1,1.45)<=.79);
 assert.ok(ignition(1,1.45)>ignition(.35,1.45));
 assert.match(shader,/float depthTransmission=clamp\(exp\(-\.70\*frontDepth\*veil\),\.63,1\.0\);/);
 assert.match(shader,/material\.alphaMode=Engine\.ALPHA_COMBINE/);
 assert.doesNotMatch(shader,/new Scene\(|new Engine\(/);
});
