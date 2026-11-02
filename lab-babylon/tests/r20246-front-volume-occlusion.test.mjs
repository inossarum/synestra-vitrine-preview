import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const volume=readFileSync(new URL('../src/plasma-volume-r20215.js',import.meta.url),'utf8');
const field=readFileSync(new URL('../src/plasma-field.js',import.meta.url),'utf8');
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const smooth=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t)};
const aperture=r=>1-.55*(1-smooth(.18,.60,r));
const clarity=r=>.36+.64*smooth(.18,.64,r);
const density=(da,r,f)=>da*aperture(r)*((1-f)/Math.max(aperture(r),.001)+f*clarity(r));
test('R202.46 removes only projected foreground opacity, not the rear plasma',()=>{
  assert.match(volume,/float frontClarity=\.36\+\.64\*smoothstep\(\.18,\.64,sqrt\(coreImpactSquared\)\);/);
  assert.match(volume,/da\*=mix\(1\.0\/max\(coreAperture,\.001\),frontClarity,coreNearFraction\);/);
  assert.ok(volume.indexOf('float coreNearFraction=')<volume.indexOf('float frontClarity='));
  assert.ok(volume.indexOf('float frontClarity=')<volume.indexOf('coreForegroundT*='));
  for(const r of [0,.1,.2,.35,.5,.64,1]){
    for(const d of [0,.01,.08,.16]){
      assert.ok(Math.abs(density(d,r,0)-d)<1e-9,'rear unchanged');
      assert.ok(density(d,r,1)>=0&&density(d,r,1)<=d+1e-9,'front bounded reduction');
      assert.equal(density(0,r,1),0,'power-off alpha unchanged');
    }
  }
  assert.ok(density(.16,0,1)<=.03,'significant frontal relief at core center');
});
test('R202.46 preserves R202.43 aperture contract, 16 ray steps and core emission',()=>{
 assert.match(volume,/float coreAperture=1\.0-\.55\*\(1\.0-smoothstep\(\.18,\.60,sqrt\(coreImpactSquared\)\)\);/);
 assert.match(volume,/da\*=coreAperture;/);
 assert.match(volume,/for\(int i=0;i<16;i\+\+\)/);
 assert.match(volume,/float coreRadiance=1\.48\*clamp\(uCorePower,0\.0,2\.5\)\*coreRayIntegral\*coreTransmission;/);
 assert.match(main,/CreateIcoSphere\('central nucleus',\{radius:\.38,subdivisions:2\}/);
 assert.match(main,/coreDepthMask=core\.clone\('central nucleus facet depth mask',core,true\)/);
 assert.match(field,/float facetRelief=smoothstep\(\.20,\.80,facetLight\);/);
 assert.doesNotMatch(volume,/new Engine\(|new Scene\(|new Worker\(|fetch\(/);
});
test('R202.46 visibility experiment: projected core clearing is bounded and spatially local',()=>{
 assert.match(volume,/float coreScreenWindow=1\.0-\.82\*\(1\.0-smoothstep\(\.24,\.60,sqrt\(coreImpactSquared\)\)\);/);
 assert.match(volume,/energy\*=coreScreenWindow;/);
 assert.match(volume,/a\*=coreScreenWindow;/);
 assert.ok(volume.indexOf('energy+=coreRadiance*')<volume.indexOf('float coreScreenWindow='));
 assert.ok(volume.indexOf('a*=coreScreenWindow;')<volume.indexOf('gl_FragColor=vec4(energy/max(a,.0001),clamp(a,0.0,.78));'));
 const projected=r=>1-.82*(1-smooth(.24,.60,r));
 assert.ok(Math.abs(projected(0)-.18)<1e-9);
 assert.equal(projected(.60),1);
 for(let i=0;i<=100;i++){
  const k=projected(i/100);
  assert.ok(k>=.18-1e-9&&k<=1+1e-9);
  assert.equal(0*k,0);
  for(const alpha of [.001,.04,.3,.78]){
   assert.ok(alpha*k>=0&&alpha*k<=alpha+1e-9);
  }
 }
});
test('R202.46 remains finite for all fractional foreground sample lengths',()=>{
 for(let k=0;k<=100;k++){const r=k/100;
  for(let f=0;f<=1;f+=.05){const d=density(.16,r,f);assert.ok(Number.isFinite(d)&&d>=0&&d<=.16+1e-9);}
 }
});
