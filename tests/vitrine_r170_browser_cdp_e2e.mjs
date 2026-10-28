import {spawn} from 'node:child_process';
import {readFileSync,existsSync,mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
const root=process.cwd();
const profile=mkdtempSync(join(tmpdir(),'synestra-r170-e2e-'));
const chrome='C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const url=pathToFileURL(join(root,'vitrine-r169-studio-palette-preview.html')).href;
const child=spawn(chrome,['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--disable-background-networking','--remote-debugging-address=127.0.0.1','--remote-debugging-port=0','--user-data-dir='+profile,url],{stdio:'ignore',windowsHide:true});
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
let ws,send;let result={};
try{
 const portFile=join(profile,'DevToolsActivePort');for(let j=0;j<60&&!existsSync(portFile);j++)await wait(150);
 if(!existsSync(portFile))throw Error('CHROME_NOT_STARTED');
 let portText;for(let k=0;k<25;k++){try{portText=readFileSync(portFile,'utf8');break}catch(e){if(!['EPERM','EBUSY'].includes(e.code)||k===24)throw e;await wait(100)}}
 const port=Number(portText.split(/\r?\n/)[0]);
 const targets=await (await fetch('http://127.0.0.1:'+port+'/json/list')).json();
 const page=targets.find(x=>x.type==='page'&&x.webSocketDebuggerUrl);
 if(!page)throw Error('NO_CHROME_PAGE');
 ws=new WebSocket(page.webSocketDebuggerUrl);
 await new Promise((resolve,reject)=>{ws.addEventListener('open',resolve,{once:true});ws.addEventListener('error',reject,{once:true})});
 let seq=0;const pending=new Map();
 ws.addEventListener('message',event=>{let data;try{data=JSON.parse(event.data)}catch{return}const p=pending.get(data.id);if(!p)return;pending.delete(data.id);data.error?p.reject(Error(JSON.stringify(data.error))):p.resolve(data.result)});
 send=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));setTimeout(()=>{if(pending.has(id)){pending.delete(id);reject(Error('CDP_TIMEOUT '+method))}},10000)});
 await send('Page.enable');await send('Runtime.enable');
 const evaluate=async()=>{const expression=`JSON.stringify((()=>{const logo=document.querySelector('.brand-banner-r99'),accent=document.querySelector('.hero-accent'),room=document.querySelector('.syn-r169-room .r169-ambient-light');return {ready:document.readyState,logoLoaded:!!logo&&logo.complete&&logo.naturalWidth===540,logoAnimation:logo?getComputedStyle(logo).animationName:null,logoTransform:logo?getComputedStyle(logo).transform:null,accentAnimation:accent?getComputedStyle(accent).animationName:null,accentPosition:accent?getComputedStyle(accent).backgroundPosition:null,roomAnimation:room?getComputedStyle(room).animationName:null,roomOpacity:room?getComputedStyle(room).opacity:null,width:innerWidth,scrollWidth:document.documentElement.scrollWidth,canvas:document.querySelectorAll('canvas').length}})())`;const z=await send('Runtime.evaluate',{expression,returnByValue:true});return JSON.parse(z.result.value)};
 for(const viewport of [{name:'desktop',width:1280,height:900},{name:'mobile',width:390,height:844}]){
   await send('Emulation.setDeviceMetricsOverride',{width:viewport.width,height:viewport.height,deviceScaleFactor:1,mobile:viewport.name==='mobile'});
   await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
   await send('Page.reload',{ignoreCache:true});await wait(600);
   const first=await evaluate();await wait(2200);const second=await evaluate();
   const animated=first.logoTransform!==second.logoTransform||first.accentPosition!==second.accentPosition||first.roomOpacity!==second.roomOpacity;
   if(!first.logoLoaded||first.logoAnimation!=='r170-logo-hover'||first.accentAnimation!=='r170-spectrum-flow'||first.canvas!==1||!animated||first.scrollWidth>viewport.width+2)throw Error('IDLE_MOTION_E2E_FAIL '+viewport.name+' '+JSON.stringify({first,second}));
   await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
   await wait(160);const reduced=await evaluate();
   if(reduced.logoAnimation!=='none'||reduced.accentAnimation!=='none')throw Error('REDUCED_MOTION_E2E_FAIL '+viewport.name+' '+JSON.stringify(reduced));
   result[viewport.name]={status:'PASS',logoLoaded:first.logoLoaded,motionWithoutInput:true,reducedMotion:'PASS',canvas:first.canvas,viewport:viewport.width,scrollWidth:first.scrollWidth,first:{logo:first.logoTransform,accent:first.accentPosition,room:first.roomOpacity},second:{logo:second.logoTransform,accent:second.accentPosition,room:second.roomOpacity}};
 }

 const demoTypes=['','atelier/','aurora/','mono/','signature/'];
 const demoPages=demoTypes.flatMap(kind=>['index.html','projects/index.html','roadmap/index.html','contact/index.html'].map(page=>'siteforge/'+kind+page));
 const otherPages=['connect/index.html','bridge/index.html','offres/index.html','siteforge/lab/index.html','siteforge/core-3d-lab/index.html','signal/index.html'];
 const smoke={};await send('Emulation.setDeviceMetricsOverride',{width:1280,height:900,deviceScaleFactor:1,mobile:false});
 await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
 for(const page of [...demoPages,...otherPages]){
   await send('Page.navigate',{url:pathToFileURL(join(root,page)).href});await wait(page==='signal/index.html'?900:400);
   const expression=`JSON.stringify((()=>{const select=(name,pseudo)=>{const element=document.querySelector(name);return element?getComputedStyle(element,pseudo||null).animationName:null};const image=document.querySelector('.logo img, .brand .r170-studio-mark, .mark img');return {ready:document.readyState,logoReady:!!image&&image.complete&&image.naturalWidth>0,demo:select('header .top strong'),demoBar:select('.sf-demo-bar','::after'),product:select('.logo img'),lab:select('.r170-studio-mark'),core:select('h1','::after'),signal:select('.hero-bg'),signalRunning:document.querySelector('.signal-canvas')?.dataset.animating||null,scrollWidth:document.documentElement.scrollWidth}})())`;
   const evaluated=await send('Runtime.evaluate',{expression,returnByValue:true}),v=JSON.parse(evaluated.result.value);
   const ok=demoPages.includes(page)?v.demo==='r170-brand-drift'&&v.demoBar==='r170-brand-spectrum':
     page.startsWith('siteforge/lab/')?v.lab==='r170-lab-mark'&&v.logoReady:
     page.startsWith('siteforge/core-3d-lab/')?v.core==='r170-lab-current':
     page.startsWith('signal/')?v.signal==='r170-signal-ambient'&&v.logoReady:
     v.product==='r170-logo-drift'&&v.logoReady;
   if(!ok||v.ready!=='complete')throw Error('PAGE_MOTION_FAIL '+page+' '+JSON.stringify(v));
   smoke[page]='PASS';
 }
 console.log('SYNESTRA_R170_ALL_PAGES_CHROME_SMOKE=PASS '+JSON.stringify({routes:Object.keys(smoke).length,allPages:smoke}));
 console.log('SYNESTRA_R170_REAL_CHROME_E2E=PASS '+JSON.stringify(result));
}catch(e){console.error('SYNESTRA_R170_REAL_CHROME_E2E=FAIL '+String(e));process.exitCode=1}
finally{try{if(send)await send('Browser.close')}catch{};try{ws?.close()}catch{};try{child.kill()}catch{};try{rmSync(profile,{recursive:true,force:true})}catch{}}
