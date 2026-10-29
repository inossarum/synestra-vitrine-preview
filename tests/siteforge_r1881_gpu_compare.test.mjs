import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const read=path=>readFileSync(join(root,path));
const data=JSON.parse(read('evidence/SITEFORGE_R1881_GPU_COMPARE_20261029.json'));
const isNvidiaGpu=renderer=>/NVIDIA|GeForce RTX 3090/i.test(String(renderer||''))&&!/SwiftShader|Software/i.test(String(renderer||''));
const hashes={
 'siteforge-r1880-autonome.html':'80444c99fcd55b1066c5c98e497a5efb935a6610b9d215a85f6c31cdd41d72b7',
 'siteforge-r1881-autonome.html':'22a0ab5a3f814b6c4dfc7f831319aa40f17241b475f29689bab0c774d9a4d9a8'
};
test('comparison is bound to immutable R1880 / R1881 source bytes',()=>{
 for(const [file,expected] of Object.entries(hashes))assert.equal(createHash('sha256').update(read(file).toString('utf8').replace(/\r\n/g,'\n')).digest('hex'),expected,file);
});
test('rejects software fallback or missing renderer instead of false GPU PASS',()=>{
 assert.equal(isNvidiaGpu('Google SwiftShader (software rendering)'),false);
 assert.equal(isNvidiaGpu('ANGLE (Google, Vulkan, SwiftShader device)'),false);
 assert.equal(isNvidiaGpu(''),false);
 assert.equal(isNvidiaGpu('ANGLE (NVIDIA, NVIDIA GeForce RTX 3090, D3D11)'),true);
 assert.equal(data.hardwareEvidence.verifiedNvidiaWebGL,true);
 for(const v of data.versions)assert.ok(isNvidiaGpu(v.info.renderer),v.name);
});
test('repeat captures deterministic; comparison captures meaningful intended delta',()=>{
 assert.equal(data.comparison.view.join('x'),'1100x800');
 assert.equal(data.comparison.baselineRepeatChanged,0);
 assert.equal(data.comparison.determinism,true);
 assert.equal(data.comparison.meaningfulChange,true);
 assert.ok(data.comparison.pixelDiff.changed>2000);
 for(const v of data.versions){
  assert.equal(v.info.glError,0);assert.equal(v.info.contextLost,false);
  assert.equal(v.info.count,'8');assert.equal(v.info.mouse,'false');
  assert.equal(v.info.palette,'synestra');assert.equal(v.info.quality,'balanced');
  assert.equal(v.repeatDiff.changed,0);
  for(const suffix of ['fixed','repeat']){
   const file='evidence/r1881-gpu-'+v.name+'-'+suffix+'.png';
   assert.ok(existsSync(join(root,file)),file);assert.ok(read(file).length>10000,file);
  }
 }
});
test('render cadence measured on real browser; not mislabeled GPU throughput',()=>{
 const rates=data.versions.map(v=>v.raf.mean_ms);
 for(const v of data.versions){
  assert.equal(v.raf.frames,72);
  assert.ok(v.raf.p50_ms>0);assert.ok(v.raf.p95_ms>0);assert.ok(v.raf.mean_ms>0);
 }
 assert.ok(Math.abs(rates[0]-rates[1])<.5);
 assert.equal(data.hardwareEvidence.verifiedNvidiaWebGL,true);
 assert.equal(data.jsExceptions.length,0);
});
