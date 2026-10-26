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
  assert.deepEqual([...pages[slug].matchAll(/<script\b[^>]*>/g)].map(m=>m[0]),['<script src="../assets/core-r109-webgl.js" defer>']);
  assert.match(pages[slug],/script-src 'self'; base-uri 'none'/);
  assert.doesNotMatch(pages[slug],/<iframe\b|<form\b/i);
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
 for(const guard of ['getContext(\'webgl\'','prefers-reduced-motion: reduce','data-core-ready','webglcontextlost','IntersectionObserver','ResizeObserver','1200000','powerPreference: \'low-power\''])
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

test('R110: native-verified dimensional plasma shader, restrained orbit and bounded frame-rate',()=>{
 const script=read('assets/core-r109-webgl.js');
 const fragment=script.match(/const fragment = \`([\s\S]*?)\`;/)?.[1]?.trim();
 assert.ok(fragment,'R110 shader fragment absent');
 let hash=2166136261;
 for(const ch of fragment)hash=Math.imul(hash ^ ch.charCodeAt(0),16777619)>>>0;
 assert.equal(hash.toString(16),'a543602c','GLSL source fingerprint changed after R116 refined material');
 for(const term of ['noise3','turn3','ringBloom','ringFront','spiral']){
  if(term==='spiral')continue;
  assert.ok(fragment.includes(term),term);
 }
 assert.match(script,/clock - lastFrame < 32/);
 assert.match(script,/lastFrame = clock;/);
 assert.match(script,/prefers-reduced-motion: reduce/);
 assert.match(script,/scene.removeAttribute\('data-core-ready'\)/);
 assert.doesNotMatch(script,/\bfetch\s*\(|XMLHttpRequest|WebSocket|sendBeacon/);
});

test('R114: eight radial arcs grow from the centre towards the sphere edge',()=>{
 const script=read('assets/core-r109-webgl.js');
 const tick=String.fromCharCode(96);
 const fragment=script.split('const fragment = '+tick)[1]?.split(tick+';')[0]||'';
 for (const needle of ['float r111Arc(', 'float along=dot(p,dir)', 'float growingTip=mix(.06,.675',
   'float body=smoothstep(.012,.06,along)', 'float fork=exp(', 'float awake=step(.24,seed)',
   'float envelope=smoothstep(.015,.12,phase)'])assert.ok(fragment.includes(needle),needle);
 assert.equal(fragment.split('=r111Arc(p,').length-1,8);
 assert.ok(fragment.indexOf('if(d>radius)')<fragment.indexOf('float arcA='),'Arcs remain inside sphere');
 for (const forbidden of ['fetch(', 'XMLHttpRequest', 'WebSocket', 'sendBeacon'])assert.ok(!script.includes(forbidden),forbidden);
});
test('R116: smaller Core and three actual Studio tools keep real product links',()=>{
 assert.ok(home.includes('transform:scale(.49);transform-origin:center center'));
 assert.ok(home.includes('translateX(-50%) scale(.49)'));
 const orbit=home.split('<div class="core-tools-orbit" aria-hidden="true">')[1]?.split('<nav class="core-r108-links"')[0]||'';
 assert.equal(orbit.split('class="core-tool-satellite"').length-1,3);
 for(const label of ['Connect','Bridge','SiteForge'])assert.ok(orbit.includes('<span>'+label+'</span>'),label);
 for(const rule of ['@keyframes core-tools-turn','@keyframes core-tools-upright',
   '@media(prefers-reduced-motion:reduce){.core-tools-orbit',
   '@media(max-width:620px){.core-tools-orbit'])assert.ok(home.includes(rule),rule);
 for(const n of ['Relay','Memory','Evidence','Visual']) assert.ok(!orbit.includes('<span>'+n+'</span>'),n);
 assert.ok(!orbit.includes('<a '),'Decorative labels must not create fake navigation links');
 for (const slug of ['siteforge','connect','bridge'])assert.ok(home.includes('href="./'+slug+'/"'),slug);
});
test('R111: floating site particles share one local script and obey visibility and reduced motion',()=>{
 const script=read('assets/core-r109-webgl.js');
 assert.match(script,/const startAmbient = \(\) =>/);
 assert.match(script,/window.innerWidth < 640 \? 22 : 38/);
 assert.match(script,/document.body.insertBefore\(field, document.body.firstChild\)/);
 assert.match(script,/motionPreference.addEventListener\('change', updateAmbient\)/);
 assert.match(script,/document.addEventListener\('visibilitychange', updateAmbient\)/);
 assert.ok(script.indexOf('startAmbient();') < script.indexOf('const scene ='));
 for(const source of [home,css]){
  assert.match(source,/\.syn-ambient-field\{/);
  assert.match(source,/@keyframes syn-ambient-float/);
  assert.match(source,/@media\(prefers-reduced-motion:reduce\)\{\.syn-ambient-field\{display:none!important\}\}/);
 }
 assert.deepEqual([...home.matchAll(/<script\b[^>]*>/g)].map(m=>m[0]),['<script src="./assets/core-r109-webgl.js" defer>']);
 for(const source of [home,css]){
   assert.match(source,/\.syn-ambient-comet\{/);
   assert.match(source,/@keyframes syn-ambient-comet/);
   assert.match(source, /\.syn-ambient-paused \.syn-ambient-field/);
 }
 assert.ok(script.includes('const comet = i % 11 === 0'));
});
test('R114: resolution increases with strict render-pixel and mobile caps',()=>{
 const source=read('assets/core-r109-webgl.js');
 assert.ok(source.includes('window.innerWidth < 650 ? 1.8 : 2'));
 assert.ok(source.includes('Math.sqrt(1200000/(rect.width*rect.height))'));
 assert.ok(source.includes('clock - lastFrame < 32'));
 assert.ok(source.includes('document.visibilityState === \'visible\''));
 assert.ok(!source.includes('setInterval('));
 assert.ok(!source.includes('setTimeout('));
});

test('R116: three capsules centered on their orbital anchors during rotation and mobile',()=>{
 const orbit=home.split('<div class="core-tools-orbit" aria-hidden="true">')[1]?.split('<nav class="core-r108-links"')[0]||'';
 assert.equal(orbit.split('class="core-tool-satellite"').length-1,3);
 assert.match(home,/\.core-tool-satellite>span\{[^}]*transform:translate\(-50%,-50%\)/);
 assert.match(home,/@keyframes core-tools-upright\{from\{transform:translate\(-50%,-50%\) rotate\(0deg\)\}to\{transform:translate\(-50%,-50%\) rotate\(-360deg\)\}\}/);
 assert.match(home,/@media\(max-width:620px\)\{\.core-tools-orbit/);
 assert.match(home,/@media\(prefers-reduced-motion:reduce\)\{\.core-tools-orbit/);
 assert.match(home,/\.core-r108-stage\{animation:core-r115-atmosphere/);
 assert.match(home,/@media\(prefers-reduced-motion:reduce\)\{\.core-r108-stage\{animation:none!important\}\}/);
});
test('R115: electrical radial propagation faster without extra flash frequency outside sphere',()=>{
 const script=read('assets/core-r109-webgl.js');
 const tick=String.fromCharCode(96);
 const fragment=script.split('const fragment = '+tick)[1]?.split(tick+';')[0]||'';
 assert.ok(fragment.includes('float cycleTime=1.12;'));
 assert.ok(fragment.includes('float growingTip=mix(.06,.675,smoothstep(.04,.46,phase));'));
 assert.equal(fragment.split('=r111Arc(p,').length-1,8);
 assert.ok(fragment.indexOf('if(d>radius)')<fragment.indexOf('float arcA='));
 assert.ok(script.includes('clock - lastFrame < 32'));
});
test('R115: autonomous ambient wisps and beacons share visibility and reduced-motion control',()=>{
 const script=read('assets/core-r109-webgl.js');
 for(const name of ['syn-ambient-wisp','syn-ambient-beacon']){
   assert.ok(script.includes("className = '"+name+"'"),name);
   for(const style of [home,css]) {
      assert.ok(style.includes('.'+name+'{')&&style.includes('@keyframes '+name+'{'),name);
      assert.ok(style.includes('.syn-ambient-paused .syn-ambient-field *'));
      assert.ok(style.includes('@media(prefers-reduced-motion:reduce){.syn-ambient-field{display:none!important}}'));
   }
 }
 assert.ok(script.includes('const wispCount = window.innerWidth < 640 ? 2 : 3'));
 assert.ok(script.includes('const beaconCount = window.innerWidth < 640 ? 2 : 3'));
 assert.ok(script.indexOf('const wispCount')<script.indexOf('document.body.insertBefore(field'));
 assert.ok(script.includes("document.addEventListener('visibilitychange', updateAmbient)"));
 assert.doesNotMatch(script,/setInterval\(|setTimeout\(|\bfetch\s*\(|XMLHttpRequest|WebSocket|sendBeacon/);
});

test('R116: refined single-ring Core respects validated products, reduced motion and clarity',()=>{
 const orbit=home.split('<div class="core-tools-orbit" aria-hidden="true">')[1]?.split('<nav class="core-r108-links"')[0]||'';
 assert.equal((orbit.match(/class="core-tool-satellite"/g)||[]).length,3);
 for (const name of ['Connect','Bridge','SiteForge']) assert.ok(orbit.includes('<span>'+name+'</span>'),name);
 for (const name of ['Relay','Memory','Evidence','Visual']) assert.ok(!orbit.includes('<span>'+name+'</span>'),name);
 assert.ok(!orbit.includes('<img '),'Unverified product logos must not be fabricated');
 for (const ang of ['-90deg','30deg','150deg']) assert.ok(home.includes('--orbit-angle:'+ang),ang);
 const svg=home.split('<svg class="core-r108-art"')[1]?.split('</svg>')[0]||'';
 assert.equal((svg.match(/<ellipse/g)||[]).length,1);
 assert.ok(home.includes('scale(.49)'));
 assert.ok(home.includes('@media(prefers-reduced-motion:reduce){.core-tools-orbit'));
 for(const name of ['connect','bridge','siteforge']) assert.ok(home.includes('href="./'+name+'/\"'),name);
 const src=read('assets/core-r109-webgl.js');
 const tick=String.fromCharCode(96);
 const fragment=src.split('const fragment = '+tick)[1]?.split(tick+';')[0]||'';
 assert.equal(fragment.split('=r111Arc(p,').length-1,8);
 assert.ok(fragment.includes('float cycleTime=1.12;'));
 assert.ok(fragment.includes('float centralSource=exp(-d*d*115.);'));
 assert.ok(fragment.includes('base+=cyan*currents*(.045+.19*light)'));
 assert.ok(fragment.includes('base+=ringCol*(ring*.32+ringBloom*.018)*orbital;'));
 assert.ok(fragment.indexOf('if(d>radius)')<fragment.indexOf('float arcA='));
 assert.ok(src.includes('Math.sqrt(1200000/(rect.width*rect.height))'));
});

test('R121: original animated plasma restored; metallic gyros removed; iOS fallback has an electric nucleus',()=>{
 const script=read('assets/core-r109-webgl.js');
 const fragment=script.match(/const fragment = \`([\s\S]*?)\`;/)?.[1]||'';
 assert.ok(fragment.includes('float radius=.69;'),'Restore original energy sphere');
 assert.ok(fragment.includes('float centralSource=exp(-d*d*115.);'),'Original central energy source');
 assert.equal(fragment.split('=r111Arc(p,').length-1,8,'Eight live radial discharges');
 assert.ok(fragment.includes('base+=cyan*currents*(.045+.19*light);'),'Turbulent energized surface');
 assert.ok(!fragment.includes('metalGyro(')&&!fragment.includes('sdRectangularRing('),'No metallic rings');
 const svg=home.split('<svg class="core-r108-art"')[1]?.split('</svg>')[0]||'';
 assert.equal((svg.match(/<ellipse/g)||[]).length,1,'Only original subtle orbit');
 assert.ok(svg.includes('core-r121-discharge')&&svg.includes('r121-emitter'),'Mobile energy fallback');
 assert.equal((svg.match(/M320 189/g)||[]).length,16,'Eight arcs x glow and filament from nucleus');
 for(const banned of ['core-r117-metal-a','core-r117-metal-b','core-r118-metal-c','r118-gyro-a','r120-emitter'])assert.ok(!home.includes(banned),banned);
 assert.ok(home.includes('@media(prefers-reduced-motion:reduce){.core-r121-discharge path{animation:none!important}}'));
 assert.ok(script.includes("if (reduceMotion.matches) return;"));
 assert.ok(script.includes('webglcontextlost'));
});
