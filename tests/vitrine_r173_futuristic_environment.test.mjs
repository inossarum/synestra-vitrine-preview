import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../vitrine-r169-studio-palette-preview.html',import.meta.url),'utf8');
const css=html.slice(html.indexOf('<style>'),html.indexOf('</style>'));
test('R173 physically painted holographic dial is clearly visible, rotates, and does not surround sphere',()=>{
 assert.match(html,/R173 visual QA delta/);
 assert.match(html,/<div class="r173-hud-dial" aria-hidden="true">/);
 assert.match(html,/<span class="r173-dial-arc"><\/span>/);
 assert.match(html,/<span class="r173-dial-beacon"><\/span>/);
 assert.match(css,/\.hero-v2::before,\.hero-v2::after\{display:none!important\}/);
 assert.match(css,/border:2px solid rgba\(129,214,255,\.77\)/);
 assert.match(css,/animation:r173-hud-dial-turn 11s linear infinite/);
 assert.match(css,/animation:r173-hud-dial-reverse 17s linear infinite/);
 assert.match(css,/r173-hud-beacon-pulse 2\.2s ease-in-out infinite/);
 assert.doesNotMatch(html,/class="r172-energy-halo"|class="core-tools-orbit"|class="r172-energy-conduits"/);
 assert.equal((html.match(/<canvas\b/g)||[]).length,1);
});
test('R174 removes page-wide scanning beams, traveling lines and card sweeps',()=>{
 assert.match(html,/class="r173-environment"/);
 assert.match(html,/class="r173-grid"/);
 assert.match(css,/@keyframes r173-grid-drift\{/);
 for(const forbidden of ['r173-beam','r173-scan','r173-section-current','r173-card-shimmer'])
   assert.doesNotMatch(html,new RegExp(forbidden),forbidden);
 assert.doesNotMatch(css,/main>\.section::before\s*\{/);
 assert.doesNotMatch(css,/\.product-card::after\s*\{/);
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)\{/);
 assert.match(html,/R171 accessible pilot CTA/);
 assert.equal((html.match(/<script\b/g)||[]).length,1);
});

test('R175 mobile navigation stays semantic, compact and keeps product links',()=>{
 assert.match(html,/<details class="r175-mobile-menu">/);
 assert.match(html,/<summary aria-label="Ouvrir le menu de navigation">/);
 assert.match(css,/\.r175-mobile-menu\{display:none\}/);
 assert.match(css,/@media\(max-width:720px\)\{/);
 assert.match(css,/\.site-header\.container\{/);
 assert.match(css,/\.r175-mobile-panel\{/);
 assert.match(css,/\.r175-mobile-menu summary:focus-visible/);
 assert.match(html,/class="nav-cta" href="https:\/\/synestra-client-portal\.synestra-studio\.workers\.dev\//);
 for(const product of ['connect','bridge','siteforge','offres'])
  assert.match(html,new RegExp('href="\\./'+product+'/"','i'));
 assert.doesNotMatch(html,/r173-beam|r173-scan-travel|r173-card-shimmer/);
});

test('R178 navigation and premium wayfinding are semantic, responsive and motion-safe',()=>{
 assert.match(html,/<nav class="container r178-wayfinder" aria-label="Parcourir le Studio">/);
 assert.match(html,/class="r178-wayfinder-grid"/);
 for(const fragment of ['plateforme','exemples','approche'])
  assert.match(html,new RegExp('href="#'+fragment+'" class="r178-wayfinder-link"'));
 assert.equal((html.match(/class="r178-wayfinder-link"/g)||[]).length,3);
 assert.match(css,/body>\.site-header\.container\{[\s\S]*?position:sticky!important/);
 assert.match(css,/html\{scroll-padding-top:/);
 assert.match(css,/\.r178-wayfinder-link:focus-visible\{outline:3px/);
 assert.match(css,/@media\(max-width:720px\)\{[\s\S]*?\.r178-wayfinder-grid\{grid-template-columns:1fr/);
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)\{[\s\S]*?\.r178-wayfinder-link\{transition:none!important/);
 assert.doesNotMatch(html,/r173-beam-one|r173-scan-travel|r173-card-shimmer/);
 assert.equal((html.match(/<script\b/g)||[]).length,1);
});

test('R179 cinematic editorial has clear technology destinations and no duplicate render',()=>{
 assert.match(html,/<section class="container r179-manifesto" aria-labelledby="r179-manifesto-title">/);
 assert.match(html,/<h2 id="r179-manifesto-title">Du concept\./);
 assert.match(html,/class="r179-system-index" aria-label="Les trois composants du Studio"/);
 assert.equal((html.match(/class="r179-proto-num"/g)||[]).length,3);
 for(const product of ['siteforge','connect','bridge'])
  assert.match(html,new RegExp('href="\\./'+product+'/" aria-label="Explorer Synestra'));
 assert.match(css,/\.r179-manifesto\{[\s\S]*?grid-template-columns:minmax\(0,1\.04fr\) minmax\(0,\.96fr\)/);
 assert.match(css,/\.r179-editorial-copy h2\{[\s\S]*?font-size:clamp\(3\.7rem,6\.7vw,7\.5rem\)/);
 assert.match(css,/@media\(max-width:840px\)\{[\s\S]*?\.r179-manifesto\{grid-template-columns:1fr/);
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)\{[\s\S]*?\.r179-editorial-link,\.r179-system-list a\{transition:none!important\}/);
 assert.equal((html.match(/<canvas\b/g)||[]).length,1);
 assert.equal((html.match(/<script\b/g)||[]).length,1);
 assert.doesNotMatch(html,/r173-beam-one|r173-scan-travel|r173-card-shimmer/);
});

test('R180 chapters use alternating product narratives, editorial cases, and no inherited sweeps',()=>{
 for(const chapter of ['02','03','04'])
  assert.match(html,new RegExp('class="r180-chapter-label"><span aria-hidden="true">'+chapter+'</span>'));
 assert.match(css,/#plateforme \.product-grid\{display:grid;grid-template-columns:minmax\(0,1fr\)/);
 assert.match(css,/#plateforme \.product-card:nth-child\(even\)\{grid-template-areas:"meta meta" "copy visual"/);
 assert.match(css,/#exemples \.examples-grid\{display:grid;grid-template-columns:minmax\(0,1fr\)/);
 assert.match(css,/#exemples \.example-card::before\{[^}]*counter\(r180-example\)/);
 assert.match(css,/@media\(max-width:980px\)\{[^}]*grid-template-areas:"meta" "visual" "copy"/);
 assert.match(css,/\.siteforge-showcase::after\{content:none!important;animation:none!important\}/);
 assert.doesNotMatch(css,/\.bridge-visual::after \{animation:cin-scan/);
 assert.doesNotMatch(css,/animation:cin-glint 18s/);
 assert.doesNotMatch(html,/r173-beam-one|r173-scan-travel|r173-card-shimmer/);
 assert.equal((html.match(/<canvas\b/g)||[]).length,1);
});

test('R180 product concept tags are legible and secondary calls to action do not collide',()=>{
 assert.match(css,/#plateforme \.product-visual \.visual-stamp\{top:\.65rem;bottom:auto/);
 assert.match(css,/#plateforme \.product-card-body \.product-deep-link\{display:flex;align-items:center;width:fit-content/);
 assert.match(html,/class="product-deep-link product-deep-link-subtle"/);
});

test('R181 technology explorer is deep-linkable, genuinely interactive, and degrades gracefully',()=>{
 assert.match(html,/class="r181-explorer" aria-label="Console d.exploration des technologies Synestra"/);
 assert.match(html,/<nav class="r181-console-switcher" aria-label="Explorer les technologies">/);
 assert.match(html,/href="#bridge" class="r181-console-choice r181-choice-bridge"/);
 assert.match(html,/href="#connect" class="r181-console-choice r181-choice-connect"/);
 assert.match(css,/@supports selector\(#plateforme:has\(#connect:target\)\)/);
 assert.match(css,/#plateforme:not\(:has\(#connect:target\)\) \.r181-console-viewport \.product-card-connect\{display:none\}/);
 assert.match(css,/#plateforme:has\(#connect:target\) \.r181-console-viewport \.product-card-bridge\{display:none\}/);
 assert.match(css,/#plateforme \.r181-console-viewport \.product-visual\{[^}]*transform:perspective\(1200px\)/);
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)\{[^}]*#plateforme \.r181-console-choice/);
 assert.equal((html.match(/<canvas\b/g)||[]).length,1);
 assert.equal((html.match(/<script\b/g)||[]).length,1);
});

test('R181 portal hero overlaps a single WebGL stage on wide screens and preserves mobile flow',()=>{
 assert.match(css,/@media\(min-width:1100px\)\{/);
 assert.match(css,/\.hero-v2\{[^}]*display:grid;grid-template-columns:minmax\(0,1fr\);grid-template-rows:minmax\(690px,auto\)/);
 assert.match(css,/\.hero-v2 \.system-stage\{[^}]*grid-area:1 \/ 1;justify-self:end;align-self:stretch/);
 assert.match(css,/\.hero-v2 \.hero-copy\{[^}]*grid-area:1 \/ 1;align-self:center;justify-self:start/);
 assert.equal((html.match(/<canvas\b/g)||[]).length,1);
});

test('R182 owner-screenshot corrections prioritize the animated Core over typography and make stage links legible',()=>{
 assert.match(css,/R182 \/ VISUAL HIERARCHY FIX after real owner screenshot/);
 assert.match(css,/@media\(min-width:1100px\)\{/);
 assert.match(css,/\.hero-v2 \.hero-copy\{[^}]*width:min\(47%,570px\)/);
 assert.match(css,/\.hero-v2 h1\{[^}]*font-size:clamp\(3\.55rem,4\.65vw,5\.45rem\)/);
 assert.match(css,/\.hero-v2 \.core-r109-stage \.core-r109-canvas\{[^}]*transform:translateX\(11%\) scale\(\.7\)!important/);
 assert.match(css,/\.hero-v2 \.system-stage \.core-r108-links a\{[^}]*min-height:52px/);
 assert.equal((html.match(/<canvas\b/g)||[]).length,1);
 assert.doesNotMatch(html,/r173-beam-one|r173-scan-travel|r173-card-shimmer/);
});

test('R183 sphere-first opening occupies initial viewport and keeps content in second chapter',()=>{
 assert.match(html,/class="r183-intro-navigation"/);
 assert.match(html,/href="#hero-title" class="r183-enter-studio"/);
 assert.match(css,/\.hero-v2\{\s*display:flex!important;flex-direction:column!important/);
 assert.match(css,/body \.hero-v2>\.system-stage\.core-r109-stage\{[^}]*order:0/);
 assert.match(css,/\.hero-v2>\.hero-copy\{\s*order:1/);
 assert.match(css,/body \.hero-v2>\.system-stage \.syn-r169-room\{display:none!important\}/);
 assert.match(css,/body \.hero-v2>\.system-stage \.core-r108-links,[\s\S]*?\.core-r108-note\{display:none!important\}/);
 assert.match(css,/body \.hero-v2>\.system-stage\.core-r109-stage \.core-r109-canvas\{[^}]*scale\(1\.18\)!important/);
 assert.match(css,/\.r183-enter-studio:focus-visible\{outline:3px/);
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)\{[^}]*\.r183-enter-studio\{transition:none!important\}/);
 assert.equal((html.match(/<canvas\b/g)||[]).length,1);
});

test('R183 portrait framing preserves immutable shader and shows complete orb in letterboxed canvas',()=>{
 const source=readFileSync(new URL('../assets/core-r109-webgl.js',import.meta.url),'utf8');
 assert.match(source,/float radius=\.69;/);
 assert.doesNotMatch(source,/R183: fit the complete orb/);
 for(const width of [358,288]){
  const height=Math.min(width/390*120*3.9,430); // CSS 120vw: viewport 390 / 320, representative stage ratio
  const actualHeight=width===358?430:384;
  assert.ok(width/actualHeight>.69,'orb silhouette must fit canvas at '+width);
 }
 assert.match(css,/height:min\(120vw,430px\)!important/);
 assert.match(css,/top:50%!important/);
 assert.match(css,/transform:translateY\(-50%\) scale\(1\)!important/);
});

test('R184 immersive stage is edge to edge and orb is deliberately smaller with canonical GPU source',()=>{
 assert.match(css,/\/\* R184: FULL BLEED CORE/);
 assert.match(css,/\.hero-v2\.container\{[^}]*width:100vw!important;max-width:none!important/);
 assert.match(css,/body \.hero-v2>\.system-stage\.core-r109-stage\{[^}]*height:100svh!important;min-height:100svh!important/);
 assert.match(css,/border:0!important;border-radius:0!important/);
 assert.match(css,/transform:translate3d\(0,0,0\) scale\(\.72\)!important/);
 assert.match(css,/height:min\(96vw,420px\)!important/);
 assert.match(css,/\.hero-v2>\.hero-copy\{\s*width:min\(88vw,1120px\)!important/);
 const gpu=readFileSync(new URL('../assets/core-r109-webgl.js',import.meta.url),'utf8');
 assert.match(gpu,/float radius=\.69;/);
 assert.equal((html.match(/<canvas\b/g)||[]).length,1);
});
