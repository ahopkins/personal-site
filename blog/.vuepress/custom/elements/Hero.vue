<script setup>
import Book from "./Book.vue";
const social = [
  {
    url: "https://www.twitter.com/admhpkns",
    text: "@admhpkns",
    icon: "devicon-twitter-original",
  },
  {
    url: "https://github.com/ahopkins",
    text: "ahopkins",
    icon: "devicon-github-original",
  },
  {
    url: "https://linkedin.com/in/ahopkins",
    text: "ahopkins",
    icon: "devicon-linkedin-plain",
  },
];
</script>

<template>
  <section>
    <div class="hero">
      <div class="front-page">
        <div class="display-info">
          <h1 class="">Adam Hopkins</h1>
          <p class="">
            <i class="devicon-python-plain colored" /> Python developer.
            <img src="/images/osi.png" style="height: 20px" alt="Open Source" />
            OSS contributor.
            <img
              src="/images/sanic-framework-logo-circle-32x32.png"
              style="height: 20px"
              alt="Sanic"
            />
            Sanic Maintainer. <br />
            Husband. Father. Son. Brother. <br />
            A proud and happy man.
          </p>
          <div class="social">
            <a
              :href="item.url"
              target="_blank"
              v-for="item in social"
              :key="item.icon"
            >
              <i :class="item.icon" />
              {{ item.text }}
            </a>
          </div>
        </div>
        <div class="adam-avatar" />
      </div>
      <Book />
    </div>
    <div class="trailer" />
  </section>
</template>

<style>
.hero {
  background: #0a0a0a;
}
.adam-avatar {
  position: absolute;
  right: 0;
  height: 100vh;
  width: 60vw;
  -webkit-filter: invert(100%);
  filter: invert(100%);
  opacity: 0.2;
  background-position: right;
  background-image: url(/images/adam-unified.svg);
  background-size: cover;
  background-repeat: no-repeat;
}

@media (max-width: 1120px) {
  .adam-avatar {
    background-position: bottom right;
  }
}

@media (max-width: 1400px) {
  .adam-avatar {
    background-size: contain;
  }
}

.social a {
  margin: 0 0.5rem 0 0;
}
</style>
