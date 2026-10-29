import {spawn} from 'node:child_process';
import {existsSync,readFileSync,writeFileSync,mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const profile=mkdtempSync(join(tmpdir(),'syn-r1884-links-'));
const chrome=spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',['--headless=new','--use-angle=d3d11','--enable-webgl','--disable-extensions','--disable-background-networking','--no-first-run','--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{stdio:'ignore',windowsHide:true});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
let ws,closed=false;
try{
 const pf=join(profile,'DevToolsActivePort');
 for(let i=0;i<100&&!existsSync(pf);i++)await sleep(100);
 if(!existsSync(pf))throw Error('CDP_NOT_READY');
 const port=Number(readFileSync(pf,'utf8').split(/\r?\n/)[0]);
 const pages=await(await fetch('http://127.0.0.1:'+port+'/json/list')).json();
 const page=pages.find(x=>x.type==='page'&&x.webSocketDebuggerUrl);
 ws=new WebSocket(page.webSocketDebuggerUrl);
 await new Promise((ok,no)=>{ws.addEventListener('open',ok,{once:true});ws.addEventListener('error',no,{once:true})});
 let id=0;const waiting=new Map();
 ws.addEventListener('message',event=>{let m;try{m=JSON.parse(event.data)}catch{return}const p=waiting.get(m.id);if(p){waiting.delete(m.id);m.error?p.no(Error(JSON.stringify(m.error))):p.ok(m.result)}});
 const cmd=(method,params={})=>new Promise((ok,no)=>{const n=++id;waiting.set(n,{ok,no});ws.send(JSON.stringify({id:n,method,params}));setTimeout(()=>{if(waiting.has(n)){waiting.delete(n);no(Error('CDP_TIMEOUT '+method))}},30000)});
 const ev=async expression=>{const v=await cmd('Runtime.evaluate',{expression,returnByValue:true});if(v.exceptionDetails)throw Error('JS_EXCEPTION');return v.result.value};
 await cmd('Runtime.enable');await cmd('Page.enable');
 await cmd('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
 const rootUrl='http://127.0.0.1:19105/';
 await cmd('Page.navigate',{url:rootUrl+'siteforge-catalogue-r1884.html'});
 for(let i=0;i<70;i++){if((await ev('document.readyState'))==='complete')break;await sleep(100)}
 const cat=JSON.parse(await ev("JSON.stringify({count:document.querySelectorAll('article').length,links:[...document.querySelectorAll('article a')].map(a=>a.getAttribute('href')),width:innerWidth,scrollWidth:document.documentElement.scrollWidth,columns:getComputedStyle(document.querySelector('.grid')).gridTemplateColumns})"));
 if(cat.count!==9||cat.width!==390||cat.scrollWidth>390)throw Error('RESPONSIVE_CATALOGUE_FAIL '+JSON.stringify(cat));
 const result=[];
 await cmd('Emulation.setDeviceMetricsOverride',{width:1100,height:800,deviceScaleFactor:1,mobile:false});
 for(let i=0;i<=8;i++){
  await cmd('Page.navigate',{url:rootUrl+'siteforge-r1884-autonome.html?demo=energy&material='+i});
  let ready=false;
  for(let n=0;n<100;n++){
   const state=JSON.parse(await ev("JSON.stringify({selected:document.getElementById('sf-flowType')?.value,ready:document.querySelector('.core-r109-stage')?.dataset.coreReady})"));
   if(state.selected===String(i)&&state.ready==='true'){ready=true;break}
   await sleep(140);
  }
  if(!ready)throw Error('DEEPLINK_NOT_READY_'+i);
  const gpu=JSON.parse(await ev("JSON.stringify((()=>{const canvas=document.querySelector('.core-r109-canvas'),gl=canvas.getContext('webgl'),dbg=gl.getExtension('WEBGL_debug_renderer_info');return {renderer:gl.getParameter(dbg?dbg.UNMASKED_RENDERER_WEBGL:gl.RENDERER),error:gl.getError()}})())"));
  if(gpu.error!==0||!/NVIDIA.*3090/.test(gpu.renderer))throw Error('GPU_LINK_FAIL_'+i);
  result.push({material:i,ready:true,error:gpu.error});
 }
 const report={schema:'synestra.siteforge.r1884.links-e2e.v1',status:'PASS',catalogue:cat,materials:result,renderer:'NVIDIA RTX3090 Direct3D11',limitations:'Mobile viewport emulated in Chrome Windows; not a physical phone'};
 writeFileSync(join(root,'evidence/SITEFORGE_R1884_LINKS_E2E_20261029.json'),JSON.stringify(report,null,2)+'\n');
 console.log('R1884_CATALOGUE_AND_LINKS_PASS',JSON.stringify({mobileWidth:cat.width,scroll:cat.scrollWidth,materials:result.length}));
 await cmd('Browser.close');closed=true;
}catch(err){console.error('R1884_LINKS_FAIL',String(err));process.exitCode=1}
finally{try{ws?.close()}catch{}if(!closed&&chrome.exitCode===null)try{chrome.kill()}catch{}await Promise.race([new Promise(r=>chrome.once('exit',r)),sleep(1000)]);try{rmSync(profile,{recursive:true,force:true,maxRetries:3,retryDelay:100})}catch{}}
