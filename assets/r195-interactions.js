/* SYNESTRA R195: bounded CSS 3D pointer feedback. No sphere movement, no GPU/canvas,
   no continuous animation loop; RAF only while interacting. */
(()=>{
 'use strict';
 if(!document.querySelector('.syn-r195-home,.syn-r195-product'))return;
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const fine=matchMedia('(hover:hover) and (pointer:fine)');
 const items=[...document.querySelectorAll('.r195-tilt,.r194-lab-card')];
 let active=null,frame=0,pending=null;
 const clear=el=>{
   if(!el)return;
   el.style.removeProperty('--r195-rx');
   el.style.removeProperty('--r195-ry');
   el.style.removeProperty('--r195-x');
   el.style.removeProperty('--r195-y');
   el.classList.remove('r195-pointer-active');
 };
 const reset=()=>{
   if(frame){cancelAnimationFrame(frame);frame=0;}
   clear(active);active=null;pending=null;
 };
 const render=()=>{
   frame=0;
   if(!pending||!active)return;
   const {el,x,y}=pending;
   if(active!==el)return;
   const box=el.getBoundingClientRect();
   if(!box.width||!box.height)return;
   const nx=Math.max(0,Math.min(1,(x-box.left)/box.width));
   const ny=Math.max(0,Math.min(1,(y-box.top)/box.height));
   const max=el.classList.contains('r195-vision-link')?1.6:2.2;
   el.style.setProperty('--r195-rx',((.5-ny)*max*2).toFixed(2)+'deg');
   el.style.setProperty('--r195-ry',((nx-.5)*max*2).toFixed(2)+'deg');
   el.style.setProperty('--r195-x',(nx*100).toFixed(1)+'%');
   el.style.setProperty('--r195-y',(ny*100).toFixed(1)+'%');
 };
 const enabled=()=>!reduce.matches&&fine.matches;
 for(const el of items){
   el.addEventListener('pointerenter',e=>{
     if(!enabled()||e.pointerType==='touch')return;
     if(active&&active!==el)clear(active);
     active=el;el.classList.add('r195-pointer-active');
     pending={el,x:e.clientX,y:e.clientY};
     if(!frame)frame=requestAnimationFrame(render);
   },{passive:true});
   el.addEventListener('pointermove',e=>{
     if(!enabled()||active!==el||e.pointerType==='touch')return;
     pending={el,x:e.clientX,y:e.clientY};
     if(!frame)frame=requestAnimationFrame(render);
   },{passive:true});
   el.addEventListener('pointerleave',()=>{if(active===el)reset()},{passive:true});
   el.addEventListener('blur',()=>{if(active===el)reset()},{passive:true});
 }
 const vision=document.querySelector('.r195-vision-system');
 if(vision){
   let visionFrame=0,coords=null;
   vision.addEventListener('pointermove',e=>{
     if(!enabled())return;
     coords={x:e.clientX,y:e.clientY};
     if(visionFrame)return;
     visionFrame=requestAnimationFrame(()=>{
       visionFrame=0;if(!coords)return;
       const b=vision.getBoundingClientRect();
       const x=Math.max(0,Math.min(100,(coords.x-b.left)/b.width*100));
       const y=Math.max(0,Math.min(100,(coords.y-b.top)/b.height*100));
       vision.style.setProperty('--r195-x',x.toFixed(1)+'%');
       vision.style.setProperty('--r195-y',y.toFixed(1)+'%');
     });
   },{passive:true});
   vision.addEventListener('pointerleave',()=>{
     if(visionFrame)cancelAnimationFrame(visionFrame);
     visionFrame=0;coords=null;
     vision.style.removeProperty('--r195-x');
     vision.style.removeProperty('--r195-y');
   },{passive:true});
 }
 // Native <details> retains keyboard and semantics. A state hook allows visual QA.
 document.querySelectorAll('.r194-faq-list details,.details details').forEach(d=>{
   const update=()=>d.classList.toggle('r195-open',d.open);
   d.addEventListener('toggle',update);update();
 });
 reduce.addEventListener('change',()=>{if(reduce.matches)reset()});
 fine.addEventListener('change',()=>{if(!fine.matches)reset()});
})();
