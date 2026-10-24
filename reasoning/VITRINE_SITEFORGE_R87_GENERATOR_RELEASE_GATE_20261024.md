---
document_id: SYN_VITRINE_SITEFORGE_R87_GENERATOR_RELEASE_GATE_20261024
document_type: REASONING
status: ACTIVE_MISSION_CHECKPOINT
mission_id: SYN_VITRINE_SITEFORGE_SHOWCASE_20261024
source_code_sha: 018ce0a7620dc15caf05a74f6772f3620a4ee76e
evidence: evidence/VITRINE_SITEFORGE_GENERATOR_PUBLIC_R87_20261024.json
---
# R87 — Générateur canonique retrouvé, publication historique vérifiée

## Nouveau fait après R86
Le générateur de vitrine SiteForge déjà implémenté est situé sur Studio PR #211 HEAD ee7b61a644a1b608f8dd2e5ff3a111376e04b2dc : cloud/synestra-mcp-staging/scripts/build_siteforge_vitrine_preview.mjs, blob 128e0d1abec83aecc157cc86161e722b7e4abce6. À la ligne 14, `sitePath` conserve `/synestra-vitrine-preview/siteforge/`; ses destinations servent aux liens de navigation. La réécriture R85 de 210 liens dans les HTML dérivés est correcte au SHA testé, mais une régénération non corrigée peut réintroduire le bug. Il s'agit d'un **risque démontré par lecture du code**, pas d'un E2E de régénération exécuté.

Un contrôle HTTP réel en lecture seule depuis Inos-Cerebros confirme le 24 octobre 2026, à 19:45 UTC, les trois pages publiques GitHub Pages (racine, /siteforge/, /siteforge/lab/) à HTTP 200. La version servie publiquement n'a PAS été corrélée au blob de R85/R86 ; ce contrôle n'atteste pas un déploiement R85. La prévisualisation R85 privée reste http://127.0.0.1:4190/ sur le PC propriétaire.

## Décision
Ne modifier ni la PR #211, ni la PR vitrine #3, ni Cloudflare ni main dans ce chantier sans owner/lease et gate d'intégration. La correction canonique future est une génération de liens relatifs à la page courante, avec test failure-first en racine cloud et sous préfixe GitHub Pages, sans nouveau router ou broker. Réutiliser le générateur existant plutôt que maintenir un second générateur dans la vitrine. Préserver les metadata canonical/og:url jusqu'à validation du hostname cible.

## Gates restants
1. Qualifier le propriétaire de la source PR #211 et un checkout dédié à un SHA vérifié, sans écraser les modifications concurrentes.
2. Adapter, tester et rejouer la génération, puis recertifier les 21 pages à la racine cloud et sous préfixe de test.
3. Qualifier l'intégration vitrine PR #3 et la publication sur hébergement cible, avec consentement humain pour exposition, rollback et test navigateur du build final.
Aucune de ces opérations n'est revendiquée DONE dans ce checkpoint.
FUNCTION_REPORT=PARTIAL
