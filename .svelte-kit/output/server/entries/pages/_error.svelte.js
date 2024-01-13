import { g as getContext, c as create_ssr_component, s as subscribe, e as escape } from "../../chunks/index.js";
const getStores = () => {
  const stores = getContext("__svelte__");
  return {
    page: {
      subscribe: stores.page.subscribe
    },
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    updated: stores.updated
  };
};
const page = {
  /** @param {(value: any) => void} fn */
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
const Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const { status, error: { message } } = $page;
  const title = `${status}: ${message}`;
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-1uo06u1_START -->${$$result.title = `<title>${escape(title)}</title>`, ""}<!-- HEAD_svelte-1uo06u1_END -->`, ""}
<h1>${escape(title)}</h1>`;
});
export {
  Error$1 as default
};
