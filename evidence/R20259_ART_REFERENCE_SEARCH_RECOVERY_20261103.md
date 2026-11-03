# Synestra Labo 3D R202.59 — blocage de référence artistique, recherche native ciblée

Date : 2026-11-03
Dépôt : `inossarum/synestra-vitrine-preview`, PR #64
Base vérifiée avant recherche : `a55eb3a95fe327d0385ab41c3a3eff11b8e37a1a`.
Objectif : retrouver la **copie exacte** de l'image de référence canonique, pas inventer un nouveau visuel.

## Source de vérité

`reference/SPHERE_CANONICAL_20261029.md` :
- `REFERENCE_ID=SYN_SPHERE_ART_REFERENCE_20261029`
- Fichier original attaché dans un chat : `sphère_d_énergie_néon_cosmique.png`.
- Dimensions attendues : **1254 × 1254 px**.
- SHA256 attendu : **`584e2e8ac90e5fab3996ad1047cdf9e66586f910952b9514b4f5e3927b36b881`**.
- Le manifeste stipule que le **concept visuel** avait été accepté, pas le rendu final R202.59, et que l'image binaire n'était pas copiée dans Git.

## Nouvelle recherche effectivement exécutée

Inos-Cerebros, Desktop Commander, PowerShell, opération native PID **55040** ; **terminée exit code 0** en 19,52 s.

Recherche **bornée** (jusqu'à quatre niveaux sous les racines), filtre de noms de sphère / énergie / néon / cosmique et extensions image ; calcul SHA256 pour chaque candidat :
- `Downloads/` : 1 candidate, `Sphère d'énergie dans une salle futuriste.png`. SHA256 **`900a5c76322d1b7d9a3065a991e868851730766f24887d3410f31e76f7c4994e`** ; **NON IDENTIQUE**.
- `Pictures/` : 0 candidate.
- `Desktop/` : 0 candidate.
- `Documents/` : 0 candidate.
- `I:\_STUDIO_STAGING` : 0 candidate.
- **Total : 1 candidate, 0 correspondance SHA256 exacte.**

La recherche antérieure sur **369 images suivies** dans les sous-espaces pertinents du dépôt avait également abouti à 0 match ; le nom original était absent des résultats ciblés de ChatGPT Files. Ces vérifications ne démontrent PAS que le fichier est absent de tous les supports, chats ou emplacements hors périmètre.

## Décision et prochaine condition de reprise

Aucune copie ne peut être déclarée canonique sans SHA identique. Le PNG `Sphère d'énergie dans une salle futuriste.png` est différent et **ne doit pas remplacer silencieusement** la référence. Il ne faut pas présenter une comparaison approximative comme une approbation artistique.

`TECHNICAL_ARTIFACT=R20259_VERIFIED` : le ZIP et le HTML unique existent dans la PR #64, testés antérieurement ; aucun test, build, push ou déploiement de ce logiciel n'a été répété dans cette recherche.

**HUMAN_GATE** : soit l'image originale est fournie (copie correspondant à SHA256), soit le propriétaire accepte explicitement le rendu R202.59 sur la base des captures. Sans l'une de ces conditions, `ART_SIGNOFF=PENDING` et `FUNCTION_REPORT=PARTIAL`.

**Modification autorisée ici** : seulement ce rapport de constat. Aucun secret, changement des sources, lumière, branche principale, ZIP, HTML unique ou déploiement.
