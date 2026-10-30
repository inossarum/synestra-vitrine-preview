/** Original R202 Babylon procedural energy field: no imported artwork or external textures.
 * Balanced budget includes the near-core + outer plasma shell; ultra adds middle depth.
 * Caller owns the only Engine/Scene/Canvas and the update clock.
 */
import {MeshBuilder,ShaderMaterial,Engine,Color3,Vector3} from '@babylonjs/core';
import {PLASMA_FIELD_RADII,plasmaFieldBudget,plasmaFieldOpacity} from './plasma-field.mjs';

const vertexSource = `precision highp float;
attribute vec3 position; attribute vec3 normal;
uniform mat4 world; uniform mat4 worldViewProjection;
varying vec3 vLocal; varying vec3 vNormal; varying vec3 vWorld;
void main(){
 vLocal=position;
 vNormal=normalize(mat3(world)*normal);
 vWorld=(world*vec4(position,1.0)).xyz;
 gl_Position=worldViewProjection*vec4(position,1.0);
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
 float plasma=clamp(.56+.28*flow+.24*eddy,0.0,1.0);
 // A narrow electric crest flows across a broad, semi-transparent gas shell.
 float arc=pow(clamp(.5+.5*sin(p.y*19.0+p.x*14.0+flow*2.5-t*.72),0.0,1.0),10.0);
 float fresnel=pow(1.0-abs(dot(normalize(vNormal),normalize(uCamera-vWorld))),1.35);
 float density=.22+.51*plasma+.43*fresnel+.28*arc;
 float alpha=clamp(uOpacity*density,0.0,.39);
 vec3 violet=vec3(.55,.13,1.0);
 vec3 magenta=vec3(1.06,.32,1.12);
 vec3 cyan=vec3(.08,.51,.87);
 vec3 color=mix(violet,magenta,clamp(.18+.62*plasma+.18*arc,0.0,1.0));
 color=mix(color,cyan,clamp(.07+.08*eddy,0.0,.17));
 color*=.77+.46*plasma+.30*fresnel+.31*arc;
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
