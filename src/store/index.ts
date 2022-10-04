import { createPinia, defineStore } from "pinia";

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
    getFold(showBack: boolean) {
      this.showBack = showBack;
    },
  },
});

export default pinia;
