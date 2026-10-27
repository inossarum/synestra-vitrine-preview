# Owner configuration baseline — SiteForge R156 plasma

MISSION_ID=SYN_SITEFORGE_R156_OWNER_APPROVED_PLASMA_CALIBRATION_20261027
OWNER=Inos
DATE=2026-10-27
EVIDENCE=evidence/SITEFORGE_R156_OWNER_SELECTED_PLASMA_SETTINGS_20261027.json
UPLOADED_JSON_SHA256=65fe1646ee0528ecee3219c575bc5ce2743a0294c71d87a4e963fa6d47c47b70
STATUS=OWNER_CANDIDATE_REFERENCE__NO_RUNTIME_MUTATION

The owner uploaded actual R156 JSON settings and wrote: "avec ces paramètres là on commence à être pas mal... mais il y a des effets qui pour le moment sont en trop. je les ai mis à 0". Use this as an **owner-selected candidate visual baseline**, not an approved permanent default. The owner explicitly zeroed arcIntensity=0 and arcDensity=0, hiding the internal lightning emitter in the existing renderer. particlePreset=4 disables extra particle emitter, despite particleDensity=250% and particleIntensity=200%. Do not misreport particleIntensity as globally ineffective: current R156 volumetric raymarch shader still uses it as emission multiplier. Likewise particleSpeed=250% changes the animated 3D field. sphere material visible 100%; diameter 131%; core radius 157%; core power 108%; opacity 9%; particleSize 80%; colors unchanged from original plasma palette.

Decision: **do not remove these subsystems, reactivate the effects, reset controls, override the user's saved JSON, or change default presets without a subsequent specific instruction**. Prefer reusing the exact attachment's SHA256-identified values for next visual comparisons. Not a final aesthetic DONE claim.

Evidence is an owner attachment plus source-level branch behavior checks; there was no new browser render or deployment in this response and no authored production/runtime mutation. The memory record is non-authoritative for active running page state; it records owner calibration intent only.
