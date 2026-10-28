import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../vitrine-r169-studio-palette-preview.html',import.meta.url),'utf8');
const css=html.slice(html.indexOf('<style>'),html.indexOf('</style>'));
test('R173 has a visible two-layer rotating holographic dial outside the clean sphere',()=>{
 assert.match(html,/R173 FUTURISTIC LIVING INTERFACE/);
 assert.match(css,/\.hero-v2::before\{[\s\S]*?border:2px solid rgba\(130,198,255,\.48\)/);
 assert.match(css,/animation:r173-dial-spin 15s linear infinite!important/);
 assert.match(css,/animation:r173-dial-counterspin 22s linear infinite!important/);
 assert.match(css,/@keyframes r173-dial-spin\{to\{transform:rotate\(360deg\)\}\}/);
 assert.match(css,/@keyframes r173-dial-counterspin\{to\{transform:rotate\(-360deg\)\}\}/);
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
