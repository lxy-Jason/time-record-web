<script lang="ts" setup>
import { ElButton } from "element-plus";
import { useDark } from "@vueuse/core";
const isDark = useDark();
</script>

<template>
  <div>
    <ElButton @click="isDark = !isDark">{{ isDark ? "黑" : "白" }}</ElButton>
  </div>
</template>
