"""R187: bounded shader refinement for flowType=6 only; R186 source remains intact."""
from pathlib import Path
from hashlib import sha256

root = Path(__file__).resolve().parent.parent
src = root / "siteforge-r186-autonome.html"
dst = root / "siteforge-r187-autonome.html"
source = src.read_bytes().decode("utf-8")
head = "  if(uPass>3.5&&uPass<4.5&&uFlow.x>5.5){"
tail = " if(uPass>3.5&&uPass<4.5){"
assert source.count(head) == 1
a, b = source.index(head), source.index(tail, source.index(head))
original = source[a:b]
assert original.count("R186 ADDITIVE MATERIAL ONLY") == 1

changes = [
    ("float radiusNeon=.88*clamp(uShape.x,.5,1.5);", "float radiusNeon=.98*clamp(uShape.x,.5,1.5);"),
    ("(.025+.10*beam)", "(.010+.052*beam)"),
    ("float shellA=exp(-pow((tubeA-.23)*16.,2.));", "float shellA=exp(-pow((tubeA-.23)*25.,2.));"),
    ("float shellB=exp(-pow((tubeB-.25)*16.,2.));", "float shellB=exp(-pow((tubeB-.25)*25.,2.));"),
    ("float shellC=exp(-pow((tubeC-.25)*14.,2.));", "float shellC=exp(-pow((tubeC-.25)*23.,2.));"),
    ("cos(thetaA*3.-turnA*7.)),9.)", "cos(thetaA*3.-turnA*7.)),10.)"),
    ("cos(thetaB*3.+turnB*6.)),10.)", "cos(thetaB*3.+turnB*6.)),11.)"),
    ("cos(thetaC*4.-turnC*9.)),8.)", "cos(thetaC*4.-turnC*9.)),9.)"),
    ("cos(turnC*28.+thetaC*6.)),4.)", "cos(turnC*28.+thetaC*6.)),6.)"),
    ("cos(turnA*29.+thetaA*8.)),5.)", "cos(turnA*29.+thetaA*8.)),7.)"),
    ("cos(turnB*31.-thetaB*8.)),5.)", "cos(turnB*31.-thetaB*8.)),7.)"),
    ("railA*3.5+lineA*1.9+railC*1.5+lineC*.8", "railA*3.0+lineA*3.3+railC*1.0+lineC*1.3"),
    ("railB*3.8+lineB*2.1+railC*.85+lineC*.6", "railB*3.1+lineB*3.5+railC*.9+lineC*1.0"),
    ("*dzNeon*3.9;", "*dzNeon*4.45;"),
    ("*dzNeon*5.4;", "*dzNeon*5.15;"),
    ("uCore*coreNeon*.95", "uCore*coreNeon*.35"),
    ("(cyanNeon*.24+pinkNeon*.18)*haloNeon", "(cyanNeon*.12+pinkNeon*.09)*haloNeon"),
    ("*1.32);", "*1.42);"),
    (".025+Aneon*.54+coreNeon*.72+haloNeon*.11", ".016+Aneon*.60+coreNeon*.58+haloNeon*.06"),
]
patched = original
for old, new in changes:
    assert patched.count(old) == 1, ("PATCH_TARGET_MISMATCH", old, patched.count(old))
    patched = patched.replace(old, new, 1)
patched = patched.replace("R186 ADDITIVE MATERIAL ONLY", "R187 REFINED NEW MATERIAL ONLY", 1)
new_html = source[:a] + patched + source[b:]
assert new_html.replace(patched, original, 1) == source
new_html = new_html.replace("<title>SiteForge — Laboratoire énergétique 3D R185</title>", "<title>SiteForge — Laboratoire énergétique 3D R187</title>", 1)
new_html = new_html.replace("Rubans néon 3D · R186", "Rubans néon 3D · R187", 1)
assert new_html.count("Rubans néon 3D · R187") == 1
assert source.count("value=\"6\"") == new_html.count("value=\"6\"") == 1
assert source == src.read_bytes().decode("utf-8")
# CSP remains strict. Recalculate exactly the new inline script digest.
import re
import base64
script = re.search(r"(?s)<script>(.*?)</script>", new_html)
assert script is not None and new_html.count("<script>") == 1
new_digest = base64.b64encode(sha256(script.group(1).replace("\r\n","\n").replace("\r","\n").encode("utf-8")).digest()).decode("ascii")
old_csp = re.search(r"script-src 'sha256-([^']+)'", new_html)
assert old_csp is not None
new_html = new_html.replace(old_csp.group(0), "script-src 'sha256-"+new_digest+"'", 1)
assert new_html.count("script-src 'sha256-") == 1
print("R187_CSP_SHA256_BASE64", new_digest)
dst.write_bytes(new_html.encode("utf-8"))
print("R187_ADD_ONLY_BUILD_PASS source_sha256=",sha256(src.read_bytes()).hexdigest(),"new_sha256=",sha256(dst.read_bytes()).hexdigest())
