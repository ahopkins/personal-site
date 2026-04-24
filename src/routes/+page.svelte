<script>
	import { onMount } from "svelte";
	import "$lib/styles/index.scss";
	import { addCopy } from "$lib/utilities/copy";
	import Hero from "$lib/elements/Hero.svelte";
	import Content from "$lib/elements/Content.svelte";
	import Footer from "$lib/elements/Footer.svelte";
	import Book from "$lib/elements/Book.svelte";
	onMount(addCopy);
</script>

<main>
	<Hero />
	<Book />
	<div class="container is-max-desktop mb-8 main-container">
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
