# WEBAPP-AUTH-20261124 — public connection entry candidate

Base df67fcd5cc6b7cc0fb42fa86c8920d28b9427494, source-only; owner confirmation 24 November. Existing public vitrine becomes the first screen; private V90 staging remains protected by Cloudflare Access. Two public CTA links now route to /connexion/. The Cloudflare link opens existing Access login; provider-specific direct link is not asserted. Google remains visibly disabled until actual owner IdP setup and real E2E. No form, script, credential handling, storage, ACL or private Worker modifications.

Existing Pages build command on account targets older SiteForge branches and is not compatible with this main snapshot. This branch is excluded from the Pages preview allowlist and production deployments are disabled. Do not deploy or switch build settings blindly. Candidate command: python -m unittest discover -s tests -p test_public_entry.py; python tools/build_public_entry.py dist (fresh directory). Verify the existing public demo assets separately before promotion. Full HTML/Liquid custom Access template is paid-only per official Cloudflare docs. Native browser and authenticated E2E pending. No merge direct main, no Actions, FREE_ONLY.

Creative PID37268, Accelerator PID19760, advisory only. FAST receipts recorded in mission discussion. Existing private URLs remain unchanged; candidate targets staging only.

## R2 — approved visual reference
Reference approved 2026-11-23, SHA256 d3d5e45395c790b23d2afccbfd188dfa481cd0260063bb0d994dd117f0ae6788. Reuses original 160px PNG logo from Synestra-connexion-minimale.html; inline provider vectors are approximations. Semantic HTML/CSS, fields disabled and unbound, no form or script, no credential collection. Recovery and providers disabled; primary CTA delegates to protected V90. Public site and private Worker unchanged. Browser visual parity pending. CSP permits embedded logo only.
