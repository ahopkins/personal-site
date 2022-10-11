<script>
    import { onMount } from "svelte";
    import { dataset_dev } from "svelte/internal"
    export let slug;

    const colors = {
        "Python": "#3572a5",
        "Rust": "#dea584"
    }
    let loading = null;
    const load = async() => {
        const response = await fetch(`https://api.github.com/repos/${slug}`)
        return await response.json()
    }
    onMount(async () => {
        loading = load()
    })
</script>

<a href={`https://github.com/${slug}`} class="content repo-card" target="_blank">
    {#if loading}

        {#await loading}
            <p>loading ...</p>
        {:then data}
            <div class="repo">
                <div class="repo-title">
                    <i class="lab la-github"></i>
                    {data.full_name}
                </div>
                <div class="repo-description">{data.description}</div>
                <div class="repo-info">
                    {#if data.language && colors[data.language]}
                        <span class="language" style={`background-color: ${colors[data.language]}`} />
                        {data.language}
                    {/if}

                    <i class="las la-star"></i>
                    {data.stargazers_count}

                    <i class="las la-code-branch"></i>
                    {data.forks_count}
                </div>
            </div>
        {:catch error}
            <p>An error occurred!</p>
        {/await}
    {/if}
</a>

<style>
    .repo-card {
        display: block;
        box-shadow: none;
        background: #111111;
        border-radius: 6px;
        padding: 1.25em;
        line-height: 1.5;
        color: var(--svc-text-primary, #586069);
        min-height: 140px;
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
    .repo-info .language {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        border-radius: 100%;
    }
</style>
