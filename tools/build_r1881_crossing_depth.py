"""R188.1: depth-sensitive soft-knee crossing optics for energy shader only."""
from pathlib import Path
from hashlib import sha256
import base64,re
root=Path(__file__).resolve().parent.parent
before=root/"siteforge-r1880-autonome.html"
after=root/"siteforge-r1881-autonome.html"
s=before.read_bytes().decode("utf8").replace("\r\n","\n")
assert sha256(s.encode()).hexdigest()=="80444c99fcd55b1066c5c98e497a5efb935a6610b9d215a85f6c31cdd41d72b7","BASE_SHA_MISMATCH"
def sub(a,b):
 global s
 if s.count(a)==0 and s.count(re.sub(r"(?m)^ ","",a))==1:
  a=re.sub(r"(?m)^ ","",a)
 assert s.count(a)==1,("COUNT",a[:90],s.count(a))
 s=s.replace(a,b,1)
old="""     float crossing=(aCore*bCore+bCore*cCore+cCore*dCore*step(3.5,flowCount)+dCore*eCore*step(4.5,flowCount)+
                       eCore*aCore*step(4.5,flowCount))* .22;
     float flash=.55+.45*pulseIntensity*sin(flowTime*7.4+q.z*12.);
     Lneon+=vec3(.68,.87,1.)*crossing*flash*front*border*dzNeon*7.0;"""
new="""     // R188.1 optical crossing: keep physical depth ordering visible.
     // Rear overlaps are muted while forward crossings retain detail.
     float overlap=(aCore*bCore+bCore*cCore+cCore*dCore*step(3.5,flowCount)+
                    dCore*eCore*step(4.5,flowCount)+eCore*aCore*step(4.5,flowCount));
     float softCross=overlap/(1.+overlap*2.8); // bounded soft knee, no blown white knot
     float faceCross=.16+.84*smoothstep(-.18,.62,q.z);
     float flash=.62+.38*pulseIntensity*sin(flowTime*7.4+q.z*12.);
     float spectral=clamp(.43+.16*sin(flowTime*.67+q.z*3.2),.12,.84);
     vec3 crossingTint=mix(mix(cyanNeon,pinkNeon,spectral),uEnergyCore,.20);
     Lneon+=crossingTint*softCross*flash*faceCross*border*dzNeon*2.45;"""
sub(old,new)
# New depth attenuation is only in crossing emission, never replacing genuine 3D trajectories.
for old,new in [
 ("<title>SiteForge — Laboratoire énergétique 3D R188.0</title>","<title>SiteForge — Laboratoire énergétique 3D R188.1</title>"),
 ("Flux adaptatifs · R188.0","Flux stratifiés · R188.1"),
 ("LAB R188.0","LAB R188.1"),
 ("Architecture des flux · R188.0","Architecture des flux · R188.1"),
 ("Les nouveaux contrôles modifient uniquement les flux R188.0.","Les nouveaux contrôles modifient uniquement les flux R188.1.")
]:sub(old,new)
m=re.search(r"(?s)<script>(.*?)</script>",s)
assert m and s.count("<script>")==1
digest=base64.b64encode(sha256(m.group(1).encode()).digest()).decode()
csp=re.search(r"script-src 'sha256-[^']+'",s)
assert csp and "script-src 'unsafe-inline'" not in s
s=s.replace(csp.group(0),"script-src 'sha256-"+digest+"'",1)
assert "uniform float uEnergySteps" in s
assert s.count("data-sphere-control=")==before.read_text("utf8").count("data-sphere-control=")
assert s.count("data-flow-control=")==before.read_text("utf8").count("data-flow-control=")
assert s.count("data-energy-color=")==3
after.write_bytes(s.encode())
print("R1881_BUILD_PASS",sha256(after.read_bytes()).hexdigest())
