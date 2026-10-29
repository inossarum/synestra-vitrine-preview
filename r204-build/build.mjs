import {build} from 'esbuild';
import {cpSync,mkdirSync,readdirSync,copyFileSync,statSync,writeFileSync,readFileSync} from'node:fs';
import {join,dirname,resolve}from'node:path';
import{fileURLToPath}from'node:url';
const local=dirname(fileURLToPath(import.meta.url)),root=resolve(local,'..');
await build({entryPoints:[join(local,'scene.mjs')],bundle:true,minify:true,format:'esm',
 target:['es2022'],outfile:join(root,'assets','r204-scene.bundle.mjs'),
 legalComments:'linked',logLevel:'info',metafile:true}).then(({metafile})=>{
 const data=metafile.outputs[Object.keys(metafile.outputs).find(x=>x.endsWith('r204-scene.bundle.mjs'))];
 console.log('BUILT_THREE_THEATRE_GPU',data.bytes,'bytes');
});
// Generated Three.js GLSL literals contain trailing whitespace; normalize only whitespace,
// preserving exact source code and third-party license notices in the separate LEGAL.txt.
for(const path of [join(root,'assets','r204-scene.bundle.mjs'),join(root,'assets','r204-scene.bundle.mjs.LEGAL.txt')]){
 const old=readFileSync(path,'utf8');
 const normalized=old.replace(/[ \t]+(?=\r?$)/gm,'').replace(/(^|\n) +(?=\t)/g,'$1');
 if(old!==normalized)writeFileSync(path,normalized,'utf8');
}
const from=join(local,'node_modules','detect-gpu','dist','benchmarks'),to=join(root,'assets','r204-gpu-benchmarks');
mkdirSync(to,{recursive:true});
let count=0;
for(const n of readdirSync(from)){if(n.endsWith('.json')){copyFileSync(join(from,n),join(to,n));count++;}}
console.log('BENCHMARK_DATA_SELF_HOSTED',count);
