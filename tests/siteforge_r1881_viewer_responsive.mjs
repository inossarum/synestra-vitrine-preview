import {spawn} from 'node:child_process';
import {existsSync,readFileSync,writeFileSync,mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const profile=mkdtempSync(join(tmpdir(),'syn-r1881-viewer-'));
const child=spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',['--headless=new','--use-angle=d3d11','--enable-webgl','--disable-extensions','--disable-background-networking','--no-first-run','--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{stdio:'ignore',windowsHide:true});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
let ws,closed=false;
try{
 const pf=join(profile,'DevToolsActivePort');
 for(let i=0;i<100&&!existsSync(pf);i++)await sleep(100);
 if(!existsSync(pf))throw Error('CDP_NOT_READY');
 const port=Number(readFileSync(pf,'utf8').split(/\r?\n/)[0]);
 const pages=await(await fetch('http://127.0.0.1:'+port+'/json/list')).json();
 const page=pages.find(p=>p.type==='page'&&p.webSocketDebuggerUrl);
 ws=new WebSocket(page.webSocketDebuggerUrl);
 await new Promise((ok,fail)=>{ws.addEventListener('open',ok,{once:true});ws.addEventListener('error',fail,{once:true})});
 let id=0;const map=new Map();
 ws.addEventListener('message',event=>{let m;try{m=JSON.parse(event.data)}catch{return}const p=map.get(m.id);if(p){map.delete(m.id);m.error?p.fail(Error(JSON.stringify(m.error))):p.ok(m.result)}});
 const call=(method,params={})=>new Promise((ok,fail)=>{const n=++id;map.set(n,{ok,fail});ws.send(JSON.stringify({id:n,method,params}));setTimeout(()=>{if(map.has(n)){map.delete(n);fail(Error('CDP_TIMEOUT '+method))}},15000)});
 const evalJS=async expr=>(await call('Runtime.evaluate',{expression:expr,returnByValue:true})).result.value;
 await call('Page.enable');await call('Runtime.enable');
 const report={};
 for(const [name,width,height,mobile] of [['desktop',1200,840,false],['mobile',390,844,true]]){
  await call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile});
  await call('Page.navigate',{url:'http://127.0.0.1:19102/r1881-comparaison-rtx3090.html'});
  for(let j=0;j<50;j++){if((await evalJS('document.readyState'))==='complete')break;await sleep(120)}
  await sleep(600);
  const state=JSON.parse(await evalJS("JSON.stringify({viewport:innerWidth,outer:document.documentElement.scrollWidth,body:document.body.scrollWidth,grid:getComputedStyle(document.querySelector('.grid')).gridTemplateColumns,images:[...document.images].map(i=>({loaded:i.complete&&i.naturalWidth>0,naturalWidth:i.naturalWidth})),font:parseFloat(getComputedStyle(document.body).fontSize)})"));
  const shot=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
  writeFileSync(join(root,'evidence/r1881-gpu-viewer-'+name+'.png'),Buffer.from(shot.data,'base64'));
  report[name]=state;console.log('RESPONSIVE_VIEW',name,JSON.stringify(state));
  if(state.viewport!==width||state.outer>width+2||state.body>width+2||!state.images.every(i=>i.loaded))throw Error('RESPONSIVE_OVERFLOW_'+name);
 }
 writeFileSync(join(root,'evidence/SITEFORGE_R1881_VIEWER_RESPONSIVE_20261029.json'),JSON.stringify({report,status:'PASS'},null,2)+'\n');
 await call('Browser.close');closed=true;
}catch(e){console.error('VIEWER_FAIL',String(e));process.exitCode=1}
finally{try{ws?.close()}catch{}if(!closed&&child.exitCode===null)try{child.kill()}catch{}await Promise.race([new Promise(ok=>child.once('exit',ok)),sleep(1000)]);try{rmSync(profile,{recursive:true,force:true,maxRetries:3,retryDelay:100})}catch{}}
