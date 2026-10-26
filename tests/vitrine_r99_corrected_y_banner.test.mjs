import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import test from 'node:test';

const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const src=readFileSync(new URL('../assets/synestra-studio-header-y-r99.webp',import.meta.url));
test('R99: header displays source-matched corrected geometric Y banner and no duplicate text',()=>{
  assert.equal(src.length,46950);
  assert.equal(createHash('sha1').update(Buffer.concat([Buffer.from('blob '+src.length), Buffer.from([0]), src])).digest('hex'),'a3e1d5de3ebc4b9735387358ddca67b3d4f31243');
  assert.match(html,/<img class="brand-banner-r99" src="\.\/assets\/synestra-studio-header-y-r99\.webp"/);
  assert.doesNotMatch(html,/<span class="brand-name">SYNESTRA/);
  assert.match(html,/aria-label="Accueil Synestra"/);
  assert.match(html,/\.brand-banner-r99\s*\{[^}]*object-fit:contain/s);
});
test('R104: official R99 header remains intact while the animated Core contains no logo',()=>{
  assert.match(html,/class="system-stage core-r108-stage core-r109-stage"/);
  assert.doesNotMatch(html,/<img class="official-hero-logo"/);
  assert.match(html,/@keyframes core-beat/);
  assert.match(html,/prefers-reduced-motion/);
  assert.match(html,/id="bridge"/);
  assert.match(html,/id="connect"/);
  assert.deepEqual([...html.matchAll(/<script\b[^>]*>/g)].map(x=>x[0]),['<script src="./assets/core-r109-webgl.js" defer>']);
  assert.doesNotMatch(html,/<iframe\b|<form\b/i);
});
