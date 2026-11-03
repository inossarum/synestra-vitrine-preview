"""Rebuild Synestra Sphere R20260 OneFile from its SHA-pinned ZIP (stdlib only).
Usage: python build_onefile_R20260.py [output.html]
Input/output are strictly local. No network, install, or new Babylon dependency.
"""
from pathlib import Path
import base64, hashlib, json, re, sys, zipfile
HERE=Path(__file__).resolve().parent
ZIP=HERE/"Synestra_Sphere_R20260_Standalone.zip"
OUT=Path(sys.argv[1]).resolve() if len(sys.argv)>1 else HERE/"Synestra_Sphere_R20260_OneFile.html"
ZIP_SHA="05abdc8bb1e54a33024ca5bafa5c9a080c1811f0334255aa2c05ccbab21e2ba7"
BUNDLE_SHA="7f0fe152e7f8123cc5f0629025cdf598964bf2f41406a4db626fbd943563dbcf"
def digest(b): return hashlib.sha256(b).hexdigest()
def policy(b): return "'sha256-"+base64.b64encode(hashlib.sha256(b).digest()).decode("ascii")+"'"
def fail(code):
    print("ONEFILE_FAIL: "+code,file=sys.stderr)
    sys.exit(2)
if not ZIP.is_file(): fail("ZIP_MISSING")
if digest(ZIP.read_bytes())!=ZIP_SHA: fail("ZIP_UNEXPECTED_SHA")
with zipfile.ZipFile(ZIP) as z:
    required=["index.html","style.css","dist/babylon-lab.js"]
    if not all(x in z.namelist() for x in required): fail("ZIP_INCOMPLETE")
    html,css,js=[z.read(x).decode("utf-8").replace("\r\n","\n").replace("\r","\n") for x in required]
if digest(js.encode("utf-8"))!=BUNDLE_SHA: fail("BABYLON_BUNDLE_CHANGED")
if re.search("</script",js,re.I) or re.search("</style",css,re.I): fail("EMBED_TAG_UNSAFE")
link='<link rel="stylesheet" href="./style.css">'
script='<script src="./dist/babylon-lab.js" defer></script>'
csp="script-src 'self'; style-src 'self';"
if html.count(link)!=1 or html.count(script)!=1 or html.count(csp)!=1: fail("HTML_CONTRACT_CHANGED")
result=html.replace(link,"<style>"+css+"</style>").replace(script,"<script>"+js+"</script>")
result=result.replace(csp,"script-src "+policy(js.encode("utf-8"))+"; style-src "+policy(css.encode("utf-8"))+";")
if 'src="./dist/babylon-lab.js"' in result or 'href="./style.css"' in result: fail("EXTERNAL_ASSET_LEFT")
OUT.parent.mkdir(parents=True,exist_ok=True)
OUT.write_text(result,encoding="utf-8",newline="\n")
created=OUT.read_bytes()
if js.encode("utf-8") not in created: fail("EMBED_PAYLOAD_DIFFERENT")
print("ONEFILE_REPRODUCIBLE_PASS "+json.dumps({"output":str(OUT),
    "sha256":digest(created),"bytes":len(created),"bundle_sha256":BUNDLE_SHA,
    "no_external_assets":True}))
