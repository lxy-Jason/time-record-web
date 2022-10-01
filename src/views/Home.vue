<template>
  <div class="m-auto flex h-screen w-screen max-w-screen-xl justify-center">
    <div class="left"></div>
    <div class="main">
      <button ref="btn" class="switch" v-if="fold" @click="unfold">按钮</button>
      <Transition>
        <div v-show="isShow" class="aside"></div>
      </Transition>
    </div>
    <div class="right"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useFold } from "@/store";
import { storeToRefs } from "pinia";

const Fold = useFold();
let { fold } = storeToRefs(Fold);
const isShow = ref(false);
const btn = ref();
const unfold = () => {
  isShow.value = !isShow.value;
  console.log(isShow.value);
};
</script>

<style scoped>
@tailwind components;
@layer components {
  .left {
    @apply bg-orange-500 overflow-hidden lg:min-w-max hidden lg:block;
    min-width: 375px;
  }
  .main {
    @apply w-full md:w-full lg:w-max-w-main  bg-blue-500 relative;
    min-width: 375px;
  }
  .right {
    @apply bg-pink-500 sm:min-w-max overflow-hidden hidden md:block;
    min-width: 375px;
  }
  .aside {
    @apply bg-orange-500 h-screen absolute;
    min-width: 375px;
    max-width: 375px;
  }
  .switch {
    @apply absolute left-0 top-1/2 z-10;
  }
}
.v-enter-to,
.v-leave-from {
  transform: translateX(0);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
