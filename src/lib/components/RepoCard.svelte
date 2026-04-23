<script>
    import { onMount } from "svelte";
    export let slug;

    const colors = {
        Python: "#3572a5",
        Rust: "#dea584",
    };
    let loading = null;
    const load = async () => {
        try {
            const response = await fetch(`https://api.github.com/repos/${slug}`);
            if (!response.ok) return null;
            const data = await response.json();
            if (!data || !data.full_name) return null;
            return data;
        } catch {
            return null;
        }
    };
    onMount(async () => {
        loading = load();
    });
</script>

<a
    href={`https://github.com/${slug}`}
    class="content repo-card"
    target="_blank"
>
    {#if loading}
        {#await loading}
            <div class="repo">
                <div class="repo-title">
                    <i class="lab la-github" />
                    {slug}
                </div>
            </div>
        {:then data}
            <div class="repo">
                <div class="repo-title">
                    <i class="lab la-github" />
                    {data?.full_name ?? slug}
                </div>
                {#if data?.description}
                    <div class="repo-description">{data.description}</div>
                {/if}
                {#if data}
                    <div class="repo-info">
                        {#if data.language && colors[data.language]}
                            <span
                                class="language"
                                style={`background-color: ${colors[data.language]}`}
                            />
                            {data.language}
                        {/if}

                        <i class="las la-star" />
                        {data.stargazers_count}

                        <i class="las la-code-branch" />
                        {data.forks_count}
                    </div>
                {/if}
            </div>
        {:catch error}
            <div class="repo">
                <div class="repo-title">
                    <i class="lab la-github" />
                    {slug}
                </div>
            </div>
        {/await}
    {/if}
</a>

<style>
    .repo-card {
        position: relative;
        display: block;
        box-shadow: none;
        background: #111111;
        border-radius: 6px;
        padding: 1.25em;
        line-height: 1.5;
        color: var(--svc-text-primary, #586069);
        min-height: 165px;
    }
    .repo-card:hover {
        text-decoration: none;
    }
    .repo-card .repo-title {
        color: #eeeeee;
        font-weight: 700;
    }
    .repo-card:hover .repo-title {
        color: #ff0d68;
        text-decoration: underline;
    }
    .repo-info {
        position: absolute;
        bottom: 1.25rem;
    }
    .repo-info .language {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        border-radius: 100%;
    }
</style>
