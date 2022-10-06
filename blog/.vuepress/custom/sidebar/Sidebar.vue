<template>
  <Sidebar>
    <template #top>
      <div class="avatar">
        <img src="/adam.svg" alt="Adam Hopkins" />
      </div>
    </template>
  </Sidebar>
</template>
<script setup>
import Sidebar from "vuepress-theme-hope/modules/sidebar/components/Sidebar.js";
</script>
<style lang="sass" scoped>
.avatar
  display: flex
  width: 100%
  align-items: center
  img
    width: var(--sidebar-width)
    height: var(--sidebar-width)
</style>
