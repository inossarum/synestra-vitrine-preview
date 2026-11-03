import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {sampleMovingNodeDirections} from '../src/moving-node-directions.mjs';

const seeds=[[-.54,.71,.46],[.70,.58,.38],[-.73,-.32,.47],[.70,-.55,.29],[-.02,-.92,.40],[.32,.89,-.38]];
const source=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const distance=(a,b)=>Math.hypot(...a.map((v,i)=>v-b[i]));
const normalize=p=>p.map(x=>x/Math.hypot(...p));

test('R202.55 six shell nodes move in three dimensions without leaving the existing sphere',()=>{
 const start=sampleMovingNodeDirections(seeds,0);
 const shifted=sampleMovingNodeDirections(seeds,13);
 assert.equal(start.length,6);assert.equal(shifted.length,6);
 assert.ok(shifted.filter((p,i)=>distance(p,start[i])>.10).length>=3,'nodes must physically move');
 for(const time of [0,1.5,13,40,80,160]){
  const nodes=sampleMovingNodeDirections(seeds,time);
  nodes.forEach((p,i)=>{
   assert.equal(p.length,3);
   assert.ok(p.every(Number.isFinite));
   assert.ok(Math.abs(Math.hypot(...p)-1)<1e-10,'shell radius must be fixed');
   assert.ok(distance(p,normalize(seeds[i]))<.34,'node drift must remain bounded');
  });
 }
});

test('R202.55 deterministic motion has safe validation and accessible static fallback',()=>{
 assert.deepEqual(sampleMovingNodeDirections(seeds,12),sampleMovingNodeDirections(seeds,12));
 assert.deepEqual(sampleMovingNodeDirections(seeds,0),sampleMovingNodeDirections(seeds,30,{reducedMotion:true}));
 for(const bad of [-1,NaN,Infinity])assert.throws(()=>sampleMovingNodeDirections(seeds,bad),/NODE_TIME_INVALID/);
 for(const bad of [[],Array(6).fill([0,0,0]),Array(6).fill([1,NaN,0])])
  assert.throws(()=>sampleMovingNodeDirections(bad,0),/NODE_DIRECTIONS_INVALID/);
});

test('R202.55 reuses existing node meshes and flows in one CPU geometry gate',()=>{
 assert.match(source,/import \{sampleMovingNodeDirections\} from '\.\/moving-node-directions\.mjs'/);
 assert.match(source,/const nodeSeedDirections=nodeDirections\.map/);
 assert.match(source,/if\(geometryStep\.update\)\{/);
 assert.match(source,/sampleMovingNodeDirections\(nodeSeedDirections,time,\{reducedMotion:reduced\.matches\}\)/);
 assert.match(source,/nodeDirections\[i\]\.copyFromFloats/);
 assert.match(source,/coreDirections\[i\]=movingNodes\[i\]/);
 assert.match(source,/energyNodes\[i\]\.position\.copyFrom/);
 assert.equal((source.match(/new Engine\(/g)||[]).length,1);
 assert.equal((source.match(/new Scene\(/g)||[]).length,1);
});

test('R202.55 fork budget keeps every luminous node connected in balanced quality',async()=>{
 const {activeForkIndices}=await import('../src/node-branches.js');
 const balanced=activeForkIndices('balanced',145),economy=activeForkIndices('economy',145);
 assert.equal(balanced.length,8);
 assert.deepEqual([...new Set(balanced.map(i=>Math.floor(i/2)))],[0,1,2,3,4,5]);
 assert.equal(economy.length,4);
 assert.equal(new Set(economy.map(i=>Math.floor(i/2))).size,4);
 assert.equal(activeForkIndices('ultra',145).length,12);
 assert.deepEqual(activeForkIndices('balanced',0),[]);
 assert.throws(()=>activeForkIndices('invalid',145),/FORK_POLICY_INVALID/);
});
