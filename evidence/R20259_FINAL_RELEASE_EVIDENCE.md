# HPSYN / Labo Babylon R202.59 — paquet autonome vérifié et bilan de finition

Date : 2026-11-03
Dépôt : inossarum/synestra-vitrine-preview
Base : PR #63, commit `19341858c94dd501fd4df13391d657e016af9e7e`
Branche isolée : `task/SYN_LAB_R20259_FINAL_CANDIDATE_20261103`

## Livrable effectif

- `release/Synestra_Sphere_R20259_Standalone.zip` : archive autonome (1 659 347 octets), **SHA256 `33140bda8eea1645cb8ea7ea416bf4610c85e40b76c0f6bca95aa5373e324765`**.
- Contient `index.html`, `style.css`, `dist/babylon-lab.js`, `README.txt`, `START_SPHERE.cmd`.
- Fonctionne **sans serveur** via `file://` dans Chrome sur le PC d'essai. Un lanceur HTTP local sur 127.0.0.1:5182 est fourni pour compatibilité si nécessaire. Aucun réseau externe requis par la sphère.
- Bundle SHA256 `b727a8614800e7e0f035a39203133892cc31ff0a868b1322fb7b5e0359cecef9`. La somme SHA256 du bundle est **identique après extraction du ZIP**.
- Captures GPU réelles : `evidence/R20259_FINAL_SPHERE_MODE0_RTX3090.png` SHA256 `9a19d1287fb8fec831935381b25e208042f6ca5aace3382c2a9b30495077d916` ; `evidence/R20259_FINAL_SPHERE_MODE2_RTX3090.png` SHA256 `c85a3b367a61d37517fdfdb460794ac6b48cb3a6db2747b25e98293c56f2f57b`.

## Derniers changements, sans réarchitecture

- 28 rubans courbes externes, 18 trajets internes, six nœuds énergétiques, noyau 80 triangles, quatre modes et transitions 0,72 s, souris / zoom, power-off, reduced-motion : **conservés**.
- Réduction du volume coloré occultant (profil qualité équilibrée, opacity à 145 % : `.60` → `.406`), maintien du carrier existant et de son shader.
- 14 gaines diffuses existantes rétrécies de facteur `3.8` à `2.35`, sans supprimer de maillage et sans toucher aux ancrages.
- Meilleure séparation des facettes éclairées du noyau, sans lumière ou rendu supplémentaire ; valeur nulle à puissance 0 et plafond alpha existant `.79` conservé.

## Tests concrets

- Tests failure-first : défauts opacity et largeur avant correction ; tous corrigés.
- Suite Node complète : **176 tests, 173 PASS, 0 FAIL, 3 SKIP**, exit 0.
- Esbuild Babylon : PASS, ~7.1 Mo, 0 nouveau moteur ou scène.
- Comparaison GPU RTX 3090 entre base R202.58 et candidate R202.59 à `labFrame=18`, `qaQuality=balanced`, `qaPower=145` :
  - mode rayonnement : occupation magenta annulaire **32,37 % → 24,09 %** (−8,28 points) ;
  - mode tressage : **33,28 % → 24,81 %** (−8,47 points) ;
  - changements de pixels >18 RGB : ~**9,04–9,25 %** ;
  - la zone centrale claire ne s'accroît pas significativement ; aucune validation artistique automatique revendiquée.
- Rapport A/B local `qa-final/R20259_FINAL_AB_GPU_REPORT.json`, SHA256 `28985e0c636caa6e406d64e91fea20d30289908a684e00cc5dcc537625442b30`.
- E2E natif RTX 3090 sur application locale (port 5181) : modes 0→1, changement rapide 1→2→3, puissance 0, mode réduit, 28 rubans, six nœuds et 80 triangles : **PASS**. Rapport SHA256 `f105a7309fa44f9e8197bd48debdc51fb558575c08a5f2d0fb102344dde0bda0`.
- E2E depuis le dossier autonome en origine `file://` : **PASS**, rapport SHA256 `0c7a420ff27619b48966edeb13f89288716a0119ca1b4b32651a38bf8bd0df22`.
- E2E depuis **le ZIP ré-extrait** (origine `file://`) : **PASS**, rapport SHA256 `16b04f4948c239e60eb7e1bb4452d6b6d276115e3efff692e1d8367c26b5a303`.
- Les trois essais natifs se sont terminés avec code `0`, navigateur fermé proprement ; pas de preuve inventée.

## Statut exact et porte humaine

`TECHNICAL_RELEASE=VERIFIED` : le logiciel est construit, autonome, testé dans son archive réelle et publiable sans infrastructure supplémentaire.
`ART_SIGNOFF=PENDING` : le contrat d'intention `SYN_SPHERE_ART_REFERENCE_20261029` existe en source (SHA référence `584e2e8ac90e5fab3996ad1047cdf9e66586f910952b9514b4f5e3927b36b881`), mais l'image originale n'a pas été retrouvée et comparée visuellement dans cette exécution. La validation artistique propriétaire reste à établir ; ne pas déclarer le chantier global DONE avant acceptation.
`NO_MERGE=PASS` : la branche principale et les PR antérieures ne sont pas modifiées. Aucun déploiement public, paiement, accès ACL élargi ni service externe ajouté.

`SKILLS_APPLIED=git-worktrees@1.0.0,failure-first@1.0.0,reasoning-evidence@1.0.0,reference-fidelity-verification@1.0.0,visual-diff-iteration@1.0.0,visual-regression-testing@1.0.0 | BUILD=PASS | E2E_ZIP=PASS | OWNER_ART_GATE=PENDING | FUNCTION_REPORT=PARTIAL`
