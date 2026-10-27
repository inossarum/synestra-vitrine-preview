import {spawn} from 'node:child_process';
import {existsSync,readFileSync,writeFileSync,mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';

const chrome='C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const profile=mkdtempSync(join(tmpdir(),'synestra-siteforge-r163-'));
const root=process.cwd();
const url=pathToFileURL(join(root,'siteforge','core-3d-lab','index.html')).href;
const child=spawn(chrome,['--headless=new','--enable-unsafe-swiftshader','--use-angle=swiftshader','--disable-extensions','--disable-background-networking','--no-first-run','--no-default-browser-check','--remote-debugging-port=0','--user-data-dir='+profile,url],{stdio:'ignore',windowsHide:true});
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
 await call('Page.navigate',{url});await sleep(1600);
 const evaluated=await call('Runtime.evaluate',{expression:`JSON.stringify((()=>{const stage=document.querySelector('.core-r109-stage');const canvas=document.querySelector('canvas');const gl=canvas?.getContext('webgl');const get=id=>document.getElementById(id);return {ready:stage?.getAttribute('data-core-ready'),status:document.querySelector('[data-render-status]')?.textContent,vfx:document.querySelector('[data-vfx-status]')?.textContent,webgl:!!gl,glError:gl?.getError(),flowCount:get('sf-flowType')?.options?.length,controls:document.querySelectorAll('[data-sphere-control]').length,shell:get('sf-shellVisibility')?.value,shellHidden:get('sf-shellVisibility')?.type,particleDensityHidden:get('sf-particleDensity')?.type,particleSizeHidden:get('sf-particleSize')?.type,canvasW:canvas?.width,canvasH:canvas?.height}})())`,returnByValue:true});
 const m=JSON.parse(evaluated.result.value);
 if(m.ready!=='true'||!m.webgl||m.glError!==0||m.flowCount!==5||m.controls!==18||m.shell!=='0'||m.shellHidden!=='hidden'||m.particleDensityHidden!=='hidden'||m.particleSizeHidden!=='hidden')throw Error('R163_REAL_BROWSER_FAIL '+JSON.stringify(m));
 const image=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
 const screenshot=join(root,'r163-browser-desktop.png');
 writeFileSync(screenshot,Buffer.from(image.data,'base64'));
 console.log('R163_CHROME_WEBGL_PASS '+JSON.stringify({...m,screenshot}));
 // Evaluate every material through actual WebGL, retaining one program and canvas.
 const tested=[];
 for(let material=0;material<5;material++){
  const e=await call('Runtime.evaluate',{expression:`JSON.stringify((()=>{const el=document.getElementById('sf-flowType');el.value='${material}';el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));return {material:Number(el.value),canvasCount:document.querySelectorAll('canvas').length}})())`,returnByValue:true});
  await sleep(300);
  const c=await call('Runtime.evaluate',{expression:"JSON.stringify({gpu:document.querySelector('canvas').getContext('webgl').getError(),ready:document.querySelector('.core-r109-stage').dataset.coreReady})",returnByValue:true});
  const m2={...JSON.parse(e.result.value),...JSON.parse(c.result.value)};
  if(m2.material!==material||m2.canvasCount!==1||m2.gpu!==0||m2.ready!=='true')throw Error('MATERIAL_E2E_FAIL '+JSON.stringify(m2));
  tested.push(m2);
 }
 await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
 await call('Page.reload',{ignoreCache:true});await sleep(1300);
 const mm=await call('Runtime.evaluate',{expression:"JSON.stringify((()=>{const c=document.querySelector('canvas');return {width:innerWidth,ready:document.querySelector('.core-r109-stage')?.dataset.coreReady,webgl:!!c.getContext('webgl'),error:c.getContext('webgl').getError(),actualWidth:c.width,actualHeight:c.height,bodyWidth:document.body.scrollWidth}})())",returnByValue:true});
 const mobile=JSON.parse(mm.result.value);
 if(mobile.width!==390||mobile.ready!=='true'||mobile.error!==0||!mobile.webgl||mobile.bodyWidth>392)throw Error('MOBILE_E2E_FAIL '+JSON.stringify(mobile));
 const shot=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
 writeFileSync(join(root,'r163-browser-mobile.png'),Buffer.from(shot.data,'base64'));
 console.log('R163_ALL_MATERIALS_DESKTOP_MOBILE_PASS '+JSON.stringify({tested,mobile}));
 await call('Browser.close');closed=true;
}catch(e){console.error('R163_CHROME_WEBGL_FAIL '+String(e));process.exitCode=1}
finally{
 try{ws?.close()}catch{}
 if(!closed&&child.exitCode===null)try{child.kill()}catch{}
 await Promise.race([new Promise(r=>child.once('exit',r)),sleep(1200)]);
 try{rmSync(profile,{recursive:true,force:true,maxRetries:5,retryDelay:100})}catch{}
}
