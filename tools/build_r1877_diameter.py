"""R187.7: actually functional, independently adjustable energy flow diameter, 18-field JSON unchanged."""
from pathlib import Path
from hashlib import sha256
import re,base64
root=Path(__file__).resolve().parent.parent
src=root/"siteforge-r1876-autonome.html"
dest=root/"siteforge-r1877-autonome.html"
raw=src.read_bytes()
assert sha256(raw.replace(b"\r\n",b"\n")).hexdigest()=="365f8ceab01a40bc7f3fdd0501e77cb69f91c2316a2efe0b62d1b38b714ec4e2"
s=raw.decode("utf-8").replace("\r\n","\n")
def swap(old,new):
 global s
 assert s.count(old)==1,("TARGET_MISSING_OR_MULTIPLE",old,s.count(old))
 s=s.replace(old,new,1)
# Reuse flowStructure, preserve 18-field JSON schema and preexisting values; extend allowable bounds.
swap('<span>Largeur des courants</span>',
     '<span>Diamètre des flux énergétiques</span>')
swap('id="sf-flowStructure" data-sphere-control="flowStructure" type="range" min="30" max="200" value="100" step="1"',
     'id="sf-flowStructure" data-sphere-control="flowStructure" type="range" min="30" max="250" value="100" step="1"')
swap('<span>Diamètre</span><output for="sf-diameter"',
     '<span>Diamètre de la sphère</span><output for="sf-diameter"')
# A precise explanation next to the slider. No added control/JSON keys.
marker='<div class="control-row"><label class="control-label" for="sf-diameter">'
assert s.count(marker)==1
s=s.replace(marker,
  '<p class="help" data-flow-diameter-help>30 % : flux fins · 100 % : référence · 250 % : flux larges. '
  'Ajuste les cinq trajectoires et leur tressage sans modifier le diamètre de la sphère.</p>\n'+marker,1)
# Only change the live shader for material 6. All other shader paths remain untouched.
head="  if(uPass>3.5&&uPass<4.5&&uFlow.x>5.5){"
tail=" if(uPass>3.5&&uPass<4.5){"
a=s.index(head);b=s.index(tail,a+len(head))
before=s[a:b]
assert before.count("float widthNeon=clamp(uFlow.y,.55,1.75);")==1
after=before.replace("float widthNeon=clamp(uFlow.y,.55,1.75);",
"""// R187.7: the visual diameter slider maps 30-250% one-to-one;
   // old hidden clamp [.55,1.75] made the existing control misleading.
   float widthNeon=clamp(uFlow.y,.30,2.50);
   // Optical anti-aliasing for very thin currents. Preserve true user
   // control and exact reference thickness at 100%, no opaque geometry.
   float kernelWidth=widthNeon+.19*(1.-smoothstep(.30,1.,widthNeon));""",1)
# R187.7: stabilize fine Gaussian sampling without affecting 100%-250%.
# Only the optical Gaussian kernel is broadened; orbital offsets remain fixed.
assert after.count("./widthNeon")>=10
after=after.replace("./widthNeon","./kernelWidth")
# Keep exposure approximately constant when radius changes: otherwise at 250%
# five overlapping fields saturate to white; at 30% samples nearly disappear.
# Preserve exactly the R187.6 exposure at reference diameter 100%.
assert after.count("vec3 outNeon=vec3(1.)-exp(-max(Lneon,vec3(0.))*1.32);")==1
after=after.replace("vec3 outNeon=vec3(1.)-exp(-max(Lneon,vec3(0.))*1.32);",
"""float radiusGain=widthNeon>1.?
        pow(widthNeon,-1.70):pow(widthNeon,-.75);
   vec3 outNeon=vec3(1.)-exp(-max(Lneon,vec3(0.))*1.32*radiusGain);""",1)
s=s[:a]+after+s[b:]
for old,new in [
("<title>SiteForge — Laboratoire énergétique 3D R187.6</title>","<title>SiteForge — Laboratoire énergétique 3D R187.7</title>"),
("Flux tressés vivants · R187.6","Flux tressés réglables · R187.7"),
("LAB R187.6","LAB R187.7")
]:
 swap(old,new)
# CSP kept strict: recompute hash of the sole inline script, no external assets.
m=re.search(r"(?s)<script>(.*?)</script>",s)
assert m and s.count("<script>")==1
digest=base64.b64encode(sha256(m.group(1).encode("utf-8")).digest()).decode("ascii")
csp=re.search(r"script-src 'sha256-[^']+'",s)
assert csp and "script-src 'unsafe-inline'" not in s
s=s.replace(csp.group(0),"script-src 'sha256-"+digest+"'",1)
assert s.count("data-sphere-control=")==raw.decode("utf-8").count("data-sphere-control=")
assert s.count("data-mote-control=")==raw.decode("utf-8").count("data-mote-control=")
assert 'data-flow-diameter-help' in s
dest.write_bytes(s.encode("utf-8"))
print("R1877_DIAMETER_BUILD_PASS",sha256(dest.read_bytes()).hexdigest(),"CSP",digest)
