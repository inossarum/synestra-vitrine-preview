# R202.61 — Géométrie des six flux centre→nœuds et hypothèse d'occlusion

Date : 2026-11-04 | Mission : labo3d_sphere_r20261 | Statut : ANALYTIC_DIAGNOSTIC_PASS / GPU_STENCIL_PROOF_PENDING

## Provenance / SOURCE GATE
- Branche de recherche isolée `task/SYN_LAB_R20261_NODE_STREAM_ROOT_ALPHA_20261104`, HEAD exact avant cette Evidence : `df0c7d1cb76650f689356c587bc63d6274e78e7a` ; comparaison GitHub base/branch `identical`, avance=retard=0.
- Source géométrique lue dans GitHub : `lab-babylon/src/core-shell-flow.mjs` (blob Git `5dab6252a0569469fdc485a9088613769cf93e1b`).
- Source scène / rayon / six directions : `lab-babylon/src/main.js` (blob Git `893de7af2beaad6871a2c317ba06e381200a90ed`).
- Source alpha et stencil : `lab-babylon/src/plasma-ribbons.js` (blob Git `55b9408363e974554cbbefd320d24a8dd29e4365`).
- Contrôle de validation antérieur : `evidence/R20261_NODE_ROOT_GPU_REJECT_20261104.md` (blob `c7a333034db1b9ca431abd8ae090fe1fb16230c4`).
- Snapshot Central Skills : `a2d091230e10b2212e91d155260dd506849d3da1`, `fast-path-delta-only@1.0.0#9f47cb553dcc1bb285af1646d60c12b8e71d6c3d`, `reasoning-evidence@1.0.0#b1d95e26cddce504adcbb0ba69d7c4ca36990836`, `visual-regression-testing@1.0.0#aa98fffe9149dfcc0e153f0d1b8b91f3c0a6b4ae`.
- Le lancement groupé du contrôle Windows a reçu POLICY_DENIED dans cette reprise. Aucun retry équivalent ni contournement ; le présent calcul utilise exclusivement les équations publiques du dépôt en mémoire et ne constitue PAS une capture GPU.

## Méthode mathématique, reproductible
- Échantillons : `sampleCoreShellFlow(index,time,nodeDirections,segments=72)` pour six indices 0…5, utilisant exactement les six directions de `main.js`.
- `u=k/72`, rayon nominal `0.085+(1.53-0.085)*u`. Déformation latérale et verticale de la source conservées dans le calcul vectoriel ; rayon réel = norme du vecteur 3D.
- Rayon de l'IcoSphere du noyau : `0.38`, subdivisions 2, 80 triangles. Rayon inscrit du modèle d'icosaèdre régulier de même rayon, comme borne conservatrice de construction : `0.38*sqrt((5+2*sqrt(5))/15)=0.30196869947`. Ce calcul analytique ne remplace pas la géométrie raster réelle.
- Instants indépendants étudiés : `t=[0,0.3,1,4,18]`. Ne pas confondre ces instants géométriques avec une capture réelle à la frame 18.
- Le profil `fade=clamp(sin(pi*u)*3.2,0,1)` atteint son plateau à `u=asin(1/3.2)/pi = 0.1011664270`, soit à partir de l'index 8.
- Le correctif rejeté `rootGlow=.90*(1-u)^4` agit seulement sur les six flux `index>=100` avant plafonnement du fade. Dès le franchissement `r>=.38` (index 15, u=.20833), l'alpha de base est déjà plafonné ; la somme `baseFade+rootGlow` est elle aussi plafonnée à 1.

## Résultats analytiques : toutes les six directions
| t | Points/flux sous r=0.30 | Points/flux sous r=0.38 | Premier point au-dessus r=0.38 | Index de saturation alpha |
|---:|---:|---:|---:|---:|
| 0 | 11 sur 73 | 15 sur 73 | 15 | 8 |
| 0.3 | 11 sur 73 | 15 sur 73 | 15 | 8 |
| 1 | 11 sur 73 | 15 sur 73 | 15 | 8 |
| 4 | 11 sur 73 | 15 sur 73 | 15 | 8 |
| 18 | 11 sur 73 | 15 sur 73 | 15 | 8 |

Au temps t=0, le rayon du premier point externe pour les six flux vaut respectivement 0.39301 / 0.39055 / 0.39103 / 0.39346 / 0.39063 / 0.39114, et les alphas de base du rail central sont 0.66110 / 0.66288 / 0.66523 / 0.65854 / 0.60370 / 0.65392.

## Constat et portée
1. Il est confirmé analytiquement que le changement de fade à l'extrémité initiale porte principalement sur le tronçon compris dans le rayon du noyau ; lorsque les lignes franchissent le rayon .38, le fade de base est déjà saturé.
2. Le stencil des six clones de premier plan vaut EQUAL=1 ; il n'est dessiné que sur la projection réelle de la silhouette raster du noyau, et le test de profondeur peut masquer des fragments en arrière. Groupes de rendu : core=1 ; depth mask=2 ; foreground stream=3 avec conservation du depth/stencil.
3. L'expérience native GPU antérieure avec rootGlow +0.90 avait déjà un léger gain d'edge-gradient (+0.070 à +0.083), mais moins de 0.30 % de pixels centraux changés sur chaque mode : REJECT conservé.
4. Ce modèle n'apporte pas la preuve que 11 ou 15 fragments sont effectivement rejetés par la depth/stencil GPU : il compte des **points 3D de centreline**, pas des fragments/triangles rasterisés. Les facettes exactes, la largeur des rails, les groupes de transparence et les pixels GPU restent non mesurés.
5. Ne pas supprimer/modifier depthMask, désactiver stencil, rejouer le test orbital préalablement refusé, ou promouvoir une modification artistique sans nouveau périmètre autorisé. Aucun shader, ZIP ou runtime n'a été modifié dans cette reprise.

## Décision et suites
Diagnostic géométrique : PASS (bornes stables sur six flux × cinq instants). Cause plausible de l'inefficacité de rootGlow mieux caractérisée : alpha déjà saturé au sortir du noyau ; l'augmentation à l'origine affecte surtout les segments internes.
`GPU_DEPTH_FRAGMENT_E2E=NOT_EXECUTED`, `ART_SIGNOFF=PENDING`, `SOURCE_GATE=LIMITED`, `HOOKS_STATUS=UNKNOWN`, `FUNCTION_REPORT=PARTIAL`.
NEXT si l'autorité d'exécution redevient disponible : test read-only de visibilité réelle des six flux au voisinage de la silhouette avec masque inchangé et mêmes captures de référence ; évaluer la continuité ligne/nœud et le contraste dans les quatre modes sans nouvelle mutation initiale.
