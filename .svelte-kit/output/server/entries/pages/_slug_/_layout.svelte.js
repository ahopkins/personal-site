import { c as create_ssr_component, v as validate_component } from "../../../chunks/index.js";
import { F as Footer } from "../../../chunks/Footer.js";
const prismOkaidia = "";
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: ".navbar-menu.svelte-16903xz.svelte-16903xz,.navbar.svelte-16903xz.svelte-16903xz{background-color:#111111}.navbar-item.has-dropdown.svelte-16903xz:focus .navbar-link.svelte-16903xz,.navbar-item.has-dropdown.svelte-16903xz:hover .navbar-link.svelte-16903xz,.navbar-dropdown.svelte-16903xz.svelte-16903xz,.navbar-item.has-dropdown.svelte-16903xz.svelte-16903xz:hover,.navbar-link.svelte-16903xz.svelte-16903xz:hover,a.navbar-item.svelte-16903xz.svelte-16903xz:hover{background-color:#111111 !important;color:#a0a0a0 !important;border-top-color:#111111}.navbar-link.svelte-16903xz.svelte-16903xz::after{border-color:#a0a0a0}.navbar-dropdown >  .navbar-item{align-items:flex-start;display:flex;flex-direction:column}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<nav class="${"navbar svelte-16903xz"}" aria-label="${"main navigation"}"><div class="${"navbar-brand"}"><a class="${"navbar-item svelte-16903xz"}" href="${"/"}"><img src="${"/images/adam.svg"}" alt="${"Adam Hopkins"}"></a>

        <a href="${"/"}" role="${"button"}" class="${"navbar-burger"}" aria-label="${"menu"}" aria-expanded="${"false"}" data-target="${"navbarBasicExample"}"><span aria-hidden="${"true"}"></span>
            <span aria-hidden="${"true"}"></span>
            <span aria-hidden="${"true"}"></span></a></div>

    <div id="${"article-navbar"}" class="${["navbar-menu is-dark svelte-16903xz", ""].join(" ").trim()}"><div class="${"navbar-start"}"><a class="${"navbar-item svelte-16903xz"}" href="${"/"}"><i class="${"las la-home"}"></i>
                Home
            </a>

            <a class="${"navbar-item svelte-16903xz"}" href="${"https://sanicbook.com"}" target="${"_blank"}"><i class="${"las la-book-open"}"></i>
                Sanic Book
            </a>

            <div class="${"navbar-item has-dropdown is-hoverable svelte-16903xz"}"><span class="${"navbar-link svelte-16903xz"}" id="${"article-menu-title"}"></span>
                <div class="${"navbar-dropdown svelte-16903xz"}" id="${"article-menu-content"}"></div></div></div>

        <div class="${"navbar-end"}"><a class="${"navbar-item svelte-16903xz"}" href="${"https://github.com/ahopkins/personal-site"}"><i class="${"lab la-github"}"></i></a></div></div></nav>
<main>${slots.default ? slots.default({}) : ``}</main>


${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}`;
});
export {
  Layout as default
};
