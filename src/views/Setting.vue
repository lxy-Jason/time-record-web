<template>
  <div v-loading="loading" class="relative bg-white">
    <LogoutVue></LogoutVue>
    <User
      :username="userData.username"
      :time="userData.time"
      :index="userData.rank + 1"
    ></User>
  </div>
</template>

<script setup lang="ts">
import User from "@/components/User.vue";
import { getWeekApi } from "@/request/api";
import useUserInfo from "@/store/modules/useUserInfo";
import { Ref, ref, onMounted } from "vue";
import { useUserDetail } from "@/store";
import LogoutVue from "@/components/Logout.vue";
import RankingVue from "./Ranking.vue";

const userDetail = useUserDetail();

const userInfo = useUserInfo();
const loading = ref(true);
type UserData = {
  username: string;
  time: string;
  rank: number;
};
const username = localStorage.getItem("username") || "Jason";
let userData = ref({
  username,
  time: "00:00:00",
  rank: 0,
});
const getUserDetail = async () => {
  const res = await getWeekApi(username);
  console.log(res);
  const { rank, time } = res;
  userData.value.rank = rank;
  userData.value.time = time;
  loading.value = false;
  userDetail.$patch({
    userDetail: {
      username: userData.value.username,
      time: userData.value.time,
      rank: userData.value.rank,
    },
  });
};

onMounted(() => {
  getUserDetail();
});
</script>

<style scoped></style>
