// R202.29 — per-frame mask/foreground state, independent of 15 Hz mesh updates.
// No geometry writes, ownership transfer, or second rendering pass.
export function synchronizeFacetLifecycle({core,mask,sources,foreground,power,radius}) {
 if(!core||!mask||!Array.isArray(sources)||!Array.isArray(foreground)||
    sources.length!==6||foreground.length!==sources.length) {
  throw new TypeError('R20229_LIFECYCLE_INPUTS_INVALID');
 }
 if(!Number.isFinite(power)||!Number.isFinite(radius)){
  // Fail closed on invalid camera/control state; never leave stale stencil.
  mask.setEnabled(false);
  for(const front of foreground) front.setEnabled(false);
  throw new RangeError('R20229_LIFECYCLE_NUMERIC_INVALID');
 }
 const active=power>0&&radius>0&&core.isEnabled()&&core.isVisible&&core.visibility>0;
 mask.setEnabled(active);
 let visible=0;
 for(let i=0;i<foreground.length;i++){
  const source=sources[i];
  const enabled=active&&source.isEnabled()&&source.isVisible&&source.visibility>0;
  foreground[i].setEnabled(enabled);
  if(enabled)visible++;
 }
 return {maskActive:active,foregroundCount:visible};
}
