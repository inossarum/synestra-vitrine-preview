import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const volume=readFileSync(new URL('../src/plasma-volume-r20215.js',import.meta.url),'utf8');
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const field=readFileSync(new URL('../src/plasma-field.js',import.meta.url),'utf8');
const smooth=(l,r,x)=>{const v=Math.max(0,Math.min(1,(x-l)/(r-l)));return v*v*(3-2*v)};
const visibility=r=>1-.04*(1-smooth(.20,.62,r));
const compose=(fogAlpha,coreRadiance,r)=>{
 const k=visibility(r),fogCover=fogAlpha*k;
 const glow=Math.max(0,Math.min(.38,coreRadiance*.24));
 return {fogCover,glow,alpha:Math.max(0,Math.min(.78,1-(1-fogCover)*(1-glow)))};
};

test('R202.48 has independently blended analytic emission with bounded core opacity',()=>{
 assert.match(volume,/float fogVisibility=1\.0-\.04\*\(1\.0-smoothstep\(\.20,\.62,sqrt\(coreImpactSquared\)\)\);/);
 assert.match(volume,/float fogCover=a\*fogVisibility;/);
 assert.match(volume,/float coreGlowAlpha=clamp\(coreRadiance\*\.24,0\.0,\.38\);/);
 assert.match(volume,/float combinedCover=clamp\(1\.0-\(1\.0-fogCover\)\*\(1\.0-coreGlowAlpha\),0\.0,\.78\);/);
 assert.match(volume,/vec3 composedEnergy=energy\*fogVisibility\+coreRadiance\*vec3\(1\.65,1\.38,1\.82\);/);
 assert.match(volume,/gl_FragColor=vec4\(composedEnergy\/max\(combinedCover,\.0001\),combinedCover\);/);
 assert.doesNotMatch(volume,/energy\+=coreRadiance\*vec3\(1\.65,1\.38,1\.82\);/);
 assert.ok(volume.indexOf('float coreRadiance=')<volume.indexOf('float coreGlowAlpha='));
 assert.ok(volume.indexOf('float coreGlowAlpha=')<volume.indexOf('gl_FragColor=vec4(composedEnergy'));
});

test('R202.48 light keeps its own alpha independent of fog and remains under historical clamp',()=>{
 for(let j=0;j<=100;j++){
  const r=j/100,vis=visibility(r);
  assert.ok(vis>=.96-1e-10&&vis<=1+1e-10);
  if(r>=.62)assert.equal(vis,1);
  for(const f of [0,.015,.1,.6,.78,1]){
   for(const core of [0,.002,.08,.4,1.2,3]){
    const c=compose(f,core,r);
    assert.ok(c.fogCover<=f+1e-10&&c.fogCover>=0);
    assert.ok(c.glow>=0&&c.glow<=.38);
    assert.ok(c.alpha>=0&&c.alpha<=.78+1e-10);
    assert.ok(c.alpha+1e-10>=Math.min(.78,c.fogCover),'no fog opacity loss from glow');
    if(f===0&&core===0)assert.equal(c.alpha,0);
    if(core===0)assert.ok(Math.abs(c.alpha-Math.min(.78,f*vis))<1e-10);
   }
  }
 }
});

test('R202.48 fixes underestimated analytic energy without changing bounded alpha coverage',()=>{
 assert.match(volume,/vec3 composedEnergy=energy\*fogVisibility\+coreRadiance\*vec3\(1\.65,1\.38,1\.82\);/);
 assert.match(volume,/float coreGlowAlpha=clamp\(coreRadiance\*\.24,0\.0,\.38\);/);
 // Historical R202.44 analytic emission is preserved. The glow factor only
 // controls coverage, not radiant energy; fog attenuation is local and bounded.
 for(const core of [0,.001,.1,.6,1.3]){
  for(const fog of [0,.1,.4,.9]){
   const factor=visibility(0);
   const baseline=fog+core;
   const changed=fog*factor+core;
   assert.ok(changed>=baseline-fog*.04-1e-10);
   assert.equal(changed-(fog*factor),core);
  }
 }
});
test('R202.48 preserves 80 facets, old alpha and depth contract, 16-step raymarch, single engine',()=>{
 assert.match(volume,/for\(int i=0;i<16;i\+\+\)/);
 assert.match(volume,/float coreRadiance=1\.48\*clamp\(uCorePower,0\.0,2\.5\)\*coreRayIntegral\*coreTransmission;/);
 assert.match(volume,/material\.alphaMode=Engine\.ALPHA_COMBINE;/);
 assert.match(volume,/material\.disableDepthWrite=true;/);
 assert.match(main,/CreateIcoSphere\('central nucleus',\{radius:\.38,subdivisions:2\}/);
 assert.match(main,/coreDepthMask=core\.clone\('central nucleus facet depth mask',core,true\)/);
 assert.match(field,/float alpha=clamp\(\(\.20\+\.48\*pow\(face,1\.1\)\+\.12\*hotspot\)\*energy,0\.0,\.79\);/);
 assert.doesNotMatch(volume,/new Engine\(|new Scene\(|new Worker\(|fetch\(/);
 assert.doesNotMatch(volume,/renderingGroupId=3|forceDepthWrite=true/);
});
