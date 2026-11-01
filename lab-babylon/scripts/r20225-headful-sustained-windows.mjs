import {createServer} from 'node:http';
import {readFileSync,writeFileSync,existsSync,mkdirSync,rmSync} from 'node:fs';
import {spawn,spawnSync} from 'node:child_process';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
const root='I:/_STUDIO_STAGING/SYN_LAB_R20225_VOLUMETRIC_OCCLUSION_20261101/lab-babylon';
const qa='I:/_STUDIO_STAGING/SYN_LAB_R20225_SUSTAINED_QA_20261101';
const expected='58ffa01ce8a7c22206b3a6b4795cf4c8c9d2d6e125a98940a64401a2f6e16ed2';
const hash=b=>createHash('sha256').update(b).digest('hex');
const real=hash(readFileSync(join(root,'dist/babylon-lab.js')));
if(real!==(process.argv.includes('--negative-sha')?'0000000000000000000000000000000000000000000000000000000000000000':expected)){
 console.error('BUNDLE_SHA_MISMATCH_FAIL_CLOSED',real);process.exit(46);
}
const sleep=ms=>new Promise(ok=>setTimeout(ok,ms));
const profile=join(qa,'isolated-owned-chrome-'+process.pid);
mkdirSync(profile,{recursive:true});
const assets=new Map([['/lab-babylon/','index.html'],['/lab-babylon/index.html','index.html'],['/lab-babylon/style.css','style.css'],['/lab-babylon/dist/babylon-lab.js','dist/babylon-lab.js']]);
const server=createServer((req,res)=>{
 const name=assets.get(new URL(req.url,'http://localhost').pathname);
 if(!name){res.writeHead(404);res.end('not found');return;}
 res.writeHead(200,{'Content-Type':name.endsWith('html')?'text/html':name.endsWith('css')?'text/css':'application/javascript','Cache-Control':'no-store'});
 res.end(readFileSync(join(root,name)));
});
await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
const origin='http://127.0.0.1:'+server.address().port+'/lab-babylon/';
const args=['--no-first-run','--disable-extensions','--no-default-browser-check','--use-gl=angle','--use-angle=d3d11','--enable-gpu','--window-size=1100,900','--window-position=100,100','--remote-debugging-port=0','--user-data-dir='+profile,origin];
const child=spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',args,{stdio:'ignore',windowsHide:true});
let ws=null,n=0;
const pending=new Map();
const rpc=(method,params={})=>new Promise((ok,no)=>{
 const id=++n,timer=setTimeout(()=>{pending.delete(id);no(Error('CDP_TIMEOUT_'+method))},16000);
 pending.set(id,{ok,no,timer});ws.send(JSON.stringify({id,method,params}));
});
const stateExpr="(()=>{const cv=document.getElementById('renderCanvas');const sc=globalThis.__synestraLabAtlasInterop?.getScene();const m=sc?.getMeshByName('central nucleus');return cv?{...cv.dataset,facets:m?.getTotalIndices()/3,vertices:m?.getTotalVertices(),canvas:document.querySelectorAll('canvas').length,visibility:document.visibilityState,width:innerWidth,height:innerHeight,dpr:devicePixelRatio,sceneMeshes:sc?.meshes.length}:null})()";
async function snapshot(){
 const r=await rpc('Runtime.evaluate',{expression:stateExpr,returnByValue:true});
 if(r.exceptionDetails)throw Error('JS_EVAL_FAILED');return r.result?.value;
}
const smi='C:/Windows/System32/nvidia-smi.exe';
function telemetry(){
 try{
  const p=spawnSync(smi,['--query-gpu=utilization.gpu,temperature.gpu,power.draw,memory.used','--format=csv,noheader,nounits'],{encoding:'utf8',timeout:3000,windowsHide:true});
  if(p.status!==0||!p.stdout) return {status:'MANQUANTE',reason:'NVIDIA_SMI_UNAVAILABLE'};
  const xs=p.stdout.trim().split(/\s*,\s*/).map(Number);
  if(xs.length!==4||xs.some(x=>!Number.isFinite(x)))return {status:'MANQUANTE',reason:'NVIDIA_SMI_INVALID'};
  return {status:'PASS',gpuPct:xs[0],tempC:xs[1],powerW:xs[2],vramMiB:xs[3]};
 }catch(e){return {status:'MANQUANTE',reason:String(e)}}
}
const runs=[];
async function run(quality,count){
 await rpc('Page.navigate',{url:origin+'?labFrame=6&qaQuality='+quality+'&qaPower=145'});
 let initial=null;for(let i=0;i<160;i++){
  try{initial=await snapshot()}catch{}
  if(initial?.sphereReady==='true'&&Number(initial.renderFrames)>=10)break;
  await sleep(150);
 }
 if(initial?.sphereReady!=='true')throw Error('NOT_READY_'+quality);
 if(!String(initial.glRenderer).includes('RTX 3090')||!String(initial.glRenderer).includes('D3D11')||initial.facets!==80||initial.vertices!==240||initial.canvas!==1||initial.visiblePlasmaField!=='1'||initial.visibility!=='visible'||initial.width!==1100||initial.height!==900||initial.dpr!==1)throw Error('CONTRACT_FAIL_'+quality+'_'+JSON.stringify(initial));
 const interval=quality==='ultra'?20:48;
 if(initial.geometryIntervalMs!==String(interval))throw Error('QUALITY_BUDGET_MISMATCH_'+quality+'_'+initial.geometryIntervalMs);
 await sleep(1200);
 let prev=await snapshot(),t=performance.now(),first=t,firstFrames=Number(prev.renderFrames),samples=[],gpu=[];
 for(let k=0;k<count;k++){
  await sleep(250);
  const now=performance.now(),cur=await snapshot(),dt=now-t,df=Number(cur.renderFrames)-Number(prev.renderFrames);
  if(!Number.isFinite(df)||df<0||dt<=0||cur.visibility!=='visible'||cur.canvas!==1||cur.facets!==80)throw Error('SUSTAINED_CONTRACT_FAIL_'+quality+'_'+k);
  samples.push(df*1000/dt);t=now;prev=cur;
  if(k%16===0){
   const met=telemetry();gpu.push(met);
   if(met.status==='PASS'&&met.tempC>=85)throw Error('GPU_HIGH_TEMPERATURE_CUTOFF_'+met.tempC);
  }
  if((k+1)%32===0)console.log('PROGRESS',quality,k+1+'/'+count,'FRAME_DELTA',Number(prev.renderFrames)-firstFrames,'GPU',JSON.stringify(gpu.at(-1)));
 }
 const frameDelta=Number(prev.renderFrames)-firstFrames,durationMs=t-first;
 const sorted=[...samples].sort((a,b)=>a-b);
 const r={quality,status:'PASS',durationMs,frameDelta,meanFps:frameDelta*1000/durationMs,p10Fps:sorted[Math.max(0,Math.ceil(.1*sorted.length)-1)],minFps:sorted[0],medianFps:sorted[Math.floor(sorted.length/2)],samples:count,gpu,renderer:initial.glRenderer,qualityBudgetMs:initial.geometryIntervalMs,facetCount:initial.facets,canvasCount:initial.canvas,visibility:initial.visibility};
 runs.push(r);console.log('CASE_PASS',quality,'FPS',r.meanFps,'P10',r.p10Fps,'DURATION_MS',r.durationMs);
}
try{
 let port=null;
 for(let i=0;i<100;i++){const f=join(profile,'DevToolsActivePort');if(existsSync(f)){port=Number(readFileSync(f,'utf8').split('\n')[0]);break;}await sleep(200)}
 if(!port)throw Error('NO_DEBUG_PORT');
 let page=null;for(let i=0;i<50;i++){const j=await(await fetch('http://127.0.0.1:'+port+'/json/list')).json();page=j.find(x=>x.type==='page'&&x.webSocketDebuggerUrl);if(page)break;await sleep(100)}
 if(!page)throw Error('NO_BROWSER_PAGE');
 ws=new WebSocket(page.webSocketDebuggerUrl);
 await new Promise((ok,no)=>{const timeout=setTimeout(()=>no(Error('WEBSOCKET_TIMEOUT')),8000);ws.addEventListener('open',()=>{clearTimeout(timeout);ok()},{once:true});ws.addEventListener('error',()=>{clearTimeout(timeout);no(Error('WEBSOCKET_ERROR'))},{once:true})});
 ws.addEventListener('message',e=>{const m=JSON.parse(e.data),p=pending.get(m.id);if(!p)return;pending.delete(m.id);clearTimeout(p.timer);if(m.error)p.no(Error('CDP_'+JSON.stringify(m.error)));else p.ok(m.result)});
 await rpc('Page.enable');await rpc('Runtime.enable');
 await rpc('Emulation.setDeviceMetricsOverride',{width:1100,height:900,deviceScaleFactor:1,mobile:false});
 await run('ultra',120);
 await run('economy',80);
 const report={status:'PASS',kind:'real headful Chrome R202.25 candidate GPU RTX3090 D3D11; no hosted E2E',sourceSha:'cde9659449c44a6fe7d3641122faddc4df51e94f',bundleSha256:expected,order:'Ultra 30s then Economy 20s',runs,limitations:['GPU host load not isolated','True low-tier GPU not tested','50 seconds total, not a long thermal stress test','Browser actual foreground focus not independently attested']};
 const path=join(qa,'R20225_HEADFUL_SUSTAINED_GPU_20261101.json');writeFileSync(path,JSON.stringify(report,null,2));
 console.log('SUSTAINED_GPU_PASS',path,'SHA256',hash(readFileSync(path)));
}catch(e){console.error('SUSTAINED_GPU_FAIL',String(e.stack||e));process.exitCode=1}
finally{
 if(ws){try{await Promise.race([rpc('Browser.close'),sleep(1200)])}catch{}try{ws.close()}catch{}}
 try{child.kill()}catch{}
 await new Promise(ok=>server.close(ok));await sleep(500);
 try{rmSync(profile,{recursive:true,force:true});console.log('TEMP_PROFILE_CLEANED')}catch(e){console.log('TEMP_PROFILE_CLEANUP_PARTIAL',String(e))}
}