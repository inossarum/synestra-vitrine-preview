/* Synestra R128 — isolated WebGL PBR + energy laboratory. No external imports.
 * The live R121 electric sphere remains untouched. Fallback is explicit.
 */
(()=>{
'use strict';
const scene=document.querySelector('.core-r108-stage');
const plasma=scene?.querySelector('.core-r109-canvas');
const canvas=scene?.querySelector('.core-r122-metal-canvas');
// SiteForge 3D Lab V1: bounded, shareable scene preset; no backend or storage.
if(!scene||!plasma||!canvas)return;
const defaults=Object.freeze({pulseNature:'electric',quality:'balanced',spread:.6,depthSpread:1,branching:.4,twist:.5,flicker:.25,pulseLength:1,coreRadius:1,seed:7,width:1,depth:1,speed:1,yaw:0,pitch:0,material:'steel',roughness:.30,warmth:.62,exposure:1,anisotropy:.62,imperfection:.38,scratches:.42,edgeWear:.24,energyType:'electric',pulseType:'branching',primaryColor:'#50deff',secondaryColor:'#a378ff',pulseColor:'#d3f8ff',glowColor:'#c0f5ff',pulseCount:8,energySpeed:1,amplitude:1,thickness:.65,turbulence:.48,chaos:.25,glow:1.1,density:1,coreIntensity:1.35,paused:false});
const params={...defaults};
const status=document.getElementById('sf3d-status');
const report=(message,kind='info')=>{if(status){status.textContent=message;status.setAttribute('data-state',kind);}};
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const energyTypes=['plasma','electric','arc','vortex','nebula','flame','crystalline','quantum'];
const pulseTypes=['radial','spiral','branching','wave','burst','orbiting'];
const pulseNatures=['electric','plasma','filament','ribbon','particles','shockwave','crystalline','wisps'];
const qualities=['eco','balanced','high'];
const colourFields=['primaryColor','secondaryColor','pulseColor','glowColor'];
const colourValue=s=>{const v=Number.parseInt(s.slice(1),16);return [(v>>16&255)/255,(v>>8&255)/255,(v&255)/255];};
const snapshot=()=>({schema:'synestra.siteforge.3d-preset.v1',config:{...params}});
let refresh=()=>{};
const configure=input=>{
 if(!input||typeof input!=='object'||Array.isArray(input))return snapshot();
 for(const [name,min,max] of [['width',.15,5],['depth',.15,5],['speed',0,3],['yaw',-55,55],['pitch',-55,55],['roughness',.06,1],['warmth',0,1],['exposure',.6,1.7],['anisotropy',0,1],['imperfection',0,1],['scratches',0,1],['edgeWear',0,1],['pulseCount',1,16],['energySpeed',0,3],['amplitude',0,2],['thickness',.1,2],['turbulence',0,2],['chaos',0,1],['glow',0,2],['density',.1,2],['coreIntensity',0,3],['spread',0,2],['depthSpread',.15,1],['branching',0,1],['twist',0,3],['flicker',0,1],['pulseLength',.2,1.4],['coreRadius',.55,1.18],['seed',0,999]])
   if(Object.hasOwn(input,name)&&typeof input[name]==='number'&&Number.isFinite(input[name]))params[name]=clamp(input[name],min,max);
 if(['steel','graphite','gold'].includes(input.material))params.material=input.material;
 if(energyTypes.includes(input.energyType))params.energyType=input.energyType;
 if(pulseTypes.includes(input.pulseType))params.pulseType=input.pulseType;
 if(pulseNatures.includes(input.pulseNature))params.pulseNature=input.pulseNature;
 if(qualities.includes(input.quality))params.quality=input.quality;
 for(const name of colourFields)if(typeof input[name]==='string'&&/^#[0-9a-fA-F]{6}$/.test(input[name]))params[name]=input[name].toLowerCase();
 params.pulseCount=Math.round(params.pulseCount);params.seed=Math.round(params.seed);
 if(typeof input.paused==='boolean')params.paused=input.paused;
 refresh();return snapshot();
};
window.SynestraSiteForge3D=Object.freeze({snapshot,configure,reset:()=>configure(defaults)});
if(matchMedia('(prefers-reduced-motion: reduce)').matches){report('Mode mouvement réduit : aperçu fixe et export disponibles.','fallback');return;}
const gl=canvas.getContext('webgl',{alpha:true,antialias:true,depth:true,premultipliedAlpha:false,preserveDrawingBuffer:false,powerPreference:'low-power'});
if(!gl){report('WebGL indisponible sur cet appareil : aperçu 3D désactivé.','fallback');return;}
report('GPU détecté. Initialisation de la géométrie 3D…');
const vertex="attribute vec3 aPosition,aNormal;\nattribute float aBand;\nuniform mat3 basis;\nuniform vec2 resolution;\nuniform float centerOffset;\nvarying vec3 vN,vLocal,vWorld,vT;\nvarying float vBand;\nvoid main(){\n vec3 w=basis*aPosition;\n vN=normalize(basis*aNormal);\n vLocal=aPosition;vWorld=w;vBand=aBand;\n vT=normalize(basis*vec3(-aPosition.y,aPosition.x,0.));\n gl_Position=vec4(w.x/(resolution.x/max(resolution.y,1.)),w.y-centerOffset,-w.z/1.45,1.);\n}";
const fragment="#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nvarying vec3 vN,vLocal,vWorld,vT;\nvarying float vBand;\nuniform vec3 uTint,uCoreColor;\nuniform float uRoughness,uWarmth,uExposure,uAnisotropy,uImperfection,uScratches,uEdgeWear,uCoreIntensity,uTime;\nconst float PI=3.14159265359;\nfloat sat(float x){return clamp(x,0.,1.);}\nfloat hash(float x){return fract(sin(x*127.1+14.31)*43758.5453);}\nvec3 fresnelSchlick(float theta,vec3 f0){return f0+(1.-f0)*pow(1.-sat(theta),5.);}\nfloat distributionGGX(float ndh,float rough){\n float a=max(.045,rough*rough),a2=a*a,d=ndh*ndh*(a2-1.)+1.;\n return a2/max(PI*d*d,.0001);\n}\nfloat distributionGGXAniso(vec3 n,vec3 h,vec3 t,vec3 b,float rough,float aniso){\n float a=max(.045,rough*rough);\n float ax=max(.035,a/(1.+2.*aniso)),ay=max(.035,a*(1.+2.*aniso));\n float d=pow(abs(dot(h,t)/ax),2.)+pow(abs(dot(h,b)/ay),2.)+pow(abs(dot(n,h)),2.);\n return 1./max(PI*ax*ay*d*d,.0001);\n}\nfloat geometrySmith(float ndv,float ndl,float rough){\n float k=pow(rough+1.,2.)/8.;\n return ndv/max(ndv*(1.-k)+k,.001)*ndl/max(ndl*(1.-k)+k,.001);\n}\nvec3 studioBRDF(vec3 n,vec3 v,vec3 l,vec3 t,vec3 radiance,vec3 f0,float rough){\n vec3 h=normalize(v+l),b=normalize(cross(n,t));\n float nl=sat(dot(n,l)),nv=sat(dot(n,v)),nh=sat(dot(n,h)),hv=sat(dot(h,v));\n float D=mix(distributionGGX(nh,rough),distributionGGXAniso(n,h,t,b,rough,uAnisotropy),uAnisotropy);\n float G=geometrySmith(nv,nl,rough);\n return D*G*fresnelSchlick(hv,f0)*nl/max(4.*nv*nl,.002)*radiance;\n}\nvec3 studioEnvironment(vec3 reflected,float rough,float warmth){\n float soft=.045+rough*.23;\n float cool=exp(-pow((reflected.x+.43)/soft,2.))*smoothstep(-.82,.46,reflected.y);\n float warm=exp(-pow((reflected.x-.55)/(soft*.90),2.))*smoothstep(-.65,.55,-reflected.y);\n float horizon=pow(1.-abs(reflected.y),3.);\n return vec3(.075,.115,.175)+vec3(.48,.72,1.0)*cool*3.0+\n  vec3(1.,.57,.23)*warm*warmth*2.1+\n  vec3(.14,.22,.34)*sat(reflected.y*.85+.24)+vec3(.13,.17,.25)*horizon;\n}\nvec3 tonemapACES(vec3 x){return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14),0.,1.);}\nvoid main(){\n vec3 n=normalize(vN),v=vec3(0.,0.,1.);\n vec3 t=normalize(vT-n*dot(vT,n));\n float ang=atan(vLocal.y,vLocal.x);\n float brush=sin(ang*1511.+vLocal.z*253.);\n float scratch=step(.988,fract(sin(ang*2321.+vLocal.z*47.)*12345.678));\n float pits=hash(floor(ang*917.)+floor(vLocal.z*219.)*11.);\n float grain=sin(ang*433.+vLocal.z*127.)*sin(ang*271.+vLocal.z*401.);\n float rough=clamp(uRoughness + uImperfection*(grain*.12+(pits-.5)*.14)+uScratches*scratch*.21,.06,1.);\n vec3 f0=clamp(uTint*(.95+grain*uImperfection*.08-scratch*uScratches*.14),0.,.98);\n vec3 L0=normalize(vec3(-.52,.65,.83)),L1=normalize(vec3(.68,-.26,.79));\n vec3 colour=vec3(.022,.034,.05);\n colour+=studioBRDF(n,v,L0,t,vec3(4.4,5.6,7.4),f0,rough);\n colour+=studioBRDF(n,v,L1,t,vec3(5.0,2.7,1.2)*uWarmth,f0,rough);\n // Central point emitter: energy at origin lights actual inner surfaces.\n vec3 coreDir=normalize(-vWorld+vec3(0.,0.,.006));\n float distanceToCore=length(vWorld);\n float corePower=uCoreIntensity*(.86+.14*sin(uTime*2.7));\n vec3 coreRadiance=uCoreColor*corePower*13.0/(.65+distanceToCore*distanceToCore);\n colour+=studioBRDF(n,v,coreDir,t,coreRadiance,f0,rough);\n vec3 reflected=reflect(-v,n);\n float nv=sat(dot(n,v));\n colour+=studioEnvironment(reflected,rough,uWarmth)*fresnelSchlick(nv,f0)*(.89-.19*rough);\n float faceted=.5+.5*cos(vBand*PI*8.);\n colour*=mix(.80,1.08,faceted);\n colour+=uEdgeWear*(1.-faceted)*vec3(.16,.20,.23);\n colour+=vec3(.16,.27,.40)*pow(1.-nv,4.)*.34;\n // Tone-map in linear light, approximate sRGB conversion for display.\n colour=pow(tonemapACES(max(colour,vec3(0.))*uExposure),vec3(1./2.2));\n gl_FragColor=vec4(colour,1.);\n}";
const energyVertex="attribute vec2 aUv;\nvarying vec2 vUv;\nvoid main(){vUv=aUv;gl_Position=vec4(aUv,0.,1.);}";
const energyFragment=window.SynestraSphere3DShaders?.halo||'';
const depthVertex='attribute vec3 aPosition;uniform vec2 resolution;uniform float centerOffset;uniform float uRadius;void main(){vec3 p=aPosition*uRadius;gl_Position=vec4(p.x/(resolution.x/max(resolution.y,1.)),p.y-centerOffset,-p.z/1.45,1.);}';
const depthFragment='precision mediump float;void main(){gl_FragColor=vec4(0.);}';
const compile=(type,source)=>{const s=gl.createShader(type);if(!s)return null;gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){console.warn('Synestra R122 WebGL shader unavailable');gl.deleteShader(s);return null;}return s;};
const link=(v,f)=>{const a=compile(gl.VERTEX_SHADER,v),b=compile(gl.FRAGMENT_SHADER,f);if(!a||!b)return null;const p=gl.createProgram();gl.attachShader(p,a);gl.attachShader(p,b);gl.linkProgram(p);gl.deleteShader(a);gl.deleteShader(b);return gl.getProgramParameter(p,gl.LINK_STATUS)?p:null;};
const sphereVertex=window.SynestraSphere3DShaders?.vertex||'';
const sphereFragment=window.SynestraSphere3DShaders?.fragment||'';
const pulseVertex="attribute vec3 aPosition;attribute vec2 aFadeSeed;\nuniform mat3 uView;uniform vec2 uResolution;varying float vFade,vSeed,vZ;\nvoid main(){\n vec3 xyz=uView*aPosition;\n float perspective=1./(1.+.28*xyz.z);\n gl_Position=vec4(xyz.x*perspective/(uResolution.x/max(uResolution.y,1.)),xyz.y*perspective-.08,-xyz.z/1.45,1.);\n vFade=aFadeSeed.x;vSeed=aFadeSeed.y;vZ=xyz.z;\n}";
const pulseFragment="precision mediump float;\nvarying float vFade,vSeed,vZ;\nuniform vec3 uPulseColor,uSecondaryColor;\nuniform float uPulseNature,uTime,uFlicker,uPass;\nvoid main(){\n float flicker=mix(1.,.70+.30*sin(uTime*9.+vSeed*7.+vZ*17.),uFlicker);\n vec3 beam=mix(uPulseColor,uSecondaryColor,clamp(.15+.35*sin(vSeed*3.+vZ*5.),0.,1.));\n if(uPulseNature>.5&&uPulseNature<1.5)beam=mix(beam,uPulseColor,.65);\n if(uPulseNature>2.5&&uPulseNature<3.5)beam=mix(beam,vec3(1.),.30);\n if(uPulseNature>5.5&&uPulseNature<6.5)beam=mix(beam,uSecondaryColor,.48);\n float depth=smoothstep(-.8,.8,vZ),intensity=vFade*flicker*mix(.46,1.,depth);\n vec3 c=mix(beam*.65,vec3(1.),uPass*.45);\n gl_FragColor=vec4(c,clamp(intensity*mix(.32,.77,uPass),0.,.88));\n}";
const metalProgram=link(vertex,fragment),depthProgram=link(depthVertex,depthFragment),energyProgram=link(energyVertex,energyFragment),pulseProgram=link(pulseVertex,pulseFragment),sphereProgram=link(sphereVertex,sphereFragment);
if(!metalProgram||!depthProgram||!energyProgram||!pulseProgram||!sphereProgram){report('Compilation GPU des shaders refusée : aperçu de secours conservé.','error');return;}
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
 for(let i=0;i<48;i++){const a=i*Math.PI/48,b=(i+1)*Math.PI/48;for(let j=0;j<96;j++){const c=j*2*Math.PI/96,d=(j+1)*2*Math.PI/96;out.push(...point(c,a),...point(c,b),...point(d,a),...point(d,a),...point(c,b),...point(d,b));}}
 return new Float32Array(out);
};
const sphere=buildSphere(),sphereBuffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,sphereBuffer);gl.bufferData(gl.ARRAY_BUFFER,sphere,gl.STATIC_DRAW);
const rings=[
 {major:.89,w:.046,h:.037,speed:6.283185/13,axis:[.248,-.968,0.],normal:[.86,.22,.46],phase:-.64},
 {major:1.01,w:.042,h:.035,speed:-6.283185/17,axis:[0.,.509,-.861],normal:[-.58,.71,.42],phase:1.24},
 {major:1.14,w:.040,h:.033,speed:6.283185/20,axis:[-.417,0.,.909],normal:[.72,-.62,.33],phase:2.37}
].map(r=>{const mesh=buildRing(r.major,r.w*params.depth,r.h*params.width),buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,mesh,gl.STATIC_DRAW);return {...r,buffer,count:mesh.length/7};});
const norm=a=>{const k=Math.hypot(...a);return a.map(n=>n/k);};
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const rotate=(v,k,t)=>{const c=Math.cos(t),s=Math.sin(t),z=cross(k,v),d=dot(k,v)*(1-c);return v.map((x,i)=>x*c+z[i]*s+k[i]*d);};
const m={pos:gl.getAttribLocation(metalProgram,'aPosition'),normal:gl.getAttribLocation(metalProgram,'aNormal'),band:gl.getAttribLocation(metalProgram,'aBand'),basis:gl.getUniformLocation(metalProgram,'basis'),res:gl.getUniformLocation(metalProgram,'resolution'),offset:gl.getUniformLocation(metalProgram,'centerOffset'),tint:gl.getUniformLocation(metalProgram,'uTint'),roughness:gl.getUniformLocation(metalProgram,'uRoughness'),warmth:gl.getUniformLocation(metalProgram,'uWarmth'),exposure:gl.getUniformLocation(metalProgram,'uExposure'),anisotropy:gl.getUniformLocation(metalProgram,'uAnisotropy'),imperfection:gl.getUniformLocation(metalProgram,'uImperfection'),scratches:gl.getUniformLocation(metalProgram,'uScratches'),edgeWear:gl.getUniformLocation(metalProgram,'uEdgeWear'),coreColor:gl.getUniformLocation(metalProgram,'uCoreColor'),coreIntensity:gl.getUniformLocation(metalProgram,'uCoreIntensity'),time:gl.getUniformLocation(metalProgram,'uTime')};
const e=energyProgram?{pos:gl.getAttribLocation(energyProgram,'aUv'),resolution:gl.getUniformLocation(energyProgram,'uResolution'),time:gl.getUniformLocation(energyProgram,'uTime'),energyType:gl.getUniformLocation(energyProgram,'uEnergyType'),pulseType:gl.getUniformLocation(energyProgram,'uPulseType'),pulseCount:gl.getUniformLocation(energyProgram,'uPulseCount'),energySpeed:gl.getUniformLocation(energyProgram,'uEnergySpeed'),amplitude:gl.getUniformLocation(energyProgram,'uAmplitude'),thickness:gl.getUniformLocation(energyProgram,'uThickness'),turbulence:gl.getUniformLocation(energyProgram,'uTurbulence'),chaos:gl.getUniformLocation(energyProgram,'uChaos'),glow:gl.getUniformLocation(energyProgram,'uGlow'),density:gl.getUniformLocation(energyProgram,'uDensity'),coreIntensity:gl.getUniformLocation(energyProgram,'uCoreIntensity'),primary:gl.getUniformLocation(energyProgram,'uPrimaryColor'),secondary:gl.getUniformLocation(energyProgram,'uSecondaryColor'),pulse:gl.getUniformLocation(energyProgram,'uPulseColor'),glowColor:gl.getUniformLocation(energyProgram,'uGlowColor')}:null;
const energyQuad=gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,energyQuad);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
const a={pos:gl.getAttribLocation(pulseProgram,'aPosition'),fadeSeed:gl.getAttribLocation(pulseProgram,'aFadeSeed'),view:gl.getUniformLocation(pulseProgram,'uView'),resolution:gl.getUniformLocation(pulseProgram,'uResolution'),color:gl.getUniformLocation(pulseProgram,'uPulseColor'),secondary:gl.getUniformLocation(pulseProgram,'uSecondaryColor'),nature:gl.getUniformLocation(pulseProgram,'uPulseNature'),time:gl.getUniformLocation(pulseProgram,'uTime'),flicker:gl.getUniformLocation(pulseProgram,'uFlicker'),pass:gl.getUniformLocation(pulseProgram,'uPass')};
const pulseBuffer=gl.createBuffer();
const s3={pos:gl.getAttribLocation(sphereProgram,'aPosition'),view:gl.getUniformLocation(sphereProgram,'uView'),resolution:gl.getUniformLocation(sphereProgram,'uResolution'),radius:gl.getUniformLocation(sphereProgram,'uRadius'),primary:gl.getUniformLocation(sphereProgram,'uPrimary'),secondary:gl.getUniformLocation(sphereProgram,'uSecondary'),glow:gl.getUniformLocation(sphereProgram,'uGlowColor'),time:gl.getUniformLocation(sphereProgram,'uTime'),speed:gl.getUniformLocation(sphereProgram,'uSpeed'),density:gl.getUniformLocation(sphereProgram,'uDensity'),intensity:gl.getUniformLocation(sphereProgram,'uIntensity'),turbulence:gl.getUniformLocation(sphereProgram,'uTurbulence'),exposure:gl.getUniformLocation(sphereProgram,'uExposure')};
const d={pos:gl.getAttribLocation(depthProgram,'aPosition'),res:gl.getUniformLocation(depthProgram,'resolution'),offset:gl.getUniformLocation(depthProgram,'centerOffset'),radius:gl.getUniformLocation(depthProgram,'uRadius')};
let active=true,visible=false,frame=0,last=0,elapsed=0,ringElapsed=0,drawCount=0,lastFrame=0;
let cachedWidth=params.width,cachedDepth=params.depth;
const materials={steel:[.69,.76,.83],graphite:[.34,.40,.47],gold:[.83,.66,.34]};
const viewXYZ=v=>rotate(rotate(v,[0,1,0],params.yaw*Math.PI/180),[1,0,0],params.pitch*Math.PI/180);
const viewBasis=()=>new Float32Array([...viewXYZ([1,0,0]),...viewXYZ([0,1,0]),...viewXYZ([0,0,1])]);
const pulseGeometry=window.SynestraPulseGeometry;
if(!pulseGeometry){report('Géométrie XYZ indisponible : sphère de secours conservée.','error');return;}
const remesh=()=>{
 if(cachedWidth===params.width&&cachedDepth===params.depth)return;
 for(const ring of rings){const mesh=buildRing(ring.major,ring.w*params.depth,ring.h*params.width);
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
 if(last&&!params.paused){const dt=Math.min((clock-last)/1000,.05);elapsed+=dt;ringElapsed+=dt*params.speed;}last=clock;
 remesh();
 if(canvas.width!==width||canvas.height!==height){canvas.width=width;canvas.height=height;}
 gl.viewport(0,0,width,height);gl.clearColor(0,0,0,0);gl.clearDepth(1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
 gl.disable(gl.DEPTH_TEST);gl.disable(gl.CULL_FACE);
  // Energy volume, arcs, central emitter and analytic halo rendered behind physical metal.
  if(e){gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.useProgram(energyProgram);
    gl.uniform2f(e.resolution,width,height);gl.uniform1f(e.time,elapsed);gl.uniform1f(gl.getUniformLocation(energyProgram,'uCoreRadius'),params.coreRadius);
    for(const [key,value] of [['energyType',energyTypes.indexOf(params.energyType)],['pulseType',pulseTypes.indexOf(params.pulseType)],['pulseCount',params.pulseCount],['energySpeed',params.energySpeed],['amplitude',params.amplitude],['thickness',params.thickness],['turbulence',params.turbulence],['chaos',params.chaos],['glow',params.glow],['density',params.density],['coreIntensity',params.coreIntensity]])gl.uniform1f(e[key],value);
    for(const [key,value] of [['primary',params.primaryColor],['secondary',params.secondaryColor],['pulse',params.pulseColor],['glowColor',params.glowColor]])gl.uniform3fv(e[key],new Float32Array(colourValue(value)));
    gl.bindBuffer(gl.ARRAY_BUFFER,energyQuad);gl.enableVertexAttribArray(e.pos);gl.vertexAttribPointer(e.pos,2,gl.FLOAT,false,0,0);gl.drawArrays(gl.TRIANGLE_STRIP,0,4);gl.disableVertexAttribArray(e.pos);gl.disable(gl.BLEND);
  }
  // R128: real 48x96 geodesic sphere. Quad is only the external optical halo.
  gl.enable(gl.CULL_FACE);gl.cullFace(gl.BACK);gl.frontFace(gl.CCW);
  gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.useProgram(sphereProgram);
  gl.uniformMatrix3fv(s3.view,false,viewBasis());gl.uniform2f(s3.resolution,width,height);
  gl.uniform1f(s3.radius,params.coreRadius);gl.uniform1f(s3.time,elapsed);
  gl.uniform1f(s3.speed,params.energySpeed);gl.uniform1f(s3.density,params.density);
  gl.uniform1f(s3.intensity,params.coreIntensity);gl.uniform1f(s3.turbulence,params.turbulence);
  gl.uniform1f(s3.exposure,params.exposure);
  gl.uniform3fv(s3.primary,new Float32Array(colourValue(params.primaryColor)));
  gl.uniform3fv(s3.secondary,new Float32Array(colourValue(params.secondaryColor)));
  gl.uniform3fv(s3.glow,new Float32Array(colourValue(params.glowColor)));
  gl.bindBuffer(gl.ARRAY_BUFFER,sphereBuffer);
  gl.enableVertexAttribArray(s3.pos);gl.vertexAttribPointer(s3.pos,3,gl.FLOAT,false,0,0);
  gl.drawArrays(gl.TRIANGLES,0,sphere.length/3);
  gl.disableVertexAttribArray(s3.pos);gl.disable(gl.BLEND);gl.disable(gl.CULL_FACE);
  // R121 electric visual grammar, reconstructed as thin spatial XYZ filaments.
  const arcs=pulseGeometry.build(params,elapsed);
  gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE);gl.useProgram(pulseProgram);
  gl.uniformMatrix3fv(a.view,false,viewBasis());gl.uniform2f(a.resolution,width,height);
  gl.uniform1f(a.time,elapsed);gl.uniform1f(a.nature,pulseNatures.indexOf(params.pulseNature));
  gl.uniform1f(a.flicker,params.flicker);
  gl.uniform3fv(a.color,new Float32Array(colourValue(params.pulseColor)));
  gl.uniform3fv(a.secondary,new Float32Array(colourValue(params.secondaryColor)));
  gl.bindBuffer(gl.ARRAY_BUFFER,pulseBuffer);
  for(const [pass,mesh] of [[0,arcs.glow],[1,arcs.filaments]]){
   gl.bufferData(gl.ARRAY_BUFFER,mesh,gl.DYNAMIC_DRAW);
   gl.uniform1f(a.pass,pass);
   gl.enableVertexAttribArray(a.pos);gl.enableVertexAttribArray(a.fadeSeed);
   gl.vertexAttribPointer(a.pos,3,gl.FLOAT,false,20,0);
   gl.vertexAttribPointer(a.fadeSeed,2,gl.FLOAT,false,20,12);
   gl.drawArrays(gl.TRIANGLES,0,mesh.length/5);
  }
  gl.disableVertexAttribArray(a.pos);gl.disableVertexAttribArray(a.fadeSeed);
  gl.disable(gl.BLEND);
  gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);
 // Invisible sphere populates the depth buffer: rear metal is occluded.
 gl.colorMask(false,false,false,false);gl.useProgram(depthProgram);gl.bindBuffer(gl.ARRAY_BUFFER,sphereBuffer);
 gl.enableVertexAttribArray(d.pos);gl.vertexAttribPointer(d.pos,3,gl.FLOAT,false,0,0);gl.uniform2f(d.res,width,height);gl.uniform1f(d.offset,.08);gl.uniform1f(d.radius,params.coreRadius);gl.drawArrays(gl.TRIANGLES,0,sphere.length/3);
 gl.disableVertexAttribArray(d.pos);gl.colorMask(true,true,true,true);
 gl.useProgram(metalProgram);gl.uniform2f(m.res,width,height);gl.uniform1f(m.offset,.08);gl.uniform3fv(m.tint,new Float32Array(materials[params.material]));gl.uniform1f(m.roughness,params.roughness);gl.uniform1f(m.warmth,params.warmth);gl.uniform1f(m.exposure,params.exposure);gl.uniform1f(m.anisotropy,params.anisotropy);gl.uniform1f(m.imperfection,params.imperfection);gl.uniform1f(m.scratches,params.scratches);gl.uniform1f(m.edgeWear,params.edgeWear);gl.uniform3fv(m.coreColor,new Float32Array(colourValue(params.glowColor)));gl.uniform1f(m.coreIntensity,params.coreIntensity);gl.uniform1f(m.time,elapsed);
 for(const ring of rings){
  // R125: axis perpendicular to plane normal => physical 360-degree gimbal flip.
  // Each ring completes its full turn at its own period (13/17/20 s).
  const axis=norm(ring.axis),base=norm(ring.normal),N=norm(rotate(base,axis,ringElapsed*ring.speed+ring.phase));
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
 if(status?.getAttribute('data-state')!=='ready')report('R128 WebGL · vraie sphère électrique 3D · arcs fins XYZ · anneaux métalliques.','ready');
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