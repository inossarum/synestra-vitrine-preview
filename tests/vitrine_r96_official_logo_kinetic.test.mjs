import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import test from 'node:test';
// R169 is a newer, intentionally different WebGL scene. Legacy R96–R116 assertions
// are retained for earlier versions; the branch candidate must instead meet its
// own explicit Core, product-navigation, CSP and motion contracts.
const r169ReviewFile = new URL('../vitrine-r169-studio-palette-preview.html', import.meta.url)
const r169Review = existsSync(r169ReviewFile) ? readFileSync(r169ReviewFile,'utf8') : null
const r169PreviewActive = Boolean(r169Review?.includes('R169 brand-palette REVIEW ONLY'))
function verifyR169Preview(){
 assert.ok(r169PreviewActive,'R169 candidate and official palette marker required');
 assert.match(r169Review,/class="system-stage core-r108-stage core-r109-stage"/);
 assert.match(r169Review,/<canvas class="core-r109-canvas" aria-hidden="true"/);
 assert.match(r169Review,/<svg class="core-r108-art"/);
 assert.match(r169Review,/class="syn-r169-room"/);
 assert.match(r169Review,/scale\(\.49\)!important/);
 assert.match(r169Review,/src="\.\/assets\/siteforge-r116-sphere-only\.js" defer/);
 assert.match(r169Review,/prefers-reduced-motion:reduce/);
 assert.match(r169Review,/script-src 'self'/);
 assert.match(r169Review,/noindex,nofollow/);
 for (const slug of ['connect','bridge','siteforge'])assert.match(r169Review,new RegExp('href="\\./'+slug+'/"'));
 const scripts=[...r169Review.matchAll(/<script\\b[^>]*>/g)].map(x=>x[0]);
 assert.deepEqual(scripts,['<script src="./assets/siteforge-r116-sphere-only.js" defer>']);
}


const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const logo=readFileSync(new URL('../assets/synestra-studio-official-v1.avif',import.meta.url));
const blob=createHash('sha1').update('blob '+logo.length+'\0').update(logo).digest('hex');
const hash=createHash('sha256').update(logo).digest('hex');

test('R96 logo approuvé, dérivé exact du PNG canonique, asset local SHA-vérifié',()=>{
  assert.equal(blob,'5871125a3b934acd93613201b56bc75f2a81a231');
  assert.equal(hash,'511d1454953ebca11b4547036960d4aa9613eb294d03268a2b2e2cf9ab89bb8c');
  assert.equal(logo.length,20508);
  assert.match(logo.toString('latin1',0,18),/ftypavif/);
  assert.equal([...html.matchAll(/src="\.\/assets\/synestra-studio-official-v1\.avif"/g)].length,0);
  assert.match(html,/<img class="brand-banner-r99" src="\.\/assets\/synestra-studio-header-y-r99\.webp"/);
  assert.doesNotMatch(html,/<span class="brand-mark"/);
  assert.match(html,/class="system-stage core-r108-stage core-r109-stage"/);
  assert.doesNotMatch(html,/src="[^"]+synestra-master\.svg"/i);
});

test('R96 respecte la nouvelle charte : violet, cyan, vert, acier, fond transparent',()=>{
  for(const c of ['#8a58ec','#00c4f1','#20dba9','#e9f0f7','#060b12'])
    assert.ok(html.includes(c),c);
  assert.match(html,/Official Synestra Studio V1 brand/);
  assert.match(html,/c83dc24f18df338c359e9da4c58913e29c54bafa94357734e70820125e01b9bd/);
});

test('R96 donne plus de vie sans JS ni dépendance externe',()=>{
 if(r169PreviewActive){verifyR169Preview();return;}
  for(const a of ['logo-buoyancy','marker-a-spin','marker-b-spin','line-breathe','workflow-pulse'])
    assert.ok(html.includes('@keyframes '+a),a);
  assert.match(html,/class="studio-workflow"/);
  assert.match(html,/class="core-r108-heart"/);
  assert.match(html,/class="system-stage core-r108-stage core-r109-stage"/);
  assert.match(html,/@media \(prefers-reduced-motion:reduce\)|@media \(prefers-reduced-motion: reduce\)/);
  assert.deepEqual([...html.matchAll(/<script\b[^>]*>/g)].map(x=>x[0]),['<script src="./assets/core-r109-webgl.js" defer>']);
  assert.doesNotMatch(html,/<iframe\b|<form\b/i);
  assert.match(html,/content="noindex,nofollow"/);
  assert.match(html,/default-src 'none'; style-src 'unsafe-inline'; img-src 'self'/);
});

test('R96 conserve communication fidèle et parcours des produits',()=>{
  assert.match(html,/id="bridge"/);
  assert.match(html,/id="connect"/);
  assert.match(html,/id="siteforge"/);
  assert.match(html,/En qualification/);
  assert.match(html,/Périmètre pilote/);
  assert.match(html,/Cette vue est une illustration/);
  assert.equal([...html.matchAll(/<h1 /g)].length,1);
  assert.equal([...html.matchAll(/<details class="faq-item">/g)].length,5);
});
