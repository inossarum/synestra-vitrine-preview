import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {sampleCoreVolume,sampleBlendedCoreVolume} from '../src/core-volume.mjs';
import {advanceShellTransition} from '../src/shell-mode-transition.mjs';

const dirs=[[-.54,.71,.46],[.70,.58,.38],[-.73,-.32,.47],[.70,-.55,.29],[-.02,-.92,.40],[.32,.89,-.38]];
const delta=(a,b)=>Math.hypot(...a.map((x,i)=>x-b[i]));
const source=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');

test('R202.58 all 18 existing inner streams match exactly at each stable mode',()=>{
 for(let mode=0;mode<4;mode++)for(let i=0;i<18;i++){
  const weights=Array.from({length:4},(_,j)=>+(j===mode));
  assert.deepEqual(sampleBlendedCoreVolume(i,2.4,dirs,weights),sampleCoreVolume(i,mode,2.4,dirs));
 }
});

test('R202.58 inner streams blend coherently at intermediate and retargeted states',()=>{
 const initial=advanceShellTransition(null,0,0);
 const changed=advanceShellTransition(initial,1,1);
 const half=advanceShellTransition(changed,1,1.36);
 const switched=advanceShellTransition(half,3,1.36);
 const after=advanceShellTransition(switched,3,1.54);
 for(let i=0;i<18;i++){
  const a=sampleBlendedCoreVolume(i,2.4,dirs,initial.weights);
  const b=sampleBlendedCoreVolume(i,2.4,dirs,half.weights);
  const c=sampleBlendedCoreVolume(i,2.4,dirs,after.weights);
  const end=sampleBlendedCoreVolume(i,2.4,dirs,[0,0,0,1]);
  assert.equal(a.length,91);assert.equal(b.length,91);
  for(let k=0;k<91;k++){
   const expected=a[k].map((v,j)=>(1-half.weights[1])*v+half.weights[1]*sampleCoreVolume(i,1,2.4,dirs)[k][j]);
   assert.ok(delta(b[k],expected)<1e-10,'intermediate mismatch');
   assert.ok(c[k].every(Number.isFinite)&&Math.hypot(...c[k])<1.15);
  }
  assert.ok(delta(b[50],a[50])>1e-4);
  assert.ok(delta(c[50],b[50])>1e-5);
  assert.ok(delta(end[50],c[50])>1e-4);
 }
});

test('R202.58 no malformed weights, NaN or geometry allocation side effects',()=>{
 for(const invalid of [[.7,.7,0,0],[-.1,1.1,0,0],[NaN,0,0,1],[1,0],[]]){
  assert.throws(()=>sampleBlendedCoreVolume(0,2.4,dirs,invalid),/R20258_CORE_WEIGHTS_INVALID/);
 }
 assert.throws(()=>sampleBlendedCoreVolume(0,2.4,[],[1,0,0,0]),/R200_CORE_INVALID_DIRECTIONS/);
 assert.match(source,/sampleBlendedCoreVolume\(i,t,coreDirections,transitionWeights\)/);
 assert.match(source,/pathCoreBlended\(i,time,modeTransition\.weights\)/);
 assert.equal((source.match(/new Engine\(/g)||[]).length,1);
 assert.equal((source.match(/new Scene\(/g)||[]).length,1);
});
