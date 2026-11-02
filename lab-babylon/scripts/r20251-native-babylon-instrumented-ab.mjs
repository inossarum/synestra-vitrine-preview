import {readFileSync,writeFileSync,existsSync,mkdirSync} from 'node:fs';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
import {createServer} from 'node:http';
import {spawn} from 'node:child_process';
const root=process.env.SYNESTRA_STAGING_ROOT||'I:\\_STUDIO_STAGING';
const chrome=process.env.R202_CHROME_BIN||'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const variant=process.env.R202_AB_VARIANT;
if(!['base','candidate'].includes(variant))throw Error('REQUIRE_R202_AB_VARIANT');
const qa=join(root,'SYN_LAB_R20251_NATIVE_BABYLON_INSTRUMENTED_QA_20261102');
const source=variant==='base'?join(root,'SYN_LAB_R20249_HPSYN_REPLAY_20261102','lab-babylon'):join(qa,'instrumented');
const provenance=JSON.parse(readFileSync(join(qa,'bundle-instrumentation.json'),'utf8'));
const sha=x=>createHash('sha256').update(x).digest('hex');
const js=readFileSync(join(source,'dist','babylon-lab.js'));
if(sha(js)!==(variant==='base'?provenance.baseline_bundle_sha256:provenance.patched_bundle_sha256))throw Error('SHA_SOURCE_MISMATCH');
const out=join(qa,'run-'+variant+'-'+Date.now()+'-'+process.pid);mkdirSync(out,{recursive:true});
const report={schema:'synestra.r20251.native-babylon-instrumented-cdp.v1',variant,scope:'real Babylon engine on precompiled R20249 bundle with verified shader changes; NOT a fresh candidate build',source_bundle_sha256:sha(js),source_tree:provenance.candidate_tree,results:[]};
const sleep=ms=>new Promise(ok=>setTimeout(ok,ms));
const allow=new Set(['index.html','style.css','dist/babylon-lab.js']);
const server=createServer((req,res)=>{
 const pathname=new URL(req.url,'http://localhost').pathname;
 const match=pathname.match(/^\/base\/lab-babylon\/(.*)$/);
 if(!match){res.writeHead(404);res.end();return}
 const file=match[1]||'index.html';
 if(!allow.has(file)){res.writeHead(404);res.end();return}
 const type=file.endsWith('.html')?'text/html':file.endsWith('.css')?'text/css':'application/javascript';
 const bytes=readFileSync(join(source,file));
 res.writeHead(200,{'Content-Type':type,'Cache-Control':'no-store','X-Synestra-Bundle':variant});res.end(bytes);
});
let ws,proc,port,portfile;
try {
 await new Promise((ok,no)=>{server.once('error',no);server.listen(0,'127.0.0.1',ok)});
 const profile=join(out,'chrome-owned');portfile=join(profile,'DevToolsActivePort');
 proc=spawn(chrome,['--headless=new','--no-first-run','--disable-extensions','--disable-background-networking','--remote-debugging-port=0','--user-data-dir='+profile,'--enable-webgl','--use-gl=angle','--use-angle=d3d11','--window-size=1100,900','about:blank'],{windowsHide:true,stdio:'ignore'});
 for(let i=0;i<100&&!existsSync(portfile);i++)await sleep(200);
 if(!existsSync(portfile))throw Error('CDP_PORT_MISSING');
 port=Number(readFileSync(portfile,'utf8').trim().split(/\r?\n/)[0]);
 const tabs=await(await fetch('http://127.0.0.1:'+port+'/json/list')).json();
 const tab=tabs.find(x=>x.type==='page');if(!tab)throw Error('NO_CDP_TAB');
 ws=new WebSocket(tab.webSocketDebuggerUrl);await new Promise((ok,no)=>{ws.onopen=ok;ws.onerror=no});
 let id=0;const pending=new Map();
 ws.onmessage=e=>{let r;try{r=JSON.parse(e.data)}catch{return}const p=pending.get(r.id);if(!p)return;pending.delete(r.id);r.error?p.reject(Error(JSON.stringify(r.error))):p.resolve(r.result)};
 const send=(method,params={})=>new Promise((resolve,reject)=>{const i=++id;pending.set(i,{resolve,reject});ws.send(JSON.stringify({id:i,method,params}));setTimeout(()=>{if(pending.has(i)){pending.delete(i);reject(Error('CDP_TIMEOUT_'+method))}},15000)});
 await send('Page.enable');await send('Runtime.enable');
 await send('Emulation.setDeviceMetricsOverride',{width:1100,height:900,deviceScaleFactor:1,mobile:false});
 const inspect="(()=>{const cv=document.querySelector('canvas');const s=globalThis.__synestraLabAtlasInterop?.getScene?.();const e=s?.getEngine?.();const gl=e?._gl;const x=gl?.getExtension?.('WEBGL_debug_renderer_info');const renderer=x?gl.getParameter(x.UNMASKED_RENDERER_WEBGL):gl?.getParameter?.(gl.RENDERER)||null;const ico=s?.meshes?.find(m=>m.name==='central nucleus');const volume=s?.meshes?.find(m=>m.name==='r20215-volume-carrier');return {ready:cv?.dataset.sphereReady||null,facet:cv?.dataset.facetDepthActive||null,renderer,canvas_count:document.querySelectorAll('canvas').length,mesh_count:s?.meshes?.length||0,scene:!!s,ico:!!ico,ico_indices:ico?.getTotalIndices?.()||0,ico_vertices:ico?.getTotalVertices?.()||0,volume:!!volume,volume_enabled:volume?.isEnabled?.()||false,glow_count:s?.effectLayers?.length||0}})()";
 for(const [frame,power] of [[6,145],[18,145],[6,0]]){
  const name=variant+'-frame'+frame+'-power'+power;
  const url='http://127.0.0.1:'+server.address().port+'/base/lab-babylon/?labFrame='+frame+'&qaQuality=ultra&qaPower='+power;
  await send('Page.navigate',{url});
  let s;
  for(let k=0;k<120;k++){
   await sleep(200);
   const r=await send('Runtime.evaluate',{expression:inspect,returnByValue:true});
   s=r.result?.value;
   if(s?.ready==='true'&&(power===0?s.facet==='false':s.facet==='true'))break;
  }
  if(s?.ready!=='true'||(power===0?s.facet!=='false':s.facet!=='true'))throw Error('READINESS_'+name+'_'+JSON.stringify(s));
  if(power===0&&s.volume_enabled)throw Error('ZERO_POWER_VOLUME_STILL_ENABLED_'+name);
  if(!s.scene||!s.ico||!s.volume||s.canvas_count!==1)throw Error('ENGINE_INVARIANTS_'+name+'_'+JSON.stringify(s));
  if(!s.renderer?.includes('NVIDIA GeForce RTX 3090'))throw Error('GPU_DEVICE_'+name+'_'+s.renderer);
  await sleep(420);
  const screenshot=await send('Page.captureScreenshot',{format:'png',fromSurface:true,captureBeyondViewport:false});
  const bytes=Buffer.from(screenshot.data,'base64');
  if(bytes.length<10000||bytes.subarray(0,8).toString('hex')!=='89504e470d0a1a0a')throw Error('PNG_INVALID_'+name);
  const file=name+'.png';writeFileSync(join(out,file),bytes);
  report.results.push({...s,name,frame,power,file,bytes:bytes.length,sha256:sha(bytes)});
  console.log('NATIVE_BABYLON_CAPTURE '+name+' '+JSON.stringify({mesh_count:s.mesh_count,ico_indices:s.ico_indices,ico_vertices:s.ico_vertices,renderer:s.renderer,bytes:bytes.length}));
 }
 report.status='PASS';
}catch(err){report.status='FAIL';report.error=String(err);process.exitCode=2;console.error('NATIVE_BABYLON_FAILED '+String(err))}
finally{
 writeFileSync(join(out,'native-babylon-results.json'),JSON.stringify(report,null,2));
 console.log('NATIVE_BABYLON_STATUS '+report.status+' variant='+variant+' folder='+out);
 if(port&&portfile&&existsSync(portfile))try{
  const endpoint=readFileSync(portfile,'utf8').trim().split(/\r?\n/)[1];
  const c=new WebSocket('ws://127.0.0.1:'+port+endpoint);
  await new Promise((ok,no)=>{c.onopen=ok;c.onerror=no});
  c.send(JSON.stringify({id:1,method:'Browser.close'}));await sleep(650);c.close();console.log('OWN_CHROME_CLOSE_SENT');
 }catch(e){console.error('CHROME_CLOSE_UNKNOWN '+String(e))}
 try{ws?.close()}catch{}try{proc?.kill()}catch{}
 if(server.listening)await new Promise(ok=>server.close(ok));
}
