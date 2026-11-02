import {readFileSync,writeFileSync,existsSync,mkdirSync} from 'node:fs';
import {createServer} from 'node:http';
import {join} from 'node:path';
import {spawn} from 'node:child_process';
import {createHash} from 'node:crypto';
const root=process.env.SYNESTRA_STAGING_ROOT||'I:\\_STUDIO_STAGING';
const out=join(root,'SYN_LAB_R20251_WEBGL_SHADER_QA_20261102','run-'+Date.now()+'-'+process.pid);mkdirSync(out,{recursive:true});
const chrome=process.env.R202_CHROME_BIN||'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const sourcePath={
 base:join(root,'SYN_LAB_R20249_HPSYN_REPLAY_20261102','lab-babylon','src','plasma-volume-r20215.js'),
 candidate:join(root,'SYN_LAB_R20251_VOLUME_APERTURE_HPSYN_20261102','lab-babylon','src','plasma-volume-r20215.js')
};
function extract(name){
 const src=readFileSync(sourcePath[name],'utf8');
 function part(key){const mark='const '+key+' = '+String.fromCharCode(96);const i=src.indexOf(mark);if(i<0)throw Error('SOURCE_MISSING_'+key);const start=i+mark.length,end=src.indexOf(String.fromCharCode(96)+';',start);if(end<0)throw Error('SOURCE_END_MISSING');return src.slice(start,end)}
 return {v:part('vertexSource'),f:part('fragmentSource'),sha256:createHash('sha256').update(src).digest('hex')};
}
const shaders={base:extract('base'),candidate:extract('candidate')};
function browserHarness(){
 try{
 const c=document.querySelector('canvas'),gl=c.getContext('webgl',{preserveDrawingBuffer:true,antialias:false});
 if(!gl)throw Error('WEBGL_MISSING');
 const compile=(type,src)=>{const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error('COMPILE:'+gl.getShaderInfoLog(s));return s;};
 const program=gl.createProgram();
 gl.attachShader(program,compile(gl.VERTEX_SHADER,vertex));
 gl.attachShader(program,compile(gl.FRAGMENT_SHADER,fragment));
 gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('LINK:'+gl.getProgramInfoLog(program));
 gl.useProgram(program);
 const verts=new Float32Array([-1,-1,.2,0,0,1, 1,-1,.2,0,0,1, 1,1,.2,0,0,1,-1,-1,.2,0,0,1,1,1,.2,0,0,1,-1,1,.2,0,0,1]);
 const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,verts,gl.STATIC_DRAW);
 for(const [n,pos] of [['position',0],['normal',3]]){const at=gl.getAttribLocation(program,n);if(at<0)throw Error('ATTR_MISSING_'+n);gl.enableVertexAttribArray(at);gl.vertexAttribPointer(at,3,gl.FLOAT,false,24,pos*4);}
 const I=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);
 for(const n of ['world','worldViewProjection'])gl.uniformMatrix4fv(gl.getUniformLocation(program,n),false,I);
 for(const [n,v] of [['uTime',.4],['uLayer',1],['uOpacity',1.0],['uLayerRadius',1.45],['uCorePower',1.45]])gl.uniform1f(gl.getUniformLocation(program,n),v);
 gl.uniform1i(gl.getUniformLocation(program,'uSteps'),16);
 gl.uniform3f(gl.getUniformLocation(program,'uCameraLocal'),0,0,4.8);
 gl.uniform3f(gl.getUniformLocation(program,'uCamera'),0,0,4.8);
 gl.viewport(0,0,800,800);gl.clearColor(0,0,0,1);gl.clear(gl.COLOR_BUFFER_BIT);gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.drawArrays(gl.TRIANGLES,0,6);
 const e=gl.getError();if(e!==gl.NO_ERROR)throw Error('DRAW_ERROR_'+e);
 const ext=gl.getExtension('WEBGL_debug_renderer_info');
 const renderer=ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER);
 const px=new Uint8Array(800*800*4);gl.readPixels(0,0,800,800,gl.RGBA,gl.UNSIGNED_BYTE,px);
 function region(l,t,r,b){let sum=0,nonzero=0,n=0;for(let y=t;y<b;y+=2)for(let x=l;x<r;x+=2){let k=4*(800*y+x),v=px[k]+px[k+1]+px[k+2];sum+=v;if(v>2)nonzero++;n++}return {n,mean_rgb:sum/(3*n),nonzero_percent:100*nonzero/n}}
 document.body.dataset.qa=JSON.stringify({status:'PASS',renderer,center:region(310,310,490,490),wide:region(140,140,660,660),canvas_count:document.querySelectorAll('canvas').length});
 }catch(e){document.body.dataset.qa=JSON.stringify({status:'FAIL',error:String(e)})}
}
function html(name){
 const src=shaders[name];
 return '<!doctype html><html><meta charset="utf-8"><body style="margin:0;background:#090e1b;color:white"><h2>R202.51 Shader QA '+name+'</h2><canvas width="800" height="800"></canvas><script>const vertex='+JSON.stringify(src.v)+';const fragment='+JSON.stringify(src.f)+';('+browserHarness.toString()+')()</script></body></html>';
}
const server=createServer((req,res)=>{const v=new URL(req.url,'http://localhost').searchParams.get('v');if(!Object.hasOwn(shaders,v)){res.writeHead(400);res.end();return}res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});res.end(html(v))});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const report={schema:'synestra.r20251.standalone-webgl.v1',baseline:'60171bb17d038c7d05b1e1d09cb953f0d496380c',candidate:'c32f243889d3087386e58ea8f91cb56b6eef06db',scope:'GLSL_WEBGL1_STANDALONE_ALPHA_BLEND_NOT_BABYLON',results:[]};
let proc,ws,port,portfile;
try{
 await new Promise((ok,no)=>{server.once('error',no);server.listen(0,'127.0.0.1',ok)});
 const profile=join(out,'chrome-profile-blend-owned');
 portfile=join(profile,'DevToolsActivePort');
 proc=spawn(chrome,['--headless=new','--no-first-run','--disable-extensions','--disable-background-networking','--remote-debugging-port=0','--user-data-dir='+profile,'--use-gl=angle','--use-angle=d3d11','--window-size=900,900','about:blank'],{windowsHide:true,stdio:'ignore'});
 for(let n=0;n<80&&!existsSync(portfile);n++)await sleep(250);
 if(!existsSync(portfile))throw Error('CDP_PORT_MISSING');
 port=Number(readFileSync(portfile,'utf8').split(/\r?\n/)[0]);
 const tabs=await(await fetch('http://127.0.0.1:'+port+'/json/list')).json();
 const tab=tabs.find(x=>x.type==='page');if(!tab)throw Error('CDP_TAB_MISSING');
 ws=new WebSocket(tab.webSocketDebuggerUrl);await new Promise((ok,no)=>{ws.onopen=ok;ws.onerror=no});
 let id=0;const waiting=new Map();
 ws.onmessage=e=>{let x;try{x=JSON.parse(e.data)}catch{return}const p=waiting.get(x.id);if(!p)return;waiting.delete(x.id);x.error?p.no(Error(JSON.stringify(x.error))):p.ok(x.result)};
 const send=(method,params={})=>new Promise((ok,no)=>{const i=++id;waiting.set(i,{ok,no});ws.send(JSON.stringify({id:i,method,params}));setTimeout(()=>{if(waiting.has(i)){waiting.delete(i);no(Error('CDP_TIMEOUT_'+method))}},12000)});
 await send('Page.enable');await send('Runtime.enable');
 for(const name of ['base','candidate']){
  await send('Page.navigate',{url:'http://127.0.0.1:'+server.address().port+'/?v='+name});
  let d;
  for(let n=0;n<80;n++){await sleep(200);const x=await send('Runtime.evaluate',{expression:'document.body?.dataset.qa||null',returnByValue:true});if(x.result?.value){d=JSON.parse(x.result.value);break}}
  if(!d||d.status!=='PASS')throw Error('SHADER_'+name+'_'+JSON.stringify(d));
  const cap=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false,fromSurface:true});
  const data=Buffer.from(cap.data,'base64');
  if(data.length<10000||data.subarray(0,8).toString('hex')!=='89504e470d0a1a0a')throw Error('PNG_BAD_'+name);
  writeFileSync(join(out,'r20251-glsl-blend-'+name+'.png'),data);
  report.results.push({variant:name,source_sha256:shaders[name].sha256,...d,png_bytes:data.length,png_sha256:createHash('sha256').update(data).digest('hex')});
  console.log('R20251_GL_REAL_PASS '+name+' '+JSON.stringify(d));
 }
 report.status='PASS';
}catch(e){report.status='FAIL';report.error=String(e);process.exitCode=2;console.error('R20251_GL_REAL_FAIL '+report.error)}
finally{
 writeFileSync(join(out,'r20251-glsl-blend-qa.json'),JSON.stringify(report,null,2));
 if(port&&portfile&&existsSync(portfile)){try{const endpoint=readFileSync(portfile,'utf8').trim().split(/\r?\n/)[1];const ctl=new WebSocket('ws://127.0.0.1:'+port+endpoint);await new Promise((ok,no)=>{ctl.onopen=ok;ctl.onerror=no});ctl.send(JSON.stringify({id:1,method:'Browser.close'}));await sleep(600);ctl.close();console.log('R20251_OWN_BROWSER_CLOSE_SENT')}catch(e){console.error('R20251_CLOSE_UNKNOWN '+String(e))}}
 try{ws?.close()}catch{}try{proc?.kill()}catch{}
 if(server.listening)await new Promise(ok=>server.close(ok));
}
