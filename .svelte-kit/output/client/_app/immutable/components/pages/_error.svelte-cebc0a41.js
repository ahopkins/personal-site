import{S as p,i as d,s as m,d as b,e as _,f,h,j as c,k as g,l as $,m as v,n as E,o as l,p as S,q as u,r as q}from"../../chunks/index-5bfc61a1.js";import{s as x}from"../../chunks/singletons-133885c5.js";const y=()=>{const e=x;return{page:{subscribe:e.page.subscribe},navigating:{subscribe:e.navigating.subscribe},updated:e.updated}},j={subscribe(e){return y().page.subscribe(e)}};function k(e){let a,r,s,n;return document.title=a=e[0],{c(){r=b(),s=_("h1"),n=f(e[0])},l(t){h("svelte-1uo06u1",document.head).forEach(c),r=g(t),s=$(t,"H1",{});var i=v(s);n=E(i,e[0]),i.forEach(c)},m(t,o){l(t,r,o),l(t,s,o),S(s,n)},p(t,[o]){o&1&&a!==(a=t[0])&&(document.title=a)},i:u,o:u,d(t){t&&c(r),t&&c(s)}}}function C(e,a,r){let s;q(e,j,i=>r(1,s=i));const{status:n,error:{message:t}}=s;return[`${n}: ${t}`]}let z=class extends p{constructor(a){super(),d(this,a,C,k,m,{})}};export{z as default};