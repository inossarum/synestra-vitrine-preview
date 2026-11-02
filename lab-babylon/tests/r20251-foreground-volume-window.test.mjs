import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const shader=readFileSync(new URL('../src/plasma-volume-r20215.js',import.meta.url),'utf8');
const smooth=(a,b,x)=>{const v=Math.max(0,Math.min(1,(x-a)/(b-a)));return v*v*(3-2*v);};
const opacityFactor=(r,t)=>{const legacy=1-.55*(1-smooth(.18,.60,r));const focus=1-smooth(.18,.62,r);const front=1-smooth(-.06,.12,t);return legacy*(1-.68*front*focus);};
test('R202.51: only foreground samples of nucleus acquire additional attenuation',()=>{
 assert.ok(opacityFactor(0,-.4)<opacityFactor(0,.4),'front must attenuate more than rear');
 assert.ok(opacityFactor(0,-.4)>0,'volume must remain nonzero');
 assert.ok(Math.abs(opacityFactor(.9,-.4)-1)<1e-12,'peripheral plasma unchanged');
 assert.ok(Math.abs(opacityFactor(0,.4)-.45)<1e-12,'rear retains R202.43 aperture');
});
test('R202.51: GPU raymarch source encodes bounded foreground-only aperture',()=>{
 assert.match(shader,/float coreFrontWindow=1\.0-smoothstep\(-\.06,\.12,t-coreClosestT\);/);
 assert.match(shader,/float coreFocus=1\.0-smoothstep\(\.18,\.62,sqrt\(coreImpactSquared\)\);/);
 assert.match(shader,/da\*=coreAperture\*\(1\.0-\.68\*coreFrontWindow\*coreFocus\);/);
});
test('R202.51: 16 steps, existing volume carrier and no additional engine or mesh',()=>{
 assert.match(shader,/for\(int i=0;i<16;i\+\+\)/);
 assert.match(shader,/MeshBuilder\.CreateSphere\('r20215-volume-carrier'/);
 assert.doesNotMatch(shader,/new Engine\(/);
 assert.doesNotMatch(shader,/for\(int i=0;i<17/);
 assert.match(shader,/if\(!profile\.visible\)return;/);
});
