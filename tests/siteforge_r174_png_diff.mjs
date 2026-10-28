import {inflateSync} from 'node:zlib';
import {readFileSync} from 'node:fs';
// Deterministic PNG 8-bit RGB/RGBA decoder: no external dependencies.
export function decodePNG(bytes){
 if(!bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))throw Error('NOT_PNG');
 let pos=8,w=0,h=0,bpp=0,interlace=-1;const compressed=[];
 while(pos+12<=bytes.length){
  const size=bytes.readUInt32BE(pos),name=bytes.toString('ascii',pos+4,pos+8),data=pos+8;
  if(name==='IHDR'){
   w=bytes.readUInt32BE(data);h=bytes.readUInt32BE(data+4);
   const depth=bytes[data+8],type=bytes[data+9];interlace=bytes[data+12];
   if(depth!==8||![2,6].includes(type)||interlace!==0)throw Error('UNSUPPORTED_PNG '+depth+' '+type);
   bpp=type===6?4:3;
  }
  if(name==='IDAT')compressed.push(bytes.subarray(data,data+size));
  pos=data+size+4;if(name==='IEND')break;
 }
 if(!w||!h||!compressed.length)throw Error('INVALID_PNG');
 const raw=inflateSync(Buffer.concat(compressed)),stride=w*bpp;
 const pixels=Buffer.alloc(h*stride);
 let off=0;
 for(let y=0;y<h;y++){
  const filter=raw[off++],base=y*stride;
  for(let i=0;i<stride;i++){
   const value=raw[off++],left=i>=bpp?pixels[base+i-bpp]:0;
   const up=y>0?pixels[base+i-stride]:0,ul=(y>0&&i>=bpp)?pixels[base+i-stride-bpp]:0;
   let predictor=0;
   if(filter===1)predictor=left;
   else if(filter===2)predictor=up;
   else if(filter===3)predictor=Math.floor((left+up)/2);
   else if(filter===4){
    const p=left+up-ul,pa=Math.abs(p-left),pb=Math.abs(p-up),pc=Math.abs(p-ul);
    predictor=pa<=pb&&pa<=pc?left:pb<=pc?up:ul;
   }else if(filter!==0)throw Error('UNKNOWN_PNG_FILTER '+filter);
   pixels[base+i]=(value+predictor)&255;
  }
 }
 return {w,h,bpp,pixels};
}
export function comparePngPixels(a,b){
 const x=decodePNG(a),y=decodePNG(b);
 if(x.w!==y.w||x.h!==y.h)throw Error('MISMATCH_VIEWPORT');
 let changed=0,sum=0,bright=0;
 const count=x.w*x.h;
 for(let i=0;i<count;i++){
  let strongest=0;
  for(let c=0;c<3;c++)strongest=Math.max(strongest,Math.abs(x.pixels[i*x.bpp+c]-y.pixels[i*y.bpp+c]));
  if(strongest>=18)changed++;
  sum+=strongest;if(strongest>=35)bright++;
 }
 return {width:x.w,height:x.h,pixels:count,changed,changedPercent:100*changed/count,majorPercent:100*bright/count,meanMaxDelta:sum/count};
}
