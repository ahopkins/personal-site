import { c as create_ssr_component, d as each, f as add_attribute, e as escape, h as null_to_empty, v as validate_component } from "../../chunks/index.js";
import { F as Footer } from "../../chunks/Footer.js";
const Hero_svelte_svelte_type_style_lang = "";
const css$7 = {
  code: ".social.svelte-1cc7oe9 .glyph.svelte-1cc7oe9{display:inline-block;font-weight:700;font-size:1.05em;margin-right:0.15em;vertical-align:-0.05em}.adam-avatar.svelte-1cc7oe9.svelte-1cc7oe9{position:absolute;right:0;height:100vh;width:60vw;-webkit-filter:invert(100%);filter:invert(100%);opacity:0.2;background-position:right;background-image:url(/images/adam-unified.svg);background-size:cover;background-repeat:no-repeat}@media(max-width: 1120px){.adam-avatar.svelte-1cc7oe9.svelte-1cc7oe9{background-position:bottom right}}@media(max-width: 1400px){.adam-avatar.svelte-1cc7oe9.svelte-1cc7oe9{background-size:contain}}",
  map: null
};
const Hero = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const social = [
    {
      url: "https://x.com/admhpkns",
      text: "@admhpkns",
      glyph: "\u{1D54F}"
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
  $$result.css.add(css$7);
  return `<section class="${"hero is-black is-fullheight"}"><div class="${"hero-body"}"><div class="${""}"><h1 class="${"title is-size-1"}">Adam Hopkins</h1>
            <p class="${"subtitle"}">Founder &amp; CTO. AI-native platforms. <br>
                <i class="${"devicon-python-plain colored"}"></i> Python developer.
                <img src="${"/images/osi.png"}" style="${"height: 20px;"}" alt="${"Open Source"}">
                OSS contributor.
                <img src="${"/images/sanic-framework-logo-circle-32x32.png"}" style="${"height: 20px;"}" alt="${"Sanic"}">
                Sanic Core Maintainer. <br>
                Husband. Father. Son. Brother. <br>
                A proud and happy man.
            </p>
            <div class="${"social svelte-1cc7oe9"}">${each(social, (item) => {
    return `<a${add_attribute("href", item.url, 0)} target="${"_blank"}">${item.glyph ? `<span class="${"glyph svelte-1cc7oe9"}">${escape(item.glyph)}</span>` : `<i class="${escape(null_to_empty(item.icon), true) + " svelte-1cc7oe9"}"></i>`}
                        ${escape(item.text)}
                    </a>`;
  })}</div></div>
        <div class="${"adam-avatar svelte-1cc7oe9"}"></div></div>
</section>`;
});
const Section = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  return `<section class="${"section is-medium"}"><h2 class="${"title has-text-white-bis"}">What I&#39;ve ${escape(title)}</h2>
    ${slots.default ? slots.default({}) : ``}</section>`;
});
const Done_svelte_svelte_type_style_lang = "";
const css$6 = {
  code: ".content.svelte-1kvm4yt .current.svelte-1kvm4yt{float:right}.box.svelte-1kvm4yt.svelte-1kvm4yt{background:transparent;box-shadow:none}.content.svelte-1kvm4yt.svelte-1kvm4yt{display:block;box-shadow:none;background:#111111;border-radius:6px;padding:1.25em;line-height:1.5;color:var(--svc-text-primary, #586069)}.content.svelte-1kvm4yt strong.svelte-1kvm4yt{display:block}.content.svelte-1kvm4yt .tagline.svelte-1kvm4yt{font-size:0.95rem;color:#a0a0a0;margin-top:0.35rem;font-style:italic}.content.svelte-1kvm4yt .years.svelte-1kvm4yt{font-size:0.8rem;color:#666;margin-top:0.4rem;letter-spacing:0.03em}",
  map: null
};
const Done = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const work = [
    {
      title: "Co-Founder & CTO",
      company: "HyperFi",
      years: "2025\u2013present",
      tagline: "AI-native infrastructure orchestration",
      current: true
    },
    {
      title: "Fractional CTO",
      company: "PacketFabric",
      years: "2025\u2013present",
      current: true
    },
    {
      title: "Head of Data Modernization",
      company: "Lumen Technologies",
      years: "2024\u20132025"
    },
    {
      title: "VP of Software Engineering",
      company: "PacketFabric",
      years: "2020\u20132024"
    },
    {
      title: "Principal Software Engineer",
      company: "Matrix Retail",
      years: "2017\u20132020"
    },
    {
      title: "Co-Founder & CTO",
      company: "Optymizer Solutions",
      years: "2015\u20132017"
    },
    {
      title: "Freelance Software Developer",
      company: "Self-employed",
      years: "1999\u20132015"
    },
    {
      title: "Attorney / Paralegal",
      company: "Various firms",
      years: "2006\u20132014"
    }
  ];
  const classes = (current = false) => {
    const base = ["tile", "is-child", "box"];
    base.push(current ? "is-12" : "is-6");
    return base.join(" ");
  };
  $$result.css.add(css$6);
  return `${validate_component(Section, "Section").$$render($$result, { title: "Done" }, {}, {
    default: () => {
      return `<div class="${"subtitle"}">Where I am now, and where I&#39;ve been</div>
    <div class="${"tile is-ancestor"}"><div class="${"tile is-parent is-flex-wrap-wrap"}">${each(work, (position) => {
        return `<div class="${escape(null_to_empty(classes(position.current)), true) + " svelte-1kvm4yt"}"><div class="${"content svelte-1kvm4yt"}">${position.current ? `<div class="${"current svelte-1kvm4yt"}">Current \u{1F31F}</div>` : ``}
                        <strong class="${"svelte-1kvm4yt"}">${escape(position.title)}</strong>
                        ${escape(position.company)}
                        ${position.tagline ? `<div class="${"tagline svelte-1kvm4yt"}">${escape(position.tagline)}</div>` : ``}
                        <div class="${"years svelte-1kvm4yt"}">${escape(position.years)}</div></div>
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
  return `<a${add_attribute("href", `https://github.com/${slug}`, 0)} class="${"content repo-card svelte-eh4fom"}" target="${"_blank"}">${``}
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
      return `<div class="${"subtitle"}">Open source projects I maintain across the Sanic ecosystem</div>
    <div class="${"tile is-ancestor"}"><div class="${"tile is-parent is-flex-wrap-wrap"}">${each(repos, (slug) => {
        return `<div class="${"tile is-child is-6 box svelte-1ocv4w7"}">${validate_component(RepoCard, "RepoCard").$$render($$result, { slug }, {}, {})}
                </div>`;
      })}</div></div>`;
    }
  })}`;
});
const Said_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: ".box.svelte-1fp8qi2.svelte-1fp8qi2{background:transparent;box-shadow:none}.video-embed.svelte-1fp8qi2.svelte-1fp8qi2{position:relative;width:100%;padding-bottom:56.25%;height:0}.video-embed.svelte-1fp8qi2 iframe.svelte-1fp8qi2{position:absolute;inset:0;width:100%;height:100%}",
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
      return `<div class="${"subtitle"}">Some presentations I&#39;ve given at tech conferences
    </div>
    
    <div class="${"tile is-ancestor"}"><div class="${"tile is-parent is-flex-wrap-wrap"}">${each(repos, (slug) => {
        return `<div class="${"tile is-child is-6 box svelte-1fp8qi2"}">${validate_component(RepoCard, "RepoCard").$$render($$result, { slug }, {}, {})}
                </div>`;
      })}</div></div>
    
    <div class="${"video-wrap"}"><h3 class="${"is-size-3"}">Closing Keynote PyCon IL 2023</h3>
        <div class="${"video-embed svelte-1fp8qi2"}"><iframe src="${"https://www.youtube.com/embed/zDGwC2shsgs?si=LgjU1DyPbyeTR0Tc"}" title="${"YouTube video player"}" frameborder="${"0"}" allow="${"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"}" allowfullscreen class="${"svelte-1fp8qi2"}"></iframe></div></div>`;
    }
  })}`;
});
const Content_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".is-divider.svelte-bgtuwg{border-color:#111;max-width:80%;margin:auto}.is-divider[data-content].svelte-bgtuwg::after{background:#242424 !important;color:#444 !important;font-size:3rem;line-height:3rem;padding:0.5rem 2rem;transform:translateY(-2rem)}",
  map: null
};
const Content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$2);
  return `<div class="${"has-background-black-ter has-text-white-ter"}">${validate_component(Done, "Done").$$render($$result, {}, {}, {})}
    <div class="${"is-divider svelte-bgtuwg"}" data-content="${"\xA7"}"></div>
    ${validate_component(Built, "Built").$$render($$result, {}, {}, {})}
    <div class="${"is-divider svelte-bgtuwg"}" data-content="${"\xA7"}"></div>
    ${validate_component(Said, "Said").$$render($$result, {}, {}, {})}
</div>`;
});
const Book_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".book-strip.svelte-m514zv.svelte-m514zv{background-color:#ff0d68;color:#000000;padding:0.75rem 1rem;text-align:center;font-size:1.1rem;font-weight:500}.book-strip.svelte-m514zv p.svelte-m514zv{margin:0}.book-strip.svelte-m514zv a.svelte-m514zv{color:#000000;font-weight:700;text-decoration:underline}.book-strip.svelte-m514zv a.svelte-m514zv:hover{color:#111111}.book-label.svelte-m514zv.svelte-m514zv{display:inline-block;background:#000;color:#ff0d68;padding:0.1rem 0.5rem;margin-right:0.5rem;border-radius:3px;font-size:0.85rem;letter-spacing:0.05em;text-transform:uppercase;font-weight:700}@media(max-width: 600px){.book-strip.svelte-m514zv.svelte-m514zv{font-size:0.95rem;padding:0.6rem 0.75rem}.trailing.svelte-m514zv.svelte-m514zv{display:block;margin-top:0.15rem;font-size:0.85rem}}",
  map: null
};
const Book = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<section class="${"book-strip svelte-m514zv"}"><div class="${"container"}"><p class="${"svelte-m514zv"}"><span class="${"book-label svelte-m514zv"}">Book</span>
            <a href="${"https://sanicbook.com"}" class="${"svelte-m514zv"}">Python Web Development with Sanic</a>
            <span class="${"trailing svelte-m514zv"}">\u2014 available from Packt</span></p></div>
</section>`;
});
const Home = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<pre class="${"language-python"}"><!-- HTML_TAG_START -->${`<code class="language-python"><span class="token keyword">class</span> <span class="token class-name">Adam</span><span class="token punctuation">:</span>
    work <span class="token operator">=</span> HyperFi<span class="token punctuation">(</span><span class="token string">"CTO &amp; Co-founder"</span><span class="token punctuation">)</span>
    oss <span class="token operator">=</span> Sanic<span class="token punctuation">(</span><span class="token string">"Core Maintainer"</span><span class="token punctuation">)</span>
    home <span class="token operator">=</span> Israel<span class="token punctuation">(</span><span class="token string">"Negev"</span><span class="token punctuation">)</span>

    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">run</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> <span class="token operator">*</span>inputs<span class="token punctuation">:</span> Pretzels <span class="token operator">|</span> Coffee<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
            <span class="token keyword">await</span> self<span class="token punctuation">.</span>work<span class="token punctuation">.</span>do<span class="token punctuation">(</span>inputs<span class="token punctuation">)</span>
            <span class="token keyword">await</span> self<span class="token punctuation">.</span>oss<span class="token punctuation">.</span>do<span class="token punctuation">(</span>inputs<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">sleep</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">raise</span> NotImplementedError</code>`}<!-- HTML_TAG_END --></pre>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".main-container.svelte-1eg0cg3{padding-top:3rem}@media(max-width: 600px){.main-container.svelte-1eg0cg3{padding-top:2rem}}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<main>${validate_component(Hero, "Hero").$$render($$result, {}, {}, {})}
	${validate_component(Book, "Book").$$render($$result, {}, {}, {})}
	<div class="${"container is-max-desktop mb-8 main-container svelte-1eg0cg3"}"><div class="${"mb-8"}">${validate_component(Home, "Home").$$render($$result, {}, {}, {})}</div>
		${validate_component(Content, "Content").$$render($$result, {}, {}, {})}</div>
	${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}
</main>`;
});
export {
  Page as default
};
