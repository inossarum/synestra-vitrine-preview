/* SiteForge R157 — replaceable 3D volume flow materials on ONE WebGL renderer: luminous central core, sweeping cyan-violet vortex arms and depth-resolved energy. Existing WebGL emitter retained; 18 controls total.
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
 const arcPanel=document.querySelector('[data-electric-options]');
 const status=(target,value)=>{if(target&&target.textContent!==value)target.textContent=value;};
 let schedule=()=>{};
 function sync(){
  for(const [key,e] of Object.entries(controls)){
   const out=document.querySelector('[data-sphere-value="'+key+'"]');
   if(out)out.textContent=e.type==='color'?e.value.toUpperCase():
     e.type==='select-one'?e.selectedOptions[0]?.textContent:e.value+' %';
  }
  const electricMode=sel('flowType')===0&&sel('particlePreset')===1;
  if(arcPanel)arcPanel.hidden=!electricMode;
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
 // Export uses the actual live controls, not startup defaults or GPU uniforms.
 // This stays available when reduced motion is enabled or WebGL is unavailable.
 const exportButton=document.querySelector('[data-export-json]');
 const exportStatus=document.querySelector('[data-export-status]');
 exportButton?.addEventListener('click',()=>{
  const parameters=Object.fromEntries(Object.entries(controls).map(([key,input])=>[
   key,input.type==='color'?input.value.toLowerCase():Number(input.value)
  ]));
  const documentJSON={
   schema:'synestra.siteforge.plasma-settings.v1',
   version:1,
   engine:'siteforge-plasma-webgl1',
   parameters
  };
  const output=JSON.stringify(documentJSON,null,2)+'\n';
  let objectURL;
  try{
   const blob=new Blob([output],{type:'application/json;charset=utf-8'});
   objectURL=URL.createObjectURL(blob);
   const link=document.createElement('a');
   link.href=objectURL;
   link.download='synestra-siteforge-plasma-settings.json';
   document.body.appendChild(link);
   link.click();
   link.remove();
   // Delay release so Safari/iOS can finish handling the download gesture.
   window.setTimeout(()=>URL.revokeObjectURL(objectURL),1500);
   status(exportStatus,'Export JSON demandé · '+Object.keys(parameters).length+' paramètres actuels.');
  }catch(_error){
   if(objectURL)URL.revokeObjectURL(objectURL);
   status(exportStatus,'Export indisponible sur ce navigateur.');
  }
 });
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
  // Connected GPU line segments: each neighbouring pair shares the same vertex.
  float segment=floor(i/2.);
  float chain=floor(segment/29.),bead=mod(segment,29.)+mod(i,2.);
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
uniform vec2 uTilt;
uniform vec3 uPointer; // projected pointer position + decaying impulse
uniform float uVolumeSteps;
uniform vec2 uFlow; // material family 0..4, ribbon width 0.3..2

uniform float uSceneScroll;
uniform float uSceneQuality;
// Raycast simple *3D* architectural planes in the SAME camera/render program.
// The Core's world-space position (0,0,0) is the only emission source.
vec3 sceneColor(vec2 uv){
  float scroll=clamp(uSceneScroll,0.,1.);
  vec3 ro=vec3(scroll*.16,.40+scroll*.17,3.72-scroll*.43);
  vec3 rd=normalize(vec3(uv.x*.81,uv.y*.81-.09-scroll*.095,-1.68));
  float hit=1000.,kind=-1.;
  vec3 pos=vec3(0.),normal=vec3(0.);
  // Floating Core below an inset ceiling, above a machined metal plane.
  if(rd.y<-.0001){
    float t=(-1.21-ro.y)/rd.y;
    vec3 q=ro+rd*t;
    if(t>0.&&t<hit&&abs(q.x)<5.2&&q.z>-6.){
      hit=t;kind=0.;pos=q;normal=vec3(0.,1.,0.);
    }
  }
  // Raised machined plinth: actual horizontal polygon in 3D, not a CSS shadow.
  if(rd.y<-.0001){
    float t=(-1.155-ro.y)/rd.y;
    vec3 q=ro+rd*t;
    if(t>0.&&t<hit&&abs(q.x)<.78&&abs(q.z)<.86){
      hit=t;kind=5.;pos=q;normal=vec3(0.,1.,0.);
    }
  }
  // Backplane is recessed and interrupted by an architectural aperture.
  if(rd.z<-.0001){
    float t=(-3.35-ro.z)/rd.z;
    vec3 q=ro+rd*t;
    if(t>0.&&t<hit&&abs(q.x)<4.3&&q.y>-1.21&&q.y<2.5){
      hit=t;kind=1.;pos=q;normal=vec3(0.,0.,1.);
    }
  }
  // Side panels have genuine world-space coordinates and inward-facing normals.
  if(rd.x<-.0001){
    float t=(-2.75-ro.x)/rd.x;
    vec3 q=ro+rd*t;
    if(t>0.&&t<hit&&q.z>-3.35&&q.z<3.6&&q.y>-1.21&&q.y<2.5){
      hit=t;kind=2.;pos=q;normal=vec3(1.,0.,0.);
    }
  }
  if(rd.x>.0001){
    float t=(2.75-ro.x)/rd.x;
    vec3 q=ro+rd*t;
    if(t>0.&&t<hit&&q.z>-3.35&&q.z<3.6&&q.y>-1.21&&q.y<2.5){
      hit=t;kind=3.;pos=q;normal=vec3(-1.,0.,0.);
    }
  }
  if(rd.y>.0001){
    float t=(2.24-ro.y)/rd.y;
    vec3 q=ro+rd*t;
    if(t>0.&&t<hit&&abs(q.x)<4.3&&q.z>-3.35){
      hit=t;kind=4.;pos=q;normal=vec3(0.,-1.,0.);
    }
  }
  // No forced distant fog-lit flat backdrop. Unlit darkness is intentional.
  vec3 voidColor=vec3(.006,.011,.023);
  if(kind<0.)return voidColor;
  // Distinct machined wall / metal-floor grain; no tiled-image reflection.
  float grain=.5+.5*sin(pos.x*mix(52.,96.,uSceneQuality)+pos.z*3.);
  float seamX=1.-smoothstep(.005,.026,abs(fract(pos.x*.45+.5)-.5));
  float seamZ=1.-smoothstep(.004,.027,abs(fract(pos.z*.38+.5)-.5));
  float floorM=1.-.12*max(seamX,seamZ);
  float panelSeam=1.-smoothstep(.007,.036,abs(fract(pos.z*.55+.5)-.5));
  vec3 base=kind<.5?vec3(.072,.090,.112):
           kind<1.5?vec3(.035,.049,.078):
           kind<3.5?vec3(.058,.075,.096):
           kind<4.5?vec3(.038,.050,.068):vec3(.09,.112,.131);
  if(kind<.5)base*=floorM*(.97+.03*grain);
  if(kind>4.5){
    // Fine satin grain and bevel visible only at the plinth edges.
    float edge=min(.78-abs(pos.x),.86-abs(pos.z));
    base*=.82+.33*(1.-smoothstep(0.,.095,edge));
  }
  if(kind>1.5&&kind<3.5)base*=1.-.25*panelSeam;
  if(kind>1.0&&kind<1.5){
    // Deep architectural inset, not a decorative glowing border.
    float xx=abs(pos.x),yy=abs(pos.y-.15);
    float rim=(1.-smoothstep(.02,.12,abs(xx-1.72)))*
               (1.-smoothstep(1.20,1.64,yy));
    base=mix(base,base*1.55,rim*.42);
    if(xx<1.68&&yy<1.18)base*=.42;
  }
  // Diffuse + rough, broad metallic specular lobes from the Core's real position.
  vec3 toward=vec3(0.,.03,0.)-pos;
  float dist2=dot(toward,toward);
  vec3 l=normalize(toward);
  float lambert=max(dot(normal,l),0.);
  float attenuation=1./(1.+.21*dist2+.045*dist2*dist2);
  float power=clamp(uShape.w/5.,.3,1.6);
  float pulse=1.+.045*sin(uTime*1.2);
  vec3 color=base*(.30+.30*clamp(normal.y+.3,0.,1.));
  vec3 violetLight=uViolet*(1.17-.16*pos.x);
  vec3 greenLight=uCyan*(1.17+.16*pos.x);
  vec3 lights=mix(violetLight,greenLight,clamp(.5+.28*pos.x,0.,1.));
  vec3 colored=lights*(.36+1.8*lambert)*attenuation*power*pulse;
  vec3 whiteBounce=uCore*(.25+.55*lambert)*attenuation*.23*power;
  color+=(base*9.2+vec3(.051,.062,.073))*(colored+whiteBounce);
  // Localized broadband response of rough metallic surfaces to the luminous Core.
  color+=lights*lambert*attenuation*.11*power;
  vec3 reflected=reflect(-l,normal);
  float spec=pow(max(dot(reflected,-rd),0.),11.);
  color+=lights*spec*.22*attenuation*power;
  // Fast, deterministic distance fog without a second volumetric pass.
  float fog=1.-exp(-.020*hit*hit);
  color=mix(color,voidColor,clamp(fog*.69,0.,.70));
  return vec3(1.)-exp(-max(color,vec3(0.))*1.38);
}
float hash3(vec3 v){v=fract(v*.1031);v+=dot(v,v.yzx+33.33);return fract((v.x+v.y)*v.z);}
float noise3(vec3 p){
 vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
 return mix(mix(mix(hash3(i),hash3(i+vec3(1,0,0)),f.x),
                mix(hash3(i+vec3(0,1,0)),hash3(i+vec3(1,1,0)),f.x),f.y),
            mix(mix(hash3(i+vec3(0,0,1)),hash3(i+vec3(1,0,1)),f.x),
                mix(hash3(i+vec3(0,1,1)),hash3(i+vec3(1,1,1)),f.x),f.y),f.z);
}
void main(){
 vec2 view=(gl_FragCoord.xy/uResolution-.5)*2.;
 view.x*=uResolution.x/max(uResolution.y,1.);
 vec2 p=view*1.72;p.y+=.08;
 float radius=.64*clamp(uShape.x,.5,1.5);
 if(uPass>3.5){
  vec3 background=sceneColor(view);
  // True 3D ray integration. The image reference is a luminous white-blue
  // central star enclosed in translucent indigo space, with five broad
  // cyan/violet plasma arms winding through front and rear depth layers.
  float xy=length(p);
  if(xy>=radius*1.025){gl_FragColor=vec4(background,1.);return;}
  float halfDepth=sqrt(max(0.,radius*radius-dot(p,p)));
  float stride=(2.*halfDepth)/max(uVolumeSteps,1.);
  float t=uTime*max(.04,uControls.z);
  float rotY=uTilt.x*1.5,rotX=uTilt.y*1.5;
  float sy=sin(rotY),cy=cos(rotY),sx=sin(rotX),cx=cos(rotX);
  vec3 accum=vec3(0.);
  float trans=1.;
  float sceneDensity=0.;
  float emission=clamp(uControls.y,0.,2.);
  // Compact core size independent of its radiance. Power never widens the core.
  float nucleusRadius=max(.018,radius*uShape.z*.105);
  for(int i=0;i<22;i++){
    if(float(i)>=uVolumeSteps)break;
    float z=halfDepth-(float(i)+.5)*stride;
    vec3 q=vec3(p,z);
    // The camera tilt rotates the full volumetric field, not a flat UV plane.
    q=vec3(q.x*cy+q.z*sy,
           q.y*cx-(q.z*cy-q.x*sy)*sx,
           q.y*sx+(q.z*cy-q.x*sy)*cx);
    // R190: local fluid perturbation; no object rotation, no change to nucleus.
    float hoverDistance=length(p-uPointer.xy);
    float hoverEnvelope=uPointer.z*exp(-hoverDistance*hoverDistance/max(.015,radius*radius*.25));
    float flowDeflection=hoverEnvelope*
      (3.25*sin(t*3.6+q.z*6.7+length(q.xy)*9.5)
       +.70*cos(t*2.3+atan(q.y,q.x)*4.));
    float distance3D=length(q)/radius;
    float planar=length(q.xy)/radius;
    float angle=atan(q.y,q.x);
    float broad=noise3(q*3.8+vec3(t*.12,-t*.11,t*.08));
    float detail=.5+.5*sin(dot(q,vec3(18.,-13.,11.))+t*.45+(broad-.5)*4.);
    float depthWarp=(broad-.5)*1.05+(detail-.5)*.35;
    // Logarithmic spiral filaments in a rotating three-dimensional volume.
    float winding=angle*5.0+5.8*log(planar+.15)-t*.52
                  +q.z*2.6+depthWarp*1.35;
    float spiral=pow(max(0.,.5+.5*cos(winding)),6.);
    float sideFilament=pow(max(0.,.5+.5*cos(winding*1.8+detail*3.2)),25.);
    float stream=pow(max(0.,.5+.5*cos(winding*.8-q.z*7.2)),8.);
    float volumeFog=clamp(.23+.30*broad+.18*detail,0.,1.);
    float hollow=1.-smoothstep(.2,.83,abs(broad-detail)*2.0);
    float interior=1.-smoothstep(.92,1.02,distance3D);
    float core=exp(-dot(q,q)/(nucleusRadius*nucleusRadius)*1.65);
    float coreHalo=exp(-dot(q,q)/(nucleusRadius*nucleusRadius)*.18);
    float electrical=0.,vortex=0.,fusion=0.;
    if(uControls.x>.5&&uControls.x<1.5){
      electrical=pow(max(0.,.5+.5*cos(winding*2.2+detail*9.)),23.);
    }else if(uControls.x>1.5&&uControls.x<2.5){
      vortex=pow(max(0.,.5+.5*cos(winding*.8+q.z*8.)),9.);
    }else if(uControls.x>2.5&&uControls.x<3.5){
      fusion=pow(max(0.,.5+.5*cos(angle*10.+depthWarp*2.-t*.5)),14.)
             *exp(-distance3D*2.5);
    }
    // R157: only this flow material changes. Nucleus/core halo, electric arcs,
    // extra particle presets and alpha stay in their original independent passes.
    float ribbonWidth=clamp(uFlow.y,.3,2.);
    float flowCurrents=0.;
    float flowFog=1.;
    if(uFlow.x<.5){
      // R162: asymmetric, multi-scale filament topology within the SAME ray-marched volume.
      // Depth offset, low-frequency wandering, strand breakup and travelling pulses.
      float wander=.32*sin(angle*2.+q.z*3.1+t*.21)
                  +.22*sin(q.y*6.7-q.z*4.5-t*.17)+(broad-.5)*.65;
      float depthTwist=q.z*(2.8+.7*sin(t*.23+planar*5.))
                      +.35*sin(q.x*5.1+q.z*3.1-t*.25);
      // The angular part must contain only integer winding numbers at +/-PI.
      // Keep all irregular distortion in a strictly periodic phase offset.
      float basePhase=4.3*log(planar+.23)-t*.27+wander*2.2+depthTwist
                    +.75*sin(q.z*2.9+planar*6.1)*sin(angle*3.+q.z*1.7)
                    +flowDeflection;
      float organicLane=angle*6.+basePhase;
      float localPhase=sin(angle*2.+basePhase*.33+q.x*3.4+q.z*2.1-t*.17);
      float primaryVein=pow(max(0.,.5+.5*cos(organicLane+localPhase*.55)),
                            max(5.,11.4/ribbonWidth));
      float tributary=pow(max(0.,.5+.5*cos(angle*9.+basePhase*1.63+wander+depthTwist*.33)),
                          max(9.,18./ribbonWidth));
      float hairline=pow(max(0.,.5+.5*cos(angle*19.+basePhase*3.17+q.z*8.1-q.y*5.6)),
                         max(16.,35./ribbonWidth));
      float wisp=pow(max(0.,.5+.5*cos(angle*3.+basePhase*.57-q.x*4.7+depthTwist*1.4)),
                     max(6.,11./ribbonWidth));
      float pulse=.78+.22*sin(t*2.1+planar*11.+q.z*5.+wander*3.);
      float breakup=.64+.36*smoothstep(.23,.72,broad+.19*sin(q.z*8.+t*.3));
      // Sustain thin currents without restoring surface haze or opaque shell.
      flowCurrents=(primaryVein*.91+tributary*.48+hairline*.50+wisp*.22)
                   *pulse*breakup*1.55;
    }else if(uFlow.x<1.5){
      // Magnetic flux tubes: closed, strongly curved field-loop bands.
      float fieldAngle=angle*4.+q.z*6.5+sin(planar*9.+broad*2.2-t*.65)*2.+flowDeflection;
      float fieldLoop=pow(max(0.,.5+.5*cos(fieldAngle)),max(2.,7./ribbonWidth));
      float layering=pow(max(0.,.5+.5*cos(q.z*11.+planar*7.-t*.43)),3.);
      flowCurrents=fieldLoop*(.40+.68*layering);
      flowFog=.54;
    }else if(uFlow.x<2.5){
      // Aurora: flowing translucent vertical sheets, not spiralling plasma.
      float curtainPhase=q.x*9.+q.z*8.+
                         sin(q.y*5.+t*.24)*1.8+broad*3.2-t*.55+flowDeflection;
      float veil=pow(max(0.,.5+.5*cos(curtainPhase)),max(1.8,5.2/ribbonWidth));
      float feather=.5+.5*sin(q.y*9.-t*.38+detail*4.);
      flowCurrents=veil*(.38+.67*feather);
      flowFog=.46;
    }else if(uFlow.x<3.5){
      // Ionized nebula: broad, turbulent luminous clouds, minimal filaments.
      float densityCloud=smoothstep(.17,.69,broad*.70+detail*.30);
      float swirls=.5+.5*cos(q.z*5.+planar*4.-t*.22+depthWarp*2.+flowDeflection);
      flowCurrents=densityCloud*(.28+.28*swirls);
      flowFog=1.55+.55*ribbonWidth;
    }else{
      // Fusion jets: eight radial stellar emission cones with local ripples.
      float radialPhase=angle*8.+q.z*3.4+depthWarp*2.3-t*.42+flowDeflection;
      float jets=pow(max(0.,.5+.5*cos(radialPhase)),max(2.,9./ribbonWidth));
      float outward=smoothstep(.08,.36,planar)*exp(-distance3D*1.2);
      flowCurrents=jets*(.50+.86*outward);
      flowFog=.40;
    }
    float currents=0.;
    currents=flowCurrents;
    // Only the selected volumetric flow remains active: no legacy energy overlays.
    // Shell-free emission: only flow currents and nucleus contribute to optical density.
    float density=(currents*.43*emission+
                   core*.69+coreHalo*.11)*interior;
    float absorption=clamp(density*stride*5.2,0.,.49);
    vec3 blue=mix(uDeep*.65,uViolet*.69,clamp(distance3D*.72+broad*.42,0.,1.));
    float violetBand=.5+.5*sin(angle*3.0+q.z*4.0+broad*2.2);
    vec3 ion=mix(uCyan,uViolet,clamp(.12+.72*violetBand,0.,1.));
    vec3 filamentColor=mix(blue,ion,clamp(currents*.83+.11,0.,1.));
    // R197 — Depth visibility: far-side streamlines recede behind the front envelope.
    // This shades the real ray-marched 3D samples, not a screen-space fake overlay.
    float frontness=smoothstep(-.67,.78,z/max(radius,.001));
    float keyLight=clamp(.94-.26*q.x/max(radius,.001)
                         +.20*q.y/max(radius,.001),.60,1.33);
    float contour=mix(.90,1.05,smoothstep(.12,.88,planar));
    float depthShade=mix(.68,1.21,frontness)*keyLight*contour;
    vec3 radiance=filamentColor*(.48+currents*1.31)*depthShade
                  +uCyan*coreHalo*.50
                  +uCore*core*pow(max(uShape.w,0.),1.35)*2.4;
    accum+=trans*radiance*absorption;
    trans*=1.-absorption;
    sceneDensity+=absorption;
  }
  // Borderless energy: radial mask only fades the currents at the limit.
  float silhouette=xy/radius;
  float edge=1.-smoothstep(.92,1.0,silhouette);
  float coreScreen=exp(-dot(p,p)/(nucleusRadius*nucleusRadius)*1.8);
  // Limit highlight flattening; retain local nucleus brightness and gas transparency.
  vec3 result=accum*2.05+
              uCore*coreScreen*pow(max(uShape.w,0.),1.26)*.56;
  result*=mix(1.,.86,smoothstep(.62,.94,silhouette));
  // HDR-inspired, smooth light mapping; no clipped flat cyan marble.
  result=vec3(1.)-exp(-max(result,vec3(0.))*1.15);
  float alpha=(1.-trans)+coreScreen*.69;
  float plasmaAlpha=clamp(alpha*edge*uEffects.w,0.,1.);
  // The room is behind, Core radiance and fog occlude it in the SAME render.
  // Preserve filament gradients but restore the Core's luminous dynamic range.
  // Color-preserving screen response: avoid whitening violet/green filaments.
  float streamVisibility=min(2.1,pow(plasmaAlpha,.68)*3.4);
  float coreStar=exp(-dot(p,p)/(nucleusRadius*nucleusRadius)*1.1);
  float originalLuma=dot(result,vec3(.28,.58,.14));
  vec3 saturated=clamp(vec3(originalLuma)+(result-vec3(originalLuma))*2.15,vec3(0.),vec3(1.));
  vec3 incident=background*(1.-plasmaAlpha*.63)+saturated*streamVisibility*1.55;
  vec3 composed=incident/(vec3(1.)+incident*.35);
  composed+=uCore*coreStar*.78;
  gl_FragColor=vec4(min(vec3(1.),composed),1.);
  return;
 }
 if(uPass>1.5&&uPass<2.5){
  // Thin, continuous high-voltage traces (GL.LINES), never a bead cloud.
  if(length(p)>=radius*.98)discard;
  float flash=clamp(vLife,0.,1.)*clamp(uEffects.w,0.,1.);
  vec3 boltColor=mix(uCyan,uCore,uLayer>.5?.88:.34);
  float intensity=flash*(uLayer>.5?.87:.24);
  gl_FragColor=vec4(boltColor*intensity,clamp(intensity,0.,1.));
  return;
 }
 vec2 c=gl_PointCoord*2.-1.;
 float r2=dot(c,c);
 float halo=exp(-r2*3.1),hot=exp(-r2*14.);
 float energy=(uLayer<.5?halo*.26:hot*1.13+halo*.13)*vLife*vGlint;
 if(uPass>.5&&uPass<1.5)energy*=.025; // restrained shell: no starfield over the material
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
 const keys=['uResolution','uTime','uPass','uLayer','uTilt','uPointer','uControls','uShape','uEffects','uCore','uCyan','uViolet','uDeep','uVolumeSteps','uFlow','uSceneScroll','uSceneQuality'];
 const U=Object.fromEntries(keys.map(k=>[k,gl.getUniformLocation(program,k)]));
 if(A<0||S<0||keys.some(k=>U[k]===null)){status(mainStatus,'GPU : paramètres incomplets.');return;}
 const quad=gl.createBuffer(),seeds=gl.createBuffer();if(!quad||!seeds)return;
 gl.bindBuffer(gl.ARRAY_BUFFER,quad);
 gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
 gl.bindBuffer(gl.ARRAY_BUFFER,seeds);
 gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(Array.from({length:MAX},(_,i)=>(i+.5)/MAX)),gl.STATIC_DRAW);
 let active=true,visible=true,frame=0,last=0,lastFrame=0,elapsed=0,pointerX=0,pointerY=0,pointerImpulse=0,pointerEnergy=0;
 let qualityScale=1,slowFrames=0,fastFrames=0,framesMeasured=0,frameStart=0;
 const getScroll=()=>Math.min(1,Math.max(0,window.scrollY/Math.max(1,window.innerHeight)));

 function resize(){
  const w=canvas.clientWidth,h=canvas.clientHeight;if(w<10||h<10)return false;
  const mobile=window.innerWidth<=700;
  const scale=Math.min(window.devicePixelRatio||1,mobile?1.2:1.55,
    Math.sqrt((mobile?260000:720000)/(w*h)))*qualityScale;
  const W=Math.max(1,Math.floor(w*scale)),H=Math.max(1,Math.floor(h*scale));
  if(canvas.width!==W||canvas.height!==H){canvas.width=W;canvas.height=H;}
  gl.viewport(0,0,W,H);return true;
 }
 function draw(now){
  frame=0;if(!active||!visible||document.visibilityState!=='visible')return;
  if(lastFrame&&now-lastFrame<32){frame=requestAnimationFrame(draw);return;}
  if(!resize())return;lastFrame=now;
  const dt=last?Math.min((now-last)/1000,.06):0;
  if(last)elapsed+=dt;
  // Bounded adaptive resolution, never creating a second renderer/context.
  if(last&&dt>.052){slowFrames++;fastFrames=0;}
  else if(last&&dt<.033){fastFrames++;slowFrames=Math.max(0,slowFrames-1);}
  if(slowFrames>18&&qualityScale>.65){qualityScale=Math.max(.65,qualityScale-.1);slowFrames=0;}
  if(fastFrames>160&&qualityScale<1){qualityScale=Math.min(1,qualityScale+.05);fastFrames=0;}
  last=now;
  pointerEnergy+=(pointerImpulse-pointerEnergy)*(1-Math.exp(-dt*12));
  pointerImpulse*=Math.exp(-dt*2.5);
  const mobile=window.innerWidth<=700,preset=sel('particlePreset');
  const extra=preset!==4&&num('particleIntensity')>0&&num('particleDensity')>0;
  const sphereCount=mobile?1480:MAX;
  const electricalMode=sel('flowType')===0&&preset===1;
  const lightningCount=electricalMode&&num('arcIntensity')>0&&num('arcDensity')>0
    ?Math.min(mobile?928:1740,Math.floor((mobile?11:20)*num('arcDensity'))*58):0;
  const coreCount=mobile?160:260;
  const extraCount=Math.min(mobile?650:MAX,Math.round((mobile?340:560)*num('particleDensity')));
  gl.useProgram(program);
  gl.uniform2f(U.uResolution,canvas.width,canvas.height);
  // The camera is invariant regardless of pointer position.
  gl.uniform1f(U.uTime,elapsed);gl.uniform2f(U.uTilt,0,0);
  gl.uniform3f(U.uPointer,pointerX,pointerY,pointerEnergy);
  gl.uniform1f(U.uSceneScroll,getScroll());
  gl.uniform1f(U.uSceneQuality,mobile?.58:1.);
  gl.uniform1f(U.uVolumeSteps,mobile?12:18);
  gl.uniform2f(U.uFlow,sel('flowType'),num('flowStructure'));
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
  const emit=(pass,count,mode=gl.POINTS)=>{
   if(!count)return;
   gl.uniform1f(U.uPass,pass);
   gl.uniform1f(U.uLayer,0);gl.drawArrays(mode,0,count);
   gl.uniform1f(U.uLayer,1);gl.drawArrays(mode,0,count);
  };
  // Volumetric quad already renders the shell; omit decorative point overlay entirely.
  if(lightningCount>0){
   gl.uniform1f(U.uPass,2);gl.uniform1f(U.uLayer,0);gl.drawArrays(gl.LINES,0,lightningCount);
   gl.uniform1f(U.uLayer,1);gl.drawArrays(gl.LINES,0,lightningCount);
  }
  // The ray-marched nucleus is authoritative; avoid a second speckled core.
  if(extra)emit(0,extraCount);
  gl.disable(gl.BLEND);
  status(vfxStatus,'Plasma GPU actif · '+(extra?extraCount+' particules':'particules additionnelles désactivées')+
    ' · '+Math.floor(lightningCount/58)+' éclairs');
  if(!stage.hasAttribute('data-core-ready')){
   stage.setAttribute('data-core-ready','true');
   status(mainStatus,'Nouvelle sphère plasma WebGL active.');
  }
  if(!frameStart)frameStart=now;
  framesMeasured++;
  if(framesMeasured>=45){
    stage.dataset.coreFps=(framesMeasured*1000/Math.max(1,now-frameStart)).toFixed(1);
    stage.dataset.coreQuality=qualityScale.toFixed(2);
    stage.dataset.sceneScroll=getScroll().toFixed(3);
    framesMeasured=0;frameStart=now;
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
  // CSS scale is accounted for by using the transformed canvas rectangle.
  const r=canvas.getBoundingClientRect();
  if(r.width<10||r.height<10){pointerImpulse=0;return;}
  const nx=(event.clientX-r.left)/r.width,ny=(event.clientY-r.top)/r.height;
  if(nx<0||nx>1||ny<0||ny>1){pointerImpulse=0;return;}
  pointerX=(nx-.5)*2*canvas.width/Math.max(1,canvas.height)*1.72;
  pointerY=(.5-ny)*2*1.72+.08;
  const distance=Math.hypot(pointerX,pointerY-.08);
  pointerImpulse=distance<.8?Math.max(.3,1-distance/.85):0;
 },{passive:true});
 stage.addEventListener('pointerleave',()=>{pointerImpulse=0;},{passive:true});
 stage.addEventListener('pointercancel',()=>{pointerImpulse=0;},{passive:true});
 canvas.addEventListener('webglcontextlost',event=>{
  event.preventDefault();active=false;
  if(frame)cancelAnimationFrame(frame);frame=0;
  stage.removeAttribute('data-core-ready');
  status(mainStatus,'GPU perdu : recharge la page.');
  observer.disconnect();resizeObserver.disconnect();
 },{once:true});
 schedule();
})();