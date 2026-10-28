from pathlib import Path
import hashlib
p=Path(__file__).resolve().parent.parent/"assets/siteforge-lab-r166-flow.js"
s=p.read_text("utf8")
a=s.index("  if(uPass>3.5&&uPass<4.5&&uFlow.x>5.5){")
e=s.index(" if(uPass>3.5&&uPass<4.5){\n  // True 3D ray integration.",a)
n=s[a:e]
changes=[
("float shellA=exp(-pow((tubeA-.23)*13.,2.));","float shellA=exp(-pow((tubeA-.23)*16.,2.));"),
("float shellB=exp(-pow((tubeB-.25)*13.,2.));","float shellB=exp(-pow((tubeB-.25)*16.,2.));"),
("uCore*(lineA+lineB+lineC)*.40)*dzNeon*8.8;","uCore*(lineA+lineB+lineC)*.12)*dzNeon*3.9;"),
("Lneon+=uCore*coreNeon*2.0+","Lneon+=uCore*coreNeon*.95+"),
("vec3 outNeon=vec3(1.)-exp(-max(Lneon,vec3(0.))*2.3);","vec3 outNeon=vec3(1.)-exp(-max(Lneon,vec3(0.))*1.32);"),
("float alphaNeon=clamp(.06+Aneon*.65+coreNeon*.85+haloNeon*.16,0.,1.);","float alphaNeon=clamp(.025+Aneon*.54+coreNeon*.72+haloNeon*.11,0.,1.);")
]
for old,new in changes:
 if n.count(old)!=1:raise Exception("TUNING_ANCHOR "+old)
 n=n.replace(old,new)
s2=s[:a]+n+s[e:]
v=(s2[:a]+s2[a+len(n):]).encode("utf8")
sha=hashlib.sha1(b"blob "+str(len(v)).encode()+b"\0"+v).hexdigest()
if sha!="49baa2104c4200f25ff9bde63b90fda4ba9d1c60":raise RuntimeError("LEGACY_MATERIALS_CHANGED "+sha)
p.write_text(s2,"utf8",newline="\n")
buf=s2.encode("utf8")
print("R186_EXPOSURE_REBALANCED_LEGACY_UNCHANGED",hashlib.sha1(b"blob "+str(len(buf)).encode()+b"\0"+buf).hexdigest())
