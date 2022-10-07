<template>
  <div v-loading="loading" class="bg-white">
    <User
      :username="userData.username"
      :time="userData.time"
      :index="userData.rank"
    ></User>
  </div>
</template>

<script setup lang="ts">
import User from "@/components/User.vue";
import { getWeekApi } from "@/request/api";
import useUserInfo from "@/store/modules/useUserInfo";
import { Ref, ref, onMounted } from "vue";
import { useUserDetail } from "@/store";

const userDetail = useUserDetail();
const userInfo = useUserInfo();
const loading = ref(true);
type UserData = {
  username: string;
  time: string;
  rank: number;
};
let userData: Ref<UserData> = ref({
  username: "username",
  time: "00:00:00",
  rank: 0,
});
const getUserDetail = async () => {
  const res = await getWeekApi(userInfo.username);
  userData.value = res.data;
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
