/* SiteForge R146 — longer, more numerous thin electrical discharges distributed around the surface; a dim back-hemisphere electrical layer is visible through the plasma without thickening strokes. R140/R144/R145 invariants and 8 original arcs preserved. */
(() => {
  'use strict';
  const scene = document.querySelector('.core-r108-stage');
  const canvas = scene?.querySelector('.core-r109-canvas');
  if (!scene || !canvas) return;
  const controls = Object.fromEntries(
    [...document.querySelectorAll('[data-sphere-control]')].map(el => [el.dataset.sphereControl, el])
  );
  const defaults = Object.fromEntries(Object.entries(controls).map(([key, el]) => [key, el.getAttribute?.('data-default') ?? el.defaultValue ?? el.value]));
  const numeric = key => Number(controls[key]?.value ?? defaults[key]) / 100;
  const ordinal = key => Number(controls[key]?.value ?? defaults[key]);
  const color = key => {
    const value = controls[key]?.value || defaults[key] || '#ffffff';
    return [1,3,5].map(offset => parseInt(value.slice(offset, offset+2), 16) / 255);
  };
  const status = document.querySelector('[data-render-status]');
  const stateText = message => {if (status) status.textContent = message;};
  const fallback = scene.querySelector('.core-r108-art');
  const fallbackPaint = () => {
    const stops = [
      ['#r108-plasma stop:nth-child(4)','primary'],
      ['#r108-plasma stop:nth-child(6)','primary'],
      ['#r108-plasma stop:nth-child(7)','secondary'],
      ['#r108-plasma stop:nth-child(3)','core']
    ];
    for (const [selector, key] of stops) fallback?.querySelector(selector)?.setAttribute('stop-color',controls[key]?.value || defaults[key]);
  };
  let scheduleDraw = () => {};
  const syncUI = () => {
    for (const [key, el] of Object.entries(controls)) {
      const out = document.querySelector('[data-sphere-value="'+key+'"]');
      if (out) out.textContent = el.type === 'color' ? el.value.toUpperCase() : key === 'surfaceDirection' ? el.value + ' °' : el.type === 'select-one' ? el.selectedOptions[0]?.textContent : el.value + ' %';
    }
    scene.style.setProperty('--sphere-zoom', String(numeric('diameter')));
    scene.style.setProperty('--fallback-opacity',String(numeric('opacity')));
    fallbackPaint();
  };
  const panel = document.querySelector('.lab-controls');
  const onControlChange = event => {
    if (event.target?.hasAttribute('data-sphere-control')) {syncUI();scheduleDraw();}
  };
  // iOS native select pickers may dispatch change without an input event.
  panel?.addEventListener('input', onControlChange);
  panel?.addEventListener('change', onControlChange);
  panel?.addEventListener('reset', event => {
    event.preventDefault();
    for (const [key, el] of Object.entries(controls)) el.value = defaults[key];
    syncUI();
    scheduleDraw();
  });
  syncUI();
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduceMotion.matches) {stateText('Animation réduite : aperçu statique disponible.');return;} // Accessible motion fallback
  const gl = canvas.getContext('webgl', {
    alpha: true, antialias: false, depth: false, stencil: false,
    premultipliedAlpha: false, preserveDrawingBuffer: false,
    powerPreference: 'high-performance'
  });
  if (!gl) {stateText('WebGL indisponible : aperçu de secours.');return;}

  const vertex = `
attribute vec2 aPosition;
varying vec2 uv;
void main() {
  uv = (aPosition + 1.0) * 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;
  const fragment = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
varying vec2 uv;
uniform vec2 resolution;
uniform vec2 tilt;
uniform float time;
uniform float speedRatio;
uniform float detailRatio;
uniform float agitationRatio;
uniform float shineRatio;
uniform float contrastRatio;
uniform float coreRatio;
uniform float rimRatio;
uniform float sphereAlpha;
uniform float shellDiffusionRatio;
uniform float shellThicknessRatio;
uniform float luminanceRatio;
uniform float shellVisibilityRatio;
uniform vec4 surfaceSettings; // type, movement, luminosity, emission
uniform vec4 flowSettings;    // filament density, flow speed, direction degrees, core radius
uniform vec4 reliefSettings;  // type, height, scale, roughness
uniform vec4 reliefDynamics;  // contrast, contour displacement, animation speed, reserved
uniform vec3 primaryColor;
uniform vec3 secondaryColor;
uniform vec3 coreColor;
uniform vec3 rimColor;
float hash3(vec3 p) {
  p=fract(p*.1031);
  p+=dot(p,p.yzx+33.33);
  return fract((p.x+p.y)*p.z);
}
float noise3(vec3 x) {
  vec3 i=floor(x),f=fract(x);
  f=f*f*(3.0-2.0*f);
  return mix(mix(mix(hash3(i),hash3(i+vec3(1,0,0)),f.x),
                 mix(hash3(i+vec3(0,1,0)),hash3(i+vec3(1,1,0)),f.x),f.y),
             mix(mix(hash3(i+vec3(0,0,1)),hash3(i+vec3(1,0,1)),f.x),
                 mix(hash3(i+vec3(0,1,1)),hash3(i+vec3(1,1,1)),f.x),f.y),f.z);
}
vec3 turn3(vec3 n,vec2 t){
 float a=cos(t.x),b=sin(t.x),c=cos(t.y),d=sin(t.y);
 vec3 r=vec3(a*n.x+b*n.z,n.y,-b*n.x+a*n.z);
 return vec3(r.x,c*r.y-d*r.z,d*r.y+c*r.z);
}
float r111Arc(vec2 p,float index,float seconds) {
  // Short asynchronous electrical discharges grow outwards from the nucleus.
  float cycleTime=1.12; // R115: faster non-strobing electrical cycles
  float cell=floor(seconds/cycleTime+index*.37);
  float phase=fract(seconds/cycleTime+index*.37);
  float seed=hash3(vec3(cell,index*1.81,11.3));
  float awake=step(.24,seed);
  float envelope=smoothstep(.015,.12,phase)*(1.-smoothstep(.65,.9,phase));
  float angle=6.283185*fract(seed+index*.227);
  vec2 dir=vec2(cos(angle),sin(angle));
  float along=dot(p,dir);
  float across=dot(p,vec2(-dir.y,dir.x));
  float branchSeed=hash3(vec3(cell,9.21,index));
  float jitter=sin(along*36.+seed*20.)*.022+sin(along*91.+branchSeed*21.)*.010;
  float growingTip=mix(.06,.675,smoothstep(.04,.46,phase));
  float body=smoothstep(.012,.06,along)*(1.-smoothstep(growingTip-.06,growingTip,along));
  float filament=exp(-abs(across-jitter)*92.)+.26*exp(-abs(across-jitter)*21.);
  float forkOrigin=growingTip*.46;
  float forkOffset=(along-forkOrigin)*(branchSeed-.5)*.57;
  float forkMask=smoothstep(forkOrigin-.015,forkOrigin+.03,along)*(1.-smoothstep(growingTip-.06,growingTip,along));
  float fork=exp(-abs(across-jitter-forkOffset)*83.)*forkMask*.56;
  float front=exp(-pow((along-growingTip)/.046,2.))*exp(-abs(across-jitter)*18.)*.29;
  return awake*envelope*(body*filament+fork+front);
}
// Branched, segmented high-voltage discharge IN MATERIAL COORDINATES.
// Unlike liquid sinusoidal bands, this is a thin angular polyline which
// jumps between irregular nodes and occasionally spawns a short fork.
float r145ElectricBolt(vec2 surface,float index,float seconds){
 float epoch=floor(seconds*2.25+index*.29);
 float phase=fract(seconds*2.25+index*.29);
 float seed=hash3(vec3(epoch,index*1.73,5.19));
 float ang=6.283185*fract(seed+index*.317);
 vec2 axis=vec2(cos(ang),sin(ang));
 float along=dot(surface,axis);
 float across=dot(surface,vec2(-axis.y,axis.x));
 float segment=floor(along*17.);
 float mixNode=fract(along*17.);
 float node0=hash3(vec3(segment,index,epoch));
 float node1=hash3(vec3(segment+1.,index,epoch));
 float jagged=mix(node0,node1,mixNode)*.106-.053;
 // Lengthened discharge trajectory only; stroke core, halo and forks keep
 // the proven R145 widths for a fine electrical rather than liquid look.
 float start=.005+seed*.055;
 float end=.87+.22*hash3(vec3(epoch,index,8.2));
 float extent=smoothstep(start,start+.055,along)*(1.-smoothstep(end-.08,end,along));
 float flash=smoothstep(.015,.095,phase)*(1.-smoothstep(.63,.88,phase));
 float path=abs(across-jagged);
 float core=exp(-path*170.);
 float halo=exp(-path*34.);
 float forkNode=.18+seed*.23;
 float forkPath=abs(across-jagged-(along-forkNode)*(.30*(node0-.5)));
 float fork=smoothstep(forkNode-.02,forkNode+.02,along)*exp(-forkPath*155.)*.68;
 return flash*extent*(core+halo*.19+fork);
}

void main(){
 vec2 p=(uv-.5)*2.;
 p.x*=resolution.x/max(resolution.y,1.);
 p.y+=.08;
 float radius=.69;
 // A subtle continuous edge displacement, independent of alpha and shell thickness.
 float contourAngle=atan(p.y,p.x);
 float silhouetteRadius=radius+reliefDynamics.y*.006*(sin(contourAngle*17.+time*.22*reliefDynamics.z)+.35*sin(contourAngle*37.-time*.14*reliefDynamics.z));
 float d=length(p);
 float t=time*.28*speedRatio;
 float agitation=clamp(agitationRatio,0.,2.);
 // A beautiful, slowly breathing baseline remains even at 0% agitation.
 float calmFlow=.14;
 float drift=time*.28*(calmFlow+.86*agitation)*flowSettings.y;
 float ellipseAngle=-.30;
 float ca=cos(ellipseAngle),sa=sin(ellipseAngle);
 vec2 q=vec2(p.x*ca-p.y*sa,p.x*sa+p.y*ca);
 float oval=length(vec2(q.x/.98,q.y/.31));
 float od=abs(oval-1.);
 float ring=exp(-od*od*4400.);
 float ringBloom=exp(-od*od*480.);
 float spinPulse=.77+.23*sin(atan(q.y/.31,q.x/.98)*3.-time*.46);
 float aura=exp(-pow(d/.88,2.)*3.0);
 vec3 cyan=vec3(.31,.87,1.);
 vec3 lavender=vec3(.64,.47,1.);
 vec3 navy=vec3(.009,.034,.108);
 vec3 backdrop=mix(vec3(.07,.11,.35),vec3(.04,.33,.55),smoothstep(-.8,.8,p.x));
 vec3 ringCol=mix(lavender,cyan,smoothstep(-.42,.6,p.x));
 // Draw the orbit outside, never over the sphere: removes the false equator seam.
 float exteriorFog=exp(-pow(max(d-radius,0.)/(.018+.08*shellDiffusionRatio),2.));
 vec3 outside=backdrop*aura*.07+ringCol*(ring*.34+ringBloom*.025)*spinPulse
              +rimColor*exteriorFog*shellDiffusionRatio*.10*shellVisibilityRatio;
 float outsideA=clamp(aura*.065+ring*.43+ringBloom*.035
              +exteriorFog*shellDiffusionRatio*.12*shellVisibilityRatio,0.,.75);
 if(d>silhouetteRadius){ gl_FragColor=vec4(outside,outsideA); return; }
 // Fixed front-facing geometric normal: rotating it previously swept a
 // light/dark meridian across the sphere and made two hemispheres visible.
 vec3 geomN=vec3(p,sqrt(max(radius*radius-dot(p,p),0.)))/radius;
 // Rotate ONLY the procedural material coordinates, not lighting geometry.
 vec3 n=turn3(geomN,tilt+vec2(t*.55+sin(t*.23)*.15,cos(t*.18)*.08));
 // Material agitation is a flowing, strength-controlled 3D domain warp, not
 // a barely visible playback speed. At 0: warp=0 and no turbulent emission.
 // At 200: stronger folds, moving eddies and glowing streaks. Geometric
 // normal geomN is kept UNCHANGED to prevent the R139 hemisphere seam.
 float eddyA=noise3(n*3.1+vec3(drift*.83,-drift*.55,drift*.33));
 // Second eddy uses analytic flow to avoid another expensive 3D noise lookup on phones.
 float eddyB=.5+.5*sin(n.x*8.3-n.y*5.7+n.z*9.1+drift*1.7);
 vec3 warp=(.035+agitation*.155)*vec3(
   sin(n.y*13.+n.z*5.+drift*4.1+eddyB*5.),
   cos(n.x*12.-n.z*7.-drift*3.7+eddyA*5.),
   sin(n.x*9.+n.y*11.+drift*3.3+eddyB*4.)
 );
 // Independent surface motion and direction, active at calm agitation.
 float flowAngle=flowSettings.z*.01745329252;
 vec2 flowDir=vec2(cos(flowAngle),sin(flowAngle));
 float flowClock=time*.28*flowSettings.y;
 float motionPhase=dot(n.xy,flowDir)*13.+flowClock*2.2;
 float motionPattern=sin(motionPhase);
 if(surfaceSettings.y>.5 && surfaceSettings.y<1.5)motionPattern=sin(dot(n.xy,flowDir)*19.-flowClock*3.);
 else if(surfaceSettings.y>1.5 && surfaceSettings.y<2.5)motionPattern=sin(d*23.-flowClock*3.8);
 else if(surfaceSettings.y>2.5)motionPattern=sin(atan(n.y,n.x)*9.+n.z*8.-flowClock*2.);
 vec3 motionWarp=.045*vec3(flowDir.x*motionPattern,flowDir.y*motionPattern,cos(motionPhase));
 vec3 flowN=normalize(n+warp+motionWarp);
 float v=noise3(flowN*3.7+vec3(drift*.65,drift*.22,-drift*.25));
 float v2=noise3(flowN*7.5+vec3(drift*.3,-drift*.6,drift*.47));
 // Displace the luminous filaments and the fine striations together.
 float micro=noise3(flowN*(12.+detailRatio*9.)+vec3(drift*.26,-drift*.16,drift*.11));
 float mineral=(micro-.5)*.26*detailRatio;
 float angle=atan(flowN.y,flowN.x);
 float filament=sin(angle*5.+flowN.z*9.5+v*5.0-drift*2.0);
 float currents=pow(max(0.,filament*.5+.5),7.0);
 float secondary=pow(max(0.,sin(angle*8.0-flowN.z*11.0+v2*4.+drift)*.5+.5),12.);
 // Animated plasma folds are added only to material radiance, not silhouette.
 float foldA=pow(max(.5+.5*sin(flowN.x*17.+flowN.y*10.+v*6.-drift*5.3),0.),8.);
 float foldB=pow(max(.5+.5*sin(flowN.y*14.-flowN.z*15.+v2*6.+drift*3.7),0.),10.);
 float turbulenceGlow=(.10+.90*agitation)*(.24*foldA+.16*foldB);
 // R142: layered gas, bright flowlines and softly shaded plasma clouds.
 // Reuse sampled 3D noise for realistic nested structure on mobile GPUs.
 float cloudDensity=clamp(v*.52+v2*.31+eddyA*.17,0.,1.);
 float gasPocket=1.-smoothstep(.28,.69,cloudDensity);
 float litCloud=smoothstep(.34,.82,cloudDensity);
 float filamentPhase=angle*10.+flowN.z*19.+v*10.-drift*3.7;
 float microThreads=pow(max(.5+.5*sin(filamentPhase),0.),13.);
 float glowingVeins=pow(max(.5+.5*sin(filamentPhase*.57-v2*8.+drift*1.7),0.),11.);
 float curlGlow=(.16+.84*agitation)*(microThreads*.48+glowingVeins*.32)*(.50+.50*litCloud);
 float shimmer=.84+.16*sin(time*1.6+v2*11.);
 // Cooler and warmer currents separate optically; thin dark pockets add depth.
 vec3 fluidTint=mix(primaryColor,secondaryColor,clamp(.38+.62*v2,0.,1.));
 // Each energy mode has a distinct MATERIAL PROFILE, not just a tint.
 // Local density/filament patterns are bounded and continuous on the front hemisphere.
 float energyStrands=(microThreads*.55+glowingVeins*.45)*flowSettings.x;
 vec3 energyTint=mix(rimColor,coreColor,.16);
 vec3 energyPalette=mix(primaryColor,secondaryColor,.32);
 float energyMask=energyStrands;
 float energyCoverage=litCloud*.14;
 float energyShadow=gasPocket*.61;
 float energyScatter=litCloud*.36;
 float energySurfaceSpec=1.;
 float innerLightning=0.; // rear shell projected through the foreground
 float dryElectric=1.-step(.5,abs(surfaceSettings.x-1.));
 float shapeFlow=sin(angle*6.+flowN.z*13.-flowClock*1.4+v*5.);
 if(surfaceSettings.x>.5 && surfaceSettings.x<1.5){
   // ELECTRIC: dry, broken high-voltage arcs, NOT sinuous liquid bands.
   // Preserve three original centered lines as real strikes and add five
   // distant launch positions across the sphere. Thinness is unchanged.
   float electricA=r145ElectricBolt(flowN.xy,1.0,time);
   float electricB=r145ElectricBolt(flowN.xy,2.7,time);
   float electricC=r145ElectricBolt(flowN.xy,4.9,time);
   float electricD=r145ElectricBolt(flowN.xy-vec2(.52,-.44),6.3,time);
   float electricE=r145ElectricBolt(flowN.xy-vec2(-.50,-.20),7.8,time);
   float electricF=r145ElectricBolt(flowN.xy-vec2(.03,.12),9.2,time);
   float electricG=r145ElectricBolt(flowN.xy-vec2(.44,.04),10.8,time);
   float electricH=r145ElectricBolt(flowN.xy-vec2(-.04,.57),12.3,time);
   float lightning=max(max(max(electricA,electricB),max(electricC,electricD)),
                       max(max(electricE,electricF),max(electricG,electricH)));
   // Separate back hemisphere provides a translucent depth cue rather than
   // painting all currents on the near-facing surface. It does not rotate
   // geomN (R140 seam regression guard), and is dimmer than foreground.
   vec3 backNormal=turn3(vec3(geomN.xy,-geomN.z),
                         tilt+vec2(-t*.36, t*.13));
   float innerA=r145ElectricBolt(backNormal.xy-vec2(-.26,.29),14.1,time*.94);
   float innerB=r145ElectricBolt(backNormal.xy-vec2(.38,-.25),16.3,time*1.06);
   float innerC=r145ElectricBolt(backNormal.xy-vec2(-.12,-.51),18.6,time*.89);
   float rearNetwork=max(innerA,max(innerB,innerC));
   float rearVisibility=mix(.18,.68,clamp(geomN.z,0.,1.));
   innerLightning=rearNetwork*rearVisibility;
   energyMask=lightning*flowSettings.x*2.2;
   energyCoverage=lightning*.13+innerLightning*.24;
   energyTint=mix(rimColor,vec3(.78,.97,1.),.60);
   energyPalette=vec3(.009,.025,.075);
   energyShadow=.89;
   energyScatter=.08;
   energySurfaceSpec=1.8;
 } else if(surfaceSettings.x>1.5 && surfaceSettings.x<2.5){
   // LIQUID: glossy laminar flowing bands and smooth specular wakes.
   float flowing=sin(flowN.y*16.+sin(flowN.x*8.+flowClock)*2.+v*3.-flowClock*2.);
   energyMask=smoothstep(.20,.92,.5+.5*flowing)*flowSettings.x*.76;
   energyCoverage=smoothstep(.16,.80,.5+.5*shapeFlow)*.31;
   energyTint=vec3(.21,.89,.98);
   energyPalette=mix(primaryColor,vec3(.025,.34,.52),.82);
   energyShadow=.23;
   energyScatter=.47;
   energySurfaceSpec=2.4;
 } else if(surfaceSettings.x>2.5 && surfaceSettings.x<3.5){
   // ION FOG: nebulous clouds with soft distributed blue-violet luminance.
   energyMask=smoothstep(.33,.77,cloudDensity)*flowSettings.x*.70;
   energyCoverage=smoothstep(.26,.73,cloudDensity)*.48;
   energyTint=vec3(.58,.45,1.);
   energyPalette=mix(primaryColor,vec3(.19,.13,.48),.84);
   energyShadow=.14;
   energyScatter=.95;
   energySurfaceSpec=.32;
 } else if(surfaceSettings.x>3.5 && surfaceSettings.x<4.5){
   // SOLAR FUSION: warm rolling convection cells, hot seams, dark pits.
   float solarCells=abs(sin(flowN.x*12.+v*5.+flowClock)*cos(flowN.y*12.-v2*5.));
   energyMask=pow(solarCells,3.)*flowSettings.x*1.25;
   energyCoverage=smoothstep(.32,.79,cloudDensity)*.27;
   energyTint=vec3(1.,.38,.055);
   energyPalette=mix(primaryColor,vec3(.48,.083,.014),.91);
   energyShadow=.68;
   energyScatter=.64;
   energySurfaceSpec=.77;
 } else if(surfaceSettings.x>4.5){
   // CRYSTAL: angular intersecting facets and hard, orthogonal glowing edges.
   float facets=abs(fract(flowN.x*8.+v*.25)-.5)+abs(fract(flowN.y*7.-v2*.35)-.5);
   float facetsEdge=1.-smoothstep(.42,.55,facets);
   energyMask=facetsEdge*flowSettings.x*1.1;
   energyCoverage=smoothstep(.55,.84,facets)*.24;
   energyTint=vec3(.66,.93,1.);
   energyPalette=mix(primaryColor,vec3(.11,.43,.65),.82);
   energyShadow=.55;
   energyScatter=.27;
   energySurfaceSpec=2.5;
 }
 // Relief types change HEIGHT FIELDS, local shading and surface microcontrast.
 float reliefFrequency=mix(4.,28.,clamp(reliefSettings.z*.5,0.,1.));
 float reliefClock=time*.22*reliefDynamics.z;
 float reliefHeight=.5+.5*sin(flowN.x*reliefFrequency+reliefClock)*cos(flowN.y*reliefFrequency*.83-reliefClock);
 vec2 reliefGrad=vec2(cos(flowN.x*reliefFrequency+reliefClock),cos(flowN.y*reliefFrequency*.83-reliefClock));
 if(reliefSettings.x>.5 && reliefSettings.x<1.5){
   // VEINS: bright raised striations.
   float veins=sin(angle*reliefFrequency*.6+v*7.);
   reliefHeight=pow(max(.5+.5*veins,0.),9.);
   reliefGrad=vec2(cos(angle*reliefFrequency*.6+v*7.),sin(angle*reliefFrequency*.6+v2*6.));
 } else if(reliefSettings.x>1.5 && reliefSettings.x<2.5){
   // CRACKED: dark fractures with hard surrounding plateaus.
   float fractures=min(abs(sin(flowN.x*reliefFrequency+v*4.)),abs(cos(flowN.y*reliefFrequency-v2*4.)));
   reliefHeight=smoothstep(.08,.19,fractures);
   reliefGrad=vec2(sign(sin(flowN.x*reliefFrequency+v*4.)),sign(cos(flowN.y*reliefFrequency-v2*4.)));
 } else if(reliefSettings.x>2.5 && reliefSettings.x<3.5){
   // TURBULENT: high-amplitude convoluted rolling folds.
   reliefHeight=.5+.5*sin(flowN.y*reliefFrequency+v*11.-reliefClock)*cos(flowN.x*reliefFrequency+v2*9.+reliefClock);
   reliefGrad=vec2(sin(flowN.y*reliefFrequency+v*10.-reliefClock),cos(flowN.x*reliefFrequency+v2*9.+reliefClock));
 } else if(reliefSettings.x>3.5 && reliefSettings.x<4.5){
   // CRYSTALLINE: discrete facet planes with angular bevels.
   reliefHeight=floor((flowN.x+flowN.y*.7+v*.35)*reliefFrequency*.35)*.11;
   reliefGrad=vec2(step(.55,fract(flowN.x*reliefFrequency))-.5,step(.55,fract(flowN.y*reliefFrequency))-.5)*2.;
 } else if(reliefSettings.x>4.5){
   // SMOOTH: essentially no bump, explicit visual contrast to the other modes.
   reliefHeight=.48+.03*v;
   reliefGrad*=.02;
 }
 float reliefStrength=reliefSettings.y*reliefDynamics.x;
 float reliefTangentAmplitude=clamp(reliefStrength*.72,0.,1.6);
 vec3 bumpNormal=normalize(geomN+vec3(reliefGrad*reliefTangentAmplitude,0.));
 float bumpLight=clamp(.46+.54*dot(bumpNormal,normalize(vec3(-.38,.60,.72))),0.,1.);
 float bumpSpec=pow(max(dot(bumpNormal,normalize(vec3(.40,-.25,.88))),0.),mix(44.,5.,clamp(reliefSettings.w*.5,0.,1.)));
 float reliefShade=clamp(.27+bumpLight*.63+reliefHeight*.55*reliefStrength,0.,2.0);
  // Lighting is computed in screen/front hemisphere space, independent
 // of rotating texture coordinates and never based on back-facing normals.
 float light=.32+.68*smoothstep(-.90,.95,dot(geomN,normalize(vec3(-.45,.58,1.))));
 float rim=pow(1.-clamp(geomN.z,0.,1.),2.05);
 float soft=clamp(.24+v*.44+light*.36,0.,1.);
 // Thickness exists near the silhouette only. A front-facing opaque shell
 // cannot show a concentric inner circle without looking sliced in two.
 float shellDiffuse=clamp(shellDiffusionRatio,0.,1.);
 float grazing=1.-clamp(geomN.z,0.,1.);
 float shellStart=mix(.98,.32,clamp(shellThicknessRatio,0.,1.));
 float shellFeather=mix(.025,.14,shellDiffuse);
 float shellRim=smoothstep(shellStart-shellFeather,shellStart+shellFeather,grazing);
 float shellInnerEdge=4.*shellRim*(1.-shellRim);
 float shellOptical=.45+.55*shellRim;
 vec3 base=mix(navy,primaryColor,soft);
 base=mix(base,secondaryColor,smoothstep(.33,.82,v)*.42);
 // Dense cloud hollows and illuminated gaseous layers provide depth without
 // introducing a fake inner disc or rotating the surface lighting normal.
 base=mix(base,navy*.36+fluidTint*.30,gasPocket*energyShadow);
 base=mix(base,energyPalette,clamp(.58+.12*energyShadow,0.,1.));
 base+=mix(primaryColor*.42,energyTint*.72,litCloud)*energyScatter*.36;
 base*=mix(.56,1.34,clamp(surfaceSettings.z*.5,0.,1.));
 base*=reliefShade;
 base+=energyTint*bumpSpec*.39*reliefStrength*shineRatio*energySurfaceSpec;
 base+=mix(primaryColor,secondaryColor,micro)*mineral;
 base*=.82+.18*pow(max(geomN.z,0.),.55);
 base+=cyan*currents*(.045+.19*light)*(1.-dryElectric*.97);
 base+=lavender*secondary*(.035+.10*v)*(1.-dryElectric*.97);
 base+=mix(cyan,lavender,clamp(v2,0.,1.))*turbulenceGlow*(1.-dryElectric*.95);
 // HDR-like emissive strand cores and lower-energy bloom are resolved by the
 // existing tone mapper, preserving color and avoiding white clipping.
 base+=mix(cyan,lavender,clamp(v2*.74,0.,1.))*(curlGlow*.76+microThreads*.10*detailRatio)*shimmer*(1.-dryElectric*.97);
 base+=energyTint*(energyMask*1.38+energyCoverage*.46)*surfaceSettings.w*shimmer;
 base+=mix(primaryColor,cyan,.48)*agitation*.12*(eddyA-.5);
 base+=rimColor*rim*(.28+.30*shellOptical)*rimRatio*shellVisibilityRatio;
 // Stable broad and sharp specular lobes, even at neutral rotation.
 float spec=pow(max(dot(geomN,normalize(vec3(-.38,.55,.92))),0.),12.);
 float specFine=pow(max(dot(geomN,normalize(vec3(.47,-.18,.91))),0.),34.);
 base+=vec3(.88,.96,1.)*(spec*.42+specFine*.28)*shineRatio*(1.-dryElectric*.95);
 float topRim=smoothstep(-.2,.8,p.y)*rim;
 base+=rimColor*topRim*.17*rimRatio*shellVisibilityRatio;
 float coreSize=max(flowSettings.w,.003);
 float centralSource=exp(-d*d*115./(coreSize*coreSize));
 float coreBloom=exp(-d*d*8.5/(coreSize*coreSize));
 base+=coreColor*(centralSource*.64+coreBloom*.62)*coreRatio;
 // An electric discharge needs a black dielectric substrate and blue-white
 // flashes, not the watery scattered gas that other energy types use.
 if(dryElectric>.5){
   vec3 midnight=energyPalette*.36+energyTint*energyMask*.20+
                 coreColor*(centralSource*.30+coreBloom*.065)*coreRatio;
   base=mix(base,midnight,.80);
   base+=energyTint*energyMask*1.95*surfaceSettings.w;
   // Back-layer light shines through the otherwise dark electrical shell.
   base+=mix(coreColor,energyTint,.58)*innerLightning*.94*surfaceSettings.w;
 }
 vec3 scatter=mix(primaryColor,secondaryColor,.4);
 base=mix(base,scatter*(.48+.44*shellOptical),shellDiffuse*.23);
 // A shallow translucent layer at grazing angles implies wall depth without
 // drawing an artificial inner hemisphere onto the front surface.
 vec3 wallMaterial=mix(base*.72+secondaryColor*.28,
                       base*.62+rimColor*.38,clamp(light,0.,1.));
 base=mix(base,wallMaterial,shellRim*(.33+.20*(1.-shellDiffuse))*shellVisibilityRatio);
 base+=rimColor*shellInnerEdge*.10*(1.-shellDiffuse*.45)*shellVisibilityRatio;
 float shellHaze=exp(-pow((radius-d)/(.06+.04*shellDiffuse),2.));
 base+=mix(rimColor,scatter,.42)*shellHaze*shellDiffuse*.095*shellVisibilityRatio;
 // Late material emboss: apply AFTER plasma glow and shell scattering.
 // Earlier bump-only shading was overwritten by emissive additions and
 // relief modes became visually indistinguishable.
 float sculptDepth=clamp(reliefStrength,0.,2.);
 float grooves=pow(1.-clamp(reliefHeight,0.,1.),1.6);
 float crests=pow(clamp(reliefHeight,0.,1.),2.6);
 float contourShade=clamp(1.-grooves*.75*sculptDepth+
                          crests*.65*sculptDepth+
                          (bumpLight-.55)*.9*sculptDepth,.12,2.4);
 if(reliefSettings.x>1.5 && reliefSettings.x<2.5)
   contourShade*=mix(.28,1.08,smoothstep(.08,.32,reliefHeight));
 if(reliefSettings.x>3.5 && reliefSettings.x<4.5)
   contourShade*=mix(.65,1.26,step(.13,fract(reliefHeight*4.)));
 if(reliefSettings.x>4.5)
   contourShade=mix(1.,contourShade,.035);
 base*=mix(1.,contourShade,clamp(sculptDepth*.85,0.,1.));
 base+=energyTint*crests*.16*sculptDepth*(1.-dryElectric*.65);
 base=(base-vec3(.3))*contrastRatio+vec3(.3);
 float arcA=r111Arc(p,1.,time);
 float arcB=r111Arc(p,2.,time);
 float arcC=r111Arc(p,3.,time);
 float arcD=r111Arc(p,4.,time);
 float arcE=r111Arc(p,5.,time);
 float arcF=r111Arc(p,6.,time);
 float arcG=r111Arc(p,7.,time);
 float arcH=r111Arc(p,8.,time);
 // R114: eight independent centre-to-edge arcs, bounded by sphere mask.
 base+=(vec3(.78,.96,1.)*arcA*1.12+vec3(.39,.77,1.)*arcB*.91+vec3(.78,.69,1.)*arcC*.88)*mix(1.,2.9,dryElectric);
 base+=(vec3(.49,.96,.97)*arcD*.92+vec3(.83,.94,1.)*arcE*.84)*mix(1.,2.9,dryElectric);
 base+=(vec3(.46,.88,1.)*arcF*.91+vec3(.70,.59,1.)*arcG*.87+vec3(.90,.98,1.)*arcH*.89)*mix(1.,2.9,dryElectric);
 // Opacity belongs solely to opacity. Thickness changes only the narrow
 // grazing-angle wall shading, not alpha nor a second interior disk.
 float edgeSoftness=mix(.008,.063,shellDiffuse);
 float shellFade=1.-smoothstep(silhouetteRadius-edgeSoftness,silhouetteRadius-.001,d);
 // At shell visibility 0, transparent dark gaps reveal the background.
 // Only current filaments, mode-specific clouds and original arcs remain.
 float dischargeAlpha=clamp((arcA+arcB+arcC+arcD+arcE+arcF+arcG+arcH)*.29,0.,.64);
 float circulatingEnergyAlpha=clamp((energyMask*.58+energyCoverage*.65+curlGlow*.27)*surfaceSettings.w+dischargeAlpha,0.,.98);
 circulatingEnergyAlpha=clamp(circulatingEnergyAlpha+innerLightning*.70*surfaceSettings.w,0.,.98);
 float alpha=sphereAlpha*shellFade*mix(circulatingEnergyAlpha,1.,clamp(shellVisibilityRatio,0.,1.));
 // Exposure is independent of nuclear light, specularity and transparency.
 float exposure=pow(max(luminanceRatio,0.),1.45);
 vec3 radiance=max(base,vec3(0.))*exposure;
 vec3 toneMapped=vec3(1.)-exp(-radiance*1.14);
 gl_FragColor=vec4(clamp(toneMapped,0.,1.),alpha);
}`;

  const shader = (type, code) => {
    const obj = gl.createShader(type);
    if (!obj) return null;
    gl.shaderSource(obj, code);
    gl.compileShader(obj);
    if (!gl.getShaderParameter(obj, gl.COMPILE_STATUS)) {
      stateText('Erreur shader WebGL : aperçu SVG de secours.');
      gl.deleteShader(obj);
      return null;
    }
    return obj;
  };
  const vert = shader(gl.VERTEX_SHADER, vertex);
  const frag = shader(gl.FRAGMENT_SHADER, fragment);
  if (!vert || !frag) return;
  const program = gl.createProgram();
  if (!program) return;
  gl.attachShader(program, vert);
  gl.attachShader(program, frag);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {stateText('Programme WebGL indisponible : aperçu SVG.');return;}
  gl.deleteShader(vert);
  gl.deleteShader(frag);
  gl.useProgram(program);
  const buffer = gl.createBuffer();
  if (!buffer) return;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1
  ]), gl.STATIC_DRAW);
  const pos = gl.getAttribLocation(program, 'aPosition');
  if (pos < 0) return;
  gl.enableVertexAttribArray(pos);
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
  const res = gl.getUniformLocation(program, 'resolution');
  const time = gl.getUniformLocation(program, 'time');
  const tilt = gl.getUniformLocation(program, 'tilt');
  const parameters = Object.fromEntries([
    'speedRatio','detailRatio','agitationRatio','shineRatio','contrastRatio',
    'coreRatio','rimRatio','sphereAlpha','shellDiffusionRatio','shellThicknessRatio','luminanceRatio','shellVisibilityRatio',
    'surfaceSettings','flowSettings','reliefSettings','reliefDynamics',
    'primaryColor','secondaryColor','coreColor','rimColor'
  ].map(key => [key, gl.getUniformLocation(program, key)]));
  if (res === null || time === null || tilt === null ||
      Object.values(parameters).some(v => v === null)) {stateText('Uniforme GPU manquant : aperçu SVG.');return;}
  const applyUniforms = () => {
    const keys = {
      speedRatio:'rotation',detailRatio:'details',agitationRatio:'agitation',
      shineRatio:'shine',contrastRatio:'contrast',coreRatio:'coreLight',
      rimRatio:'rimLight',sphereAlpha:'opacity',
      shellDiffusionRatio:'diffusion',shellThicknessRatio:'thickness',
      luminanceRatio:'luminance',shellVisibilityRatio:'shellVisibility'
    };
    for (const [name, control] of Object.entries(keys)) gl.uniform1f(parameters[name],numeric(control));
    gl.uniform4fv(parameters.surfaceSettings,new Float32Array([
      ordinal('energyMode'),ordinal('surfaceMotion'),numeric('surfaceGlow'),numeric('surfaceEmission')
    ]));
    gl.uniform4fv(parameters.flowSettings,new Float32Array([
      numeric('surfaceFlow'),numeric('surfaceSpeed'),ordinal('surfaceDirection'),numeric('coreSize')
    ]));
    gl.uniform4fv(parameters.reliefSettings,new Float32Array([
      ordinal('reliefMode'),numeric('reliefIntensity'),numeric('reliefScale'),numeric('reliefRoughness')
    ]));
    gl.uniform4fv(parameters.reliefDynamics,new Float32Array([
      numeric('reliefContrast'),numeric('reliefDeform'),numeric('reliefSpeed'),0
    ]));
    for (const [name, control] of Object.entries({
      primaryColor:'primary',secondaryColor:'secondary',coreColor:'core',rimColor:'rim'
    })) gl.uniform3fv(parameters[name],new Float32Array(color(control)));
  };

  let visible = true;
  let active = true;
  let frame = 0;
  let last = 0;
  let lastFrame = 0;
  let elapsed = 0;
  let targetX = 0, targetY = 0, rx = 0, ry = 0;
  const size = () => {
    // clientWidth/Height deliberately ignore CSS zoom: rendering at transformed
    // box dimensions blurs the sphere on Retina/mobile screens.
    const logicalWidth = canvas.clientWidth, logicalHeight = canvas.clientHeight;
    if (logicalWidth < 10 || logicalHeight < 10) return false;
    const mobile = window.innerWidth <= 700;
    const requested = Math.min(window.devicePixelRatio || 1, mobile ? 2.0 : 2.5);
    const maxScale = Math.sqrt((mobile ? 950000 : 1900000)/(logicalWidth*logicalHeight));
    const pixelRatio = Math.min(requested, maxScale);
    const width = Math.max(1, Math.floor(logicalWidth*pixelRatio));
    const height = Math.max(1, Math.floor(logicalHeight*pixelRatio));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    gl.viewport(0, 0, width, height);
    gl.uniform2f(res, width, height);
    return true;
  };
  const draw = (clock) => {
    frame = 0;
    if (!active || reduceMotion.matches) {
      if (reduceMotion.matches) scene.removeAttribute('data-core-ready');
      return;
    }
    if (lastFrame && clock - lastFrame < 32) {
      if (visible && document.visibilityState === 'visible') frame=requestAnimationFrame(draw);
      return;
    }
    if (!size()) return;
    lastFrame = clock;
    const still = reduceMotion.matches;
    if (!still && last) elapsed += Math.min((clock-last)/1000, .05);
    last=clock;
    rx += (targetX-rx)*.06;
    ry += (targetY-ry)*.06;
    gl.uniform1f(time,still?0:elapsed);
    gl.uniform2f(tilt,still?0:rx,still?0:ry);
    applyUniforms();
    gl.clearColor(0,0,0,0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES,0,6);
    if (!scene.hasAttribute('data-core-ready')) {scene.setAttribute('data-core-ready','true');stateText('WebGL actif — les réglages sont appliqués en direct.');}
    if (visible && document.visibilityState === 'visible' && !still) frame=requestAnimationFrame(draw);
  };
  scheduleDraw = () => {
    if (reduceMotion.matches) { scene.removeAttribute('data-core-ready'); return; }
    if (!active || frame || document.visibilityState !== 'visible' || !visible) return;
    frame=requestAnimationFrame(draw);
  };
  const observer = new IntersectionObserver(entries => {
    visible=entries[0]?.isIntersecting ?? false;
    last=0;
    if (visible) scheduleDraw();
    else if (frame) {cancelAnimationFrame(frame);frame=0;}
  },{threshold:.01});
  observer.observe(scene);
  scene.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch' || reduceMotion.matches) return;
    const rect=scene.getBoundingClientRect();
    targetX=Math.max(-.28,Math.min(.28,(event.clientX-rect.left)/rect.width-.5));
    targetY=Math.max(-.22,Math.min(.22,(event.clientY-rect.top)/rect.height-.5));
    scheduleDraw();
  },{passive:true});
  scene.addEventListener('pointerleave',()=>{
    targetX=0;targetY=0;scheduleDraw();
  },{passive:true});
  const resize = new ResizeObserver(()=>scheduleDraw());
  resize.observe(canvas);
  document.addEventListener('visibilitychange',()=>{last=0;scheduleDraw();});
  reduceMotion.addEventListener('change',()=>{last=0;scheduleDraw();});
  canvas.addEventListener('webglcontextlost',event=>{
    event.preventDefault();
    active=false;
    if(frame)cancelAnimationFrame(frame);
    frame=0;
    scene.removeAttribute('data-core-ready');
    stateText('Contexte WebGL perdu : recharge la page pour reprendre.');
    observer.disconnect();
    resize.disconnect();
  },{once:true});
  scheduleDraw();
})();
