import test from 'node:test';
import assert from 'node:assert/strict';
import {ribbonVertexAlphas} from '../src/plasma-ribbons.js';
import {readFileSync} from 'node:fs';

const alphaAt=(colors,segments,rail,index)=>colors[((rail*(segments+1)+index)*4)+3];

test('R202.61 all 6 node streams emit at core endpoint without leaking at far knot',()=>{
 for(let i=100;i<106;i++){
  const steps=72,colors=ribbonVertexAlphas(i,steps);
  const root=alphaAt(colors,steps,2,0);
  const end=alphaAt(colors,steps,2,steps);
  assert.ok(root>=.38 && root<=.7,'root alpha not legible '+i+': '+root);
  assert.ok(Math.abs(end)<1e-5,'outer alpha must still taper '+i+': '+end);
  assert.ok(Array.from(colors).every(x=>Number.isFinite(x)&&x>=0&&x<=1));
 }
});
test('R202.61 existing 28 outer shell ribbon endpoints remain 0 alpha',()=>{
 for(let i=0;i<28;i++){
  const steps=84,a=ribbonVertexAlphas(i,steps);
  assert.ok(Math.abs(alphaAt(a,steps,2,0))<1e-6);
  assert.ok(Math.abs(alphaAt(a,steps,2,steps))<1e-6);
 }
});
test('R202.61 keeps all six node streams and 28 shell ribbons with no new meshes',()=>{
 const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
 const source=readFileSync(new URL('../src/plasma-ribbons.js',import.meta.url),'utf8');
 assert.match(main,/installPlasmaRibbons\(\{scene,colors:SPHERE_REFERENCE.colors.map/);
 assert.match(main,/count:28,bridgePath:pathBridge/);
 assert.match(source,/for\(let i=0;i<6;i\+\+\)\{/);
 assert.match(source,/foregroundNodeMeshes=nodeMeshes.map/);
 assert.equal((main.match(/new Engine\(/g)||[]).length,1);
 assert.equal((main.match(/new Scene\(/g)||[]).length,1);
});
