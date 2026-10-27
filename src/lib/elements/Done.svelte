<script>
    import Section from "../components/Section.svelte";

    const work = [
        {
            title: "Co-Founder & CTO",
            company: "StackYak",
            years: "2026–present",
            tagline: "Private AI inference stacks on dedicated GPU infrastructure",
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
            title: "CTO",
            company: "PacketFabric",
            years: "2025–2026",
            tagline: "Platform architecture & AI-readiness advisory",
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
</script>

<Section title="Done">
    <div class="subtitle">Where I am now, and where I've been</div>
    <ol class="timeline">
        {#each work as position}
            <li class="entry" class:current={position.current}>
                <div class="when">
                    {#if position.current}
                        <span class="now">now</span>
                    {/if}
                    <span class="years">{position.years}</span>
                </div>
                <div class="dot" aria-hidden="true"></div>
                <div class="content">
                    <strong>{position.title}</strong>
                    {position.company}
                    {#if position.tagline}
                        <div class="tagline">{position.tagline}</div>
                    {/if}
                </div>
            </li>
        {/each}
    </ol>
</Section>

<style>
    .timeline {
        --rail: 9.5rem;
        position: relative;
        list-style: none;
        margin: 2rem 0 0;
        padding: 0;
    }
    .timeline::before {
        content: "";
        position: absolute;
        top: 0.5rem;
        bottom: 0.5rem;
        left: var(--rail);
        width: 2px;
        background: linear-gradient(#ff0d68, #3a3a3a 30%);
    }
    .entry {
        position: relative;
        display: grid;
        grid-template-columns: var(--rail) 1fr;
        column-gap: 2rem;
        margin-bottom: 1rem;
    }
    .when {
        padding: 1.25rem 1.5rem 0 0;
        text-align: right;
    }
    .years {
        display: block;
        font-size: 0.85rem;
        color: #666;
        letter-spacing: 0.03em;
    }
    .now {
        display: inline-block;
        margin-bottom: 0.2rem;
        color: #ff0d68;
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }
    .dot {
        position: absolute;
        top: 1.45rem;
        left: calc(var(--rail) + 1px);
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 50%;
        background: #242424;
        border: 2px solid #444;
        transform: translateX(-50%);
    }
    .current .dot {
        background: #ff0d68;
        border-color: #ff0d68;
        box-shadow: 0 0 0 4px rgba(255, 13, 104, 0.2), 0 0 16px rgba(255, 13, 104, 0.6);
    }
    .current .content {
        border-left: 2px solid #ff0d68;
    }

    .content {
        display: block;
        box-shadow: none;
        background: #111111;
        border-radius: 6px;
        padding: 1.25em;
        line-height: 1.5;
        color: var(--svc-text-primary, #586069);
        margin: 0 !important;
    }
    .content strong {
        display: block;
    }

    @media (max-width: 768px) {
        .timeline {
            --rail: 0.4rem;
        }
        .entry {
            grid-template-columns: 1fr;
            padding-left: 1.75rem;
        }
        .when {
            order: 1;
            padding: 0 0 0.4rem;
            text-align: left;
        }
        .when .now {
            margin: 0 0.5rem 0 0;
        }
        .years {
            display: inline;
        }
        .content {
            order: 2;
        }
        .dot {
            top: 0.3rem;
        }
    }
    .content .tagline {
        font-size: 0.95rem;
        color: #a0a0a0;
        margin-top: 0.35rem;
        font-style: italic;
    }
</style>
