# SiteForge R188.2 — turbulence énergétique interne (candidate non qualifiée)

## Décision
À partir de la branche GitHub source `task/SYN_SITEFORGE_R1881_GPU_COMPARE_20261029` HEAD `942e8770c55a9d8e6129f28f114c3819766efacf`, création préalable sur GitHub de `task/SYN_SITEFORGE_R1882_LIVE_TURBULENCE_20261029`, puis worktree Git isolé.

Nouvelle évolution `R188.2` : le rendu du septième matériau reste un seul shader WebGL1 raymarching. Une petite advection périodique 3D déforme les coordonnées échantillonnées du champ, au lieu de construire des tuyaux opaques. Le curseur « Turbulence interne du plasma » vaut 35 % par défaut, 0 % restaure le comportement R188.1 ; si vitesse des impulsions=0, le nouveau terme ne déforme pas le champ. Les couleurs, rayon, densité et perturbation souris restent indépendants. Amplitude plafonnée à 0,027 unité normalisée (100 %).

## JSON / isolation
Préserve la version `synestra.siteforge.plasma-settings.v1` et les 18 paramètres plasma. L'objet optionnel `energyDynamics:{turbulence:int[0,100]}` est validé avant la mutation des commandes ; absent, il prend la valeur 35. Aucun Worker, moteur concurrent, librairie ou nouveau broker. CSP SHA recalculé.

## Tests / incident
- Builder `python tools/build_r1882_live_turbulence.py` PASS, SHA256 normalisé `919339dc811da8c1d16f51752d8925e6dbcbc5826da75dc601e7676024acf112`.
- Tests de référence hérités de R188.1 : 6/6 PASS.
- `node --test tests/siteforge_r1882_isolation.test.mjs` : 4/4 PASS (champ shader, zero bypass, JSON, CSP).
- **Échec de validation native : appel de test HTTP+Chrome refusé par les contrôles de sécurité d'OpenAI.** Aucune relance ni tentative de contournement. `tests/siteforge_r1882_stress.mjs` est préparé mais non exécuté et n'est pas une preuve E2E. WebGL compile=UNKNOWN, qualité graphique=UNKNOWN, GPU FPS=UNKNOWN, mobile=UNKNOWN.

## Checklist de reprise
1. Vérifier branche GitHub et HEAD Git local, SHA HTML normalisé.
2. Consulter le nouveau niveau de permission/outil de test officiellement approuvé, sans contourner le refus du canal précédent.
3. Exécuter E2E Chrome RTX 3090 uniquement si autorisé et confirmer compilation, sliders 0/100, capture temporelle contrôlée, 3–8 flux, palettes, souris, JSON anciens et invalides, CSP et perf GPU.
4. Inspection visuelle desktop et mobile avec captures.
5. Mettre à jour Evidence/Reasoning/Memory/SAL qualifiée, puis éventuelle promotion si l'ensemble est prouvé.

## Limites
Mission partielle. Ne jamais annoncer release, DONE complet, test navigateur PASS ou amélioration de FPS. R188.1 intacte sur son worktree. Pas de merge/push direct main, pas de publication externe, aucune dépense.
