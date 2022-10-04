<template>
  <div class="h-full bg-white" v-loading="loading">
    <h1 class="bg-blue-500 text-center text-lg">周榜</h1>
    <User
      v-for="(item, index) in userList"
      :key="index"
      :index="index + 1"
      :username="item.username"
      :time="item.time"
    ></User>
  </div>
</template>

<script setup lang="ts">
import User from "@/components/User.vue";
import { getAllUserWeekApi } from "@/request/api";
import { AllUserWeekResponseData } from "@/types";
import { onMounted, ref } from "vue";

const loading = ref(true);
const userList = ref<AllUserWeekResponseData[]>();
//获取周排名
const getWeekRank = async () => {
  const res = await getAllUserWeekApi();
  if (res.code === 200) {
    // console.log(res.data);
    userList.value = res.data;
  }
  loading.value = false;
};
onMounted(() => {
  getWeekRank();
});
</script>

<style scoped></style>
