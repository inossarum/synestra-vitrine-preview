# Labo 3D — R202.52 : mesure indépendante de la perte lumineuse
**Date :** 2026-11-03 · **Mission :** `syn-lab-r20252-facet-transmission` · **État :** DIAGNOSTIC PASS / VISUAL ACCEPTANCE FAIL / CORRECTION BLOCKED

## Source, portée et restrictions
- Branche métier inchangée : `task/SYN_LAB_R20252_FACET_TRANSMISSION_20261102@5eff28932d63a5579d9ee780b91175e2ba9b58b8`. Ce document est publié sur une **branche documentaire isolée** ; il ne modifie aucun shader, bundle, test ou worktree de production.
- Comparaison **des captures Babylon natives déjà existantes** : R202.49 (baseline), candidat combiné R202.50+R202.51 instrumenté, RTX 3090/ANGLE D3D11, viewport 1100×900, puissance 145 %, frames déterministes 6 et 18. Aucun nouveau rendu Babylon n'a été effectué pour cette preuve.
- **Le transfert R202.50 → R202.52 a fait l'objet d'un refus explicite de la plateforme.** Aucune opération de transfert, de copie de sources, de modification GLSL ni tentative de contournement n'a été menée. Le refus ne peut être réévalué que par l'autorité d'origine. La comparaison des images existantes n'autorise ni n'implique une mutation du shader.
- Seul un diagnostic **du candidat combiné** est mesuré. **La cause propre à R202.50 et à R202.51 n'est pas isolée**.

## Captures et intégrité
Sources locales Inos-Cerebros : `I:\_STUDIO_STAGING\SYN_LAB_R20251_NATIVE_BABYLON_INSTRUMENTED_QA_20261102`.

| Frame | Variante | SHA-256 PNG vérifié |
|---|---|---|
| 6 | R202.49 référence | `9c418910055a52e1c50958955d6c9f6b77181c178f4c6afd2f4cd2886b8dddca` |
| 6 | R202.50+51 instrumenté | `60beb2b5467735c2df4621fddfac1f716c62ea6a93daca18f93163443e36c7c3` |
| 18 | R202.49 référence | `e01491f5fa467f39a286aa6139ed8c934ece9fee7b6e933140a239d2743c8acc` |
| 18 | R202.50+51 instrumenté | `a7424d527ed92e01799a5b85fc4aa8b6265860d2e212edbc5fb915d55fe6db6b` |

**Périmètre numérique :** ROI x=[320,452), y=[395,540), échantillonnage tous les 2 pixels, soit **4 818 points par frame**. Luminance calculée par (0.2126 R + 0.7152 G + 0.0722 B). Comparaison à coordonnées identiques, échantillonnage RGB. Attention : la ROI rectangulaire peut contenir une partie de l'arrière-plan, ce n'est pas un masque sémantique 80 facettes.

## Résultats du diagnostic
Le seuil **>150/255** est l'unique seuil canonique de réception actuellement défini par le roadmap R202.52. Les autres seuils explorent la sensibilité de la mesure et ne changent pas l'acceptation.

| Seuil luma | Frame 6 : perte nette de pixels lumineux (pp) | Frame 18 (pp) |
|---:|---:|---:|
| 120 | −3,404 | −5,915 |
| 130 | −1,225 | −7,202 |
| 140 | −3,362 | −6,268 |
| **150 (critère)** | **−7,887** | **−7,825** |
| 160 | −9,921 | −5,293 |
| 170 | −7,036 | −3,570 |
| 180 | −1,660 | −1,910 |
| 190 | −0,021 | −0,602 |
| 200 | 0,000 | −0,436 |

À 150, **380 pixels initialement lumineux passent sous le seuil** à frame 6, **377** à frame 18, et aucun pixel sombre de l'échantillon ne franchit le seuil dans l'autre sens. Respectivement **352/380** et **364/377** étaient dans l'intervalle de luminance de référence 150–179, ce qui situe le plus gros défaut sur des facettes moyennement lumineuses.

| Différence candidat − référence | Frame 6 | Frame 18 |
|---|---:|---:|
| Moyenne de luminance /255 | −13,265 | −12,602 |
| Médiane des différences | −11,211 | −9,928 |
| Pixels assombris de plus de 2 niveaux | 87,505 % | 95,455 % |
| Pixels éclaircis de plus de 2 niveaux | 0,747 % | 0,083 % |
| Moyenne ΔR | −15,095 | −14,219 |
| Moyenne ΔG | −12,703 | −12,109 |
| Moyenne ΔB | −13,434 | −12,719 |

Le contrôle croisé avec la mesure indépendante précédente concorde sur les 2 frames : **4 818 échantillons, variation moyenne et perte au seuil 150 identiques**.

**Contrôle canonique historique :** le script strict R202.52 précédemment publié a mesuré **−7,996 pp** (frame 6) et **−7,933 pp** (frame 18), soit une régression supérieure au maximum toléré de **−2 pp**. L'écart avec l'échantillonnage ci-dessus est cohérent avec les limites de bord de la ROI. **Ce document ne présente aucune validation artistique ou correction réussie**.

Pour la ROI diagnostique seulement, −2 points correspondent à environ 96 pixels nets maximum : **284 pixels à récupérer** à frame 6 et **281** à frame 18. Ce n'est **pas** une exigence se substituant au QA canonique.

## Provenance et limites de reproduction
- Source métier/roadmap `reasoning/R20252_FACET_TRANSMISSION_ROADMAP_20261102.md`, Git blob `de4bcc7fadc36b92e8ba5e8148e746983f6823b0`.
- QA script publié `lab-babylon/scripts/r20252-contrast-audit.mjs`, Git blob `37383b89f38bbffeaf81081c2d486308a523bbe9`; CLI test Git blob `214d07f9a342bc8c1096563b7e7c3b1ede305583`. Le mode strict retourne code 3 lorsque la régression dépasse le seuil ; contrôle publié antérieurement.
- Données locales `R20252_PHOTOMETRY_ISOLATED_DIAGNOSTIC.json` SHA256 `18981c5d49c2e4554c8525c5ffa84d1f76705ce6cbbdbfacfa54d62fb893a12f`, et `R20252_THRESHOLD_SENSITIVITY_20261103.json` SHA256 `fc783ed87f889261d84e88678c82af269cfc7ead1f7a20025591f478ee00792f`. Ces **fichiers ne sont pas uploadés** par cette publication GitHub ; seules leurs observations et empreintes sont archivées ici.
- Script local de replay `R20252_PHOTOMETRY_REPLAY.ps1` : **NON VÉRIFIÉ — POLICY_DENIED** par les règles d'exécution PowerShell locales ; ne pas représenter son exécution comme PASS.
- Les 110 tests indépendants de Babylon ont été attestés dans un journal antérieur ; **les 12 tests dépendants du moteur, la compilation complète R202.50+51+52 et le rendu E2E du futur correctif restent NON VÉRIFIÉS**.
- Les worktrees et la branche métier sont présumés occupés : **aucun écrasement, checkout, reset, commit sur la branche métier ou push main**.

## Portes de résolution
1. **S04** : nouvelle décision explicite de l'autorité de sécurité **d'origine** sur l'accès/les mutations précédemment refusés ; ne jamais contourner le refus par un autre transport.
2. **S05** : ensuite seulement, isoler la contribution de R202.50 et de R202.51 avec des A/B natifs séparés et correction causale ciblée conservant l'éclairage froid des facettes à l'ombre.
3. **S06** : valider la scène **Babylon réelle** aux frames 6/18 avec **perte ≤2 pp à chaque frame**, contrôle UI inchangé et extinction réelle à puissance 0 ; préserver 80 faces/240 vertices, 28 rubans, 6 flux nodaux, unique GlowLayer/canvas et budget de volume.
4. **S07–S08** : exact-source build, tests de régression complets, captures comparées et validation artistique humaine avant toute fusion ou release ; déploiement seulement sur autorisation distincte.

**Décision :** evidence documentaire uniquement, `FUNCTION_REPORT=PARTIAL`, `SOURCE_TRANSFER_DENIAL=REMAINS`, `ART_GATE=FAIL`, `MAIN_MERGE=NO`, `DEPLOY=NO`, `FREE_ONLY=YES`.
