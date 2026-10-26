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
 assert.match(home,/class="core-r117-metal-a"/);
 assert.match(home,/class="core-r117-metal-b"/);
 assert.match(home,/class="core-r118-metal-c"/);
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
 assert.equal(hash.toString(16),'a77cb20a','GLSL source fingerprint changed after R117 depth-composited metallic gimbals');
 for(const term of ['noise3','turn3','metalGyro','sphereFrontZ']){
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
 for (const needle of ['float r111Arc(', 'float along=dot(p,dir)', 'float growingTip=mix(.045,.515',
   'float body=smoothstep(-.005,.014,along)', 'float fork=exp(', 'float awake=step(.24,seed)',
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
 assert.ok(fragment.includes('float growingTip=mix(.045,.515,smoothstep(.04,.46,phase));'));
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
 assert.equal((svg.match(/<ellipse/g)||[]).length,3);
 assert.ok(home.includes('scale(.49)'));
 assert.ok(home.includes('@media(prefers-reduced-motion:reduce){.core-tools-orbit'));
 for(const name of ['connect','bridge','siteforge']) assert.ok(home.includes('href="./'+name+'/\"'),name);
 const src=read('assets/core-r109-webgl.js');
 const tick=String.fromCharCode(96);
 const fragment=src.split('const fragment = '+tick)[1]?.split(tick+';')[0]||'';
 assert.equal(fragment.split('=r111Arc(p,').length-1,8);
 assert.ok(fragment.includes('float cycleTime=1.12;'));
 assert.ok(fragment.includes('float emitterCore=exp(-d*d*1750.);'));
 assert.ok(fragment.includes('base+=cyan*currents*(.045+.19*light)'));
 assert.ok(fragment.includes('vec4 metalA=metalGyro(p,time,1.,metalDepthA);'));
 assert.ok(fragment.indexOf('if(d>radius)')<fragment.indexOf('float arcA='));
 assert.ok(src.includes('Math.sqrt(1200000/(rect.width*rect.height))'));
});

test('R117: two visible brushed-metal gimbals with proper SVG front/back paint order',()=>{
 const svg=home.split('<svg class="core-r108-art"')[1]?.split('</svg>')[0]||'';
 assert.equal((svg.match(/<ellipse/g)||[]).length,3);
 for(const id of ['r117-titanium','r117-platinum','r118-tungsten'])assert.ok(svg.includes('id="'+id+'"'),id);
 for(const name of ['core-r117-metal-a','core-r117-metal-b','core-r118-metal-c']) {
  assert.equal((svg.match(new RegExp('class="'+name+'"','g'))||[]).length,2,name);
  assert.ok(home.includes('.'+name+'{animation:'),name);
 }
 const heart=svg.indexOf('class="core-r108-heart"');
 const back=svg.indexOf('<!-- R117: back halves');
 const front=svg.indexOf('<!-- Front halves');
 assert.ok(back>=0&&back<heart&&heart<front,'Metal back layers must be painted first and front layers last');
 assert.ok(svg.includes('M164 189 A156 72 0 0 0 476 189'));
 assert.ok(svg.includes('M181 189 A139 93 0 0 0 459 189'));
 assert.ok(home.includes('@media(prefers-reduced-motion:reduce){.core-r108-heart,.core-r108-orbit,.core-r117-metal-a,.core-r117-metal-b,.core-r118-metal-c{animation:none!important}'));
});
test('R117: WebGL metal gimbals solve 3D projection and depth-sort against illuminated sphere',()=>{
 const script=read('assets/core-r109-webgl.js');
 const fragment=script.match(/const fragment = \`([\s\S]*?)\`;/)?.[1]?.trim()||'';
 assert.ok(fragment.includes('vec4 metalGyro(vec2 p,float seconds,float slot,out float zpos)'));
 assert.ok(fragment.includes('float sdRectangularRing('));
 assert.ok(fragment.includes('zpos=world.z;'));
 assert.ok(!fragment.includes('zpos=-(p.x*plane.x+p.y*plane.y)/plane.z;'));
 assert.ok(fragment.includes('for(int stepIndex=0;stepIndex<44;stepIndex++)'));
 for(const n of ['1.','2.','3.'])assert.ok(fragment.includes('metalGyro(p,time,'+n),n);
 assert.ok(fragment.includes('float sphereFrontZ=sqrt(max(radius*radius-d*d,0.));'));
 assert.ok(fragment.includes('float frontA=metalA.a*step(sphereFrontZ+.01,metalDepthA);'));
 assert.ok(fragment.includes('float frontB=metalB.a*step(sphereFrontZ+.01,metalDepthB);'));
 assert.equal(fragment.split('if(z').length-1,3,'3 compare-swap depth sort operations');
 assert.ok(fragment.includes('orderGyros(metalA,metalB,metalC,metalDepthA,metalDepthB,metalDepthC);'));
 assert.ok(fragment.includes('float frontC=metalC.a*step(sphereFrontZ+.01,metalDepthC);'));
 assert.ok(fragment.indexOf('float frontA=')>fragment.indexOf('float arcH='),'Front metal must be composited after electric plasma');
 assert.ok(!fragment.includes('ringBloom')&&!fragment.includes('ringFront'),'No legacy flat electric ring competing with metal');
 assert.equal(fragment.split('=r111Arc(p,').length-1,8);
 assert.ok(fragment.includes('float cycleTime=1.12;'));
 assert.ok(script.includes('clock - lastFrame < 32'));
 assert.ok(script.includes('Math.sqrt(1200000/(rect.width*rect.height))'));
 assert.doesNotMatch(script,/\bfetch\s*\(|XMLHttpRequest|WebSocket|sendBeacon|setInterval\(|setTimeout\(/);
});

test('R118: three thicker metallic gyros, 13/17/20s independent spin, fallback safety',()=>{
 const svg=home.split('<svg class="core-r108-art"')[1]?.split('</svg>')[0]||'';
 assert.equal((svg.match(/<ellipse/g)||[]).length,3);
 for(const thickness of ['7.6','5.7','5.4'])assert.ok(svg.includes('stroke-width="'+thickness+'"'),thickness);
 for(const name of ['core-r117-metal-a','core-r117-metal-b','core-r118-metal-c'])
   assert.equal(svg.split('class="'+name+'"').length-1,2,name);
 for(const animation of ['r118-gyro-a 13s','r118-gyro-b 17s','r118-gyro-c 20s'])assert.ok(home.includes(animation),animation);
 assert.ok(home.includes('.core-r118-metal-c{transform:rotate3d(.60,-.75,.29,-61deg)}'));
 const source=read('assets/core-r109-webgl.js');
 const tick=String.fromCharCode(96);
 const fragment=source.split('const fragment = '+tick)[1]?.split(tick+';')[0]||'';
 for(const spin of ['6.283185/13.','-6.283185/17.','6.283185/20.'])assert.ok(fragment.includes(spin),spin);
 assert.equal(fragment.split('=metalGyro(p,time,').length-1,3);
 assert.equal(fragment.split('if(z').length-1,3);
 assert.equal(fragment.split('=r111Arc(p,').length-1,8);
 assert.ok(source.includes('if (reduceMotion.matches) return;'));
 assert.ok(home.includes('scale(.49)'));
 assert.doesNotMatch(source,/XMLHttpRequest|WebSocket|sendBeacon|setInterval\(/);
});

test('R119: ring axes separate and foreground metal crosses reduced Core silhouette',()=>{
 const source=read('assets/core-r109-webgl.js');
 const tick=String.fromCharCode(96);
 const frag=source.split('const fragment = '+tick)[1]?.split(tick+';')[0]||'';
 assert.ok(frag.includes('float radius=.53;'));
 assert.match(home,/<circle class="core-r108-heart" cx="320" cy="189" r="66"/);
 const axes=[[.90,.10,.42],[-.45,.82,.35],[.60,-.75,.29]];
 const normals=[[.86,.22,.46],[-.58,.71,.42],[.72,-.62,.33]];
 const radii=[.87,.97,1.08];
 const norm=v=>v.map(x=>x/Math.hypot(...v));
 const dot=(a,b)=>a.reduce((sum,x,i)=>sum+x*b[i],0);
 const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
 for(let i=0;i<3;i++){
   let a=norm(axes[i]),n=norm(normals[i]),k=cross(a,n),d=dot(a,n),minZ=1,maxZ=-1;
   for(let deg=0;deg<360;deg+=5){
     const angle=deg*Math.PI/180;
     const z=n[2]*Math.cos(angle)+k[2]*Math.sin(angle)+a[2]*d*(1-Math.cos(angle));
     minZ=Math.min(minZ,z);maxZ=Math.max(maxZ,z);
   }
   assert.ok(minZ>.10,'non-singular plane '+i);
   assert.ok(maxZ*radii[i]<.53,'projected metal crosses sphere every rotation: '+i);
 }
 for(const id of ['r118-gyro-a','r118-gyro-b','r118-gyro-c'])assert.ok(home.includes('@keyframes '+id)&&home.includes('rotate3d('));
 for(const thick of ['7.6','5.7','5.4'])assert.ok(home.includes('stroke-width="'+thick+'"'),thick);
 for(const thick of ['.037','.036','.034'])assert.ok(frag.includes(thick),thick);
 assert.ok(frag.includes('cross(axis,baseNormal)*sin(spin)'));
 assert.ok(frag.includes('alpha=clamp(alpha+max(max(frontA,frontB),frontC)*(1.-alpha),0.,1.);'));
 assert.equal(frag.split('=metalGyro(p,time,').length-1,3);
 assert.equal(frag.split('if(z').length-1,3);
 assert.equal(frag.split('=r111Arc(p,').length-1,8);
 assert.ok(home.includes('scale(.49)'));
 assert.ok(source.includes('clock - lastFrame < 32'));
});

test('R120: three raymarched bevelled rectangular 3D solids and centre-origin lightning',()=>{
 const src=read('assets/core-r109-webgl.js');
 const frag=src.match(/const fragment = \`([\s\S]*?)\`;/)?.[1]||'';
 assert.ok(frag.includes('float sdRectangularRing('),'true ring SDF');
 assert.ok(frag.includes('vec2 box=abs(vec2(length(local.xy)-major,local.z))-vec2(radialHalf,thickHalf)'),'rectangular non-tubular profile');
 assert.ok(frag.includes('for(int stepIndex=0;stepIndex<44;stepIndex++)'),'bounded raymarch');
 assert.ok(frag.includes('float rayEnd=1.30+cap;') && frag.includes('if(travel>rayEnd) break;'),'finite ray bounds');
 assert.ok(frag.includes('vec3 normalLocal=normalize(') && frag.includes('zpos=world.z;'),'physical face normals and depth');
 assert.ok(!frag.includes('zpos=-(p.x*plane.x+p.y*plane.y)/plane.z;'),'reject legacy flat band');
 for(const half of ['.037','.036','.034'])assert.ok(frag.includes(half),half);
 assert.equal(frag.split('=metalGyro(p,time,').length-1,3);
 assert.equal(frag.split('=r111Arc(p,').length-1,8);
 assert.ok(frag.includes('float emitterCore=exp(-d*d*1750.);'));
 assert.ok(frag.includes('float originBoost=1.+.52*exp(-d*d*95.);'));
 assert.ok(frag.indexOf('float emitterCore=')>frag.indexOf('float arcH='),'source sits at discharge origin');
 const svg=home.split('<svg class="core-r108-art"')[1]?.split('</svg>')[0]||'';
 assert.ok(svg.includes('id="r120-emitter"'));
 assert.ok(svg.includes('class="core-r120-emitter"'));
 assert.ok(svg.includes('M320 189 L336 176'),'fallback arcs originate at the emitter');
 for(const width of ['7.6','5.7','5.4'])assert.ok(svg.includes('stroke-width="'+width+'"'));
 assert.match(home,/prefers-reduced-motion:reduce/);
 assert.doesNotMatch(src,/XMLHttpRequest|WebSocket|sendBeacon|setInterval\(/);
});
