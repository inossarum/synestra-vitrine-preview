import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';

const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const htmlCsp=html.match(/<meta http-equiv="Content-Security-Policy" content="([^"]+)"/)?.[1]||'';
const logo='assets/synestra-studio-official-v1.avif';

test('R97 FAILURE-FIRST: GitHack cross-origin asset redirect is explicitly allowed and only as an image',()=>{
  assert.ok(htmlCsp.includes("img-src 'self' https://raw.githubusercontent.com"),'GitHack AVIF redirects to raw.githubusercontent.com; img-src self alone blocks it on the public preview');
  assert.ok(htmlCsp.includes("default-src 'none'"),'strict default required');
  assert.ok(htmlCsp.includes("form-action 'none'"),'no web form');
  assert.ok(htmlCsp.includes("base-uri 'none'"),'no base-uri rewrite');
  assert.ok(!htmlCsp.includes('*')&&!htmlCsp.includes("data:")&&!htmlCsp.includes("unsafe-eval"),'no broadening to data/wildcard/script');
  assert.match(html, /src="\.\/assets\/synestra-studio-official-v1\.avif"/);
  assert.equal((html.match(/src="\.\/assets\/synestra-studio-official-v1\.avif"/g)||[]).length,2);
});

test('R97 avoids extra HTML remote resources or synthetic live claims',()=>{
  assert.doesNotMatch(html, /<script\b|<iframe\b|<form\b/i);
  assert.match(html, /content="noindex,nofollow"/);
  assert.match(html, /Cette vue est une illustration/);
  assert.match(html, /Aucun état de connexion live n'est représenté/);
});
