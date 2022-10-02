<template>
  <div class="user" @click="jump2detail">
    <div class="online"></div>
    <div class="portrait">
      <img src="@/assets/head.png" alt="头像" />
    </div>
    <div class="profile">
      <p><strong>zhangsan4</strong></p>
      <img class="icon" src="@/assets/jiangzhangxunzhang.svg" />
      <span class="align-middle">No.1</span>
      <div class="time">
        <img class="icon" src="@/assets/shijian.svg" />
        <span class="align-middle">22:33:11</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
const jump2detail = () => {
  router.push({ path: "detail" });
};
</script>

<style scoped>
@tailwind components;
.user {
  @apply p-2 flex justify-start items-center border-b border-gray-300 m-2;
}
.online {
  @apply w-2 h-2 bg-green-500 rounded-full  inline-block m-2;
}
.portrait {
  @apply w-16 h-16 bg-blue-500 rounded-full  inline-block mx-4 overflow-hidden;
}
.profile {
  @apply h-auto w-auto align-middle;
  min-width: 10.5rem;
}
.icon {
  @apply h-5 w-5 inline-block mx-1 align-middle;
}
</style>
