import { LoginInfo } from "@/types";
import { loginApi, registerApi } from "@/request/api";
import { defineStore } from "pinia";
import { RemovableRef, useLocalStorage } from "@vueuse/core";
import router from "@/router";

interface UserInfo {
  username: string;
}

const userInfo = useLocalStorage<UserInfo>("user-info", {
  username: "",
});

const useUserInfo = defineStore("userInfo", {
  state: (): RemovableRef<UserInfo> => userInfo,
  actions: {
    async actionLogin(loginInfo: LoginInfo) {
      const response = await loginApi(loginInfo);
      this.username = response.data.username;
      router.push("/home");
    },
    async actionRegister(loginInfo: LoginInfo) {
      const response = await registerApi(loginInfo);
      this.username = response.data.username;
      router.push("/home");
    },
  },
});

export default useUserInfo;
