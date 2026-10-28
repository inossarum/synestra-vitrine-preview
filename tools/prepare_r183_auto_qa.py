from pathlib import Path
r=Path(__file__).resolve().parent.parent
src=(r/"tests/siteforge_r183_offline_qa.mjs").read_text("utf8")
header=src.split(" const evaluated=await call(")[0]
if "const chrome=" not in header or "await call('Page.navigate'" not in header:raise Exception("CDP_HEADER_INVALID")
footer=src[src.rfind(" await call('Browser.close');"):]
if "finally{" not in footer:raise Exception("CDP_FOOTER_INVALID")
body=r""" const current=async()=>JSON.parse((await call('Runtime.evaluate',{expression:"JSON.stringify((()=>{const s=document.querySelector('.core-r109-stage');return {ready:s.getAttribute('data-core-ready'),mode:s.dataset.qualityMode,steps:s.dataset.volumeSteps,penalty:s.dataset.qualityPenalty,ms:s.dataset.renderCadenceMs,fps:s.dataset.renderFps,material:document.getElementById('sf-flowType')?.value,spin:s.dataset.syncedSpinPhase,moteSpin:s.dataset.moteSpinPhase,gl:s.querySelector('canvas')?.getContext('webgl')?.getError()}})())",returnByValue:true})).result.value);
 await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
 await sleep(1250);
 let x=await current();
 if(x.ready!=='true'||x.gl!==0)throw Error('R183_MOBILE_GPU_NOT_READY '+JSON.stringify(x));
 await call('Runtime.evaluate',{expression:"(()=>{const e=document.querySelector('[data-render-quality]');e.value='auto';e.dispatchEvent(new Event('change',{bubbles:true}));})()"});
 const samples=[];
 for(let t=0;t<12;t++){
  await sleep(750);x=await current();samples.push(x);
  if(x.mode==='auto'&&Number(x.penalty)>=1&&Number(x.fps)>0)break;
 }
 if(x.mode!=='auto'||!Number.isFinite(Number(x.fps))||Number(x.fps)<=0||x.gl!==0||x.spin!==x.moteSpin)
  throw Error('R183_AUTO_LIVE_TELEMETRY_FAIL '+JSON.stringify({last:x,samples}));
 if(Number(x.penalty)>=1&&Number(x.steps)>12)throw Error('R183_AUTO_NOT_DOWNSAMPLED '+JSON.stringify({last:x,samples}));
 if(Number(x.penalty)===0&&Number(x.ms)>62&&samples.length>=10)
  throw Error('R183_AUTO_SLOW_NOT_REDUCED '+JSON.stringify({last:x,samples}));
 console.log('R183_AUTO_LIVE_FRAMEBUDGET_PASS '+JSON.stringify({first:samples[0],last:x,polls:samples.length}));
 await call('Runtime.evaluate',{expression:"(()=>{const e=document.querySelector('[data-render-quality]');e.value='balanced';e.dispatchEvent(new Event('change',{bubbles:true}));})()"});
 await sleep(350);
 x=await current();
 if(x.mode!=='balanced'||x.steps!=='14'||x.gl!==0)throw Error('R183_AUTO_RESTORE_FAIL '+JSON.stringify(x));
 console.log('R183_AUTO_BALANCED_RECOVERY_PASS '+JSON.stringify(x));
"""
out=r/"tests/siteforge_r183_auto_runtime_qa.mjs"
if out.exists():raise Exception("EXISTS")
out.write_text(header+body+footer,encoding="utf8",newline="\n")
print("R183_AUTO_LIVE_QA_READY")
