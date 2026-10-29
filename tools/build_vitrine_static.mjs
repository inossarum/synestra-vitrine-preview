// Synestra R102 — Cloudflare Pages build. Only approved static assets.
// No shell, network, npm install, secrets or broad repository publication.
import {lstatSync,existsSync,mkdirSync,readdirSync,copyFileSync,readFileSync} from 'node:fs';
import {join,resolve,extname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(fileURLToPath(new URL('../',import.meta.url)));
const output=resolve(root,'dist');
const checkOnly=process.argv.includes('--check');
const r202ReviewBranch='task/SYN_SITEFORGE_R202_CINEMATIC_DEPTH_20261029';
const r204ReviewBranch='task/SYN_SITEFORGE_R204_LIGHTWEIGHT_CORE_20261029';
const r205ReviewBranch='task/SYN_SITEFORGE_R205_ADAPTIVE_GPU_20261029';
const r206ReviewBranch='task/SYN_SITEFORGE_R206_GRAIN_MIST_STAGE_20261029';
const rootFiles=['index.html','_headers'];
const rootDirs=['assets','siteforge','signal','connect','bridge','offres'];
const extensions={
 assets:new Set(['.avif','.webp','.png','.jpg','.jpeg','.svg','.css','.js']),
 siteforge:new Set(['.html','.css','.js','.mjs','.json']),
 signal:new Set(['.html','.css','.js','.mjs','.json']),
 connect:new Set(['.html']),
 bridge:new Set(['.html']),
 offres:new Set(['.html'])
};
const files=[];
let totalBytes=0;
function scan(dir,rel,kind){
 for(const entry of readdirSync(dir,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name))){
  // Historical R201 bundles are not part of the R202 review. Exclude only
  // these exact assets on this review branch, retaining strict normal validation.
  if(kind==='assets'&&[r202ReviewBranch,r204ReviewBranch,r205ReviewBranch,r206ReviewBranch].includes(process.env.CF_PAGES_BRANCH)){
   const path=join(rel,entry.name).replaceAll('\\','/');
   if(['assets/r201-gpu-benchmarks','assets/r201-scene.bundle.mjs','assets/r201-scene.bundle.mjs.LEGAL.txt','assets/r202-gpu-benchmarks','assets/r202-scene.bundle.mjs','assets/r202-scene.bundle.mjs.LEGAL.txt','assets/r204-gpu-benchmarks','assets/r204-scene.bundle.mjs','assets/r204-scene.bundle.mjs.LEGAL.txt'].includes(path))continue;
  }
  if(entry.name.startsWith('.')||/(secret|private|token|credential|\.env|\.pfx|\.pem)/i.test(entry.name))throw Error('STATIC_FILENAME_DENIED');
  const abs=join(dir,entry.name),info=lstatSync(abs);
  if(info.isSymbolicLink())throw Error('STATIC_SYMLINK_DENIED');
  if(info.isDirectory()){scan(abs,join(rel,entry.name),kind);continue;}
  if(!info.isFile()||!extensions[kind].has(extname(entry.name).toLowerCase()))throw Error('STATIC_EXTENSION_DENIED');
  if(info.size>5*1024*1024)throw Error('STATIC_FILE_SIZE_DENIED');
  totalBytes+=info.size;
  if(totalBytes>45*1024*1024)throw Error('STATIC_TOTAL_SIZE_DENIED');
  files.push({abs,rel:join(rel,entry.name)});
 }
}
for(const file of rootFiles){
 const abs=join(root,file);
 if(!existsSync(abs)||!lstatSync(abs).isFile()||lstatSync(abs).isSymbolicLink())throw Error('STATIC_ROOT_MISSING');
 files.push({abs,rel:file});
}
for(const dir of rootDirs){
 const abs=join(root,dir);
 if(!existsSync(abs)||!lstatSync(abs).isDirectory()||lstatSync(abs).isSymbolicLink())throw Error('STATIC_DIRECTORY_MISSING');
 scan(abs,dir,dir);
}
if(files.length<26||files.length>120||
 !['siteforge/index.html','siteforge/lab/index.html','siteforge/signature/index.html','signal/index.html','connect/index.html','bridge/index.html','offres/index.html','assets/product-pages.css','assets/core-r109-webgl.js']
 .every(p=>files.some(f=>f.rel.replaceAll('\\','/')===p)))throw Error('STATIC_REQUIRED_ROUTES_MISSING');
if(!checkOnly){
 if(existsSync(output))throw Error('STATIC_DIST_EXISTS_NO_OVERWRITE');
 mkdirSync(output);
 for(const file of files){
  const dest=join(output,file.rel);
  mkdirSync(resolve(dest,'..'),{recursive:true});
  copyFileSync(file.abs,dest);
 }
}
// Isolated design-review preview: Cloudflare must serve the R169 palette candidate
// at / only on its exact review branch. Never alter main or other preview branches.
const studioReviewBranch='task/SYN_VITRINE_R169_OFFICIAL_PALETTE_REVIEW_20261028';
if(process.env.CF_PAGES_BRANCH===studioReviewBranch){
 const candidate=join(root,'vitrine-r169-studio-palette-preview.html');
 if(!existsSync(candidate)||!lstatSync(candidate).isFile()||lstatSync(candidate).isSymbolicLink())throw Error('R169_REVIEW_SOURCE_MISSING');
 const html=readFileSync(candidate,'utf8');
 if(!html.includes('R169 brand-palette REVIEW ONLY')||!html.includes('syn-r169-room')||!html.includes('scale(.49)!important'))throw Error('R169_REVIEW_CONTRACT_FAILED');
 if(!checkOnly)copyFileSync(candidate,join(output,'index.html'));
 console.log('SYNESTRA_R169_STUDIO_BRAND_PREVIEW='+ (checkOnly?'CHECK_PASS':'PASS'));
}
console.log('SYNESTRA_STATIC_EXPORT='+(checkOnly?'CHECK_PASS':'PASS'));
console.log('SYNESTRA_STATIC_FILE_COUNT='+files.length);
console.log('SYNESTRA_STATIC_ALLOWLIST='+rootFiles.concat(rootDirs).join(','));


// Exact-branch-only, FREE_ONLY Synestra R202 review. Existing main and other preview builds
// remain byte-for-byte governed by the original static export above.

if(process.env.CF_PAGES_BRANCH===r202ReviewBranch){
 const previewFiles=[
  ['r202/index.html','index.html'],
  ['r202/connect/index.html','connect/index.html'],
  ['r202/bridge/index.html','bridge/index.html'],
  ['r202/siteforge/index.html','siteforge/index.html'],
  ['r202/offres/index.html','offres/index.html'],
  ['assets/r202-three.css','assets/r202-three.css']
 ];
 for(const [src] of previewFiles){
  const file=join(root,src);
  if(!existsSync(file)||!lstatSync(file).isFile()||lstatSync(file).isSymbolicLink())throw Error('R202_PREVIEW_SOURCE_MISSING:'+src);
 }
 const homepage=readFileSync(join(root,'r202/index.html'),'utf8');
 if(!homepage.includes('r202-scene.bundle.mjs')||!homepage.includes('noindex,nofollow'))throw Error('R202_REVIEW_CONTRACT_FAILED');
 if(!checkOnly){
  // R202 bundle must be compiled by the explicit branch-specific Pages build
  // command BEFORE this static-only export. No shell or install in this exporter.
  const out=join(root,'assets/r202-scene.bundle.mjs');
  if(!existsSync(out)||lstatSync(out).size<300000)throw Error('R202_BUNDLE_MISSING');
  for(const [src,dst] of previewFiles){
   const target=join(output,dst);
   mkdirSync(resolve(target,'..'),{recursive:true});
   copyFileSync(join(root,src),target);
  }
  for(const name of ['r202-scene.bundle.mjs','r202-scene.bundle.mjs.LEGAL.txt']){
   const file=join(root,'assets',name);
   if(!existsSync(file)||!lstatSync(file).isFile())throw Error('R202_BUNDLE_RESOURCE_MISSING:'+name);
   const target=join(output,'assets',name);
   copyFileSync(file,target);
  }
  const datasets=join(root,'assets/r202-gpu-benchmarks');
  const outDatasets=join(output,'assets/r202-gpu-benchmarks');
  mkdirSync(outDatasets,{recursive:true});
  let copied=0;
  for(const name of readdirSync(datasets)){
   if(!/^[a-z0-9_-]+\.json$/i.test(name))throw Error('R202_GPU_FILENAME_DENIED');
   const file=join(datasets,name),stat=lstatSync(file);
   if(!stat.isFile()||stat.isSymbolicLink()||stat.size>200000)throw Error('R202_GPU_DATASET_DENIED');
   copyFileSync(file,join(outDatasets,name));
   copied++;
  }
  if(copied<10)throw Error('R202_GPU_DATASETS_INCOMPLETE');
  console.log('SYNESTRA_R202_REVIEW_PREVIEW=PASS');
  console.log('SYNESTRA_R202_BUNDLE_BYTES='+lstatSync(out).size);
  console.log('SYNESTRA_R202_GPU_DATASETS='+copied);
 }else{
  console.log('SYNESTRA_R202_REVIEW_PREVIEW=CHECK_PASS');
 }
}


// Branch-isolated R204 business review: premium GPU-adaptive 3D only in hero.
// The rest uses conventional, already-qualified product pages from R202.
if([r204ReviewBranch,r205ReviewBranch,r206ReviewBranch].includes(process.env.CF_PAGES_BRANCH)){
 const remaps=[
  ['r204/index.html','index.html'],
  ['r202/connect/index.html','connect/index.html'],
  ['r202/bridge/index.html','bridge/index.html'],
  ['r202/siteforge/index.html','siteforge/index.html'],
  ['r202/offres/index.html','offres/index.html'],
  ['assets/r204-hero.css','assets/r204-hero.css']
 ];
 const home=readFileSync(join(root,'r204/index.html'),'utf8');
 if(!home.includes('r204-scene.bundle.mjs')||!home.includes('noindex,nofollow')||!home.includes('syn-r204-home'))throw Error('R204_PREVIEW_HOME_INVALID');
 if(!checkOnly){
  const bundle=join(root,'assets/r204-scene.bundle.mjs');
  if(!existsSync(bundle)||lstatSync(bundle).size<100000)throw Error('R204_BUILD_NOT_READY');
  for(const [src,dst] of remaps){
   const file=join(root,src);
   if(!existsSync(file)||!lstatSync(file).isFile()||lstatSync(file).isSymbolicLink())throw Error('R204_SOURCE_INVALID:'+src);
   const out=join(output,dst);mkdirSync(resolve(out,'..'),{recursive:true});copyFileSync(file,out);
  }
  for(const name of ['r204-scene.bundle.mjs','r204-scene.bundle.mjs.LEGAL.txt']){
   const file=join(root,'assets',name);if(!existsSync(file))throw Error('R204_BUNDLE_FILE_MISSING:'+name);
   copyFileSync(file,join(output,'assets',name));
  }
  const dir=join(root,'assets/r204-gpu-benchmarks'),dest=join(output,'assets/r204-gpu-benchmarks');
  mkdirSync(dest,{recursive:true});let count=0;
  for(const n of readdirSync(dir)){
   if(!/^[a-z0-9_-]+\.json$/i.test(n)||lstatSync(join(dir,n)).size>200000)throw Error('R204_BENCHMARK_DENIED');
   copyFileSync(join(dir,n),join(dest,n));count++;
  }
  if(count<10)throw Error('R204_BENCHMARKS_INCOMPLETE');
  console.log('SYNESTRA_R204_PREVIEW=PASS assets='+count);
 }else console.log('SYNESTRA_R204_PREVIEW=CHECK_PASS');
}
