# SiteForge R176 — Ondes du plasma perturbées par le pointeur

## Intention
Le pointeur doit affecter les rubans de plasma et pas uniquement repousser les éclats R175. Préserver noyau, rubans et six matériaux, 18 réglages exportés; rester isolé de la vitrine approuvée.

## Décision technique
Réutiliser uPointer et le programme WebGL1 existant. Déformer localement les coordonnées du matériau volumétrique avec une perturbation radiale+tangentielle bornée en espace écran et profondeur 3D. Maintenir le noyau stable via undisturbedQ. Nul besoin de second canvas, d'uniform exporté ou d'overlay. Amortir l'impulsion en fonction du temps réel plutôt que du nombre d'images : corrige un retour au repos insuffisant constaté dans le premier test sur SwiftShader.

## Tests et limites
179 tests SiteForge ciblés PASS. Chrome réel WebGL/SwiftShader : 6 familles, bascule éclats OFF, rotation souris/tactile, mobile 390px, anciens A/B et pause/reprise PASS. Capture sphère figée sans éclats : 14 106/307 840 pixels significativement modifiés (4,58 %) au passage du pointeur, puis 0 pixel différent après 2,65 s. Exécution matérielle GPU/FPS non mesurée, approbation esthétique propriétaire non acquise. GitHub seule branche isolée; vitrine officielle inchangée.

## Références
Evidence : `evidence/SITEFORGE_R176_POINTER_WAVE_20261028.json`. Base rollback : R175 `76e84d98438555842395a9284ffbfe052fe16edb`. Référence de conception : R175 `r175-motes-*`.
