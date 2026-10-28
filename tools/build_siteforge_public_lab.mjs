// SiteForge R176 — bounded public static preview, no Studio backend or secrets.
import {readFileSync,writeFileSync,mkdirSync,existsSync,copyFileSync} from 'node:fs';
import {join,dirname,resolve} from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=resolve(fileURLToPath(new URL('../',import.meta.url)));
const out=join(root,'siteforge-public-dist');
const checks=[
  ['siteforge/core-3d-lab/index.html','c2924ebdf6ecfd4ad56f4312ea5a1dc1d7718589'],
  ['assets/siteforge-lab-r166-flow.js','364091e19605de48e63d079178c52e626018d847']
];
const blobHash=s=>{const b=Buffer.from(s.toString('utf8').replace(/\r\n/g,'\n'));return createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');};
if(existsSync(out))throw Error('REFUSE_OVERWRITE_STATIC_OUTPUT');
for(const [rel,expected] of checks){
  const content=readFileSync(join(root,rel));
  if(blobHash(content)!==expected)throw Error('IMMUTABLE_SOURCE_MISMATCH:'+rel);
}
for(const [rel] of checks){
  const targets=rel.endsWith('index.html')?['index.html',rel]:[rel];
  for(const target of targets){
    const dest=join(out,target);mkdirSync(dirname(dest),{recursive:true});copyFileSync(join(root,rel),dest);
  }
}
writeFileSync(join(out,'robots.txt'),'User-agent: *\nDisallow: /\n');
console.log('R176_PUBLIC_ASSETS=4');
console.log('R176_SOURCE_BLOBS=VERIFIED');
console.log('R176_BACKEND=NONE');
