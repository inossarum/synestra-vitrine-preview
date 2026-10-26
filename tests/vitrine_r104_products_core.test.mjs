import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const read=(p)=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const home=read('index.html');
const css=read('assets/product-pages.css');
const pages=Object.fromEntries(['connect','bridge','offres'].map(n=>[n,read(n+'/index.html')]));
test('R106: cinematic SVG reactor with three keyboard-reachable ports and reduced motion',()=>{
 assert.match(home,/class="system-stage core-r106-stage"/);
 assert.doesNotMatch(home,/<img class="official-hero-logo"/);
 assert.match(home,/<svg class="core-r106-svg" viewBox="0 0 680 530"/);
 for(const item of ['r106-metal','r106-metal2','r106-plasma','core-r106-iris','core-r106-front','core-r106-back','core-r106-turbine','core-r106-links','core106-rotation'])
  assert.ok(home.includes(item),item);
 assert.match(home,/prefers-reduced-motion:reduce/);
 assert.match(home,/class="brand-banner-r99" src="\.\/assets\/synestra-studio-header-y-r99.webp"/);
 assert.match(home,/class="nav-explore"/);
 assert.match(home,/class="container r105-orientation"/);
 assert.match(home,/VISUALISATION CONCEPTUELLE · NON LIVE/);
 for(const slug of ['siteforge','connect','bridge']){
  assert.match(home,new RegExp('<a href="\\./'+slug+'/" class="core-r106-link'));
 }
 assert.match(home,/<a href="\.\/connect\/" class="core-r106-link link-connect"/);
});

test('R104: Connect, Bridge and offers are linked from homepage and exist',()=>{
 for(const slug of Object.keys(pages)){
  assert.match(home,new RegExp('href="\\./'+slug+'/"'));
  assert.ok(existsSync(new URL('../'+slug+'/index.html',import.meta.url)));
  assert.equal((pages[slug].match(/<h1\b/g)||[]).length,1,slug);
  assert.match(pages[slug],/\.\.\/assets\/product-pages.css/);
  assert.match(pages[slug],/\.\.\/assets\/synestra-studio-header-y-r99.webp/);
  assert.match(pages[slug],/noindex,nofollow/);
  assert.match(pages[slug],/default-src 'none'; style-src 'self'; img-src 'self'/);
  assert.doesNotMatch(pages[slug],/<script\b|<iframe\b|<form\b/i);
 }
 assert.match(home,/href="\.\/offres\/#bridge"/);
});
test('R104: Connect uses honest architecture and Bridge has offers and actual distribution status',()=>{
 assert.match(pages.connect,/PASSERELLE MCP/);
 assert.match(pages.connect,/Central Skills|CENTRAL SKILLS/);
 assert.match(pages.connect,/ne garantit pas|ne garantit pas qu|ne garantit/);
 assert.match(pages.bridge,/href="\.\.\/offres\/#bridge"/);
 assert.match(pages.bridge,/installateur Bridge signé/);
 assert.match(pages.bridge,/aucun bouton ne prétend télécharger/);
 assert.match(pages.offres,/id="bridge"/);
 assert.match(pages.offres,/id="connect"/);
 assert.match(pages.offres,/Téléchargement indisponible/);
 for(const s of Object.values(pages)){
  assert.doesNotMatch(s,/href="[^"]+\.(?:msix|exe|zip)"/i);
  assert.doesNotMatch(s,/\b(?:9,99\s*€|14,99\s*€|\/mois)\b/i);
 }
});
test('R104: shared R99 tokens, semantic navigation and accessible motion rules',()=>{
 for(const token of ['--ink:#060b12','--panel:#141f2c','--cyan:#00c4f1','--violet:#8a58ec','--teal:#20dba9'])assert.ok(css.includes(token),token);
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
 assert.match(css,/focus-visible/);
 assert.match(css,/@media\(max-width:620px\)/);
 for(const [name,html] of Object.entries(pages)){
  assert.match(html,/<a class="skip" href="#contenu">/);
  assert.match(html,/<main class="wrap" id="contenu" tabindex="-1">/);
  assert.match(html,/aria-label="Navigation principale"/);
  assert.match(html,/role="img" aria-label="/);
  if(name==='bridge')assert.match(html,/href="\.\.\/offres\/"/);
 }
});
test('R104: Cloudflare static export admits public routes, excludes project internals',()=>{
 const build=read('tools/build_vitrine_static.mjs');
 for(const path of ['connect/index.html','bridge/index.html','offres/index.html','assets/product-pages.css'])assert.ok(build.includes(path),path);
 assert.match(build,/const rootDirs=\['assets','siteforge','signal','connect','bridge','offres'\]/);
 assert.match(build,/assets:new Set\(\['\.avif','\.webp','\.png','\.jpg','\.jpeg','\.svg','\.css'\]\)/);
 assert.doesNotMatch(build,/rootDirs=\[[^\]]*'tests'/);
 assert.doesNotMatch(build,/child_process|execSync|spawn\(/);
});

test('R105: contextual chapter navigation and examples on all product pages',()=>{
 for(const html of Object.values(pages)){
  assert.match(html,/class="product-chapters"/);
  assert.match(html,/class="product-example"/);
  assert.match(html,/aria-label="Dans cette page"/);
 }
 assert.match(css,/\.product-chapters a:focus-visible/);
 assert.match(css,/prefers-reduced-motion:reduce/);
});

test('R106: reactor and product ports stay in the same hero stage',()=>{
 const scene=home.split('<div class="system-stage core-r106-stage"')[1]?.split('</section>')[0]||'';
 assert.match(scene,/class="core-r106-svg"/);
 assert.match(scene,/aria-label="Explorer les composants autour du Core"/);
 assert.equal((scene.match(/class="core-r106-link /g)||[]).length,3);
 assert.doesNotMatch(scene,/<script\\b|<iframe\\b|<form\\b/i);
});

test('R107: high-energy plasma composition uses original self-hosted SVG assets only',()=>{
 assert.match(home,/class="core-r107-aurora"/);
 assert.match(home,/class="core-r107-plasma-filaments"/);
 assert.match(home,/class="core-r107-discharge"/);
 assert.match(home,/class="core-r107-particles"/);
 assert.match(home,/class="core-r107-shockwave"/);
 assert.match(home,/class="core-r107-flash"/);
 for(const id of ['r107-electric','r107-violet','r107-reactor-flare','r107-neon-glow','r107-aurora-blur']){
  assert.equal((home.match(new RegExp('id="'+id+'"','g'))||[]).length,1,id);
 }
 for(const keyframe of ['r107-field-spin','r107-electric-crawl','r107-arcs-flicker','r107-spark','r107-shockwave','r107-core-breath']){
  assert.match(home,new RegExp('@keyframes '+keyframe));
 }
 assert.doesNotMatch(home,/<script\\b|<foreignObject\\b|<iframe\\b/i);
});
test('R107: fallback rendering remains usable when animations are disabled',()=>{
 assert.match(home,/@media\\(prefers-reduced-motion:reduce\\)\\{\\.core-r107-aurora/);
 assert.match(home,/\\.core-r107-discharge\\{opacity:\\.48\\}/);
 assert.match(home,/VISUALISATION CONCEPTUELLE · NON LIVE/);
 const scene=home.split('<div class="system-stage core-r106-stage"')[1]?.split('</section>')[0]||'';
 assert.equal((scene.match(/class="core-r106-link link-/g)||[]).length,3);
 assert.match(scene,/aria-label="Explorer les composants autour du Core"/);
});
