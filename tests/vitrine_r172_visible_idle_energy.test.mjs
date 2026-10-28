import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../vitrine-r169-studio-palette-preview.html',import.meta.url),'utf8');
const css=html.slice(html.indexOf('<style>'),html.indexOf('</style>'));

test('R173 supersedes R172: decorative rings and conduits around sphere removed by owner request',()=>{
 assert.doesNotMatch(html,/class="r172-energy-halo"|class="r172-energy-conduits"/);
 assert.doesNotMatch(html,/class="core-tools-orbit"|class="core-tool-satellite"/);
 assert.doesNotMatch(css,/@keyframes r172-|@keyframes core-tools-turn|@keyframes core-tools-upright/);
 assert.match(html,/<canvas class="core-r109-canvas" aria-hidden="true"/);
 assert.match(html,/src="\.\/assets\/siteforge-r116-sphere-only\.js" defer/);
 for(const slug of ['siteforge','connect','bridge'])assert.match(html,new RegExp('href="\\./'+slug+'/"'));
});
test('R174 removes page scanning while retaining animated grid, HUD and a singular WebGL renderer',()=>{
 assert.equal((html.match(/<canvas\b/g)||[]).length,1);
 assert.equal((html.match(/<script\b/g)||[]).length,1);
 assert.match(html,/scale\(\.49\)!important/);
 assert.match(css,/R173 FUTURISTIC LIVING INTERFACE/);
 assert.match(css,/@keyframes r173-dial-spin/);
 assert.doesNotMatch(css,/@keyframes r173-beam-sweep|@keyframes r173-scan-travel/);
 assert.doesNotMatch(html,/class="r173-beam|class="r173-scan/);
 assert.match(css,/@keyframes r173-grid-drift/);
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
});
