<template>
  <div class="m-auto flex h-screen w-screen max-w-screen-xl justify-center">
    <div class="left"></div>
    <div class="main">
      <button ref="btn" class="switch" v-if="isFold" @click="unfold">
        按钮
      </button>
      <Transition>
        <div v-show="isShow" class="aside"></div>
      </Transition>
    </div>
    <div class="right"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useThrottleFn } from "@vueuse/core";

const isFold = ref(false);
const isShow = ref(false);
const btn = ref();
const unfold = () => {
  isShow.value = !isShow.value;
  console.log(isShow.value);
};
// 防抖
const debouncedFn = useThrottleFn(() => {
  getWindowResize();
}, 300);
// 获取屏幕尺寸
const getWindowResize = function () {
  windowWidth.value = window.innerWidth;
  console.log(windowWidth.value);
  size();
};
// 屏幕宽度
const windowWidth = ref(0);
// 生命周期
onMounted(() => {
  getWindowResize();
  //给window加resize事件才生效
  window.addEventListener("resize", debouncedFn);
});
const size = () => {
  if (windowWidth.value > 640 && windowWidth.value <= 1024) {
    isFold.value = true;
  } else {
    isFold.value = false;
  }
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
    @apply w-full sm:w-full lg:w-max-w-main  bg-blue-500 relative;
    min-width: 23.69rem;
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
