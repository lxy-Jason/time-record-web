import { createApp } from "vue";
import router from "@/router";
import App from "./App.vue";
import "./style.css";
import {
  Tabbar,
  TabbarItem,
  Tab,
  Tabs,
  Divider,
  Empty,
  Overlay,
  Uploader,
} from "vant";
import "vant/lib/index.css";
import pinia from "./store";

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Tab);
app.use(Tabs);
app.use(Divider);
app.use(Empty);
app.use(Overlay);
app.use(Uploader);
app.mount("#app");
