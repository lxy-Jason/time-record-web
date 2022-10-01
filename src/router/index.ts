import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
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
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
