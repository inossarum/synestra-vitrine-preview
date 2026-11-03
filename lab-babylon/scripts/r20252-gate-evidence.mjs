export function classifySnapshotEvidence(comparisons, tolerance=0.01) {
  if(!Array.isArray(comparisons) || comparisons.length===0 || !Number.isFinite(tolerance) || tolerance<=0) throw new TypeError('R20252_EVIDENCE_INPUT_INVALID');
  let uiMeanStable=true;
  for(const item of comparisons){
    const delta=item?.candidate_minus_baseline?.ui_control?.mean;
    if(!Number.isFinite(delta)) throw new TypeError('R20252_UI_MEAN_DELTA_INVALID');
    if(Math.abs(delta)>=tolerance) uiMeanStable=false;
  }
  const offRows=comparisons.filter(item=>item?.power===0);
  if(offRows.length!==1) throw new TypeError('R20252_POWER_OFF_COMPARISON_AMBIGUOUS');
  const offMeanDelta=offRows[0]?.candidate_minus_baseline?.facet_focus?.mean;
  if(!Number.isFinite(offMeanDelta)) throw new TypeError('R20252_POWER_OFF_DELTA_INVALID');
  const powerOffMeanStable=Math.abs(offMeanDelta)<tolerance;
  return {
    ui_control:uiMeanStable?'NOT_ATTESTED':'FAIL',
    ui_control_mean_delta:uiMeanStable?'PASS':'FAIL',
    power_off:powerOffMeanStable?'NOT_ATTESTED':'FAIL',
    power_off_mean_delta:powerOffMeanStable?'PASS':'FAIL'
  };
}
