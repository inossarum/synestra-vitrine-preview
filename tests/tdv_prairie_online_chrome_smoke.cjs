'use strict';
/* Public HTML sanity E2E: Chrome on authorized Windows, no Access bypass,
 * no remote mutation beyond isolated browser profile.
 */
const assert=require('node:assert/strict');
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),crypto=require('node:crypto');
const {spawn}=require('node:child_process');
const sleep=t=>new Promise(ok=>setTimeout(ok,t));
const chrome=process.env.CHROME_PATH||'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const root='https://raw.githack.com/inossarum/synestra-vitrine-preview/ad56affc8c9a449377fbccda1daf2a489d2ded0b/demos/terre-du-vivant-prairie-r150.html';
const profile=fs.mkdtempSync(path.join(os.tmpdir(),'tdv-public-preview-'));
let processChrome,websocket,id=0;const pending=new Map(),errors=[];
function call(method,params={}){
 const req=++id;
 return new Promise((resolve,reject)=>{
  const timer=setTimeout(()=>{pending.delete(req);reject(Error('CDP_TIMEOUT:'+method))},18000);
  pending.set(req,{ok:v=>{clearTimeout(timer);resolve(v)},fail:e=>{clearTimeout(timer);reject(e)}});
  websocket.send(JSON.stringify({id:req,method,params}));
 });
}
async function evaluate(expression){
 const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});
 if(r.exceptionDetails)throw Error('EVAL:'+JSON.stringify(r.exceptionDetails).slice(0,380));
 return r.result.value;
}
async function until(expression,name){
 for(let n=0;n<100;n++){let result;try{result=await evaluate(expression)}catch{}if(result)return result;await sleep(110)}
 throw Error('WAIT_TIMEOUT_'+name);
}
const digest=async()=>evaluate("(async()=>{const data=new TextEncoder().encode(document.getElementById('scene').toDataURL());const hash=await crypto.subtle.digest('SHA-256',data);return Array.from(new Uint8Array(hash),v=>v.toString(16).padStart(2,'0')).join('')})()");
(async()=>{
 assert.ok(fs.existsSync(chrome),'CHROME_MISSING');
 processChrome=spawn(chrome,['--headless=new','--no-first-run','--disable-background-networking','--remote-debugging-address=127.0.0.1','--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{stdio:'ignore'});
 let port=0;
 for(let i=0;i<120;i++){const filename=path.join(profile,'DevToolsActivePort');if(fs.existsSync(filename)){port=Number(fs.readFileSync(filename,'utf8').split(/\r?\n/)[0]);break}await sleep(100)}
 assert.ok(port,'CHROME_CDP_PORT_NOT_READY');
 let endpoint='';
 for(let i=0;i<90;i++){try{const pages=await(await fetch('http://127.0.0.1:'+port+'/json/list')).json();endpoint=pages.find(p=>p.type==='page')?.webSocketDebuggerUrl;if(endpoint)break}catch{}await sleep(100)}
 assert.ok(endpoint,'PAGE_ENDPOINT_MISSING');
 websocket=new WebSocket(endpoint);
 await new Promise((ok,bad)=>{websocket.addEventListener('open',ok,{once:true});websocket.addEventListener('error',bad,{once:true})});
 websocket.addEventListener('message',e=>{const p=JSON.parse(e.data);if(p.method==='Runtime.exceptionThrown')errors.push(JSON.stringify(p.params).slice(0,260));if(p.id&&pending.has(p.id)){const f=pending.get(p.id);pending.delete(p.id);p.error?f.fail(Error(p.error.message)):f.ok(p.result)}});
 await call('Page.enable');await call('Runtime.enable');
 await call('Page.navigate',{url:root+'?demo=interactive'});
 assert.equal(await until("document.getElementById('state')?.textContent?.includes('Prêt') ? document.title : null",'INTERACTIVE_READY'),'Terre du Vivant — Exemples Prairie R150');
 assert.equal(await evaluate("location.hostname"),'raw.githack.com','PUBLIC_PREVIEW_ORIGIN');
 assert.equal(await evaluate("document.getElementById('interactive').getAttribute('aria-current')"),'page');
 const initial=await digest();
 await call('Input.dispatchMouseEvent',{type:'mouseMoved',x:500,y:445,buttons:0,pointerType:'mouse'});
 const mouseCount=await until("parseInt(document.getElementById('count')?.textContent)>0?parseInt(document.getElementById('count').textContent):null",'MOUSE_FLOWERING');
 assert.ok(mouseCount>0&&mouseCount<116,'MOUSE_NOT_LOCAL');
 await sleep(600);
 assert.notEqual(await digest(),initial,'MOUSE_RENDER_UNCHANGED');
 await evaluate("document.getElementById('reset').click()");
 assert.equal(await digest(),initial,'RESET_NOT_PIXEL_IDENTICAL');
 await evaluate("document.getElementById('grow').click()");
 await until("document.getElementById('count')?.textContent?.startsWith('116 /')",'REVEAL_ALL');
 const start=await digest();
 await sleep(3600);
 const done=await digest();
 assert.notEqual(start,done,'ANIMATION_DID_NOT_ADVANCE');
 await sleep(450);
 assert.equal(await digest(),done,'ANIMATION_NOT_IDLE');
 await call('Page.navigate',{url:root+'?demo=cinema'});
 await until("document.getElementById('cinema')?.getAttribute('aria-current')==='page'",'CINEMA_READY');
 await until("document.getElementById('count')?.textContent?.startsWith('116 /')",'CINEMA_AUTOSTART');
 assert.equal(errors.length,0,'JAVASCRIPT_ERRORS:'+errors.slice(0,2).join(';'));
 console.log('TDV_PUBLIC_ONLINE_CHROME_PASS '+JSON.stringify({origin:'raw.githack.com',modes:2,mouseCount,reset:'EXACT',autoplay:'ADVANCED_AND_STOPPED',cinema:'AUTOSTART',javascriptErrors:0}));
})().catch(e=>{console.error('TDV_PUBLIC_ONLINE_CHROME_FAIL '+(e.stack||e));process.exitCode=1}).finally(async()=>{try{websocket?.close()}catch{}try{processChrome?.kill()}catch{}await sleep(150);try{fs.rmSync(profile,{recursive:true,force:true})}catch{}});
