// Repeatable, local-only rAF frame pacing probe. Indicative, not a GPU profiler or hardware FPS guarantee.
import {writeFileSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const pause=t=>new Promise(r=>setTimeout(r,t));
const pages=await(await fetch('http://127.0.0.1:18851/json')).json();
const page=pages.find(p=>p.type==='page');
if(!page?.webSocketDebuggerUrl)throw Error('Chrome CDP missing');
const ws=new WebSocket(page.webSocketDebuggerUrl);
await new Promise((ok,fail)=>{ws.addEventListener('open',ok,{once:true});ws.addEventListener('error',fail,{once:true})});
let id=0;const pending=new Map();
ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id&&pending.has(m.id)){const c=pending.get(m.id);pending.delete(m.id);m.error?c.reject(Error(JSON.stringify(m.error))):c.resolve(m.result)}});
const send=(method,params={})=>new Promise((resolve,reject)=>{const n=++id;pending.set(n,{resolve,reject});ws.send(JSON.stringify({id:n,method,params}))});
const evalJS=async expression=>{const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value};
await send('Page.enable');await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});
await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
const sampleExpression="new Promise(resolve=>{"+
"const samples=[];let start=null,last=null;"+
"const loop=(t)=>{if(start===null){start=t;last=t;}else{samples.push(t-last);last=t;}"+
"if(t-start<1900){requestAnimationFrame(loop);}else{const a=samples.slice().sort((x,y)=>x-y);"+
"const quantile=p=>a[Math.min(a.length-1,Math.floor(a.length*p))];"+
"resolve({n:a.length,elapsedMs:t-start,observedFps:Math.round(1000*a.length/(t-start)*10)/10,p50Ms:quantile(.5),p95Ms:quantile(.95),slowFrames30Ms:a.filter(x=>x>30).length});}};requestAnimationFrame(loop);})";
const results=[];
for(const route of ['r192/','r193/','r193/','r192/']){
 await send('Page.navigate',{url:'http://127.0.0.1:18850/'+route});
 for(let j=0;j<40;j++){await pause(100);if(await evalJS("Boolean(document.querySelector('.core-r108-stage[data-core-ready=true]'))"))break;}
 await pause(450);
 const result=await evalJS(sampleExpression);
 results.push({route,...result});
 console.log(route,JSON.stringify(result));
}
const payload={schema:'synestra.siteforge.r193.raf-pacing.v1',viewport:'1440x900',duration_each_ms:1900,environment:'same local headless Chromium, alternating order, indicative only',results};
writeFileSync(join(root,'evidence/SITEFORGE_R193_FLUIDITY_20261028.json'),JSON.stringify(payload,null,2)+'\n');
ws.close();