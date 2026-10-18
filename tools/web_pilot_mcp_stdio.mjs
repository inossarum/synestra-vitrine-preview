/** Synestra Web Pilot local read-only MCP stdio v2025-06-18.
 * JSON-lines, Node built-ins only. NO browser, filesystem, network, host access.
 * This is NOT a deployed or authenticated remote ChatGPT tool.
 */
import readline from 'node:readline';
import {inspectCapture,compareCaptures} from './web_pilot_core.mjs';
let initialized=false;
const transport='2025-06-18';
const maxBytes=65536;
const tool=(name,field,description)=>{
 const schema=field==='capture'?
  {type:'object',additionalProperties:false,required:['capture'],properties:{capture:{type:'object'}}}:
  {type:'object',additionalProperties:false,required:['before','after'],properties:{before:{type:'object'},after:{type:'object'}}};
 return {name,description,inputSchema:schema,annotations:{readOnlyHint:true,destructiveHint:false,openWorldHint:false,idempotentHint:true}};
};
const tools=[
 tool('synestra_web_inspect_capture','capture','Audit an already-supplied, untrusted website capture. Cannot access host or certify WCAG.'),
 tool('synestra_web_compare_captures','pair','Compare two already-supplied captures at identical viewport; no automatic site changes.')
];
const error=(id,code,message)=>({jsonrpc:'2.0',id,error:{code,message}});
const ok=(id,result)=>({jsonrpc:'2.0',id,result});
const exact=(value,names)=>value&&typeof value==='object'&&!Array.isArray(value)&&
  Object.keys(value).sort().join('|')===names.slice().sort().join('|');
function handle(msg) {
 if(!msg||typeof msg!=='object'||Array.isArray(msg)||msg.jsonrpc!=='2.0')return error(null,-32600,'Invalid Request');
 const id=Object.hasOwn(msg,'id')?msg.id:null;
 if(id!==null&&!(typeof id==='string'&&id.length<=64)&&!(typeof id==='number'&&Number.isSafeInteger(id)))return error(null,-32600,'Invalid ID');
 if(typeof msg.method!=='string')return error(id,-32600,'Invalid Method');
 if(msg.method==='initialize'&&id!==null){
  initialized=true;
  return ok(id,{protocolVersion:transport,capabilities:{tools:{}},serverInfo:{name:'synestra-web-pilot-local',version:'0.1.0'}});
 }
 if(msg.method==='notifications/initialized'&&id===null)return null;
 if(id===null)return null;
 if(!initialized)return error(id,-32002,'Not initialized');
 if(msg.method==='ping')return ok(id,{});
 if(msg.method==='tools/list')return ok(id,{tools});
 if(msg.method!=='tools/call')return error(id,-32601,'Method not found');
 const p=msg.params;
 if(!exact(p,['name','arguments'])||typeof p.name!=='string')return error(id,-32602,'Invalid tool parameters');
 let result;
 if(p.name==='synestra_web_inspect_capture'&&exact(p.arguments,['capture']))
  result=inspectCapture(p.arguments.capture);
 else if(p.name==='synestra_web_compare_captures'&&exact(p.arguments,['before','after']))
  result=compareCaptures(p.arguments.before,p.arguments.after);
 else return error(id,-32602,'Unknown tool or arguments');
 return ok(id,{content:[{type:'text',text:JSON.stringify(result)}],structuredContent:result,isError:result.status==='REJECTED'});
}
const rl=readline.createInterface({input:process.stdin,crlfDelay:Infinity});
rl.on('line',line=>{
 let response;
 try{
  if(Buffer.byteLength(line,'utf8')>maxBytes)response=error(null,-32700,'Message size exceeded');
  else response=handle(JSON.parse(line));
 }catch{response=error(null,-32700,'Invalid JSON');}
 if(response!==null)process.stdout.write(JSON.stringify(response)+'\n');
});
