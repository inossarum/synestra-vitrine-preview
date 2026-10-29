import {spawn} from 'node:child_process';
import {readFileSync,writeFileSync,existsSync,mkdtempSync,rmSync} from 'node:fs';
import {join} from 'node:path';import {tmpdir} from 'node:os';
const origin='http://127.0.0.1:19115/lab-babylon/index.html?labFrame=4.5&atlasSocketFixture=1';
const profile=mkdtempSync(join(tmpdir(),'syn-r190-'));
const chrome=spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
 ['--headless=new','--use-angle=d3d11','--enable-webgl','--disable-extensions','--disable-background-networking','--no-first-run','--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{stdio:'ignore',windowsHide:true});
const sleep=ms=>new Promise(ok=>setTimeout(ok,ms));let ws;
const report={schema:'synestra.lab.r190.babylon.e2e.v1',status:'PENDING',frames:[]};
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
   const state=await evalJs("(()=>{const c=document.querySelector('#renderCanvas'),gl=c.getContext('webgl2')||c.getContext('webgl'),e=gl.getExtension('WEBGL_debug_renderer_info');return {engine:c.dataset.engine,ready:c.dataset.sphereReady,mode:c.dataset.mode,filaments:Number(c.dataset.activeFilaments),canvas:document.querySelectorAll('canvas').length,atlasSocket:c.dataset.atlasSocket,renderer:gl.getParameter(e?e.UNMASKED_RENDERER_WEBGL:gl.RENDERER),error:gl.getError(),fps:Number(c.dataset.fps),width:c.width,height:c.height}})()");
   if(state.engine!=='babylon'||state.ready!=='true'||state.mode!==String(mode)||state.filaments<10||state.canvas!==1||state.atlasSocket!=='atlas-socket'||state.error!==0)throw Error('BAD_STATE '+JSON.stringify(state));
   const image=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
   const name='r190-atlas-socket-core'+mode+'-'+width+'.png';
   writeFileSync(new URL('../evidence/'+name,import.meta.url),Buffer.from(image.data,'base64'));
   report.frames.push({width,mode,name,state});
   console.log('SPHERE_PASS',JSON.stringify({width,mode,state}));
  }
  await set('core-power',0);
  if(await evalJs("document.getElementById('core-power').value")!=='0')throw Error('CORE_ZERO_FAILED');
 }
 if(errors.length)throw Error('BROWSER_EXCEPTIONS '+JSON.stringify(errors));
 report.status='PASS';writeFileSync(new URL('../evidence/R190_ATLAS_SOCKET_BROWSER.json',import.meta.url),JSON.stringify(report,null,2));
 await call('Browser.close');
}catch(e){console.error('SPHERE_E2E_FAIL',String(e));report.status='FAIL';report.error=String(e);process.exitCode=1}
finally{try{ws?.close()}catch{};try{chrome.kill()}catch{};await sleep(200);try{rmSync(profile,{recursive:true,force:true,maxRetries:2})}catch(e){console.log('PROFILE_CLEANUP_PENDING',e.code)}}
