<script>
    import Section from "../components/Section.svelte";
    import RepoCard from "../components/RepoCard.svelte";

    const repos = [
        "sanic-org/sanic",
        "sanic-org/sanic-ext",
        "sanic-org/sanic-router",
        "ahopkins/sanic-jwt",
        "ahopkins/mayim",
        "ahopkins/merkava",
    ];
</script>

<Section title="Built">
    <div class="subtitle">Some open source projects I maintain</div>
    <div class="tile is-ancestor">
        <div class="tile is-parent is-flex-wrap-wrap">
            {#each repos as slug}
                <div class="tile is-child is-6 box">
                    <RepoCard {slug} />
                </div>
            {/each}
        </div>
    </div>
</Section>

<style>
    .box {
        background: transparent;
        box-shadow: none;
    }
    :global(.repo a) {
        color: #ff0d68 !important;
    }
</style>
