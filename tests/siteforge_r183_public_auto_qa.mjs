import {spawn} from 'node:child_process';
import {existsSync,readFileSync,writeFileSync,mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {comparePngPixels,decodePNG} from './siteforge_r174_png_diff.mjs';

const chrome='C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const profile=mkdtempSync(join(tmpdir(),'synestra-siteforge-r175-'));
const root=process.cwd();
const url='https://inossarum.github.io/synestra-siteforge-r176-lab/r183.html';
const demoUrl=url+'?demo=magnetic';
const child=spawn(chrome,['--headless=new','--enable-unsafe-swiftshader','--use-angle=swiftshader','--disable-extensions','--disable-background-networking','--no-first-run','--no-default-browser-check','--remote-debugging-port=0','--user-data-dir='+profile,demoUrl],{stdio:'ignore',windowsHide:true});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
let ws,closed=false;
try{
 const portPath=join(profile,'DevToolsActivePort');
 for(let i=0;i<80&&!existsSync(portPath);i++)await sleep(150);
 if(!existsSync(portPath))throw Error('CDP_START_FAILED');
 let info;
 for(let i=0;i<15;i++){try{info=readFileSync(portPath,'utf8');break}catch(e){if(i===14)throw e;await sleep(70)}}
 const port=Number(info.trim().split(/\r?\n/)[0]);
 const pages=await(await fetch('http://127.0.0.1:'+port+'/json/list')).json();
 const page=pages.find(t=>t.type==='page'&&t.webSocketDebuggerUrl);
 if(!page)throw Error('CDP_NO_PAGE');
 ws=new WebSocket(page.webSocketDebuggerUrl);
 await new Promise((resolve,reject)=>{ws.addEventListener('open',resolve,{once:true});ws.addEventListener('error',reject,{once:true})});
 let next=0;
 const pending=new Map();
 ws.addEventListener('message',event=>{let r;try{r=JSON.parse(event.data)}catch{return}const p=pending.get(r.id);if(p){pending.delete(r.id);r.error?p.reject(Error(JSON.stringify(r.error))):p.resolve(r.result)}});
 const call=(method,params={})=>new Promise((resolve,reject)=>{const id=++next;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));setTimeout(()=>{if(pending.has(id)){pending.delete(id);reject(Error('CDP_TIMEOUT '+method))}},9000)});
 await call('Page.enable');await call('Runtime.enable');
 await call('Emulation.setDeviceMetricsOverride',{width:1100,height:800,deviceScaleFactor:1,mobile:false});
 await call('Page.navigate',{url:demoUrl});await sleep(1600);
 const current=async()=>JSON.parse((await call('Runtime.evaluate',{expression:"JSON.stringify((()=>{const s=document.querySelector('.core-r109-stage');return {ready:s.getAttribute('data-core-ready'),mode:s.dataset.qualityMode,steps:s.dataset.volumeSteps,penalty:s.dataset.qualityPenalty,ms:s.dataset.renderCadenceMs,fps:s.dataset.renderFps,material:document.getElementById('sf-flowType')?.value,spin:s.dataset.syncedSpinPhase,moteSpin:s.dataset.moteSpinPhase,gl:s.querySelector('canvas')?.getContext('webgl')?.getError()}})())",returnByValue:true})).result.value);
 await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
 await sleep(1250);
 let x=await current();
 if(x.ready!=='true'||x.gl!==0)throw Error('R183_MOBILE_GPU_NOT_READY '+JSON.stringify(x));
 await call('Runtime.evaluate',{expression:"(()=>{const e=document.querySelector('[data-render-quality]');e.value='auto';e.dispatchEvent(new Event('change',{bubbles:true}));})()"});
 const samples=[];
 for(let t=0;t<12;t++){
  await sleep(750);x=await current();samples.push(x);
  if(x.mode==='auto'&&Number(x.penalty)>=1&&Number(x.fps)>0)break;
 }
 if(x.mode!=='auto'||!Number.isFinite(Number(x.fps))||Number(x.fps)<=0||x.gl!==0||x.spin!==x.moteSpin)
  throw Error('R183_AUTO_LIVE_TELEMETRY_FAIL '+JSON.stringify({last:x,samples}));
 if(Number(x.penalty)>=1&&Number(x.steps)>12)throw Error('R183_AUTO_NOT_DOWNSAMPLED '+JSON.stringify({last:x,samples}));
 if(Number(x.penalty)===0&&Number(x.ms)>62&&samples.length>=10)
  throw Error('R183_AUTO_SLOW_NOT_REDUCED '+JSON.stringify({last:x,samples}));
 console.log('R183_AUTO_LIVE_FRAMEBUDGET_PASS '+JSON.stringify({first:samples[0],last:x,polls:samples.length}));
 await call('Runtime.evaluate',{expression:"(()=>{const e=document.querySelector('[data-render-quality]');e.value='balanced';e.dispatchEvent(new Event('change',{bubbles:true}));})()"});
 await sleep(350);
 x=await current();
 if(x.mode!=='balanced'||x.steps!=='14'||x.gl!==0)throw Error('R183_AUTO_RESTORE_FAIL '+JSON.stringify(x));
 console.log('R183_AUTO_BALANCED_RECOVERY_PASS '+JSON.stringify(x));
 await call('Browser.close');closed=true;
}catch(e){console.error('R175_CHROME_WEBGL_FAIL '+String(e));process.exitCode=1}
finally{
 try{ws?.close()}catch{}
 if(!closed&&child.exitCode===null)try{child.kill()}catch{}
 await Promise.race([new Promise(r=>child.once('exit',r)),sleep(1200)]);
 try{rmSync(profile,{recursive:true,force:true,maxRetries:5,retryDelay:100})}catch{}
}
