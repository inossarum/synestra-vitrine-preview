/* R209: visible physical nucleus restored inside the existing Three.js Core.
 * No extra renderer, texture, network resource or offscreen pass. */
export function installCoreNucleus({THREE,scene,owned,uniforms}){
 const group=new THREE.Group();group.position.set(0,.055,.025);scene.add(group);
 const add=(geo,material)=>{
  const mesh=new THREE.Mesh(geo,material);group.add(mesh);owned.push(mesh);return mesh;
 };
 const shared={uTime:uniforms.uLabTime,uCore:uniforms.uEnergyCore,
  uViolet:uniforms.uEnergyA,uMint:uniforms.uEnergyB};
 const vertex=`varying vec3 vNormal,vPosition;
  void main(){vNormal=normalize(normalMatrix*normal);vPosition=position;
   gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`;
 const body=`uniform float uTime;uniform vec3 uCore,uViolet,uMint;
  varying vec3 vNormal,vPosition;
  void main(){
   vec3 p=vPosition;float t=uTime;
   float thread=sin(p.x*39.0+sin(p.y*19.0-t*.65)*2.2)*
                sin(p.y*43.0+t*.76+p.z*14.0);
   float ridges=pow(1.0-abs(thread),5.0);
   float rim=pow(1.0-abs(dot(normalize(vNormal),vec3(0.0,0.0,1.0))),1.8);
   vec3 tint=mix(uViolet,uMint,.5+.5*sin(p.x*13.0+p.y*8.0+t*.42));
   vec3 energy=mix(tint*.67,uCore,.21+.55*ridges);
   energy+=uCore*(.07+.24*rim+.08*sin(t*1.3));
   gl_FragColor=vec4(energy,1.0);
  }`;
 const heart=add(new THREE.IcosahedronGeometry(.205,3),new THREE.ShaderMaterial({
  uniforms:shared,vertexShader:vertex,fragmentShader:body,
  transparent:false,depthTest:true,depthWrite:true,toneMapped:false
 }));
 const haloVars={...shared,uHaloStrength:{value:.22}};
 const halo=add(new THREE.SphereGeometry(.305,24,16),new THREE.ShaderMaterial({
  uniforms:haloVars,vertexShader:vertex,
  fragmentShader:`uniform float uTime,uHaloStrength;uniform vec3 uCore,uViolet,uMint;
   varying vec3 vNormal,vPosition;
   void main(){float f=pow(1.0-abs(dot(normalize(vNormal),vec3(0.0,0.0,1.0))),3.0);
    vec3 c=mix(uViolet,uMint,.5+.5*sin(uTime*.42+vPosition.y*8.0));
    gl_FragColor=vec4(mix(c,uCore,.34),f*uHaloStrength);}`,
  transparent:true,depthTest:true,depthWrite:false,
  blending:THREE.AdditiveBlending,toneMapped:false
 }));
 const orbit=(hex,tilt)=>{const m=add(new THREE.TorusGeometry(.268,.006,4,64),
  new THREE.MeshBasicMaterial({color:hex,transparent:true,opacity:.42,
   blending:THREE.AdditiveBlending,depthTest:true,depthWrite:false}));
  m.rotation.set(tilt,.38,tilt*.3);return m;};
 const violet=orbit(0x9563cf,.94),mint=orbit(0x66d9bc,-.71);
 return {
  applyTier(tier){halo.visible=tier>=1;haloVars.uHaloStrength.value=[0,.14,.20,.27][tier];
   violet.visible=tier>=1;mint.visible=tier>=2;},
  frame(t){heart.rotation.y=t*.19;heart.rotation.x=.09*Math.sin(t*.43);
   halo.rotation.y=-t*.08;violet.rotation.y=t*.17;mint.rotation.y=-t*.14;}
 };
}
