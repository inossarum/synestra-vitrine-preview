import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolveSphereQuality} from '../src/auto-quality-policy.mjs';

const sw='ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero)), SwiftShader driver)';
const gpu='ANGLE (NVIDIA Corporation, NVIDIA GeForce RTX 3090 Direct3D11)';
test('R20260 auto quality avoids the measured slow software profile',()=>{
 assert.equal(resolveSphereQuality('auto',sw),'economy');
 assert.equal(resolveSphereQuality('auto','swiftshader Vulkan'),'economy');
 assert.equal(resolveSphereQuality('auto',gpu),'balanced');
 assert.equal(resolveSphereQuality('auto','UNKNOWN'),'balanced');
 for(const q of ['economy','balanced','ultra']) {
  assert.equal(resolveSphereQuality(q,sw),q,'manual selection must remain authoritative');
  assert.equal(resolveSphereQuality(q,gpu),q);
 }
 for(const invalid of ['','eco','AUTO',null,0])assert.throws(()=>resolveSphereQuality(invalid,gpu),/AUTO_QUALITY_INVALID/);
 for(const invalid of [null,undefined,123])assert.throws(()=>resolveSphereQuality('auto',invalid),/AUTO_RENDERER_INVALID/);
});
test('R20260 defaults to auto and routes all render costs through the same resolved profile',()=>{
 const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
 const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
 assert.match(html,/<option value="auto" selected>Automatique<\/option>/);
 assert.doesNotMatch(html,/<option value="balanced" selected>/);
 assert.match(main,/resolveSphereQuality\(ctl\.quality\.value,rendererName\)/);
 assert.match(main,/cv\.dataset\.effectiveQuality=quality/);
 assert.match(main,/rendererName=String\(/);
 assert.equal((main.match(/new Engine\(/g)||[]).length,1);
 assert.equal((main.match(/new Scene\(/g)||[]).length,1);
});
