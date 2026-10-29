# Synestra R202 — Cloudflare Pages preview only

- Target project: `synestra-vitrine-preview` (existing project; no new Worker or server).
- Exact allowed source branch: `task/SYN_SITEFORGE_R202_CINEMATIC_DEPTH_20261029`.
- This Git commit triggers a **preview deployment**, not production.
- Cloudflare production branch remains `main`; automatic production deployments remain disabled.
- Exact-branch static builder maps `r202/index.html` to `dist/index.html` and R202 product pages to their corresponding public routes, bundles Three.js with pinned `npm ci`, and self-hosts GPU benchmarks.
- R202 page robots policy: `noindex,nofollow`.
- Must verify the Cloudflare deployment status and that the live root HTML includes `r202-scene.bundle.mjs` before sharing its link.
- Visual design review remains pending; this is an evaluation preview, not a marketing launch.
