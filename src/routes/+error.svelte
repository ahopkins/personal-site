<script>
    import { page } from "$app/stores"

    const title = `${$page.status}: ${$page.error?.message}`
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>
<h1>{title}</h1>
