"""Generate a shareable SiteForge 3D catalog from the single WebGL lab implementation."""
from pathlib import Path
from hashlib import sha256
import json,html
root=Path(__file__).resolve().parent.parent
artifact=root/'siteforge-r1884-autonome.html'
digest=sha256(artifact.read_bytes().replace(b'\r\n',b'\n')).hexdigest()
names=[
 ('plasma','Flux plasma','Filaments asymétriques et dérive organique'),
 ('magnetic','Rubans magnétiques','Boucles volumétriques avec crêtes ciselées'),
 ('aurora','Voiles d’aurore','Voiles lumineux translucides'),
 ('nebula','Brume ionique','Nuage énergétique diffus, plus lisible sur petits écrans'),
 ('fusion','Jets de fusion','Éjections et sillons radiaux'),
 ('liquid','Courants liquides','Courants sphériques avec crêtes fluides'),
 ('living','Flux vivants','Tressage tridimensionnel et turbulence interne'),
 ('arcs','Arcs pulsés','Décharges mobiles avec modulation par couches'),
 ('polar','Vortex polaire','Rotation locale et cisaillement dans la profondeur')
]
materials=[dict(id=i,slug=slug,name=name,description=desc,preview=f'siteforge-r1884-autonome.html?demo=energy&material={i}', controls=['count','spread','pulseSpeed','pulseIntensity','turbulence','diameter','mouse','palette','flowStructure']) for i,(slug,name,desc) in enumerate(names)]
registry=dict(schema='synestra.siteforge.3d-material-catalog.v1',engine='siteforge-plasma-webgl1',release='R188.4-development',artifact='siteforge-r1884-autonome.html',artifact_sha256_lf=digest,materials=materials,compatibility='Existing IDs 0..6 preserved, new IDs 7 and 8; optional energyDynamics JSON v1 unchanged',external_dependencies=[])
(root/'siteforge-materials-r1884.json').write_text(json.dumps(registry,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
cards=[]
for m in materials:
 i=m['id'];name=html.escape(m['name']);desc=html.escape(m['description']);url=html.escape(m['preview'],quote=True)
 cards.append(f'<article><div class="mark">#{i:02d}</div><h2>{name}</h2><p>{desc}</p><a href="{url}" aria-label="Ouvrir le matériau {name} dans le laboratoire">Ouvrir dans le Labo 3D ↗</a></article>')
page='''<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>SiteForge — Bibliothèque de matériaux 3D R188.4</title><style>
:root{color-scheme:dark;font-family:system-ui,-apple-system,sans-serif;background:#050b18;color:#ebf6ff}
*{box-sizing:border-box}body{max-width:1220px;margin:0 auto;padding:clamp(18px,3vw,38px)}
h1{font-size:clamp(1.6rem,3vw,2.6rem);margin:0 0 12px}p{line-height:1.5;color:#afc6da}
header{padding:22px 0 30px;border-bottom:1px solid #243e54}
header p{max-width:820px} .meta{color:#70d7e8;font-size:.82rem;text-transform:uppercase;letter-spacing:.13em;font-weight:700}
.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin:30px 0}
article{border:1px solid #28435c;border-radius:18px;padding:23px;background:radial-gradient(ellipse at 82% 0%,#123650 0%,#0b182b 55%,#091322 100%);min-height:224px;display:flex;flex-direction:column}
article:nth-child(3n+2){background:radial-gradient(ellipse at 82% 0%,#382048 0%,#171426 55%,#091322 100%)}
article:nth-child(3n){background:radial-gradient(ellipse at 82% 0%,#233b3d 0%,#101d2b 55%,#091322 100%)}
.mark{font-variant-numeric:tabular-nums;color:#63d7e5;font-size:.78rem;letter-spacing:.1em}
h2{font-size:1.16rem;margin:13px 0 4px}article p{font-size:.94rem;flex:1}
a{color:#8be8ff;text-decoration:underline;text-underline-offset:3px;font-weight:650}
footer{color:#839cae;font-size:.82rem;margin-top:28px}
@media(max-width:860px){.grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:570px){.grid{grid-template-columns:1fr}article{min-height:184px}}
</style></head><body><header><div class="meta">SiteForge • Bibliothèque 3D • R188.4</div><h1>Neuf matières, un moteur énergétique.</h1><p>Chaque matériau utilise les mêmes commandes de densité, nombre, espacement, intensité, vitesse, turbulence, diamètre, couleurs et souris. Ouvre la matière voulue dans le laboratoire ; les liens sont reproductibles et partageables.</p></header><main class="grid">'''+''.join(cards)+'''</main><footer>Prévisualisation privée — un unique moteur WebGL1. Les fichiers JSON historiques restent compatibles. <a href="siteforge-materials-r1884.json">Manifeste des matériaux</a>.</footer></body></html>'''
(root/'siteforge-catalogue-r1884.html').write_text(page,encoding='utf8')
print('CATALOG_PASS',len(materials),'HTML_SHA',digest)
