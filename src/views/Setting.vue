<template>
  <div class="relative bg-white">
    <LogoutVue></LogoutVue>
    <User
      :username="userData.username"
      :time="userData.time"
      :index="userData.rank"
      :portrait="userData.portrait"
    ></User>
    <div class="changeImg" @click="show = true"></div>
  </div>
  <OverlayVue :show="show" @show="isShow"></OverlayVue>
</template>

<script setup lang="ts">
import User from "@/components/User.vue";
import { ref, onMounted, provide, onBeforeMount } from "vue";
import { useUserDetail } from "@/store";
import LogoutVue from "@/components/Logout.vue";
import { close } from "@/types";
import OverlayVue from "@/components/Overlay.vue";

const userDetail = useUserDetail();
const username = localStorage.getItem("username") || "Jason";
let userData = ref({
  username,
  time: "00:00:00",
  rank: 0,
  portrait: "",
});
const getUserDetail = async () => {
  if (userDetail.data.username === username) {
    userData.value.rank = userDetail.data.rank;
    userData.value.time = userDetail.data.time;
    userData.value.portrait = userDetail.data.portrait;
  }
};
const show = ref(false);
const isShow = () => {
  show.value = false;
};
provide(close, isShow);
userDetail.$subscribe(() => {
  getUserDetail();
});
onBeforeMount(() => {
  userDetail.data.username = username;
  userDetail.getUserWeek();
});
onMounted(() => {
  getUserDetail();
});
</script>

<style scoped>
.changeImg {
  position: absolute;
  top: 0.7rem;
  left: 3.5rem;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  z-index: 10;
}
</style>
