<template>
  <div>
    <Section title="Done">
      <div class="subtitle">Some roles I've had in the past</div>
      <div class="tile-wrapper">
        <div class="tile" v-for="position in work" :key="position.company">
          <div class="tile-box">
            <div class="current" v-if="position.current">🌟</div>
            <strong>{{ position.title }}</strong>
            <em>{{ position.company }}</em>
          </div>
        </div>
      </div>
    </Section>
  </div>
</template>

<script setup>
import Section from "../components/Section.vue";
const work = [
  {
    title: "Director of Software Engineering",
    company: "PacketFabric",
    current: true,
  },
  { title: "Full Stack, Principal Engineer", company: "Matrix Retail" },
  { title: "CTO/CLO", company: "Optymizer" },
  { title: "Principal", company: "AHopLaw" },
  { title: "Associate Attorney", company: "Looney & Grossman" },
  { title: "Associate Attorney", company: "Donovan | Hatem" },
];
</script>

<style scoped>
.current {
  float: right;
}
</style>
