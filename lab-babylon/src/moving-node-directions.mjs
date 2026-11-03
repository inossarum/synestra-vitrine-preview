/**
 * R202.55 — coherent mobile shell anchor field.
 * Pure, deterministic, bounded 3D directions for the six EXISTING energy nodes.
 * The same samples drive luminous intersections, core-shell streams and forks.
 * Materials, color, brightness, mesh counts and shell ribbon end anchors remain untouched.
 */
const CROSS=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const length=p=>Math.hypot(...p);
const norm=p=>p.map(v=>v/length(p));
const valid=p=>Array.isArray(p)&&p.length===3&&p.every(Number.isFinite)&&length(p)>.25;
export function sampleMovingNodeDirections(seedDirections,time,{reducedMotion=false}={}){
 if(!Number.isFinite(time)||time<0)throw new RangeError('NODE_TIME_INVALID');
 if(!Array.isArray(seedDirections)||seedDirections.length!==6||!seedDirections.every(valid))
  throw new TypeError('NODE_DIRECTIONS_INVALID');
 const t=reducedMotion?0:time;
 return seedDirections.map((seed,i)=>{
  const direction=norm(seed),axis=Math.abs(direction[1])>.88?[1,0,0]:[0,1,0];
  const tangent=norm(CROSS(direction,axis));
  const side=norm(CROSS(direction,tangent));
  const phase=i*Math.PI/3;
  const sweep=.13*(Math.sin(t*.31+phase)-Math.sin(phase));
  const weave=.078*(Math.cos(t*.23+phase*.61)-Math.cos(phase*.61));
  return norm(direction.map((v,j)=>v+tangent[j]*sweep+side[j]*weave));
 });
}
