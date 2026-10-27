/* SiteForge R153 — original plasma with materially distinct VFX presets, filament-grade volume detail and distributed internal lightning.
 * One GPU VFX program: quad volumetric plasma + particle shell, branching arcs, nucleus.
 * Historical marble shader, old arcs and their settings are REMOVED.
 * WebGL1, iPhone precision parity, mobile bounded particles, no network.
 */
(() => {
 'use strict';
 const stage=document.querySelector('.core-r108-stage'),canvas=stage?.querySelector('.core-r109-canvas');
 if(!stage||!canvas)return;
 const controls=Object.fromEntries([...document.querySelectorAll('[data-sphere-control]')]
   .map(e=>[e.dataset.sphereControl,e]));
 const defaults=Object.fromEntries(Object.entries(controls).map(([k,e])=>
   [k,e.getAttribute('data-default')??e.defaultValue??e.value]));
 const num=k=>Number(controls[k]?.value??defaults[k])/100;
 const sel=k=>Number(controls[k]?.value??defaults[k]);
 const rgb=k=>[1,3,5].map(i=>parseInt((controls[k]?.value||defaults[k]||'#ffffff').slice(i,i+2),16)/255);
 const mainStatus=document.querySelector('[data-render-status]');
 const vfxStatus=document.querySelector('[data-vfx-status]');
 const status=(target,value)=>{if(target&&target.textContent!==value)target.textContent=value;};
 let schedule=()=>{};
 function sync(){
  for(const [key,e] of Object.entries(controls)){
   const out=document.querySelector('[data-sphere-value="'+key+'"]');
   if(out)out.textContent=e.type==='color'?e.value.toUpperCase():
     e.type==='select-one'?e.selectedOptions[0]?.textContent:e.value+' %';
  }
  stage.style.setProperty('--sphere-zoom',String(num('diameter')));
  stage.style.setProperty('--fallback-opacity',String(num('opacity')));
 }
 const panel=document.querySelector('.lab-controls');
 const onChange=e=>{if(e.target?.hasAttribute('data-sphere-control')){sync();schedule();}};
 panel?.addEventListener('input',onChange);
 panel?.addEventListener('change',onChange);
 panel?.addEventListener('reset',e=>{
  e.preventDefault();for(const [key,input] of Object.entries(controls))input.value=defaults[key];
  sync();schedule();
 });
 sync();
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 if(reduced.matches){status(mainStatus,'Animation réduite : plasma de référence statique.');return;}
 const gl=canvas.getContext('webgl',{
  alpha:true,antialias:false,depth:false,stencil:false,
  premultipliedAlpha:false,preserveDrawingBuffer:false,powerPreference:'high-performance'
 });
 if(!gl){status(mainStatus,'GPU indisponible : plasma statique de secours.');return;}
 const MAX=2048;
 const vertex=`
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
attribute vec2 aPosition;
attribute float aSeed;
uniform vec2 uResolution;
uniform float uTime,uPass,uLayer;
uniform vec2 uTilt;
uniform vec4 uControls; // style, emission, speed, density
uniform vec4 uShape; // sphere radius, shell, core radius, core flux
uniform vec4 uEffects; // arc power, arc count, sprite size, opacity
varying float vLife,vGlint;
varying vec2 vAxis;
float rnd(float x){return fract(sin(x*127.1+49.6)*43758.5453);}
void main(){
 if(uPass>3.5){
  vLife=1.;vGlint=1.;vAxis=vec2(1.,0.);gl_PointSize=1.;
  gl_Position=vec4(aPosition,0.,1.);return;
 }
 float i=floor(aSeed*2048.),a=rnd(i+27.)*6.283185;
 float depth=rnd(i+41.)*2.-1.,t=uTime*max(.05,uControls.z);
 float radius=.64*clamp(uShape.x,.5,1.5);
 vec3 p=vec3(0.);
 float life=1.,sizeFactor=1.;
 vAxis=vec2(cos(a),sin(a));
 if(uPass>.5&&uPass<1.5){
  // Coherent 3D plasma surface on golden-angle shell.
  float z=1.-2.*(i+.5)/2048.;
  float r=sqrt(max(0.,1.-z*z)),spin=i*2.39996323+t*.20;
  float folds=sin(spin*5.+t*.85)*sin(z*13.-t*.54);
  p=vec3(cos(spin)*r,sin(spin)*r,z);
  p.xy*=radius*(.95+.025*folds);p.z*=radius;
  life=mix(.18,1.,smoothstep(-.7,.55,z))*clamp(uShape.y,0.,1.);
  vAxis=vec2(cos(spin),sin(spin));sizeFactor=.70;
 }else if(uPass>1.5&&uPass<2.5){
  // Jagged lightning chains, 30 thin beads each; branches and flashes.
  float chain=floor(i/30.),bead=mod(i,30.);
  float epoch=floor(t*.90+chain*.37),phase=fract(t*.90+chain*.37);
  // Independent origins scattered through the whole plasma volume.
  float originAngle=rnd(chain*13.+epoch*21.)*6.283185;
  float originRadius=.025+.38*rnd(chain*19.+epoch*7.);
  vec2 origin=vec2(cos(originAngle),sin(originAngle))*originRadius;
  float aa=rnd(chain*7.+epoch*31.)*6.283185;
  float reach=(.32+.34*rnd(chain*17.+epoch*3.))*bead/29.;
  // Coherent short jagged turns, rather than isolated widely-spaced dots.
  float stepNoise=rnd(chain*37.+floor(bead*.56)+epoch*11.)-.5;
  float zig=stepNoise*.028+sin(bead*.92+chain*3.7)*.008;
  float fork=step(17.,bead)*(bead-17.)/12.*(rnd(chain*13.+epoch*7.)-.5)*.42;
  float ang=aa+fork;
  vec2 dir=vec2(cos(ang),sin(ang));
  p=vec3((origin+dir*reach+vec2(-dir.y,dir.x)*zig)*uShape.x,
         (rnd(chain*9.+epoch*5.)-.5)*.78);
  life=smoothstep(.015,.11,phase)*(1.-smoothstep(.71,.92,phase));
  life*=mix(.28,1.,step(0.,p.z))*clamp(uEffects.x,0.,3.);
  vAxis=dir;sizeFactor=.77;
 }else if(uPass>2.5){
  float ang=a+t*.32;
  float r=pow(rnd(i*2.31+37.),1.5)*.13*clamp(uShape.z,.04,2.);
  p=vec3(cos(ang)*r,sin(ang)*r,(rnd(i*3.27+7.)-.5)*.22);
  life=.75+.25*sin(t*1.8+i*.12);sizeFactor=1.23;
 }else{
  float age=fract(rnd(i*5.+7.)+t*(.16+.24*rnd(i+29.)));
  float ang=a+t*.36;
  if(uControls.x<.5){
   float r=(.06+age*.58)*uShape.x;
   p=vec3(cos(ang+age*4.)*r,sin(ang+age*4.)*r,depth*.28);
  }else if(uControls.x<1.5){
   float r=(.04+age*.62)*uShape.x;
   p=vec3(cos(a)*r,sin(a)*r,depth*.25);
  }else if(uControls.x<2.5){
   float r=(.18+.31*rnd(i+65.))*uShape.x;
   p=vec3(cos(ang+age*5.)*r,sin(ang+age*5.)*r*.52,depth*.5);
  }else{
   p=vec3(cos(a)*age*.27*uShape.x,-.07+age*.63*uShape.x,depth*.24);
  }
  life=smoothstep(0.,.13,age)*(1.-smoothstep(.65,1.,age))*clamp(uControls.y,0.,2.);
  sizeFactor=.90;
 }
 if(uPass>.5&&uPass<3.5)p.xy+=uTilt*.04;
 vLife=life;vGlint=.65+.35*rnd(i*3.17+19.);
 gl_PointSize=clamp((3.2+4.5*rnd(i+8.))*uEffects.z*sizeFactor*
       uResolution.y/460.*mix(1.85,1.,uLayer),1.,29.);
 gl_Position=vec4(p.x*uResolution.y/max(uResolution.x,1.),p.y-.08,0.,1.);
}
`;
 const fragment=`
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
varying float vLife,vGlint;
varying vec2 vAxis;
uniform vec2 uResolution;
uniform float uTime,uPass,uLayer;
uniform vec4 uControls,uShape,uEffects;
uniform vec3 uCore,uCyan,uViolet,uDeep;
float hash3(vec3 v){v=fract(v*.1031);v+=dot(v,v.yzx+33.33);return fract((v.x+v.y)*v.z);}
float noise3(vec3 p){
 vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
 return mix(mix(mix(hash3(i),hash3(i+vec3(1,0,0)),f.x),
                mix(hash3(i+vec3(0,1,0)),hash3(i+vec3(1,1,0)),f.x),f.y),
            mix(mix(hash3(i+vec3(0,0,1)),hash3(i+vec3(1,0,1)),f.x),
                mix(hash3(i+vec3(0,1,1)),hash3(i+vec3(1,1,1)),f.x),f.y),f.z);
}
void main(){
 vec2 p=(gl_FragCoord.xy/uResolution-.5)*2.;
 p.x*=uResolution.x/max(uResolution.y,1.);p.y+=.08;
 float radius=.64*clamp(uShape.x,.5,1.5);
 if(uPass>3.5){
  // Original plasma image: luminous white nucleus, cyan cloud, royal blue
  // and violet depth — now a living 3D sampled energy field.
  float d=length(p)/radius;
  if(d>1.04)discard;
  float front=sqrt(max(0.,1.-d*d));
  float theta=atan(p.y,p.x),t=uTime*max(.05,uControls.z);
  vec3 pos=vec3(p*5.1,front*2.7);
  float f=noise3(pos+vec3(sin(t*.26),cos(t*.19),t*.24));
  float g=noise3(pos*2.1+vec3(t*.14,-t*.21,-t*.34));
  float h=noise3(pos*3.9-vec3(t*.42,t*.18,-t*.15));
  // Warp several scales of 3D noise into continuous luminous streamlines.
  float warp=(f-.5)*7.2+(g-.5)*3.7;
  float helix=theta*6.7+warp+d*5.2-t*.72;
  float thin=pow(max(0.,.5+.5*sin(helix)),22.);
  float wisps=pow(max(0.,1.-abs(f-g)*3.3),6.);
  float tendril=pow(max(0.,.5+.5*sin(theta*17.+g*15.-t*.78)),29.);
  float cloud=clamp(f*.49+g*.37+h*.14,0.,1.);
  float turbulence=abs(f-g)*.64+abs(g-h)*.36;
  float darkness=smoothstep(.16,.53,turbulence);
  float coreRadius=max(.025,uShape.z*.15);
  float nucleus=exp(-pow(d/coreRadius,2.)*2.1);
  float glow=exp(-d*d*4.5),fresnel=pow(1.-front,1.8);
  float emission=clamp(uControls.y,0.,2.);
  float electric=0.,vortex=0.,fusion=0.;
  if(uControls.x>.5&&uControls.x<1.5){
    // Electrical mode: hard branching channels through darker plasma.
    electric=pow(max(0.,.5+.5*sin(theta*23.+warp*2.4-t*1.4)),35.);
  }else if(uControls.x>1.5&&uControls.x<2.5){
    // Vortex mode: helical bands wrapped in depth, not electric bolts.
    vortex=pow(max(0.,.5+.5*sin(theta*5.8+d*18.+warp*.82-t*1.2)),12.);
  }else if(uControls.x>2.5&&uControls.x<3.5){
    // Fusion mode: radial jets from the compact white-hot core.
    fusion=pow(max(0.,.5+.5*sin(theta*12.+warp*1.2-t*.38)),19.)*exp(-d*1.8);
  }
  vec3 mist=mix(uDeep*.25,uViolet*.74,clamp(d*.64+cloud*.29,0.,1.));
  mist=mix(mist,uCyan*.76,clamp(cloud*.42+thin*.19+vortex*.29,0.,1.));
  mist*=1.-darkness*.40;
  vec3 threads=uCyan*(thin*.88+tendril*.40+wisps*.11+vortex*.60)
               +uCore*(thin*.08+electric*.90+fusion*.55);
  float excitation=.58+.55*emission;
  if(uControls.x>.5&&uControls.x<1.5){
    mist*=.38;threads+=uCyan*electric*.76;
  }else if(uControls.x>1.5&&uControls.x<2.5){
    threads+=mix(uCyan,uViolet,.4)*vortex*.43;
  }else if(uControls.x>2.5&&uControls.x<3.5){
    threads+=uCore*fusion*.65;
  }
  vec3 plasma=(mist*(.30+.57*cloud)+threads*excitation)*uShape.y;
  float corona=pow(max(0.,.5+.5*sin(theta*9.+warp-t*.53)),18.)
               *exp(-d*d*9.);
  plasma+=uCore*nucleus*pow(max(uShape.w,0.),1.55)*1.40;
  plasma+=uCyan*corona*.32*pow(max(uShape.w,0.),.85);
  plasma+=mix(uCyan,uViolet,.25)*glow*.16+uCyan*fresnel*.12*uShape.y;
  float alpha=clamp((.28+.55*cloud)*uShape.y+nucleus*.88+
                    (thin*.22+electric*.28+vortex*.15)*uShape.y,0.,1.);
  float edge=1.-smoothstep(.976,1.04,d);
  vec3 radiance=vec3(1.)-exp(-max(plasma,vec3(0.))*1.17);
  gl_FragColor=vec4(radiance,alpha*edge*clamp(uEffects.w,0.,1.));
  return;
 }
 vec2 c=gl_PointCoord*2.-1.;
 float r2=dot(c,c);
 if(uPass>1.5&&uPass<2.5){
  float along=dot(c,vAxis);
  float cross=c.x*vAxis.y-c.y*vAxis.x;
  // Elongate each tiny sprite along its discharge path, not across it.
  r2=along*along*.19+cross*cross*11.6;
 }
 float halo=exp(-r2*3.1),hot=exp(-r2*14.);
 float energy=(uLayer<.5?halo*.26:hot*1.13+halo*.13)*vLife*vGlint;
 float bound=1.-smoothstep(radius*.95,radius*1.035,length(p));
 energy*=bound*clamp(uEffects.w,0.,1.);
 if(uPass>2.5)energy*=pow(max(uShape.w,0.),1.55)*1.62;
 vec3 color=uPass>2.5?uCore:uPass>1.5?mix(uCyan,uCore,.61):
            uPass>.5?mix(uCyan,uViolet,.25):mix(uCyan,uCore,.36);
 color=mix(color,vec3(1.),vGlint*.26);
 gl_FragColor=vec4(color*energy,clamp(energy,0.,1.));
}
`;
 function compile(type,src){
  const shader=gl.createShader(type);if(!shader)return null;
  gl.shaderSource(shader,src);gl.compileShader(shader);
  if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){
   status(mainStatus,'Échec compilation GPU : '+String(gl.getShaderInfoLog?.(shader)||'').replace(/[\r\n\t]+/g,' ').slice(0,145));
   gl.deleteShader(shader);return null;
  }return shader;
 }
 const vert=compile(gl.VERTEX_SHADER,vertex),frag=compile(gl.FRAGMENT_SHADER,fragment);
 if(!vert||!frag){status(vfxStatus,'GPU indisponible · référence plasma affichée.');return;}
 const program=gl.createProgram();if(!program)return;
 gl.attachShader(program,vert);gl.attachShader(program,frag);gl.linkProgram(program);
 if(!gl.getProgramParameter(program,gl.LINK_STATUS)){
  status(mainStatus,'Échec liaison GPU : '+String(gl.getProgramInfoLog?.(program)||'').replace(/[\r\n\t]+/g,' ').slice(0,145));
  status(vfxStatus,'GPU indisponible · référence plasma affichée.');return;
 }
 gl.deleteShader(vert);gl.deleteShader(frag);
 const A=gl.getAttribLocation(program,'aPosition'),S=gl.getAttribLocation(program,'aSeed');
 const keys=['uResolution','uTime','uPass','uLayer','uTilt','uControls','uShape','uEffects','uCore','uCyan','uViolet','uDeep'];
 const U=Object.fromEntries(keys.map(k=>[k,gl.getUniformLocation(program,k)]));
 if(A<0||S<0||keys.some(k=>U[k]===null)){status(mainStatus,'GPU : paramètres incomplets.');return;}
 const quad=gl.createBuffer(),seeds=gl.createBuffer();if(!quad||!seeds)return;
 gl.bindBuffer(gl.ARRAY_BUFFER,quad);
 gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
 gl.bindBuffer(gl.ARRAY_BUFFER,seeds);
 gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(Array.from({length:MAX},(_,i)=>(i+.5)/MAX)),gl.STATIC_DRAW);
 let active=true,visible=true,frame=0,last=0,lastFrame=0,elapsed=0,tiltX=0,tiltY=0;
 function resize(){
  const w=canvas.clientWidth,h=canvas.clientHeight;if(w<10||h<10)return false;
  const mobile=window.innerWidth<=700;
  const scale=Math.min(window.devicePixelRatio||1,mobile?1.75:2.25,
    Math.sqrt((mobile?850000:1500000)/(w*h)));
  const W=Math.max(1,Math.floor(w*scale)),H=Math.max(1,Math.floor(h*scale));
  if(canvas.width!==W||canvas.height!==H){canvas.width=W;canvas.height=H;}
  gl.viewport(0,0,W,H);return true;
 }
 function draw(now){
  frame=0;if(!active||!visible||document.visibilityState!=='visible')return;
  if(lastFrame&&now-lastFrame<32){frame=requestAnimationFrame(draw);return;}
  if(!resize())return;lastFrame=now;
  if(last)elapsed+=Math.min((now-last)/1000,.06);last=now;
  const mobile=window.innerWidth<=700,preset=sel('particlePreset');
  const extra=preset!==4&&num('particleIntensity')>0&&num('particleDensity')>0;
  const sphereCount=mobile?1480:MAX;
  const lightningCount=Math.min(mobile?720:1200,
    Math.floor((mobile?540:900)*num('arcDensity')/30)*30);
  const coreCount=mobile?160:260;
  const extraCount=Math.min(mobile?650:MAX,Math.round((mobile?340:560)*num('particleDensity')));
  gl.useProgram(program);
  gl.uniform2f(U.uResolution,canvas.width,canvas.height);
  gl.uniform1f(U.uTime,elapsed);gl.uniform2f(U.uTilt,tiltX,tiltY);
  gl.uniform4fv(U.uControls,new Float32Array([
    preset,num('particleIntensity'),num('particleSpeed'),num('particleDensity')
  ]));
  gl.uniform4fv(U.uShape,new Float32Array([
    num('diameter'),num('shellVisibility'),num('coreSize'),num('coreLight')
  ]));
  gl.uniform4fv(U.uEffects,new Float32Array([
    num('arcIntensity'),num('arcDensity'),num('particleSize'),num('opacity')
  ]));
  for(const [uniform,k] of [['uCore','core'],['uCyan','rim'],['uViolet','secondary'],['uDeep','primary']]){
   gl.uniform3fv(U[uniform],new Float32Array(rgb(k)));
  }
  gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);
  // Same emitter program and GPU context renders the material field and sprites.
  gl.bindBuffer(gl.ARRAY_BUFFER,quad);
  gl.enableVertexAttribArray(A);gl.vertexAttribPointer(A,2,gl.FLOAT,false,0,0);
  gl.disableVertexAttribArray(S);gl.vertexAttrib1f(S,0);
  gl.uniform1f(U.uPass,4);gl.uniform1f(U.uLayer,1);
  gl.disable(gl.BLEND);gl.drawArrays(gl.TRIANGLES,0,6);
  gl.disableVertexAttribArray(A);gl.vertexAttrib2f(A,0,0);
  gl.bindBuffer(gl.ARRAY_BUFFER,seeds);
  gl.enableVertexAttribArray(S);gl.vertexAttribPointer(S,1,gl.FLOAT,false,0,0);
  gl.enable(gl.BLEND);gl.blendFunc(gl.ONE,gl.ONE);
  const emit=(pass,count)=>{
   if(!count)return;
   gl.uniform1f(U.uPass,pass);
   gl.uniform1f(U.uLayer,0);gl.drawArrays(gl.POINTS,0,count);
   gl.uniform1f(U.uLayer,1);gl.drawArrays(gl.POINTS,0,count);
  };
  if(num('shellVisibility')>0)emit(1,sphereCount);
  if(num('arcIntensity')>0)emit(2,lightningCount);
  if(num('coreSize')>0&&num('coreLight')>0)emit(3,coreCount);
  if(extra)emit(0,extraCount);
  gl.disable(gl.BLEND);
  status(vfxStatus,'Plasma GPU actif · '+(extra?extraCount+' particules':'particules additionnelles désactivées')+
    ' · '+Math.floor(lightningCount/30)+' éclairs');
  if(!stage.hasAttribute('data-core-ready')){
   stage.setAttribute('data-core-ready','true');
   status(mainStatus,'Nouvelle sphère plasma WebGL active.');
  }
  if(active&&visible)frame=requestAnimationFrame(draw);
 }
 schedule=()=>{if(active&&visible&&!frame&&document.visibilityState==='visible')frame=requestAnimationFrame(draw);};
 const observer=new IntersectionObserver(entries=>{
  visible=entries[0]?.isIntersecting??false;last=0;
  if(visible)schedule();else if(frame){cancelAnimationFrame(frame);frame=0;}
 },{threshold:.01});observer.observe(stage);
 const resizeObserver=new ResizeObserver(()=>schedule());resizeObserver.observe(canvas);
 document.addEventListener('visibilitychange',()=>{last=0;schedule();});
 stage.addEventListener('pointermove',event=>{
  if(event.pointerType==='touch')return;
  const r=stage.getBoundingClientRect();
  tiltX=Math.max(-.28,Math.min(.28,(event.clientX-r.left)/r.width-.5));
  tiltY=Math.max(-.22,Math.min(.22,(event.clientY-r.top)/r.height-.5));
 },{passive:true});
 stage.addEventListener('pointerleave',()=>{tiltX=0;tiltY=0;},{passive:true});
 canvas.addEventListener('webglcontextlost',event=>{
  event.preventDefault();active=false;
  if(frame)cancelAnimationFrame(frame);frame=0;
  stage.removeAttribute('data-core-ready');
  status(mainStatus,'GPU perdu : recharge la page.');
  observer.disconnect();resizeObserver.disconnect();
 },{once:true});
 schedule();
})();