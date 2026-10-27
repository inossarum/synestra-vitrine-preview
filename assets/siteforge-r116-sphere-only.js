/* SiteForge R137 — original R116 plasma sphere, with owner-requested uniform controls and refined native-resolution WebGL shading. No new model, metallic rings or Visual Observer backend. R116 source: d78d7222a95fd080a408bba2237dd3b9dda05bd7. */
(() => {
  'use strict';
  const scene = document.querySelector('.core-r108-stage');
  const canvas = scene?.querySelector('.core-r109-canvas');
  if (!scene || !canvas) return;
  const controls = Object.fromEntries(
    [...document.querySelectorAll('[data-sphere-control]')].map(el => [el.dataset.sphereControl, el])
  );
  const defaults = Object.fromEntries(Object.entries(controls).map(([key, el]) => [key, el.defaultValue]));
  const numeric = key => Number(controls[key]?.value ?? defaults[key]) / 100;
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
      if (out) out.textContent = el.type === 'color' ? el.value.toUpperCase() : el.value + ' %';
    }
    scene.style.setProperty('--sphere-zoom', String(numeric('diameter')));
    scene.style.setProperty('--fallback-opacity',String(numeric('opacity')));
    fallbackPaint();
  };
  const panel = document.querySelector('.lab-controls');
  panel?.addEventListener('input', event => {
    if (event.target?.hasAttribute('data-sphere-control')) {syncUI();scheduleDraw();}
  });
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

void main(){
 vec2 p=(uv-.5)*2.;
 p.x*=resolution.x/max(resolution.y,1.);
 p.y+=.08;
 float radius=.69;
 float d=length(p);
 float t=time*.28*speedRatio;
 float drift=time*.28*agitationRatio;
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
              +rimColor*exteriorFog*shellDiffusionRatio*.10;
 float outsideA=clamp(aura*.065+ring*.43+ringBloom*.035
              +exteriorFog*shellDiffusionRatio*.12,0.,.75);
 if(d>radius){ gl_FragColor=vec4(outside,outsideA); return; }
 vec3 n=vec3(p,sqrt(max(radius*radius-dot(p,p),0.)))/radius;
 n=turn3(n,tilt+vec2(t*.55+sin(t*.23)*.15,cos(t*.18)*.08));
 float v=noise3(n*3.7+vec3(drift*.65,drift*.22,-drift*.25));
 float v2=noise3(n*7.5+vec3(drift*.3,-drift*.6,drift*.47));
 // Fine-scale volumetric striations add depth without changing R116 silhouettes.
 float micro=noise3(n*(12.+detailRatio*9.)+vec3(drift*.26,-drift*.16,drift*.11));
 float mineral=(micro-.5)*.26*detailRatio;
 float angle=atan(n.y,n.x);
 float filament=sin(angle*5.+n.z*9.5+v*5.0-drift*2.0);
 float currents=pow(max(0.,filament*.5+.5),7.0);
 float secondary=pow(max(0.,sin(angle*8.0-n.z*11.0+v2*4.+drift)*.5+.5),12.);
 // Wraparound lighting avoids a dark/bright hemisphere cut.
 float light=.20+.80*smoothstep(-.72,.84,dot(n,normalize(vec3(-.45,.58,1.))));
 float rim=pow(1.-max(n.z,0.),2.05);
 float soft=clamp(.18+v*.56+light*.47,0.,1.);
 // Projected concentric shell: thickness changes its REAL visible inner edge.
 // Outer radius stays fixed, unlike scaling or density-only implementations.
 float shellDepth=mix(.012,.31,clamp(shellThicknessRatio,0.,1.));
 float innerRadius=radius-shellDepth;
 float shellDiffuse=clamp(shellDiffusionRatio,0.,1.);
 float pixelWidth=2.0/max(resolution.y,1.0);
 float innerFeather=max(pixelWidth*1.5,mix(.004,.023,shellDiffuse));
 float wallMask=smoothstep(innerRadius-innerFeather,innerRadius+innerFeather,d);
 float innerEdge=exp(-pow((d-innerRadius)/max(innerFeather*1.8,.008),2.));
 float innerShadow=exp(-pow((d-(innerRadius-.028))/.035,2.));
 float frontDepth=sqrt(max(radius*radius-d*d,0.));
 float innerDepth=sqrt(max(innerRadius*innerRadius-d*d,0.));
 float shellOptical=1.-exp(-max(frontDepth-innerDepth,0.)*7.0);
 vec3 base=mix(navy,primaryColor,soft);
 base=mix(base,secondaryColor,smoothstep(.33,.82,v)*.42);
 base+=mix(primaryColor,secondaryColor,micro)*mineral;
 base*=.82+.18*pow(max(n.z,0.),.55);
 base+=cyan*currents*(.045+.19*light);
 base+=lavender*secondary*(.035+.10*v);
 base+=rimColor*rim*(.28+.30*shellOptical)*rimRatio;
 // Stable broad and sharp specular lobes, even at neutral rotation.
 float spec=pow(max(dot(n,normalize(vec3(-.38,.55,.92))),0.),12.);
 float specFine=pow(max(dot(n,normalize(vec3(.47,-.18,.91))),0.),34.);
 base+=vec3(.88,.96,1.)*(spec*.42+specFine*.28)*shineRatio;
 float topRim=smoothstep(-.2,.8,p.y)*rim;
 base+=rimColor*topRim*.17*rimRatio;
 float centralSource=exp(-d*d*115.);
 float coreBloom=exp(-d*d*8.5);
 base+=coreColor*(centralSource*.64+coreBloom*.62)*coreRatio;
 vec3 scatter=mix(primaryColor,secondaryColor,.4);
 base=mix(base,scatter*(.48+.44*shellOptical),shellDiffuse*.23);
 // Inner-surface wall has a physical projected boundary which moves with
 // thickness, a shaded body, a bright internal edge and interior occlusion.
 vec3 wallMaterial=mix(secondaryColor*.75+rimColor*.12,
                       primaryColor*.88+rimColor*.27,clamp(light,0.,1.));
 float wallIllum=.62+.38*shellOptical;
 base=mix(base,wallMaterial*wallIllum,wallMask*(.85-.15*shellDiffuse));
 base*=1.-innerShadow*.37*(.35+.65*wallMask);
 base+=rimColor*innerEdge*(.27+.26*(1.-shellDiffuse));
 float shellHaze=exp(-pow((radius-d)/(.06+.04*shellDiffuse),2.));
 base+=mix(rimColor,scatter,.42)*shellHaze*shellDiffuse*.095;
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
 base+=vec3(.78,.96,1.)*arcA*1.12+vec3(.39,.77,1.)*arcB*.91+vec3(.78,.69,1.)*arcC*.88;
 base+=vec3(.49,.96,.97)*arcD*.92+vec3(.83,.94,1.)*arcE*.84;
 base+=vec3(.46,.88,1.)*arcF*.91+vec3(.70,.59,1.)*arcG*.87+vec3(.90,.98,1.)*arcH*.89;
 // Opacity belongs solely to the opacity control. Thickness changes the
 // annulus width, NOT the alpha of the shell or the whole sphere.
 float edgeSoftness=mix(.008,.063,shellDiffuse);
 float shellFade=1.-smoothstep(radius-edgeSoftness,radius-.001,d);
 float alpha=sphereAlpha*shellFade;
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
    'coreRatio','rimRatio','sphereAlpha','shellDiffusionRatio','shellThicknessRatio','luminanceRatio',
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
      luminanceRatio:'luminance'
    };
    for (const [name, control] of Object.entries(keys)) gl.uniform1f(parameters[name],numeric(control));
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
  const resize = new ResizeObserver(()=>request());
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
