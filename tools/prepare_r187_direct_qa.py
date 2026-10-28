from pathlib import Path
r=Path(__file__).resolve().parent.parent
s=(r/"tests/siteforge_r187_smoke_qa.mjs").read_text("utf8")
mark=" const evaluated=await call("
head=s.split(mark)[0]
if head==s:raise RuntimeError("CDP_HEADER_NOT_FOUND")
head=head.replace("const demoUrl=url+'?demo=magnetic';","const demoUrl=url+'?demo=neon187';")
tail=s[s.rfind(" await call('Browser.close');closed=true;"):]
if not tail.startswith(" await call('Browser.close');closed=true;"):raise RuntimeError("CDP_FOOTER")
body=r""" const state=async()=>JSON.parse((await call('Runtime.evaluate',{expression:"JSON.stringify((()=>{const s=document.querySelector('.core-r109-stage');const gl=s.querySelector('canvas').getContext('webgl');return {flow:document.getElementById('sf-flowType').value,ready:s.dataset.coreReady,ribbonCount:s.dataset.ribbonVertices,drawError:s.dataset.ribbonDrawError,glError:gl.getError(),spin:s.dataset.syncedSpinPhase,moteSpin:s.dataset.moteSpinPhase,controls:document.querySelectorAll('[data-sphere-control]').length,motes:document.querySelectorAll('[data-mote-control]').length,visibility:s.dataset.motesEnabled}})())",returnByValue:true})).result.value);
 await sleep(800);
 let st=await state();
 if(st.flow!=='6'||st.ready!=='true'||Number(st.ribbonCount)<50000||st.drawError!=='0'||st.glError!==0||st.spin!==st.moteSpin||st.controls!==18||st.motes!==10)
  throw Error('R187_DIRECT_LINK_REAL_WEBGL_FAIL '+JSON.stringify(st));
 const rect=JSON.parse((await call('Runtime.evaluate',{expression:"JSON.stringify((()=>{const r=document.querySelector('.core-r109-stage').getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,scale:1}})())",returnByValue:true})).result.value);
 const shot=await call('Page.captureScreenshot',{format:'png',clip:rect,captureBeyondViewport:false});
 writeFileSync(join(root,'r187-demo-desktop.png'),Buffer.from(shot.data,'base64'));
 console.log('R187_DESKTOP_GEOMETRY_PASS '+JSON.stringify(st));
 await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
 await sleep(1100);
 st=await state();
 if(st.flow!=='6'||st.ready!=='true'||st.glError!==0||st.drawError!=='0')
  throw Error('R187_MOBILE_GEOMETRY_FAIL '+JSON.stringify(st));
 const shotM=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
 writeFileSync(join(root,'r187-demo-mobile.png'),Buffer.from(shotM.data,'base64'));
 console.log('R187_MOBILE_GEOMETRY_PASS '+JSON.stringify(st));
"""
out=r/"tests/siteforge_r187_direct_qa.mjs"
if out.exists():raise RuntimeError("QA_EXISTS")
out.write_text(head+body+tail,encoding='utf8',newline="\n")
print("R187_DIRECT_QA_PREPARED")
