import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const read=(p)=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const home=read('index.html');
const css=read('assets/product-pages.css');
const pages=Object.fromEntries(['connect','bridge','offres'].map(n=>[n,read(n+'/index.html')]));
test('R104: no central brand image; animated energy Core with reduced-motion escape',()=>{
 assert.match(home,/class="system-core syn-core-r104"/);
 assert.doesNotMatch(home,/<img class="official-hero-logo"/);
 for(const selector of ['core-dynamo','core-plasma','core-containment','core-particle','@keyframes core-rotation','@keyframes core-beat'])
  assert.ok(home.includes(selector),selector);
 assert.match(home,/@media\(prefers-reduced-motion:reduce\)\{\.syn-core-r104/);
 assert.match(home,/class="brand-banner-r99" src="\.\/assets\/synestra-studio-header-y-r99.webp"/);
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
