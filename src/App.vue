<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import windowSize from "@/utils/windowSize";
import { onMounted } from "vue";

// 生命周期
onMounted(() => {
  windowSize();
});
</script>
<style></style>
