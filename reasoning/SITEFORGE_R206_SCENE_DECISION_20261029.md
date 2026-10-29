# R206 — décision d'architecture et checkpoint de reprise

MISSION_ID=SYN_SITEFORGE_R206_GRAIN_MIST_STAGE_20261029
BASE_SHA=a17d2192ec0f6fd3f8df8a5abe916b42f2f6817f
BRANCH=task/SYN_SITEFORGE_R206_GRAIN_MIST_STAGE_20261029
OWNER=Synestra Studio
ROLLBACK=Git branch R205/commit a17d2192, sans main, destruction ou changement de credentials.

## Faits, contraintes, décision
Le propriétaire demande un grain de film très léger sur la scène seulement, une brume au ras du sol et un environnement spatial plus premium, puis qualification de trois limites: GPU physique modeste, présence Core, PREVIEW privée sous Cloudflare Access. La variante R205 est une vraie 3D WebGL compacte avec un unique renderer, governor shader adaptatif; aucune raison de dupliquer le moteur.

Décision DELTA_ONLY : compositing léger via PNG local et div aria-hidden créé par le runtime (pas de pass GPU), une simple plane mist fragment sans bruit volumétrique coûteux, anneaux et 6 ribs MeshStandardMaterial. Renderer/scene/Camera/LAB source inchangés. Les effets diminuent/cessent au Tier 0 ou reduced motion; dégradation Tier 3→2 testée. Les pages produit restent HTML. Pas de global Canvas, aucune modification de sécurité.

## Preflight
Studio AGENTS.md local consulté sur I:, Constitution/registre dans précédent checkpoint. Central Skills appliqués: performance@1.0.0#e2c425bc, visual-regression-testing@1.0.0#aa98fffe, browser-e2e-diagnostics@1.0.0#50e513a9, failure-first@1.0.0#373c5f50, pc-driver-gpu-runtime-diagnostics@1.0.0#db213294. Viewer ChatGPT inspected actual screenshots and recorded visual criticism. Outillage Studio/Bridge distinct non muté.

## Tests, preuve et NEXT
Voir evidence/SITEFORGE_R206_BROWSER_20261029.md et 3 PNG avec hashes. Node 19/19 PASS, export 72 fichiers PASS, Chrome CDP 1440/768/390 PASS; source R205 unchanged in Git separate branch, checkout R206 isolated.
NEXT=1) commit/push branche QA R206 puis vérifier CI exacte et les artefacts; 2) inspecter config Pages/Access en lecture, modifier uniquement autorisation de preview privée de cette branche si safe/free/reversible puis réaliser un déploiement preview propre; 3) vérifier URL+Access+assets+browser authentifié; 4) tester vrai GPU modeste si un poste adéquat devient disponible; 5) demander validation artistique avant production. Jamais DONE commercial sur CI seul.
