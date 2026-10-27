<script>
    import { page } from "$app/state";
    import Section from "../components/Section.svelte";
    import RepoCard from "../components/RepoCard.svelte";
</script>

<Section title="Built">
    <div class="subtitle">
        Open source across the Sanic ecosystem and beyond
    </div>
    <a class="featured" href="https://stackyak.ai" target="_blank" rel="noopener">
        <div class="featured-label">Building now</div>
        <div class="featured-name">StackYak</div>
        <div class="featured-tagline">
            Private AI inference stacks on dedicated GPU infrastructure
        </div>
        <div class="featured-link">
            stackyak.ai <i class="las la-arrow-right"></i>
        </div>
    </a>
    <p>
        I maintain the <a href="https://sanic.dev" target="_blank">Sanic</a>
        web framework as a Core Maintainer and Steering Council Chair, and
        ship a handful of related libraries and experiments in Python, Go,
        and Rust.
    </p>
    <div class="repos">
        {#each page.data.repos ?? [] as repo (repo.slug)}
            <RepoCard {repo} />
        {/each}
    </div>
    <p class="cta">
        <a
            class="gh-link"
            href="https://github.com/ahopkins"
            target="_blank"
        >
            <i class="lab la-github"></i>
            See it all on GitHub
            <i class="las la-arrow-right"></i>
        </a>
    </p>
</Section>

<style>
    p {
        color: #a0a0a0;
        font-size: 1.05rem;
        line-height: 1.65;
    }
    p a {
        color: #ff0d68 !important;
    }
    .cta {
        margin-top: 1.5rem;
    }
    .featured {
        position: relative;
        display: block;
        overflow: hidden;
        margin: 1.5rem 0 2rem;
        padding: 1.75rem;
        border: 1px solid #ff0d68;
        border-radius: 6px;
        background:
            radial-gradient(circle at 100% 0%, rgba(255, 13, 104, 0.22), transparent 60%),
            #111111;
        transition: transform 0.15s ease;
    }
    .featured:hover {
        transform: translateY(-3px);
        text-decoration: none;
    }
    .featured-label {
        color: #ff0d68;
        font-size: 0.8rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }
    .featured-name {
        color: #ffffff;
        font-size: 2rem;
        font-weight: 700;
        line-height: 1.2;
        margin-top: 0.35rem;
    }
    .featured-tagline {
        color: #a0a0a0;
        font-size: 1.05rem;
        margin-top: 0.35rem;
    }
    .featured-link {
        color: #eeeeee;
        font-weight: 600;
        margin-top: 1rem;
    }
    .featured:hover .featured-link {
        color: #ff0d68;
    }
    .repos {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1rem;
        margin-top: 1.5rem;
    }
    @media (max-width: 768px) {
        .repos {
            grid-template-columns: 1fr;
        }
    }
    @media (prefers-reduced-motion: reduce) {
        .featured,
        .featured:hover {
            transition: none;
            transform: none;
        }
    }
    .gh-link {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.65rem 1.15rem;
        border: 1px solid #ff0d68;
        border-radius: 6px;
        color: #ff0d68 !important;
        font-weight: 600;
        transition: background-color 0.15s ease, color 0.15s ease;
    }
    .gh-link:hover {
        background-color: #ff0d68;
        color: #0a0a0a !important;
        text-decoration: none;
    }
    .gh-link :global(i) {
        font-size: 1.1em;
    }
</style>
