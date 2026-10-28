import assert from'node:assert/strict';import{writeFileSync}from'node:fs';
import{join,dirname}from'node:path';import{fileURLToPath}from'node:url';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const sleep=t=>new Promise(r=>setTimeout(r,t));
const tabs=await(await fetch('http://127.0.0.1:18851/json')).json(),tab=tabs.find(t=>t.type==='page');
assert.ok(tab?.webSocketDebuggerUrl,'Chrome missing');
const ws=new WebSocket(tab.webSocketDebuggerUrl);
await new Promise((res,rej)=>{ws.addEventListener('open',res,{once:true});ws.addEventListener('error',rej,{once:true})});
let n=0;const handlers=new Map();
ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(!m.id||!handlers.has(m.id))return;const h=handlers.get(m.id);handlers.delete(m.id);m.error?h.reject(Error(JSON.stringify(m.error))):h.resolve(m.result)});
const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++n;handlers.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}))});
const val=async expression=>{const v=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(v.exceptionDetails)throw Error(JSON.stringify(v.exceptionDetails));return v.result.value;};
await send('Page.enable');await send('Runtime.enable');
const base='http://127.0.0.1:18852/r200/';
const results=[];
for(const width of[1440,390]){
 await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width===390});
 await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
 await send('Page.navigate',{url:base});
 let ready=false;
 for(let k=0;k<85;k++){
  await sleep(110);
  ready=await val("(()=>{const x=document.querySelector('.core-r109-stage');return x?.dataset.coreReady==='true'&&!!x.dataset.coreFps})()");
  if(ready)break;
 }
 assert.ok(ready,'No real draw telemetry '+width);
 const before=await val("(()=>{const x=document.querySelector('.core-r109-stage'),c=x.querySelector('canvas');return{fps:Number(x.dataset.coreFps),quality:Number(x.dataset.coreQuality),scroll:Number(x.dataset.sceneScroll),buffer:[c.width,c.height],css:[Math.round(c.clientWidth),Math.round(c.clientHeight)],ready:x.dataset.coreReady}})()");
 assert.ok(Number.isFinite(before.fps)&&before.fps>0);
 assert.ok(before.quality>=.65&&before.quality<=1);
 assert.equal(before.scroll,0);
 await val("scrollTo({top:430,behavior:'instant'})");
 await sleep(2200);
 const after=await val("(()=>{const x=document.querySelector('.core-r109-stage');return{fps:Number(x.dataset.coreFps),quality:Number(x.dataset.coreQuality),scroll:Number(x.dataset.sceneScroll),y:scrollY}})()");
 assert.ok(after.y>300&&after.scroll>.35,'GPU perspective not coupled to scroll '+JSON.stringify(after));
 assert.ok(after.quality>=.65&&after.quality<=1);
 results.push({width,before,after});
 console.log('PASS_3D_PERF',width,JSON.stringify({before,after}));
}
await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
await send('Page.navigate',{url:base});await sleep(650);
const reduced=await val("({prefersReducedMotion:matchMedia('(prefers-reduced-motion: reduce)').matches,canvas:document.querySelectorAll('canvas').length,fallback:!!document.querySelector('.core-r108-art'),heading:document.querySelector('h1')?.innerText})");
assert.ok(reduced.prefersReducedMotion&&reduced.fallback&&reduced.heading);
writeFileSync(join(root,'evidence/SITEFORGE_R200_PERF_CHROME_20261029.json'),JSON.stringify({schema:'synestra.siteforge.r200.performance.chrome.v1',status:'PASS_HEADLESS',note:'Chrome headless cadence is indicative, not a target Windows hardware FPS benchmark',results,reduced},null,2)+'\n');
console.log('R200_PERF_PASS',results.length);ws.close();