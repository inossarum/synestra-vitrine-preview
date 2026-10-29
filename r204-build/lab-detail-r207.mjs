/* R208 refinement of R207 spatial detail. The actual LAB R188.1 material remains unchanged.
 * All elements share the existing THREE scene, renderer and performance tier. */
export function installLabDetail({THREE,scene,owned}){
 const add=(geo,mat,pos)=>{
  const m=new THREE.Mesh(geo,mat);m.position.set(...pos);scene.add(m);owned.push(m);return m;
 };
 const metal=(c,em=0x000000,ei=0)=>new THREE.MeshStandardMaterial({color:c,metalness:.46,roughness:.49,emissive:em,emissiveIntensity:ei});
 const architectural=[];
 // Architectural backdrop framing the core rather than enclosing it in black.
 for(const side of [-1,1]){
  const c=add(new THREE.BoxGeometry(.18,2.8,.20),metal(0x44556b,side<0?0x3b2460:0x124b43,.42),[side*2.44,-.02,-2.35]);
  c.rotation.y=side*.08;architectural.push(c);
  for(const y of [-.97,1.17])architectural.push(add(new THREE.BoxGeometry(.38,.05,.28),metal(0x637b8b),[side*2.44,y,-2.26]));
  architectural.push(add(new THREE.BoxGeometry(.025,1.9,.05),metal(side<0?0x7d62a5:0x4c9b83,side<0?0x6340aa:0x1a987a,.85),[side*2.29,-.02,-2.12]));
 }
 for(const y of [-1.13,1.48])architectural.push(add(new THREE.BoxGeometry(5.18,.038,.10),metal(0x617185,0x243747,.24),[0,y,-3.34]));
 // Small secondary concentric core: bright mineral-white center and violet/green optical shells.
 const nucleus=add(new THREE.IcosahedronGeometry(.061,2),new THREE.MeshBasicMaterial({color:0xf4fff7}),[0,.06,.34]);
 const glowA=add(new THREE.SphereGeometry(.24,26,16),new THREE.MeshBasicMaterial({color:0x7b6dff,transparent:true,opacity:.12,depthWrite:false,blending:THREE.AdditiveBlending}),[0,.06,.31]);
 const glowB=add(new THREE.SphereGeometry(.155,24,14),new THREE.MeshBasicMaterial({color:0x6cffe0,transparent:true,opacity:.19,depthWrite:false,blending:THREE.AdditiveBlending}),[0,.06,.33]);
 const innerRings=[];
 for(let j=0;j<3;j++){
  const tor=add(new THREE.TorusGeometry(.33+j*.09,.008,5,80),new THREE.MeshBasicMaterial({color:j===1?0x70efc9:0x957be5,transparent:true,opacity:.52,blending:THREE.AdditiveBlending,depthWrite:false}),[0,.06,.25]);
  tor.rotation.set(.25+j*.68,.65+j*.50,.16+j*.56);innerRings.push(tor);
 }
 // Subtle true-3D containment rim: readable sphere silhouette without a wireframe cage.
 const boundary=[];
 for(const [radius,tilt,opacity,color] of [[1.11,.09,.21,0x7dd6c4],[1.05,.76,.105,0xb0a0ef]]){
  const m=add(new THREE.TorusGeometry(radius,.0055,5,112),new THREE.MeshBasicMaterial({color,transparent:true,opacity,blending:THREE.AdditiveBlending,depthWrite:false}),[0,.06,.12]);
  m.rotation.x=tilt;boundary.push(m);
 }
 // Eight distinct asymmetrical plasma returns: anchored near the outer shell,
 // curve towards the core and return nearby, never extend as mirror-image cables to pillars.
 const curves=[];
 for(let i=0;i<8;i++){
  const a=i*2.3999632297+.26,base=.67+Math.sin(i*4.3)*.055;
  const pt=(ang,r,z,yOff=0)=>new THREE.Vector3(Math.cos(ang)*r,Math.sin(ang)*r*.84+yOff,z);
  const path=new THREE.CatmullRomCurve3([
   pt(a,base,.26),
   pt(a+.12,.74,.29),
   pt(a+.27,.84,.24),
   pt(a+.43,.79,.27),
   pt(a+.66,.69,.22)
  ]);
  const tint=[0x82f3d5,0xae8dfc,0x68d7f0,0x94e0cc][i%4];
  const m=add(new THREE.TubeGeometry(path,58,.006+(i%3)*.002,6,false),new THREE.MeshBasicMaterial({
   color:tint,transparent:true,opacity:.42,blending:THREE.AdditiveBlending,depthWrite:false,depthTest:true
  }),[0,0,0]);
  m.userData.flowIndex=i;curves.push(m);
 }
 // Depth-sorted glints; small and non-square points in the distance.
 const positions=new Float32Array(36*3);
 for(let i=0;i<36;i++){
  const a=i*2.39996323,r=.77+.27*Math.sin(i*4.7);
  positions[i*3]=Math.cos(a)*r;
  positions[i*3+1]=.06+Math.sin(a)*r*.90;
  positions[i*3+2]=.11+.37*Math.sin(i*1.81);
 }
 const dotsGeo=new THREE.BufferGeometry();dotsGeo.setAttribute('position',new THREE.BufferAttribute(positions,3));
 const dots=new THREE.Points(dotsGeo,new THREE.ShaderMaterial({
  transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
  uniforms:{uOpacity:{value:.5},uTime:{value:0}},
  vertexShader:'uniform float uTime; varying float vPulse; void main(){vec4 v=modelViewMatrix*vec4(position,1.0); gl_Position=projectionMatrix*v; gl_PointSize=clamp(17.0/max(1.0,-v.z),1.8,4.0);vPulse=.76+.24*sin(uTime*.9+position.x*14.0);}',
  fragmentShader:'precision mediump float; uniform float uOpacity; varying float vPulse; void main(){ vec2 p=gl_PointCoord*2.0-1.0;float alpha=exp(-dot(p,p)*5.8)*uOpacity*vPulse; gl_FragColor=vec4(mix(vec3(.63,.48,.96),vec3(.62,1.0,.84),gl_PointCoord.x),alpha);}'
 }));
 scene.add(dots);owned.push(dots);
 let currentTier=3,active=8;const opacities=[.08,.12,.17,.21];
 const apply=tier=>{
  currentTier=tier;active=[2,3,5,8][tier];
  curves.forEach((m,i)=>{m.visible=i<active;m.material.opacity=i<active?opacities[tier]:0;});
  dots.geometry.setDrawRange(0,[6,12,24,36][tier]);
  dots.material.uniforms.uOpacity.value=[.15,.28,.43,.58][tier];
  architectural.forEach(m=>m.visible=tier>=1);
  nucleus.visible=true;glowA.visible=glowB.visible=tier>=1;
  innerRings.forEach((m,i)=>m.visible=tier>=2||i===0&&tier===1);
  boundary.forEach((m,i)=>m.visible=tier>=2||i===0&&tier===1);
 };
 return {
  applyTier:apply,
  frame:t=>{
   dots.material.uniforms.uTime.value=t;
   innerRings.forEach((m,i)=>{m.rotation.y+=(i%2?-.0008:.0007);});
   glowA.material.opacity=.08+.019*Math.sin(t*.8);
   glowB.material.opacity=.12+.025*Math.sin(t*.67+1);
   for(let i=0;i<active;i++)curves[i].material.opacity=opacities[currentTier]*(.81+.19*Math.sin(t*1.14+i*1.7));
  },
  getFlowCount:()=>active,getMoteCount:()=>[6,12,24,36][currentTier]
 };
}
