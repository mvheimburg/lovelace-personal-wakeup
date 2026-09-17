/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3=globalThis,e$4=t$3.ShadowRoot&&(void 0===t$3.ShadyCSS||t$3.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$4=new WeakMap;let n$3 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$4&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$4.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$4.set(s,t));}return t}toString(){return this.cssText}};const r$4=t=>new n$3("string"==typeof t?t:t+"",void 0,s$2),i$4=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1]),t[0]);return new n$3(o,t,s$2)},S$1=(s,o)=>{if(e$4)s.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of o){const o=document.createElement("style"),n=t$3.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$4?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$4(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$3,defineProperty:e$3,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$3,getOwnPropertySymbols:o$3,getPrototypeOf:n$2}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$3(t,s),b={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$3(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$2(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$3(t),...o$3(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach((t=>t.hostConnected?.()));}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()));}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i){if(void 0!==t){const e=this.constructor,h=this[t];if(i??=e.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(e._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach((t=>this._$ET(t,this[t]))),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,i$2=t$2.trustedTypes,s$1=i$2?i$2.createPolicy("lit-html",{createHTML:t=>t}):void 0,e$2="$lit$",h=`lit$${Math.random().toFixed(9).slice(2)}$`,o$2="?"+h,n$1=`<${o$2}>`,r$2=document,l=()=>r$2.createComment(""),c=t=>null===t||"object"!=typeof t&&"function"!=typeof t,a=Array.isArray,u=t=>a(t)||"function"==typeof t?.[Symbol.iterator],d="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,_=/>/g,m=RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),p=/'/g,g=/"/g,$=/^(?:script|style|textarea|title)$/i,y=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=y(1),T=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),A=new WeakMap,C=r$2.createTreeWalker(r$2,129);function P(t,i){if(!a(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==s$1?s$1.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,o=[];let r,l=2===i?"<svg>":3===i?"<math>":"",c=f;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,y=0;for(;y<s.length&&(c.lastIndex=y,u=c.exec(s),null!==u);)y=c.lastIndex,c===f?"!--"===u[1]?c=v:void 0!==u[1]?c=_:void 0!==u[2]?($.test(u[2])&&(r=RegExp("</"+u[2],"g")),c=m):void 0!==u[3]&&(c=m):c===m?">"===u[0]?(c=r??f,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?m:'"'===u[3]?g:p):c===g||c===p?c=m:c===v||c===_?c=f:(c=m,r=void 0);const x=c===m&&t[i+1].startsWith("/>")?" ":"";l+=c===f?s+n$1:d>=0?(o.push(a),s.slice(0,d)+e$2+s.slice(d)+h+x):s+h+(-2===d?i:x);}return [P(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),o]};class N{constructor({strings:t,_$litType$:s},n){let r;this.parts=[];let c=0,a=0;const u=t.length-1,d=this.parts,[f,v]=V(t,s);if(this.el=N.createElement(f,n),C.currentNode=this.el.content,2===s||3===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=C.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(e$2)){const i=v[a++],s=r.getAttribute(t).split(h),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:c,name:e[2],strings:s,ctor:"."===e[1]?H:"?"===e[1]?I:"@"===e[1]?L:k}),r.removeAttribute(t);}else t.startsWith(h)&&(d.push({type:6,index:c}),r.removeAttribute(t));if($.test(r.tagName)){const t=r.textContent.split(h),s=t.length-1;if(s>0){r.textContent=i$2?i$2.emptyScript:"";for(let i=0;i<s;i++)r.append(t[i],l()),C.nextNode(),d.push({type:2,index:++c});r.append(t[s],l());}}}else if(8===r.nodeType)if(r.data===o$2)d.push({type:2,index:c});else {let t=-1;for(;-1!==(t=r.data.indexOf(h,t+1));)d.push({type:7,index:c}),t+=h.length-1;}c++;}}static createElement(t,i){const s=r$2.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){if(i===T)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=c(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=S(t,h._$AS(t,i.values),h,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??r$2).importNode(i,true);C.currentNode=e;let h=C.nextNode(),o=0,n=0,l=s[0];for(;void 0!==l;){if(o===l.index){let i;2===l.type?i=new R(h,h.nextSibling,this,t):1===l.type?i=new l.ctor(h,l.name,l.strings,this,t):6===l.type&&(i=new z(h,this,t)),this._$AV.push(i),l=s[++n];}o!==l?.index&&(h=C.nextNode(),o++);}return C.currentNode=r$2,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),c(t)?t===E||null==t||""===t?(this._$AH!==E&&this._$AR(),this._$AH=E):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):u(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==E&&c(this._$AH)?this._$AA.nextSibling.data=t:this.T(r$2.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=N.createElement(P(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new M(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=A.get(t.strings);return void 0===i&&A.set(t.strings,i=new N(t)),i}k(t){a(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new R(this.O(l()),this.O(l()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(false,true,i);t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class k{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=E,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=E;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=S(this,t,i,0),o=!c(t)||t!==this._$AH&&t!==T,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=S(this,e[s+n],i,n),r===T&&(r=this._$AH[n]),o||=!c(r)||r!==this._$AH[n],r===E?t=E:t!==E&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===E?void 0:t;}}class I extends k{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==E);}}class L extends k{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=S(this,t,i,0)??E)===T)return;const s=this._$AH,e=t===E&&s!==E||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==E&&(s===E||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const j=t$2.litHtmlPolyfillSupport;j?.(N,R),(t$2.litHtmlVersions??=[]).push("3.3.1");const B=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new R(i.insertBefore(l(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;let i$1 = class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=B(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return T}};i$1._$litElement$=true,i$1["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i$1});const o$1=s.litElementPolyfillSupport;o$1?.({LitElement:i$1});(s.litElementVersions??=[]).push("4.2.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=t=>(e,o)=>{ void 0!==o?o.addInitializer((()=>{customElements.define(t,e);})):customElements.define(t,e);};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o={attribute:true,type:String,converter:u$1,reflect:false,hasChanged:f$1},r$1=(t=o,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=true),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t);},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t);}}throw Error("Unsupported decorator location: "+n)};function n(t){return (e,o)=>"object"==typeof o?r$1(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r(r){return n({...r,state:true,attribute:false})}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1},e$1=t=>(...e)=>({_$litDirective$:t,values:e});class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const e=e$1(class extends i{constructor(t$1){if(super(t$1),t$1.type!==t.ATTRIBUTE||"class"!==t$1.name||t$1.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return " "+Object.keys(t).filter((s=>t[s])).join(" ")+" "}update(s,[i]){if(void 0===this.st){this.st=new Set,void 0!==s.strings&&(this.nt=new Set(s.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in i)i[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(i)}const r=s.element.classList;for(const t of this.st)t in i||(r.remove(t),this.st.delete(t));for(const t in i){const s=!!i[t];s===this.st.has(t)||this.nt?.has(t)||(s?(r.add(t),this.st.add(t)):(r.remove(t),this.st.delete(t)));}return T}});

const SCHEMA = [
    {
        name: "appearance",
        selector: {
            select: {
                mode: "dropdown",
                options: [
                    { value: "default", label: "Default" },
                    { value: "bubble", label: "Bubble" }
                ]
            }
        }
    },
    {
        name: "entity",
        required: true,
        selector: { entity: { integration: "personal_wakeup", domain: "sensor" } }
    },
    { name: "name", selector: { text: {} } },
    {
        name: "snooze_presets",
        selector: { text: {} }
    }
];
const LABELS = {
    appearance: "Appearance",
    entity: "Wakeup alarm entity",
    name: "Name (optional)",
    snooze_presets: "Snooze presets in minutes (optional, e.g. 5, 10, 15)"
};
let PersonalWakeupCardEditor = class PersonalWakeupCardEditor extends i$1 {
    setConfig(config) {
        this._config = { appearance: "default", ...config };
    }
    _valueChanged(ev) {
        ev.stopPropagation();
        if (!this._config)
            return;
        const value = { ...ev.detail.value };
        // The form edits presets as text; store them as a clean number list.
        const rawPresets = value.snooze_presets;
        if (typeof rawPresets === "string") {
            const nums = rawPresets
                .split(/[\s,]+/)
                .map((s) => Number(s))
                .filter((n) => Number.isFinite(n) && n > 0);
            if (nums.length)
                value.snooze_presets = nums;
            else
                delete value.snooze_presets;
        }
        if (value.name === "")
            delete value.name;
        const newConfig = { ...this._config, ...value };
        for (const key of ["name", "snooze_presets"]) {
            if (!(key in value))
                delete newConfig[key];
        }
        this.dispatchEvent(new CustomEvent("config-changed", {
            detail: { config: newConfig },
            bubbles: true,
            composed: true
        }));
    }
    render() {
        if (!this.hass || !this._config)
            return x ``;
        const data = {
            ...this._config,
            snooze_presets: Array.isArray(this._config.snooze_presets)
                ? this._config.snooze_presets.join(", ")
                : this._config.snooze_presets ?? ""
        };
        return x `
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${SCHEMA}
        .computeLabel=${(s) => LABELS[s.name] ?? s.name}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
    }
};
PersonalWakeupCardEditor.styles = i$4 `
    ha-form {
      display: block;
      padding: 8px 0;
    }
  `;
__decorate([
    n({ attribute: false })
], PersonalWakeupCardEditor.prototype, "hass", void 0);
__decorate([
    r()
], PersonalWakeupCardEditor.prototype, "_config", void 0);
PersonalWakeupCardEditor = __decorate([
    t$1("lovelace-personal-wakeup-card-editor")
], PersonalWakeupCardEditor);

const WEEKDAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const WEEKDAY_LABELS = {
    mon: "Mo",
    tue: "Tu",
    wed: "We",
    thu: "Th",
    fri: "Fr",
    sat: "Sa",
    sun: "Su"
};
const DEFAULT_SNOOZE_PRESETS = [5, 10, 15];
const STATE_LABELS = {
    disarmed: "Off",
    armed: "Armed",
    rising: "Waking up",
    ringing: "Ringing",
    snoozed: "Snoozed",
    unavailable: "Unavailable",
    unknown: "Unknown"
};
const STATE_ICONS = {
    disarmed: "mdi:alarm-off",
    armed: "mdi:alarm",
    rising: "mdi:weather-sunset-up",
    ringing: "mdi:alarm-light",
    snoozed: "mdi:alarm-snooze"
};
let PersonalWakeupCard = class PersonalWakeupCard extends i$1 {
    constructor() {
        super(...arguments);
        /** Live slider values while dragging, keyed by attribute name. */
        this._draft = {};
        this._busy = null;
    }
    setConfig(config) {
        if (!config.entity) {
            throw new Error("You must define an entity for lovelace-personal-wakeup-card");
        }
        this._config = config;
        this.setAttribute("data-appearance", config.appearance === "bubble" ? "bubble" : "default");
    }
    getCardSize() {
        return 3;
    }
    static getConfigElement() {
        return document.createElement("lovelace-personal-wakeup-card-editor");
    }
    static getStubConfig(hass) {
        const found = hass
            ? Object.values(hass.states).find((s) => s.entity_id.startsWith("sensor.") &&
                "next_fire" in s.attributes &&
                "time_of_day" in s.attributes)
            : undefined;
        return {
            type: "custom:lovelace-personal-wakeup-card",
            entity: found?.entity_id ?? ""
        };
    }
    connectedCallback() {
        super.connectedCallback();
        // Re-render every 30 s so "in 12 min" style countdowns stay honest.
        this._tick = window.setInterval(() => this.requestUpdate(), 30000);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        if (this._tick)
            window.clearInterval(this._tick);
    }
    // ---------------------------------------------------------------- helpers
    _entity() {
        return this.hass?.states?.[this._config?.entity];
    }
    _lang() {
        return this.hass?.locale?.language || undefined;
    }
    _fmtTime(value) {
        if (!value)
            return "";
        const d = new Date(value);
        if (Number.isNaN(d.getTime()))
            return String(value);
        return d.toLocaleTimeString(this._lang(), { hour: "2-digit", minute: "2-digit" });
    }
    _fmtDay(value) {
        if (!value)
            return "";
        const d = new Date(value);
        if (Number.isNaN(d.getTime()))
            return "";
        const now = new Date();
        const startOf = (x) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
        const dayDiff = Math.round((startOf(d) - startOf(now)) / 86400000);
        if (dayDiff === 0)
            return "Today";
        if (dayDiff === 1)
            return "Tomorrow";
        return d.toLocaleDateString(this._lang(), { weekday: "short" });
    }
    _fmtRelative(value) {
        if (!value)
            return "";
        const diffMin = Math.round((new Date(value).getTime() - Date.now()) / 60000);
        if (Number.isNaN(diffMin))
            return "";
        const abs = Math.abs(diffMin);
        const h = Math.floor(abs / 60);
        const m = abs % 60;
        const span = h ? (m ? `${h} h ${m} min` : `${h} h`) : `${m} min`;
        return diffMin >= 0 ? `in ${span}` : `${span} ago`;
    }
    _normalizeTime(value) {
        if (!value)
            return "07:00";
        const s = String(value);
        return s.length >= 5 && s.indexOf(":") === 2 ? s.slice(0, 5) : "07:00";
    }
    _toast(message) {
        this.dispatchEvent(new CustomEvent("hass-notification", {
            detail: { message },
            bubbles: true,
            composed: true
        }));
    }
    async _call(service, data = {}, label = service) {
        this._busy = label;
        try {
            await this.hass.callService("personal_wakeup", service, {
                entity_id: this._config.entity,
                ...data
            });
        }
        catch (err) {
            const msg = err?.message || err?.error || String(err);
            this._toast(`Wakeup alarm: ${service} failed (${msg})`);
        }
        finally {
            this._busy = null;
        }
    }
    _set(partial) {
        return this._call("set_config", partial, "set_config");
    }
    _openSettings() {
        this.renderRoot.querySelector("dialog")?.showModal();
    }
    _closeSettings() {
        this.renderRoot.querySelector("dialog")?.close();
    }
    _sliderInput(key, ev) {
        const value = Number(ev.target.value);
        this._draft = { ...this._draft, [key]: value };
    }
    async _sliderChange(key, ev, scale = 1) {
        const value = Number(ev.target.value);
        await this._set({ [key]: value * scale });
        const draft = { ...this._draft };
        delete draft[key];
        this._draft = draft;
    }
    _toggleWeekday(day, current) {
        const next = current.includes(day)
            ? current.filter((d) => d !== day)
            : [...current, day];
        if (!next.length) {
            this._toast("At least one weekday must stay selected");
            return;
        }
        this._set({ weekdays: WEEKDAYS.filter((d) => next.includes(d)) });
    }
    // ---------------------------------------------------------------- render
    render() {
        const stateObj = this._entity();
        if (!stateObj) {
            return x `
        <ha-card>
          <div class="error">
            <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
            Entity ${this._config?.entity || "(not set)"} not found
          </div>
        </ha-card>
      `;
        }
        const a = stateObj.attributes;
        const st = stateObj.state;
        const active = st === "rising" || st === "ringing";
        const snoozed = st === "snoozed";
        const canStop = Boolean(a.can_stop) || active || snoozed;
        const canSnooze = Boolean(a.can_snooze) || active || snoozed;
        const enabled = Boolean(a.enabled);
        const requireHome = Boolean(a.require_home);
        const skipNext = Boolean(a.skip_next);
        const timeOfDay = this._normalizeTime(a.time_of_day);
        const weekdays = Array.isArray(a.weekdays) ? a.weekdays : [...WEEKDAYS];
        const fadeMin = this._draft.fade_duration ?? Math.round(Number(a.fade_duration ?? 900) / 60);
        const musicMin = this._draft.fade_music_duration ??
            Math.round(Number(a.fade_music_duration ?? 300) / 60);
        const volume = this._draft.volume ?? Number(a.volume ?? 0.25);
        const playlist = a.playlist ?? "";
        const playlistOptions = Array.isArray(a.playlist_options)
            ? a.playlist_options
            : [];
        const nextFire = a.next_fire ?? null;
        const skippedFire = a.skipped_fire ?? null;
        const snoozeUntil = a.snooze_until ?? null;
        const runStarted = a.run_started ?? null;
        const personEntity = a.person_entity ?? null;
        const personState = personEntity ? this.hass.states[personEntity]?.state : undefined;
        const defaultSnooze = Number(a.snooze_minutes ?? 10);
        const presets = Array.from(new Set([...(this._config.snooze_presets ?? DEFAULT_SNOOZE_PRESETS), defaultSnooze])).sort((x, y) => x - y);
        const title = this._config.name || a.friendly_name || "Wakeup alarm";
        const icon = STATE_ICONS[st] ?? "mdi:alarm";
        return x `
      <ha-card class=${e({ [`is-${st}`]: true })}>
        <div class="header">
          <div class="header-main">
            <div class="icon-wrap"><ha-icon icon=${icon}></ha-icon></div>
            <div class="header-text">
              <div class="title">${title}</div>
              <div class="subtitle">${this._renderSubtitle(st, nextFire, snoozeUntil, runStarted)}</div>
            </div>
          </div>
          <div class="header-actions">
            <div class="pill"><span class="dot"></span>${STATE_LABELS[st] ?? st}</div>
            <button class="icon-button" type="button" title="Configure" aria-label="Configure"
              @click=${this._openSettings}>
              <ha-icon icon="mdi:cog-outline"></ha-icon>
            </button>
          </div>
        </div>

        ${canStop
            ? x `
              <div class="hero">
                <div class="hero-text">
                  ${snoozed
                ? x `<span class="hero-title">Snoozed</span>
                        <span class="hero-sub">Rings again at ${this._fmtTime(snoozeUntil)}
                          <em>${this._fmtRelative(snoozeUntil)}</em></span>`
                : st === "rising"
                    ? x `<span class="hero-title">Waking up</span>
                          <span class="hero-sub">Light and music fading in since
                            ${this._fmtTime(runStarted)}</span>`
                    : x `<span class="hero-title">Ringing</span>
                          <span class="hero-sub">Since ${this._fmtTime(runStarted)}</span>`}
                </div>
                <button
                  class="stop"
                  type="button"
                  ?disabled=${this._busy === "stop"}
                  @click=${() => this._call("stop")}
                >
                  <ha-icon icon="mdi:stop-circle-outline"></ha-icon>
                  Stop
                </button>
                ${canSnooze
                ? x `
                      <div class="snooze-row">
                        <span class="snooze-label">
                          <ha-icon icon="mdi:alarm-snooze"></ha-icon>Snooze
                        </span>
                        ${presets.map((m) => x `
                            <button
                              class=${e({ preset: true, primary: m === defaultSnooze })}
                              type="button"
                              ?disabled=${this._busy === `snooze-${m}`}
                              @click=${() => this._call("snooze", { duration_minutes: m }, `snooze-${m}`)}
                            >
                              ${m} min
                            </button>
                          `)}
                      </div>
                    `
                : E}
              </div>
            `
            : E}

        <div class="settings">
          <div class="toggles">
            <label class="toggle">
              <span>
                <ha-icon icon="mdi:power"></ha-icon>
                Enabled
              </span>
              <ha-switch
                .checked=${enabled}
                @change=${(e) => this._set({ enabled: e.target.checked })}
              ></ha-switch>
            </label>
            <label class="toggle">
              <span>
                <ha-icon icon="mdi:debug-step-over"></ha-icon>
                Skip next
                ${skipNext && skippedFire
            ? x `<small>${this._fmtDay(skippedFire)} ${this._fmtTime(skippedFire)}</small>`
            : E}
              </span>
              <ha-switch
                .checked=${skipNext}
                ?disabled=${!enabled}
                @change=${(e) => this._set({ skip_next: e.target.checked })}
              ></ha-switch>
            </label>
          </div>

        </div>
      </ha-card>

      <dialog aria-labelledby="settings-title" @click=${(e) => {
            if (e.target !== e.currentTarget)
                return;
            const rect = e.currentTarget.getBoundingClientRect();
            if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
                this._closeSettings();
            }
        }}>
        <div class="dialog-header">
          <h2 id="settings-title">${title} settings</h2>
          <button class="icon-button" type="button" title="Close settings" aria-label="Close settings"
            autofocus @click=${this._closeSettings}>
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
        </div>
        <div class="settings">
          <div class="field time-field">
            <span class="label"><ha-icon icon="mdi:clock-outline"></ha-icon>Alarm time</span>
            <input
              class="time-input"
              type="time"
              aria-label="Alarm time"
              .value=${timeOfDay}
              @change=${(e) => this._set({ time_of_day: e.target.value })}
            />
          </div>

          <div class="field">
            <span class="label"><ha-icon icon="mdi:calendar-week"></ha-icon>Repeat</span>
            <div class="weekdays">
              ${WEEKDAYS.map((d) => x `
                  <button
                    type="button"
                    class=${e({ day: true, on: weekdays.includes(d) })}
                    aria-pressed=${weekdays.includes(d)}
                    @click=${() => this._toggleWeekday(d, weekdays)}
                  >
                    ${WEEKDAY_LABELS[d]}
                  </button>
                `)}
            </div>
          </div>

          ${this._renderSlider("mdi:weather-sunset-up", "Light fade", "fade_duration", fadeMin, 1, 60, 1, `${fadeMin} min`, 60)}
          ${this._renderSlider("mdi:music-note", "Music fade", "fade_music_duration", musicMin, 1, 30, 1, `${musicMin} min`, 60)}
          ${this._renderSlider("mdi:volume-high", "Volume", "volume", volume, 0, 1, 0.05, `${Math.round(volume * 100)}%`)}

          <div class="field">
            <span class="label"><ha-icon icon="mdi:playlist-music"></ha-icon>Playlist</span>
            ${playlistOptions.length
            ? x `
                  <select
                    aria-label="Playlist"
                    .value=${playlist}
                    @change=${(e) => this._set({ playlist: e.target.value })}
                  >
                    ${playlistOptions.map((opt) => x `<option .value=${opt} ?selected=${opt === playlist}>${opt}</option>`)}
                  </select>
                `
            : x `<span class="value muted">${playlist || "No playlist configured"}</span>`}
          </div>
          ${this._renderEntitySelector("light_entity", "Wakeup light", "light", a.light_entity)}
          ${this._renderEntitySelector("ma_player_entity", "Music player", "media_player", a.player_entity)}
          ${this._renderEntitySelector("person_entity", "Person", "person", personEntity)}
          <div class="toggles">
            <label class="toggle">
              <span>
                <ha-icon icon="mdi:home-account"></ha-icon>Only when home
                ${personEntity
            ? x `<small class=${e({ away: personState !== "home" })}>
                      ${personState === "home" ? "home" : personState ?? "unknown"}
                    </small>`
            : E}
              </span>
              <ha-switch .checked=${requireHome} ?disabled=${!personEntity}
                @change=${(e) => this._set({ require_home: e.target.checked })}
              ></ha-switch>
            </label>
          </div>
        </div>

        <div class="footer">
          <span class="footer-note">
            ${nextFire && !snoozed
            ? x `<ha-icon icon="mdi:alarm-check"></ha-icon>
                  Next: ${this._fmtDay(nextFire)} ${this._fmtTime(nextFire)}`
            : enabled
                ? E
                : x `<ha-icon icon="mdi:alarm-off"></ha-icon> Alarm is off`}
          </span>
          <button
            class="text-button"
            type="button"
            ?disabled=${this._busy === "trigger_now"}
            @click=${() => {
            this._closeSettings();
            return this._call("trigger_now");
        }}
          >
            <ha-icon icon="mdi:play-circle-outline"></ha-icon>
            Test now
          </button>
        </div>
      </dialog>
    `;
    }
    _renderSubtitle(st, nextFire, snoozeUntil, runStarted) {
        switch (st) {
            case "armed":
                return nextFire
                    ? `${this._fmtDay(nextFire)} ${this._fmtTime(nextFire)} · ${this._fmtRelative(nextFire)}`
                    : "No upcoming alarm";
            case "snoozed":
                return `Rings again at ${this._fmtTime(snoozeUntil)}`;
            case "rising":
                return `Started ${this._fmtTime(runStarted)}`;
            case "ringing":
                return `Ringing since ${this._fmtTime(runStarted)}`;
            case "disarmed":
                return "Alarm is off";
            default:
                return "";
        }
    }
    _renderSlider(icon, label, key, value, min, max, step, display, scale = 1) {
        return x `
      <div class="field slider-field">
        <span class="label">
          <ha-icon icon=${icon}></ha-icon>${label}
          <span class="value">${display}</span>
        </span>
        <ha-slider
          min=${min}
          max=${max}
          step=${step}
          .value=${value}
          @input=${(e) => this._sliderInput(key, e)}
          @change=${(e) => this._sliderChange(key, e, scale)}
        ></ha-slider>
      </div>
    `;
    }
    _renderEntitySelector(key, label, domain, value) {
        return x `
      <div class="field device-field">
        <ha-selector
          .hass=${this.hass}
          .selector=${{ entity: { domain } }}
          .value=${value || undefined}
          .label=${label}
          .required=${key !== "person_entity"}
          .disabled=${this._busy !== null}
          @value-changed=${(ev) => {
            ev.stopPropagation();
            const selected = ev.detail.value ?? "";
            if (typeof selected === "string" && (selected || key === "person_entity")) {
                void this._set({ [key]: selected });
            }
        }}
        ></ha-selector>
      </div>
    `;
    }
};
PersonalWakeupCard.styles = i$4 `
    :host {
      --pw-accent: var(--primary-color, #03a9f4);
      --pw-accent-text: var(--text-primary-color, #fff);
      --pw-danger: var(--error-color, #db4437);
      --pw-warn: var(--warning-color, #ff9800);
      --pw-info: var(--info-color, #4a6cf7);
      --pw-muted: var(--secondary-text-color, #727272);
      --pw-surface: var(--secondary-background-color, rgba(127, 127, 127, 0.08));
      --pw-radius: var(--ha-card-border-radius, 12px);
      --pw-ring-color: var(--pw-accent);
    }

    ha-card {
      padding: 16px;
      box-sizing: border-box;
      overflow: hidden;
    }
    ha-card.is-ringing { --pw-ring-color: var(--pw-danger); }
    ha-card.is-rising { --pw-ring-color: var(--pw-warn); }
    ha-card.is-snoozed { --pw-ring-color: var(--pw-info); }
    ha-card.is-disarmed { --pw-ring-color: var(--pw-muted); }

    /* ---------- header ---------- */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }
    .header-main {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
    }
    .icon-wrap {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      flex: none;
      background: color-mix(in srgb, var(--pw-ring-color) 16%, transparent);
      color: var(--pw-ring-color);
      transition: background 300ms, color 300ms;
    }
    .icon-wrap ha-icon {
      --mdc-icon-size: 24px;
    }
    .is-ringing .icon-wrap {
      animation: pw-pulse 1.4s ease-in-out infinite;
    }
    .header-text { min-width: 0; }
    .title {
      font-size: 1.1rem;
      font-weight: 600;
      line-height: 1.25;
      overflow-wrap: anywhere;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .subtitle {
      font-size: 0.82rem;
      color: var(--pw-muted);
      margin-top: 2px;
    }
    .header-actions { display: flex; align-items: center; gap: 4px; flex: none; }
    .icon-button {
      display: inline-grid;
      place-items: center;
      width: 40px;
      height: 40px;
      padding: 0;
      border: none;
      border-radius: 50%;
      background: transparent;
      color: var(--pw-muted);
      cursor: pointer;
      flex: none;
    }
    .icon-button:hover { background: var(--pw-surface); }
    button:focus-visible { outline: 2px solid var(--pw-accent); outline-offset: 2px; }
    dialog {
      box-sizing: border-box;
      width: min(520px, calc(100vw - 32px));
      max-height: calc(100dvh - 32px);
      padding: 20px;
      border: 1px solid var(--divider-color, #ddd);
      border-radius: var(--pw-radius);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #212121);
      box-shadow: 0 12px 40px #0004;
      overflow: auto;
    }
    dialog::backdrop { background: #0007; }
    .dialog-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    .dialog-header h2 { margin: 0; font-size: 1.1rem; font-weight: 600; overflow-wrap: anywhere; }
    .device-field { grid-column: 1 / -1; }
    ha-selector { display: block; min-width: 0; }
    .pill {
      flex: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.02em;
      padding: 4px 10px;
      border-radius: 999px;
      color: var(--pw-ring-color);
      background: color-mix(in srgb, var(--pw-ring-color) 14%, transparent);
    }
    .dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: currentColor;
    }
    .is-ringing .dot,
    .is-rising .dot {
      animation: pw-blink 1s steps(2, start) infinite;
    }

    /* ---------- hero (active alarm) ---------- */
    .hero {
      margin-top: 16px;
      padding: 16px;
      border-radius: var(--pw-radius);
      display: flex;
      flex-direction: column;
      gap: 12px;
      color: var(--pw-ring-color);
      background: linear-gradient(
        135deg,
        color-mix(in srgb, var(--pw-ring-color) 22%, transparent),
        color-mix(in srgb, var(--pw-ring-color) 6%, transparent)
      );
      border: 1px solid color-mix(in srgb, var(--pw-ring-color) 30%, transparent);
    }
    .hero-text {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .hero-title {
      font-size: 1.35rem;
      font-weight: 700;
      letter-spacing: -0.01em;
    }
    .hero-sub {
      font-size: 0.85rem;
      color: var(--primary-text-color);
      opacity: 0.85;
    }
    .hero-sub em {
      font-style: normal;
      color: var(--pw-muted);
      margin-left: 6px;
    }
    .stop {
      width: 100%;
      padding: 16px;
      border: none;
      border-radius: calc(var(--pw-radius) - 2px);
      background: var(--pw-danger);
      color: #fff;
      font-size: 1.1rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      box-shadow: 0 6px 18px color-mix(in srgb, var(--pw-danger) 35%, transparent);
      transition: transform 120ms ease, filter 120ms ease;
    }
    .stop ha-icon { --mdc-icon-size: 26px; }
    .stop:hover { filter: brightness(1.05); }
    .stop:active { transform: scale(0.985); }
    .snooze-row {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .snooze-label {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--primary-text-color);
      margin-right: 4px;
    }
    .snooze-label ha-icon { --mdc-icon-size: 18px; }
    .preset {
      flex: 1 1 auto;
      min-width: 64px;
      padding: 10px 12px;
      border-radius: 999px;
      border: 1px solid color-mix(in srgb, var(--pw-ring-color) 45%, transparent);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: transform 120ms ease, background 120ms ease;
    }
    .preset.primary {
      background: var(--pw-ring-color);
      border-color: var(--pw-ring-color);
      color: var(--pw-accent-text);
    }
    .preset:hover { filter: brightness(1.05); }
    .preset:active { transform: scale(0.97); }
    button:disabled { opacity: 0.6; cursor: progress; }

    /* ---------- settings ---------- */
    .settings {
      margin-top: 16px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px 20px;
    }
    .toggles {
      grid-column: 1 / -1;
      display: flex;
      flex-direction: column;
      border-radius: calc(var(--pw-radius) - 4px);
      background: var(--pw-surface);
      overflow: hidden;
    }
    .toggle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      font-size: 0.9rem;
      cursor: pointer;
    }
    .toggle + .toggle {
      border-top: 1px solid color-mix(in srgb, var(--pw-muted) 18%, transparent);
    }
    .toggle > span {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
      white-space: nowrap;
    }
    .toggle ha-icon {
      --mdc-icon-size: 20px;
      color: var(--pw-muted);
    }
    .toggle small {
      font-size: 0.72rem;
      color: var(--pw-muted);
      padding: 1px 6px;
      border-radius: 999px;
      background: color-mix(in srgb, var(--pw-muted) 14%, transparent);
    }
    .toggle small.away {
      color: var(--pw-warn);
      background: color-mix(in srgb, var(--pw-warn) 14%, transparent);
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-width: 0;
    }
    .label {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.8rem;
      font-weight: 500;
      color: var(--pw-muted);
    }
    .label ha-icon { --mdc-icon-size: 18px; }
    .label .value {
      margin-left: auto;
      color: var(--primary-text-color);
      font-weight: 600;
      font-variant-numeric: tabular-nums;
    }
    .value.muted { color: var(--pw-muted); font-weight: 400; }
    .time-input,
    select {
      width: 100%;
      box-sizing: border-box;
      padding: 8px 10px;
      font-size: 1rem;
      font-family: inherit;
      border-radius: 8px;
      border: 1px solid var(--divider-color, rgba(127,127,127,0.3));
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
    }
    .time-input {
      font-size: 1.25rem;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
    }
    .weekdays {
      display: flex;
      gap: 4px;
    }
    .day {
      flex: 1;
      padding: 7px 0;
      border-radius: 8px;
      border: 1px solid var(--divider-color, rgba(127,127,127,0.3));
      background: transparent;
      color: var(--pw-muted);
      font-size: 0.78rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 120ms, color 120ms;
    }
    .day.on {
      background: var(--pw-accent);
      border-color: var(--pw-accent);
      color: var(--pw-accent-text);
    }
    .slider-field ha-slider {
      width: 100%;
      margin: 0 -4px;
    }

    /* ---------- footer ---------- */
    .footer {
      margin-top: 14px;
      padding-top: 10px;
      border-top: 1px solid var(--divider-color, rgba(127,127,127,0.2));
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      font-size: 0.82rem;
      color: var(--pw-muted);
    }
    .footer-note {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .footer ha-icon { --mdc-icon-size: 18px; }
    .text-button {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 6px 10px;
      border-radius: 999px;
      border: none;
      background: transparent;
      color: var(--pw-accent);
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
    }
    .text-button:hover {
      background: color-mix(in srgb, var(--pw-accent) 10%, transparent);
    }

    .error {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--pw-danger);
    }

    @keyframes pw-pulse {
      0%, 100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--pw-ring-color) 45%, transparent); }
      50% { box-shadow: 0 0 0 10px color-mix(in srgb, var(--pw-ring-color) 0%, transparent); }
    }
    @keyframes pw-blink {
      to { opacity: 0.25; }
    }

    :host([data-appearance="bubble"]) {
      --pw-accent: var(--bubble-accent-color, var(--primary-color, #03a9f4));
      --pw-surface: var(--bubble-secondary-background-color, var(--card-background-color, #fff));
      --pw-radius: var(--bubble-border-radius, 28px);
      --mdc-theme-primary: var(--pw-accent);
      --switch-checked-color: var(--pw-accent);
    }
    :host([data-appearance="bubble"]) ha-card,
    :host([data-appearance="bubble"]) dialog {
      background: var(--bubble-main-background-color, var(--secondary-background-color, #f2f3f5));
      border: var(--bubble-border, none);
      border-radius: var(--pw-radius);
      box-shadow: var(--bubble-box-shadow, none);
    }
    :host([data-appearance="bubble"]) .header { gap: 8px; }
    :host([data-appearance="bubble"]) .title { font-size: 1rem; }
    :host([data-appearance="bubble"]) .icon-wrap {
      border-radius: var(--bubble-icon-border-radius, 50%);
      background: var(--bubble-icon-background-color, var(--pw-surface));
    }
    :host([data-appearance="bubble"]) .icon-button,
    :host([data-appearance="bubble"]) .text-button {
      border-radius: var(--bubble-sub-button-border-radius, 20px);
      background: var(--bubble-sub-button-background-color, var(--pw-surface));
    }
    :host([data-appearance="bubble"]) .icon-button:hover,
    :host([data-appearance="bubble"]) .text-button:hover { filter: brightness(0.95); }
    :host([data-appearance="bubble"]) .toggles {
      border-radius: var(--bubble-sub-button-border-radius, 20px);
    }
    :host([data-appearance="bubble"]) .toggle { padding: 12px; }
    :host([data-appearance="bubble"]) .pill { letter-spacing: 0; }
    :host([data-appearance="bubble"]) .time-input,
    :host([data-appearance="bubble"]) select {
      background: var(--pw-surface);
      border-radius: var(--bubble-sub-button-border-radius, 20px);
    }
    :host([data-appearance="bubble"]) .day,
    :host([data-appearance="bubble"]) .preset {
      border-radius: var(--bubble-sub-button-border-radius, 20px);
    }
    :host([data-appearance="bubble"]) .hero {
      border-radius: var(--bubble-sub-button-border-radius, 20px);
      background: color-mix(in srgb, var(--pw-ring-color) 12%, var(--pw-surface));
    }
    :host([data-appearance="bubble"]) .stop {
      border-radius: var(--bubble-sub-button-border-radius, 24px);
    }

    @media (max-width: 480px) {
      .settings { grid-template-columns: 1fr; }
      dialog { padding: 16px; }
      .header { gap: 6px; }
      .header-main { gap: 8px; }
      .toggle > span { white-space: normal; flex-wrap: wrap; }
    }
  `;
__decorate([
    n({ attribute: false })
], PersonalWakeupCard.prototype, "hass", void 0);
__decorate([
    r()
], PersonalWakeupCard.prototype, "_config", void 0);
__decorate([
    r()
], PersonalWakeupCard.prototype, "_draft", void 0);
__decorate([
    r()
], PersonalWakeupCard.prototype, "_busy", void 0);
PersonalWakeupCard = __decorate([
    t$1("lovelace-personal-wakeup-card")
], PersonalWakeupCard);
window.customCards = window.customCards || [];
window.customCards.push({
    type: "lovelace-personal-wakeup-card",
    name: "Personal Wakeup Card",
    description: "Control a Personal Wakeup alarm: time, weekdays, fades, volume, playlist, snooze and stop.",
    preview: true
});

export { PersonalWakeupCard };
//# sourceMappingURL=lovelace-personal-wakeup-card.js.map
