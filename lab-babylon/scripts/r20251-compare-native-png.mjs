import {readFileSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {inflateSync} from 'node:zlib';
import {createHash} from 'node:crypto';
const root=process.env.SYNESTRA_STAGING_ROOT||'I:\\_STUDIO_STAGING';
const qa=join(root,'SYN_LAB_R20251_NATIVE_BABYLON_INSTRUMENTED_QA_20261102');
const b=process.env.R202_AB_BASE_RUN||join(qa,'run-base-1793647103370-57096');
const c=process.env.R202_AB_CANDIDATE_RUN||join(qa,'run-candidate-1793647119472-56808');
const sha=x=>createHash('sha256').update(x).digest('hex');
function decode(file){
 const bytes=readFileSync(file);
 if(bytes.subarray(0,8).toString('hex')!=='89504e470d0a1a0a')throw Error('PNG_BAD_SIGNATURE');
 let width,height,bitDepth,colorType,interlace;const chunks=[];let offset=8;
 while(offset<bytes.length){
  const len=bytes.readUInt32BE(offset),type=bytes.toString('ascii',offset+4,offset+8);
  const data=bytes.subarray(offset+8,offset+8+len);
  if(type==='IHDR'){width=data.readUInt32BE(0);height=data.readUInt32BE(4);bitDepth=data[8];colorType=data[9];interlace=data[12]}
  if(type==='IDAT')chunks.push(data);
  offset+=len+12;
  if(type==='IEND')break;
 }
 if(bitDepth!==8||![2,6].includes(colorType)||interlace!==0)throw Error('PNG_UNSUPPORTED_TYPE');
 const bpp=colorType===6?4:3,stride=width*bpp;
 const infl=inflateSync(Buffer.concat(chunks));if(infl.length!==(stride+1)*height)throw Error('PNG_BAD_DEFLATE_LENGTH');
 const pixels=Buffer.alloc(stride*height);let raw=0;
 for(let y=0;y<height;y++){
  const filter=infl[raw++];if(filter>4)throw Error('PNG_FILTER_'+filter);
  for(let i=0;i<stride;i++){
   const x=infl[raw++],loc=y*stride+i;
   const a=i>=bpp?pixels[loc-bpp]:0;
   const up=y?pixels[loc-stride]:0;
   const upperLeft=y&&i>=bpp?pixels[loc-stride-bpp]:0;
   let predictor=0;
   if(filter===1)predictor=a;
   else if(filter===2)predictor=up;
   else if(filter===3)predictor=Math.floor((a+up)/2);
   else if(filter===4){
    const p=a+up-upperLeft,da=Math.abs(p-a),db=Math.abs(p-up),dc=Math.abs(p-upperLeft);
    predictor=da<=db&&da<=dc?a:db<=dc?up:upperLeft;
   }
   pixels[loc]=(x+predictor)&255;
  }
 }
 return {width,height,bpp,stride,pixels,source_sha256:sha(bytes)};
}
const zones=[
 {name:'reactor',x0:85,x1:640,y0:210,y1:755,step:3},
 {name:'nucleus',x0:262,x1:475,y0:340,y1:585,step:2},
 {name:'ui_control',x0:750,x1:1030,y0:175,y1:725,step:6}
];
const results=[];
for(const [label,frame,power] of [['frame6-power145',6,145],['frame18-power145',18,145],['frame6-power0',6,0]]){
 const original=decode(join(b,'base-frame'+frame+'-power'+power+'.png'));
 const patched=decode(join(c,'candidate-frame'+frame+'-power'+power+'.png'));
 if(original.width!==patched.width||original.height!==patched.height||original.bpp!==patched.bpp)throw Error('SOURCE_DIMENSIONS_MISMATCH');
 const metrics=[];
 for(const z of zones){
  let sumAbs=0,sumSigned=0,changed=0,n=0;
  for(let y=z.y0;y<z.y1;y+=z.step)for(let x=z.x0;x<z.x1;x+=z.step){
   const pos=y*original.stride+x*original.bpp;
   let abs=0,signed=0;
   for(let ch=0;ch<3;ch++){const delta=patched.pixels[pos+ch]-original.pixels[pos+ch];abs+=Math.abs(delta);signed+=delta}
   sumAbs+=abs;sumSigned+=signed;if(abs>30)changed++;n++;
  }
  metrics.push({name:z.name,samples:n,changed_pct:Number((changed/n*100).toFixed(4)),mean_abs_rgb:Number((sumAbs/n/3).toFixed(5)),mean_signed_rgb:Number((sumSigned/n/3).toFixed(5))});
 }
 results.push({case:label,width:original.width,height:original.height,baseline_png_sha256:original.source_sha256,candidate_png_sha256:patched.source_sha256,zones:metrics});
}
const report={schema:'synestra.r20251.native-babylon-ab.node-png-decode.v1',method:'independent Node built-in zlib PNG decode, 8 bit RGB/RGBA, grid same viewport, threshold sum RGB abs delta >30',results};
const dest=join(qa,'native-babylon-pixel-compare-node.json');writeFileSync(dest,JSON.stringify(report,null,2));
console.log('INDEPENDENT_PIXEL_COMPARE_PASS '+JSON.stringify(results.map(x=>({case:x.case,zones:x.zones}))));
console.log('COMPARE_JSON_SHA256 '+sha(readFileSync(dest)));
