import { c as create_ssr_component, d as each, f as add_attribute, e as escape, h as null_to_empty, v as validate_component } from "../../chunks/index.js";
import { F as Footer } from "../../chunks/Footer.js";
const Hero_svelte_svelte_type_style_lang = "";
const css$6 = {
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
  $$result.css.add(css$6);
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
const Section = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  return `<section class="${"section is-medium"}"><h2 class="${"title has-text-white-bis"}">What I&#39;ve ${escape(title)}</h2>
    ${slots.default ? slots.default({}) : ``}</section>`;
});
const Done_svelte_svelte_type_style_lang = "";
const css$5 = {
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
      title: "CTO & Technology Consultant",
      company: "PacketFabric",
      years: "2025\u2013present",
      tagline: "Platform architecture & AI-readiness advisory",
      current: true
    },
    {
      title: "Principal Consultant",
      company: "Etz Lime \xB7 Self-employed",
      years: "Jan 1999 \u2013 present",
      tagline: "Advisory & full-stack engineering across languages and stacks",
      current: true
    },
    {
      title: "Head of Data Modernization",
      company: "Lumen Technologies",
      years: "2024\u20132025",
      tagline: "AI-ready data architecture & governance for a Fortune 500 company"
    },
    {
      title: "VP of Software Engineering",
      company: "PacketFabric",
      years: "2020\u20132024",
      tagline: "Scaled software engineering to 30+ across distributed systems"
    },
    {
      title: "Principal Software Engineer",
      company: "Matrix Retail",
      years: "2017\u20132020",
      tagline: "ML-driven predictive analytics & platform architecture"
    },
    {
      title: "Co-Founder & CTO",
      company: "Optymizer Solutions",
      years: "2015\u20132017",
      tagline: "Real-time fraud detection with ML"
    },
    {
      title: "Legal career",
      company: "Admitted to the Massachusetts Bar",
      years: "Through 2014"
    }
  ];
  const classes = (current = false) => {
    const base = ["tile", "is-child", "box"];
    base.push(current ? "is-12" : "is-6");
    return base.join(" ");
  };
  $$result.css.add(css$5);
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
const Built_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: "p.svelte-1gana33.svelte-1gana33{color:#a0a0a0;font-size:1.05rem;line-height:1.65}p.svelte-1gana33 a.svelte-1gana33{color:#ff0d68 !important}.cta.svelte-1gana33.svelte-1gana33{margin-top:1.25rem}.gh-link.svelte-1gana33.svelte-1gana33{display:inline-flex;align-items:center;gap:0.5rem;padding:0.65rem 1.15rem;border:1px solid #ff0d68;border-radius:6px;color:#ff0d68 !important;font-weight:600;transition:background-color 0.15s ease, color 0.15s ease}.gh-link.svelte-1gana33.svelte-1gana33:hover{background-color:#ff0d68;color:#0a0a0a !important;text-decoration:none}.gh-link.svelte-1gana33 i{font-size:1.1em}",
  map: null
};
const Built = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$4);
  return `${validate_component(Section, "Section").$$render($$result, { title: "Built" }, {}, {
    default: () => {
      return `<div class="${"subtitle"}">Open source across the Sanic ecosystem and beyond
    </div>
    <p class="${"svelte-1gana33"}">I maintain the <a href="${"https://sanic.dev"}" target="${"_blank"}" class="${"svelte-1gana33"}">Sanic</a>
        web framework as a Core Maintainer and Steering Council Chair, and
        ship a handful of related libraries and experiments in Python, Go,
        and Rust.
    </p>
    <p class="${"cta svelte-1gana33"}"><a class="${"gh-link svelte-1gana33"}" href="${"https://github.com/ahopkins"}" target="${"_blank"}"><i class="${"lab la-github"}"></i>
            See it all on GitHub
            <i class="${"las la-arrow-right"}"></i></a></p>`;
    }
  })}`;
});
const Said_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: "p.svelte-11v3e2g.svelte-11v3e2g{color:#a0a0a0;font-size:1.05rem;line-height:1.65}p.svelte-11v3e2g strong.svelte-11v3e2g{color:#eeeeee;font-weight:600}.video-wrap.svelte-11v3e2g.svelte-11v3e2g{margin-top:2rem}.video-wrap.svelte-11v3e2g h3.svelte-11v3e2g{color:#eeeeee;margin-bottom:1rem}.video-embed.svelte-11v3e2g.svelte-11v3e2g{position:relative;width:100%;padding-bottom:56.25%;height:0}.video-embed.svelte-11v3e2g iframe.svelte-11v3e2g{position:absolute;inset:0;width:100%;height:100%}",
  map: null
};
const Said = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$3);
  return `${validate_component(Section, "Section").$$render($$result, { title: "Said" }, {}, {
    default: () => {
      return `<div class="${"subtitle"}">Keynotes, conference talks, and podcast guest appearances
    </div>
    <p class="${"svelte-11v3e2g"}">I&#39;ve keynoted and spoken at Python and engineering conferences
        across the globe \u2014 <strong class="${"svelte-11v3e2g"}">PyCon IL</strong>,
        <strong class="${"svelte-11v3e2g"}">EuroPython</strong>, <strong class="${"svelte-11v3e2g"}">PyWebConf</strong>,
        <strong class="${"svelte-11v3e2g"}">PyGeekle</strong>, and others \u2014 and joined a handful of
        podcasts along the way. Talks usually center on async Python,
        scalable APIs, data platform architecture, and the developer
        experience of building and maintaining open source.
    </p>
    <p class="${"svelte-11v3e2g"}">If you&#39;re organizing a conference, podcast, or internal tech talk and
        think I&#39;d be a good fit, get in touch.
    </p>

    <div class="${"video-wrap svelte-11v3e2g"}"><h3 class="${"is-size-3 svelte-11v3e2g"}">Closing Keynote \xB7 PyCon IL 2023</h3>
        <div class="${"video-embed svelte-11v3e2g"}"><iframe src="${"https://www.youtube.com/embed/zDGwC2shsgs?si=LgjU1DyPbyeTR0Tc"}" title="${"YouTube video player"}" frameborder="${"0"}" allow="${"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"}" allowfullscreen class="${"svelte-11v3e2g"}"></iframe></div></div>`;
    }
  })}`;
});
const Content_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: '.is-divider.svelte-qy7q7f{border-color:#111;max-width:80%;margin:auto}.is-divider[data-content].svelte-qy7q7f::after{background:#242424 !important;color:#444 !important;font-size:3rem;line-height:3rem;padding:0.5rem 2rem;transform:translateY(-2rem)}.intro.svelte-qy7q7f pre,.intro.svelte-qy7q7f pre[class*="language-"],.intro.svelte-qy7q7f code[class*="language-"]{background:transparent !important;box-shadow:none !important}',
  map: null
};
const Content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$2);
  return `<div class="${"has-background-black-ter has-text-white-ter"}"><section class="${"section intro svelte-qy7q7f"}">${validate_component(Home, "Home").$$render($$result, {}, {}, {})}</section>
    <div class="${"is-divider svelte-qy7q7f"}" data-content="${"\xA7"}"></div>
    ${validate_component(Done, "Done").$$render($$result, {}, {}, {})}
    <div class="${"is-divider svelte-qy7q7f"}" data-content="${"\xA7"}"></div>
    ${validate_component(Built, "Built").$$render($$result, {}, {}, {})}
    <div class="${"is-divider svelte-qy7q7f"}" data-content="${"\xA7"}"></div>
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
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".main-container.svelte-1eg0cg3{padding-top:3rem}@media(max-width: 600px){.main-container.svelte-1eg0cg3{padding-top:2rem}}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<main>${validate_component(Hero, "Hero").$$render($$result, {}, {}, {})}
	${validate_component(Book, "Book").$$render($$result, {}, {}, {})}
	<div class="${"container is-max-desktop mb-8 main-container svelte-1eg0cg3"}">${validate_component(Content, "Content").$$render($$result, {}, {}, {})}</div>
	${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}
</main>`;
});
export {
  Page as default
};
