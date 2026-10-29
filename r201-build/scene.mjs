/* Synestra R201 — Three.js + Theatre.js integrated, self-hosted, one renderer.
 * World-space metal geometry receives point lighting from the Core.
 * Synestra volumetric plasma shader remains the emissive fullscreen surface.
 * No runtime CDN, no framework, no second canvas, no hidden paid services.
 */
import * as THREE from 'three';
import {getProject} from '@theatre/core';
import {getGPUTier} from 'detect-gpu';
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';
import {UnrealBloomPass} from 'three/addons/postprocessing/UnrealBloomPass.js';
import {OutputPass} from 'three/addons/postprocessing/OutputPass.js';
import {plasmaVertex,plasmaFragment} from './plasma-shader.mjs';

const stage=document.querySelector('.core-r109-stage');
const canvas=stage?.querySelector('.core-r109-canvas');
if(stage && canvas) {
 const status=document.querySelector('[data-render-status]');
 const say=s=>{if(status)status.textContent=s;};
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const defaults=Object.fromEntries([...document.querySelectorAll('[data-sphere-control]')].map(e=>[e.dataset.sphereControl,e]));
 const scalar=(name,fallback=100)=>Number(defaults[name]?.value??fallback)/100;
 const hex=(name,color)=>defaults[name]?.value||color;
 let renderer=null,composer=null,disposed=false,raf=0,quality=1,frameNum=0,frameStart=0,slow=0,fast=0,elapsed=0,previous=0;
 let pointerEnergy=0,pointerImpulse=0,pointerX=0,pointerY=0;
 let sphereUniforms,scene,camera,lights,plasma;
 let view={orbitX:0,lift:1.13,distance:6.2,lightGain:1};
 let theatreReady=false,viewportWidth=0,viewportHeight=0,lastPixelRatio=0,theatreScroll=()=>{};
 const normScroll=()=>Math.min(1,Math.max(0,scrollY/Math.max(1,innerHeight)));
 const cleanup=()=>{
  if(disposed)return;disposed=true;cancelAnimationFrame(raf);
  window.removeEventListener('resize',resize);
  window.removeEventListener('scroll',theatreScroll);
  stage.removeEventListener('pointermove',onPointer);
  if(composer){composer.dispose?.();}
  scene?.traverse(obj=>{if(obj.isMesh){obj.geometry?.dispose();obj.material?.dispose();}});
  renderer?.dispose();stage.removeAttribute('data-core-ready');
 };
 const start=async()=>{
  if(reduced.matches){say('Animation réduite : Core statique accessible.');return;}
  try{
   renderer=new THREE.WebGLRenderer({canvas,alpha:false,antialias:false,powerPreference:'high-performance',preserveDrawingBuffer:false});
  }catch(err){say('GPU indisponible : Core statique conservé.');stage.dataset.coreError='webgl';return;}
  renderer.setClearColor(0x040815,1);
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.22;
  renderer.shadowMap.enabled=true;
  renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  scene=new THREE.Scene();
  scene.background=new THREE.Color(0x040815);
  scene.fog=new THREE.FogExp2(0x080c19,.037);
  camera=new THREE.PerspectiveCamera(49,1,.1,60);
  camera.position.set(0,1.13,6.2);camera.lookAt(0,.05,0);
  const violet=new THREE.Color(hex('secondary','#552a9d'));
  const green=new THREE.Color(hex('rim','#55d49a'));
  const core=new THREE.Color(hex('core','#eaffff'));
  const ambient=new THREE.HemisphereLight(0x8591ae,0x111b2a,.31);
  scene.add(ambient);
  const a=new THREE.PointLight(violet,17,12,2),b=new THREE.PointLight(green,16,12,2);
  const white=new THREE.PointLight(core,6,8,2);
  a.position.set(-.8,.3,.28);b.position.set(.8,.22,.28);white.position.set(0,-.16,.25);
  a.castShadow=true;a.shadow.mapSize.set(384,384);a.shadow.bias=-.00025;a.shadow.normalBias=.02;
  lights={a,b,white,ambient};scene.add(a,b,white);
  const metal=(color,roughness=.45,metalness=.7)=>new THREE.MeshStandardMaterial({color,roughness,metalness});
  const add=(geo,mat,x,y,z,rx=0,ry=0,rz=0)=>{
   const mesh=new THREE.Mesh(geo,mat);mesh.position.set(x,y,z);mesh.rotation.set(rx,ry,rz);
   mesh.receiveShadow=true;mesh.castShadow=false;scene.add(mesh);return mesh;
  };
  // The environment is physically present, not a collection of 2D layers.
  const floor=add(new THREE.PlaneGeometry(45,45),metal(0x263443,.57,.65),0,-1.42,-2,-Math.PI/2);
  floor.receiveShadow=true;
  // Discreet raised metal dais, cast-shadow footprint of the actual emitter.
  const pedestal=add(new THREE.CylinderGeometry(1.31,1.39,.13,64),metal(0x344258,.36,.74),0,-1.35,0);
  pedestal.castShadow=true;
  const inset=add(new THREE.CylinderGeometry(1.13,1.13,.008,64),metal(0x1a2836,.55,.62),0,-1.277,0);
  const rim=add(new THREE.TorusGeometry(1.30,.015,8,120),metal(0x67778b,.31,.75),0,-1.271,0,-Math.PI/2);
  // Recessed architectural walls and ceiling.
  add(new THREE.BoxGeometry(14,8,.24),metal(0x1b2739,.67,.47),0,.10,-5.2);
  add(new THREE.BoxGeometry(.26,5.4,7.5),metal(0x243247,.53,.67),-4.5,.15,-2);
  add(new THREE.BoxGeometry(.26,5.4,7.5),metal(0x203a3e,.53,.67),4.5,.15,-2);
  add(new THREE.BoxGeometry(12,.18,8),metal(0x1b2536,.59,.6),0,3.12,-2);
  // Small inset panels give scale and parallax with correct depth, no neon ring.
  for(let i=-1;i<=1;i++){
   const m=metal(i===-1?0x29334a:i===1?0x243f3a:0x1a2735,.46,.71);
   add(new THREE.BoxGeometry(1.08,3.3,.05),m,i*2.15,0,-5.04);
  }
  // Narrow material bevels catch the coloured point lights.
  for(const x of [-3.32,3.32]){
   add(new THREE.BoxGeometry(.045,4.9,.05),metal(0x506079,.33,.72),x,.14,-4.98);
  }
  sphereUniforms={
   uResolution:{value:new THREE.Vector2(960,570)},uTime:{value:0},uPass:{value:4},uLayer:{value:1},
   uTilt:{value:new THREE.Vector2(0,0)},uPointer:{value:new THREE.Vector3()},
   uControls:{value:new THREE.Vector4(4,scalar('particleIntensity',200),scalar('particleSpeed'),scalar('particleDensity'))},
   uShape:{value:new THREE.Vector4(scalar('diameter',101),scalar('shellVisibility',0),scalar('coreSize',73),scalar('coreLight',500))},
   uEffects:{value:new THREE.Vector4(scalar('arcIntensity',140),scalar('arcDensity'),scalar('particleSize'),scalar('opacity'))},
   uCore:{value:core},uCyan:{value:green},uViolet:{value:violet},uDeep:{value:new THREE.Color(hex('primary','#190d35'))},
   uVolumeSteps:{value:18},uFlow:{value:new THREE.Vector2(0,scalar('flowStructure',94))},
   uSceneScroll:{value:0},uSceneQuality:{value:1}
  };
  // Existing GLSL1 volume rendered in the same THREE.WebGLRenderer and scene.
  // The quad lives in clip space to keep the approved Core pose fixed.
  plasma=new THREE.Mesh(new THREE.PlaneGeometry(2,2),new THREE.ShaderMaterial({
   uniforms:sphereUniforms,vertexShader:plasmaVertex,fragmentShader:plasmaFragment,
   transparent:true,depthTest:false,depthWrite:false,blending:THREE.NormalBlending,
   toneMapped:false,glslVersion:THREE.GLSL1
  }));
  plasma.frustumCulled=false;plasma.renderOrder=100;scene.add(plasma);
  // Theatre.js Core mediates camera and light scene parameters. No Studio in production.
  try{
   const project=getProject('Synestra R201', {state:{sheetsById:{},definitionVersion:'0.4.0',revisionHistory:[]}});
   const sheet=project.sheet('Core Arrival');
   const shot=sheet.object('Camera + Light',{orbitX:0,lift:1.13,distance:6.2,lightGain:1});
   shot.onValuesChange(value=>{view=value;camera.position.set(value.orbitX,value.lift,value.distance);camera.lookAt(0,.05,0);stage.dataset.cameraPos=[value.orbitX,value.lift,value.distance].map(x=>x.toFixed(3)).join(',');});
   await project.ready;
   theatreReady=true;
   const update=()=>{
    const t=normScroll(),ease=t*t*(3-2*t);
    sheet.sequence.position=t*4;
    shot.initialValue={orbitX:.5*ease,lift:1.13+.25*ease,distance:6.2-.9*ease,lightGain:1+.14*ease};
    stage.dataset.theatrePosition=sheet.sequence.position.toFixed(3);
   };
   theatreScroll=update;
   window.addEventListener('scroll',theatreScroll,{passive:true});
   update();
  }catch(err){stage.dataset.theatreError=String(err).slice(0,110);say('Mise en scène réduite : scène 3D active.');}
  // GPU tier: self-hosted benchmark data (no unpkg/CDN request).
  let tier=1;
  try{
   const r=await getGPUTier({gl:renderer.getContext(),benchmarksURL:new URL('./r201-gpu-benchmarks',import.meta.url).href});
   tier=Math.max(0,Math.min(3,r.tier||0));
  }catch(_err){tier=1;}
  if(tier===0){renderer.dispose();renderer=null;stage.dataset.coreError='low-tier';say('GPU insuffisant : visuel fixe.');return;}
  const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<700;
  const tierCap=mobile?Math.min(2,tier):tier;
  stage.dataset.gpuTier=String(tierCap);
  if(tierCap<=1){a.castShadow=false;renderer.shadowMap.enabled=false;sphereUniforms.uVolumeSteps.value=10;quality=.67;}
  else if(tierCap===2){sphereUniforms.uVolumeSteps.value=14;quality=.84;}
  else{sphereUniforms.uVolumeSteps.value=18;quality=1;}
  // Postprocessing only on high tier. Uses same renderer; no second canvas.
  if(tierCap===3){
   composer=new EffectComposer(renderer);
   composer.addPass(new RenderPass(scene,camera));
   const bloom=new UnrealBloomPass(new THREE.Vector2(1,1),.17,.34,.87);
   composer.addPass(bloom);composer.addPass(new OutputPass());
  }
  const controlUpdate=()=>{a.color.set(hex('secondary','#552a9d'));b.color.set(hex('rim','#55d49a'));
   white.color.set(hex('core','#eaffff'));
   sphereUniforms.uCyan.value.copy(b.color);sphereUniforms.uViolet.value.copy(a.color);sphereUniforms.uCore.value.copy(white.color);
   sphereUniforms.uShape.value.set(scalar('diameter',101),scalar('shellVisibility',0),scalar('coreSize',73),scalar('coreLight',500));
  };
  stage.querySelectorAll('input[data-sphere-control]').forEach(e=>e.addEventListener('input',controlUpdate,{passive:true}));
  resize();
  const tick=(now)=>{
   raf=0;if(disposed||document.visibilityState==='hidden')return;
   const dt=previous?Math.min((now-previous)/1000,.10):0;previous=now;
   elapsed+=dt;frameNum++;
   if(frameNum>1){
    if(dt>.052){slow++;fast=0;}else if(dt<.029){fast++;slow=Math.max(0,slow-1);}
    if(slow>25&&quality>.55){quality=Math.max(.55,quality-.08);slow=0;resize();}
    if(fast>150&&quality<1){quality=Math.min(1,quality+.05);fast=0;resize();}
   }
   pointerEnergy+=(pointerImpulse-pointerEnergy)*(1-Math.exp(-dt*12));
   pointerImpulse*=Math.exp(-dt*2.5);
   sphereUniforms.uTime.value=elapsed;
   sphereUniforms.uPointer.value.set(pointerX,pointerY,pointerEnergy);
   const intensity=scalar('coreLight',500)/5*view.lightGain;
   a.intensity=17*intensity;b.intensity=16*intensity;white.intensity=6*intensity;
   if(composer)composer.render();else renderer.render(scene,camera);
   if(!stage.hasAttribute('data-core-ready')){stage.dataset.coreReady='true';say(theatreReady?'Three.js et Theatre.js actifs.':'Three.js actif.');}
   if(!frameStart)frameStart=now;
   if(frameNum%45===0){
    stage.dataset.coreFps=(45000/Math.max(1,now-frameStart)).toFixed(1);
    stage.dataset.coreQuality=quality.toFixed(2);
    stage.dataset.theatreReady=String(theatreReady);
    frameStart=now;
   }
   raf=requestAnimationFrame(tick);
  };
  raf=requestAnimationFrame(tick);
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();say('GPU perdu : visuel de secours.');cleanup();},{once:true});
 };
 function resize(){
  if(!renderer||disposed)return;
  const rect=stage.getBoundingClientRect();const w=Math.max(1,Math.round(rect.width)),h=Math.max(1,Math.round(rect.height));
  const mobile=innerWidth<700;
  const ratio=Math.min(devicePixelRatio||1,mobile?1.2:1.6)*quality;
  if(w===viewportWidth&&h===viewportHeight&&Math.abs(ratio-lastPixelRatio)<.001)return;
  viewportWidth=w;viewportHeight=h;lastPixelRatio=ratio;
  renderer.setPixelRatio(ratio);
  renderer.setSize(w,h,false);
  camera.aspect=w/h;camera.updateProjectionMatrix();
  const W=renderer.domElement.width,H=renderer.domElement.height;
  sphereUniforms.uResolution.value.set(W,H);
  composer?.setSize(w,h);
 }
 function onPointer(e){
  if(e.pointerType==='touch')return;
  const r=canvas.getBoundingClientRect(),nx=(e.clientX-r.left)/Math.max(1,r.width),ny=(e.clientY-r.top)/Math.max(1,r.height);
  if(nx<0||nx>1||ny<0||ny>1){pointerImpulse=0;return;}
  const aspect=canvas.width/Math.max(1,canvas.height);
  pointerX=(nx-.5)*2*aspect*1.72;pointerY=(.5-ny)*2*1.72+.08;
  pointerImpulse=Math.hypot(pointerX,pointerY-.08)<.8?.72:0;
 }
 window.addEventListener('resize',resize,{passive:true});
 stage.addEventListener('pointermove',onPointer,{passive:true});
 stage.addEventListener('pointerleave',()=>{pointerImpulse=0;},{passive:true});
 start();
}
