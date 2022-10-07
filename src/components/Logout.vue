<template>
  <div
    @click="logout"
    class="absolute right-4 top-4 float-right w-16 cursor-pointer rounded-full bg-blue-400 py-1 px-3 text-center font-semibold text-white shadow-md hover:bg-blue-700"
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
  localStorage.clear();
  router.push("/login");
  console.log(111);
}
</script>

<style scoped></style>
