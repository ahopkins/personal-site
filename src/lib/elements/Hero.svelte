<script>
    const social = [
        {
            url: "https://www.twitter.com/admhpkns",
            text: "@admhpkns",
            icon: "devicon-twitter-original",
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
    <div class="hero-body">
        <div class="">
            <h1 class="title is-size-1">Adam Hopkins</h1>
            <p class="subtitle">
                <i class="devicon-python-plain colored" /> Python developer.
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
                Sanic Maintainer. <br />
                Husband. Father. Son. Brother. <br />
                A proud and happy man.
            </p>
            <div class="social">
                {#each social as item}
                    <a href={item.url} target="_blank">
                        <i class={item.icon} />
                        {item.text}
                    </a>
                {/each}
            </div>
        </div>
        <div class="adam-avatar" />
    </div>
</section>

<style>
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
