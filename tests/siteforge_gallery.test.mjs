import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {join, dirname} from 'node:path';

const root=dirname(fileURLToPath(new URL('../index.html',import.meta.url)));
const html=readFileSync(join(root,'index.html'),'utf8');
const gallery=html.match(/<div class="siteforge-gallery"[^>]*>([\s\S]*?)<\/div>\s*<\/section>\s*<section class="container section" id="realisations"/);
test('R89 has one semantic gallery with exactly three real HTML destination pages',()=>{
  assert.ok(gallery,'SiteForge gallery container must exist');
  assert.equal((gallery[1].match(/class="siteforge-gallery-card"/g)||[]).length,3);
  for(const path of ['./siteforge/index.html','./siteforge/lab/index.html','./siteforge/signature/index.html']){
    assert.equal((gallery[1].match(new RegExp('href="'+path.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'"','g'))||[]).length,1,'missing or duplicated '+path);
    assert.ok(existsSync(join(root,path)),'local destination missing '+path);
  }
});
test('R89 provides native accessible links, a heading, and honest disclosure',()=>{
  assert.match(gallery[0],/aria-labelledby="siteforge-gallery-title"/);
  assert.match(gallery[0],/<h3 id="siteforge-gallery-title">/);
  assert.equal((gallery[1].match(/class="siteforge-gallery-card" href/g)||[]).length,3);
  assert.equal((gallery[1].match(/aria-label="Consulter /g)||[]).length,3);
  assert.match(gallery[0],/ne sont ni des captures d’écran/);
  assert.ok(!/<script\b/i.test(html),'source should remain scriptless');
});
test('R89 CSS preserves responsive and reduced-motion controls',()=>{
  assert.match(html,/\.siteforge-gallery-list\s*\{[^}]*grid-template-columns:\s*repeat\(3/);
  assert.match(html,/@media\s*\(max-width:\s*720px\)\s*\{\s*\.siteforge-gallery-list\s*\{\s*grid-template-columns:\s*minmax\(0,\s*1fr\)/);
  assert.match(html,/@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{\s*\.siteforge-gallery-card\s*\{\s*transition:\s*none/);
  assert.match(html,/\.siteforge-gallery-card:focus-visible\s*\{[^}]*outline/);
});
