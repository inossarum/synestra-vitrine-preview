# SiteForge Labo 3D R187.3 — corps cylindrique énergétique

- Entrée utilisateur : photo R187.2, les flux manquent de corps. Souhait : profondeur **cylindrique** en préservant l'aspect énergétique, ni tuyaux plastiques (R188) ni fils chaotiques (R188.2).
- Source immuable : worktree `siteforge_r1872_lab_cleanup_20261028` commit `835f1afcd22359d2ab0e7d9fa056fa8dc5a05fb0` ; branche neuve `task/SYN_SITEFORGE_R1873_CYLINDRICAL_ENERGY_20261028`.
- Delta : modifier exclusivement le shader `flowType=6` et son libellé/version. Garder les trois anneaux 3D, leurs courbures dynamiques, les reflets animés et `uLabTime`. Ajouter à chaque champ un volume gaussien radial avec lumière diffuse directionnelle et bande spéculaire mobile ; ne pas faire de surface SDF opaque.
- **Échec artistique corrigé** : premier prototype de volume trop lumineux fusionnait en disque blanc. Réduction d'un facteur important de l'émission volumique, assombrissement directionnel des stries, baisse du tone mapping ; capture révisée acceptable pour une proposition, sans préjuger de la validation esthétique.
- Gate code : 5/5 tests statiques PASS, reconstitution exacte R187.2 sauf matériau 6/libellés/CSP ; contrôles de scène 18 et d'éclats 10 préservés.
- Gate navigateur : Chrome Windows WebGL SwiftShader bureau PASS (30,03 % pixels modifiés en ~2,1 s avec rotation et particules arrêtées), mobile simulé PASS (43,13 %), deep link ?demo=energy PASS (flowType=6). CSP script-src SHA exacte, WebGL erreur 0. Les différences de pixels mesurent le mouvement, pas un score d'esthétique.
- Preview locale : http://127.0.0.1:19093/siteforge-r1873-autonome.html?demo=energy ; captures `evidence/r1873-*.png` et preuve JSON. Le poste doit rester allumé et le serveur HTTP actif.
- Historique R187.2, version publique R186 et anciens matériaux préservés. Aucun déploiement, push ou merge. HUMAN_GATE artistique : validation du rendu avant promotion.
