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
 */const{is:i$3,defineProperty:e$3,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$3,getOwnPropertySymbols:o$3,getPrototypeOf:n$2}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$2=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$2={toAttribute(t,s){switch(s){case Boolean:t=t?l$2:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$2=(t,s)=>!i$3(t,s),b$1={attribute:true,type:String,converter:u$2,reflect:false,useDefault:false,hasChanged:f$2};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$3(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$2(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$3(t),...o$3(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach((t=>t.hostConnected?.()));}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()));}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$2).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$2;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i){if(void 0!==t){const e=this.constructor,h=this[t];if(i??=e.getPropertyOptions(t),!((i.hasChanged??f$2)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(e._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach((t=>this._$ET(t,this[t]))),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,i$2=t$2.trustedTypes,s$1=i$2?i$2.createPolicy("lit-html",{createHTML:t=>t}):void 0,e$2="$lit$",h=`lit$${Math.random().toFixed(9).slice(2)}$`,o$2="?"+h,n$1=`<${o$2}>`,r$2=document,l$1=()=>r$2.createComment(""),c=t=>null===t||"object"!=typeof t&&"function"!=typeof t,a=Array.isArray,u$1=t=>a(t)||"function"==typeof t?.[Symbol.iterator],d="[ \t\n\f\r]",f$1=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,_=/>/g,m$1=RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),p=/'/g,g=/"/g,$=/^(?:script|style|textarea|title)$/i,y=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=y(1),b=y(2),T=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),A=new WeakMap,C=r$2.createTreeWalker(r$2,129);function P(t,i){if(!a(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==s$1?s$1.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,o=[];let r,l=2===i?"<svg>":3===i?"<math>":"",c=f$1;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,y=0;for(;y<s.length&&(c.lastIndex=y,u=c.exec(s),null!==u);)y=c.lastIndex,c===f$1?"!--"===u[1]?c=v:void 0!==u[1]?c=_:void 0!==u[2]?($.test(u[2])&&(r=RegExp("</"+u[2],"g")),c=m$1):void 0!==u[3]&&(c=m$1):c===m$1?">"===u[0]?(c=r??f$1,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?m$1:'"'===u[3]?g:p):c===g||c===p?c=m$1:c===v||c===_?c=f$1:(c=m$1,r=void 0);const x=c===m$1&&t[i+1].startsWith("/>")?" ":"";l+=c===f$1?s+n$1:d>=0?(o.push(a),s.slice(0,d)+e$2+s.slice(d)+h+x):s+h+(-2===d?i:x);}return [P(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),o]};class N{constructor({strings:t,_$litType$:s},n){let r;this.parts=[];let c=0,a=0;const u=t.length-1,d=this.parts,[f,v]=V(t,s);if(this.el=N.createElement(f,n),C.currentNode=this.el.content,2===s||3===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=C.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(e$2)){const i=v[a++],s=r.getAttribute(t).split(h),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:c,name:e[2],strings:s,ctor:"."===e[1]?H:"?"===e[1]?I:"@"===e[1]?L:k}),r.removeAttribute(t);}else t.startsWith(h)&&(d.push({type:6,index:c}),r.removeAttribute(t));if($.test(r.tagName)){const t=r.textContent.split(h),s=t.length-1;if(s>0){r.textContent=i$2?i$2.emptyScript:"";for(let i=0;i<s;i++)r.append(t[i],l$1()),C.nextNode(),d.push({type:2,index:++c});r.append(t[s],l$1());}}}else if(8===r.nodeType)if(r.data===o$2)d.push({type:2,index:c});else {let t=-1;for(;-1!==(t=r.data.indexOf(h,t+1));)d.push({type:7,index:c}),t+=h.length-1;}c++;}}static createElement(t,i){const s=r$2.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){if(i===T)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=c(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=S(t,h._$AS(t,i.values),h,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??r$2).importNode(i,true);C.currentNode=e;let h=C.nextNode(),o=0,n=0,l=s[0];for(;void 0!==l;){if(o===l.index){let i;2===l.type?i=new R(h,h.nextSibling,this,t):1===l.type?i=new l.ctor(h,l.name,l.strings,this,t):6===l.type&&(i=new z(h,this,t)),this._$AV.push(i),l=s[++n];}o!==l?.index&&(h=C.nextNode(),o++);}return C.currentNode=r$2,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),c(t)?t===E||null==t||""===t?(this._$AH!==E&&this._$AR(),this._$AH=E):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):u$1(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==E&&c(this._$AH)?this._$AA.nextSibling.data=t:this.T(r$2.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=N.createElement(P(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new M(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=A.get(t.strings);return void 0===i&&A.set(t.strings,i=new N(t)),i}k(t){a(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new R(this.O(l$1()),this.O(l$1()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(false,true,i);t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class k{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=E,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=E;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=S(this,t,i,0),o=!c(t)||t!==this._$AH&&t!==T,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=S(this,e[s+n],i,n),r===T&&(r=this._$AH[n]),o||=!c(r)||r!==this._$AH[n],r===E?t=E:t!==E&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===E?void 0:t;}}class I extends k{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==E);}}class L extends k{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=S(this,t,i,0)??E)===T)return;const s=this._$AH,e=t===E&&s!==E||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==E&&(s===E||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const j=t$2.litHtmlPolyfillSupport;j?.(N,R),(t$2.litHtmlVersions??=[]).push("3.3.1");const B=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new R(i.insertBefore(l$1(),t),t,void 0,s??{});}return h._$AI(t),h};

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
const t$1={ATTRIBUTE:1,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},e$1=t=>(...e)=>({_$litDirective$:t,values:e});class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const f=o=>void 0===o.strings,u={},m=(o,t=u)=>o._$AH=t;

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const l=e$1(class extends i{constructor(r){if(super(r),r.type!==t$1.PROPERTY&&r.type!==t$1.ATTRIBUTE&&r.type!==t$1.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!f(r))throw Error("`live` bindings can only contain a single expression")}render(r){return r}update(i,[t]){if(t===T||t===E)return t;const o=i.element,l=i.name;if(i.type===t$1.PROPERTY){if(t===o[l])return T}else if(i.type===t$1.BOOLEAN_ATTRIBUTE){if(!!t===o.hasAttribute(l))return T}else if(i.type===t$1.ATTRIBUTE&&o.getAttribute(l)===t+"")return T;return m(i),t}});

const colorSchemes = [
    "home-assistant",
    "bright",
    "warm",
    "mint",
    "sky",
    "lavender",
];
const en$1 = {
    label: "Color scheme",
    "home-assistant": "Home Assistant",
    bright: "Bright",
    warm: "Warm",
    mint: "Mint",
    sky: "Sky",
    lavender: "Lavender",
    invalid: "Choose a valid color_scheme: home-assistant, bright, warm, mint, sky or lavender.",
};
const nb$1 = {
    label: "Fargevalg",
    "home-assistant": "Home Assistant",
    bright: "Lys",
    warm: "Varm",
    mint: "Mint",
    sky: "Himmelblå",
    lavender: "Lavendel",
    invalid: "Velg en gyldig color_scheme: home-assistant, bright, warm, mint, sky eller lavender.",
};
function colorSchemeText(hass) {
    const language = (hass?.language || hass?.locale?.language || "en")
        .toLowerCase()
        .replace(/_/g, "-")
        .split("-")[0];
    return ["nb", "no", "nn"].includes(language) ? nb$1 : en$1;
}
function applyColorScheme(host, value, hass) {
    const scheme = value === undefined ? "home-assistant" : value;
    if (typeof scheme !== "string" ||
        !colorSchemes.includes(scheme)) {
        throw new Error(colorSchemeText(hass).invalid);
    }
    if (scheme === "home-assistant")
        host.removeAttribute("data-color-scheme");
    else
        host.setAttribute("data-color-scheme", scheme);
}
function colorSchemeSchema(hass) {
    const text = colorSchemeText(hass);
    return {
        name: "color_scheme",
        selector: {
            select: {
                mode: "dropdown",
                options: colorSchemes.map((value) => ({ value, label: text[value] })),
            },
        },
    };
}
/** Local overrides only: removing the attribute restores the dashboard theme. */
const colorSchemeStyles = i$4 `
  :host([data-color-scheme]) {
    color-scheme: light;
    --primary-text-color: #202b36;
    --secondary-text-color: #52606d;
    --disabled-text-color: #626d78;
    --text-primary-color: #fff;
    --success-color: #28723c;
    --warning-color: #8c6100;
    --error-color: #bd2635;
    --orange-color: #ab4b13;
    --info-color: #146a91;
    --primary-color: var(--scheme-accent);
    --accent-color: var(--scheme-accent);
    --card-background-color: var(--scheme-surface);
    --ha-card-background: var(--scheme-surface);
    --primary-background-color: var(--scheme-surface);
    --secondary-background-color: var(--scheme-secondary);
    --divider-color: var(--scheme-border);
    --ha-card-border-color: var(--scheme-border);
    --bubble-main-background-color: var(--scheme-surface);
    --bubble-secondary-background-color: var(--scheme-secondary);
    --bubble-icon-background-color: var(--scheme-secondary);
    --bubble-sub-button-background-color: var(--scheme-secondary);
    --bubble-accent-color: var(--scheme-accent);
    --bubble-border: 1px solid var(--scheme-border);
    --ha-card-box-shadow: 0 2px 8px rgb(32 43 54 / 0.06);
    --bubble-box-shadow: var(--ha-card-box-shadow);
    --input-fill-color: var(--scheme-secondary);
    --input-ink-color: var(--primary-text-color);
    --input-label-ink-color: var(--secondary-text-color);
    --mdc-theme-primary: var(--scheme-accent);
    --mdc-theme-surface: var(--scheme-surface);
    --mdc-theme-on-surface: var(--primary-text-color);
    --mdc-text-field-fill-color: var(--scheme-secondary);
    --mdc-text-field-ink-color: var(--primary-text-color);
  }
  :host([data-color-scheme="bright"]) {
    --scheme-surface: #ffffff;
    --scheme-secondary: #edf3fa;
    --scheme-accent: #2365a5;
    --scheme-border: #ccd9e7;
  }
  :host([data-color-scheme="warm"]) {
    --scheme-surface: #fffaf1;
    --scheme-secondary: #f4ead9;
    --scheme-accent: #885321;
    --scheme-border: #ddd0ba;
  }
  :host([data-color-scheme="mint"]) {
    --scheme-surface: #f2fbf5;
    --scheme-secondary: #dfefe5;
    --scheme-accent: #286c50;
    --scheme-border: #c1d9ca;
  }
  :host([data-color-scheme="sky"]) {
    --scheme-surface: #f1f8ff;
    --scheme-secondary: #dfeefa;
    --scheme-accent: #22638e;
    --scheme-border: #c2d8e9;
  }
  :host([data-color-scheme="lavender"]) {
    --scheme-surface: #faf5ff;
    --scheme-secondary: #ede3f6;
    --scheme-accent: #725095;
    --scheme-border: #d7c8e5;
  }
`;

function language(hass) {
    const code = (hass?.language || hass?.locale?.language || "en")
        .toLowerCase()
        .replace(/_/g, "-")
        .split("-")[0];
    return ["nb", "no", "nn"].includes(code) ? "nb" : "en";
}
/** Preserve regional formatting independently of the translated dictionary. */
function formattingLocale(hass) {
    const code = (hass?.language || hass?.locale?.language || "en")
        .toLowerCase().replace(/_/g, "-").replace(/^(no|nn)(?=-|$)/, "nb");
    try {
        return Intl.getCanonicalLocales(code)[0] || "en";
    }
    catch {
        return "en";
    }
}
const en = {
    "Snooze presets in minutes (optional, e.g. 5, 10, 15)": "Snooze presets in minutes (optional, e.g. 5, 10, 15)",
    "Wakeup alarm entity": "Wakeup alarm entity",
    "Name (optional)": "Name (optional)",
    Appearance: "Appearance",
    Default: "Default",
    Bubble: "Bubble",
    "Multiple people, wake modes and daily times require Personal Wakeup integration 0.4.0.": "Multiple people, wake modes and daily times require Personal Wakeup integration 0.4.0.",
    "At least one weekday must stay selected. Use Enabled to turn the alarm off.": "At least one weekday must stay selected. Use Enabled to turn the alarm off.",
    "Mode, targets, people and daily schedule save together.": "Mode, targets, people and daily schedule save together.",
    "Choose a target for each enabled channel.": "Choose a target for each enabled channel.",
    "No playlist configured": "No playlist configured",
    "People (anyone home)": "People (anyone home)",
    "Save configuration": "Save configuration",
    "No upcoming alarm": "No upcoming alarm",
    "Lights and music": "Lights and music",
    "Discard changes": "Discard changes",
    "Light and music": "Light and music",
    "Close settings": "Close settings",
    "Only when home": "Only when home",
    "Rings again at": "Rings again at",
    "Wakeup alarm": "Wakeup alarm",
    "Wakeup light": "Wakeup light",
    "Music player": "Music player",
    "Someone home": "Someone home",
    "Alarm is off": "Alarm is off",
    "Lights only": "Lights only",
    "Nobody home": "Nobody home",
    "Music only": "Music only",
    "Alarm time": "Alarm time",
    "Light fade": "Light fade",
    "Music fade": "Music fade",
    Configure: "Configure",
    "Skip next": "Skip next",
    "(not set)": "(not set)",
    "Waking up": "Waking up",
    "Wake mode": "Wake mode",
    "Test now": "Test now",
    Tomorrow: "Tomorrow",
    settings: "settings",
    Playlist: "Playlist",
    Enabled: "Enabled",
    Ringing: "Ringing",
    Snoozed: "Snoozed",
    Snooze: "Snooze",
    Repeat: "Repeat",
    Volume: "Volume",
    Person: "Person",
    Today: "Today",
    "Next:": "Next:",
    Reset: "Reset",
    Since: "Since",
    Light: "Light",
    Music: "Music",
    Stop: "Stop",
    Started: "Started",
    "Ringing since": "Ringing since",
    h: "h",
    in: "in",
    ago: "ago",
    "Entity not found": "Entity not found",
    "Define an entity": "Define an entity",
    Time: "Time",
    "Use default time for": "Use default time for",
    "Action failed": "Action failed",
    "fading in since": "fading in since",
    "Brightness at wake-up": "Brightness at wake-up",
    "Sunrise from": "Sunrise from",
    "Fully up at": "Fully up at",
    "Wake-up at": "Wake-up at",
    Mo: "Mo",
    Tu: "Tu",
    We: "We",
    Th: "Th",
    Fr: "Fr",
    Sa: "Sa",
    Su: "Su",
    On: "On",
    Off: "Off",
    Armed: "Armed",
    Unavailable: "Unavailable",
    Unknown: "Unknown",
};
const nb = {
    "Snooze presets in minutes (optional, e.g. 5, 10, 15)": "Slumrevalg i minutter (valgfritt, f.eks. 5, 10, 15)",
    "Wakeup alarm entity": "Vekkerklokkeenhet",
    "Name (optional)": "Navn (valgfritt)",
    Appearance: "Utseende",
    Default: "Standard",
    Bubble: "Boble",
    "Multiple people, wake modes and daily times require Personal Wakeup integration 0.4.0.": "Flere personer, vekkemoduser og daglige tider krever Personal Wakeup-integrasjonen 0.4.0.",
    "At least one weekday must stay selected. Use Enabled to turn the alarm off.": "Minst én ukedag må være valgt. Bruk Aktivert for å slå av vekking.",
    "Mode, targets, people and daily schedule save together.": "Modus, enheter, personer og ukeplan lagres samlet.",
    "Choose a target for each enabled channel.": "Velg en enhet for hver aktivert kanal.",
    "No playlist configured": "Ingen spilleliste konfigurert",
    "People (anyone home)": "Personer (minst én hjemme)",
    "Save configuration": "Lagre innstillinger",
    "No upcoming alarm": "Ingen kommende vekking",
    "Lights and music": "Lys og musikk",
    "Discard changes": "Forkast endringer",
    "Light and music": "Lys og musikk",
    "Close settings": "Lukk innstillinger",
    "Only when home": "Bare når noen er hjemme",
    "Rings again at": "Ringer igjen kl.",
    "Wakeup alarm": "Vekkerklokke",
    "Wakeup light": "Vekkelys",
    "Music player": "Musikkspiller",
    "Someone home": "Noen er hjemme",
    "Alarm is off": "Vekking er slått av",
    "Lights only": "Bare lys",
    "Nobody home": "Ingen hjemme",
    "Music only": "Bare musikk",
    "Alarm time": "Vekketid",
    "Light fade": "Opptrapping av lys",
    "Music fade": "Opptrapping av musikk",
    Configure: "Konfigurer",
    "Skip next": "Hopp over neste",
    "(not set)": "(ikke angitt)",
    "Waking up": "Vekking pågår",
    "Wake mode": "Vekkemodus",
    "Test now": "Test nå",
    Tomorrow: "I morgen",
    settings: "innstillinger",
    Playlist: "Spilleliste",
    Enabled: "Aktivert",
    Ringing: "Ringer",
    Snoozed: "Slumrer",
    Snooze: "Slumre",
    Repeat: "Gjenta",
    Volume: "Volum",
    Person: "Person",
    Today: "I dag",
    "Next:": "Neste:",
    Reset: "Tilbakestill",
    Since: "Siden",
    Light: "Lys",
    Music: "Musikk",
    Stop: "Stopp",
    Started: "Startet",
    "Ringing since": "Ringer siden",
    h: "t",
    in: "om",
    ago: "siden",
    "Entity not found": "Fant ikke enheten",
    "Define an entity": "Du må angi en enhet",
    Time: "Tid",
    "Use default time for": "Bruk standardtid for",
    "Action failed": "Handlingen mislyktes",
    "fading in since": "trappes opp siden",
    "Brightness at wake-up": "Lysstyrke ved vekking",
    "Sunrise from": "Soloppgang fra",
    "Fully up at": "Fullt lys kl.",
    "Wake-up at": "Vekking kl.",
    Mo: "Ma",
    Tu: "Ti",
    We: "On",
    Th: "To",
    Fr: "Fr",
    Sa: "Lø",
    Su: "Sø",
    On: "På",
    Off: "Av",
    Armed: "Klar",
    Unavailable: "Utilgjengelig",
    Unknown: "Ukjent",
};
function localize(hass, key) {
    return (language(hass) === "nb" ? nb : en)[key];
}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=t=>(e,o)=>{ void 0!==o?o.addInitializer((()=>{customElements.define(t,e);})):customElements.define(t,e);};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o={attribute:true,type:String,converter:u$2,reflect:false,hasChanged:f$2},r$1=(t=o,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=true),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t);},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t);}}throw Error("Unsupported decorator location: "+n)};function n(t){return (e,o)=>"object"==typeof o?r$1(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r(r){return n({...r,state:true,attribute:false})}

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const e=e$1(class extends i{constructor(t){if(super(t),t.type!==t$1.ATTRIBUTE||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return " "+Object.keys(t).filter((s=>t[s])).join(" ")+" "}update(s,[i]){if(void 0===this.st){this.st=new Set,void 0!==s.strings&&(this.nt=new Set(s.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in i)i[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(i)}const r=s.element.classList;for(const t of this.st)t in i||(r.remove(t),this.st.delete(t));for(const t in i){const s=!!i[t];s===this.st.has(t)||this.nt?.has(t)||(s?(r.add(t),this.st.add(t)):(r.remove(t),this.st.delete(t)));}return T}});

const paths = {
    alarm: b `<circle cx="12" cy="13" r="8"></circle><path d="M12 9v4l2.5 2"></path><path d="M5 3 2 6M22 6l-3-3"></path>`,
    alarmOff: b `<path d="M6.87 6.87a8 8 0 1 0 11.26 11.26"></path><path d="M19.9 14.25a8 8 0 0 0-9.15-9.15"></path><path d="m22 6-3-3M2 2l20 20M4 4 2 6"></path>`,
    sunrise: b `<path d="M12 2v7"></path><path d="m8 6 4-4 4 4"></path><path d="m4.93 10.93 1.41 1.41M19.07 10.93l-1.41 1.41M2 18h2M20 18h2M22 22H2"></path><path d="M16 18a4 4 0 0 0-8 0"></path>`,
    ringing: b `<path d="M10.3 21a2 2 0 0 0 3.4 0"></path><path d="M3.3 15.3A1 1 0 0 0 4 17h16a1 1 0 0 0 .7-1.7C19.4 14 18 12.5 18 8A6 6 0 0 0 6 8c0 4.5-1.4 6-2.7 7.3"></path><path d="M22 8c0-2.3-.8-4.3-2-6M4 2C2.8 3.7 2 5.7 2 8"></path>`,
    snooze: b `<path d="M4 4h6l-6 7h6"></path><path d="M13 11h7l-7 9h7"></path>`,
    stop: b `<circle cx="12" cy="12" r="10"></circle><rect x="9" y="9" width="6" height="6" rx="1"></rect>`,
    power: b `<path d="M12 2v10"></path><path d="M18.4 6.6a9 9 0 1 1-12.77.04"></path>`,
    skip: b `<path d="m5 4 10 8-10 8z"></path><path d="M19 5v14"></path>`,
    home: b `<path d="M3 10.5 12 3l9 7.5"></path><path d="M5 9.5V21h14V9.5"></path>`,
    clock: b `<circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path>`,
    calendar: b `<rect x="3" y="4" width="18" height="18" rx="2"></rect><path d="M16 2v4M8 2v4M3 10h18"></path>`,
    light: b `<path d="M9 18h6M10 22h4"></path><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z"></path>`,
    music: b `<path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle>`,
    volume: b `<path d="M11 5 6 9H2v6h4l5 4z"></path><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"></path>`,
    playlist: b `<path d="M21 15V6"></path><circle cx="18.5" cy="15.5" r="2.5"></circle><path d="M12 12H3M16 6H3M12 18H3"></path>`,
    play: b `<circle cx="12" cy="12" r="10"></circle><path d="m10 8 6 4-6 4z"></path>`,
    close: b `<path d="M18 6 6 18M6 6l12 12"></path>`,
    warning: b `<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"></path><path d="M12 9v4M12 17h.01"></path>`,
    spinner: b `<path d="M21 12a9 9 0 1 1-6.2-8.56"></path>`,
    cog: b `<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>`,
};
// No whitespace inside <svg>: it would leak into a button's textContent.
// prettier-ignore
const icon = (name, extra = "") => x `<svg class="i ${extra}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;

const styles = i$4 `
  :host {
    display: block;
    color: var(--primary-text-color, #1b1b1a);
    --pw-text: var(--primary-text-color, #1b1b1a);
    --pw-muted: var(--secondary-text-color, #5b5a55);
    --pw-ok: var(--success-color, #2e7d32);
    --pw-warn: var(--warning-color, #f59e0b);
    --pw-orange: var(--orange-color, #ea580c);
    --pw-alarm: var(--error-color, #c62828);
    --pw-accent: var(--primary-color, #03a9f4);
    --pw-off: var(--disabled-text-color, #8a8984);
    --pw-surface: var(--ha-card-background, var(--card-background-color, #fff));
    --pw-pill: var(--secondary-background-color, #f3f2ee);
    --pw-radius: 20px;
    --pw-tile: 16px;
  }
  :host([data-appearance="bubble"]) {
    --pw-surface: var(
      --bubble-main-background-color,
      var(--ha-card-background, var(--card-background-color, #fff))
    );
    --pw-pill: var(
      --bubble-secondary-background-color,
      var(--secondary-background-color, #f3f2ee)
    );
    --pw-accent: var(--bubble-accent-color, var(--primary-color, #03a9f4));
    --pw-radius: var(--bubble-border-radius, 32px);
    --pw-tile: var(--bubble-sub-button-border-radius, 22px);
  }
  * {
    box-sizing: border-box;
  }
  ha-card {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    background: var(--pw-surface);
    border-radius: var(--ha-card-border-radius, 16px);
    overflow: hidden;
  }
  :host([data-appearance="bubble"]) ha-card {
    border: var(--bubble-border, none);
    border-radius: var(--bubble-border-radius, 32px);
    box-shadow: var(--bubble-box-shadow, var(--ha-card-box-shadow));
  }

  /* Status tones: every tinted element reads --sev from its nearest tone. */
  .sev-ok {
    --sev: var(--pw-ok);
  }
  .sev-warn {
    --sev: var(--pw-warn);
  }
  .sev-snoozed {
    --sev: var(--pw-accent);
  }
  .sev-alarm {
    --sev: var(--pw-alarm);
  }
  .sev-off {
    --sev: var(--pw-off);
  }

  .i {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
  }
  .i.s {
    width: 18px;
    height: 18px;
  }
  .spin {
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  .circ {
    flex: 0 0 44px;
    width: 44px;
    height: 44px;
    border-radius: var(--bubble-icon-border-radius, 50%);
    display: grid;
    place-items: center;
    color: color-mix(in srgb, var(--sev) 75%, var(--pw-text));
    background: color-mix(in srgb, var(--sev) 20%, transparent);
  }
  .circ.big {
    flex-basis: 52px;
    width: 52px;
    height: 52px;
  }
  .circ.big .i {
    width: 26px;
    height: 26px;
  }

  /* ---------- header ---------- */
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding-left: 8px;
  }
  .title {
    min-width: 0;
    font-size: 17px;
    font-weight: 700;
    color: var(--pw-muted);
    overflow-wrap: anywhere;
  }
  .icon-button {
    flex: 0 0 44px;
    width: 44px;
    height: 44px;
    padding: 0;
    display: grid;
    place-items: center;
    border: 0;
    border-radius: 50%;
    font: inherit;
    color: var(--pw-muted);
    background: var(--pw-pill);
    cursor: pointer;
  }
  .icon-button:hover {
    color: var(--pw-text);
  }

  /* ---------- hero (calm states) ---------- */
  .hero {
    display: flex;
    gap: 14px;
    align-items: center;
    padding: 14px;
    border-radius: var(--pw-radius);
    background: var(--pw-pill);
  }
  .hero-text {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
  }
  .status {
    font-size: 13px;
    font-weight: 600;
    color: color-mix(in srgb, var(--sev) 65%, var(--pw-text));
  }
  .current {
    font-size: 32px;
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.01em;
    font-variant-numeric: tabular-nums;
    overflow-wrap: anywhere;
  }
  .current.dim {
    color: var(--pw-muted);
  }
  .context {
    font-size: 13px;
    color: var(--pw-muted);
    overflow-wrap: anywhere;
  }

  /* ---------- takeover (rising, ringing, snoozed) ---------- */
  .takeover {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    border-radius: var(--pw-radius);
    background: color-mix(in srgb, var(--sev) 18%, var(--pw-pill));
  }
  .takeover-head {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .hero-title {
    font-size: 28px;
    font-weight: 800;
    line-height: 1.1;
    overflow-wrap: anywhere;
  }
  .hero-sub {
    font-size: 13px;
    color: var(--pw-muted);
    overflow-wrap: anywhere;
  }
  .hero-sub em {
    font-style: normal;
    font-weight: 600;
    margin-left: 4px;
    color: color-mix(in srgb, var(--sev) 65%, var(--pw-text));
  }
  .stop {
    min-height: 56px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border: 0;
    border-radius: 28px;
    font: inherit;
    font-size: 18px;
    font-weight: 800;
    color: #fff;
    background: color-mix(in srgb, var(--sev) 62%, #000);
    cursor: pointer;
  }
  .stop .i {
    width: 24px;
    height: 24px;
  }
  .snooze-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
  }
  .snooze-label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 0 6px 0 4px;
    font-size: 14px;
    font-weight: 700;
  }
  .presets {
    display: flex;
    flex: 1 1 200px;
    gap: 6px;
  }
  .preset {
    flex: 1 1 0;
    min-width: 0;
    white-space: nowrap;
    min-height: 44px;
    padding: 0 12px;
    border: 0;
    border-radius: 22px;
    font: inherit;
    font-weight: 700;
    color: var(--pw-text);
    background: color-mix(in srgb, var(--pw-text) 8%, transparent);
    cursor: pointer;
  }
  .preset.primary {
    color: color-mix(in srgb, var(--sev) 65%, var(--pw-text));
    background: color-mix(in srgb, var(--sev) 24%, transparent);
    box-shadow: inset 0 0 0 1.5px color-mix(in srgb, var(--sev) 60%, transparent);
  }
  /* Ringing takes over the card: solid alarm red, white primary action. */
  .takeover.is-ringing {
    color: #fff;
    background: var(--pw-alarm);
  }
  .takeover.is-ringing .circ {
    color: var(--pw-alarm);
    background: #fff;
    animation: pulse 1.4s ease-in-out infinite;
  }
  .takeover.is-ringing .hero-sub,
  .takeover.is-ringing .hero-sub em {
    color: rgb(255 255 255 / 0.88);
  }
  .takeover.is-ringing .stop {
    color: var(--pw-alarm);
    background: #fff;
  }
  .takeover.is-ringing .preset {
    color: #fff;
    background: rgb(0 0 0 / 0.2);
  }
  .takeover.is-ringing .preset.primary {
    background: rgb(255 255 255 / 0.22);
    box-shadow: inset 0 0 0 1.5px #fff;
  }
  .takeover.is-ringing button:focus-visible {
    outline-color: #fff;
  }
  @keyframes pulse {
    0%,
    100% {
      box-shadow: 0 0 0 0 rgb(255 255 255 / 0.55);
    }
    50% {
      box-shadow: 0 0 0 10px rgb(255 255 255 / 0);
    }
  }

  /* ---------- everyday toggles (as on the Time for School card) ---------- */
  ha-card .settings {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  ha-card .toggles {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 6px;
  }
  .pill {
    flex: 1 1 120px;
    min-width: 0;
    min-height: 48px;
    border: 0;
    border-radius: 24px;
    padding: 4px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font: inherit;
    font-weight: 600;
    color: var(--pw-text);
    background: var(--pw-pill);
    cursor: pointer;
    text-align: left;
  }
  .pill-text {
    display: flex;
    flex-direction: column;
    min-width: 0;
    line-height: 1.2;
  }
  .pill small {
    font-size: 12px;
    font-weight: 600;
    opacity: 0.85;
  }
  .pill.on {
    --pill-accent: var(--pw-ok);
    color: color-mix(in srgb, var(--pill-accent) 65%, var(--pw-text));
    background: color-mix(in srgb, var(--pill-accent) 22%, var(--pw-pill));
  }
  .pill.skip.on {
    --pill-accent: var(--pw-warn);
  }
  .pill.pending {
    animation: pw-breathe 1.2s ease-in-out infinite;
  }
  @keyframes pw-breathe {
    50% {
      opacity: 0.55;
    }
  }

  /* ---------- grouped rows ---------- */
  .toggles {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .row {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 56px;
    padding: 6px 12px 6px 6px;
    border-radius: var(--pw-radius);
    background: var(--pw-pill);
    cursor: pointer;
  }
  .row-text {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
  }
  .name {
    font-weight: 700;
    overflow-wrap: anywhere;
  }
  .state {
    font-size: 13px;
    color: var(--pw-muted);
    overflow-wrap: anywhere;
  }
  .state.on {
    font-weight: 600;
    color: color-mix(in srgb, var(--sev) 65%, var(--pw-text));
  }
  .state.away {
    font-weight: 600;
    color: color-mix(in srgb, var(--pw-warn) 65%, var(--pw-text));
  }
  /* A native checkbox with role=switch, drawn as a family pill toggle. */
  .switch {
    appearance: none;
    flex: 0 0 auto;
    position: relative;
    width: 52px;
    height: 32px;
    margin: 0;
    border-radius: 16px;
    background: color-mix(in srgb, var(--pw-text) 14%, transparent);
    cursor: pointer;
    transition: background 150ms;
  }
  .switch::after {
    content: "";
    position: absolute;
    top: 4px;
    left: 4px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--pw-surface);
    box-shadow: 0 1px 3px rgb(0 0 0 / 0.3);
    transition: transform 150ms;
  }
  .switch:checked {
    background: color-mix(in srgb, var(--sev) 62%, #000);
  }
  .switch:checked::after {
    transform: translateX(20px);
    background: #fff;
  }
  .switch:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
  .switch:focus-visible {
    outline: 2px solid var(--primary-color, #0277bd);
    outline-offset: 2px;
  }

  /* ---------- settings dialog ---------- */
  dialog {
    width: min(520px, calc(100vw - 24px));
    max-height: calc(100dvh - 24px);
    padding: 20px;
    border: 0;
    border-radius: var(--pw-radius);
    color: var(--pw-text);
    background: var(--pw-surface);
    box-shadow: 0 16px 60px #0006;
    overflow: auto;
  }
  :host([data-appearance="bubble"]) dialog {
    border: var(--bubble-border, none);
  }
  dialog::backdrop {
    background: #0007;
  }
  .dialog-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding-left: 8px;
    margin-bottom: 12px;
  }
  .dialog-header h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 800;
    overflow-wrap: anywhere;
  }
  dialog .settings {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
  }
  .field {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
    padding: 12px 14px;
    border-radius: var(--pw-tile);
    background: var(--pw-pill);
  }
  .device-field,
  .wide,
  dialog .toggles {
    grid-column: 1 / -1;
  }
  .selector-field {
    padding: 4px;
    background: none;
  }
  p.device-field {
    margin: 0;
    font-size: 14px;
    padding: 12px 14px;
    border-radius: var(--pw-tile);
    background: color-mix(in srgb, var(--pw-warn) 16%, var(--pw-pill));
  }
  .label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 600;
    color: var(--pw-muted);
  }
  .label .value {
    margin-left: auto;
    font-size: 15px;
    font-weight: 700;
    color: var(--pw-text);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
  .value.muted {
    color: var(--pw-muted);
    font-weight: 400;
    overflow-wrap: anywhere;
  }
  .time-input,
  select {
    width: 100%;
    min-height: 44px;
    padding: 0 14px;
    border: 0;
    border-radius: 22px;
    font: inherit;
    font-size: 16px;
    color: var(--pw-text);
    background: color-mix(in srgb, var(--pw-text) 7%, transparent);
  }
  select option {
    color: var(--pw-text);
    background: var(--pw-surface);
  }
  .time-field .time-input {
    min-height: 48px;
    font-size: 24px;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
  }
  ha-selector {
    display: block;
    min-width: 0;
  }
  ha-slider {
    width: 100%;
  }
  .weekdays {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .weekdays .day-row {
    flex: 1 1 40px;
    display: flex;
  }
  .daily-times {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .daily-times .day-row {
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
  }
  .daily-times .time-input {
    flex: 1;
    min-width: 0;
  }
  .day {
    flex: 1;
    min-width: 44px;
    min-height: 40px;
    padding: 0 10px;
    border: 0;
    border-radius: 20px;
    font: inherit;
    font-size: 14px;
    font-weight: 600;
    color: var(--pw-muted);
    background: color-mix(in srgb, var(--pw-text) 7%, transparent);
    cursor: pointer;
  }
  .daily-times .day {
    flex: 0 0 52px;
  }
  .day.on {
    color: color-mix(in srgb, var(--pw-accent) 65%, var(--pw-text));
    background: color-mix(in srgb, var(--pw-accent) 24%, transparent);
    box-shadow: inset 0 0 0 1.5px
      color-mix(in srgb, var(--pw-accent) 60%, transparent);
  }
  .text-button {
    min-height: 44px;
    padding: 0 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    border: 0;
    border-radius: 22px;
    font: inherit;
    font-size: 14px;
    font-weight: 700;
    color: var(--pw-text);
    background: color-mix(in srgb, var(--pw-text) 8%, transparent);
    cursor: pointer;
  }
  .text-button.strong {
    color: #fff;
    background: color-mix(in srgb, var(--pw-accent) 62%, #000);
  }
  .daily-times .text-button {
    flex: 0 0 auto;
    padding: 0 12px;
    font-size: 13px;
  }
  .save-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    margin-top: 12px;
  }
  .save-row .value {
    flex: 1 1 100%;
    padding: 0 8px;
    font-size: 13px;
  }
  .save-row .text-button {
    flex: 1 1 140px;
  }
  .footer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-top: 12px;
    padding: 6px 6px 6px 14px;
    border-radius: var(--pw-radius);
    background: var(--pw-pill);
    font-size: 14px;
    color: var(--pw-muted);
  }
  .footer-note {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }
  .error {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--pw-alarm);
  }
  dialog .error {
    margin: 12px 0 0;
    padding: 12px 14px;
    border-radius: var(--pw-tile);
    color: var(--pw-text);
    background: color-mix(in srgb, var(--pw-alarm) 16%, var(--pw-pill));
  }
  dialog .error .i {
    color: color-mix(in srgb, var(--pw-alarm) 75%, var(--pw-text));
  }
  button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
  button:focus-visible,
  select:focus-visible,
  input:focus-visible {
    outline: 2px solid var(--primary-color, #0277bd);
    outline-offset: 2px;
  }
  @media (prefers-reduced-motion: reduce) {
    .spin,
    .pill.pending,
    .takeover.is-ringing .circ {
      animation: none;
    }
  }
  @media (max-width: 480px) {
    dialog .settings {
      grid-template-columns: 1fr;
    }
    dialog {
      padding: 16px;
    }
  }
  @media (max-width: 400px) {
    ha-card {
      padding: 12px;
    }
    .current {
      font-size: 26px;
    }
  }
  ${colorSchemeStyles}
`;

let PersonalWakeupCardEditor = class PersonalWakeupCardEditor extends i$1 {
    _t(key) { return localize(this.hass, key); }
    setConfig(config) {
        this._config = { appearance: "default", color_scheme: "home-assistant", ...config };
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
        const SCHEMA = [
            {
                name: "appearance",
                selector: {
                    select: {
                        mode: "dropdown",
                        options: [
                            { value: "default", label: this._t("Default") },
                            { value: "bubble", label: this._t("Bubble") }
                        ]
                    }
                }
            },
            colorSchemeSchema(this.hass),
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
            color_scheme: colorSchemeText(this.hass).label,
            appearance: this._t("Appearance"),
            entity: this._t("Wakeup alarm entity"),
            name: this._t("Name (optional)"),
            snooze_presets: this._t("Snooze presets in minutes (optional, e.g. 5, 10, 15)")
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
    t("lovelace-personal-wakeup-card-editor")
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
// Service settings contain scalars, arrays and the weekday/time mapping.
function sameSetting(left, right) {
    if (left && right && typeof left === "object" && typeof right === "object") {
        const a = Object.entries(left).sort(([x], [y]) => x.localeCompare(y));
        const b = Object.entries(right).sort(([x], [y]) => x.localeCompare(y));
        return JSON.stringify(a) === JSON.stringify(b);
    }
    return left === right;
}
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
    disarmed: "alarmOff",
    armed: "alarm",
    rising: "sunrise",
    ringing: "ringing",
    snoozed: "snooze"
};
/** Status tone per alarm state; unknown states read as neutral. */
const STATE_TONES = {
    armed: "ok",
    rising: "warn",
    ringing: "alarm",
    snoozed: "snoozed",
    disarmed: "off"
};
let PersonalWakeupCard = class PersonalWakeupCard extends i$1 {
    constructor() {
        super(...arguments);
        /** Live slider values while dragging, keyed by attribute name. */
        this._draft = {};
        this._busy = null;
        this._settingsDraft = {};
        this._settingsError = "";
        this._savedDraft = null;
    }
    _advanced() {
        const a = this._entity()?.attributes ?? {};
        return "wake_mode" in a && "person_entities" in a && "day_times" in a;
    }
    _stage(partial) {
        this._settingsDraft = { ...this._settingsDraft, ...partial };
        this._settingsError = "";
    }
    willUpdate() {
        if (!this._savedDraft)
            return;
        const a = this._entity()?.attributes ?? {};
        const acknowledged = Object.entries(this._savedDraft).every(([key, value]) => {
            const reported = a[key === "ma_player_entity" ? "player_entity" : key];
            // HA reports cleared optional targets as null; selectors submit "".
            if ((key === "light_entity" || key === "ma_player_entity") && value === "") {
                return reported === null || reported === "";
            }
            return sameSetting(reported, value);
        });
        if (acknowledged) {
            const remaining = { ...this._settingsDraft };
            for (const [key, value] of Object.entries(this._savedDraft)) {
                if (sameSetting(remaining[key], value))
                    delete remaining[key];
            }
            this._settingsDraft = remaining;
            this._savedDraft = null;
        }
    }
    async _saveSettings() {
        if (this._busy || !this._advanced())
            return;
        const partial = { ...this._settingsDraft };
        const a = this._entity()?.attributes ?? {};
        const mode = partial.wake_mode ?? a.wake_mode;
        if ((mode !== "music" && !(partial.light_entity ?? a.light_entity)) ||
            (mode !== "lights" && !(partial.ma_player_entity ?? a.player_entity))) {
            this._settingsError = { key: "Choose a target for each enabled channel." };
            return;
        }
        this._settingsError = "";
        if (await this._call("set_config", partial)) {
            this._savedDraft = partial;
            this.requestUpdate();
        }
    }
    _t(key) { return localize(this.hass, key); }
    setConfig(config) {
        if (!config.entity) {
            throw new Error(this._t("Define an entity") + ": lovelace-personal-wakeup-card");
        }
        applyColorScheme(this, config.color_scheme, this.hass);
        if (this._config?.entity !== config.entity) {
            this._settingsDraft = {};
            this._savedDraft = null;
            this._settingsError = "";
            this._draft = {};
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
    _dayName(day) {
        return language(this.hass) === "nb" ? this._t(WEEKDAY_LABELS[day]) : day;
    }
    _lang() {
        return formattingLocale(this.hass);
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
            return this._t("Today");
        if (dayDiff === 1)
            return this._t("Tomorrow");
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
        const span = h ? (m ? `${h} ${this._t("h")} ${m} min` : `${h} ${this._t("h")}`) : `${m} min`;
        return diffMin >= 0 ? `${this._t("in")} ${span}` : `${span} ${this._t("ago")}`;
    }
    _normalizeTime(value) {
        if (!value)
            return "07:00";
        const s = String(value);
        return s.length >= 5 && s.indexOf(":") === 2 ? s.slice(0, 5) : "07:00";
    }
    /** Format an "HH:MM" setting as a clock time in the HA formatting locale. */
    _fmtClock(value) {
        const [h, m] = value.split(":").map(Number);
        return new Date(2000, 0, 1, h, m).toLocaleTimeString(this._lang(), {
            hour: "2-digit",
            minute: "2-digit"
        });
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
            return true;
        }
        catch (err) {
            const msg = err?.message || err?.error || String(err);
            this._settingsError = String(msg);
            this._toast(`${this._t("Wakeup alarm")}: ${this._t("Action failed")} (${msg})`);
            return false;
        }
        finally {
            this._busy = null;
        }
    }
    _set(partial, label = "set_config") {
        return this._call("set_config", partial, label);
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
        if (!await this._set({ [key]: value * scale }))
            return;
        const draft = { ...this._draft };
        delete draft[key];
        this._draft = draft;
    }
    _toggleWeekday(day, current) {
        const next = current.includes(day)
            ? current.filter((d) => d !== day)
            : [...current, day];
        if (!next.length) {
            this._toast(this._t("At least one weekday must stay selected. Use Enabled to turn the alarm off."));
            return;
        }
        const partial = { weekdays: WEEKDAYS.filter((d) => next.includes(d)) };
        if (this._advanced())
            this._stage(partial);
        else
            void this._set(partial);
    }
    // ---------------------------------------------------------------- render
    _stateLabel(st) {
        return STATE_LABELS[st] ? this._t(STATE_LABELS[st]) : st;
    }
    render() {
        const stateObj = this._entity();
        if (!stateObj) {
            return x `
        <ha-card>
          <div class="error" role="alert">
            ${icon("warning")}<span>${this._t("Entity not found")}: ${this._config?.entity || this._t("(not set)")}</span>
          </div>
        </ha-card>
      `;
        }
        const live_ = stateObj.attributes;
        const a = { ...live_, ...this._settingsDraft };
        const advanced = this._advanced();
        const mode = a.wake_mode ?? "both";
        const lights = mode !== "music";
        const music = mode !== "lights";
        const dayTimes = a.day_times ?? {};
        const st = stateObj.state;
        const active = st === "rising" || st === "ringing";
        const snoozed = st === "snoozed";
        // The integration decides (a light alone has no snooze, and nothing to
        // stop once it is up); older integrations do not report these.
        const canStop = "can_stop" in live_ ? Boolean(live_.can_stop) : active || snoozed;
        const canSnooze = "can_snooze" in live_ ? Boolean(live_.can_snooze) : active || snoozed;
        // Device actions stay off while the alarm entity reports no data.
        const noData = st === "unavailable" || st === "unknown";
        const enabled = Boolean(a.enabled);
        const requireHome = Boolean(a.require_home);
        const skipNext = Boolean(a.skip_next);
        const timeOfDay = this._normalizeTime(a.time_of_day);
        const weekdays = Array.isArray(a.weekdays) && a.weekdays.length ? a.weekdays : [...WEEKDAYS];
        const fadeMin = this._draft.fade_duration ?? Math.round(Number(a.fade_duration ?? 900) / 60);
        const musicMin = this._draft.fade_music_duration ??
            Math.round(Number(a.fade_music_duration ?? 300) / 60);
        const volume = this._draft.volume ?? Number(a.volume ?? 0.25);
        const wakeBrightness = this._draft.wake_brightness ?? Number(a.wake_brightness ?? 100);
        const playlist = a.playlist ?? "";
        const playlistOptions = Array.isArray(a.playlist_options)
            ? a.playlist_options
            : [];
        const nextFire = a.next_fire ?? null;
        const skippedFire = a.skipped_fire ?? null;
        const snoozeUntil = a.snooze_until ?? null;
        const runStarted = a.run_started ?? null;
        const wakeAt = live_.wake_at ?? null;
        const fadeStart = live_.fade_start ?? null;
        const personEntity = a.person_entity ?? null;
        const people = Array.isArray(a.person_entities) ? a.person_entities : personEntity ? [personEntity] : [];
        const anyoneHome = people.some((person) => this.hass.states[person]?.state === "home");
        const defaultSnooze = Number(a.snooze_minutes ?? 10);
        const presets = Array.from(new Set([...(this._config.snooze_presets ?? DEFAULT_SNOOZE_PRESETS), defaultSnooze])).sort((x, y) => x - y);
        const title = this._config.name || a.friendly_name || this._t("Wakeup alarm");
        const tone = STATE_TONES[st] ?? "off";
        // One settings request at a time: the toggles report theirs as toggle-<key>.
        const settingBusy = this._busy === "set_config" || Boolean(this._busy?.startsWith("toggle-"));
        return x `
      <ha-card class=${e({ [`is-${st}`]: true, [`sev-${tone}`]: true })}>
        <div class="header">
          <div class="title">${title}</div>
          <button class="icon-button" type="button" title=${this._t("Configure")} aria-label=${this._t("Configure")}
            @click=${this._openSettings}>${icon("cog")}</button>
        </div>

        ${canStop
            ? this._renderTakeover(st, live_.wake_mode, runStarted, snoozeUntil, canSnooze, presets, defaultSnooze, wakeAt)
            : this._renderHero(st, tone, enabled, timeOfDay, nextFire, fadeStart)}

        <div class="settings">
          <div class="toggles">
            ${this._renderToggle("enabled", "power", this._t("Enabled"), enabled, noData || settingBusy)}
            ${this._renderToggle("skip_next", "skip", this._t("Skip next"), skipNext, noData || settingBusy || !enabled, skipNext && skippedFire ? `${this._fmtDay(skippedFire)} ${this._fmtTime(skippedFire)}` : "")}
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
          <h2 id="settings-title">${title} ${this._t("settings")}</h2>
          <button class="icon-button" type="button" title=${this._t("Close settings")} aria-label=${this._t("Close settings")}
            autofocus @click=${this._closeSettings}>${icon("close")}</button>
        </div>
        <div class="settings">
          ${advanced ? x `<div class="field device-field">
            <label class="label" for="wake-mode">${icon("sunrise", "s")}${this._t("Wake mode")}</label>
            <select id="wake-mode" aria-label=${this._t("Wake mode")} .value=${mode}
              @change=${(e) => this._stage({ wake_mode: e.target.value })}>
              <option value="lights" ?selected=${mode === "lights"}>${this._t("Lights only")}</option>
              <option value="music" ?selected=${mode === "music"}>${this._t("Music only")}</option>
              <option value="both" ?selected=${mode === "both"}>${this._t("Lights and music")}</option>
            </select>
          </div>` : x `<p class="device-field">${this._t("Multiple people, wake modes and daily times require Personal Wakeup integration 0.4.0.")}</p>`}
          <div class="field time-field wide">
            <span class="label">${icon("clock", "s")}${this._t("Alarm time")}</span>
            <input
              class="time-input"
              type="time"
              aria-label=${this._t("Alarm time")}
              .value=${timeOfDay}
              @change=${(e) => this._set({ time_of_day: e.target.value })}
            />
          </div>

          <div class="field wide">
            <span class="label">${icon("calendar", "s")}${this._t("Repeat")}</span>
            <div class=${advanced ? "daily-times" : "weekdays"}>
              ${WEEKDAYS.map((d) => x `
                  <div class="day-row">
                  <button
                    data-day=${d}
                    type="button"
                    class=${e({ day: true, on: weekdays.includes(d) })}
                    aria-pressed=${weekdays.includes(d)}
                    @click=${() => this._toggleWeekday(d, weekdays)}
                  >${this._t(WEEKDAY_LABELS[d])}</button>
                  ${advanced ? x `<input class="time-input" type="time" data-day-time=${d}
                    aria-label=${`${this._dayName(d)} ${this._t("Alarm time")}`} .value=${dayTimes[d] ?? timeOfDay}
                    @change=${(e) => {
            const value = e.target.value;
            if (value)
                this._stage({ day_times: { ...dayTimes, [d]: value } });
        }} />
                    <button type="button" class="text-button" aria-label=${`${this._t("Use default time for")} ${this._dayName(d)}`}
                      ?disabled=${!(d in dayTimes)} @click=${() => {
            const next = { ...dayTimes };
            delete next[d];
            this._stage({ day_times: next });
        }}>${d in dayTimes ? this._t("Reset") : this._t("Default")}</button>` : E}
                  </div>
                `)}
            </div>
          </div>

          ${lights ? this._renderSlider("sunrise", this._t("Light fade"), "fade_duration", fadeMin, 1, 60, 1, `${fadeMin} min`, 60) : E}
          ${lights ? this._renderSlider("sunrise", this._t("Brightness at wake-up"), "wake_brightness", wakeBrightness, 10, 100, 5, `${wakeBrightness}%`) : E}
          ${music ? x `${this._renderSlider("music", this._t("Music fade"), "fade_music_duration", musicMin, 1, 30, 1, `${musicMin} min`, 60)}
          ${this._renderSlider("volume", this._t("Volume"), "volume", volume, 0, 1, 0.05, `${Math.round(volume * 100)}%`)}

          <div class="field">
            <span class="label">${icon("playlist", "s")}${this._t("Playlist")}</span>
            ${playlistOptions.length
            ? x `
                  <select
                    aria-label=${this._t("Playlist")}
                    .value=${playlist}
                    @change=${(e) => this._set({ playlist: e.target.value })}
                  >
                    ${playlistOptions.map((opt) => x `<option .value=${opt} ?selected=${opt === playlist}>${opt}</option>`)}
                  </select>
                `
            : x `<span class="value muted">${playlist || this._t("No playlist configured")}</span>`}
          </div>
          ` : E}
          ${lights ? this._renderEntitySelector("light_entity", this._t("Wakeup light"), "light", a.light_entity) : E}
          ${music ? this._renderEntitySelector("ma_player_entity", this._t("Music player"), "media_player", a.ma_player_entity ?? a.player_entity) : E}
          ${this._renderEntitySelector(advanced ? "person_entities" : "person_entity", advanced ? this._t("People (anyone home)") : this._t("Person"), "person", advanced ? people : personEntity)}
          <div class="toggles">
            <label class=${e({ row: true, "sev-ok": requireHome, "sev-off": !requireHome })}>
              <span class="circ">${icon("home")}</span>
              <span class="row-text">
                <span class="name">${this._t("Only when home")}</span>
                ${people.length
            ? x `<span class=${e({ state: true, away: !anyoneHome })}>${anyoneHome ? this._t("Someone home") : this._t("Nobody home")}</span>`
            : E}
              </span>
              <input type="checkbox" role="switch" class="switch" data-setting="require_home"
                aria-label=${this._t("Only when home")}
                .checked=${l(requireHome)}
                ?disabled=${!people.length || settingBusy}
                @change=${(e) => this._set({ require_home: e.target.checked })} />
            </label>
          </div>
        </div>

        ${this._settingsError ? x `<p role="alert" class="error">${icon("warning", "s")}<span>${typeof this._settingsError === "string" ? this._settingsError : this._t(this._settingsError.key)}</span></p>` : E}
        ${advanced ? x `<div class="save-row">
          <span class="value muted">${this._t("Mode, targets, people and daily schedule save together.")}</span>
          <button class="text-button" data-discard type="button"
            ?disabled=${this._busy !== null || !Object.keys(this._settingsDraft).length}
            @click=${() => { this._settingsDraft = {}; this._savedDraft = null; this._settingsError = ""; }}>${this._t("Discard changes")}</button>
          <button class="text-button strong" data-save type="button"
            ?disabled=${this._busy !== null || !Object.keys(this._settingsDraft).length}
            @click=${this._saveSettings}>${this._busy === "set_config" ? icon("spinner", "s spin") : E}${this._t("Save configuration")}</button>
        </div>` : E}
        <div class="footer">
          <span class="footer-note">
            ${nextFire && !snoozed
            ? x `${icon("alarm", "s")}<span>${this._t("Next:")} ${this._fmtDay(nextFire)} ${this._fmtTime(nextFire)}</span>`
            : enabled
                ? E
                : x `${icon("alarmOff", "s")}<span>${this._t("Alarm is off")}</span>`}
          </span>
          <button
            class="text-button"
            type="button"
            ?disabled=${this._busy === "trigger_now" || noData}
            @click=${() => {
            this._closeSettings();
            return this._call("trigger_now");
        }}
          >${icon("play", "s")}${this._t("Test now")}</button>
        </div>
      </dialog>
    `;
    }
    /** Calm states: the next alarm time is the headline. */
    _renderHero(st, tone, enabled, timeOfDay, nextFire, fadeStart = null) {
        let headline = "—";
        let dim = false;
        let context = "";
        if (st === "armed") {
            if (nextFire) {
                headline = this._fmtTime(nextFire);
                context = `${this._fmtDay(nextFire)} · ${this._fmtRelative(nextFire)}`;
                // The sunrise runs before the alarm time; say when it begins.
                if (fadeStart && fadeStart !== nextFire)
                    context += ` · ${this._t("Sunrise from")} ${this._fmtTime(fadeStart)}`;
            }
            else {
                context = this._t("No upcoming alarm");
            }
        }
        else if (st === "disarmed" || !enabled) {
            headline = this._fmtClock(timeOfDay);
            dim = true;
            context = this._t("Alarm is off");
        }
        return x `
      <div class="hero sev-${tone}">
        <span class="circ big">${icon(STATE_ICONS[st] ?? "alarm")}</span>
        <div class="hero-text">
          <span class="status" data-status>${this._stateLabel(st)}</span>
          <span class=${e({ current: true, dim })}>${headline}</span>
          ${context ? x `<span class="context subtitle">${context}</span>` : E}
        </div>
      </div>
    `;
    }
    /** Rising, ringing and snoozed take over the card with Stop and snooze. */
    _renderTakeover(st, wakeMode, runStarted, snoozeUntil, canSnooze, presets, defaultSnooze, wakeAt = null) {
        const kind = st === "snoozed" || st === "rising" ? st : "ringing";
        const tone = STATE_TONES[kind];
        const channel = wakeMode === "lights" ? this._t("Light") : wakeMode === "music" ? this._t("Music") : this._t("Light and music");
        const stopping = this._busy === "stop";
        return x `
      <section class="takeover is-${kind} sev-${tone}" aria-label=${this._stateLabel(kind)}>
        <div class="takeover-head">
          <span class="circ big">${icon(STATE_ICONS[kind])}</span>
          <div class="hero-text">
            <span class="hero-title" data-status>${this._stateLabel(kind)}</span>
            ${kind === "snoozed"
            ? x `<span class="hero-sub">${this._t("Rings again at")} ${this._fmtTime(snoozeUntil)}<em>${this._fmtRelative(snoozeUntil)}</em></span>`
            : kind === "rising"
                ? x `<span class="hero-sub">${channel} ${this._t("fading in since")} ${this._fmtTime(runStarted)}${wakeAt ? x ` · ${wakeMode === "lights" ? this._t("Fully up at") : this._t("Wake-up at")} ${this._fmtTime(wakeAt)}` : E}</span>`
                : x `<span class="hero-sub">${this._t("Since")} ${this._fmtTime(runStarted)}</span>`}
          </div>
        </div>
        <button class="stop" type="button" ?disabled=${stopping} aria-busy=${stopping ? "true" : "false"}
          @click=${() => this._call("stop")}>${stopping ? icon("spinner", "spin") : icon("stop")}<span>${this._t("Stop")}</span></button>
        ${canSnooze
            ? x `
              <div class="snooze-row" role="group" aria-label=${this._t("Snooze")}>
                <span class="snooze-label">${icon("snooze", "s")}${this._t("Snooze")}</span>
                <div class="presets">
                ${presets.map((m) => x `
                    <button
                      class=${e({ preset: true, primary: m === defaultSnooze })}
                      type="button"
                      ?disabled=${this._busy === `snooze-${m}`}
                      @click=${() => this._call("snooze", { duration_minutes: m }, `snooze-${m}`)}
                    >${m} min</button>
                  `)}
                </div>
              </div>
            `
            : E}
      </section>
    `;
    }
    /** Enabled and Skip next: pill switches shared with the Time for School card. */
    _renderToggle(key, iconName, label, checked, disabled, detail = "") {
        const busyLabel = `toggle-${key}`;
        const pending = this._busy === busyLabel;
        return x `
      <button
        class=${e({ pill: true, skip: key === "skip_next", on: checked, pending })}
        type="button"
        role="switch"
        aria-checked=${checked ? "true" : "false"}
        aria-busy=${pending ? "true" : "false"}
        data-toggle=${key}
        ?disabled=${disabled || pending}
        @click=${() => this._set({ [key]: !checked }, busyLabel)}
      >${icon(iconName)}<span class="pill-text"><span>${label}</span>${detail ? x `<small>${detail}</small>` : E}</span></button>
    `;
    }
    _renderSlider(iconName, label, key, value, min, max, step, display, scale = 1) {
        return x `
      <div class="field slider-field">
        <span class="label">
          ${icon(iconName, "s")}${label}
          <span class="value">${display}</span>
        </span>
        <ha-slider
          aria-label=${label}
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
      <div class="field device-field selector-field">
        <ha-selector
          data-key=${key}
          .hass=${this.hass}
          .selector=${{ entity: { domain, ...(key === "person_entities" ? { multiple: true } : {}) } }}
          .value=${value || undefined}
          .label=${label}
          .required=${domain !== "person"}
          .disabled=${this._busy !== null}
          @value-changed=${(ev) => {
            ev.stopPropagation();
            const selected = ev.detail.value ?? (key === "person_entities" ? [] : "");
            if (this._advanced()) {
                if (key === "person_entities" && Array.isArray(selected))
                    this._stage({ [key]: [...new Set(selected)] });
                else if (typeof selected === "string")
                    this._stage({ [key]: selected });
                return;
            }
            if (typeof selected === "string" && (selected || key === "person_entity")) {
                void this._set({ [key]: selected });
            }
        }}
        ></ha-selector>
      </div>
    `;
    }
};
PersonalWakeupCard.styles = styles;
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
__decorate([
    r()
], PersonalWakeupCard.prototype, "_settingsDraft", void 0);
__decorate([
    r()
], PersonalWakeupCard.prototype, "_settingsError", void 0);
PersonalWakeupCard = __decorate([
    t("lovelace-personal-wakeup-card")
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
