/**
 * R202.56: geometric morphology of the 28 existing shell plasma streams.
 * Four states: radiance (original), vortex, braiding, breathing waves.
 * Pure geometry only; fixed endpoints, no shader, mesh, brightness or color edits.
 */
export const SHELL_MODE_COUNT=4;
const TAU=2*Math.PI;
const ZERO=Object.freeze({side:0,across:0,radial:0});
export function sampleShellModeShape(mode,index,u,time){
 if(!Number.isInteger(mode)||mode<0||mode>=SHELL_MODE_COUNT)throw new RangeError('SHELL_MODE_INVALID');
 if(!Number.isInteger(index)||index<0||index>=28||!Number.isFinite(u)||u<0||u>1||!Number.isFinite(time)||time<0)
  throw new RangeError('SHELL_MODE_INPUT_INVALID');
 if(mode===0||u===0||u===1)return ZERO;
 const envelope=Math.pow(Math.sin(Math.PI*u),1.42);
 const phase=index*2.399963229728653;
 if(mode===1){ // vortex: spiraling cross-currents among the original shell anchors
  const angle=TAU*u*1.42+phase*.13+time*.31;
  return {side:.285*envelope*Math.sin(angle),across:.175*envelope*Math.cos(angle),radial:.018*envelope*Math.sin(angle)};
 }
 if(mode===2){ // braided magnetic bands, neighboring strands interweave
  const sign=index%4<2?1:-1,angle=TAU*u*2.35+phase*.22+time*.43;
  return {side:.24*envelope*sign*Math.sin(angle),across:.175*envelope*sign*Math.cos(angle),radial:.04*envelope*Math.sin(angle+.9)};
 }
 // Propagating radial pressure waves; fixed endpoints and bounded shell thickness.
 const angle=TAU*u*2.4-time*1.17+phase*.15;
 return {side:.075*envelope*Math.sin(angle),across:.052*envelope*Math.cos(angle),radial:.148*envelope*Math.sin(angle)};
}

/** Weighted morph across existing four geometry fields; anchors remain invariant. */
export function blendShellModeShape(index,u,time,weights){
 if(!Array.isArray(weights)||weights.length!==SHELL_MODE_COUNT||
   !weights.every(v=>Number.isFinite(v)&&v>=0&&v<=1)||
   Math.abs(weights.reduce((sum,w)=>sum+w,0)-1)>1e-6)
  throw new RangeError('SHELL_BLEND_WEIGHTS_INVALID');
 let side=0,across=0,radial=0;
 for(let mode=0;mode<SHELL_MODE_COUNT;mode++){
  const w=weights[mode];
  if(w===0)continue;
  const shape=sampleShellModeShape(mode,index,u,time);
  side+=w*shape.side;across+=w*shape.across;radial+=w*shape.radial;
 }
 return{side,across,radial};
}
