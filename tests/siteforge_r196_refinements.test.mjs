import test from 'node:test';import assert from'node:assert/strict';
import {readFileSync,existsSync} from'node:fs';import {join,dirname} from'node:path';
import {fileURLToPath} from'node:url';import {createHash} from'node:crypto';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>readFileSync(join(root,p),'utf8');
const h=read('r196/index.html'),c=read('assets/r196-refinements.css');
const paths=['','connect/','bridge/','siteforge/','offres/'];
test('R195 pinned, R196 independent and no extra canvas',()=>{
 assert.equal(createHash('sha256').update(readFileSync(join(root,'r195/index.html'))).digest('hex'),
 'a7fa506400c2f36d47b59d5a1e9d44c2efe050bf577f6eacb14c48e50adb9f30');
 assert.equal((h.match(/<canvas class="core-r109-canvas"/g)||[]).length,1);
 assert.equal((h.match(/r196-core-apparatus/g)||[]).length,1);
 assert.match(h,/syn-r196-home/);
});
test('Core body: two metal arcs, equator, grounded light marker, side data',()=>{
 for(const s of ['r196-core-arc-a','r196-core-arc-b','r196-core-equator','r196-core-datum-left','r196-core-datum-right','r196-core-beacon'])assert.ok(h.includes(s),s);
 assert.match(c,/\.r196-core-apparatus\{position:absolute/);
 assert.match(c,/z-index:5;pointer-events:none/);
 assert.match(c,/r196-orbit-b 41s/);
 assert.match(c,/prefers-reduced-motion:reduce/);
});
test('Ch2 follows no mouse glow and CTA has visible body without hover',()=>{
 assert.match(c,/\.syn-r196-home \.r194-product \.r194-product-art:after/);
 assert.match(c,/content:none!important;opacity:0!important;display:none!important/);
 assert.match(c,/\.syn-r196-home \.r194-product-copy a\{/);
 assert.match(c,/min-height:51px/);
 assert.match(c,/border:1px solid rgba\(153,213,188,.54\)/);
});
test('Ch3 follow-pointer effect is masked 1px rim only, not surface bloom',()=>{
 assert.match(c,/\.syn-r196-home \.r194-lab-card:after/);
 assert.match(c,/padding:1px;border-radius:inherit/);
 assert.match(c,/mask-composite:exclude/);
 assert.match(c,/at var\(--r195-x,50%\) var\(--r195-y,50%\)/);
});
test('Product pages have no principle radial halo',()=>{
 assert.match(c,/\.syn-r196-product \.r194-product-principle:after/);
 assert.match(c,/display:none!important;content:none!important/);
 assert.match(c,/\.syn-r196-product \.r194-principle-head/);
});
test('Five routes preserve source, no link regressions',()=>{
 for(const slug of paths){
  const doc=read('r196/'+slug+'index.html');
  assert.equal((doc.match(/r196-refinements\.css/g)||[]).length,1);
  assert.equal((doc.match(/<h1\b/g)||[]).length,1);
  assert.match(doc,/noindex,nofollow/);
  assert.equal((doc.match(/r195-interactions\.js/g)||[]).length,1);
  for(const m of doc.matchAll(/\b(?:href|src)="([^"]+)"/g)){
   const val=m[1];if(val.startsWith('#'))continue;
   const u=new URL(val,'http://localhost/r196/'+slug);if(u.origin!=='http://localhost')continue;
   const f=join(root,u.pathname.replace(/^\//,''));
   assert.ok(existsSync(f)||existsSync(join(f,'index.html')),slug+':'+val);
  }
 }
});
test('No reflection, new WebGL or unauthorized portal staging links',()=>{
 assert.doesNotMatch(h,/class="r192-floor-reflection"/);
 assert.doesNotMatch(c,/box-reflect:below|createElement\("canvas"\)/);
 assert.doesNotMatch(h,/synestra-client-portal-staging\.synestra-studio\.workers\.dev/);
});
test('Failure-first: no canvas, missing overlay or missing CTA is invalid',()=>{
 const validate=s=>{
  assert.equal((s.match(/<canvas class="core-r109-canvas"/g)||[]).length,1);
  assert.equal((s.match(/class="r196-core-apparatus"/g)||[]).length,1);
  assert.equal((s.match(/class="r194-product-copy"/g)||[]).length,3);
 };
 assert.throws(()=>validate(h.replace('class="r196-core-apparatus"','class="removed"')));
 assert.throws(()=>validate(h.replace('class="core-r109-canvas"','class="gone"')));
 assert.throws(()=>validate(h.replace('class="r194-product-copy"','class="gone"')));
});