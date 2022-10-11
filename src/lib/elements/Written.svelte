<script>
    import Section from "../components/Section.svelte";
    import Time from "svelte-time"
    export let articles;
</script>

<Section title="Written">
    <div class="subtitle">Some blog articles you can find on this site</div>
    <div class="tile is-ancestor">
        <div class="tile is-parent is-flex-wrap-wrap">
            {#each articles as article}
                <div class="tile is-child is-6 box article-list">
                    <a href={`/${article.slug}`} class="content">
                        <h5 class="is-size-4">
                            {article.title}
                        </h5>
                        <em>{article.description}</em>
                        <div class="article-info">
                            <div class="date">
                                <i class="las la-calendar"></i>
                                <Time timestamp={article.date} live relative format="YYYY-MM-DD" />
                            </div>
                            <div class="tags">
                                <i class="las la-tags"></i>
                                {#each article.tag as tag}
                                    <span class="tag is-dark">{tag}</span>
                                {/each}
                            </div>
                        </div>
                    </a>
                </div>
            {/each}
        </div>
    </div>
</Section>
