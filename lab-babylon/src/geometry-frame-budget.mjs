/** Pure CPU-mesh upload scheduler for an existing Babylon Scene and render loop. */
export const GEOMETRY_INTERVAL_MS=Object.freeze({economy:48,balanced:28,auto:28,ultra:20});
export function geometryUpdateDecision(previous,{now,time,quality,mode,power,radius,amount,turbulence}){
 if(![now,time,mode,power,radius,amount,turbulence].every(Number.isFinite)||
    now<0||!Object.hasOwn(GEOMETRY_INTERVAL_MS,quality)||power<0||power>250||
    mode<0||mode>3||radius<0||radius>2||amount<0||amount>200||
    turbulence<0||turbulence>2)throw new RangeError('R202_GEOMETRY_GATE_INVALID');
 const signature=[quality,mode,power,radius,amount,turbulence].join('|');
 const intervalMs=GEOMETRY_INTERVAL_MS[quality];
 const update=!previous||previous.signature!==signature||now<previous.at||
   (time!==previous.time&&now-previous.at>=intervalMs);
 return {update,intervalMs,next:update?{at:now,time,signature}:previous};
}
