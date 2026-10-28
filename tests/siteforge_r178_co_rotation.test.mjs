import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const src=read('assets/siteforge-lab-r166-flow.js');
const vert=src.split('const vertex=')[1].split('const fragment=')[0];
const frag=src.split('const fragment=')[1].split('function compile(')[0];
const c=read('siteforge/core-3d-lab/index.html');
const spin=.104;
const point=[.4,.29,.58];
const spinPoint=(p,a)=>[p[0]*Math.cos(a)-p[1]*Math.sin(a),p[0]*Math.sin(a)+p[1]*Math.cos(a),p[2]];
test('R178 plasma and motes share one *positive* angular phase and identical rate',()=>{
 assert.match(vert,/uniform float uSpinPhase/);
 assert.match(frag,/uniform float uSpinPhase/);
 assert.match(src,/const spinPhase=elapsed\*\.104/);
 assert.match(src,/gl\.uniform1f\(U\.uSpinPhase,spinPhase\)/);
 assert.match(vert,/local\.xy=vec2\(local\.x\*spinCos-local\.y\*spinSin,\s*local\.x\*spinSin\+local\.y\*spinCos\)/);
 assert.match(frag,/float winding=angle\*5\.0\+5\.8\*log\(planar\+\.15\)-uSpinPhase\*5\./);
 const t=6;
 const q=spinPoint(point,spin*t);
 assert.ok(Math.atan2(q[1],q[0])>Math.atan2(point[1],point[0]));
 assert.ok(Math.abs(5*spin*t-.52*t)<1e-12);
});
test('R178 sparkle orientation is projected using same camera orbit and shared phase',()=>{
 assert.match(vert,/vec2 tangent=orbitToView\(vec3\(-local\.y,local\.x,0\.\)\)\.xy/);
 assert.match(vert,/vAxis=normalize\(tangent\+vec2\(\.015,\.005\)\)/);
 assert.match(vert,/p=orbitToView\(local\)/);
 assert.match(vert,/local\+=\.022\*vec3/);
});
test('R178 full yaw 360 degrees in actual camera units with continuous wrap',()=>{
 assert.match(src,/const fullYawTurn=2\*Math\.PI\/1\.5/);
 assert.match(src,/tiltX=wrapYaw\(tiltX\+\(event\.clientX-orbit\.x\)/);
 assert.match(src,/tiltX=wrapYaw\(tiltX\+delta\)/);
 const period=2*Math.PI/1.5;
 const wrap=a=>((a+period/2)%period+period)%period-period/2;
 assert.ok(Math.abs(wrap(period))<1e-12);
 assert.ok(Math.abs(wrap(period/2)*1.5+Math.PI)<1e-12);
 assert.ok(Math.abs(wrap(35*.12)*1.5)<.02);
});
test('R178 pausing material freezes both plasma spin and motes; pointer still decays',()=>{
 assert.match(src,/if\(last\)elapsed\+=Math\.min\(\(now-last\)\/1000,\.15\)\*Math\.max\(0,num\('particleSpeed'\)\)/);
 assert.match(src,/pointerForce\*=Math\.exp\(-3\.6\*frameStep\)/);
 assert.match(src,/stage\.dataset\.syncedSpinPhase=spinPhase\.toFixed\(4\)/);
});
test('R178 mobile still 28 real XYZ motes, 18 settings and single WebGL renderer',()=>{
 assert.match(src,/const moteCount=mobile\?28:46/);
 assert.match(src,/gl\.uniform1f\(U\.uMoteCount,moteCount\)/);
 assert.equal((src.match(/gl\.createProgram\(\)/g)||[]).length,1);
 assert.equal((c.match(/<canvas /g)||[]).length,1);
 assert.equal((c.match(/data-sphere-control=/g)||[]).length,18);
});
test('R178 180 and 360 geometry preserves radial distance, sign and reset',()=>{
 const rot=(p,a)=>spinPoint(p,a);
 const a=rot(point,Math.PI),b=rot(point,2*Math.PI);
 for(let k=0;k<3;k++)assert.ok(Math.abs(a[k]-[-point[0],-point[1],point[2]][k])<1e-12);
 for(let k=0;k<3;k++)assert.ok(Math.abs(b[k]-point[k])<1e-12);
});
