import test from 'node:test';import assert from 'node:assert/strict';import{readFileSync}from'node:fs';
const v=readFileSync(new URL('../src/plasma-volume-r20215.js',import.meta.url),'utf8'),m=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
test('R20237 active raymarch organic ridge sculpt',()=>{
assert.match(m,/installR20215Volume\(\{scene,parent:sphereRoot\}\)/);
assert.match(v,/float densityRidge=pow\(smoothstep\(\.22,\.78,abs\(wave\+\.42\*fold\)\),2\.0\);/);
assert.match(v,/float smoke=pow\(smoothstep\(\.31,\.82,n\),2\.4\);/);
assert.match(v,/float localDensity=\(\.065\+1\.35\*smoke\+1\.18\*sparkle\)\*envelope\*\(\.50\+\.50\*densityRidge\);/);
});
test('R20237 preserve bounded core 16 steps and 80 facets',()=>{
assert.match(v,/for\(int i=0;i<16;i\+\+\)/);assert.match(v,/if\(i>=uSteps\)break;/);
assert.match(v,/float coreReveal=smoothstep\(\.20,\.56,sqrt\(coreImpactSquared\)\);/);
assert.match(v,/clamp\(a,0\.0,\.78\)/);assert.match(v,/coreRadiance\*vec3\(1\.65,1\.38,1\.82\)/);
assert.match(m,/CreateIcoSphere\('central nucleus',\{radius:\.38,subdivisions:2\}/);
assert.match(m,/coreDepthMask=core\.clone\('central nucleus facet depth mask',core,true\)/);
assert.doesNotMatch(v,/new Engine\(|new Scene\(/);
});
test('R20237 finite bounded density and reduced uniform floor',()=>{
const smooth=(l,r,x)=>{const t=Math.min(1,Math.max(0,(x-l)/(r-l)));return t*t*(3-2*t)};
const before=n=>.11+1.48*Math.pow(smooth(.25,.78,n),2.1)+1.26*Math.pow(smooth(.64,.95,n),4.5);
const after=(n,w,f)=>(.065+1.35*Math.pow(smooth(.31,.82,n),2.4)+1.18*Math.pow(smooth(.64,.95,n),4.5))*(.50+.50*Math.pow(smooth(.22,.78,Math.abs(w+.42*f)),2));
assert.ok(after(.1,0,0)<before(.1));
for(const n of [0,.25,.6,.9,1])for(const w of [-1,0,1])for(const f of [-1,0,1]){let a=after(n,w,f);assert.ok(Number.isFinite(a)&&a>=0&&a<=2.595)}
assert.ok(after(.8,1,1)>after(.8,0,0));
});
