from pathlib import Path
r=Path(__file__).resolve().parent.parent
s=(r/"tests/siteforge_r186_public_smoke_qa.mjs").read_text("utf8")
anchor=" console.log('R186_RENDER_SMOKE_PASS');"
if s.count(anchor)!=1:raise RuntimeError("ANCHOR")
insert=r"""
 await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
 await sleep(650);
 const mobileNeon=await switchMaterial(6);
 const mobileState=JSON.parse((await call('Runtime.evaluate',{expression:"JSON.stringify((()=>{const s=document.querySelector('.core-r109-stage');return {width:document.documentElement.clientWidth,flow:document.getElementById('sf-flowType').value,samples:s.dataset.volumeSteps,stage:s.offsetWidth,gl:s.querySelector('canvas').getContext('webgl').getError()}})())",returnByValue:true})).result.value);
 if(mobileState.width!==390||mobileState.flow!=='6'||mobileState.gl!==0||!['12','14','18','10'].includes(mobileState.samples))
  throw Error('R186_MOBILE_SEVENTH_RENDER_FAILED '+JSON.stringify(mobileState));
 const mobileShot=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
 writeFileSync(join(root,'r186-public-neon-mobile.png'),Buffer.from(mobileShot.data,'base64'));
 console.log('R186_SEVENTH_MATERIAL_MOBILE_PASS '+JSON.stringify({mobileNeon,mobileState}));
"""
dest=r/"tests/siteforge_r186_public_mobile_qa.mjs"
if dest.exists():raise RuntimeError("DEST_EXISTS")
dest.write_text(s.replace(anchor,anchor+insert),encoding="utf8",newline="\n")
print("MOBILE_R186_QA_READY")
