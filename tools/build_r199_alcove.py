"""R199 cinematic alcove: replace rejected R198 decorative rings, retain the proven plasma.
No second canvas, no reflection. SHA-pinned inputs and independent five-route preview."""
from pathlib import Path
import hashlib
root=Path(__file__).resolve().parent.parent
src=root/"r198";dest=root/"r199";dest.mkdir(exist_ok=True)
assert hashlib.sha256((src/"index.html").read_bytes()).hexdigest()=="776c14cc165836c5949f3670651ac2274e2ebbaa3edce0bf6e412ed518ff04f2"
assert hashlib.sha256((root/"assets/siteforge-r198-fixed-orientation.js").read_bytes()).hexdigest()=="a0f16d77d636e331b5011d68b2412767ec3b595f284a4d4283462f60f9f2c90b"
wall='''<div class="r199-architecture" aria-hidden="true">
          <div class="r199-back-wall"></div>
          <div class="r199-panel r199-panel-left"></div>
          <div class="r199-panel r199-panel-right"></div>
          <div class="r199-face-light r199-face-light-left"></div>
          <div class="r199-face-light r199-face-light-right"></div>
          <div class="r199-ceiling"></div>
          <div class="r199-joint r199-joint-left"></div>
          <div class="r199-joint r199-joint-right"></div>
        </div>'''
for slug in ("","connect/","bridge/","siteforge/","offres/"):
    html=(src/slug/"index.html").read_text("utf-8").replace("\r\n","\n")
    if not slug:
        start=html.index('        <div class="r197-volume-backdrop"')
        end=html.index('        <div class="r192-floor" aria-hidden="true">',start)
        html=html[:start]+"        "+wall+"\n"+html[end:]
        assert html.count('class="r198-bounce-pool"')==1
        html=html.replace('<div class="r198-bounce-pool"></div>',
            '<div class="r199-material-light"></div>\n          <div class="r199-inlay"></div>',1)
        assert html.count('<div class="r197-foreground-arc"')==1
        html=html.replace('        <div class="r197-foreground-arc" aria-hidden="true"></div>','',1)
        html=html.replace('        <div class="r198-foreground-rim" aria-hidden="true"></div>','',1)
        html=html.replace('syn-r198-home','syn-r198-home syn-r199-home',1)
        html=html.replace('</head>','<link rel="stylesheet" href="../assets/r199-alcove.css"></head>',1)
        assert html.count('<canvas class="core-r109-canvas"')==1
        assert 'r198-rear-frame' not in html
        assert 'r196-core-arc' not in html
        assert 'r199-material-light' in html
    target=dest/slug/"index.html";target.parent.mkdir(parents=True,exist_ok=True)
    target.write_text(html,encoding="utf-8",newline="\n")
    print("R199",target.relative_to(root),hashlib.sha256(target.read_bytes()).hexdigest()[:16])
print("BASE_INTACT",hashlib.sha256((src/"index.html").read_bytes()).hexdigest())
