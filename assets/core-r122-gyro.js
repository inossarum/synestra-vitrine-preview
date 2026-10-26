/* Synestra R122 — isolated WebGL mesh laboratory. No external imports.
 * The live R121 electric sphere remains untouched. Fallback is explicit.
 */
(()=>{
'use strict';
const scene=document.querySelector('.core-r108-stage');
const plasma=scene?.querySelector('.core-r109-canvas');
const canvas=scene?.querySelector('.core-r122-metal-canvas');
// SiteForge 3D Lab V1: bounded, shareable scene preset; no backend or storage.
if(!scene||!plasma||!canvas)return;
const defaults=Object.freeze({width:1,depth:1,speed:1,yaw:0,pitch:0,material:'steel',roughness:.30,warmth:.62,exposure:1,paused:false});
const params={...defaults};
const status=document.getElementById('sf3d-status');
const report=(message,kind='info')=>{if(status){status.textContent=message;status.setAttribute('data-state',kind);}};
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const snapshot=()=>({schema:'synestra.siteforge.3d-preset.v1',config:{...params}});
let refresh=()=>{};
const configure=input=>{
 if(!input||typeof input!=='object'||Array.isArray(input))return snapshot();
 for(const [name,min,max] of [['width',.65,1.5],['depth',.65,1.8],['speed',0,3],['yaw',-55,55],['pitch',-55,55],['roughness',.06,1],['warmth',0,1],['exposure',.6,1.7]])
   if(Object.hasOwn(input,name)&&typeof input[name]==='number'&&Number.isFinite(input[name]))params[name]=clamp(input[name],min,max);
 if(['steel','graphite','gold'].includes(input.material))params.material=input.material;
 if(typeof input.paused==='boolean')params.paused=input.paused;
 refresh();return snapshot();
};
window.SynestraSiteForge3D=Object.freeze({snapshot,configure,reset:()=>configure(defaults)});
if(matchMedia('(prefers-reduced-motion: reduce)').matches){report('Mode mouvement réduit : aperçu fixe et export disponibles.','fallback');return;}
const gl=canvas.getContext('webgl',{alpha:true,antialias:true,depth:true,premultipliedAlpha:false,preserveDrawingBuffer:false,powerPreference:'low-power'});
if(!gl){report('WebGL indisponible sur cet appareil : aperçu 3D désactivé.','fallback');return;}
report('GPU détecté. Initialisation de la géométrie 3D…');
const vertex='attribute vec3 aPosition,aNormal;attribute float aBand;uniform mat3 basis;uniform vec2 resolution;uniform float centerOffset;varying vec3 vN,vLocal;varying float vBand;void main(){vec3 w=basis*aPosition;vN=normalize(basis*aNormal);vLocal=aPosition;vBand=aBand;gl_Position=vec4(w.x/(resolution.x/max(resolution.y,1.)),w.y-centerOffset,-w.z/1.45,1.);}';
const fragment="#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nvarying vec3 vN,vLocal;\nvarying float vBand;\nuniform vec3 uTint;\nuniform float uRoughness,uWarmth,uExposure;\nconst float PI=3.14159265359;\nfloat sat(float x){return clamp(x,0.,1.);}\nvec3 fresnelSchlick(float theta,vec3 f0){\n return f0+(1.-f0)*pow(1.-sat(theta),5.);\n}\nfloat distributionGGX(float ndh,float rough){\n float a=max(.06,rough*rough),a2=a*a;\n float d=ndh*ndh*(a2-1.)+1.;\n return a2/max(PI*d*d,.0001);\n}\nfloat geometrySmith(float ndv,float ndl,float rough){\n float k=pow(rough+1.,2.)/8.;\n float gv=ndv/max(ndv*(1.-k)+k,.001);\n float gl=ndl/max(ndl*(1.-k)+k,.001);\n return gv*gl;\n}\nvec3 studioBRDF(vec3 n,vec3 v,vec3 l,vec3 radiance,vec3 f0,float rough){\n vec3 h=normalize(v+l);\n float nl=sat(dot(n,l)),nv=sat(dot(n,v)),nh=sat(dot(n,h)),hv=sat(dot(h,v));\n float D=distributionGGX(nh,rough),G=geometrySmith(nv,nl,rough);\n vec3 F=fresnelSchlick(hv,f0);\n return (D*G*F/max(4.*nv*nl,.002))*nl*radiance;\n}\nvec3 studioEnvironment(vec3 reflected,float rough,float warmth){\n // Baked-style procedural softboxes in reflection space: no downloaded HDRI.\n float soft=.055+rough*.29;\n float cool=exp(-pow((reflected.x+.43)/soft,2.));\n float warm=exp(-pow((reflected.x-.55)/(soft*.90),2.));\n cool*=smoothstep(-.82,.46,reflected.y);\n warm*=smoothstep(-.65,.55,-reflected.y);\n float horizon=pow(1.-abs(reflected.y),3.);\n float overhead=sat(reflected.y*.85+.24);\n return vec3(.055,.090,.15)+vec3(.33,.57,.87)*cool*1.95+\n        vec3(1.0,.48,.16)*warm*warmth*1.85+\n        vec3(.085,.15,.26)*overhead+vec3(.13,.17,.25)*horizon;\n}\nvec3 tonemapACES(vec3 x){\n return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14),0.,1.);\n}\nvoid main(){\n vec3 n=normalize(vN),v=vec3(0.,0.,1.);\n float rough=clamp(uRoughness,.06,1.);\n float metalRough=max(.10,rough*.78);\n float ang=atan(vLocal.y,vLocal.x);\n float tinyGrain=sin(ang*397.+vLocal.z*71.+vBand*29.);\n float brushed=.5+.5*sin(ang*1239.+vLocal.z*43.);\n float faceted=.5+.5*cos(vBand*PI*8.);\n float micro=clamp(.94+.055*tinyGrain+.025*brushed, .85,1.05);\n vec3 f0=clamp(uTint*micro,0.,.97);\n // Physically motivated two-light microfacet specular with a rich procedural studio environment.\n vec3 L0=normalize(vec3(-.52,.65,.83)),L1=normalize(vec3(.68,-.26,.79));\n vec3 colour=vec3(.016,.024,.039);\n colour+=studioBRDF(n,v,L0,vec3(3.0,3.6,4.9),f0,metalRough);\n colour+=studioBRDF(n,v,L1,vec3(4.2,2.24,.92)*uWarmth,f0,metalRough);\n vec3 reflected=reflect(-v,n);\n float nv=sat(dot(n,v));\n vec3 fresnel=fresnelSchlick(nv,f0);\n colour+=studioEnvironment(reflected,rough,uWarmth)*fresnel*(.86-.20*rough);\n // Chamfer and inner steelwork receive precise dark edge relief, not cartoon outlines.\n float edgeShade=mix(.83,1.05,faceted);\n colour*=edgeShade;\n colour+=vec3(.16,.23,.32)*pow(1.-nv,4.)*.35;\n colour=tonemapACES(max(colour,vec3(0.))*uExposure);\n colour=pow(colour,vec3(.94));\n gl_FragColor=vec4(colour,1.);\n}";
const depthVertex='attribute vec3 aPosition;uniform vec2 resolution;uniform float centerOffset;void main(){gl_Position=vec4(aPosition.x/(resolution.x/max(resolution.y,1.)),aPosition.y-centerOffset,-aPosition.z/1.45,1.);}';
const depthFragment='precision mediump float;void main(){gl_FragColor=vec4(0.);}';
const compile=(type,source)=>{const s=gl.createShader(type);if(!s)return null;gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){console.warn('Synestra R122 WebGL shader unavailable');gl.deleteShader(s);return null;}return s;};
const link=(v,f)=>{const a=compile(gl.VERTEX_SHADER,v),b=compile(gl.FRAGMENT_SHADER,f);if(!a||!b)return null;const p=gl.createProgram();gl.attachShader(p,a);gl.attachShader(p,b);gl.linkProgram(p);gl.deleteShader(a);gl.deleteShader(b);return gl.getProgramParameter(p,gl.LINK_STATUS)?p:null;};
const metalProgram=link(vertex,fragment),depthProgram=link(depthVertex,depthFragment);
if(!metalProgram||!depthProgram){report('Compilation GPU des shaders refusée : aperçu de secours conservé.','error');return;}
// R125: high-resolution extruded annulus with precision bevels: 256 segments,
// flat face normals, exposed sidewalls, four chamfers, NOT a tube or screen band.
const buildRing=(major,w,h)=>{
 const bevel=Math.min(w,h)*.22;const out=[],corners=[[-w+bevel,-h],[-w,-h+bevel],[-w,h-bevel],[-w+bevel,h],[w-bevel,h],[w,h-bevel],[w,-h+bevel],[w-bevel,-h]];
 for(let j=0;j<256;j++){const t=j*6.283185307179586/256,tn=(j+1)*6.283185307179586/256;
  for(let k=0;k<8;k++){const a=corners[k],b=corners[(k+1)%8],dr=b[0]-a[0],dz=b[1]-a[1],len=Math.hypot(dr,dz),nr=-dz/len,nz=dr/len;
   const point=(ang,q)=>{const x=Math.cos(ang),y=Math.sin(ang),r=major+q[0];out.push(r*x,r*y,q[1],nr*x,nr*y,nz,(k+.5)/8);};
   point(t,a);point(t,b);point(tn,a);point(t,b);point(tn,b);point(tn,a);
  }
 }
 return new Float32Array(out);
};
const buildSphere=()=>{const out=[],R=.69;const point=(u,v)=>[R*Math.sin(v)*Math.cos(u),R*Math.sin(v)*Math.sin(u),R*Math.cos(v)];
 for(let i=0;i<24;i++){const a=i*Math.PI/24,b=(i+1)*Math.PI/24;for(let j=0;j<48;j++){const c=j*2*Math.PI/48,d=(j+1)*2*Math.PI/48;out.push(...point(c,a),...point(c,b),...point(d,a),...point(d,a),...point(c,b),...point(d,b));}}
 return new Float32Array(out);
};
const sphere=buildSphere(),sphereBuffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,sphereBuffer);gl.bufferData(gl.ARRAY_BUFFER,sphere,gl.STATIC_DRAW);
const rings=[
 {major:.89,w:.046,h:.037,speed:6.283185/13,axis:[.248,-.968,0.],normal:[.86,.22,.46],phase:-.64},
 {major:1.01,w:.042,h:.035,speed:-6.283185/17,axis:[0.,.509,-.861],normal:[-.58,.71,.42],phase:1.24},
 {major:1.14,w:.040,h:.033,speed:6.283185/20,axis:[-.417,0.,.909],normal:[.72,-.62,.33],phase:2.37}
].map(r=>{const mesh=buildRing(r.major,r.w*params.width,r.h*params.depth),buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,mesh,gl.STATIC_DRAW);return {...r,buffer,count:mesh.length/7};});
const norm=a=>{const k=Math.hypot(...a);return a.map(n=>n/k);};
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const rotate=(v,k,t)=>{const c=Math.cos(t),s=Math.sin(t),z=cross(k,v),d=dot(k,v)*(1-c);return v.map((x,i)=>x*c+z[i]*s+k[i]*d);};
const m={pos:gl.getAttribLocation(metalProgram,'aPosition'),normal:gl.getAttribLocation(metalProgram,'aNormal'),band:gl.getAttribLocation(metalProgram,'aBand'),basis:gl.getUniformLocation(metalProgram,'basis'),res:gl.getUniformLocation(metalProgram,'resolution'),offset:gl.getUniformLocation(metalProgram,'centerOffset'),tint:gl.getUniformLocation(metalProgram,'uTint'),roughness:gl.getUniformLocation(metalProgram,'uRoughness'),warmth:gl.getUniformLocation(metalProgram,'uWarmth'),exposure:gl.getUniformLocation(metalProgram,'uExposure')};
const d={pos:gl.getAttribLocation(depthProgram,'aPosition'),res:gl.getUniformLocation(depthProgram,'resolution'),offset:gl.getUniformLocation(depthProgram,'centerOffset')};
let active=true,visible=false,frame=0,last=0,elapsed=0,drawCount=0,lastFrame=0;
let cachedWidth=params.width,cachedDepth=params.depth;
const materials={steel:[.69,.76,.83],graphite:[.34,.40,.47],gold:[.83,.66,.34]};
const remesh=()=>{
 if(cachedWidth===params.width&&cachedDepth===params.depth)return;
 for(const ring of rings){const mesh=buildRing(ring.major,ring.w*params.width,ring.h*params.depth);
   gl.bindBuffer(gl.ARRAY_BUFFER,ring.buffer);gl.bufferData(gl.ARRAY_BUFFER,mesh,gl.STATIC_DRAW);
   ring.count=mesh.length/7;
 }
 cachedWidth=params.width;cachedDepth=params.depth;
};

const render=clock=>{
 frame=0;if(!active||!visible||document.hidden||!scene.hasAttribute('data-core-ready'))return;
 const width=plasma.width,height=plasma.height;if(width<4||height<4)return;
 if(lastFrame&&clock-lastFrame<32){if(visible&&!document.hidden&&!params.paused)frame=requestAnimationFrame(render);return;}
 lastFrame=clock;
 if(last&&!params.paused)elapsed+=Math.min((clock-last)/1000,.05)*params.speed;last=clock;
 remesh();
 if(canvas.width!==width||canvas.height!==height){canvas.width=width;canvas.height=height;}
 gl.viewport(0,0,width,height);gl.clearColor(0,0,0,0);gl.clearDepth(1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
 gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.disable(gl.CULL_FACE);gl.disable(gl.BLEND);
 // Invisible sphere populates the depth buffer: rear metal is occluded.
 gl.colorMask(false,false,false,false);gl.useProgram(depthProgram);gl.bindBuffer(gl.ARRAY_BUFFER,sphereBuffer);
 gl.enableVertexAttribArray(d.pos);gl.vertexAttribPointer(d.pos,3,gl.FLOAT,false,0,0);gl.uniform2f(d.res,width,height);gl.uniform1f(d.offset,.08);gl.drawArrays(gl.TRIANGLES,0,sphere.length/3);
 gl.disableVertexAttribArray(d.pos);gl.colorMask(true,true,true,true);
 gl.useProgram(metalProgram);gl.uniform2f(m.res,width,height);gl.uniform1f(m.offset,.08);gl.uniform3fv(m.tint,new Float32Array(materials[params.material]));gl.uniform1f(m.roughness,params.roughness);gl.uniform1f(m.warmth,params.warmth);gl.uniform1f(m.exposure,params.exposure);
 for(const ring of rings){
  // R125: axis perpendicular to plane normal => physical 360-degree gimbal flip.
  // Each ring completes its full turn at its own period (13/17/20 s).
  const axis=norm(ring.axis),base=norm(ring.normal),N=norm(rotate(base,axis,elapsed*ring.speed+ring.phase));
  const U=norm(cross(Math.abs(N[2])>.91?[0,1,0]:[0,0,1],N)),V=cross(N,U);
  // View transform rotates the *physical* meshes, not flat screen-space ellipses.
  const view=v=>rotate(rotate(v,[0,1,0],params.yaw*Math.PI/180),[1,0,0],params.pitch*Math.PI/180);
  gl.uniformMatrix3fv(m.basis,false,new Float32Array([...view(U),...view(V),...view(N)]));
  gl.bindBuffer(gl.ARRAY_BUFFER,ring.buffer);
  gl.enableVertexAttribArray(m.pos);gl.enableVertexAttribArray(m.normal);gl.enableVertexAttribArray(m.band);
  gl.vertexAttribPointer(m.pos,3,gl.FLOAT,false,28,0);gl.vertexAttribPointer(m.normal,3,gl.FLOAT,false,28,12);gl.vertexAttribPointer(m.band,1,gl.FLOAT,false,28,24);
  gl.drawArrays(gl.TRIANGLES,0,ring.count);
 }
 if(!scene.hasAttribute('data-metal-ready'))scene.setAttribute('data-metal-ready','true');
 if(++drawCount%120===0 && gl.getError()!==gl.NO_ERROR){active=false;scene.removeAttribute('data-metal-ready');report('Erreur du rendu WebGL : retour à la sphère seule.','error');return;}
 if(status?.getAttribute('data-state')!=='ready')report('WebGL actif · trois anneaux en rotation 360° · éclairage métallisé.','ready');
 if(visible&&!document.hidden&&!params.paused)frame=requestAnimationFrame(render);
};
const request=()=>{if(!active||frame||!visible||document.hidden||!scene.hasAttribute('data-core-ready'))return;frame=requestAnimationFrame(render);};
refresh=()=>{last=0;request();};
const io=new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting??false;last=0;if(visible)request();else if(frame){cancelAnimationFrame(frame);frame=0;}},{threshold:.01});io.observe(scene);
const mo=new MutationObserver(()=>request());mo.observe(scene,{attributes:true,attributeFilter:['data-core-ready']});
const ro=new ResizeObserver(()=>request());ro.observe(plasma);
document.addEventListener('visibilitychange',()=>{last=0;request();});
canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();active=false;scene.removeAttribute('data-metal-ready');if(frame)cancelAnimationFrame(frame);report('Contexte graphique perdu : aperçu de secours conservé.','error');io.disconnect();mo.disconnect();ro.disconnect();},{once:true});
request();
})();