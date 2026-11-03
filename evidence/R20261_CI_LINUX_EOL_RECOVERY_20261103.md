# HPSYN R202.61 — reprise du premier échec GitHub Actions Linux

Date : 2026-11-03
Branche candidate : `task/SYN_LAB_R20261_WHITE_VIOLET_CORE_20261103`
Run initial exact : [GitHub Actions #41712288121](https://github.com/inossarum/synestra-vitrine-preview/actions/runs/41712288121), commit `267cfe85067fae7408eab54dafce47c9cf065eed`, **completed / failure**.
La PR stable #64 reste sur `6b5e0f761e84b3c621d2c863fe7ba7d5e466898c`, CI `41701136633` SUCCESS.

## Défaillance réellement observée, sans CI verte inventée

Le job Linux `verify-r20261-release` a exécuté :
- checkout, contrôle des SHA du ZIP et du lanceur, installation Node 22, **180 tests Node (175 PASS, 0 FAIL, 5 SKIP)**, build Babylon et SHA du bundle compilé : **PASS**.
- Étape finale de reconstruction : **FAIL**, sortie `R20261_ZIP_REFUSED_HTML_CHANGED`. Le contrôleur du packager comparait le HTML source extrait par Git en Linux LF avec le HTML contenu dans le ZIP stable Windows en CRLF, sans tolérer ce changement de représentation.

Comparaison de bytes indépendante exécutée sur Inos-Cerebros, Git objet et ZIP précédent :
- ZIP HTML SHA256 `f97f18e7289f61d919210df5623f71f857cda740ef7c513ede25a32c9b409886`, **3530 octets, 25 CRLF** ;
- Git blob HTML SHA256 `53f1316555aa98a99afbedf233b417c5e3d23d6d022f7546e79d54a880dc7928`, **3505 octets, 0 CRLF** ;
- après seule normalisation **CRLF → LF** : contenu octet pour octet **identique**. Ce n'est pas une divergence du rendu ni du JS.

## Correction précise

Dans `release/build_zip_R20261.py`, la comparaison du HTML **source contre le HTML de base** accepte uniquement `CRLF/LF` et refuse tout `CR` isolé ou autre différence de contenu. Le packager **ne modifie pas** `index.html` du ZIP final, et continue de vérifier les SHA256 exacts du ZIP stable, du JS, du lanceur Windows et de toutes les ressources inchangées.

Test indépendant simulant le checkout Linux depuis le Git blob au SHA initial :
1. reconstruction du ZIP dans un espace temporaire à partir du HTML LF : **PASS**, SHA256 final exact **`33677ab6d1270910a6e2f80b7862040bc89f34466a1885b272fb971886036d5b`** ;
2. modification réelle de la balise HTML : **refus confirmé** avec `R20261_ZIP_REFUSED_HTML_CHANGED` et code 1. Aucune sortie incorrecte créée.
3. Rapport brut SHA256 **`8381d28282d9b9e4690f3d9749ef98974387608e0d5082027ab35efa9103f199`**, `evidence/R20261_EOL_PORTABILITY_REPORT.json`, processus Windows **89704**, exit **0**.

Ce contrôle ne confond pas la recompilation Linux, le test natif Windows du `START_SPHERE.cmd`, et la CI. Le dernier test Windows du ZIP définitif reste **9/9 PASS**, PID 87936, avant correction qui n'affecte que le constructeur. Le ZIP déjà livré reste strictement inchangé.

## Etat et reprise

- Première CI R202.61 `41712288121=FAILED`, cause attribuée et corrigée localement ; **ne pas la déclarer verte**.
- Nouveau commit doit être publié sur la même branche, déclencher une nouvelle CI Linux et en vérifier **les jobs, étapes et SHA exact**.
- Aucun nouveau moteur, service, Worker, paiement, nouvelle branche ou fusion `main`.
- HTML unique R202.61 bloqué à une tentative précédente par un contrôle de sécurité de l'outil, aucune relance.
- `ART_SIGNOFF=PENDING` tant que le propriétaire n'a pas accepté les vues avant/après.

`FAILURE_FIRST=VERIFIED | HTML_EOL_COMPATIBILITY=PASS | CHANGED_HTML_REFUSAL=PASS | ZIP_SHA_UNCHANGED | CI_R20261=WAIT_FOR_NEW_RUN | FUNCTION_REPORT=PARTIAL`
