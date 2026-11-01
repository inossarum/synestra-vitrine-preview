import {createServer} from 'node:http';
import {readFileSync,writeFileSync,mkdirSync,existsSync,rmSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {join} from 'node:path';
import {spawn} from 'node:child_process';
const root='I:/_STUDIO_STAGING';
const targets={
 base:{root:join(root,'SYN_LAB_R20224_DEPTH_COMPOSITE_20261101/lab-babylon'),sha:'ffd1326751e6ecbbe2fd997d25a00a8eb5d2bd7efbb36c5f52875e7a50e628da'},
 candidate:{root:join(root,'SYN_LAB_R20225_VOLUMETRIC_OCCLUSION_20261101/lab-babylon'),sha:'58ffa01ce8a7c22206b3a6b4795cf4c8c9d2d6e125a98940a64401a2f6e16ed2'}
};
const sha=b=>createHash('sha256').update(b).digest('hex');
for(const [label,t] of Object.entries(targets)){
 const a=sha(readFileSync(join(t.root,'dist/babylon-lab.js')));
 if(a!==t.sha)throw Error('BUNDLE_FAIL_CLOSED_'+label+'_'+a);
}
const evidence='I:/_STUDIO_STAGING/SYN_LAB_R20225_PERF_QA_20261101';
const profile=join(evidence,'chrome-perf-owned-'+process.pid);
mkdirSync(profile,{recursive:true});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const assets=new Map([['','index.html'],['index.html','index.html'],['style.css','style.css'],['dist/babylon-lab.js','dist/babylon-lab.js']]);
const server=createServer((req,res)=>{
 const p=new URL(req.url,'http://127.0.0.1').pathname;
 const m=/^\/(base|candidate)\/(.*)$/.exec(p);
 if(!m||!assets.has(m[2])){res.writeHead(404);res.end();return;}
 const file=assets.get(m[2]);res.writeHead(200,{'Content-Type':file.endsWith('html')?'text/html':file.endsWith('css')?'text/css':'application/javascript','Cache-Control':'no-store'});
 res.end(readFileSync(join(targets[m[1]].root,file)));
});
await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
const port=server.address().port;
const url='http://127.0.0.1:'+port+'/base/?labFrame=6&qaQuality=ultra&qaPower=145';
const args=['--headless=new','--no-first-run','--disable-extensions','--no-default-browser-check','--use-gl=angle','--use-angle=d3d11','--enable-gpu','--disable-dev-shm-usage','--window-size=1100,900','--remote-debugging-port=0','--user-data-dir='+profile,url];
const browser=spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',args,{stdio:'ignore',windowsHide:true});
let ws=null,seq=0;const pending=new Map(),runs=[];
const rpc=(method,params={})=>new Promise((ok,no)=>{const id=++seq,timer=setTimeout(()=>{pending.delete(id);no(Error('CDP_TIMEOUT_'+method));},18000);pending.set(id,{ok,no,timer});ws.send(JSON.stringify({id,method,params}));});
const stateExpr="(()=>{const cv=document.getElementById('renderCanvas');const s=globalThis.__synestraLabAtlasInterop?.getScene();const m=s?.getMeshByName('central nucleus');return cv?{...cv.dataset,facets:m?.getTotalIndices()/3,vertices:m?.getTotalVertices(),canvas:document.querySelectorAll('canvas').length,visibility:document.visibilityState,width:innerWidth,height:innerHeight,dpr:devicePixelRatio}:null})()";
async function snapshot(){const r=await rpc('Runtime.evaluate',{expression:stateExpr,returnByValue:true});if(r.exceptionDetails)throw Error('BROWSER_STATE_EXCEPTION');return r.result?.value;}
function percentile(vals,q){const a=[...vals].sort((x,y)=>x-y);return a[Math.max(0,Math.ceil(q*a.length)-1)];}
async function measure(label,ordinal){
 await rpc('Page.navigate',{url:'http://127.0.0.1:'+port+'/'+label+'/?labFrame=6&qaQuality=ultra&qaPower=145'});
 let state=null;for(let i=0;i<160;i++){try{state=await snapshot()}catch{}if(state?.sphereReady==='true'&&Number(state.renderFrames)>=10)break;await sleep(125);}
 if(state?.sphereReady!=='true')throw Error('SCENE_NOT_READY_'+label);
 if(!String(state.glRenderer).includes('RTX 3090')||!String(state.glRenderer).includes('D3D11'))throw Error('NOT_REAL_GPU_'+JSON.stringify(state));
 if(state.canvas!==1||state.facets!==80||state.vertices!==240||state.visiblePlasmaField!=='1'||state.width!==1100||state.height!==900||state.dpr!==1)throw Error('SCENE_CONTRACT_'+JSON.stringify(state));
 await sleep(1200);
 let prev=await snapshot(),t=performance.now(),initial=t,firstFrames=Number(prev.renderFrames);const samples=[];
 for(let i=0;i<24;i++){await sleep(250);const now=performance.now(),cur=await snapshot(),dt=now-t,frames=Number(cur.renderFrames)-Number(prev.renderFrames);if(!Number.isFinite(frames)||frames<0||dt<=0)throw Error('BAD_FRAME_COUNTER');samples.push(frames*1000/dt);t=now;prev=cur;}
 const durationMs=t-initial,frameDelta=Number(prev.renderFrames)-firstFrames;
 const result={label,ordinal,frameDelta,durationMs,measuredFps:frameDelta*1000/durationMs,sampleP10:percentile(samples,.1),sampleMedian:percentile(samples,.5),sampleMin:Math.min(...samples),samples:samples.length,renderer:state.glRenderer,canvasCount:state.canvas,facets:state.facets,vertices:state.vertices,visibility:state.visibility,viewport:'1100x900@DPR1',power:145};
 console.log('RUN_PASS',JSON.stringify({label,ordinal,fps:result.measuredFps,p10:result.sampleP10,frames:frameDelta}));return result;
}
try{
 let devport=null;for(let i=0;i<130;i++){const f=join(profile,'DevToolsActivePort');if(existsSync(f)){devport=Number(readFileSync(f,'utf8').split('\n')[0]);break;}await sleep(200);}
 if(!devport)throw Error('NO_CHROME_CDP_PORT');
 let page=null;for(let i=0;i<45;i++){const j=await(await fetch('http://127.0.0.1:'+devport+'/json/list')).json();page=j.find(x=>x.type==='page'&&x.webSocketDebuggerUrl);if(page)break;await sleep(150);}
 if(!page)throw Error('NO_CDP_PAGE');
 ws=new WebSocket(page.webSocketDebuggerUrl);
 await new Promise((ok,no)=>{let t=setTimeout(()=>no(Error('CDP_WS_TIMEOUT')),7000);ws.addEventListener('open',()=>{clearTimeout(t);ok()},{once:true});ws.addEventListener('error',()=>{clearTimeout(t);no(Error('CDP_WS_ERROR'))},{once:true});});
 ws.addEventListener('message',e=>{const m=JSON.parse(e.data),p=pending.get(m.id);if(!p)return;pending.delete(m.id);clearTimeout(p.timer);if(m.error)p.no(Error('CDP_'+JSON.stringify(m.error)));else p.ok(m.result);});
 await rpc('Page.enable');await rpc('Runtime.enable');
 await rpc('Emulation.setDeviceMetricsOverride',{width:1100,height:900,deviceScaleFactor:1,mobile:false});
 for(const [i,label] of ['base','candidate','candidate','base'].entries())runs.push(await measure(label,i+1));
 const avg=label=>runs.filter(r=>r.label===label).reduce((a,r)=>a+r.measuredFps,0)/2;
 const base=avg('base'),candidate=avg('candidate');
 const report={status:'PASS_MEASURED',scope:'headless Chrome PC RTX3090 ANGLE D3D11 on local loopback; not headful user FPS SLA',
  source:{baseline:'R20224 edabe06b16d1e36548b34f80a0450f8be9017a33',candidate:'R20225 cde9659449c44a6fe7d3641122faddc4df51e94f'},
  bundles:{baseline:targets.base.sha,candidate:targets.candidate.sha},warmupMs:1200,nominalMeasurementMs:6000,order:'ABBA',runs,
  aggregate:{baseMeanFps:base,candidateMeanFps:candidate,relativePercent:(candidate/base-1)*100},
  limitations:['Host GPU load not controlled','Four short windows','Headless benchmark','No sustained thermal stability claim','No physical low-tier GPU qualification']};
 const file=join(evidence,'R20225_R20224_ABBA_GPU_PERF_20261101.json');
 writeFileSync(file,JSON.stringify(report,null,2));
 console.log('BENCHMARK_PASS',JSON.stringify(report.aggregate),'REPORT_SHA256',sha(readFileSync(file)));
}catch(e){process.exitCode=1;console.error('BENCHMARK_FAIL',String(e.stack||e))}
finally{
 if(ws){try{await Promise.race([rpc('Browser.close'),sleep(1100)])}catch{}try{ws.close()}catch{}}
 try{browser.kill()}catch{}
 await new Promise(ok=>server.close(ok));
 await sleep(300);
 try{rmSync(profile,{recursive:true,force:true});console.log('TEMP_PROFILE_CLEANED')}catch(e){console.log('TEMP_PROFILE_CLEANUP_PARTIAL',String(e))}
}