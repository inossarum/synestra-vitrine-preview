import {spawn} from 'node:child_process';
import {existsSync,readFileSync,writeFileSync,mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {comparePngPixels,decodePNG} from './siteforge_r174_png_diff.mjs';

const chrome='C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const profile=mkdtempSync(join(tmpdir(),'synestra-siteforge-r175-'));
const root=process.cwd();
const url=pathToFileURL(join(root,'siteforge-r187-autonome.html')).href;
const demoUrl=url+'?demo=neon187';
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
 ws.addEventListener('message',event=>{let r;try{r=JSON.parse(event.data)}catch{return}if(r.method==="Runtime.exceptionThrown")console.log("R187_RUNTIME_EXCEPTION "+JSON.stringify(r.params.exceptionDetails).slice(0,3300));const p=pending.get(r.id);if(p){pending.delete(r.id);r.error?p.reject(Error(JSON.stringify(r.error))):p.resolve(r.result)}});
 const call=(method,params={})=>new Promise((resolve,reject)=>{const id=++next;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));setTimeout(()=>{if(pending.has(id)){pending.delete(id);reject(Error('CDP_TIMEOUT '+method))}},9000)});
 await call('Page.enable');await call('Runtime.enable');
 await call('Emulation.setDeviceMetricsOverride',{width:1100,height:800,deviceScaleFactor:1,mobile:false});
 await call('Page.navigate',{url:demoUrl});await sleep(5200);
 const state=async()=>JSON.parse((await call('Runtime.evaluate',{expression:"JSON.stringify((()=>{const s=document.querySelector('.core-r109-stage');const gl=s.querySelector('canvas').getContext('webgl');return {flow:document.getElementById('sf-flowType').value,ready:s.dataset.coreReady,ribbonCount:s.dataset.ribbonVertices,drawError:s.dataset.ribbonDrawError,glError:gl.getError(),spin:s.dataset.syncedSpinPhase,moteSpin:s.dataset.moteSpinPhase,controls:document.querySelectorAll('[data-sphere-control]').length,motes:document.querySelectorAll('[data-mote-control]').length,visibility:s.dataset.motesEnabled}})())",returnByValue:true})).result.value);
 await sleep(800);
 let st=await state();
 if(st.flow!=='6'||st.ready!=='true'||Number(st.ribbonCount)<50000||st.drawError!=='0'||st.glError!==0||st.spin!==st.moteSpin||st.controls!==18||st.motes!==10)
  throw Error('R187_DIRECT_LINK_REAL_WEBGL_FAIL '+JSON.stringify(st));
 const rect=JSON.parse((await call('Runtime.evaluate',{expression:"JSON.stringify((()=>{const r=document.querySelector('.core-r109-stage').getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,scale:1}})())",returnByValue:true})).result.value);
 const shot=await call('Page.captureScreenshot',{format:'png',clip:rect,captureBeyondViewport:false});
 writeFileSync(join(root,'r187-demo-desktop.png'),Buffer.from(shot.data,'base64'));
 console.log('R187_DESKTOP_GEOMETRY_PASS '+JSON.stringify(st));
 await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
 await sleep(1100);
 st=await state();
 if(st.flow!=='6'||st.ready!=='true'||st.glError!==0||st.drawError!=='0')
  throw Error('R187_MOBILE_GEOMETRY_FAIL '+JSON.stringify(st));
 const shotM=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
 writeFileSync(join(root,'r187-demo-mobile.png'),Buffer.from(shotM.data,'base64'));
 console.log('R187_MOBILE_GEOMETRY_PASS '+JSON.stringify(st));
 await call('Browser.close');closed=true;
}catch(e){console.error('R175_CHROME_WEBGL_FAIL '+String(e));process.exitCode=1}
finally{
 try{ws?.close()}catch{}
 if(!closed&&child.exitCode===null)try{child.kill()}catch{}
 await Promise.race([new Promise(r=>child.once('exit',r)),sleep(1200)]);
 try{rmSync(profile,{recursive:true,force:true,maxRetries:5,retryDelay:100})}catch{}
}
