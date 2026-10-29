import {readFileSync} from 'node:fs';
import {comparePngPixels} from '../../tests/siteforge_r174_png_diff.mjs';
const file=n=>readFileSync(new URL('../evidence/'+n,import.meta.url));
for(const width of [1100,390]){
 const result=comparePngPixels(file('r193-light-core0-'+width+'.png'),file('r194-glow-core0-'+width+'.png'));
 console.log('R193_R194_DIFF',width,JSON.stringify(result));
}
