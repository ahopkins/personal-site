import{_ as i}from"./preload-helper-41c905a7.js";async function c(){const e=Object.assign({"../content/background-job-worker.md":()=>i(()=>import("./background-job-worker-26a9bcb1.js").then(t=>t.aG),["./background-job-worker-26a9bcb1.js","./index-5bfc61a1.js","./dayjs.min-5d37bafc.js","./preload-helper-41c905a7.js","../assets/background-job-worker-b0c81d22.css"],import.meta.url)});return{articles:await Promise.all(Object.keys(e).map(async t=>{var o;console.log(t);const a=(o=t.split("/").at(-1))==null?void 0:o.split(".").at(0),{metadata:{title:r,description:s,tag:n,date:l}}=await e[t]();return{title:r,slug:a,description:s,tag:n,date:l}}))}}const m=Object.freeze(Object.defineProperty({__proto__:null,load:c},Symbol.toStringTag,{value:"Module"}));export{m as _,c as l};
