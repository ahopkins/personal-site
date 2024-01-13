<script>
 import Section from "../components/Section.svelte";
 import RepoCard from "../components/RepoCard.svelte";

 const repos = [
     "ahopkins/europython2020-overcoming-access-control",
     "ahopkins/pywebconf2021-making-sanic-even-faster",
     "ahopkins/pyconil2021-liberate-your-api",
     "ahopkins/pygeekle2022-mayim-byoq",
     "ahopkins/pyconil-2023",
 ];
</script>

<Section title="Said">
    <div class="subtitle">
        Some presentations I've given at tech conferences
    </div>
    
    <div class="tile is-ancestor">
        <div class="tile is-parent is-flex-wrap-wrap">
            {#each repos as slug}
                <div class="tile is-child is-6 box">
                    <RepoCard {slug} />
                </div>
            {/each}
        </div>
    </div>
    
    <div>
	<h3 class="is-size-3">Closing Keynote PyCon IL 2023</h3>
	<iframe width="816" height="459" src="https://www.youtube.com/embed/zDGwC2shsgs?si=LgjU1DyPbyeTR0Tc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
</Section>

<style>
    .box {
        background: transparent;
        box-shadow: none;
    }
</style>
