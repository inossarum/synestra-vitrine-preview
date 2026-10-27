import { spawn } from 'node:child_process';
import { readFileSync, existsSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { inspectCapture, CAPTURE_SCHEMA } from '../tools/web_pilot_core.mjs';
import { fromCdpMetrics, inspectLabMetrics } from '../tools/web_pilot_lab.mjs';
const root = process.cwd();
const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const profile = mkdtempSync(join(tmpdir(),'synestra-vitrine-cdp-'));
const url = pathToFileURL(join(root,'index.html')).href;
const args = ['--headless=new','--disable-gpu','--disable-extensions','--disable-background-networking','--no-first-run','--no-default-browser-check','--remote-debugging-address=127.0.0.1','--remote-debugging-port=0','--user-data-dir='+profile,url];
const child = spawn(chrome,args,{stdio:'ignore',windowsHide:true});
const sleep = ms => new Promise(r=>setTimeout(r,ms));
let ws;
let closeBrowser=async()=>{};
try {
  const portPath=join(profile,'DevToolsActivePort');
  for(let i=0;i<60&&!existsSync(portPath);i++)await sleep(150);
  if(!existsSync(portPath))throw Error('DEVTOOLS_START_TIMEOUT');
  // On Windows Chrome may briefly hold DevToolsActivePort with a sharing lock.
  // Retry only transient file-sharing failures; do not hide other I/O errors.
  let portText;
  for(let attempt=0;attempt<20;attempt++){
    try {portText=readFileSync(portPath,'utf8');break}
    catch(error){
      if(!['EBUSY','EPERM'].includes(error?.code)||attempt===19)throw error;
      await sleep(100);
    }
  }
  const port=Number(portText.trim().split(/\r?\n/)[0]);
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
  closeBrowser=()=>call('Browser.close');
  const outOfScopeRequests=[];
  ws.addEventListener('message',evt=>{
    try{
      const m=JSON.parse(evt.data);
      const uri=m.params?.request?.url;
      if(m.method==='Network.requestWillBeSent' && typeof uri==='string' && /^https?:/i.test(uri)
          && !/^http:\/\/127\.0\.0\.1:\d+\/json\//.test(uri))
        outOfScopeRequests.push(1);
    }catch{}
  });
  await call('Page.enable');
  await call('Network.enable');
  await call('Performance.enable',{timeDomain:'timeTicks'});
  for(const view of [{name:'mobile',width:390,height:844,mobile:true},{name:'desktop',width:1440,height:900,mobile:false}]){
    await call('Emulation.setDeviceMetricsOverride',{width:view.width,height:view.height,deviceScaleFactor:1,mobile:view.mobile});
    await call('Page.reload',{ignoreCache:true});
    await sleep(450);
    const metrics=await call('Runtime.evaluate',{expression:"JSON.stringify({width:innerWidth,rootScrollWidth:document.documentElement.scrollWidth,bodyScrollWidth:document.body.scrollWidth,ready:document.readyState,faq:document.querySelectorAll('#questions details').length})",returnByValue:true});
    const m=JSON.parse(metrics.result.value);
    if(m.width!==view.width||m.rootScrollWidth>view.width+1||m.bodyScrollWidth>view.width+1||m.faq!==5||m.ready!=='complete')throw Error('VIEWPORT_FAIL '+view.name+' '+JSON.stringify(m));

    // R93: verify real CSS motion control and Bridge/Connect presence in the DOM.
    const ux=await call('Runtime.evaluate',{expression:"JSON.stringify((()=>{const stage=document.querySelector('.system-stage');const product=document.querySelector('#plateforme');const bridge=document.querySelector('#bridge');const connect=document.querySelector('#connect');const strip=document.querySelector('.motion-strip-inner');const bb=stage?.getBoundingClientRect();return {stage:!!stage,product:!!product,bridge:!!bridge,connect:!!connect,strip:!!strip,visible:!!bb&&bb.width>100&&bb.left>=-1&&bb.right<=innerWidth+1,animation:strip?getComputedStyle(strip).animationName:null}})())",returnByValue:true});
    const u=JSON.parse(ux.result.value);
    if(!u.stage||!u.product||!u.bridge||!u.connect||!u.strip||!u.visible||u.animation!=='strip-slide')throw Error('R93_PRODUCT_STAGE_FAIL '+view.name+' '+JSON.stringify(u));
    await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
    const reduced=await call('Runtime.evaluate',{expression:"JSON.stringify({strip:getComputedStyle(document.querySelector('.motion-strip-inner')).animationName,node:getComputedStyle(document.querySelector('.system-node')).animationName,ring:getComputedStyle(document.querySelector('.orbit-one')).animationName})",returnByValue:true});
    const a=JSON.parse(reduced.result.value);
    if(a.strip!=='none'||a.node!=='none'||a.ring!=='none')throw Error('R93_REDUCED_MOTION_FAIL '+view.name+' '+JSON.stringify(a));
    await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
    console.log('R93_STAGE_AND_REDUCED_MOTION_'+view.name.toUpperCase()+'=PASS '+JSON.stringify(u));

    // R96: check the actual owner-approved logo bytes decoded by Chrome.
    const identity=await call('Runtime.evaluate',{expression:"JSON.stringify((()=>{const vars=getComputedStyle(document.documentElement);const brand=document.querySelector('.brand-banner-r99');const hero=document.querySelector('.official-hero-logo');const hr=hero?.getBoundingClientRect();const core=hero?.parentElement;return {ink:vars.getPropertyValue('--ink').trim(),violet:vars.getPropertyValue('--brand-violet').trim(),family:vars.fontFamily,brandLoaded:!!brand&&brand.complete&&brand.naturalWidth===785,brandVisible:!!brand&&getComputedStyle(brand).display!=='none',brandSrc:brand?.currentSrc||'',headerImgs:document.querySelectorAll('header.site-header img').length,heroLoaded:!!hero&&hero.complete&&hero.naturalWidth===400,heroShown:!!hero&&getComputedStyle(hero).display!=='none',filter:hero?getComputedStyle(hero).filter:'',animation:hero?getComputedStyle(hero).animationName:'',objectFit:hero?getComputedStyle(hero).objectFit:'',parentOverflow:core?getComputedStyle(core).overflow:'',fits:!!hr&&hr.width>50&&hr.right<=innerWidth+1,src:hero?.currentSrc||''}})())",returnByValue:true});
    const palette=JSON.parse(identity.result.value);
    if(palette.ink!=='#060b12'||palette.violet!=='#8a58ec'||!palette.family.includes('Inter')||
      !palette.brandLoaded||!palette.brandVisible||!palette.brandSrc.endsWith('assets/synestra-studio-header-y-r99.webp')||palette.headerImgs!==1||!palette.heroLoaded||!palette.heroShown||
      !palette.filter.includes('brightness(0.72) saturate(0.58)')||palette.animation!=='none'||palette.objectFit!=='contain'||palette.parentOverflow!=='visible'||!palette.fits||
      !palette.src.endsWith('assets/synestra-studio-official-v1.avif')) {
      throw Error('R96_OFFICIAL_LOGO_NOT_DISPLAYED '+view.name+' '+JSON.stringify(palette));
    }
    console.log('R96_OFFICIAL_LOGO_'+view.name.toUpperCase()+'=PASS '+JSON.stringify(palette));

    // R95/R96: animated composition remains active, but freezes on request.
    const kinetic=await call('Runtime.evaluate',{expression:"JSON.stringify((()=>{const get=(s,p)=>getComputedStyle(document.querySelector(s),p||null);return {radar:get('.system-stage','::after').animationName,track:get('.connect-track').animationName,node:get('.system-node','::after').animationName,logo:get('.official-hero-logo').animationName,workflow:get('.workflow-arrow').animationName}})())",returnByValue:true});
    const k=JSON.parse(kinetic.result.value);
    if(k.radar!=='cin-radar'||k.track!=='cin-connect'||k.node!=='cin-glint'||k.logo!=='none'||k.workflow!=='workflow-pulse')
      throw Error('R96_CINEMATIC_COMPOSITION_FAIL '+view.name+' '+JSON.stringify(k));
    await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
    const pauseProof=await call('Runtime.evaluate',{expression:"JSON.stringify({radar:getComputedStyle(document.querySelector('.system-stage'),'::after').animationName,track:getComputedStyle(document.querySelector('.connect-track')).animationName,logo:getComputedStyle(document.querySelector('.official-hero-logo')).animationName,arrow:getComputedStyle(document.querySelector('.workflow-arrow')).animationName})",returnByValue:true});
    const pr=JSON.parse(pauseProof.result.value);
    if(Object.values(pr).some(x=>x!=='none'))throw Error('R96_REDUCED_MOTION_FAIL '+view.name+' '+JSON.stringify(pr));
    await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
    console.log('R96_KINETIC_AND_REDUCED_MOTION_'+view.name.toUpperCase()+'=PASS '+JSON.stringify(k));

    const open=await call('Runtime.evaluate',{expression:"(() => {let d=document.querySelector('#questions details');let was=d.open; d.querySelector('summary').click();let opened=d.open; d.querySelector('summary').click();return !was&&opened&&!d.open;})()",returnByValue:true});
    if(open.result.value!==true)throw Error('FAQ_INTERACTION_FAIL '+view.name);
    const shot=await call('Page.captureScreenshot',{format:'png',fromSurface:true,captureBeyondViewport:false});
    const target=join(root,'cdp-'+view.name+'.png');
    writeFileSync(target,Buffer.from(shot.data,'base64'));
    console.log('BROWSER_'+view.name.toUpperCase()+'=PASS '+JSON.stringify(m)+' screenshot='+target);
    // Native keyboard interaction: enter through the skip link and FAQ summary.
    const focusResult=await call('Runtime.evaluate',{expression:"(() => {const m=document.querySelector('main#contenu');const s=document.querySelector('a.skip[href=\"#contenu\"]');if(!m||m.tabIndex!==-1||!s)return false;s.focus();return document.activeElement===s && getComputedStyle(s).left!=='-9999px';})()",returnByValue:true});
    if(focusResult.result.value!==true)throw Error('SKIP_FOCUS_FAIL '+view.name);
    const pressKey=async(key,code,virtualKey)=>{
      const args={key,code,windowsVirtualKeyCode:virtualKey,nativeVirtualKeyCode:virtualKey};
      await call('Input.dispatchKeyEvent',{type:'keyDown',text:key==='Enter'?String.fromCharCode(13):' ',unmodifiedText:key==='Enter'?String.fromCharCode(13):' ',...args});
      await call('Input.dispatchKeyEvent',{type:'keyUp',...args});
    };
    await pressKey('Enter','Enter',13);
    const focused=await call('Runtime.evaluate',{expression:"document.activeElement?.id==='contenu'",returnByValue:true});
    if(focused.result.value!==true)throw Error('SKIP_ENTER_TARGET_FAIL '+view.name);
    for(const [keyName,keyCode,virtualKey] of [['Enter','Enter',13],[' ','Space',32]]){
      const start=await call('Runtime.evaluate',{expression:"(() => {const item=document.querySelector('#questions details');item.open=false;item.querySelector('summary').focus();return document.activeElement===item.querySelector('summary')})()",returnByValue:true});
      if(start.result.value!==true)throw Error('FAQ_KEYBOARD_FOCUS_FAIL '+view.name);
      await pressKey(keyName,keyCode,virtualKey);
      const opened=await call('Runtime.evaluate',{expression:"document.querySelector('#questions details').open",returnByValue:true});
      if(opened.result.value!==true)throw Error('FAQ_KEYBOARD_OPEN_FAIL '+view.name+' '+keyCode);
      await pressKey(keyName,keyCode,virtualKey);
      const closed=await call('Runtime.evaluate',{expression:"!document.querySelector('#questions details').open",returnByValue:true});
      if(closed.result.value!==true)throw Error('FAQ_KEYBOARD_CLOSE_FAIL '+view.name+' '+keyCode);
    }
    console.log('KEYBOARD_'+view.name.toUpperCase()+'=PASS');

    // Innovative Pilot audit: real DOM, independent CDP accessibility tree and local
    // request observation. It is advisory and never certifies WCAG or field CWV.
    const domExpr = "JSON.stringify((() => {const el=q=>[...document.querySelectorAll(q)];const clean=x=>String(x||'').trim().slice(0,256);return {schema:'synestra.web-pilot.capture.v1',viewport:{width:innerWidth,height:innerHeight},ids:el('[id]').slice(0,256).map(x=>clean(x.id)),sections:el('main[id],section[id]').slice(0,256).map(x=>clean(x.id)),headings:el('h1,h2,h3,h4,h5,h6').slice(0,256).map(x=>({level:Number(x.tagName.slice(1)),text:clean(x.textContent)})),links:el('a[href]').slice(0,256).map(x=>({href:clean(x.getAttribute('href')),name:clean(x.getAttribute('aria-label')||x.textContent)})),overflowPixels:Math.max(0,Math.ceil(document.documentElement.scrollWidth-innerWidth))}})())";
    const dom=await call('Runtime.evaluate',{expression:domExpr,returnByValue:true});
    if(!dom?.result?.value)throw Error('WEB_PILOT_DOM_EMPTY '+view.name);
    const capture=JSON.parse(dom.result.value);
    const ax=await call('Accessibility.getFullAXTree');
    const allowedRoles=new Set(['link','button','textField','checkBox','comboBox','radio','searchBox','switch']);
    capture.axInteractive=(ax.nodes||[]).filter(x=>!x.ignored&&allowedRoles.has(x.role?.value))
      .slice(0,256).map(x=>({role:String(x.role.value).slice(0,256),name:String(x.name?.value||'').slice(0,256)}));
    capture.focus=[{name:'skip link Enter',visible:true},{name:'FAQ Enter and Space',visible:true}];
    capture.externalRequests=outOfScopeRequests.length;
    const audit=inspectCapture(capture);
    if(audit.status==='REJECTED')throw Error('WEB_PILOT_CAPTURE_REJECTED '+view.name);
    const labAfter=(await call('Performance.getMetrics')).metrics;
    const lab=fromCdpMetrics({width:view.width,height:view.height},labAfter);
    const labAudit=inspectLabMetrics(lab);
    if(labAudit.status==='REJECTED')throw Error('LAB_CAPTURE_REJECTED '+view.name);
    console.log('LAB_PILOT_'+view.name.toUpperCase()+'='+labAudit.status+' '+JSON.stringify({metrics:lab.metrics,missing:labAudit.missing,fieldCWV:false}));
    const pilotFile=join(root,'web-pilot-'+view.name+'.json');
    writeFileSync(pilotFile,JSON.stringify({
      schema:'synestra.web-pilot.audit.v1',origin:'LOCAL_HTML_UNVERIFIED',viewport:view.name,
      capture,audit,lab,labAudit
    },null,2)+'\n');
    console.log('WEB_PILOT_'+view.name.toUpperCase()+'='+audit.status+' '+JSON.stringify({
      issues:audit.issues,summary:audit.summary,report:pilotFile
    }));
    if(audit.status==='REVIEW_REQUIRED')throw Error('WEB_PILOT_REGRESSION_REVIEW '+view.name);

  }
  console.log('BROWSER_REAL_VIEWPORT_QA_PASS');
} finally {
  // Close this test-owned Chrome instance before removing its temporary profile.
  // CDP may disconnect before acknowledging Browser.close; never hang teardown.
  try{await Promise.race([closeBrowser(),sleep(900)])}catch{}
  try{ws?.close()}catch{}
  if(child.exitCode===null)try{child.kill()}catch{}
  if(child.exitCode===null)await Promise.race([
    new Promise(resolve=>child.once('exit',resolve)),sleep(1800)
  ]);
  try{rmSync(profile,{recursive:true,force:true,maxRetries:8,retryDelay:200})}catch(error){console.log('CDP_PROFILE_CLEANUP_PENDING '+(error?.code || 'UNKNOWN'))}
}
