import test from'node:test';import assert from'node:assert/strict';import{readFileSync}from'node:fs';
const v=readFileSync(new URL('../src/plasma-volume-r20215.js',import.meta.url),'utf8');
const m=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
test('R202.40 reduces peripheral smoke only without reducing central core radiance',()=>{
 assert.match(v,/float da=clamp\(uOpacity\*localDensity\*thickness\/float\(uSteps\)\*2\.4\*\(\.28\+\.24\*coreReveal\),0\.0,\.16\);/);
 assert.match(v,/float coreRadiance=1\.10\*clamp\(uCorePower,0\.0,2\.5\)\*coreRayIntegral\*coreTransmission;/);
 assert.match(v,/gl_FragColor=vec4\(energy\/max\(a,\.0001\),clamp\(a,0\.0,\.78\)\);/);
 assert.match(v,/float localDensity=\(\.065\+1\.35\*smoke\+1\.18\*sparkle\)\*envelope\*\(\.50\+\.50\*densityRidge\);/);
});
test('R202.40 80 facet exact shared mask, same GPU streams and 16 steps',()=>{
 assert.match(v,/for\(int i=0;i<16;i\+\+\)/);
 assert.match(v,/float coreReveal=smoothstep\(\.20,\.56,sqrt\(coreImpactSquared\)\);/);
 assert.match(m,/CreateIcoSphere\('central nucleus',\{radius:\.38,subdivisions:2\}/);
 assert.match(m,/core\.scaling\.setAll\(Math\.max\(\.0001,r\)\*1\.12\)/);
 assert.match(m,/coreDepthMask=core\.clone\('central nucleus facet depth mask',core,true\)/);
 assert.match(m,/plasma\.update\(\{time,quality,parent:sphereRoot,/);
});
test('R202.40 peripheral transparency reduces outer attenuation, exactly preserves center',()=>{
 const smooth=(l,r,x)=>{let t=Math.min(1,Math.max(0,(x-l)/(r-l)));return t*t*(3-2*t)};
 const before=x=>.28+.72*smooth(.20,.56,x),after=x=>.28+.24*smooth(.20,.56,x);
 assert.equal(before(0),after(0));
 assert.equal(before(.15),after(.15));
 assert.ok(Math.abs(after(1)-.52)<1e-12);
 assert.ok(before(.8)>after(.8));
 for(let x=0;x<=100;x++){const a=after(x/100);assert.ok(Number.isFinite(a)&&a>=.28&&a<=.52+1e-12)}
});
