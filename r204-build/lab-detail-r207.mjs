/* SiteForge R207 - compact spatial flux and architectural detail.
 * Adds geometry inside the EXISTING scene. No second renderer, canvas or dependency. */
export function installLabDetail({THREE,scene,owned}){
 const add=(geo,mat,pos)=>{
  const mesh=new THREE.Mesh(geo,mat);mesh.position.set(...pos);
  scene.add(mesh);owned.push(mesh);return mesh;
 };
 const mat=(color,emissive=0x000000,intensity=0)=>
  new THREE.MeshStandardMaterial({color,metalness:.58,roughness:.49,emissive,emissiveIntensity:intensity});
 const elements=[];
 for(const side of [-1,1]){
  const column=add(new THREE.BoxGeometry(.17,2.65,.22),mat(0x405066,side<0?0x2a174c:0x124538,.24),[side*2.46,-.02,-2.30]);
  column.rotation.y=side*.08;elements.push(column);
  for(const y of [-.9,1.12])elements.push(add(
   new THREE.BoxGeometry(.36,.045,.28),mat(0x536579),[side*2.46,y,-2.22]));
  elements.push(add(new THREE.BoxGeometry(.024,1.86,.04),
   mat(side<0?0x614986:0x416e65,side<0?0x452977:0x19735a,.48),
   [side*2.29,-.04,-2.17]));
 }
 for(const y of [-1.12,1.46]){
  elements.push(add(new THREE.BoxGeometry(5.16,.035,.10),
    mat(0x41506a,0x22283e,.16),[0,y,-3.34]));
 }
 const curves=[];
 for(let i=0;i<8;i++){
  const side=(i%2===0?-1:1),k=Math.floor(i/2);
  const curve=new THREE.CatmullRomCurve3([
   new THREE.Vector3(side*(.54+.08*k),.42+.04*k,.08),
   new THREE.Vector3(side*(1.01+.09*k),.66-.10*k,-.32),
   new THREE.Vector3(side*(1.58+.10*k),.14-.09*k,-.68),
   new THREE.Vector3(side*(2.03+.15*k),-.67+.07*k,-1.32)
  ]);
  const material=new THREE.MeshBasicMaterial({
   color:side<0?0x9877d4:0x65d7ad,transparent:true,
   opacity:.33,blending:THREE.AdditiveBlending,depthWrite:false,depthTest:true
  });
  const m=add(new THREE.TubeGeometry(curve,52,.009+(i%3)*.002,5,false),
    material,[0,0,0]);
  m.userData.flowIndex=i;curves.push(m);
 }
 const positions=new Float32Array(36*3);
 for(let i=0;i<36;i++){
  const a=i*2.39996323,r=.97+.17*Math.sin(i*4.7);
  positions[i*3]=Math.cos(a)*r;
  positions[i*3+1]=.08+Math.sin(a)*r*.77;
  positions[i*3+2]=.16+.38*Math.sin(i*1.81);
 }
 const dotsGeo=new THREE.BufferGeometry();
 dotsGeo.setAttribute('position',new THREE.BufferAttribute(positions,3));
 const dots=new THREE.Points(dotsGeo,new THREE.PointsMaterial({
  color:0xc7f5e8,size:.048,sizeAttenuation:true,transparent:true,
  opacity:.6,blending:THREE.AdditiveBlending,depthWrite:false
 }));
 scene.add(dots);owned.push(dots);
 let active=8;
 const tierApply=tier=>{
  const n=[2,3,5,8][tier],op=[.18,.27,.37,.53][tier];
  active=n;
  curves.forEach((m,i)=>{m.visible=i<n;m.material.opacity=i<n?op:0;});
  dots.geometry.setDrawRange(0,[6,12,24,36][tier]);
  dots.material.opacity=[.18,.28,.40,.64][tier];
  elements.forEach(e=>{e.visible=tier>=1;});
 };
 const frame=t=>{
  dots.rotation.y=t*.065;
  for(let i=0;i<active;i++){
   curves[i].material.opacity=Math.max(.08,Math.min(.65,
    [.18,.27,.37,.53][currentTier]*(.80+.20*Math.sin(t*1.4-i*1.32))));
  }
 };
 let currentTier=3;
 return {applyTier(tier){currentTier=tier;tierApply(tier);},frame,
  getFlowCount(){return active;},getMoteCount(){return [6,12,24,36][currentTier];}};
}
