# R168 — Salle futuriste pour le Core approuvé (maquette uniquement)

MISSION_ID=SYN_VITRINE_R168_ARCHITECTURAL_CHAMBER_PREVIEW_20261027
OWNER=Inos (arbitrage visuel) ; ChatGPT (prototype réversible)
BASE_REVIEW=55b143f6daa72befa95ee4e238d5bac8d7fecfc1
EVIDENCE=evidence/SYNESTRA_R168_ARCHITECTURAL_ROOM_20261027.json

## Demande et correction de trajectoire
Le fond R167, constitué seulement d'une grille et de halos, ne répond pas à l'attente. Le propriétaire demande une véritable pièce futuriste. Les invariants des étapes R164/165 restent non négociables : conserver la sphère approuvée, le diamètre CSS 0,49, sa palette, ses trois liens et le moteur unique.

## Décision de conception
Remplacer le simple fond décoratif par une scène architecturale : salle close en perspective 3D illustrée, plafond nervuré, parois métalliques, panneaux latéraux, alcôve arrière chamfreinée, sol technique et éclairage intégré violet/vert Synestra. Un unique SVG décoratif inerte, sous le canvas WebGL de production existant, est le choix réversible, performant et gratuit. Aucun nouveau renderer, aucune texture distante ni lumière devant l'orbe. Le décor reste statique sur les écrans normaux et en mouvement réduit.

## Isolation
L'index.html officiel et assets/siteforge-r116-sphere-only.js restent inchangés, SHA blob Git 1413e30138ba1657f7056401818e697ddbd32ac8 et dd63d75fdb966de2052595c95b7b6cb736d6c7cc. Le HTML de prévisualisation `vitrine-r168-chamber-preview.html` est dérivé de la page officielle par `r168_build_preview.py` et conserve ses liens relatifs / assets. Aucune modification de production ni de la branche de laboratoire principale.

## QA
Failure-first sur le contrat architectural. Après delta : 74/74 tests Node PASS. Chrome headless ANGLE SwiftShader : desktop 1280px et mobile 390px passent, un seul canvas, gl.getError()=0, 18 contrôles historiques, diamètre inchangé, aucun débordement horizontal. Deux variantes en mouvement réduit : PASS, fallback SVG d'origine inchangé, décor architectural présent. Captures réelles enregistrées dans le commit de revue.

## Conditions de suite
HUMAN_GATE art : seul Inos peut approuver cette salle avant éventuelle intégration. Le prototype R168 peut être visualisé à partir des captures/version GitHub ; aucune publication Cloudflare n'est faite pour ce concept. En cas de rejet, supprimer la branche et laisser la vitrine intacte. Le chantier SiteForge 3D reste indépendant.
