import test from'node:test';
import assert from'node:assert/strict';
import{readFileSync,existsSync}from'node:fs';
import{join,dirname}from'node:path';
import{fileURLToPath}from'node:url';
import{createHash}from'node:crypto';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>readFileSync(join(root,p),'utf8');
const home=read('r194/index.html'),base=readFileSync(join(root,'r193/index.html'));
const css=read('assets/r194-editorial.css'),js=read('assets/r194-scroll.js');
const pages=['','connect/','bridge/','siteforge/','offres/'];
test('R194: source R193 byte-pinned, original WebGL unchanged',()=>{
 assert.equal(createHash('sha256').update(base).digest('hex'),
  '3d5981b20171a6d4bbf45d8356d33c3d24af638b122c6e354c8d0313d6293dca');
 assert.equal(createHash('sha256').update(readFileSync(join(root,'assets/siteforge-r190-hover-flux.js'))).digest('hex'),
 'd5b64dfccba2096d6cc6f1198a4656c6320569ff627caf11f84fb5eb0e493eae');
 assert.equal((home.match(/<canvas class="core-r109-canvas"/g)||[]).length,1);
 assert.equal((home.match(/<h1\b/g)||[]).length,1);
 assert.match(home,/syn-r194-home/);
});
test('R194: 8 genuine new chapters replace R193 repeated copy',()=>{
 for(const id of ['vision','systeme','siteforge','approche','exemples','confiance','questions','acces-pilote']){
  assert.equal((home.match(new RegExp('id="'+id+'"','g'))||[]).length,1,id);
 }
 for(const legacy of ['class="product-grid"','class="examples-grid"','class="trust-layout"','class="siteforge-gallery"']){
  assert.ok(!home.includes(legacy),'Old layout still present '+legacy);
 }
 assert.equal((home.match(/class="r194-product-copy"/g)||[]).length,3);
 assert.equal((home.match(/class="r194-lab-card /g)||[]).length,3);
 assert.equal((home.match(/data-r194-step=/g)||[]).length,4);
 assert.match(home,/phase pilote/i);assert.match(home,/réalisations client vérifiées/i);
});
test('R194: smaller plasma, localized ground light, no reflection',()=>{
 assert.match(css,/\.syn-r194-home \.r192-scene \.core-r109-canvas/);
 assert.match(css,/scale\(\.56\)!important/);
 assert.match(css,/width:min\(36%,480px\)/);
 assert.match(css,/rgba\(144,93,205,\.13\)/);
 assert.match(css,/rgba\(67,160,117,\.16\)/);
 assert.ok(!/box-reflect:below/.test(css));
 assert.ok(!/r192-floor-reflection/.test(home));
});
test('R194: 5 real route changes keep actual existing copy plus new product trace',()=>{
 for(const slug of pages){
  const path='r194/'+slug+'index.html',content=read(path);
  assert.equal((content.match(/r194-editorial\.css/g)||[]).length,1);
  assert.equal((content.match(/r194-scroll\.js/g)||[]).length,1);
  assert.equal((content.match(/r192-experience\.js/g)||[]).length,0,'Duplicate scroll controller on '+slug);
  assert.equal((content.match(/<h1\b/g)||[]).length,1);
  assert.match(content,/noindex,nofollow/);
  assert.match(content,/synestra-studio-official-header.webp/);
  if(slug){
   assert.match(content,/class="r194-product-principle"/);
   assert.match(content,/class="intro r194-product-intro"/);
   assert.match(content,/class="r194-principle-graph"/);
  }
 }
});
test('R194: navigation href/src all resolve within local preview and source demos',()=>{
 for(const slug of pages){
  const content=read('r194/'+slug+'index.html');
  const url=new URL('http://127.0.0.1:18850/r194/'+slug);
  for(const type of ['href','src']){
   for(const match of content.matchAll(new RegExp('\\b'+type+'="([^"]+)"','g'))){
    const ref=match[1];
    if(ref.startsWith('#')){
     if(ref.length>1)assert.ok(content.includes('id="'+ref.slice(1)+'"'),slug+' anchor '+ref);
     continue;
    }
    const u=new URL(ref,url);
    if(u.origin!==url.origin)continue;
    const f=join(root,u.pathname.replace(/^\//,''));
    assert.ok(existsSync(f)||existsSync(join(f,'index.html')),slug+' '+ref);
   }
  }
 }
});
test('R194: semantic navigation, keyboard and accessible reduced motion',()=>{
 assert.match(home,/class="r194-lab-mosaic"/);
 assert.match(home,/aria-labelledby="hero-title"/);
 assert.match(home,/class="skip" href="#contenu"/);
 assert.match(css,/prefers-reduced-motion:reduce/);
 assert.match(js,/IntersectionObserver/);
 assert.match(js,/aria-current/);
 assert.match(js,/reduce.matches/);
 assert.match(css,/\.r194-rail a:focus-visible/);
});
test('R194: scroll reflow checks and method/rail state are real enhancements',()=>{
 assert.match(js,/data-r194-step/);
 assert.match(js,/is-current/);
 assert.match(js,/r194-track-fill/);
 assert.match(js,/requestAnimationFrame\(update\)/);
 assert.match(js,/addEventListener\('scroll',onScroll,\{passive:true\}\)/);
 assert.match(css,/\.r194-method-sticky\{position:sticky/);
 assert.match(css,/@media\(max-width:720px\)/);
});
test('R194 failure first: duplicate GPU, removed chapter, unsafe link rejected',()=>{
 const validate=s=>{
  assert.equal((s.match(/<canvas class="core-r109-canvas"/g)||[]).length,1);
  assert.equal((s.match(/class="r194-product-copy"/g)||[]).length,3);
  assert.ok(!s.includes('href="javascript:'));
 };
 assert.throws(()=>validate(home.replace('</main>','<canvas class="core-r109-canvas"></canvas></main>')));
 assert.throws(()=>validate(home.replace('class="r194-product-copy"','class="removed"')));
 assert.throws(()=>validate(home+'<a href="javascript:alert(1)">unsafe</a>'));
});
