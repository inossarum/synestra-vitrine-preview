"""R202.60 release integrity: compare Git object, export, checkout and tested ZIP.
Python stdlib only, read-only. --worktree-attributes checks pending Git attr rules.
"""
from pathlib import Path
from io import BytesIO
from zipfile import ZipFile
import hashlib,json,subprocess,sys

ROOT=Path(__file__).resolve().parent.parent
BUNDLE="lab-babylon/dist/babylon-lab.js"
EXPECTED="7f0fe152e7f8123cc5f0629025cdf598964bf2f41406a4db626fbd943563dbcf"
def git(*args):return subprocess.check_output(["git","-C",str(ROOT),*args])
def sha(data):return hashlib.sha256(data).hexdigest()
def main():
    use_worktree="--worktree-attributes" in sys.argv[1:]
    head=git("rev-parse","HEAD").decode().strip()
    canonical=git("cat-file","blob","HEAD:"+BUNDLE)
    args=["archive","--format=zip"]
    if use_worktree:args.append("--worktree-attributes")
    with ZipFile(BytesIO(git(*args,"HEAD",BUNDLE))) as z:exported=z.read(BUNDLE)
    with ZipFile(ROOT/"release"/"Synestra_Sphere_R20260_Standalone.zip") as z:released=z.read("dist/babylon-lab.js")
    worktree=(ROOT/BUNDLE).read_bytes()
    summary={
      "schema":"synestra.r20260.bundle-export-integrity.v1",
      "head":head,
      "mode":"worktree-attributes-preflight" if use_worktree else "committed-git-archive",
      "git_object_sha256":sha(canonical),
      "git_export_sha256":sha(exported),
      "worktree_sha256":sha(worktree),
      "released_zip_bundle_sha256":sha(released),
      "export_crlf":exported.count(b"\r\n"),
      "export_bytes":len(exported),
      "status":"PASS" if all(sha(x)==EXPECTED for x in (canonical,exported,worktree,released)) else "FAIL"
    }
    print("R20260_EXPORT_INTEGRITY_"+summary["status"]+" "+json.dumps(summary))
    return 0 if summary["status"]=="PASS" else 2
if __name__=="__main__":sys.exit(main())
