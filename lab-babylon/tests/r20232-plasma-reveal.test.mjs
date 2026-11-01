import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const volume=readFileSync(new URL('../src/plasma-volume-r20215.js',import.meta.url),'utf8');
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
test('R202.32 changes the raymarch volume actually instantiated by main',()=>{
 assert.match(main,/installR20215Volume\(\{scene,parent:sphereRoot\}\)/);
 assert.match(volume,/float coreReveal=smoothstep\(\.20,\.56,sqrt\(coreImpactSquared\)\);/);
 assert.match(volume,/float da=clamp\(uOpacity\*localDensity\*thickness\/float\(uSteps\)\*2\.4\*\(\.28\+\.72\*coreReveal\),0\.0,\.16\);/);
 assert.match(volume,/coreForegroundT\*=pow\(max\(0\.000001,1\.0-da\),coreNearFraction\);/);
});
test('R202.32 preserves 16-step volume shader and exact 80-facet masked core',()=>{
 assert.match(volume,/for\(int i=0;i<16;i\+\+\)/);
 assert.match(volume,/if\(i>=uSteps\)break;/);
 assert.match(volume,/material\.setFloat\('uOpacity',profile\.opacity\);/);
 assert.match(main,/CreateIcoSphere\('central nucleus',\{radius:\.38,subdivisions:2\}/);
 assert.match(main,/const coreDepthMask=core\.clone\('central nucleus facet depth mask',core,true\)/);
 assert.doesNotMatch(volume,/new Scene\(/);
 assert.doesNotMatch(volume,/new Engine\(/);
});
test('R202.32 reveal fades smoothly from 28 percent to full baseline opacity',()=>{
 const s=(l,r,x)=>{let t=Math.min(1,Math.max(0,(x-l)/(r-l)));return t*t*(3-2*t)};
 const k=x=>.28+.72*s(.20,.56,x);
 assert.equal(k(0),.28);
 assert.equal(k(1),1);
 assert.ok(k(.22)>k(0)&&k(.22)<k(.40)&&k(.40)<k(.55));
});
