<template>
  <div>Home</div>
  <button @click="login">登录</button>
</template>

<script setup lang="ts">
import { loginApi } from "@/reqeust/api";
const login = async () => {
  const res = await loginApi({ username: "ccc", password: "ccc" });
  console.log(res);
};
</script>

<style scoped></style>
