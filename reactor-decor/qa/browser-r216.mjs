import {spawn} from 'node:child_process';
import {readFileSync,existsSync,mkdtempSync,writeFileSync,rmSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
const url='http://127.0.0.1:18916/';
const dir=mkdtempSync(join(tmpdir(),'syn-atlas-babylon-'));
const chrome='C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const proc=spawn(chrome,['--headless=new','--enable-unsafe-swiftshader','--no-first-run','--disable-background-networking',
 '--remote-debugging-address=127.0.0.1','--remote-debugging-port=0','--user-data-dir='+dir,url],{stdio:'ignore',windowsHide:true});
const wait=t=>new Promise(r=>setTimeout(r,t));
let ws,send;try{
 const portFile=join(dir,'DevToolsActivePort');
 for(let i=0;i<80&&!existsSync(portFile);i++)await wait(150);
 if(!existsSync(portFile))throw Error('CHROME_DEBUG_PORT_NOT_FOUND');
 const port=Number(readFileSync(portFile,'utf8').split(/\r?\n/)[0]);
 const targets=await (await fetch('http://127.0.0.1:'+port+'/json/list')).json();
 const page=targets.find(t=>t.type==='page');
 if(!page)throw Error('CHROME_TAB_MISSING');
 ws=new WebSocket(page.webSocketDebuggerUrl);await new Promise((ok,fail)=>{ws.addEventListener('open',ok,{once:true});ws.addEventListener('error',fail,{once:true})});
 let id=0;const pending=new Map(),failures=[];
 ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.method==='Runtime.exceptionThrown')failures.push(JSON.stringify(m.params).slice(0,320));const p=pending.get(m.id);if(!p)return;pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result)});
 send=(method,params={})=>new Promise((resolve,reject)=>{const i=++id;pending.set(i,{resolve,reject});ws.send(JSON.stringify({id:i,method,params}));});
 await send('Page.enable');await send('Runtime.enable');await send('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});
 await send('Page.navigate',{url});
 const expr="(()=>{const e=document.querySelector('#stage');return JSON.stringify({status:e?.dataset.status,meshes:e?.dataset.meshes,socket:e?.dataset.coreSocket,coreCount:e?.dataset.coreMeshCount,engine:e?.dataset.engine,canvas:document.querySelectorAll('canvas').length,quality:e?.dataset.quality,error:document.querySelector('#status')?.textContent})})()";
 let data;for(let i=0;i<100;i++){await wait(300);const r=await send('Runtime.evaluate',{expression:expr,returnByValue:true});data=JSON.parse(r.result.value);if(['ready','error'].includes(data.status))break;}
 if(data.status!=='ready')throw Error('BABYLON_NOT_READY '+JSON.stringify(data));
 await wait(1500);
 const output=join(import.meta.dirname,'..','r216-evidence','reactor-r216-chrome-1440.png');
 const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
 writeFileSync(output,Buffer.from(shot.data,'base64'));
 await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
 await wait(500);
 const mobileShot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
 const mobilePath=join(import.meta.dirname,'..','r216-evidence','reactor-r216-chrome-390.png');
 writeFileSync(mobilePath,Buffer.from(mobileShot.data,'base64'));
 const mobileData=await send('Runtime.evaluate',{expression:"JSON.stringify({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,status:document.querySelector('#stage')?.dataset.status})",returnByValue:true});
 const mobile=JSON.parse(mobileData.result.value);
 if(mobile.status!=='ready'||mobile.scrollWidth>mobile.width+1)throw Error('MOBILE_LAYOUT_OVERFLOW '+JSON.stringify(mobile));
 const manual=await send('Runtime.evaluate',{expression:"(()=>{const s=document.querySelector('#profiles');s.value='eco';s.dispatchEvent(new Event('change'));return document.querySelector('#stage').dataset.quality})()",returnByValue:true});
 if(manual.result.value!=='eco')throw Error('QUALITY_MODE_NOT_CHANGED');
 if(Number(data.coreCount)!==0||data.socket!=='CORE_SOCKET'||Number(data.meshes)<100||data.canvas!==1)throw Error('ATLAS_CONTRACT_BROWSER_FAIL '+JSON.stringify(data));
 const perfProbe=await send('Runtime.evaluate',{expression:"(()=>{const q=window.__synestraAtlasQA;const e=q?.scene?.getEngine?.();return {fps:e?.getFps?.(),scenes:q?.scene?.getEngine?.()?.scenes?.length||0,meshes:q?.scene?.meshes?.length||0}})()",returnByValue:true});
 const perf=perfProbe.result.value||{};
 if(!Number.isFinite(perf.fps)||perf.fps<=0)throw Error('FPS_MEASUREMENT_MISSING');
 const ownerTest=await send('Runtime.evaluate',{expression:"(()=>{const q=window.__synestraAtlasQA;if(!q)return {ok:false,reason:'QA_MISSING'};const n=q.makeExternal();n.parent=q.decor.coreSocket;q.decor.dispose();return {ok:!n.isDisposed()&&n.parent===null,name:n.name}})()",returnByValue:true});
 if(!ownerTest.result.value?.ok)throw Error('ATLAS_EXTERNAL_CORE_DISPOSED '+JSON.stringify(ownerTest.result.value));
 const report={schema:'synestra.atlas.babylon.browser.r216.v1',result:'PASS',data,mobile,perf,qualityAfterChange:manual.result.value,externalCorePreserved:ownerTest.result.value.ok,exceptions:failures,screenshot:output,mobileScreenshot:mobilePath};
 writeFileSync(join(import.meta.dirname,'..','r216-evidence','reactor-r216-chrome.json'),JSON.stringify(report,null,2));
 console.log('ATLAS_BABYLON_CHROME_E2E_PASS='+JSON.stringify(report));
}catch(e){console.error('ATLAS_BABYLON_CHROME_E2E_FAIL='+String(e));process.exitCode=1}
finally{try{if(send)await send('Browser.close')}catch{}try{ws?.close()}catch{}try{proc.kill()}catch{}try{rmSync(dir,{recursive:true,force:true})}catch{}}
