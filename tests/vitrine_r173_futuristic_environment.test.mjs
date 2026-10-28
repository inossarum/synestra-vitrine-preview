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
