<script>
    import Section from "../components/Section.svelte";
</script>

<Section title="Built">
    <div class="subtitle">
        Open source across the Sanic ecosystem and beyond
    </div>
    <p>
        I maintain the <a href="https://sanic.dev" target="_blank">Sanic</a>
        web framework as a Core Maintainer and Steering Council Chair, and
        ship a handful of related libraries and experiments in Python, Go,
        and Rust.
    </p>
    <p class="cta">
        <a
            class="gh-link"
            href="https://github.com/ahopkins"
            target="_blank"
        >
            <i class="lab la-github" />
            See it all on GitHub
            <i class="las la-arrow-right" />
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
        margin-top: 1.25rem;
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
