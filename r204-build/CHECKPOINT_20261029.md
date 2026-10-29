# R204 — LAB R188.1 Core, real 3D compact hero

Mission: SYN_SITEFORGE_R204_LIGHTWEIGHT_CORE_20261029
Source: `inossarum/synestra-vitrine-preview`, R202 base `3419d7c25f09bd0ec9b8d9aa21df7b87a2b83595`.
Studio rules: `I:/00_STUDIO_VIRTUEL/AGENTS.md@34cc2a8649bda4230bd2fa73d4a4de0edaf65dc1e3bdaf2b8b78ff58f4e4ea21`.

The owner replaced the R203 landscape direction. The hero alone contains one True-3D Three.js environment (floor/walls/socle/physical point lights) and the Core; all product/business content outside the hero stays standard HTML/CSS. Target audience: TPE, PME, independent developers.

Latest relevant LAB snapshot: `task/SYN_SITEFORGE_R1881_CROSSING_DEPTH_20261029`, commit `fcc95858725c8089c9b83bad564dbf5a53ed59ac`, source HTML blob `81b9cf1cfbbb2920f33482eeaca8655ac6ec475d`; its volumetric fragment is adapted only for world-space UVs and GPU step budgets. Cyan/pink LAB streams are mapped to official Studio violet/green via shader uniforms. No second renderer or canvas. Built-in detect-gpu classifies tier 0–3, budgets 8/14/22/34 ray samples and 175k/320k/650k/950k pixels; low tier keeps reduced real 3D. Reduced motion and unavailable WebGL yield static Core art.

Files: `r204-build/{scene.mjs,lab-r1881-shader.mjs,build.mjs,package.json,package-lock.json}`, `assets/r204-hero.css`, `r204/index.html`, `tests/siteforge_r204_core.test.mjs`, branch-only export in `tools/build_vitrine_static.mjs`, GitHub Actions `.github/workflows/r204-build-preview.yml`.

Preflight: no merge, no production deployment, FREE_ONLY. R203 branch remains isolated and not used. R202 preview remains rollback `https://c4ba7c26.synestra-vitrine-preview.pages.dev/` with Cloudflare Access.

Status: SOURCE_READY. Actual CI, WebGL compilation/render and Cloudflare preview need verified results before DONE. Do not call source-only green tests a visual PASS.
