import {readFileSync,writeFileSync,existsSync,mkdirSync} from 'node:fs';
import {join} from 'node:path';
import {createServer} from 'node:http';
import {spawn} from 'node:child_process';
import {createHash} from 'node:crypto';
const root=process.env.SYNESTRA_STAGING_ROOT||'I:\\_STUDIO_STAGING';
const chrome=process.env.R202_CHROME_BIN||'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const dir=join(root,'SYN_LAB_R20250_R20251_COMPOSITE_QA_20261102');
const out=join(dir,'run-'+Date.now()+'-'+process.pid);mkdirSync(out,{recursive:true});
const b=join(root,'SYN_LAB_R20249_HPSYN_REPLAY_20261102','lab-babylon','src');
const c=join(root,'SYN_LAB_R20250_R20251_INTEGRATION_QA_20261102','lab-babylon','src');
const sha=v=>createHash('sha256').update(v).digest('hex');
function shaders(path,type){
 const text=readFileSync(path,'utf8');
 const start=type==='heart'?text.indexOf('export function createPlasmaHeartMaterial'):0;
 if(start<0)throw Error('HEART_SOURCE_NOT_FOUND');
 const extract=which=>{const key='const '+which+' = '+String.fromCharCode(96);const s=text.indexOf(key,start);if(s<0)throw Error(which+'_MISSING');const a=s+key.length,z=text.indexOf(String.fromCharCode(96)+';',a);if(z<0)throw Error(which+'_END_MISSING');return text.slice(a,z)};
 return {v:extract('vertexSource'),f:extract('fragmentSource'),source_sha256:sha(text)};
}
const src={
 base:{heart:shaders(join(b,'plasma-field.js'),'heart'),volume:shaders(join(b,'plasma-volume-r20215.js'),'volume')},
 next:{heart:shaders(join(c,'plasma-field.js'),'heart'),volume:shaders(join(c,'plasma-volume-r20215.js'),'volume')}
};
if(src.base.heart.f.includes('coldFacetShadow')||!src.next.heart.f.includes('coldFacetShadow'))throw Error('R20250_SOURCE_GATE_FAILED');
if(src.base.volume.f.includes('coreFrontWindow')||!src.next.volume.f.includes('coreFrontWindow'))throw Error('R20251_SOURCE_GATE_FAILED');
const modes={
 baseline:['base','base',1.45],
 facet_only:['next','base',1.45],
 aperture_only:['base','next',1.45],
 combined:['next','next',1.45],
 off:['next','next',0]
};
function render(){
 try{
 const cv=document.querySelector('canvas'),gl=cv.getContext('webgl',{alpha:false,preserveDrawingBuffer:true,antialias:false});
 if(!gl)throw Error('CONTEXT_MISSING');
 const compile=(t,s)=>{const o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);if(!gl.getShaderParameter(o,gl.COMPILE_STATUS))throw Error('SHADER_COMPILE:'+gl.getShaderInfoLog(o));return o};
 function program(v,f){
  const p=gl.createProgram();gl.attachShader(p,compile(gl.VERTEX_SHADER,v));gl.attachShader(p,compile(gl.FRAGMENT_SHADER,f));gl.linkProgram(p);
  if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw Error('LINK:'+gl.getProgramInfoLog(p));return p
 }
 function draw(v,f,geometry,isVolume){
  const p=program(v,f);gl.useProgram(p);
  const data=new Float32Array(geometry);
  const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);
  for(const [name,start] of [['position',0],['normal',3]]){
   const a=gl.getAttribLocation(p,name);if(a<0)throw Error('ATTR_'+name);
   gl.enableVertexAttribArray(a);gl.vertexAttribPointer(a,3,gl.FLOAT,false,24,start*4);
  }
  const I=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);
  for(const name of ['world','worldViewProjection'])gl.uniformMatrix4fv(gl.getUniformLocation(p,name),false,I);
  gl.uniform1f(gl.getUniformLocation(p,'uTime'),.65);
  gl.uniform1f(gl.getUniformLocation(p,'uPower'),power);
  gl.uniform3f(gl.getUniformLocation(p,'uCamera'),0,0,4.8);
  if(isVolume){
   gl.uniform3f(gl.getUniformLocation(p,'uCameraLocal'),0,0,4.8);
   gl.uniform1f(gl.getUniformLocation(p,'uLayerRadius'),1.45);
   gl.uniform1f(gl.getUniformLocation(p,'uLayer'),1);
   gl.uniform1f(gl.getUniformLocation(p,'uOpacity'),power===0?0:1.0);
   gl.uniform1f(gl.getUniformLocation(p,'uCorePower'),power);
   gl.uniform1i(gl.getUniformLocation(p,'uSteps'),16);
  }
  gl.drawArrays(gl.TRIANGLES,0,data.length/6);
  const err=gl.getError();if(err!==gl.NO_ERROR)throw Error('DRAW_GL_ERROR_'+err);
  for(const name of ['position','normal']){const loc=gl.getAttribLocation(p,name);gl.disableVertexAttribArray(loc)}
  gl.deleteBuffer(buffer);gl.deleteProgram(p);
 }
 const heart=[];
 for(let i=0;i<16;i++){
  const a=i*2*Math.PI/16,b=(i+1)*2*Math.PI/16;
  const nx=Math.cos((a+b)/2)*(.4+.45*(i%3)/2),ny=Math.sin((a+b)/2)*(.4+.45*(i%3)/2),nz=(i%4===0?.28:.92);
  const l=Math.hypot(nx,ny,nz),normal=[nx/l,ny/l,nz/l];
  for(const pos of [[0,0,.2],[Math.cos(a)*.72,Math.sin(a)*.72,.2],[Math.cos(b)*.72,Math.sin(b)*.72,.2]])heart.push(...pos,...normal);
 }
 const volume=[];
 for(let i=0;i<40;i++){
  const a=i*2*Math.PI/40,z=(i+1)*2*Math.PI/40,r=.94;
  const outer1=[r*Math.cos(a),r*Math.sin(a),Math.sqrt(1.45**2-(r*1.4)**2)];
  const outer2=[r*Math.cos(z),r*Math.sin(z),Math.sqrt(1.45**2-(r*1.4)**2)];
  for(const pos of [[0,0,1.45],outer1,outer2])volume.push(...pos,...pos.map(v=>v/Math.hypot(...pos)));
 }
 gl.viewport(0,0,800,800);gl.clearColor(0,0,0,1);gl.clear(gl.COLOR_BUFFER_BIT);
 gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.disable(gl.DEPTH_TEST);gl.disable(gl.CULL_FACE);
 draw(heartV,heartF,heart,false);draw(volumeV,volumeF,volume,true);
 const ext=gl.getExtension('WEBGL_debug_renderer_info');
 const renderer=ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER);
 const pixels=new Uint8Array(800*800*4);gl.readPixels(0,0,800,800,gl.RGBA,gl.UNSIGNED_BYTE,pixels);
 let sum=0,n=0,lit=0,center=0,centerN=0,edge=0,edgeN=0;
 for(let y=150;y<650;y+=2)for(let x=150;x<650;x+=2){const k=4*(y*800+x),v=pixels[k]+pixels[k+1]+pixels[k+2];sum+=v;n++;if(v>6)lit++;if(x>320&&x<480&&y>320&&y<480){center+=v;centerN++}if((x<290||x>510)&&(y<290||y>510)){edge+=v;edgeN++}}
 document.body.dataset.qa=JSON.stringify({status:'PASS',renderer,canvas_count:document.querySelectorAll('canvas').length,mean_rgb:sum/(3*n),lit_percent:100*lit/n,center_rgb:center/(3*centerN),outer_rgb:edge/(3*edgeN)});
 }catch(e){document.body.dataset.qa=JSON.stringify({status:'FAIL',error:String(e)})}
}
function page(mode){
 const [h,v,power]=modes[mode];
 return '<!doctype html><meta charset="utf-8"><body style="background:#080c19;color:#f0ecff;font:15px Arial"><h3>Synestra combined shader QA '+mode+' power '+power+'</h3><canvas width="800" height="800"></canvas><script>const heartV='+JSON.stringify(src[h].heart.v)+';const heartF='+JSON.stringify(src[h].heart.f)+';const volumeV='+JSON.stringify(src[v].volume.v)+';const volumeF='+JSON.stringify(src[v].volume.f)+';const power='+power+';('+render.toString()+')()</script></body>';
}
const server=createServer((req,res)=>{const mode=new URL(req.url,'http://localhost').searchParams.get('mode');if(!Object.hasOwn(modes,mode)){res.writeHead(400);res.end();return}res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});res.end(page(mode))});
const delay=ms=>new Promise(ok=>setTimeout(ok,ms));
const report={schema:'synestra.lab.r20250-r20251.combined-webgl.qa.v1',scope:'single WebGL canvas synthetic composition; not Babylon engine, no mesh parity assertion',source_tree:'42086191c00a0904626ae0fcca32b7f010c2c752',source_shas:{base:src.base,candidate:src.next},results:[]};
delete report.source_shas;
let proc,ws,port,portFile;
try{
 await new Promise((ok,no)=>{server.once('error',no);server.listen(0,'127.0.0.1',ok)});
 const profile=join(out,'chrome-owned');portFile=join(profile,'DevToolsActivePort');
 proc=spawn(chrome,['--headless=new','--no-first-run','--disable-extensions','--disable-background-networking','--remote-debugging-port=0','--user-data-dir='+profile,'--use-gl=angle','--use-angle=d3d11','--window-size=900,950','about:blank'],{windowsHide:true,stdio:'ignore'});
 for(let k=0;k<100&&!existsSync(portFile);k++)await delay(200);
 if(!existsSync(portFile))throw Error('CDP_PORT_MISSING');
 port=Number(readFileSync(portFile,'utf8').trim().split(/\r?\n/)[0]);
 const tabs=await(await fetch('http://127.0.0.1:'+port+'/json/list')).json(),tab=tabs.find(x=>x.type==='page');if(!tab)throw Error('TAB_MISSING');
 ws=new WebSocket(tab.webSocketDebuggerUrl);await new Promise((ok,no)=>{ws.onopen=ok;ws.onerror=no});
 let id=0;const pending=new Map();
 ws.onmessage=e=>{let m;try{m=JSON.parse(e.data)}catch{return}const p=pending.get(m.id);if(!p)return;pending.delete(m.id);m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result)};
 const send=(method,params={})=>new Promise((resolve,reject)=>{const k=++id;pending.set(k,{resolve,reject});ws.send(JSON.stringify({id:k,method,params}));setTimeout(()=>{if(pending.has(k)){pending.delete(k);reject(Error('TIMEOUT_'+method))}},18000)});
 await send('Page.enable');await send('Runtime.enable');
 for(const mode of Object.keys(modes)){
  await send('Page.navigate',{url:'http://127.0.0.1:'+server.address().port+'/?mode='+mode});
  let qa;
  for(let i=0;i<100;i++){await delay(180);const v=await send('Runtime.evaluate',{expression:'document.body?.dataset.qa||null',returnByValue:true});if(v.result?.value){qa=JSON.parse(v.result.value);break}}
  if(!qa||qa.status!=='PASS')throw Error('FRAME_'+mode+'_'+JSON.stringify(qa));
  const cap=await send('Page.captureScreenshot',{format:'png',fromSurface:true,captureBeyondViewport:false});
  const bytes=Buffer.from(cap.data,'base64');
  if(bytes.length<650||bytes.subarray(0,8).toString('hex')!=='89504e470d0a1a0a')throw Error('PNG_'+mode);
  const filename=mode+'.png';writeFileSync(join(out,filename),bytes);
  report.results.push({mode,...qa,filename,sha256:sha(bytes),bytes:bytes.length});
  console.log('COMBINED_GPU_SAMPLE '+mode+' '+qa.mean_rgb+' '+qa.renderer);
 }
 if(!report.results.every(r=>r.renderer.includes('NVIDIA GeForce RTX 3090')&&r.canvas_count===1))throw Error('GPU_OR_CANVAS_UNVERIFIED');
 if(report.results.find(r=>r.mode==='off').mean_rgb!==0)throw Error('POWER_OFF_FAIL');
 if(new Set(report.results.filter(r=>r.mode!=='off').map(r=>r.sha256)).size<3)throw Error('VISUAL_DELTA_MISSING');
 report.status='PASS';
}catch(e){report.status='FAIL';report.error=String(e);process.exitCode=2;console.error('COMBINED_GPU_FAIL '+String(e))}
finally{
 writeFileSync(join(out,'combined-gpu.json'),JSON.stringify(report,null,2));
 console.log('COMBINED_GPU_STATUS '+report.status+' count='+report.results.length+' out='+out);
 if(port&&portFile&&existsSync(portFile)){try{const endpoint=readFileSync(portFile,'utf8').trim().split(/\r?\n/)[1];const ctl=new WebSocket('ws://127.0.0.1:'+port+endpoint);await new Promise((ok,no)=>{ctl.onopen=ok;ctl.onerror=no});ctl.send(JSON.stringify({id:1,method:'Browser.close'}));await delay(700);ctl.close();console.log('OWN_CHROME_CLOSE_SENT')}catch(e){console.error('OWN_CHROME_CLOSE_UNVERIFIED '+String(e))}}
 try{ws?.close()}catch{}try{proc?.kill()}catch{}if(server.listening)await new Promise(ok=>server.close(ok));
}
