/**
 * R202.60 — fail-safe, deterministic performance profile selection.
 * Hardware keeps the established balanced visual output.
 * Chrome SwiftShader chooses the validated economy renderer automatically.
 */
export function resolveSphereQuality(selected,renderer){
 if(!['auto','economy','balanced','ultra'].includes(selected))
  throw new RangeError('AUTO_QUALITY_INVALID');
 if(typeof renderer!=='string')throw new TypeError('AUTO_RENDERER_INVALID');
 if(selected!=='auto')return selected;
 return /swiftshader/i.test(renderer)?'economy':'balanced';
}
