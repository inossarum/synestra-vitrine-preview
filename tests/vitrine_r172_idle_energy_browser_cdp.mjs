import {spawn} from 'node:child_process';
import {existsSync,readFileSync,writeFileSync,mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
const root=process.cwd(),profile=mkdtempSync(join(tmpdir(),'syn-r172-'));
const chrome='C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const url=pathToFileURL(join(root,'vitrine-r169-studio-palette-preview.html')).href;
const child=spawn(chrome,['--headless=new','--enable-unsafe-swiftshader','--enable-webgl','--no-first-run','--disable-extensions','--disable-background-networking','--remote-debugging-port=0','--remote-debugging-address=127.0.0.1','--user-data-dir='+profile,url],{stdio:'ignore',windowsHide:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));let ws,send;
try{
const p=join(profile,'DevToolsActivePort');for(let i=0;i<60&&!existsSync(p);i++)await sleep(150);if(!existsSync(p))throw Error('DEVTOOLS_START_TIMEOUT');
let txt;for(let i=0;i<25;i++){try{txt=readFileSync(p,'utf8');break}catch(e){if(!['EPERM','EBUSY'].includes(e.code)||i===24)throw e;await sleep(100)}}
const port=Number(txt.split(/\r?\n/)[0]),targets=await(await fetch('http://127.0.0.1:'+port+'/json/list')).json();const page=targets.find(x=>x.type==='page');
ws=new WebSocket(page.webSocketDebuggerUrl);await new Promise((ok,bad)=>{ws.addEventListener('open',ok,{once:true});ws.addEventListener('error',bad,{once:true})});
let seq=0;const pending=new Map();
ws.addEventListener('message',e=>{let v;try{v=JSON.parse(e.data)}catch{return}const p=pending.get(v.id);if(!p)return;pending.delete(v.id);v.error?p.reject(Error(JSON.stringify(v.error))):p.resolve(v.result)});
send=(method,params={})=>new Promise((ok,bad)=>{const id=++seq;pending.set(id,{resolve:ok,reject:bad});ws.send(JSON.stringify({id,method,params}));setTimeout(()=>{if(pending.has(id)){pending.delete(id);bad(Error('CDP_TIMEOUT '+method))}},10000)});
await send('Page.enable');await send('Runtime.enable');
const expr=`JSON.stringify((()=>{const stage=document.querySelector('.core-r109-stage'),halo=document.querySelector('.r172-energy-halo'),rail=document.querySelector('.r172-rail-current'),light=document.querySelector('.r169-ambient-light'),canvas=document.querySelector('.core-r109-canvas'),before=getComputedStyle(halo,'::before'),box=stage.getBoundingClientRect();return{visibility:document.visibilityState,scrollY:scrollY,stageReady:stage?.getAttribute('data-core-ready'),stageBox:{left:box.left,top:box.top,width:box.width,height:box.height},halo:!!halo,haloDisplay:getComputedStyle(halo).display,haloZ:getComputedStyle(halo).zIndex,haloBeforeAnimation:before.animationName,haloBeforeTransform:before.transform,haloMask:before.maskImage,railAnimation:getComputedStyle(rail).animationName,railDash:getComputedStyle(rail).strokeDashoffset,roomLightOpacity:getComputedStyle(light).opacity,canvasOpacity:getComputedStyle(canvas).opacity,canvasWidth:canvas.width,canvasHeight:canvas.height,canvasCount:document.querySelectorAll('canvas').length,rootWidth:document.documentElement.scrollWidth,viewport:innerWidth}})())`;
const evalState=async()=>JSON.parse((await send('Runtime.evaluate',{expression:expr,returnByValue:true})).result.value);
for(const vw of [1280,390]){
 await send('Emulation.setDeviceMetricsOverride',{width:vw,height:900,deviceScaleFactor:1,mobile:vw===390});
 await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
 await send('Page.reload',{ignoreCache:true});await sleep(650);
 await send('Runtime.evaluate',{expression:"document.querySelector('.core-r109-stage').scrollIntoView({block:'center',behavior:'instant'})",returnByValue:true});await sleep(500);
 const first=await evalState(),snap0=await send('Page.captureScreenshot',{format:'png',fromSurface:true,captureBeyondViewport:false});
 const name='r172_stage_'+vw;
 writeFileSync(join(root,name+'_t0.png'),Buffer.from(snap0.data,'base64'));
 await sleep(2600);const second=await evalState(),snap1=await send('Page.captureScreenshot',{format:'png',fromSurface:true,captureBeyondViewport:false});writeFileSync(join(root,name+'_t1.png'),Buffer.from(snap1.data,'base64'));
 const anim=first.haloBeforeAnimation==='r172-energy-orbit'&&first.railAnimation==='r172-rail-travel'&&first.haloBeforeTransform!==second.haloBeforeTransform&&first.railDash!==second.railDash&&first.halo&&first.canvasCount===1;
 if(!anim)throw Error('IDLE_ANIM_FAILED_'+vw+' '+JSON.stringify({first,second}));
 await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await sleep(180);const reduced=await evalState();
 if(reduced.haloBeforeAnimation!=='none'||reduced.railAnimation!=='none')throw Error('REDUCED_MOTION_FAILED_'+vw+' '+JSON.stringify(reduced));
 console.log('R172_IDLE_CDP_'+vw+'=PASS '+JSON.stringify({first,second,reduced:{halo:reduced.haloBeforeAnimation,rail:reduced.railAnimation}}));
}
}catch(e){process.exitCode=1;console.error('R172_IDLE_CDP=FAIL '+String(e))}
finally{try{if(send)await send('Browser.close')}catch{};try{ws?.close()}catch{};try{child.kill()}catch{};try{rmSync(profile,{recursive:true,force:true})}catch{}}
