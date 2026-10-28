// Synestra R102 — Cloudflare Pages build. Only approved static assets.
// No shell, network, npm install, secrets or broad repository publication.
import {lstatSync,existsSync,mkdirSync,readdirSync,copyFileSync,readFileSync} from 'node:fs';
import {join,resolve,extname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(fileURLToPath(new URL('../',import.meta.url)));
const output=resolve(root,'dist');
const checkOnly=process.argv.includes('--check');
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
  if(entry.name.startsWith('.')||/(secret|private|token|credential|\.env|\.pfx|\.pem)/i.test(entry.name))throw Error('STATIC_FILENAME_DENIED');
  const abs=join(dir,entry.name),info=lstatSync(abs);
  if(info.isSymbolicLink())throw Error('STATIC_SYMLINK_DENIED');
  if(info.isDirectory()){scan(abs,join(rel,entry.name),kind);continue;}
  // Preserve the user-supplied 3D preset as a Git source of truth, not a public
  // Pages asset. All other JSON under assets/ remains forbidden.
  if(kind==='assets'&&entry.name==='synestra-studio-plasma-preset-18.json'){
   if(!info.isFile()||info.size>8192)throw Error('PRESET_SOURCE_INVALID');
   const p=JSON.parse(readFileSync(abs,'utf8'));
   if(p.schema!=='synestra.siteforge.plasma-settings.v1'||
      Object.keys(p.parameters||{}).length!==18||
      Object.keys(p.motes||{}).length!==11)throw Error('PRESET_SCHEMA_INVALID');
   continue;
  }
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
