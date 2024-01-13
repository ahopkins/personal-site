import { c as create_ssr_component, a as each, i as add_attribute, e as escape, n as null_to_empty, v as validate_component } from "../../chunks/index.js";
import { F as Footer } from "../../chunks/Footer.js";
import { T as Time } from "../../chunks/Time.js";
const Hero_svelte_svelte_type_style_lang = "";
const css$6 = {
  code: ".adam-avatar.svelte-foloil{position:absolute;right:0;height:100vh;width:60vw;-webkit-filter:invert(100%);filter:invert(100%);opacity:0.2;background-position:right;background-image:url(/images/adam-unified.svg);background-size:cover;background-repeat:no-repeat}@media(max-width: 1120px){.adam-avatar.svelte-foloil{background-position:bottom right}}@media(max-width: 1400px){.adam-avatar.svelte-foloil{background-size:contain}}",
  map: null
};
const Hero = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const social = [
    {
      url: "https://www.twitter.com/admhpkns",
      text: "@admhpkns",
      icon: "devicon-twitter-original"
    },
    {
      url: "https://github.com/ahopkins",
      text: "ahopkins",
      icon: "devicon-github-original"
    },
    {
      url: "https://linkedin.com/in/ahopkins",
      text: "ahopkins",
      icon: "devicon-linkedin-plain"
    }
  ];
  $$result.css.add(css$6);
  return `<section class="hero is-black is-fullheight"><div class="hero-body"><div class=""><h1 class="title is-size-1">Adam Hopkins</h1>
            <p class="subtitle"><i class="devicon-python-plain colored"></i> Python developer.
                <img src="/images/osi.png" style="height: 20px;" alt="Open Source">
                OSS contributor.
                <img src="/images/sanic-framework-logo-circle-32x32.png" style="height: 20px;" alt="Sanic">
                Sanic Maintainer. <br>
                Husband. Father. Son. Brother. <br>
                A proud and happy man.
            </p>
            <div class="social">${each(social, (item) => {
    return `<a${add_attribute("href", item.url, 0)} target="_blank"><i class="${escape(null_to_empty(item.icon), true) + " svelte-foloil"}"></i>
                        ${escape(item.text)}
                    </a>`;
  })}</div></div>
        <div class="adam-avatar svelte-foloil"></div></div>
</section>`;
});
const Section = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  return `<section class="section is-medium"><h2 class="title has-text-white-bis">What I&#39;ve ${escape(title)}</h2>
    ${slots.default ? slots.default({}) : ``}</section>`;
});
const Written = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { articles } = $$props;
  if ($$props.articles === void 0 && $$bindings.articles && articles !== void 0)
    $$bindings.articles(articles);
  return `${validate_component(Section, "Section").$$render($$result, { title: "Written" }, {}, {
    default: () => {
      return `<div class="subtitle">Some blog articles you can find on this site</div>
    <div class="tile is-ancestor"><div class="tile is-parent is-flex-wrap-wrap">${each(articles, (article) => {
        return `<div class="tile is-child is-12 box article-list"><a${add_attribute("href", `/${article.slug}`, 0)} class="content"><h5 class="is-size-4">${escape(article.title)}</h5>
                        <em>${escape(article.description)}</em>
                        <div class="article-info"><div class="date"><i class="las la-calendar"></i>
                                ${validate_component(Time, "Time").$$render(
          $$result,
          {
            timestamp: article.date,
            live: true,
            relative: true,
            format: "YYYY-MM-DD"
          },
          {},
          {}
        )}</div>
                            <div class="tags"><i class="las la-tags"></i>
                                ${each(article.tag, (tag) => {
          return `<span class="tag is-dark">${escape(tag)}</span>`;
        })}</div>
                        </div></a>
                </div>`;
      })}</div></div>`;
    }
  })}`;
});
const RepoCard_svelte_svelte_type_style_lang = "";
const css$5 = {
  code: ".repo-card.svelte-eh4fom.svelte-eh4fom{position:relative;display:block;box-shadow:none;background:#111111;border-radius:6px;padding:1.25em;line-height:1.5;color:var(--svc-text-primary, #586069);min-height:165px}.repo-card.svelte-eh4fom.svelte-eh4fom:hover{text-decoration:none}.repo-card.svelte-eh4fom .repo-title.svelte-eh4fom{color:#eeeeee;font-weight:700}.repo-card.svelte-eh4fom:hover .repo-title.svelte-eh4fom{color:#ff0d68;text-decoration:underline}.repo-info.svelte-eh4fom.svelte-eh4fom{position:absolute;bottom:1.25rem}.repo-info.svelte-eh4fom .language.svelte-eh4fom{display:inline-block;width:1rem;height:1rem;border-radius:100%}",
  map: null
};
const RepoCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { slug } = $$props;
  if ($$props.slug === void 0 && $$bindings.slug && slug !== void 0)
    $$bindings.slug(slug);
  $$result.css.add(css$5);
  return `<a${add_attribute("href", `https://github.com/${slug}`, 0)} class="content repo-card svelte-eh4fom" target="_blank">${``}
</a>`;
});
const Built_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: ".box.svelte-1ocv4w7{background:transparent;box-shadow:none}.repo a{color:#ff0d68 !important}",
  map: null
};
const Built = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const repos = [
    "sanic-org/sanic",
    "sanic-org/sanic-ext",
    "sanic-org/sanic-router",
    "ahopkins/sanic-jwt",
    "ahopkins/mayim",
    "ahopkins/merkava"
  ];
  $$result.css.add(css$4);
  return `${validate_component(Section, "Section").$$render($$result, { title: "Built" }, {}, {
    default: () => {
      return `<div class="subtitle">Some open source projects I maintain</div>
    <div class="tile is-ancestor"><div class="tile is-parent is-flex-wrap-wrap">${each(repos, (slug) => {
        return `<div class="tile is-child is-6 box svelte-1ocv4w7">${validate_component(RepoCard, "RepoCard").$$render($$result, { slug }, {}, {})}
                </div>`;
      })}</div></div>`;
    }
  })}`;
});
const Said_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: ".box.svelte-mbc480{background:transparent;box-shadow:none}",
  map: null
};
const Said = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const repos = [
    "ahopkins/europython2020-overcoming-access-control",
    "ahopkins/pywebconf2021-making-sanic-even-faster",
    "ahopkins/pyconil2021-liberate-your-api",
    "ahopkins/pygeekle2022-mayim-byoq",
    "ahopkins/pyconil-2023"
  ];
  $$result.css.add(css$3);
  return `${validate_component(Section, "Section").$$render($$result, { title: "Said" }, {}, {
    default: () => {
      return `<div class="subtitle">Some presentations I&#39;ve given at tech conferences
    </div>
    
    <div class="tile is-ancestor"><div class="tile is-parent is-flex-wrap-wrap">${each(repos, (slug) => {
        return `<div class="tile is-child is-6 box svelte-mbc480">${validate_component(RepoCard, "RepoCard").$$render($$result, { slug }, {}, {})}
                </div>`;
      })}</div></div>
    
    <div><h3 class="is-size-3">Closing Keynote PyCon IL 2023</h3>
	<iframe width="816" height="459" src="https://www.youtube.com/embed/zDGwC2shsgs?si=LgjU1DyPbyeTR0Tc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`;
    }
  })}`;
});
const Done_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".content.svelte-ckjdv8 .current.svelte-ckjdv8{float:right}.box.svelte-ckjdv8.svelte-ckjdv8{background:transparent;box-shadow:none}.content.svelte-ckjdv8.svelte-ckjdv8{display:block;box-shadow:none;background:#111111;border-radius:6px;padding:1.25em;line-height:1.5;color:var(--svc-text-primary, #586069)}.content.svelte-ckjdv8 strong.svelte-ckjdv8{display:block}",
  map: null
};
const Done = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const work = [
    {
      title: "Vice President of Software Engineering",
      company: "PacketFabric",
      current: true
    },
    {
      title: "Full Stack, Principal Engineer",
      company: "Matrix Retail"
    },
    { title: "CTO/CLO", company: "Optymizer" },
    { title: "Principal", company: "AHopLaw" },
    {
      title: "Associate Attorney",
      company: "Looney & Grossman"
    },
    {
      title: "Associate Attorney",
      company: "Donovan | Hatem"
    }
  ];
  const classes = (full = false) => {
    const classes2 = ["tile", "is-child", "box"];
    if (full) {
      classes2.push("is-12");
    } else {
      classes2.push("is-6");
    }
    return classes2.join(" ");
  };
  $$result.css.add(css$2);
  return `${validate_component(Section, "Section").$$render($$result, { title: "Done" }, {}, {
    default: () => {
      return `<div class="subtitle">Some roles I&#39;ve had in the past</div>
    <div class="tile is-ancestor"><div class="tile is-parent is-flex-wrap-wrap">${each(work, (position) => {
        return `<div class="${escape(null_to_empty(classes(position.current)), true) + " svelte-ckjdv8"}"><div class="content svelte-ckjdv8">${position.current ? `<div class="current svelte-ckjdv8">Current 🌟</div>` : ``}
                        <strong class="svelte-ckjdv8">${escape(position.title)}</strong>
                        ${escape(position.company)}</div>
                </div>`;
      })}</div></div>`;
    }
  })}`;
});
const Content_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".is-divider.svelte-bgtuwg{border-color:#111;max-width:80%;margin:auto}.is-divider[data-content].svelte-bgtuwg::after{background:#242424 !important;color:#444 !important;font-size:3rem;line-height:3rem;padding:0.5rem 2rem;transform:translateY(-2rem)}",
  map: null
};
const Content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { articles } = $$props;
  if ($$props.articles === void 0 && $$bindings.articles && articles !== void 0)
    $$bindings.articles(articles);
  $$result.css.add(css$1);
  return `<div class="has-background-black-ter has-text-white-ter">${validate_component(Written, "Written").$$render($$result, { articles }, {}, {})}
    <div class="is-divider svelte-bgtuwg" data-content="§"></div>
    ${validate_component(Built, "Built").$$render($$result, {}, {}, {})}
    <div class="is-divider svelte-bgtuwg" data-content="§"></div>
    ${validate_component(Said, "Said").$$render($$result, {}, {}, {})}
    <div class="is-divider svelte-bgtuwg" data-content="§"></div>
    ${validate_component(Done, "Done").$$render($$result, {}, {}, {})}
</div>`;
});
const Book_svelte_svelte_type_style_lang = "";
const css = {
  code: ".section.svelte-xfle3w.svelte-xfle3w{background-color:#ff0d68;color:#000000;position:relative;transform:translateY(-100%)}.section.svelte-xfle3w a.svelte-xfle3w{color:#000000;font-weight:700;text-decoration:underline}.section.svelte-xfle3w a.svelte-xfle3w:hover{color:#111111}@media(max-width: 800px){.section.svelte-xfle3w.svelte-xfle3w{transform:translateY(-100vh);padding:0.25rem !important}.is-size-2.svelte-xfle3w.svelte-xfle3w{font-size:1.25rem !important}}",
  map: null
};
const Book = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<section class="section svelte-xfle3w"><div class="containter"><div class="content is-size-2 svelte-xfle3w">My book
            <a href="https://sanicbook.com" class="svelte-xfle3w">Python Web Development with Sanic
            </a>
            now available
        </div></div>
</section>`;
});
const Home = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<pre class="language-python"><!-- HTML_TAG_START -->${`<code class="language-python"><span class="token keyword">class</span> <span class="token class-name">Adam</span><span class="token punctuation">:</span>
    work <span class="token operator">=</span> PacketFabric<span class="token punctuation">(</span><span class="token string">"Vice President of Software Engineering"</span><span class="token punctuation">)</span>
    oss <span class="token operator">=</span> Sanic<span class="token punctuation">(</span><span class="token string">"Core Maintainer"</span><span class="token punctuation">)</span>
    home <span class="token operator">=</span> Israel<span class="token punctuation">(</span><span class="token string">"Negev"</span><span class="token punctuation">)</span>

    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">run</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> inputs<span class="token punctuation">:</span> Union<span class="token punctuation">[</span>Pretzels<span class="token punctuation">,</span> Coffee<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
            <span class="token keyword">await</span> self<span class="token punctuation">.</span>work<span class="token punctuation">.</span>do<span class="token punctuation">(</span>inputs<span class="token punctuation">)</span>
            <span class="token keyword">await</span> self<span class="token punctuation">.</span>oss<span class="token punctuation">.</span>do<span class="token punctuation">(</span>inputs<span class="token punctuation">)</span>
        
    <span class="token keyword">def</span> <span class="token function">sleep</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">raise</span> NotImplementedError</code>`}<!-- HTML_TAG_END --></pre>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<main>${validate_component(Hero, "Hero").$$render($$result, {}, {}, {})}
	${validate_component(Book, "Book").$$render($$result, {}, {}, {})}
	<div class="container is-max-desktop mb-8"><div class="mb-8">${validate_component(Home, "Home").$$render($$result, {}, {}, {})}</div>
		${validate_component(Content, "Content").$$render($$result, { articles: data.articles }, {}, {})}</div>
	${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</main>`;
});
export {
  Page as default
};
