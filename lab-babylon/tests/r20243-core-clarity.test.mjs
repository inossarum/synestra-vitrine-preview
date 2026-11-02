import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const field=readFileSync(new URL('../src/plasma-field.js',import.meta.url),'utf8');
const volume=readFileSync(new URL('../src/plasma-volume-r20215.js',import.meta.url),'utf8');
const ribbons=readFileSync(new URL('../src/plasma-ribbons.js',import.meta.url),'utf8');
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const smooth=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t);};

test('R202.43 restores core legibility using only existing 80 facet shader',()=>{
  assert.match(field,/float coreFocus=smoothstep\(\.30,\.84,face\)\*smoothstep\(\.18,1\.20,energy\);/);
  assert.match(field,/vec3 facetLift=vec3\(1\.35,1\.42,1\.60\)\*coreFocus\*\(\.30\+\.70\*facetStrata\);/);
  assert.match(field,/float focalOpacity=clamp\(\.22\*coreFocus,0\.0,\.22\);/);
  assert.match(field,/coreEmission\+=facetLift;/);
  assert.match(field,/alpha=clamp\(alpha\+focalOpacity\*energy,0\.0,\.79\);/);
  assert.match(main,/CreateIcoSphere\('central nucleus',\{radius:\.38,subdivisions:2\}/);
  assert.match(main,/coreDepthMask=core\.clone\('central nucleus facet depth mask',core,true\)/);
  const focus=(face,p)=>smooth(.30,.84,face)*smooth(.18,1.20,Math.min(1.6,Math.max(0,p)));
  assert.equal(focus(.8,0),0);
  assert.ok(focus(.8,1.45)>.8);
  assert.equal(focus(.1,2),0);
});

test('R202.43 reveals nucleus through less foreground haze, never increases opacity',()=>{
  assert.match(volume,/float coreAperture=1\.0-\.55\*\(1\.0-smoothstep\(\.18,\.60,sqrt\(coreImpactSquared\)\)\);/);
  assert.match(volume,/da\*=coreAperture;/);
  assert.match(field,/float plasmaWispMask=\.42\+\.58\*smoothstep\(\.20,\.85,density\);/);
  assert.match(field,/alpha\*=plasmaWispMask;/);
  assert.match(volume,/for\(int i=0;i<16;i\+\+\)/);
  const aperture=r=>1-.55*(1-smooth(.18,.60,r));
  assert.ok(Math.abs(aperture(0)-.45)<1e-12);
  assert.ok(Math.abs(aperture(1)-1)<1e-12);
  for(let j=0;j<=100;j++){
    const x=j/100;assert.ok(aperture(x)>=.45-1e-12&&aperture(x)<=1);
    const mask=.42+.58*smooth(.20,.85,x);
    assert.ok(mask>=.42&&mask<=1);
    assert.equal(0*mask*aperture(x),0);
  }
});

test('R202.43 gives all existing ribbon shaders a bounded focused luminous rail',()=>{
  assert.equal((ribbons.match(/float railFocus=exp\(-10\.0\*pow\(vUV\.y-\.5,2\.0\)\);/g)||[]).length,2);
  assert.equal((ribbons.match(/alpha\*=\.68\+\.32\*railFocus;/g)||[]).length,2);
  assert.equal((ribbons.match(/light\*=\.76\+\.74\*railFocus\*crest;/g)||[]).length,2);
  const alpha=y=>.68+.32*Math.exp(-10*(y-.5)**2);
  const luminance=(y,crest)=>.76+.74*Math.exp(-10*(y-.5)**2)*crest;
  assert.ok(alpha(.5)>alpha(0));
  assert.ok(luminance(.5,1)-luminance(0,1)>.60);
  for(let y=0;y<=1;y+=.01){
    assert.ok(alpha(y)>=.68&&alpha(y)<=1.00001);
    assert.ok(luminance(y,1)>=.76&&luminance(y,1)<=1.50);
  }
});

test('R202.43 does not introduce geometry, pass, engine or new external source',()=>{
  assert.match(ribbons,/const RAILS=\[-1,-\.55,0,.55,1\], STEPS=84/);
  assert.match(ribbons,/for\(let i=0;i<6;i\+\+\)/);
  assert.match(ribbons,/shader\.stencil\.func=514/);
  assert.match(volume,/float coreRadiance=1\.48\*clamp\(uCorePower,0\.0,2\.5\)\*coreRayIntegral\*coreTransmission;/);
  assert.doesNotMatch([field,volume,ribbons].join('\n'),/new Engine\(|new Scene\(|fetch\(|new Worker\(/);
});
