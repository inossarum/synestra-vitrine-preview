// Synestra R204 – isolated Chrome CDP validation; localhost only, no production, no credentials.
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {existsSync,readFileSync,mkdtempSync,rmSync,writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const url='http://127.0.0.1:18884/';
const chrome=process.env.CHROME_BIN||(process.platform==='win32'?'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe':'/usr/bin/google-chrome');
const profile=mkdtempSync(join(tmpdir(),'synestra-r207-chrome-'));
const child=spawn(chrome,['--headless=new','--enable-unsafe-swiftshader','--disable-dev-shm-usage','--no-first-run','--no-default-browser-check','--disable-background-networking','--remote-debugging-address=127.0.0.1','--remote-debugging-port=0','--user-data-dir='+profile,url],{stdio:'ignore',windowsHide:true});
const wait=ms=>new Promise(r=>setTimeout(r,ms));
let ws,send;const issues=[],results=[];
try {
 const portfile=join(profile,'DevToolsActivePort');
 for(let i=0;i<100&&!existsSync(portfile);i++)await wait(100);
 assert.ok(existsSync(portfile),'CHROME_NOT_STARTED');
 const port=Number(readFileSync(portfile,'utf8').split(/\r?\n/)[0]);
 const targets=await(await fetch('http://127.0.0.1:'+port+'/json/list')).json();
 const page=targets.find(x=>x.type==='page'&&x.webSocketDebuggerUrl);
 assert.ok(page,'CHROME_PAGE_UNAVAILABLE');
 ws=new WebSocket(page.webSocketDebuggerUrl);
 await new Promise((resolve,reject)=>{ws.addEventListener('open',resolve,{once:true});ws.addEventListener('error',reject,{once:true});});
 let seq=0;const pending=new Map();
 ws.addEventListener('message',e=>{
  let m;try{m=JSON.parse(e.data)}catch{return}
  if(m.method==='Runtime.exceptionThrown')issues.push('JS:'+m.params.exceptionDetails?.text);
  if(m.method==='Log.entryAdded'&&m.params.entry?.level==='error')issues.push('LOG:'+m.params.entry?.text?.slice(0,300));
  if(m.method==='Runtime.consoleAPICalled'&&m.params.type==='error')issues.push('CONSOLE:'+(m.params.args||[]).map(x=>x.value||x.description).join(' ').slice(0,300));
  const p=pending.get(m.id);if(!p)return;pending.delete(m.id);
  m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result);
 });
 send=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));setTimeout(()=>{if(pending.has(id)){pending.delete(id);reject(Error('CDP_TIMEOUT:'+method))}},15000)});
 await send('Page.enable');await send('Runtime.enable');await send('Log.enable');
 const evaluate=async expression=>{
  const x=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});
  if(x.exceptionDetails)throw Error('JS_EVAL:'+JSON.stringify(x.exceptionDetails));
  return x.result.value;
 };
 const measure="(()=>{const s=document.querySelector('.core-r109-stage'),c=document.querySelector('.core-r109-canvas'),gl=c?.getContext('webgl2')||c?.getContext('webgl');return {ready:s?.dataset.coreReady||null,fallback:s?.dataset.r204Fallback||null,gpuTier:s?.dataset.gpuTier||null,renderer:s?.dataset.coreRenderer||null,reference:s?.dataset.labReference||null,canvas:document.querySelectorAll('canvas').length,buffer:c?[c.width,c.height]:null,cssSize:c?[Math.round(c.getBoundingClientRect().width),Math.round(c.getBoundingClientRect().height)]:null,webgl:!!gl,gpu:gl?.getParameter(gl.RENDERER)||null,status:document.querySelector('[data-render-status]')?.textContent||'',h1:document.querySelectorAll('h1').length,overflow:document.documentElement.scrollWidth,viewport:innerWidth,fps:s?.dataset.coreFps||null,quality:s?.dataset.coreQuality||null}})()";
 for(const width of [1440,768,390]){
  await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width===390});
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
  await send('Page.navigate',{url});
  let m;
  for(let j=0;j<90;j++){await wait(200);m=await evaluate(measure);if(m.ready||m.fallback)break}
  if(m?.ready==='true')await wait(1100);
  m=await evaluate(measure);
  results.push({width,home:m});
  const control=await evaluate("(()=>{const s=document.querySelector('.core-r109-stage'),q=document.querySelector('#r207-quality-select');return {visible:!!q,mode:q?.value,tier:Number(s?.dataset.renderTier),gpu:Number(s?.dataset.gpuTier),flows:Number(s?.dataset.energyFlows),motes:Number(s?.dataset.energyMotes),fog:s?.dataset.sceneAtmosphere}})()");
  assert.equal(control.visible,true,'QUALITY_UI_MISSING');
  assert.ok(['auto','eco','balanced','high','ultra'].includes(control.mode));
  assert.ok(control.flows>=2,'SPATIAL_FLUX_MISSING');
  results.at(-1).qualityControl=control;
  if(width===1440){
   const eco=await evaluate("(()=>{const q=document.querySelector('#r207-quality-select');q.value='eco';q.dispatchEvent(new Event('change',{bubbles:true}));const s=document.querySelector('.core-r109-stage');return {mode:q.value,tier:s.dataset.renderTier,flows:s.dataset.energyFlows,fog:s.dataset.sceneAtmosphere}})()");
   assert.equal(eco.tier,'0');assert.equal(eco.flows,'2');assert.equal(eco.fog,'off');
   const ultra=await evaluate("(()=>{const q=document.querySelector('#r207-quality-select');q.value='ultra';q.dispatchEvent(new Event('change',{bubbles:true}));const s=document.querySelector('.core-r109-stage');return {mode:q.value,tier:s.dataset.renderTier,flows:s.dataset.energyFlows,motes:s.dataset.energyMotes,quality:s.dataset.qualityPreference}})()");
   assert.equal(ultra.tier,'3');assert.equal(ultra.flows,'8');assert.equal(ultra.quality,'ultra');assert.equal(ultra.motes,'36');
   results.at(-1).manualModes={eco,ultra};
   await evaluate("(()=>{const q=document.querySelector('#r207-quality-select');q.value='auto';q.dispatchEvent(new Event('change',{bubbles:true}));return true})()");
  }
  if(width===1440){
   await wait(9500);
   const a=await evaluate("(()=>{const s=document.querySelector('.core-r109-stage');return{tier:Number(s.dataset.renderTier),gpuTier:Number(s.dataset.gpuTier),drops:Number(s.dataset.autoTierDrops),samples:Number(s.dataset.energyRaySamples),fps:s.dataset.coreFps,quality:s.dataset.coreQuality,ready:s.dataset.coreReady}})()");
   assert.equal(a.ready,'true');assert.ok(a.tier>=0&&a.tier<=a.gpuTier);
   assert.equal(a.samples,[12,24,32,40][a.tier]);
   results.at(-1).adaptive=a;
   console.log('R205_ADAPTIVE_LIVE=PASS',JSON.stringify(a));
   await send('Emulation.setCPUThrottlingRate',{rate:6});
   await wait(13000);
   const st=await evaluate("(()=>{const s=document.querySelector('.core-r109-stage');return{tier:Number(s.dataset.renderTier),gpuTier:Number(s.dataset.gpuTier),drops:Number(s.dataset.autoTierDrops),samples:Number(s.dataset.energyRaySamples),fps:s.dataset.coreFps,quality:s.dataset.coreQuality,ready:s.dataset.coreReady}})()");
   await send('Emulation.setCPUThrottlingRate',{rate:1});
   assert.equal(st.ready,'true');assert.ok(st.tier>=0&&st.tier<=st.gpuTier);
   assert.equal(st.samples,[12,24,32,40][st.tier]);
   results.at(-1).cpuStress=st;
   console.log('R205_CPU_STRESS=PASS',JSON.stringify(st));
  }
  assert.equal(m.ready,'true','R207_RENDER_NOT_READY '+width+' '+JSON.stringify(m));
  assert.equal(m.renderer,'three-one');
  assert.equal(m.canvas,1);
  assert.ok(m.webgl,'NO_WEBGL_CONTEXT');
  assert.equal(m.h1,1);
  assert.ok(m.buffer[0]>0&&m.buffer[1]>0);
  assert.ok(m.overflow<=width+2,'HORIZONTAL_OVERFLOW '+width+' '+m.overflow);
  const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
  const bytes=Buffer.from(shot.data,'base64');
  writeFileSync(join(root,'r207-qa-'+width+'.png'),bytes);
  results.at(-1).screenshot={bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')};
  console.log('R207_WEBGL_VIEWPORT=PASS',JSON.stringify(results.at(-1)));
 }
 await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
 await send('Page.navigate',{url});
 let reduced=null;
 for(let i=0;i<120;i++){
  await wait(250);
  reduced=await evaluate(measure);
  if(reduced?.fallback==='reduced-motion')break;
 }
 assert.equal(reduced.ready,null);assert.equal(reduced.fallback,'reduced-motion');assert.equal(reduced.h1,1);
 const product=[];
 for(const route of ['connect/','bridge/','siteforge/','offres/']){
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
  await send('Page.navigate',{url:url+route});await wait(500);
  const m=await evaluate("({href:location.pathname,ready:document.readyState,h1:document.querySelectorAll('h1').length,canvas:document.querySelectorAll('canvas').length,overflow:document.documentElement.scrollWidth,viewport:innerWidth})");
  assert.equal(m.ready,'complete',route);
  assert.equal(m.h1,1,route);
  assert.equal(m.canvas,0,route);
  assert.ok(m.overflow<=m.viewport+2,route);
  product.push(m);
 }
 // Deterministic browser slow-frame emulation: validates tier change while WebGL remains live.
 // Not a real low-end GPU benchmark; only the governor's browser integration is proven.
 const preload=await send('Page.addScriptToEvaluateOnNewDocument',{source:"(()=>{const native=requestAnimationFrame.bind(window);window.requestAnimationFrame=(cb)=>native(()=>setTimeout(()=>cb(performance.now()),110));})()"});
 await send('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});
 await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
 await send('Page.navigate',{url});
 let simulatedSlowFrames;
 for(let frameProbe=0;frameProbe<140;frameProbe++){
  await wait(500);
  simulatedSlowFrames=await evaluate("(()=>{const s=document.querySelector('.core-r109-stage');return{ready:s?.dataset.coreReady||null,gpuTier:Number(s?.dataset.gpuTier),tier:Number(s?.dataset.renderTier),drops:Number(s?.dataset.autoTierDrops),samples:Number(s?.dataset.energyRaySamples),quality:s?.dataset.coreQuality||null,fps:s?.dataset.coreFps||null,canvas:document.querySelectorAll('canvas').length}})()");
  if(simulatedSlowFrames.drops>=1||(simulatedSlowFrames.ready==='true'&&simulatedSlowFrames.gpuTier===0))break;
 }
 await send('Page.removeScriptToEvaluateOnNewDocument',{identifier:preload.identifier});
 assert.equal(simulatedSlowFrames.ready,'true','R205_LOST_WEBGL_UNDER_SLOW_FRAMES');
 if(simulatedSlowFrames.gpuTier>0)
  assert.ok(simulatedSlowFrames.drops>=1&&simulatedSlowFrames.tier<simulatedSlowFrames.gpuTier,'R205_ADAPTIVE_TIER_NOT_TRIGGERED '+JSON.stringify(simulatedSlowFrames));
 else assert.equal(simulatedSlowFrames.tier,0,'Tier 0 must never drop below real 3D');
 assert.equal(simulatedSlowFrames.samples,[12,24,32,40][simulatedSlowFrames.tier]);
 assert.equal(simulatedSlowFrames.canvas,1);
 console.log('R205_SLOW_FRAMES_EMULATION=PASS',JSON.stringify(simulatedSlowFrames));
 const shaderErrors=issues.filter(x=>/webgl|shader|compile|error/i.test(x));
 assert.equal(shaderErrors.length,0,'CONSOLE_OR_SHADER_ERRORS:'+JSON.stringify(shaderErrors));
 const report={schema:'synestra.siteforge.r207.chrome.v1',baseCommit:'fd23e9c325214715b08b508da6756374f2535aef',status:'PASS',device:'Inos-Cerebros Chrome isolated headless',results,reduced,product,simulatedSlowFrames,issues};
 writeFileSync(join(root,'r207-qa-browser-evidence.json'),JSON.stringify(report,null,2)+'\n');
 console.log('R207_BROWSER_QA=PASS '+JSON.stringify({views:results.length,product:product.length,reduced:reduced.fallback,issues:issues.length}));
}catch(e){console.error('R207_BROWSER_QA=FAIL '+String(e));process.exitCode=1;}
finally{try{if(send)await send('Browser.close')}catch{};try{ws?.close()}catch{};try{child.kill()}catch{};try{rmSync(profile,{recursive:true,force:true})}catch{}}
