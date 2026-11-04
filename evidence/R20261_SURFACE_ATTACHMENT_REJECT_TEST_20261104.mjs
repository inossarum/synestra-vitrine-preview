import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {sampleCoreShellFlow} from '../src/core-shell-flow.mjs';
import {surfaceAttachNodePath,CORE_SURFACE_ATTACHMENT_RADIUS} from '../src/node-surface-attachment.mjs';
const D=[[-.54,.71,.46],[.70,.58,.38],[-.73,-.32,.47],[.70,-.55,.29],[-.02,-.92,.40],[.32,.89,-.38]];
const norm=x=>Math.hypot(...x);
test('R20261 six main streams attach just outside faceted nucleus with 73 points',()=>{
 assert.equal(CORE_SURFACE_ATTACHMENT_RADIUS,.405);
 for(const time of [0,.3,1,4,18])for(let i=0;i<6;i++){
  const input=sampleCoreShellFlow(i,time,D);
  const rawCopy=input.map(p=>p.slice());
  const output=surfaceAttachNodePath(input);
  assert.equal(output.length,73);
  assert.ok(norm(output[0])>=.405-1e-7,JSON.stringify({time,i,start:output[0]}));
  assert.ok(norm(output[0])<=.405+1e-7);
  assert.ok(output.every(p=>p.length===3&&p.every(Number.isFinite)&&norm(p)>=.405-1e-7));
  assert.deepEqual(output.at(-1),input.at(-1));
  assert.deepEqual(input,rawCopy,'must not mutate original path');
  assert.ok(norm(input[0])<.10);
 }
});
test('R20261 invalid or unsatisfied attachment fails closed',()=>{
 const path=sampleCoreShellFlow(0,0,D);
 assert.throws(()=>surfaceAttachNodePath(path,NaN),/ATTACHMENT_INVALID/);
 assert.throws(()=>surfaceAttachNodePath(path,-1),/ATTACHMENT_INVALID/);
 assert.throws(()=>surfaceAttachNodePath(path,4),/ATTACHMENT_NO_CROSSING|ATTACHMENT_INVALID/);
 assert.throws(()=>surfaceAttachNodePath([[0,0,0]]),/ATTACHMENT_INVALID/);
 assert.throws(()=>surfaceAttachNodePath([...[...path.slice(0,-1)], [NaN,0,0]]),/ATTACHMENT_INVALID/);
});
test('R20261 only six main node meshes change, six stenciled clones keep original paths',()=>{
 const source=readFileSync(new URL('../src/plasma-ribbons.js',import.meta.url),'utf8');
 assert.match(source,/surfaceAttachNodePath/);
 assert.match(source,/const originalNodePath=bridgePath\(i,time\)/);
 assert.match(source,/const samePaths=organicPlasmaRibbonPaths\(attachedNodePath,i\+100,time\)/);
 assert.match(source,/pathArray:samePaths,instance:front/);
 assert.match(source,/pathArray:samePaths,instance:mesh/);
 assert.match(source,/for\(let i=0;i<6;i\+\+\)/);
 assert.match(source,/count=28/);
 assert.match(source,/foreground\.renderingGroupId=3/);
 assert.match(source,/shader\.stencil\.func=514/);
});
