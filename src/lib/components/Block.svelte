<script>
    import { onMount } from "svelte";
    import { unified } from "unified";
    import remarkParse from "remark-parse";
    import remarkHtml from "remark-html";

    export let title = "";
    export let type = "is-dark";

    let span;
    let content = "";
    onMount(async () => {
        const converted = await unified()
            .use(remarkParse)
            .use(remarkHtml)
            .process(span.innerHTML);
        span.innerHTML = converted.value;
    });
</script>

<div class={`notification ${type}`}>
    {#if title}
        <h5>{title}</h5>
    {/if}
    <span bind:this={span}><slot /></span>
</div>
