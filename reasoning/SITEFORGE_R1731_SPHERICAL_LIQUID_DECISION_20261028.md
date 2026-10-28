# R173.1 — Correction de la cohérence sphérique des courants liquides
MISSION_ID=SYN_SITEFORGE_R1731_SPHERICAL_LIQUID_REPAIR_20261028
EVIDENCE=evidence/SITEFORGE_R1731_SPHERICAL_LIQUID_20261028.json

## Cause et corrections
La capture utilisateur R173 montre une vague isolée et un fragment flottant. Le matériau liquide utilisait surtout un champ q.y; son intégration volumétrique le projetait en une unique membrane. Une première correction avec quatre harmoniques angulaires a produit une hélice régulière (capture Chrome rejetée). La seconde conserve quatre flux à 360° et les courbe par modulation XYZ basse fréquence et profondeur, générant une silhouette réellement sphérique avec filaments rattachés au noyau.

## Garde-fous et vérifications
Le moteur magnétique R172.1, son comparateur, les 18 champs JSON, le moteur officiel et la page vitrine restent inchangés. Tests 90/90 PASS, Chrome WebGL 6/6, zéro erreur, caméra souris/tactile, pause et reprise, mobile. GPU physique non mesuré. L'amélioration est une maquette visuelle, pas une approbation esthétique humaine.

## Publication et reprise
Branche locale task/SYN_SITEFORGE_R1731_SPHERICAL_LIQUID_20261028 issue de R173 f0ba722f235cbd4a1a32e1018672e8d2f366118a. La publication GitHub R173 avait rencontré un refus POLICY_DENIED pour create_blob; ce tour n'essaie pas de le contourner. Lien local vérifiable sur Inos-Cerebros : file:///I:/_STUDIO_STAGING/siteforge_r173_lab_20261028/siteforge/core-3d-lab/index.html?demo=liquid. Pas de Cloudflare ni de main.
