import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const src=readFileSync(new URL('../src/plasma-ribbons.js',import.meta.url),'utf8');
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
test('R202.34 temporal filament erosion affects both ordinary and foreground streams',()=>{
 assert.equal((src.match(/float ionTwist=sin\(vUV\.x\*38\.0-uTime\*1\.8\+1\.1\*sin\(vUV\.x\*11\.0\+vUV\.y\*6\.28-uTime\*\.37\)\);/g)||[]).length,2);
 assert.equal((src.match(/float ionCross=sin\(vUV\.x\*67\.0\+vUV\.y\*9\.0\+uTime\*\.71\);/g)||[]).length,2);
 assert.equal((src.match(/float strandDensity=\.22\+\.78\*smoothstep\(-\.56,\.48,ionTwist\+\.26\*ionCross\);/g)||[]).length,2);
 assert.match(src,/vColor\.a\*\(\.66\+\.34\*crest\)\*shimmer\*uPaletteWeight\*strandDensity,0\.0,1\.0/);
 assert.match(src,/vColor\.a\*\(\.66\+\.34\*crest\)\*shimmer\*uPaletteWeight\*strandDensity,0\.0,\.72/);
});
test('R202.34 preserves 5 rails, 84 steps, 6 streams and existing 80 facets',()=>{
 assert.match(src,/const RAILS=\[-1,-\.55,0,\.55,1\], STEPS=84/);
 assert.match(src,/for\(let i=0;i<6;i\+\+\)/);
 assert.match(src,/foreground\.renderingGroupId=3/);
 assert.match(src,/shader\.stencil\.func=514/);
 assert.match(main,/CreateIcoSphere\('central nucleus',\{radius:\.38,subdivisions:2\}/);
 assert.match(main,/const coreDepthMask=core\.clone\('central nucleus facet depth mask',core,true\)/);
 assert.doesNotMatch(src,/new Scene\(|new Engine\(/);
});
test('R202.34 photon density stays nonnegative and fades through the path',()=>{
 const smooth=(l,r,x)=>{let t=Math.max(0,Math.min(1,(x-l)/(r-l)));return t*t*(3-2*t)};
 const d=x=>.22+.78*smooth(-.56,.48,x);
 assert.ok(d(-2)>=.22-1e-12);
 assert.equal(d(2),1);
 assert.ok(d(-.3)<d(0)&&d(0)<d(.3));
});
