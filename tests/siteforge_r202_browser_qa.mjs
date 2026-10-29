import assert from 'node:assert/strict';
import {writeFileSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const pages=await(await fetch('http://127.0.0.1:18851/json')).json();
const page=pages.find(x=>x.type==='page');assert.ok(page?.webSocketDebuggerUrl);
const ws=new WebSocket(page.webSocketDebuggerUrl);
await new Promise((res,rej)=>{ws.addEventListener('open',res,{once:true});ws.addEventListener('error',rej,{once:true})});
let next=0;const pending=new Map();const errors=[];
ws.addEventListener('message',e=>{
 const m=JSON.parse(e.data);
 if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails?.text||'exception');
 if(m.method==='Log.entryAdded'&&m.params.entry.level==='error')errors.push(m.params.entry.text);
 if(!m.id||!pending.has(m.id))return;
 const h=pending.get(m.id);pending.delete(m.id);m.error?h.reject(Error(JSON.stringify(m.error))):h.resolve(m.result);
});
const send=(method,params={})=>new Promise((resolve,reject)=>{
 const id=++next;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));
});
async function ev(expression){
 const v=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});
 if(v.exceptionDetails)throw Error(JSON.stringify(v.exceptionDetails));
 return v.result.value;
}
async function shot(name){const s=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});writeFileSync(join(root,name),Buffer.from(s.data,'base64'));}
await send('Page.enable');await send('Runtime.enable');await send('Log.enable');
const base='http://127.0.0.1:18852/r202/';
const out=[];
for(const width of [1440,768,390]){
 await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width===390});
 for(const path of['','connect/','bridge/','siteforge/','offres/']){
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
  await send('Page.navigate',{url:base+path});
  let ready=false;
  for(let i=0;i<45;i++){
   await sleep(150);
   if(await ev("document.readyState==='complete'")&&
       (path!==''||await ev("!!document.querySelector('.core-r109-stage[data-core-ready]')"))){ready=true;break;}
  }
  const v=await ev("(()=>{const c=document.querySelector('.core-r109-canvas');const stage=document.querySelector('.r192-scene');const h=document.querySelector('.r192-hero');return{ready:stage?.getAttribute('data-core-ready'),status:document.querySelector('[data-render-status]')?.textContent||null,canvases:document.querySelectorAll('canvas').length,sceneCanvas:c?{width:c.width,height:c.height,cssWidth:c.getBoundingClientRect().width,cssHeight:c.getBoundingClientRect().height,styleTransform:getComputedStyle(c).transform}:null,room:!!document.querySelector('.r199-architecture'),floor:!!document.querySelector('.r192-floor'),title:document.querySelector('h1')?.textContent||'',overflow:document.documentElement.scrollWidth,heroHeight:h?.getBoundingClientRect().height,heroTop:h?.getBoundingClientRect().top,logo:!!document.querySelector('header img')?.naturalWidth,scrollTop:scrollY}})()");
  if(path===''){
   assert.ok(ready,'Shader did not become ready '+width+': '+JSON.stringify(v)+' '+errors.join('|'));
   assert.equal(v.canvases,1);assert.equal(v.room,false);assert.equal(v.floor,false);
   console.log('R200_SCENE_DIAG',width,JSON.stringify(v));
   assert.ok(v.sceneCanvas.cssWidth>=width*.85,'Scene does not fill stage '+width);
   assert.ok(Math.abs(v.heroHeight-900)<4,'Hero not full screen');
  }else assert.equal(v.canvases,0);
  assert.ok(v.overflow<=width+2,'Overflow '+path+' width '+width);
  assert.ok(v.title);
  const filename='r202-'+(path?path.replace('/',''):'studio')+'-'+width+'.png';
  await shot(filename);
  out.push({path:path||'studio',width,ready,v,screenshot:filename});
  console.log('PASS_ROUTE',width,path||'studio','ready',v.ready||'n/a','status',v.status?.slice(0,90));
 }
}
await send('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});
await send('Page.navigate',{url:base});await sleep(1100);
const before=await ev("({scroll:scrollY,ready:document.querySelector('.core-r109-stage')?.dataset.coreReady})");
await ev("scrollTo({top:460,behavior:'instant'})");await sleep(370);
const after=await ev("({scroll:scrollY,ready:document.querySelector('.core-r109-stage')?.dataset.coreReady,progress:getComputedStyle(document.documentElement).getPropertyValue('--r192-progress')})");
assert.ok(after.scroll>300,'Scroll missing');
await shot('r202-scrolled-1440.png');
await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
await send('Page.navigate',{url:base});await sleep(700);
const reduced=await ev("({matches:matchMedia('(prefers-reduced-motion: reduce)').matches,buttons:document.querySelectorAll('.r194-button').length,fallback:!!document.querySelector('.core-r108-art'),hasContent:!!document.querySelector('h1')})");
assert.ok(reduced.matches&&reduced.hasContent&&reduced.fallback);
const result={schema:'synestra.siteforge.r202.browser.v1',base,checks:out.length,scroll:{before,after},reduced,errors,results:out,phase:'initial'};
writeFileSync(join(root,'evidence/SITEFORGE_R202_BROWSER_20261029.json'),JSON.stringify(result,null,2)+'\n');
console.log('R200_BROWSER_PASS',out.length,'errors',JSON.stringify(errors));
ws.close();
