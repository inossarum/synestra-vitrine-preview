/* Synestra R204 — compact real 3D Core stage, studio LAB R188.1 energy.
 * One renderer/canvas. Geometry reacts to physical local lights.
 * Rest of site stays semantic HTML. All runtime resources self-hosted. */
import * as THREE from 'three';
import {getGPUTier} from 'detect-gpu';
import {labR1881Fragment,labR1881Vertex} from './lab-r1881-shader.mjs';
import {evolveAdaptiveBudget} from './adaptive-tier.mjs';
import {clampDetailForTier} from './quality-policy.mjs';
import {installLabDetail} from './lab-detail-r207.mjs';
import {installCoreNucleus} from './core-nucleus-r209.mjs';
import {createQualityPanel} from './quality-ui-r207.mjs';
const stage=document.querySelector('.core-r109-stage');
const canvas=stage?.querySelector('.core-r109-canvas');
if(stage&&canvas){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const status=document.querySelector('[data-render-status]');
 const say=s=>{if(status)status.textContent=s;};
 const ctl=Object.fromEntries([...document.querySelectorAll('[data-sphere-control]')].map(e=>[e.dataset.sphereControl,e]));
 const value=(key,fallback)=>Number(ctl[key]?.value??fallback);
 const color=(key,fallback)=>ctl[key]?.value||fallback;
 let renderer=null,scene,camera,plasma,uniforms,dead=false,raf=0;
 let elapsed=0,last=0,lastDraw=0,drawCount=0,drawStart=0,quality=.85,renderTier=1;
 let slow=0,fast=0,scale=1,pointerX=0,pointerY=0,impulse=0,energy=0,lightV,lightG,lightCore;
 let stageWidth=0,stageHeight=0,lastRatio=0,mist=null,grain=null;
 let labDetail=null,coreNucleus=null,qualityPanel=null,detectedTier=1;
 const owned=[];
 const clamp=(x,a,b)=>Math.min(b,Math.max(a,x));
 const make=(geo,mat,p,cast=false)=>{
  const mesh=new THREE.Mesh(geo,mat);
  mesh.position.set(...p);mesh.receiveShadow=true;mesh.castShadow=cast;
  scene.add(mesh);owned.push(mesh);return mesh;
 };
 const metallic=(hex,roughness,metalness,emissive=0x000000,ei=0)=>
  new THREE.MeshStandardMaterial({color:hex,roughness,metalness,emissive,emissiveIntensity:ei});
 const dispose=()=>{
  if(dead)return;dead=true;cancelAnimationFrame(raf);
  window.removeEventListener('resize',resize);window.removeEventListener('scroll',onScroll);
  canvas.removeEventListener('pointermove',onPointer);
  for(const m of owned){m.geometry.dispose();m.material.dispose();}
  if(plasma){plasma.geometry.dispose();plasma.material.dispose();}
  grain?.remove();qualityPanel?.dispose();
  renderer?.dispose();stage.removeAttribute('data-core-ready');
 };
 function onScroll(){
  if(!camera)return;
  const t=clamp(scrollY/Math.max(innerHeight*1.7,1),0,1),e=t*t*(3-2*t);
  camera.position.set(.25*e,1.38+.18*e,6.35-.49*e);
  camera.lookAt(0,-.09,0);
  stage.dataset.sceneScroll=e.toFixed(3);
 }
 function resize(){
  if(!renderer||dead)return;
  const r=stage.getBoundingClientRect(),w=Math.max(1,Math.round(r.width)),h=Math.max(1,Math.round(r.height));
  const maxPixels=clampDetailForTier(renderTier).pixels;
  const pixelRatio=Math.min(devicePixelRatio||1,Math.sqrt(maxPixels/(w*h)))*quality;
  if(w===stageWidth&&h===stageHeight&&Math.abs(pixelRatio-lastRatio)<.005)return;
  stageWidth=w;stageHeight=h;lastRatio=pixelRatio;
  renderer.setPixelRatio(pixelRatio);renderer.setSize(w,h,false);
  camera.aspect=w/h;camera.updateProjectionMatrix();
  uniforms.uResolution.value.set(canvas.width,canvas.height);
 }
 function onPointer(e){
  const rect=canvas.getBoundingClientRect(),nx=(e.clientX-rect.left)/rect.width,ny=(e.clientY-rect.top)/rect.height;
  if(nx<0||nx>1||ny<0||ny>1)return;
  // Raycast against the actual world-space plasma plane, not flat screen XY.
  const ray=new THREE.Raycaster();
  ray.setFromCamera(new THREE.Vector2(nx*2-1,1-ny*2),camera);
  const hit=ray.intersectObject(plasma,false)[0];
  if(!hit?.uv){impulse=0;return;}
  pointerX=(hit.uv.x-.5)*2;pointerY=(hit.uv.y-.5)*2+.08;
  if(Math.hypot(pointerX,pointerY-.08)<1)impulse=.72;
 }
 async function init(){
  if(reduced.matches){stage.dataset.r204Fallback='reduced-motion';say('Sphère statique : animations réduites.');return;}
  try{renderer=new THREE.WebGLRenderer({canvas,alpha:false,antialias:false,powerPreference:'default'});}
  catch(e){stage.dataset.r204Fallback='webgl-unavailable';say('WebGL indisponible : référence statique.');return;}
  renderer.setClearColor(0x050919,1);
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.15;
  renderer.shadowMap.enabled=false;
  scene=new THREE.Scene();scene.background=new THREE.Color(0x050919);
  scene.fog=new THREE.FogExp2(0x071020,.066);
  camera=new THREE.PerspectiveCamera(44,1,.1,30);
  onScroll();
  const v=new THREE.Color(color('secondary','#552a9d')),g=new THREE.Color(color('rim','#55d49a'));
  const ivory=new THREE.Color(color('core','#eee9f8'));
  const hemi=new THREE.HemisphereLight(0x7c8fa8,0x0b1022,.45);scene.add(hemi);
  lightV=new THREE.PointLight(v,13,7,2);
  lightG=new THREE.PointLight(g,12,7,2);
  lightCore=new THREE.PointLight(ivory,5,5,2);
  lightV.position.set(-.63,.24,.15);lightG.position.set(.66,.18,.17);lightCore.position.set(0,-.28,.2);
  scene.add(lightV,lightG,lightCore);
  // Compact real 3D environment, not an infinite landscape nor CSS illusion.
  make(new THREE.PlaneGeometry(15,15),metallic(0x263243,.63,.55),[0,-1.53,-1.5]).rotation.x=-Math.PI/2;
  make(new THREE.BoxGeometry(9,5.2,.15),metallic(0x1b273b,.76,.35),[0,.1,-4.1]);
  for(const side of [-1,1]){
   const face=make(new THREE.BoxGeometry(.14,3.6,4),metallic(side<0?0x302640:0x21413c,.63,.58),[side*3.95,.20,-1.7]);
   face.rotation.y=side*.065;
   make(new THREE.BoxGeometry(.025,2.45,.048),
    metallic(side<0?0x4b3d69:0x39645b,.37,.65),[side*3.81,.12,-1.1]);
  }
  make(new THREE.CylinderGeometry(1.31,1.40,.14,48),metallic(0x344559,.42,.72),[0,-1.46,0]);
  make(new THREE.CylinderGeometry(1.18,1.18,.018,48),metallic(0x132033,.65,.51),[0,-1.38,0]);
  const ring=make(new THREE.TorusGeometry(1.25,.012,5,72),metallic(0x5e7386,.34,.78),[0,-1.366,0]);
  ring.rotation.x=-Math.PI/2;
  // R206: readable pedestal recess, two restrained inlaid rings, no mirror/reflection pass.
  const inner=make(new THREE.TorusGeometry(1.09,.008,5,64),metallic(0x497b75,.40,.55,0x163c35,.32),[0,-1.363,0]);inner.rotation.x=-Math.PI/2;
  const edge=make(new THREE.TorusGeometry(1.38,.009,5,64),metallic(0x4d4774,.49,.62,0x26133e,.20),[0,-1.503,0]);edge.rotation.x=-Math.PI/2;
  // Physical chamber ribs and low-profile depth lines, bounded to the immediate core stage.
  for(const side of [-1,1])for(let j=0;j<3;j++){
   const rib=make(new THREE.BoxGeometry(.018,1.55-j*.13,.035),metallic(side<0?0x564270:0x335a52,.72,.42),[side*(2.75+j*.32),-.20,-2.60]);
   rib.rotation.y=side*.12;
  }
  // One shallow transparent world-space plane: floor-hugging light-scattering fog.
  // No fullscreen postprocessing, no volumetric raymarch and no second canvas.
  const fogUniforms={uTime:{value:0},uStrength:{value:.20}};
  mist=make(new THREE.PlaneGeometry(4.2,3.4),new THREE.ShaderMaterial({
   uniforms:fogUniforms,transparent:true,depthTest:true,depthWrite:false,toneMapped:false,
   vertexShader:'varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
   fragmentShader:`varying vec2 vUv;uniform float uTime;uniform float uStrength;
    void main(){vec2 p=(vUv-.5)*2.0;float r=length(p*vec2(.87,1.22));
      float w=sin(p.x*10.0+uTime*.13)*sin(p.y*8.0-uTime*.11);
      float drift=.5+.5*w;float band=smoothstep(1.05,.08,r)*smoothstep(.06,.34,abs(p.x)+.12);
      float alpha=band*uStrength*(.68+.32*drift);
      vec3 violet=vec3(.35,.26,.63),mint=vec3(.29,.60,.52);
      gl_FragColor=vec4(mix(violet,mint,smoothstep(-.75,.75,p.x)),alpha);
    }`
  }),[0,-1.25,.12]);
  mist.rotation.x=-Math.PI/2;mist.renderOrder=2;
  mist.userData.fogUniforms=fogUniforms;
  // The LAB R188.1 filament source is shaded in a world-space plane with
  // accurate depth testing. No duplicate canvas, no separate glow renderer.
  uniforms={
   uResolution:{value:new THREE.Vector2(800,600)},uTime:{value:0},
   uPass:{value:4},uLayer:{value:1},uTilt:{value:new THREE.Vector2()},
   uControls:{value:new THREE.Vector4(0,1.65,1,1)},
   uShape:{value:new THREE.Vector4(1,0,.74,1.45)},
   uEffects:{value:new THREE.Vector4(1,1,1,1)},
   uPointer:{value:new THREE.Vector4(0,0,0,1)},
   uSpinPhase:{value:0},uCore:{value:ivory},uCyan:{value:g},uViolet:{value:v},
   uDeep:{value:new THREE.Color('#24153c')},
   uMotePrimary:{value:v},uMoteSecondary:{value:g},
   uMoteShape:{value:0},uMoteFinish:{value:new THREE.Vector2(.5,.5)},
   uVolumeSteps:{value:12},uFlow:{value:new THREE.Vector2(6,1)},
   uFlowLab:{value:new THREE.Vector4(5,1,.8,1)},
   uEnergySteps:{value:18},uEnergyMouse:{value:.5},
   uEnergyA:{value:v},uEnergyB:{value:g},uEnergyCore:{value:ivory},
   uCompare:{value:1},uDepthRefine:{value:1},uLabTime:{value:0}
  };
  plasma=new THREE.Mesh(new THREE.PlaneGeometry(3.62,3.62),new THREE.ShaderMaterial({
   vertexShader:labR1881Vertex,fragmentShader:labR1881Fragment,uniforms,
   transparent:true,depthTest:true,depthWrite:false,toneMapped:false,
   side:THREE.FrontSide,glslVersion:THREE.GLSL1
  }));
  plasma.position.set(0,.07,.12);plasma.frustumCulled=false;scene.add(plasma);
  // R209: restore a real luminous nucleus in the same depth-tested 3D stage.
  coreNucleus=installCoreNucleus({THREE,scene,owned,uniforms});
  labDetail=installLabDetail({THREE,scene,owned});
  // detect-gpu offline benchmarks; tier-0 still gets cheap 3D when WebGL exists.
  try{
   const gpu=await getGPUTier({gl:renderer.getContext(),
    benchmarksURL:new URL('./r204-gpu-benchmarks',import.meta.url).href});
   detectedTier=clamp(gpu.tier||0,0,3);
  }catch(_){detectedTier=1;}
  renderTier=detectedTier;
  if(matchMedia('(pointer:coarse)').matches)renderTier=Math.min(renderTier,2);
  stage.dataset.gpuTier=String(detectedTier);
  stage.dataset.renderTier=String(renderTier);
  stage.dataset.autoTierDrops='0';
  const budget=[12,24,32,40];
  uniforms.uEnergySteps.value=budget[renderTier];
  uniforms.uVolumeSteps.value=[8,12,16,22][renderTier];
  uniforms.uFlowLab.value.set([3,4,6,8][renderTier],1.08,1.0,1.23);
  uniforms.uFlow.value.set(6,[.88,1,1.08,1.18][renderTier]);
  quality=renderTier===0?.85:renderTier===1?.9:1;
  renderer.shadowMap.enabled=renderTier>=3;
  const setAtmosphere=()=>{
   mist.visible=renderTier>=1;
   mist.userData.fogUniforms.uStrength.value=renderTier>=3?.56:renderTier===2?.40:renderTier===1?.23:0;
   stage.dataset.sceneAtmosphere=renderTier>=3?'fine':renderTier===2?'light':renderTier===1?'minimal':'off';
  };
  const syncTier=()=>{
   const d=clampDetailForTier(renderTier);
   uniforms.uEnergySteps.value=d.energy;uniforms.uVolumeSteps.value=d.volume;
   uniforms.uFlowLab.value.x=d.flows;uniforms.uFlow.value.y=[.88,1,1.08,1.18][renderTier];
   renderer.shadowMap.enabled=renderTier>=3;
   labDetail.applyTier(renderTier);
   coreNucleus.applyTier(renderTier);
   setAtmosphere();
   stage.dataset.renderTier=String(renderTier);
   stage.dataset.energyFlows=String(labDetail.getFlowCount());
   stage.dataset.energyMotes=String(labDetail.getMoteCount());
   stage.dataset.energyRaySamples=String(d.energy);
  };
  qualityPanel=createQualityPanel({stage,detectedTier,
   coarse:matchMedia('(pointer:coarse)').matches,onChange:tier=>{
    renderTier=tier;quality=tier<=1?.9:1;slow=fast=0;drawStart=0;drawCount=0;
    syncTier();targetInterval=renderTier<=0?1000/18:renderTier===1?1000/24:renderTier===2?1000/30:1000/50;
    resize();qualityPanel.update(renderTier);
   }});
  renderTier=qualityPanel.tier;syncTier();
  grain=document.createElement('div');grain.className='r206-film-grain';grain.setAttribute('aria-hidden','true');stage.appendChild(grain);
  stage.dataset.labReference='R188.1@81b9cf1c';
  stage.dataset.coreRenderer='three-one';
  stage.dataset.coreNucleus='geometry-r209';
  resize();
  window.addEventListener('resize',resize,{passive:true});
  window.addEventListener('scroll',onScroll,{passive:true});
  canvas.addEventListener('pointermove',onPointer,{passive:true});
  canvas.addEventListener('pointerleave',()=>{impulse=0;});
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();stage.dataset.r204Fallback='context-lost';dispose();say('WebGL indisponible : visuel statique.');},{once:true});
  let targetInterval=renderTier<=0?1000/18:renderTier===1?1000/24:renderTier===2?1000/30:1000/50;
  const tick=now=>{
   raf=0;if(dead)return;
   if(document.visibilityState!=='visible'){
    last=now;drawStart=0;drawCount=0;slow=0;fast=0;
    raf=requestAnimationFrame(tick);return;
   }
   if(now-lastDraw<targetInterval){raf=requestAnimationFrame(tick);return;}
   const dt=last?Math.min((now-last)/1000,.10):0;
   last=now;lastDraw=now;elapsed+=dt;
   energy+=(impulse-energy)*(1-Math.exp(-dt*10));impulse*=Math.exp(-dt*3);
   uniforms.uTime.value=elapsed*.86;
   uniforms.uLabTime.value=elapsed*.86;
   uniforms.uSpinPhase.value=elapsed*.104;
   labDetail.frame(elapsed);
   coreNucleus.frame(elapsed);
   if(mist.visible)mist.userData.fogUniforms.uTime.value=elapsed;
   uniforms.uPointer.value.set(pointerX,pointerY,energy,1);
   lightV.intensity=13*(.94+.06*Math.sin(elapsed*.67));
   lightG.intensity=12*(.96+.04*Math.sin(elapsed*.72+1.4));
   plasma.quaternion.copy(camera.quaternion);
   renderer.render(scene,camera);
   if(!stage.dataset.coreReady){stage.dataset.coreReady='true';say('Core 3D Studio actif.');}
   drawCount++;
   if(!drawStart)drawStart=now;
   if(drawCount%30===0){
    const avg=(now-drawStart)/30;
    const next=evolveAdaptiveBudget({currentTier:renderTier,slowWindows:slow,fastWindows:fast,quality,frameMs:avg,targetIntervalMs:targetInterval});
    slow=next.slowWindows;fast=next.fastWindows;
    const tierChanged=next.tier!==renderTier,qualityChanged=next.quality!==quality;
    quality=next.quality;
    if(tierChanged){
     renderTier=next.tier;
     syncTier();
     stage.dataset.autoTierDrops=String(Number(stage.dataset.autoTierDrops)+1);
     targetInterval=renderTier<=0?1000/18:renderTier===1?1000/24:renderTier===2?1000/30:1000/50;
    }
    if(tierChanged||qualityChanged)resize();
    stage.dataset.coreFps=(30000/Math.max(1,now-drawStart)).toFixed(1);
    stage.dataset.coreQuality=quality.toFixed(2);
    stage.dataset.energyRaySamples=String(uniforms.uEnergySteps.value);
    qualityPanel.update(renderTier,stage.dataset.coreFps);
    drawStart=now;
   }
   raf=requestAnimationFrame(tick);
  };
  raf=requestAnimationFrame(tick);
 }
 init().catch(e=>{stage.dataset.r204Fallback='initialization-failed';say('Sphère statique : initialisation indisponible.');console.error('Synestra R204',e);});
}