/**
 * Synestra Lab R200 — pure core volume geometry.
 * No Babylon engine, browser state, extra scene, random source or networking.
 * The six canonical directions remain owned by the Labo.
 */
export const CORE_VOLUME_MODES = Object.freeze([
  Object.freeze({reach:.82,twist:3.0,amplitude:.102,speed:.24}),
  Object.freeze({reach:.73,twist:9.2,amplitude:.123,speed:.48}),
  Object.freeze({reach:.69,twist:6.6,amplitude:.104,speed:.31}),
  Object.freeze({reach:.64,twist:4.4,amplitude:.082,speed:.20})
]);
const GOLDEN_ANGLE=Math.PI*(3-Math.sqrt(5));
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const magnitude=a=>Math.hypot(a[0],a[1],a[2]);
const normalized=a=>a.map(x=>x/magnitude(a));
export function sampleCoreVolume(index,mode,time,directions,segments=90){
 if(!Number.isInteger(index)||index<0||!Number.isInteger(mode)||mode<0||mode>=CORE_VOLUME_MODES.length||!Number.isFinite(time)||!Number.isInteger(segments)||segments<8||segments>240)
  throw new RangeError('R200_CORE_INVALID_ARGUMENT');
 if(!Array.isArray(directions)||directions.length!==6||!directions.every(a=>Array.isArray(a)&&a.length===3&&a.every(Number.isFinite)&&magnitude(a)>.25))
  throw new TypeError('R200_CORE_INVALID_DIRECTIONS');
 const direction=normalized(directions[index%6]);
 const up=Math.abs(direction[1])>.94?[1,0,0]:[0,1,0];
 const across=normalized(cross(direction,up));
 const side=normalized(cross(direction,across));
 const p=CORE_VOLUME_MODES[mode];
 const phase=index*GOLDEN_ANGLE;
 const points=[];
 for(let k=0;k<=segments;k++){
  const u=k/segments,blend=u*u*(3-2*u);
  const envelope=Math.pow(Math.sin(Math.PI*u),1.12);
  const angle=phase+p.twist*u+time*p.speed;
  const swing=(.014+p.amplitude*envelope)*(1+.12*Math.sin(index*2.71));
  const radius=.014+p.reach*blend+.013*envelope*Math.sin(13*u+time*.44+phase);
  const s=swing*Math.sin(angle),c=swing*Math.cos(angle);
  points.push([direction[0]*radius+across[0]*s+side[0]*c,direction[1]*radius+across[1]*s+side[1]*c,direction[2]*radius+across[2]*s+side[2]*c]);
 }
 return points;
}
export function coreVolumeWidth(index,u,quality='balanced'){
 if(!Number.isInteger(index)||index<0||!Number.isFinite(u)||u<0||u>1||!['economy','balanced','ultra','auto'].includes(quality))throw new RangeError('R200_WIDTH_INVALID_ARGUMENT');
 const envelope=Math.pow(Math.sin(Math.PI*u),.72);
 return (.0034+(.0065+(index%4)*.0008)*envelope)*(quality==='economy'?.85:quality==='ultra'?1.12:1);
}

/**
 * R201 art correction: a translucent volume follows existing tendrils.
 * No extra paths or centerline generator: the bounded R200 geometry is reused.
 * Count is a GPU quality budget, never an unbounded particle system.
 */
export function coreMistWidth(index,u,quality='balanced'){
 if(!Number.isInteger(index)||index<0||index>=18||!Number.isFinite(u)||u<0||u>1||!['economy','balanced','ultra','auto'].includes(quality))
  throw new RangeError('R201_MIST_WIDTH_INVALID_ARGUMENT');
 const envelope=Math.pow(Math.sin(Math.PI*u),.70);
 const multiplier=quality==='economy'?.82:quality==='ultra'?1.18:1;
 return (.011+(.023+(index%3)*.004)*envelope)*multiplier;
}
export function visibleCoreMistCount(quality,power){
 if(!['economy','balanced','ultra','auto'].includes(quality)||!Number.isFinite(power)||power<0)
  throw new RangeError('R201_MIST_BUDGET_INVALID_ARGUMENT');
 if(power===0||quality==='economy')return 0;
 return quality==='ultra'?18:12;
}
