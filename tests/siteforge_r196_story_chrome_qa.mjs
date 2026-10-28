import{writeFileSync}from'node:fs';import{join,dirname}from'node:path';import{fileURLToPath}from'node:url';
import assert from'node:assert/strict';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const sleep=t=>new Promise(r=>setTimeout(r,t));
const pages=await(await fetch('http://127.0.0.1:18851/json')).json();
const page=pages.find(p=>p.type==='page');
assert.ok(page?.webSocketDebuggerUrl,'CDP browser unavailable');
const ws=new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve,reject)=>{ws.addEventListener('open',resolve,{once:true});ws.addEventListener('error',reject,{once:true})});
let i=0;const q=new Map();
ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(!m.id)return;const c=q.get(m.id);if(!c)return;q.delete(m.id);m.error?c.reject(Error(JSON.stringify(m.error))):c.resolve(m.result)});
const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++i;q.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}))});
const evaluate=async expression=>{
 const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});
 if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));
 return r.result.value;
};
async function screenshot(name){
 const r=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
 writeFileSync(join(root,name),Buffer.from(r.data,'base64'));
}
await send('Page.enable');await send('Runtime.enable');
const base='http://127.0.0.1:18850/r196/';
const records=[];
for(const width of[1440,390]){
 await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width===390});
 await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
 await send('Page.navigate',{url:base});
 await sleep(900);
 const info=await evaluate("(()=>({chapters:[...document.querySelectorAll('.r194-chapter')].map(e=>e.id),h1:document.querySelectorAll('h1').length,canvas:document.querySelectorAll('canvas').length,links:[...document.querySelectorAll('.r194-product-copy a')].map(a=>a.getAttribute('href')),jsReady:document.documentElement.classList.contains('r194-enabled'),railLinks:document.querySelectorAll('.r194-rail a').length}))()");
 assert.deepEqual(info.chapters,['vision','systeme','siteforge','approche','exemples','confiance','questions','acces-pilote']);
 assert.equal(info.h1,1);assert.equal(info.canvas,1);assert.equal(info.links.length,3);
 assert.equal(info.jsReady,true);assert.equal(info.railLinks,8);
 for(const id of ['vision','systeme','siteforge','approche','confiance']){
  const pos=await evaluate("(()=>{const r=document.getElementById('"+id+"').getBoundingClientRect();scrollTo({top:Math.round(scrollY+r.top+135),behavior:'instant'});return r.top})()");
  await sleep(700);
  const state=await evaluate("(()=>{const el=document.getElementById('"+id+"');return {y:scrollY,visible:el.classList.contains('r194-visible'),railActive:document.querySelector('.r194-rail a[aria-current=location]')?.getAttribute('href')||null,chapter:el.id,docWidth:document.documentElement.scrollWidth}})()");
  assert.ok(state.y>0,'Scroll did not move: '+id);
  assert.ok(state.visible,'Chapter failed to reveal: '+id);
  assert.ok(state.docWidth<=width+2,'Overflow: '+id);
  const file='r196-story-'+id+'-'+width+'.png';
  await screenshot(file);
  records.push({width,...state,originalTop:pos,screenshot:file});
  console.log('PASS STORY',width,id,'Y',state.y,'RAIL',state.railActive);
 }
 if(width===1440){
  await evaluate("document.querySelector('[data-r194-step=\"3\"]').scrollIntoView({block:'center',behavior:'instant'})");
  await sleep(520);
  const step=await evaluate("({counter:document.querySelector('.r194-method-counter b')?.textContent,progress:getComputedStyle(document.querySelector('.r194-track-fill')).width,current:[...document.querySelectorAll('[data-r194-step].is-current')].map(x=>x.dataset.r194Step)})");
  assert.ok(step.current.includes('3'),'Method step 3 does not activate');
  assert.equal(step.counter,'03');
  records.push({methodStep:step});console.log('PASS METHOD',JSON.stringify(step));
 }
}
await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
await send('Page.navigate',{url:base});
await sleep(500);
const reduced=await evaluate("({prefers:matchMedia('(prefers-reduced-motion: reduce)').matches,enhanced:document.documentElement.classList.contains('r194-enabled'),h1:document.querySelector('h1')?.textContent,hidden:!!document.querySelector('.r194-chapter[data-r194-view]:not(.r194-visible)')})");
assert.equal(reduced.prefers,true);assert.equal(reduced.enhanced,false);assert.equal(reduced.hidden,false);assert.ok(reduced.h1);
writeFileSync(join(root,'evidence/SITEFORGE_R196_STORY_CHROME_20261028.json'),JSON.stringify({schema:'synestra.siteforge.r196.story.chrome.v1',records,reduced,status:'PASS',base},null,2)+'\n');
console.log('R194_STORY_PASS',records.length,'REDUCED',JSON.stringify(reduced));
ws.close();