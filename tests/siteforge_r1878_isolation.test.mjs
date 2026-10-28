import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const base=readFileSync(new URL('../siteforge-r1877-autonome.html',import.meta.url),'utf8').replace(/\r\n/g,'\n');
const next=readFileSync(new URL('../siteforge-r1878-autonome.html',import.meta.url),'utf8').replace(/\r\n/g,'\n');
const head='  if(uPass>3.5&&uPass<4.5&&uFlow.x>5.5){',tail=' if(uPass>3.5&&uPass<4.5){';
const branch=s=>{let a=s.indexOf(head),b=s.indexOf(tail,a+head.length);assert.ok(a>0&&b>a);return {a,b,body:s.slice(a,b)}};
const old=branch(base),cur=branch(next);
const hash=s=>s.match(/script-src 'sha256-([^']+)'/)?.[1];
test('CSP exact, WebGL1 uniform and 18 historical JSON keys preserved',()=>{
 assert.ok(hash(next));
 assert.equal(hash(next),createHash('sha256').update(next.match(/<script>([\s\S]*?)<\/script>/)[1]).digest('base64'));
 assert.ok(!next.includes("script-src 'unsafe-inline'"));
 assert.equal((next.match(/data-sphere-control=/g)||[]).length,18);
 assert.equal((next.match(/data-mote-control=/g)||[]).length,10);
 assert.equal((next.match(/<select id="sf-flowType"[\s\S]*?<\/select>/)||[]).length,1);
 assert.equal((next.match(/<select id="sf-flowType"[\s\S]*?<\/select>/)[0].match(/<option value="[0-6]"/g)||[]).length,7);
});
test('Four controls independently configured and baseline defaults',()=>{
 for(const [key,min,max,value] of [['count',3,8,5],['spread',70,130,100],['pulseSpeed',0,250,100],['pulseIntensity',0,200,100]]){
  const m=next.match(new RegExp('<input[^>]*data-flow-control="'+key+'"[^>]*>'));assert.ok(m,key);
  for(const prop of ['min="'+min+'"','max="'+max+'"','value="'+value+'"'])assert.ok(m[0].includes(prop),key+prop);
 }
 assert.equal((next.match(/data-flow-control=/g)||[]).length,4);
 assert.ok(next.includes("const flowControls=Object.fromEntries"));
 assert.ok(next.includes("gl.uniform4f(U.uFlowLab,"));
});
test('True 3 to 8 families, independent spatial control and timed pulses',()=>{
 assert.match(cur.body,/flowCount=clamp\(floor\(uFlowLab.x\+\.5\),3\.,8\.\)/);
 assert.match(cur.body,/flowSpread=clamp\(uFlowLab.y,.70,1.30\)/);
 assert.match(cur.body,/flowTime=uLabTime\*clamp\(uFlowLab.z,0.,2.5\)/);
 assert.match(cur.body,/pulseIntensity=clamp\(uFlowLab.w,0.,2.\)/);
 for(const v of 'FGH'){
  for(const field of ['cross','d','l'])assert.ok(cur.body.includes((field==='d'?'float ':'')+field+v+'='),field+v);
 }
 for(const v of ['5.5','6.5','7.5'])assert.ok(cur.body.includes('step('+v+',flowCount)'));
 assert.ok(cur.body.includes('pow(5./flowCount,.28)'));
});
test('Legacy material shader and prior controls preserved, except declared UI and bindings',()=>{
 assert.ok(next.includes('float widthNeon=clamp(uFlow.y,.30,2.50)'));
 assert.ok(next.includes('data-flow-diameter-help'));
 assert.equal((next.match(/data-flow-diameter-help/g)||[]).length,(base.match(/data-flow-diameter-help/g)||[]).length);
 assert.ok(next.includes('<details class="lab-optional"'));
 assert.ok(next.includes('data-import-json')&&next.includes('data-export-json'));
 const a=base.slice(old.b),b=next.slice(cur.b);
 assert.ok(b.includes('if(uPass>3.5&&uPass<4.5){'));
 assert.ok(!cur.body.includes('float cylinderA='));
 assert.ok(!cur.body.includes('float shellA='));
});
test('Settings preserve v1 parameters and accept optional flow block atomically',()=>{
 assert.ok(next.includes("schema:'synestra.siteforge.plasma-settings.v1'"));
 assert.ok(next.includes('parameters,\n    motes,\n    energyFlow'));
 assert.ok(next.includes('const eflow=doc.energyFlow'));
 assert.ok(next.includes('const nextFlow=Object.fromEntries'));
 assert.ok(next.indexOf('const nextFlow=')<next.indexOf('return {nextPlasma,nextMotes,nextFlow'));
 assert.ok(next.includes('for(const [k,v] of Object.entries(values.nextFlow))flowControls[k].value=v'));
 assert.ok(next.includes('for(const [key,input] of Object.entries(flowControls))input.value=flowDefaults[key]'));
});
