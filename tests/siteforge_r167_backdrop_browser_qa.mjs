import {spawn} from 'node:child_process';
import {readFileSync,existsSync,writeFileSync,mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
const root=process.cwd(),profile=mkdtempSync(join(tmpdir(),'syn-r167-backdrop-'));
const url=pathToFileURL(join(root,'vitrine-r167-backdrop-preview.html')).href;
const chrome='C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const child=spawn(chrome,['--headless=new','--enable-unsafe-swiftshader','--use-angle=swiftshader','--disable-extensions','--disable-background-networking','--no-first-run','--remote-debugging-port=0','--user-data-dir='+profile,url],{stdio:'ignore',windowsHide:true});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));let ws;
try{
 const dev=join(profile,'DevToolsActivePort');for(let i=0;i<80&&!existsSync(dev);i++)await sleep(150);if(!existsSync(dev))throw Error('CHROME_NOT_READY');
 const port=Number(readFileSync(dev,'utf8').trim().split(/\r?\n/)[0]);
 const pages=await(await fetch('http://127.0.0.1:'+port+'/json/list')).json(),page=pages.find(x=>x.type==='page'&&x.webSocketDebuggerUrl);
 ws=new WebSocket(page.webSocketDebuggerUrl);await new Promise((res,rej)=>{ws.addEventListener('open',res,{once:true});ws.addEventListener('error',rej,{once:true})});
 let id=0;const pending=new Map();ws.addEventListener('message',event=>{let m=JSON.parse(event.data),p=pending.get(m.id);if(p){pending.delete(m.id);m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result)}});
 const call=(method,params={})=>new Promise((resolve,reject)=>{let n=++id;pending.set(n,{resolve,reject});ws.send(JSON.stringify({id:n,method,params}));setTimeout(()=>{if(pending.has(n)){pending.delete(n);reject(Error('CDP_TIMEOUT'))}},9000)});
 await call('Page.enable');await call('Runtime.enable');
 for(const mobile of [false,true]){
  await call('Emulation.setDeviceMetricsOverride',{width:mobile?390:1280,height:mobile?844:850,mobile,deviceScaleFactor:1});
  await call('Page.navigate',{url});await sleep(1800);
  const e=await call('Runtime.evaluate',{expression:"JSON.stringify((()=>{const stage=document.querySelector('.core-r109-stage'),c=stage?.querySelector('canvas'),gl=c?.getContext('webgl');return {ready:stage?.dataset.coreReady,webgl:!!gl,error:gl?.getError(),canvas:document.querySelectorAll('canvas').length,controls:document.querySelectorAll('[data-sphere-control]').length,scale:getComputedStyle(c).transform,bodyWidth:document.body.scrollWidth,viewport:innerWidth,backdrop:!!stage.querySelector('.syn-r167-backdrop'),script:document.querySelector('script[src*=siteforge-r116-sphere-only]')!==null}})())",returnByValue:true});
  const v=JSON.parse(e.result.value);
  if(v.ready!=='true'||!v.webgl||v.error!==0||v.canvas!==1||v.controls!==18||!v.script||!v.backdrop||v.bodyWidth>v.viewport+2)throw Error('R167_BACKDROP_FAIL '+JSON.stringify(v));
  const shot=await call('Page.captureScreenshot',{format:'png'});
  writeFileSync(join(root,mobile?'r167-backdrop-mobile.png':'r167-backdrop-desktop.png'),Buffer.from(shot.data,'base64'));
  console.log('R167_BACKDROP_'+(mobile?'MOBILE':'DESKTOP')+'_PASS '+JSON.stringify(v));
 }
 await call('Browser.close');
}catch(err){console.error('R167_BACKDROP_FAIL '+String(err));process.exitCode=1}finally{try{ws?.close()}catch{}try{child.kill()}catch{}await sleep(350);try{rmSync(profile,{recursive:true,force:true,maxRetries:3,retryDelay:100})}catch{}}
