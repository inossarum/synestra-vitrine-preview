'use strict';
// R202.61 read-only source fixture. GPU factorial diagnostic only, no art promotion.
// All stencil/depth changes are ephemeral per-page and reset after each screenshot.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
// Supply approved local Puppeteer path with SYN_PUPPETEER_DIR.
const puppeteer=require(process.env.SYN_PUPPETEER_DIR || 'puppeteer');
const {measureRois,compareRois}=require('./r20261-depth-roi-probe.cjs');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const zip=path.join(__dirname,'release','Synestra_Sphere_R20261_Standalone.zip');
const originalZipSHA='5088f87190de0e0bab84633569c0585664a7151666e29fda1b434c76d0f8ae13';
const url='file:///I:/_STUDIO_STAGING/SYN_LAB_R20261_DD2B_RELEASE_VERIFY_20261103/qa-zip-extracted/index.html';
const out=path.join(__dirname,'qa-stencil-depth-factorial-20261104');
const cases=['baseline','without-stencil','depth-always','without-both','hide-all-clones','baseline-retest'];
const gate={maxDriftCoreGt4:0,maxDriftRingGt4:0,maxDriftOuterGt4:3,channelDifferenceThreshold:4,staticFrame:18};
const zones=(imgA,imgB)=>{
 if(imgA.w!==imgB.w||imgA.h!==imgB.h||imgA.bpp!==imgB.bpp)throw Error('IMAGE_SHAPE_MISMATCH');
 const stats={core:{count:0,changed:0,gt18:0},ring:{count:0,changed:0,gt18:0},outer:{count:0,changed:0,gt18:0}};
 for(let y=0;y<imgA.h;y++)for(let x=0;x<imgA.w;x++){
  const r=Math.hypot(x-imgA.w/2,y-imgA.h/2);
  const z=r<62?'core':r<125?'ring':r<255?'outer':null;
  if(!z)continue;
  const q=(y*imgA.w+x)*imgA.bpp;
  const v=Math.max(...[0,1,2].map(i=>Math.abs(imgA.pixels[q+i]-imgB.pixels[q+i])));
  stats[z].count++;stats[z].changed+=+(v>gate.channelDifferenceThreshold);stats[z].gt18+=+(v>=18);
 }
 return Object.fromEntries(Object.entries(stats).map(([z,s])=>[z,{...s,pct:+(100*s.changed/s.count).toFixed(6)}]));
};
if(require.main===module)(async()=>{
 if(sha(fs.readFileSync(zip))!==originalZipSHA)throw Error('ZIP_SHA_MISMATCH');
 if(fs.existsSync(out))throw Error('OUTPUT_EXISTS_REFUSE_RERUN');
 fs.mkdirSync(out,{recursive:true});
 const {decodePNG}=await import('./tests/siteforge_r174_png_diff.mjs');
 const report={schema:'synestra.r20261.depth_stencil_factorial_gpu.v1',date:'2026-11-04',
  baseCommit:'39a10023d0faf6edc19e73ba3d8565528635ff8d',zipSHA256:originalZipSHA,
  viewport:[1100,900],frame:18,quality:'balanced',power:145,cases,gate,
  notes:'Screen-space pixel effects, NOT exact counts of stencil/depth rejected fragments',
  modes:[],jsErrors:[],externalRequests:[],status:'PENDING',artSignoff:'PENDING'};
 const browser=await puppeteer.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args:['--enable-webgl','--use-gl=angle','--use-angle=d3d11','--disable-software-rasterizer','--disable-background-networking','--no-first-run'],
  defaultViewport:{width:1100,height:900,deviceScaleFactor:1}});
 try{
  for(const mode of ['0','1','2','3']){
   const page=await browser.newPage();
   try{
    page.on('pageerror',e=>report.jsErrors.push('mode'+mode+':'+e.message));
    page.on('request',q=>{if(/^https?:/i.test(q.url()))report.externalRequests.push(q.url())});
    await page.goto(url+'?labFrame=18&qaQuality=balanced&qaPower=145',{waitUntil:'domcontentloaded',timeout:30000});
    await page.waitForFunction(()=>document.querySelector('#renderCanvas')?.dataset.sphereReady==='true',{timeout:30000});
    if(mode!=='0')await page.select('#core-mode',mode);
    await page.waitForFunction(m=>{
      const c=document.querySelector('#renderCanvas');return c?.dataset.mode===m&&c.dataset.envelopeTransition==='false';
    },{timeout:20000},mode);
    const prep=await page.evaluate(()=>{
      const scene=globalThis.__synestraLabAtlasInterop.getScene(),
        engine=globalThis.__synestraLabAtlasInterop.getEngine(),
        cv=document.querySelector('#renderCanvas'),g=cv.getContext('webgl2');
      const ext=g.getExtension('WEBGL_debug_renderer_info');
      const meshes=Array.from({length:6},(_,i)=>scene.getMeshByName('node-plasma-foreground-'+i));
      const mats=[...new Set(meshes.map(x=>x?.material))];
      if(meshes.some(x=>!x)||mats.length!==4||mats.some(m=>!m||!m.stencil.enabled||m.stencil.func!==514||m.depthFunction!==0))
        throw Error('MATERIAL_BASELINE_PRECONDITION');
      const mask=scene.getMeshByName('central nucleus facet depth mask'),core=scene.getMeshByName('central nucleus');
      if(!mask?.material.stencil.enabled||mask.getTotalIndices()/3!==80||core.getTotalIndices()/3!==80||cv.dataset.effectiveQuality!=='balanced'||+cv.dataset.plasmaRibbons!==28||+cv.dataset.energyNodes!==6||document.querySelectorAll('canvas').length!==1||g.isContextLost())
        throw Error('SCENE_INVARIANT_PRECONDITION');
      globalThis.__r20261Factorial={mats,meshes,depth:mats.map(m=>m.depthFunction),stencil:mats.map(m=>m.stencil.enabled)};
      return {renderer:ext?g.getParameter(ext.UNMASKED_RENDERER_WEBGL):g.getParameter(g.RENDERER),
        faceCount:80,maskCount:80,nodes:6,outerRibbons:28,maskStencil:mask.material.stencil.enabled,
        materialCount:mats.length,defaultDepthFunction:mats[0].depthFunction,defaultStencil:mats[0].stencil.enabled,
        depthFunctionAlways:g.ALWAYS};
    });
    if(!/RTX 3090/.test(prep.renderer)||prep.depthFunctionAlways!==519)throw Error('GPU_CHECK_'+JSON.stringify(prep));
    const canvas=await page.$('#renderCanvas'),shots={};
    for(const variant of cases){
      const state=await page.evaluate(name=>{
        const x=globalThis.__r20261Factorial,always=name==='depth-always'||name==='without-both',
          noStencil=name==='without-stencil'||name==='without-both',hidden=name==='hide-all-clones';
        for(let i=0;i<x.mats.length;i++){
          x.mats[i].stencil.enabled=noStencil?false:x.stencil[i];
          x.mats[i].depthFunction=always?519:x.depth[i];
        }
        for(const m of x.meshes)m.isVisible=!hidden;
        const mask=globalThis.__synestraLabAtlasInterop.getScene().getMeshByName('central nucleus facet depth mask');
        if(mask.material.stencil.enabled!==true)throw Error('MASK_MUTATED');
        if(x.mats.some(m=>m.stencil.enabled===noStencil)||x.mats.some(m=>m.depthFunction!==(always?519:0)))
          throw Error('FACTORIAL_STATE_NOT_SET');
        return {stencilEnabled:!noStencil,depthAlways:always,cloneVisible:!hidden,maskUnchanged:true};
      },variant);
      await new Promise(resolve=>setTimeout(resolve,275));
      const buf=await canvas.screenshot();
      if((mode==='0'&&(variant==='baseline'||variant==='without-stencil'||variant==='depth-always'||variant==='without-both'))||
         (mode==='2'&&variant==='baseline'))fs.writeFileSync(path.join(out,'mode'+mode+'_'+variant+'.png'),buf);
      shots[variant]={state,sha256:sha(buf),image:decodePNG(buf)};
    }
    const base=shots.baseline,baseMetrics=measureRois(base.image);
    const comparisons={};
    for(const variant of cases.slice(1)){
      comparisons[variant]={roiPixelDiff:zones(base.image,shots[variant].image),
        roiMeanDelta:compareRois(baseMetrics,measureRois(shots[variant].image)),
        captureSHA256:shots[variant].sha256,
        confirmedTransientState:shots[variant].state};
    }
    const d=comparisons['baseline-retest'].roiPixelDiff;
    const stable=d.core.changed<=gate.maxDriftCoreGt4&&d.ring.changed<=gate.maxDriftRingGt4&&d.outer.changed<=gate.maxDriftOuterGt4;
    report.modes.push({mode,prep,baselineSHA256:base.sha256,stable,comparisons});
    console.log('R20261_FACTORIAL_MODE '+JSON.stringify({mode,stable,
      noStencilCore:comparisons['without-stencil'].roiPixelDiff.core.changed,
      noDepthCore:comparisons['depth-always'].roiPixelDiff.core.changed,
      noBothCore:comparisons['without-both'].roiPixelDiff.core.changed,
      hiddenCore:comparisons['hide-all-clones'].roiPixelDiff.core.changed,
      drift:d}));
    if(!stable)report.jsErrors.push('BASELINE_NONDETERMINISTIC_MODE_'+mode);
   }finally{await page.close()}
  }
  report.status=report.modes.length===4&&report.modes.every(m=>m.stable)&&!report.jsErrors.length&&!report.externalRequests.length?
    'PASS_SCREENSPACE_FACTORIAL_DIAGNOSTIC':'FAILED_SCREENSPACE_DIAGNOSTIC';
  const reportBytes=Buffer.from(JSON.stringify(report,null,2)+'\n','utf8');
  const file=path.join(out,'R20261_STENCIL_DEPTH_FACTORIAL_GPU_REPORT.json');fs.writeFileSync(file,reportBytes);
  console.log('R20261_FACTORIAL_DONE '+JSON.stringify({status:report.status,reportSHA256:sha(reportBytes),modes:report.modes.length,
    jsErrors:report.jsErrors,external:report.externalRequests.length,file}));
  if(report.status!=='PASS_SCREENSPACE_FACTORIAL_DIAGNOSTIC')process.exitCode=3;
 }finally{await browser.close()}
})().catch(e=>{console.error('R20261_FACTORIAL_ERROR '+(e.stack||e));process.exitCode=2});
