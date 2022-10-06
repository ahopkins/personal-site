<template>
  <div>
    <Section title="Written">
      <div class="subtitle">
        <div style="float: right">
          <router-link to="/blog" class="button">Read the blog</router-link>
        </div>
        Some recent articles published on this blog
      </div>
      <div class="tile-wrapper full">
        <div class="tile" v-for="article in articles" :key="article.path">
          <div class="tile-box">
            <router-link class="article" :to="article.path">
              <strong>{{ article.info.title }}</strong>
              <em>{{ article.info.excerpt }}</em>
              <div class="info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon calendar-icon"
                  viewBox="0 0 1024 1024"
                  fill="currentColor"
                  aria-label="calendar icon"
                >
                  <path
                    d="M716.4 110.137c0-18.753-14.72-33.473-33.472-33.473-18.753 0-33.473 14.72-33.473 33.473v33.473h66.993v-33.473zm-334.87 0c0-18.753-14.72-33.473-33.473-33.473s-33.52 14.72-33.52 33.473v33.473h66.993v-33.473zm468.81 33.52H716.4v100.465c0 18.753-14.72 33.473-33.472 33.473a33.145 33.145 0 01-33.473-33.473V143.657H381.53v100.465c0 18.753-14.72 33.473-33.473 33.473a33.145 33.145 0 01-33.473-33.473V143.657H180.6A134.314 134.314 0 0046.66 277.595v535.756A134.314 134.314 0 00180.6 947.289h669.74a134.36 134.36 0 00133.94-133.938V277.595a134.314 134.314 0 00-133.94-133.938zm33.473 267.877H147.126a33.145 33.145 0 01-33.473-33.473c0-18.752 14.72-33.473 33.473-33.473h736.687c18.752 0 33.472 14.72 33.472 33.473a33.145 33.145 0 01-33.472 33.473z"
                  ></path>
                </svg>
                {{ article.info.localizedDate }}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon category-icon"
                  viewBox="0 0 1024 1024"
                  fill="currentColor"
                  aria-label="category icon"
                >
                  <path
                    d="M148.41 106.992h282.176c22.263 0 40.31 18.048 40.31 40.31V429.48c0 22.263-18.047 40.31-40.31 40.31H148.41c-22.263 0-40.311-18.047-40.311-40.31V147.302c0-22.263 18.048-40.31 40.311-40.31zM147.556 553.478H429.73c22.263 0 40.311 18.048 40.311 40.31v282.176c0 22.263-18.048 40.312-40.31 40.312H147.555c-22.263 0-40.311-18.049-40.311-40.312V593.79c0-22.263 18.048-40.311 40.31-40.311zM593.927 106.992h282.176c22.263 0 40.31 18.048 40.31 40.31V429.48c0 22.263-18.047 40.31-40.31 40.31H593.927c-22.263 0-40.311-18.047-40.311-40.31V147.302c0-22.263 18.048-40.31 40.31-40.31zM730.22 920.502H623.926c-40.925 0-74.22-33.388-74.22-74.425V623.992c0-41.038 33.387-74.424 74.425-74.424h222.085c41.038 0 74.424 33.226 74.424 74.067v114.233c0 10.244-8.304 18.548-18.547 18.548s-18.548-8.304-18.548-18.548V623.635c0-20.388-16.746-36.974-37.33-36.974H624.13c-20.585 0-37.331 16.747-37.331 37.33v222.086c0 20.585 16.654 37.331 37.126 37.331H730.22c10.243 0 18.547 8.304 18.547 18.547 0 10.244-8.304 18.547-18.547 18.547z"
                  ></path>
                </svg>
                <span v-for="category in article.info.category" :key="category">
                  {{ category }}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon tag-icon"
                  viewBox="0 0 1024 1024"
                  fill="currentColor"
                  aria-label="tag icon"
                >
                  <path
                    d="M939.902 458.563L910.17 144.567c-1.507-16.272-14.465-29.13-30.737-30.737L565.438 84.098h-.402c-3.215 0-5.726 1.005-7.634 2.913l-470.39 470.39a10.004 10.004 0 000 14.164l365.423 365.424c1.909 1.908 4.42 2.913 7.132 2.913s5.223-1.005 7.132-2.913l470.39-470.39c2.01-2.11 3.014-5.023 2.813-8.036zm-240.067-72.121c-35.458 0-64.286-28.828-64.286-64.286s28.828-64.285 64.286-64.285 64.286 28.828 64.286 64.285-28.829 64.286-64.286 64.286z"
                  ></path>
                </svg>
                <span v-for="tag in article.info.tag" :key="tag">
                  {{ tag }}
                </span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </Section>
  </div>
</template>

<script setup>
import Section from "../components/Section.vue";
import { onMounted } from "@vue/runtime-core";
import { useArticles } from "@theme-hope/modules/blog/composables/index.js";
import { ref } from "vue";
let articles = ref([]);
onMounted(async () => {
  const fetched = useArticles();
  articles.value = fetched.value.items;
});
</script>

<style scoped>
.tile-box {
  line-height: 1.25rem;
}
.article {
  font-size: 1.6rem;
  color: #ffffff;
  background: transparent;
}
em {
  font-size: 1rem;
  color: #777777;
  margin: 0.25rem 0;
}
.info {
  font-size: 0.75rem;
  color: #777777;
}
svg {
  height: 0.75rem;
}
.article:hover {
  color: var(--theme-color);
  text-decoration: none !important;
}
.article:hover strong {
  text-decoration: underline !important;
}
</style>
