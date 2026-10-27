import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../siteforge/core-3d-lab/index.html',import.meta.url),'utf8');
test('R152: mobile viewport remains sticky during simple plasma editor scrolling',()=>{
 assert.match(html,/@media\(max-width:700px\)/);
 assert.match(html,/\.core-r108-stage\{position:sticky;top:env\(safe-area-inset-top,0px\);z-index:30/);
 assert.match(html,/height:clamp\(190px,34svh,290px\)/);
 assert.match(html,/\.core-r109-canvas\{height:100%;transform:scale\(calc\(1\.22 \* var\(--sphere-zoom,1\)\)\)\}/);
});
test('R152: one responsive canvas with simplified controls and no old slider groups',()=>{
 assert.equal((html.match(/<canvas /g)||[]).length,1);
 assert.equal((html.match(/<script src=/g)||[]).length,1);
 assert.match(html,/siteforge-r116-sphere-only\.js/);
 assert.equal((html.match(/data-sphere-control=/g)||[]).length,16);
 assert.equal((html.match(/type="range"/g)||[]).length,11);
 assert.match(html,/<form class="lab-controls"/);
 assert.match(html,/<details class="vfx-advanced">/);
 assert.doesNotMatch(html,/Type de relief|Énergie de surface|Épaisseur de la coque|Agitation de la matière/);
});