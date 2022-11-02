<template>
  <div class="h-full bg-white">
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

<style scoped></style>
