import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import legacy from "@vitejs/plugin-legacy";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "http://106.14.82.240:8060", // 接口基地址
  //       changeOrigin: true, //支持跨域
  //       rewrite: (path) => {
  //         console.log(path); // 打印[/api/userInfo] 这就是http-proxy要请求的url,我们基地址实际是没有/api 所以replace掉
  //         return path.replace(/^\/api/, "");
  //       },
  //     },
  //   },
  // },
});
