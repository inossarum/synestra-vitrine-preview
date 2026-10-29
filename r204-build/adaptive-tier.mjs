// Synestra R205 — deterministic slow-frame GPU budget governor.
// Pure policy: true browser tests supply observed frame intervals; no UA sniffing.
export function evolveAdaptiveBudget({currentTier,slowWindows,fastWindows,quality,frameMs,targetIntervalMs}){
 if(!Number.isInteger(currentTier)||currentTier<0||currentTier>3||
    !Number.isFinite(frameMs)||frameMs<0||!Number.isFinite(targetIntervalMs)||targetIntervalMs<=0||
    !Number.isInteger(slowWindows)||slowWindows<0||!Number.isInteger(fastWindows)||fastWindows<0||
    !Number.isFinite(quality)||quality<.6||quality>1)throw RangeError('INVALID_R205_GPU_BUDGET');
 let tier=currentTier,slow=slowWindows,fast=fastWindows,q=quality;
 if(frameMs>targetIntervalMs*1.4){slow++;fast=0;}
 else if(frameMs<targetIntervalMs*1.1){fast++;slow=0;}
 else {slow=0;fast=0;}
 if(slow>=3){
  tier=Math.max(0,tier-1); // Tier 0 is still genuine low-cost WebGL 3D.
  q=Math.max(.6,q-.1);slow=0;
 }
 if(fast>=10){if(q<1)q=Math.min(1,q+.05);fast=0;}
 return {tier,slowWindows:slow,fastWindows:fast,quality:q};
}
