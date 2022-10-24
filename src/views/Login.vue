<template>
  <div
    v-loading="loading"
    class="h-screen bg-white pt-[30%] sm:pt-[20%] md:pt-[10%]"
  >
    <div class="flex flex-col items-center justify-center">
      <h1 class="text-2xl font-medium">开卷 - 时间记录系统</h1>
      <ElForm
        class="mt-4 rounded bg-white p-16"
        :rules="loginRules"
        size="large"
        :model="loginInfo"
        ref="userLoginFormRef"
        label-position="left"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <ElInput placeholder="请输入用户名" v-model="loginInfo.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <ElInput
            placeholder="请输入密码"
            type="password"
            v-model="loginInfo.password"
          />
        </el-form-item>
        <el-row justify="space-around" class="mt-6 w-full">
          <el-button type="warning" plain @click.prevent="register"
            >注册</el-button
          >
          <el-button type="primary" plain @click.prevent="login"
            >登录</el-button
          >
        </el-row>
      </ElForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { Notify } from "vant";
import "vant/es/notify/style";
import { loginApi, registerApi } from "@/request/api";
import windowSize from "@/utils/windowSize";
const loginRules = {
  username: [
    {
      required: true,
      message: "用户名是必传内容~",
      trigger: "blur",
    },
    {
      pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]{2,10}$/,
      message: "必须是2~10个字母或者数字~",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "密码是必传内容~",
      trigger: "blur",
    },
    {
      pattern: /^[A-Za-z0-9]{5,}$/,
      message: "必须是5位以上的字母或者数字~",
      trigger: "blur",
    },
  ],
};
const loginInfo = reactive({
  username: "Jason",
  password: "123456",
});
const loading = ref(false);

const userLoginFormRef = ref();

function login() {
  userLoginFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      loading.value = true;
      const res = await loginApi(loginInfo);
      console.log(res);
      if (res.code === 200) {
        localStorage.setItem("username", res.username);
        localStorage.setItem("token", res.token);
        Notify({ type: "success", message: "登录成功" });
        windowSize();
      } else {
        Notify({ type: "warning", message: "登录失败" });
      }
      loading.value = false;
    }
  });
}

function register() {
  userLoginFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      loading.value = true;
      const res = await registerApi(loginInfo);
      console.log(res);
      if (res.code === 201) {
        localStorage.setItem("username", res.username);
        localStorage.setItem("token", res.token);
        Notify({ type: "success", message: "注册成功" });
        windowSize();
      } else {
        Notify({ type: "warning", message: "用户名已存在" });
      }
      loading.value = false;
    }
  });
}
</script>

<style scoped>
@tailwind components;
.btn {
  @apply h-7 w-20  border px-3 text-sm;
}
</style>
