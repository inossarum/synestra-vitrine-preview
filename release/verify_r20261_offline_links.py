"""Validate every packaged local navigation/media reference. Python stdlib, read-only.
Usage: python release/verify_r20261_offline_links.py [standalone.zip]
Exit code 2 on broken, external, absolute, or escaping references.
"""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
from zipfile import ZipFile
import posixpath,sys,json

HERE=Path(__file__).resolve().parent
ZIP=Path(sys.argv[1]).resolve() if len(sys.argv)>1 else HERE/"Synestra_Sphere_R20261_Standalone.zip"
class References(HTMLParser):
    def __init__(self):
        super().__init__();self.urls=[]
    def handle_starttag(self,tag,attrs):
        values=dict(attrs)
        key="href" if tag in ("a","link") else ("src" if tag in ("img","script","iframe","video","audio","source") else None)
        if key is not None and values.get(key):
            self.urls.append((tag,values[key]))
def main():
    with ZipFile(ZIP) as z:
        names=z.namelist()
        if len(names)!=6 or "index.html" not in names or len(set(names))!=len(names):
            print("OFFLINE_LINKS_FAIL_INVALID_ZIP_STRUCTURE");return 2
        files=set(names);parser=References();parser.feed(z.read("index.html").decode("utf-8"))
        failures=[];checked=[]
        for tag,url in parser.urls:
            if url.startswith("#"):
                checked.append({"tag":tag,"url":url,"status":"FRAGMENT"});continue
            parsed=urlsplit(url)
            if parsed.scheme or parsed.netloc or url.startswith("/") or "\\" in parsed.path:
                failures.append({"tag":tag,"url":url,"reason":"NON_LOCAL"});continue
            target=posixpath.normpath(posixpath.join("",unquote(parsed.path)))
            if target in ("..",".") or target.startswith("../") or target not in files:
                failures.append({"tag":tag,"url":url,"reason":"NOT_PACKAGED_OR_ESCAPES_ROOT","target":target})
            else:checked.append({"tag":tag,"url":url,"target":target,"status":"PASS"})
        result={"schema":"synestra.r20261.zip.offline-link-integrity.v1",
         "zip":ZIP.name,"checked":checked,"failures":failures,"status":"FAIL" if failures else "PASS"}
        print("R20261_OFFLINE_LINKS_"+result["status"]+" "+json.dumps(result,ensure_ascii=False))
        return 2 if failures else 0
if __name__=="__main__":sys.exit(main())
