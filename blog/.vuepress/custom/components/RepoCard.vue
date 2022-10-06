<template>
  <div>
    <div class="cardBox" v-if="!loading">
      <div class="boxHeader">
        <svg
          class="repoIcon"
          viewBox="0 0 16 16"
          width="16"
          height="16"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"
          ></path>
        </svg>
        <span class="name">
          <a style="text-decoration: none; color: inherit" :href="url">{{
            repoName
          }}</a>
        </span>
      </div>
      <div class="forkFrom" v-if="isFork">
        Forked from
        <a class="forkFromUrl" :href="forkPath">{{ forkName }}</a>
      </div>
      <div class="description">
        {{ description }}
      </div>
      <div class="infoBox">
        <div class="langBox" v-if="lang">
          <span
            class="language"
            :style="{ backgroundColor: this.langColor[lang].color }"
          ></span>
          <span> {{ lang }}</span>
        </div>
        <div class="starsBox" v-if="stars > 0">
          <svg
            aria-label="stars"
            viewBox="0 0 16 16"
            width="16"
            height="16"
            role="img"
          >
            <path
              fill-rule="evenodd"
              d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
            ></path>
          </svg>
          &nbsp;
          <span>{{ stars }}</span>
        </div>
        <div class="forksBox" v-if="forks > 0">
          <svg
            aria-label="fork"
            viewBox="0 0 16 16"
            width="16"
            height="16"
            role="img"
          >
            <path
              fill-rule="evenodd"
              d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
            ></path>
          </svg>
          &nbsp;
          <span>{{ forks }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "@vue/runtime-core";
import langColor from "./langColor";
import { ref } from "vue";
const props = defineProps({
  repo: String,
  OfflineData: Object,
});
const url = ref("");
const repoName = ref("");
const isFork = ref(false);
const forkPath = ref("");
const forkName = ref("");
const description = ref("");
const lang = ref("");
const stars = ref(0);
const forks = ref(0);
const loading = ref(true);
const getRepo = async () => {
  const response = await fetch("https://api.github.com/repos/" + props.repo);
  const data = await response.json();
  url.value = data.html_url;
  repoName.value = data.name;
  isFork.value = data.fork;
  if (data.fork) {
    forkPath.value = data.source.url;
    forkName.value = data.source.full_name;
  }
  description.value = data.description;
  lang.value = data.language;
  stars.value = data.stargazers_count;
  forks.value = data.forks_count;
  loading.value = false;
};
onMounted(async () => {
  await getRepo();
});
</script>

<style scoped>
.cardBox {
  border: 0px;
  border-radius: 6px;
  background: #0a0a0a;
  padding: 16px;
  font-size: 1.1rem;
  line-height: 1.5;
  color: #24292e;
}

.boxHeader {
  display: flex;
  align-items: center;
}

svg {
  fill: #586069;
}

.repoIcon {
  margin-right: 8px;
}

.language {
  width: 12px;
  height: 12px;
  border-radius: 100%;
  display: inline-block;
  top: 1px;
  position: relative;
}

.name {
  font-weight: 600;
  color: #ff0d68;
}

.forkFrom {
  display: block;
  font-size: 12px;
  color: #586069;
  text-align: left;
  margin-bottom: 8px;
}

.forkFromUrl {
  color: inherit;
  text-decoration: none;
}

.description {
  font-size: 12px;
  margin-bottom: 16px;
  margin-top: 8px;
  color: #586069;
  text-align: left;
}

.infoBox {
  font-size: 12px;
  color: #586069;
  display: flex;
}

.langBox {
  margin-right: 16px;
}

.starsBox {
  display: flex;
  align-items: center;
  margin-right: 16px;
}

.forksBox {
  display: flex;
}
</style>
