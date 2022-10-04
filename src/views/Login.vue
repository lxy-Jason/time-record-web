<template>
  <div
    v-loading="loading"
    class="h-screen bg-blue-400 pt-[30%] sm:pt-[20%] md:pt-[10%]"
  >
    <div class="flex h-full flex-col items-center">
      <h1 class="text-2xl font-medium">开卷 - 时间记录系统</h1>
      <ElForm
        :rules="loginRules"
        size="large"
        :model="loginInfo"
        ref="userLoginFormRef"
      >
        <div class="pt-20">
          <el-form-item prop="username">
            <ElInput
              class="h-10"
              placeholder="用户名"
              v-model="loginInfo.username"
            />
          </el-form-item>
          <el-form-item prop="password">
            <ElInput
              class="h-10"
              placeholder="密码"
              v-model="loginInfo.password"
            />
          </el-form-item>
        </div>
        <el-form-item>
          <el-row justify="space-between" class="mt-6 w-full">
            <button
              class="btn border-yellow-400 bg-white text-yellow-400 hover:bg-gray-300/50"
              @click="login"
            >
              注册
            </button>
            <button
              class="btn bg-blue-600/50 text-white hover:bg-blue-700"
              @click="login"
            >
              登录
            </button>
          </el-row>
        </el-form-item>
      </ElForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserInfo from "@/store/modules/useUserInfo";
import { reactive, ref } from "vue";

const loginRules = {
  username: [
    {
      required: true,
      message: "用户名是必传内容~",
      trigger: "blur",
    },
    {
      pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]{3,10}$/,
      message: "必须是3~10个字母或者数字~",
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
      pattern: /^[a-z0-9]{3,}$/,
      message: "必须是3位以上的字母或者数字~",
      trigger: "blur",
    },
  ],
};

const loginInfo = reactive({
  username: "",
  password: "",
});

const loading = ref(false);

const userInfoSore = useUserInfo();

const userLoginFormRef = ref();

function login() {
  userLoginFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      loading.value = true;
      await userInfoSore.actionLogin(loginInfo);
      loading.value = false;
    }
  });
}
</script>

<style scoped>
@tailwind components;
.btn {
  @apply h-7 w-20 rounded-xl border px-3 text-sm;
}

.el-input :deep(.el-input__wrapper) {
  border-radius: 16px;
}
</style>
