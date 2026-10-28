import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const base='http://127.0.0.1:18850/r191/';
const routes=['','connect/','bridge/','siteforge/','offres/'];
const pages=await (await fetch('http://127.0.0.1:18851/json')).json();
const page=pages.find(p=>p.type==='page');
assert.ok(page?.webSocketDebuggerUrl,'Chrome CDP 18851 missing');
const ws=new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve,reject)=>{ws.addEventListener('open',resolve,{once:true});ws.addEventListener('error',reject,{once:true});});
let id=0;const pending=new Map();
ws.addEventListener('message',event=>{
 const m=JSON.parse(event.data);if(!m.id)return;
 const cb=pending.get(m.id);if(!cb)return;
 pending.delete(m.id);if(m.error)cb.reject(Error(JSON.stringify(m.error)));else cb.resolve(m.result);
});
const send=(method,params={})=>new Promise((resolve,reject)=>{
 const n=++id;pending.set(n,{resolve,reject});ws.send(JSON.stringify({id:n,method,params}));
});
const evalJs=async expression=>{
 const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});
 if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));
 return r.result.value;
};
const expression="(()=>{"+
"const w=window.innerWidth,doc=document.documentElement;"+
"const a=[...document.querySelectorAll('a[href]')];"+
"const field=document.querySelector('.syn-ambient-field');"+
"const image=document.querySelector('header img');"+
"const css=[...document.styleSheets].map(s=>s.href).filter(Boolean);"+
"const scripts=[...document.scripts].map(s=>s.src);"+
"const title=document.querySelector('h1')?.innerText||'';"+
"return {url:location.pathname,viewport:w,docWidth:doc.scrollWidth,bodyWidth:document.body.scrollWidth,"+
"background:field?{childCount:field.children.length,hidden:field.getAttribute('aria-hidden'),pointerEvents:getComputedStyle(field).pointerEvents}:null,"+
"css,scripts,title,canvasCount:document.querySelectorAll('canvas').length,logo:image?{loaded:image.complete&&image.naturalWidth>0,src:image.currentSrc}:null,"+
"navigation:a.filter(x=>x.closest('.site-nav')).map(x=>x.textContent.trim()),links:a.length,"+
"firstSection:document.querySelector('section')?.getBoundingClientRect().width||0};"+
"})()";
const results=[];
await send('Page.enable');await send('Runtime.enable');
for(const width of [1440,390]){
 await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width===390});
 for(const path of routes){
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
  await send('Page.navigate',{url:base+path});
  let ok=false;
  for(let n=0;n<35;n++){
   await sleep(130);
   const state=await evalJs('document.readyState');
   if(state==='complete'){ok=true;break;}
  }
  assert.ok(ok,'Load timeout: '+path);
  await sleep(300);
  const e=await evalJs(expression);
  assert.ok(e.title,'Missing page title '+path);
  assert.ok(e.background&&e.background.childCount>20&&e.background.hidden==='true','Ambient not running '+path);
  assert.equal(e.background.pointerEvents,'none','Ambient intercepts input');
  assert.ok(e.logo?.loaded,'Official logo failed '+path);
  assert.ok(e.css.some(x=>x.includes('r191-system.css')),'Shared CSS missing '+path);
  assert.ok(e.scripts.some(x=>x.includes('r191-ambient.js')),'Shared animation JS missing '+path);
  assert.ok(e.navigation.some(x=>x.includes('Bridge')),'Missing primary navigation '+path);
  assert.ok(e.docWidth <= width+2&&e.bodyWidth<=width+2,'Horizontal overflow '+path+' '+width+' '+e.docWidth+'/'+e.bodyWidth);
  if(path==='')assert.equal(e.canvasCount,1,'Home must retain ONE WebGL canvas');
  else assert.equal(e.canvasCount,0,'Product page added canvas');
  const filename='r191-'+(path||'studio').replace('/','')+'-'+width+'.png';
  const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
  writeFileSync(join(root,filename),Buffer.from(shot.data,'base64'));
  results.push({path:path||'studio',width,...e,screenshot:filename,pass:true});
  console.log('PASS',width,path||'studio','width',e.docWidth,'ambient',e.background.childCount);
 }
}
await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
await send('Page.navigate',{url:base+'connect/'});
await sleep(650);
const reduced=await evalJs("({ambient:!!document.querySelector('.syn-ambient-field'),prefers:matchMedia('(prefers-reduced-motion: reduce)').matches})");
assert.equal(reduced.prefers,true);
assert.equal(reduced.ambient,false,'Reduced-motion must not inject animations');
writeFileSync(join(root,'evidence','SITEFORGE_R191_BROWSER_20261028.json'),JSON.stringify({
 schema:'synestra.siteforge.r191.browser.qa.v1',results,reduced,passed:results.length,failed:0,source:'Chrome CDP 18851/local HTTP 18850',status:'PASS'
},null,2)+'\n');
console.log(JSON.stringify({total:results.length,reduced,status:'PASS'},null,2));
ws.close();
