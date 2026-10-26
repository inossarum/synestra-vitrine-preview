# R120 — anneaux rectangulaires 3D et origine électrique (2026-10-26)

MISSION_ID=SYN_VITRINE_CORE_R120_FLAT_RINGS_CENTRAL_SOURCE
OWNER=Synestra Vitrine preview, PR #5
CODE_SHA=fac1f3e535c25631272f50f7a454adee0ef22d13
DEPLOYMENT_ID=d165d6d1-a6e7-4b9b-ad98-d2d66f5a31e1
PREVIEW_URL=https://d165d6d1.synestra-vitrine-preview.pages.dev/

## Décision appliquée
Remplacer l’ancienne projection d'anneaux 2D par trois volumes métalliques à **section rectangulaire** avec léger chanfrein, sans tubes. Pour chaque anneau, une rotation de Rodrigues sur son propre axe définit un repère local; un rayon orthographique borné (44 itérations max) intersecte le volume SDF. Le point d'intersection fournit sa vraie profondeur z et les normales de faces/chanfreins pour éclairage. Le tri profondeur/fond et le masquage par la sphère sont conservés.

Les demi-largeurs radiales sont 0.037/0.036/0.034, les demi-épaisseurs axiales 0.027/0.026/0.025. Le rendu doit ressembler au prototype approuvé, avec anneaux moins larges; **équivalence visuelle non encore prouvée**.

Le centre énergétique devient une source blanc-bleu pulsant lentement. Huit décharges sont générées depuis l'origine commune; leur instabilité latérale est annulée à l'origine, et leur intensité y est renforcée. Le SVG statique accessible en mode reduced-motion montre une source et des décharges ancrées au même centre.

## Alternatives rejetées
- L'ancien disque/ruban 2D projeté : absence de faces et de profondeur réelle.
- Le tore à section circulaire (tube) : contraire à la demande.
- Nouveau service ou dépendance GPU : inutile pour ce delta.
- Modification directe main ou mise en production : hors périmètre.

## Preuve et limites
Git code fac1f3e535c25631272f50f7a454adee0ef22d13 confirmé par PR #5 HEAD puis Pages Preview id d165d6d1-a6e7-4b9b-ad98-d2d66f5a31e1, état deploy/success, environnement preview et SHA correspondant; 51/51 Node PASS, export PASS (38 fichiers). Ces tests ne prouvent ni exécution GLSL sur GPU ni rendu navigateur. Le lecteur externe n'a pas pu ouvrir le lien depuis son environnement; statut navigateur PENDING, pas de faux PASS.

La publication Preview autorisée n'est pas une publication production. FREE_ONLY, noindex, CSP, fallback SVG et reduced-motion conservés. Aucune mutation du Studio/Bridge.

## Reprise et rollback
Première action : ouvrir cette Preview dans Chrome autorisé, inspecter à 390×844 et 1440×900, vérifier la console WebGL, le noyau-source, le passage devant/derrière, le nombre de 3 anneaux et la performance. Si le shader échoue ou les anneaux sont insuffisants, corriger sur la branche Preview seulement avec test failure-first. Rollback non destructif vers le SHA pré-R120 f25d5c1518e82d52e3ad57f075e766cdd3b8d870 après contrôle de lease.

Note de reprise : les plugins **Synestra Connect, GitHub et Cloudflare ont été effectivement accessibles et invoqués** dans cette session via les plugins ChatGPT. Ne jamais conclure à leur absence sans découverte; revalider leur disponibilité à chaque session. Connect Central Skills ui-ux@1.0.0, visual-regression-testing@1.0.0, web-accessibility-engineering@1.0.0 consultés (advisory uniquement).
