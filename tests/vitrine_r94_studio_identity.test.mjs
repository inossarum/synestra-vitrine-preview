import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const logo=readFileSync(new URL('../assets/synestra-master.svg',import.meta.url));
const blobSha=createHash('sha1').update('blob '+logo.length+'\0').update(logo).digest('hex');

test('R94 conserve l'ancien vecteur de la Web App pour provenance, sans le déclarer officiel actuel',()=>{
  assert.equal(blobSha,'15e5120d52f922bc87f8702fa89c33c02e3e5a7f');
  assert.match(logo.toString('utf8'),/viewBox="0 0 240 320"/);
  assert.match(html,/background:transparent url\("\.\/assets\/synestra-master\.svg"\)/);
});

test('R94 reprend explicitement les valeurs couleur et la typo WebApp',()=>{
  assert.match(html,/R94 \/ STUDIO_CANONICAL_BRAND/);
  assert.match(html,/font-family: Inter, ui-sans-serif/);
  for(const token of ['#060b12','#0b1420','#141f2c','#354253','#e7edf5','#95a6b8','#83dced','#00bfff','#d9e2eb','#91dcec']){
    assert.ok(html.includes(token),'missing WebApp token '+token);
  }
  assert.match(html,/\.motion-strip\s*\{\s*background:linear-gradient\(100deg,#09192a/);
  assert.doesNotMatch(html,/\.motion-strip\s*\{\s*background:#c6f2c5/); // no lime active theme
});

test('R94 logo est un asset local reconnu par CSP, sans CDN ni script',()=>{
  assert.match(html,/default-src 'none'; style-src 'unsafe-inline'; img-src 'self'/);
  assert.match(html,/url\("\.\/assets\/synestra-master\.svg"\)/);
  assert.doesNotMatch(html,/<script\b|<form\b|<iframe\b/i);
  assert.match(html,/content="noindex,nofollow"/);
});

test('R94 préserve les produits, la navigation et le contrôle de mouvement',()=>{
  assert.match(html,/id="bridge" aria-labelledby="bridge-title"/);
  assert.match(html,/id="connect" aria-labelledby="connect-title"/);
  assert.match(html,/href="\.\/siteforge\/"/);
  assert.match(html,/L’accès au portail et son parcours de connexion sont encore en cours de qualification/);
  assert.match(html,/@media \(prefers-reduced-motion: reduce\)/);
  assert.match(html,/animation:none!important/);
});
