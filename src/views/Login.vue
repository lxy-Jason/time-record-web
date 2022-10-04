<template>
  <div class="h-screen">
    <div class="flex h-full flex-col items-center justify-center">
      <h1 class="text-3xl">开卷-时间记录系统</h1>
      <ElForm :rules="loginRules" :model="loginInfo" ref="userLoginFormRef">
        <div class="pt-20 pb-10">
          <el-form-item prop="username">
            <ElInput
              class="rounded-3xl"
              placeholder="用户名"
              v-model="loginInfo.username"
            />
          </el-form-item>
          <el-form-item prop="password">
            <ElInput
              class="rounded-md"
              placeholder="密码"
              v-model="loginInfo.password"
            />
          </el-form-item>
        </div>
        <el-form-item>
          <ElButton>注册</ElButton>
          <ElButton @click="login">登录</ElButton>
        </el-form-item>
      </ElForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserInfo from "@/store/modules/useUserInfo";
import { ElForm } from "element-plus";
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
      message: "用户名必须是3~10个字母或者数字~",
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
      message: "用户名必须是3位以上的字母或者数字~",
      trigger: "blur",
    },
  ],
};

const loginInfo = reactive({
  username: "",
  password: "",
});

const userInfoSore = useUserInfo();

const userLoginFormRef = ref<InstanceType<typeof ElForm>>();

function login() {
  userLoginFormRef.value?.validate((valid) => {
    if (valid) userInfoSore.actionLogin(loginInfo);
  });
}
</script>

<style scoped></style>
