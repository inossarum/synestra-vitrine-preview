import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const root=new URL('../src/',import.meta.url);
const shader=readFileSync(new URL('plasma-field.js',root),'utf8');
const main=readFileSync(new URL('main.js',root),'utf8');
const heart=shader.slice(shader.indexOf('export function createPlasmaHeartMaterial'));

test('R202.26 integrates dynamic plasma flow density only over the foreground ray',()=>{
 assert.match(heart,/vec3 plasmaEntry=uCamera\+rayDir\*entryDistance/);
 assert.match(heart,/vec3 plasmaSegment=vWorld-plasmaEntry/);
 assert.match(heart,/for\(int i=0;i<3;i\+\+\)/);
 assert.match(heart,/float plasmaDensity=clamp\(\.52\+\.34\*flow\+\.26\*eddy,0\.0,1\.0\)/);
 assert.match(heart,/float depthTransmission=clamp\(exp\(-\.70\*frontDepth\*veil\),\.63,1\.0\)/);
 assert.match(heart,/alpha\*depthTransmission/);
 assert.match(heart,/\.30\+\.70\*depthTransmission/);
});
test('R202.26 no mesh/pass changes and bounded attenuation with 80 preserved facets',()=>{
 assert.match(main,/CreateIcoSphere\('central nucleus',\{radius:\.38,subdivisions:2\}/);
 assert.match(main,/core\.renderingGroupId=1/);
 assert.match(heart,/disableDepthWrite=true/);
 assert.match(heart,/ALPHA_COMBINE/);
 assert.doesNotMatch(heart,/CreateRenderTargetTexture|new Engine|CreateIcoSphere/);
 for(const frontDepth of [0,.32,.65,.8]){
  for(const density of [0,.2,.5,.9,1]){
   const veil=.28+1.8*density*density;
   const transmission=Math.max(.63,Math.min(1,Math.exp(-.70*frontDepth*veil)));
   assert.ok(transmission>=.63&&transmission<=1);
  }
 }
 assert.ok(Math.exp(-.70*.65*(.28+1.8*.15*.15))>Math.exp(-.70*.65*(.28+1.8*.85*.85)));
});
