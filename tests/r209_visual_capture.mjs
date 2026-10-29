import {spawn} from 'node:child_process';
import {mkdtempSync,existsSync,readFileSync,writeFileSync,rmSync} from 'node:fs';
import {join,resolve} from 'node:path';import {tmpdir} from 'node:os';
const [version='baseline',mode='ultra']=process.argv.slice(2);
const origin='http://127.0.0.1:18889/r204/';
const chrome='C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const profile=mkdtempSync(join(tmpdir(),'r209-qa-'));
const child=spawn(chrome,['--headless=new','--no-first-run','--no-default-browser-check','--disable-background-networking','--remote-debugging-port=0','--remote-debugging-address=127.0.0.1','--user-data-dir='+profile,origin],{stdio:'ignore',windowsHide:true});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
let ws;let id=0;const waits=new Map();
try{
 const portfile=join(profile,'DevToolsActivePort');for(let i=0;i<100&&!existsSync(portfile);i++)await sleep(100);
 if(!existsSync(portfile))throw Error('CHROME_BOOT_FAILED');
 const port=Number(readFileSync(portfile,'utf8').split(/\r?\n/)[0]);
 const pages=await(await fetch('http://127.0.0.1:'+port+'/json/list')).json();
 ws=new WebSocket(pages.find(p=>p.type==='page').webSocketDebuggerUrl);
 await new Promise((done,fail)=>{ws.addEventListener('open',done,{once:true});ws.addEventListener('error',fail,{once:true})});
 ws.addEventListener('message',e=>{const m=JSON.parse(e.data);const r=waits.get(m.id);if(r){waits.delete(m.id);m.error?r.reject(Error(JSON.stringify(m.error))):r.resolve(m.result)}});
 const send=(method,params={})=>new Promise((resolve,reject)=>{const k=++id;waits.set(k,{resolve,reject});ws.send(JSON.stringify({id:k,method,params}));});
 await send('Page.enable');await send('Runtime.enable');
 await send('Page.addScriptToEvaluateOnNewDocument',{source:"try{localStorage.setItem('synestra-core-quality-v1','"+mode+"')}catch(e){}"});
 const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error('EXCEPTION '+r.exceptionDetails.text);return r.result.value};
 const result={version,mode,source:'Inos-Cerebros local Chrome CDP',screens:[]};
 for(const width of [1440,390]){
  await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width===390});
  await send('Page.navigate',{url:origin});
  let ready=false;
  for(let i=0;i<100;i++){await sleep(200);ready=await evaluate("(()=>{const s=document.querySelector('.core-r109-stage');return s?.dataset.coreReady==='true'&&s?.dataset.coreNucleus==='geometry-r209'})()");if(ready)break}
  if(!ready)throw Error('NO_WEBGL_'+width);
  await sleep(5500);
  const state=await evaluate("(()=>{const s=document.querySelector('.core-r109-stage'),p=document.querySelector('.r207-quality-panel')?.getBoundingClientRect(),canvas=document.querySelector('.core-r109-canvas');return {quality:s.dataset.qualityPreference,tier:s.dataset.renderTier,fps:s.dataset.coreFps,flows:s.dataset.energyFlows,motes:s.dataset.energyMotes,atmosphere:s.dataset.sceneAtmosphere,nucleus:s.dataset.coreNucleus,canvas:document.querySelectorAll('canvas').length,buffer:[canvas.width,canvas.height],qualityPanel:p?{x:p.x,y:p.y,w:p.width,h:p.height}:null}})()");
  const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
  const file=resolve('I:/_STUDIO_STAGING/syn_site_r209_core_restore_20261029/evidence/R209_'+version+'_'+width+'.png');
  writeFileSync(file,Buffer.from(shot.data,'base64'));
  result.screens.push({width,file,state});
  console.log('CAPTURE_PASS '+JSON.stringify({width,state,file}));
 }
 const report=resolve('I:/_STUDIO_STAGING/syn_site_r209_core_restore_20261029/evidence/R209_'+version+'.json');
 writeFileSync(report,JSON.stringify(result,null,2));console.log('VISUAL_REPORT='+report);
 await send('Browser.close').catch(()=>{});
}catch(e){console.error('VISUAL_QA_FAIL='+String(e));process.exitCode=1}finally{try{ws?.close()}catch{};try{child.kill()}catch{};try{rmSync(profile,{force:true,recursive:true})}catch(e){if(e.code==='EPERM')console.warn('QA_PROFILE_CLEANUP_PENDING '+profile);else throw e}}
