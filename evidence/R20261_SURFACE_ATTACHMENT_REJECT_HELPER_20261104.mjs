/**
 * R202.61 isolated experiment: six primary node streams start at the real
 * nucleus OUTSIDE bound. Foreground stenciled clones keep their original path.
 * No extra Engine/Scene/mesh/stencil state. Never automatically promote art.
 */
export const CORE_SURFACE_ATTACHMENT_RADIUS=.405;
const norm=p=>Math.hypot(...p);
const finitePoint=p=>Array.isArray(p)&&p.length===3&&p.every(Number.isFinite);
const lerp=(a,b,t)=>a.map((n,i)=>n+(b[i]-n)*t);
export function surfaceAttachNodePath(path,radius=CORE_SURFACE_ATTACHMENT_RADIUS){
 if(!Array.isArray(path)||path.length<12||path.length>241||
    !path.every(finitePoint)||!Number.isFinite(radius)||radius<.39||radius>.6)
  throw new RangeError('R20261_ATTACHMENT_INVALID');
 if(norm(path[0])>=radius)throw new RangeError('R20261_ATTACHMENT_INVALID_START');
 let first=-1;
 for(let j=1;j<path.length;j++)if(norm(path[j])>=radius){first=j;break;}
 if(first<1)throw new RangeError('R20261_ATTACHMENT_NO_CROSSING');
 let lo=0,hi=1;
 for(let n=0;n<45;n++){
  const mid=(lo+hi)/2;
  if(norm(lerp(path[first-1],path[first],mid))<radius)lo=mid;
  else hi=mid;
 }
 const crossing=(first-1)+hi,last=path.length-1;
 const output=Array.from({length:path.length},(_,k)=>{
  if(k===last)return path[last].slice();
  const q=crossing+(last-crossing)*k/last;
  const i=Math.min(last-1,Math.floor(q));
  const p=lerp(path[i],path[i+1],q-i);
  const d=norm(p);
  // Guard against inward chord interpolation at the first exposed sample.
  return d<radius?p.map(v=>v*(radius/d)):p;
 });
 if(!output.every(finitePoint))throw new RangeError('R20261_ATTACHMENT_NONFINITE_OUTPUT');
 return output;
}
