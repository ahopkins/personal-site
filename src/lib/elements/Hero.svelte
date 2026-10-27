<script>
    const social = [
        {
            url: "https://x.com/admhpkns",
            text: "@admhpkns",
            glyph: "𝕏",
        },
        {
            url: "https://github.com/ahopkins",
            text: "ahopkins",
            icon: "devicon-github-original",
        },
        {
            url: "https://linkedin.com/in/ahopkins",
            text: "ahopkins",
            icon: "devicon-linkedin-plain",
        },
    ];
</script>

<section class="hero is-black is-fullheight">
    <div class="hero-fx" aria-hidden="true"></div>
    <div class="hero-body">
        <div class="">
            <h1 class="title is-size-1">Adam Hopkins</h1>
            <p class="subtitle">
                Founder & CTO. AI-native platforms. <br />
                <i class="devicon-python-plain colored"></i> Python developer.
                <img
                    src="/images/osi.png"
                    style="height: 20px;"
                    alt="Open Source"
                />
                OSS contributor.
                <img
                    src="/images/sanic-framework-logo-circle-32x32.png"
                    style="height: 20px;"
                    alt="Sanic"
                />
                Sanic Core Maintainer. <br />
                Husband. Father. Son. Brother. <br />
                A proud and happy man.<span class="cursor" aria-hidden="true"></span>
            </p>
            <div class="social">
                {#each social as item}
                    <a href={item.url} target="_blank">
                        {#if item.glyph}
                            <span class="glyph">{item.glyph}</span>
                        {:else}
                            <i class={item.icon}></i>
                        {/if}
                        {item.text}
                    </a>
                {/each}
            </div>
        </div>
        <div class="adam-avatar"></div>
    </div>
    <a class="scroll-hint" href="#content" aria-label="Scroll to content">
        <i class="las la-angle-down"></i>
    </a>
</section>

<style>
    .hero {
        position: relative;
        overflow: hidden;
    }
    .hero-body {
        position: relative;
        z-index: 1;
    }
    .hero-fx {
        position: absolute;
        inset: -48px;
        z-index: 0;
        pointer-events: none;
        background:
            radial-gradient(circle at 72% 45%, rgba(255, 13, 104, 0.14), transparent 45%),
            radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px) 0 0 / 24px 24px;
        animation: drift 24s linear infinite;
    }
    @keyframes drift {
        to {
            transform: translate(24px, 24px);
        }
    }
    .cursor {
        display: inline-block;
        width: 0.55em;
        height: 1.05em;
        margin-left: 0.2em;
        vertical-align: -0.15em;
        background: #ff0d68;
        animation: blink 1.1s steps(1) infinite;
    }
    @keyframes blink {
        50% {
            opacity: 0;
        }
    }
    .scroll-hint {
        position: absolute;
        left: 50%;
        bottom: 1.5rem;
        z-index: 1;
        transform: translateX(-50%);
        color: #666666;
        font-size: 2rem;
        line-height: 1;
        animation: bob 2.4s ease-in-out infinite;
    }
    .scroll-hint:hover {
        color: #ff0d68;
    }
    @keyframes bob {
        50% {
            transform: translate(-50%, 8px);
        }
    }
    @media (prefers-reduced-motion: reduce) {
        .hero-fx,
        .cursor,
        .scroll-hint {
            animation: none;
        }
    }
    .social {
        display: flex;
        flex-wrap: wrap;
        gap: 0.35em;
    }
    .social .glyph {
        display: inline-block;
        font-weight: 700;
        font-size: 1.05em;
        margin-right: 0.15em;
        vertical-align: -0.05em;
    }
    .adam-avatar {
        position: absolute;
        right: 0;
        height: 100vh;
        width: 60vw;
        -webkit-filter: invert(100%);
        filter: invert(100%);
        opacity: 0.2;
        background-position: right;
        background-image: url(/images/adam-unified.svg);
        background-size: cover;
        background-repeat: no-repeat;
    }

    @media (max-width: 1120px) {
        .adam-avatar {
            background-position: bottom right;
        }
    }

    @media (max-width: 1400px) {
        .adam-avatar {
            background-size: contain;
        }
    }
</style>
