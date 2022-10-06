<template>
  <section class="section is-medium">
    <h2 class="title has-text-white-bis">What I've {{ title }}</h2>
    <slot />
  </section>
</template>

<script setup>
defineProps({
  title: String,
});
</script>
