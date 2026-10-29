import {spawn} from 'node:child_process';
import {readFileSync,writeFileSync,existsSync,mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {comparePngPixels} from './siteforge_r174_png_diff.mjs';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const mobile=process.argv.includes('--mobile'),suffix=mobile?'-mobile':'';
const profile=mkdtempSync(join(tmpdir(),'syn1883-'));
const browser=spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',['--headless=new','--use-angle=d3d11','--enable-webgl','--disable-extensions','--disable-background-networking','--no-first-run','--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{stdio:'ignore',windowsHide:true});
const sleep=ms=>new Promise(ok=>setTimeout(ok,ms));
let ws,closed=false;
try{
 const pf=join(profile,'DevToolsActivePort');for(let k=0;k<100&&!existsSync(pf);k++)await sleep(120);
 if(!existsSync(pf))throw Error('NO_CDP');
 const port=Number(readFileSync(pf,'utf8').split(/\r?\n/)[0]);
 const pages=await(await fetch('http://127.0.0.1:'+port+'/json/list')).json();
 const page=pages.find(p=>p.type==='page'&&p.webSocketDebuggerUrl);
 ws=new WebSocket(page.webSocketDebuggerUrl);
 await new Promise((ok,no)=>{ws.addEventListener('open',ok,{once:true});ws.addEventListener('error',no,{once:true})});
 let nextId=0;const pending=new Map();
 ws.addEventListener('message',e=>{let j;try{j=JSON.parse(e.data)}catch{return}if(j.method==='Runtime.exceptionThrown'||j.method==='Runtime.consoleAPICalled')console.log('BROWSER_DIAGNOSTIC',JSON.stringify(j.params).slice(0,1450));const p=pending.get(j.id);if(p){pending.delete(j.id);j.error?p.no(Error(JSON.stringify(j.error))):p.ok(j.result)}});
 const call=(method,params={})=>new Promise((ok,no)=>{const id=++nextId;pending.set(id,{ok,no});ws.send(JSON.stringify({id,method,params}));setTimeout(()=>{if(pending.has(id)){pending.delete(id);no(Error('CDP_TIMEOUT_'+method))}},30000)});
 const ev=async str=>{const r=await call('Runtime.evaluate',{expression:str,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error('PAGE_ERROR_'+JSON.stringify(r.exceptionDetails).slice(0,350));return r.result.value};
 const set=async(id,value)=>ev("(()=>{const e=document.getElementById("+JSON.stringify(id)+");if(!e)throw Error('NO_CONTROL');e.value="+JSON.stringify(String(value))+";e.dispatchEvent(new Event('input',{bubbles:true}));return e.value})()");
 await call('Runtime.enable');await call('Page.enable');await call('Emulation.setDeviceMetricsOverride',{width:mobile?390:1100,height:mobile?844:800,deviceScaleFactor:1,mobile});
 const url='http://127.0.0.1:19105/siteforge-r1884-autonome.html?demo=energy';
 if((await fetch(url)).status!==200)throw Error('NO_PREVIEW');
 await call('Page.navigate',{url});
 let ready=false;for(let n=0;n<100;n++){if(await ev("document.querySelector('.core-r109-stage')?.dataset.coreReady==='true'")){ready=true;break}await sleep(250)}
 if(!ready)throw Error('NOT_READY '+await ev("JSON.stringify({stage:document.querySelector('.core-r109-stage')?.dataset.coreReady,status:document.querySelector('[data-vfx-status]')?.textContent,renderStatus:document.querySelector('[data-render-status]')?.textContent,errors:[...document.querySelectorAll('[role=status]')].map(e=>e.textContent).slice(0,3)})"));
 await set('sf-flowCount',8);
 const state=async()=>JSON.parse(await ev("JSON.stringify((()=>{const c=document.querySelector('.core-r109-canvas');const gl=c.getContext('webgl'),debug=gl.getExtension('WEBGL_debug_renderer_info');const loc=gl.getUniformLocation(gl.getParameter(gl.CURRENT_PROGRAM),'uEnergyTurbulence');const r=c.getBoundingClientRect();return {gpuTimerQuery:!!gl.getExtension('EXT_disjoint_timer_query'),max:document.getElementById('sf-energyTurbulence').max,slider:document.getElementById('sf-energyTurbulence').value,display:document.querySelector('[data-energy-turbulence-value]').textContent,uniform:gl.getUniform(gl.getParameter(gl.CURRENT_PROGRAM),loc),renderer:gl.getParameter(debug?debug.UNMASKED_RENDERER_WEBGL:gl.RENDERER),error:gl.getError(),canvas:!!c,rect:{x:r.x,y:r.y,width:r.width,height:r.height,scale:1}}})())"));
 const initial=await state();
 if(!/NVIDIA.*RTX 3090/.test(initial.renderer)||initial.error!==0||initial.max!=='200'||initial.slider!=='35')throw Error('INITIAL_'+JSON.stringify(initial));
 const captures={};
 for(const value of [0,100,200]){
  await set('sf-energyTurbulence',value);await sleep(950);
  const s=await state();
  if(s.slider!==String(value)||s.display!==value+' %'||Math.abs(s.uniform-value/100)>.0001||s.error!==0)throw Error('CONTROL_'+value+' '+JSON.stringify(s));
  const image=Buffer.from((await call('Page.captureScreenshot',{format:'png',clip:s.rect,captureBeyondViewport:false})).data,'base64');
  writeFileSync(join(root,'evidence/r1884-turbulence-'+value+suffix+'.png'),image);
  captures[value]=image;
 }
 const diff=comparePngPixels(captures[100],captures[200]);
 if(diff.changed<800)throw Error('NO_VISUAL_MOVEMENT');
 // Export: intercept only the downloaded blob and leave native click path intact.
 await ev("(()=>{const old=URL.createObjectURL.bind(URL);URL.createObjectURL=(b)=>{window.__jsonPromise=b.text();return old(b)};document.querySelector('[data-export-json]').click()})()");
 const json=JSON.parse(await ev("(async()=>await window.__jsonPromise)()"));
 if(json.energyDynamics?.turbulence!==200||Object.keys(json.parameters).length!==18||Object.keys(json.energyFlow).length!==4)throw Error('EXPORT_BAD');
 const importSelector=await ev("document.querySelector('[data-import-file]')?.outerHTML||''");
 if(!importSelector)throw Error('IMPORT_SELECTOR_MISSING');
 const importJson=async doc=>ev("(async()=>{const input=document.querySelector('[data-import-file]');const file=new File(["+JSON.stringify(JSON.stringify(doc))+"],'preset.json',{type:'application/json'});const dt=new DataTransfer();dt.items.add(file);input.files=dt.files;input.dispatchEvent(new Event('change',{bubbles:true}));await new Promise(ok=>setTimeout(ok,500));return document.querySelector('[data-import-status]')?.textContent||''})()");
 const legacy=structuredClone(json);delete legacy.energyDynamics;
 const legacyFeedback=await importJson(legacy),legacyState=await state();
 if(legacyState.slider!=='35')throw Error('LEGACY_MISSING_DEFAULT_'+legacyFeedback+' '+legacyState.slider);
 await set('sf-energyTurbulence',91);
 const invalid=structuredClone(json);invalid.energyDynamics.turbulence=201;
 const badFeedback=await importJson(invalid),badState=await state();
 if(badState.slider!=='91'||!badFeedback)throw Error('NONATOMIC_IMPORT_'+badFeedback+' '+badState.slider);
 const valid=structuredClone(json);valid.energyDynamics.turbulence=200;
 const goodFeedback=await importJson(valid),goodState=await state();
 if(goodState.slider!=='200')throw Error('IMPORT_200_FAILURE_'+goodFeedback);
 const familyChecks=[];
 const familyFrames={};
 for(let family=0;family<=8;family++){
  await set('sf-flowType',family);
  await set('sf-flowCount',3);
  await set('sf-flowSpread',100);
  await set('sf-pulseSpeed',100);
  await set('sf-pulseIntensity',100);
  await set('sf-energyTurbulence',0);
  await set('sf-flowStructure',100);
  await set('sf-energyPalette','synestra');
  await sleep(450);
  const baseState=await state();
  if(baseState.error!==0||!baseState.canvas)throw Error('FAMILY_GPU_INVALID_'+family);
  const b0=Buffer.from((await call('Page.captureScreenshot',{format:'png',clip:baseState.rect,captureBeyondViewport:false})).data,'base64');
  await set('sf-flowCount',8);
  await set('sf-flowSpread',130);
  await set('sf-energyTurbulence',200);
  await set('sf-energyPalette','gold');
  await set('sf-pulseIntensity',175);
  await set('sf-flowStructure',65);
  await sleep(550);
  const afterState=await state();
  const b1=Buffer.from((await call('Page.captureScreenshot',{format:'png',clip:baseState.rect,captureBeyondViewport:false})).data,'base64');
  const changed=comparePngPixels(b0,b1);
  if(afterState.error!==0||changed.changed<650)throw Error('FAMILY_CONTROL_INACTIVE_'+family+' '+changed.changed);
  if(family>=6){
   writeFileSync(join(root,'evidence/r1884-family-'+family+suffix+'.png'),b1);
   familyFrames[family]=b1;
  }
  familyChecks.push({family,changes:changed.changed,glError:afterState.error});
 }
 for(const family of [7,8]){
  const changed=comparePngPixels(familyFrames[6],familyFrames[family]);
  if(changed.changed<1000)throw Error('NEW_FAMILY_LOOKS_IDENTICAL_'+family);
 }
 console.log('R1884_NINE_MATERIALS_PASS',JSON.stringify({mobile,familyChecks}));
 const report={schema:'synestra.siteforge.r1884.gpu-e2e.v1',familyChecks,mobile,renderer:initial.renderer,gpuTimerQueryAvailable:initial.gpuTimerQuery,status:'PASS',levels:[0,100,200],rangeMax:initial.max,uniform100:1,uniform200:2,visualDiff100to200:diff,exportedTurbulence:json.energyDynamics.turbulence,legacyRestoresDefault:legacyState.slider,invalid201Rejected:badState.slider==='91',valid200Imported:goodState.slider==='200',errors:0,limitations:'Screenshots include normal animation phase; visual pixel delta alone is not a deterministic intensity measurement.'};
 writeFileSync(join(root,'evidence/SITEFORGE_R1884_GPU_QA'+suffix+'_20261029.json'),JSON.stringify(report,null,2)+'\n');
 console.log('R1884_GPU_QA_PASS',JSON.stringify({mobile,renderer:initial.renderer,diff:diff.changed,uniforms:'0/1/2',legacy:legacyState.slider,invalid201:badState.slider,valid200:goodState.slider}));
 await call('Browser.close');closed=true;
}catch(err){console.error('R1884_GPU_QA_FAIL',String(err));process.exitCode=1}
finally{try{ws?.close()}catch{}if(!closed&&browser.exitCode===null)try{browser.kill()}catch{}await Promise.race([new Promise(ok=>browser.once('exit',ok)),sleep(900)]);try{rmSync(profile,{recursive:true,force:true,maxRetries:3,retryDelay:100})}catch{}}
