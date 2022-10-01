<template>
  <div class="m-auto flex h-screen w-screen max-w-screen-xl justify-center">
    <div class="left"></div>
    <div class="main">
      <button class="switch" @click="unfold">按钮</button>
      <div v-show="isFold" class="aside"></div>
    </div>
    <div class="right"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const isFold = ref(false);
const unfold = () => {
  isFold.value = !isFold.value;
  //test
};
</script>
<style>
@tailwind components;
@layer components {
  .left {
    @apply bg-orange-500 overflow-hidden lg:min-w-max hidden lg:block;
    min-width: 375px;
  }
  .main {
    @apply w-full sm:w-full lg:w-max-w-main  bg-blue-500 relative;
    min-width: 23.69rem;
  }
  .right {
    @apply bg-orange-500 sm:min-w-max overflow-hidden hidden md:block;
    min-width: 375px;
  }
  .aside {
    @apply w-64 bg-orange-500 h-screen absolute -left-64 transform translate-x-64 transition-all;
  }
  .switch {
    @apply absolute left-0 top-1/2;
  }
}
</style>
