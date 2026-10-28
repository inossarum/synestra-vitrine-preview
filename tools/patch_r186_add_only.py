from pathlib import Path
import hashlib
r=Path(__file__).resolve().parent.parent
jp=r/"assets/siteforge-lab-r166-flow.js"
hp=r/"siteforge/core-3d-lab/index.html"
s=jp.read_text(encoding="utf8");h=hp.read_text(encoding="utf8")
def blob(t):
 b=t.encode("utf8")
 return hashlib.sha1(b"blob "+str(len(b)).encode()+b"\0"+b).hexdigest()
assert blob(s)=="49baa2104c4200f25ff9bde63b90fda4ba9d1c60", "ORIGINAL_JS_SHA_DRIFT"
assert blob(h)=="a76dbbbd16fcf9bb36b807413bab84c12d4adaaa", "ORIGINAL_HTML_SHA_DRIFT"
old_html='<option value="5">Courants liquides</option></select>'
new_html='<option value="5">Courants liquides</option><option value="6">Rubans néon 3D · R186</option></select>'
assert h.count(old_html)==1
h_new=h.replace(old_html,new_html)
old_glsl=" if(uPass>3.5&&uPass<4.5){\n  // True 3D ray integration."
assert s.count(old_glsl)==1
ribbon_shader="""  if(uPass>3.5&&uPass<4.5&&uFlow.x>5.5){
   // R186 ADDITIVE MATERIAL ONLY. The six legacy materials below remain
   // byte-for-byte untouched. Three oblique, genuinely 3D toroidal rails.
   float radiusNeon=.70*clamp(uShape.x,.5,1.5);
   float srNeon=length(p);
   if(srNeon>=radiusNeon)discard;
   float halfNeon=sqrt(max(0.,radiusNeon*radiusNeon-dot(p,p)));
   float dzNeon=(2.*halfNeon)/max(uVolumeSteps,1.);
   float syNeon=sin(uTilt.x*1.5),cyNeon=cos(uTilt.x*1.5);
   float sxNeon=sin(uTilt.y*1.5),cxNeon=cos(uTilt.y*1.5);
   float caNeon=cos(uSpinPhase),saNeon=sin(uSpinPhase);
   vec3 cyanNeon=mix(uCyan,vec3(.06,.92,1.),.48);
   vec3 pinkNeon=mix(uViolet,vec3(1.,.12,.81),.76);
   vec3 Lneon=vec3(0.);
   float Aneon=0.;
   for(int i=0;i<22;i++){
    if(float(i)>=uVolumeSteps)break;
    float zNeon=halfNeon-(float(i)+.5)*dzNeon;
    vec3 q=vec3(p,zNeon)/radiusNeon;
    q=vec3(q.x*cyNeon+q.z*syNeon,
           q.y*cxNeon-(q.z*cyNeon-q.x*syNeon)*sxNeon,
           q.y*sxNeon+(q.z*cyNeon-q.x*syNeon)*cxNeon);
    q.xy=mat2(caNeon,-saNeon,saNeon,caNeon)*q.xy;
    // Same cursor ripple acts on all components without altering old modes.
    vec2 pointerWarp=q.xy-uPointer.xy/radiusNeon;
    q.xy+=pointerWarp*uPointer.z*.11*
       (1.-smoothstep(.12,.70,length(pointerWarp)));
    // A: cyan ring inclined 34 degrees.
    vec3 a=vec3(q.x,q.y*.83-q.z*.56,q.y*.56+q.z*.83);
    float ra=length(a.xy),thetaA=atan(a.z,ra-.52),turnA=atan(a.y,a.x);
    float tubeA=length(vec2(ra-.52,a.z));
    float shellA=exp(-pow((tubeA-.23)*19.,2.));
    float stripeA=pow(max(0.,.5+.5*cos(thetaA*3.-turnA*7.)),9.);
    float railA=shellA*stripeA;
    // B: magenta ring crosses the cyan family's real front/back depth.
    vec3 b=vec3(q.z*.70+q.x*.71,q.y,q.z*.71-q.x*.70);
    float rb=length(b.yz),thetaB=atan(b.x,rb-.51),turnB=atan(b.z,b.y);
    float tubeB=length(vec2(rb-.51,b.x));
    float shellB=exp(-pow((tubeB-.25)*19.,2.));
    float stripeB=pow(max(0.,.5+.5*cos(thetaB*3.+turnB*6.)),10.);
    float railB=shellB*stripeB;
    // C: high-frequency accents deliberately remain on the 3D tubes.
    float lineA=railA*pow(max(0.,.5+.5*cos(turnA*29.+thetaA*8.)),5.);
    float lineB=railB*pow(max(0.,.5+.5*cos(turnB*31.-thetaB*8.)),5.);
    float lensFront=.50+.58*smoothstep(-.8,.8,q.z);
    float border=1.-smoothstep(.84,1.03,length(q));
    float lightA=(railA*2.5+lineA*1.25)*lensFront*border;
    float lightB=(railB*2.5+lineB*1.25)*lensFront*border;
    Lneon+=(cyanNeon*lightA+pinkNeon*lightB+
              uCore*(lineA+lineB)*.32)*dzNeon*5.8;
    Aneon+=(railA+railB)*lensFront*border*dzNeon*4.4;
   }
   // Restrained white-hot nucleus and inward energetic glow.
   float coreNeon=exp(-dot(p,p)/(radiusNeon*radiusNeon)*31.);
   float haloNeon=exp(-dot(p,p)/(radiusNeon*radiusNeon)*5.2);
   Lneon+=uCore*coreNeon*2.0+
         (cyanNeon*.24+pinkNeon*.18)*haloNeon;
   vec3 outNeon=vec3(1.)-exp(-max(Lneon,vec3(0.))*1.6);
   float alphaNeon=clamp(.08+Aneon*.45+coreNeon*.75+haloNeon*.12,0.,1.);
   float edgeNeon=1.-smoothstep(.89,1.,srNeon/radiusNeon);
   gl_FragColor=vec4(outNeon,alphaNeon*edgeNeon*uEffects.w);
   return;
  }
"""
s_new=s.replace(old_glsl,ribbon_shader+old_glsl)
# Proof stronger than a visual diff: reverse ONLY the two inserted blocks and
# assert original exact byte sequences and git blobs fully restored.
assert s_new.replace(ribbon_shader,"")==s
assert h_new.replace(new_html,old_html)==h
jp.write_text(s_new,encoding="utf8",newline="\n")
hp.write_text(h_new,encoding="utf8",newline="\n")
print("R186_ADDITIVE_ONLY_PASS",blob(s_new),blob(h_new))
