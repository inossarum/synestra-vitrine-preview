"""R187.1: retain R187 luminous toroidal art while adding volumetric turbulence, energy flux, and independent motion."""
from pathlib import Path
from hashlib import sha256
import base64,re

root=Path(__file__).resolve().parent.parent
source_path=root/"siteforge-r187-autonome.html"
dst=root/"siteforge-r1871-autonome.html"
source=source_path.read_bytes().decode("utf-8").replace("\r\n","\n")
assert sha256(source_path.read_bytes()).hexdigest()=="2c3a19a999cd36a7e3d4a601bf51468fbf1f298ca6e8956d910c51b83e5a13de","SOURCE_SHA_MISMATCH"
head="  if(uPass>3.5&&uPass<4.5&&uFlow.x>5.5){"
tail=" if(uPass>3.5&&uPass<4.5){"
assert source.count(head)==1
a,b=source.index(head),source.index(tail,source.index(head))
old=source[a:b]
new=old
edits=[
("   // R187 REFINED NEW MATERIAL ONLY. The six legacy materials below remain\n   // byte-for-byte untouched. Three oblique, genuinely 3D toroidal rails.",
 "   // R187.1 ENERGY: keep recognizable translucent toroidal envelopes.\n   // Animated strands + breathing 3D centerlines, not opaque SDF tubes.\n   float flowTime=uLabTime;"),
("float beam=pow(max(0.,.5+.5*cos(nearAngle*19.\n                +sin(nearAngle*4.)*.85-uSpinPhase*.4)),17.);",
 "float beam=pow(max(0.,.5+.5*cos(nearAngle*19.\n                +sin(nearAngle*4.)*.85-flowTime*.38)),17.);"),
("float ra=length(a.xy),thetaA=atan(a.z,ra-.52),turnA=atan(a.y,a.x);\n    float tubeA=length(vec2(ra-.52,a.z));",
 "float ra=length(a.xy),turnA=atan(a.y,a.x);\n    float bendA=.52+.026*sin(turnA*5.-flowTime*1.20);\n    float heightA=a.z+.029*sin(turnA*4.+flowTime*.89);\n    float thetaA=atan(heightA,ra-bendA);\n    float tubeA=length(vec2(ra-bendA,heightA));"),
("float stripeA=pow(max(0.,.5+.5*cos(thetaA*3.-turnA*7.)),10.);\n    float railA=shellA*stripeA;",
 "float stripeA=pow(max(0.,.5+.5*cos(thetaA*3.-turnA*7.+flowTime*2.4)),10.);\n    float railA=shellA*(.10+.90*stripeA);"),
("float rb=length(b.yz),thetaB=atan(b.x,rb-.51),turnB=atan(b.z,b.y);\n    float tubeB=length(vec2(rb-.51,b.x));",
 "float rb=length(b.yz),turnB=atan(b.z,b.y);\n    float bendB=.51+.029*cos(turnB*6.+flowTime*1.06);\n    float heightB=b.x+.031*cos(turnB*5.-flowTime*.98);\n    float thetaB=atan(heightB,rb-bendB);\n    float tubeB=length(vec2(rb-bendB,heightB));"),
("float stripeB=pow(max(0.,.5+.5*cos(thetaB*3.+turnB*6.)),11.);\n    float railB=shellB*stripeB;",
 "float stripeB=pow(max(0.,.5+.5*cos(thetaB*3.+turnB*6.-flowTime*2.8)),11.);\n    float railB=shellB*(.10+.90*stripeB);"),
("float rc=length(c.xz),thetaC=atan(c.y,rc-.49),turnC=atan(c.z,c.x);\n    float tubeC=length(vec2(rc-.49,c.y));",
 "float rc=length(c.xz),turnC=atan(c.z,c.x);\n    float bendC=.49+.022*sin(turnC*7.-flowTime*.93);\n    float heightC=c.y+.025*sin(turnC*5.+flowTime*1.1);\n    float thetaC=atan(heightC,rc-bendC);\n    float tubeC=length(vec2(rc-bendC,heightC));"),
("float railC=shellC*pow(max(0.,.5+.5*cos(thetaC*4.-turnC*9.)),9.);",
 "float railC=shellC*(.07+.93*pow(max(0.,.5+.5*cos(thetaC*4.-turnC*9.+flowTime*2.6)),9.));"),
("float lineC=railC*pow(max(0.,.5+.5*cos(turnC*28.+thetaC*6.)),6.);",
 "float lineC=railC*pow(max(0.,.5+.5*cos(turnC*28.+thetaC*6.-flowTime*7.2)),7.);"),
("float lineA=railA*pow(max(0.,.5+.5*cos(turnA*29.+thetaA*8.)),7.);",
 "float lineA=railA*pow(max(0.,.5+.5*cos(turnA*29.+thetaA*8.-flowTime*8.0)),9.);"),
("float lineB=railB*pow(max(0.,.5+.5*cos(turnB*31.-thetaB*8.)),7.);",
 "float lineB=railB*pow(max(0.,.5+.5*cos(turnB*31.-thetaB*8.+flowTime*7.6)),9.);"),
("float lensFront=.50+.58*smoothstep(-.8,.8,q.z);",
 "float lensFront=.27+.77*smoothstep(-.8,.8,q.z);\n    // Controlled 3D extinction: clear front arcs, lower-opacity rear arcs.\n    float fluxA=.75+.25*sin(turnA*13.-flowTime*3.9);\n    float fluxB=.75+.25*sin(turnB*15.+flowTime*4.1);\n    float fluxC=.75+.25*sin(turnC*17.-flowTime*3.5);"),
("float lightA=(railA*3.0+lineA*3.3+railC*1.0+lineC*1.3)*lensFront*border;",
 "float lightA=(railA*2.8*fluxA+lineA*4.2+railC*.78*fluxC+lineC*1.35)*lensFront*border;"),
("float lightB=(railB*3.1+lineB*3.5+railC*.9+lineC*1.0)*lensFront*border;",
 "float lightB=(railB*2.9*fluxB+lineB*4.1+railC*.70*fluxC+lineC*1.20)*lensFront*border;"),
("uCore*(lineA+lineB+lineC)*.12)*dzNeon*4.45;",
 "uCore*(lineA+lineB+lineC)*.10)*dzNeon*4.55;"),
("float coreNeon=exp(-dot(p,p)/(radiusNeon*radiusNeon)*28.);",
 "float coreNeon=exp(-dot(p,p)/(radiusNeon*radiusNeon)*38.);"),
("Lneon+=uCore*coreNeon*.35+","Lneon+=uCore*coreNeon*.26+"),
("float alphaNeon=clamp(.016+Aneon*.60+coreNeon*.58+haloNeon*.06,0.,1.);",
 "float alphaNeon=clamp(.014+Aneon*.62+coreNeon*.47+haloNeon*.05,0.,1.);")
]
for original,replacement in edits:
 assert new.count(original)==1,("TARGET_MISMATCH",original,new.count(original))
 new=new.replace(original,replacement,1)
# Optical pass: preserve luminous R187 envelopes, improve intensity without opaque walls.
for original,replacement in [
 ("*dzNeon*4.55;","*dzNeon*6.85;"),
 ("float lensFront=.27+.77*smoothstep(-.8,.8,q.z);","float lensFront=.34+.78*smoothstep(-.8,.8,q.z);"),
 ("float alphaNeon=clamp(.014+Aneon*.62+coreNeon*.47+haloNeon*.05,0.,1.);",
  "float alphaNeon=clamp(.014+Aneon*.76+coreNeon*.52+haloNeon*.06,0.,1.);"),
 ("float shellA=exp(-pow((tubeA-.23)*25.,2.));","float shellA=exp(-pow((tubeA-.23)*23.,2.));"),
 ("float shellB=exp(-pow((tubeB-.25)*25.,2.));","float shellB=exp(-pow((tubeB-.25)*23.,2.));")
]:
 assert new.count(original)==1,("OPTICAL_MISMATCH",original)
 new=new.replace(original,replacement,1)
out=source[:a]+new+source[b:]
assert out.replace(new,old,1)==source,"R187_BRANCH_ISOLATION_FAIL"
for x,y in [
("uniform float uDepthRefine; // R174 optics A/B, not a JSON setting",
 "uniform float uDepthRefine; // R174 optics A/B, not a JSON setting\nuniform float uLabTime; // R187.1 energy flux time, material 6 only"),
("'uMoteShape','uMoteFinish'];","'uMoteShape','uMoteFinish','uLabTime'];"),
("gl.uniform1f(U.uTime,elapsed);gl.uniform2f(U.uTilt,tiltX,tiltY);",
 "gl.uniform1f(U.uTime,elapsed);gl.uniform2f(U.uTilt,tiltX,tiltY);\n   gl.uniform1f(U.uLabTime,(now*.001)%3600); // R187.1: independent of particleSpeed"),
("<title>SiteForge — Laboratoire énergétique 3D R187</title>","<title>SiteForge — Laboratoire énergétique 3D R187.1</title>"),
("Rubans néon 3D · R187","Rubans énergétiques 3D · R187.1")
]:
 assert out.count(x)==1,("OUTSIDE_BRANCH_MISMATCH",x,out.count(x))
 out=out.replace(x,y,1)
m=re.search(r"(?s)<script>(.*?)</script>",out);assert m and out.count("<script>")==1
digest=base64.b64encode(sha256(m.group(1).replace("\r\n","\n").encode()).digest()).decode()
prior=re.search(r"script-src 'sha256-[^']+'",out);assert prior
out=out.replace(prior.group(0),"script-src 'sha256-"+digest+"'",1)
assert "script-src 'unsafe-inline'" not in out
dst.write_bytes(out.encode("utf-8"))
print("R1871_ENERGY_BUILD_PASS",sha256(dst.read_bytes()).hexdigest(),"CSP",digest)
