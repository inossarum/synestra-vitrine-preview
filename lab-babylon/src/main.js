import {Engine,Scene,ArcRotateCamera,Vector3,Color3,Color4,Matrix,MeshBuilder,StandardMaterial,GlowLayer,PointLight,TransformNode} from '@babylonjs/core';
import {SPHERE_REFERENCE} from './reference-contract.js';
import {sampleCoreVolume,coreVolumeWidth,coreMistWidth,visibleCoreMistCount} from './core-volume.mjs';
import {sampleCoreShellFlow,coreShellVeilRadius,visibleCoreShellVeils} from './core-shell-flow.mjs';
import {installPlasmaRibbons} from './plasma-ribbons.js';
import {installNodeForks} from './node-branches.js';
import {mountCoreAtAtlasSocket} from './atlas-interop.js';
import {installPlasmaField} from './plasma-field.js';
// ONE Babylon canvas. The requested subject is ONLY the glowing energy sphere.
const cv=document.getElementById('renderCanvas'),stat=document.getElementById('status');
const ids=['core-mode','core-radius','core-power','core-speed','strands','complexity','quality'];
const ctl=Object.fromEntries(ids.map(x=>[x,document.getElementById(x)]));
const defaults=Object.fromEntries(ids.map(x=>[x,ctl[x].value]));
const get=x=>+ctl[x].value,T=2*Math.PI,v=(x,y,z)=>new Vector3(x,y,z);
const q=new URLSearchParams(location.search),n=Number(q.get('labFrame'));
const fixed=q.has('labFrame')&&Number.isFinite(n)&&n>=0&&n<=60?n:null;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let engine,scene,glow,core,halo,coreMat,haloMat,threads=[],lines=[],inner=[],innerSheaths=[],stars=[],bridges=[],bridgeVeils=[],energyNodes=[],plasma=null,forks=null,plasmaField=null,time=0,last=0;
function light(name,color,a=1){
 const m=new StandardMaterial(name,scene);m.disableLighting=true;m.emissiveColor=color;m.diffuseColor=Color3.Black();m.alpha=a;
 m.backFaceCulling=false;if(a<1)m.disableDepthWrite=true;return m;
}
function pathOuter(i,t,w){
 const pts=[],rot=Matrix.RotationYawPitchRoll(i*2.39996,i*.42,i*.08);
 for(let j=0;j<=112;j++){
  const a=T*j/112,r=1.58+(.04+.11*w)*Math.sin(a*3+t*.29+i*.8)+.05*Math.sin(a*7-t*.2+i);
  pts.push(Vector3.TransformCoordinates(v(r*Math.cos(a),r*Math.sin(a),.17*Math.sin(a*2+t*.35+i)+.07*Math.cos(a*5+i)),rot));
 }return pts;
}
function pathMeridian(i,t,w){
 const pts=[],a0=i*T/14;
 for(let j=0;j<=100;j++){
  const a=T*j/100,p=a0+.18*w*Math.sin(a*3+t*.17+i),r=1.56+.04*Math.sin(a*7+t*.22+i);
  pts.push(v(r*Math.sin(a)*Math.cos(p),r*Math.cos(a),r*Math.sin(a)*Math.sin(p)));
 }return pts;
}
// R200: volumetric, open plasma paths. Geometry is pure and separately tested.
function pathCore(i,mode,t){
 return sampleCoreVolume(i,mode,t,coreDirections).map(p=>v(p[0],p[1],p[2]));
}
// Six localized bright knots and curved 3D connections, from the supplied reference.
const nodeDirections=[
 v(-.54,.71,.46),v(.70,.58,.38),v(-.73,-.32,.47),
 v(.70,-.55,.29),v(-.02,-.92,.40),v(.32,.89,-.38)
].map(dir=>dir.normalize());
const coreDirections=nodeDirections.map(d=>[d.x,d.y,d.z]);
// R201: open, continuous 3D connection from the violet heart to each of six shell nodes.
function pathBridge(i,t){
 return sampleCoreShellFlow(i,t,coreDirections).map(p=>v(p[0],p[1],p[2]));
}
function wire(id,path,r,mat){const m=MeshBuilder.CreateTube(id,{path,radius:r,tessellation:6,updatable:true},scene);m.material=mat;m.isPickable=false;return m;}
function refresh(m,path,r){MeshBuilder.CreateTube(null,{path,radius:r,tessellation:6,instance:m},scene);}
function budget(){
 if(!engine)return;const quality=ctl.quality.value;
 engine.setHardwareScalingLevel(quality==='economy'?1.65:quality==='ultra'?1:1.18);
 glow.intensity=quality==='economy'?.33:quality==='ultra'?.72:.49;
 document.getElementById('quality-label').textContent=quality.toUpperCase();
}
function start(){
 engine=new Engine(cv,true,{antialias:true,preserveDrawingBuffer:true});
 scene=new Scene(engine);scene.clearColor=new Color4(.006,.014,.04,1);
 const camera=new ArcRotateCamera('orbit',-.38,1.2,4.8,v(0,0,0),scene);camera.attachControl(cv,true);
 camera.lowerRadiusLimit=2.8;camera.upperRadiusLimit=7;camera.wheelPrecision=48;
 const lightCore=new PointLight('core light',v(0,0,0),scene);lightCore.intensity=1.05;lightCore.range=6;
 glow=new GlowLayer('glow',scene,{blurKernelSize:64,mainTextureRatio:.5});
 // Owner's Studio colors: violet, cyan, dark blue, green; one immutable art contract.
 const palette=SPHERE_REFERENCE.colors.map(c=>light('energy-'+c.id,new Color3(...c.linear)));
 coreMat=light('white-violet energetic focal point',new Color3(.93,.72,1.16));
 haloMat=light('diffuse violet energy aura',new Color3(.40,.30,.76),.070);
 core=MeshBuilder.CreateIcoSphere('central nucleus',{radius:.19,subdivisions:4},scene);core.material=coreMat;
 halo=MeshBuilder.CreateSphere('halo',{diameter:.90,segments:32},scene);halo.material=haloMat;
 // Minimal structural outlines remain; soft volumetric ribbons replace most of the wire cage.
 // R196: eliminate legacy rigid structural loops; organic plasma ribbon meshes remain the sole envelope.
 // No meridian ring meshes: profile quality still controls 3D plasma density.
 for(let i=0;i<18;i++){
  const tint=new Color3(...SPHERE_REFERENCE.colors[(i+1)%4].linear).scale(.54);
  inner.push(wire('radial plasma tendril '+i,pathCore(i,0,0),coreVolumeWidth(i,.5,'balanced'),palette[(i+1)%4]));
  // Wider transparent sheaths follow the exact same 3D centerlines.
  innerSheaths.push(wire('core plasma diffusion '+i,pathCore(i,0,0),coreMistWidth(i,.5,'balanced'),light('core plasma haze '+i,tint,.10)));
 }
 for(let i=0;i<48;i++){const m=MeshBuilder.CreateSphere('spark '+i,{diameter:i%6===0?.025:.012,segments:4},scene);m.material=palette[i%4];stars.push(m);}
 for(let i=0;i<SPHERE_REFERENCE.energyNodes;i++){
  bridges.push(wire('heart-to-node-flux-'+i,pathBridge(i,0),.0065,palette[i%4]));
  // R201: diffuse translucent body around the existing connection, same scene and six nodes.
  const veilColor=new Color3(...SPHERE_REFERENCE.colors[i%4].linear).scale(.65);
  bridgeVeils.push(wire('core-shell soft aura '+i,pathBridge(i,0),.023,light('core-shell translucent plasma '+i,veilColor,.16)));
  const node=MeshBuilder.CreateSphere('energy-intersection-'+i,{diameter:.078,segments:12},scene);
  node.material=palette[i%4];node.position.copyFrom(nodeDirections[i].scale(1.53));energyNodes.push(node);
 }
 // The Labo exclusively owns the sphere; Atlas owns only the target CORE_SOCKET.
 const sphereRoot=new TransformNode('LAB_SPHERE_ROOT',scene);
 for(const mesh of [core,halo,...threads,...lines,...inner,...innerSheaths,...stars,...bridges,...bridgeVeils,...energyNodes])mesh.parent=sphereRoot;
 // R202: volumetric procedural plasma is parented to the same Babylon sphere, no second scene.
 plasmaField=installPlasmaField({scene,parent:sphereRoot});
 plasma=installPlasmaRibbons({scene,colors:SPHERE_REFERENCE.colors.map(x=>new Color3(...x.linear)),nodes:nodeDirections,count:28,bridgePath:pathBridge});
 for(const mesh of [...plasma.meshes,...plasma.sheaths,...plasma.nodeMeshes])mesh.parent=sphereRoot;
 forks=installNodeForks({scene,directions:nodeDirections,ribbonMaterials:plasma.materials,photonMaterials:palette,parent:sphereRoot});
 const atlasFixture=new URLSearchParams(location.search).get('atlasSocketFixture')==='1';
 // Local test fixture only. A real Atlas decor supplies its socket via its GLB.
 if(atlasFixture)new TransformNode('CORE_SOCKET',scene);
 const atlasMount=mountCoreAtAtlasSocket(scene,sphereRoot,{required:atlasFixture});
 cv.dataset.atlasSocket=atlasMount.mode;
 globalThis.__synestraLabAtlasInterop={getScene:()=>scene,getSphereRoot:()=>sphereRoot,connect:()=>mountCoreAtAtlasSocket(scene,sphereRoot,{required:true}),getEngine:()=>engine};
 budget();cv.dataset.engine='babylon';cv.dataset.sphereReady='true';cv.dataset.artReference=SPHERE_REFERENCE.id;cv.dataset.palette=SPHERE_REFERENCE.colors.map(c=>c.id).join(',');cv.dataset.energyNodes=String(SPHERE_REFERENCE.energyNodes);cv.dataset.canvasCount=String(document.querySelectorAll('canvas').length);cv.dataset.plasmaVersion='glow-sheaths-r194';cv.dataset.plasmaRibbons=String(plasma.meshes.length);cv.dataset.nodePlasma=String(plasma.nodeMeshes.length);cv.dataset.glowSheaths=String(plasma.sheaths.length);cv.dataset.nodeForks=String(forks.meshes.length);cv.dataset.nodePhotons=String(forks.photons.length);cv.dataset.plasmaVersion='core-shell-fusion-r201';cv.dataset.coreGeometry='volumetric-core-shell-r201';cv.dataset.coreShellSheaths=String(bridgeVeils.length);cv.dataset.coreMistTotal=String(innerSheaths.length);cv.dataset.plasmaField='r202-plasma-field';cv.dataset.plasmaFieldLayers=String(plasmaField.meshes.length);
 document.getElementById('engine-label').textContent='BABYLON.JS / WEBGL '+engine.webGLVersion;
 stat.textContent='Sphère énergétique prête';
 engine.runRenderLoop(()=>{
  const now=performance.now();
  if(fixed!==null)time=fixed;else if(!reduced.matches&&last)time+=Math.min(.1,(now-last)/1000)*get('core-speed')/100;
  last=now;
  const quality=ctl.quality.value,turb=get('complexity')/100,amount=get('strands')*2;
  plasma.update({time,quality,parent:sphereRoot,active:Math.min(plasma.meshes.length,amount+5),corePower:get('core-power')});
  forks.update({time,quality,corePower:get('core-power'),parent:sphereRoot});
  cv.dataset.visibleNodeForks=String(forks.meshes.filter(m=>m.isEnabled()).length);
  cv.dataset.visibleNodePhotons=String(forks.photons.filter(m=>m.isEnabled()).length);
  cv.dataset.visibleRibbons=String(plasma.meshes.filter(m=>m.isEnabled()).length);cv.dataset.visibleSheaths=String(plasma.sheaths.filter(m=>m.isEnabled()).length);
  for(let i=0;i<threads.length;i++){
   const m=threads[i],visible=i<Math.min(2,amount)&&(quality!=='economy'||i<1);m.setEnabled(visible);
   if(visible)refresh(m,pathOuter(i,time,turb),i%4===0?.012:.007);
  }
  for(let i=0;i<lines.length;i++){
   const m=lines[i],visible=i===0&&(quality!=='economy');m.setEnabled(visible);if(visible)refresh(m,pathMeridian(i,time,turb),.003);
  }
  const r=get('core-radius')/100,power=get('core-power')/100,mode=get('core-mode');
  core.scaling.setAll(Math.max(.0001,r));halo.scaling.setAll(Math.max(.0001,r));
  coreMat.emissiveColor=new Color3(.62,.44,1.02).scale(Math.min(power,1.10));haloMat.alpha=power>0?.12*Math.min(power,1):0;
  plasmaField.update({time,quality,power,radius:r,cameraPosition:camera.position});
  const mistBudget=visibleCoreMistCount(quality,power);
  for(let i=0;i<inner.length;i++){
   const m=inner[i],visible=power>0&&(mode!==0||i<16);
   const mist=innerSheaths[i],mistVisible=visible&&i<mistBudget;
   m.setEnabled(visible);mist.setEnabled(mistVisible);
   if(visible){
    const path=pathCore(i,mode,time).map(p=>p.scale(r));
    refresh(m,path,coreVolumeWidth(i,.5,quality));
    if(mistVisible){
     mist.material.alpha=Math.min(.16,.065+.075*power);
     refresh(mist,path,coreMistWidth(i,.5,quality));
    }
   }
  }
  for(let i=0;i<bridges.length;i++){
   const m=bridges[i],visible=power>0&&(quality!=='economy'||i<3);
   m.setEnabled(visible);energyNodes[i].setEnabled(visible);
   // Always clear stale translucent geometry, including power-zero and budget changes.
   const aura=bridgeVeils[i],veilCount=visibleCoreShellVeils(quality,power);
   const auraVisible=visible&&i<veilCount;
   aura.setEnabled(auraVisible);
   if(visible){
    const bridgePath=pathBridge(i,time);
    refresh(m,bridgePath,.0065);
    if(auraVisible){aura.material.alpha=Math.min(.22,.11+.06*power);refresh(aura,bridgePath,coreShellVeilRadius(i,quality));}
    energyNodes[i].scaling.setAll(.90+.13*Math.sin(time*1.8+i));
   }
  }
  for(let i=0;i<stars.length;i++){
   const m=stars[i];m.setEnabled(quality!=='economy'&&(quality==='ultra'||i<22));
   const a=i*2.39996+time*.12,z=(i%17)/16*2-1,rad=Math.sqrt(Math.max(.01,1-z*z))*(1.42+.08*Math.sin(time+i));
   m.position.set(rad*Math.cos(a),1.56*z,rad*Math.sin(a));
  }
  core.rotation.y=time*.18;scene.render();
  cv.dataset.visibleCoreShellSheaths=String(bridgeVeils.filter(m=>m.isEnabled()).length);cv.dataset.visibleCoreMist=String(innerSheaths.filter(m=>m.isEnabled()).length);cv.dataset.visiblePlasmaField=String(plasmaField.meshes.filter(m=>m.isEnabled()).length);
  cv.dataset.mode=String(mode);cv.dataset.activeFilaments=String(threads.filter(x=>x.isEnabled()).length+lines.filter(x=>x.isEnabled()).length);
  cv.dataset.fps=String(Math.round(engine.getFps()));
 });
 addEventListener('resize',()=>engine.resize());
}
function sync(){
 for(const [key,id] of [['core-radius','radius-v'],['core-power','power-v'],['core-speed','speed-v'],['strands','strands-v'],['complexity','complexity-v']])
  document.getElementById(id).textContent=ctl[key].value+(key==='strands'?'':' %');
 budget();
}
Object.values(ctl).forEach(x=>x.addEventListener('input',sync));
document.getElementById('reset').addEventListener('click',()=>{for(const [k,value] of Object.entries(defaults))ctl[k].value=value;sync();});
document.getElementById('export').addEventListener('click',()=>{
 const settings=Object.fromEntries(Object.entries(ctl).map(([k,v])=>[k,v.value]));
 const blob=new Blob([JSON.stringify({schema:'synestra.lab.babylon-sphere.v1',settings},null,2)],{type:'application/json'});
 const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='sphere-r202.json';a.click();
 setTimeout(()=>URL.revokeObjectURL(a.href),500);
});
try{start();sync();}catch(e){cv.dataset.sphereReady='false';stat.textContent='Moteur indisponible';console.error('BABYLON_SPHERE_ERROR',e);}
