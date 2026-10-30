import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {sampleCoreShellFlow,coreShellVeilRadius,visibleCoreShellVeils,FLOW_NODE_COUNT,FLOW_SEED_RADIUS,FLOW_SHELL_RADIUS} from '../src/core-shell-flow.mjs';
const source=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const nodes=[[-.54,.71,.46],[.70,.58,.38],[-.73,-.32,.47],[.70,-.55,.29],[-.02,-.92,.40],[.32,.89,-.38]];
const norm=p=>Math.hypot(...p);
test('R201 six continuous nucleus-to-shell flows: exact endpoints, bounded depth and no loops',()=>{
 assert.equal(FLOW_NODE_COUNT,6);
 for(let i=0;i<6;i++){
  const p=sampleCoreShellFlow(i,4.5,nodes);
  assert.equal(p.length,73);
  assert.ok(p.every(x=>x.every(Number.isFinite)&&norm(x)<1.60));
  assert.ok(Math.abs(norm(p[0])-FLOW_SEED_RADIUS)<1e-10);
  assert.ok(Math.abs(norm(p.at(-1))-FLOW_SHELL_RADIUS)<1e-10);
  assert.ok(p.slice(1).every((x,j)=>Math.hypot(...x.map((n,k)=>n-p[j][k]))<.12));
  assert.deepEqual(p,sampleCoreShellFlow(i,4.5,nodes));
 }
});
test('Fail closed on nonfinite direction, invalid index, NaN time and unbounded resolution',()=>{
 assert.throws(()=>sampleCoreShellFlow(6,0,nodes),/INVALID_ARGUMENT/);
 assert.throws(()=>sampleCoreShellFlow(-1,0,nodes),/INVALID_ARGUMENT/);
 assert.throws(()=>sampleCoreShellFlow(0,NaN,nodes),/INVALID_ARGUMENT/);
 assert.throws(()=>sampleCoreShellFlow(0,0,nodes,1000),/INVALID_ARGUMENT/);
 assert.throws(()=>sampleCoreShellFlow(0,0,[]),/INVALID_DIRECTIONS/);
});
test('R201 quality map and zero power must hide all diffuse veils',()=>{
 assert.equal(visibleCoreShellVeils('economy',1),0);
 assert.equal(visibleCoreShellVeils('balanced',1),4);
 assert.equal(visibleCoreShellVeils('ultra',1),6);
 assert.equal(visibleCoreShellVeils('ultra',0),0);
 assert.equal(coreShellVeilRadius(2,'economy'),0);
 assert.ok(coreShellVeilRadius(2,'ultra')>coreShellVeilRadius(2,'balanced'));
 assert.throws(()=>visibleCoreShellVeils('invalid',1),/INVALID_ARGUMENT/);
});
test('R201 automatic budget is a supported user-facing quality option',()=>{
 assert.equal(visibleCoreShellVeils('auto',1),4);
 assert.equal(coreShellVeilRadius(2,'auto'),coreShellVeilRadius(2,'balanced'));
});
test('Failure-first: each aura must be disabled BEFORE optional visible bridge geometry refresh',()=>{
 assert.match(source,/bridgeVeils\.push/);
 assert.match(source,/core-shell-fusion-r201/);
 const block=source.slice(source.indexOf('for(let i=0;i<bridges.length;i++)'),source.indexOf('for(let i=0;i<stars.length;i++)'));
 assert.ok(block.includes('aura.setEnabled('));
 assert.ok(block.indexOf('aura.setEnabled(')<block.indexOf('if(visible){'),'stale veil remains enabled after core power = 0');
 assert.equal((source.match(/new Engine\(/g)||[]).length,1);
 assert.equal((source.match(/new Scene\(/g)||[]).length,1);
});
