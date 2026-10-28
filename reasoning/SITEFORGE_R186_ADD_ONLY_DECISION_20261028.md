# R186 — ADD ONLY: 7e matériau rubans néon volumétriques

## Instruction prioritaire

Le propriétaire a expressément demandé : **« Ne modifie pas ce qui existe déjà, ajoute le »**. Conséquence : R185 devient la référence immuable et R186 ajoute exclusivement une nouvelle option dans la sélection de matériaux, sans altérer le reste de la vitrine ni ses réglages.

## Implémentation — preuve stricte

Base R185 SHA `6de5bee6a1bec0f3161a695a498ad9cdddb2ba69`.
Anciennes empreintes : shader `49baa2104c4200f25ff9bde63b90fda4ba9d1c60` ; HTML `a76dbbbd16fcf9bb36b807413bab84c12d4adaaa`.
R186 ajoute l'option **value=6 Rubans néon 3D · R186** à la fin des six options existantes. Le défaut **value=0** reste inchangé. Les couleurs, compte de particules, trois recettes A/B/C, schéma JSON et scripts UI existants restent byte-identiques.
La nouvelle branche shader `if(uPass>3.5&&uPass<4.5&&uFlow.x>5.5)` utilise le même pass volumétrique et le même `uSpinPhase`, mais calcule trois familles de rails toroidaux inclinés, colorées cyan/magenta, avec noyau et faisceaux diffus. Tout le shader historique suit ce bloc **sans changement**.

La méthode de preuve compare les octets du JS et HTML R186 après soustraction de ces deux seuls ajouts aux blob SHA d'origine : égalité exacte, **4/4 Node PASS**. Pas de duplication de moteur, pas de Worker ni broker supplémentaire.

## Essais

168/168 tests Node PASS ; build statique 49 fichiers PASS. Chrome Windows/WebGL SwiftShader pour la 7e option PASS avec différence de 70 944 pixels / 307 840 par rapport au matériau 0. Capture `r186-real-neon-material.png`. Aucun WebGL error. Régression complète des six matériaux sur la version précédente de la branche R186 PASS, tous leurs chemins étant inchangés et le chemin R186 exclusivement gardé.

## Limites artistiques / sécurité

La capture de la nouvelle sphère présente encore des rails doux plutôt que les reflets photoréalistes denses du visuel de référence. C'est une **première exploration**. Ne pas annoncer AAA final ni acceptation esthétique. Publication publique et E2E public restent à vérifier au premier checkpoint. Prévisualisation versionnée `r186.html`, production `main` et R185 inchangées ; rollback = supprimer seulement `r186.html`.

## Qualification publique finale

- Septième option matérialisée exclusivement par `flowType=6` ; les six options `0..5` et les valeurs par défaut restent identiques au blob source R185, comme prouvé par la reconstruction exacte des SHA d'origine.
- Page : https://inossarum.github.io/synestra-siteforge-r176-lab/r186.html — HTTP 200, GitHub Pages `built`, aucun écran Cloudflare Access ; commit Pages `918ab6212340b0c2f4aef515b5945744324137a4`, blob HTML `50f88eef0a10c8509618e587398d3d3a6994885a`.
- Chrome sur **l'URL publique** : E2E complet exit 0 (anciens matériaux 0-5, orbite et tactile, 390px, 18 contrôles plasma, 10 mote, JSON rétrocompatible, zéro erreur WebGL) ; smoke du nouveau matériau exit 0 ; rendu du nouveau matériau sur viewport mobile 390px exit 0, 14 échantillons, phase de rotation commune.
- 168/168 tests Node PASS, build statique 49 fichiers PASS, tests spécifiques `ADD ONLY` 4/4 PASS.
- Deux images réelles archivées : `r186-public-real-neon-material.png` commit `1e9cb8c9d30deede028f45b645aac7111da83a73` et `r186-public-neon-mobile.png` commit `5fda71d8d406dc3faa9498b6725a9c8f8a4b4b7b`.
- Evidence relue : `evidence/SITEFORGE_R186_ADD_ONLY_NEON_20261028.json` blob `97ccfa72cc18f750b5fc2d48a7d9b0856770497e`.
- Ancienne prévisualisation R185 blob toujours `cc2a5fe40c98654a6588f88b9b24594d838e96e8`, `main` toujours `df67fcd5cc6b7cc0fb42fa86c8920d28b9427494`, aucune modification de production.
- **Limite** : ce nouveau matériau est volontairement expérimental ; l'image de référence reste plus dense, plus nette et plus riche en reflets. Son rendu n'est pas esthétiquement accepté. Future itération strictement limitée à `flowType=6` sans changer l'existant.
