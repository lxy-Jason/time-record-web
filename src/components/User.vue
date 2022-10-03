<template>
  <div class="user" @click="jump2detail">
    <div class="online"></div>
    <div class="portrait">
      <img src="@/assets/head.png" alt="头像" />
    </div>
    <div class="profile">
      <p>
        <strong>{{ info?.username }}</strong>
      </p>
      <img class="icon" src="@/assets/jiangzhangxunzhang.svg" />
      <span class="align-middle">No.{{ index + 1 }}</span>
      <div class="time">
        <img class="icon" src="@/assets/shijian.svg" />
        <span class="align-middle">{{ info?.time }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { reactive } from "vue";
const router = useRouter();

const props = defineProps({
  info: {
    type: Object,
    default: null,
  },
  index: {
    type: Number,
    default: 0,
  },
});
const userData = reactive({
  username: props.info.username,
  time: props.info.time,
  rank: props.index,
});

const jump2detail = () => {
  router.push({ path: "detail", query: userData });
};
</script>

<style scoped>
@tailwind components;
.user {
  @apply px-2 py-2 flex justify-start items-center border-b border-gray-300 mx-2;
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
