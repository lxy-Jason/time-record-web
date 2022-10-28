<template>
  <div class="relative bg-white">
    <LogoutVue></LogoutVue>
    <User
      :username="userData.username"
      :time="userData.time"
      :index="userData.rank"
      :portrait="userData.portrait"
    ></User>
  </div>
</template>

<script setup lang="ts">
import User from "@/components/User.vue";
import { ref, onMounted } from "vue";
import { useUserDetail } from "@/store";
import LogoutVue from "@/components/Logout.vue";

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
userDetail.$subscribe(() => {
  getUserDetail();
});
onMounted(() => {
  getUserDetail();
  userDetail.getUserWeek();
});
</script>

<style scoped></style>
