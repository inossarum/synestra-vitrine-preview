import {spawn} from 'node:child_process';
import {readFileSync,writeFileSync,existsSync,mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';import {join,dirname} from 'node:path';import {fileURLToPath} from 'node:url';
const root=join(dirname(fileURLToPath(import.meta.url)),'..'),origin='http://127.0.0.1:19111/';
const profile=mkdtempSync(join(tmpdir(),'syn-r189-'));
const browser=spawn(process.env.SYN_TEST_BROWSER,
 ['--headless=new','--use-angle=d3d11','--enable-webgl','--disable-extensions','--disable-background-networking',
 '--no-first-run','--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],
 {stdio:'ignore',windowsHide:true});
const sleep=ms=>new Promise(ok=>setTimeout(ok,ms));
let ws;let exited=false;const report={schema:'synestra.lab.r189.real-browser.v1',status:'RUNNING',screens:[]};
try{
 const portfile=join(profile,'DevToolsActivePort');
 for(let i=0;i<100&&!existsSync(portfile);i++)await sleep(110);
 if(!existsSync(portfile))throw Error('CHROME_PORT_MISSING');
 const port=Number(readFileSync(portfile,'utf8').split(/\r?\n/)[0]);
 const pages=await(await fetch('http://127.0.0.1:'+port+'/json/list')).json();
 ws=new WebSocket(pages.find(p=>p.type==='page').webSocketDebuggerUrl);
 await new Promise((yes,no)=>{ws.addEventListener('open',yes,{once:true});ws.addEventListener('error',no,{once:true})});
 const pending=new Map();let counter=0;
 ws.addEventListener('message',e=>{const v=JSON.parse(e.data),p=pending.get(v.id);if(p){pending.delete(v.id);v.error?p.no(Error(JSON.stringify(v.error))):p.yes(v.result)}});
 const cmd=(method,params={})=>new Promise((yes,no)=>{const id=++counter;pending.set(id,{yes,no});ws.send(JSON.stringify({id,method,params}));});
 const ev=async code=>{const r=await cmd('Runtime.evaluate',{expression:code,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error('JS '+JSON.stringify(r.exceptionDetails).slice(0,400));return r.result.value};
 const set=async(id,value)=>ev("(()=>{const e=document.getElementById("+JSON.stringify(id)+");if(!e)throw Error('MISSING_CONTROL');e.value="+JSON.stringify(String(value))+";e.dispatchEvent(new Event('input',{bubbles:true}));return e.value})()");
 await cmd('Page.enable');await cmd('Runtime.enable');
 for(const width of [1100,390]){
  await cmd('Emulation.setDeviceMetricsOverride',{width,height:844,deviceScaleFactor:1,mobile:width===390});
  for(const version of ['1889','189']){
   const url=origin+'siteforge-r'+version+'-autonome.html?demo=energy&material=6&labFrame=4.5';
   if((await fetch(url)).status!==200)throw Error('HTTP_'+version);
   await cmd('Page.navigate',{url});
   let ready=false;for(let k=0;k<110;k++){
    if(await ev("document.querySelector('.core-r109-stage')?.dataset.coreReady==='true'")){ready=true;break}await sleep(170)
   }
   if(!ready)throw Error('WEBGL_NOT_READY_'+version+'_'+width);
   await set('sf-flowType',6);await set('sf-coreSize',70);await set('sf-coreLight',135);
   if(version==='189')await set('sf-coreSpeed',100);
   const modes=version==='1889'?[0]:[0,1,2,3];
   for(const mode of modes){
    if(version==='189')await set('sf-coreMode',mode);
    await sleep(520);
    const state=await ev("(()=>{const s=document.querySelector('.core-r109-stage'),c=document.querySelector('.core-r109-canvas'),gl=c.getContext('webgl'),db=gl.getExtension('WEBGL_debug_renderer_info'),r=c.getBoundingClientRect();return {coreMode:s.dataset.coreMode,coreSpeed:s.dataset.coreSpeed,ready:s.dataset.coreReady,error:gl.getError(),renderer:gl.getParameter(db?db.UNMASKED_RENDERER_WEBGL:gl.RENDERER),canvas:document.querySelectorAll('canvas').length,controls:document.querySelectorAll('#sf-coreMode').length,forms:[...document.querySelectorAll('.lab-panel')].length,rect:{x:r.x,y:r.y,width:r.width,height:r.height,scale:1}}})()");
    if(state.error!==0||state.ready!=='true'||state.canvas!==1||(version==='189'&&state.coreMode!==String(mode)))throw Error('BAD_WEBGL '+JSON.stringify({version,width,mode,state}));
    const shot=await cmd('Page.captureScreenshot',{format:'png',clip:state.rect,captureBeyondViewport:false});
    const name='r189-edge-'+version+'-mode'+mode+'-'+width+'.png';
    writeFileSync(join(root,'evidence',name),Buffer.from(shot.data,'base64'));
    report.screens.push({version,mode,width,name,state});
    console.log('SCREEN_PASS '+JSON.stringify({version,mode,width,renderer:state.renderer,canvas:state.canvas,error:state.error}));
   }
   if(version==='189'){
    await set('sf-coreMode',2);await set('sf-coreSpeed',0);
    const frozen=await ev("({mode:document.querySelector('.core-r109-stage').dataset.coreMode,speed:document.querySelector('.core-r109-stage').dataset.coreSpeed})");
    if(frozen.mode!=='2'||frozen.speed!=='0')throw Error('CORE_SPEED_ZERO_FAIL');
    await set('sf-coreLight',0);await sleep(440);
    const glOff=await ev("document.querySelector('.core-r109-canvas').getContext('webgl').getError()");
    if(glOff!==0)throw Error('POWER_ZERO_WEBGL');
    await set('sf-coreLight',135);await set('sf-coreSpeed',100);
    await ev("(()=>{const o=URL.createObjectURL.bind(URL);URL.createObjectURL=b=>{window.__labExport=b.text();return o(b)};document.querySelector('[data-export-json]').click()})()");
    const json=JSON.parse(await ev("(async()=>await window.__labExport)()"));
    if(json.nucleusDynamics?.mode!==2||json.nucleusDynamics.speed!==100||Object.keys(json.parameters).length!==18)throw Error('EXPORT_NOT_BACKWARD_COMPATIBLE');
    const importJson=doc=>ev("(async()=>{const el=document.querySelector('[data-import-file]'),f=new File(["+JSON.stringify(JSON.stringify(doc))+"],'test.json',{type:'application/json'}),dt=new DataTransfer();dt.items.add(f);el.files=dt.files;el.dispatchEvent(new Event('change',{bubbles:true}));await new Promise(ok=>setTimeout(ok,250));return {mode:document.querySelector('#sf-coreMode').value,speed:document.querySelector('#sf-coreSpeed').value,message:document.querySelector('[data-import-status]').textContent}})()");
    const invalid=structuredClone(json);invalid.nucleusDynamics.mode=9;
    const bad=await importJson(invalid);
    if(bad.mode!=='2'||!bad.message.includes('Import refus'))throw Error('INVALID_JSON_NOT_ATOMIC_'+JSON.stringify(bad));
    const restored=structuredClone(json);restored.nucleusDynamics={mode:3,speed:40};
    const ok=await importJson(restored);
    if(ok.mode!=='3'||ok.speed!=='40')throw Error('IMPORT_NUCLEUS_FAIL_'+JSON.stringify(ok));
    const legacy=structuredClone(json);delete legacy.nucleusDynamics;
    const old=await importJson(legacy);
    if(old.mode!=='0'||old.speed!=='100')throw Error('LEGACY_DEFAULT_FAILURE_'+JSON.stringify(old));
    report.screens.push({version,width,controls:{frozen,invalidRejected:true,importNew:true,legacyReset:true}});
    console.log('JSON_AND_NEGATIVE_PASS '+JSON.stringify({width,invalid:bad.mode,restored:ok.mode,legacy:old.mode}));
    const uiShot=await cmd('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});
    const uiName='r189-lab-ui-'+width+'.png';
    writeFileSync(join(root,'evidence',uiName),Buffer.from(uiShot.data,'base64'));
    console.log('UI_SCREEN_PASS '+uiName);
   }
  }
 }
 // Verify both shader families with an animated nucleus: older plasma (0), polar energy (8).
 await cmd('Emulation.setDeviceMetricsOverride',{width:1100,height:844,deviceScaleFactor:1,mobile:false});
 for(const family of [0,8]){
  await cmd('Page.navigate',{url:origin+'siteforge-r189-autonome.html?demo=energy&material='+family});
  let ready=false;
  for(let i=0;i<100;i++){if(await ev("document.querySelector('.core-r109-stage')?.dataset.coreReady==='true'")){ready=true;break}await sleep(160)}
  if(!ready)throw Error('OTHER_FAMILY_WEBGL_NOT_READY_'+family);
  await set('sf-flowType',family);await set('sf-coreMode',3);await set('sf-coreSpeed',100);
  await sleep(500);
  const state=await ev("(()=>{const c=document.querySelector('.core-r109-canvas'),g=c.getContext('webgl'),r=c.getBoundingClientRect();return {family:document.getElementById('sf-flowType').value,mode:document.getElementById('sf-coreMode').value,error:g.getError(),rect:{x:r.x,y:r.y,width:r.width,height:r.height,scale:1}}})()");
  if(state.error!==0||state.family!==String(family)||state.mode!=='3')throw Error('OTHER_FAMILY_BAD_'+JSON.stringify(state));
  const snap=await cmd('Page.captureScreenshot',{format:'png',clip:state.rect,captureBeyondViewport:false});
  const name='r189-family-'+family+'-mode3.png';
  writeFileSync(join(root,'evidence',name),Buffer.from(snap.data,'base64'));
  report.screens.push({version:'189',width:1100,mode:3,family,name,state});
  console.log('OTHER_FAMILY_PASS '+JSON.stringify({family,mode:3,error:state.error}));
 }
 // R188.8 real preset and A/B round-trip at a fixed animation timestamp.
 await cmd('Page.navigate',{url:origin+'siteforge-r189-autonome.html?demo=energy&material=6&labFrame=4.5'});
 let fixedReady=false;
 for(let n=0;n<90;n++){if(await ev("document.querySelector('.core-r109-stage')?.dataset.coreReady==='true'")){fixedReady=true;break}await sleep(160)}
 if(!fixedReady)throw Error('PRESET_BROWSER_NOT_READY');
 const click=selector=>ev("(()=>{const b=document.querySelector("+JSON.stringify(selector)+");if(!b)throw Error('BTN_MISSING');b.click();return true})()");
 await click('[data-nucleus-preset="braid"]');
 const a=await ev("({mode:document.querySelector('#sf-coreMode').value,preset:document.querySelector('.core-r109-stage').dataset.nucleusPreset,clock:document.querySelector('.core-r109-stage').dataset.captureClock})");
 if(a.mode!=='2'||a.preset!=='braid'||a.clock!=='fixed')throw Error('PRESET_BRAID_FAILURE_'+JSON.stringify(a));
 await click('[data-core-compare="save-a"]');await click('[data-nucleus-preset="vortex"]');await click('[data-core-compare="save-b"]');
 await click('[data-core-compare="load-a"]');
 const restoredA=await ev("document.querySelector('#sf-coreMode').value");
 await click('[data-core-compare="load-b"]');
 const restoredB=await ev("document.querySelector('#sf-coreMode').value");
 if(restoredA!=='2'||restoredB!=='1')throw Error('AB_ROUNDTRIP_FAILURE_'+restoredA+'_'+restoredB);
 await sleep(850);
 const img1=Buffer.from((await cmd('Page.captureScreenshot',{format:'png'})).data,'base64');
 await sleep(180);
 const img2=Buffer.from((await cmd('Page.captureScreenshot',{format:'png'})).data,'base64');
 if(!img1.equals(img2))throw Error('FIXED_FRAME_NOT_DETERMINISTIC');
 report.presetAB={status:'PASS',restoredA,restoredB,clock:'fixed',frame:4.5,screenshotHash:img1.length};
 console.log('PRESET_AB_FIXED_CLOCK_PASS '+JSON.stringify(report.presetAB));
 // R189 failure first: native WebGL context lost, explicit reload and recovery.
 await cmd('Emulation.setDeviceMetricsOverride',{width:1100,height:844,deviceScaleFactor:1,mobile:false});
 await cmd('Page.navigate',{url:origin+'siteforge-r189-autonome.html?demo=energy&material=6&labFrame=4.5'});
 let readyBefore=false;for(let k=0;k<95;k++){if(await ev("document.querySelector('.core-r109-stage')?.dataset.coreReady==='true'")){readyBefore=true;break}await sleep(150)}
 if(!readyBefore)throw Error('RECOVERY_SETUP_NOT_READY');
 const key=await ev("(()=>{const s=document.querySelector('.core-r109-stage'),before=s.dataset.orbitYaw;s.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true,cancelable:true}));const after=s.dataset.orbitYaw;s.dispatchEvent(new KeyboardEvent('keydown',{key:'Home',bubbles:true,cancelable:true}));return {before,after,reset:s.dataset.orbitYaw}})()");
 if(key.before===key.after||key.reset!=='0.000')throw Error('KEYBOARD_NAVIGATION_FAILED_'+JSON.stringify(key));
 const lost=await ev("(()=>{const gl=document.querySelector('canvas').getContext('webgl'),ext=gl.getExtension('WEBGL_lose_context');if(!ext)return 'UNSUPPORTED';ext.loseContext();return 'TRIGGERED'})()");
 if(lost==='TRIGGERED'){
  await sleep(500);
  const failure=await ev("(()=>{const s=document.querySelector('.core-r109-stage'),b=document.querySelector('[data-gpu-reload]');return {status:s.dataset.gpuStatus,buttonVisible:!b.hidden,ready:s.dataset.coreReady}})()");
  if(failure.status!=='lost'||!failure.buttonVisible||failure.ready==='true')throw Error('CONTEXT_LOSS_UI_FAILED_'+JSON.stringify(failure));
  await ev("document.querySelector('[data-gpu-reload]').click()");
  let recovered=false;
  for(let k=0;k<110;k++){if(await ev("document.querySelector('.core-r109-stage')?.dataset.gpuStatus==='ready'")){recovered=true;break}await sleep(160)}
  if(!recovered)throw Error('CONTEXT_RELOAD_FAILED');
  report.recovery={status:'PASS',lost:failure,recovered,keyboard:key};
 }else report.recovery={status:'UNSUPPORTED',keyboard:key};
 console.log('CONTEXT_RECOVERY '+JSON.stringify(report.recovery));
 // Reduced-motion system preference shows a readable static fallback without GPU init.
 await cmd('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
 await cmd('Page.navigate',{url:origin+'siteforge-r189-autonome.html?demo=energy'});
 await sleep(450);
 const reduced=await ev("(()=>({matches:matchMedia('(prefers-reduced-motion: reduce)').matches,ready:document.querySelector('.core-r109-stage').dataset.coreReady||'none',status:document.querySelector('[data-render-status]').textContent}))()");
 if(!reduced.matches||reduced.ready==='true'||!reduced.status.includes('Animation'))throw Error('REDUCED_MOTION_FAIL_'+JSON.stringify(reduced));
 report.reducedMotion={status:'PASS',details:reduced};
 await cmd('Emulation.setEmulatedMedia',{features:[]});
 console.log('REDUCED_MOTION_PASS '+JSON.stringify(reduced));
 report.status='PASS';
 writeFileSync(join(root,'evidence','SITEFORGE_LAB_R189_EDGE_BROWSER_20261029.json'),JSON.stringify(report,null,2)+'\n');
 await cmd('Browser.close');exited=true;
}catch(e){report.status='FAIL';console.error('R189_BROWSER_FAIL',String(e));process.exitCode=1}
finally{try{ws?.close()}catch{};if(!exited)try{browser.kill()}catch{};await Promise.race([new Promise(ok=>browser.once('exit',ok)),sleep(900)]);
 try{rmSync(profile,{recursive:true,force:true,maxRetries:2,retryDelay:120})}catch(e){console.warn('CHROME_PROFILE_CLEANUP_PENDING',e.code)}}
