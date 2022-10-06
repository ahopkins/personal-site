<template>
  <div>
    <Section title="Built">
      <div class="subtitle">Some open source projects I maintain</div>
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
  "sanic-org/sanic",
  "sanic-org/sanic-ext",
  "sanic-org/sanic-router",
  "ahopkins/sanic-jwt",
  "ahopkins/mayim",
  "ahopkins/merkava",
];
</script>

