from pathlib import Path
import re
p=Path(__file__).resolve().parent.parent/"tests/siteforge_r186_offline_qa.mjs"
s=p.read_text("utf8")
old="defaultCount:document.querySelector('.core-r109-stage').dataset.moteCount"
new="defaultCount:document.getElementById('sf-moteCount').value"
if s.count(old)!=1:raise Exception("EXPECTED_DEFAULT_DATASET")
s=s.replace(old,new)
# The R186 run must never overwrite existing historical benchmark captures.
s,n=re.subn(r"(writeFileSync\(join\(root,')r(17[0-9]|18[0-5])-",r"\1r186-",s)
if n<2:raise Exception("NOT_ENOUGH_CAPTURES")
p.write_text(s,"utf8",newline="\n")
print("QA_SAFETY_CAPTURE_NAMES_REWRITTEN",n)
