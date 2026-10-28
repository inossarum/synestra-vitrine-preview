"""R195 — targeted 5-page revision from immutable R194.
Interactive architecture for first editorial chapter, layered hover and subtle 3D, accessible FAQ.
Pilot portal production explicitly remains an Access-protected, separately gated service.
"""
from pathlib import Path
import hashlib,re
root=Path(__file__).resolve().parent.parent
src=root/"r194"; dst=root/"r195"; dst.mkdir(exist_ok=True)
base=(src/"index.html").read_bytes()
assert hashlib.sha256(base).hexdigest()=="ff5c2e1276fb39d73623a47ecb7afb24e0b679679a04e6d667f7f07ea1ddc44d"
home=base.decode("utf-8").replace("\r\n","\n").replace("\r","\n")
old='''        <div class="r194-signal-panel" role="img" aria-label="Diagramme conceptuel des trois axes de Synestra : conception, connexion et contrôle">
          <div class="r194-signal-orbit" aria-hidden="true">
            <span class="r194-signal-core">S.</span>
            <span class="r194-signal-node r194-signal-a">FORME</span>
            <span class="r194-signal-node r194-signal-b">LIEN</span>
            <span class="r194-signal-node r194-signal-c">CONTRÔLE</span>
          </div>
          <p>Un noyau. Plusieurs capacités.<br>Une direction cohérente.</p>
          <span class="r194-signal-foot">SCHÉMA CONCEPTUEL / NON OPÉRATIONNEL</span>
        </div>'''
new='''        <div class="r195-vision-system" aria-label="Découvrir les trois capacités du Studio">
          <div class="r195-vision-halo" aria-hidden="true"><div class="r195-vision-ring"></div><div class="r195-vision-ring r195-ring-second"></div><span class="r195-vision-symbol">S.</span></div>
          <div class="r195-vision-head"><span>ARCHITECTURE / 001</span><span>VISION DU STUDIO</span></div>
          <nav class="r195-vision-links" aria-label="Explorer les produits Synestra">
            <a href="./siteforge/" class="r195-vision-link r195-tilt">
              <span class="r195-vision-order">01 / CONCEVOIR</span><strong>SiteForge</strong><small>Créer des interfaces</small><b aria-hidden="true">↗</b>
            </a>
            <a href="./connect/" class="r195-vision-link r195-tilt">
              <span class="r195-vision-order">02 / RELIER</span><strong>Connect</strong><small>Orchestrer les fonctions</small><b aria-hidden="true">↗</b>
            </a>
            <a href="./bridge/" class="r195-vision-link r195-tilt">
              <span class="r195-vision-order">03 / CONTRÔLER</span><strong>Bridge</strong><small>Exécuter sous autorisation</small><b aria-hidden="true">↗</b>
            </a>
          </nav>
          <p class="r195-vision-foot">TROIS DOMAINES / UNE IDENTITÉ NUMÉRIQUE</p>
        </div>'''
assert home.count('class="r194-signal-panel"')==1
beg=home.index('        <div class="r194-signal-panel"')
end=home.index('</div>',home.index('class="r194-signal-foot"',beg))+len('</div>')
home=home[:beg]+new+home[end:]
home=home.replace('class="r194-prologue r194-chapter"','class="r194-prologue r194-chapter r195-prologue"',1)
home=home.replace('D’un besoin.<br><span>À un système.</span>','Une idée.<br><span>Des possibles.</span>',1)
home=home.replace("Concevoir l'expérience, relier les outils, préserver les décisions humaines. Synestra explore un studio numérique où chaque création a une intention et chaque capacité un cadre.",
"Un même studio pour imaginer des expériences, connecter des capacités et garder la maîtrise de chaque action. Trois disciplines, des parcours distincts, une direction commune.",1)
# Verified access-protected portal: no assertion that staging has shipped to production.
home=home.replace("Le portail client et le parcours de connexion restent en phase de qualification. Leur présence ici n’atteste pas leur disponibilité intégrale.",
                  "Le portail client demeure protégé par des contrôles d'accès. Les fonctionnalités et les habilitations sont qualifiées séparément ; une démonstration publique n'ouvre aucun compte.",1)
home=home.replace("Pas encore : l’accès client et les connexions restent en cours de qualification.",
                  "Le portail est réservé aux utilisateurs autorisés. Les fonctionnalités disponibles dépendent des habilitations et de leur qualification.",1)
home=home.replace("Vous pouvez consulter l’espace pilote ; la connexion et les fonctionnalités restent en qualification. Aucune demande n’engage automatiquement une réalisation.",
                  "Le portail pilote est protégé et son accès dépend des autorisations accordées. Les fonctions proposées sont qualifiées progressivement ; aucune demande n'engage automatiquement une réalisation.",1)
home=home.replace('<div class="r194-end-copy"><p class="r194-kicker">LA SUITE / PHASE PILOTE</p>',
                  '<div class="r194-end-copy"><p class="r194-kicker">LA SUITE / PHASE PILOTE</p><p class="r195-pilot-status"><span aria-hidden="true"></span>ACCÈS CONTRÔLÉ · DISPONIBILITÉ SUR AUTORISATION</p>',1)
home=home.replace('href="https://synestra-client-portal.synestra-studio.workers.dev/" rel="noreferrer">Espace pilote',
                  'href="https://synestra-client-portal.synestra-studio.workers.dev/" rel="noreferrer">Espace pilote',1)
home=home.replace('syn-r194-home','syn-r194-home syn-r195-home',1)
home=home.replace('</head>','<link rel="stylesheet" href="../assets/r195-interactions.css"></head>',1)
home=home.replace('</body>','<script src="../assets/r195-interactions.js" defer></script></body>',1)
assert home.count('<canvas class="core-r109-canvas"')==1
assert home.count('class="r195-vision-link r195-tilt"')==3
(dst/"index.html").write_text(home,encoding="utf-8")
for slug in ("connect","bridge","siteforge","offres"):
    page=(src/slug/"index.html").read_text("utf-8")
    page=page.replace('syn-r194-product','syn-r194-product syn-r195-product',1)
    page=page.replace('</head>','<link rel="stylesheet" href="../../assets/r195-interactions.css"></head>',1)
    page=page.replace('</body>','<script src="../../assets/r195-interactions.js" defer></script></body>',1)
    if slug=="offres":
        page=page.replace("Un portail existe pour les parcours en qualification. L’accès effectif dépend des autorisations et du périmètre ouvert.",
        "Le portail pilote est protégé. Son accès dépend des habilitations accordées ; les fonctionnalités et les conditions du pilote sont qualifiées progressivement.",1)
        page=page.replace("La phase pilote sert à définir un besoin, des droits et des contrôles adaptés, avant toute activation.",
        "Le portail public actuel reste protégé et distinct du staging technique. Les habilitations sont vérifiées avant toute activation.",1)
    assert page.count('r195-interactions.css')==1
    out=dst/slug/"index.html";out.parent.mkdir(exist_ok=True)
    out.write_text(page,encoding="utf-8")
for f in [dst/"index.html",*(dst/s/"index.html" for s in ("connect","bridge","siteforge","offres"))]:
    h=f.read_text("utf-8");assert h.count("r195-interactions.js")==1
    print(str(f.relative_to(root)),hashlib.sha256(f.read_bytes()).hexdigest()[:18])
print("R195_SOURCE_PROTECTED",hashlib.sha256((src/"index.html").read_bytes()).hexdigest())
