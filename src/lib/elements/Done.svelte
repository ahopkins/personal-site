<script>
    import Section from "../components/Section.svelte";

    const work = [
        {
            title: "Co-Founder & CTO",
            company: "HyperFi",
            years: "2025–present",
            tagline: "AI-native infrastructure orchestration",
            current: true,
        },
        {
            title: "CTO & Technology Consultant",
            company: "PacketFabric",
            years: "2025–present",
            tagline: "Platform architecture & AI-readiness advisory",
            current: true,
        },
        {
            title: "Principal Consultant",
            company: "Etz Lime · Self-employed",
            years: "Jan 1999 – present",
            tagline: "Advisory & full-stack engineering across languages and stacks",
            current: true,
        },
        {
            title: "Head of Data Modernization",
            company: "Lumen Technologies",
            years: "2024–2025",
            tagline: "AI-ready data architecture & governance for a Fortune 500 company",
        },
        {
            title: "VP of Software Engineering",
            company: "PacketFabric",
            years: "2020–2024",
            tagline: "Scaled software engineering to 30+ across distributed systems",
        },
        {
            title: "Principal Software Engineer",
            company: "Matrix Retail",
            years: "2017–2020",
            tagline: "ML-driven predictive analytics & platform architecture",
        },
        {
            title: "Co-Founder & CTO",
            company: "Optymizer Solutions",
            years: "2015–2017",
            tagline: "Real-time fraud detection with ML",
        },
        {
            title: "Legal career",
            company: "Admitted to the Massachusetts Bar",
            years: "Through 2014",
        },
    ];

    const classes = (current = false) => {
        const base = ["tile", "is-child", "box"];
        base.push(current ? "is-12" : "is-6");
        return base.join(" ");
    };
</script>

<Section title="Done">
    <div class="subtitle">Where I am now, and where I've been</div>
    <div class="tile is-ancestor">
        <div class="tile is-parent is-flex-wrap-wrap">
            {#each work as position}
                <div class={classes(position.current)}>
                    <div class="content">
                        {#if position.current}
                            <div class="current">Current 🌟</div>
                        {/if}
                        <strong>{position.title}</strong>
                        {position.company}
                        {#if position.tagline}
                            <div class="tagline">{position.tagline}</div>
                        {/if}
                        <div class="years">{position.years}</div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</Section>

<style>
    .content .current {
        float: right;
    }

    .box {
        background: transparent;
        box-shadow: none;
    }

    .content {
        display: block;
        box-shadow: none;
        background: #111111;
        border-radius: 6px;
        padding: 1.25em;
        line-height: 1.5;
        color: var(--svc-text-primary, #586069);
    }
    .content strong {
        display: block;
    }
    .content .tagline {
        font-size: 0.95rem;
        color: #a0a0a0;
        margin-top: 0.35rem;
        font-style: italic;
    }
    .content .years {
        font-size: 0.8rem;
        color: #666;
        margin-top: 0.4rem;
        letter-spacing: 0.03em;
    }
</style>
