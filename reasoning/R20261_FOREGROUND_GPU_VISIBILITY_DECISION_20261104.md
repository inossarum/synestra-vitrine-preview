# R202.61 — PREVISE après visibilité native des six clones

Date : 2026-11-04 | Mission : labo3d_sphere_r20261
Evidence : evidence/R20261_NODE_FOREGROUND_VISIBILITY_GPU_20261104.json et evidence/R20261_FOREGROUND_VISIBILITY_GPU_DIAGNOSTIC_20261104.md.
Base officielle inchangée : 3ec0188afa415e1e9eb4b124e999f920eb5bc382.

## Diagnostic
Au viewport et frame fixes, retirer les six clones de premier plan modifie 894–903 pixels centraux au seuil strict >4 RGB (7.39–7.47 % de la ROI core). Le clone 1 seul explique pratiquement tout ce delta central ; les cinq autres clones ont core=0 pixel Δ>4. Ces observations sont réelles sous RTX3090. Cela ne signifie pas que les cinq chemins n'existent pas, ni que le stencil est la cause exclusive : la caméra, profondeur et alpha/perception peuvent contribuer. La mesure est screen-space, pas un compteur de fragments GPU.

## Échec de stabilité
La baseline-retest de trois modes est pixel-identique à toutes les ROI ; le mode 2 présente uniquement trois pixels périphériques de dérive >4 RGB. Le protocole initial exigeait zéro pixel sur toutes les ROI et a correctement conclu FAILED_DIAGNOSTIC ; ne pas réétiqueter ni réduire le seuil pour afficher PASS. Le résultat noyau/anneau reste reproductible et utilisable pour choisir le prochain diagnostic, pas pour promouvoir un art.

## Décision indépendante
1. REUSE_FIRST : garder les bundles source et ZIP officiels ; ne pas réimplémenter le traitement alpha des six flux, qui avait déjà échoué au seuil visuel.
2. Étape distincte la plus informative : isoler physiquement l'effet depth contre stencil via un protocole de visibilité/occlusion dans une page de test autorisée, en préservant le masque de production ; fixer des seuils et captures déterministes AVANT le contrôle, puis répéter en modes 0–3.
3. Si aucun accès à ce protocole n'est attesté, produire uniquement un diagnostic analytique de la caméra et des directions des six nœuds avec les blobs SHA connus, sans prétendre à l'E2E.
4. Le shader du noyau et la distribution des flux ne doivent pas être changés sur la seule base d'un chiffre screen-space. Les variantes uniformes précédemment rejetées le restent.
5. Le fichier graphique candidat du 29 octobre (Library Synestra) correspond visuellement à la direction approuvée, mais ses octets n'ont pas été vérifiés. ART_SIGNOFF final reste PENDING.

## Limites
Provenance de la source commerciale : GitHub isolé ; règles et skills SHA vérifiés. Statut HPSYN observé : mission BLOCKED sur préconditions internes malgré disponibilité des outils directs. Doctor/PREVISE méthodologies appliquées, aucun moteur autonome nouvellement invoqué.
No deployment / no PAYG / no merge main. FUNCTION_REPORT=PARTIAL.
