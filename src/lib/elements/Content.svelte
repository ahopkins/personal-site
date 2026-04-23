<script>
    import Done from "./Done.svelte";
    import Built from "./Built.svelte";
    import Said from "./Said.svelte";
</script>

<div class="has-background-black-ter has-text-white-ter">
    <Done />
    <div class="is-divider" data-content="§" />
    <Built />
    <div class="is-divider" data-content="§" />
    <Said />
</div>

<style>
    .is-divider {
        border-color: #111;
        max-width: 80%;
        margin: auto;
    }
    .is-divider[data-content]::after {
        background: #242424 !important;
        color: #444 !important;
        font-size: 3rem;
        line-height: 3rem;
        padding: 0.5rem 2rem;
        transform: translateY(-2rem);
    }
</style>
