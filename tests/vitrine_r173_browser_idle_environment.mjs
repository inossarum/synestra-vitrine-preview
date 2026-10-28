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
const expr=`JSON.stringify((()=>{const hero=document.querySelector('.hero-v2'),stage=document.querySelector('.core-r109-stage'),env=document.querySelector('.r173-environment'),dial=document.querySelector('.r173-hud-dial'),arc=document.querySelector('.r173-dial-arc'),core=document.querySelector('.r173-dial-core'),grid=document.querySelector('.r173-grid'),beam=document.querySelector('.r173-beam-one'),scan=document.querySelector('.r173-scan'),sections=[...document.querySelectorAll('main>.section')],nav=document.querySelector('.core-r108-links');let b=hero.getBoundingClientRect(),st=stage.getBoundingClientRect(),dl=dial?.getBoundingClientRect();const e=(el)=>el?getComputedStyle(el):null;return {ready:document.readyState,viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,hero:{top:b.top,left:b.left,width:b.width,height:b.height},stage:{top:st.top,left:st.left,width:st.width,height:st.height,webglReady:stage?.dataset.coreReady,canvasCount:document.querySelectorAll('canvas').length},satelliteCount:stage?.querySelectorAll('.core-tool-satellite,.r172-energy-halo,.r172-energy-conduits').length,linkCount:nav?.querySelectorAll('a[href]').length,dial:{display:e(dial)?.display,border:e(dial)?.borderTopColor,width:dl?.width,top:dl?.top,left:dl?.left,opacity:e(dial)?.opacity},ring:{display:e(arc)?.display,z:e(dial)?.zIndex,animation:e(arc)?.animationName,transform:e(arc)?.transform},counter:{display:e(core)?.display,animation:e(core)?.animationName,transform:e(core)?.transform},environment:{present:!!env,beamCount:document.querySelectorAll('.r173-beam').length,scanCount:document.querySelectorAll('.r173-scan').length,gridAnimation:e(grid)?.animationName,gridTransform:e(grid)?.transform},sectionCount:sections.length,sectionAnimation:sections[0]?getComputedStyle(sections[0],'::before').animationName:'',cardAnimation:getComputedStyle(document.querySelector('.product-card'),'::after').animationName}})())`;
const evalState=async()=>JSON.parse((await send('Runtime.evaluate',{expression:expr,returnByValue:true})).result.value);
for(const vw of [1280,390,320]){
 await send('Emulation.setDeviceMetricsOverride',{width:vw,height:900,deviceScaleFactor:1,mobile:vw<=390});
 await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
 await send('Page.reload',{ignoreCache:true});await sleep(900);
 const first=await evalState();
 const navExpression=`JSON.stringify((()=>{const header=document.querySelector('.site-header'),menu=document.querySelector('.r175-mobile-menu'),panel=document.querySelector('.r175-mobile-panel'),cta=document.querySelector('.site-nav .nav-cta');return {height:Math.round(header?.getBoundingClientRect().height||0),menuDisplay:menu&&getComputedStyle(menu).display,menuOpen:!!menu?.open,panelVisible:!!panel?.getClientRects().length,menuLinkCount:panel?.querySelectorAll('a[href]').length||0,ctaVisible:!!cta?.getClientRects().length,scrollWidth:document.documentElement.scrollWidth}})())`;
 const getNav=async()=>JSON.parse((await send('Runtime.evaluate',{expression:navExpression,returnByValue:true})).result.value);
 const navBefore=await getNav();
 if(vw<=390){
   if(navBefore.height>135||navBefore.menuDisplay==='none'||navBefore.menuOpen||navBefore.panelVisible||!navBefore.ctaVisible||navBefore.scrollWidth>vw+2)throw Error('R175_MOBILE_NAV_CLOSED_FAIL '+JSON.stringify(navBefore));
   await send('Runtime.evaluate',{expression:"document.querySelector('.r175-mobile-menu summary').click()"});
   await sleep(80);
   const navOpened=await getNav();
   if(!navOpened.menuOpen||!navOpened.panelVisible||navOpened.menuLinkCount!==10||navOpened.scrollWidth>vw+2)throw Error('R175_MOBILE_NAV_OPEN_FAIL '+JSON.stringify(navOpened));
   console.log('R175_MOBILE_NAV_'+vw+'=PASS '+JSON.stringify({closed:navBefore,opened:navOpened}));
   await send('Runtime.evaluate',{expression:"document.querySelector('.r175-mobile-menu summary').click()"});
 }else if(navBefore.menuDisplay!=='none'||!navBefore.ctaVisible){
   throw Error('R175_DESKTOP_NAV_REGRESSION '+JSON.stringify(navBefore));
 }else console.log('R175_DESKTOP_NAV_1280=PASS '+JSON.stringify(navBefore));
 const wayfinderEval=`JSON.stringify((()=>{const header=document.querySelector('body>.site-header.container'),dock=document.querySelector('.r178-wayfinder'),cards=[...dock.querySelectorAll('.r178-wayfinder-link')],hs=getComputedStyle(header),ds=getComputedStyle(dock);return {headerPosition:hs.position,headerTop:header.getBoundingClientRect().top,headerBottom:header.getBoundingClientRect().bottom,headerHeight:header.getBoundingClientRect().height,dockVisible:ds.display!=='none',columns:getComputedStyle(dock.querySelector('.r178-wayfinder-grid')).gridTemplateColumns,links:cards.map(x=>x.getAttribute('href')),cardWidths:cards.map(x=>x.getBoundingClientRect().width),scrollWidth:document.documentElement.scrollWidth,viewport:innerWidth}})())`;
 const getWayfinder=async()=>JSON.parse((await send('Runtime.evaluate',{expression:wayfinderEval,returnByValue:true})).result.value);
 const manifestExpression=`JSON.stringify((()=>{const section=document.querySelector('.r179-manifesto'),copy=document.querySelector('.r179-editorial-copy'),title=document.querySelector('#r179-manifesto-title'),panel=document.querySelector('.r179-system-index'),links=[...panel.querySelectorAll('a[href]')],r=x=>x.getBoundingClientRect(),h=r(title),c=r(copy),p=r(panel),s=r(section);return {title:title.innerText,links:links.map(x=>x.getAttribute('href')),columns:getComputedStyle(section).gridTemplateColumns,titleWidth:h.width,titleScrollWidth:title.scrollWidth,titleHeight:h.height,copyBottom:c.bottom,panelTop:p.top,panelWidth:p.width,sectionWidth:s.width,scrollWidth:document.documentElement.scrollWidth}})())`;
 const getManifest=async()=>JSON.parse((await send('Runtime.evaluate',{expression:manifestExpression,returnByValue:true})).result.value);
 const manifest=await getManifest();
 if(manifest.links.join(',')!=='./siteforge/,./connect/,./bridge/'||manifest.titleWidth<180||manifest.panelWidth<180||manifest.scrollWidth>vw+2||manifest.titleScrollWidth>manifest.titleWidth+2)throw Error('R179_EDITORIAL_LAYOUT_FAIL_'+vw+' '+JSON.stringify(manifest));
 if(capture){
  await send('Runtime.evaluate',{expression:"document.querySelector('.r179-manifesto').scrollIntoView({block:'start',behavior:'instant'})"});
  await sleep(180);
  const manifestoImage=await send('Page.captureScreenshot',{format:'png',fromSurface:true,captureBeyondViewport:false});
  writeFileSync(join(root,'r179_editorial_'+vw+'.png'),Buffer.from(manifestoImage.data,'base64'));
  await send('Runtime.evaluate',{expression:"window.scrollTo({top:0,behavior:'instant'})"});
 }
 console.log('R179_EDITORIAL_CDP_'+vw+'=PASS '+JSON.stringify(manifest));
 const wfBefore=await getWayfinder();
 if(wfBefore.headerPosition!=='sticky'||wfBefore.headerHeight>130||!wfBefore.dockVisible||wfBefore.links.join(',')!=='#plateforme,#exemples,#approche'||wfBefore.cardWidths.some(n=>n<150)||wfBefore.scrollWidth>vw+2)throw Error('R178_NAV_INITIAL_FAIL_'+vw+' '+JSON.stringify(wfBefore));
 if(capture){
  await send('Runtime.evaluate',{expression:"document.querySelector('.r178-wayfinder').scrollIntoView({block:'start',behavior:'instant'})"});
  await sleep(120);
  const dockImage=await send('Page.captureScreenshot',{format:'png',fromSurface:true,captureBeyondViewport:false});
  writeFileSync(join(root,'r178_navigation_'+vw+'.png'),Buffer.from(dockImage.data,'base64'));
 }
 await send('Runtime.evaluate',{expression:"document.querySelector('.r178-wayfinder-link').click()"});
 await sleep(1050);
 const wfAfter=await getWayfinder();
 const target=JSON.parse((await send('Runtime.evaluate',{expression:`JSON.stringify({hash:location.hash,top:document.querySelector('#plateforme').getBoundingClientRect().top,scrollY:scrollY})`,returnByValue:true})).result.value);
 if(target.hash!=='#plateforme'||target.scrollY<200||Math.abs(wfAfter.headerTop)>3||target.top<wfAfter.headerBottom-15||wfAfter.scrollWidth>vw+2)throw Error('R178_STICKY_ANCHOR_FAIL_'+vw+' '+JSON.stringify({wfAfter,target}));
 if(capture){const screenshot=await send('Page.captureScreenshot',{format:'png',fromSurface:true,captureBeyondViewport:false});writeFileSync(join(root,'r178_anchor_'+vw+'.png'),Buffer.from(screenshot.data,'base64'));}
 console.log('R178_WAYFINDER_CDP_'+vw+'=PASS '+JSON.stringify({headerHeight:wfAfter.headerHeight,dockLinks:wfBefore.links,columns:wfBefore.columns,anchorTop:target.top,headerBottom:wfAfter.headerBottom,scrollWidth:wfAfter.scrollWidth}));
 await send('Runtime.evaluate',{expression:"window.scrollTo({top:0,behavior:'instant'})"});
 if(capture){const img=await send('Page.captureScreenshot',{format:'png',fromSurface:true,captureBeyondViewport:false});writeFileSync(join(root,'r173_hero_'+vw+'_t0.png'),Buffer.from(img.data,'base64'));}
 await sleep(2600);const second=await evalState();
 if(capture){const img=await send('Page.captureScreenshot',{format:'png',fromSurface:true,captureBeyondViewport:false});writeFileSync(join(root,'r173_hero_'+vw+'_t1.png'),Buffer.from(img.data,'base64'));}
 const ok=first.satelliteCount===0&&first.linkCount===3&&first.stage.canvasCount===1&&first.dial.display!=='none'&&first.dial.width>=300&&first.dial.border==='rgba(129, 214, 255, 0.77)'&&first.ring.animation==='r173-hud-dial-turn'&&first.counter.animation==='r173-hud-dial-reverse'&&first.environment.gridAnimation==='r173-grid-drift'&&first.environment.beamCount===0&&first.environment.scanCount===0&&first.sectionAnimation==='none'&&first.cardAnimation==='none'&&first.ring.transform!==second.ring.transform&&first.counter.transform!==second.counter.transform&&first.environment.gridTransform!==second.environment.gridTransform&&first.scrollWidth<=vw+2;
 if(!ok)throw Error('R174_IDLE_E2E_FAIL_'+vw+' '+JSON.stringify({first,second}));
 await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await sleep(100);const reduced=await evalState();
 if(reduced.ring.animation!=='none'||reduced.counter.animation!=='none'||reduced.environment.gridAnimation!=='none')throw Error('REDUCED_MOTION_FAIL_'+vw+' '+JSON.stringify(reduced));
 console.log('R174_NO_SCANS_CDP_'+vw+'=PASS '+JSON.stringify({before:first,after:{ringTransform:second.ring.transform,counterTransform:second.counter.transform,gridTransform:second.environment.gridTransform},reduced:'PASS'}));
}
}catch(e){failed=true;console.error('R174_NO_SCANS_CDP_FAIL='+String(e));process.exitCode=1}finally{try{if(send)await send('Browser.close')}catch{};try{ws?.close()}catch{};try{child.kill()}catch{};try{rmSync(profile,{recursive:true,force:true})}catch{}}
