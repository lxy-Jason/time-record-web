<template>
  <div class="h-full bg-white" v-loading="loading">
    <User
      v-for="(item, index) in userList"
      :key="index"
      :index="index"
      :info="item"
    ></User>
  </div>
</template>

<script setup lang="ts">
import User from "@/components/User.vue";
import { getAllUserWeekApi } from "@/request/api";
import { onMounted, ref } from "vue";

const loading = ref(true);
let userList = ref([]);
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
