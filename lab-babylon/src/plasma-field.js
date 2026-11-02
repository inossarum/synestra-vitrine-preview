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
 // R202.43: lower diffuse foreground haze while keeping bright moving plasma crests.
 float plasmaWispMask=.42+.58*smoothstep(.20,.85,density);
 alpha*=plasmaWispMask;
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
  // R202.21: illuminate the existing faceted central IcoSphere, not the outer volume.
  float hotspot=pow(face,2.25);
  // R202.22: each of the 80 flat-shaded triangles receives its own light level.
  float facetLight=clamp(.5+.5*dot(normalize(vNormal),normalize(vec3(-.42,.62,.85))),0.0,1.0);
  // R202.30: bounded face-normal contrast; no edge mesh, geometry or extra pass.
  float facetRelief=smoothstep(.20,.80,facetLight);
  float facetShading=mix(.72,1.23,facetRelief);
  // R202.44: raise contrast between existing per-face normals without new geometry.
  facetShading*=mix(.48,1.12,facetRelief);
  // R202.45: restore directional illumination only on front key-facing facets.
  float keyedHighlight=smoothstep(.22,.78,facetLight);
  facetShading*=1.0+.60*keyedHighlight;
   // R202.39: dark edge-to-face transition only; avoid modifying the 3D plasma cloud.
   float facetRim=pow(1.0-face,2.0);
   float facetContrast=1.0-.42*facetRim;
  // R202.31: face-normal crystal glint and shadow/ivory separation; no mesh or extra pass.
  vec3 facetKey=normalize(vec3(-.42,.62,.85));
  float facetGlint=pow(max(dot(reflect(-facetKey,normalize(vNormal)),normalize(uCamera-vWorld)),0.0),10.0);
  // R202.31: four bounded per-face key-light bands preserve distinct triangle planes.
  float facetStrata=floor(clamp(facetLight,0.0,.999)*4.0)/3.0;
  vec3 facetPalette=mix(vec3(.63,.58,.78),vec3(1.65,1.58,1.36),facetStrata);
  float shimmer=.97+.03*sin(uTime*2.7+vWorld.x*12.0+vWorld.z*8.0);
  vec3 tint=mix(vec3(.32,.18,.60),vec3(.98,.87,1.07),clamp(.12+.38*hotspot+.50*facetLight,0.0,1.0));
  float energy=clamp(uPower,0.0,1.6);
  // R202.25: analytic camera-to-facet path through the foreground plasma envelope.
  // The existing 80 triangles stay in their original rendering group; no extra pass/depth buffer.
  vec3 rayDir=normalize(vWorld-uCamera);
  float projection=dot(uCamera,rayDir);
  float discriminant=projection*projection-(dot(uCamera,uCamera)-1.05*1.05);
  float entryDistance=max(-projection-sqrt(max(discriminant,0.0)),0.0);
  float frontDepth=max(length(vWorld-uCamera)-entryDistance,0.0);
  // R202.26: sample the existing plasma's moving flow field along the actual
  // camera-to-facet front segment, rather than applying a nearly uniform veil.
  // Three fixed samples, no render pass and no change to the 80-facet topology.
  vec3 plasmaEntry=uCamera+rayDir*entryDistance;
  vec3 plasmaSegment=vWorld-plasmaEntry;
  float veil=0.0;
  for(int i=0;i<3;i++){
   vec3 samplePos=plasmaEntry+plasmaSegment*((float(i)+.5)/3.0);
   float flow=sin(samplePos.x*9.0+samplePos.y*5.3+uTime*.48
                  +1.4*sin(samplePos.z*6.0-uTime*.26));
   float eddy=sin(samplePos.z*10.5-samplePos.y*8.0-uTime*.43+flow*1.7)
              *cos(samplePos.x*7.2+samplePos.z*4.4+uTime*.38);
   float plasmaDensity=clamp(.52+.34*flow+.26*eddy,0.0,1.0);
   veil+=(.28+1.80*plasmaDensity*plasmaDensity)/3.0;
  }
  float depthTransmission=clamp(exp(-.70*frontDepth*veil),.63,1.0);
  // Preserve the R202.24 alpha ceiling; the foreground envelope can only attenuate it.
   // R202.33: face-aware incandescent white-violet focus, not another lamp or pass.
   float ignition=pow(face,2.6)*smoothstep(.20,1.20,energy);
   vec3 coreEmission=vec3(1.15,1.18,1.30)*(.52*ignition);
   // R202.44: shadowed facets must not glow as brightly as keyed facets.
   coreEmission*=mix(.22,1.12,facetRelief);
   // R202.43: localized faceted luminosity, power-off safe, no new mesh or light.
   float coreFocus=smoothstep(.30,.84,face)*smoothstep(.18,1.20,energy);
   vec3 facetLift=vec3(.70,.76,.94)*coreFocus*(.30+.70*facetStrata);
   facetLift*=mix(.28,1.08,facetRelief);
   float focalOpacity=clamp(.16*coreFocus,0.0,.16);
   float alpha=clamp((.20+.48*pow(face,1.1)+.12*hotspot)*energy,0.0,.79);
   // Preserve original R202.33 compositing and clamp before transmission.
   coreEmission+=facetLift;
   alpha=clamp(alpha+focalOpacity*energy,0.0,.79);
   // R202.45: expose lit facets through the existing alpha channel, with the original ceiling.
   alpha=clamp(alpha*(1.0+.48*keyedHighlight),0.0,.79);
  gl_FragColor=vec4((tint*(.75+.35*hotspot+.38*facetLight)*facetShading*facetPalette*(1.0+.25*facetGlint)*facetContrast+coreEmission)*shimmer*energy*(.30+.70*depthTransmission),alpha*depthTransmission);
 }`;
 const material=new ShaderMaterial('r202-white-violet-soft-heart',scene,{vertexSource,fragmentSource},{
   attributes:['position','normal'],
   uniforms:['world','worldViewProjection','uCamera','uTime','uPower'],
   needAlphaBlending:true
 });
 material.backFaceCulling=true;
 // R202.23: bounded alpha compositing prevents saturation when the central IcoSphere is drawn above the translucent field.
 material.alphaMode=Engine.ALPHA_COMBINE;
 material.disableDepthWrite=true;
 material.metadata=Object.freeze({revision:'r20223-foreground-facets',target:'central nucleus',scope:'desktop'});
 material.setFloat('uTime',0);material.setFloat('uPower',1);
 material.setVector3('uCamera',new Vector3(0,0,4.8));
 return material;
}
