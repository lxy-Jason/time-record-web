<template>
  <div class="bg-gray-50">
    <router-view></router-view>
    <Tabbar></Tabbar>
  </div>
</template>

<script setup lang="ts">
import windowSize from "@/utils/windowSize";
import { onMounted } from "vue";
import Tabbar from "@/components/Tabbar.vue";
// 生命周期
onMounted(() => {
  windowSize();
});
</script>

<style></style>
