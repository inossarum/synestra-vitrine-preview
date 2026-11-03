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
  // Exact native capture contract: frames 6/18 at 145%, plus frame 6 at 0%.
  // Neither an incomplete set nor duplicated/substituted frames may attest gates.
  const required=new Set(['6:145','18:145','6:0']);
  const observed=new Set();
  for(const item of comparisons){
    if(!Number.isInteger(item?.frame)||!Number.isFinite(item?.power))throw new TypeError('R20252_COMPARISON_SET_INVALID');
    const key=item.frame+':'+item.power;
    if(!required.has(key)||observed.has(key))throw new TypeError('R20252_COMPARISON_SET_INVALID');
    observed.add(key);
  }
  if(observed.size!==required.size)throw new TypeError('R20252_COMPARISON_SET_INVALID');
  return {
    ui_control:uiMeanStable?'NOT_ATTESTED':'FAIL',
    ui_control_mean_delta:uiMeanStable?'PASS':'FAIL',
    power_off:powerOffMeanStable?'NOT_ATTESTED':'FAIL',
    power_off_mean_delta:powerOffMeanStable?'PASS':'FAIL'
  };
}

export function compareRoiRgb(reference,candidate,zone) {
  const goodImage=img=>img&&Number.isInteger(img.width)&&img.width>0&&Number.isInteger(img.height)&&img.height>0&&(img.bpp===3||img.bpp===4)&&img.stride===img.width*img.bpp&&img.data?.length===img.stride*img.height;
  if(!goodImage(reference)||!goodImage(candidate)||reference.width!==candidate.width||reference.height!==candidate.height)throw new TypeError('R20252_ROI_IMAGE_INVALID');
  const {x0,x1,y0,y1}=zone||{};
  if(![x0,x1,y0,y1].every(Number.isInteger)||x0<0||y0<0||x1<=x0||y1<=y0||x1>reference.width||y1>reference.height)throw new RangeError('R20252_ROI_BOUNDS_INVALID');
  let changedPixels=0,maxChannelDelta=0,sumAbs=0;
  for(let y=y0;y<y1;y++)for(let x=x0;x<x1;x++){
    const i=y*reference.stride+x*reference.bpp,j=y*candidate.stride+x*candidate.bpp;
    let changed=false;
    for(let c=0;c<3;c++){
      const delta=Math.abs(reference.data[i+c]-candidate.data[j+c]);
      sumAbs+=delta;
      if(delta!==0)changed=true;
      if(delta>maxChannelDelta)maxChannelDelta=delta;
    }
    if(changed)changedPixels++;
  }
  const pixels=(x1-x0)*(y1-y0);
  return {pixels,changed_pixels:changedPixels,max_channel_delta:maxChannelDelta,
    rgb_mean_absolute_delta:Number((sumAbs/(pixels*3)).toFixed(6)),exact_rgb_match:changedPixels===0};
}
