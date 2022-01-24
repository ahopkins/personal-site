<script>
    import Section from "../components/Section.svelte";
</script>

<Section title="Done">
    <div class="tile is-ancestor">
        <div class="tile is-parent is-flex-wrap-wrap">
            <div class="tile is-child is-4 box">
                <div class="content">Software Engineering Manager</div>
            </div>
        </div>
    </div>
</Section>

<style lang="scss">
    .box {
        background: transparent;
        box-shadow: none;
    }
    .content {
        background: #111111;
        border-radius: 6px;
        padding: 1.25em;
        line-height: 1.5;
        color: var(--svc-text-primary, #586069);
    }
</style>
