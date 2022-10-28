import { createPinia, defineStore } from "pinia";
import { getWeekApi } from "@/request/api";
const pinia = createPinia();

//home页侧边栏是否能展开 实际判断是否 786 <= x <= 1125
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
//详情页是否显示返回箭头 实际判断是否 < 768px
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
  portrait: string;
}

export const useUserDetail = defineStore("userDetail", {
  state: (): {
    data: DetailData;
  } => {
    return {
      data: {
        username: localStorage.getItem("username") || "Jason",
        time: "00:00:00",
        rank: 0,
        portrait: "",
      },
    };
  },
  actions: {
    async getUserWeek() {
      const res = await getWeekApi(this.data.username);
      console.log(res);
      if (res.code === 200) {
        this.data.time = res.time;
        this.data.rank = res.rank + 1;
      }
      this.data.portrait = res.portrait;
      return res;
    },
  },
});

export default pinia;
