import test from'node:test';import assert from'node:assert/strict';
import{readFileSync,existsSync}from'node:fs';import{join,dirname}from'node:path';
import{fileURLToPath}from'node:url';import{createHash}from'node:crypto';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>readFileSync(join(root,p),'utf8');
const base=readFileSync(join(root,'r194/index.html'));
const home=read('r195/index.html'),css=read('assets/r195-interactions.css'),js=read('assets/r195-interactions.js');
const pages=['','connect/','bridge/','siteforge/','offres/'];
test('R195 pinned R194 source, no additional GPU/canvas or source mutation',()=>{
 assert.equal(createHash('sha256').update(base).digest('hex'),'ff5c2e1276fb39d73623a47ecb7afb24e0b679679a04e6d667f7f07ea1ddc44d');
 assert.equal((home.match(/<canvas class="core-r109-canvas"/g)||[]).length,1);
 assert.equal((home.match(/<h1\b/g)||[]).length,1);
 assert.ok(!/createElement\(['"]canvas|WebGLRenderingContext/.test(js));
 assert.match(home,/siteforge-r190-hover-flux\.js/);
});
test('R195 genuinely revised first chapter with navigation, not inert decorative S',()=>{
 assert.equal((home.match(/class="r195-vision-link r195-tilt"/g)||[]).length,3);
 assert.ok(!home.includes('class="r194-signal-panel"'));
 for(const href of['./siteforge/','./connect/','./bridge/'])assert.ok(home.includes('href="'+href+'"'));
 assert.match(home,/class="r195-vision-system"/);
 assert.match(home,/Une idée\.<br><span>Des possibles\.<\/span>/);
});
test('R195 all five pages use one extra CSS and one hover script',()=>{
 for(const slug of pages){
  const h=read('r195/'+slug+'index.html');
  assert.equal((h.match(/r195-interactions\.css/g)||[]).length,1);
  assert.equal((h.match(/r195-interactions\.js/g)||[]).length,1);
  assert.equal((h.match(/r194-scroll\.js/g)||[]).length,1);
  assert.equal((h.match(/r192-experience\.js/g)||[]).length,0);
  assert.match(h,/noindex,nofollow/);
 }
});
test('R195 pointer interaction bounded and resettable, reduced motion',()=>{
 assert.match(js,/getBoundingClientRect/);
 assert.match(js,/max=el\.classList\.contains/);
 assert.match(js,/requestAnimationFrame\(render\)/);
 assert.match(js,/pointerleave/);
 assert.match(js,/cancelAnimationFrame/);
 assert.match(js,/reduce\.matches/);
 assert.match(css,/prefers-reduced-motion:reduce/);
 assert.match(css,/pointer:coarse/);
});
test('R195 chapter-specific interactions and subtle CSS 3D are implemented',()=>{
 for(const s of ['r194-product-forge','r194-product-connect','r194-product-bridge','r194-lab-card','r194-method-steps','r194-needs-list','r194-trust-stack','r194-end-art'])assert.ok(css.includes(s),s);
 assert.match(css,/perspective\(900px\)/);
 assert.match(css,/rotateX\(var\(--r195-rx/);
 assert.match(css,/rotateY\(var\(--r195-ry/);
});
test('R195 FAQ uses native semantics + conditional intrinsic height smoothing',()=>{
 assert.match(css,/@supports \(interpolate-size:allow-keywords\)/);
 assert.match(css,/::details-content/);
 assert.match(css,/block-size:auto/);
 assert.match(css,/content-visibility \.54s allow-discrete/);
 assert.match(js,/addEventListener\('toggle',update\)/);
 assert.match(home,/<details><summary>/);
});
test('R195 pilot linking is production-only and explicitly gated',()=>{
 const pilot='https://synestra-client-portal.synestra-studio.workers.dev/';
 assert.ok(home.includes('href="'+pilot+'"'));
 assert.ok(!home.includes('https://synestra-client-portal-staging.synestra-studio.workers.dev/'));
 assert.match(home,/ACCÈS CONTRÔLÉ/);
 assert.match(home,/protégé/);
 assert.match(read('r195/offres/index.html'),/Le portail pilote est protégé/);
});
test('R195 route references remain valid, including older SiteForge demos',()=>{
 for(const slug of pages){
 const h=read('r195/'+slug+'index.html');
 const url=new URL('http://localhost/r195/'+slug);
 for(const m of h.matchAll(/\b(?:href|src)="([^"]+)"/g)){
  const val=m[1];
  if(val.startsWith('#')){if(val.length>1)assert.ok(h.includes('id="'+val.slice(1)+'"'),slug+' anchor '+val);continue;}
  const u=new URL(val,url);if(u.origin!==url.origin)continue;
  const f=join(root,u.pathname.replace(/^\//,''));
  assert.ok(existsSync(f)||existsSync(join(f,'index.html')),slug+' '+val);
 }
 }
});
test('R195 failure first: invalid link, duplicate canvas, or staging CTA are rejected',()=>{
 function validate(v){
  assert.equal((v.match(/<canvas class="core-r109-canvas"/g)||[]).length,1);
  assert.ok(!v.includes('href="javascript:'));
  assert.ok(!v.includes('synestra-client-portal-staging.synestra-studio.workers.dev'));
 }
 assert.throws(()=>validate(home.replace('</main>','<canvas class="core-r109-canvas"></canvas></main>')));
 assert.throws(()=>validate(home+'<a href="javascript:alert(1)">bad</a>'));
 assert.throws(()=>validate(home+'<a href="https://synestra-client-portal-staging.synestra-studio.workers.dev/">staging</a>'));
});
