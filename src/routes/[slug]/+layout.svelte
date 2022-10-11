<script>
    import "$lib/styles/index.scss"
    import "prismjs/themes/prism-okaidia.css"
	import Footer from "$lib/elements/Footer.svelte";

    let isActive = false
</script>

<nav class="navbar" aria-label="main navigation">
    <div class="navbar-brand">
        <a class="navbar-item" href="/">
            <img
                src="/images/adam.svg" alt="Adam Hopkins" />
        </a>

        <a
            href="/"
            role="button"
            class="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            on:click={e => {
                e.preventDefault()
                isActive = !isActive
                return false
            }
            }
        >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
        </a>
    </div>

    <div id="article-navbar" class="navbar-menu is-dark" class:is-active={isActive}>
        <div class="navbar-start">
            <a class="navbar-item" href="/">
                <i class="las la-home"></i>
                Home
            </a>

            <a class="navbar-item" href="https://sanicbook.com" target="_blank">
                <i class="las la-book-open"></i>
                Sanic Book
            </a>

            <div class="navbar-item has-dropdown is-hoverable">
                <span class="navbar-link" id="article-menu-title" />
                <div class="navbar-dropdown" id="article-menu-content" />
            </div>
        </div>

        <div class="navbar-end">
            <a class="navbar-item" href="https://github.com/ahopkins/personal-site">
                <i class="lab la-github"></i>
            </a>
        </div>
    </div>
</nav>
<main>
    <slot />
</main>


<Footer />

<style scoped>
    .navbar-menu,
    .navbar {
        background-color: #111111;
    }

    .navbar-item.has-dropdown:focus .navbar-link,
    .navbar-item.has-dropdown:hover .navbar-link,
    .navbar-item.has-dropdown.is-active .navbar-link,
    .navbar-dropdown,
    .navbar-item.has-dropdown:hover,
    .navbar-link:hover,
    a.navbar-item:hover,
    a.navbar-link.is-active {
        background-color: #111111 !important;
        color: #a0a0a0 !important;
        border-top-color: #111111;
    }

    .navbar-link::after {
        border-color: #a0a0a0;
    }
    :global(.navbar-dropdown >  .navbar-item) {
        align-items: flex-start;
        display: flex;
        flex-direction: column;
    }
</style>
