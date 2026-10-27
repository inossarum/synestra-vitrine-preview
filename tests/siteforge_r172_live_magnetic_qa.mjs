import {spawn} from 'node:child_process';
import {existsSync,readFileSync,writeFileSync,mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';

const chrome='C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const profile=mkdtempSync(join(tmpdir(),'synestra-siteforge-r172-'));
const root=process.cwd();
const url=pathToFileURL(join(root,'siteforge','core-3d-lab','index.html')).href;
const child=spawn(chrome,['--headless=new','--enable-unsafe-swiftshader','--use-angle=swiftshader','--disable-extensions','--disable-background-networking','--no-first-run','--no-default-browser-check','--remote-debugging-port=0','--user-data-dir='+profile,url],{stdio:'ignore',windowsHide:true});
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
 await call('Page.navigate',{url});await sleep(1600);
 const evaluated=await call('Runtime.evaluate',{expression:`JSON.stringify((()=>{const stage=document.querySelector('.core-r109-stage');const canvas=document.querySelector('canvas');const gl=canvas?.getContext('webgl');const get=id=>document.getElementById(id);return {ready:stage?.getAttribute('data-core-ready'),status:document.querySelector('[data-render-status]')?.textContent,vfx:document.querySelector('[data-vfx-status]')?.textContent,webgl:!!gl,glError:gl?.getError(),flowCount:get('sf-flowType')?.options?.length,controls:document.querySelectorAll('[data-sphere-control]').length,shell:get('sf-shellVisibility')?.value,shellHidden:get('sf-shellVisibility')?.type,particleDensityHidden:get('sf-particleDensity')?.type,particleSizeHidden:get('sf-particleSize')?.type,canvasW:canvas?.width,canvasH:canvas?.height}})())`,returnByValue:true});
 const m=JSON.parse(evaluated.result.value);
 if(m.ready!=='true'||!m.webgl||m.glError!==0||m.flowCount!==5||m.controls!==18||m.shell!=='0'||m.shellHidden!=='hidden'||m.particleDensityHidden!=='hidden'||m.particleSizeHidden!=='hidden')throw Error('R172_REAL_BROWSER_FAIL '+JSON.stringify(m));
 // Regression: the canvas backing size must follow its panel, not 960x570 attrs.
 const layout=await call('Runtime.evaluate',{expression:"JSON.stringify((()=>{const s=document.querySelector('.core-r109-stage'),c=s.querySelector('canvas'),a=s.getBoundingClientRect(),b=c.getBoundingClientRect();return {stage:[s.clientWidth,s.clientHeight],canvas:[c.width,c.height],offsetX:Math.abs((a.left+a.width/2)-(b.left+b.width/2)),visibleWidth:b.width,stageWidth:a.width}})())",returnByValue:true});
 const g=JSON.parse(layout.result.value);
 if(g.stage[0]!==g.canvas[0]||g.stage[1]!==g.canvas[1]||g.offsetX>2||g.visibleWidth>g.stageWidth+2)throw Error('R172_CANVAS_CROP_REGRESSION '+JSON.stringify(g));
 console.log('R172_CANVAS_CENTERING_PASS '+JSON.stringify(g));
 const image=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
 const screenshot=join(root,'r172-browser-desktop.png');
 writeFileSync(screenshot,Buffer.from(image.data,'base64'));
 // Validate that WebGL is actually animating instead of merely compiling.
 await sleep(1300);
 const later=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
 writeFileSync(join(root,'r172-browser-desktop-later.png'),Buffer.from(later.data,'base64'));
 if(image.data===later.data)throw Error('R172_ANIMATION_FROZEN_IDENTICAL_FRAMES');
 console.log('R172_ANIMATION_FRAMES_DIFFER '+JSON.stringify({initialBytes:image.data.length,laterBytes:later.data.length}));
 console.log('R172_CHROME_WEBGL_PASS '+JSON.stringify({...m,screenshot}));
 // R172 deterministic visual reference, matching owner's successful magnetic ribbon settings.
 await call('Runtime.evaluate',{expression:"(()=>{for(const [id,value] of [['sf-flowType','1'],['sf-particleIntensity','200'],['sf-coreLight','211'],['sf-flowStructure','166'],['sf-particleSpeed','0']]){const e=document.getElementById(id);e.value=value;e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));}})()"});
 await sleep(500);
 const magneticBase=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
 writeFileSync(join(root,'r172-magnetic-candidate.png'),Buffer.from(magneticBase.data,'base64'));
 console.log('R172_MAGNETIC_CANDIDATE_CAPTURE '+JSON.stringify({flow:1,emission:200,core:211,width:166,paused:true,bytes:magneticBase.data.length}));
 await call('Runtime.evaluate',{expression:"(()=>{const s=document.getElementById('sf-particleSpeed');s.value='100';s.dispatchEvent(new Event('input',{bubbles:true}));})()"});
 // Evaluate every material through actual WebGL, retaining one program and canvas.
 const tested=[];
 for(let material=0;material<5;material++){
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
 if(freezeA.data!==freezeB.data)throw Error('R172_ZERO_SPEED_NOT_FROZEN '+JSON.stringify({lenA:freezeA.data.length,lenB:freezeB.data.length}));
 writeFileSync(join(root,'r172-browser-paused.png'),Buffer.from(freezeB.data,'base64'));
 await call('Runtime.evaluate',{expression:"(()=>{const speed=document.getElementById('sf-particleSpeed');speed.value='100';speed.dispatchEvent(new Event('input',{bubbles:true}));})()"});
 await sleep(400);
 const resumedA=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
 await sleep(820);
 const resumedB=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
 if(resumedA.data===resumedB.data)throw Error('R172_RESUMED_FLOW_NOT_MOVING');
 console.log('R172_PAUSE_RESUME_PASS '+JSON.stringify({pausedIdentical:true,resumedDifferent:true}));
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
 if(!(pose.yaw>.15)||!(pose.pitch<-.09))throw Error('R172_POINTER_ORBIT_FAILED '+JSON.stringify(pose));
 const orbitShot=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
 writeFileSync(join(root,'r172-browser-orbited.png'),Buffer.from(orbitShot.data,'base64'));
 // Keyboard orientation should work with screen-reader focus and Home reset.
 await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Home',code:'Home',windowsVirtualKeyCode:36});
 await call('Input.dispatchKeyEvent',{type:'keyUp',key:'Home',code:'Home',windowsVirtualKeyCode:36});
 const reset=await call('Runtime.evaluate',{expression:"JSON.stringify((()=>{let s=document.querySelector('.core-r109-stage');return {yaw:Number(s.dataset.orbitYaw),pitch:Number(s.dataset.orbitPitch)}})())",returnByValue:true});
 if(Math.abs(JSON.parse(reset.result.value).yaw)>.001||Math.abs(JSON.parse(reset.result.value).pitch)>.001)throw Error('R172_HOME_RESET_FAILED '+reset.result.value);
 await call('Input.dispatchKeyEvent',{type:'keyDown',key:'ArrowLeft',code:'ArrowLeft',windowsVirtualKeyCode:37});
 await call('Input.dispatchKeyEvent',{type:'keyUp',key:'ArrowLeft',code:'ArrowLeft',windowsVirtualKeyCode:37});
 const arrows=await call('Runtime.evaluate',{expression:"Number(document.querySelector('.core-r109-stage').dataset.orbitYaw)",returnByValue:true});
 if(!(Number(arrows.result.value)<-.05))throw Error('R172_KEYBOARD_ORBIT_FAILED '+JSON.stringify(arrows));
 await call('Runtime.evaluate',{expression:"document.querySelector('.core-r109-stage').dispatchEvent(new MouseEvent('dblclick',{bubbles:true}))"});
 console.log('R172_DESKTOP_ORBIT_PASS '+JSON.stringify({pose,homeReset:true,keyboard:true}));
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
 if(touchPose.yaw<.15||touchPose.touchAction!=='none')throw Error('R172_TOUCH_ORBIT_FAILED '+JSON.stringify(touchPose));
 console.log('R172_TOUCH_ORBIT_PASS '+JSON.stringify(touchPose));
 const shot=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
 writeFileSync(join(root,'r172-browser-mobile.png'),Buffer.from(shot.data,'base64'));
 console.log('R172_ALL_MATERIALS_DESKTOP_MOBILE_PASS '+JSON.stringify({tested,mobile}));
 await call('Browser.close');closed=true;
}catch(e){console.error('R172_CHROME_WEBGL_FAIL '+String(e));process.exitCode=1}
finally{
 try{ws?.close()}catch{}
 if(!closed&&child.exitCode===null)try{child.kill()}catch{}
 await Promise.race([new Promise(r=>child.once('exit',r)),sleep(1200)]);
 try{rmSync(profile,{recursive:true,force:true,maxRetries:5,retryDelay:100})}catch{}
}
