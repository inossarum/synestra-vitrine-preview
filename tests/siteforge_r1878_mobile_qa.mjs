import {spawn} from 'node:child_process';
import {existsSync,readFileSync,writeFileSync,mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {decodePNG,comparePngPixels} from './siteforge_r174_png_diff.mjs';
const chrome='C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const profile=mkdtempSync(join(tmpdir(),'syn-r1877-'));
const url='http://127.0.0.1:19098/siteforge-r1878-autonome.html?demo=energy';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const child=spawn(chrome,['--headless=new','--enable-unsafe-swiftshader','--use-angle=swiftshader','--disable-extensions','--disable-background-networking','--no-first-run','--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{stdio:'ignore',windowsHide:true});
let ws,closed=false;
try{
 const portFile=join(profile,'DevToolsActivePort');
 for(let i=0;i<100&&!existsSync(portFile);i++)await sleep(120);
 if(!existsSync(portFile))throw Error('CHROME_START_FAILED');
 const port=Number(readFileSync(portFile,'utf8').split(/\r?\n/)[0]);
 const pages=await(await fetch('http://127.0.0.1:'+port+'/json/list')).json();
 const page=pages.find(p=>p.type==='page'&&p.webSocketDebuggerUrl);
 if(!page)throw Error('NO_CDP_PAGE');
 ws=new WebSocket(page.webSocketDebuggerUrl);
 await new Promise((resolve,reject)=>{ws.addEventListener('open',resolve,{once:true});ws.addEventListener('error',reject,{once:true})});
 let id=0;const pending=new Map();
 ws.addEventListener('message',event=>{let x;try{x=JSON.parse(event.data)}catch{return}const q=pending.get(x.id);if(q){pending.delete(x.id);x.error?q.reject(Error(JSON.stringify(x.error))):q.resolve(x.result)}});
 const call=(method,params={})=>new Promise((resolve,reject)=>{const n=++id;pending.set(n,{resolve,reject});ws.send(JSON.stringify({id:n,method,params}));setTimeout(()=>{if(pending.has(n)){pending.delete(n);reject(Error('CDP_TIMEOUT '+method))}},15000)});
 const evalValue=async expression=>(await call('Runtime.evaluate',{expression,returnByValue:true})).result.value;
 await call('Page.enable');await call('Runtime.enable');
 await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
 await call('Page.navigate',{url});await sleep(9000);
 const details=JSON.parse(await evalValue("JSON.stringify((()=>{const s=document.querySelector('.core-r109-stage'),g=document.querySelector('canvas').getContext('webgl'),w=document.getElementById('sf-flowStructure'),sphere=document.getElementById('sf-diameter');return {ready:s.dataset.coreReady,flow:document.getElementById('sf-flowType').value,glError:g.getError(),slider:{min:w.min,max:w.max,value:w.value},sphereValue:sphere.value,controls:document.querySelectorAll('[data-sphere-control]').length}})())"));
 console.log('R1878_READY',JSON.stringify(details));
 if(details.ready!=='true'||details.flow!=='6'||details.glError!==0||details.slider.min!=='30'||details.slider.max!=='250'||details.controls!==18)throw Error('INITIAL_CONTRACT_FAIL');
 await evalValue("(()=>{const e=document.getElementById('sf-particleSpeed');e.value='0';e.dispatchEvent(new Event('input',{bubbles:true}))})()");
 const rect=JSON.parse(await evalValue("JSON.stringify((()=>{const r=document.querySelector('.core-r109-stage').getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,scale:1}})())"));
 const stats=b=>{
  const im=decodePNG(b);let luminous=0,hot=0,energySum=0;const {pixels:wPix,bpp}=im;
  for(let i=0;i<im.w*im.h;i++){
   const j=i*bpp,r=wPix[j],g=wPix[j+1],b=wPix[j+2],max=Math.max(r,g,b),min=Math.min(r,g,b),c=max-min;
   if(max>91&&c>30)luminous++;
   if(max>146&&c>35)hot++;
   energySum+=Math.max(0,max-60)*Math.max(0,c-18);
  }
  return {w:im.w,h:im.h,luminous,hot,energySum:Math.round(energySum)};
 };
 const captures={};
 for(const value of [30,100,250]){
  await evalValue("(()=>{const x=document.getElementById('sf-flowStructure');x.value='"+value+"';x.dispatchEvent(new Event('input',{bubbles:true}))})()");
  await sleep(1250);
  const current=JSON.parse(await evalValue("JSON.stringify((()=>{const w=document.getElementById('sf-flowStructure'),s=document.querySelector('.core-r109-stage');return {value:w.value,output:document.querySelector('[data-sphere-value=\"flowStructure\"]').textContent.trim(),sphere:document.getElementById('sf-diameter').value,spin:s.dataset.syncedSpinPhase,glError:document.querySelector('canvas').getContext('webgl').getError()}})())"));
  if(current.value!==String(value)||current.sphere!=='100'||current.glError!==0)throw Error('VALUE_NOT_APPLIED '+JSON.stringify(current));
  const shot=Buffer.from((await call('Page.captureScreenshot',{format:'png',clip:rect,captureBeyondViewport:false})).data,'base64');
  writeFileSync(join(root,'evidence/r1878-mobile-diameter-'+value+'.png'),shot);
  captures[value]={...current,...stats(shot),image:shot};
  console.log('R1878_DIAMETER_STATE',JSON.stringify({diameter:value,...current,stats:stats(shot)}));
 }
 const low=captures[30],mid=captures[100],high=captures[250];
 const diff=comparePngPixels(low.image,high.image);
 console.log('R1878_LOW_HIGH_DIFF',JSON.stringify(diff));
 if(low.luminous<130||mid.luminous<200||high.luminous<300)throw Error('FLOW_INVISIBLE_AT_DIAMETER');
 if(!(low.luminous<mid.luminous&&mid.luminous<high.luminous))throw Error('DIAMETER_NOT_MONOTONIC '+JSON.stringify([low.luminous,mid.luminous,high.luminous]));
 if(!(high.luminous>low.luminous*1.30&&diff.changed>2500))throw Error('DIAMETER_VISUAL_RESPONSE_TOO_WEAK');
 if(low.spin!==mid.spin||mid.spin!==high.spin)throw Error('GLOBAL_ROTATION_MOVED');
 const report={ready:details,states:Object.fromEntries([30,100,250].map(k=>[k,Object.fromEntries(Object.entries(captures[k]).filter(([key])=>key!=='image'))])),diff,monotonic:true,passed:true,engine:'Chrome Windows mobile emulation WebGL SwiftShader'};
 writeFileSync(join(root,'evidence/SITEFORGE_R1878_DIAMETER_MOBILE_CHROME_20261028.json'),JSON.stringify(report,null,2)+'\n');
 console.log('R1878_DIAMETER_LIVE_BROWSER_PASS');

 // R187.8: verify actual count 3/5/8, spacing, pulse controls, legacy import and export.
 const change=(id,value)=>"(()=>{const n=document.getElementById('"+id+"');n.value='"+value+"';n.dispatchEvent(new Event('input',{bubbles:true}));return n.value})()";
 await evalValue(change('sf-flowStructure',100));
 await evalValue(change('sf-pulseSpeed',0));
 await evalValue(change('sf-flowSpread',100));
 await evalValue(change('sf-pulseIntensity',100));
 const countShots={};
 for(const count of [3,5,8]){
   await evalValue(change('sf-flowCount',count));
   await sleep(1500);
   const state=JSON.parse(await evalValue("JSON.stringify((()=>{const s=document.querySelector('.core-r109-stage');return {count:document.getElementById('sf-flowCount').value,diameter:document.getElementById('sf-flowStructure').value,spacing:document.getElementById('sf-flowSpread').value,spin:s.dataset.syncedSpinPhase,webgl:s.querySelector('canvas').getContext('webgl').getError(),flow:document.getElementById('sf-flowType').value}})())"));
   if(state.count!==String(count)||state.diameter!=='100'||state.webgl!==0||state.flow!=='6')throw Error('FLOW_COUNT_UI_FAIL '+JSON.stringify(state));
   const shot=Buffer.from((await call('Page.captureScreenshot',{format:'png',clip:rect,captureBeyondViewport:false})).data,'base64');
   writeFileSync(join(root,'evidence/r1878-mobile-flows-'+count+'.png'),shot);
   countShots[count]={shot,state,statistics:stats(shot)};
   console.log('R1878_FLOW_COUNT',JSON.stringify({count,state,statistics:stats(shot)}));
 }
 const countDiff=comparePngPixels(countShots[3].shot,countShots[8].shot);
 console.log('R1878_COUNT_VARIATION',JSON.stringify(countDiff));
 if(countDiff.changed<2000)throw Error('FLOW_COUNT_NOT_VISUALLY_DIFFERENT');
 if(countShots[3].state.spin!==countShots[8].state.spin)throw Error('SPIN_MOVED_IN_COMPARISON');
 await evalValue(change('sf-flowCount',5));
 const spreadShots={};
 for(const spread of [70,130]){
  await evalValue(change('sf-flowSpread',spread));await sleep(1350);
  spreadShots[spread]=Buffer.from((await call('Page.captureScreenshot',{format:'png',clip:rect,captureBeyondViewport:false})).data,'base64');
  writeFileSync(join(root,'evidence/r1878-mobile-spread-'+spread+'.png'),spreadShots[spread]);
 }
 const spreadDiff=comparePngPixels(spreadShots[70],spreadShots[130]);
 if(spreadDiff.changed<2000)throw Error('SPACING_NOT_VISUALLY_DIFFERENT');
 console.log('R1878_SPACING_VARIATION',JSON.stringify(spreadDiff));
 await evalValue(change('sf-flowSpread',100));
 const pulseStates=[];
 for(const [speed,intensity] of [[0,0],[100,100],[250,200]]){
  await evalValue(change('sf-pulseSpeed',speed));await evalValue(change('sf-pulseIntensity',intensity));
  await sleep(450);
  const p=JSON.parse(await evalValue("JSON.stringify((()=>({speed:document.getElementById('sf-pulseSpeed').value,intensity:document.getElementById('sf-pulseIntensity').value,glError:document.querySelector('canvas').getContext('webgl').getError(),diameter:document.getElementById('sf-flowStructure').value}))())"));
  if(p.speed!==String(speed)||p.intensity!==String(intensity)||p.glError!==0||p.diameter!=='100')throw Error('PULSE_CONTROL_FAIL '+JSON.stringify(p));
  pulseStates.push(p);
 }
 // Export a real file via the UI; read the new optional energyFlow sibling.
 await evalValue("(()=>{const original=URL.createObjectURL.bind(URL);URL.createObjectURL=(blob)=>{blob.text().then(t=>window.__r1878Export=t);return original(blob)};document.querySelector('[data-export-json]').click()})()");
 await sleep(550);
 const exportedText=await evalValue("window.__r1878Export||''");
 const exported=JSON.parse(exportedText);
 if(Object.keys(exported.parameters).length!==18||Object.keys(exported.motes).length!==11||
   exported.energyFlow.count!==5||exported.energyFlow.spread!==100||
   exported.energyFlow.pulseSpeed!==250||exported.energyFlow.pulseIntensity!==200)throw Error('EXPORT_CONTRACT_FAIL');
 // Import an R187.7 file with no energyFlow; new controls return to defaults.
 const legacy={...exported};delete legacy.energyFlow;
 await evalValue("(()=>{const file=new File(["+JSON.stringify(JSON.stringify(legacy))+"],'legacy.json',{type:'application/json'});const dt=new DataTransfer();dt.items.add(file);const input=document.querySelector('[data-import-file]');input.files=dt.files;input.dispatchEvent(new Event('change',{bubbles:true}))})()");
 await sleep(450);
 const imported=JSON.parse(await evalValue("JSON.stringify((()=>({values:[...document.querySelectorAll('[data-flow-control]')].map(e=>[e.dataset.flowControl,e.value]),status:document.querySelector('[data-import-status]').textContent}))())"));
 if(!imported.status.includes('import')&&!imported.status.includes('Import'))throw Error('LEGACY_IMPORT_FAIL '+JSON.stringify(imported));
 const val=Object.fromEntries(imported.values);
 if(val.count!=='5'||val.spread!=='100'||val.pulseSpeed!=='100'||val.pulseIntensity!=='100')throw Error('LEGACY_DEFAULTS_FAIL '+JSON.stringify(val));
 // Rejected import must not mutate any current control: atomic validation.
 const invalid={...exported,energyFlow:{...exported.energyFlow,count:99}};
 await evalValue("(()=>{const file=new File(["+JSON.stringify(JSON.stringify(invalid))+"],'invalid.json',{type:'application/json'});const dt=new DataTransfer();dt.items.add(file);const input=document.querySelector('[data-import-file]');input.files=dt.files;input.dispatchEvent(new Event('change',{bubbles:true}))})()");
 await sleep(400);
 const rejected=JSON.parse(await evalValue("JSON.stringify({count:document.getElementById('sf-flowCount').value,status:document.querySelector('[data-import-status]').textContent})"));
 if(rejected.count!=='5'||!rejected.status.includes('refus'))throw Error('INVALID_IMPORT_NOT_ATOMIC '+JSON.stringify(rejected));
 console.log('R1878_JSON_E2E_PASS',JSON.stringify({parameters:18,motes:11,energyFlow:exported.energyFlow,imported,rejected}));
 const flowReport={countDiff,spreadDiff,counts:Object.fromEntries([3,5,8].map(n=>[n,{state:countShots[n].state,statistics:countShots[n].statistics}])),pulseStates,json:{exportKeys:Object.keys(exported),legacyDefaults:val,rejected},passed:true};
 writeFileSync(join(root,'evidence/SITEFORGE_R1878_LIVE_CONTROLS_MOBILE_20261028.json'),JSON.stringify(flowReport,null,2)+'\n');
 console.log('R1878_LIVE_CONTROLS_E2E_PASS');
 await call('Browser.close');closed=true;
}catch(e){console.error('R1878_DIAMETER_BROWSER_FAIL',String(e));process.exitCode=1}
finally{
 try{ws?.close()}catch{}
 if(!closed&&child.exitCode===null)try{child.kill()}catch{}
 await Promise.race([new Promise(r=>child.once('exit',r)),sleep(1000)]);
 try{rmSync(profile,{recursive:true,force:true,maxRetries:5,retryDelay:100})}catch{}
}
