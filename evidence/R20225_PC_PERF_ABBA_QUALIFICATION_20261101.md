# Labo 3D — R202.25 PC performance A/B (2026-11-01)

## Scope et provenance
- QA isolée basée sur **R202.25 PR #30** (source `cde9659449c44a6fe7d3641122faddc4df51e94f`), référence R202.24 `edabe06b16d1e36548b34f80a0450f8be9017a33`.
- Aucun shader, matériau, maillage, règle Cloudflare, PR historique ou branche `main` modifié.
- Bundles contrôlés en échec fermé **avant lancement** : R202.24 SHA256 `ffd1326751e6ecbbe2fd997d25a00a8eb5d2bd7efbb36c5f52875e7a50e628da` et R202.25 SHA256 `58ffa01ce8a7c22206b3a6b4795cf4c8c9d2d6e125a98940a64401a2f6e16ed2`.
- Hôte Inos-Cerebros : Windows 11 Pro 10.0.26200, NVIDIA RTX 3090, pilote 616.92, ANGLE D3D11. Relevé initial GPU : utilisation 25 % (charge non contrôlée).

## Méthode
- Chrome **headless**, WebGL réel GPU, serveur local 127.0.0.1, vue `1100×900@DPR1`, qualité Ultra, puissance 145 %, `labFrame=6`.
- Ordre équilibré `R202.24 / R202.25 / R202.25 / R202.24` (**ABBA**), 1,2 s de stabilisation puis 24 échantillons espacés nominalement de 250 ms par essai (environ 6,15 s réel chacun).
- FPS calculé à partir du delta de frames `data-render-frames` et du temps monotone Node ; vérification scène prête, RTX3090/D3D11, **80 triangles / 240 sommets, 1 canvas**, volume visible, dimensions constantes. Profils Chrome QA temporaires propres uniquement, nettoyage final confirmé.
- Reproductibilité : `node lab-babylon/scripts/r20225-abba-perf-windows.mjs` sur le poste équipé et ses deux checkouts à `I:\_STUDIO_STAGING`. Le lanceur est **Windows-local** et n'est pas un benchmark CI multi-plateforme. Fichier brut : `evidence/R20225_R20224_ABBA_GPU_PERF_20261101.json`, SHA256 local `e43609eb6c98db409a1151999f5ce4ca64683710d9dc407e501605287d55962c`.

## Résultat
| Essai | Version | FPS moyen fenêtre | P10 FPS échantillons |
| --- | --- | ---: | ---: |
| 1 | R202.24 | 99,948 | 98,119 |
| 2 | R202.25 | 99,981 | 97,655 |
| 3 | R202.25 | 99,957 | 97,713 |
| 4 | R202.24 | 99,957 | 97,264 |

- Moyenne R202.24 **99,953 FPS**, R202.25 **99,969 FPS**.
- Delta relatif **+0,0163 %** : **équivalent dans la précision de ce protocole**, non preuve d'une optimisation ni de marge GPU.
- `FUNCTION_REPORT=PARTIAL`, `R20225_HEADLESS_ABBA=PASS_MEASURED`, `PERF_REGRESSION=NOT_OBSERVED_IN_THIS_TEST`.
- Ne signifie **ni** benchmark de fenêtre interactive au premier plan, ni FPS prolongés stabilisés, ni test sur GPU bas de gamme, ni approbation esthétique.

## Contrôles et gates
- [x] Scripts/code originaux de PR #30 inchangés.
- [x] Contrôle SHA préalable et GPU réel.
- [x] Quatre mesures ABBA, JSON local SHA et métriques.
- [x] Aucun déploiement, coût PAYG, changement machine durable.
- [ ] Répétitions prolongées avec télémétrie GPU thermique/power contrôlée.
- [ ] GPU d'entrée de gamme physique.
- [ ] Validation esthétique propriétaire / E2E hébergé privé authentifié.

**FREE_ONLY, PR DRAFT QA, NO MERGE, NO DEPLOY, pas de promotion implicite.**
