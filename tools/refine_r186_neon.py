from pathlib import Path
import hashlib
p=Path(__file__).resolve().parent.parent/"assets/siteforge-lab-r166-flow.js"
s=p.read_text("utf8")
start=s.index("  if(uPass>3.5&&uPass<4.5&&uFlow.x>5.5){")
end=s.index(" if(uPass>3.5&&uPass<4.5){\n  // True 3D ray integration.",start)
b=s[start:end]
def patch(old,new):
 global b
 if b.count(old)!=1:raise RuntimeError("R186_SHADER_REFINEMENT_ANCHOR "+str(b.count(old))+" "+old[:60])
 b=b.replace(old,new)
patch("float radiusNeon=.70*clamp(uShape.x,.5,1.5);","float radiusNeon=.88*clamp(uShape.x,.5,1.5);")
patch("""   if(srNeon>=radiusNeon)discard;
   float halfNeon=""","""   // Restrained atmospheric shafts, only for this extra material.
   float nearAngle=atan(p.y,p.x);
   float beam=pow(max(0.,.5+.5*cos(nearAngle*19.
                +sin(nearAngle*4.)*.85-uSpinPhase*.4)),17.);
   float atmosphere=exp(-pow(srNeon/max(radiusNeon,0.01),2.)*1.8)
                     *(.025+.10*beam);
   vec3 skyNeon=(vec3(.025,.89,1.)*.46+vec3(1.,.11,.75)*.36)
                 *atmosphere;
   if(srNeon>=radiusNeon){
    gl_FragColor=vec4(skyNeon,clamp(atmosphere*.45,0.,.15)*uEffects.w);
    return;
   }
   float halfNeon=""")
patch("vec3 cyanNeon=mix(uCyan,vec3(.06,.92,1.),.48);","vec3 cyanNeon=mix(uCyan,vec3(.025,.93,1.),.84);")
patch("vec3 pinkNeon=mix(uViolet,vec3(1.,.12,.81),.76);","vec3 pinkNeon=mix(uViolet,vec3(1.,.08,.76),.94);")
patch("float shellA=exp(-pow((tubeA-.23)*19.,2.));","float shellA=exp(-pow((tubeA-.23)*13.,2.));")
patch("float shellB=exp(-pow((tubeB-.25)*19.,2.));","float shellB=exp(-pow((tubeB-.25)*13.,2.));")
patch("""    // C: high-frequency accents deliberately remain on the 3D tubes.
    float lineA=""",
"""    // C: independent tilted ring crosses the other two in 3D and
    // contributes high-frequency braiding, not an extra particle layer.
    vec3 c=vec3(q.x*.86-q.y*.51,q.x*.51+q.y*.86,q.z);
    float rc=length(c.xz),thetaC=atan(c.y,rc-.49),turnC=atan(c.z,c.x);
    float tubeC=length(vec2(rc-.49,c.y));
    float shellC=exp(-pow((tubeC-.25)*14.,2.));
    float railC=shellC*pow(max(0.,.5+.5*cos(thetaC*4.-turnC*9.)),8.);
    float lineC=railC*pow(max(0.,.5+.5*cos(turnC*28.+thetaC*6.)),4.);
    // High-frequency accents deliberately remain on the 3D tubes.
    float lineA=""")
patch("float lightA=(railA*2.5+lineA*1.25)*lensFront*border;","float lightA=(railA*3.5+lineA*1.9+railC*1.5+lineC*.8)*lensFront*border;")
patch("float lightB=(railB*2.5+lineB*1.25)*lensFront*border;","float lightB=(railB*3.8+lineB*2.1+railC*.85+lineC*.6)*lensFront*border;")
patch("Lneon+=(cyanNeon*lightA+pinkNeon*lightB+\n              uCore*(lineA+lineB)*.32)*dzNeon*5.8;","Lneon+=(cyanNeon*lightA+pinkNeon*lightB+\n              uCore*(lineA+lineB+lineC)*.40)*dzNeon*8.8;")
patch("Aneon+=(railA+railB)*lensFront*border*dzNeon*4.4;","Aneon+=(railA+railB+railC)*lensFront*border*dzNeon*5.4;")
patch("float coreNeon=exp(-dot(p,p)/(radiusNeon*radiusNeon)*31.);","float coreNeon=exp(-dot(p,p)/(radiusNeon*radiusNeon)*28.);")
patch("vec3 outNeon=vec3(1.)-exp(-max(Lneon,vec3(0.))*1.6);","vec3 outNeon=vec3(1.)-exp(-max(Lneon,vec3(0.))*2.3);")
patch("float alphaNeon=clamp(.08+Aneon*.45+coreNeon*.75+haloNeon*.12,0.,1.);","float alphaNeon=clamp(.06+Aneon*.65+coreNeon*.85+haloNeon*.16,0.,1.);")
patch("gl_FragColor=vec4(outNeon,alphaNeon*edgeNeon*uEffects.w);","gl_FragColor=vec4(outNeon+skyNeon,alphaNeon*edgeNeon*uEffects.w);")
fixed=s[:start]+b+s[end:]
# The old shader must reconstruct byte for byte.
old=fixed[:start]+fixed[start+len(b):]
v=old.encode("utf8")
digest=hashlib.sha1(b"blob "+str(len(v)).encode()+b"\0"+v).hexdigest()
if digest!="49baa2104c4200f25ff9bde63b90fda4ba9d1c60":raise RuntimeError("LEGACY_SHADER_CHANGED "+digest)
p.write_text(fixed,encoding="utf8",newline="\n")
v=fixed.encode("utf8")
print("R186_REFINED_ADDITIVELY",hashlib.sha1(b"blob "+str(len(v)).encode()+b"\0"+v).hexdigest())
