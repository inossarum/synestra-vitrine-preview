/* Synestra R109 — one lightweight WebGL plasma orb.
 * Local only. No remote imports, telemetry, network calls or third-party libs.
 * WebGL failure, lost context and reduced-motion leave the original SVG visible.
 */
(() => {
  'use strict';
  const scene = document.querySelector('.core-r108-stage');
  const canvas = scene?.querySelector('.core-r109-canvas');
  if (!scene || !canvas) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
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
float hash(vec3 p) {
  p = fract(p * .1031);
  p += dot(p, p.yxz + 33.33);
  return fract((p.x + p.y) * p.z);
}
float noise(vec3 p) {
  vec3 i = floor(p), f = fract(p);
  f = f*f*(3.0-2.0*f);
  return mix(
    mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),
        mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),
    mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),
        mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);
}
vec3 moveNormal(vec3 n) {
  float cx=cos(tilt.x), sx=sin(tilt.x);
  float cy=cos(tilt.y), sy=sin(tilt.y);
  n=vec3(cx*n.x+sx*n.z,n.y,-sx*n.x+cx*n.z);
  return vec3(n.x,cy*n.y-sy*n.z,sy*n.y+cy*n.z);
}
void main() {
  vec2 p=(uv-.5)*2.0;
  p.x *= resolution.x/max(resolution.y,1.0);
  p.y += .12;
  float rr=dot(p,p), radius=.60;
  float dist=length(p);
  float halo=exp(-12.0*pow(max(dist-radius,0.0),2.0))*exp(-1.8*dist);
  vec3 haloColor=mix(vec3(.055,.16,.45),vec3(.09,.48,.66),.40+.27*p.y);
  if(rr >= radius*radius) {
    float ring=exp(-pow((length(vec2(p.x*.72,p.y*1.35))-.83)*24.0,2.0));
    float alpha=clamp(halo*.24+ring*.16,0.0,.31);
    gl_FragColor=vec4(haloColor+vec3(ring*.21),alpha);
    return;
  }
  vec3 n=vec3(p,sqrt(max(radius*radius-rr,0.0)))/radius;
  n=moveNormal(n);
  float v=noise(n*4.8+vec3(time*.06,0.0,time*.025));
  float w=noise(n*10.0+vec3(time*.09,time*.04,0.0));
  float spiral=sin(atan(n.y,n.x)*4.0+n.z*11.0+v*5.8-time*.33);
  float energy=pow(max(0.0,spiral*.5+.5),5.0);
  float glow=pow(1.0-max(n.z,0.0),2.2);
  float light=max(dot(n,normalize(vec3(-.44,.62,1.0))),0.0);
  vec3 midnight=vec3(.035,.08,.22);
  vec3 blue=vec3(.055,.30,.68);
  vec3 violet=vec3(.25,.13,.54);
  vec3 aqua=vec3(.37,.89,1.0);
  vec3 col=mix(midnight,blue,clamp(.25+light*.65+v*.18,0.0,1.0));
  col=mix(col,violet,smoothstep(.54,.9,v)*.48);
  col+=aqua*energy*(.23+.49*light);
  col+=aqua*glow*.54;
  col+=vec3(.70,.87,1.0)*pow(max(dot(reflect(normalize(vec3(.43,-.68,-1.0)),n),vec3(0,0,1)),0.0),18.0)*.37;
  col+=vec3(w*.025);
  float rim=1.0-smoothstep(.86,1.0,dist/radius);
  float a=clamp(.96+glow*.04,0.0,1.0)*rim;
  gl_FragColor=vec4(clamp(col,0.0,1.0),a);
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
  let elapsed = 0;
  let targetX = 0, targetY = 0, rx = 0, ry = 0;
  const size = () => {
    const rect = canvas.getBoundingClientRect();
    if (rect.width < 10 || rect.height < 10) return false;
    const requested = Math.min(window.devicePixelRatio || 1, 1.5);
    const maxScale = Math.sqrt(800000/(rect.width*rect.height));
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
    if (!active || !size()) return;
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
