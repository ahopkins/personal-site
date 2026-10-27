<script>
	import { onMount } from "svelte";
	import "$lib/styles/index.scss";
	import { addCopy } from "$lib/utilities/copy";
	import Hero from "$lib/elements/Hero.svelte";
	import Content from "$lib/elements/Content.svelte";
	import Footer from "$lib/elements/Footer.svelte";
	import Book from "$lib/elements/Book.svelte";
	onMount(addCopy);

	const title = "Adam Hopkins · Co-Founder & CTO, StackYak";
	const description =
		"Adam Hopkins: Co-Founder & CTO of StackYak, Sanic core maintainer, and Python developer building AI infrastructure.";
	const url = "https://hpkns.io/";
	const image = "https://hpkns.io/og.png";
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Adam Hopkins" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={image} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@admhpkns" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
</svelte:head>

<main>
	<Hero />
	<Book />
	<div id="content" class="container is-max-desktop mb-8 main-container">
		<Content />
	</div>
	<Footer />
</main>

<style>
	.main-container {
		padding-top: 3rem;
	}
	@media (max-width: 600px) {
		.main-container {
			padding-top: 2rem;
		}
	}
</style>
