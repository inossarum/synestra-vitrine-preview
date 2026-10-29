import {spawn} from 'node:child_process';
import {readFileSync,writeFileSync,existsSync,mkdtempSync,rmSync} from 'node:fs';
import {join} from 'node:path';import {tmpdir} from 'node:os';
const origin='http://127.0.0.1:19119/lab-babylon/index.html?labFrame=4.5';
const profile=mkdtempSync(join(tmpdir(),'syn-r190-'));
const chrome=spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
 ['--headless=new','--use-angle=d3d11','--enable-webgl','--disable-extensions','--disable-background-networking','--no-first-run','--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{stdio:'ignore',windowsHide:true});
const sleep=ms=>new Promise(ok=>setTimeout(ok,ms));let ws;
const report={schema:'synestra.lab.r194.glow.e2e.v1',status:'PENDING',frames:[]};
try{
 const f=join(profile,'DevToolsActivePort');
 for(let k=0;k<100&&!existsSync(f);k++)await sleep(120);
 if(!existsSync(f))throw Error('CHROME_NO_PORT');
 const port=Number(readFileSync(f,'utf8').split(/\r?\n/)[0]);
 const tabs=await(await fetch('http://127.0.0.1:'+port+'/json/list')).json();
 ws=new WebSocket(tabs.find(x=>x.type==='page').webSocketDebuggerUrl);
 await new Promise((ok,no)=>{ws.addEventListener('open',ok,{once:true});ws.addEventListener('error',no,{once:true})});
 let id=0;const waits=new Map(),errors=[];
 ws.addEventListener('message',e=>{const x=JSON.parse(e.data);if(x.method==='Runtime.exceptionThrown')errors.push(x.params.exceptionDetails.text);const p=waits.get(x.id);if(p){waits.delete(x.id);x.error?p.no(Error(JSON.stringify(x.error))):p.ok(x.result)}});
 const call=(method,params={})=>new Promise((ok,no)=>{const i=++id;waits.set(i,{ok,no});ws.send(JSON.stringify({id:i,method,params}));});
 const evalJs=async expr=>{const r=await call('Runtime.evaluate',{expression:expr,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error('PAGE_JS '+JSON.stringify(r.exceptionDetails).slice(0,420));return r.result.value};
 const set=async(id,value)=>evalJs("(()=>{const e=document.getElementById("+JSON.stringify(id)+");e.value="+JSON.stringify(String(value))+";e.dispatchEvent(new Event('input',{bubbles:true}));return e.value})()");
 await call('Page.enable');await call('Runtime.enable');
 for(const width of [1100,390]){
  await call('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width===390});
  await call('Page.navigate',{url:origin});
  let ready=false;
  for(let j=0;j<110;j++){if(await evalJs("document.querySelector('#renderCanvas')?.dataset.sphereReady==='true'")){ready=true;break}await sleep(160)}
  if(!ready)throw Error('BABYLON_NOT_READY '+width+' '+await evalJs("document.querySelector('#status')?.textContent"));
  for(const mode of [0,1,2,3]){
   await set('core-mode',mode);await sleep(450);
   const state=await evalJs("(()=>{const c=document.querySelector('#renderCanvas'),gl=c.getContext('webgl2')||c.getContext('webgl'),e=gl.getExtension('WEBGL_debug_renderer_info');return {engine:c.dataset.engine,ready:c.dataset.sphereReady,mode:c.dataset.mode,filaments:Number(c.dataset.activeFilaments),canvas:document.querySelectorAll('canvas').length,plasmaVersion:c.dataset.plasmaVersion,plasmaRibbons:Number(c.dataset.plasmaRibbons),nodePlasma:Number(c.dataset.nodePlasma),glowSheaths:Number(c.dataset.glowSheaths),artReference:c.dataset.artReference,palette:c.dataset.palette,energyNodes:Number(c.dataset.energyNodes),renderer:gl.getParameter(e?e.UNMASKED_RENDERER_WEBGL:gl.RENDERER),error:gl.getError(),fps:Number(c.dataset.fps),width:c.width,height:c.height}})()");
   if(state.engine!=='babylon'||state.ready!=='true'||state.mode!==String(mode)||state.filaments+state.plasmaRibbons<10||state.canvas!==1||state.plasmaVersion!=='glow-sheaths-r194'||state.plasmaRibbons!==28||state.nodePlasma!==6||state.glowSheaths!==14||state.energyNodes!==6||state.palette!=='violet,cyan,dark-blue,green'||state.error!==0)throw Error('BAD_STATE '+JSON.stringify(state));
   const image=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
   const name='r194-glow-core'+mode+'-'+width+'.png';
   writeFileSync(new URL('../evidence/'+name,import.meta.url),Buffer.from(image.data,'base64'));
   report.frames.push({width,mode,name,state});
   console.log('SPHERE_PASS',JSON.stringify({width,mode,state}));
  }
  for(const [quality,expected] of [['economy',8],['balanced',26],['ultra',28]]){
   await set('quality',quality);await sleep(180);
   const budget=await evalJs("(()=>{const c=document.querySelector('#renderCanvas');return {quality:document.querySelector('#quality').value,ribbons:Number(c.dataset.visibleRibbons),sheaths:Number(c.dataset.visibleSheaths),error:(c.getContext('webgl2')||c.getContext('webgl')).getError()}})()");
   if(budget.quality!==quality||budget.ribbons!==expected||budget.sheaths!==(quality==='economy'?0:quality==='balanced'?10:14)||budget.error!==0)throw Error('PLASMA_BUDGET_MISMATCH '+JSON.stringify({width,...budget,expected}));
   report.frames.push({width,profile:quality,budget});
   console.log('PLASMA_BUDGET_PASS',JSON.stringify({width,...budget}));
  }
  if(width===1100){
   await set('quality','balanced');await set('core-mode',0);
   for(const [pose,alpha,beta] of [['front',-.38,1.2],['side',1.19,1.2],['above',-.38,.66]]){
    const moved=await evalJs("(()=>{const camera=window.__synestraLabAtlasInterop.getScene().activeCamera;camera.alpha="+alpha+";camera.beta="+beta+";return {alpha:camera.alpha,beta:camera.beta}})()");
    await sleep(550);
    const shot=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
    const name='r194-orbit-'+pose+'-1100.png';
    writeFileSync(new URL('../evidence/'+name,import.meta.url),Buffer.from(shot.data,'base64'));
    report.frames.push({width,pose,name,moved});
    console.log('ORBIT_CAPTURE_PASS',JSON.stringify({width,pose,moved}));
   }
  }
  await set('core-power',0);
  if(await evalJs("document.getElementById('core-power').value")!=='0')throw Error('CORE_ZERO_FAILED');
 }
 if(errors.length)throw Error('BROWSER_EXCEPTIONS '+JSON.stringify(errors));
 report.status='PASS';writeFileSync(new URL('../evidence/R194_GLOW_BROWSER.json',import.meta.url),JSON.stringify(report,null,2));
 await call('Browser.close');
}catch(e){console.error('SPHERE_E2E_FAIL',String(e));report.status='FAIL';report.error=String(e);process.exitCode=1}
finally{try{ws?.close()}catch{};try{chrome.kill()}catch{};await sleep(200);try{rmSync(profile,{recursive:true,force:true,maxRetries:2})}catch(e){console.log('PROFILE_CLEANUP_PENDING',e.code)}}
