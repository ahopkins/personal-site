const __variableDynamicImportRuntimeHelper = (glob, path) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, new Error("Unknown variable dynamic import: " + path)));
  });
};
async function load({ params }) {
  const { slug } = params;
  const postPromise = __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../../content/background-job-worker.md": () => import("../../../chunks/background-job-worker.js") }), `../../content/${slug}.md`);
  const [postResult] = await Promise.all([postPromise]);
  const { default: body, metadata } = postResult;
  return {
    meta: { ...metadata },
    body
  };
}
export {
  load
};
