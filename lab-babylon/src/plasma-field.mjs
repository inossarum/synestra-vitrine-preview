/** R202: pure quality/performance contract for the 3D procedural plasma volume.
 * No texture downloads, browser global, second rendering loop or scene creation.
 */
export const PLASMA_FIELD_RADII = Object.freeze([.56,1.04,1.49]);
export const PLASMA_FIELD_QUALITY = Object.freeze({
 economy:1,balanced:2,auto:2,ultra:3
});
export function plasmaFieldBudget(quality,power){
 if(!Object.hasOwn(PLASMA_FIELD_QUALITY,quality)||!Number.isFinite(power)||power<0||power>2.5)
  throw new RangeError('R202_PLASMA_FIELD_BUDGET_INVALID');
 return power===0?0:PLASMA_FIELD_QUALITY[quality];
}
export function plasmaFieldOpacity(index,power,quality='balanced'){
 if(!Number.isInteger(index)||index<0||index>=PLASMA_FIELD_RADII.length||
    !Object.hasOwn(PLASMA_FIELD_QUALITY,quality)||!Number.isFinite(power)||power<0||power>2.5)
  throw new RangeError('R202_PLASMA_FIELD_OPACITY_INVALID');
 if(index>=plasmaFieldBudget(quality,power))return 0;
 const base=[.29,.16,.085][index];
 return Math.min(.32,base*Math.min(power,1.6));
}
