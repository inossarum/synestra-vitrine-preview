# R172 — Rubans magnétiques: profondeur sans dénaturer la sphère

MISSION_ID=SYN_SITEFORGE_R172_MAGNETIC_RIBBONS_20261027
SOURCE_BASE=94bbf457f6ce0568918e87261f92bec3e38730fe
EVIDENCE=evidence/SITEFORGE_R172_MAGNETIC_DEPTH_20261027.json
OWNER=Inos (validation de la sphère R171), ChatGPT (delta expérimental R172)

## Priorité visuelle
Le propriétaire a explicitement apprécié le matériau « Rubans magnétiques » de R171, qu'il décrit comme une vraie sphère d'énergie. Ne pas interpréter cette demande comme une autorisation de réinventer la silhouette du Core, son noyau ou la vitrine. La capture indique émission 200%, puissance noyau 211%, largeur courants 166%. La référence et la candidate R172 sont enregistrées sous les mêmes dimensions et mêmes réglages, vitesse figée pour comparaison.

## Décision DELTA_ONLY
Modifier UNIQUEMENT la branche magnétique uFlow.x<1.5 du shader de laboratoire existant. Conserver exactement le champ principal de grandes boucles courbes (harmonique polaire 4). Ajouter un modulateur proche/lointain (depthRibbon), une tresse fine très minoritaire attachée au ruban principal (harmonique entière 8), et une petite variation de brillance spatiale. Ne pas ajouter de couche, coque, sprite, shaders supplémentaires ni changer les quatre autres matériaux. Conserver le noyau et les 18 réglages du format JSON.

## Tests / limites
Failure-first sur les nouveaux contrats ; 82/82 tests Node PASS. Chrome réel avec WebGL SwiftShader : 5/5 matériaux, erreur GPU 0, un canvas, même cadrage. Pause/reprise, rotation souris/tactile/clavier et mobile 390 px passent. Les captures de R171 et R172 aux réglages de la capture utilisateur montrent des différences visuelles volontairement modestes et la silhouette reste sphérique.
Mesure quantitative pixel non réalisée : Pillow absent sur hôte distant ; le contrôle visuel et les tests logiciels ne certifient ni FPS GPU physique ni acceptation esthétique propriétaire.

## Continuité
La vitrine demeure bit-identique (index 1413e30138ba1657f7056401818e697ddbd32ac8 ; JS approuvé dd63d75fdb966de2052595c95b7b6cb736d6c7cc). GitHub branch preview seulement, sans main ni Cloudflare production. Test le HTML de laboratoire avant toute future intégration; rollback R171 94bbf457f6ce0568918e87261f92bec3e38730fe.
