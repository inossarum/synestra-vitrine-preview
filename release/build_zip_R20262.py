"""R202.62 mobile camera distance: deterministic ZIP based on exact R202.61 archive.
Changes only index.html, Babylon JS, and README version. All other files preserved.
No network and no overwrite; Python stdlib only.
"""
from pathlib import Path
from zipfile import ZipFile
import hashlib,json,sys

ROOT=Path(__file__).resolve().parent.parent
RELEASE=ROOT/"release"
PREVIOUS=RELEASE/"Synestra_Sphere_R20261_Standalone.zip"
OUTPUT=Path(sys.argv[1]).resolve() if len(sys.argv)>1 else RELEASE/"Synestra_Sphere_R20262_Standalone.zip"
PREVIOUS_SHA="5088f87190de0e0bab84633569c0585664a7151666e29fda1b434c76d0f8ae13"
BUNDLE_SHA="05f453c255e986d0c03443ecbefcdc7957147328a4140bb57b4284d4e358db27"
def sha(data):return hashlib.sha256(data).hexdigest()
def reject(why):sys.exit("R20262_ZIP_REFUSED_"+why)
if OUTPUT.exists():reject("TARGET_EXISTS")
if not PREVIOUS.is_file() or sha(PREVIOUS.read_bytes())!=PREVIOUS_SHA:reject("R20261_SHA_CHANGED")
bundle=(ROOT/"lab-babylon"/"dist"/"babylon-lab.js").read_bytes()
if sha(bundle)!=BUNDLE_SHA:reject("R20262_BUNDLE_SHA_CHANGED")
with ZipFile(PREVIOUS) as before:
    names=before.namelist()
    if len(names)!=6 or len(set(names))!=6 or not all(x in names for x in ("index.html","style.css","dist/babylon-lab.js","README.txt","launch_sphere.py")):reject("UNEXPECTED_MEMBERS")
    html=before.read("index.html")
    patches=[
      ('aria-label="Sphère énergétique 3D interactive, déplacer pour tourner et molette pour zoomer"',
       'aria-label="Sphère énergétique 3D interactive, glisser pour tourner, utiliser le curseur Distance caméra ou la molette pour zoomer"'),
      ('Glisser : orbite · Molette : zoom',
       'Glisser : orbite · Zoom : curseur'),
      ('<h2>03 — Rendu</h2><label for="quality">Budget graphique</label>',
       '<h2>03 — Rendu</h2><div class="control"><label for="camera-distance">Distance caméra <output id="camera-distance-v">4,8</output></label><input type="range" id="camera-distance" min="280" max="700" step="10" value="480"></div><label for="quality">Budget graphique</label>')
    ]
    for old,new in patches:
        start=old.encode("utf-8")
        if html.count(start)!=1:reject("HTML_BASE_MARKER_UNEXPECTED")
        html=html.replace(start,new.encode("utf-8"),1)
    source=(ROOT/"lab-babylon"/"index.html").read_bytes()
    if html.replace(b"\r\n",b"\n")!=source.replace(b"\r\n",b"\n"):reject("SOURCE_HTML_DIFFERS")
    css=before.read("style.css")
    old_sticky=b".viewport{position:sticky;top:0;z-index:2}"
    new_mobile=b".viewport{position:relative;top:auto;z-index:1}"
    if css.count(old_sticky)!=1:reject("OLD_STICKY_RULE_CHANGED")
    css=css.replace(old_sticky,new_mobile,1)
    source_css=(ROOT/"lab-babylon"/"style.css").read_bytes()
    if css.replace(b"\\r\\n",b"\\n")!=source_css.replace(b"\\r\\n",b"\\n"):reject("SOURCE_CSS_DIFFERS")
    readme=before.read("README.txt")
    if readme.count(b"R202.61")!=1:reject("README_BASE_UNEXPECTED")
    readme=readme.replace(b"R202.61",b"R202.62",1)
    replacements={"index.html":html,"style.css":css,"dist/babylon-lab.js":bundle,"README.txt":readme}
    OUTPUT.parent.mkdir(parents=True,exist_ok=True)
    with ZipFile(OUTPUT,"w") as after:
        for member in before.infolist():
            after.writestr(member,replacements.get(member.filename,before.read(member)))
with ZipFile(OUTPUT) as finished, ZipFile(PREVIOUS) as previous:
    for name in names:
        data=finished.read(name)
        if name in replacements:
            if data!=replacements[name]:reject("REPLACEMENT_MISMATCH_"+name)
        elif data!=previous.read(name):reject("UNCHANGED_MEMBER_MODIFIED_"+name)
print("R20262_ZIP_PASS "+json.dumps({"sha256":sha(OUTPUT.read_bytes()),"bytes":OUTPUT.stat().st_size,"files":6,"changed":["index.html","style.css","dist/babylon-lab.js","README.txt"],"unchanged":2,"bundle_sha256":BUNDLE_SHA}))
