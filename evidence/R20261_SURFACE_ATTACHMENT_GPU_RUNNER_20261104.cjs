'use strict';
// Native GPU A/B for a NEW local surface-attachment experiment. No orbital test.
// Does not change the release ZIP, source reference or owner art signoff.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
// Publicly archived runner: supply the approved local path via SYN_PUPPETEER_DIR.
const puppeteer=require(process.env.SYN_PUPPETEER_DIR || 'puppeteer');
const {measureRois,compareRois,changedPixels}=require('../SYN_LAB_R20261_MIST_OPACITY_EXP_20261104/r20261-depth-roi-probe.cjs');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const root=__dirname;
const fixture='file:///I:/_STUDIO_STAGING/SYN_LAB_R20261_DD2B_RELEASE_VERIFY_20261103/qa-zip-extracted/index.html';
const candidate='file:///I:/_STUDIO_STAGING/SYN_LAB_R20261_SURFACE_ATTACHMENT_EXP_20261104/qa-surface-attachment/candidate/index.html';
const out=path.join(root,'qa-surface-attachment','captures');
const gates={ringChangedPctMin:.5,ringMeanLumaDeltaMin:.05,coreEdgeGradientMin:-.05,coreMeanLumaDeltaMin:-.5,outerMeanLumaDeltaAbsMax:1.0,driftPctMax:.12};
const report={schema:'synestra.r20261.surface-attachment.fixed-view-gpu-ab.v1',date:'2026-11-04',
  originalZipSha256:'5088f87190de0e0bab84633569c0585664a7151666e29fda1b434c76d0f8ae13',
  candidateBranch:'task/SYN_LAB_R20261_SURFACE_ATTACHMENT_EXP_20261104',
  expectedRenderer:'NVIDIA RTX 3090 ANGLE D3D11',
  viewport:[1100,900],frame:18,powerPct:145,quality:'balanced',
  gates,profiles:[],errors:[],external:[],artSignoff:'PENDING',status:'PENDING'};
async function main(){
 if(fs.existsSync(out)&&fs.readdirSync(out).length)throw Error('OUTPUT_DIRECTORY_EXISTS_REFUSE_OVERWRITE');
 fs.mkdirSync(out,{recursive:true});
 const {decodePNG}=await import('./tests/siteforge_r174_png_diff.mjs');
 const browser=await puppeteer.launch({headless:true,
  executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args:['--enable-webgl','--use-gl=angle','--use-angle=d3d11','--disable-software-rasterizer','--disable-background-networking','--no-first-run'],
  defaultViewport:{width:1100,height:900,deviceScaleFactor:1}});
 try{
  async function capture(url,mode,tag){
   const page=await browser.newPage();
   try{
    page.on('pageerror',e=>report.errors.push(tag+':'+mode+':'+e.message));
    page.on('request',r=>{if(/^https?:/i.test(r.url()))report.external.push(r.url());});
    await page.goto(url+'?labFrame=18&qaQuality=balanced&qaPower=145',
      {waitUntil:'domcontentloaded',timeout:26000});
    await page.waitForFunction(()=>document.querySelector('#renderCanvas')?.dataset.sphereReady==='true',{timeout:26000});
    if(mode!=='0')await page.select('#core-mode',mode);
    await page.waitForFunction(m=>{
      const c=document.querySelector('#renderCanvas');
      return c?.dataset.mode===m&&c?.dataset.envelopeTransition==='false'&&+c.dataset.geometryUpdates>=1;
    },{timeout:18000},mode);
    const state=await page.evaluate(()=>{
      const c=document.querySelector('#renderCanvas'),g=c.getContext('webgl2'),
       ext=g.getExtension('WEBGL_debug_renderer_info'),s=globalThis.__synestraLabAtlasInterop.getScene();
      return {renderer:ext?g.getParameter(ext.UNMASKED_RENDERER_WEBGL):g.getParameter(g.RENDERER),
        mode:c.dataset.mode,quality:c.dataset.effectiveQuality,
        faces:s.getMeshByName('central nucleus').getTotalIndices()/3,
        mask:s.getMeshByName('central nucleus facet depth mask').getTotalIndices()/3,
        ribbons:+c.dataset.plasmaRibbons,nodes:+c.dataset.energyNodes,
        canvasCount:document.querySelectorAll('canvas').length,lost:g.isContextLost(),
        visibleCoreMist:+c.dataset.visibleCoreMist};
    });
    if(!/RTX 3090/.test(state.renderer)||state.quality!=='balanced'||state.mode!==mode||
      state.faces!==80||state.mask!==80||state.ribbons!==28||state.nodes!==6||
      state.canvasCount!==1||state.lost)throw Error('R20261_GPU_INVARIANTS_'+JSON.stringify(state));
    const buf=await (await page.$('#renderCanvas')).screenshot({path:path.join(out,tag+'_'+mode+'.png')});
    return {state,bytes:buf,pixels:decodePNG(buf),metrics:measureRois(decodePNG(buf)),sha256:sha(buf)};
   }finally{await page.close()}
  }
  for(const mode of ['0','1','2','3']){
   const base=await capture(fixture,mode,'baseline');
   const variant=await capture(candidate,mode,'surface_attach');
   const retest=await capture(fixture,mode,'baseline_retest');
   const diff=compareRois(base.metrics,variant.metrics),
    changed=changedPixels(base.pixels,variant.pixels),
    drift=changedPixels(base.pixels,retest.pixels);
   const valid=changed.ring>=gates.ringChangedPctMin&&
     diff.ring.meanLuma>=gates.ringMeanLumaDeltaMin&&
     diff.core.edgeGradient>=gates.coreEdgeGradientMin&&
     diff.core.meanLuma>=gates.coreMeanLumaDeltaMin&&
     Math.abs(diff.outer.meanLuma)<=gates.outerMeanLumaDeltaAbsMax&&
     drift.core<=gates.driftPctMax&&drift.ring<=gates.driftPctMax&&drift.outer<=gates.driftPctMax;
   const result={mode,pass:valid,baselineSha256:base.sha256,
    candidateSha256:variant.sha256,retestSha256:retest.sha256,
    baselineState:base.state,candidateState:variant.state,
    delta:diff,changedPercent:changed,driftPercent:drift};
   report.profiles.push(result);
   console.log('SURFACE_ATTACH_GPU_MODE '+JSON.stringify({mode,pass:valid,
     coreDelta:diff.core,outerMeanLumaDelta:diff.outer.meanLuma,
     coreChangedPercent:changed.core,driftCorePercent:drift.core}));
  }
  const page=await browser.newPage();
  try{
   page.on('pageerror',e=>report.errors.push('power0:'+e.message));
   page.on('request',r=>{if(/^https?:/i.test(r.url()))report.external.push(r.url());});
   await page.goto(candidate+'?labFrame=18&qaQuality=balanced&qaPower=145',{waitUntil:'domcontentloaded'});
   await page.waitForFunction(()=>document.querySelector('#renderCanvas')?.dataset.sphereReady==='true');
   await page.$eval('#core-power',e=>{e.value='0';e.dispatchEvent(new Event('input',{bubbles:true}));});
   await page.waitForFunction(()=>document.querySelector('#renderCanvas')?.dataset.facetDepthActive==='false');
   report.powerZero=true;
  }finally{await page.close()}
  report.status=report.profiles.every(p=>p.pass)&&report.errors.length===0&&report.external.length===0&&report.powerZero?
    'PASS_GPU_VISUAL_GATES':'REJECT_GPU_VISUAL_GATES';
  const f=path.join(out,'SURFACE_ATTACH_GPU_REPORT.json');
  fs.writeFileSync(f,JSON.stringify(report,null,2)+'\n');
  console.log('SURFACE_ATTACH_GPU_DONE '+JSON.stringify({
   status:report.status,modes:report.profiles.length,errors:report.errors.length,
   external:report.external.length,powerZero:report.powerZero,
   reportSHA256:sha(fs.readFileSync(f))}));
  if(report.status!=='PASS_GPU_VISUAL_GATES')process.exitCode=3;
 }finally{await browser.close()}
}
main().catch(e=>{console.error('SURFACE_ATTACH_GPU_RUN_ERROR '+(e.stack||e));process.exitCode=2});
