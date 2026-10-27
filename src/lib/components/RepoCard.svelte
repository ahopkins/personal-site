<script>
    /** @type {{ slug: string, description?: string | null, language?: string | null, stars?: number, forks?: number }} */
    export let repo;

    const colors = {
        Python: "#3572a5",
        Rust: "#dea584",
        Go: "#00add8",
        TypeScript: "#3178c6",
        JavaScript: "#f1e05a",
    };
    const compact = new Intl.NumberFormat("en", { notation: "compact" });
</script>

<a
    href={`https://github.com/${repo.slug}`}
    class="content repo-card"
    target="_blank"
    rel="noopener"
>
    <div class="repo-title">
        <i class="lab la-github"></i>
        {repo.slug}
    </div>
    {#if repo.description}
        <div class="repo-description">{repo.description}</div>
    {/if}
    {#if repo.stars !== undefined}
        <div class="repo-info">
            {#if repo.language}
                <span>
                    <span
                        class="language"
                        style:background-color={colors[repo.language] ?? "#a0a0a0"}
                    ></span>
                    {repo.language}
                </span>
            {/if}
            <span><i class="las la-star"></i> {compact.format(repo.stars)}</span>
            <span><i class="las la-code-branch"></i> {compact.format(repo.forks)}</span>
        </div>
    {/if}
</a>

<style>
    .repo-card {
        position: relative;
        display: block;
        box-shadow: none;
        background: #111111;
        border: 1px solid #111111;
        border-radius: 6px;
        padding: 1.25em 1.25em 3.25em;
        line-height: 1.5;
        color: var(--svc-text-primary, #586069);
        min-height: 165px;
        margin: 0 !important;
        transition: transform 0.15s ease, border-color 0.15s ease;
    }
    .repo-card:hover {
        text-decoration: none;
        transform: translateY(-3px);
        border-color: #ff0d68;
    }
    .repo-card .repo-title {
        color: #eeeeee;
        font-weight: 700;
    }
    .repo-card:hover .repo-title {
        color: #ff0d68;
    }
    .repo-description {
        color: #a0a0a0;
        margin-top: 0.35rem;
    }
    .repo-info {
        position: absolute;
        bottom: 1.25rem;
        display: flex;
        gap: 1rem;
        font-size: 0.9rem;
    }
    .repo-info .language {
        display: inline-block;
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 100%;
        margin-right: 0.15rem;
    }
    @media (prefers-reduced-motion: reduce) {
        .repo-card,
        .repo-card:hover {
            transition: none;
            transform: none;
        }
    }
</style>
