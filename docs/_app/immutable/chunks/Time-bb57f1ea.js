import{S as it,i as st,s as at,P as G,k as ot,q as ut,l as ft,m as dt,r as ct,h as R,Q as K,b as ht,G as lt,u as mt,R as yt,A as X,T as tt,o as pt,U as Mt}from"./index-93917c68.js";function gt(M){var m;M.preventDefault();const f=M.target.getAttribute("data-copy-target"),o=document.querySelector(`pre[data-copy-id=${f}]`);navigator.clipboard.writeText(o==null?void 0:o.textContent);const y=(m=M.target)==null?void 0:m.innerText;M.target.innerText="Copied",setTimeout(()=>{M.target.innerText=y},2e3)}function Tt(){document.querySelectorAll("pre").forEach((f,o)=>{const y=document.createElement("div"),m=document.createElement("button");y.className="pre-wrapper",f.setAttribute("data-copy-id",`copy-${o}`),m.className="copy-snippet",m.innerText="Copy",m.setAttribute("data-copy-target",`copy-${o}`),m.addEventListener("click",gt),f.replaceWith(y),y.appendChild(f),y.appendChild(m)})}var et=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},nt={exports:{}};(function(M,f){(function(o,y){M.exports=y()})(et,function(){var o=1e3,y=6e4,m=36e5,d="millisecond",l="second",b="minute",_="hour",u="day",$="week",v="month",A="quarter",p="year",Y="date",N="Invalid Date",U=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,j=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,q={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},F=function(a,n,t){var r=String(a);return!r||r.length>=n?a:""+Array(n+1-r.length).join(t)+a},W={s:F,z:function(a){var n=-a.utcOffset(),t=Math.abs(n),r=Math.floor(t/60),e=t%60;return(n<=0?"+":"-")+F(r,2,"0")+":"+F(e,2,"0")},m:function a(n,t){if(n.date()<t.date())return-a(t,n);var r=12*(t.year()-n.year())+(t.month()-n.month()),e=n.clone().add(r,v),s=t-e<0,i=n.clone().add(r+(s?-1:1),v);return+(-(r+(t-e)/(s?e-i:i-e))||0)},a:function(a){return a<0?Math.ceil(a)||0:Math.floor(a)},p:function(a){return{M:v,y:p,w:$,d:u,D:Y,h:_,m:b,s:l,ms:d,Q:A}[a]||String(a||"").toLowerCase().replace(/s$/,"")},u:function(a){return a===void 0}},w="en",O={};O[w]=q;var k=function(a){return a instanceof z},H=function a(n,t,r){var e;if(!n)return w;if(typeof n=="string"){var s=n.toLowerCase();O[s]&&(e=s),t&&(O[s]=t,e=s);var i=n.split("-");if(!e&&i.length>1)return a(i[0])}else{var c=n.name;O[c]=n,e=c}return!r&&e&&(w=e),e||!r&&w},S=function(a,n){if(k(a))return a.clone();var t=typeof n=="object"?n:{};return t.date=a,t.args=arguments,new z(t)},h=W;h.l=H,h.i=k,h.w=function(a,n){return S(a,{locale:n.$L,utc:n.$u,x:n.$x,$offset:n.$offset})};var z=function(){function a(t){this.$L=H(t.locale,null,!0),this.parse(t)}var n=a.prototype;return n.parse=function(t){this.$d=function(r){var e=r.date,s=r.utc;if(e===null)return new Date(NaN);if(h.u(e))return new Date;if(e instanceof Date)return new Date(e);if(typeof e=="string"&&!/Z$/i.test(e)){var i=e.match(U);if(i){var c=i[2]-1||0,D=(i[7]||"0").substring(0,3);return s?new Date(Date.UTC(i[1],c,i[3]||1,i[4]||0,i[5]||0,i[6]||0,D)):new Date(i[1],c,i[3]||1,i[4]||0,i[5]||0,i[6]||0,D)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},n.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},n.$utils=function(){return h},n.isValid=function(){return this.$d.toString()!==N},n.isSame=function(t,r){var e=S(t);return this.startOf(r)<=e&&e<=this.endOf(r)},n.isAfter=function(t,r){return S(t)<this.startOf(r)},n.isBefore=function(t,r){return this.endOf(r)<S(t)},n.$g=function(t,r,e){return h.u(t)?this[r]:this.set(e,t)},n.unix=function(){return Math.floor(this.valueOf()/1e3)},n.valueOf=function(){return this.$d.getTime()},n.startOf=function(t,r){var e=this,s=!!h.u(r)||r,i=h.p(t),c=function(E,x){var I=h.w(e.$u?Date.UTC(e.$y,x,E):new Date(e.$y,x,E),e);return s?I:I.endOf(u)},D=function(E,x){return h.w(e.toDate()[E].apply(e.toDate("s"),(s?[0,0,0,0]:[23,59,59,999]).slice(x)),e)},g=this.$W,T=this.$M,L=this.$D,C="set"+(this.$u?"UTC":"");switch(i){case p:return s?c(1,0):c(31,11);case v:return s?c(1,T):c(0,T+1);case $:var J=this.$locale().weekStart||0,V=(g<J?g+7:g)-J;return c(s?L-V:L+(6-V),T);case u:case Y:return D(C+"Hours",0);case _:return D(C+"Minutes",1);case b:return D(C+"Seconds",2);case l:return D(C+"Milliseconds",3);default:return this.clone()}},n.endOf=function(t){return this.startOf(t,!1)},n.$set=function(t,r){var e,s=h.p(t),i="set"+(this.$u?"UTC":""),c=(e={},e[u]=i+"Date",e[Y]=i+"Date",e[v]=i+"Month",e[p]=i+"FullYear",e[_]=i+"Hours",e[b]=i+"Minutes",e[l]=i+"Seconds",e[d]=i+"Milliseconds",e)[s],D=s===u?this.$D+(r-this.$W):r;if(s===v||s===p){var g=this.clone().set(Y,1);g.$d[c](D),g.init(),this.$d=g.set(Y,Math.min(this.$D,g.daysInMonth())).$d}else c&&this.$d[c](D);return this.init(),this},n.set=function(t,r){return this.clone().$set(t,r)},n.get=function(t){return this[h.p(t)]()},n.add=function(t,r){var e,s=this;t=Number(t);var i=h.p(r),c=function(T){var L=S(s);return h.w(L.date(L.date()+Math.round(T*t)),s)};if(i===v)return this.set(v,this.$M+t);if(i===p)return this.set(p,this.$y+t);if(i===u)return c(1);if(i===$)return c(7);var D=(e={},e[b]=y,e[_]=m,e[l]=o,e)[i]||1,g=this.$d.getTime()+t*D;return h.w(g,this)},n.subtract=function(t,r){return this.add(-1*t,r)},n.format=function(t){var r=this,e=this.$locale();if(!this.isValid())return e.invalidDate||N;var s=t||"YYYY-MM-DDTHH:mm:ssZ",i=h.z(this),c=this.$H,D=this.$m,g=this.$M,T=e.weekdays,L=e.months,C=function(x,I,P,B){return x&&(x[I]||x(r,s))||P[I].slice(0,B)},J=function(x){return h.s(c%12||12,x,"0")},V=e.meridiem||function(x,I,P){var B=x<12?"AM":"PM";return P?B.toLowerCase():B},E={YY:String(this.$y).slice(-2),YYYY:this.$y,M:g+1,MM:h.s(g+1,2,"0"),MMM:C(e.monthsShort,g,L,3),MMMM:C(L,g),D:this.$D,DD:h.s(this.$D,2,"0"),d:String(this.$W),dd:C(e.weekdaysMin,this.$W,T,2),ddd:C(e.weekdaysShort,this.$W,T,3),dddd:T[this.$W],H:String(c),HH:h.s(c,2,"0"),h:J(1),hh:J(2),a:V(c,D,!0),A:V(c,D,!1),m:String(D),mm:h.s(D,2,"0"),s:String(this.$s),ss:h.s(this.$s,2,"0"),SSS:h.s(this.$ms,3,"0"),Z:i};return s.replace(j,function(x,I){return I||E[x]||i.replace(":","")})},n.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},n.diff=function(t,r,e){var s,i=h.p(r),c=S(t),D=(c.utcOffset()-this.utcOffset())*y,g=this-c,T=h.m(this,c);return T=(s={},s[p]=T/12,s[v]=T,s[A]=T/3,s[$]=(g-D)/6048e5,s[u]=(g-D)/864e5,s[_]=g/m,s[b]=g/y,s[l]=g/o,s)[i]||g,e?T:h.a(T)},n.daysInMonth=function(){return this.endOf(v).$D},n.$locale=function(){return O[this.$L]},n.locale=function(t,r){if(!t)return this.$L;var e=this.clone(),s=H(t,r,!0);return s&&(e.$L=s),e},n.clone=function(){return h.w(this.$d,this)},n.toDate=function(){return new Date(this.valueOf())},n.toJSON=function(){return this.isValid()?this.toISOString():null},n.toISOString=function(){return this.$d.toISOString()},n.toString=function(){return this.$d.toUTCString()},a}(),Q=z.prototype;return S.prototype=Q,[["$ms",d],["$s",l],["$m",b],["$H",_],["$W",u],["$M",v],["$y",p],["$D",Y]].forEach(function(a){Q[a[1]]=function(n){return this.$g(n,a[0],a[1])}}),S.extend=function(a,n){return a.$i||(a(n,z,S),a.$i=!0),S},S.locale=H,S.isDayjs=k,S.unix=function(a){return S(1e3*a)},S.en=O[w],S.Ls=O,S.p={},S})})(nt);const Z=nt.exports;var rt={exports:{}};(function(M,f){(function(o,y){M.exports=y()})(et,function(){return function(o,y,m){o=o||{};var d=y.prototype,l={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function b(u,$,v,A){return d.fromToBase(u,$,v,A)}m.en.relativeTime=l,d.fromToBase=function(u,$,v,A,p){for(var Y,N,U,j=v.$locale().relativeTime||l,q=o.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],F=q.length,W=0;W<F;W+=1){var w=q[W];w.d&&(Y=A?m(u).diff(v,w.d,!0):v.diff(u,w.d,!0));var O=(o.rounding||Math.round)(Math.abs(Y));if(U=Y>0,O<=w.r||!w.r){O<=1&&W>0&&(w=q[W-1]);var k=j[w.l];p&&(O=p(""+O)),N=typeof k=="string"?k.replace("%d",O):k(O,$,w.l,U);break}}if($)return N;var H=U?j.future:j.past;return typeof H=="function"?H(N):H.replace("%s",N)},d.to=function(u,$){return b(u,$,this,!0)},d.from=function(u,$){return b(u,$,this)};var _=function(u){return u.$u?m.utc():m()};d.toNow=function(u){return this.to(_(this),u)},d.fromNow=function(u){return this.from(_(this),u)}}})})(rt);const vt=rt.exports;Z.extend(vt);function Dt(M){let f,o,y=[M[3],{title:M[2]},{datetime:M[1]}],m={};for(let d=0;d<y.length;d+=1)m=G(m,y[d]);return{c(){f=ot("time"),o=ut(M[0]),this.h()},l(d){f=ft(d,"TIME",{title:!0,datetime:!0});var l=dt(f);o=ct(l,M[0]),l.forEach(R),this.h()},h(){K(f,m)},m(d,l){ht(d,f,l),lt(f,o)},p(d,[l]){l&1&&mt(o,d[0]),K(f,m=yt(y,[l&8&&d[3],l&4&&{title:d[2]},l&2&&{datetime:d[1]}]))},i:X,o:X,d(d){d&&R(f)}}}function $t(M,f,o){let y;const m=["timestamp","format","relative","live","formatted"];let d=tt(f,m),{timestamp:l=new Date().toISOString()}=f,{format:b="MMM DD, YYYY"}=f,{relative:_=!1}=f,{live:u=!1}=f,{formatted:$=""}=f,v;const A=60*1e3;return pt(()=>(_&&u!==!1&&(v=setInterval(()=>{o(0,$=Z(l).from())},Math.abs(typeof u=="number"?u:A))),()=>{typeof v=="number"&&clearInterval(v)})),M.$$set=p=>{f=G(G({},f),Mt(p)),o(3,d=tt(f,m)),"timestamp"in p&&o(1,l=p.timestamp),"format"in p&&o(4,b=p.format),"relative"in p&&o(5,_=p.relative),"live"in p&&o(6,u=p.live),"formatted"in p&&o(0,$=p.formatted)},M.$$.update=()=>{M.$$.dirty&50&&o(0,$=_?Z(l).from():Z(l).format(b)),M.$$.dirty&50&&o(2,y=_?Z(l).format(b):void 0)},[$,l,y,d,b,_,u]}class _t extends it{constructor(f){super(),st(this,f,$t,Dt,at,{timestamp:1,format:4,relative:5,live:6,formatted:0})}}export{_t as T,Tt as a};
