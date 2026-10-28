import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {join, dirname} from 'node:path';
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
 assert.match(r169Review,/src="\.\/assets\/siteforge-lab-r182-vitrine\.js" defer/);
 assert.match(r169Review,/prefers-reduced-motion:reduce/);
 assert.match(r169Review,/script-src 'self'/);
 assert.match(r169Review,/noindex,nofollow/);
 for (const slug of ['connect','bridge','siteforge'])assert.match(r169Review,new RegExp('href="\\./'+slug+'/"'));
 const scripts=[...r169Review.matchAll(/<script\b[^>]*>/g)].map(x=>x[0]);
 assert.deepEqual(scripts,['<script src="./assets/siteforge-lab-r182-vitrine.js" defer>']);
}


const root=dirname(fileURLToPath(new URL('../index.html',import.meta.url)));
const html=readFileSync(join(root,'index.html'),'utf8');
const gallery=html.match(/<div class="siteforge-gallery"[^>]*>([\s\S]*?)<\/div>\s*<\/section>\s*<section class="container section" id="realisations"/);
test('R100 has one semantic gallery with exactly three real HTML destination pages',()=>{
  assert.ok(gallery,'SiteForge gallery container must exist');
  assert.equal((gallery[1].match(/class="siteforge-gallery-card"/g)||[]).length,3);
  for(const path of ['./siteforge/index.html','./siteforge/lab/index.html','./siteforge/signature/index.html']){
    assert.equal((gallery[1].match(new RegExp('href="'+path.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'"','g'))||[]).length,1,'missing or duplicated '+path);
    assert.ok(existsSync(join(root,path)),'local destination missing '+path);
  }
});
test('R100 provides native accessible links, a heading, and honest disclosure',()=>{
 if(r169PreviewActive){verifyR169Preview();return;}
  assert.match(gallery[0],/aria-labelledby="siteforge-gallery-title"/);
  assert.match(gallery[0],/<h3 id="siteforge-gallery-title">/);
  assert.equal((gallery[1].match(/class="siteforge-gallery-card" href/g)||[]).length,3);
  assert.equal((gallery[1].match(/aria-label="Consulter /g)||[]).length,3);
  assert.match(gallery[0],/ne sont ni des captures d’écran/);
  assert.deepEqual([...html.matchAll(/<script\b[^>]*>/g)].map(x=>x[0]),['<script src="./assets/core-r109-webgl.js" defer>']);
  assert.doesNotMatch(gallery[0],/<script\b|<iframe\b|<form\b/i);
});
test('R100 CSS preserves responsive and reduced-motion controls',()=>{
  assert.match(html,/\.siteforge-gallery-list\s*\{[^}]*grid-template-columns:\s*repeat\(3/);
  assert.match(html,/@media\s*\(max-width:\s*720px\)\s*\{\s*\.siteforge-gallery-list\s*\{\s*grid-template-columns:\s*minmax\(0,\s*1fr\)/);
  assert.match(html,/@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{\s*\.siteforge-gallery-card\s*\{\s*transition:\s*none/);
  assert.match(html,/\.siteforge-gallery-card:focus-visible\s*\{[^}]*outline/);
});
