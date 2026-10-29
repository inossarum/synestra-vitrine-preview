# SiteForge R205 — Evidence WebGL + politique adaptative

- Date: 2026-10-29, machine: Inos-Cerebros Windows, Chrome headless isolé; source de base `fd23e9c325214715b08b508da6756374f2535aef` (PR R204 #14).
- Tests `node --test tests/siteforge_r204_core.test.mjs tests/siteforge_r205_adaptive_tier.test.mjs`: **11/11 PASS** (5 contrats R204 + 6 R205). Contrôles: failure-first/nominal, tier zéro reste en vraie 3D, compteurs, refus d'entrées invalides, isolement des branches.
- Bundle Three.js + policy: **582 499 octets**; detect-gpu benchmarks self-hosted: 16 JSON; export privé R205 **70 fichiers PASS**, sous-bundle **16 assets benchmark**. Aucun nouveau renderer ni dépendance.
- WebGL 1440x900 / 768x900 / 390x900: canvas unique, LAB R188.1, H1 unique, absence débordement, 3/3 PASS. Connect/Bridge/SiteForge/Offres: HTML conventionnel, 4/4 PASS. Reduced-motion statique: PASS.
- Observations débit **ponctuelles**, pas benchmark matériel: à 1440, warm-up 17.3 FPS puis 46.1 FPS stabilisés; stress CPU CDP x6: 39.5 FPS sans bascule (charge insuffisante); 768: 41.3 FPS; 390: 46.2 FPS.
- **E2E adaptatif navigateur**: émulation déterministe d'images lentes par RAF différé 110ms, source exacte R205 dans Chrome; 8.3 FPS, `gpuTier=3`, `renderTier=2`, `autoTierDrops=1`, `energyRaySamples=22` contre 34, `coreQuality=0.90` contre 1.00, `coreReady=true`, 1 canvas. PASS. Cette simulation **ne prouve pas un GPU d'entrée de gamme**.
- Captures vérifiables après test: `SITEFORGE_R205_CHROME_1440.png` SHA256 `b376c5ffa6388be0ef0394da3b0ccdb7fbb8ba4affd6b5baa532d011cf683594`, `SITEFORGE_R205_CHROME_768.png` `a0663f922c6534b81c7be8d44ed7191bffd631ba3c979fba65a1206804ec4ef1`, `SITEFORGE_R205_CHROME_390.png` `25d7ee38fd1e8c8062039703046ac463acd9340131039493c7e79e6e472d671b`.
- Console: 10 événements non critiques relevés incluant directive `frame-ancestors` ignorée en CSP meta et ressource localhost 404 non attribuée; pas d'échec GLSL détecté dans ce test. Les tests ne certifient pas l'absence de tout défaut.
- Référence visuelle R204 toujours filaire/discrète et approbation propriétaire PENDING. Les captures sont une preuve de pixels réellement rendus, **pas une approbation AAA++**.
- PREVIEW Cloudflare Access, vrais tiers GPU 0–2, navigateur Firefox, E2E authentifié distant, visual acceptance: **NOT_TESTED/PENDING**. `main`/production **inchangés**.
- Artefacts: `tests/siteforge_r205_browser_qa.mjs`, `tests/siteforge_r205_adaptive_tier.test.mjs`, `evidence/SITEFORGE_R205_CHROME_20261029.json` et trois PNG. Aucun paiement/PAYG.
- State: `QA_CODE_PASS=YES | GPU_ADAPTIVE_BROWSER_SIMULATION_PASS=YES | REAL_LOW_END_GPU_PASS=UNKNOWN | PREMIUM_DONE=NO`.
