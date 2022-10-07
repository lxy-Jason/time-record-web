<template>
  <div
    @click="logout"
    class="rounded-full py-1 px-3 font-semibold shadow-md text-white bg-blue-500 hover:bg-blue-700 cursor-default"
  >
    登出
  </div>
</template>

<script setup lang="ts">
import useUserInfo from "@/store/modules/useUserInfo";
import router from "@/router";

const userInfoStore = useUserInfo();

function logout() {
  userInfoStore.username = "";
  router.push("/login");
}
</script>

<style scoped></style>
