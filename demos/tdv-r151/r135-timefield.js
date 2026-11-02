'use strict';
/*
 * R135 — Original Terre du Vivant timestamp field.
 * CommonJS + classic-browser compatible. No Branch source code is included.
 * Each texel records its FIRST discovery time; it never retracts before reset.
 */
(function(root){
const WIDTH=320,HEIGHT=180,STATES=32,DURATION=2.8;
function clamp(v,lo,hi){return Math.min(hi,Math.max(lo,v))}
function createField(width=WIDTH,height=HEIGHT,radius=10){
 if(!Number.isInteger(width)||!Number.isInteger(height)||width<1||height<1||width*height>1000000)throw Error('invalid field dimensions');
 if(!Number.isFinite(radius)||radius<1||radius>Math.min(width,height))throw Error('invalid brush');
 const data=new Float32Array(width*height);
 data.fill(-1);
 let painted=0;
 function stamp(x,y,seconds){
  if(!Number.isFinite(x)||!Number.isFinite(y)||!Number.isFinite(seconds)||seconds<0)return 0;
  // UI coordinates use top-left origin. Flip rows for WebGL texture sampling.
  const cx=x*(width-1),cy=y*(height-1);
  const x0=clamp(Math.floor(cx-radius),0,width-1),x1=clamp(Math.ceil(cx+radius),0,width-1);
  const y0=clamp(Math.floor(cy-radius),0,height-1),y1=clamp(Math.ceil(cy+radius),0,height-1);
  let changed=0;
  for(let yy=y0;yy<=y1;yy++)for(let xx=x0;xx<=x1;xx++){
   if((xx-cx)**2+(yy-cy)**2>radius**2)continue;
   const idx=(height-1-yy)*width+xx;
   if(data[idx]<0){data[idx]=seconds;changed++;painted++}
  }
  return changed;
 }
 function revealAll(seconds){
  if(!Number.isFinite(seconds)||seconds<0)return 0;
  let changed=0;for(let i=0;i<data.length;i++)if(data[i]<0){data[i]=seconds;changed++;painted++}
  return changed;
 }
 function reset(){data.fill(-1);painted=0}
 function at(x,y){if(!Number.isFinite(x)||!Number.isFinite(y))return -1;const xx=clamp(Math.floor(x*width),0,width-1),yy=clamp(Math.floor(y*height),0,height-1);return data[(height-1-yy)*width+xx]}
 function age(x,y,seconds){const birth=at(x,y);return birth<0?0:clamp((seconds-birth)/DURATION,0,1)}
 return Object.freeze({width,height,radius,data,stamp,revealAll,reset,at,age,get painted(){return painted}});
}
function frameAt(birth,seconds,duration=DURATION,states=STATES){
 if(!Number.isFinite(birth)||birth<0||!Number.isFinite(seconds)||seconds<birth)return -1;
 if(!Number.isFinite(duration)||duration<=0||!Number.isInteger(states)||states<2)return -1;
 return clamp(Math.floor((seconds-birth)/duration*(states-1)),0,states-1);
}
const api=Object.freeze({WIDTH,HEIGHT,STATES,DURATION,createField,frameAt});
if(typeof module==='object'&&module.exports)module.exports=api;
if(root)root.TdvTimeField=api;
})(typeof window==='object'?window:null);
