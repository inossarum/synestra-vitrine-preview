/** Original R202 Babylon procedural energy field: no imported artwork or external textures.
 * Balanced budget includes the near-core + outer plasma shell; ultra adds middle depth.
 * Caller owns the only Engine/Scene/Canvas and the update clock.
 */
import {MeshBuilder,ShaderMaterial,Engine,Color3,Vector3} from '@babylonjs/core';
import {PLASMA_FIELD_RADII,plasmaFieldBudget,plasmaFieldOpacity} from './plasma-field.mjs';

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
void main(){
 vec3 p=normalize(vLocal);
 float t=uTime;
 // Coherent plasma currents, domain warped by independent angular motions.
 float flow=sin(p.x*9.0+p.y*5.3+t*.48+1.4*sin(p.z*6.0-t*.26)+uLayer*1.4);
 float eddy=sin(p.z*10.5-p.y*8.0-t*.43+flow*1.7)
           *cos(p.x*7.2+p.z*4.4+t*.38);
 float plasma=clamp(.52+.34*flow+.26*eddy,0.0,1.0);
 float arc=pow(clamp(.5+.5*sin(p.y*19.0+p.x*14.0+flow*2.5-t*.72),0.0,1.0),12.0);
 float fresnel=pow(1.0-abs(dot(normalize(vNormal),normalize(uCamera-vWorld))),1.65);
 float wisps=pow(smoothstep(.12,.95,plasma),2.2);
 float density=.025+.66*wisps+.66*arc+.09*fresnel;
 // Sparse living currents, not a full transparent plastic shell.
 float alpha=clamp(uOpacity*density,0.0,.30);
 vec3 violet=vec3(.47,.11,.96);
 vec3 magenta=vec3(1.07,.28,1.14);
 vec3 cyan=vec3(.08,.50,.85);
 vec3 color=mix(violet,magenta,clamp(.11+.70*plasma+.20*arc,0.0,1.0));
 color=mix(color,cyan,clamp(.05+.10*eddy,0.0,.16));
 color*=.84+.55*plasma+.20*fresnel+.46*arc;
 gl_FragColor=vec4(color,alpha);
}`;
export function installPlasmaField({scene,parent}){
 if(!scene||typeof scene.getEngine!=='function'||!parent)throw new TypeError('R202_PLASMA_FIELD_SCENE_OR_PARENT_MISSING');
 const layers=[];
 for(let i=0;i<PLASMA_FIELD_RADII.length;i++){
  const material=new ShaderMaterial('r202-plasma-volume-'+i,scene,{vertexSource,fragmentSource},{
   attributes:['position','normal'],uniforms:['world','worldViewProjection','uTime','uOpacity','uLayer','uCamera'],
   needAlphaBlending:true
  });
  material.backFaceCulling=false;
  material.alphaMode=Engine.ALPHA_COMBINE;
  material.disableDepthWrite=true;
  material.setFloat('uLayer',i);
  material.setFloat('uTime',0);
  material.setFloat('uOpacity',0);
  material.setVector3('uCamera',new Vector3(0,0,4.8));
  const mesh=MeshBuilder.CreateSphere('r202-plasma-layer-'+i,{diameter:2*PLASMA_FIELD_RADII[i],segments:i===2?20:28},scene);
  mesh.material=material;mesh.parent=parent;mesh.isPickable=false;
  mesh.setEnabled(false);
  layers.push({mesh,material});
 }
 return {
  meshes:layers.map(x=>x.mesh),
  update({time,quality,power,radius=1,cameraPosition}){
   if(!Number.isFinite(time)||!Number.isFinite(radius)||radius<0||radius>1.8)throw new RangeError('R202_FIELD_UPDATE_INVALID');
   const visible=plasmaFieldBudget(quality,power);
   for(let i=0;i<layers.length;i++){
    const {mesh,material}=layers[i],enabled=i<visible;
    mesh.setEnabled(enabled);
    if(!enabled)continue;
    mesh.scaling.setAll(Math.max(.0001,radius));
    material.setFloat('uTime',time);
    material.setFloat('uOpacity',plasmaFieldOpacity(i,power,quality));
    if(cameraPosition)material.setVector3('uCamera',cameraPosition);
   }
  },
  dispose(){for(const {mesh,material} of layers){mesh.dispose();material.dispose();}}
 };
}

/** View-angle-faded, animated white-violet heart; reuses the existing scene and render clock. */
export function createPlasmaHeartMaterial(scene){
 if(!scene||typeof scene.getEngine!=='function')throw new TypeError('R202_HEART_SCENE_MISSING');
 const vertexSource = `precision highp float;
 attribute vec3 position;attribute vec3 normal;
 uniform mat4 world;uniform mat4 worldViewProjection;
 varying vec3 vWorld;varying vec3 vNormal;
 void main(){vWorld=(world*vec4(position,1.0)).xyz;vNormal=normalize(mat3(world)*normal);gl_Position=worldViewProjection*vec4(position,1.0);}`;
 const fragmentSource = `precision highp float;
 varying vec3 vWorld;varying vec3 vNormal;
 uniform vec3 uCamera;uniform float uTime;uniform float uPower;
 void main(){
  float face=clamp(dot(normalize(vNormal),normalize(uCamera-vWorld)),0.0,1.0);
  float hotspot=pow(face,3.8);
  float shimmer=.96+.04*sin(uTime*2.7+vWorld.x*12.0+vWorld.z*8.0);
  vec3 tint=mix(vec3(.49,.24,.98),vec3(1.55,1.43,1.75),clamp(.13+1.05*hotspot,0.0,1.0));
  float energy=clamp(uPower,0.0,1.6);
  float alpha=clamp((.02+.43*pow(face,1.65)+.43*hotspot)*energy,0.0,.88);
  gl_FragColor=vec4(tint*(.96+.90*hotspot)*shimmer*energy,alpha);
 }`;
 const material=new ShaderMaterial('r202-white-violet-soft-heart',scene,{vertexSource,fragmentSource},{
   attributes:['position','normal'],
   uniforms:['world','worldViewProjection','uCamera','uTime','uPower'],
   needAlphaBlending:true
 });
 material.backFaceCulling=true;
 material.alphaMode=Engine.ALPHA_COMBINE;
 material.disableDepthWrite=true;
 material.setFloat('uTime',0);material.setFloat('uPower',1);
 material.setVector3('uCamera',new Vector3(0,0,4.8));
 return material;
}
