/* Independent Gecko WebDriver BiDi E2E for R201. No geckodriver or CDN.
   Requires isolated Firefox headless remote agent at 127.0.0.1:18856. */
import {writeFileSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const ws=new WebSocket('ws://127.0.0.1:18856/session');
await new Promise((resolve,reject)=>{ws.addEventListener('open',resolve,{once:true});ws.addEventListener('error',()=>reject(Error('Firefox BiDi connection failed')),{once:true})});
let count=0;const pending=new Map();
ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(!pending.has(m.id))return;const c=pending.get(m.id);pending.delete(m.id);m.type==='error'?c.reject(Error(m.error+': '+m.message)):c.resolve(m.result)});
const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++count;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}))});
const session=await send('session.new',{capabilities:{alwaysMatch:{}}});
const tree=await send('browsingContext.getTree',{maxDepth:0});const id=tree.contexts.find(c=>c.url.includes('/r201/'))?.context;
if(!id)throw Error('R201 Firefox browsing context not present');
async function evalJs(expression){
 const data=await send('script.evaluate',{expression:"JSON.stringify("+expression+")",target:{context:id},awaitPromise:false,resultOwnership:'none'});
 if(data.type!=='success'||data.result?.type!=='string')throw Error('BiDi script evaluation failed: '+JSON.stringify(data).slice(0,600));
 return JSON.parse(data.result.value);
}
let ready=false,detail=null;
for(let i=0;i<40;i++){
 await sleep(250);
 detail=await evalJs("(()=>{const e=document.querySelector('.core-r109-stage');return{ready:e?.dataset.coreReady||null,error:e?.dataset.coreError||null,gpuTier:e?.dataset.gpuTier||null,theatre:e?.dataset.theatreReady||null,canvas:document.querySelectorAll('canvas').length,viewport:[innerWidth,innerHeight],heading:!!document.querySelector('h1')}})()");
 if(detail.ready==='true'){ready=true;break;}
}
const screenshot=await send('browsingContext.captureScreenshot',{context:id,origin:'viewport'});
const file='r201-firefox-bidi-viewport.png';
if(screenshot.data)writeFileSync(join(root,file),Buffer.from(screenshot.data,'base64'));
const report={schema:'synestra.siteforge.r201.firefox-bidi.v1',status:ready?'PASS_RENDER':'FAIL_RENDER',browser:session.capabilities.browserName,version:session.capabilities.browserVersion,headless:session.capabilities['moz:headless'],detail,screenshot:file,notes:['Independent Gecko engine (not Chromium)','Software/headless GPU may differ from interactive hardware Firefox','No visual signoff or cross-device proof']};
writeFileSync(join(root,'evidence/SITEFORGE_R201_FIREFOX_BIDI_20261029.json'),JSON.stringify(report,null,2)+'\n');
console.log('FIREFOX_BIDI_RESULT',JSON.stringify(report));
await send('session.end',{}).catch(()=>{});
ws.close();
if(!ready)process.exitCode=2;
