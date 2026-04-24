<script>
    import Section from "../components/Section.svelte";
</script>

<Section title="Said">
    <div class="subtitle">
        Keynotes, conference talks, and podcast guest appearances
    </div>
    <p>
        I've keynoted and spoken at Python and engineering conferences
        across the globe — <strong>PyCon IL</strong>,
        <strong>EuroPython</strong>, <strong>PyWebConf</strong>,
        <strong>PyGeekle</strong>, and others — and joined a handful of
        podcasts along the way. Talks usually center on async Python,
        scalable APIs, data platform architecture, and the developer
        experience of building and maintaining open source.
    </p>
    <p>
        If you're organizing a conference, podcast, or internal tech talk and
        think I'd be a good fit, get in touch.
    </p>

    <div class="video-wrap">
        <h3 class="is-size-3">Closing Keynote · PyCon IL 2023</h3>
        <div class="video-embed">
            <iframe
                src="https://www.youtube.com/embed/zDGwC2shsgs?si=LgjU1DyPbyeTR0Tc"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
            ></iframe>
        </div>
    </div>
</Section>

<style>
    p {
        color: #a0a0a0;
        font-size: 1.05rem;
        line-height: 1.65;
    }
    p strong {
        color: #eeeeee;
        font-weight: 600;
    }
    .video-wrap {
        margin-top: 2rem;
    }
    .video-wrap h3 {
        color: #eeeeee;
        margin-bottom: 1rem;
    }
    .video-embed {
        position: relative;
        width: 100%;
        padding-bottom: 56.25%;
        height: 0;
    }
    .video-embed iframe {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
    }
</style>
