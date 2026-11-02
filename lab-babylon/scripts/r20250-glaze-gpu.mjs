import {readFileSync,writeFileSync,existsSync,mkdirSync} from 'node:fs';
import {join} from 'node:path';
import {createServer} from 'node:http';
import {spawn} from 'node:child_process';
import {createHash} from 'node:crypto';
const root=process.env.SYNESTRA_STAGING_ROOT||'I:\\_STUDIO_STAGING';
const chrome=process.env.R202_CHROME_BIN||'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const out=join(root,'SYN_LAB_R20250_R20251_GPU_QA_20261102','run-'+Date.now()+'-'+process.pid);
mkdirSync(out,{recursive:true});
const paths={
 baseline:join(root,'SYN_LAB_R20249_HPSYN_REPLAY_20261102','lab-babylon','src','plasma-field.js'),
 candidate:join(root,'SYN_LAB_R20250_R20251_INTEGRATION_QA_20261102','lab-babylon','src','plasma-field.js')
};
const hash=v=>createHash('sha256').update(v).digest('hex');
function extract(name){
 const text=readFileSync(paths[name],'utf8');
 const begin=text.indexOf('export function createPlasmaHeartMaterial');
 if(begin<0)throw Error('HEART_NOT_FOUND_'+name);
 function source(token){
  const prefix='const '+token+' = '+String.fromCharCode(96);
  const i=text.indexOf(prefix,begin);if(i<0)throw Error('GLSL_'+token+'_MISSING');
  const start=i+prefix.length;const end=text.indexOf(String.fromCharCode(96)+';',start);
  if(end<0)throw Error('GLSL_'+token+'_TRUNCATED');
  return text.slice(start,end);
 }
 return {v:source('vertexSource'),f:source('fragmentSource'),src_sha256:hash(text)};
}
const src={baseline:extract('baseline'),candidate:extract('candidate')};
if(src.baseline.f.includes('coldFacetShadow')||!src.candidate.f.includes('coldFacetShadow'))throw Error('FAILURE_FIRST_DIFFERENCE_MISSING');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
function runWebGL(){
 try{
  const canvas=document.querySelector('canvas');
  const gl=canvas.getContext('webgl',{preserveDrawingBuffer:true,antialias:false,alpha:false});
  if(!gl)throw Error('WEBGL_CONTEXT_MISSING');
  const shader=(type,source)=>{const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);
   if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error('GLSL:'+gl.getShaderInfoLog(s));return s};
  const p=gl.createProgram();gl.attachShader(p,shader(gl.VERTEX_SHADER,vertex));gl.attachShader(p,shader(gl.FRAGMENT_SHADER,fragment));
  gl.linkProgram(p);if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw Error('GL_LINK:'+gl.getProgramInfoLog(p));
  gl.useProgram(p);
  const arr=[];
  for(let i=0;i<16;i++){
   const a=i*Math.PI*2/16,b=(i+1)*Math.PI*2/16;
   const nx=Math.cos((a+b)/2)*(.4+.45*(i%3)/2),ny=Math.sin((a+b)/2)*(.4+.45*(i%3)/2);
   const nz=(i%4===0?.28:.92);const norm=Math.hypot(nx,ny,nz);
   const normal=[nx/norm,ny/norm,nz/norm];
   for(const pos of [[0,0,.2],[Math.cos(a)*.72,Math.sin(a)*.72,.2],[Math.cos(b)*.72,Math.sin(b)*.72,.2]])arr.push(...pos,...normal);
  }
  const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(arr),gl.STATIC_DRAW);
  for(const [name,start] of [['position',0],['normal',3]]){const a=gl.getAttribLocation(p,name);if(a<0)throw Error('ATTRIBUTE_'+name);gl.enableVertexAttribArray(a);gl.vertexAttribPointer(a,3,gl.FLOAT,false,24,start*4)}
  const identity=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);
  for(const n of ['world','worldViewProjection'])gl.uniformMatrix4fv(gl.getUniformLocation(p,n),false,identity);
  gl.uniform1f(gl.getUniformLocation(p,'uTime'),.65);
  gl.uniform1f(gl.getUniformLocation(p,'uPower'),power);
  gl.uniform3f(gl.getUniformLocation(p,'uCamera'),0,0,4.8);
  gl.viewport(0,0,800,800);gl.clearColor(0,0,0,1);gl.clear(gl.COLOR_BUFFER_BIT);
  gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
  gl.drawArrays(gl.TRIANGLES,0,48);
  const err=gl.getError();if(err!==gl.NO_ERROR)throw Error('GL_DRAW_'+err);
  const ext=gl.getExtension('WEBGL_debug_renderer_info');
  const renderer=ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER);
  const pixels=new Uint8Array(800*800*4);gl.readPixels(0,0,800,800,gl.RGBA,gl.UNSIGNED_BYTE,pixels);
  let rgb=0,lit=0,points=0,quadrant=[0,0,0,0];
  for(let y=180;y<620;y+=2)for(let x=180;x<620;x+=2){
   const k=4*(y*800+x),v=pixels[k]+pixels[k+1]+pixels[k+2];rgb+=v;points++;if(v>8)lit++;
   quadrant[(x>=400?1:0)+(y>=400?2:0)]+=v;
  }
  document.body.dataset.qa=JSON.stringify({status:'PASS',renderer,mean_rgb:rgb/(3*points),lit_percent:100*lit/points,quadrant_rgb:quadrant.map(v=>v/(3*points/4)),samples:points,canvas_count:document.querySelectorAll('canvas').length});
 }catch(e){document.body.dataset.qa=JSON.stringify({status:'FAIL',error:String(e)})}
}
const html=(name,power)=>'<html><head><meta charset="utf-8"></head><body style="background:#060b1a;color:#dfe5fa;font:16px Arial"><h3>R20250 facet-glaze QA '+name+' power '+power+'</h3><canvas width="800" height="800"></canvas><script>const vertex='+JSON.stringify(src[name].v)+';const fragment='+JSON.stringify(src[name].f)+';const power='+power+';('+runWebGL.toString()+')()</script></body></html>';
const server=createServer((req,res)=>{const url=new URL(req.url,'http://localhost');const v=url.searchParams.get('variant');const power=Number(url.searchParams.get('power'));if(!Object.hasOwn(src,v)||![0,1.45].includes(power)){res.writeHead(400);res.end('invalid');return}res.writeHead(200,{'Content-Type':'text/html','Cache-Control':'no-store'});res.end(html(v,power))});
const report={schema:'synestra.lab.r20250-cold-glaze-webgl-qa.v1',scope:'standalone native WebGL1 physical GPU; 16 representative sector faces, NOT original Babylon 80-face scene',baseline_ref:'60171bb17d038c7d05b1e1d09cb953f0d496380c',candidate_merge_tree:'42086191c00a0904626ae0fcca32b7f010c2c752',shaders_sha256:{baseline:src.baseline.src_sha256,candidate:src.candidate.src_sha256},results:[]};
let proc,ws,port,portfile;
try{
 await new Promise((ok,no)=>{server.once('error',no);server.listen(0,'127.0.0.1',ok)});
 const profile=join(out,'chrome-owned');portfile=join(profile,'DevToolsActivePort');
 proc=spawn(chrome,['--headless=new','--no-first-run','--disable-extensions','--disable-background-networking','--remote-debugging-port=0','--user-data-dir='+profile,'--use-gl=angle','--use-angle=d3d11','--window-size=900,950','about:blank'],{windowsHide:true,stdio:'ignore'});
 for(let n=0;n<90&&!existsSync(portfile);n++)await sleep(200);
 if(!existsSync(portfile))throw Error('CDP_PORT_MISSING');
 const lines=readFileSync(portfile,'utf8').trim().split(/\r?\n/);port=Number(lines[0]);
 const tabs=await (await fetch('http://127.0.0.1:'+port+'/json/list')).json();const tab=tabs.find(x=>x.type==='page');if(!tab)throw Error('PAGE_MISSING');
 ws=new WebSocket(tab.webSocketDebuggerUrl);await new Promise((ok,no)=>{ws.onopen=ok;ws.onerror=no});
 let id=0;const pending=new Map();
 ws.onmessage=e=>{let x;try{x=JSON.parse(e.data)}catch{return}const p=pending.get(x.id);if(!p)return;pending.delete(x.id);x.error?p.reject(Error(JSON.stringify(x.error))):p.resolve(x.result)};
 const send=(method,params={})=>new Promise((resolve,reject)=>{const i=++id;pending.set(i,{resolve,reject});ws.send(JSON.stringify({id:i,method,params}));setTimeout(()=>{if(pending.has(i)){pending.delete(i);reject(Error('TIMEOUT_'+method))}},12000)});
 await send('Page.enable');await send('Runtime.enable');
 for(const power of [1.45,0])for(const name of ['baseline','candidate']){
  await send('Page.navigate',{url:'http://127.0.0.1:'+server.address().port+'/?variant='+name+'&power='+power});
  let data;
  for(let n=0;n<80;n++){await sleep(150);const q=await send('Runtime.evaluate',{expression:'document.body?.dataset.qa||null',returnByValue:true});if(q.result?.value){data=JSON.parse(q.result.value);break}}
  if(!data||data.status!=='PASS')throw Error('RENDER_'+name+'_'+power+'_'+JSON.stringify(data));
  const capture=await send('Page.captureScreenshot',{format:'png',fromSurface:true,captureBeyondViewport:false});
  const bytes=Buffer.from(capture.data,'base64');
  if(bytes.length<(power===0?650:10000)||bytes.subarray(0,8).toString('hex')!=='89504e470d0a1a0a')throw Error('PNG_INVALID_'+name);
  const filename='r20250-'+name+'-power-'+power+'.png';writeFileSync(join(out,filename),bytes);
  report.results.push({variant:name,power,...data,filename,png_sha256:hash(bytes),png_bytes:bytes.length});
  console.log('R20250_GPU_SAMPLE '+name+' power='+power+' mean_rgb='+data.mean_rgb+' renderer='+data.renderer);
 }
 report.status=report.results.every(r=>r.renderer.includes('NVIDIA GeForce RTX 3090'))?'PASS':'PARTIAL_NON_HARDWARE';
 const a=report.results.find(r=>r.variant==='baseline'&&r.power===1.45);
 const b=report.results.find(r=>r.variant==='candidate'&&r.power===1.45);
 if(a.png_sha256===b.png_sha256||Math.abs(a.mean_rgb-b.mean_rgb)<.01)throw Error('VISUAL_DIFFERENCE_NOT_DEMONSTRATED');
 for(const r of report.results.filter(r=>r.power===0))if(r.lit_percent>0||r.mean_rgb>0)throw Error('POWER_ZERO_VIOLATION_'+r.variant);
}catch(e){report.status='FAIL';report.error=String(e);process.exitCode=2;console.error('R20250_GPU_FAIL '+report.error)}
finally{
 writeFileSync(join(out,'r20250-glaze-gpu.json'),JSON.stringify(report,null,2));
 console.log('R20250_GPU_STATUS '+report.status+' results='+report.results.length+' out='+out);
 if(port&&portfile&&existsSync(portfile)){try{const ep=readFileSync(portfile,'utf8').trim().split(/\r?\n/)[1];const ctl=new WebSocket('ws://127.0.0.1:'+port+ep);await new Promise((ok,no)=>{ctl.onopen=ok;ctl.onerror=no});ctl.send(JSON.stringify({id:1,method:'Browser.close'}));await sleep(650);ctl.close();console.log('R20250_OWN_BROWSER_CLOSE_SENT')}catch(e){console.error('R20250_CLOSE_UNKNOWN '+String(e))}}
 try{ws?.close()}catch{}try{proc?.kill()}catch{}
 if(server.listening)await new Promise(ok=>server.close(ok));
}
