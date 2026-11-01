#!/usr/bin/env node
// R202.25 V4 review packet: reconstruct an exact, offline-only reviewer folder.
// No network calls, Git writes, deployment, source modification or dependency installs.
import {existsSync, mkdirSync, copyFileSync, readFileSync, renameSync, rmSync, writeFileSync} from 'node:fs';
import {resolve, join, dirname} from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';

const expected = Object.freeze({
  r20224: 'ffd1326751e6ecbbe2fd997d25a00a8eb5d2bd7efbb36c5f52875e7a50e628da',
  r20225: '58ffa01ce8a7c22206b3a6b4795cf4c8c9d2d6e125a98940a64401a2f6e16ed2',
  comparison: '277910e7e476f8509554f9ff81b8f029f6a7c214c771d29462704a4ba712fc04',
  fourAngles: '7cbc3dd356fe13abbb7531454e06499447456c93fd9b014487d05eb326697011'
});
const sha256 = path => createHash('sha256').update(readFileSync(path)).digest('hex');
const fail = (label, path, want) => {
  if(!existsSync(path)) throw Error(label + ':MISSING:' + path);
  const actual = sha256(path);
  if(want && actual !== want) throw Error(label + ':SHA_MISMATCH:' + actual);
  return actual;
};
if(process.argv.length !== 5) {
  console.error('Usage: node review/r20225-v4/assemble-offline.mjs <R20224 bundle root> <R20225 bundle root> <output new directory>');
  process.exit(64);
}
const local = dirname(fileURLToPath(import.meta.url));
const repo = resolve(local,'../..');
const r24 = resolve(process.argv[2]), r25 = resolve(process.argv[3]), output = resolve(process.argv[4]);
if(existsSync(output)) throw Error('FAIL_CLOSED:OUTPUT_EXISTS');
if([r24,r25,local,repo].some(p => output === p || p.startsWith(output + '\\') || p.startsWith(output + '/') || output.startsWith(p + '\\') || output.startsWith(p + '/'))) throw Error('FAIL_CLOSED:OVERLAPPING_OUTPUT');
const checked = [
  ['R20224_BUNDLE',join(r24,'dist','babylon-lab.js'),expected.r20224],
  ['R20225_BUNDLE',join(r25,'dist','babylon-lab.js'),expected.r20225],
  ['PNG_SAME_ANGLE',join(local,'COMPARATIF_MEME_ANGLE.png'),expected.comparison],
  ['PNG_FOUR_ANGLES',join(repo,'evidence','R20225_R2_R20224_GPU_4ANGLES_AB.png'),expected.fourAngles]
];
for(const [name,path,hash] of checked) fail(name,path,hash);
const own = [
  'index.html','review.js','review.css','LIRE-AVANT.txt','OUVRIR-COMPARATEUR.cmd',
  'COMPARATIF_MEME_ANGLE.png',
  'versions/r20224/index.html','versions/r20224/style.css','versions/r20224/scene-sync.js',
  'versions/r20225/index.html','versions/r20225/style.css','versions/r20225/scene-sync.js'
];
for(const name of own) fail('SOURCE_REVIEW_'+name,join(local,name));
const files = [
  ...own.map(rel=>({from:join(local,rel),to:rel})),
  {from:checked[1][1],to:'versions/r20225/dist/babylon-lab.js'},
  {from:checked[0][1],to:'versions/r20224/dist/babylon-lab.js'},
  {from:checked[3][1],to:'COMPARATIF_4_ANGLES.png'}
];
const temp = output + '.incomplete-' + process.pid;
if(existsSync(temp)) throw Error('FAIL_CLOSED:TEMP_EXISTS');
const hashes = [];
try {
  mkdirSync(temp,{recursive:true});
  for(const {from,to} of files){
    const target = join(temp,to);
    mkdirSync(dirname(target),{recursive:true});
    copyFileSync(from,target);
    const expectedCopied=sha256(from),actualCopied=sha256(target);
    if(expectedCopied!==actualCopied) throw Error('COPY_CORRUPT:'+to);
    hashes.push(actualCopied+'  '+to.replaceAll('\\','/'));
  }
  writeFileSync(join(temp,'SHA256SUMS.txt'), hashes.join('\n')+'\n');
  if(existsSync(output)) throw Error('FAIL_CLOSED:OUTPUT_RACE');
  renameSync(temp,output);
  console.log('R20225_REVIEW_PACKAGE_PASS',JSON.stringify({
    output,files:files.length+1,source:{r20224:'edabe06b16d1e36548b34f80a0450f8be9017a33',r20225:'cde9659449c44a6fe7d3641122faddc4df51e94f'},
    engineBundles:expected
  }));
} catch(err){
  if(existsSync(temp)) rmSync(temp,{recursive:true,force:true});
  console.error('R20225_REVIEW_PACKAGE_FAILED',String(err));
  process.exitCode=1;
}
