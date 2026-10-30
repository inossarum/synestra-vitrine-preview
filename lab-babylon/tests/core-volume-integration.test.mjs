import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {CORE_VOLUME_MODES,coreVolumeWidth,sampleCoreVolume} from '../src/core-volume.mjs';
const src=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const ref=readFileSync(new URL('../src/reference-contract.js',import.meta.url),'utf8');
const directions=[[-.54,.71,.46],[.70,.58,.38],[-.73,-.32,.47],[.70,-.55,.29],[-.02,-.92,.40],[.32,.89,-.38]];

test('R200 imports its pure volume geometry in the existing engine, not a second engine',()=>{
 const sourceImport=src.match(/import \{([^}]+)\} from '\.\/core-volume\.mjs'/);
 assert.ok(sourceImport,'missing pure volume module import');
 for(const name of ['sampleCoreVolume','coreVolumeWidth'])assert.ok(sourceImport[1].split(',').map(x=>x.trim()).includes(name),'missing '+name);
 assert.equal((src.match(/new Engine\(/g)||[]).length,1);
 assert.equal((src.match(/new Scene\(/g)||[]).length,1);
 assert.match(src,/mountCoreAtAtlasSocket/);
 assert.match(src,/CORE_SOCKET/);
 assert.match(src,/count:28/);
 assert.match(src,/coreGeometry='volumetric-core-shell-r201'/);
 assert.match(src,/const mistBudget=visibleCoreMistCount\(quality,power\)/);
 assert.doesNotMatch(src,/R199: open radial plasma branches/);
 assert.equal(CORE_VOLUME_MODES.length,4);
});
test('R200 attenuates the saturated point while preserving reference palette and power-zero',()=>{
 const emit=src.match(/coreMat\.emissiveColor=new Color3\(([\d.]+),([\d.]+),([\d.]+)\)\.scale\(Math\.min\(power,([\d.]+)\)\)/);
 if(emit){
  const [red,green,blue,cap]=emit.slice(1).map(Number);
  assert.ok(red>0&&green>0&&blue>0&&cap>0&&cap<=1.25,'bounded white-violet nucleus');
 }else{
  // R202: shader core replaces uniform emissiveColor; ensure power-zero and safe clamps.
  const heart=readFileSync(new URL('../src/plasma-field.js',import.meta.url),'utf8');
  assert.match(src,/coreMat\.setFloat\('uPower',power\)/,'heart power uniform updated each frame');
  assert.match(heart,/float energy=clamp\(uPower,0\.0,1\.6\)/,'shader clamps heart power');
  assert.match(heart,/vec3 tint=mix\(vec3\(\.49,\.24,\.98\),vec3\(1\.55,1\.43,1\.75\)/,'white-violet bounded hotspot');
  assert.match(heart,/float alpha=clamp\(/,'bounded translucent heart');
 }
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
