import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const count = (re) => [...html.matchAll(re)].length;

test('R93 présente explicitement Bridge et Connect sans doublonner les ancres', () => {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(ids.length, new Set(ids).size);
  for (const name of ['plateforme', 'bridge', 'connect', 'siteforge', 'confiance']) {
    assert.ok(ids.includes(name), 'Missing '+name);
  }
  assert.match(html, /<h3 id="bridge-title">Synestra <em>Bridge\.<\/em><\/h3>/);
  assert.match(html, /<h3 id="connect-title">Synestra <em>Connect\.<\/em><\/h3>/);
  assert.match(html, /<a href="#plateforme">Bridge &amp; Connect<\/a>/);
  const links = [...html.matchAll(/<a\s[^>]*href="#([^"]+)"/g)].map(m => m[1]);
  assert.ok(links.every(id => ids.includes(id)), 'Broken in-page anchor');
});

test('R93 sépare maquettes conceptuelles et état réel des produits', () => {
  assert.match(html, /Bridge.*?qualification en cours/s);
  assert.match(html, /certaines lectures authentifiées ont été testées/i);
  assert.match(html, /consentement local explicite/);
  assert.match(html, /aucun flux en direct/i);
  assert.match(html, /il ne s['’]agit pas d['’]une capture de Bridge actif/i);
  assert.doesNotMatch(html, /connexion Bridge garantie|toutes les fonctions sont disponibles|100 % opérationnel/i);
});

test('R93 conserve le bon périmètre : noindex, CSP et aucune infrastructure externe', () => {
  assert.match(html, /content="noindex,nofollow"/);
  assert.match(html, /default-src 'none'; style-src 'unsafe-inline'/);
  assert.doesNotMatch(html, /<(?:script|iframe|form|link)\b/i);
  assert.match(html, /href="\.\/siteforge\/"/);
  assert.match(html, /https:\/\/synestra-client-portal\.synestra-studio\.workers\.dev\//);
});

test('R93 mouvement CSS non essentiel et arrêt explicite en reduced-motion', () => {
  for (const key of ['orbit-spin','node-float','stage-breathe','stage-blink','strip-slide']) {
    assert.ok(html.includes('@keyframes '+key),key);
  }
  const reduced = html.slice(html.lastIndexOf('@media (prefers-reduced-motion: reduce)'));
  assert.match(reduced, /animation:none!important/);
  assert.match(reduced, /transition:none!important/);
  assert.match(reduced, /transform:none!important/);
  assert.match(html, /aria-hidden="true"/);
  assert.match(html, /class="system-stage" role="img" aria-label="/);
});

test('R93 répond sur mobile et protège le flux clavier et la FAQ native', () => {
  for (const w of [1100,840,720,440]) assert.ok(html.includes('@media (max-width: '+w+'px)'),w);
  assert.match(html, /\.site-nav \{overflow-x:auto/);
  assert.match(html, /a:focus-visible, button:focus-visible/);
  assert.match(html, /<a class="skip" href="#contenu">Aller au contenu<\/a>/);
  assert.match(html, /<main id="contenu" tabindex="-1">/);
  assert.equal(count(/<details class="faq-item">/g),5);
  assert.equal(count(/<h1 /g),1);
});

test('R93 conserve une action privée propriétaire visible sans login intégré', () => {
  assert.match(html, /class="hero-actions"[\s\S]*?href="https:\/\/synestra-client-portal\.synestra-studio\.workers\.dev\/"/);
  assert.match(html, /L’accès au portail et son parcours de connexion sont encore en cours de qualification/);
  assert.doesNotMatch(html, /<input|document\.cookie|localStorage/i);
});
