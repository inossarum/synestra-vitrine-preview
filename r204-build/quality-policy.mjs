/* R207 quality policy; explicit choice and safe automatic adaptation.
 * "auto" follows observed GPU; manual preference remains capped by live frame governor.
 * Exported separately so failure-first tests run without a browser. */
export const QUALITY_MODES=Object.freeze(['auto','eco','balanced','high','ultra']);
export const ENERGY_STEPS=Object.freeze([12,24,32,40]);
export const VOLUME_STEPS=Object.freeze([8,12,16,22]);
export const FLOW_COUNT=Object.freeze([3,4,6,8]);
export const PIXEL_BUDGET=Object.freeze([175000,420000,1150000,2200000]);
export function sanitizeQualityMode(mode){
 return QUALITY_MODES.includes(mode)?mode:'auto';
}
export function resolveQualityTier(mode,detectedTier,coarsePointer=false){
 const gpu=Number.isInteger(detectedTier)?Math.max(0,Math.min(3,detectedTier)):1;
 const choice=sanitizeQualityMode(mode);
 if(choice==='auto')return coarsePointer?Math.min(2,gpu):gpu;
 return {eco:0,balanced:1,high:2,ultra:3}[choice];
}
export function clampDetailForTier(tier){
 if(!Number.isInteger(tier)||tier<0||tier>3)throw RangeError('INVALID_RENDER_TIER');
 return {energy:ENERGY_STEPS[tier],volume:VOLUME_STEPS[tier],flows:FLOW_COUNT[tier],pixels:PIXEL_BUDGET[tier]};
}
