(()=>{var e={10:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});var i=n(537),s=n.n(i),a=n(645),r=n.n(a)()(s());r.push([e.id,".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n","",{version:3,sources:["webpack://./src/framework/view/abstract-view.css"],names:[],mappings:"AAAA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE;;IAEE,wBAAwB;EAC1B;;EAEA;;;;;IAKE,2BAA2B;EAC7B;;EAEA;;;;IAIE,0BAA0B;EAC5B;AACF",sourcesContent:[".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n"],sourceRoot:""}]);const o=r},645:e=>{"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",i=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),i&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),i&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,i,s,a){"string"==typeof e&&(e=[[null,e,void 0]]);var r={};if(i)for(var o=0;o<this.length;o++){var c=this[o][0];null!=c&&(r[c]=!0)}for(var d=0;d<e.length;d++){var f=[].concat(e[d]);i&&r[f[0]]||(void 0!==a&&(void 0===f[5]||(f[1]="@layer".concat(f[5].length>0?" ".concat(f[5]):""," {").concat(f[1],"}")),f[5]=a),n&&(f[2]?(f[1]="@media ".concat(f[2]," {").concat(f[1],"}"),f[2]=n):f[2]=n),s&&(f[4]?(f[1]="@supports (".concat(f[4],") {").concat(f[1],"}"),f[4]=s):f[4]="".concat(s)),t.push(f))}},t}},537:e=>{"use strict";e.exports=function(e){var t=e[1],n=e[3];if(!n)return t;if("function"==typeof btoa){var i=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(i),a="/*# ".concat(s," */");return[t].concat([a]).join("\n")}return[t].join("\n")}},484:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,n="millisecond",i="second",s="minute",a="hour",r="day",o="week",c="month",d="quarter",f="year",l="date",u="Invalid Date",p=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,h=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,b={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],n=e%100;return"["+e+(t[(n-20)%10]||t[n]||t[0])+"]"}},v=function(e,t,n){var i=String(e);return!i||i.length>=t?e:""+Array(t+1-i.length).join(n)+e},m={s:v,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),i=Math.floor(n/60),s=n%60;return(t<=0?"+":"-")+v(i,2,"0")+":"+v(s,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var i=12*(n.year()-t.year())+(n.month()-t.month()),s=t.clone().add(i,c),a=n-s<0,r=t.clone().add(i+(a?-1:1),c);return+(-(i+(n-s)/(a?s-r:r-s))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:c,y:f,w:o,d:r,D:l,h:a,m:s,s:i,ms:n,Q:d}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},_="en",y={};y[_]=b;var $=function(e){return e instanceof M},g=function e(t,n,i){var s;if(!t)return _;if("string"==typeof t){var a=t.toLowerCase();y[a]&&(s=a),n&&(y[a]=n,s=a);var r=t.split("-");if(!s&&r.length>1)return e(r[0])}else{var o=t.name;y[o]=t,s=o}return!i&&s&&(_=s),s||!i&&_},T=function(e,t){if($(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new M(n)},w=m;w.l=g,w.i=$,w.w=function(e,t){return T(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var M=function(){function b(e){this.$L=g(e.locale,null,!0),this.parse(e)}var v=b.prototype;return v.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(w.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var i=t.match(p);if(i){var s=i[2]-1||0,a=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,a)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,a)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},v.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},v.$utils=function(){return w},v.isValid=function(){return!(this.$d.toString()===u)},v.isSame=function(e,t){var n=T(e);return this.startOf(t)<=n&&n<=this.endOf(t)},v.isAfter=function(e,t){return T(e)<this.startOf(t)},v.isBefore=function(e,t){return this.endOf(t)<T(e)},v.$g=function(e,t,n){return w.u(e)?this[t]:this.set(n,e)},v.unix=function(){return Math.floor(this.valueOf()/1e3)},v.valueOf=function(){return this.$d.getTime()},v.startOf=function(e,t){var n=this,d=!!w.u(t)||t,u=w.p(e),p=function(e,t){var i=w.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return d?i:i.endOf(r)},h=function(e,t){return w.w(n.toDate()[e].apply(n.toDate("s"),(d?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},b=this.$W,v=this.$M,m=this.$D,_="set"+(this.$u?"UTC":"");switch(u){case f:return d?p(1,0):p(31,11);case c:return d?p(1,v):p(0,v+1);case o:var y=this.$locale().weekStart||0,$=(b<y?b+7:b)-y;return p(d?m-$:m+(6-$),v);case r:case l:return h(_+"Hours",0);case a:return h(_+"Minutes",1);case s:return h(_+"Seconds",2);case i:return h(_+"Milliseconds",3);default:return this.clone()}},v.endOf=function(e){return this.startOf(e,!1)},v.$set=function(e,t){var o,d=w.p(e),u="set"+(this.$u?"UTC":""),p=(o={},o[r]=u+"Date",o[l]=u+"Date",o[c]=u+"Month",o[f]=u+"FullYear",o[a]=u+"Hours",o[s]=u+"Minutes",o[i]=u+"Seconds",o[n]=u+"Milliseconds",o)[d],h=d===r?this.$D+(t-this.$W):t;if(d===c||d===f){var b=this.clone().set(l,1);b.$d[p](h),b.init(),this.$d=b.set(l,Math.min(this.$D,b.daysInMonth())).$d}else p&&this.$d[p](h);return this.init(),this},v.set=function(e,t){return this.clone().$set(e,t)},v.get=function(e){return this[w.p(e)]()},v.add=function(n,d){var l,u=this;n=Number(n);var p=w.p(d),h=function(e){var t=T(u);return w.w(t.date(t.date()+Math.round(e*n)),u)};if(p===c)return this.set(c,this.$M+n);if(p===f)return this.set(f,this.$y+n);if(p===r)return h(1);if(p===o)return h(7);var b=(l={},l[s]=e,l[a]=t,l[i]=1e3,l)[p]||1,v=this.$d.getTime()+n*b;return w.w(v,this)},v.subtract=function(e,t){return this.add(-1*e,t)},v.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||u;var i=e||"YYYY-MM-DDTHH:mm:ssZ",s=w.z(this),a=this.$H,r=this.$m,o=this.$M,c=n.weekdays,d=n.months,f=function(e,n,s,a){return e&&(e[n]||e(t,i))||s[n].slice(0,a)},l=function(e){return w.s(a%12||12,e,"0")},p=n.meridiem||function(e,t,n){var i=e<12?"AM":"PM";return n?i.toLowerCase():i},b={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:w.s(o+1,2,"0"),MMM:f(n.monthsShort,o,d,3),MMMM:f(d,o),D:this.$D,DD:w.s(this.$D,2,"0"),d:String(this.$W),dd:f(n.weekdaysMin,this.$W,c,2),ddd:f(n.weekdaysShort,this.$W,c,3),dddd:c[this.$W],H:String(a),HH:w.s(a,2,"0"),h:l(1),hh:l(2),a:p(a,r,!0),A:p(a,r,!1),m:String(r),mm:w.s(r,2,"0"),s:String(this.$s),ss:w.s(this.$s,2,"0"),SSS:w.s(this.$ms,3,"0"),Z:s};return i.replace(h,(function(e,t){return t||b[e]||s.replace(":","")}))},v.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},v.diff=function(n,l,u){var p,h=w.p(l),b=T(n),v=(b.utcOffset()-this.utcOffset())*e,m=this-b,_=w.m(this,b);return _=(p={},p[f]=_/12,p[c]=_,p[d]=_/3,p[o]=(m-v)/6048e5,p[r]=(m-v)/864e5,p[a]=m/t,p[s]=m/e,p[i]=m/1e3,p)[h]||m,u?_:w.a(_)},v.daysInMonth=function(){return this.endOf(c).$D},v.$locale=function(){return y[this.$L]},v.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),i=g(e,t,!0);return i&&(n.$L=i),n},v.clone=function(){return w.w(this.$d,this)},v.toDate=function(){return new Date(this.valueOf())},v.toJSON=function(){return this.isValid()?this.toISOString():null},v.toISOString=function(){return this.$d.toISOString()},v.toString=function(){return this.$d.toUTCString()},b}(),C=M.prototype;return T.prototype=C,[["$ms",n],["$s",i],["$m",s],["$H",a],["$W",r],["$M",c],["$y",f],["$D",l]].forEach((function(e){C[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),T.extend=function(e,t){return e.$i||(e(t,M,T),e.$i=!0),T},T.locale=g,T.isDayjs=$,T.unix=function(e){return T(1e3*e)},T.en=y[_],T.Ls=y,T.p={},T}()},387:function(e){e.exports=function(){"use strict";var e={year:0,month:1,day:2,hour:3,minute:4,second:5},t={};return function(n,i,s){var a,r=function(e,n,i){void 0===i&&(i={});var s=new Date(e),a=function(e,n){void 0===n&&(n={});var i=n.timeZoneName||"short",s=e+"|"+i,a=t[s];return a||(a=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:e,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",timeZoneName:i}),t[s]=a),a}(n,i);return a.formatToParts(s)},o=function(t,n){for(var i=r(t,n),a=[],o=0;o<i.length;o+=1){var c=i[o],d=c.type,f=c.value,l=e[d];l>=0&&(a[l]=parseInt(f,10))}var u=a[3],p=24===u?0:u,h=a[0]+"-"+a[1]+"-"+a[2]+" "+p+":"+a[4]+":"+a[5]+":000",b=+t;return(s.utc(h).valueOf()-(b-=b%1e3))/6e4},c=i.prototype;c.tz=function(e,t){void 0===e&&(e=a);var n=this.utcOffset(),i=this.toDate(),r=i.toLocaleString("en-US",{timeZone:e}),o=Math.round((i-new Date(r))/1e3/60),c=s(r).$set("millisecond",this.$ms).utcOffset(15*-Math.round(i.getTimezoneOffset()/15)-o,!0);if(t){var d=c.utcOffset();c=c.add(n-d,"minute")}return c.$x.$timezone=e,c},c.offsetName=function(e){var t=this.$x.$timezone||s.tz.guess(),n=r(this.valueOf(),t,{timeZoneName:e}).find((function(e){return"timezonename"===e.type.toLowerCase()}));return n&&n.value};var d=c.startOf;c.startOf=function(e,t){if(!this.$x||!this.$x.$timezone)return d.call(this,e,t);var n=s(this.format("YYYY-MM-DD HH:mm:ss:SSS"));return d.call(n,e,t).tz(this.$x.$timezone,!0)},s.tz=function(e,t,n){var i=n&&t,r=n||t||a,c=o(+s(),r);if("string"!=typeof e)return s(e).tz(r);var d=function(e,t,n){var i=e-60*t*1e3,s=o(i,n);if(t===s)return[i,t];var a=o(i-=60*(s-t)*1e3,n);return s===a?[i,s]:[e-60*Math.min(s,a)*1e3,Math.max(s,a)]}(s.utc(e,i).valueOf(),c,r),f=d[0],l=d[1],u=s(f).utcOffset(l);return u.$x.$timezone=r,u},s.tz.guess=function(){return Intl.DateTimeFormat().resolvedOptions().timeZone},s.tz.setDefault=function(e){a=e}}}()},178:function(e){e.exports=function(){"use strict";var e="minute",t=/[+-]\d\d(?::?\d\d)?/g,n=/([+-]|\d\d)/g;return function(i,s,a){var r=s.prototype;a.utc=function(e){return new s({date:e,utc:!0,args:arguments})},r.utc=function(t){var n=a(this.toDate(),{locale:this.$L,utc:!0});return t?n.add(this.utcOffset(),e):n},r.local=function(){return a(this.toDate(),{locale:this.$L,utc:!1})};var o=r.parse;r.parse=function(e){e.utc&&(this.$u=!0),this.$utils().u(e.$offset)||(this.$offset=e.$offset),o.call(this,e)};var c=r.init;r.init=function(){if(this.$u){var e=this.$d;this.$y=e.getUTCFullYear(),this.$M=e.getUTCMonth(),this.$D=e.getUTCDate(),this.$W=e.getUTCDay(),this.$H=e.getUTCHours(),this.$m=e.getUTCMinutes(),this.$s=e.getUTCSeconds(),this.$ms=e.getUTCMilliseconds()}else c.call(this)};var d=r.utcOffset;r.utcOffset=function(i,s){var a=this.$utils().u;if(a(i))return this.$u?0:a(this.$offset)?d.call(this):this.$offset;if("string"==typeof i&&(i=function(e){void 0===e&&(e="");var i=e.match(t);if(!i)return null;var s=(""+i[0]).match(n)||["-",0,0],a=s[0],r=60*+s[1]+ +s[2];return 0===r?0:"+"===a?r:-r}(i),null===i))return this;var r=Math.abs(i)<=16?60*i:i,o=this;if(s)return o.$offset=r,o.$u=0===i,o;if(0!==i){var c=this.$u?this.toDate().getTimezoneOffset():-1*this.utcOffset();(o=this.local().add(r+c,e)).$offset=r,o.$x.$localOffset=c}else o=this.utc();return o};var f=r.format;r.format=function(e){var t=e||(this.$u?"YYYY-MM-DDTHH:mm:ss[Z]":"");return f.call(this,t)},r.valueOf=function(){var e=this.$utils().u(this.$offset)?0:this.$offset+(this.$x.$localOffset||this.$d.getTimezoneOffset());return this.$d.valueOf()-6e4*e},r.isUTC=function(){return!!this.$u},r.toISOString=function(){return this.toDate().toISOString()},r.toString=function(){return this.toDate().toUTCString()};var l=r.toDate;r.toDate=function(e){return"s"===e&&this.$offset?a(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate():l.call(this)};var u=r.diff;r.diff=function(e,t,n){if(e&&this.$u===e.$u)return u.call(this,e,t,n);var i=this.local(),s=a(e).local();return u.call(i,s,t,n)}}}()},379:e=>{"use strict";var t=[];function n(e){for(var n=-1,i=0;i<t.length;i++)if(t[i].identifier===e){n=i;break}return n}function i(e,i){for(var a={},r=[],o=0;o<e.length;o++){var c=e[o],d=i.base?c[0]+i.base:c[0],f=a[d]||0,l="".concat(d," ").concat(f);a[d]=f+1;var u=n(l),p={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==u)t[u].references++,t[u].updater(p);else{var h=s(p,i);i.byIndex=o,t.splice(o,0,{identifier:l,updater:h,references:1})}r.push(l)}return r}function s(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,s){var a=i(e=e||[],s=s||{});return function(e){e=e||[];for(var r=0;r<a.length;r++){var o=n(a[r]);t[o].references--}for(var c=i(e,s),d=0;d<a.length;d++){var f=n(a[d]);0===t[f].references&&(t[f].updater(),t.splice(f,1))}a=c}}},569:e=>{"use strict";var t={};e.exports=function(e,n){var i=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(n)}},216:e=>{"use strict";e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,n)=>{"use strict";e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},795:e=>{"use strict";e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var i="";n.supports&&(i+="@supports (".concat(n.supports,") {")),n.media&&(i+="@media ".concat(n.media," {"));var s=void 0!==n.layer;s&&(i+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),i+=n.css,s&&(i+="}"),n.media&&(i+="}"),n.supports&&(i+="}");var a=n.sourceMap;a&&"undefined"!=typeof btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),t.styleTagTransform(i,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{"use strict";e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(i){var s=t[i];if(void 0!==s)return s.exports;var a=t[i]={id:i,exports:{}};return e[i].call(a.exports,a,a.exports,n),a.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.nc=void 0,(()=>{"use strict";var e=n(484),t=n.n(e);function i(e,t,n="beforeend"){if(!(e instanceof $))throw new Error("Can render only components");if(null===t)throw new Error("Container element doesn't exist");t.insertAdjacentElement(n,e.element)}function s(e,t){if(!(e instanceof $&&t instanceof $))throw new Error("Can replace only components");const n=e.element,i=t.element,s=i.parentElement;if(null===s)throw new Error("Parent element doesn't exist");s.replaceChild(n,i)}var a=n(379),r=n.n(a),o=n(795),c=n.n(o),d=n(569),f=n.n(d),l=n(565),u=n.n(l),p=n(216),h=n.n(p),b=n(589),v=n.n(b),m=n(10),_={};_.styleTagTransform=v(),_.setAttributes=u(),_.insert=f().bind(null,"head"),_.domAPI=c(),_.insertStyleElement=h(),r()(m.Z,_),m.Z&&m.Z.locals&&m.Z.locals;const y="shake";class ${#e=null;constructor(){if(new.target===$)throw new Error("Can't instantiate AbstractView, only concrete one.")}get element(){return this.#e||(this.#e=function(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}(this.template)),this.#e}get template(){throw new Error("Abstract method not implemented: get template")}removeElement(){this.#e=null}shake(e){this.element.classList.add(y),setTimeout((()=>{this.element.classList.remove(y),e?.()}),600)}}var g=n(178),T=n.n(g),w=n(387),M=n.n(w);t().extend(T()),t().extend(M());const C="MMM D",D="hh:mm",S="DD/MM/YY hh:mm";class E extends ${#t=null;#n=null;#i=null;#s=null;constructor({point:e,pointTypes:t,destinations:n,onFormSubmit:i}){super(),this.#t=e,this.#n=t,this.#i=n,this.#s=i,this.element.addEventListener("submit",this.#a),this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#a)}get template(){return function(e,n,i){return`<form class="event event--edit" action="#" method="post">\n  <header class="event__header">\n    <div class="event__type-wrapper">\n      <label class="event__type  event__type-btn" for="event-type-toggle-${e.id}">\n        <span class="visually-hidden">Choose event type</span>\n        <img class="event__type-icon" width="17" height="17" src="img/icons/${e.type.toLowerCase()}.png" alt="Event type icon">\n      </label>\n      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${e.id}" type="checkbox">\n      <div class="event__type-list">\n        <fieldset class="event__type-group">\n          <legend class="visually-hidden">Event type</legend>\n${n.map((t=>`<div class="event__type-item">\n      <input id="event-type-${t}-${e.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${t}" ${t===e.type?"checked":""}>\n      <label class="event__type-label  event__type-label--${t}" for="event-type-${t}-${e.id}">${t}</label>\n  </div>`)).join("")}\n        </fieldset>\n      </div>\n    </div>\n    <div class="event__field-group  event__field-group--destination">\n      <label class="event__label  event__type-output" for="event-destination-${e.id}">\n      ${e.type}\n      </label>\n      <input class="event__input  event__input--destination" id="event-destination-${e.id}" type="text" name="event-destination" value="${e.destinationEntity.name||""}" list="destination-list-${e.id}">\n      <datalist id="destination-list-${e.id}">\n        ${i.map((e=>`<option value="${e.name}"></option>`)).join("")}\n      </datalist>\n    </div>\n    <div class="event__field-group  event__field-group--time">\n      <label class="visually-hidden" for="event-start-time-${e.id}">From</label>\n      <input class="event__input  event__input--time" id="event-start-time-${e.id}" type="text" name="event-start-time" value="${t()(e.date_from).format(S)}">\n      &mdash;\n      <label class="visually-hidden" for="event-end-time-${e.id}">To</label>\n      <input class="event__input  event__input--time" id="event-end-time-${e.id}" type="text" name="event-end-time" value="${t()(e.date_to).format(S)}">\n    </div>\n    <div class="event__field-group  event__field-group--price">\n      <label class="event__label" for="event-price-${e.id}">\n        <span class="visually-hidden">Price</span>\n        &euro;\n      </label>\n      <input class="event__input  event__input--price" id="event-price-${e.id}" type="text" name="event-price" value="${e.base_price}">\n    </div>\n    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n    <button class="event__reset-btn" type="reset">${e.id?"Delete":"Cancel"}</button>\n    ${e.id?'<button class="event__rollup-btn" type="button">\n        <span class="visually-hidden">Open event</span>\n      </button>':""}\n  </header>\n  <section class="event__details">\n    ${e.offers.length?`<section class="event__section  event__section--offers">\n      <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n      <div class="event__available-offers">\n        ${e.offersEntity.map((t=>`<div class="event__offer-selector">\n          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${t.title}-${e.id}" type="checkbox" name="event-offer-${t.title}"\n${e.offers.includes(t.id)?"checked":""}>\n          <label class="event__offer-label" for="event-offer-${t.title}-${e.id}">\n            <span class="event__offer-title">${t.title}</span>\n            &plus;&euro;&nbsp;\n            <span class="event__offer-price">${t.price}</span>\n          </label>\n        </div>`)).join("")}\n      </div>\n    </section>`:""}\n\n    ${e.destination?`<section class="event__section  event__section--destination">\n      <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n      <p class="event__destination-description">${e.destinationEntity.description}</p>\n\n      ${e.destinationEntity.pictures.length>0?`<div class="event__photos-container">\n        <div class="event__photos-tape">\n          ${e.destinationEntity.pictures.map((e=>`<img class="event__photo" src="${e.src}" alt="${e.description}">`)).join("")}\n      </div>\n    </div>`:""}\n\n    </section>`:""}\n\n  </section>\n</form>`}(this.#t,this.#n,this.#i)}#a=e=>{e.preventDefault(),this.#s()}}class x extends ${#r=null;constructor({filters:e}){super(),this.#r=e}get template(){return function(e){const t=e.map(((e,t)=>function(e,t){const{type:n}=e;return`<div class="trip-filters__filter">\n    <input id="filter-${n}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${n}" ${t?"checked":""}>\n    <label class="trip-filters__filter-label" for="filter-${n}">${n}</label>\n  </div>`}(e,0===t))).join("");return`<form class="trip-filters" action="#" method="get">\n\n  ${t}\n</form>`}(this.#r)}}class Z extends ${#t=null;#o=null;constructor({point:e,onEditClick:t}){super(),this.#t=e,this.#o=t,this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#c)}get template(){return e=this.#t,`<li class="trip-events__item">\n  <div class="event">\n    <time class="event__date" datetime=${t()(e.date_from,"full-date").format(C)}>${t()(e.date_from,"custom").format(C)}</time>\n    <div class="event__type">\n      <img class="event__type-icon" width="42" height="42" src="img/icons/${e.type.toLowerCase()}.png" alt="Event type icon">\n    </div>\n    <h3 class="event__title">${e.type} ${e.destinationEntity.name}</h3>\n    <div class="event__schedule">\n      <p class="event__time">\n        <time class="event__start-time" datetime=${t()(e.date_from).format(D)}>${t()(e.date_from).format(D)}</time>\n        &mdash;\n        <time class="event__end-time" datetime=${t()(e.date_to).format(D)}>${t()(e.date_to).format(D)}</time>\n      </p>\n      <p class="event__duration">${((e,n)=>{const i=t().utc(e).diff(n,"minute"),s=t().utc(e).diff(n,"hour");return i<60?`${i+1}m`:`${s}h ${i-60*s+1}m`})(e.date_to,e.date_from)}</p>\n    </div>\n    <p class="event__price">\n      &euro;&nbsp;<span class="event__price-value">${e.base_price}</span>\n    </p>\n    <h4 class="visually-hidden">Offers:</h4>\n    <ul class="event__selected-offers">\n  ${e.offersEntity.map((t=>e.offers.includes(t.id)?`<li class="event__offer">\n        <span class="event__offer-title">${t.title}</span>\n        &plus;&euro;&nbsp;\n        <span class="event__offer-price">${t.price}</span>\n      </li>`:"")).join("")}\n    </ul>\n    <button class="event__favorite-btn ${e.is_favorite?"event__favorite-btn--active":""}" type="button">\n      <span class="visually-hidden">Add to favorite</span>\n      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n      </svg>\n    </button>\n    <button class="event__rollup-btn" type="button">\n      <span class="visually-hidden">Open event</span>\n    </button>\n  </div>\n</li>`;var e}#c=e=>{e.preventDefault(),this.#o()}}class O extends ${get template(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n  <div class="trip-sort__item  trip-sort__item--day">\n    <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">\n    <label class="trip-sort__btn" for="sort-day">Day</label>\n  </div>\n\n  <div class="trip-sort__item  trip-sort__item--event">\n    <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n    <label class="trip-sort__btn" for="sort-event">Event</label>\n  </div>\n\n  <div class="trip-sort__item  trip-sort__item--time">\n    <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n    <label class="trip-sort__btn" for="sort-time">Time</label>\n  </div>\n\n  <div class="trip-sort__item  trip-sort__item--price">\n    <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" checked>\n    <label class="trip-sort__btn" for="sort-price">Price</label>\n  </div>\n\n  <div class="trip-sort__item  trip-sort__item--offer">\n    <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n    <label class="trip-sort__btn" for="sort-offer">Offers</label>\n  </div>\n</form>'}}const A=[{id:"2a16228b-e3d4-44de-82fa-9b79be1f4fee",base_price:2767,date_from:"2025-10-31T22:59:34.880Z",date_to:"2025-11-01T23:59:34.880Z",destination:"6c283327-a8f0-4371-901b-1ba8caf264fa",is_favorite:!1,offers:[],type:"sightseeing"},{id:"d21a1f90-01ec-494a-97a0-a7b0636001f4",base_price:1584,date_from:"2025-11-01T23:59:34.880Z",date_to:"2025-11-02T15:59:34.880Z",destination:"086ac21a-2d38-4f3b-8102-596f1a96f982",is_favorite:!1,offers:[],type:"flight"},{id:"7753b966-9609-4ca4-b723-3331c8ce8815",base_price:2118,date_from:"2025-11-02T15:59:34.880Z",date_to:"2025-11-04T08:59:34.880Z",destination:"f3426b6f-2ee7-4d17-9694-62e06d17cacb",is_favorite:!1,offers:[],type:"sightseeing"},{id:"0971cb03-d7e4-4d61-8ce0-0be56f9be66b",base_price:3323,date_from:"2025-11-04T08:59:34.880Z",date_to:"2025-11-04T21:59:34.880Z",destination:"6c283327-a8f0-4371-901b-1ba8caf264fa",is_favorite:!0,offers:["0910594d-57dd-431a-9b79-1bd37c05ca0f","d6036dfc-c8a1-48a5-983c-6a646649ef6e"],type:"restaurant"},{id:"2168af69-1693-48f4-a235-479a626e20ec",base_price:6945,date_from:"2025-11-04T21:59:34.880Z",date_to:"2025-11-05T21:59:34.880Z",destination:"086ac21a-2d38-4f3b-8102-596f1a96f982",is_favorite:!1,offers:["d33e2895-1fa1-42d5-b0de-413bfb2877e6","ee0edacc-c9be-4498-a76a-ff47c470b78c","a2ab44c7-469b-48ed-91fd-de5bb80c183f","ef908bf8-dc9b-430e-9bfb-f77ec432af76"],type:"taxi"},{id:"17721314-a03b-4945-b749-52873b1bd3cc",base_price:4488,date_from:"2025-11-05T21:59:34.880Z",date_to:"2025-11-07T04:59:34.880Z",destination:"f3426b6f-2ee7-4d17-9694-62e06d17cacb",is_favorite:!0,offers:["49fed99d-5608-42a0-9b7b-7c8fcd01809b"],type:"train"},{id:"7b3f1ebe-a3f4-4289-a728-212b4b9eea50",base_price:9860,date_from:"2025-11-07T04:59:34.880Z",date_to:"2025-11-08T11:59:34.880Z",destination:"f3426b6f-2ee7-4d17-9694-62e06d17cacb",is_favorite:!1,offers:["795610a0-78bd-4968-b577-2c3767dda618","1786e2c4-79df-4be7-8551-7a0706d569b1","e73580ef-79cd-49de-90c9-a8b546e5c7ff","9e72ca03-b00d-4ec2-ae36-df07ef0a6ce7"],type:"check-in"},{id:"dbe242eb-e19f-4b25-9d29-9b52d1f086a2",base_price:6123,date_from:"2025-11-08T11:59:34.880Z",date_to:"2025-11-10T03:59:34.880Z",destination:"7f673772-106c-4037-a64f-52aee3dda3d6",is_favorite:!0,offers:["23ed4062-ab5a-40c4-ab36-e5ad08715f6a"],type:"ship"},{id:"ddcdb8b8-9087-4732-a348-f780a20fe650",base_price:1058,date_from:"2025-11-10T03:59:34.880Z",date_to:"2025-11-11T23:59:34.880Z",destination:"086ac21a-2d38-4f3b-8102-596f1a96f982",is_favorite:!0,offers:["4cd98958-6a06-48e5-9450-3c72e394ed0a","4cbbd2af-9256-4f1b-a0ed-61cf4e10875f"],type:"drive"},{id:"644b875c-7a02-4208-8544-17af2bff8788",base_price:9932,date_from:"2025-11-11T23:59:34.880Z",date_to:"2025-11-13T19:59:34.880Z",destination:"086ac21a-2d38-4f3b-8102-596f1a96f982",is_favorite:!1,offers:[],type:"train"},{id:"5d32618b-df95-48b5-97dc-4b3a6ee61cde",base_price:3892,date_from:"2025-11-13T19:59:34.880Z",date_to:"2025-11-14T12:59:34.880Z",destination:"086ac21a-2d38-4f3b-8102-596f1a96f982",is_favorite:!0,offers:["1786e2c4-79df-4be7-8551-7a0706d569b1","e73580ef-79cd-49de-90c9-a8b546e5c7ff","9e72ca03-b00d-4ec2-ae36-df07ef0a6ce7"],type:"check-in"},{id:"ea5ac08b-c0a1-491c-a0b3-973b78b340b3",base_price:278,date_from:"2025-11-14T12:59:34.880Z",date_to:"2025-11-15T01:59:34.880Z",destination:"6c283327-a8f0-4371-901b-1ba8caf264fa",is_favorite:!1,offers:[],type:"train"},{id:"d7b68833-1145-4b42-895e-536fb05d327b",base_price:3067,date_from:"2025-11-15T01:59:34.880Z",date_to:"2025-11-16T05:59:34.880Z",destination:"7f673772-106c-4037-a64f-52aee3dda3d6",is_favorite:!1,offers:["18ab9b1c-0d2a-4ebd-9160-ef01f7e2f9d3","49fed99d-5608-42a0-9b7b-7c8fcd01809b"],type:"train"},{id:"23436560-630b-480a-9655-e46cbcab8c2d",base_price:6920,date_from:"2025-11-16T05:59:34.880Z",date_to:"2025-11-17T21:59:34.880Z",destination:"f3426b6f-2ee7-4d17-9694-62e06d17cacb",is_favorite:!0,offers:["795610a0-78bd-4968-b577-2c3767dda618","1786e2c4-79df-4be7-8551-7a0706d569b1","e73580ef-79cd-49de-90c9-a8b546e5c7ff","9e72ca03-b00d-4ec2-ae36-df07ef0a6ce7"],type:"check-in"},{id:"096030b6-f6ac-4f0e-86e6-5142afe1c226",base_price:4290,date_from:"2025-11-17T21:59:34.880Z",date_to:"2025-11-18T22:59:34.880Z",destination:"1a9492a8-70bc-4f61-90c9-8fc54f55dc04",is_favorite:!0,offers:["b5d342b3-5f40-428e-8dd5-023f7664b083","38d54b95-8551-4319-963d-196915dc94a3","8910272e-3cbc-4fc4-8db0-f661b111202c","9c71202d-2af5-48ac-87af-3f53ff01cb68","c45946f0-73a9-4ee0-a722-ce9df57e1a00","23ed4062-ab5a-40c4-ab36-e5ad08715f6a"],type:"ship"},{id:"b601d779-56ea-4a0d-8ece-8943c45b035f",base_price:1259,date_from:"2025-11-18T22:59:34.880Z",date_to:"2025-11-20T02:59:34.880Z",destination:"086ac21a-2d38-4f3b-8102-596f1a96f982",is_favorite:!1,offers:["d33e2895-1fa1-42d5-b0de-413bfb2877e6","ee0edacc-c9be-4498-a76a-ff47c470b78c","a2ab44c7-469b-48ed-91fd-de5bb80c183f","ef908bf8-dc9b-430e-9bfb-f77ec432af76"],type:"taxi"},{id:"0ee6ed79-1038-4f6a-82b5-05ddcb7393e4",base_price:2735,date_from:"2025-11-20T02:59:34.880Z",date_to:"2025-11-21T09:59:34.880Z",destination:"7f673772-106c-4037-a64f-52aee3dda3d6",is_favorite:!1,offers:["ee0edacc-c9be-4498-a76a-ff47c470b78c","a2ab44c7-469b-48ed-91fd-de5bb80c183f","ef908bf8-dc9b-430e-9bfb-f77ec432af76"],type:"taxi"},{id:"cc360106-c53b-44c8-aeca-102ee4ac2aa0",base_price:7138,date_from:"2025-11-21T09:59:34.880Z",date_to:"2025-11-22T02:59:34.880Z",destination:"1a9492a8-70bc-4f61-90c9-8fc54f55dc04",is_favorite:!0,offers:[],type:"drive"},{id:"f1c6855e-5889-4071-98f8-378fe6160cb6",base_price:7519,date_from:"2025-11-22T02:59:34.880Z",date_to:"2025-11-23T06:59:34.880Z",destination:"086ac21a-2d38-4f3b-8102-596f1a96f982",is_favorite:!0,offers:["257145d8-a63b-4c2c-b355-a98dd6fc0a81","2f3dc7fa-5440-45bc-983e-e97e1262460d"],type:"bus"},{id:"c7bd8823-557c-49de-8218-65ca0a11137c",base_price:8989,date_from:"2025-11-23T06:59:34.880Z",date_to:"2025-11-25T03:59:34.880Z",destination:"6c283327-a8f0-4371-901b-1ba8caf264fa",is_favorite:!0,offers:["f3591a5b-b8de-40d5-bb6a-d8552ed83067","37a31c26-8ecf-4700-92a3-e7503fdc8077"],type:"flight"},{id:"33e5fed6-75bd-417c-8496-4396d6c53f8e",base_price:8923,date_from:"2025-11-25T03:59:34.880Z",date_to:"2025-11-26T18:59:34.880Z",destination:"f3426b6f-2ee7-4d17-9694-62e06d17cacb",is_favorite:!1,offers:[],type:"sightseeing"},{id:"9d48bef1-15e9-4371-a549-d3f01a8c05fa",base_price:6736,date_from:"2025-11-26T18:59:34.880Z",date_to:"2025-11-27T17:59:34.880Z",destination:"6c283327-a8f0-4371-901b-1ba8caf264fa",is_favorite:!1,offers:[],type:"bus"},{id:"1f935217-4de1-44b7-81b1-1e8845fb42bf",base_price:4354,date_from:"2025-11-27T17:59:34.880Z",date_to:"2025-11-29T07:59:34.880Z",destination:"f3426b6f-2ee7-4d17-9694-62e06d17cacb",is_favorite:!0,offers:["37a31c26-8ecf-4700-92a3-e7503fdc8077"],type:"flight"}],k=[{type:"taxi",offers:[{id:"9f3f5590-ed04-41fd-8a12-ac1000d76630",title:"Upgrade to a business class",price:145},{id:"d33e2895-1fa1-42d5-b0de-413bfb2877e6",title:"Choose the radio station",price:52},{id:"ee0edacc-c9be-4498-a76a-ff47c470b78c",title:"Choose temperature",price:33},{id:"a2ab44c7-469b-48ed-91fd-de5bb80c183f",title:"Drive quickly, I'm in a hurry",price:162},{id:"ef908bf8-dc9b-430e-9bfb-f77ec432af76",title:"Drive slowly",price:155}]},{type:"bus",offers:[{id:"c65c4a03-70b1-443f-98ee-3defc003112d",title:"Infotainment system",price:38},{id:"257145d8-a63b-4c2c-b355-a98dd6fc0a81",title:"Order meal",price:100},{id:"2f3dc7fa-5440-45bc-983e-e97e1262460d",title:"Choose seats",price:81}]},{type:"train",offers:[{id:"34842b73-bc0c-4eaa-a6ae-d80fd083ad37",title:"Book a taxi at the arrival point",price:93},{id:"18ab9b1c-0d2a-4ebd-9160-ef01f7e2f9d3",title:"Order a breakfast",price:48},{id:"49fed99d-5608-42a0-9b7b-7c8fcd01809b",title:"Wake up at a certain time",price:65}]},{type:"flight",offers:[{id:"f528adab-4919-41b3-a277-00019eae70b4",title:"Choose meal",price:130},{id:"8035984e-814a-4153-8823-0936021f52a9",title:"Choose seats",price:185},{id:"abad0e8f-c7b4-4e35-a8d5-6a555f67243c",title:"Upgrade to comfort class",price:93},{id:"f638bf0c-9e05-4291-b76a-a65705c25b18",title:"Upgrade to business class",price:76},{id:"f3591a5b-b8de-40d5-bb6a-d8552ed83067",title:"Add luggage",price:147},{id:"37a31c26-8ecf-4700-92a3-e7503fdc8077",title:"Business lounge",price:151}]},{type:"check-in",offers:[{id:"4ab62830-3442-4445-be27-bbc00db90fd2",title:"Choose the time of check-in",price:135},{id:"795610a0-78bd-4968-b577-2c3767dda618",title:"Choose the time of check-out",price:32},{id:"1786e2c4-79df-4be7-8551-7a0706d569b1",title:"Add breakfast",price:176},{id:"e73580ef-79cd-49de-90c9-a8b546e5c7ff",title:"Laundry",price:52},{id:"9e72ca03-b00d-4ec2-ae36-df07ef0a6ce7",title:"Order a meal from the restaurant",price:117}]},{type:"sightseeing",offers:[]},{type:"ship",offers:[{id:"b5d342b3-5f40-428e-8dd5-023f7664b083",title:"Choose meal",price:34},{id:"38d54b95-8551-4319-963d-196915dc94a3",title:"Choose seats",price:55},{id:"8910272e-3cbc-4fc4-8db0-f661b111202c",title:"Upgrade to comfort class",price:111},{id:"9c71202d-2af5-48ac-87af-3f53ff01cb68",title:"Upgrade to business class",price:195},{id:"c45946f0-73a9-4ee0-a722-ce9df57e1a00",title:"Add luggage",price:58},{id:"23ed4062-ab5a-40c4-ab36-e5ad08715f6a",title:"Business lounge",price:121}]},{type:"drive",offers:[{id:"4cd98958-6a06-48e5-9450-3c72e394ed0a",title:"With automatic transmission",price:129},{id:"4cbbd2af-9256-4f1b-a0ed-61cf4e10875f",title:"With air conditioning",price:178}]},{type:"restaurant",offers:[{id:"0910594d-57dd-431a-9b79-1bd37c05ca0f",title:"Choose live music",price:169},{id:"d6036dfc-c8a1-48a5-983c-6a646649ef6e",title:"Choose VIP area",price:122}]}],j=[{id:"6c283327-a8f0-4371-901b-1ba8caf264fa",description:"Vien - with an embankment of a mighty river as a centre of attraction",name:"Vien",pictures:[]},{id:"7f673772-106c-4037-a64f-52aee3dda3d6",description:"Berlin - full of of cozy canteens where you can try the best coffee in the Middle East",name:"Berlin",pictures:[]},{id:"f3426b6f-2ee7-4d17-9694-62e06d17cacb",description:"Milan - for those who value comfort and coziness",name:"Milan",pictures:[{src:"https://20.objects.htmlacademy.pro/static/destinations/16.jpg",description:"Milan full of of cozy canteens where you can try the best coffee in the Middle East"},{src:"https://20.objects.htmlacademy.pro/static/destinations/16.jpg",description:"Milan is a beautiful city"},{src:"https://20.objects.htmlacademy.pro/static/destinations/16.jpg",description:"Milan with an embankment of a mighty river as a centre of attraction"},{src:"https://20.objects.htmlacademy.pro/static/destinations/3.jpg",description:"Milan with a beautiful old town"},{src:"https://20.objects.htmlacademy.pro/static/destinations/13.jpg",description:"Milan for those who value comfort and coziness"}]},{id:"1a9492a8-70bc-4f61-90c9-8fc54f55dc04",description:"Vien - for those who value comfort and coziness",name:"Vien",pictures:[{src:"https://20.objects.htmlacademy.pro/static/destinations/13.jpg",description:"Vien middle-eastern paradise"},{src:"https://20.objects.htmlacademy.pro/static/destinations/16.jpg",description:"Vien with a beautiful old town"}]},{id:"086ac21a-2d38-4f3b-8102-596f1a96f982",description:"Saint Petersburg - famous for its crowded street markets with the best street food in Asia",name:"Saint Petersburg",pictures:[{src:"https://20.objects.htmlacademy.pro/static/destinations/20.jpg",description:"Saint Petersburg with crowded streets"}]}];class L{#d={};#n=[];#i=[];constructor(){this.offers={},k.forEach((e=>{this.offers[e.type]=e.offers})),this.#n=Object.keys(this.offers),this.#i=j,this.#d=A.map((e=>({...e,destinationEntity:this.#i.find((t=>t.id===e.destination)),offersEntity:this.offers[e.type]})))}get tripPoints(){return this.#d}get tripPointTypes(){return this.#n}get tripOffers(){return this.offers}get tripDestinations(){return this.#i}}class H extends ${get template(){return'<p class="trip-events__msg">\n    Click New Event to create your first point\n    </p>'}}const Y={everything:e=>e,future:e=>e.filter((e=>t()(e.date_from).isAfter(t()()))),present:e=>e.filter((e=>t()(e.date_from).isBefore(t()())&&t()(e.date_to).isAfter(t()()))),past:e=>e.filter((e=>t()(e.date_to).isBefore(t()())))},z=document.querySelector(".trip-controls__filters"),U=document.querySelector(".trip-events"),I=new class{#f=null;#l=null;#u=null;#p=[];#h=[];constructor({filtersContainer:e,eventsContainer:t}){this.#f=e,this.#l=t,this.#u=new L}init(){this.#p=[...this.#u.tripPoints],this.#h=[...this.#u.tripDestinations],this.#b()}#v(e){const t=this.#u.tripPointTypes,n=this.#h,a=e=>{"Escape"===e.key&&(e.preventDefault(),c(),document.removeEventListener("keydown",a))},r=new Z({point:e,onEditClick:()=>{s(o,r),document.addEventListener("keydown",a)}}),o=new E({point:e,pointTypes:t,destinations:n,onFormSubmit:()=>{c(),document.removeEventListener("keydown",a)}});function c(){s(r,o)}i(r,this.#l.querySelector(".trip-events__list"))}#b(){const e=this.#l.querySelector(".trip-events__sort-view"),t=function(e){return Object.entries(Y).map((([t,n])=>({type:t,count:n(e).length})))}(this.#p);if(i(new O,e),i(new x({filters:t}),this.#f),this.#p.length<1)i(new H,this.#l.querySelector(".trip-events__list"));else for(let e=0;e<this.#p.length;e++)this.#v(this.#p[e])}}({filtersContainer:z,eventsContainer:U});I.init()})()})();
//# sourceMappingURL=bundle.060414548c69611a3188.js.map