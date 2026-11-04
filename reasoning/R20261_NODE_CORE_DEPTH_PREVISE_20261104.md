# R202.61 — PREVISE : flux au départ du noyau, correction d'alpha non suffisante

Date : 2026-11-04 | Mission : labo3d_sphere_r20261
Evidence nouvelle : `evidence/R20261_CORE_NODE_OCCLUSION_ANALYTIC_20261104.md`
Evidence GPU réutilisée : `evidence/R20261_NODE_ROOT_GPU_REJECT_20261104.md`
Dernier SHA de la branche avant la décision : `2e2b869510f2b1921106a5b7de14001a904d73f6`.

## Diagnostic révisé
Le calcul indépendant des six centerlines `sampleCoreShellFlow` montre que 15/73 points par flux sont à une distance du centre inférieure au rayon 0.38 du noyau et 11/73 sont à moins de 0.30 (rayon inférieur à la borne inscrite analytique ~0.30197 de l'icosaèdre de départ). Les cinq instants analytiques t=0, 0.3, 1, 4, 18 donnent les mêmes effectifs pour les six directions. La saturation du profil d'alpha original commence à l'index 8 ; le premier échantillon hors sphère de rayon .38 est à l'index 15.

**Décision technique :** `rootGlow` augmente l'alpha principalement dans la région géométrique interne, où le masque depth/stencil peut l'occulter. Cette relation explique économiquement pourquoi le GPU avait montré un gain de gradient sans franchir le seuil de pixels modifiés. C'est une explication géométrique, **non une preuve GPU de fragments rejetés**.

## Hypothèses et options
1. REJECT : reprise du rootGlow alpha .90, déplacement des voiles, émission localisée A/B, hausse générale de luminosité, altération du stencil, seuils visuels abaissés après mesure. Toutes ces variantes sont soit déjà rejetées, soit risquées sans preuve de profondeur.
2. PRIORITÉ : mesurer directement avec le renderer existant (sans shader ni mesh nouveaux) le nombre de fragments visibles de chaque clone `node-plasma-foreground-i` derrière et devant les facettes, à camera/frame fixes, puis comparer sa contribution aux six courants centre→nœuds.
3. NE PAS changer le stencil EQUAL=1 ni le depth test pour forcer la visibilité : risque majeur de filaments dessinés à travers les faces, perte de relief et incohérence 3D.
4. En cas de test GPU autorisé, contrat failure-first : 80 facettes, six nœuds, 28 rubans, quatre modes, qualité Auto/Balanced, puissance zéro, un Engine/Scene/Canvas, absence de requêtes externes et baseline non modifiée ; séparation de visibilité par région du noyau et couronne ; critères définis avant capture.
5. En cas d'autorisation de lecture de l'image canonique en octets, vérifier le SHA256 attendu `584e2e8ac90e5fab3996ad1047cdf9e66586f910952b9514b4f5e3927b36b881` AVANT de calculer une fidélité pixel. Ne pas réessayer l'accès Library précédemment refusé sans changement d'autorisation.

## HPSYN réel et limites
`synestra_hpsyn_mission_status(mission_id=labo3d_sphere_r20261)` a été consulté : workflow id `hpsyn-1a70dd1364ae-labo3d_sphere_r20261`, workflow_status COMPLETE, mission_status BLOCKED, plan_hash `572edc2e604b712ed0191aa98a0b7a11004c1f475cb5831f37affcee02a5ef5a`. Core engines : freshness PASS_VERIFIED, memory PASS_VERIFIED, previse PASS_VERIFIED, maintenance PASS_VERIFIED, evidence PASS_VERIFIED ; doctor RESULT_OBSERVED mais ready=false avec `HPSYN_DOCTOR_PREFLIGHT_LIMITED`. Les étapes repo_state, skill_route et visual_probe sont BLOCKED sur `HPSYN_ENGINE_PRECONDITION_MISSING`. Ce statut représente une exécution historique du Workflow, pas une nouvelle exécution Doctor.
Le préflight Windows de ce tour a reçu POLICY_DENIED : aucun retry ni autre outil de commande équivalent pour le même contrôle. Les lectures GitHub et les calculs analytiques indépendants ont été possibles ; aucune exécution GPU nouvelle.

## Continuation et DONE
La branche de recherche ne contient qu'une Evidence et cette décision. Aucun changement de rendu, de ZIP, de main ni déploiement.
NEXT sûr : inspecter l'autorisation réelle d'une sonde GPU de profondeur ciblée et sa procédure existante, sans répéter un refus. Si elle est absente, avancer sur des diagnostics statiques indépendants sans prétendre à l'E2E.
`SOURCE_GATE=LIMITED` / `ART_SIGNOFF=PENDING` / `GPU_FRAGMENT_PROOF=PENDING` / `HOOKS_STATUS=UNKNOWN` / `FUNCTION_REPORT=PARTIAL`.
