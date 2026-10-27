# SiteForge R160 — suppression du style de plasma redondant

MISSION_ID=SYN_SITEFORGE_R160_PURE_MATERIAL_20261027
OWNER=Inos (intent) / ChatGPT (code isolé)
SOURCE_BASE=R159@112fbc93275193556b8d57a1a9250d93d8fcbb04
CODE_VERIFIED=5627c97e5d866b2e6cfb6a274a18e4f5d83047ad
EVIDENCE=evidence/SITEFORGE_R160_PURE_FLOW_20261027.json
STATUS=R160_SOURCE_VERIFIED; PREVIEW_PENDING

## Intention et jugement esthétique
Le retour utilisateur identifie clairement « Plasma pur » comme le seul style compatible avec l'effet volumétrique (illustration du sélecteur « Vortex ionique »). Référence déjà approuvée : une seule famille de flux énergétique visible sans couches concurrentes. Le moteur R157/158 dispose déjà de cinq **matériaux énergétiques 3D**, tandis que l'ancien sélecteur « Style du plasma » règle surtout une couche de particules additionnelle, qui brouille le visuel.

## Décision
Supprimer le contrôle visible « Style du plasma » au lieu de créer une sixième version du même effet. Conserver le champ de compatibilité `particlePreset` à 4 en hidden (`data-default=4`, `value=4`) pour garantir que le rendu et le reset restent « Plasma pur » et que l'export JSON conserve les 18 champs v1. Ne pas toucher à la sphère, au volume ray-marché, aux palettes ni aux cinq familles `flowType`.

L'ancien émetteur supplémentaire et la fonctionnalité d'éclairs R159 demeurent dans le code pour compatibilité, mais inaccessibles dans l'interface R160 tant que `particlePreset=4`; aucun sprite supplémentaire ni éclair n'est dessiné en usage normal. Leur suppression de code définitive est une décision distincte (risque de régression sans intérêt immédiat).

## Validation et sécurité
Tests nouveaux avant correctif : 3 FAIL sur HTML R159, 1 PASS. Après correction, 34/34 PASS dans harness V8 isolé avec le vrai JS et des doubles DOM/GPU de la suite existante; ne pas confondre ce résultat avec un navigateur WebGL ni un build Node réel. Test d'acceptation R160 branché sur `tests/site_contract.test.mjs` du build Cloudflare existant; application à confirmer par déploiement.

Politique Cloudflare Pages constatée : `production_deployments_enabled=false`; preview branch autorisée `task/SYN_SITEFORGE_R116_CLEAN_LAB_20261027`. Ne pas ouvrir une nouvelle allowlist, ne pas créer de Worker/second moteur, ne pas utiliser PAYG; rollback preview sur R158 SHA `045ed77d5d50e4b6f99fe0fe15878c2289411841`.

NEXT=Réutiliser PR8 et branche preview autorisée après revalidation des refs; observer succès du build/URL, faire QA WebGL réelle si une exécution gratuite est disponible, sinon rester PARTIAL et signaler le gate esthétique.
