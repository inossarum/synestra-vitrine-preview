/** R192 / Synestra LAB: plasma ribbons in true 3D, no new scene or engine. */
import {Vector3,MeshBuilder,ShaderMaterial,VertexBuffer,Mesh,Engine} from '@babylonjs/core';
import {shellAnchorPair} from './shell-coverage.js';

const RAILS=[-1,-.55,0,.55,1], STEPS=84, TWOPI=Math.PI*2;
const clamp=(v,lo,hi)=>Math.max(lo,Math.min(hi,v));
const blend=(a,b,u)=>a.scale(1-u).add(b.scale(u));
const golden=i=>i*2.399963229728653;
function pointOnShell(angle,height){
 const z=clamp(height,-.95,.95),c=Math.sqrt(1-z*z);
 return new Vector3(c*Math.cos(angle),z,c*Math.sin(angle));
}
export function organicPlasmaCenterline(index,time,nodes){
 if(!Array.isArray(nodes)||nodes.length<4)throw Error('PLASMA_NODES_MISSING');
 const [startCoords,endCoords]=shellAnchorPair(index);
 const start=new Vector3(...startCoords),end=new Vector3(...endCoords);
 const a=start.normalizeToNew(),b=end.normalizeToNew();
 const phase=golden(index),side=Vector3.Cross(a,b);
 // R198: each quartet shares a 3D convergence field while retaining its own shell endpoints.
 const cluster=Math.floor(index/4)%nodes.length;
 const field=nodes[cluster].normalizeToNew();
 if(side.lengthSquared()<.03)side.copyFromFloats(.2,.8,.1);
 side.normalize();
 const across=Vector3.Cross(side,a).normalize();
 const orbit=index%4;
 const points=[];
 for(let k=0;k<=STEPS;k++){
  const u=k/STEPS,swing=Math.sin(u*Math.PI),envelope=Math.pow(swing,.72);
  const contour=blend(a,b,u)
   .add(field.scale(.48*Math.pow(envelope,1.25)))
   .add(side.scale(.23*envelope*Math.sin(u*TWOPI*(1.25+orbit*.32)+phase+time*.11)))
   .add(across.scale(.115*envelope*Math.sin(u*TWOPI*(1.8+index%3*.20)-phase*.8-time*.16)));
  if(contour.lengthSquared()<.005)contour.copyFromFloats(.11,0,.2);
  contour.normalize();
  const inner=(index%7===0)?.31:0;
  const radius=1.54-inner*envelope+.09*envelope*Math.sin(u*TWOPI*2.2+phase+time*.22);
  points.push(contour.scale(radius));
 }
 return points;
}
export function organicPlasmaRibbonPaths(centerline,index,time,widthMultiplier=1){
 const paths=RAILS.map(()=>[]);
 const base=index>=100?.095:(index%5===0?.068:index%3===0?.047:.031);
 for(let k=0;k<centerline.length;k++){
  const u=k/(centerline.length-1),center=centerline[k];
  const prev=centerline[Math.max(0,k-1)],next=centerline[Math.min(centerline.length-1,k+1)];
  const tangent=next.subtract(prev).normalize(),radial=center.normalizeToNew();
  let across=Vector3.Cross(tangent,radial);
  if(across.lengthSquared()<.005)across=Vector3.Cross(tangent,new Vector3(0,1,0));
  across.normalize();
  const flare=.28+.72*Math.pow(Math.sin(Math.PI*u),.58);
  const irregular=1+.19*Math.sin(u*TWOPI*(2+index%4)+index*.9+time*.37);
  const width=base*flare*irregular*widthMultiplier;
  for(let side=0;side<RAILS.length;side++){
   paths[side].push(center.add(across.scale(width*RAILS[side])));
  }
 }
 return paths;
}
export function ribbonVertexAlphas(index,segments=STEPS,alphaScale=1){
 const a=[],cross=index>=100?[.012,.17,.68,.17,.012]:[.018,.23,.67,.23,.018];
 for(let k=0;k<RAILS.length;k++){
  for(let j=0;j<=segments;j++){
   const u=j/segments,fade=clamp(Math.sin(Math.PI*u)*3.2,0,1);
   const pulses=.67+.33*Math.sin(TWOPI*u*(2+index%3)+index*.72);
   const opacity=cross[k]*fade*(.83+.17*pulses)*alphaScale;
   a.push(1,1,1,opacity);
  }
 }
 return new Float32Array(a);
}
export function ribbonTexCoords(segments=STEPS){
 const uv=[];
 for(let rail=0;rail<RAILS.length;rail++)for(let j=0;j<=segments;j++)uv.push(j/segments,rail/(RAILS.length-1));
 return new Float32Array(uv);
}
export function installPlasmaRibbons({scene,colors,nodes,count=28,bridgePath=null}){
 if(!scene||typeof scene.getEngine!=='function')throw TypeError('PLASMA_SCENE_MISSING');
 if(!Array.isArray(colors)||colors.length!==4)throw TypeError('PLASMA_FOUR_PALETTE_COLORS_REQUIRED');
 const material=colors.map((color,i)=>{
  const shader=new ShaderMaterial('r193-plasma-shader-'+i,scene,{
   vertexSource:`precision highp float;
    attribute vec3 position;attribute vec4 color;attribute vec2 uv;
    uniform mat4 worldViewProjection;
    varying vec4 vColor;varying vec2 vUV;
    void main(){vColor=color;vUV=uv;gl_Position=worldViewProjection*vec4(position,1.);}`,
   fragmentSource:`precision highp float;
    varying vec4 vColor;varying vec2 vUV;
    uniform vec3 uTint;uniform float uTime;
    void main(){
     float crest=.5+.5*sin(vUV.x*24.0-uTime*2.8+sin(vUV.y*6.28)*2.0);
     float shimmer=.82+.18*sin(vUV.x*10.0+uTime*.95+vUV.y*7.0);
     float alpha=clamp(vColor.a*(.66+.34*crest)*shimmer,0.0,1.0);
     vec3 light=uTint*(.72+.42*crest)*(1.0+.18*sin(vUV.x*17.0-uTime*1.3));
     gl_FragColor=vec4(light,alpha);
    }`
  },{attributes:['position','color','uv'],uniforms:['worldViewProjection','uTint','uTime'],needAlphaBlending:true});
  shader.setColor3('uTint',color);
  shader.backFaceCulling=false;
  shader.alphaMode=Engine.ALPHA_COMBINE;
  return shader;
 });
 const ribbons=[];
 for(let i=0;i<count;i++){
  const rails=organicPlasmaRibbonPaths(organicPlasmaCenterline(i,0,nodes),i,0);
  const mesh=MeshBuilder.CreateRibbon('plasma-ribbon-'+i,{
   pathArray:rails,updatable:true,sideOrientation:Mesh.FRONTSIDE
  },scene);
  const positionCount=mesh.getVerticesData(VertexBuffer.PositionKind).length/3;
  const colorData=ribbonVertexAlphas(i);
  if(colorData.length!==positionCount*4)throw Error('RIBBON_COLOR_VERTEX_MISMATCH '+colorData.length+' '+positionCount);
  mesh.setVerticesData(VertexBuffer.ColorKind,colorData,true);
  mesh.setVerticesData(VertexBuffer.UVKind,ribbonTexCoords(),true);
  mesh.hasVertexAlpha=true;
  mesh.material=material[i%4];
  mesh.isPickable=false;
  ribbons.push(mesh);
 }
 // Wider low-alpha sheaths create diffusion without opaque geometry or extra GPU passes.
 const sheaths=[];
 for(let i=0;i<Math.min(14,count);i++){
  const path=organicPlasmaCenterline(i,0,nodes);
  const rails=organicPlasmaRibbonPaths(path,i,0,3.8);
  const mesh=MeshBuilder.CreateRibbon('plasma-sheath-'+i,{
   pathArray:rails,updatable:true,sideOrientation:Mesh.FRONTSIDE
  },scene);
  const alpha=ribbonVertexAlphas(i,STEPS,.44);
  if(mesh.getVerticesData(VertexBuffer.PositionKind).length/3*4!==alpha.length)
   throw Error('PLASMA_SHEATH_VERTEX_MISMATCH');
  mesh.setVerticesData(VertexBuffer.ColorKind,alpha,true);
  mesh.setVerticesData(VertexBuffer.UVKind,ribbonTexCoords(),true);
  mesh.hasVertexAlpha=true;mesh.isPickable=false;mesh.material=material[i%4];
  sheaths.push(mesh);
 }
 const nodeMeshes=[];
 if(bridgePath){
  // Six softly graded streams flow outward from nucleus to the existing bright knots.
  for(let i=0;i<6;i++){
   const path=bridgePath(i,0);
   if(!Array.isArray(path)||path.length<12)throw Error('PLASMA_BRIDGE_PATH_INVALID');
   const rails=organicPlasmaRibbonPaths(path,i+100,0);
   const mesh=MeshBuilder.CreateRibbon('node-plasma-'+i,{
    pathArray:rails,updatable:true,sideOrientation:Mesh.FRONTSIDE
   },scene);
   const colors=ribbonVertexAlphas(i+100,path.length-1);
   if(mesh.getVerticesData(VertexBuffer.PositionKind).length/3*4!==colors.length)
    throw Error('PLASMA_BRIDGE_VERTEX_MISMATCH');
   mesh.setVerticesData(VertexBuffer.ColorKind,colors,true);
   mesh.setVerticesData(VertexBuffer.UVKind,ribbonTexCoords(path.length-1),true);
   mesh.hasVertexAlpha=true;mesh.isPickable=false;mesh.material=material[i%4];
   nodeMeshes.push(mesh);
  }
 }
 let lastSample=-Infinity,lastBudget='';
 return {
  meshes:ribbons,
  sheaths,
  nodeMeshes,
  materials:material,
  update({time,quality='balanced',parent=null,active=28,corePower=1}){
   // Shader flicker moves smoothly every frame; geometry updates are capped at 15 Hz.
   for(const mat of material)mat.setFloat('uTime',time);
   const cadence=quality==='economy'?.12:.065;
   const budget=quality+':'+active+':'+(corePower>0);
   if(time-lastSample<cadence&&budget===lastBudget)return;
   lastBudget=budget;lastSample=time;
   const visible=quality==='economy'?Math.min(active,8):quality==='ultra'?active:Math.min(active,26);
   for(let i=0;i<ribbons.length;i++){
    const mesh=ribbons[i],enabled=i<visible;
    mesh.setEnabled(enabled);
    if(!enabled)continue;
    if(parent&&mesh.parent!==parent)mesh.parent=parent;
    MeshBuilder.CreateRibbon(null,{
      pathArray:organicPlasmaRibbonPaths(organicPlasmaCenterline(i,time,nodes),i,time),
      instance:mesh
    },scene);
   }
   const sheathBudget=quality==='economy'?0:quality==='ultra'?sheaths.length:Math.min(10,sheaths.length);
   for(let i=0;i<sheaths.length;i++){
    const mesh=sheaths[i],enabled=i<sheathBudget;
    mesh.setEnabled(enabled);
    if(!enabled)continue;
    if(parent&&mesh.parent!==parent)mesh.parent=parent;
    MeshBuilder.CreateRibbon(null,{
      pathArray:organicPlasmaRibbonPaths(organicPlasmaCenterline(i,time,nodes),i,time,3.8),
      instance:mesh
    },scene);
   }
   for(let i=0;i<nodeMeshes.length;i++){
    const mesh=nodeMeshes[i],enabled=corePower>0&&(quality!=='economy'||i<3);
    mesh.setEnabled(enabled);
    if(!enabled)continue;
    if(parent&&mesh.parent!==parent)mesh.parent=parent;
    MeshBuilder.CreateRibbon(null,{
      pathArray:organicPlasmaRibbonPaths(bridgePath(i,time),i+100,time),
      instance:mesh
    },scene);
   }
  },
  stats:()=>({ribbons:ribbons.length,sheaths:sheaths.length,nodeStreams:nodeMeshes.length,rails:RAILS.length,samples:STEPS+1}),
  dispose(){for(const mesh of [...ribbons,...sheaths,...nodeMeshes])mesh.dispose();for(const mat of material)mat.dispose();}
 };
}
