<template>
  <div
    class="m-auto flex h-screen w-screen max-w-screen-xl justify-center bg-white"
  >
    <div class="left">
      <Setting></Setting>
      <Ranking></Ranking>
    </div>
    <div class="main">
      <Study></Study>
      <transition name="btn">
        <button class="fold btn" v-if="fold" @click="unfold">
          <div class="relative h-6 w-6">
            <img class="arrow" src="@/assets/youjiantou.svg" />
          </div>
        </button>
      </transition>

      <transition>
        <div v-if="isShow" class="aside">
          <button class="unFold btn" @click="unfold">
            <div class="relative h-6 w-6">
              <img class="arrow unFold" src="@/assets/fanhui.svg" />
            </div>
          </button>

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
import { ref, onBeforeMount } from "vue";
import { useFold, useUserDetail } from "@/store";
import { storeToRefs } from "pinia";

const Fold = useFold();
const userDetail = useUserDetail();
let { fold } = storeToRefs(Fold);
const isShow = ref(false);
const unfold = () => {
  isShow.value = !isShow.value;
};
onBeforeMount(() => {
  userDetail.getUserWeek();
});
</script>

<style scoped>
@tailwind components;
@layer components {
  .left {
    @apply overflow-hidden lg:min-w-max hidden lg:block overflow-y-scroll;
    min-width: 375px;
    max-width: 375px;
  }
  .main {
    @apply w-full md:w-full lg:w-max-w-main  border-b-gray-300 border-x-2 relative overflow-hidden z-0;
    min-width: 375px;
  }
  .right {
    @apply sm:min-w-max overflow-auto hidden md:block;
    min-width: 375px;
  }
  .aside {
    @apply h-screen absolute z-50 top-0 border-b-gray-300 border-x-2 overflow-y-scroll;
    min-width: 375px;
    max-width: 375px;
  }
  .btn {
    @apply absolute  top-1/2  w-6 h-16 bg-gray-50 transform -translate-y-2/4 z-10;
    width: 10px;
    height: 100px;
    border-left: 20px solid #ccc;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
  }
  .fold {
    @apply left-0  z-0;
  }
  .unFold {
    @apply -right-5  z-10;
  }
  .arrow {
    @apply w-6 h-6  absolute -left-6 top-1/2 z-10 transform -translate-y-2/4;
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
