# SiteForge R175 — lisibilite des eclats 3D (laboratoire)

Decision: conserver exactement 46/28 eclats cyan/violet; ameliorer uniquement leur forme lumineuse et la portee de repulsion dans le pass GPU deja present. Une augmentation du nombre de particules aurait surcharge le plasma. Le fragment des eclats utilise un filament directionnel, une aura moderee et un noyau colore; 18 reglages exportes et les six materiaux restent inchanges.

Tests: 176 tests SiteForge cibles PASS, Chrome ANGLE SwiftShader reel PASS (six materiaux, mobile 390px, orbite souris/tactile, A/B, toggle, repulsion); diff de capture entire: 4 222 / 880 000 pixels. Suite globale non qualifiee: assertions historiques de vitrine echouent. Etape de controle esthetique proprietaire encore PENDING; Cloudflare / vitrine officielle inchanges.

Evidence: evidence/SITEFORGE_R175_OPTICAL_READABILITY_20261028.json. Rollback: commit R175 5ed671ca8fbb32b3a4ecabb412c23009871ff3c7. Aucune fusion dans main.
