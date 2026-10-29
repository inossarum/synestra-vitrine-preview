import {spawn, execFileSync} from 'node:child_process';
import {existsSync,readFileSync,writeFileSync,mkdtempSync,mkdirSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {comparePngPixels} from './siteforge_r174_png_diff.mjs';

const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const evidence=join(root,'evidence');mkdirSync(evidence,{recursive:true});
const profile=mkdtempSync(join(tmpdir(),'syn-gpu-1881-'));
const chrome='C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chromeArgs=['--headless=new','--use-angle=d3d11','--enable-webgl','--disable-extensions','--disable-background-networking','--no-first-run','--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'];
const browser=spawn(chrome,chromeArgs,{stdio:'ignore',windowsHide:true});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
let ws,closed=false;
const errors=[];
try{
 const pf=join(profile,'DevToolsActivePort');
 for(let j=0;j<120&&!existsSync(pf);j++)await sleep(150);
 if(!existsSync(pf))throw Error('CHROME_CDP_UNAVAILABLE');
 const port=Number(readFileSync(pf,'utf8').split(/\r?\n/)[0]);
 const pages=await (await fetch('http://127.0.0.1:'+port+'/json/list')).json();
 const page=pages.find(x=>x.type==='page'&&x.webSocketDebuggerUrl);
 if(!page)throw Error('PAGE_MISSING');
 ws=new WebSocket(page.webSocketDebuggerUrl);
 await new Promise((resolve,reject)=>{ws.addEventListener('open',resolve,{once:true});ws.addEventListener('error',reject,{once:true})});
 let id=0;const pending=new Map();
 ws.addEventListener('message',event=>{
  let message;try{message=JSON.parse(event.data)}catch{return}
  const p=pending.get(message.id);
  if(p){pending.delete(message.id);message.error?p.reject(Error(JSON.stringify(message.error))):p.resolve(message.result)}
  if(message.method==='Runtime.exceptionThrown')errors.push(JSON.stringify(message.params).slice(0,400));
 });
 const call=(method,params={})=>new Promise((resolve,reject)=>{
  const n=++id;pending.set(n,{resolve,reject});ws.send(JSON.stringify({id:n,method,params}));
  setTimeout(()=>{if(pending.has(n)){pending.delete(n);reject(Error('CDP_TIMEOUT_'+method))}},40000);
 });
 const evaluate=async(expression)=>{
  const out=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});
  if(out.exceptionDetails)throw Error('BROWSER_EXCEPTION_'+JSON.stringify(out.exceptionDetails).slice(0,700));
  return out.result.value;
 };
 const set=async(id,value)=>evaluate("(()=>{const e=document.getElementById("+JSON.stringify(id)+");if(!e)throw Error('MISSING_CONTROL_'+"
  +JSON.stringify(id)+");e.value="+JSON.stringify(String(value))+";e.dispatchEvent(new Event('input',{bubbles:true}));return e.value})()");
 await call('Page.enable');await call('Runtime.enable');
 await call('Emulation.setDeviceMetricsOverride',{width:1100,height:800,deviceScaleFactor:1,mobile:false});
 let nvidiaBefore=null,nvidiaAfter=null;
 try{nvidiaBefore=execFileSync('C:\\Windows\\System32\\nvidia-smi.exe',['--query-gpu=name,utilization.gpu,memory.used','--format=csv,noheader'],{encoding:'utf8',timeout:8000}).trim()}catch{}
 const results=[];
 const urls=[
  {name:'r1880',url:'http://127.0.0.1:19100/siteforge-r1880-autonome.html?demo=energy'},
  {name:'r1881',url:'http://127.0.0.1:19101/siteforge-r1881-autonome.html?demo=energy'}
 ];
 for(const item of urls){
  const res=await fetch(item.url);
  if(!res.ok)throw Error('HTTP_'+res.status+' '+item.name);
  await call('Page.navigate',{url:item.url});
  let ready=false;
  for(let i=0;i<100;i++){
   const val=await evaluate("document.querySelector('.core-r109-stage')?.dataset.coreReady||''");
   if(val==='true'){ready=true;break}
   await sleep(250);
  }
  if(!ready)throw Error(item.name+'_WEBGL_UNAVAILABLE');
  await set('sf-particleSpeed',0);
  await set('sf-pulseSpeed',0);
  await set('sf-flowCount',8);
  await set('sf-flowStructure',100);
  await set('sf-energyPalette','synestra');
  await evaluate("(()=>{const e=document.querySelector('[data-energy-mouse-toggle]');if(e.getAttribute('aria-pressed')==='true')e.click();const q=document.getElementById('sf-renderQuality');q.value='balanced';q.dispatchEvent(new Event('change',{bubbles:true}))})()");
  let condition=false;
  for(let i=0;i<90;i++){
   const s=JSON.parse(await evaluate("JSON.stringify({quality:document.querySelector('.core-r109-stage')?.dataset.qualityMode,count:document.getElementById('sf-flowCount')?.value,mouse:document.querySelector('[data-energy-mouse-toggle]')?.getAttribute('aria-pressed'),canvas:!!document.querySelector('.core-r109-canvas')})"));
   if(s.quality==='balanced'&&s.count==='8'&&s.mouse==='false'&&s.canvas){condition=true;break}
   await sleep(300);
  }
  if(!condition)throw Error('STAGE_NOT_STABLE_'+item.name);
  const info=JSON.parse(await evaluate("JSON.stringify((()=>{const c=document.querySelector('.core-r109-canvas');const g=c?.getContext('webgl');const ext=g?.getExtension('WEBGL_debug_renderer_info');const r=c.getBoundingClientRect();return {canvas:!!c,rect:{x:r.x,y:r.y,width:r.width,height:r.height,scale:1},vendor:g?.getParameter(ext?ext.UNMASKED_VENDOR_WEBGL:g.VENDOR),renderer:g?.getParameter(ext?ext.UNMASKED_RENDERER_WEBGL:g.RENDERER),glError:g?.getError(),contextLost:g?.isContextLost(),quality:document.querySelector('.core-r109-stage').dataset.qualityMode,mouse:document.querySelector('[data-energy-mouse-toggle]').getAttribute('aria-pressed'),count:document.getElementById('sf-flowCount').value,palette:document.getElementById('sf-energyPalette').value,spin:document.querySelector('.core-r109-stage').dataset.syncedSpinPhase}})())"));
  if(!info.canvas||info.contextLost||info.glError!==0||info.count!=='8'||info.palette!=='synestra')throw Error('WRONG_RENDER_STATE_'+item.name+'_'+JSON.stringify(info));
  const screen=async label=>{
   const s=await call('Page.captureScreenshot',{format:'png',clip:info.rect,captureBeyondViewport:false});
   const img=Buffer.from(s.data,'base64');
   writeFileSync(join(evidence,'r1881-gpu-'+item.name+'-'+label+'.png'),img);return img;
  };
  await sleep(950);
  const first=await screen('fixed');
  await sleep(550);
  const second=await screen('repeat');
  const repeat=comparePngPixels(first,second);
  const raf=JSON.parse(await evaluate("new Promise(resolve=>{const t=[];let count=0;const finish=()=>{const intervals=t.slice(1).map((x,i)=>x-t[i]);intervals.sort((a,b)=>a-b);resolve(JSON.stringify({frames:t.length,p50_ms:intervals[Math.floor(intervals.length*.5)]??null,p95_ms:intervals[Math.floor(intervals.length*.95)]??null,mean_ms:intervals.reduce((a,b)=>a+b,0)/(intervals.length||1),elapsed_ms:t.length>1?t.at(-1)-t[0]:0}))};const step=now=>{t.push(now);if(++count>=72)finish();else requestAnimationFrame(step)};requestAnimationFrame(step)})"));
  if(raf.frames!==72||!Number.isFinite(raf.mean_ms))throw Error(item.name+'_RAF_UNMEASURABLE');
  const record={name:item.name,http:res.status,info,repeatDiff:repeat,raf};
  results.push(record);console.log('GPU_BROWSER_PROBE',JSON.stringify(record));
 }
 const a=readFileSync(join(evidence,'r1881-gpu-r1880-fixed.png')),b=readFileSync(join(evidence,'r1881-gpu-r1881-fixed.png'));
 const between=comparePngPixels(a,b);
 const repeatWorst=Math.max(...results.map(x=>x.repeatDiff.changed));
 const renderer=String(results[0].info.renderer||'');
 const hardwareNvidia=/NVIDIA|GeForce RTX 3090/i.test(renderer)&&!/SwiftShader|Software/i.test(renderer);
 try{nvidiaAfter=execFileSync('C:\\Windows\\System32\\nvidia-smi.exe',['--query-gpu=name,utilization.gpu,memory.used','--format=csv,noheader'],{encoding:'utf8',timeout:8000}).trim()}catch{}
 const summary={
  schema:'synestra.siteforge.r1881.hardware_compare.v1',
  date:'2026-10-29',
  browserArgs:chromeArgs.filter(x=>!x.includes('--user-data-dir')),
  comparison:{view:[1100,800],pixelDiff:between,baselineRepeatChanged:repeatWorst,determinism:repeatWorst<100,meaningfulChange:between.changed>repeatWorst+1200},
  hardwareEvidence:{renderer,verifiedNvidiaWebGL:hardwareNvidia,nvidiaBefore,nvidiaAfter,reason:hardwareNvidia?'Renderer exposes NVIDIA hardware':'Headless D3D11 did not prove physical RTX 3090'},
  versions:results,jsExceptions:errors.slice(0,6),status:hardwareNvidia?'GPU_RENDERER_VERIFIED':'GPU_NOT_PROVEN'
 };
 writeFileSync(join(evidence,'SITEFORGE_R1881_GPU_COMPARE_20261029.json'),JSON.stringify(summary,null,2)+'\n');
 console.log('R1881_COMPARE_DONE',JSON.stringify({hardware:hardwareNvidia,crossChanged:between.changed,repeatWorst,meaningfulChange:summary.comparison.meaningfulChange,raf:results.map(r=>({name:r.name,mean:r.raf.mean_ms,frames:r.raf.frames}))}));
 await call('Browser.close');closed=true;
}catch(e){console.error('R1881_COMPARE_FAILED',String(e));process.exitCode=1}
finally{try{ws?.close()}catch{}if(!closed&&browser.exitCode===null)try{browser.kill()}catch{}await Promise.race([new Promise(r=>browser.once('exit',r)),sleep(1300)]);try{rmSync(profile,{recursive:true,force:true,maxRetries:3,retryDelay:120})}catch{}}
