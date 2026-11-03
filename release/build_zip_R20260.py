"""Rebuild R202.60 ZIP from the pinned R202.59 release and current R202.60 build.
Reproducible byte-for-byte, Python standard library only. Does not overwrite shipped ZIP.
Usage: python release/build_zip_R20260.py [path/to/rebuilt.zip]
"""
from pathlib import Path
import hashlib,json,sys,zipfile
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent
OLD=HERE/"Synestra_Sphere_R20259_Standalone.zip"
OUTPUT=Path(sys.argv[1]).resolve() if len(sys.argv)>1 else ROOT/"qa-auto"/"R20260_rebuilt.zip"
EXPECTED_OLD="2ce059c7d047f81b56e3b733f0168d8471ae7f0ddd3448661ed410e22f7d4483"
EXPECTED_NEW="05abdc8bb1e54a33024ca5bafa5c9a080c1811f0334255aa2c05ccbab21e2ba7"
EXPECTED_BUNDLE="7f0fe152e7f8123cc5f0629025cdf598964bf2f41406a4db626fbd943563dbcf"
def sha(x):return hashlib.sha256(x).hexdigest()
def fail(message):sys.exit("R20260_ZIP_FAIL "+message)
if not OLD.is_file() or sha(OLD.read_bytes())!=EXPECTED_OLD: fail("OLD_RELEASE_SHA_MISMATCH")
replacement={
 "index.html":(ROOT/"lab-babylon"/"index.html").read_bytes(),
 "dist/babylon-lab.js":(ROOT/"lab-babylon"/"dist"/"babylon-lab.js").read_bytes()}
if sha(replacement["dist/babylon-lab.js"])!=EXPECTED_BUNDLE:fail("BUNDLE_SHA_MISMATCH")
if OUTPUT.exists():fail("TARGET_EXISTS")
OUTPUT.parent.mkdir(parents=True,exist_ok=True)
with zipfile.ZipFile(OLD,"r") as before,zipfile.ZipFile(OUTPUT,"w") as after:
    files=before.namelist()
    if len(files)!=6 or not all(f in files for f in replacement):fail("UNEXPECTED_ZIP_FILES")
    for entry in before.infolist():
        after.writestr(entry,replacement.get(entry.filename,before.read(entry)))
built=sha(OUTPUT.read_bytes())
if built!=EXPECTED_NEW:fail("OUTPUT_SHA_MISMATCH_"+built)
print("R20260_REPRODUCIBLE_ZIP_PASS "+json.dumps({"output":str(OUTPUT),"sha256":built,
    "bytes":OUTPUT.stat().st_size,"files":6,"unchanged_files":4}))
