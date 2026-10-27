import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const svg=html.match(/<svg class="core-r108-art"[\s\S]*?<\/svg>/)?.[0];
test('R165: homepage identifies the energy as the first Synestra prototype',()=>{
 assert.match(html,/CORE \/ SYNESTRA/);
 assert.match(html,/PROTOTYPE \/ 01/);
 assert.match(html,/aria-label="Prototype énergétique Synestra/);
});
test('R165: motion-disabled fallback shows violet/green plasma filaments without the former opaque sphere',()=>{
 assert.ok(svg,'fallback SVG missing');
 assert.match(svg,/#53318d/i);
 assert.match(svg,/#69dcb4/i);
 assert.match(svg,/class="syn-r165-currents"/);
 assert.doesNotMatch(svg,/class="core-r108-heart"|<ellipse|<circle[^>]+r="(?:8[0-9]|1[0-9]{2})"/);
});
test('R165: homepage still has one WebGL canvas, identical old sphere diameter and unchanged imported engine',()=>{
 assert.equal((html.match(/<canvas /g)||[]).length,1);
 assert.equal((html.match(/data-sphere-control=/g)||[]).length,18);
 assert.match(html,/src="\.\/assets\/siteforge-r116-sphere-only\.js"/);
 assert.match(html,/\.core-r109-stage \.core-r109-canvas\{transform:scale\(\.49\)!important/);
 assert.match(html,/prefers-reduced-motion:reduce/);
});
