import test from 'node:test';
import assert from 'node:assert/strict';
import {sampleCoreVolume} from '../src/core-volume.mjs';
import {remapCoreMistRootPath,CORE_MIST_MIN_RADIUS} from '../src/core-mist-root-relief.mjs';

const nodes=[
 [-.54,.71,.46],[.70,.58,.38],[-.73,-.32,.47],
 [.70,-.55,.29],[-.02,-.92,.40],[.32,.89,-.38]
];
const radius=p=>Math.hypot(...p);

test('R202.61 root relief is geometry-only, first mist point leaves faceted nucleus for all four modes',()=>{
 for(let mode=0;mode<4;mode++)for(let i=0;i<18;i++){
  const original=sampleCoreVolume(i,mode,18,nodes,90);
  const relieved=remapCoreMistRootPath(original);
  assert.equal(relieved.length,original.length);
  assert.ok(radius(original[0])<CORE_MIST_MIN_RADIUS);
  assert.ok(radius(relieved[0])>=CORE_MIST_MIN_RADIUS-.004,JSON.stringify({i,mode,first:relieved[0]}));
  assert.ok(radius(relieved[0])<=CORE_MIST_MIN_RADIUS+.004);
  assert.deepEqual(relieved.at(-1),original.at(-1));
  assert.ok(relieved.every(p=>p.length===3&&p.every(Number.isFinite)));
 }
});
test('R202.61 keeps full original path unchanged when no relief is requested',()=>{
 const src=sampleCoreVolume(2,0,18,nodes,90);
 const got=remapCoreMistRootPath(src,0);
 assert.deepEqual(got,src);
 assert.notEqual(got,src);
});
test('R202.61 fail closed for invalid profiles and insufficient radius',()=>{
 const path=sampleCoreVolume(0,0,18,nodes,90);
 assert.throws(()=>remapCoreMistRootPath(path,-1),/ROOT_RELIEF_INVALID/);
 assert.throws(()=>remapCoreMistRootPath(path,NaN),/ROOT_RELIEF_INVALID/);
 assert.throws(()=>remapCoreMistRootPath(path,5),/ROOT_RELIEF_NO_CROSSING/);
 assert.throws(()=>remapCoreMistRootPath([[0,0,0]]),/ROOT_RELIEF_INVALID/);
 assert.throws(()=>remapCoreMistRootPath([[0,0,0],[0,1,NaN]]),/ROOT_RELIEF_INVALID/);
});
