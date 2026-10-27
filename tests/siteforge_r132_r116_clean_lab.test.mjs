import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const load=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const sha=s=>{const source=s.replace(/\r\n/g,'\n');return createHash('sha1').update('blob '+Buffer.byteLength(source)+'\0'+source).digest('hex');};
const page=load('siteforge/core-3d-lab/index.html');
const current=load('assets/siteforge-r116-sphere-only.js');
const historical=load('assets/core-r109-webgl.js');
test('R152: original historical source remains unchanged for rollback and provenance',()=>{
 assert.equal(sha(historical),'d78d7222a95fd080a408bba2237dd3b9dda05bd7');
 // The landing page is intentionally changed for the R164 hero prototype; the historical shader remains immutable.
 assert.match(load('index.html'),/src="\.\/assets\/siteforge-r116-sphere-only\.js"/);
});
test('R152: old sphere implementation is not in the active runtime',()=>{
 assert.doesNotMatch(current,/r111Arc|r145ElectricBolt|uniform vec4 reliefSettings|uniform vec4 surfaceSettings/);
 assert.doesNotMatch(current,/R140 fixed|R116 source blob|shellThicknessRatio/);
 assert.equal((page.match(/data-sphere-control=/g)||[]).length,18);
 assert.equal((page.match(/<script src=/g)||[]).length,1);
 assert.match(page,/src="\.\.\/\.\.\/assets\/siteforge-r116-sphere-only\.js"/);
});
test('R152: blue-cyan-violet original plasma source is now independent of old effect controls',()=>{
 assert.match(current,/void main\(\)/);
 assert.match(current,/uPass>3\.5/);
 assert.match(current,/vec3 accum=vec3\(0\.\)/);
 assert.match(current,/float nucleusRadius=max\(/);
 for(const k of ['energyMode','reliefMode','surfaceFlow','agitation','thickness','diffusion'])
  assert.doesNotMatch(page,new RegExp('id="sf-'+k+'"'));
});
test('R152: fail-closed standalone lab, one engine, no ambient production integration',()=>{
 assert.match(page,/default-src 'none'; script-src 'self'/);
 assert.match(page,/noindex,nofollow/);
 assert.match(page,/prefers-reduced-motion:reduce/);
 assert.match(page,/<svg class="core-r108-art"/);
 assert.equal((page.match(/<canvas /g)||[]).length,1);
 assert.doesNotMatch(page,/<(?:iframe|link)\b/i);
 assert.doesNotMatch(current,/fetch\(|XMLHttpRequest|WebSocket|sendBeacon/);
 assert.match(current,/webglcontextlost/);
 assert.doesNotMatch(current,/startAmbient|syn-ambient-field|metalGyro|SynestraSphere3DShaders/);
});