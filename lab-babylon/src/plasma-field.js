/** Original R202 Babylon procedural energy field: no imported artwork or external textures.
 * Two translucent layers in balanced mode; third only for ultra.
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
 float flow=sin(p.x*8.0+p.y*5.0+t*.47+uLayer*1.7)
           *cos(p.z*9.0-p.y*4.0-t*.33);
 float eddy=sin(p.x*15.0+p.z*11.0-t*.68+flow*2.0)
           *sin(p.y*13.0-p.z*7.0+t*.57);
 float plasma=pow(clamp(.54+.37*flow+.26*eddy,0.0,1.0),2.4);
 float fresnel=pow(1.0-abs(dot(normalize(vNormal),normalize(uCamera-vWorld))),1.7);
 float haze=.24+.42*plasma+.33*fresnel;
 float arcs=pow(max(0.0,eddy*.5+.5),5.0);
 float alpha=clamp(uOpacity*haze*(.69+.38*arcs),0.0,.33);
 vec3 violet=vec3(.57,.17,1.0);
 vec3 bright=vec3(1.0,.35,.94);
 vec3 cyan=vec3(.09,.54,.83);
 vec3 color=mix(violet,bright,plasma*.68+arcs*.16);
 color=mix(color,cyan,clamp(.10+.12*flow,0.0,.22));
 color*=.75+.48*plasma+.20*fresnel;
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
