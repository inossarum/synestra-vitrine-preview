import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {isFacetMaskActive} from '../src/core-mask-lifecycle.mjs';

const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const ribbons=readFileSync(new URL('../src/plasma-ribbons.js',import.meta.url),'utf8');

test('R202.29 failure-first: powered-off, collapsed, disabled and invalid cores cannot expose the stencil',()=>{
 for(const values of [[0,1,true],[1,0,true],[1,.001,true],[1,1,false],[NaN,1,true],[1,Infinity,true],[1,1,1],['1',1,true]])
  assert.equal(isFacetMaskActive(...values),false,JSON.stringify(values));
 assert.equal(isFacetMaskActive(1,.0011,true),true);
 assert.equal(isFacetMaskActive(1,1.5,true),true);
});

test('R202.29 lifecycle gates original shared 80-facet geometry and all foreground streams',()=>{
 assert.match(main,/core=MeshBuilder.CreateIcoSphere\('central nucleus',\{radius:\.38,subdivisions:2\}/);
 assert.match(main,/coreDepthMask=core\.clone\('central nucleus facet depth mask',core,true\)/);
 assert.match(main,/const depthMaskActive=isFacetMaskActive\(power,r,core\.isEnabled\(\)\)/);
 assert.match(main,/coreDepthMask\.setEnabled\(depthMaskActive\)/);
 assert.match(main,/geometryStep\.update\|\|depthMaskChanged/);
 assert.match(main,/coreVisible:depthMaskActive/);
 assert.match(ribbons,/coreVisible=true/);
 assert.match(ribbons,/front\.setEnabled\(enabled&&coreVisible\)/);
 assert.match(ribbons,/Boolean\(coreVisible\)/);
 assert.match(main,/scene\.setRenderingAutoClearDepthStencil\(3,false\)/);
 assert.doesNotMatch(main,/new DepthRenderer|new RenderTargetTexture/);
});
