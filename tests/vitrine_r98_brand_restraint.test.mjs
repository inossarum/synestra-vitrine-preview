import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';

const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('R98 failure-first: header uses one legible wordmark and no cropped oversized image',()=>{
  const header=html.match(/<header class="container site-header">([\s\S]*?)<\/header>/)?.[1]||'';
  assert.match(header,/<img class="brand-banner-r99" src="\.\/assets\/synestra-studio-header-y-r99\.webp"/);
  assert.equal((header.match(/<img\\b/g)||[]).length,1);\n  assert.doesNotMatch(header,/<span class="brand-mark"|class="brand-name"/);
});

test('R98: official logo retained fully in stage, no animated flash or forced cropping',()=>{
  assert.match(html,/<img class="official-hero-logo" src="\.\/assets\/synestra-studio-official-v1\.avif"/);
  assert.match(html,/R98_STUDIO_BRAND_RESTRAINT/);
  assert.match(html,/\.official-hero-logo\s*\{[^}]*object-fit:contain;[^}]*filter:brightness\(\.72\) saturate\(\.58\);[^}]*animation:none!important;/s);
  assert.match(html,/\.system-core\s*\{[^}]*box-shadow:none!important;/s);
  assert.match(html,/\.hero-accent\s*\{[^}]*animation:none!important;/s);
});

test('R98: no logo mutation and no extra scripts while preserving semantics',()=>{
  assert.equal((html.match(/src="\.\/assets\/synestra-studio-official-v1\.avif"/g)||[]).length,1);
  assert.match(html,/<a class="brand" href="\.\/" aria-label="Accueil Synestra">/);
  assert.match(html,/id="bridge"/);
  assert.match(html,/id="connect"/);
  assert.match(html,/prefers-reduced-motion/);
  assert.doesNotMatch(html,/<script\b|<iframe\b|<form\b/i);
});
