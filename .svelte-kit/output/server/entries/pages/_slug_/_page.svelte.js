import { c as create_ssr_component, e as escape, v as validate_component, a as each, m as missing_component } from "../../../chunks/index.js";
import "reading-time-estimator";
import { T as Time } from "../../../chunks/Time.js";
const Giscus = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id = void 0 } = $$props;
  let { host = "https://giscus.app" } = $$props;
  let { repo } = $$props;
  let { repoId } = $$props;
  let { category = void 0 } = $$props;
  let { categoryId = void 0 } = $$props;
  let { mapping = "pathname" } = $$props;
  let { term = void 0 } = $$props;
  let { strict = "0" } = $$props;
  let { reactionsEnabled = "1" } = $$props;
  let { emitMetadata = "0" } = $$props;
  let { inputPosition = "bottom" } = $$props;
  let { theme = "light" } = $$props;
  let { lang = "en" } = $$props;
  let { loading = "eager" } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.host === void 0 && $$bindings.host && host !== void 0)
    $$bindings.host(host);
  if ($$props.repo === void 0 && $$bindings.repo && repo !== void 0)
    $$bindings.repo(repo);
  if ($$props.repoId === void 0 && $$bindings.repoId && repoId !== void 0)
    $$bindings.repoId(repoId);
  if ($$props.category === void 0 && $$bindings.category && category !== void 0)
    $$bindings.category(category);
  if ($$props.categoryId === void 0 && $$bindings.categoryId && categoryId !== void 0)
    $$bindings.categoryId(categoryId);
  if ($$props.mapping === void 0 && $$bindings.mapping && mapping !== void 0)
    $$bindings.mapping(mapping);
  if ($$props.term === void 0 && $$bindings.term && term !== void 0)
    $$bindings.term(term);
  if ($$props.strict === void 0 && $$bindings.strict && strict !== void 0)
    $$bindings.strict(strict);
  if ($$props.reactionsEnabled === void 0 && $$bindings.reactionsEnabled && reactionsEnabled !== void 0)
    $$bindings.reactionsEnabled(reactionsEnabled);
  if ($$props.emitMetadata === void 0 && $$bindings.emitMetadata && emitMetadata !== void 0)
    $$bindings.emitMetadata(emitMetadata);
  if ($$props.inputPosition === void 0 && $$bindings.inputPosition && inputPosition !== void 0)
    $$bindings.inputPosition(inputPosition);
  if ($$props.theme === void 0 && $$bindings.theme && theme !== void 0)
    $$bindings.theme(theme);
  if ($$props.lang === void 0 && $$bindings.lang && lang !== void 0)
    $$bindings.lang(lang);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0)
    $$bindings.loading(loading);
  return `${``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const { meta, body } = data;
  let timeToRead = "";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<article><div class="article-container container is-max-desktop"><h1 class="title is-size-1">${escape(meta.title)}</h1>
        <div class="subtitle">${escape(meta.description)}</div>

        <div class="article-info"><div class="date"><i class="las la-calendar"></i>
                ${validate_component(Time, "Time").$$render(
    $$result,
    {
      timestamp: meta.date,
      live: true,
      relative: true,
      format: "YYYY-MM-DD"
    },
    {},
    {}
  )}</div>
            <div class="tags"><i class="las la-tags"></i>
                ${each(meta.tag, (tag) => {
    return `<span class="tag is-dark">${escape(tag)}</span>`;
  })}</div>
            <div class="read-time"><i class="las la-hourglass"></i>
                ${escape(timeToRead)}</div></div>
        <div class="content">${validate_component(body || missing_component, "svelte:component").$$render($$result, {}, {}, {})}</div>

        ${validate_component(Giscus, "Giscus").$$render(
    $$result,
    {
      repo: "ahopkins/personal-site",
      repoId: "MDEwOlJlcG9zaXRvcnkxMDcxODQzMDY=",
      category: "Comments",
      categoryId: "DIC_kwDOBmOAss4CR1uV",
      mapping: "title",
      strict: "0",
      reactionsEnabled: "1",
      emitMetadata: "0",
      inputPosition: "bottom",
      lang: "en",
      theme: "dark"
    },
    {},
    {}
  )}</div></article>

${$$result.head += `<!-- HEAD_svelte-1cy2aey_START -->${$$result.title = `<title>
        ${escape(meta.title)}
    </title>`, ""}<!-- HEAD_svelte-1cy2aey_END -->`, ""}`;
});
export {
  Page as default
};
