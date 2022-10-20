<template>
  <van-tabbar v-if="isShow()" v-model="active">
    <van-tabbar-item name="Study" icon="home-o">学习</van-tabbar-item>
    <van-tabbar-item name="Ranking" icon="search">排行</van-tabbar-item>
    <van-tabbar-item name="Setting" icon="setting-o">设置</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect, toRaw, Ref } from "vue";
import { useRouter } from "vue-router";

const active: Ref<string> = ref("study");
const router = useRouter();
watch(active, (newVal) => {
  router.push({ path: newVal });
});
const pathArr = ["Login", "Register", "Home", "Detail"];

const isShow = () => {
  return !pathArr.includes(active.value);
};
watchEffect(() => {
  let curPath = toRaw(router).currentRoute.value.name;
  if (typeof curPath === "string") {
    active.value = curPath;
  }
});
</script>

<style scoped>
:root {
  --van-tabbar-z-index: 0;
}
</style>
