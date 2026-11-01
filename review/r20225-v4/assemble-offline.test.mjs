import test, {after} from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {mkdtempSync, mkdirSync, existsSync, readFileSync, writeFileSync, copyFileSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';

const here=dirname(fileURLToPath(import.meta.url));
const assemble=join(here,'assemble-offline.mjs');
const base=process.env.SYN_R20224_BUNDLE_ROOT;
const candidate=process.env.SYN_R20225_BUNDLE_ROOT;
if(!base || !candidate) throw Error('REQUIRES SYN_R20224_BUNDLE_ROOT and SYN_R20225_BUNDLE_ROOT; missing inputs cannot become SKIP/PASS');
const work=mkdtempSync(join(tmpdir(),'synlab-review-v4-'));
after(()=>rmSync(work,{recursive:true,force:true}));
const sha=path=>createHash('sha256').update(readFileSync(path)).digest('hex');
function invoke(a,b,out) {
  const p=spawnSync(process.execPath,[assemble,a,b,out],{encoding:'utf8',timeout:30000,windowsHide:true});
  if(p.error)throw p.error;
  return {code:p.status,stdout:p.stdout||'',stderr:p.stderr||''};
}
const e24='ffd1326751e6ecbbe2fd997d25a00a8eb5d2bd7efbb36c5f52875e7a50e628da';
const e25='58ffa01ce8a7c22206b3a6b4795cf4c8c9d2d6e125a98940a64401a2f6e16ed2';

test('preflight: exact source bundles and not empty',()=>{
  assert.equal(sha(join(base,'dist','babylon-lab.js')),e24);
  assert.equal(sha(join(candidate,'dist','babylon-lab.js')),e25);
  assert.notEqual(e24,e25);
});
test('failure-first: wrong R202.24 source is rejected with no output',()=>{
  const out=join(work,'bad-base');
  const result=invoke(candidate,candidate,out);
  assert.notEqual(result.code,0);
  assert.match(result.stderr,/SHA_MISMATCH/);
  assert.equal(existsSync(out),false);
});
test('failure-first: byte-corrupted bundle is rejected with no output',()=>{
  const fake=join(work,'corrupt-root'),out=join(work,'corrupt-output');
  mkdirSync(join(fake,'dist'),{recursive:true});
  const bundle=join(fake,'dist','babylon-lab.js');
  copyFileSync(join(base,'dist','babylon-lab.js'),bundle);
  writeFileSync(bundle,'\n// deliberate corruption for QA\n',{flag:'a'});
  const result=invoke(fake,candidate,out);
  assert.notEqual(result.code,0);
  assert.match(result.stderr,/SHA_MISMATCH/);
  assert.equal(existsSync(out),false);
});
test('failure-first: existing destination retains its contents',()=>{
  const out=join(work,'existing');
  mkdirSync(out);
  const sentinel=join(out,'keep.txt');
  writeFileSync(sentinel,'do not overwrite');
  const result=invoke(base,candidate,out);
  assert.notEqual(result.code,0);
  assert.match(result.stderr,/OUTPUT_EXISTS/);
  assert.equal(readFileSync(sentinel,'utf8'),'do not overwrite');
});
test('failure-first: output inside source is rejected before creating files',()=>{
  const out=join(here,'__QA_MUST_NOT_CREATE__');
  assert.equal(existsSync(out),false,'abort: a user path already exists');
  const result=invoke(base,candidate,out);
  assert.notEqual(result.code,0);
  assert.match(result.stderr,/OVERLAPPING_OUTPUT/);
  assert.equal(existsSync(out),false);
});
test('nominal: 16 files, manifest 15/15, exact hashes, no browser',()=>{
  const out=join(work,'nominal');
  const result=invoke(base,candidate,out);
  assert.equal(result.code,0,result.stderr);
  assert.match(result.stdout,/R20225_REVIEW_PACKAGE_PASS/);
  const manifest=readFileSync(join(out,'SHA256SUMS.txt'),'utf8').trim().split(/\r?\n/);
  assert.equal(manifest.length,15);
  const seen=new Set();
  for(const row of manifest){
    const match=/^([0-9a-f]{64})  (.+)$/.exec(row);
    assert.ok(match,'invalid manifest entry');
    assert.equal(seen.has(match[2]),false,'duplicate file entry');
    seen.add(match[2]);
    assert.equal(sha(join(out,match[2])),match[1],'hash mismatch: '+match[2]);
  }
  assert.equal(sha(join(out,'versions','r20224','dist','babylon-lab.js')),e24);
  assert.equal(sha(join(out,'versions','r20225','dist','babylon-lab.js')),e25);
  assert.ok(seen.has('COMPARATIF_MEME_ANGLE.png'));
  assert.ok(seen.has('COMPARATIF_4_ANGLES.png'));
  assert.ok(seen.has('versions/r20224/scene-sync.js'));
  assert.ok(seen.has('versions/r20225/scene-sync.js'));
});
