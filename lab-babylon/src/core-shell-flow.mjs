/**
 * R201: energy continuity from the nucleus to each of six shell nodes.
 * Pure, deterministic 3D geometry. The Labo remains sole owner of all meshes.
 * Babylon and Atlas must reuse their existing Engine, Scene and CORE_SOCKET.
 */
const TAU=2*Math.PI;
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const length=v=>Math.hypot(v[0],v[1],v[2]);
const unit=v=>v.map(n=>n/length(v));
const finiteVector=v=>Array.isArray(v)&&v.length===3&&v.every(Number.isFinite)&&length(v)>.25;
export const FLOW_NODE_COUNT=6;
export const FLOW_SHELL_RADIUS=1.53;
export const FLOW_SEED_RADIUS=.085;
export function sampleCoreShellFlow(index,time,nodeDirections,segments=72){
 if(!Number.isInteger(index)||index<0||index>=FLOW_NODE_COUNT||!Number.isFinite(time)||!Number.isInteger(segments)||segments<12||segments>240)
  throw new RangeError('R201_FLOW_INVALID_ARGUMENT');
 if(!Array.isArray(nodeDirections)||nodeDirections.length!==FLOW_NODE_COUNT||!nodeDirections.every(finiteVector))
  throw new TypeError('R201_FLOW_INVALID_DIRECTIONS');
 const direction=unit(nodeDirections[index]);
 const reference=Math.abs(direction[1])>.93?[1,0,0]:[0,1,0];
 const tangent=unit(cross(direction,reference)),side=unit(cross(direction,tangent));
 const phase=index*TAU/FLOW_NODE_COUNT;
 const positions=[];
 for(let k=0;k<=segments;k++){
  const u=k/segments,weight=Math.pow(Math.sin(Math.PI*u),1.16);
  const radius=FLOW_SEED_RADIUS+(FLOW_SHELL_RADIUS-FLOW_SEED_RADIUS)*u;
  const phaseA=phase+u*7.6+time*.26;
  const lateral=(.125*Math.sin(phaseA)+.031*Math.sin(15*u-time*.12+index))*weight;
  const vertical=.100*Math.cos(phase+u*9.4-time*.20)*weight;
  positions.push([
   direction[0]*radius+tangent[0]*lateral+side[0]*vertical,
   direction[1]*radius+tangent[1]*lateral+side[1]*vertical,
   direction[2]*radius+tangent[2]*lateral+side[2]*vertical
  ]);
 }
 return positions;
}
export function coreShellVeilRadius(index,quality='balanced'){
 if(!Number.isInteger(index)||index<0||index>=FLOW_NODE_COUNT||!['economy','balanced','ultra','auto'].includes(quality))
  throw new RangeError('R201_VEIL_INVALID_ARGUMENT');
 return quality==='economy'?0:quality==='ultra'?.030:.023;
}
export function visibleCoreShellVeils(quality,power){
 if(!['economy','balanced','ultra','auto'].includes(quality)||!Number.isFinite(power)||power<0)
  throw new RangeError('R201_VISIBILITY_INVALID_ARGUMENT');
 return power<=0||quality==='economy'?0:quality==='ultra'?6:4;
}
