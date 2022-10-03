<script>
    import Section from "../components/Section.svelte";

    const work = [
        {
            title: "Director of Software Engineering",
            company: "PacketFabric",
            current: true,
        },
        { title: "Full Stack, Principal Engineer", company: "Matrix Retail" },
        { title: "CTO/CLO", company: "Optymizer" },
        { title: "Principal", company: "AHopLaw" },
        { title: "Associate Attorney", company: "Looney & Grossman" },
        { title: "Associate Attorney", company: "Donovan | Hatem" },
    ];
</script>

<Section title="Done">
    <div class="subtitle">Some roles I've had in the past</div>
    <div class="tile is-ancestor">
        <div class="tile is-parent is-flex-wrap-wrap">
            {#each work as position}
                <div class="tile is-child is-4 box">
                    <div class="content">
                        <strong>{position.title}</strong>
                        {position.company}
                        {#if position.current}
                            <div class="current">🌟</div>
                        {/if}
                    </div>
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
    .content {
        background: #111111;
        border-radius: 6px;
        padding: 1.25em;
        line-height: 1.5;
        color: var(--svc-text-primary, #586069);
    }
    .content strong {
        color: #ff0d68;
    }
    .content .current {
        float: right;
    }
</style>
