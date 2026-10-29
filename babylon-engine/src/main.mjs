import {Engine,Scene,ArcRotateCamera,Vector3,Color3,Color4,
  MeshBuilder,StandardMaterial,GlowLayer,TransformNode,PointLight,
  HemisphericLight} from '@babylonjs/core';

const canvas=document.querySelector('#sphere');
const state=document.querySelector('#status');
const params=new URLSearchParams(location.search);
const fixed=params.has('frame')&&Number.isFinite(Number(params.get('frame')))?Number(params.get('frame')):null;
const engine=new Engine(canvas,true,{preserveDrawingBuffer:true,stencil:false,antialias:true});
const scene=new Scene(engine);
scene.clearColor=new Color4(.006,.009,.027,1);
const camera=new ArcRotateCamera('orbit',-Math.PI/2,Math.PI/2.17,6.8,Vector3.Zero(),scene);
camera.attachControl(canvas,true);
camera.lowerRadiusLimit=3.5;camera.upperRadiusLimit=16;
camera.lowerBetaLimit=.18;camera.upperBetaLimit=Math.PI-.18;
camera.wheelPrecision=60;
new HemisphericLight('soft',new Vector3(0,1,0),scene).intensity=.12;
const heartLight=new PointLight('heartLight',Vector3.Zero(),scene);
heartLight.intensity=2.7;heartLight.diffuse=new Color3(.38,.94,1);heartLight.range=7;
const glow=new GlowLayer('radiance',scene,{mainTextureFixedSize:1024,blurKernelSize:96});
glow.intensity=.47;
const root=new TransformNode('sphere-energy-root',scene);
const make=(name,hex,alpha=1)=>{
 const m=new StandardMaterial(name,scene);
 m.diffuseColor=new Color3(.002,.004,.014);
 m.specularColor=new Color3(.12,.2,.3);
 m.emissiveColor=Color3.FromHexString(hex);
 m.disableLighting=true;m.alpha=alpha;m.backFaceCulling=false;
 return m;
};
const palette=[
 make('electric-cyan','#12B9D1',.74),
 make('electric-azure','#1761B8',.67),
 make('electric-violet','#8735D5',.76),
 make('pale-cyan','#66D2E8',.72),
 make('deep-purple','#6D238E',.67),
 make('mint','#36B7A7',.69)
];
const coreMaterial=make('core-white','#E2FAFF');
const core=MeshBuilder.CreateIcoSphere('radiant-core',{radius:.21,subdivisions:4},scene);
core.material=coreMaterial;core.parent=root;
const corona=MeshBuilder.CreateSphere('core-corona',{diameter:.63,segments:36},scene);
corona.parent=root;corona.material=make('corona-cyan','#6AB3F7',.085);
const coronaOuter=MeshBuilder.CreateSphere('secondary-corona',{diameter:.89,segments:26},scene);
coronaOuter.parent=root;coronaOuter.material=make('corona-violet','#9258DE',.035);
const shell=MeshBuilder.CreateSphere('shell-boundary',{diameter:3.48,segments:44},scene);
shell.parent=root;shell.material=make('boundary-translucent','#326FBD',.006);

function point(rad,lon,lat){
 return new Vector3(rad*Math.cos(lat)*Math.cos(lon),
   rad*Math.sin(lat),rad*Math.cos(lat)*Math.sin(lon));
}
const streams=[];
const number=Number(params.get('threads'));
const count=Number.isFinite(number)&&number>=12&&number<=130?Math.round(number):62;
for(let i=0;i<count;i++){
 const type=i%4;
 const path=[];
 const n=type===2?82:135;
 const phase=i*2.39996323;
 const handed=i%2?1:-1;
 for(let j=0;j<=n;j++){
  const t=j/n;
  let x;
  if(type===0){
   const a=phase+handed*Math.PI*2*t*(2+i%4);
   const b=1.17*Math.sin(Math.PI*2*t*(1+i%3)+phase)+.20*Math.cos(Math.PI*2*t*(2+i%2)-phase);
   const rad=1.50+.075*Math.sin(17*t+phase)+.043*Math.cos(29*t+phase*2);
   x=point(rad,a,b);
  }else if(type===1){
   const a=phase+handed*Math.PI*2*t*(1+i%3);
   const b=1.26*Math.sin(t*Math.PI*2*(2+i%3)+phase);
   const rad=1.58+.11*Math.cos(t*11+phase);
   x=point(rad,a,b);
  }else if(type===2){
   const a=phase+handed*Math.PI*2*t*1.7;
   const b=(t-.5)*2.35+.2*Math.sin(t*18+phase);
   const rad=.32+1.30*Math.pow(Math.sin(Math.PI*t),.68);
   x=point(rad,a,b);
  }else{
   const a=phase+handed*Math.PI*2*t*1.35;
   const b=1.29*Math.cos(t*Math.PI*2*1.5+phase);
   const rad=.40+1.16*t+.07*Math.sin(t*20+phase);
   x=point(rad,a,b);
  }
  // Distribute strand orbital planes across the sphere to avoid an equatorial belt.
  const orient=phase*.83,polar=Math.acos(1-2*(i+.5)/count);
  const axis=new Vector3(Math.sin(polar)*Math.cos(orient),Math.cos(polar),Math.sin(polar)*Math.sin(orient));
  const guide=Math.abs(axis.y)<.9?new Vector3(0,1,0):new Vector3(1,0,0);
  const u=Vector3.Cross(axis,guide).normalize();
  const v=Vector3.Cross(axis,u).normalize();
  path.push(u.scale(x.x).addInPlace(v.scale(x.y)).addInPlace(axis.scale(x.z)));
 }
 const radius=type===2?.0065:(i%7===0?.009:.004);
 const tube=MeshBuilder.CreateTube('energy-strand-'+i,{path,radius,tessellation:5,cap:0,
   sideOrientation:0,updatable:false},scene);
 tube.material=palette[(i*7+i%3)%palette.length];
 tube.parent=root;
 streams.push({path,mesh:tube,offset:(i*.618034)%1,speed:.08+.02*(i%5)});
}
const glints=[];
const glintMats=[make('spark-white','#D4FFFF'),make('spark-purple','#F5B5FF')];
for(let i=0;i<32;i++){
 const s=streams[(i*17)%streams.length];
 const spark=MeshBuilder.CreateSphere('travelling-photon-'+i,{diameter:i%4===0?.035:.016,segments:8},scene);
 spark.material=glintMats[i%2];spark.parent=root;
 glints.push({mesh:spark,stream:s,shift:i*.37,speed:.12+.04*(i%4)});
}
const drift=(a,b,t)=>a+(b-a)*t;
const at=(path,u)=>{
 const v=((u%1)+1)%1*(path.length-1),index=Math.floor(v);
 const p=path[index],q=path[Math.min(index+1,path.length-1)];
 return new Vector3(drift(p.x,q.x,v-index),drift(p.y,q.y,v-index),drift(p.z,q.z,v-index));
};
let clock=0,frame=0;
scene.onBeforeRenderObservable.add(()=>{
 if(fixed===null)clock+=Math.min(engine.getDeltaTime()/1000,.05);
 else clock=fixed;
 root.rotation.y=clock*.038;
 root.rotation.x=.09*Math.sin(clock*.21);
 core.scaling.setAll(1+.055*Math.sin(clock*2.4));
 corona.scaling.setAll(1+.065*Math.sin(clock*1.2));
 for(const p of glints)p.mesh.position.copyFrom(at(p.stream.path,p.shift+clock*p.speed));
 frame++;
});
engine.runRenderLoop(()=>scene.render());
const fit=()=>{engine.resize();camera.radius=innerWidth<=600?11.1:6.8;};
fit();addEventListener('resize',fit);
canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();state.textContent='GPU context lost';canvas.dataset.ready='lost';});
canvas.dataset.engine='babylonjs';
canvas.dataset.scope='sphere-only';
canvas.dataset.ready='true';
canvas.dataset.strands=String(count);
state.textContent='Babylon.js · sphere-only · '+count+' filaments';
globalThis.__labSphere={engine,scene,camera,root,streams,core,glints};
