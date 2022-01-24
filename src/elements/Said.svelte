<script>
    import Section from "../components/Section.svelte";
    import RepoCard from "svelte-repo-card";

    const theme = {
        // The color of the text.
        text: "#dbdbdb",

        // The color of the links.
        link: "#3273dc",

        // The background color.
        background: "#111111",

        // The border color.
        border: "#111111",
    };

    const repos = [
        "ahopkins/europython2020-overcoming-access-control",
        "ahopkins/pywebconf2021-making-sanic-even-faster",
        "ahopkins/pyconil2021-liberate-your-api",
    ];
</script>

<Section title="Said">
    <div class="tile is-ancestor">
        <div class="tile is-parent is-flex-wrap-wrap">
            {#each repos as slug}
                <div class="tile is-child is-4 box">
                    <RepoCard {slug} {theme} />
                </div>
            {/each}
        </div>
    </div>
</Section>

<style lang="scss">
    .box {
        background: transparent;
        box-shadow: none;
    }
</style>
