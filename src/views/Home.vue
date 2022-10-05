<template>
  <div class="m-auto flex h-screen w-screen max-w-screen-xl justify-center">
    <div class="left">
      <Setting></Setting>
      <Ranking></Ranking>
    </div>
    <div class="main">
      <Study></Study>
      <transition name="btn">
        <button class="fold" v-if="fold" @click="unfold">按钮</button>
      </transition>
      
      <transition>
        <div v-show="isShow" class="aside">
          <button class="unFold" @click="unfold">按钮</button>
          <Setting></Setting>
          <Ranking></Ranking>
        </div>
      </transition>
      
    </div>
    <div class="right">
      <Detail></Detail>
    </div>
  </div>
</template>

<script setup lang="ts">
import Ranking from "@/views/Ranking.vue";
import Detail from "@/views/Detail.vue";
import Setting from "@/views/Setting.vue";
import Study from "@/views/Study.vue";
import { ref } from "vue";
import { useFold } from "@/store";
import { storeToRefs } from "pinia";

const Fold = useFold();
let { fold } = storeToRefs(Fold);
const isShow = ref(false);
const unfold = () => {
  isShow.value = !isShow.value;
};
</script>

<style scoped>
@tailwind components;
@layer components {
  .left {
    @apply overflow-hidden lg:min-w-max hidden lg:block;
    min-width: 375px;
  }
  .main {
    @apply w-full md:w-full lg:w-max-w-main  border-b-gray-300 border-x-2 relative overflow-hidden;
    min-width: 375px;
  }
  .right {
    @apply sm:min-w-max overflow-hidden hidden md:block;
    min-width: 375px;
  }
  .aside {
    @apply h-screen absolute;
    min-width: 375px;
    max-width: 375px;
  }
  .fold {
    @apply absolute left-0 top-1/2 z-0;
  }
  .unFold {
    @apply absolute -right-8 top-1/2 z-10;
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
  transform: translateX(-100%);
}
</style>
