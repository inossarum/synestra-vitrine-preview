import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const sha=s=>{const u=s.replace(/\r\n/g,'\n');return createHash('sha1').update('blob '+Buffer.byteLength(u)+'\0'+u).digest('hex');};
const html=read('siteforge/core-3d-lab/index.html');
const shader=read('assets/siteforge-lab-r166-flow.js');
const pure=shader.slice(shader.indexOf('if(uFlow.x<.5){'),shader.indexOf('}else if(uFlow.x<1.5){'));
test('R170: home, approved sphere, JSON schema remain untouched',()=>{
 assert.equal(sha(read('index.html')),'1413e30138ba1657f7056401818e697ddbd32ac8');
 assert.equal(sha(read('assets/siteforge-r116-sphere-only.js')),'dd63d75fdb966de2052595c95b7b6cb736d6c7cc');
 assert.equal((html.match(/data-sphere-control=/g)||[]).length,18);
 assert.equal((html.match(/<canvas /g)||[]).length,1);
 assert.match(shader,/schema:'synestra\.siteforge\.plasma-settings\.v1'/);
});
test('R170: speed 0.0 is a real pause in all time-driven shader paths',()=>{
 assert.match(shader,/float t=uTime;/);
 assert.match(shader,/float depth=rnd\(i\+41\.\)\*2\.-1\.,t=uTime;/);
 assert.doesNotMatch(shader,/uTime\*max\(0\.,uControls\.z\)/);
 assert.match(html,/0 % = pause/);
});
test('R170: primary volumetric field has non-radial 3D warping and depth-local energy balance',()=>{
 for(const token of ['float streamBend=','float depthEnvelope=','float filamentContrast='])assert.ok(pure.includes(token),token);
 assert.match(pure,/drifted\.z/);
 assert.match(pure,/streamBend/);
 assert.match(pure,/depthEnvelope/);
 assert.match(pure,/float organicLane=angle\*6\./);
 assert.doesNotMatch(pure,/angle\*2\.3|angle\*\(6\.4/);
});
test('R170: only one WebGL draw engine and 5 material families preserved',()=>{
 assert.equal((shader.match(/gl\.createProgram\(\)/g)||[]).length,1);
 assert.match(shader,/gl\.drawArrays\(gl\.TRIANGLES,0,6\)/);
 for(const x of ["}else if(uFlow.x<1.5){","}else if(uFlow.x<2.5){","}else if(uFlow.x<3.5){"])assert.ok(shader.includes(x));
 assert.match(html,/R172.1 · COMPARER/);
});
