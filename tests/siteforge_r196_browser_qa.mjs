import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const base='http://127.0.0.1:18850/r196/';
const routes=['','connect/','bridge/','siteforge/','offres/'];
const pages=await (await fetch('http://127.0.0.1:18851/json')).json();
const page=pages.find(p=>p.type==='page');
assert.ok(page?.webSocketDebuggerUrl,'Chrome CDP 18851 missing');
const ws=new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve,reject)=>{ws.addEventListener('open',resolve,{once:true});ws.addEventListener('error',reject,{once:true});});
let id=0;const pending=new Map();
ws.addEventListener('message',event=>{
 const m=JSON.parse(event.data);if(!m.id)return;
 const cb=pending.get(m.id);if(!cb)return;
 pending.delete(m.id);if(m.error)cb.reject(Error(JSON.stringify(m.error)));else cb.resolve(m.result);
});
const send=(method,params={})=>new Promise((resolve,reject)=>{
 const n=++id;pending.set(n,{resolve,reject});ws.send(JSON.stringify({id:n,method,params}));
});
const evalJs=async expression=>{
 const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});
 if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));
 return r.result.value;
};
const expression="(()=>{"+
"const w=window.innerWidth,doc=document.documentElement;"+
"const a=[...document.querySelectorAll('a[href]')];"+
"const field=document.querySelector('.syn-ambient-field');"+
"const image=document.querySelector('header img');"+
"const css=[...document.styleSheets].map(s=>s.href).filter(Boolean);"+
"const scripts=[...document.scripts].map(s=>s.src);"+
"const title=document.querySelector('h1')?.innerText||'';"+
"return {url:location.pathname,viewport:w,docWidth:doc.scrollWidth,bodyWidth:document.body.scrollWidth,"+
"background:field?{childCount:field.children.length,hidden:field.getAttribute('aria-hidden'),pointerEvents:getComputedStyle(field).pointerEvents}:null,"+
"css,scripts,title,canvasCount:document.querySelectorAll('canvas').length,logo:image?{loaded:image.complete&&image.naturalWidth>0,src:image.currentSrc}:null,"+
"navigation:a.filter(x=>x.closest('.site-nav')).map(x=>x.textContent.trim()),links:a.length,"+
"firstSection:document.querySelector('section')?.getBoundingClientRect().width||0};"+
"})()";
const results=[];
await send('Page.enable');await send('Runtime.enable');
for(const width of [1440,768,390]){
 await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width===390});
 for(const path of routes){
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
  await send('Page.navigate',{url:base+path});
  let ok=false;
  for(let n=0;n<35;n++){
   await sleep(130);
   const state=await evalJs('document.readyState');
   if(state==='complete'){ok=true;break;}
  }
  assert.ok(ok,'Load timeout: '+path);
  await sleep(300);
  const e=await evalJs(expression);
  const sharedCss=await evalJs("(()=>{const s=[...document.styleSheets].find(s=>s.href?.includes('r194-editorial.css'));try{return s?.cssRules?.length||0}catch(e){return 0}})()");
  assert.ok(sharedCss>30,'R192 CSS rules not applied: '+path+' '+width);
  if(path===''){
    const first=await evalJs("(()=>{const hero=document.querySelector('.r192-hero').getBoundingClientRect(),h1=document.querySelector('h1').getBoundingClientRect(),c=document.querySelector('.core-r109-canvas'),floor=document.querySelector('.r192-floor');return {top:hero.top,scrollY:scrollY,mainTop:document.querySelector('main').getBoundingClientRect().top,bodyPadding:getComputedStyle(document.body).paddingTop,bodyMargin:getComputedStyle(document.body).marginTop,heroMargin:getComputedStyle(document.querySelector('.r192-hero')).marginTop,height:hero.height,vh:innerHeight,titleTop:h1.top,reflection:getComputedStyle(c).webkitBoxReflect,mirrored:!!document.querySelector('.r192-floor-reflection'),light:getComputedStyle(document.querySelector('.r192-floor-light')).backgroundImage,ground:getComputedStyle(floor).position,colors:[...document.querySelectorAll('[data-sphere-control]')].filter(e=>['secondary','rim'].includes(e.dataset.sphereControl)).map(e=>e.value)}})()");
    assert.ok(Math.abs(first.top)<3&&Math.abs(first.height-first.vh)<3,'Fullscreen hero does not occupy arrival viewport: '+width+JSON.stringify(first));
    assert.ok(first.titleTop>=first.vh-5,'Editorial title visible before scroll');
    assert.equal(first.reflection,'none','WebGL image reflection enabled');
    assert.equal(first.mirrored,false,'Old reflected sprite exists');
    assert.equal(first.ground,'absolute');
    assert.ok(first.light.includes('radial-gradient'),'Projected lighting missing');
    assert.deepEqual(first.colors,['#552a9d','#55d49a'],'Official violet and green not applied to shader controls');
    console.log('PASS FULLSCREEN',width,first.height,'title below fold',first.titleTop);
  }
  if(path===''&&width===1440){
    const floor=await evalJs("({position:getComputedStyle(document.querySelector('.r192-floor')).position,opacity:getComputedStyle(document.querySelector('.r192-floor-sheen')).opacity,sceneHeight:document.querySelector('.r192-scene').getBoundingClientRect().height})");
    assert.equal(floor.position,'absolute','Metal floor absent');
    assert.ok(floor.sceneHeight>550,'Scene too small');
  }
  assert.ok(e.title,'Missing page title '+path);
  assert.ok(e.background&&e.background.childCount>20&&e.background.hidden==='true','Ambient not running '+path);
  assert.equal(e.background.pointerEvents,'none','Ambient intercepts input');
  assert.ok(e.logo?.loaded,'Official logo failed '+path);
  assert.ok(e.css.some(x=>x.includes('r191-system.css')),'Shared CSS missing '+path);
  assert.ok(e.scripts.some(x=>x.includes('r191-ambient.js')),'Shared animation JS missing '+path);
  assert.ok(e.navigation.some(x=>x.includes('Bridge')),'Missing primary navigation '+path);
  assert.ok(e.docWidth <= width+2&&e.bodyWidth<=width+2,'Horizontal overflow '+path+' '+width+' '+e.docWidth+'/'+e.bodyWidth);
  if(path==='')assert.equal(e.canvasCount,1,'Home must retain ONE WebGL canvas');
  else assert.equal(e.canvasCount,0,'Product page added canvas');
  const filename='r196-'+(path||'studio').replace('/','')+'-'+width+'.png';
  const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
  writeFileSync(join(root,filename),Buffer.from(shot.data,'base64'));
  if(path===''&&width===1440){
    await send('Runtime.evaluate',{expression:'window.scrollTo(0,170)'});
    await sleep(320);
    const sceneShot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
    writeFileSync(join(root,'r195-scene-1440.png'),Buffer.from(sceneShot.data,'base64'));
    await send('Runtime.evaluate',{expression:'window.scrollTo(0,0)'});
  }
  results.push({path:path||'studio',width,...e,screenshot:filename,pass:true});
  console.log('PASS',width,path||'studio','width',e.docWidth,'ambient',e.background.childCount);
 }
}
// Real user scroll: background progress, chapter marker, and reveal must react.
await send('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});
await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
await send('Page.navigate',{url:base});
await sleep(780);
await send('Runtime.evaluate',{expression:"window.scrollTo({top:2400,behavior:'instant'})"});
await sleep(850);
const scrolled=await evalJs("({scrollY:window.scrollY,progress:getComputedStyle(document.documentElement).getPropertyValue('--r192-progress'),marker:document.querySelector('.r194-rail')?.classList.contains('shown'),revealed:document.querySelectorAll('[data-r194-view].r194-visible').length,unrevealed:document.querySelectorAll('[data-r194-view]:not(.r194-visible)').length})");
console.log('R192_SCROLL_DIAG',JSON.stringify(scrolled));
assert.ok(scrolled.scrollY>1200,'Scroll did not move');
assert.ok(parseFloat(scrolled.progress)>4,'Scroll progress frozen');
assert.ok(scrolled.marker,'Chapter indicator not activated');
assert.ok(scrolled.revealed>=1,'No progressive chapter reveal at the actual scroll position');
console.log('PASS SCROLL',JSON.stringify(scrolled));
await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
await send('Page.navigate',{url:base+'connect/'});
await sleep(650);
const reduced=await evalJs("({ambient:!!document.querySelector('.syn-ambient-field'),prefers:matchMedia('(prefers-reduced-motion: reduce)').matches})");
assert.equal(reduced.prefers,true);
assert.equal(reduced.ambient,false,'Reduced-motion must not inject animations');
writeFileSync(join(root,'evidence','SITEFORGE_R196_BROWSER_20261028.json'),JSON.stringify({
 schema:'synestra.siteforge.r196.browser.qa.v1',results,reduced,scrolled,passed:results.length,failed:0,source:'Chrome CDP 18851/local HTTP 18850',status:'PASS'
},null,2)+'\n');
console.log(JSON.stringify({total:results.length,reduced,status:'PASS'},null,2));
ws.close();
