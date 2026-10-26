/* Synestra R109 — one lightweight WebGL plasma orb.
 * Local only. No remote imports, telemetry, network calls or third-party libs.
 * WebGL failure, lost context and reduced-motion leave the original SVG visible.
 */
(() => {
  'use strict';
  // R111 ambient field: bounded decorative DOM, shared by all public pages.
  // No telemetry, listeners on document activity only, no external dependencies.
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const startAmbient = () => {
    if (motionPreference.matches || document.querySelector('.syn-ambient-field')) return;
    const field = document.createElement('div');
    field.className = 'syn-ambient-field';
    field.setAttribute('aria-hidden', 'true');
    // R114: ambient animation continues without pointer, keyboard, or scroll activity.
    // CSS-only motion on all public pages; paused solely when tab is hidden/reduced-motion.
    const reducedCount = window.innerWidth < 640 ? 22 : 38;
    for (let i = 0; i < reducedCount; i++) {
      const particle = document.createElement('i');
      const comet = i % 11 === 0;
      particle.className = comet ? 'syn-ambient-comet' : i % 7 === 0 ? 'syn-ambient-glint' : 'syn-ambient-particle';
      const seed = Math.random();
      particle.style.setProperty('--px', (3 + Math.random() * 94).toFixed(2) + '%');
      particle.style.setProperty('--py', (4 + Math.random() * 92).toFixed(2) + '%');
      particle.style.setProperty('--size', (i % 7 === 0 ? 2.5 : 1.1 + Math.random() * 1.7).toFixed(2) + 'px');
      particle.style.setProperty('--drift', (14 + Math.random() * 42).toFixed(1) + 'px');
      particle.style.setProperty('--period', (comet ? 17 + Math.random() * 20 : 12 + Math.random() * 23).toFixed(2) + 's');
      particle.style.setProperty('--offset', (-Math.random() * 37).toFixed(2) + 's');
      particle.style.setProperty('--alpha', (.18 + seed * .28).toFixed(2));
      field.appendChild(particle);
    }
    // R115: autonomous ambient events without any additional JS animation loop.
    // Existing tab visibility and reduced-motion controls apply to this aria-hidden layer.
    const wispCount = window.innerWidth < 640 ? 2 : 3;
    for (let i = 0; i < wispCount; i++) {
      const wisp = document.createElement('i');
      wisp.className = 'syn-ambient-wisp';
      wisp.style.setProperty('--px', (12 + Math.random() * 74).toFixed(1) + '%');
      wisp.style.setProperty('--py', (8 + Math.random() * 80).toFixed(1) + '%');
      wisp.style.setProperty('--period', (21 + Math.random() * 18).toFixed(2) + 's');
      wisp.style.setProperty('--offset', (-Math.random() * 30).toFixed(2) + 's');
      field.appendChild(wisp);
    }
    const beaconCount = window.innerWidth < 640 ? 2 : 3;
    for (let i = 0; i < beaconCount; i++) {
      const beacon = document.createElement('i');
      beacon.className = 'syn-ambient-beacon';
      beacon.style.setProperty('--px', (9 + Math.random() * 82).toFixed(1) + '%');
      beacon.style.setProperty('--py', (10 + Math.random() * 79).toFixed(1) + '%');
      beacon.style.setProperty('--period', (11 + Math.random() * 15).toFixed(2) + 's');
      beacon.style.setProperty('--offset', (-Math.random() * 20).toFixed(2) + 's');
      field.appendChild(beacon);
    }
    document.body.insertBefore(field, document.body.firstChild);
  };
  startAmbient();
  const updateAmbient = () => {
    if (motionPreference.matches) {
      document.querySelector('.syn-ambient-field')?.remove();
      return;
    }
    startAmbient();
    document.documentElement.classList.toggle('syn-ambient-paused', document.visibilityState !== 'visible');
  };
  motionPreference.addEventListener('change', updateAmbient);
  document.addEventListener('visibilitychange', updateAmbient);

  const scene = document.querySelector('.core-r108-stage');
  const canvas = scene?.querySelector('.core-r109-canvas');
  if (!scene || !canvas) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduceMotion.matches) return; // Static SVG fallback; do not initialise WebGL.
  const gl = canvas.getContext('webgl', {
    alpha: true, antialias: false, depth: false, stencil: false,
    premultipliedAlpha: false, preserveDrawingBuffer: false,
    powerPreference: 'low-power'
  });
  if (!gl) return;

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
  float jitter=(sin(along*36.+seed*20.)*.022+sin(along*91.+branchSeed*21.)*.010)*smoothstep(0.,.16,max(along,0.));
  float growingTip=mix(.045,.515,smoothstep(.04,.46,phase));
  float body=smoothstep(-.005,.014,along)*(1.-smoothstep(growingTip-.06,growingTip,along));
  float filament=exp(-abs(across-jitter)*92.)+.26*exp(-abs(across-jitter)*21.);
  float forkOrigin=growingTip*.46;
  float forkOffset=(along-forkOrigin)*(branchSeed-.5)*.57;
  float forkMask=smoothstep(forkOrigin-.015,forkOrigin+.03,along)*(1.-smoothstep(growingTip-.06,growingTip,along));
  float fork=exp(-abs(across-jitter-forkOffset)*83.)*forkMask*.56;
  float front=exp(-pow((along-growingTip)/.046,2.))*exp(-abs(across-jitter)*18.)*.29;
  return awake*envelope*(body*filament+fork+front);
}

// R120: physical rectangular-section metal rings, not 2D bands or tubes.
// The ray intersects a bounded signed-distance solid; real depth and face
// normals control occlusion, lighting and the visible chamfer.
float sdRectangularRing(vec3 local,float major,float radialHalf,float thickHalf) {
 vec2 box=abs(vec2(length(local.xy)-major,local.z))-vec2(radialHalf,thickHalf);
 return length(max(box,vec2(0.)))+min(max(box.x,box.y),0.)-.0045;
}
vec4 metalGyro(vec2 p,float seconds,float slot,out float zpos) {
 float speed=slot<1.5?6.283185/13.:(slot<2.5?-6.283185/17.:6.283185/20.);
 float phase=slot<1.5?-.64:(slot<2.5?1.24:2.37);
 float spin=seconds*speed+phase;
 vec3 axis=normalize(slot<1.5?vec3(.90,.10,.42):(slot<2.5?vec3(-.45,.82,.35):vec3(.60,-.75,.29)));
 vec3 baseNormal=normalize(slot<1.5?vec3(.86,.22,.46):(slot<2.5?vec3(-.58,.71,.42):vec3(.72,-.62,.33)));
 vec3 plane=normalize(baseNormal*cos(spin)+cross(axis,baseNormal)*sin(spin)
                       +axis*dot(axis,baseNormal)*(1.-cos(spin)));
 vec3 tangentX=normalize(cross(abs(plane.z)>.91?vec3(0.,1.,0.):vec3(0.,0.,1.),plane));
 vec3 tangentY=cross(plane,tangentX);
 float major=slot<1.5?.87:(slot<2.5?.97:1.08);
 float radialHalf=slot<1.5?.037:(slot<2.5?.036:.034);
 float thickHalf=slot<1.5?.027:(slot<2.5?.026:.025);
 float bound=major+radialHalf+thickHalf+.012;
 zpos=-10.;
 if(dot(p,p)>bound*bound) return vec4(0.);
 // Orthographic front-to-back ray, conservatively bounded by a real sphere.
 float cap=sqrt(max(bound*bound-dot(p,p),0.));
 float travel=1.30-cap;
 float rayEnd=1.30+cap;
 vec3 local=vec3(0.);
 float signedDistance=1.;
 bool hit=false;
 for(int stepIndex=0;stepIndex<44;stepIndex++) {
  vec3 world=vec3(p,1.30-travel);
  local=vec3(dot(world,tangentX),dot(world,tangentY),dot(world,plane));
  signedDistance=sdRectangularRing(local,major,radialHalf,thickHalf);
  if(signedDistance<.0024){hit=true;zpos=world.z;break;}
  travel+=max(signedDistance*.92,.003);
  if(travel>rayEnd) break;
 }
 if(!hit)return vec4(0.);
 // Face/chamfer normal from the actual solid, not a projected ellipse.
 float e=.005;
 vec3 nx=vec3(e,0.,0.),ny=vec3(0.,e,0.),nz=vec3(0.,0.,e);
 vec3 normalLocal=normalize(vec3(
  sdRectangularRing(local+nx,major,radialHalf,thickHalf)-sdRectangularRing(local-nx,major,radialHalf,thickHalf),
  sdRectangularRing(local+ny,major,radialHalf,thickHalf)-sdRectangularRing(local-ny,major,radialHalf,thickHalf),
  sdRectangularRing(local+nz,major,radialHalf,thickHalf)-sdRectangularRing(local-nz,major,radialHalf,thickHalf)));
 vec3 normal=normalize(tangentX*normalLocal.x+tangentY*normalLocal.y+plane*normalLocal.z);
 float light=max(dot(normal,normalize(vec3(-.48,.64,.88))),0.);
 float face=abs(normalLocal.z);
 float brush=.5+.5*sin(atan(local.y,local.x)*54.+seconds*speed*.22);
 float sheen=pow(brush,9.)*.18+pow(max(dot(reflect(vec3(.33,-.43,-.84),normal),vec3(0.,0.,1.)),0.),22.)*.36;
 vec3 darkMetal=slot<1.5?vec3(.19,.25,.32):(slot<2.5?vec3(.22,.27,.32):vec3(.22,.24,.30));
 vec3 lightMetal=slot<1.5?vec3(.71,.78,.83):(slot<2.5?vec3(.75,.81,.84):vec3(.70,.74,.79));
 vec3 metal=mix(darkMetal,lightMetal,clamp(.23+.58*light+.16*face,0.,1.));
 metal+=vec3(.22,.23,.23)*sheen;
 metal+=vec3(.055,.064,.075)*pow(1.-max(dot(normal,vec3(0.,0.,1.)),0.),3.);
 float opacity=.97*(1.-smoothstep(.0012,.005,signedDistance));
 return vec4(clamp(metal,0.,1.),opacity);
}
// Three compare/swap passes sort every pixel back to front.
void orderGyros(inout vec4 m0,inout vec4 m1,inout vec4 m2,
                inout float z0,inout float z1,inout float z2) {
 if(z0>z1){float tz=z0;z0=z1;z1=tz;vec4 tm=m0;m0=m1;m1=tm;}
 if(z1>z2){float tz=z1;z1=z2;z2=tz;vec4 tm=m1;m1=m2;m2=tm;}
 if(z0>z1){float tz=z0;z0=z1;z1=tz;vec4 tm=m0;m0=m1;m1=tm;}
}

void main(){
 vec2 p=(uv-.5)*2.;
 p.x*=resolution.x/max(resolution.y,1.);
 p.y+=.08;
 float radius=.53;
 float d=length(p);
 float t=time*.28;
 float metalDepthA=0.,metalDepthB=0.,metalDepthC=0.;
 vec4 metalA=metalGyro(p,time,1.,metalDepthA);
 vec4 metalB=metalGyro(p,time,2.,metalDepthB);
 vec4 metalC=metalGyro(p,time,3.,metalDepthC);
 orderGyros(metalA,metalB,metalC,metalDepthA,metalDepthB,metalDepthC);
 float aura=exp(-pow(d/.88,2.)*3.0);
 vec3 cyan=vec3(.31,.87,1.);
 vec3 lavender=vec3(.64,.47,1.);
 vec3 navy=vec3(.009,.034,.108);
 vec3 backdrop=mix(vec3(.07,.11,.35),vec3(.04,.33,.55),smoothstep(-.8,.8,p.x));
 vec3 outside=backdrop*aura*.055;
 float outsideA=clamp(aura*.065,0.,.22);
 if(d>radius){
   // Gimbal fragments outside the sphere show both front and back metallic arcs.
   outside=mix(outside,metalA.rgb,metalA.a);
   outside=mix(outside,metalB.rgb,metalB.a);
   outside=mix(outside,metalC.rgb,metalC.a);
   outsideA=clamp(outsideA+metalA.a+metalB.a+metalC.a,0.,1.);
   gl_FragColor=vec4(outside,outsideA);return;
 }
 vec3 n=vec3(p,sqrt(max(radius*radius-dot(p,p),0.)))/radius;
 n=turn3(n,tilt+vec2(sin(t*.23)*.15,cos(t*.18)*.08));
 float v=noise3(n*3.7+vec3(t*.65,t*.22,-t*.25));
 float v2=noise3(n*7.5+vec3(t*.3,-t*.6,t*.47));
 float angle=atan(n.y,n.x);
 float filament=sin(angle*5.+n.z*9.5+v*5.0-t*2.0);
 float currents=pow(max(0.,filament*.5+.5),7.0);
 float secondary=pow(max(0.,sin(angle*8.0-n.z*11.0+v2*4.+t)*.5+.5),12.);
 float light=max(dot(n,normalize(vec3(-.45,.58,1.))),0.);
 float rim=pow(1.-max(n.z,0.),2.2);
 float soft=clamp(.18+v*.63+light*.55,0.,1.);
 vec3 base=mix(navy,vec3(.035,.17,.39),soft);
 base=mix(base,vec3(.12,.09,.30),smoothstep(.52,.88,v)*.17);
 base+=cyan*currents*(.045+.19*light);
 base+=lavender*secondary*(.035+.10*v);
 base+=cyan*rim*.54;
 float spec=pow(max(dot(reflect(normalize(vec3(.53,-.71,-1.)),n),vec3(0.,0.,1.)),0.),24.);
 base+=vec3(.88,.96,1.)*spec*.29;
 base+=vec3(.70,.83,.95)*pow(max(dot(n,normalize(vec3(-.28,.46,1.))),0.),22.)*.11;
 float topRim=smoothstep(-.2,.8,p.y)*rim;
 base+=vec3(.09,.22,.35)*topRim;
 // R120: emitter is composited after the eight discharges, at their origin.
 float arcA=r111Arc(p,1.,time);
 float arcB=r111Arc(p,2.,time);
 float arcC=r111Arc(p,3.,time);
 float arcD=r111Arc(p,4.,time);
 float arcE=r111Arc(p,5.,time);
 float arcF=r111Arc(p,6.,time);
 float arcG=r111Arc(p,7.,time);
 float arcH=r111Arc(p,8.,time);
 // R114: eight independent centre-to-edge arcs, bounded by sphere mask.
 base+=(vec3(.78,.96,1.)*arcA*1.12+vec3(.39,.77,1.)*arcB*.91+vec3(.78,.69,1.)*arcC*.88)*originBoost;
 base+=(vec3(.49,.96,.97)*arcD*.92+vec3(.83,.94,1.)*arcE*.84)*originBoost;
 float originBoost=1.+.52*exp(-d*d*95.);
 base+=(vec3(.46,.88,1.)*arcF*.91+vec3(.70,.59,1.)*arcG*.87+vec3(.90,.98,1.)*arcH*.89)*originBoost;
 // Compact white-hot nucleus, blue corona and soft non-strobing pulse.
 float emitterPulse=.91+.09*sin(time*2.1);
 float emitterCorona=exp(-d*d*145.);
 float emitterCore=exp(-d*d*1750.);
 base+=vec3(.21,.58,1.)*emitterCorona*.60*emitterPulse;
 base+=vec3(.80,.96,1.)*emitterCore*1.3*emitterPulse;
 float shellFade=1.-smoothstep(radius*.977,radius,d);
 float alpha=clamp(.96+rim*.04,0.,1.)*shellFade;
 // Only sections with z in front of the sphere are composited above the plasma.
 float sphereFrontZ=sqrt(max(radius*radius-d*d,0.));
 float frontA=metalA.a*step(sphereFrontZ+.01,metalDepthA);
 float frontB=metalB.a*step(sphereFrontZ+.01,metalDepthB);
 float frontC=metalC.a*step(sphereFrontZ+.01,metalDepthC);
 base=mix(base,metalA.rgb,frontA);
 base=mix(base,metalB.rgb,frontB);
 base=mix(base,metalC.rgb,frontC);
 // Foreground metal stays visible at the sphere rim rather than fading with shell alpha.
 alpha=clamp(alpha+max(max(frontA,frontB),frontC)*(1.-alpha),0.,1.);
 gl_FragColor=vec4(clamp(base,0.,1.),alpha);
}`;

  const shader = (type, code) => {
    const obj = gl.createShader(type);
    if (!obj) return null;
    gl.shaderSource(obj, code);
    gl.compileShader(obj);
    if (!gl.getShaderParameter(obj, gl.COMPILE_STATUS)) {
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
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
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
  if (res === null || time === null || tilt === null) return;

  let visible = true;
  let active = true;
  let frame = 0;
  let last = 0;
  let lastFrame = 0;
  let elapsed = 0;
  let targetX = 0, targetY = 0, rx = 0, ry = 0;
  const size = () => {
    const rect = canvas.getBoundingClientRect();
    if (rect.width < 10 || rect.height < 10) return false;
    // R114: native sharpness improves on retina screens without unbounded GPU cost.
    const requested = Math.min(window.devicePixelRatio || 1, window.innerWidth < 650 ? 1.8 : 2);
    const maxScale = Math.sqrt(1200000/(rect.width*rect.height));
    const pixelRatio = Math.min(requested, maxScale);
    const width = Math.max(1, Math.floor(rect.width*pixelRatio));
    const height = Math.max(1, Math.floor(rect.height*pixelRatio));
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
    gl.clearColor(0,0,0,0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES,0,6);
    if (!scene.hasAttribute('data-core-ready')) scene.setAttribute('data-core-ready','true');
    if (visible && document.visibilityState === 'visible' && !still) frame=requestAnimationFrame(draw);
  };
  const request = () => {
    if (reduceMotion.matches) { scene.removeAttribute('data-core-ready'); return; }
    if (!active || frame || document.visibilityState !== 'visible' || !visible) return;
    frame=requestAnimationFrame(draw);
  };
  const observer = new IntersectionObserver(entries => {
    visible=entries[0]?.isIntersecting ?? false;
    last=0;
    if (visible) request();
    else if (frame) {cancelAnimationFrame(frame);frame=0;}
  },{threshold:.01});
  observer.observe(scene);
  scene.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch' || reduceMotion.matches) return;
    const rect=scene.getBoundingClientRect();
    targetX=Math.max(-.28,Math.min(.28,(event.clientX-rect.left)/rect.width-.5));
    targetY=Math.max(-.22,Math.min(.22,(event.clientY-rect.top)/rect.height-.5));
    request();
  },{passive:true});
  scene.addEventListener('pointerleave',()=>{
    targetX=0;targetY=0;request();
  },{passive:true});
  const resize = new ResizeObserver(()=>request());
  resize.observe(canvas);
  document.addEventListener('visibilitychange',()=>{last=0;request();});
  reduceMotion.addEventListener('change',()=>{last=0;request();});
  canvas.addEventListener('webglcontextlost',event=>{
    event.preventDefault();
    active=false;
    if(frame)cancelAnimationFrame(frame);
    frame=0;
    scene.removeAttribute('data-core-ready');
    observer.disconnect();
    resize.disconnect();
  },{once:true});
  request();
})();
