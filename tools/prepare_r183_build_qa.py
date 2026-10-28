from pathlib import Path
r=Path(__file__).resolve().parent.parent
builder=(r/"tools/build_siteforge_r182_offline.mjs").read_text(encoding="utf8")
for a,b in [
 ("daf8d598b28ee0e866e091799a788a1103d6d562","b6c961bec23c0876a57261ece7216bad623df446"),
 ("8f6e4c8241eea569755f5c16759ea26b8e27fcba","f3016c8decd9de278b065b67b06fa5bdee678381"),
 ("siteforge-r182-autonome.html","siteforge-r183-autonome.html"),
 ("R182_OFFLINE_BUNDLE_PASS","R183_OFFLINE_BUNDLE_PASS")
]:
 if builder.count(a)!=1:raise Exception("BUILD_ANCHOR "+a+" count="+str(builder.count(a)))
 builder=builder.replace(a,b)
p=r/"tools/build_siteforge_r183_offline.mjs"
if p.exists():raise Exception("REFUSE_PREEXISTING_BUILD")
p.write_text(builder,encoding="utf8",newline="\n")
base=(r/"tests/siteforge_r182_offline_qa.mjs").read_text("utf8")
old="const url=pathToFileURL(join(root,'siteforge-r182-autonome.html')).href;"
if base.count(old)!=1:raise Exception("QA_URL_MISSING")
base=base.replace(old,"const url=pathToFileURL(join(root,'siteforge-r183-autonome.html')).href;")
# Inject checks shortly after Chrome WebGL validation, before other legacy checks.
anchor=" // R179: verify all seven new controls with actual GPU pixels and optional JSON."
if anchor not in base:raise Exception("CHROME_ANCHOR_MISSING")
extra=r""" // R183: real GPU smoke test of all four display modes on desktop.
 const setQuality=async(v)=>{
  await call('Runtime.evaluate',{expression:"(()=>{const s=document.querySelector('[data-render-quality]');s.value="+JSON.stringify(v)+";s.dispatchEvent(new Event('change',{bubbles:true}));})()"});
  let o={};
  for(let attempt=0;attempt<40;attempt++){
   o=JSON.parse((await call('Runtime.evaluate',{expression:"JSON.stringify((()=>{const s=document.querySelector('.core-r109-stage');return {mode:s.dataset.qualityMode,steps:s.dataset.volumeSteps,quality:s.dataset.mobileQuality,fps:s.dataset.renderFps,gl:s.querySelector('canvas').getContext('webgl').getError()}})())",returnByValue:true})).result.value);
   if(o.mode===v)break;
   await sleep(180);
  }
  if(o.mode!==v||o.gl!==0)throw Error('R183_QUALITY_MODE_NOT_APPLIED '+JSON.stringify(o));
  return o;
 };
 const desktopBaseline=await setQuality('balanced');
 if(desktopBaseline.steps!=='22')throw Error('R183_DESKTOP_BALANCED '+JSON.stringify(desktopBaseline));
 const desktopPerf=await setQuality('performance');
 if(desktopPerf.steps!=='16')throw Error('R183_DESKTOP_ECONOMY '+JSON.stringify(desktopPerf));
 const desktopQuality=await setQuality('quality');
 if(desktopQuality.steps!=='22')throw Error('R183_DESKTOP_DETAIL '+JSON.stringify(desktopQuality));
 const desktopAuto=await setQuality('auto');
 if(![22,19,16,14].includes(Number(desktopAuto.steps)))throw Error('R183_DESKTOP_AUTO_RANGE '+JSON.stringify(desktopAuto));
 const desktopBack=await setQuality('balanced');
 if(desktopBack.steps!=='22')throw Error('R183_DESKTOP_RETURN '+JSON.stringify(desktopBack));
 console.log('R183_DESKTOP_QUALITY_MODES_PASS '+JSON.stringify({desktopBaseline,desktopPerf,desktopQuality,desktopAuto,desktopBack}));
"""
base=base.replace(anchor,extra+anchor)
# Locate verified mobile baseline sample block, prefix controls before touch orbit
anchor2=" // Mobile touch orbit: no second canvas, no document scroll interaction."
if anchor2 not in base:raise Exception("MOBILE_ANCHOR_MISSING")
extra2=r""" // R183 mobile quality actually changes uVolumeSteps on a real GPU.
 const mobileBase=await setQuality('balanced');
 if(mobileBase.steps!=='14')throw Error('R183_MOBILE_BASE '+JSON.stringify(mobileBase));
 const mobilePerf=await setQuality('performance');
 if(mobilePerf.steps!=='10')throw Error('R183_MOBILE_ECONOMY '+JSON.stringify(mobilePerf));
 const mobileQuality=await setQuality('quality');
 if(mobileQuality.steps!=='18')throw Error('R183_MOBILE_DETAIL '+JSON.stringify(mobileQuality));
 const mobileAuto=await setQuality('auto');
 if(![14,12,10,8].includes(Number(mobileAuto.steps)))throw Error('R183_MOBILE_AUTO '+JSON.stringify(mobileAuto));
 const mobileRestore=await setQuality('balanced');
 if(mobileRestore.steps!=='14')throw Error('R183_MOBILE_RESTORE '+JSON.stringify(mobileRestore));
 console.log('R183_MOBILE_QUALITY_MODES_PASS '+JSON.stringify({mobileBase,mobilePerf,mobileQuality,mobileAuto,mobileRestore}));
"""
base=base.replace(anchor2,extra2+anchor2)
p=r/"tests/siteforge_r183_offline_qa.mjs"
if p.exists():raise Exception("QA_EXISTS")
p.write_text(base,encoding="utf8",newline="\n")
print("R183_BUILD_QA_READY")
