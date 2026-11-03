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
