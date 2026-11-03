"""Deterministic Synestra R202.61 ZIP from the SHA-pinned R202.60 standalone.

Changes only the compiled Babylon bundle, README version and Windows port-safe launcher.
No overwrite or network. Python stdlib.
Usage: python release/build_zip_R20261.py [output.zip]
"""
from pathlib import Path
import sys, zipfile, hashlib, json

ROOT=Path(__file__).resolve().parent.parent
HERE=ROOT/"release"
SOURCE=HERE/"Synestra_Sphere_R20260_Standalone.zip"
TARGET=Path(sys.argv[1]).resolve() if len(sys.argv)>1 else HERE/"Synestra_Sphere_R20261_Standalone.zip"
OLD_SHA="05abdc8bb1e54a33024ca5bafa5c9a080c1811f0334255aa2c05ccbab21e2ba7"
NEW_BUNDLE_SHA="93301d7b225bc52e1a46b00937269941a17b050d58dd7fc20813eaff36779f5d"

def sha(b):return hashlib.sha256(b).hexdigest()
def fail(x):sys.exit("R20261_ZIP_REFUSED_"+x)
if not SOURCE.is_file() or sha(SOURCE.read_bytes())!=OLD_SHA:fail("BASE_SHA")
if TARGET.exists():fail("EXISTING_TARGET")
bundle=(ROOT/"lab-babylon"/"dist"/"babylon-lab.js").read_bytes()
if sha(bundle)!=NEW_BUNDLE_SHA:fail("BUNDLE_SHA")
with zipfile.ZipFile(SOURCE) as previous:
    names=previous.namelist()
    if len(names)!=6 or names.count("dist/babylon-lab.js")!=1 or names.count("README.txt")!=1 or names.count("launch_sphere.py")!=1 or \
       not all(x in names for x in ("index.html","style.css")):fail("STRUCTURE")
    def normalized_html_eol(data):
        # Only CRLF -> LF is tolerated for cross-platform Git checkouts.
        if b"\r" in data.replace(b"\r\n",b""):fail("HTML_UNEXPECTED_EOL")
        return data.replace(b"\r\n",b"\n")
    if normalized_html_eol(previous.read("index.html"))!=normalized_html_eol((ROOT/"lab-babylon"/"index.html").read_bytes()):fail("HTML_CHANGED")
    old_readme=previous.read("README.txt")
    if old_readme.count(b"R202.59")!=1:fail("README_UNEXPECTED_VERSION")
    updated_readme=old_readme.replace(b"R202.59",b"R202.61",1)
    old_launcher=previous.read("launch_sphere.py")
    if sha(old_launcher)!="085a949036cba2fad572575e63242b07d12165326fcd6278dff4751ba7bb5277":fail("BASE_LAUNCHER_SHA")
    new_launcher=(HERE/"launch_sphere.py").read_bytes()
    if sha(new_launcher)!="7e9b6e517411c247178a4a22db3bbd6f017e78a193bddcea09cff65f6c271784":fail("EXCLUSIVE_LAUNCHER_SHA")
    replacements={"dist/babylon-lab.js":bundle,"README.txt":updated_readme,"launch_sphere.py":new_launcher}
    TARGET.parent.mkdir(parents=True,exist_ok=True)
    with zipfile.ZipFile(TARGET,"w") as result:
        for entry in previous.infolist():
            result.writestr(entry,replacements.get(entry.filename,previous.read(entry)))
with zipfile.ZipFile(TARGET) as finished,zipfile.ZipFile(SOURCE) as previous:
    for name in names:
        data=finished.read(name)
        if name=="dist/babylon-lab.js":
            if sha(data)!=NEW_BUNDLE_SHA:fail("BAD_BUILT_JS")
        elif name=="README.txt":
            if data!=updated_readme:fail("BAD_README")
        elif name=="launch_sphere.py":
            if data!=new_launcher:fail("BAD_LAUNCHER")
        elif data!=previous.read(name):fail("UNEXPECTED_CHANGE_"+name)
print("R20261_ZIP_PASS "+json.dumps({"sha256":sha(TARGET.read_bytes()),"bytes":TARGET.stat().st_size,
    "files":len(names),"unchanged_files":len(names)-3,"updated_version":"R202.61",
    "new_bundle_sha256":NEW_BUNDLE_SHA}))
