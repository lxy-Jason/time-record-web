<template>
  <div class="user" @click="jump2detail">
    <div class="online"></div>
    <!-- todo显示在线的标志 在style中添加绿色背景即可显示-->
    <div class="portrait">
      <img src="@/assets/head.png" alt="头像" />
    </div>
    <div class="profile">
      <p>
        <strong>{{ username }}</strong>
      </p>
      <img class="icon" src="@/assets/jiangzhangxunzhang.svg" />
      <span class="align-middle">No.{{ index }}</span>
      <div class="time">
        <img class="icon" src="@/assets/shijian.svg" />
        <span class="align-middle">{{ time }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useShowBack, useUserDetail } from "@/store";
import { storeToRefs } from "pinia";

const ShowBack = useShowBack();
const userDetail = useUserDetail();
let { showBack } = storeToRefs(ShowBack);
const router = useRouter();

const props = defineProps({
  username: {
    type: String,
    default:
      JSON.parse(localStorage.getItem("user-info") as string).username || "",
  },
  time: {
    type: String,
    default: "00:00:00",
  },
  index: {
    type: Number,
    default: 0,
  },
});

const jump2detail = () => {
  const userData = {
    username: props.username,
    time: props.time,
    rank: props.index,
  };
  console.log(userData);
  userDetail.$patch({ data: userData });
  if (showBack.value) {
    router.push({ path: "detail" });
  }
};
</script>

<style scoped>
@tailwind components;
.user {
  @apply px-2 py-2 flex justify-start items-center border-b border-gray-300 mx-2 cursor-pointer;
}
.online {
  @apply w-2 h-2  rounded-full  inline-block m-2;
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
