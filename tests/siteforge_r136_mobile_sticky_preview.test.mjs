import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../siteforge/core-3d-lab/index.html',import.meta.url),'utf8');
test('mobile R116 preview remains sticky above future scrolling controls',()=>{
 assert.match(html,/@media\(max-width:700px\)/);
 assert.match(html,/\.core-r108-stage\{position:sticky;top:env\(safe-area-inset-top,0px\);z-index:30/);
 assert.match(html,/height:clamp\(190px,34svh,290px\)/);
 assert.match(html,/\.core-r109-canvas\{height:100%;transform:scale\(calc\(\.8 \* var\(--sphere-zoom,1\)\)\)\}/);
});
test('the renderer and initial lab baseline remain single-instance',()=>{
 assert.equal((html.match(/<canvas /g)||[]).length,1);
 assert.equal((html.match(/<script src=/g)||[]).length,1);
 assert.match(html,/siteforge-r116-sphere-only\.js/);
 assert.equal((html.match(/data-sphere-control=/g)||[]).length,13);
 assert.match(html,/<form class="lab-controls"/);
});
