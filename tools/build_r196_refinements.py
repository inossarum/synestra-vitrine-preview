"""R196 targeted refinement from pinned R195. No mutation of R195, no prod deployment."""
from pathlib import Path
import hashlib
root=Path(__file__).resolve().parent.parent
source=root/"r195"; target=root/"r196";target.mkdir(exist_ok=True)
baseline=(source/"index.html").read_bytes()
assert hashlib.sha256(baseline).hexdigest()=="a7fa506400c2f36d47b59d5a1e9d44c2efe050bf577f6eacb14c48e50adb9f30"
pages=["","connect/","bridge/","siteforge/","offres/"]
for slug in pages:
    old=(source/slug/"index.html").read_bytes()
    html=old.decode("utf-8").replace("\r\n","\n").replace("\r","\n")
    # no CSS retroactive modification
    assert html.count('r195-interactions.css')==1
    if not slug:
        anchor='<div class="r192-depth-haze" aria-hidden="true"></div>'
        assert html.count(anchor)==1
        apparatus='''<div class="r196-core-apparatus" aria-hidden="true">
          <div class="r196-core-arc r196-core-arc-a"></div><div class="r196-core-arc r196-core-arc-b"></div>
          <div class="r196-core-equator"></div>
          <div class="r196-core-datum r196-core-datum-left"><i></i><span>ENERGY / 001</span><b>PLASMA FIELD</b></div>
          <div class="r196-core-datum r196-core-datum-right"><i></i><span>STUDIO / SYNESTRA</span><b>REACTIVE CORE</b></div>
          <div class="r196-core-beacon"></div>
        </div>'''
        html=html.replace(anchor,anchor+"\n        "+apparatus,1)
        html=html.replace('syn-r195-home','syn-r195-home syn-r196-home',1)
        assert html.count('r196-core-apparatus')==1
    else:
        html=html.replace('syn-r195-product','syn-r195-product syn-r196-product',1)
    if not slug:
        html=html.replace("</head>",'<link rel="stylesheet" href="../assets/r196-refinements.css"></head>',1)
    else:
        html=html.replace("</head>",'<link rel="stylesheet" href="../../assets/r196-refinements.css"></head>',1)
    output=target/slug/"index.html";output.parent.mkdir(parents=True,exist_ok=True)
    output.write_text(html,encoding="utf-8",newline="\n")
    assert html.count("r196-refinements.css")==1
    print("BUILT",output.relative_to(root),hashlib.sha256(output.read_bytes()).hexdigest()[:16])
print("R195_UNCHANGED",hashlib.sha256((source/"index.html").read_bytes()).hexdigest())
