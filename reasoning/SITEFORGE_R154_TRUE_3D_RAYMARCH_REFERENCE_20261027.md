# SiteForge R154 — reference image translated into true volumetric 3D plasma WebGL

MISSION_ID=SYN_SITEFORGE_R154_REFERENCE_IMAGE_TO_3D_PLASMA_20261027
OWNER=Inos
DATE=2026-10-27
EVIDENCE=evidence/SITEFORGE_R154_REFERENCE_3D_VOLUME_REAL_BROWSER_20261027.json
DEPLOYED_SHA=1bc7663e212423fc8adb37e750a99aaf51bd1add
DEPLOYMENT=e3fcb95f-a452-4e96-b0bb-719c44715ae0
PREVIEW=https://e3fcb95f.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/
STATUS=PREVIEW_DEPLOYED_69_PASS__3D_CHROMIUM_GPU_PIXEL_PROOF__ART_FIDELITY_AND_PERFORMANCE_PENDING

## Source, requirement and selected implementation
User instructed: "tu dois reproduire ça avec SiteForge en 3D. Utilise la tech que tu veux. PROTOCOLE SYNESTRA OBLIGATOIRE !" Here "ça" is the most recent generated reference image, an unobstructed blue/violet plasma globe whose broad cyan spiral rivers converge on a small white-hot nucleus, with many fine purple filament branches and no metal ring. This image was visible within the current conversation, not fetched from an external URL or written into product assets. Grounded visual criteria: 3D volume/depth, luminous interior, robust silhouette, broad sweeping streams, compact central power source, scattered electric arcs, and cyan/indigo/violet palette.

R153's full-screen quad only calculated planar procedural fields at the front of the sphere and overlaid GPU sprites, thus mathematically incapable of depicting integrated back-to-front energy. Avoid an unrelated Three.js scene or separate plugin/service under REUSE_FIRST. R154 reuses the ONE existing VFX WebGL1 shader program, emitter system, one canvas and all 16 existing controls. Its quad pass uses a real raymarch over a sphere: each pixel integrates a series of 3D point samples q=(x,y,z) from front to rear inside analytic sphere bounds, rotates the 3D samples for pointer parallax, accumulates wavelength-like emission and Beer-Lambert-inspired transmittance. Multiple volumetric winding/noise bands generate broad curling cyan/violet streams rather than a flat marble. Core white-hot radiance uses a separate radius scalar independent from intensity. The volume has an optically thin peripheral rim and transparent exterior, while preexisting lightning, compact core and additional particles remain separate passes of the SAME shader. No extra WebGL renderer, server, identity, Bridge or network call.

Efficiency: fixed compile cap 22 ray steps, runtime 14 steps mobile / 22 desktop; 1 trilinear 3D noise and cheap analytic detail per step; mobile max DPR 1.5, bounding pixel budget 650000, desktop high quality. Screen CSS zoom had historically reduced sphere to .49 desktop/.8 mobile even though the user's visual target fills most of its image; new .92 desktop/1.22 mobile, including matching static fallback. Reduce overly dotted shell-spark emissions and broaden volumetric cyan/violet ribbons, better approximating the reference. Original R153 preview remains rollback.

## Failure-first and actual browser verification
A preliminary preview build (deployment 9666b01c) failed exactly two old tests: R153 version stamp and a now-removed 2D 'vec3 plasma' shader expression; old tests were brought up to the new 3D raymarch contract, not disabled. Final Cloudflare isolated preview e3fcb95f-a452-4e96-b0bb-719c44715ae0 for source SHA 1bc7663e212423fc8adb37e750a99aaf51bd1add succeeded in queued, initialize, clone, build and deploy; static export PASS, tests 69/69 PASS.

Crucially, use a real Chromium WebGL browser (Cloudflare Browser Rendering) at mobile 390×844 and 410×520. Due to Cloudflare Access on the actual preview, load the **exact checked-in HTML/JS source** into Browser Rendering's isolated HTML input, removing the CSP meta solely in that test fixture to allow inlined JS (the deployed CSP remains unchanged). Confirm WebGL compile/link and draw submissions for the full-screen volumetric pass plus the GPU sprite shell, internal arcs, nucleus and optional VFX; gl.getError()=0 and no JS errors. Measure gl.readPixels at several framebuffer coordinates to show center white-blue, interior blue/violet gradients, outside fully transparent. Four VFX modes yield distinct RGBA samples in the 3D volume when switched by actual native select events. A real Chromium jpeg screenshot was successfully generated and visually inspected; the volumetric swirl is visible, but simpler/less intricate than the owner's photoreal reference.

Do not claim AAA or exact visual reproduction. Relative headless Chromium probe: R153 old shader about 20 draw frames in a comparable 850ms period, R154 raymarch about 9 draw frames. This is *not* stable FPS measurement nor an iPhone test. Treat mobile performance and visual fidelity as the remaining quality gates, not an incident that invalidates tested deploy. Avoid costly alternative infrastructure under FREE_ONLY.

## Durability, rollback, NEXT
- Source: assets/siteforge-r116-sphere-only.js blob 4e7fb318d89d5db1ce1d17bae77be3e4cc5a60dd.
- HTML: siteforge/core-3d-lab/index.html blob 5603f0fc2cbf3531513ee74115cd9f4ff49804ec.
- Tests: R137 blob 0be0ab6568b44eceb76afacbdaac6cd6506534b4; R132 blob f5bdada513fa33b019e5d35cf7a46c94152e556b; R136 blob 719e28d3be6569968c5dd4992b3357a2d28f6490.
- Rollback R153: https://f27d23fa.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/
- Production/main, ACL, Visual Observer unchanged. No paid resource or main deployment.
- NEXT: obtain owner inspection on their authenticated Safari; compare to reference for scale, ribbon structure, violet energy and frame smoothness. If a concrete mismatch is identified, do ONE bounded quality/performance delta and capture real before/after; consider WebGL2 only as separately qualified enhancement, never assert unsupported engine parity.

SOURCE_GATE=LIMITED (final owner artistic approval and iPhone render performance unknown)
HOOKS_STATUS=UNKNOWN
FUNCTION_REPORT=PARTIAL
