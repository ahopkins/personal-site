<script>
	import { onMount } from "svelte";
	import "$lib/styles/index.scss";
	import { addCopy } from "$lib/utilities/copy";
	import Hero from "$lib/elements/Hero.svelte";
	import Content from "$lib/elements/Content.svelte";
	import Footer from "$lib/elements/Footer.svelte";
	import Book from "$lib/elements/Book.svelte";
	import Home from "$lib/pages/Home.md";

	export let data;

	onMount(addCopy);
</script>

<main>
	<Hero />
	<Book />
	<div class="container is-max-desktop mb-8">
		<div class="mb-8">
			<Home />
		</div>
		<Content articles={data.articles} />
	</div>
	<Footer />
</main>
