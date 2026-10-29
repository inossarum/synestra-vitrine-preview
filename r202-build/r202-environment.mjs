export function createCinematicEnvironment(THREE, scene, {violet,green,core}) {
 const owned=[],l=[];let dust;
 const mat=(c,roughness=.59,metalness=.69,emissive=0x000000,emissiveIntensity=0)=>new THREE.MeshStandardMaterial({color:c,roughness,metalness,emissive,emissiveIntensity});
 const floor=mat(0x253342,.67,.61),dark=mat(0x172431,.67,.61),wall=mat(0x1d2b3b,.76,.43),silver=mat(0x526473,.39,.76);
 const violetTrim=mat(0x30273b,.57,.62,violet.getHex(),.07),greenTrim=mat(0x1f3330,.57,.62,green.getHex(),.07);
 const add=(geo,m,p,r=[0,0,0],cast=false)=>{
  const o=new THREE.Mesh(geo,m);o.position.set(...p);o.rotation.set(...r);o.castShadow=cast;o.receiveShadow=true;scene.add(o);owned.push(o);return o;};
 add(new THREE.PlaneGeometry(26,45),floor,[0,-1.49,-7],[-Math.PI/2,0,0]);
 add(new THREE.BoxGeometry(14,8,.22),wall,[0,.14,-10]);
 for(const side of [-1,1])add(new THREE.BoxGeometry(.24,7,15),dark,[side*5.9,.12,-4.4]);
 add(new THREE.BoxGeometry(13,.2,18),dark,[0,3.9,-5.1]);
 for(let i=0;i<5;i++){
  const z=-.7-2*i,height=3.1+.19*i,width=.76+.045*(i%2),x=3.75+.29*i;
  for(const side of [-1,1]){
   add(new THREE.BoxGeometry(width,height,.27),dark,[side*x,-.11,z],[0,side*(i%2?-.085:.065),side*.065]);
   add(new THREE.BoxGeometry(.036,height*.87,.038),side<0?violetTrim:greenTrim,[side*(x-width*.51),-.11,z+.15]);
   add(new THREE.BoxGeometry(.09,.065,x-.25),silver,[side*(x*.48),2.48,z-.045]);
  }
 }
 for(const x of [-2.9,-1.95,1.95,2.9])add(new THREE.BoxGeometry(.014,.009,16),silver,[x,-1.476,-4.25]);
 for(let i=0;i<7;i++)add(new THREE.BoxGeometry(5.8,.008,.015),dark,[0,-1.474,-1.6-i*1.37]);
 add(new THREE.BoxGeometry(2.58,.115,1.77),mat(0x324454,.53,.7),[0,-1.365,-.18],[0,0,0],true);
 add(new THREE.BoxGeometry(2.32,.011,1.51),mat(0x1a2937,.63,.59),[0,-1.3,-.18]);
 const v=new THREE.PointLight(violet,2.3,7,2),g=new THREE.PointLight(green,2,7,2);
 v.position.set(-.78,-.6,-.36);g.position.set(.79,-.62,-.36);scene.add(v,g);l.push(v,g);
 function setTier(tier){
  if(tier<2){if(dust){scene.remove(dust);dust.geometry.dispose();dust.material.dispose();dust=null;}return;}
  if(dust)return;
  const n=tier===2?95:220,p=new Float32Array(n*3);let seed=0x52a17;
  const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
  for(let i=0;i<n;i++){p[3*i]=(rand()-.5)*9;p[3*i+1]=rand()*3.5-1.2;p[3*i+2]=-rand()*11+1.2;}
  const geom=new THREE.BufferGeometry();geom.setAttribute('position',new THREE.BufferAttribute(p,3));
  dust=new THREE.Points(geom,new THREE.PointsMaterial({color:0x9fcbbb,size:.018,transparent:true,opacity:.22,depthWrite:false,sizeAttenuation:true}));
  scene.add(dust);
 }
 function update(t,gain){const pulse=Math.sin(t*.75);v.intensity=2.2*gain*(1+.06*pulse);g.intensity=2*gain*(1-.06*pulse);if(dust)dust.rotation.y=Math.sin(t*.12)*.015;}
 function dispose(){for(const light of l)scene.remove(light);for(const o of owned){scene.remove(o);o.geometry.dispose();}
  for(const m of new Set(owned.map(x=>x.material)))m.dispose();
  if(dust){scene.remove(dust);dust.geometry.dispose();dust.material.dispose();}}
 return {setTier,update,dispose,meshes:owned.length};
}