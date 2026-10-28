from pathlib import Path
root=Path(__file__).resolve().parent.parent
builder=(root/"tools/build_siteforge_r181_offline.mjs").read_text(encoding="utf8")
hashes=[("694ceaa38b06a016d9b2350a9102b5a348ed686c","daf8d598b28ee0e866e091799a788a1103d6d562"),("e08a1fc3992fc5463b583b4845892b2450c5b250","8f6e4c8241eea569755f5c16759ea26b8e27fcba"),("siteforge-r181-autonome.html","siteforge-r182-autonome.html"),("R181_OFFLINE_BUNDLE_PASS","R182_OFFLINE_BUNDLE_PASS")]
for a,b in hashes:
 if builder.count(a)!=1:raise Exception(f"BUILDER {a}: {builder.count(a)}")
 builder=builder.replace(a,b)
out=root/"tools/build_siteforge_r182_offline.mjs"
if out.exists():raise Exception("BUILDER_ALREADY_EXISTS")
out.write_text(builder,encoding="utf8",newline="\n")

source=(root/"tests/siteforge_r181_offline_qa.mjs").read_text(encoding="utf8")
fix=[
 ("siteforge-r181-autonome.html","siteforge-r182-autonome.html"),
 ("config.names.length!==8","config.names.length!==10"),
 ("'r181-crystal-facets.png'","'r182-crystal-facets.png'"),
 ("'r181-ion-orbs.png'","'r182-ion-orbs.png'")]
for a,b in fix:
 if source.count(a)!=1:raise Exception(f"QA {a}: {source.count(a)}")
 source=source.replace(a,b)
anchor=" const reference=readFileSync(join(root,'r180-style-crystal.png'));"
extra=r""" // R182: failure-first physical shader comparison at exactly the same
 // paused camera, particle shape and fixed frame. A true pixel-difference
 // test, not a diff between two different animation times.
 await mutate({moteShape:1,moteCount:160,moteSize:200,particleSpeed:0,moteRoughness:0,moteReflectivity:0});
 await sleep(380);
 const bare=await call('Page.captureScreenshot',{format:'png',clip:clip179,captureBeyondViewport:false});
 writeFileSync(join(root,'r182-crystal-matte.png'),Buffer.from(bare.data,'base64'));
 await mutate({moteRoughness:100,moteReflectivity:200});
 await sleep(380);
 const polished=await call('Page.captureScreenshot',{format:'png',clip:clip179,captureBeyondViewport:false});
 writeFileSync(join(root,'r182-crystal-surface.png'),Buffer.from(polished.data,'base64'));
 const finishDiff=comparePngPixels(Buffer.from(bare.data,'base64'),Buffer.from(polished.data,'base64'));
 if(finishDiff.changedPixels<150)throw Error('R182_MICROFACETS_NOT_VISIBLE '+JSON.stringify(finishDiff));
 const finishProbe=JSON.parse((await call('Runtime.evaluate',{expression:"JSON.stringify((()=>{const s=document.querySelector('.core-r109-stage'),gl=s.querySelector('canvas').getContext('webgl');return {rough:document.getElementById('sf-moteRoughness').value,reflection:document.getElementById('sf-moteReflectivity').value,plasma:document.querySelectorAll('[data-sphere-control]').length,motes:document.querySelectorAll('[data-mote-control]').length,glError:gl.getError(),spin:s.dataset.syncedSpinPhase,moteSpin:s.dataset.moteSpinPhase}})())",returnByValue:true})).result.value);
 if(finishProbe.rough!=='100'||finishProbe.reflection!=='200'||finishProbe.plasma!==18||finishProbe.motes!==10||finishProbe.glError!==0||finishProbe.spin!==finishProbe.moteSpin)throw Error('R182_FINISH_GPU_BIND_FAIL '+JSON.stringify(finishProbe));
 console.log('R182_CRYSTAL_MICROFACETS_GPU_PASS '+JSON.stringify({finishDiff,finishProbe}));
 await mutate({moteRoughness:35,moteReflectivity:95,moteShape:2,moteCount:120,moteSize:200,particleSpeed:0});
 await sleep(250);
"""
if source.count(anchor)!=1:raise Exception("MISSING_CRYSTAL_ANCHOR")
source=source.replace(anchor,extra+anchor)
anchor2=" if(json.motes.moteShape!==2)throw Error('R180_STYLE_NOT_EXPORTED '+JSON.stringify(json.motes));"
if source.count(anchor2)!=1:raise Exception("JSON_ANCHOR")
source=source.replace(anchor2,anchor2+"\n if(json.motes.moteRoughness!==35||json.motes.moteReflectivity!==95)throw Error('R182_JSON_FINISH_NOT_EXPORTED '+JSON.stringify(json.motes));")
anchor3=" if(resetMotes.values.moteCount!=='46'"
if source.count(anchor3)!=1:raise Exception("RESET_ANCHOR")
source=source.replace(anchor3," if(resetMotes.values.moteRoughness!=='35'||resetMotes.values.moteReflectivity!=='95')throw Error('R182_RESET_FINISH_INVALID '+JSON.stringify(resetMotes));\n"+anchor3)
out=root/"tests/siteforge_r182_offline_qa.mjs"
if out.exists():raise Exception("QA_ALREADY_EXISTS")
out.write_text(source,encoding="utf8",newline="\n")
print("R182_BUNDLE_AND_BROWSER_QA_PREPARED")
