import {Engine,Scene,ArcRotateCamera,Vector3,Color3,Color4,Matrix,MeshBuilder,StandardMaterial,GlowLayer,PointLight,TransformNode} from '@babylonjs/core';
import {SPHERE_REFERENCE} from './reference-contract.js';
import {installPlasmaRibbons} from './plasma-ribbons.js';
import {mountCoreAtAtlasSocket} from './atlas-interop.js';
// ONE Babylon canvas. The requested subject is ONLY the glowing energy sphere.
const cv=document.getElementById('renderCanvas'),stat=document.getElementById('status');
const ids=['core-mode','core-radius','core-power','core-speed','strands','complexity','quality'];
const ctl=Object.fromEntries(ids.map(x=>[x,document.getElementById(x)]));
const defaults=Object.fromEntries(ids.map(x=>[x,ctl[x].value]));
const get=x=>+ctl[x].value,T=2*Math.PI,v=(x,y,z)=>new Vector3(x,y,z);
const q=new URLSearchParams(location.search),n=Number(q.get('labFrame'));
const fixed=q.has('labFrame')&&Number.isFinite(n)&&n>=0&&n<=60?n:null;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let engine,scene,glow,core,halo,coreMat,haloMat,threads=[],lines=[],inner=[],stars=[],bridges=[],energyNodes=[],plasma=null,time=0,last=0;
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
function pathCore(i,mode,t){
 const pts=[],ph=i*T/9;
 for(let j=0;j<=90;j++){
  const a=T*j/90;let theta,r,y;
  if(mode===1){theta=a*2.6+ph+t*1.3;r=.2+.15*Math.sin(a*.5+i);y=.29*Math.cos(a+ph+t*.4);}
  else if(mode===2){theta=a*2.2+ph+t*.7;r=.20+.1*Math.sin(a*5-t+i);y=.23*Math.sin(a*2+ph);}
  else if(mode===3){theta=a+ph;r=.25+.055*(i%4)+.05*Math.sin(t*2+i);y=.09*Math.sin(a*3+ph);}
  else{theta=a+ph;r=.30+.035*Math.sin(a*4+t+i);y=.1*Math.sin(a*2+ph);}
  pts.push(v(r*Math.cos(theta),y,r*Math.sin(theta)));
 }return pts;
}
// Six localized bright knots and curved 3D connections, from the supplied reference.
const nodeDirections=[
 v(-.54,.71,.46),v(.70,.58,.38),v(-.73,-.32,.47),
 v(.70,-.55,.29),v(-.02,-.92,.40),v(.32,.89,-.38)
].map(dir=>dir.normalize());
function pathBridge(i,t){
 const dir=nodeDirections[i],tangent=Vector3.Cross(dir,v(0,1,0)).normalize();
 const side=Vector3.Cross(dir,tangent).normalize(),points=[];
 for(let k=0;k<=72;k++){
  const u=k/72,dist=.23+u*1.30,weight=Math.sin(Math.PI*u);
  const curl=.17*weight*Math.sin(u*10.5+t*.74+i*2.2);
  const cross=.12*weight*Math.cos(u*13.3-t*.45+i);
  points.push(dir.scale(dist).add(tangent.scale(curl)).add(side.scale(cross)));
 }
 return points;
}
function wire(id,path,r,mat){const m=MeshBuilder.CreateTube(id,{path,radius:r,tessellation:6,updatable:true},scene);m.material=mat;m.isPickable=false;return m;}
function refresh(m,path,r){MeshBuilder.CreateTube(null,{path,radius:r,tessellation:6,instance:m},scene);}
function budget(){
 if(!engine)return;const quality=ctl.quality.value;
 engine.setHardwareScalingLevel(quality==='economy'?1.65:quality==='ultra'?1:1.18);
 glow.intensity=quality==='economy'?.36:quality==='ultra'?.78:.55;
 document.getElementById('quality-label').textContent=quality.toUpperCase();
}
function start(){
 engine=new Engine(cv,true,{antialias:true,preserveDrawingBuffer:true});
 scene=new Scene(engine);scene.clearColor=new Color4(.006,.014,.04,1);
 const camera=new ArcRotateCamera('orbit',-.38,1.2,4.8,v(0,0,0),scene);camera.attachControl(cv,true);
 camera.lowerRadiusLimit=2.8;camera.upperRadiusLimit=7;camera.wheelPrecision=48;
 const lightCore=new PointLight('core light',v(0,0,0),scene);lightCore.intensity=2.4;lightCore.range=6;
 glow=new GlowLayer('glow',scene,{blurKernelSize:64,mainTextureRatio:.5});
 // Owner's Studio colors: violet, cyan, dark blue, green; one immutable art contract.
 const palette=SPHERE_REFERENCE.colors.map(c=>light('energy-'+c.id,new Color3(...c.linear)));
 coreMat=light('white central nucleus',new Color3(2.05,2.14,2.35));
 haloMat=light('core bloom',new Color3(.57,.59,1.0),.13);
 core=MeshBuilder.CreateIcoSphere('central nucleus',{radius:.20,subdivisions:4},scene);core.material=coreMat;
 halo=MeshBuilder.CreateSphere('halo',{diameter:.62,segments:32},scene);halo.material=haloMat;
 // Minimal structural outlines remain; soft volumetric ribbons replace most of the wire cage.
 for(let i=0;i<12;i++)threads.push(wire('subtle structural filament '+i,pathOuter(i,0,.5),i%4===0?.006:.0035,palette[i%4]));
 for(let i=0;i<4;i++)lines.push(wire('sparse meridian '+i,pathMeridian(i,0,.5),.003,palette[(i+1)%4]));
 for(let i=0;i<18;i++)inner.push(wire('core stream '+i,pathCore(i,0,0),i%3===0?.009:.006,palette[(i+1)%4]));
 for(let i=0;i<48;i++){const m=MeshBuilder.CreateSphere('spark '+i,{diameter:i%6===0?.025:.012,segments:4},scene);m.material=palette[i%4];stars.push(m);}
 for(let i=0;i<SPHERE_REFERENCE.energyNodes;i++){
  bridges.push(wire('heart-to-node-flux-'+i,pathBridge(i,0),.0055,palette[i%4]));
  const node=MeshBuilder.CreateSphere('energy-intersection-'+i,{diameter:.105,segments:12},scene);
  node.material=palette[i%4];node.position.copyFrom(nodeDirections[i].scale(1.53));energyNodes.push(node);
 }
 // The Labo exclusively owns the sphere; Atlas owns only the target CORE_SOCKET.
 const sphereRoot=new TransformNode('LAB_SPHERE_ROOT',scene);
 for(const mesh of [core,halo,...threads,...lines,...inner,...stars,...bridges,...energyNodes])mesh.parent=sphereRoot;
 plasma=installPlasmaRibbons({scene,colors:SPHERE_REFERENCE.colors.map(x=>new Color3(...x.linear)),nodes:nodeDirections,count:28,bridgePath:pathBridge});
 for(const mesh of [...plasma.meshes,...plasma.nodeMeshes])mesh.parent=sphereRoot;
 const atlasFixture=new URLSearchParams(location.search).get('atlasSocketFixture')==='1';
 // Local test fixture only. A real Atlas decor supplies its socket via its GLB.
 if(atlasFixture)new TransformNode('CORE_SOCKET',scene);
 const atlasMount=mountCoreAtAtlasSocket(scene,sphereRoot,{required:atlasFixture});
 cv.dataset.atlasSocket=atlasMount.mode;
 globalThis.__synestraLabAtlasInterop={getScene:()=>scene,getSphereRoot:()=>sphereRoot,connect:()=>mountCoreAtAtlasSocket(scene,sphereRoot,{required:true}),getEngine:()=>engine};
 budget();cv.dataset.engine='babylon';cv.dataset.sphereReady='true';cv.dataset.artReference=SPHERE_REFERENCE.id;cv.dataset.palette=SPHERE_REFERENCE.colors.map(c=>c.id).join(',');cv.dataset.energyNodes=String(SPHERE_REFERENCE.energyNodes);cv.dataset.canvasCount=String(document.querySelectorAll('canvas').length);cv.dataset.plasmaVersion='plasma-light-r193';cv.dataset.plasmaRibbons=String(plasma.meshes.length);cv.dataset.nodePlasma=String(plasma.nodeMeshes.length);
 document.getElementById('engine-label').textContent='BABYLON.JS / WEBGL '+engine.webGLVersion;
 stat.textContent='Sphère énergétique prête';
 engine.runRenderLoop(()=>{
  const now=performance.now();
  if(fixed!==null)time=fixed;else if(!reduced.matches&&last)time+=Math.min(.1,(now-last)/1000)*get('core-speed')/100;
  last=now;
  const quality=ctl.quality.value,turb=get('complexity')/100,amount=get('strands')*2;
  plasma.update({time,quality,parent:sphereRoot,active:Math.min(plasma.meshes.length,amount+5),corePower:get('core-power')});
  cv.dataset.visibleRibbons=String(plasma.meshes.filter(m=>m.isEnabled()).length);
  for(let i=0;i<threads.length;i++){
   const m=threads[i],visible=i<Math.min(2,amount)&&(quality!=='economy'||i<1);m.setEnabled(visible);
   if(visible)refresh(m,pathOuter(i,time,turb),i%4===0?.012:.007);
  }
  for(let i=0;i<lines.length;i++){
   const m=lines[i],visible=i===0&&(quality!=='economy');m.setEnabled(visible);if(visible)refresh(m,pathMeridian(i,time,turb),.003);
  }
  const r=get('core-radius')/100,power=get('core-power')/100,mode=get('core-mode');
  core.scaling.setAll(Math.max(.0001,r));halo.scaling.setAll(Math.max(.0001,r));
  coreMat.emissiveColor=new Color3(1.6,1.68,2.03).scale(power);haloMat.alpha=power>0?.13:0;
  for(let i=0;i<inner.length;i++){
   const m=inner[i],visible=power>0&&(mode!==0||i<8);m.setEnabled(visible);
   if(visible)refresh(m,pathCore(i,mode,time).map(p=>p.scale(r)),i%3===0?.009:.006);
  }
  for(let i=0;i<bridges.length;i++){
   const m=bridges[i],visible=power>0&&(quality!=='economy'||i<3);
   m.setEnabled(visible);energyNodes[i].setEnabled(visible);
   if(visible){
    refresh(m,pathBridge(i,time),.0055);
    energyNodes[i].scaling.setAll(.90+.13*Math.sin(time*1.8+i));
   }
  }
  for(let i=0;i<stars.length;i++){
   const m=stars[i];m.setEnabled(quality!=='economy'&&(quality==='ultra'||i<22));
   const a=i*2.39996+time*.12,z=(i%17)/16*2-1,rad=Math.sqrt(Math.max(.01,1-z*z))*(1.42+.08*Math.sin(time+i));
   m.position.set(rad*Math.cos(a),1.56*z,rad*Math.sin(a));
  }
  core.rotation.y=time*.18;scene.render();
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
 const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='sphere-r193.json';a.click();
 setTimeout(()=>URL.revokeObjectURL(a.href),500);
});
try{start();sync();}catch(e){cv.dataset.sphereReady='false';stat.textContent='Moteur indisponible';console.error('BABYLON_SPHERE_ERROR',e);}
