import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';

const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('R95 ne réemploie pas le mauvais logo au premier plan',()=>{
  assert.match(html,/R95: cinematic Studio visual language/);
  assert.match(html,/\.brand-symbol\s*\{display:none!important;\}/);
  assert.match(html,/\.core-sigil\s*\{display:none!important;\}/);
  assert.match(html,/NOT verified/);
});

test('R95 animations cinématiques présentes et abordables',()=>{
  for(const name of ['cin-header','cin-aurora','cin-radar','cin-tilt','cin-glint','cin-scan','cin-connect','cin-connect-reverse']){
    assert.match(html,new RegExp('@keyframes '+name+'\\b'));
  }
  assert.match(html,/\.stage-telemetry\s*\{/);
  assert.match(html,/class="stage-crosshair" aria-hidden="true"/);
  assert.match(html,/class="stage-corner corner-one" aria-hidden="true"/);
  assert.match(html,/class="stage-corner corner-two" aria-hidden="true"/);
  assert.match(html,/class="stage-telemetry" aria-hidden="true"/);
});

test('R95 respecte mouvement réduit, CSP, origine et fidélité produit',()=>{
  const reduced=html.slice(html.lastIndexOf('@media(prefers-reduced-motion:reduce)'));
  assert.match(reduced,/cin-radar|system-stage::after/);
  assert.match(reduced,/animation:none!important/);
  assert.doesNotMatch(html,/<script\b|<iframe\b|<form\b/i);
  assert.match(html,/noindex,nofollow/);
  assert.match(html,/default-src 'none'; style-src 'unsafe-inline'; img-src 'self'/);
  assert.match(html,/id="bridge"/);
  assert.match(html,/id="connect"/);
  assert.match(html,/Aucun état de connexion live n'est représenté/);
});

test('R95 ne perturbe pas les ancres et la FAQ R93',()=>{
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 const links=[...html.matchAll(/<a\s[^>]*href="#([^"]+)"/g)].map(m=>m[1]);
 assert.equal(ids.length,new Set(ids).size);
 assert.ok(links.every(x=>ids.includes(x)));
 assert.equal([...html.matchAll(/<details class="faq-item">/g)].length,5);
 assert.equal([...html.matchAll(/<h1 /g)].length,1);
});
