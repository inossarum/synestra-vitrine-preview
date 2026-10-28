import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const pages=await (await fetch('http://127.0.0.1:18851/json')).json();
const page=pages.find(p=>p.type==='page');
assert.ok(page?.webSocketDebuggerUrl,'No local Chrome page');
const ws=new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve,reject)=>{ws.addEventListener('open',resolve,{once:true});ws.addEventListener('error',reject,{once:true});});
let id=0;const pending=new Map();
ws.addEventListener('message',event=>{
 const m=JSON.parse(event.data);
 if(!m.id)return;
 const cb=pending.get(m.id);if(!cb)return;
 pending.delete(m.id);if(m.error)cb.reject(Error(JSON.stringify(m.error)));else cb.resolve(m.result);
});
const send=(method,params={})=>new Promise((resolve,reject)=>{
 const n=++id;pending.set(n,{resolve,reject});ws.send(JSON.stringify({id:n,method,params}));
});
const evaluate=async expression=>{
 const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});
 if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));
 return r.result.value;
};
async function capture(file){
 const r=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
 writeFileSync(join(root,file),Buffer.from(r.data,'base64'));
}
await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});
const instrumentation="(()=>{"+
"const proto=WebGLRenderingContext.prototype,locs=new WeakMap();"+
"const saved={get:proto.getUniformLocation,two:proto.uniform2f,three:proto.uniform3f,time:proto.uniform1f};"+
"window.__r190qa={tilts:[],maxPointer:0,lastPointer:[0,0,0],calls:0,timeConstant:6.2};"+
"proto.getUniformLocation=function(program,name){const l=saved.get.call(this,program,name);if(l)locs.set(l,name);return l;};"+
"proto.uniform2f=function(loc,a,b){if(locs.get(loc)==='uTilt')window.__r190qa.tilts.push([a,b]);return saved.two.call(this,loc,a,b);};"+
"proto.uniform3f=function(loc,a,b,c){if(locs.get(loc)==='uPointer'){const q=window.__r190qa;q.lastPointer=[a,b,c];q.maxPointer=Math.max(q.maxPointer,c);q.calls++;}return saved.three.call(this,loc,a,b,c);};"+
"proto.uniform1f=function(loc,value){if(locs.get(loc)==='uTime')value=window.__r190qa.timeConstant;return saved.time.call(this,loc,value);};"+
"})();";
await send('Page.addScriptToEvaluateOnNewDocument',{source:instrumentation});
await send('Page.navigate',{url:'http://127.0.0.1:18850/r190-hero-hover-flux.html'});
let ready=false;
for(let k=0;k<40;k++){
 await sleep(150);
 const s=await evaluate('Boolean(document.querySelector(".core-r108-stage[data-core-ready=true]") && window.__r190qa && window.__r190qa.calls>4)');
 if(s){ready=true;break;}
}
assert.ok(ready,'WebGL renderer not ready in Chrome');
await evaluate('document.getAnimations().forEach(a=>a.pause())');
const coords=await evaluate('(()=>{const r=document.querySelector(".core-r109-canvas").getBoundingClientRect();return {x:Math.round(r.left+r.width/2),y:Math.round(r.top+r.height/2),w:r.width,h:r.height}})()');
assert.ok(coords.w>50&&coords.h>50,'Invalid canvas rectangle');
await sleep(130);
await capture('r190-before-hover.png');
const initial=await evaluate('({...window.__r190qa,tilts:window.__r190qa.tilts.slice(-6)})');
await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:coords.x-26,y:coords.y+10});
await sleep(120);
await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:coords.x+22,y:coords.y-18});
await sleep(230);
await capture('r190-after-hover.png');
const hover=await evaluate('({...window.__r190qa,tilts:window.__r190qa.tilts.slice(-10)})');
await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:14,y:15});
await sleep(1850);
const rest=await evaluate('({...window.__r190qa,tilts:window.__r190qa.tilts.slice(-10)})');
assert.ok(initial.calls>0,'WebGL pointer uniform not submitted');
assert.ok(hover.maxPointer>.05,'Hover impulse did not reach WebGL shader');
assert.ok(hover.lastPointer[2]>.02,'Live perturbation not active after mouse movement');
assert.ok(rest.lastPointer[2]<hover.lastPointer[2]*.15,'Hover perturbation did not decay');
assert.ok(hover.tilts.length>2&&hover.tilts.every(v=>v[0]===0&&v[1]===0),'Camera tilt changed');
const evidence={schema:'synestra.siteforge.r190.chrome-pointer-qa.v1',url:'http://127.0.0.1:18850/r190-hero-hover-flux.html',
 viewport:'1440x900',webgl_ready:ready,canvas:coords,initial_pointer:initial.lastPointer,
 hover_pointer:hover.lastPointer,max_hover_strength:hover.maxPointer,
 rest_pointer:rest.lastPointer,tilt_samples:hover.tilts,
 effect_local_decay:true,screen_before:'r190-before-hover.png',screen_after:'r190-after-hover.png',assertions:'PASS'};
writeFileSync(join(root,'evidence','SITEFORGE_R190_POINTER_CHROME_20261028.json'),JSON.stringify(evidence,null,2)+'\n');
console.log(JSON.stringify(evidence,null,2));
ws.close();
