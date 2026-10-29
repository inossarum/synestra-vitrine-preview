import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const root=new URL('..',import.meta.url);
const read=n=>readFileSync(new URL(n,root),'utf8').replace(/\r\n/g,'\n');
const before=read('siteforge-r1881-autonome.html'),after=read('siteforge-r1882-autonome.html');
const shader=s=>{const a=s.indexOf('if(uPass>3.5&&uPass<4.5&&uFlow.x>5.5){');const b=s.indexOf('if(uPass>3.5&&uPass<4.5){',a+5);assert.ok(a>0&&b>a);return s.slice(a,b)};
test('source delta limited to one extra WebGL uniform and optional energy material control',()=>{
 for(const g of ['sphere','flow','mote']){
  const re=new RegExp('data-'+g+'-control="([^"]+)"','g');
  assert.deepEqual([...before.matchAll(re)].map(m=>m[1]),[...after.matchAll(re)].map(m=>m[1]));
 }
 assert.equal((after.match(/data-energy-turbulence /g)||[]).length,1);
 assert.match(after,/uEnergyTurbulence/);
 assert.match(after,/uniform float uEnergyTurbulence;/);
 assert.equal((after.match(/<script>/g)||[]).length,1);
});
test('CSP hash exact, no unsafe-inline and no additional external scripts',()=>{
 const s=after.match(/<script>([\s\S]*?)<\/script>/)?.[1];
 assert.ok(s);
 const csp=after.match(/script-src 'sha256-([^']+)'/)?.[1];
 assert.equal(csp,createHash('sha256').update(s).digest('base64'));
 assert.ok(!after.includes("script-src 'unsafe-inline'"));
 assert.equal((after.match(/<canvas/g)||[]).length,(before.match(/<canvas/g)||[]).length);
});
test('time paused or amplitude zero disable the 3D flow warp',()=>{
 const e=shader(after);
 assert.match(e,/float energyEddy=clamp\(uEnergyTurbulence,0\.,1\.\)/);
 assert.match(e,/if\(energyEddy>\.0001&&uFlowLab\.z>\.0001\)/);
 assert.match(e,/q\.xy\+=shear\*\(energyEddy\*\.027\)/);
 assert.ok(!shader(before).includes('energyEddy'));
});
test('JSON schema version unchanged and optional validated energyDynamics sibling',()=>{
 assert.match(after,/schema:'synestra\.siteforge\.plasma-settings\.v1'/);
 assert.match(after,/const energyDynamics=\{turbulence:Number\(energyTurbulence\.value\)\}/);
 assert.match(after,/energyVisual,\s*energyDynamics/);
 assert.match(after,/const dynamics=doc\.energyDynamics/);
 assert.match(after,/typeof dynamics\.turbulence!=='number'/);
 assert.match(after,/!Number\.isInteger\(dynamics\.turbulence\)/);
 assert.match(after,/dynamics\.turbulence<0\|\|dynamics\.turbulence>100/);
 assert.match(after,/const nextTurbulence=dynamics===undefined\?turbulenceDefault:dynamics\.turbulence/);
 assert.match(after,/energyTurbulence\.value=String\(values\.nextTurbulence\)/);
 assert.match(after,/energyTurbulence\.value=String\(turbulenceDefault\)/);
});
