import pinia from "@/store";
import useUserInfo from "@/store/modules/useUserInfo";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register.vue"),
  },
  {
    path: "/ranking",
    name: "Ranking",
    component: () => import("@/views/Ranking.vue"),
  },
  {
    path: "/study",
    name: "Study",
    component: () => import("@/views/Study.vue"),
  },
  {
    path: "/setting",
    name: "Setting",
    component: () => import("@/views/Setting.vue"),
  },
  {
    path: "/detail",
    name: "Detail",
    component: () => import("@/views/Detail.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

const userInfo = useUserInfo(pinia);

router.beforeEach((to) => {
  if (to.path !== "/login") {
    if (!userInfo.username) {
      return "/login";
    }
  }
  if (to.path === "/login" && userInfo.username) {
    return "/";
  }
});

export default router;
