<template>
  <div class="h-full bg-white">
    <!-- <h1 class="bg-blue-500 text-center text-lg">周榜</h1>
    <User
      v-for="(item, index) in userList"
      :key="index"
      :index="index + 1"
      :username="item._id"
      :time="item.time"
    ></User> -->
    <van-tabs v-model:active="active" swipeable>
      <van-tab
        v-for="(item, index) in arr"
        :key="index"
        :title="item"
        :name="item"
      >
        <van-divider />
        <PankList :active="index"></PankList>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts">
import PankList from "@/components/RankList.vue";
import { ref } from "vue";
const arr = ref(["周榜", "月榜", "总榜"]);
const active = ref("周榜");
</script>

<style scoped>
.ranking {
  height: 100%;
}
.van-tabs {
  height: 100%;
}
</style>
