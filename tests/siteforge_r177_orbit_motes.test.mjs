import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const shader=read('assets/siteforge-lab-r166-flow.js');
const html=read('siteforge/core-3d-lab/index.html');
const vertex=shader.split('const vertex=')[1].split('const fragment=')[0];
const frag=shader.split('const fragment=')[1].split('function compile(')[0];
const norm=a=>Math.hypot(...a);
function toView(p,yaw,pitch){const sy=Math.sin(yaw*1.5),cy=Math.cos(yaw*1.5),sx=Math.sin(pitch*1.5),cx=Math.cos(pitch*1.5);const v=[p[0],p[1]*cx+p[2]*sx,-p[1]*sx+p[2]*cx];return [v[0]*cy-v[2]*sy,v[1],v[0]*sy+v[2]*cy];}
function toLocal(p,yaw,pitch){const sy=Math.sin(yaw*1.5),cy=Math.cos(yaw*1.5),sx=Math.sin(pitch*1.5),cx=Math.cos(pitch*1.5);const v=[p[0]*cy+p[2]*sy,p[1],-p[0]*sy+p[2]*cy];return [v[0],v[1]*cx-v[2]*sx,v[1]*sx+v[2]*cx];}
const rnd=x=>((Math.sin(x*127.1+49.6)*43758.5453)%1+1)%1;
function positions(count){return Array.from({length:count},(_,i)=>{const z=1-2*(i+.5)/count,a=i*2.39996323+.13*(rnd(i*19.1)-.5),r=.64*(1.035+.31*rnd(i*7.19+17.)),side=Math.sqrt(Math.max(0,1-z*z));return [Math.cos(a)*side*r,z*r,Math.sin(a)*side*r];});}
test('R177 full-sphere six directions on 46 desktop and 28 mobile motes',()=>{
 for(const count of [46,28]){const ps=positions(count);for(let k=0;k<3;k++){assert.ok(ps.some(p=>p[k]>.13),'plus side '+k);assert.ok(ps.some(p=>p[k]<-.13),'minus side '+k);}assert.ok(new Set(ps.map(p=>Math.round(norm(p)*100))).size>=8,'variable radii');assert.ok(ps.every(p=>norm(p)>.64&&norm(p)<.87));}
 assert.match(vertex,/1\.-2\.\*\(i\+\.5\)\/max\(1\.,uMoteCount\)/);
 assert.match(vertex,/float polar=i\*2\.39996323/);
});
test('R177 exact inverse camera matrix, matching volumetric plasma camera',()=>{
 for(const yaw of [-1.05,-.51,0,.51,1.05])for(const pitch of [-.72,-.3,0,.3,.72])for(const p of positions(46)){const v=toView(p,yaw,pitch),restored=toLocal(v,yaw,pitch);for(let k=0;k<3;k++)assert.ok(Math.abs(restored[k]-p[k])<1e-10);assert.ok(Math.abs(norm(v)-norm(p))<1e-10);}
 assert.match(vertex,/vec3 orbitToView\(vec3 local\)/);
 assert.match(vertex,/vec3 orbitToLocal\(vec3 view\)/);
 assert.match(vertex,/p=orbitToView\(local\)/);
 assert.match(frag,/q=vec3\(q\.x\*cy\+q\.z\*sy/);
});
test('R177 orbit changes XYZ perspective and reset returns home',()=>{
 const p=[.44,.27,.51],b=toView(p,.9,-.3);assert.ok(Math.abs(b[0]-p[0])>.12);assert.ok(Math.abs(b[2]-p[2])>.03);
 for(const v of positions(28)){const q=toView(v,0,0);for(let k=0;k<3;k++)assert.ok(Math.abs(q[k]-v[k])<1e-12);}
});
test('R177 rear occlusion and coherent local-pointer displacement',()=>{
 assert.match(vertex,/vMoteDepth=p\.z;vMoteCenter=p\.xy;/);
 assert.match(frag,/if\(vMoteDepth<-.02&&length\(vMoteCenter\)<radius\*\.985\)discard/);
 const a=vertex.indexOf('vec3 cursorLocal=orbitToLocal('),b=vertex.indexOf('local+=away/max('),c=vertex.indexOf('p=orbitToView(local);');
 assert.ok(a>0&&a<b&&b<c);
 assert.match(shader,/pointerForce\*=Math\.exp\(-3\.6\*frameStep\)/);
});
test('R177 retains one renderer, 18 JSON controls, 6 materials, no extra WebGL program',()=>{
 assert.equal((shader.match(/gl\.createProgram\(\)/g)||[]).length,1);
 assert.equal((html.match(/<canvas /g)||[]).length,1);
 assert.equal((html.match(/data-sphere-control=/g)||[]).length,18);
 assert.match(shader,/gl\.uniform1f\(U\.uMoteCount,Math\.max\(1,moteCount\)\)/);
 assert.match(shader,/const moteCount=Math\.min\(mobile\?96:160/);
 assert.match(shader,/schema:'synestra\.siteforge\.plasma-settings\.v1'/);
});
