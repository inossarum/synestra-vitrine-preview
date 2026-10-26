import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const read=(p)=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const home=read('index.html');
const css=read('assets/product-pages.css');
const pages=Object.fromEntries(['connect','bridge','offres'].map(n=>[n,read(n+'/index.html')]));
test('R108: one clean energy Core keeps three product links and the R99 brand',()=>{
 assert.match(home,/class="system-stage core-r108-stage core-r109-stage"/);
 assert.match(home,/<svg class="core-r108-art" viewBox="0 0 640 410"/);
 assert.equal((home.match(/id="r108-(?:aura|plasma|arc|halo)"/g)||[]).length,4);
 assert.match(home,/class="core-r108-heart"/);
 assert.match(home,/class="core-r108-orbit"/);
 assert.match(home,/class="brand-banner-r99" src="\.\/assets\/synestra-studio-header-y-r99.webp"/);
 assert.doesNotMatch(home,/<img class="official-hero-logo"/);
 assert.doesNotMatch(home,/class="core-r107-|class="core-r106-svg"/);
 assert.doesNotMatch(home,/class="motion-strip"|class="container r105-orientation"/);
 assert.match(home,/prefers-reduced-motion:reduce/);
 assert.match(home,/class="nav-explore"/);
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
 assert.match(build,/assets:new Set\(\['\.avif','\.webp','\.png','\.jpg','\.jpeg','\.svg','\.css','\.js'\]\)/);
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

test('R108: the core remains a navigable and accessible grouped scene',()=>{
 const scene=home.split('<div class="system-stage core-r108-stage core-r109-stage"')[1]?.split('</section>')[0]||'';
 assert.match(scene,/aria-label="Core Synestra/);
 assert.match(scene,/aria-label="Explorer Synestra"/);
 assert.equal((scene.match(/<a href="\.\/(?:siteforge|connect|bridge)\/"[ >]/g)||[]).length,3);
 assert.match(scene,/class="core-r108-note"/);
 assert.doesNotMatch(scene,/<script\b|<iframe\b|<form\b/i);
});
test('R109: WebGL Canvas is opt-in with a guaranteed SVG fallback and restricted script',()=>{
 assert.match(home, /<canvas class="core-r109-canvas" aria-hidden="true" width="960" height="570"><\/canvas>/);
 assert.match(home, /<svg class="core-r108-art" viewBox="0 0 640 410"/);
 assert.match(home, /class="system-stage core-r108-stage core-r109-stage"/);
 assert.deepEqual([...home.matchAll(/<script\b[^>]*>/g)].map(m=>m[0]),['<script src="./assets/core-r109-webgl.js" defer>']);
 assert.match(home, /script-src 'self'; base-uri 'none'/);
 assert.match(home, /core-r109-stage\[data-core-ready="true"\] \.core-r108-art\{opacity:0\}/);
 const script=read('assets/core-r109-webgl.js');
 for(const guard of ['getContext(\'webgl\'','prefers-reduced-motion: reduce','data-core-ready','webglcontextlost','IntersectionObserver','ResizeObserver','800000','powerPreference: \'low-power\''])
  assert.ok(script.includes(guard),guard);
 assert.match(script,/if \(reduceMotion\.matches\) return; \/\/ Static SVG fallback/);
 assert.match(script,/if \(reduceMotion\.matches\) scene\.removeAttribute\('data-core-ready'\)/);
 assert.doesNotMatch(script,/\bfetch\s*\(|XMLHttpRequest|WebSocket|sendBeacon|eval\s*\(|new Function/);
});
test('R108: reduced motion and visual simplification are enforced',()=>{
 assert.ok(home.includes('@media(prefers-reduced-motion:reduce){.core-r108-heart'));
 assert.match(home, /@keyframes r108-breathe/);
 assert.match(home, /@keyframes r108-current/);
 assert.doesNotMatch(home, /core-r107-discharge|core-r107-particles|core-r107-shockwave/);
 assert.doesNotMatch(home, /<div class="motion-strip"|<section class="container r105-orientation"/);
 assert.match(home, /Une même énergie, trois façons de donner vie à vos projets\./);
});
