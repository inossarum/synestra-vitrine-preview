from pathlib import Path
r=Path(__file__).resolve().parent.parent
build=(r/"tools/build_siteforge_r185_offline.mjs").read_text("utf8")
for a,b in [
 ("a76dbbbd16fcf9bb36b807413bab84c12d4adaaa","81a444bc668b7ca56688dbccc6798a87433ac873"),
 ("49baa2104c4200f25ff9bde63b90fda4ba9d1c60","f819f5253cf2ed79c05fb4ac82583ac1daee316f"),
 ("siteforge-r185-autonome.html","siteforge-r186-autonome.html"),
 ("R185_OFFLINE_BUNDLE_PASS","R186_OFFLINE_BUNDLE_PASS")]:
 if build.count(a)!=1:raise Exception("BUILD_ANCHOR "+a)
 build=build.replace(a,b)
dst=r/"tools/build_siteforge_r186_offline.mjs"
if dst.exists():raise Exception("EXISTS_BUILDER")
dst.write_text(build,"utf8",newline="\n")
qa=(r/"tests/siteforge_r185_offline_qa.mjs").read_text("utf8")
reps=[
 ("siteforge-r185-autonome.html","siteforge-r186-autonome.html"),
 ("m.flowCount!==6","m.flowCount!==7")]
for a,b in reps:
 if qa.count(a)!=1:raise Exception("QA_ANCHOR "+a)
 qa=qa.replace(a,b)
# Existing tests 0-5 untouched; the added material is tested in a
# separate WebGL stage with particle emission disabled and static scene.
anchor=" // R183: real GPU smoke test of all four display modes on desktop."
if qa.count(anchor)!=1:raise Exception("QA_INSERTION_ANCHOR")
smoke=r""" // R186: add a seventh effect without changing one old default.
 const coreState=await call('Runtime.evaluate',{expression:"JSON.stringify((()=>{const f=document.getElementById('sf-flowType'),s=document.querySelector('.core-r109-stage');return {flow:f.value,options:[...f.options].map(x=>[x.value,x.label]),color:document.getElementById('sf-secondary').value,cyan:document.getElementById('sf-rim').value,motes:document.getElementById('sf-moteCount').value,ready:s.dataset.coreReady}})())",returnByValue:true});
 const before186=JSON.parse(coreState.result.value);
 if(before186.flow!=='0'||before186.options.length!==7||before186.options.slice(0,6).map(x=>x[0]).join(',')!=='0,1,2,3,4,5')
  throw Error('R186_ORIGINAL_DEFAULTS_CHANGED '+JSON.stringify(before186));
 const switchMaterial=async material=>{
  await call('Runtime.evaluate',{expression:"(()=>{const f=document.getElementById('sf-flowType');f.value="+JSON.stringify(String(material))+";f.dispatchEvent(new Event('change',{bubbles:true}));const speed=document.getElementById('sf-particleSpeed');speed.value='0';speed.dispatchEvent(new Event('input',{bubbles:true}));})()"});
  await sleep(600);
  const obj=JSON.parse((await call('Runtime.evaluate',{expression:"JSON.stringify((()=>{const s=document.querySelector('.core-r109-stage');return {flow:document.getElementById('sf-flowType').value,spin:s.dataset.syncedSpinPhase,moteSpin:s.dataset.moteSpinPhase,glError:s.querySelector('canvas').getContext('webgl').getError(),ready:s.dataset.coreReady}})())",returnByValue:true})).result.value);
  if(obj.flow!==String(material)||obj.glError!==0||obj.ready!=='true')throw Error('R186_REAL_MATERIAL_FAIL '+JSON.stringify(obj));
  return obj;
 };
 const artClipR186=JSON.parse((await call('Runtime.evaluate',{expression:"JSON.stringify((()=>{const r=document.querySelector('.core-r109-stage').getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,scale:1}})())",returnByValue:true})).result.value);
 await switchMaterial(0);
 const oldShot=await call('Page.captureScreenshot',{format:'png',clip:artClipR186,captureBeyondViewport:false});
 await switchMaterial(6);
 const neonShot=await call('Page.captureScreenshot',{format:'png',clip:artClipR186,captureBeyondViewport:false});
 writeFileSync(join(root,'r186-real-neon-material.png'),Buffer.from(neonShot.data,'base64'));
 const neonDelta=comparePngPixels(Buffer.from(oldShot.data,'base64'),Buffer.from(neonShot.data,'base64'));
 if(neonDelta.changed<130)throw Error('R186_ADDED_MATERIAL_INVISIBLE '+JSON.stringify(neonDelta));
 await switchMaterial(0);
 console.log('R186_SEVENTH_MATERIAL_REAL_WEBGL_PASS '+JSON.stringify({before186,neonDelta}));
"""
qa=qa.replace(anchor,smoke+anchor)
out=r/"tests/siteforge_r186_offline_qa.mjs"
if out.exists():raise Exception("QA_EXISTS")
out.write_text(qa,"utf8",newline="\n")
print("R186_BUILD_AND_BROwSER_QA_READY")
