import {spawn} from 'node:child_process';
import {readFileSync,writeFileSync,existsSync,mkdtempSync,rmSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {tmpdir} from 'node:os';
import {fileURLToPath} from 'node:url';
const root=join(dirname(fileURLToPath(import.meta.url)),'..'),base='http://127.0.0.1:19106/';
const profile=mkdtempSync(join(tmpdir(),'syn-r1885-'));
const chrome=spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
 ['--headless=new','--use-angle=d3d11','--enable-webgl','--disable-extensions',
 '--disable-background-networking','--no-first-run','--remote-debugging-port=0',
 '--user-data-dir='+profile,'about:blank'],{stdio:'ignore',windowsHide:true});
const sleep=ms=>new Promise(ok=>setTimeout(ok,ms));
let ws,closed=false;const result={schema:'synestra.lab.r1885.native-visual.v1',screens:[],status:'PENDING'};
try{
 const portfile=join(profile,'DevToolsActivePort');
 for(let i=0;i<100&&!existsSync(portfile);i++)await sleep(110);
 if(!existsSync(portfile))throw Error('NO_CDP');
 const port=Number(readFileSync(portfile,'utf8').split(/\r?\n/)[0]);
 const pages=await(await fetch('http://127.0.0.1:'+port+'/json/list')).json();
 ws=new WebSocket(pages.find(p=>p.type==='page').webSocketDebuggerUrl);
 await new Promise((yes,no)=>{ws.addEventListener('open',yes,{once:true});ws.addEventListener('error',no,{once:true})});
 const pend=new Map();let id=0;
 ws.addEventListener('message',e=>{const m=JSON.parse(e.data);const p=pend.get(m.id);if(p){pend.delete(m.id);m.error?p.no(Error(JSON.stringify(m.error))):p.yes(m.result)}});
 const call=(method,params={})=>new Promise((yes,no)=>{const k=++id;pend.set(k,{yes,no});ws.send(JSON.stringify({id:k,method,params}));});
 const evaluate=async exp=>{const r=await call('Runtime.evaluate',{expression:exp,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error('BROWSER_JS_'+JSON.stringify(r.exceptionDetails).slice(0,350));return r.result.value};
 const set=async(k,v)=>evaluate("(()=>{const el=document.getElementById("+JSON.stringify(k)+");if(!el)throw Error('NO_CONTROL_"+k+"');el.value="+JSON.stringify(String(v))+";el.dispatchEvent(new Event('input',{bubbles:true}));return el.value})()");
 await call('Page.enable');await call('Runtime.enable');
 for(const width of [1100,390]){
  await call('Emulation.setDeviceMetricsOverride',{width,height:844,deviceScaleFactor:1,mobile:width===390});
  for(const version of ['1884','1885']){
   const url=base+'siteforge-r'+version+'-autonome.html?demo=energy&material=6';
   if((await fetch(url)).status!==200)throw Error('HTTP_'+version);
   await call('Page.navigate',{url});
   let ready=false;
   for(let k=0;k<100;k++){if(await evaluate("document.querySelector('.core-r109-stage')?.dataset.coreReady==='true'")){ready=true;break}await sleep(170)}
   if(!ready)throw Error('WEBGL_NOT_READY_'+version+'_'+width);
   for(const [key,val] of [['sf-flowType',6],['sf-coreSize',70],['sf-coreLight',135],['sf-flowCount',5],['sf-energyTurbulence',35]])await set(key,val);
   await sleep(1000);
   const state=await evaluate("(()=>{const c=document.querySelector('.core-r109-canvas'),gl=c.getContext('webgl'),db=gl.getExtension('WEBGL_debug_renderer_info'),r=c.getBoundingClientRect();return {renderer:gl.getParameter(db?db.UNMASKED_RENDERER_WEBGL:gl.RENDERER),error:gl.getError(),ready:document.querySelector('.core-r109-stage')?.dataset.coreReady,coreSize:document.getElementById('sf-coreSize').value,coreLight:document.getElementById('sf-coreLight').value,material:document.getElementById('sf-flowType').value,rect:{x:r.x,y:r.y,width:r.width,height:r.height,scale:1}}})()");
   if(state.error!==0||state.ready!=='true'||state.coreLight!=='135'||state.coreSize!=='70'||state.material!=='6')throw Error('BAD_RENDER_'+version+'_'+JSON.stringify(state));
   const name='r1885-'+version+'-'+width+'.png';
   const shot=await call('Page.captureScreenshot',{format:'png',clip:state.rect,captureBeyondViewport:false});
   writeFileSync(join(root,'evidence',name),Buffer.from(shot.data,'base64'));
   result.screens.push({version,width,name,state});
   if(version==='1885'){
    for(const [control,val,tag] of [['sf-coreLight',0,'power-zero'],['sf-coreSize',0,'size-zero']]){
     await set('sf-coreLight',135);await set('sf-coreSize',70);
     await set(control,val);await sleep(500);
     const off=await call('Page.captureScreenshot',{format:'png',clip:state.rect,captureBeyondViewport:false});
     const offName='r1885-'+tag+'-'+width+'.png';
     writeFileSync(join(root,'evidence',offName),Buffer.from(off.data,'base64'));
     const verified=await evaluate("(()=>({size:document.getElementById('sf-coreSize').value,power:document.getElementById('sf-coreLight').value,error:document.querySelector('.core-r109-canvas').getContext('webgl').getError()}))()");
     if(verified.error!==0||verified[control==='sf-coreLight'?'power':'size']!=='0')throw Error('CORE_OFF_FAILURE '+JSON.stringify(verified));
     result.screens.push({version,width,name:offName,control,val,state:verified});
     console.log('CORE_OFF_PASS '+JSON.stringify({width,control,verified}));
    }
   }
   console.log('LAB_SCREENSHOT_PASS '+JSON.stringify({version,width,renderer:state.renderer,error:state.error,name}));
  }
 }
 // Spot-check the other shader paths: material 0 uses legacy volume; 8 uses R188 polar vortex.
 await call('Emulation.setDeviceMetricsOverride',{width:1100,height:844,deviceScaleFactor:1,mobile:false});
 for(const family of [0,8]){
  const url=base+'siteforge-r1885-autonome.html?demo=energy&material='+family;
  await call('Page.navigate',{url});
  let ready=false;
  for(let k=0;k<100;k++){if(await evaluate("document.querySelector('.core-r109-stage')?.dataset.coreReady==='true'")){ready=true;break}await sleep(150)}
  if(!ready)throw Error('FAMILY_WEBGL_NOT_READY_'+family);
  await set('sf-flowType',family);await set('sf-coreSize',70);await set('sf-coreLight',135);
  await sleep(800);
  const state=await evaluate("(()=>{const c=document.querySelector('.core-r109-canvas'),gl=c.getContext('webgl'),r=c.getBoundingClientRect();return {family:document.getElementById('sf-flowType').value,error:gl.getError(),rect:{x:r.x,y:r.y,width:r.width,height:r.height,scale:1}}})()");
  if(state.error!==0||state.family!==String(family))throw Error('FAMILY_GPU_'+JSON.stringify(state));
  const name='r1885-family-'+family+'-1100.png';
  const shot=await call('Page.captureScreenshot',{format:'png',clip:state.rect,captureBeyondViewport:false});
  writeFileSync(join(root,'evidence',name),Buffer.from(shot.data,'base64'));
  result.screens.push({version:'1885',width:1100,family,name,state});
  console.log('FAMILY_NUCLEUS_SCREENSHOT_PASS '+JSON.stringify({family,name,error:state.error}));
 }
 result.status='PASS';
 writeFileSync(join(root,'evidence','SITEFORGE_LAB_R1885_BROWSER_20261029.json'),JSON.stringify(result,null,2)+'\n');
 await call('Browser.close');closed=true;
}catch(e){result.status='FAIL';console.error('LAB_R1885_VISUAL_FAILURE',String(e));process.exitCode=1}
finally{try{ws?.close()}catch{}if(!closed)try{chrome.kill()}catch{};await Promise.race([new Promise(ok=>chrome.once('exit',ok)),sleep(1000)]);
 try{rmSync(profile,{recursive:true,force:true,maxRetries:3,retryDelay:150})}catch(e){console.warn('QA_PROFILE_CLEANUP_PENDING',String(e.code))}}
