import {spawn} from 'node:child_process';
import {existsSync,readFileSync,writeFileSync,mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {comparePngPixels,decodePNG} from './siteforge_r174_png_diff.mjs';

const chrome='C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const profile=mkdtempSync(join(tmpdir(),'synestra-siteforge-r175-'));
const root=process.cwd();
const url=pathToFileURL(join(root,'siteforge-r177-autonome.html')).href;
const demoUrl=url+'?demo=magnetic';
const child=spawn(chrome,['--headless=new','--enable-unsafe-swiftshader','--use-angle=swiftshader','--disable-extensions','--disable-background-networking','--no-first-run','--no-default-browser-check','--remote-debugging-port=0','--user-data-dir='+profile,demoUrl],{stdio:'ignore',windowsHide:true});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
let ws,closed=false;
try{
 const portPath=join(profile,'DevToolsActivePort');
 for(let i=0;i<80&&!existsSync(portPath);i++)await sleep(150);
 if(!existsSync(portPath))throw Error('CDP_START_FAILED');
 let info;
 for(let i=0;i<15;i++){try{info=readFileSync(portPath,'utf8');break}catch(e){if(i===14)throw e;await sleep(70)}}
 const port=Number(info.trim().split(/\r?\n/)[0]);
 const pages=await(await fetch('http://127.0.0.1:'+port+'/json/list')).json();
 const page=pages.find(t=>t.type==='page'&&t.webSocketDebuggerUrl);
 if(!page)throw Error('CDP_NO_PAGE');
 ws=new WebSocket(page.webSocketDebuggerUrl);
 await new Promise((resolve,reject)=>{ws.addEventListener('open',resolve,{once:true});ws.addEventListener('error',reject,{once:true})});
 let next=0;
 const pending=new Map();
 ws.addEventListener('message',event=>{let r;try{r=JSON.parse(event.data)}catch{return}const p=pending.get(r.id);if(p){pending.delete(r.id);r.error?p.reject(Error(JSON.stringify(r.error))):p.resolve(r.result)}});
 const call=(method,params={})=>new Promise((resolve,reject)=>{const id=++next;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));setTimeout(()=>{if(pending.has(id)){pending.delete(id);reject(Error('CDP_TIMEOUT '+method))}},9000)});
 await call('Page.enable');await call('Runtime.enable');
 await call('Emulation.setDeviceMetricsOverride',{width:1100,height:800,deviceScaleFactor:1,mobile:false});
 await call('Page.navigate',{url:demoUrl});await sleep(1600);
 const evaluated=await call('Runtime.evaluate',{expression:`JSON.stringify((()=>{const stage=document.querySelector('.core-r109-stage');const canvas=document.querySelector('canvas');const gl=canvas?.getContext('webgl');const get=id=>document.getElementById(id);return {ready:stage?.getAttribute('data-core-ready'),status:document.querySelector('[data-render-status]')?.textContent,vfx:document.querySelector('[data-vfx-status]')?.textContent,webgl:!!gl,glError:gl?.getError(),flowCount:get('sf-flowType')?.options?.length,controls:document.querySelectorAll('[data-sphere-control]').length,shell:get('sf-shellVisibility')?.value,shellHidden:get('sf-shellVisibility')?.type,particleDensityHidden:get('sf-particleDensity')?.type,particleSizeHidden:get('sf-particleSize')?.type,canvasW:canvas?.width,canvasH:canvas?.height}})())`,returnByValue:true});
 const m=JSON.parse(evaluated.result.value);
 if(m.ready!=='true'||!m.webgl||m.glError!==0||m.flowCount!==6||m.controls!==18||m.shell!=='0'||m.shellHidden!=='hidden'||m.particleDensityHidden!=='hidden'||m.particleSizeHidden!=='hidden')throw Error('R175_REAL_BROWSER_FAIL '+JSON.stringify(m));
 // Regression: the canvas backing size must follow its panel, not 960x570 attrs.
 const layout=await call('Runtime.evaluate',{expression:"JSON.stringify((()=>{const s=document.querySelector('.core-r109-stage'),c=s.querySelector('canvas'),a=s.getBoundingClientRect(),b=c.getBoundingClientRect();return {stage:[s.clientWidth,s.clientHeight],canvas:[c.width,c.height],offsetX:Math.abs((a.left+a.width/2)-(b.left+b.width/2)),visibleWidth:b.width,stageWidth:a.width}})())",returnByValue:true});
 const g=JSON.parse(layout.result.value);
 if(g.stage[0]!==g.canvas[0]||g.stage[1]!==g.canvas[1]||g.offsetX>2||g.visibleWidth>g.stageWidth+2)throw Error('R175_CANVAS_CROP_REGRESSION '+JSON.stringify(g));
 console.log('R175_CANVAS_CENTERING_PASS '+JSON.stringify(g));
 const image=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
 const screenshot=join(root,'r175-browser-desktop.png');
 writeFileSync(screenshot,Buffer.from(image.data,'base64'));
 // Validate that WebGL is actually animating instead of merely compiling.
 await sleep(1300);
 const later=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
 writeFileSync(join(root,'r175-browser-desktop-later.png'),Buffer.from(later.data,'base64'));
 if(image.data===later.data)throw Error('R175_ANIMATION_FROZEN_IDENTICAL_FRAMES');
 console.log('R175_ANIMATION_FRAMES_DIFFER '+JSON.stringify({initialBytes:image.data.length,laterBytes:later.data.length}));
 console.log('R175_CHROME_WEBGL_PASS '+JSON.stringify({...m,screenshot}));
 // R175: capture GPU motes on/off with the exact same paused material/pose.
 await call('Runtime.evaluate',{expression:"(()=>{const s=document.getElementById('sf-particleSpeed');s.value='0';s.dispatchEvent(new Event('input',{bubbles:true}));})()"});
 await sleep(450);
 const enabledShot=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
 writeFileSync(join(root,'r175-motes-on.png'),Buffer.from(enabledShot.data,'base64'));
 const toggleMotes=await call('Runtime.evaluate',{expression:"(()=>{const b=document.querySelector('[data-mote-toggle]');b.click();return {pressed:b.getAttribute('aria-pressed'),enabled:document.querySelector('.core-r109-stage').dataset.motesEnabled,parameters:document.querySelectorAll('[data-sphere-control]').length}})()",returnByValue:true});
 const off=toggleMotes.result.value;
 if(off.pressed!=='false'||off.enabled!=='false'||off.parameters!==18)throw Error('R175_TOGGLE_OFF_FAIL '+JSON.stringify(off));
 await sleep(450);
 const disabledShot=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
 writeFileSync(join(root,'r175-motes-off.png'),Buffer.from(disabledShot.data,'base64'));
 if(enabledShot.data===disabledShot.data)throw Error('R175_MOTES_NOT_VISIBLE');
 const motePixelDiff=comparePngPixels(Buffer.from(disabledShot.data,'base64'),Buffer.from(enabledShot.data,'base64'));
 console.log('R175_MOTES_READABILITY_DIFF '+JSON.stringify(motePixelDiff));
 if(motePixelDiff.changedPercent<.35||motePixelDiff.majorPercent<.25)
  throw Error('R175_MOTES_READABILITY_TOO_LOW '+JSON.stringify(motePixelDiff));
 // R176: isolate the actual volumetric flow from decorative motes at paused time.
 const waveBounds=await call('Runtime.evaluate',{expression:"JSON.stringify((()=>{const r=document.querySelector('.core-r109-stage').getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height}})())",returnByValue:true});
 const b=JSON.parse(waveBounds.result.value);
 const clipWave={x:b.x,y:b.y,width:b.width,height:b.height,scale:1};
 const waveStill=await call('Page.captureScreenshot',{format:'png',clip:clipWave,captureBeyondViewport:false});
 writeFileSync(join(root,'r176-wave-rest.png'),Buffer.from(waveStill.data,'base64'));
 await call('Input.dispatchMouseEvent',{type:'mouseMoved',x:b.x+b.width*.43,y:b.y+b.height*.38});
 await call('Input.dispatchMouseEvent',{type:'mouseMoved',x:b.x+b.width*.57,y:b.y+b.height*.47});
 await sleep(45);
 const waveImpact=await call('Page.captureScreenshot',{format:'png',clip:clipWave,captureBeyondViewport:false});
 writeFileSync(join(root,'r176-wave-impact.png'),Buffer.from(waveImpact.data,'base64'));
 const waveDiff=comparePngPixels(Buffer.from(waveStill.data,'base64'),Buffer.from(waveImpact.data,'base64'));
 const waveState=await call('Runtime.evaluate',{expression:"JSON.stringify({strength:document.querySelector('.core-r109-stage').dataset.waveStrength,motes:document.querySelector('.core-r109-stage').dataset.motesEnabled,parameters:document.querySelectorAll('[data-sphere-control]').length})",returnByValue:true});
 console.log('R176_REAL_PLASMA_WAVE_IMPACT '+JSON.stringify({waveDiff,state:JSON.parse(waveState.result.value)}));
 if(waveDiff.changedPercent<.7)throw Error('R176_PLASMA_WAVE_IMPACT_INVISIBLE '+JSON.stringify(waveDiff));
 await sleep(2650);
 const waveRecovered=await call('Page.captureScreenshot',{format:'png',clip:clipWave,captureBeyondViewport:false});
 writeFileSync(join(root,'r176-wave-recovered.png'),Buffer.from(waveRecovered.data,'base64'));
 const recoveredDiff=comparePngPixels(Buffer.from(waveStill.data,'base64'),Buffer.from(waveRecovered.data,'base64'));
 const waveAfter=await call('Runtime.evaluate',{expression:"document.querySelector('.core-r109-stage').dataset.waveStrength",returnByValue:true});
 console.log('R176_REAL_PLASMA_WAVE_RECOVERED '+JSON.stringify({recoveredDiff,strength:waveAfter.result.value}));
 if(recoveredDiff.changedPercent>.15)throw Error('R176_PLASMA_WAVE_NOT_RECOVERED '+JSON.stringify(recoveredDiff));
 await call('Runtime.evaluate',{expression:"document.querySelector('[data-mote-toggle]').click()"});
 const pos=await call('Runtime.evaluate',{expression:"JSON.stringify((()=>{const r=document.querySelector('.core-r109-stage').getBoundingClientRect();return {x:r.left+r.width*.28,y:r.top+r.height*.43}})())",returnByValue:true});
 const pointerPos=JSON.parse(pos.result.value);
 await call('Input.dispatchMouseEvent',{type:'mouseMoved',x:pointerPos.x,y:pointerPos.y});
 await call('Input.dispatchMouseEvent',{type:'mouseMoved',x:pointerPos.x+110,y:pointerPos.y+14});
 const impulse=await call('Runtime.evaluate',{expression:"Number(document.querySelector('.core-r109-stage').dataset.pointerImpulse)",returnByValue:true});
 if(!(impulse.result.value>.05))throw Error('R175_POINTER_REPULSION_NOT_ACTIVATED '+JSON.stringify(impulse));
 await sleep(150);
 const burst=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
 writeFileSync(join(root,'r175-motes-pointer.png'),Buffer.from(burst.data,'base64'));
 console.log('R175_INTERACTIVE_MOTES_PASS '+JSON.stringify({toggle:off,visibleBeforeAfter:enabledShot.data!==disabledShot.data,impulse:impulse.result.value}));
 await call('Input.dispatchMouseEvent',{type:'mouseMoved',x:pointerPos.x+1000,y:pointerPos.y+1000});
 await call('Runtime.evaluate',{expression:"(()=>{const s=document.getElementById('sf-particleSpeed');s.value='100';s.dispatchEvent(new Event('input',{bubbles:true}));})()"});
 // R172 deterministic visual reference, matching owner's successful magnetic ribbon settings.
 await call('Runtime.evaluate',{expression:"(()=>{for(const [id,value] of [['sf-flowType','1'],['sf-particleIntensity','200'],['sf-coreLight','211'],['sf-flowStructure','166'],['sf-particleSpeed','0']]){const e=document.getElementById(id);e.value=value;e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));}})()"});
 await sleep(500);
 const magneticBase=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
 writeFileSync(join(root,'r175-magnetic-candidate.png'),Buffer.from(magneticBase.data,'base64'));
 console.log('R175_MAGNETIC_CANDIDATE_CAPTURE '+JSON.stringify({flow:1,emission:200,core:211,width:166,paused:true,bytes:magneticBase.data.length}));
 await call('Runtime.evaluate',{expression:"(()=>{const s=document.getElementById('sf-particleSpeed');s.value='100';s.dispatchEvent(new Event('input',{bubbles:true}));})()"});
 // Capture the same frozen WebGL viewport under both material versions.
 const beforeDemo=await call('Runtime.evaluate',{expression:"JSON.stringify((()=>{const q=document.querySelector('.core-r109-stage'),r=q.getBoundingClientRect();return {x:r.left,y:r.top,width:r.width,height:r.height,flow:document.getElementById('sf-flowType').value,emission:document.getElementById('sf-particleIntensity').value,core:document.getElementById('sf-coreLight').value,widthControl:document.getElementById('sf-flowStructure').value}})())",returnByValue:true});
 const demo=JSON.parse(beforeDemo.result.value);
 if(demo.flow!=='1'||demo.emission!=='200'||demo.core!=='211'||demo.widthControl!=='166')throw Error('R175_DIRECT_DEMO_NOT_LOADED '+JSON.stringify(demo));
 const crop={x:demo.x,y:demo.y,width:demo.width,height:demo.height,scale:1};
 await call('Runtime.evaluate',{expression:"(()=>{const sp=document.getElementById('sf-particleSpeed');sp.value='0';sp.dispatchEvent(new Event('input',{bubbles:true}));document.querySelector('[data-magnetic-compare=r171]').click();})()"});
 await sleep(350);
 const prev=await call('Page.captureScreenshot',{format:'png',clip:crop,captureBeyondViewport:false});
 writeFileSync(join(root,'r175-magnetic-before-crop.png'),Buffer.from(prev.data,'base64'));
 await call('Runtime.evaluate',{expression:"document.querySelector('[data-magnetic-compare=r172]').click()"});
 await sleep(400);
 const after=await call('Page.captureScreenshot',{format:'png',clip:crop,captureBeyondViewport:false});
 writeFileSync(join(root,'r175-magnetic-after-crop.png'),Buffer.from(after.data,'base64'));
 const ratio=Math.abs(after.data.length-prev.data.length)/Math.max(prev.data.length,after.data.length);
 const v=await call('Runtime.evaluate',{expression:"JSON.stringify({flow:document.getElementById('sf-flowType').value,mode:document.querySelector('.core-r109-stage').dataset.magneticVariant,values:document.querySelectorAll('[data-sphere-control]').length})",returnByValue:true});
 if(prev.data===after.data||ratio<.025)throw Error('R175_VISUAL_CHANGE_TOO_SMALL '+JSON.stringify({ratio,before:prev.data.length,after:after.data.length}));
 console.log('R175_VISUAL_AB_PASS '+JSON.stringify({compressionRatio:ratio,demo,mode:JSON.parse(v.result.value),beforeBytes:prev.data.length,afterBytes:after.data.length}));
 await call('Runtime.evaluate',{expression:"(()=>{const sp=document.getElementById('sf-particleSpeed');sp.value='100';sp.dispatchEvent(new Event('input',{bubbles:true}));})()"});
 // R173 real sixth material: navigate directly to the liquid demo URL.
 const liquidUrl=url+'?demo=liquid';
 await call('Page.navigate',{url:liquidUrl});await sleep(1550);
 const liquidState=await call('Runtime.evaluate',{expression:"JSON.stringify((()=>{const s=document.querySelector('.core-r109-stage'),gl=s.querySelector('canvas').getContext('webgl');return {material:document.getElementById('sf-flowType').value,emission:document.getElementById('sf-particleIntensity').value,core:document.getElementById('sf-coreLight').value,width:document.getElementById('sf-flowStructure').value,canvasCount:document.querySelectorAll('canvas').length,controls:document.querySelectorAll('[data-sphere-control]').length,glError:gl.getError(),ready:s.dataset.coreReady}})())",returnByValue:true});
 const liq=JSON.parse(liquidState.result.value);
 if(liq.material!=='5'||liq.emission!=='160'||liq.core!=='180'||liq.width!=='140'||liq.canvasCount!==1||liq.controls!==18||liq.glError!==0||liq.ready!=='true')throw Error('R175_LIQUID_DEMO_FAIL '+JSON.stringify(liq));
 await call('Runtime.evaluate',{expression:"(()=>{let s=document.getElementById('sf-particleSpeed');s.value='0';s.dispatchEvent(new Event('input',{bubbles:true}));})()"});
 await sleep(450);
 const liqImage=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
 writeFileSync(join(root,'r175-liquid-desktop.png'),Buffer.from(liqImage.data,'base64'));
 const liqSame=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
 if(liqSame.data!==liqImage.data)throw Error('R175_LIQUID_FREEZE_FAILED');
 // R174 optical before/after: same frozen liquid geometry and camera.
 const dims=await call('Runtime.evaluate',{expression:"JSON.stringify((()=>{const s=document.querySelector('.core-r109-stage'),r=s.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,material:document.getElementById('sf-flowType').value}})())",returnByValue:true});
 const stageRect=JSON.parse(dims.result.value);
 if(stageRect.material!=='5')throw Error('R175_EXPECTED_LIQUID_DEMO '+dims.result.value);
 const opticCrop={x:stageRect.x,y:stageRect.y,width:stageRect.width,height:stageRect.height,scale:1};
 await call('Runtime.evaluate',{expression:"document.querySelector('[data-depth-compare=prior]').click()"});
 await sleep(350);
 const ref=await call('Page.captureScreenshot',{format:'png',clip:opticCrop,captureBeyondViewport:false});
 writeFileSync(join(root,'r175-before-liquid.png'),Buffer.from(ref.data,'base64'));
 await call('Runtime.evaluate',{expression:"document.querySelector('[data-depth-compare=r174]').click()"});
 await sleep(350);
 const candidate=await call('Page.captureScreenshot',{format:'png',clip:opticCrop,captureBeyondViewport:false});
 writeFileSync(join(root,'r175-after-liquid.png'),Buffer.from(candidate.data,'base64'));
 const opticalRatio=Math.abs(candidate.data.length-ref.data.length)/Math.max(candidate.data.length,ref.data.length);
 const state=await call('Runtime.evaluate',{expression:"JSON.stringify({variant:document.querySelector('.core-r109-stage').dataset.depthVariant,controlCount:document.querySelectorAll('[data-sphere-control]').length,glError:document.querySelector('canvas').getContext('webgl').getError()})",returnByValue:true});
 const optical=JSON.parse(state.result.value);
 const pixelDiff=comparePngPixels(Buffer.from(ref.data,'base64'),Buffer.from(candidate.data,'base64'));
 if(pixelDiff.changedPercent<3||pixelDiff.majorPercent<1||optical.variant!=='r174'||optical.controlCount!==18||optical.glError!==0)
  throw Error('R175_OPTICAL_AB_FAILED '+JSON.stringify({pixelDiff,optical}));

 console.log('R175_OPTICAL_AB_PASS '+JSON.stringify({pixelDiff,ratioPngSize:opticalRatio,referenceBytes:ref.data.length,candidateBytes:candidate.data.length,optical}));
 // UI demonstration button restores fluid preset even after selecting magnetic.
 await call('Runtime.evaluate',{expression:"(()=>{const e=document.getElementById('sf-flowType');e.value='1';e.dispatchEvent(new Event('change',{bubbles:true}));document.querySelector('[data-liquid-demo]').click();})()"});
 const clicked=await call('Runtime.evaluate',{expression:"document.getElementById('sf-flowType').value",returnByValue:true});
 if(clicked.result.value!=='5')throw Error('R175_LIQUID_BUTTON_FAILED');
 console.log('R175_LIQUID_DEMO_PASS '+JSON.stringify(liq));
 await call('Runtime.evaluate',{expression:"(()=>{const s=document.getElementById('sf-particleSpeed');s.value='100';s.dispatchEvent(new Event('input',{bubbles:true}));})()"});
 // Evaluate every material through actual WebGL, retaining one program and canvas.
 const tested=[];
 for(let material=0;material<6;material++){
  const e=await call('Runtime.evaluate',{expression:`JSON.stringify((()=>{const el=document.getElementById('sf-flowType');el.value='${material}';el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));return {material:Number(el.value),canvasCount:document.querySelectorAll('canvas').length}})())`,returnByValue:true});
  await sleep(300);
  const c=await call('Runtime.evaluate',{expression:"JSON.stringify({gpu:document.querySelector('canvas').getContext('webgl').getError(),ready:document.querySelector('.core-r109-stage').dataset.coreReady})",returnByValue:true});
  const m2={...JSON.parse(e.result.value),...JSON.parse(c.result.value)};
  if(m2.material!==material||m2.canvasCount!==1||m2.gpu!==0||m2.ready!=='true')throw Error('MATERIAL_E2E_FAIL '+JSON.stringify(m2));
  tested.push(m2);
 }
 // R171: speed=0 must freeze the animated plasma, rather than impose legacy minimum 4%.
 await call('Runtime.evaluate',{expression:"(()=>{const flow=document.getElementById('sf-flowType');flow.value='0';flow.dispatchEvent(new Event('input',{bubbles:true}));const speed=document.getElementById('sf-particleSpeed');speed.value='0';speed.dispatchEvent(new Event('input',{bubbles:true}));})()"});
 await sleep(550);
 const freezeA=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
 await sleep(820);
 const freezeB=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
 if(freezeA.data!==freezeB.data)throw Error('R175_ZERO_SPEED_NOT_FROZEN '+JSON.stringify({lenA:freezeA.data.length,lenB:freezeB.data.length}));
 writeFileSync(join(root,'r175-browser-paused.png'),Buffer.from(freezeB.data,'base64'));
 await call('Runtime.evaluate',{expression:"(()=>{const speed=document.getElementById('sf-particleSpeed');speed.value='100';speed.dispatchEvent(new Event('input',{bubbles:true}));})()"});
 await sleep(400);
 const resumedA=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
 await sleep(820);
 const resumedB=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
 if(resumedA.data===resumedB.data)throw Error('R175_RESUMED_FLOW_NOT_MOVING');
 console.log('R175_PAUSE_RESUME_PASS '+JSON.stringify({pausedIdentical:true,resumedDifferent:true}));
 // R171: exercise the camera with Chrome's native pointer input and verify real orientation change.
 const bounds=await call('Runtime.evaluate',{expression:"JSON.stringify((()=>{const r=document.querySelector('.core-r109-stage').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2,w:r.width,h:r.height}})())",returnByValue:true});
 const p=JSON.parse(bounds.result.value);
 await call('Input.dispatchMouseEvent',{type:'mouseMoved',x:p.x,y:p.y});
 await call('Input.dispatchMouseEvent',{type:'mousePressed',x:p.x,y:p.y,button:'left',clickCount:1});
 await call('Input.dispatchMouseEvent',{type:'mouseMoved',x:p.x+Math.min(p.w/3,140),y:p.y-65,button:'left',buttons:1});
 await call('Input.dispatchMouseEvent',{type:'mouseReleased',x:p.x+Math.min(p.w/3,140),y:p.y-65,button:'left',clickCount:1});
 await sleep(220);
 const yaw=await call('Runtime.evaluate',{expression:"JSON.stringify((()=>{let s=document.querySelector('.core-r109-stage');return {yaw:Number(s.dataset.orbitYaw),pitch:Number(s.dataset.orbitPitch)}})())",returnByValue:true});
 const pose=JSON.parse(yaw.result.value);
 if(!(pose.yaw>.15)||!(pose.pitch<-.09))throw Error('R175_POINTER_ORBIT_FAILED '+JSON.stringify(pose));
 const orbitShot=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
 writeFileSync(join(root,'r175-browser-orbited.png'),Buffer.from(orbitShot.data,'base64'));
 // R177 real-browser proof: isolate motes from the volume at two camera poses.
 // Two binary masks are computed by subtracting identical-pose ON/OFF images.
 await call('Runtime.evaluate',{expression:"(()=>{const s=document.getElementById('sf-particleSpeed');s.value='0';s.dispatchEvent(new Event('input',{bubbles:true}));})()"});
 await sleep(2650); // R176 pointer impulse dissipates without affecting these masks.
 const onTurned=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
 writeFileSync(join(root,'r177-motes-turned.png'),Buffer.from(onTurned.data,'base64'));
 await call('Runtime.evaluate',{expression:"document.querySelector('[data-mote-toggle]').click()"});
 await sleep(170);
 const offTurned=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
 await call('Runtime.evaluate',{expression:"document.querySelector('[data-mote-toggle]').click();document.querySelector('.core-r109-stage').dispatchEvent(new MouseEvent('dblclick',{bubbles:true}))"});
 await sleep(260);
 const onHome=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
 writeFileSync(join(root,'r177-motes-home.png'),Buffer.from(onHome.data,'base64'));
 await call('Runtime.evaluate',{expression:"document.querySelector('[data-mote-toggle]').click()"});
 await sleep(170);
 const offHome=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
 await call('Runtime.evaluate',{expression:"document.querySelector('[data-mote-toggle]').click()"});
 const mask=(on,off)=>{
  const a=decodePNG(Buffer.from(on.data,'base64')),b=decodePNG(Buffer.from(off.data,'base64'));
  if(a.w!==b.w||a.h!==b.h)throw Error('R177_MASK_DIMENSION');
  const bits=new Uint8Array(a.w*a.h);let count=0;
  for(let i=0;i<bits.length;i++){
   const delta=Math.max(...[0,1,2].map(c=>Math.abs(a.pixels[i*a.bpp+c]-b.pixels[i*b.bpp+c])));
   if(delta>=18){bits[i]=1;count++;}
  }return {bits,count};
 };
 const M=mask(onHome,offHome),N=mask(onTurned,offTurned);
 let changed=0,overlap=0;
 for(let i=0;i<M.bits.length;i++){
  if(M.bits[i]!==N.bits[i])changed++;
  if(M.bits[i]&&N.bits[i])overlap++;
 }
 const sync={homePixels:M.count,turnedPixels:N.count,maskShiftPixels:changed,overlapPixels:overlap,orbitYaw:pose.yaw,orbitPitch:pose.pitch};
 if(M.count<180||N.count<180||changed<200)throw Error('R177_MOTES_FAIL_TO_FOLLOW_ORBIT '+JSON.stringify(sync));
 console.log('R177_REAL_3D_ORBIT_MOTE_MASK_PASS '+JSON.stringify(sync));
 // Keyboard orientation should work with screen-reader focus and Home reset.
 await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Home',code:'Home',windowsVirtualKeyCode:36});
 await call('Input.dispatchKeyEvent',{type:'keyUp',key:'Home',code:'Home',windowsVirtualKeyCode:36});
 const reset=await call('Runtime.evaluate',{expression:"JSON.stringify((()=>{let s=document.querySelector('.core-r109-stage');return {yaw:Number(s.dataset.orbitYaw),pitch:Number(s.dataset.orbitPitch)}})())",returnByValue:true});
 if(Math.abs(JSON.parse(reset.result.value).yaw)>.001||Math.abs(JSON.parse(reset.result.value).pitch)>.001)throw Error('R175_HOME_RESET_FAILED '+reset.result.value);
 await call('Input.dispatchKeyEvent',{type:'keyDown',key:'ArrowLeft',code:'ArrowLeft',windowsVirtualKeyCode:37});
 await call('Input.dispatchKeyEvent',{type:'keyUp',key:'ArrowLeft',code:'ArrowLeft',windowsVirtualKeyCode:37});
 const arrows=await call('Runtime.evaluate',{expression:"Number(document.querySelector('.core-r109-stage').dataset.orbitYaw)",returnByValue:true});
 if(!(Number(arrows.result.value)<-.05))throw Error('R175_KEYBOARD_ORBIT_FAILED '+JSON.stringify(arrows));
 await call('Runtime.evaluate',{expression:"document.querySelector('.core-r109-stage').dispatchEvent(new MouseEvent('dblclick',{bubbles:true}))"});
 console.log('R175_DESKTOP_ORBIT_PASS '+JSON.stringify({pose,homeReset:true,keyboard:true}));
 await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
 await call('Page.reload',{ignoreCache:true});await sleep(1300);
 const mm=await call('Runtime.evaluate',{expression:"JSON.stringify((()=>{const c=document.querySelector('canvas');return {width:innerWidth,ready:document.querySelector('.core-r109-stage')?.dataset.coreReady,webgl:!!c.getContext('webgl'),error:c.getContext('webgl').getError(),actualWidth:c.width,actualHeight:c.height,bodyWidth:document.body.scrollWidth}})())",returnByValue:true});
 const mobile=JSON.parse(mm.result.value);
 if(mobile.width!==390||mobile.ready!=='true'||mobile.error!==0||!mobile.webgl||mobile.bodyWidth>392)throw Error('MOBILE_E2E_FAIL '+JSON.stringify(mobile));
 // Mobile touch orbit: no second canvas, no document scroll interaction.
 await call('Emulation.setTouchEmulationEnabled',{enabled:true,maxTouchPoints:1});
 const mb=await call('Runtime.evaluate',{expression:"JSON.stringify((()=>{let r=document.querySelector('.core-r109-stage').getBoundingClientRect();return {x:r.left+r.width*.5,y:r.top+r.height*.5}})())",returnByValue:true});
 const tp=JSON.parse(mb.result.value);
 await call('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:tp.x,y:tp.y,id:1}]});
 await call('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:tp.x+65,y:tp.y-25,id:1}]});
 await call('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 await sleep(210);
 const orientation=await call('Runtime.evaluate',{expression:"JSON.stringify((()=>{const s=document.querySelector('.core-r109-stage');return {yaw:Number(s.dataset.orbitYaw),pitch:Number(s.dataset.orbitPitch),touchAction:getComputedStyle(s).touchAction}})())",returnByValue:true});
 const touchPose=JSON.parse(orientation.result.value);
 if(touchPose.yaw<.15||touchPose.touchAction!=='none')throw Error('R175_TOUCH_ORBIT_FAILED '+JSON.stringify(touchPose));
 console.log('R175_TOUCH_ORBIT_PASS '+JSON.stringify(touchPose));
 const shot=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
 writeFileSync(join(root,'r175-browser-mobile.png'),Buffer.from(shot.data,'base64'));
 console.log('R175_ALL_MATERIALS_DESKTOP_MOBILE_PASS '+JSON.stringify({tested,mobile}));
 await call('Browser.close');closed=true;
}catch(e){console.error('R175_CHROME_WEBGL_FAIL '+String(e));process.exitCode=1}
finally{
 try{ws?.close()}catch{}
 if(!closed&&child.exitCode===null)try{child.kill()}catch{}
 await Promise.race([new Promise(r=>child.once('exit',r)),sleep(1200)]);
 try{rmSync(profile,{recursive:true,force:true,maxRetries:5,retryDelay:100})}catch{}
}
