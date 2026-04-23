# `adam-hopkins`

> Founder & CTO. AI-native platforms. Python developer. Sanic core maintainer.
> Husband. Father. Son. Brother. A proud and happy man.

A single-instance, long-running process. Event-driven. Mostly stable in production since 1981. No known memory leaks. Occasionally blocks on `Coffee`.

🌐 [**hpkns.io**](https://hpkns.io) &nbsp;·&nbsp; 🐦 [@admhpkns](https://x.com/admhpkns) &nbsp;·&nbsp; 🐙 [ahopkins](https://github.com/ahopkins) &nbsp;·&nbsp; 💼 [LinkedIn](https://linkedin.com/in/ahopkins)

---

## `./adam --help`

```python
class Adam:
    work = HyperFi("CTO & Co-founder")
    oss = Sanic("Core Maintainer")
    home = Israel("Negev")

    async def run(self, *inputs: Pretzels | Coffee) -> None:
        while True:
            await self.work.do(inputs)
            await self.oss.do(inputs)

    def sleep(self):
        raise NotImplementedError
```

## Currently deployed

| Instance        | Role                  | Since |
| --------------- | --------------------- | ----- |
| **HyperFi**     | Co-Founder & CTO      | 2025  |
| **PacketFabric**| Fractional CTO        | 2025  |
| **Sanic**       | Core Maintainer       | 2018  |

## Changelog

- **2025** — Spun up `HyperFi`. AI-native infrastructure orchestration. $10M raised.
- **2025** — Stepped into a fractional CTO seat at `PacketFabric`.
- **2024–2025** — Head of Data Modernization at `Lumen Technologies`. Led 120-person data org through a Databricks migration.
- **2020–2024** — VP of Software Engineering at `PacketFabric`. Scaled eng to 30+.
- **2017–2020** — Principal Software Engineer at `Matrix Retail`. Killed a Java monolith.
- **2015–2017** — Co-founded `Optymizer Solutions`. Real-time fraud detection, ML, Django.
- **2006–2014** — Attorney (admitted MA). Occasionally still shows up on recruiter screens.
- **1999–2015** — Freelance web dev. PHP, Python, Ruby, JS. Learned the hard way.

## Dependencies

```yaml
languages:   [Python, TypeScript/JavaScript, Go, Rust]
cloud:       [GCP, AWS, Azure, Kubernetes, Terraform, Docker]
data:        [Postgres, BigQuery, Snowflake, Databricks, Kafka, Redis, PySpark]
frameworks:  [Sanic, Django, React, SvelteKit]
expertise:   [platform engineering, AI/ML infra, event-driven systems, data governance]
```

## Public API

- 📘 [**Python Web Development with Sanic**](https://sanicbook.com) — the book
- 🎙️ Keynotes & conference talks — [scroll through `Said/` on the site](https://hpkns.io)
- 📫 adam@hpkns.io

## About this repo

This is the source for [hpkns.io](https://hpkns.io) — a SvelteKit static site that renders:

- `Hero/`     — name, subtitle, dark avatar
- `Book/`     — the book strip
- `Home.md`   — the Python class above
- `Done/`     — where I am now, where I've been
- `Built/`    — open source (Sanic ecosystem)
- `Said/`     — conference talks
- `Footer/`   — MIT, © current year

### Stack

`SvelteKit` + `adapter-static` + `Bulma` + `mdsvex` + `Prism` + `Mermaid`.

### Run it

```bash
npm install
npm run dev       # localhost:5173
npm run build     # emits to docs/ — GitHub Pages serves from there
```

Articles live in `src/content/*.md` with frontmatter (`title`, `date`, `tag`, `description`). Add the slug to `kit.prerender.entries` in `svelte.config.js` so the article gets prerendered.

### License

Source code: MIT. Site content: © Adam Hopkins.
