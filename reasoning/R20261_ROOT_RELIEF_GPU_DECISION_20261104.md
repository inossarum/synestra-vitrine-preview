# R202.61 — PREVISE/Doctor : refus du recul des racines de plasma

Date : 2026-11-04 | Mission : labo3d_sphere_r20261.
Evidence : evidence/R20261_ROOT_RELIEF_GPU_REJECT_20261104.md et evidence/R20261_ROOT_RELIEF_GPU_AB_REJECT_20261104.json.

## Diagnostic causal
Le problème central ne peut pas être résolu par un simple retrait spatial des 18 voiles internes. Bien que 14–21% du centre changent sous GPU réel, la luminance diminue dans les quatre modes de ~4.3–4.95 unités et le gain de gradient reste +0.011 à +0.050, inférieur au seuil préfixé +0.10. L'enveloppe périphérique est préservée, ce qui localise bien l'expérience, mais la cause du manque de foyer énergétique blanc-violet dépasse la seule occlusion.

## Hypothèses et alternatives
- Rejected (nouveau) : déplacer l'origine des voiles à rayon .44 ; méthode entièrement archivee, mais NON promue.
- Rejected (historique) : baisse d'opacité, largeur uniforme, suppression complète des voiles, augmentation uniforme de l'émission, modification globale de palette.
- Prochaine piste de recherche distincte : étudier, sans promesse d'amélioration, le **contraste spatial du noyau** et la continuité des connexions existantes avec le shader/masque actuel, plutôt que retirer davantage de plasma. Toute proposition exige un nouveau gate visuel A/B à seuil figé et conservation des invariants.
- Le concept artistique candidat « Sphère d’énergie néon cosmique.png » a été retrouvé en Library (1254x1254), mais son binaire original reste non vérifié au SHA officiel; les deux requêtes de matérialisation antérieures ont été refusées. Ne pas les contourner.
- Pas de retry du test orbital précédemment POLICY_DENIED. Ne pas exploiter un succès de tests unitaires ou build comme acceptation artistique.

## Durabilité et reprise
La branche source R202.61 approuvée est maintenue au dernier SHA vérifié (3ec0188afa415e1e9eb4b124e999f920eb5bc382). Le worktree isolé d'expérience a été restauré au même HEAD pour les fichiers suivis. Evidence du REJECT publiée sur une branche de recherche séparée ; ne pas intégrer le patch rejeté dans le code.
NEXT : qualifier d'abord l'accès légal aux octets de l'image de référence ou faire une analyse statique ciblée du shader existant ; toute nouvelle mutation expérimentale doit être isolée et bornée, pas de rerun des hypothèses précédentes.
SOURCE_GATE=LIMITED; ART_SIGNOFF=PENDING; NO_ART_PROMOTION; FREE_ONLY; FUNCTION_REPORT=PARTIAL.
