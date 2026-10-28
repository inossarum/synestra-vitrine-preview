"""R190: a reversible hover-flow shader variant; preserve R189 and original engine."""
from pathlib import Path
import hashlib

root=Path(__file__).resolve().parent.parent
source=root/"assets/siteforge-r116-sphere-only.js"
r189=root/"r189-hero-candidate.html"
dst_js=root/"assets/siteforge-r190-hover-flux.js"
dst_html=root/"r190-hero-hover-flux.html"
src=source.read_text(encoding="utf-8")
html=r189.read_text(encoding="utf-8")
assert hashlib.sha256(source.read_bytes()).hexdigest()=="4aae64e2128d40a8fffa675ce12223a00c3d508b33f19b807c8b50145a197fd0"

def once(old,new):
    global src
    count=src.count(old)
    assert count==1, f"Expected exactly one shader anchor; got {count}: {old[:110]}"
    src=src.replace(old,new,1)

once("uniform vec2 uTilt;\nuniform float uVolumeSteps;",
     "uniform vec2 uTilt;\nuniform vec3 uPointer; // projected pointer position + decaying impulse\nuniform float uVolumeSteps;")
# The pointer displaces phase ONLY; the camera, nucleus and ray volume are untouched.
once("    float distance3D=length(q)/radius;",
"""    // R190: local fluid perturbation; no object rotation, no change to nucleus.
    float hoverDistance=length(p-uPointer.xy);
    float hoverEnvelope=uPointer.z*exp(-hoverDistance*hoverDistance/max(.015,radius*radius*.25));
    float flowDeflection=hoverEnvelope*
      (3.25*sin(t*3.6+q.z*6.7+length(q.xy)*9.5)
       +.70*cos(t*2.3+atan(q.y,q.x)*4.));
    float distance3D=length(q)/radius;""")
once("                    +.75*sin(q.z*2.9+planar*6.1)*sin(angle*3.+q.z*1.7);",
     "                    +.75*sin(q.z*2.9+planar*6.1)*sin(angle*3.+q.z*1.7)\n                    +flowDeflection;")
once("float fieldAngle=angle*4.+q.z*6.5+sin(planar*9.+broad*2.2-t*.65)*2.;",
     "float fieldAngle=angle*4.+q.z*6.5+sin(planar*9.+broad*2.2-t*.65)*2.+flowDeflection;")
once("sin(q.y*5.+t*.24)*1.8+broad*3.2-t*.55;",
     "sin(q.y*5.+t*.24)*1.8+broad*3.2-t*.55+flowDeflection;")
once("float swirls=.5+.5*cos(q.z*5.+planar*4.-t*.22+depthWarp*2.);",
     "float swirls=.5+.5*cos(q.z*5.+planar*4.-t*.22+depthWarp*2.+flowDeflection);")
once("float radialPhase=angle*8.+q.z*3.4+depthWarp*2.3-t*.42;",
     "float radialPhase=angle*8.+q.z*3.4+depthWarp*2.3-t*.42+flowDeflection;")
once("'uTilt','uControls'", "'uTilt','uPointer','uControls'")
once("let active=true,visible=true,frame=0,last=0,lastFrame=0,elapsed=0,tiltX=0,tiltY=0;",
     "let active=true,visible=true,frame=0,last=0,lastFrame=0,elapsed=0,pointerX=0,pointerY=0,pointerImpulse=0,pointerEnergy=0;")
once("  if(last)elapsed+=Math.min((now-last)/1000,.06);last=now;",
"""  const dt=last?Math.min((now-last)/1000,.06):0;
  if(last)elapsed+=dt;
  last=now;
  pointerEnergy+=(pointerImpulse-pointerEnergy)*(1-Math.exp(-dt*12));
  pointerImpulse*=Math.exp(-dt*2.5);""")
once("  gl.uniform1f(U.uTime,elapsed);gl.uniform2f(U.uTilt,tiltX,tiltY);",
"""  // The camera is invariant regardless of pointer position.
  gl.uniform1f(U.uTime,elapsed);gl.uniform2f(U.uTilt,0,0);
  gl.uniform3f(U.uPointer,pointerX,pointerY,pointerEnergy);""")
once(""" stage.addEventListener('pointermove',event=>{
  if(event.pointerType==='touch')return;
  const r=stage.getBoundingClientRect();
  tiltX=Math.max(-.28,Math.min(.28,(event.clientX-r.left)/r.width-.5));
  tiltY=Math.max(-.22,Math.min(.22,(event.clientY-r.top)/r.height-.5));
 },{passive:true});
 stage.addEventListener('pointerleave',()=>{tiltX=0;tiltY=0;},{passive:true});""",
""" stage.addEventListener('pointermove',event=>{
  if(event.pointerType==='touch')return;
  // CSS scale is accounted for by using the transformed canvas rectangle.
  const r=canvas.getBoundingClientRect();
  if(r.width<10||r.height<10){pointerImpulse=0;return;}
  const nx=(event.clientX-r.left)/r.width,ny=(event.clientY-r.top)/r.height;
  if(nx<0||nx>1||ny<0||ny>1){pointerImpulse=0;return;}
  pointerX=(nx-.5)*2*canvas.width/Math.max(1,canvas.height);
  pointerY=(.5-ny)*2+.08;
  const distance=Math.hypot(pointerX,pointerY-.08);
  pointerImpulse=distance<.8?Math.max(.3,1-distance/.85):0;
 },{passive:true});
 stage.addEventListener('pointerleave',()=>{pointerImpulse=0;},{passive:true});
 stage.addEventListener('pointercancel',()=>{pointerImpulse=0;},{passive:true});""")
assert "tiltX=Math.max" not in src and "tiltY=Math.max" not in src
assert html.count('src="./assets/siteforge-r116-sphere-only.js"')==1
html=html.replace('src="./assets/siteforge-r116-sphere-only.js"',
                  'src="./assets/siteforge-r190-hover-flux.js"',1)
assert html.count('class="core-r109-canvas"')==1
dst_js.write_text(src,encoding="utf-8")
dst_html.write_text(html,encoding="utf-8")
for path in (source,r189,dst_js,dst_html):
    print(path.name,hashlib.sha256(path.read_bytes()).hexdigest())
print("R190=GENERATED; R189=IMMUTABLE")
