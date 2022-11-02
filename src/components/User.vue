<template>
  <div class="user" @click="jump2detail">
    <div class="online"></div>
    <!-- todo显示在线的标志 在style中添加绿色背景即可显示-->
    <div class="portrait">
      <img :src="portrait" alt="头像" />
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
import headImg from "@/assets/head.png";
const ShowBack = useShowBack();
const userDetail = useUserDetail();
const router = useRouter();

const props = defineProps({
  username: {
    type: String,
    default: localStorage.getItem("username") || "",
  },
  time: {
    type: String,
    default: "00:00:00",
  },
  index: {
    type: Number,
    default: 0,
  },
  portrait: {
    type: String,
    default: headImg,
  },
});

const jump2detail = () => {
  userDetail.data.username = props.username;
  userDetail.getUserWeek();
  if (ShowBack.showBack) {
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
  @apply w-16 h-16 rounded-full  inline-block mx-4 overflow-hidden;
}
.profile {
  @apply h-auto w-auto align-middle;
  min-width: 10.5rem;
}
.icon {
  @apply h-5 w-5 inline-block mx-1 align-middle;
}
</style>
