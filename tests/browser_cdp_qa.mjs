import { spawn } from 'node:child_process';
import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
const root = process.cwd();
const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const profile = join(root,'chrome-cdp-isolated');
const url = pathToFileURL(join(root,'index.html')).href;
const args = ['--headless=new','--disable-gpu','--disable-extensions','--disable-background-networking','--no-first-run','--no-default-browser-check','--remote-debugging-address=127.0.0.1','--remote-debugging-port=0','--user-data-dir='+profile,url];
const child = spawn(chrome,args,{stdio:'ignore',windowsHide:true});
const sleep = ms => new Promise(r=>setTimeout(r,ms));
let ws;
try {
  const portPath=join(profile,'DevToolsActivePort');
  for(let i=0;i<60&&!existsSync(portPath);i++)await sleep(150);
  if(!existsSync(portPath))throw Error('DEVTOOLS_START_TIMEOUT');
  const port=Number(readFileSync(portPath,'utf8').trim().split(/\r?\n/)[0]);
  if(!Number.isInteger(port)||port<1)throw Error('INVALID_DEBUG_PORT');
  const targets=await (await fetch('http://127.0.0.1:'+port+'/json/list')).json();
  const page=targets.find(x=>x.type==='page'&&x.webSocketDebuggerUrl);
  if(!page)throw Error('NO_PAGE_TARGET');
  ws=new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve,reject)=>{ws.addEventListener('open',resolve,{once:true});ws.addEventListener('error',reject,{once:true});});
  let seq=0;
  const pending=new Map();
  ws.addEventListener('message',evt=>{
    let response;try{response=JSON.parse(evt.data)}catch{return}
    const p=pending.get(response.id);if(!p)return;
    pending.delete(response.id);
    if(response.error)p.reject(Error(JSON.stringify(response.error)));
    else p.resolve(response.result);
  });
  const call=(method,params={})=>new Promise((resolve,reject)=>{
    const id=++seq;
    pending.set(id,{resolve,reject});
    ws.send(JSON.stringify({id,method,params}));
    setTimeout(()=>{if(pending.has(id)){pending.delete(id);reject(Error('CDP_TIMEOUT '+method))}},10000);
  });
  await call('Page.enable');
  for(const view of [{name:'mobile',width:390,height:844,mobile:true},{name:'desktop',width:1440,height:900,mobile:false}]){
    await call('Emulation.setDeviceMetricsOverride',{width:view.width,height:view.height,deviceScaleFactor:1,mobile:view.mobile});
    await call('Page.reload',{ignoreCache:true});
    await sleep(450);
    const metrics=await call('Runtime.evaluate',{expression:"JSON.stringify({width:innerWidth,rootScrollWidth:document.documentElement.scrollWidth,bodyScrollWidth:document.body.scrollWidth,ready:document.readyState,faq:document.querySelectorAll('#questions details').length})",returnByValue:true});
    const m=JSON.parse(metrics.result.value);
    if(m.width!==view.width||m.rootScrollWidth>view.width+1||m.bodyScrollWidth>view.width+1||m.faq!==5||m.ready!=='complete')throw Error('VIEWPORT_FAIL '+view.name+' '+JSON.stringify(m));
    const open=await call('Runtime.evaluate',{expression:"(() => {let d=document.querySelector('#questions details');let was=d.open; d.querySelector('summary').click();let opened=d.open; d.querySelector('summary').click();return !was&&opened&&!d.open;})()",returnByValue:true});
    if(open.result.value!==true)throw Error('FAQ_INTERACTION_FAIL '+view.name);
    const shot=await call('Page.captureScreenshot',{format:'png',fromSurface:true,captureBeyondViewport:false});
    const target=join(root,'cdp-'+view.name+'.png');
    writeFileSync(target,Buffer.from(shot.data,'base64'));
    console.log('BROWSER_'+view.name.toUpperCase()+'=PASS '+JSON.stringify(m)+' screenshot='+target);
  }
  console.log('BROWSER_REAL_VIEWPORT_QA_PASS');
} finally {
  try{ws?.close()}catch{}
  child.kill();
}
