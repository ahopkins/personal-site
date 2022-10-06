<template>
  <main class="landing">
    <Hero />

    <div class="theme-hope-content">
      <Content />
      <Articles />
      <LandingContent />
    </div>
  </main>
</template>

<script setup>
import Hero from "../elements/Hero.vue";
import Articles from "../elements/Articles.vue";
import LandingContent from "../elements/LandingContent.vue";
</script>

<style>
.landing section {
  margin: 2rem 0;
}
</style>
