/* R201 non-invasive GPU diagnostic, intercept existing context only. */
import {writeFileSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
const root=join(dirname(fileURLToPath(import.meta.url)),'..'),sleep=ms=>new Promise(r=>setTimeout(r,ms));
const tabs=await(await fetch('http://127.0.0.1:18851/json')).json();
const tab=tabs.find(x=>x.type==='page');assert.ok(tab?.webSocketDebuggerUrl);
const ws=new WebSocket(tab.webSocketDebuggerUrl);
await new Promise((resolve,reject)=>{ws.addEventListener('open',resolve,{once:true});ws.addEventListener('error',reject,{once:true})});
let id=0;const q=new Map(),errors=[],results=[];
ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails?.text||'exception');if(q.has(m.id)){const v=q.get(m.id);q.delete(m.id);m.error?v.reject(Error(JSON.stringify(m.error))):v.resolve(m.result)}});
const send=(method,params={})=>new Promise((resolve,reject)=>{const n=++id;q.set(n,{resolve,reject});ws.send(JSON.stringify({id:n,method,params}))});
const value=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
await send('Page.enable');await send('Runtime.enable');
await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
await send('Page.addScriptToEvaluateOnNewDocument',{source:"(()=>{const orig=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){const gl=orig.call(this,type,...args);if(gl&&['webgl','webgl2','experimental-webgl'].includes(type))window.__synGPUContext=gl;return gl;};})();"});
const expression="(()=>{const e=document.querySelector('.core-r109-stage'),gl=window.__synGPUContext,ext=gl?.getExtension('WEBGL_debug_renderer_info');return{ready:e.dataset.coreReady,theatre:e.dataset.theatreReady,gpuTier:e.dataset.gpuTier,fps:Number(e.dataset.coreFps),quality:Number(e.dataset.coreQuality),vendor:ext?gl.getParameter(ext.UNMASKED_VENDOR_WEBGL):null,renderer:ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):null,glVendor:gl?gl.getParameter(gl.VENDOR):null,glVersion:gl?gl.getParameter(gl.VERSION):null,glContextCaptured:!!gl,canvases:document.querySelectorAll('canvas').length,buffer:[e.querySelector('canvas').width,e.querySelector('canvas').height]};})()";
for(const width of [1440,390]){
 await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width===390});
 await send('Page.navigate',{url:'http://127.0.0.1:18852/r201/'});
 let ready=false;
 for(let i=0;i<80;i++){await sleep(130);ready=await value("document.querySelector('.core-r109-stage')?.dataset.coreReady==='true'");if(ready)break;}
 assert.ok(ready,'no ready R201 '+width);await sleep(3000);
 const s=await value(expression);assert.equal(s.canvases,1);assert.ok(s.fps>0);
 results.push({width,...s});console.log('R201_GPU_SAMPLE',JSON.stringify({width,...s}));
}
const report={schema:'synestra.siteforge.r201.gpu-diagnostic.v1',status:'PASS_DIAGNOSTIC',results,exceptions:errors,notes:['Observes WebGL context already used by renderer; no additional context created.','CDP Chrome frame counter is indicative, not independently calibrated hardware FPS.','Unmasked renderer must be checked before labeling this hardware accelerated.','No independent Firefox result or visual approval.']};
writeFileSync(join(root,'evidence/SITEFORGE_R201_GPU_DIAGNOSTIC_20261029.json'),JSON.stringify(report,null,2)+'\n');
console.log('R201_GPU_DIAGNOSTIC_COMPLETE',results.length);
ws.close();