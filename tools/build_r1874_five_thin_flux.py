"""R187.4 — five thinner animated volumetric energy cylinders (flowType 6 only)."""
from pathlib import Path
from hashlib import sha256
import re,base64
root=Path(__file__).resolve().parent.parent
src=root/"siteforge-r1873-autonome.html"
dst=root/"siteforge-r1874-autonome.html"
raw=src.read_bytes()
assert sha256(raw.replace(b"\r\n",b"\n")).hexdigest()=="466ec3bf1305e465a77a1af7e3e690b92cda46a65f6996eb97cba60de19c3543","SOURCE_SHA_NOT_EXPECTED"
source=raw.decode("utf-8").replace("\r\n","\n")
head="  if(uPass>3.5&&uPass<4.5&&uFlow.x>5.5){"
tail=" if(uPass>3.5&&uPass<4.5){"
assert source.count(head)==1
a=source.index(head);b=source.index(tail,a+len(head))
old=source[a:b]; new=old
revisions=[
("float shellA=exp(-pow((tubeA-.23)*26./widthNeon,2.));",
 "float shellA=exp(-pow((tubeA-.158)*31./widthNeon,2.));"),
("float bodyA=exp(-pow((tubeA-.194)*18./widthNeon,2.));",
 "float bodyA=exp(-pow((tubeA-.137)*25./widthNeon,2.));"),
("float specA=exp(-pow((tubeA-.224)*37./widthNeon,2.))",
 "float specA=exp(-pow((tubeA-.155)*42./widthNeon,2.))"),
("float shellB=exp(-pow((tubeB-.25)*26./widthNeon,2.));",
 "float shellB=exp(-pow((tubeB-.172)*31./widthNeon,2.));"),
("float bodyB=exp(-pow((tubeB-.211)*18./widthNeon,2.));",
 "float bodyB=exp(-pow((tubeB-.145)*25./widthNeon,2.));"),
("float specB=exp(-pow((tubeB-.247)*37./widthNeon,2.))",
 "float specB=exp(-pow((tubeB-.170)*42./widthNeon,2.))"),
("float shellC=exp(-pow((tubeC-.25)*26./widthNeon,2.));",
 "float shellC=exp(-pow((tubeC-.165)*31./widthNeon,2.));"),
("float bodyC=exp(-pow((tubeC-.211)*18./widthNeon,2.));",
 "float bodyC=exp(-pow((tubeC-.145)*25./widthNeon,2.));"),
("float specC=exp(-pow((tubeC-.243)*36./widthNeon,2.))",
 "float specC=exp(-pow((tubeC-.161)*42./widthNeon,2.))"),
("float lightA=(railA*2.25*fluxA+lineA*4.4+railC*.65*fluxC+",
 "float lightA=(railA*2.05*fluxA+lineA*4.0+railC*.55*fluxC+"),
("float lightB=(railB*2.30*fluxB+lineB*4.35+railC*.64*fluxC+",
 "float lightB=(railB*2.07*fluxB+lineB*3.95+railC*.55*fluxC+"),
]
for before,after in revisions:
 assert new.count(before)==1,("REPLACEMENT_NOT_UNIQUE",before,new.count(before))
 new=new.replace(before,after,1)
extra="""     // D/E — two additional, independently tilted and breathing magnetic loops.
     // Keep their cross-sections thin and transparent, with travel along surfaces.
     vec3 d=vec3(q.y*.76+q.z*.65,q.x,q.z*.76-q.y*.65);
     float rd=length(d.xy),turnD=atan(d.y,d.x);
     float bendD=.57+.020*sin(turnD*7.+flowTime*1.08);
     float heightD=d.z+.022*cos(turnD*5.-flowTime*.92);
     float thetaD=atan(heightD,rd-bendD);
     float tubeD=length(vec2(rd-bendD,heightD));
     float shellD=exp(-pow((tubeD-.153)*32./widthNeon,2.));
     float bodyD=exp(-pow((tubeD-.130)*25./widthNeon,2.));
     float shadeD=.16+.84*clamp(.47+.53*cos(thetaD-.84),0.,1.);
     float specD=exp(-pow((tubeD-.149)*42./widthNeon,2.))*
                 pow(max(0.,cos(thetaD-.96)),16.);
     float stripeD=pow(max(0.,.5+.5*cos(thetaD*3.+turnD*8.-flowTime*2.55)),11.);
     float railD=shellD*(.10+.90*stripeD)*(.45+.55*shadeD);
     float lineD=railD*pow(max(0.,.5+.5*cos(turnD*32.-thetaD*7.-flowTime*8.0)),9.);
     float fluxD=.76+.24*sin(turnD*16.-flowTime*4.2);
     float cylinderD=(bodyD*shadeD*.09+specD*.17)*
                    (.72+.28*sin(turnD*12.-flowTime*2.2));
     vec3 e=vec3(q.x*.62+q.y*.78,q.z,q.x*.78-q.y*.62);
     float re=length(e.xz),turnE=atan(e.z,e.x);
     float bendE=.55+.021*cos(turnE*6.-flowTime*.99);
     float heightE=e.y+.024*sin(turnE*4.+flowTime*.85);
     float thetaE=atan(heightE,re-bendE);
     float tubeE=length(vec2(re-bendE,heightE));
     float shellE=exp(-pow((tubeE-.160)*32./widthNeon,2.));
     float bodyE=exp(-pow((tubeE-.136)*25./widthNeon,2.));
     float shadeE=.16+.84*clamp(.47+.53*cos(thetaE-.76),0.,1.);
     float specE=exp(-pow((tubeE-.156)*42./widthNeon,2.))*
                 pow(max(0.,cos(thetaE-.90)),17.);
     float stripeE=pow(max(0.,.5+.5*cos(thetaE*3.-turnE*7.+flowTime*2.85)),11.);
     float railE=shellE*(.10+.90*stripeE)*(.45+.55*shadeE);
     float lineE=railE*pow(max(0.,.5+.5*cos(turnE*30.+thetaE*6.+flowTime*7.4)),9.);
     float fluxE=.76+.24*sin(turnE*18.+flowTime*4.0);
     float cylinderE=(bodyE*shadeE*.095+specE*.18)*
                    (.73+.27*cos(turnE*12.+flowTime*2.3));
     float lightD=(railD*2.04*fluxD+lineD*3.75+cylinderD)*lensFront*border;
     float lightE=(railE*2.04*fluxE+lineE*3.75+cylinderE)*lensFront*border;
"""
needle="Lneon+=(cyanNeon*lightA+pinkNeon*lightB+"
assert new.count(needle)==1
new=new.replace(needle,extra+"     Lneon+=(cyanNeon*(lightA+lightD*.76)+pinkNeon*(lightB+lightE*.76)+",1)
aBefore="uCore*(lineA+lineB+lineC)*.10)*dzNeon*6.85;"
aAfter="uCore*(lineA+lineB+lineC+lineD+lineE)*.075)*dzNeon*8.25;"
assert new.count(aBefore)==1
new=new.replace(aBefore,aAfter,1)
aBefore="Aneon+=(railA+railB+railC+(bodyA+bodyB+bodyC)*.09)*lensFront*border*dzNeon*4.55;"
aAfter="Aneon+=(railA+railB+railC+(railD+railE)*.73+(bodyA+bodyB+bodyC+bodyD+bodyE)*.08)*lensFront*border*dzNeon*4.35;"
assert new.count(aBefore)==1
new=new.replace(aBefore,aAfter,1)
new=new.replace("float alphaNeon=clamp(.014+Aneon*.70+coreNeon*.48+haloNeon*.06,0.,1.);","float alphaNeon=clamp(.014+Aneon*.79+coreNeon*.48+haloNeon*.06,0.,1.);",1)
new=new.replace("vec3 outNeon=vec3(1.)-exp(-max(Lneon,vec3(0.))*1.20);","vec3 outNeon=vec3(1.)-exp(-max(Lneon,vec3(0.))*1.28);",1)
out=source[:a]+new+source[b:]
assert out.replace(new,old,1)==source
for before,after in [
("<title>SiteForge — Laboratoire énergétique 3D R187.3</title>","<title>SiteForge — Laboratoire énergétique 3D R187.4</title>"),
("Flux cylindriques vivants · R187.3","Cinq flux fins · R187.4"),
("LAB R187.3","LAB R187.4")
]:
 assert out.count(before)==1,(before,out.count(before))
 out=out.replace(before,after,1)
inline=re.search(r"(?s)<script>(.*?)</script>",out)
assert inline and out.count("<script>")==1
h=base64.b64encode(sha256(inline.group(1).encode("utf-8")).digest()).decode()
m=re.search(r"script-src 'sha256-[^']+'",out)
assert m and "script-src 'unsafe-inline'" not in out
out=out.replace(m.group(0),"script-src 'sha256-"+h+"'",1)
assert out.count('data-sphere-control=')==source.count('data-sphere-control=')
assert out.count('data-mote-control=')==source.count('data-mote-control=')
dst.write_bytes(out.encode("utf-8"))
print("R1874_FIVE_THIN_FLUX_BUILD_PASS",sha256(dst.read_bytes()).hexdigest(),"CSP",h)
