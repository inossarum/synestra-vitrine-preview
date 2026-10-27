# R169 — Salle Synestra : relief architectural et matériaux visuellement plus élaborés

MISSION_ID=SYN_VITRINE_R169_ADVANCED_INDUSTRIAL_CHAMBER_20261027
SOURCE=R168@9f160142d13b02a80b624ae96b06259e931192b3
EVIDENCE=evidence/SYNESTRA_R169_ADVANCED_CHAMBER_20261027.json
OWNER=Inos (arbitrage esthétique) ; ChatGPT (prototype de revue)

## Besoin et diagnostic de R168
L'architecture R168 prouve la profondeur de la salle mais ses parois sont encore des contours plats et simplistes. La capture utilisateur sert de référence réelle. Prioriser le relief, le langage de matière et la densité technique plutôt que d'augmenter la sphère ou d'ajouter des effets énergétiques.

## Décisions de conception
Repartir du SVG technique isolé R168 et renforcer par couches structurées les biseaux métalliques, l'alcôve du réacteur, les panneaux latéraux symétriques, les consoles arrières, les modules de plafond, les grilles de ventilation, le sol en dalles et un socle. Multiplier les gradients métalliques et détails de fabrication limités, avec éclairages indirects Synestra vert/violet sans ajout de lumière envahissante au centre. SVG/CSS statique réversible ; un seul canvas WebGL R164 conservé.

L'effet métallique est une **approximation SVG** (gradients, motifs), pas une texture PBR réelle ni un objet 3D interactif. La future amélioration de réalisme pourrait nécessiter une variante de laboratoire 3D avec textures PBR ; elle est hors du périmètre R169.

## Sécurité et invariants
La page d'accueil validée et le moteur officiel n'ont aucun delta et leurs blobs sont vérifiés : index.html 1413e30138ba1657f7056401818e697ddbd32ac8 ; assets/siteforge-r116-sphere-only.js dd63d75fdb966de2052595c95b7b6cb736d6c7cc. La prévisualisation est une page dérivée, sur branche Git distincte. Diamètre .49, 18 réglages et trois liens produits inchangés ; aucune publication production/main.

## Validation
Tests failure-first, puis 78/78 contrats Node PASS ; Chrome desktop 1280 et mobile 390 WebGL getError 0, un seul canvas, 18 contrôles et diamètre inchangé. Deux modes mouvement réduit desktop/mobile PASS. Captures de preuve versionnées séparément. FPS GPU physique non mesuré ; acceptation esthétique du propriétaire PENDING.

## Reprise
La branche R169 peut être éliminée sans rollback du site. Si l'esthétique est validée, proposer **une intégration séparée** dans la branche de vitrine après nouveau gate autorisé ; ne jamais fusionner ce prototype directement dans la production.
