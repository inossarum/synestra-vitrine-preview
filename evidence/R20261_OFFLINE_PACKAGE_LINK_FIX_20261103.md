# HPSYN — R202.61 · correction d'un lien cassé dans le ZIP autonome

Date : 2026-11-03 · Dépôt : inossarum/synestra-vitrine-preview
Branche de travail isolée : task/SYN_LAB_R20261_OFFLINE_LINK_FIX_20261103
Base exacte : d2cb34bb616ead2a29ad2f8a4d5a3629fcb00897.
PR stable #64 : 6b5e0f761e84b3c621d2c863fe7ba7d5e466898c ; non modifiée.
Aucun déploiement public, achat, nouveau moteur ou nouveau service.

## Défaillance vérifiée
Le fichier index.html du ZIP 33677ab6d1270910a6e2f80b7862040bc89f34466a1885b272fb971886036d5b contenait le lien
`../siteforge-r189-autonome.html?demo=energy&material=6`.
La cible n'existe pas dans les six entrées du ZIP. Vérificateur écrit et lancé AVANT correction :
`python release/verify_r20261_offline_links.py` → `R20261_OFFLINE_LINKS_FAIL` ; une référence non contenue dans l'archive, CSS et JS corrects (PID 95688).

## Correction minimale
- `lab-babylon/index.html` : remplace uniquement le lien inopérant par le texte « Comparaison R189 non incluse dans cette version autonome. »
- `release/build_zip_R20261.py` : vérifie la présence unique du lien original dans le ZIP R202.60 SHA-pinné, le remplace par le même texte, compare le HTML normalisé au source modifié, et garantit l'identité des deux entrées non remplacées. Le bundle Babylon R202.61 et son lanceur ne changent pas.
- `release/verify_r20261_offline_links.py` : contrôle autonome stdlib des références <a>, <link>, <script>, <img>, <iframe>, <video>, <audio>, <source>. Rejette les URL absolues, protocoles, sorties de répertoire et fichiers manquants, accepte les fragments.
- `lab-babylon/tests/sphere-regression.test.mjs` : actualise strictement l'ancienne exigence obsolète de lien R189 par un test d'absence du lien mort et de présence du message, sans modifier les assertions du moteur unique, canvas ou CSP.
- `.github/workflows/r20261-standalone-zip-integrity.yml` : ajoute le contrôle anti-liens morts et remplace seulement les deux SHA de l'archive finale ; runner Ubuntu standard, aucun déploiement ni stockage d'artefacts.

## Preuves natives
- ZIP corrigé `release/Synestra_Sphere_R20261_Standalone.zip` : **1 672 368 octets**, SHA256 **5088f87190de0e0bab84633569c0585664a7151666e29fda1b434c76d0f8ae13** ; reproduit octet pour octet par `python release/build_zip_R20261.py [sortie]` (PID 76244).
- Bundle Babylon à l'intérieur du nouveau ZIP : SHA256 **93301d7b225bc52e1a46b00937269941a17b050d58dd7fc20813eaff36779f5d** : inchangé, noyau 80 faces inchangé.
- Contrôle de tous les liens du ZIP : **R20261_OFFLINE_LINKS_PASS**, 0 référence manquante (PID 94692, nouvelle exécution PID 76244).
- Test navigateur sur le **ZIP corrigé extrait**, sans simulation (PID 88708, exit 0) : Chrome SwiftShader Auto→economy **PASS**, RTX3090 Auto→balanced **PASS** ; quatre modes 1→2→3→0, 80 facettes du noyau + masque, 28 flux, 6 nœuds, puissance zéro, 1 canvas ; 0 erreur JavaScript, 0 requête externe. Rapport de QA SHA256 `7c624ac2dcaf264cc9e66c49a84c217e04828029ae3eef7f7d7cb390b3b0f67e`.
- Régression complète npm offline (PID 95528) : **180 tests / 177 PASS / 0 FAIL / 3 SKIP**, exit 0.
- Retour arrière : le ZIP original SHA256 `33677ab6d1270910a6e2f80b7862040bc89f34466a1885b272fb971886036d5b` est conservé localement dans `qa-offline-linkfix/ORIGINAL_D2CB34B.zip` sans mutation de la branche source.
- Refus explicite : aucune conversion de test GPU en validation artistique, `ART_SIGNOFF=PENDING`.

## État
`BUNDLE_UNCHANGED=VERIFIED | ZIP_LINK_FIX=PASS | ZIP_REBUILD=PASS | GPU_E2E=2_PASS | NODE_TESTS=177_PASS_0_FAIL_3_SKIP | REMOTE_CI=NOT_YET_VERIFIED_FOR_NEW_SHA | ART_SIGNOFF=PENDING | FUNCTION_REPORT=PARTIAL`
