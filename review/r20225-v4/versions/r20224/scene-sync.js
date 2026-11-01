'use strict';
// Local-only review adapter. Never changes the Babylon bundle or source.
const CHANNEL='synestra.lab.review.sync.v1';
const IDS=['core-mode','core-radius','core-power','core-speed','strands','complexity','quality'];
function read(){
 const scene=globalThis.__synestraLabAtlasInterop?.getScene();
 const camera=scene?.activeCamera;
 if(!scene||!camera||document.querySelector('#renderCanvas')?.dataset.sphereReady!=='true')throw Error('NOT_READY');
 const nums=['alpha','beta','radius'].map(k=>Number(camera[k]));
 if(nums.some(x=>!Number.isFinite(x)))throw Error('INVALID_CAMERA');
 const settings=Object.fromEntries(IDS.map(id=>[id,document.getElementById(id)?.value]));
 if(Object.values(settings).some(v=>typeof v!=='string'))throw Error('CONTROL_MISSING');
 return {camera:{alpha:nums[0],beta:nums[1],radius:nums[2]},settings};
}
function prepare(s){
 if(!s||typeof s!=='object'||!s.camera||!s.settings||typeof s.settings!=='object')throw Error('INVALID_STATE');
 const {alpha,beta,radius}=s.camera;
 if(![alpha,beta,radius].every(Number.isFinite)||Math.abs(alpha)>1000||beta<.1||beta>3.05||radius<2.8||radius>7)throw Error('CAMERA_OUT_OF_RANGE');
 const controls=[];
 for(const id of IDS){
  const el=document.getElementById(id),value=s.settings[id];
  if(!el||typeof value!=='string'||value.length>24)throw Error('UNKNOWN_CONTROL');
  if(el.tagName==='SELECT'){
   if(![...el.options].some(o=>o.value===value))throw Error('OPTION_OUT_OF_RANGE');
  } else {
   if(!/^\d+(?:\.\d+)?$/.test(value))throw Error('VALUE_NOT_NUMERIC');
   const num=Number(value);
   if(!Number.isFinite(num)||num<Number(el.min)||num>Number(el.max))throw Error('VALUE_OUT_OF_RANGE');
   const step=Number(el.step||1);
   if(step>0&&Math.abs((num-Number(el.min))/step-Math.round((num-Number(el.min))/step))>1e-6)throw Error('STEP_OUT_OF_RANGE');
  }
  controls.push([el,value]);
 }
 return {alpha,beta,radius,controls};
}
window.addEventListener('message',e=>{
 const m=e.data;
 if(e.source!==window.parent||!m||m.channel!==CHANNEL||!Number.isSafeInteger(m.id)||m.id<1)return;
 function reply(result){window.parent.postMessage({channel:CHANNEL,id:m.id,...result},'*')}
 try{
  if(m.action==='capture'){reply({status:'PASS',state:read()});return}
  if(m.action==='capturePng'){
   read();
   const c=document.getElementById('renderCanvas');
   if(!c||c.width<200||c.height<200||c.width*c.height>3200000)throw Error('CANVAS_DIMENSIONS_INVALID');
   // The Babylon engine was created with preserveDrawingBuffer=true.
   requestAnimationFrame(()=>requestAnimationFrame(()=>{
    try{
     const dataUrl=c.toDataURL('image/png');
     if(!dataUrl.startsWith('data:image/png;base64,')||dataUrl.length>12000000)throw Error('PNG_ENCODING_FAILED');
     reply({status:'PASS',image:{dataUrl,width:c.width,height:c.height}});
    }catch(err){reply({status:'FAIL',error:String(err?.message||err).slice(0,100)})}
   }));
   return;
  }
  if(m.action==='apply'){
   read(); // fail-closed if Babylon is not initialized
   const checked=prepare(m.state);
   const camera=globalThis.__synestraLabAtlasInterop.getScene().activeCamera;
   for(const [el,value] of checked.controls){el.value=value;el.dispatchEvent(new Event('input',{bubbles:true}))}
   camera.alpha=checked.alpha;camera.beta=checked.beta;camera.radius=checked.radius;
   reply({status:'PASS',state:read()});return;
  }
  reply({status:'FAIL',error:'UNKNOWN_ACTION'});
 }catch(err){reply({status:'FAIL',error:String(err?.message||err).slice(0,100)})}
});
