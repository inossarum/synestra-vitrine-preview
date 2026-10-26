---
document_id: VITRINE_R118_TRIPLE_GYROS_DECISION_20261026
document_type: REASONING
mission_id: SYN_VITRINE_CORE_METALLIC_GYROS_R118_20261026
owner: Inos
tested_code_sha: d311df8347925560a4db1ea661845e3c758176e3
evidence: evidence/VITRINE_R118_TRIPLE_METALLIC_GYROS_20261026.json
status: PREVIEW_PUBLISHED_VISUAL_QA_PENDING
---

# R118 — trois gyroscopes métalliques avec tri tridimensionnel

## Objectif et décision
Épaissir les deux anneaux R117 et ajouter un troisième anneau dans **le shader WebGL existant**, sans second Canvas, second moteur, boucle RAF ni requête réseau. Privilégier un rendu lisible : titane brossé pour A, acier clair pour B, nuance acier/tungstène pour C. Épaisseurs fallback : 4.2→5.8 (+38%), 2.8→3.9 (+39%), nouvel anneau C 3.6. Shader R118 : largeur extérieure de transition 0.027→0.038 pour A, 0.027→0.036 pour B, C 0.034, bords chanfreinés et reflets atténués.

Vitesse : A 13 s, B 17 s en sens inverse, C 20 s ; chaque anneau possède rayon et inclinaison propres. L'alternative « peinture permanente de trois calques dans un ordre A/B/C fixe » est rejetée : chaque fragment effectue exactement trois compare-swap sur les profondeurs z, puis compose de l'arrière vers l'avant. Dans l'aire du noyau, le métal ne passe devant la matière et les 8 arcs que si sa coordonnée z dépasse la surface visible. Le fallback SVG conserve des couches arrière peintes avant le cercle puis trois arcs avant peints après, chacun avec animation autonome et arrêt en mouvement réduit.

## Exécution, contrôles et refus
Base R117 immutable `c47d2cb0463a73e60cc4b866432442301fe45b05`. Premier ancrage CSS non conforme : **refus avant écriture** ; correction ciblée, puis création Git blobs→tree→commit→update_ref avec SHA attendu (sans force). Commit code `d311df8347925560a4db1ea661845e3c758176e3` et trois blobs relus. 49/49 Node PASS, `node --check` PASS, 38 fichiers export PASS par build Cloudflare authentifié. Pages Preview `c063382a-7d50-4250-bec5-c839b7b9a62b` SUCCESS, source associée au commit exact : https://c063382a.synestra-vitrine-preview.pages.dev/ .

Aucun merge direct main, déploiement production, modification IAM ou achat. Le projet Cloudflare conserve `production_deployments_enabled=false`. Preview R117 de comparaison/rollback : https://5ec90946.synestra-vitrine-preview.pages.dev/ .

## Contrôles restant ouverts
La preuve de compilation GPU WebGL1 native, les captures pixels du vrai navigateur et les viewports Chrome/Safari 390/768/1440 sont **NOT_VERIFIED** : l'outil Web n'a pas pu ouvrir l'URL Pages. Un build/HTML/Node PASS ne démontre pas l'occlusion visuelle effective sur écran. Memory V1 / SAL / Runbook non confirmés ; bootstrap Studio `7ea58260-5280-453c-9e79-b62bcf507dba` resté QUEUED, pas considéré comme exécuté. SOURCE_GATE=LIMITED ; VISUAL_PREVIEW_BROWSER=PENDING ; VISUAL_PREVIEW_DIFF_OBSERVED=NOT_TESTED. Ne pas rouvrir les paramètres graphiques tant que le delta actuel n'a pas fait l'objet d'une inspection réelle.

Le prochain contrôle consiste à visiter cette URL immuable sur navigateur autorisé, confirmer visuellement 3 anneaux, rotations, profondeur, lisibilité, fallback et absence de collision avec les capsules produits ; relire Evidence puis autoriser ou non une autre correction selon le constat.
