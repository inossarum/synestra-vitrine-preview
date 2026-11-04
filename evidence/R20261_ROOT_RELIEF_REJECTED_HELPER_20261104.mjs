/**
 * R202.61 EXPERIMENT: reduce inner plasma occlusion by moving only the
 * existing 18 mist tube root segments beyond the faceted core silhouette.
 *
 * Pure 3D resampling: preserves point count, outer endpoints, mesh count,
 * the original six radial directions and all four mode trajectories.
 * Not an artistic acceptance or a modification to the R202.61 ZIP.
 */
export const CORE_MIST_MIN_RADIUS=.44;

const length3=p=>Math.hypot(p[0],p[1],p[2]);
const validPoint=p=>Array.isArray(p)&&p.length===3&&p.every(Number.isFinite);
const interpolate=(a,b,t)=>[
 a[0]+(b[0]-a[0])*t,
 a[1]+(b[1]-a[1])*t,
 a[2]+(b[2]-a[2])*t
];

export function remapCoreMistRootPath(path,minRadius=CORE_MIST_MIN_RADIUS){
 if(!Array.isArray(path)||path.length<8||path.length>241||
    !path.every(validPoint)||!Number.isFinite(minRadius)||
    minRadius<0||minRadius>5)
  throw new RangeError('R20261_ROOT_RELIEF_INVALID');
 if(minRadius===0)return path.map(p=>p.slice());
 let crossing=-1;
 for(let j=1;j<path.length;j++){
  if(length3(path[j])>=minRadius){
   const r0=length3(path[j-1]),r1=length3(path[j]);
   crossing=(j-1)+Math.max(0,Math.min(1,(minRadius-r0)/Math.max(1e-9,r1-r0)));
   break;
  }
 }
 if(crossing<0)throw new RangeError('R20261_ROOT_RELIEF_NO_CROSSING');
 const last=path.length-1;
 return Array.from({length:path.length},(_,k)=>{
  if(k===last)return path[last].slice();
  const sample=crossing+(last-crossing)*k/last;
  const i=Math.min(last-1,Math.floor(sample));
  return interpolate(path[i],path[i+1],sample-i);
 });
}
