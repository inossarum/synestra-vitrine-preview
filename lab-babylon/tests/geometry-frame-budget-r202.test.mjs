import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {geometryUpdateDecision,GEOMETRY_INTERVAL_MS} from '../src/geometry-frame-budget.mjs';
const args={now:0,time:0,quality:'balanced',mode:0,power:145,radius:1,amount:24,turbulence:.45};
test('R202 CPU geometry updates are bounded independently of smooth GPU display frames',()=>{
 const first=geometryUpdateDecision(null,args);assert.equal(first.update,true);
 const skipped=geometryUpdateDecision(first.next,{...args,now:16,time:.016});assert.equal(skipped.update,false);
 assert.equal(geometryUpdateDecision(skipped.next,{...args,now:29,time:.029}).update,true);
 assert.deepEqual(GEOMETRY_INTERVAL_MS,{economy:48,balanced:28,auto:28,ultra:20});
});
test('R202 frozen animation has no repeated expensive geometry uploads',()=>{
 const first=geometryUpdateDecision(null,{...args,time:6});
 assert.equal(geometryUpdateDecision(first.next,{...args,now:100,time:6}).update,false);
});
test('R202 UI controls and zero-power transitions update geometry immediately',()=>{
 const first=geometryUpdateDecision(null,args);
 for(const delta of [{power:0},{quality:'economy'},{mode:3},{radius:.5},{amount:14},{turbulence:0}]){
  assert.equal(geometryUpdateDecision(first.next,{...args,...delta,now:1}).update,true);
 }
});
test('R202 invalid frame state fails closed',()=>{
 for(const delta of [{quality:'unknown'},{power:-1},{now:NaN},{turbulence:9},{mode:8}])
  assert.throws(()=>geometryUpdateDecision(null,{...args,...delta}),/INVALID/);
});
test('R202 keeps one render loop and unthrottled shader-time updates',()=>{
 const src=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
 assert.match(src,/geometryUpdateDecision/);
 assert.match(src,/if\(geometryStep.update\)\{/);
 assert.match(src,/plasmaField\.update\(/);
 assert.match(src,/coreMat\.setFloat\('uTime',time\)/);
 assert.equal((src.match(/engine\.runRenderLoop\(/g)||[]).length,1);
 assert.ok(src.indexOf('scene.render();')>src.indexOf('if(geometryStep.update){'));
});
