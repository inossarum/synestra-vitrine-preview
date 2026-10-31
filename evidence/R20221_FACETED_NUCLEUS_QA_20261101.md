# R202.21 — Noyau facetté lumineux PC | QA indépendante
Date : 2026-11-01. Statut : CANDIDAT TECHNIQUE / ART PENDING / NO DEPLOY.
Objectif : renforcer la luminosité du maillage `central nucleus` (IcoSphere) ; ne pas confondre avec le volume raymarch R202.19.
Base exacte PR #23 : `a6fa38fb12c030c1abf12f1ac7a32ae555ceab2a` ; PR #24 R202.20 non modifiée.
Périmètre : source `lab-babylon/src/main.js` (rayon 0.245 -> 0.30), `src/plasma-field.js` (matériau blanc-violet, blending additif local, alpha plafonné, puissance zéro), tests et workflow CI du candidat seulement. Une seule scène / un seul moteur / un seul canvas.
Source shader centrale SHA256 (LF) : `ad868f8a2c1f5b741cbe2b40657e44a0245878a005e3a34d4635dc1a6175503a`.
Source main SHA256 (LF) : `7dec0100a3142caeeced3be6d05b5c6a0244ebf4f3f2eb32d4ffa56607cce601`.
Build local Windows : `npm ci --prefer-offline --no-audit --no-fund` puis `npm test` => 86 tests, 84 PASS / 2 SKIP / 0 FAIL ; `npm run build` PASS.
Bundle esbuild SHA256 : `0de2b1ac37c99aeb38b8a31e15ee19c895bb7b2a6d7389ef4b53bdfaa72138bb`.
E2E Windows réel : NVIDIA GeForce RTX 3090 / ANGLE D3D11 via Chrome CDP localhost, profil jetable, six scénarios 1100 px (core0, core6, economy, balanced, ultra, power-zero) => 6/6 PASS.
Contrôles GPU : `data-sphere-ready=true`, 1 canvas, volume R20215 attendu, matériau natif `r20221-faceted-nucleus` effectivement lié au maillage central `central nucleus` (vertex count non nul), shader frames présentes, volume désactivé en puissance zéro.
Captures originales natives dans `I:\_STUDIO_STAGING\SYN_LAB_R20221_FACET_CORE_QA_20261101\qa_faceted`. Comparatif recadré ci-joint `R20221_FACETED_CORE_BEFORE_AFTER_RTX3090.png` SHA256 `f1e9d89e9ed6528fd225abda51e2494fe87873d273bae7f95ca21c3aad6bd654`.
Image baseline Ultra SHA256 `f20afacc10a0b7639a24a5eb15d25407f88c306c272149dd296fe7956e1e5d62`; final Ultra SHA256 `bae656535424a9d052d71aef7a295b3dc0e91502298dc4ba9bdcf19c16df1ccc`.
Mesure indicative zone écran x=335..434 / y=430..529, échantillonnée tous les 2 pixels, sRGB Y=0.2126R+0.7152G+0.0722B. ROI moyenne 132.505 -> 140.783 (+6.25 %) ; pixels Y >=190 : 84 -> 209 (+148.8 %) sur 2500 échantillons. Mesure illustrative uniquement, ni HDR ni approbation esthétique, recadrage et conditions appariées.
CI candidate : pin shader/main/bundle, tests natifs, screenshot Chromium WebGL SwiftShader 1100px, build exact-source en artifact sans déploiement.
Gates : PR23_PRESERVED=PASS, PR24_PRESERVED=PASS, LOCAL_GPU_E2E=PASS, CI_GITHUB=TO_VERIFY, OWNER_ART_SIGNOFF=PENDING, PROTECTED_HOSTED_E2E=NOT_RUN, DEPLOYMENT=NOT_AUTHORIZED, MOBILE=OUT_OF_SCOPE, FREE_ONLY=YES.
