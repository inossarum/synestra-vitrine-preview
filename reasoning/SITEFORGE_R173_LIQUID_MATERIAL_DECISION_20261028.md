# SiteForge R173 — Courants liquides, deuxième famille énergétique distinctive

MISSION_ID=SYN_SITEFORGE_R173_LIQUID_ENERGY_MATERIAL_20261028
EVIDENCE=evidence/SITEFORGE_R173_LIQUID_MATERIAL_20261028.json
BASE=7634cffef42346d0b5ef0d143f24ad73fcf75c1c

## Intention
Suite à l'accord utilisateur sur la différence visible R172.1, étendre le laboratoire sans toucher à la sphère magnétique appréciée, au comparateur, ni à la vitrine. La roadmap précédente prévoit R173 comme phase des matériaux énergétiques différents.

## Décision de conception
Ajouter en sixième famille `Courants liquides` au sélecteur existant, sans remplacer les cinq familles ni ajouter de 19e contrôle JSON. Côté shader, ajouter un branchement final après `uFlow.x<4.5` (Fusion conservée) et construire une nouvelle géométrie de membranes temporelles `liquidPhase`, `liquidSheet`, `liquidCurl`, `curlingWake`, `liquidEdge`, `liquidRim`, `depthTide`, `travellingCrest`. Aucune coque, texture distante, sprite ni second programme. Un bouton et `?demo=liquid` appliquent 160/180/140 pour rendre la nouvelle famille immédiatement visible. Réduire le bruit dans la vue courante en masquant le texte explicatif A/B quand le mode n'est pas magnétique.

## Qualité visuelle, failure-first
Deux itérations de capture ont montré que des oscillations en profondeur rapides se moyennent en flou durant le ray marching. Correction causale : assurer une cohérence de phase en profondeur (Z faible), densifier des crêtes continues avec ombres séparées. La nouvelle vue présente un courant liquide lumineux clairement distinct des boucles magnétiques. C'est un prototype, pas une approbation esthétique par le propriétaire.

## Vérification et limites
Suite Node: 88/88 PASS. Chrome WebGL SwiftShader: 6/6 familles, 0 erreur GPU, un seul canvas, 18 paramètres, preset liquide 5 valide, bouton de démonstration, comparateur magnétique avant/après 9.95% d'écart de taille PNG compressée, pause/reprise, souris/clavier/tactile, mobile 390px sans overflow. Captures comparables et image liquide enregistrées. FPS GPU physique NON MESURÉS et qualité AAA NON CERTIFIÉE. PBR distinct de ce shader procédural (non applicable ici). Les screenshots ne constituent pas une validation de l'esthétique R173.

## Portée / rollback
Source approuvée bit-identique: `index.html` blob 1413e30138ba1657f7056401818e697ddbd32ac8 ; `assets/siteforge-r116-sphere-only.js` blob dd63d75fdb966de2052595c95b7b6cb736d6c7cc. Aucune mutation de production, aucune fusion main. GitHub branche laboratoire seulement avec SHA parent contrôlé; revenir à 7634cffef42346d0b5ef0d143f24ad73fcf75c1c si nécessaire.
