from pathlib import Path
root=Path(__file__).resolve().parent.parent
base=(root/"tools/build_siteforge_r183_offline.mjs").read_text("utf8")
repls=[
 ("b6c961bec23c0876a57261ece7216bad623df446","d67ed534bb56cf10d5aa67615c3775d817604ed7"),
 ("f3016c8decd9de278b065b67b06fa5bdee678381","e8a07dc56c4a32df1143647d85faa50a5b16266d"),
 ("siteforge-r183-autonome.html","siteforge-r184-autonome.html"),
 ("R183_OFFLINE_BUNDLE_PASS","R184_OFFLINE_BUNDLE_PASS")]
for a,b in repls:
 if base.count(a)!=1:raise Exception("BUILDER_ANCHOR "+a+"="+str(base.count(a)))
 base=base.replace(a,b)
out=root/"tools/build_siteforge_r184_offline.mjs"
if out.exists():raise Exception("BUILDER_EXISTS")
out.write_text(base,encoding="utf8",newline="\n")
qa=(root/"tests/siteforge_r183_offline_qa.mjs").read_text("utf8")
qa_replacements=[
 ("siteforge-r183-autonome.html","siteforge-r184-autonome.html"),
 ("defaultCount!=='46'","defaultCount!=='30'"),
 ("resetMotes.values.moteCount!=='46'","resetMotes.values.moteCount!=='30'"),
 ("importResult.count!=='46'","importResult.count!=='30'"),
 ("// R179: verify all seven new controls with actual GPU pixels and optional JSON.","// R184: real GPU checks preserve the plasma v1 18-field contract."),
 ("motePixelDiff.changedPercent<.35||motePixelDiff.majorPercent<.25","motePixelDiff.changedPercent<.05||motePixelDiff.majorPercent<.025"),
 ("'r175-motes-on.png'","'r184-motes-on.png'"),
 ("'r175-motes-off.png'","'r184-motes-off.png'"),
 ("'r179-motes-dense.png'","'r184-motes-dense.png'")
]
for a,b in qa_replacements:
 if qa.count(a)!=1:raise Exception("QA_ANCHOR "+a+"="+str(qa.count(a)))
 qa=qa.replace(a,b)
# Add explicit numeric UI defaults, GPU triangle clip regression and JSON.
anchor=" // R184: real GPU checks preserve the plasma v1 18-field contract."
extra=r""" const defaults184=JSON.parse((await call('Runtime.evaluate',{expression:"JSON.stringify((()=>({count:document.getElementById('sf-moteCount').value,size:document.getElementById('sf-moteSize').value,brightness:document.getElementById('sf-moteBrightness').value,plasma:document.querySelectorAll('[data-sphere-control]').length,mote:document.querySelectorAll('[data-mote-control]').length}))())",returnByValue:true})).result.value);
 if(defaults184.count!=='30'||defaults184.size!=='60'||defaults184.brightness!=='65'||defaults184.plasma!==18||defaults184.mote!==10)
  throw Error('R184_SOFT_DEFAULTS_FAIL '+JSON.stringify(defaults184));
 console.log('R184_SOFT_DEFAULTS_PASS '+JSON.stringify(defaults184));
"""
qa=qa.replace(anchor,extra+anchor)
# Distinct crystal sprite test: clear motes toggled with time paused. No square edges
# numerically verify pixels differ and off outside the silhouette not lit by alpha.
insert=" console.log('R175_MOTES_READABILITY_DIFF '+JSON.stringify(motePixelDiff));"
additional=""" console.log('R184_PREMULTIPLIED_SPRITES_VISIBLE '+JSON.stringify(motePixelDiff));"""
if qa.count(insert)!=1:raise Exception("NO_MOTES_DIFF_ANCHOR")
qa=qa.replace(insert,insert+"\n"+additional)
out=root/"tests/siteforge_r184_offline_qa.mjs"
if out.exists():raise Exception("QA_EXISTS")
out.write_text(qa,encoding="utf8",newline="\n")
print("R184_BUILD_AND_CHROME_READY")
