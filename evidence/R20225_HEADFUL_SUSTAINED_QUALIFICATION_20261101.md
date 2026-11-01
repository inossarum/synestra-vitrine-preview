# R202.25 — Chrome PC headful, profils Ultra / Economy (01/11/2026)

## Périmètre et origine
- Qualification complémentaire de **R202.25 PR #30**, source immuable `cde9659449c44a6fe7d3641122faddc4df51e94f`, QA parent PR #31 `a44fe9ab9426e23d4c09f748d3dfa15633853aac`. Aucun shader, maillage, PR existante ni `main` modifiés.
- Bundle contrôlé avant ouverture Chrome : SHA256 `58ffa01ce8a7c22206b3a6b4795cf4c8c9d2d6e125a98940a64401a2f6e16ed2`. Test négatif SHA volontairement erroné : refus **exit 46** avant navigateur, confirmé par lancement indépendant.
- Hôte **Inos-Cerebros / RTX3090 / pilote 616.92**, Chrome avec fenêtre visible (pas headless), ANGLE D3D11, serveur HTTP localhost, viewport émulé 1100×900 DPR1. Le focus réel premier plan n'a pas été mesuré séparément.
- Cadre : un moteur Babylon, une scène, un canvas, noyau **80 triangles / 240 sommets** ; puissance 145 %, frame initial 6 ; aucune installation de pilote ou modification système durable.

## Mesures réelles

| Profil | Durée | FPS moyen (delta frames / durée) | FPS P10 | FPS minimum échantillonné | Budget géométrique |
| --- | ---: | ---: | ---: | ---: | ---: |
| Ultra | 31,894 s | **99,987** | 97,732 | 97,178 | 20 ms |
| Économie | 21,132 s | **99,990** | 97,797 | 97,237 | 48 ms |

- Télémétrie `nvidia-smi` échantillonnée : température **38–44 °C**, GPU **10–40 %**, puissance totale GPU **59,05–142,55 W**, mémoire GPU ~**3 452–3 488 MiB**. Mesures de l'appareil entier, pas attribution exclusive au moteur.
- Les deux profils : **PASS**, nombre de frames croissant sans régression de contrat, visibilité du document `visible`, 1 canvas, 80 facettes ; arrêt de sécurité logiciel prévu au-delà de 85 °C.
- **Test script code de sortie 0**, rapport enregistré à `I:\_STUDIO_STAGING\SYN_LAB_R20225_SUSTAINED_QA_20261101\R20225_HEADFUL_SUSTAINED_GPU_20261101.json`, SHA256 `6a4ad57c3b82e47fd5db645e62689f827093bd1d6e8f3ab8edd326893aadf3c5`.
- Profil Chrome temporaire supprimé : `TEMP_PROFILE_CLEANED`. Répétition possible sur un PC Windows autorisé avec le script `lab-babylon/scripts/r20225-headful-sustained-windows.mjs` et le checkout préparé.

## Limites et portes
- Qualification de ~53 s **et non un essai thermique de plusieurs heures**. Conditions GPU hôte non isolées. FPS ≈ 100 sur cette configuration : ce résultat ne prouve pas la marge de calcul GPU ou les performances sur un matériel plus faible.
- **Pas d'E2E hébergé Cloudflare Access**, pas de mesure de GPU bas de gamme physique.
- **Validation artistique par propriétaire = PENDING** ; aucune acceptation implicite.
- Aucune modification de R202.25, des PR #23–#31, des secrets, des paramètres graphiques Windows ou de `main`. **FREE_ONLY ; aucun déploiement ; PR de preuves uniquement.**

FUNCTION_REPORT : QUALIFICATION_PC_PASS ; PRODUCT_DONE : NO.
