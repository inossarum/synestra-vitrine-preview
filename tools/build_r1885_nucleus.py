"""R188.5 LAB ONLY. Restore visible luminous nucleus in WebGL1 shader; R188.4 immutable."""
from pathlib import Path
from hashlib import sha256
import base64, re
root = Path(__file__).resolve().parent.parent
src = root / "siteforge-r1884-autonome.html"
dst = root / "siteforge-r1885-autonome.html"
source = src.read_bytes()
assert sha256(source).hexdigest() == "faa9a7a50ebda90e2d417063004abc7a1fe1fed300854054eb562a8aae3b8cab", "SOURCE_SHA_MISMATCH"
s = source.decode("utf8").replace("\r\n","\n")
old = """  float coreScreen=exp(-dot(p,p)/(nucleusRadius*nucleusRadius)*1.8);
  vec3 result=accum*2.05+
              uCore*coreScreen*pow(max(uShape.w,0.),1.26)*.56;
  // HDR-inspired, smooth light mapping; no clipped flat cyan marble.
  result=vec3(1.)-exp(-max(result,vec3(0.))*1.15);
  float alpha=(1.-trans)+coreScreen*.69;"""
new = """  // LAB R188.5: independent luminous nucleus, not a filament intersection.
  // Optical radius is larger than the ray density seed but still scales only
  // with the existing core-size slider; flow diameter/spread do not affect it.
  float coreVisible=step(.01,uShape.z)*step(.01,uShape.w);
  float opticalRadius=max(.025,nucleusRadius*1.60);
  float nr=length(p)/opticalRadius;
  float heart=1.-smoothstep(.57,1.10,nr);
  float hot=exp(-nr*nr*4.30);
  float bloom=exp(-nr*nr*.54);
  float mantle=exp(-pow((nr-.78)*4.0,2.));
  float corePower=coreVisible*pow(max(uShape.w,0.),1.13);
  vec3 coreWhite=mix(uCore,vec3(1.),.32);
  vec3 coreLight=coreWhite*(heart*.76+hot*1.48)*corePower
     +mix(uEnergyA,uEnergyB,.50)*(bloom*.25+mantle*.12)*corePower;
  vec3 result=accum*2.05+coreLight;
  // Bounded energy mapping, preserving a distinguishable bright centre.
  result=vec3(1.)-exp(-max(result,vec3(0.))*1.15);
  float alpha=(1.-trans)+coreVisible*clamp(heart*.88+bloom*.30,0.,1.);"""
assert s.count(old)==1, "CORE_LOCUS_CHANGED"
s=s.replace(old,new,1)
# Critical path: materials 6..8 have a distinct R187/R188 WebGL energy branch.
# Earlier trials touched only 0..5 and failed visual acceptance for the requested material.
neon_old = """   float coreNeon=exp(-dot(p,p)/(radiusNeon*radiusNeon)*43.);
   float haloNeon=exp(-dot(p,p)/(radiusNeon*radiusNeon)*7.2);
   Lneon+=uEnergyCore*coreNeon*(.14+.045*sin(flowTime*3.5))+(cyanNeon*.09+pinkNeon*.07)*haloNeon;"""
neon_new = """   // LAB R188.5: restored bright nucleus in all R187/R188 flux materials 6..8.
   // The legacy neon branch had no core-size or core-power connection.
   float centralPower=clamp(uShape.w,0.,5.);
   float centralSize=clamp(uShape.z,0.,2.);
   float centralEnabled=step(.001,centralPower)*step(.001,centralSize);
   float centralRadius=max(.018,radiusNeon*centralSize*.19);
   float cr=length(p)/centralRadius;
   float centralOrb=1.-smoothstep(.56,1.10,cr);
   float centralHot=exp(-cr*cr*3.7);
   float centralHalo=exp(-cr*cr*.45);
   float centralRim=exp(-pow((cr-.80)*4.,2.));
   float centralGlow=centralEnabled*pow(centralPower,1.13);
   vec3 centralWhite=mix(uEnergyCore,vec3(1.),.34);
   Lneon+=centralWhite*(centralOrb*.95+centralHot*1.44)*centralGlow
          +mix(cyanNeon,pinkNeon,.46)*(centralHalo*.17+centralRim*.18)*centralGlow;"""
assert s.count(neon_old)==1, "R187_ENERGY_CORE_BRANCH_CHANGED"
s=s.replace(neon_old,neon_new,1)
alpha_old = "float alphaNeon=clamp(.010+Aneon*.95*densityGain+coreNeon*.40+haloNeon*.055,0.,1.);"
alpha_new = "float alphaNeon=clamp(.010+Aneon*.95*densityGain+centralEnabled*(centralOrb*.85+centralHalo*.22)*min(centralPower,1.),0.,1.);"
assert s.count(alpha_old)==1
s=s.replace(alpha_old,alpha_new,1)
assert s.count("LAB R188.4")>=1
s=s.replace("LAB R188.4","LAB R188.5",1)
s=s.replace("<title>SiteForge — Laboratoire énergétique 3D R188.4</title>","<title>SiteForge — Laboratoire énergétique 3D R188.5</title>",1)
# Preserve exact CSP. The script source is changed; only update its SHA-256.
match=re.search(r"(?s)<script>(.*?)</script>",s)
assert match and s.count("<script>")==1
digest=base64.b64encode(sha256(match.group(1).encode()).digest()).decode()
csp=re.search(r"script-src 'sha256-[^']+'",s)
assert csp and "unsafe-inline" not in csp.group(0)
s=s.replace(csp.group(0),"script-src 'sha256-"+digest+"'",1)
assert s.count("data-sphere-control=\"coreSize\"")==1
assert s.count("data-sphere-control=\"coreLight\"")==1
dst.write_bytes(s.encode())
print("LAB_R1885_BUILD_PASS",sha256(dst.read_bytes()).hexdigest(),"CSP",digest)
