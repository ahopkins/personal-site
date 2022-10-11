<script>
    import mermaid from 'mermaid';
    import { onMount } from 'svelte';
    let chart = null;


    // mermaid.initialize({
    //     startOnLoad: false,
    //     theme: "dark"
    // });
    // onMount(() => {
    //     mermaid.init([ chart ]);
    // });
</script>

<div class="mermaid">
    <pre bind:this={chart}>
        <!-- <slot /> -->
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
