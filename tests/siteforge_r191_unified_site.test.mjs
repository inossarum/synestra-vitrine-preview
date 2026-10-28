import { readFileSync, existsSync } from 'node:fs';
import { join, dirname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import assert from 'node:assert/strict';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const pathTo={studio:'r191/index.html',connect:'r191/connect/index.html',bridge:'r191/bridge/index.html',siteforge:'r191/siteforge/index.html',offres:'r191/offres/index.html'};
const pages=Object.fromEntries(Object.entries(pathTo).map(([k,p])=>[k,readFileSync(join(root,p),'utf8')]));
const original=readFileSync(join(root,'r190-hero-hover-flux.html'),'utf8');
const ambient=readFileSync(join(root,'assets/r191-ambient.js'),'utf8');
const css=readFileSync(join(root,'assets/r191-system.css'),'utf8');
const base='http://127.0.0.1:18850/';
const origin=new URL(base);
function attrs(html,attr){
 const re=new RegExp('\\b'+attr+'="([^"]+)"','g');
 return [...html.matchAll(re)].map(m=>m[1]);
}
test('R191: five primary routes, common logo, full navigation, one ambient source',()=>{
 for(const [name,html] of Object.entries(pages)){
  assert.match(html,/class="[^"]*\bsyn-r191\b/);
  assert.match(html,/name="viewport"/);
  assert.match(html,/noindex,nofollow/);
  assert.equal((html.match(/r191-system\.css/g)||[]).length,1);
  assert.equal((html.match(/r191-ambient\.js/g)||[]).length,1);
  assert.equal((html.match(/<h1\b/g)||[]).length,1,name+' must have exactly one h1');
  assert.match(html,/synestra-studio-(header-y-r99|official-header)\.webp/);
  for(const route of ['connect/','bridge/','siteforge/','offres/'])assert.ok(html.includes(route));
 }
});
test('R191: no extra GPU; original pointer flow and CSP retained on Studio',()=>{
 const page=pages.studio;
 assert.equal((page.match(/<canvas\b/g)||[]).length,original.match(/<canvas\b/g).length);
 assert.match(page,/siteforge-r190-hover-flux\.js/);
 assert.equal((original.match(/<canvas\b/g)||[]).length,1);
 assert.equal((page.match(/<script\b/g)||[]).length,2);
 const csp=s=>s.match(/<meta http-equiv="Content-Security-Policy"[^>]+>/)?.[0];
 assert.equal(csp(page),csp(original));
 assert.ok(page.includes('<body class="r189-composition syn-r191 syn-r191-home">'));
});
test('R191 ambient is reused, bounded, non-interactive, reduced-motion safe',()=>{
 assert.match(ambient,/const startAmbient/);
 assert.match(ambient,/document\.body\.insertBefore\(field/);
 assert.match(ambient,/motionPreference\.matches/);
 assert.match(ambient,/visibilitychange/);
 assert.doesNotMatch(ambient,/getContext\(/);
 assert.match(css,/\.syn-ambient-field/);
 assert.match(css,/pointer-events:none/);
 assert.match(css,/prefers-reduced-motion:reduce/);
 assert.match(css,/\.syn-r191-product \.tile/);
 assert.match(css,/\.syn-r191-home/);
});
test('R191: CSP-tight SiteForge illustration has no inline styling',()=>{
 const page=pages.siteforge;
 assert.doesNotMatch(page,/\bstyle="/);
 assert.match(page,/style-src 'self'/);
 assert.match(page,/r191-sf-visual-grid/);
 assert.match(css,/\.r191-sf-visual-grid/);
});
test('R191: every local href/src/style/script target resolves to a real file',()=>{
 for(const [name,html] of Object.entries(pages)){
  const path=pathTo[name];
  const pageUrl=new URL(path,base);
  for(const attr of ['href','src']){
   for(const href of attrs(html,attr)){
    if(href.startsWith('#')) {
     const id=href.slice(1);
     if(id)assert.ok(html.includes('id="'+id+'"'),name+' missing internal anchor '+id);
     continue;
    }
    const url=new URL(href,pageUrl);
    if(url.origin!==origin.origin)continue;
    const route=url.pathname.replace(/^\//,'');
    const target=normalize(join(root,route));
    const actual=existsSync(target)?target:existsSync(join(target,'index.html'))?join(target,'index.html'):null;
    assert.ok(actual,name+' '+attr+'='+href+' -> '+target+' missing');
   }
  }
 }
});
