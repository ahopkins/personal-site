import{_ as i}from"./preload-helper-aa6bc0ce.js";async function c(){const e=Object.assign({"../content/background-job-worker.md":()=>i(()=>import("./background-job-worker-5cd2c1d1.js"),["background-job-worker-5cd2c1d1.js","../assets/background-job-worker-b0c81d22.css","index-93917c68.js"],import.meta.url)});return{articles:await Promise.all(Object.keys(e).map(async t=>{var o;console.log(t);const a=(o=t.split("/").at(-1))==null?void 0:o.split(".").at(0),{metadata:{title:r,description:s,tag:l,date:n}}=await e[t]();return{title:r,slug:a,description:s,tag:l,date:n}}))}}const m=Object.freeze(Object.defineProperty({__proto__:null,load:c},Symbol.toStringTag,{value:"Module"}));export{m as _,c as l};
