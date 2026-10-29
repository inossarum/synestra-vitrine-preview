/* R203: energy-carved landscape, not an architectural corridor.
   Geometry, lights, navigation beacons and atmosphere live in one THREE.Scene.
   Deterministic, self-contained, reversible; no textures or runtime requests. */
export function createEnergyLandscape(THREE,scene,{violet,green,core}) {
 const owned=[],lights=[],effects=[],sharedMaterials=new Set(),targets=[];
 const terrainGroup=new THREE.Group();scene.add(terrainGroup);
 const material=(opt)=>{const m=new THREE.MeshStandardMaterial(opt);sharedMaterials.add(m);return m;};
 const purple=new THREE.Color(0x30234e),teal=new THREE.Color(0x244e48),slate=new THREE.Color(0x1a293a);
 const rock=material({color:0xffffff,vertexColors:true,roughness:.87,metalness:.18,flatShading:false,side:THREE.FrontSide});
 const metal=material({color:0x26364c,roughness:.47,metalness:.66});
 const edge=material({color:0x526877,roughness:.32,metalness:.76});
 const beaconPurple=material({color:0x4b345e,emissive:violet,emissiveIntensity:.65,metalness:.58,roughness:.3});
 const beaconGreen=material({color:0x2b594b,emissive:green,emissiveIntensity:.65,metalness:.58,roughness:.3});
 const beaconCyan=material({color:0x3f5a64,emissive:core,emissiveIntensity:.4,metalness:.58,roughness:.35});
 const add=(geo,mat,p,cast=false,parent=terrainGroup)=>{
  const m=new THREE.Mesh(geo,mat);m.position.set(...p);m.castShadow=cast;m.receiveShadow=true;parent.add(m);owned.push(m);return m;
 };
 const smooth=(a,b,x)=>{const v=Math.min(1,Math.max(0,(x-a)/(b-a)));return v*v*(3-2*v);};
 const noise=(x,z)=>{
   return .48*Math.sin(x*.83+z*.31)*Math.sin(z*.57-x*.37)
         +.24*Math.sin(x*1.63-z*.88)+.12*Math.cos(x*2.8+z*2.2);
 };
 // Deep central basin, broken highlands on both sides, far receding ridges.
 // Distinctive S-shaped gully is a brand metaphor: pathways converge on Core.
 function height(x,z){
  const s=x-.57*Math.sin((z+1.3)*.48)-.13*Math.sin(z*1.21);
  const bank=smooth(.8,5.6,Math.abs(s));
  const distant=smooth(2.3,11.8,-z);
  const bench=(Math.sin(x*.37+z*.49)+Math.sin(z*.24-x*.45))*.5;
  const shelves=Math.floor((bank*1.8+bench*.23)*5)/5;
  const base=-1.70+.17*noise(x,z)*(.35+bank);
  const canyon=1.87*bank+1.05*bank*smooth(4.0,10.5,-z);
  const stepped=.32*shelves*bank;
  const cut=-.25*Math.exp(-Math.pow(s/.68,2));
  return base+canyon+stepped+cut+.26*distant*bank;
 }
 let terrain=null,terrainDetail=0,dust=null;
 function buildTerrain(level){
  const segments=level===1?[52,64]:level===2?[84,108]:[120,150];
  if(terrain){terrainGroup.remove(terrain);terrain.geometry.dispose();owned.splice(owned.indexOf(terrain),1);terrain=null;}
  const geo=new THREE.PlaneGeometry(24,31,...segments);
  geo.rotateX(-Math.PI/2);
  const pos=geo.getAttribute('position'),col=[];
  const color=new THREE.Color();
  for(let i=0;i<pos.count;i++){
   const x=pos.getX(i),z=pos.getZ(i)-3.1,h=height(x,z);
   pos.setZ(i,z);pos.setY(i,h);
   const side=smooth(.2,5.6,Math.abs(x-.57*Math.sin((z+1.3)*.48)));
   const a=smooth(-4.5,5.0,x)*.46+Math.sin(z*.34)*.05;
   color.copy(purple).lerp(teal,Math.max(0,Math.min(1,a+.28)));
   color.lerp(slate,.24);
   const tint=.80+.27*side+.05*Math.sin(x*1.1+z*.7);
   color.multiplyScalar(tint);
   col.push(color.r,color.g,color.b);
  }
  geo.setAttribute('color',new THREE.Float32BufferAttribute(col,3));
  geo.computeVertexNormals();
  terrain=add(geo,rock,[0,0,0],false);
  terrainDetail=segments[0]*segments[1];
 }
 // Platform embedded in the terrain, no huge ring or decorative fake wall.
 const dais=add(new THREE.CylinderGeometry(1.40,1.65,.17,72),metal,[0,-1.59,.11],true);
 dais.receiveShadow=true;
 const upper=add(new THREE.CylinderGeometry(1.26,1.32,.018,72),edge,[0,-1.49,.11]);
 const inlay=add(new THREE.CylinderGeometry(1.22,1.25,.023,72),material({color:0x142231,metalness:.52,roughness:.6}),[0,-1.47,.11]);
 // Energy veins flow across the contours and physically sit above topology.
 const streams=[];
 function makeVein(index,side,lit){
  const n=32,pts=[];
  for(let i=0;i<=n;i++){
    const t=i/n;
    const z=.5-t*11.5;
    const x=side*(.65+3.55*t)+.20*Math.sin(t*14+index*2)+.12*index;
    const y=Math.max(height(x,z)+.043,-1.43+(1-t)*-.12)+.025;
    pts.push(new THREE.Vector3(x,y,z));
  }
  const path=new THREE.CatmullRomCurve3(pts);
  const geo=new THREE.TubeGeometry(path,120,lit?.019:.035,4,false);
  const color=side<0?violet:green;
  const mat=new THREE.MeshBasicMaterial({color,transparent:true,opacity:lit?.68:.07,depthWrite:false,toneMapped:false});
  sharedMaterials.add(mat);
  const mesh=add(geo,mat,[0,0,0]);mesh.receiveShadow=false;
  streams.push(mesh);
 }
 for(const side of [-1,1])for(let index=0;index<3;index++){makeVein(index,side,false);makeVein(index,side,true);}
 // Three distant destination beacons; visible in perspective and physically clickable.
 const markers=[
  {name:'Connect',route:'connect',x:-3.1,z:-4.3,color:violet,mat:beaconPurple},
  {name:'Bridge',route:'bridge',x:3.2,z:-5.8,color:green,mat:beaconGreen},
  {name:'SiteForge',route:'siteforge',x:.2,z:-10.8,color:core,mat:beaconCyan}
 ];
 for(const m of markers){
  const ground=height(m.x,m.z),obj=new THREE.Group();obj.position.set(m.x,ground+.17,m.z);scene.add(obj);effects.push(obj);
  const foot=add(new THREE.CylinderGeometry(.26,.36,.11,18),metal,[0,0,0],false,obj);
  const shaft=add(new THREE.CylinderGeometry(.035,.072,.46,12),m.mat,[0,.28,0],false,obj);
  const marker=add(new THREE.OctahedronGeometry(.16,0),m.mat,[0,.62,0],false,obj);
  marker.userData.synRoute=m.route;marker.userData.synName=m.name;
  targets.push(marker);
  const halo=add(new THREE.TorusGeometry(.24,.013,5,38),m.mat,[0,.49,0],false,obj);
  halo.rotation.x=Math.PI/2;
  m.object=obj;m.marker=marker;m.halo=halo;
 }
 // Real lights illuminate the terrain with a single violet/green/white physical system.
 const lV=new THREE.PointLight(violet,13,15,2),lG=new THREE.PointLight(green,13,15,2);
 lV.position.set(-.65,.42,.25);lG.position.set(.65,.42,.25);scene.add(lV,lG);lights.push(lV,lG);
 const high=new THREE.DirectionalLight(0xa2b7d1,1.25);
 high.position.set(-5,8,-5);scene.add(high);lights.push(high);
 // Fog depth layers using perspective particles, never CSS compositing.
 function rebuildDust(level){
  if(dust){scene.remove(dust);dust.geometry.dispose();dust.material.dispose();dust=null;}
  if(level<2)return;
  const amount=level===2?120:350,p=new Float32Array(amount*3),c=new Float32Array(amount*3);
  let seed=17421;
  const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
  for(let i=0;i<amount;i++){
    p[i*3]=(rand()-.5)*17;p[i*3+1]=-.8+rand()*5;p[i*3+2]=-rand()*18+4;
    const tint=rand()<.5?violet:green;
    c[i*3]=tint.r;c[i*3+1]=tint.g;c[i*3+2]=tint.b;
  }
  const geom=new THREE.BufferGeometry();
  geom.setAttribute('position',new THREE.BufferAttribute(p,3));
  geom.setAttribute('color',new THREE.BufferAttribute(c,3));
  dust=new THREE.Points(geom,new THREE.PointsMaterial({size:.023,vertexColors:true,transparent:true,opacity:.29,depthWrite:false,sizeAttenuation:true}));
  scene.add(dust);
 }
 const pulse=(t,x)=>Math.sin(t+x);
 function update(t,gain){
  lV.intensity=13*gain*(1+.13*pulse(t*.9,0));
  lG.intensity=13*gain*(1+.13*pulse(t*.9,1.3));
  if(dust)dust.rotation.y=.008*Math.sin(t*.13);
  for(let i=0;i<markers.length;i++){
   const m=markers[i];
   m.marker.rotation.y=t*.41+i;
   m.marker.position.y=.62+Math.sin(t*1.1+i*1.5)*.045;
   m.halo.scale.setScalar(1+.095*Math.sin(t*1.1+i*1.5));
  }
  for(let i=0;i<streams.length;i++)if(i%2===1)streams[i].material.opacity=.50+.12*Math.sin(t*1.1+i*.6);
 }
 function setTier(level){
  const tier=Math.min(3,Math.max(1,level));
  if(terrainDetail!==(tier===1?52*64:tier===2?84*108:120*150))buildTerrain(tier);
  rebuildDust(tier);
 }
 function dispose(){
  for(const v of lights)scene.remove(v);
  for(const o of effects)scene.remove(o);
  scene.remove(terrainGroup);
  if(dust){scene.remove(dust);dust.geometry.dispose();dust.material.dispose();}
  for(const mesh of owned)mesh.geometry.dispose();
  for(const m of sharedMaterials)m.dispose();
 }
 return {setTier,update,dispose,targets,height,landscapeType:'energy-canyon'};
}