# HPSYN R202.61 — correction vérifiée du lanceur Windows et ZIP définitif

Date : 2026-11-03. Dépôt : `inossarum/synestra-vitrine-preview`.
Branche isolée : `task/SYN_LAB_R20261_WHITE_VIOLET_CORE_20261103`.
Base vérifiée : `8a97af9c4e5a3cb84e406448b87119d3bb5a986e`.
Protection : PR #64, R202.60, `6b5e0f761e84b3c621d2c863fe7ba7d5e466898c`, CI `41701136633` SUCCESS. Aucun changement à cette base.

## Défaillance reproduite et corrigée

Le **véritable lancement** de `START_SPHERE.cmd` extrait du ZIP R202.61 a révélé un échec du test de concurrence : alors qu'un premier serveur écoutait sur `127.0.0.1:5182`, un second lancement de `launch_sphere.py` restait actif au lieu de retourner immédiatement le code de refus `2`. Premier diagnostic/test : processus de banc Windows **50656**, `TimeoutExpired` lors du second lancement ; le processus propriétaire a été arrêté, sans service résiduel.

Cause : sur Windows, `ThreadingHTTPServer` avec le comportement hérité `SO_REUSEADDR` n'excluait pas un second socket sur la même adresse. Vérification native `socket.SO_EXCLUSIVEADDRUSE` présente. Une tentative ne pouvant pas prouver l'exclusivité n'a pas été considérée PASS.

Correction minimale dans **`release/launch_sphere.py`** :
- sous Windows uniquement : `SphereHTTPServer(ThreadingHTTPServer)`, `allow_reuse_address = False` et `socket.SO_EXCLUSIVEADDRUSE` appliqué **avant bind** ;
- ailleurs : conserver le comportement standard de `ThreadingHTTPServer` ;
- conserver la seule interface locale `127.0.0.1:5182`, la gestion d'erreur `SPHERE_PORT_UNAVAILABLE` code `2`, et le démarrage sans navigateur par `SYNESTRA_SPHERE_QA_NO_BROWSER=1` pour les tests.
- `.gitattributes` fige les octets de `release/launch_sphere.py` en `-text -diff`, sans conversion CRLF entre Windows et Linux.
- SHA256 lanceur exact dans le ZIP final et l'espace source : **`7e9b6e517411c247178a4a22db3bbd6f017e78a193bddcea09cff65f6c271784`**.

## Tests réellement effectués

1. Premier banc avec faute du wrapper QA : `TypeError`, corrigé dans le banc, **aucune opération applicative exécutée**.
2. Première exécution réelle du CMD et du serveur : le conflit de port a **échoué au test** ; constat conservé et cause vérifiée.
3. Après correction, essai dans l'extraction QA : **9/9 contrôles PASS**, PID QA **62436**, code 0.
4. Reconstruction du ZIP depuis la base au SHA vérifié, puis extraction indépendante du **nouveau ZIP exact** : **9/9 contrôles PASS**, PID QA **87936**, code 0. Le `START_SPHERE.cmd` de cette extraction a été exécuté directement sous Windows.
5. Contrôles 9 : refus des ressources manquantes (code `3`) ; CMD démarre ; HTTP 200 et octets identiques de `/`, `index.html`, `style.css`, `dist/babylon-lab.js` ; **double lancement refusé** (`SPHERE_PORT_UNAVAILABLE`, code `2`) ; premier serveur toujours actif après ce refus ; fin du test et port `5182` libéré.
6. Les fichiers ont été servis depuis `127.0.0.1` uniquement, sans accès à Internet ni navigateur lancé automatiquement en QA. Le contrôle Chrome GPU direct du ZIP avait déjà passé sur **RTX 3090 et SwiftShader**, quatre formes, 80 facettes, 28 courants et 6 nœuds ; JavaScript et HTML **inchangés** par ce correctif.
7. Rapport brut : `evidence/R20261_WINDOWS_LAUNCHER_E2E_REPORT.json`, SHA256 **`385464f0f0d9146e8b7c7c1ec87e52a7cfdce26e0efecaa0c1bf8371dc7805d4`**.

## ZIP R202.61 actuel — remplace le ZIP antérieur du même nom

- **Livrable actuel** `release/Synestra_Sphere_R20261_Standalone.zip` : **1 672 402 octets**, SHA256 **`33677ab6d1270910a6e2f80b7862040bc89f34466a1885b272fb971886036d5b`**.
- Source : ZIP stable R202.60 `05abdc8bb1e54a33024ca5bafa5c9a080c1811f0334255aa2c05ccbab21e2ba7`, intact.
- Trois éléments modifiés dans les six ressources : JS compilé R202.61 (SHA256 `93301d7b225bc52e1a46b00937269941a17b050d58dd7fc20813eaff36779f5d`), README R202.61 et lanceur exclusif ; **trois ressources inchangées**.
- Constructeur versionné `release/build_zip_R20261.py` : rejette une base non conforme, un launcher modifié ou un écrasement ; reconstruction locale exacte disponible.
- **Archive précédente `e29dc189e1fb526e8001a5863682915df2a93c04bed31133bb27b5c26ed96b6f` = OBSOLÈTE.** Copie conservée dans la QA locale pour retour arrière uniquement, sans suppression.
- Les anciennes preuves `evidence/R20261_STANDALONE_ZIP_GPU_RELEASE_20261103.md` restent des preuves historiques du moteur et de la première archive, **pas de l'actuel lanceur Windows**.

## Reste à vérifier

- Le workflow GitHub Actions Linux R202.61 est ajouté dans la branche candidate : `CI_R20261=PENDING` jusqu'à lecture d'une véritable exécution distante. Le test natif Windows ne peut pas être remplacé par un job Linux.
- HTML unique R202.61 : **NON LIVRÉ**, refus de l'outil à une précédente tentative de génération ; **aucun contournement de ce refus**.
- Acceptation artistique : **`ART_SIGNOFF=PENDING`**, l'image canonique exacte est indisponible. La correction du lanceur ne constitue pas l'acceptation esthétique.
- `main`, PR #64, R202.60 stable et anciens checkpoints restent intacts.

`SKILLS_APPLIED=git-worktrees@1.0.0,failure-first@1.0.0,reasoning-evidence@1.0.0 | WINDOWS_LAUNCHER=9_PASS | BOUND_PORT_EXCLUSIVE=VERIFIED | R20261_ZIP_SHA=33677ab6d1270910a6e2f80b7862040bc89f34466a1885b272fb971886036d5b | ART_SIGNOFF=PENDING | FUNCTION_REPORT=PARTIAL`
