---
document_id: VITRINE_SITEFORGE_R96_OFFICIAL_BRAND_DECISION_20261025
document_type: REASONING
status: ACTIVE_MISSION_CHECKPOINT
mission_id: SYN_VITRINE_SITEFORGE_SHOWCASE_20261024
owner: Inos
evidence: evidence/VITRINE_SITEFORGE_R96_OFFICIAL_BRAND_20261025.json
exact_code_head_at_tests: bf8ef0c693ea6f3fb8819cdb4460fff12dd2ecc7
release_gate: HOLD
---

# R96 — Identité officielle Synestra Studio intégrée à la vitrine

## Autorité produit et intention
Le propriétaire a approuvé un PNG particulier en tant que **logo officiel Synestra Studio V1**, conservé dans `/Synestra/Identite/Synestra_Studio_Logo_Officiel_V1.png` avec SHA256 `c83dc24f18df338c359e9da4c58913e29c54bafa94357734e70820125e01b9bd`. Il demande de reprendre la vitrine avec ce logo et cette charte : chrome, violet plutôt que rose, cyan/bleu et vert/turquoise, rendu futuriste davantage vivant, mais professionnel. La source SVG Web App antérieure ne constituait pas ce nouveau logo approuvé.

## Décision et delta
- Le PNG canonique RGBA 1254×1254 reste inchangé dans la bibliothèque.
- Le dérivé public léger **AVIF RGBA 400×400 (20 508 octets)** a été conservé sous `assets/synestra-studio-official-v1.avif` : SHA256 `511d1454953ebca11b4547036960d4aa9613eb294d03268a2b2e2cf9ab89bb8c`, Git blob `5871125a3b934acd93613201b56bc75f2a81a231`. Le dérivé N'EST PAS byte-for-byte identique au PNG ; ce fait est explicite pour éviter les fausses preuves de correspondance.
- La vitrine affiche cet AVIF local dans le header et le noyau de sa scène conceptuelle, sans dépendance tierce ; les animations CSS (orbites, radar, glints, logo flottant, workflow) se désactivent avec `prefers-reduced-motion`.
- Bridge, Connect et SiteForge restent décrits sans promesse d'une session live, sans faux clients ni disponibilité universelle.
- La charte réemploie noir/bleu nuit profond, acier, violet, cyan et touches vertes. Des éléments HTML sémantiques et le clavier sont préservés.

## Qualification réelle et limites
Code exact vérifié au HEAD `bf8ef0c693ea6f3fb8819cdb4460fff12dd2ecc7` :
- 105/105 tests Node PASS, 15/15 Python PASS.
- Chrome headless/CDP avec cinq formats **320, 390, 768, 1440 et 1920 px** PASS ; aucune largeur de document hors viewport ; images chargées aux deux emplacements ; préférence de réduction du mouvement respectée ; interactions clavier/FAQ PASS.
- Web Pilot local six appels MCP PASS, `ADVISORY_NO_FLAGS`; cela ne constitue pas des Core Web Vitals réels mesurés.
- HTTP 200 sur la page R96, son AVIF, SiteForge et Signature à partir du commit exact via le proxy public raw.githack.
- Les captures Chrome produites localement et leurs SHA sont consignés dans Evidence R96. Elles ne sont **pas** inspectées directement par le modèle, faute de transport natif de pixels Visual Observer établi. QA visuelle esthétique = **NON ATTESTÉE**.
- L'icône déjà distribuée par le plugin Synestra Connect n'est pas attestée *byte-for-byte* identique au nouveau logo officiel Studio. Ne pas confondre ces deux assertions.

## Alternatives rejetées
- Remettre l'ancien SVG Web App en tant que « vrai logo Connect » : non prouvé et rejeté.
- Insérer le PNG 1,5 MB à chaque rendu alors qu'un dérivé AVIF transparent vérifié est disponible : coût de chargement inutile.
- Ajouter une bibliothèque 3D/JS/Worker ou un deuxième broker seulement pour animer la vitrine : hors périmètre, CSS et progressivité suffisent.
- Déclarer les captures `PASS esthétique` sans inspection de leurs pixels : rejeté.
- Fusionner sur main ou déployer avant décision de publication du propriétaire : interdit ; PR #5 DRAFT.

## Livraison, rollback et prochaines conditions
- **LIVRABLE CANDIDAT :** https://raw.githack.com/inossarum/synestra-vitrine-preview/bf8ef0c693ea6f3fb8819cdb4460fff12dd2ecc7/index.html
- **RELEASE=HOLD**, aucun merge, aucune mise en ligne officielle, aucune mutation Cloudflare/IAM, aucune dépense.
- **Rollback :** revert ciblé des deltas R96 sur la branche vitrine PR #5, puis tests Node + Python + Chrome. Le main et les autres PR restent intacts.
- **NEXT :** recueillir la validation visuelle humaine de R96, ou corriger les écarts observés ; qualifier Visual Observer indépendamment si nécessaire ; ensuite seulement effectuer un préflight de publication avec approbation distincte et E2E cible.
