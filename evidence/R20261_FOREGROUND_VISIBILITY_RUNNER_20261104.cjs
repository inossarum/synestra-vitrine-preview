'use strict';
// Synestra R202.61 — GPU visibility OBSERVATION, not an artistic correction.
// The read-only production ZIP is unchanged. Each visibility toggle is transient
// inside an isolated headless Chrome page, then restored before closing.
const fs=require('node:fs'), path=require('node:path'),crypto=require('node:crypto');
// Exported archive is path-neutral; set SYN_PUPPETEER_DIR on the authorized GPU host.
const puppeteer=require(process.env.SYN_PUPPETEER_DIR || 'puppeteer');
const {measureRois,compareRois}=require('./r20261-depth-roi-probe.cjs');
const digest=b=>crypto.createHash('sha256').update(b).digest('hex');
const zip='I:/_STUDIO_STAGING/SYN_LAB_R20261_MIST_OPACITY_EXP_20261104/release/Synestra_Sphere_R20261_Standalone.zip';
const fixture='file:///I:/_STUDIO_STAGING/SYN_LAB_R20261_DD2B_RELEASE_VERIFY_20261103/qa-zip-extracted/index.html';
const output=path.join(__dirname,'qa-foreground-vis-20261104');
const expectedZip='5088f87190de0e0bab84633569c0585664a7151666e29fda1b434c76d0f8ae13';
function diff(a,b){
 if(a.w!==b.w||a.h!==b.h||a.bpp!==b.bpp)throw Error('DIFF_SIZE_MISMATCH');
 const zones={core:{all:0,gt1:0,gt4:0,gt18:0,sum:0,max:0},
    ring:{all:0,gt1:0,gt4:0,gt18:0,sum:0,max:0},
    outer:{all:0,gt1:0,gt4:0,gt18:0,sum:0,max:0}};
 const cx=a.w/2,cy=a.h/2;
 for(let y=0;y<a.h;y++)for(let x=0;x<a.w;x++){
  const r=Math.hypot(x-cx,y-cy),zone=r<62?'core':r<125?'ring':r<255?'outer':null;
  if(!zone)continue;
  const i=(y*a.w+x)*a.bpp;
  const d=Math.max(Math.abs(a.pixels[i]-b.pixels[i]),
    Math.abs(a.pixels[i+1]-b.pixels[i+1]),Math.abs(a.pixels[i+2]-b.pixels[i+2]));
  const z=zones[zone];z.all++;z.gt1+=+(d>1);z.gt4+=+(d>4);z.gt18+=+(d>=18);z.sum+=d;z.max=Math.max(z.max,d);
 }
 return Object.fromEntries(Object.entries(zones).map(([zone,z])=>
  [zone,{pixels:z.all,changedGt1:z.gt1,changedGt4:z.gt4,changedGe18:z.gt18,
   pctGt4:+(100*z.gt4/z.all).toFixed(6),pctGe18:+(100*z.gt18/z.all).toFixed(6),
   meanAbsMaxChannel:+(z.sum/z.all).toFixed(6),maxAbsChannel:z.max}]));
}
async function main(){
 if(digest(fs.readFileSync(zip))!==expectedZip)throw Error('ZIP_HASH_PRECONDITION');
 if(fs.existsSync(output)&&fs.readdirSync(output).length)throw Error('OUTPUT_EXISTS_NO_OVERWRITE');
 fs.mkdirSync(output,{recursive:true});
 const {decodePNG}=await import('./tests/siteforge_r174_png_diff.mjs');
 const report={schema:'synestra.r20261.node_foreground_native_visibility.v1',
   date:'2026-11-04',source:'R20261_RELEASE_ZIP_READ_ONLY',releaseSha256:expectedZip,
   viewport:[1100,900],quality:'balanced',frame:18,powerPct:145,modes:[],
   originalGeometryIntact:true,artSignoff:'PENDING',jsErrors:[],externalRequests:[],
   definition:'Comparison when each original foreground clone is hidden, with the exact facet stencil and depth policy unchanged.',
   disclaimer:'Measures FINAL SCREEN PIXEL contribution, not number of passed/rejected GPU stencil fragments.',
   result:'PENDING'};
 const browser=await puppeteer.launch({headless:true,
   executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',
   args:['--enable-webgl','--use-gl=angle','--use-angle=d3d11','--disable-software-rasterizer',
     '--disable-background-networking','--no-first-run'],
   defaultViewport:{width:1100,height:900,deviceScaleFactor:1}});
 try{
  for(const mode of ['0','1','2','3']){
   const page=await browser.newPage();
   try{
    page.on('pageerror',e=>report.jsErrors.push(mode+':'+e.message));
    page.on('request',r=>{if(/^https?:/i.test(r.url()))report.externalRequests.push(r.url())});
    await page.goto(fixture+'?labFrame=18&qaQuality=balanced&qaPower=145',
      {waitUntil:'domcontentloaded',timeout:30000});
    await page.waitForFunction(()=>document.querySelector('#renderCanvas')?.dataset.sphereReady==='true',{timeout:30000});
    if(mode!=='0')await page.select('#core-mode',mode);
    await page.waitForFunction(m=>{
     const c=document.querySelector('#renderCanvas');
     return c?.dataset.mode===m&&c.dataset.envelopeTransition==='false';
    },{timeout:20000},mode);
    const state=await page.evaluate(()=>{
      const cv=document.querySelector('#renderCanvas'),scene=globalThis.__synestraLabAtlasInterop.getScene();
      const gl=cv.getContext('webgl2'),ext=gl.getExtension('WEBGL_debug_renderer_info');
      const names=Array.from({length:6},(_,i)=>'node-plasma-foreground-'+i);
      const foreground=names.map(name=>scene.getMeshByName(name));
      const mask=scene.getMeshByName('central nucleus facet depth mask');
      const core=scene.getMeshByName('central nucleus');
      if(foreground.some(m=>!m)||!mask||!core)throw Error('MESH_MISSING');
      return {renderer:ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER),
        mode:cv.dataset.mode,quality:cv.dataset.effectiveQuality,
        faces:core.getTotalIndices()/3,maskFaces:mask.getTotalIndices()/3,
        ribbons:+cv.dataset.plasmaRibbons,nodes:+cv.dataset.energyNodes,
        power:document.querySelector('#core-power')?.value,
        canvasCount:document.querySelectorAll('canvas').length,
        lost:gl.isContextLost(),
        foreground:foreground.map(m=>({name:m.name,enabled:m.isEnabled(),visible:m.isVisible,
          group:m.renderingGroupId,stencilEnabled:m.material.stencil.enabled,
          stencilFunc:m.material.stencil.func,stencilRef:m.material.stencil.funcRef,
          depthWriteDisabled:m.material.disableDepthWrite}))};
    });
    if(!/RTX 3090/.test(state.renderer)||state.quality!=='balanced'||state.faces!==80||
       state.maskFaces!==80||state.ribbons!==28||state.nodes!==6||
       state.canvasCount!==1||state.mode!==mode||state.lost||
       state.foreground.some(m=>!m.enabled||!m.visible||m.group!==3||
             !m.stencilEnabled||m.stencilFunc!==514||m.stencilRef!==1||
             !m.depthWriteDisabled))
      throw Error('GPU_STATE_PRECONDITION_'+JSON.stringify(state));
    const canvas=await page.$('#renderCanvas');
    async function shot(variant,save=false){
      const names=await page.evaluate(v=>{
        const scene=globalThis.__synestraLabAtlasInterop.getScene(),
           active=Array.from({length:6},(_,i)=>scene.getMeshByName('node-plasma-foreground-'+i));
        for(let i=0;i<6;i++)active[i].isVisible=(v==='base'||v==='base-retest'||(v!=='hide-all'&&v!=='hide-'+i));
        return active.map(m=>({name:m.name,visible:m.isVisible}));
      },variant);
      await new Promise(resolve=>setTimeout(resolve,250));
      const buf=await canvas.screenshot();
      if(save)fs.writeFileSync(path.join(output,'mode'+mode+'_'+variant+'.png'),buf);
      return {variant,names,sha256:digest(buf),decoded:decodePNG(buf)};
    }
    const baseline=await shot('base',mode==='0');
    const baseMetrics=measureRois(baseline.decoded);
    const contrasts=[];
    for(let i=0;i<6;i++){
      const off=await shot('hide-'+i,false);
      contrasts.push({node:i,
        diff:diff(baseline.decoded,off.decoded),
        luma:compareRois(baseMetrics,measureRois(off.decoded)),
        sha256:off.sha256});
    }
    const all=await shot('hide-all',mode==='0');
    const retest=await shot('base-retest',false);
    const drift=diff(baseline.decoded,retest.decoded);
    const allDiff=diff(baseline.decoded,all.decoded);
    report.modes.push({mode,renderer:state.renderer,state,
      baselineSha256:baseline.sha256,allHiddenSha256:all.sha256,
      baselineRetestSha256:retest.sha256,byNode:contrasts,
      allForegroundHidden:{diff:allDiff,luma:compareRois(baseMetrics,measureRois(all.decoded))},
      drift});
    console.log('R20261_FOREGROUND_MODE '+JSON.stringify({
      mode,perNode:contrasts.map(o=>({node:o.node,coreGt4:o.diff.core.changedGt4,
        coreGt18:o.diff.core.changedGe18,ringGt4:o.diff.ring.changedGt4})),
      allCoreGt4:allDiff.core.changedGt4,
      allCoreGt18:allDiff.core.changedGe18,
      driftCoreGt4:drift.core.changedGt4,
      driftRingGt4:drift.ring.changedGt4,
      driftOuterGt4:drift.outer.changedGt4}));
    if(drift.core.changedGt4||drift.ring.changedGt4||drift.outer.changedGt4)
      report.jsErrors.push('NON_DETERMINISTIC_BASELINE_MODE_'+mode);
   }finally{await page.close()}
  }
  report.result=report.modes.length===4&&!report.jsErrors.length&&!report.externalRequests.length?
     'PASS_VISIBILITY_DIAGNOSTIC':'FAILED_DIAGNOSTIC';
  const raw=Buffer.from(JSON.stringify(report,null,2)+'\n');
  const reportPath=path.join(output,'R20261_FOREGROUND_VISIBILITY_NATIVE_GPU.json');
  fs.writeFileSync(reportPath,raw);
  console.log('R20261_FOREGROUND_DONE '+JSON.stringify({status:report.result,modes:report.modes.length,
    sha256:digest(raw),reportPath,errors:report.jsErrors,external:report.externalRequests.length}));
  if(report.result!=='PASS_VISIBILITY_DIAGNOSTIC')process.exitCode=3;
 }finally{await browser.close()}
}
if(require.main===module)main().catch(e=>{console.error('R20261_FOREGROUND_ERROR '+(e.stack||e));process.exitCode=2});
