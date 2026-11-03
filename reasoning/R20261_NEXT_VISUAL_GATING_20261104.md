# R202.61 — PREVISE / FAST : décision après essais des voiles internes
Date 2026-11-04 ; scope sphère Babylon exclusivement. Base validée dd2b0f1eecf3e2782d750df7e4dea811ed285a8d.
Evidence : evidence/R20261_MIST_OPACITY_AND_WIDTH_GPU_FAILURE_20261104.md et evidence/R20261_MIST_AB_FAILED_GATES_20261104.json.

## Décision
REJECT A (réduire alpha des voiles) : peu d'effet visuel et baisse de luminance et du caractère violet du noyau.
REJECT B (rétrécir les voiles) : effet pixel mesurable mais contraste +0.093 / +0.063 < critère +0.10 pour les deux modes et réduction de diffusion. Ne pas réinterpréter le seuil après avoir observé le résultat.
RESTORE les modifications techniques sans promouvoir aucun code ; conserver les diagnostics vérifiés et les limites.

## Hypothèse de recherche suivante
Le rapport d'occlusion précédent (evidence/R20261_CORE_VISUAL_FAILURE_FIRST_20261104.md) et les deux A/B montrent que des changements uniformes d'opacité et de largeur ne créent pas suffisamment de séparation entre les plans du noyau et le plasma. Un futur chantier artistique doit caractériser une composition spatialement sélective/ordre de profondeur AVANT d'écrire un nouveau shader ou de retoucher la palette.
Créer un protocole diagnostique avec ROI du noyau et ROI périphérie, stabilité frame/viewport, contrôles des quatre modes, qualité Auto et puissance zéro ; valider une hypothèse de profondeur sur la référence canonique lorsque ses octets seront disponibles.
Aucune nouvelle variation à l'aveugle dans ce tour (ANTI_LOOP) ; aucune décision artistique en l'absence d'image canonique. Le prochain paquet doit commencer par la référence binaire ou l'autorisation artistique explicitement étayée et sa comparaison native.

## Risques / rollback
Un masque de transparence en espace écran pourrait modifier le nombre de shaders/passes, les coûts GPU ou briser la profondeur 3D ; à évaluer seulement si invariants 1 Engine, 1 Scene, 80 facettes, 28 flux, 6 nœuds, 4 modes et alpha zéro préservés. Aucun nouveau service, lumière ou renderer.
R202.61 et ZIP validé sont inchangés ; source de restauration : dd2b0f1e + preuve Evidence de CI 41719154760.
