import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const count = (fragment) => html.split(fragment).length - 1;

test('les identifiants HTML sont uniques et les liens internes valides', () => {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  const targets = [...html.matchAll(/<a\s[^>]*href="#([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(targets.length > 0);
  for (const target of targets) assert.ok(ids.includes(target), `Ancre sans cible : ${target}`);
});

test('une seule rubrique de titre principal et des sections identifiables', () => {
  assert.equal(count('<h1 '), 1);
  for (const section of ['contenu', 'approche', 'exemples', 'realisations', 'confiance', 'a-propos', 'questions', 'acces-pilote']) {
    assert.ok(html.includes(`id="${section}"`), `Section absente : ${section}`);
  }
});

test('la FAQ utilise les composants natifs et reste sans JavaScript', () => {
  assert.equal(count('<details class="faq-item">'), 5);
  assert.equal(count('</details>'), 5);
  assert.equal(count('<summary>'), 5);
  assert.equal(count('</summary>'), 5);
  assert.doesNotMatch(html, /<script\b/i);
});

test('la vitrine ne crée ni formulaire identifiant ni dépendance tierce', () => {
  assert.doesNotMatch(html, /<(form|iframe|img|link)\b/i);
  assert.ok(html.includes('https://synestra-client-portal.synestra-studio.workers.dev/'));
});

test('la prévisualisation reste non indexable avec CSP restrictive', () => {
  assert.match(html, /content="noindex,nofollow"/);
  assert.ok(html.includes("default-src 'none'; style-src 'unsafe-inline'"));
});

test('l’accessibilité clavier, le responsive et les mouvements réduits sont présents', () => {
  assert.match(html, /\.faq-item summary:focus-visible/);
  assert.match(html, /@media \(max-width: 720px\)/);
  assert.match(html, /\.trust-layout, \.about-panel \{ grid-template-columns: 1fr; \}/);
  assert.match(html, /@media \(prefers-reduced-motion: reduce\)/);
});

test('l’accès pilote ne présente pas de capacité client non qualifiée comme disponible', () => {
  assert.match(html, /Leur présence sur cette page ne prouve pas que toutes les fonctions client sont disponibles/);
  assert.match(html, /La vitrine n’en présente pas encore/);
  assert.match(html, /une demande n’entraîne pas automatiquement une réalisation/);
});

test('navigation vers les réponses et la présentation du studio', () => {
  assert.match(html, /<a href="#questions">Questions<\/a>/);
  assert.match(html, /<a href="#a-propos">À propos<\/a>/);
});

test('le lien d’évitement peut déplacer le focus vers le contenu', () => {
  assert.match(html, /<a class="skip" href="#contenu">Aller au contenu<\/a>/);
  assert.match(html, /<main id="contenu" tabindex="-1">/);
  assert.match(html, /\.skip:focus\s*\{\s*left:\s*1rem/);
  assert.match(html, /a:focus-visible,\s*button:focus-visible/);
});

test('toutes les FAQ restent accessibles avec la sémantique native', () => {
  assert.equal(count('<details class="faq-item">'), 5);
  assert.equal(count('<summary>'), 5);
  assert.doesNotMatch(html, /<summary[^>]*tabindex/);
  assert.doesNotMatch(html, /<script\b/i);
});

test('le script CDP évite les profils périmés et transmet les touches complètes', () => {
  const browser = readFileSync(new URL('./browser_cdp_qa.mjs', import.meta.url), 'utf8');
  assert.match(browser, /mkdtempSync\(join\(tmpdir\(\),'synestra-vitrine-cdp-'\)\)/);
  assert.match(browser, /text:key==='Enter'\?String\.fromCharCode\(13\):' '/);
  assert.match(browser, /unmodifiedText:key==='Enter'\?String\.fromCharCode\(13\):' '/);
  assert.match(browser, /FAQ_KEYBOARD_OPEN_FAIL/);
  assert.match(browser, /SKIP_ENTER_TARGET_FAIL/);
});
