import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {inflateSync} from 'node:zlib';
import {createHash} from 'node:crypto';
import {join} from 'node:path';
const root=process.env.SYNESTRA_STAGING_ROOT||'I:\\_STUDIO_STAGING';
const qa=join(root,'SYN_LAB_R20251_NATIVE_BABYLON_INSTRUMENTED_QA_20261102');
const out=join(root,'SYN_LAB_R20252_CONTRAST_QA_20261102');mkdirSync(out,{recursive:true});
const dirs={baseline:'run-base-1793647103370-57096',candidate:'run-candidate-1793647119472-56808'};
const shots=[
 {variant:'baseline',frame:6,power:145,file:'base-frame6-power145.png',sha:'9c418910055a52e1c50958955d6c9f6b77181c178f4c6afd2f4cd2886b8dddca'},
 {variant:'candidate',frame:6,power:145,file:'candidate-frame6-power145.png',sha:'60beb2b5467735c2df4621fddfac1f716c62ea6a93daca18f93163443e36c7c3'},
 {variant:'baseline',frame:18,power:145,file:'base-frame18-power145.png',sha:'e01491f5fa467f39a286aa6139ed8c934ece9fee7b6e933140a239d2743c8acc'},
 {variant:'candidate',frame:18,power:145,file:'candidate-frame18-power145.png',sha:'a7424d527ed92e01799a5b85fc4aa8b6265860d2e212edbc5fb915d55fe6db6b'},
 {variant:'baseline',frame:6,power:0,file:'base-frame6-power0.png',sha:'3641405c55c194cecc3cbc7a1007d9544692abdb3fe60e6c59e60910fe7e05a4'},
 {variant:'candidate',frame:6,power:0,file:'candidate-frame6-power0.png',sha:'8eac59ef293eb55795b2914c077ab3c74c375bb602925c45fcb0b27af4067e90'}
];
const sha=b=>createHash('sha256').update(b).digest('hex');
function readPng(path,expectedSha){
 const bytes=readFileSync(path);
 if(sha(bytes)!==expectedSha)throw Error('SHA_MISMATCH_'+path);
 if(bytes.subarray(0,8).toString('hex')!=='89504e470d0a1a0a')throw Error('PNG_HEADER_FAIL');
 let width=0,height=0,bpp=0,interlace=0;const chunks=[];let off=8;
 while(off<bytes.length){
  const len=bytes.readUInt32BE(off),type=bytes.toString('ascii',off+4,off+8);
  const data=bytes.subarray(off+8,off+8+len);
  if(type==='IHDR'){width=data.readUInt32BE(0);height=data.readUInt32BE(4);if(data[8]!==8)throw Error('BIT_DEPTH');bpp=data[9]===6?4:data[9]===2?3:0;interlace=data[12]}
  if(type==='IDAT')chunks.push(data);
  off+=len+12;if(type==='IEND')break;
 }
 if(width!==1100||height!==900||!bpp||interlace)throw Error('PNG_FORMAT_OR_DIMENSIONS');
 const stride=width*bpp,raw=inflateSync(Buffer.concat(chunks));
 if(raw.length!==(stride+1)*height)throw Error('RAW_LENGTH_MISMATCH');
 const decoded=Buffer.alloc(stride*height);let at=0;
 for(let y=0;y<height;y++){
  const filter=raw[at++];
  for(let i=0;i<stride;i++){
   const value=raw[at++],k=y*stride+i;
   const a=i>=bpp?decoded[k-bpp]:0,up=y?decoded[k-stride]:0,diag=y&&i>=bpp?decoded[k-stride-bpp]:0;
   let pred=0;
   if(filter===1)pred=a;
   else if(filter===2)pred=up;
   else if(filter===3)pred=Math.floor((a+up)/2);
   else if(filter===4){const p=a+up-diag,da=Math.abs(p-a),db=Math.abs(p-up),dc=Math.abs(p-diag);pred=da<=db&&da<=dc?a:db<=dc?up:diag}
   else if(filter!==0)throw Error('PNG_FILTER_UNSUPPORTED_'+filter);
   decoded[k]=(value+pred)&255;
  }
 }
 return {data:decoded,width,height,bpp,stride};
}
function lum(img,x,y){
 const p=y*img.stride+x*img.bpp;
 return .2126*img.data[p]+.7152*img.data[p+1]+.0722*img.data[p+2];
}
const zones=[
 {id:'nucleus_context',x0:262,x1:475,y0:340,y1:585,step:2},
 {id:'facet_focus',x0:320,x1:452,y0:395,y1:540,step:2},
 {id:'plasma_periphery',x0:125,x1:610,y0:250,y1:710,step:5},
 {id:'ui_control',x0:750,x1:1030,y0:175,y1:725,step:6}
];
function measure(img,zone){
 let n=0,sum=0,sum2=0,grad=0,edges=0,lit=0,clipped=0;
 const vals=[];
 for(let y=zone.y0;y<zone.y1-1;y+=zone.step){
  for(let x=zone.x0;x<zone.x1-1;x+=zone.step){
   const v=lum(img,x,y);vals.push(v);sum+=v;sum2+=v*v;n++;
   grad+=Math.abs(v-lum(img,x+1,y))+Math.abs(v-lum(img,x,y+1));edges+=2;
   if(v>150)lit++;if(v>=252)clipped++;
  }
 }
 vals.sort((a,b)=>a-b);
 const pct=q=>Number(vals[Math.min(n-1,Math.floor((n-1)*q))].toFixed(4));
 const mean=sum/n;
 return {samples:n,mean:Number(mean.toFixed(4)),stddev:Number(Math.sqrt(Math.max(0,sum2/n-mean*mean)).toFixed(4)),
  p10:pct(.1),p50:pct(.5),p90:pct(.9),interdecile:Number((pct(.9)-pct(.1)).toFixed(4)),
  neighbor_gradient:Number((grad/edges).toFixed(4)),lit150_pct:Number((lit/n*100).toFixed(3)),
  clipped252_pct:Number((clipped/n*100).toFixed(3))};
}
const report={schema:'synestra.r20252.contrast-audit.v1',source:'R20249 native Babylon baseline vs exact shader-instrumented R20250+R20251 bundle, not fresh build',frames:[6,18],quality:'Ultra',power:145,viewport:'1100x900',interpretation:'measurement only, no artistic sign-off',results:[],comparisons:[]};
for(const s of shots){
 const path=join(qa,dirs[s.variant],s.file),img=readPng(path,s.sha);
 const regions=Object.fromEntries(zones.map(z=>[z.id,measure(img,z)]));
 report.results.push({variant:s.variant,frame:s.frame,power:s.power,file:s.file,sha256:s.sha,regions});
}
for(const [frame,power] of [[6,145],[18,145],[6,0]]){
 const a=report.results.find(r=>r.frame===frame&&r.power===power&&r.variant==='baseline'),b=report.results.find(r=>r.frame===frame&&r.power===power&&r.variant==='candidate');
 const deltas={};
 for(const zone of zones){
  const lhs=a.regions[zone.id],rhs=b.regions[zone.id];
  deltas[zone.id]=Object.fromEntries(['mean','stddev','interdecile','neighbor_gradient','lit150_pct','clipped252_pct'].map(key=>[key,Number((rhs[key]-lhs[key]).toFixed(4))]));
 }
 report.comparisons.push({frame,power,candidate_minus_baseline:deltas});
}
const powered=report.comparisons.filter(x=>x.power===145);
const darkening=powered.map(x=>({frame:x.frame,lit150_pp:x.candidate_minus_baseline.facet_focus.lit150_pct,mean_rgb:x.candidate_minus_baseline.facet_focus.mean}));
const controls=report.comparisons.every(x=>Math.abs(x.candidate_minus_baseline.ui_control.mean)<.01);
const powerOff=report.comparisons.find(x=>x.power===0);
const powerOffPreserved=Math.abs(powerOff.candidate_minus_baseline.facet_focus.mean)<.01;
if(!controls||!powerOffPreserved)throw Error('INSTRUMENTED_REGRESSION_OR_CONTROL_FAILURE');
const visibilityScreen=darkening.every(x=>x.lit150_pp>=-2);
report.gates={diagnostic_integrity:'PASS',ui_control:'PASS',power_off:'PASS',facet_visibility_screen:visibilityScreen?'PASS':'FAIL',owner_art_signoff:'PENDING',exact_rebuild:'NOT_VERIFIED',visibility_screen_rule:'At each audited high-power frame, candidate share of pixels above luma 150 within focused nucleus must not fall by more than 2 percentage points vs R20249; this is a provisional technical screen, not art approval',observed:darkening};
const filename=join(out,'r20252-contrast-audit.json');
writeFileSync(filename,JSON.stringify(report,null,2));
console.log('R20252_CONTRAST_AUDIT_PASS '+JSON.stringify(report.comparisons));
console.log('R20252_CONTRAST_SHA256 '+sha(readFileSync(filename)));
