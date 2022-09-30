<template>
  <div class="flex h-screen justify-center">
    <div class="left">111</div>
    <div class="main">
      <button @click="unfold">按钮</button>
    </div>
    <div class="right"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const isFold = ref(true);
const unfold = () => {
  isFold.value = false;
};
</script>
<style>
@tailwind components;
@layer components {
  .left {
    @apply w-0 sm:hidden md:block lg:w-64 bg-orange-500;
  }
  .main {
    @apply w-full sm:w-full md:w-96  bg-blue-500;
  }
  .right {
    @apply w-0 sm:w-0 md:w-64 bg-orange-500;
  }
}
</style>
