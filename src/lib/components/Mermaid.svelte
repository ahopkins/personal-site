<script>
    import { onMount } from "svelte";
    let chart = null;

    onMount(async () => {
        const { default: mermaid } = await import("mermaid");
        mermaid.initialize({
            startOnLoad: false,
            theme: "dark",
        });
        await mermaid.run({ nodes: [chart] });
    });
</script>

<div class="mermaid">
    <pre bind:this={chart}>
        <slot />
    </pre>
</div>

<style>
    pre {
        background-color: #242424;
    }
    :global(.mermaid .label) {
        font-size: 0.95rem;
        font-family: Rubik, sans-serif;
        color: #a0a0a0;
    }
</style>
