'use strict';
// Native GPU six-node attribution, diagnostic only; original standalone ZIP untouched.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
// Set the authorized Puppeteer module directory via SYN_PUPPETEER_DIR.
const puppeteer=require(process.env.SYN_PUPPETEER_DIR || 'puppeteer');
const {measureRois,compareRois}=require('./r20261-depth-roi-probe.cjs');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const baseZip='5088f87190de0e0bab84633569c0585664a7151666e29fda1b434c76d0f8ae13';
const fixture='file:///I:/_STUDIO_STAGING/SYN_LAB_R20261_DD2B_RELEASE_VERIFY_20261103/qa-zip-extracted/index.html';
const output=path.join(__dirname,'qa-six-node-attribution-20261104');
const gate={baselineDriftMaxCoreGt4:0,baselineDriftMaxRingGt4:0,baselineDriftMaxOuterGt4:3,changedThresholdRGB:4,staticFrame:18};
function diff(a,b){
 if(a.w!==b.w||a.h!==b.h||a.bpp!==b.bpp)throw Error('IMAGE_SHAPE');
 const z={core:{total:0,gt4:0,ge18:0},ring:{total:0,gt4:0,ge18:0},outer:{total:0,gt4:0,ge18:0}};
 for(let y=0;y<a.h;y++)for(let x=0;x<a.w;x++){
  const r=Math.hypot(x-a.w/2,y-a.h/2),k=r<62?'core':r<125?'ring':r<255?'outer':null;
  if(k===null)continue;
  const i=(y*a.w+x)*a.bpp,d=Math.max(Math.abs(a.pixels[i]-b.pixels[i]),Math.abs(a.pixels[i+1]-b.pixels[i+1]),Math.abs(a.pixels[i+2]-b.pixels[i+2]));
  z[k].total++;z[k].gt4+=+(d>gate.changedThresholdRGB);z[k].ge18+=+(d>=18);
 }
 return Object.fromEntries(Object.entries(z).map(([k,q])=>[k,{...q,pctGt4:+(q.gt4/q.total*100).toFixed(6)}]));
}
async function main(){
 if(sha(fs.readFileSync(path.join(__dirname,'release','Synestra_Sphere_R20261_Standalone.zip')))!==baseZip)throw Error('ZIP_SHA_PRECHECK');
 if(fs.existsSync(output))throw Error('OUTPUT_ALREADY_EXISTS_NO_RETRY');fs.mkdirSync(output,{recursive:true});
 const {decodePNG}=await import('./tests/siteforge_r174_png_diff.mjs');
 const report={schema:'synestra.r20261.per-node-depth-visibility.v1',timestamp:'2026-11-04',
  zipSha256:baseZip,baseGitHead:'39a10023d0faf6edc19e73ba3d8565528635ff8d',
  viewport:[1100,900],frame:18,power:145,quality:'balanced',gate,
  modes:[],pageErrors:[],networkRequests:[],result:'PENDING',artSignoff:'PENDING',
  caveat:'These are screen pixel attribution counts; not WebGL occlusion query nor rejected fragment counts. Depth ALWAYS only inside disposable QA Chrome page.'};
 const browser=await puppeteer.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args:['--enable-webgl','--use-gl=angle','--use-angle=d3d11','--disable-software-rasterizer','--disable-background-networking','--no-first-run'],
  defaultViewport:{width:1100,height:900,deviceScaleFactor:1}});
 try{
  for(const mode of ['0','1','2','3']){
   const page=await browser.newPage();
   try{
    page.on('pageerror',e=>report.pageErrors.push(mode+':'+e.message));
    page.on('request',r=>{if(/^https?:/i.test(r.url()))report.networkRequests.push(r.url())});
    await page.goto(fixture+'?labFrame=18&qaQuality=balanced&qaPower=145',{waitUntil:'domcontentloaded',timeout:30000});
    await page.waitForFunction(()=>document.querySelector('#renderCanvas')?.dataset.sphereReady==='true',{timeout:30000});
    if(mode!=='0')await page.select('#core-mode',mode);
    await page.waitForFunction(m=>{
      const cv=document.querySelector('#renderCanvas');return cv?.dataset.mode===m&&cv.dataset.envelopeTransition==='false';
    },{timeout:20000},mode);
    const prep=await page.evaluate(()=>{
     const scene=globalThis.__synestraLabAtlasInterop.getScene(),canvas=document.querySelector('#renderCanvas'),gl=canvas.getContext('webgl2'),
       ext=gl.getExtension('WEBGL_debug_renderer_info');
     const mesh=Array.from({length:6},(_,i)=>scene.getMeshByName('node-plasma-foreground-'+i)),mats=[...new Set(mesh.map(x=>x?.material))];
     const core=scene.getMeshByName('central nucleus'),mask=scene.getMeshByName('central nucleus facet depth mask');
     if(mesh.some(m=>!m)||mats.length!==4||mats.some(m=>!m.stencil.enabled||m.stencil.func!==514||m.stencil.funcRef!==1||m.depthFunction!==0)||
       core.getTotalIndices()/3!==80||mask.getTotalIndices()/3!==80||!mask.material.stencil.enabled||+canvas.dataset.plasmaRibbons!==28||
       +canvas.dataset.energyNodes!==6||canvas.dataset.effectiveQuality!=='balanced'||document.querySelectorAll('canvas').length!==1||gl.isContextLost())
       throw Error('INVARIANT_FAIL');
     globalThis.__r20261NodeAttrib={mesh,mats,gl};
     return {renderer:ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER),meshes:mesh.length,
       originalMaterials:mats.length,faces:80,mask:80,stencil:true,originalDepth:0,
       glAlways:gl.ALWAYS};
    });
    if(!/RTX 3090/.test(prep.renderer)||prep.glAlways!==519)throw Error('GPU_PRECONDITION');
    const canvas=await page.$('#renderCanvas');
    const capture=async(name,node,always,save)=>{
      const state=await page.evaluate(({node,always})=>{
       const c=globalThis.__r20261NodeAttrib;
       for(const m of c.mats){m.stencil.enabled=true;m.depthFunction=0}
       for(let i=0;i<6;i++)c.mesh[i].isVisible=(i===node);
       if(node>=0){c.mesh[node].material.depthFunction=always?519:0}
       const scene=globalThis.__synestraLabAtlasInterop.getScene();
       if(!scene.getMeshByName('central nucleus facet depth mask').material.stencil.enabled)throw Error('MASK_MUTATED');
       return {visible:c.mesh.map(m=>m.isVisible),materialDepth:node>=0?c.mesh[node].material.depthFunction:null,
         stencil:c.mats.every(m=>m.stencil.enabled)};
      },{node,always});
      await new Promise(resolve=>setTimeout(resolve,220));
      const buf=await canvas.screenshot();
      if(save)fs.writeFileSync(path.join(output,'mode'+mode+'_'+name+'.png'),buf);
      return {sha:sha(buf),image:decodePNG(buf),state};
    };
    const hidden=await capture('hidden',-1,false,mode==='0');
    const baseMetrics=measureRois(hidden.image),byNode=[];
    for(let node=0;node<6;node++){
     const normal=await capture('node'+node+'_normal',node,false,mode==='0'&&node===1);
     const always=await capture('node'+node+'_always',node,true,mode==='0'&&node===1);
     byNode.push({node,normal:{sha:normal.sha,vsHidden:diff(hidden.image,normal.image),roiDelta:compareRois(baseMetrics,measureRois(normal.image))},
       always:{sha:always.sha,vsHidden:diff(hidden.image,always.image),vsNormal:diff(normal.image,always.image),
        roiDelta:compareRois(baseMetrics,measureRois(always.image))}});
    }
    const retest=await capture('hidden-retest',-1,false,false);
    const drift=diff(hidden.image,retest.image);
    const stable=drift.core.gt4<=gate.baselineDriftMaxCoreGt4&&drift.ring.gt4<=gate.baselineDriftMaxRingGt4&&drift.outer.gt4<=gate.baselineDriftMaxOuterGt4;
    report.modes.push({mode,prep,hiddenSHA256:hidden.sha,hiddenRetestSHA256:retest.sha,stable,drift,byNode});
    console.log('R20261_PER_NODE_MODE '+JSON.stringify({mode,stable,drift,depthImpact:byNode.map(x=>({
       node:x.node,defaultCore:x.normal.vsHidden.core.gt4,alwaysCore:x.always.vsHidden.core.gt4,
       normalToAlwaysCore:x.always.vsNormal.core.gt4,
       alwaysRing:x.always.vsHidden.ring.gt4}))}));
    if(!stable)report.pageErrors.push('DRIFT_MODE_'+mode);
   }finally{await page.close()}
  }
  report.result=report.modes.length===4&&report.modes.every(m=>m.stable)&&!report.pageErrors.length&&!report.networkRequests.length?
    'PASS_PER_NODE_SCREENSPACE_ATTRIBUTION':'FAILED_PER_NODE_DIAGNOSTIC';
  const data=Buffer.from(JSON.stringify(report,null,2)+'\n');
  fs.writeFileSync(path.join(output,'R20261_PER_NODE_DEPTH_ATTRIBUTION_GPU_REPORT.json'),data);
  console.log('R20261_PER_NODE_DONE '+JSON.stringify({status:report.result,reportSha256:sha(data),modes:report.modes.length,errors:report.pageErrors,external:report.networkRequests.length}));
  if(report.result!=='PASS_PER_NODE_SCREENSPACE_ATTRIBUTION')process.exitCode=3;
 }finally{await browser.close()}
}
if(require.main===module)main().catch(e=>{console.error('R20261_PER_NODE_ERROR '+(e.stack||e));process.exitCode=2});
