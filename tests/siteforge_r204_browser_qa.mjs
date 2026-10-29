// Synestra R204 – isolated Chrome CDP validation; localhost only, no production, no credentials.
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {existsSync,readFileSync,mkdtempSync,rmSync,writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const url='http://127.0.0.1:18880/';
const chrome='C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const profile=mkdtempSync(join(tmpdir(),'synestra-r204-chrome-'));
const child=spawn(chrome,['--headless=new','--no-first-run','--no-default-browser-check','--disable-background-networking','--remote-debugging-address=127.0.0.1','--remote-debugging-port=0','--user-data-dir='+profile,url],{stdio:'ignore',windowsHide:true});
const wait=ms=>new Promise(r=>setTimeout(r,ms));
let ws,send;const issues=[],results=[];
try {
 const portfile=join(profile,'DevToolsActivePort');
 for(let i=0;i<100&&!existsSync(portfile);i++)await wait(100);
 assert.ok(existsSync(portfile),'CHROME_NOT_STARTED');
 const port=Number(readFileSync(portfile,'utf8').split(/\r?\n/)[0]);
 const targets=await(await fetch('http://127.0.0.1:'+port+'/json/list')).json();
 const page=targets.find(x=>x.type==='page'&&x.webSocketDebuggerUrl);
 assert.ok(page,'CHROME_PAGE_UNAVAILABLE');
 ws=new WebSocket(page.webSocketDebuggerUrl);
 await new Promise((resolve,reject)=>{ws.addEventListener('open',resolve,{once:true});ws.addEventListener('error',reject,{once:true});});
 let seq=0;const pending=new Map();
 ws.addEventListener('message',e=>{
  let m;try{m=JSON.parse(e.data)}catch{return}
  if(m.method==='Runtime.exceptionThrown')issues.push('JS:'+m.params.exceptionDetails?.text);
  if(m.method==='Log.entryAdded'&&m.params.entry?.level==='error')issues.push('LOG:'+m.params.entry?.text?.slice(0,300));
  if(m.method==='Runtime.consoleAPICalled'&&m.params.type==='error')issues.push('CONSOLE:'+(m.params.args||[]).map(x=>x.value||x.description).join(' ').slice(0,300));
  const p=pending.get(m.id);if(!p)return;pending.delete(m.id);
  m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result);
 });
 send=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));setTimeout(()=>{if(pending.has(id)){pending.delete(id);reject(Error('CDP_TIMEOUT:'+method))}},15000)});
 await send('Page.enable');await send('Runtime.enable');await send('Log.enable');
 const evaluate=async expression=>{
  const x=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});
  if(x.exceptionDetails)throw Error('JS_EVAL:'+JSON.stringify(x.exceptionDetails));
  return x.result.value;
 };
 const measure="(()=>{const s=document.querySelector('.core-r109-stage'),c=document.querySelector('.core-r109-canvas'),gl=c?.getContext('webgl2')||c?.getContext('webgl');return {ready:s?.dataset.coreReady||null,fallback:s?.dataset.r204Fallback||null,gpuTier:s?.dataset.gpuTier||null,renderer:s?.dataset.coreRenderer||null,reference:s?.dataset.labReference||null,canvas:document.querySelectorAll('canvas').length,buffer:c?[c.width,c.height]:null,cssSize:c?[Math.round(c.getBoundingClientRect().width),Math.round(c.getBoundingClientRect().height)]:null,webgl:!!gl,gpu:gl?.getParameter(gl.RENDERER)||null,status:document.querySelector('[data-render-status]')?.textContent||'',h1:document.querySelectorAll('h1').length,overflow:document.documentElement.scrollWidth,viewport:innerWidth,fps:s?.dataset.coreFps||null,quality:s?.dataset.coreQuality||null}})()";
 for(const width of [1440,768,390]){
  await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width===390});
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
  await send('Page.navigate',{url});
  let m;
  for(let j=0;j<90;j++){await wait(200);m=await evaluate(measure);if(m.ready||m.fallback)break}
  if(m?.ready==='true')await wait(1100);
  m=await evaluate(measure);
  results.push({width,home:m});
  assert.equal(m.ready,'true','R204_RENDER_NOT_READY '+width+' '+JSON.stringify(m));
  assert.equal(m.renderer,'three-one');
  assert.equal(m.canvas,1);
  assert.ok(m.webgl,'NO_WEBGL_CONTEXT');
  assert.equal(m.h1,1);
  assert.ok(m.buffer[0]>0&&m.buffer[1]>0);
  assert.ok(m.overflow<=width+2,'HORIZONTAL_OVERFLOW '+width+' '+m.overflow);
  const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
  const bytes=Buffer.from(shot.data,'base64');
  writeFileSync(join(root,'r204-qa-'+width+'.png'),bytes);
  results.at(-1).screenshot={bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')};
  console.log('R204_WEBGL_VIEWPORT=PASS',JSON.stringify(results.at(-1)));
 }
 await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
 await send('Page.navigate',{url});await wait(900);
 const reduced=await evaluate(measure);
 assert.equal(reduced.ready,null);assert.equal(reduced.fallback,'reduced-motion');assert.equal(reduced.h1,1);
 const product=[];
 for(const route of ['connect/','bridge/','siteforge/','offres/']){
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
  await send('Page.navigate',{url:url+route});await wait(500);
  const m=await evaluate("({href:location.pathname,ready:document.readyState,h1:document.querySelectorAll('h1').length,canvas:document.querySelectorAll('canvas').length,overflow:document.documentElement.scrollWidth,viewport:innerWidth})");
  assert.equal(m.ready,'complete',route);
  assert.equal(m.h1,1,route);
  assert.equal(m.canvas,0,route);
  assert.ok(m.overflow<=m.viewport+2,route);
  product.push(m);
 }
 const shaderErrors=issues.filter(x=>/webgl|shader|compile|error/i.test(x));
 assert.equal(shaderErrors.length,0,'CONSOLE_OR_SHADER_ERRORS:'+JSON.stringify(shaderErrors));
 const report={schema:'synestra.siteforge.r204.chrome.v1',sourceCommit:'fd23e9c325214715b08b508da6756374f2535aef',status:'PASS',device:'Inos-Cerebros Chrome isolated headless',results,reduced,product,issues};
 writeFileSync(join(root,'r204-qa-browser-evidence.json'),JSON.stringify(report,null,2)+'\n');
 console.log('R204_BROWSER_QA=PASS '+JSON.stringify({views:results.length,product:product.length,reduced:reduced.fallback,issues:issues.length}));
}catch(e){console.error('R204_BROWSER_QA=FAIL '+String(e));process.exitCode=1;}
finally{try{if(send)await send('Browser.close')}catch{};try{ws?.close()}catch{};try{child.kill()}catch{};try{rmSync(profile,{recursive:true,force:true})}catch{}}
