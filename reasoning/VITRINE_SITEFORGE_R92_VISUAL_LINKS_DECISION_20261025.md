---
document_id: VITRINE_SITEFORGE_R92_VISUAL_LINKS_DECISION_20261025
document_type: REASONING
status: ACTIVE_MISSION_CHECKPOINT
mission_id: SYN_VITRINE_SITEFORGE_SHOWCASE_20261024
owner: Inos
evidence: evidence/VITRINE_SITEFORGE_R92_VISUAL_PREVIEW_20261025.json
source_head_at_browser_test: d984258d27f4e43ba6623f2face057365c008248
preview_provider: raw.githack.com
release_gate: HOLD
---

# R92 — lien visualisation R91 + tests Chrome exact-head

## Décision de préparation autorisée

Le propriétaire autorise explicitement le remplacement **dans le flux de préparation** de PR #3 par R91 et demande le lien de visualisation. Il n'autorise pas encore la fusion de `main`, la modification de Cloudflare ou la publication officielle.

La PR vitrine **#5 DRAFT** remplace PR #3 pour les prochaines revues, tout en gardant PR #3 historique DRAFT inchangée, car son bail d'édition exact n'est pas vérifié. Les deux PR ne sont pas déployées. La PR Studio #309 reste indépendante, DRAFT, et non fusionnée.

## Choix du lien

- Visualisation du HTML issu d'un **commit GitHub public exact** au moyen du cache proxy `raw.githack.com`. Le navigateur reçoit `text/html` et les chemins relatifs des pages SiteForge conservent leur structure de fichiers : `https://raw.githack.com/inossarum/synestra-vitrine-preview/d984258d27f4e43ba6623f2face057365c008248/index.html` et `.../siteforge/index.html`.
- Vérification HTTP **200** sur les deux URLs exactes ; HTML apparent (29 849 / 36 880 caractères), résultat PC via Bridge `dbd8e8c8-88b2-4bf9-b2d6-0d25fead05d6`.
- GitHub Pages répond `200` mais expose un **autre blob** (ancienne page). Ne pas diriger l'utilisateur vers cette URL comme prévisualisation de R91.
- Alternatives rejetées : fusion sur `main` pour rendre la preview visible (violerait gate), créer un Cloudflare Preview Worker (infrastructure et exposition non autorisées), utiliser Desktop Commander ou transformer/extraire les captures binaires refusées par Bridge (refus explicite), CDN avec cache permanent (risque d'irrévocabilité sans intérêt).
- Risques : service externe gratuit, confirmation anti-abus possible, aucune garantie de disponibilité, aucun usage d'identifiants privés. Ce lien visualise du code Git public ; ce n'est pas une URL de production ni une E2E visuelle attestée par l'agent.

## Requalification indépendante R91

Tests sur le clone isolé et sur le **HEAD d984258d27f4e43ba6623f2face057365c008248**, sur lequel `index.html` est le blob `c354a8b5b2a89e494f9a061b6cb7f28b68e2aa01` et `siteforge/index.html` `b67811bf23f04d147645144fcf735c017db0be79`.

- Chrome CDP réel, 390×844 et 1440×900, **PASS** ; 5 FAQ, tests focus clavier Enter/Space, débordement 0, requêtes externes 0 ; deux screenshots réels SHA256 consignés, pas inspectés directement par le modèle.
- Web Pilot local outil MCP existant : **6 appels PASS**, résultats `ADVISORY_NO_FLAGS`. Ce n'est pas un certificat WCAG, un E2E de l'origine publique ou un constat de Core Web Vitals terrain.
- Artifacts QA R92 (2 captures + 2 fichiers JSON) **purgés** ; clone Git isolé propre, aucun nouveau Chrome R92 actif. Diagnostic ciblé a identifié **40 processus Chrome headless plus anciens** (cinq profils locaux ~18:47–18:52), conservés faute d'owner/lease reconnu ; ne pas les attribuer à R92 ou les tuer en aveugle.
- 102 tests locaux Node/Python R91 déjà qualifiés (87 + 15) ; aucun changement de code depuis. Aucun statut CI indépendant constaté sur le dernier HEAD documentaire.

## Prochain gate réel

Soumettre les liens de visualisation R91 à l'examen du propriétaire. Pour promouvoir la PR #5 et publier, demander une autorisation distincte avec cible GitHub Pages/Cloudflare, ACL, rollback, approbation des pixels (dans un chemin autorisé) et E2E réellement déployé. Ne pas fusionner sur `main` au titre de la seule validation du lien.

`SOURCE_GATE=LIMITED`, `HOOKS_STATUS=UNKNOWN_STUDIO`, `FUNCTION_REPORT=PARTIAL`, `NO_DIRECT_MAIN`, `FREE_ONLY`.
