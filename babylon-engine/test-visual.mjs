import {spawn} from 'node:child_process';
import {mkdtempSync,existsSync,readFileSync,writeFileSync,mkdirSync,rmSync} from 'node:fs';
import {join} from 'node:path';import {tmpdir} from 'node:os';
const profile=mkdtempSync(join(tmpdir(),'syn-babylon-r190-'));
const chrome=spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
 ['--headless=new','--use-angle=d3d11','--enable-webgl','--disable-extensions','--disable-background-networking',
 '--no-first-run','--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],
 {stdio:'ignore',windowsHide:true});
const pause=ms=>new Promise(r=>setTimeout(r,ms));
const evidence='../evidence';mkdirSync(evidence,{recursive:true});
let ws;const report={version:'R190-prototype',engine:'Babylon.js',status:'RUNNING',screens:[]};
try{
 const portFile=join(profile,'DevToolsActivePort');
 for(let i=0;i<90&&!existsSync(portFile);i++)await pause(130);
 if(!existsSync(portFile))throw Error('NO_BROWSER_DEBUG_PORT');
 const port=Number(readFileSync(portFile,'utf8').split(/\r?\n/)[0]);
 const pages=await(await fetch('http://127.0.0.1:'+port+'/json/list')).json();
 ws=new WebSocket(pages.find(p=>p.type==='page').webSocketDebuggerUrl);
 await new Promise((res,rej)=>{ws.addEventListener('open',res,{once:true});ws.addEventListener('error',rej,{once:true})});
 const pending=new Map();let id=0;ws.addEventListener('message',e=>{const msg=JSON.parse(e.data),p=pending.get(msg.id);if(!p)return;pending.delete(msg.id);msg.error?p.reject(Error(JSON.stringify(msg.error))):p.resolve(msg.result)});
 const call=(method,params={})=>new Promise((resolve,reject)=>{const k=++id;pending.set(k,{resolve,reject});ws.send(JSON.stringify({id:k,method,params}))});
 const ev=async js=>{const r=await call('Runtime.evaluate',{expression:js,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error('BROWSER_ERROR '+JSON.stringify(r.exceptionDetails).slice(0,400));return r.result.value};
 await call('Page.enable');await call('Runtime.enable');
 for(const [w,h] of [[1440,900],[390,844]]){
  await call('Emulation.setDeviceMetricsOverride',{width:w,height:h,deviceScaleFactor:1,mobile:w===390});
  await call('Page.navigate',{url:'http://127.0.0.1:19112/?frame=4.5'});
  let ready=false;for(let k=0;k<125;k++){if(await ev("document.querySelector('#sphere')?.dataset.ready==='true'")){ready=true;break}await pause(160)}
  if(!ready)throw Error('ENGINE_NOT_READY '+w+' '+await ev("document.querySelector('#status')?.textContent"));
  for(const [pose,angle] of [['front',0],['side',1.07],['over',.43]]){
   await ev("(()=>{const lab=window.__labSphere;lab.camera.alpha=-Math.PI/2+"+angle+";lab.camera.beta="+(pose==='over'?1.09:1.44)+";lab.engine.resize();return true})()");
   await pause(750);
   const st=await ev("(()=>{const c=document.querySelector('#sphere'),lab=window.__labSphere,gl=lab.engine._gl,ext=gl.getExtension('WEBGL_debug_renderer_info');return {engine:c.dataset.engine,scope:c.dataset.scope,strands:Number(c.dataset.strands),glints:lab.glints.length,meshes:lab.scene.meshes.length,renderer:gl.getParameter(ext?ext.UNMASKED_RENDERER_WEBGL:gl.RENDERER),glError:gl.getError(),camera:{alpha:lab.camera.alpha,beta:lab.camera.beta},viewport:{w:c.width,h:c.height}}})()");
   if(st.engine!=='babylonjs'||st.scope!=='sphere-only'||st.strands!==62||st.glints!==32||st.glError!==0)throw Error('BAD_ENGINE '+JSON.stringify(st));
   const shot=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
   const name='R190-sphere-'+w+'-'+pose+'.png';writeFileSync(join(evidence,name),Buffer.from(shot.data,'base64'));
   report.screens.push({w,h,pose,name,state:st});
   console.log('SPHERE_CAPTURE_PASS '+JSON.stringify({w,pose,meshes:st.meshes,glError:st.glError,renderer:st.renderer}));
  }
 }
 report.status='PASS';
 writeFileSync(join(evidence,'R190_SPHERE_BABYLON_BROWSER.json'),JSON.stringify(report,null,2)+'\n');
}catch(e){report.status='FAIL';console.error('R190_BROWSER_FAIL '+String(e));process.exitCode=1}
finally{try{ws?.close()}catch{}try{chrome.kill()}catch{}await pause(300);try{rmSync(profile,{recursive:true,force:true,maxRetries:2,retryDelay:120})}catch(e){console.log('QA_PROFILE_CLEANUP_PENDING '+e.code)}}
