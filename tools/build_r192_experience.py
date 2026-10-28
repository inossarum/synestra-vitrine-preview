"""R192: source-pinned additive preview. No live source edits, no extra WebGL.
Futuristic architecture with central plasma, perspective metallic floor, projected light,
and scroll-led storytelling. All pages are copies of R191.
"""
from pathlib import Path
import hashlib,re
root=Path(__file__).resolve().parent.parent
prior=root/"r191"
out=root/"r192"
assets=root/"assets"
assert (prior/"index.html").exists()
assert (assets/"siteforge-r190-hover-flux.js").exists()
assert (assets/"r191-ambient.js").exists()
home=(prior/"index.html").read_text("utf-8")
assert home.count('class="core-r109-canvas"')==1
assert home.count('class="r189-system-map"')==1
assert home.count('class="core-r108-links"')==1
start=home.index('    <section class="container hero hero-v2"')
end=home.index('    <section class="container section product-section"',start)
old_hero=home[start:end]
st_start=old_hero.index('      <div class="system-stage')
st_end=old_hero.index('      </div>\n    </section>',st_start)+len('      </div>')
stage=old_hero[st_start:st_end]
# Hide original commerce controls and satellite orbit; only shader, SVG fallback and hidden controls remain.
stage=re.sub(r'\s*<!-- R189: static.*?-->\s*<div class="r189-geometry".*?</div>',"",stage,count=1,flags=re.S)
stage=re.sub(r'\s*<div class="r189-system-map".*?</div>\s*(?=<canvas)',"\n",stage,count=1,flags=re.S)
stage=re.sub(r'\s*<div class="core-tools-orbit".*?</div>\s*(?=<nav class="core-r108-links")',"\n",stage,count=1,flags=re.S)
stage=re.sub(r'\s*<nav class="core-r108-links".*?</nav>\s*<p class="core-r108-note".*?</p>',"",stage,count=1,flags=re.S)
assert '<canvas class="core-r109-canvas"' in stage
assert '<svg class="core-r108-art"' in stage
assert 'data-sphere-control="diameter"' in stage
assert 'class="core-r108-links"' not in stage
stage=stage.replace('class="system-stage core-r108-stage core-r109-stage"',
                    'class="system-stage core-r108-stage core-r109-stage r192-scene"',1)
stage=stage.replace('Prototype énergétique Synestra : courants violets et verts autour d&#39;un noyau lumineux, avec trois liens vers les produits.',
                    'Prototype énergétique Synestra : sphère de lumière suspendue au-dessus d’un sol métallique.',1)
stage=stage.replace('avec trois liens vers les produits.','avec projection colorée au sol.',1)
stage=stage.replace('        <div class="core-r108-top"><span>CORE / SYNESTRA</span><span>PROTOTYPE / 01</span></div>',
'''        <div class="core-r108-top"><span>CORE / 001</span><span>SCÈNE NUMÉRIQUE</span></div>
        <div class="r192-depth-haze" aria-hidden="true"></div>
        <div class="r192-floor" aria-hidden="true">
          <div class="r192-floor-grid"></div>
          <div class="r192-floor-sheen"></div>
          <div class="r192-floor-reflection"></div>
          <div class="r192-floor-light"></div>
        </div>
        <div class="r192-light-falloff" aria-hidden="true"></div>''',1)
# Core canvas single context: add reflection to same live raster through WebKit CSS, no duplicate.
hero='''    <section class="r192-hero" aria-labelledby="hero-title">
      <div class="r192-hero-intro">
        <p class="r192-eyebrow"><span aria-hidden="true" class="r192-signal"></span>SYNESTRA / STUDIO NUMÉRIQUE</p>
        <h1 id="hero-title">L’imagination <span>devient système.</span></h1>
        <p class="r192-subtitle">Créer des expériences. Connecter les capacités. Garder la maîtrise.</p>
      </div>
      <div class="r192-scene-shell">
''' + stage + '''
      <div class="r192-scene-caption" aria-hidden="true"><span>PLASMA / CHAMP LUMINEUX</span><span>SCÈNE EXPÉRIMENTALE — 01</span></div>
      </div>
      <div class="r192-hero-outro">
        <a class="r192-primary-link" href="#plateforme">Explorer l’écosystème <span aria-hidden="true">↘</span></a>
        <span class="r192-scroll-hint" aria-hidden="true">DÉFILER POUR EXPLORER <b>↓</b></span>
      </div>
    </section>
    <section class="r192-chapter-intro" aria-labelledby="r192-next-title">
      <div class="r192-chapter-head"><span>CHAPITRE 01 — L’ÉCOSYSTÈME</span><span>01 / 04</span></div>
      <div class="r192-chapter-layout"><h2 id="r192-next-title">Une vision.<br><em>Trois forces.</em></h2>
      <p>La création numérique ne se réduit pas à un écran. Chaque outil a son rôle, chaque interface une intention et chaque action son contrôle.</p></div>
      <nav class="r192-product-rail" aria-label="Découvrir les produits">
        <a href="./siteforge/"><span>01 / CRÉER</span><strong>SiteForge</strong><small>Donner forme aux idées</small><b aria-hidden="true">↗</b></a>
        <a href="./connect/"><span>02 / RELIER</span><strong>Connect</strong><small>Faire dialoguer les outils</small><b aria-hidden="true">↗</b></a>
        <a href="./bridge/"><span>03 / AGIR</span><strong>Bridge</strong><small>Relier un poste sous contrôle</small><b aria-hidden="true">↗</b></a>
      </nav>
    </section>

'''
assert hero.count('class="core-r109-canvas"')==1
assert hero.count('class="r192-floor"')==1
updated=home[:start]+hero+home[end:]
# Original R191 home policy permitted inline styles but blocked its own external CSS.
# Permit *only same-origin* stylesheets; keep the existing inline legacy allowance.
assert updated.count("style-src 'unsafe-inline'")==1
updated=updated.replace("style-src 'unsafe-inline'","style-src 'self' 'unsafe-inline'",1)
updated=updated.replace('syn-r191-home','syn-r191-home syn-r192-home',1)
updated=updated.replace('</head>','<link rel="stylesheet" href="../assets/r192-experience.css"></head>',1)
updated=updated.replace('</body>','<script src="../assets/r192-experience.js" defer></script></body>',1)
# Build five visually coherent pages with scroll storytelling and no business logic changes.
(out).mkdir(exist_ok=True)
(out/"index.html").write_text(updated,"utf-8")
for slug in ("connect","bridge","siteforge","offres"):
    raw=(prior/slug/"index.html").read_text("utf-8")
    raw=raw.replace('syn-r191-'+slug, 'syn-r191-'+slug+' syn-r192-product',1)
    raw=raw.replace("</head>",'<link rel="stylesheet" href="../../assets/r192-experience.css"></head>',1)
    raw=raw.replace("</body>",'<script src="../../assets/r192-experience.js" defer></script></body>',1)
    # Add section progress visual (decorative, does not replace original navigation).
    (out/slug).mkdir(exist_ok=True)
    (out/slug/"index.html").write_text(raw,"utf-8")
for p in [out/"index.html",*(out/s/"index.html" for s in ("connect","bridge","siteforge","offres"))]:
    value=p.read_text("utf-8")
    assert value.count('r192-experience.css')==1
    assert value.count('r192-experience.js')==1
    assert value.count("<h1")==1,p
    assert 'Content-Security-Policy' in value
    print(p.relative_to(root),hashlib.sha256(p.read_bytes()).hexdigest(),len(value))
assert (root/"r191"/"index.html").read_text("utf-8")==home
print("R192_BUILD=PASS; BASE_R191_UNCHANGED; ONE_GPU_CANVAS")
