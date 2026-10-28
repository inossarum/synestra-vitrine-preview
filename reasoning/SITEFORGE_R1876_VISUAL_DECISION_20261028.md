# SiteForge R187.6 — tressage énergétique vivant

- Référence propriétaire : capture R187.5 avec cinq filaments fins cyan/magenta, sans tuyaux solides. Test demandé du **tressage** et du **mouvement interne**.
- Source/pin : R187.5 commit `4c19d276cb50f7a62ebf03929ea26f1f1050d84c`, SHA normalisé `d7250dc8323074d4da3f8558c9d0e5be4e6da3d82ea5b9e058d1c2ebf0894ec1`. Travail séparé en branche `task/SYN_SITEFORGE_R1876_BRAIDED_ENERGY_20261028`.
- Correctif : conserver cinq centres de trajectoire et l'animation géométrique préexistante; placer deux filaments fins sur des orbites en opposition de phase autour de chaque centreline 3D, et animer ces filaments via `uLabTime`. Aucune coque opaque ou extrusion géométrique. Ajouter étincelles localisées aux intersections, modulation avant/arrière et petite pulsation du noyau.
- Première version sous-exposée ; correction bornée : restauration des halos du trajet principal et du gain d'émission, tout en conservant les satellites attachés.
- Mesures Chrome/Windows SwiftShader : desktop 1100x800 10,72 % de pixels changeants et mobile simulé 390x844 21,59 % en environ 2,1 secondes, avec `particleSpeed=0`, rotation globale stable et aucune erreur WebGL.
- Contrats : 5/5 tests statiques PASS (CSP exacte, isolation du septième shader, préservation des six anciens matériaux, JSON 18+10, récupération source R187.5). Les avertissements hérités `frame-ancestors` (meta) et favicon 404 ne sont pas des erreurs de shader.
- Visuel : la structure tressée est plus détaillée mais reste relativement discrète et sombre, particulièrement à certains angles; **pas d'affirmation de supériorité artistique ni de DONE produit**. Comparaison utilisateur R187.5/R187.6 encore nécessaire.
- Prévisualisation : http://127.0.0.1:19096/siteforge-r1876-autonome.html?demo=energy ; captures et QA JSON dans `evidence/`. Préservation des versions précédentes. Aucun push/merge/déploiement.
- Rollback : revenir sans mutation à R187.5 worktree `I:/_STUDIO_STAGING/siteforge_r1875_filaments_20261028`, commit ci-dessus.
