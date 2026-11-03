/**
 * R202.57 — deterministic, restartable 4-mode morph controller.
 * Continues smoothly from current weights when a second selection interrupts.
 * Pure data; does not create Babylon objects, materials, lights or shaders.
 */
export const SHELL_TRANSITION_SECONDS=.72;
const hot=mode=>Array.from({length:4},(_,i)=>i===mode?1:0);
export function advanceShellTransition(previous,mode,clock,{reducedMotion=false,duration=SHELL_TRANSITION_SECONDS}={}){
 if(!Number.isInteger(mode)||mode<0||mode>3)throw new RangeError('SHELL_MODE_INVALID');
 if(!Number.isFinite(clock)||clock<0||!Number.isFinite(duration)||duration<=0)throw new RangeError('SHELL_CLOCK_INVALID');
 if(previous!==null&&previous!==undefined){
  if(!Number.isFinite(previous.clock)||!Number.isFinite(previous.startedAt)||
    !Number.isInteger(previous.target)||previous.target<0||previous.target>3||
    !Array.isArray(previous.origin)||previous.origin.length!==4||
    !previous.origin.every(v=>Number.isFinite(v)&&v>=0&&v<=1))
   throw new TypeError('SHELL_TRANSITION_STATE_INVALID');
  if(clock<previous.clock)throw new RangeError('SHELL_CLOCK_BACKWARDS');
 }
 if(!previous||reducedMotion){
  const weights=hot(mode);
  return{target:mode,startedAt:clock,clock,origin:weights.slice(),weights,active:false};
 }
 const progress=Math.min(1,Math.max(0,(clock-previous.startedAt)/duration));
 const eased=progress*progress*(3-2*progress);
 const dest=hot(previous.target);
 const current=progress>=1?dest:previous.origin.map((v,i)=>v*(1-eased)+dest[i]*eased);
 if(mode!==previous.target){
  return{target:mode,startedAt:clock,clock,origin:current.slice(),weights:current,active:true};
 }
 return{target:mode,startedAt:previous.startedAt,clock,origin:previous.origin.slice(),weights:current,active:progress<1};
}
