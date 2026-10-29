/** R192 / Synestra LAB: plasma ribbons in true 3D, no new scene or engine. */
import {Vector3,MeshBuilder,ShaderMaterial,VertexBuffer,Mesh,Engine} from '@babylonjs/core';

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
 const start=nodes[index%nodes.length],end=nodes[(index*3+2+Math.floor(index/6))%nodes.length];
 const a=start.normalizeToNew(),b=end.normalizeToNew();
 const phase=golden(index),side=Vector3.Cross(a,b);
 if(side.lengthSquared()<.03)side.copyFromFloats(.2,.8,.1);
 side.normalize();
 const across=Vector3.Cross(side,a).normalize();
 const orbit=index%4;
 const points=[];
 for(let k=0;k<=STEPS;k++){
  const u=k/STEPS,swing=Math.sin(u*Math.PI),envelope=Math.pow(swing,.72);
  const contour=blend(a,b,u)
   .add(side.scale(.35*envelope*Math.sin(u*TWOPI*(1.4+orbit*.4)+phase+time*.11)))
   .add(across.scale(.17*envelope*Math.sin(u*TWOPI*(2.3+index%3*.25)-phase*.8-time*.16)));
  if(contour.lengthSquared()<.005)contour.copyFromFloats(.11,0,.2);
  contour.normalize();
  const inner=(index%7===0)?.31:0;
  const radius=1.54-inner*envelope+.09*envelope*Math.sin(u*TWOPI*2.2+phase+time*.22);
  points.push(contour.scale(radius));
 }
 return points;
}
export function organicPlasmaRibbonPaths(centerline,index,time){
 const paths=RAILS.map(()=>[]);
 const base=(index%5===0?.052:index%3===0?.034:.022);
 for(let k=0;k<centerline.length;k++){
  const u=k/(centerline.length-1),center=centerline[k];
  const prev=centerline[Math.max(0,k-1)],next=centerline[Math.min(centerline.length-1,k+1)];
  const tangent=next.subtract(prev).normalize(),radial=center.normalizeToNew();
  let across=Vector3.Cross(tangent,radial);
  if(across.lengthSquared()<.005)across=Vector3.Cross(tangent,new Vector3(0,1,0));
  across.normalize();
  const flare=.28+.72*Math.pow(Math.sin(Math.PI*u),.58);
  const irregular=1+.19*Math.sin(u*TWOPI*(2+index%4)+index*.9+time*.37);
  const width=base*flare*irregular;
  for(let side=0;side<RAILS.length;side++){
   paths[side].push(center.add(across.scale(width*RAILS[side])));
  }
 }
 return paths;
}
export function ribbonVertexAlphas(index,segments=STEPS){
 const a=[],cross=[.025,.26,.77,.26,.025];
 for(let k=0;k<RAILS.length;k++){
  for(let j=0;j<=segments;j++){
   const u=j/segments,fade=clamp(Math.sin(Math.PI*u)*3.2,0,1);
   const pulses=.67+.33*Math.sin(TWOPI*u*(2+index%3)+index*.72);
   const opacity=cross[k]*fade*(.83+.17*pulses);
   a.push(1,1,1,opacity);
  }
 }
 return new Float32Array(a);
}
export function installPlasmaRibbons({scene,colors,nodes,count=28,bridgePath=null}){
 if(!scene||typeof scene.getEngine!=='function')throw TypeError('PLASMA_SCENE_MISSING');
 if(!Array.isArray(colors)||colors.length!==4)throw TypeError('PLASMA_FOUR_PALETTE_COLORS_REQUIRED');
 const material=colors.map((color,i)=>{
  const shader=new ShaderMaterial('r192-plasma-shader-'+i,scene,{
   vertexSource:`precision highp float;
    attribute vec3 position;attribute vec4 color;
    uniform mat4 worldViewProjection;
    varying vec4 vColor;
    void main(){vColor=color;gl_Position=worldViewProjection*vec4(position,1.);}`,
   fragmentSource:`precision highp float;
    varying vec4 vColor;uniform vec3 uTint;
    void main(){gl_FragColor=vec4(uTint*(.83+.17*vColor.a),vColor.a);}`
  },{attributes:['position','color'],uniforms:['worldViewProjection','uTint'],needAlphaBlending:true});
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
  mesh.hasVertexAlpha=true;
  mesh.material=material[i%4];
  mesh.isPickable=false;
  ribbons.push(mesh);
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
   mesh.hasVertexAlpha=true;mesh.isPickable=false;mesh.material=material[i%4];
   nodeMeshes.push(mesh);
  }
 }
 let lastSample=-Infinity,lastBudget='';
 return {
  meshes:ribbons,
  nodeMeshes,
  materials:material,
  update({time,quality='balanced',parent=null,active=28,corePower=1}){
   // Geometry updates max 15 Hz; shader-free temporal movement remains smooth via camera.
   const cadence=quality==='economy'?.12:.065;
   const budget=quality+':'+active+':'+(corePower>0);
   if(time-lastSample<cadence&&budget===lastBudget)return;
   lastBudget=budget;lastSample=time;
   const visible=quality==='economy'?Math.min(active,8):quality==='ultra'?active:Math.min(active,22);
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
  stats:()=>({ribbons:ribbons.length,nodeStreams:nodeMeshes.length,rails:RAILS.length,samples:STEPS+1}),
  dispose(){for(const mesh of [...ribbons,...nodeMeshes])mesh.dispose();for(const mat of material)mat.dispose();}
 };
}
