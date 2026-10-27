import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import './siteforge_r137_live_controls.test.mjs'; // R137 live lab acceptance runs in standard Cloudflare build gate.
import './siteforge_r159_shell_arcs.test.mjs'; // R159 independent shell/arc contracts.
import './siteforge_r160_pure_material.test.mjs'; // R160 pure-only visual family acceptance.
import './siteforge_r161_shell_free_ui.test.mjs'; // R161 shell-free UI and 18-field compatibility acceptance.
import './siteforge_r132_r116_clean_lab.test.mjs'; // R116 provenance and isolation.
import './siteforge_r136_mobile_sticky_preview.test.mjs'; // Mobile sticky continuity.

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
  assert.equal((html.match(/<details class="faq-item">[\s\S]*?<\/details>/g)||[]).length,5);
  assert.equal((html.match(/<details class="faq-item">\s*<summary>/g)||[]).length,5);
  assert.equal((html.match(/<details class="faq-item">\s*<summary>[\s\S]*?<\/summary>/g)||[]).length,5);
  assert.deepEqual([...html.matchAll(/<script\b[^>]*>/g)].map(x=>x[0]),['<script src="./assets/core-r109-webgl.js" defer>']);
});

test('la vitrine ne crée ni formulaire identifiant ni dépendance tierce', () => {
  assert.doesNotMatch(html, /<(form|iframe|link)\b/i);
  assert.ok(html.includes('https://synestra-client-portal.synestra-studio.workers.dev/'));
});

test('la prévisualisation reste non indexable avec CSP restrictive', () => {
  assert.match(html, /content="noindex,nofollow"/);
  assert.ok(html.includes("default-src 'none'; style-src 'unsafe-inline'"));
  assert.match(html,/script-src 'self'; base-uri 'none'/);
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
  assert.equal((html.match(/<details class="faq-item">\s*<summary>/g)||[]).length,5);
  assert.doesNotMatch(html, /<summary[^>]*tabindex/);
  assert.deepEqual([...html.matchAll(/<script\b[^>]*>/g)].map(x=>x[0]),['<script src="./assets/core-r109-webgl.js" defer>']);
});

test('le script CDP évite les profils périmés et transmet les touches complètes', () => {
  const browser = readFileSync(new URL('./browser_cdp_qa.mjs', import.meta.url), 'utf8');
  assert.match(browser, /mkdtempSync\(join\(tmpdir\(\),'synestra-vitrine-cdp-'\)\)/);
  assert.match(browser, /text:key==='Enter'\?String\.fromCharCode\(13\):' '/);
  assert.match(browser, /unmodifiedText:key==='Enter'\?String\.fromCharCode\(13\):' '/);
  assert.match(browser, /FAQ_KEYBOARD_OPEN_FAIL/);
  assert.match(browser, /SKIP_ENTER_TARGET_FAIL/);
});


test('SiteForge est une rubrique accessible, reliee a la demonstration publique existante', () => {
  assert.match(html, /id="siteforge" aria-labelledby="siteforge-title"/);
  assert.match(html, /<h2 id="siteforge-title">SiteForge : une démonstration à explorer\.<\/h2>/);
  assert.match(html, /<a href="\.\/siteforge\/">SiteForge<\/a>/);
  assert.match(html, /href="\.\/siteforge\/"/);
  assert.doesNotMatch(html, /href="https:\/\/inossarum\.github\.io\/synestra-vitrine-preview\/siteforge\/"/);
  assert.match(html, /aria-label="Explorer la démonstration SiteForge sur ce site"/);
  assert.match(html, /role="img" aria-label="Illustration conceptuelle non interactive/);
});

test('SiteForge ne presente pas la maquette comme un client livre ou un E2E certifie', () => {
  assert.match(html, /Un aperçu public du travail de présentation web, distinct d’un projet client terminé/);
  assert.match(html, /composition CSS indicative, pas une capture certifiée du prototype/);
  assert.match(html, /sans résultat client revendiqué/);
  assert.deepEqual([...html.matchAll(/<script\b[^>]*>/g)].map(x=>x[0]),['<script src="./assets/core-r109-webgl.js" defer>']);
  assert.doesNotMatch(html, /<iframe\b|<form\b/i);
});

test('SiteForge conserve le responsive, le clavier et aucun chargement de ressource tierce', () => {
  assert.match(html, /\.siteforge-showcase\s*\{\s*display: grid/);
  assert.match(html, /@media \(max-width: 840px\)/);
  assert.match(html, /\.siteforge-preview-tiles\s*\{\s*grid-template-columns: minmax\(0,1fr\)/);
  assert.match(html, /a:focus-visible, button:focus-visible/);
  assert.match(html, /default-src 'none'; style-src 'unsafe-inline'/);
});

test('la navigation publique garde une connexion visible, sans authentification locale', () => {
  assert.match(html, /<a class="nav-cta" href="https:\/\/synestra-client-portal\.synestra-studio\.workers\.dev\/" rel="noreferrer">Espace pilote <span/);
  assert.match(html, /L’accès au portail et son parcours de connexion sont encore en cours de qualification/);
  assert.deepEqual([...html.matchAll(/<script\b[^>]*>/g)].map(x=>x[0]),['<script src="./assets/core-r109-webgl.js" defer>']);
  assert.doesNotMatch(html, /<form\b/i);
});

test('le parcours SiteForge reste sur l’origine de la vitrine, quelle que soit son adresse', () => {
  assert.match(html, /href="\.\/siteforge\/"/);
  assert.equal(new URL('./siteforge/', 'https://inossarum.github.io/synestra-vitrine-preview/').href,
    'https://inossarum.github.io/synestra-vitrine-preview/siteforge/');
  assert.equal(new URL('./siteforge/', 'https://synestra.example/').href, 'https://synestra.example/siteforge/');
  assert.doesNotMatch(html, /href="https:\/\/inossarum\.github\.io\/synestra-vitrine-preview\/siteforge\/"/);
  assert.match(html, /La démonstration est accessible sur le même site que cette vitrine/);
});
