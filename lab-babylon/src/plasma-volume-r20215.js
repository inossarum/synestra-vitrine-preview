/** R202-15 isolated integration candidate: reuse existing Babylon Engine/Scene/Canvas and Atlas root. */
import {MeshBuilder,ShaderMaterial,Engine,Matrix,Vector3} from '@babylonjs/core';
import {r20215VolumePolicy} from './plasma-volume-policy.mjs';

const vertexSource = `precision highp float;
attribute vec3 position; attribute vec3 normal;
uniform mat4 world; uniform mat4 worldViewProjection;
uniform float uTime; uniform float uLayer;
varying vec3 vLocal; varying vec3 vNormal; varying vec3 vWorld;
void main(){
 // Time-dependent surface warping breaks the perfectly circular glass silhouette.
 vec3 unit=normalize(position);
 float fold=sin(unit.x*8.7+unit.y*6.1+uTime*.31+uLayer)
           *cos(unit.z*9.0-uTime*.27);
 vec3 displaced=position+normal*(.008+.032*fold);
 vLocal=displaced;
 vNormal=normalize(mat3(world)*normal);
 vWorld=(world*vec4(displaced,1.0)).xyz;
 gl_Position=worldViewProjection*vec4(displaced,1.0);
}`;
const fragmentSource = `precision highp float;
varying vec3 vLocal; varying vec3 vNormal; varying vec3 vWorld;
uniform float uTime; uniform float uOpacity; uniform float uLayer;
uniform vec3 uCamera;
uniform vec3 uCameraLocal;uniform float uLayerRadius;uniform int uSteps;
uniform float uCorePower;
void main(){
 if(!gl_FrontFacing) discard;
 // Bounded, shader-only 16-step volume integration inside the existing sphere.
 vec3 ro=uCameraLocal/max(uLayerRadius,0.0001);
 vec3 rd=normalize(vLocal/max(uLayerRadius,0.0001)-ro);
 float b=dot(ro,rd);
 float d=b*b-(dot(ro,ro)-1.0);
 if(d<=0.0)discard;
 float nearT=max(0.0,-b-sqrt(d));
 float farT=-b+sqrt(d);
 float thickness=farT-nearT;
 // Analytic Gaussian core path; center power is independent of noise phase.
 float coreClosestT=clamp(-dot(ro,rd),nearT,farT);
 vec3 coreImpact=ro+rd*coreClosestT;
 float coreImpactSquared=dot(coreImpact,coreImpact);
 float coreHalfLength=max(0.0,coreClosestT-nearT);
 float coreForegroundT=1.0;
 float a=0.0;
 vec3 energy=vec3(0.0);
 for(int i=0;i<16;i++){
  if(i>=uSteps)break;
  float t=nearT+thickness*(float(i)+0.5)/float(uSteps);
  vec3 q=ro+rd*t;
  float radius=length(q);
  vec3 swirl=q+0.14*vec3(sin(q.y*8.0+uTime*0.4),sin(q.z*7.3-uTime*.3),cos(q.x*8.2+uTime*.26));
  float wave=sin(swirl.x*7.1+swirl.y*4.3+uTime*.5+1.1*sin(swirl.z*6.2-uTime*.21));
  float fold=cos(swirl.z*10.8-swirl.y*6.1-uTime*.35+1.5*wave);
  float n=clamp(.52+.31*wave+.24*fold,0.0,1.0);
  float vortex=pow(smoothstep(.32,.94,n),2.3);
  float smoke=pow(smoothstep(.25,.78,n),2.1);
  float envelope=1.0-smoothstep(.68,1.01,radius);
  float sparkle=pow(smoothstep(.64,.95,n),4.5);
  float localDensity=(.11+1.48*smoke+1.26*sparkle)*envelope;
  float da=clamp(uOpacity*localDensity*thickness/float(uSteps)*2.4,0.0,.16);
  float coreStepLength=thickness/float(uSteps);
  float coreNearFraction=clamp((coreClosestT-(t-0.5*coreStepLength))/coreStepLength,0.0,1.0);
  coreForegroundT*=pow(max(0.000001,1.0-da),coreNearFraction);
  vec3 violet=vec3(.45,.12,.99);
  vec3 pink=vec3(1.23,.36,1.44);
  vec3 white=vec3(1.35,1.14,1.70);
  vec3 color=mix(violet,pink,clamp(.15+.65*vortex,0.0,1.0));
  color=mix(color,white,clamp(.45*sparkle,0.0,.55));
  energy+=(1.0-a)*da*color;
  a+=(1.0-a)*da;
 }
 // R202.19: phase-stable white/violet emission, attenuated by foreground plasma.
 float coreExtinctionK=(uSteps<=8)?0.90:((uSteps<=12)?1.10:1.29);
 float coreSmoothT=exp(-0.76*coreExtinctionK*uOpacity*coreHalfLength);
 float coreTransmission=mix(coreSmoothT,coreForegroundT,0.25);
 float coreRayIntegral=0.4511930898*exp(-0.5*coreImpactSquared/(0.14*0.14));
 float coreRadiance=0.98*clamp(uCorePower,0.0,2.5)*coreRayIntegral*coreTransmission;
 energy+=coreRadiance*vec3(1.65,1.38,1.82);
 gl_FragColor=vec4(energy/max(a,.0001),clamp(a,0.0,.78));
}
`;

export function installR20215Volume({scene,parent}){
 if(!scene||typeof scene.getEngine!=='function'||!parent)
  throw new TypeError('R20215_VOLUME_SCENE_PARENT_MISSING');
 const material=new ShaderMaterial('r20215-raymarch-violet',scene,{vertexSource,fragmentSource},{
  attributes:['position','normal'],
  uniforms:['world','worldViewProjection','uTime','uOpacity','uLayer','uCamera','uCameraLocal','uLayerRadius','uSteps','uCorePower'],
  needAlphaBlending:true
 });
 material.backFaceCulling=true;
 material.alphaMode=Engine.ALPHA_COMBINE;
 material.disableDepthWrite=true;
 material.setFloat('uLayer',1);
 material.setFloat('uTime',0);
 material.setFloat('uOpacity',0);
 material.setFloat('uCorePower',0);
 material.setFloat('uLayerRadius',1.45);
 material.setInt('uSteps',12);
 const mesh=MeshBuilder.CreateSphere('r20215-volume-carrier',{diameter:2*1.45,segments:28},scene);
 mesh.material=material;mesh.parent=parent;mesh.isPickable=false;mesh.setEnabled(false);
 const inverseWorld=Matrix.Identity(),localCamera=Vector3.Zero(),fallbackCamera=new Vector3(0,0,4.8);
 return {
  meshes:[mesh],
  update({time,quality,power,radius=1,cameraPosition}){
   if(!Number.isFinite(time)||time<0)throw new RangeError('R20215_VOLUME_TIME_INVALID');
   const profile=r20215VolumePolicy(quality,power,radius);
   mesh.setEnabled(profile.visible);
   if(!profile.visible)return;
   mesh.scaling.setAll(Math.max(.0001,radius));
   // Essential for Atlas CORE_SOCKET: convert WORLD-space orbital camera to mesh local space.
   mesh.computeWorldMatrix(true);
   inverseWorld.copyFrom(mesh.getWorldMatrix()).invert();
   Vector3.TransformCoordinatesToRef(cameraPosition||fallbackCamera,inverseWorld,localCamera);
   material.setVector3('uCamera',cameraPosition||fallbackCamera);
   material.setVector3('uCameraLocal',localCamera);
   material.setFloat('uLayerRadius',1.45);
   material.setInt('uSteps',profile.steps);
   material.setFloat('uOpacity',profile.opacity);
   material.setFloat('uCorePower',power);
   material.setFloat('uTime',time);
  },
  dispose(){mesh.dispose();material.dispose();}
 };
}
