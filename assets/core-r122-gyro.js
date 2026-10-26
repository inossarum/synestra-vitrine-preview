/* Synestra R122 — isolated WebGL mesh laboratory. No external imports.
 * The live R121 electric sphere remains untouched. Fallback is explicit.
 */
(()=>{
'use strict';
const scene=document.querySelector('.core-r108-stage');
const plasma=scene?.querySelector('.core-r109-canvas');
const canvas=scene?.querySelector('.core-r122-metal-canvas');
if(!scene||!plasma||!canvas||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
const gl=canvas.getContext('webgl',{alpha:true,antialias:true,depth:true,premultipliedAlpha:false,preserveDrawingBuffer:false,powerPreference:'low-power'});
if(!gl)return;
const vertex='attribute vec3 aPosition,aNormal;attribute float aBand;uniform mat3 basis;uniform vec2 resolution;uniform float centerOffset;varying vec3 vN,vLocal;varying float vBand;void main(){vec3 w=basis*aPosition;vN=normalize(basis*aNormal);vLocal=aPosition;vBand=aBand;gl_Position=vec4(w.x/(resolution.x/max(resolution.y,1.)),w.y-centerOffset,-w.z/1.45,1.);}';
const fragment='precision mediump float;varying vec3 vN,vLocal;varying float vBand;void main(){vec3 n=normalize(vN);vec3 light=normalize(vec3(-.44,.56,1.));float diffuse=max(dot(n,light),0.);float face=abs(n.z);float metal=.16+.48*diffuse+.20*face;float angular=atan(vLocal.y,vLocal.x);float brush=.5+.5*sin(angular*179.+vBand*12.);float spec=pow(max(dot(reflect(-light,n),vec3(0.,0.,1.)),0.),28.);vec3 c=mix(vec3(.14,.18,.24),vec3(.69,.76,.83),clamp(metal+.11*pow(brush,9.),0.,1.));c+=vec3(.31,.30,.28)*spec+.10*(1.-abs(vBand-.5)*2.)*vec3(.40,.46,.51);c+=vec3(.09,.055,.033)*pow(max(dot(n,normalize(vec3(.48,-.16,.86))),0.),35.);gl_FragColor=vec4(clamp(c,0.,1.),1.);}';
const depthVertex='attribute vec3 aPosition;uniform vec2 resolution;uniform float centerOffset;void main(){gl_Position=vec4(aPosition.x/(resolution.x/max(resolution.y,1.)),aPosition.y-centerOffset,-aPosition.z/1.45,1.);}';
const depthFragment='precision mediump float;void main(){gl_FragColor=vec4(0.);}';
const compile=(type,source)=>{const s=gl.createShader(type);if(!s)return null;gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){console.warn('Synestra R122 WebGL shader unavailable');gl.deleteShader(s);return null;}return s;};
const link=(v,f)=>{const a=compile(gl.VERTEX_SHADER,v),b=compile(gl.FRAGMENT_SHADER,f);if(!a||!b)return null;const p=gl.createProgram();gl.attachShader(p,a);gl.attachShader(p,b);gl.linkProgram(p);gl.deleteShader(a);gl.deleteShader(b);return gl.getProgramParameter(p,gl.LINK_STATUS)?p:null;};
const metalProgram=link(vertex,fragment),depthProgram=link(depthVertex,depthFragment);
if(!metalProgram||!depthProgram)return;
// A true extruded annulus: 8 cross-section facets, 144 angular segments,
// flat face normals, exposed sidewalls, four chamfers, NOT a tube or screen band.
const buildRing=(major,w,h)=>{
 const out=[],corners=[[-w+h*.16,-h],[-w,-h+h*.16],[-w,h-h*.16],[-w+h*.16,h],[w-h*.16,h],[w,h-h*.16],[w,-h+h*.16],[w-h*.16,-h]];
 for(let j=0;j<144;j++){const t=j*6.283185307179586/144,tn=(j+1)*6.283185307179586/144;
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
 {major:.89,w:.046,h:.037,speed:6.283185/13,axis:[.90,.10,.42],normal:[.86,.22,.46],phase:-.64},
 {major:1.01,w:.042,h:.035,speed:-6.283185/17,axis:[-.45,.82,.35],normal:[-.58,.71,.42],phase:1.24},
 {major:1.14,w:.040,h:.033,speed:6.283185/20,axis:[.60,-.75,.29],normal:[.72,-.62,.33],phase:2.37}
].map(r=>{const mesh=buildRing(r.major,r.w,r.h),buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,mesh,gl.STATIC_DRAW);return {...r,buffer,count:mesh.length/7};});
const norm=a=>{const k=Math.hypot(...a);return a.map(n=>n/k);};
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const rotate=(v,k,t)=>{const c=Math.cos(t),s=Math.sin(t),z=cross(k,v),d=dot(k,v)*(1-c);return v.map((x,i)=>x*c+z[i]*s+k[i]*d);};
const m={pos:gl.getAttribLocation(metalProgram,'aPosition'),normal:gl.getAttribLocation(metalProgram,'aNormal'),band:gl.getAttribLocation(metalProgram,'aBand'),basis:gl.getUniformLocation(metalProgram,'basis'),res:gl.getUniformLocation(metalProgram,'resolution'),offset:gl.getUniformLocation(metalProgram,'centerOffset')};
const d={pos:gl.getAttribLocation(depthProgram,'aPosition'),res:gl.getUniformLocation(depthProgram,'resolution'),offset:gl.getUniformLocation(depthProgram,'centerOffset')};
let active=true,visible=false,frame=0,last=0,elapsed=0;
const render=clock=>{
 frame=0;if(!active||!visible||document.hidden||!scene.hasAttribute('data-core-ready'))return;
 const width=plasma.width,height=plasma.height;if(width<4||height<4)return;
 if(last)elapsed+=Math.min((clock-last)/1000,.05);last=clock;
 if(canvas.width!==width||canvas.height!==height){canvas.width=width;canvas.height=height;}
 gl.viewport(0,0,width,height);gl.clearColor(0,0,0,0);gl.clearDepth(1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
 gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.disable(gl.CULL_FACE);gl.disable(gl.BLEND);
 // Invisible sphere populates the depth buffer: rear metal is occluded.
 gl.colorMask(false,false,false,false);gl.useProgram(depthProgram);gl.bindBuffer(gl.ARRAY_BUFFER,sphereBuffer);
 gl.enableVertexAttribArray(d.pos);gl.vertexAttribPointer(d.pos,3,gl.FLOAT,false,0,0);gl.uniform2f(d.res,width,height);gl.uniform1f(d.offset,.08);gl.drawArrays(gl.TRIANGLES,0,sphere.length/3);
 gl.disableVertexAttribArray(d.pos);gl.colorMask(true,true,true,true);
 gl.useProgram(metalProgram);gl.uniform2f(m.res,width,height);gl.uniform1f(m.offset,.08);
 for(const ring of rings){
  const axis=norm(ring.axis),base=norm(ring.normal),N=norm(rotate(base,axis,elapsed*ring.speed+ring.phase));
  const U=norm(cross(Math.abs(N[2])>.91?[0,1,0]:[0,0,1],N)),V=cross(N,U);
  gl.uniformMatrix3fv(m.basis,false,new Float32Array([...U,...V,...N]));
  gl.bindBuffer(gl.ARRAY_BUFFER,ring.buffer);
  gl.enableVertexAttribArray(m.pos);gl.enableVertexAttribArray(m.normal);gl.enableVertexAttribArray(m.band);
  gl.vertexAttribPointer(m.pos,3,gl.FLOAT,false,28,0);gl.vertexAttribPointer(m.normal,3,gl.FLOAT,false,28,12);gl.vertexAttribPointer(m.band,1,gl.FLOAT,false,28,24);
  gl.drawArrays(gl.TRIANGLES,0,ring.count);
 }
 if(!scene.hasAttribute('data-metal-ready'))scene.setAttribute('data-metal-ready','true');
 if(visible&&!document.hidden)frame=requestAnimationFrame(render);
};
const request=()=>{if(!active||frame||!visible||document.hidden||!scene.hasAttribute('data-core-ready'))return;frame=requestAnimationFrame(render);};
const io=new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting??false;last=0;if(visible)request();else if(frame){cancelAnimationFrame(frame);frame=0;}},{threshold:.01});io.observe(scene);
const mo=new MutationObserver(()=>request());mo.observe(scene,{attributes:true,attributeFilter:['data-core-ready']});
document.addEventListener('visibilitychange',()=>{last=0;request();});
canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();active=false;scene.removeAttribute('data-metal-ready');if(frame)cancelAnimationFrame(frame);io.disconnect();mo.disconnect();},{once:true});
request();
})();