import {spawn} from 'node:child_process';
import {readFileSync,existsSync,mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
const root=process.cwd(),profile=mkdtempSync(join(tmpdir(),'syn-r171-'));
const url=pathToFileURL(join(root,'vitrine-r169-studio-palette-preview.html')).href;
const chrome='C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const child=spawn(chrome,['--headless=new','--disable-gpu','--disable-extensions','--disable-background-networking','--remote-debugging-port=0','--remote-debugging-address=127.0.0.1','--user-data-dir='+profile,url],{windowsHide:true,stdio:'ignore'});
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
let ws,call;
try{
const p=join(profile,'DevToolsActivePort');for(let i=0;i<70&&!existsSync(p);i++)await sleep(150);if(!existsSync(p))throw Error('CHROME_TIMEOUT');
let txt;for(let i=0;i<25;i++){try{txt=readFileSync(p,'utf8');break}catch(e){if(!['EBUSY','EPERM'].includes(e.code))throw e;await sleep(100)}}
const port=Number(txt.split(/\r?\n/)[0]),targets=await(await fetch('http://127.0.0.1:'+port+'/json/list')).json();
const target=targets.find(t=>t.type==='page');ws=new WebSocket(target.webSocketDebuggerUrl);await new Promise((resolve,reject)=>{ws.addEventListener('open',resolve,{once:true});ws.addEventListener('error',reject,{once:true})});
let seq=0;const pending=new Map();ws.addEventListener('message',e=>{let x;try{x=JSON.parse(e.data)}catch{return}const v=pending.get(x.id);if(!v)return;pending.delete(x.id);x.error?v.reject(Error(JSON.stringify(x.error))):v.resolve(x.result)});
call=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));setTimeout(()=>{if(pending.has(id)){pending.delete(id);reject(Error('TIMEOUT '+method))}},8000)});
await call('Page.enable');await call('Runtime.enable');
const evaluate=async()=>{const e=await call('Runtime.evaluate',{expression:`JSON.stringify((()=>{const a=document.querySelector('header.site-header .nav-cta');if(!a)return{notFound:true};const s=getComputedStyle(a),span=getComputedStyle(a.querySelector('span'));const box=a.getBoundingClientRect();return{text:a.innerText,color:s.color,fill:s.webkitTextFillColor,textShadow:s.textShadow,background:s.backgroundImage,bgColor:s.backgroundColor,spanColor:span.color,spanFill:span.webkitTextFillColor,fontSize:s.fontSize,fontWeight:s.fontWeight,opacity:s.opacity,minHeight:s.minHeight,box:{width:box.width,height:box.height,left:box.left,right:box.right},viewport:innerWidth,focusStyle:s.outlineStyle,outlineWidth:s.outlineWidth,outlineColor:s.outlineColor}})())`,returnByValue:true});return JSON.parse(e.result.value)}
for(const width of [1280,390,320]){await call('Emulation.setDeviceMetricsOverride',{width,height:844,deviceScaleFactor:1,mobile:width===390});await call('Page.reload',{ignoreCache:true});await sleep(400);const initial=await evaluate();let state={initial};const document=await call('DOM.getDocument',{depth:1});const node=await call('DOM.querySelector',{nodeId:document.root.nodeId,selector:'header.site-header .nav-cta'});if(node.nodeId){await call('DOM.focus',{nodeId:node.nodeId});state.focus=await evaluate();await call('CSS.enable');await call('CSS.forcePseudoState',{nodeId:node.nodeId,forcedPseudoClasses:['hover']});state.hover=await evaluate();}if(initial.color!=='rgb(7, 21, 35)'||initial.fill!=='rgb(7, 21, 35)'||initial.spanColor!=='rgb(7, 21, 35)'||initial.box.height<48||initial.box.left<0||initial.box.right>width+1||Number.parseFloat(initial.fontSize)<15||state.focus?.focusStyle!=='solid'||state.focus?.outlineWidth!=='3px'||state.hover?.color!==initial.color||state.hover?.background===initial.background)throw Error('CTA_UX_FAIL_'+width+' '+JSON.stringify(state));console.log('CTA_UX_CHROME_'+width+'=PASS '+JSON.stringify({font:initial.fontSize,height:initial.box.height,contrastForeground:initial.color,focus:state.focus.focusStyle,hoverChanged:true}))}
}catch(e){console.error('CTA_ERROR='+String(e));process.exitCode=1}finally{try{await call?.('Browser.close')}catch{};try{ws?.close()}catch{};try{child.kill()}catch{};try{rmSync(profile,{recursive:true,force:true})}catch{}}
