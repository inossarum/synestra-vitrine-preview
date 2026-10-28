# SiteForge R185 — Direction artistique contrôlée A / B / C

## Intent fidelity / mission

Après la correction du shader R184, l'objectif est de **verrouiller la direction artistique** avant de multiplier les fonctionnalités du labo 3D : rendre trois compositions comparables sur une sphère identique, puis collecter l'acceptation esthétique. L'utilisateur a demandé « allez » en réponse à cette étape de roadmap.

Références : la forme plasma approuvée ne doit pas être remplacée ; couleurs officielles cyan/violet, sphère volumétrique avec noyau ; image utilisateur R183 rejetée à cause de carrés opaques, cause et correction R184 conservées. Interdits : effet de tempête, clignotement artificiel, carrés 2D, change caméra ou vitesse entre variantes, substitution d'images synthétiques aux captures du vrai moteur.

## Implémentation et décisions

R185 crée trois boutons accessibles et versionnés, simples **recettes utilisant les dix réglages GPU existants** :
- A *Plasma pur* : `enabled=false`, `moteCount=0`.
- B *Énergie organique* : `shape=2` orbes doux, `count=28`, `distance=20`, `spread=34`, `size=78`, `brightness=90`.
- C *Cristaux premium* : `shape=1` facettes, `count=14`, `distance=38`, `spread=24`, `size=88`, `brightness=78`, `roughness=30`, `reflectivity=120`.

Les trois variantes utilisent **exactement la même matière plasma, les mêmes couleurs plasma, le même temps de simulation et la même caméra**. Aucun nouveau contexte WebGL, aucun 19e contrôle plasma, aucun 11e réglage mote ; le format JSON v1 reste inchangé. Les modifications manuelles des éclats et l'import JSON replacent l'étiquette en mode personnalisé, sans supprimer la recette de départ. Le reset renvoie aux défauts de R184.

Les captures d'acceptation ont été prises depuis Chrome à `particleSpeed=0`, angle constant et matériau magnétique identique. Deux critères : image A≠B, image B≠C, et les trois possèdent exactement les mêmes `parameters` et la même phase.

## Vérification locale

- **164/164 tests Node PASS**.
- Build statique : 49 fichiers de l'allowlist PASS.
- Chrome Windows WebGL, E2E complète **exit 0** : six matériaux, 390px mobile, souris/tactile, rotation 360°, import/export JSON rétrocompatible, zéro erreur WebGL.
- A ↔ B : 297 pixels différents sur 307 840 ; B ↔ C : 806 pixels. La variante B initiale était trop peu lisible (54 pixels contre A) ; ses paramètres ont été ajustés avant cette validation, sans artifices.
- Captures réelles : `r185-art-pure.png`, `r185-art-organic.png`, `r185-art-crystal.png`. Les trois ont été consultées visuellement : A plasma lisible, B points lumineux éloignés, C cristaux rares, aucun bloc opaque.

## Périmètre / statut

Source candidate : `task/SYN_SITEFORGE_R185_ART_DIRECTION_20261028` issue de R184 SHA `b72401b247ea01489797dabb1a4d80f6d9899d5c`. Livraison versionnée isolée `r185.html` sur Pages du laboratoire ; `main` inchangé et R184 récupérable. Rollback par retrait du seul `r185.html`.

État au premier checkpoint : LOCAL E2E PASS, PUBLIC E2E PENDING, VALIDATION ESTHÉTIQUE OWNER PENDING. Ne pas annoncer une industrialisation AAA tant que la direction n'est pas sélectionnée.

## Point d'attention

La composition B reste discrète volontairement : l'augmentation de la taille et du nombre peut devenir artificielle. Le vrai prochain chantier R186 (géométries 3D instanciées) doit partir de la composition choisie, pas du principe qu'il faut toujours plus d'éclats.

## Qualification publique finale — 2026-10-28

- R185 publiée sous https://inossarum.github.io/synestra-siteforge-r176-lab/r185.html, HTTP 200, pas de Cloudflare Access, Pages commit `96ad88fb07c7dc390540d1c4e1a06262830303bd`.
- Browser Chrome **sur l'adresse GitHub Pages réelle**, processus exit 0 : contrôle des trois presets, 6 matériaux, 390 px mobile, souris/tactile, orbite 360°, phase de rotation commune, JSON v1 rétrocompatible et WebGL sans erreur.
- Compositions A/B/C capturées avec **même caméra, matériau, couleur plasma et phase figée**. Pixels différents : A↔B 259/307840, B↔C 784/307840. Les trois images publiques sont archivées sur le commit source `45cb721491e28e72016df8c67b217813d0ba129c` :
  - `r185-public-art-pure.png`
  - `r185-public-art-organic.png`
  - `r185-public-art-crystal.png`
- 164/164 tests Node PASS, export statique 49 fichiers PASS ; tests locaux et publics complets exit 0 ; les anciennes versions restent intactes, production `main` inchangée.
- Evidence finale : `evidence/SITEFORGE_R185_ART_DIRECTION_20261028.json` blob `a9c73d403cabe137ad2e044077aadbbc2938985e`.
- **Statut de validation** : technique pour prévisualisation R185 = PASS ; approbation artistique du propriétaire = PENDING. R186 (vraies géométries 3D instanciées) ne doit pas être confondu avec l'ajout prématuré de détails sans choix d'une direction.
