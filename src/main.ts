import { createApp } from "vue";
import router from "@/router";
import App from "./App.vue";
import "./style.css";
import { createPinia } from "pinia";
import { Tabbar, TabbarItem } from "vant";
import "vant/lib/index.css";

const app = createApp(App);
app.use(router);
app.use(Tabbar);
app.use(TabbarItem);
app.use(createPinia());
app.mount("#app");
