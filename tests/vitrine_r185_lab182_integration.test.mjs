import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../vitrine-r169-studio-palette-preview.html',import.meta.url),'utf8');
const engine=readFileSync(new URL('../assets/siteforge-lab-r182-vitrine.js',import.meta.url),'utf8');

test('R185 uses real SiteForge R182 engine, not the legacy R157 renderer',()=>{
 assert.match(html,/src="\.\/assets\/siteforge-lab-r182-vitrine\.js" defer/);
 assert.doesNotMatch(html,/<script[^>]*src="\.\/assets\/siteforge-r116-sphere-only\.js"/);
 assert.match(engine,/uSpinPhase/);
 assert.match(engine,/uMoteFinish/);
 assert.match(engine,/stage\.dataset\.mobileQuality/);
 assert.match(engine,/stage\.dataset\.moteSpinPhase/);
 assert.equal((html.match(/<canvas\b/g)||[]).length,1);
 assert.equal((html.match(/<script\b/g)||[]).length,1);
});

test('R185 carries all 18 plasma controls and 10 microfacet controls',()=>{
 assert.equal((html.match(/data-sphere-control="/g)||[]).length,18);
 assert.equal((html.match(/data-mote-control="/g)||[]).length,10);
 assert.match(html,/data-lab-engine="R182"/);
 assert.match(html,/data-sphere-control="diameter" data-default="83" value="83"/);
 assert.match(html,/data-mote-control="moteCount" data-default="0" value="0"/);
 assert.match(html,/tabindex="0" role="group" data-lab-engine="R182"/);
});

test('R185 floor receives violet-cyan light without scanning effects or network dependencies',()=>{
 assert.match(html,/class="r185-floor-plane" aria-hidden="true"/);
 assert.match(html,/radial-gradient\(ellipse 29% 21% at 50% 64%/);
 assert.match(html,/@keyframes r185-floor-glow/);
 assert.match(html,/@media\(prefers-reduced-motion:reduce\)\{[^}]*r185-floor-plane::before\{animation:none!important/);
 assert.doesNotMatch(html,/r173-beam-one|r173-scan-travel|r173-card-shimmer/);
 assert.doesNotMatch(engine,/\bfetch\s*\(|XMLHttpRequest\s*\(/);
});
