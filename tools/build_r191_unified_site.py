"""R191: isolated preview of five pages; reuse R190 and existing Connect/Bridge ambient.
No mutation to main, product sources, engine, original style, or Studio source.
"""
from pathlib import Path
import hashlib, re, html as htmlmod
base=Path(__file__).resolve().parent.parent
preview=base/"r191"
(preview/"connect").mkdir(parents=True,exist_ok=True)
(preview/"bridge").mkdir(parents=True,exist_ok=True)
(preview/"offres").mkdir(parents=True,exist_ok=True)
(preview/"siteforge").mkdir(parents=True,exist_ok=True)
assets=base/"assets"
source_js=(assets/"core-r109-webgl.js").read_text("utf-8")
assert "const scene = document.querySelector('.core-r108-stage')" in source_js
ambient=source_js.split("  const scene = document.querySelector('.core-r108-stage');",1)[0]
assert ambient.count("const startAmbient") == 1 and "startAmbient();" in ambient
# Reuse R111-115 native ambient; no second WebGL context.
(assets/"r191-ambient.js").write_text(ambient.rstrip()+"\n})();\n",encoding="utf-8")
source_css=(assets/"product-pages.css").read_text("utf-8")
start=source_css.index("/* R111 / ambient field.")
end=source_css.index("/* R170",start) if "/* R170" in source_css[start:] else source_css.index("/* R170",0) if "/* R170" in source_css else -1
# Only the ambient primitives. Need to include full keyframes and reduced motion.
ambient_css=source_css[start:source_css.index("/* R170",start)] if "/* R170" in source_css[start:] else source_css[start:source_css.index("/* R169",start)] if "/* R169" in source_css[start:] else source_css[start:source_css.index("/* R170",0)] if "/* R170" in source_css else source_css[start:source_css.index("/* R116",start)] if "/* R116" in source_css[start:] else ""
# In current source the R170 CSS starts with a comment near end; fallback bounded to source from R111 to latest style section.
if not ambient_css:
    ambient_css=source_css[start:source_css.index("\n/* R",start+20)] if "\n/* R" in source_css[start+20:] else source_css[start:]
assert ".syn-ambient-field" in ambient_css and "@keyframes syn-ambient-float" in ambient_css
# Shared editorial design: fewer slabs, lighter borders, calm gradients; original animations still drive the same field.
layout_css=r"""
/* R191 / unified digital studio system — calm digital, not cyberpunk */
:root{
 color-scheme:dark;
 --r191-bg:#050b17;--r191-ink:#eef5ff;--r191-muted:#a7b8cd;
 --r191-line:rgba(142,181,214,.17);--r191-surface:rgba(14,27,47,.62);
 --r191-cyan:#8bdce9;--r191-green:#86dfc2;--r191-violet:#ae9ae9;
 --r191-content:1272px;--r191-radius:15px;
}
html{scroll-behavior:smooth}
body.syn-r191{
 background:radial-gradient(ellipse 45vw 48vw at 78% 8%,rgba(38,70,125,.12),transparent 78%),
 radial-gradient(ellipse 42vw 36vw at 5% 56%,rgba(81,67,146,.095),transparent 78%),
 linear-gradient(180deg,#040914 0%,#080f20 62%,#0b1120 100%);
 color:var(--r191-ink);font-family:Inter,system-ui,-apple-system,Segoe UI,sans-serif;
 animation:none!important;overflow-x:clip;
}
body.syn-r191 .syn-ambient-field{position:fixed;opacity:.68;z-index:0}
body.syn-r191 .syn-ambient-field::before{width:60vw;opacity:.25}
body.syn-r191 .syn-ambient-field::after{opacity:.22}
body.syn-r191 .syn-ambient-comet{opacity:0}
body.syn-r191 .syn-ambient-particle{box-shadow:0 0 4px rgba(135,203,230,.22)}
body.syn-r191 > header, body.syn-r191 > main,body.syn-r191 > footer,
body.syn-r191 > .skip{position:relative;z-index:2}
body.syn-r191 .skip:focus{z-index:90}
body.syn-r191 ::selection{background:#455b93;color:#fff}
body.syn-r191 :focus-visible{outline:2px solid #aaf4ef;outline-offset:4px}
/* Product sections: one generous readable grid and subtle transparent treatment */
.syn-r191-product .wrap{max-width:var(--r191-content)}
.syn-r191-product .topbar{min-height:84px;border-bottom:1px solid var(--r191-line);
 gap:26px;align-items:center}
.syn-r191-product .topbar .logo img{width:clamp(170px,18vw,225px);max-height:65px;object-fit:contain}
.syn-r191-product .site-nav{gap:clamp(8px,1.4vw,21px)}
.syn-r191-product .site-nav a{font-size:12px;color:#b2c4d4;font-weight:630}
.syn-r191-product .site-nav a:hover,.syn-r191-product .site-nav a[aria-current=page]{color:#f2faff}
.syn-r191-product .site-nav a[aria-current=page]{border-bottom-color:var(--r191-green)}
.syn-r191-product .site-nav .nav-action{border-radius:11px;padding:10px 14px;
 background:linear-gradient(110deg,#d4e5fa,#9de6e4);color:#102135}
.syn-r191-product .topbar::after{opacity:.45;height:1px;animation-duration:35s}
.syn-r191-product .breadcrumb{margin:36px 0 0;color:#85a2bd;font-size:10px}
.syn-r191-product .product-chapters{gap:8px;margin:21px 0 0;border-bottom:1px solid var(--r191-line);padding-bottom:19px}
.syn-r191-product .product-chapters strong{color:#89a6c0}
.syn-r191-product .product-chapters a{border:0;background:transparent;
 padding:8px 9px;color:#a6bdd0;border-radius:8px}
.syn-r191-product .product-chapters a:hover{background:rgba(110,177,219,.095);border-color:transparent}
.syn-r191-product .intro{grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);
 gap:clamp(34px,5vw,80px);padding-block:clamp(56px,7vw,94px) 66px;align-items:center}
.syn-r191-product .intro > div{min-width:0}
.syn-r191-product .eyebrow{color:#a9d7db;font-size:10px;letter-spacing:.18em}
.syn-r191-product .eyebrow::before{width:5px;height:5px;background:var(--r191-green);box-shadow:0 0 9px #86dfc255}
.syn-r191-product h1{font-size:clamp(2.7rem,4.8vw,5rem);max-width:14ch;font-weight:760;
 letter-spacing:-.067em;line-height:1.07;margin:24px 0}
.syn-r191-product h1 .accent,.syn-r191-product h2 .accent{
 background:linear-gradient(115deg,#d8eafd 15%,#b6a9ee 58%,#88e8d0);
 -webkit-background-clip:text;background-clip:text;color:transparent}
.syn-r191-product .lead{font-size:clamp(14px,1.22vw,17px);line-height:1.78;color:#aabed0}
.syn-r191-product .micro{font-size:11px;color:#839db5}
.syn-r191-product .cta{min-height:44px;border-radius:10px;font-size:12px;padding:12px 17px}
.syn-r191-product .cta.primary{background:linear-gradient(105deg,#dfebf9,#a5dbe8);box-shadow:none;color:#0b2231}
.syn-r191-product .cta.secondary{background:transparent;border-color:rgba(159,198,228,.28)}
.syn-r191-product .cta:hover{transform:translateY(-2px)}
.syn-r191-product .visual{min-height:355px;border-radius:18px;
 background:radial-gradient(ellipse at 55% 50%,rgba(49,98,183,.13),transparent 65%),
 rgba(11,20,37,.43);border:1px solid var(--r191-line);
 box-shadow:inset 0 1px rgba(220,239,255,.025);animation:none!important}
.syn-r191-product .visual:before{opacity:.055}
.syn-r191-product .visual.bridge-visual{background:radial-gradient(circle at 48% 50%,rgba(92,70,180,.1),transparent 57%),rgba(12,21,37,.48)}
.syn-r191-product .connect-center{width:150px;height:150px;box-shadow:0 0 45px rgba(48,137,192,.1);background:radial-gradient(circle at 40% 34%,#1c385b,#0b1829)}
.syn-r191-product .connect-center::before,.syn-r191-product .connect-center::after{opacity:.5}
.syn-r191-product .graph-node{background:rgba(9,24,42,.92);box-shadow:none;border-color:var(--r191-line);border-radius:8px}
.syn-r191-product .device{background:linear-gradient(130deg,#1a2a42,#101b2e);border-color:#44617f;box-shadow:0 19px 40px #0003}
.syn-r191-product .section{padding-block:clamp(47px,5.4vw,80px)}
.syn-r191-product .section-heading{max-width:820px;margin-bottom:31px}
.syn-r191-product .section h2{font-size:clamp(1.9rem,3vw,3.1rem);letter-spacing:-.055em;font-weight:720}
.syn-r191-product .divider{border-color:var(--r191-line)}
.syn-r191-product .grid,.syn-r191-product .process{gap:0;border-top:1px solid var(--r191-line)}
.syn-r191-product .tile,.syn-r191-product .process article{
 border:0;border-right:1px solid var(--r191-line);border-radius:0;background:transparent!important;box-shadow:none!important;
 padding:clamp(19px,2.3vw,31px) clamp(17px,2.6vw,31px)}
.syn-r191-product .tile:last-child,.syn-r191-product .process article:last-child{border-right:0}
.syn-r191-product .tile:hover{transform:none;border-color:var(--r191-line)}
.syn-r191-product .tile .num{font-size:10px;color:#85cbd1}
.syn-r191-product .tile h3{font-size:19px;margin:20px 0 11px}
.syn-r191-product .tile p{font-size:13px;color:#a7bacc}
.syn-r191-product .product-example{border-radius:17px;background:rgba(14,28,48,.36);
 border-color:var(--r191-line);gap:35px}
.syn-r191-product .product-example li{background:transparent;border-left:1px solid #579fbe;border-radius:0}
.syn-r191-product .callout{background:linear-gradient(135deg,rgba(21,40,66,.59),rgba(13,27,47,.43));
 border-color:var(--r191-line);border-radius:17px}
.syn-r191-product .details details{background:rgba(13,27,45,.36);border-color:var(--r191-line);border-radius:10px}
.syn-r191-product .offers{gap:14px}
.syn-r191-product .offer{border-color:var(--r191-line);background:rgba(13,27,46,.47);border-radius:16px}
.syn-r191-product .footer{border-top-color:var(--r191-line)}
.syn-r191-product .availability{background:rgba(131,130,119,.045);border-left-color:#cdb88d}
@media(max-width:920px){
 .syn-r191-product .topbar{flex-wrap:wrap;padding-block:15px}
 .syn-r191-product .site-nav{width:100%;flex-wrap:wrap}
 .syn-r191-product .intro{grid-template-columns:1fr;padding-block:44px 54px}
 .syn-r191-product .intro h1{max-width:18ch}
 .syn-r191-product .visual{min-height:340px}
}
@media(max-width:640px){
 .syn-r191-product .topbar .logo img{max-width:208px}
 .syn-r191-product .site-nav{gap:5px 13px;overflow:visible}
 .syn-r191-product .site-nav a{font-size:11px;padding:6px 0}
 .syn-r191-product .site-nav .nav-action{flex-basis:auto;padding:8px 11px}
 .syn-r191-product h1{font-size:clamp(2.2rem,9vw,3.8rem)}
 .syn-r191-product .grid,.syn-r191-product .process{grid-template-columns:minmax(0,1fr)}
 .syn-r191-product .tile,.syn-r191-product .process article{border-right:0;border-bottom:1px solid var(--r191-line);padding:23px 2px}
 .syn-r191-product .tile:last-child,.syn-r191-product .process article:last-child{border-bottom:0}
 .syn-r191-product .product-example{padding:23px}
 .syn-r191-product .visual{min-height:310px}
 .syn-r191-product .offer{min-width:0}
}
/* Studio: protect R190 pointer shader and its framing while sharing the same ambient. */
.syn-r191-home .site-header{max-width:min(var(--r191-content),calc(100% - 36px));
 border-bottom:1px solid var(--r191-line);border-radius:0;background:transparent;box-shadow:none}
.syn-r191-home .site-nav a{font-weight:630}
.syn-r191-home .hero-v2{width:min(100% - 36px,1550px)}
.syn-r191-home .system-stage{background:radial-gradient(ellipse at 50% 51%,rgba(47,62,122,.19),transparent 58%),linear-gradient(180deg,#040914,#0b1122 73%,#131529)}
.syn-r191-home .r189-system-map .r189-system-node{border-color:var(--r191-line)}
.syn-r191-home .core-r108-links a{border-color:var(--r191-line);background:rgba(12,26,46,.58)}
.syn-r191-home .core-r108-links a:hover{background:rgba(19,40,65,.82)}
.syn-r191-home .product-card,.syn-r191-home .r105-orientation-list>a{
 border-color:var(--r191-line)!important;background:rgba(13,26,44,.48)!important;box-shadow:none!important}
.syn-r191-home .product-card:hover,.syn-r191-home .r105-orientation-list>a:hover{transform:none}
.syn-r191-home .section{padding-block:clamp(55px,6vw,89px)}
@media(max-width:680px){
 .syn-r191-home .hero-v2{width:100%}
 .syn-r191-home .site-header{width:calc(100% - 32px)}
}
/* Motion accessibility and contrast: no decorative effects requiring pointer. */
@media(prefers-reduced-motion:reduce){
 body.syn-r191 .syn-ambient-field{display:none!important}
 body.syn-r191 .visual,body.syn-r191 .device,body.syn-r191 .graph-node,
 body.syn-r191 .connect-center::before,body.syn-r191 .connect-center::after{animation:none!important}
 body.syn-r191 .cta:hover{transform:none!important}
}
"""
siteforge_css=r"""
/* SiteForge illustration follows the strict CSP: CSS classes, no inline styles. */
.r191-sf-visual-grid{position:absolute;inset:16% 12%;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px;
 transform:perspective(600px) rotateX(12deg)}
.r191-sf-slab{min-width:0;border-radius:10px}
.r191-sf-slab-main{grid-column:span 3;background:linear-gradient(135deg,#1b3458,#203657);
 border:1px solid #648db544;padding:20px;display:flex;flex-direction:column;justify-content:space-between}
.r191-sf-caption{font:700 10px ui-monospace,monospace;color:#8fd4dd}
.r191-sf-symbol{font-size:30px;color:#e1ecfb}
.r191-sf-slab-side{grid-column:span 2;background:#152840;border:1px solid #84ddc044;padding:14px}
.r191-sf-side-caption{font:700 10px ui-monospace,monospace;color:#a9dfe6}
.r191-sf-line{height:6px;background:#86dfc277;margin-top:36px;border-radius:9px}
.r191-sf-line-small{height:6px;background:#8e9fd455;margin-top:13px;width:65%;border-radius:9px}
.r191-sf-slab-empty{grid-column:span 2;background:#162943;border:1px solid #b8a2ed44;min-height:80px}
.r191-sf-slab-foot{grid-column:span 3;background:linear-gradient(125deg,#24365a,#152437);
 border:1px solid #77b9e644;padding:20px;display:flex;align-items:center;gap:12px}
.r191-sf-foot-symbol{display:block;border:1px solid #91e1e5;border-radius:50%;height:24px;width:24px;flex:none}
.r191-sf-foot-copy{font-size:12px;color:#c3dce9}
@media(max-width:640px){.r191-sf-visual-grid{inset:18% 8%;gap:7px}
 .r191-sf-slab-main,.r191-sf-slab-side,.r191-sf-slab-foot{padding:13px}}
"""
css=ambient_css+"\n"+layout_css+"\n"+siteforge_css
(assets/"r191-system.css").write_text(css,encoding="utf-8")
# Home R190 unmodified by applying only shared system + ambient once.
home=(base/"r190-hero-hover-flux.html").read_text("utf-8")
assert '<body class="r189-composition">' in home
home=home.replace('<body class="r189-composition">','<body class="r189-composition syn-r191 syn-r191-home">',1)
home=home.replace('="./assets/','="../assets/')
# Align the header with the same official logo asset used on product routes.
home=home.replace('synestra-studio-header-y-r99.webp','synestra-studio-official-header.webp',1)
# Preserve original creative demo routes while SiteForge corporate navigation stays in R191.
home=re.sub(r'href="\./siteforge/(?!")','href="../siteforge/',home)
home=home.replace("</head>",'<link rel="stylesheet" href="../assets/r191-system.css"></head>',1)
home=home.replace("</body>",'<script src="../assets/r191-ambient.js" defer></script></body>',1)
assert home.count("siteforge-r190-hover-flux.js")==1
(preview/"index.html").write_text(home,encoding="utf-8")
for slug in ("connect","bridge","offres"):
    raw=(base/slug/"index.html").read_text("utf-8")
    assert raw.count('<body>')==1 and raw.count('core-r109-webgl.js')==1
    raw=raw.replace("<body>",'<body class="syn-r191 syn-r191-product syn-r191-'+slug+'">',1)
    raw=raw.replace("../assets/","../../assets/")
    raw=raw.replace('core-r109-webgl.js','r191-ambient.js')
    raw=raw.replace("</head>",'<link rel="stylesheet" href="../../assets/r191-system.css"></head>',1)
    (preview/slug/"index.html").write_text(raw,encoding="utf-8")
# SiteForge corporate overview. The original Prism & laboratory remain at their original URLs.
siteforge="""<!doctype html><html lang="fr"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark"><meta name="robots" content="noindex,nofollow">
<meta name="referrer" content="no-referrer">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'self'; img-src 'self'; script-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'">
<title>Synestra SiteForge — Studio numérique</title>
<meta name="description" content="SiteForge : donner forme à un projet web, explorer des prototypes visuels et qualifier chaque étape.">
<link rel="stylesheet" href="../../assets/product-pages.css">
<link rel="stylesheet" href="../../assets/r191-system.css"></head>
<body class="syn-r191 syn-r191-product syn-r191-siteforge"><a class="skip" href="#contenu">Aller au contenu</a>
<header class="topbar wrap"><a class="logo" href="../" aria-label="Accueil Synestra"><img src="../../assets/synestra-studio-official-header.webp" width="540" height="132" alt="Synestra Studio — logo officiel"></a>
<nav class="site-nav" aria-label="Navigation principale">
<a href="../">Studio</a><a href="../connect/">Connect</a><a href="../bridge/">Bridge</a><a href="../siteforge/" aria-current="page">SiteForge</a><a href="../offres/">Offres</a>
<a class="nav-action" href="https://synestra-client-portal.synestra-studio.workers.dev/" rel="noreferrer">Espace pilote ↗</a></nav></header>
<main class="wrap" id="contenu" tabindex="-1">
<p class="breadcrumb"><a href="../">Studio</a><span aria-hidden="true">/</span>Synestra SiteForge</p>
<nav class="product-chapters" aria-label="Dans cette page"><strong>03 / SITEFORGE</strong><a href="#approche">Approche</a><a href="#directions">Directions</a><a href="#parcours">Parcours</a><a href="../connect/">Connect</a></nav>
<section class="intro" aria-labelledby="siteforge-heading">
<div><p class="eyebrow">Design &amp; création web</p><h1 id="siteforge-heading">Des idées claires.<br><span class="accent">Des expériences vivantes.</span></h1>
<p class="lead">SiteForge explore la conception de pages, de composants et d’interactions numériques. Une démarche lisible : présenter, prototyper, vérifier, puis décider ce qui mérite d’être réalisé.</p>
<div class="actions"><a class="cta primary" href="../../siteforge/">Explorer les démonstrations ↗</a><a class="cta secondary" href="#approche">Notre méthode ↓</a></div>
<p class="micro">Les compositions présentées sont des démonstrations expérimentales et non des réalisations clients certifiées.</p></div>
<div class="visual" role="img" aria-label="Illustration abstraite de blocs numériques représentant un projet web à construire">
<span class="visual-label">SITEFORGE / DESIGN SYSTEM</span>
<div aria-hidden="true" style="position:absolute;inset:16% 12%;display:grid;grid-template-columns:repeat(5,1fr);gap:10px;transform:perspective(600px) rotateX(12deg)">
<div style="grid-column:span 3;background:linear-gradient(135deg,#1b3458,#203657);border:1px solid #648db544;border-radius:10px;padding:20px;display:flex;flex-direction:column;justify-content:space-between"><span style="font:700 10px monospace;color:#8fd4dd">01 / INTERFACE</span><span style="font-size:30px;color:#e1ecfb">S.</span></div>
<div style="grid-column:span 2;background:#152840;border:1px solid #84ddc044;border-radius:10px;padding:14px"><span style="font:700 10px monospace;color:#a9dfe6">COMPOSANTS</span><div style="height:6px;background:#86dfc277;margin-top:36px;border-radius:9px"></div><div style="height:6px;background:#8e9fd455;margin-top:13px;width:65%;border-radius:9px"></div></div>
<div style="grid-column:span 2;background:#162943;border:1px solid #b8a2ed44;border-radius:10px;min-height:80px"></div>
<div style="grid-column:span 3;background:linear-gradient(125deg,#24365a,#152437);border:1px solid #77b9e644;border-radius:10px;padding:20px;display:flex;align-items:center;gap:12px"><span style="display:block;border:1px solid #91e1e5;border-radius:50%;height:24px;width:24px"></span><span style="font-size:12px;color:#c3dce9">EXPÉRIMENTER → VÉRIFIER</span></div>
</div><span class="visual-bottom">ILLUSTRATION DE CONCEPTION · AUCUNE SESSION LIVE</span></div>
</section><hr class="divider">
<section class="section" id="approche" aria-labelledby="method-title"><div class="section-heading"><p class="eyebrow">Une direction lisible</p><h2 id="method-title">La simplicité comme <span class="accent">architecture.</span></h2><p>Des éléments clairs, une hiérarchie forte et des interactions utiles. Les effets visuels restent au service du contenu.</p></div>
<div class="grid"><article class="tile"><span class="num">01 / STRUCTURE</span><h3>Une idée à la fois</h3><p>Construire des parcours cohérents avant de multiplier les composants.</p></article><article class="tile"><span class="num">02 / EXPÉRIENCE</span><h3>Du mouvement utile</h3><p>Donner du relief et du sens sans alourdir la navigation.</p></article><article class="tile"><span class="num">03 / QUALIFICATION</span><h3>Une preuve visuelle</h3><p>Comparer les rendus sur plusieurs écrans et préserver les choix validés.</p></article></div></section>
<section class="section" id="directions" aria-labelledby="directions-title"><div class="section-heading"><p class="eyebrow">Laboratoires publics</p><h2 id="directions-title">Explorer les <span class="accent">directions visuelles.</span></h2><p>Une collection de prototypes statiques ou interactifs, chacun avec son univers distinct.</p></div>
<div class="grid"><article class="tile"><span class="num">01 / PRISM</span><h3>Prism</h3><p>Une expérience éditoriale structurée autour de la typographie et de la composition.</p><a class="cta secondary" href="../../siteforge/">Voir Prism ↗</a></article>
<article class="tile"><span class="num">02 / SIGNATURE</span><h3>Signature</h3><p>Une direction graphique expressive à confronter aux exigences d’un projet réel.</p><a class="cta secondary" href="../../siteforge/signature/">Voir Signature ↗</a></article>
<article class="tile"><span class="num">03 / OPEN FORM</span><h3>Open Form</h3><p>Un laboratoire de formes et d’expérimentation graphique.</p><a class="cta secondary" href="../../siteforge/lab/">Voir le labo ↗</a></article></div></section>
<section class="section" id="parcours" aria-labelledby="parcours-title"><div class="section-heading"><p class="eyebrow">De l’idée à l’interface</p><h2 id="parcours-title">Trois étapes. Un objectif.</h2></div><div class="process"><article><strong>Comprendre</strong><p>Clarifier le besoin et les contraintes.</p></article><article><strong>Prototyper</strong><p>Donner une forme visible au parcours.</p></article><article><strong>Évaluer</strong><p>Vérifier le rendu et l’interaction.</p></article><article><strong>Décider</strong><p>Valider la suite avec le propriétaire.</p></article></div></section>
<aside class="callout"><div><p class="eyebrow">Synestra Studio</p><h2>La forme ne suffit pas.<br>Chaque étape doit être compréhensible.</h2><p>Conception numérique et intégrations sous contrôle, en phase pilote.</p></div><a class="cta primary" href="../connect/">Explorer Connect ↗</a></aside>
</main><footer class="wrap footer"><span>© Synestra Studio · Présentation en phase pilote</span><nav aria-label="Liens secondaires"><a href="../">Studio</a> · <a href="../connect/">Connect</a> · <a href="../bridge/">Bridge</a> · <a href="../offres/">Offres</a></nav></footer>
<script src="../../assets/r191-ambient.js" defer></script></body></html>
"""
# Replace every decorative inline style with an equivalent CSS class.
# Security invariant: keep strict CSP style-src 'self'.
classes=["r191-sf-visual-grid","r191-sf-slab r191-sf-slab-main","r191-sf-caption",
         "r191-sf-symbol","r191-sf-slab r191-sf-slab-side","r191-sf-side-caption",
         "r191-sf-line","r191-sf-line-small","r191-sf-slab r191-sf-slab-empty",
         "r191-sf-slab r191-sf-slab-foot","r191-sf-foot-symbol","r191-sf-foot-copy"]
counter=iter(classes)
siteforge,count=re.subn(r'<(div|span)([^>]*) style="[^"]+"',
    lambda m:'<'+m.group(1)+m.group(2)+' class="'+next(counter)+'"',siteforge)
assert count==len(classes),f"SiteForge inline styles expected 12, got {count}"
assert ' style="' not in siteforge
(preview/"siteforge"/"index.html").write_text(siteforge,encoding="utf-8")
for f in [preview/"index.html",*(preview/s/"index.html" for s in ("connect","bridge","siteforge","offres"))]:
    s=f.read_text(encoding="utf-8")
    assert s.count('r191-system.css')==1 and s.count('r191-ambient.js')==1
    assert s.count("<h1")>=1
    assert 'noindex,nofollow' in s
    print(f.relative_to(base),len(s),hashlib.sha256(f.read_bytes()).hexdigest()[:15])
print("SHARED_AMBIENT_SHA",hashlib.sha256((assets/"r191-ambient.js").read_bytes()).hexdigest())
print("SHARED_STYLE_SHA",hashlib.sha256((assets/"r191-system.css").read_bytes()).hexdigest())
