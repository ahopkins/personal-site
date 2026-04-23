import { c as create_ssr_component, e as escape } from "./index.js";
const index = "";
const prismOkaidia = "";
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const year = new Date().getFullYear();
  return `<footer class="${"footer has-background-black"}"><div class="${"content has-text-centered"}"><p>The source code is licensed
            <a href="${"http://opensource.org/licenses/mit-license.php"}">MIT</a>.
            The website content is \xA9 ${escape(year)} by Adam Hopkins.
        </p></div></footer>`;
});
export {
  Footer as F
};
