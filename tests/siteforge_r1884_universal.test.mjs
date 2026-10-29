import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const txt=n=>readFileSync(new URL('../'+n,import.meta.url),'utf8').replace(/\r\n/g,'\n');
const before=txt('siteforge-r1883-autonome.html'),after=txt('siteforge-r1884-autonome.html');
const shader=after.slice(after.indexOf('uniform vec2 uResolution'),after.indexOf('function compile(type,src)'));
test('nine selectable materials, previous ids retained',()=>{
 const opt=after.match(/<select id="sf-flowType"[^>]*>([\s\S]*?)<\/select>/)?.[1]||'';
 assert.deepEqual([...opt.matchAll(/<option value="(\d+)"/g)].map(x=>Number(x[1])),[0,1,2,3,4,5,6,7,8]);
 for(const v of ['Flux plasma','Rubans magnétiques','Voiles d’aurore','Courants liquides','Arcs pulsés','Vortex polaire'])assert.ok(opt.includes(v),v);
});
test('shared UI controls remain single source of truth and JSON v1 is not broken',()=>{
 for(const q of ['data-flow-control="count"','data-flow-control="spread"','data-flow-control="pulseSpeed"','data-flow-control="pulseIntensity"','data-energy-turbulence type="range"','data-energy-mouse-toggle','data-energy-palette']){
  assert.equal(after.split(q).length,before.split(q).length,q);
 }
 assert.match(after,/schema:'synestra\.siteforge\.plasma-settings\.v1'/);
 assert.match(after,/dynamics\.turbulence<0\|\|dynamics\.turbulence>200/);
});
test('historical 0..5 flow materials respond to shared controls',()=>{
 for(const clause of [
  'float t=uTime*clamp(uFlowLab.z,0.,2.5);',
  'q.xy+=waveWarp*clamp(uEnergyMouse,0.,1.)',
  'float sharedTurbulence=clamp(uEnergyTurbulence,0.,2.);',
  'q.xy/=clamp(uFlowLab.y,.70,1.30);',
  'float sharedCount=clamp(floor(uFlowLab.x+.5),3.,8.);',
  'clamp(uFlowLab.w,0.,2.)',
  'vec3 ion=mix(uEnergyA,uEnergyB,',
  'vec3 blue=mix(uDeep*.45+uEnergyCore*.14,uEnergyB*.54,',
 ])assert.ok(shader.includes(clause),clause);
 assert.match(shader,/uCore\*core\*/); // independent nucleus remains
});
test('7 and 8 have different 3D motion, last living flux retains gentle micro-body',()=>{
 for(const s of ['float fluxFamily=floor(uFlow.x+.5)','fluxFamily>6.5&&fluxFamily<7.5','fluxFamily>7.5','float polarTwist=.38*sin','float signature=fluxFamily<6.5?'])assert.ok(shader.includes(s),s);
 assert.ok(shader.includes('float stepsNeon=clamp(max(uEnergySteps'));
 assert.ok(!after.includes('new WebGL2RenderingContext'));
});
test('CSP is exact and legacy WebGL only',()=>{
 const code=after.match(/<script>([\s\S]*?)<\/script>/)?.[1];
 assert.ok(code);
 assert.ok(after.includes("script-src 'sha256-"+createHash('sha256').update(code).digest('base64')+"'"));
 assert.ok(!after.includes("script-src 'unsafe-inline'"));
 assert.equal((after.match(/<canvas /g)||[]).length,(before.match(/<canvas /g)||[]).length);
});
