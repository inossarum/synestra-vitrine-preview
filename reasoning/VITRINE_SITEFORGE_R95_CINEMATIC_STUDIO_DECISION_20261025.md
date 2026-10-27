---
document_id: VITRINE_SITEFORGE_R95_CINEMATIC_STUDIO_DECISION_20261025
document_type: REASONING
status: ACTIVE_MISSION_CHECKPOINT
mission_id: SYN_VITRINE_SITEFORGE_SHOWCASE_20261024
owner: Inos
evidence: evidence/VITRINE_SITEFORGE_R95_CINEMATIC_STUDIO_20261025.json
implementation_head_at_tests: 6b35d03b6d3ab288116956da67cfecbb99a7efb6
publication: HOLD
---

# R95 — Vitrine expressive, marque exacte et Visual Observer

## Intention propriétaire
La vitrine doit être davantage futuriste et vivante, avec plus de mouvements analogues à la première scène orbitale, tout en reprenant la vraie charte du Studio (et surtout **l'icône exacte du plugin Synestra Connect**, non un symbole de remplacement). Les présentations Bridge, Connect et SiteForge sont conservées. L'utilisateur a explicitement demandé d'écrire et tester le code et d'utiliser les outils de visualisation disponibles.

## Delta appliqué
- R95 ajoute sur la branche vitrine PR #5 : balayage radar, doubles points en orbite, halos, reflets mobiles, cadrage HUD, lumière d'en-tête, balayage Bridge, anneau/rotation Connect, détails visuels et reflow responsive.
- Pas de nouvelle dépendance, JavaScript, tracking, Worker, broker, serveur ou système d'identité ; CSS statique. La préférence `prefers-reduced-motion` arrête les nouveaux effets sans masquer le contenu.
- Le logo Web App `synestra-master.svg` a été retrouvé mais **n'est pas prouvé identique à l'icône du plugin Connect** ; il a été retiré de l'affichage (header, scène centrale, interface de démonstration) au profit de libellés typographiques neutres. Le fichier versionné reste pour provenance/rollback, pas comme preuve du logo demandé. **LOGO_EXACT_CONNECT=MANQUANTE.** Ne pas inventer de SVG ou extraire le logo d'un screenshot ambigu.
- Ne pas traiter une simulation Bridge/Connect comme une connexion live.

## Alternatives rejetées
- Présenter le SVG de la Web App comme l'icône officielle du plugin sans preuve : rejeté à la demande du propriétaire.
- Créer un nouveau faux pictogramme « officiel » : rejeté.
- Modifier main/déployer automatiquement Cloudflare ou GitHub Pages : non autorisé.
- Bypasser le refus du média binaire via base64 dans un outil texte : rejeté, refus conservé.
- Associer une validation esthétique au simple succès Chrome/DOM : rejeté ; seuls le rendu moteur, les captures horodatées et les métriques sont établis.

## Validation exacte
Git HEAD de test `6b35d03b6d3ab288116956da67cfecbb99a7efb6`, HTML blob `b84ed4fc1120483b569d7137502cdbad94c0aa01` ; Node 101/101 PASS ; Python 15/15 PASS ; Chrome CDP 390×844 et 1440×900 PASS ; pas d'overflow, FAQ et clavier PASS ; animations cin-radar/cin-connect/cin-glint visibles en CSS calculé, et `reduced-motion` supprime les animations. Web Pilot `ADVISORY_NO_FLAGS`, six appels réels au MCP local PASS. Captures PNG produites sur la machine propriétaire et SHA256 attestés, mais **aucun accès modèle aux octets image** : `MODEL_PIXEL_INSPECTION=NOT_ATTESTED`.

Prévisualisation exacte HTTP 200 par proxy des fichiers publics GitHub (pas une publication officielle) :
https://raw.githack.com/inossarum/synestra-vitrine-preview/6b35d03b6d3ab288116956da67cfecbb99a7efb6/index.html

## Risques, dépendances et récupération
- Le logo officiel Connect reste une dépendance d'identification matérielle. Rechercher la ressource originale à partir du plugin installé ou faire joindre l'asset exact par le propriétaire ; vérifier SHA et droits avant usage. Aucune icône devinée.
- Visual Observer Studio PR #302 ne fournit pas à cet agent de chemin de réponse image natif authentifié : la réussite des contrôles Chrome ne prouve pas une inspection visuelle humaine ou multimodale. Ne pas fusionner ou annoncer un E2E LIVE.
- Le proxy raw.githack est public et tiers, sans ACL Synestra ni garantie de persistance ; ne pas y saisir des secrets.
- Rollback : retrait/revert des commits dédiés sur la branche PR #5 ; conserver PR #3 et le main intacts ; aucune configuration runtime à restaurer.
- Gates avant DONE final : logo original Connect byte-for-byte, revue pixels par agent autorisé, approbation qualité, CI et cible de publication, rollback E2E, décision propriétaire explicite.

NEXT : consolider la PR #5 avec Evidence/Reasoning R95 ; fournir le nouveau lien au propriétaire. Pas de publication sans son autorisation spécifique.
