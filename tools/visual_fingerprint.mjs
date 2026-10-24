/** Synestra Web Pilot Visual Gate R3 — pixel-derived local fingerprints.
 * The input screenshot is decoded ONLY in the explicitly invoked local capture
 * utility. MCP receives 16x12 aggregates, never screenshot bytes or paths.
 * No WCAG, visual acceptance or visual quality PASS can be produced.
 */
import {createHash} from 'node:crypto';
import {inflateSync} from 'node:zlib';

export const FINGERPRINT_SCHEMA = 'synestra.web-pilot.visual-fingerprint.v1';
const SIGNATURE=Buffer.from([137,80,78,71,13,10,26,10]);
const WIDTH=16,HEIGHT=12,CHANNELS=3;
const MAX_PNG=8*1024*1024,MAX_PIXELS=2560*1800;
const crcTable=Uint32Array.from({length:256},(_,i)=>{
 let c=i;for(let j=0;j<8;j++)c=c&1?0xedb88320^(c>>>1):c>>>1;return c>>>0;
});
function crc32(buf){let c=0xffffffff;for(const b of buf)c=crcTable[(c^b)&255]^(c>>>8);return (c^0xffffffff)>>>0;}
function asPng(x){
 if(!Buffer.isBuffer(x)||x.length<67||x.length>MAX_PNG||!x.subarray(0,8).equals(SIGNATURE))throw Error('PNG_SIGNATURE_OR_BOUND_INVALID');
 let pos=8,width=0,height=0,channels=0,seenIHDR=false,seenEnd=false,idatSeen=false;
 const idats=[];let idatBytes=0;
 while(pos<x.length){
  if(pos+12>x.length)throw Error('PNG_CHUNK_TRUNCATED');
  const n=x.readUInt32BE(pos),start=pos+8,end=start+n,limit=end+4;
  if(n>MAX_PNG||limit>x.length)throw Error('PNG_CHUNK_BOUNDS');
  const typ=x.toString('ascii',pos+4,pos+8),t=x.subarray(pos+4,end);
  if(crc32(t)!==x.readUInt32BE(end))throw Error('PNG_CRC_INVALID');
  if(typ==='IHDR'){
   if(seenIHDR||pos!==8||n!==13)throw Error('PNG_IHDR_INVALID');
   seenIHDR=true;width=x.readUInt32BE(start);height=x.readUInt32BE(start+4);
   const depth=x[start+8],color=x[start+9],compression=x[start+10],filter=x[start+11],interlace=x[start+12];
   if(width<16||height<12||width*height>MAX_PIXELS||depth!==8||![2,6].includes(color)||compression||filter||interlace)throw Error('PNG_UNSUPPORTED_FORMAT');
   channels=color===6?4:3;
  }else if(typ==='IDAT'){
   if(!seenIHDR||seenEnd)throw Error('PNG_ORDER_INVALID');
   idatSeen=true;idatBytes+=n;
   if(idatBytes>MAX_PNG)throw Error('PNG_DATA_TOO_LARGE');idats.push(x.subarray(start,end));
  }else if(typ==='IEND'){
   if(n!==0||!seenIHDR||!idatSeen||limit!==x.length)throw Error('PNG_END_INVALID');seenEnd=true;
  }else if(typ==='PLTE'||typ==='tRNS'){
   throw Error('PNG_UNSUPPORTED_CHUNK');
  }else if(typ.charCodeAt(0)>=65&&typ.charCodeAt(0)<=90){throw Error('PNG_UNKNOWN_CRITICAL_CHUNK');}
  pos=limit;if(seenEnd)break;
 }
 if(!seenEnd)throw Error('PNG_INCOMPLETE');
 const stride=width*channels,total=(stride+1)*height;
 const packed=inflateSync(Buffer.concat(idats),{maxOutputLength:total+1});
 if(packed.length!==total)throw Error('PNG_DECOMPRESSED_LENGTH_INVALID');
 const rgba=Buffer.alloc(width*height*4);let previous=Buffer.alloc(stride),offset=0;
 for(let y=0;y<height;y++){
  const type=packed[offset++];if(type>4)throw Error('PNG_FILTER_UNSUPPORTED');
  const row=Buffer.from(packed.subarray(offset,offset+stride));offset+=stride;
  for(let k=0;k<stride;k++){
   const a=k>=channels?row[k-channels]:0,b=previous[k],c=k>=channels?previous[k-channels]:0;
   let predictor=0;
   if(type===1)predictor=a;else if(type===2)predictor=b;else if(type===3)predictor=Math.floor((a+b)/2);
   else if(type===4){const p=a+b-c,pa=Math.abs(p-a),pb=Math.abs(p-b),pc=Math.abs(p-c);predictor=pa<=pb&&pa<=pc?a:pb<=pc?b:c;}
   row[k]=(row[k]+predictor)&255;
  }
  for(let x=0;x<width;x++){
   const src=x*channels,dst=(y*width+x)*4,alpha=channels===4?row[src+3]:255;
   for(let c=0;c<3;c++)rgba[dst+c]=Math.round((row[src+c]*alpha+255*(255-alpha))/255);
   rgba[dst+3]=255;
  }
  previous=row;
 }
 return {width,height,rgba};
}
export function fingerprintPng(png){
 const {width,height,rgba}=asPng(png);const grid=[],tileHashes=[];
 for(let ty=0;ty<HEIGHT;ty++){
  const y0=Math.floor(ty*height/HEIGHT),y1=Math.floor((ty+1)*height/HEIGHT);
  for(let tx=0;tx<WIDTH;tx++){
   const x0=Math.floor(tx*width/WIDTH),x1=Math.floor((tx+1)*width/WIDTH),sum=[0,0,0];
   const count=(x1-x0)*(y1-y0);const hash=createHash('sha256');
   for(let y=y0;y<y1;y++)for(let x=x0;x<x1;x++){
    const at=(y*width+x)*4;hash.update(rgba.subarray(at,at+4));for(let c=0;c<3;c++)sum[c]+=rgba[at+c];
   }
   for(let c=0;c<3;c++)grid.push(Math.round(sum[c]/count));
   tileHashes.push(hash.digest('hex').slice(0,16));
  }
 }
 return {schema:FINGERPRINT_SCHEMA,viewport:{width,height},grid:{cols:WIDTH,rows:HEIGHT},
  rgb:grid,tileHashes,pixelSha256:createHash('sha256').update(rgba).digest('hex'),
  privacy:'DERIVED_TILES_ONLY',sourceVerified:false,qualityProven:false};
}
const keys=(x,fields)=>x&&typeof x==='object'&&!Array.isArray(x)&&Object.keys(x).sort().join('|')===fields.slice().sort().join('|');
function validate(x){
 return keys(x,['schema','viewport','grid','rgb','tileHashes','pixelSha256','privacy','sourceVerified','qualityProven'])&&
 x.schema===FINGERPRINT_SCHEMA&&keys(x.viewport,['width','height'])&&
 Number.isInteger(x.viewport.width)&&Number.isInteger(x.viewport.height)&&
 x.viewport.width>=16&&x.viewport.height>=12&&x.viewport.width*x.viewport.height<=MAX_PIXELS&&
 keys(x.grid,['cols','rows'])&&x.grid.cols===WIDTH&&x.grid.rows===HEIGHT&&
 Array.isArray(x.rgb)&&x.rgb.length===WIDTH*HEIGHT*CHANNELS&&
 x.rgb.every(v=>Number.isInteger(v)&&v>=0&&v<=255)&&
 Array.isArray(x.tileHashes)&&x.tileHashes.length===WIDTH*HEIGHT&&
 x.tileHashes.every(v=>typeof v==='string'&&/^[0-9a-f]{16}$/.test(v))&&
 typeof x.pixelSha256==='string'&&/^[0-9a-f]{64}$/.test(x.pixelSha256)&&
 x.privacy==='DERIVED_TILES_ONLY'&&x.sourceVerified===false&&x.qualityProven===false;
}
const reject=reason=>({status:'REJECTED',reason,qualityProven:false,visualDefectProven:false,autoChangeAuthorized:false});
export function inspectVisualFingerprint(x){
 if(!validate(x))return reject('VISUAL_FINGERPRINT_INVALID');
 return {status:'ADVISORY_FINGERPRINT',viewport:x.viewport,tileCount:WIDTH*HEIGHT,
  screenshotBytesTransferred:false,sourceVerified:false,qualityProven:false,autoChangeAuthorized:false};
}
export function compareVisualFingerprints(before,after){
 if(!validate(before)||!validate(after))return reject('INVALID_VISUAL_INPUT');
 if(before.viewport.width!==after.viewport.width||before.viewport.height!==after.viewport.height)
  return reject('VIEWPORT_CONTEXT_MISMATCH');
 if(before.pixelSha256===after.pixelSha256 &&
   (before.rgb.some((x,i)=>x!==after.rgb[i])||before.tileHashes.some((x,i)=>x!==after.tileHashes[i])))
   return reject('FINGERPRINT_CONTENT_CONFLICT');
 const threshold=12;const changed=[];let total=0,max=0;let prominent=0;
 for(let i=0;i<WIDTH*HEIGHT;i++){
  const at=i*3,delta=(Math.abs(after.rgb[at]-before.rgb[at])+Math.abs(after.rgb[at+1]-before.rgb[at+1])+Math.abs(after.rgb[at+2]-before.rgb[at+2]))/3;
  total+=delta;max=Math.max(max,delta);
  if(before.tileHashes[i]!==after.tileHashes[i]){
   const visibilityBand=delta>=threshold?'PROMINENT':'SUBTLE';
   if(visibilityBand==='PROMINENT')prominent++;
   changed.push({col:i%WIDTH,row:Math.floor(i/WIDTH),meanRgbDelta:Math.round(delta*100)/100,visibilityBand});
  }
 }
 return {status:changed.length?'ADVISORY_VISUAL_CHANGE':'ADVISORY_NO_VISUAL_CHANGE',
  viewport:before.viewport,thresholdMeanRgb:threshold,changedTileCount:changed.length,
  totalTiles:WIDTH*HEIGHT,prominentTileCount:prominent,subtleTileCount:changed.length-prominent,changedTiles:changed,meanTileDelta:Math.round(total/(WIDTH*HEIGHT)*100)/100,
  maxTileDelta:Math.round(max*100)/100,identicalPixels:before.pixelSha256===after.pixelSha256,
  screenshotBytesTransferred:false,sourceVerified:false,qualityProven:false,
  visualDefectProven:false,autoChangeAuthorized:false};
}
