import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync,statSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const pages=['r202/index.html','r202/connect/index.html','r202/bridge/index.html','r202/siteforge/index.html','r202/offres/index.html'];
const linkPattern=/\b(?:href|src)="([^"]+)"/g;
test('R202 every local HTML resource/link resolves',()=>{
 for(const path of pages){
  const html=readFileSync(join(root,path),'utf8');
  for(const [,href] of html.matchAll(linkPattern)){
   if(!href||href.startsWith('#')||href.startsWith('data:'))continue;
   const target=new URL(href,'http://localhost/'+path);
   if(target.origin!=='http://localhost')continue;
   const file=join(root,decodeURIComponent(target.pathname.replace(/^\//,'')));
   assert.ok(existsSync(file),'MISSING_LINK '+path+' '+href);
   if(statSync(file).isDirectory())assert.ok(existsSync(join(file,'index.html')),'MISSING_INDEX '+file);
  }
 }
});
test('Package all subpage styles and linked SiteForge product pages',()=>{
 for(const path of ['assets/product-pages.css','siteforge/index.html','siteforge/signature/index.html','siteforge/lab/index.html','assets/r202-three.css','assets/r202-scene.bundle.mjs']){
  assert.ok(existsSync(join(root,path)),path);
 }
 const css=readFileSync(join(root,'assets/product-pages.css'),'utf8');
 assert.ok(css.length>1000,'product-page styles empty');
});
test('One shared bundle and self-hosted GPU resources',()=>{
 const html=readFileSync(join(root,'r202/index.html'),'utf8');
 assert.equal((html.match(/r202-scene.bundle.mjs/g)||[]).length,1);
 for(const gpu of ['d-nvidia.json','m-nvidia.json','d-amd.json'])assert.ok(existsSync(join(root,'assets/r202-gpu-benchmarks',gpu)));
});
