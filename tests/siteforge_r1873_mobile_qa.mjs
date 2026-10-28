import {spawn} from 'node:child_process';
import {existsSync,readFileSync,writeFileSync,mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,dirname} from 'node:path';
import {pathToFileURL,fileURLToPath} from 'node:url';
import {comparePngPixels,decodePNG} from './siteforge_r174_png_diff.mjs';

const chrome='C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const profile=mkdtempSync(join(tmpdir(),'synestra-siteforge-r175-'));
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const url=process.env.SYNESTRA_R188_URL||'http://127.0.0.1:19093/siteforge-r1873-autonome.html';
const demoUrl=url+'?demo=magnetic';
const child=spawn(chrome,['--headless=new','--enable-unsafe-swiftshader','--use-angle=swiftshader','--disable-extensions','--disable-background-networking','--no-first-run','--no-default-browser-check','--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{stdio:'ignore',windowsHide:true});
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
 ws.addEventListener('message',event=>{try{const m=JSON.parse(event.data);if(['Runtime.exceptionThrown','Log.entryAdded','Runtime.consoleAPICalled'].includes(m.method))console.log('CDP_EVT',JSON.stringify(m.params).slice(0,1500))}catch{}});
 await call('Page.enable');await call('Runtime.enable');await call('Log.enable');
 await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
 await call('Page.navigate',{url:demoUrl});await sleep(12000);
 const evaluated=await call('Runtime.evaluate',{expression:`JSON.stringify((()=>{const stage=document.querySelector('.core-r109-stage');const canvas=document.querySelector('canvas');const gl=canvas?.getContext('webgl');const get=id=>document.getElementById(id);return {ready:stage?.getAttribute('data-core-ready'),status:document.querySelector('[data-render-status]')?.textContent,vfx:document.querySelector('[data-vfx-status]')?.textContent,webgl:!!gl,glError:gl?.getError(),flowCount:get('sf-flowType')?.options?.length,controls:document.querySelectorAll('[data-sphere-control]').length,shell:get('sf-shellVisibility')?.value,shellHidden:get('sf-shellVisibility')?.type,particleDensityHidden:get('sf-particleDensity')?.type,particleSizeHidden:get('sf-particleSize')?.type,canvasW:canvas?.width,canvasH:canvas?.height}})())`,returnByValue:true});
 const m=JSON.parse(evaluated.result.value);
 const trace=await call('Runtime.evaluate',{expression:"JSON.stringify({ready:document.readyState,href:location.href,scripts:document.scripts.length,inlineLen:document.scripts[0]?.textContent.length,canvas:document.querySelector('canvas')?.outerHTML.slice(0,180),status:document.querySelector('[data-render-status]')?.textContent,flow:document.getElementById('sf-flowType')?.value})",returnByValue:true});console.log('DIAGNOSTIC',trace.result.value);
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
 for(let legacy=0;legacy<6;legacy++)await switchMaterial(legacy);
 await switchMaterial(0);
 const oldShot=await call('Page.captureScreenshot',{format:'png',clip:artClipR186,captureBeyondViewport:true});
 await switchMaterial(6);
 const neonShot=await call('Page.captureScreenshot',{format:'png',clip:artClipR186,captureBeyondViewport:true});
 writeFileSync(join(root,'evidence/r1873-mobile-first.png'),Buffer.from(neonShot.data,'base64'));
 const spinBefore=JSON.parse((await call('Runtime.evaluate',{expression:"JSON.stringify({spin:document.querySelector('.core-r109-stage').dataset.syncedSpinPhase,speed:document.getElementById('sf-particleSpeed').value,webgl:document.querySelector('canvas').getContext('webgl').getError()})",returnByValue:true})).result.value);
 await sleep(2100);
 const movedShot=await call('Page.captureScreenshot',{format:'png',clip:artClipR186,captureBeyondViewport:true});
 writeFileSync(join(root,'evidence/r1873-mobile-later.png'),Buffer.from(movedShot.data,'base64'));
 const spinAfter=JSON.parse((await call('Runtime.evaluate',{expression:"JSON.stringify({spin:document.querySelector('.core-r109-stage').dataset.syncedSpinPhase,speed:document.getElementById('sf-particleSpeed').value,webgl:document.querySelector('canvas').getContext('webgl').getError()})",returnByValue:true})).result.value);
 const movementDelta=comparePngPixels(Buffer.from(neonShot.data,'base64'),Buffer.from(movedShot.data,'base64'));
 console.log('R1873_INDEPENDENT_ENERGY_MOTION '+JSON.stringify({spinBefore,spinAfter,movementDelta}));
 if(spinBefore.spin!==spinAfter.spin||spinBefore.speed!=='0'||spinAfter.speed!=='0'||spinAfter.webgl!==0||movementDelta.changed<900)
  throw Error('R188_MOTION_CLOCK_OR_FRAME_DIFFERENCE_FAILED '+JSON.stringify({spinBefore,spinAfter,movementDelta}));
 const neonDelta=comparePngPixels(Buffer.from(oldShot.data,'base64'),Buffer.from(neonShot.data,'base64'));
 if(neonDelta.changed<130)throw Error('R186_ADDED_MATERIAL_INVISIBLE '+JSON.stringify(neonDelta));
 await switchMaterial(0);
 console.log('R1873_CYLINDER_WEBGL_PASS '+JSON.stringify({before186,neonDelta}));
 console.log('R1873_CYLINDER_MOTION_PASS');
 await call('Browser.close');closed=true;
}catch(e){console.error('R175_CHROME_WEBGL_FAIL '+String(e));process.exitCode=1}
finally{
 try{ws?.close()}catch{}
 if(!closed&&child.exitCode===null)try{child.kill()}catch{}
 await Promise.race([new Promise(r=>child.once('exit',r)),sleep(1200)]);
 try{rmSync(profile,{recursive:true,force:true,maxRetries:5,retryDelay:100})}catch{}
}
