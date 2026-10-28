import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const html=readFileSync(new URL('../vitrine-r169-studio-palette-preview.html',import.meta.url),'utf8');
const css=html.slice(html.indexOf('<style>'),html.indexOf('</style>'));
const stage=html.slice(html.indexOf('<div class="system-stage core-r108-stage core-r109-stage"'));

test('R172 autonomous energy actively moves behind the core without mouse input',()=>{
 assert.match(css,/R172 autonomous chamber energy/);
 assert.match(html,/<div class="r172-energy-halo" aria-hidden="true"><\/div>/);
 assert.match(html,/<g class="r172-energy-conduits" aria-hidden="true"/);
 assert.match(html,/<path class="r172-rail-current"[^>]+stroke-dasharray="58 650"/);
 assert.match(css,/\.r172-energy-halo::before\s*\{[^}]+animation:r172-energy-orbit 8\.5s linear infinite/);
 assert.match(css,/\.r172-rail-current,[\s\S]*?\.r172-rail-glow \{animation:r172-rail-travel 4\.8s linear infinite/);
 assert.match(css,/@keyframes r172-energy-orbit \{to\{transform:rotate\(360deg\)\}\}/);
 assert.match(css,/@keyframes r172-rail-travel \{to\{stroke-dashoffset:-708\}\}/);
});
test('R172 clean energy preserves source renderer and has no additional canvas or external scripts',()=>{
 assert.equal((stage.match(/<canvas\b/g)||[]).length,1);
 assert.equal((html.match(/<script\b/g)||[]).length,1);
 assert.match(html,/src="\.\/assets\/siteforge-r116-sphere-only\.js" defer/);
 assert.match(html,/scale\(\.49\)!important/);
 assert.match(css,/\.r172-energy-halo\s*\{[^}]*z-index:2/);
 assert.match(css,/@media\(max-width:620px\)\{\.r172-energy-halo\{width:216px/);
});
test('R172 reduced motion freezes new orbit and traveling rail lights',()=>{
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)\{[\s\S]*?\.r172-energy-halo::before,\.r172-energy-halo::after,[\s\S]*?\.r172-energy-conduits \* \{animation:none!important\}/);
 assert.match(html,/class="r172-energy-halo" aria-hidden="true"/);
});
