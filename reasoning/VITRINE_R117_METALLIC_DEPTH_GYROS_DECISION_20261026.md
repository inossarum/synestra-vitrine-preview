---
document_id: VITRINE_R117_METALLIC_DEPTH_GYROS_DECISION_20261026
document_type: REASONING
mission_id: SYN_VITRINE_SITEFORGE_SHOWCASE_20261024
owner: Inos
status: PREVIEW_48_48_BROWSER_VISUAL_PENDING
tested_head: 296ed3fd8887502870b03db1299da591039781dc
evidence: evidence/VITRINE_R117_METALLIC_DEPTH_GYROS_20261026.json
---
# R117 — Core métallique tridimensionnel, anneaux avant/arrière

La demande est de poursuivre le raffinement du Core, jugé encore brouillon, en ajoutant des anneaux métalliques animés qui **passent réellement devant le noyau** comme dans l'illustration de référence. Réutilisation de la vitrine R116, branch PR #5, aucune nouvelle démo ni composant applicatif.

## Options et décision
Un empilement de simples couches CSS au-dessus de la sphère aurait produit un faux anneau avant permanent, masquant artificiellement les arcs. Cette approche est rejetée. Pour le navigateur WebGL, choix de deux anneaux comme **cercles 3D inclinés** : la normale de leur plan tourne avec le temps et le fragment shader calcule l'intersection du rayon écran avec chaque plan (coordonnée z). En dehors de la projection du globe, les deux anneaux se mélangent selon leur profondeur ; dans la sphère, seul le métal situé au-dessus de la surface visible est composité après la matière/plasma. Ainsi un même anneau possède naturellement une portion avant et une portion arrière. Pas de nouveau canvas, requête, boucle rAF ni contrat réseau. Couleurs retenues : titane brossé / acier clair, sans halo excessif.

En fallback SVG, deux ellipses métalliques sont peintes **avant** le cercle du noyau et leurs arcs avant **après** le cercle ; leur rotation est synchrone par classe/axe. Cela représente correctement la profondeur lors de l'affichage dégradé, sans prétendre fournir une simulation 3D native. Le mode reduced-motion gèle les rotations dans une position statique élégante.

Les huit décharges radiales (cycle 1.12s), la taille .49, les trois vraies capsules Connect/Bridge/SiteForge, les liens produit et l'ambiance autonome des autres pages restent. L'ancien anneau lumineux GLSL plat est retiré pour réduire le bruit. Gradient métallique SVG inclus dans le HTML local, pas de fausses images de marque.

## Preuve de livraison et limites
Git commit SHA `296ed3fd8887502870b03db1299da591039781dc` avec 3 fichiers, blobs SHA relus ; Cloudflare Pages preview `5ec90946-ba19-4cb5-910b-ff5526081695`, déployé sur SHA exact : **48/48 tests Node PASS, static export 38 fichiers PASS, déploiement stage SUCCESS**. URL exacte : https://5ec90946.synestra-vitrine-preview.pages.dev/ . Production désactivée et main inchangée. Rollback : https://10d72a08.synestra-vitrine-preview.pages.dev/ .

La compilation graphique WebGL sur iOS/Safari, la précision physique de l'anneau à l'écran, ses performances GPU et la vérification pixel en navigateur restent non attestées, l'outil web n'ayant pas accès au domaine pages.dev. Tests sources ne remplacent pas les pixels réels. NEXT : inspection de la nouvelle preview sur appareil propriétaire, correction strictement bornée en cas de régression. `VISUAL_QA=PENDING` ; `FUNCTION_REPORT=PARTIAL` (E2E), bien que le déploiement preview soit PASS.
