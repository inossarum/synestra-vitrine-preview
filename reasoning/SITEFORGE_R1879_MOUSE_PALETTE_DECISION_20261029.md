# R187.9 — Interaction souris et palettes

Source : R187.8 (commit `c12be3163ff51ceb662e08d43d05d1c036091cd7`). Branche isolée : `task/SYN_SITEFORGE_R1879_MOUSE_PALETTE_20261029`. Périmètre : septième matériau du Labo 3D SiteForge uniquement. Aucune mutation du site public.

## Décisions
- REUSE_FIRST : le shader R187.8 possède déjà un terme `uPointer` dépendant de la vitesse de souris. Remplacer son effet implicite par une perturbation locale bornée, contrôlée par `uEnergyMouse` Oui/Non, avec retour au repos via la décroissance du `pointerForce` existant. L'interrupteur OFF coupe exactement la perturbation du septième matériau, sans empêcher la rotation par glisser de l'interface.
- Palette du septième matériau indépendante des couleurs historiques : six préréglages et trois contrôles de couleur. Trois uniforms GPU `uEnergyA,uEnergyB,uEnergyCore` ; aucun shader secondaire ou bibliothèque.
- JSON v1 : conserver les 18 paramètres, 10 réglages d'éclats et les 4 paramètres `energyFlow` de R187.8. Ajouter un objet frère optionnel `energyVisual` avec 5 valeurs validées ; absence = valeurs par défaut; import invalide refusé sans mutation. Champs booléens et HEX stricts.
- Entrée souris initialement trop faible (233 pixels changés pour une impulsion visible) : correction bornée du rayon d'influence et gain, second test Chrome avec 12 391 pixels modifiés au lieu de 33 sur OFF. Le résultat est réversible, non opaque et limité au matériau énergétique.

## Vérification
- Build SHA `8b6a0f4de28cbe9c2ce8ffaee5d31fc53655c3fab398963c97828251bd83ce63`, CSP recalculée exactement.
- Node tests statiques 5/5 PASS, Chrome bureau 1100x800 PASS et mobile simulé 390x844 PASS.
- Bureau : Or ≠ Synestra (23 663 pixels), Émeraude ≠ Or (23 364), OFF souris 33 pixels, ON souris 12 391.
- Mobile simulé : couleurs 12 648 / 12 519 pixels, OFF 21, ON 5 633. Aucun échec WebGL. Import ancien et refus atomique démontrés.
- QA historique Chrome PASS : matériaux 0–5, UI clean lab et septième matériau animé indépendamment (26 791 pixels).
- Preuves: `evidence/SITEFORGE_R1879_*.json` et captures `evidence/r1879-*.png`. L'écart de pixels prouve les effets, non la qualité artistique.
- Preview locale : http://127.0.0.1:19099/siteforge-r1879-autonome.html?demo=energy ; R187.8 reste intacte.
- Limites : aucun essai sur matériel mobile physique, aucune approbation esthétique, aucune publication/merge/push.
- Suite logique après la revue visuelle : sauvegarde de presets utilisateur et réglage indépendant force/rayon de perturbation avec adaptation performance sur 8 flux. Ne pas ajouter de réglages avant retour esthétique.
