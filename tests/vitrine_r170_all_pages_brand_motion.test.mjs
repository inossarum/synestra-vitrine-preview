import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const read = p => readFileSync(new URL('../'+p,import.meta.url),'utf8');
const productPages = ['connect','bridge','offres'];
const demoStyles = ['','atelier/','aurora/','mono/','signature/'];
const demoRoutes = demoStyles.flatMap(s=>['index.html','projects/index.html','roadmap/index.html','contact/index.html'].map(p=>'siteforge/'+s+p));
const hash = b => createHash('sha256').update(b).digest('hex');

test('R170 approved Studio logo derivatives are real local images with fixed binary hashes', () => {
  const assets = {
    'header':'78c6e7b987a1938f3e8b4d64c7d21a2d1a8907b78fdf536bedd0f302103d3acb',
    'symbol':'b6173d9d43f0ca602258e658c29afa7df9619aa672219f9abd5f66156880407f',
    'full':'eb404f75f8016421038e239f4e83e19aa091a37a39c34927b1f2a9565a7a6185'
  };
  for(const [name,digest] of Object.entries(assets)){
    const b=readFileSync(new URL('../assets/synestra-studio-official-'+name+'.webp',import.meta.url));
    assert.equal(hash(b),digest,name);
    assert.equal(b.toString('ascii',0,4),'RIFF');
    assert.equal(b.toString('ascii',8,12),'WEBP');
  }
});

test('R170 actual R169 homepage has official logo, clock-driven motion and reduced-motion guard',()=>{
  const html=read('vitrine-r169-studio-palette-preview.html');
  assert.match(html,/src="\.\/assets\/synestra-studio-official-header\.webp"/);
  assert.match(html,/@keyframes r170-ambient-breathe/);
  assert.match(html,/animation:r170-room-glow 9s ease-in-out infinite/);
  assert.match(html,/animation:r170-spectrum-flow 14s ease-in-out infinite alternate/);
  assert.match(html,/@media \(prefers-reduced-motion: reduce\)/);
  assert.match(html,/class="syn-r169-room"/);
  assert.match(html,/scale\(\.49\)!important/);
  assert.deepEqual([...html.matchAll(/<script\b[^>]*>/g)].map(x=>x[0]),['<script src="./assets/siteforge-r116-sphere-only.js" defer>']);
});

test('R170 every product route shares brand chrome and moves without pointer input',()=>{
  const css=read('assets/product-pages.css');
  for(const token of ['--ink:#080e1a','--violet:#a68af5','--cyan:#86e0f0','--teal:#42cb93']) assert.ok(css.includes(token),token);
  assert.match(css, /@keyframes r170-backdrop-sway/);
  assert.match(css, /animation:r170-logo-drift 11s ease-in-out infinite/);
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)/);
  for(const slug of productPages){
    const html=read(slug+'/index.html');
    assert.match(html, /src="\.\.\/assets\/synestra-studio-official-header\.webp"/);
    assert.match(html, /content="noindex,nofollow"/);
    assert.match(html, /script-src 'self'/);
  }
});

test('R170 all twenty SiteForge presentation pages have independent idle brand animation',()=>{
  assert.equal(demoRoutes.length,20);
  for(const route of demoRoutes){
    const html=read(route);
    assert.match(html, /R170 Synestra global brand framing/,route);
    assert.match(html, /@keyframes r170-brand-spectrum/,route);
    assert.match(html, /animation:r170-brand-drift 12s ease-in-out infinite/,route);
    assert.match(html, /@media\(prefers-reduced-motion:reduce\)/,route);
    assert.match(html, /<strong>Synestra SiteForge<\/strong>/,route);
  }
});

test('R170 Signal and the two labs retain their runtimes and reduced-motion controls',()=>{
  const signal=read('signal/index.html');
  const css=read('signal/signal.css');
  assert.match(signal,/synestra-studio-official-symbol\.webp/);
  assert.match(css,/\.hero:has\(\.signal-canvas\[data-animating="true"\]\) \.hero-bg/);
  assert.match(css,/@keyframes r170-signal-ambient/);
  assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
  const lab=read('siteforge/lab/index.html');
  const core=read('siteforge/core-3d-lab/index.html');
  assert.match(lab,/synestra-studio-official-symbol\.webp/);
  assert.match(lab,/animation:r170-lab-mark 10s ease-in-out infinite/);
  assert.match(core,/@keyframes r170-lab-shell/);
  assert.match(core,/<canvas class="core-r109-canvas"/);
});
