<script>
    import Built from "./Built.svelte";
    import Done from "./Done.svelte";
    import Said from "./Said.svelte";
</script>

<div class="has-background-black-ter has-text-white-ter">
    <Built />
    <div class="is-divider" data-content="§" />
    <Said />
    <div class="is-divider" data-content="§" />
    <Done />
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
    }
</style>
