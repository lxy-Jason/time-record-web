import { useThrottleFn } from "@vueuse/core";
import { useRouter } from "vue-router";
import { useFold } from "@/store";

export default () => {
  const router = useRouter();
  const fold = useFold();
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
    if (windowWidth > 768 && windowWidth <= 1024) {
      // isFold = true;
      fold.$patch({ fold: true });
    } else {
      // isFold = false;
      fold.$patch({ fold: false });
    }
    if (windowWidth < 768) {
      router.push({ path: "study" });
    } else {
      router.push({ path: "/" });
    }
  };
  const getWindowResize = function () {
    windowWidth = window.innerWidth;
    console.log(windowWidth);
    size();
  };
  getWindowResize();
  // return isFold;
};
