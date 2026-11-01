import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const src=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
test('R202.36 hides 18 legacy opaque radial tubes but preserves diffuse mist',()=>{
 assert.match(src,/for\(let i=0;i<18;i\+\+\)\{/);
 assert.match(src,/inner\.push\(wire\('radial plasma tendril '/);
 assert.match(src,/innerSheaths\.push\(wire\('core plasma diffusion '/);
 assert.match(src,/const mist=innerSheaths\[i\],mistVisible=visible&&i<mistBudget;/);
 assert.match(src,/m\.setEnabled\(false\);mist\.setEnabled\(mistVisible\);/);
 assert.match(src,/if\(mistVisible\)\{/);
 assert.match(src,/refresh\(mist,path,coreMistWidth\(i,\.5,quality\)\*1\.65\)/);
});
test('R202.36 preserves central 80-facet depth mask, GPU ribbons and zero-power gate',()=>{
 assert.match(src,/CreateIcoSphere\('central nucleus',\{radius:\.38,subdivisions:2\}/);
 assert.match(src,/const coreDepthMask=core\.clone\('central nucleus facet depth mask',core,true\)/);
 assert.match(src,/plasma\.update\(\{time,quality,parent:sphereRoot,/);
 assert.match(src,/const m=inner\[i\],visible=power>0&&\(mode!==0\|\|i<16\);/);
 assert.match(src,/const mistBudget=visibleCoreMistCount\(quality,power\);/);
 assert.match(src,/m\.setEnabled\(false\);energyNodes\[i\]\.setEnabled\(visible\);/);
});
