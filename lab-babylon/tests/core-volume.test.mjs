import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {sampleCoreVolume,coreVolumeWidth,coreMistWidth,visibleCoreMistCount,CORE_VOLUME_MODES} from '../src/core-volume.mjs';
const dirs=[[-.54,.71,.46],[.70,.58,.38],[-.73,-.32,.47],[.70,-.55,.29],[-.02,-.92,.40],[.32,.89,-.38]];
const len=p=>Math.hypot(...p);
test('4 variants, 18 open bounded curves and no NaN',()=>{
 assert.equal(CORE_VOLUME_MODES.length,4);
 for(let mode=0;mode<4;mode++)for(let i=0;i<18;i++){
  const p=sampleCoreVolume(i,mode,4.5,dirs);
  assert.equal(p.length,91);
  assert.ok(p.every(x=>x.every(Number.isFinite)&&len(x)<1.1));
  assert.ok(len(p[0])<.04);
  assert.ok(len(p.at(-1))>.58);
  assert.ok(Math.hypot(...p.at(-1).map((v,i)=>v-p[0][i]))>.58);
 }
});
test('4 variants and animation change 3D positions deterministically',()=>{
 for(let i=0;i<18;i++){
  const a=sampleCoreVolume(i,0,0,dirs),b=sampleCoreVolume(i,0,0,dirs);
  assert.deepEqual(a,b);
  const later=sampleCoreVolume(i,0,1,dirs);
  assert.ok(Math.hypot(...a[44].map((v,j)=>v-later[44][j]))>.001);
 }
 for(let m=1;m<4;m++)assert.notDeepEqual(sampleCoreVolume(1,m,2,dirs),sampleCoreVolume(1,0,2,dirs));
});
test('variable width forms a balanced, bounded luminous middle',()=>{
 for(const q of ['economy','balanced','ultra'])for(let i=0;i<18;i++){
  const start=coreVolumeWidth(i,0,q),mid=coreVolumeWidth(i,.5,q),end=coreVolumeWidth(i,1,q);
  assert.ok(start>0&&mid>start&&end<mid&&mid<.015);
 }
 assert.ok(coreVolumeWidth(3,.5,'economy')<coreVolumeWidth(3,.5,'ultra'));
});
test('invalid inputs fail closed; no silent bad geometry',()=>{
 for(const i of [-1,.1,NaN])assert.throws(()=>sampleCoreVolume(i,0,0,dirs),/INVALID_ARGUMENT/);
 for(const m of [-1,4,99])assert.throws(()=>sampleCoreVolume(0,m,0,dirs),/INVALID_ARGUMENT/);
 assert.throws(()=>sampleCoreVolume(0,1,0,[]),/INVALID_DIRECTIONS/);
 assert.throws(()=>sampleCoreVolume(0,1,0,dirs,1),/INVALID_ARGUMENT/);
 assert.throws(()=>coreVolumeWidth(0,-.1),/INVALID_ARGUMENT/);
 assert.throws(()=>coreVolumeWidth(0,.2,'low'),/INVALID_ARGUMENT/);
});

test('R201 internal plasma mist has bounded tapered radius and finite quality budgets',()=>{
 for(const q of ['economy','balanced','ultra','auto'])for(let i=0;i<18;i++){
  const start=coreMistWidth(i,0,q),middle=coreMistWidth(i,.5,q),end=coreMistWidth(i,1,q);
  assert.ok(start>0&&middle>start&&end<middle&&middle<.07);
  assert.ok(middle>coreVolumeWidth(i,.5,q));
 }
 assert.equal(visibleCoreMistCount('economy',1),0);
 assert.equal(visibleCoreMistCount('balanced',1),12);
 assert.equal(visibleCoreMistCount('auto',1),12);
 assert.equal(visibleCoreMistCount('ultra',1),18);
 for(const q of ['economy','balanced','ultra','auto'])assert.equal(visibleCoreMistCount(q,0),0);
 for(const f of [
  ()=>coreMistWidth(-1,.3),()=>coreMistWidth(18,.3),()=>coreMistWidth(0,NaN),
  ()=>coreMistWidth(0,1.1),()=>visibleCoreMistCount('wrong',1),
  ()=>visibleCoreMistCount('auto',-1),()=>visibleCoreMistCount('auto',NaN)
 ])assert.throws(f,/R201_MIST_/);
});
test('R201 mist stays in the same scene and follows existing core paths with power/quality gating',()=>{
 const source=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
 assert.equal((source.match(/new Engine\(/g)||[]).length,1);
 assert.equal((source.match(/new Scene\(/g)||[]).length,1);
 assert.match(source,/innerSheaths\.push/);
 assert.match(source,/const mistBudget=visibleCoreMistCount\(quality,power\)/);
 assert.match(source,/mist\.setEnabled\(mistVisible\)/);
 assert.match(source,/refresh\(mist,path,coreMistWidth/);
 assert.match(source,/cv\.dataset\.visibleCoreMist/);
 assert.match(source,/mountCoreAtAtlasSocket/);
});
