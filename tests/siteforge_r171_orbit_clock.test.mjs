import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const sha=s=>{const u=s.replace(/\r\n/g,'\n');return createHash('sha1').update('blob '+Buffer.byteLength(u)+'\0'+u).digest('hex')};
const home=read('index.html'),original=read('assets/siteforge-r116-sphere-only.js');
const lab=read('assets/siteforge-lab-r166-flow.js'),html=read('siteforge/core-3d-lab/index.html');
test('R171: official vitrine and approved engine are byte-identical; 18 JSON parameters and one renderer',()=>{
 assert.equal(sha(home),'1413e30138ba1657f7056401818e697ddbd32ac8');
 assert.equal(sha(original),'dd63d75fdb966de2052595c95b7b6cb736d6c7cc');
 assert.equal((html.match(/data-sphere-control=/g)||[]).length,18);
 assert.equal((html.match(/<canvas /g)||[]).length,1);
 assert.match(lab,/schema:'synestra.siteforge.plasma-settings.v1'/);
 assert.match(lab,/const w=stage.clientWidth,h=stage.clientHeight/);
});
test('R171: animation time remains continuous across zero-speed pause/restart',()=>{
 assert.match(lab,/elapsed\+=Math\.min\(\(now-last\)\/1000,\.06\)\*Math\.max\(0,num\('particleSpeed'\)\)/);
 assert.equal((lab.match(/t=uTime;/g)||[]).length,2);
 assert.doesNotMatch(lab,/uTime\*max\(0\.,uControls\.z\)/);
});
test('R171: manual orbit with pointer capture, reset and keyboard access',()=>{
 assert.match(html,/tabindex="0"/);
 assert.match(html,/touch-action:none/);
 assert.match(html,/R171 · ORBITE 3D/);
 for(const token of ["setPointerCapture","releasePointerCapture","pointerdown","pointermove","pointercancel","keydown","dblclick","dataset.orbitYaw","dataset.orbitPitch"])assert.ok(lab.includes(token),token);
 assert.match(lab,/tiltX=Math\.max\(-1\.05/);
 assert.match(lab,/tiltY=Math\.max\(-\.72/);
 assert.match(lab,/event\.key==='Home'/);
 assert.match(lab,/event\.key==='ArrowLeft'/);
});
test('R171: GPU orientation still rotates 3D volume rather than 2D texture',()=>{
 assert.match(lab,/rotY=uTilt\.x\*1\.5,rotX=uTilt\.y\*1\.5/);
 assert.ok(lab.includes('q=vec3(q.x*cy+q.z*sy'));
 assert.equal((lab.match(/gl\.createProgram\(\)/g)||[]).length,1);
});
