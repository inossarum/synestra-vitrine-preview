import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {CORE_VOLUME_MODES,coreVolumeWidth,sampleCoreVolume} from '../src/core-volume.mjs';
const src=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const ref=readFileSync(new URL('../src/reference-contract.js',import.meta.url),'utf8');
const directions=[[-.54,.71,.46],[.70,.58,.38],[-.73,-.32,.47],[.70,-.55,.29],[-.02,-.92,.40],[.32,.89,-.38]];

test('R200 imports its pure volume geometry in the existing engine, not a second engine',()=>{
 assert.match(src,/import \{sampleCoreVolume,coreVolumeWidth\} from '\.\/core-volume\.mjs'/);
 assert.equal((src.match(/new Engine\(/g)||[]).length,1);
 assert.equal((src.match(/new Scene\(/g)||[]).length,1);
 assert.match(src,/mountCoreAtAtlasSocket/);
 assert.match(src,/CORE_SOCKET/);
 assert.match(src,/count:28/);
 assert.match(src,/core-volume-r200/);
 assert.match(src,/radial-plasma-volume/);
 assert.doesNotMatch(src,/R199: open radial plasma branches/);
 assert.equal(CORE_VOLUME_MODES.length,4);
});
test('R200 attenuates the saturated point while preserving reference palette and power-zero',()=>{
 assert.match(src,/new Color3\(\.98,\.85,1\.20\)\.scale\(Math\.min\(power,1\.25\)\)/);
 assert.match(src,/haloMat\.alpha=power>0\?/);
 assert.match(src,/coreVolumeWidth\(i,\.5,quality\)/);
 assert.match(src,/visible=power>0/);
 assert.match(src,/SPHERE_REFERENCE\.colors/);
 assert.match(ref,/SYN_SPHERE_ART_REFERENCE_20261029/);
});
test('18 paths, four modes and width profiles remain deterministic and physically bounded',()=>{
 for(let mode=0;mode<4;mode++)for(let i=0;i<18;i++){
  const a=sampleCoreVolume(i,mode,4.5,directions);
  assert.equal(a.length,91);
  assert.ok(a.every(p=>p.every(Number.isFinite)&&Math.hypot(...p)<1.1));
  assert.deepEqual(a,sampleCoreVolume(i,mode,4.5,directions));
  assert.ok(coreVolumeWidth(i,.5,'economy')<coreVolumeWidth(i,.5,'balanced'));
 }
});
test('negative inputs fail before renderer receives malformed geometry',()=>{
 assert.throws(()=>sampleCoreVolume(2,99,0,directions),/R200_CORE_INVALID_ARGUMENT/);
 assert.throws(()=>coreVolumeWidth(2,2,'ultra'),/R200_WIDTH_INVALID_ARGUMENT/);
});
