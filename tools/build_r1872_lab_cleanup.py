"""R187.2 cleanup: remove obsolete comparison UI, preserve persisted contract and energy material 6."""
from pathlib import Path
from hashlib import sha256
import base64,re

root=Path(__file__).resolve().parent.parent
src=root/"siteforge-r1871-autonome.html"
dst=root/"siteforge-r1872-autonome.html"
raw=src.read_bytes()
assert sha256(raw).hexdigest()=="ec78b41b9916aed402560f6feed9daed8900bda16c200493861ed684296ba86c"
html=raw.decode("utf-8").replace("\r\n","\n")

# Archive optional art recipes and 3D mote editor behind a collapsed, accessible disclosure.
art_begin='<fieldset class="control-group art-direction" data-art-direction>'
depth_begin='<fieldset class="control-group" data-depth-comparison>'
quick_begin='<fieldset class="control-group"><legend>'
assert all(html.count(x)==1 for x in (art_begin,depth_begin))
a=html.index(art_begin);b=html.index(depth_begin,a)
art=html[a:b]
assert 'data-art-preset="pure"' in art and 'data-mote-control="moteShape"' in art
html=html[:a]+html[b:]
depth_start=html.index(depth_begin)
quick_start=html.index(quick_begin,depth_start)
assert 'data-depth-compare="prior"' in html[depth_start:quick_start]
html=html[:depth_start]+html[quick_start:]
# Remove long-retired R171/R172 demo buttons, not material 1 or its JSON state.
obsolete_begin='<div data-magnetic-compare-group'
obsolete_end='<input id="sf-particlePreset"'
a=html.index(obsolete_begin);b=html.index(obsolete_end,a)
assert 'data-magnetic-demo' in html[a:b] and 'data-liquid-demo' in html[a:b]
html=html[:a]+html[b:]
# Move the still useful 3D mote editor and presets below basic material + volume controls.
advanced='<details class="vfx-advanced"><summary>'
assert html.count(advanced)==1
optional=(
 '<details class="lab-optional" data-lab-optional>\n'
 '<summary>Compositions et éclats 3D <span class="lab-meta">optionnel</span></summary>\n'
 '<p class="help">Ces paramètres décoratifs restent disponibles et exportables en JSON. '
 'Ils ne changent pas la géométrie du matériau énergétique.</p>\n'
 +art+
 '</details>\n'
)
html=html.replace(advanced,optional+advanced,1)
# Intro is about the current energy workflow, not obsolete A/B comparisons.
header=re.compile(r'<div class="panel-head"><h2>.*?</h2><span class="preview-state">.*?</span></div>\n<p class="help">R185 :.*?</p>\n',re.S)
assert len(header.findall(html))==1
html=header.sub(
 '<div class="panel-head"><h2>Matériau énergétique</h2>'
 '<span class="preview-state">LAB R187.2</span></div>\n'
 '<p class="help">Choisis un matériau, ajuste son volume et observe ses flux en mouvement. '
 'Les essais historiques sont retirés de la surface de travail.</p>\n',html,count=1
)
# Update headings without changing control ID or data key.
assert html.count('Création rapide')==1
html=html.replace('Création rapide','Matériau et énergie',1)
assert html.count('Volume de plasma')==1
html=html.replace('Volume de plasma','Volume et noyau',1)
assert html.count("Restaurer le plasma d'origine")==1
html=html.replace("Restaurer le plasma d'origine","Réinitialiser le laboratoire",1)
# Visual system: collapsed optional tooling, distinct primary controls.
style="""
.lab-optional{grid-column:1/-1;padding:0 12px;border:1px solid #29475e;
 background:linear-gradient(145deg,#102335,#0a1727);border-radius:13px}
.lab-optional>summary{min-height:48px;display:flex;align-items:center;justify-content:space-between;
 gap:10px;padding:12px 4px;font-weight:650;cursor:pointer;color:#d5eeff}
.lab-optional>summary::marker{color:#80deea}
.lab-optional>summary:focus-visible{outline:2px solid #8de5f5;outline-offset:3px}
.lab-optional .lab-meta{font-size:.69rem;letter-spacing:.04em;text-transform:uppercase;
 border:1px solid #396076;border-radius:30px;padding:4px 7px;color:#97c9d8}
.lab-optional:not([open])>*:not(summary){display:none}
.lab-optional[open]{padding-bottom:13px}
.lab-optional[open]>.control-group{margin-top:12px}
.lab-controls>.control-group:not(.mote-panel){border-color:#29455b}
.lab-controls .panel-head h2{font-size:1.12rem}
.lab-controls .preview-state{border-color:#315c69;color:#8bdfd3;background:#102b38}
"""
assert html.count("</style>")==1
html=html.replace("</style>",style+"</style>",1)
# The previous R187.1 envelopes stay coherent, with slightly stronger surface
# contrast and a functional flowStructure width control (used only by flowType 6).
start='  if(uPass>3.5&&uPass<4.5&&uFlow.x>5.5){'
end=' if(uPass>3.5&&uPass<4.5){'
start_at=html.index(start)
end_at=html.index(end,start_at+len(start))
old_shader=html[start_at:end_at]
shader=old_shader
refinements=[
 ('float tubeA=length(vec2(ra-bendA,heightA));',
  'float tubeA=length(vec2(ra-bendA,heightA));\n    float widthNeon=clamp(uFlow.y,.55,1.75);'),
 ('float shellA=exp(-pow((tubeA-.23)*23.,2.));',
  'float shellA=exp(-pow((tubeA-.23)*26./widthNeon,2.));'),
 ('float shellB=exp(-pow((tubeB-.25)*23.,2.));',
  'float shellB=exp(-pow((tubeB-.25)*26./widthNeon,2.));'),
 ('float shellC=exp(-pow((tubeC-.25)*23.,2.));',
  'float shellC=exp(-pow((tubeC-.25)*26./widthNeon,2.));'),
 ('float lensFront=.34+.78*smoothstep(-.8,.8,q.z);',
  'float lensFront=.26+.87*smoothstep(-.8,.8,q.z);'),
 ('railA*2.8*fluxA+lineA*4.2','railA*2.65*fluxA+lineA*4.75'),
 ('railB*2.9*fluxB+lineB*4.1','railB*2.7*fluxB+lineB*4.65'),
 ('Lneon+=uCore*coreNeon*.26+','Lneon+=uCore*coreNeon*.22+'),
 ('float alphaNeon=clamp(.014+Aneon*.76+coreNeon*.52+haloNeon*.06,0.,1.);',
  'float alphaNeon=clamp(.014+Aneon*.71+coreNeon*.49+haloNeon*.06,0.,1.);')
]
for before,after in refinements:
 assert shader.count(before)==1,("SHADER_TARGET",before,shader.count(before))
 shader=shader.replace(before,after,1)
html=html[:start_at]+shader+html[end_at:]
# No change to the historical materials. Headings, archived recipe/mote controls and
# JSON 18+10 control contract preserved.
assert html.count('<option value="6"')==1
assert html.count('data-sphere-control=')==raw.decode('utf-8').count('data-sphere-control=')
assert html.count('data-mote-control=')==raw.decode('utf-8').count('data-mote-control=')
assert 'data-depth-compare="prior"' not in html
assert 'data-magnetic-compare="r171"' not in html
assert html.count('data-art-preset="pure"')==1
assert html.count('data-lab-optional')==1
html=html.replace('<title>SiteForge — Laboratoire énergétique 3D R187.1</title>',
                  '<title>SiteForge — Laboratoire énergétique 3D R187.2</title>',1)
html=html.replace('Rubans énergétiques 3D · R187.1','Flux énergétiques 3D · R187.2',1)
# UX: open the seventh material explicitly from a link without changing defaults or JSON.
html=html.replace("if(launchDemo==='liquid')applyLiquidDemo();",
                  "if(launchDemo==='liquid')applyLiquidDemo();\n  if(launchDemo==='energy'){controls.flowType.value='6';sync();schedule();}",1)
assert "if(launchDemo==='energy')" in html
# Strict CSP update; no unsafe-inline for scripts.
m=re.search(r'(?s)<script>(.*?)</script>',html)
assert m and html.count('<script>')==1
digest=base64.b64encode(sha256(m.group(1).encode('utf-8')).digest()).decode('ascii')
csp=re.search(r"script-src 'sha256-[^']+'",html)
assert csp
html=html.replace(csp.group(0),"script-src 'sha256-"+digest+"'",1)
assert "script-src 'unsafe-inline'" not in html
dst.write_bytes(html.encode("utf-8"))
print("R1872_LAB_CLEANUP_BUILD_PASS",sha256(dst.read_bytes()).hexdigest(),digest)
