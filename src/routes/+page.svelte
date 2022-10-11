<script>
    import "$lib/styles/index.scss"
	import Hero from "$lib/elements/Hero.svelte";
	import Content from "$lib/elements/Content.svelte";
	import Footer from "$lib/elements/Footer.svelte";
	import Book from "$lib/elements/Book.svelte";

	export let data;
</script>

<main>
	<Hero />
	<Book />
	<Content articles={data.articles} />
	<Footer />
</main>
