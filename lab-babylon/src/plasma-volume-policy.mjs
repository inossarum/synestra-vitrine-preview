/** One existing Babylon renderer, one raymarched volume carrier, bounded shader work. */
export const R20215_STEPS=Object.freeze({economy:8,balanced:12,auto:12,ultra:16});
export function r20215VolumePolicy(quality,power,radius){
 if(!Object.hasOwn(R20215_STEPS,quality)||![power,radius].every(Number.isFinite)||power<0||power>2.5||radius<0||radius>1.8)
  throw new RangeError('R20215_VOLUME_POLICY_INVALID');
 const steps=R20215_STEPS[quality];
 return {visible:power>0,steps,opacity:power===0?0:Math.min(.60,(quality==='economy'?.25:quality==='ultra'?.32:.28)*power)};
}
