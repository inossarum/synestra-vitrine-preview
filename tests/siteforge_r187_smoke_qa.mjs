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
 ws.addEventListener('message',event=>{let r;try{r=JSON.parse(event.data)}catch{return}if(r.method==="Runtime.exceptionThrown")console.log("R187_RUNTIME_EXCEPTION "+JSON.stringify(r.params.exceptionDetails).slice(0,3300));const p=pending.get(r.id);if(p){pending.delete(r.id);r.error?p.reject(Error(JSON.stringify(r.error))):p.resolve(r.result)}});
 const call=(method,params={})=>new Promise((resolve,reject)=>{const id=++next;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));setTimeout(()=>{if(pending.has(id)){pending.delete(id);reject(Error('CDP_TIMEOUT '+method))}},9000)});
 await call('Page.enable');await call('Runtime.enable');
 await call('Emulation.setDeviceMetricsOverride',{width:1100,height:800,deviceScaleFactor:1,mobile:false});
 await call('Page.navigate',{url:demoUrl});await sleep(5200);
 const evaluated=await call('Runtime.evaluate',{expression:`JSON.stringify((()=>{const stage=document.querySelector('.core-r109-stage');const canvas=document.querySelector('canvas');const gl=canvas?.getContext('webgl');const get=id=>document.getElementById(id);return {ready:stage?.getAttribute('data-core-ready'),status:document.querySelector('[data-render-status]')?.textContent,vfx:document.querySelector('[data-vfx-status]')?.textContent,webgl:!!gl,glError:gl?.getError(),flowCount:get('sf-flowType')?.options?.length,controls:document.querySelectorAll('[data-sphere-control]').length,shell:get('sf-shellVisibility')?.value,shellHidden:get('sf-shellVisibility')?.type,particleDensityHidden:get('sf-particleDensity')?.type,particleSizeHidden:get('sf-particleSize')?.type,canvasW:canvas?.width,canvasH:canvas?.height}})())`,returnByValue:true});
 const m=JSON.parse(evaluated.result.value);
 if(m.ready!=='true'||!m.webgl||m.glError!==0||m.flowCount!==7||m.controls!==18||m.shell!=='0'||m.shellHidden!=='hidden'||m.particleDensityHidden!=='hidden'||m.particleSizeHidden!=='hidden')throw Error('R175_REAL_BROWSER_FAIL '+JSON.stringify(m));
 // R186: add a seventh effect without changing one old default.
 const coreState=await call('Runtime.evaluate',{expression:"JSON.stringify((()=>{const f=document.getElementById('sf-flowType'),s=document.querySelector('.core-r109-stage');return {flow:f.value,options:[...f.options].map(x=>[x.value,x.label]),color:document.getElementById('sf-secondary').value,cyan:document.getElementById('sf-rim').value,motes:document.getElementById('sf-moteCount').value,ready:s.dataset.coreReady}})())",returnByValue:true});
 const before186=JSON.parse(coreState.result.value);
 if(before186.flow!=='1'||before186.options.length!==7||before186.options.slice(0,6).map(x=>x[0]).join(',')!=='0,1,2,3,4,5')
  throw Error('R186_ORIGINAL_DEFAULTS_CHANGED '+JSON.stringify(before186));
 const switchMaterial=async material=>{
  await call('Runtime.evaluate',{expression:"(()=>{const f=document.getElementById('sf-flowType');f.value="+JSON.stringify(String(material))+";f.dispatchEvent(new Event('change',{bubbles:true}));const speed=document.getElementById('sf-particleSpeed');speed.value='0';speed.dispatchEvent(new Event('input',{bubbles:true}));})()"});
  await sleep(600);
  const obj=JSON.parse((await call('Runtime.evaluate',{expression:"JSON.stringify((()=>{const s=document.querySelector('.core-r109-stage');return {flow:document.getElementById('sf-flowType').value,spin:s.dataset.syncedSpinPhase,moteSpin:s.dataset.moteSpinPhase,glError:s.querySelector('canvas').getContext('webgl').getError(),ready:s.dataset.coreReady}})())",returnByValue:true})).result.value);
  if(obj.flow!==String(material)||obj.glError!==0||obj.ready!=='true')throw Error('R186_REAL_MATERIAL_FAIL '+JSON.stringify(obj));
  return obj;
 };
 const artClipR186=JSON.parse((await call('Runtime.evaluate',{expression:"JSON.stringify((()=>{const r=document.querySelector('.core-r109-stage').getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,scale:1}})())",returnByValue:true})).result.value);
 console.log('R187_PROGRAM_DIAG '+JSON.stringify((await call('Runtime.evaluate',{expression:"JSON.stringify((()=>{let s=document.querySelector('.core-r109-stage');return {ready:s.dataset.coreReady,program:s.dataset.ribbonProgram,buffer:s.dataset.ribbonBuffer,count:s.dataset.ribbonVertices,linkError:s.dataset.ribbonLinkError,compileError:s.dataset.ribbonCompileError,error:s.dataset.ribbonDrawError,status:document.querySelector('[data-render-status]')?.textContent}})())",returnByValue:true})).result.value));
 await switchMaterial(0);
 const oldShot=await call('Page.captureScreenshot',{format:'png',clip:artClipR186,captureBeyondViewport:false});
 await switchMaterial(6);
 const neonShot=await call('Page.captureScreenshot',{format:'png',clip:artClipR186,captureBeyondViewport:false});
 writeFileSync(join(root,'r187-real-neon-material.png'),Buffer.from(neonShot.data,'base64'));
 const neonDelta=comparePngPixels(Buffer.from(oldShot.data,'base64'),Buffer.from(neonShot.data,'base64'));
 if(neonDelta.changed<130)throw Error('R186_ADDED_MATERIAL_INVISIBLE '+JSON.stringify(neonDelta));
 console.log('R187_PROGRAM_DIAG '+JSON.stringify((await call('Runtime.evaluate',{expression:"JSON.stringify((()=>{let s=document.querySelector('.core-r109-stage');return {ready:s.dataset.coreReady,program:s.dataset.ribbonProgram,buffer:s.dataset.ribbonBuffer,count:s.dataset.ribbonVertices,linkError:s.dataset.ribbonLinkError,compileError:s.dataset.ribbonCompileError,error:s.dataset.ribbonDrawError,status:document.querySelector('[data-render-status]')?.textContent}})())",returnByValue:true})).result.value));
 await switchMaterial(0);
 console.log('R186_SEVENTH_MATERIAL_REAL_WEBGL_PASS '+JSON.stringify({before186,neonDelta}));
 console.log('R186_RENDER_SMOKE_PASS');
 await call('Browser.close');closed=true;
}catch(e){console.error('R175_CHROME_WEBGL_FAIL '+String(e));process.exitCode=1}
finally{
 try{ws?.close()}catch{}
 if(!closed&&child.exitCode===null)try{child.kill()}catch{}
 await Promise.race([new Promise(r=>child.once('exit',r)),sleep(1200)]);
 try{rmSync(profile,{recursive:true,force:true,maxRetries:5,retryDelay:100})}catch{}
}
