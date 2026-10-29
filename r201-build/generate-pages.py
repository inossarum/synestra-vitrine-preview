from pathlib import Path
import hashlib
root=Path(__file__).resolve().parent.parent
src=root/"r200"
dst=root/"r201"
assert hashlib.sha256((src/"index.html").read_bytes()).hexdigest()=="00f54dcc6212fa4c80391b80f814f25346ccd795f691d150c771a758e6d2acf1"
for slug in ["","connect/","bridge/","siteforge/","offres/"]:
 p=(src/slug/"index.html")
 html=p.read_text("utf-8").replace("\r\n","\n")
 if not slug:
  old='<script src="../assets/siteforge-r200-unified-scene.js" defer></script>'
  assert html.count(old)==1
  html=html.replace(old,'<script type="module" src="../assets/r201-scene.bundle.mjs"></script>',1)
  html=html.replace('</head>','<link rel="stylesheet" href="../assets/r201-three.css"></head>',1)
  html=html.replace('syn-r200-home','syn-r200-home syn-r201-home',1)
  assert html.count("script-src 'self'; base-uri")==1
  html=html.replace("script-src 'self'; base-uri", "script-src 'self'; connect-src 'self'; base-uri", 1)
  assert html.count('class="core-r109-canvas"')==1
  assert html.count('r201-scene.bundle.mjs')==1
 target=dst/slug/"index.html"
 target.parent.mkdir(parents=True,exist_ok=True)
 target.write_text(html,encoding="utf-8",newline="\n")
 print('GENERATED',target.relative_to(root),hashlib.sha256(target.read_bytes()).hexdigest()[:16])
