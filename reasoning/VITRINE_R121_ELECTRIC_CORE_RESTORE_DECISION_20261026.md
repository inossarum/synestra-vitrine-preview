# R121 — restaurer le vrai Core électrique, retirer la 3D non validée

MISSION_ID=SYN_VITRINE_CORE_RESTORE_R121_20261026
CODE_SHA=1f5264fcd58c1327e415d4bffc468babd0c7f56a
BASELINE_VERIFIED=b602b60755bd31e3645045116ef2f0946c48c712
PREVIEW=https://e7b565f0.synestra-vitrine-preview.pages.dev/

## Faits et décision
Le screenshot transmis par l'utilisateur depuis iPhone prouve que l'expérience R120 affichait un SVG décevant : anneaux plats, sphère en gradient et décharges minimales; le rendu demandé n'était pas livré. Cause exacte du fallback WebGL INCONNUE (reduced motion, contexte WebGL indisponible, compilation ou autre). Le test Node 51/51 de R120 ne validait pas le shader sur GPU, et le prototype image n'était pas une maquette WebGL exécutable.

R119 reste disponible au commit ca3f2401edf624a4bd284777ff20ed32b0cb1716 et contient effectivement les 8 arcs, mais conserve les trois bandes métalliques rejetées. R116 b602b60755bd31e3645045116ef2f0946c48c712 est la dernière base sans gyros; sa sphère à plasma, son shader WebGL animé, ses 8 décharges radiales et son orbital discret sont restaurés. La base WebGL ancienne est inchangée exactement au blob d78d7222a95fd080a408bba2237dd3b9dda05bd7. Ajout borné sur SVG fallback : huit décharges étagées et source énergétique centrale; activité réduite en mode reduced-motion.

## Publication et limites
Branch task/SYN_VITRINE_SITEFORGE_R91_PREVIEW_20261024, PR #5 DRAFT, aucun changement main. Cloudflare Preview id e7b565f0-3b1f-48cc-b996-419a46d4b9e1 : deploy/success, SHA 1f5264fcd58c1327e415d4bffc468babd0c7f56a, 47/47 Node PASS, export PASS (38 fichiers). Real browser iPhone et GPU GLSL : PENDING; ne jamais annoncer VISUAL_GATE=PASS sans examen des pixels réels. FREE_ONLY.

## Leçon de conception réutilisable
Une image photoréaliste synthétique est une **référence esthétique**, pas un artefact 3D ni une preuve d'intégration GPU. Ne plus promettre sa fidélité à partir de tests statiques. Pour une future 3D réellement fidèle, qualifier d'abord un prototype WebGL dans le navigateur cible avec géométrie/éclairage réels et une capture validée, puis appliquer la variation sur la vitrine; éviter l'itération aveugle de shaders et le glissement de périmètre. Priorité actuelle = stabiliser la sphère électrique restaurée.

## Première action suivante
Faire tester le nouveau lien sur l'iPhone avec capture; vérifier WebGL et reduced-motion en browser QA autorisé, et comparer aux attentes. Ne pas réintroduire les anneaux avant demande nouvelle et validation visuelle.
