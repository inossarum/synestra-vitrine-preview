# R187 Labo 3D — restitution après correction CSP

- Le blocage précédent était une **CSP non mise à jour** après modification du script shader. `script-src` bloquait le JavaScript inline ; le moteur WebGL n'était pas en cause. Correctif strict : calcul de l'empreinte SHA-256 exacte du script modifié, sans `unsafe-inline`.
- Refactorisation ciblée du **septième matériau exclusivement** : gaussiennes des rails plus fines, accentuation des reflets, atmosphère moins dominante et réduction de la surexposition du noyau.
- Preuve add-only : reconstitution octet pour octet du R186 en restaurant seulement le shader du matériau 7, le libellé, le titre et l'empreinte CSP : **4/4 tests Node PASS**.
- Chrome sous HTTP local : **E2E PASS** (7 matériaux, 18 contrôles, sélections 0 à 6, WebGL sans erreur, capture PNG réelle `evidence/r187-neon-http-real.png`). `SwiftShader` est le moteur de test ; GPU matériel et mobile physique non attestés.
- R187 est accessible uniquement en loopback `http://127.0.0.1:19087/siteforge-r187-autonome.html?demo=magnetic` sur `Inos-Cerebros`. R186 public inchangé ; aucune publication ou déploiement R187.
- Qualité artistique : contraste et lisibilité meilleurs que les essais trop lumineux, mais validation AAA du propriétaire encore **PENDING**. L'A/B R187b a été essayé sans gain suffisamment net pour remplacer la variante retenue.
- L'ancien checkpoint `SITEFORGE_R187_COLD_WEBGL_QA_20261028.json` reste une preuve historique de l'échec, **supplantée par le diagnostic CSP** et par `SITEFORGE_R187_CSP_RECOVERY_VISUAL_20261028.json`.
