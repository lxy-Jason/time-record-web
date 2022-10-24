import { useThrottleFn } from "@vueuse/core";
import { useFold, useShowBack } from "@/store";
import router from "@/router";

export default () => {
  const fold = useFold();
  const showBack = useShowBack();
  // 节流
  const deThrottleFn = useThrottleFn(() => {
    getWindowResize();
  }, 300);
  let windowWidth = 0;
  //给window加resize事件才生效
  window.addEventListener("resize", deThrottleFn);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // let isFold = false;
  const size = () => {
    console.log(windowWidth);
    if (windowWidth >= 768 && windowWidth <= 1125) {
      // isFold = true;
      fold.$patch({ fold: true });
    } else {
      // isFold = false;
      fold.$patch({ fold: false });
    }
    if (windowWidth < 768) {
      router.push({ path: "study" });
      showBack.$patch({ showBack: true });
    } else {
      router.push({ path: "/" });
      showBack.$patch({ showBack: false });
    }
  };
  const getWindowResize = function () {
    windowWidth = window.innerWidth;
    size();
  };
  getWindowResize();
  // return isFold;
};
