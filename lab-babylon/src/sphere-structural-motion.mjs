/**
 * R202.54 — coherent sphere-wide spatial motion.
 * Pure deterministic transform, shared by the existing nucleus, facet mask,
 * plasma envelope, ribbons and nodes. No lights, shaders or new meshes.
 */
export function sampleSphereStructuralMotion(time,{reducedMotion=false}={}){
 if(!Number.isFinite(time)||time<0)throw new RangeError('STRUCTURAL_TIME_INVALID');
 const t=reducedMotion?0:time;
 return {
  yaw:t*.070,
  pitch:.082*Math.sin(t*.15),
  roll:.033*(Math.sin(t*.11+.58)-Math.sin(.58)),
  scale:1+.015*Math.sin(t*.39)
 };
}

/** Bounded spatial response; no color, opacity or shader inputs. */
export function sampleSpherePointerResponse(x,y,{reducedMotion=false}={}){
 if(!Number.isFinite(x)||!Number.isFinite(y))throw new RangeError('STRUCTURAL_POINTER_INVALID');
 if(reducedMotion)return {pitch:0,yaw:0};
 const clamp=n=>Math.max(-1,Math.min(1,n));
 const nx=clamp(x),ny=clamp(y);
 return {pitch:ny===0?0:-ny*.078,yaw:nx===0?0:nx*.088};
}
