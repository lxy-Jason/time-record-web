import { createPinia, defineStore } from "pinia";
import useUserInfo from "./modules/useUserInfo";

const pinia = createPinia();

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useFold = defineStore("fold", {
  state: () => {
    return { fold: false };
  },
  actions: {
    getFold(fold: boolean) {
      this.fold = fold;
    },
  },
});
export const useShowBack = defineStore("showBack", {
  state: () => {
    return { showBack: false };
  },
  actions: {
    getShowBack(showBack: boolean) {
      this.showBack = showBack;
    },
  },
});

export interface DetailData {
  username: string;
  time: string;
  rank: number;
}

export const useUserDetail = defineStore("userDetail", {
  state: (): {
    userDetail: DetailData;
  } => {
    const userInfoStore = useUserInfo();
    return {
      userDetail: {
        username: userInfoStore.username,
        time: "00:00:00",
        rank: 0,
      },
    };
  },
  actions: {
    getUserDatil(userDetail: DetailData) {
      this.userDetail = userDetail;
    },
  },
});

export default pinia;
