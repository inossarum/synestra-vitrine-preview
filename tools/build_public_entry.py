"""Build the public static vitrine from this isolated source branch."""
from pathlib import Path
import shutil
import tempfile
ROOT = Path(__file__).resolve().parents[1]

def build(output):
    out = Path(output)
    if out.exists():
        raise FileExistsError("Use a new output directory; no deletion")
    out.mkdir(parents=True)
    for path in ("index.html", "_headers", "connexion/index.html"):
        dest = out / path
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(ROOT / path, dest)
    for directory in ("signal", "siteforge"):
        src = ROOT / directory
        if src.is_dir():
            shutil.copytree(src, out / directory, ignore=shutil.ignore_patterns(".git", "__pycache__", ".env", ".env.*"))
    return out

if __name__ == "__main__":
    import sys
    print(build(sys.argv[1] if len(sys.argv) > 1 else ROOT / "dist"))
