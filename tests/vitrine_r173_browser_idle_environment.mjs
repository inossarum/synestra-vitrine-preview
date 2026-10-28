import {spawn} from 'node:child_process';
import {existsSync,readFileSync,writeFileSync,mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
const root=process.cwd(),profile=mkdtempSync(join(tmpdir(),'syn-r173-'));
const chrome='C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const url=pathToFileURL(join(root,'vitrine-r169-studio-palette-preview.html')).href;
const capture=process.argv.includes('--captures');
const child=spawn(chrome,['--headless=new','--enable-unsafe-swiftshader','--enable-webgl','--no-first-run','--disable-extensions','--disable-background-networking','--remote-debugging-port=0','--remote-debugging-address=127.0.0.1','--user-data-dir='+profile,url],{stdio:'ignore',windowsHide:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));let ws,send;let failed=false;
try{
const p=join(profile,'DevToolsActivePort');for(let i=0;i<60&&!existsSync(p);i++)await sleep(150);if(!existsSync(p))throw Error('DEVTOOLS_START_TIMEOUT');
let txt;for(let i=0;i<25;i++){try{txt=readFileSync(p,'utf8');break}catch(e){if(!['EPERM','EBUSY'].includes(e.code)||i===24)throw e;await sleep(100)}}
const port=Number(txt.split(/\r?\n/)[0]),targets=await(await fetch('http://127.0.0.1:'+port+'/json/list')).json(),page=targets.find(x=>x.type==='page');
if(!page)throw Error('PAGE_MISSING');
ws=new WebSocket(page.webSocketDebuggerUrl);await new Promise((ok,bad)=>{ws.addEventListener('open',ok,{once:true});ws.addEventListener('error',bad,{once:true})});
let seq=0;const pending=new Map();
ws.addEventListener('message',e=>{let v;try{v=JSON.parse(e.data)}catch{return}const p=pending.get(v.id);if(!p)return;pending.delete(v.id);v.error?p.reject(Error(JSON.stringify(v.error))):p.resolve(v.result)});
send=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));setTimeout(()=>{if(pending.has(id)){pending.delete(id);reject(Error('TIMEOUT '+method))}},10000)});
await send('Page.enable');await send('Runtime.enable');
const expr=`JSON.stringify((()=>{const hero=document.querySelector('.hero-v2'),stage=document.querySelector('.core-r109-stage'),env=document.querySelector('.r173-environment'),dial=document.querySelector('.r173-hud-dial'),arc=document.querySelector('.r173-dial-arc'),core=document.querySelector('.r173-dial-core'),grid=document.querySelector('.r173-grid'),beam=document.querySelector('.r173-beam-one'),scan=document.querySelector('.r173-scan'),sections=[...document.querySelectorAll('main>.section')],nav=document.querySelector('.core-r108-links');let b=hero.getBoundingClientRect(),st=stage.getBoundingClientRect(),dl=dial?.getBoundingClientRect();const e=(el)=>el?getComputedStyle(el):null;return {ready:document.readyState,viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,hero:{top:b.top,left:b.left,width:b.width,height:b.height},stage:{top:st.top,left:st.left,width:st.width,height:st.height,webglReady:stage?.dataset.coreReady,canvasCount:document.querySelectorAll('canvas').length},satelliteCount:stage?.querySelectorAll('.core-tool-satellite,.r172-energy-halo,.r172-energy-conduits').length,linkCount:nav?.querySelectorAll('a[href]').length,dial:{display:e(dial)?.display,border:e(dial)?.borderTopColor,width:dl?.width,top:dl?.top,left:dl?.left,opacity:e(dial)?.opacity},ring:{display:e(arc)?.display,z:e(dial)?.zIndex,animation:e(arc)?.animationName,transform:e(arc)?.transform},counter:{display:e(core)?.display,animation:e(core)?.animationName,transform:e(core)?.transform},environment:{present:!!env,gridAnimation:e(grid)?.animationName,gridTransform:e(grid)?.transform,beamAnimation:e(beam)?.animationName,beamTransform:e(beam)?.transform,scanAnimation:e(scan)?.animationName,scanTransform:e(scan)?.transform},sectionCount:sections.length,sectionAnimation:sections[0]?getComputedStyle(sections[0],'::before').animationName:'',cardAnimation:getComputedStyle(document.querySelector('.product-card'),'::after').animationName}})())`;
const evalState=async()=>JSON.parse((await send('Runtime.evaluate',{expression:expr,returnByValue:true})).result.value);
for(const vw of [1280,390]){
 await send('Emulation.setDeviceMetricsOverride',{width:vw,height:900,deviceScaleFactor:1,mobile:vw===390});
 await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
 await send('Page.reload',{ignoreCache:true});await sleep(900);
 const first=await evalState();
 if(capture){const img=await send('Page.captureScreenshot',{format:'png',fromSurface:true,captureBeyondViewport:false});writeFileSync(join(root,'r173_hero_'+vw+'_t0.png'),Buffer.from(img.data,'base64'));}
 await sleep(2600);const second=await evalState();
 if(capture){const img=await send('Page.captureScreenshot',{format:'png',fromSurface:true,captureBeyondViewport:false});writeFileSync(join(root,'r173_hero_'+vw+'_t1.png'),Buffer.from(img.data,'base64'));}
 const ok=first.satelliteCount===0&&first.linkCount===3&&first.stage.canvasCount===1&&first.dial.display!=='none'&&first.dial.width>=300&&first.dial.border==='rgba(129, 214, 255, 0.77)'&&first.ring.animation==='r173-hud-dial-turn'&&first.counter.animation==='r173-hud-dial-reverse'&&first.environment.gridAnimation==='r173-grid-drift'&&first.environment.beamAnimation==='r173-beam-sweep'&&first.environment.scanAnimation==='r173-scan-travel'&&first.sectionAnimation==='r173-section-current'&&first.cardAnimation==='r173-card-shimmer'&&first.ring.transform!==second.ring.transform&&first.counter.transform!==second.counter.transform&&first.environment.gridTransform!==second.environment.gridTransform&&first.environment.scanTransform!==second.environment.scanTransform&&first.scrollWidth<=vw+2;
 if(!ok)throw Error('R173_IDLE_E2E_FAIL_'+vw+' '+JSON.stringify({first,second}));
 await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await sleep(100);const reduced=await evalState();
 if(reduced.ring.animation!=='none'||reduced.counter.animation!=='none'||reduced.environment.gridAnimation!=='none'||reduced.environment.scanAnimation!=='none')throw Error('REDUCED_MOTION_FAIL_'+vw+' '+JSON.stringify(reduced));
 console.log('R173_LIVING_SITE_CDP_'+vw+'=PASS '+JSON.stringify({before:first,after:{ringTransform:second.ring.transform,counterTransform:second.counter.transform,gridTransform:second.environment.gridTransform,scanTransform:second.environment.scanTransform},reduced:'PASS'}));
}
}catch(e){failed=true;console.error('R173_LIVING_SITE_CDP_FAIL='+String(e));process.exitCode=1}finally{try{if(send)await send('Browser.close')}catch{};try{ws?.close()}catch{};try{child.kill()}catch{};try{rmSync(profile,{recursive:true,force:true})}catch{}}
