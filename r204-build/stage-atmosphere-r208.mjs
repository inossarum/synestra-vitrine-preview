/* R208 compact display chamber — original real 3D volumes and restrained depth fog.
 * Single renderer and scene; no raymarch, postprocessing, textures or shadow maps. */
export function installChamberAtmosphere({THREE,scene,owned,camera}){
 const add=(geometry,material,x,y,z)=>{
  const mesh=new THREE.Mesh(geometry,material);mesh.position.set(x,y,z);scene.add(mesh);owned.push(mesh);return mesh;
 };
 // Faceted violet/green gradient back wall, no bloom or extra scene.
 const wallGeo=new THREE.PlaneGeometry(5.8,3.55,12,5);
 const p=wallGeo.attributes.position,colors=[];
 for(let i=0;i<p.count;i++){
  const x=p.getX(i)/2.9,y=p.getY(i)/1.775,r=Math.min(1,Math.sqrt(x*x*.72+y*y*.55));
  const side=(x+1)/2,glow=Math.pow(1-r,.6)*.65;
  colors.push(.029+(.09*(1-side)+.024*side)*glow,.048+(.035*(1-side)+.104*side)*glow,.085+(.12*(1-side)+.06*side)*glow);
 }
 wallGeo.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));
 const wall=add(wallGeo,new THREE.ShaderMaterial({vertexColors:true,transparent:true,depthWrite:false,depthTest:true,
  vertexShader:'varying vec2 vUv;varying vec3 vColor;void main(){vUv=uv;vColor=color;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
  fragmentShader:'precision mediump float;varying vec2 vUv;varying vec3 vColor;void main(){vec2 p=(vUv-.5)*vec2(1.06,.78);float a=1.0-smoothstep(.31,.55,length(p));a*=smoothstep(.00,.24,vUv.y)*(1.0-smoothstep(.76,1.0,vUv.y));gl_FragColor=vec4(vColor*.72,a*.80);}'
 }),0,-.04,-3.79);
 const trim=new THREE.MeshBasicMaterial({color:0x324657}),lightTrim=new THREE.MeshBasicMaterial({color:0x43586b});
 const accentV=new THREE.MeshBasicMaterial({color:0x594f80}),accentG=new THREE.MeshBasicMaterial({color:0x3a7669});
 const detail=[];
 for(const side of [-1,1]){
  const sx=side*2.68;
  detail.push(add(new THREE.BoxGeometry(.08,3.18,.19),trim,sx,-.04,-3.56));
  detail.push(add(new THREE.BoxGeometry(.013,2.52,.015),side<0?accentV:accentG,sx-side*.11,-.10,-3.38));
  detail.push(add(new THREE.BoxGeometry(.70,2.80,.10),new THREE.MeshBasicMaterial({color:side<0?0x181e33:0x102b2b}),side*2.10,-.09,-3.64));
  for(const y of [-1.13,-.35,.43,1.20])
   detail.push(add(new THREE.BoxGeometry(.67,.014,.018),lightTrim,side*2.10,y,-3.56));
  detail.push(add(new THREE.BoxGeometry(.55,.055,.16),trim,side*2.15,-1.43,-3.30));
 }
 for(const y of [1.59,-1.49])detail.push(add(new THREE.BoxGeometry(5.44,.055,.18),lightTrim,0,y,-3.42));
 // One camera-facing ultra-light lower mist sheet, bounded around pedestal.
 const uniforms={uTime:{value:0},uStrength:{value:.18}};
 const curtain=add(new THREE.PlaneGeometry(3.8,1.0),new THREE.ShaderMaterial({
  uniforms,transparent:true,depthWrite:false,depthTest:true,side:THREE.DoubleSide,toneMapped:false,
  vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
  fragmentShader:'precision mediump float;varying vec2 vUv;uniform float uTime,uStrength;void main(){vec2 p=vUv-.5;float center=1.0-smoothstep(.28,.54,abs(p.x));float band=smoothstep(.01,.53,vUv.y)*(1.0-smoothstep(.45,.98,vUv.y));float wave=.86+.14*sin(p.x*9.0+uTime*.17)*sin(vUv.y*8.0-uTime*.12);float alpha=center*band*uStrength*wave;vec3 violet=vec3(.31,.27,.43);vec3 mint=vec3(.25,.48,.41);gl_FragColor=vec4(mix(violet,mint,smoothstep(-.45,.45,p.x)),alpha);}'
 }),0,-1.11,1.06);
 curtain.renderOrder=3;curtain.quaternion.copy(camera.quaternion);
 const applyTier=tier=>{
  wall.visible=tier>=1;detail.forEach(x=>x.visible=tier>=2);
  curtain.visible=tier>=1;
  uniforms.uStrength.value=[0,.15,.30,.48][tier];
 };
 return {
  applyTier,
  frame:t=>{if(curtain.visible){uniforms.uTime.value=t;curtain.quaternion.copy(camera.quaternion);}},
  getCurtainStrength:()=>uniforms.uStrength.value
 };
}
