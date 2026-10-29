import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
const read=name=>readFileSync(new URL('../'+name,import.meta.url),'utf8').replace(/\r\n/g,'\n');
const before=read('siteforge-r1882-autonome.html'),after=read('siteforge-r1883-autonome.html');
test('slider reaches 200 but default remains 35',()=>{
 assert.match(after,/data-energy-turbulence type="range" min="0" max="200" step="1" value="35" data-default="35"/);
 assert.match(after,/200 % : déformation interne doublée/);
 assert.match(after,/Number\(energyTurbulence.value\)\/100/);
});
test('shader accepts 2.0 with original amplitude at 1.0',()=>{
 assert.match(after,/float energyEddy=clamp\(uEnergyTurbulence,0\.,2\.\)/);
 assert.match(after,/q\.xy\+=shear\*\(energyEddy\*\.027\)/);
 assert.match(after,/if\(energyEddy>\.0001&&uFlowLab\.z>\.0001\)/);
 assert.match(before,/float energyEddy=clamp\(uEnergyTurbulence,0\.,1\.\)/);
});
test('strict JSON range 0..200 and v1 files remain compatible',()=>{
 assert.match(after,/dynamics\.turbulence<0\|\|dynamics\.turbulence>200/);
 assert.match(after,/const nextTurbulence=dynamics===undefined\?turbulenceDefault:dynamics\.turbulence/);
 assert.match(after,/schema:'synestra\.siteforge\.plasma-settings\.v1'/);
 for(const label of ['data-sphere-control=','data-flow-control=','data-mote-control=','data-energy-color='])assert.equal(after.split(label).length,before.split(label).length,label);
});
test('CSP hash matches exact inline script; no additional external loading',()=>{
 const script=after.match(/<script>([\s\S]*?)<\/script>/)?.[1];
 assert.ok(script);
 const hash=createHash('sha256').update(script).digest('base64');
 assert.ok(after.includes("script-src 'sha256-"+hash+"'"));
 assert.ok(!after.includes("script-src 'unsafe-inline'"));
 assert.equal(after.match(/<script>/g)?.length,1);
});
