/** R201 deterministic artifact recovery; no external dependencies or network. */
import {readFileSync,writeFileSync,existsSync,renameSync,unlinkSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {gunzipSync} from 'node:zlib';
import {fileURLToPath} from 'node:url';
import {join,dirname} from 'node:path';
const root=dirname(dirname(fileURLToPath(import.meta.url)));
const archive=join(root,'dist','babylon-lab-r201.js.gz');
const output=join(root,'dist','babylon-lab.js');
const SHA_ARCHIVE='5d21f008c4178969caaac0549e26a38a79d65bdd226831b10d861bf620c66042';
const SHA_BUNDLE='3f305842f11e9aef0f9a831d38e8c8a5eba7540f00de0237531e231415ccc2de';
const SHA_R200='4b6d01e094debc6765c7fa1075f32a9f9065e6d37a465dbb046cf12745ba0b9f';
const sha=b=>createHash('sha256').update(b).digest('hex');
const compressed=readFileSync(archive);
if(sha(compressed)!==SHA_ARCHIVE)throw Error('R201_ARCHIVE_INTEGRITY_FAIL');
const bundle=gunzipSync(compressed);
if(bundle.length!==7406119||sha(bundle)!==SHA_BUNDLE)throw Error('R201_BUNDLE_INTEGRITY_FAIL');
const restore=process.argv.includes('--restore');
if(process.argv.some(a=>a.startsWith('--')&&a!=='--restore'&&a!=='--verify'))throw Error('R201_UNSUPPORTED_ARG');
if(restore){
 const existing=existsSync(output)?sha(readFileSync(output)):null;
 if(existing!==null&&existing!==SHA_R200&&existing!==SHA_BUNDLE)throw Error('R201_REFUSE_OVERWRITE_UNRECOGNIZED_DIST');
 if(existing!==SHA_BUNDLE){
  const tmp=output+'.r201-'+process.pid+'.tmp';
  try{writeFileSync(tmp,bundle,{flag:'wx'});renameSync(tmp,output)}finally{if(existsSync(tmp))unlinkSync(tmp)}
 }
 if(sha(readFileSync(output))!==SHA_BUNDLE)throw Error('R201_POST_RESTORE_SHA_MISMATCH');
}
console.log(JSON.stringify({status:'PASS',mode:restore?'RESTORED':'VERIFIED_ONLY',bytes:bundle.length,sha256:SHA_BUNDLE,archiveSha256:SHA_ARCHIVE}));
