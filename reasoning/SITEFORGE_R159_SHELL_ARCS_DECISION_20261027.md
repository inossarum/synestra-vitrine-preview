# SiteForge R159 — Coque indépendante et éclairs contextuels

MISSION_ID=SYN_SITEFORGE_R159_SHELL_ARCS_SEPARATION_20261027
OWNER=ChatGPT (périmètre de branche isolée)
SOURCE_BASE=045ed77d5d50e4b6f99fe0fe15878c2289411841
SOURCE_CODE=0e759d0f0515aba932f08f1a47b4be634baa7818
EVIDENCE=evidence/SITEFORGE_R159_SHELL_ARCS_20261027.json
STATUS=SOURCE_ONLY_PARTIAL ; PREVIEW_GATE=PENDING ; FULL_BROWSER_E2E=NOT_PROVEN

## Intention propriétaire et contraintes
La capture montre un flux cyan/violet intéressant, mais « Matière sphérique visible » est couplé à la luminosité de l'intérieur : à zéro, la coque disgracieuse disparaît et les courants s'atténuent. Le bloc « Éclairs intérieurs » est sans utilité pour cette émission et son rendu ressemble à une constellation de points, pas à des arcs électriques.

Préserver l'unique sphère R158, son volume ray-marché, cinq matériaux, noyau, palette, 18 champs et export JSON, valeurs propriétaire inchangées. Ne créer aucun moteur/sphère/worker supplémentaires.

## Décision technique
1. Isoler le facteur `uShape.y` sur le brouillard de coque (`shellFog`) et sur la bordure optique. Supprimer ce facteur de `currents*.27*emission`, afin qu'un réglage à zéro supprime la coque sans couper les courants.
2. Rendre « Éclairs » contextuel : actif exclusivement en `flowType=0` + `particlePreset=1` (« Plasma électrique »). Cacher le fieldset dans les autres modes, sans détruire ni remettre à zéro ses valeurs exportables.
3. Remplacer la chaîne de sprites ponctuels par un tracé `GL.LINES`, avec une paire de sommets par segment et une extrémité commune entre segments successifs. Garder l'émetteur GPU existant et les budgets bornés.
4. Ne pas intervenir sur l'ancienne branche preview Cloudflare R158, ni élargir une allowlist de branche ou exposer une nouvelle preview non autorisée.

## Vérifications et limites
Échec d'abord : trois tests R159 FAIL sur code R158, quatrième PASS. Après correction sur clone isolé Inos-Cerebros : les suites ciblées R137/R159 PASS. Lecture indépendante des quatre fichiers exacts depuis GitHub après commit : 10 contrôles structuraux PASS. La tentative ultérieure de suite Node complète a provoqué un timeout Desktop Commander : statut UNKNOWN et non PASS. Aucune inspection WebGL R159 via un vrai framebuffer n'est attestée. Le rendu des nouveaux traits lumineux est donc candidat, pas artistiquement validé.

## Récupération
Rollback code = R158 `045ed77d5d50e4b6f99fe0fe15878c2289411841`. La preview R158 `7d9018b8.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/` reste intacte. Aucun merge main, déploiement production, coût PAYG, changement Cloudflare Access ou modification de Visual Observer.

NEXT=Récupérer l'exécution locale et le contrôle des hooks/leases ; relancer Node complet et navigateur WebGL à SHA exact ; fournir une preview autorisée effectivement ouvrable et comparer coque 0/100, mode électrique activé/désactivé, matériaux non électriques ; décision esthétique propriétaire.
