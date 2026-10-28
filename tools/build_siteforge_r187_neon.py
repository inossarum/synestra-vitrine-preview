"""R187: bounded shader refinement for flowType=6 only; R186 source remains intact."""
from pathlib import Path
from hashlib import sha256

root = Path(__file__).resolve().parent.parent
src = root / "siteforge-r186-autonome.html"
dst = root / "siteforge-r187-autonome.html"
source = src.read_text("utf-8")
head = "  if(uPass>3.5&&uPass<4.5&&uFlow.x>5.5){"
tail = " if(uPass>3.5&&uPass<4.5){"
assert source.count(head) == 1
a, b = source.index(head), source.index(tail, source.index(head))
original = source[a:b]
assert original.count("R186 ADDITIVE MATERIAL ONLY") == 1

changes = [
    ("(.025+.10*beam)", "(.012+.036*beam)"),
    ("float shellA=exp(-pow((tubeA-.23)*16.,2.));", "float shellA=exp(-pow((tubeA-.23)*24.,2.));"),
    ("float shellB=exp(-pow((tubeB-.25)*16.,2.));", "float shellB=exp(-pow((tubeB-.25)*24.,2.));"),
    ("float shellC=exp(-pow((tubeC-.25)*14.,2.));", "float shellC=exp(-pow((tubeC-.25)*21.,2.));"),
    ("cos(thetaA*3.-turnA*7.)),9.)", "cos(thetaA*3.-turnA*7.)),12.)"),
    ("cos(thetaB*3.+turnB*6.)),10.)", "cos(thetaB*3.+turnB*6.)),13.)"),
    ("cos(thetaC*4.-turnC*9.)),8.)", "cos(thetaC*4.-turnC*9.)),11.)"),
    ("cos(turnC*28.+thetaC*6.)),4.)", "cos(turnC*28.+thetaC*6.)),7.)"),
    ("cos(turnA*29.+thetaA*8.)),5.)", "cos(turnA*29.+thetaA*8.)),8.)"),
    ("cos(turnB*31.-thetaB*8.)),5.)", "cos(turnB*31.-thetaB*8.)),8.)"),
    ("railA*3.5+lineA*1.9+railC*1.5+lineC*.8", "railA*2.1+lineA*2.5+railC*1.1+lineC*1.2"),
    ("railB*3.8+lineB*2.1+railC*.85+lineC*.6", "railB*2.2+lineB*2.7+railC*.9+lineC*1.0"),
    ("*dzNeon*3.9;", "*dzNeon*3.05;"),
    ("*dzNeon*5.4;", "*dzNeon*4.7;"),
    ("uCore*coreNeon*.95", "uCore*coreNeon*.42"),
    ("(cyanNeon*.24+pinkNeon*.18)*haloNeon", "(cyanNeon*.14+pinkNeon*.1)*haloNeon"),
    ("*1.32);", "*1.20);"),
    (".025+Aneon*.54+coreNeon*.72+haloNeon*.11", ".016+Aneon*.56+coreNeon*.58+haloNeon*.06"),
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
assert source == src.read_text("utf-8")
dst.write_text(new_html, "utf-8", newline="")
print("R187_ADD_ONLY_BUILD_PASS source_sha256=",sha256(src.read_bytes()).hexdigest(),"new_sha256=",sha256(dst.read_bytes()).hexdigest())
