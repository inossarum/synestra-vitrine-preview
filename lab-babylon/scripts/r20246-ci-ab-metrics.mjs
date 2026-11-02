/**
 * R202.46: ephemeral Chrome/SwiftShader A/B of exact baseline vs candidate.
 * Prints only aggregate pixel metrics and SHA256, never image bytes or artifacts.
 * It does NOT constitute RTX3090 GPU validation or artistic sign-off.
 */
import {createServer} from 'node:http';
import {readFileSync,existsSync,mkdtempSync,rmSync,statSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {tmpdir} from 'node:os';
import {spawnSync,execFile} from 'node:child_process';
import {promisify} from 'node:util';
const exec=promisify(execFile);
import {createHash} from 'node:crypto';
import {inflateSync,deflateSync} from 'node:zlib';
import assert from 'node:assert/strict';

const signature=Buffer.from('89504e470d0a1a0a','hex');
const hash=b=>createHash('sha256').update(b).digest('hex');
export function decodePng(bytes) {
 if(!bytes.subarray(0,8).equals(signature))throw Error('R20246_PNG_SIGNATURE');
 let offset=8,width=0,height=0,channels=0,depth=0;
 const idat=[];
 while(offset+12<=bytes.length) {
  const size=bytes.readUInt32BE(offset),type=bytes.toString('ascii',offset+4,offset+8);
  if(size>50000000||offset+12+size>bytes.length)throw Error('R20246_PNG_CHUNK');
  const data=bytes.subarray(offset+8,offset+8+size);
  if(type==='IHDR'){
   width=data.readUInt32BE(0);height=data.readUInt32BE(4);depth=data[8];
   channels=data[9]===6?4:data[9]===2?3:data[9]===0?1:0;
   if(!channels||depth!==8||width>4096||height>4096||!width||!height)throw Error('R20246_PNG_FORMAT');
  }else if(type==='IDAT'){idat.push(data)}
  offset+=size+12;
  if(type==='IEND')break;
 }
 if(!width||!height||!idat.length)throw Error('R20246_PNG_INCOMPLETE');
 const bytesPerLine=width*channels,raw=inflateSync(Buffer.concat(idat));
 if(raw.length!==(bytesPerLine+1)*height)throw Error('R20246_PNG_RAW_LENGTH');
 const rgba=Buffer.alloc(width*height*4),prev=Buffer.alloc(bytesPerLine),row=Buffer.alloc(bytesPerLine);
 let pos=0;
 const paeth=(a,b,c)=>{const p=a+b-c,pa=Math.abs(p-a),pb=Math.abs(p-b),pc=Math.abs(p-c);return pa<=pb&&pa<=pc?a:pb<=pc?b:c};
 for(let y=0;y<height;y++){
  const f=raw[pos++];
  if(f>4)throw Error('R20246_PNG_FILTER');
  for(let x=0;x<bytesPerLine;x++){
   const v=raw[pos++],a=x>=channels?row[x-channels]:0,b=prev[x],c=x>=channels?prev[x-channels]:0;
   row[x]=(v+(f===0?0:f===1?a:f===2?b:f===3?Math.floor((a+b)/2):paeth(a,b,c)))&255;
  }
  for(let x=0;x<width;x++){
   const src=x*channels,dst=(y*width+x)*4;
   if(channels===1){rgba[dst]=rgba[dst+1]=rgba[dst+2]=row[src]}else{
    rgba[dst]=row[src];rgba[dst+1]=row[src+1];rgba[dst+2]=row[src+2];
   }
   rgba[dst+3]=channels===4?row[src+3]:255;
  }
  row.copy(prev);
 }
 return{width,height,rgba};
}
function selfTest(){
 const mkChunk=(type,data)=>{const b=Buffer.alloc(data.length+12);b.writeUInt32BE(data.length,0);b.write(type,4,'ascii');data.copy(b,8);return b};
 const ihdr=Buffer.alloc(13);ihdr.writeUInt32BE(1,0);ihdr.writeUInt32BE(1,4);ihdr[8]=8;ihdr[9]=6;
 const png=Buffer.concat([signature,mkChunk('IHDR',ihdr),mkChunk('IDAT',deflateSync(Buffer.from([0,80,40,20,255]))),mkChunk('IEND',Buffer.alloc(0))]);
 const x=decodePng(png);assert.equal(x.width,1);assert.equal(x.height,1);
 assert.deepEqual([...x.rgba],[80,40,20,255]);
 console.log('R20246_PNG_DECODER_SELFTEST_PASS');
}
function metric(base,candidate,box) {
 if(base.width!==candidate.width||base.height!==candidate.height)throw Error('R20246_SCREENSHOT_DIMENSIONS_DIFFER');
 const {width,height}=base,{x0,y0,x1,y1,stride}=box;
 if(x0<0||y0<0||x1>width||y1>height)throw Error('R20246_REGION_OUTSIDE_FRAME');
 let ba=0,ca=0,delta=0,n=0;
 for(let y=y0;y<y1;y+=stride)for(let x=x0;x<x1;x+=stride){
  const i=(y*width+x)*4;
  const lum=(pixels)=>.2126*pixels[i]+.7152*pixels[i+1]+.0722*pixels[i+2];
  const a=lum(base.rgba),b=lum(candidate.rgba);
  ba+=a;ca+=b;delta+=Math.abs(b-a);n++;
 }
 return {region:box.name,samples:n,base_luma:Number((ba/n).toFixed(4)),candidate_luma:Number((ca/n).toFixed(4)),delta_pct:Number((100*(ca/Math.max(ba,.0001)-1)).toFixed(4)),mean_absolute_difference:Number((delta/n).toFixed(4))};
}

/* Temporary reduced A/B preview in private GitHub job log, no artifact upload.
   The full-size captures are still deleted after the CI run. */
function encodeReviewThumbnail(a,b){
 if(a.width!==b.width||a.height!==b.height)throw Error('R20246_THUMBNAIL_FRAME_MISMATCH');
 const panelWidth=320,gap=4,width=panelWidth*2+gap,height=320;
 const src={x:140,y:180,width:560,height:550};
 if(src.x+src.width>a.width||src.y+src.height>a.height)throw Error('R20246_THUMBNAIL_SOURCE_BOUNDS');
 const stride=width*4,scan=Buffer.alloc((stride+1)*height);
 for(let y=0;y<height;y++){
  const sy=src.y+Math.floor(y*src.height/height);
  for(let x=0;x<width;x++){
   const row=(stride+1)*y,dst=row+1+4*x;
   if(x>=panelWidth&&x<panelWidth+gap){scan[dst+3]=255;continue;}
   const which=x<panelWidth?a:b;
   const local=x<panelWidth?x:x-panelWidth-gap;
   const sx=src.x+Math.floor(local*src.width/panelWidth);
   const at=(sy*a.width+sx)*4;
   // 6-bit channel quantization bounds private-log size; alpha stays opaque.
   for(let k=0;k<3;k++)scan[dst+k]=which.rgba[at+k]&252;
   scan[dst+3]=255;
  }
 }
 let table=null;
 function crc(data){
  if(!table){
   table=new Uint32Array(256);
   for(let n=0;n<256;n++){
    let c=n;for(let j=0;j<8;j++)c=(c&1)?(0xedb88320^(c>>>1)):(c>>>1);
    table[n]=c>>>0;
   }
  }
  let c=0xffffffff;
  for(const b of data)c=(table[(c^b)&255]^(c>>>8))>>>0;
  return(c^0xffffffff)>>>0;
 }
 function chunk(type,payload){
  const header=Buffer.from(type,'ascii'),body=Buffer.concat([header,payload]);
  const out=Buffer.alloc(payload.length+12);out.writeUInt32BE(payload.length,0);
  body.copy(out,4);out.writeUInt32BE(crc(body),out.length-4);return out;
 }
 const ihdr=Buffer.alloc(13);
 ihdr.writeUInt32BE(width,0);ihdr.writeUInt32BE(height,4);ihdr[8]=8;ihdr[9]=6;
 const png=Buffer.concat([signature,chunk('IHDR',ihdr),chunk('IDAT',deflateSync(scan,{level:9})),chunk('IEND',Buffer.alloc(0))]);
 const decoded=decodePng(png);
 if(decoded.width!==width||decoded.height!==height)throw Error('R20246_THUMBNAIL_ROUNDTRIP');
 return png;
}

if(process.argv.includes('--self-test')){selfTest()}
else {
 const root=resolve(import.meta.dirname,'..');
 const baseBundle=process.env.R20246_BASE_BUNDLE;
 if(!baseBundle||!existsSync(baseBundle)||!existsSync(join(root,'dist/babylon-lab.js')))throw Error('R20246_BUNDLES_MISSING');
 const chrome=process.env.R202_CHROME_BIN;
 if(!chrome||spawnSync(chrome,['--version'],{encoding:'utf8',timeout:5000}).status!==0)throw Error('R20246_CHROME_UNAVAILABLE');
 const server=createServer((req,res)=>{
  const match=new URL(req.url,'http://127.0.0.1').pathname.match(/^\/(base|candidate)\/lab-babylon\/(.*)$/);
  if(!match){res.writeHead(404);res.end();return}
  const file=match[2]||'index.html';
  const allowed=new Set(['index.html','style.css','dist/babylon-lab.js']);
  if(!allowed.has(file)){res.writeHead(404);res.end();return}
  const filePath=file==='dist/babylon-lab.js'&&match[1]==='base'?baseBundle:join(root,file);
  res.writeHead(200,{'Content-Type':file.endsWith('.html')?'text/html':file.endsWith('.css')?'text/css':'application/javascript'});
  res.end(readFileSync(filePath));
 });
 await new Promise((ok,fail)=>{server.once('error',fail);server.listen(0,'127.0.0.1',ok)});
 const dir=mkdtempSync(join(tmpdir(),'r20246-ab-'));
 try{
  const images={};
  for(const name of ['base','candidate']){
   const shot=join(dir,name+'.png');
   const url='http://127.0.0.1:'+server.address().port+'/'+name+'/lab-babylon/?labFrame=6&qaQuality=ultra&qaPower=145';
   const args=['--headless=new','--no-sandbox','--disable-dev-shm-usage','--enable-unsafe-swiftshader','--use-gl=angle','--use-angle=swiftshader','--enable-webgl','--virtual-time-budget=4000','--window-size=1100,900','--screenshot='+shot,'--dump-dom',url];
   // The HTTP server runs on this same event loop; synchronous spawning would
   // deadlock the browser's requests until the child timeout (CI failure-first).
   const {stdout}=await exec(chrome,args,{timeout:45000,maxBuffer:4000000});
   for(const token of ['data-sphere-ready="true"','data-canvas-count="1"','data-facet-depth-active="true"','data-plasma-volume="r20215-raymarch-16"'])
    if(!stdout.includes(token))throw Error('R20246_BROWSER_NOT_READY_'+name+'_'+token);
   if(!existsSync(shot)||statSync(shot).size<20000)throw Error('R20246_SCREENSHOT_EMPTY_'+name);
   const raw=readFileSync(shot);images[name]={sha256:hash(raw),pixels:decodePng(raw)};
  }
  if(images.base.sha256===images.candidate.sha256)throw Error('R20246_NO_PIXEL_DIFFERENCE');
  const a=images.base.pixels,b=images.candidate.pixels;
  const boxes=[{name:'fixed_central_window',x0:319,y0:388,x1:460,y1:536,stride:3},{name:'scene_window',x0:140,y0:180,x1:700,y1:730,stride:5}];
  if(process.env.R20246_VISUAL_REVIEW_LOG==='1'){
   const thumbnail=encodeReviewThumbnail(a,b);
   if(thumbnail.length>750000)throw Error('R20246_THUMBNAIL_SIZE_LIMIT');
   console.log('R20246_PRIVATE_THUMBNAIL_PNG='+thumbnail.toString('base64'));
   console.log(JSON.stringify({status:'R20246_PRIVATE_REVIEW_THUMBNAIL_EMITTED',sha256:hash(thumbnail),width:644,height:320,baseline:'left',candidate:'right',full_images_deleted:true,storage:'PRIVATE_GITHUB_ACTIONS_LOG_ONLY'}));
  }
  console.log(JSON.stringify({status:'R20246_CHROME_SOFTWARE_AB_METRICS_PASS',gpu:'SWIFTSHADER_NOT_RTX3090',head:process.env.GITHUB_SHA||'UNKNOWN',width:a.width,height:a.height,baseline_sha256:images.base.sha256,candidate_sha256:images.candidate.sha256,regions:boxes.map(bx=>metric(a,b,bx)),images_persisted:false,art_signoff:false}));
 }finally{rmSync(dir,{force:true,recursive:true});await new Promise(ok=>server.close(ok))}
}
