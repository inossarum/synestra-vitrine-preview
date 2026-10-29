import {spawn} from 'node:child_process';
import {existsSync,readFileSync,writeFileSync,mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {comparePngPixels} from './siteforge_r174_png_diff.mjs';
const root=join(dirname(fileURLToPath(import.meta.url)),'..'),mobile=process.argv.includes('--mobile'),tag=mobile?'-mobile':'';
const profile=mkdtempSync(join(tmpdir(),'syn-r1882-'));
const proc=spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',['--headless=new','--use-angle=d3d11','--enable-webgl','--disable-extensions','--disable-background-networking','--no-first-run','--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{stdio:'ignore',windowsHide:true});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
let ws,closed=false;
try{
 const portFile=join(profile,'DevToolsActivePort');for(let k=0;k<100&&!existsSync(portFile);k++)await sleep(120);
 if(!existsSync(portFile))throw Error('CHROME_START');
 const port=Number(readFileSync(portFile,'utf8').split(/\r?\n/)[0]);
 const pages=await(await fetch('http://127.0.0.1:'+port+'/json/list')).json();
 const page=pages.find(x=>x.type==='page'&&x.webSocketDebuggerUrl);
 ws=new WebSocket(page.webSocketDebuggerUrl);
 await new Promise((ok,no)=>{ws.addEventListener('open',ok,{once:true});ws.addEventListener('error',no,{once:true})});
 let seq=0;const waits=new Map();
 ws.addEventListener('message',e=>{let msg;try{msg=JSON.parse(e.data)}catch{return}let x=waits.get(msg.id);if(x){waits.delete(msg.id);msg.error?x.no(Error(JSON.stringify(msg.error))):x.ok(msg.result)}});
 const c=(method,params={})=>new Promise((ok,no)=>{const id=++seq;waits.set(id,{ok,no});ws.send(JSON.stringify({id,method,params}));setTimeout(()=>{if(waits.has(id)){waits.delete(id);no(Error('CDP_TIMEOUT '+method))}},25000)});
 const e=async expression=>{const r=await c('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error('JS_EXCEPTION '+JSON.stringify(r.exceptionDetails));return r.result.value};
 const set=async(id,value)=>e("(()=>{let x=document.getElementById("+JSON.stringify(id)+");x.value="+JSON.stringify(String(value))+";x.dispatchEvent(new Event('input',{bubbles:true}));return x.value})()");
 await c('Page.enable');await c('Runtime.enable');await c('Emulation.setDeviceMetricsOverride',{width:mobile?390:1100,height:mobile?844:800,deviceScaleFactor:1,mobile});
 const url='http://127.0.0.1:19103/siteforge-r1882-autonome.html?demo=energy';if((await fetch(url)).status!==200)throw Error('PREVIEW_OFF');
 await c('Page.navigate',{url});
 let ready=false;for(let k=0;k<90;k++){if((await e("document.querySelector('.core-r109-stage')?.dataset.coreReady"))==='true'){ready=true;break}await sleep(200)}
 if(!ready)throw Error('WEBGL_NOT_READY');
 await set('sf-particleSpeed',0);await set('sf-pulseSpeed',100);await set('sf-flowCount',8);
 await e("(()=>{const x=document.querySelector('[data-energy-mouse-toggle]');if(x.getAttribute('aria-pressed')==='true')x.click()})()");
 const info=JSON.parse(await e("JSON.stringify((()=>{let el=document.querySelector('.core-r109-canvas'),g=el.getContext('webgl'),x=g.getExtension('WEBGL_debug_renderer_info'),r=el.getBoundingClientRect();return {renderer:g.getParameter(x?x.UNMASKED_RENDERER_WEBGL:g.RENDERER),error:g.getError(),rect:{x:r.x,y:r.y,width:r.width,height:r.height,scale:1}}})())"));
 if(!/NVIDIA.*RTX 3090/.test(info.renderer)||info.error!==0)throw Error('HARDWARE_GPU_UNVERIFIED '+JSON.stringify(info));
 const photo=async name=>{const v=await c('Page.captureScreenshot',{format:'png',clip:info.rect,captureBeyondViewport:false});const img=Buffer.from(v.data,'base64');writeFileSync(join(root,'evidence/r1882-'+name+tag+'.png'),img);return img};
 await set('sf-energyTurbulence',0);await sleep(900);const a=await photo('zero');const uniformZero=await e("(()=>{const c=document.querySelector('.core-r109-canvas').getContext('webgl');return c.getUniform(c.getParameter(c.CURRENT_PROGRAM),c.getUniformLocation(c.getParameter(c.CURRENT_PROGRAM),'uEnergyTurbulence'))})()");await sleep(400);const again=await photo('repeat');
 await set('sf-energyTurbulence',100);await sleep(900);const b=await photo('full');const uniformFull=await e("(()=>{const c=document.querySelector('.core-r109-canvas').getContext('webgl');return c.getUniform(c.getParameter(c.CURRENT_PROGRAM),c.getUniformLocation(c.getParameter(c.CURRENT_PROGRAM),'uEnergyTurbulence'))})()");
 const repeated=comparePngPixels(a,again),different=comparePngPixels(a,b);
 const value=await e("document.querySelector('.core-r109-stage').dataset.energyTurbulence");
 if(value!=='100'||uniformZero!==0||Math.abs(uniformFull-1)>0.001||different.changed<500)throw Error('GPU_UNIFORM_OR_VISUAL_FAIL '+JSON.stringify({repeated,different,value,uniformZero,uniformFull}));
 const report={status:'PASS',mobile,renderer:info.renderer,repeat:repeated,delta:different,energyControl:value,uniformZero,uniformFull,note:'Animation uLabTime non figée : pixel delta comparatif inclut le mouvement temporel; ce n’est pas une différence déterministe.'};
 writeFileSync(join(root,'evidence/SITEFORGE_R1882_TURBULENCE_GPU'+tag+'_20261029.json'),JSON.stringify(report,null,2)+'\n');
 console.log('R1882_TURBULENCE_GPU_PASS',JSON.stringify({mobile,renderer:info.renderer,repeat:repeated.changed,changed:different.changed,uniformZero,uniformFull}));
 await c('Browser.close');closed=true;
}catch(error){console.error('R1882_TURBULENCE_GPU_FAIL',String(error));process.exitCode=1}
finally{try{ws?.close()}catch{}if(!closed&&proc.exitCode===null)try{proc.kill()}catch{}await Promise.race([new Promise(ok=>proc.once('exit',ok)),sleep(1000)]);try{rmSync(profile,{recursive:true,force:true,maxRetries:3,retryDelay:100})}catch{}}
