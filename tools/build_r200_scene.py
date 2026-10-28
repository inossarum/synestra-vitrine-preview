"""R200: unified WebGL1 3D scene, Core emission lights world-space metal.
One program, one canvas, one authority for room+Core, zero CSS room or reflection.
Generated from SHA-pinned R199; no third-party libraries or network dependencies.
"""
from pathlib import Path
import hashlib,re
root=Path(__file__).resolve().parent.parent
src=root/"r199";dst=root/"r200";dst.mkdir(exist_ok=True)
shader_src=root/"assets/siteforge-r198-fixed-orientation.js"
assert hashlib.sha256((src/"index.html").read_bytes()).hexdigest()=="6f0dde1f7df804cfce38313e976cb691d0496059acf9edc3f6d9a59ba63e45d8"
assert hashlib.sha256(shader_src.read_bytes()).hexdigest()=="a0f16d77d636e331b5011d68b2412767ec3b595f284a4d4283462f60f9f2c90b"
js=shader_src.read_text("utf-8").replace("\r\n","\n")
scene= r"""
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
  float grain=.5+.5*sin(pos.x*96.+pos.z*3.);
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
"""
needle="uniform vec2 uFlow; // material family 0..4, ribbon width 0.3..2\n"
assert js.count(needle)==1
js=js.replace(needle,needle+scene,1)
needle=""" vec2 p=(gl_FragCoord.xy/uResolution-.5)*2.;
 p.x*=uResolution.x/max(uResolution.y,1.);p.y+=.08;
 float radius=.64*clamp(uShape.x,.5,1.5);
 if(uPass>3.5){"""
replacement=""" vec2 view=(gl_FragCoord.xy/uResolution-.5)*2.;
 view.x*=uResolution.x/max(uResolution.y,1.);
 vec2 p=view*1.72;p.y+=.08;
 float radius=.64*clamp(uShape.x,.5,1.5);
 if(uPass>3.5){
  vec3 background=sceneColor(view);"""
assert js.count(needle)==1
js=js.replace(needle,replacement,1)
needle="""  if(xy>=radius*1.025)discard;"""
assert js.count(needle)==1
js=js.replace(needle,"""  if(xy>=radius*1.025){gl_FragColor=vec4(background,1.);return;}""",1)
needle="""  gl_FragColor=vec4(result,clamp(alpha*edge*uEffects.w,0.,1.));
  return;"""
assert js.count(needle)==1
js=js.replace(needle,"""  float plasmaAlpha=clamp(alpha*edge*uEffects.w,0.,1.);
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
  return;""",1)
needle="const keys=['uResolution','uTime','uPass','uLayer','uTilt','uPointer','uControls','uShape','uEffects','uCore','uCyan','uViolet','uDeep','uVolumeSteps','uFlow'];"
assert js.count(needle)==1
js=js.replace(needle,needle.replace("'uVolumeSteps','uFlow'","'uVolumeSteps','uFlow','uSceneScroll','uSceneQuality'"),1)
# Ensure quality uniform is live and not optimized away by shader compiler.
js=js.replace("float grain=.5+.5*sin(pos.x*96.+pos.z*3.);",
              "float grain=.5+.5*sin(pos.x*mix(52.,96.,uSceneQuality)+pos.z*3.);",1)
needle="""  const scale=Math.min(window.devicePixelRatio||1,mobile?1.5:2.25,
    Math.sqrt((mobile?650000:1500000)/(w*h)));"""
assert js.count(needle)==1
js=js.replace(needle,"""  const scale=Math.min(window.devicePixelRatio||1,mobile?1.2:1.55,
    Math.sqrt((mobile?260000:720000)/(w*h)))*qualityScale;""",1)
needle="let active=true,visible=true,frame=0,last=0,lastFrame=0,elapsed=0,pointerX=0,pointerY=0,pointerImpulse=0,pointerEnergy=0;"
assert js.count(needle)==1
js=js.replace(needle,needle+"""
 let qualityScale=1,slowFrames=0,fastFrames=0,framesMeasured=0,frameStart=0;
 const getScroll=()=>Math.min(1,Math.max(0,window.scrollY/Math.max(1,window.innerHeight)));
""",1)
needle="  if(last)elapsed+=dt;\n  last=now;"
assert js.count(needle)==1
js=js.replace(needle,"""  if(last)elapsed+=dt;
  // Bounded adaptive resolution, never creating a second renderer/context.
  if(last&&dt>.052){slowFrames++;fastFrames=0;}
  else if(last&&dt<.033){fastFrames++;slowFrames=Math.max(0,slowFrames-1);}
  if(slowFrames>18&&qualityScale>.65){qualityScale=Math.max(.65,qualityScale-.1);slowFrames=0;}
  if(fastFrames>160&&qualityScale<1){qualityScale=Math.min(1,qualityScale+.05);fastFrames=0;}
  last=now;""",1)
needle="""  gl.uniform1f(U.uVolumeSteps,mobile?14:22);"""
assert js.count(needle)==1
js=js.replace(needle,"""  gl.uniform1f(U.uSceneScroll,getScroll());
  gl.uniform1f(U.uSceneQuality,mobile?.58:1.);
  gl.uniform1f(U.uVolumeSteps,mobile?12:18);""",1)
needle="""  pointerX=(nx-.5)*2*canvas.width/Math.max(1,canvas.height);
  pointerY=(.5-ny)*2+.08;"""
assert js.count(needle)==1
js=js.replace(needle,"""  pointerX=(nx-.5)*2*canvas.width/Math.max(1,canvas.height)*1.72;
  pointerY=(.5-ny)*2*1.72+.08;""",1)
needle="  if(active&&visible)frame=requestAnimationFrame(draw);"
assert js.count(needle)==1
js=js.replace(needle,"""  if(!frameStart)frameStart=now;
  framesMeasured++;
  if(framesMeasured>=45){
    stage.dataset.coreFps=(framesMeasured*1000/Math.max(1,now-frameStart)).toFixed(1);
    stage.dataset.coreQuality=qualityScale.toFixed(2);
    stage.dataset.sceneScroll=getScroll().toFixed(3);
    framesMeasured=0;frameStart=now;
  }
  if(active&&visible)frame=requestAnimationFrame(draw);""",1)
# No secondary listener needed: running RAF reads scroll progress.
# Performance baseline: original CSS scale rendered only orb; new shader shades full surface.
shaderout=root/"assets/siteforge-r200-unified-scene.js"
shaderout.write_text(js,encoding="utf-8",newline="\n")
print("SHADER",hashlib.sha256(shaderout.read_bytes()).hexdigest())
for slug in ("","connect/","bridge/","siteforge/","offres/"):
    html=(src/slug/"index.html").read_text(encoding="utf-8").replace("\r\n","\n")
    if not slug:
        html=html.replace('siteforge-r198-fixed-orientation.js','siteforge-r200-unified-scene.js',1)
        start=html.index('        <div class="r199-architecture"')
        end=html.index('<canvas class="core-r109-canvas"',start)
        html=html[:start]+html[end:]
        html=html.replace('syn-r199-home','syn-r199-home syn-r200-home',1)
        html=html.replace('</head>','<link rel="stylesheet" href="../assets/r200-unified-scene.css"></head>',1)
        assert html.count('class="core-r109-canvas"')==1
        assert 'class="r199-architecture"' not in html
        assert 'class="r192-floor"' not in html
    target=dst/slug/"index.html";target.parent.mkdir(parents=True,exist_ok=True)
    target.write_text(html,encoding="utf-8",newline="\n")
    print("PAGE",target.relative_to(root),hashlib.sha256(target.read_bytes()).hexdigest()[:18])
print("R199_UNCHANGED",hashlib.sha256((src/"index.html").read_bytes()).hexdigest())
