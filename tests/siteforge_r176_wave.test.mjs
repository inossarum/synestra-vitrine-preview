import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url);
const read=p=>readFileSync(new URL(p,root),'utf8');
const source=read('assets/siteforge-lab-r166-flow.js'),html=read('siteforge/core-3d-lab/index.html');
const gitBlob=s=>{const b=Buffer.from(s.replace(/\r\n/g,'\n'));return createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex')};
test('R176 bends existing volumetric field on mouse movement, not mote sprites',()=>{
 assert.match(source,/uniform vec4 uPointer; \/\/ R176/);
 assert.match(source,/vec2 waveWarp=\(radial\*cos\(ripplePhase\)/);
 assert.match(source,/q\.xy\+=waveWarp/);
 assert.match(source,/vec3 undisturbedQ=q;/);
 assert.match(source,/float core=exp\(-dot\(undisturbedQ,undisturbedQ\)/);
 assert.match(source,/float coreHalo=exp\(-dot\(undisturbedQ,undisturbedQ\)/);
});
test('R176 has time-based damping and reversible wake after pointer exit',()=>{
 assert.match(source,/pointerForce\*=Math\.exp\(-3\.6\*frameStep\)/);
 assert.match(source,/stage\.dataset\.waveStrength/);
 assert.match(source,/lastPointerX=null;lastPointerY=null;/);
 assert.doesNotMatch(source,/pointerX=9;pointerY=9;pointerForce=0;lastPointerX=null;lastPointerY=null;/);
});
test('R176 preserves official assets, six flow materials and 18 exported settings',()=>{
 assert.equal(gitBlob(read('index.html')),'1413e30138ba1657f7056401818e697ddbd32ac8');
 assert.equal(gitBlob(read('assets/siteforge-r116-sphere-only.js')),'dd63d75fdb966de2052595c95b7b6cb736d6c7cc');
 assert.equal((html.match(/<canvas /g)||[]).length,1);
 assert.equal((html.match(/data-sphere-control=/g)||[]).length,18);
 assert.equal((html.match(/<option value="\d"/g)||[]).length,6);
 assert.equal((source.match(/gl\.createProgram\(\)/g)||[]).length,1);
});
