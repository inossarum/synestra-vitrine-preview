// Synestra R102 — Cloudflare Pages build. Only approved static assets.
// No shell, network, npm install, secrets or broad repository publication.
import {lstatSync,existsSync,mkdirSync,readdirSync,copyFileSync} from 'node:fs';
import {join,resolve,extname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(fileURLToPath(new URL('../',import.meta.url)));
const output=resolve(root,'dist');
const checkOnly=process.argv.includes('--check');
const rootFiles=['index.html','_headers'];
const rootDirs=['assets','siteforge','signal'];
const extensions={
 assets:new Set(['.avif','.webp','.png','.jpg','.jpeg','.svg']),
 siteforge:new Set(['.html','.css','.js','.mjs','.json']),
 signal:new Set(['.html','.css','.js','.mjs','.json'])
};
const files=[];
let totalBytes=0;
function scan(dir,rel,kind){
 for(const entry of readdirSync(dir,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name))){
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
 !['siteforge/index.html','siteforge/lab/index.html','siteforge/signature/index.html','signal/index.html']
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
console.log('SYNESTRA_STATIC_EXPORT='+(checkOnly?'CHECK_PASS':'PASS'));
console.log('SYNESTRA_STATIC_FILE_COUNT='+files.length);
console.log('SYNESTRA_STATIC_ALLOWLIST='+rootFiles.concat(rootDirs).join(','));
