"""R198: Restore original sphere orientation; spatial lighting belongs to environment, not plasma.
Sources SHA-pinned. No second GPU renderer, no reflective image or extra request."""
from pathlib import Path
import hashlib
root=Path(__file__).resolve().parent.parent
src=root/"r197";dst=root/"r198";dst.mkdir(exist_ok=True)
assert hashlib.sha256((src/"index.html").read_bytes()).hexdigest()=="5c726b9bb61236b82d899247f110a0cb60d93dbeb40327145f417a63c9ce4159"
orig=root/"assets/siteforge-r197-depth.js"
assert hashlib.sha256(orig.read_bytes()).hexdigest()=="d551966abcce5bf862dddddd487b55629efa3eb4ad4258298c732976e1d75751"
s=orig.read_text(encoding="utf-8").replace("\r\n","\n")
old="float rotY=sin(t*.10)*.24,rotX=sin(t*.075)*.105;"
assert s.count(old)==1
s=s.replace(old,"float rotY=uTilt.x*1.5,rotX=uTilt.y*1.5;",1)
assert "gl.uniform1f(U.uVolumeSteps,mobile?14:22)" in s
shader=root/"assets/siteforge-r198-fixed-orientation.js"
shader.write_text(s,encoding="utf-8",newline="\n")
print("ORIGINAL_ORIENTATION_RESTORED",hashlib.sha256(shader.read_bytes()).hexdigest())
for slug in ("","connect/","bridge/","siteforge/","offres/"):
    html=(src/slug/"index.html").read_text("utf-8").replace("\r\n","\n")
    if not slug:
        assert html.count("siteforge-r197-depth.js")==1
        html=html.replace("siteforge-r197-depth.js","siteforge-r198-fixed-orientation.js",1)
        anchor='<div class="r197-volume-backdrop" aria-hidden="true"></div>'
        assert html.count(anchor)==1
        chamber='''<div class="r198-chamber" aria-hidden="true">
          <div class="r198-ambient-veil"></div>
          <div class="r198-rear-frame"></div>
          <div class="r198-inner-frame"></div>
          <div class="r198-rail r198-rail-left"></div>
          <div class="r198-rail r198-rail-right"></div>
          <div class="r198-grazing r198-grazing-left"></div>
          <div class="r198-grazing r198-grazing-right"></div>
          <div class="r198-horizon"></div>
        </div>'''
        html=html.replace(anchor,anchor+"\n        "+chamber,1)
        floor='<div class="r197-contact-shadow"></div>'
        assert html.count(floor)==1
        html=html.replace(floor,floor+'\n          <div class="r198-bounce-pool"></div>',1)
        assert html.count('class="r197-foreground-arc"')==1
        html=html.replace('<div class="r197-foreground-arc" aria-hidden="true"></div>',
                          '<div class="r197-foreground-arc" aria-hidden="true"></div>\n        <div class="r198-foreground-rim" aria-hidden="true"></div>',1)
        html=html.replace('syn-r197-home','syn-r197-home syn-r198-home',1)
        html=html.replace('sur sol métallique éclairé','au-dessus d’un environnement métallique illuminé indirectement',1)
        html=html.replace('avec projection colorée au sol','avec éclairage indirect sur les structures environnantes',1)
        html=html.replace('</head>','<link rel="stylesheet" href="../assets/r198-chamber.css"></head>',1)
        assert html.count('class="core-r109-canvas"')==1
    else:
        # No changes needed on product pages beyond their path; all 5 remain navigable
        pass
    target=dst/slug/"index.html";target.parent.mkdir(parents=True,exist_ok=True)
    target.write_text(html,encoding="utf-8",newline="\n")
    print("BUILT",target.relative_to(root),hashlib.sha256(target.read_bytes()).hexdigest()[:18])
print("BASE_UNCHANGED",hashlib.sha256((src/"index.html").read_bytes()).hexdigest())
