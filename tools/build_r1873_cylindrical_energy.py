"""R187.3 cylindrical energy — bounded, translucent tube volume, no opaque SDF."""
from pathlib import Path
from hashlib import sha256
import re, base64

root=Path(__file__).resolve().parent.parent
src=root/"siteforge-r1872-autonome.html"
dst=root/"siteforge-r1873-autonome.html"
source=src.read_bytes().decode("utf-8").replace("\r\n","\n")
start="  if(uPass>3.5&&uPass<4.5&&uFlow.x>5.5){"
end=" if(uPass>3.5&&uPass<4.5){"
assert source.count(start)==1 and source.count(end)>=1
a=source.index(start);b=source.index(end,a+len(start))
old=source[a:b]
assert "float widthNeon=clamp(uFlow.y,.55,1.75);" in old
shader=old
edits=[
 ("float shellA=exp(-pow((tubeA-.23)*26./widthNeon,2.));",
  """float shellA=exp(-pow((tubeA-.23)*26./widthNeon,2.));
     // Translucent cylindrical cross-section: radial body, shaded normal, moving specular ribbon.
     float bodyA=exp(-pow((tubeA-.194)*18./widthNeon,2.));
     float shadeA=.17+.83*clamp(.48+.52*cos(thetaA-.83),0.,1.);
     float grazingA=pow(max(0.,cos(thetaA-.95)),17.);
     float specA=exp(-pow((tubeA-.224)*37./widthNeon,2.))*grazingA*
                 (.67+.33*sin(turnA*13.-flowTime*4.0));"""),
 ("float shellB=exp(-pow((tubeB-.25)*26./widthNeon,2.));",
  """float shellB=exp(-pow((tubeB-.25)*26./widthNeon,2.));
     float bodyB=exp(-pow((tubeB-.211)*18./widthNeon,2.));
     float shadeB=.17+.83*clamp(.48+.52*cos(thetaB-.73),0.,1.);
     float grazingB=pow(max(0.,cos(thetaB-.88)),17.);
     float specB=exp(-pow((tubeB-.247)*37./widthNeon,2.))*grazingB*
                 (.67+.33*sin(turnB*14.+flowTime*4.4));"""),
 ("float shellC=exp(-pow((tubeC-.25)*26./widthNeon,2.));",
  """float shellC=exp(-pow((tubeC-.25)*26./widthNeon,2.));
     float bodyC=exp(-pow((tubeC-.211)*18./widthNeon,2.));
     float shadeC=.18+.82*clamp(.45+.55*cos(thetaC-.95),0.,1.);
     float grazingC=pow(max(0.,cos(thetaC-.9)),18.);
     float specC=exp(-pow((tubeC-.243)*36./widthNeon,2.))*grazingC*
                 (.65+.35*sin(turnC*16.-flowTime*4.2));"""),
 ("float lightA=(railA*2.65*fluxA+lineA*4.75+railC*.78*fluxC+lineC*1.35)*lensFront*border;",
  """float cylinderA=(bodyA*shadeA*.105+specA*.19)*
                    (.72+.28*sin(turnA*11.-flowTime*2.0));
     float cylinderC=(bodyC*shadeC*.075+specC*.14)*
                    (.76+.24*sin(turnC*14.-flowTime*2.4));
     float lightA=(railA*2.25*fluxA+lineA*4.4+railC*.65*fluxC+
                   lineC*1.25+cylinderA+cylinderC*.64)*lensFront*border;"""),
 ("float lightB=(railB*2.7*fluxB+lineB*4.65+railC*.70*fluxC+lineC*1.20)*lensFront*border;",
  """float cylinderB=(bodyB*shadeB*.11+specB*.20)*
                    (.72+.28*sin(turnB*13.+flowTime*2.1));
     float lightB=(railB*2.30*fluxB+lineB*4.35+railC*.64*fluxC+
                   lineC*1.16+cylinderB+cylinderC*.42)*lensFront*border;"""),
 ("Aneon+=(railA+railB+railC)*lensFront*border*dzNeon*5.15;",
  "Aneon+=(railA+railB+railC+(bodyA+bodyB+bodyC)*.09)*lensFront*border*dzNeon*4.55;"),
 ("float alphaNeon=clamp(.014+Aneon*.71+coreNeon*.49+haloNeon*.06,0.,1.);",
  "float alphaNeon=clamp(.014+Aneon*.70+coreNeon*.48+haloNeon*.06,0.,1.);"),
 ("float railA=shellA*(.10+.90*stripeA);",
  "float railA=shellA*(.10+.90*stripeA)*(.46+.54*shadeA);"),
 ("float railB=shellB*(.10+.90*stripeB);",
  "float railB=shellB*(.10+.90*stripeB)*(.46+.54*shadeB);"),
 ("float railC=shellC*(.07+.93*pow(max(0.,.5+.5*cos(thetaC*4.-turnC*9.+flowTime*2.6)),9.));",
  "float railC=shellC*(.07+.93*pow(max(0.,.5+.5*cos(thetaC*4.-turnC*9.+flowTime*2.6)),9.))*(.46+.54*shadeC);"),
 ("vec3 outNeon=vec3(1.)-exp(-max(Lneon,vec3(0.))*1.42);",
  "vec3 outNeon=vec3(1.)-exp(-max(Lneon,vec3(0.))*1.20);")
]
for before,after in edits:
 assert shader.count(before)==1,("TARGET_MISSING_OR_DUPLICATED",before,shader.count(before))
 shader=shader.replace(before,after,1)
out=source[:a]+shader+source[b:]
assert out.replace(shader,old,1)==source
assert out.count("float cylinderA=")==1 and out.count("float cylinderB=")==1
assert out.count("gl_FragColor=vec4(outNeon+skyNeon,alphaNeon*edgeNeon*uEffects.w);")==1
for before,after in [
("<title>SiteForge — Laboratoire énergétique 3D R187.2</title>","<title>SiteForge — Laboratoire énergétique 3D R187.3</title>"),
("Flux énergétiques 3D · R187.2","Flux cylindriques vivants · R187.3"),
("LAB R187.2","LAB R187.3")
]:
 assert out.count(before)==1
 out=out.replace(before,after,1)
script=re.search(r"(?s)<script>(.*?)</script>",out)
assert script and out.count("<script>")==1
hash64=base64.b64encode(sha256(script.group(1).encode("utf-8")).digest()).decode()
csp=re.search(r"script-src 'sha256-[^']+'",out)
assert csp
out=out.replace(csp.group(0),"script-src 'sha256-"+hash64+"'",1)
assert "script-src 'unsafe-inline'" not in out
assert out.count('data-sphere-control=')==source.count('data-sphere-control=')
assert out.count('data-mote-control=')==source.count('data-mote-control=')
dst.write_bytes(out.encode("utf-8"))
print("R1873_CYLINDRICAL_ENERGY_BUILD_PASS",sha256(dst.read_bytes()).hexdigest(),"CSP",hash64)
