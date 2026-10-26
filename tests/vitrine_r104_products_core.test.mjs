import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const read=(p)=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const home=read('index.html');
const css=read('assets/product-pages.css');
const pages=Object.fromEntries(['connect','bridge','offres'].map(n=>[n,read(n+'/index.html')]));
test('R105: multi-axis Core is purely conceptual and accessible',()=>{
 assert.match(home,/class="system-core syn-core-r104 syn-core-r105"/);
 assert.doesNotMatch(home,/<img class="official-hero-logo"/);
 for(const item of ['core-r105-gyro','core-r105-shell','core-r105-facet','core-r105-energy','r105-gyrA','r105-flux','class="core-r105-path path-forge"','class="core-r105-path path-connect"','class="core-r105-path path-bridge"'])
  assert.ok(home.includes(item),item);
 assert.match(home,/prefers-reduced-motion:reduce/);
 assert.match(home,/class="brand-banner-r99" src="\.\/assets\/synestra-studio-header-y-r99.webp"/);
 assert.match(home,/class="nav-explore"/);
 assert.match(home,/class="r105-orientation"/);
 assert.match(home,/Aucun état ou flux informatique en temps réel/);
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

test('R105: orbital stage maintains module nodes inside the same visual container',()=>{
 const visual=home.split('<div class="system-stage" role="img"')[1]?.split('<div class="motion-strip"')[0]||'';
 assert.match(visual,/core-r105-axis-label[^>]*>CORE \/ CONCEPTION VISUELLE<\/div>\s*<div class="system-node node-forge"/);
 assert.match(visual,/class="system-node node-connect"/);
 assert.match(visual,/class="system-node node-bridge"/);
 assert.doesNotMatch(visual,/core-r105-axis-label[^>]*>[^<]+<\/div>\s*<\/div>\s*<div class="system-node node-forge"/);
});
