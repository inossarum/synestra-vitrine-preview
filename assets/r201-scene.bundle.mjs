var Ug=Object.create;var Uh=Object.defineProperty;var Fg=Object.getOwnPropertyDescriptor;var Bg=Object.getOwnPropertyNames;var zg=Object.getPrototypeOf,Vg=Object.prototype.hasOwnProperty;var Fh=(n,e)=>()=>(e||n((e={exports:{}}).exports,e),e.exports);var kg=(n,e,t,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of Bg(e))!Vg.call(n,r)&&r!==t&&Uh(n,r,{get:()=>e[r],enumerable:!(i=Fg(e,r))||i.enumerable});return n};var Gg=(n,e,t)=>(t=n!=null?Ug(zg(n)):{},kg(e||!n||!n.__esModule?Uh(t,"default",{value:n,enumerable:!0}):t,n));var Ct=Fh($f=>{var uu=Object.defineProperty,gb=Object.defineProperties,_b=Object.getOwnPropertyDescriptors,xf=Object.getOwnPropertySymbols,vb=Object.prototype.hasOwnProperty,yb=Object.prototype.propertyIsEnumerable,bf=(n,e,t)=>e in n?uu(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,xb=(n,e)=>{for(var t in e||(e={}))vb.call(e,t)&&bf(n,t,e[t]);if(xf)for(var t of xf(e))yb.call(e,t)&&bf(n,t,e[t]);return n},bb=(n,e)=>gb(n,_b(e)),Sb=n=>uu(n,"__esModule",{value:!0}),Mb=(n,e)=>{Sb(n);for(var t in e)uu(n,t,{get:e[t],enumerable:!0})};Mb($f,{Atom:()=>Zf,PointerProxy:()=>bw,Ticker:()=>Kf,getPointerParts:()=>Gs,isPointer:()=>Nr,isPrism:()=>pl,iterateAndCountTicks:()=>vw,iterateOver:()=>xw,pointer:()=>gu,pointerToPrism:()=>ml,prism:()=>ul,val:()=>Jf});var wb=Array.isArray,hu=wb,Tb=typeof global=="object"&&global&&global.Object===Object&&global,Eb=Tb,Ab=typeof self=="object"&&self&&self.Object===Object&&self,Cb=Eb||Ab||Function("return this")(),du=Cb,Pb=du.Symbol,Lr=Pb,Nf=Object.prototype,Rb=Nf.hasOwnProperty,Ib=Nf.toString,ks=Lr?Lr.toStringTag:void 0;function Db(n){var e=Rb.call(n,ks),t=n[ks];try{n[ks]=void 0;var i=!0}catch{}var r=Ib.call(n);return i&&(e?n[ks]=t:delete n[ks]),r}var Lb=Db,Nb=Object.prototype,Ob=Nb.toString;function Ub(n){return Ob.call(n)}var Fb=Ub,Bb="[object Null]",zb="[object Undefined]",Sf=Lr?Lr.toStringTag:void 0;function Vb(n){return n==null?n===void 0?zb:Bb:Sf&&Sf in Object(n)?Lb(n):Fb(n)}var fu=Vb;function kb(n){return n!=null&&typeof n=="object"}var Of=kb,Gb="[object Symbol]";function Hb(n){return typeof n=="symbol"||Of(n)&&fu(n)==Gb}var pu=Hb,Wb=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,qb=/^\w*$/;function Xb(n,e){if(hu(n))return!1;var t=typeof n;return t=="number"||t=="symbol"||t=="boolean"||n==null||pu(n)?!0:qb.test(n)||!Wb.test(n)||e!=null&&n in Object(e)}var jb=Xb;function Yb(n){var e=typeof n;return n!=null&&(e=="object"||e=="function")}var Uf=Yb,Zb="[object AsyncFunction]",Jb="[object Function]",Kb="[object GeneratorFunction]",$b="[object Proxy]";function Qb(n){if(!Uf(n))return!1;var e=fu(n);return e==Jb||e==Kb||e==Zb||e==$b}var eS=Qb,tS=du["__core-js_shared__"],ou=tS,Mf=(function(){var n=/[^.]+$/.exec(ou&&ou.keys&&ou.keys.IE_PROTO||"");return n?"Symbol(src)_1."+n:""})();function nS(n){return!!Mf&&Mf in n}var iS=nS,rS=Function.prototype,sS=rS.toString;function aS(n){if(n!=null){try{return sS.call(n)}catch{}try{return n+""}catch{}}return""}var oS=aS,lS=/[\\^$.*+?()[\]{}|]/g,cS=/^\[object .+?Constructor\]$/,uS=Function.prototype,hS=Object.prototype,dS=uS.toString,fS=hS.hasOwnProperty,pS=RegExp("^"+dS.call(fS).replace(lS,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function mS(n){if(!Uf(n)||iS(n))return!1;var e=eS(n)?pS:cS;return e.test(oS(n))}var gS=mS;function _S(n,e){return n?.[e]}var vS=_S;function yS(n,e){var t=vS(n,e);return gS(t)?t:void 0}var Ff=yS,xS=Ff(Object,"create"),qs=xS;function bS(){this.__data__=qs?qs(null):{},this.size=0}var SS=bS;function MS(n){var e=this.has(n)&&delete this.__data__[n];return this.size-=e?1:0,e}var wS=MS,TS="__lodash_hash_undefined__",ES=Object.prototype,AS=ES.hasOwnProperty;function CS(n){var e=this.__data__;if(qs){var t=e[n];return t===TS?void 0:t}return AS.call(e,n)?e[n]:void 0}var PS=CS,RS=Object.prototype,IS=RS.hasOwnProperty;function DS(n){var e=this.__data__;return qs?e[n]!==void 0:IS.call(e,n)}var LS=DS,NS="__lodash_hash_undefined__";function OS(n,e){var t=this.__data__;return this.size+=this.has(n)?0:1,t[n]=qs&&e===void 0?NS:e,this}var US=OS;function Or(n){var e=-1,t=n==null?0:n.length;for(this.clear();++e<t;){var i=n[e];this.set(i[0],i[1])}}Or.prototype.clear=SS;Or.prototype.delete=wS;Or.prototype.get=PS;Or.prototype.has=LS;Or.prototype.set=US;var wf=Or;function FS(){this.__data__=[],this.size=0}var BS=FS;function zS(n,e){return n===e||n!==n&&e!==e}var VS=zS;function kS(n,e){for(var t=n.length;t--;)if(VS(n[t][0],e))return t;return-1}var hl=kS,GS=Array.prototype,HS=GS.splice;function WS(n){var e=this.__data__,t=hl(e,n);if(t<0)return!1;var i=e.length-1;return t==i?e.pop():HS.call(e,t,1),--this.size,!0}var qS=WS;function XS(n){var e=this.__data__,t=hl(e,n);return t<0?void 0:e[t][1]}var jS=XS;function YS(n){return hl(this.__data__,n)>-1}var ZS=YS;function JS(n,e){var t=this.__data__,i=hl(t,n);return i<0?(++this.size,t.push([n,e])):t[i][1]=e,this}var KS=JS;function Ur(n){var e=-1,t=n==null?0:n.length;for(this.clear();++e<t;){var i=n[e];this.set(i[0],i[1])}}Ur.prototype.clear=BS;Ur.prototype.delete=qS;Ur.prototype.get=jS;Ur.prototype.has=ZS;Ur.prototype.set=KS;var $S=Ur,QS=Ff(du,"Map"),eM=QS;function tM(){this.size=0,this.__data__={hash:new wf,map:new(eM||$S),string:new wf}}var nM=tM;function iM(n){var e=typeof n;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?n!=="__proto__":n===null}var rM=iM;function sM(n,e){var t=n.__data__;return rM(e)?t[typeof e=="string"?"string":"hash"]:t.map}var dl=sM;function aM(n){var e=dl(this,n).delete(n);return this.size-=e?1:0,e}var oM=aM;function lM(n){return dl(this,n).get(n)}var cM=lM;function uM(n){return dl(this,n).has(n)}var hM=uM;function dM(n,e){var t=dl(this,n),i=t.size;return t.set(n,e),this.size+=t.size==i?0:1,this}var fM=dM;function Fr(n){var e=-1,t=n==null?0:n.length;for(this.clear();++e<t;){var i=n[e];this.set(i[0],i[1])}}Fr.prototype.clear=nM;Fr.prototype.delete=oM;Fr.prototype.get=cM;Fr.prototype.has=hM;Fr.prototype.set=fM;var Bf=Fr,pM="Expected a function";function mu(n,e){if(typeof n!="function"||e!=null&&typeof e!="function")throw new TypeError(pM);var t=function(){var i=arguments,r=e?e.apply(this,i):i[0],s=t.cache;if(s.has(r))return s.get(r);var a=n.apply(this,i);return t.cache=s.set(r,a)||s,a};return t.cache=new(mu.Cache||Bf),t}mu.Cache=Bf;var mM=mu,gM=500;function _M(n){var e=mM(n,function(i){return t.size===gM&&t.clear(),i}),t=e.cache;return e}var vM=_M,yM=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,xM=/\\(\\)?/g,bM=vM(function(n){var e=[];return n.charCodeAt(0)===46&&e.push(""),n.replace(yM,function(t,i,r,s){e.push(r?s.replace(xM,"$1"):i||t)}),e}),SM=bM;function MM(n,e){for(var t=-1,i=n==null?0:n.length,r=Array(i);++t<i;)r[t]=e(n[t],t,n);return r}var wM=MM,TM=1/0,Tf=Lr?Lr.prototype:void 0,Ef=Tf?Tf.toString:void 0;function zf(n){if(typeof n=="string")return n;if(hu(n))return wM(n,zf)+"";if(pu(n))return Ef?Ef.call(n):"";var e=n+"";return e=="0"&&1/n==-TM?"-0":e}var EM=zf;function AM(n){return n==null?"":EM(n)}var CM=AM;function PM(n,e){return hu(n)?n:jb(n,e)?[n]:SM(CM(n))}var RM=PM,IM=1/0;function DM(n){if(typeof n=="string"||pu(n))return n;var e=n+"";return e=="0"&&1/n==-IM?"-0":e}var LM=DM;function NM(n,e){e=RM(e,n);for(var t=0,i=e.length;n!=null&&t<i;)n=n[LM(e[t++])];return t&&t==i?n:void 0}var OM=NM;function UM(n,e,t){var i=n==null?void 0:OM(n,e);return i===void 0?t:i}var FM=UM;function BM(n,e){return function(t){return n(e(t))}}var zM=BM,VM=zM(Object.getPrototypeOf,Object),kM=VM,GM="[object Object]",HM=Function.prototype,WM=Object.prototype,Vf=HM.toString,qM=WM.hasOwnProperty,XM=Vf.call(Object);function jM(n){if(!Of(n)||fu(n)!=GM)return!1;var e=kM(n);if(e===null)return!0;var t=qM.call(e,"constructor")&&e.constructor;return typeof t=="function"&&t instanceof t&&Vf.call(t)==XM}var YM=jM;function ZM(n){var e=n==null?0:n.length;return e?n[e-1]:void 0}var JM=ZM,lu=new WeakMap,Af=new WeakMap,kf=Symbol("pointerMeta"),KM={get(n,e){if(e===kf)return lu.get(n);let t=Af.get(n);t||(t=new Map,Af.set(n,t));let i=t.get(e);if(i!==void 0)return i;let r=lu.get(n),s=Gf({root:r.root,path:[...r.path,e]});return t.set(e,s),s}},fl=n=>n[kf],Gs=n=>{let{root:e,path:t}=fl(n);return{root:e,path:t}};function Gf(n){var e;let t={root:n.root,path:(e=n.path)!=null?e:[]},i={};return lu.set(i,t),new Proxy(i,KM)}var gu=Gf,Nr=n=>n&&!!fl(n);function $M(n,e,t){return e.length===0?t(n):ll(n,e,t)}var ll=(n,e,t)=>{if(e.length===0)return t(n);if(Array.isArray(n)){let[i,...r]=e;i=parseInt(String(i),10),isNaN(i)&&(i=0);let s=n[i],a=ll(s,r,t);if(s===a)return n;let o=[...n];return o.splice(i,1,a),o}else if(typeof n=="object"&&n!==null){let[i,...r]=e,s=n[i],a=ll(s,r,t);return s===a?n:bb(xb({},n),{[i]:a})}else{let[i,...r]=e;return{[i]:ll(void 0,r,t)}}},Hf=class{constructor(){this._head=void 0}peek(){return this._head&&this._head.data}pop(){let n=this._head;if(n)return this._head=n.next,n.data}push(n){let e={next:this._head,data:n};this._head=e}};function pl(n){return!!(n&&n.isPrism&&n.isPrism===!0)}function Cf(){let n=()=>{},e=new Hf,t=n;return{type:"Dataverse_discoveryMechanism",startIgnoringDependencies:()=>{e.push(t)},stopIgnoringDependencies:()=>{e.peek()!==t||e.pop()},reportResolutionStart:c=>{let u=e.peek();u&&u(c),e.push(t)},reportResolutionEnd:c=>{e.pop()},pushCollector:c=>{e.push(c)},popCollector:c=>{if(e.peek()!==c)throw new Error("Popped collector is not on top of the stack");e.pop()}}}function QM(){let n="__dataverse_discoveryMechanism_sharedStack",e=typeof window<"u"?window:typeof global<"u"?global:{};if(e){let t=e[n];if(t&&typeof t=="object"&&t.type==="Dataverse_discoveryMechanism")return t;{let i=Cf();return e[n]=i,i}}else return Cf()}var{startIgnoringDependencies:Hs,stopIgnoringDependencies:Ws,reportResolutionEnd:ew,reportResolutionStart:tw,pushCollector:nw,popCollector:iw}=QM(),Pf=()=>{},rw=class{constructor(n,e){this._fn=n,this._prismInstance=e,this._didMarkDependentsAsStale=!1,this._isFresh=!1,this._cacheOfDendencyValues=new Map,this._dependents=new Set,this._dependencies=new Set,this._possiblyStaleDeps=new Set,this._scope=new Wf(this),this._lastValue=void 0,this._forciblySetToStale=!1,this._reactToDependencyGoingStale=t=>{this._possiblyStaleDeps.add(t),this._markAsStale()};for(let t of this._dependencies)t._addDependent(this._reactToDependencyGoingStale);Hs(),this.getValue(),Ws()}get hasDependents(){return this._dependents.size>0}removeDependent(n){this._dependents.delete(n)}addDependent(n){this._dependents.add(n)}destroy(){for(let n of this._dependencies)n._removeDependent(this._reactToDependencyGoingStale);qf(this._scope)}getValue(){if(!this._isFresh){let n=this._recalculate();this._lastValue=n,this._isFresh=!0,this._didMarkDependentsAsStale=!1,this._forciblySetToStale=!1}return this._lastValue}_recalculate(){let n;if(!this._forciblySetToStale&&this._possiblyStaleDeps.size>0){let i=!1;Hs();for(let r of this._possiblyStaleDeps)if(this._cacheOfDendencyValues.get(r)!==r.getValue()){i=!0;break}if(Ws(),this._possiblyStaleDeps.clear(),!i)return this._lastValue}let e=new Set;this._cacheOfDendencyValues.clear();let t=i=>{e.add(i),this._addDependency(i)};nw(t),$t.push(this._scope);try{n=this._fn()}catch(i){console.error(i)}finally{$t.pop()!==this._scope&&console.warn("The Prism hook stack has slipped. This is a bug.")}iw(t);for(let i of this._dependencies)e.has(i)||this._removeDependency(i);this._dependencies=e,Hs();for(let i of e)this._cacheOfDendencyValues.set(i,i.getValue());return Ws(),n}forceStale(){this._forciblySetToStale=!0,this._markAsStale()}_markAsStale(){if(!this._didMarkDependentsAsStale){this._didMarkDependentsAsStale=!0,this._isFresh=!1;for(let n of this._dependents)n(this._prismInstance)}}_addDependency(n){this._dependencies.has(n)||(this._dependencies.add(n),n._addDependent(this._reactToDependencyGoingStale))}_removeDependency(n){this._dependencies.has(n)&&(this._dependencies.delete(n),n._removeDependent(this._reactToDependencyGoingStale))}},sw={},aw=class{constructor(n){this._fn=n,this.isPrism=!0,this._state={hot:!1,handle:void 0}}get isHot(){return this._state.hot}onChange(n,e,t=!1){let i=()=>{n.onThisOrNextTick(s)},r=sw,s=()=>{let o=this.getValue();o!==r&&(r=o,e(o))};return this._addDependent(i),t&&(r=this.getValue(),e(r)),()=>{this._removeDependent(i),n.offThisOrNextTick(s),n.offNextTick(s)}}onStale(n){let e=()=>{this._removeDependent(t)},t=()=>n();return this._addDependent(t),e}keepHot(){return this.onStale(()=>{})}_addDependent(n){this._state.hot||this._goHot(),this._state.handle.addDependent(n)}_goHot(){let n=new rw(this._fn,this);this._state={hot:!0,handle:n}}_removeDependent(n){let e=this._state;if(!e.hot)return;let t=e.handle;t.removeDependent(n),t.hasDependents||(this._state={hot:!1,handle:void 0},t.destroy())}getValue(){tw(this);let n=this._state,e;return n.hot?e=n.handle.getValue():e=mw(this._fn),ew(this),e}},Wf=class{constructor(n){this._hotHandle=n,this._refs=new Map,this.isPrismScope=!0,this.subs={},this.effects=new Map,this.memos=new Map}ref(n,e){let t=this._refs.get(n);if(t!==void 0)return t;{let i={current:e};return this._refs.set(n,i),i}}effect(n,e,t){let i=this.effects.get(n);i===void 0&&(i={cleanup:Pf,deps:void 0},this.effects.set(n,i)),Rf(i.deps,t)&&(i.cleanup(),Hs(),i.cleanup=cl(e,Pf).value,Ws(),i.deps=t)}memo(n,e,t){let i=this.memos.get(n);return i===void 0&&(i={cachedValue:null,deps:void 0},this.memos.set(n,i)),Rf(i.deps,t)&&(Hs(),i.cachedValue=cl(e,void 0).value,Ws(),i.deps=t),i.cachedValue}state(n,e){let{value:t,setValue:i}=this.memo("state/"+n,()=>{let r={current:e};return{value:r,setValue:a=>{r.current=a,this._hotHandle.forceStale()}}},[]);return[t.current,i]}sub(n){return this.subs[n]||(this.subs[n]=new Wf(this._hotHandle)),this.subs[n]}cleanupEffects(){for(let n of this.effects.values())cl(n.cleanup,void 0);this.effects.clear()}source(n,e){return this.effect("$$source/blah",()=>n(()=>{this._hotHandle.forceStale()}),[n]),e()}};function qf(n){for(let e of Object.values(n.subs))qf(e);n.cleanupEffects()}function cl(n,e){try{return{value:n(),ok:!0}}catch(t){return setTimeout(function(){throw t}),{value:e,ok:!1}}}var $t=new Hf;function ow(n,e){let t=$t.peek();if(!t)throw new Error("prism.ref() is called outside of a prism() call.");return t.ref(n,e)}function lw(n,e,t){let i=$t.peek();if(!i)throw new Error("prism.effect() is called outside of a prism() call.");return i.effect(n,e,t)}function Rf(n,e){if(n===void 0||e===void 0)return!0;let t=n.length;if(t!==e.length)return!0;for(let i=0;i<t;i++)if(n[i]!==e[i])return!0;return!1}function Xf(n,e,t){let i=$t.peek();if(!i)throw new Error("prism.memo() is called outside of a prism() call.");return i.memo(n,e,t)}function cw(n,e){let t=$t.peek();if(!t)throw new Error("prism.state() is called outside of a prism() call.");return t.state(n,e)}function uw(){if(!$t.peek())throw new Error("The parent function is called outside of a prism() call.")}function hw(n,e){let t=$t.peek();if(!t)throw new Error("prism.scope() is called outside of a prism() call.");let i=t.sub(n);$t.push(i);let r=cl(e,void 0).value;return $t.pop(),r}function dw(n,e,t){return Xf(n,()=>An(e),t).getValue()}function fw(){return!!$t.peek()}function pw(n,e){let t=$t.peek();if(!t)throw new Error("prism.source() is called outside of a prism() call.");return t.source(n,e)}var An=n=>new aw(n),jf=class{effect(n,e,t){console.warn("prism.effect() does not run in cold prisms")}memo(n,e,t){return e()}state(n,e){return[e,()=>{}]}ref(n,e){return{current:e}}sub(n){return new jf}source(n,e){return e()}};function mw(n){let e=new jf;$t.push(e);let t;try{t=n()}catch(i){console.error(i)}finally{$t.pop()!==e&&console.warn("The Prism hook stack has slipped. This is a bug.")}return t}An.ref=ow;An.effect=lw;An.memo=Xf;An.ensurePrism=uw;An.state=cw;An.scope=hw;An.sub=dw;An.inPrism=fw;An.source=pw;var ul=An,If;(function(n){n[n.Dict=0]="Dict",n[n.Array=1]="Array",n[n.Other=2]="Other"})(If||(If={}));var cu=n=>Array.isArray(n)?1:YM(n)?0:2,Df=(n,e,t=cu(n))=>t===0&&typeof e=="string"||t===1&&gw(e)?n[e]:void 0,gw=n=>{let e=typeof n=="number"?n:parseInt(n,10);return!isNaN(e)&&e>=0&&e<1/0&&(e|0)===e},Yf=class{constructor(n,e){this._parent=n,this._path=e,this.children=new Map,this.identityChangeListeners=new Set}addIdentityChangeListener(n){this.identityChangeListeners.add(n)}removeIdentityChangeListener(n){this.identityChangeListeners.delete(n),this._checkForGC()}removeChild(n){this.children.delete(n),this._checkForGC()}getChild(n){return this.children.get(n)}getOrCreateChild(n){let e=this.children.get(n);return e||(e=e=new Yf(this,this._path.concat([n])),this.children.set(n,e)),e}_checkForGC(){this.identityChangeListeners.size>0||this.children.size>0||this._parent&&this._parent.removeChild(JM(this._path))}},Zf=class{constructor(n){this.$$isPointerToPrismProvider=!0,this.pointer=gu({root:this,path:[]}),this.prism=this.pointerToPrism(this.pointer),this._onPointerValueChange=(e,t)=>{let{path:i}=Gs(e),r=this._getOrCreateScopeForPath(i);return r.identityChangeListeners.add(t),()=>{r.identityChangeListeners.delete(t)}},this._currentState=n,this._rootScope=new Yf(void 0,[])}set(n){let e=this._currentState;this._currentState=n,this._checkUpdates(this._rootScope,e,n)}get(){return this._currentState}getByPointer(n){let e=Nr(n)?n:n(this.pointer),t=Gs(e).path;return this._getIn(t)}_getIn(n){return n.length===0?this.get():FM(this.get(),n)}reduce(n){this.set(n(this.get()))}reduceByPointer(n,e){let t=Nr(n)?n:n(this.pointer),i=Gs(t).path,r=$M(this.get(),i,e);this.set(r)}setByPointer(n,e){this.reduceByPointer(n,()=>e)}_checkUpdates(n,e,t){if(e===t)return;for(let s of n.identityChangeListeners)s(t);if(n.children.size===0)return;let i=cu(e),r=cu(t);if(!(i===2&&i===r))for(let[s,a]of n.children){let o=Df(e,s,i),l=Df(t,s,r);this._checkUpdates(a,o,l)}}_getOrCreateScopeForPath(n){let e=this._rootScope;for(let t of n)e=e.getOrCreateChild(t);return e}pointerToPrism(n){let{path:e}=Gs(n),t=r=>this._onPointerValueChange(n,r),i=()=>this._getIn(e);return ul(()=>ul.source(t,i))}},Lf=new WeakMap;function _w(n){return typeof n=="object"&&n!==null&&n.$$isPointerToPrismProvider===!0}var ml=n=>{let e=fl(n),t=Lf.get(e);if(!t){let i=e.root;if(!_w(i))throw new Error("Cannot run pointerToPrism() on a pointer whose root is not an PointerToPrismProvider");t=i.pointerToPrism(n),Lf.set(e,t)}return t},Jf=n=>Nr(n)?ml(n).getValue():pl(n)?n.getValue():n;function*vw(n){let e;if(Nr(n))e=ml(n);else if(pl(n))e=n;else throw new Error("Only pointers and prisms are supported");let t=0,i=e.onStale(()=>{t++});try{for(;;){let r=t;t=0,yield{value:e.getValue(),ticks:r}}}finally{i()}}var yw=180,Kf=class{constructor(n){this._conf=n,this._ticking=!1,this._dormant=!0,this._numberOfDormantTicks=0,this.__ticks=0,this._scheduledForThisOrNextTick=new Set,this._scheduledForNextTick=new Set,this._timeAtCurrentTick=0}get dormant(){return this._dormant}onThisOrNextTick(n){this._scheduledForThisOrNextTick.add(n),this._dormant&&this._goActive()}onNextTick(n){this._scheduledForNextTick.add(n),this._dormant&&this._goActive()}offThisOrNextTick(n){this._scheduledForThisOrNextTick.delete(n)}offNextTick(n){this._scheduledForNextTick.delete(n)}get time(){return this._ticking?this._timeAtCurrentTick:performance.now()}_goActive(){var n,e;this._dormant&&(this._dormant=!1,(e=(n=this._conf)==null?void 0:n.onActive)==null||e.call(n))}_goDormant(){var n,e;this._dormant||(this._dormant=!0,this._numberOfDormantTicks=0,(e=(n=this._conf)==null?void 0:n.onDormant)==null||e.call(n))}tick(n=performance.now()){if(this.__ticks++,!this._dormant&&this._scheduledForNextTick.size===0&&this._scheduledForThisOrNextTick.size===0&&(this._numberOfDormantTicks++,this._numberOfDormantTicks>=yw)){this._goDormant();return}this._ticking=!0,this._timeAtCurrentTick=n;for(let e of this._scheduledForNextTick)this._scheduledForThisOrNextTick.add(e);this._scheduledForNextTick.clear(),this._tick(0),this._ticking=!1}_tick(n){let e=this.time;if(n>10&&console.warn("_tick() recursing for 10 times"),n>100)throw new Error("Maximum recursion limit for _tick()");let t=this._scheduledForThisOrNextTick;this._scheduledForThisOrNextTick=new Set;for(let i of t)i(e);if(this._scheduledForThisOrNextTick.size>0)return this._tick(n+1)}};function*xw(n){let e;if(Nr(n))e=ml(n);else if(pl(n))e=n;else throw new Error("Only pointers and prisms are supported");let t=new Kf,i=e.onChange(t,r=>{});try{for(;;)t.tick(),yield e.getValue()}finally{i()}}var bw=class{constructor(n){this.$$isPointerToPrismProvider=!0,this._currentPointerBox=new Zf(n),this.pointer=gu({root:this,path:[]})}setPointer(n){this._currentPointerBox.set(n)}pointerToPrism(n){let{path:e}=fl(n);return ul(()=>{let t=this._currentPointerBox.prism.getValue(),i=e.reduce((r,s)=>r[s],t);return Jf(i)})}}});var xg=Fh((cn,Qt)=>{"use strict";var Sw=Object.create,ra=Object.defineProperty,Mw=Object.defineProperties,ww=Object.getOwnPropertyDescriptor,Tw=Object.getOwnPropertyDescriptors,im=Object.getOwnPropertyNames,Qf=Object.getOwnPropertySymbols,Ew=Object.getPrototypeOf,rm=Object.prototype.hasOwnProperty,Aw=Object.prototype.propertyIsEnumerable,Pu=(n,e,t)=>e in n?ra(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,bt=(n,e)=>{for(var t in e||(e={}))rm.call(e,t)&&Pu(n,t,e[t]);if(Qf)for(var t of Qf(e))Aw.call(e,t)&&Pu(n,t,e[t]);return n},Gn=(n,e)=>Mw(n,Tw(e)),Dl=(n,e)=>function(){return e||(0,n[im(n)[0]])((e={exports:{}}).exports,e),e.exports},Wu=(n,e)=>{for(var t in e)ra(n,t,{get:e[t],enumerable:!0})},sm=(n,e,t,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of im(e))!rm.call(n,r)&&r!==t&&ra(n,r,{get:()=>e[r],enumerable:!(i=ww(e,r))||i.enumerable});return n},Ll=(n,e,t)=>(t=n!=null?Sw(Ew(n)):{},sm(e||!n||!n.__esModule?ra(t,"default",{value:n,enumerable:!0}):t,n)),Cw=n=>sm(ra({},"__esModule",{value:!0}),n),xe=(n,e,t)=>(Pu(n,typeof e!="symbol"?e+"":e,t),t),Pw=Dl({"../node_modules/timing-function/lib/UnitBezier.js"(n,e){var t;e.exports=t=(function(){function i(r,s,a,o){this.set(r,s,a,o)}return i.prototype.set=function(r,s,a,o){this._cx=3*r,this._bx=3*(a-r)-this._cx,this._ax=1-this._cx-this._bx,this._cy=3*s,this._by=3*(o-s)-this._cy,this._ay=1-this._cy-this._by},i.epsilon=1e-6,i.prototype._sampleCurveX=function(r){return((this._ax*r+this._bx)*r+this._cx)*r},i.prototype._sampleCurveY=function(r){return((this._ay*r+this._by)*r+this._cy)*r},i.prototype._sampleCurveDerivativeX=function(r){return(3*this._ax*r+2*this._bx)*r+this._cx},i.prototype._solveCurveX=function(r,s){var a,o,l,c,u,d;for(l=void 0,c=void 0,u=void 0,d=void 0,a=void 0,o=void 0,u=r,o=0;o<8;){if(d=this._sampleCurveX(u)-r,Math.abs(d)<s)return u;if(a=this._sampleCurveDerivativeX(u),Math.abs(a)<s)break;u=u-d/a,o++}if(l=0,c=1,u=r,u<l)return l;if(u>c)return c;for(;l<c;){if(d=this._sampleCurveX(u),Math.abs(d-r)<s)return u;r>d?l=u:c=u,u=(c-l)*.5+l}return u},i.prototype.solve=function(r,s){return this._sampleCurveY(this._solveCurveX(r,s))},i.prototype.solveSimple=function(r){return this._sampleCurveY(this._solveCurveX(r,1e-6))},i})()}}),Rw=Dl({"../node_modules/levenshtein-edit-distance/index.js"(n,e){var t,i;t=[],i=[];function r(s,a,o){var l,c,u,d,h,p,_,x;if(s===a)return 0;if(l=s.length,c=a.length,l===0)return c;if(c===0)return l;for(o&&(s=s.toLowerCase(),a=a.toLowerCase()),_=0;_<l;)i[_]=s.charCodeAt(_),t[_]=++_;for(x=0;x<c;)for(u=a.charCodeAt(x),d=h=x++,_=-1;++_<l;)p=u===i[_]?h:h+1,h=t[_],t[_]=d=h>d?p>d?d+1:p:p>h?h+1:p;return d}e.exports=r}}),Iw=Dl({"../node_modules/propose/propose.js"(n,e){var t=Rw();function i(){var r,s,a,o,l,c=0,u=arguments[0],d=arguments[1],h=d.length,p=arguments[2];p&&(o=p.threshold,l=p.ignoreCase),o===void 0&&(o=0);for(var _=0;_<h;++_)l?s=t(u,d[_],!0):s=t(u,d[_]),s>u.length?r=1-s/d[_].length:r=1-s/u.length,r>c&&(c=r,a=d[_]);return c>=o?a:null}e.exports=i}}),am=Dl({"../node_modules/fast-deep-equal/index.js"(n,e){"use strict";e.exports=function t(i,r){if(i===r)return!0;if(i&&r&&typeof i=="object"&&typeof r=="object"){if(i.constructor!==r.constructor)return!1;var s,a,o;if(Array.isArray(i)){if(s=i.length,s!=r.length)return!1;for(a=s;a--!==0;)if(!t(i[a],r[a]))return!1;return!0}if(i.constructor===RegExp)return i.source===r.source&&i.flags===r.flags;if(i.valueOf!==Object.prototype.valueOf)return i.valueOf()===r.valueOf();if(i.toString!==Object.prototype.toString)return i.toString()===r.toString();if(o=Object.keys(i),s=o.length,s!==Object.keys(r).length)return!1;for(a=s;a--!==0;)if(!Object.prototype.hasOwnProperty.call(r,o[a]))return!1;for(a=s;a--!==0;){var l=o[a];if(!t(i[l],r[l]))return!1}return!0}return i!==i&&r!==r}}}),om={};Wu(om,{createRafDriver:()=>uh,getProject:()=>vg,notify:()=>Zi,onChange:()=>Sh,types:()=>hh,val:()=>yg});Qt.exports=Cw(om);var lm={};Wu(lm,{createRafDriver:()=>uh,getProject:()=>vg,notify:()=>Zi,onChange:()=>Sh,types:()=>hh,val:()=>yg});var Dw=Ct(),Lw=class{constructor(){xe(this,"atom",new Dw.Atom({projects:{}}))}add(n,e){this.atom.setByPointer(t=>t.projects[n],e)}get(n){return this.atom.get().projects[n]}has(n){return!!this.get(n)}},Nw=new Lw,qu=Nw,cm=new WeakMap;function st(n){return cm.get(n)}function sa(n,e){cm.set(n,e)}var _u=[],Ow=Array.isArray,Vn=Ow,Uw=typeof global=="object"&&global&&global.Object===Object&&global,um=Uw,Fw=typeof self=="object"&&self&&self.Object===Object&&self,Bw=um||Fw||Function("return this")(),Pn=Bw,zw=Pn.Symbol,kn=zw,hm=Object.prototype,Vw=hm.hasOwnProperty,kw=hm.toString,Xs=kn?kn.toStringTag:void 0;function Gw(n){var e=Vw.call(n,Xs),t=n[Xs];try{n[Xs]=void 0;var i=!0}catch{}var r=kw.call(n);return i&&(e?n[Xs]=t:delete n[Xs]),r}var Hw=Gw,Ww=Object.prototype,qw=Ww.toString;function Xw(n){return qw.call(n)}var jw=Xw,Yw="[object Null]",Zw="[object Undefined]",ep=kn?kn.toStringTag:void 0;function Jw(n){return n==null?n===void 0?Zw:Yw:ep&&ep in Object(n)?Hw(n):jw(n)}var $i=Jw;function Kw(n){return n!=null&&typeof n=="object"}var ti=Kw,$w="[object Symbol]";function Qw(n){return typeof n=="symbol"||ti(n)&&$i(n)==$w}var Nl=Qw,eT=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,tT=/^\w*$/;function nT(n,e){if(Vn(n))return!1;var t=typeof n;return t=="number"||t=="symbol"||t=="boolean"||n==null||Nl(n)?!0:tT.test(n)||!eT.test(n)||e!=null&&n in Object(e)}var Xu=nT;function iT(n){var e=typeof n;return n!=null&&(e=="object"||e=="function")}var Cn=iT,rT="[object AsyncFunction]",sT="[object Function]",aT="[object GeneratorFunction]",oT="[object Proxy]";function lT(n){if(!Cn(n))return!1;var e=$i(n);return e==sT||e==aT||e==rT||e==oT}var dm=lT,cT=Pn["__core-js_shared__"],vu=cT,tp=(function(){var n=/[^.]+$/.exec(vu&&vu.keys&&vu.keys.IE_PROTO||"");return n?"Symbol(src)_1."+n:""})();function uT(n){return!!tp&&tp in n}var hT=uT,dT=Function.prototype,fT=dT.toString;function pT(n){if(n!=null){try{return fT.call(n)}catch{}try{return n+""}catch{}}return""}var Qi=pT,mT=/[\\^$.*+?()[\]{}|]/g,gT=/^\[object .+?Constructor\]$/,_T=Function.prototype,vT=Object.prototype,yT=_T.toString,xT=vT.hasOwnProperty,bT=RegExp("^"+yT.call(xT).replace(mT,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function ST(n){if(!Cn(n)||hT(n))return!1;var e=dm(n)?bT:gT;return e.test(Qi(n))}var MT=ST;function wT(n,e){return n?.[e]}var TT=wT;function ET(n,e){var t=TT(n,e);return MT(t)?t:void 0}var er=ET,AT=er(Object,"create"),$s=AT;function CT(){this.__data__=$s?$s(null):{},this.size=0}var PT=CT;function RT(n){var e=this.has(n)&&delete this.__data__[n];return this.size-=e?1:0,e}var IT=RT,DT="__lodash_hash_undefined__",LT=Object.prototype,NT=LT.hasOwnProperty;function OT(n){var e=this.__data__;if($s){var t=e[n];return t===DT?void 0:t}return NT.call(e,n)?e[n]:void 0}var UT=OT,FT=Object.prototype,BT=FT.hasOwnProperty;function zT(n){var e=this.__data__;return $s?e[n]!==void 0:BT.call(e,n)}var VT=zT,kT="__lodash_hash_undefined__";function GT(n,e){var t=this.__data__;return this.size+=this.has(n)?0:1,t[n]=$s&&e===void 0?kT:e,this}var HT=GT;function Gr(n){var e=-1,t=n==null?0:n.length;for(this.clear();++e<t;){var i=n[e];this.set(i[0],i[1])}}Gr.prototype.clear=PT;Gr.prototype.delete=IT;Gr.prototype.get=UT;Gr.prototype.has=VT;Gr.prototype.set=HT;var np=Gr;function WT(){this.__data__=[],this.size=0}var qT=WT;function XT(n,e){return n===e||n!==n&&e!==e}var ju=XT;function jT(n,e){for(var t=n.length;t--;)if(ju(n[t][0],e))return t;return-1}var Ol=jT,YT=Array.prototype,ZT=YT.splice;function JT(n){var e=this.__data__,t=Ol(e,n);if(t<0)return!1;var i=e.length-1;return t==i?e.pop():ZT.call(e,t,1),--this.size,!0}var KT=JT;function $T(n){var e=this.__data__,t=Ol(e,n);return t<0?void 0:e[t][1]}var QT=$T;function e1(n){return Ol(this.__data__,n)>-1}var t1=e1;function n1(n,e){var t=this.__data__,i=Ol(t,n);return i<0?(++this.size,t.push([n,e])):t[i][1]=e,this}var i1=n1;function Hr(n){var e=-1,t=n==null?0:n.length;for(this.clear();++e<t;){var i=n[e];this.set(i[0],i[1])}}Hr.prototype.clear=qT;Hr.prototype.delete=KT;Hr.prototype.get=QT;Hr.prototype.has=t1;Hr.prototype.set=i1;var Ul=Hr,r1=er(Pn,"Map"),Qs=r1;function s1(){this.size=0,this.__data__={hash:new np,map:new(Qs||Ul),string:new np}}var a1=s1;function o1(n){var e=typeof n;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?n!=="__proto__":n===null}var l1=o1;function c1(n,e){var t=n.__data__;return l1(e)?t[typeof e=="string"?"string":"hash"]:t.map}var Fl=c1;function u1(n){var e=Fl(this,n).delete(n);return this.size-=e?1:0,e}var h1=u1;function d1(n){return Fl(this,n).get(n)}var f1=d1;function p1(n){return Fl(this,n).has(n)}var m1=p1;function g1(n,e){var t=Fl(this,n),i=t.size;return t.set(n,e),this.size+=t.size==i?0:1,this}var _1=g1;function Wr(n){var e=-1,t=n==null?0:n.length;for(this.clear();++e<t;){var i=n[e];this.set(i[0],i[1])}}Wr.prototype.clear=a1;Wr.prototype.delete=h1;Wr.prototype.get=f1;Wr.prototype.has=m1;Wr.prototype.set=_1;var Bl=Wr,v1="Expected a function";function Yu(n,e){if(typeof n!="function"||e!=null&&typeof e!="function")throw new TypeError(v1);var t=function(){var i=arguments,r=e?e.apply(this,i):i[0],s=t.cache;if(s.has(r))return s.get(r);var a=n.apply(this,i);return t.cache=s.set(r,a)||s,a};return t.cache=new(Yu.Cache||Bl),t}Yu.Cache=Bl;var y1=Yu,x1=500;function b1(n){var e=y1(n,function(i){return t.size===x1&&t.clear(),i}),t=e.cache;return e}var S1=b1,M1=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,w1=/\\(\\)?/g,T1=S1(function(n){var e=[];return n.charCodeAt(0)===46&&e.push(""),n.replace(M1,function(t,i,r,s){e.push(r?s.replace(w1,"$1"):i||t)}),e}),E1=T1;function A1(n,e){for(var t=-1,i=n==null?0:n.length,r=Array(i);++t<i;)r[t]=e(n[t],t,n);return r}var C1=A1,P1=1/0,ip=kn?kn.prototype:void 0,rp=ip?ip.toString:void 0;function fm(n){if(typeof n=="string")return n;if(Vn(n))return C1(n,fm)+"";if(Nl(n))return rp?rp.call(n):"";var e=n+"";return e=="0"&&1/n==-P1?"-0":e}var pm=fm;function R1(n){return n==null?"":pm(n)}var mm=R1;function I1(n,e){return Vn(n)?n:Xu(n,e)?[n]:E1(mm(n))}var zl=I1,D1=1/0;function L1(n){if(typeof n=="string"||Nl(n))return n;var e=n+"";return e=="0"&&1/n==-D1?"-0":e}var qr=L1;function N1(n,e){e=zl(e,n);for(var t=0,i=e.length;n!=null&&t<i;)n=n[qr(e[t++])];return t&&t==i?n:void 0}var Zu=N1;function O1(n,e,t){var i=n==null?void 0:Zu(n,e);return i===void 0?t:i}var gm=O1;function sp(n,e){return e.length===0?n:gm(n,e)}var Ju=class{constructor(){xe(this,"_values",{})}get(n,e){if(this.has(n))return this._values[n];{let t=e();return this._values[n]=t,t}}has(n){return this._values.hasOwnProperty(n)}},Ht=Ct(),U1=(function(){try{var n=er(Object,"defineProperty");return n({},"",{}),n}catch{}})(),ap=U1;function F1(n,e,t){e=="__proto__"&&ap?ap(n,e,{configurable:!0,enumerable:!0,value:t,writable:!0}):n[e]=t}var Ku=F1,B1=Object.prototype,z1=B1.hasOwnProperty;function V1(n,e,t){var i=n[e];(!(z1.call(n,e)&&ju(i,t))||t===void 0&&!(e in n))&&Ku(n,e,t)}var $u=V1,k1=9007199254740991,G1=/^(?:0|[1-9]\d*)$/;function H1(n,e){var t=typeof n;return e=e??k1,!!e&&(t=="number"||t!="symbol"&&G1.test(n))&&n>-1&&n%1==0&&n<e}var Qu=H1;function W1(n,e,t,i){if(!Cn(n))return n;e=zl(e,n);for(var r=-1,s=e.length,a=s-1,o=n;o!=null&&++r<s;){var l=qr(e[r]),c=t;if(l==="__proto__"||l==="constructor"||l==="prototype")return n;if(r!=a){var u=o[l];c=i?i(u,l,o):void 0,c===void 0&&(c=Cn(u)?u:Qu(e[r+1])?[]:{})}$u(o,l,c),o=o[l]}return n}var q1=W1;function X1(n,e,t){return n==null?n:q1(n,e,t)}var j1=X1,yu=new WeakMap;function Y1(n){return eh(n)}function eh(n){if(yu.has(n))return yu.get(n);let e=n.type==="compound"?J1(n):n.type==="enum"?Z1(n):n.default;return yu.set(n,e),e}function Z1(n){let e={$case:n.defaultCase};for(let[t,i]of Object.entries(n.cases))e[t]=eh(i);return e}function J1(n){let e={};for(let[t,i]of Object.entries(n.props))e[t]=eh(i);return e}var ln=Ct(),K1=Ll(Pw());function $1(n,e,t){return(0,ln.prism)(()=>{let i=(0,ln.val)(e);return ln.prism.memo("driver",()=>i?i.type==="BasicKeyframedTrack"?Q1(n,i,t):(n.logger.error("Track type not yet supported."),(0,ln.prism)(()=>{})):(0,ln.prism)(()=>{}),[i]).getValue()})}function Q1(n,e,t){return(0,ln.prism)(()=>{let i=ln.prism.ref("state",{started:!1}),r=i.current,s=t.getValue();return(!r.started||s<r.validFrom||r.validTo<=s)&&(i.current=r=eE(n,t,e)),r.der.getValue()})}var _m=(0,ln.prism)(()=>{});function eE(n,e,t){let i=e.getValue();if(t.keyframes.length===0)return{started:!0,validFrom:-1/0,validTo:1/0,der:_m};let r=0;for(;;){let s=t.keyframes[r];if(!s)return Hi.error;let a=r===t.keyframes.length-1;if(i<s.position)return r===0?Hi.beforeFirstKeyframe(s):Hi.error;if(s.position===i)return a?Hi.lastKeyframe(s):Hi.between(s,t.keyframes[r+1],e);if(r===t.keyframes.length-1)return Hi.lastKeyframe(s);{let o=r+1;if(t.keyframes[o].position<=i){r=o;continue}else return Hi.between(s,t.keyframes[r+1],e)}}}var Hi={beforeFirstKeyframe(n){return{started:!0,validFrom:-1/0,validTo:n.position,der:(0,ln.prism)(()=>({left:n.value,progression:0}))}},lastKeyframe(n){return{started:!0,validFrom:n.position,validTo:1/0,der:(0,ln.prism)(()=>({left:n.value,progression:0}))}},between(n,e,t){if(!n.connectedRight)return{started:!0,validFrom:n.position,validTo:e.position,der:(0,ln.prism)(()=>({left:n.value,progression:0}))};let i=s=>(s-n.position)/(e.position-n.position);if(!n.type||n.type==="bezier"){let s=new K1.default(n.handles[2],n.handles[3],e.handles[0],e.handles[1]),a=(0,ln.prism)(()=>{let o=i(t.getValue()),l=s.solveSimple(o);return{left:n.value,right:e.value,progression:l}});return{started:!0,validFrom:n.position,validTo:e.position,der:a}}let r=(0,ln.prism)(()=>{let s=i(t.getValue()),a=Math.floor(s);return{left:n.value,right:e.value,progression:a}});return{started:!0,validFrom:n.position,validTo:e.position,der:r}},error:{started:!0,validFrom:-1/0,validTo:1/0,der:_m}};function vl(n,e,t){let r=t.get(n);if(r&&r.override===e)return r.merged;let s=bt({},n);for(let a of Object.keys(e)){let o=e[a],l=n[a];s[a]=typeof o=="object"&&typeof l=="object"?vl(l,o,t):o===void 0?l:o}return t.set(n,{override:e,merged:s}),s}function js(n,e){let t=n;for(let i of e)t=t[i];return t}var op=Ct(),tE=(n,e)=>{let t=op.prism.memo(n,()=>new op.Atom(e),[]);return t.set(e),t},_t=Ct(),lp=Ct(),nE=/\s/;function iE(n){for(var e=n.length;e--&&nE.test(n.charAt(e)););return e}var rE=iE,sE=/^\s+/;function aE(n){return n&&n.slice(0,rE(n)+1).replace(sE,"")}var oE=aE,cp=NaN,lE=/^[-+]0x[0-9a-f]+$/i,cE=/^0b[01]+$/i,uE=/^0o[0-7]+$/i,hE=parseInt;function dE(n){if(typeof n=="number")return n;if(Nl(n))return cp;if(Cn(n)){var e=typeof n.valueOf=="function"?n.valueOf():n;n=Cn(e)?e+"":e}if(typeof n!="string")return n===0?n:+n;n=oE(n);var t=cE.test(n);return t||uE.test(n)?hE(n.slice(2),t?2:8):lE.test(n)?cp:+n}var zr=dE,up=1/0,fE=17976931348623157e292;function pE(n){if(!n)return n===0?n:0;if(n=zr(n),n===up||n===-up){var e=n<0?-1:1;return e*fE}return n===n?n:0}var mE=pE;function gE(n){var e=mE(n),t=e%1;return e===e?t?e-t:e:0}var vm=gE;function _E(n){return n}var vE=_E,yE=er(Pn,"WeakMap"),Ru=yE,hp=Object.create,xE=(function(){function n(){}return function(e){if(!Cn(e))return{};if(hp)return hp(e);n.prototype=e;var t=new n;return n.prototype=void 0,t}})(),bE=xE;function SE(n,e){var t=-1,i=n.length;for(e||(e=Array(i));++t<i;)e[t]=n[t];return e}var ME=SE;function wE(n,e){for(var t=-1,i=n==null?0:n.length;++t<i&&e(n[t],t,n)!==!1;);return n}var TE=wE;function EE(n,e,t,i){var r=!t;t||(t={});for(var s=-1,a=e.length;++s<a;){var o=e[s],l=i?i(t[o],n[o],o,t,n):void 0;l===void 0&&(l=n[o]),r?Ku(t,o,l):$u(t,o,l)}return t}var Vl=EE,AE=9007199254740991;function CE(n){return typeof n=="number"&&n>-1&&n%1==0&&n<=AE}var th=CE;function PE(n){return n!=null&&th(n.length)&&!dm(n)}var ym=PE,RE=Object.prototype;function IE(n){var e=n&&n.constructor,t=typeof e=="function"&&e.prototype||RE;return n===t}var nh=IE;function DE(n,e){for(var t=-1,i=Array(n);++t<n;)i[t]=e(t);return i}var LE=DE,NE="[object Arguments]";function OE(n){return ti(n)&&$i(n)==NE}var dp=OE,xm=Object.prototype,UE=xm.hasOwnProperty,FE=xm.propertyIsEnumerable,BE=dp((function(){return arguments})())?dp:function(n){return ti(n)&&UE.call(n,"callee")&&!FE.call(n,"callee")},bm=BE;function zE(){return!1}var VE=zE,Sm=typeof cn=="object"&&cn&&!cn.nodeType&&cn,fp=Sm&&typeof Qt=="object"&&Qt&&!Qt.nodeType&&Qt,kE=fp&&fp.exports===Sm,pp=kE?Pn.Buffer:void 0,GE=pp?pp.isBuffer:void 0,HE=GE||VE,wl=HE,WE="[object Arguments]",qE="[object Array]",XE="[object Boolean]",jE="[object Date]",YE="[object Error]",ZE="[object Function]",JE="[object Map]",KE="[object Number]",$E="[object Object]",QE="[object RegExp]",eA="[object Set]",tA="[object String]",nA="[object WeakMap]",iA="[object ArrayBuffer]",rA="[object DataView]",sA="[object Float32Array]",aA="[object Float64Array]",oA="[object Int8Array]",lA="[object Int16Array]",cA="[object Int32Array]",uA="[object Uint8Array]",hA="[object Uint8ClampedArray]",dA="[object Uint16Array]",fA="[object Uint32Array]",vt={};vt[sA]=vt[aA]=vt[oA]=vt[lA]=vt[cA]=vt[uA]=vt[hA]=vt[dA]=vt[fA]=!0;vt[WE]=vt[qE]=vt[iA]=vt[XE]=vt[rA]=vt[jE]=vt[YE]=vt[ZE]=vt[JE]=vt[KE]=vt[$E]=vt[QE]=vt[eA]=vt[tA]=vt[nA]=!1;function pA(n){return ti(n)&&th(n.length)&&!!vt[$i(n)]}var mA=pA;function gA(n){return function(e){return n(e)}}var ih=gA,Mm=typeof cn=="object"&&cn&&!cn.nodeType&&cn,Js=Mm&&typeof Qt=="object"&&Qt&&!Qt.nodeType&&Qt,_A=Js&&Js.exports===Mm,xu=_A&&um.process,vA=(function(){try{var n=Js&&Js.require&&Js.require("util").types;return n||xu&&xu.binding&&xu.binding("util")}catch{}})(),Vr=vA,mp=Vr&&Vr.isTypedArray,yA=mp?ih(mp):mA,wm=yA,xA=Object.prototype,bA=xA.hasOwnProperty;function SA(n,e){var t=Vn(n),i=!t&&bm(n),r=!t&&!i&&wl(n),s=!t&&!i&&!r&&wm(n),a=t||i||r||s,o=a?LE(n.length,String):[],l=o.length;for(var c in n)(e||bA.call(n,c))&&!(a&&(c=="length"||r&&(c=="offset"||c=="parent")||s&&(c=="buffer"||c=="byteLength"||c=="byteOffset")||Qu(c,l)))&&o.push(c);return o}var Tm=SA;function MA(n,e){return function(t){return n(e(t))}}var Em=MA,wA=Em(Object.keys,Object),TA=wA,EA=Object.prototype,AA=EA.hasOwnProperty;function CA(n){if(!nh(n))return TA(n);var e=[];for(var t in Object(n))AA.call(n,t)&&t!="constructor"&&e.push(t);return e}var PA=CA;function RA(n){return ym(n)?Tm(n):PA(n)}var aa=RA;function IA(n){var e=[];if(n!=null)for(var t in Object(n))e.push(t);return e}var DA=IA,LA=Object.prototype,NA=LA.hasOwnProperty;function OA(n){if(!Cn(n))return DA(n);var e=nh(n),t=[];for(var i in n)i=="constructor"&&(e||!NA.call(n,i))||t.push(i);return t}var UA=OA;function FA(n){return ym(n)?Tm(n,!0):UA(n)}var rh=FA;function BA(n,e){for(var t=-1,i=e.length,r=n.length;++t<i;)n[r+t]=e[t];return n}var Am=BA,zA=Em(Object.getPrototypeOf,Object),sh=zA,VA="[object Object]",kA=Function.prototype,GA=Object.prototype,Cm=kA.toString,HA=GA.hasOwnProperty,WA=Cm.call(Object);function qA(n){if(!ti(n)||$i(n)!=VA)return!1;var e=sh(n);if(e===null)return!0;var t=HA.call(e,"constructor")&&e.constructor;return typeof t=="function"&&t instanceof t&&Cm.call(t)==WA}var XA=qA;function jA(n,e,t){var i=-1,r=n.length;e<0&&(e=-e>r?0:r+e),t=t>r?r:t,t<0&&(t+=r),r=e>t?0:t-e>>>0,e>>>=0;for(var s=Array(r);++i<r;)s[i]=n[i+e];return s}var Pm=jA;function YA(n,e,t){var i=n.length;return t=t===void 0?i:t,!e&&t>=i?n:Pm(n,e,t)}var ZA=YA,JA="\\ud800-\\udfff",KA="\\u0300-\\u036f",$A="\\ufe20-\\ufe2f",QA="\\u20d0-\\u20ff",eC=KA+$A+QA,tC="\\ufe0e\\ufe0f",nC="\\u200d",iC=RegExp("["+nC+JA+eC+tC+"]");function rC(n){return iC.test(n)}var ah=rC;function sC(n){return n.split("")}var aC=sC,Rm="\\ud800-\\udfff",oC="\\u0300-\\u036f",lC="\\ufe20-\\ufe2f",cC="\\u20d0-\\u20ff",uC=oC+lC+cC,hC="\\ufe0e\\ufe0f",dC="["+Rm+"]",Iu="["+uC+"]",Du="\\ud83c[\\udffb-\\udfff]",fC="(?:"+Iu+"|"+Du+")",Im="[^"+Rm+"]",Dm="(?:\\ud83c[\\udde6-\\uddff]){2}",Lm="[\\ud800-\\udbff][\\udc00-\\udfff]",pC="\\u200d",Nm=fC+"?",Om="["+hC+"]?",mC="(?:"+pC+"(?:"+[Im,Dm,Lm].join("|")+")"+Om+Nm+")*",gC=Om+Nm+mC,_C="(?:"+[Im+Iu+"?",Iu,Dm,Lm,dC].join("|")+")",vC=RegExp(Du+"(?="+Du+")|"+_C+gC,"g");function yC(n){return n.match(vC)||[]}var xC=yC;function bC(n){return ah(n)?xC(n):aC(n)}var SC=bC;function MC(n,e,t){return n===n&&(t!==void 0&&(n=n<=t?n:t),e!==void 0&&(n=n>=e?n:e)),n}var wC=MC;function TC(n,e,t){return t===void 0&&(t=e,e=void 0),t!==void 0&&(t=zr(t),t=t===t?t:0),e!==void 0&&(e=zr(e),e=e===e?e:0),wC(zr(n),e,t)}var Um=TC;function EC(){this.__data__=new Ul,this.size=0}var AC=EC;function CC(n){var e=this.__data__,t=e.delete(n);return this.size=e.size,t}var PC=CC;function RC(n){return this.__data__.get(n)}var IC=RC;function DC(n){return this.__data__.has(n)}var LC=DC,NC=200;function OC(n,e){var t=this.__data__;if(t instanceof Ul){var i=t.__data__;if(!Qs||i.length<NC-1)return i.push([n,e]),this.size=++t.size,this;t=this.__data__=new Bl(i)}return t.set(n,e),this.size=t.size,this}var UC=OC;function Xr(n){var e=this.__data__=new Ul(n);this.size=e.size}Xr.prototype.clear=AC;Xr.prototype.delete=PC;Xr.prototype.get=IC;Xr.prototype.has=LC;Xr.prototype.set=UC;var Ks=Xr;function FC(n,e){return n&&Vl(e,aa(e),n)}var BC=FC;function zC(n,e){return n&&Vl(e,rh(e),n)}var VC=zC,Fm=typeof cn=="object"&&cn&&!cn.nodeType&&cn,gp=Fm&&typeof Qt=="object"&&Qt&&!Qt.nodeType&&Qt,kC=gp&&gp.exports===Fm,_p=kC?Pn.Buffer:void 0,vp=_p?_p.allocUnsafe:void 0;function GC(n,e){if(e)return n.slice();var t=n.length,i=vp?vp(t):new n.constructor(t);return n.copy(i),i}var HC=GC;function WC(n,e){for(var t=-1,i=n==null?0:n.length,r=0,s=[];++t<i;){var a=n[t];e(a,t,n)&&(s[r++]=a)}return s}var qC=WC;function XC(){return[]}var Bm=XC,jC=Object.prototype,YC=jC.propertyIsEnumerable,yp=Object.getOwnPropertySymbols,ZC=yp?function(n){return n==null?[]:(n=Object(n),qC(yp(n),function(e){return YC.call(n,e)}))}:Bm,oh=ZC;function JC(n,e){return Vl(n,oh(n),e)}var KC=JC,$C=Object.getOwnPropertySymbols,QC=$C?function(n){for(var e=[];n;)Am(e,oh(n)),n=sh(n);return e}:Bm,zm=QC;function eP(n,e){return Vl(n,zm(n),e)}var tP=eP;function nP(n,e,t){var i=e(n);return Vn(n)?i:Am(i,t(n))}var Vm=nP;function iP(n){return Vm(n,aa,oh)}var Lu=iP;function rP(n){return Vm(n,rh,zm)}var sP=rP,aP=er(Pn,"DataView"),Nu=aP,oP=er(Pn,"Promise"),Ou=oP,lP=er(Pn,"Set"),Uu=lP,xp="[object Map]",cP="[object Object]",bp="[object Promise]",Sp="[object Set]",Mp="[object WeakMap]",wp="[object DataView]",uP=Qi(Nu),hP=Qi(Qs),dP=Qi(Ou),fP=Qi(Uu),pP=Qi(Ru),qi=$i;(Nu&&qi(new Nu(new ArrayBuffer(1)))!=wp||Qs&&qi(new Qs)!=xp||Ou&&qi(Ou.resolve())!=bp||Uu&&qi(new Uu)!=Sp||Ru&&qi(new Ru)!=Mp)&&(qi=function(n){var e=$i(n),t=e==cP?n.constructor:void 0,i=t?Qi(t):"";if(i)switch(i){case uP:return wp;case hP:return xp;case dP:return bp;case fP:return Sp;case pP:return Mp}return e});var ea=qi,mP=Object.prototype,gP=mP.hasOwnProperty;function _P(n){var e=n.length,t=new n.constructor(e);return e&&typeof n[0]=="string"&&gP.call(n,"index")&&(t.index=n.index,t.input=n.input),t}var vP=_P,yP=Pn.Uint8Array,Tl=yP;function xP(n){var e=new n.constructor(n.byteLength);return new Tl(e).set(new Tl(n)),e}var lh=xP;function bP(n,e){var t=e?lh(n.buffer):n.buffer;return new n.constructor(t,n.byteOffset,n.byteLength)}var SP=bP,MP=/\w*$/;function wP(n){var e=new n.constructor(n.source,MP.exec(n));return e.lastIndex=n.lastIndex,e}var TP=wP,Tp=kn?kn.prototype:void 0,Ep=Tp?Tp.valueOf:void 0;function EP(n){return Ep?Object(Ep.call(n)):{}}var AP=EP;function CP(n,e){var t=e?lh(n.buffer):n.buffer;return new n.constructor(t,n.byteOffset,n.length)}var PP=CP,RP="[object Boolean]",IP="[object Date]",DP="[object Map]",LP="[object Number]",NP="[object RegExp]",OP="[object Set]",UP="[object String]",FP="[object Symbol]",BP="[object ArrayBuffer]",zP="[object DataView]",VP="[object Float32Array]",kP="[object Float64Array]",GP="[object Int8Array]",HP="[object Int16Array]",WP="[object Int32Array]",qP="[object Uint8Array]",XP="[object Uint8ClampedArray]",jP="[object Uint16Array]",YP="[object Uint32Array]";function ZP(n,e,t){var i=n.constructor;switch(e){case BP:return lh(n);case RP:case IP:return new i(+n);case zP:return SP(n,t);case VP:case kP:case GP:case HP:case WP:case qP:case XP:case jP:case YP:return PP(n,t);case DP:return new i;case LP:case UP:return new i(n);case NP:return TP(n);case OP:return new i;case FP:return AP(n)}}var JP=ZP;function KP(n){return typeof n.constructor=="function"&&!nh(n)?bE(sh(n)):{}}var $P=KP,QP="[object Map]";function eR(n){return ti(n)&&ea(n)==QP}var tR=eR,Ap=Vr&&Vr.isMap,nR=Ap?ih(Ap):tR,iR=nR,rR="[object Set]";function sR(n){return ti(n)&&ea(n)==rR}var aR=sR,Cp=Vr&&Vr.isSet,oR=Cp?ih(Cp):aR,lR=oR,cR=1,uR=2,hR=4,km="[object Arguments]",dR="[object Array]",fR="[object Boolean]",pR="[object Date]",mR="[object Error]",Gm="[object Function]",gR="[object GeneratorFunction]",_R="[object Map]",vR="[object Number]",Hm="[object Object]",yR="[object RegExp]",xR="[object Set]",bR="[object String]",SR="[object Symbol]",MR="[object WeakMap]",wR="[object ArrayBuffer]",TR="[object DataView]",ER="[object Float32Array]",AR="[object Float64Array]",CR="[object Int8Array]",PR="[object Int16Array]",RR="[object Int32Array]",IR="[object Uint8Array]",DR="[object Uint8ClampedArray]",LR="[object Uint16Array]",NR="[object Uint32Array]",ut={};ut[km]=ut[dR]=ut[wR]=ut[TR]=ut[fR]=ut[pR]=ut[ER]=ut[AR]=ut[CR]=ut[PR]=ut[RR]=ut[_R]=ut[vR]=ut[Hm]=ut[yR]=ut[xR]=ut[bR]=ut[SR]=ut[IR]=ut[DR]=ut[LR]=ut[NR]=!0;ut[mR]=ut[Gm]=ut[MR]=!1;function yl(n,e,t,i,r,s){var a,o=e&cR,l=e&uR,c=e&hR;if(t&&(a=r?t(n,i,r,s):t(n)),a!==void 0)return a;if(!Cn(n))return n;var u=Vn(n);if(u){if(a=vP(n),!o)return ME(n,a)}else{var d=ea(n),h=d==Gm||d==gR;if(wl(n))return HC(n,o);if(d==Hm||d==km||h&&!r){if(a=l||h?{}:$P(n),!o)return l?tP(n,VC(a,n)):KC(n,BC(a,n))}else{if(!ut[d])return r?n:{};a=JP(n,d,o)}}s||(s=new Ks);var p=s.get(n);if(p)return p;s.set(n,a),lR(n)?n.forEach(function(m){a.add(yl(m,e,t,m,n,s))}):iR(n)&&n.forEach(function(m,f){a.set(f,yl(m,e,t,f,n,s))});var _=c?l?sP:Lu:l?rh:aa,x=u?void 0:_(n);return TE(x||n,function(m,f){x&&(f=m,m=n[f]),$u(a,f,yl(m,e,t,f,n,s))}),a}var OR=yl,UR=1,FR=4;function BR(n){return OR(n,UR|FR)}var zR=BR,VR="__lodash_hash_undefined__";function kR(n){return this.__data__.set(n,VR),this}var GR=kR;function HR(n){return this.__data__.has(n)}var WR=HR;function El(n){var e=-1,t=n==null?0:n.length;for(this.__data__=new Bl;++e<t;)this.add(n[e])}El.prototype.add=El.prototype.push=GR;El.prototype.has=WR;var qR=El;function XR(n,e){for(var t=-1,i=n==null?0:n.length;++t<i;)if(e(n[t],t,n))return!0;return!1}var jR=XR;function YR(n,e){return n.has(e)}var ZR=YR,JR=1,KR=2;function $R(n,e,t,i,r,s){var a=t&JR,o=n.length,l=e.length;if(o!=l&&!(a&&l>o))return!1;var c=s.get(n),u=s.get(e);if(c&&u)return c==e&&u==n;var d=-1,h=!0,p=t&KR?new qR:void 0;for(s.set(n,e),s.set(e,n);++d<o;){var _=n[d],x=e[d];if(i)var m=a?i(x,_,d,e,n,s):i(_,x,d,n,e,s);if(m!==void 0){if(m)continue;h=!1;break}if(p){if(!jR(e,function(f,T){if(!ZR(p,T)&&(_===f||r(_,f,t,i,s)))return p.push(T)})){h=!1;break}}else if(!(_===x||r(_,x,t,i,s))){h=!1;break}}return s.delete(n),s.delete(e),h}var Wm=$R;function QR(n){var e=-1,t=Array(n.size);return n.forEach(function(i,r){t[++e]=[r,i]}),t}var eI=QR;function tI(n){var e=-1,t=Array(n.size);return n.forEach(function(i){t[++e]=i}),t}var nI=tI,iI=1,rI=2,sI="[object Boolean]",aI="[object Date]",oI="[object Error]",lI="[object Map]",cI="[object Number]",uI="[object RegExp]",hI="[object Set]",dI="[object String]",fI="[object Symbol]",pI="[object ArrayBuffer]",mI="[object DataView]",Pp=kn?kn.prototype:void 0,bu=Pp?Pp.valueOf:void 0;function gI(n,e,t,i,r,s,a){switch(t){case mI:if(n.byteLength!=e.byteLength||n.byteOffset!=e.byteOffset)return!1;n=n.buffer,e=e.buffer;case pI:return!(n.byteLength!=e.byteLength||!s(new Tl(n),new Tl(e)));case sI:case aI:case cI:return ju(+n,+e);case oI:return n.name==e.name&&n.message==e.message;case uI:case dI:return n==e+"";case lI:var o=eI;case hI:var l=i&iI;if(o||(o=nI),n.size!=e.size&&!l)return!1;var c=a.get(n);if(c)return c==e;i|=rI,a.set(n,e);var u=Wm(o(n),o(e),i,r,s,a);return a.delete(n),u;case fI:if(bu)return bu.call(n)==bu.call(e)}return!1}var _I=gI,vI=1,yI=Object.prototype,xI=yI.hasOwnProperty;function bI(n,e,t,i,r,s){var a=t&vI,o=Lu(n),l=o.length,c=Lu(e),u=c.length;if(l!=u&&!a)return!1;for(var d=l;d--;){var h=o[d];if(!(a?h in e:xI.call(e,h)))return!1}var p=s.get(n),_=s.get(e);if(p&&_)return p==e&&_==n;var x=!0;s.set(n,e),s.set(e,n);for(var m=a;++d<l;){h=o[d];var f=n[h],T=e[h];if(i)var P=a?i(T,f,h,e,n,s):i(f,T,h,n,e,s);if(!(P===void 0?f===T||r(f,T,t,i,s):P)){x=!1;break}m||(m=h=="constructor")}if(x&&!m){var S=n.constructor,b=e.constructor;S!=b&&"constructor"in n&&"constructor"in e&&!(typeof S=="function"&&S instanceof S&&typeof b=="function"&&b instanceof b)&&(x=!1)}return s.delete(n),s.delete(e),x}var SI=bI,MI=1,Rp="[object Arguments]",Ip="[object Array]",gl="[object Object]",wI=Object.prototype,Dp=wI.hasOwnProperty;function TI(n,e,t,i,r,s){var a=Vn(n),o=Vn(e),l=a?Ip:ea(n),c=o?Ip:ea(e);l=l==Rp?gl:l,c=c==Rp?gl:c;var u=l==gl,d=c==gl,h=l==c;if(h&&wl(n)){if(!wl(e))return!1;a=!0,u=!1}if(h&&!u)return s||(s=new Ks),a||wm(n)?Wm(n,e,t,i,r,s):_I(n,e,l,t,i,r,s);if(!(t&MI)){var p=u&&Dp.call(n,"__wrapped__"),_=d&&Dp.call(e,"__wrapped__");if(p||_){var x=p?n.value():n,m=_?e.value():e;return s||(s=new Ks),r(x,m,t,i,s)}}return h?(s||(s=new Ks),SI(n,e,t,i,r,s)):!1}var EI=TI;function qm(n,e,t,i,r){return n===e?!0:n==null||e==null||!ti(n)&&!ti(e)?n!==n&&e!==e:EI(n,e,t,i,qm,r)}var Xm=qm,AI=1,CI=2;function PI(n,e,t,i){var r=t.length,s=r,a=!i;if(n==null)return!s;for(n=Object(n);r--;){var o=t[r];if(a&&o[2]?o[1]!==n[o[0]]:!(o[0]in n))return!1}for(;++r<s;){o=t[r];var l=o[0],c=n[l],u=o[1];if(a&&o[2]){if(c===void 0&&!(l in n))return!1}else{var d=new Ks;if(i)var h=i(c,u,l,n,e,d);if(!(h===void 0?Xm(u,c,AI|CI,i,d):h))return!1}}return!0}var RI=PI;function II(n){return n===n&&!Cn(n)}var jm=II;function DI(n){for(var e=aa(n),t=e.length;t--;){var i=e[t],r=n[i];e[t]=[i,r,jm(r)]}return e}var LI=DI;function NI(n,e){return function(t){return t==null?!1:t[n]===e&&(e!==void 0||n in Object(t))}}var Ym=NI;function OI(n){var e=LI(n);return e.length==1&&e[0][2]?Ym(e[0][0],e[0][1]):function(t){return t===n||RI(t,n,e)}}var UI=OI;function FI(n,e){return n!=null&&e in Object(n)}var BI=FI;function zI(n,e,t){e=zl(e,n);for(var i=-1,r=e.length,s=!1;++i<r;){var a=qr(e[i]);if(!(s=n!=null&&t(n,a)))break;n=n[a]}return s||++i!=r?s:(r=n==null?0:n.length,!!r&&th(r)&&Qu(a,r)&&(Vn(n)||bm(n)))}var VI=zI;function kI(n,e){return n!=null&&VI(n,e,BI)}var GI=kI,HI=1,WI=2;function qI(n,e){return Xu(n)&&jm(e)?Ym(qr(n),e):function(t){var i=gm(t,n);return i===void 0&&i===e?GI(t,n):Xm(e,i,HI|WI)}}var XI=qI;function jI(n){return function(e){return e?.[n]}}var Zm=jI;function YI(n){return function(e){return Zu(e,n)}}var ZI=YI;function JI(n){return Xu(n)?Zm(qr(n)):ZI(n)}var KI=JI;function $I(n){return typeof n=="function"?n:n==null?vE:typeof n=="object"?Vn(n)?XI(n[0],n[1]):UI(n):KI(n)}var QI=$I;function e3(n){return function(e,t,i){for(var r=-1,s=Object(e),a=i(e),o=a.length;o--;){var l=a[n?o:++r];if(t(s[l],l,s)===!1)break}return e}}var t3=e3,n3=t3(),i3=n3;function r3(n,e){return n&&i3(n,e,aa)}var s3=r3,a3=function(){return Pn.Date.now()},Su=a3,o3="Expected a function",l3=Math.max,c3=Math.min;function u3(n,e,t){var i,r,s,a,o,l,c=0,u=!1,d=!1,h=!0;if(typeof n!="function")throw new TypeError(o3);e=zr(e)||0,Cn(t)&&(u=!!t.leading,d="maxWait"in t,s=d?l3(zr(t.maxWait)||0,e):s,h="trailing"in t?!!t.trailing:h);function p(M){var A=i,v=r;return i=r=void 0,c=M,a=n.apply(v,A),a}function _(M){return c=M,o=setTimeout(f,e),u?p(M):a}function x(M){var A=M-l,v=M-c,w=e-A;return d?c3(w,s-v):w}function m(M){var A=M-l,v=M-c;return l===void 0||A>=e||A<0||d&&v>=s}function f(){var M=Su();if(m(M))return T(M);o=setTimeout(f,x(M))}function T(M){return o=void 0,h&&i?p(M):(i=r=void 0,a)}function P(){o!==void 0&&clearTimeout(o),c=0,i=l=r=o=void 0}function S(){return o===void 0?a:T(Su())}function b(){var M=Su(),A=m(M);if(i=arguments,r=this,l=M,A){if(o===void 0)return _(l);if(d)return clearTimeout(o),o=setTimeout(f,e),p(l)}return o===void 0&&(o=setTimeout(f,e)),a}return b.cancel=P,b.flush=S,b}var h3=u3;function d3(n){var e=n==null?0:n.length;return e?n[e-1]:void 0}var f3=d3;function p3(n,e){return e.length<2?n:Zu(n,Pm(e,0,-1))}var m3=p3;function g3(n){return typeof n=="number"&&n==vm(n)}var _3=g3;function v3(n,e){var t={};return e=QI(e,3),s3(n,function(i,r,s){Ku(t,r,e(i,r,s))}),t}var y3=v3;function x3(n,e){return e=zl(e,n),n=m3(n,e),n==null||delete n[qr(f3(e))]}var b3=x3,S3=9007199254740991,M3=Math.floor;function w3(n,e){var t="";if(!n||e<1||e>S3)return t;do e%2&&(t+=n),e=M3(e/2),e&&(n+=n);while(e);return t}var Lp=w3,T3=Zm("length"),E3=T3,Jm="\\ud800-\\udfff",A3="\\u0300-\\u036f",C3="\\ufe20-\\ufe2f",P3="\\u20d0-\\u20ff",R3=A3+C3+P3,I3="\\ufe0e\\ufe0f",D3="["+Jm+"]",Fu="["+R3+"]",Bu="\\ud83c[\\udffb-\\udfff]",L3="(?:"+Fu+"|"+Bu+")",Km="[^"+Jm+"]",$m="(?:\\ud83c[\\udde6-\\uddff]){2}",Qm="[\\ud800-\\udbff][\\udc00-\\udfff]",N3="\\u200d",eg=L3+"?",tg="["+I3+"]?",O3="(?:"+N3+"(?:"+[Km,$m,Qm].join("|")+")"+tg+eg+")*",U3=tg+eg+O3,F3="(?:"+[Km+Fu+"?",Fu,$m,Qm,D3].join("|")+")",Np=RegExp(Bu+"(?="+Bu+")|"+F3+U3,"g");function B3(n){for(var e=Np.lastIndex=0;Np.test(n);)++e;return e}var z3=B3;function V3(n){return ah(n)?z3(n):E3(n)}var ng=V3,k3=Math.ceil;function G3(n,e){e=e===void 0?" ":pm(e);var t=e.length;if(t<2)return t?Lp(e,n):e;var i=Lp(e,k3(n/ng(e)));return ah(e)?ZA(SC(i),0,n).join(""):i.slice(0,n)}var H3=G3;function W3(n,e,t){n=mm(n),e=vm(e);var i=e?ng(n):0;return e&&i<e?H3(e-i,t)+n:n}var Ys=W3;function q3(n,e){return n==null?!0:b3(n,e)}var Op=q3,Up=5*1e3,X3=class{constructor(n){xe(this,"_cache",new Ju),xe(this,"_keepHotUntapDebounce"),sa(this,n)}get type(){return"Theatre_SheetObject_PublicAPI"}get props(){return st(this).propsP}get sheet(){return st(this).sheet.publicApi}get project(){return st(this).sheet.project.publicApi}get address(){return bt({},st(this).address)}_valuesPrism(){return this._cache.get("_valuesPrism",()=>{let n=st(this);return(0,lp.prism)(()=>(0,lp.val)(n.getValues().getValue()))})}onValuesChange(n,e){return Sh(this._valuesPrism(),n,e)}get value(){let n=this._valuesPrism();if(Up!=null){if(!n.isHot){this._keepHotUntapDebounce!=null&&this._keepHotUntapDebounce.flush();let e=n.keepHot();this._keepHotUntapDebounce=h3(()=>{e(),this._keepHotUntapDebounce=void 0},Up)}this._keepHotUntapDebounce&&this._keepHotUntapDebounce()}return n.getValue()}set initialValue(n){st(this).setInitialValue(n)}};function ig(n){let e=new WeakMap;return t=>(e.has(t)||e.set(t,n(t)),e.get(t))}function ta(n){return n.type==="compound"||n.type==="enum"}function ch(n,e){if(!n)return;let[t,...i]=e;if(t===void 0)return n;if(!ta(n))return;let r=n.type==="enum"?n.cases[t]:n.props[t];return ch(r,i)}function j3(n){return!ta(n)}var Y3=ig(n=>{if(n.type==="enum")throw new Error("Not implemented yet for enums");for(let e in n.props){let t=n.props[e];if(ta(t)){if(Y3(t))return!0}else return!0}return!1}),Z3=class{constructor(n,e,t){this.sheet=n,this.template=e,this.nativeObject=t,xe(this,"$$isPointerToPrismProvider",!0),xe(this,"address"),xe(this,"publicApi"),xe(this,"_initialValue",new _t.Atom({})),xe(this,"_cache",new Ju),xe(this,"_logger"),xe(this,"_internalUtilCtx"),this._logger=n._logger.named("SheetObject",e.address.objectKey),this._logger._trace("creating object"),this._internalUtilCtx={logger:this._logger.utilFor.internal()},this.address=Gn(bt({},e.address),{sheetInstanceId:n.address.sheetInstanceId}),this.publicApi=new X3(this)}get type(){return"Theatre_SheetObject"}getValues(){return this._cache.get("getValues()",()=>(0,_t.prism)(()=>{let n=(0,_t.val)(this.template.getDefaultValues()),e=(0,_t.val)(this._initialValue.pointer),t=_t.prism.memo("withInitialCache",()=>new WeakMap,[]),i=vl(n,e,t),r=(0,_t.val)(this.template.getStaticValues()),s=_t.prism.memo("withStatics",()=>new WeakMap,[]),o=vl(i,r,s),l;{let u=_t.prism.memo("seq",()=>this.getSequencedValues(),[]),d=_t.prism.memo("withSeqsCache",()=>new WeakMap,[]);l=(0,_t.val)((0,_t.val)(u)),o=vl(o,l,d)}return tE("finalAtom",o).pointer}))}getValueByPointer(n){let e=(0,_t.val)(this.getValues()),{path:t}=(0,_t.getPointerParts)(n);return(0,_t.val)(js(e,t))}pointerToPrism(n){let{path:e}=(0,_t.getPointerParts)(n);return(0,_t.prism)(()=>{let t=(0,_t.val)(this.getValues());return(0,_t.val)(js(t,e))})}getSequencedValues(){return(0,_t.prism)(()=>{let n=_t.prism.memo("tracksToProcess",()=>this.template.getArrayOfValidSequenceTracks(),[]),e=(0,_t.val)(n),t=new _t.Atom({}),i=(0,_t.val)(this.template.configPointer);return _t.prism.effect("processTracks",()=>{let r=[];for(let{trackId:s,pathToProp:a}of e){let o=this._trackIdToPrism(s),l=ch(i,a),c=l.deserializeAndSanitize,u=l.interpolate,d=()=>{let p=o.getValue();if(!p)return t.setByPointer(T=>js(T,a),void 0);let _=c(p.left),x=_===void 0?l.default:_;if(p.right===void 0)return t.setByPointer(T=>js(T,a),x);let m=c(p.right),f=m===void 0?l.default:m;return t.setByPointer(T=>js(T,a),u(x,f,p.progression))},h=o.onStale(d);d(),r.push(h)}return()=>{for(let s of r)s()}},[i,...e]),t.pointer})}_trackIdToPrism(n){let e=this.template.project.pointers.historic.sheetsById[this.address.sheetId].sequence.tracksByObject[this.address.objectKey].trackData[n],t=this.sheet.getSequence().positionPrism;return $1(this._internalUtilCtx,e,t)}get propsP(){return this._cache.get("propsP",()=>(0,_t.pointer)({root:this,path:[]}))}validateValue(n,e){}setInitialValue(n){this.validateValue(this.propsP,n),this._initialValue.set(n)}};function ht(n){return function(t,i){return n(t,i())}}var an={_hmm:on(524),_todo:on(522),_error:on(521),errorDev:on(529),errorPublic:on(545),_kapow:on(268),_warn:on(265),warnDev:on(273),warnPublic:on(289),_debug:on(137),debugDev:on(145),_trace:on(73),traceDev:on(81)};function on(n){return Object.freeze({audience:Wi(n,8)?"internal":Wi(n,16)?"dev":"public",category:Wi(n,4)?"troubleshooting":Wi(n,2)?"todo":"general",level:Wi(n,512)?512:Wi(n,256)?256:Wi(n,128)?128:64})}function Wi(n,e){return(n&e)===e}function dt(n,e){return((e&32)===32?!0:(e&16)===16?n.dev:(e&8)===8?n.internal:!1)&&n.min<=e}var Qn={loggingConsoleStyle:!0,loggerConsoleStyle:!0,includes:Object.freeze({internal:!1,dev:!1,min:256}),filtered:function(){},include:function(){return{}},create:null,creatExt:null,named(n,e,t){return this.create({names:[...n.names,{name:e,key:t}]})},style:{bold:void 0,italic:void 0,cssMemo:new Map([["",""]]),collapseOnRE:/[a-z- ]+/g,color:void 0,collapsed(n){if(n.length<5)return n;let e=n.replace(this.collapseOnRE,"");return this.cssMemo.has(e)||this.cssMemo.set(e,this.css(n)),e},css(n){var e,t,i,r;let s=this.cssMemo.get(n);if(s)return s;let a="color:".concat((t=(e=this.color)==null?void 0:e.call(this,n))!=null?t:"hsl(".concat((n.charCodeAt(0)+n.charCodeAt(n.length-1))%360,", 100%, 60%)"));return(i=this.bold)!=null&&i.test(n)&&(a+=";font-weight:600"),(r=this.italic)!=null&&r.test(n)&&(a+=";font-style:italic"),this.cssMemo.set(n,a),a}}};function rg(n=console,e={}){let t=Gn(bt({},Qn),{includes:bt({},Qn.includes)}),i={styled:$3.bind(t,n),noStyle:eD.bind(t,n)},r=K3.bind(t);function s(){return t.loggingConsoleStyle&&t.loggerConsoleStyle?i.styled:i.noStyle}return t.create=s(),{configureLogger(a){var o;a==="console"?(t.loggerConsoleStyle=Qn.loggerConsoleStyle,t.create=s()):a.type==="console"?(t.loggerConsoleStyle=(o=a.style)!=null?o:Qn.loggerConsoleStyle,t.create=s()):a.type==="keyed"?(t.creatExt=l=>a.keyed(l.names),t.create=r):a.type==="named"&&(t.creatExt=J3.bind(null,a.named),t.create=r)},configureLogging(a){var o,l,c,u,d;t.includes.dev=(o=a.dev)!=null?o:Qn.includes.dev,t.includes.internal=(l=a.internal)!=null?l:Qn.includes.internal,t.includes.min=(c=a.min)!=null?c:Qn.includes.min,t.include=(u=a.include)!=null?u:Qn.include,t.loggingConsoleStyle=(d=a.consoleStyle)!=null?d:Qn.loggingConsoleStyle,t.create=s()},getLogger(){return t.create({names:[]})}}}function J3(n,e){let t=[];for(let{name:i,key:r}of e.names)t.push(r==null?i:"".concat(i," (").concat(r,")"));return n(t)}function K3(n){let e=bt(bt({},this.includes),this.include(n)),t=this.filtered,i=this.named.bind(this,n),r=this.creatExt(n),s=dt(e,524),a=dt(e,522),o=dt(e,521),l=dt(e,529),c=dt(e,545),u=dt(e,265),d=dt(e,268),h=dt(e,273),p=dt(e,289),_=dt(e,137),x=dt(e,145),m=dt(e,73),f=dt(e,81),T=s?r.error.bind(r,an._hmm):t.bind(n,524),P=a?r.error.bind(r,an._todo):t.bind(n,522),S=o?r.error.bind(r,an._error):t.bind(n,521),b=l?r.error.bind(r,an.errorDev):t.bind(n,529),M=c?r.error.bind(r,an.errorPublic):t.bind(n,545),A=d?r.warn.bind(r,an._kapow):t.bind(n,268),v=u?r.warn.bind(r,an._warn):t.bind(n,265),w=h?r.warn.bind(r,an.warnDev):t.bind(n,273),C=p?r.warn.bind(r,an.warnPublic):t.bind(n,273),L=_?r.debug.bind(r,an._debug):t.bind(n,137),O=x?r.debug.bind(r,an.debugDev):t.bind(n,145),B=m?r.trace.bind(r,an._trace):t.bind(n,73),R=f?r.trace.bind(r,an.traceDev):t.bind(n,81),U={_hmm:T,_todo:P,_error:S,errorDev:b,errorPublic:M,_kapow:A,_warn:v,warnDev:w,warnPublic:C,_debug:L,debugDev:O,_trace:B,traceDev:R,lazy:{_hmm:s?ht(T):T,_todo:a?ht(P):P,_error:o?ht(S):S,errorDev:l?ht(b):b,errorPublic:c?ht(M):M,_kapow:d?ht(A):A,_warn:u?ht(v):v,warnDev:h?ht(w):w,warnPublic:p?ht(C):C,_debug:_?ht(L):L,debugDev:x?ht(O):O,_trace:m?ht(B):B,traceDev:f?ht(R):R},named:i,utilFor:{internal(){return{debug:U._debug,error:U._error,warn:U._warn,trace:U._trace,named(X,G){return U.named(X,G).utilFor.internal()}}},dev(){return{debug:U.debugDev,error:U.errorDev,warn:U.warnDev,trace:U.traceDev,named(X,G){return U.named(X,G).utilFor.dev()}}},public(){return{error:U.errorPublic,warn:U.warnPublic,debug(X,G){U._warn('(public "debug" filtered out) '.concat(X),G)},trace(X,G){U._warn('(public "trace" filtered out) '.concat(X),G)},named(X,G){return U.named(X,G).utilFor.public()}}}}};return U}function $3(n,e){let t=bt(bt({},this.includes),this.include(e)),i=[],r="";for(let l=0;l<e.names.length;l++){let{name:c,key:u}=e.names[l];if(r+=" %c".concat(c),i.push(this.style.css(c)),u!=null){let d="%c#".concat(u);r+=d,i.push(this.style.css(d))}}let s=this.filtered,a=this.named.bind(this,e),o=[r,...i];return sg(s,e,t,n,o,Q3(o),a)}function Q3(n){let e=n.slice(0);for(let t=1;t<e.length;t++)e[t]+=";background-color:#e0005a;padding:2px;color:white";return e}function eD(n,e){let t=bt(bt({},this.includes),this.include(e)),i="";for(let o=0;o<e.names.length;o++){let{name:l,key:c}=e.names[o];i+=" ".concat(l),c!=null&&(i+="#".concat(c))}let r=this.filtered,s=this.named.bind(this,e),a=[i];return sg(r,e,t,n,a,a,s)}function sg(n,e,t,i,r,s,a){let o=dt(t,524),l=dt(t,522),c=dt(t,521),u=dt(t,529),d=dt(t,545),h=dt(t,265),p=dt(t,268),_=dt(t,273),x=dt(t,289),m=dt(t,137),f=dt(t,145),T=dt(t,73),P=dt(t,81),S=o?i.error.bind(i,...r):n.bind(e,524),b=l?i.error.bind(i,...r):n.bind(e,522),M=c?i.error.bind(i,...r):n.bind(e,521),A=u?i.error.bind(i,...r):n.bind(e,529),v=d?i.error.bind(i,...r):n.bind(e,545),w=p?i.warn.bind(i,...s):n.bind(e,268),C=h?i.warn.bind(i,...r):n.bind(e,265),L=_?i.warn.bind(i,...r):n.bind(e,273),O=x?i.warn.bind(i,...r):n.bind(e,273),B=m?i.info.bind(i,...r):n.bind(e,137),R=f?i.info.bind(i,...r):n.bind(e,145),U=T?i.debug.bind(i,...r):n.bind(e,73),X=P?i.debug.bind(i,...r):n.bind(e,81),G={_hmm:S,_todo:b,_error:M,errorDev:A,errorPublic:v,_kapow:w,_warn:C,warnDev:L,warnPublic:O,_debug:B,debugDev:R,_trace:U,traceDev:X,lazy:{_hmm:o?ht(S):S,_todo:l?ht(b):b,_error:c?ht(M):M,errorDev:u?ht(A):A,errorPublic:d?ht(v):v,_kapow:p?ht(w):w,_warn:h?ht(C):C,warnDev:_?ht(L):L,warnPublic:x?ht(O):O,_debug:m?ht(B):B,debugDev:f?ht(R):R,_trace:T?ht(U):U,traceDev:P?ht(X):X},named:a,utilFor:{internal(){return{debug:G._debug,error:G._error,warn:G._warn,trace:G._trace,named(te,W){return G.named(te,W).utilFor.internal()}}},dev(){return{debug:G.debugDev,error:G.errorDev,warn:G.warnDev,trace:G.traceDev,named(te,W){return G.named(te,W).utilFor.dev()}}},public(){return{error:G.errorPublic,warn:G.warnPublic,debug(te,W){G._warn('(public "debug" filtered out) '.concat(te),W)},trace(te,W){G._warn('(public "trace" filtered out) '.concat(te),W)},named(te,W){return G.named(te,W).utilFor.public()}}}}};return G}var ag=rg(console,{_debug:function(){},_error:function(){}});ag.configureLogging({dev:!0,min:64});var xl=ag.getLogger().named("Theatre.js (default logger)").utilFor.dev(),Fp=new WeakMap;function tD(n){let e=Fp.get(n);if(e)return e;let t=new Map;return Fp.set(n,t),og([],n,t),t}function og(n,e,t){for(let[i,r]of Object.entries(e.props))if(!ta(r)){let s=[...n,i];t.set(JSON.stringify(s),t.size),Bp(s,r,t)}for(let[i,r]of Object.entries(e.props))if(ta(r)){let s=[...n,i];t.set(JSON.stringify(s),t.size),Bp(s,r,t)}}function Bp(n,e,t){if(e.type==="compound")og(n,e,t);else{if(e.type==="enum")throw new Error("Enums aren't supported yet");t.set(JSON.stringify(n),t.size)}}function zp(n){return typeof n=="object"&&n!==null&&Object.keys(n).length===0}var nD=class{constructor(n,e,t,i,r){this.sheetTemplate=n,xe(this,"address"),xe(this,"type","Theatre_SheetObjectTemplate"),xe(this,"_config"),xe(this,"_temp_actions_atom"),xe(this,"_cache",new Ju),xe(this,"project"),xe(this,"pointerToSheetState"),xe(this,"pointerToStaticOverrides"),this.address=Gn(bt({},n.address),{objectKey:e}),this._config=new Ht.Atom(i),this._temp_actions_atom=new Ht.Atom(r),this.project=n.project,this.pointerToSheetState=this.sheetTemplate.project.pointers.historic.sheetsById[this.address.sheetId],this.pointerToStaticOverrides=this.pointerToSheetState.staticOverrides.byObject[this.address.objectKey]}get staticConfig(){return this._config.get()}get configPointer(){return this._config.pointer}get _temp_actions(){return this._temp_actions_atom.get()}get _temp_actionsPointer(){return this._temp_actions_atom.pointer}createInstance(n,e,t){return this._config.set(t),new Z3(n,this,e)}reconfigure(n){this._config.set(n)}_temp_setActions(n){this._temp_actions_atom.set(n)}getDefaultValues(){return this._cache.get("getDefaultValues()",()=>(0,Ht.prism)(()=>{let n=(0,Ht.val)(this.configPointer);return Y1(n)}))}getStaticValues(){return this._cache.get("getStaticValues",()=>(0,Ht.prism)(()=>{var n;let e=(n=(0,Ht.val)(this.pointerToStaticOverrides))!=null?n:{};return(0,Ht.val)(this.configPointer).deserializeAndSanitize(e)||{}}))}getArrayOfValidSequenceTracks(){return this._cache.get("getArrayOfValidSequenceTracks",()=>(0,Ht.prism)(()=>{let n=this.project.pointers.historic.sheetsById[this.address.sheetId],e=(0,Ht.val)(n.sequence.tracksByObject[this.address.objectKey].trackIdByPropPath);if(!e)return _u;let t=[];if(!e)return _u;let i=(0,Ht.val)(this.configPointer),r=Object.entries(e);for(let[a,o]of r){let l=iD(a);if(!l)continue;let c=ch(i,l);c&&j3(c)&&t.push({pathToProp:l,trackId:o})}let s=tD(i);return t.sort((a,o)=>{let l=a.pathToProp,c=o.pathToProp,u=s.get(JSON.stringify(l)),d=s.get(JSON.stringify(c));return u>d?1:-1}),t.length===0?_u:t}))}getMapOfValidSequenceTracks_forStudio(){return this._cache.get("getMapOfValidSequenceTracks_forStudio",()=>(0,Ht.prism)(()=>{let n=(0,Ht.val)(this.getArrayOfValidSequenceTracks()),e={};for(let{pathToProp:t,trackId:i}of n)j1(e,t,i);return e}))}getStaticButNotSequencedOverrides(){return this._cache.get("getStaticButNotSequencedOverrides",()=>(0,Ht.prism)(()=>{let n=(0,Ht.val)(this.getStaticValues()),e=(0,Ht.val)(this.getArrayOfValidSequenceTracks()),t=zR(n);for(let{pathToProp:i}of e){Op(t,i);let r=i.slice(0,-1);for(;r.length>0;){let s=sp(t,r);if(!zp(s))break;Op(t,r),r=r.slice(0,-1)}}if(!zp(t))return t}))}getDefaultsAtPointer(n){let{path:e}=(0,Ht.getPointerParts)(n),t=this.getDefaultValues().getValue();return sp(t,e)}};function iD(n){try{return JSON.parse(n)}catch{xl.warn("property ".concat(JSON.stringify(n)," cannot be parsed. Skipping."));return}}var Vp=Ct(),rD=ig(n=>JSON.stringify(n)),vU=Ll(Iw()),sD=class extends Error{},kr=class extends sD{},kp=Ct(),aD=Ct(),oD=Ct(),Nt=Ct();function Ei(){let n,e,t=new Promise((r,s)=>{n=a=>{r(a),i.status="resolved"},e=a=>{s(a),i.status="rejected"}}),i={resolve:n,reject:e,promise:t,status:"pending"};return i}var lD=()=>{},Al=lD,cD=Ct(),uD=class{constructor(){xe(this,"_stopPlayCallback",Al),xe(this,"_state",new cD.Atom({position:0,playing:!1})),xe(this,"statePointer"),this.statePointer=this._state.pointer}destroy(){}pause(){this._stopPlayCallback(),this.playing=!1,this._stopPlayCallback=Al}gotoPosition(n){this._updatePositionInState(n)}_updatePositionInState(n){this._state.setByPointer(e=>e.position,n)}getCurrentPosition(){return this._state.get().position}get playing(){return this._state.get().playing}set playing(n){this._state.setByPointer(e=>e.playing,n)}play(n,e,t,i,r){this.playing&&this.pause(),this.playing=!0;let s=e[1]-e[0];{let h=this.getCurrentPosition();h<e[0]||h>e[1]?i==="normal"||i==="alternate"?this._updatePositionInState(e[0]):(i==="reverse"||i==="alternateReverse")&&this._updatePositionInState(e[1]):i==="normal"||i==="alternate"?h===e[1]&&this._updatePositionInState(e[0]):h===e[0]&&this._updatePositionInState(e[1])}let a=Ei(),o=r.time,l=s*n,c=this.getCurrentPosition()-e[0];(i==="reverse"||i==="alternateReverse")&&(c=e[1]-this.getCurrentPosition());let u=h=>{let _=Math.max(h-o,0)/1e3,x=Math.min(_*t+c,l);if(x!==l){let m=Math.floor(x/s),f=x/s%1*s;if(i!=="normal")if(i==="reverse")f=s-f;else{let T=m%2===0;i==="alternate"?T||(f=s-f):T&&(f=s-f)}this._updatePositionInState(f+e[0]),d()}else{if(i==="normal")this._updatePositionInState(e[1]);else if(i==="reverse")this._updatePositionInState(e[0]);else{let m=(n-1)%2===0;i==="alternate"?m?this._updatePositionInState(e[1]):this._updatePositionInState(e[0]):m?this._updatePositionInState(e[0]):this._updatePositionInState(e[1])}this.playing=!1,a.resolve(!0)}};this._stopPlayCallback=()=>{r.offThisOrNextTick(u),r.offNextTick(u),this.playing&&a.resolve(!1)};let d=()=>r.onNextTick(u);return r.onThisOrNextTick(u),a.promise}playDynamicRange(n,e){this.playing&&this.pause(),this.playing=!0;let t=Ei(),i=n.keepHot();t.promise.then(i,i);let r=e.time,s=o=>{let l=Math.max(o-r,0);r=o;let c=l/1e3,u=this.getCurrentPosition(),d=n.getValue();if(u<d[0]||u>d[1])this.gotoPosition(d[0]);else{let h=u+c;h>d[1]&&(h=d[0]+(h-d[1])),this.gotoPosition(h)}a()};this._stopPlayCallback=()=>{e.offThisOrNextTick(s),e.offNextTick(s),t.resolve(!1)};let a=()=>e.onNextTick(s);return e.onThisOrNextTick(s),t.promise}},hD=Ct(),dD="__TheatreJS_StudioBundle",Mu="__TheatreJS_CoreBundle",fD="__TheatreJS_Notifications",_l=n=>(...e)=>{var t;switch(n){case"success":{xl.debug(e.slice(0,2).join(`
`));break}case"info":{xl.debug(e.slice(0,2).join(`
`));break}case"warning":{xl.warn(e.slice(0,2).join(`
`));break}case"error":}return typeof window<"u"?(t=window[fD])==null?void 0:t.notify[n](...e):void 0},Zi={warning:_l("warning"),success:_l("success"),info:_l("info"),error:_l("error")};typeof window<"u"&&(window.addEventListener("error",n=>{Zi.error("An error occurred","<pre>".concat(n.message,`</pre>

See **console** for details.`))}),window.addEventListener("unhandledrejection",n=>{Zi.error("An error occurred","<pre>".concat(n.reason,`</pre>

See **console** for details.`))}));var pD=class{constructor(n,e,t){this._decodedBuffer=n,this._audioContext=e,this._nodeDestination=t,xe(this,"_mainGain"),xe(this,"_state",new hD.Atom({position:0,playing:!1})),xe(this,"statePointer"),xe(this,"_stopPlayCallback",Al),this.statePointer=this._state.pointer,this._mainGain=this._audioContext.createGain(),this._mainGain.connect(this._nodeDestination)}playDynamicRange(n,e){let t=Ei();this._playing&&this.pause(),this._playing=!0;let i,r=()=>{i?.(),i=this._loopInRange(n.getValue(),e).stop},s=n.onStale(r);return r(),this._stopPlayCallback=()=>{i?.(),s(),t.resolve(!1)},t.promise}_loopInRange(n,e){let i=this.getCurrentPosition(),r=n[1]-n[0];i<n[0]||i>n[1]?this._updatePositionInState(n[0]):i===n[1]&&this._updatePositionInState(n[0]),i=this.getCurrentPosition();let s=this._audioContext.createBufferSource();s.buffer=this._decodedBuffer,s.connect(this._mainGain),s.playbackRate.value=1,s.loop=!0,s.loopStart=n[0],s.loopEnd=n[1];let a=e.time,o=i-n[0];s.start(0,i);let l=d=>{let x=(Math.max(d-a,0)/1e3*1+o)/r%1*r;this._updatePositionInState(x+n[0]),c()},c=()=>e.onNextTick(l);return e.onThisOrNextTick(l),{stop:()=>{s.stop(),s.disconnect(),e.offThisOrNextTick(l),e.offNextTick(l)}}}get _playing(){return this._state.get().playing}set _playing(n){this._state.setByPointer(e=>e.playing,n)}destroy(){}pause(){this._stopPlayCallback(),this._playing=!1,this._stopPlayCallback=Al}gotoPosition(n){this._updatePositionInState(n)}_updatePositionInState(n){this._state.reduce(e=>Gn(bt({},e),{position:n}))}getCurrentPosition(){return this._state.get().position}play(n,e,t,i,r){this._playing&&this.pause(),this._playing=!0;let s=this.getCurrentPosition(),a=e[1]-e[0];if(i!=="normal")throw new kr('Audio-controlled sequences can only be played in the "normal" direction. '+"'".concat(i,"' given."));s<e[0]||s>e[1]?this._updatePositionInState(e[0]):s===e[1]&&this._updatePositionInState(e[0]),s=this.getCurrentPosition();let o=Ei(),l=this._audioContext.createBufferSource();l.buffer=this._decodedBuffer,l.connect(this._mainGain),l.playbackRate.value=t,n>1e3&&(Zi.warning("Can't play sequences with audio more than 1000 times","The sequence will still play, but only 1000 times. The `iterationCount: ".concat(n,"` provided to `sequence.play()`\nis too high for a sequence with audio.\n\nTo fix this, either set `iterationCount` to a lower value, or remove the audio from the sequence."),[{url:"https://www.theatrejs.com/docs/latest/manual/audio",title:"Using Audio"},{url:"https://www.theatrejs.com/docs/latest/api/core#sequence.attachaudio",title:"Audio API"}]),n=1e3),n>1&&(l.loop=!0,l.loopStart=e[0],l.loopEnd=e[1]);let c=r.time,u=s-e[0],d=a*n;l.start(0,s,d-u);let h=x=>{let f=Math.max(x-c,0)/1e3,T=Math.min(f*t+u,d);if(T!==d){let P=T/a%1*a;this._updatePositionInState(P+e[0]),_()}else this._updatePositionInState(e[1]),this._playing=!1,p(),o.resolve(!0)},p=()=>{l.stop(),l.disconnect()};this._stopPlayCallback=()=>{p(),r.offThisOrNextTick(h),r.offNextTick(h),this._playing&&o.resolve(!1)};let _=()=>r.onNextTick(h);return r.onThisOrNextTick(h),o.promise}},mD=Ct(),Gp=0;function uh(n){var e;let t=a=>{i.tick(a)},i=new mD.Ticker({onActive(){var a;(a=n?.start)==null||a.call(n)},onDormant(){var a;(a=n?.stop)==null||a.call(n)}}),r={tick:t,id:Gp++,name:(e=n?.name)!=null?e:"CustomRafDriver-".concat(Gp),type:"Theatre_RafDriver_PublicAPI"},s={type:"Theatre_RafDriver_PrivateAPI",publicApi:r,ticker:i,start:n?.start,stop:n?.stop};return sa(r,s),r}function gD(){let n=null,i=uh({name:"DefaultCoreRafDriver",start:()=>{if(typeof window<"u"){let r=s=>{i.tick(s),n=window.requestAnimationFrame(r)};n=window.requestAnimationFrame(r)}else i.tick(0),setTimeout(()=>i.tick(1),0)},stop:()=>{typeof window<"u"&&n!==null&&window.cancelAnimationFrame(n)}});return i}var Cl;function lg(){return Cl||_D(gD()),Cl}function cg(){return lg().ticker}function _D(n){if(Cl)throw new Error("`setCoreRafDriver()` is already called.");Cl=st(n)}var vD=class{get type(){return"Theatre_Sequence_PublicAPI"}constructor(n){sa(this,n)}play(n){let e=st(this);if(e._project.isReady()){let t=n?.rafDriver?st(n.rafDriver).ticker:cg();return e.play(n??{},t)}else{let t=Ei();return t.resolve(!0),t.promise}}pause(){st(this).pause()}get position(){return st(this).position}set position(n){st(this).position=n}__experimental_getKeyframes(n){return st(this).getKeyframesOfSimpleProp(n)}async attachAudio(n){let{audioContext:e,destinationNode:t,decodedBuffer:i,gainNode:r}=await yD(n),s=new pD(i,e,r);return st(this).replacePlaybackController(s),{audioContext:e,destinationNode:t,decodedBuffer:i,gainNode:r}}get pointer(){return st(this).pointer}};async function yD(n){function e(){if(n.audioContext)return Promise.resolve(n.audioContext);let c=new AudioContext;return c.state==="running"||typeof window>"u"?Promise.resolve(c):new Promise(u=>{let d=()=>{c.resume().catch(_=>{console.error(_)})},h=["mousedown","keydown","touchstart"],p={capture:!0,passive:!1};h.forEach(_=>{window.addEventListener(_,d,p)}),c.addEventListener("statechange",()=>{c.state==="running"&&(h.forEach(_=>{window.removeEventListener(_,d,p)}),u(c))})})}async function t(){if(n.source instanceof AudioBuffer)return n.source;let c=Ei();if(typeof n.source!="string")throw new Error("Error validating arguments to sequence.attachAudio(). args.source must either be a string or an instance of AudioBuffer.");let u;try{u=await fetch(n.source)}catch(_){throw console.error(_),new Error("Could not fetch '".concat(n.source,"'. Network error logged above."))}let d;try{d=await u.arrayBuffer()}catch(_){throw console.error(_),new Error("Could not read '".concat(n.source,"' as an arrayBuffer."))}(await i).decodeAudioData(d,c.resolve,c.reject);let p;try{p=await c.promise}catch(_){throw console.error(_),new Error("Could not decode ".concat(n.source," as an audio file."))}return p}let i=e(),r=t(),[s,a]=await Promise.all([i,r]),o=n.destinationNode||s.destination,l=s.createGain();return l.connect(o),{audioContext:s,decodedBuffer:a,gainNode:l,destinationNode:o}}var yU=ni("Theatre_Project"),xU=ni("Theatre_Sheet"),bU=ni("Theatre_SheetTemplate"),xD=ni("Theatre_SheetObject"),SU=ni("Theatre_Sequence"),MU=ni("Theatre_SheetObjectTemplate"),wU=ni("Theatre_Project_PublicAPI"),TU=ni("Theatre_Sheet_PublicAPI"),EU=ni("Theatre_SheetObject_PublicAPI");function ni(n){return e=>typeof e=="object"&&!!e&&e.type===n}var bD=class{constructor(n,e,t,i,r){this._project=n,this._sheet=e,this._lengthD=t,this._subUnitsPerUnitD=i,xe(this,"address"),xe(this,"publicApi"),xe(this,"_playbackControllerBox"),xe(this,"_prismOfStatePointer"),xe(this,"_positionD"),xe(this,"_positionFormatterD"),xe(this,"_playableRangeD"),xe(this,"pointer",(0,oD.pointer)({root:this,path:[]})),xe(this,"$$isPointerToPrismProvider",!0),xe(this,"_logger"),xe(this,"closestGridPosition",s=>{let o=1/this.subUnitsPerUnit;return parseFloat((Math.round(s/o)*o).toFixed(3))}),this._logger=n._logger.named("Sheet",e.address.sheetId).named("Instance",e.address.sheetInstanceId),this.address=Gn(bt({},this._sheet.address),{sequenceName:"default"}),this.publicApi=new vD(this),this._playbackControllerBox=new aD.Atom(r??new uD),this._prismOfStatePointer=(0,Nt.prism)(()=>this._playbackControllerBox.prism.getValue().statePointer),this._positionD=(0,Nt.prism)(()=>{let s=this._prismOfStatePointer.getValue();return(0,Nt.val)(s.position)}),this._positionFormatterD=(0,Nt.prism)(()=>{let s=(0,Nt.val)(this._subUnitsPerUnitD);return new SD(s)})}get type(){return"Theatre_Sequence"}pointerToPrism(n){let{path:e}=(0,kp.getPointerParts)(n);if(e.length===0)return(0,Nt.prism)(()=>({length:(0,Nt.val)(this.pointer.length),playing:(0,Nt.val)(this.pointer.playing),position:(0,Nt.val)(this.pointer.position),subUnitsPerUnit:(0,Nt.val)(this.pointer.subUnitsPerUnit)}));if(e.length>1)return(0,Nt.prism)(()=>{});let[t]=e;return t==="length"?this._lengthD:t==="subUnitsPerUnit"?this._subUnitsPerUnitD:t==="position"?this._positionD:t==="playing"?(0,Nt.prism)(()=>(0,Nt.val)(this._prismOfStatePointer.getValue().playing)):(0,Nt.prism)(()=>{})}getKeyframesOfSimpleProp(n){let{path:e,root:t}=(0,kp.getPointerParts)(n);if(!xD(t))throw new kr("Argument prop must be a pointer to a SheetObject property");let i=(0,Nt.val)(this._project.pointers.historic.sheetsById[this._sheet.address.sheetId].sequence.tracksByObject[t.address.objectKey]);if(!i)return[];let{trackData:r,trackIdByPropPath:s}=i,a=rD(e),o=s[a];if(!o)return[];let l=r[o];return l?l.keyframes:[]}get positionFormatter(){return this._positionFormatterD.getValue()}get prismOfStatePointer(){return this._prismOfStatePointer}get length(){return this._lengthD.getValue()}get positionPrism(){return this._positionD}get position(){return this._playbackControllerBox.get().getCurrentPosition()}get subUnitsPerUnit(){return this._subUnitsPerUnitD.getValue()}get positionSnappedToGrid(){return this.closestGridPosition(this.position)}set position(n){let e=n;this.pause(),e>this.length&&(e=this.length);let t=this.length;this._playbackControllerBox.get().gotoPosition(e>t?t:e)}getDurationCold(){return this._lengthD.getValue()}get playing(){return(0,Nt.val)(this._playbackControllerBox.get().statePointer.playing)}_makeRangeFromSequenceTemplate(){return(0,Nt.prism)(()=>[0,(0,Nt.val)(this._lengthD)])}playDynamicRange(n,e){return this._playbackControllerBox.get().playDynamicRange(n,e)}async play(n,e){let t=this.length,i=n&&n.range?n.range:[0,t],r=n&&typeof n.iterationCount=="number"?n.iterationCount:1,s=n&&typeof n.rate<"u"?n.rate:1,a=n&&n.direction?n.direction:"normal";return await this._play(r,[i[0],i[1]],s,a,e)}_play(n,e,t,i,r){return this._playbackControllerBox.get().play(n,e,t,i,r)}pause(){this._playbackControllerBox.get().pause()}replacePlaybackController(n){this.pause();let e=this._playbackControllerBox.get();this._playbackControllerBox.set(n);let t=e.getCurrentPosition();e.destroy(),n.gotoPosition(t)}},SD=class{constructor(n){this._fps=n}formatSubUnitForGrid(n){let e=n%1,t=1/this._fps;return Math.round(e/t)+"f"}formatFullUnitForGrid(n){let e=n,t="";if(e>=Br){let r=Math.floor(e/Br);t+=r+"h",e=e%Br}if(e>=ji){let r=Math.floor(e/ji);t+=r+"m",e=e%ji}if(e>=Xi){let r=Math.floor(e/Xi);t+=r+"s",e=e%Xi}let i=1/this._fps;if(e>=i){let r=Math.floor(e/i);t+=r+"f",e=e%i}return t.length===0?"0s":t}formatForPlayhead(n){let e=n,t="";if(e>=Br){let r=Math.floor(e/Br);t+=Ys(r.toString(),2,"0")+"h",e=e%Br}if(e>=ji){let r=Math.floor(e/ji);t+=Ys(r.toString(),2,"0")+"m",e=e%ji}else t.length>0&&(t+="00m");if(e>=Xi){let r=Math.floor(e/Xi);t+=Ys(r.toString(),2,"0")+"s",e=e%Xi}else t+="00s";let i=1/this._fps;if(e>=i){let r=Math.round(e/i);t+=Ys(r.toString(),2,"0")+"f",e=e%i}else e/i>.98?(t+=Ys("1",2,"0")+"f",e=e%i):t+="00f";return t.length===0?"00s00f":t}formatBasic(n){return n.toFixed(2)+"s"}},Xi=1,ji=Xi*60,Br=ji*60,hh={};Wu(hh,{boolean:()=>dg,compound:()=>fh,file:()=>ID,image:()=>LD,number:()=>hg,rgba:()=>BD,string:()=>fg,stringLiteral:()=>HD});function Hp(n,e){return n.length<=e?n:n.substr(0,e-3)+"..."}var MD=n=>typeof n=="string"?'string("'.concat(Hp(n,10),'")'):typeof n=="number"?"number(".concat(Hp(String(n),10),")"):n===null?"null":n===void 0?"undefined":typeof n=="boolean"?String(n):Array.isArray(n)?"array":typeof n=="object"?"object":"unknown",Wp=MD;function wD(n,{removeAlphaIfOpaque:e=!1}={}){let t=(n.a*255|256).toString(16).slice(1),i=(n.r*255|256).toString(16).slice(1)+(n.g*255|256).toString(16).slice(1)+(n.b*255|256).toString(16).slice(1)+(e&&t==="ff"?"":t);return"#".concat(i)}function dh(n){return Gn(bt({},n),{toString(){return wD(this,{removeAlphaIfOpaque:!0})}})}function TD(n){return Object.fromEntries(Object.entries(n).map(([e,t])=>[e,Um(t,0,1)]))}function ED(n){function e(t){return t>=.0031308?1.055*t**(1/2.4)-.055:12.92*t}return TD({r:e(n.r),g:e(n.g),b:e(n.b),a:n.a})}function qp(n){function e(t){return t>=.04045?((t+.055)/(1+.055))**2.4:t/12.92}return{r:e(n.r),g:e(n.g),b:e(n.b),a:n.a}}function Xp(n){let e=.4122214708*n.r+.5363325363*n.g+.0514459929*n.b,t=.2119034982*n.r+.6806995451*n.g+.1073969566*n.b,i=.0883024619*n.r+.2817188376*n.g+.6299787005*n.b,r=Math.cbrt(e),s=Math.cbrt(t),a=Math.cbrt(i);return{L:.2104542553*r+.793617785*s-.0040720468*a,a:1.9779984951*r-2.428592205*s+.4505937099*a,b:.0259040371*r+.7827717662*s-.808675766*a,alpha:n.a}}function AD(n){let e=n.L+.3963377774*n.a+.2158037573*n.b,t=n.L-.1055613458*n.a-.0638541728*n.b,i=n.L-.0894841775*n.a-1.291485548*n.b,r=e*e*e,s=t*t*t,a=i*i*i;return{r:4.0767416621*r-3.3077115913*s+.2309699292*a,g:-1.2684380046*r+2.6097574011*s-.3413193965*a,b:-.0041960863*r-.7034186147*s+1.707614701*a,a:n.alpha}}var ii=Symbol("TheatrePropType_Basic");function ug(n){return typeof n=="object"&&!!n&&n[ii]==="TheatrePropType"}function CD(n){if(typeof n=="number")return hg(n);if(typeof n=="boolean")return dg(n);if(typeof n=="string")return fg(n);if(typeof n=="object"&&n){if(ug(n))return n;if(XA(n))return fh(n);throw new kr("This value is not a valid prop type: ".concat(Wp(n)))}else throw new kr("This value is not a valid prop type: ".concat(Wp(n)))}function PD(n){let e={};for(let t of Object.keys(n)){let i=n[t];ug(i)?e[t]=i:e[t]=CD(i)}return e}var RD=(n,e)=>{},fh=(n,e={})=>{RD("t.compound(props, opts)",e);let t=PD(n),i=new WeakMap;return{type:"compound",props:t,valueType:null,[ii]:"TheatrePropType",label:e.label,default:y3(t,s=>s.default),deserializeAndSanitize:s=>{if(typeof s!="object"||!s)return;if(i.has(s))return i.get(s);let a={},o=!1;for(let[l,c]of Object.entries(t))if(Object.prototype.hasOwnProperty.call(s,l)){let u=c.deserializeAndSanitize(s[l]);u!=null&&(o=!0,a[l]=u)}if(i.set(s,a),o)return a}}},ID=(n,e={})=>{let t=(i,r,s)=>{var a;return{type:"file",id:((a=e.interpolate)!=null?a:oa)(i.id,r.id,s)}};return{type:"file",default:{type:"file",id:n},valueType:null,[ii]:"TheatrePropType",label:e.label,interpolate:t,deserializeAndSanitize:DD}},DD=n=>{if(!n)return;let e=!0;if(typeof n.id!="string"&&![null,void 0].includes(n.id)&&(e=!1),n.type!=="file"&&(e=!1),!!e)return n},LD=(n,e={})=>{let t=(i,r,s)=>{var a;return{type:"image",id:((a=e.interpolate)!=null?a:oa)(i.id,r.id,s)}};return{type:"image",default:{type:"image",id:n},valueType:null,[ii]:"TheatrePropType",label:e.label,interpolate:t,deserializeAndSanitize:ND}},ND=n=>{if(!n)return;let e=!0;if(typeof n.id!="string"&&![null,void 0].includes(n.id)&&(e=!1),n.type!=="image"&&(e=!1),!!e)return n},hg=(n,e={})=>{var t;return Gn(bt({type:"number",valueType:0,default:n,[ii]:"TheatrePropType"},e||{}),{label:e.label,nudgeFn:(t=e.nudgeFn)!=null?t:WD,nudgeMultiplier:typeof e.nudgeMultiplier=="number"?e.nudgeMultiplier:void 0,interpolate:FD,deserializeAndSanitize:OD(e.range)})},OD=n=>n?e=>{if(typeof e=="number"&&isFinite(e))return Um(e,n[0],n[1])}:UD,UD=n=>typeof n=="number"&&isFinite(n)?n:void 0,FD=(n,e,t)=>n+t*(e-n),BD=(n={r:0,g:0,b:0,a:1},e={})=>{let t={};for(let i of["r","g","b","a"])t[i]=Math.min(Math.max(n[i],0),1);return{type:"rgba",valueType:null,default:dh(t),[ii]:"TheatrePropType",label:e.label,interpolate:VD,deserializeAndSanitize:zD}},zD=n=>{if(!n)return;let e=!0;for(let i of["r","g","b","a"])(!Object.prototype.hasOwnProperty.call(n,i)||typeof n[i]!="number")&&(e=!1);if(!e)return;let t={};for(let i of["r","g","b","a"])t[i]=Math.min(Math.max(n[i],0),1);return dh(t)},VD=(n,e,t)=>{let i=Xp(qp(n)),r=Xp(qp(e)),s={L:(1-t)*i.L+t*r.L,a:(1-t)*i.a+t*r.a,b:(1-t)*i.b+t*r.b,alpha:(1-t)*i.alpha+t*r.alpha},a=ED(AD(s));return dh(a)},dg=(n,e={})=>{var t;return{type:"boolean",default:n,valueType:null,[ii]:"TheatrePropType",label:e.label,interpolate:(t=e.interpolate)!=null?t:oa,deserializeAndSanitize:kD}},kD=n=>typeof n=="boolean"?n:void 0;function oa(n){return n}var fg=(n,e={})=>{var t;return{type:"string",default:n,valueType:null,[ii]:"TheatrePropType",label:e.label,interpolate:(t=e.interpolate)!=null?t:oa,deserializeAndSanitize:GD}};function GD(n){return typeof n=="string"?n:void 0}function HD(n,e,t={}){var i,r;return{type:"stringLiteral",default:n,valuesAndLabels:bt({},e),[ii]:"TheatrePropType",valueType:null,as:(i=t.as)!=null?i:"menu",label:t.label,interpolate:(r=t.interpolate)!=null?r:oa,deserializeAndSanitize(s){if(typeof s=="string"&&Object.prototype.hasOwnProperty.call(e,s))return s}}}var WD=({config:n,deltaX:e,deltaFraction:t,magnitude:i})=>{var r;let{range:s}=n;return!n.nudgeMultiplier&&s&&!s.includes(1/0)&&!s.includes(-1/0)?t*(s[1]-s[0])*i:e*i*((r=n.nudgeMultiplier)!=null?r:1)},qD=n=>n.replace(/^[\s\/]*/,"").replace(/[\s\/]*$/,"").replace(/\s*\/\s*/g," / "),XD=n=>{if(typeof n!="string")return"it is not a string. (it is a ".concat(typeof n,")");let e=n.split(/\//);if(e.length===0)return"it is empty.";for(let t=0;t<e.length;t++){let i=e[t].trim();if(i.length===0)return"the component #".concat(t+1," is empty.");if(i.length>64)return"the component '".concat(i,"' must have 64 characters or less.")}};function bl(n,e){let t=qD(n);return t}var AU=Ll(am()),jD=class{get type(){return"Theatre_Sheet_PublicAPI"}constructor(n){sa(this,n)}object(n,e,t){let i=st(this),r=bl(n,"sheet.object"),s=i.getObject(r),a=null,o=t?.__actions__THIS_API_IS_UNSTABLE_AND_WILL_CHANGE_IN_THE_NEXT_VERSION;if(s)return o&&s.template._temp_setActions(o),s.publicApi;{let l=fh(e);return i.createObject(r,a,l,o).publicApi}}__experimental_getExistingObject(n){let e=st(this),t=bl(n,"sheet.object"),i=e.getObject(t);return i?.publicApi}get sequence(){return st(this).getSequence().publicApi}get project(){return st(this).project.publicApi}get address(){return bt({},st(this).address)}detachObject(n){let e=st(this),t=bl(n,'sheet.deleteObject("'.concat(n,'")'));if(!e.getObject(t)){Zi.warning(`Couldn't delete object "`.concat(t,'"'),'There is no object with key "'.concat(t,`".

To fix this, make sure you are calling \`sheet.deleteObject("`).concat(t,'")` with the correct key.')),console.warn('Object key "'.concat(t,'" does not exist.'));return}e.deleteObject(t)}},Zs=Ct(),YD=class{constructor(n,e){this.template=n,this.instanceId=e,xe(this,"_objects",new Zs.Atom({})),xe(this,"_sequence"),xe(this,"address"),xe(this,"publicApi"),xe(this,"project"),xe(this,"objectsP",this._objects.pointer),xe(this,"type","Theatre_Sheet"),xe(this,"_logger"),this._logger=n.project._logger.named("Sheet",e),this._logger._trace("creating sheet"),this.project=n.project,this.address=Gn(bt({},n.address),{sheetInstanceId:this.instanceId}),this.publicApi=new jD(this)}createObject(n,e,t,i={}){let s=this.template.getObjectTemplate(n,e,t,i).createInstance(this,e,t);return this._objects.setByPointer(a=>a[n],s),s}getObject(n){return this._objects.get()[n]}deleteObject(n){this._objects.reduce(e=>{let t=bt({},e);return delete t[n],t})}getSequence(){if(!this._sequence){let n=(0,Zs.prism)(()=>{let t=(0,Zs.val)(this.project.pointers.historic.sheetsById[this.address.sheetId].sequence.length);return ZD(t)}),e=(0,Zs.prism)(()=>{let t=(0,Zs.val)(this.project.pointers.historic.sheetsById[this.address.sheetId].sequence.subUnitsPerUnit);return JD(t)});this._sequence=new bD(this.template.project,this,n,e)}return this._sequence}},ZD=n=>typeof n=="number"&&isFinite(n)&&n>0?n:10,JD=n=>typeof n=="number"&&_3(n)&&n>=1&&n<=1e3?n:30,KD=class{constructor(n,e){this.project=n,xe(this,"type","Theatre_SheetTemplate"),xe(this,"address"),xe(this,"_instances",new Vp.Atom({})),xe(this,"instancesP",this._instances.pointer),xe(this,"_objectTemplates",new Vp.Atom({})),xe(this,"objectTemplatesP",this._objectTemplates.pointer),this.address=Gn(bt({},n.address),{sheetId:e})}getInstance(n){let e=this._instances.get()[n];return e||(e=new YD(this,n),this._instances.setByPointer(t=>t[n],e)),e}getObjectTemplate(n,e,t,i){let r=this._objectTemplates.get()[n];return r||(r=new nD(this,n,e,t,i),this._objectTemplates.setByPointer(s=>s[n],r)),r}},wu=Ct(),jp=Ct(),$D=n=>new Promise(e=>setTimeout(e,n)),QD=$D;function _n(n){for(var e=arguments.length,t=Array(e>1?e-1:0),i=1;i<e;i++)t[i-1]=arguments[i];if(0)var r,s;throw Error("[Immer] minified error nr: "+n+(t.length?" "+t.map(function(a){return"'"+a+"'"}).join(","):"")+". Find the full error at: https://bit.ly/3cXEKWf")}function Ji(n){return!!n&&!!n[en]}function Ki(n){return!!n&&((function(e){if(!e||typeof e!="object")return!1;var t=Object.getPrototypeOf(e);if(t===null)return!0;var i=Object.hasOwnProperty.call(t,"constructor")&&t.constructor;return i===Object||typeof i=="function"&&Function.toString.call(i)===l2})(n)||Array.isArray(n)||!!n[tm]||!!n.constructor[tm]||ph(n)||mh(n))}function e2(n){return Ji(n)||_n(23,n),n[en].t}function na(n,e,t){t===void 0&&(t=!1),jr(n)===0?(t?Object.keys:xh)(n).forEach(function(i){t&&typeof i=="symbol"||e(i,n[i],n)}):n.forEach(function(i,r){return e(r,i,n)})}function jr(n){var e=n[en];return e?e.i>3?e.i-4:e.i:Array.isArray(n)?1:ph(n)?2:mh(n)?3:0}function zu(n,e){return jr(n)===2?n.has(e):Object.prototype.hasOwnProperty.call(n,e)}function t2(n,e){return jr(n)===2?n.get(e):n[e]}function pg(n,e,t){var i=jr(n);i===2?n.set(e,t):i===3?(n.delete(e),n.add(t)):n[e]=t}function n2(n,e){return n===e?n!==0||1/n==1/e:n!=n&&e!=e}function ph(n){return a2&&n instanceof Map}function mh(n){return o2&&n instanceof Set}function Yi(n){return n.o||n.t}function gh(n){if(Array.isArray(n))return Array.prototype.slice.call(n);var e=c2(n);delete e[en];for(var t=xh(e),i=0;i<t.length;i++){var r=t[i],s=e[r];s.writable===!1&&(s.writable=!0,s.configurable=!0),(s.get||s.set)&&(e[r]={configurable:!0,writable:!0,enumerable:s.enumerable,value:n[r]})}return Object.create(Object.getPrototypeOf(n),e)}function _h(n,e){return e===void 0&&(e=!1),vh(n)||Ji(n)||!Ki(n)||(jr(n)>1&&(n.set=n.add=n.clear=n.delete=i2),Object.freeze(n),e&&na(n,function(t,i){return _h(i,!0)},!0)),n}function i2(){_n(2)}function vh(n){return n==null||typeof n!="object"||Object.isFrozen(n)}function ei(n){var e=u2[n];return e||_n(18,n),e}function Yp(){return ia}function Tu(n,e){e&&(ei("Patches"),n.u=[],n.s=[],n.v=e)}function Pl(n){Vu(n),n.p.forEach(r2),n.p=null}function Vu(n){n===ia&&(ia=n.l)}function Zp(n){return ia={p:[],l:ia,h:n,m:!0,_:0}}function r2(n){var e=n[en];e.i===0||e.i===1?e.j():e.O=!0}function Eu(n,e){e._=e.p.length;var t=e.p[0],i=n!==void 0&&n!==t;return e.h.g||ei("ES5").S(e,n,i),i?(t[en].P&&(Pl(e),_n(4)),Ki(n)&&(n=Rl(e,n),e.l||Il(e,n)),e.u&&ei("Patches").M(t[en],n,e.u,e.s)):n=Rl(e,t,[]),Pl(e),e.u&&e.v(e.u,e.s),n!==mg?n:void 0}function Rl(n,e,t){if(vh(e))return e;var i=e[en];if(!i)return na(e,function(s,a){return Jp(n,i,e,s,a,t)},!0),e;if(i.A!==n)return e;if(!i.P)return Il(n,i.t,!0),i.t;if(!i.I){i.I=!0,i.A._--;var r=i.i===4||i.i===5?i.o=gh(i.k):i.o;na(i.i===3?new Set(r):r,function(s,a){return Jp(n,i,r,s,a,t)}),Il(n,r,!1),t&&n.u&&ei("Patches").R(i,t,n.u,n.s)}return i.o}function Jp(n,e,t,i,r,s){if(Ji(r)){var a=Rl(n,r,s&&e&&e.i!==3&&!zu(e.D,i)?s.concat(i):void 0);if(pg(t,i,a),!Ji(a))return;n.m=!1}if(Ki(r)&&!vh(r)){if(!n.h.F&&n._<1)return;Rl(n,r),e&&e.A.l||Il(n,r)}}function Il(n,e,t){t===void 0&&(t=!1),n.h.F&&n.m&&_h(e,t)}function Au(n,e){var t=n[en];return(t?Yi(t):n)[e]}function Kp(n,e){if(e in n)for(var t=Object.getPrototypeOf(n);t;){var i=Object.getOwnPropertyDescriptor(t,e);if(i)return i;t=Object.getPrototypeOf(t)}}function ku(n){n.P||(n.P=!0,n.l&&ku(n.l))}function Cu(n){n.o||(n.o=gh(n.t))}function Gu(n,e,t){var i=ph(e)?ei("MapSet").N(e,t):mh(e)?ei("MapSet").T(e,t):n.g?(function(r,s){var a=Array.isArray(r),o={i:a?1:0,A:s?s.A:Yp(),P:!1,I:!1,D:{},l:s,t:r,k:null,o:null,j:null,C:!1},l=o,c=Sl;a&&(l=[o],c=Ml);var u=Proxy.revocable(l,c),d=u.revoke,h=u.proxy;return o.k=h,o.j=d,h})(e,t):ei("ES5").J(e,t);return(t?t.A:Yp()).p.push(i),i}function s2(n){return Ji(n)||_n(22,n),(function e(t){if(!Ki(t))return t;var i,r=t[en],s=jr(t);if(r){if(!r.P&&(r.i<4||!ei("ES5").K(r)))return r.t;r.I=!0,i=$p(t,s),r.I=!1}else i=$p(t,s);return na(i,function(a,o){r&&t2(r.t,a)===o||pg(i,a,e(o))}),s===3?new Set(i):i})(n)}function $p(n,e){switch(e){case 2:return new Map(n);case 3:return Array.from(n)}return gh(n)}var Qp,ia,yh=typeof Symbol<"u"&&typeof Symbol("x")=="symbol",a2=typeof Map<"u",o2=typeof Set<"u",em=typeof Proxy<"u"&&Proxy.revocable!==void 0&&typeof Reflect<"u",mg=yh?Symbol.for("immer-nothing"):((Qp={})["immer-nothing"]=!0,Qp),tm=yh?Symbol.for("immer-draftable"):"__$immer_draftable",en=yh?Symbol.for("immer-state"):"__$immer_state",l2=""+Object.prototype.constructor,xh=typeof Reflect<"u"&&Reflect.ownKeys?Reflect.ownKeys:Object.getOwnPropertySymbols!==void 0?function(n){return Object.getOwnPropertyNames(n).concat(Object.getOwnPropertySymbols(n))}:Object.getOwnPropertyNames,c2=Object.getOwnPropertyDescriptors||function(n){var e={};return xh(n).forEach(function(t){e[t]=Object.getOwnPropertyDescriptor(n,t)}),e},u2={},Sl={get:function(n,e){if(e===en)return n;var t=Yi(n);if(!zu(t,e))return(function(r,s,a){var o,l=Kp(s,a);return l?"value"in l?l.value:(o=l.get)===null||o===void 0?void 0:o.call(r.k):void 0})(n,t,e);var i=t[e];return n.I||!Ki(i)?i:i===Au(n.t,e)?(Cu(n),n.o[e]=Gu(n.A.h,i,n)):i},has:function(n,e){return e in Yi(n)},ownKeys:function(n){return Reflect.ownKeys(Yi(n))},set:function(n,e,t){var i=Kp(Yi(n),e);if(i?.set)return i.set.call(n.k,t),!0;if(!n.P){var r=Au(Yi(n),e),s=r?.[en];if(s&&s.t===t)return n.o[e]=t,n.D[e]=!1,!0;if(n2(t,r)&&(t!==void 0||zu(n.t,e)))return!0;Cu(n),ku(n)}return n.o[e]===t&&typeof t!="number"&&(t!==void 0||e in n.o)||(n.o[e]=t,n.D[e]=!0,!0)},deleteProperty:function(n,e){return Au(n.t,e)!==void 0||e in n.t?(n.D[e]=!1,Cu(n),ku(n)):delete n.D[e],n.o&&delete n.o[e],!0},getOwnPropertyDescriptor:function(n,e){var t=Yi(n),i=Reflect.getOwnPropertyDescriptor(t,e);return i&&{writable:!0,configurable:n.i!==1||e!=="length",enumerable:i.enumerable,value:t[e]}},defineProperty:function(){_n(11)},getPrototypeOf:function(n){return Object.getPrototypeOf(n.t)},setPrototypeOf:function(){_n(12)}},Ml={};na(Sl,function(n,e){Ml[n]=function(){return arguments[0]=arguments[0][0],e.apply(this,arguments)}}),Ml.deleteProperty=function(n,e){return Sl.deleteProperty.call(this,n[0],e)},Ml.set=function(n,e,t){return Sl.set.call(this,n[0],e,t,n[0])};var h2=(function(){function n(t){var i=this;this.g=em,this.F=!0,this.produce=function(r,s,a){if(typeof r=="function"&&typeof s!="function"){var o=s;s=r;var l=i;return function(p){var _=this;p===void 0&&(p=o);for(var x=arguments.length,m=Array(x>1?x-1:0),f=1;f<x;f++)m[f-1]=arguments[f];return l.produce(p,function(T){var P;return(P=s).call.apply(P,[_,T].concat(m))})}}var c;if(typeof s!="function"&&_n(6),a!==void 0&&typeof a!="function"&&_n(7),Ki(r)){var u=Zp(i),d=Gu(i,r,void 0),h=!0;try{c=s(d),h=!1}finally{h?Pl(u):Vu(u)}return typeof Promise<"u"&&c instanceof Promise?c.then(function(p){return Tu(u,a),Eu(p,u)},function(p){throw Pl(u),p}):(Tu(u,a),Eu(c,u))}if(!r||typeof r!="object")return(c=s(r))===mg?void 0:(c===void 0&&(c=r),i.F&&_h(c,!0),c);_n(21,r)},this.produceWithPatches=function(r,s){return typeof r=="function"?function(l){for(var c=arguments.length,u=Array(c>1?c-1:0),d=1;d<c;d++)u[d-1]=arguments[d];return i.produceWithPatches(l,function(h){return r.apply(void 0,[h].concat(u))})}:[i.produce(r,s,function(l,c){a=l,o=c}),a,o];var a,o},typeof t?.useProxies=="boolean"&&this.setUseProxies(t.useProxies),typeof t?.autoFreeze=="boolean"&&this.setAutoFreeze(t.autoFreeze)}var e=n.prototype;return e.createDraft=function(t){Ki(t)||_n(8),Ji(t)&&(t=s2(t));var i=Zp(this),r=Gu(this,t,void 0);return r[en].C=!0,Vu(i),r},e.finishDraft=function(t,i){var r=t&&t[en],s=r.A;return Tu(s,i),Eu(void 0,s)},e.setAutoFreeze=function(t){this.F=t},e.setUseProxies=function(t){t&&!em&&_n(20),this.g=t},e.applyPatches=function(t,i){var r;for(r=i.length-1;r>=0;r--){var s=i[r];if(s.path.length===0&&s.op==="replace"){t=s.value;break}}var a=ei("Patches").$;return Ji(t)?a(t,i):this.produce(t,function(o){return a(o,i.slice(r+1))})},n})(),un=new h2,CU=un.produce,PU=un.produceWithPatches.bind(un),RU=un.setAutoFreeze.bind(un),IU=un.setUseProxies.bind(un),DU=un.applyPatches.bind(un),LU=un.createDraft.bind(un),NU=un.finishDraft.bind(un),d2={currentProjectStateDefinitionVersion:"0.4.0"},bh=d2;async function f2(n,e,t){await QD(0),n.transaction(({drafts:i})=>{var r;let s=e.address.projectId;i.ephemeral.coreByProject[s]={lastExportedObject:null,loadingState:{type:"loading"}},i.ahistoric.coreByProject[s]={ahistoricStuff:""};function a(){i.ephemeral.coreByProject[s].loadingState={type:"loaded"},i.historic.coreByProject[s]={sheetsById:{},definitionVersion:bh.currentProjectStateDefinitionVersion,revisionHistory:[]}}function o(d){i.ephemeral.coreByProject[s].loadingState={type:"loaded"},i.historic.coreByProject[s]=d}function l(){i.ephemeral.coreByProject[s].loadingState={type:"loaded"}}function c(d){i.ephemeral.coreByProject[s].loadingState={type:"browserStateIsNotBasedOnDiskState",onDiskState:d}}let u=(r=e2(i.historic))==null?void 0:r.coreByProject[e.address.projectId];u?t&&u.revisionHistory.indexOf(t.revisionHistory[0])==-1?c(t):l():t?o(t):a()})}function nm(){}function gg(n){var e,t;let i=(e=n?.logging)!=null&&e.internal?(t=n.logging.min)!=null?t:256:1/0,r=i<=128,s=i<=512,a=rg(void 0,{_debug:r?console.debug.bind(console,"_coreLogger(TheatreInternalLogger) debug"):nm,_error:s?console.error.bind(console,"_coreLogger(TheatreInternalLogger) error"):nm});if(n){let{logger:o,logging:l}=n;o&&a.configureLogger(o),l?a.configureLogging(l):a.configureLogging({dev:!1})}return a.getLogger().named("Theatre")}var p2=class{constructor(n,e={},t){this.config=e,this.publicApi=t,xe(this,"pointers"),xe(this,"_pointerProxies"),xe(this,"address"),xe(this,"_studioReadyDeferred"),xe(this,"_assetStorageReadyDeferred"),xe(this,"_readyPromise"),xe(this,"_sheetTemplates",new jp.Atom({})),xe(this,"sheetTemplatesP",this._sheetTemplates.pointer),xe(this,"_studio"),xe(this,"assetStorage"),xe(this,"type","Theatre_Project"),xe(this,"_logger");var i;this._logger=gg({logging:{dev:!0}}).named("Project",n),this._logger.traceDev("creating project"),this.address={projectId:n};let r=new jp.Atom({ahistoric:{ahistoricStuff:""},historic:(i=e.state)!=null?i:{sheetsById:{},definitionVersion:bh.currentProjectStateDefinitionVersion,revisionHistory:[]},ephemeral:{loadingState:{type:"loaded"},lastExportedObject:null}});this._assetStorageReadyDeferred=Ei(),this.assetStorage={getAssetUrl:s=>{var a;return"".concat((a=e.assets)==null?void 0:a.baseUrl,"/").concat(s)},createAsset:()=>{throw new Error("Please wait for Project.ready to use assets.")}},this._pointerProxies={historic:new wu.PointerProxy(r.pointer.historic),ahistoric:new wu.PointerProxy(r.pointer.ahistoric),ephemeral:new wu.PointerProxy(r.pointer.ephemeral)},this.pointers={historic:this._pointerProxies.historic.pointer,ahistoric:this._pointerProxies.ahistoric.pointer,ephemeral:this._pointerProxies.ephemeral.pointer},qu.add(n,this),this._studioReadyDeferred=Ei(),this._readyPromise=Promise.all([this._studioReadyDeferred.promise,this._assetStorageReadyDeferred.promise]).then(()=>{}),e.state?setTimeout(()=>{this._studio||(this._studioReadyDeferred.resolve(void 0),this._assetStorageReadyDeferred.resolve(void 0),this._logger._trace("ready deferred resolved with no state"))},0):typeof window>"u"?console.error('Argument config.state in Theatre.getProject("'.concat(n,'", config) is empty. ')+"You can safely ignore this message if you're developing a Next.js/Remix project in development mode. But if you are shipping to your end-users, then you need to set config.state, otherwise your project's state will be empty and nothing will animate. Learn more at https://www.theatrejs.com/docs/latest/manual/projects#state"):setTimeout(()=>{if(!this._studio)throw new Error('Argument config.state in Theatre.getProject("'.concat(n,'", config) is empty. This is fine ')+"while you are using @theatre/core along with @theatre/studio. But since @theatre/studio "+'is not loaded, the state of project "'.concat(n,`" will be empty.

`)+`To fix this, you need to add @theatre/studio into the bundle and export the project's state. Learn how to do that at https://www.theatrejs.com/docs/latest/manual/projects#state
`)},1e3)}attachToStudio(n){if(this._studio){if(this._studio!==n)throw new Error("Project ".concat(this.address.projectId," is already attached to studio ").concat(this._studio.address.studioId));console.warn("Project ".concat(this.address.projectId," is already attached to studio ").concat(this._studio.address.studioId));return}this._studio=n,n.initialized.then(async()=>{var e;await f2(n,this,this.config.state),this._pointerProxies.historic.setPointer(n.atomP.historic.coreByProject[this.address.projectId]),this._pointerProxies.ahistoric.setPointer(n.atomP.ahistoric.coreByProject[this.address.projectId]),this._pointerProxies.ephemeral.setPointer(n.atomP.ephemeral.coreByProject[this.address.projectId]),await n.createAssetStorage(this,(e=this.config.assets)==null?void 0:e.baseUrl).then(t=>{this.assetStorage=t,this._assetStorageReadyDeferred.resolve(void 0)}),this._studioReadyDeferred.resolve(void 0)}).catch(e=>{throw console.error(e),e})}get isAttachedToStudio(){return!!this._studio}get ready(){return this._readyPromise}isReady(){return this._studioReadyDeferred.status==="resolved"&&this._assetStorageReadyDeferred.status==="resolved"}getOrCreateSheet(n,e="default"){let t=this._sheetTemplates.get()[n];return t||(t=new KD(this,n),this._sheetTemplates.reduce(i=>Gn(bt({},i),{[n]:t}))),t.getInstance(e)}},m2=class{get type(){return"Theatre_Project_PublicAPI"}constructor(n,e={}){sa(this,new p2(n,e,this))}get ready(){return st(this).ready}get isReady(){return st(this).isReady()}get address(){return bt({},st(this).address)}getAssetUrl(n){if(!this.isReady){console.error("Calling `project.getAssetUrl()` before `project.ready` is resolved, will always return `undefined`. Either use `project.ready.then(() => project.getAssetUrl())` or `await project.ready` before calling `project.getAssetUrl()`.");return}return n.id?st(this).assetStorage.getAssetUrl(n.id):void 0}sheet(n,e="default"){let t=bl(n,"project.sheet");return st(this).getOrCreateSheet(t,e).publicApi}},OU=Ll(am()),_g=Ct(),Hu=Ct();function vg(n,e={}){let t=qu.get(n);if(t)return t.publicApi;let r=gg().named("Project",n);return e.state?(_2(n,e.state),r._debug("deep validated config.state on disk")):r._debug("no config.state"),new m2(n,e)}var g2=(n,e)=>{if(Array.isArray(e)||e==null||e.definitionVersion!==bh.currentProjectStateDefinitionVersion)throw new kr("Error validating conf.state in Theatre.getProject(".concat(JSON.stringify(n),", conf). The state seems to be formatted in a way that is unreadable to Theatre.js. Read more at https://www.theatrejs.com/docs/latest/manual/projects#state"))},_2=(n,e)=>{g2(n,e)};function Sh(n,e,t){let i=t?st(t).ticker:cg();if((0,_g.isPointer)(n))return(0,Hu.pointerToPrism)(n).onChange(i,e,!0);if((0,Hu.isPrism)(n))return n.onChange(i,e,!0);throw new Error("Called onChange(p) where p is neither a pointer nor a prism.")}function yg(n){if((0,_g.isPointer)(n))return(0,Hu.pointerToPrism)(n).getValue();throw new Error("Called val(p) where p is not a pointer.")}var v2=class{constructor(){xe(this,"_studio")}get type(){return"Theatre_CoreBundle"}get version(){return"0.7.2"}getBitsForStudio(n,e){if(this._studio)throw new Error("@theatre/core is already attached to @theatre/studio");this._studio=n;let t={projectsP:qu.atom.pointer.projects,privateAPI:st,coreExports:lm,getCoreRafDriver:lg};e(t)}};y2();function y2(){if(typeof window>"u")return;let n=window[Mu];if(typeof n<"u")throw typeof n=="object"&&n&&typeof n.version=="string"?new Error(`It seems that the module '@theatre/core' is loaded more than once. This could have two possible causes:
1. You might have two separate versions of Theatre.js in node_modules.
2. Or this might be a bundling misconfiguration, in case you're using a bundler like Webpack/ESBuild/Rollup.

Note that it **is okay** to import '@theatre/core' multiple times. But those imports should point to the same module.`):new Error("The variable window.".concat(Mu," seems to be already set by a module other than @theatre/core."));let e=new v2;window[Mu]=e;let t=window[dD];t&&t!==null&&t.type==="Theatre_StudioBundle"&&t.registerCoreBundle(e)}});var sd=0,Tc=1,ad=2;var bs=1,ho=2,Er=3,xi=0,Xt=1,Fn=2,mn=0,bi=1,Ss=2,Ec=3,Ac=4,od=5;var Bi=100,ld=101,cd=102,ud=103,hd=104,dd=200,fd=201,pd=202,md=203,Cc=204,Pc=205,gd=206,_d=207,vd=208,yd=209,xd=210,bd=211,Sd=212,Md=213,wd=214,La=0,Na=1,Oa=2,_r=3,Ua=4,Fa=5,Ba=6,za=7,Rc=0,Td=1,Ed=2,wn=0,Ms=1,ws=2,Ts=3,zi=4,Es=5,As=6,Cs=7;var Ic=300,Si=301,Vi=302,fo=303,po=304,Ps=306,Va=1e3,Ln=1001,ka=1002,Lt=1003,Ad=1004;var Rs=1005;var Ut=1006,mo=1007;var Mi=1008;var Kt=1009,Dc=1010,Lc=1011,Ar=1012,go=1013,Tn=1014,En=1015,Bt=1016,_o=1017,vo=1018,Cr=1020,Nc=35902,Oc=35899,Uc=1021,Fc=1022,gn=1023,Nn=1026,wi=1027,Bc=1028,yo=1029,Ti=1030,xo=1031;var bo=1033,Is=33776,Ds=33777,Ls=33778,Ns=33779,So=35840,Mo=35841,wo=35842,To=35843,Eo=36196,Ao=37492,Co=37496,Po=37488,Ro=37489,Os=37490,Io=37491,Do=37808,Lo=37809,No=37810,Oo=37811,Uo=37812,Fo=37813,Bo=37814,zo=37815,Vo=37816,ko=37817,Go=37818,Ho=37819,Wo=37820,qo=37821,Xo=36492,jo=36494,Yo=36495,Zo=36283,Jo=36284,Us=36285,Ko=36286;var ns=2300,Ga=2301,Ia=2302,vc=2303,yc=2400,xc=2401,bc=2402;var Cd=3200;var $o=0,Pd=1,Kn="",qt="srgb",is="srgb-linear",rs="linear",Ke="srgb";var Da=7680;var Rd=519,Id=512,Dd=513,Ld=514,Qo=515,Nd=516,Od=517,el=518,Ud=519,Fd=35044;var zc="100",Vc="300 es",Mn=2e3,vr=2001;function Hg(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Wg(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function ss(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Bd(){let n=ss("canvas");return n.style.display="block",n}var Bh={},yr=null;function kc(...n){let e="THREE."+n.shift();yr?yr("log",e,...n):console.log(e,...n)}function zd(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Le(...n){n=zd(n);let e="THREE."+n.shift();if(yr)yr("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Oe(...n){n=zd(n);let e="THREE."+n.shift();if(yr)yr("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Ni(...n){let e=n.join(" ");e in Bh||(Bh[e]=!0,Le(...n))}function Vd(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}var kd={[La]:Na,[Oa]:Ba,[Ua]:za,[_r]:Fa,[Na]:La,[Ba]:Oa,[za]:Ua,[Fa]:_r},On=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let r=i[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}},Vt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Zl=Math.PI/180,Ha=180/Math.PI;function Fs(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Vt[n&255]+Vt[n>>8&255]+Vt[n>>16&255]+Vt[n>>24&255]+"-"+Vt[e&255]+Vt[e>>8&255]+"-"+Vt[e>>16&15|64]+Vt[e>>24&255]+"-"+Vt[t&63|128]+Vt[t>>8&255]+"-"+Vt[t>>16&255]+Vt[t>>24&255]+Vt[i&255]+Vt[i>>8&255]+Vt[i>>16&255]+Vt[i>>24&255]).toLowerCase()}function je(n,e,t){return Math.max(e,Math.min(t,n))}function qg(n,e){return(n%e+e)%e}function Jl(n,e,t){return(1-t)*n+t*e}function Kr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function jt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Pe=class n{static{n.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(je(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Un=class{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],u=i[r+2],d=i[r+3],h=s[a+0],p=s[a+1],_=s[a+2],x=s[a+3];if(d!==x||l!==h||c!==p||u!==_){let m=l*h+c*p+u*_+d*x;m<0&&(h=-h,p=-p,_=-_,x=-x,m=-m);let f=1-o;if(m<.9995){let T=Math.acos(m),P=Math.sin(T);f=Math.sin(f*T)/P,o=Math.sin(o*T)/P,l=l*f+h*o,c=c*f+p*o,u=u*f+_*o,d=d*f+x*o}else{l=l*f+h*o,c=c*f+p*o,u=u*f+_*o,d=d*f+x*o;let T=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=T,c*=T,u*=T,d*=T}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,s,a){let o=i[r],l=i[r+1],c=i[r+2],u=i[r+3],d=s[a],h=s[a+1],p=s[a+2],_=s[a+3];return e[t]=o*_+u*d+l*p-c*h,e[t+1]=l*_+u*h+c*d-o*p,e[t+2]=c*_+u*p+o*h-l*d,e[t+3]=u*_-o*d-l*h-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(r/2),d=o(s/2),h=l(i/2),p=l(r/2),_=l(s/2);switch(a){case"XYZ":this._x=h*u*d+c*p*_,this._y=c*p*d-h*u*_,this._z=c*u*_+h*p*d,this._w=c*u*d-h*p*_;break;case"YXZ":this._x=h*u*d+c*p*_,this._y=c*p*d-h*u*_,this._z=c*u*_-h*p*d,this._w=c*u*d+h*p*_;break;case"ZXY":this._x=h*u*d-c*p*_,this._y=c*p*d+h*u*_,this._z=c*u*_+h*p*d,this._w=c*u*d-h*p*_;break;case"ZYX":this._x=h*u*d-c*p*_,this._y=c*p*d+h*u*_,this._z=c*u*_-h*p*d,this._w=c*u*d+h*p*_;break;case"YZX":this._x=h*u*d+c*p*_,this._y=c*p*d+h*u*_,this._z=c*u*_-h*p*d,this._w=c*u*d-h*p*_;break;case"XZY":this._x=h*u*d-c*p*_,this._y=c*p*d-h*u*_,this._z=c*u*_+h*p*d,this._w=c*u*d+h*p*_;break;default:Le("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=i+o+d;if(h>0){let p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(a-r)*p}else if(i>o&&i>d){let p=2*Math.sqrt(1+i-o-d);this._w=(u-l)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+c)/p}else if(o>d){let p=2*Math.sqrt(1+o-i-d);this._w=(s-c)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(l+u)/p}else{let p=2*Math.sqrt(1+d-i-o);this._w=(a-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(je(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-i*c,this._z=s*u+a*c+i*l-r*o,this._w=a*u-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},z=class n{static{n.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(zh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(zh.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){let t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),u=2*(o*t-s*r),d=2*(s*i-a*t);return this.x=t+l*c+a*d-o*u,this.y=i+l*u+o*c-s*d,this.z=r+l*d+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this.z=je(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this.z=je(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Kl.copy(this).projectOnVector(e),this.sub(Kl)}reflect(e){return this.sub(Kl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(je(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Kl=new z,zh=new Un,Fe=class n{static{n.prototype.isMatrix3=!0}constructor(e,t,i,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){let u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],d=i[7],h=i[2],p=i[5],_=i[8],x=r[0],m=r[3],f=r[6],T=r[1],P=r[4],S=r[7],b=r[2],M=r[5],A=r[8];return s[0]=a*x+o*T+l*b,s[3]=a*m+o*P+l*M,s[6]=a*f+o*S+l*A,s[1]=c*x+u*T+d*b,s[4]=c*m+u*P+d*M,s[7]=c*f+u*S+d*A,s[2]=h*x+p*T+_*b,s[5]=h*m+p*P+_*M,s[8]=h*f+p*S+_*A,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*s*u+i*o*l+r*s*c-r*a*l}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=u*a-o*c,h=o*l-u*s,p=c*s-a*l,_=t*d+i*h+r*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/_;return e[0]=d*x,e[1]=(r*c-u*i)*x,e[2]=(o*i-r*a)*x,e[3]=h*x,e[4]=(u*t-r*l)*x,e[5]=(r*s-o*t)*x,e[6]=p*x,e[7]=(i*l-c*t)*x,e[8]=(a*t-i*s)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){let l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Ni("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply($l.makeScale(e,t)),this}rotate(e){return Ni("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply($l.makeRotation(-e)),this}translate(e,t){return Ni("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply($l.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},$l=new Fe,Vh=new Fe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),kh=new Fe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Xg(){let n={enabled:!0,workingColorSpace:is,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===Ke&&(r.r=Zn(r.r),r.g=Zn(r.g),r.b=Zn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Ke&&(r.r=gr(r.r),r.g=gr(r.g),r.b=gr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Kn?rs:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Ni("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Ni("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[is]:{primaries:e,whitePoint:i,transfer:rs,toXYZ:Vh,fromXYZ:kh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:qt},outputColorSpaceConfig:{drawingBufferColorSpace:qt}},[qt]:{primaries:e,whitePoint:i,transfer:Ke,toXYZ:Vh,fromXYZ:kh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:qt}}}),n}var qe=Xg();function Zn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function gr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var ir,Wa=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{ir===void 0&&(ir=ss("canvas")),ir.width=e.width,ir.height=e.height;let r=ir.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=ir}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=ss("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Zn(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Zn(t[i]/255)*255):t[i]=Zn(t[i]);return{data:t,width:e.width,height:e.height}}else return Le("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},jg=0,xr=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:jg++}),this.uuid=Fs(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Ql(r[a].image)):s.push(Ql(r[a]))}else s=Ql(r);i.url=s}return t||(e.images[this.uuid]=i),i}};function Ql(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Wa.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Le("Texture: Unable to serialize Texture."),{})}var Yg=0,ec=new z,Yt=class n extends On{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=Ln,r=Ln,s=Ut,a=Mi,o=gn,l=Kt,c=n.DEFAULT_ANISOTROPY,u=Kn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Yg++}),this.uuid=Fs(),this.name="",this.source=new xr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Pe(0,0),this.repeat=new Pe(1,1),this.center=new Pe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Fe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ec).x}get height(){return this.source.getSize(ec).y}get depth(){return this.source.getSize(ec).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){Le(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){Le(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ic)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Va:e.x=e.x-Math.floor(e.x);break;case Ln:e.x=e.x<0?0:1;break;case ka:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Va:e.y=e.y-Math.floor(e.y);break;case Ln:e.y=e.y<0?0:1;break;case ka:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Yt.DEFAULT_IMAGE=null;Yt.DEFAULT_MAPPING=Ic;Yt.DEFAULT_ANISOTROPY=1;var rt=class n{static{n.prototype.isVector4=!0}constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s,l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],p=l[5],_=l[9],x=l[2],m=l[6],f=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-x)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+x)<.1&&Math.abs(_+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let P=(c+1)/2,S=(p+1)/2,b=(f+1)/2,M=(u+h)/4,A=(d+x)/4,v=(_+m)/4;return P>S&&P>b?P<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(P),r=M/i,s=A/i):S>b?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=M/r,s=v/r):b<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(b),i=A/s,r=v/s),this.set(i,r,s,t),this}let T=Math.sqrt((m-_)*(m-_)+(d-x)*(d-x)+(h-u)*(h-u));return Math.abs(T)<.001&&(T=1),this.x=(m-_)/T,this.y=(d-x)/T,this.z=(h-u)/T,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this.z=je(this.z,e.z,t.z),this.w=je(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this.z=je(this.z,e,t),this.w=je(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},qa=class extends On{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ut,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new rt(0,0,e,t),this.scissorTest=!1,this.viewport=new rt(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:i.depth},s=new Yt(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Ut,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new xr(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},At=class extends qa{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},as=class extends Yt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=Ln,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Xa=class extends Yt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=Ln,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var yt=class n{static{n.prototype.isMatrix4=!0}constructor(e,t,i,r,s,a,o,l,c,u,d,h,p,_,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,u,d,h,p,_,x,m)}set(e,t,i,r,s,a,o,l,c,u,d,h,p,_,x,m){let f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=r,f[1]=s,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=u,f[10]=d,f[14]=h,f[3]=p,f[7]=_,f[11]=x,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,i=e.elements,r=1/rr.setFromMatrixColumn(e,0).length(),s=1/rr.setFromMatrixColumn(e,1).length(),a=1/rr.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){let h=a*u,p=a*d,_=o*u,x=o*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=p+_*c,t[5]=h-x*c,t[9]=-o*l,t[2]=x-h*c,t[6]=_+p*c,t[10]=a*l}else if(e.order==="YXZ"){let h=l*u,p=l*d,_=c*u,x=c*d;t[0]=h+x*o,t[4]=_*o-p,t[8]=a*c,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=p*o-_,t[6]=x+h*o,t[10]=a*l}else if(e.order==="ZXY"){let h=l*u,p=l*d,_=c*u,x=c*d;t[0]=h-x*o,t[4]=-a*d,t[8]=_+p*o,t[1]=p+_*o,t[5]=a*u,t[9]=x-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let h=a*u,p=a*d,_=o*u,x=o*d;t[0]=l*u,t[4]=_*c-p,t[8]=h*c+x,t[1]=l*d,t[5]=x*c+h,t[9]=p*c-_,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let h=a*l,p=a*c,_=o*l,x=o*c;t[0]=l*u,t[4]=x-h*d,t[8]=_*d+p,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=p*d+_,t[10]=h-x*d}else if(e.order==="XZY"){let h=a*l,p=a*c,_=o*l,x=o*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+x,t[5]=a*u,t[9]=p*d-_,t[2]=_*d-p,t[6]=o*u,t[10]=x*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Zg,e,Jg)}lookAt(e,t,i){let r=this.elements;return tn.subVectors(e,t),tn.lengthSq()===0&&(tn.z=1),tn.normalize(),oi.crossVectors(i,tn),oi.lengthSq()===0&&(Math.abs(i.z)===1?tn.x+=1e-4:tn.z+=1e-4,tn.normalize(),oi.crossVectors(i,tn)),oi.normalize(),da.crossVectors(tn,oi),r[0]=oi.x,r[4]=da.x,r[8]=tn.x,r[1]=oi.y,r[5]=da.y,r[9]=tn.y,r[2]=oi.z,r[6]=da.z,r[10]=tn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],d=i[5],h=i[9],p=i[13],_=i[2],x=i[6],m=i[10],f=i[14],T=i[3],P=i[7],S=i[11],b=i[15],M=r[0],A=r[4],v=r[8],w=r[12],C=r[1],L=r[5],O=r[9],B=r[13],R=r[2],U=r[6],X=r[10],G=r[14],te=r[3],W=r[7],ee=r[11],Z=r[15];return s[0]=a*M+o*C+l*R+c*te,s[4]=a*A+o*L+l*U+c*W,s[8]=a*v+o*O+l*X+c*ee,s[12]=a*w+o*B+l*G+c*Z,s[1]=u*M+d*C+h*R+p*te,s[5]=u*A+d*L+h*U+p*W,s[9]=u*v+d*O+h*X+p*ee,s[13]=u*w+d*B+h*G+p*Z,s[2]=_*M+x*C+m*R+f*te,s[6]=_*A+x*L+m*U+f*W,s[10]=_*v+x*O+m*X+f*ee,s[14]=_*w+x*B+m*G+f*Z,s[3]=T*M+P*C+S*R+b*te,s[7]=T*A+P*L+S*U+b*W,s[11]=T*v+P*O+S*X+b*ee,s[15]=T*w+P*B+S*G+b*Z,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],p=e[14],_=e[3],x=e[7],m=e[11],f=e[15],T=l*p-c*h,P=o*p-c*d,S=o*h-l*d,b=a*p-c*u,M=a*h-l*u,A=a*d-o*u;return t*(x*T-m*P+f*S)-i*(_*T-m*b+f*M)+r*(_*P-x*b+f*A)-s*(_*S-x*M+m*A)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],r=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return t*(a*u-o*c)-i*(s*u-o*l)+r*(s*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],p=e[11],_=e[12],x=e[13],m=e[14],f=e[15],T=t*o-i*a,P=t*l-r*a,S=t*c-s*a,b=i*l-r*o,M=i*c-s*o,A=r*c-s*l,v=u*x-d*_,w=u*m-h*_,C=u*f-p*_,L=d*m-h*x,O=d*f-p*x,B=h*f-p*m,R=T*B-P*O+S*L+b*C-M*w+A*v;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let U=1/R;return e[0]=(o*B-l*O+c*L)*U,e[1]=(r*O-i*B-s*L)*U,e[2]=(x*A-m*M+f*b)*U,e[3]=(h*M-d*A-p*b)*U,e[4]=(l*C-a*B-c*w)*U,e[5]=(t*B-r*C+s*w)*U,e[6]=(m*S-_*A-f*P)*U,e[7]=(u*A-h*S+p*P)*U,e[8]=(a*O-o*C+c*v)*U,e[9]=(i*C-t*O-s*v)*U,e[10]=(_*M-x*S+f*T)*U,e[11]=(d*S-u*M-p*T)*U,e[12]=(o*w-a*L-l*v)*U,e[13]=(t*L-i*w+r*v)*U,e[14]=(x*P-_*b-m*T)*U,e[15]=(u*b-d*P+h*T)*U,this}scale(e){let t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+i,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){let r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,d=o+o,h=s*c,p=s*u,_=s*d,x=a*u,m=a*d,f=o*d,T=l*c,P=l*u,S=l*d,b=i.x,M=i.y,A=i.z;return r[0]=(1-(x+f))*b,r[1]=(p+S)*b,r[2]=(_-P)*b,r[3]=0,r[4]=(p-S)*M,r[5]=(1-(h+f))*M,r[6]=(m+T)*M,r[7]=0,r[8]=(_+P)*A,r[9]=(m-T)*A,r[10]=(1-(h+x))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let a=rr.set(r[0],r[1],r[2]).length(),o=rr.set(r[4],r[5],r[6]).length(),l=rr.set(r[8],r[9],r[10]).length();s<0&&(a=-a),yn.copy(this);let c=1/a,u=1/o,d=1/l;return yn.elements[0]*=c,yn.elements[1]*=c,yn.elements[2]*=c,yn.elements[4]*=u,yn.elements[5]*=u,yn.elements[6]*=u,yn.elements[8]*=d,yn.elements[9]*=d,yn.elements[10]*=d,t.setFromRotationMatrix(yn),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,r,s,a,o=Mn,l=!1){let c=this.elements,u=2*s/(t-e),d=2*s/(i-r),h=(t+e)/(t-e),p=(i+r)/(i-r),_,x;if(l)_=s/(a-s),x=a*s/(a-s);else if(o===Mn)_=-(a+s)/(a-s),x=-2*a*s/(a-s);else if(o===vr)_=-a/(a-s),x=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=Mn,l=!1){let c=this.elements,u=2/(t-e),d=2/(i-r),h=-(t+e)/(t-e),p=-(i+r)/(i-r),_,x;if(l)_=1/(a-s),x=a/(a-s);else if(o===Mn)_=-2/(a-s),x=-(a+s)/(a-s);else if(o===vr)_=-1/(a-s),x=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=_,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},rr=new z,yn=new yt,Zg=new z(0,0,0),Jg=new z(1,1,1),oi=new z,da=new z,tn=new z,Gh=new yt,Hh=new Un,Jn=class n{constructor(e=0,t=0,i=0,r=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],d=r[2],h=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-je(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(je(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-je(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(je(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Le("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Gh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Gh,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Hh.setFromEuler(this),this.setFromQuaternion(Hh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Jn.DEFAULT_ORDER="XYZ";var os=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Kg=0,Wh=new z,sr=new Un,Wn=new yt,fa=new z,$r=new z,$g=new z,Qg=new Un,qh=new z(1,0,0),Xh=new z(0,1,0),jh=new z(0,0,1),Yh={type:"added"},e_={type:"removed"},ar={type:"childadded",child:null},tc={type:"childremoved",child:null},Zt=class n extends On{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Kg++}),this.uuid=Fs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new z,t=new Jn,i=new Un,r=new z(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new yt},normalMatrix:{value:new Fe}}),this.matrix=new yt,this.matrixWorld=new yt,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new os,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return sr.setFromAxisAngle(e,t),this.quaternion.multiply(sr),this}rotateOnWorldAxis(e,t){return sr.setFromAxisAngle(e,t),this.quaternion.premultiply(sr),this}rotateX(e){return this.rotateOnAxis(qh,e)}rotateY(e){return this.rotateOnAxis(Xh,e)}rotateZ(e){return this.rotateOnAxis(jh,e)}translateOnAxis(e,t){return Wh.copy(e).applyQuaternion(this.quaternion),this.position.add(Wh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(qh,e)}translateY(e){return this.translateOnAxis(Xh,e)}translateZ(e){return this.translateOnAxis(jh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Wn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?fa.copy(e):fa.set(e,t,i);let r=this.parent;this.updateWorldMatrix(!0,!1),$r.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Wn.lookAt($r,fa,this.up):Wn.lookAt(fa,$r,this.up),this.quaternion.setFromRotationMatrix(Wn),r&&(Wn.extractRotation(r.matrixWorld),sr.setFromRotationMatrix(Wn),this.quaternion.premultiply(sr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Oe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Yh),ar.child=e,this.dispatchEvent(ar),ar.child=null):Oe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(e_),tc.child=e,this.dispatchEvent(tc),tc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Wn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Wn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Wn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Yh),ar.child=e,this.dispatchEvent(ar),ar.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){let a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($r,e,$g),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($r,Qg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){let s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),d=a(e.shapes),h=a(e.skeletons),p=a(e.animations),_=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),_.length>0&&(i.nodes=_)}return i.object=r,i;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Zt.DEFAULT_UP=new z(0,1,0);Zt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Li=class extends Zt{constructor(){super(),this.isGroup=!0,this.type="Group"}},t_={type:"move"},br=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Li,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Li,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Li,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let x of e.hand.values()){let m=t.getJointPose(x,i),f=this._getHandJoint(c,x);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),p=.02,_=.005;c.inputState.pinching&&h>p+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=p-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(t_)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new Li;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},Gd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},li={h:0,s:0,l:0},pa={h:0,s:0,l:0};function nc(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var De=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=qt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qe.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=qe.workingColorSpace){return this.r=e,this.g=t,this.b=i,qe.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=qe.workingColorSpace){if(e=qg(e,1),t=je(t,0,1),i=je(i,0,1),t===0)this.r=this.g=this.b=i;else{let s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=nc(a,s,e+1/3),this.g=nc(a,s,e),this.b=nc(a,s,e-1/3)}return qe.colorSpaceToWorking(this,r),this}setStyle(e,t=qt){function i(s){s!==void 0&&parseFloat(s)<1&&Le("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Le("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Le("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=qt){let i=Gd[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Le("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Zn(e.r),this.g=Zn(e.g),this.b=Zn(e.b),this}copyLinearToSRGB(e){return this.r=gr(e.r),this.g=gr(e.g),this.b=gr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=qt){return qe.workingToColorSpace(kt.copy(this),e),Math.round(je(kt.r*255,0,255))*65536+Math.round(je(kt.g*255,0,255))*256+Math.round(je(kt.b*255,0,255))}getHexString(e=qt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=qe.workingColorSpace){qe.workingToColorSpace(kt.copy(this),t);let i=kt.r,r=kt.g,s=kt.b,a=Math.max(i,r,s),o=Math.min(i,r,s),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case i:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-i)/d+2;break;case s:l=(i-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=qe.workingColorSpace){return qe.workingToColorSpace(kt.copy(this),t),e.r=kt.r,e.g=kt.g,e.b=kt.b,e}getStyle(e=qt){qe.workingToColorSpace(kt.copy(this),e);let t=kt.r,i=kt.g,r=kt.b;return e!==qt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(li),this.setHSL(li.h+e,li.s+t,li.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(li),e.getHSL(pa);let i=Jl(li.h,pa.h,t),r=Jl(li.s,pa.s,t),s=Jl(li.l,pa.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},kt=new De;De.NAMES=Gd;var ls=class n{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new De(e),this.density=t}clone(){return new n(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var cs=class extends Zt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Jn,this.environmentIntensity=1,this.environmentRotation=new Jn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},xn=new z,qn=new z,ic=new z,Xn=new z,or=new z,lr=new z,Zh=new z,rc=new z,sc=new z,ac=new z,oc=new rt,lc=new rt,cc=new rt,di=class n{constructor(e=new z,t=new z,i=new z){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),xn.subVectors(e,t),r.cross(xn);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){xn.subVectors(r,t),qn.subVectors(i,t),ic.subVectors(e,t);let a=xn.dot(xn),o=xn.dot(qn),l=xn.dot(ic),c=qn.dot(qn),u=qn.dot(ic),d=a*c-o*o;if(d===0)return s.set(0,0,0),null;let h=1/d,p=(c*l-o*u)*h,_=(a*u-o*l)*h;return s.set(1-p-_,_,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Xn)===null?!1:Xn.x>=0&&Xn.y>=0&&Xn.x+Xn.y<=1}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,Xn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Xn.x),l.addScaledVector(a,Xn.y),l.addScaledVector(o,Xn.z),l)}static getInterpolatedAttribute(e,t,i,r,s,a){return oc.setScalar(0),lc.setScalar(0),cc.setScalar(0),oc.fromBufferAttribute(e,t),lc.fromBufferAttribute(e,i),cc.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(oc,s.x),a.addScaledVector(lc,s.y),a.addScaledVector(cc,s.z),a}static isFrontFacing(e,t,i,r){return xn.subVectors(i,t),qn.subVectors(e,t),xn.cross(qn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return xn.subVectors(this.c,this.b),qn.subVectors(this.a,this.b),xn.cross(qn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return n.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,r=this.b,s=this.c,a,o;or.subVectors(r,i),lr.subVectors(s,i),rc.subVectors(e,i);let l=or.dot(rc),c=lr.dot(rc);if(l<=0&&c<=0)return t.copy(i);sc.subVectors(e,r);let u=or.dot(sc),d=lr.dot(sc);if(u>=0&&d<=u)return t.copy(r);let h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector(or,a);ac.subVectors(e,s);let p=or.dot(ac),_=lr.dot(ac);if(_>=0&&p<=_)return t.copy(s);let x=p*c-l*_;if(x<=0&&c>=0&&_<=0)return o=c/(c-_),t.copy(i).addScaledVector(lr,o);let m=u*_-p*d;if(m<=0&&d-u>=0&&p-_>=0)return Zh.subVectors(s,r),o=(d-u)/(d-u+(p-_)),t.copy(r).addScaledVector(Zh,o);let f=1/(m+x+h);return a=x*f,o=h*f,t.copy(i).addScaledVector(or,a).addScaledVector(lr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},fi=class{constructor(e=new z(1/0,1/0,1/0),t=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(bn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(bn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=bn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,bn):bn.fromBufferAttribute(s,a),bn.applyMatrix4(e.matrixWorld),this.expandByPoint(bn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ma.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ma.copy(i.boundingBox)),ma.applyMatrix4(e.matrixWorld),this.union(ma)}let r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,bn),bn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Qr),ga.subVectors(this.max,Qr),cr.subVectors(e.a,Qr),ur.subVectors(e.b,Qr),hr.subVectors(e.c,Qr),ci.subVectors(ur,cr),ui.subVectors(hr,ur),Pi.subVectors(cr,hr);let t=[0,-ci.z,ci.y,0,-ui.z,ui.y,0,-Pi.z,Pi.y,ci.z,0,-ci.x,ui.z,0,-ui.x,Pi.z,0,-Pi.x,-ci.y,ci.x,0,-ui.y,ui.x,0,-Pi.y,Pi.x,0];return!uc(t,cr,ur,hr,ga)||(t=[1,0,0,0,1,0,0,0,1],!uc(t,cr,ur,hr,ga))?!1:(_a.crossVectors(ci,ui),t=[_a.x,_a.y,_a.z],uc(t,cr,ur,hr,ga))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,bn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(bn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(jn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},jn=[new z,new z,new z,new z,new z,new z,new z,new z],bn=new z,ma=new fi,cr=new z,ur=new z,hr=new z,ci=new z,ui=new z,Pi=new z,Qr=new z,ga=new z,_a=new z,Ri=new z;function uc(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){Ri.fromArray(n,s);let o=r.x*Math.abs(Ri.x)+r.y*Math.abs(Ri.y)+r.z*Math.abs(Ri.z),l=e.dot(Ri),c=t.dot(Ri),u=i.dot(Ri);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var Et=new z,va=new Pe,n_=0,pn=class extends On{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:n_++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Fd,this.updateRanges=[],this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)va.fromBufferAttribute(this,t),va.applyMatrix3(e),this.setXY(t,va.x,va.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix3(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix4(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyNormalMatrix(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.transformDirection(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Kr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=jt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Kr(t,this.array)),t}setX(e,t){return this.normalized&&(t=jt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Kr(t,this.array)),t}setY(e,t){return this.normalized&&(t=jt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Kr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=jt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Kr(t,this.array)),t}setW(e,t){return this.normalized&&(t=jt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=jt(t,this.array),i=jt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=jt(t,this.array),i=jt(i,this.array),r=jt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=jt(t,this.array),i=jt(i,this.array),r=jt(r,this.array),s=jt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var us=class extends pn{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var hs=class extends pn{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var Mt=class extends pn{constructor(e,t,i){super(new Float32Array(e),t,i)}},i_=new fi,es=new z,hc=new z,Sr=class{constructor(e=new z,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):i_.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;es.subVectors(e,this.center);let t=es.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(es,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(hc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(es.copy(e.center).add(hc)),this.expandByPoint(es.copy(e.center).sub(hc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},r_=0,fn=new yt,dc=new Zt,dr=new z,nn=new fi,ts=new fi,Dt=new z,Jt=class n extends On{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:r_++}),this.uuid=Fs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Hg(e)?hs:us)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let s=new Fe().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return fn.makeRotationFromQuaternion(e),this.applyMatrix4(fn),this}rotateX(e){return fn.makeRotationX(e),this.applyMatrix4(fn),this}rotateY(e){return fn.makeRotationY(e),this.applyMatrix4(fn),this}rotateZ(e){return fn.makeRotationZ(e),this.applyMatrix4(fn),this}translate(e,t,i){return fn.makeTranslation(e,t,i),this.applyMatrix4(fn),this}scale(e,t,i){return fn.makeScale(e,t,i),this.applyMatrix4(fn),this}lookAt(e){return dc.lookAt(e),dc.updateMatrix(),this.applyMatrix4(dc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(dr).negate(),this.translate(dr.x,dr.y,dr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let r=0,s=e.length;r<s;r++){let a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Mt(i,3))}else{let i=Math.min(e.length,t.count);for(let r=0;r<i;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Le("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Oe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){let s=t[i];nn.setFromBufferAttribute(s),this.morphTargetsRelative?(Dt.addVectors(this.boundingBox.min,nn.min),this.boundingBox.expandByPoint(Dt),Dt.addVectors(this.boundingBox.max,nn.max),this.boundingBox.expandByPoint(Dt)):(this.boundingBox.expandByPoint(nn.min),this.boundingBox.expandByPoint(nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Oe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Sr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Oe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(e){let i=this.boundingSphere.center;if(nn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];ts.setFromBufferAttribute(o),this.morphTargetsRelative?(Dt.addVectors(nn.min,ts.min),nn.expandByPoint(Dt),Dt.addVectors(nn.max,ts.max),nn.expandByPoint(Dt)):(nn.expandByPoint(ts.min),nn.expandByPoint(ts.max))}nn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Dt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Dt));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Dt.fromBufferAttribute(o,c),l&&(dr.fromBufferAttribute(e,c),Dt.add(dr)),r=Math.max(r,i.distanceToSquared(Dt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Oe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Oe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,r=t.normal,s=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new pn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let v=0;v<i.count;v++)o[v]=new z,l[v]=new z;let c=new z,u=new z,d=new z,h=new Pe,p=new Pe,_=new Pe,x=new z,m=new z;function f(v,w,C){c.fromBufferAttribute(i,v),u.fromBufferAttribute(i,w),d.fromBufferAttribute(i,C),h.fromBufferAttribute(s,v),p.fromBufferAttribute(s,w),_.fromBufferAttribute(s,C),u.sub(c),d.sub(c),p.sub(h),_.sub(h);let L=1/(p.x*_.y-_.x*p.y);isFinite(L)&&(x.copy(u).multiplyScalar(_.y).addScaledVector(d,-p.y).multiplyScalar(L),m.copy(d).multiplyScalar(p.x).addScaledVector(u,-_.x).multiplyScalar(L),o[v].add(x),o[w].add(x),o[C].add(x),l[v].add(m),l[w].add(m),l[C].add(m))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let v=0,w=T.length;v<w;++v){let C=T[v],L=C.start,O=C.count;for(let B=L,R=L+O;B<R;B+=3)f(e.getX(B+0),e.getX(B+1),e.getX(B+2))}let P=new z,S=new z,b=new z,M=new z;function A(v){b.fromBufferAttribute(r,v),M.copy(b);let w=o[v];P.copy(w),P.sub(b.multiplyScalar(b.dot(w))).normalize(),S.crossVectors(M,w);let L=S.dot(l[v])<0?-1:1;a.setXYZW(v,P.x,P.y,P.z,L)}for(let v=0,w=T.length;v<w;++v){let C=T[v],L=C.start,O=C.count;for(let B=L,R=L+O;B<R;B+=3)A(e.getX(B+0)),A(e.getX(B+1)),A(e.getX(B+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new pn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);let r=new z,s=new z,a=new z,o=new z,l=new z,c=new z,u=new z,d=new z;if(e)for(let h=0,p=e.count;h<p;h+=3){let _=e.getX(h+0),x=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,_),s.fromBufferAttribute(t,x),a.fromBufferAttribute(t,m),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),o.fromBufferAttribute(i,_),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=t.count;h<p;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Dt.fromBufferAttribute(e,t),Dt.normalize(),e.setXYZ(t,Dt.x,Dt.y,Dt.z)}toNonIndexed(){function e(o,l){let c=o.array,u=o.itemSize,d=o.normalized,h=new c.constructor(l.length*u),p=0,_=0;for(let x=0,m=l.length;x<m;x++){o.isInterleavedBufferAttribute?p=l[x]*o.data.stride+o.offset:p=l[x]*u;for(let f=0;f<u;f++)h[_++]=c[p++]}return new pn(h,u,d)}if(this.index===null)return Le("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,r=this.attributes;for(let o in r){let l=r[o],c=e(l,i);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let u=0,d=c.length;u<d;u++){let h=c[u],p=e(h,i);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let l in i){let c=i[l];e.data.attributes[l]=c.toJSON(e.data)}let r={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){let p=c[d];u.push(p.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let r=e.attributes;for(let c in r){let u=r[c];this.setAttribute(c,u.clone(t))}let s=e.morphAttributes;for(let c in s){let u=[],d=s[c];for(let h=0,p=d.length;h<p;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,u=a.length;c<u;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var fc=new z,s_=new z,a_=new Fe,Sn=class{constructor(e=new z(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=fc.subVectors(i,t).cross(s_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let r=e.delta(fc),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||a_.getNormalMatrix(e),r=this.coplanarPoint(fc).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},o_=0,pi=class extends On{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:o_++}),this.uuid=Fs(),this.name="",this.type="Material",this.blending=bi,this.side=xi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Cc,this.blendDst=Pc,this.blendEquation=Bi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new De(0,0,0),this.blendAlpha=0,this.depthFunc=_r,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Rd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Da,this.stencilZFail=Da,this.stencilZPass=Da,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){Le(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){Le(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){let a=[];for(let o in s){let l=s[o];delete l.metadata,a.push(l)}return a}if(t){let s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new De().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new Sn().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Pe().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Pe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var Yn=new z,pc=new z,ya=new z,xa=new z,ja=class{constructor(e=new z,t=new z(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Yn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Yn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Yn.copy(this.origin).addScaledVector(this.direction,t),Yn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){pc.copy(e).add(t).multiplyScalar(.5),ya.copy(t).sub(e).normalize(),xa.copy(this.origin).sub(pc);let s=e.distanceTo(t)*.5,a=-this.direction.dot(ya),o=xa.dot(this.direction),l=-xa.dot(ya),c=xa.lengthSq(),u=Math.abs(1-a*a),d,h,p,_;if(u>0)if(d=a*l-o,h=a*o-l,_=s*u,d>=0)if(h>=-_)if(h<=_){let x=1/u;d*=x,h*=x,p=d*(d+a*h+2*o)+h*(a*d+h+2*l)+c}else h=s,d=Math.max(0,-(a*h+o)),p=-d*d+h*(h+2*l)+c;else h=-s,d=Math.max(0,-(a*h+o)),p=-d*d+h*(h+2*l)+c;else h<=-_?(d=Math.max(0,-(-a*s+o)),h=d>0?-s:Math.min(Math.max(-s,-l),s),p=-d*d+h*(h+2*l)+c):h<=_?(d=0,h=Math.min(Math.max(-s,-l),s),p=h*(h+2*l)+c):(d=Math.max(0,-(a*s+o)),h=d>0?s:Math.min(Math.max(-s,-l),s),p=-d*d+h*(h+2*l)+c);else h=a>0?-s:s,d=Math.max(0,-(a*h+o)),p=-d*d+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(pc).addScaledVector(ya,h),p}intersectSphere(e,t){if(e.radius<0)return null;Yn.subVectors(e.center,this.origin);let i=Yn.dot(this.direction),r=Yn.dot(Yn)-i*i,s=e.radius*e.radius;if(r>s)return null;let a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l,c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Yn)!==null}intersectTriangle(e,t,i,r,s){let a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,d=e.x-a.x,h=e.y-a.y,p=e.z-a.z,_=t.x-a.x,x=t.y-a.y,m=t.z-a.z,f=i.x-a.x,T=i.y-a.y,P=i.z-a.z,S=Math.abs(l),b=Math.abs(c),M=Math.abs(u),A,v,w,C,L,O,B,R,U,X,G,te;if(S>=b&&S>=M?(w=l,O=d,U=_,te=f,l>=0?(A=c,v=u,C=h,L=p,B=x,R=m,X=T,G=P):(A=u,v=c,C=p,L=h,B=m,R=x,X=P,G=T)):b>=M?(w=c,O=h,U=x,te=T,c>=0?(A=u,v=l,C=p,L=d,B=m,R=_,X=P,G=f):(A=l,v=u,C=d,L=p,B=_,R=m,X=f,G=P)):(w=u,O=p,U=m,te=P,u>=0?(A=l,v=c,C=d,L=h,B=_,R=x,X=f,G=T):(A=c,v=l,C=h,L=d,B=x,R=_,X=T,G=f)),w===0)return null;let W=A/w,ee=v/w,Z=1/w,pe=C-W*O,ie=L-ee*O,Ne=B-W*U,be=R-ee*U,ze=X-W*te,j=G-ee*te,K=ze*be-j*Ne,ue=pe*j-ie*ze,Ue=Ne*ie-be*pe;if(r){if(K<0||ue<0||Ue<0)return null}else if((K<0||ue<0||Ue<0)&&(K>0||ue>0||Ue>0))return null;let _e=K+ue+Ue;if(_e===0)return null;let He=Z*(K*O+ue*U+Ue*te);return(_e>0?He<0:He>0)?null:this.at(He/_e,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Oi=class extends pi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new De(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Jn,this.combine=Rc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Jh=new yt,Ii=new ja,ba=new Sr,Kh=new z,Sa=new z,Ma=new z,wa=new z,mc=new z,Ta=new z,$h=new z,Ea=new z,Ft=class extends Zt{constructor(e=new Jt,t=new Oi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(s&&o){Ta.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let u=o[l],d=s[l];u!==0&&(mc.fromBufferAttribute(d,e),a?Ta.addScaledVector(mc,u):Ta.addScaledVector(mc.sub(t),u))}t.add(Ta)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ba.copy(i.boundingSphere),ba.applyMatrix4(s),Ii.copy(e.ray).recast(e.near),!(ba.containsPoint(Ii.origin)===!1&&(Ii.intersectSphere(ba,Kh)===null||Ii.origin.distanceToSquared(Kh)>(e.far-e.near)**2))&&(Jh.copy(s).invert(),Ii.copy(e.ray).applyMatrix4(Jh),!(i.boundingBox!==null&&Ii.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Ii)))}_computeIntersections(e,t,i){let r,s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,h=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,x=h.length;_<x;_++){let m=h[_],f=a[m.materialIndex],T=Math.max(m.start,p.start),P=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let S=T,b=P;S<b;S+=3){let M=o.getX(S),A=o.getX(S+1),v=o.getX(S+2);r=Aa(this,f,e,i,c,u,d,M,A,v),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let _=Math.max(0,p.start),x=Math.min(o.count,p.start+p.count);for(let m=_,f=x;m<f;m+=3){let T=o.getX(m),P=o.getX(m+1),S=o.getX(m+2);r=Aa(this,a,e,i,c,u,d,T,P,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,x=h.length;_<x;_++){let m=h[_],f=a[m.materialIndex],T=Math.max(m.start,p.start),P=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let S=T,b=P;S<b;S+=3){let M=S,A=S+1,v=S+2;r=Aa(this,f,e,i,c,u,d,M,A,v),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let _=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let m=_,f=x;m<f;m+=3){let T=m,P=m+1,S=m+2;r=Aa(this,a,e,i,c,u,d,T,P,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}};function l_(n,e,t,i,r,s,a,o){let l;if(e.side===Xt?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===xi,o),l===null)return null;Ea.copy(o),Ea.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo(Ea);return c<t.near||c>t.far?null:{distance:c,point:Ea.clone(),object:n}}function Aa(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,Sa),n.getVertexPosition(l,Ma),n.getVertexPosition(c,wa);let u=l_(n,e,t,i,Sa,Ma,wa,$h);if(u){let d=new z;di.getBarycoord($h,Sa,Ma,wa,d),r&&(u.uv=di.getInterpolatedAttribute(r,o,l,c,d,new Pe)),s&&(u.uv1=di.getInterpolatedAttribute(s,o,l,c,d,new Pe)),a&&(u.normal=di.getInterpolatedAttribute(a,o,l,c,d,new z),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let h={a:o,b:l,c,normal:new z,materialIndex:0};di.getNormal(Sa,Ma,wa,h.normal),u.face=h,u.barycoord=d}return u}var Ya=class extends Yt{constructor(e=null,t=1,i=1,r,s,a,o,l,c=Lt,u=Lt,d,h){super(null,a,o,l,c,u,r,s,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Di=new Sr,c_=new Pe(.5,.5),Ca=new z,Mr=class{constructor(e=new Sn,t=new Sn,i=new Sn,r=new Sn,s=new Sn,a=new Sn){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Mn,i=!1){let r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],d=s[5],h=s[6],p=s[7],_=s[8],x=s[9],m=s[10],f=s[11],T=s[12],P=s[13],S=s[14],b=s[15];if(r[0].setComponents(c-a,p-u,f-_,b-T).normalize(),r[1].setComponents(c+a,p+u,f+_,b+T).normalize(),r[2].setComponents(c+o,p+d,f+x,b+P).normalize(),r[3].setComponents(c-o,p-d,f-x,b-P).normalize(),i)r[4].setComponents(l,h,m,S).normalize(),r[5].setComponents(c-l,p-h,f-m,b-S).normalize();else if(r[4].setComponents(c-l,p-h,f-m,b-S).normalize(),t===Mn)r[5].setComponents(c+l,p+h,f+m,b+S).normalize();else if(t===vr)r[5].setComponents(l,h,m,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Di.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Di.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Di)}intersectsSprite(e){Di.center.set(0,0,0);let t=c_.distanceTo(e.center);return Di.radius=.7071067811865476+t,Di.applyMatrix4(e.matrixWorld),this.intersectsSphere(Di)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if(Ca.x=r.normal.x>0?e.max.x:e.min.x,Ca.y=r.normal.y>0?e.max.y:e.min.y,Ca.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ca)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var ds=class extends Yt{constructor(e=[],t=Si,i,r,s,a,o,l,c,u){super(e,t,i,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var mi=class extends Yt{constructor(e,t,i=Tn,r,s,a,o=Lt,l=Lt,c,u=Nn,d=1){if(u!==Nn&&u!==wi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:e,height:t,depth:d};super(h,r,s,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new xr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Za=class extends mi{constructor(e,t=Tn,i=Si,r,s,a=Lt,o=Lt,l,c=Nn){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,i,r,s,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},fs=class extends Yt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},rn=class n extends Jt{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};let o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);let l=[],c=[],u=[],d=[],h=0,p=0;_("z","y","x",-1,-1,i,t,e,a,s,0),_("z","y","x",1,-1,i,t,-e,a,s,1),_("x","z","y",1,1,e,i,t,r,a,2),_("x","z","y",1,-1,e,i,-t,r,a,3),_("x","y","z",1,-1,e,t,i,r,s,4),_("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Mt(c,3)),this.setAttribute("normal",new Mt(u,3)),this.setAttribute("uv",new Mt(d,2));function _(x,m,f,T,P,S,b,M,A,v,w){let C=S/A,L=b/v,O=S/2,B=b/2,R=M/2,U=A+1,X=v+1,G=0,te=0,W=new z;for(let ee=0;ee<X;ee++){let Z=ee*L-B;for(let pe=0;pe<U;pe++){let ie=pe*C-O;W[x]=ie*T,W[m]=Z*P,W[f]=R,c.push(W.x,W.y,W.z),W[x]=0,W[m]=0,W[f]=M>0?1:-1,u.push(W.x,W.y,W.z),d.push(pe/A),d.push(1-ee/v),G+=1}}for(let ee=0;ee<v;ee++)for(let Z=0;Z<A;Z++){let pe=h+Z+U*ee,ie=h+Z+U*(ee+1),Ne=h+(Z+1)+U*(ee+1),be=h+(Z+1)+U*ee;l.push(pe,ie,be),l.push(ie,Ne,be),te+=6}o.addGroup(p,te,w),p+=te,h+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var wr=class n extends Jt{constructor(e=1,t=1,i=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};let c=this;r=Math.floor(r),s=Math.floor(s);let u=[],d=[],h=[],p=[],_=0,x=[],m=i/2,f=0;T(),a===!1&&(e>0&&P(!0),t>0&&P(!1)),this.setIndex(u),this.setAttribute("position",new Mt(d,3)),this.setAttribute("normal",new Mt(h,3)),this.setAttribute("uv",new Mt(p,2));function T(){let S=new z,b=new z,M=0,A=(t-e)/i;for(let v=0;v<=s;v++){let w=[],C=v/s,L=C*(t-e)+e;for(let O=0;O<=r;O++){let B=O/r,R=B*l+o,U=Math.sin(R),X=Math.cos(R);b.x=L*U,b.y=-C*i+m,b.z=L*X,d.push(b.x,b.y,b.z),S.set(U,A,X).normalize(),h.push(S.x,S.y,S.z),p.push(B,1-C),w.push(_++)}x.push(w)}for(let v=0;v<r;v++)for(let w=0;w<s;w++){let C=x[w][v],L=x[w+1][v],O=x[w+1][v+1],B=x[w][v+1];(e>0||w!==0)&&(u.push(C,L,B),M+=3),(t>0||w!==s-1)&&(u.push(L,O,B),M+=3)}c.addGroup(f,M,0),f+=M}function P(S){let b=_,M=new Pe,A=new z,v=0,w=S===!0?e:t,C=S===!0?1:-1;for(let O=1;O<=r;O++)d.push(0,m*C,0),h.push(0,C,0),p.push(.5,.5),_++;let L=_;for(let O=0;O<=r;O++){let R=O/r*l+o,U=Math.cos(R),X=Math.sin(R);A.x=w*X,A.y=m*C,A.z=w*U,d.push(A.x,A.y,A.z),h.push(0,C,0),M.x=U*.5+.5,M.y=X*.5*C+.5,p.push(M.x,M.y),_++}for(let O=0;O<r;O++){let B=b+O,R=L+O;S===!0?u.push(R,R+1,B):u.push(R+1,R,B),v+=3}c.addGroup(f,v,S===!0?1:2),f+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var gi=class n extends Jt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};let s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,u=l+1,d=e/o,h=t/l,p=[],_=[],x=[],m=[];for(let f=0;f<u;f++){let T=f*h-a;for(let P=0;P<c;P++){let S=P*d-s;_.push(S,-T,0),x.push(0,0,1),m.push(P/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let T=0;T<o;T++){let P=T+c*f,S=T+c*(f+1),b=T+1+c*(f+1),M=T+1+c*f;p.push(P,S,M),p.push(S,b,M)}this.setIndex(p),this.setAttribute("position",new Mt(_,3)),this.setAttribute("normal",new Mt(x,3)),this.setAttribute("uv",new Mt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}};var ps=class n extends Jt{constructor(e=1,t=.4,i=12,r=48,s=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:r,arc:s,thetaStart:a,thetaLength:o},i=Math.floor(i),r=Math.floor(r);let l=[],c=[],u=[],d=[],h=new z,p=new z,_=new z;for(let x=0;x<=i;x++){let m=a+x/i*o;for(let f=0;f<=r;f++){let T=f/r*s;p.x=(e+t*Math.cos(m))*Math.cos(T),p.y=(e+t*Math.cos(m))*Math.sin(T),p.z=t*Math.sin(m),c.push(p.x,p.y,p.z),h.x=e*Math.cos(T),h.y=e*Math.sin(T),_.subVectors(p,h).normalize(),u.push(_.x,_.y,_.z),d.push(f/r),d.push(x/i)}}for(let x=1;x<=i;x++)for(let m=1;m<=r;m++){let f=(r+1)*x+m-1,T=(r+1)*(x-1)+m-1,P=(r+1)*(x-1)+m,S=(r+1)*x+m;l.push(f,T,S),l.push(T,P,S)}this.setIndex(l),this.setAttribute("position",new Mt(c,3)),this.setAttribute("normal",new Mt(u,3)),this.setAttribute("uv",new Mt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};function ki(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let r=n[t][i];if(Qh(r))r.isRenderTargetTexture?(Le("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(Qh(r[0])){let s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function Gt(n){let e={};for(let t=0;t<n.length;t++){let i=ki(n[t]);for(let r in i)e[r]=i[r]}return e}function Qh(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function u_(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Gc(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:qe.workingColorSpace}var $n={clone:ki,merge:Gt},h_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,d_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,xt=class extends pi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=h_,this.fragmentShader=d_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ki(e.uniforms),this.uniformsGroups=u_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new De().setHex(r.value);break;case"v2":this.uniforms[i].value=new Pe().fromArray(r.value);break;case"v3":this.uniforms[i].value=new z().fromArray(r.value);break;case"v4":this.uniforms[i].value=new rt().fromArray(r.value);break;case"m3":this.uniforms[i].value=new Fe().fromArray(r.value);break;case"m4":this.uniforms[i].value=new yt().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Tr=class extends xt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},ms=class extends pi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new De(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new De(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=$o,this.normalScale=new Pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Jn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var Ja=class extends pi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Cd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ka=class extends pi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function fr(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function gc(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var _i=class{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,r=t[i],s=t[i-1];n:{e:{let a;t:{i:if(!(e<r)){for(let o=i+2;;){if(r===void 0){if(e<s)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(s=r,r=t[++i],e<r)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(i=2,s=o);for(let l=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(r=s,s=t[--i-1],e>=s)break e}a=i,i=0;break t}break n}for(;i<a;){let o=i+a>>>1;e<t[o]?a=o:i=o+1}if(r=t[i],s=t[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,r)}return this.interpolate_(i,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r;for(let a=0;a!==r;++a)t[a]=i[s+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},$a=class extends _i{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:yc,endingEnd:yc}}intervalChanged_(e,t,i){let r=this.parameterPositions,s=e-2,a=e+1,o=r[s],l=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case xc:s=e,o=2*t-i;break;case bc:s=r.length-2,o=t+r[s]-r[s+1];break;default:s=e,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case xc:a=e,l=2*i-t;break;case bc:a=1,l=i+r[1]-r[0];break;default:a=e-1,l=t}let c=(i-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-i),this._offsetPrev=s*u,this._offsetNext=a*u}interpolate_(e,t,i,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,p=this._weightNext,_=(i-t)/(r-t),x=_*_,m=x*_,f=-h*m+2*h*x-h*_,T=(1+h)*m+(-1.5-2*h)*x+(-.5+h)*_+1,P=(-1-p)*m+(1.5+p)*x+.5*_,S=p*m-p*x;for(let b=0;b!==o;++b)s[b]=f*a[u+b]+T*a[c+b]+P*a[l+b]+S*a[d+b];return s}},Qa=class extends _i{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(i-t)/(r-t),d=1-u;for(let h=0;h!==o;++h)s[h]=a[c+h]*d+a[l+h]*u;return s}},eo=class extends _i{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},to=class extends _i{interpolate_(e,t,i,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this.inTangents,d=this.outTangents;if(!u||!d){let _=(i-t)/(r-t),x=1-_;for(let m=0;m!==o;++m)s[m]=a[c+m]*x+a[l+m]*_;return s}let h=o*2,p=e-1;for(let _=0;_!==o;++_){let x=a[c+_],m=a[l+_],f=p*h+_*2,T=d[f],P=d[f+1],S=e*h+_*2,b=u[S],M=u[S+1],A=p_(i,t,T,b,r);s[_]=Hd(A,x,P,M,m)}return s}};function Hd(n,e,t,i,r){let s=1-n;return s*s*s*e+3*s*s*n*t+3*s*n*n*i+n*n*n*r}function f_(n,e,t,i,r){let s=1-n;return 3*s*s*(t-e)+6*s*n*(i-t)+3*n*n*(r-i)}function p_(n,e,t,i,r){let s=(n-e)/(r-e);for(let a=0;a<8;a++){let o=Hd(s,e,t,i,r)-n;if(Math.abs(o)<1e-10)break;let l=f_(s,e,t,i,r);if(Math.abs(l)<1e-10)break;s=Math.max(0,Math.min(1,s-o/l))}return s}var sn=class{constructor(e,t,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=fr(t,this.TimeBufferType),this.values=fr(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:fr(e.times,Array),values:fr(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r),gc(e.settings)&&(i.settings={inTangents:fr(e.settings.inTangents,Array),outTangents:fr(e.settings.outTangents,Array)})}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new eo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Qa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new $a(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new to(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case ns:t=this.InterpolantFactoryMethodDiscrete;break;case Ga:t=this.InterpolantFactoryMethodLinear;break;case Ia:t=this.InterpolantFactoryMethodSmooth;break;case vc:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Le("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ns;case this.InterpolantFactoryMethodLinear:return Ga;case this.InterpolantFactoryMethodSmooth:return Ia;case this.InterpolantFactoryMethodBezier:return vc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e;gc(this.settings)&&(ed(this.settings.inTangents,e),ed(this.settings.outTangents,e))}return this}trim(e,t){let i=this.times,r=i.length,s=0,a=r-1;for(;s!==r&&i[s]<e;)++s;for(;a!==-1&&i[a]>t;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=i.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Oe("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,s=i.length;s===0&&(Oe("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){Oe("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Oe("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(r!==void 0&&Wg(r))for(let o=0,l=r.length;o!==l;++o){let c=r[o];if(isNaN(c)){Oe("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===Ia,s=e.length-1,a=1;for(let o=1;o<s;++o){let l=!1,c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(r)l=!0;else{let d=o*i,h=d-i,p=d+i;for(let _=0;_!==i;++_){let x=t[d+_];if(x!==t[h+_]||x!==t[p+_]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let d=o*i,h=a*i;for(let p=0;p!==i;++p)t[h+p]=t[d+p]}++a}}if(s>0){e[a]=e[s];for(let o=s*i,l=a*i,c=0;c!==i;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,gc(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function ed(n,e){for(let t=0,i=n.length;t!==i;t+=2)n[t]*=e}sn.prototype.ValueTypeName="";sn.prototype.TimeBufferType=Float32Array;sn.prototype.ValueBufferType=Float32Array;sn.prototype.DefaultInterpolation=Ga;var vi=class extends sn{constructor(e,t,i){super(e,t,i)}};vi.prototype.ValueTypeName="bool";vi.prototype.ValueBufferType=Array;vi.prototype.DefaultInterpolation=ns;vi.prototype.InterpolantFactoryMethodLinear=void 0;vi.prototype.InterpolantFactoryMethodSmooth=void 0;var no=class extends sn{constructor(e,t,i,r){super(e,t,i,r)}};no.prototype.ValueTypeName="color";var io=class extends sn{constructor(e,t,i,r){super(e,t,i,r)}};io.prototype.ValueTypeName="number";var ro=class extends _i{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-t)/(r-t),c=e*o;for(let u=c+o;c!==u;c+=4)Un.slerpFlat(s,0,a,c-o,a,c,l);return s}},gs=class extends sn{constructor(e,t,i,r){super(e,t,i,r)}InterpolantFactoryMethodLinear(e){return new ro(this.times,this.values,this.getValueSize(),e)}};gs.prototype.ValueTypeName="quaternion";gs.prototype.InterpolantFactoryMethodSmooth=void 0;var yi=class extends sn{constructor(e,t,i){super(e,t,i)}};yi.prototype.ValueTypeName="string";yi.prototype.ValueBufferType=Array;yi.prototype.DefaultInterpolation=ns;yi.prototype.InterpolantFactoryMethodLinear=void 0;yi.prototype.InterpolantFactoryMethodSmooth=void 0;var so=class extends sn{constructor(e,t,i,r){super(e,t,i,r)}};so.prototype.ValueTypeName="vector";var ao=class{constructor(e,t,i){let r=this,s=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(u){o++,s===!1&&r.onStart!==void 0&&r.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,r.onProgress!==void 0&&r.onProgress(u,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){let d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=c.length;d<h;d+=2){let p=c[d],_=c[d+1];if(p.global&&(p.lastIndex=0),p.test(u))return _}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Wd=new ao,oo=class{constructor(e){this.manager=e!==void 0?e:Wd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(r,s){i.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};oo.DEFAULT_MATERIAL_NAME="__DEFAULT";var _s=class extends Zt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new De(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},vs=class extends _s{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Zt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new De(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},_c=new yt,td=new z,nd=new z,lo=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Pe(512,512),this.mapType=Kt,this.map=null,this.mapPass=null,this.matrix=new yt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Mr,this._frameExtents=new Pe(1,1),this._viewportCount=1,this._viewports=[new rt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;td.setFromMatrixPosition(e.matrixWorld),t.position.copy(td),nd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(nd),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,r){_c.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(_c,e.coordinateSystem,e.reversedDepth);let s=this._frameExtents,a=r?r.z/s.x:1,o=r?r.w/s.y:1,l=r?r.x/s.x:0,c=r?r.y/s.y:0;e.coordinateSystem===vr||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(_c)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Pa=new z,Ra=new Un,Dn=new z,ys=class extends Zt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new yt,this.projectionMatrix=new yt,this.projectionMatrixInverse=new yt,this.coordinateSystem=Mn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Pa,Ra,Dn),Dn.x===1&&Dn.y===1&&Dn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Pa,Ra,Dn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Pa,Ra,Dn),Dn.x===1&&Dn.y===1&&Dn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Pa,Ra,Dn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},hi=new z,id=new Pe,rd=new Pe,Ot=class extends ys{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Ha*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Zl*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ha*2*Math.atan(Math.tan(Zl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){hi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(hi.x,hi.y).multiplyScalar(-e/hi.z),hi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(hi.x,hi.y).multiplyScalar(-e/hi.z)}getViewSize(e,t){return this.getViewBounds(e,id,rd),t.subVectors(rd,id)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Zl*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Sc=class extends lo{constructor(){super(new Ot(90,1,.5,500)),this.isPointLightShadow=!0}},Ui=class extends _s{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new Sc}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Fi=class extends ys{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var pr=-90,mr=1,co=class extends Zt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Ot(pr,mr,e,t);r.layers=this.layers,this.add(r);let s=new Ot(pr,mr,e,t);s.layers=this.layers,this.add(s);let a=new Ot(pr,mr,e,t);a.layers=this.layers,this.add(a);let o=new Ot(pr,mr,e,t);o.layers=this.layers,this.add(o);let l=new Ot(pr,mr,e,t);l.layers=this.layers,this.add(l);let c=new Ot(pr,mr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(let c of t)this.remove(c);if(e===Mn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===vr)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;let x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,h,p),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}},uo=class extends Ot{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},xs=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=m_.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function m_(){this._document.hidden===!1&&this.reset()}var Hc="\\[\\]\\.:\\/",g_=new RegExp("["+Hc+"]","g"),Wc="[^"+Hc+"]",__="[^"+Hc.replace("\\.","")+"]",v_=/((?:WC+[\/:])*)/.source.replace("WC",Wc),y_=/(WCOD+)?/.source.replace("WCOD",__),x_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Wc),b_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Wc),S_=new RegExp("^"+v_+y_+x_+b_+"$"),M_=["material","materials","bones","map"],Mc=class{constructor(e,t,i){let r=i||gt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=i.length;r!==s;++r)i[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},gt=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(g_,"")}static parseTrackName(e){let t=S_.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=i.nodeName&&i.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=i.nodeName.substring(r+1);M_.indexOf(s)!==-1&&(i.nodeName=i.nodeName.substring(0,r),i.objectName=s)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let l=i(o.children);if(l)return l}return null},r=i(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)e[t++]=i[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Le("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){Oe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Oe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Oe("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Oe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Oe("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){Oe("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){Oe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[r];if(a===void 0){let c=t.nodeName;Oe("PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){Oe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Oe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};gt.Composite=Mc;gt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};gt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};gt.prototype.GetterByBindingType=[gt.prototype._getValue_direct,gt.prototype._getValue_array,gt.prototype._getValue_arrayElement,gt.prototype._getValue_toArray];gt.prototype.SetterByBindingTypeAndVersioning=[[gt.prototype._setValue_direct,gt.prototype._setValue_direct_setNeedsUpdate,gt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[gt.prototype._setValue_array,gt.prototype._setValue_array_setNeedsUpdate,gt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[gt.prototype._setValue_arrayElement,gt.prototype._setValue_arrayElement_setNeedsUpdate,gt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[gt.prototype._setValue_fromArray,gt.prototype._setValue_fromArray_setNeedsUpdate,gt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var A2=new Float32Array(1);var wc=class n{static{n.prototype.isMatrix2=!0}constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){let s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}};function qc(n,e,t,i){let r=w_(i);switch(t){case Uc:return n*e;case Bc:return n*e/r.components*r.byteLength;case yo:return n*e/r.components*r.byteLength;case Ti:return n*e*2/r.components*r.byteLength;case xo:return n*e*2/r.components*r.byteLength;case Fc:return n*e*3/r.components*r.byteLength;case gn:return n*e*4/r.components*r.byteLength;case bo:return n*e*4/r.components*r.byteLength;case Is:case Ds:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ls:case Ns:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Mo:case To:return Math.max(n,16)*Math.max(e,8)/4;case So:case wo:return Math.max(n,8)*Math.max(e,8)/2;case Eo:case Ao:case Po:case Ro:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Co:case Os:case Io:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Do:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Lo:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case No:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Oo:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Uo:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Fo:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Bo:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case zo:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Vo:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case ko:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Go:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Ho:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Wo:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case qo:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Xo:case jo:case Yo:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Zo:case Jo:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Us:case Ko:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function w_(n){switch(n){case Kt:case Dc:return{byteLength:1,components:1};case Ar:case Lc:case Bt:return{byteLength:2,components:1};case _o:case vo:return{byteLength:2,components:4};case Tn:case go:case En:return{byteLength:4,components:1};case Nc:case Oc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Le("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function ff(){let n=null,e=!1,t=null,i=null;function r(s,a){i=n.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function E_(n){let e=new WeakMap;function t(o,l){let c=o.array,u=o.usage,d=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),o.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){let u=l.array,d=l.updateRanges;if(n.bindBuffer(c,o),d.length===0)n.bufferSubData(c,0,u);else{d.sort((p,_)=>p.start-_.start);let h=0;for(let p=1;p<d.length;p++){let _=d[h],x=d[p];x.start<=_.start+_.count+1?_.count=Math.max(_.count,x.start+x.count-_.start):(++h,d[h]=x)}d.length=h+1;for(let p=0,_=d.length;p<_;p++){let x=d[p];n.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var A_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,C_=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,P_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,R_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,I_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,D_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,L_=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT )
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN )
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,N_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,O_=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,U_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,F_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,B_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,z_=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,V_=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,k_=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,G_=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,H_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,W_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,q_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,X_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,j_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Y_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Z_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,J_=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,K_=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,$_=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Q_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,e0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,t0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,n0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,i0="gl_FragColor = linearToOutputTexel( gl_FragColor );",r0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,s0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,a0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,o0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,l0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS

		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,c0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,u0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,h0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,d0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,f0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,p0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,m0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,g0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,_0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,v0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,y0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,x0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,b0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,S0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,M0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,w0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,T0=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN

		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );

		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );

		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );

		irradiance *= sheenEnergyComp;

	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,E0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,A0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,C0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,P0=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,R0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,I0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,D0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,L0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,N0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,O0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,U0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,F0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,B0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,z0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,V0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,k0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,G0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,H0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,W0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,q0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,X0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,j0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Y0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Z0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,J0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,K0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,$0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Q0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ev=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,tv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,nv=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER

		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {

	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,iv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,rv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,sv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,av=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ov=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,lv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,cv=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif

				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,uv=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,hv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,dv=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,fv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,pv=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,mv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,gv=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,_v=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,vv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,yv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,xv=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,bv=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Sv=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Mv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,wv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Tv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Ev=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Av=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Cv=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Rv=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Iv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Dv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Nv=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Ov=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Uv=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Fv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Bv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zv=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Vv=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,kv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Gv=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hv=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Wv=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qv=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Xv=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jv=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Yv=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Zv=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Jv=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kv=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,$v=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN

		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;

	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qv=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ey=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ty=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,ny=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,iy=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ry=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sy=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ay=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ge={alphahash_fragment:A_,alphahash_pars_fragment:C_,alphamap_fragment:P_,alphamap_pars_fragment:R_,alphatest_fragment:I_,alphatest_pars_fragment:D_,aomap_fragment:L_,aomap_pars_fragment:N_,batching_pars_vertex:O_,batching_vertex:U_,begin_vertex:F_,beginnormal_vertex:B_,bsdfs:z_,iridescence_fragment:V_,bumpmap_pars_fragment:k_,clipping_planes_fragment:G_,clipping_planes_pars_fragment:H_,clipping_planes_pars_vertex:W_,clipping_planes_vertex:q_,color_fragment:X_,color_pars_fragment:j_,color_pars_vertex:Y_,color_vertex:Z_,common:J_,cube_uv_reflection_fragment:K_,defaultnormal_vertex:$_,displacementmap_pars_vertex:Q_,displacementmap_vertex:e0,emissivemap_fragment:t0,emissivemap_pars_fragment:n0,colorspace_fragment:i0,colorspace_pars_fragment:r0,envmap_fragment:s0,envmap_common_pars_fragment:a0,envmap_pars_fragment:o0,envmap_pars_vertex:l0,envmap_physical_pars_fragment:y0,envmap_vertex:c0,fog_vertex:u0,fog_pars_vertex:h0,fog_fragment:d0,fog_pars_fragment:f0,gradientmap_pars_fragment:p0,lightmap_pars_fragment:m0,lights_lambert_fragment:g0,lights_lambert_pars_fragment:_0,lights_pars_begin:v0,lights_toon_fragment:x0,lights_toon_pars_fragment:b0,lights_phong_fragment:S0,lights_phong_pars_fragment:M0,lights_physical_fragment:w0,lights_physical_pars_fragment:T0,lights_fragment_begin:E0,lights_fragment_maps:A0,lights_fragment_end:C0,lightprobes_pars_fragment:P0,logdepthbuf_fragment:R0,logdepthbuf_pars_fragment:I0,logdepthbuf_pars_vertex:D0,logdepthbuf_vertex:L0,map_fragment:N0,map_pars_fragment:O0,map_particle_fragment:U0,map_particle_pars_fragment:F0,metalnessmap_fragment:B0,metalnessmap_pars_fragment:z0,morphinstance_vertex:V0,morphcolor_vertex:k0,morphnormal_vertex:G0,morphtarget_pars_vertex:H0,morphtarget_vertex:W0,normal_fragment_begin:q0,normal_fragment_maps:X0,normal_pars_fragment:j0,normal_pars_vertex:Y0,normal_vertex:Z0,normalmap_pars_fragment:J0,clearcoat_normal_fragment_begin:K0,clearcoat_normal_fragment_maps:$0,clearcoat_pars_fragment:Q0,iridescence_pars_fragment:ev,opaque_fragment:tv,packing:nv,premultiplied_alpha_fragment:iv,project_vertex:rv,dithering_fragment:sv,dithering_pars_fragment:av,roughnessmap_fragment:ov,roughnessmap_pars_fragment:lv,shadowmap_pars_fragment:cv,shadowmap_pars_vertex:uv,shadowmap_vertex:hv,shadowmask_pars_fragment:dv,skinbase_vertex:fv,skinning_pars_vertex:pv,skinning_vertex:mv,skinnormal_vertex:gv,specularmap_fragment:_v,specularmap_pars_fragment:vv,tonemapping_fragment:yv,tonemapping_pars_fragment:xv,transmission_fragment:bv,transmission_pars_fragment:Sv,uv_pars_fragment:Mv,uv_pars_vertex:wv,uv_vertex:Tv,worldpos_vertex:Ev,background_vert:Av,background_frag:Cv,backgroundCube_vert:Pv,backgroundCube_frag:Rv,cube_vert:Iv,cube_frag:Dv,depth_vert:Lv,depth_frag:Nv,distance_vert:Ov,distance_frag:Uv,equirect_vert:Fv,equirect_frag:Bv,linedashed_vert:zv,linedashed_frag:Vv,meshbasic_vert:kv,meshbasic_frag:Gv,meshlambert_vert:Hv,meshlambert_frag:Wv,meshmatcap_vert:qv,meshmatcap_frag:Xv,meshnormal_vert:jv,meshnormal_frag:Yv,meshphong_vert:Zv,meshphong_frag:Jv,meshphysical_vert:Kv,meshphysical_frag:$v,meshtoon_vert:Qv,meshtoon_frag:ey,points_vert:ty,points_frag:ny,shadow_vert:iy,shadow_frag:ry,sprite_vert:sy,sprite_frag:ay},de={common:{diffuse:{value:new De(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Fe}},envmap:{envMap:{value:null},envMapRotation:{value:new Fe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Fe},normalScale:{value:new Pe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new De(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new z},probesMax:{value:new z},probesResolution:{value:new z}},points:{diffuse:{value:new De(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0},uvTransform:{value:new Fe}},sprite:{diffuse:{value:new De(16777215)},opacity:{value:1},center:{value:new Pe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}}},zn={basic:{uniforms:Gt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:Gt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new De(0)},envMapIntensity:{value:1}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:Gt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new De(0)},specular:{value:new De(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:Gt([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new De(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:Gt([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new De(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:Gt([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:Gt([de.points,de.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:Gt([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:Gt([de.common,de.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:Gt([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:Gt([de.sprite,de.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new Fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Fe}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distance:{uniforms:Gt([de.common,de.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distance_vert,fragmentShader:Ge.distance_frag},shadow:{uniforms:Gt([de.lights,de.fog,{color:{value:new De(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};zn.physical={uniforms:Gt([zn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Fe},clearcoatNormalScale:{value:new Pe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Fe},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Fe},sheen:{value:0},sheenColor:{value:new De(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Fe},transmissionSamplerSize:{value:new Pe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Fe},attenuationDistance:{value:0},attenuationColor:{value:new De(0)},specularColor:{value:new De(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Fe},anisotropyVector:{value:new Pe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Fe}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};var tl={r:0,b:0,g:0},oy=new yt,pf=new Fe;pf.set(-1,0,0,0,1,0,0,0,1);function ly(n,e,t,i,r,s){let a=new De(0),o=r===!0?0:1,l,c,u=null,d=0,h=null;function p(T){let P=T.isScene===!0?T.background:null;if(P&&P.isTexture){let S=T.backgroundBlurriness>0;P=e.get(P,S)}return P}function _(T){let P=!1,S=p(T);S===null?m(a,o):S&&S.isColor&&(m(S,1),P=!0);let b=n.xr.getEnvironmentBlendMode();b==="additive"?t.buffers.color.setClear(0,0,0,1,s):b==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||P)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function x(T,P){let S=p(P);S&&(S.isCubeTexture||S.mapping===Ps)?(c===void 0&&(c=new Ft(new rn(1,1,1),new xt({name:"BackgroundCubeMaterial",uniforms:ki(zn.backgroundCube.uniforms),vertexShader:zn.backgroundCube.vertexShader,fragmentShader:zn.backgroundCube.fragmentShader,side:Xt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(b,M,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=S,c.material.uniforms.backgroundBlurriness.value=P.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=P.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(oy.makeRotationFromEuler(P.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(pf),c.material.toneMapped=qe.getTransfer(S.colorSpace)!==Ke,(u!==S||d!==S.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,u=S,d=S.version,h=n.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new Ft(new gi(2,2),new xt({name:"BackgroundMaterial",uniforms:ki(zn.background.uniforms),vertexShader:zn.background.vertexShader,fragmentShader:zn.background.fragmentShader,side:xi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=P.backgroundIntensity,l.material.toneMapped=qe.getTransfer(S.colorSpace)!==Ke,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||d!==S.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,u=S,d=S.version,h=n.toneMapping),l.layers.enableAll(),T.unshift(l,l.geometry,l.material,0,0,null))}function m(T,P){T.getRGB(tl,Gc(n)),t.buffers.color.setClear(tl.r,tl.g,tl.b,P,s)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(T,P=1){a.set(T),o=P,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(T){o=T,m(a,o)},render:_,addToRenderList:x,dispose:f}}function cy(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=h(null),s=r,a=!1;function o(L,O,B,R,U){let X=!1,G=d(L,R,B,O);s!==G&&(s=G,c(s.object)),X=p(L,R,B,U),X&&_(L,R,B,U),U!==null&&e.update(U,n.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,S(L,O,B,R),U!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function l(){return n.createVertexArray()}function c(L){return n.bindVertexArray(L)}function u(L){return n.deleteVertexArray(L)}function d(L,O,B,R){let U=R.wireframe===!0,X=i[O.id];X===void 0&&(X={},i[O.id]=X);let G=L.isInstancedMesh===!0?L.id:0,te=X[G];te===void 0&&(te={},X[G]=te);let W=te[B.id];W===void 0&&(W={},te[B.id]=W);let ee=W[U];return ee===void 0&&(ee=h(l()),W[U]=ee),ee}function h(L){let O=[],B=[],R=[];for(let U=0;U<t;U++)O[U]=0,B[U]=0,R[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:B,attributeDivisors:R,object:L,attributes:{},index:null}}function p(L,O,B,R){let U=s.attributes,X=O.attributes,G=0,te=B.getAttributes();for(let W in te)if(te[W].location>=0){let Z=U[W],pe=X[W];if(pe===void 0&&(W==="instanceMatrix"&&L.instanceMatrix&&(pe=L.instanceMatrix),W==="instanceColor"&&L.instanceColor&&(pe=L.instanceColor)),Z===void 0||Z.attribute!==pe||pe&&Z.data!==pe.data)return!0;G++}return s.attributesNum!==G||s.index!==R}function _(L,O,B,R){let U={},X=O.attributes,G=0,te=B.getAttributes();for(let W in te)if(te[W].location>=0){let Z=X[W];Z===void 0&&(W==="instanceMatrix"&&L.instanceMatrix&&(Z=L.instanceMatrix),W==="instanceColor"&&L.instanceColor&&(Z=L.instanceColor));let pe={};pe.attribute=Z,Z&&Z.data&&(pe.data=Z.data),U[W]=pe,G++}s.attributes=U,s.attributesNum=G,s.index=R}function x(){let L=s.newAttributes;for(let O=0,B=L.length;O<B;O++)L[O]=0}function m(L){f(L,0)}function f(L,O){let B=s.newAttributes,R=s.enabledAttributes,U=s.attributeDivisors;B[L]=1,R[L]===0&&(n.enableVertexAttribArray(L),R[L]=1),U[L]!==O&&(n.vertexAttribDivisor(L,O),U[L]=O)}function T(){let L=s.newAttributes,O=s.enabledAttributes;for(let B=0,R=O.length;B<R;B++)O[B]!==L[B]&&(n.disableVertexAttribArray(B),O[B]=0)}function P(L,O,B,R,U,X,G){G===!0?n.vertexAttribIPointer(L,O,B,U,X):n.vertexAttribPointer(L,O,B,R,U,X)}function S(L,O,B,R){x();let U=R.attributes,X=B.getAttributes(),G=O.defaultAttributeValues;for(let te in X){let W=X[te];if(W.location>=0){let ee=U[te];if(ee===void 0&&(te==="instanceMatrix"&&L.instanceMatrix&&(ee=L.instanceMatrix),te==="instanceColor"&&L.instanceColor&&(ee=L.instanceColor)),ee!==void 0){let Z=ee.normalized,pe=ee.itemSize,ie=e.get(ee);if(ie===void 0)continue;let Ne=ie.buffer,be=ie.type,ze=ie.bytesPerElement,j=be===n.INT||be===n.UNSIGNED_INT||ee.gpuType===go;if(ee.isInterleavedBufferAttribute){let K=ee.data,ue=K.stride,Ue=ee.offset;if(K.isInstancedInterleavedBuffer){for(let _e=0;_e<W.locationSize;_e++)f(W.location+_e,K.meshPerAttribute);L.isInstancedMesh!==!0&&R._maxInstanceCount===void 0&&(R._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let _e=0;_e<W.locationSize;_e++)m(W.location+_e);n.bindBuffer(n.ARRAY_BUFFER,Ne);for(let _e=0;_e<W.locationSize;_e++)P(W.location+_e,pe/W.locationSize,be,Z,ue*ze,(Ue+pe/W.locationSize*_e)*ze,j)}else{if(ee.isInstancedBufferAttribute){for(let K=0;K<W.locationSize;K++)f(W.location+K,ee.meshPerAttribute);L.isInstancedMesh!==!0&&R._maxInstanceCount===void 0&&(R._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let K=0;K<W.locationSize;K++)m(W.location+K);n.bindBuffer(n.ARRAY_BUFFER,Ne);for(let K=0;K<W.locationSize;K++)P(W.location+K,pe/W.locationSize,be,Z,pe*ze,pe/W.locationSize*K*ze,j)}}else if(G!==void 0){let Z=G[te];if(Z!==void 0)switch(Z.length){case 2:n.vertexAttrib2fv(W.location,Z);break;case 3:n.vertexAttrib3fv(W.location,Z);break;case 4:n.vertexAttrib4fv(W.location,Z);break;default:n.vertexAttrib1fv(W.location,Z)}}}}T()}function b(){w();for(let L in i){let O=i[L];for(let B in O){let R=O[B];for(let U in R){let X=R[U];for(let G in X)u(X[G].object),delete X[G];delete R[U]}}delete i[L]}}function M(L){if(i[L.id]===void 0)return;let O=i[L.id];for(let B in O){let R=O[B];for(let U in R){let X=R[U];for(let G in X)u(X[G].object),delete X[G];delete R[U]}}delete i[L.id]}function A(L){for(let O in i){let B=i[O];for(let R in B){let U=B[R];if(U[L.id]===void 0)continue;let X=U[L.id];for(let G in X)u(X[G].object),delete X[G];delete U[L.id]}}}function v(L){for(let O in i){let B=i[O],R=L.isInstancedMesh===!0?L.id:0,U=B[R];if(U!==void 0){for(let X in U){let G=U[X];for(let te in G)u(G[te].object),delete G[te];delete U[X]}delete B[R],Object.keys(B).length===0&&delete i[O]}}}function w(){C(),a=!0,s!==r&&(s=r,c(s.object))}function C(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:w,resetDefaultState:C,dispose:b,releaseStatesOfGeometry:M,releaseStatesOfObject:v,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:m,disableUnusedAttributes:T}}function uy(n,e,t){let i;function r(l){i=l}function s(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),t.update(c,i,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let h=0;for(let p=0;p<u;p++)h+=c[p];t.update(h,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function hy(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let A=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(A){return!(A!==gn&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){let v=A===Bt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Kt&&A!==En&&!v&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function l(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(Le("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&Le("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),T=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),P=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),b=n.getParameter(n.MAX_SAMPLES),M=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:_,maxTextureSize:x,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:T,maxVaryings:P,maxFragmentUniforms:S,maxSamples:b,samples:M}}function dy(n){let e=this,t=null,i=0,r=!1,s=!1,a=new Sn,o=new Fe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){let p=d.length!==0||h||i!==0||r;return r=h,i=d.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,p){let _=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,f=n.get(d);if(!r||_===null||_.length===0||s&&!m)s?u(null):c();else{let T=s?0:i,P=T*4,S=f.clippingState||null;l.value=S,S=u(_,h,P,p);for(let b=0;b!==P;++b)S[b]=t[b];f.clippingState=S,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,h,p,_){let x=d!==null?d.length:0,m=null;if(x!==0){if(m=l.value,_!==!0||m===null){let f=p+x*4,T=h.matrixWorldInverse;o.getNormalMatrix(T),(m===null||m.length<f)&&(m=new Float32Array(f));for(let P=0,S=p;P!==x;++P,S+=4)a.copy(d[P]).applyMatrix4(T,o),a.normal.toArray(m,S),m[S+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}var Rr=4,fy=6,py=20,my=256,Bs=new Fi,qd=new De,Xc=null,jc=0,Yc=0,Zc=!1,gy=new z,Gi=new z,il=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){let{size:a=256,position:o=gy}=s;Xc=this._renderer.getRenderTarget(),jc=this._renderer.getActiveCubeFace(),Yc=this._renderer.getActiveMipmapLevel(),Zc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Yd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=jd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Xc,jc,Yc),this._renderer.xr.enabled=Zc,e.scissorTest=!1,Pr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Si||e.mapping===Vi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Xc=this._renderer.getRenderTarget(),jc=this._renderer.getActiveCubeFace(),Yc=this._renderer.getActiveMipmapLevel(),Zc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Ut,minFilter:Ut,generateMipmaps:!1,type:Bt,format:gn,colorSpace:is,depthBuffer:!1},r=Xd(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Xd(e,t,i);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=_y(s)),this._blurMaterial=yy(s,e,t),this._ggxMaterial=vy(s,e,t)}return r}_compileMaterial(e){let t=new Ft(new Jt,e);this._renderer.compile(t,Bs)}_sceneToCubeUV(e,t,i,r,s){let l=new Ot(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,p=d.toneMapping;d.getClearColor(qd),d.toneMapping=wn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ft(new rn,new Oi({name:"PMREM.Background",side:Xt,depthWrite:!1,depthTest:!1})));let x=this._backgroundBox,m=x.material,f=!1,T=e.background;T?T.isColor&&(m.color.copy(T),e.background=null,f=!0):(m.color.copy(qd),f=!0);for(let P=0;P<6;P++){let S=P%3;S===0?(l.up.set(0,c[P],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[P],s.y,s.z)):S===1?(l.up.set(0,0,c[P]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[P],s.z)):(l.up.set(0,c[P],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[P]));let b=this._cubeSize;Pr(r,S*b,P>2?b:0,b,b),d.setRenderTarget(r),f&&d.render(x,l),d.render(e,l)}d.toneMapping=p,d.autoClear=h,e.background=T}_textureToCubeUV(e,t){let i=this._renderer,r=e.mapping===Si||e.mapping===Vi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Yd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=jd());let s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;let o=s.uniforms;o.envMap.value=e;let l=this._cubeSize;Pr(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Bs)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){let r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;let l=a.uniforms,c=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-u*u),h=c*1.25,p=d*h,{_lodMax:_}=this,x=this._sizeLods[i],m=3*x*(i>_-Rr?i-_+Rr:0),f=4*(this._cubeSize-x);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=_-t,Pr(s,m,f,3*x,2*x),r.setRenderTarget(s),r.render(o,Bs),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=_-i,Pr(e,m,f,3*x,2*x),r.setRenderTarget(e),r.render(o,Bs)}_blur(e,t,i,r){let s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,i,a),this._blurPass(s,e,i,i,a)}_blurPass(e,t,i,r,s){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[r];l.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=s,c.mipInt.value=this._lodMax-i;let u=this._sizeLods[r],d=3*u*(r>this._lodMax-Rr?r-this._lodMax+Rr:0),h=4*(this._cubeSize-u);Pr(t,d,h,3*u,2*u),a.setRenderTarget(t),a.render(l,Bs)}};function _y(n){let e=[],t=[],i=n,r=n-Rr+1+fy;for(let s=0;s<r;s++){let a=Math.pow(2,i);e.push(a);let o=1/(a-2),l=-o,c=1+o,u=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,h=6,p=3,_=new Float32Array(p*h*d),x=new Float32Array(p*h*d);for(let f=0;f<d;f++){let T=f%3*2/3-1,P=f>2?0:-1,S=[T,P,0,T+2/3,P,0,T+2/3,P+1,0,T,P,0,T+2/3,P+1,0,T,P+1,0];_.set(S,p*h*f);for(let b=0;b<h;b++){let M=u[b*2]*2-1,A=u[b*2+1]*2-1;f===0?Gi.set(1,A,M):f===1?Gi.set(-M,1,-A):f===2?Gi.set(-M,A,1):f===3?Gi.set(-1,A,-M):f===4?Gi.set(-M,-1,A):Gi.set(M,A,-1),Gi.toArray(x,(f*h+b)*p)}}let m=new Jt;m.setAttribute("position",new pn(_,p)),m.setAttribute("outputDirection",new pn(x,p)),t.push(new Ft(m,null)),i>Rr&&i--}return{lodMeshes:t,sizeLods:e}}function Xd(n,e,t){let i=new At(n,e,t);return i.texture.mapping=Ps,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Pr(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function vy(n,e,t){return new xt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:my,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:al(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:mn,depthTest:!1,depthWrite:!1})}function yy(n,e,t){return new xt({name:"SphericalGaussianBlur",defines:{SAMPLES:py,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:al(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:mn,depthTest:!1,depthWrite:!1})}function jd(){return new xt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:al(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:mn,depthTest:!1,depthWrite:!1})}function Yd(){return new xt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:al(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:mn,depthTest:!1,depthWrite:!1})}function al(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var rl=class extends At{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new ds(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new rn(5,5,5),s=new xt({name:"CubemapFromEquirect",uniforms:ki(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Xt,blending:mn});s.uniforms.tEquirect.value=t;let a=new Ft(r,s),o=t.minFilter;return t.minFilter===Mi&&(t.minFilter=Ut),new co(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}};function xy(n){let e=new WeakMap,t=new WeakMap,i=null;function r(h,p=!1){return h==null?null:p?a(h):s(h)}function s(h){if(h&&h.isTexture){let p=h.mapping;if(p===fo||p===po)if(e.has(h)){let _=e.get(h).texture;return o(_,h.mapping)}else{let _=h.image;if(_&&_.height>0){let x=new rl(_.height);return x.fromEquirectangularTexture(n,h),e.set(h,x),h.addEventListener("dispose",c),o(x.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){let p=h.mapping,_=p===fo||p===po,x=p===Si||p===Vi;if(_||x){let m=t.get(h),f=m!==void 0?m.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==f)return i===null&&(i=new il(n)),m=_?i.fromEquirectangular(h,m):i.fromCubemap(h,m),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),m.texture;if(m!==void 0)return m.texture;{let T=h.image;return _&&T&&T.height>0||x&&T&&l(T)?(i===null&&(i=new il(n)),m=_?i.fromEquirectangular(h):i.fromCubemap(h),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),h.addEventListener("dispose",u),m.texture):null}}}return h}function o(h,p){return p===fo?h.mapping=Si:p===po&&(h.mapping=Vi),h}function l(h){let p=0,_=6;for(let x=0;x<_;x++)h[x]!==void 0&&p++;return p===_}function c(h){let p=h.target;p.removeEventListener("dispose",c);let _=e.get(p);_!==void 0&&(e.delete(p),_.dispose())}function u(h){let p=h.target;p.removeEventListener("dispose",u);let _=t.get(p);_!==void 0&&(t.delete(p),_.dispose())}function d(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:d}}function by(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let r=t(i);return r===null&&Ni("WebGLRenderer: "+i+" extension not supported."),r}}}function Sy(n,e,t,i){let r={},s=new WeakMap;function a(d){let h=d.target;h.index!==null&&e.remove(h.index);for(let _ in h.attributes)e.remove(h.attributes[_]);h.removeEventListener("dispose",a),delete r[h.id];let p=s.get(h);p&&(e.remove(p),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(d,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,t.memory.geometries++),h}function l(d){let h=d.attributes;for(let p in h)e.update(h[p],n.ARRAY_BUFFER)}function c(d){let h=[],p=d.index,_=d.attributes.position,x=0;if(_===void 0)return;if(p!==null){let T=p.array;x=p.version;for(let P=0,S=T.length;P<S;P+=3){let b=T[P+0],M=T[P+1],A=T[P+2];h.push(b,M,M,A,A,b)}}else{let T=_.array;x=_.version;for(let P=0,S=T.length/3-1;P<S;P+=3){let b=P+0,M=P+1,A=P+2;h.push(b,M,M,A,A,b)}}let m=new(_.count>=65535?hs:us)(h,1);m.version=x;let f=s.get(d);f&&e.remove(f),s.set(d,m)}function u(d){let h=s.get(d);if(h){let p=d.index;p!==null&&h.version<p.version&&c(d)}else c(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function My(n,e,t){let i;function r(d){i=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function l(d,h){n.drawElements(i,h,s,d*a),t.update(h,i,1)}function c(d,h,p){p!==0&&(n.drawElementsInstanced(i,h,s,d*a,p),t.update(h,i,p))}function u(d,h,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,s,d,0,p);let x=0;for(let m=0;m<p;m++)x+=h[m];t.update(x,i,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function wy(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:Oe("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function Ty(n,e,t){let i=new WeakMap,r=new rt;function s(a,o,l){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0,h=i.get(o);if(h===void 0||h.count!==d){let w=function(){A.dispose(),i.delete(o),o.removeEventListener("dispose",w)};h!==void 0&&h.texture.dispose();let p=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],T=o.morphAttributes.color||[],P=0;p===!0&&(P=1),_===!0&&(P=2),x===!0&&(P=3);let S=o.attributes.position.count*P,b=1;S>e.maxTextureSize&&(b=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);let M=new Float32Array(S*b*4*d),A=new as(M,S,b,d);A.type=En,A.needsUpdate=!0;let v=P*4;for(let C=0;C<d;C++){let L=m[C],O=f[C],B=T[C],R=S*b*4*C;for(let U=0;U<L.count;U++){let X=U*v;p===!0&&(r.fromBufferAttribute(L,U),M[R+X+0]=r.x,M[R+X+1]=r.y,M[R+X+2]=r.z,M[R+X+3]=0),_===!0&&(r.fromBufferAttribute(O,U),M[R+X+4]=r.x,M[R+X+5]=r.y,M[R+X+6]=r.z,M[R+X+7]=0),x===!0&&(r.fromBufferAttribute(B,U),M[R+X+8]=r.x,M[R+X+9]=r.y,M[R+X+10]=r.z,M[R+X+11]=B.itemSize===4?r.w:1)}}h={count:d,texture:A,size:new Pe(S,b)},i.set(o,h),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let p=0;for(let x=0;x<c.length;x++)p+=c[x];let _=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:s}}function Ey(n,e,t,i,r){let s=new WeakMap;function a(c){let u=r.render.frame,d=c.geometry,h=e.get(c,d);if(s.get(h)!==u&&(e.update(h),s.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){let p=c.skeleton;s.get(p)!==u&&(p.update(),s.set(p,u))}return h}function o(){s=new WeakMap}function l(c){let u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}var Ay={[Ms]:"LINEAR_TONE_MAPPING",[ws]:"REINHARD_TONE_MAPPING",[Ts]:"CINEON_TONE_MAPPING",[zi]:"ACES_FILMIC_TONE_MAPPING",[As]:"AGX_TONE_MAPPING",[Cs]:"NEUTRAL_TONE_MAPPING",[Es]:"CUSTOM_TONE_MAPPING"};function Cy(n,e,t,i,r,s){let a=new At(e,t,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new Jt;c.setAttribute("position",new Mt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Mt([0,2,0,0,2,0],2));let u=new Tr({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Ft(c,u),h=new Fi(-1,1,1,-1,0,1),p=null,_=null,x=!1,m,f=null,T=[],P=!1;this.setSize=function(S,b){a.setSize(S,b),o!==null&&o.setSize(S,b),l!==null&&l.setSize(S,b);for(let M=0;M<T.length;M++){let A=T[M];A.setSize&&A.setSize(S,b)}},this.setEffects=function(S){T=S,P=T.length>0&&T[0].isRenderPass===!0;let b=a.width,M=a.height;T.length>0&&o===null&&(o=new At(b,M,{type:Bt,depthBuffer:!1,stencilBuffer:!1}),l=new At(b,M,{type:Bt,depthBuffer:!1,stencilBuffer:!1}));for(let A=0;A<T.length;A++){let v=T[A];v.setSize&&v.setSize(b,M)}},this.begin=function(S,b){if(x||S.toneMapping===wn&&T.length===0)return!1;if(f=b,b!==null){let M=b.width,A=b.height;(a.width!==M||a.height!==A)&&this.setSize(M,A)}return P===!1&&S.setRenderTarget(a),m=S.toneMapping,S.toneMapping=wn,!0},this.hasRenderPass=function(){return P},this.end=function(S,b){S.toneMapping=m,x=!0;let M=a,A=o;for(let v=0;v<T.length;v++){let w=T[v];w.enabled!==!1&&(w.render(S,A,M,b),w.needsSwap!==!1&&(M=A,A=A===o?l:o))}if(p!==S.outputColorSpace||_!==S.toneMapping){p=S.outputColorSpace,_=S.toneMapping,u.defines={},qe.getTransfer(p)===Ke&&(u.defines.SRGB_TRANSFER="");let v=Ay[_];v&&(u.defines[v]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=M.texture,S.setRenderTarget(f),S.render(d,h),f=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),u.dispose()}}var mf=new Yt,$c=new mi(1,1),gf=new as,_f=new Xa,vf=new ds,Zd=[],Jd=[],Kd=new Float32Array(16),$d=new Float32Array(9),Qd=new Float32Array(4);function Dr(n,e,t){let i=n[0];if(i<=0||i>0)return n;let r=e*t,s=Zd[r];if(s===void 0&&(s=new Float32Array(r),Zd[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function Pt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Rt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function ol(n,e){let t=Jd[e];t===void 0&&(t=new Int32Array(e),Jd[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Py(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Ry(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;n.uniform2fv(this.addr,e),Rt(t,e)}}function Iy(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Pt(t,e))return;n.uniform3fv(this.addr,e),Rt(t,e)}}function Dy(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;n.uniform4fv(this.addr,e),Rt(t,e)}}function Ly(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Pt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Rt(t,e)}else{if(Pt(t,i))return;Qd.set(i),n.uniformMatrix2fv(this.addr,!1,Qd),Rt(t,i)}}function Ny(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Pt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Rt(t,e)}else{if(Pt(t,i))return;$d.set(i),n.uniformMatrix3fv(this.addr,!1,$d),Rt(t,i)}}function Oy(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Pt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Rt(t,e)}else{if(Pt(t,i))return;Kd.set(i),n.uniformMatrix4fv(this.addr,!1,Kd),Rt(t,i)}}function Uy(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Fy(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;n.uniform2iv(this.addr,e),Rt(t,e)}}function By(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pt(t,e))return;n.uniform3iv(this.addr,e),Rt(t,e)}}function zy(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;n.uniform4iv(this.addr,e),Rt(t,e)}}function Vy(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function ky(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;n.uniform2uiv(this.addr,e),Rt(t,e)}}function Gy(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pt(t,e))return;n.uniform3uiv(this.addr,e),Rt(t,e)}}function Hy(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;n.uniform4uiv(this.addr,e),Rt(t,e)}}function Wy(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?($c.compareFunction=t.isReversedDepthBuffer()?el:Qo,s=$c):s=mf,t.setTexture2D(e||s,r)}function qy(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||_f,r)}function Xy(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||vf,r)}function jy(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||gf,r)}function Yy(n){switch(n){case 5126:return Py;case 35664:return Ry;case 35665:return Iy;case 35666:return Dy;case 35674:return Ly;case 35675:return Ny;case 35676:return Oy;case 5124:case 35670:return Uy;case 35667:case 35671:return Fy;case 35668:case 35672:return By;case 35669:case 35673:return zy;case 5125:return Vy;case 36294:return ky;case 36295:return Gy;case 36296:return Hy;case 35678:case 36198:case 36298:case 36306:case 35682:return Wy;case 35679:case 36299:case 36307:return qy;case 35680:case 36300:case 36308:case 36293:return Xy;case 36289:case 36303:case 36311:case 36292:return jy}}function Zy(n,e){n.uniform1fv(this.addr,e)}function Jy(n,e){let t=Dr(e,this.size,2);n.uniform2fv(this.addr,t)}function Ky(n,e){let t=Dr(e,this.size,3);n.uniform3fv(this.addr,t)}function $y(n,e){let t=Dr(e,this.size,4);n.uniform4fv(this.addr,t)}function Qy(n,e){let t=Dr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function ex(n,e){let t=Dr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function tx(n,e){let t=Dr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function nx(n,e){n.uniform1iv(this.addr,e)}function ix(n,e){n.uniform2iv(this.addr,e)}function rx(n,e){n.uniform3iv(this.addr,e)}function sx(n,e){n.uniform4iv(this.addr,e)}function ax(n,e){n.uniform1uiv(this.addr,e)}function ox(n,e){n.uniform2uiv(this.addr,e)}function lx(n,e){n.uniform3uiv(this.addr,e)}function cx(n,e){n.uniform4uiv(this.addr,e)}function ux(n,e,t){let i=this.cache,r=e.length,s=ol(t,r);Pt(i,s)||(n.uniform1iv(this.addr,s),Rt(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=$c:a=mf;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function hx(n,e,t){let i=this.cache,r=e.length,s=ol(t,r);Pt(i,s)||(n.uniform1iv(this.addr,s),Rt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||_f,s[a])}function dx(n,e,t){let i=this.cache,r=e.length,s=ol(t,r);Pt(i,s)||(n.uniform1iv(this.addr,s),Rt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||vf,s[a])}function fx(n,e,t){let i=this.cache,r=e.length,s=ol(t,r);Pt(i,s)||(n.uniform1iv(this.addr,s),Rt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||gf,s[a])}function px(n){switch(n){case 5126:return Zy;case 35664:return Jy;case 35665:return Ky;case 35666:return $y;case 35674:return Qy;case 35675:return ex;case 35676:return tx;case 5124:case 35670:return nx;case 35667:case 35671:return ix;case 35668:case 35672:return rx;case 35669:case 35673:return sx;case 5125:return ax;case 36294:return ox;case 36295:return lx;case 36296:return cx;case 35678:case 36198:case 36298:case 36306:case 35682:return ux;case 35679:case 36299:case 36307:return hx;case 35680:case 36300:case 36308:case 36293:return dx;case 36289:case 36303:case 36311:case 36292:return fx}}var Qc=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Yy(t.type)}},eu=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=px(t.type)}},tu=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let r=this.seq;for(let s=0,a=r.length;s!==a;++s){let o=r[s];o.setValue(e,t[o.id],i)}}},Jc=/(\w+)(\])?(\[|\.)?/g;function ef(n,e){n.seq.push(e),n.map[e.id]=e}function mx(n,e,t){let i=n.name,r=i.length;for(Jc.lastIndex=0;;){let s=Jc.exec(i),a=Jc.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){ef(t,c===void 0?new Qc(o,n,e):new eu(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new tu(o),ef(t,d)),t=d}}}var Ir=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);mx(o,l,this)}let r=[],s=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){let s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){let o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,s=e.length;r!==s;++r){let a=e[r];a.id in t&&i.push(a)}return i}};function tf(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var gx=37297,_x=0;function vx(n,e){let t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){let o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}var nf=new Fe;function yx(n){qe._getMatrix(nf,qe.workingColorSpace,n);let e=`mat3( ${nf.elements.map(t=>t.toFixed(4))} )`;switch(qe.getTransfer(n)){case rs:return[e,"LinearTransferOETF"];case Ke:return[e,"sRGBTransferOETF"];default:return Le("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function rf(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";let a=/ERROR: 0:(\d+)/.exec(s);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+vx(n.getShaderSource(e),o)}else return s}function xx(n,e){let t=yx(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var bx={[Ms]:"Linear",[ws]:"Reinhard",[Ts]:"Cineon",[zi]:"ACESFilmic",[As]:"AgX",[Cs]:"Neutral",[Es]:"Custom"};function Sx(n,e){let t=bx[e];return t===void 0?(Le("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var nl=new z;function Mx(){qe.getLuminanceCoefficients(nl);let n=nl.x.toFixed(4),e=nl.y.toFixed(4),t=nl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function wx(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Vs).join(`
`)}function Tx(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Ex(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let s=n.getActiveAttrib(e,r),a=s.name,o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Vs(n){return n!==""}function sf(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function af(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Ax=/^[ \t]*#include +<([\w\d./]+)>/gm;function nu(n){return n.replace(Ax,Px)}var Cx=new Map;function Px(n,e){let t=Ge[e];if(t===void 0){let i=Cx.get(e);if(i!==void 0)t=Ge[i],Le('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return nu(t)}var Rx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function of(n){return n.replace(Rx,Ix)}function Ix(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function lf(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var Dx={[bs]:"SHADOWMAP_TYPE_PCF",[Er]:"SHADOWMAP_TYPE_VSM"};function Lx(n){return Dx[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Nx={[Si]:"ENVMAP_TYPE_CUBE",[Vi]:"ENVMAP_TYPE_CUBE",[Ps]:"ENVMAP_TYPE_CUBE_UV"};function Ox(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":Nx[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var Ux={[Vi]:"ENVMAP_MODE_REFRACTION"};function Fx(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Ux[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Bx={[Rc]:"ENVMAP_BLENDING_MULTIPLY",[Td]:"ENVMAP_BLENDING_MIX",[Ed]:"ENVMAP_BLENDING_ADD"};function zx(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":Bx[n.combine]||"ENVMAP_BLENDING_NONE"}function Vx(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function kx(n,e,t,i){let r=n.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,l=Lx(t),c=Ox(t),u=Fx(t),d=zx(t),h=Vx(t),p=wx(t),_=Tx(s),x=r.createProgram(),m,f,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Vs).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Vs).join(`
`),f.length>0&&(f+=`
`)):(m=[lf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Vs).join(`
`),f=[lf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==wn?"#define TONE_MAPPING":"",t.toneMapping!==wn?Ge.tonemapping_pars_fragment:"",t.toneMapping!==wn?Sx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,xx("linearToOutputTexel",t.outputColorSpace),Mx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Vs).join(`
`)),a=nu(a),a=sf(a,t),a=af(a,t),o=nu(o),o=sf(o,t),o=af(o,t),a=of(a),o=of(o),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===Vc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Vc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let P=T+m+a,S=T+f+o,b=tf(r,r.VERTEX_SHADER,P),M=tf(r,r.FRAGMENT_SHADER,S);r.attachShader(x,b),r.attachShader(x,M),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function A(L){if(n.debug.checkShaderErrors){let O=r.getProgramInfoLog(x)||"",B=r.getShaderInfoLog(b)||"",R=r.getShaderInfoLog(M)||"",U=O.trim(),X=B.trim(),G=R.trim(),te=!0,W=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(te=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,x,b,M);else{let ee=rf(r,b,"vertex"),Z=rf(r,M,"fragment");Oe("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+U+`
`+ee+`
`+Z)}else U!==""?Le("WebGLProgram: Program Info Log:",U):(X===""||G==="")&&(W=!1);W&&(L.diagnostics={runnable:te,programLog:U,vertexShader:{log:X,prefix:m},fragmentShader:{log:G,prefix:f}})}r.deleteShader(b),r.deleteShader(M),v=new Ir(r,x),w=Ex(r,x)}let v;this.getUniforms=function(){return v===void 0&&A(this),v};let w;this.getAttributes=function(){return w===void 0&&A(this),w};let C=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=r.getProgramParameter(x,gx)),C},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=_x++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=b,this.fragmentShader=M,this}var Gx=0,iu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new ru(e),t.set(e,i)),i}},ru=class{constructor(e){this.id=Gx++,this.code=e,this.usedTimes=0}};function Hx(n){return n===Ti||n===Os||n===Us}function Wx(n,e,t,i,r,s){let a=new os,o=new iu,l=new Set,c=[],u=new Map,d=i.logarithmicDepthBuffer,h=i.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(v){return l.add(v),v===0?"uv":`uv${v}`}function x(v,w,C,L,O,B){let R=L.fog,U=O.geometry,X=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?L.environment:null,G=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,te=e.get(v.envMap||X,G),W=te&&te.mapping===Ps?te.image.height:null,ee=p[v.type];v.precision!==null&&(h=i.getMaxPrecision(v.precision),h!==v.precision&&Le("WebGLProgram.getParameters:",v.precision,"not supported, using",h,"instead."));let Z=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,pe=Z!==void 0?Z.length:0,ie=0;U.morphAttributes.position!==void 0&&(ie=1),U.morphAttributes.normal!==void 0&&(ie=2),U.morphAttributes.color!==void 0&&(ie=3);let Ne,be,ze,j;if(ee){let lt=zn[ee];Ne=lt.vertexShader,be=lt.fragmentShader}else{Ne=v.vertexShader,be=v.fragmentShader;let lt=o.getVertexShaderStage(v),tt=o.getFragmentShaderStage(v);o.update(v,lt,tt),ze=lt.id,j=tt.id}let K=n.getRenderTarget(),ue=n.state.buffers.depth.getReversed(),Ue=O.isInstancedMesh===!0,_e=O.isBatchedMesh===!0,He=!!v.map,wt=!!v.matcap,Be=!!te,Ze=!!v.aoMap,$e=!!v.lightMap,We=!!v.bumpMap&&v.wireframe===!1,at=!!v.normalMap,Re=!!v.displacementMap,et=!!v.emissiveMap,Ye=!!v.metalnessMap,ft=!!v.roughnessMap,I=v.anisotropy>0,pt=v.clearcoat>0,Qe=v.dispersion>0,E=v.retroreflectivity>0,g=v.iridescence>0,F=v.sheen>0,H=v.transmission>0,Y=I&&!!v.anisotropyMap,re=pt&&!!v.clearcoatMap,se=pt&&!!v.clearcoatNormalMap,J=pt&&!!v.clearcoatRoughnessMap,Q=g&&!!v.iridescenceMap,ae=g&&!!v.iridescenceThicknessMap,Ee=F&&!!v.sheenColorMap,he=F&&!!v.sheenRoughnessMap,oe=!!v.specularMap,Ae=!!v.specularColorMap,Ie=!!v.specularIntensityMap,Ve=H&&!!v.transmissionMap,N=H&&!!v.thicknessMap,le=!!v.gradientMap,$=!!v.alphaMap,ce=v.alphaTest>0,ge=!!v.alphaHash,ne=!!v.extensions,Ce=wn;v.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(Ce=n.toneMapping);let we={shaderID:ee,shaderType:v.type,shaderName:v.name,vertexShader:Ne,fragmentShader:be,defines:v.defines,customVertexShaderID:ze,customFragmentShaderID:j,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:h,batching:_e,batchingColor:_e&&O._colorsTexture!==null,instancing:Ue,instancingColor:Ue&&O.instanceColor!==null,instancingMorph:Ue&&O.morphTexture!==null,outputColorSpace:K===null?n.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:qe.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:He,matcap:wt,envMap:Be,envMapMode:Be&&te.mapping,envMapCubeUVHeight:W,aoMap:Ze,lightMap:$e,bumpMap:We,normalMap:at,displacementMap:Re,emissiveMap:et,normalMapObjectSpace:at&&v.normalMapType===Pd,normalMapTangentSpace:at&&v.normalMapType===$o,packedNormalMap:at&&v.normalMapType===$o&&Hx(v.normalMap.format),metalnessMap:Ye,roughnessMap:ft,anisotropy:I,anisotropyMap:Y,clearcoat:pt,clearcoatMap:re,clearcoatNormalMap:se,clearcoatRoughnessMap:J,dispersion:Qe,retroreflection:E,iridescence:g,iridescenceMap:Q,iridescenceThicknessMap:ae,sheen:F,sheenColorMap:Ee,sheenRoughnessMap:he,specularMap:oe,specularColorMap:Ae,specularIntensityMap:Ie,transmission:H,transmissionMap:Ve,thicknessMap:N,gradientMap:le,opaque:v.transparent===!1&&v.blending===bi&&v.alphaToCoverage===!1,alphaMap:$,alphaTest:ce,alphaHash:ge,combine:v.combine,mapUv:He&&_(v.map.channel),aoMapUv:Ze&&_(v.aoMap.channel),lightMapUv:$e&&_(v.lightMap.channel),bumpMapUv:We&&_(v.bumpMap.channel),normalMapUv:at&&_(v.normalMap.channel),displacementMapUv:Re&&_(v.displacementMap.channel),emissiveMapUv:et&&_(v.emissiveMap.channel),metalnessMapUv:Ye&&_(v.metalnessMap.channel),roughnessMapUv:ft&&_(v.roughnessMap.channel),anisotropyMapUv:Y&&_(v.anisotropyMap.channel),clearcoatMapUv:re&&_(v.clearcoatMap.channel),clearcoatNormalMapUv:se&&_(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:J&&_(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Q&&_(v.iridescenceMap.channel),iridescenceThicknessMapUv:ae&&_(v.iridescenceThicknessMap.channel),sheenColorMapUv:Ee&&_(v.sheenColorMap.channel),sheenRoughnessMapUv:he&&_(v.sheenRoughnessMap.channel),specularMapUv:oe&&_(v.specularMap.channel),specularColorMapUv:Ae&&_(v.specularColorMap.channel),specularIntensityMapUv:Ie&&_(v.specularIntensityMap.channel),transmissionMapUv:Ve&&_(v.transmissionMap.channel),thicknessMapUv:N&&_(v.thicknessMap.channel),alphaMapUv:$&&_(v.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(at||I),vertexNormals:!!U.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!U.attributes.uv&&(He||$),fog:!!R,useFog:v.fog===!0,fogExp2:!!R&&R.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||U.attributes.normal===void 0&&at===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ue,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:U.attributes.position!==void 0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:pe,morphTextureStride:ie,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:B.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:v.dithering,shadowMapEnabled:n.shadowMap.enabled&&C.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ce,decodeVideoTexture:He&&v.map.isVideoTexture===!0&&qe.getTransfer(v.map.colorSpace)===Ke,decodeVideoTextureEmissive:et&&v.emissiveMap.isVideoTexture===!0&&qe.getTransfer(v.emissiveMap.colorSpace)===Ke,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Fn,flipSided:v.side===Xt,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:ne&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ne&&v.extensions.multiDraw===!0||_e)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return we.vertexUv1s=l.has(1),we.vertexUv2s=l.has(2),we.vertexUv3s=l.has(3),l.clear(),we}function m(v){let w=[];if(v.shaderID?w.push(v.shaderID):(w.push(v.customVertexShaderID),w.push(v.customFragmentShaderID)),v.defines!==void 0)for(let C in v.defines)w.push(C),w.push(v.defines[C]);return v.isRawShaderMaterial===!1&&(f(w,v),T(w,v),w.push(n.outputColorSpace)),w.push(v.customProgramCacheKey),w.join()}function f(v,w){v.push(w.precision),v.push(w.outputColorSpace),v.push(w.envMapMode),v.push(w.envMapCubeUVHeight),v.push(w.mapUv),v.push(w.alphaMapUv),v.push(w.lightMapUv),v.push(w.aoMapUv),v.push(w.bumpMapUv),v.push(w.normalMapUv),v.push(w.displacementMapUv),v.push(w.emissiveMapUv),v.push(w.metalnessMapUv),v.push(w.roughnessMapUv),v.push(w.anisotropyMapUv),v.push(w.clearcoatMapUv),v.push(w.clearcoatNormalMapUv),v.push(w.clearcoatRoughnessMapUv),v.push(w.iridescenceMapUv),v.push(w.iridescenceThicknessMapUv),v.push(w.sheenColorMapUv),v.push(w.sheenRoughnessMapUv),v.push(w.specularMapUv),v.push(w.specularColorMapUv),v.push(w.specularIntensityMapUv),v.push(w.transmissionMapUv),v.push(w.thicknessMapUv),v.push(w.combine),v.push(w.fogExp2),v.push(w.sizeAttenuation),v.push(w.morphTargetsCount),v.push(w.morphAttributeCount),v.push(w.numSunLights),v.push(w.numDirLights),v.push(w.numPointLights),v.push(w.numSpotLights),v.push(w.numSpotLightMaps),v.push(w.numHemiLights),v.push(w.numRectAreaLights),v.push(w.numSunLightShadows),v.push(w.numDirLightShadows),v.push(w.numPointLightShadows),v.push(w.numSpotLightShadows),v.push(w.numSpotLightShadowsWithMaps),v.push(w.numLightProbes),v.push(w.shadowMapType),v.push(w.toneMapping),v.push(w.numClippingPlanes),v.push(w.numClipIntersection),v.push(w.depthPacking)}function T(v,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.retroreflection&&a.enable(24),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function P(v){let w=p[v.type],C;if(w){let L=zn[w];C=$n.clone(L.uniforms)}else C=v.uniforms;return C}function S(v,w){let C=u.get(w);return C!==void 0?++C.usedTimes:(C=new kx(n,w,v,r),c.push(C),u.set(w,C)),C}function b(v){if(--v.usedTimes===0){let w=c.indexOf(v);c[w]=c[c.length-1],c.pop(),u.delete(v.cacheKey),v.destroy()}}function M(v){o.remove(v)}function A(){o.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:P,acquireProgram:S,releaseProgram:b,releaseShaderCache:M,programs:c,dispose:A}}function qx(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function Xx(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function cf(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function uf(){let n=[],e=0,t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(h){let p=0;return h.isInstancedMesh&&(p+=2),h.isSkinnedMesh&&(p+=1),p}function o(h,p,_,x,m,f){let T=n[e];return T===void 0?(T={id:h.id,object:h,geometry:p,material:_,materialVariant:a(h),groupOrder:x,renderOrder:h.renderOrder,z:m,group:f},n[e]=T):(T.id=h.id,T.object=h,T.geometry=p,T.material=_,T.materialVariant=a(h),T.groupOrder=x,T.renderOrder=h.renderOrder,T.z=m,T.group=f),e++,T}function l(h,p,_,x,m,f,T){T.reversedDepth===!0&&(m=-m);let P=o(h,p,_,x,m,f);_.transmission>0?i.push(P):_.transparent===!0?r.push(P):t.push(P)}function c(h,p,_,x,m,f){let T=o(h,p,_,x,m,f);_.transmission>0?i.unshift(T):_.transparent===!0?r.unshift(T):t.unshift(T)}function u(h,p){t.length>1&&t.sort(h||Xx),i.length>1&&i.sort(p||cf),r.length>1&&r.sort(p||cf)}function d(){for(let h=e,p=n.length;h<p;h++){let _=n[h];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:d,sort:u}}function jx(){let n=new WeakMap;function e(i,r){let s=n.get(i),a;return s===void 0?(a=new uf,n.set(i,[a])):r>=s.length?(a=new uf,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function Yx(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new z,color:new De};break;case"SpotLight":t={position:new z,direction:new z,color:new De,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new z,color:new De,distance:0,decay:0};break;case"HemisphereLight":t={direction:new z,skyColor:new De,groundColor:new De};break;case"RectAreaLight":t={color:new De,position:new z,halfWidth:new z,halfHeight:new z};break}return n[e.id]=t,t}}}function Zx(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var Jx=0;function Kx(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function $x(n){let e=new Yx,t=Zx(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new z);let r=new z,s=new yt,a=new yt;function o(c){let u=0,d=0,h=0;for(let O=0;O<9;O++)i.probe[O].set(0,0,0);let p=0,_=0,x=0,m=0,f=0,T=0,P=0,S=0,b=0,M=0,A=0,v=0,w=0,C=0;c.sort(Kx);for(let O=0,B=c.length;O<B;O++){let R=c[O],U=R.color,X=R.intensity,G=R.distance,te=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===Ti?te=R.shadow.map.texture:te=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)u+=U.r*X,d+=U.g*X,h+=U.b*X;else if(R.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(R.sh.coefficients[W],X);C++}else if(R.isSunLight){let W=e.get(R);if(W.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let ee=R.shadow,Z=t.get(R);Z.shadowIntensity=ee.intensity,Z.shadowBias=ee.bias,Z.shadowNormalBias=ee.normalBias,Z.shadowRadius=ee.radius,Z.shadowMapSize.copy(ee.mapSize).multiply(ee.getFrameExtents()),i.sunShadow[_]=Z,i.sunShadowMap[_]=te;let pe=ee.getViewportCount();for(let ie=0;ie<pe;ie++)i.sunShadowMatrix[x+ie]=ee.getMatrix(ie),i.sunShadowCascade[x+ie]=ee._cascadeData[ie];x+=pe,_++}i.sun[p]=W,p++}else if(R.isDirectionalLight){let W=e.get(R);if(W.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let ee=R.shadow,Z=t.get(R);Z.shadowIntensity=ee.intensity,Z.shadowBias=ee.bias,Z.shadowNormalBias=ee.normalBias,Z.shadowRadius=ee.radius,Z.shadowMapSize=ee.mapSize,i.directionalShadow[m]=Z,i.directionalShadowMap[m]=te,i.directionalShadowMatrix[m]=R.shadow.matrix,b++}i.directional[m]=W,m++}else if(R.isSpotLight){let W=e.get(R);W.position.setFromMatrixPosition(R.matrixWorld),W.color.copy(U).multiplyScalar(X),W.distance=G,W.coneCos=Math.cos(R.angle),W.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),W.decay=R.decay,i.spot[T]=W;let ee=R.shadow;if(R.map&&(i.spotLightMap[v]=R.map,v++,ee.updateMatrices(R),R.castShadow&&w++),i.spotLightMatrix[T]=ee.matrix,R.castShadow){let Z=t.get(R);Z.shadowIntensity=ee.intensity,Z.shadowBias=ee.bias,Z.shadowNormalBias=ee.normalBias,Z.shadowRadius=ee.radius,Z.shadowMapSize=ee.mapSize,i.spotShadow[T]=Z,i.spotShadowMap[T]=te,A++}T++}else if(R.isRectAreaLight){let W=e.get(R);W.color.copy(U).multiplyScalar(X),W.halfWidth.set(R.width*.5,0,0),W.halfHeight.set(0,R.height*.5,0),i.rectArea[P]=W,P++}else if(R.isPointLight){let W=e.get(R);if(W.color.copy(R.color).multiplyScalar(R.intensity),W.distance=R.distance,W.decay=R.decay,R.castShadow){let ee=R.shadow,Z=t.get(R);Z.shadowIntensity=ee.intensity,Z.shadowBias=ee.bias,Z.shadowNormalBias=ee.normalBias,Z.shadowRadius=ee.radius,Z.shadowMapSize=ee.mapSize,Z.shadowCameraNear=ee.camera.near,Z.shadowCameraFar=ee.camera.far,i.pointShadow[f]=Z,i.pointShadowMap[f]=te,i.pointShadowMatrix[f]=R.shadow.matrix,M++}i.point[f]=W,f++}else if(R.isHemisphereLight){let W=e.get(R);W.skyColor.copy(R.color).multiplyScalar(X),W.groundColor.copy(R.groundColor).multiplyScalar(X),i.hemi[S]=W,S++}}P>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=de.LTC_FLOAT_1,i.rectAreaLTC2=de.LTC_FLOAT_2):(i.rectAreaLTC1=de.LTC_HALF_1,i.rectAreaLTC2=de.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=h;let L=i.hash;(L.sunLength!==p||L.directionalLength!==m||L.pointLength!==f||L.spotLength!==T||L.rectAreaLength!==P||L.hemiLength!==S||L.numSunShadows!==_||L.numDirectionalShadows!==b||L.numPointShadows!==M||L.numSpotShadows!==A||L.numSpotMaps!==v||L.numLightProbes!==C)&&(i.sun.length=p,i.directional.length=m,i.spot.length=T,i.rectArea.length=P,i.point.length=f,i.hemi.length=S,i.sunShadow.length=_,i.sunShadowMap.length=_,i.sunShadowMatrix.length=x,i.sunShadowCascade.length=x,i.directionalShadow.length=b,i.directionalShadowMap.length=b,i.directionalShadowMatrix.length=b,i.pointShadow.length=M,i.pointShadowMap.length=M,i.pointShadowMatrix.length=M,i.spotShadow.length=A,i.spotShadowMap.length=A,i.spotLightMatrix.length=A+v-w,i.spotLightMap.length=v,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=C,L.sunLength=p,L.directionalLength=m,L.pointLength=f,L.spotLength=T,L.rectAreaLength=P,L.hemiLength=S,L.numSunShadows=_,L.numDirectionalShadows=b,L.numPointShadows=M,L.numSpotShadows=A,L.numSpotMaps=v,L.numLightProbes=C,i.version=Jx++)}function l(c,u){let d=0,h=0,p=0,_=0,x=0,m=0,f=u.matrixWorldInverse;for(let T=0,P=c.length;T<P;T++){let S=c[T];if(S.isSunLight){let b=i.sun[d];b.direction.setFromMatrixPosition(S.matrixWorld),b.direction.transformDirection(f),d++}else if(S.isDirectionalLight){let b=i.directional[h];b.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(f),h++}else if(S.isSpotLight){let b=i.spot[_];b.position.setFromMatrixPosition(S.matrixWorld),b.position.applyMatrix4(f),b.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(f),_++}else if(S.isRectAreaLight){let b=i.rectArea[x];b.position.setFromMatrixPosition(S.matrixWorld),b.position.applyMatrix4(f),a.identity(),s.copy(S.matrixWorld),s.premultiply(f),a.extractRotation(s),b.halfWidth.set(S.width*.5,0,0),b.halfHeight.set(0,S.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),x++}else if(S.isPointLight){let b=i.point[p];b.position.setFromMatrixPosition(S.matrixWorld),b.position.applyMatrix4(f),p++}else if(S.isHemisphereLight){let b=i.hemi[m];b.direction.setFromMatrixPosition(S.matrixWorld),b.direction.transformDirection(f),m++}}}return{setup:o,setupView:l,state:i}}function hf(n){let e=new $x(n),t=[],i=[],r=[];function s(h){d.camera=h,t.length=0,i.length=0,r.length=0}function a(h){t.push(h)}function o(h){i.push(h)}function l(h){r.push(h)}function c(){e.setup(t)}function u(h){e.setupView(t,h)}let d={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function Qx(n){let e=new WeakMap;function t(r,s=0){let a=e.get(r),o;return a===void 0?(o=new hf(n),e.set(r,[o])):s>=a.length?(o=new hf(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}var eb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,tb=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,nb=[new z(1,0,0),new z(-1,0,0),new z(0,1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1)],ib=[new z(0,-1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1),new z(0,-1,0),new z(0,-1,0)],df=new yt,zs=new z,Kc=new z;function rb(n,e,t){let i=new Mr,r=new Pe,s=new Pe,a=new rt,o=new Ja,l=new Ka,c={},u=t.maxTextureSize,d={[xi]:Xt,[Xt]:xi,[Fn]:Fn},h=new xt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Pe},radius:{value:4}},vertexShader:eb,fragmentShader:tb}),p=h.clone();p.defines.HORIZONTAL_PASS=1;let _=new Jt;_.setAttribute("position",new pn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Ft(_,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=bs;let f=this.type;this.render=function(M,A,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||M.length===0)return;this.type===ho&&(Le("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=bs);let w=n.getRenderTarget(),C=n.getActiveCubeFace(),L=n.getActiveMipmapLevel(),O=n.state;O.setBlending(mn),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let B=f!==this.type;B&&A.traverse(function(R){R.material&&(Array.isArray(R.material)?R.material.forEach(U=>U.needsUpdate=!0):R.material.needsUpdate=!0)});for(let R=0,U=M.length;R<U;R++){let X=M[R],G=X.shadow;if(G===void 0){Le("WebGLShadowMap:",X,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;r.copy(G.mapSize);let te=G.getFrameExtents();r.multiply(te),s.copy(G.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/te.x),r.x=s.x*te.x,G.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/te.y),r.y=s.y*te.y,G.mapSize.y=s.y));let W=n.state.buffers.depth.getReversed();if(G.camera._reversedDepth=W,G.map===null||B===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===Er){if(X.isPointLight){Le("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new At(r.x,r.y,{format:Ti,type:Bt,minFilter:Ut,magFilter:Ut,generateMipmaps:!1}),G.map.texture.name=X.name+".shadowMap",G.map.depthTexture=new mi(r.x,r.y,En),G.map.depthTexture.name=X.name+".shadowMapDepth",G.map.depthTexture.format=Nn,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Lt,G.map.depthTexture.magFilter=Lt}else X.isPointLight?(G.map=new rl(r.x),G.map.depthTexture=new Za(r.x,Tn)):(G.map=new At(r.x,r.y),G.map.depthTexture=new mi(r.x,r.y,Tn)),G.map.depthTexture.name=X.name+".shadowMap",G.map.depthTexture.format=Nn,this.type===bs?(G.map.depthTexture.compareFunction=W?el:Qo,G.map.depthTexture.minFilter=Ut,G.map.depthTexture.magFilter=Ut):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Lt,G.map.depthTexture.magFilter=Lt);G.camera.updateProjectionMatrix()}G.map.isWebGLCubeRenderTarget!==!0&&(G.map.width!==r.x||G.map.height!==r.y)&&G.map.setSize(r.x,r.y);let ee=G.map.isWebGLCubeRenderTarget?6:G.getViewportCount();X.isPointLight!==!0&&G.updateMatrices(X,v);for(let Z=0;Z<ee;Z++){let pe=G.getCamera(Z);if(X.isPointLight){let ie=G.camera,Ne=G.matrix,be=X.distance||ie.far;be!==ie.far&&(ie.far=be,ie.updateProjectionMatrix()),zs.setFromMatrixPosition(X.matrixWorld),ie.position.copy(zs),Kc.copy(ie.position),Kc.add(nb[Z]),ie.up.copy(ib[Z]),ie.lookAt(Kc),ie.updateMatrixWorld(),Ne.makeTranslation(-zs.x,-zs.y,-zs.z),df.multiplyMatrices(ie.projectionMatrix,ie.matrixWorldInverse),G._frustum.setFromProjectionMatrix(df,ie.coordinateSystem,ie.reversedDepth)}if(G.map.isWebGLCubeRenderTarget)n.setRenderTarget(G.map,Z),n.clear();else{Z===0&&(n.setRenderTarget(G.map),n.clear());let ie=G.getViewport(Z);a.set(s.x*ie.x,s.y*ie.y,s.x*ie.z,s.y*ie.w),O.viewport(a)}i=G.getFrustum(Z),S(A,v,pe,X,this.type)}G.isPointLightShadow!==!0&&this.type===Er&&T(G,v),G.needsUpdate=!1}f=this.type,m.needsUpdate=!1,n.setRenderTarget(w,C,L)};function T(M,A){let v=e.update(x);h.defines.VSM_SAMPLES!==M.blurSamples&&(h.defines.VSM_SAMPLES=M.blurSamples,p.defines.VSM_SAMPLES=M.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),M.mapPass===null?M.mapPass=new At(r.x,r.y,{format:Ti,type:Bt}):(M.mapPass.width!==M.map.width||M.mapPass.height!==M.map.height)&&M.mapPass.setSize(M.map.width,M.map.height),h.uniforms.shadow_pass.value=M.map.depthTexture,h.uniforms.resolution.value.set(M.map.width,M.map.height),h.uniforms.radius.value=M.radius,n.setRenderTarget(M.mapPass),n.clear(),n.renderBufferDirect(A,null,v,h,x,null),p.uniforms.shadow_pass.value=M.mapPass.texture,p.uniforms.resolution.value.set(M.map.width,M.map.height),p.uniforms.radius.value=M.radius,n.setRenderTarget(M.map),n.clear(),n.renderBufferDirect(A,null,v,p,x,null)}function P(M,A,v,w){let C=null,L=v.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(L!==void 0)C=L;else if(C=v.isPointLight===!0?l:o,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){let O=C.uuid,B=A.uuid,R=c[O];R===void 0&&(R={},c[O]=R);let U=R[B];U===void 0&&(U=C.clone(),R[B]=U,A.addEventListener("dispose",b)),C=U}if(C.visible=A.visible,C.wireframe=A.wireframe,w===Er?C.side=A.shadowSide!==null?A.shadowSide:A.side:C.side=A.shadowSide!==null?A.shadowSide:d[A.side],C.alphaMap=A.alphaMap,C.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,C.map=A.map,C.clipShadows=A.clipShadows,C.clippingPlanes=A.clippingPlanes,C.clipIntersection=A.clipIntersection,C.displacementMap=A.displacementMap,C.displacementScale=A.displacementScale,C.displacementBias=A.displacementBias,C.wireframeLinewidth=A.wireframeLinewidth,C.linewidth=A.linewidth,v.isPointLight===!0&&C.isMeshDistanceMaterial===!0){let O=n.properties.get(C);O.light=v}return C}function S(M,A,v,w,C){if(M.visible===!1)return;if(M.layers.test(A.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&C===Er)&&(!M.frustumCulled||M.intersectsFrustum(i))){M.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,M.matrixWorld);let B=e.update(M),R=M.material;if(Array.isArray(R)){let U=B.groups;for(let X=0,G=U.length;X<G;X++){let te=U[X],W=R[te.materialIndex];if(W&&W.visible){let ee=P(M,W,w,C);M.onBeforeShadow(n,M,A,v,B,ee,te),n.renderBufferDirect(v,null,B,ee,M,te),M.onAfterShadow(n,M,A,v,B,ee,te)}}}else if(R.visible){let U=P(M,R,w,C);M.onBeforeShadow(n,M,A,v,B,U,null),n.renderBufferDirect(v,null,B,U,M,null),M.onAfterShadow(n,M,A,v,B,U,null)}}let O=M.children;for(let B=0,R=O.length;B<R;B++)S(O[B],A,v,w,C)}function b(M){M.target.removeEventListener("dispose",b);for(let v in c){let w=c[v],C=M.target.uuid;C in w&&(w[C].dispose(),delete w[C])}}}function sb(n,e){function t(){let N=!1,le=new rt,$=null,ce=new rt(0,0,0,0);return{setMask:function(ge){$!==ge&&!N&&(n.colorMask(ge,ge,ge,ge),$=ge)},setLocked:function(ge){N=ge},setClear:function(ge,ne,Ce,we,lt){lt===!0&&(ge*=we,ne*=we,Ce*=we),le.set(ge,ne,Ce,we),ce.equals(le)===!1&&(n.clearColor(ge,ne,Ce,we),ce.copy(le))},reset:function(){N=!1,$=null,ce.set(-1,0,0,0)}}}function i(){let N=!1,le=!1,$=null,ce=null,ge=null;return{setReversed:function(ne){if(le!==ne){let Ce=e.get("EXT_clip_control");ne?Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.ZERO_TO_ONE_EXT):Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.NEGATIVE_ONE_TO_ONE_EXT),le=ne;let we=ge;ge=null,this.setClear(we)}},getReversed:function(){return le},setTest:function(ne){ne?K(n.DEPTH_TEST):ue(n.DEPTH_TEST)},setMask:function(ne){$!==ne&&!N&&(n.depthMask(ne),$=ne)},setFunc:function(ne){if(le&&(ne=kd[ne]),ce!==ne){switch(ne){case La:n.depthFunc(n.NEVER);break;case Na:n.depthFunc(n.ALWAYS);break;case Oa:n.depthFunc(n.LESS);break;case _r:n.depthFunc(n.LEQUAL);break;case Ua:n.depthFunc(n.EQUAL);break;case Fa:n.depthFunc(n.GEQUAL);break;case Ba:n.depthFunc(n.GREATER);break;case za:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ce=ne}},setLocked:function(ne){N=ne},setClear:function(ne){ge!==ne&&(ge=ne,le&&(ne=1-ne),n.clearDepth(ne))},reset:function(){N=!1,$=null,ce=null,ge=null,le=!1}}}function r(){let N=!1,le=null,$=null,ce=null,ge=null,ne=null,Ce=null,we=null,lt=null;return{setTest:function(tt){N||(tt?K(n.STENCIL_TEST):ue(n.STENCIL_TEST))},setMask:function(tt){le!==tt&&!N&&(n.stencilMask(tt),le=tt)},setFunc:function(tt,vn,Rn){($!==tt||ce!==vn||ge!==Rn)&&(n.stencilFunc(tt,vn,Rn),$=tt,ce=vn,ge=Rn)},setOp:function(tt,vn,Rn){(ne!==tt||Ce!==vn||we!==Rn)&&(n.stencilOp(tt,vn,Rn),ne=tt,Ce=vn,we=Rn)},setLocked:function(tt){N=tt},setClear:function(tt){lt!==tt&&(n.clearStencil(tt),lt=tt)},reset:function(){N=!1,le=null,$=null,ce=null,ge=null,ne=null,Ce=null,we=null,lt=null}}}let s=new t,a=new i,o=new r,l=new WeakMap,c=new WeakMap,u={},d={},h={},p=new WeakMap,_=[],x=null,m=!1,f=null,T=null,P=null,S=null,b=null,M=null,A=null,v=new De(0,0,0),w=0,C=!1,L=null,O=null,B=null,R=null,U=null,X=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,te=0,W=n.getParameter(n.VERSION);W.indexOf("WebGL")!==-1?(te=parseFloat(/^WebGL (\d)/.exec(W)[1]),G=te>=1):W.indexOf("OpenGL ES")!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),G=te>=2);let ee=null,Z={},pe=n.getParameter(n.SCISSOR_BOX),ie=n.getParameter(n.VIEWPORT),Ne=new rt().fromArray(pe),be=new rt().fromArray(ie);function ze(N,le,$,ce){let ge=new Uint8Array(4),ne=n.createTexture();n.bindTexture(N,ne),n.texParameteri(N,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(N,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ce=0;Ce<$;Ce++)N===n.TEXTURE_3D||N===n.TEXTURE_2D_ARRAY?n.texImage3D(le,0,n.RGBA,1,1,ce,0,n.RGBA,n.UNSIGNED_BYTE,ge):n.texImage2D(le+Ce,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ge);return ne}let j={};j[n.TEXTURE_2D]=ze(n.TEXTURE_2D,n.TEXTURE_2D,1),j[n.TEXTURE_CUBE_MAP]=ze(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[n.TEXTURE_2D_ARRAY]=ze(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),j[n.TEXTURE_3D]=ze(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),K(n.DEPTH_TEST),a.setFunc(_r),We(!1),at(Tc),K(n.CULL_FACE),Ze(mn);function K(N){u[N]!==!0&&(n.enable(N),u[N]=!0)}function ue(N){u[N]!==!1&&(n.disable(N),u[N]=!1)}function Ue(N,le){return h[N]!==le?(n.bindFramebuffer(N,le),h[N]=le,N===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=le),N===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=le),!0):!1}function _e(N,le){let $=_,ce=!1;if(N){$=p.get(le),$===void 0&&($=[],p.set(le,$));let ge=N.textures;if($.length!==ge.length||$[0]!==n.COLOR_ATTACHMENT0){for(let ne=0,Ce=ge.length;ne<Ce;ne++)$[ne]=n.COLOR_ATTACHMENT0+ne;$.length=ge.length,ce=!0}}else $[0]!==n.BACK&&($[0]=n.BACK,ce=!0);ce&&n.drawBuffers($)}function He(N){return x!==N?(n.useProgram(N),x=N,!0):!1}let wt={[Bi]:n.FUNC_ADD,[ld]:n.FUNC_SUBTRACT,[cd]:n.FUNC_REVERSE_SUBTRACT};wt[ud]=n.MIN,wt[hd]=n.MAX;let Be={[dd]:n.ZERO,[fd]:n.ONE,[pd]:n.SRC_COLOR,[Cc]:n.SRC_ALPHA,[xd]:n.SRC_ALPHA_SATURATE,[vd]:n.DST_COLOR,[gd]:n.DST_ALPHA,[md]:n.ONE_MINUS_SRC_COLOR,[Pc]:n.ONE_MINUS_SRC_ALPHA,[yd]:n.ONE_MINUS_DST_COLOR,[_d]:n.ONE_MINUS_DST_ALPHA,[bd]:n.CONSTANT_COLOR,[Sd]:n.ONE_MINUS_CONSTANT_COLOR,[Md]:n.CONSTANT_ALPHA,[wd]:n.ONE_MINUS_CONSTANT_ALPHA};function Ze(N,le,$,ce,ge,ne,Ce,we,lt,tt){if(N===mn){m===!0&&(ue(n.BLEND),m=!1);return}if(m===!1&&(K(n.BLEND),m=!0),N!==od){if(N!==f||tt!==C){if((T!==Bi||b!==Bi)&&(n.blendEquation(n.FUNC_ADD),T=Bi,b=Bi),tt)switch(N){case bi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ss:n.blendFunc(n.ONE,n.ONE);break;case Ec:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ac:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Oe("WebGLState: Invalid blending: ",N);break}else switch(N){case bi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ss:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Ec:Oe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ac:Oe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Oe("WebGLState: Invalid blending: ",N);break}P=null,S=null,M=null,A=null,v.set(0,0,0),w=0,f=N,C=tt}return}ge=ge||le,ne=ne||$,Ce=Ce||ce,(le!==T||ge!==b)&&(n.blendEquationSeparate(wt[le],wt[ge]),T=le,b=ge),($!==P||ce!==S||ne!==M||Ce!==A)&&(n.blendFuncSeparate(Be[$],Be[ce],Be[ne],Be[Ce]),P=$,S=ce,M=ne,A=Ce),(we.equals(v)===!1||lt!==w)&&(n.blendColor(we.r,we.g,we.b,lt),v.copy(we),w=lt),f=N,C=!1}function $e(N,le){N.side===Fn?ue(n.CULL_FACE):K(n.CULL_FACE);let $=N.side===Xt;le&&($=!$),We($),N.blending===bi&&N.transparent===!1?Ze(mn):Ze(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),s.setMask(N.colorWrite);let ce=N.stencilWrite;o.setTest(ce),ce&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),et(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?K(n.SAMPLE_ALPHA_TO_COVERAGE):ue(n.SAMPLE_ALPHA_TO_COVERAGE)}function We(N){L!==N&&(N?n.frontFace(n.CW):n.frontFace(n.CCW),L=N)}function at(N){N!==sd?(K(n.CULL_FACE),N!==O&&(N===Tc?n.cullFace(n.BACK):N===ad?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ue(n.CULL_FACE),O=N}function Re(N){N!==B&&(G&&n.lineWidth(N),B=N)}function et(N,le,$){N?(K(n.POLYGON_OFFSET_FILL),(R!==le||U!==$)&&(R=le,U=$,a.getReversed()&&(le=-le),n.polygonOffset(le,$))):ue(n.POLYGON_OFFSET_FILL)}function Ye(N){N?K(n.SCISSOR_TEST):ue(n.SCISSOR_TEST)}function ft(N){N===void 0&&(N=n.TEXTURE0+X-1),ee!==N&&(n.activeTexture(N),ee=N)}function I(N,le,$){$===void 0&&(ee===null?$=n.TEXTURE0+X-1:$=ee);let ce=Z[$];ce===void 0&&(ce={type:void 0,texture:void 0},Z[$]=ce),(ce.type!==N||ce.texture!==le)&&(ee!==$&&(n.activeTexture($),ee=$),n.bindTexture(N,le||j[N]),ce.type=N,ce.texture=le)}function pt(){let N=Z[ee];N!==void 0&&N.type!==void 0&&(n.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function Qe(){try{n.compressedTexImage2D(...arguments)}catch(N){Oe("WebGLState:",N)}}function E(){try{n.compressedTexImage3D(...arguments)}catch(N){Oe("WebGLState:",N)}}function g(){try{n.texSubImage2D(...arguments)}catch(N){Oe("WebGLState:",N)}}function F(){try{n.texSubImage3D(...arguments)}catch(N){Oe("WebGLState:",N)}}function H(){try{n.compressedTexSubImage2D(...arguments)}catch(N){Oe("WebGLState:",N)}}function Y(){try{n.compressedTexSubImage3D(...arguments)}catch(N){Oe("WebGLState:",N)}}function re(){try{n.texStorage2D(...arguments)}catch(N){Oe("WebGLState:",N)}}function se(){try{n.texStorage3D(...arguments)}catch(N){Oe("WebGLState:",N)}}function J(){try{n.texImage2D(...arguments)}catch(N){Oe("WebGLState:",N)}}function Q(){try{n.texImage3D(...arguments)}catch(N){Oe("WebGLState:",N)}}function ae(N){return d[N]!==void 0?d[N]:n.getParameter(N)}function Ee(N,le){d[N]!==le&&(n.pixelStorei(N,le),d[N]=le)}function he(N){Ne.equals(N)===!1&&(n.scissor(N.x,N.y,N.z,N.w),Ne.copy(N))}function oe(N){be.equals(N)===!1&&(n.viewport(N.x,N.y,N.z,N.w),be.copy(N))}function Ae(N,le){let $=c.get(le);$===void 0&&($=new WeakMap,c.set(le,$));let ce=$.get(N);ce===void 0&&(ce=n.getUniformBlockIndex(le,N.name),$.set(N,ce))}function Ie(N,le){let ce=c.get(le).get(N);l.get(le)!==ce&&(n.uniformBlockBinding(le,ce,N.__bindingPointIndex),l.set(le,ce))}function Ve(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},d={},ee=null,Z={},h={},p=new WeakMap,_=[],x=null,m=!1,f=null,T=null,P=null,S=null,b=null,M=null,A=null,v=new De(0,0,0),w=0,C=!1,L=null,O=null,B=null,R=null,U=null,Ne.set(0,0,n.canvas.width,n.canvas.height),be.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:K,disable:ue,bindFramebuffer:Ue,drawBuffers:_e,useProgram:He,setBlending:Ze,setMaterial:$e,setFlipSided:We,setCullFace:at,setLineWidth:Re,setPolygonOffset:et,setScissorTest:Ye,activeTexture:ft,bindTexture:I,unbindTexture:pt,compressedTexImage2D:Qe,compressedTexImage3D:E,texImage2D:J,texImage3D:Q,pixelStorei:Ee,getParameter:ae,updateUBOMapping:Ae,uniformBlockBinding:Ie,texStorage2D:re,texStorage3D:se,texSubImage2D:g,texSubImage3D:F,compressedTexSubImage2D:H,compressedTexSubImage3D:Y,scissor:he,viewport:oe,reset:Ve}}function ab(n,e,t,i,r,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Pe,u=new WeakMap,d=new Set,h,p=new WeakMap,_=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(E,g){return _?new OffscreenCanvas(E,g):ss("canvas")}function m(E,g,F){let H=1,Y=Qe(E);if((Y.width>F||Y.height>F)&&(H=F/Math.max(Y.width,Y.height)),H<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let re=Math.floor(H*Y.width),se=Math.floor(H*Y.height);h===void 0&&(h=x(re,se));let J=g?x(re,se):h;return J.width=re,J.height=se,J.getContext("2d").drawImage(E,0,0,re,se),Le("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+re+"x"+se+")."),J}else return"data"in E&&Le("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),E;return E}function f(E){return E.generateMipmaps}function T(E){n.generateMipmap(E)}function P(E){return E.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?n.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function S(E,g,F,H,Y,re=!1){if(E!==null){if(n[E]!==void 0)return n[E];Le("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let se;H&&(se=e.get("EXT_texture_norm16"),se||Le("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let J=g;if(g===n.RED&&(F===n.FLOAT&&(J=n.R32F),F===n.HALF_FLOAT&&(J=n.R16F),F===n.UNSIGNED_BYTE&&(J=n.R8),F===n.UNSIGNED_SHORT&&se&&(J=se.R16_EXT),F===n.SHORT&&se&&(J=se.R16_SNORM_EXT)),g===n.RED_INTEGER&&(F===n.UNSIGNED_BYTE&&(J=n.R8UI),F===n.UNSIGNED_SHORT&&(J=n.R16UI),F===n.UNSIGNED_INT&&(J=n.R32UI),F===n.BYTE&&(J=n.R8I),F===n.SHORT&&(J=n.R16I),F===n.INT&&(J=n.R32I)),g===n.RG&&(F===n.FLOAT&&(J=n.RG32F),F===n.HALF_FLOAT&&(J=n.RG16F),F===n.UNSIGNED_BYTE&&(J=n.RG8),F===n.UNSIGNED_SHORT&&se&&(J=se.RG16_EXT),F===n.SHORT&&se&&(J=se.RG16_SNORM_EXT)),g===n.RG_INTEGER&&(F===n.UNSIGNED_BYTE&&(J=n.RG8UI),F===n.UNSIGNED_SHORT&&(J=n.RG16UI),F===n.UNSIGNED_INT&&(J=n.RG32UI),F===n.BYTE&&(J=n.RG8I),F===n.SHORT&&(J=n.RG16I),F===n.INT&&(J=n.RG32I)),g===n.RGB_INTEGER&&(F===n.UNSIGNED_BYTE&&(J=n.RGB8UI),F===n.UNSIGNED_SHORT&&(J=n.RGB16UI),F===n.UNSIGNED_INT&&(J=n.RGB32UI),F===n.BYTE&&(J=n.RGB8I),F===n.SHORT&&(J=n.RGB16I),F===n.INT&&(J=n.RGB32I)),g===n.RGBA_INTEGER&&(F===n.UNSIGNED_BYTE&&(J=n.RGBA8UI),F===n.UNSIGNED_SHORT&&(J=n.RGBA16UI),F===n.UNSIGNED_INT&&(J=n.RGBA32UI),F===n.BYTE&&(J=n.RGBA8I),F===n.SHORT&&(J=n.RGBA16I),F===n.INT&&(J=n.RGBA32I)),g===n.RGB&&(F===n.UNSIGNED_SHORT&&se&&(J=se.RGB16_EXT),F===n.SHORT&&se&&(J=se.RGB16_SNORM_EXT),F===n.UNSIGNED_INT_5_9_9_9_REV&&(J=n.RGB9_E5),F===n.UNSIGNED_INT_10F_11F_11F_REV&&(J=n.R11F_G11F_B10F)),g===n.RGBA){let Q=re?rs:qe.getTransfer(Y);F===n.FLOAT&&(J=n.RGBA32F),F===n.HALF_FLOAT&&(J=n.RGBA16F),F===n.UNSIGNED_BYTE&&(J=Q===Ke?n.SRGB8_ALPHA8:n.RGBA8),F===n.UNSIGNED_SHORT&&se&&(J=se.RGBA16_EXT),F===n.SHORT&&se&&(J=se.RGBA16_SNORM_EXT),F===n.UNSIGNED_SHORT_4_4_4_4&&(J=n.RGBA4),F===n.UNSIGNED_SHORT_5_5_5_1&&(J=n.RGB5_A1)}return(J===n.R16F||J===n.R32F||J===n.RG16F||J===n.RG32F||J===n.RGBA16F||J===n.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function b(E,g){let F;return E?g===null||g===Tn||g===Cr?F=n.DEPTH24_STENCIL8:g===En?F=n.DEPTH32F_STENCIL8:g===Ar&&(F=n.DEPTH24_STENCIL8,Le("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===Tn||g===Cr?F=n.DEPTH_COMPONENT24:g===En?F=n.DEPTH_COMPONENT32F:g===Ar&&(F=n.DEPTH_COMPONENT16),F}function M(E,g){return f(E)===!0||E.isFramebufferTexture&&E.minFilter!==Lt&&E.minFilter!==Ut?Math.log2(Math.max(g.width,g.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?g.mipmaps.length:1}function A(E){let g=E.target;g.removeEventListener("dispose",A),w(g),g.isVideoTexture&&u.delete(g),g.isHTMLTexture&&d.delete(g)}function v(E){let g=E.target;g.removeEventListener("dispose",v),L(g)}function w(E){let g=i.get(E);if(g.__webglInit===void 0)return;let F=E.source,H=p.get(F);if(H){let Y=H[g.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&C(E),Object.keys(H).length===0&&p.delete(F)}i.remove(E)}function C(E){let g=i.get(E);n.deleteTexture(g.__webglTexture);let F=E.source,H=p.get(F);delete H[g.__cacheKey],a.memory.textures--}function L(E){let g=i.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),i.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let H=0;H<6;H++){if(Array.isArray(g.__webglFramebuffer[H]))for(let Y=0;Y<g.__webglFramebuffer[H].length;Y++)n.deleteFramebuffer(g.__webglFramebuffer[H][Y]);else n.deleteFramebuffer(g.__webglFramebuffer[H]);g.__webglDepthbuffer&&n.deleteRenderbuffer(g.__webglDepthbuffer[H])}else{if(Array.isArray(g.__webglFramebuffer))for(let H=0;H<g.__webglFramebuffer.length;H++)n.deleteFramebuffer(g.__webglFramebuffer[H]);else n.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&n.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&n.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let H=0;H<g.__webglColorRenderbuffer.length;H++)g.__webglColorRenderbuffer[H]&&n.deleteRenderbuffer(g.__webglColorRenderbuffer[H]);g.__webglDepthRenderbuffer&&n.deleteRenderbuffer(g.__webglDepthRenderbuffer)}let F=E.textures;for(let H=0,Y=F.length;H<Y;H++){let re=i.get(F[H]);re.__webglTexture&&(n.deleteTexture(re.__webglTexture),a.memory.textures--),i.remove(F[H])}i.remove(E)}let O=0;function B(){O=0}function R(){return O}function U(E){O=E}function X(){let E=O;return E>=r.maxTextures&&Le("WebGLTextures: Trying to use "+(E+1)+" texture units while this GPU supports only "+r.maxTextures),O+=1,E}function G(E){let g=[];return g.push(E.wrapS),g.push(E.wrapT),g.push(E.wrapR||0),g.push(E.magFilter),g.push(E.minFilter),g.push(E.anisotropy),g.push(E.internalFormat),g.push(E.format),g.push(E.type),g.push(E.generateMipmaps),g.push(E.premultiplyAlpha),g.push(E.flipY),g.push(E.unpackAlignment),g.push(E.colorSpace),g.join()}function te(E,g){let F=i.get(E);if(E.isVideoTexture&&I(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&F.__version!==E.version){let H=E.image;if(H===null)Le("WebGLRenderer: Texture marked for update but no image data found.");else if(H.complete===!1)Le("WebGLRenderer: Texture marked for update but image is incomplete");else{ue(F,E,g);return}}else E.isExternalTexture&&(F.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,F.__webglTexture,n.TEXTURE0+g)}function W(E,g){let F=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&F.__version!==E.version){ue(F,E,g);return}else E.isExternalTexture&&(F.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,F.__webglTexture,n.TEXTURE0+g)}function ee(E,g){let F=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&F.__version!==E.version){ue(F,E,g);return}t.bindTexture(n.TEXTURE_3D,F.__webglTexture,n.TEXTURE0+g)}function Z(E,g){let F=i.get(E);if(E.isCubeDepthTexture!==!0&&E.version>0&&F.__version!==E.version){Ue(F,E,g);return}t.bindTexture(n.TEXTURE_CUBE_MAP,F.__webglTexture,n.TEXTURE0+g)}let pe={[Va]:n.REPEAT,[Ln]:n.CLAMP_TO_EDGE,[ka]:n.MIRRORED_REPEAT},ie={[Lt]:n.NEAREST,[Ad]:n.NEAREST_MIPMAP_NEAREST,[Rs]:n.NEAREST_MIPMAP_LINEAR,[Ut]:n.LINEAR,[mo]:n.LINEAR_MIPMAP_NEAREST,[Mi]:n.LINEAR_MIPMAP_LINEAR},Ne={[Id]:n.NEVER,[Ud]:n.ALWAYS,[Dd]:n.LESS,[Qo]:n.LEQUAL,[Ld]:n.EQUAL,[el]:n.GEQUAL,[Nd]:n.GREATER,[Od]:n.NOTEQUAL};function be(E,g){if(g.type===En&&e.has("OES_texture_float_linear")===!1&&(g.magFilter===Ut||g.magFilter===mo||g.magFilter===Rs||g.magFilter===Mi||g.minFilter===Ut||g.minFilter===mo||g.minFilter===Rs||g.minFilter===Mi)&&Le("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(E,n.TEXTURE_WRAP_S,pe[g.wrapS]),n.texParameteri(E,n.TEXTURE_WRAP_T,pe[g.wrapT]),(E===n.TEXTURE_3D||E===n.TEXTURE_2D_ARRAY)&&n.texParameteri(E,n.TEXTURE_WRAP_R,pe[g.wrapR]),n.texParameteri(E,n.TEXTURE_MAG_FILTER,ie[g.magFilter]),n.texParameteri(E,n.TEXTURE_MIN_FILTER,ie[g.minFilter]),g.compareFunction&&(n.texParameteri(E,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(E,n.TEXTURE_COMPARE_FUNC,Ne[g.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===Lt||g.minFilter!==Rs&&g.minFilter!==Mi||g.type===En&&e.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||i.get(g).__currentAnisotropy){let F=e.get("EXT_texture_filter_anisotropic");n.texParameterf(E,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,r.getMaxAnisotropy())),i.get(g).__currentAnisotropy=g.anisotropy}}}function ze(E,g){let F=!1;E.__webglInit===void 0&&(E.__webglInit=!0,g.addEventListener("dispose",A));let H=g.source,Y=p.get(H);Y===void 0&&(Y={},p.set(H,Y));let re=G(g);if(re!==E.__cacheKey){Y[re]===void 0&&(Y[re]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,F=!0),Y[re].usedTimes++;let se=Y[E.__cacheKey];se!==void 0&&(Y[E.__cacheKey].usedTimes--,se.usedTimes===0&&C(g)),E.__cacheKey=re,E.__webglTexture=Y[re].texture}return F}function j(E,g,F){return Math.floor(Math.floor(E/F)/g)}function K(E,g,F,H){let re=E.updateRanges;if(re.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,g.width,g.height,F,H,g.data);else{re.sort((Ee,he)=>Ee.start-he.start);let se=0;for(let Ee=1;Ee<re.length;Ee++){let he=re[se],oe=re[Ee],Ae=he.start+he.count,Ie=j(oe.start,g.width,4),Ve=j(he.start,g.width,4);oe.start<=Ae+1&&Ie===Ve&&j(oe.start+oe.count-1,g.width,4)===Ie?he.count=Math.max(he.count,oe.start+oe.count-he.start):(++se,re[se]=oe)}re.length=se+1;let J=t.getParameter(n.UNPACK_ROW_LENGTH),Q=t.getParameter(n.UNPACK_SKIP_PIXELS),ae=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,g.width);for(let Ee=0,he=re.length;Ee<he;Ee++){let oe=re[Ee],Ae=Math.floor(oe.start/4),Ie=Math.ceil(oe.count/4),Ve=Ae%g.width,N=Math.floor(Ae/g.width),le=Ie,$=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Ve),t.pixelStorei(n.UNPACK_SKIP_ROWS,N),t.texSubImage2D(n.TEXTURE_2D,0,Ve,N,le,$,F,H,g.data)}E.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,J),t.pixelStorei(n.UNPACK_SKIP_PIXELS,Q),t.pixelStorei(n.UNPACK_SKIP_ROWS,ae)}}function ue(E,g,F){let H=n.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(H=n.TEXTURE_2D_ARRAY),g.isData3DTexture&&(H=n.TEXTURE_3D);let Y=ze(E,g),re=g.source;t.bindTexture(H,E.__webglTexture,n.TEXTURE0+F);let se=i.get(re);if(re.version!==se.__version||Y===!0){if(t.activeTexture(n.TEXTURE0+F),(typeof ImageBitmap<"u"&&g.image instanceof ImageBitmap)===!1){let $=qe.getPrimaries(qe.workingColorSpace),ce=g.colorSpace===Kn?null:qe.getPrimaries(g.colorSpace),ge=g.colorSpace===Kn||$===ce?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge)}t.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment);let Q=m(g.image,!1,r.maxTextureSize);Q=pt(g,Q);let ae=s.convert(g.format,g.colorSpace),Ee=s.convert(g.type),he=S(g.internalFormat,ae,Ee,g.normalized,g.colorSpace,g.isVideoTexture);be(H,g);let oe,Ae=g.mipmaps,Ie=g.isVideoTexture!==!0,Ve=se.__version===void 0||Y===!0,N=re.dataReady,le=M(g,Q);if(g.isDepthTexture)he=b(g.format===wi,g.type),Ve&&(Ie?t.texStorage2D(n.TEXTURE_2D,1,he,Q.width,Q.height):t.texImage2D(n.TEXTURE_2D,0,he,Q.width,Q.height,0,ae,Ee,null));else if(g.isDataTexture)if(Ae.length>0){Ie&&Ve&&t.texStorage2D(n.TEXTURE_2D,le,he,Ae[0].width,Ae[0].height);for(let $=0,ce=Ae.length;$<ce;$++)oe=Ae[$],Ie?N&&t.texSubImage2D(n.TEXTURE_2D,$,0,0,oe.width,oe.height,ae,Ee,oe.data):t.texImage2D(n.TEXTURE_2D,$,he,oe.width,oe.height,0,ae,Ee,oe.data);g.generateMipmaps=!1}else Ie?(Ve&&t.texStorage2D(n.TEXTURE_2D,le,he,Q.width,Q.height),N&&K(g,Q,ae,Ee)):t.texImage2D(n.TEXTURE_2D,0,he,Q.width,Q.height,0,ae,Ee,Q.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){Ie&&Ve&&t.texStorage3D(n.TEXTURE_2D_ARRAY,le,he,Ae[0].width,Ae[0].height,Q.depth);for(let $=0,ce=Ae.length;$<ce;$++)if(oe=Ae[$],g.format!==gn)if(ae!==null)if(Ie){if(N)if(g.layerUpdates.size>0){let ge=qc(oe.width,oe.height,g.format,g.type);for(let ne of g.layerUpdates){let Ce=oe.data.subarray(ne*ge/oe.data.BYTES_PER_ELEMENT,(ne+1)*ge/oe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,ne,oe.width,oe.height,1,ae,Ce)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,oe.width,oe.height,Q.depth,ae,oe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,$,he,oe.width,oe.height,Q.depth,0,oe.data,0,0);else Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ie?N&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,oe.width,oe.height,Q.depth,ae,Ee,oe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,$,he,oe.width,oe.height,Q.depth,0,ae,Ee,oe.data);g.layerUpdates.size>0&&g.clearLayerUpdates()}else{Ie&&Ve&&t.texStorage2D(n.TEXTURE_2D,le,he,Ae[0].width,Ae[0].height);for(let $=0,ce=Ae.length;$<ce;$++)oe=Ae[$],g.format!==gn?ae!==null?Ie?N&&t.compressedTexSubImage2D(n.TEXTURE_2D,$,0,0,oe.width,oe.height,ae,oe.data):t.compressedTexImage2D(n.TEXTURE_2D,$,he,oe.width,oe.height,0,oe.data):Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ie?N&&t.texSubImage2D(n.TEXTURE_2D,$,0,0,oe.width,oe.height,ae,Ee,oe.data):t.texImage2D(n.TEXTURE_2D,$,he,oe.width,oe.height,0,ae,Ee,oe.data)}else if(g.isDataArrayTexture)if(Ie){if(Ve&&t.texStorage3D(n.TEXTURE_2D_ARRAY,le,he,Q.width,Q.height,Q.depth),N)if(g.layerUpdates.size>0){let $=qc(Q.width,Q.height,g.format,g.type);for(let ce of g.layerUpdates){let ge=Q.data.subarray(ce*$/Q.data.BYTES_PER_ELEMENT,(ce+1)*$/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ce,Q.width,Q.height,1,ae,Ee,ge)}g.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,ae,Ee,Q.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,he,Q.width,Q.height,Q.depth,0,ae,Ee,Q.data);else if(g.isData3DTexture)Ie?(Ve&&t.texStorage3D(n.TEXTURE_3D,le,he,Q.width,Q.height,Q.depth),N&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,ae,Ee,Q.data)):t.texImage3D(n.TEXTURE_3D,0,he,Q.width,Q.height,Q.depth,0,ae,Ee,Q.data);else if(g.isFramebufferTexture){if(Ve)if(Ie)t.texStorage2D(n.TEXTURE_2D,le,he,Q.width,Q.height);else{let $=Q.width,ce=Q.height;for(let ge=0;ge<le;ge++)t.texImage2D(n.TEXTURE_2D,ge,he,$,ce,0,ae,Ee,null),$>>=1,ce>>=1}}else if(g.isHTMLTexture){if("texElementImage2D"in n){let $=n.canvas;if($.hasAttribute("layoutsubtree")||$.setAttribute("layoutsubtree","true"),Q.parentNode!==$){$.appendChild(Q),d.add(g),$.onpaint=ce=>{let ge=ce.changedElements;for(let ne of d)ge.includes(ne.image)&&(ne.needsUpdate=!0)},$.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,Q);else{let ge=n.RGBA,ne=n.RGBA,Ce=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,ge,ne,Ce,Q)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ae.length>0){if(Ie&&Ve){let $=Qe(Ae[0]);t.texStorage2D(n.TEXTURE_2D,le,he,$.width,$.height)}for(let $=0,ce=Ae.length;$<ce;$++)oe=Ae[$],Ie?N&&t.texSubImage2D(n.TEXTURE_2D,$,0,0,ae,Ee,oe):t.texImage2D(n.TEXTURE_2D,$,he,ae,Ee,oe);g.generateMipmaps=!1}else if(Ie){if(Ve){let $=Qe(Q);t.texStorage2D(n.TEXTURE_2D,le,he,$.width,$.height)}N&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ae,Ee,Q)}else t.texImage2D(n.TEXTURE_2D,0,he,ae,Ee,Q);f(g)&&T(H),se.__version=re.version,g.onUpdate&&g.onUpdate(g)}E.__version=g.version}function Ue(E,g,F){if(g.image.length!==6)return;let H=ze(E,g),Y=g.source;t.bindTexture(n.TEXTURE_CUBE_MAP,E.__webglTexture,n.TEXTURE0+F);let re=i.get(Y);if(Y.version!==re.__version||H===!0){t.activeTexture(n.TEXTURE0+F);let se=qe.getPrimaries(qe.workingColorSpace),J=g.colorSpace===Kn?null:qe.getPrimaries(g.colorSpace),Q=g.colorSpace===Kn||se===J?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q);let ae=g.isCompressedTexture||g.image[0].isCompressedTexture,Ee=g.image[0]&&g.image[0].isDataTexture,he=[];for(let ne=0;ne<6;ne++)!ae&&!Ee?he[ne]=m(g.image[ne],!0,r.maxCubemapSize):he[ne]=Ee?g.image[ne].image:g.image[ne],he[ne]=pt(g,he[ne]);let oe=he[0],Ae=s.convert(g.format,g.colorSpace),Ie=s.convert(g.type),Ve=S(g.internalFormat,Ae,Ie,g.normalized,g.colorSpace),N=g.isVideoTexture!==!0,le=re.__version===void 0||H===!0,$=Y.dataReady,ce=M(g,oe);be(n.TEXTURE_CUBE_MAP,g);let ge;if(ae){N&&le&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ce,Ve,oe.width,oe.height);for(let ne=0;ne<6;ne++){ge=he[ne].mipmaps;for(let Ce=0;Ce<ge.length;Ce++){let we=ge[Ce];g.format!==gn?Ae!==null?N?$&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ce,0,0,we.width,we.height,Ae,we.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ce,Ve,we.width,we.height,0,we.data):Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?$&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ce,0,0,we.width,we.height,Ae,Ie,we.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ce,Ve,we.width,we.height,0,Ae,Ie,we.data)}}}else{if(ge=g.mipmaps,N&&le){ge.length>0&&ce++;let ne=Qe(he[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ce,Ve,ne.width,ne.height)}for(let ne=0;ne<6;ne++)if(Ee){N?$&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,he[ne].width,he[ne].height,Ae,Ie,he[ne].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,Ve,he[ne].width,he[ne].height,0,Ae,Ie,he[ne].data);for(let Ce=0;Ce<ge.length;Ce++){let lt=ge[Ce].image[ne].image;N?$&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ce+1,0,0,lt.width,lt.height,Ae,Ie,lt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ce+1,Ve,lt.width,lt.height,0,Ae,Ie,lt.data)}}else{N?$&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,Ae,Ie,he[ne]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,Ve,Ae,Ie,he[ne]);for(let Ce=0;Ce<ge.length;Ce++){let we=ge[Ce];N?$&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ce+1,0,0,Ae,Ie,we.image[ne]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ce+1,Ve,Ae,Ie,we.image[ne])}}}f(g)&&T(n.TEXTURE_CUBE_MAP),re.__version=Y.version,g.onUpdate&&g.onUpdate(g)}E.__version=g.version}function _e(E,g,F,H,Y,re){let se=s.convert(F.format,F.colorSpace),J=s.convert(F.type),Q=S(F.internalFormat,se,J,F.normalized,F.colorSpace),ae=i.get(g),Ee=i.get(F);if(Ee.__renderTarget=g,!ae.__hasExternalTextures){let he=Math.max(1,g.width>>re),oe=Math.max(1,g.height>>re);Y===n.TEXTURE_3D||Y===n.TEXTURE_2D_ARRAY?t.texImage3D(Y,re,Q,he,oe,g.depth,0,se,J,null):t.texImage2D(Y,re,Q,he,oe,0,se,J,null)}t.bindFramebuffer(n.FRAMEBUFFER,E),ft(g)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,H,Y,Ee.__webglTexture,0,Ye(g)):(Y===n.TEXTURE_2D||Y>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,H,Y,Ee.__webglTexture,re),t.bindFramebuffer(n.FRAMEBUFFER,null)}function He(E,g,F){if(n.bindRenderbuffer(n.RENDERBUFFER,E),g.depthBuffer){let H=g.depthTexture,Y=H&&H.isDepthTexture?H.type:null,re=b(g.stencilBuffer,Y),se=g.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;ft(g)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ye(g),re,g.width,g.height):F?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ye(g),re,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,re,g.width,g.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,se,n.RENDERBUFFER,E)}else{let H=g.textures;for(let Y=0;Y<H.length;Y++){let re=H[Y],se=s.convert(re.format,re.colorSpace),J=s.convert(re.type),Q=S(re.internalFormat,se,J,re.normalized,re.colorSpace);ft(g)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ye(g),Q,g.width,g.height):F?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ye(g),Q,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,Q,g.width,g.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function wt(E,g,F){let H=g.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,E),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Y=i.get(g.depthTexture);if(Y.__renderTarget=g,(!Y.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),H){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,g.depthTexture.addEventListener("dispose",A)),Y.__webglTexture===void 0){Y.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture),be(n.TEXTURE_CUBE_MAP,g.depthTexture);let ae=s.convert(g.depthTexture.format),Ee=s.convert(g.depthTexture.type),he;g.depthTexture.format===Nn?he=n.DEPTH_COMPONENT24:g.depthTexture.format===wi&&(he=n.DEPTH24_STENCIL8);for(let oe=0;oe<6;oe++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,he,g.width,g.height,0,ae,Ee,null)}}else te(g.depthTexture,0);let re=Y.__webglTexture,se=Ye(g),J=H?n.TEXTURE_CUBE_MAP_POSITIVE_X+F:n.TEXTURE_2D,Q=g.depthTexture.format===wi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(g.depthTexture.format===Nn)ft(g)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Q,J,re,0,se):n.framebufferTexture2D(n.FRAMEBUFFER,Q,J,re,0);else if(g.depthTexture.format===wi)ft(g)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Q,J,re,0,se):n.framebufferTexture2D(n.FRAMEBUFFER,Q,J,re,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Be(E){let g=i.get(E),F=E.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==E.depthTexture){let H=E.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),H){let Y=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,H.removeEventListener("dispose",Y)};H.addEventListener("dispose",Y),g.__depthDisposeCallback=Y}g.__boundDepthTexture=H}if(E.depthTexture&&!g.__autoAllocateDepthBuffer)if(F)for(let H=0;H<6;H++)wt(g.__webglFramebuffer[H],E,H);else{let H=E.texture.mipmaps;H&&H.length>0?wt(g.__webglFramebuffer[0],E,0):wt(g.__webglFramebuffer,E,0)}else if(F){g.__webglDepthbuffer=[];for(let H=0;H<6;H++)if(t.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer[H]),g.__webglDepthbuffer[H]===void 0)g.__webglDepthbuffer[H]=n.createRenderbuffer(),He(g.__webglDepthbuffer[H],E,!1);else{let Y=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,re=g.__webglDepthbuffer[H];n.bindRenderbuffer(n.RENDERBUFFER,re),n.framebufferRenderbuffer(n.FRAMEBUFFER,Y,n.RENDERBUFFER,re)}}else{let H=E.texture.mipmaps;if(H&&H.length>0?t.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=n.createRenderbuffer(),He(g.__webglDepthbuffer,E,!1);else{let Y=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,re=g.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,re),n.framebufferRenderbuffer(n.FRAMEBUFFER,Y,n.RENDERBUFFER,re)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ze(E,g,F){let H=i.get(E);g!==void 0&&_e(H.__webglFramebuffer,E,E.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),F!==void 0&&Be(E)}function $e(E){let g=E.texture,F=i.get(E),H=i.get(g);E.addEventListener("dispose",v);let Y=E.textures,re=E.isWebGLCubeRenderTarget===!0,se=Y.length>1;if(se||(H.__webglTexture===void 0&&(H.__webglTexture=n.createTexture()),H.__version=g.version,a.memory.textures++),re){F.__webglFramebuffer=[];for(let J=0;J<6;J++)if(g.mipmaps&&g.mipmaps.length>0){F.__webglFramebuffer[J]=[];for(let Q=0;Q<g.mipmaps.length;Q++)F.__webglFramebuffer[J][Q]=n.createFramebuffer()}else F.__webglFramebuffer[J]=n.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){F.__webglFramebuffer=[];for(let J=0;J<g.mipmaps.length;J++)F.__webglFramebuffer[J]=n.createFramebuffer()}else F.__webglFramebuffer=n.createFramebuffer();if(se)for(let J=0,Q=Y.length;J<Q;J++){let ae=i.get(Y[J]);ae.__webglTexture===void 0&&(ae.__webglTexture=n.createTexture(),a.memory.textures++)}if(E.samples>0&&ft(E)===!1){F.__webglMultisampledFramebuffer=n.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let J=0;J<Y.length;J++){let Q=Y[J];F.__webglColorRenderbuffer[J]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,F.__webglColorRenderbuffer[J]);let ae=s.convert(Q.format,Q.colorSpace),Ee=s.convert(Q.type),he=S(Q.internalFormat,ae,Ee,Q.normalized,Q.colorSpace,E.isXRRenderTarget===!0),oe=Ye(E);n.renderbufferStorageMultisample(n.RENDERBUFFER,oe,he,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+J,n.RENDERBUFFER,F.__webglColorRenderbuffer[J])}n.bindRenderbuffer(n.RENDERBUFFER,null),E.depthBuffer&&(F.__webglDepthRenderbuffer=n.createRenderbuffer(),He(F.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(re){t.bindTexture(n.TEXTURE_CUBE_MAP,H.__webglTexture),be(n.TEXTURE_CUBE_MAP,g);for(let J=0;J<6;J++)if(g.mipmaps&&g.mipmaps.length>0)for(let Q=0;Q<g.mipmaps.length;Q++)_e(F.__webglFramebuffer[J][Q],E,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+J,Q);else _e(F.__webglFramebuffer[J],E,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0);f(g)&&T(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(se){for(let J=0,Q=Y.length;J<Q;J++){let ae=Y[J],Ee=i.get(ae),he=n.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(he=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(he,Ee.__webglTexture),be(he,ae),_e(F.__webglFramebuffer,E,ae,n.COLOR_ATTACHMENT0+J,he,0),f(ae)&&T(he)}t.unbindTexture()}else{let J=n.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(J=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(J,H.__webglTexture),be(J,g),g.mipmaps&&g.mipmaps.length>0)for(let Q=0;Q<g.mipmaps.length;Q++)_e(F.__webglFramebuffer[Q],E,g,n.COLOR_ATTACHMENT0,J,Q);else _e(F.__webglFramebuffer,E,g,n.COLOR_ATTACHMENT0,J,0);f(g)&&T(J),t.unbindTexture()}E.depthBuffer&&Be(E)}function We(E){let g=E.textures;for(let F=0,H=g.length;F<H;F++){let Y=g[F];if(f(Y)){let re=P(E),se=i.get(Y).__webglTexture;t.bindTexture(re,se),T(re),t.unbindTexture()}}}let at=[],Re=[];function et(E){if(E.samples>0){if(ft(E)===!1){let g=E.textures,F=E.width,H=E.height,Y=n.COLOR_BUFFER_BIT,re=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,se=i.get(E),J=g.length>1;if(J)for(let ae=0;ae<g.length;ae++)t.bindFramebuffer(n.FRAMEBUFFER,se.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,se.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,se.__webglMultisampledFramebuffer);let Q=E.texture.mipmaps;Q&&Q.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,se.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,se.__webglFramebuffer);for(let ae=0;ae<g.length;ae++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(Y|=n.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(Y|=n.STENCIL_BUFFER_BIT)),J){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,se.__webglColorRenderbuffer[ae]);let Ee=i.get(g[ae]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ee,0)}n.blitFramebuffer(0,0,F,H,0,0,F,H,Y,n.NEAREST),l===!0&&(at.length=0,Re.length=0,at.push(n.COLOR_ATTACHMENT0+ae),E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&(at.push(re),Re.push(re),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Re)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,at))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),J)for(let ae=0;ae<g.length;ae++){t.bindFramebuffer(n.FRAMEBUFFER,se.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.RENDERBUFFER,se.__webglColorRenderbuffer[ae]);let Ee=i.get(g[ae]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,se.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.TEXTURE_2D,Ee,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,se.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&l){let g=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[g])}}}function Ye(E){return Math.min(r.maxSamples,E.samples)}function ft(E){let g=i.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function I(E){let g=a.render.frame;u.get(E)!==g&&(u.set(E,g),E.update())}function pt(E,g){let F=E.colorSpace,H=E.format,Y=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||F!==is&&F!==Kn&&(qe.getTransfer(F)===Ke?(H!==gn||Y!==Kt)&&Le("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Oe("WebGLTextures: Unsupported texture color space:",F)),g}function Qe(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=X,this.resetTextureUnits=B,this.getTextureUnits=R,this.setTextureUnits=U,this.setTexture2D=te,this.setTexture2DArray=W,this.setTexture3D=ee,this.setTextureCube=Z,this.rebindTextures=Ze,this.setupRenderTarget=$e,this.updateRenderTargetMipmap=We,this.updateMultisampleRenderTarget=et,this.setupDepthRenderbuffer=Be,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=ft,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function ob(n,e){function t(i,r=Kn){let s,a=qe.getTransfer(r);if(i===Kt)return n.UNSIGNED_BYTE;if(i===_o)return n.UNSIGNED_SHORT_4_4_4_4;if(i===vo)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Nc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Oc)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Dc)return n.BYTE;if(i===Lc)return n.SHORT;if(i===Ar)return n.UNSIGNED_SHORT;if(i===go)return n.INT;if(i===Tn)return n.UNSIGNED_INT;if(i===En)return n.FLOAT;if(i===Bt)return n.HALF_FLOAT;if(i===Uc)return n.ALPHA;if(i===Fc)return n.RGB;if(i===gn)return n.RGBA;if(i===Nn)return n.DEPTH_COMPONENT;if(i===wi)return n.DEPTH_STENCIL;if(i===Bc)return n.RED;if(i===yo)return n.RED_INTEGER;if(i===Ti)return n.RG;if(i===xo)return n.RG_INTEGER;if(i===bo)return n.RGBA_INTEGER;if(i===Is||i===Ds||i===Ls||i===Ns)if(a===Ke)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Is)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ds)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ls)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ns)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Is)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ds)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ls)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ns)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===So||i===Mo||i===wo||i===To)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===So)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Mo)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===wo)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===To)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Eo||i===Ao||i===Co||i===Po||i===Ro||i===Os||i===Io)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Eo||i===Ao)return a===Ke?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Co)return a===Ke?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===Po)return s.COMPRESSED_R11_EAC;if(i===Ro)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Os)return s.COMPRESSED_RG11_EAC;if(i===Io)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Do||i===Lo||i===No||i===Oo||i===Uo||i===Fo||i===Bo||i===zo||i===Vo||i===ko||i===Go||i===Ho||i===Wo||i===qo)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Do)return a===Ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Lo)return a===Ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===No)return a===Ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Oo)return a===Ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Uo)return a===Ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Fo)return a===Ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Bo)return a===Ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===zo)return a===Ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Vo)return a===Ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ko)return a===Ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Go)return a===Ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ho)return a===Ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Wo)return a===Ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===qo)return a===Ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Xo||i===jo||i===Yo)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Xo)return a===Ke?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===jo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Yo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Zo||i===Jo||i===Us||i===Ko)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Zo)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Jo)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Us)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ko)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Cr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var lb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,cb=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,su=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new fs(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new xt({vertexShader:lb,fragmentShader:cb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ft(new gi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},au=class extends On{constructor(e,t){super();let i=this,r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,h=null,p=null,_=null,x=typeof XRWebGLBinding<"u",m=new su,f={},T=t.getContextAttributes(),P=null,S=null,b=[],M=[],A=new Pe,v=null,w=null,C=new Ot;C.viewport=new rt;let L=new Ot;L.viewport=new rt;let O=[C,L],B=new uo,R=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let K=b[j];return K===void 0&&(K=new br,b[j]=K),K.getTargetRaySpace()},this.getControllerGrip=function(j){let K=b[j];return K===void 0&&(K=new br,b[j]=K),K.getGripSpace()},this.getHand=function(j){let K=b[j];return K===void 0&&(K=new br,b[j]=K),K.getHandSpace()};function X(j){let K=M.indexOf(j.inputSource);if(K===-1)return;let ue=b[K];ue!==void 0&&(ue.update(j.inputSource,j.frame,c||a),ue.dispatchEvent({type:j.type,data:j.inputSource}))}function G(){r.removeEventListener("select",X),r.removeEventListener("selectstart",X),r.removeEventListener("selectend",X),r.removeEventListener("squeeze",X),r.removeEventListener("squeezestart",X),r.removeEventListener("squeezeend",X),r.removeEventListener("end",G),r.removeEventListener("inputsourceschange",te);for(let j=0;j<b.length;j++){let K=M[j];K!==null&&(M[j]=null,b[j].disconnect(K))}R=null,U=null,m.reset();for(let j in f)delete f[j];if(e.setRenderTarget(P),p=null,h=null,d=null,r=null,S=null,ze.stop(),i.isPresenting=!1,e.setPixelRatio(v),e.setSize(A.width,A.height,!1),w!==null){let j=w.camera;j.fov=w.fov,j.zoom=w.zoom,j.updateProjectionMatrix(),w=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){s=j,i.isPresenting===!0&&Le("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,i.isPresenting===!0&&Le("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(j){if(r=j,r!==null){if(P=e.getRenderTarget(),r.addEventListener("select",X),r.addEventListener("selectstart",X),r.addEventListener("selectend",X),r.addEventListener("squeeze",X),r.addEventListener("squeezestart",X),r.addEventListener("squeezeend",X),r.addEventListener("end",G),r.addEventListener("inputsourceschange",te),T.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(A),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ue=null,Ue=null,_e=null;T.depth&&(_e=T.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ue=T.stencil?wi:Nn,Ue=T.stencil?Cr:Tn);let He={colorFormat:t.RGBA8,depthFormat:_e,scaleFactor:s};d=this.getBinding(),h=d.createProjectionLayer(He),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),S=new At(h.textureWidth,h.textureHeight,{format:gn,type:Kt,depthTexture:new mi(h.textureWidth,h.textureHeight,Ue,void 0,void 0,void 0,void 0,void 0,void 0,ue),stencilBuffer:T.stencil,colorSpace:e.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{let ue={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,ue),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new At(p.framebufferWidth,p.framebufferHeight,{format:gn,type:Kt,colorSpace:e.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),ze.setContext(r),ze.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function te(j){for(let K=0;K<j.removed.length;K++){let ue=j.removed[K],Ue=M.indexOf(ue);Ue>=0&&(M[Ue]=null,b[Ue].disconnect(ue))}for(let K=0;K<j.added.length;K++){let ue=j.added[K],Ue=M.indexOf(ue);if(Ue===-1){for(let He=0;He<b.length;He++)if(He>=M.length){M.push(ue),Ue=He;break}else if(M[He]===null){M[He]=ue,Ue=He;break}if(Ue===-1)break}let _e=b[Ue];_e&&_e.connect(ue)}}let W=new z,ee=new z;function Z(j,K,ue){W.setFromMatrixPosition(K.matrixWorld),ee.setFromMatrixPosition(ue.matrixWorld);let Ue=W.distanceTo(ee),_e=K.projectionMatrix.elements,He=ue.projectionMatrix.elements,wt=_e[14]/(_e[10]-1),Be=_e[14]/(_e[10]+1),Ze=(_e[9]+1)/_e[5],$e=(_e[9]-1)/_e[5],We=(_e[8]-1)/_e[0],at=(He[8]+1)/He[0],Re=wt*We,et=wt*at,Ye=Ue/(-We+at),ft=Ye*-We;if(K.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(ft),j.translateZ(Ye),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),_e[10]===-1)j.projectionMatrix.copy(K.projectionMatrix),j.projectionMatrixInverse.copy(K.projectionMatrixInverse);else{let I=wt+Ye,pt=Be+Ye,Qe=Re-ft,E=et+(Ue-ft),g=Ze*Be/pt*I,F=$e*Be/pt*I;j.projectionMatrix.makePerspective(Qe,E,g,F,I,pt),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function pe(j,K){K===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(K.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(r===null)return;let K=j.near,ue=j.far;m.texture!==null&&(m.depthNear>0&&(K=m.depthNear),m.depthFar>0&&(ue=m.depthFar)),B.near=L.near=C.near=K,B.far=L.far=C.far=ue,(R!==B.near||U!==B.far)&&(r.updateRenderState({depthNear:B.near,depthFar:B.far}),R=B.near,U=B.far),B.layers.mask=j.layers.mask|6,C.layers.mask=B.layers.mask&-5,L.layers.mask=B.layers.mask&-3;let Ue=j.parent,_e=B.cameras;pe(B,Ue);for(let He=0;He<_e.length;He++)pe(_e[He],Ue);_e.length===2?Z(B,C,L):B.projectionMatrix.copy(C.projectionMatrix),w===null&&j.isPerspectiveCamera&&(w={camera:j,fov:j.fov,zoom:j.zoom}),ie(j,B,Ue)};function ie(j,K,ue){ue===null?j.matrix.copy(K.matrixWorld):(j.matrix.copy(ue.matrixWorld),j.matrix.invert(),j.matrix.multiply(K.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(K.projectionMatrix),j.projectionMatrixInverse.copy(K.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Ha*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(j){l=j,h!==null&&(h.fixedFoveation=j),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=j)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(B)},this.getCameraTexture=function(j){return f[j]};let Ne=null;function be(j,K){if(u=K.getViewerPose(c||a),_=K,u!==null){let ue=u.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let Ue=!1;ue.length!==B.cameras.length&&(B.cameras.length=0,Ue=!0);for(let Be=0;Be<ue.length;Be++){let Ze=ue[Be],$e=null;if(p!==null)$e=p.getViewport(Ze);else{let at=d.getViewSubImage(h,Ze);$e=at.viewport,Be===0&&(e.setRenderTargetTextures(S,at.colorTexture,at.depthStencilTexture),e.setRenderTarget(S))}let We=O[Be];We===void 0&&(We=new Ot,We.layers.enable(Be),We.viewport=new rt,O[Be]=We),We.matrix.fromArray(Ze.transform.matrix),We.matrix.decompose(We.position,We.quaternion,We.scale),We.projectionMatrix.fromArray(Ze.projectionMatrix),We.projectionMatrixInverse.copy(We.projectionMatrix).invert(),We.viewport.set($e.x,$e.y,$e.width,$e.height),Be===0&&(B.matrix.copy(We.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),Ue===!0&&B.cameras.push(We)}let _e=r.enabledFeatures;if(_e&&_e.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&x){d=i.getBinding();let Be=d.getDepthInformation(ue[0]);Be&&Be.isValid&&Be.texture&&m.init(Be,r.renderState)}if(_e&&_e.includes("camera-access")&&x){e.state.unbindTexture(),d=i.getBinding();for(let Be=0;Be<ue.length;Be++){let Ze=ue[Be].camera;if(Ze){let $e=f[Ze];$e||($e=new fs,f[Ze]=$e);let We=d.getCameraImage(Ze);$e.sourceTexture=We}}}}for(let ue=0;ue<b.length;ue++){let Ue=M[ue],_e=b[ue];Ue!==null&&_e!==void 0&&_e.update(Ue,K,c||a)}Ne&&Ne(j,K),K.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:K}),_=null}let ze=new ff;ze.setAnimationLoop(be),this.setAnimationLoop=function(j){Ne=j},this.dispose=function(){}}},ub=new yt,yf=new Fe;yf.set(-1,0,0,0,1,0,0,0,1);function hb(n,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,Gc(n)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function r(m,f,T,P,S){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?s(m,f):f.isMeshLambertMaterial?(s(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(s(m,f),d(m,f)):f.isMeshPhongMaterial?(s(m,f),u(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(s(m,f),h(m,f),f.isMeshPhysicalMaterial&&p(m,f,S)):f.isMeshMatcapMaterial?(s(m,f),_(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),x(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,T,P):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Xt&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Xt&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let T=e.get(f),P=T.envMap,S=T.envMapRotation;P&&(m.envMap.value=P,m.envMapRotation.value.setFromMatrix4(ub.makeRotationFromEuler(S)).transpose(),P.isCubeTexture&&P.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(yf),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,T,P){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*T,m.scale.value=P*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function h(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,T){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Xt&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.retroreflectivity>0&&(m.retroreflectivity.value=f.retroreflectivity),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,f){f.matcap&&(m.matcap.value=f.matcap)}function x(m,f){let T=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function db(n,e,t,i){let r={},s={},a=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,b){let M=b.program;i.uniformBlockBinding(S,M)}function c(S,b){let M=r[S.id];M===void 0&&(m(S),M=u(S),r[S.id]=M,S.addEventListener("dispose",T));let A=b.program;i.updateUBOMapping(S,A);let v=e.render.frame;s[S.id]!==v&&(h(S),s[S.id]=v)}function u(S){let b=d();S.__bindingPointIndex=b;let M=n.createBuffer(),A=S.__size,v=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,A,v),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,b,M),M}function d(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return Oe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(S){let b=r[S.id],M=S.uniforms,A=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,b);for(let v=0,w=M.length;v<w;v++){let C=M[v];if(Array.isArray(C))for(let L=0,O=C.length;L<O;L++)p(C[L],v,L,A);else p(C,v,0,A)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(S,b,M,A){if(x(S,b,M,A)===!0){let v=S.__offset,w=S.value;if(Array.isArray(w)){let C=0;for(let L=0;L<w.length;L++){let O=w[L],B=f(O);_(O,S.__data,C),typeof O!="number"&&typeof O!="boolean"&&!O.isMatrix3&&!ArrayBuffer.isView(O)&&(C+=B.storage/Float32Array.BYTES_PER_ELEMENT)}}else _(w,S.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,v,S.__data)}}function _(S,b,M){typeof S=="number"||typeof S=="boolean"?b[0]=S:S.isMatrix3?(b[0]=S.elements[0],b[1]=S.elements[1],b[2]=S.elements[2],b[3]=0,b[4]=S.elements[3],b[5]=S.elements[4],b[6]=S.elements[5],b[7]=0,b[8]=S.elements[6],b[9]=S.elements[7],b[10]=S.elements[8],b[11]=0):ArrayBuffer.isView(S)?b.set(new S.constructor(S.buffer,S.byteOffset,b.length)):S.toArray(b,M)}function x(S,b,M,A){let v=S.value,w=b+"_"+M;if(A[w]===void 0)return typeof v=="number"||typeof v=="boolean"?A[w]=v:ArrayBuffer.isView(v)?A[w]=v.slice():A[w]=v.clone(),!0;{let C=A[w];if(typeof v=="number"||typeof v=="boolean"){if(C!==v)return A[w]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(C.equals(v)===!1)return C.copy(v),!0}}return!1}function m(S){let b=S.uniforms,M=0,A=16;for(let w=0,C=b.length;w<C;w++){let L=Array.isArray(b[w])?b[w]:[b[w]];for(let O=0,B=L.length;O<B;O++){let R=L[O],U=Array.isArray(R.value)?R.value:[R.value];for(let X=0,G=U.length;X<G;X++){let te=U[X],W=f(te),ee=M%A,Z=ee%W.boundary,pe=ee+Z;M+=Z,pe!==0&&A-pe<W.storage&&(M+=A-pe),R.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),R.__offset=M,M+=W.storage}}}let v=M%A;return v>0&&(M+=A-v),S.__size=M,S.__cache={},this}function f(S){let b={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(b.boundary=4,b.storage=4):S.isVector2?(b.boundary=8,b.storage=8):S.isVector3||S.isColor?(b.boundary=16,b.storage=12):S.isVector4?(b.boundary=16,b.storage=16):S.isMatrix3?(b.boundary=48,b.storage=48):S.isMatrix4?(b.boundary=64,b.storage=64):S.isTexture?Le("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(b.boundary=16,b.storage=S.byteLength):Le("WebGLRenderer: Unsupported uniform value type.",S),b}function T(S){let b=S.target;b.removeEventListener("dispose",T);let M=a.indexOf(b.__bindingPointIndex);a.splice(M,1),n.deleteBuffer(r[b.id]),delete r[b.id],delete s[b.id]}function P(){for(let S in r)n.deleteBuffer(r[S]);a=[],r={},s={}}return{bind:l,update:c,dispose:P}}var fb=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Bn=null;function pb(){return Bn===null&&(Bn=new Ya(fb,16,16,Ti,Bt),Bn.name="DFG_LUT",Bn.minFilter=Ut,Bn.magFilter=Ut,Bn.wrapS=Ln,Bn.wrapT=Ln,Bn.generateMipmaps=!1,Bn.needsUpdate=!0),Bn}var sl=class{constructor(e={}){let{canvas:t=Bd(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:p=Kt}=e;this.isWebGLRenderer=!0;let _;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=i.getContextAttributes().alpha}else _=a;let x=p,m=new Set([bo,xo,yo]),f=new Set([Kt,Tn,Ar,Cr,_o,vo]),T=new Uint32Array(4),P=new Int32Array(4),S=new z,b=null,M=null,A=[],v=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=wn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let C=this,L=!1,O=null,B=null,R=null,U=null;this._outputColorSpace=qt;let X=0,G=0,te=null,W=-1,ee=null,Z=new rt,pe=new rt,ie=null,Ne=new De(0),be=0,ze=t.width,j=t.height,K=1,ue=null,Ue=null,_e=new rt(0,0,ze,j),He=new rt(0,0,ze,j),wt=!1,Be=new Mr,Ze=!1,$e=!1,We=new yt,at=new z,Re=new rt,et={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ye=!1;function ft(){return te===null?K:1}let I=i;function pt(y,D){return t.getContext(y,D)}let Qe,E,g,F,H,Y,re,se,J,Q,ae,Ee,he,oe,Ae,Ie,Ve,N,le,$,ce,ge,ne;try{let y={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",lt,!1),t.addEventListener("webglcontextrestored",tt,!1),t.addEventListener("webglcontextcreationerror",vn,!1),I===null){let D="webgl2";if(I=pt(D,y),I===null)throw pt(D)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ce()}catch(y){throw t.removeEventListener("webglcontextlost",lt,!1),t.removeEventListener("webglcontextrestored",tt,!1),t.removeEventListener("webglcontextcreationerror",vn,!1),Oe("WebGLRenderer: "+y.message),y}function Ce(){Qe=new by(I),Qe.init(),ce=new ob(I,Qe),E=new hy(I,Qe,e,ce),g=new sb(I,Qe),E.reversedDepthBuffer&&h&&g.buffers.depth.setReversed(!0),B=I.createFramebuffer(),R=I.createFramebuffer(),U=I.createFramebuffer(),F=new wy(I),H=new qx,Y=new ab(I,Qe,g,H,E,ce,F),re=new xy(C),se=new E_(I),ge=new cy(I,se),J=new Sy(I,se,F,ge),Q=new Ey(I,J,se,ge,F),N=new Ty(I,E,Y),Ae=new dy(H),ae=new Wx(C,re,Qe,E,ge,Ae),Ee=new hb(C,H),he=new jx,oe=new Qx(Qe),Ve=new ly(C,re,g,Q,_,l),Ie=new rb(C,Q,E),ne=new db(I,F,E,g),le=new uy(I,Qe,F),$=new My(I,Qe,F),F.programs=ae.programs,C.capabilities=E,C.extensions=Qe,C.properties=H,C.renderLists=he,C.shadowMap=Ie,C.state=g,C.info=F}x!==Kt&&(w=new Cy(x,t.width,t.height,o,r,s));let we=new au(C,I);this.xr=we,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){let y=Qe.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){let y=Qe.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(y){y!==void 0&&(K=y,this.setSize(ze,j,!1))},this.getSize=function(y){return y.set(ze,j)},this.setSize=function(y,D,q=!0){if(we.isPresenting){Le("WebGLRenderer: Can't change size while VR device is presenting.");return}ze=y,j=D,t.width=Math.floor(y*K),t.height=Math.floor(D*K),q===!0&&(t.style.width=y+"px",t.style.height=D+"px"),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,y,D)},this.getDrawingBufferSize=function(y){return y.set(ze*K,j*K).floor()},this.setDrawingBufferSize=function(y,D,q){ze=y,j=D,K=q,t.width=Math.floor(y*q),t.height=Math.floor(D*q),this.setViewport(0,0,y,D)},this.setEffects=function(y){if(x===Kt){Oe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(y){for(let D=0;D<y.length;D++)if(y[D].isOutputPass===!0){Le("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(y||[])},this.getCurrentViewport=function(y){return y.copy(Z)},this.getViewport=function(y){return y.copy(_e)},this.setViewport=function(y,D,q,V){y.isVector4?_e.set(y.x,y.y,y.z,y.w):_e.set(y,D,q,V),g.viewport(Z.copy(_e).multiplyScalar(K).round())},this.getScissor=function(y){return y.copy(He)},this.setScissor=function(y,D,q,V){y.isVector4?He.set(y.x,y.y,y.z,y.w):He.set(y,D,q,V),g.scissor(pe.copy(He).multiplyScalar(K).round())},this.getScissorTest=function(){return wt},this.setScissorTest=function(y){g.setScissorTest(wt=y)},this.setOpaqueSort=function(y){ue=y},this.setTransparentSort=function(y){Ue=y},this.getClearColor=function(y){return y.copy(Ve.getClearColor())},this.setClearColor=function(){Ve.setClearColor(...arguments)},this.getClearAlpha=function(){return Ve.getClearAlpha()},this.setClearAlpha=function(){Ve.setClearAlpha(...arguments)},this.clear=function(y=!0,D=!0,q=!0){let V=0;if(y){let k=!1;if(te!==null){let me=te.texture.format;k=m.has(me)}if(k){let me=te.texture.type,ye=f.has(me),fe=Ve.getClearColor(),Se=Ve.getClearAlpha(),Te=fe.r,ke=fe.g,Xe=fe.b;ye?(T[0]=Te,T[1]=ke,T[2]=Xe,T[3]=Se,I.clearBufferuiv(I.COLOR,0,T)):(P[0]=Te,P[1]=ke,P[2]=Xe,P[3]=Se,I.clearBufferiv(I.COLOR,0,P))}else V|=I.COLOR_BUFFER_BIT}D&&(V|=I.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(V|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&I.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(y){y.setRenderer(this),O=y},this.dispose=function(){t.removeEventListener("webglcontextlost",lt,!1),t.removeEventListener("webglcontextrestored",tt,!1),t.removeEventListener("webglcontextcreationerror",vn,!1),Ve.dispose(),he.dispose(),oe.dispose(),H.dispose(),re.dispose(),Q.dispose(),ge.dispose(),ne.dispose(),ae.dispose(),we.dispose(),we.removeEventListener("sessionstart",Ah),we.removeEventListener("sessionend",Ch),Ci.stop()};function lt(y){y.preventDefault(),kc("WebGLRenderer: Context Lost."),L=!0}function tt(){kc("WebGLRenderer: Context Restored."),L=!1;let y=F.autoReset,D=Ie.enabled,q=Ie.autoUpdate,V=Ie.needsUpdate,k=Ie.type;Ce(),F.autoReset=y,Ie.enabled=D,Ie.autoUpdate=q,Ie.needsUpdate=V,Ie.type=k}function vn(y){Oe("WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function Rn(y){let D=y.target;D.removeEventListener("dispose",Rn),Pg(D)}function Pg(y){Rg(y),H.remove(y)}function Rg(y){let D=H.get(y).programs;D!==void 0&&(D.forEach(function(q){ae.releaseProgram(q)}),y.isShaderMaterial&&ae.releaseShaderCache(y))}this.renderBufferDirect=function(y,D,q,V,k,me){D===null&&(D=et);let ye=k.isMesh&&k.matrixWorld.determinantAffine()<0,fe=Lg(y,D,q,V,k);g.setMaterial(V,ye);let Se=q.index,Te=1;if(V.wireframe===!0){if(Se=J.getWireframeAttribute(q),Se===void 0)return;Te=2}let ke=q.drawRange,Xe=q.attributes.position,Me=ke.start*Te,nt=(ke.start+ke.count)*Te;me!==null&&(Me=Math.max(Me,me.start*Te),nt=Math.min(nt,(me.start+me.count)*Te)),Se!==null?(Me=Math.max(Me,0),nt=Math.min(nt,Se.count)):Xe!=null&&(Me=Math.max(Me,0),nt=Math.min(nt,Xe.count));let Tt=nt-Me;if(Tt<0||Tt===1/0)return;ge.setup(k,V,fe,q,Se);let mt,ot=le;if(Se!==null&&(mt=se.get(Se),ot=$,ot.setIndex(mt)),k.isMesh)V.wireframe===!0?(g.setLineWidth(V.wireframeLinewidth*ft()),ot.setMode(I.LINES)):ot.setMode(I.TRIANGLES);else if(k.isLine){let zt=V.linewidth;zt===void 0&&(zt=1),g.setLineWidth(zt*ft()),k.isLineSegments?ot.setMode(I.LINES):k.isLineLoop?ot.setMode(I.LINE_LOOP):ot.setMode(I.LINE_STRIP)}else k.isPoints?ot.setMode(I.POINTS):k.isSprite&&ot.setMode(I.TRIANGLES);if(k.isBatchedMesh)if(Qe.get("WEBGL_multi_draw"))ot.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{let zt=k._multiDrawStarts,ve=k._multiDrawCounts,Wt=k._multiDrawCount,Je=Se?se.get(Se).bytesPerElement:1,dn=H.get(V).currentProgram.getUniforms();for(let In=0;In<Wt;In++)dn.setValue(I,"_gl_DrawID",In),ot.render(zt[In]/Je,ve[In])}else if(k.isInstancedMesh)ot.renderInstances(Me,Tt,k.count);else if(q.isInstancedBufferGeometry){let zt=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,ve=Math.min(q.instanceCount,zt);ot.renderInstances(Me,Tt,ve)}else ot.render(Me,Tt)};function Eh(y,D,q,V){O!==null&&y.isNodeMaterial&&O.setObject(V,y),Ze===!0&&Ae.setState(y,q,!1),y.transparent===!0&&y.side===Fn&&y.forceSinglePass===!1?(y.side=Xt,y.needsUpdate=!0,ha(y,D,V),y.side=xi,y.needsUpdate=!0,ha(y,D,V),y.side=Fn):ha(y,D,V)}this.compile=function(y,D,q=null){q===null&&(q=y),O!==null&&O.renderStart(y,D,q),M=oe.get(q),M.init(D),v.push(M),q.traverseVisible(function(k){k.isLight&&k.layers.test(D.layers)&&(M.pushLight(k),k.castShadow&&M.pushShadow(k))}),y!==q&&y.traverseVisible(function(k){k.isLight&&k.layers.test(D.layers)&&(M.pushLight(k),k.castShadow&&M.pushShadow(k))}),M.setupLights(),O!==null&&O.updateLights(M.state.lightsArray),$e=this.localClippingEnabled,Ze=Ae.init(this.clippingPlanes,$e),Ze===!0&&Ae.setGlobalState(this.clippingPlanes,D),O!==null&&Ie.render(M.state.shadowsArray,q,D);let V=new Set;return y.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;let me=k.material;if(me)if(Array.isArray(me))for(let ye=0;ye<me.length;ye++){let fe=me[ye];Eh(fe,q,D,k),V.add(fe)}else Eh(me,q,D,k),V.add(me)}),M=v.pop(),O!==null&&O.renderEnd(),V},this.compileAsync=function(y,D,q=null){let V=this.compile(y,D,q);return new Promise(k=>{function me(){if(V.forEach(function(ye){let Se=H.get(ye).currentProgram;(Se===void 0||Se.isReady())&&V.delete(ye)}),V.size===0){k(y);return}setTimeout(me,10)}Qe.get("KHR_parallel_shader_compile")!==null?me():setTimeout(me,10)})};let jl=null;function Ig(y){jl&&jl(y)}function Ah(){Ci.stop()}function Ch(){Ci.start()}let Ci=new ff;Ci.setAnimationLoop(Ig),typeof self<"u"&&Ci.setContext(self),this.setAnimationLoop=function(y){jl=y,we.setAnimationLoop(y),y===null?Ci.stop():Ci.start()},we.addEventListener("sessionstart",Ah),we.addEventListener("sessionend",Ch),this.render=function(y,D){if(D!==void 0&&D.isCamera!==!0){Oe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;O!==null&&O.renderStart(y,D);let q=we.enabled===!0&&we.isPresenting===!0,V=w!==null&&(te===null||q)&&w.begin(C,te);if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),we.enabled===!0&&we.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(we.cameraAutoUpdate===!0&&we.updateCamera(D),D=we.getCamera()),y.isScene===!0&&y.onBeforeRender(C,y,D,te),M=oe.get(y,v.length),M.init(D),M.state.textureUnits=Y.getTextureUnits(),v.push(M),We.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Be.setFromProjectionMatrix(We,Mn,D.reversedDepth),$e=this.localClippingEnabled,Ze=Ae.init(this.clippingPlanes,$e),b=he.get(y,A.length),b.init(),A.push(b),we.enabled===!0&&we.isPresenting===!0){let ye=C.xr.getDepthSensingMesh();ye!==null&&Yl(ye,D,-1/0,C.sortObjects)}Yl(y,D,0,C.sortObjects),b.finish(),O!==null&&O.updateLights(M.state.lightsArray),C.sortObjects===!0&&b.sort(ue,Ue),Ye=we.enabled===!1||we.isPresenting===!1||we.hasDepthSensing()===!1,Ye&&Ve.addToRenderList(b,y),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ze===!0&&Ae.beginShadows();let k=M.state.shadowsArray;if(Ie.render(k,y,D),Ze===!0&&Ae.endShadows(),(V&&w.hasRenderPass())===!1){let ye=b.opaque,fe=b.transmissive;if(M.setupLights(),D.isArrayCamera){let Se=D.cameras;if(fe.length>0)for(let Te=0,ke=Se.length;Te<ke;Te++){let Xe=Se[Te];Rh(ye,fe,y,Xe)}Ye&&Ve.render(y);for(let Te=0,ke=Se.length;Te<ke;Te++){let Xe=Se[Te];Ph(b,y,Xe,Xe.viewport)}}else fe.length>0&&Rh(ye,fe,y,D),Ye&&Ve.render(y),Ph(b,y,D)}te!==null&&G===0&&(Y.updateMultisampleRenderTarget(te),Y.updateRenderTargetMipmap(te)),V&&w.end(C),y.isScene===!0&&y.onAfterRender(C,y,D),ge.resetDefaultState(),W=-1,ee=null,v.pop(),v.length>0?(M=v[v.length-1],Y.setTextureUnits(M.state.textureUnits),Ze===!0&&Ae.setGlobalState(C.clippingPlanes,M.state.camera)):M=null,A.pop(),A.length>0?b=A[A.length-1]:b=null,O!==null&&O.renderEnd()};function Yl(y,D,q,V){if(y.visible===!1)return;if(y.layers.test(D.layers)){if(y.isGroup)q=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(D);else if(y.isLightProbeGrid)M.pushLightProbeGrid(y);else if(y.isLight)M.pushLight(y),y.castShadow&&M.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||y.intersectsFrustum(Be)){V&&Re.setFromMatrixPosition(y.matrixWorld).applyMatrix4(We);let ye=Q.update(y),fe=y.material;fe.visible&&b.push(y,ye,fe,q,Re.z,null,D)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||y.intersectsFrustum(Be))){let ye=Q.update(y),fe=y.material;if(V&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Re.copy(y.boundingSphere.center)):(ye.boundingSphere===null&&ye.computeBoundingSphere(),Re.copy(ye.boundingSphere.center)),Re.applyMatrix4(y.matrixWorld).applyMatrix4(We)),Array.isArray(fe)){let Se=ye.groups;for(let Te=0,ke=Se.length;Te<ke;Te++){let Xe=Se[Te],Me=fe[Xe.materialIndex];Me&&Me.visible&&b.push(y,ye,Me,q,Re.z,Xe,D)}}else fe.visible&&b.push(y,ye,fe,q,Re.z,null,D)}}let me=y.children;for(let ye=0,fe=me.length;ye<fe;ye++)Yl(me[ye],D,q,V)}function Ph(y,D,q,V){let{opaque:k,transmissive:me,transparent:ye}=y;M.setupLightsView(q),Ze===!0&&Ae.setGlobalState(C.clippingPlanes,q),V&&g.viewport(Z.copy(V)),k.length>0&&ua(k,D,q),me.length>0&&ua(me,D,q),ye.length>0&&ua(ye,D,q),g.buffers.depth.setTest(!0),g.buffers.depth.setMask(!0),g.buffers.color.setMask(!0),g.setPolygonOffset(!1)}function Rh(y,D,q,V){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[V.id]===void 0){let Me=Qe.has("EXT_color_buffer_half_float")||Qe.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[V.id]=new At(1,1,{generateMipmaps:!0,type:Me?Bt:Kt,minFilter:Mi,samples:Math.max(4,E.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:qe.workingColorSpace})}let me=M.state.transmissionRenderTarget[V.id],ye=V.viewport||Z;me.setSize(ye.z*C.transmissionResolutionScale,ye.w*C.transmissionResolutionScale);let fe=C.getRenderTarget(),Se=C.getActiveCubeFace(),Te=C.getActiveMipmapLevel();C.setRenderTarget(me),C.getClearColor(Ne),be=C.getClearAlpha(),be<1&&C.setClearColor(16777215,.5),C.clear(),Ye&&Ve.render(q);let ke=C.toneMapping;C.toneMapping=wn;let Xe=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),M.setupLightsView(V),Ze===!0&&Ae.setGlobalState(C.clippingPlanes,V),ua(y,q,V),Y.updateMultisampleRenderTarget(me),Y.updateRenderTargetMipmap(me),Qe.has("WEBGL_multisampled_render_to_texture")===!1){let Me=!1;for(let nt=0,Tt=D.length;nt<Tt;nt++){let mt=D[nt],{object:ot,geometry:zt,material:ve,group:Wt}=mt;if(ve.side===Fn&&ot.layers.test(V.layers)){let Je=ve.side;ve.side=Xt,ve.needsUpdate=!0,Ih(ot,q,V,zt,ve,Wt),ve.side=Je,ve.needsUpdate=!0,Me=!0}}Me===!0&&(Y.updateMultisampleRenderTarget(me),Y.updateRenderTargetMipmap(me))}C.setRenderTarget(fe,Se,Te),C.setClearColor(Ne,be),Xe!==void 0&&(V.viewport=Xe),C.toneMapping=ke}function ua(y,D,q){let V=D.isScene===!0?D.overrideMaterial:null;for(let k=0,me=y.length;k<me;k++){let ye=y[k],{object:fe,geometry:Se,group:Te}=ye,ke=ye.material;ke.allowOverride===!0&&V!==null&&(ke=V),fe.layers.test(q.layers)&&Ih(fe,D,q,Se,ke,Te)}}function Ih(y,D,q,V,k,me){O!==null&&k.isNodeMaterial&&O.setObject(y,k),y.onBeforeRender(C,D,q,V,k,me),y.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),k.onBeforeRender(C,D,q,V,y,me),k.transparent===!0&&k.side===Fn&&k.forceSinglePass===!1?(k.side=Xt,k.needsUpdate=!0,C.renderBufferDirect(q,D,V,k,y,me),k.side=xi,k.needsUpdate=!0,C.renderBufferDirect(q,D,V,k,y,me),k.side=Fn):C.renderBufferDirect(q,D,V,k,y,me),y.onAfterRender(C,D,q,V,k,me)}function ha(y,D,q){D.isScene!==!0&&(D=et);let V=H.get(y),k=M.state.lights,me=M.state.shadowsArray,ye=k.state.version,fe=ae.getParameters(y,k.state,me,D,q,M.state.lightProbeGridArray),Se=ae.getProgramCacheKey(fe),Te=V.programs;V.environment=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?D.environment:null,V.fog=D.fog;let ke=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap;V.envMap=re.get(y.envMap||V.environment,ke),V.envMapRotation=V.environment!==null&&y.envMap===null?D.environmentRotation:y.envMapRotation,Te===void 0&&(y.addEventListener("dispose",Rn),Te=new Map,V.programs=Te);let Xe=Te.get(Se);if(Xe!==void 0){if(V.currentProgram===Xe&&V.lightsStateVersion===ye)return Lh(y,fe),Xe}else fe.uniforms=ae.getUniforms(y),O!==null&&y.isNodeMaterial&&O.build(y,q,fe),y.onBeforeCompile(fe,C),Xe=ae.acquireProgram(fe,Se),Te.set(Se,Xe),V.uniforms=fe.uniforms;let Me=V.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Me.clippingPlanes=Ae.uniform),Lh(y,fe),V.needsLights=Og(y),V.lightsStateVersion=ye,V.needsLights&&(Me.ambientLightColor.value=k.state.ambient,Me.lightProbe.value=k.state.probe,Me.sunLights.value=k.state.sun,Me.sunLightShadows.value=k.state.sunShadow,Me.directionalLights.value=k.state.directional,Me.directionalLightShadows.value=k.state.directionalShadow,Me.spotLights.value=k.state.spot,Me.spotLightShadows.value=k.state.spotShadow,Me.rectAreaLights.value=k.state.rectArea,Me.ltc_1.value=k.state.rectAreaLTC1,Me.ltc_2.value=k.state.rectAreaLTC2,Me.pointLights.value=k.state.point,Me.pointLightShadows.value=k.state.pointShadow,Me.hemisphereLights.value=k.state.hemi,Me.sunShadowMatrix.value=k.state.sunShadowMatrix,Me.sunShadowCascade.value=k.state.sunShadowCascade,Me.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Me.spotLightMatrix.value=k.state.spotLightMatrix,Me.spotLightMap.value=k.state.spotLightMap,Me.pointShadowMatrix.value=k.state.pointShadowMatrix),V.lightProbeGrid=M.state.lightProbeGridArray.length>0,V.currentProgram=Xe,V.uniformsList=null,Xe}function Dh(y){if(y.uniformsList===null){let D=y.currentProgram.getUniforms();y.uniformsList=Ir.seqWithValue(D.seq,y.uniforms)}return y.uniformsList}function Lh(y,D){let q=H.get(y);q.outputColorSpace=D.outputColorSpace,q.batching=D.batching,q.batchingColor=D.batchingColor,q.instancing=D.instancing,q.instancingColor=D.instancingColor,q.instancingMorph=D.instancingMorph,q.skinning=D.skinning,q.morphTargets=D.morphTargets,q.morphNormals=D.morphNormals,q.morphColors=D.morphColors,q.morphTargetsCount=D.morphTargetsCount,q.numClippingPlanes=D.numClippingPlanes,q.numIntersection=D.numClipIntersection,q.vertexAlphas=D.vertexAlphas,q.vertexTangents=D.vertexTangents,q.toneMapping=D.toneMapping}function Dg(y,D){if(y.length===0)return null;if(y.length===1)return y[0].texture!==null?y[0]:null;S.setFromMatrixPosition(D.matrixWorld);for(let q=0,V=y.length;q<V;q++){let k=y[q];if(k.texture!==null&&k.boundingBox.containsPoint(S))return k}return null}function Lg(y,D,q,V,k){D.isScene!==!0&&(D=et),Y.resetTextureUnits();let me=D.fog,ye=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?D.environment:null,fe=te===null?C.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:qe.workingColorSpace,Se=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,Te=re.get(V.envMap||ye,Se),ke=V.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,Xe=!!q.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Me=!!q.morphAttributes.position,nt=!!q.morphAttributes.normal,Tt=!!q.morphAttributes.color,mt=wn;V.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(mt=C.toneMapping);let ot=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,zt=ot!==void 0?ot.length:0,ve=H.get(V),Wt=M.state.lights;if(Ze===!0&&($e===!0||y!==ee)){let ct=y===ee&&V.id===W;Ae.setState(V,y,ct)}let Je=!1;V.version===ve.__version?(ve.needsLights&&ve.lightsStateVersion!==Wt.state.version||ve.outputColorSpace!==fe||k.isBatchedMesh&&ve.batching===!1||!k.isBatchedMesh&&ve.batching===!0||k.isBatchedMesh&&ve.batchingColor===!0&&k._colorsTexture===null||k.isBatchedMesh&&ve.batchingColor===!1&&k._colorsTexture!==null||k.isInstancedMesh&&ve.instancing===!1||!k.isInstancedMesh&&ve.instancing===!0||k.isSkinnedMesh&&ve.skinning===!1||!k.isSkinnedMesh&&ve.skinning===!0||k.isInstancedMesh&&ve.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&ve.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&ve.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&ve.instancingMorph===!1&&k.morphTexture!==null||ve.envMap!==Te||V.fog===!0&&ve.fog!==me||ve.numClippingPlanes!==void 0&&(ve.numClippingPlanes!==Ae.numPlanes||ve.numIntersection!==Ae.numIntersection)||ve.vertexAlphas!==ke||ve.vertexTangents!==Xe||ve.morphTargets!==Me||ve.morphNormals!==nt||ve.morphColors!==Tt||ve.toneMapping!==mt||ve.morphTargetsCount!==zt||!!ve.lightProbeGrid!=M.state.lightProbeGridArray.length>0)&&(Je=!0):(Je=!0,ve.__version=V.version);let dn=ve.currentProgram;Je===!0&&(dn=ha(V,D,k),O&&V.isNodeMaterial&&O.onUpdateProgram(V,dn,ve));let In=!1,ri=!1,tr=!1,it=dn.getUniforms(),St=ve.uniforms;if(g.useProgram(dn.program)&&(In=!0,ri=!0,tr=!0),V.id!==W&&(W=V.id,ri=!0),ve.needsLights){let ct=Dg(M.state.lightProbeGridArray,k);ve.lightProbeGrid!==ct&&(ve.lightProbeGrid=ct,ri=!0)}if(In||ee!==y){g.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),it.setValue(I,"projectionMatrix",y.projectionMatrix),it.setValue(I,"viewMatrix",y.matrixWorldInverse);let ai=it.map.cameraPosition;ai!==void 0&&ai.setValue(I,at.setFromMatrixPosition(y.matrixWorld)),E.logarithmicDepthBuffer&&it.setValue(I,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&it.setValue(I,"isOrthographic",y.isOrthographicCamera===!0),ee!==y&&(ee=y,ri=!0,tr=!0)}if(ve.needsLights&&(Wt.state.sunShadowMap.length>0&&it.setValue(I,"sunShadowMap",Wt.state.sunShadowMap,Y),Wt.state.directionalShadowMap.length>0&&it.setValue(I,"directionalShadowMap",Wt.state.directionalShadowMap,Y),Wt.state.spotShadowMap.length>0&&it.setValue(I,"spotShadowMap",Wt.state.spotShadowMap,Y),Wt.state.pointShadowMap.length>0&&it.setValue(I,"pointShadowMap",Wt.state.pointShadowMap,Y)),k.isSkinnedMesh){it.setOptional(I,k,"bindMatrix"),it.setOptional(I,k,"bindMatrixInverse");let ct=k.skeleton;ct&&(ct.boneTexture===null&&ct.computeBoneTexture(),it.setValue(I,"boneTexture",ct.boneTexture,Y))}k.isBatchedMesh&&(it.setOptional(I,k,"batchingTexture"),it.setValue(I,"batchingTexture",k._matricesTexture,Y),it.setOptional(I,k,"batchingIdTexture"),it.setValue(I,"batchingIdTexture",k._indirectTexture,Y),it.setOptional(I,k,"batchingColorTexture"),k._colorsTexture!==null&&it.setValue(I,"batchingColorTexture",k._colorsTexture,Y));let si=q.morphAttributes;if((si.position!==void 0||si.normal!==void 0||si.color!==void 0)&&N.update(k,q,dn),(ri||ve.receiveShadow!==k.receiveShadow)&&(ve.receiveShadow=k.receiveShadow,it.setValue(I,"receiveShadow",k.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&D.environment!==null&&(St.envMapIntensity.value=D.environmentIntensity),St.dfgLUT!==void 0&&(St.dfgLUT.value=pb()),ri){if(it.setValue(I,"toneMappingExposure",C.toneMappingExposure),ve.needsLights&&Ng(St,tr),me&&V.fog===!0&&Ee.refreshFogUniforms(St,me),Ee.refreshMaterialUniforms(St,V,K,j,M.state.transmissionRenderTarget[y.id]),ve.needsLights&&ve.lightProbeGrid){let ct=ve.lightProbeGrid;St.probesSH.value=ct.texture,St.probesMin.value.copy(ct.boundingBox.min),St.probesMax.value.copy(ct.boundingBox.max),St.probesResolution.value.copy(ct.resolution)}Ir.upload(I,Dh(ve),St,Y)}if(V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Ir.upload(I,Dh(ve),St,Y),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&it.setValue(I,"center",k.center),it.setValue(I,"modelViewMatrix",k.modelViewMatrix),it.setValue(I,"normalMatrix",k.normalMatrix),it.setValue(I,"modelMatrix",k.matrixWorld),V.uniformsGroups!==void 0){let ct=V.uniformsGroups;for(let ai=0,nr=ct.length;ai<nr;ai++){let Oh=ct[ai];ne.update(Oh,dn),ne.bind(Oh,dn)}}return dn}function Ng(y,D){y.ambientLightColor.needsUpdate=D,y.lightProbe.needsUpdate=D,y.sunLights.needsUpdate=D,y.sunLightShadows.needsUpdate=D,y.directionalLights.needsUpdate=D,y.directionalLightShadows.needsUpdate=D,y.pointLights.needsUpdate=D,y.pointLightShadows.needsUpdate=D,y.spotLights.needsUpdate=D,y.spotLightShadows.needsUpdate=D,y.rectAreaLights.needsUpdate=D,y.hemisphereLights.needsUpdate=D}function Og(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return X},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return te},this.setRenderTargetTextures=function(y,D,q){let V=H.get(y);V.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),H.get(y.texture).__webglTexture=D,H.get(y.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:q,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,D){let q=H.get(y);q.__webglFramebuffer=D,q.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(y,D=0,q=0){te=y,X=D,G=q;let V=null,k=!1,me=!1;if(y){let fe=H.get(y);if(fe.__useDefaultFramebuffer!==void 0){g.bindFramebuffer(I.FRAMEBUFFER,fe.__webglFramebuffer),Z.copy(y.viewport),pe.copy(y.scissor),ie=y.scissorTest,g.viewport(Z),g.scissor(pe),g.setScissorTest(ie),W=-1;return}else if(fe.__webglFramebuffer===void 0)Y.setupRenderTarget(y);else if(fe.__hasExternalTextures)Y.rebindTextures(y,H.get(y.texture).__webglTexture,H.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){let ke=y.depthTexture;if(fe.__boundDepthTexture!==ke){if(ke!==null&&H.has(ke)&&(y.width!==ke.image.width||y.height!==ke.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Y.setupDepthRenderbuffer(y)}}let Se=y.texture;(Se.isData3DTexture||Se.isDataArrayTexture||Se.isCompressedArrayTexture)&&(me=!0);let Te=H.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Te[D])?V=Te[D][q]:V=Te[D],k=!0):y.samples>0&&Y.useMultisampledRTT(y)===!1?V=H.get(y).__webglMultisampledFramebuffer:Array.isArray(Te)?V=Te[q]:V=Te,Z.copy(y.viewport),pe.copy(y.scissor),ie=y.scissorTest}else Z.copy(_e).multiplyScalar(K).floor(),pe.copy(He).multiplyScalar(K).floor(),ie=wt;if(q!==0&&(V=B),g.bindFramebuffer(I.FRAMEBUFFER,V)&&g.drawBuffers(y,V),g.viewport(Z),g.scissor(pe),g.setScissorTest(ie),k){let fe=H.get(y.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+D,fe.__webglTexture,q)}else if(me){let fe=D;for(let Se=0;Se<y.textures.length;Se++){let Te=H.get(y.textures[Se]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Se,Te.__webglTexture,q,fe)}}else if(y!==null&&q!==0){let fe=H.get(y.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,fe.__webglTexture,q)}W=-1};function Nh(y){let D=H.get(y);return(D.__readFormat!==y.format||D.__readType!==y.type)&&(D.__readFormat=y.format,D.__readType=y.type,D.__formatReadable=E.textureFormatReadable(y.format),D.__typeReadable=E.textureTypeReadable(y.type)),D}this.readRenderTargetPixels=function(y,D,q,V,k,me,ye,fe=0){if(!(y&&y.isWebGLRenderTarget)){Oe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=H.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ye!==void 0&&(Se=Se[ye]),Se){g.bindFramebuffer(I.FRAMEBUFFER,Se);try{let Te=y.textures[fe],ke=Te.format,Xe=Te.type;y.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+fe);let Me=Nh(Te);if(Me.__formatReadable===!1){Oe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Me.__typeReadable===!1){Oe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=y.width-V&&q>=0&&q<=y.height-k&&I.readPixels(D,q,V,k,ce.convert(ke),ce.convert(Xe),me)}finally{let Te=te!==null?H.get(te).__webglFramebuffer:null;g.bindFramebuffer(I.FRAMEBUFFER,Te)}}},this.readRenderTargetPixelsAsync=async function(y,D,q,V,k,me,ye,fe=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Se=H.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ye!==void 0&&(Se=Se[ye]),Se)if(D>=0&&D<=y.width-V&&q>=0&&q<=y.height-k){g.bindFramebuffer(I.FRAMEBUFFER,Se);let Te=y.textures[fe],ke=Te.format,Xe=Te.type;y.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+fe);let Me=Nh(Te);if(Me.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Me.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let nt=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,nt),I.bufferData(I.PIXEL_PACK_BUFFER,me.byteLength,I.STREAM_READ),I.readPixels(D,q,V,k,ce.convert(ke),ce.convert(Xe),0),I.bindBuffer(I.PIXEL_PACK_BUFFER,null);let Tt=te!==null?H.get(te).__webglFramebuffer:null;g.bindFramebuffer(I.FRAMEBUFFER,Tt);let mt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await Vd(I,mt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,nt),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,me),I.bindBuffer(I.PIXEL_PACK_BUFFER,null),I.deleteBuffer(nt),I.deleteSync(mt),me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,D=null,q=0){let V=Math.pow(2,-q),k=Math.floor(y.image.width*V),me=Math.floor(y.image.height*V),ye=D!==null?D.x:0,fe=D!==null?D.y:0;Y.setTexture2D(y,0),I.copyTexSubImage2D(I.TEXTURE_2D,q,0,0,ye,fe,k,me),g.unbindTexture()},this.copyTextureToTexture=function(y,D,q=null,V=null,k=0,me=0){let ye,fe,Se,Te,ke,Xe,Me,nt,Tt,mt=y.isCompressedTexture?y.mipmaps[me]:y.image;if(q!==null)ye=q.max.x-q.min.x,fe=q.max.y-q.min.y,Se=q.isBox3?q.max.z-q.min.z:1,Te=q.min.x,ke=q.min.y,Xe=q.isBox3?q.min.z:0;else{let St=Math.pow(2,-k);ye=Math.floor(mt.width*St),fe=Math.floor(mt.height*St),y.isDataArrayTexture?Se=mt.depth:y.isData3DTexture?Se=Math.floor(mt.depth*St):Se=1,Te=0,ke=0,Xe=0}V!==null?(Me=V.x,nt=V.y,Tt=V.z):(Me=0,nt=0,Tt=0);let ot=ce.convert(D.format),zt=ce.convert(D.type),ve;D.isData3DTexture?(Y.setTexture3D(D,0),ve=I.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(Y.setTexture2DArray(D,0),ve=I.TEXTURE_2D_ARRAY):(Y.setTexture2D(D,0),ve=I.TEXTURE_2D),g.activeTexture(I.TEXTURE0),g.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,D.flipY),g.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),g.pixelStorei(I.UNPACK_ALIGNMENT,D.unpackAlignment);let Wt=g.getParameter(I.UNPACK_ROW_LENGTH),Je=g.getParameter(I.UNPACK_IMAGE_HEIGHT),dn=g.getParameter(I.UNPACK_SKIP_PIXELS),In=g.getParameter(I.UNPACK_SKIP_ROWS),ri=g.getParameter(I.UNPACK_SKIP_IMAGES);g.pixelStorei(I.UNPACK_ROW_LENGTH,mt.width),g.pixelStorei(I.UNPACK_IMAGE_HEIGHT,mt.height),g.pixelStorei(I.UNPACK_SKIP_PIXELS,Te),g.pixelStorei(I.UNPACK_SKIP_ROWS,ke),g.pixelStorei(I.UNPACK_SKIP_IMAGES,Xe);let tr=y.isDataArrayTexture||y.isData3DTexture,it=D.isDataArrayTexture||D.isData3DTexture;if(y.isDepthTexture){let St=H.get(y),si=H.get(D),ct=H.get(St.__renderTarget),ai=H.get(si.__renderTarget);g.bindFramebuffer(I.READ_FRAMEBUFFER,ct.__webglFramebuffer),g.bindFramebuffer(I.DRAW_FRAMEBUFFER,ai.__webglFramebuffer);for(let nr=0;nr<Se;nr++)tr&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,H.get(y).__webglTexture,k,Xe+nr),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,H.get(D).__webglTexture,me,Tt+nr)),I.blitFramebuffer(Te,ke,ye,fe,Me,nt,ye,fe,I.DEPTH_BUFFER_BIT,I.NEAREST);g.bindFramebuffer(I.READ_FRAMEBUFFER,null),g.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(k!==0||y.isRenderTargetTexture||H.has(y)){let St=H.get(y),si=H.get(D);g.bindFramebuffer(I.READ_FRAMEBUFFER,R),g.bindFramebuffer(I.DRAW_FRAMEBUFFER,U);for(let ct=0;ct<Se;ct++)tr?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,St.__webglTexture,k,Xe+ct):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,St.__webglTexture,k),it?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,si.__webglTexture,me,Tt+ct):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,si.__webglTexture,me),k!==0?I.blitFramebuffer(Te,ke,ye,fe,Me,nt,ye,fe,I.COLOR_BUFFER_BIT,I.NEAREST):it?I.copyTexSubImage3D(ve,me,Me,nt,Tt+ct,Te,ke,ye,fe):I.copyTexSubImage2D(ve,me,Me,nt,Te,ke,ye,fe);g.bindFramebuffer(I.READ_FRAMEBUFFER,null),g.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else it?y.isDataTexture||y.isData3DTexture?I.texSubImage3D(ve,me,Me,nt,Tt,ye,fe,Se,ot,zt,mt.data):D.isCompressedArrayTexture?I.compressedTexSubImage3D(ve,me,Me,nt,Tt,ye,fe,Se,ot,mt.data):I.texSubImage3D(ve,me,Me,nt,Tt,ye,fe,Se,ot,zt,mt):y.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,me,Me,nt,ye,fe,ot,zt,mt.data):y.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,me,Me,nt,mt.width,mt.height,ot,mt.data):I.texSubImage2D(I.TEXTURE_2D,me,Me,nt,ye,fe,ot,zt,mt);g.pixelStorei(I.UNPACK_ROW_LENGTH,Wt),g.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Je),g.pixelStorei(I.UNPACK_SKIP_PIXELS,dn),g.pixelStorei(I.UNPACK_SKIP_ROWS,In),g.pixelStorei(I.UNPACK_SKIP_IMAGES,ri),me===0&&D.generateMipmaps&&I.generateMipmap(ve),g.unbindTexture()},this.initRenderTarget=function(y){H.get(y).__webglFramebuffer===void 0&&Y.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?Y.setTextureCube(y,0):y.isData3DTexture?Y.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?Y.setTexture2DArray(y,0):Y.setTexture2D(y,0),g.unbindTexture()},this.resetState=function(){X=0,G=0,te=null,g.reset(),ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=qe._getUnpackColorSpace()}};var Cg=Gg(xg(),1);function Mh(n,e,t,i){return new(t||(t=Promise))((function(r,s){function a(c){try{l(i.next(c))}catch(u){s(u)}}function o(c){try{l(i.throw(c))}catch(u){s(u)}}function l(c){var u;c.done?r(c.value):(u=c.value,u instanceof t?u:new t((function(d){d(u)}))).then(a,o)}l((i=i.apply(n,e||[])).next())}))}var x2=["geforce 320m","geforce 8600","geforce 8600m gt","geforce 8800 gs","geforce 8800 gt","geforce 9400","geforce 9400m g","geforce 9400m","geforce 9600m gt","geforce 9600m","geforce fx go5200","geforce gt 120","geforce gt 130","geforce gt 330m","geforce gtx 285","google swiftshader","intel g41","intel g45","intel gma 4500mhd","intel gma x3100","intel hd 3000","intel q45","legacy","mali-2","mali-3","mali-4","quadro fx 1500","quadro fx 4","quadro fx 5","radeon hd 2400","radeon hd 2600","radeon hd 4670","radeon hd 4850","radeon hd 4870","radeon hd 5670","radeon hd 5750","radeon hd 6290","radeon hd 6300","radeon hd 6310","radeon hd 6320","radeon hd 6490m","radeon hd 6630m","radeon hd 6750m","radeon hd 6770m","radeon hd 6970m","sgx 543","sgx543"];function bg(n){return n=n.toLowerCase().replace(/.*angle ?\((.+)\)(?: on vulkan [0-9.]+)?$/i,"$1").replace(/\s(\d{1,2}gb|direct3d.+$)|\(r\)| \([^)]+\)$/g,"").replace(/(?:vulkan|opengl) \d+\.\d+(?:\.\d+)?(?: \((.*)\))?/,"$1")}var Mg=typeof window>"u",Hn=(()=>{if(Mg)return;let{userAgent:n,platform:e,maxTouchPoints:t}=window.navigator,i=/(iphone|ipod|ipad)/i.test(n),r=e==="iPad"||e==="MacIntel"&&t>0&&!window.MSStream;return{isIpad:r,isMobile:/android/i.test(n)||i||r,isSafari12:/Version\/12.+Safari/.test(n),isFirefox:/Firefox/.test(n)}})();function b2(n,e,t){if(!t)return[e];let i=(function(c){let u=`
    precision highp float;
    attribute vec3 aPosition;
    varying float vvv;
    void main() {
      vvv = 0.31622776601683794;
      gl_Position = vec4(aPosition, 1.0);
    }
  `,d=`
    precision highp float;
    varying float vvv;
    void main() {
      vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * vvv;
      enc = fract(enc);
      enc -= enc.yzww * vec4(1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0, 0.0);
      gl_FragColor = enc;
    }
  `,h=c.createShader(35633),p=c.createShader(35632),_=c.createProgram();if(!(p&&h&&_))return;c.shaderSource(h,u),c.shaderSource(p,d),c.compileShader(h),c.compileShader(p),c.attachShader(_,h),c.attachShader(_,p),c.linkProgram(_),c.detachShader(_,h),c.detachShader(_,p),c.deleteShader(h),c.deleteShader(p),c.useProgram(_);let x=c.createBuffer();c.bindBuffer(34962,x),c.bufferData(34962,new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),35044);let m=c.getAttribLocation(_,"aPosition");c.vertexAttribPointer(m,3,5126,!1,0,0),c.enableVertexAttribArray(m),c.clearColor(1,1,1,1),c.clear(16384),c.viewport(0,0,1,1),c.drawArrays(4,0,3);let f=new Uint8Array(4);return c.readPixels(0,0,1,1,6408,5121,f),c.deleteProgram(_),c.deleteBuffer(x),f.join("")})(n),r="801621810",s="8016218135",a="80162181161",o=Hn?.isIpad?[["a7",a,12],["a8",s,15],["a8x",s,15],["a9",s,15],["a9x",s,15],["a10",s,15],["a10x",s,15],["a12",r,15],["a12x",r,15],["a12z",r,15],["a14",r,15],["a15",r,15],["m1",r,15],["m2",r,15]]:[["a7",a,12],["a8",s,12],["a9",s,15],["a10",s,15],["a11",r,15],["a12",r,15],["a13",r,15],["a14",r,15],["a15",r,15],["a16",r,15],["a17",r,15]],l;return i==="80162181255"?l=o.filter((([,,c])=>c>=14)):(l=o.filter((([,c])=>c===i)),l.length||(l=o)),l.map((([c])=>`apple ${c} gpu`))}var kl=class extends Error{constructor(e){super(e),Object.setPrototypeOf(this,new.target.prototype)}},wh=[],Sg=[];function S2(n,e){if(n===e)return 0;let t=n;n.length>e.length&&(n=e,e=t);let i=n.length,r=e.length;for(;i>0&&n.charCodeAt(~-i)===e.charCodeAt(~-r);)i--,r--;let s,a=0;for(;a<i&&n.charCodeAt(a)===e.charCodeAt(a);)a++;if(i-=a,r-=a,i===0)return r;let o,l,c=0,u=0,d=0;for(;u<i;)Sg[u]=n.charCodeAt(a+u),wh[u]=++u;for(;d<r;)for(s=e.charCodeAt(a+d),o=d++,c=d,u=0;u<i;u++)l=s===Sg[u]?o:o+1,o=wh[u],c=wh[u]=o>c?l>c?c+1:l:l>o?o+1:l;return c}function M2(n){return n!=null}var wg=({mobileTiers:n=[0,15,30,60],desktopTiers:e=[0,15,30,60],override:t={},glContext:i,failIfMajorPerformanceCaveat:r=!1,benchmarksURL:s="https://unpkg.com/detect-gpu@5.0.70/dist/benchmarks"}={})=>Mh(void 0,void 0,void 0,(function*(){let a={};if(Mg)return{tier:0,type:"SSR"};let{isIpad:o=!!Hn?.isIpad,isMobile:l=!!Hn?.isMobile,screenSize:c=window.screen,loadBenchmarks:u=(b=>Mh(void 0,void 0,void 0,(function*(){let M=yield fetch(`${s}/${b}`).then((A=>A.json()));if(parseInt(M.shift().split(".")[0],10)<4)throw new kl("Detect GPU benchmark data is out of date. Please update to version 4x");return M})))}=t,{renderer:d}=t,h=(b,M,A,v,w)=>({device:w,fps:v,gpu:A,isMobile:l,tier:b,type:M}),p,_="";if(d)d=bg(d),p=[d];else{let b=i||(function(A,v=!1){let w={alpha:!1,antialias:!1,depth:!1,failIfMajorPerformanceCaveat:v,powerPreference:"high-performance",stencil:!1};A&&delete w.powerPreference;let C=window.document.createElement("canvas"),L=C.getContext("webgl",w)||C.getContext("experimental-webgl",w);return L??void 0})(Hn?.isSafari12,r);if(!b)return h(0,"WEBGL_UNSUPPORTED");let M=Hn?.isFirefox?null:b.getExtension("WEBGL_debug_renderer_info");if(d=M?b.getParameter(M.UNMASKED_RENDERER_WEBGL):b.getParameter(b.RENDERER),!d)return h(1,"FALLBACK");_=d,d=bg(d),p=(function(A,v,w){return v==="apple gpu"?b2(A,v,w):[v]})(b,d,l)}let x=(yield Promise.all(p.map((function(b){var M;return Mh(this,void 0,void 0,(function*(){let A=(ie=>{let Ne=l?["adreno","apple","mali-t","mali","nvidia","powervr","samsung"]:["intel","apple","amd","radeon","nvidia","geforce","adreno"];for(let be of Ne)if(ie.includes(be))return be})(b);if(!A)return;let v=`${l?"m":"d"}-${A}${o?"-ipad":""}.json`,w=a[v]=(M=a[v])!==null&&M!==void 0?M:u(v),C;try{C=yield w}catch(ie){if(ie instanceof kl)throw ie;return}let L=(function(ie){var Ne;let be=(ie=ie.replace(/\([^)]+\)/,"")).match(/\d+/)||ie.match(/(\W|^)([A-Za-z]{1,3})(\W|$)/g);return(Ne=be?.join("").replace(/\W|amd/g,""))!==null&&Ne!==void 0?Ne:""})(b),O=C.filter((([,ie])=>ie===L));O.length||(O=C.filter((([ie])=>ie.includes(b))));let B=O.length;if(B===0)return;let R=b.split(/[.,()\[\]/\s]/g).sort().filter(((ie,Ne,be)=>Ne===0||ie!==be[Ne-1])).join(" "),U,[X,,,,G]=B>1?O.map((ie=>[ie,S2(R,ie[2])])).sort((([,ie],[,Ne])=>ie-Ne))[0][0]:O[0],te=Number.MAX_VALUE,{devicePixelRatio:W}=window,ee=c.width*W*c.height*W;for(let ie of G){let[Ne,be]=ie,ze=Ne*be,j=Math.abs(ee-ze);j<te&&(te=j,U=ie)}if(!U)return;let[,,Z,pe]=U;return[te,Z,X,pe]}))})))).filter(M2).sort((([b=Number.MAX_VALUE,M],[A=Number.MAX_VALUE,v])=>b===A?M-v:b-A));if(!x.length){let b=x2.find((M=>d.includes(M)));return b?h(0,"BLOCKLISTED",b):h(1,"FALLBACK",`${d} (${_})`)}let[,m,f,T]=x[0];if(m===-1)return h(0,"BLOCKLISTED",f,m,T);let P=l?n:e,S=0;for(let b=0;b<P.length;b++)m>=P[b]&&(S=b);return h(S,"BENCHMARK",f,m,T)}));var Yr={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var hn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},w2=new Fi(-1,1,1,-1,0,1),Th=class extends Jt{constructor(){super(),this.setAttribute("position",new Mt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Mt([0,2,0,0,2,0],2))}},T2=new Th,Ai=class{constructor(e){this._mesh=new Ft(T2,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,w2)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var Gl=class extends hn{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof xt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=$n.clone(e.uniforms),this.material=new xt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Ai(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var la=class extends hn{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){let r=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),s.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),s.buffers.stencil.setClear(o),s.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(r.EQUAL,1,4294967295),s.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),s.buffers.stencil.setLocked(!0)}},Hl=class extends hn{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var Wl=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let i=e.getSize(new Pe);this._width=i.width,this._height=i.height,t=new At(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Bt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Gl(Yr),this.copyPass.material.blending=mn,this.timer=new xs}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),i=!1;for(let r=0,s=this.passes.length;r<s;r++){let a=this.passes[r];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),a.needsSwap){if(i){let o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}la!==void 0&&(a instanceof la?i=!0:a instanceof Hl&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new Pe);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let i=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(i,r),this.renderTarget2.setSize(i,r);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(i,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var ql=class extends hn{constructor(e,t,i=null,r=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=r,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new De}render(e,t,i){let r=e.autoClear;e.autoClear=!1;let s,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}};var Tg={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new De(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var Zr=class n extends hn{constructor(e,t=1,i,r){super(),this.strength=t,this.radius=i,this.threshold=r,this.resolution=e!==void 0?new Pe(e.x,e.y):new Pe(256,256),this.clearColor=new De(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new At(s,a,{type:Bt,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){let d=new At(s,a,{type:Bt,depthBuffer:!1});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);let h=new At(s,a,{type:Bt,depthBuffer:!1});h.texture.name="UnrealBloomPass.v"+u,h.texture.generateMipmaps=!1,this.renderTargetsVertical.push(h),s=Math.round(s/2),a=Math.round(a/2)}let o=Tg;this.highPassUniforms=$n.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new xt({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let l=[6,10,14,18,22];s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new Pe(1/s,1/a),s=Math.round(s/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new z(1,1,1),new z(1,1,1),new z(1,1,1),new z(1,1,1),new z(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=$n.clone(Yr.uniforms),this.blendMaterial=new xt({uniforms:this.copyUniforms,vertexShader:Yr.vertexShader,fragmentShader:Yr.fragmentShader,premultipliedAlpha:!0,blending:Ss,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new De,this._oldClearAlpha=1,this._basic=new Oi,this._fsQuad=new Ai(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let i=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(i,r);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(i,r),this.renderTargetsVertical[s].setSize(i,r),this.separableBlurMaterials[s].uniforms.invSize.value=new Pe(1/i,1/r),i=Math.round(i/2),r=Math.round(r/2)}render(e,t,i,r,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();let a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=n.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=n.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(i),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){let t=[],i=e/3;for(let a=0;a<e;a++)t.push(.39894*Math.exp(-.5*a*a/(i*i))/i);let r=[],s=[];for(let a=1;a<e;a+=2){let o=t[a],l=a+1<e?t[a+1]:0,c=o+l;r.push((a*o+(a+1)*l)/c),s.push(c)}return new xt({defines:{KERNEL_PAIRS:r.length},uniforms:{colorTexture:{value:null},invSize:{value:new Pe(.5,.5)},direction:{value:new Pe(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:r},gaussianWeights:{value:s}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new xt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};Zr.BlurDirectionX=new Pe(1,0);Zr.BlurDirectionY=new Pe(0,1);var ca={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var Xl=class extends hn{constructor(){super(),this.isOutputPass=!0,this.uniforms=$n.clone(ca.uniforms),this.material=new Tr({name:ca.name,uniforms:this.uniforms,vertexShader:ca.vertexShader,fragmentShader:ca.fragmentShader}),this._fsQuad=new Ai(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},qe.getTransfer(this._outputColorSpace)===Ke&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Ms?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===ws?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Ts?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===zi?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===As?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Cs?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Es&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var Eg=`precision highp float;
varying float vLife,vGlint;
varying vec2 vAxis;
void main(){
 vLife=1.;vGlint=1.;vAxis=vec2(1.,0.);
 gl_Position=vec4(position.xy,0.,1.);
}`,Ag=`
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
varying float vLife,vGlint;
varying vec2 vAxis;
uniform vec2 uResolution;
uniform float uTime,uPass,uLayer;
uniform vec4 uControls,uShape,uEffects;
uniform vec3 uCore,uCyan,uViolet,uDeep;
uniform vec2 uTilt;
uniform vec3 uPointer; // projected pointer position + decaying impulse
uniform float uVolumeSteps;
uniform vec2 uFlow; // material family 0..4, ribbon width 0.3..2

uniform float uSceneScroll;
uniform float uSceneQuality;
// Raycast simple *3D* architectural planes in the SAME camera/render program.
// The Core's world-space position (0,0,0) is the only emission source.
vec3 sceneColor(vec2 uv){
  float scroll=clamp(uSceneScroll,0.,1.);
  vec3 ro=vec3(scroll*.16,.40+scroll*.17,3.72-scroll*.43);
  vec3 rd=normalize(vec3(uv.x*.81,uv.y*.81-.09-scroll*.095,-1.68));
  float hit=1000.,kind=-1.;
  vec3 pos=vec3(0.),normal=vec3(0.);
  // Floating Core below an inset ceiling, above a machined metal plane.
  if(rd.y<-.0001){
    float t=(-1.21-ro.y)/rd.y;
    vec3 q=ro+rd*t;
    if(t>0.&&t<hit&&abs(q.x)<5.2&&q.z>-6.){
      hit=t;kind=0.;pos=q;normal=vec3(0.,1.,0.);
    }
  }
  // Raised machined plinth: actual horizontal polygon in 3D, not a CSS shadow.
  if(rd.y<-.0001){
    float t=(-1.155-ro.y)/rd.y;
    vec3 q=ro+rd*t;
    if(t>0.&&t<hit&&abs(q.x)<.78&&abs(q.z)<.86){
      hit=t;kind=5.;pos=q;normal=vec3(0.,1.,0.);
    }
  }
  // Backplane is recessed and interrupted by an architectural aperture.
  if(rd.z<-.0001){
    float t=(-3.35-ro.z)/rd.z;
    vec3 q=ro+rd*t;
    if(t>0.&&t<hit&&abs(q.x)<4.3&&q.y>-1.21&&q.y<2.5){
      hit=t;kind=1.;pos=q;normal=vec3(0.,0.,1.);
    }
  }
  // Side panels have genuine world-space coordinates and inward-facing normals.
  if(rd.x<-.0001){
    float t=(-2.75-ro.x)/rd.x;
    vec3 q=ro+rd*t;
    if(t>0.&&t<hit&&q.z>-3.35&&q.z<3.6&&q.y>-1.21&&q.y<2.5){
      hit=t;kind=2.;pos=q;normal=vec3(1.,0.,0.);
    }
  }
  if(rd.x>.0001){
    float t=(2.75-ro.x)/rd.x;
    vec3 q=ro+rd*t;
    if(t>0.&&t<hit&&q.z>-3.35&&q.z<3.6&&q.y>-1.21&&q.y<2.5){
      hit=t;kind=3.;pos=q;normal=vec3(-1.,0.,0.);
    }
  }
  if(rd.y>.0001){
    float t=(2.24-ro.y)/rd.y;
    vec3 q=ro+rd*t;
    if(t>0.&&t<hit&&abs(q.x)<4.3&&q.z>-3.35){
      hit=t;kind=4.;pos=q;normal=vec3(0.,-1.,0.);
    }
  }
  // No forced distant fog-lit flat backdrop. Unlit darkness is intentional.
  vec3 voidColor=vec3(.006,.011,.023);
  if(kind<0.)return voidColor;
  // Distinct machined wall / metal-floor grain; no tiled-image reflection.
  float grain=.5+.5*sin(pos.x*mix(52.,96.,uSceneQuality)+pos.z*3.);
  float seamX=1.-smoothstep(.005,.026,abs(fract(pos.x*.45+.5)-.5));
  float seamZ=1.-smoothstep(.004,.027,abs(fract(pos.z*.38+.5)-.5));
  float floorM=1.-.12*max(seamX,seamZ);
  float panelSeam=1.-smoothstep(.007,.036,abs(fract(pos.z*.55+.5)-.5));
  vec3 base=kind<.5?vec3(.072,.090,.112):
           kind<1.5?vec3(.035,.049,.078):
           kind<3.5?vec3(.058,.075,.096):
           kind<4.5?vec3(.038,.050,.068):vec3(.09,.112,.131);
  if(kind<.5)base*=floorM*(.97+.03*grain);
  if(kind>4.5){
    // Fine satin grain and bevel visible only at the plinth edges.
    float edge=min(.78-abs(pos.x),.86-abs(pos.z));
    base*=.82+.33*(1.-smoothstep(0.,.095,edge));
  }
  if(kind>1.5&&kind<3.5)base*=1.-.25*panelSeam;
  if(kind>1.0&&kind<1.5){
    // Deep architectural inset, not a decorative glowing border.
    float xx=abs(pos.x),yy=abs(pos.y-.15);
    float rim=(1.-smoothstep(.02,.12,abs(xx-1.72)))*
               (1.-smoothstep(1.20,1.64,yy));
    base=mix(base,base*1.55,rim*.42);
    if(xx<1.68&&yy<1.18)base*=.42;
  }
  // Diffuse + rough, broad metallic specular lobes from the Core's real position.
  vec3 toward=vec3(0.,.03,0.)-pos;
  float dist2=dot(toward,toward);
  vec3 l=normalize(toward);
  float lambert=max(dot(normal,l),0.);
  float attenuation=1./(1.+.21*dist2+.045*dist2*dist2);
  float power=clamp(uShape.w/5.,.3,1.6);
  float pulse=1.+.045*sin(uTime*1.2);
  vec3 color=base*(.30+.30*clamp(normal.y+.3,0.,1.));
  vec3 violetLight=uViolet*(1.17-.16*pos.x);
  vec3 greenLight=uCyan*(1.17+.16*pos.x);
  vec3 lights=mix(violetLight,greenLight,clamp(.5+.28*pos.x,0.,1.));
  vec3 colored=lights*(.36+1.8*lambert)*attenuation*power*pulse;
  vec3 whiteBounce=uCore*(.25+.55*lambert)*attenuation*.23*power;
  color+=(base*9.2+vec3(.051,.062,.073))*(colored+whiteBounce);
  // Localized broadband response of rough metallic surfaces to the luminous Core.
  color+=lights*lambert*attenuation*.11*power;
  vec3 reflected=reflect(-l,normal);
  float spec=pow(max(dot(reflected,-rd),0.),11.);
  color+=lights*spec*.22*attenuation*power;
  // Fast, deterministic distance fog without a second volumetric pass.
  float fog=1.-exp(-.020*hit*hit);
  color=mix(color,voidColor,clamp(fog*.69,0.,.70));
  return vec3(1.)-exp(-max(color,vec3(0.))*1.38);
}
float hash3(vec3 v){v=fract(v*.1031);v+=dot(v,v.yzx+33.33);return fract((v.x+v.y)*v.z);}
float noise3(vec3 p){
 vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
 return mix(mix(mix(hash3(i),hash3(i+vec3(1,0,0)),f.x),
                mix(hash3(i+vec3(0,1,0)),hash3(i+vec3(1,1,0)),f.x),f.y),
            mix(mix(hash3(i+vec3(0,0,1)),hash3(i+vec3(1,0,1)),f.x),
                mix(hash3(i+vec3(0,1,1)),hash3(i+vec3(1,1,1)),f.x),f.y),f.z);
}
void main(){
 vec2 view=(gl_FragCoord.xy/uResolution-.5)*2.;
 view.x*=uResolution.x/max(uResolution.y,1.);
 vec2 p=view*1.72;p.y+=.08;
 float radius=.64*clamp(uShape.x,.5,1.5);
 if(uPass>3.5){
  vec3 background=sceneColor(view);
  // True 3D ray integration. The image reference is a luminous white-blue
  // central star enclosed in translucent indigo space, with five broad
  // cyan/violet plasma arms winding through front and rear depth layers.
  float xy=length(p);
  if(xy>=radius*1.025){gl_FragColor=vec4(0.,0.,0.,0.);return;}
  float halfDepth=sqrt(max(0.,radius*radius-dot(p,p)));
  float stride=(2.*halfDepth)/max(uVolumeSteps,1.);
  float t=uTime*max(.04,uControls.z);
  float rotY=uTilt.x*1.5,rotX=uTilt.y*1.5;
  float sy=sin(rotY),cy=cos(rotY),sx=sin(rotX),cx=cos(rotX);
  vec3 accum=vec3(0.);
  float trans=1.;
  float sceneDensity=0.;
  float emission=clamp(uControls.y,0.,2.);
  // Compact core size independent of its radiance. Power never widens the core.
  float nucleusRadius=max(.018,radius*uShape.z*.105);
  for(int i=0;i<22;i++){
    if(float(i)>=uVolumeSteps)break;
    float z=halfDepth-(float(i)+.5)*stride;
    vec3 q=vec3(p,z);
    // The camera tilt rotates the full volumetric field, not a flat UV plane.
    q=vec3(q.x*cy+q.z*sy,
           q.y*cx-(q.z*cy-q.x*sy)*sx,
           q.y*sx+(q.z*cy-q.x*sy)*cx);
    // R190: local fluid perturbation; no object rotation, no change to nucleus.
    float hoverDistance=length(p-uPointer.xy);
    float hoverEnvelope=uPointer.z*exp(-hoverDistance*hoverDistance/max(.015,radius*radius*.25));
    float flowDeflection=hoverEnvelope*
      (3.25*sin(t*3.6+q.z*6.7+length(q.xy)*9.5)
       +.70*cos(t*2.3+atan(q.y,q.x)*4.));
    float distance3D=length(q)/radius;
    float planar=length(q.xy)/radius;
    float angle=atan(q.y,q.x);
    float broad=noise3(q*3.8+vec3(t*.12,-t*.11,t*.08));
    float detail=.5+.5*sin(dot(q,vec3(18.,-13.,11.))+t*.45+(broad-.5)*4.);
    float depthWarp=(broad-.5)*1.05+(detail-.5)*.35;
    // Logarithmic spiral filaments in a rotating three-dimensional volume.
    float winding=angle*5.0+5.8*log(planar+.15)-t*.52
                  +q.z*2.6+depthWarp*1.35;
    float spiral=pow(max(0.,.5+.5*cos(winding)),6.);
    float sideFilament=pow(max(0.,.5+.5*cos(winding*1.8+detail*3.2)),25.);
    float stream=pow(max(0.,.5+.5*cos(winding*.8-q.z*7.2)),8.);
    float volumeFog=clamp(.23+.30*broad+.18*detail,0.,1.);
    float hollow=1.-smoothstep(.2,.83,abs(broad-detail)*2.0);
    float interior=1.-smoothstep(.92,1.02,distance3D);
    float core=exp(-dot(q,q)/(nucleusRadius*nucleusRadius)*1.65);
    float coreHalo=exp(-dot(q,q)/(nucleusRadius*nucleusRadius)*.18);
    float electrical=0.,vortex=0.,fusion=0.;
    if(uControls.x>.5&&uControls.x<1.5){
      electrical=pow(max(0.,.5+.5*cos(winding*2.2+detail*9.)),23.);
    }else if(uControls.x>1.5&&uControls.x<2.5){
      vortex=pow(max(0.,.5+.5*cos(winding*.8+q.z*8.)),9.);
    }else if(uControls.x>2.5&&uControls.x<3.5){
      fusion=pow(max(0.,.5+.5*cos(angle*10.+depthWarp*2.-t*.5)),14.)
             *exp(-distance3D*2.5);
    }
    // R157: only this flow material changes. Nucleus/core halo, electric arcs,
    // extra particle presets and alpha stay in their original independent passes.
    float ribbonWidth=clamp(uFlow.y,.3,2.);
    float flowCurrents=0.;
    float flowFog=1.;
    if(uFlow.x<.5){
      // R162: asymmetric, multi-scale filament topology within the SAME ray-marched volume.
      // Depth offset, low-frequency wandering, strand breakup and travelling pulses.
      float wander=.32*sin(angle*2.+q.z*3.1+t*.21)
                  +.22*sin(q.y*6.7-q.z*4.5-t*.17)+(broad-.5)*.65;
      float depthTwist=q.z*(2.8+.7*sin(t*.23+planar*5.))
                      +.35*sin(q.x*5.1+q.z*3.1-t*.25);
      // The angular part must contain only integer winding numbers at +/-PI.
      // Keep all irregular distortion in a strictly periodic phase offset.
      float basePhase=4.3*log(planar+.23)-t*.27+wander*2.2+depthTwist
                    +.75*sin(q.z*2.9+planar*6.1)*sin(angle*3.+q.z*1.7)
                    +flowDeflection;
      float organicLane=angle*6.+basePhase;
      float localPhase=sin(angle*2.+basePhase*.33+q.x*3.4+q.z*2.1-t*.17);
      float primaryVein=pow(max(0.,.5+.5*cos(organicLane+localPhase*.55)),
                            max(5.,11.4/ribbonWidth));
      float tributary=pow(max(0.,.5+.5*cos(angle*9.+basePhase*1.63+wander+depthTwist*.33)),
                          max(9.,18./ribbonWidth));
      float hairline=pow(max(0.,.5+.5*cos(angle*19.+basePhase*3.17+q.z*8.1-q.y*5.6)),
                         max(16.,35./ribbonWidth));
      float wisp=pow(max(0.,.5+.5*cos(angle*3.+basePhase*.57-q.x*4.7+depthTwist*1.4)),
                     max(6.,11./ribbonWidth));
      float pulse=.78+.22*sin(t*2.1+planar*11.+q.z*5.+wander*3.);
      float breakup=.64+.36*smoothstep(.23,.72,broad+.19*sin(q.z*8.+t*.3));
      // Sustain thin currents without restoring surface haze or opaque shell.
      flowCurrents=(primaryVein*.91+tributary*.48+hairline*.50+wisp*.22)
                   *pulse*breakup*1.55;
    }else if(uFlow.x<1.5){
      // Magnetic flux tubes: closed, strongly curved field-loop bands.
      float fieldAngle=angle*4.+q.z*6.5+sin(planar*9.+broad*2.2-t*.65)*2.+flowDeflection;
      float fieldLoop=pow(max(0.,.5+.5*cos(fieldAngle)),max(2.,7./ribbonWidth));
      float layering=pow(max(0.,.5+.5*cos(q.z*11.+planar*7.-t*.43)),3.);
      flowCurrents=fieldLoop*(.40+.68*layering);
      flowFog=.54;
    }else if(uFlow.x<2.5){
      // Aurora: flowing translucent vertical sheets, not spiralling plasma.
      float curtainPhase=q.x*9.+q.z*8.+
                         sin(q.y*5.+t*.24)*1.8+broad*3.2-t*.55+flowDeflection;
      float veil=pow(max(0.,.5+.5*cos(curtainPhase)),max(1.8,5.2/ribbonWidth));
      float feather=.5+.5*sin(q.y*9.-t*.38+detail*4.);
      flowCurrents=veil*(.38+.67*feather);
      flowFog=.46;
    }else if(uFlow.x<3.5){
      // Ionized nebula: broad, turbulent luminous clouds, minimal filaments.
      float densityCloud=smoothstep(.17,.69,broad*.70+detail*.30);
      float swirls=.5+.5*cos(q.z*5.+planar*4.-t*.22+depthWarp*2.+flowDeflection);
      flowCurrents=densityCloud*(.28+.28*swirls);
      flowFog=1.55+.55*ribbonWidth;
    }else{
      // Fusion jets: eight radial stellar emission cones with local ripples.
      float radialPhase=angle*8.+q.z*3.4+depthWarp*2.3-t*.42+flowDeflection;
      float jets=pow(max(0.,.5+.5*cos(radialPhase)),max(2.,9./ribbonWidth));
      float outward=smoothstep(.08,.36,planar)*exp(-distance3D*1.2);
      flowCurrents=jets*(.50+.86*outward);
      flowFog=.40;
    }
    float currents=0.;
    currents=flowCurrents;
    // Only the selected volumetric flow remains active: no legacy energy overlays.
    // Shell-free emission: only flow currents and nucleus contribute to optical density.
    float density=(currents*.43*emission+
                   core*.69+coreHalo*.11)*interior;
    float absorption=clamp(density*stride*5.2,0.,.49);
    vec3 blue=mix(uDeep*.65,uViolet*.69,clamp(distance3D*.72+broad*.42,0.,1.));
    float violetBand=.5+.5*sin(angle*3.0+q.z*4.0+broad*2.2);
    vec3 ion=mix(uCyan,uViolet,clamp(.12+.72*violetBand,0.,1.));
    vec3 filamentColor=mix(blue,ion,clamp(currents*.83+.11,0.,1.));
    // R197 \u2014 Depth visibility: far-side streamlines recede behind the front envelope.
    // This shades the real ray-marched 3D samples, not a screen-space fake overlay.
    float frontness=smoothstep(-.67,.78,z/max(radius,.001));
    float keyLight=clamp(.94-.26*q.x/max(radius,.001)
                         +.20*q.y/max(radius,.001),.60,1.33);
    float contour=mix(.90,1.05,smoothstep(.12,.88,planar));
    float depthShade=mix(.68,1.21,frontness)*keyLight*contour;
    vec3 radiance=filamentColor*(.48+currents*1.31)*depthShade
                  +uCyan*coreHalo*.50
                  +uCore*core*pow(max(uShape.w,0.),1.35)*2.4;
    accum+=trans*radiance*absorption;
    trans*=1.-absorption;
    sceneDensity+=absorption;
  }
  // Borderless energy: radial mask only fades the currents at the limit.
  float silhouette=xy/radius;
  float edge=1.-smoothstep(.92,1.0,silhouette);
  float coreScreen=exp(-dot(p,p)/(nucleusRadius*nucleusRadius)*1.8);
  // Limit highlight flattening; retain local nucleus brightness and gas transparency.
  vec3 result=accum*2.05+
              uCore*coreScreen*pow(max(uShape.w,0.),1.26)*.56;
  result*=mix(1.,.86,smoothstep(.62,.94,silhouette));
  // HDR-inspired, smooth light mapping; no clipped flat cyan marble.
  result=vec3(1.)-exp(-max(result,vec3(0.))*1.15);
  float alpha=(1.-trans)+coreScreen*.69;
  float plasmaAlpha=clamp(alpha*edge*uEffects.w,0.,1.);
  // The room is behind, Core radiance and fog occlude it in the SAME render.
  // Preserve filament gradients but restore the Core's luminous dynamic range.
  // Color-preserving screen response: avoid whitening violet/green filaments.
  float streamVisibility=min(2.1,pow(plasmaAlpha,.68)*3.4);
  float coreStar=exp(-dot(p,p)/(nucleusRadius*nucleusRadius)*1.1);
  float originalLuma=dot(result,vec3(.28,.58,.14));
  vec3 saturated=clamp(vec3(originalLuma)+(result-vec3(originalLuma))*2.15,vec3(0.),vec3(1.));
  vec3 incident=saturated*streamVisibility*1.38;
  vec3 composed=incident/(vec3(1.)+incident*.35);
  composed+=uCore*coreStar*.78;
  gl_FragColor=vec4(min(vec3(1.),composed),clamp(plasmaAlpha*1.5+coreStar*.6,0.,.99));
  return;
 }
 if(uPass>1.5&&uPass<2.5){
  // Thin, continuous high-voltage traces (GL.LINES), never a bead cloud.
  if(length(p)>=radius*.98)discard;
  float flash=clamp(vLife,0.,1.)*clamp(uEffects.w,0.,1.);
  vec3 boltColor=mix(uCyan,uCore,uLayer>.5?.88:.34);
  float intensity=flash*(uLayer>.5?.87:.24);
  gl_FragColor=vec4(boltColor*intensity,clamp(intensity,0.,1.));
  return;
 }
 vec2 c=gl_PointCoord*2.-1.;
 float r2=dot(c,c);
 float halo=exp(-r2*3.1),hot=exp(-r2*14.);
 float energy=(uLayer<.5?halo*.26:hot*1.13+halo*.13)*vLife*vGlint;
 if(uPass>.5&&uPass<1.5)energy*=.025; // restrained shell: no starfield over the material
 float bound=1.-smoothstep(radius*.95,radius*1.035,length(p));
 energy*=bound*clamp(uEffects.w,0.,1.);
 if(uPass>2.5)energy*=pow(max(uShape.w,0.),1.55)*1.62;
 vec3 color=uPass>2.5?uCore:uPass>1.5?mix(uCyan,uCore,.61):
            uPass>.5?mix(uCyan,uViolet,.25):mix(uCyan,uCore,.36);
 color=mix(color,vec3(1.),vGlint*.26);
 gl_FragColor=vec4(color*energy,clamp(energy,0.,1.));
}`;var It=document.querySelector(".core-r109-stage"),Jr=It?.querySelector(".core-r109-canvas");if(It&&Jr){let W=function(){if(!a||l)return;let Z=It.getBoundingClientRect(),pe=Math.max(1,Math.round(Z.width)),ie=Math.max(1,Math.round(Z.height)),Ne=innerWidth<700,be=Math.min(devicePixelRatio||1,Ne?1.2:1.6)*u;if(pe===O&&ie===B&&Math.abs(be-R)<.001)return;O=pe,B=ie,R=be,a.setPixelRatio(be),a.setSize(pe,ie,!1),A.aspect=pe/ie,A.updateProjectionMatrix();let ze=a.domElement.width,j=a.domElement.height;b.uResolution.value.set(ze,j),o?.setSize(pe,ie)},ee=function(Z){if(Z.pointerType==="touch")return;let pe=Jr.getBoundingClientRect(),ie=(Z.clientX-pe.left)/Math.max(1,pe.width),Ne=(Z.clientY-pe.top)/Math.max(1,pe.height);if(ie<0||ie>1||Ne<0||Ne>1){T=0;return}let be=Jr.width/Math.max(1,Jr.height);P=(ie-.5)*2*be*1.72,S=(.5-Ne)*2*1.72+.08,T=Math.hypot(P,S-.08)<.8?.72:0},n=document.querySelector("[data-render-status]"),e=Z=>{n&&(n.textContent=Z)},t=matchMedia("(prefers-reduced-motion: reduce)"),i=Object.fromEntries([...document.querySelectorAll("[data-sphere-control]")].map(Z=>[Z.dataset.sphereControl,Z])),r=(Z,pe=100)=>Number(i[Z]?.value??pe)/100,s=(Z,pe)=>i[Z]?.value||pe,a=null,o=null,l=!1,c=0,u=1,d=0,h=0,p=0,_=0,x=0,m=0,f=0,T=0,P=0,S=0,b,M,A,v,w,C={orbitX:0,lift:1.13,distance:6.2,lightGain:1},L=!1,O=0,B=0,R=0,U=()=>{},X=()=>Math.min(1,Math.max(0,scrollY/Math.max(1,innerHeight))),G=()=>{l||(l=!0,cancelAnimationFrame(c),window.removeEventListener("resize",W),window.removeEventListener("scroll",U),It.removeEventListener("pointermove",ee),o&&o.dispose?.(),M?.traverse(Z=>{Z.isMesh&&(Z.geometry?.dispose(),Z.material?.dispose())}),a?.dispose(),It.removeAttribute("data-core-ready"))},te=async()=>{if(t.matches){e("Animation r\xE9duite : Core statique accessible.");return}try{a=new sl({canvas:Jr,alpha:!1,antialias:!1,powerPreference:"high-performance",preserveDrawingBuffer:!1})}catch{e("GPU indisponible : Core statique conserv\xE9."),It.dataset.coreError="webgl";return}a.setClearColor(264213,1),a.outputColorSpace=qt,a.toneMapping=zi,a.toneMappingExposure=1.22,a.shadowMap.enabled=!0,a.shadowMap.type=ho,M=new cs,M.background=new De(264213),M.fog=new ls(527385,.037),A=new Ot(49,1,.1,60),A.position.set(0,1.13,6.2),A.lookAt(0,.05,0);let Z=new De(s("secondary","#552a9d")),pe=new De(s("rim","#55d49a")),ie=new De(s("core","#eaffff")),Ne=new vs(8753582,1121066,.31);M.add(Ne);let be=new Ui(Z,17,12,2),ze=new Ui(pe,16,12,2),j=new Ui(ie,6,8,2);be.position.set(-.8,.3,.28),ze.position.set(.8,.22,.28),j.position.set(0,-.16,.25),be.castShadow=!0,be.shadow.mapSize.set(384,384),be.shadow.bias=-25e-5,be.shadow.normalBias=.02,v={a:be,b:ze,white:j,ambient:Ne},M.add(be,ze,j);let K=(Re,et=.45,Ye=.7)=>new ms({color:Re,roughness:et,metalness:Ye}),ue=(Re,et,Ye,ft,I,pt=0,Qe=0,E=0)=>{let g=new Ft(Re,et);return g.position.set(Ye,ft,I),g.rotation.set(pt,Qe,E),g.receiveShadow=!0,g.castShadow=!1,M.add(g),g},Ue=ue(new gi(45,45),K(2503747,.57,.65),0,-1.42,-2,-Math.PI/2);Ue.receiveShadow=!0;let _e=ue(new wr(1.31,1.39,.13,64),K(3424856,.36,.74),0,-1.35,0);_e.castShadow=!0;let He=ue(new wr(1.13,1.13,.008,64),K(1714230,.55,.62),0,-1.277,0),wt=ue(new ps(1.3,.015,8,120),K(6780811,.31,.75),0,-1.271,0,-Math.PI/2);ue(new rn(14,8,.24),K(1779513,.67,.47),0,.1,-5.2),ue(new rn(.26,5.4,7.5),K(2372167,.53,.67),-4.5,.15,-2),ue(new rn(.26,5.4,7.5),K(2112062,.53,.67),4.5,.15,-2),ue(new rn(12,.18,8),K(1778998,.59,.6),0,3.12,-2);for(let Re=-1;Re<=1;Re++){let et=K(Re===-1?2700106:Re===1?2375482:1713973,.46,.71);ue(new rn(1.08,3.3,.05),et,Re*2.15,0,-5.04)}for(let Re of[-3.32,3.32])ue(new rn(.045,4.9,.05),K(5267577,.33,.72),Re,.14,-4.98);b={uResolution:{value:new Pe(960,570)},uTime:{value:0},uPass:{value:4},uLayer:{value:1},uTilt:{value:new Pe(0,0)},uPointer:{value:new z},uControls:{value:new rt(4,r("particleIntensity",200),r("particleSpeed"),r("particleDensity"))},uShape:{value:new rt(r("diameter",101),r("shellVisibility",0),r("coreSize",73),r("coreLight",500))},uEffects:{value:new rt(r("arcIntensity",140),r("arcDensity"),r("particleSize"),r("opacity"))},uCore:{value:ie},uCyan:{value:pe},uViolet:{value:Z},uDeep:{value:new De(s("primary","#190d35"))},uVolumeSteps:{value:18},uFlow:{value:new Pe(0,r("flowStructure",94))},uSceneScroll:{value:0},uSceneQuality:{value:1}},w=new Ft(new gi(2,2),new xt({uniforms:b,vertexShader:Eg,fragmentShader:Ag,transparent:!0,depthTest:!1,depthWrite:!1,blending:bi,toneMapped:!1,glslVersion:zc})),w.frustumCulled=!1,w.renderOrder=100,M.add(w);try{let Re=(0,Cg.getProject)("Synestra R201",{state:{sheetsById:{},definitionVersion:"0.4.0",revisionHistory:[]}}),et=Re.sheet("Core Arrival"),Ye=et.object("Camera + Light",{orbitX:0,lift:1.13,distance:6.2,lightGain:1});Ye.onValuesChange(I=>{C=I,A.position.set(I.orbitX,I.lift,I.distance),A.lookAt(0,.05,0),It.dataset.cameraPos=[I.orbitX,I.lift,I.distance].map(pt=>pt.toFixed(3)).join(",")}),await Re.ready,L=!0;let ft=()=>{let I=X(),pt=I*I*(3-2*I);et.sequence.position=I*4,Ye.initialValue={orbitX:.5*pt,lift:1.13+.25*pt,distance:6.2-.9*pt,lightGain:1+.14*pt},It.dataset.theatrePosition=et.sequence.position.toFixed(3)};U=ft,window.addEventListener("scroll",U,{passive:!0}),ft()}catch(Re){It.dataset.theatreError=String(Re).slice(0,110),e("Mise en sc\xE8ne r\xE9duite : sc\xE8ne 3D active.")}let Be=1;try{let Re=await wg({gl:a.getContext(),benchmarksURL:new URL("./r201-gpu-benchmarks",import.meta.url).href});Be=Math.max(0,Math.min(3,Re.tier||0))}catch{Be=1}if(Be===0){a.dispose(),a=null,It.dataset.coreError="low-tier",e("GPU insuffisant : visuel fixe.");return}let $e=matchMedia("(pointer:coarse)").matches||innerWidth<700?Math.min(2,Be):Be;if(It.dataset.gpuTier=String($e),$e<=1?(be.castShadow=!1,a.shadowMap.enabled=!1,b.uVolumeSteps.value=10,u=.67):$e===2?(b.uVolumeSteps.value=14,u=.84):(b.uVolumeSteps.value=18,u=1),$e===3){o=new Wl(a),o.addPass(new ql(M,A));let Re=new Zr(new Pe(1,1),.17,.34,.87);o.addPass(Re),o.addPass(new Xl)}let We=()=>{be.color.set(s("secondary","#552a9d")),ze.color.set(s("rim","#55d49a")),j.color.set(s("core","#eaffff")),b.uCyan.value.copy(ze.color),b.uViolet.value.copy(be.color),b.uCore.value.copy(j.color),b.uShape.value.set(r("diameter",101),r("shellVisibility",0),r("coreSize",73),r("coreLight",500))};It.querySelectorAll("input[data-sphere-control]").forEach(Re=>Re.addEventListener("input",We,{passive:!0})),W();let at=Re=>{if(c=0,l||document.visibilityState==="hidden")return;let et=m?Math.min((Re-m)/1e3,.1):0;m=Re,x+=et,d++,d>1&&(et>.052?(p++,_=0):et<.029&&(_++,p=Math.max(0,p-1)),p>25&&u>.55&&(u=Math.max(.55,u-.08),p=0,W()),_>150&&u<1&&(u=Math.min(1,u+.05),_=0,W())),f+=(T-f)*(1-Math.exp(-et*12)),T*=Math.exp(-et*2.5),b.uTime.value=x,b.uPointer.value.set(P,S,f);let Ye=r("coreLight",500)/5*C.lightGain;be.intensity=17*Ye,ze.intensity=16*Ye,j.intensity=6*Ye,o?o.render():a.render(M,A),It.hasAttribute("data-core-ready")||(It.dataset.coreReady="true",e(L?"Three.js et Theatre.js actifs.":"Three.js actif.")),h||(h=Re),d%45===0&&(It.dataset.coreFps=(45e3/Math.max(1,Re-h)).toFixed(1),It.dataset.coreQuality=u.toFixed(2),It.dataset.theatreReady=String(L),h=Re),c=requestAnimationFrame(at)};c=requestAnimationFrame(at),Jr.addEventListener("webglcontextlost",Re=>{Re.preventDefault(),e("GPU perdu : visuel de secours."),G()},{once:!0})};window.addEventListener("resize",W,{passive:!0}),It.addEventListener("pointermove",ee,{passive:!0}),It.addEventListener("pointerleave",()=>{T=0},{passive:!0}),te()}
/*! For license information please see r201-scene.bundle.mjs.LEGAL.txt */
