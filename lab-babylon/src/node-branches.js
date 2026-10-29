/** R195: bounded node-to-shell plasma forks inside existing Babylon Scene. */
import {Vector3,MeshBuilder,Mesh,VertexBuffer} from '@babylonjs/core';
import {organicPlasmaRibbonPaths,ribbonTexCoords} from './plasma-ribbons.js';

const STEPS=72;
export const FORK_STEPS=STEPS;
export function nodeForkVertexColors(index,segments=STEPS){
 const cross=[.028,.24,.78,.24,.028],rgba=[];
 for(let rail=0;rail<5;rail++)for(let j=0;j<=segments;j++){
  const u=j/segments;
  // The branch stays attached to its bright node, then fades along its tip.
  const taper=Math.min(1,(1-u)*4.2),ripple=.87+.13*Math.sin(u*15+index*.8);
  rgba.push(1,1,1,cross[rail]*taper*ripple);
 }
 return new Float32Array(rgba);
}
const UP=new Vector3(0,1,0),RIGHT=new Vector3(1,0,0);
const clamp=(v,lo,hi)=>Math.max(lo,Math.min(hi,v));

/** Two fork directions per luminous knot. All positions are true 3D sphere-local XYZ. */
export function nodeForkPath(nodeDirections,index,time=0){
 if(!Array.isArray(nodeDirections)||nodeDirections.length!==6)throw Error('R195_SIX_NODES_REQUIRED');
 if(!Number.isInteger(index)||index<0||index>=12)throw RangeError('R195_FORK_INDEX');
 const nodeIndex=Math.floor(index/2),side=index%2===0?1:-1;
 const direction=nodeDirections[nodeIndex].normalizeToNew();
 let tangent=Vector3.Cross(direction,UP);
 if(tangent.lengthSquared()<.03)tangent=Vector3.Cross(direction,RIGHT);
 tangent.normalize();
 const binormal=Vector3.Cross(direction,tangent).normalize();
 const path=[],phase=index*1.61803;
 for(let j=0;j<=STEPS;j++){
  const u=j/STEPS,arc=u*(.95+.09*Math.sin(time*.16+index*.53));
  const along=direction.scale(Math.cos(arc))
    .add(tangent.scale(side*Math.sin(arc)))
    .add(binormal.scale(.10*Math.sin(Math.PI*u)*Math.sin(u*10.6+phase+time*.38)));
  const radial=1.53+.055*Math.sin(Math.PI*u)*Math.sin(u*12.5+phase+time*.44);
  path.push(along.normalize().scale(radial));
 }
 return path;
}

export function installNodeForks({scene,directions,ribbonMaterials,photonMaterials,parent=null}){
 if(!scene||!scene.getEngine)throw TypeError('R195_SCENE_REQUIRED');
 if(!Array.isArray(directions)||directions.length!==6)throw Error('R195_SIX_NODES_REQUIRED');
 if(!Array.isArray(ribbonMaterials)||ribbonMaterials.length!==4)throw Error('R195_FOUR_MATERIALS_REQUIRED');
 if(!Array.isArray(photonMaterials)||photonMaterials.length!==4)throw Error('R195_FOUR_PHOTON_MATERIALS_REQUIRED');
 const meshes=[];
 for(let i=0;i<12;i++){
  const center=nodeForkPath(directions,i,0);
  const rails=organicPlasmaRibbonPaths(center,i+200,0,1.18);
  const mesh=MeshBuilder.CreateRibbon('r195-node-fork-'+i,{
   pathArray:rails,updatable:true,sideOrientation:Mesh.FRONTSIDE
  },scene);
  const alpha=nodeForkVertexColors(i);
  const positions=mesh.getVerticesData(VertexBuffer.PositionKind);
  if(!positions||positions.length/3*4!==alpha.length)throw Error('R195_FORK_VERTEX_MISMATCH');
  mesh.setVerticesData(VertexBuffer.ColorKind,alpha,true);
  mesh.setVerticesData(VertexBuffer.UVKind,ribbonTexCoords(STEPS),true);
  mesh.hasVertexAlpha=true;mesh.isPickable=false;
  mesh.material=ribbonMaterials[i%4];
  if(parent)mesh.parent=parent;
  meshes.push(mesh);
 }
 const photons=[];
 for(let i=0;i<6;i++){
  const mesh=MeshBuilder.CreateSphere('r195-node-impulse-'+i,{diameter:.085,segments:10},scene);
  mesh.material=photonMaterials[i%4];
  mesh.isPickable=false;
  if(parent)mesh.parent=parent;
  photons.push(mesh);
 }
 let lastGeom=-Infinity,lastBudget='';
 const stats=()=>({branches:meshes.length,photons:photons.length,segments:STEPS});
 return {
  meshes,photons,stats,
  update({time=0,quality='balanced',corePower=1,parent=null}={}){
   const count=corePower<=0?0:quality==='economy'?4:quality==='ultra'?12:8;
   const photoCount=corePower<=0?0:quality==='economy'?2:6;
   const budget=quality+':'+(corePower>0);
   const rebuild=time-lastGeom>=.065||budget!==lastBudget;
   if(rebuild){lastGeom=time;lastBudget=budget;}
   for(let i=0;i<meshes.length;i++){
    const mesh=meshes[i],enabled=i<count;
    mesh.setEnabled(enabled);
    if(!enabled)continue;
    if(parent&&mesh.parent!==parent)mesh.parent=parent;
    if(rebuild)MeshBuilder.CreateRibbon(null,{
     pathArray:organicPlasmaRibbonPaths(nodeForkPath(directions,i,time),i+200,time,1.18),
     instance:mesh
    },scene);
   }
   for(let i=0;i<photons.length;i++){
    const mesh=photons[i],enabled=i<photoCount;
    mesh.setEnabled(enabled);
    if(!enabled)continue;
    if(parent&&mesh.parent!==parent)mesh.parent=parent;
    // Emissive pulses traverse knots towards neighbouring shell currents.
    const path=nodeForkPath(directions,i*2+(i%2),time);
    const u=((time*(.24+.018*i)+i*.157)%1+1)%1;
    const position=u*(path.length-1),a=Math.floor(position),b=Math.min(path.length-1,a+1);
    mesh.position.copyFrom(Vector3.Lerp(path[a],path[b],position-a));
    mesh.scaling.setAll(clamp(.70+.27*Math.sin(time*2.1+i),.24,1.12));
   }
  },
  dispose(){for(const m of [...meshes,...photons])m.dispose();}
 };
}
