import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import assert from 'node:assert/strict';

const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const original=readFileSync(join(root,'assets/siteforge-r116-sphere-only.js'),'utf8');
const candidatePath=join(root,'assets/siteforge-r190-hover-flux.js');
const htmlPath=join(root,'r190-hero-hover-flux.html');
const sourceHash='4aae64e2128d40a8fffa675ce12223a00c3d508b33f19b807c8b50145a197fd0';
const hash=s=>createHash('sha256').update(s).digest('hex');
function verify(src,html){
 assert.match(src,/uniform vec3 uPointer;/);
 assert.match(src,/gl\.uniform3f\(U\.uPointer/);
 assert.match(src,/uPointer\.z\s*\*\s*exp\(/);
 assert.match(src,/flowDeflection/);
 assert.match(src,/basePhase[\s\S]*?\+\s*flowDeflection/);
 assert.match(src,/stage\.addEventListener\('pointermove'/);
 assert.match(src,/canvas\.getBoundingClientRect\(\)/);
 assert.match(src,/event\.pointerType==='touch'/);
 assert.match(src,/pointerImpulse\s*=\s*0/);
 assert.doesNotMatch(src,/tiltX\s*=\s*Math\.max\(/);
 assert.doesNotMatch(src,/tiltY\s*=\s*Math\.max\(/);
 assert.match(src,/gl\.uniform2f\(U\.uTilt,0,0\)/);
 assert.match(src,/pointerImpulse\s*\*=\s*Math\.exp\(/);
 assert.match(html,/src="\.\/assets\/siteforge-r190-hover-flux\.js" defer/);
 assert.equal((html.match(/<canvas class="core-r109-canvas"/g)||[]).length,1);
 assert.equal((html.match(/class="r189-system-map"/g)||[]).length,1);
 assert.match(html,/name="viewport"/);
}
test('R190 original engine and R189 composition remain byte-identical',()=>{
 assert.equal(hash(original),sourceHash);
 assert.ok(readFileSync(join(root,'r189-hero-candidate.html'),'utf8').includes('siteforge-r116-sphere-only.js'));
});
test('R190 hover flux moves local filaments without moving camera',()=>{
 assert.ok(existsSync(candidatePath),'R190 shader missing');
 assert.ok(existsSync(htmlPath),'R190 preview missing');
 verify(readFileSync(candidatePath,'utf8'),readFileSync(htmlPath,'utf8'));
});
test('R190 negative: rotating camera on pointer is rejected',()=>{
 const src=readFileSync(candidatePath,'utf8'),html=readFileSync(htmlPath,'utf8');
 assert.throws(()=>verify(src.replace('gl.uniform2f(U.uTilt,0,0)','gl.uniform2f(U.uTilt,tiltX,tiltY)'),html));
});
test('R190 negative: lost pointer uniform is rejected',()=>{
 const src=readFileSync(candidatePath,'utf8'),html=readFileSync(htmlPath,'utf8');
 assert.throws(()=>verify(src.replace('uniform vec3 uPointer;',''),html));
});
