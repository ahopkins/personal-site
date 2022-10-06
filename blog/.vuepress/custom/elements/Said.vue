<template>
  <div>
    <Section title="Said">
      <div class="subtitle">
        Some presentations I've given at tech conferences
      </div>
      <div class="tile-wrapper">
        <div class="tile" v-for="repo in repos" :key="repo">
          <RepoCard :repo="repo" />
        </div>
      </div>
    </Section>
  </div>
</template>

<script setup>
import Section from "../components/Section.vue";
import RepoCard from "../components/RepoCard.vue";
const repos = [
  "ahopkins/europython2020-overcoming-access-control",
  "ahopkins/pywebconf2021-making-sanic-even-faster",
  "ahopkins/pyconil2021-liberate-your-api",
  "ahopkins/pygeekle2022-mayim-byoq",
];
</script>
