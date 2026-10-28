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
test('R173 active architecture has no pointer-dependency or external render process',()=>{
 for(const name of ['r173-environment','r173-grid','r173-beam-one','r173-beam-two','r173-scan'])assert.ok(html.includes('class="'+name+'"')||html.includes(' '+name+'"'),name);
 for(const name of ['r173-grid-drift','r173-beam-sweep','r173-scan-travel','r173-section-current','r173-card-shimmer'])assert.match(css,new RegExp('@keyframes '+name+'\\{'),name);
 assert.match(css,/animation:r173-beam-sweep 14s linear -3s infinite/);
 assert.match(css,/animation:r173-section-current 9\.5s linear infinite/);
 assert.match(css,/animation:r173-card-shimmer 9s linear infinite/);
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)\{/);
 assert.match(css,/\.r173-environment \.r173-grid,\.r173-environment \.r173-beam/);
 assert.match(html,/R171 accessible pilot CTA/);
 assert.equal((html.match(/<script\b/g)||[]).length,1);
});
