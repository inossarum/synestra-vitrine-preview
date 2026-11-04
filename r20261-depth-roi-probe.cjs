'use strict';
// R202.61 — diagnostic ONLY. Never writes to the Babylon source or release ZIP.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const sha256=x=>crypto.createHash('sha256').update(x).digest('hex');
function measureRois(img){
 const {w,h,bpp,pixels}=img||{};
 if(!Number.isInteger(w)||!Number.isInteger(h)||w<1||h<1||![3,4].includes(bpp))
  throw Error('IMAGE_DIMENSIONS_INVALID');
 if(!pixels||pixels.length!==w*h*bpp)throw Error('PIXEL_BUFFER_INVALID');
 const s={core:{count:0,luma:0,blue:0,edge:0,edgeCount:0},
  ring:{count:0,luma:0,blue:0,edge:0,edgeCount:0},
  outer:{count:0,luma:0,blue:0,edge:0,edgeCount:0}};
 const cx=w/2,cy=h/2;
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){
  const r=Math.hypot(x-cx,y-cy);
  const zone=r<62?'core':r<125?'ring':r<255?'outer':null;
  if(!zone)continue;
  const i=(y*w+x)*bpp,red=pixels[i],green=pixels[i+1],blue=pixels[i+2];
  const z=s[zone],lum=(red+green+blue)/3;
  z.count++;z.luma+=lum;z.blue+=blue-(red+green)/2;
  if(x+1<w&&Math.hypot(x+1-cx,y-cy)<(zone==='core'?62:zone==='ring'?125:255)){
   const j=i+bpp,n=(pixels[j]+pixels[j+1]+pixels[j+2])/3;
   z.edge+=Math.abs(lum-n);z.edgeCount++;
  }
 }
 const result={};
 for(const [k,v] of Object.entries(s)){
  if(!v.count)throw Error('ROI_EMPTY_'+k);
  result[k]={count:v.count,meanLuma:v.luma/v.count,blueVsRG:v.blue/v.count,
   edgeGradient:v.edgeCount?v.edge/v.edgeCount:0};
 }
 return result;
}
function compareRois(a,b){
 return Object.fromEntries(['core','ring','outer'].map(k=>
  [k,{meanLuma:b[k].meanLuma-a[k].meanLuma,
      blueVsRG:b[k].blueVsRG-a[k].blueVsRG,
      edgeGradient:b[k].edgeGradient-a[k].edgeGradient}]));
}
function changedPixels(a,b){
 if(a.w!==b.w||a.h!==b.h||a.bpp!==b.bpp)throw Error('PNG_DIMENSIONS_MISMATCH');
 const zones={core:[0,0],ring:[0,0],outer:[0,0]};
 const cx=a.w/2,cy=a.h/2;
 for(let y=0;y<a.h;y++)for(let x=0;x<a.w;x++){
  const r=Math.hypot(x-cx,y-cy),k=r<62?'core':r<125?'ring':r<255?'outer':null;
  if(!k)continue;
  const i=(y*a.w+x)*a.bpp;
  zones[k][1]++;
  if(Math.max(...[0,1,2].map(c=>Math.abs(a.pixels[i+c]-b.pixels[i+c])))>=18)zones[k][0]++;
 }
 return Object.fromEntries(Object.entries(zones).map(([k,[changed,total]])=>[k,100*changed/total]));
}
async function run(){
 const url=process.env.SYN_SPHERE_URL;
 const puppeteerDir=process.env.SYN_PUPPETEER_DIR;
 if(!url||!url.startsWith('file:///')||!puppeteerDir)throw Error('NEED_LOCAL_FILE_URL_AND_PUPPETEER_DIR');
 const puppeteer=require(puppeteerDir);
 const {decodePNG}=await import('./tests/siteforge_r174_png_diff.mjs');
 const output=path.join(__dirname,'qa-depth-roi');
 if(fs.existsSync(output)&&fs.readdirSync(output).length)throw Error('QA_OUTPUT_EXISTS_NO_OVERWRITE');
 fs.mkdirSync(output,{recursive:true});
 const report={schema:'synestra.r20261.depth-roi-diagnostic.v1',
  baseHead:'dd2b0f1eecf3e2782d750df7e4dea811ed285a8d',
  viewport:[1100,900],frame:18,powerPercent:145,quality:'balanced',modes:[],
  errors:[],external:[],status:'PENDING',artSignoff:'PENDING'};
 const browser=await puppeteer.launch({headless:true,
   executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',
   args:['--enable-webgl','--use-gl=angle','--use-angle=d3d11','--disable-software-rasterizer',
         '--disable-background-networking','--no-first-run'],
   defaultViewport:{width:1100,height:900,deviceScaleFactor:1}});
 try{
  for(const mode of ['0','1','2','3']){
   const page=await browser.newPage();
   try{
    page.on('pageerror',e=>report.errors.push('mode'+mode+':'+e.message));
    page.on('request',r=>{if(/^https?:/i.test(r.url()))report.external.push(r.url());});
    await page.goto(url+'?labFrame=18&qaQuality=balanced&qaPower=145',
     {waitUntil:'domcontentloaded',timeout:25000});
    await page.waitForFunction(()=>document.querySelector('#renderCanvas')?.dataset.sphereReady==='true',{timeout:25000});
    if(mode!=='0')await page.select('#core-mode',mode);
    await page.waitForFunction(m=>document.querySelector('#renderCanvas')?.dataset.mode===m&&
      document.querySelector('#renderCanvas')?.dataset.envelopeTransition==='false',{timeout:15000},mode);
    const state=await page.evaluate(()=>{
     const c=document.querySelector('#renderCanvas'),g=c.getContext('webgl2'),
       ext=g.getExtension('WEBGL_debug_renderer_info'),s=globalThis.__synestraLabAtlasInterop.getScene();
     return{renderer:ext?g.getParameter(ext.UNMASKED_RENDERER_WEBGL):g.getParameter(g.RENDERER),
       quality:c.dataset.effectiveQuality,faces:s.getMeshByName('central nucleus').getTotalIndices()/3,
       mask:s.getMeshByName('central nucleus facet depth mask').getTotalIndices()/3,
       ribbons:+c.dataset.plasmaRibbons,nodes:+c.dataset.energyNodes,mode:c.dataset.mode,
       lost:g.isContextLost(),canvasCount:document.querySelectorAll('canvas').length};
    });
    if(!/RTX 3090/.test(state.renderer)||state.quality!=='balanced'||state.faces!==80||
       state.mask!==80||state.ribbons!==28||state.nodes!==6||state.mode!==mode||
       state.lost||state.canvasCount!==1)throw Error('GPU_INVARIANT_'+JSON.stringify(state));
    const canvas=await page.$('#renderCanvas');
    const cases=['original','mist-hidden','volume-hidden','ribbons-hidden','original-retest'];
    const views=[];
    for(const variant of cases){
     const stateVisibility=await page.evaluate(variant=>{
      const meshes=globalThis.__synestraLabAtlasInterop.getScene().meshes;
      if(!globalThis.__r20261Original)globalThis.__r20261Original=meshes.map(m=>[m,m.isVisible]);
      const hidden=[];
      for(const [m,original] of globalThis.__r20261Original){
       const name=m.name.toLowerCase();
       const excluded=variant==='mist-hidden'?name.includes('core plasma diffusion'):
        variant==='volume-hidden'?name.includes('r20215')||name.includes('volume'):
        variant==='ribbons-hidden'?name.includes('ribbon')||name.includes('plasma stream'):false;
       m.isVisible=original&&!excluded;
       if(original&&excluded)hidden.push(m.name);
      }
      return {hiddenCount:hidden.length,hiddenSample:hidden.slice(0,4)};
     },variant);
     await new Promise(r=>setTimeout(r,220));
     const name='mode'+mode+'_'+variant+'.png',file=path.join(output,name);
     const buf=await canvas.screenshot({path:file});
     const pixels=decodePNG(buf);
     views.push({variant,metrics:measureRois(pixels),pixels,
       hiddenCount:stateVisibility.hiddenCount,
       hiddenSample:stateVisibility.hiddenSample,
       sha256:sha256(buf),image:name});
    }
    const original=views[0],retest=views.at(-1);
    const result={mode,renderer:state.renderer,geometry:state,
      baseline:original.metrics,retest:compareRois(original.metrics,retest.metrics),
      driftPercent:changedPixels(original.pixels,retest.pixels),layers:[]};
    for(const view of views.slice(1,-1))result.layers.push({
     variant:view.variant,hiddenCount:view.hiddenCount,hiddenSample:view.hiddenSample,
     delta:compareRois(original.metrics,view.metrics),
     changedPercent:changedPixels(original.pixels,view.pixels),
     captureSha256:view.sha256});
    report.modes.push(result);
    console.log('R20261_ROI_MODE '+JSON.stringify({
     mode,driftPercent:result.driftPercent,layers:result.layers.map(x=>({
      variant:x.variant,hiddenCount:x.hiddenCount,coreLumaDelta:x.delta.core.meanLuma,
      coreEdgeDelta:x.delta.core.edgeGradient,outerLumaDelta:x.delta.outer.meanLuma,
      changedCorePercent:x.changedPercent.core}))}));
   }finally{await page.close();}
  }
  const p=await browser.newPage();
  try{
   p.on('pageerror',e=>report.errors.push('power0:'+e.message));
   p.on('request',r=>{if(/^https?:/i.test(r.url()))report.external.push(r.url());});
   await p.goto(url+'?labFrame=18&qaQuality=balanced&qaPower=145',
    {waitUntil:'domcontentloaded',timeout:25000});
   await p.waitForFunction(()=>document.querySelector('#renderCanvas')?.dataset.sphereReady==='true',{timeout:25000});
   await p.$eval('#core-power',e=>{e.value='0';e.dispatchEvent(new Event('input',{bubbles:true}));});
   await p.waitForFunction(()=>document.querySelector('#renderCanvas')?.dataset.facetDepthActive==='false',{timeout:7000});
   report.powerZero=true;
  }finally{await p.close();}
  if(report.errors.length||report.external.length||report.modes.length!==4||!report.powerZero)
   throw Error('BROWSER_ERRORS_OR_INCOMPLETE_'+JSON.stringify(report.errors));
  report.maxDriftCorePercent=Math.max(...report.modes.map(m=>m.driftPercent.core));
  report.status=report.maxDriftCorePercent>0.12?'DIAGNOSTIC_UNSTABLE':'PASS_DIAGNOSTIC';
  const serialized=JSON.stringify(report,null,2)+'\n';
  const file=path.join(output,'R20261_DEPTH_ROI_GPU_REPORT.json');
  fs.writeFileSync(file,serialized,'utf8');
  console.log('R20261_DEPTH_ROI_DONE '+JSON.stringify({status:report.status,
    modes:report.modes.length,maxDriftCorePercent:report.maxDriftCorePercent,
    reportSHA256:sha256(Buffer.from(serialized)),errors:report.errors.length,
    external:report.external.length,output:file}));
  if(report.status!=='PASS_DIAGNOSTIC')process.exitCode=3;
 }finally{await browser.close();}
}
module.exports={measureRois,compareRois,changedPixels};
if(require.main===module)run().catch(e=>{console.error('R20261_DEPTH_ROI_ERROR '+(e.stack||e));process.exitCode=2;});
