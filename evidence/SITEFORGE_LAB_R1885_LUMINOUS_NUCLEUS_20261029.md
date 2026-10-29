# Labo 3D R188.5 — restoration du noyau lumineux

MISSION_ID=SYN_SITEFORGE_LAB_R1885_LUMINOUS_NUCLEUS_20261029
DATE=2026-10-29
BASE_BRANCH=task/SYN_SITEFORGE_R1884_UNIVERSAL_FLUX_20261029
BASE_HEAD=9962e09fe01dcf1217b1285e1e28342a7b76ba67
SOURCE_SHA256=FAA9A7A50EBDA90E2D417063004ABC7A1FE1FED300854054EB562A8AAE3B8CAB
BRANCH=task/SYN_SITEFORGE_LAB_R1885_LUMINOUS_NUCLEUS_20261029
OWNER=Synestra Studio
PREVIEW=http://127.0.0.1:19106/siteforge-r1885-autonome.html?demo=energy&material=6
TARGET=LAB 3D standalone, not marketing website
PUBLIC_DEPLOYMENT=NO
ART_ACCEPTANCE=PENDING

## Diagnostic réel
Le noyau de matériau R187/R188 apparaissait presque absent en image : la branche énergétique `uFlow.x>5.5` calcule un `coreNeon` avec puissance .14 et alpha .40, sans relier le rendu aux curseurs `uShape.z` (taille) et `uShape.w` (puissance). La première tentative de correction du rendu volumétrique 0..5 ne modifiait pas cette branche 6..8 : les captures A/B l'ont prouvé et cette tentative a été corrigée dans la même révision.

## Correctif
- Version add-only `siteforge-r1885-autonome.html` produite par `tools/build_r1885_nucleus.py` depuis R1884 au SHA immuable.
- Deux branches WebGL dans le même shader existant : restauration du noyau lumineux raymarch 0..5 et du noyau central des filaments 6..8.
- R187/188 flux, turbulence, palette et contrôles historiques conservés. Le rayon lumineux varie avec la taille du noyau, et la radiance avec sa puissance; à zéro, la projection lumineuse est désactivée.
- CSP hash recalculé, pas de `unsafe-inline` supplémentaire, aucune nouvelle ressource externe, aucun nouveau renderer/canvas, zéro nouveau coût.
- `siteforge-r1885-autonome.html` SHA256 F31F10C3210C6F840CB3B7CEC3D372DDACE9438DEF66CDB1B807627C29964741.

## Tests et preuve native via Desktop Commander
- Chrome headless Windows `--use-angle=d3d11`, renderer natif ANGLE RTX 3090, HTTP 127.0.0.1, WebGL error=0, data-core-ready=true.
- Matériau 6 comparé AVANT (R1884) / APRÈS (R1885) sur canvas à 1100px et 390px ; le noyau central blanc est visible et les filaments originaux restent visibles.
- Failure-first : puissance du noyau 0 et taille 0, chacun vérifié dans navigateur et PNG comparatifs. Noyau actif = davantage de pixels lumineux au centre dans les deux résolutions.
- E2E additionnel : matériaux 0 et 8, captures navigateur RTX3090 WebGL sans erreur.
- Rapport `evidence/SITEFORGE_LAB_R1885_BROWSER_20261029.json`, captures 10 PNG (A/B, OFF, familles).
- `node --test tests/siteforge_r1885_nucleus.test.mjs tests/siteforge_r1884_universal.test.mjs tests/siteforge_r1884_catalogue.test.mjs tests/siteforge_r1883_isolation.test.mjs` : 17 PASS, 0 FAIL.
- Sources tests browser : `tests/siteforge_r1885_nucleus_browser.mjs`, tests statiques : `tests/siteforge_r1885_nucleus.test.mjs`.

## Limites
La mesure est une validation de pixels/réglages réels sur RTX3090, pas un test sur GPU modeste. Mobile = viewport émulé, pas téléphone physique. Les animations sont temporelles et les deux captures avant/après ne sont pas à phase fixe. La préférence artistique finale doit être revue par le propriétaire.
Le worktree R1884, la vitrine R209 créée précédemment, `main`, Cloudflare et le déploiement public restent inchangés. La branche d'essai R209 ne constitue pas le correctif demandé.
