import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const volume=readFileSync(new URL('../src/plasma-volume-r20215.js',import.meta.url),'utf8');
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const field=readFileSync(new URL('../src/plasma-field.js',import.meta.url),'utf8');
const smooth=(l,r,x)=>{const v=Math.max(0,Math.min(1,(x-l)/(r-l)));return v*v*(3-2*v)};
const visibility=r=>1-.24*(1-smooth(.20,.62,r));
const compensation=k=>1+.24*(1-k);
const premultiplied=(fog,alpha,core,r)=>{
 const k=visibility(r),fogCover=alpha*k;
 return {fog:fog*k,core:core*compensation(k),
  alpha:Math.min(.78,Math.max(0,fogCover)),
  premultiplied:fog*k+core*compensation(k)};
};

test('R202.48 explicitly separates scattering from analytic core and preserves final alpha clamp',()=>{
 assert.match(volume,/vec3 fogRadiance=energy;/);
 assert.match(volume,/float fogAlpha=a;/);
 assert.match(volume,/float fogVisibility=1\.0-\.24\*\(1\.0-smoothstep\(\.20,\.62,sqrt\(coreImpactSquared\)\)\);/);
 assert.match(volume,/vec3 fogContribution=fogRadiance\*fogVisibility;/);
 assert.match(volume,/float fogCover=fogAlpha\*fogVisibility;/);
 assert.match(volume,/vec3 independentCore=coreRadiance\*vec3\(1\.65,1\.38,1\.82\)\*\(1\.0\+\.24\*\(1\.0-fogVisibility\)\);/);
 assert.match(volume,/gl_FragColor=vec4\(\(fogContribution\+independentCore\)\/max\(fogCover,\.0001\),clamp\(fogCover,0\.0,\.78\)\);/);
 assert.doesNotMatch(volume,/energy\+=coreRadiance\*vec3\(1\.65,1\.38,1\.82\);/);
 assert.ok(volume.indexOf('float coreRadiance=')<volume.indexOf('vec3 fogRadiance=energy;'));
 assert.ok(volume.indexOf('vec3 independentCore=')<volume.indexOf('gl_FragColor=vec4('));
});

test('R202.48 projected window only reduces fog; analytic core has independent, bounded compensation',()=>{
 for(let j=0;j<=100;j++){
  const radius=j/100,k=visibility(radius);
  assert.ok(k>=.76-1e-10&&k<=1+1e-10);
  const gain=compensation(k);
  assert.ok(gain>=1-1e-10&&gain<=1.0576+1e-10);
  if(radius>=.62){assert.equal(k,1);assert.equal(gain,1);}
  for(const f of [0,.015,.1,.6,1]){
   for(const alpha of [0,.0001,.1,.38,.78]){
    for(const c of [0,.08,.4,1.2]){
     const x=premultiplied(f,alpha,c,radius);
     assert.ok(x.alpha>=0&&x.alpha<=.78+1e-10);
     assert.ok(x.fog<=f+1e-10,'fog never amplified');
     assert.ok(x.core>=c-1e-10,'core radiance is never reduced');
     assert.ok(x.core<=c*1.0576+1e-10,'core compensation capped');
     if(radius>=.62)assert.ok(Math.abs(x.premultiplied-(f+c))<1e-10,'periphery unchanged');
     if(c===0&&f===0)assert.equal(x.premultiplied,0);
    }
   }
  }
 }
});

test('R202.48 leaves historic geometry, depth/stencil, 16-ray budget and output off-state intact',()=>{
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
