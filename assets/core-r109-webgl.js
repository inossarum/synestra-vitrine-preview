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

void main(){
 vec2 p=(uv-.5)*2.;
 p.x*=resolution.x/max(resolution.y,1.);
 p.y+=.08;
 // R183: fit the complete orb within narrow portrait viewports without cropping its silhouette.
 float radius=min(.69, .85*resolution.x/max(resolution.y,1.));
 float d=length(p);
 float t=time*.28;
 float ellipseAngle=-.30;
 float ca=cos(ellipseAngle),sa=sin(ellipseAngle);
 vec2 q=vec2(p.x*ca-p.y*sa,p.x*sa+p.y*ca);
 float oval=length(vec2(q.x/.98,q.y/.31));
 float od=abs(oval-1.);
 float ring=exp(-od*od*4400.);
 float ringBloom=exp(-od*od*480.);
 float ringFront=smoothstep(-.12,.10,q.y);
 float spinPulse=.77+.23*sin(atan(q.y/.31,q.x/.98)*3.-time*.46);
 float aura=exp(-pow(d/.88,2.)*3.0);
 vec3 cyan=vec3(.31,.87,1.);
 vec3 lavender=vec3(.64,.47,1.);
 vec3 navy=vec3(.009,.034,.108);
 vec3 backdrop=mix(vec3(.07,.11,.35),vec3(.04,.33,.55),smoothstep(-.8,.8,p.x));
 vec3 ringCol=mix(lavender,cyan,smoothstep(-.42,.6,p.x));
 vec3 outside=backdrop*aura*.07+ringCol*(ring*.34+ringBloom*.025)*spinPulse;
 float outsideA=clamp(aura*.065+ring*.43+ringBloom*.035,0.,.65);
 if(d>radius){ gl_FragColor=vec4(outside,outsideA); return; }
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
 float centralSource=exp(-d*d*115.);
 base+=vec3(.72,.93,1.)*centralSource*.31;
 float arcA=r111Arc(p,1.,time);
 float arcB=r111Arc(p,2.,time);
 float arcC=r111Arc(p,3.,time);
 float arcD=r111Arc(p,4.,time);
 float arcE=r111Arc(p,5.,time);
 float arcF=r111Arc(p,6.,time);
 float arcG=r111Arc(p,7.,time);
 float arcH=r111Arc(p,8.,time);
 // R114: eight independent centre-to-edge arcs, bounded by sphere mask.
 base+=vec3(.78,.96,1.)*arcA*1.12+vec3(.39,.77,1.)*arcB*.91+vec3(.78,.69,1.)*arcC*.88;
 base+=vec3(.49,.96,.97)*arcD*.92+vec3(.83,.94,1.)*arcE*.84;
 base+=vec3(.46,.88,1.)*arcF*.91+vec3(.70,.59,1.)*arcG*.87+vec3(.90,.98,1.)*arcH*.89;
 float shellFade=1.-smoothstep(radius*.977,radius,d);
 float alpha=clamp(.96+rim*.04,0.,1.)*shellFade;
 float orbital=ringFront*spinPulse;
 base+=ringCol*(ring*.32+ringBloom*.018)*orbital;
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
