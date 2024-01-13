async function load() {
  const mdModules = /* @__PURE__ */ Object.assign({ "../content/background-job-worker.md": () => import("../../chunks/background-job-worker.js") });
  const articles = await Promise.all(
    Object.keys(mdModules).map(async (path) => {
      console.log(path);
      const slug = path.split("/").at(-1)?.split(".").at(0);
      const { metadata: { title, description, tag, date } } = await mdModules[path]();
      return { title, slug, description, tag, date };
    })
  );
  return { articles };
}
export {
  load
};
