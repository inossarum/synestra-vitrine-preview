import {spawn} from 'node:child_process';
import {readFileSync,existsSync,writeFileSync,mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
const root=process.cwd(),profile=mkdtempSync(join(tmpdir(),'syn-r165-fallback-'));
const chrome='C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',url=pathToFileURL(join(root,'vitrine-r169-chamber-preview.html')).href;
const child=spawn(chrome,['--headless=new','--enable-unsafe-swiftshader','--use-angle=swiftshader','--disable-extensions','--disable-background-networking','--no-first-run','--remote-debugging-port=0','--user-data-dir='+profile,url],{stdio:'ignore',windowsHide:true});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));let ws;
try{
 const dev=join(profile,'DevToolsActivePort');for(let i=0;i<80&&!existsSync(dev);i++)await sleep(140);if(!existsSync(dev))throw Error('CDP_NOT_READY');
 const port=Number(readFileSync(dev,'utf8').trim().split(/\r?\n/)[0]);
 const pages=await(await fetch('http://127.0.0.1:'+port+'/json/list')).json();
 const page=pages.find(x=>x.type==='page'&&x.webSocketDebuggerUrl);if(!page)throw Error('NO_PAGE');
 ws=new WebSocket(page.webSocketDebuggerUrl);await new Promise((yes,no)=>{ws.addEventListener('open',yes,{once:true});ws.addEventListener('error',no,{once:true})});
 let next=0;const pending=new Map();ws.addEventListener('message',ev=>{const m=JSON.parse(ev.data),p=pending.get(m.id);if(p){pending.delete(m.id);m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result)}});
 const call=(method,params={})=>new Promise((resolve,reject)=>{const id=++next;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));setTimeout(()=>{if(pending.has(id)){pending.delete(id);reject(Error('CDP_TIMEOUT '+method))}},8500)});
 await call('Page.enable');await call('Runtime.enable');
 await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
 for(const mobile of [false,true]){
  await call('Emulation.setDeviceMetricsOverride',{width:mobile?390:1280,height:mobile?844:850,deviceScaleFactor:1,mobile});
  await call('Page.navigate',{url});await sleep(1250);
  const e=await call('Runtime.evaluate',{expression:"JSON.stringify((()=>{const stage=document.querySelector('.core-r109-stage'),canvas=stage.querySelector('canvas'),svg=stage.querySelector('svg.core-r108-art');svg?.scrollIntoView({block:'center'});return {ready:stage.dataset.coreReady||'false',svg:!!svg,fallback:!!svg?.querySelector('.syn-r165-currents'),backdrop:!!stage?.querySelector('.syn-r169-room'),oldSphere:!!svg?.querySelector('.core-r108-heart'),label:stage.querySelector('.core-r108-top')?.textContent||'',canvasScale:getComputedStyle(canvas).transform,canvasOpacity:getComputedStyle(canvas).opacity,svgDisplay:getComputedStyle(svg).display,controls:document.querySelectorAll('[data-sphere-control]').length,viewport:innerWidth,bodyWidth:document.body.scrollWidth}})())",returnByValue:true});
  const v=JSON.parse(e.result.value);
  if(v.ready!=='false'||!v.svg||!v.fallback||!v.backdrop||v.oldSphere||!v.label.includes('PROTOTYPE / 01')||v.controls!==18||v.bodyWidth>v.viewport+2)throw Error('FALLBACK_E2E_FAIL '+JSON.stringify(v));
  await sleep(120);
  if(mobile){await call('Runtime.evaluate',{expression:"document.querySelector('.core-r109-stage').scrollIntoView({block:'center'})"});await sleep(180);}
  const shot=await call('Page.captureScreenshot',{format:'png'});
  writeFileSync(join(root,mobile?'r169-chamber-reduced-mobile.png':'r169-chamber-reduced-desktop.png'),Buffer.from(shot.data,'base64'));
  console.log('R169_CHAMBER_REDUCED_'+(mobile?'MOBILE':'DESKTOP')+'_PASS '+JSON.stringify(v));
 }
 await call('Browser.close');
}catch(e){console.error('R169_CHAMBER_REDUCED_FAIL '+String(e));process.exitCode=1}
finally{try{ws?.close()}catch{}try{child.kill()}catch{}await sleep(300);try{rmSync(profile,{recursive:true,force:true,maxRetries:4,retryDelay:100})}catch{}}
