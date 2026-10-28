# R182 — Microfacettes des cristaux 3D et réglages

## Intention / règles

Conserver l'architecture SiteForge R181 tout en renforçant la qualité visuelle des cristaux avec des imperfections localisées, sans scan lumineux, ajout de moteur WebGL ou modification de la production. Les éclats restent solidaires de la sphère à 360° et tournent exactement à la vitesse du plasma. FREE_ONLY et rollback versionné.

## Diagnostic et décision

R181 avait déjà trois normales, une réflexion spéculaire, une arête lumineuse, mais aucune variation fine propre à la surface. R182 introduit la variable `vMoteSeed` liée à l'identité 3D de chaque éclat. Dans le shader cristal seulement : micro-cellules déterministes, éraflure étroite contrôlée, perturbation bornée des normales et réglage de réflectivité. La brillance spéculaire change continûment avec la rugosité. Aucun shader ni contexte GPU additionnel ; les deux autres styles conservent leur branche spécifique.

Deux contrôles explicites (`moteRoughness` 0..100 %, par défaut 35 ; `moteReflectivity` 0..200 %, par défaut 95) complètent les 8 contrôles d'éclats existants. Le schéma `synestra.siteforge.plasma-settings.v1` et ses 18 paramètres plasma restent inchangés. Les anciens exports sans ces deux champs sont pris en charge par les valeurs par défaut.

## Régressions et preuve visuelle

- Tests Node : **151/151 PASS** ; export statique : **49 fichiers allowlist PASS**.
- Chrome réel Windows / WebGL : **exit 0**, 6/6 matériaux, 390px mobile, souris/tactile, 180/360° et vitesse commune, WebGL error 0.
- Capture avec animation et caméra figées, cristal rugosité 0/réflectivité 0 contre rugosité 100/réflectivité 200 : **30 449 pixels modifiés sur 307 840 (9,89 %)**, signal GPU mesurable. Le changement est provoqué par les deux contrôles conjoints ; ne pas attribuer séparément les pixels à chaque paramètre.
- Export et réimport JSON, anciens fichiers et refus atomique invalide : PASS. Budget mobile dynamique R181 conservé.
- Captures : `r182-crystal-matte.png`, `r182-crystal-surface.png`.

## Publication et rollback

Source prévue : `task/SYN_SITEFORGE_R182_CRYSTAL_MICROFACETS_20261028` (base R181 `c10a99948a02a0ab11c9f31b7e318bc64a8b9157`). Export HTML autonome SHA-pinné et page de labo `r182.html` séparée de R176–R181. Aucun déploiement sur `main`, aucun changement Access, paiement ni secret. Rollback : revenir à R181, et retirer uniquement `r182.html` si nécessaire.

## Statut

LOCAL_E2E_PASS. Vérification navigateur HTTPS de la page publique R182 encore PENDING ; acceptation visuelle propriétaire PENDING. La publication ou le commit seul ne doit pas être appelé DONE.
