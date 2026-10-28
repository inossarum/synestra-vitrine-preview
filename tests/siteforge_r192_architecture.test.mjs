import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import test from 'node:test';
import assert from 'node:assert/strict';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const read=x=>readFileSync(join(root,x),'utf8');
const prev=read('r191/index.html'),current=read('r192/index.html');
const css=read('assets/r192-experience.css'),js=read('assets/r192-experience.js');
const routes=['','connect/','bridge/','siteforge/','offres/'];
test('R192: isolated architecture, base and existing GPU unchanged',()=>{
  assert.ok(existsSync(join(root,'r191/index.html')));
  assert.ok(current.includes('siteforge-r190-hover-flux.js'));
  assert.equal((current.match(/<canvas class="core-r109-canvas"/g)||[]).length,1);
  assert.equal((current.match(/class="r192-floor"/g)||[]).length,1);
  assert.equal((current.match(/class="r189-system-map"/g)||[]).length,0);
  assert.equal((current.match(/class="core-r108-links"/g)||[]).length,0);
  assert.ok(prev.includes('class="r189-system-map"'));
  assert.equal((current.match(/id="hero-title"/g)||[]).length,1);
  assert.ok(current.indexOf('class="r192-product-rail"')<current.indexOf('id="plateforme"'));
});
test('R192: metal light physically grouped, no extra texture or GPU',()=>{
  for(const cls of ['r192-floor-grid','r192-floor-sheen','r192-floor-reflection','r192-floor-light','r192-light-falloff'])assert.ok(current.includes(cls));
  assert.match(css,/perspective\(720px\) rotateX\(66deg\)/);
  assert.match(css,/-webkit-box-reflect/);
  assert.match(css,/r192-reflected-light/);
  assert.ok(!/new WebGLRenderingContext|createElement\(['"]canvas/.test(js));
  assert.equal((current.match(/<canvas\b/g)||[]).length,1);
});
test('R192: same-origin CSS allowed but no external domains or script weakening',()=>{
  assert.match(current,/style-src 'self' 'unsafe-inline'/);
  assert.match(current,/script-src 'self'/);
  assert.match(current,/default-src 'none'/);
  assert.ok(!current.includes('https://cdn.'));
  assert.match(current,/href="\.\.\/assets\/r192-experience\.css"/);
});
test('R192: every primary page shares motion and retains route',()=>{
 for(const suffix of routes){
  const html=read('r192/'+suffix+'index.html');
  assert.equal((html.match(/r192-experience\.js/g)||[]).length,1);
  assert.equal((html.match(/r192-experience\.css/g)||[]).length,1);
  assert.match(html,/noindex,nofollow/);
  assert.ok(html.includes('href='));
 }
});
test('R192: scroll enhancement progressive, accessible, motion-safe',()=>{
  assert.match(js,/IntersectionObserver/);
  assert.match(js,/prefers-reduced-motion: reduce/);
  assert.match(js,/r192-motion-ready/);
  assert.match(js,/r192-chapter-marker/);
  assert.match(js,/requestAnimationFrame\(updateProgress\)/);
  assert.match(js,/window\.addEventListener\('scroll',onScroll,\{passive:true\}\)/);
  assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
  assert.match(css,/pointer-events:none/);
  assert.match(css,/html\.r192-motion-ready/);
});
test('R192 failure first: no WebGL canvas or external style must fail',()=>{
  function validate(page){
    assert.equal((page.match(/<canvas class="core-r109-canvas"/g)||[]).length,1);
    assert.match(page,/style-src 'self' 'unsafe-inline'/);
    assert.ok(!page.includes('https://cdn.'));
  }
  assert.throws(()=>validate(current.replace('class="core-r109-canvas"','class="wrong"')));
  assert.throws(()=>validate(current.replace("style-src 'self' 'unsafe-inline'","style-src 'unsafe-inline'")));
  assert.throws(()=>validate(current+'https://cdn.invalid/test.css'));
});

test('R192: local assets and navigation targets must exist',()=>{
  for(const suffix of routes){
    const source=read('r192/'+suffix+'index.html');
    const baseUrl=new URL('http://127.0.0.1:18850/r192/'+suffix);
    for(const attr of ['href','src']){
      const rx=new RegExp('\\b'+attr+'="([^"]+)"','g');
      for(const match of source.matchAll(rx)){
        const value=match[1];
        if(value.startsWith('#')){
          const id=value.slice(1);
          if(id)assert.ok(source.includes('id="'+id+'"'),'missing #'+id+' in '+suffix);
          continue;
        }
        const url=new URL(value,baseUrl);
        if(url.origin!==baseUrl.origin)continue;
        const target=join(root,url.pathname.replace(/^\//,''));
        assert.ok(existsSync(target)||existsSync(join(target,'index.html')),
          suffix+' '+attr+'='+value+' not found');
      }
    }
  }
});
