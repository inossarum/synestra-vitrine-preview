"""R194: full editorial rebuild of public five-route preview, from R193 pinned base.
Keep WebGL shader and original product text/source paths intact. No live deployment.
"""
from pathlib import Path
import re,hashlib
root=Path(__file__).resolve().parent.parent
base=root/"r193"
out=root/"r194"
out.mkdir(exist_ok=True)
home=(base/"index.html").read_text("utf-8")
assert hashlib.sha256((base/"index.html").read_bytes()).hexdigest()=="3d5981b20171a6d4bbf45d8356d33c3d24af638b122c6e354c8d0313d6293dca"
assert home.count('<canvas class="core-r109-canvas"')==1
assert home.count('<section class="r192-hero"')==1
begin=home.index('    <section class="r192-chapter-intro"')
finish=home.index('  </main>',begin)
new=r"""    <section class="r194-prologue r194-chapter" id="vision" aria-labelledby="hero-title">
      <div class="r194-index"><span>01 / LA VISION</span><span>SYNESTRA — UN STUDIO À CONSTRUIRE</span></div>
      <div class="r194-prologue-grid">
        <div class="r194-prologue-copy">
          <p class="r194-kicker"><i aria-hidden="true"></i> STUDIO NUMÉRIQUE · PHASE PILOTE</p>
          <h1 id="hero-title">D’un besoin.<br><span>À un système.</span></h1>
          <p class="r194-lead">Concevoir l'expérience, relier les outils, préserver les décisions humaines. Synestra explore un studio numérique où chaque création a une intention et chaque capacité un cadre.</p>
          <div class="r194-prologue-actions"><a href="#systeme" class="r194-button">Découvrir l'écosystème <span aria-hidden="true">↘</span></a><a href="#approche" class="r194-text-link">Notre méthode <span aria-hidden="true">↓</span></a></div>
        </div>
        <div class="r194-signal-panel" role="img" aria-label="Diagramme conceptuel des trois axes de Synestra : conception, connexion et contrôle">
          <div class="r194-signal-orbit" aria-hidden="true">
            <span class="r194-signal-core">S.</span>
            <span class="r194-signal-node r194-signal-a">FORME</span>
            <span class="r194-signal-node r194-signal-b">LIEN</span>
            <span class="r194-signal-node r194-signal-c">CONTRÔLE</span>
          </div>
          <p>Un noyau. Plusieurs capacités.<br>Une direction cohérente.</p>
          <span class="r194-signal-foot">SCHÉMA CONCEPTUEL / NON OPÉRATIONNEL</span>
        </div>
      </div>
    </section>

    <section class="r194-ecosystem r194-chapter" id="systeme" aria-labelledby="systeme-title">
      <div class="r194-index"><span>02 / LES CAPACITÉS</span><span>CRÉER · CONNECTER · AGIR</span></div>
      <div class="r194-section-heading"><h2 id="systeme-title">Trois disciplines.<br><span>Un langage.</span></h2><p>Chaque produit possède son territoire. Ils partagent une méthode : rendre les systèmes lisibles, utilisables et contrôlables.</p></div>
      <div class="r194-products">
        <article class="r194-product r194-product-forge">
          <div class="r194-product-copy"><span class="r194-num">01 / DESIGN ENGINE</span><h3>SiteForge<span>.</span></h3>
          <p>Donner forme à une idée : hiérarchie, interfaces, expériences web et laboratoires graphiques.</p>
          <a href="./siteforge/">Explorer SiteForge <span aria-hidden="true">↗</span></a></div>
          <div class="r194-product-art r194-forge-art" aria-hidden="true"><div class="r194-forge-pane r194-forge-pane-a"><span>INTERFACE / 01</span><b>S.</b><i></i></div><div class="r194-forge-pane r194-forge-pane-b"><span>LAYOUT</span><i></i><i></i><i></i></div></div>
        </article>
        <article class="r194-product r194-product-connect">
          <div class="r194-product-copy"><span class="r194-num">02 / INTEGRATION LAYER</span><h3>Connect<span>.</span></h3>
          <p>Mettre en relation des fonctions sélectionnées, avec leurs permissions et leurs limites explicites.</p>
          <a href="./connect/">Découvrir Connect <span aria-hidden="true">↗</span></a></div>
          <div class="r194-product-art r194-connect-art" aria-hidden="true"><span class="r194-graph r194-graph-a">APP</span><span class="r194-graph r194-graph-b">TOOL</span><span class="r194-graph r194-graph-c">MCP</span><div class="r194-connect-heart">CONNECT<span>AUTHORIZED PATH</span></div></div>
        </article>
        <article class="r194-product r194-product-bridge">
          <div class="r194-product-copy"><span class="r194-num">03 / LOCAL CONTROL</span><h3>Bridge<span>.</span></h3>
          <p>Explorer un lien contrôlé vers Windows : autorisations explicites, opérations locales et appareils sélectionnés.</p>
          <a href="./bridge/">Comprendre Bridge <span aria-hidden="true">↗</span></a></div>
          <div class="r194-product-art r194-bridge-art" aria-hidden="true"><div class="r194-bridge-shell"><span>DEVICE / LOCAL</span><i class="r194-bridge-pill">PERMISSION</i><b>WINDOWS</b><div class="r194-bridge-bars"><i></i><i></i><i></i></div></div></div>
        </article>
      </div>
      <p class="r194-disclosure">SiteForge, Connect et Bridge sont présentés dans le cadre de la phase pilote. Les capacités réelles dépendent de leur qualification et des autorisations disponibles.</p>
    </section>

    <section class="r194-laboratory r194-chapter" id="siteforge" aria-labelledby="siteforge-title">
      <div class="r194-index"><span>03 / LE LABORATOIRE</span><span>EXPLORATIONS / SITEFORGE</span></div>
      <div class="r194-lab-layout">
        <div class="r194-lab-copy"><p class="r194-kicker"><i aria-hidden="true"></i> L’EXPÉRIENCE VISIBLE</p>
        <h2 id="siteforge-title">Des interfaces<br><span>qui vivent.</span></h2>
        <p>La composition, la typographie et le mouvement construisent une lecture. SiteForge est un laboratoire de directions graphiques à explorer, pas une galerie de résultats clients certifiés.</p>
        <a class="r194-button" href="../siteforge/">Voir les démonstrations <span aria-hidden="true">↗</span></a></div>
        <div class="r194-lab-mosaic" aria-label="Trois laboratoires visuels">
          <a class="r194-lab-card r194-lab-prism" href="../siteforge/"><span>EXPÉRIENCE 01</span><strong>PRISM</strong><small>Composition éditoriale</small><b aria-hidden="true">↗</b></a>
          <a class="r194-lab-card r194-lab-signature" href="../siteforge/signature/"><span>EXPÉRIENCE 02</span><strong>Signature</strong><small>Direction graphique expressive</small><b aria-hidden="true">↗</b></a>
          <a class="r194-lab-card r194-lab-form" href="../siteforge/lab/"><span>EXPÉRIENCE 03</span><strong>OPEN FORM</strong><small>Atelier expérimental</small><b aria-hidden="true">↗</b></a>
        </div>
      </div>
    </section>

    <section class="r194-method r194-chapter" id="approche" aria-labelledby="approche-title">
      <div class="r194-index"><span>04 / LE PARCOURS</span><span>UNE MÉTHODE / QUATRE PHASES</span></div>
      <div class="r194-method-grid">
        <div class="r194-method-sticky"><p class="r194-kicker"><i aria-hidden="true"></i> DU BESOIN À LA LIVRAISON</p>
          <h2 id="approche-title">Chaque étape<br><span>a sa raison.</span></h2>
          <p>Un projet numérique doit rester compréhensible : savoir ce que l'on cherche, ce qui est autorisé et comment évaluer le résultat.</p>
          <div class="r194-method-track" aria-hidden="true"><span class="r194-track-fill"></span></div>
          <span class="r194-method-counter" aria-live="off">ÉTAPE <b>01</b> / 04</span>
        </div>
        <ol class="r194-method-steps">
          <li data-r194-step="1"><span>01 / CADRER</span><h3>Comprendre.</h3><p>Décrire le besoin réel, les utilisateurs, les contraintes et les décisions humaines à préserver.</p></li>
          <li data-r194-step="2"><span>02 / CONCEVOIR</span><h3>Donner forme.</h3><p>Construire un parcours clair, vérifier ses hypothèses et rendre les choix visibles avant réalisation.</p></li>
          <li data-r194-step="3"><span>03 / QUALIFIER</span><h3>Éprouver.</h3><p>Tester les interactions, les permissions, les états d'erreur et les variantes d'écran.</p></li>
          <li data-r194-step="4"><span>04 / TRANSMETTRE</span><h3>Remettre.</h3><p>Identifier la version, les limites et les conditions de reprise. Une réalisation exige une validation préalable.</p></li>
        </ol>
      </div>
      <p class="r194-disclosure">Cette démarche décrit le cadre envisagé pendant la phase pilote ; les étapes effectivement engagées sont confirmées au cas par cas.</p>
    </section>

    <section class="r194-needs r194-chapter" id="exemples" aria-labelledby="exemples-title">
      <span id="difference" class="r194-anchor" aria-hidden="true"></span>
      <div class="r194-index"><span>05 / LES BESOINS</span><span>PARTIR DU RÉEL</span></div>
      <div class="r194-needs-grid">
        <div><h2 id="exemples-title">La technologie<br><span>n’est pas le départ.</span></h2>
        <p>Une interface n’a de sens que si elle simplifie quelque chose. Avant d’automatiser, il faut comprendre les exceptions, les règles et les décisions.</p></div>
        <div class="r194-needs-list">
         <article><span>01</span><h3>Plusieurs saisies, mêmes données.</h3><p>Cartographier les échanges avant de les relier.</p></article>
         <article><span>02</span><h3>Des demandes impossibles à suivre.</h3><p>Rendre visibles les étapes et les validations.</p></article>
         <article><span>03</span><h3>Des tâches répétées.</h3><p>Identifier les opérations éligibles et leurs limites.</p></article>
        </div>
      </div>
      <p class="r194-disclosure">Situations illustratives : elles ne représentent pas des clients réels ni des résultats garantis.</p>
    </section>

    <section class="r194-trust r194-chapter" id="confiance" aria-labelledby="confiance-title">
      <span id="realisations" class="r194-anchor" aria-hidden="true"></span><span id="a-propos" class="r194-anchor" aria-hidden="true"></span>
      <div class="r194-index"><span>06 / CONFIANCE</span><span>CAPACITÉS / LIMITES / DÉCISIONS</span></div>
      <div class="r194-trust-grid">
        <div><p class="r194-kicker"><i aria-hidden="true"></i> TRANSPARENCE</p><h2 id="confiance-title">Une promesse<br><span>ne remplace pas la preuve.</span></h2>
          <p>Synestra explore des expériences numériques, des outils d’intégration et un lien local contrôlé. La phase pilote n’équivaut pas à une disponibilité générale.</p>
        </div>
        <div class="r194-trust-stack">
          <article><span>01 / PREUVES</span><h3>Pas de réalisations clients revendiquées.</h3><p>La vitrine ne présente pas encore de réalisations client vérifiées et autorisées à publication.</p></article>
          <article><span>02 / AUTORISATIONS</span><h3>Les décisions restent humaines.</h3><p>Une demande ne vaut ni devis automatique, ni engagement de réalisation, ni permission d’exécuter.</p></article>
          <article><span>03 / ÉTAT ACTUEL</span><h3>Accès en cours de qualification.</h3><p>Le portail client et le parcours de connexion restent en phase de qualification. Leur présence ici n’atteste pas leur disponibilité intégrale.</p></article>
        </div>
      </div>
    </section>

    <section class="r194-faq r194-chapter" id="questions" aria-labelledby="questions-title">
      <div class="r194-index"><span>07 / QUESTIONS</span><span>COMPRENDRE AVANT D’AGIR</span></div>
      <div class="r194-faq-grid"><div><h2 id="questions-title">L’essentiel,<br><span>sans ambiguïté.</span></h2><p>La phase pilote est présentée sans promettre de fonctionnalités non vérifiées.</p></div>
      <div class="r194-faq-list">
        <details><summary>À qui s’adresse Synestra ?</summary><p>Aux artisans, indépendants et petites entreprises qui souhaitent clarifier un besoin numérique ou étudier une automatisation adaptée à leur activité.</p></details>
        <details><summary>Faut-il savoir programmer ?</summary><p>Non. Il suffit de décrire une situation, ses contraintes et les améliorations souhaitées.</p></details>
        <details><summary>Une demande déclenche-t-elle une réalisation ?</summary><p>Non. Le périmètre et les validations nécessaires sont précisés avant tout engagement.</p></details>
        <details><summary>Le portail est-il entièrement opérationnel ?</summary><p>Pas encore : l’accès client et les connexions restent en cours de qualification.</p></details>
        <details><summary>Où consulter des réalisations clients vérifiées ?</summary><p>La vitrine n’en présente pas encore. Les prototypes SiteForge sont des expérimentations, pas des références clients.</p></details>
      </div></div>
    </section>

    <section class="r194-end r194-chapter" id="acces-pilote" aria-labelledby="cta-title">
      <div class="r194-end-art" aria-hidden="true"><span>S.</span><i></i></div>
      <div class="r194-end-copy"><p class="r194-kicker">LA SUITE / PHASE PILOTE</p>
        <h2 id="cta-title">Tout commence<br><span>par une intention.</span></h2>
        <p>Vous pouvez consulter l’espace pilote ; la connexion et les fonctionnalités restent en qualification. Aucune demande n’engage automatiquement une réalisation.</p>
        <a class="r194-button" href="https://synestra-client-portal.synestra-studio.workers.dev/" rel="noreferrer">Espace pilote <span aria-hidden="true">↗</span></a>
      </div>
    </section>
"""
updated=home[:begin]+new+home[finish:]
assert updated.count("<h1")==1 and updated.count('<canvas class="core-r109-canvas"')==1
assert updated.count('id="questions"')==1
updated=updated.replace('syn-r193-home','syn-r193-home syn-r194-home',1)
assert updated.count('<script src="../assets/r192-experience.js" defer></script>')==1
updated=updated.replace('<script src="../assets/r192-experience.js" defer></script>','',1)
updated=updated.replace('href="#plateforme"','href="#vision"',1)
updated=updated.replace("Explorer l’écosystème","Découvrir le Studio",1)
updated=updated.replace("</head>",'<link rel="stylesheet" href="../assets/r194-editorial.css"></head>',1)
updated=updated.replace("</body>",'<script src="../assets/r194-scroll.js" defer></script></body>',1)
(out/"index.html").write_text(updated,encoding="utf-8")
# A genuine shared page-layout change for all four product routes, keeping source copy and semantics.
theme={
 "connect":("02","FLUX D'OUTILS","UN CHEMIN. DES PERMISSIONS.","RELIER","SELECTED TOOLS","AUTHORIZATION"),
 "bridge":("03","POINT DE CONTRÔLE","L’APPAREIL RESTE SOUS CONTRÔLE.","AGIR","LOCAL DEVICE","LOCAL APPROVAL"),
 "siteforge":("01","ESPACE DE CRÉATION","DU CONCEPT À L'INTERFACE.","CRÉER","LAYOUT LAB","VISUAL PROTOTYPE"),
 "offres":("04","ÉTUDE DE BESOIN","LE BON PÉRIMÈTRE AVANT L'OFFRE.","EXPLORER","PILOT STATUS","NO AUTO-COMMITMENT")
}
for slug,labels in theme.items():
 src=base/slug/"index.html"
 dst=out/slug/"index.html";dst.parent.mkdir(exist_ok=True)
 html=src.read_text("utf-8")
 assert html.count('<section class="intro"')==1,slug
 preface='''<div class="r194-page-index" aria-hidden="true"><span>SYNESTRA / %s</span><span>%s / 04</span></div>
<div class="r194-page-spectrum" aria-hidden="true"><span>%s</span><i></i><b>%s</b></div>
'''%(labels[1],labels[0],labels[2],labels[3])
 html=html.replace('<section class="intro"',preface+'<section class="intro r194-product-intro"',1)
 # Product-specific schematic adds a new section before the existing first substantive section.
 after='''<section class="r194-product-principle" aria-label="Architecture conceptuelle %s">
   <div class="r194-principle-head"><span>%s / ARCHITECTURE</span><strong>Un parcours compréhensible.</strong></div>
   <div class="r194-principle-graph" aria-hidden="true"><span>%s</span><b>→</b><span>%s</span><b>→</b><span>VALIDATION</span></div>
   <p>Schéma conceptuel. Les fonctions disponibles et les autorisations sont définies au cas par cas pendant la phase pilote.</p>
 </section>
'''%(slug,labels[0],labels[4],labels[5])
 marker='<section class="section"'
 if marker not in html:
  marker='<section class="section"'
 assert marker in html
 html=html.replace(marker,after+marker,1)
 assert html.count('<script src="../../assets/r192-experience.js" defer></script>')==1
 html=html.replace('<script src="../../assets/r192-experience.js" defer></script>','',1)
 html=html.replace('syn-r191-product','syn-r191-product syn-r194-product',1)
 html=html.replace('syn-r192-product','syn-r192-product syn-r194-'+slug,1)
 html=html.replace("</head>",'<link rel="stylesheet" href="../../assets/r194-editorial.css"></head>',1)
 html=html.replace("</body>",'<script src="../../assets/r194-scroll.js" defer></script></body>',1)
 assert html.count('<h1')==1
 dst.write_text(html,encoding="utf-8")
for file in [out/"index.html",*(out/s/"index.html" for s in theme)]:
 h=file.read_text("utf-8")
 assert h.count('r194-editorial.css')==1
 assert h.count('r194-scroll.js')==1
 print(file.relative_to(root),hashlib.sha256(file.read_bytes()).hexdigest()[:20])
print("R194_BUILD=PASS; R193_UNTOUCHED; WEBGL_UNCHANGED")
