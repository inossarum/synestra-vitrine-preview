# Labo 3D R189 — qualifie localement, avant migration de moteur

BASE: task/SYN_LAB_R189_ENERGY_VOLUME_QUALITY_20261029 @ b3ebbfd5a7ee1e0fccf40ac3b04dee15dd4dedd6
ARTIFACT_SHA256: F8C9CCA19284682A4ECDEA3DAFF455BA66CF00538F483992C1731DA90B2507AB
TESTS: 30 Node tests PASS / 0 FAIL ; Chrome RTX3090 WebGL 1 real captures 1100/390, four nucleus modes, materials 0/6/8 PASS.
RECOVERY: genuine WEBGL_lose_context triggered; reload button and engine reinitialization PASS.
ACCESSIBILITY: keyboard orbit/reset and prefers-reduced-motion static fallback PASS in Chrome.
EVIDENCE: SITEFORGE_LAB_R189_BROWSER_20261029.json ; r189-*.png.
LIMITS: Firefox/Edge, phone physical, modest hardware not yet qualified ; no public deployment.
NEXT: migrate via isolated adapter towards comprehensive engine Babylon.js, using this R189 visual baseline as characterization. Legacy stays reversible and available.
