import {readFileSync,writeFileSync,mkdirSync,copyFileSync} from 'node:fs';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
const root=process.env.SYNESTRA_STAGING_ROOT||'I:\\_STUDIO_STAGING';
const original=join(root,'SYN_LAB_R20249_HPSYN_REPLAY_20261102','lab-babylon');
const candidate=join(root,'SYN_LAB_R20250_R20251_INTEGRATION_QA_20261102','lab-babylon');
const qa=join(root,'SYN_LAB_R20251_NATIVE_BABYLON_INSTRUMENTED_QA_20261102');
const sha=x=>createHash('sha256').update(x).digest('hex');
const baselineBundle=readFileSync(join(original,'dist','babylon-lab.js'),'utf8');
function extract(file,src) {
 const txt=readFileSync(join(src,'src',file),'utf8');
 const token='const fragmentSource = '+String.fromCharCode(96);
 const begin=file==='plasma-field.js'?txt.indexOf('export function createPlasmaHeartMaterial'):0;
 if(begin<0)throw Error('HEART_FUNCTION_MISSING');
 const idx=txt.indexOf(token,begin);
 if(idx<0)throw Error('SOURCE_FRAGMENT_MISSING '+file);
 const start=idx+token.length;
 const end=txt.indexOf(String.fromCharCode(96)+';',start);
 if(end<0)throw Error('SOURCE_FRAGMENT_UNTERMINATED '+file);
 return txt.slice(start,end).replace(/\r\n/g,'\n');
}
const pairs=[
 {name:'heart',file:'plasma-field.js',required:'coldFacetShadow'},
 {name:'volume',file:'plasma-volume-r20215.js',required:'coreFrontWindow'}
];
let patched=baselineBundle;
const evidence={schema:'synestra.r20251.bundle-instrumentation.v1',baseline_bundle_sha256:sha(baselineBundle),baseline_bundle_bytes:Buffer.byteLength(baselineBundle),baseline_head:'60171bb17d038c7d05b1e1d09cb953f0d496380c',candidate_tree:'42086191c00a0904626ae0fcca32b7f010c2c752',patches:[]};
for(const item of pairs){
 const before=extract(item.file,original);
 const after=extract(item.file,candidate);
 if(after===before||after.indexOf(item.required)<0||before.indexOf(item.required)!==-1)throw Error('EXPECTED_CHANGE_ABSENT_'+item.name);
 const hits=patched.split(before).length-1;
 if(hits!==1)throw Error('BUNDLE_MATCH_NOT_UNIQUE_'+item.name+'_'+hits);
 patched=patched.replace(before,after);
 evidence.patches.push({name:item.name,original_fragment_sha256:sha(before),candidate_fragment_sha256:sha(after),original_chars:before.length,candidate_chars:after.length,exact_match_count:hits});
}
const changed=patched!==baselineBundle&&patched.includes('coldFacetShadow')&&patched.includes('coreFrontWindow');
if(!changed)throw Error('PATCH_NOT_APPLIED');
let restored=patched;
for(const item of [...pairs].reverse()){
 const before=extract(item.file,original);
 const after=extract(item.file,candidate);
 if(restored.split(after).length-1!==1)throw Error('REVERSE_MATCH_NOT_UNIQUE_'+item.name);
 restored=restored.replace(after,before);
}
if(restored!==baselineBundle)throw Error('ROUNDTRIP_MISMATCH');
evidence.patched_bundle_sha256=sha(patched);
evidence.patched_bundle_bytes=Buffer.byteLength(patched);
evidence.exact_reversible_roundtrip=true;
evidence.mode='EXACT_GLSL_INJECTION_IN_ALREADY_COMPILED_R20249_BABYLON_BUNDLE_NOT_NATIVE_CANDIDATE_BUILD';
if(process.argv.includes('--prepare')){
 const base=join(qa,'instrumented');mkdirSync(join(base,'dist'),{recursive:true});
 for(const f of ['index.html','style.css'])copyFileSync(join(original,f),join(base,f));
 writeFileSync(join(base,'dist','babylon-lab.js'),patched);
 writeFileSync(join(qa,'bundle-instrumentation.json'),JSON.stringify(evidence,null,2));
 console.log('INSTRUMENTED_BUNDLE_PREPARED '+JSON.stringify(evidence));
}else console.log('INSTRUMENTATION_PREFLIGHT_PASS '+JSON.stringify(evidence));
