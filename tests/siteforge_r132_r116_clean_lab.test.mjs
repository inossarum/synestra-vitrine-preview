import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';

const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const blobSHA=text=>createHash('sha1').update('blob '+Buffer.byteLength(text)+'\0'+text).digest('hex');
const page=read('siteforge/core-3d-lab/index.html');
const core=read('assets/siteforge-r116-sphere-only.js');
const original=read('assets/core-r109-webgl.js');
const fragment=text=>text.match(/const fragment = `([\s\S]*?)`;/)?.[1]??'';

test('R132: R116 source is pinned to exact historical WebGL Git blob',()=>{
  assert.equal(blobSHA(original),'d78d7222a95fd080a408bba2237dd3b9dda05bd7');
  assert.equal(blobSHA(read('index.html')),'4707e6dbc1330fcdf3a3abb48f909406c5e86d61');
});
test('R137: original R116 is preserved; working shader retains eight original arcs',()=>{
  assert.equal((fragment(original).match(/=r111Arc\(p,/g)||[]).length,8);
  assert.equal((fragment(core).match(/=r111Arc\(p,/g)||[]).length,8);
  assert.match(fragment(core),/float radius=\.69;/);
  assert.match(fragment(core),/float cycleTime=1\.12;/);
  assert.match(fragment(core),/uniform vec3 primaryColor;/);
  assert.notEqual(fragment(core),fragment(original));
});
test('R132: isolate sphere without original website ambient decorations',()=>{
  assert.doesNotMatch(core,/startAmbient|syn-ambient-field|siteforge-r119|metalGyro|SynestraSphere3DShaders/);
  assert.match(core,/webglcontextlost/);
  assert.match(core,/if \(reduceMotion\.matches\) return;/);
});
test('R137: isolated lab has one GL renderer and only 13 owner-approved sphere controls',()=>{
  assert.equal((page.match(/<canvas\b/g)||[]).length,1);
  assert.equal((page.match(/<script\b/g)||[]).length,1);
  assert.match(page,/class="core-r108-stage core-r109-stage"/);
  assert.match(page,/src="\.\.\/\.\.\/assets\/siteforge-r116-sphere-only\.js"/);
  assert.equal((page.match(/data-sphere-control=/g)||[]).length,13);
  assert.doesNotMatch(page,/siteforge-3d-editor|siteforge-r119|core-r122|siteforge-3d-pulse-geometry|siteforge-3d-sphere-shaders/);
});
test('R132: the blank lab remains fail-closed and has an SVG fallback',()=>{
  assert.match(page,/default-src 'none'; script-src 'self'/);
  assert.match(page,/noindex,nofollow/);
  assert.match(page,/prefers-reduced-motion:reduce/);
  assert.match(page,/<svg class="core-r108-art"/);
  assert.doesNotMatch(page,/<(?:iframe|form|link)\b/i);
  assert.doesNotMatch(core,/fetch\(|XMLHttpRequest|WebSocket|sendBeacon/);
});
