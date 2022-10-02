<template>
  <div>
    <div class="back" @click="back2pank">
      <img src="@/assets/fanhui.svg" />
    </div>
    <User></User>
  </div>
</template>

<script setup lang="ts">
import User from "@/components/user.vue";
import { useRouter } from "vue-router";
const router = useRouter();

const back2pank = () => {
  router.push({ path: "ranking" });
};
</script>

<style scoped>
@tailwind components;
.back {
  @apply w-8 h-10 p-2 absolute top-10 left-5 bg-white;
}
</style>
